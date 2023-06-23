//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Support


//
//Altering GLTF Materials
//Instead of a set of arrays for each setting, could do a single array for objects that have setting keys
AFRAME.registerComponent('gltfmat', {
dependencies: ['auxl'],
schema: {
	colors: {type: 'array', default: ['#FFFFFF']},
	emissive: {type: 'array', default: [0]},
	textures: {type: 'array', default: [false]},
	repeats: {type: 'array', default: [false]},
	random: {type: 'boolean', default: false},
},
	init: function () {
		//AUXL System
		const auxl = document.querySelector('a-scene').systems.auxl;
		//Mesh Name
		this.meshName = false;
		this.current = 0;
		this.materials = [];
		this.data.colors.forEach(color => {
			//Color
			if(color || color !== 'false'){
				this.materials[this.current] = new THREE.MeshStandardMaterial({color});
				//Emissive
				if(!this.data.emissive[this.current] || this.data.emissive[this.current] === '0'){} else {
					this.materials[this.current].emissive = this.materials[this.current].color;
					this.materials[this.current].emissiveIntensity = this.data.emissive[this.current];
				}
				//Texture
				if(!this.data.textures[this.current] || this.data.textures[this.current] === 'false'){} else {
					this.materials[this.current].texture = new THREE.TextureLoader().load(this.data.textures[this.current]);
					if(!this.data.repeats[this.current] || this.data.repeats[this.current] === 'false'){} else {
						this.materials[this.current].texture.wrapS = THREE.RepeatWrapping;
						this.materials[this.current].texture.wrapT = THREE.RepeatWrapping;
						this.materials[this.current].texture.repeat.set(this.data.repeats[this.current]);
					}
				}
			} else if(color === 'random'){
				this.materials[this.current] = new THREE.MeshStandardMaterial({color: auxl.colorTheoryGen().base});
			} else {
				this.materials[this.current] = false;
			}
			this.current++;
		})
		//console.log(this.materials)
		this.current = -2;
		// Wait for model to load. GLTF/OBJ Event
		this.el.addEventListener('model-loaded', () => {
			// Grab the mesh / scene.
			const obj = this.el.getObject3D('mesh');
			obj.traverse(node => {
				//console.log(node.name)
				if(this.current < 0){} else {
					if(this.data.random){
						node.material = new THREE.MeshStandardMaterial({color: auxl.colorTheoryGen().base});
					} else {
						if(this.materials[this.current]){
							node.material = this.materials[this.current];
						}
					}
				}
				this.current++;
			});
		});
	}
});

//
//Click to Add to Inventory
AFRAME.registerComponent('clickaddinventory', {
dependencies: ['auxl'],
multiple: true,
schema: {
	item: {type: 'string', default: 'itemName'},
	once: {type: 'boolean', default: true},
	delay: {type: 'number', default: 0},
	despawn: {type: 'boolean', default: true},
	auxlObj: {type: 'string', default: 'auxlObj'},
	despawnMethod: {type: 'string', default: 'DespawnCore'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	this.item = this.data.item;
	this.once = this.data.once;
	this.delay = this.data.delay;
	this.give = true;
	this.despawn = this.data.despawn;
	this.auxlObj = this.data.auxlObj;
	this.despawnMethod = this.data.despawnMethod;
},
events: {
	click: function () {
		if(this.give){
			this.timeout = setTimeout(() => {
				this.auxl.comp.AddToInventory({item:this.auxl[this.item]});
				if(this.once){
					this.give = false;
				}
				if(this.despawn){
					this.auxl[this.auxlObj][this.despawnMethod]();
				}
				clearTimeout(this.timeout);
			}, this.delay);
		}
	}
},
});

//
//Use on Object
AFRAME.registerComponent('acceptobject', {
dependencies: ['auxl'],
multiple: true,
schema: {
	item: {type: 'string', default: 'itemName'},
	uses: {type: 'number', default: 1},
	delay: {type: 'number', default: 0},
	despawn: {type: 'boolean', default: true},
	auxlObj: {type: 'string', default: 'auxlObj'},
	despawnMethod: {type: 'string', default: 'DespawnCore'},
	methodObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	this.item = this.data.item;
	this.uses = this.data.uses;
	this.delay = this.data.delay;
	this.inUse = false;
	this.despawn = this.data.despawn;
	this.auxlObj = this.data.auxlObj;
	this.despawnMethod = this.data.despawnMethod;
	this.methodObj = this.data.methodObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
},
run: function(){
	this.timeout = setTimeout(() => {
		if(this.component === 'null'){
			if(this.auxl[this.methodObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.methodObj][this.method]();
				} else {
					this.auxl[this.methodObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.methodObj)){
				this.domEnt = document.getElementById(this.methodObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
		if(this.auxl[this.item].persist === 'limited'){
			this.auxl[this.item].amount--;
			this.auxl.comp.UpdateInventoryMenu();
			this.auxl.player.Unequip();
		}
		this.uses--;
		if(this.uses <= 0 && this.despawn){
			this.auxl[this.auxlObj][this.despawnMethod]();
		}
		this.inUse = false;
		clearTimeout(this.timeout);
	}, this.delay);
},
events: {
	click: function () {
		if(this.auxl.player.layer.equipped){
			if(this.auxl.player.layer.equippedObject === this.item){
				if(this.inUse){}else{
					this.inUse = true;
					this.run();
				}
			}
		}
	}
},
});

//Testing
//Gradient & Toon Shader
AFRAME.registerComponent('modify-materials', {
dependencies: ['auxl'],
	init: function () {
		const auxl = document.querySelector('a-scene').systems.auxl;
		// Wait for model to load. GLTF/OBJ Event
		this.el.addEventListener('model-loaded', () => {
			// Grab the mesh / scene.
			const obj = this.el.getObject3D('mesh');
			// Go over the submeshes and modify materials we want.
			//const materialTest = {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
			//mesh.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
			const materialTest = new THREE.MeshBasicMaterial( { color: 0xffffff } );

const threeTone = new THREE.TextureLoader().load('./assets/img/gradient/threeTone.jpg')
threeTone.minFilter = THREE.NearestFilter
threeTone.magFilter = THREE.NearestFilter

const fourTone = new THREE.TextureLoader().load('./assets/img/gradient/fourTone.jpg')
fourTone.minFilter = THREE.NearestFilter
fourTone.magFilter = THREE.NearestFilter

const fiveTone = new THREE.TextureLoader().load('./assets/img/gradient/fiveTone.jpg')
fiveTone.minFilter = THREE.NearestFilter
fiveTone.magFilter = THREE.NearestFilter

			//const diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
			const gradientMap = new THREE.DataTexture( 2, 1, 2, 3 );
			gradientMap.needsUpdate = true;

			const materialToon = new THREE.MeshToonMaterial( {
				color: 'blue',
				gradientMap: fiveTone
			} );

			obj.traverse(node => {
				if(node.name.indexOf('Mesh_crop_melon') !== -1) {
					node.material = materialToon;
				}


//testing
//<empty string>
//crop_melon
//Mesh_crop_melon
//Mesh_crop_melon_1
//Mesh_crop_melon_2
/*
				console.log(node.name)
				if(node.name.indexOf('Mesh_crop_melon') !== -1) {
					node.material.color.set('red');
				}
				if(node.name.indexOf('Mesh_crop_melon_1') !== -1) {
					node.material.color.set('blue');
				}
				if(node.name.indexOf('Mesh_crop_melon_2') !== -1) {
					node.material.color.set('yellow');
				}
*/
			});
		});
	}
});

//
//Physics System
AFRAME.registerComponent('add-physics', {
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
//Attach
AFRAME.registerComponent('attach', {
	dependencies: ['auxl'],
    schema: {
        idname: {type: 'string', default: 'ui'},
        position: {type: 'vec3'},
    },
    init: function () {
        //Thing To Attach
        this.attachee = document.getElementById(this.data.idname);
        this.offset = new THREE.Vector3();
		if(this.data.position){
			this.offset.copy(this.data.position);
		} else {
        	this.offset.copy(this.attachee.object3D.position);
		}
        this.newPosVec3 = new THREE.Vector3();
    },
    attached: function () {
        //Clone current the entity this component is attached to's position
        this.newPosVec3.copy(this.el.object3D.position);
        //Offsets
        this.newPosVec3.x += this.offset.x;
        this.newPosVec3.y += this.offset.y;
        this.newPosVec3.z += this.offset.z;
        //Set position for UI at 3js level for speed!
        this.attachee.object3D.position.copy(this.newPosVec3);
    },
    tick: function (time, timeDelta) {
        this.attached();
    },
});

//
//Look At XYZ
AFRAME.registerComponent('look-at-xyz', {
	dependencies: ['auxl'],
	schema: {
		match: {type: 'string', default:'camera'},
		x: {type: 'boolean', default: false},
		y: {type: 'boolean', default: false},
		z: {type: 'boolean', default: false},
	},
    init: function () {
    },
    update: function () {
		this.rotation = this.el.object3D.rotation;
		this.matchView = document.getElementById(this.data.match);
		this.matchRotation = new THREE.Euler();
		this.lookAtXYZThrottled = AFRAME.utils.throttle(this.lookAtXYZ, 30, this);
    },
    lookAtXYZ: function () {
		this.matchRotation.copy(this.matchView.object3D.rotation);
		//Sync X,Y and/or Z
		if(this.data.x){
			this.rotation.x = this.matchRotation.x;
		}
		if(this.data.y){
			this.rotation.y = this.matchRotation.y;
		}
		if(this.data.z){
			this.rotation.z = this.matchRotation.z;
		}
		this.el.object3D.rotation.copy(this.rotation);
    },
    tick: function (time, timeDelta) {
        this.lookAtXYZThrottled();
    },
});

//
//Stare
AFRAME.registerComponent('stare', {
	dependencies: ['auxl'],
	schema: {
		id: {type: 'string', default:'playerRig'},
		twist: {type: 'boolean', default: false},
	},
    init: function () {
    },
    update: function () {
		this.idView = document.getElementById(this.data.id);
		this.idPosition = new THREE.Vector3();
		this.stareThrottled = AFRAME.utils.throttle(this.stare, 30, this);
    },
    stare: function () {
		//Get Position of Stare Object
		this.idPosition.copy(this.idView.object3D.position);
		//If player, add current camera height
		if(this.data.id === 'playerRig'){
			this.idPosition.y += document.getElementById('camera').object3D.position.y;
		}
		//Twist will not look up or down
		if(this.data.twist){
			this.idPosition.y = this.el.object3D.position.y;
		}
		this.el.object3D.lookAt(this.idPosition);
    },
    tick: function (time, timeDelta) {
        this.stareThrottled();
    },
});

//
//Event Listener Components to run Auxl.Object.Methods()

//Attach to run Object's .Click() method on click
//Legacy | Will be replaced by clickrun
AFRAME.registerComponent('clickfunc', {
dependencies: ['auxl'],
schema: {
	clickObj: {type: 'string', default: 'auxlObj'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	click: function (evt) {
		this.auxl[this.data.clickObj].Click(evt.target);
	}
},
});
//Attach to run specified method from Object on click event or method from component if in scene
AFRAME.registerComponent('clickrun', {
dependencies: ['auxl'],
multiple: true,
//multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	click: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//Attach to run specified method from Object on fusing event
AFRAME.registerComponent('fusingrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	fusing: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});
//Attach to run specified method from Object on mousedown event
AFRAME.registerComponent('mousedownrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mousedown: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});
//Attach to run specified method from Object on mouseenter event
AFRAME.registerComponent('mouseenterrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseenter: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});
//Attach to run specified method from Object on mouseleave event
AFRAME.registerComponent('mouseleaverun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseleave: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});
//Attach to run specified method from Object on mouseup event
AFRAME.registerComponent('mouseuprun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseup: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//MultiMenu Suppot
//Attach to run specified method from Object on click event
AFRAME.registerComponent('menurun', {
dependencies: ['auxl'],
//multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	click: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			} else {
				this.auxl[this.data.cursorObj][this.data.method](this.data.params);
			}
		}
	}
},
});

//HoverMenu Support
//Attach to run specified method from Object on mouseenter event
AFRAME.registerComponent('hoverrun', {
dependencies: ['auxl'],
schema: {
	attached: {type: 'string', default: 'none'},
	menu: {type: 'string', default: 'menuName'},
	action: {type: 'string', default: 'actionName'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.attached = this.data.attached;
	this.menu = this.data.menu;
	this.action = this.data.action;
},
events: {
	mouseenter: function (evt) {
		//Active
		if(this.attached !== 'none'){
			this.auxl[this.attached][this.menu].hoverMenu.active = this.action;
		} else {
			this.auxl[this.menu].hoverMenu.active = this.action;
		}
	},
	mouseleave: function (evt) {
		//No longer active
		if(this.attached !== 'none'){
			this.auxl[this.attached][this.menu].hoverMenu.active = false;
		} else {
			this.auxl[this.menu].hoverMenu.active = false;
		}
	}
},
});


//On Spawn Run
//Run AUXL object method
AFRAME.registerComponent('onspawnrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	if(this.data.component === 'null'){
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method]();
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
			} else {
				this.domEnt.components[this.data.component][this.data.method](this.data.params);
			}
		}
	}
},
});

//On Despawn Run
//Run AUXL object method
AFRAME.registerComponent('ondespawnrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
},
remove: function () {
	if(this.data.component === 'null'){
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method]();
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
			} else {
				this.domEnt.components[this.data.component][this.data.method](this.data.params);
			}
		}
	}
},
});

//On Event Run
//On Event fired, run method
AFRAME.registerComponent('oneventrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	event: {type: 'string', default: 'eventName'},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'},
	once: {type: 'boolean', default: false}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.event = this.data.event;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	this.once = this.data.once;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Add Event Listener
	this.el.addEventListener(this.event,this.run,{once: this.once });
},
remove: function () {
	//Remove Event Listener
	this.el.removeEventListener(this.event,this.run);
},
});

//On Delay Run
//On Delay, run method
AFRAME.registerComponent('ondelayrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	delay: {type: 'number', default: 1000},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.delay = this.data.delay;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Set Timeout
	this.timeout = setTimeout(() => {
		this.run();
		clearTimeout(this.timeout);
	}, this.delay);

},
remove: function () {
	//Clear Timeout
	clearTimeout(this.timeout);
},
});

//On Interval Run
//On Interval, run method
AFRAME.registerComponent('onintervalrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	interval: {type: 'number', default: 1000},
	loop: {type: 'number', default: 0},
	end: {type: 'string', default: 'null'},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.interval = this.data.interval;
	this.loop = this.data.loop;
	if(this.loop === 0){
		this.loop = false;
	}
	this.end = this.data.end;
	this.checkEnd = false;
	if(this.end === 'null'){} else {
		this.checkEnd = true;
	}
	this.running = true;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Set Timeout
	this.repeat = setInterval(() => {
		//Flag End Condition
		if(this.checkEnd){
			if(this.auxl[this.cursorObj].GetFlag(this.end) === true){
				this.running = false;
				clearInterval(this.repeat);
			}
		}
		if(this.running){
			this.run();
		}
		//Loop End Condition
		if(this.loop){
			this.loop--;
			if(this.loop <= 0){
				this.running = false;
				clearInterval(this.repeat);
			}
		}
	}, this.interval);

},
remove: function () {
	//Clear Timeout
	clearInterval(this.repeat);
},
});

//Map Travel Support

//Click
AFRAME.registerComponent('doorway', {
	dependencies: ['auxl'],
schema: {
	zone: {type: 'string', default: 'zone0'},
	to: {type: 'string', default: 'connect0'},
	delay: {type: 'number', default: 0},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.zone = this.data.zone;
	this.to = this.data.to;
	this.delay = this.data.delay;
},
swap: function(){
	this.timeout = setTimeout(() => {
		this.auxl[this.zone].Move(this.to);
		clearTimeout(this.timeout);
	}, this.delay);
},
events: {
	click: function (evt) {
		this.swap();
	}
},
remove: function() {
	clearTimeout(this.timeout);
},
});

//Trigger
AFRAME.registerComponent('doorway-trigger', {
	dependencies: ['auxl'],
schema: {
	zone: {type: 'string', default: 'zone0'},
	to: {type: 'string', default: 'connect0'},
	delay: {type: 'number', default: 0},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.zone = this.data.zone;
	this.to = this.data.to;
	this.delay = this.data.delay;
},
swap: function(){
	this.timeout = setTimeout(() => {
		this.auxl[this.zone].Move(this.to);
		clearTimeout(this.timeout);
	}, this.delay);
},
remove: function() {
	clearTimeout(this.timeout);
},
});

//
//Display Text Description on Hover
//Could make each core have the ability to configure a hover text just like detail text and then use mouseenterrun/mouseleaverun
//Otherwise need to fix despawning on multiple objects
AFRAME.registerComponent('hovertext', {
	dependencies: ['auxl'],
schema: {
	value: {type: 'string', default: 'TEXT'},
	hover: {type: 'string', default: 'front'},
	offset: {type: 'number', default: 1},
	twist: {type: 'bool', default: true},
	size: {type: 'number', default: 20},
},
    init: function () {
		this.auxl = document.querySelector('a-scene').systems.auxl;
		this.value = this.data.value;
		this.hover = this.data.hover;
		this.offset = this.data.offset;
		this.twist = this.data.twist;
		this.size = this.data.size;
		this.hoverSpawned = false;

		this.position = new THREE.Vector3(0,0,0);

		if(this.hover === 'top'){
			this.position = new THREE.Vector3(0,this.offset,0);
		} else if(this.hover === 'front'){
			this.position = new THREE.Vector3(0,0,this.offset);
		}

		//
		//Hover Text Template
		this.hoverTextParentData = {
		data:'hoverTextParentData',
		id:'hoverTextParent',
		sources:false,
		text: false,
		geometry: false,
		material: false,
		position: new THREE.Vector3(0,0,0),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['nullParent','a-ent'],
		components: {
			//['look-at-xyz']:{match: 'camera', y:this.twist,},
			['stare']:{id: 'playerRig', twist: this.twist},
		},
		};
		this.hoverTextParent = this.auxl.Core(this.hoverTextParentData);
		this.hoverTextData = {
		data:'hoverTextData',
		id:'hoverText',
		text: {value:this.value, wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center', width: 2},
		position: this.position,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
		};
		this.hoverText = this.auxl.Core(this.hoverTextData);
		this.hoverTextAllData = {
			parent: {core: this.hoverTextParent},
			child0: {core: this.hoverText},
		}
		this.hoverTextAll = this.auxl.Layer('hoverTextAll', this.hoverTextAllData);

    },
events: {
	mouseenter: function (evt) {
		if(this.hoverSpawned){}else{
			this.hoverSpawned = true;
			this.hoverTextAll.SpawnLayer(this.el);
		}
	},
	mouseleave: function (evt) {
		if(this.hoverSpawned){
			this.hoverTextAll.DespawnLayer();
			this.hoverSpawned = false;
		}
	},
},
    update: function () {

    },
    remove: function () {
		if(this.hoverSpawned){}else{
			this.hoverTextAll.DespawnLayer();
			this.hoverSpawned = false;
		}
    },

});

//
//Locomotion
//1st/3rd Walk|Run X,Y and/or Z w/ Collision Support
AFRAME.registerComponent('locomotion', {
dependencies: ['auxl'],
schema: {
	uiid: {type: 'string', default: 'ui'},
	courserid: {type: 'string', default: 'mouseCursor'},
	movetype: {type: 'string', default: 'vr'},
	pov: {type: 'string', default: '1st'},
	style: {type: 'string', default: 'free'},
	axis: {type: 'string', default: 'posXZ'},
	speedFast: {type: 'number', default: 0.15},
	speedSlow: {type: 'number', default: 0.075},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	//Free Locomotion
	this.freeStepThrottled = AFRAME.utils.throttle(this.freeStep, 30, this);
	//this.freeStepThrottled = AFRAME.utils.throttle(this.freeStepPlus, 30, this);
	//Grid Locomotion
	this.gridStepThrottled = AFRAME.utils.throttle(this.gridStep, 400, this);

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uuid){
		this.ui = document.getElementById(this.data.uiid);
	}
//
//posXZ
//directionXZ : 1st POV Walk along XZ Floor relative to Camera View
//rigXZ : 3rd POV Walk along XZ Floor
//
//posXZY
//directionXZY : 1st POV Fly relative to Camera View
//
//posXY
//directionXY : 1st POV Walk along XY Wall relative to Camera View
//rigXY : 3rd POV Walk along XY Wall
//
//posXYZ
//directionXYZ : 1st POV Walk along XZ Floor relative to Camera View w/ Up & Down Controls
//rigXYZ : 3rd POV Walk along XZ Floor w/ Up & Down Controls
//
//posXYZWall
//directionXYZWall : 1st POV Walk along X, Y or Z Floor/Walls In or Out
//rigXYZWall : 3rd POV Walk along X, Y or Z Floor/Walls In or Out
//
//angleXY
//directionAXY : 1st POV Orbit Rotate
//rigAXY : 3rd POV Orbit Rotate
//
//angleXYZ
//directionAXYZ : 1st POV Orbit Rotate w/ Zoom In & Out
//rigAXYZ : 3rd POV Orbit Rotate w/ Zoom In & Out

	//Movement Type
	this.movetype = this.data.movetype;
	//vr
	//vrHover
	//desktop
	//mobile

	//Point of View
	this.pov = this.data.pov;
	//1st
	//3rd

	//Free or Grid Locomotion Style
	this.style = this.data.style;
	//free
	//grid

	//Movement Coords
	this.axis = this.data.axis;
	//Move XZ - floor movement
	//Move XY - wall movement
	//Move XYZ - fly movement
	//Move Sphere Angle - orbit movement
	//Move Sphere Angle & Z(In and Out) - orbit with zoom

	//
	//Band Controller Support
	this.directionForward;
	this.directionReverse;
	this.directionBrake1;
	this.directionBrake2;
	this.directionBrake3;
	this.directionBrake4;

	//Camera Walk Support
	this.camera = document.getElementById('camera');
	this.player = document.getElementById('playerRig');
	//this.playerSphere = document.getElementById('playerSphere');
	this.avatar;
	this.avatarSphere;
	this.ui = document.getElementById('beltUIParent');
    this.positionCam = new THREE.Vector3();
    this.positionPlayer = new THREE.Vector3();
    this.rotationPlayer = new THREE.Vector3();
    this.positionAvatar = new THREE.Vector3();
    this.rotationAvatar = new THREE.Vector3();
    this.positionNew = new THREE.Vector3();
    this.rotationNew = new THREE.Vector3();
    this.positionTemp = new THREE.Vector3();
	this.quaternion = new THREE.Quaternion();
	this.vector;
	this.angle;
	//Direction of Movement
	this.directionObject;
    this.directionVector = new THREE.Vector3();


	//Collision
	this.posRound = new THREE.Vector3();
	this.newPosRound = new THREE.Vector3();
	this.newPosStandRound = new THREE.Vector3();
	this.newPosTemp = new THREE.Vector3();
	this.mapX;
	this.mapZ;

	//Attach to Player Support
	this.elPosVec3New = new THREE.Vector3();

	//User Direction Support
	this.velocity;
	this.userPreviousPos = this.player.getAttribute('position');
	this.userPos;
	this.userRot;
	this.userPov;
	this.userTravel;
	this.userView;
	this.newX;
	this.newZ;

	//Locomotion Support
	//Brake Engaged by Default aka Slow Speed
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveUp = false;
	this.moveDown = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay

	//Free Locomotion Support
	this.moveSpeedDefault = this.data.speedFast;
	this.moveSpeedSlow = this.data.speedSlow;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridUpTimeout;
	this.gridDownTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 400;

	//3rd Person Config
	let initDelay = setTimeout(()=> {
		if(this.pov === '3rd'){
			this.auxl.avatar.SpawnLayer(true);
			this.player.object3D.position.copy(new THREE.Vector3(0,5,10));
			let initDelay = setTimeout(()=> {
				this.avatar = document.getElementById('avatarRig');
				this.avatarSphere = document.getElementById('avatarSphere');
				if(this.axis === 'angleXY'){
					this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
					this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
				}
			},500)
		}
	},1000)
},
//1 Increments
round: function (num){
	return Math.round(num);
},
//0.5 Increments
roundHalf: function (num){
	return Math.round(num*2)/2;
},
//Move Forward
movingForward: function (){
	clearTimeout(this.gridForwardTimeout);
	if(this.moveTo){}else{
		this.moveTo = true;
	}
},
//Cancel Forward
cancelForward: function (){
	if(this.moveTo){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveTo = false;
			} else {
				this.gridForwardTimeout = setTimeout(() => {
					this.moveTo = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveTo = false;
		}
	}
},
//Move Reverse
movingReverse: function (){
	clearTimeout(this.gridReverseTimeout);
	if(this.moveBack){}else{
		this.moveBack = true;
	}
},
//Cancel Reverse
cancelReverse: function (){
	if(this.moveBack){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveBack = false;
			} else {
				this.gridReverseTimeout = setTimeout(() => {
					this.moveBack = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveBack = false;
		}
	}
},
//Move Left
movingLeft: function (){
	clearTimeout(this.gridLeftTimeout);
	if(this.moveLeft){}else{
		this.moveLeft = true;
	}
},
//Cancel Left
cancelLeft: function (){
	if(this.moveLeft){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveLeft = false;
			} else {
				this.gridLeftTimeout = setTimeout(() => {
					this.moveLeft = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveLeft = false;
		}
	}
},
//Move Right
movingRight: function (){
	clearTimeout(this.gridRightTimeout);
	if(this.moveRight){}else{
		this.moveRight = true;
	}
},
//Cancel Right
cancelRight: function (){
	if(this.moveRight){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveRight = false;
			} else {
				this.gridRightTimeout = setTimeout(() => {
					this.moveRight = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveRight = false;
		}
	}
},
//Move Up
movingUp: function (){
	clearTimeout(this.gridUpTimeout);
	if(this.moveUp){}else{
		this.moveUp = true;
	}
},
//Cancel Up
cancelUp: function (){
	if(this.moveUp){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveUp = false;
			} else {
				this.gridUpTimeout = setTimeout(() => {
					this.moveUp = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveUp = false;
		}
	}
},
//Move Down
movingDown: function (){
	clearTimeout(this.gridDownTimeout);
	if(this.moveDown){}else{
		this.moveDown = true;
	}
},
//Cancel Down
cancelDown: function (){
	if(this.moveDown){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveDown = false;
			} else {
				this.gridDownTimeout = setTimeout(() => {
					this.moveDown = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveDown = false;
		}
	}
},
//Clear All Movement
clearMovement: function (){
	this.cancelForward();
	this.cancelReverse();
	this.cancelLeft();
	this.cancelRight();
	this.cancelUp();
	this.cancelDown();
},
//Clear All Grid Movement
clearGridMovement: function (){
	this.moveTo = false;
	this.moveBack = false;
	this.moveLeft = false;
	this.moveRight = false;
	clearTimeout(this.gridForwardTimeout);
	clearTimeout(this.gridReverseTimeout);
	clearTimeout(this.gridLeftTimeout);
	clearTimeout(this.gridRightTimeout);
},
//Toggle Speed Change
toggleSpeed: function (){
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
			//Slower Grid Move
			this.gridSpeed = 400;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		} else {
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake Off
			this.moveBrake = false;
			//Faster Grid Move
			this.gridSpeed = 200;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		}
		this.brakeReset = setTimeout(() => {
			//Set reset switch toggle
			this.brakeReady = true;
			clearTimeout(this.brakeReset);
		}, 250);
	}
},
//Long Buffer for Toggling Speed Change
brakeReadBufferLong: function (){
	//This will start the reset timer to allow the brake to be re-engadged
	this.brakeReset = setTimeout(() => {
		this.brakeReady = true;
		clearTimeout(this.brakeReset);
	}, 2250);
},
//Hover Interaction on Belt UI
hoverLocomotion: function (e) {
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			this.moveBrake = true;
			//Set brake color to red
			this.directionBrake1.setAttribute('material', {color: 'red'});
			this.directionBrake2.setAttribute('material', {color: 'red'});
			this.directionBrake3.setAttribute('material', {color: 'red'});
			this.directionBrake4.setAttribute('material', {color: 'red'});
			//Anim positition for forward/reverse bar and brakes
			this.directionForward.emit('brakeOn',{});
			this.directionReverse.emit('brakeOn',{});
			this.directionBrake1.emit('brakeOn',{});
			this.directionBrake2.emit('brakeOn',{});
			this.directionBrake3.emit('brakeOn',{});
			this.directionBrake4.emit('brakeOn',{});
		} else {
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			this.moveBrake = false;
			//Set brake color to default
			this.directionBrake1.setAttribute('material', {color: 'black'});
			this.directionBrake2.setAttribute('material', {color: 'black'});
			this.directionBrake3.setAttribute('material', {color: 'black'});
			this.directionBrake4.setAttribute('material', {color: 'black'});
			//Anim positition for forward/reverse bar back to default
			this.directionForward.emit('brakeOff',{});
			this.directionReverse.emit('brakeOff',{});
			this.directionBrake1.emit('brakeOff',{});
			this.directionBrake2.emit('brakeOff',{});
			this.directionBrake3.emit('brakeOff',{});
			this.directionBrake4.emit('brakeOff',{});
		}
	}
},
//Update
update: function () {
	//Locomotion Support
	//Brake Engaged by Default
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay
	this.moveSpeedDefault = this.data.speedFast;
	this.moveSpeedSlow = this.data.speedSlow;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 500;

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uiid){
		this.ui = document.getElementById(this.data.uiid);
	}
	//Movement Type
	this.movetype = this.data.movetype;
	//Point of View
	this.pov = this.data.pov;
	//Free or Grid Locomotion Style
	this.style = this.data.style;
	//Movement Coords
	this.axis = this.data.axis;
	//3rd Person Config
	let initDelay = setTimeout(()=> {
		if(this.pov === '3rd'){
			this.auxl.avatar.SpawnLayer(true);
			this.player.object3D.position.copy(new THREE.Vector3(0,5,10));
			let initDelay = setTimeout(()=> {
				this.avatar = document.getElementById('avatarRig');
				this.avatarSphere = document.getElementById('avatarSphere');
				if(this.axis === 'angleXY'){
					this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
					this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
				}
			},500)
		}
	},1000)

	//Keyboard Controller Event Listeners
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
		this.directionObject = document.getElementById('camera');
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
		this.directionObject = document.getElementById('camera');
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
		if(this.auxl.directionType === 'camera'){
			this.directionObject = document.getElementById('camera');
		} else {
			if(this.auxl.vrHand === 'bothRight' || this.auxl.vrHand === 'bothLeftLoco'){
				this.directionObject = document.getElementById('vrController1');
			} else if(this.auxl.vrHand === 'bothLeft' || this.auxl.vrHand === 'bothRightLoco'){
				this.directionObject = document.getElementById('vrController2');
			} else {
				this.directionObject = document.getElementById('vrController1');
			}
		}	
	} else if(this.movetype === 'vrHover'){
		if(this.auxl.directionType === 'camera'){
			this.directionObject = document.getElementById('camera');
		} else {
			this.directionObject = document.getElementById('vrController1');
		}	
		//this.vrController1;
		this.directionForward = document.getElementById('locomotionForwardUI');
		this.directionReverse = document.getElementById('locomotionReverseUI');
		this.directionBrake1 = document.getElementById('locomotionBrake1UI');
		this.directionBrake2 = document.getElementById('locomotionBrake2UI');
		this.directionBrake3 = document.getElementById('locomotionBrake3UI');
		this.directionBrake4 = document.getElementById('locomotionBrake4UI');
		//directionForward
		this.directionForward.addEventListener('mouseenter', this.movingForward);
		this.directionForward.addEventListener('mouseleave', this.cancelForward);
		//directionReverse
		this.directionReverse.addEventListener('mouseenter', this.movingReverse);
		this.directionReverse.addEventListener('mouseleave', this.cancelReverse);

		this.hoverLocomotionEvent = (event) => {
			this.hoverLocomotion(event);
		}
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseenter', event => this.hoverLocomotionEvent)
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseleave', event => this.brakeReadBufferLong)
		});
	}
},
//Remove
remove: function () {
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vrHover'){
		this.directionForward.removeEventListener('mouseenter', this.movingForward);
		this.directionForward.removeEventListener('mouseleave', this.cancelForward);
		this.directionReverse.removeEventListener('mouseenter', this.movingReverse);
		this.directionReverse.removeEventListener('mouseleave', this.cancelReverse);
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseenter', event => this.hoverLocomotionEvent)
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseleave', event => this.brakeReadBufferLong)
		});
	}
},
//Tick
tick: function (time, timeDelta) {
	//Unlocked Locomotion
	if(this.auxl.player.layer.move){
		//Locomotion Type
		if(this.style === 'free'){
			this.freeStepThrottled();
		} else if(this.style === 'grid'){
			this.gridStepThrottled();
		}

		//Sync Belt
		if(this.movetype === 'vrHover'){
			this.uiSync();
		}
	}
},
//Free Locomotion Tick
freeStep: function (time, timeDelta) {
	if(this.moveBrake){
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedSlow);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedSlow);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedSlow);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedSlow);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedSlow);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedSlow);
		}
	} else {
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedDefault);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedDefault);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedDefault);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedDefault);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedDefault);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedDefault);
		}
	}
},
//Free Locomotion For Up/Down Button Support
freeStepPlus: function (time, timeDelta) {

//Not Working
//UpForwardLeft
//UpReverseLeft
//DownForwardRight
//DownReverseRight
	this.movement = '';
	//Up|Down
	if(this.moveUp && this.moveDown){} else {
		if(this.moveUp){
			this.movement += 'Up';
		} else if(this.moveDown){
			this.movement += 'Down';
		}
	}
	//Forward|Reverse
	if(this.moveTo && this.moveBack){} else {
		if(this.moveTo){
			this.movement += 'Forward';
		} else if(this.moveBack){
			this.movement += 'Reverse';
		}
	}
	//Right|Left
	if(this.moveRight && this.moveLeft){} else {
		if(this.moveRight){
			this.movement += 'Right';
		} else if(this.moveLeft){
			this.movement += 'Left';
		}
	}
	//console.log(this.movement)

	//Speed
	if(this.moveBrake){
		this.move(this.movement, this.moveSpeedSlow);
	} else {
		this.move(this.movement, this.moveSpeedDefault);
	}
},
//Grid Locomotion Tick
gridStep: function (time, timeDelta) {
	if(this.moveTo || this.moveBack || this.moveRight || this.moveLeft){
		if(this.gridMove){} else {
			this.gridMove = true;
		}
	} else {
		this.gridMove = false;
	}
	if(this.moveTo && this.moveRight) {
		this.move('forwardRight', 0.5);
	} else if(this.moveTo && this.moveLeft) {
		this.move('forwardLeft', 0.5);
	} else if(this.moveBack && this.moveRight) {
		this.move('reverseRight', 0.5);
	} else if(this.moveBack && this.moveLeft) {
		this.move('reverseLeft', 0.5);
	} else if(this.moveTo) {
		this.move('forward', 0.5);
	} else if(this.moveBack) {
		this.move('reverse', 0.5);
	} else if(this.moveRight) {
		this.move('right', 0.5);
	} else if(this.moveLeft) {
		this.move('left', 0.5);
	}

},
//Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},
//Sync Belt UI
uiSync: function () {
	this.elPosVec3New.copy(this.el.object3D.position);
	//No Offsets as UI Parent is at 0 0 0
	this.ui.object3D.position.copy(this.elPosVec3New);
},
//Move
move: function (direction, speed) {
	if(this.pov === '1st'){
		if(this.axis === 'posXZ'){
			this.directionXZ(direction, speed);
		} else if(this.axis === 'posXZY'){
			this.directionXZY(direction, speed);
		} else if(this.axis === 'posXY'){
			this.directionXY(direction, speed);
		} else if(this.axis === 'posXYZ'){
			this.directionXYZ(direction, speed);
		} else if(this.axis === 'posXYZWall'){
			this.directionXYZWall(direction, speed);
		} else if(this.axis === 'angleXY'){
			this.directionAXY(direction, speed);
		} else if(this.axis === 'angleXYZ'){
			this.directionAXYZ(direction, speed);
		}
	} else if(this.pov === '3rd'){
		if(this.axis === 'posXZ'){
			this.rigXZ(direction, speed);
		} else if(this.axis === 'posXZY'){
			this.rigXZY(direction, speed);
		} else if(this.axis === 'posXY'){
			this.rigXY(direction, speed);
		} else if(this.axis === 'posXYZ'){
			this.rigXYZ(direction, speed);
		} else if(this.axis === 'posXYZWall'){
			this.rigXYZWall(direction, speed);
		} else if(this.axis === 'angleXY'){
			this.rigAXY(direction, speed);
		} else if(this.axis === 'angleXYZ'){
			this.rigAXYZ(direction, speed);
		}
	}
},
//Toggle 1st/3rd POV
togglePOV: function (){

	//Load 3rd POV
	if(this.pov === '3rd'){
		//Spawn Avatar
		this.auxl.avatar.SpawnLayer(true);
		//Move Avatar to Player Current POS

		//Move Player to Avatar Offset
		this.player.object3D.position.copy(new THREE.Vector3(0,5,10));

		let initDelay = setTimeout(()=> {
			//Update Avatar Reference
			this.avatar = document.getElementById('avatarRig');
			this.avatarSphere = document.getElementById('avatarSphere');

/*
			if(this.axis === 'angleXY'){
				this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
				this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
			}
*/

		},500)


	}


},
//Default
//1st POV Walk along XZ Floor relative to Direction View
directionXZ: function (action, speed) {
	this.allow = false;
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}

	this.positionNew.y = this.positionPlayer.y;

	//Physics, Grid Collision or No Clip
	if(this.auxl.physics){
		this.player.body.position.copy(this.positionNew);
	} else if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter on XZ and 1 meter on Y
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.round(this.positionNew.y);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.y = this.round(this.positionPlayer.y);
		this.posRound.z = this.roundHalf(this.positionPlayer.z);
		//Check for Obstacles
		if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
			if(this.auxl.player.layer.standing){
				this.newPosStandRound.copy(this.newPosRound);
				this.newPosStandRound.y+=1;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosStandRound, this.posRound)){
					this.allow = true;
				} else {
					this.allow = false;
				}
			} else {
				this.allow = true;
			}
		}
		//Atempt to move parallel
		if(!this.allow){
			//Backup
			this.newPosTemp.copy(this.newPosRound);
			//Test X
			this.newPosRound.x = this.posRound.x;
			if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
				//X is blocked
				this.positionNew.x = this.positionPlayer.x;
				this.allow = true;
			} else {
				//Test Z
				this.newPosRound.z = this.posRound.z;
				//Reset X
				this.newPosRound.x = this.newPosTemp.x;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
					//Z is blocked
					this.positionNew.z = this.positionPlayer.z;
					this.allow = true;
				} 
			}
		}
		//Move
		if(this.allow){
			this.player.object3D.position.copy(this.positionNew);
			this.auxl.player.layer.gridPos.copy(this.newPosRound);

			let direction = '';
			if(this.newPosRound.z < this.posRound.z){
				direction += 'forward'
			} else if(this.newPosRound.z > this.posRound.z){
				direction += 'reverse'
			}
			if(this.newPosRound.x > this.posRound.x){
				direction += 'right'
			} else if(this.newPosRound.x < this.posRound.x){
				direction += 'left'
			}
			this.auxl.player.layer.gridDirection = direction;
			//Check for Triggers on New Coords
			if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
				//Check for Trigger Enter
				if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
					this.auxl.map.TriggerEnterHit(this.newPosRound);
				}
				//Check for Trigger Exits
				this.auxl.map.CheckActiveTriggers(this.newPosRound);
				//Check for Cleared Spawn Collision Conditions
				this.auxl.map.WaitingToSpawn();
			}
		}
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}
},
//1st POV Walk with Fly Buttons relative to Direction View
directionXZY: function (action, speed) {
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	if(action === 'UpForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpForward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'Up'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'Down'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y;
	}

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.z = this.roundHalf(this.positionPlayer.z);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.player.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}


},
//1st POV Walk along XY Wall relative to Direction View
directionXY: function (action, speed) {
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'front';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'front';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'back';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'back';
	} else {
		//console.log('Level');
		this.face = 'front';
	}

	if(action === 'forwardRight'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'forwardLeft'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'reverseRight'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'reverseLeft'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionPlayer.x + this.velocity;
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'left'){
		this.positionNew.x = this.positionPlayer.x - this.velocity;
		this.positionNew.y = this.positionPlayer.y;
	}
	this.positionNew.z = this.positionPlayer.z;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.roundHalf(this.positionNew.y);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.y = this.roundHalf(this.positionPlayer.y);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.player.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}
},
//1st POV Fly relative to Direction View
directionXYZ: function (action, speed) {
	this.allow = false;
	this.yDeadZone = 0.1;
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.cameraVector = new THREE.Vector3();
	this.camera.object3D.getWorldDirection(this.cameraVector);
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}

	//Up Down
	if(this.cameraVector.y < this.yDeadZone){
		this.positionNew.y = this.positionPlayer.y + ((this.cameraVector.y * -1) * this.velocity);
	} else if(this.cameraVector.y > (this.yDeadZone*-1)){
		this.positionNew.y = this.positionPlayer.y - (this.cameraVector.y * this.velocity);
	} else {
		this.positionNew.y = this.positionPlayer.y;
	}

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter at XZ and 1m on Y
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.round(this.positionNew.y);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.y = this.round(this.positionPlayer.y);
		this.posRound.z = this.roundHalf(this.positionPlayer.z);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
			if(this.auxl.player.layer.standing){
				this.newPosStandRound.copy(this.newPosRound);
				this.newPosStandRound.y+=1;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosStandRound, this.posRound)){
					this.allow = true;
				} else {
					this.allow = false;
				}
			} else {
				this.allow = true;
			}
		} else {
			this.allow = false;
		}
		//Atempt to move parallel
		if(!this.allow){
			//Backup
			this.newPosTemp.copy(this.newPosRound);
			//Test Y
			this.newPosRound.y = this.posRound.y;
			if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
				//Y is blocked
				this.positionNew.y = this.positionPlayer.y;
				this.allow = true;
			} else {
				//Test X
				this.newPosRound.x = this.posRound.x;
				//Reset Y
				this.newPosRound.y = this.newPosTemp.y;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
					//Z is blocked
					this.positionNew.x = this.positionPlayer.x;
					this.allow = true;
				} else {
					//Test Z
					this.newPosRound.z = this.posRound.z;
					//Reset XY
					this.newPosRound.x = this.newPosTemp.x;
					this.newPosRound.y = this.newPosTemp.y;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
						//Z is blocked
						this.positionNew.z = this.positionPlayer.z;
						this.allow = true;
					} 
				}
			}
		}
		//Move
		if(this.allow){
/*
			if(this.positionNew.y < 0){
				console.log(this.positionNew.y); 
			}
*/
			this.player.object3D.position.copy(this.positionNew);
			this.auxl.player.layer.gridPos.copy(this.newPosRound);
			//Check for Triggers on New Coords
			if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
				//Check for Trigger Enter
				if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
					this.auxl.map.TriggerEnterHit(this.newPosRound);
				}
				//Check for Trigger Exits
				this.auxl.map.CheckActiveTriggers(this.newPosRound);
				//Check for Cleared Spawn Collision Conditions
				this.auxl.map.WaitingToSpawn();
			}
		}
/*
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.player.object3D.position.copy(this.positionNew);
			this.auxl.player.layer.gridPos.copy(this.newPosRound);
			//Check for Triggers on New Coords
			if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
				//Check for Trigger Enter
				if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
					this.auxl.map.TriggerEnterHit(this.newPosRound);
				}
				//Check for Trigger Exits
				this.auxl.map.CheckActiveTriggers(this.newPosRound);
				//Check for Cleared Spawn Collision Conditions
				this.auxl.map.WaitingToSpawn();
			}
		}
*/
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}
},
//1st POV Walk along X, Y or Z Floor/Walls relative to Direction View
directionXYZWall: function (action, speed){},
//1st POV Orbit Rotate
directionAXY: function (action, speed){},
//1st POV Orbit Rotate w/ Zoom In & Out
directionAXYZ: function (action, speed){},
//3rd POV Walk along XZ Floor
rigXZ: function (action, speed) {
	this.velocity = speed;
	this.positionNew = new THREE.Vector3();
	this.positionAvatar.copy(this.avatar.object3D.position);

	if(action === 'forwardRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'forwardLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'reverseRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'reverseLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z;
	} else if(action === 'left'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z;
	}
	this.positionNew.y = this.positionAvatar.y;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionAvatar.x);
		this.posRound.z = this.roundHalf(this.positionAvatar.z);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.avatar.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.avatar.object3D.position.copy(this.positionNew);
	}
},
//3rd POV Walk with Fly Buttons
rigXZY: function (action, speed){},
//3rd POV Walk along XY Wall
rigXY: function (action, speed) {
	this.velocity = speed;
	this.positionNew = new THREE.Vector3();
	this.positionAvatar.copy(this.avatar.object3D.position);

	if(action === 'forwardRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'forwardLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'reverseRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'reverseLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y;
	} else if(action === 'left'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y;
	}
	this.positionNew.z = this.positionAvatar.z;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.roundHalf(this.positionNew.y);
		this.posRound.x = this.roundHalf(this.positionAvatar.x);
		this.posRound.y = this.roundHalf(this.positionAvatar.y);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.avatar.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.avatar.object3D.position.copy(this.positionNew);
	}
},
//3rd POV Walk along XZ Floor w/ Up & Down Controls
rigXYZ: function (action, speed){},
//3rd POV Walk along X, Y or Z Floor/Walls
rigXYZWall: function (action, speed){},
//3rd POV Orbit Rotate
rigAXY: function (action, speed) {
	this.velocity = speed/10;
	this.rotationNew = new THREE.Euler(0,0,0,'YXZ');
	this.rotationAvatar.copy(this.avatarSphere.object3D.rotation);

	if(action === 'forwardRight'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'forwardLeft'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	} else if(action === 'reverseRight'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'reverseLeft'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	} else if(action === 'forward'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y;
	} else if(action === 'reverse'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y;
	} else if(action === 'right'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'left'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	}
	this.rotationNew.z = this.rotationAvatar.z;

	//Free Locomotion No Collision
	this.avatarSphere.object3D.rotation.copy(this.rotationNew);
},
//3rd POV Orbit Rotate w/ Zoom In & Out
rigAXYZ: function (action, speed){},
//Camera Direction to Spawn Assets In - Unused Currently
userDirection: function (){
	this.userPos = this.player.getAttribute('position');
	this.userRot = this.camera.getAttribute('rotation');
	//Check which direction the user is traveling
	if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northWest -x-z
		this.userTravel = 'northWest';
	} else if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southWest -x +z
		this.userTravel = 'southWest';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southEast +x+z
		this.userTravel = 'southEast';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northEast +x-z
		this.userTravel = 'northEast';
	} else {
		//Default
		this.userTravel = 'northEast';
	}
	//After previous to current position check, update the previous position value to be compared against on the next run cycle
	this.userPreviousPos = this.userPos;

	//If POV Rotation is more then 360 or -360, divide it by sets of 360 to obtain 0-360 degrees to assign from
	if( this.userRot.y > 360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else if(this.userRot.y < -360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else {
		this.userPov = this.userRot.y;
	}
	//Check which direciton the User is facing
	if ((this.userPov > 0 && this.userPov < 15) || (this.userPov > 345 && this.userPov < 360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov > 255 && this.userPov > 285) {
			//East
			this.userView = 'east';
		} else if (this.userPov > 75 && this.userPov < 105) {
			//West
			this.userView = 'west';
		} else if (this.userPov > 165 && this.userPov < 195) {
			//South
			this.userView = 'south';
		} else if ((this.userPov < 0 && this.userPov > -15) || (this.userPov < -345 && this.userPov > -360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov < -255 && this.userPov > -285) {
			//West
			this.userView = 'west';
		} else if (this.userPov < -75 && this.userPov > -105) {
			//East
			this.userView = 'east';
		} else if (this.userPov < -165 && this.userPov > -195) {
			//South
			this.userView = 'south';
		} else if (this.userPov > 15 && this.userPov < 75) {//
			//North West
			this.userView = 'northWest';
	   } else if (this.userPov > 105 && this.userPov < 165) {//
			//South West
			this.userView = 'southWest';
		} else if (this.userPov > 195 && this.userPov < 255) {//
			//South East
			this.userView = 'southEast';
		} else if (this.userPov > 285 && this.userPov < 345) {//
			//North East
			this.userView = 'northEast';
		} else if (this.userPov < -15 && this.userPov > -75 ) {//Negative direction
			//North East
			this.userView = 'northEast';
	   } else if (this.userPov < -105 && this.userPov > -165) {
			//South East
			this.userView = 'southEast';
		} else if (this.userPov < -195 && this.userPov > -255) {
			//South West
			this.userView = 'southWest';
		} else if (this.userPov < -285 && this.userPov > -345) {
			//North West
			this.userView = 'northWest';
		} else {
			this.userView = 'north';
		}
	//Depending on the User's facing direction, spawn in that quadrant
	if(this.userView === "northWest"){// -x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z = (this.velocity + this.positionPlayer.z) * -1;
		this.positionTemp.z += this.positionPlayer.z;
	} else if(this.userView === "southWest"){// -x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "southEast"){// +x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "northEast"){// +x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "north"){// +-x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "west"){// -x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "east"){// +x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "south"){// +-x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else {
		this.positionTemp.x = 0;
		this.positionTemp.z = 0;
	}
	this.positionNew = new THREE.Vector3(this.positionTemp.x, 0, this.positionTemp.z);
},

});

//
//Gimbal
//1st/3rd Rotation X,Y and/or Z
AFRAME.registerComponent('gimbal', {
dependencies: ['auxl'],
schema: {
	uiid: {type: 'string', default: 'ui'},
	courserid: {type: 'string', default: 'mouseCursor'},
	movetype: {type: 'string', default: 'vr'},
	pov: {type: 'string', default: '1st'},
	style: {type: 'string', default: 'free'},
	axis: {type: 'string', default: 'rotXZ'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	//Free Locomotion
	this.freeStepThrottled = AFRAME.utils.throttle(this.freeStep, 30, this);
	//Grid Locomotion
	this.gridStepThrottled = AFRAME.utils.throttle(this.gridStep, 400, this);

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uuid){
		this.ui = document.getElementById(this.data.uiid);
	}


	//Movement Type
	this.movetype = this.data.movetype;
	//vr
	//vrHover
	//desktop
	//mobile

	//Point of View
	this.pov = this.data.pov;
	//1st
	//3rd

	//Free or Grid Locomotion Style
	this.style = this.data.style;
	//free
	//grid

	//Movement Coords
	this.axis = this.data.axis;
	//Rot XZ

	//Camera Rotate Support
	this.camera = document.getElementById('camera');
	this.player = document.getElementById('playerRig');
	//this.playerSphere = document.getElementById('playerSphere');
	this.avatar;
	this.avatarSphere;
	this.ui = document.getElementById('beltUIParent');
    this.rotationPlayer = new THREE.Vector3();
    this.rotationAvatar = new THREE.Vector3();
    this.rotationNew = new THREE.Vector3();
    this.rotationTemp = new THREE.Vector3();
	this.quaternion = new THREE.Quaternion();
	this.vector;
	this.angle;

	//Collision
	this.posRound = new THREE.Vector3();
	this.newPosRound = new THREE.Vector3();
	this.mapX;
	this.mapZ;

	//Attach to Player Support
	this.elPosVec3New = new THREE.Vector3();

	//User Direction Support
	this.velocity;
	this.userPreviousPos = this.player.getAttribute('rotation');
	this.userPos;
	this.userRot;
	this.userPov;
	this.userTravel;
	this.userView;
	this.newX;
	this.newZ;

	//Locomotion Support
	//Brake Engaged by Default aka Slow Speed
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveUp = false;
	this.moveDown = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay

	//Free Locomotion Support
	this.moveSpeedDefault;
	this.moveSpeedSlow;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridUpTimeout;
	this.gridDownTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 400;

	//3rd Person Config
	let initDelay = setTimeout(()=> {
		if(this.pov === '3rd'){
			let initDelay = setTimeout(()=> {
				this.avatar = document.getElementById('avatarRig');
				this.avatarSphere = document.getElementById('avatarSphere');
			},500)
		}
	},1000)
},
//0.5 Increments
roundHalf: function (num){
    return Math.round(num*2)/2;
},
//Move Forward
movingForward: function (){
	clearTimeout(this.gridForwardTimeout);
	if(this.moveTo){}else{
		this.moveTo = true;
	}
},
//Cancel Forward
cancelForward: function (){
	if(this.moveTo){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveTo = false;
			} else {
				this.gridForwardTimeout = setTimeout(() => {
					this.moveTo = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveTo = false;
		}
	}
},
//Move Reverse
movingReverse: function (){
	clearTimeout(this.gridReverseTimeout);
	if(this.moveBack){}else{
		this.moveBack = true;
	}
},
//Cancel Reverse
cancelReverse: function (){
	if(this.moveBack){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveBack = false;
			} else {
				this.gridReverseTimeout = setTimeout(() => {
					this.moveBack = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveBack = false;
		}
	}
},
//Move Left
movingLeft: function (){
	clearTimeout(this.gridLeftTimeout);
	if(this.moveLeft){}else{
		this.moveLeft = true;
	}
},
//Cancel Left
cancelLeft: function (){
	if(this.moveLeft){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveLeft = false;
			} else {
				this.gridLeftTimeout = setTimeout(() => {
					this.moveLeft = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveLeft = false;
		}
	}
},
//Move Right
movingRight: function (){
	clearTimeout(this.gridRightTimeout);
	if(this.moveRight){}else{
		this.moveRight = true;
	}
},
//Cancel Right
cancelRight: function (){
	if(this.moveRight){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveRight = false;
			} else {
				this.gridRightTimeout = setTimeout(() => {
					this.moveRight = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveRight = false;
		}
	}
},
//Move Up
movingUp: function (){
	clearTimeout(this.gridUpTimeout);
	if(this.moveUp){}else{
		this.moveUp = true;
	}
},
//Cancel Up
cancelUp: function (){
	if(this.moveUp){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveUp = false;
			} else {
				this.gridUpTimeout = setTimeout(() => {
					this.moveUp = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveUp = false;
		}
	}
},
//Move Down
movingDown: function (){
	clearTimeout(this.gridDownTimeout);
	if(this.moveDown){}else{
		this.moveDown = true;
	}
},
//Cancel Down
cancelDown: function (){
	if(this.moveDown){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveDown = false;
			} else {
				this.gridDownTimeout = setTimeout(() => {
					this.moveDown = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveDown = false;
		}
	}
},
//Clear All Movement
clearMovement: function (){
	this.cancelForward();
	this.cancelReverse();
	this.cancelLeft();
	this.cancelRight();
	this.cancelUp();
	this.cancelDown();
},
//Clear All Grid Movement
clearGridMovement: function (){
	this.moveTo = false;
	this.moveBack = false;
	this.moveLeft = false;
	this.moveRight = false;
	clearTimeout(this.gridForwardTimeout);
	clearTimeout(this.gridReverseTimeout);
	clearTimeout(this.gridLeftTimeout);
	clearTimeout(this.gridRightTimeout);
},
//Toggle Speed Change
toggleSpeed: function (){
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
			//Slower Grid Move
			this.gridSpeed = 400;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		} else {
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake Off
			this.moveBrake = false;
			//Faster Grid Move
			this.gridSpeed = 200;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		}
		this.brakeReset = setTimeout(() => {
			//Set reset switch toggle
			this.brakeReady = true;
			clearTimeout(this.brakeReset);
		}, 250);
	}
},
//Long Buffer for Toggling Speed Change
brakeReadBufferLong: function (){
	//This will start the reset timer to allow the brake to be re-engadged
	this.brakeReset = setTimeout(() => {
		this.brakeReady = true;
		clearTimeout(this.brakeReset);
	}, 2250);
},
//Update
update: function () {
	//Locomotion Support
	//Brake Engaged by Default
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay
	this.moveSpeedDefault = 1;
	this.moveSpeedSlow = 0.5;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 500;

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uiid){
		this.ui = document.getElementById(this.data.uiid);
	}
	//Movement Type
	this.movetype = this.data.movetype;

	//Keyboard Controller Event Listeners
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vrHover'){
		//Not Configured
	}
},
//Remove
remove: function () {
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vrHover'){
		//Not Configured
	}
},
//Tick
tick: function (time, timeDelta) {
	//Locomotion Type
	if(this.style === 'free'){
		this.freeStepThrottled();
	} else if(this.style === 'grid'){
		this.gridStepThrottled();
	}

},
//Free Locomotion Tick
freeStep: function (time, timeDelta) {
	if(this.moveBrake){
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedSlow);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedSlow);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedSlow);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedSlow);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedSlow);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedSlow);
		}
	} else {
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedDefault);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedDefault);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedDefault);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedDefault);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedDefault);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedDefault);
		}
	}
},
//Free Locomotion Tick
freeStepPlus: function (time, timeDelta) {

//Not Working
//UpForwardLeft
//UpReverseLeft
//DownForwardRight
//DownReverseRight
	this.movement = '';
	//Up|Down
	if(this.moveUp && this.moveDown){} else {
		if(this.moveUp){
			this.movement += 'Up';
		} else if(this.moveDown){
			this.movement += 'Down';
		}
	}
	//Forward|Reverse
	if(this.moveTo && this.moveBack){} else {
		if(this.moveTo){
			this.movement += 'Forward';
		} else if(this.moveBack){
			this.movement += 'Reverse';
		}
	}
	//Right|Left
	if(this.moveRight && this.moveLeft){} else {
		if(this.moveRight){
			this.movement += 'Right';
		} else if(this.moveLeft){
			this.movement += 'Left';
		}
	}
	console.log(this.movement)

	//Speed
	if(this.moveBrake){
		this.moveFree(this.movement, this.moveSpeedSlow);
	} else {
		this.moveFree(this.movement, this.moveSpeedDefault);
	}
},
//Grid Locomotion Tick
gridStep: function (time, timeDelta) {
	if(this.moveTo || this.moveBack || this.moveRight || this.moveLeft){
		if(this.gridMove){} else {
			this.gridMove = true;
		}
	} else {
		this.gridMove = false;
	}
	if(this.moveTo && this.moveRight) {
		this.move('forwardRight', 0.5);
	} else if(this.moveTo && this.moveLeft) {
		this.move('forwardLeft', 0.5);
	} else if(this.moveBack && this.moveRight) {
		this.move('reverseRight', 0.5);
	} else if(this.moveBack && this.moveLeft) {
		this.move('reverseLeft', 0.5);
	} else if(this.moveTo) {
		this.move('forward', 0.5);
	} else if(this.moveBack) {
		this.move('reverse', 0.5);
	} else if(this.moveRight) {
		this.move('right', 0.5);
	} else if(this.moveLeft) {
		this.move('left', 0.5);
	}

},
//Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},
//Sync Belt UI
uiSync: function () {
	this.elPosVec3New.copy(this.el.object3D.rotation);
	//No Offsets as UI Parent is at 0 0 0
	this.ui.object3D.rotation.copy(this.elPosVec3New);
},
//Move
move: function (direction, speed) {
	if(this.pov === '1st'){
		if(this.axis === 'rotXZ'){
			this.directionXZ(direction, speed);
		}
	} else if(this.pov === '3rd'){
		if(this.axis === 'rotXZ'){
			this.rigXZ(direction, speed);
		}
	}
},
//1st POV Rotat along XZ relative to Camera View
directionXZ: function (action, speed) {
	this.velocity = speed;
	this.cameraVector = new THREE.Vector3();
	this.camera.object3D.getWorldDirection(this.cameraVector);
	this.rotationNew = new THREE.Vector3();
	//Euler
	//this.rotationPlayer.copy(this.player.object3D.rotation);
	this.rotationPlayer = this.player.getAttribute('rotation');
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.cameraVector.x,this.cameraVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x + this.velocity;
			this.rotationNew.z = this.rotationPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x - this.velocity;
			this.rotationNew.z = this.rotationPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x + this.velocity;
			this.rotationNew.z = this.rotationPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x - this.velocity;
			this.rotationNew.z = this.rotationPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x;
			this.rotationNew.z = this.rotationPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x;
			this.rotationNew.z = this.rotationPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x + this.velocity;
			this.rotationNew.z = this.rotationPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.rotationNew.x = this.rotationPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.rotationNew.x = this.rotationPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.rotationNew.x = this.rotationPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.rotationNew.z = this.rotationPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.rotationNew.x = this.rotationPlayer.x - this.velocity;
			this.rotationNew.z = this.rotationPlayer.z;
		}
	}

	this.rotationNew.y = this.rotationPlayer.y;



	//Free Rotation No Collision
	//Euler
	//this.player.object3D.rotation.copy(this.rotationNew);
	this.player.setAttribute('rotation',this.rotationNew)

},
//3rd POV Rotat along XZ
rigXZ: function (action, speed) {
	this.velocity = speed;
	this.rotationNew = new THREE.Vector3();
	//Euler
	//this.rotationAvatar.copy(this.avatar.object3D.rotation);
	this.rotationAvatar = this.avatar.getAttribute('rotation');

	if(action === 'forwardRight'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.z = this.rotationAvatar.z - this.velocity;
	} else if(action === 'forwardLeft'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.z = this.rotationAvatar.z - this.velocity;
	} else if(action === 'reverseRight'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.z = this.rotationAvatar.z + this.velocity;
	} else if(action === 'reverseLeft'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.z = this.rotationAvatar.z + this.velocity;
	} else if(action === 'forward'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.z = this.rotationAvatar.z - this.velocity;
	} else if(action === 'reverse'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.z = this.rotationAvatar.z + this.velocity;
	} else if(action === 'right'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.z = this.rotationAvatar.z;
	} else if(action === 'left'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.z = this.rotationAvatar.z;
	}
	this.rotationNew.y = this.rotationAvatar.y;

	//Free Rotation No Collision
	//Requires Euler
	//this.avatar.object3D.rotation.copy(this.rotationNew);
	this.avatar.setAttribute('rotation',this.rotationNew)
},
//Camera Direction to Spawn Assets In - Unused Currently
userDirection: function (){
	this.userPos = this.player.getAttribute('rotation');
	this.userRot = this.camera.getAttribute('rotation');
	//Check which direction the user is traveling
	if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northWest -x-z
		this.userTravel = 'northWest';
	} else if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southWest -x +z
		this.userTravel = 'southWest';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southEast +x+z
		this.userTravel = 'southEast';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northEast +x-z
		this.userTravel = 'northEast';
	} else {
		//Default
		this.userTravel = 'northEast';
	}
	//After previous to current rotation check, update the previous rotation value to be compared against on the next run cycle
	this.userPreviousPos = this.userPos;

	//If POV Rotation is more then 360 or -360, divide it by sets of 360 to obtain 0-360 degrees to assign from
	if( this.userRot.y > 360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else if(this.userRot.y < -360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else {
		this.userPov = this.userRot.y;
	}
	//Check which direciton the User is facing
	if ((this.userPov > 0 && this.userPov < 15) || (this.userPov > 345 && this.userPov < 360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov > 255 && this.userPov > 285) {
			//East
			this.userView = 'east';
		} else if (this.userPov > 75 && this.userPov < 105) {
			//West
			this.userView = 'west';
		} else if (this.userPov > 165 && this.userPov < 195) {
			//South
			this.userView = 'south';
		} else if ((this.userPov < 0 && this.userPov > -15) || (this.userPov < -345 && this.userPov > -360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov < -255 && this.userPov > -285) {
			//West
			this.userView = 'west';
		} else if (this.userPov < -75 && this.userPov > -105) {
			//East
			this.userView = 'east';
		} else if (this.userPov < -165 && this.userPov > -195) {
			//South
			this.userView = 'south';
		} else if (this.userPov > 15 && this.userPov < 75) {//
			//North West
			this.userView = 'northWest';
	   } else if (this.userPov > 105 && this.userPov < 165) {//
			//South West
			this.userView = 'southWest';
		} else if (this.userPov > 195 && this.userPov < 255) {//
			//South East
			this.userView = 'southEast';
		} else if (this.userPov > 285 && this.userPov < 345) {//
			//North East
			this.userView = 'northEast';
		} else if (this.userPov < -15 && this.userPov > -75 ) {//Negative direction
			//North East
			this.userView = 'northEast';
	   } else if (this.userPov < -105 && this.userPov > -165) {
			//South East
			this.userView = 'southEast';
		} else if (this.userPov < -195 && this.userPov > -255) {
			//South West
			this.userView = 'southWest';
		} else if (this.userPov < -285 && this.userPov > -345) {
			//North West
			this.userView = 'northWest';
		} else {
			this.userView = 'north';
		}
	//Depending on the User's facing direction, spawn in that quadrant
	if(this.userView === "northWest"){// -x -z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x) * -1;
		this.rotationTemp.z = (this.velocity + this.rotationPlayer.z) * -1;
		this.rotationTemp.z += this.rotationPlayer.z;
	} else if(this.userView === "southWest"){// -x +z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x) * -1;
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z);
	} else if(this.userView === "southEast"){// +x +z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x);
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z);
	} else if(this.userView === "northEast"){// +x -z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x);
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z) * -1;
	} else if(this.userView === "north"){// +-x -z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x);
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z) * -1;
	} else if(this.userView === "west"){// -x +-z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x) * -1;
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z);
	} else if(this.userView === "east"){// +x +-z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x);
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z);
	} else if(this.userView === "south"){// +-x +z
		this.rotationTemp.x = (this.velocity + this.rotationPlayer.x);
		this.rotationTemp.z =(this.velocity + this.rotationPlayer.z);
	} else {
		this.rotationTemp.x = 0;
		this.rotationTemp.z = 0;
	}
	this.rotationNew = new THREE.Vector3(this.rotationTemp.x, 0, this.rotationTemp.z);
},

});

//
//Teleportation
//Component for Teleportation Points Object
AFRAME.registerComponent('teleportation',{
dependencies: ['auxl'],
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
init: function(){
	//Prepare Teleport Controls
	if(this.el.classList.contains('teleport')){
		this.el.parentNode.setAttribute('active', 'false');
	} else if(this.el.classList.contains('cancel')){
		this.el.classList.toggle('clickable', false);
		this.el.parentNode.setAttribute('active', 'false');
	}
},
//Instantly Reset All Teleportation Points
resetTeleCircles: function () {
	this.allTeleportors = document.querySelectorAll('.teleporter');
	for (let i= 0; i < this.allTeleportors.length; i++){
		if (this.allTeleportors[i].parentNode.getAttribute('active') === 'true') {
			this.allTeleportors[i].emit('resetInstant',{});
			this.allTeleportors[i].nextSibling.emit('resetInstant',{});
		}
	}
},
//Reset of Teleportation Point
resetInstantEvent: function () {
	if(this.classList.contains('teleport')) {
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')) {
		this.classList.toggle('clickable', false);
		this.parentNode.setAttribute('active', 'false');
	}
},
//Regular Reset of Teleportation Point
resetEvent: function () {
	if(this.classList.contains('teleport')){
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')){
		this.classList.toggle('clickable', false);
		this.parentNode.setAttribute('active', 'false');
	}
},
//Dynamically Teleport to Point Selected
clickToTeleport: function () {
	let element = this;
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = this.parentNode.getAttribute('position');
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;
	//Prepare Player Movement
	function prepMove(element, newPos, telePos){
		//Do an reset on element to not interfer with anim
		//Selected Circle
		element.emit('reset',{});
		//Cancel Circle
		element.nextSibling.emit('reset',{});
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}
	//Instantly Reset All Teleportation Points
	function resetTeleCircles(){
		for(let i= 0; i < allTeleportors.length; i++){
			if(allTeleportors[i].parentNode.getAttribute('active') === 'true') {
				allTeleportors[i].emit('resetInstant',{});
				allTeleportors[i].nextSibling.emit('resetInstant',{});
			}
		}
	}
	//Teleport Control
	if(element.parentNode.getAttribute('active') === 'false') {
		//Allow cancel circle to be viewable and clickable
		element.nextSibling.classList.toggle('clickable', true);
		element.nextSibling.emit('click1',{});
		element.userPov = userView.getAttribute('rotation');
		element.rotationParams = {
			property: 'object3D.rotation.y',
			to: element.userPov.y,
			dur: 500,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		element.parentNode.setAttribute('animation__rotateToUser', element.rotationParams);
		element.parentNode.setAttribute('active', 'true');
	} else {
		//Confirm and Cancel circle are ready to be clicked
		//if Confirm was selected, teleport user and reset properties
		//if Cancel was selcted, reset properties
		if(element.classList.contains('teleport')) {
			//Teleportation Type
			if(teleportType === 'instant') {
				resetTeleCircles();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 250);
			} else if(teleportType === 'fade') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			} else if(teleportType === 'locomotion') {
				//Create locomotion animation based on teleported Pos
				let travelParams = {
					property: 'position',
					from: {x: userPos.x, y: 0, z: userPos.z},
					to: {x: teleportPos.x, y: 0, z: teleportPos.z},
					dur: 1000,
					delay: 0,
					loop: 'false',
					dir: 'normal',
					easing:'easeInOutSine',
					elasticity: 400,
					autoplay: 'true',
					enabled: 'true',
					};
				user.setAttribute('animation__locomotion', travelParams);
				element.nextSibling.emit('reset',{});//cancel circle
				resetTeleCircles();
			} else if(teleportType === 'sphere') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			} else if(teleportType === 'blink') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			}
		} else if (element.classList.contains('cancel')) {
			element.emit('reset',{});
		}
	}
},
update: function () {
	this.el.addEventListener('reset', this.resetEvent);
	this.el.addEventListener('resetInstant', this.resetInstantEvent);
	this.el.addEventListener('click', this.clickToTeleport);
},
remove: function () {
	this.el.removeEventListener('reset', this.resetEvent);
	this.el.removeEventListener('resetInstant', this.resetInstantEvent);
	this.el.removeEventListener('click', this.clickToTeleport);
},
});

//
//Raycast Teleportation
//Add to Clickable Object to Teleport to Raycast Intersection Position
AFRAME.registerComponent('raycast-teleportation-select', {
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported
dependencies: ['auxl'],
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.hoverSelectData = {
	data:'hoverSelectData',
	id:'hoverSelect',
	text: {value:'Teleport Here', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
	geometry: {primitive: 'circle', radius: 0.5, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#3eb58c", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3eb58c", emissiveIntensity: 0.2, side: 'front'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		stare:{twist: true,}
	},
	};
	this.hoverSelect = this.auxl.Core(this.hoverSelectData);

	this.spawned = false;
},
spawnSelect: function (event){
	let teleportPos = event.detail.intersection.point;
	if(this.spawned){
		this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
		this.hoverSelect.DespawnCore();
	}
	this.hoverSelect.core.position.x = teleportPos.x;
	this.hoverSelect.core.position.y = 1;
	this.hoverSelect.core.position.z = teleportPos.z;
	this.hoverSelect.SpawnCore();

	this.clickToTeleportEvent = (event) => {
		this.clickToTeleport(event);
	}
	this.hoverSelect.GetEl().addEventListener('click',this.clickToTeleportEvent);
	this.spawned = true;
},
clickToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = event.detail.intersection.point;
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	//Remove HoverSelect
	this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
	this.hoverSelect.DespawnCore();
	this.spawned = false;

	//Prepare Movement
	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	//Teleportation Based on Player Transition Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 250);
	} else if(teleportType === 'fade') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'locomotion') {
		//Create locomotion animation based on teleported Pos
		let travelParams = {
			property: 'position',
			from: {x: userPos.x, y: 0, z: userPos.z},
			to: {x: teleportPos.x, y: 0, z: teleportPos.z},
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		user.setAttribute('animation__locomotion', travelParams);
	} else if(teleportType === 'sphere') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'blink') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	}
},
update: function () {
	this.spawnSelectEvent = (event) => {
		this.spawnSelect(event);
	}
	this.el.addEventListener('click', this.spawnSelectEvent);

},
remove: function () {
	if(this.spawned){
		this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
		this.hoverSelect.DespawnCore();
	}

	this.el.removeEventListener('click', this.spawnSelectEvent);
},
});
//
//Raycast Teleportation
AFRAME.registerComponent('raycast-teleportation', {
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
init: function () {},
clickToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = event.detail.intersection.point;
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	//Prepare Movement
	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	//Teleportation Based on Player Transition Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 250);
	} else if(teleportType === 'fade') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'locomotion') {
		//Create locomotion animation based on teleported Pos
		let travelParams = {
			property: 'position',
			from: {x: userPos.x, y: 0, z: userPos.z},
			to: {x: teleportPos.x, y: 0, z: teleportPos.z},
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		user.setAttribute('animation__locomotion', travelParams);
	} else if(teleportType === 'sphere') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'blink') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	}
},
update: function () {
	this.raycastTeleport = (event) => {
		this.clickToTeleport(event);
	}
	this.el.addEventListener('click', this.raycastTeleport);
},
remove: function () {
	this.el.removeEventListener('click', this.raycastTeleport);
},
});

//
//Universal Controls
//Customizable Controls and Methods, Defaults for Locomotion and Snap Turning
AFRAME.registerComponent('universal-controls', {
dependencies: ['auxl'],
schema: {
	update: {type: 'number', default: 0},
},
init: function () {

//Controls to Configure for :
//Desktop : Mouse & Keyboard
//Mobile : Touchscreen
//VR Advanced : Dual 6DoF Controllers
//VR Basic : Single 3DoF Button Controller - Need to Finish
//VR Mobile : Headset Only - Need to Add
//Hand Tracking : Dual Hand Movements - Need to Add
//Game Controller - Need To Add

//Control Actions :
//Main Click - Triggers, Mouse Click, Screen Tap
//Alt Click - Grip, Mouse Right Click, HTML Alt
//Directional Movement - Locomotion Joystick, Key WASD/Arrows, HTML Direction Buttons
//Rotational Movement - Headset, Mouse, Gyro
//Action 1 - Button X, Key Q, HTML A
//Action 2 - Button Y, Key E, HTML B
//Action 3 - Button A, Key R, HTML C
//Action 4 - Button B, Key T, HTML D
//Action 5 - Other Joystick Down, Key C, HTML E
//Action 6 - Other Joystick Up, Key V, HTML F
//Action 7 - Other Joystick Left, Key Z, HTML <-
//Action 8 - Other Joystick Right, Key X, HTML ->

this.aScene = document.querySelector('a-scene');
this.auxl = document.querySelector('a-scene').systems.auxl;
//Locomotion Component
this.locomotion;
this.gimbal;
//VR Controllers
this.vrController1;
this.vrController2;

//Gimbal Disabled

//Remappable Desktop Controls
this.controls = {
directionForwardKeys: ['w','W'],
directionLeftKeys: ['a','A'],
directionBackwardKeys: ['s','S'],
directionRightKeys: ['d','D'],
//rotationForwardKeys: ['ArrowUp'],
rotationForwardKeys: [null],
//rotationLeftKeys: ['ArrowLeft'],
rotationLeftKeys: [null],
//rotationBackwardKeys: ['ArrowDown'],
rotationBackwardKeys: [null],
//rotationRightKeys: ['ArrowRight'],
rotationRightKeys: [null],
action1Keys: ['q','Q'],
action2Keys: ['e','E'],
action3Keys: ['r','R'],
action4Keys: ['t','T'],
action5Keys: ['c','C'],
action6Keys: ['v','V'],
action7Keys: ['z','Z'],
action8Keys: ['x','X'],
};
this.auxl.controlConfig = this.controls;

//Mobile HTML Buttons
this.mobileUpLeft = document.getElementById('upLeft');
this.mobileUp = document.getElementById('up');
this.mobileUpRight = document.getElementById('upRight');
this.mobileLeft = document.getElementById('left');
this.mobileCenter = document.getElementById('center');
this.mobileRight = document.getElementById('right');
this.mobileDownLeft = document.getElementById('downLeft');
this.mobileDown = document.getElementById('down');
this.mobileDownRight = document.getElementById('downRight');
this.mobileSelect = document.getElementById('select');
this.mobileStart = document.getElementById('start');
this.mobileA = document.getElementById('a');
this.mobileB = document.getElementById('b');
this.mobileC = document.getElementById('c');
this.mobileD = document.getElementById('d');
this.mobileE = document.getElementById('e');
this.mobileF = document.getElementById('f');
this.mobileL = document.getElementById('l');
this.mobileR = document.getElementById('r');

//Customizable Action Controls
this.altDownFunc = false;
this.altDownParams = false;
this.altUpFunc = false;
this.altUpParams = false;
this.action1DownFunc = false;
this.action1DownParams = false;
this.action1UpFunc = false;
this.action1UpParams = false;
this.action2DownFunc = false;
this.action2DownParams = false;
this.action2UpFunc = false;
this.action2UpParams = false;
this.action3DownFunc = false;
this.action3DownParams = false;
this.action3UpFunc = false;
this.action3UpParams = false;
this.action4DownFunc = false;
this.action4DownParams = false;
this.action4UpFunc = false;
this.action4UpParams = false;
this.action5DownFunc = false;
this.action5DownParams = false;
this.action5UpFunc = false;
this.action5UpParams = false;
this.action6DownFunc = false;
this.action6DownParams = false;
this.action6UpFunc = false;
this.action6UpParams = false;
this.action7DownFunc = false;
this.action7DownParams = false;
this.action7UpFunc = false;
this.action7UpParams = false;
this.action8DownFunc = false;
this.action8DownParams = false;
this.action8UpFunc = false;
this.action8UpParams = false;

//
//Control Events

//Main Click
this.mainClickDetail = {info: 'Main Click', click: null};
this.mainClickEvent = new CustomEvent('mainClick', {
	bubbles: false,
	cancelable: true,
	detail: this.mainClickDetail,
});
//Alt Click
this.altClickDetail = {info: 'Alt Click', click: null};
this.altClickEvent = new CustomEvent('altClick', {
	bubbles: false,
	cancelable: true,
	detail: this.altClickDetail,
});
//Directional Movement
this.directionEventDetail = {info: 'Direction', direction: null};
this.directionEvent = new CustomEvent('direction', {
	bubbles: false,
	cancelable: true,
	detail: this.directionEventDetail,
});
//Rotational Movement
this.rotationEventDetail = {info: 'Rotation', rotation: null};
this.rotationEvent = new CustomEvent('rotation', {
	bubbles: false,
	cancelable: true,
	detail: this.rotationEventDetail,
});
//Action 1
this.action1EventDetail = {info: 'Action 1', action: null};
this.action1Event = new CustomEvent('action1', {
	bubbles: false,
	cancelable: true,
	detail: this.action1EventDetail,
});
//Action 2
this.action2EventDetail = {info: 'Action 2', action: null};
this.action2Event = new CustomEvent('action2', {
	bubbles: false,
	cancelable: true,
	detail: this.action2EventDetail,
});
//Action 3
this.action3EventDetail = {info: 'Action 3', action: null};
this.action3Event = new CustomEvent('action3', {
	bubbles: false,
	cancelable: true,
	detail: this.action3EventDetail,
});
//Action 4
this.action4EventDetail = {info: 'Action 4', action: null};
this.action4Event = new CustomEvent('action4', {
	bubbles: false,
	cancelable: true,
	detail: this.action4EventDetail,
});
//Action 5
this.action5EventDetail = {info: 'Action 5', action: null};
this.action5Event = new CustomEvent('action5', {
	bubbles: false,
	cancelable: true,
	detail: this.action5EventDetail,
});
//Action 6
this.action6EventDetail = {info: 'Action 6', action: null};
this.action6Event = new CustomEvent('action6', {
	bubbles: false,
	cancelable: true,
	detail: this.action6EventDetail,
});
//Action 7
this.action7EventDetail = {info: 'Action 7', action: null};
this.action7Event = new CustomEvent('action7', {
	bubbles: false,
	cancelable: true,
	detail: this.action7EventDetail,
});
//Action 8
this.action8EventDetail = {info: 'Action 8', action: null};
this.action8Event = new CustomEvent('action8', {
	bubbles: false,
	cancelable: true,
	detail: this.action8EventDetail,
});

//Main Click
this.mainClickHit = (e) => {
	this.mainClick(e);
}
this.mainClickE = () => {
	this.mainClickDetail.click = 'click';
	document.dispatchEvent(this.mainClickEvent);
}
this.mainClickDown = () => {
	this.mainClickDetail.click = 'clickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.mainClickUp = () => {
	this.mainClickDetail.click = 'clickUp';
	document.dispatchEvent(this.mainClickEvent);
}

//Alt Click
this.altClickHit = (e) => {
	this.altClick(e);
}
this.altClickDown = () => {
	this.altClickDetail.click = 'altClickHit';
	document.dispatchEvent(this.altClickEvent);
}
this.altClickUp = () => {
	this.altClickDetail.click = 'altClickRelease';
	document.dispatchEvent(this.altClickEvent);
}
this.dispatchAlt = () => {
	document.dispatchEvent(this.altClickEvent);
}

//Directional Movement
this.directionHit = (e) => {
	this.direction(e);
}
//Forward Left
this.directionForwardLeftDown = () => {
	this.directionForwardDown();
	this.directionLeftDown();
}
this.directionForwardLeftUp = () => {
	this.directionForwardUp();
	this.directionLeftUp();
}
//Forward
this.directionForwardDown = () => {
	this.directionEventDetail.direction = 'forwardHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionForwardUp = () => {
	this.directionEventDetail.direction = 'forwardRelease';
	document.dispatchEvent(this.directionEvent);
}
//Forward Right
this.directionForwardRightDown = () => {
	this.directionForwardDown();
	this.directionRightDown();
}
this.directionForwardRightUp = () => {
	this.directionForwardUp();
	this.directionRightUp();
}
//Left
this.directionLeftDown = () => {
	this.directionEventDetail.direction = 'leftHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionLeftUp = () => {
	this.directionEventDetail.direction = 'leftRelease';
	document.dispatchEvent(this.directionEvent);
}
//Backward Left
this.directionBackwardLeftDown = () => {
	this.directionBackwardDown();
	this.directionLeftDown();
}
this.directionBackwardLeftUp = () => {
	this.directionBackwardUp();
	this.directionLeftUp();
}
//Backward
this.directionBackwardDown = () => {
	this.directionEventDetail.direction = 'backwardHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionBackwardUp = () => {
	this.directionEventDetail.direction = 'backwardRelease';
	document.dispatchEvent(this.directionEvent);
}
//Backward Right
this.directionBackwardRightDown = () => {
	this.directionBackwardDown();
	this.directionRightDown();
}
this.directionBackwardRightUp = () => {
	this.directionBackwardUp();
	this.directionRightUp();
}
//Right
this.directionRightDown = () => {
	this.directionEventDetail.direction = 'rightHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionRightUp = () => {
	this.directionEventDetail.direction = 'rightRelease';
	document.dispatchEvent(this.directionEvent);
}

//Rotational Movement
this.rotationHit = (e) => {
	this.rotation(e);
}
/*
this.dispatchRotation = () => {
	document.dispatchEvent(this.rotationEvent);
}
*/
//Forward Left
this.rotationForwardLeftDown = () => {
	this.rotationForwardDown();
	this.rotationLeftDown();
}
this.rotationForwardLeftUp = () => {
	this.rotationForwardUp();
	this.rotationLeftUp();
}
//Forward
this.rotationForwardDown = () => {
	this.rotationEventDetail.rotation = 'forwardHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationForwardUp = () => {
	this.rotationEventDetail.rotation = 'forwardRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Forward Right
this.rotationForwardRightDown = () => {
	this.rotationForwardDown();
	this.rotationRightDown();
}
this.rotationForwardRightUp = () => {
	this.rotationForwardUp();
	this.rotationRightUp();
}
//Left
this.rotationLeftDown = () => {
	this.rotationEventDetail.rotation = 'leftHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationLeftUp = () => {
	this.rotationEventDetail.rotation = 'leftRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Backward Left
this.rotationBackwardLeftDown = () => {
	this.rotationBackwardDown();
	this.rotationLeftDown();
}
this.rotationBackwardLeftUp = () => {
	this.rotationBackwardUp();
	this.rotationLeftUp();
}
//Backward
this.rotationBackwardDown = () => {
	this.rotationEventDetail.rotation = 'backwardHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationBackwardUp = () => {
	this.rotationEventDetail.rotation = 'backwardRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Backward Right
this.rotationBackwardRightDown = () => {
	this.rotationBackwardDown();
	this.rotationRightDown();
}
this.rotationBackwardRightUp = () => {
	this.rotationBackwardUp();
	this.rotationRightUp();
}
//Right
this.rotationRightDown = () => {
	this.rotationEventDetail.rotation = 'rightHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationRightUp = () => {
	this.rotationEventDetail.rotation = 'rightRelease';
	document.dispatchEvent(this.rotationEvent);
}




//Action 1
this.action1Hit = (e) => {
	this.action1(e);
}
this.action1Down = () => {
	this.action1EventDetail.action = 'action1Hit';
	document.dispatchEvent(this.action1Event);
}
this.action1Up = () => {
	this.action1EventDetail.action = 'action1Release';
	document.dispatchEvent(this.action1Event);
}
//Action 2
this.action2Hit = (e) => {
	this.action2(e);
}
this.action2Down = () => {
	this.action2EventDetail.action = 'action2Hit';
	document.dispatchEvent(this.action2Event);
}
this.action2Up = () => {
	this.action2EventDetail.action = 'action2Release';
	document.dispatchEvent(this.action2Event);
}
//Action 3
this.action3Hit = (e) => {
	this.action3(e);
}
this.action3Down = () => {
	this.action3EventDetail.action = 'action3Hit';
	document.dispatchEvent(this.action3Event);
}
this.action3Up = () => {
	this.action3EventDetail.action = 'action3Release';
	document.dispatchEvent(this.action3Event);
}
//Action 4
this.action4Hit = (e) => {
	this.action4(e);
}
this.action4Down = () => {
	this.action4EventDetail.action = 'action4Hit';
	document.dispatchEvent(this.action4Event);
}
this.action4Up = () => {
	this.action4EventDetail.action = 'action4Release';
	document.dispatchEvent(this.action4Event);
}
//Action 5
this.action5Hit = (e) => {
	this.action5(e);
}
this.action5Down = () => {
	this.action5EventDetail.action = 'action5Hit';
	document.dispatchEvent(this.action5Event);
}
this.action5Up = () => {
	this.action5EventDetail.action = 'action5Release';
	document.dispatchEvent(this.action5Event);
}
//Action 6
this.action6Hit = (e) => {
	this.action6(e);
}
this.action6Down = () => {
	this.action6EventDetail.action = 'action6Hit';
	document.dispatchEvent(this.action6Event);
}
this.action6Up = () => {
	this.action6EventDetail.action = 'action6Release';
	document.dispatchEvent(this.action6Event);
}
//Action 7
this.action7Hit = (e) => {
	this.action7(e);
}
this.action7Down = () => {
	this.action7EventDetail.action = 'action7Hit';
	document.dispatchEvent(this.action7Event);
}
this.action7Up = () => {
	this.action7EventDetail.action = 'action7Release';
	document.dispatchEvent(this.action7Event);
}
//Action 8
this.action8Hit = (e) => {
	this.action8(e);
}
this.action8Down = () => {
	this.action8EventDetail.action = 'action8Hit';
	document.dispatchEvent(this.action8Event);
}
this.action8Up = () => {
	this.action8EventDetail.action = 'action8Release';
	document.dispatchEvent(this.action8Event);
}

//
//Keyboard Events
this.keyboardDownHit = (e) => {
	this.keyboardDown(e);
}
this.keyboardUpHit = (e) => {
	this.keyboardUp(e);
}

//
//Blank
this.blankHit = (e) => {
	this.blank(e);
}

//
//Controller Events

//Left
//Main Trigger
this.questLeftMainClickDown = () => {
	this.mainClickDetail.click = 'leftClickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.questLeftMainClickUp = () => {
	this.mainClickDetail.click = 'leftClickUp';
	document.dispatchEvent(this.mainClickEvent);
}
//Secondary Trigger
this.questLeftAltClickDown = () => {
	this.altClickDetail.click = 'leftAltClickDown';
	document.dispatchEvent(this.altClickEvent);
}
this.questLeftAltClickUp = () => {
	this.altClickDetail.click = 'leftAltClickUp';
	document.dispatchEvent(this.altClickEvent);
}
//Joystick
this.questJoystickLocomotionEvent = (e) => {
	if(auxl.joystickLoco === 1){
		//this.questJoystick1Locomotion(e);
	} else if(auxl.joystickLoco === 4){
		this.questJoystick4Locomotion(e);
	} else if(auxl.joystickLoco === 8){
		this.questJoystick8Locomotion(e);
	}
}
//Locomotion Joystick
this.deadzoneLoco = 0.1;
this.xNumLoco = 0;
this.yNumLoco = 0;
this.angleLoco = 0;
this.angleDegLoco = 0;

//Right
//Main Trigger
this.questRightMainClickDown = () => {
	this.mainClickDetail.click = 'rightClickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.questRightMainClickUp = () => {
	this.mainClickDetail.click = 'rightClickUp';
	document.dispatchEvent(this.mainClickEvent);
}
//Secondary Trigger
this.questRightAltClickDown = () => {
	this.altClickDetail.click = 'rightAltClickDown';
	document.dispatchEvent(this.altClickEvent);
}
this.questRightAltClickUp = () => {
	this.altClickDetail.click = 'rightAltClickUp';
	document.dispatchEvent(this.altClickEvent);
}
//Joystick
this.questJoystickOtherEvent = (e) => {
	this.questJoystick4Other(e);
}
//Other Joystick
this.deadzoneOther = 0.1;
this.xNumOther = 0;
this.yNumOther = 0;
this.angleOther = 0;
this.angleDegOther = 0;

//Joystick Rotation
this.questJoystickRotationEvent = (e) => {
	if(auxl.joystickRotation === 1){
		//this.questJoystick1Locomotion(e);
	} else if(auxl.joystickRotation === 4){
		this.questJoystick4Rotation(e);
	} else if(auxl.joystickRotation === 8){
		this.questJoystick8Rotation(e);
	}
}
//Locomotion Joystick
this.deadzoneRot = 0.1;
this.xNumRot = 0;
this.yNumRot = 0;
this.angleRot = 0;
this.angleDegRot = 0;


    },
//Dev Input Display
updateInput: function (input){
	//console.log(input)
	//Enable A-Frame Entity to use below
	//Display Inputs - DEV Testing
	/*
	const displayInput = document.querySelector('#displayInput');
	let displayInputText = {value: 'No Input', color: 'white', align: 'center'}
	displayInputText.value = input;
	displayInput.setAttribute('text',displayInputText);
	*/
},
//Change Action function
updateAction: function (actionObj){
	//console.log(actionObj);
	for(let action in actionObj){
		//console.log(action);//actionName
		//console.log(actionObj[action]);//object
		let actionFunc;
		let actionParams;
		let actionCommand;
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
			actionParams = 'altDownParams';
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
			actionParams = 'altUpParams';
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
			actionParams = 'action1DownParams';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
			actionParams = 'action1UpParams';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
			actionParams = 'action2DownParams';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
			actionParams = 'action2UpParams';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
			actionParams = 'action3DownParams';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
			actionParams = 'action3UpParams';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
			actionParams = 'action4DownParams';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
			actionParams = 'action4UpParams';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
			actionParams = 'action5DownParams';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
			actionParams = 'action5UpParams';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
			actionParams = 'action6DownParams';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
			actionParams = 'action6UpParams';
		} else if(action === 'action7Down'){
			actionFunc = 'action7DownFunc';
			actionParams = 'action7DownParams';
		} else if(action === 'action7Up'){
			actionFunc = 'action7UpFunc';
			actionParams = 'action7UpParams';
		} else if(action === 'action8Down'){
			actionFunc = 'action8DownFunc';
			actionParams = 'action8DownParams';
		} else if(action === 'action8Up'){
			actionFunc = 'action8UpFunc';
			actionParams = 'action8UpParams';
		} else {
			console.log('Failed to identify action')
			return;
		}
		if(actionObj[action]){
			let auxlObj = actionObj[action].auxlObj;
			let component = false;
			if(actionObj[action].component){
				component = actionObj[action].component;
			}
			let func = actionObj[action].func;
			//Assign Parameters if Required
			this[actionParams] = false;
			if(actionObj[action].params){
				this[actionParams] = actionObj[action].params;
			}
			if(component){
				//if component is not auxl, then the object is a dom entity and the component is attached to that object and the func is in that component
				//if component is true, then
//Bind function to the component itself
this[actionFunc] = document.getElementById(auxlObj).components[component][func].bind(document.getElementById(auxlObj).components[component]);
			} else {
				//if component is false, then
				//this.auxl[auxlObj][func]
				this[actionFunc] = this.auxl[auxlObj][func];
			}
			//Update Control Text
			if(actionObj[action].name){
				//this.auxl.controlsInfo[actionObj[action].name] = actionObj[action].info;
				//this.auxl.controlsInfo[action] = {name: actionObj[action].name, info: actionObj[action].info};
				this.auxl.controlsInfo[action] = {name: actionObj[action].name, info: actionObj[action].info};
			}
		} else {
			this[actionFunc] = false;
			this[actionParams] = false;
		}
	}
},
//Disable Action function
disableAction: function (actionObj){
	//console.log(actionObj);
	for(let action in actionObj){
		//console.log(action);//actionName
		//console.log(actionObj[action]);//params
		let actionFunc;
		let actionParams;
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
			actionParams = 'altDownParams';
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
			actionParams = 'altUpParams';
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
			actionParams = 'action1DownParams';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
			actionParams = 'action1UpParams';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
			actionParams = 'action2DownParams';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
			actionParams = 'action2UpParams';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
			actionParams = 'action3DownParams';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
			actionParams = 'action3UpParams';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
			actionParams = 'action4DownParams';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
			actionParams = 'action4UpParams';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
			actionParams = 'action5DownParams';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
			actionParams = 'action5UpParams';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
			actionParams = 'action6DownParams';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
			actionParams = 'action6UpParams';
		} else if(action === 'action7Down'){
			actionFunc = 'action7DownFunc';
			actionParams = 'action7DownParams';
		} else if(action === 'action7Up'){
			actionFunc = 'action7UpFunc';
			actionParams = 'action7UpParams';
		} else if(action === 'action8Down'){
			actionFunc = 'action8DownFunc';
			actionParams = 'action8DownParams';
		} else if(action === 'action8Up'){
			actionFunc = 'action8UpFunc';
			actionParams = 'action8UpParams';
		} else {
			console.log('Failed to identify action')
			console.log(action)
			console.log(actionObj[action])
			return;
		}
		//Update Control Text
		if(actionObj[action].name){
			delete this.auxl.controlsInfo[action];
		}
		this[actionFunc] = false;
		this[actionParams] = false;
	}
},
//Main Click
mainClick: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
},
//Alt Click
altClick: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'altClickHit'){
		if(this.altDownFunc){
			if(this.altDownParams){
				this.altDownFunc(this.altDownParams);
			} else {
				this.altDownFunc();
			}
		}
	} else if(e.detail.action === 'altClickRelease'){
		if(this.altUpFunc){
			if(this.altUpParams){
				this.altUpFunc(this.altUpParams);
			} else {
				this.altUpFunc();
			}
		}
	}
},
//Directional Movement
direction: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	//Direction Movement Unlocked
	if(e.detail.direction === 'forwardHit'){
		this.locomotion.movingForward();
	} else if(e.detail.direction === 'forwardRelease'){
		this.locomotion.cancelForward();
	} else if(e.detail.direction === 'leftHit'){
		this.locomotion.movingLeft();
	} else if(e.detail.direction === 'leftRelease'){
		this.locomotion.cancelLeft();
	} else if(e.detail.direction === 'backwardHit'){
		this.locomotion.movingReverse();
	} else if(e.detail.direction === 'backwardRelease'){
		this.locomotion.cancelReverse();
	} else if(e.detail.direction === 'rightHit'){
		this.locomotion.movingRight();
	} else if(e.detail.direction === 'rightRelease'){
		this.locomotion.cancelRight();
	}
},
//Rotational Movement
rotation: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.rotation === 'forwardHit'){
		this.gimbal.movingForward();
	} else if(e.detail.rotation === 'forwardRelease'){
		this.gimbal.cancelForward();
	} else if(e.detail.rotation === 'leftHit'){
		this.gimbal.movingLeft();
	} else if(e.detail.rotation === 'leftRelease'){
		this.gimbal.cancelLeft();
	} else if(e.detail.rotation === 'backwardHit'){
		this.gimbal.movingReverse();
	} else if(e.detail.rotation === 'backwardRelease'){
		this.gimbal.cancelReverse();
	} else if(e.detail.rotation === 'rightHit'){
		this.gimbal.movingRight();
	} else if(e.detail.rotation === 'rightRelease'){
		this.gimbal.cancelRight();
	} 
},
//Action 1
action1: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action1Hit'){
		if(this.action1DownFunc){
			if(this.action1DownParams){
				this.action1DownFunc(this.action1DownParams);
			} else {
				this.action1DownFunc();
			}
		}
	} else if(e.detail.action === 'action1Release'){
		if(this.action1UpFunc){
			if(this.action1UpParams){
				this.action1UpFunc(this.action1UpParams);
			} else {
				this.action1UpFunc();
			}
		}
	}
},
//Action 2
action2: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action2Hit'){
		if(this.action2DownFunc){
			if(this.action2DownParams){
				this.action2DownFunc(this.action2DownParams);
			} else {
				this.action2DownFunc();
			}
		}
	} else if(e.detail.action === 'action2Release'){
		if(this.action2UpFunc){
			if(this.action2UpParams){
				this.action2UpFunc(this.action2UpParams);
			} else {
				this.action2UpFunc();
			}
		}
	}
},
//Action 3
action3: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action3Hit'){
		if(this.action3DownFunc){
			if(this.action3DownParams){
				this.action3DownFunc(this.action3DownParams);
			} else {
				this.action3DownFunc();
			}
		}
	} else if(e.detail.action === 'action3Release'){
		if(this.action3UpFunc){
			if(this.action3UpParams){
				this.action3UpFunc(this.action3UpParams);
			} else {
				this.action3UpFunc();
			}
		}
	}
},
//Action 4
action4: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action4Hit'){
		if(this.action4DownFunc){
			if(this.action4DownParams){
				this.action4DownFunc(this.action4DownParams);
			} else {
				this.action4DownFunc();
			}
		}
	} else if(e.detail.action === 'action4Release'){
		if(this.action4UpFunc){
			if(this.action4UpParams){
				this.action4UpFunc(this.action4UpParams);
			} else {
				this.action4UpFunc();
			}
		}
	}
},
//Action 5
action5: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action5Hit'){
		if(this.action5DownFunc){
			if(this.action5DownParams){
				this.action5DownFunc(this.action5DownParams);
			} else {
				this.action5DownFunc();
			}
		}
	} else if(e.detail.action === 'action5Release'){
		if(this.action5UpFunc){
			if(this.action5UpParams){
				this.action5UpFunc(this.action5UpParams);
			} else {
				this.action5UpFunc();
			}
		}
	}
},
//Action 6
action6: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action6Hit'){
		if(this.action6DownFunc){
			if(this.action6DownParams){
				this.action6DownFunc(this.action6DownParams);
			} else {
				this.action6DownFunc();
			}
		}
	} else if(e.detail.action === 'action6Release'){
		if(this.action6UpFunc){
			if(this.action6UpParams){
				this.action6UpFunc(this.action6UpParams);
			} else {
				this.action6UpFunc();
			}
		}
	}
},
//Action 7
action7: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action7Hit'){
		if(this.action7DownFunc){
			if(this.action7DownParams){
				this.action7DownFunc(this.action7DownParams);
			} else {
				this.action7DownFunc();
			}
		}
	} else if(e.detail.action === 'action7Release'){
		if(this.action7UpFunc){
			if(this.action7UpParams){
				this.action7UpFunc(this.action7UpParams);
			} else {
				this.action7UpFunc();
			}
		}
	}
},
//Action 8
action8: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action8Hit'){
		if(this.action8DownFunc){
			if(this.action8DownParams){
				this.action8DownFunc(this.action8DownParams);
			} else {
				this.action8DownFunc();
			}
		}
	} else if(e.detail.action === 'action8Release'){
		if(this.action8UpFunc){
			if(this.action8UpParams){
				this.action8UpFunc(this.action8UpParams);
			} else {
				this.action8UpFunc();
			}
		}
	}
},
//Keyboard Controls
keyboardDown: function (e){
	if(this.controls.directionForwardKeys.includes(e.key)) {
		//Direction : Forward
		this.directionForwardDown();
	} else if(this.controls.directionLeftKeys.includes(e.key)){
		//Direction : Left
		this.directionLeftDown();
	} else if(this.controls.directionBackwardKeys.includes(e.key)){
		//Direction : Backward
		this.directionBackwardDown();
	} else if(this.controls.directionRightKeys.includes(e.key)){
		//Direction : Right
		this.directionRightDown();
	} else if(this.controls.rotationForwardKeys.includes(e.key)) {
		//Rotation : Forward
		this.rotationForwardDown();
	} else if(this.controls.rotationLeftKeys.includes(e.key)){
		//Rotation : Left
		this.rotationLeftDown();
	} else if(this.controls.rotationBackwardKeys.includes(e.key)){
		//Rotation : Backward
		this.rotationBackwardDown();
	} else if(this.controls.rotationRightKeys.includes(e.key)){
		//Rotation : Right
		this.rotationRightDown();
	} else if(this.controls.action1Keys.includes(e.key)){
		//Action 1
		this.action1Down();
	} else if(this.controls.action2Keys.includes(e.key)){
		//Action 2
		this.action2Down();
	} else if(this.controls.action3Keys.includes(e.key)){
		//Action 3
		this.action3Down();
	} else if(this.controls.action4Keys.includes(e.key)){
		//Action 4
		this.action4Down();
	} else if(this.controls.action5Keys.includes(e.key)){
		//Action 5
		this.action5Down();
	} else if(this.controls.action6Keys.includes(e.key)){
		//Action 6
		this.action6Down();
	} else if(this.controls.action7Keys.includes(e.key)){
		//Action 7
		this.action7Down();
	} else if(this.controls.action8Keys.includes(e.key)){
		//Action 8
		this.action8Down();
	}

},
keyboardUp: function (e){
	if(this.controls.directionForwardKeys.includes(e.key)) {
		//Direction : Forward
		this.directionForwardUp();
	} else if(this.controls.directionLeftKeys.includes(e.key)){
		//Direction : Left
		this.directionLeftUp();
	} else if(this.controls.directionBackwardKeys.includes(e.key)){
		//Direction : Backward
		this.directionBackwardUp();
	} else if(this.controls.directionRightKeys.includes(e.key)){
		//Direction : Right
		this.directionRightUp();
	} else if(this.controls.rotationForwardKeys.includes(e.key)) {
		//Rotation : Forward
		this.rotationForwardUp();
	} else if(this.controls.rotationLeftKeys.includes(e.key)){
		//Rotation : Left
		this.rotationLeftUp();
	} else if(this.controls.rotationBackwardKeys.includes(e.key)){
		//Rotation : Backward
		this.rotationBackwardUp();
	} else if(this.controls.rotationRightKeys.includes(e.key)){
		//Rotation : Right
		this.rotationRightUp();
	} else if(this.controls.action1Keys.includes(e.key)){
		//Action 1
		this.action1Up();
	} else if(this.controls.action2Keys.includes(e.key)){
		//Action 2
		this.action2Up();
	} else if(this.controls.action3Keys.includes(e.key)){
		//Action 3
		this.action3Up();
	} else if(this.controls.action4Keys.includes(e.key)){
		//Action 4
		this.action4Up();
	} else if(this.controls.action5Keys.includes(e.key)){
		//Action 5
		this.action5Up();
	} else if(this.controls.action6Keys.includes(e.key)){
		//Action 6
		this.action6Up();
	} else if(this.controls.action7Keys.includes(e.key)){
		//Action 7
		this.action7Up();
	} else if(this.controls.action8Keys.includes(e.key)){
		//Action 8
		this.action8Up();
	}
},
//Joystick 4 Locomotion
questJoystick4Locomotion: function (e){
	//Update this.locomotion.func into this.directionEvent
	this.xNumLoco = e.detail.x;
	this.yNumLoco = e.detail.y;
	this.angleLoco = Math.atan2(this.xNumLoco,this.yNumLoco);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegLoco = radToDeg(this.angleLoco);

	if(this.yNumLoco < this.deadzoneLoco && this.yNumLoco > this.deadzoneLoco*-1 && this.xNumLoco > this.deadzoneLoco*-1 && this.xNumLoco < this.deadzoneLoco){
		this.locomotion.clearMovement();
		this.updateInput('Locomotion Clear');
	} else if(this.yNumLoco > this.deadzoneLoco || this.yNumLoco < this.deadzoneLoco*-1 || this.xNumLoco < this.deadzoneLoco*-1 || this.xNumLoco > this.deadzoneLoco) {
		if(this.angleDegLoco > -45 && this.angleDegLoco < 45){
			//Backward : -45 -> 45
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			//this.updateInput('Backward');
		} else if(this.angleDegLoco > 45 && this.angleDegLoco < 135){
			//Right : 45 -> 135
			this.locomotion.clearMovement();
			this.locomotion.movingRight();
			//this.updateInput('Right');
		} else if(this.angleDegLoco > 135 || this.angleDegLoco < -135){
			//Forward : 135 -> 180 or -135 -> -180
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			//this.updateInput('Forward');
		} else if(this.angleDegLoco < -45 && this.angleDegLoco > -135){
			//Left : -45 -> -135
			this.locomotion.clearMovement();
			this.locomotion.movingLeft();
			//this.updateInput('Left');
		}
	} else {
		this.locomotion.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 8 Locomotion
questJoystick8Locomotion: function (e){
	//Update this.locomotion.func into this.directionEvent
	this.xNumLoco = e.detail.x;
	this.yNumLoco = e.detail.y;
	this.angleLoco = Math.atan2(this.xNumLoco,this.yNumLoco);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegLoco = radToDeg(this.angleLoco);

	if(this.yNumLoco < this.deadzoneLoco && this.yNumLoco > this.deadzoneLoco*-1 && this.xNumLoco > this.deadzoneLoco*-1 && this.xNumLoco < this.deadzoneLoco){
		this.locomotion.clearMovement();
		this.updateInput('Locomotion Clear');
	} else if(this.yNumLoco > this.deadzoneLoco || this.yNumLoco < this.deadzoneLoco*-1 || this.xNumLoco < this.deadzoneLoco*-1 || this.xNumLoco > this.deadzoneLoco) {
		if(this.angleDegLoco > -22.5 && this.angleDegLoco < 22.5){
			//Backward : -22.5 -> 22.5
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			//this.updateInput('Backward');
		} else if(this.angleDegLoco > 22.5 && this.angleDegLoco < 67.5){
			//BackwardRight : 22.5 -> 67.5
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			this.locomotion.movingRight();
			//this.updateInput('Backward Right');
		} else if(this.angleDegLoco > 67.5 && this.angleDegLoco < 112.5){
			//Right : 67.5 -> 112.5
			this.locomotion.clearMovement();
			this.locomotion.movingRight();
			//this.updateInput('Right');
		} else if(this.angleDegLoco > 112.5 && this.angleDegLoco < 157.5){
			//ForwardRight : 112.5 -> 157.5
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			this.locomotion.movingRight();
			//this.updateInput('Forward Right');
		} else if(this.angleDegLoco > 157.5 || this.angleDegLoco < -157.5){
			//Forward : 157.5 -> 180 or -157.5 -> -180
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			//this.updateInput('Forward');
		} else if(this.angleDegLoco < -112.5 && this.angleDegLoco > -157.5){
			//ForwardLeft: -112.5 -> -157.5
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			this.locomotion.movingLeft();
			//this.updateInput('Forward Left');
		} else if(this.angleDegLoco < -67.5 && this.angleDegLoco > -112.5){
			//Left : -67.5 -> -112.5
			this.locomotion.clearMovement();
			this.locomotion.movingLeft();
			//this.updateInput('Left');
		} else if(this.angleDegLoco < -22.5 && this.angleDegLoco > -67.5){
			//BackwardLeft: -22.5 -> -67.5 
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			this.locomotion.movingLeft();
			//this.updateInput('Backward Left');
		}
	} else {
		this.locomotion.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 4 Rotation
questJoystick4Rotation: function (e){
	//Update this.gimbal.func into this.rotationEvent
	this.xNumRot = e.detail.x;
	this.yNumRot = e.detail.y;
	this.angleRot = Math.atan2(this.xNumRot,this.yNumRot);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegRot = radToDeg(this.angleRot);

	if(this.yNumRot < this.deadzoneRot && this.yNumRot > this.deadzoneRot*-1 && this.xNumRot > this.deadzoneRot*-1 && this.xNumRot < this.deadzoneRot){
		this.gimbal.clearMovement();
		this.updateInput('Rotation Clear');
	} else if(this.yNumRot > this.deadzoneRot || this.yNumRot < this.deadzoneRot*-1 || this.xNumRot < this.deadzoneRot*-1 || this.xNumRot > this.deadzoneRot) {
		if(this.angleDegRot > -45 && this.angleDegRot < 45){
			//Backward : -45 -> 45
			this.gimbal.clearMovement();
			this.gimbal.movingReverse();
			//this.updateInput('Backward');
		} else if(this.angleDegRot > 45 && this.angleDegRot < 135){
			//Right : 45 -> 135
			this.gimbal.clearMovement();
			this.gimbal.movingRight();
			//this.updateInput('Right');
		} else if(this.angleDegRot > 135 || this.angleDegRot < -135){
			//Forward : 135 -> 180 or -135 -> -180
			this.gimbal.clearMovement();
			this.gimbal.movingForward();
			//this.updateInput('Forward');
		} else if(this.angleDegRot < -45 && this.angleDegRot > -135){
			//Left : -45 -> -135
			this.gimbal.clearMovement();
			this.gimbal.movingLeft();
			//this.updateInput('Left');
		}
	} else {
		this.gimbal.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 8 Rotation
questJoystick8Rotation: function (e){
	//Update this.gimbal.func into this.rotationEvent
	this.xNumRot = e.detail.x;
	this.yNumRot = e.detail.y;
	this.angleRot = Math.atan2(this.xNumRot,this.yNumRot);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegRot = radToDeg(this.angleRot);

	if(this.yNumRot < this.deadzoneRot && this.yNumRot > this.deadzoneRot*-1 && this.xNumRot > this.deadzoneRot*-1 && this.xNumRot < this.deadzoneRot){
		this.gimbal.clearMovement();
		this.updateInput('Rotation Clear');
	} else if(this.yNumRot > this.deadzoneRot || this.yNumRot < this.deadzoneRot*-1 || this.xNumRot < this.deadzoneRot*-1 || this.xNumRot > this.deadzoneRot) {
		if(this.angleDegRot > -22.5 && this.angleDegRot < 22.5){
			//Backward : -22.5 -> 22.5
			this.gimbal.clearMovement();
			this.gimbal.movingReverse();
			//this.updateInput('Backward');
		} else if(this.angleDegRot > 22.5 && this.angleDegRot < 67.5){
			//BackwardRight : 22.5 -> 67.5
			this.gimbal.clearMovement();
			this.gimbal.movingReverse();
			this.gimbal.movingRight();
			//this.updateInput('Backward Right');
		} else if(this.angleDegRot > 67.5 && this.angleDegRot < 112.5){
			//Right : 67.5 -> 112.5
			this.gimbal.clearMovement();
			this.gimbal.movingRight();
			//this.updateInput('Right');
		} else if(this.angleDegRot > 112.5 && this.angleDegRot < 157.5){
			//ForwardRight : 112.5 -> 157.5
			this.gimbal.clearMovement();
			this.gimbal.movingForward();
			this.gimbal.movingRight();
			//this.updateInput('Forward Right');
		} else if(this.angleDegRot > 157.5 || this.angleDegRot < -157.5){
			//Forward : 157.5 -> 180 or -157.5 -> -180
			this.gimbal.clearMovement();
			this.gimbal.movingForward();
			//this.updateInput('Forward');
		} else if(this.angleDegRot < -112.5 && this.angleDegRot > -157.5){
			//ForwardLeft: -112.5 -> -157.5
			this.gimbal.clearMovement();
			this.gimbal.movingForward();
			this.gimbal.movingLeft();
			//this.updateInput('Forward Left');
		} else if(this.angleDegRot < -67.5 && this.angleDegRot > -112.5){
			//Left : -67.5 -> -112.5
			this.gimbal.clearMovement();
			this.gimbal.movingLeft();
			//this.updateInput('Left');
		} else if(this.angleDegRot < -22.5 && this.angleDegRot > -67.5){
			//BackwardLeft: -22.5 -> -67.5 
			this.gimbal.clearMovement();
			this.gimbal.movingReverse();
			this.gimbal.movingLeft();
			//this.updateInput('Backward Left');
		}
	} else {
		this.gimbal.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 4 Other
questJoystick4Other: function (e){
	this.xNumOther = e.detail.x;
	this.yNumOther = e.detail.y;
	this.angleOther = Math.atan2(this.xNumOther,this.yNumOther);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegOther = radToDeg(this.angleOther);

	if(this.yNumOther < this.deadzoneOther && this.yNumOther > this.deadzone*-1 && this.xNumOther > this.deadzoneOther*-1 && this.xNumOther < this.deadzoneOther){
		this.updateInput('Rotation|Duck Clear');
	} else if(this.yNumOther > this.deadzoneOther || this.yNumOther < this.deadzoneOther*-1 || this.xNumOther < this.deadzoneOther*-1 || this.xNumOther > this.deadzoneOther) {
		if(this.angleDegOther > -45 && this.angleDegOther < 45){
			//Backward : -45 -> 45
			//this.updateInput('Duck');
			this.action5Down();
		} else if(this.angleDegOther > 45 && this.angleDegOther < 135){
			//Right : 45 -> 135
			//this.updateInput('Rotate Right');
			//this.snapRightHit();
			this.action7Down();
		} else if(this.angleDegOther > 135 || this.angleDegOther < -135){
			//Forward : 135 -> 180 or -135 -> -180
			//this.updateInput('Stand');
			this.action6Down();
		} else if(this.angleDegOther < -45 && this.angleDegOther > -135){
			//Left : -45 -> -135
			//this.updateInput('Rotate Left');
			//this.snapLeftHit();
			this.action8Down();
		}
	} else {
		//this.updateInput('Rotation|Duck Clear');
	}
},
//Temp Blank
blank: function (e){
	console.log(e);
	//this.updateInput('Blank Button');
},
update: function () {

	//Universal Events
	document.addEventListener('mainClick', this.mainClickHit);
	document.addEventListener('altClick', this.altClickHit);
	document.addEventListener('direction', this.directionHit);
	document.addEventListener('rotation', this.rotationHit);
	document.addEventListener('action1', this.action1Hit);
	document.addEventListener('action2', this.action2Hit);
	document.addEventListener('action3', this.action3Hit);
	document.addEventListener('action4', this.action4Hit);
	document.addEventListener('action5', this.action5Hit);
	document.addEventListener('action6', this.action6Hit);
	document.addEventListener('action7', this.action7Hit);
	document.addEventListener('action8', this.action8Hit);

	//Desktop
	document.addEventListener('click', this.mainClickE);
	document.addEventListener('contextmenu', this.dispatchAlt);
	document.addEventListener('keydown', this.keyboardDownHit);
	document.addEventListener('keyup', this.keyboardUpHit);

	//Joystick Locomotion
	this.questJoystickLocomotionEvent = (e) => {
		if(auxl.joystickLoco === 1){
			//this.questJoystick1Locomotion(e);
		} else if(auxl.joystickLoco === 4){
			this.questJoystick4Locomotion(e);
		} else if(auxl.joystickLoco === 8){
			this.questJoystick8Locomotion(e);
		}
	}

	//Joystick Rotation
	this.questJoystickRotationEvent = (e) => {
		if(auxl.joystickRotation === 1){
			//this.questJoystick1Locomotion(e);
		} else if(auxl.joystickRotation === 4){
			this.questJoystick4Rotation(e);
		} else if(auxl.joystickRotation === 8){
			this.questJoystick8Rotation(e);
		}
	}

//Allow elements to spawn before grabbing/assigning
let initTimeout = setTimeout(() => {

	//Locomotion Component
	this.locomotion = document.getElementById('playerRig').components.locomotion;

	//Gimbal Component
	this.gimbal = document.getElementById('playerRig').components.gimbal;	

	//Quest
	this.vrController1 = document.getElementById('vrController1');
	this.vrController2 = document.getElementById('vrController2');

	//Left
	//Main Trigger
	this.vrController1.addEventListener('triggerdown', this.questLeftMainClickDown);
	this.vrController1.addEventListener('triggerup', this.questLeftMainClickUp);
	//Secondary Trigger
	this.vrController1.addEventListener('gripdown', this.questLeftAltClickDown);
	this.vrController1.addEventListener('gripup', this.questLeftAltClickUp);
	//Button 1 (X)
	this.vrController1.addEventListener('xbuttondown', this.action1Down);
	this.vrController1.addEventListener('xbuttonup', this.action1Up);
	//Button 2 (Y)
	this.vrController1.addEventListener('ybuttondown', this.action2Down);
	this.vrController1.addEventListener('ybuttonup', this.action2Up);

	//Right
	//Main Trigger
	this.vrController2.addEventListener('triggerdown', this.questRightMainClickDown);
	this.vrController2.addEventListener('triggerup', this.questRightMainClickUp);
	//Secondary Trigger
	this.vrController2.addEventListener('gripdown', this.questRightAltClickDown);
	this.vrController2.addEventListener('gripup', this.questRightAltClickUp);
	//Button 1 (A)
	this.vrController2.addEventListener('abuttondown', this.action3Down);
	this.vrController2.addEventListener('abuttonup', this.action3Up);
	//Button 2 (B)
	this.vrController2.addEventListener('bbuttondown', this.action4Down);
	this.vrController2.addEventListener('bbuttonup', this.action4Up);

	//Joysticks
	if(this.auxl.vrHand === 'bothRight' || this.auxl.vrHand === 'bothLeftLoco'){
		//Left Locomotion
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		//this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickRotationEvent);
	} else if(this.auxl.vrHand === 'bothLeft' || this.auxl.vrHand === 'bothRightLoco'){
		//Right Locomotion
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Left Other
		//this.vrController1.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickRotationEvent);
	} else {
		//Left Locomotion
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		//this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickRotationEvent);
	}
}, 100);


	//Mobile
	this.mobileUpLeft.addEventListener('touchstart', this.directionForwardLeftDown);
	this.mobileUpLeft.addEventListener('touchend', this.directionForwardLeftUp);
	this.mobileUp.addEventListener('touchstart', this.directionForwardDown);
	this.mobileUp.addEventListener('touchend', this.directionForwardUp);
	this.mobileUpRight.addEventListener('touchstart', this.directionForwardRightDown);
	this.mobileUpRight.addEventListener('touchend', this.directionForwardRightUp);
	this.mobileLeft.addEventListener('touchstart', this.directionLeftDown);
	this.mobileLeft.addEventListener('touchend', this.directionLeftUp);
	this.mobileCenter.addEventListener('touchstart', this.blankHit);
	this.mobileCenter.addEventListener('touchend', this.blankHit);
	this.mobileRight.addEventListener('touchstart', this.directionRightDown);
	this.mobileRight.addEventListener('touchend', this.directionRightUp);
	this.mobileDownLeft.addEventListener('touchstart', this.directionBackwardLeftDown);
	this.mobileDownLeft.addEventListener('touchend', this.directionBackwardLeftUp);
	this.mobileDown.addEventListener('touchstart', this.directionBackwardDown);
	this.mobileDown.addEventListener('touchend', this.directionBackwardUp);
	this.mobileDownRight.addEventListener('touchstart', this.directionBackwardRightDown);
	this.mobileDownRight.addEventListener('touchend', this.directionBackwardRightUp);
	this.mobileSelect.addEventListener('touchstart', this.blankHit);
	//this.mobileSelect.addEventListener('touchend', this.blankHit);
	this.mobileStart.addEventListener('touchstart', this.blankHit);
	//this.mobileStart.addEventListener('touchend', this.blankHit);
	this.mobileA.addEventListener('touchstart', this.action1Down);
	this.mobileA.addEventListener('touchend', this.action1Up);
	this.mobileB.addEventListener('touchstart', this.action2Down);
	this.mobileB.addEventListener('touchend', this.action2Up);
	this.mobileC.addEventListener('touchstart', this.action3Down);
	this.mobileC.addEventListener('touchend', this.action3Up);
	this.mobileD.addEventListener('touchstart', this.action4Down);
	this.mobileD.addEventListener('touchend', this.action4Up);
	this.mobileE.addEventListener('touchstart', this.action5Down);
	this.mobileE.addEventListener('touchend', this.action5Up);
	this.mobileF.addEventListener('touchstart', this.action6Down);
	this.mobileF.addEventListener('touchend', this.action6Up);
	this.mobileL.addEventListener('touchstart', this.action7Down);
	this.mobileL.addEventListener('touchend', this.action7Up);
	this.mobileR.addEventListener('touchstart', this.action8Down);
	this.mobileR.addEventListener('touchend', this.action8Up);


	//document.addEventListener('mousedown', this.mainClickDown);
	//document.addEventListener('mouseup', this.mainClickUp);
	//Both the mouseCursor and Canvas element fire mousedown and mouseup resulting in 2 events firing at the same time
	/*
	mousedown { target: a-entity#mouseCursor, isTrusted: false, detail: {…}, srcElement: a-entity#mouseCursor, currentTarget: HTMLDocument http://localhost/auxl/test.html, eventPhase: 3, bubbles: true, cancelable: false, returnValue: true, defaultPrevented: false, … }

	mousedown { target: canvas.a-canvas.a-grab-cursor, buttons: 1, clientX: 1245, clientY: 326, layerX: 1245, layerY: 326 }

		document.addEventListener('mousedown', function(e){
			//e.stopImmediatePropagation();
			//e.stopPropagation();
			//e.preventDefault();
			console.log('Mouse Down')
		});
	*/

},
remove: function () {

	//Universal Events
	document.removeEventListener('mainClick', this.mainClickHit);
	document.removeEventListener('altClick', this.altClickHit);
	document.removeEventListener('direction', this.directionHit);
	document.removeEventListener('rotation', this.rotationHit);
	document.removeEventListener('action1', this.action1Hit);
	document.removeEventListener('action2', this.action2Hit);
	document.removeEventListener('action3', this.action3Hit);
	document.removeEventListener('action4', this.action4Hit);
	document.removeEventListener('action5', this.action5Hit);
	document.removeEventListener('action6', this.action6Hit);
	document.removeEventListener('action7', this.action7Hit);
	document.removeEventListener('action8', this.action8Hit);
	//Desktop
	document.removeEventListener('click', this.mainClickE);
	document.removeEventListener('contextmenu', this.dispatchAlt);
	document.removeEventListener('keydown', this.keyboardDownHit);
	document.removeEventListener('keyup', this.keyboardUpHit);

	//VR Controllers
	this.vrController1.removeEventListener('triggerdown', this.questLeftMainClickDown);
	this.vrController1.removeEventListener('triggerup', this.questLeftMainClickUp);
	this.vrController1.removeEventListener('gripdown', this.questLeftAltClickDown);
	this.vrController1.removeEventListener('gripup', this.questLeftAltClickUp);
	this.vrController1.removeEventListener('xbuttondown', this.action1Down);
	this.vrController1.removeEventListener('xbuttonup', this.action1Up);
	this.vrController1.removeEventListener('ybuttondown', this.action2Down);
	this.vrController1.removeEventListener('ybuttonup', this.action2Up);
	this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
	this.vrController2.removeEventListener('triggerdown', this.questRightMainClickDown);
	this.vrController2.removeEventListener('triggerup', this.questRightMainClickUp);
	this.vrController2.removeEventListener('gripdown', this.questRightAltClickDown);
	this.vrController2.removeEventListener('gripup', this.questRightAltClickUp);
	this.vrController2.removeEventListener('abuttondown', this.action3Down);
	this.vrController2.removeEventListener('abuttonup', this.action3Up);
	this.vrController2.removeEventListener('bbuttondown', this.action4Down);
	this.vrController2.removeEventListener('bbuttonup', this.action4Up);
	this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	//Joysticks
	if(this.auxl.vrHand === 'bothRight' || this.auxl.vrHand === 'bothLeftLoco'){
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else if(this.auxl.vrHand === 'bothLeft' || this.auxl.vrHand === 'bothRightLoco'){
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else {
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	}

	//Mobile
	this.mobileUpLeft.removeEventListener('mousedown', this.directionForwardLeftDown);
	this.mobileUpLeft.removeEventListener('mouseup', this.directionForwardLeftUp);
	this.mobileUp.removeEventListener('mousedown', this.directionForwardDown);
	this.mobileUp.removeEventListener('mouseup', this.directionForwardUp);
	this.mobileUpRight.removeEventListener('mousedown', this.directionForwardRightDown);
	this.mobileUpRight.removeEventListener('mouseup', this.directionForwardRightUp);
	this.mobileLeft.removeEventListener('mousedown', this.directionLeftDown);
	this.mobileLeft.removeEventListener('mouseup', this.directionLeftUp);
	this.mobileCenter.removeEventListener('mousedown', this.blankHit);
	this.mobileCenter.removeEventListener('mouseup', this.blankHit);
	this.mobileRight.removeEventListener('mousedown', this.directionRightDown);
	this.mobileRight.removeEventListener('mouseup', this.directionRightUp);
	this.mobileDownLeft.removeEventListener('mousedown', this.directionBackwardLeftDown);
	this.mobileDownLeft.removeEventListener('mouseup', this.directionBackwardLeftUp);
	this.mobileDown.removeEventListener('mousedown', this.directionBackwardDown);
	this.mobileDown.removeEventListener('mouseup', this.directionBackwardUp);
	this.mobileDownRight.removeEventListener('mousedown', this.directionBackwardRightDown);
	this.mobileDownRight.removeEventListener('mouseup', this.directionBackwardRightUp);
	this.mobileSelect.removeEventListener('mousedown', this.blankHit);
	//this.mobileSelect.removeEventListener('mouseup', this.blankHit);
	this.mobileStart.removeEventListener('mousedown', this.blankHit);
	//this.mobileStart.removeEventListener('mouseup', this.blankHit);
	this.mobileA.removeEventListener('mousedown', this.action1Down);
	this.mobileA.removeEventListener('mouseup', this.action1Up);
	this.mobileB.removeEventListener('mousedown', this.action2Down);
	this.mobileB.removeEventListener('mouseup', this.action2Up);
	this.mobileC.removeEventListener('mousedown', this.action3Down);
	this.mobileC.removeEventListener('mouseup', this.action3Up);
	this.mobileD.removeEventListener('mousedown', this.action4Down);
	this.mobileD.removeEventListener('mouseup', this.action4Up);
	this.mobileE.removeEventListener('mousedown', this.action5Down);
	this.mobileE.removeEventListener('mouseup', this.action5Up);
	this.mobileF.removeEventListener('mousedown', this.action6Down);
	this.mobileF.removeEventListener('mouseup', this.action6Up);
	this.mobileL.removeEventListener('touchstart', this.action7Down);
	this.mobileL.removeEventListener('touchend', this.action7Up);
	this.mobileR.removeEventListener('touchstart', this.action8Down);
	this.mobileR.removeEventListener('touchend', this.action8Up);
},
});

//
//External Components
//

//
//threeColorGradientShader shader - https://github.com/tlaukkan/aframe-three-color-gradient-shader
/**/
AFRAME.registerShader('threeColorGradientShader', {
    schema: {
        topColor: {type: 'color', default: '1 0 0', is: 'uniform'},
        middleColor: {type: 'color', default: '0 1 0', is: 'uniform'},
        bottomColor: {type: 'color', default: '0 0 1', is: 'uniform'}
    },

    vertexShader: [
        'varying vec3 vWorldPosition;',
        'void main() {',
        ' vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
        ' vWorldPosition = worldPosition.xyz;',
        ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );',
        '}'
    ].join('\n'),

    fragmentShader: [
        'uniform vec3 bottomColor;',
        'uniform vec3 middleColor;',
        'uniform vec3 topColor;',
        'uniform float offset;',
        'varying vec3 vWorldPosition;',
        'void main() {',
        ' float h = normalize( vWorldPosition ).y;',
        ' if (h>0.0) {',
        '   gl_FragColor = vec4( mix( middleColor, topColor, max( pow( max(h, 0.0 ), 0.8 ), 0.0 ) ), 1.0 );',
        ' } else {',
        '   gl_FragColor = vec4( mix( middleColor, bottomColor, max( pow( max(-h, 0.0 ), 0.8 ), 0.0 ) ), 1.0 );',
        ' }',
        '}'
    ].join('\n')
});