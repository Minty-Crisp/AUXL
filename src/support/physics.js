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
const addPhysics = AFRAME.registerComponent('add-physics', {
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

			e.detail.target.el;  // Original entity (playerEl).
			e.detail.body.el;    // Other entity, which playerEl touched.
			e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
			e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

			// The top of the sphere, relative to the sphere center
			const topPoint = new CANNON.Vec3(0, 0.25 / 2, 0)
			const impulse = new CANNON.Vec3(-10, 0, 0)
			//e.detail.body.el.body.applyImpulse(impulse, topPoint)

			let resetQuat = new THREE.Quaternion(0,0,0,0);
			let resetPos = new THREE.Vector3(0,6,-6);

			e.detail.body.el.body.position.copy(resetPos);

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

//
//Export
export default addPhysics;