//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Build
//
//Link
//Gen Phys Object
//BuildIn3D


//Link Phys Objects
const Constraints = (auxl, core, linkData, atStart) => {
	let constraint = {}
	constraint.on = atStart || false;
	constraint.core = core;
	constraint.type = linkData.type || 'auxspring';
	constraint.to = linkData.to || 'playerRig';
	constraint.id = 'constraint' + core.id +  Math.floor(Math.random().toFixed(8)*10000000);
	constraint.minLength = 0;
	constraint.maxLength = 20;
	constraint.pivotA = new THREE.Vector3(0,0,0);
	constraint.pivotB = new THREE.Vector3(0,0,0);
	constraint.axisA = new THREE.Vector3(0,0,0);
	constraint.axisB = new THREE.Vector3(0,0,0);
	constraint.maxForce = 1e6;
	constraint.restLength = linkData.restLength || 1;
	constraint.damping =  linkData.damping || 0.5;
	constraint.stiffness =  linkData.stiffness || 10;
	constraint.collideConnected = true;
	constraint.always = true;

	//Build
	const Build = () => {
		//Type
		if(constraint.type === 'lock'){
			//Lock
			constraint.connect = {
				name: 'auxconstraint__'+constraint.id,
				type: constraint.type,
				connectTo: constraint.to,
				maxForce: 1e6,
				collideConnected: constraint.collideConnected,
				always: constraint.always,
			};
		} else if(constraint.type === 'pointToPoint'){
			//pointToPoint
			constraint.connect = {
				name : 'auxconstraint__'+constraint.id,
				type: constraint.type,
				connectTo: constraint.to,
				pivotA:  constraint.pivotA,
				pivotB:  constraint.pivotB,
				maxForce: constraint.maxForce,
				collideConnected: constraint.collideConnected,
				always: constraint.always,
			};
		} else if(constraint.type === 'coneTwist'){
			//coneTwist
			constraint.connect = {
				name : 'auxconstraint__'+constraint.id,
				type: constraint.type,
				connectTo: constraint.to,
				pivotA: constraint.pivotA,
				pivotB: constraint.pivotB,
				axisA: constraint.axisA,
				axisB: constraint.axisB,
				maxForce: constraint.maxForce,
				collideConnected: constraint.collideConnected,
				always: constraint.always,
			};
		} else if(constraint.type === 'hinge'){
			//hinge
			constraint.connect = {
				name : 'auxconstraint__'+constraint.id,
				type: constraint.type,
				connectTo: constraint.to,
				pivotA: constraint.pivotA,
				pivotB: constraint.pivotB,
				axisA: constraint.axisA,
				axisB: constraint.axisB,
				maxForce: constraint.maxForce,
				collideConnected: constraint.collideConnected,
				always: constraint.always,
			};
		} else if(constraint.type === 'auxspring'){
			//auxspring
			constraint.connect = {
				name : 'auxspring__'+constraint.id,
				connectTo: constraint.to,
				restLength: constraint.restLength,
				damping: constraint.damping,
				stiffness: constraint.stiffness,
				collideConnected: constraint.collideConnected,
				always: constraint.always,
			};
		}
	}

	//Update
	const Update = (data) => {
		if(data){
			if(data.type){
				constraint.type = data.type;
			}
			if(data.restLength){
				constraint.restLength = data.restLength;
			}
			if(data.damping){
				constraint.damping = data.damping;
			}
			if(data.stiffness){
				constraint.stiffness = data.stiffness;
			}
			if(data.maxForce){
				constraint.maxForce = data.maxForce;
			}
/*
			for(let each in data){
				if(typeof each[each] !== "undefined"){
					constraint[each] = each[data];
				}
			}
*/
		}
		Build();

	}
	//Update Self
//console.log({event: 'constraint prebuild', base: constraint, update: linkData})
	Update(linkData);
//console.log({event: 'constraint updated', base: constraint})
	//Connect To
	const Connect = (data) => {
//console.log(core)
//console.log({event: 'constraint ostbuild', base: constraint, update: data || false})
		//Setup with non physics component attach as well
		Update(data);
console.log({core: constraint, update: data})
		constraint.core.core.components[constraint.connect.name] = constraint.connect;
		constraint.core.ChangeSelf({property: constraint.connect.name, value: constraint.connect}, true);
	}
	//Disconnect Self
	const Disable = () => {
		delete constraint.core.core.components[constraint.connect.name];
//console.log({event: 'constraint disconnet', base: constraint})
	}
	//Disconnect Self
	const Disconnect = () => {
		constraint.core.RemoveComponent(constraint.connect.name);
//console.log({event: 'constraint disconnet', base: constraint})
	}

	//Connect Right Away if On
	if(constraint.on){
		Connect();
	}

	return {constraint, Update, Connect, Disconnect, Disable};
}


//Gen a Phys Object 
const One = (auxl, objGen, oneData) => {
//Phys objects pertain to a single core wether that be solo or the parent (core/layer)
	//one
	let one = {};
	one.objGen = objGen;
	one.core = false;
	one.layer = false;
	if(objGen.core){
		one.core = objGen;
	} else if(objGen.layer){
		one.core = objGen.layer.all.parent.core;
		one.layer = objGen;
	}
	one.num = Math.random().toFixed(8);
	one.name = one.core.id + 'Phys' || 'objPhys';
	one.id = one.name + one.num;

	//Physc Settings
	one.loaded = false;
	one.type = 'static';
	one.shape = 'box';
	one.mass = 0;
	one.friction = 0;
	one.restitution = 0;
	one.connectTo = 0;
	//one.restLength = 0;
	one.length = 0;
	one.damping = 0;
	one.stiffness = 0;
	//Body
	one.body = {
		type: one.type,
		mass: one.mass,
		shape: 'none',
	};
	//Default shape if none
	one.shapes = {};
	//Shapes
	one.shapes.cylinder = {shape: 'cylinder', height: 1, radiusTop: 1, radiusBottom: 1, offset: '0 0 0',};
	one.shapes.box =  {shape: 'box', height: 1, width: 1, depth: 1, offset: '0 0 0',};
	one.shapes.sphere = {shape: 'sphere', radius: 1, width: 1, depth: 1, offset: '0 0 0',};
	//Total shape of phys layer
	one.avatar = [one.shapes.sphere,];

	one.bodymaterial = {
		friction: one.friction, 
		restitution: one.restitution
	};
	one.connections = [];

	//Update Phys Data
	const UpdatePhys = (data) => {
		if(data){
			for(let each in data){
				one[each] = data[each];
			}
		}
		//Prep Core Components
		if(!one.core.core.components){
			one.core.core.components = {};
		}
		//Add all bodies to data
		for(let each in one.avatar){
			one.core.core.components['shapes__'+ each] = one.avatar[each];
		}
		one.core.core.components.body = {property: 'body', value: one.body};
		one.core.core.components.bodymaterial = {property: 'bodymaterial', value: one.bodymaterial};
		if(one.loaded){
			one.core.ChangeSelf(one.avatar);
			one.core.ChangeSelf([{property: 'body', value: one.body}, {property: 'bodymaterial', value: one.bodymaterial}]);
		}
	}
console.log(one)
	UpdatePhys(oneData);
console.log(one)
	//Load Phys to Core
	const TogglePhys = () => {
		if(one.loaded){
			for(let each in one.avatar){
				one.core.core.RemoveComponent('shapes__'+ each);
			}
			one.core.RemoveComponent(['body','bodymaterial']);
			one.loaded = false;
		} else {
			UpdatePhys(data);
			one.core.ChangeSelf(one.avatar);
			one.core.ChangeSelf([{property: 'body', value: one.body}, {property: 'bodymaterial', value: one.bodymaterial}]);
			one.loaded = true;
		}
	}
	//Spawn Object
	const SpawnOne = () => {
		UpdatePhys();
		if(one.layer){
			one.layer.SpawnLayer();
		} else {
			one.core.SpawnCore();
		}
	}
	//Despawn Object
	const DespawnOne = () => {
		if(one.layer){
			one.layer.DespawnLayer();
		} else {
			one.core.DespawnCore();
		}
		one.loaded = false;
	}

	//Constraints
	one.constraint = {};
//layer.linkMain.Link('linkMain',{position, type: 'auxspring', restLength: DistanceFromPlayer(position)});
	//Link
	const Link = (distance) => {
		//one.constraint = constraint(auxl, one, true, data);
		//one.constraint.constraint.type = data.type;
		//one.constraint.constraint.position = data.position;
		//one.constraint.constraint.length = data.length;
//console.log(one.constraint)
		//one.constraint.Connect();
		one.core.ChangeSelf({property: 'auxspring__'+one.id, value: {
			connectTo: one.to,
			restLength: one.length,
			damping: one.damping,
			stiffness: one.stiffness,
			collideConnected: one.collideConnected,
			always: one.always,
		}})

	}
	//Unlink
	const Unlink = () => {
		one.core.RemoveComponent('auxspring__'+one.id)
	}
	//Unlink All
	const UnlinkAll = () => {
		for(let each of one.constraint){
			one.constraint[each].Disconnect(one);
		}
		one.constraint = {};
	}
/*
	//Link
	const Link = (id, data) => {
console.log(id)
console.log(data)
		data.name = id;
		one.constraints[id] = constraint(auxl, one, true, data);

console.log(one.constraints[id])
		one.constraints[id].Connect(one);
	}
	//Unlink
	const Unlink = (id) => {
		one.constraints[id].Disconnect(one);
		delete one.constraints[id];
	}
	//Unlink All
	const UnlinkAll = () => {
		for(let each of one.constraints){
			one.constraints[each].Disconnect(one);
		}
		one.constraints = {};
	}
*/

	return {one, SpawnOne, DespawnOne, UpdatePhys, TogglePhys, Link, Unlink, UnlinkAll};

}






//
//Build Core/Layer/Other objects in the 3D environment
const BuildIn3D = (auxl) => {

	let one = {};
	one.id = 'build';
	one.player = auxl.player.GetPlayerInfo();
	one.core = {};
	one.core.data = {};
	one.core.made = [];
	one.layer = {};
	one.objGen = {};
	one.null = {};
	one.templates = {};

	one.core.blank = {
		data:'blankData',
		id:'blank',
		sources: false,
		text: false,
		geometry: false,
		material: false,
		position: new THREE.Vector3(0,0,0),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
	};

	one.states = ['ready', 'building', 'editing', 'deleting', 'settings'];
	one.state = one.states[0];

	one.building = {};
	one.building.current = false;
	one.building.prepped = false;
	one.building.building = false;

	//player.id
//Spawn a multi-menu
// w/ various individual options for each type of Core/Layer/Other
/*
Build
Edit
Delete
Settings


Build
- Core
- - Name
- - Geometry
- - Material
- - Text
- - Position
- - Rotation
- - Scale
- - Animations
- - Clickable
- - Components
- - Done
- Layer
- ObjGen
- Null
- Templates



auxl.avatarSphereData = {
data:'avatarSphereData',
id:'avatarSphere',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','avatar'],
components: false,
};

*/
	//attach look-at with buffer
	one.buildMenuData = {
	info:{
		id: 'buildMenu',
		buttonData: auxl.buildCoreData,
		hoverData: auxl.buildHoverData,
		title: 'Build Mode',
		description: 'Build objects.',
		layout:'circleUp',
		posOffset: new THREE.Vector3(0,1.5,-1.5),
		offset: -1,
		parent: 'playerRig',
		look: {buffer: 0.65, drag: 0.25, match: 'camera', x:false, y:true, z:false},
		stare: false,
	},
	menu0:{
		button0:{
			id: 'subMenu1',
			style: false,
			title: 'Build',
			description: 'Build a new object.',
			subMenu: 'menu1',
			action: false,
		},
		button1:{
			id: 'subMenu2',
			style: false,
			title: 'Edit',
			description: 'Edit an object in-scene.',
			subMenu: 'menu22',
			action: false,
		},
		button2:{
			id: 'subMenu3',
			style: false,
			title: 'Delete',
			description: 'Delete an object in-scene.',
			subMenu: 'menu23',
			action: false,
		},
		button3:{
			id: 'subMenu4',
			style: false,
			title: 'Settings',
			description: 'Configure system settings.',
			subMenu: 'menu24',
			action: false,
		},
	},
	menu1:{
		button0:{
			id: 'subMenu2',
			style: false,
			title: 'Core',
			description: 'Build a Core object.',
			subMenu: 'menu2',
			action: false,
		},
		button1:{
			id: 'subMenu3',
			style: false,
			title: 'Layer',
			description: 'Build a Layer object.',
			subMenu: 'end',
			action: false,
		},
		button2:{
			id: 'subMenu4',
			style: false,
			title: 'ObjGen',
			description: 'Build an object.',
			subMenu: 'end',
			action: false,
		},
		button3:{
			id: 'subMenu5',
			style: false,
			title: 'Null',
			description: 'Build a Null object.',
			subMenu: 'end',
			action: false,
		},
		button4:{
			id: 'subMenu6',
			style: false,
			title: 'Templates',
			description: 'Build a from a Template.',
			subMenu: 'end',
			action: false,
		},
	},
	menu2:{
		button0:{
			id: 'subMenu0',
			style: false,
			title: 'Generate',
			description: 'Generate a default Core object.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'StartBuilding',
				params: null,
				menu: 'stay',
			},
		},
		button1:{
			id: 'subMenu1',
			style: false,
			title: 'Name',
			description: 'Update core Name.',
			subMenu: 'coreName',
			action: false,
		},
		button2:{
			id: 'subMenu2',
			style: false,
			title: 'Geometry',
			description: 'Update core Geometry.',
			subMenu: 'coreGeometry',
			action: false,
		},
		button3:{
			id: 'subMenu3',
			style: false,
			title: 'Material',
			description: 'Update core Material.',
			subMenu: 'coreMaterial',
			action: false,
		},
		button4:{
			id: 'subMenu4',
			style: false,
			title: 'Text',
			description: 'Update core Text.',
			subMenu: 'coreText',
			action: false,
		},
		button5:{
			id: 'subMenu5',
			style: false,
			title: 'Position',
			description: 'Update core Position.',
			subMenu: 'corePosition',
			action: false,
		},
		button6:{
			id: 'subMenu6',
			style: false,
			title: 'More',
			description: 'More options.',
			subMenu: 'menu3',
			action: false,
		},
	},
	menu3:{
			button0:{
				id: 'subMenu0',
				style: false,
				title: 'Rotation',
				description: 'Update core Rotation.',
				subMenu: 'coreRotation',
				action: false,
			},
			button1:{
				id: 'subMenu1',
				style: false,
				title: 'Scale',
				description: 'Update core Scale.',
				subMenu: 'coreScale',
				action: false,
			},
			button2:{
				id: 'subMenu2',
				style: false,
				title: 'Animations',
				description: 'Update core Animations.',
				subMenu: 'coreAnimations',
				action: false,
			},
			button3:{
				id: 'subMenu3',
				style: false,
				title: 'Clickable',
				description: 'Toggle core to be clickable in-scene.',
				subMenu: 'coreClickable',
				action: false,
			},
			button4:{
				id: 'subMenu4',
				style: false,
				title: 'Components',
				description: 'Update core Components.',
				subMenu: 'coreComponents',
				action: false,
			},
			button5:{
				id: 'subMenu5',
				style: false,
				title: 'Done',
				description: 'Finalize core updates.',
				subMenu: 'coreDone',
				action: false,
			},
	},
	coreName:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Name',
			description: 'Update the cores name and id.',
			subMenu: false,
			action: {
				auxlObj: 'one',
				component: false,
				method: 'UpdateName',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreGeometry:{
		button0:{
			id: 'action0',
			style: false,
			title: 'Plane',
			description: 'A 2D plane.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'plane',
				menu: 'stay',
			},
		},
		button1:{
			id: 'action1',
			style: false,
			title: 'Cube',
			description: 'A 3D cube.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'box',
				menu: 'stay',
			},
		},
		button2:{
			id: 'action2',
			style: false,
			title: 'Circle',
			description: 'A 2D circle.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'circle',
				menu: 'stay',
			},
		},
		button3:{
			id: 'action3',
			style: false,
			title: 'Cylinder',
			description: 'A 3D cylinder.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'cylinder',
				menu: 'stay',
			},
		},
		button4:{
			id: 'action4',
			style: false,
			title: 'Sphere',
			description: 'A 3D sphere.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'sphere',
				menu: 'stay',
			},
		},

	},
	coreMaterial:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Material',
			description: 'Update the cores Material.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateMaterial',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreText:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Text',
			description: 'Update the cores text.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateText',
				params: null,
				menu: 'stay',
			},
		},
	},
	corePosition:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Position',
			description: 'Update the cores position.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdatePosition',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreRotation:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Rotation',
			description: 'Update the cores rotation.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateRotation',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreScale:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Scale',
			description: 'Update the cores scale.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateScale',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreAnimations:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Animations',
			description: 'Update the cores animations.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateAnimations',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreClickable:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Toggle Clickable',
			description: 'Toggle the core being interactable. ',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'ToggleClickable',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreComponents:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Components',
			description: 'Update the cores components.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateComponents',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreDone:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Done',
			description: 'Finalize the core.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'Done',
				params: null,
				menu: 'close',
			},
		},
	},
	end:{
		button0:{
			id: 'subMenu2',
			style: false,
			title: 'Core',
			description: 'Build a Core object.',
			subMenu: 'menu0',
			action: false,
		},
	},

	};
	auxl.buildMenu = auxl.MultiMenu(one.buildMenuData);
	//auxl.buildMenu.menuLayer.layer;
/*
	components: {
		['look-at-xyz']:},
	},
*/

	one.building.geometry = {};
	one.building.geometry.plane = {primitive: 'plane', width: 0.5, height: 0.5};
	one.building.geometry.box = {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5};
	one.building.geometry.circle = {primitive: 'circle', radius: 0.5, segments: 32};
	one.building.geometry.cylinder = {primitive: 'cylinder', radius: 0.25, height: 0.75, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
	one.building.geometry.sphere = {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 360, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 360};


	const SpawnBuild = () => {
		//console.log('Spawning');
		auxl.buildMenu.SpawnMultiMenu();
	}
	const DespawnBuild = () => {
		//console.log('Despawning');
		auxl.buildMenu.DespawnMultiMenu();
		//auxl.RemoveFromTracker(one.id);
	}

	const NewCore = () => {
		if(one.building.prepped){
			console.log('Already Prepped');
		} else {
			console.log('New Core')
			let name = one.core.made.length;
			one.core.data[name+'data'] = {
				data:name+'data',
				id:name,
				sources: false,
				text: false,
				geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
				material: {shader: "standard", color: "#2aad7b", emissive: '#2aad7b', emissiveIntensity: 0.25, opacity: 1},
				position: new THREE.Vector3(0,1.5,1.5),
				rotation: new THREE.Vector3(0,0,0),
				scale: new THREE.Vector3(1,1,1),
				animations: false,
				mixins: false,
				classes: ['a-ent'],
				components: false,
			};
			one.core[name] = auxl.Core(one.core.data[name+'data']);
			one.building.current = one.core[name];
			one.building.prepped = true;
			one.building.building = true;

			one.building.current.SpawnCore();
		}
	}


	const StartBuilding = () => {
		console.log('Start Building')

		NewCore();


	}

	const UpdateName = () => {
		console.log('UpdateName')
	}

	const UpdateGeometry = (geometry) => {
		console.log('UpdateGeometry');
		let geometryData;
		if(geometry === 'plane'){
			geometryData = one.building.geometry.plane;
		} else if(geometry === 'box'){
			geometryData = one.building.geometry.box;
		} else if(geometry === 'circle'){
			geometryData = one.building.geometry.circle;
		} else if(geometry === 'cylinder'){
			geometryData = one.building.geometry.cylinder;
		} else if(geometry === 'sphere'){
			geometryData = one.building.geometry.sphere;
		} 
		//Update Data
		one.core.data[one.building.current.core.id+'data'].geometry = geometryData;
		//Update Preview
		one.building.current.ChangeSelf({property: 'geometry', value: geometryData});
	}
	const UpdateMaterial = () => {
		console.log('UpdateMaterial')
	}
	const UpdateText = () => {
		console.log('UpdateText')
	}
	const UpdatePosition = () => {
		console.log('UpdatePosition')
	}
	const UpdateRotation = () => {
		console.log('UpdateRotation')
	}
	const UpdateScale = () => {
		console.log('UpdateScale')
	}
	const UpdateAnimations = () => {
		console.log('UpdateAnimations')
	}
	const UpdateClickable = () => {
		console.log('UpdateClickable')
	}
	const UpdateComponents = () => {
		console.log('UpdateComponents')
	}
	const UpdateDone = () => {
		console.log('UpdateDone')
	}

	const Testing = () => {
		console.log(one)
	}

	return {one, SpawnBuild, DespawnBuild, StartBuilding, UpdateName, UpdateGeometry, UpdateMaterial, UpdateText, UpdatePosition, UpdateRotation, UpdateScale, UpdateAnimations, UpdateClickable, UpdateComponents, UpdateDone, Testing,}


}

//
//Export
export {Constraints, One, BuildIn3D};