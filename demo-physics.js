//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('scene-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//SkyBox
auxl.skyGrad1Data = {
data: 'skyGrad1Data',
id: 'skyGrad1',
entity: 'a-sky',
sources: false,
text: false,
geometry: false,
material: {shader: 'threeColorGradientShader', topColor: '#613381', middleColor: '#99154E', bottomColor: '#b967ff'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {

top0:{property: 'material.topColor', from: '#01cdfe', to: '#01cdfe', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

mid0:{property: 'material.middleColor', from: '#fffb96', to: '#fffb96', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

top1:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'},

mid1:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'}, 

top2:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top1', pauseEvents: 'pause', resumeEvents: 'resume'},

mid2:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid1', pauseEvents: 'pause', resumeEvents: 'resume'},

},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.skyGrad1 = auxl.Core(auxl.skyGrad1Data);

//Lights
auxl.directionalLight.core.components.light.intensity = 0.75;
auxl.directionalLight.core.position = new THREE.Vector3(-0.25,0.75,0.5);
auxl.directionalLight2.core.components.light.intensity = 0.1;
auxl.directionalLight2.core.position = new THREE.Vector3(0.25,0.75,-0.5);
auxl.directionalLight3.core.components.light.intensity = 0.2;
auxl.directionalLight3.core.position = new THREE.Vector3(0.25,0.75,0.5);
auxl.ambientLight.core.components.light.intensity = 1;

//
//skyBox1
auxl.skyBox1Data = {
data:'skyBox1Data',
id:'skyBox1',
sources:false,
lights:[
auxl.directionalLight,
auxl.directionalLight2,
auxl.directionalLight3,
auxl.ambientLight,
],
sky:[
auxl.skyGrad1,
],
space:[
auxl.sunLayer,
],
};
auxl.skyBox1 = auxl.SkyBox(auxl.skyBox1Data);

//Physics Examples
//body:{type: 'dynamic', shape: 'none', mass: 5};
//shape:{shape: 'cylinder', height: 1.8, radiusTop: 0.5, radiusBottom: 0.5, offset: '0 0.9 0',};
//shape:{shape: 'box', height: 1, width: 0.5, depth: 0.5, offset: '0 0.5 0',};


//
//Physics References
auxl.world = auxl.el.systems.physics.driver.world;
//console.log(auxl.world)

//
//Static

//Physical Floor
auxl.physicalFloorData = {
data:'physicalFloorData',
id:'physicalFloor',
sources:false,
text: false,
geometry: {primitive: 'box', width: 200, depth: 200, height: 1},
material: {shader: "standard", color: "#1e7e5d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1e7e5d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '150 150'},
position: new THREE.Vector3(0,-0.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	//['static-body']: null,
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.1},
},
};
auxl.physicalFloor = auxl.Core(auxl.physicalFloorData);

//Trampoline
auxl.trampolineData = {
data:'trampolineData',
id:'trampoline',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4, depth: 4, height: 0.5},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,0.25,4),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	//['static-body']: null,
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 200},
},
};
auxl.trampoline = auxl.Core(auxl.trampolineData);

//Buildings & Doors
//

//Building 1
auxl.building1Data = {
data:'building1Data',
id:'building1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, depth: 5, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '5 10'},
position: new THREE.Vector3(10,5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.building1 = auxl.Core(auxl.building1Data);
//Building 1 Door
auxl.building1DoorData = {
data:'building1DoorData',
id:'building1Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '1 1'},
position: new THREE.Vector3(7,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:10, y:11, z:0},
},
};
auxl.building1Door = auxl.Core(auxl.building1DoorData);
//Building 2
auxl.building2Data = {
data:'building2Data',
id:'building2',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, depth: 5, height: 20},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '5 10'},
position: new THREE.Vector3(-10,10,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.building2 = auxl.Core(auxl.building2Data);
//Building 2 Door
auxl.building2DoorData = {
data:'building2DoorData',
id:'building2Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '1 1'},
position: new THREE.Vector3(-7,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:-10, y:21, z:0},
},
};
auxl.building2Door = auxl.Core(auxl.building2DoorData);
//Building 3
auxl.building3Data = {
data:'building3Data',
id:'building3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, depth: 5, height: 30},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '5 15'},
position: new THREE.Vector3(0,15,-10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.building3 = auxl.Core(auxl.building3Data);
//Building 3 Door
auxl.building3DoorData = {
data:'building3DoorData',
id:'building3Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '1 1'},
position: new THREE.Vector3(0,1,-7),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:31, z:-10},
},
};
auxl.building3Door = auxl.Core(auxl.building3DoorData);
//Building 4
auxl.building4Data = {
data:'building4Data',
id:'building4',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, depth: 5, height: 40},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '5 20'},
position: new THREE.Vector3(0,20,10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.building4 = auxl.Core(auxl.building4Data);
//Building 4 Door
auxl.building4DoorData = {
data:'building4DoorData',
id:'building4Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '1 1'},
position: new THREE.Vector3(0,1,7),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:41, z:10},
},
};
auxl.building4Door = auxl.Core(auxl.building4DoorData);

//Walls
//

//Bounding Wall 1
auxl.boundingwall1Data = {
data:'boundingwall1Data',
id:'boundingwall1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 100, depth: 1, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern13, repeat: '100 10'},
position: new THREE.Vector3(0,5,-50),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.boundingwall1 = auxl.Core(auxl.boundingwall1Data);

//Bounding Wall 2
auxl.boundingwall2Data = {
data:'boundingwall2Data',
id:'boundingwall2',
sources:false,
text: false,
geometry: {primitive: 'box', width: 100, depth: 1, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern13, repeat: '100 10'},
position: new THREE.Vector3(0,5,50),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.boundingwall2 = auxl.Core(auxl.boundingwall2Data);

//Bounding Wall 3
auxl.boundingwall3Data = {
data:'boundingwall3Data',
id:'boundingwall3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 100, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern13, repeat: '100 10'},
position: new THREE.Vector3(-50,5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.boundingwall3 = auxl.Core(auxl.boundingwall3Data);

//Bounding Wall 4
auxl.boundingwall4Data = {
data:'boundingwall4Data',
id:'boundingwall4',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 100, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern13, repeat: '100 10'},
position: new THREE.Vector3(50,5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.boundingwall4 = auxl.Core(auxl.boundingwall4Data);


//Test 1
auxl.staticTest1Data = {
data:'staticTest1Data',
id:'staticTest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 2, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(10,0.5,-12),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	['static-body']:null,
},
};
auxl.staticTest1 = auxl.Core(auxl.staticTest1Data);

//
//Dynamic

//Test 1
auxl.dynamicTest1Data = {
data:'dynamicTest1Data',
id:'dynamicTest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,6,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	['dynamic-body']:null,
},
};
auxl.dynamicTest1 = auxl.Core(auxl.dynamicTest1Data);

//Test 2
auxl.dynamicTest2Data = {
data:'dynamicTest2Data',
id:'dynamicTest2',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(7,6,-7),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	//['dynamic-body']:null,
	body:{type: 'dynamic', shape: 'sphere', mass: 2, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 7},
},
};
auxl.dynamicTest2 = auxl.Core(auxl.dynamicTest2Data);



//
//Triggers

//Test 1
auxl.triggerTest1Data = {
data:'triggerTest1Data',
id:'triggerTest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 2, width: 2, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#77a539", emissive: '#77a539', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(10,0.5,-8),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	['static-body']:null,
	['trigger']:null,
},
};
auxl.triggerTest1 = auxl.Core(auxl.triggerTest1Data);





//
//Constraints

//Lock
auxl.lock1aData = {
data:'lock1aData',
id:'lock1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern18, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(12,8,-12),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -12, to: -16, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.lock1a = auxl.Core(auxl.lock1aData);
auxl.lock1bData = {
data:'lock1bData',
id:'lock1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern18, repeat: '1 1', color: "#13cccc", emissive: '#13cccc', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(12,5,-12),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'lock',
		connectTo: 'lock1a',
		maxForce: 1e6,
	},
},
};
auxl.lock1b = auxl.Core(auxl.lock1bData);

//Distance
auxl.distance1aData = {
data:'distance1aData',
id:'distance1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern17, repeat: '1 1', color: "#3789c6", emissive: '#3789c6', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(14,8,-14),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -14, to: -18, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.distance1a = auxl.Core(auxl.distance1aData);
auxl.distance1bData = {
data:'distance1bData',
id:'distance1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern17, repeat: '1 1', color: "#d1e01a", emissive: '#d1e01a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(14,5,-14),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'distance',
		connectTo: 'distance1a',
		distance: 4,
		maxForce: 1e6,
	},
},
};
auxl.distance1b = auxl.Core(auxl.distance1bData);

//Point to Point
auxl.ptp1aData = {
data:'ptp1aData',
id:'ptp1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern16, repeat: '1 1', color: "#db7d1e", emissive: '#db7d1e', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(6,8,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -6, to: -10, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.ptp1a = auxl.Core(auxl.ptp1aData);
auxl.ptp1bData = {
data:'ptp1bData',
id:'ptp1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern16, repeat: '1 1', color: "#cc13c5", emissive: '#cc13c5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(6,5,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'pointToPoint',
		connectTo: 'ptp1a',
		pivotA: new THREE.Vector3(0,6,0),
		pivotB: new THREE.Vector3(0,-0.5,0),
		maxForce: 1e6,
	},
},
};
auxl.ptp1b = auxl.Core(auxl.ptp1bData);

//Cone Twist
auxl.coneTwist1aData = {
data:'coneTwist1aData',
id:'coneTwist1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern15, repeat: '1 1', color: "#2c25e5", emissive: '#2c25e5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(16,8,-16),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -16, to: -20, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.coneTwist1a = auxl.Core(auxl.coneTwist1aData);
auxl.coneTwist1bData = {
data:'coneTwist1bData',
id:'coneTwist1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern15, repeat: '1 1', color: "#1ea356", emissive: '#1ea356', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(16,5,-16),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'coneTwist',
		connectTo: 'coneTwist1a',
		pivotA: new THREE.Vector3(0,6,0),
		pivotB: new THREE.Vector3(0,-0.5,0),
		axisA: new THREE.Vector3(0,0,0),
		axisB: new THREE.Vector3(0,0,0),
		maxForce: 1e6,
	},
},
};
auxl.coneTwist1b = auxl.Core(auxl.coneTwist1bData);

//Hinge
auxl.hinge1aData = {
data:'hinge1aData',
id:'hinge1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern14, repeat: '1 1', color: "#399da5", emissive: '#399da5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(8,8,-8),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -8, to: -12, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.hinge1a = auxl.Core(auxl.hinge1aData);
auxl.hinge1bData = {
data:'hinge1bData',
id:'hinge1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern14, repeat: '1 1', color: "#cc1313", emissive: '#cc1313', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(8,5,-8),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'hinge',
		connectTo: 'hinge1a',
		pivotA: new THREE.Vector3(0,6,0),
		pivotB: new THREE.Vector3(0,-0.5,0),
		axisA: new THREE.Vector3(0,0,0),
		axisB: new THREE.Vector3(0,0,0),
		maxForce: 1e6,
	},
},
};
auxl.hinge1b = auxl.Core(auxl.hinge1bData);


//
//Springs
auxl.spring1aData = {
data:'spring1aData',
id:'spring1a',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(12,8,-8),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
movetest: {property: 'object3D.position.z', from: -8, to: -12, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
rotatetest: {property: 'object3D.rotation.x', from: 0, to: 360, dur: 5000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.spring1a = auxl.Core(auxl.spring1aData);
auxl.spring1bData = {
data:'spring1bData',
id:'spring1b',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#1acc13", emissive: '#1acc13', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(12,5,-8),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxspring:{
		connectTo: 'spring1a',
		restLength: 2,
		damping: 0.5,
		stiffness: 10,
	},
},
};
auxl.spring1b = auxl.Core(auxl.spring1bData);


//
//Pickups
auxl.pickup1Data = {
data:'pickup1Data',
id:'pickup1',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25,},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a55a", emissive: '#39a55a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(6,6,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'sphere', mass: 1, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 0},
	ungravity: null,
	mousedownrun__pickup:{
		cursorObj: 'player',
		component: 'null',
		method: 'PhysPickup',
		params: 'pickup1',
	},
	mouseuprun__pickup:{
		cursorObj: 'player',
		component: 'null',
		method: 'PhysDrop',
		params: 'pickup1',
	},
},
};
auxl.pickup1 = auxl.Core(auxl.pickup1Data);



//Testing Timeout
let testTimeout = setTimeout(() => {
	//console.log(auxl.playerRig.GetEl().body);
	/*
	auxl.playerRig.GetEl().body.shapeOffsets.forEach(offset => {
		//offset.x += 1;
		//offset.y += 1;
		//offset.z += 1;
	})
	*/
	//console.log(auxl.el.systems.physics)
	clearTimeout(testTimeout);
}, 5000);



//Dynamic Spring 
auxl.dynSpringAData = {
data:'dynSpringAData',
id:'dynSpringA',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25,},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#d6de06", emissive: '#d6de06', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(6,6,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'sphere', mass: 1, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.dynSpringA = auxl.Core(auxl.dynSpringAData);
auxl.dynSpringBData = {
data:'dynSpringBData',
id:'dynSpringB',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25,},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a5399d", emissive: '#a5399d', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(6,2,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'sphere', mass: 2, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 0},
	auxspring:{
		connectTo: 'dynSpringA',
		restLength: 2,
		damping: 0.5,
		stiffness: 10,
	},
},
};
auxl.dynSpringB = auxl.Core(auxl.dynSpringBData);

//
//Ramp Testing
auxl.ramp1Data = {
data:'ramp1Data',
id:'ramp1',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 50},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#39a55a", emissive: '#39a55a', emissiveIntensity: 0.25, opacity: 1, side: 'double'},
position: new THREE.Vector3(0,10,-40),
rotation: new THREE.Vector3(-60,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'plane', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.ramp1 = auxl.Core(auxl.ramp1Data);
auxl.ramp2Data = {
data:'ramp2Data',
id:'ramp2',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 50.},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#39a55a", emissive: '#39a55a', emissiveIntensity: 0.25, opacity: 1, side: 'double'},
position: new THREE.Vector3(20,10,-40),
rotation: new THREE.Vector3(-75,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'plane', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.ramp2 = auxl.Core(auxl.ramp2Data);
auxl.ramp3Data = {
data:'ramp3Data',
id:'ramp3',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 50.},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#39a55a", emissive: '#39a55a', emissiveIntensity: 0.25, opacity: 1, side: 'double'},
position: new THREE.Vector3(-20,10,-40),
rotation: new THREE.Vector3(-82.5,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'plane', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
},
};
auxl.ramp3 = auxl.Core(auxl.ramp3Data);


//Build Scene Library Objects
auxl.buildSceneLibrary = () => {


}
auxl.toBeRebuilt('buildSceneLibrary');

},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;
//
//World Atlas MapZones & NodeScenes


//
//Testing World

//
//Zone 0
auxl.zone0Data = {
	info:{
		id: 'zone0',
		name: 'Zone0',
		zoneNum: 0,
		start: 'zone0Scene0',
		travelMenu: false,
	},
	controls:{

	},
	start:{

	},
	delay:{

	},
	interval:{

	},
	event:{

	},
	interaction:{

	},
	exit:{

	},
};
//Zone 0 Scene 0
auxl.zone0Scene0Data = {
	info:{
		id:'zone0Scene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: false,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{

	},
	start:{
		ramp1:{SpawnCore:null},
		ramp2:{SpawnCore:null},
		ramp3:{SpawnCore:null},
		lock1a:{SpawnCore:null},
		lock1b:{SpawnCore:null},
		distance1a:{SpawnCore:null},
		distance1b:{SpawnCore:null},
		ptp1a:{SpawnCore:null},
		ptp1b:{SpawnCore:null},
		coneTwist1a:{SpawnCore:null},
		coneTwist1b:{SpawnCore:null},
		hinge1a:{SpawnCore:null},
		hinge1b:{SpawnCore:null},
		spring1a:{SpawnCore:null},
		spring1b:{SpawnCore:null},
		building1:{SpawnCore:null},
		building1Door:{SpawnCore:null},
		building2:{SpawnCore:null},
		building2Door:{SpawnCore:null},
		building3:{SpawnCore:null},
		building3Door:{SpawnCore:null},
		building4:{SpawnCore:null},
		building4Door:{SpawnCore:null},
		boundingwall1:{SpawnCore:null},
		boundingwall2:{SpawnCore:null},
		boundingwall3:{SpawnCore:null},
		boundingwall4:{SpawnCore:null},
		trampoline:{SpawnCore:null},
		staticTest1:{SpawnCore:null},
		dynamicTest1:{SpawnCore:null},
		dynamicTest2:{SpawnCore:null},
		triggerTest1:{SpawnCore:null},
		pickup1:{SpawnCore:null},
		dynSpringA:{SpawnCore:null},
		dynSpringB:{SpawnCore:null},
	},
	delay:{
		3000:{
			spring1b:{ChangeSelf:{property: 'auxspring', value:{restLength: 5}}},
		},
		6000:{
			lock1a:{DespawnCore:null},
			distance1a:{DespawnCore:null},
			ptp1a:{DespawnCore:null},
			coneTwist1a:{DespawnCore:null},
			hinge1a:{DespawnCore:null},
			spring1a:{DespawnCore:null},
		},
		12000:{
			lock1a:{SpawnCore:null},
			distance1a:{SpawnCore:null},
			ptp1a:{SpawnCore:null},
			coneTwist1a:{SpawnCore:null},
			hinge1a:{SpawnCore:null},
			spring1a:{SpawnCore:null},
		},
	},
	interval:{

	},
	event:{

	},
	interaction:{

	},
	exit:{
	},
	map:{
		data: auxl.zone0Data.zone0Scene0,
	},
};

//Zone 0 Scene 0
auxl.zone0Scene0 = auxl.SceneNode(auxl.zone0Scene0Data);
//Map Zone 0
auxl.zone0 = auxl.MapZone(auxl.zone0Data);


//
//Scenarios

//
//Testing Scenario
auxl.v03TestingScenarioData = {
	info:{
		id: 'v03TestingScenario',
		name: 'v03 Testing Scenario',
		scenarioNum: 0,
		startZone: 'zone0',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	map:{
		zone0:{
			zone0Scene0:{
			},
		},
	},
	controls:{
		action1Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed', name: 'Toggle Walk/Run', info: 'Change your walking speed between walk and run.'},
		action2Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action3Down:{auxlObj: 'player', func: 'LowGrav', name: 'Low Gravity', info: 'Lower Gravity.'},
		action5Down:{auxlObj: 'player', func: 'PhysBoost', name: 'Vertical Boost', info: 'Fly upwards.'},
		action6Down:{auxlObj: 'player', func: 'PhysJump', name: 'Jump', info: 'Jump Up'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft45', name: 'Snap View Left', info: 'Quick snap your view 45 degrees to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight45', name: 'Snap View Right', info: 'Quick snap your view 45 degrees to the right.'},
	},
	start:{
		skyBox1:{SpawnSkyBox: null},
		//comp:{SpawnComp: null},
		physicalFloor:{SpawnCore: null},
		ramp1:{SpawnCore: null},
		playerRig:{PhysPos: new THREE.Vector3(0,10,1)},
	},
	delay:{
/*
		100:{
			skyBox0:{DayNightCycle: null},
		},
*/
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
auxl.v03TestingScenario = auxl.Scenario(auxl.v03TestingScenarioData);

//
//Testing World
auxl.TestingWorldData = {
	info:{
		id: 'testingWorld',
		name: 'Testing World',
		description: 'A world containing various test scenarios.',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: true,
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		auxl.v03TestingScenario,
	],
};
auxl.testingWorld = auxl.World(auxl.TestingWorldData);
auxl.testingWorld.SetAsDefault();

//
//System Loaded
auxl.systemLoaded();

    },
});