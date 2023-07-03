//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Library
//
//library

//
//Library : List of Materials, Geometries, Sounds, Animations, Data, Cores, Layers & Objects
const library = AFRAME.registerComponent('library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;


//Colors
//

//Minty Palette
auxl.mintyGreen = '#3EB489';
auxl.mintyPink = '#C14B76';

//Vaporwave Palette
auxl.vaporPink = '#ff71ce';
auxl.vaporBlue = '#01cdfe';
auxl.vaporGreen = '#05ffa1';
auxl.vaporPurple = '#b967ff';
auxl.vaporYellow = '#fffb96';


//Materials Library
//

//Tiles

//Kenny
auxl.pattern01 = './assets/img/tiles/kenny/pattern_01.png';
auxl.pattern02 = './assets/img/tiles/kenny/pattern_02.png';
auxl.pattern03 = './assets/img/tiles/kenny/pattern_03.png';
auxl.pattern04 = './assets/img/tiles/kenny/pattern_04.png';
auxl.pattern05 = './assets/img/tiles/kenny/pattern_05.png';
auxl.pattern06 = './assets/img/tiles/kenny/pattern_06.png';
auxl.pattern07 = './assets/img/tiles/kenny/pattern_07.png';
auxl.pattern08 = './assets/img/tiles/kenny/pattern_08.png';
auxl.pattern09 = './assets/img/tiles/kenny/pattern_09.png';
auxl.pattern10 = './assets/img/tiles/kenny/pattern_10.png';
auxl.pattern11 = './assets/img/tiles/kenny/pattern_11.png';
auxl.pattern12 = './assets/img/tiles/kenny/pattern_12.png';
auxl.pattern13 = './assets/img/tiles/kenny/pattern_13.png';
auxl.pattern14 = './assets/img/tiles/kenny/pattern_14.png';
auxl.pattern15 = './assets/img/tiles/kenny/pattern_15.png';
auxl.pattern16 = './assets/img/tiles/kenny/pattern_16.png';
auxl.pattern17 = './assets/img/tiles/kenny/pattern_17.png';
auxl.pattern18 = './assets/img/tiles/kenny/pattern_18.png';
auxl.pattern19 = './assets/img/tiles/kenny/pattern_19.png';
auxl.pattern20 = './assets/img/tiles/kenny/pattern_20.png';
auxl.pattern21 = './assets/img/tiles/kenny/pattern_21.png';
auxl.pattern22 = './assets/img/tiles/kenny/pattern_22.png';
auxl.pattern23 = './assets/img/tiles/kenny/pattern_23.png';
auxl.pattern24 = './assets/img/tiles/kenny/pattern_24.png';
auxl.pattern25 = './assets/img/tiles/kenny/pattern_25.png';
auxl.pattern26 = './assets/img/tiles/kenny/pattern_26.png';
auxl.pattern27 = './assets/img/tiles/kenny/pattern_27.png';
auxl.pattern28 = './assets/img/tiles/kenny/pattern_28.png';
auxl.pattern29 = './assets/img/tiles/kenny/pattern_29.png';
auxl.pattern30 = './assets/img/tiles/kenny/pattern_30.png';
auxl.pattern31 = './assets/img/tiles/kenny/pattern_31.png';
auxl.pattern32 = './assets/img/tiles/kenny/pattern_32.png';
auxl.pattern33 = './assets/img/tiles/kenny/pattern_33.png';
auxl.pattern34 = './assets/img/tiles/kenny/pattern_34.png';
auxl.pattern35 = './assets/img/tiles/kenny/pattern_35.png';
auxl.pattern36 = './assets/img/tiles/kenny/pattern_36.png';
auxl.pattern37 = './assets/img/tiles/kenny/pattern_37.png';
auxl.pattern38 = './assets/img/tiles/kenny/pattern_38.png';
auxl.pattern39 = './assets/img/tiles/kenny/pattern_39.png';
auxl.pattern40 = './assets/img/tiles/kenny/pattern_40.png';
auxl.pattern41 = './assets/img/tiles/kenny/pattern_41.png';
auxl.pattern42 = './assets/img/tiles/kenny/pattern_42.png';
auxl.pattern43 = './assets/img/tiles/kenny/pattern_43.png';
auxl.pattern44 = './assets/img/tiles/kenny/pattern_44.png';
auxl.pattern45 = './assets/img/tiles/kenny/pattern_45.png';
auxl.pattern46 = './assets/img/tiles/kenny/pattern_46.png';
auxl.pattern47 = './assets/img/tiles/kenny/pattern_47.png';
auxl.pattern48 = './assets/img/tiles/kenny/pattern_48.png';
auxl.pattern49 = './assets/img/tiles/kenny/pattern_49.png';
auxl.pattern50 = './assets/img/tiles/kenny/pattern_50.png';
auxl.pattern51 = './assets/img/tiles/kenny/pattern_51.png';
auxl.pattern52 = './assets/img/tiles/kenny/pattern_52.png';
auxl.pattern53 = './assets/img/tiles/kenny/pattern_53.png';
auxl.pattern54 = './assets/img/tiles/kenny/pattern_54.png';
auxl.pattern55 = './assets/img/tiles/kenny/pattern_55.png';
auxl.pattern56 = './assets/img/tiles/kenny/pattern_56.png';
auxl.pattern57 = './assets/img/tiles/kenny/pattern_57.png';
auxl.pattern58 = './assets/img/tiles/kenny/pattern_58.png';
auxl.pattern59 = './assets/img/tiles/kenny/pattern_59.png';
auxl.pattern60 = './assets/img/tiles/kenny/pattern_60.png';
auxl.pattern61 = './assets/img/tiles/kenny/pattern_61.png';
auxl.pattern62 = './assets/img/tiles/kenny/pattern_62.png';
auxl.pattern63 = './assets/img/tiles/kenny/pattern_63.png';
auxl.pattern64 = './assets/img/tiles/kenny/pattern_64.png';
auxl.pattern65 = './assets/img/tiles/kenny/pattern_65.png';
auxl.pattern66 = './assets/img/tiles/kenny/pattern_66.png';
auxl.pattern67 = './assets/img/tiles/kenny/pattern_67.png';
auxl.pattern68 = './assets/img/tiles/kenny/pattern_68.png';
auxl.pattern69 = './assets/img/tiles/kenny/pattern_69.png';
auxl.pattern70 = './assets/img/tiles/kenny/pattern_70.png';
auxl.pattern71 = './assets/img/tiles/kenny/pattern_71.png';
auxl.pattern72 = './assets/img/tiles/kenny/pattern_72.png';
auxl.pattern73 = './assets/img/tiles/kenny/pattern_73.png';
auxl.pattern74 = './assets/img/tiles/kenny/pattern_74.png';
auxl.pattern75 = './assets/img/tiles/kenny/pattern_75.png';
auxl.pattern76 = './assets/img/tiles/kenny/pattern_76.png';
auxl.pattern77 = './assets/img/tiles/kenny/pattern_77.png';
auxl.pattern78 = './assets/img/tiles/kenny/pattern_78.png';
auxl.pattern79 = './assets/img/tiles/kenny/pattern_79.png';
auxl.pattern80 = './assets/img/tiles/kenny/pattern_80.png';
auxl.pattern81 = './assets/img/tiles/kenny/pattern_81.png';
auxl.pattern82 = './assets/img/tiles/kenny/pattern_82.png';
auxl.pattern83 = './assets/img/tiles/kenny/pattern_83.png';
auxl.pattern84 = './assets/img/tiles/kenny/pattern_84.png';

auxl.patterns = [auxl.pattern01,auxl.pattern02,auxl.pattern03,auxl.pattern04,auxl.pattern05,auxl.pattern06,auxl.pattern07,auxl.pattern08,auxl.pattern09,auxl.pattern10,auxl.pattern11,auxl.pattern12,auxl.pattern13,auxl.pattern14,auxl.pattern15,auxl.pattern16,auxl.pattern17,auxl.pattern18,auxl.pattern19,auxl.pattern20,auxl.pattern21,auxl.pattern22,auxl.pattern23,auxl.pattern24,auxl.pattern25,auxl.pattern26,auxl.pattern27,auxl.pattern28,auxl.pattern29,auxl.pattern30,auxl.pattern31,auxl.pattern32,auxl.pattern33,auxl.pattern34,auxl.pattern35,auxl.pattern36,auxl.pattern37,auxl.pattern38,auxl.pattern39,auxl.pattern40,auxl.pattern41,auxl.pattern42,auxl.pattern43,auxl.pattern44,auxl.pattern45,auxl.pattern46,auxl.pattern47,auxl.pattern48,auxl.pattern49,auxl.pattern50,auxl.pattern51,auxl.pattern52,auxl.pattern53,auxl.pattern54,auxl.pattern55,auxl.pattern56,auxl.pattern57,auxl.pattern58,auxl.pattern59,auxl.pattern60,auxl.pattern61,auxl.pattern62,auxl.pattern63,auxl.pattern64,auxl.pattern65,auxl.pattern66,auxl.pattern67,auxl.pattern68,auxl.pattern69,auxl.pattern70,auxl.pattern71,auxl.pattern72,auxl.pattern73,auxl.pattern74,auxl.pattern75,auxl.pattern76,auxl.pattern77,auxl.pattern78,auxl.pattern79,auxl.pattern80,auxl.pattern81,auxl.pattern82,auxl.pattern83,auxl.pattern84];

//Grass Material
auxl.grassMaterial = {shader: "standard", color: "#55be71", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#397e4b", emissiveIntensity: 0.2};

//Water Material
auxl.waterMaterial = {shader: "standard", color: "#55a5be", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#65c3e0", emissiveIntensity: 0.2};

//ImageSwapper Materials
auxl.mat0 = {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat1 = {src: './assets/img/vwave/1.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat2 = {src: './assets/img/vwave/2.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat3 = {src: './assets/img/vwave/3.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat4 = {src: './assets/img/vwave/4.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};

//
//Animations Library


//
//Player

//Rig
auxl.playerRigData = {
data:'playerRigData',
id:'playerRig',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,1),
rotation: new THREE.Vector3(0,0	,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {
['universal-controls']:null,
['locomotion']:{uiid: false, courserid: 'mouseController', movetype: 'desktop'},
//['gimbal']:{uiid: false, courserid: 'mouseController', movetype: 'desktop'},
light: {type: 'point', intensity: 0.075, distance: 5, decay:0.75},
},};
auxl.playerRig = auxl.Core(auxl.playerRigData);
//Player Body
auxl.playerBodyData = {
data:'playerBodyData',
id:'playerBody',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,1,0),
scale: new THREE.Vector3(1,1,1),
animations: {
crouchdownstanding: {property: 'object3D.position.y', from: 0, to: -0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownStanding'},
crouchupstanding: {property: 'object3D.position.y', from: -0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpStanding'},

crouchdownsitting: {property: 'object3D.position.y', from: 0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownSitting'},
crouchupsitting: {property: 'object3D.position.y', from: 0, to: 0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpSitting'},

sit: {property: 'object3D.position.y', from: 0, to: 0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sit'},
stand: {property: 'object3D.position.y', from: 0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'stand'},

},
mixins: false,
classes: ['a-ent','player'],
components: false,
};
auxl.playerBody = auxl.Core(auxl.playerBodyData);
//Camera
auxl.cameraData = {
data:'Camera Entity',
id:'camera',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1.6,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {
//['look-controls']:{enabled: true, reverseMouseDrag: false, reverseTouchDrag: false, touchEnabled: true, mouseEnabled: true, pointerLockEnabled: false, magicWindowTrackingEnabled: true},
['wasd-controls']:{enabled: false},
},};
auxl.camera = auxl.Core(auxl.cameraData);
//Camera UI
auxl.cameraUIData = {
data:'Camera UI',
id:'cameraUI',
sources: false,
text: {value:'Message', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},
geometry: {primitive: 'plane', width: 0.3, height: 0.15},
material: {shader: "flat", color: "#ac2d2d", opacity: 0.69, side: 'both'},
position: new THREE.Vector3(0,0.05,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
opacinbk:{property: 'components.material.material.opacity', from: 0, to: 0.82, dur: 750, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',}, 
opacoutbk:{property: 'components.material.material.opacity', from: 0.82, to: 0, dur: 750, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',},
opacintxt:{property: 'text.opacity', from: 0, to: 0.82, dur: 750, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',}, 
opacouttxt:{property: 'text.opacity', from: 0.82, to: 0, dur: 750, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',},
},
mixins: false,
classes: ['a-ent','player'],
components: {
visible: false,
},
}
auxl.cameraUI = auxl.Core(auxl.cameraUIData);
//Mouse|Mobile Controller
auxl.mouseControllerData = {
data:'Mouse Controller',
id:'mouseController',
sources: false,
text: false,
geometry: {primitive: 'ring', radiusInner: 0.005, radiusOuter: 0.01},
material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(0,0,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.75,0.75,0.75),
animations: {
click:{property: 'scale', from: '0.75 0.75 0.75', to: '0.4 0.4 0.4', dur: 100, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
clickreset:{property: 'scale', from: '0.4 0.4 0.4', to: '0.75 0.75 0.75', dur: 300, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseup'},
hoverenter:{property: 'material.color', from: '#228da7', to: '#22a741', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoverleave:{property: 'material.color', from: '#22a741', to: '#228da7', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
},
mixins: false,
classes: ['a-ent','player'],
components: {
raycaster:{enabled: 'true', autoRefresh: 'true', objects: '.clickable', origin: new THREE.Vector3(0,0,0), direction: new THREE.Vector3(0,0,-1), far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'},
cursor: {fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'},
},};
auxl.mouseController = auxl.Core(auxl.mouseControllerData);
//VR Controller 1
auxl.vrController1Data = {
data:'vrController1Data',
id:'vrController1',
sources: false,
text: false,
geometry: {primitive: 'ring', radiusInner: 0.02, radiusOuter: 0.03},
material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(0,0,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.15,0.15,0.15),
animations: {
hoverenter:{property: 'raycaster.lineColor', from: '#228da7', to: '#22a741', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoverleave:{property: 'raycaster.lineColor', from: '#22a741', to: '#228da7', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
},
mixins: false,
classes: ['a-ent','player'],
components: {
//['vr-left-inputs']:{joystickEnabled: true},
visible: 'false',
},
};
auxl.vrController1 = auxl.Core(auxl.vrController1Data);
//VR Controller 1 UI
auxl.vrController1UIData = {
data:'vrController1UIData',
id:'vrController1UI',
sources: false,
text: {value:'...', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
geometry: {primitive: 'plane', width: 0.25, height: 0.1},
material: {shader: "flat", color: "#ac2d2d", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(0,-0.25,-0.25),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.5),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {visible: 'false',},
};
auxl.vrController1UI = auxl.Core(auxl.vrController1UIData);
//VR Controller 2
auxl.vrController2Data = {
data:'vrController2Data',
id:'vrController2',
sources: false,
text: false,
geometry: {primitive: 'ring', radiusInner: 0.02, radiusOuter: 0.03},
material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(0,0,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.15,0.15,0.15),
animations: {
hoverenter:{property: 'raycaster.lineColor', from: '#228da7', to: '#22a741', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoverleave:{property: 'raycaster.lineColor', from: '#22a741', to: '#228da7', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
},
mixins: false,
classes: ['a-ent','player'],
components: {
//['vr-right-inputs']:{joystickEnabled: true},
visible: 'false',
},
};
auxl.vrController2 = auxl.Core(auxl.vrController2Data);
//VR Controller 2 UI
auxl.vrController2UIData = {
data:'vrController2UIData',
id:'vrController2UI',
sources: false,
text: {value:'...', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
geometry: {primitive: 'plane', width: 0.25, height: 0.1},
material: {shader: "flat", color: "#ac2d2d", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(0,-0.25,-0.25),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.5),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {visible: 'false',},
};
auxl.vrController2UI = auxl.Core(auxl.vrController2UIData);
//Belt UI
auxl.playerBeltUIData = {
data:'playerBeltUIData',
id:'playerBeltUI',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	['look-at-xyz']:{match: 'camera', x:false, y:true, z:false},
},
};
auxl.playerBeltUI = auxl.Core(auxl.playerBeltUIData);
//Belt Text
auxl.playerBeltTextData = {
data:'playerBeltTextData',
id:'playerBeltText',
sources:false,
text: {value:'Hello World!', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.9, zOffset: 0.03, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 1, height: 0.25},
material: {shader: "standard", color: "#4bb8c1", opacity: 0.75, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.69,-0.8),
rotation: new THREE.Vector3(-30,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
},
};
auxl.playerBeltText = auxl.Core(auxl.playerBeltTextData);
//Player Bottom
auxl.playerFloorData = {
data:'Player Floor',
id:'playerFloor',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "flat", src: './assets/img/compass/compass.jpg', repeat: '1 1', color: "#3EB489", opacity: 0.42, side: 'both'},
position: new THREE.Vector3(0,0.05,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player', 'clickable'],
components: false,
};
auxl.playerFloor = auxl.Core(auxl.playerFloorData);
//Player Audio
auxl.playerAudioData = {
data:'playerAudioData',
id:'playerAudio',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: false,
};
auxl.playerAudio = auxl.Core(auxl.playerAudioData);
//Teleportation Fade
auxl.fadeScreenData = {
data:'Fade Screen',
id:'fadeScreen',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 1, height: 0.5},
material: {shader: "flat", color: '#000000', opacity: 0},
position: new THREE.Vector3(0,0,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
fadein:{property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'},

fadeout:{property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'},


fadeinscene:{property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeScene1'},

fadeoutscene:{property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeScene2'}, 

},
mixins: false,
classes: ['a-ent','player','clickable'],
components: {visible: false},
};
auxl.fadeScreen = auxl.Core(auxl.fadeScreenData);
//Teleportation Sphere
auxl.sphereScreenData = {
data:'Sphere Screen',
id:'sphereScreen',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.125, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 0, thetaStart: 90},
material: {shader: "flat", color: '#000000', opacity: 1, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
spherein1:{property: 'geometry.thetaLength', from: 0, to: 180, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
spherein2: {property: 'geometry.thetaStart', from: 90, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},

sphereout1:{property: 'geometry.thetaLength', from: 180, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
sphereout2: {property: 'geometry.thetaStart', from: 0, to: 90, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},


spherein1scene:{property: 'geometry.thetaLength', from: 0, to: 180, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphereScene1'},
spherein2scene: {property: 'geometry.thetaStart', from: 90, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphereScene1'},

sphereout1scene:{property: 'geometry.thetaLength', from: 180, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphereScene2'},
sphereout2scene: {property: 'geometry.thetaStart', from: 0, to: 90, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphereScene2'},
},
mixins: false,
classes: ['a-ent','player'],
components: {visible: false},
};
auxl.sphereScreen = auxl.Core(auxl.sphereScreenData);
//Teleportation Blink 1
auxl.blink1ScreenData = {
data:'Blink 1 Screen',
id:'blink1Screen',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 5, height: 2},
material: {shader: "flat", color: '#000000', opacity: 0, side: 'double'},
position: new THREE.Vector3(0,2.5,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
blinkin:{property: 'object3D.position.y', from: 2.5, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},

blinkout:{property: 'object3D.position.y', from: 1, to: 2.5, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},


blinkinscene:{property: 'object3D.position.y', from: 2.5, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene1'},
blinkopacinscene: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene1'},

blinkoutscene:{property: 'object3D.position.y', from: 1, to: 2.5, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene2'},
blinkopacoutscene: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene2'},
},
mixins: false,
classes: ['a-ent','player'],
components: {visible: false},
};
auxl.blink1Screen = auxl.Core(auxl.blink1ScreenData);
//Teleportation Blink 2
auxl.blink2ScreenData = {
data:'Blink 2 Screen',
id:'blink2Screen',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 5, height: 2},
material: {shader: "flat", color: '#000000', opacity: 0, side: 'double'},
position: new THREE.Vector3(0,-2.5,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
blinkin:{property: 'object3D.position.y', from: -2.5, to: -1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},

blinkout:{property: 'object3D.position.y', from: -1, to: -2.5, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},


blinkinscene:{property: 'object3D.position.y', from: -2.5, to: -1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene1'},
blinkopacinscene: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene1'},

blinkoutscene:{property: 'object3D.position.y', from: -1, to: -2.5, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene2'},
blinkopacoutscene: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blinkScene2'},
},
mixins: false,
classes: ['a-ent','player'],
components: {visible: false},
};
auxl.blink2Screen = auxl.Core(auxl.blink2ScreenData);
//Player Layer
auxl.playerAll = {
parent: {core: auxl.playerRig},
child0: {
	parent: {core: auxl.playerBody},
	child0: {
		parent: {core: auxl.camera},
		child0: {core: auxl.mouseController},
		child1: {core: auxl.cameraUI},
		child2: {core: auxl.fadeScreen},
		child3: {core: auxl.sphereScreen},
		child4: {core: auxl.blink1Screen},
		child5: {core: auxl.blink2Screen},
	},
	child1: {
		parent: {core: auxl.vrController1},
		child0: {core: auxl.vrController1UI},
	},
	child2: {
		parent: {core: auxl.vrController2},
		child0: {core: auxl.vrController2UI},
	},
	child3: {
		parent: {core: auxl.playerBeltUI},
		child0: {core: auxl.playerBeltText},
	},
},
child1: {core: auxl.playerFloor},
}

//SPECIAL : Player Base and Child Camera entity are already in HTML and Layer has special exceptions for it
auxl.playerLayer = auxl.Layer('playerLayer', auxl.playerAll);

//Player
auxl.player = auxl.Player('player',auxl.playerLayer);

//
//Avatar

//Avatar Sphere Offset
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
auxl.avatarSphere = auxl.Core(auxl.avatarSphereData);

//Avatar Rig
auxl.avatarRigData = {
data:'avatarRigData',
id:'avatarRig',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,1,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','avatar'],
components: {
light: {type: 'point', intensity: 0.075, distance: 5, decay:0.75},
},};
auxl.avatarRig = auxl.Core(auxl.avatarRigData);
//Avatar Body
auxl.avatarBodyData = {
data:'avatarBodyData',
id:'avatarBody',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.95, width: 0.95, height: 1.5},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.75,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','avatar'],
components: false,
};
auxl.avatarBody = auxl.Core(auxl.avatarBodyData);
//Avatar Face
auxl.avatarFaceData = {
data:'avatarFaceData',
id:'avatarFace',
sources: false,
text: false,
geometry: {primitive: 'triangle', vertexA: new THREE.Vector3(0,0.5,0), vertexB: new THREE.Vector3(-0.5,-0.5,0), vertexC: new THREE.Vector3(0.5,-0.5,0),},
material: {shader: "standard", color: "#1fceac", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#1fceac", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.755,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.95,0.95,0.95),
animations: false,
mixins: false,
classes: ['a-ent','avatar'],
components: false,
};
auxl.avatarFace = auxl.Core(auxl.avatarFaceData);
//Avatar Hover
auxl.avatarHoverData = {
data:'avatarHoverData',
id:'avatarHover',
sources: false,
text: {value:'Avatar', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold"},
geometry: {primitive: 'plane', width: 2, height: 2},
material: {shader: "standard", color: "#c1664b", opacity: 0.5, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,3,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','avatar'],
components: false,
};
auxl.avatarHover = auxl.Core(auxl.avatarHoverData);
//Avatar
auxl.avatarData = {
parent: {core: auxl.avatarSphere},
child0: {
	parent: {core: auxl.avatarRig},
	child0: {
		parent: {core: auxl.avatarBody},
		child0: {core: auxl.avatarFace},
		child1: {core: auxl.avatarHover},
	},
},
}
auxl.avatar = auxl.Layer('avatar', auxl.avatarData);


//
//Belt Locomotion UI

//Belt Parent
auxl.beltUIParentData = {
data:'beltUIParentData',
id:'beltUIParent',
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
components: false,
};
auxl.beltUIParent = auxl.Core(auxl.beltUIParentData);
//Locomotion Forward UI
auxl.locomotionForwardUIData = {
data:'locomotionForwardUIData',
id:'locomotionForwardUI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.4, radiusBottom: 1.5, radiusTop: 2, segmentsHeight: 6, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
material: {shader: "flat", color: "#5c174b", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 1, to: 0.25, dur: 1250, delay: 250, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.25, to: 1, dur: 700, delay: 100, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.locomotionForwardUI = auxl.Core(auxl.locomotionForwardUIData);
//Locomotion Reverse UI
auxl.locomotionReverseUIData = {
data:'locomotionReverseUIData',
id:'locomotionReverseUI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.001, radiusBottom: 1.25, radiusTop: 1.5, segmentsHeight: 1, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
material: {shader: "flat", color: "#46113a", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 0.75, to: 0.1, dur: 1150, delay: 350, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.1, to: 0.75, dur: 700, delay: 250, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.locomotionReverseUI = auxl.Core(auxl.locomotionReverseUIData);
//Locomotion Brake 1 UI
auxl.locomotionBrake1UIData = {
data:'locomotionBrake1UIData',
id:'locomotionBrake1UI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.01, radiusBottom: 0.75, radiusTop: 1, segmentsHeight: 1, segmentsRadial: 8, thetaStart: 0, thetaLength: 30},
material: {shader: "flat", color: "red", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 0.5, to: 0.1, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.1, to: 0.5, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent', 'directionBrake'],
components: false,
};
auxl.locomotionBrake1UI = auxl.Core(auxl.locomotionBrake1UIData);
//Locomotion Brake 2 UI
auxl.locomotionBrake2UIData = {
data:'locomotionBrake2UIData',
id:'locomotionBrake2UI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.01, radiusBottom: 0.75, radiusTop: 1, segmentsHeight: 1, segmentsRadial: 8, thetaStart: 90, thetaLength: 30},
material: {shader: "flat", color: "red", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 0.5, to: 0.1, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.1, to: 0.5, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent', 'directionBrake'],
components: false,
};
auxl.locomotionBrake2UI = auxl.Core(auxl.locomotionBrake2UIData);
//Locomotion Brake 3 UI
auxl.locomotionBrake3UIData = {
data:'locomotionBrake3UIData',
id:'locomotionBrake3UI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.01, radiusBottom: 0.75, radiusTop: 1, segmentsHeight: 1, segmentsRadial: 8, thetaStart: 180, thetaLength: 30},
material: {shader: "flat", color: "red", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 0.5, to: 0.1, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.1, to: 0.5, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent', 'directionBrake'],
components: false,
};
auxl.locomotionBrake3UI = auxl.Core(auxl.locomotionBrake3UIData);
//Locomotion Brake 4 UI
auxl.locomotionBrake4UIData = {
data:'locomotionBrake4UIData',
id:'locomotionBrake4UI',
sources:false,
text: false,
geometry: {primitive: 'cone', openEnded: true, height: 0.01, radiusBottom: 0.75, radiusTop: 1, segmentsHeight: 1, segmentsRadial: 8, thetaStart: 270, thetaLength: 30},
material: {shader: "flat", color: "red", opacity: 0.3, side: 'double'},
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
brakeon: {property: 'object3D.position.y', from: 0.5, to: 0.1, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOn'},
brakeoff: {property: 'object3D.position.y', from: 0.1, to: 0.5, dur: 1050, delay: 450, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'brakeOff'},
},
mixins: false,
classes: ['clickable','a-ent', 'directionBrake'],
components: false,
};
auxl.locomotionBrake4UI = auxl.Core(auxl.locomotionBrake4UIData);
//Locomotion Layer
auxl.locomotionUIAllData = {
	parent: {core: auxl.beltUIParent},
	child0: {core: auxl.locomotionForwardUI},
	child1: {core: auxl.locomotionReverseUI},
	child2: {core: auxl.locomotionBrake1UI},
	child3: {core: auxl.locomotionBrake2UI},
	child4: {core: auxl.locomotionBrake3UI},
	child5: {core: auxl.locomotionBrake4UI},
}
auxl.locomotionUILayer = auxl.Layer('locomotionUILayer', auxl.locomotionUIAllData);

//
//Null Parent Template
auxl.nullParentData = {
data:'nullParent',
id:'nullParent',
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
components: false,
};

//
//Menu Button Base Template
auxl.menuBaseData = {
data:'menu part',
id:'menuBaseTemp',
sources:false,
text: {value:'Hmmm...', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'box', depth: 0.04, width: 0.4, height: 0.15},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
click2:{property: 'material.emissiveIntensity', from: '0.6',to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};

//
//Multi Menu Button Base Template
auxl.menuCylinderData = {
data:'menuCylinderData',
id:'menuCylinder',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
//Multi-Menu Hover Text Display
auxl.menuHoverData = {
data:'menuHoverData',
id:'menuHover',
sources:false,
text: {value:'Menu', wrapCount: 40, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: false,
material: false,
position: new THREE.Vector3(0,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};


//Build Multi-Menu
auxl.buildCoreData = {
data:'buildCoreData',
id:'buildCore',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
//Multi-Menu Hover Text Display
auxl.buildHoverData = {
data:'buildHoverData',
id:'buildHover',
sources:false,
text: {value:'Menu', wrapCount: 40, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: false,
material: false,
position: new THREE.Vector3(0,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//
//Companion Shapes
//Should all be layers with a null parent for which main menu attaches to. This avoids conflicts with NPC events system activating when using the menu

//
//Ghost
//Parent
auxl.ghostParentData = {
data:'ghostParentData',
id:'ghostParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.ghostParent = auxl.Core(auxl.ghostParentData);
//All
auxl.ghostAllData = {
data:'ghostAllData',
id:'ghostAll',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.75,0.75,0.75),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.ghostAll = auxl.Core(auxl.ghostAllData);
//EyeSocket
auxl.eye1SocketData = {
data:'eye1SocketData',
id:'eye1Socket',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.15,0.1,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(0.75,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.eye1Socket = auxl.Core(auxl.eye1SocketData);
//Eye2Socket
auxl.eye2SocketData = auxl.coreDataFromTemplate(auxl.eye1SocketData, {id: 'eye2Socket', position: new THREE.Vector3(0.15,0.1,0.4)}, true);
auxl.eye2Socket = auxl.Core(auxl.eye2SocketData);
//Eye1Pupil
auxl.eye1PupilData = {
data:'eye1PupilData',
id:'eye1Pupil',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.1, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#1500fa", emissive: '#1500fa', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1,1),
animations: {
lookdown: {property: 'position', to: new THREE.Vector3(0,0.01,0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookDown'},
lookup: {property: 'position', to: new THREE.Vector3(0,0.01,-0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookUp'},
lookright: {property: 'position', to: new THREE.Vector3(0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookRight'},
lookleft: {property: 'position', to: new THREE.Vector3(-0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookLeft'},

powerup1: {property: 'material.color', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.eye1Pupil = auxl.Core(auxl.eye1PupilData);
//Eye2Pupil
auxl.eye2PupilData = auxl.coreDataFromTemplate(auxl.eye1PupilData, {id: 'eye2Pupil',}, true);
auxl.eye2Pupil = auxl.Core(auxl.eye2PupilData);
//Mouth
auxl.mouthData = {
data:'mouthData',
id:'mouth',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup: {property: 'visible', to: true, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown: {property: 'visible', to: false, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
line:{start: new THREE.Vector3(-0.3,-0.2,0.41), end: new THREE.Vector3(-0.2,-0.15,0.41), color: 'white'},
['line__2']:{start: new THREE.Vector3(-0.2,-0.15,0.41), end: new THREE.Vector3(-0.1,-0.2,0.41), color: 'white'},
['line__3']:{start: new THREE.Vector3(-0.1,-0.2,0.41), end: new THREE.Vector3(0,-0.15,0.41), color: 'white'},
['line__4']:{start: new THREE.Vector3(0,-0.15,0.41), end: new THREE.Vector3(0.1,-0.2,0.41), color: 'white'},
['line__5']:{start: new THREE.Vector3(0.1,-0.2,0.41), end: new THREE.Vector3(0.2,-0.15,0.41), color: 'white'},
['line__6']:{start: new THREE.Vector3(0.2,-0.15,0.41), end: new THREE.Vector3(0.3,-0.2,0.41), color: 'white'},
},
};
auxl.mouth = auxl.Core(auxl.mouthData);
//Spin
auxl.spinData = {
data:'spinData',
id:'spin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,-0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
rotate: {property: 'object3D.rotation.y', from: 0, to: 360, dur: 1500, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.spin = auxl.Core(auxl.spinData);
//Head
auxl.headData = {
data:'headData',
id:'head',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.head = auxl.Core(auxl.headData);
//Body
auxl.bodyData = {
data:'bodyData',
id:'body',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.4, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body = auxl.Core(auxl.bodyData);
//Legs
auxl.legData = {
data:'legData',
id:'leg',
sources: false,
text: false,
geometry: {primitive: 'cone', radiusBottom: 0, radiusTop: 0.15, height: 0.2, openEnded: false, segmentsHeight: 4, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.25,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Leg 1
auxl.leg1Data = auxl.coreDataFromTemplate(auxl.legData, {id: 'leg1',}, true);
auxl.leg1 = auxl.Core(auxl.leg1Data);
//Leg 2
auxl.leg2Data = auxl.coreDataFromTemplate(auxl.legData, {id: 'leg2', position: new THREE.Vector3(0.25,-0.25,0)}, true);
auxl.leg2 = auxl.Core(auxl.leg2Data);
//Leg 3
auxl.leg3Data = auxl.coreDataFromTemplate(auxl.legData, {id: 'leg3', position: new THREE.Vector3(0,-0.25,-0.25)}, true);
auxl.leg3 = auxl.Core(auxl.leg3Data);
//Leg 4
auxl.leg4Data = auxl.coreDataFromTemplate(auxl.legData, {id: 'leg4', position: new THREE.Vector3(0,-0.25,0.25)}, true);
auxl.leg4 = auxl.Core(auxl.leg4Data);
//Ghost Layer
auxl.ghostLayerData = {
	parent: {core: auxl.ghostParent}, 
	child0: {
		parent: {core: auxl.ghostAll}, 
		child0: {
			parent: {core: auxl.eye1Socket}, 
			child0: {core: auxl.eye1Pupil}, 
		}, 
		child1: {
			parent: {core: auxl.eye2Socket}, 
			child0: {core: auxl.eye2Pupil}, 
		}, 
		child2: {core: auxl.mouth},
		child3: {
			parent: {core: auxl.spin}, 
			child0: {core: auxl.head}, 
			child1: {core: auxl.body}, 
			child2: {core: auxl.leg1}, 
			child3: {core: auxl.leg2}, 
			child4: {core: auxl.leg3}, 
			child5: {core: auxl.leg4}, 
		}, 
	}, 

}
auxl.ghost = auxl.Layer('ghost',auxl.ghostLayerData);

//
//Basic Cube
auxl.compCubeParentData = {
data:'compCubeParentData',
id:'compCubeParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compCubeParent = auxl.Core(auxl.compCubeParentData);
auxl.compCubeData = {
data:'compCubeData',
id:'compCube',
sources:false,
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compCube = auxl.Core(auxl.compCubeData);
auxl.cubeLayerData = {
	parent: {core: auxl.compCubeParent},
	child0: {core: auxl.compCube}, 
}
auxl.compCubeLayer = auxl.Layer('compCubeLayer',auxl.cubeLayerData);

//
//Basic Sphere
auxl.compSphereParentData = {
data:'compSphereParentData',
id:'compSphereParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compSphereParent = auxl.Core(auxl.compSphereParentData);
auxl.compSphereData = {
data:'compSphereData',
id:'compSphere',
sources:false,
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.26, side: 'double'},
geometry: {primitive: 'sphere', radius: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compSphere = auxl.Core(auxl.compSphereData);
auxl.compSphereLayerData = {
	parent: {core: auxl.compSphereParent},
	child0: {core: auxl.compSphere}, 
}
auxl.compSphereLayer = auxl.Layer('compSphereLayer',auxl.compSphereLayerData);


//
//Companion Bubble, Book & Pages

//Bubble
auxl.compBubbleParentData = {
data:'compBubbleParentData',
id:'compBubbleParent',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.75, zOffset: 0.025, side: 'front', wrapCount: 30, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.8, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.45,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compBubbleParent = auxl.Core(auxl.compBubbleParentData);
//Speech Close
auxl.compBubbleCloseData = {
data:'compBubbleCloseData',
id:'compBubbleClose',
sources:false,
text: {value:'X', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.08, height: 0.08},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.5,0.06,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compBubbleClose = auxl.Core(auxl.compBubbleCloseData);
//Speech Reset
auxl.compBubbleResetData = {
data:'compBubbleResetData',
id:'compBubbleReset',
sources:false,
text: {value:'@', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.08, height: 0.08},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.5,-0.04,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compBubbleReset = auxl.Core(auxl.compBubbleResetData);
//Comp Bubble Layer
auxl.compBubbleLayerData = {
	parent: {core: auxl.compBubbleParent}, 
	child0: {core: auxl.compBubbleClose}, 
	child1: {core: auxl.compBubbleReset}, 
}
auxl.compBubbleLayer = auxl.Layer('compBubbleLayer',auxl.compBubbleLayerData);
//Comp Book
auxl.compPage0Data = {
	info:{
		id:'compPage0',
		description:'Companion page 0.',
		tags:'comp',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Hey there!'},},
	},
	timeline1:{
		self:{Speak:{speech:'Having fun?'},},
	},
	timeline2:{
		self:{Speak:{speech:'Lets look around.'},},
	},
	timeline3:{
		self:{Speak:{speech:'Whats over there?'}},
	},
	timeline4:{
		self:{Speak:{speech:'Now... where was that cookie I was eating?'}},
	},
	timeline5:{
		self:{Speak:{speech:'Found it!'}},
	},
	timeline6:{
		self: {NewPage: true},
	},
};
auxl.compPage1Data = {
	info:{
		id:'compPage1',
		description:'Companion page 1.',
		tags:'comp',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'2 Hey there!'},},
	},
	timeline1:{
		self:{Speak:{speech:'2 Having fun?'},},
	},
	timeline2:{
		self:{Speak:{speech:'2 Lets look around.'},},
	},
	timeline3:{
		self:{Speak:{speech:'2 Whats over there?'}},
	},
	timeline4:{
		self:{Speak:{speech:'2 Now... where was that cookie I was eating?'}},
	},
	timeline5:{
		self:{Speak:{speech:'2 Found it!'}},
	},
	timeline6:{
		self: {ResetBook: true},
	},
};
auxl.compIdleData = {
	info:{
		id:'compIdleData',
		description:'Companion idle page.',
		tags:'comp',
		nextPage: null,
		prevPage: null,
		timeline:'random',
	},
	timeline0:{
		self:{Speak:{speech:'Yo ho ho ho and a bottle of rum for me...'}},
	},
	timeline1:{
		self:{Speak:{speech:'Ooh a piece of candy!'}},
	},
	timeline2:{
		self:{Speak:{speech:'Nom nom nom nom...'}},
	},
	timeline3:{
		self:{Speak:{speech:'Yada yada yada...'}},
	},
	timeline4:{
		self:{Speak:{speech:'Whistle whistle whistle...'}},
	},
	timeline5:{
		self:{Speak:{speech:'16 16 16...'}},
	},
	timeline6:{
		self:{Speak:{speech:'Twinkle twinkle little star...'}},
	},
	timeline7:{
		self: {IdleReset: true},
	},
};
auxl.compBookData = {
	info:{
		id:'compBook',
		name: 'Comp',
		description:'Companion book.',
		tags:'comp',
		timeline: 'other',
		idleDelay: 5000,
		idleInterval: 7000,
	},
	pages:{
		page0: auxl.compPage0Data,
		page1: auxl.compPage1Data,
	},
	idle:{
		page0: auxl.compIdleData,
	},
};

//
//Companion
auxl.comp = auxl.Companion('comp',auxl.ghost);

//
//Control Configuration View
auxl.configurationViewData = {
data:'configurationViewData',
id:'configurationView',
sources:false,
text: {value:'Controls', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 2, height: 1},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,1.5,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components:{
clickrun:{cursorObj: 'comp', method: 'ToggleControlView'}, 
//['look-at-xyz']:{match: 'camera', y:true},
['stare']:{id: 'playerRig', twist: true},
},
};
auxl.configurationView = auxl.Core(auxl.configurationViewData);

//
//Text Bubbles

//Scene Text Bubble Template
auxl.sceneTextData = {
data:'Scene display text.',
id:'sceneText',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 2, height: 0.3},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.69,-0.8),
rotation: new THREE.Vector3(-30,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
//Side Text Bubble Template
auxl.textBubbleSideData = {
data:'text bubble to the side of user/character',
id:'textBubbleSide',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.375,1.7,-0.65),
rotation: new THREE.Vector3(5,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.textBubbleSide = auxl.Core(auxl.textBubbleSideData);
//Bottom Text Bubble Template
auxl.textBubbleBottomData = {
data:'text bubble on bottom',
id:'textBubbleBottom',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 2, height: 0.3},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.69,-0.8),
rotation: new THREE.Vector3(-30,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.textBubbleBottom = auxl.Core(auxl.textBubbleBottomData);
//Top Text Bubble Template
auxl.textBubbleTopData = {
data:'text bubble on top',
id:'textBubbleTop',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 2, height: 0.3},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,2.05,-1.25),
rotation: new THREE.Vector3(15,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.textBubbleTop = auxl.Core(auxl.textBubbleTopData);

//
//Details & Prompt

//Detail Main View
auxl.detailMainData = {
data:'detailMainData',
id:'detailMain',
sources:false,
text: {value:'Details...', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.065, side: 'double'},
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,1.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0,0,0),
animations:{opening:{property: 'scale', from: '0.001 0.001 0.001', to: '1 1 1', dur: 500, delay: 50, loop: 'false', dir: 'linear', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true, startEvents: 'open'}, close: {property: 'scale', from: '1 1 1', to: '0.001 0.001 0.001', dur: 500, delay: 50, loop: false, dir: 'linear', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'close'}},
mixins: false,
classes: ['a-ent'],
components: {
//detailprompt:{type: 'detail'},
['stare']:{id: 'playerRig'},
},
};
//Detail Close Button
auxl.detailCloseData = {
data:'detailCloseData',
id:'detailClose',
sources:false,
text: {value:'X', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.065, side: 'double'},
geometry: {primitive: 'box', depth: 0.1, width: 0.25, height: 0.25},
material: {shader: "standard", color: "#c14b4b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c14b4b", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.5,0.5,0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0,0,0),
animations:{opening:{property: 'scale', from: '0.001 0.001 0.001', to: '1 1 1', dur: 500, delay: 50, loop: 'false', dir: 'linear', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true, startEvents: 'open'}, close: {property: 'scale', from: '1 1 1', to: '0.001 0.001 0.001', dur: 500, delay: 50, loop: false, dir: 'linear', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'close'}},
mixins: false,
classes: ['clickable','a-ent'],
//components: {detailprompt:{type: 'detail'}},
components: false,
};

//
//Teleportation

//Parent
auxl.teleportParentData = {
data:'teleportParentData',
id:'teleportParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.025,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1pos: {property: 'object3D.position.y', from: 0.025, to: 0.75, dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click1'},
click1rot: {property: 'object3D.rotation.x', from: -90, to: 720, dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click1'},
posreset: {property: 'object3D.position.y', from: 0.75, to: 0.025, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
rotreset: {property: 'object3D.rotation.x', from: 720, to: -90, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
posresetinstant: {property: 'object3D.position.y', from: 0.75, to: 0.025, dur: 50, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'resetInstant'},
rotresetinstant: {property: 'object3D.rotation.x', from: 720, to: -90, dur: 50, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'resetInstant'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Confirm
auxl.teleportConfirmData = {
data:'teleportConfirmData',
id:'teleportConfirm',
sources:false,
text: {value:'Teleport Here', wrapCount: 45, width: 5, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center', opacity: 0.75},
geometry: {primitive: 'circle', radius: 0.75, segments: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#838282", opacity: 0.75, metalness: 0.6, roughness: 0.4, emissive: "#838282", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent', 'clickable', 'teleporter', 'teleport'],
components: {
teleportation:null,
},
};
//Cancel
auxl.teleportCancelData = {
data:'teleportCancelData',
id:'teleportCancel',
sources:false,
text: {value:'Cancel', wrapCount: 45, width: 5, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center', opacity: 0},
geometry: {primitive: 'circle', radius: 0.75, segments: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#838282", opacity: 0, metalness: 0.6, roughness: 0.4, emissive: "#838282", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0,1.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.5,0.5,0.5),
animations: {
click1opac: {property: 'material.opacity', from: 0, to: 0.75, dur: 1000, delay: 1800, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click1'},
click1textopac: {property: 'text.opacity', from: 0, to: 1, dur: 1000, delay: 1800, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click1'},
click1opacreset: {property: 'material.opacity', from: 0.75, to: 0, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
click1textopacreset: {property: 'text.opacity', from: 1, to: 0, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
click1opacresetinstant: {property: 'material.opacity', from: 0.75, to: 0, dur: 50, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'resetInstant'},
click1textopacresetinstant: {property: 'text.opacity', from: 1, to: 0, dur: 50, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'resetInstant'},
},
mixins: false,
classes: ['a-ent', 'clickable', 'teleporter', 'cancel'],
components: {
teleportation:null,
},
};

//8 Point Layout
let teleportPos = [
new THREE.Vector3(0,0.025,0),
new THREE.Vector3(-5,0.025,-5),
new THREE.Vector3(0,0.025,-10),
new THREE.Vector3(-5,0.025,5),
new THREE.Vector3(-10,0.025,0),
new THREE.Vector3(5,0.025,-5),
new THREE.Vector3(10,0.025,0),
new THREE.Vector3(5,0.025,5),
new THREE.Vector3(0,0.025,10),
];
auxl.teleport = auxl.Teleport('teleport', teleportPos);
//4 Point Layout
let teleportPos0 = [
new THREE.Vector3(0,0.025,0),
new THREE.Vector3(-5,0.025,-5),
new THREE.Vector3(-5,0.025,5),
new THREE.Vector3(5,0.025,-5),
new THREE.Vector3(5,0.025,5),
];
auxl.teleport0 = auxl.Teleport('teleport0', teleportPos0);

//Raycast Teleportation Testing
auxl.teleportPortalData = {
data:'teleportPortalData',
id:'teleportPortal',
sources: false,
text: false,
geometry: {primitive: 'plane', width: 2, height: 10,},
material: {shader: "standard", color: "#beef1a", opacity: 0.25, metalness: 0.6, roughness: 0.4, emissive: "#beef1a", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(10,5,-10),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent','clickable'],
components:{
//['look-at-xyz']:{match: 'camera', y:true},
['stare']:{id: 'playerRig', twist: true},
['raycast-teleportation']:null,
},
};
auxl.teleportPortal1Data = auxl.coreDataFromTemplate(auxl.teleportPortalData, {id: 'teleportPortal1',}, true);
auxl.teleportPortal1 = auxl.Core(auxl.teleportPortal1Data);
auxl.teleportPortal2Data = auxl.coreDataFromTemplate(auxl.teleportPortalData, {id: 'teleportPortal2', position: new THREE.Vector3(0,5,3)}, true);
auxl.teleportPortal2 = auxl.Core(auxl.teleportPortal2Data);


//
//Environment

//DayNight SkyBox
//

//Directional - Pre-Added
auxl.directionalLightData = {
data:'directionalLight',
id:'directionalLight',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(-1,1,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
daylight:{property: 'light.intensity', from: 0.1, to: 1, dur: auxl.timeInDay/4, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
daypos:{property: 'position', from: new THREE.Vector3(-1,1,-1), to: new THREE.Vector3(1,1,1), dur: auxl.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 1, castShadow: false},
},
};
auxl.directionalLight = auxl.Core(auxl.directionalLightData);
//Ambient - Pre-Added
auxl.ambientLightData = {
data:'ambientLight',
id:'ambientLight',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
daylight:{property: 'light.intensity', from: 0.5, to: 0.25, dur: auxl.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
daycolor:{property: 'light.color', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/4, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'ambient', intensity: 1, color: '#716a9a'},
},
};
auxl.ambientLight = auxl.Core(auxl.ambientLightData);
//Directional 2
auxl.directionalLight2Data = {
data:'directionalLight2',
id:'directionalLight2',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(1,1,1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
nightlight:{property: 'light.intensity', from: 0.2, to: 0.1, dur: auxl.timeInDay/4, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
daypos:{property: 'position', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(-1,1,-1), dur: auxl.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},

},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 0.1, castShadow: false},
},
};
auxl.directionalLight2 = auxl.Core(auxl.directionalLight2Data);
//Directional 3
auxl.directionalLight3Data = {
data:'directionalLight3',
id:'directionalLight3',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(1,1,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
daylight:{property: 'light.intensity', from: 0.05, to: 0.1, dur: auxl.timeInDay/4, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
daypos:{property: 'position', from: new THREE.Vector3(1,1,-1), to: new THREE.Vector3(-1,1,-1), dur: auxl.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 0.05, castShadow: false},
},
};
auxl.directionalLight3 = auxl.Core(auxl.directionalLight3Data);

//Sun
auxl.sunOuterData = {
data:'sunOuter',
id:'sunOuter',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-5,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: -5, to: 355, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.sunData = {
data:'sun',
id:'sun',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 50,},
material: {shader: "standard", color: "#F0A500", opacity: 1, side: 'front', emissive: '#F0A500', emissiveIntensity: 1, fog: false},
position: new THREE.Vector3(0,0,-400),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.sunOuter = auxl.Core(auxl.sunOuterData);
auxl.sun = auxl.Core(auxl.sunData);
auxl.sunLayerData = {
parent: {core: auxl.sunOuter},
child0: {core: auxl.sun},
}
auxl.sunLayer = auxl.Layer('sunLayer', auxl.sunLayerData);
//Moon
auxl.moonOuterData = {
data:'moonOuter',
id:'moonOuter',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(175,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: 175, to: 535, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.moonData = {
data:'moon',
id:'moon',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 24,},
material: {shader: "standard", color: "#5c2196", opacity: 1, side: 'front', emissive: '#5c2196', emissiveIntensity: 0.75, fog: false},
position: new THREE.Vector3(0,0,-400),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.moonOuter = auxl.Core(auxl.moonOuterData);
auxl.moon = auxl.Core(auxl.moonData);
auxl.moonLayerData = {
parent: {core: auxl.moonOuter},
child0: {core: auxl.moon},
}
auxl.moonLayer = auxl.Layer('moonLayer', auxl.moonLayerData);

//3GradDualSky
//threeColorGradientShader error : core:schema:warn Unknown property `color` for component/system `material`
auxl.skyGradData = {
data: 'sky gradient',
id: 'skyGrad',
entity: 'a-sky',
sources: false,
text: false,
geometry: false,
material: {shader: 'threeColorGradientShader', topColor: '#613381', middleColor: '#99154E', bottomColor: '#b967ff'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
sunrisetop:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
sunrisemid:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}, 
sunsettop:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
sunsetmid:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}, 
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.skyGrad = auxl.Core(auxl.skyGradData);
//
//skyBox0
auxl.skyBox0Data = {
data:'skyBox0Data',
id:'skyBox0',
sources:false,
lights:[
auxl.directionalLight,
auxl.directionalLight2,
auxl.directionalLight3,
auxl.ambientLight,
],
sky:[
auxl.skyGrad,
],
space:[
auxl.sunLayer,
auxl.moonLayer,
],
};
auxl.skyBox0 = auxl.SkyBox(auxl.skyBox0Data);

//
//Collision Support
auxl.mapEdgeBasicData = {
data:'mapEdgeBasicData',
id:'mapEdgeBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.5},
material: {shader: "standard", color: "#6c4646", opacity: 1},
position: new THREE.Vector3(0,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.mapEdgeBasic = auxl.Core(auxl.mapEdgeBasicData);


//Build Library Objects
auxl.buildLibrary = () => {

//Player is Reset within Rebuild()

//Companion Avatars
//Ghost
auxl.ghostParent = auxl.Core(auxl.ghostParentData);
auxl.ghostAll = auxl.Core(auxl.ghostAllData);
auxl.eye1Socket = auxl.Core(auxl.eye1SocketData);
auxl.eye2Socket = auxl.Core(auxl.eye2SocketData);
auxl.eye1Pupil = auxl.Core(auxl.eye1PupilData);
auxl.eye2Pupil = auxl.Core(auxl.eye2PupilData);
auxl.mouth = auxl.Core(auxl.mouthData);
auxl.spin = auxl.Core(auxl.spinData);
auxl.head = auxl.Core(auxl.headData);
auxl.body = auxl.Core(auxl.bodyData);
auxl.leg1 = auxl.Core(auxl.leg1Data);
auxl.leg2 = auxl.Core(auxl.leg2Data);
auxl.leg3 = auxl.Core(auxl.leg3Data);
auxl.leg4 = auxl.Core(auxl.leg4Data);
auxl.ghost = auxl.Layer('ghost',auxl.ghostLayerData);
//Cube
auxl.compCubeParent = auxl.Core(auxl.compCubeParentData);
auxl.compCube = auxl.Core(auxl.compCubeData);
auxl.compCubeLayer = auxl.Layer('compCubeLayer',auxl.cubeLayerData);
//Sphere
auxl.compSphereParent = auxl.Core(auxl.compSphereParentData);
auxl.compSphere = auxl.Core(auxl.compSphereData);
auxl.compSphereLayer = auxl.Layer('compSphereLayer',auxl.compSphereLayerData);
//Text Bubble
auxl.compBubbleParent = auxl.Core(auxl.compBubbleParentData);
auxl.compBubbleClose = auxl.Core(auxl.compBubbleCloseData);
auxl.compBubbleReset = auxl.Core(auxl.compBubbleResetData);
auxl.compBubbleLayer = auxl.Layer('compBubbleLayer',auxl.compBubbleLayerData);
//Companion
auxl.comp = auxl.Companion('comp',auxl.ghost);

//Configuration Screen
auxl.configurationView = auxl.Core(auxl.configurationViewData);

//TextBubble
auxl.textBubbleSide = auxl.Core(auxl.textBubbleSideData);
auxl.textBubbleBottom = auxl.Core(auxl.textBubbleBottomData);
auxl.textBubbleTop = auxl.Core(auxl.textBubbleTopData);

//Teleport
auxl.teleport = auxl.Teleport('teleport', teleportPos);
auxl.teleport0 = auxl.Teleport('teleport0', teleportPos0);
auxl.teleportPortal1 = auxl.Core(auxl.teleportPortal1Data);
auxl.teleportPortal2 = auxl.Core(auxl.teleportPortal2Data);

//Lighting
auxl.directionalLight = auxl.Core(auxl.directionalLightData);
auxl.ambientLight = auxl.Core(auxl.ambientLightData);
auxl.directionalLight2 = auxl.Core(auxl.directionalLight2Data);
auxl.directionalLight3 = auxl.Core(auxl.directionalLight3Data);

//SkyBox
auxl.sunOuter = auxl.Core(auxl.sunOuterData);
auxl.sun = auxl.Core(auxl.sunData);
auxl.sunLayer = auxl.Layer('sunLayer', auxl.sunLayerData);
auxl.moonOuter = auxl.Core(auxl.moonOuterData);
auxl.moon = auxl.Core(auxl.moonData);
auxl.moonLayer = auxl.Layer('moonLayer', auxl.moonLayerData);
auxl.skyGrad = auxl.Core(auxl.skyGradData);
auxl.skyBox0 = auxl.SkyBox(auxl.skyBox0Data);

//Collision Support
auxl.mapEdgeBasic = auxl.Core(auxl.mapEdgeBasicData);

}
auxl.toBeRebuilt('buildLibrary');

},
});

//
//Export
export default library;