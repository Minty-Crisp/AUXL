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

//UniRay Testing
//console.log('pre uniraytest1')
//auxl.uniRayTest1 = auxl.UniRay('uniRayTest1', auxl.ghost,{});

//MonoRail
/*
<!-- Curve Component | Support for Along Path -->
<!-- Requiring A-Frame 1.2.0 to operate -->
<script src="https://rawgit.com/protyze/aframe-curve-component/master/dist/aframe-curve-component.min.js"></script>
<!-- Along Path -->
<script src="https://rawgit.com/protyze/aframe-alongpath-component/master/dist/aframe-alongpath-component.min.js"></script>
*/

/*
<a-curve id="goldfish6tracksky" rotation="0 180 0">
<a-curve-point position="-10 5 0"></a-curve-point>
<a-curve-point position="-10 5 20"></a-curve-point>
<a-curve-point position="0 10 30"></a-curve-point>
<a-curve-point position="10 10 20"></a-curve-point>
<a-curve-point position="20 10 0"></a-curve-point>
<a-curve-point position="10 5 -10"></a-curve-point>
<a-curve-point position="0 5 -20"></a-curve-point>
<a-curve-point position="-10 5 -10"></a-curve-point>
<a-curve-point position="-10 5 0"></a-curve-point>
</a-curve>

object attaching to track...
alongpath="curve: #cloud3track; dur: 680000; loop: true; rotate: false"
*/



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
scale: new THREE.Vector3(8.046,8.046,8.046),
animations: {
sunrisetop:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
sunrisemid:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}, 
sunsettop:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
sunsetmid:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}, 
/*
top0:{property: 'material.topColor', from: '#01cdfe', to: '#01cdfe', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

mid0:{property: 'material.middleColor', from: '#fffb96', to: '#fffb96', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

top1:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'},

mid1:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'}, 

top2:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top1', pauseEvents: 'pause', resumeEvents: 'resume'},

mid2:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid1', pauseEvents: 'pause', resumeEvents: 'resume'},
*/
},
mixins: false,
classes: ['clickable', 'a-ent'],
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
auxl.moonLayer,
],
};
auxl.skyBox1 = auxl.SkyBox(auxl.skyBox1Data);

//Physics Examples
//body:{type: 'dynamic', shape: 'none', mass: 5};
//shape:{shape: 'cylinder', height: 1.8, radiusTop: 0.5, radiusBottom: 0.5, offset: '0 0.9 0',};
//shape:{shape: 'box', height: 1, width: 0.5, depth: 0.5, offset: '0 0.5 0',};

//Build
//auxl.build = auxl.BuildIn3D();

//Testing One Phys Object
auxl.oneTest0Data = {
data:'oneTest0Data',
id:'oneTest0',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4, height: 4, depth: 4},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,30,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: false,
};
auxl.oneTest0 = auxl.Core(auxl.oneTest0Data);

auxl.phys0Data = {
	type : 'dynamic',
	shape : 'box',
 	shapeData: {shape: 'box', height: 1, width: 1, depth: 1, offset: '0 1 0',},
	mass : 1,
	friction : 0,
	restitution : 0,
	connectTo : false,
	restLength : 0,
	damping : 0,
	stiffness : 0,
}

auxl.oneTest0One = auxl.One(auxl.oneTest0, auxl.phys0Data);
//console.log(auxl.oneTest0One)


//Test 1
auxl.oneTest1 = auxl.coreFromTemplate(auxl.oneTest0,{id: 'oneTest1', geometry: {primitive: 'sphere', radius: 4}, material: {shader: "standard", color: "#29b479", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b479", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'}, position: new THREE.Vector3(10,30,0)}, true);
auxl.phys1Data = {
	type : 'dynamic',
	shape : 'sphere',
 	shapeData: {shape: 'sphere', radius: 1, width: 1, depth: 1, offset: '0 1 0',},
	mass : 1,
	friction : 0,
	restitution : 0,
	connectTo : false,
	restLength : 0,
	damping : 0,
	stiffness : 0,
}

auxl.oneTest1One = auxl.One(auxl.oneTest1, auxl.phys1Data);

//Test 2
auxl.oneTest2 = auxl.coreFromTemplate(auxl.oneTest0,{id: 'oneTest2', geometry: {primitive: 'cylinder', height:4, radius:4, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:0, thetaLength:360}, material: {shader: "standard", color: "#1193f2", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1193f2", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'}, position: new THREE.Vector3(-10,30,0)}, true);
auxl.phys1Data = {
	type : 'dynamic',
	shape : 'cylinder',
 	shapeData: {shape: 'cylinder', radius: 1, width: 1, depth: 1, offset: '0 1 0',},
	mass : 1,
	friction : 0,
	restitution : 0,
	connectTo : false,
	restLength : 0,
	damping : 0,
	stiffness : 0,
}

auxl.oneTest2One = auxl.One(auxl.oneTest2, auxl.phys1Data);


//
//Static



//mtnFloor
auxl.mtnFloorData = {
	data:'mtnFloorData',
	id:'mtnFloor',
	sources:false,
	text: false,
	geometry: false,
	material: {shader: "standard", color: "#de22d0", opacity: 1, metalness: 0.7, roughness: 0.3, emissive: "#000000", emissiveIntensity: 1, side: 'double', src: auxl.pattern14, repeat: '256 256'},
	position: new THREE.Vector3(300,0,300),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(10,10,10),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
	['obj-model']:{obj: './assets/3d/land/mtnFloor.obj'},
	},
};
auxl.mtnFloor = auxl.Core(auxl.mtnFloorData);

//Hills
auxl.hillsData = {
id: 'hills',
type: 'hills',
texture: false,
baseColor: false,
baseColorFamily: 'olive',
radius: 400,
density: 'high',
height: 'high',
width: 'high',
};
auxl.hills = auxl.Horizon(auxl.hillsData);
//Building
auxl.buildingsHorizonData = {
id: 'buildingsHorizon',
type: 'buildings',
texture: false,
baseColor: false,
baseColorFamily: 'black',
radius: 700,
density: 'high',
height: 'high',
width: 'high',
};
auxl.buildingsHorizon = auxl.Horizon(auxl.buildingsHorizonData);


//Building
auxl.circularWallHorizonData = {
id: 'cylinderWallHorizon',
type: 'cylinderWall',
texture: false,
baseColor: false,
baseColorFamily: 'black',
height: 40,
radius: 1200,
density: 'high',
height: 'high',
width: 'high',
};
auxl.cylinderWallHorizon = auxl.Horizon(auxl.circularWallHorizonData);

//Building
auxl.mountainsHorizonData = {
id: 'mountainsHorizon',
type: 'mountains',
texture: false,
baseColor: false,
baseColorFamily: 'black',
radius: 1024,
density: 'high',
height: 'high',
width: 'high',
};
auxl.mountainsHorizon = auxl.Horizon(auxl.mountainsHorizonData);

//
//Cloud Testing
auxl.cloudData = {
data:'cloudData',
id:'cloud',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 2900, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 180, thetaStart: 0},
material: {shader: "standard", color: "#d4c6d3", opacity: 0.95, metalness: 0.7, roughness: 0.3, emissive: "#d4c6d3", emissiveIntensity: 0.1, side: 'double', src: auxl.pattern25, repeat: '1 7', blending: 'additive'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: false,
};
auxl.cloud = auxl.Core(auxl.cloudData);
auxl.cloud.SpawnCore();


//Physical Floor
auxl.physicalFloorData = {
data:'physicalFloorData',
id:'physicalFloor',
sources:false,
text: false,
//geometry: {primitive: 'box', width: 8046, depth: 8046, height: 1},
geometry: {primitive: 'box', width: 4000, depth: 4000, height: 100},
material: {shader: "standard", color: "#de22d0", opacity: 0, metalness: 0.7, roughness: 0.3, emissive: "#000000", emissiveIntensity: 1, side: 'double', src: auxl.pattern14, repeat: '1024 1024'},
position: new THREE.Vector3(300,-50,300),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
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

//Wall
//
//Wall Base
auxl.wallBaseData = {
data:'wallBaseData',
id:'wallBase',
sources:false,
text: false,
geometry: {primitive: 'box', width: 250, depth: 250, height: 0.1},
material: {shader: "standard", color: "#29b1c3", opacity: 0.1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '50 50'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'to'},
},
};
auxl.wallBase = auxl.Core(auxl.wallBaseData);

//Generate 1 of each 6 cube offsets



//Reference convert to dice walls
//
auxl.catwalk0Data = {
data:'catwalk0Data',
id:'catwalk',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, height: 1, depth: 50},
material: {shader: "standard", color: "#169f5f", opacity: 0.9, metalness: 0.6, roughness: 0.4, emissive: "#169f5f", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern44, repeat: '50 50'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 1,},
	bodymaterial: {friction: 1, restitution: 0.1},
	//linkcable: {type: 'to'},
},
};
auxl.catwalk = auxl.Core(auxl.catwalk0Data);

auxl.catwalk0 = auxl.coreFromTemplate(auxl.catwalk,{id: 'catwalk0', geometry: false, material: false, components: false, position: new THREE.Vector3(-55,99.5,-25)}, true);
auxl.catwalk0A = auxl.coreFromTemplate(auxl.catwalk,{id: 'catwalk0A', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(-25,0,0)}, true);
auxl.catwalk0B = auxl.coreFromTemplate(auxl.catwalk,{id: 'catwalk0B', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(25,0,0)}, true);
auxl.catwalk0C = auxl.coreFromTemplate(auxl.catwalk,{id: 'catwalk0C', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,-25)}, true);
auxl.catwalk0D = auxl.coreFromTemplate(auxl.catwalk,{id: 'catwalk0D', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,25)}, true);


auxl.catwalk0LayerData = {
	parent: {core: auxl.catwalk0},
	child0: {core: auxl.catwalk0A},
	child1: {core: auxl.catwalk0B},
	child2: {core: auxl.catwalk0C},
	child3: {core: auxl.catwalk0D},
}
auxl.catwalk0Layer = auxl.Layer('catwalk0Layer', auxl.catwalk0LayerData);





//Building 1
auxl.ceiling1Data = {
data:'ceiling1Data',
id:'ceiling1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 500, depth: 500, height: 0.1},
material: {shader: "standard", color: "#29b1c3", opacity: 0.1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '50 50'},
position: new THREE.Vector3(0,50,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'none', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'to'},
},
};
auxl.ceiling1 = auxl.Core(auxl.ceiling1Data);
//Ceiling 2
auxl.ceiling2Data = {
data:'ceiling2Data',
id:'ceiling2',
sources:false,
text: false,
geometry: {primitive: 'box', width: 500, depth: 500, height: 0.1},
material: {shader: "standard", color: "#29b1c3", opacity: 0.1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '50 50'},
position: new THREE.Vector3(0,150,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'none', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'to'},
},
};
auxl.ceiling2 = auxl.Core(auxl.ceiling2Data);
//Ceiling 3
auxl.ceiling3Data = {
data:'ceiling3Data',
id:'ceiling3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 500, depth: 500, height: 0.1},
material: {shader: "standard", color: "#29b1c3", opacity: 0.1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '50 50'},
position: new THREE.Vector3(0,250,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'none', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'to'},
},
};
auxl.ceiling3 = auxl.Core(auxl.ceiling3Data);

/*
auxl.coreDupeTestAssign = auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTestAssign', position: new THREE.Vector3(-2,2,-1)}, true);

*/
//Buildings, Trampolines, Doors
//

//Building Bsse
auxl.buildingBaseData = {
data:'buildingBaseData',
id:'buildingBase',
sources:false,
text: false,
geometry: {primitive: 'box', width: 10, depth: 10, height: 100},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
position: new THREE.Vector3(0,50,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.buildingBase = auxl.Core(auxl.buildingBaseData);

auxl.buildingBaseTest0 = auxl.coreFromTemplate(auxl.buildingBase,{id: 'buildingBaseTest0', position: new THREE.Vector3(-20,50,20)}, true);

auxl.buildingBaseDoorwayData = {
data:'buildingBaseDoorwayData',
id:'buildingBaseDoorway',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
position: new THREE.Vector3(7,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:100.5, z:0},
},
};
auxl.buildingBaseDoorway = auxl.Core(auxl.buildingBaseDoorwayData);

auxl.buildingBaseDoorwayTest0 = auxl.coreFromTemplate(auxl.buildingBaseDoorway,{id: 'buildingBaseDoorwayTest0', position: new THREE.Vector3(5.5,-50,0)}, true);

//Triggers to animate a generated force on the player
//Such as launching them


//Trampoline Side
auxl.slideBaseData = {
data:'slideBaseData',
id:'slideBaseData',
sources:false,
text: false,
geometry: {primitive: 'box', width: 3, depth: 10, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '1 4'},
position: new THREE.Vector3(6,-50,0),
rotation: new THREE.Vector3(0,0,-10),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 500},
},
};
auxl.slideBase = auxl.Core(auxl.slideBaseData);

//Could be better to do a trigger which then animates the object into existance	

auxl.slideBaseTest0 = auxl.coreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(6.35,-50.1,0), rotation: new THREE.Vector3(0,0,-10)}, true);
auxl.slideBaseTest1 = auxl.coreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(-6.35,-50.1,0), rotation: new THREE.Vector3(0,0,10)}, true);
auxl.slideBaseTest2 = auxl.coreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-50.1,6.35), rotation: new THREE.Vector3(10,0,0)}, true);
auxl.slideBaseTest3 = auxl.coreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-50.1,-6.35), rotation: new THREE.Vector3(-10,0,0)}, true);


//Flip Side
auxl.flipBaseData = {
data:'flipBaseData',
id:'flipBaseData',
sources:false,
text: false,
geometry: {primitive: 'box', width: 20, depth: 3, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '6 1'},
position: new THREE.Vector3(6,5.01,0),
rotation: new THREE.Vector3(0,0,-5),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 250},
},
};
auxl.flipBase = auxl.Core(auxl.flipBaseData);

auxl.flipBaseTest0 = auxl.coreFromTemplate(auxl.flipBase,{id: 'flipBaseTest0'}, true);



//Trampoline Top 
auxl.trampolineTwistData = {
data:'trampolineTwistData',
id:'trampolineTwist',
sources:false,
text: false,
geometry: {primitive: 'box', width: 2, depth: 10, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '1 4'},
position: new THREE.Vector3(6,0.561,0),
rotation: new THREE.Vector3(0,0,10),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampolineTop = auxl.Core(auxl.trampolineTwistData);

auxl.trampolineTopBlockData = {
data:'trampolineTopBlockData',
id:'trampolineBase',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4, depth: 10, height: 1},
material: {shader: "standard", color: "#1515d8", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1515d8", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '1 1'},
position: new THREE.Vector3(7,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0},
},
};
auxl.trampolineTopBlock = auxl.Core(auxl.trampolineTopBlockData);



auxl.trampolineTopBlockTest0 = auxl.coreFromTemplate(auxl.trampolineTop,{id: 'trampolineTopBlockTest0'}, true);
auxl.trampolineTopBlockTest1 = auxl.coreFromTemplate(auxl.trampolineTopBlock,{id: 'trampolineTopBlockTest1'}, true);



auxl.baseTest0LayerData = {
	parent: {core: auxl.buildingBaseTest0},
	child0: {core: auxl.buildingBaseDoorwayTest0},
	child1: {core: auxl.slideBaseTest0},
	child2: {core: auxl.slideBaseTest1},
	child3: {core: auxl.slideBaseTest2},
	child4: {core: auxl.slideBaseTest3},
	child5: {core: auxl.flipBaseTest0},
	child6: {core: auxl.trampolineTopBlockTest0},
	child7: {core: auxl.trampolineTopBlockTest1},
	//child1: {core: auxl.trampolineTop},
	//child2: {core: auxl.buildingBaseDoor},
}
auxl.baseTest0Layer = auxl.Layer('baseTest0Layer', auxl.baseTest0LayerData);
//buildingBaseTest0
//trampolineBaseTest0


//Generate a pyramid of these building with slides

//Assign Core Duplication
//auxl.basePyramidTestLayer = auxl.layerFromTemplate(auxl.eventTesting,{id: 'coreDupeTestAssign', position: new THREE.Vector3(-2,2,-1)}, true);

/*
//Trampoline Base
auxl.trampolineBaseData = {
data:'trampolineBaseData',
id:'trampolineBase',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,50.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 500},
},
};
auxl.trampolineBase = auxl.Core(auxl.trampolineBaseData);

//Trampoline Ceiling 
auxl.trampolineTopData = {
data:'trampolineTopData',
id:'trampolineTop',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4, depth: 4, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,5.1,0),
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
auxl.trampolineTop = auxl.Core(auxl.trampolineTopData);
//Building Door
auxl.buildingBaseDoorData = {
data:'buildingBaseDoorData',
id:'buildingBaseDoor',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
position: new THREE.Vector3(7,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:10, z:0},
},
};
auxl.buildingBaseDoor = auxl.Core(auxl.buildingBaseDoorData);
//Building Layer
auxl.buildingLayerData = {
parent: {core: auxl.buildingBase},
child0: {core: auxl.trampolineBase},
child1: {core: auxl.trampolineTop},
child2: {core: auxl.buildingBaseDoor},
}
auxl.buildingLayer = auxl.Layer('buildingLayer', auxl.buildingLayerData);
*/
//Build a template for the building, it size, position, scale ratio, height

//Use to better build the street corner data of the 4 buildings better
//Add All buildings to a layer as called a street corner


//width
//depth
//height
//position
//rotation

/*
//Base 4 Building Example
const BuildBuildings = (section) =>{
	//Building 1
	let buildingData = {
	data:'building1Data',
	id:'building1',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 5, depth: 5, height: 10},
	material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
	position: new THREE.Vector3(10,5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		body:{type: 'static', shape: 'box', mass: 0,},
		bodymaterial: {friction: 0.01, restitution: 0.01},
		//linkcable: {type: 'to'},
	},
	};
	auxl.['building'+section] = auxl.Core(buildingData);
	//TrampolineBuilding
	let trampolineData = {
	data:'trampolineData',
	id:'trampoline',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 4, depth: 4, height: 0.01},
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
	auxl.['trampoline'+section] = auxl.Core(trampolineData);
	//Building 1 Door
	let buildingDoorData = {
	data:'building1DoorData',
	id:'building1Door',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
	material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
	auxl.['buildingDoor'+section] = auxl.Core(buildingDoorData);
	//Building 2
	let buildingData = {
	data:'building2Data',
	id:'building2',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 5, depth: 5, height: 20},
	material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
	position: new THREE.Vector3(-10,10,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		body:{type: 'static', shape: 'box', mass: 0,},
		bodymaterial: {friction: 0.01, restitution: 0.01},
		//linkcable: {type: 'to'},
	},
	};
	auxl.['building'+section] = auxl.Core(buildingData);
	//Building 2 Door
	let buildingDoorData = {
	data:'building2DoorData',
	id:'building2Door',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
	material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
	auxl.['buildingDoor'+section] = auxl.Core(buildingDoorData);
	//Building 3
	let buildingData = {
	data:'building3Data',
	id:'building3',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 5, depth: 5, height: 30},
	material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 15'},
	position: new THREE.Vector3(0,15,-10),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		body:{type: 'static', shape: 'box', mass: 0,},
		bodymaterial: {friction: 0.01, restitution: 0.01},
		//linkcable: {type: 'to'},
	},
	};
	auxl.['building'+section] = auxl.Core(buildingData);
	//Building 3 Door
	let buildingDoorData = {
	data:'building3DoorData',
	id:'building3Door',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
	material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
	auxl.['buildingDoor'+section] = auxl.Core(buildingDoorData);
	//Building 4
	let buildingData = {
	data:'building4Data',
	id:'building4',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 5, depth: 5, height: 40},
	material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 20'},
	position: new THREE.Vector3(0,20,10),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		body:{type: 'static', shape: 'box', mass: 0,},
		bodymaterial: {friction: 0.01, restitution: 0.01},
		//linkcable: {type: 'to'},
	},
	};
	auxl.['building'+section] = auxl.Core(buildingData);
	//Building 4 Door
	let buildingDoorData = {
	data:'building4DoorData',
	id:'building4Door',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
	material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
	auxl.['buildingDoor'+section] = auxl.Core(buildingDoorData);


	//Building Layer
	auxl.buildingLayerData = {
		parent: {core: auxl.building},
		child0: {core: auxl.trampoline},
		child1: {core: auxl.buildingDoor},
		child2: {core: auxl.building},
		child3: {core: auxl.buildingDoor},
		child4: {core: auxl.building},
		child5: {core: auxl.buildingDoor},
		child6: {core: auxl.building},
		child7: {core: auxl.buildingDoor},
	}
	auxl.buildingLayer = auxl.Layer('buildingLayer', auxl.buildingLayerData);

	return auxl.buildingLayer;


}
*/







//Base 4 Building Example
//TrampolineBuilding
auxl.trampoline0Data = {
data:'trampoline0Data',
id:'trampoline0',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4, depth: 4, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampoline0 = auxl.Core(auxl.trampoline0Data);

//Building 1
auxl.building1Data = {
data:'building1Data',
id:'building1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 5, depth: 5, height: 10},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
position: new THREE.Vector3(10,5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.building1 = auxl.Core(auxl.building1Data);
//TrampolineBuilding
auxl.trampoline1Data = {
data:'trampoline1Data',
id:'trampoline1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(10,10.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampoline1 = auxl.Core(auxl.trampoline1Data);
//Building 1 Door
auxl.building1DoorData = {
data:'building1DoorData',
id:'building1Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
position: new THREE.Vector3(-10,10,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.building2 = auxl.Core(auxl.building2Data);
auxl.trampoline2Data = {
data:'trampoline2Data',
id:'trampoline2',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(-10,20.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampoline2 = auxl.Core(auxl.trampoline2Data);
//Building 2 Door
auxl.building2DoorData = {
data:'building2DoorData',
id:'building2Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.5, depth: 1, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 15'},
position: new THREE.Vector3(0,15,-10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.building3 = auxl.Core(auxl.building3Data);
//Trampoline 3
auxl.trampoline3Data = {
data:'trampoline3Data',
id:'trampoline3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,30.1,-10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampoline3 = auxl.Core(auxl.trampoline3Data);
//Building 3 Door
auxl.building3DoorData = {
data:'building3DoorData',
id:'building3Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 20'},
position: new THREE.Vector3(0,20,10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.building4 = auxl.Core(auxl.building4Data);
//Trampoline 4
auxl.trampoline4Data = {
data:'trampoline4Data',
id:'trampoline4',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,40.1,10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.trampoline4 = auxl.Core(auxl.trampoline4Data);
//Building 4 Door
auxl.building4DoorData = {
data:'building4DoorData',
id:'building4Door',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 0.5, height: 2},
material: {shader: "standard", color: "#c32994", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#c32994", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '1 1'},
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
geometry: {primitive: 'box', width: 300, depth: 1, height: 300},
material: {shader: "standard", color: "#29b1c3", opacity: 0.8, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '300 300'},
position: new THREE.Vector3(0,150,-150),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.boundingwall1 = auxl.Core(auxl.boundingwall1Data);

//Bounding Wall 2
auxl.boundingwall2Data = {
data:'boundingwall2Data',
id:'boundingwall2',
sources:false,
text: false,
geometry: {primitive: 'box', width: 300, depth: 1, height: 300},
material: {shader: "standard", color: "#29b1c3", opacity: 0.8, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '30 30'},
position: new THREE.Vector3(0,150,150),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.boundingwall2 = auxl.Core(auxl.boundingwall2Data);

//Bounding Wall 3
auxl.boundingwall3Data = {
data:'boundingwall3Data',
id:'boundingwall3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 300, height: 300},
material: {shader: "standard", color: "#29b1c3", opacity: 0.8, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '30 30'},
position: new THREE.Vector3(-150,150,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.boundingwall3 = auxl.Core(auxl.boundingwall3Data);

//Bounding Wall 4
auxl.boundingwall4Data = {
data:'boundingwall4Data',
id:'boundingwall4',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 300, height: 300},
material: {shader: "standard", color: "#29b1c3", opacity: 0.8, metalness: 0, roughness: 0.8, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '30 30'},
position: new THREE.Vector3(150,150,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};
auxl.boundingwall4 = auxl.Core(auxl.boundingwall4Data);


//Test 1
auxl.dynamicTest0Data = {
data:'dynamicTest0Data',
id:'dynamicTest0',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,10,-4),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['dynamic-body']:null,
	linkcable: null,
},
};
auxl.dynamicTest0 = auxl.Core(auxl.dynamicTest0Data);

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
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'lock',
		connectTo: 'lock1a',
		maxForce: 1e6,
	},
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxconstraint:{
		type: 'distance',
		connectTo: 'distance1a',
		distance: 4,
		maxForce: 1e6,
	},
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
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
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
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
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
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
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 0.1, linearDamping: 0.1, angularDamping: 0.1},
	bodymaterial: {friction: 0, restitution: 0},
	auxspring:{
		connectTo: 'spring1a',
		restLength: 2,
		damping: 0.5,
		stiffness: 10,
	},
	//linkcable: {type: 'hit'},
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
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'sphere', mass: 1, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'grab'},
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
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'dynamic', shape: 'sphere', mass: 2, linearDamping: 0.01,},
	bodymaterial: {friction: 0, restitution: 0},
	auxspring:{
		connectTo: 'dynSpringA',
		restLength: 1.5,
		damping: 0.5,
		stiffness: 10,
	},
	//linkcable: {type: 'hit'},
},
};
auxl.dynSpringB = auxl.Core(auxl.dynSpringBData);


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
	//auxl.dynSpringB.ChangeSelf({property: 'body', value: {mass:0}})
	auxl.dynSpringB.ChangeSelf({property: 'body', value: {type:'static'}})
	clearTimeout(testTimeout);
}, 10000);
let testTimeout2 = setTimeout(() => {
	//auxl.dynSpringB.ChangeSelf({property: 'body', value: {mass:1}})
	auxl.dynSpringB.ChangeSelf({property: 'body', value: {type:'dynamic'}})
	clearTimeout(testTimeout2);
}, 13000);


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



//Biome
/*
trampoline0
trampoline1
trampoline2
trampoline3
trampoline4
building1
building1Door
building2
building2Door
building3
building3Door
building4
building4Door
*/
/*
auxl.cadeCabData = {
	data:'cadeCabData',
	id:'cadeCab',
	sources: false,
	text: false,
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.45,0.45,0.45),
	animations:false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components:{
		['gltf-model']:'./assets/3d/XRcade/cabinet.glb',
		gltfmat: {colors:['random','random','random','random','random', 'black','random','random','random','random'],},
		hovertext:{value: 'Ready?\nPlayer One', hover: 'top', offset: 5, twist: true,},
	},
};
auxl.cadeCab = auxl.Core(auxl.cadeCabData);

{shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '-0.5 1 -0.5',}

*/
/*
let mat1 = auxl.randomOfArray(auxl.patterns);
console.log(mat1)
let mat2 = auxl.randomOfArray(auxl.patterns);
console.log(mat2)
let mat3 = auxl.randomOfArray(auxl.patterns);
console.log(mat3)
auxl.acubeBaseData = {
data:'acubeBaseData',
id:'acubeBaseData',
sources:false,
text: false,
geometry: {primitive: 'box', width: 1, depth: 1, height: 1},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '5 10'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cube-city.glb',
	gltfmat: {
		//colors:['black','black','random','random',],
		//colors:['#4d4d4d','#4d4d4d','random','random',],
		//colors:['white','black','random','random',],
		//colors:['black','white','random','random',],
		colors:['black','black','random','random',],
		emissive:[1,1,1,],
		textures:[mat1,mat2,mat3,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'box', mass: 0,},
	//body:{type: 'static', shape: 'none', mass: 0,},
	//shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 1 0',},
	//shape:{shape: 'box', halfExtents: '1 1 1', offset: '-0.15 0.7 0.15',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
	//linkcable: {type: 'to'},
},
};

auxl.acubeBase1Data = auxl.coreDataFromTemplate(auxl.acubeBaseData, {id: 'acubeBaseData2', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.acubeBase2Data = auxl.coreDataFromTemplate(auxl.acubeBaseData, {id: 'acubeBaseData2', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.acubeBase3Data = auxl.coreDataFromTemplate(auxl.acubeBaseData, {id: 'acubeBaseData3', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.acubeBase4Data = auxl.coreDataFromTemplate(auxl.acubeBaseData, {id: 'acubeBaseData4', rotation: new THREE.Vector3(0,270,0),}, true);
*/

//Animate the buildings colors for night time, day time and dusk/dawn


//auxl.acubeBase = auxl.Core(auxl.acubeBaseData);
//auxl.acubeBase.SpawnCore();
//Update MultiAssetGen to support layers
//City
/*
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false
*/
//City Hectic
/*
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false
*/
//Apocolypse
/*
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true
*/

//1
auxl.citycube1Data = {
data:'citycube1Data',
id:'citycube1',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ1.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube1AData = auxl.coreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube1BData = auxl.coreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube1CData = auxl.coreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube1DData = auxl.coreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1D', rotation: new THREE.Vector3(0,270,0),}, true);
//2
auxl.citycube2Data = {
data:'citycube2Data',
id:'citycube2',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ2.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube2AData = auxl.coreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube2BData = auxl.coreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube2CData = auxl.coreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube2DData = auxl.coreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2D', rotation: new THREE.Vector3(0,270,0),}, true);
//2
auxl.citycube3Data = {
data:'citycube3Data',
id:'citycube3',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ3.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube3AData = auxl.coreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube3BData = auxl.coreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube3CData = auxl.coreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube3DData = auxl.coreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3D', rotation: new THREE.Vector3(0,270,0),}, true);
//4
auxl.citycube4Data = {
data:'citycube4Data',
id:'citycube4',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ4.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube4AData = auxl.coreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube4BData = auxl.coreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube4CData = auxl.coreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube4DData = auxl.coreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4D', rotation: new THREE.Vector3(0,270,0),}, true);
//5
auxl.citycube5Data = {
data:'citycube5Data',
id:'citycube5',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ5.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube5AData = auxl.coreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube5BData = auxl.coreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube5CData = auxl.coreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube5DData = auxl.coreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5D', rotation: new THREE.Vector3(0,270,0),}, true);
//6
auxl.citycube6Data = {
data:'citycube6Data',
id:'citycube6',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ6.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube6AData = auxl.coreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube6BData = auxl.coreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube6CData = auxl.coreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube6DData = auxl.coreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6D', rotation: new THREE.Vector3(0,270,0),}, true);
//7
auxl.citycube7Data = {
data:'citycube7Data',
id:'citycube7',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ7.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube7AData = auxl.coreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube7BData = auxl.coreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube7CData = auxl.coreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube7DData = auxl.coreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7D', rotation: new THREE.Vector3(0,270,0),}, true);
//8
auxl.citycube8Data = {
data:'citycube8Data',
id:'citycube8',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['gltf-model']:'./assets/3d/city/cityCubeHQ8.glb',
	gltfmat: {
		colors:['black','black','random','random',],
		emissive:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube8AData = auxl.coreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube8BData = auxl.coreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube8CData = auxl.coreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube8DData = auxl.coreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8D', rotation: new THREE.Vector3(0,270,0),}, true);


//Biome
auxl.biome1TinyData = {
	data: 'biome1TinyData',
	id: 'tiny',
	type: 'tiny',
	radius: 100,
	min: 1,
	max: 7,
	rings: 1,
	objs:[
		auxl.citycube1AData,
		auxl.citycube1BData,
		auxl.citycube1CData,
		auxl.citycube1DData,
		auxl.citycube2AData,
		auxl.citycube2BData,
		auxl.citycube2CData,
		auxl.citycube2DData,
		auxl.citycube3AData,
		auxl.citycube3BData,
		auxl.citycube3CData,
		auxl.citycube3DData,
		auxl.citycube4AData,
		auxl.citycube4BData,
		auxl.citycube4CData,
		auxl.citycube4DData,
		auxl.citycube5AData,
		auxl.citycube5BData,
		auxl.citycube5CData,
		auxl.citycube5DData,
		auxl.citycube6AData,
		auxl.citycube6BData,
		auxl.citycube6CData,
		auxl.citycube6DData,
		auxl.citycube7AData,
		auxl.citycube7BData,
		auxl.citycube7CData,
		auxl.citycube7DData,
		auxl.citycube8AData,
		auxl.citycube8BData,
		auxl.citycube8CData,
		auxl.citycube8DData,
		//auxl.acubeBase1Data,
		//auxl.acubeBase2Data,
		//auxl.acubeBase3Data,
		//auxl.acubeBase4Data,
		//auxl.building1Data,
		//auxl.building2Data,
		//auxl.building3Data,
		//auxl.building4Data,
	],
	ranYPos: false,
	yPosFlex: 20,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 20,
	scaleFlexY: 80,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome1SmallData = {
	data: 'biome1SmallData',
	id: 'small',
	type: 'small',
	radius: 150,
	min: 2,
	max: 8,
	rings: 2,
	objs:[
		auxl.citycube1AData,
		auxl.citycube1BData,
		auxl.citycube1CData,
		auxl.citycube1DData,
		auxl.citycube2AData,
		auxl.citycube2BData,
		auxl.citycube2CData,
		auxl.citycube2DData,
		auxl.citycube3AData,
		auxl.citycube3BData,
		auxl.citycube3CData,
		auxl.citycube3DData,
		auxl.citycube4AData,
		auxl.citycube4BData,
		auxl.citycube4CData,
		auxl.citycube4DData,
		auxl.citycube5AData,
		auxl.citycube5BData,
		auxl.citycube5CData,
		auxl.citycube5DData,
		auxl.citycube6AData,
		auxl.citycube6BData,
		auxl.citycube6CData,
		auxl.citycube6DData,
		auxl.citycube7AData,
		auxl.citycube7BData,
		auxl.citycube7CData,
		auxl.citycube7DData,
		auxl.citycube8AData,
		auxl.citycube8BData,
		auxl.citycube8CData,
		auxl.citycube8DData,
		//auxl.acubeBase1Data,
		//auxl.acubeBase2Data,
		//auxl.acubeBase3Data,
		//auxl.acubeBase4Data,
		//auxl.building1Data,
		//auxl.building2Data,
		//auxl.building3Data,
		//auxl.building4Data,
	],
	ranYPos: false,
	yPosFlex: 40,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 40,
	scaleFlexY: 160,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome1MediumData = {
	data: 'biome1MediumData',
	id: 'medium',
	type: 'med',
	radius: 100,
	min: 15,
	max: 25,
	rings: 3,
	objs:[
		auxl.citycube1AData,
		auxl.citycube1BData,
		auxl.citycube1CData,
		auxl.citycube1DData,
		auxl.citycube2AData,
		auxl.citycube2BData,
		auxl.citycube2CData,
		auxl.citycube2DData,
		auxl.citycube3AData,
		auxl.citycube3BData,
		auxl.citycube3CData,
		auxl.citycube3DData,
		auxl.citycube4AData,
		auxl.citycube4BData,
		auxl.citycube4CData,
		auxl.citycube4DData,
		auxl.citycube5AData,
		auxl.citycube5BData,
		auxl.citycube5CData,
		auxl.citycube5DData,
		auxl.citycube6AData,
		auxl.citycube6BData,
		auxl.citycube6CData,
		auxl.citycube6DData,
		auxl.citycube7AData,
		auxl.citycube7BData,
		auxl.citycube7CData,
		auxl.citycube7DData,
		auxl.citycube8AData,
		auxl.citycube8BData,
		auxl.citycube8CData,
		auxl.citycube8DData,
		//auxl.acubeBase1Data,
		//auxl.acubeBase2Data,
		//auxl.acubeBase3Data,
		//auxl.acubeBase4Data,
		//auxl.building1Data,
		//auxl.building2Data,
		//auxl.building3Data,
		//auxl.building4Data,
	],
	ranYPos: false,
	yPosFlex: 60,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 60,
	scaleFlexY: 240,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome1LargeData = {
	data: 'biome1LargeData',
	id: 'large',
	type: 'large',
	radius: 125,
	min: 7,
	max: 15,
	rings: 4,
	objs:[
		auxl.citycube1AData,
		auxl.citycube1BData,
		auxl.citycube1CData,
		auxl.citycube1DData,
		auxl.citycube2AData,
		auxl.citycube2BData,
		auxl.citycube2CData,
		auxl.citycube2DData,
		auxl.citycube3AData,
		auxl.citycube3BData,
		auxl.citycube3CData,
		auxl.citycube3DData,
		auxl.citycube4AData,
		auxl.citycube4BData,
		auxl.citycube4CData,
		auxl.citycube4DData,
		auxl.citycube5AData,
		auxl.citycube5BData,
		auxl.citycube5CData,
		auxl.citycube5DData,
		auxl.citycube6AData,
		auxl.citycube6BData,
		auxl.citycube6CData,
		auxl.citycube6DData,
		auxl.citycube7AData,
		auxl.citycube7BData,
		auxl.citycube7CData,
		auxl.citycube7DData,
		auxl.citycube8AData,
		auxl.citycube8BData,
		auxl.citycube8CData,
		auxl.citycube8DData,
		//auxl.acubeBase1Data,
		//auxl.acubeBase2Data,
		//auxl.acubeBase3Data,
		//auxl.acubeBase4Data,
		//auxl.building1Data,
		//auxl.building2Data,
		//auxl.building3Data,
		//auxl.building4Data,
	],
	ranYPos: false,
	yPosFlex: 80,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 80,
	scaleFlexY: 320,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome1HugeData = {
	data: 'biome1HugeData',
	id: 'huge',
	type: 'huge',
	radius: 150,
	min: 10,
	max: 20,
	rings: 5,
	objs:[
		auxl.citycube1AData,
		auxl.citycube1BData,
		auxl.citycube1CData,
		auxl.citycube1DData,
		auxl.citycube2AData,
		auxl.citycube2BData,
		auxl.citycube2CData,
		auxl.citycube2DData,
		auxl.citycube3AData,
		auxl.citycube3BData,
		auxl.citycube3CData,
		auxl.citycube3DData,
		auxl.citycube4AData,
		auxl.citycube4BData,
		auxl.citycube4CData,
		auxl.citycube4DData,
		auxl.citycube5AData,
		auxl.citycube5BData,
		auxl.citycube5CData,
		auxl.citycube5DData,
		auxl.citycube6AData,
		auxl.citycube6BData,
		auxl.citycube6CData,
		auxl.citycube6DData,
		auxl.citycube7AData,
		auxl.citycube7BData,
		auxl.citycube7CData,
		auxl.citycube7DData,
		auxl.citycube8AData,
		auxl.citycube8BData,
		auxl.citycube8CData,
		auxl.citycube8DData,
		//auxl.acubeBase1Data,
		//auxl.acubeBase2Data,
		//auxl.acubeBase3Data,
		//auxl.acubeBase4Data,
		//auxl.building1Data,
		//auxl.building2Data,
		//auxl.building3Data,
		//auxl.building4Data,
	],
	ranYPos: false,
	yPosFlex: 100,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 100,
	scaleFlexY: 400,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome1Data = {
data:'biome1Data',
id:'biome',
maxRadius: 500,
style: 'tall',
tiny: auxl.biome1TinyData,
small: auxl.biome1SmallData,
med: auxl.biome1MediumData,
large: auxl.biome1LargeData,
huge: auxl.biome1HugeData,
};
auxl.biome1 = auxl.MultiAssetGen(auxl.biome1Data);



//Hands Testing
auxl.handsTesting0Data = {
data:'handsTesting0Data',
id:'handsTesting0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.5,},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#d6de06", emissive: '#d6de06', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(1,1.5,-4),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'sphere', mass: 0,},
	bodymaterial: {friction: 0, restitution: 0},
	//linkcable: {type: 'grab'},
	staticsync: {
		type: 'other',
		auxlObj: 'playerRig',
		offset: new THREE.Vector3(1,1.5,-4),
		sync: true,
	},
},
};
auxl.handsTesting0 = auxl.Core(auxl.handsTesting0Data);






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
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{

	},
	start:{
		biome1:{SpawnMultiAsset:null},
		//ramp1:{SpawnCore:null},
		//ramp2:{SpawnCore:null},
		//ramp3:{SpawnCore:null},
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
		//buildingLayer:{SpawnLayer:null},

		catwalk0Layer:{SpawnLayer:null},
		//baseTest0Layer:{SpawnLayer:null},

		//trampoline0:{SpawnCore:null},
		//trampoline1:{SpawnCore:null},
		//trampoline2:{SpawnCore:null},
		//trampoline3:{SpawnCore:null},
		//trampoline4:{SpawnCore:null},

		//building1:{SpawnCore:null},
		//building1Door:{SpawnCore:null},
		//building2:{SpawnCore:null},
		//building2Door:{SpawnCore:null},
		//building3:{SpawnCore:null},
		//building3Door:{SpawnCore:null},
		//building4:{SpawnCore:null},
		//building4Door:{SpawnCore:null},

		//ceiling0:{SpawnCore:null},
		//ceiling1:{SpawnCore:null},
		//ceiling2:{SpawnCore:null},
		//ceiling3:{SpawnCore:null},

		//boundingwall1:{SpawnCore:null},
		//boundingwall2:{SpawnCore:null},
		//boundingwall3:{SpawnCore:null},
		//boundingwall4:{SpawnCore:null},

		//dynamicTest0:{SpawnCore:null},
		//dynamicTest1:{SpawnCore:null},
		//dynamicTest2:{SpawnCore:null},
		//triggerTest1:{SpawnCore:null},
		//pickup1:{SpawnCore:null},
		//dynSpringA:{SpawnCore:null},
		//dynSpringB:{SpawnCore:null},

		oneTest0One:{SpawnOne:null},
		oneTest1One:{SpawnOne:null},
		oneTest2One:{SpawnOne:null},
	},
	delay:{
/*
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
		//action3Down:{auxlObj: 'player', func: 'LowGrav', name: 'Low Gravity', info: 'Lower Gravity.'},
		//action4Down:{auxlObj: 'player', func: 'PhysBoost', name: 'Vertical Boost', info: 'Fly upwards.'},
		//action5Down:{auxlObj: 'player', func: 'PhysJump', name: 'Jump', info: 'Jump Up'},
		//action5Down:{auxlObj: 'player', func: 'Delink', name: 'Detach Link Cable', info: 'Detach Link Cable'},
		//action7Up:{auxlObj: 'player', func: 'LinkUp', name: 'Increase Link Length', info: 'Increase Link Length'},
		//action7Down:{auxlObj: 'player', func: 'Freeze', name: 'Freeze Momentum', info: 'Stop in your tracks'},
		//action7Up:{auxlObj: 'player', func: 'UnFreeze', name: 'UnFreeze Momentum', info: 'Release'},
		//action6Down:{auxlObj: 'player', func: 'Slow', name: 'Slow Momentum', info: 'Stop in your tracks'},
		//action6Up:{auxlObj: 'player', func: 'UnSlow', name: 'UnSlow Momentum', info: 'Release'},
		//action8Up:{auxlObj: 'player', func: 'LinkDown', name: 'Decrease Link Length', info: 'Decrease Link Length'},
		//action7Down:{auxlObj: 'player', func: 'SnapLeft45', name: 'Snap View Left', info: 'Quick snap your view 45 degrees to the left.'},
		//action8Down:{auxlObj: 'player', func: 'SnapRight45', name: 'Snap View Right', info: 'Quick snap your view 45 degrees to the right.'},
		//action6Down:{auxlObj: 'linkHoverMenu', func: 'SpawnHoverMenu', name: 'Link Menu', info: 'Spawn Link Menu', params: 'true'},
		//action6Up:{auxlObj: 'linkHoverMenu', func: 'DespawnHoverMenu', name: 'Link Menu', info: 'Despawn Link Menu'},
		//action6Down:{auxlObj: 'uniRayTest1', func: 'Activate', name: 'UniTestStart', info: 'Switch to UniRay Test', params: 'true'},
		//action6Up:{auxlObj: 'uniRayTest1', func: 'Deactivate', name: 'UniTestStop', info: 'Disconnect from UniRay Test'},
		//action6Up:{auxlObj: 'uniRayTest1', func: 'Toggle', name: 'UniRayTesting', info: 'Toggle the UniRay Test'},

		//action3Down:{auxlObj: 'player', func: 'ToggleAction', params: '2', name: 'Teleport', info: 'Teleport Player'},
		//action3Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'TeleportDrop', info: 'Drop Teleport.'},


		action3Down:{auxlObj: 'player', func: 'ToggleAction', params: '5', name: 'BoostBack', info: 'Boost Dash Backwards in Space.'},
		action4Down:{auxlObj: 'player', func: 'ToggleAction', params: '4', name: 'Boost Build', info: 'Build a boost in your gaze direction to fly.'},
		action4Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Boost Stop', info: 'Drop Boost.'},

		action5Down:{auxlObj: 'player', func: 'Track2D', params: 0, name: 'Pick New Gravity Axis', info: 'Aim and drag along any face of a flat floor cube object to start detecting new Axis.'},
		//action7Down:{auxlObj: 'player', func: 'ToggleAction', params: '1', name: 'RubberbandSlam', info: 'Build Web Sling with rubberbands. Launch with main hold, build charge, release charge. Auto Stop on second into pull.'},
		//action7Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'RubberbandSlamDrop', info: 'Drop Web Sling.'},


		action6Down:{auxlObj: 'player', func: 'Freeze', params: 0, name: 'Freeze', info: 'Freeze mid-air.'},
		action6Up:{auxlObj: 'player', func: 'UnFreeze', params: false, name: 'UnFreeze', info: 'UnFreeze mid-air.'},
		action7Down:{auxlObj: 'player', func: 'ToggleAction', params: '3', name: 'Parachute', info: 'Open a parachute to float downward.'},
		action7Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Parachute', info: 'Close parachute.'},
		action8Down:{auxlObj: 'player', func: 'ToggleAction', params: '0', name: 'Rubberband', info: 'Build Web Sling with rubberbands. Launch with main hold, build charge, release charge.'},
		action8Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'RubberbandDrop', info: 'Drop Web Sling.'},
	},
	start:{
		skyBox1:{SpawnSkyBox: null},
		//comp:{SpawnComp: null},
		physicalFloor:{SpawnCore: null},
		//ramp1:{SpawnCore: null},
		mtnFloor:{SpawnCore: null},
		handsTesting0:{SpawnCore: null},
		//hills:{SpawnHorizon: null},
		//buildingsHorizon:{SpawnHorizon: null},
		//cylinderWallHorizon:{SpawnHorizon: null},
		//mountainsHorizon:{SpawnHorizon: null},



		//build:{SpawnBuild:null},
		//player:{SpawnUniRay:null},
playerRig:{PhysPos: new THREE.Vector3(0,50,1)},
		//uniRayTest1:{SpawnUniRay:null},
	},
	delay:{
		100:{
			skyBox1:{DayNightCycle: null},
		},
/*
		100:{
			skyBox0:{DayNightCycle: null},
		},

		100:{
			skyBox1:{SetTime: 10},
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