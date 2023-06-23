//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Build
//
//BuildIn3D

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
	one.buildMenuData = {
	info:{
		id: 'buildMenu',
		buttonData: auxl.buildCoreData,
		hoverData: auxl.buildHoverData,
		title: 'Build Mode',
		description: 'Build objects.',
		layout:'circleUp',
		posOffset: new THREE.Vector3(0,1.5,1.5),
		offset: -1,
		parent: false,
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
export default BuildIn3D;