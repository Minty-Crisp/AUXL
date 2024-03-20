//Required
import { createSculpture, createSculptureWithGeometry } from '../js/shader-park-core-026.esm.js';
//Shader Coding Template
import { spCodeTest, spCloud, spRandom0 } from './spCodeTest.js';

//Aframe entity attachment component for template
AFRAME.registerComponent('shadertest', {
	init: function () {
		//Sphere Container
		this.geometry = new THREE.SphereGeometry(2,25, 25);
		this.params = {
			time: 0.0,
		}
		let mesh = createSculptureWithGeometry(this.geometry, spCodeTest, () => ( {
			time: this.params.time,
		} ));
		this.material = new THREE.MeshStandardMaterial();
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.material = mesh.material
		this.mesh.onBeforeRender = mesh.onBeforeRender;
		this.el.setObject3D('mesh', this.mesh);
	},
	tick: function (time, timeDelta) {
		this.params.time += .01;
	}
}); 

//Aframe entity attachment component for template
AFRAME.registerComponent('shadercloud', {
	init: function () {
		//Sphere Container
		this.geometry = new THREE.SphereGeometry(2,25, 25);
		this.params = {
			time: 0.0,
		}
		let mesh = createSculptureWithGeometry(this.geometry, spCloud, () => ( {
			time: this.params.time,
		} ));
		this.material = new THREE.MeshStandardMaterial();
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.material = mesh.material
		this.mesh.onBeforeRender = mesh.onBeforeRender;
		this.el.setObject3D('mesh', this.mesh);
	},
	tick: function (time, timeDelta) {
		this.params.time += .01;
	}
}); 


//Aframe entity attachment component for template
AFRAME.registerComponent('shaderrandom0', {
	init: function () {
		//Sphere Container
		this.geometry = new THREE.SphereGeometry(2,25, 25);
		this.params = {
			time: 0.0,
		}
		let mesh = createSculptureWithGeometry(this.geometry, spRandom0, () => ( {
			time: this.params.time,
		} ));
		this.material = new THREE.MeshStandardMaterial();
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.material = mesh.material
		this.mesh.onBeforeRender = mesh.onBeforeRender;
		this.el.setObject3D('mesh', this.mesh);
	},
	tick: function (time, timeDelta) {
		this.params.time += .01;
	}
}); 