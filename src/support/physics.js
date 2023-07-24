//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Physics
//
//addPhysics

//
//Physics System

//TESTING
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

//Collision
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
		console.log('Player has collided with body #' + e.detail.body.id);

		//e.detail.target.el;  // Original entity (playerEl).
		//e.detail.body.el;    // Other entity, which playerEl touched.
		//e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
		//e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

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
/*
schema: {
	idname: {type: 'string', default: 'ui'},
	position: {type: 'vec3'},
},
*/
init: function () {

this.checkTriggerThrottled = AFRAME.utils.throttle(this.checkTrigger, 1000, this);
this.playerEl = document.querySelector('#playerRig');

//this.A = new THREE.Vector3(0,0,0);
//this.B = new THREE.Vector3(0,0,0);
//this.C = new THREE.Vector3(0,0,0);
//this.D = new THREE.Vector3(0,0,0);
//this.E = new THREE.Vector3(0,0,0);
//this.F = new THREE.Vector3(0,0,0);
//this.G = new THREE.Vector3(0,0,0);
//this.H = new THREE.Vector3(0,0,0);

//this.playerEl.body.aabb.getCorners(this.A, this.B, this.C, this.D, this.E, this.F, this.G, this.H);
//console.log({a: this.A, b: this.B, c: this.C, d: this.D, e:this.E, f: this.F, g: this.G, h: this.H})

this.el.body.collisionResponse = false;
//console.log(this.el.body);
//console.log(this.playerEl.body);
	this.el.addEventListener('collide', (e) => {
		console.log('This has collided with body #' + e.detail.body.id);
	});
},

checkTrigger: function (time, timeDelta) {
//console.log(this.el.body.aabb.overlaps(this.playerEl.body.aabb))
//console.log(this.el.body.aabb.contains(this.playerEl.body.aabb))
	if(this.el.body.aabb.overlaps(this.playerEl.body.aabb)){
		console.log('overlap')
	}
	if(this.el.body.aabb.contains(this.playerEl.body.aabb)){
		console.log('contains')
	}
},
tick: function (time, timeDelta) {
	this.checkTriggerThrottled();
},
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
	this.auxl.world.addMaterial(material);
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
//Extends Point to Point. Needs testing to understand.
const auxconstraint = AFRAME.registerComponent('auxconstraint', {
dependencies: ['auxl'],
multiple: true,
schema: {
	connectTo: {type: 'string', default: 'auxlObj'},
    type: {default: "lock", oneOf: ["coneTwist", "distance", "hinge", "lock", "pointToPoint"]},
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
//Build & Add Constraint
Connect: function (fresh) {
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
		this.auxl.world.addConstraint(this.constraint);
		this.connected = true;
	}
},
//Prep to disconnect on connectTo despawn
Disconnect: function () {
	this.auxl.world.removeConstraint(this.constraint);
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
    localAnchorA: {type: "vec3"},
    localAnchorB: {type: "vec3"},
	restLength: {type: 'number', default: 1, min: 0},
	stiffness: {type: 'number', default: 100, min: 0},
	damping: {type: 'number', default: 1, min: 0},
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
//Build & Add Constraint
Connect: function (fresh) {
	if(!this.connected && this.link(fresh)){
		this.localAnchors();
    	this.spring = new CANNON.Spring(this.el.body, this.connectBody, {
			restLength: this.data.restLength,
			stiffness: this.data.stiffness,
			damping: this.data.damping,
			localAnchorA: this.localAnchorA,
			localAnchorB: this.localAnchorB,
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
	} else {
		//Update various properties without reconnecting
		this.spring.restLength = this.data.restLength;
		this.spring.stiffness = this.data.stiffness;
		this.spring.damping = this.data.damping;
		this.spring.localAnchorA = this.data.localAnchorA;
		this.spring.localAnchorB = this.data.localAnchorB;
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

//Grav Reverse
const ungravity = AFRAME.registerComponent('ungravity', {
dependencies: ['auxl'],
init: function () {
	//this.auxl = document.querySelector('a-scene').systems.auxl;
},
tick: function (time, timeDelta) {
//this.el.body.applyLocalImpulse(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
//this.el.body.applyImpulse(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
//this.el.body.applyForce(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
this.el.body.applyLocalForce(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
},
});


//
//Export
export {camerasync, collision, trigger, bodymaterial, auxconstraint, auxspring, ungravity};