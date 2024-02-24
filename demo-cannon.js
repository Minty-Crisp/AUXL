//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('cannon-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Library

//kenney
auxl.pattern01 = './assets/img/tiles/kenney/pattern_01.png';
auxl.pattern02 = './assets/img/tiles/kenney/pattern_02.png';
auxl.pattern03 = './assets/img/tiles/kenney/pattern_03.png';
auxl.pattern04 = './assets/img/tiles/kenney/pattern_04.png';
auxl.pattern05 = './assets/img/tiles/kenney/pattern_05.png';
auxl.pattern06 = './assets/img/tiles/kenney/pattern_06.png';
auxl.pattern07 = './assets/img/tiles/kenney/pattern_07.png';
auxl.pattern08 = './assets/img/tiles/kenney/pattern_08.png';
auxl.pattern09 = './assets/img/tiles/kenney/pattern_09.png';
auxl.pattern10 = './assets/img/tiles/kenney/pattern_10.png';
auxl.pattern11 = './assets/img/tiles/kenney/pattern_11.png';
auxl.pattern12 = './assets/img/tiles/kenney/pattern_12.png';
auxl.pattern13 = './assets/img/tiles/kenney/pattern_13.png';
auxl.pattern14 = './assets/img/tiles/kenney/pattern_14.png';
auxl.pattern15 = './assets/img/tiles/kenney/pattern_15.png';
auxl.pattern16 = './assets/img/tiles/kenney/pattern_16.png';
auxl.pattern17 = './assets/img/tiles/kenney/pattern_17.png';
auxl.pattern18 = './assets/img/tiles/kenney/pattern_18.png';
auxl.pattern19 = './assets/img/tiles/kenney/pattern_19.png';
auxl.pattern20 = './assets/img/tiles/kenney/pattern_20.png';
auxl.pattern21 = './assets/img/tiles/kenney/pattern_21.png';
auxl.pattern22 = './assets/img/tiles/kenney/pattern_22.png';
auxl.pattern23 = './assets/img/tiles/kenney/pattern_23.png';
auxl.pattern24 = './assets/img/tiles/kenney/pattern_24.png';
auxl.pattern25 = './assets/img/tiles/kenney/pattern_25.png';
auxl.pattern26 = './assets/img/tiles/kenney/pattern_26.png';
auxl.pattern27 = './assets/img/tiles/kenney/pattern_27.png';
auxl.pattern28 = './assets/img/tiles/kenney/pattern_28.png';
auxl.pattern29 = './assets/img/tiles/kenney/pattern_29.png';
auxl.pattern30 = './assets/img/tiles/kenney/pattern_30.png';
auxl.pattern31 = './assets/img/tiles/kenney/pattern_31.png';
auxl.pattern32 = './assets/img/tiles/kenney/pattern_32.png';
auxl.pattern33 = './assets/img/tiles/kenney/pattern_33.png';
auxl.pattern34 = './assets/img/tiles/kenney/pattern_34.png';
auxl.pattern35 = './assets/img/tiles/kenney/pattern_35.png';
auxl.pattern36 = './assets/img/tiles/kenney/pattern_36.png';
auxl.pattern37 = './assets/img/tiles/kenney/pattern_37.png';
auxl.pattern38 = './assets/img/tiles/kenney/pattern_38.png';
auxl.pattern39 = './assets/img/tiles/kenney/pattern_39.png';
auxl.pattern40 = './assets/img/tiles/kenney/pattern_40.png';
auxl.pattern41 = './assets/img/tiles/kenney/pattern_41.png';
auxl.pattern42 = './assets/img/tiles/kenney/pattern_42.png';
auxl.pattern43 = './assets/img/tiles/kenney/pattern_43.png';
auxl.pattern44 = './assets/img/tiles/kenney/pattern_44.png';
auxl.pattern45 = './assets/img/tiles/kenney/pattern_45.png';
auxl.pattern46 = './assets/img/tiles/kenney/pattern_46.png';
auxl.pattern47 = './assets/img/tiles/kenney/pattern_47.png';
auxl.pattern48 = './assets/img/tiles/kenney/pattern_48.png';
auxl.pattern49 = './assets/img/tiles/kenney/pattern_49.png';
auxl.pattern50 = './assets/img/tiles/kenney/pattern_50.png';
auxl.pattern51 = './assets/img/tiles/kenney/pattern_51.png';
auxl.pattern52 = './assets/img/tiles/kenney/pattern_52.png';
auxl.pattern53 = './assets/img/tiles/kenney/pattern_53.png';
auxl.pattern54 = './assets/img/tiles/kenney/pattern_54.png';
auxl.pattern55 = './assets/img/tiles/kenney/pattern_55.png';
auxl.pattern56 = './assets/img/tiles/kenney/pattern_56.png';
auxl.pattern57 = './assets/img/tiles/kenney/pattern_57.png';
auxl.pattern58 = './assets/img/tiles/kenney/pattern_58.png';
auxl.pattern59 = './assets/img/tiles/kenney/pattern_59.png';
auxl.pattern60 = './assets/img/tiles/kenney/pattern_60.png';
auxl.pattern61 = './assets/img/tiles/kenney/pattern_61.png';
auxl.pattern62 = './assets/img/tiles/kenney/pattern_62.png';
auxl.pattern63 = './assets/img/tiles/kenney/pattern_63.png';
auxl.pattern64 = './assets/img/tiles/kenney/pattern_64.png';
auxl.pattern65 = './assets/img/tiles/kenney/pattern_65.png';
auxl.pattern66 = './assets/img/tiles/kenney/pattern_66.png';
auxl.pattern67 = './assets/img/tiles/kenney/pattern_67.png';
auxl.pattern68 = './assets/img/tiles/kenney/pattern_68.png';
auxl.pattern69 = './assets/img/tiles/kenney/pattern_69.png';
auxl.pattern70 = './assets/img/tiles/kenney/pattern_70.png';
auxl.pattern71 = './assets/img/tiles/kenney/pattern_71.png';
auxl.pattern72 = './assets/img/tiles/kenney/pattern_72.png';
auxl.pattern73 = './assets/img/tiles/kenney/pattern_73.png';
auxl.pattern74 = './assets/img/tiles/kenney/pattern_74.png';
auxl.pattern75 = './assets/img/tiles/kenney/pattern_75.png';
auxl.pattern76 = './assets/img/tiles/kenney/pattern_76.png';
auxl.pattern77 = './assets/img/tiles/kenney/pattern_77.png';
auxl.pattern78 = './assets/img/tiles/kenney/pattern_78.png';
auxl.pattern79 = './assets/img/tiles/kenney/pattern_79.png';
auxl.pattern80 = './assets/img/tiles/kenney/pattern_80.png';
auxl.pattern81 = './assets/img/tiles/kenney/pattern_81.png';
auxl.pattern82 = './assets/img/tiles/kenney/pattern_82.png';
auxl.pattern83 = './assets/img/tiles/kenney/pattern_83.png';
auxl.pattern84 = './assets/img/tiles/kenney/pattern_84.png';

auxl.patterns = [auxl.pattern01,auxl.pattern02,auxl.pattern03,auxl.pattern04,auxl.pattern05,auxl.pattern06,auxl.pattern07,auxl.pattern08,auxl.pattern09,auxl.pattern10,auxl.pattern11,auxl.pattern12,auxl.pattern13,auxl.pattern14,auxl.pattern15,auxl.pattern16,auxl.pattern17,auxl.pattern18,auxl.pattern19,auxl.pattern20,auxl.pattern21,auxl.pattern22,auxl.pattern23,auxl.pattern24,auxl.pattern25,auxl.pattern26,auxl.pattern27,auxl.pattern28,auxl.pattern29,auxl.pattern30,auxl.pattern31,auxl.pattern32,auxl.pattern33,auxl.pattern34,auxl.pattern35,auxl.pattern36,auxl.pattern37,auxl.pattern38,auxl.pattern39,auxl.pattern40,auxl.pattern41,auxl.pattern42,auxl.pattern43,auxl.pattern44,auxl.pattern45,auxl.pattern46,auxl.pattern47,auxl.pattern48,auxl.pattern49,auxl.pattern50,auxl.pattern51,auxl.pattern52,auxl.pattern53,auxl.pattern54,auxl.pattern55,auxl.pattern56,auxl.pattern57,auxl.pattern58,auxl.pattern59,auxl.pattern60,auxl.pattern61,auxl.pattern62,auxl.pattern63,auxl.pattern64,auxl.pattern65,auxl.pattern66,auxl.pattern67,auxl.pattern68,auxl.pattern69,auxl.pattern70,auxl.pattern71,auxl.pattern72,auxl.pattern73,auxl.pattern74,auxl.pattern75,auxl.pattern76,auxl.pattern77,auxl.pattern78,auxl.pattern79,auxl.pattern80,auxl.pattern81,auxl.pattern82,auxl.pattern83,auxl.pattern84];

//Planet
auxl.planetData = {
data:'planetData',
id:'planet1',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 400, segmentsWidth: 200, segmentsHeight: 200,},
material: {shader: "standard", src: auxl.pattern30, repeat: '10 10', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,-410,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	//['static-body']: null,
	body:{type: 'static', shape: 'sphere', mass: 0,},
	bodymaterial: {friction: 0.05, restitution: 0.001},
},
};
auxl.planet1 = auxl.Core(auxl.planetData);

//Planet Building 0
auxl.planetBuilding0Data = {
data:'planetBuilding0Data',
id:'planetBuilding0',
geometry: {primitive: 'box', width: 20, depth: 20, height: 960},
material: {shader: "standard", color: "#29b1c3", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b1c3", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern74, repeat: '10 480'},
position: new THREE.Vector3(0,-410,0),
rotation: new THREE.Vector3(5,5,5),
scale: new THREE.Vector3(1,1,1),
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.planetBuilding0 = auxl.Core(auxl.planetBuilding0Data);
//Planet Building 1
auxl.planetBuilding1Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding1', rotation: new THREE.Vector3(-5,-5,-5)}, true);
auxl.planetBuilding1 = auxl.Core(auxl.planetBuilding1Data);
//Planet Building 2
auxl.planetBuilding2Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding2', rotation: new THREE.Vector3(-15,15,15)}, true);
auxl.planetBuilding2 = auxl.Core(auxl.planetBuilding2Data);
//Planet Building 3
auxl.planetBuilding3Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding3', rotation: new THREE.Vector3(15,-15,-15)}, true);
auxl.planetBuilding3 = auxl.Core(auxl.planetBuilding3Data);
//Planet Building 4
auxl.planetBuilding4Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding4', rotation: new THREE.Vector3(-35,35,35)}, true);
auxl.planetBuilding4 = auxl.Core(auxl.planetBuilding4Data);
//Planet Building 5
auxl.planetBuilding5Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding5', rotation: new THREE.Vector3(35,-35,-35)}, true);
auxl.planetBuilding5 = auxl.Core(auxl.planetBuilding5Data);
//Planet Building 6
auxl.planetBuilding6Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding6', rotation: new THREE.Vector3(55,55,55)}, true);
auxl.planetBuilding6 = auxl.Core(auxl.planetBuilding6Data);
//Planet Building 7
auxl.planetBuilding7Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding7', rotation: new THREE.Vector3(-55,-55,-55)}, true);
auxl.planetBuilding7 = auxl.Core(auxl.planetBuilding7Data);
//Planet Building 8
auxl.planetBuilding8Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding8', rotation: new THREE.Vector3(-60,60,60)}, true);
auxl.planetBuilding8 = auxl.Core(auxl.planetBuilding8Data);
//Planet Building 9
auxl.planetBuilding9Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding9', rotation: new THREE.Vector3(60,-60,-60)}, true);
auxl.planetBuilding9 = auxl.Core(auxl.planetBuilding9Data);
//Planet Building 10
auxl.planetBuilding10Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding10', rotation: new THREE.Vector3(20,-20,20)}, true);
auxl.planetBuilding10 = auxl.Core(auxl.planetBuilding10Data);
//Planet Building 11
auxl.planetBuilding11Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding11', rotation: new THREE.Vector3(-20,20,-20)}, true);
auxl.planetBuilding11 = auxl.Core(auxl.planetBuilding11Data);
//Planet Building 12
auxl.planetBuilding12Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding12', rotation: new THREE.Vector3(45,-45,45)}, true);
auxl.planetBuilding12 = auxl.Core(auxl.planetBuilding12Data);
//Planet Building 13
auxl.planetBuilding13Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding13', rotation: new THREE.Vector3(-45,45,-45)}, true);
auxl.planetBuilding13 = auxl.Core(auxl.planetBuilding13Data);


//Planet Building 14
auxl.planetBuilding14Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding14', rotation: new THREE.Vector3(25,25,-25)}, true);
auxl.planetBuilding14 = auxl.Core(auxl.planetBuilding14Data);
//Planet Building 15
auxl.planetBuilding15Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding15', rotation: new THREE.Vector3(-25,-25,25)}, true);
auxl.planetBuilding15 = auxl.Core(auxl.planetBuilding15Data);
//Planet Building 16
auxl.planetBuilding16Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding16', rotation: new THREE.Vector3(50,50,-50)}, true);
auxl.planetBuilding16 = auxl.Core(auxl.planetBuilding16Data);
//Planet Building 17
auxl.planetBuilding17Data = auxl.CoreDataFromTemplate(auxl.planetBuilding0Data, {id: 'planetBuilding17', rotation: new THREE.Vector3(-50,-50,50)}, true);
auxl.planetBuilding17 = auxl.Core(auxl.planetBuilding17Data);





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

//Build
//auxl.build = auxl.BuildIn3D();

//Testing One Phys Object
/*
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
auxl.oneTest1 = auxl.CoreFromTemplate(auxl.oneTest0,{id: 'oneTest1', geometry: {primitive: 'sphere', radius: 4}, material: {shader: "standard", color: "#29b479", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#29b479", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'}, position: new THREE.Vector3(10,30,0)}, true);
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
auxl.oneTest2 = auxl.CoreFromTemplate(auxl.oneTest0,{id: 'oneTest2', geometry: {primitive: 'cylinder', height:4, radius:4, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:0, thetaLength:360}, material: {shader: "standard", color: "#1193f2", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1193f2", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'}, position: new THREE.Vector3(-10,30,0)}, true);
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
*/

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
	scale: new THREE.Vector3(8,8,8),
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

//Mountains
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


//Physical Floor
auxl.physicalFloorData = {
data:'physicalFloorData',
id:'physicalFloor',
sources:false,
text: false,
geometry: {primitive: 'box', width: 4000, depth: 4000, height: 50},
material:{shader: "standard", color: "#000000", opacity: 0, },
position: new THREE.Vector3(0,-25,0),
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
	bodymaterial: {friction: 0.01, restitution: 100},
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

auxl.catwalk0 = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0', geometry: false, material: false, components: false, position: new THREE.Vector3(-55,199.5,-25)}, true);
auxl.catwalk0A = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0A', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(-25,0,0)}, true);
auxl.catwalk0B = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0B', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(25,0,0)}, true);
auxl.catwalk0C = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0C', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,-25)}, true);
auxl.catwalk0D = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0D', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,25)}, true);


auxl.catwalk0LayerData = {
	parent: {core: auxl.catwalk0},
	child0: {core: auxl.catwalk0A},
	child1: {core: auxl.catwalk0B},
	child2: {core: auxl.catwalk0C},
	child3: {core: auxl.catwalk0D},
}
auxl.catwalk0Layer = auxl.Layer('catwalk0Layer', auxl.catwalk0LayerData);

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

auxl.buildingBaseTest0 = auxl.CoreFromTemplate(auxl.buildingBase,{id: 'buildingBaseTest0', position: new THREE.Vector3(-80,50,80)}, true);

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

auxl.buildingBaseDoorwayTest0 = auxl.CoreFromTemplate(auxl.buildingBaseDoorway,{id: 'buildingBaseDoorwayTest0', position: new THREE.Vector3(5.5,-50,0)}, true);

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
	bodymaterial: {friction: 0.01, restitution: 100},
},
};
auxl.slideBase = auxl.Core(auxl.slideBaseData);

auxl.slideBaseTest0 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(6.35,-49.5,0), rotation: new THREE.Vector3(0,0,-20)}, true);
auxl.slideBaseTest1 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(-6.35,-49.5,0), rotation: new THREE.Vector3(0,0,20)}, true);
auxl.slideBaseTest2 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-49.5,6.35), rotation: new THREE.Vector3(20,0,0)}, true);
auxl.slideBaseTest3 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-49.5,-6.35), rotation: new THREE.Vector3(-20,0,0)}, true);

//Flip Side
auxl.flipBaseData = {
data:'flipBaseData',
id:'flipBaseData',
sources:false,
text: false,
geometry: {primitive: 'box', width: 20, depth: 5, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.8, side: 'front', src: auxl.pattern49, repeat: '6 1'},
position: new THREE.Vector3(6,5.01,0),
rotation: new THREE.Vector3(0,0,-5),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 125},
},
};
auxl.flipBase = auxl.Core(auxl.flipBaseData);

auxl.flipBaseTest0 = auxl.CoreFromTemplate(auxl.flipBase,{id: 'flipBaseTest0'}, true);

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
	bodymaterial: {friction: 0.01, restitution: 50},
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

auxl.trampolineTopBlockTest0 = auxl.CoreFromTemplate(auxl.trampolineTop,{id: 'trampolineTopBlockTest0'}, true);
auxl.trampolineTopBlockTest1 = auxl.CoreFromTemplate(auxl.trampolineTopBlock,{id: 'trampolineTopBlockTest1'}, true);

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

//
//4 Buildings Example

//TrampolineBuilding
auxl.trampoline0Data = {
data:'trampoline0Data',
id:'trampoline0',
sources:false,
text: false,
geometry: {primitive: 'box', width: 7, depth: 7, height: 0.01},
material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 50},
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
position: new THREE.Vector3(25,5,0),
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
position: new THREE.Vector3(25,10.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 50},
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
position: new THREE.Vector3(22,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:25, y:11, z:0},
	hovertext:{value: 'Building Top',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
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
position: new THREE.Vector3(-25,10,0),
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
position: new THREE.Vector3(-25,20.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 50},
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
position: new THREE.Vector3(-22,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:-25, y:21, z:0},
	hovertext:{value: 'Building Top',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
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
position: new THREE.Vector3(0,15,-25),
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
position: new THREE.Vector3(0,30.1,-25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 50},
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
position: new THREE.Vector3(0,1,-22),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:31, z:-25},
	hovertext:{value: 'Building Top',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
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
position: new THREE.Vector3(0,20,25),
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
position: new THREE.Vector3(0,40.1,25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 50},
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
position: new THREE.Vector3(0,1,22),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	['teleportation-to']: {x:0, y:41, z:25},
	hovertext:{value: 'Building Top',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
},
};
auxl.building4Door = auxl.Core(auxl.building4DoorData);


//Room

//Ceiling 1
auxl.ceiling1Data = {
data:'ceiling1Data',
id:'ceiling1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 250, depth: 250, height: 5},
material: {shader: "standard", color: "#29c329", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#29c329", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(0,125,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
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
geometry: {primitive: 'box', width: 250, depth: 250, height: 5},
material: {shader: "standard", color: "#c32935", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#c32935", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(0,-125,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
	//linkcable: {type: 'to'},
},
};
auxl.ceiling2 = auxl.Core(auxl.ceiling2Data);


//Bounding Wall 1
auxl.boundingwall1Data = {
data:'boundingwall1Data',
id:'boundingwall1',
sources:false,
text: false,
geometry: {primitive: 'box', width: 250, depth: 5, height: 250},
material: {shader: "standard", color: "#c38e29", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#c38e29", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(0,0,-125),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
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
geometry: {primitive: 'box', width: 250, depth: 5, height: 250},
material: {shader: "standard", color: "#296ac3", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#296ac3", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(0,0,125),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
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
geometry: {primitive: 'box', width: 5, depth: 250, height: 250},
material: {shader: "standard", color: "#d8d810", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#d8d810", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(-125,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
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
geometry: {primitive: 'box', width: 5, depth: 250, height: 250},
material: {shader: "standard", color: "#c3299f", opacity: 1, metalness: 0, roughness: 0.8, emissive: "#c3299f", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern74, repeat: '25 25'},
position: new THREE.Vector3(125,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
	body:{type: 'static', shape: 'box', mass: 0,},
	bodymaterial: {friction: 0.01, restitution: 0.005},
	//linkcable: {type: 'to'},
},
};
auxl.boundingwall4 = auxl.Core(auxl.boundingwall4Data);


//
//Dynamic

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
classes: ['a-ent'],
components: {
	body:{type: 'dynamic', shape: 'box', mass: 2, linearDamping: 0.01,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.dynamicTest0 = auxl.Core(auxl.dynamicTest0Data);


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
	body:{type: 'dynamic', shape: 'box', mass: 0.25, linearDamping: 0.01,},
	bodymaterial: {friction: 0.01, restitution: 0.01},
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
	body:{type: 'dynamic', shape: 'sphere', mass: 2, linearDamping: 0.01,},
	bodymaterial: {friction: 0.01, restitution: 1},
},
};
auxl.dynamicTest2 = auxl.Core(auxl.dynamicTest2Data);

//Balls

//Ball0
auxl.ballTest0Data = {
	data:'ballTest0Data',
	id:'ballTest0',
	geometry: {primitive: 'sphere', radius: 0.35},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 0.5,},
		bodymaterial: {friction: 0.01, restitution: 3},
	},
};
auxl.balls0RingData = {
	id: 'balls0Ring',
	objData: auxl.ballTest0Data,
	total: 20,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.balls0Ring = auxl.ObjsGenRing(auxl.balls0RingData);
//Ring
auxl.cityBallTest0Data = auxl.CoreDataFromTemplate(auxl.ballTest0Data, {id: 'cityBallTest0', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBalls0RingData = {
	id: 'cityBalls0Ring',
	objData: auxl.cityBallTest0Data,
	total: 20,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBalls0Ring = auxl.ObjsGenRing(auxl.cityBalls0RingData);

//Ball 1
auxl.ballTest1Data = {
	data:'ballTest1Data',
	id:'ballTest1',
	geometry: {primitive: 'sphere', radius: 1},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 1,},
		bodymaterial: {friction: 0.01, restitution: 2},
	},
};
auxl.balls1RingData = {
	id: 'balls1Ring',
	objData: auxl.ballTest1Data,
	total: 10,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.balls1Ring = auxl.ObjsGenRing(auxl.balls1RingData);
//Ring
auxl.cityBallTest1Data = auxl.CoreDataFromTemplate(auxl.ballTest1Data, {id: 'cityBallTest1', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBalls1RingData = {
	id: 'cityBalls1Ring',
	objData: auxl.cityBallTest1Data,
	total: 10,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBalls1Ring = auxl.ObjsGenRing(auxl.cityBalls1RingData);

//Ball 2
auxl.ballTest2Data = {
	data:'ballTest2Data',
	id:'ballTest2',
	geometry: {primitive: 'sphere', radius: 3},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 2,},
		bodymaterial: {friction: 0.01, restitution: 1},
	},
};
auxl.balls2RingData = {
	id: 'balls2Ring',
	objData: auxl.ballTest2Data,
	total: 5,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.balls2Ring = auxl.ObjsGenRing(auxl.balls2RingData);
//Ring
auxl.cityBallTest2Data = auxl.CoreDataFromTemplate(auxl.ballTest2Data, {id: 'cityBallTest2', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBalls2RingData = {
	id: 'cityBalls2Ring',
	objData: auxl.cityBallTest2Data,
	total: 5,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBalls2Ring = auxl.ObjsGenRing(auxl.cityBalls2RingData);

//Boxes

//Ball0
auxl.boxTest0Data = {
	data:'boxTest0Data',
	id:'boxTest0',
	geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 0.5,},
		bodymaterial: {friction: 0.01, restitution: 3},
	},
};
auxl.boxes0RingData = {
	id: 'boxes0Ring',
	objData: auxl.boxTest0Data,
	total: 20,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.boxes0Ring = auxl.ObjsGenRing(auxl.boxes0RingData);
//Ring
auxl.cityBoxTest0Data = auxl.CoreDataFromTemplate(auxl.boxTest0Data, {id: 'cityBoxTest0', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBoxes0RingData = {
	id: 'cityBoxes0Ring',
	objData: auxl.cityBoxTest0Data,
	total: 20,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBoxes0Ring = auxl.ObjsGenRing(auxl.cityBoxes0RingData);

//Box 1
auxl.boxTest1Data = {
	data:'boxTest1Data',
	id:'boxTest1',
	geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 1,},
		bodymaterial: {friction: 0.01, restitution: 2},
	},
};
auxl.boxes1RingData = {
	id: 'boxes1Ring',
	objData: auxl.boxTest1Data,
	total: 10,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.boxes1Ring = auxl.ObjsGenRing(auxl.boxes1RingData);
//Ring
auxl.cityBoxTest1Data = auxl.CoreDataFromTemplate(auxl.boxTest1Data, {id: 'cityBoxTest1', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBoxes1RingData = {
	id: 'cityBoxes1Ring',
	objData: auxl.cityBoxTest1Data,
	total: 10,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBoxes1Ring = auxl.ObjsGenRing(auxl.cityBoxes1RingData);

//Box 2
auxl.boxTest2Data = {
	data:'boxTest2Data',
	id:'boxTest2',
	geometry: {primitive: 'box', depth: 3, width: 3, height: 3},
	material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,-50,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		body:{type: 'dynamic', shape: 'sphere', mass: 2,},
		bodymaterial: {friction: 0.01, restitution: 1},
	},
};
auxl.boxes2RingData = {
	id: 'boxes2Ring',
	objData: auxl.boxTest2Data,
	total: 5,
	outerRingRadius: 100,
	innerRingRadius: 10,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.boxes2Ring = auxl.ObjsGenRing(auxl.boxes2RingData);
//Ring
auxl.cityBoxTest2Data = auxl.CoreDataFromTemplate(auxl.boxTest2Data, {id: 'cityBoxTest2', position: new THREE.Vector3(0,400,0),}, true);
auxl.cityBoxes2RingData = {
	id: 'cityBoxes2Ring',
	objData: auxl.cityBoxTest2Data,
	total: 5,
	outerRingRadius: 300,
	innerRingRadius: 40,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 600,
	ranScaleX: false,
	ranScaleY: false,
	ranScaleZ: false,
	scaleFlex: 3,
	ranRotX: false,
	ranRotY: false,
	ranRotZ: false,
	ranColor: true,
	ranTexture: true,
};
auxl.cityBoxes2Ring = auxl.ObjsGenRing(auxl.cityBoxes2RingData);

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
	['trigger']:{
		cursorObj: 'player',
		component: 'null',
		method: 'TestFunc',
		params: 'target',
	},
},
};
auxl.triggerTest1 = auxl.Core(auxl.triggerTest1Data);

//Trigger : Axis 0
auxl.triggerAxis0Data = {
data:'triggerAxis0Data',
id:'triggerAxis0',
geometry: {primitive: 'box', depth: 10, width: 10, height: 10},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#FFF", emissive: '#FFF', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(30,0,30),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityTypes',
		params: '0',
	},
},
};
auxl.triggerAxis0 = auxl.Core(auxl.triggerAxis0Data);

//Trigger : Axis 1
auxl.triggerAxis1Data = {
data:'triggerAxis1Data',
id:'triggerAxis1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 10, width: 10, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#c32935", emissive: '#c32935', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-20,122.1,20),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 1,
	},
},
};
auxl.triggerAxis1 = auxl.Core(auxl.triggerAxis1Data);
//Trigger : Axis 2
auxl.triggerAxis2Data = {
data:'triggerAxis2Data',
id:'triggerAxis2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 10, width: 10, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#29c329", emissive: '#29c329', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(20,-121.9,-20),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 2,
	},
},
};
auxl.triggerAxis2 = auxl.Core(auxl.triggerAxis2Data);
//Trigger : Axis 3
auxl.triggerAxis3Data = {
data:'triggerAxis3Data',
id:'triggerAxis3',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 10, width: 1, height: 10},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#d8d810", emissive: '#d8d810', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(122.1,20,-20),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 3,
	},
},
};
auxl.triggerAxis3 = auxl.Core(auxl.triggerAxis3Data);
//Trigger : Axis 4
auxl.triggerAxis4Data = {
data:'triggerAxis4Data',
id:'triggerAxis4',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 10, width: 1, height: 10},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#c3299f", emissive: '#c3299f', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-121.9,-20,20),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 4,
	},
},
};
auxl.triggerAxis4 = auxl.Core(auxl.triggerAxis4Data);
//Trigger : Axis 5
auxl.triggerAxis5Data = {
data:'triggerAxis5Data',
id:'triggerAxis5',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 10, height: 10},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#c38e29", emissive: '#c38e29', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(20,-20,122.1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 5,
	},
},
};
auxl.triggerAxis5 = auxl.Core(auxl.triggerAxis5Data);
//Trigger : Axis 6
auxl.triggerAxis6Data = {
data:'triggerAxis6Data',
id:'triggerAxis6',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 10, height: 10},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#296ac3", emissive: '#296ac3', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-20,20,-121.9),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	['static-body']:null,
	['mousedownrun']:{
		cursorObj: 'player',
		component: 'null',
		method: 'setAllGravityAxis',
		params: 6,
	},
},
};
auxl.triggerAxis6 = auxl.Core(auxl.triggerAxis6Data);

//
//Constraints


//Point to Point - 1
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

//Distance - 2
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

//
//Springs - 3
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

//Lock - 4
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


//Hinge - 5
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


//Cone Twist - 6
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

//
//Ramp Testing
auxl.ramp1Data = {
data:'ramp1Data',
id:'ramp1',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 50},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#39a55a", emissive: '#39a55a', emissiveIntensity: 0.25, opacity: 1, side: 'double'},
position: new THREE.Vector3(0,10,-100),
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
position: new THREE.Vector3(20,10,-100),
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
position: new THREE.Vector3(-20,10,-100),
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube1AData = auxl.CoreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube1BData = auxl.CoreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube1CData = auxl.CoreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube1DData = auxl.CoreDataFromTemplate(auxl.citycube1Data, {id: 'citycube1D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube2AData = auxl.CoreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube2BData = auxl.CoreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube2CData = auxl.CoreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube2DData = auxl.CoreDataFromTemplate(auxl.citycube2Data, {id: 'citycube2D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube3AData = auxl.CoreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube3BData = auxl.CoreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube3CData = auxl.CoreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube3DData = auxl.CoreDataFromTemplate(auxl.citycube3Data, {id: 'citycube3D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube4AData = auxl.CoreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube4BData = auxl.CoreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube4CData = auxl.CoreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube4DData = auxl.CoreDataFromTemplate(auxl.citycube4Data, {id: 'citycube4D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube5AData = auxl.CoreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube5BData = auxl.CoreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube5CData = auxl.CoreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube5DData = auxl.CoreDataFromTemplate(auxl.citycube5Data, {id: 'citycube5D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube6AData = auxl.CoreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube6BData = auxl.CoreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube6CData = auxl.CoreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube6DData = auxl.CoreDataFromTemplate(auxl.citycube6Data, {id: 'citycube6D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};
auxl.citycube7AData = auxl.CoreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube7BData = auxl.CoreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube7CData = auxl.CoreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube7DData = auxl.CoreDataFromTemplate(auxl.citycube7Data, {id: 'citycube7D', rotation: new THREE.Vector3(0,270,0),}, true);
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
		emissives:[0.5,0.5,1,],
		repeats:['1 1','1 1','1 1',],
	 },
	body:{type: 'static', shape: 'none', mass: 0,},
	shape:{shape: 'box', halfExtents: '1 1 1', offset: '0 0 0',},
	bodymaterial: {friction: 0.01, restitution: 0.01},
},
};

auxl.citycube8AData = auxl.CoreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8A', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.citycube8BData = auxl.CoreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8B', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.citycube8CData = auxl.CoreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8C', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.citycube8DData = auxl.CoreDataFromTemplate(auxl.citycube8Data, {id: 'citycube8D', rotation: new THREE.Vector3(0,270,0),}, true);


//City
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
id:'biome1',
maxRadius: 700,
style: 'tall',
tiny: auxl.biome1TinyData,
small: auxl.biome1SmallData,
med: auxl.biome1MediumData,
large: auxl.biome1LargeData,
huge: auxl.biome1HugeData,
ring: {
	i0:75,
	o0:700,
	i1:150,
	o1:700,
	i2:200,
	o2:700,
	i3:325,
	o3:700,
	i4:350,
	o4:700,
	i5:375,
	o5:700,
},
};
auxl.biome1 = auxl.MultiAssetGen(auxl.biome1Data);

auxl.biome2TinyData = {
	data: 'biome2TinyData',
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
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome2SmallData = {
	data: 'biome2SmallData',
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
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome2MediumData = {
	data: 'biome2MediumData',
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
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome2LargeData = {
	data: 'biome2LargeData',
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
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome2HugeData = {
	data: 'biome2HugeData',
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
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.biome2Data = {
data:'biome2Data',
id:'biome2',
maxRadius: 700,
style: 'tall',
tiny: auxl.biome2TinyData,
small: auxl.biome2SmallData,
med: auxl.biome2MediumData,
large: auxl.biome2LargeData,
huge: auxl.biome2HugeData,
ring: {
	i0:75,
	o0:700,
	i1:150,
	o1:700,
	i2:200,
	o2:700,
	i3:325,
	o3:700,
	i4:350,
	o4:700,
	i5:375,
	o5:700,
},
};
auxl.biome2 = auxl.MultiAssetGen(auxl.biome2Data);


//Hands Testing
auxl.handsTesting0Data = {
data:'handsTesting0Data',
id:'handsTesting0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.5,},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#d6de06", emissive: '#d6de06', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(5,5,-5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
/*
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
},*/
};
auxl.handsTesting0 = auxl.Core(auxl.handsTesting0Data);
//auxl.handsTesting0.SpawnCore()

//.worldToLocal ( vector : Vector3 ) : Vector3
//let playRigTest = auxl.playerRig.GetEl().object3D.worldToLocal(auxl.handsTesting0.GetEl().object3D.position);
//console.log(playRigTest)


//let timeout = setTimeout(() => {}, 1000);
//let interval = setInterval(() => {}, 1000);



//Build Scene Library Objects
auxl.buildCannonLibrary = () => {
	auxl.planet1 = auxl.Core(auxl.planetData);
	auxl.planetBuilding0 = auxl.Core(auxl.planetBuilding0Data);
	auxl.planetBuilding1 = auxl.Core(auxl.planetBuilding1Data);
	auxl.planetBuilding2 = auxl.Core(auxl.planetBuilding2Data);
	auxl.planetBuilding3 = auxl.Core(auxl.planetBuilding3Data);
	auxl.planetBuilding4 = auxl.Core(auxl.planetBuilding4Data);
	auxl.planetBuilding5 = auxl.Core(auxl.planetBuilding5Data);
	auxl.planetBuilding6 = auxl.Core(auxl.planetBuilding6Data);
	auxl.planetBuilding7 = auxl.Core(auxl.planetBuilding7Data);
	auxl.planetBuilding8 = auxl.Core(auxl.planetBuilding8Data);
	auxl.planetBuilding9 = auxl.Core(auxl.planetBuilding9Data);
	auxl.planetBuilding10 = auxl.Core(auxl.planetBuilding10Data);
	auxl.planetBuilding11 = auxl.Core(auxl.planetBuilding11Data);
	auxl.planetBuilding12 = auxl.Core(auxl.planetBuilding12Data);
	auxl.planetBuilding13 = auxl.Core(auxl.planetBuilding13Data);
	auxl.planetBuilding14 = auxl.Core(auxl.planetBuilding14Data);
	auxl.planetBuilding15 = auxl.Core(auxl.planetBuilding15Data);
	auxl.planetBuilding16 = auxl.Core(auxl.planetBuilding16Data);
	auxl.planetBuilding17 = auxl.Core(auxl.planetBuilding17Data);
	auxl.skyGrad1 = auxl.Core(auxl.skyGrad1Data);
	auxl.skyBox1 = auxl.SkyBox(auxl.skyBox1Data);
	auxl.mtnFloor = auxl.Core(auxl.mtnFloorData);
	auxl.hills = auxl.Horizon(auxl.hillsData);
	auxl.buildingsHorizon = auxl.Horizon(auxl.buildingsHorizonData);
	auxl.Horizon(auxl.circularWallHorizonData);
	auxl.mountainsHorizon = auxl.Horizon(auxl.mountainsHorizonData);
	auxl.cloud = auxl.Core(auxl.cloudData);
	auxl.physicalFloor = auxl.Core(auxl.physicalFloorData);
	auxl.trampoline = auxl.Core(auxl.trampolineData);
	auxl.wallBase = auxl.Core(auxl.wallBaseData);
	auxl.catwalk = auxl.Core(auxl.catwalk0Data);
	auxl.catwalk0 = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0', geometry: false, material: false, components: false, position: new THREE.Vector3(-55,199.5,-25)}, true);
	auxl.catwalk0A = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0A', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(-25,0,0)}, true);
	auxl.catwalk0B = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0B', geometry: {primitive: 'box', width: 10, height: 1, depth: 100},position: new THREE.Vector3(25,0,0)}, true);
	auxl.catwalk0C = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0C', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,-25)}, true);
	auxl.catwalk0D = auxl.CoreFromTemplate(auxl.catwalk,{id: 'catwalk0D', geometry: {primitive: 'box', width: 100, height: 1, depth: 10},position: new THREE.Vector3(0,-1,25)}, true);
	auxl.catwalk0Layer = auxl.Layer('catwalk0Layer', auxl.catwalk0LayerData);
	auxl.buildingBase = auxl.Core(auxl.buildingBaseData);
	auxl.buildingBaseTest0 = auxl.CoreFromTemplate(auxl.buildingBase,{id: 'buildingBaseTest0', position: new THREE.Vector3(-80,50,80)}, true);
	auxl.buildingBaseDoorway = auxl.Core(auxl.buildingBaseDoorwayData);
	auxl.buildingBaseDoorwayTest0 = auxl.CoreFromTemplate(auxl.buildingBaseDoorway,{id: 'buildingBaseDoorwayTest0', position: new THREE.Vector3(5.5,-50,0)}, true);
	auxl.slideBase = auxl.Core(auxl.slideBaseData);
	auxl.slideBaseTest0 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(6.35,-49.5,0), rotation: new THREE.Vector3(0,0,-20)}, true);
	auxl.slideBaseTest1 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', position: new THREE.Vector3(-6.35,-49.5,0), rotation: new THREE.Vector3(0,0,20)}, true);
	auxl.slideBaseTest2 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-49.5,6.35), rotation: new THREE.Vector3(20,0,0)}, true);
	auxl.slideBaseTest3 = auxl.CoreFromTemplate(auxl.slideBase,{id: 'slideBaseTest0', geometry: {primitive: 'box', width: 10, depth: 3, height: 0.01}, position: new THREE.Vector3(0,-49.5,-6.35), rotation: new THREE.Vector3(-20,0,0)}, true);
	auxl.flipBase = auxl.Core(auxl.flipBaseData);
	auxl.flipBaseTest0 = auxl.CoreFromTemplate(auxl.flipBase,{id: 'flipBaseTest0'}, true);
	auxl.trampolineTop = auxl.Core(auxl.trampolineTwistData);
	auxl.trampolineTopBlock = auxl.Core(auxl.trampolineTopBlockData);
	auxl.trampolineTopBlockTest0 = auxl.CoreFromTemplate(auxl.trampolineTop,{id: 'trampolineTopBlockTest0'}, true);
	auxl.trampolineTopBlockTest1 = auxl.CoreFromTemplate(auxl.trampolineTopBlock,{id: 'trampolineTopBlockTest1'}, true);
	auxl.baseTest0Layer = auxl.Layer('baseTest0Layer', auxl.baseTest0LayerData);
	auxl.trampoline0 = auxl.Core(auxl.trampoline0Data);
	auxl.building1 = auxl.Core(auxl.building1Data);
	auxl.trampoline1 = auxl.Core(auxl.trampoline1Data);
	auxl.building1Door = auxl.Core(auxl.building1DoorData);
	auxl.building2 = auxl.Core(auxl.building2Data);
	auxl.trampoline2 = auxl.Core(auxl.trampoline2Data);
	auxl.building2Door = auxl.Core(auxl.building2DoorData);
	auxl.building3 = auxl.Core(auxl.building3Data);
	auxl.trampoline3 = auxl.Core(auxl.trampoline3Data);
	auxl.building3Door = auxl.Core(auxl.building3DoorData);
	auxl.building4 = auxl.Core(auxl.building4Data);
	auxl.trampoline4 = auxl.Core(auxl.trampoline4Data);
	auxl.building4Door = auxl.Core(auxl.building4DoorData);
	auxl.ceiling1 = auxl.Core(auxl.ceiling1Data);
	auxl.ceiling2 = auxl.Core(auxl.ceiling2Data);
	auxl.boundingwall1 = auxl.Core(auxl.boundingwall1Data);
	auxl.boundingwall2 = auxl.Core(auxl.boundingwall2Data);
	auxl.boundingwall3 = auxl.Core(auxl.boundingwall3Data);
	auxl.boundingwall4 = auxl.Core(auxl.boundingwall4Data);
	auxl.dynamicTest0 = auxl.Core(auxl.dynamicTest0Data);
	auxl.dynamicTest1 = auxl.Core(auxl.dynamicTest1Data);
	auxl.dynamicTest2 = auxl.Core(auxl.dynamicTest2Data);
	auxl.balls0Ring = auxl.ObjsGenRing(auxl.balls0RingData);
	auxl.cityBalls0Ring = auxl.ObjsGenRing(auxl.cityBalls0RingData);
	auxl.balls1Ring = auxl.ObjsGenRing(auxl.balls1RingData);
	auxl.cityBalls1Ring = auxl.ObjsGenRing(auxl.cityBalls1RingData);
	auxl.balls2Ring = auxl.ObjsGenRing(auxl.balls2RingData);
	auxl.cityBalls2Ring = auxl.ObjsGenRing(auxl.cityBalls2RingData);
	auxl.boxes0Ring = auxl.ObjsGenRing(auxl.boxes0RingData);
	auxl.cityBoxes0Ring = auxl.ObjsGenRing(auxl.cityBoxes0RingData);
	auxl.boxes1Ring = auxl.ObjsGenRing(auxl.boxes1RingData);
	auxl.cityBoxes1Ring = auxl.ObjsGenRing(auxl.cityBoxes1RingData);
	auxl.boxes2Ring = auxl.ObjsGenRing(auxl.boxes2RingData);
	auxl.cityBoxes2Ring = auxl.ObjsGenRing(auxl.cityBoxes2RingData);
	auxl.triggerTest1 = auxl.Core(auxl.triggerTest1Data);
	auxl.triggerAxis0 = auxl.Core(auxl.triggerAxis0Data);
	auxl.triggerAxis1 = auxl.Core(auxl.triggerAxis1Data);
	auxl.triggerAxis2 = auxl.Core(auxl.triggerAxis2Data);
	auxl.triggerAxis3 = auxl.Core(auxl.triggerAxis3Data);
	auxl.triggerAxis4 = auxl.Core(auxl.triggerAxis4Data);
	auxl.triggerAxis5 = auxl.Core(auxl.triggerAxis5Data);
	auxl.triggerAxis6 = auxl.Core(auxl.triggerAxis6Data);
	auxl.ptp1a = auxl.Core(auxl.ptp1aData);
	auxl.ptp1b = auxl.Core(auxl.ptp1bData);
	auxl.distance1a = auxl.Core(auxl.distance1aData);
	auxl.distance1b = auxl.Core(auxl.distance1bData);
	auxl.spring1a = auxl.Core(auxl.spring1aData);
	auxl.spring1b = auxl.Core(auxl.spring1bData);
	auxl.lock1a = auxl.Core(auxl.lock1aData);
	auxl.lock1b = auxl.Core(auxl.lock1bData);
	auxl.hinge1a = auxl.Core(auxl.hinge1aData);
	auxl.hinge1b = auxl.Core(auxl.hinge1bData);
	auxl.coneTwist1a = auxl.Core(auxl.coneTwist1aData);
	auxl.coneTwist1b = auxl.Core(auxl.coneTwist1bData);
	auxl.pickup1 = auxl.Core(auxl.pickup1Data);
	auxl.dynSpringA = auxl.Core(auxl.dynSpringAData);
	auxl.dynSpringB = auxl.Core(auxl.dynSpringBData);
	auxl.ramp1 = auxl.Core(auxl.ramp1Data);
	auxl.ramp2 = auxl.Core(auxl.ramp2Data);
	auxl.ramp3 = auxl.Core(auxl.ramp3Data);
	auxl.biome1 = auxl.MultiAssetGen(auxl.biome1Data);
	auxl.biome2 = auxl.MultiAssetGen(auxl.biome2Data);
	auxl.handsTesting0 = auxl.Core(auxl.handsTesting0Data);
}
auxl.ToBeRebuilt('buildCannonLibrary');

},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('cannon-scenes', {
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
auxl.cannonZoneData = {
	info:{
		id: 'cannonZone',
		name: 'cannonZone',
		zoneNum: 0,
		start: 'cannonZoneSceneBasic',
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
//Zone Phys | Basic
auxl.cannonZoneSceneBasicData = {
	info:{
		id:'cannonZoneSceneBasic',
		name: 'Physics Basic',
		description: 'A basic scene to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos: 'other',
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
	},
	controls:{
		//Rubberband Sling
		action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '0', name: 'Rubberband', info: 'Build Web Sling with rubberbands. Tap for Pole Vault, Press for Swing or Hold to build launch charge.'},
		action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'RubberbandDrop', info: 'Activate Web Sling.'},
		//Brake
		action2Down:{auxlObj: 'player', func: 'BrakeDown', name: 'Brake On', info: 'Engage your physics brake. Slow self to a stop, double tap for quick stop.'},
		action2Up:{auxlObj: 'player', func: 'BrakeUp', name: 'Brake Off', info: 'Release your physics brake.'},
		//Shoot
		action3Down:{auxlObj: 'player', func: 'ToggleAction', params: '1', name: 'Shoot Charge Start', info: 'Start charging of Shoot ray.'},
		action3Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Shoot Charged Fire', info: 'Launch bullets from the Shoot ray from generated charge.'},
		//Cycle All Gravity Types
		action4Down:{auxlObj: 'player', func: 'cycleAllGravityTypes', name: 'Cycle All Gravity Types', info: 'Cycle through all 12 types such as the planets, sun, a few moons, float and custom.'},
	},
	start:{
		physicalFloor:{SpawnCore: null},
		mtnFloor:{SpawnCore: null},
		playerRig:{PhysPos: new THREE.Vector3(0,14,0),},
		player:{Freeze: null, setAllGravity: {axis: 1, type: 0}, LinkDistance:{distance: 8}, },
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

		catwalk0Layer:{SpawnLayer:null},
		baseTest0Layer:{SpawnLayer:null},

		trampoline0:{SpawnCore:null},
		trampoline1:{SpawnCore:null},
		trampoline2:{SpawnCore:null},
		trampoline3:{SpawnCore:null},
		trampoline4:{SpawnCore:null},
		building1:{SpawnCore:null},
		building1Door:{SpawnCore:null},
		building2:{SpawnCore:null},
		building2Door:{SpawnCore:null},
		building3:{SpawnCore:null},
		building3Door:{SpawnCore:null},
		building4:{SpawnCore:null},
		building4Door:{SpawnCore:null},

		dynamicTest0:{SpawnCore:null},
		dynamicTest1:{SpawnCore:null},
		dynamicTest2:{SpawnCore:null},
		//triggerTest1:{SpawnCore:null},
		pickup1:{SpawnCore:null},
		dynSpringA:{SpawnCore:null},
		dynSpringB:{SpawnCore:null},

		//oneTest0One:{SpawnOne:null},
		//oneTest1One:{SpawnOne:null},
		//oneTest2One:{SpawnOne:null},
	},
	delay:{
		500:{
			player:{UnFreeze:null,},
		},
		3000:{
			spring1b:{ChangeSelf:{property: 'auxspring', value:{restLength: 5}}},
		},
		10000:{
			dynSpringB:{ChangeSelf:{property: 'body', value:{type: 'static'}}},
		},
		13000:{
			dynSpringB:{ChangeSelf:{property: 'body', value:{type: 'dynamic'}}},
		},
		20000:{
			spring1b:{ChangeSelf:{property: 'auxspring', value:{restLength: 2}}},
		},
	},
	interval:{
		10000: {
			run: {
				lock1a:{ToggleSpawn: null},
				distance1a:{ToggleSpawn: null},
				ptp1a:{ToggleSpawn: null},
				coneTwist1a:{ToggleSpawn: null},
				hinge1a:{ToggleSpawn: null},
				spring1a:{ToggleSpawn: null},
			}, loop: 'infinite'
		},
	},
	event:{

	},
	interaction:{

	},
	exit:{
	},
	map:{
		data: auxl.cannonZoneData.cannonZoneSceneBasic,
	},
};
//Zone Phys | City
auxl.cannonZoneSceneCityData = {
	info:{
		id:'cannonZoneSceneCity',
		name: 'Physics City',
		description: 'A city scene to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos: 'other',
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
	},
	controls:{
		//Boost
		action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '4', name: 'Forward Boost Build', info: 'Build power for forward boost launch in the direction of your ray.'},
		action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Forward Boost Launch', info: 'Launch boost forward in the direction of your ray.'},
		//Brake
		action2Down:{auxlObj: 'player', func: 'BrakeDown', name: 'Brake On', info: 'Engage your physics brake. Slow self to a stop, double tap for quick stop.'},
		action2Up:{auxlObj: 'player', func: 'BrakeUp', name: 'Brake Off', info: 'Release your physics brake.'},
		//Shoot
		action3Down:{auxlObj: 'player', func: 'ToggleAction', params: '1', name: 'Shoot Charge Start', info: 'Start charging of Shoot ray.'},
		action3Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Shoot Charged Fire', info: 'Launch bullets from the Shoot ray from generated charge.'},
		//Parachute
		action4Down:{auxlObj: 'player', func: 'ChuteDown', name: 'Open Parachute', info: 'Open your chute to suspend falling with velocity and float down.'},
		action5Up:{auxlObj: 'player', func: 'ChuteUp', name: 'Close Parachute', info: 'Close your chute to resume falling with velocity and fall down.'},
	},
	start:{
		physicalFloor:{SpawnCore: null},
		mtnFloor:{SpawnCore: null},
		playerRig:{PhysPos: new THREE.Vector3(0,400,0)},
		player:{Freeze: null, setAllGravity: {axis: 1, type: 1},},
		biome1:{SpawnMultiAsset:null},

		cityBalls0Ring:{SpawnObjRing:null},
		cityBalls1Ring:{SpawnObjRing:null},
		cityBalls2Ring:{SpawnObjRing:null},
		cityBoxes0Ring:{SpawnObjRing:null},
		cityBoxes1Ring:{SpawnObjRing:null},
		cityBoxes2Ring:{SpawnObjRing:null},
	},
	delay:{
		500:{
			player:{UnFreeze:null,},
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
		data: auxl.cannonZoneData.cannonZoneSceneCity,
	},
};
//Zone Phys | Apocolypse City
auxl.cannonZoneSceneApocCityData = {
	info:{
		id:'cannonZoneSceneApocCity',
		name: 'Physics Alt City',
		description: 'A destroyed city scene to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos: 'other',
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
	},
	controls:{
		//Boost
		action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '4', name: 'Forward Boost Build', info: 'Build power for forward boost launch in the direction of your ray.'},
		action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Forward Boost Launch', info: 'Launch boost forward in the direction of your ray.'},
		//Back Boost
		action2Down:{auxlObj: 'player', func: 'ToggleAction', params: '5', name: 'Reverse Boost Build', info: 'Build power for reverse boost launch in the opposite direction of your ray.'},
		action2Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Reverse Boost Launch', info: 'Launch boost reverse in the opposite direction of your ray.'},
		//Freeze|UnFreeze
		action3Down:{auxlObj: 'player', func: 'Freeze', params: 0, name: 'Freeze', info: 'Freeze mid-air.'},
		action3Up:{auxlObj: 'player', func: 'UnFreeze', params: false, name: 'UnFreeze', info: 'UnFreeze mid-air.'},
		//Teleport
		action4Down:{auxlObj: 'player', func: 'ToggleAction', params: '2', name: 'Teleport Start', info: 'Start charging of Teleport ray.'},
		action4Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Teleport Launch', info: 'Launch Teleport in aim direction from generated charge.'},
	},
	start:{
		physicalFloor:{SpawnCore: null},
		mtnFloor:{SpawnCore: null},
		playerRig:{PhysPos: new THREE.Vector3(0,400,0)},
		player:{Freeze: null, setAllGravity: {axis: 1, type: 1},},
		biome2:{SpawnMultiAsset:null},

		cityBalls0Ring:{SpawnObjRing:null},
		cityBalls1Ring:{SpawnObjRing:null},
		cityBalls2Ring:{SpawnObjRing:null},
		cityBoxes0Ring:{SpawnObjRing:null},
		cityBoxes1Ring:{SpawnObjRing:null},
		cityBoxes2Ring:{SpawnObjRing:null},
	},
	delay:{
		500:{
			player:{UnFreeze:null,},
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
		data: auxl.cannonZoneData.cannonZoneSceneApocCity,
	},
};
//Zone Phys | Cube Room
auxl.cannonZoneSceneRoomData = {
	info:{
		id:'cannonZoneSceneRoom',
		name: 'Physics Room',
		description: 'A room scene to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos: 'other',
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
	},
	controls:{
		//Redirect
		action1Down:{auxlObj: 'player', func: 'RedirectDown', name: 'Redirect Start', info: 'Engage your physics redirect. Use to slow, aim and launch self in new direction.'},
		action1Up:{auxlObj: 'player', func: 'RedirectUp', name: 'Redirect Launch', info: 'Release your redirect brake in the direction of your main raycaster.'},
		//Brake
		action2Down:{auxlObj: 'player', func: 'BrakeDown', name: 'Brake On', info: 'Engage your physics brake. Slow self to a stop, double tap for quick stop.'},
		action2Up:{auxlObj: 'player', func: 'BrakeUp', name: 'Brake Off', info: 'Release your physics brake.'},
		//Cycle World Gravity Axis
		action3Down:{auxlObj: 'player', func: 'cycleWorldGravityAxis', name: 'Cycle World Gravity Axis', info: 'Cycle World Gravity Direction', info: 'Cycle through all 7 gravity directions.'},
		//Cycle All Gravity Types
		action4Down:{auxlObj: 'player', func: 'cycleAllGravityTypes', name: 'Cycle All Gravity Types', info: 'Cycle through all 12 types such as the planets, sun, a few moons, float and custom.'},

	},
	start:{
		playerRig:{PhysPos: new THREE.Vector3(0,0,0)},
		player:{Freeze: null, setAllGravity: {axis: 0, type: 0},},
		ceiling1:{SpawnCore:null},
		ceiling2:{SpawnCore:null},

		boundingwall1:{SpawnCore:null},
		boundingwall2:{SpawnCore:null},
		boundingwall3:{SpawnCore:null},
		boundingwall4:{SpawnCore:null},

		triggerAxis0:{SpawnCore:null},
		triggerAxis1:{SpawnCore:null},
		triggerAxis2:{SpawnCore:null},
		triggerAxis3:{SpawnCore:null},
		triggerAxis4:{SpawnCore:null},
		triggerAxis5:{SpawnCore:null},
		triggerAxis6:{SpawnCore:null},

		balls0Ring:{SpawnObjRing:null},
		balls1Ring:{SpawnObjRing:null},
		balls2Ring:{SpawnObjRing:null},
		boxes0Ring:{SpawnObjRing:null},
		boxes1Ring:{SpawnObjRing:null},
		boxes2Ring:{SpawnObjRing:null},
	},
	delay:{
		500:{
			player:{UnFreeze:null,},
		},
		4000:{
			player:{ Notification: {message:'4 Secs'}},
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
		data: auxl.cannonZoneData.cannonZoneSceneRoom,
	},
};
//Zone Phys | Sphere Planet
auxl.cannonZoneScenePlanetData = {
	info:{
		id:'cannonZoneScenePlanet',
		name: 'Physics Planet',
		description: 'A planet scene to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.00025},
		map: false,
		spawnPos: 'other',
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
	},
	controls:{
		//Rubberband Sling
		action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '0', name: 'Rubberband', info: 'Build Web Sling with rubberbands. Tap for Pole Vault, Press for Swing or Hold to build launch charge.'},
		action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'RubberbandDrop', info: 'Activate Web Sling.'},
		//Parachute
		action2Down:{auxlObj: 'player', func: 'ChuteDown', name: 'Open Parachute', info: 'Open your chute to suspend falling with velocity and float down.'},
		action2Up:{auxlObj: 'player', func: 'ChuteUp', name: 'Close Parachute', info: 'Close your chute to resume falling with velocity and fall down.'},
		//Shoot
		action3Down:{auxlObj: 'player', func: 'ToggleAction', params: '1', name: 'Shoot Charge Start', info: 'Start charging of Shoot ray.'},
		action3Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Shoot Charged Fire', info: 'Launch bullets from the Shoot ray from generated charge.'},
		//Brake
		action4Down:{auxlObj: 'player', func: 'BrakeDown', name: 'Brake On', info: 'Engage your physics brake. Slow self to a stop, double tap for quick stop.'},
		action4Up:{auxlObj: 'player', func: 'BrakeUp', name: 'Brake Off', info: 'Release your physics brake.'},

	},
	start:{
		playerRig:{PhysPos: new THREE.Vector3(0,0,0)},
		player:{Freeze: null, LinkDistance:{distance: 22},},
		planet1:{SpawnCore: null},
		planetBuilding0:{SpawnCore: null},
		planetBuilding1:{SpawnCore: null},
		planetBuilding2:{SpawnCore: null},
		planetBuilding3:{SpawnCore: null},
		planetBuilding4:{SpawnCore: null},
		planetBuilding5:{SpawnCore: null},
		planetBuilding6:{SpawnCore: null},
		planetBuilding7:{SpawnCore: null},
		planetBuilding8:{SpawnCore: null},
		planetBuilding9:{SpawnCore: null},
		planetBuilding10:{SpawnCore: null},
		planetBuilding11:{SpawnCore: null},
		planetBuilding12:{SpawnCore: null},
		planetBuilding13:{SpawnCore: null},
		planetBuilding14:{SpawnCore: null},
		planetBuilding15:{SpawnCore: null},
		planetBuilding16:{SpawnCore: null},
		planetBuilding17:{SpawnCore: null},
	},
	delay:{
		500:{
			player:{setAllGravity: {axis: 1, type: 1},},
			playerRig:{ChangeSelf: {property:'gravitycontrol', value: {gravityObject: 'planet1'}}},
		},
		1000:{
			player:{UnFreeze:null},
		},
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
		playerRig:{ChangeSelf: {property:'gravitycontrol', value: {gravityObject: false}}},
	},
	map:{
		data: auxl.cannonZoneData.cannonZoneScenePlanet,
	},
};


//Basic
auxl.cannonZoneSceneBasic = auxl.SceneNode(auxl.cannonZoneSceneBasicData);
//City
auxl.cannonZoneSceneCity = auxl.SceneNode(auxl.cannonZoneSceneCityData);
//Apocolypse City
auxl.cannonZoneSceneApocCity = auxl.SceneNode(auxl.cannonZoneSceneApocCityData);
//Cube Room
auxl.cannonZoneSceneRoom = auxl.SceneNode(auxl.cannonZoneSceneRoomData);
//Sphere Planet
auxl.cannonZoneScenePlanet = auxl.SceneNode(auxl.cannonZoneScenePlanetData);
//Map Zone Phys
auxl.cannonZone = auxl.MapZone(auxl.cannonZoneData);


//
//Scenarios

//
//Testing Scenario
auxl.cannonScenarioData = {
	info:{
		id: 'cannonScenario',
		name: 'v03 Physics Testing Scenario',
		scenarioNum: 0,
		startZone: 'cannonZone',
		instructions: 'A testing scenario to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
	},
	map:{
		cannonZone:{
			cannonZoneSceneBasic:{
				connect0: {inZone: true, node: 'cannonZoneSceneCity',},
				connect1: {inZone: true, node: 'cannonZoneSceneApocCity',},
				connect2: {inZone: true, node: 'cannonZoneSceneRoom',},
				connect3: {inZone: true, node: 'cannonZoneScenePlanet',},
			},
			cannonZoneSceneCity:{
				connect0: {inZone: true, node: 'cannonZoneSceneBasic',},
				connect1: {inZone: true, node: 'cannonZoneSceneApocCity',},
				connect2: {inZone: true, node: 'cannonZoneSceneRoom',},
				connect3: {inZone: true, node: 'cannonZoneScenePlanet',},
			},
			cannonZoneSceneApocCity:{
				connect1: {inZone: true, node: 'cannonZoneSceneBasic',},
				connect2: {inZone: true, node: 'cannonZoneSceneCity',},
				connect3: {inZone: true, node: 'cannonZoneSceneRoom',},
				connect4: {inZone: true, node: 'cannonZoneScenePlanet',},
			},
			cannonZoneSceneRoom:{
				connect0: {inZone: true, node: 'cannonZoneSceneBasic',},
				connect1: {inZone: true, node: 'cannonZoneSceneCity',},
				connect2: {inZone: true, node: 'cannonZoneSceneApocCity',},
				connect3: {inZone: true, node: 'cannonZoneScenePlanet',},
			},
			cannonZoneScenePlanet:{
				connect0: {inZone: true, node: 'cannonZoneSceneBasic',},
				connect1: {inZone: true, node: 'cannonZoneSceneCity',},
				connect2: {inZone: true, node: 'cannonZoneSceneApocCity',},
				connect3: {inZone: true, node: 'cannonZoneSceneRoom',},
			},
		},
	},
	controls:{

		//Shoot
		//action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '1', name: 'Shoot Charge Start', info: 'Start charging of Shoot ray.'},
		//action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Shoot Charged Fire', info: 'Launch bullets from the Shoot ray from generated charge.'},

		//Rubberband Sling
		//action1Down:{auxlObj: 'player', func: 'ToggleAction', params: '0', name: 'Rubberband', info: 'Build Web Sling with rubberbands. Tap for Pole Vault, Press for Swing or Hold to build launch charge.'},
		//action1Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'RubberbandDrop', info: 'Activate Web Sling.'},

		//Redirect
		//action1Down:{auxlObj: 'player', func: 'RedirectDown', name: 'Brake On', info: 'Engage your physics redirect. Use to slow, aim and launch self in new direction.'},
		//action1Up:{auxlObj: 'player', func: 'RedirectUp', name: 'Brake Off', info: 'Release your redirect brake in the direction of your main raycaster.'},

		//Local Gravity
		//action2Down:{auxlObj: 'playerRig', component: 'gravitycontrol', func: 'cycleAxis', name: 'Cycle Personal Gravity Direction', info: 'Cycle through all 7 gravity directions.'},
		//action3Down:{auxlObj: 'playerRig', component: 'gravitycontrol', func: 'cycleTypes', name: 'Cycle Personal Planetational Gravity', info: 'Cycle through all 12 types such as the planets, sun, a few moons, float and custom.'},

		//Track 2D
		//action5Down:{auxlObj: 'player', func: 'Track2D', params: 0, name: 'Pick New Gravity Axis', info: 'Aim and drag along any face of a flat floor cube object to start detecting new Axis.'},

		//World Gravity
		//action2Down:{auxlObj: 'playerRig', component: 'gravitycontrol', func: 'cycleWorldAxis', name: 'Cycle World Gravity Direction', info: 'Cycle through all 7 gravity directions.'},
		//action3Down:{auxlObj: 'playerRig', component: 'gravitycontrol', func: 'cycleWorldTypes', name: 'Cycle World Planetational Gravity', info: 'Cycle through all 12 types such as the planets, sun, a few moons, float and custom.'},

		//Walk|Run
		//action6Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed', name: 'Toggle Walk/Run', info: 'Change your walking speed between walk and run.'},

		//Jump
		//action4Down:{auxlObj: 'player', func: 'PhysJump', name: 'Jump', info: 'Jump up and forwards.'},

		//Boost
		//action5Down:{auxlObj: 'player', func: 'ToggleAction', params: '4', name: 'Forward Boost Build', info: 'Build power for forward boost launch in the direction of your ray.'},
		//action5Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Forward Boost Launch', info: 'Launch boost forward in the direction of your ray.'},

		//Back Boost
		//action6Down:{auxlObj: 'player', func: 'ToggleAction', params: '5', name: 'Reverse Boost Build', info: 'Build power for reverse boost launch in the opposite direction of your ray.'},
		//action6Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Reverse Boost Launch', info: 'Launch boost reverse in the opposite direction of your ray.'},

		//Teleport
		//action5Down:{auxlObj: 'player', func: 'ToggleAction', params: '2', name: 'Teleport Start', info: 'Start charging of Teleport ray.'},
		//action5Up:{auxlObj: 'player', func: 'ToggleAction', params: 'false', name: 'Teleport Launch', info: 'Launch Teleport in aim direction from generated charge.'},

		//Parachute
		//action3Down:{auxlObj: 'player', func: 'ChuteDown', name: 'Open Parachute', info: 'Open your chute to suspend falling with velocity and float down.'},
		//action3Up:{auxlObj: 'player', func: 'ChuteUp', name: 'Close Parachute', info: 'Close your chute to resume falling with velocity and fall down.'},

		//Brake
		//action5Down:{auxlObj: 'player', func: 'BrakeDown', name: 'Brake On', info: 'Engage your physics brake. Slow self to a stop, double tap for quick stop.'},
		//action5Up:{auxlObj: 'player', func: 'BrakeUp', name: 'Brake Off', info: 'Release your physics brake.'},

		//Freeze|UnFreeze
		//action5Down:{auxlObj: 'player', func: 'Freeze', params: 0, name: 'Freeze', info: 'Freeze mid-air.'},
		//action5Up:{auxlObj: 'player', func: 'UnFreeze', params: false, name: 'UnFreeze', info: 'UnFreeze mid-air.'},

		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		player:{UnFreeze:null},
		//comp:{SpawnComp: null},
		cloud:{SpawnCore: null},
		skyBox1:{SpawnSkyBox: null},
		//handsTesting0:{SpawnCore: null},
		//hills:{SpawnHorizon: null},
		//buildingsHorizon:{SpawnHorizon: null},
		//cylinderWallHorizon:{SpawnHorizon: null},
		//mountainsHorizon:{SpawnHorizon: null},
		//build:{SpawnBuild:null},
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
auxl.cannonScenario = auxl.Scenario(auxl.cannonScenarioData);

//
//Physics World
auxl.cannonWorldData = {
	info:{
		id: 'cannonWorld',
		name: 'AUXL Physics Worlds',
		description: 'Various worlds to show off the A-Frame UX Library engine v0.3 physics integration of CANNON.js .',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: 'cannon',
		menuStyle: false,
		menuOptions: false,
		//menuStyle: auxl.menuStyleData,
		//menuOptions: auxl.addToMainMenu,
/*
		backgroundAudio: {
			town3: {src: auxl.town3, autoplay: false, loop: true, volume: 0.4, on: 'town3'},
			spookymusic1: {src: auxl.soundSpookyMusic1, autoplay: false, loop: true, volume: 0.3, on: 'spookymusic1'},
		},
*/
		//soundEffects: {},
		//compBookUpdate: auxl.compCadeBookData,
	},
	scenarios:[
		auxl.cannonScenario,
	],
};
auxl.cannonWorld = auxl.World(auxl.cannonWorldData);
//auxl.cannonWorld.SetAsDefault();

//
//System Loaded
//auxl.SystemLoaded();
console.log({msg: 'demo cannon world loaded', world: auxl.cannonWorld})
    },
});