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
//console.log({core: constraint, update: data})
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

//Build a One inside of UniRay.
//Link all current powers to one equivialant

//Gen a Phys Object 
const One = (auxl, objGen, oneData, uniRay) => {
//Phys objects pertain to a single core wether that be solo or the parent (core/layer)

//static : infinite mass, collides with dynamic. Position/Rotation
//kinematic : infinite mass, collides with dynamic. Velocity forces applied. Position/Rotation
//dynamic : has mass, collides with all. All forces applied. Position/Rotation

	//one
	let one = {};
	one.objGen = objGen;
	one.worldBody = false;
	one.core = false;
	one.layer = false;
	one.bodyEl = false;
	one.rayEl = false;
	one.spawnControl = true;
	//Build Core
	if(objGen.core){
		one.core = objGen;
	} else if(objGen.layer){
		one.core = objGen.layer.all.parent.core;
		one.layer = objGen;
	}

//console.log(one.core)
	one.num = Math.random().toFixed(8);
	one.name = one.core.core.id + 'Phys' || 'objPhys';
	one.id = one.name + one.num;

	//Physc Settings
	one.loaded = false;
	one.type = 'static';
	one.shape = 'box';
	one.mass = 0;
	one.friction = 0;
	one.restitution = 0;
	one.connectTo = 0;
	one.linearDamping = 0.2;
	one.angularDamping = 0.2;
	//one.restLength = 0;
	one.length = 0;
	one.damping = 0;
	one.stiffness = 0;
	//Gravity
	one.worldAxis = new THREE.Vector3(0,-1,0);
	one.worldGravityStyle = 'earth';
	one.worldGravity = new THREE.Vector3(0,0,0);
	//Body
	one.body = {
		type: one.type,
		mass: one.mass,
		shape: 'none',
	};

	//Fixed Rotation
	one.fixedRotation = oneData.fixedRotation || false;

	//Shape
	one.shapes = {};
	//Building Blocks
	one.shapes.cylinder = {shape: 'cylinder', height: 1, radiusTop: 1, radiusBottom: 1, offset: '0 0 0',};
	one.shapes.box =  {shape: 'box', height: 1, width: 1, depth: 1, offset: '0 1 0',};
	one.shapes.sphere = {shape: 'sphere', radius: 1, width: 1, depth: 1, offset: '0 0 0',};
	//Default shape if none
	one.mainShape = oneData.shapeData || one.shapes.box;
	//Total shape of phys layer
	one.avatar = [one.mainShape,];
	one.avatarRemove = [];
	//Material
	one.bodymaterial = {
		friction: one.friction, 
		restitution: one.restitution
	};

	//Contraint Links
	one.connections = [];


	//Check Fixed Rotation
	const CheckFixedRotation = () => {
		//Toggle Fixed Rotation
		if(one.fixedRotation && !one.bodyEl.body.fixedRotation){
			one.bodyEl.body.fixedRotation = true;
			one.bodyEl.body.updateMassProperties();
		} else if(!one.fixedRotation && one.bodyEl.body.fixedRotation){
			one.bodyEl.body.fixedRotation = false;
			one.bodyEl.body.updateMassProperties();
		}
	}

	//Update Elements
	const UpdateElements = () => {
		one.bodyEl = one.core.GetEl();
		one.worldBody = one.bodyEl.body;
		if(uniRay){
			if(uniRay.core){
				one.rayEl = uniRay.GetEl();
			} else if(uniRay.layer){
				one.rayEl = uniRay.GetParentEl();
			}
		} else {
			one.rayEl = one.bodyEl;
		}
	}


	//On Spawn
	function onSpawn(){
		one.loaded = true;
		//Update internal dom links
		UpdateElements();
		//Reset Jump on collision
		//one.bodyEl.addEventListener("collide",JumpReset);
		//Check if Fixed Rotation needs updating
		CheckFixedRotation();
		//Add Phys
		AddPhys();
	}


	//Add Physics
	const AddPhys = () => {
		//Add Avatar
		one.core.ChangeSelf({property: 'shape', value: one.mainShape});
		//Add Body and Material
		one.core.ChangeSelf([{property: 'body', value: one.body}, {property: 'bodymaterial', value: one.bodymaterial}]);
		//Update Fixed Rotation if needed
		CheckFixedRotation();
	}
	//Remove Physics
	const RemovePhys = () => {
		//Remove Unneeded Old Shapes if Any
		if(one.avatarRemove.length > 0){
			for(let each in one.avatarRemove){
				one.core.RemoveComponent('shapes__'+ each)
			}
			one.avatarRemove = [];
		}
		//Add Avatar
		one.core.RemoveComponent(one.avatar);
		//Add Body and Material
		one.core.RemoveComponent(['body','bodymaterial']);
	}	


	//Update Phys Data
	const UpdatePhys = (data) => {
		if(data){
			for(let each in data){
				one[each] = data[each];
			}
		}
/*
    [position] Vec3 optional
    [velocity] Vec3 optional
    [angularVelocity] Vec3 optional
    [quaternion] Quaternion optional
    [mass] Number optional
    [material] Material optional
    [type] Number optional
    [linearDamping=0.01] Number optional
    [angularDamping=0.01] Number optional
    [allowSleep=true] Boolean optional
    [sleepSpeedLimit=0.1] Number optional
    [sleepTimeLimit=1] Number optional
    [collisionFilterGroup=1] Number optional
    [collisionFilterMask=1] Number optional
    [fixedRotation=false] Boolean optional
    [shape] Body optional
*/
		//Prep Core Components
		if(!one.core.core.components){
			one.core.core.components = {};
		}
		//Remove Old Shapes
		if(one.avatarRemove.length > 0){
			for(let each in one.avatarRemove){
				delete one.core.core.components['shapes__'+ each]
			}
		}
		//Add all Shapes
		for(let each in one.avatar){
			one.core.core.components['shapes__'+ each] = one.avatar[each];
		}
		//Add Body
		one.core.core.components.body = {property: 'body', value: one.body};
		//Add Body Material
		one.core.core.components.bodymaterial = {property: 'bodymaterial', value: one.bodymaterial};
		//If in scene, then change 
		if(one.loaded){
			//Remove Unneeded Shapes
			if(one.avatarRemove.length > 0){
				for(let each in one.avatarRemove){
					one.core.RemoveComponent('shapes__'+ each)
				}
				one.avatarRemove = [];
			}
			AddPhys();
		}
	}
	UpdatePhys(oneData);

	//Spawn Object
	const SpawnOne = () => {
		if(one.spawnControl){
			if(one.layer){
				one.layer.SpawnLayer();
			} else {
				one.core.SpawnCore();
			}
		}
		let spawnTimeout = setTimeout(() => {
			onSpawn();
			clearTimeout(spawnTimeout)
		}, 50);
	}
	//Despawn Object
	const DespawnOne = () => {
		if(one.spawnControl){
			if(one.layer){
				one.layer.DespawnLayer();
			} else {
				one.core.DespawnCore();
			}
		} else {
			RemovePhys();
		}
		one.worldBody = false;
		one.loaded = false;
	}

	//Constraints
	one.constraint = {};
//layer.linkMain.Link('linkMain',{position, type: 'auxspring', restLength: DistanceFromPlayer(position)});
	//Link
	const Linking = (distance) => {
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


//Kinemtatic and Static Body Links
//Static Body can be aimed to affect kinematic connection/launch point and power.

//Think of it like an elastic swing attached to the ceiling and the player waist. Things would be more dramatic such as walking up down, slidding to a stop, blast back on launch, fling the player or another object
	//Make this its own component and use with One

	//Temp til all is integrated
	let layer = {};

	//
	//Physics
	layer.playerPhysics = false;

	//Players Gravity

	//Earth Default
	layer.worldGravity = new THREE.Vector3(0,-9.8,0);
	layer.localAxis = new THREE.Vector3(0,0,0);
	layer.worldAxis = new THREE.Vector3(0,-1,0);
	//Float
	//layer.worldGravity = new THREE.Vector3(0,0,0);
	layer.gravity = new THREE.Vector3(0,0,0);
	layer.axis = new THREE.Vector3(0,-1,0);
	layer.gravity.copy(layer.worldGravity);

	//Joystick Movement Type
	layer.physMove = true;

	//Jumping
	layer.jumping = false;
	layer.jumpTimeout;
	//Phys Jump
	const PhysJump = (velocity) => {
		if(!layer.jumping){
			layer.jumping = true;
			if(!velocity){
				velocity = 5;
			}
			one.bodyEl.body.velocity.y = velocity;
			//use localAxis to multiple point the direction of the velocity which would be opposite if the current axis
		}
	}
	//Jump Reset
	const JumpReset = (e) => {
		const contactNormal = new CANNON.Vec3();
		const upAxis = new CANNON.Vec3(0,1,0);
		const contact = e.detail.contact;
		if(contact.bi.id == one.bodyEl.body.id){
			contact.ni.negate(contactNormal);
		} else {
			contactNormal.copy(contact.ni);
		}
		if(contactNormal.dot(upAxis) > 0.5){
			layer.jumping = false;
		}
	}

	//Make this its own component and use with One
	//
	//Gravity
	layer.gravityStyle = 'earth';
	//layer.gravityStyle = 'jupiter';
	//layer.gravityStyle = 'Custom';
	//To be able to apply new gravity direction on playerRig
	//Gravity Loop Tick
	//Velocity
	//layer.velocityStyle = 'anomaly';
	//layer.currentVelocity = 7;
	layer.velocityStyle = 'slam';
	layer.currentVelocity = 30;

	//layer.velocityStyle = 'float';
	//layer.currentVelocity = 1000;



	layer.tracking = false;
	layer.track2DInterval;
	//Determine 2D Ground Floor
	const Track2D = () => {
//console.log(intInit)
		let start = layer.raycaster.intersection || new THREE.Vector3(0,0,0);
		if(start.equals(new THREE.Vector3(0,0,0))){
			return;
		}
		let intersection = new THREE.Vector3(0,0,0);
		//let getr = new THREE.Vector3(0,0,0);
		//Now that we have the starter point determine the general direction be capture 1 additional point differnt that confirm the direction		

		//Earth Default Axis
		layer.worldAxis = new THREE.Vector3(0,-1,0);
		layer.tracking = true;
		layer.track2DInterval = setInterval(() => {
			if(layer.tracking){
				//grab raycaster information and grab intersection, if different then calc it's direction from and update player gravityAxis
				intersection.copy(auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
				if(!start.equals(intersection)){
					//calc out which variable is the same and determine its negative or positive direction based on the location offset of player
					if(start.x.toFixed(2) === intersection.x.toFixed(2)){
//console.log('X')
						if(start.x > 0){
//console.log('+X')
							layer.worldAxis = new THREE.Vector3(1,0,0);
						} else {
//console.log('-X')
							layer.worldAxis = new THREE.Vector3(-1,0,0);
						}
					} else if(start.y.toFixed(2) === intersection.y.toFixed(2)){
//console.log('Y')
						if(start.y > 0){
//console.log('+Y')
							layer.worldAxis = new THREE.Vector3(0,-1,0);
						} else {
//console.log('-Y')
							layer.worldAxis = new THREE.Vector3(0,1,0);
						}
					} if(start.z.toFixed(2) === intersection.z.toFixed(2)){
//console.log('Z')
						if(start.z > 0){
//console.log('+Z')
							layer.worldAxis = new THREE.Vector3(0,0,1);
						} else {
//console.log('-Z')
							layer.worldAxis = new THREE.Vector3(0,0,-1);
						}
					} else {
						//console.log('Cannot Calculate')
						//console.log(start)
						//console.log(intersection)
					}
					//console.log(start)
					//console.log(intersection)
					//console.log(layer.worldAxis)
					//layer.gravitys
					//layer.worldAxis = 
layer.localAxis.copy(layer.worldAxis);
//Rotate player rig body accordingly
if(!layer.worldAxis.equals(new THREE.Vector3(0,0,0))){
console.log({GravitationalAxisNew: layer.worldAxis})
} else {
console.log({GravitationalAxisFloat: layer.worldAxis})
}
					layer.tracking = false;
					clearInterval(layer.track2DInterval);
				}
				//auxl.mouseController.GetEl().components.raycaster.direction AXIS
				//console.log(auxl.mouseController.GetEl().components.raycaster)
			}
		}, 1);

	}

//Gravity

//I dont think I need to use localImpluse when I can just update it's velocity which is a world run function

//Make an option to update cannon world gravity for entire scene

//Ensure gravity compensates for world gravity


	const Gravity = (gravityDir) => {
		//first get current world gravity to negate and start with
		//then add propery gravity offset this.el.body.applyLocalForce(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
		//in the direction of the currently calculated trajectory
		//Reset current
	//layer.gravity = new THREE.Vector3(0,0,0);
	//layer.axis = new THREE.Vector3(0,-1,0);

		//6 Directions & Free Roam
		layer.gravitys = [
			new THREE.Vector3(0,0,0),
			new THREE.Vector3(0,-1,0),
			new THREE.Vector3(-1,0,0),
			new THREE.Vector3(0,0,-1),
			new THREE.Vector3(0,1,0),
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(0,0,1),
		];

		//Gravity Orientation Detection
		//Grab start pos at mouseEnter
		//Grab enough via tick to determine the axis direction between 1 of the 6
		//Apply that to the player rig via tick unless float is enabled in whichcase, only apply the new gravity with just negateGravity

		let playerPositionOld = new THREE.Vector3(0,0,0);
		let playerPosition = new THREE.Vector3(0,0,0);
		layer.velocity = new THREE.Vector3(0,0,0);
		let velocityTick = 0
let testVec = new THREE.Vector3(0,0,0);

		layer.playerGravityInterval = setInterval(() => {
			if(one.bodyEl && one.bodyEl.body){

				let negateGravity = new THREE.Vector3(0,0,0);
				
//Get Velocity Working on continual downward localAxis trajectory
				playerPosition.copy(one.bodyEl.body.position)
//console.log({pos1: playerPosition.y, pos2 : playerPositionOld.y})

//Check proper axis and amount
//layer.localAxis
				let velocityDir = new THREE.Vector3(0,0,0);
				let addVelocity = false;
				if(layer.worldAxis.x !== 0){
					if(layer.worldAxis.x < 0){
						if(playerPosition.x < playerPositionOld.x){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.x > playerPositionOld.x){
							//Add velocity
							addVelocity = true;
						}
					}
				} else if(layer.worldAxis.y !== 0){
					if(layer.worldAxis.y < 0){
						if(playerPosition.y < playerPositionOld.y){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.y > playerPositionOld.y){
							//Add velocity
							addVelocity = true;
						}
					}
				} else if(layer.worldAxis.z !== 0){
					if(layer.worldAxis.z < 0){
						if(playerPosition.z < playerPositionOld.z){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.z > playerPositionOld.z){
							//Add velocity
							addVelocity = true;
						}
					}
				}

//Measure specific axis and greater and less then checks
//Velocity will always be down Y
				if(addVelocity){
				//if(playerPosition.y < playerPositionOld.y){
					//add velocity to fall
					velocityTick++;
//console.log(layer.velocity)
//console.log('Adding Velocity')
//console.log(one.bodyEl.body.velocity)
let velocityNew = new THREE.Vector3((velocityTick/layer.currentVelocity),(velocityTick/layer.currentVelocity),(velocityTick/layer.currentVelocity));
velocityNew.multiply(layer.localAxis)
one.bodyEl.body.velocity.x += velocityNew.x;
one.bodyEl.body.velocity.y += velocityNew.y;
one.bodyEl.body.velocity.z += velocityNew.z;
//one.bodyEl.body.velocity.y -= velocityTick/25;
//layer.velocity.sub(new THREE.Vector3(0,(velocityTick/100),0));
//layer.velocity.add(0.01)
//let velocityNew = new THREE.Vector3((velocityTick/100),(velocityTick/100),(velocityTick/100));
//velocityNew.multiply(layer.localAxis)
//layer.velocity.add(velocityNew);
				} else {
					layer.velocity = new THREE.Vector3(0,0,0);
					velocityTick = 0;
				}
if(layer.toggle3){
	velocityTick = 0;
}
//if parachuting, then no velocity
//add momentum
				playerPositionOld.copy(playerPosition);
				//let worldGravity = new THREE.Vector3(0,0,0);
				//Apply Gravity
				if(!negateGravity.equals(one.bodyEl.body.world.gravity)){
					//update base gravity to build cancel out world defaults if any
					negateGravity.copy(one.bodyEl.body.world.gravity);
					//Calculate exact opposite to null out world defaults
					negateGravity.negate();
				}
				//Gravity Adjustments
				layer.gravityScale = new THREE.Vector3(1,1,1);

				//Fresh to Apply Gravity
				let gravityNew = new THREE.Vector3(0,0,0);
				//Negate World Gravity if Any
				gravityNew.copy(negateGravity);
//console.log(gravityNew)
		//console.log(one.core.el.body.world.gravity)
		//console.log(gravityNew)

		//Earth 1g = 9.80665 m/s
		//Moon 0.1657g
		//Jupiter 2.528g
		//IO 0.183g
		//Mars 0.379g
		//Uranus 0.886g
		//Neptune 1.137g
		//Sun 28.02g
		//Pluto 0.063g
		//Saturn 1.065g
				let gravityAmount = 0;
				if(layer.gravityStyle === 'float'){
					//Negate World Gravity
				} else if(layer.gravityStyle === 'earth'){
					//Earth AU
					//Apply -9.8 in 1 direction of axis
//console.log(layer.gravityStyle)
					gravityAmount = 9.8;
				} else if(layer.gravityStyle === 'moon'){
					//Moon AU 16.% of Earth
					//Apply -1.6268 in 1 direction of axis
					gravityAmount = 1.6268;
				} else if(layer.gravityStyle === 'jupiter'){
					//Jupiter AU
					//Apply -24.7912112 in 1 direction of axis
					gravityAmount = 24.7912112;
				} else if(layer.gravityStyle === 'io'){

				} else if(layer.gravityStyle === 'mars'){

				} else if(layer.gravityStyle === 'Uranus'){

				} else if(layer.gravityStyle === 'Neptune'){

				} else if(layer.gravityStyle === 'Sun'){

				} else if(layer.gravityStyle === 'Pluto'){

				} else if(layer.gravityStyle === 'Saturn'){

				} else if(layer.gravityStyle === 'Custom'){
					//gravityAmount = 16;
					gravityAmount = 12;
				}



//console.log(gravityAmount)
				let gravityTemplate = new THREE.Vector3(0,0,0);
				gravityTemplate = new THREE.Vector3(gravityAmount,gravityAmount,gravityAmount);
//console.log(gravityTemplate)
				gravityNew.add(gravityTemplate);
//console.log(gravityNew)
//console.log(layer.localAxis)
				//Set gravity to worldVrctor from Axis
				gravityNew.multiply(layer.localAxis);
//console.log(gravityNew)
				//Gravity Scale
				gravityNew.multiply(layer.gravityScale);
				//Add Up Velocity
//console.log(gravityNew)
				//gravityNew.add(layer.velocity);
//console.log(gravityNew)
				//Apply Gravity
				//one.bodyEl.body.applyLocalForce(gravityNew, new THREE.Vector3(0,0,0));
				//one.bodyEl.body.applyLocalForce(gravityNew, new THREE.Vector3(0,0,0));
				one.bodyEl.body.velocity.x += gravityNew.x/50;
				one.bodyEl.body.velocity.y += gravityNew.y/50;
				one.bodyEl.body.velocity.z += gravityNew.z/50;


				//one.bodyEl.body.applyLocalForce(new THREE.Vector3(0,100,0), new THREE.Vector3(0,0,0));
				layer.gravity.copy(gravityNew);
//console.log(gravityNew)
			}
		}, 1);
	}

	//Cursor|Link
	//VR Dual 6Dof Controller Raycaster
	//
	//Extend from raycaster
	//Object Intersecting
	//Object synced attached to raycaster movement/rotation
	const Link = (data) => {
		//Currently setup for a single link to player
		//Link
		layer.distance = 40;
		//Need a system for building link to self, link to link and link to links
		//Link Controller
		auxl.linkHoverMenuData = {
		info:{
			id: 'linkHoverMenu',
			buttonData: auxl.menuCylinderData,
			hoverData: auxl.menuHoverData,
			title: 'Link Hover Menu',
			description: 'A link hover menu for quick access.',
			layout:'circleUp',
			offset: -1,
			attached: false,
			parent: 'playerBody',
			posOffset: new THREE.Vector3(0,1.5,-2),
		},
		menu:{
			button0:{
				id: 'action1',
				style: false,
				title: 'Rubber',
				description: 'Launch yourself at link.',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'rubber',
					menu: 'close',
				},
			},
			button1:{
				id: 'action2',
				style: false,
				title: 'Power',
				description: 'Swing from a far current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'power',
					menu: 'close',
				},
			},
	/*
			button2:{
				id: 'action3',
				style: false,
				title: 'Weak',
				description: 'Connect from short current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'weak',
					menu: 'close',
				},
			},
	*/
	/*
			button3:{
				id: 'action4',
				style: false,
				title: 'Mid',
				description: 'Connect from mid current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'mid',
					menu: 'close',
				},
			},
	*/
			button4:{
				id: 'action5',
				style: false,
				title: 'Swing',
				description: 'Swing from current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'swing',
					menu: 'close',
				},
			},
		},
		};
		auxl.linkHoverMenu = auxl.HoverMenu(auxl.linkHoverMenuData);

		let maxLinkLength = 30;
		layer.linkLength = 1;
		//2 Modes 
		//Link to Self
		//Link to Other

		//Get 1 link tp self working for now

		//Link
		let linkData = {
			data:'linkData',
			id: 'linkCore',
			sources: false,
			text: false,
			geometry: {primitive: 'sphere', radius: 0.5,},
			material: {shader: "standard", color: "#ebd107", emissive: '#ebd107', emissiveIntensity: 0.25, opacity: 0.75},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: {
				body:{type: 'static', shape: 'none', mass: 0,},
				bodymaterial: {friction: 0, restitution: 0},
	/*
				auxspring:{
					connectTo: 'playerRig',
					restLength: 1,
					damping: 0.5,
					stiffness: 10,
					collideConnected: false,
					always: true,
				},
				*/
			},
		};
		//let name = 'magLink' + Object.keys(layer.links).length;
		layer.linkCore = auxl.Core(auxl.CoreDataFromTemplate(linkData, false, true));
		layer.linkConfig = {
			type: 'auxspring',
			to: 'playerRig',
			minOneLength: 0,
			maxOneLength: 30,
			restLength: 1,
			damping: 0.5,
			stiffness: 10,
		};
		layer.linkCoreConstraint = auxl.Constraints(layer.linkCore, layer.linkConfig, false)
		layer.linkCoreType = 'rubber';

		//Anchor Core
		let anchorData = {
			data:'anchorData',
			id: 'anchorCore',
			sources: false,
			text: false,
			geometry: {primitive: 'sphere', radius: 0.5,},
			material: {shader: "standard", color: "#eb07bf", emissive: '#eb07bf', emissiveIntensity: 0.25, opacity: 0.5},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: false,
		};
		layer.anchorCore = auxl.Core(anchorData);

		const LinkControls = (template) => {
			layer.linkCoreType = template;
			if(layer.linkCoreType === 'rubber'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 20,
					restLength: 0,
					damping: 0.0001,
					stiffness: 1000,
				}
			} else if(layer.linkCoreType === 'power'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 40,
					restLength: 3,
					damping: 0.5,
					stiffness: 100,
				}
			} else if(layer.linkCoreType === 'swing'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 100,
					restLength: 1,
					damping: 0.3,
					stiffness: 100,
				}
			}
			layer.linkCoreConstraint.Update(layer.linkConfig);
		}

		layer.linkInterval;
	}
	Link();
	console.log('Link ran')

	//Add to playerRig a support component for updating important info
	//Power Controller
	const PowerController = (event) => {
console.log({event: 'Power Controller Running', event})
		//depending on the event input run power section
//layer.raycaster.powers.forEach(power => power.start())
for(let power in layer.raycaster.powers){
console.log(power)
}

	}

	const PowerCircuits = (event) => {
		//auxl.uniRay.updateAction({instructions:'inst'});
		//auxl.uniRay.disableAction({instructions:'inst'});
	}
	//
	//Actions

	//Main Input Function
	//Get Ray Data

	//Using raycaster, point click and hold to map out the 2D surface, just a flick basically to determine dual xyz coords to have a force applied to the object as if it wore normal gravity.

	//Monkeyball Sphere Pin Float Vehicle
	//Pin an object with low rubber band pool and float the user. Use can tug themselves in various directions with the environment sphere 

	//Both need to connect to closest intersection object if instead

	//spin object
	//el.body.torque.y += 100;
/*
RubberbandDown
RubberbandSlamDown
teleportDown
ChuteDown
BoostDown
BackBoostDown


Use with any raycaster
*/

	//Rubberband
	const RubberbandUp = (event) => {
		if(layer.toggle0){
//console.log(event)
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			//console.log('RubberbandUp')
			clearInterval(layer.playerLinkInt);
	//instead of event.detail.intersection.point
	//get camera/hand direction and multiple by distance
	//always a set distance?

	//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead

			layer.building = false;
			layer.power /= 1000;
			layer.positionNew = new THREE.Vector3();
			layer.position = new THREE.Vector3();
			layer.quaternion = new THREE.Quaternion();
			//layer.position.copy(GetCameraDirection());
			layer.object3D = one.rayEl.object3D;
			layer.quaternion.copy(layer.object3D.quaternion);
			layer.position.copy(one.bodyEl.body.position);

		//console.log(one.rayEl.Object3D.getWorldDirection())
		//layer.position.copy(one.rayEl.object3D.getLocalDirection()));
		//console.log(layer.quaternion)
		//console.log(layer.position)
				//layer.position.negate();
		//console.log(layer.position)
			// Step 1: Get the Object3D's rotation as a Quaternion
			const rotationQuaternion = layer.quaternion.clone();
			// Step 2: Create a direction vector pointing towards the positive Z-axis
			const direction = new THREE.Vector3(0, 0, -1);
		//console.log(direction)
			// Step 3: Apply the object's rotation to the direction vector
			direction.applyQuaternion(rotationQuaternion);
		//console.log(direction)
		//console.log(layer.distance)
			// Step 4: Scale the direction vector to the desired distance
			direction.multiplyScalar(layer.distance);
		//console.log(direction)
			// Step 5: Add the scaled direction vector to the Object3D's position
			layer.positionNew = layer.position.clone().add(direction);
				//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	//console.log(layer.positionNew)
	//console.log(layer.distance)
	//console.log(layer.power)
			auxl.player.LinkTo(layer.positionNew, layer.power);
		}
	}
	//Rubberband
	const RubberbandDown = (event) => {
		if(layer.toggle0){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power >= 15){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}
			}, 1);
		}
	}
//console.log(powerRubberband)
	//
	//A Rubber Band Slam
	//Quick pull towards the point and decrease the restLength
	//Rubberband
	const RubberbandSlamUp = (event) => {
if(layer.toggle1){
	//console.log(event)
	//console.log('Link')
	//console.log(this.data.type)
	//console.log(event)
	//console.log('click')
	clearInterval(layer.playerLinkInt);
//instead of event.detail.intersection.point
//get camera/hand direction and multiple by distance
//always a set distance?

//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead

	layer.building = false;
	layer.power /= 1000;
	layer.positionNew = new THREE.Vector3();
	layer.position = new THREE.Vector3();
	layer.quaternion = new THREE.Quaternion();
	//layer.position.copy(GetCameraDirection());
	layer.object3D = one.rayEl.object3D;
	layer.quaternion.copy(layer.object3D.quaternion);
	layer.position.copy(one.bodyEl.body.position);

//console.log(one.rayEl.Object3D.getWorldDirection())
//layer.position.copy(one.rayEl.object3D.getLocalDirection()));
//console.log(layer.quaternion)
//console.log(layer.position)
	//layer.position.negate();
//console.log(layer.position)
// Step 1: Get the Object3D's rotation as a Quaternion
const rotationQuaternion = layer.quaternion.clone();
// Step 2: Create a direction vector pointing towards the positive Z-axis
const direction = new THREE.Vector3(0, 0, -1);
//console.log(direction)
// Step 3: Apply the object's rotation to the direction vector
direction.applyQuaternion(rotationQuaternion);
//console.log(direction)
//console.log(layer.distance)
// Step 4: Scale the direction vector to the desired distance
direction.multiplyScalar(layer.distance);
//console.log(direction)
// Step 5: Add the scaled direction vector to the Object3D's position
layer.positionNew = layer.position.clone().add(direction);
	//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
//console.log(layer.positionNew)
//console.log(layer.distance)
//console.log(layer.power)
	auxl.player.SlamTo(layer.positionNew, layer.power, layer.distance);



		}
	}
	//Rubberband
	const RubberbandSlamDown = (event) => {
		if(layer.toggle1){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}



	//Teleport
	//teleportUp
	const teleportUp = (event) => {
		if(layer.toggle3){
//console.log(event)
		//layer.distance = 50;
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			//console.log('teleportUp')
			clearInterval(layer.playerLinkInt);
	//instead of event.detail.intersection.point
	//get camera/hand direction and multiple by distance
	//always a set distance?

	//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead
	//layer.worldAxis = new THREE.Vector3(0,-1,0);
			layer.building = false;
			layer.power /= 1000;
			layer.positionNew = new THREE.Vector3();
			layer.position = new THREE.Vector3();
			layer.quaternion = new THREE.Quaternion();
			//layer.position.copy(GetCameraDirection());
			layer.object3D = one.rayEl.object3D;
			layer.quaternion.copy(layer.object3D.quaternion);
			layer.position.copy(one.bodyEl.body.position);

		//console.log(one.rayEl.Object3D.getWorldDirection())
		//layer.position.copy(one.rayEl.object3D.getLocalDirection()));
		//console.log(layer.quaternion)
		//console.log(layer.position)
				//layer.position.negate();
		//console.log(layer.position)
			// Step 1: Get the Object3D's rotation as a Quaternion
			const rotationQuaternion = layer.quaternion.clone();
			// Step 2: Create a direction vector pointing towards the positive Z-axis
			const direction = new THREE.Vector3(0, 0, -1);
			const tweak = new THREE.Vector3(0, 0, 0);
		//console.log(direction)
			// Step 3: Apply the object's rotation to the direction vector
			direction.applyQuaternion(rotationQuaternion);
		//console.log(direction)
		//console.log(layer.distance)
			// Step 4: Scale the direction vector to the desired distance
			tweak.multiplyScalar(new THREE.Vector3(0, 0, 0));
			direction.multiplyScalar(layer.distance/2);
		//console.log(direction)
			// Step 5: Add the scaled direction vector to the Object3D's position
			layer.positionNew = layer.position.clone().add(direction);
				//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	//console.log(layer.positionNew)
	//console.log(layer.distance)
	//console.log(layer.power)
			auxl.player.TeleportTo(layer.positionNew, layer.power);
		}
	}
	//teleportDown
	const teleportDown = (event) => {
		if(layer.toggle3){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}

	//?????
	//Parachute
	const ChuteUp = () => {
		if(layer.toggle3){
			!layer.toggle3
		}
	}
	const ChuteDown = () => {
		if(!layer.toggle3){
			layer.toggle3
		}
	}


	//Boost
	const BoostUp = (event) => {
		if(layer.toggle4){
console.log('BoostUp')
			clearInterval(layer.playerLinkInt);
			//Power
			layer.boostPower = 100;
			auxl.player.BoostTo(layer.positionNew, layer.boostPower);
		}
	}
	//BoostDown
	const BoostDown = (event) => {
		if(layer.toggle4){
console.log('Boost Down')
			//console.log(event)
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}


	//BackBoostUp
	const BackBoostUp = (event) => {
		if(layer.toggle5){
console.log('BackBoostUp')
			clearInterval(layer.playerLinkInt);

			//Power
			layer.boostPower = 75;
			auxl.player.BoostBack(layer.positionNew, layer.boostPower);
		}
	}
	//BackBoostDown
	const BackBoostDown = (event) => {
		if(layer.toggle5){
console.log('BackBoost Down')
			//console.log(event)
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}

//Charge Jump
//Boost affects are being added/messed with elsewhere. Look into to clear up.

	layer.boostPower = 100;
	//Boost Back
	const BoostBack = (position, power) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
		one.bodyEl.body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower),new THREE.Vector3(0,0,0));
/*
		one.bodyEl.body.linearDamping = 0;
		let boost = setTimeout(() => {
			one.bodyEl.body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}

	//Boost To
	const BoostTo = (position, power,) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
//camDir.copy(camDir).add(new THREE.Vector3(power, power, power).normalize().multiplyScalar(power));
//let distance = power * DistanceFromPlayer(position)

//let boostDir = new THREE.Vector3();
//boostDir.copy(GetCameraDirection());
//boostDir.copy(camDir).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
//boostDir.negate();
//console.log({imported: position, distance, built: camDir, boost: boostDir})

//
		//Instead of constraint, update physMove
		//one.bodyEl.body.applyLocalImpulse(boostDir,new THREE.Vector3(0,0,0));
		one.bodyEl.body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower).negate(),new THREE.Vector3(0,0,0));
/*
		one.bodyEl.body.linearDamping = 0;
		let boost = setTimeout(() => {
			one.bodyEl.body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}

	//Boost Jump
	const BoostJump = (position, power) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
//camDir.multiply(new THREE.Vector3(0,1,0));
camDir.multiply(layer.localAxis);
		one.bodyEl.body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower),new THREE.Vector3(0,0,0));
/*
		one.bodyEl.body.linearDamping = 0;
		let boost = setTimeout(() => {
			one.bodyEl.body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}


	//Slow
	const Slow = () => {
		one.bodyEl.body.linearDamping = 0.8;
	}
	//UnSlow
	const UnSlow = () => {
		one.bodyEl.body.linearDamping = 0.15;
	}

	//Freeze
	const Freeze = () => {
		one.bodyEl.body.sleep();
	}
	//UnFreeze
	const UnFreeze = () => {
		one.bodyEl.body.wakeUp();
	}

	//Waiting
	//Light Sword Down
	const LightSwordDown = (event) => {
console.log('Light Sword Down')
//extract light sword and attach to hand rotation/position
	}
	//Light Sword Up
	const LightSwordUp = (event) => {
console.log('Light Sword Up')
//Retract light sword and disconnect it
	}
	//Light Sword Effects
	const LightSwordCollision = (event) => {
console.log({log: 'Light sword collided with object', event})
//4 Direction Types
//0 1 0 : Straight up | Sword
//0 0 -1 : Straight out | Claw
//0 -1 0 : Straight out | Dagger
//0 0 1 : Straight out | Shield


	}

	//Link To
	const LinkTo = (position, power) => {
		if(!layer.linking){
		console.log('Link To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect
//layer.raycaster.instersection

//console.log(one.bodyEl.object3D.position)
//console.log(layer.raycaster.intersection)
if(!position){
	//Calculate the position based on the direction and distance
	position = new THREE.Vector3();
	position.copy(GetCameraDirection());
	position.copy(position).add(new THREE.Vector3(layer.distance * layer.power, layer.distance * layer.power, layer.distance * layer.power).normalize().multiplyScalar(layer.distance * layer.power));
} 
if(layer.raycaster.intersection){
console.log(layer.raycaster.intersection)
	//let rayCheck = layer.raycaster.intersection.distanceTo(one.bodyEl.object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance * layer.power){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
	}
}

let distance = DistanceFromPlayer(position);


/*
	if(!position){
		//Calculate the position based on the direction and distance
		position = new THREE.Vector3();
		position.copy(GetCameraDirection());
		position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
	} else {
console.log(position)
	}
	distance = DistanceFromPlayer(position);
*/
		//Sping
		//Spring Point
		//Jump to Distance aka power
		//Spawn, spring, despawn
		//Closer to 0, the greater the power
/*
		if(power < 0.1){
console.log('full power hit')
console.log('full power hit')	
			power = -1;
		} else if(power > 0.7){
console.log('quick hit power hit')
			power = 0.4;
		} else if(power < 0.7){
console.log('long hit power hit')
			power = -0.4;
		}

		if(power > 0.05){
//Noodle Bamboo
console.log('quick power hit')
			power += 0.8;
		} else if(power > 0.7){
//Launch Swing
console.log('quick power hit')
			power *= 2;
		}
 if(power < 0.6){
//Launch Swing
console.log('quick power hit')
			power = 1;
		}
 if(power < 0.7){
//Launch Swing
console.log('extra power hit')
			power *= 2;
		}
*/
//else
//Swing
		if(power > 0.85){
//Noodle Bamboo
console.log('quick hit')
			power += 0.75;
		} else if(power < 0.8){
//Noodle Bamboo
console.log('normal hit')
			//power += 1.6;
		}
		layer.linkLength = 35 * power;
		//layer.linkLength = distance * power;
		//layer.linkLength = (distance * power)*-1;
//console.log({length: layer.linkLength, distance, power})
		//layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		layer.linkCoreConstraint.Connect({type: 'auxspring', restLength: layer.linkLength, damping: 0.5, stiffness: 0, maxForce: 1e6});
		//Display Link
		if(layer.linkCore.core.inScene){
			layer.linkCore.PhysPos(position);
		} else {
//console.log('Spawn')
			layer.linkCore.core.position = position;
			layer.linkCore.SpawnCore();
		}
//Swing
/*
//use point to point instead
		if(above){
			//Swing
			//Display Hook on falling, but disable constraint
			layer.linkCoreConstraint.Disable();
			clearInterval(layer.linkInterval)
			let connect = new THREE.Vector3();
			connect.copy(position)
			layer.linkInterval = setInterval(() => {
	console.log('link checking')
				if(position.y >= GetPlayerInfo().pos.y){
	console.log('link hit')
					layer.linkLength = distance;
					layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
					layer.linking = false;
					//layer.linkCoreConstraint.Connect({type: 'pointToPoint'});
					clearInterval(layer.linkInterval)
				}
			}, 1);
		} else {
			layer.linkLength = distance * power;
		}
*/
		}
	}

	//Slam To
	const SlamTo = (position, power) => {
		if(!layer.linking){
		console.log('Slamming To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect
//console.log(one.bodyEl.object3D.position)
//console.log(layer.raycaster.intersection)
if(!position){
	//Calculate the position based on the direction and distance
	position = new THREE.Vector3();
	position.copy(GetCameraDirection());
	position.copy(position).add(new THREE.Vector3(layer.distance, layer.distance, layer.distance).normalize().multiplyScalar(layer.distance));
} 
if(layer.raycaster.intersection){
	//let rayCheck = layer.raycaster.intersection.distanceTo(one.bodyEl.object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
	}
}
		
	//Distance
	layer.linkLength = 0;

	//Instead of constraint, update physMove
	layer.linkCoreConstraint.Connect({type: 'distance', distance: layer.linkLength, maxForce: 1e6});
console.log(layer.linkCoreConstraint)

	//Change Damping
	console.log(one.bodyEl.body)
	let slamTimeout = setTimeout(() => {
		one.bodyEl.body.linearDamping = 1;
		let slamTimeout2 = setTimeout(() => {
			one.bodyEl.body.linearDamping = 0.15;
		}, 250);
	}, 1000);

	//Display Link
	if(layer.linkCore.core.inScene){
		layer.linkCore.PhysPos(position);
	} else {
//console.log('Spawn')
		layer.linkCore.core.position = position;
		layer.linkCore.SpawnCore();
	}


		}
	}

	//Teleport To
	const TeleportTo = (position, distance) => {
		//Teleport
//Calculate the position based on the direction and distance
position = new THREE.Vector3();
position.copy(GetCameraDirection());
position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));

if(layer.raycaster.intersection){
	//let rayCheck = layer.raycaster.intersection.distanceTo(one.bodyEl.object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
		let above = new THREE.Vector3();
		above.copy(layer.worldAxis)
		above.negate();
		above.multiplyScalar(5);

		position.add(above);
	}
}
		//Instead of constraint, update physMove
		one.core.PhysPos(position)
		one.bodyEl.body.linearDamping = 1;
		//layer.linkCoreConstraint.Connect({type: 'distance', distance: layer.linkLength, maxForce: 1e6});
	console.log(layer.linkCoreConstraint)

		//Change Damping
		console.log(one.bodyEl.body)
		let slamTimeout = setTimeout(() => {
			one.bodyEl.body.linearDamping = 0.15;
			clearTimeout(slamTimeout)
		}, 1000);
	}


	//Delink
	const Delink = () => {
		if(layer.linkCore.core.inScene){
console.log('Delink');
			layer.linkCore.DespawnCore();
		}
	}
	//Link Length Up restLength
	const LinkUp = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Up');
			if(layer.linkLength < maxLinkLength){
				layer.linkLength++;
			}
			layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Length Down restLength
	const LinkDown = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Down');
			if(layer.linkLength > 1){
				layer.linkLength--;
			}
			layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Grab
	const LinkGrab = (link, el) => {
console.log('Link Grab');
console.log(el)

//Instead of contraint, anim body to player holding point

/*
one.core.ChangeSelf({property: 'body', value:{mass: 0}});
el.setAttribute('auxconstraint', {type: 'distance', connectTo: 'playerRig', distance: 1,})

let grabTimeout = setTimeout(() => {
one.core.ChangeSelf({property: 'body', value:{mass: bodyWeight}});
clearTimeout(grabTimeout)
}, 1000);
*/
	}
	//Link Drop
	const LinkDrop = (link, name) => {
console.log('Link Drop');
console.log(name)
	}
	//Link Shoot
	const LinkShoot = (link, name) => {
console.log('Link Shoot');
console.log(name)
	}
	//Link Hit
	const LinkHit = (link, event) => {
console.log('Link Hit');
console.log(event.target)
console.log(event.detail)
console.log(event.detail.intersection.point)
		//Apply directional impulse force at point of intersection
		let impulse = GetCameraDirection();
		impulse.x *= -2;
		impulse.y *= -2;
		impulse.z *= -2;
		event.target.body.applyLocalImpulse(impulse,new THREE.Vector3(0,0,0));
		}





	//Phys Boost
	const PhysBoost = (velocity) => {
		if(!velocity){
			velocity = 10;
		}
		one.bodyEl.body.velocity.y = velocity;
	}
	//Phys Dash
	const PhysDash = (direction,velocity) => {
		if(!direction){
			direction = 'reverse';
		}
		if(!velocity){
			velocity = 10;
		}
		//Works the best with friction
		one.bodyEl.body.applyLocalImpulse(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));

		//one.bodyEl.body.applyImpulse(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//one.bodyEl.body.applyForce(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//one.bodyEl.body.applyLocalForce(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//one.bodyEl.components.locomotion.directionXZ(direction, velocity,)
	}
	//Outdated, controlled in Gravity()
	//Low Grav
	const LowGrav = () => {
		//one.bodyEl.body.applyLocalForce(new THREE.Vector3(0,4.8,0),new THREE.Vector3(0,0,0));
//applying a small (less than gravity) upward force every tick. 
	}
	//Phys Pickup
	const PhysPickup = (object) => {
		//one.uniRay.ChangeSelf({property: 'auxconstraint__'+object, value: {type: 'lock', connectTo: object, maxForce: 1e6, collideConnected: false}});
	}

	//Phys Drop
	const PhysDrop = (object) => {
		//one.uniRay.RemoveComponent('auxconstraint__'+object);
	}

	//Physics Position
	const PhysPos = (core,pos) => {
		if(core.el.body){
			if(core.inScene){
				core.el.body.position.copy(pos);
				core.el.object3D.position.copy(pos);
			}
		}
	}

	//Toggle Actions
	const ToggleAction = (toggle) => {
		layer.toggle0 = false;
		layer.toggle1 = false;
		layer.toggle2 = false;
		layer.toggle3 = false;
		layer.toggle4 = false;
		layer.toggle5 = false;
		if(toggle === '0'){
			layer.toggle0 = true;
		} else if(toggle === '1'){
			layer.toggle1 = true;
		} else if(toggle === '2'){
			layer.toggle2 = true;
		} else if(toggle === '3'){
			layer.toggle3 = true;
		} else if(toggle === '4'){
			layer.toggle4 = true;
		} else if(toggle === '5'){
			layer.toggle5 = true;
		} else {
			Delink();
		}
	}

	return {one, SpawnOne, DespawnOne, UpdatePhys, Link, Unlink, UnlinkAll, Track2D, Freeze, UnFreeze, ToggleAction};
//UniRay Support
//Ray Straight Line
//Ray Arc Line

//Physics Power

//world gravity
//maxForce
//damping
//stiffness
//restLength
//friction
//restitution
//angular damping
//linear damping
//locking rotation
//locking position
//World Scale
//Constraints

//Enable/Disable All
//Toggle body no clip
//Walk
//Skate
//Boost
//Dash
//Jump
//Float
//Gravity
//Gravity Axis
//Velocity
//Fly
//Parachute
//Glide
//Bounce
//Yoyo Rubber Link
//Yoyo Swing Link
//Yoyo Land Link
//Teleport
//Freeze
//Slow
//Hover Board
//Grab
//Drop
//Climb
//Climb Ledge
//Projectile Trigger Launch
//Projectile Pull Back Launch
//Projectile Pitch/Lob Launch
//Projectile Arc Launch

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
/*
//Menus to Customize with
//1x Core
//1x Layer
//Yx ObjGen
//1x Null
//Zx Templates

//Be able to toggle through different MultiAssets object selections and settings from sizes, colors to Buildings changing into Hills, despawn and regenerate then respawn.



	//player.id
//Spawn a multi-menu
// w/ various individual options for each type of Core/Layer/Other
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



//Color Family Import Options
function ColorFamilyButtonGen(){
//color categories : warm,cool,extreme
	let colorFamilies = ['red','orange','yellow','lime','blue','cyan','magenta','maroon', 'olive','green','purple','teal','navy','silver','grey','black', 'white'];
	let current = 0;
	let page = 0;
	let max = 6;
	one.buildMenuData['coreMaterialColorPage'+page] = {};
//console.log(one.buildMenuData)
//console.log(one.buildMenuData['coreMaterialColorPage'+page])
	for (let color in colorFamilies){
//console.log(colorFamilies[color])
		one.buildMenuData['coreMaterialColorPage'+page]['button'+current] = {};
		let button = {
			id: 'action'+current,
			style: false,
			title: colorFamilies[color],
			description: 'Update the core Material to ' + colorFamilies[color],
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateMaterial',
				params: colorFamilies[color],
				menu: 'stay',
			},
		};
		let next = {
			id: 'subMenu'+page,
			style: false,
			title: 'Page '+(page+1),
			description: 'Next Page > '+page,
			subMenu: 'coreMaterialColorPage'+(page+1),
			action: false,
		};
		if(current >= max){
			one.buildMenuData['coreMaterialColorPage'+page]['button'+current] = next;
			page++;
			current = 0;

		} else {
			one.buildMenuData['coreMaterialColorPage'+page]['button'+current] = button;
		}
		//one.buildMenuData.current['button'+current] = button;
		current++;
	}
}

//
//Sub Menus


//Left A
//PURPLE
//Build Menu
one.buildCoreData = {
data:'buildCoreData',
id:'buildCore',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#b011c4", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#b011c4", emissiveIntensity: 0.4, side: 'double',  },
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
one.buildMenuData = {
	info:{
		id: 'buildMenu',
		buttonData: one.buildCoreData,
		hoverData: auxl.buildHoverData,
		title: 'Build Mode',
		description: 'Build objects.',
		layout:'circleUp',
		//posOffset: new THREE.Vector3(-1.4,-0.2,0.11),
		//posOffset: new THREE.Vector3(-1.5,-0.2,0.22),
		//posOffset: new THREE.Vector3(-1.5,0.13,0.11),
		//posOffset: new THREE.Vector3(-1.625,0.13,0.11),
		//offset: 1.25,
		//posOffset: new THREE.Vector3(1.75,0.13,-0.11),
		posOffset: new THREE.Vector3(0,0,0.11),
		offset: -1.425,
		parent: 'ghostParent',
		//look: {buffer: 0.65, drag: 0.25, match: 'camera', x:true, y:true, z:true},
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
			id: 'subMenu0',
			style: false,
			title: 'Page 0',
			description: 'Go to Color Page 0',
			subMenu: 'coreMaterialColorPage0',
			action: false,
		},
		button1:{
			id: 'subMenu1',
			style: false,
			title: 'Page 1',
			description: 'Go to Color Page 1',
			subMenu: 'coreMaterialColorPage1',
			action: false,
		},
		button2:{
			id: 'subMenu2',
			style: false,
			title: 'Page 2',
			description: 'Go to Color Page 2',
			subMenu: 'coreMaterialColorPage2',
			action: false,
		},
	},
	coreMaterialColorPage0:{

	},
	coreMaterialColorPage1:{

	},
	coreMaterialColorPage2:{

	},
	coreMaterialColorPage3:{

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

		button0:{
			id: 'PosX',
			style: false,
			title: 'X',
			description: 'Update the X axis.',
			subMenu: 'menu1',
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdatePosition',
				params: 'x',
				menu: 'stay',
			},
		},
		button1:{
			id: 'PosY',
			style: false,
			title: 'Y',
			description: 'Update the Y axis.',
			subMenu: 'menu22',
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdatePosition',
				params: 'y',
				menu: 'stay',
			},
		},
		button2:{
			id: 'PosZ',
			style: false,
			title: 'Z',
			description: 'Update the Z axis.',
			subMenu: 'menu23',
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdatePosition',
				params: 'z',
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
//console.log(one.buildMenuData)
ColorFamilyButtonGen();
//Build Final Menu
auxl.buildMenu = auxl.MultiMenu(one.buildMenuData);
//auxl.buildMenu.menuLayer.layer;

//Numbers
//



//LEFT TOP
//Orange
auxl.numberStyle0Data = {
data:'numberStyle0Data',
id:'numberStyle0',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#d3be1d", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#d3be1d", emissiveIntensity: 0.4, side: 'double',  },
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
one.numberInputs0Data = {
info:{
	id: 'numberInputs0',
	buttonData: auxl.numberStyle0Data,
	hoverData: auxl.buildHoverData,
	title: 'Update Number',
	description: 'Update the Number.',
	layout:'circleUp',
	//posOffset: new THREE.Vector3(-0.5,0,-0.11),
	//posOffset: new THREE.Vector3(0,0,0),
	//posOffset: new THREE.Vector3(-1.25,0.4,0),
	//posOffset: new THREE.Vector3(-1.25,0.3,0.11),
	posOffset: new THREE.Vector3(-1.75,0.13,-0.11),
	offset: 1,
	parent: 'ghostParent',
	//look: {buffer: 0.65, drag: 0.25, match: 'camera', x:true, y:true, z:true},
	stare: false,
},
menu0:{
	button0:{
		id: '0',
		style: false,
		title: '0',
		description: 'Zero',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '0',
			menu: 'stay',
		},
	},	
	button1:{
		id: '1',
		style: false,
		title: '1',
		description: 'One',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '1',
			menu: 'stay',
		},
	},

	button2:{
		id: '2',
		style: false,
		title: '2',
		description: 'Two',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '2',
			menu: 'stay',
		},
	},

	button3:{
		id: '3',
		style: false,
		title: '3',
		description: 'Three',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '3',
			menu: 'stay',
		},
	},

	button4:{
		id: '4',
		style: false,
		title: '4',
		description: 'Four',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '4',
			menu: 'stay',
		},
	},

	button5:{
		id: '5',
		style: false,
		title: '5',
		description: 'Five',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '5',
			menu: 'stay',
		},
	},

	button6:{
		id: '6',
		style: false,
		title: '6',
		description: 'Six',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '6',
			menu: 'stay',
		},
	},

},

};
auxl.numberInputs0 = auxl.MultiMenu(one.numberInputs0Data);





//RIGHT MID
//PINK
auxl.menuStyle4 = auxl.CoreDataFromTemplate(auxl.numberStyle0Data, {
	id: 'menuStyle4',
	material: {shader: "standard", color: "#d31d9b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#d31d9b", emissiveIntensity: 0.4, side: 'double',  },

}, true);
one.buildSubMenuData = {
info:{
	id: 'buildSubMenu',
	buttonData: auxl.menuStyle4,
	hoverData: auxl.buildHoverData,
	title: 'Update',
	description: 'Update the selection.',
	layout:'circleUp',
	//posOffset: new THREE.Vector3(1,-0.4,0.33),
	//posOffset: new THREE.Vector3(0,0,0),
	//posOffset: new THREE.Vector3(1.2,-0.4,0.11),
	//posOffset: new THREE.Vector3(1.75,-0.1,0.11),
	//posOffset: new THREE.Vector3(1.5,-0.1,0.11),
	//posOffset: new THREE.Vector3(1.25,-0.1,0),
	//posOffset: new THREE.Vector3(-1.2,0.3,0.22),
	posOffset: new THREE.Vector3(1.75,0.13,-0.11),
	offset: -1,
	parent: 'ghostParent',
	//look: {buffer: 0.65, drag: 0.25, match: 'camera', x:true, y:true, z:true},
	stare: false,
},
menu0:{
	button0:{
		id: 'more0',
		style: false,
		title: 'More 0',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},
	button1:{
		id: 'more1',
		style: false,
		title: 'More 1',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},

	button2:{
		id: 'more2',
		style: false,
		title: 'More 2',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},

	button3:{
		id: 'more3',
		style: false,
		title: 'More 3',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},

	button4:{
		id: 'more4',
		style: false,
		title: 'More 4',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},

	button5:{
		id: 'more5',
		style: false,
		title: 'More 5',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},

	button6:{
		id: 'more',
		style: false,
		title: 'More 6',
		description: '...',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'other',
			menu: 'stay',
		},
	},





},

};
auxl.buildSubMenu = auxl.MultiMenu(one.buildSubMenuData);


//LEFT BOTTOM
//RED
auxl.numberStyle1Data = auxl.CoreDataFromTemplate(auxl.numberStyle0Data, {
	id: 'numberStyle1',
	material: {shader: "standard", color: "#d3391d", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#d3391d", emissiveIntensity: 0.4, side: 'double',  },

}, true);
one.numberInputs1Data = {
info:{
	id: 'numberInputs1',
	buttonData: auxl.numberStyle1Data,
	hoverData: auxl.buildHoverData,
	title: 'Update Number',
	description: 'Update the Number.',
	layout:'circleUp',
	//posOffset: new THREE.Vector3(-1,0.4,-0.33),
	posOffset: new THREE.Vector3(-1.75,0.15,-0.22),
	//posOffset: new THREE.Vector3(-1.25,-0.4,-0.22),
	offset: 0.6,
	parent: 'ghostParent',
	//look: {buffer: 0.65, drag: 0.25, match: 'camera', x:true, y:true, z:true},
	stare: false,
},
menu0:{
	button0:{
		id: '7',
		style: false,
		title: '7',
		description: 'Seven',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '0',
			menu: 'stay',
		},
	},	
	button1:{
		id: '8',
		style: false,
		title: '8',
		description: 'Eight',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '1',
			menu: 'stay',
		},
	},

	button2:{
		id: '9',
		style: false,
		title: '9',
		description: 'Nine',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '2',
			menu: 'stay',
		},
	},

	button3:{
		id: '10',
		style: false,
		title: '10',
		description: 'Ten',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '10',
			menu: 'stay',
		},
	},

	button4:{
		id: '25',
		style: false,
		title: '25',
		description: 'Twenty Five',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '25',
			menu: 'stay',
		},
	},

	button5:{
		id: '50',
		style: false,
		title: '50',
		description: 'Fifty',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '50',
			menu: 'stay',
		},
	},

	button6:{
		id: '100',
		style: false,
		title: '100',
		description: 'One Hundred',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '100',
			menu: 'stay',
		},
	},

},

};
auxl.numberInputs1 = auxl.MultiMenu(one.numberInputs1Data);



//Inner
//RIGHT C
//GREEN
auxl.numberStyle2Data = auxl.CoreDataFromTemplate(auxl.numberStyle0Data, {
	id: 'numberStyle2',
	material: {shader: "standard", color: "#24d31d", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#24d31d", emissiveIntensity: 0.4, side: 'double',  },

}, true);
one.buildPosMenuData = {
info:{
	id: 'buildMenuNumber',
	buttonData: auxl.numberStyle2Data,
	hoverData: auxl.buildHoverData,
	title: 'Update Pos',
	description: 'Update the position of selection.',
	layout:'circleUp',
	//posOffset: new THREE.Vector3(-1.25,-0.4,0.33),
	//posOffset: new THREE.Vector3(0,0,0),
	//posOffset: new THREE.Vector3(1.25,-0.4,-0.44),
	//offset: -1,
	//posOffset: new THREE.Vector3(1.75,0.15,-0.22),
	posOffset: new THREE.Vector3(0,0,-0.11),
	offset: -0.6,
	parent: 'ghostParent',
	//look: {buffer: 0.65, drag: 0.25, match: 'camera', x:true, y:true, z:true},
	stare: false,
},
menu0:{
	button0:{
		id: 'PositiveA',
		style: false,
		title: '+Positive',
		description: 'Flip Amount to Positive',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '+',
			menu: 'stay',
		},
	},
	button1:{
		id: 'NegativeA',
		style: false,
		title: '-Negative',
		description: 'Flip Amount to Negative',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: '-',
			menu: 'stay',
		},
	},

	button2:{
		id: 'AddA',
		style: false,
		title: 'Add +A',
		description: 'Add Amount of units to selection.',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'add',
			menu: 'stay',
		},
	},

	button3:{
		id: 'SubtractA',
		style: false,
		title: 'Subtract -A',
		description: 'Subtract Amount of units.',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'subtract',
			menu: 'stay',
		},
	},

	button4:{
		id: 'DivideA',
		style: false,
		title: 'Half A/2',
		description: 'Divide Amount of units by 2.',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'divide',
			menu: 'stay',
		},
	},

	button5:{
		id: 'DoubleA',
		style: false,
		title: 'Double A*2',
		description: 'Double Amount of units.',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'double',
			menu: 'stay',
		},
	},
	button6:{
		id: 'Cancel',
		style: false,
		title: 'Cancel',
		description: 'Cancel & Reset.',
		subMenu: false,
		action: {
			auxlObj: 'one',
			component: false,
			method: 'UpdateNumber',
			params: 'cancel',
			menu: 'close',
		},
	},
},
};
auxl.buildMenuNumber = auxl.MultiMenu(one.buildPosMenuData);







	one.building.geometry = {};
	one.building.geometry.plane = {primitive: 'plane', width: 0.5, height: 0.5};
	one.building.geometry.box = {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5};
	one.building.geometry.circle = {primitive: 'circle', radius: 0.5, segments: 32};
	one.building.geometry.cylinder = {primitive: 'cylinder', radius: 0.25, height: 0.75, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
	one.building.geometry.sphere = {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 360, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 360};


	const SpawnBuild = () => {
		//console.log('Spawning');
		auxl.buildMenu.SpawnMultiMenu();

		//auxl.buildSubMenu.SpawnMultiMenu();
		//auxl.numberInputs0.SpawnMultiMenu();
		//auxl.numberInputs1.SpawnMultiMenu();
		auxl.buildMenuNumber.SpawnMultiMenu();
	}
	const DespawnBuild = () => {
		//console.log('Despawning');
		auxl.buildMenu.DespawnMultiMenu();

		//auxl.buildSubMenu.DespawnMultiMenu();
		//auxl.numberInputs0.DespawnMultiMenu();
		//auxl.numberInputs1.DespawnMultiMenu();
		auxl.buildMenuNumber.DespawnMultiMenu();
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
				text: {value:'Hello World!', color: "#FFFFFF", align: "center", font: "exo2bold", width: 0.45, zOffset: 0.275, side: 'front', wrapCount: 16, baseline: 'center'},
				geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
				material: {shader: "standard", color: "#2aad7b", emissive: '#2aad7b', emissiveIntensity: 0.25, opacity: 1},
				position: new THREE.Vector3(0,1.6,-2),
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

			one.building.current.SpawnCore(auxl.playerRig.GetEl());
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
		one.building.current.RemoveComponent('geometry');
		one.building.current.ChangeSelf({property: 'geometry', value: geometryData});

	}
	const UpdateMaterial = (color) => {
		console.log('UpdateMaterial')
		//Default 
		let defaultData = {shader: "standard", color: "#2aad7b", emissive: '#2aad7b', emissiveIntensity: 0.25, opacity: 1};
		//give color family as options and pick a random one on execute, keep menu open.
		let materialData = (one.building.current.GetEl().material) ?one.building.current.GetEl().material : defaultData;
		//New Color
		let newColor = auxl.ColorTheoryGen(false, color);
		materialData.color = newColor.base;
		if(materialData.emissive){
			materialData.emissive = newColor.base;
		}

		//Update Data
		one.core.data[one.building.current.core.id+'data'].color = newColor.base;
		one.core.data[one.building.current.core.id+'data'].materialData = newColor;
		//Update Preview
		one.building.current.ChangeSelf({property: 'material', value: materialData});
	}

	one.building.text = {};
	one.building.text.toggle = false;
	one.building.text.input = '';
	one.building.text.backups = [];
	one.building.text.history = [];

	//Input
	const KeyInput = (e) => {
		if(!one.building.text.toggle){
			return;
		}
		//console.log(e)
		//console.log(e.key)
		let key = e.key;
		if(key === 'Backspace'){
console.log(one.building.text.backups)
			if(one.building.text.backups.length > 0){
			one.building.text.input = one.building.text.backups[one.building.text.backups.length-1]
			one.building.text.backups.pop();
			one.building.text.next = false;
			if(one.building.text.backups.length <= 0){
				one.building.text.backups.push(' ');
			}
console.log(one.building.text.backups)
			} else {
				one.building.text.input = ' ';
			}

		} else {
		   //Substitutes
			if(key === 'Spacebar'){
				key = ' ';
			} else if(key === 'Shift'){
				one.building.text.shift = !one.building.text.shift;
				return;
			} else if(key === 'Enter'){
				key = '\n';
			} else if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)){
				//Ignore non individual inputs for now.
				return;
			} else if(['Alt', 'Control', 'CapsLock', 'Tab', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(key)){
				//Ignore non individual inputs for now.
				return;
			}

			if(one.building.text.shift){
				key.toUpperCase();
				one.building.text.shift = false;
			}

			one.building.text.input += key;
			one.building.text.backups.push(one.building.text.input);
		}

		one.building.text.history.push(key);
		if(one.building.text.history.length >= one.building.text.history.maxLength){
			one.building.text.history.shift();
		}

		auxl.player.UpdateBeltText(one.building.text.input);
		one.building.current.ChangeSelf({property: 'text', value: {value: one.building.text.input}});
		console.log(one.building.text.input)
	}

	const KeyInputHit = (e) => {
		KeyInput(e);
	}
	//Keyboard Input
	document.addEventListener('keyup', KeyInputHit);
	const UpdateText = () => {
		one.building.text.toggle = !one.building.text.toggle;
		if(one.building.text.toggle){
			auxl.playerBeltTitleText.ChangeSelf({property: 'text', value:{value:'Write'}})
		} else {
			auxl.playerBeltTitleText.ChangeSelf({property: 'text', value:{value:'Read'}})
		}
	}

	//These abilities require additional information, so spawn more multi menu nodes with offsets

	const UpdateNumber = (selection) => {
		console.log('UpdateNumber')
		console.log(selection)



	}

	const UpdatePosition = (axis) => {
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

	return {one, SpawnBuild, DespawnBuild, StartBuilding, UpdateName, UpdateGeometry, UpdateMaterial, UpdateText, UpdateNumber, UpdatePosition, UpdateRotation, UpdateScale, UpdateAnimations, UpdateClickable, UpdateComponents, UpdateDone, Testing,}


}

//
//Export
export {Constraints, One, BuildIn3D};