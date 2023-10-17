//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Material
//
//gltfmat
//modifyMaterials

//
//Altering GLTF Materials
const gltfmat = AFRAME.registerComponent('gltfmat', {
dependencies: ['auxl'],
schema: {
	colors: {type: 'array', default: [false]},
	emissives: {type: 'array', default: [false]},
	opacities: {type: 'array', default: [false]},
	textures: {type: 'array', default: [false]},
	repeats: {type: 'array', default: [false]},
	random: {type: 'boolean', default: false},
},
	update: function () {
		//AUXL System
		this.auxl = document.querySelector('a-scene').systems.auxl;
		//Mesh Name
		this.meshName = false;
		this.current = 0;
		this.materials = [];
		this.data.colors.forEach(color => {
			//Color
			if(color){
				//Base Color
				if(color === 'random'){
					this.materials[this.current] = new THREE.MeshStandardMaterial({color: this.auxl.colorTheoryGen().base});
				} else {
					this.materials[this.current] = new THREE.MeshStandardMaterial({color});
				}
				//Emissive
				if(this.data.emissives[this.current]){
					this.materials[this.current].emissive = this.materials[this.current].color;
					this.materials[this.current].emissiveIntensity = this.data.emissives[this.current];
				}
				//Opacity
				if(this.data.opacities[this.current]){
					if(this.data.opacities[this.current] < 1){
						this.materials[this.current].transparent = true;
						this.materials[this.current].opacity = this.data.opacities[this.current];
					}
				}
				//Texture
				if(this.data.textures[this.current]){
					this.materials[this.current].map = new THREE.TextureLoader().load(this.data.textures[this.current]);
					this.materials[this.current].map.center.set(.5, .5);
					this.materials[this.current].map.rotation = THREE.MathUtils.degToRad(180);
					this.materials[this.current].map.wrapS = THREE.RepeatWrapping;
					this.materials[this.current].map.wrapT = THREE.RepeatWrapping;
					this.materials[this.current].map.repeat.set(-1,1);
					if(!this.data.repeats[this.current] || this.data.repeats[this.current] === 'false'){} else {
						this.materials[this.current].map.wrapS = THREE.RepeatWrapping;
						this.materials[this.current].map.wrapT = THREE.RepeatWrapping;
						this.materials[this.current].map.repeat.set(this.data.repeats[this.current]);
					}
				}
			} else {
				this.materials[this.current] = false;
			}
			this.current++;
		})
		//console.log(this.materials)
		this.current = -2;
		//Check if the model already is loaded/exists
		if(this.el.getObject3D('mesh')){
			this.apply();
		} else {
			// Wait for model to load. GLTF/OBJ Event
			this.el.addEventListener('model-loaded', () => {
				this.apply();
	/*
				// Grab the mesh / scene.
				const obj = this.el.getObject3D('mesh');
				obj.traverse(node => {
					//console.log(node.name)
					if(this.current < 0){} else {
						if(this.data.random){
							node.material = new THREE.MeshStandardMaterial({color: this.auxl.colorTheoryGen().base});
						} else {
							if(this.materials[this.current]){
								node.material = this.materials[this.current];
							}
						}
					}
					this.current++;
				});
	*/
			});
		}

	},
apply: function (){
	this.current = -2;
	// Grab the mesh
	const obj = this.el.getObject3D('mesh');
	obj.traverse(node => {
		//console.log(node.name)
		if(this.current < 0){} else {
			if(this.data.random){
				node.material = new THREE.MeshStandardMaterial({color: this.auxl.colorTheoryGen().base});
			} else {
				if(this.materials[this.current]){
					node.material = this.materials[this.current];
				}
			}
		}
		this.current++;
	});
},
});

//
//Testing
//Gradient & Toon Shader
const modifyMaterials = AFRAME.registerComponent('modify-materials', {
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
//Export
export {gltfmat, modifyMaterials};