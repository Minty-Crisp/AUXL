//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Physics
//
//


//Link Cable
const linkcable = AFRAME.registerComponent('linkcable', {
dependencies: ['auxl'],
schema: {
    type: {type: 'string', default: "to", oneOf: ["to", "grab", "hit", 'launch', 'fling', 'flying',]},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
//tick: function (time, timeDelta) {},
events: {
	//Raycaster Events
	mouseenter: function (event) {
		console.log({event: 'mouseenter', data: event})
		this.auxl[this.el.id].Enter(event);
	},
	mousedown: function (event) {
		console.log({event: 'mousedown', data: event})
		this.Measure();
		this.auxl[this.el.id].LinkStart(event);
	},
	mouseup: function (event) {
		//console.log('Link')
		//console.log(this.data.type)
		console.log({event: 'mouseup', data: event})
		this.auxl[this.el.id].LinkEnd(event);
		this.Measure(true);

/* Rubber Banding
if(this.data.type === 'launch'){
	if(event?.detail?.intersection?.point){
		this.auxl.player.LinkToHit(event.detail.intersection.point);
	}
}
*/
	},
	mouseleave: function (event) {
		console.log({event: 'mouseleave', data: event})
		this.auxl[this.el.id].Exit(event);
	},
   //Collision Events
	collide: function (event) {
		//console.log({event: 'collision', data: event})
		this.auxl[this.el.id].Collide(event);
	},
   //Other Events
	click: function (event) {
		console.log({event: 'click', data: event})
		this.auxl[this.el.id].Click(event);
	},
	altclick: function (event) {
		console.log({event: 'altclick', data: event})
		this.auxl[this.el.id].AltClick(event);
	},
},

//Tick
tick: function (time, timeDelta) {
	if(this.measure){
		if(this.power > 1){
			this.power --;
console.log(this.power)
		} else {
			this.power = 0;
			this.Measure(true);
		}
	} else {
		this.power = 1;
	}
	this.auxl[this.el.id].Tick(this.power);
},
Measure: function (toggle) {
	this.measure = !toggle;
},
});
//For use with syncing camera rotation to physics rotation
//Camera Sync
const camerasync = AFRAME.registerComponent('camerasync', {
dependencies: ['auxl'],
init: function () {
	//this.auxl = document.querySelector('a-scene').systems.auxl;
},
tick: function (time, timeDelta) {
	//this.el.body.quaternion = this.el.object3D.rotation;
	//this.el.body.quaternion.copy(this.el.object3D.rotation);
this.el.body.quaternion.copy(this.el.object3D.getWorldQuaternion(new THREE.Quaternion()));
//let posSync = new THREE.Vector3(0,0,0);
//posSync.copy(playerRig.object3D.position);
//posSync.y += 1.6;
//this.el.body.position.copy(posSync);
	//this.el.body.quaternion.setFromEuler(this.el.object3D.rotation);
//console.log(this.el.object3D.rotation)
//console.log(this.el.body.quaternion)
},
});
//For use with syncing camera rotation to physics rotation
//Static Sync
const staticsync = AFRAME.registerComponent('staticsync', {
dependencies: ['auxl'],
schema: {
    type: {type: 'string', default: "self", oneOf: ["self", "other", ,]},
    auxlObj: {type: 'string', default: 'auxlObj',},
    offset: {type: 'vec3'},
    posSync: {type: 'vec3'},
    sync: {type: 'bool', default: true},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.offset = this.data.offset || new THREE.Vector3(0,0,0);
	this.posSync = new THREE.Vector3(0,0,0);
//console.log(this)
},
update: function () {
	this.posSync.copy(this.data.posSync);
},

tick: function (time, timeDelta) {
	//this.el.body.quaternion = this.el.object3D.rotation;
	//this.el.body.quaternion.copy(this.el.object3D.rotation);
//this.el.body.quaternion.copy(this.el.object3D.getWorldQuaternion(new THREE.Quaternion()));

if(this.data.sync){

	if(this.el.body && this.el.body.position){
		//Self
		if(this.data.type === 'self'){
			if(this.el.object3D.position){
				this.posSync.copy(this.el.object3D.position);
//console.log({posSync: this.posSync, O3DPos: this.el.object3D.position})
			}
		} else if(this.data.type === 'other'){
			//Other
			this.posSync.copy(this.auxl[this.data.auxlObj].GetEl().object3D.position);
//console.log({posSync: this.posSync, O3DPos: this.el.object3D.position})
		}
		//Offset
		this.posSync.add(this.offset);
		//Physics Body Update
		this.el.body.position.copy(this.posSync);
		this.el.object3D.position.copy(this.posSync);
//console.log({staticsync: this.posSync, body: this.el.body.position, offset: this.offset})

	}
}
//this.el.body.quaternion.setFromEuler(this.el.object3D.rotation);
//console.log(this.el.object3D.rotation)
//console.log(this.el.body.quaternion)
},
});

//TESTING
const collision = AFRAME.registerComponent('collision', {
dependencies: ['auxl'],
/*
schema: {
	idname: {type: 'string', default: 'ui'},
	position: {type: 'vec3'},
},
*/
init: function () {
	//Physics Testing
	//var playerEl = document.querySelector('[camera]');
	playerRig.addEventListener('collide', function (e) {
//console.log('Player has collided with body #' + e.detail.body.id);

//e.detail.target.el;  // Original entity (playerEl).
//e.detail.body.el;    // Other entity, which playerEl touched.
//e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
//e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

//You can get the relative velocity in the contact point to determine the amount of energy in the collision.
/*
var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
if(Math.abs(relativeVelocity) > 10){
	// More energy
} else {
	// Less energy
}
*/

// The top of the sphere, relative to the sphere center
//const topPoint = new CANNON.Vec3(0, 0.25 / 2, 0)
//const impulse = new CANNON.Vec3(-10, 0, 0)
//e.detail.body.el.body.applyImpulse(impulse, topPoint)

//let resetQuat = new THREE.Quaternion(0,0,0,0);
//let resetPos = new THREE.Vector3(0,6,-6);

//e.detail.body.el.body.position.copy(resetPos);

//e.detail.body.el.body.quaternion.copy(resetQuat);
/*
Stop Moving

let body = el.body // el = aframe entity
body.velocity.set(0,0,0);
body.angularVelocity.set(0,0,0);
body.vlambda.set(0,0,0);
body.wlambda.set(0,0,0);
*/


/*
var el = sceneEl.querySelector('#nyan');
el.body.applyImpulse(
new CANNON.Vec3(0, 1, -1),// impulse
new CANNON.Vec3().copy(el.getComputedAttribute('position'))// world position
*/
//const force = new CANNON.Vec3(-100, new THREE.Vector3(0,0,0))
//e.detail.body.el.body.applyForce(force)
/*

const force = new CANNON.Vec3(-100, 0, 0)
body.applyForce(force)

camera.getWorldDirection(cameraDirection);

// Move ball forward (multiply by -1 * speed to move backwards)

let cameraForward: THREE.Vector3 = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).multiplyScalar(this.speed * this.dir.ud);

this.body.applyForce(cameraForward as any, this.body.position);

// Move to the right (multiply by -1 * speed to move to the left)

let cameraSideways: THREE.Vector3 = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x).multiplyScalar(this.speed * -this.dir.lr);

this.body.applyForce(cameraSideways as any, this.body.position);
*/
	});
},

});

//Add info for trigger out
//Triggers
const trigger = AFRAME.registerComponent('trigger', {
dependencies: ['auxl'],
multiple: true,
schema: {
	collide: {type: 'array', default: [false]},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
//AUXL System Connection
this.auxl = document.querySelector('a-scene').systems.auxl;
this.domEnt;
this.checkTriggerThrottled = AFRAME.utils.throttle(this.checkTrigger, 1000, this);
this.playerEl = document.querySelector('#playerRig');

this.el.body.collisionResponse = false;
//console.log(this.el.body);
//console.log(this.playerEl.body);

},
run: function (e) {
console.log(this)
	if(this.data.component === 'null'){
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method]();
			} else if(this.data.params === 'target'){
				this.auxl[this.data.cursorObj][this.data.method](e.target);
			} else {
				this.auxl[this.data.cursorObj][this.data.method](this.data.params);
			}
		}
	} else {
		//object is a dom entity and the component is attached to that object and the func is in that component
		if(document.getElementById(this.data.cursorObj)){
			this.domEnt = document.getElementById(this.data.cursorObj);
			if(this.data.params === 'null'){
				this.domEnt.components[this.data.component][this.data.method]();
			} else if(this.data.params === 'target'){
				this.domEnt.components[this.data.component][this.data.method](e.target);
			} else {
				this.domEnt.components[this.data.component][this.data.method](this.data.params);
			}
		}
	}
},
events: {
	collide: function (e) {
		//console.log('This has collided with body #' + e.detail.body.id);
		this.run(e);
	}
},


checkTrigger: function () {
	if(this.el.body.aabb.overlaps(this.playerEl.body.aabb)){
		//console.log('overlap')
	}
	if(this.el.body.aabb.contains(this.playerEl.body.aabb)){
		//console.log('contains')
	}
},
/*
tick: function (time, timeDelta) {
	this.checkTriggerThrottled();
},
*/
});

//Body Material
const bodymaterial = AFRAME.registerComponent('bodymaterial', {
dependencies: ['auxl'],
schema: {
	friction: {type: 'number', default: 0},
	restitution: {type: 'number', default: 0},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	let material = new CANNON.Material({friction: this.data.friction, restitution: this.data.restitution});
	this.auxl.physWorld.addMaterial(material);
	this.el.body.material = material;
},
});

//Constraints
//
//Lock
//Will remove all degrees of freedom between the bodies.
//Point to Point
//Connects two bodies at given offset points. Like a string/link, so it limits rotation.
//Distance
//Constrains two bodies to be at a constant distance from each others center of mass. Doesn't limit rotation.
//Hinge
//Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
//Cone Twist
//Extends Point to Point and rotates like a joystick with varying tension.
const auxconstraint = AFRAME.registerComponent('auxconstraint', {
dependencies: ['auxl'],
multiple: true,
schema: {
	connectTo: {type: 'string', default: 'auxlObj'},
    type: {type: 'string', default: "lock", oneOf: ["coneTwist", "distance", "hinge", "lock", "pointToPoint"]},
    pivotA: {type: "vec3"},
    axisA: {type: "vec3"},
    pivotB: {type: "vec3"},
    axisB: {type: "vec3"},
    collideConnected: {type: 'boolean', default: true},
	distance: {type: 'number', default: 0, min: 0},
	maxForce: {type: 'number', default: 1e6},
	always: {type: 'boolean', default: true},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.connected = false;
	this.connectBody = false;
	this.listenersEnabled = false;
},
//Link to connectTo
link: function (fresh) {
	if(fresh){
		this.connectBody = false;
	}
	if(!this.connectBody){
		if(this.auxl[this.data.connect]){
			if(this.auxl[this.data.connect].core && this.auxl[this.data.connect].core.inScene){
				this.connectBody = this.auxl[this.data.connect].GetEl().body;
			} else if(this.auxl[this.data.connect].layer && this.auxl[this.data.connect].layer.inScene){
				this.connectBody = this.auxl[this.data.connect].GetElParent().body;
			}
		} else {
			if(document.getElementById(this.data.connectTo)){
				this.connectBody = document.getElementById(this.data.connectTo).body;
			}
		}
	}
	return this.connectBody;
},
//Build Pivots
pivots: function () {
	this.pivotA = new THREE.Vector3(0,0,0);
	this.pivotB = new THREE.Vector3(0,0,0);
	if(this.data.pivotA){
		this.pivotA.copy(this.data.pivotA);
	}
	if(this.data.pivotB){
		this.pivotB.copy(this.data.pivotB);
	}
},
//Build axis
axis: function () {
	this.axisA = new CANNON.Vec3(0,0,0);
	this.axisB = new CANNON.Vec3(0,0,0);
	if(this.data.axisA){
		this.axisA.copy(this.data.axisA);
	}
	if(this.data.axisB){
		this.axisB.copy(this.data.axisB);
	}
},
//Retry
Retry: function (fresh) {
	let bodyTimeout = setTimeout(() => {
		this.Reconnect(fresh);
		clearTimeout(bodyTimeout);
	}, 500);
},
//Build & Add Constraint
Connect: function (fresh) {
	if(this.el.body === undefined){
		this.Retry(fresh);
		return;
	}
	if(!this.connected && this.link(fresh)){
		switch (this.data.type) {
		  case "lock":
			this.constraint = new CANNON.LockConstraint(this.el.body, this.connectBody,{maxForce: this.data.maxForce});
			break;
		  case "distance":
			this.constraint = new CANNON.DistanceConstraint(this.el.body, this.connectBody, this.data.distance, this.data.maxForce);
			break;
		  case "pointToPoint":
			this.pivots();
			this.constraint = new CANNON.PointToPointConstraint(this.el.body, this.pivotA, this.connectBody, this.pivotB, this.data.maxForce);
			break;
		  case "hinge":
			this.pivots();
			this.axis();
			this.constraint = new CANNON.HingeConstraint(this.el.body, this.connectBody, {pivotA: this.pivotA, axisA: this.axisA, pivotB: this.pivotB, axisB: this.axisB, maxForce: this.data.maxForce});
			break;
		  case "coneTwist":
			this.pivots();
			this.axis();
			this.constraint = new CANNON.ConeTwistConstraint(this.el.body, this.connectBody, {pivotA: this.pivotA, pivotB: this.pivotB, axisA: this.axisA, axisB: this.axisB, maxForce: this.data.maxForce});
			break;
		  default:
			throw new Error("[constraint] Unexpected type: " + data.type);
		}
    	this.constraint.collideConnected = this.data.collideConnected;
		this.auxl.physWorld.addConstraint(this.constraint);
		this.connected = true;
	}
},
//Prep to disconnect on connectTo despawn
Disconnect: function () {
	this.auxl.physWorld.removeConstraint(this.constraint);
	this.connected = false;
},
//Reconnect
Reconnect: function (fresh) {
	if(this.connected){
		this.Disconnect();
	}
	this.Connect(fresh);
},
//Add Event Listeners
addListeners: function (connectTo) {
	this.auxl.el.addEventListener(connectTo+'spawned',this.Connect.bind(this));
	this.auxl.el.addEventListener(connectTo+'despawned',this.Disconnect.bind(this));
	this.listenersEnabled = true;
},
//Remove Event Listeners
removeListeners: function (connectTo) {
	this.auxl.el.addEventListener(connectTo+'spawned',this.Connect.bind(this));
	this.auxl.el.addEventListener(connectTo+'despawned',this.Disconnect.bind(this));
	this.listenersEnabled = false;
},
update: function (oldData) {
	let fresh = false;
	if(oldData.connectTo !== this.data.connectTo){
		fresh = true;
	}
	this.Reconnect(fresh);
	//Prep to always stay connected
	if(fresh && this.listenersEnabled){
		this.removeListeners(oldData.connectTo);
	}
	if(this.data.always && !this.listenersEnabled){
		this.addListeners(this.data.connectTo);
	}
},
remove: function () {
	if(this.listenersEnabled){
		this.removeListeners(this.data.connectTo);
	}
},
});

//Spring
const auxspring = AFRAME.registerComponent('auxspring', {
dependencies: ['auxl'],
multiple: true,
schema: {
	connectTo: {type: 'string', default: 'auxlObj'},
	name: {type: 'string', default: 'auxlConstraint'},
    localAnchorA: {type: "vec3"},
    localAnchorB: {type: "vec3"},
	restLength: {type: 'number', default: 1, min: 0},
	stiffness: {type: 'number', default: 100, min: 0},
	damping: {type: 'number', default: 1, min: 0},
    collideConnected: {type: 'boolean', default: true},
	always: {type: 'boolean', default: true},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.connected = false;
	this.connectBody = false;
	this.listenersEnabled = false;
    this.active = false;
},
//Link to connectTo
link: function (fresh) {
	if(fresh){
		this.connectBody = false;
	}
	if(!this.connectBody){
		if(this.auxl[this.data.connect]){
			if(this.auxl[this.data.connect].core && this.auxl[this.data.connect].core.inScene){
				this.connectBody = this.auxl[this.data.connect].GetEl().body;
			} else if(this.auxl[this.data.connect].layer && this.auxl[this.data.connect].layer.inScene){
				this.connectBody = this.auxl[this.data.connect].GetElParent().body;
			}
		} else {
			if(document.getElementById(this.data.connectTo)){
				this.connectBody = document.getElementById(this.data.connectTo).body;
			}
		}
	}
	return this.connectBody;
},
//Build Local Anchors
localAnchors: function () {
	this.localAnchorA = new THREE.Vector3(0,0,0);
	this.localAnchorB = new THREE.Vector3(0,0,0);
	if(this.data.localAnchorA){
		this.localAnchorA.copy(this.data.localAnchorA);
	}
	if(this.data.localAnchorB){
		this.localAnchorB.copy(this.data.localAnchorB);
	}
},
//Retry
Retry: function (fresh) {
	let bodyTimeout = setTimeout(() => {
		this.Reconnect(fresh);
		clearTimeout(bodyTimeout);
	}, 500);
},
//Build & Add Constraint
Connect: function (fresh) {
	if(this.el.body === undefined){
		this.Retry(fresh);
		return;
	}
	if(!this.connected && this.link(fresh)){
		this.localAnchors();
    	this.spring = new CANNON.Spring(this.el.body, this.connectBody, {
			restLength: this.data.restLength,
			stiffness: this.data.stiffness,
			damping: this.data.damping,
			localAnchorA: this.localAnchorA,
			localAnchorB: this.localAnchorB,
			collideConnected: this.collideConnected,
		});
		this.connected = true;
	}
},
//Prep to disconnect on connectTo despawn
Disconnect: function () {
	delete this.spring;
	this.spring = null;
	this.connected = false;
},
//Reconnect
Reconnect: function (fresh) {
	if(this.connected){
		this.Disconnect();
	}
	this.Connect(fresh);
},
//Add Event Listeners
addListeners: function (connectTo) {
	this.auxl.el.addEventListener(connectTo+'spawned',this.Connect.bind(this));
	this.auxl.el.addEventListener(connectTo+'despawned',this.Disconnect.bind(this));
	this.listenersEnabled = true;
},
//Remove Event Listeners
removeListeners: function (connectTo) {
	this.auxl.el.addEventListener(connectTo+'spawned',this.Connect.bind(this));
	this.auxl.el.addEventListener(connectTo+'despawned',this.Disconnect.bind(this));
	this.listenersEnabled = false;
},
update: function (oldData) {
	let fresh = false;
	if(oldData.connectTo !== this.data.connectTo){
		fresh = true;
	}
	if(fresh){
		this.Reconnect(fresh);
		//Prep to always stay connected
		if(fresh && this.listenersEnabled){
			this.removeListeners(oldData.connectTo);
		}
		if(this.data.always && !this.listenersEnabled){
			this.addListeners(this.data.connectTo);
		}
	}
},
remove: function () {
	if(this.listenersEnabled){
		this.removeListeners(this.data.connectTo);
	}
},
tick: function (time, timeDelta) {
	return this.connected && this.active ? this.spring.applyForce() : void 0;
},
play: function () {
	this.active = true;
},
pause: function () {
	this.active = false;
},
});

//Player and World Gravity
//Gravity Control
const gravitycontrol = AFRAME.registerComponent('gravitycontrol', {
dependencies: ['auxl'],
schema: {
    type: {type: 'string', default: "float", oneOf: ['float', 'earth', 'moon', 'jupiter', 'io', 'mars', 'Uranus', 'Neptune', 'Sun', 'Pluto', 'Saturn', 'Custom']},
    axis: {type: "vec3", default: new THREE.Vector3(0,0,0)},
    velocityExpo: {type: "number", default: 1000},
    chuteOpen: {type: "boolean", default: false},
    gravityObject: {type: "string", default: 'none'},
	customGravity: {type: 'number', default: 9.80665, min: 0.000001},
},
init: function () {
this.auxl = document.querySelector('a-scene').systems.auxl;
//Build Gravity, Offset, Counter
this.worldGravity = new THREE.Vector3();
this.worldGravityOffset = new THREE.Vector3();
this.velocityTick = 0;
this.playerPosition = new THREE.Vector3();
this.playerPositionOld = new THREE.Vector3();

//Type
this.type = this.data.type;
this.gravityAmount = 0;
//Axis
this.axis = new THREE.Vector3(0,0,0);
this.axis.x = this.data.axis.x;
this.axis.y = this.data.axis.y;
this.axis.z = this.data.axis.z;
//Rotation
this.rotation = new THREE.Quaternion(0,0,0,1);
//Center of Gravity
this.centerOfGravity = new THREE.Vector3(0,0.314,0);
this.gravityDirAdjust = new THREE.Vector3(0,0,0);
this.gravityQuat = new THREE.Quaternion(0,0,0,1);
this.gravityObject = false;
//Gravity Axis
this.allGravityDirection = [
	new THREE.Vector3(0,0,0),
	new THREE.Vector3(0,-1,0),
	new THREE.Vector3(0,1,0),
	new THREE.Vector3(-1,0,0),
	new THREE.Vector3(1,0,0),
	new THREE.Vector3(0,0,-1),
	new THREE.Vector3(0,0,1),
];
//Gravity Axis Rotation - have gyro component utilize
//Gryo this.el.body.torque = new THREE.Vector3(0,0,0);
this.allGravityRotation = [
	new THREE.Quaternion(0,0,0,1),//float
	new THREE.Quaternion(0,0,0,1),//-y
	new THREE.Quaternion(0.7071067811865475,0,0.7071067811865476,0),//+y
	new THREE.Quaternion(0.5,0.5,0.5,-0.5),//-x
	new THREE.Quaternion(0.5,-0.5,-0.5,-0.5),//+x
	new THREE.Quaternion(0.5,0.5,0.5,0.5),//-z
	new THREE.Quaternion(-0.5,-0.5,0.5,0.5),//+z
];
//Gravity Types
this.allGravityTypes = {
	float: 0,
	earth: 9.80665,
	moon: 1.6268,
	jupiter: 24.7912112,
	io: 1.79461695,
	mars: 3.71672035,
	uranus: 8.6886919,
	neptune: 11.15016105,
	sun: 274.782333,
	pluto: 0.61781895,
	saturn: 10.44408225,
	mercury: 3.726527,
	venus: 8.8652116,
	custom: this.data.customGravity,
};
//Velocity
this.velocityNew = new THREE.Vector3(0,0,0);
this.velocityAdjust = 0;
//Mass
this.massAdjust = 0;
//Support
//Local
this.axisCycleCount = 0;
this.axisDir = 0;
this.typeCycleCount = 0;
//World
this.worldAxis = new THREE.Vector3(0,0,0);
this.worldType = 'float';
this.worldAxisCycleCount = 0;
this.worldTypeCycleCount = 0;
//Local/World Axis Change
this.localAxisChange = false;
this.worldAxisChange = false;
//Cycle Sync
this.worldAxisSet = 0;
this.axisSet = 0;
},
//Update
update: function (oldData) {
	//Chute Open, Null Velocity
	this.chuteOpen = this.data.chuteOpen;
	//Center of Gravity
	if(this.data.gravityObject && this.data.gravityObject !== 'none'){
		this.gravityObject = this.data.gravityObject;
		if(document.getElementById( this.gravityObject)){
			this.centerOfGravity.copy(document.getElementById( this.gravityObject).getAttribute('position'));
		}
	} else {
		this.gravityObject = false;
		this.clearForces();
	}
},
//Cycle through all axis locally
setAxis: function (axis) {
if(!this.localAxisChange){
	this.localAxisChange = true;
	this.axisSet = axis;
	this.axisCycleCount = axis;
	this.axis.copy(this.allGravityDirection[axis]);
	this.axisTimeout1 = setTimeout(() => {
		this.el.body.sleep();
		this.newPosition = new THREE.Vector3();
		this.newPosition.copy(this.axis).add(this.el.body.position);
		this.el.object3D.position.copy(this.newPosition)
		this.el.body.position.copy(this.newPosition)
		this.axisDir = axis;
		this.el.body.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.el.object3D.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.axisTimeout2 = setTimeout(() => {
			this.el.body.wakeUp();
			this.localAxisChange = false;
			clearTimeout(this.axisTimeout1);
			clearTimeout(this.axisTimeout2);
		}, 275);
	}, 225);
	this.auxl.player.PlayerQuickAnim();
	this.auxl.player.Notification({message:'Local Axis Update', time: 2750});
}
},
//Cycle through all axis locally
cycleAxis: function () {
if(!this.localAxisChange){
	this.localAxisChange = true;
	this.axisCycleCount++;
	if(this.axisCycleCount >= this.allGravityDirection.length){
		this.axisCycleCount = 0;
	}
	this.axis.copy(this.allGravityDirection[this.axisCycleCount]);
	this.axisTimeout1 = setTimeout(() => {
		this.el.body.sleep();
		this.newPosition = new THREE.Vector3();
		this.newPosition.copy(this.axis).add(this.el.body.position);
		this.el.object3D.position.copy(this.newPosition)
		this.el.body.position.copy(this.newPosition)
		this.axisDir = this.axisCycleCount;
		this.el.body.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.el.object3D.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.axisTimeout2 = setTimeout(() => {
			this.el.body.wakeUp();
			this.localAxisChange = false;
			clearTimeout(this.axisTimeout1);
			clearTimeout(this.axisTimeout2);
		}, 275);
	}, 225);
		//}, 375);
	//}, 425);
	this.auxl.player.PlayerQuickAnim();
	this.auxl.player.Notification({message:'Local Axis Update', time: 2750});
}

},
//Randomly choose any axis locally
randomAxis: function () {
	this.axisCycleCount = Math.floor(Math.random()*this.allGravityDirection.length)
	this.axis.copy(this.allGravityDirection[this.axisCycleCount]);
	this.axisTimeout1 = setTimeout(() => {
		this.el.body.sleep();
		this.newPosition = new THREE.Vector3();
		this.newPosition.copy(this.axis).add(this.el.body.position);
		this.el.object3D.position.copy(this.newPosition)
		this.el.body.position.copy(this.newPosition)
		this.axisDir = this.axisCycleCount;
		this.el.body.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.el.object3D.quaternion.copy( this.allGravityRotation[this.axisDir])
		this.axisTimeout2 = setTimeout(() => {
			this.el.body.wakeUp();
			this.localAxisChange = false;
			clearTimeout(this.axisTimeout1);
			clearTimeout(this.axisTimeout2);
		}, 275);
	}, 225);
		//}, 375);
	//}, 425);
	this.auxl.player.PlayerQuickAnim();
	this.auxl.player.Notification({message:'Local Axis Update', time: 2750});
//console.log({Local: this.axis})
},
//Any Axis Gravity Direction
gravityObjectAxis: function () {
	//Get the planet/masses center position & player position
	//Calc the difference between the two and normalize
	if(this.gravityObject.y === 0.314){
		if(document.getElementById( this.gravityObject)){
			this.centerOfGravity.copy(document.getElementById( this.gravityObject).getAttribute('position'));
		}
	}
	this.gravityDirAdjust.copy(this.centerOfGravity)
	this.gravityDirAdjust.sub(this.playerPosition)
	this.gravityDirAdjust.normalize();
	//Rotate Self
	this.gravityQuat = new THREE.Quaternion();
	this.gravityQuat.setFromUnitVectors(new THREE.Vector3(0,-1,0), this.gravityDirAdjust);
	//Update Gravity Axis
	this.axis.copy(this.gravityDirAdjust)
	//Update Self Axis Rotation to Match
	this.el.body.quaternion.copy(this.gravityQuat);
	this.el.object3D.quaternion.copy(this.gravityQuat);
},
//Set World Axis
setWorldAxis: function (axis) {
	//Update World Gravity
	this.worldAxisSet = axis;
	this.worldAxisCycleCount = axis;
	this.worldAxis.copy(this.allGravityDirection[axis]);
	this.worldAxis.multiplyScalar(this.allGravityTypes[this.worldType])
	this.el.body.world.gravity.copy(this.worldAxis)
	this.auxl.player.Notification({message:'World Axis Update', time: 2750});
//console.log({World: this.worldAxis})
},
//Cycle through all axis globaly
cycleWorldAxis: function () {
	this.worldAxisCycleCount++;
	if(this.worldAxisCycleCount >= this.allGravityDirection.length){
		this.worldAxisCycleCount = 0;
	}
	//Update World Gravity
	this.worldAxisSet = this.worldAxisCycleCount;
	this.worldAxis.copy(this.allGravityDirection[this.worldAxisCycleCount]);
	this.worldAxis.multiplyScalar(this.allGravityTypes[this.worldType])
	this.el.body.world.gravity.copy(this.worldAxis)
	this.auxl.player.Notification({message:'World Axis Update', time: 2750});
//console.log({World: this.worldAxis})
},
//Set Local
setTypes: function (type) {
	this.typeCycleCount = type;
	this.type = Object.keys(this.allGravityTypes)[type]
	this.auxl.player.Notification({message:'Local Gravity : ' + this.type, time: 2000});
//console.log(this.type)
},
//Cycle through all types locally
cycleTypes: function () {
	this.typeCycleCount++;
	if(this.typeCycleCount >= Object.keys(this.allGravityTypes).length){
		this.typeCycleCount = 0;
	}
	this.type = Object.keys(this.allGravityTypes)[this.typeCycleCount]
	this.auxl.player.Notification({message:'Local Gravity : ' + this.type, time: 2000});
//console.log(this.type)
},
//Randomly choose any type
randomTypes: function () {
	this.typeCycleCount = Math.floor(Math.random()*Object.keys(this.allGravityTypes).length)
	this.type = Object.keys(this.allGravityTypes)[this.typeCycleCount]
	this.auxl.player.Notification({message:'Local Gravity : ' + this.type, time: 2000});
console.log(this.type)
},
//Cycle through all types globaly
setWorldTypes: function (type) {
	this.worldTypeCycleCount = type;
	this.worldType = Object.keys(this.allGravityTypes)[type];
	//Update World Gravity
	this.worldAxis.copy(this.allGravityDirection[this.worldAxisSet]);
	this.worldAxis.multiplyScalar(this.allGravityTypes[this.worldType])
	this.el.body.world.gravity.copy(this.worldAxis)
	this.auxl.player.Notification({message:'World Gravity : ' + this.worldType, time: 2000});
//console.log(this.worldType)
},
//Cycle through all types globaly
cycleWorldTypes: function () {
	this.worldTypeCycleCount++;
	if(this.worldTypeCycleCount >= Object.keys(this.allGravityTypes).length){
		this.worldTypeCycleCount = 0;
	}
	this.worldType = Object.keys(this.allGravityTypes)[this.worldTypeCycleCount]
	//Update World Gravity
	this.worldAxis.copy(this.allGravityDirection[this.worldAxisSet]);
	this.worldAxis.multiplyScalar(this.allGravityTypes[this.worldType])
	this.el.body.world.gravity.copy(this.worldAxis)
	this.auxl.player.Notification({message:'World Gravity : ' + this.worldType, time: 2000});
//console.log(this.worldType)
},
//Clears all current system forces
clearForces: function () {
	if(this.el.body !== null && this.el.body.world !== null){
		this.el.body.world.clearForces();
	}
},
//Velocity
gravityVelocity: function() {
//Confirm rig & body exists
if(this.auxl.playerRig.GetEl() && this.auxl.playerRig.GetEl().body){
	//Update current
	this.playerPosition.copy(this.auxl.playerRig.GetEl().body.position)
	//Check for Velocity
	let addVelocity = false;


//
/*
// Assuming gravityDirAdjust is the normalized gravity direction vector
// playerPosition and prevPlayerPosition are THREE.Vector3 objects

const currentPositionAlongGravity = playerPosition.dot(gravityDirAdjust);
const previousPositionAlongGravity = prevPlayerPosition.dot(gravityDirAdjust);

if (currentPositionAlongGravity > previousPositionAlongGravity) {
    // Player is ascending
    console.log("Player is ascending");
} else if (currentPositionAlongGravity < previousPositionAlongGravity) {
    // Player is descending
    console.log("Player is descending");
} else {
    // Player is plateauing (no change in position along gravity)
    console.log("Player is plateauing");
}

*/
	if(this.gravityObject){
		const currentPositionAlongGravity = this.playerPosition.dot(this.gravityDirAdjust);
		const previousPositionAlongGravity = this.playerPositionOld.dot(this.gravityDirAdjust);

		if (currentPositionAlongGravity > previousPositionAlongGravity) {
			// Player is descending
			//console.log("Player is descending");
			addVelocity = true;
		} else if (currentPositionAlongGravity < previousPositionAlongGravity) {
			// Player is ascending
			//console.log("Player is ascending");
		} else {
			// Player is plateauing (no change in position along gravity)
			//console.log("Player is plateauing");
		}
	} else {
		if(this.axis.x !== 0){
			if(this.axis.x < 0){
				if(this.playerPosition.x < this.playerPositionOld.x){addVelocity = true;}
			} else {
				if(this.playerPosition.x > this.playerPositionOld.x){addVelocity = true;}
			}
		} else if(this.axis.y !== 0){
			if(this.axis.y < 0){
				if(this.playerPosition.y < this.playerPositionOld.y){addVelocity = true;}
			} else {
				if(this.playerPosition.y > this.playerPositionOld.y){addVelocity = true;}
			}
		} else if(this.axis.z !== 0){
			if(this.axis.z < 0){
				if(this.playerPosition.z < this.playerPositionOld.z){addVelocity = true;}
			} else {
				if(this.playerPosition.z > this.playerPositionOld.z){addVelocity = true;}
			}
		}
	}

	//Update Old
	this.playerPositionOld.copy(this.playerPosition);
	//Update body mass based on gravity grams from earth base
	this.massAdjust = this.el.body.mass;
	//1 direction of axis as down
	if(this.type === 'float'){
		//No Gravity Added
		this.gravityAmount = 0;
	} else if(this.type === 'earth'){
		//Earth 1g @ 9.8 m/s
		this.gravityAmount = 9.80665;
	} else if(this.type === 'moon'){
		//Moon 0.1657g converts to 1.6268 m/s
		this.gravityAmount = 1.6268;
		this.massAdjust *= 0.1657;
	} else if(this.type === 'jupiter'){
		//Jupiter 2.528g converts to 24.7912112 m/s
		this.gravityAmount = 24.7912112;
		this.massAdjust *= 2.528;
	} else if(this.data.type === 'io'){
		//IO 0.183g converts to 1.79461695 m/s
		this.gravityAmount = 1.79461695;
		this.massAdjust *= 0.183;
	} else if(this.type === 'mars'){
		//Mars 0.379g converts to 3.71672035 m/s
		this.gravityAmount = 3.71672035;
		this.massAdjust *= 0.379;
	} else if(this.type === 'uranus'){
		//Uranus 0.886g converts to 8.6886919 m/s
		this.gravityAmount = 8.6886919;
		this.massAdjust *= 0.886;
	} else if(this.type === 'neptune'){
		//Neptune 1.137g converts to 11.15016105 m/s
		this.gravityAmount = 11.15016105;
		this.massAdjust *= 1.137;
	} else if(this.type === 'sun'){
		//Sun 28.02g converts to 274.782333 m/s
		this.gravityAmount = 274.782333;
		this.massAdjust *= 28.02;
	} else if(this.type === 'pluto'){
		//Pluto 0.063g converts to 0.61781895 m/s
		this.gravityAmount = 0.61781895;
		this.massAdjust *= 0.063;
	} else if(this.type === 'saturn'){
		//Saturn 1.065g converts to 10.44408225 m/s
		this.gravityAmount = 10.44408225;
		this.massAdjust *= 1.065;
	} else if(this.type === 'mercury'){
		//Mercury 0.38g converts to 3.726527 m/s
		this.gravityAmount = 3.726527;
	} else if(this.type === 'venus'){
		//Venus 0.904g converts to 8.8652116 m/s
		this.gravityAmount = 8.8652116;
	} else if(this.type === 'custom'){
		//Custom
		this.gravityAmount = this.data.customGravity;
	}

	//Update Body Mass
	//this.el.body.mass = this.massAdjust;
	//this.el.body.updateMassProperties();
	//Void velocity on float selected gravity
	//Parachute Prevents velocity buildup
	if(this.axis.equals(new THREE.Vector3(0,0,0)) || this.type === 'float' || this.data.chuteOpen){
		addVelocity = false;
//console.log({chute: this.data.chuteOpen, axis: this.axis, type: this.type})
	}

//Use new gravCenter axis on velocity

	//Velocity
	//add velocity to fall
	if(addVelocity){
		this.velocityTick++;
//console.log('Adding Velocity')
		this.velocityAdjust = this.data.velocityExpo;
		this.velocityAdjust /= this.massAdjust;
		//Measure specific axis and greater and less then checks
		this.velocityNew = new THREE.Vector3((this.velocityTick/this.velocityAdjust),(this.velocityTick/this.velocityAdjust),(this.velocityTick/this.velocityAdjust));
		this.velocityNew.multiply(this.axis);
		this.el.body.velocity.x += this.velocityNew.x;
		this.el.body.velocity.y += this.velocityNew.y;
		this.el.body.velocity.z += this.velocityNew.z;
	} else {
		//console.log('velocity off');
		this.auxl.player.layer.velocity = new THREE.Vector3(0,0,0);
		this.velocityTick = 0;
	}
	//Planet Gravity
	this.planetGravity = new THREE.Vector3(0,0,0);
	this.planetGravity = new THREE.Vector3(this.gravityAmount,this.gravityAmount,this.gravityAmount);
	this.planetGravity.multiply(this.axis);
//console.log(this.planetGravity)
	//Add Gravity
	//this.el.body.applyForce(this.planetGravity, this.el.body.position);
	this.el.body.applyForce(this.planetGravity, new THREE.Vector3(0,0,0));
//console.log(this.planetGravity)
}
},
//World Gravity Offset for Local
offsetWorldGravity: function() {
	//Reset Offset
	this.worldGravityOffset = new THREE.Vector3();
	//Pull in current world gravity
	this.worldGravity.copy(this.auxl.physWorld.gravity)
	this.worldGravityOffset.copy(this.worldGravity)
	//if gravity on, calc the reverse force * the objects mass to offset
	if(!this.worldGravityOffset.equals(new THREE.Vector3())){
		this.worldGravityOffset.multiplyScalar(this.el.body.mass*-1);
		this.el.body.applyForce(this.worldGravityOffset, this.el.body.position);
	}
},
//Tick
tick: function (time, timeDelta) {
	if(this.gravityObject){
		this.gravityObjectAxis();
	}
	this.offsetWorldGravity();
	this.gravityVelocity();
},
});

//
//Export
export {linkcable, camerasync, staticsync, collision, trigger, bodymaterial, auxconstraint, auxspring, gravitycontrol};