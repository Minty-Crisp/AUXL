//
//AUXL : A-Frame UX Library
//v0.2 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.2 - Sytem - In Progress

//auxl
//AUXL System : System, ObjGens & Support Functions
AFRAME.registerSystem('auxl', {
//schema: {
	//bar: {type: 'number'},
	//style: {type: 'string', default: 'random'}
//},

init: function () {
//console.log('AUXL INIT');
// System
/*************************************************************/
//
//Scene Load Checking
this.checkSceneLoadThrottled = AFRAME.utils.throttle(this.checkSceneLoad, 30, this);

//Establish a-frame objects
const sceneEl = document.querySelector('a-scene');
const head = document.querySelector('head');
let auxl = this;
//Experience
this.expStarted = false;
//Scene
this.loadingScene = false;
this.loadingObjects = new Map();
//JS Scripts Loaded
this.jsLoaded = {};
//JS Scripts Predefined, Ready to be loaded
this.jsAll = {
['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',
//threeGradShader: 'https://unpkg.com/@tlaukkan/aframe-three-color-gradient-shader@0.0.1/index.js',//Shaders needs it's own checker
};
//Menu
const stickyMenu = document.getElementById('stickyMenu');
const beginDiv = document.getElementById('beginDiv');
const startButton = document.getElementById('startButton');
const menuModeButton = document.getElementById('menuModeButton');
const audioButton = document.getElementById('audioButton');
const viewInfo = document.getElementById('viewInfo');
const expInfo = document.getElementById('expInfo');
const infoClose = document.getElementById('infoClose');
const instructions = document.getElementById('instructions');
const scenarioHeaderTitle = document.getElementById('scenarioHeaderTitle');
const scenarioMenuTitle = document.getElementById('scenarioMenuTitle');
this.menuOpen = true;
this.infoOpen = false;
//Audio
this.audioEnabled = false;
//HTML Controls
const controllerBlock = document.getElementById('controllerBlock');
//Controls
this.universalControls;
this.controls = 'Desktop';
this.vrHand = 'bothRight';
this.mobilePermissionGranted = false;
let playerRig;
let camera;
let cameraUI;
let playerFloor;
let mouseController;
let vrController1;
let vrController1UI;
let vrController2;
let vrController2UI;
this.joystickReader = '';
this.controller1Reader = '';
this.controller2Reader = '';
//Object Tracking
this.spawned = {};
this.scenarioSpawned = {};
this.zoneSpawned = {};
this.nodeSpawned = {};
this.bookSpawned = {};
//Objects that have sources or components requiring js import storage
this.spawnedWaitingForJS = {};
//Scenario, Zone, Node & Books use this to confirm before using spawnTracker
//All Named Object Spawn Functions
this.spawnFunc = [
'SpawnCore',
'SpawnLayer',
'SpawnMenu',
'SpawnObjRing',
'SpawnMultiAsset',
'SpawnHam',
'SpawnTeleport',
'SpawnNPC',
'SpawnSpeech',
'SpawnBook',
'SpawnHorizon',
'SpawnSkyBox',
'SpawnImgSwap',
'SpawnImgCarousel',
'SpawnMemGame'
];
//Spawn Tracker
function spawnTracker(obj, spawnLocation, bookName){

	//Configure Tracker
	let tracker;
	if(spawnLocation === 'scenario'){
		tracker = 'scenarioSpawned';
	} else if(spawnLocation === 'zone'){
		tracker = 'zoneSpawned';
	} else if(spawnLocation === 'node'){
		tracker = 'nodeSpawned';
	} else if(spawnLocation === 'book'){
		tracker = 'bookSpawned';
	} else {
		tracker = 'nodeSpawned';
	}

	//Check for Object Type & ID
	let type;
	let id;
	if(auxl[obj]){
		if(auxl[obj].DespawnCore){
			type = 'core';
			id = auxl[obj].core.id;
		} else if(auxl[obj].DespawnLayer){
			type = 'layer';
			id = auxl[obj].layer.id;
		} else if(auxl[obj].DespawnMenu){
			type = 'menu';
			id = auxl[obj].menu.id;
		} else if(auxl[obj].DespawnObjRing){
			type = 'singleGen';
			id = auxl[obj].singleGen.id;
		} else if(auxl[obj].DespawnMultiAsset){
			type = 'multiGen';
			id = auxl[obj].multiGen.id;
		} else if(auxl[obj].DespawnHam){
			type = 'ham';
			id = auxl[obj].ham.id;
		} else if(auxl[obj].DespawnTeleport){
			type = 'teleport';
			id = auxl[obj].teleport.id;
		} else if(auxl[obj].DespawnNPC){
			type = 'npc';
			id = auxl[obj].npc.id;
		} else if(auxl[obj].DespawnSpeech){
			type = 'speechSystem';
			id = auxl[obj].speechSystem.id;
		} else if(auxl[obj].DespawnBook){
			type = 'book';
			id = auxl[obj].book.id;
		} else if(auxl[obj].DespawnHorizon){
			type = 'horizon';
			id = auxl[obj].horizon.id;
		} else if(auxl[obj].DespawnSkyBox){
			type = 'skyBox';
			id = auxl[obj].skyBox.id;
		} else if(auxl[obj].DespawnImgSwap){
			type = 'imageSwapper';
			id = auxl[obj].imageSwapper.id;
		} else if(auxl[obj].DespawnImgCarousel){
			type = 'imageCarousel';
			id = auxl[obj].imageCarousel.id;
		} else if(auxl[obj].DespawnMemGame){
			type = 'memory';
			id = auxl[obj].memory.id;
		} else {
			console.log('Tracker type error');
		}
	}
	//Add to Tracker
	if(spawnLocation === 'book'){
		if(auxl[tracker][bookName]){}else{
			auxl[tracker][bookName] = {};
		}
		auxl[tracker][bookName][id] = {type, obj};
	} else {
		auxl[tracker][id] = {type, obj};
	}

}
//Clear Spawned from Scenario, Zone or Node
function clearSpawned(spawned){
	for(let spawn in spawned){
		//console.log(spawn);//name of ID
		//console.log(spawned[spawn]);//obj
		//console.log(auxl[spawn]);
		if(auxl[spawn]){
			if(spawned[spawn].type === 'core'){
				auxl[spawn].DespawnCore();
			} else if (spawned[spawn].type === 'layer'){
				auxl[spawn].DespawnLayer();
			} else if (spawned[spawn].type === 'singleGen'){
				auxl[spawn].DespawnObjRing();
			} else if (spawned[spawn].type === 'multiGen'){
				auxl[spawn].DespawnMultiAsset();
			} else if (spawned[spawn].type === 'ham'){
				auxl[spawn].DespawnHam();
			} else if (spawned[spawn].type === 'teleport'){
				auxl[spawn].DespawnTeleport();
			} else if (spawned[spawn].type === 'npc'){
				auxl[spawn].DespawnNPC();
			} else if (spawned[spawn].type === 'horizon'){
				auxl[spawn].DespawnHorizon();
			} else if (spawned[spawn].type === 'skyBox'){
				auxl[spawn].DespawnSkyBox();
			} else if (spawned[spawn].type === 'imageSwapper'){
				auxl[spawn].DespawnImgSwap();
			} else if (spawned[spawn].type === 'imageCarousel'){
				auxl[spawn].DespawnImgCarousel();
			} else if (spawned[spawn].type === 'memory'){
				auxl[spawn].DespawnMemGame();
			} else {
				console.log('Despawn type error');
			}
		} else {
			if (spawned[spawn].type === 'menu'){
				spawned[spawn].obj.DespawnMenu();
			} else {
				console.log('Despawn not compatible');
				console.log(spawn);
				console.log(spawned[spawn]);
				console.log(document.getElementById(spawn));
			}
		}
		//console.log(spawned[spawn]);//Book & Page spawned from
		delete spawned[spawn];
		/*
		if(Object.keys(auxl.bookSpawned[bookName]).length === 0){
			delete auxl.bookSpawned[bookName];
		}
		*/
	}
}
//Remove From Tracker
function RemoveFromTracker(id, bookname){
	if(auxl.scenarioSpawned[id]){
		delete auxl.scenarioSpawned[id];
	} else if(auxl.zoneSpawned[id]){
		delete auxl.zoneSpawned[id];
	} else if(auxl.nodeSpawned[id]){
		delete auxl.nodeSpawned[id];
	} else if(auxl.bookSpawned[id]){
		delete auxl.bookSpawned[bookName][id];
	}
}
//Timeout, Interval, Interaction & Events currently running
this.running = {};
this.zoneRunning = {};
this.scenarioRunning = {};
this.timeouts = {};
this.intervals = {};
this.interactions = {};
this.events = {};
//Environmental Settings
this.defaultScenario;
this.timeInDay = 360000;

//
//HTML Menu
function toggleMenu(){
	if(auxl.menuOpen){
		//Close Menu
		beginDiv.style.display = 'none';
		auxl.menuOpen = false;
		if(auxl.infoOpen){
			toggleInfo();
		}
	} else {
		//Open Menu
		beginDiv.style.display = 'flex';
		auxl.menuOpen = true;
	}
}
stickyMenu.addEventListener('click', toggleMenu);

//
//Start Experience
function startExp(){
	if(auxl.expStarted){}else{
		auxl.defaultScenario.StartScenario();
		startButton.innerHTML = 'Resume';
		updateControls();
		auxl.expStarted = true;
	}
	toggleMenu();
}
startButton.addEventListener('click', startExp);

//
//Controls
//VR
function disableVRControls(){
	//Disable VR Controls
	//playerRig.removeAttribute('universal-controls');
	//vrController visible to true
	vrController1.setAttribute('visible',false);
	vrController2.setAttribute('visible',false);
	//vrControllerUI visible to true
	vrController1UI.setAttribute('visible',false);
	vrController2UI.setAttribute('visible',false);
	//vrController cursor property
	vrController1.removeAttribute('cursor');
	vrController2.removeAttribute('cursor');
	//vrController raycaster property
	//Removing and re-adding raycaster messes up the pointer's direction
	//vrController1.removeAttribute('raycaster');
	//vrController2.removeAttribute('raycaster');
	//vrController laser-controls property
	vrController1.removeAttribute('laser-controls');
	vrController2.removeAttribute('laser-controls');
	//vrController controls property
	//vrController1.removeAttribute('vr-left-inputs');
	//vrController2.removeAttribute('vr-right-inputs');
}
function enableVRControls(){
	//Enable VR Controls
	if(auxl.vrHand === 'bothRight'){
		//vrController visible to true
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		//vrControllerUI visible to true
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		//vrController laser-controls property
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		//vrController raycaster property
		vrController1.setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		//vrController cursor property
		vrController2.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		//vrController Controls
		//vrController1.setAttribute('vr-left-inputs',{joystickEnabled: true});
		//vrController2.setAttribute('vr-right-inputs',{joystickEnabled: true});
		//Enable VR Locomotion
		auxl.player.EnableVRLocomotion();
		playerRig.setAttribute('universal-controls',{update: 1});
	} else if(auxl.vrHand === 'bothLeft'){
		//vrController visible to true
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		//vrControllerUI visible to true
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		//vrController laser-controls property
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		//vrController raycaster property
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		//vrController cursor property
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		//vrController Controls
		//vrController1.setAttribute('vr-left-inputs',{joystickEnabled: true});
		//vrController2.setAttribute('vr-right-inputs',{joystickEnabled: true});
		//Enable VR Locomotion
		auxl.player.EnableVRLocomotion();
		playerRig.setAttribute('universal-controls',{update: 2});
	} else if(auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'bothLeftLoco'){
		//vrController visible to true
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		//vrControllerUI visible to true
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		//vrController laser-controls property
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		//vrController raycaster property
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: 'false'});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		//vrController cursor property
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		vrController2.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		//vrController Controls
		//vrController1.setAttribute('vr-left-inputs',{joystickEnabled: true});
		//vrController2.setAttribute('vr-right-inputs',{joystickEnabled: true});
		//Enable VR Locomotion
		auxl.player.EnableVRLocomotion();
		playerRig.setAttribute('universal-controls',{update: 3});
	} else if(auxl.vrHand === 'right'){
		//vrController visible to true
		vrController2.setAttribute('visible',true);
		//vrControllerUI visible to true
		vrController2UI.setAttribute('visible',true);
		//vrController laser-controls property
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		//vrController raycaster property
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		//vrController cursor property
		vrController2.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		//vrController Controls
		//vrController2.setAttribute('vr-right-inputs',{joystickEnabled: false});
		//Enable VR Hover Locomotion
		auxl.player.EnableVRHoverLocomotion('vrController2');
		playerRig.setAttribute('universal-controls',{update: 4});
	} else if(auxl.vrHand === 'left'){
		//vrController visible to true
		vrController1.setAttribute('visible',true);
		//vrControllerUI visible to true
		vrController1UI.setAttribute('visible',true);
		//vrController laser-controls property
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		//vrController raycaster property
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		//vrController cursor property
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		//vrController Controls
		//vrController1.setAttribute('vr-left-inputs',{joystickEnabled: false});
		//Enable VR Hover Locomotion
		auxl.player.EnableVRHoverLocomotion('vrController1');
		playerRig.setAttribute('universal-controls',{update: 5});
	}
}
//Desktop
function disableDesktopControls(){
	//Disable Desktop Controls
	//playerRig.removeAttribute('universal-controls');
	//Remove Desktop WASD Controls
	//playerRig.removeAttribute('wasd-controls');
	//playerRig.removeAttribute('movement-controls');
	//Set mouseController to invisible
	mouseController.setAttribute('visible',false);
	//Set mouseController raycaster to false
	mouseController.removeAttribute('raycaster');
	//Remove cursor attribute
	mouseController.removeAttribute('cursor');
}
function enableDesktopControls(){
	//Enable Desktop Controls
	//Remove Desktop WASD Controls
	//playerRig.setAttribute('wasd-controls',{enabled: 'true', acceleration: 25});
	//playerRig.setAttribute('movement-controls',{enabled: 'true', controls: 'keyboard', speed: 0.1, fly: false, constrainToNavMesh: false, camera: '#camera'});
	//Set mouseController to invisible
	mouseController.setAttribute('visible',true);
	//Set mouseController raycaster to false
	mouseController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	//Set cursor attribute
	//mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true',});

	//Enable Desktop Locomotion
	auxl.player.EnableDesktopLocomotion();
	//Update Controls
	auxl.controls = 'Desktop';
		playerRig.setAttribute('universal-controls',{update: 0});
}
//Mobile
function disableMobileControls(){
	//playerRig.removeAttribute('universal-controls');
	//sceneEl.setAttribute('device-orientation-permission-ui', {enabled: false});
	//playerRig.removeAttribute('movement-controls');
	//Set mouseController to invisible
	mouseController.setAttribute('visible',false);
	//Set mouseController raycaster to false
	mouseController.removeAttribute('raycaster');
	//Remove cursor attribute
	mouseController.removeAttribute('cursor');
	//HTML Controller
	controllerBlock.style.display = 'none';
}
function enableMobileControls(){
//deviceorientationpermissiongranted
//deviceorientationpermissionrejected
//deviceorientationpermissionrequested
	function mobilePermissionGrantedTrue(){
		auxl.mobilePermissionGranted = true;
	}
	function mobilePermissionGrantedFalse(){
		auxl.mobilePermissionGranted = false;
	}
	//sceneEl.setAttribute('device-orientation-permission-ui', {enabled: true});
	//sceneEl.addEventListener('deviceorientationpermissiongranted', mobilePermissionGrantedTrue);
	//sceneEl.addEventListener('deviceorientationpermissionrejected', mobilePermissionGrantedFalse);
	//playerRig.setAttribute('movement-controls',{enabled: 'false', controls: 'touch', speed: 0.1, fly: false, constrainToNavMesh: false, camera: '#camera'});
	//Set mouseController to invisible
	mouseController.setAttribute('visible',true);
	//Set mouseController raycaster to false
	mouseController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	//Remove cursor attribute
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	//HTML Controller
	controllerBlock.style.display = 'flex';
	//Enable Desktop Locomotion
	auxl.player.EnableMobileLocomotion();
	//Update Controls
	auxl.controls = 'Mobile';
		playerRig.setAttribute('universal-controls',{update: 6});
}
//Update Controls
function updateControls(){
	if(auxl.controls === 'Desktop'){
		disableVRControls();
		disableMobileControls();
		enableDesktopControls();
	} else if(auxl.controls === 'Mobile'){
		disableVRControls();
		disableDesktopControls();
		enableMobileControls();
	} else if(auxl.controls === 'VR'){
		disableVRControls();
		disableDesktopControls();
		disableMobileControls();
		enableVRControls();
	}
}
//Menu Button Controls
function changeControls(){
	if(auxl.controls === 'Desktop'){
		auxl.controls = 'VR';
		menuModeButton.innerHTML = 'Mode : VR';
		vrHandButton.style.display = 'flex';
	} else if(auxl.controls === 'VR'){
		vrHandButton.style.display = 'none';
		auxl.controls = 'Mobile';
		menuModeButton.innerHTML = 'Mode : Mobile';
	} else if(auxl.controls === 'Mobile'){
		auxl.controls = 'Desktop';
		menuModeButton.innerHTML = 'Mode : Desktop'
	}
	updateControls();
}
menuModeButton.addEventListener('click', changeControls);

function changeVRHand(){
	if(auxl.vrHand === 'bothRight'){
		auxl.vrHand = 'bothLeft';
		vrHandButton.innerHTML = '2 Hands : Left Ray | Right Move';
	} else if(auxl.vrHand === 'bothLeft'){
		auxl.vrHand = 'bothLeftLoco';
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Left Move';
	} else if(auxl.vrHand === 'bothLeftLoco'){
		auxl.vrHand = 'bothRightLoco';
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Right Move';
	} else if(auxl.vrHand === 'bothRightLoco'){
		auxl.vrHand = 'right';
		vrHandButton.innerHTML = '1 Hand : Right Ray | Belt Move';
	} else if(auxl.vrHand === 'right'){
		auxl.vrHand = 'left';
		vrHandButton.innerHTML = '1 Hand : Left Ray | Belt Move';
	} else if(auxl.vrHand = 'left') {
		auxl.vrHand = 'bothRight';
		vrHandButton.innerHTML = '2 Hands : Right Ray | Left Move';
	}
	updateControls();
}
vrHandButton.addEventListener('click', changeVRHand);

//
//Audio
function toggleAudio(){
	if(auxl.audioEnabled){
		//Disable Audio
		auxl.audioEnabled = false;
		audioButton.innerHTML = 'Sound : Disabled';
	} else {
		//Enable Audio
		auxl.audioEnabled = true;
		audioButton.innerHTML = 'Sound : Enabled';
	}
}
audioButton.addEventListener('click', toggleAudio);

//
//Instructions
function toggleInfo(){
	if(auxl.infoOpen){
		//Close Info
		expInfo.style.display = 'none';
		auxl.infoOpen = false;
	} else {
		//Open Info
		expInfo.style.display = 'flex';
		auxl.infoOpen = true;
	}
}
viewInfo.addEventListener('click', toggleInfo);
infoClose.addEventListener('click', toggleInfo);

//
//Support

//
//Color Theory Generator
//Generate a color theory palette from a given color, color family or a random color
this.colorTheoryGen = (color, family) => {

//color accepts Hex values only at the moment, more options coming soon

//Colors Generated :
//Base
//Complementary
//Split-complementary
//Triadic
//Tetradic
//Analagous
//Monochrome - coming soon

let r;
let r0;
let g;
let g0;
let b;
let b0;
let base;
let baseRGB;
let familyCheck = false;
const colorFamily =['red','orange','yellow','lime','blue','cyan','magenta','maroon','olive','green','purple','teal','navy','silver','grey','black','white'];

//Support Functions
function HSLToRGB(h,s,l) {
	// Must be fractions of 1
	//s /= 100;
	//l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
	  x = c * (1 - Math.abs((h / 60) % 2 - 1)),
	  m = l - c/2,
	  r = 0,
	  g = 0,
	  b = 0;

	if (0 <= h && h < 60) {
	r = c; g = x; b = 0;  
	} else if (60 <= h && h < 120) {
	r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
	r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
	r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
	r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
	r = c; g = 0; b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return {r,g,b};
}
function RGBToHex(r,g,b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1)
	r = "0" + r;
	if (g.length == 1)
	g = "0" + g;
	if (b.length == 1)
	b = "0" + b;

	return "#" + r + g + b;
}
function hexToRGB(h) {
	let r = 0, g = 0, b = 0;

	// 3 digits
	if (h.length == 4) {
	r = "0x" + h[1] + h[1];
	g = "0x" + h[2] + h[2];
	b = "0x" + h[3] + h[3];

	// 6 digits
	} else if (h.length == 7) {
	r = "0x" + h[1] + h[2];
	g = "0x" + h[3] + h[4];
	b = "0x" + h[5] + h[6];
	}

	//return "rgb("+ +r + "," + +g + "," + +b + ")";
	return {r,g,b};
}
function randomColorFamily(){
	return colorFamily[Math.floor(Math.random()*(colorFamily.length-4))];
	//Ignore last 4 Black/White/Grey/Silver
}

//Check if color input is useable
if(color){
	if(color[0] === '#' && color.length === 4 || color[0] === '#' && color.length === 7){} else {
		color = false;
	}
}
//Check if family input is useable
if(family){
	for(let each in colorFamily){
		if(family === colorFamily[each]){
			familyCheck = true;
			break;
		}
	}
	if(familyCheck){} else {
		family = randomColorFamily();
	}
}

//Generate Color Values
if(color){
	//color is Hex
	base = color;
	baseRGB = hexToRGB(base);

	//convert Hex to RGB
	r = baseRGB.r;
	r0 = r/255;
	g = baseRGB.g;
	g0 = g/255;
	b = baseRGB.b;
	b0 = b/255;
} else {
	if(!family){
		family = randomColorFamily();
	}
	if(family === 'red'){
		r = Math.floor(Math.random()*55)+200;
		g = b = 0;
	} else if(family === 'orange'){
		r = Math.floor(Math.random()*105)+150;
		g = Math.floor(r*0.65);
		b = 0;
	} else if(family === 'yellow'){
		r = g = Math.floor(Math.random()*55)+200;
		b = 0;
	} else if(family === 'lime'){
		g = Math.floor(Math.random()*55)+200;
		r = b = 0;
	} else if(family === 'blue'){
		b = Math.floor(Math.random()*55)+200;
		r = g = 0;
	} else if(family === 'cyan'){
		g = b = Math.floor(Math.random()*55)+200;
		r = 0;
	} else if(family === 'magenta'){
		r = b = Math.floor(Math.random()*55)+200;
		g = 0;
	} else if(family === 'maroon'){
		r = Math.floor(Math.random()*28)+100;
		b = g = 0;
	} else if(family === 'olive'){
		r = g = Math.floor(Math.random()*28)+100;
		b = 0;
	} else if(family === 'green'){
		g = Math.floor(Math.random()*28)+100;
		r = b = 0;
	} else if(family === 'purple'){
		r = b = Math.floor(Math.random()*28)+100;
		g = 0;
	} else if(family === 'teal'){
		g = b = Math.floor(Math.random()*28)+100;
		r = 0;
	} else if(family === 'navy'){
		b = Math.floor(Math.random()*28)+100;
		r = g = 0;
	} else if(family === 'black'){
		r = g = b = Math.floor(Math.random()*42);
	} else if(family === 'white'){
		r = g = b = Math.floor(Math.random()*35)+220;
	} else if(family === 'silver'){
		r = g = b = Math.floor(Math.random()*42)+170;
	} else if(family === 'grey'){
		r = g = b = Math.floor(Math.random()*28)+100;
	}
	r0 = r/255;
	g0 = g/255;
	b0 = b/255;
	base = RGBToHex(r,g,b);
}

//Convert RGB to HSL for Color Theory support

//Luminosity
//Find max and min
let max = Math.max(r0, g0, b0);
let min = Math.min(r0, g0, b0);
let lum = (1 / 2) * (max + min);

//Hue
let hue;
if(max === r0){
	if(min === g0){
		//R > B > G
		hue = 60 * (6 * (b0-g0)/(r0-g0));
	} else {
		//R > G > B
		hue = 60 * ((g0-b0)/(r0-b0));
	}
} else if(max === g0){
	if(min === b0){
		//G > R > B
		hue = 60 * (2 - (r0-b0)/(g0-b0));
	} else {
		//G > B > R
		hue = 60 * (2 + (b0-r0)/(g0-r0));
	}
} else if(max === b0){
	if(min === r0){
		//B > G > R
		hue = 60 * (4 - (g0-r0)/(b0-r0));
	} else {
		//B > R > G
		hue = 60 * (4 + (r0-g0)/(b0-g0));
	}
}

//Saturation
let sat;
if(lum === 1){
sat = 0;
} else {
sat = ((max - min) / (1 - (lum*2 - 1)));
}

//Base HSL color... hue, sat, lum

//Complementary
let complRGB = HSLToRGB(Math.abs((hue + 180) - 360), sat, lum);
let compl = RGBToHex(complRGB.r, complRGB.g, complRGB.b);

//Split-complementary
let splitComplRGB = [
HSLToRGB(Math.abs((hue + 150) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 210) - 360), sat, lum)
];
let splitCompl = [
RGBToHex(splitComplRGB[0].r, splitComplRGB[0].g, splitComplRGB[0].b),
RGBToHex(splitComplRGB[1].r, splitComplRGB[1].g, splitComplRGB[1].b)
];

//Triadic
let triadicRGB = [
HSLToRGB(Math.abs((hue + 120) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 240) - 360), sat, lum)
];
let triadic = [
RGBToHex(triadicRGB[0].r, triadicRGB[0].g, triadicRGB[0].b),
RGBToHex(triadicRGB[1].r, triadicRGB[1].g, triadicRGB[1].b)
];

//Tetradic
let tetradicRGB = [
HSLToRGB(Math.abs((hue + 90) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 180) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 270) - 360), sat, lum)
];
let tetradic = [
RGBToHex(tetradicRGB[0].r, tetradicRGB[0].g, tetradicRGB[0].b),
RGBToHex(tetradicRGB[1].r, tetradicRGB[1].g, tetradicRGB[1].b),
RGBToHex(tetradicRGB[2].r, tetradicRGB[2].g, tetradicRGB[2].b)
];

//Analagous
let analogRGB = [
HSLToRGB(Math.abs((hue + 30) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 60) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 90) - 360), sat, lum)
];
let analog = [
RGBToHex(analogRGB[0].r, analogRGB[0].g, analogRGB[0].b),
RGBToHex(analogRGB[1].r, analogRGB[1].g, analogRGB[1].b),
RGBToHex(analogRGB[2].r, analogRGB[2].g, analogRGB[2].b)
];

//Monochrome (25-60% | 42%)
let mono = [];
const spread = 0.42;
let light = RGBToHex(r*(1+spread),g*(1+spread),b*(1+spread));
mono.push(light);
let dark = RGBToHex(r*(1-spread),g*(1-spread),b*(1-spread));
mono.push(dark);
//red_light = red_primary * (1 + scaling_factor)
//green_light = green_primary * (1 + scaling_factor)
//blue_light = blue_primary * (1 + scaling_factor)

//red_dark = red_primary * (1 - scaling_factor)
//green_dark = green_primary * (1 - scaling_factor)
//blue_dark = blue_primary * (1 - scaling_factor)

return {base, light, dark, compl, splitCompl, triadic, tetradic, analog};

}
/*
auxl.newColor1 = auxl.colorTheoryGen();
auxl.newColor1 = auxl.colorTheoryGen('#00d3d3');
auxl.newColor1 = auxl.colorTheoryGen(false, 'red');
console.log(auxl.newColor1.base);
console.log(auxl.newColor1.compl);
console.log(auxl.newColor1.splitCompl[0]);
console.log(auxl.newColor1.splitCompl[1]);
console.log(auxl.newColor1.triadic[0]);
console.log(auxl.newColor1.triadic[1]);
console.log(auxl.newColor1.tetradic[0]);
console.log(auxl.newColor1.tetradic[1]);
console.log(auxl.newColor1.tetradic[2]);
console.log(auxl.newColor1.analog[0]);
console.log(auxl.newColor1.analog[1]);
console.log(auxl.newColor1.analog[2]);
*/

//
//Object Generators

//
//Entity Core
this.Core = (data) => {

	//Import Data
	let core = JSON.parse(JSON.stringify(data));
	core.el = {};
	core.parent = false;
	let details = false;

	let load3D = false;
	let loadMat = false;
	let loadNewMat = false;

	//Import external JS script
	async function getJsSrc(url){
		const response = await fetch(url)
		await import(response.url);
		return true;
	}
	//Loading Asset
	function loading(){
		auxl.loadingObjects.set(core.id,true);
		if(auxl.loadingScene){} else {
			auxl.loadingScene = true;
		}
	}
	//Asset Loaded
	function loaded(){
		//console.log(core.id);
		//console.log('Asset loaded');
		auxl.loadingObjects.delete(core.id);
	}

	const Generate = () => {

		//Check for external sources and append
		if(core.sources){
			//Instead of adding a source to each object that uses a component, add it to auxl.jsAll to automatically check instead
			//External JS Import
			let propertyKeys = Object.keys(core.sources);
			let propertyValues = Object.values(core.sources);
			for (let propKey in propertyKeys) {
				//if js key exists and is false, it is not ready yet, delay
				if(auxl.jsLoaded.hasOwnProperty(propertyKeys[propKey])){
					if(auxl.jsLoaded[propertyKeys[propKey]] === false){
						console.log(core.id);
						console.log('JS is not yet loaded');
						//add to this.spawnedWaitingForJS for reapplication of component info when finished loading
						auxl.spawnedWaitingForJS[propertyKeys[propKey]].push({id:core.id, properties: core.components[propertyKeys[propKey]]});
					}
				} else {
					auxl.spawnedWaitingForJS[propertyKeys[propKey]] = [];
					console.log(propertyKeys[propKey]);
					console.log(propertyValues[propKey]);
					auxl.jsLoaded[propertyKeys[propKey]] = false;
					function doneImporting(){
						console.log(propertyKeys[propKey]);
						console.log('Done');
						auxl.jsLoaded[propertyKeys[propKey]] = true;
						//re-apply component
						ChangeSelf({property:propertyKeys[propKey], value:core.components[propertyKeys[propKey]]});
						//auxl.spawnedWaitingForJS
						console.log(auxl.spawnedWaitingForJS);
						for(let each in auxl.spawnedWaitingForJS[propertyKeys[propKey]]){
					let name = auxl.spawnedWaitingForJS[propertyKeys[propKey]][each].id;
					let properties = auxl.spawnedWaitingForJS[propertyKeys[propKey]][each].properties;
					console.log(name);
					console.log(properties);
					document.getElementById(name).setAttribute(propertyKeys[propKey],properties);
						}
					//clear pending array after reapplications
					delete auxl.spawnedWaitingForJS[propertyKeys[propKey]];
					console.log(auxl.spawnedWaitingForJS);
					}
					getJsSrc(propertyValues[propKey]).then(doneImporting);
				}
			}
		}

		core.el = {};

		if(core.entity === 'preAdded'){
			core.el = document.getElementById(core.id);
			//return core.el;
		} else if(core.entity){
			core.el = document.createElement(core.entity);
		} else {
			core.el = document.createElement('a-entity');
		}
		//console.log('generating...');
		//console.log(core);

		//Sound
		if(this.audioEnabled){
			if(core.sound){core.el.setAttribute('sound', core.sound)};
		}

		//Text
		if(core.text){core.el.setAttribute('text', core.text)};

		//ID
		core.el.setAttribute('id', core.id);

		//Geometry
		if(core.geometry){
			core.el.setAttribute('geometry', core.geometry);
		}
		//Material
		if(core.material){
			if(core.material.src){
				loadMat = true;
			}
			core.el.setAttribute('material', core.material);
		}
		//Position
		if(core.position){
			core.el.setAttribute('position', core.position);
		}
		//Rotation
		if(core.rotation){
			core.el.setAttribute('rotation', core.rotation);
		}
		//Scale
		if(core.scale){
			core.el.setAttribute('scale', core.scale);
		}
		//Mixins
		if(core.mixins){
			core.el.setAttribute('mixins', core.mixins);
		}

		//Add all classes
		for (let key in core.classes) {
			core.el.classList.add(core.classes[key]);
		}
		//There are a list of animations, loop through and set each as the object's keyName
		let animationKeys = Object.keys(core.animations);
		let animationValues = Object.values(core.animations);
		for (let key in animationKeys) {
			if(key === 0){} else {
				core.el.setAttribute('animation__'+animationKeys[key], animationValues[key]);
			}
		}

		//Wait until Models and Src Materials are loaded before letting player anim finish
		if(core.components['gltf-model'] || core.components['obj-model']){
			load3D = true;
		}
		//Check for Component Settings
		if(core.components){
			let componentKeys = Object.keys(core.components);
			let componentValues = Object.values(core.components);
			for (let key in componentKeys) {
				if(key === 0){} else {
					if(auxl.jsAll.hasOwnProperty(componentKeys[key])){
						if(auxl.jsLoaded.hasOwnProperty(componentKeys[key])){
							//JS has started loading or is loaded
							if(auxl.jsLoaded[componentKeys[key]] === false){
								//JS is Pending
								auxl.spawnedWaitingForJS[componentKeys[key]].push({id:core.id, properties: core.components[componentKeys[key]]});
							} else {
								//JS is Ready
								core.el.setAttribute(componentKeys[key],componentValues[key]);
							}
						} else {
							//Start to load JS
							auxl.spawnedWaitingForJS[componentKeys[key]] = [];
							auxl.jsLoaded[componentKeys[key]] = false;
							function doneImporting(){
								auxl.jsLoaded[componentKeys[key]] = true;
								//re-apply component
								ChangeSelf({property:componentKeys[key], value:core.components[componentKeys[key]]});
								for(let each in auxl.spawnedWaitingForJS[componentKeys[key]]){
							let name = auxl.spawnedWaitingForJS[componentKeys[key]][each].id;
							let properties = auxl.spawnedWaitingForJS[componentKeys[key]][each].properties;
							document.getElementById(name).setAttribute(componentKeys[key],properties);
								}
							//clear pending array after reapplications
							delete auxl.spawnedWaitingForJS[componentKeys[key]];
							}
							getJsSrc(auxl.jsAll[componentKeys[key]]).then(doneImporting);
								}
					} else {
						//Does not exist in jsAll, so it's an internal component or property
						core.el.setAttribute(componentKeys[key],componentValues[key]);
					}
				}
			}
		}
		//Object element generation done
		return core.el;
	}

	const SpawnCore = (parent, layer, other) => {
		let needParent = parent || false;
		let fromLayer = layer || false;
		Generate();
		//Loading should only apply to gltf, obj and material textures
		if(load3D || loadMat){
			loading();
		}
		//Add to Scene or Parent
		if(core.entity === 'preAdded'){} else {
			if(needParent){
				core.parent = needParent;
				needParent.appendChild(core.el);
				//Need a specific unspawn object form to add to this.spawned
			} else {
				sceneEl.appendChild(core.el);
			}
		}
		//Loaded Events
		if(load3D){
			core.el.addEventListener('model-loaded', loaded);
		}
		if(loadMat){
			core.el.addEventListener('loaded', loaded);
		}
	}

	const DespawnCore = (parent, layer, other) => {
		//Loaded Events
		if(load3D){
			core.el.removeEventListener('model-loaded', loaded);
		}
		if(loadMat || loadNewMat){
			core.el.removeEventListener('loaded', loaded);
		}
		//loop through and remove all core.components which removes all event listeners before clearing from scene
		let componentKeys = Object.keys(core.components);
		for (let key in componentKeys) {
			if(key === 0){} else {
				GetEl().removeAttribute(componentKeys[key])
			}
		}
		let needParent = parent || false;
		let fromLayer = layer || false;
		if(needParent){
			//console.log(core.el)
			needParent.removeChild(core.el);
		} else {
			//console.log(core)
			//console.log(core.el)
			sceneEl.removeChild(core.el);
		}
		if(fromLayer || other){} else {
			RemoveFromTracker(core.id);
		}
	}

	const ChangeSelf = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				if(propertyValue[each].value){
					if(propertyValue[each].value.src){
						if(auxl.loadingScene){
							if(loadNewMat){}else{
								loadNewMat = true;
								loading();
								core.el.addEventListener('loaded', loaded);
							}
						}
					}
				}
				GetEl().setAttribute(propertyValue[each].property, propertyValue[each].value);
			}
		} else {
			if(propertyValue.value){
				if(propertyValue.value.src){
					if(auxl.loadingScene){
						if(loadNewMat){}else{
							loadNewMat = true;
							loading();
							core.el.addEventListener('loaded', loaded);
						}
					}
				}
			}
			GetEl().setAttribute(propertyValue.property, propertyValue.value);
		}
	}

	const RemoveComponent = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				GetEl().removeAttribute(property[each]);
			}
		} else {
			GetEl().removeAttribute(property);
		}
	}

	function prepAnimation(animProps){

		let name = 'animation__' + animProps.name || 'animation__customAnim';
		let property = animProps.property;
		let from = animProps.from || false;
		let to = animProps.to || false;
		let dur = animProps.dur || false;
		let delay = animProps.delay || false;
		let loop = animProps.loop || false;
		let dir = animProps.dir || false;
		let easing = animProps.easing || false;
		let elasticity = animProps.elasticity || false;
		let autoplay = animProps.autoplay || false;
		let enabled = animProps.enabled || false;
		let startEvents = animProps.startEvents || false;
		let pauseEvents = animProps.pauseEvents || false;
		let resumeEvents = animProps.resumeEvents || false;

		let anim = {
			property: 'object3D.rotation.y',
			to: 360,
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
		};

		if(property){anim.property = property};
		if(from){anim.from = from};
		if(to){anim.to = to};
		if(dur){anim.dur = dur};
		if(delay){anim.delay = delay};
		if(loop){anim.loop = loop};
		if(dir){anim.dir = dir};
		if(easing){anim.easing = easing};
		if(elasticity){anim.elasticity = elasticity};
		if(autoplay){anim.autoplay = autoplay};
		if(enabled){anim.enabled = enabled};
		if(startEvents){anim.startEvents = startEvents};
		if(pauseEvents){anim.pauseEvents = pauseEvents};
		if(resumeEvents){anim.resumeEvents = resumeEvents};

		return {name, anim}
	}

	const Animate = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				let animation = prepAnimation(animProps[each]);
				GetEl().setAttribute(animation.name, animation.anim);
			}
		} else {
			let animation = prepAnimation(animProps);
			GetEl().setAttribute(animation.name, animation.anim);
		}
	}

	const GetEl = () => {
		//return core.id;

		let aEl = document.getElementById(core.id);
		if(aEl){}else{
			//console.log(core.id)
			return false;
		}
		return aEl;
	}

	const EmitEvent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				GetEl().emit(eventName[each],{bubbles: false});
			}
		} else {
			GetEl().emit(eventName,{bubbles: false});
		}
	}

	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			core[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			core[flagValue.flag] = flagValue.value;
		}
	}

	const GetFlag = (varName) => {
		//console.log(varName)
		//console.log(core[varName])
		return core[varName];
	}

	const ClickRun = (el) => {
		//console.log('Click');
		//console.log(el);
	}

	const FuseClickRun = (el) => {
		//console.log('Fuse Click');
		//console.log(el);
	}

	const CursorDownRun = (el) => {
		//console.log('Cursor Down');
		//console.log(el);
	}

	const CursorEnterRun = (el) => {
		//console.log('Cursor Enter');
		//console.log(el);
	}

	const CursorLeaveRun = (el) => {
		//console.log('Cursor Leave');
		//console.log(el);
	}

	const CursorUpRun = (el) => {
		//console.log('Cursor Up');
		//console.log(el);
	}

	const prepDetails = (text, position, textColor, windowColor, windowWidth, windowHeight) => {
		core.isOpen = false;
		//Main Screen
		core.detailMain = auxl.Core(auxl.detailMainData);
		//Close Button
		core.detailClose = auxl.Core(auxl.detailCloseData);
		//Update Position
		if(position){
			core.detailMain.core.position.x = position.x;
			core.detailMain.core.position.y = position.y;
			core.detailMain.core.position.z = position.z;
		} else {
			core.detailMain.core.position.x = core.position.x + 0.1;
			core.detailMain.core.position.y = core.position.y + 0.75;
			core.detailMain.core.position.z = core.position.z + 0.25;
		}
		if(windowColor){
			core.detailMain.core.material.color = windowColor;
		}

		if(text){
			core.detailMain.core.text.value = text;
		} else {
			if(core.detail){
				core.detailMain.core.text.value = core.detail;
			}
		}
		if(textColor){
			core.detailMain.core.text.color = textColor;
		}

		if(windowWidth){
			core.detailMain.core.geometry.width = windowWidth;
			//update close position based on geometry change
			core.detailClose.core.position.x = windowHeight/2;
		}
		if(windowHeight){
			core.detailMain.core.geometry.height = windowHeight;
			//update close position based on geometry change
			core.detailClose.core.position.y = windowHeight/2;
		}

		//Detail Layer
		core.detailLayer = {
			parent: {core: core.detailMain}, 
			child0: {core: core.detailClose},
		}
		core.detailAll = auxl.Layer('detailAll',core.detailLayer);
		details = true;
	}

	function detailPrompt_open(){
	let elGenDelay = setTimeout(function () {
		core.detailMain.core.el.emit('open',{});
		core.detailClose.core.el.emit('open',{});
		core.isOpen = true;
		clearTimeout(elGenDelay);
	}, 25); //Delay
	}

	function detailPrompt_close(){
		core.detailMain.core.el.emit('close',{});
		core.detailClose.core.el.emit('close',{});
		let elDelDelay = setTimeout(function () {
			core.detailAll.DespawnLayer(true);
			core.isOpen = false;
			clearTimeout(elDelDelay);
		}, 550); //Delay
	}

	function openClose(){
		//console.log('Running openClose');
		function closePrompt(){
			core.detailClose.core.el.removeEventListener('click',closePrompt);
			core.isOpen = detailPrompt_close();
		}
		if(core.isOpen){
			//console.log('Is Open');
			core.isOpen = detailPrompt_close();
			core.detailClose.core.el.removeEventListener('click',closePrompt);
		} else {
			//console.log('Is Closed');
			core.detailAll.SpawnLayer();
			core.isOpen = detailPrompt_open();
			core.detailClose.core.el.addEventListener('click', closePrompt);
		}
	}

	const EnableDetail = (detailInfo) => {

		if(details){} else {
			prepDetails(detailInfo.text, detailInfo.position, detailInfo.textColor, detailInfo.windowColor, detailInfo.windowWidth, detailInfo.windowHeight);
		}
			//Add Event Listener
			GetEl().addEventListener('click', openClose);
	}

	const DisableDetail = () => {
		//When core is removed from the scene...
		//Remove Event Listener
		GetEl().removeEventListener('click', openClose);
	}

	return {core, Generate, SpawnCore, DespawnCore, RemoveComponent, ChangeSelf, Animate, GetEl, EmitEvent, SetFlag, GetFlag, ClickRun, FuseClickRun, CursorDownRun, CursorEnterRun, CursorLeaveRun, CursorUpRun, EnableDetail, DisableDetail};
}

//
//layered Core
this.Layer = (id, all) => {

	let layer = {id, all};
	layer.children = {};
	layer.secondParents = [];
	layer.thirdParents = [];

	const SpawnLayer = (other) => {
		for(let each in all){
			if(each === 'parent'){
				all[each].core.SpawnCore(false, true);
			} else {
				for(let a in all[each]){
					if(a === 'core'){
						layer.children[all[each].core.core.id] = {obj: all[each][a], parent: all.parent.core.core.el};
						//console.log(layer.children)
						all[each][a].SpawnCore(all.parent.core.core.el, true);
					} else {
						if(a === 'parent'){
							layer.children[all[each][a].core.core.id] = {obj: all[each][a].core, parent: all.parent.core.core.el};
							layer.secondParents.push(all[each][a].core);
							//console.log(layer.children)
							all[each][a].core.SpawnCore(all.parent.core.core.el, true);
						} else {
							for(let b in all[each][a]){
								if(b === 'core'){
									layer.children[all[each][a].core.core.id] = {obj: all[each][a][b], parent: all[each].parent.core.core.el};
									//console.log(layer.children)
									all[each][a][b].SpawnCore(all[each].parent.core.core.el, true);
								} else {
									if(b === 'parent'){
										layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b].core, parent: all[each].parent.core.core.el};
										layer.thirdParents.push(all[each][a][b].core);
										//console.log(layer.children)
										all[each][a][b].core.SpawnCore(all[each].parent.core.core.el, true);
									} else {
										for(let c in all[each][a][b]){
											if(c === 'parent'){
												console.log('Add support for more layers')
											} else {
												layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b][c], parent: all[each][a].parent.core.core.el};
												//console.log(layer.children)
												all[each][a][b][c].SpawnCore(all[each][a].parent.core.core.el, true);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	function layerOrder(object) {
	let result = [[], [], [], []];
	function traverse(object, depth) {
		for (let key in object) {
			if (object.hasOwnProperty(key)) {
				if (key === 'core') {
					//console.log('Hit core');
					//console.log(object[key]);
					//console.log(result);
					result[depth].push(object[key]);
				} else if (key === "parent" && object[key].hasOwnProperty('core')) {
					//console.log('Hit a Parent');
					//console.log(object[key]);
					//console.log(result);
					result[depth].push(object[key].core);
				} else if (typeof object[key] === 'object') {
					//console.log('Hit End');
					//console.log(object[key]);
					//console.log(result);
					traverse(object[key], depth + 1);
				}
			}
		}
	}

	traverse(object, 0);
	return result;
	}
	let accessOrder = layerOrder(layer.all);

	const DespawnLayer = (other) => {
		let removeOrder = layerOrder(layer.all).reverse();
		for(let layer of removeOrder){
			for(let each of layer){
				if(each.core.parent){
					each.DespawnCore(each.core.parent, true);
				} else {
					each.DespawnCore(false, true);
				}
			}
		}
		if(other){} else {
			RemoveFromTracker(layer.id);
		}
	}

	const GetParentEl = () => {
		return layer.all.parent.core.GetEl();
	}

	const EmitEventParent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				all.parent.core.EmitEvent(eventName[each]);
			}
		} else {
			all.parent.core.EmitEvent(eventName);
		}
	}

	const EmitEventChild = (child, eventName) => {
		let childCore = GetChild(child);

		if(Array.isArray(eventName)){
			for(let each in eventName){
				childCore.EmitEvent(eventName[each]);
			}
		} else {
			childCore.EmitEvent(eventName);
		}
	}

	const EmitAll = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				for(let section of accessOrder){
					for(let indv of section){
						indv.EmitEvent(eventName[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.EmitEvent(eventName);
				}
			}
		}
	}

	const ChangeParent = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				all.parent.core.ChangeSelf(propertyValue[each]);
			}
		} else {
			all.parent.core.ChangeSelf(propertyValue);
		}
	}

	const ChangeChild = (child, propertyValue) => {
		let childCore = GetChild(child);

		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				childCore.ChangeSelf(propertyValue[each]);
			}
		} else {
			childCore.ChangeSelf(propertyValue);
		}
	}

	const ChangeAll = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				for(let section of accessOrder){
					for(let indv of section){
						indv.ChangeSelf(propertyValue[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.ChangeSelf(propertyValue);
				}
			}
		}
	}

	const RemoveComponentParent = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				all.parent.core.RemoveComponent(property[each]);
			}
		} else {
			all.parent.core.RemoveComponent(property);
		}
	}

	const RemoveComponentChild = (child, property) => {
		let childCore = GetChild(child);

		if(Array.isArray(property)){
			for(let each in property){
				childCore.RemoveComponent(property[each]);
			}
		} else {
			childCore.RemoveComponent(property);
		}
	}

	const RemoveComponentAll = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				for(let section of accessOrder){
					for(let indv of section){
						indv.RemoveComponent(property[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.RemoveComponent(property);
				}
			}
		}
	}

	const AnimateParent = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				all.parent.core.Animate(animProps[each]);
			}
		} else {
			all.parent.core.Animate(animProps);
		}
	}

	const AnimateChild = (child, animProps) => {
		let childCore = GetChild(child);

		if(Array.isArray(animProps)){
			for(let each in animProps){
				childCore.Animate(animProps[each]);
			}
		} else {
			childCore.Animate(animProps);
		}
	}

	const AnimateAll = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				for(let section of accessOrder){
					for(let indv of section){
						indv.Animate(animProps[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.Animate(animProps);
				}
			}
		}
	}

	const SetFlagParent = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				all.parent.core.SetFlag(flagValue[each]);
			}
		} else {
			all.parent.core.SetFlag(flagValue);
		}
	}

	const SetFlagChild = (child, flagValue) => {
		let childCore = GetChild(child);

		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				childCore.SetFlag(flagValue[each]);
			}
		} else {
			childCore.SetFlag(flagValue);
		}
	}

	const SetFlagAll = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				for(let section of accessOrder){
					for(let indv of section){
						indv.SetFlag(flagValue[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.SetFlag(flagValue);
				}
			}
		}
	}

	const GetFlagParent = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(all.parent.core.GetFlag(flag[each]));
			}
			return flagArray;
		} else {
			return all.parent.core.GetFlag(flag);
		}
	}

	const GetFlagChild = (child, flag) => {
		let childCore = GetChild(child);

		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(childCore.GetFlag(flag[each]));
			}
			return flagArray;
		} else {
			return childCore.GetFlag(flag);
		}
	}

	const GetFlagAll = (flag) => {
		let allObjects = [];
		if(Array.isArray(flag)){
			for(let each in flag){
				let flagArray = [];
				for(let section of accessOrder){
					for(let indv of section){
						flagArray.push(indv.GetFlag(flag[each]));
					}
				}
				allObjects.push(flagArray);
			}
			return allObjects;
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					allObjects.push(indv.GetFlag(flag));
				}
			}
			return allObjects;
		}
	}

	const EnableDetailParent = (detailInfo) => {
		all.parent.core.EnableDetail(detailInfo);
	}

	const EnableDetailChild = (child, detailInfo) => {
		GetChild(child).EnableDetail(detailInfo);
	}

	const EnableDetailAll = (detailInfo) => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.EnableDetail(detailInfo);
			}
		}
	}

	const GetChild = (childName) => {

		//return specific child to access their indv change/animate/remove funcs
		let result = [];
		function traverse(object, depth) {
			for (let key in object) {
				if (object.hasOwnProperty(key)) {
					if (key === 'core') {
						//console.log('Hit core');
						//console.log(object[key]);
						//console.log(result);
						//result[depth].push(object[key]);
						if(object[key].core.id === childName){
							//console.log('Child Hit!');
							//console.log(object[key].core.id);
							//console.log(object[key]);
							result.push(object[key]);
							return;
						}
					} else if (key === "parent" && object[key].hasOwnProperty('core')) {
						//console.log('Hit a Parent');
						//console.log(object[key].core);
						//console.log(result);
						//result[depth].push(object[key].core);
						if(object[key].core.core.id === childName){
							//console.log('Child Hit!');
							//console.log(object[key].core.core.id);
							//console.log(object[key].core);
							result.push(object[key].core);
							return;
						}
					} else if (typeof object[key] === 'object') {
						//console.log('Hit End');
						//console.log(object[key]);
						//console.log(result);
						traverse(object[key], depth + 1);
					}
				}
			}
		}

		traverse(layer.all, 0);
		if(result[0]){
			//console.log(result[0]);
			return result[0];
		} else {
			//console.log(result);
			console.log('Unable to find child');
		}
	}

	return {layer, SpawnLayer, DespawnLayer, GetParentEl, EmitEventParent, EmitEventChild, EmitAll, ChangeParent, ChangeChild, ChangeAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, AnimateParent, AnimateChild, AnimateAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, GetChild};
}

//
//Player
this.Player = (layer) => {

	//Default Transition Type
	layer.transition = 'fade';
	//instant
	//fade
	//sphere
	//blink
	//Default Transition Color
	//layer.transitionMaterial = {shader: "flat", color: '#000000', opacity: 0, side: 'double'};
	layer.teleporting = false;

	//Notifications
	let notificationTimeout;
	let displayTime;
	let inventoryTimeouts = [];

	//Sitting or Standing Mode
	layer.stand = true;

	//Duck | Standing
	let crouchTimeout;
	layer.standing = true;
	layer.animating = false;

	//Snap Rotation
	layer.snapRotating = false;
	let snapTimeout;
	//Rotate 45
	let anim45Data = {
		name: 'anim45',
		property: 'object3D.rotation.y',
		from: '0',
		to: '45', 
		dur: 250,
		delay: 0, 
		loop: 'false', 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};

	//Inventory
	layer.inventory = [];
	layer.inventoryPreText = 'Inventory :\n';
	layer.inventoryText = layer.inventoryPreText + 'Empty';

	//Initialize Player
	layer.SpawnLayer(true);
	//document.getElementById('camera').setAttribute('camera', 'active', true);

	//Currently not tracking Player object as it should not be removed

	//Update Control Variables
	playerRig = document.getElementById('playerRig');
	camera = document.getElementById('camera');
	cameraUI = document.getElementById('cameraUI');
	playerFloor = document.getElementById('playerFloor');
	mouseController = document.getElementById('mouseController');
	vrController1 = document.getElementById('vrController1');
	vrController1UI = document.getElementById('vrController1UI');
	vrController2 = document.getElementById('vrController2');
	vrController2UI = document.getElementById('vrController2UI');

	const Notification = (message, time) => {
		displayTime = time || 3750;

		TempDisableClick(displayTime);
		auxl.cameraUI.ChangeSelf({property: 'text', value: {value: message, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
		auxl.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
		auxl.cameraUI.EmitEvent('cameraMsg');
		notificationTimeout = setTimeout(function () {
			auxl.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(notificationTimeout);
		}, displayTime);

	}

	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			layer[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			layer[flagValue.flag] = flagValue.value;
		}
	}

	const GetFlag = (varName) => {
		//console.log(varName)
		//console.log(core[varName])
		return layer[varName];
	}

	const AddToInventory = (item) => {
		if(Array.isArray(item)){
			for(let each in item){
				//Update Inventory
				layer.inventory.push(item[each]);
				//Set Flag
				layer[item[each]] = true;
			}
		} else {
			//Update Inventory
			layer.inventory.push(item);
			//Set Flag
			layer[item] = true;
		}
		if(auxl.ham.ham.show){
			UpdateInventoryScreen();
		}
		//Notifications
		if(Array.isArray(item)){
			for(let each in item){
				let delay = 3800;
				delay *= each;
				inventoryTimeouts[each] = setTimeout(function () {
					Notification('Acquired : ' + item[each]);
					clearTimeout(inventoryTimeouts[each]);
				}, delay);
			}
		} else {
			Notification('Acquired : ' + item);
		}

	}

	const RemoveFromInventory = (item) => {
		if(Array.isArray(item)){
			for(let each in item){
				//Update Inventory
				layer.inventory.splice(layer.inventory.indexOf(item[each]), 1);
				//Set Flag
				layer[item[each]] = false;
			}
		} else {
			//Update Inventory
			layer.inventory.splice(layer.inventory.indexOf(item), 1);
			//Set Flag
			layer[item] = false;
		}
		if(auxl.ham.ham.show){
			UpdateInventoryScreen();
		}
		//Notifications
		if(Array.isArray(item)){
			for(let each in item){
				let delay = 3800;
				delay *= each;
				inventoryTimeouts[each] = setTimeout(function () {
					Notification('Removed : ' + item[each]);
					clearTimeout(inventoryTimeouts[each]);
				}, delay);
			}
		} else {
			Notification('Removed : ' + item);
		}
	}

	const CheckInventory = (item) => {
		if(layer.inventory.includes(item)){
			return true;
		} else {
			return false;
		}
	}

	const UpdateInventoryScreen = () => {
		if(layer.inventory.length > 0){
			layer.inventoryText = layer.inventoryPreText;
			let itemText = '';
			for(let each in layer.inventory){
				itemText = layer.inventory[each] + '\n';
				layer.inventoryText += itemText;
			}
		} else {
			layer.inventoryText = layer.inventoryPreText + 'Empty';
		}
		auxl.inventoryScreen.ChangeSelf({property: 'text', value:{value:layer.inventoryText}})
	}

	const TempDisableClick = (time) => {
		let delayTime = time || 1000;
		DisableClick();
		let disableTimeout = setTimeout(function () {
			EnableClick();
			clearTimeout(disableTimeout);
		}, delayTime);
	}

	const DisableClick = () => {
		if(auxl.controls === 'Desktop'){
			auxl.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		} else if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'bothLeft'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			}
		} else if(auxl.controls === 'Mobile'){
			auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		}
	}

	const EnableClick = () => {
		if(auxl.controls === 'Desktop'){
			auxl.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		} else if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'bothLeft'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			}
		} else if(auxl.controls === 'Mobile'){
			auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		}
	}

	const UpdateTransitionColor = (newColor) => {
		auxl.fadeScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.sphereScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink1Screen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink2Screen.ChangeSelf({property: 'material', value:{color: newColor}});
	}

	const EnableVRLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'vr'});
	}

	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer(true);
		}
		playerRig.setAttribute('locomotion',{uiid: 'beltUIParent', courserid: 'mouseController', movetype: 'vrHover'});
	}

	const EnableDesktopLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'desktop'});
	}

	const EnableMobileLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'mobile'});
	}

	const RemoveBelt = () => {
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.DespawnLayer(true);
		}
	}

	const ResetControls = () => {
		playerRig.removeAttribute('universal-controls');
		playerRig.setAttribute('universal-controls',{});
	}

	const ToggleSittingMode = () => {
		if(layer.animating){} else {
			layer.animating = true;
			if(layer.stand){
				auxl.playerRig.EmitEvent('sit');
				layer.stand = false;
			} else {
				auxl.playerRig.EmitEvent('stand');
				layer.stand = true;
			}
			crouchTimeout = setTimeout(function () {
				layer.animating = false;
				clearTimeout(crouchTimeout);
			}, 775);
		}
	}

	const ToggleCrouch = () => {
		if(layer.stand){
			if(layer.animating){} else {
				layer.animating = true;
				if(layer.standing){
					auxl.playerRig.EmitEvent('crouchDownStanding');
					layer.standing = false;
				} else {
					auxl.playerRig.EmitEvent('crouchUpStanding');
					layer.standing = true;
				}
				crouchTimeout = setTimeout(function () {
					layer.animating = false;
					clearTimeout(crouchTimeout);
				}, 775);
			}
		} else {
			if(layer.animating){} else {
				layer.animating = true;
				if(layer.standing){
					auxl.playerRig.EmitEvent('crouchDownSitting');
					layer.standing = false;
				} else {
					auxl.playerRig.EmitEvent('crouchUpSitting');
					layer.standing = true;
				}
				crouchTimeout = setTimeout(function () {
					layer.animating = false;
					clearTimeout(crouchTimeout);
				}, 775);
			}
		}
	}

	const SnapRight = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerRig.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY - 45;
			auxl.playerRig.Animate(anim45Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim45Data.dur+10);
		}
	}

	const SnapLeft = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerRig.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY + 45;
			auxl.playerRig.Animate(anim45Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim45Data.dur+10);
		}
	}

	return {layer, Notification, SetFlag, GetFlag, AddToInventory, RemoveFromInventory, CheckInventory, UpdateInventoryScreen, TempDisableClick, DisableClick, EnableClick, UpdateTransitionColor, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight, SnapLeft}
}
//Scene Load Anim
function playerSceneAnim(){

//Minimum Anim Delay if assets don't need loading
let animTimeout0 = setTimeout(function () {
	if(auxl.loadingScene){} else {
		auxl.loadingScene = true;
	}
	clearTimeout(animTimeout0);
}, 800);

	if(auxl.player.layer.teleporting){} else {
		auxl.player.layer.teleporting = true;
		if(auxl.player.layer.transition === 'blink'){
			auxl.player.DisableClick();
			auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.blink1Screen.EmitEvent('blinkScene1');
			auxl.blink2Screen.EmitEvent('blinkScene1');
		} else if(auxl.player.layer.transition === 'fade'){
			auxl.player.DisableClick();
			auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.fadeScreen.EmitEvent('fadeScene1');
		} else if(auxl.player.layer.transition === 'sphere'){
			auxl.player.DisableClick();
			auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.sphereScreen.EmitEvent('sphereScene1');
		} else if(auxl.player.layer.transition === 'instant'){
			auxl.player.DisableClick();
		}
	}
}

//
//Menu
this.Menu = (menuData) => {

let menu = {};
//Import
menu.id = menuData.id || 'menu';
menu.prompt = menuData.prompt;
menu.options = menuData.options;
menu.actions = menuData.actions;
menu.data = Object.assign({}, menuData.data);
//Component settings to hit like This.ClickFuncName.Click()
menu.clickrun = {};
menu.clickrun.cursorObj = menuData.cursorObj || false;
menu.clickrun.method = menuData.method || 'Click';
menu.clickrun.params = menuData.params || 'null';
//Update Starting Position
menu.data.position.x = menuData.pos.x;
menu.data.position.y = menuData.pos.y;
menu.data.position.z = menuData.pos.z;
//Menu Options Total
let menuLength = Object.keys(menu.options).length;
//Menu Style
menu.layout = menuData.layout;
//Flat side with Text : Triangle, Square, Rectangle, Hex|Deca|Iso, Circle
//combo together for more flair/style or make a custom obj

//Menu Support
menu.layers = {};
menu.layer = {};
let prompt = {};
let menuOption = {};
let menuOptions = [];
let menuNum = 0;
//Testing
//console.log(menuData.id);
//console.log(menuData.clickObj);
//console.log(menu.clickObj);
	const SpawnMenu = () => {
		menuNum=0;
		menuOptions = [];
		menuOption = {};
		menu.data.id = menu.id + 'prompt';
		menu.data.text.value = menu.prompt;
		menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
		prompt = auxl.Core(menu.data);
		menu.layers = {
		parent: {core: prompt},}
		//Sub Menu Adjustments
		menu.data.position.x = menu.data.geometry.width * 1.15;
		menu.data.position.z = 0;
		if(menuLength === 1 || menu.layout === 'horizontal'){
			menu.data.position.y = 0;
		} else {
			menu.data.position.y = (menu.data.geometry.height*0.75) * menuLength/2;
		}
		//components: {clickfunc: {clickObj: 'auxlObj'}},
		//components: {clickrun: {cursorObj: 'auxlObj', method: 'Method', params: null}},
		menu.data.sources = {};
		menu.data.components = {};
		menu.data.components.clickrun = {};
		menu.data.components.clickrun.cursorObj = menu.clickrun.cursorObj ;
		menu.data.components.clickrun.method = menu.clickrun.method;
		menu.data.components.clickrun.params = menu.clickrun.params;
		//generate 1 for each responses use option
		for(let menuItem in menu.options){
			if(menuLength === 1 || menuNum === 0){} else {
				if(menu.layout === 'vertical'){
					menu.data.position.y -= (menu.data.geometry.height*1.15);
				} else if(menu.layout === 'horizontal'){
					menu.data.position.x += (menu.data.geometry.width*1.15);
				} else {
					//backup for legacy, classic vertical mode
					menu.data.position.y -= (menu.data.geometry.height*1.15);
				}
			}
			//menu.data.position.y -= 0.2;
			menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
			menu.data.text.value = menu.options[menuItem];
			menu.data.id = menu.id + 'option' + menuNum;
			menu.data.components.result = menu.actions['action'+menuNum];
			menuOption = auxl.Core(menu.data);
			//menuOption.SpawnCore();
			menuOptions.push(menuOption);
			menu.layers['child'+menuNum] = {core: menuOptions[menuNum]}
			menuNum++;
		}

		//Build layered Menu
		menu.layer = auxl.Layer(menu.id, menu.layers);
		menu.layer.SpawnLayer(true);
		//menu.layer.ChangeParent({property: 'look-at', value: '#camera'})
	}

	const DespawnMenu = () => {
		menu.layer.DespawnLayer(true);
		//RemoveFromTracker(menu.id);
	}

	const ToggleOptionClicking = () => {
		for(let options in menuOptions){
			menuOptions[options].GetEl().classList.toggle('clickable');
			//element.classList.toggle('clickable', false);
		}
	}

	const AddToParentSpawnTracker = (obj, parent) => {
		//match wherever the parent object created this menu is being tracked in
		if(auxl.scenarioSpawned[parent.id]){
			auxl.scenarioSpawned[menu.id] = {type: 'menu', obj};
		} else if(auxl.zoneSpawned[parent.id]){
			auxl.zoneSpawned[menu.id] = {type: 'menu', obj};
		} else if(auxl.nodeSpawned[parent.id]){
			auxl.nodeSpawned[menu.id] = {type: 'menu', obj};
		} else if(auxl.bookSpawned[parent.id]){
			auxl.bookSpawned[menu.id] = {type: 'menu', obj};
		}
	}

	const RemoveMenuFromSceneTracker = () => {
		if(auxl.scenarioSpawned[menu.id]){
			delete auxl.scenarioSpawned[menu.id];
		} else if(auxl.zoneSpawned[menu.id]){
			delete auxl.zoneSpawned[menu.id];
		} else if(auxl.nodeSpawned[menu.id]){
			delete auxl.nodeSpawned[menu.id];
		} else if(auxl.bookSpawned[menu.id]){
			delete auxl.bookSpawned[menu.id];
		}
	}

	return {menu, SpawnMenu, DespawnMenu, ToggleOptionClicking, AddToParentSpawnTracker, RemoveMenuFromSceneTracker};
}

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
this.SceneNode = (sceneData) => {
//Configure and Display Scene
let core = Object.assign({}, sceneData);

let textBubble = auxl.Core(this.sceneTextData);
let sceneText = auxl.SpeechSystem(textBubble);

	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag(cond)) {
			for(let a in ifTrue){
				for(let b in ifTrue[a]){
					auxlObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			for(let a in ifFalse){
				for(let b in ifFalse[a]){
					auxlObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}

	}

	const AddToTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.running[nameId] = {type, name, id, nameId, method, params, event};
		}
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}

	const ClearSceneTimeIntEvt = () => {
		for(let ran in auxl.running){
			if(auxl.running[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.running[ran].nameId]);
				delete auxl.timeouts[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.running[ran].nameId]);
				delete auxl.intervals[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interaction' || auxl.running[ran].type === 'event'){
auxl[auxl.running[ran].name].GetEl().removeEventListener(auxl.running[ran].event, function(){
auxlObjMethod(auxl.running[ran].object,auxl.running[ran].method,auxl.running[ran].params);
});
			}
			RemoveFromTimeIntEvtTracker(ran);
		}
	}

	const ClearScene = () => {
		//Clear Core | Layer Scene Tracked Items
		//Run Exit section of current Node
		Exit();
		//Clear Timeout, Intervals and Event Listeners first
		ClearSceneTimeIntEvt();
		//Clear all objects spawned in the NodeScene
		clearSpawned(auxl.nodeSpawned);
	}

	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let spawn of auxl.spawnFunc) {
			if(func === spawn){
				spawnTracker(object, 'node');
			}
		}
		auxl[object][func](params);
	}

	function readTimeline(time){
	//find a specific timeline/key name and load up that
	//core : page/data/object
	//time : name of section within a core's pageData
	//line : a single line set of instructions within time
	//
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		//NodeScene Reading
		for(let line in core[time]){
			if(time === 'delay'){
				//console.log('Delay Running...');
				for(let a in core[time][line]){
					//console.log(time);//delay
					//console.log(line);//time of delay
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						if(b === 'IfElse'){
							//console.log('IfElse Timeout');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b][c]);//params
								AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									//console.log('IfElse Timeout Hit');
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line); //Delay
							}
						} else {
							//console.log('Normal Timeout');
							AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								//console.log('Timeout Hit')
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line); //Delay
						}
					}
				}
			} else if(time === 'interval'){
				//console.log('Interval Running...');
				for(let a in core[time][line]){
					//console.log(time);//interval
					//console.log(line);//time of interval
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//run,loop,end
					//console.log(core[time][line][a]);//this.object name, func w/ params or params
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								//console.log(b);//this.obj name
								//console.log(core[time][line][a][b]);//method w/ params
								//console.log(c);//method
								//console.log(core[time][line][a][b][c]);//parms
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											//Interval Functions
											//Check for End Condition
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
											//console.log('IfElse Interval Hit')
											IfElse(b,d,core[time][line][a][b][c][d]);
											//Check and update Loop Total
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromTimeIntEvtTracker(line+b);
												}
											}
										}, line); //Interval
									}
								} else {
									//console.log('Normal Interval');
									let method = c;
									let params = core[time][line][a][b][c];
									AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										//Interval Functions
										//Check for End Condition
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										//Check and update Loop Total
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
										}
										//clearInterval(interval);
									}, line); //Interval
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				//console.log('Interaction Added...');
				for(let a in core[time][line]){
					//console.log(time);//interaction
					//console.log(line);//type of interaction | click
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							//console.log('IfElse Interaction');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b]);//condObject w/params and iftrue/iffalse
								//console.log(core[time][line][a][b][c]);//cond, iftrue, ifflase
								//console.log(a)//this.object name
								//console.log(b)//ifelse
								//console.log(c)//condObj
								object = a;
								params = core[time][line][a][b][c];

								AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
									//auxlObjMethod(object,method,params);
								});
							}
						} else {
							//console.log('Normal Interaction');
							object = a;
							method = b;
							params = core[time][line][a][b];
							//auxl.interactions[object];
							//auxl.running[ran].name;
							AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
					//auxl[line][a](core[time][line][a]);
				}
			} else if(time === 'event'){
				//console.log('Listening for Event...');
				for(let a in core[time][line]){
					//console.log(time);//event
					//console.log(line);//event name
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							//console.log('IfElse Event');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b]);//condObject w/params and iftrue/iffalse
								//console.log(core[time][line][a][b][c]);//cond, iftrue, ifflase
								//console.log(a)//this.object name
								//console.log(b)//ifelse
								//console.log(c)//condObj
								object = a;
								params = core[time][line][a][b][c];

								AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
									//auxlObjMethod(object,method,params);
								});
							}
						} else {
							//console.log('Normal Event');
							object = a;
							method = b;
							params = core[time][line][a][b];
							//auxl.interactions[object];
							//auxl.running[ran].name;
							AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}


						/*
						let object = a;
						let method = b;
						let params = core[time][line][a][b];
						//console.log(line)
						//console.log(object)
						//console.log(method)
						//console.log(params)
						//auxl.interactions[object];
						//auxl.running[ran].name;
						AddToTimeIntEvtTracker({name: object, type: 'event', id: line, method, params, event: line});
						auxl[object].GetEl().addEventListener(line, function(){
							auxlObjMethod(object,method,params);
						});
						*/
					}
					//auxl[line][a](core[time][line][a]);
				}
			} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						//console.log('Initializing an Object');
						//console.log(time);//start
						//console.log(line);//this.object name
						//console.log(core[time][line]);//func w/ params
						//console.log(a);//method name. can be universal like IfElse
						//console.log(core[time][line][a]);//params
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								//console.log(b);
								//console.log(core[time][line][a][b]);
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						//console.log('Exiting Scene');
						//console.log(time);//exit
						//console.log(line);//this.object name
						//console.log(core[time][line]);//func w/ params
						//console.log(a);//method name. can be universal like IfElse
						//console.log(core[time][line][a]);//params
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								//console.log(b);
								//console.log(core[time][line][a][b]);
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'info') {
						//Data only
					} else {
						console.log('Hit Other Timeline, Please Investigate');
						//console.log('Executing Timeline...');
						//console.log(time);//timeline
						//console.log(line);//this.obj name
						//console.log(core[time][line]);//method and params
						//console.log(a);//method
						//console.log(core[time][line][a]);//parms
						//console.log(auxl);//this.object
						//console.log(auxl[line]);//this.object
						//auxl[line][a](core[time][line][a]);
						//auxlObjMethod(line,a,core[time][line][a]);
					}
				}
			}
		}
	return;
	}

	const Info = () => {
		readTimeline('info');
	}

	const AddControls = () => {
		readTimeline('controls');
	}

	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}

	const Start = () => {
		readTimeline('start');
	}

	const Delay = () => {
		readTimeline('delay');
	}

	const Interval = () => {
		readTimeline('interval');
	}

	const Event = () => {
		readTimeline('event');
	}

	const Interaction = () => {
		readTimeline('interaction');
	}

	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
		if(core.info.sceneText){
			sceneText.KillStop();
		}
	}

	const Map = () => {
		readTimeline('map');
	}

	const StartScene = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
		sceneTextDisplay();
	}

	const sceneTextDisplay = () => {
		if(core.info.sceneText){
			sceneText.Start();
			sceneText.DisplaySpeech({role: core.info.name,speech: '...'});
			let sceneTextTimeout = setTimeout(function () {
				sceneText.DisplaySpeech({role: core.info.name,speech: core.info.description});
				clearTimeout(sceneTextTimeout);
			}, 1250); //Delay
		}
	}

	return {core, IfElse, ClearScene, auxlObjMethod, Info, Start, Delay, Interval, Event, Interaction, Exit, Map, StartScene}
}

//
//Map Zone Gen & reader
//mapRegionDistrictTerritoryZoneSection
this.MapZone = (mapZoneData) => {
//Display Local Map and facilitate travel between Nodes
//let core = {};
//core.map = Object.assign({}, mapZoneData);
let core = Object.assign({}, mapZoneData);
core.mapMenuData = false;
core.mapMenu;
core.nodes = {};
core.info;
core.currentNode;
core.zoneLoaded = false;
//core.nodes.nodeName.map = {connect0:{},connect1:{}};
//console.log('Running Map Zone...');
//console.log(mapZoneData);

//Map Movement Support
let timeout;
let timeout2;
let newNode;

	const ReadMapData = () => {
		for(let key in core){
			if(key === 'info'){
				core.info = core[key]
			} else if(key === 'start' || key === 'delay' || key === 'interval' || key === 'event' || key === 'interaction' || key === 'exit'){
				//Ignore
			} else {
				//console.log(key)//key - info, zone0Node0In1
				core.nodes[key] = auxl[key];
				//console.log(auxl[key])//this.nodeObj
				//console.log(core[key])//value - node connections
				for(let connect in core[key]){
					//console.log(core[key][connect]);//connect0, connect1
					for(let travel in core[key][connect]){
						//console.log(travel);//connect keys
						//console.log(core[key][connect][travel]);//connect values
						//inZone: true,
						//node: 'zone0Node0Out',
						//locked: true,
						//key: 'masterKey',
						//keepKey: true
					}
				}
			}
		}
	}
	//Prep for use on init
	ReadMapData();

	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {

		//Uses text for true, text and undefined for false
		//Test using bools only

		//ifTrue
		//ifFalse
		//for loop for above objects with key name as object and value key as method and that value the params
		//console.log(objRef)//this.obj name
		//console.log(condObj)//this.obj name used to check Condition from
		//console.log(cond)//cond name
		//console.log(ifTrue)
		//console.log(ifFalse)
		//console.log(auxl[condObj].GetFlag(cond))
		if(auxl[condObj].GetFlag(cond)) {
			//run ifTrue
			for(let a in ifTrue){
				//console.log(ifTrue);
				//console.log(a);
				//console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					auxlObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			//run ifFalse
			for(let a in ifFalse){
				//console.log(ifFalse);
				//console.log(a);//this.object name should match objRef
				//console.log(ifFalse[a]);//method w/ params
				for(let b in ifFalse[a]){
					auxlObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}

	}

	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let spawn of auxl.spawnFunc) {
			if(func === spawn){
				spawnTracker(object, 'zone');
			}
		}

//nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern69, repeat: '150 150',color: "#d6a9ba", emissive: "#d6a9ba",},}},

		auxl[object][func](params);
	}

	const AddToZoneTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		//console.log({name,type,id,method,params,event})
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			//console.log({name,type,id,method,params,event})
			//console.log(nameId);
			auxl.zoneRunning[nameId] = {type, name, id, nameId, method, params, event};
		}
		//console.log(auxl.running);
	}

	const RemoveFromZoneTimeIntEvtTracker = (name) => {
		delete auxl.zoneRunning[name];
	}

	const ClearZoneTimeIntEvt = () => {
		//console.log('Clearing ZoneTimeIntEvt');
		//console.log(auxl.zoneRunning);
		for(let ran in auxl.zoneRunning){
			//console.log(ran);//name of ID
			//console.log(auxl.running[ran]);//object
			if(auxl.zoneRunning[ran].type === 'timeout'){
				//console.log('clearing timeout');
				//console.log(auxl.zoneRunning[ran].nameId);
				//console.log(auxl.timeouts[auxl.zoneRunning[ran].nameId]);
				//clearTimeout(auxl.zoneRunning[ran].nameId);
				clearTimeout(auxl.timeouts[auxl.zoneRunning[ran].nameId]);
				delete auxl.timeouts[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interval'){
				//console.log('clearing interval');
				//console.log(auxl.zoneRunning[ran].nameId);
				//console.log(auxl.intervals);
				clearInterval(auxl.intervals[auxl.zoneRunning[ran].nameId]);
				delete auxl.intervals[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interaction' || auxl.zoneRunning[ran].type === 'event'){
				//Event
				//console.log('clearing interaction|event');
				//console.log(auxl.zoneRunning[ran].name);
				//console.log(auxl.zoneRunning[ran].event);
auxl[auxl.zoneRunning[ran].name].GetEl().removeEventListener(auxl.zoneRunning[ran].event, function(){
auxlObjMethod(auxl.zoneRunning[ran].object,auxl.zoneRunning[ran].method,auxl.zoneRunning[ran].params);
});

			}
			RemoveFromZoneTimeIntEvtTracker(ran);
		}
		//console.log(auxl.zoneRunning);
		//console.log(auxl.timeouts);
		//console.log(auxl.intervals);
	}

	const AddToZoneTracker = (type, obj) => {
		if(type === 'core'){
    		auxl.zoneSpawned[obj.core.id] = {type, obj};
		} else if(type === 'layer'){
    		auxl.zoneSpawned[obj.layer.id] = {type, obj};
		}
		//console.log(auxl.zoneSpawned)
	}

	const RemoveFromZoneTracker = (type) => {
		delete auxl.zoneSpawned[type.id];
	}

	function readTimeline(time){
	//find a specific timeline/key name and load up that
	//core : page/data/object
	//time : name of section within a core's pageData
	//line : a single line set of instructions within time
	//
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		//MapZone Reading
		for(let line in core[time]){
			if(time === 'delay'){
				//console.log('Delay Running...');
				for(let a in core[time][line]){
					//console.log(time);//delay
					//console.log(line);//time of delay
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						if(b === 'IfElse'){
							//console.log('IfElse Timeout');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b][c]);//params
								AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									//console.log('IfElse Timeout Hit');
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line); //Delay
							}
						} else {
							//console.log('Normal Timeout');
							AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								//console.log('Timeout Hit')
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line); //Delay
						}
					}
				}
			} else if(time === 'interval'){
				//console.log('Interval Running...');
				for(let a in core[time][line]){
					//console.log(time);//interval
					//console.log(line);//time of interval
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//run,loop,end
					//console.log(core[time][line][a]);//this.object name, func w/ params or params
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								//console.log(b);//this.obj name
								//console.log(core[time][line][a][b]);//method w/ params
								//console.log(c);//method
								//console.log(core[time][line][a][b][c]);//parms
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											//Interval Functions
											//Check for End Condition
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
											//console.log('IfElse Interval Hit')
											IfElse(b,d,core[time][line][a][b][c][d]);
											//Check and update Loop Total
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromZoneTimeIntEvtTracker(line+b);
												}
											}
										}, line); //Interval
									}
								} else {
									//console.log('Normal Interval');
									let method = c;
									let params = core[time][line][a][b][c];
									AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										//Interval Functions
										//Check for End Condition
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromZoneTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										//Check and update Loop Total
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
										}
										//clearInterval(interval);
									}, line); //Interval
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				//console.log('Interaction Added...');
				for(let a in core[time][line]){
					//console.log(time);//interaction
					//console.log(line);//type of interaction | click
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							//console.log('IfElse Interaction');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b]);//condObject w/params and iftrue/iffalse
								//console.log(core[time][line][a][b][c]);//cond, iftrue, ifflase
								//console.log(a)//this.object name
								//console.log(b)//ifelse
								//console.log(c)//condObj
								object = a;
								params = core[time][line][a][b][c];

								AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
									//auxlObjMethod(object,method,params);
								});
							}
						} else {
							//console.log('Normal Interaction');
							object = a;
							method = b;
							params = core[time][line][a][b];
							//auxl.interactions[object];
							//auxl.running[ran].name;
							AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
					//auxl[line][a](core[time][line][a]);
				}
			} else if(time === 'event'){
				//console.log('Listening for Event...');
				for(let a in core[time][line]){
					//console.log(time);//event
					//console.log(line);//event name
					//console.log(core[time][line]);//this.object w/ method and params
					//console.log(a);//this.object name
					//console.log(core[time][line][a]);//func w/ params
					for(let b in core[time][line][a]){
						//console.log(b);//func name
						//console.log(core[time][line][a][b]);//params
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							//console.log('IfElse Event');
							for(let c in core[time][line][a][b]){
								//console.log(core[time][line][a][b]);//condObject w/params and iftrue/iffalse
								//console.log(core[time][line][a][b][c]);//cond, iftrue, ifflase
								//console.log(a)//this.object name
								//console.log(b)//ifelse
								//console.log(c)//condObj
								object = a;
								params = core[time][line][a][b][c];

								AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
									//auxlObjMethod(object,method,params);
								});
							}
						} else {
							//console.log('Normal Event');
							object = a;
							method = b;
							params = core[time][line][a][b];
							//auxl.interactions[object];
							//auxl.running[ran].name;
							AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}


						/*
						let object = a;
						let method = b;
						let params = core[time][line][a][b];
						//console.log(line)
						//console.log(object)
						//console.log(method)
						//console.log(params)
						//auxl.interactions[object];
						//auxl.running[ran].name;
						AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: line, method, params, event: line});
						auxl[object].GetEl().addEventListener(line, function(){
							auxlObjMethod(object,method,params);
						});
						*/
					}
					//auxl[line][a](core[time][line][a]);
				}
			} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						//console.log('Initializing an Object');
						//console.log(time);//start
						//console.log(line);//this.object name
						//console.log(core[time][line]);//func w/ params
						//console.log(a);//method name. can be universal like IfElse
						//console.log(core[time][line][a]);//params
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								//console.log(b);
								//console.log(core[time][line][a][b]);
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						//console.log('Exiting Scene');
						//console.log(time);//exit
						//console.log(line);//this.object name
						//console.log(core[time][line]);//func w/ params
						//console.log(a);//method name. can be universal like IfElse
						//console.log(core[time][line][a]);//params
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								//console.log(b);
								//console.log(core[time][line][a][b]);
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'info') {
						//Data only
					} else {
						console.log('Hit Other Timeline, Please Investigate');
						//console.log('Executing Timeline...');
						//console.log(time);//timeline
						//console.log(line);//this.obj name
						//console.log(core[time][line]);//method and params
						//console.log(a);//method
						//console.log(core[time][line][a]);//parms
						//console.log(auxl);//this.object
						//console.log(auxl[line]);//this.object
						//auxl[line][a](core[time][line][a]);
						//auxlObjMethod(line,a,core[time][line][a]);
					}
				}
			}
		}
	return;
	}

	const Info = () => {
		readTimeline('info');
	}

	const AddControls = () => {
		readTimeline('controls');
	}

	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}

	const Start = () => {
		readTimeline('start');
	}

	const Delay = () => {
		readTimeline('delay');
	}

	const Interval = () => {
		readTimeline('interval');
	}

	const Event = () => {
		readTimeline('event');
	}

	const Interaction = () => {
		readTimeline('interaction');
	}

	const Exit = () => {
		readTimeline('exit');
	}

	const StartZone = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
	}

	const StartScene = (nodeName) => {
		//core.currentNode = nodeName || Object.keys(core.nodes)[0];
		core.currentNode = nodeName || core.info.start;
		core.currentZone = core.info.id;
		if(core.zoneLoaded){} else {
			StartZone();
			core.zoneLoaded = true;
		}
		auxl[core.currentNode].StartScene();
		MoveSpawnMenu();

	}

	const ClearScene = () => {
		auxl[core.currentNode].ClearScene();
	}

	const MoveSpawnMenu = () => {

		core.mapMenuData = {
			id: 'moveMenu',
			prompt: 'Move to...',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: core.currentZone,
			method: 'MenuMoveClick',
			pos: new THREE.Vector3(-1.5,1.5,-1),
		}
		//console.log(core);
		//console.log(core[core.currentNode]);
		let currNum = 0;
		let moveToNode;
		for(let connect in core[core.currentNode]){
			//console.log(connect);
			//core[core.currentNode][connect].inZone
			//core[core.currentNode][connect].node
			//core[core.currentNode][connect].travel
			//core[core.currentNode][connect].locked
			//core[core.currentNode][connect].key
			//core[core.currentNode][connect].keepKey

			//In Zone Node or Out of Zone Node
			if(core.nodes[core[core.currentNode][connect].node]){
				moveToNode = core.nodes[core[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core[core.currentNode][connect].node];
			}

			if(core[core.currentNode][connect].locked && !auxl.player.GetFlag(core[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Locked]';
			} else if(core[core.currentNode][connect].locked && auxl.player.GetFlag(core[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name;
			}

			core.mapMenuData.actions['action'+currNum] = connect;
			//core.mapMenuData.actions['action'+currNum] = moveToNode.core.info.id;
			currNum++;

		}
		//core[core.currentNode][connect].inZone;
		//inZone
		//node
		//travel
		//locked
		//key
		//keepKey
		core.mapMenu = auxl.Menu(core.mapMenuData);
		core.mapMenu.SpawnMenu();
	}

	const MenuMoveClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);//connect0
		Move(result);
	}

	const Move = (connect) => {

		newNode = core[core.currentNode][connect];

		if(newNode.locked && !auxl.player.GetFlag(newNode.key)){
			//console.log('Needs key');
			clearTimeout(timeout2);
			auxl.player.Notification('Requires : ' + newNode.key);
		} else {
			if(newNode.locked && auxl.player.GetFlag(newNode.key) && !newNode.keepKey){
				auxl.player.SetFlag({flag: newNode.key, value: false})
				//console.log('Key taken');
			}
			//Timeout
			timeout = setTimeout(function () {
					core.mapMenu.DespawnMenu();
					ClearScene();
					//check if results name as a key exists in this zone
					if(core.nodes[newNode.node]){
						StartScene(newNode.node);
					} else {
						//switch zones / object control
						ClearZone();
						core.zoneLoaded = false;
						auxl[newNode.inZone].StartScene(newNode.node)
					}
				clearTimeout(timeout);
			}, 425);
			//Play Transition Animation
			playerSceneAnim();
		}
	}

	const ClearZone = () => {
		Exit();
		ClearZoneTimeIntEvt();
		RemoveControls();
		clearSpawned(auxl.zoneSpawned);

	}

	return {core, ReadMapData, StartScene, MoveSpawnMenu, MenuMoveClick, Move, ClearZone};
}

//
//Scenario Gen
//entireScenarioSpawnLocationAlwaysDisplay
this.Scenario = (scenarioData) => {

let core = Object.assign({}, scenarioData);
core.scenarioLoaded = false;

let startTimeout;
let zoneSpawn = core.info.startZone;
let scenarioName = core.info.name;
let scenarioInstructions = core.info.instructions;

//Set as default scenario, delay to allow object to be built
let scenarioTimeout = setTimeout(function () {
	if(core.info.default){
		auxl.defaultScenario = auxl[core.info.id];
		updateHTMLTitle();
		updateHTMLInstructions();
	}
	clearTimeout(scenarioTimeout);
}, 50);

	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag(cond)) {
			for(let a in ifTrue){
				for(let b in ifTrue[a]){
					auxlObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			for(let a in ifFalse){
				for(let b in ifFalse[a]){
					auxlObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}
	}

	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let spawn of auxl.spawnFunc) {
			if(func === spawn){
				spawnTracker(object, 'scenario');
			}
		}
		auxl[object][func](params);
	}

	const AddToScenarioTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId};
		} else if(type === 'interval'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId};
		} else if(type === 'interaction' || type === 'event'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId, method, params, event};
		}
	}

	const RemoveFromScenarioTimeIntEvtTracker = (name) => {
		delete auxl.scenarioRunning[name];
	}

	const ClearScenarioTimeIntEvt = () => {
		for(let ran in auxl.scenarioRunning){
			if(auxl.scenarioRunning[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.scenarioRunning[ran].nameId]);
				delete auxl.timeouts[auxl.scenarioRunning[ran].nameId];
			} else if (auxl.scenarioRunning[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.scenarioRunning[ran].nameId]);
				delete auxl.intervals[auxl.scenarioRunning[ran].nameId];
			} else if (auxl.scenarioRunning[ran].type === 'interaction' || auxl.scenarioRunning[ran].type === 'event'){
auxl[auxl.scenarioRunning[ran].name].GetEl().removeEventListener(auxl.scenarioRunning[ran].event, function(){
auxlObjMethod(auxl.scenarioRunning[ran].object,auxl.scenarioRunning[ran].method,auxl.scenarioRunning[ran].params);
});
			}
			RemoveFromScenarioTimeIntEvtTracker(ran);
		}
	}

	const AddToScenarioTracker = (type, obj) => {
		if(type === 'core'){
    		auxl.scenarioSpawned[obj.core.id] = {type, obj};
		} else if(type === 'layer'){
    		auxl.scenarioSpawned[obj.layer.id] = {type, obj};
		}
	}

	const RemoveFromScenarioTracker = (type) => {
		delete auxl.scenarioSpawned[type.id];
	}

	function readTimeline(time){
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){

								AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line);
						}
					}
				}
			} else if(time === 'interval'){
				for(let a in core[time][line]){
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromScenarioTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromScenarioTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
										}
									}, line);
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else if(time === 'event'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else {
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'info') {
					} else {
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
	return;
	}

	function updateHTMLTitle(){
		scenarioHeaderTitle.innerHTML = scenarioName;
		scenarioMenuTitle.innerHTML = scenarioName;
	}

	function updateHTMLInstructions(){
		instructions.innerHTML = scenarioInstructions;
	}

	const Info = () => {
		readTimeline('info');
	}

	const AddControls = () => {
		readTimeline('controls');
	}

	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}

	const Start = () => {
		readTimeline('start');
	}

	const Delay = () => {
		readTimeline('delay');
	}

	const Interval = () => {
		readTimeline('interval');
	}

	const Event = () => {
		readTimeline('event');
	}

	const Interaction = () => {
		readTimeline('interaction');
	}

	const Exit = () => {
		readTimeline('exit');
	}

	const Init = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
	}

	const StartScenario = () => {
		if(core.scenarioLoaded){} else {
			playerSceneAnim();
			//Get Universal Controls component
			auxl.universalControls = document.getElementById('playerRig').components['universal-controls'];
			//console.log(auxl.universalControls);

			//Start scene mid Player anim
			startTimeout = setTimeout(function () {
				//Load All Scenario Items
				Init();
				//zone to start in
				auxl[zoneSpawn].StartScene();
				core.scenarioLoaded = true;
				clearTimeout(startTimeout);
			}, 425);
		}
	}

	const ClearScenario = () => {
		Exit();
		ClearScenarioTimeIntEvt();
		RemoveControls();
		clearSpawned(auxl.scenarioSpawned);
	}

	return {core, StartScenario, ClearScenario};
}

//
//SkyBox
//Lights, Sky, Space
this.SkyBox = (skyBoxData) => {

	//work on importing chunks of each section
	let skyBox = Object.assign({}, skyBoxData);
	//skyBox.lights
	//skyBox.sky
	//skyBox.space

	let dayNightTimeout;
	let dayNightInterval;

	const SpawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].SpawnCore){
				skyBox.lights[each].SpawnCore(false, false, true);
			} else if(skyBox.lights[each].SpawnLayer){
				skyBox.lights[each].SpawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}

	const DespawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].DespawnCore){
				skyBox.lights[each].DespawnCore(false, false, true);
			} else if(skyBox.lights[each].DespawnLayer){
				skyBox.lights[each].DespawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}

	const SpawnSky = () => {
		//combine with atmosphere?
		for(let each in skyBox.sky){
			if(skyBox.sky[each].SpawnCore){
				skyBox.sky[each].SpawnCore(false, false, true);
			} else if(skyBox.sky[each].SpawnLayer){
				skyBox.sky[each].SpawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}

	const DespawnSky = () => {
		//combine with atmosphere?
		for(let each in skyBox.sky){
			if(skyBox.sky[each].DespawnCore){
				skyBox.sky[each].DespawnCore(false, false, true);
			} else if(skyBox.sky[each].DespawnLayer){
				skyBox.sky[each].DespawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}

	const SpawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].SpawnCore){
				skyBox.space[each].SpawnCore(false, false, true);
			} else if(skyBox.space[each].SpawnLayer){
				skyBox.space[each].SpawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}

	const DespawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].DespawnCore){
				skyBox.space[each].DespawnCore(false, false, true);
			} else if(skyBox.space[each].DespawnLayer){
				skyBox.space[each].DespawnLayer(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}

	const SpawnSkyBox = () => {
		SpawnLights();
		SpawnSky();
		SpawnSpace();
	}

	const DespawnSkyBox = () => {
		clearTimeout(dayNightTimeout);
		clearInterval(dayNightInterval);
		DespawnLights();
		DespawnSky();
		DespawnSpace();
		RemoveFromTracker(skyBox.id);
	}

	const Sunrise = () => {
		auxl.directionalLight.EmitEvent('sunrise');
		auxl.directionalLight2.EmitEvent('sunrise');
		auxl.directionalLight3.EmitEvent('sunrise');
		auxl.ambientLight.EmitEvent('sunrise');
		auxl.skyGrad.EmitEvent('sunrise');
		auxl.sunLayer.EmitEventParent('sunrise');
		auxl.moonLayer.EmitEventParent('sunrise');
	}

	const PauseDayNight = () => {
		auxl.directionalLight.EmitEvent('pauseDayNight');
		auxl.directionalLight2.EmitEvent('pauseDayNight');
		auxl.directionalLight3.EmitEvent('pauseDayNight');
		auxl.ambientLight.EmitEvent('pauseDayNight');
		auxl.skyGrad.EmitEvent('pauseDayNight');
		auxl.sunLayer.EmitEventParent('pauseDayNight');
		auxl.moonLayer.EmitEventParent('pauseDayNight');
	}

	const ResumeDayNight = () => {
		auxl.directionalLight.EmitEvent('resumeDayNight');
		auxl.directionalLight2.EmitEvent('resumeDayNight');
		auxl.directionalLight3.EmitEvent('resumeDayNight');
		auxl.ambientLight.EmitEvent('resumeDayNight');
		auxl.skyGrad.EmitEvent('resumeDayNight');
		auxl.sunLayer.EmitEventParent('resumeDayNight');
		auxl.moonLayer.EmitEventParent('resumeDayNight');
	}

	const DayNightCycle = (dayLength) => {

		if(dayLength){
			if(typeof dayLength === 'number'){
				//shortest day allowed 24 seconds
				if(dayLength >= 24000){
					auxl.timeInDay = dayLength;
				}
			}
		}

		Sunrise();
		auxl.skyGrad.SetFlag({flag:'day', value: true});
		//SkyGrad Color Anim
		//Timeout
		dayNightTimeout = setTimeout(function () {
			auxl.skyGrad.SetFlag({flag:'day', value: false});
			auxl.skyGrad.EmitEvent('sunset');
			dayNightInterval = setInterval(function() {
				if(auxl.skyGrad.GetFlag('day')){
					auxl.skyGrad.SetFlag({flag:'day', value: false});
					auxl.skyGrad.EmitEvent('sunset');
				}else{
					auxl.skyGrad.SetFlag({flag:'day', value: true});
					auxl.skyGrad.EmitEvent('sunrise');
				}

			}, auxl.timeInDay/2); //Interval
		}, auxl.timeInDay/2 - auxl.timeInDay/24); //Delay
	}

	const RestartDayNight = (dayLength) => {
		PauseDayNight();
		Despawn();
		Spawn();
		DayNightCycle(dayLength);
	}

	return {skyBox, SpawnSkyBox, DespawnSkyBox, DayNightCycle, PauseDayNight, ResumeDayNight, RestartDayNight};
}

//
//Horizon
//Mountains, Hills, Buildings, Cylinder/Square Wall
this.Horizon = (horizonData) => {

	//work on importing chunks of each section
	let horizon = Object.assign({}, horizonData);
/*
auxl.horizonMountainData = {
id: 'horizonMountain',
type: 'mountains',//hills,buildings,cylinder|square walls
texture: false,//omit to use ThreeGradientShader
baseColor: false,
baseColorFamily: 'lime',
radius: 200,
density: 'normal',//low,normal,high
height: 'normal',//low,normal,high
width: 'normal',//low,normal,high
};

Allow to specify top,mid,bottom threeGrad colors?
*/

//Material
let top;
let mid;
let bottom;
let colorPick;

//Density
let spawnAmount;
if(horizon.density === 'low'){
	spawnAmount = 5;
} else if(horizon.density === 'normal'){
	spawnAmount = 10;
} else if(horizon.density === 'high'){
	spawnAmount = 20;
}

//Height
let spawnHeight;
if(horizon.height === 'low'){
	spawnHeight = 0.5;
} else if(horizon.height === 'normal'){
	spawnHeight = 1;
} else if(horizon.height === 'high'){
	spawnHeight = 1.5;
}

//Width
let spawnWidth;
if(horizon.width === 'low'){
	spawnWidth = 0.5;
} else if(horizon.width === 'normal'){
	spawnWidth = 1;
} else if(horizon.width === 'high'){
	spawnWidth = 1.5;
}

//Type
let geometry;
let position = new THREE.Vector3(0,0,horizon.radius*-1);
let scale = new THREE.Vector3(1,1,1);
let height;
if(horizon.type === 'mountains'){
	height = 100*spawnHeight;
	geometry = {primitive: 'cone', height: height, radiusBottom: 50, radiusTop: 0, openEnded: true, segmentsHeight: 1, segmentsRadial: 9, thetaLength: 180, thetaStart: 90},
	scale.x = 1.5*spawnWidth;
} else if(horizon.type === 'hills'){
	height = 50*spawnHeight;
	geometry = {primitive: 'circle', radius: height, thetaStart: 0, thetaLength: 180};
	scale.x = 1.5*spawnWidth;
} else if(horizon.type === 'buildings'){
	height = 100*spawnHeight;
	geometry = {primitive: 'plane', width: 40*spawnWidth, height: height};
} else if(horizon.type === 'cylinderWall'){
	height = 50*spawnHeight;
	geometry = {primitive: 'cylinder', openEnded: true, radius: horizon.radius, height: height, segmentsHeight: 9, segmentsRadial: 32, thetaStart: 0, thetaLength: 360 };
	position.z = 0;
	spawnAmount = 1;
} else if(horizon.type === 'squareWall'){
	height = 40*spawnHeight;
	geometry = {primitive: 'plane', width: horizon.radius*2, height: height};
	spawnAmount = 4;
}

let horizonAllData = {
data:'horizonAllData',
id:'horizonParent',
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
components: false,
};
let horizonAll = auxl.Core(horizonAllData);
let horizonLayerData = {
	parent: {core: horizonAll},
};

let horizonParentData = {
data:'horizonParentData',
id:'horizonParent',
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
components: false,
};

let horizonChildData = {
data:'horizonChildData',
id:'horizonChild',
sources:false,
text: false,
geometry: geometry,
material: false,
position: position,
rotation: new THREE.Vector3(0,0,0),
scale: scale,
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

let horizonParentId = 'horizonParent';
let horizonParentCores = [];
let horizonChildId = 'horizonChild';
let horizonChildCores = [];

for(let a=0; a < spawnAmount; a++){

	//Parent
	horizonParentId = 'horizonParent' + a;
	let parentRotation = new THREE.Vector3(0,0,0);
	parentRotation.y = 360/spawnAmount*a;
	horizonParentData.id = horizonParentId;
	horizonParentData.rotation = parentRotation;
	horizonParentCores[a] = auxl.Core(horizonParentData);
	//Child
	horizonChildId = 'horizonChild' + a;
	horizonChildData.id = horizonChildId;
	if(horizon.type === 'squareWall'){}else{
		horizonChildData.scale.x = (1.5*spawnWidth) +(Math.random()*0.1-0.2);
		horizonChildData.scale.y = 1 + (Math.random()*0.2-0.4);
	}
	if(horizon.type === 'mountains' || horizon.type === 'buildings' || horizon.type === 'cylinderWall' || horizon.type === 'squareWall'){
		horizonChildData.position.y = ((horizonChildData.scale.y*height)/2)-1;
	} else if(horizon.type === 'hills'){
		horizonChildData.position.y = -1;
	}
	//Material
	let material;
	let textureSrc;
	if(horizon.texture){
		if(horizon.baseColor){
			colorPick = auxl.colorTheoryGen(horizon.baseColor);
		} else if(horizon.baseColorFamily){
			colorPick = auxl.colorTheoryGen(false, horizon.baseColorFamily);
		} else {
			colorPick = auxl.colorTheoryGen();
		}
		colorPickBase = colorPick.base;
		material = {shader: "standard", side: 'double', color: colorPickBase};

		if(horizon.texture.src){
			if(Array.isArray(horizon.texture.src)){
				textureSrc = horizon.texture.src[Math.floor(Math.random()*horizon.texture.src.length)];
			} else {
				textureSrc = horizon.texture.src;
			}
			material.src = textureSrc;
		}
		if(horizon.texture.repeat){
			material.repeat = horizon.texture.repeat;
		}
		if(horizon.texture.opacity){
			material.opacity = horizon.texture.opacity;
		}
		if(horizon.texture.metalness){
			material.metalness = horizon.texture.metalness;
		}
		if(horizon.texture.roughness){
			material.roughness = horizon.texture.roughness;
		}
		if(horizon.texture.emissive){
			material.emissive = colorPickBase;
		}
		if(horizon.texture.emissiveIntensity){
			material.emissiveIntensity = horizon.texture.emissiveIntensity;
		}

	} else if(horizon.baseColor){
		colorPick = auxl.colorTheoryGen(horizon.baseColor);
		mid = colorPick.base;
		top = colorPick.tetradic[0];
		bottom = colorPick.tetradic[1];
		material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
	} else if(horizon.baseColorFamily){
		colorPick = auxl.colorTheoryGen(false, horizon.baseColorFamily);
		mid = colorPick.base;
		top = colorPick.tetradic[0];
		bottom = colorPick.tetradic[1];
		material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
	} else {
		colorPick = auxl.colorTheoryGen();
		mid = colorPick.base;
		top = colorPick.tetradic[0];
		bottom = colorPick.tetradic[1];
		material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
	}
	horizonChildData.material = material;
	//Core
	horizonChildCores[a] = auxl.Core(horizonChildData);
	//Layer
	horizonLayerData['child'+a] = {
		parent: {core: horizonParentCores[a]}, 
		child0: {core: horizonChildCores[a]},
	};
}
let horizonLayer = auxl.Layer('horizonLayer',horizonLayerData);

	const SpawnHorizon = () => {
		horizonLayer.SpawnLayer(true);
	}

	const DespawnHorizon = () => {
		horizonLayer.DespawnLayer(true);
		RemoveFromTracker(horizon.id);
	}

	return {horizon, SpawnHorizon, DespawnHorizon};
}

//
//Story Book - Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
this.Book = (core, npc) => {
//facilitate interaction between user, objects and story.

	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let spawn of auxl.spawnFunc) {
			if(func === spawn){
				//console.log(object);
				//console.log(npc.id);
				spawnTracker(object, 'book', npc.id);
			}
		}
		auxl[object][func](params);
	}

	function* lineReader(book,time){
		for(let line in time){
			//console.log(line);//id,timeline,transition,textBubble,... key name
			//console.log(time[line]);//id,timeline,transition,textBubble,... value object

			//Ignore Page Data
			if(line === 'id' || line === 'description' ||line === 'tags' ||line === 'nextPage' ||line === 'prevPage' ||line === 'timeline'){
			//page data only
			} else if(line === 'pureFunction'){
				//pure functions
				//not object generated methods
				//Need a good check condition for this.func() and not this.obj.func()

				//console.log(line)
				//console.log(time)
				//console.log(time[line])
				//console.log(auxl[line])
				//auxl[line](time[line])
				//console.log('pureFunction');
				//console.log(auxl[line]);
				auxl[line](time[line])
			} else {
				//console.log(line);
				//console.log(time[line]);
				for(let a in time[line]){
					//console.log(a);//SpawnCore / ChangeSelf
					//console.log(time[line]);//{SpawnCore: null} / {ChangeSelf: {mat...}}
					//console.log(time[line][a]);//params
					//console.log('Executing...');
					//console.log(line);//objectName
					//console.log(a);//func
					//console.log(auxl[line][a]);
					//auxl[line][a](time[line][a]);
					auxlObjMethod(line,a,time[line][a]);
				}

			}//else

		}//for line in time
		//console.log(book);
		//console.log('Stop here please.');
		yield;

	}

	function* timeReader(book,page){
		for(let time in page){
			//console.log(time);//info,timeline0,timeline1,... key name
			//console.log(page[time]);//info,timeline0,timeline1,... value object
			book.currentTimeline = time;
			book.timelineQue.push([time,page[time]]);
			//Skip|Ignore Data til timeline# reach if jumping
			if(time === core.jumpTo){
				core.jumping = false;
				//console.log('timeline hit')
				//console.log(time)
			}
			if(core.jumping){
			//console.log('jumping');
			//console.log(time);
			}else{
			//console.log('Running');
			//console.log(time);
			yield* lineReader(book, page[time]);
			}


		}//Page
	}

	function* pageReader(book){
		for(let page in book.pages){
			//console.log(page);//page0,page1,... key name
			//console.log(pages[page]);//page0,page1,... value object
			book.currentPage = page;
			book.pageQue.push([page,book.pages[page]]);
			yield* timeReader(book, book.pages[page]);

		}//Page
	}

	function* bookReader(book){

	//let value;
	//let entry;
	//entry = {};
	//entry[key] = value;
	//pageDecrypt.push(entry);

	book.currentPage = 0;
	book.currentTimeline = 0;
	book.currentEntry = 0;
	book.currentDialog = 0;
	book.pageQue = [];
	book.timelineQue = [];
	book.entryQue = [];
	book.textBubbleQue = [];
	book.speaker = '';
	book.speaking = false;
	book.jumping = false;
	book.jumpTo;
	book.selectJumpMenu;
	for(let props in book.scene){
		//console.log(props);
		//console.log(book.scene[props]);
	};


	//Book Info & Contents
	//display this info in scene on a plane above controller 
	//for(let setting in book.info){
		//console.log(setting);
		//console.log(book.info[setting]);
		//Book Info
		//id
		//description
		//tags
	//};
	//Book Initialized
	//yield;//Do you want to continue|confirm?
	//Start reading Pages
	//Pages Ingo & Contents
	yield* pageReader(book);

	};

	let book = bookReader(core);

	function readTimeline({page,time}){
	//find a specific timeline/key name and load up that
	//auxl.bookOverviewAuxlFeatures.readTimeline('page0','timeline6');
	//page - 'page0'
	//time - 'timeline6'
		for(let line in core.pages[page][time]){
			if(line === 'pureFunction'){
				//Need a good check condition for this.func() and not this.obj.func()
				//console.log('pureFunction');
				//console.log(auxl[line]);
				auxl[line](time[line])
			} else {
				for(let a in core.pages[page][time][line]){
					//console.log('Executing...');
					//console.log(auxl[line][a]);
					auxl[line][a](core.pages[page][time][line][a]);
				}
			}
		}
	return;
}

	const Next = () => {
		//next yielded spot and update done var
		book.done = book.next().done;

		if(book.done){
			//console.log('All Done!');
		} else {
			//console.log('Continue...')
		}
	}

	const Jump = ({timeline, page}) => {

		//let toBook = book || false;
		let toPage = page || core.currentPage;
		core.jumpTo = timeline;

		//if exists
		if(core.pages[toPage][core.jumpTo]){
		   //book.currentTimeline - name of current timeline
			//console.log('It exists!');
			core.jumping = true;
		} else {
		   //console.log(timeline)
		   //console.log('Error Timeline does not exist.')
		}
	}

	const SelectJump = (jumpOptions) => {
	//gen a menu that displays options which when selected jump to a specific timeline#
		let selectedTime;
		let selectedPage = false;
		let selectJumpData = {
			id: 'selectJump',
			prompt: 'When to?',
			options: {},
			actions: {},
			data: auxl.menuBaseData,
			cursorObj: npc.core.id,
			pos: new THREE.Vector3(1,1.5,-0.5),
			method: 'Click',
		}

		for(let a = 0; a < jumpOptions.length; a++){
			selectJumpData.options['option'+a] = jumpOptions[a][0];
			selectJumpData.actions['action'+a] = jumpOptions[a][1];
		}

		book.selectJumpMenu = auxl.Menu(selectJumpData);
		book.selectJumpMenu.SpawnMenu();
		book.selectJumpMenu.AddToParentSpawnTracker(book.selectJumpMenu, npc);
		//book.selectJumpMenu.RemoveMenuFromSceneTracker();
		//disable main el clickable class
		//Need to update after creating book control component
		npc.GetEl().classList.toggle('clickable', false);
	}

	return {core, book, Next, Jump, SelectJump, readTimeline};
}

//
//Speech System Textbubble
this.SpeechSystem = (core) => {

	core.on = false;
	core.speaking = false;
	core.textDisplayInterval;

	const Start = () => {
		core.SpawnCore(false,false,true);
		core.GetEl().addEventListener('mouseenter', Skip);
		core.on = true;
	}

	const Skip = () => {
		core.GetEl().emit('skip',{});
	}

	const Stop = () => {
		core.GetEl().removeEventListener('mouseenter', Skip);
		core.DespawnCore(false,false,true);
		core.on = false;
	}

	const Kill = (interval) => {
		core.speaking = false;
		clearInterval(auxl.intervals[core.core.id]);
		delete auxl.intervals[core.core.id];
	}

	const KillStop = () => {
		Kill();
		Stop();
	}

	const ChangeCore = (setAlt) => {
		if(Array.isArray(setAlt)){
			for(let each in setAlt){
				core.ChangeSelf(setAlt[each])
			}
		} else {
			core.ChangeSelf(setAlt)
		}
	}

	const DisplaySpeech = ({role,speech}) => {
		let startText = role + ' : ';
		let currText = startText;
		let currChar = 0;
		core.GetEl().setAttribute('text',{value: currText});
		core.speaking = true;

		function skipText(){
			core.GetEl().setAttribute('text',{value: startText + speech});
			core.speaking = false;
			Kill();
			core.GetEl().removeEventListener('skip',skipText);
		}

		core.GetEl().addEventListener('skip', skipText);

		AddToTimeIntEvtTracker({name: 'textDisplayInterval', type: 'interval', id: core.core.id});
		auxl.intervals[core.core.id] = setInterval(function() {
			//Interval Functions
			if(currChar < speech.length){
				currText += speech[currChar];
				currChar++;
			}
			if(currChar >= speech.length){
				core.speaking = false;
				Kill();
				core.GetEl().removeEventListener('skip',skipText);
			}
			if(core.on){
				core.GetEl().setAttribute('text',{value: currText});
			}
		}, 20); //Interval
	}

	const AddToTimeIntEvtTracker = ({name,type,id,method,params}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.running[nameId] = {type, name, id, nameId, method, params, event};
		}
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}

	return {core, Start, Skip, KillStop, ChangeCore, DisplaySpeech};
}

//
//NPC
this.NPC = (core, bookData, textDisplay) => {

let npc = Object.assign({}, core);
npc.id = npc.core.id;
let bubble = Object.assign({}, textDisplay);
let book;
//bubble.core.position.x = core.core.position.x;
//bubble.core.position.y = core.core.position.y - 0.5;
//bubble.core.position.z = core.core.position.z + 0.25;
let text = auxl.SpeechSystem(bubble);
let menuTimeout;

	const SpawnNPC = () => {
		//Reset book on each spawn
		book = auxl.Book(bookData, npc);
		npc.SpawnCore(false,false,true);
		EnableSpeech();
		//AddToNPCSceneTracker();
		//Need an NPC tracker, so it can run DisableSpeech on scene change
		//console.log('Spawn');
	}

	const DespawnNPC = () => {
		ClearBookSpawn();
		DisableSpeech();
		npc.DespawnCore(false,false,true);
		RemoveFromTracker(npc.id);
	}

	const ClearBookSpawn = () => {
		clearSpawned(auxl.bookSpawned[npc.id]);
		delete auxl.bookSpawned[npc.id];
	}

	const EnableSpeech = () => {
		//console.log('Enable Speech');
		text.Start();
		npc.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}})
		//Jump to Timeline0
		NextPage();
		NextPage();
		npc.GetEl().addEventListener('mouseenter', NextPage);
		npc.GetEl().addEventListener('click', ResetBook);
	}

	const DisableSpeech = () => {
		//console.log('Disable Speech');
		text.KillStop();
		npc.GetEl().removeEventListener('mouseenter', NextPage);
		npc.GetEl().removeEventListener('click', ResetBook);
	}

	const Speak = ({role,speech}) => {
		//console.log('Speak')
		//console.log(role)
		//console.log(speech)
		text.DisplaySpeech({role, speech});
	}

	const NextPage = () => {
		//Prevent pushing next speech until current is over or skipped to end
		//console.log('Next Page')
		//console.log(text.core.on)
		//console.log(text.core.speaking)
		if(text.core.on){
			if(text.core.speaking){} else {
				book.Next()
			}
		} else {
			book.Next()
		}
	}

	const ResetBook = (force) => {
		if(book.book.done || force){
			//console.log('Reseting Book...');
			//Reset Book
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			NextPage();
			NextPage();
			//npc.ChangeSelf({property: 'material', value: {opacity: 1}});
			//npc.ChangeSelf({property: 'text', value: {value: 'Menu'}});
			//console.log('Book Ready!');
		} else {
			//console.log('Book is not done!')
		}
	}

	const Click = (el) => {
		let result = el.getAttribute('result');
		Jump({timeline: result});
		book.Next();

		//Need to update after creating book control component
		npc.GetEl().classList.toggle('clickable', true);
		//Timeout
		menuTimeout = setTimeout(function () {
			book.book.selectJumpMenu.DespawnMenu();
			book.book.selectJumpMenu.RemoveMenuFromSceneTracker();
			clearTimeout(menuTimeout);
		}, 250); //Delay
	}

	const Jump = ({timeline, page}) => {
		book.Jump({timeline, page})
	}

	const SelectJump = (jumpOptions) => {
		book.SelectJump(jumpOptions);
	}

	const auxlObjMethod = (object, func, params) => {
		//console.log('NPC running method');
		//console.log(object);
		//console.log(func);
		//Used to run NPC methods
		auxl[object][func](params);
	}

	const IfElse = (obj) => {
		//Used to run NPC methods
		//console.log('NPC running ifElse');
		//console.log(obj);
		//ifTrue
		//ifFalse
		//for loop for above objects with key name as object and value key as method and that value the params
		//console.log(obj)//entire ifElse object
		let objRef = Object.keys(obj);
		//console.log(Object.keys(obj))//this.obj name
		let cond = obj[objRef].cond;
		let ifTrue = obj[objRef].ifTrue;
		let ifFalse = obj[objRef].ifFalse;
		//console.log(cond)//cond name
		//console.log(ifTrue)
		//console.log(ifFalse)

		//console.log(auxl[objRef].GetFlag(cond))
		if(auxl[objRef].GetFlag(cond)) {
			//run ifTrue
			for(let a in ifTrue){
				//console.log(ifTrue);
				//console.log(a);
				//console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					auxlObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			//run ifFalse
			for(let a in ifFalse){
				//console.log(ifFalse);
				//console.log(a);//this.object name should match objRef
				//console.log(ifFalse[a]);//method w/ params
				for(let b in ifFalse[a]){
					auxlObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}

	}

	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			npc[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			npc[flagValue.flag] = flagValue.value;
		}
	}

	const GetFlag = (varName) => {
		//console.log(varName)
		//console.log(core[varName])
		return npc[varName];
	}

return {npc, SpawnNPC, DespawnNPC, EnableSpeech, DisableSpeech, Speak, NextPage, ResetBook, Click, Jump, SelectJump, auxlObjMethod, IfElse, SetFlag, GetFlag}
}

//
//Hamburger Menu Companion
this.HamMenu = (id, core) => {

let ham = Object.assign({}, core);
ham.id = id;
ham.systemOpen = false;
ham.travelSettingsOpen = false;
ham.sceneSettingsOpen = false;
ham.show = false;
ham.pos = auxl.playerRig.GetEl().getAttribute('position');

//Emoti Display
let speechIntervalB;
let speechTimeoutB;

//Hamburger Menu Companion - Main Menu, Settings and Controls
//Travel Settings : Instant, Blink, Fade, Sphere
//Travel|Site Menu
//Scene Settings : Color Themes, Accessibility, Scene Info, etc...
let systemMenuButtons = {
travelSettings: 'Travel Settings',
sceneSettings: 'More Settings[DISABLED]',
};

let travelSettingsButtons = {
instant: 'Instant Transition',
blink: 'Blink Transition',
fade: 'Fade In/Out Transition',
sphere: 'Sphere Transition',
};

let sceneSettingsButtons = {
theme: 'Color Theme',
accessibility: 'Accessibility Settings',
author: 'Made by Minty Crisp!',
};
	//
	//Emoti Display
	const autoScriptEmoticon = () => {

	function* emotiSpeech() {
		yield '-_-';
		yield 'O_O';
		yield 'o_o';
		yield 'o_O';
		yield 'O_o';
		yield 'O_^';
		yield '^_o';
		yield '^_^';
		yield 'o_^';
		yield '^_O';
		yield '<_<';
		yield '>_>';
		yield '>_<';
		yield 'X_X';
		yield '*_*';
		yield '+_+';
		yield '0_0';
	}

		let emotiSpeechArray = [];
		//Only do 1 step per run, not all though?
		for (speech of emotiSpeech()) {
			//console.log(speech);
			emotiSpeechArray.push(speech);
		}
		let buddy;
		let buddyFaceMaterial = {value:'^_^', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double',}
		let b;
		speechTimeoutB = setTimeout(function () {
			b = 0;
			buddy = ham.GetEl();

			speechIntervalB = setInterval(function() {
				buddyFaceMaterial.value = emotiSpeechArray[b];
				buddy.setAttribute('text', buddyFaceMaterial);
				if(b === emotiSpeechArray.length){b = 0}else{b++}
			}, 2700); //Interval
		}, 250); //Delay
	}

	const ToggleHam = () => {
		if(ham.show){
			closeAll();
			DespawnHam();
		} else {
			SpawnHam();
		}
	}
	//Attach Toggle to playerFloor
	playerFloor.addEventListener('click',ToggleHam);

	const SpawnHam = () => {
		ham.SpawnCore(auxl.playerRig.GetEl(), false, true);
		ShowInventory();
		ham.show = true;
		autoScriptEmoticon();
		ham.GetEl().addEventListener('click', openCloseMenu);
	}

	const DespawnHam = () => {
		clearInterval(speechTimeoutB);
		clearInterval(speechIntervalB);
		HideInventory();
		ham.GetEl().removeEventListener('click', openCloseMenu);
		ham.DespawnCore(auxl.playerRig.GetEl(), false, true);
		ham.show = false;
		ham.systemOpen = false;
		RemoveFromTracker(ham.id);
	}

	const ShowInventory = () => {
		auxl.inventoryScreen.SpawnCore(ham.GetEl(), false, true);
		auxl.player.UpdateInventoryScreen();
	}

	const HideInventory = () => {
		auxl.inventoryScreen.DespawnCore(ham.GetEl(), false, true);
	}


	const openCloseMenu = () => {
		if(ham.systemOpen){
			closeSystemMenu();
		} else if(ham.travelSettingsOpen){
			closeTravelSettingsMenu()
			systemSpawnMenu();
		} else if(ham.sceneSettingsOpen){

		} else {
			systemSpawnMenu();
		}
	}

	const closeAll = () => {
		if(ham.systemOpen){
			closeSystemMenu();
		} else if(ham.travelSettingsOpen){
			closeTravelSettingsMenu()
		} else if(ham.sceneSettingsOpen){
		}
	}

	const systemSpawnMenu = () => {
		ham.systemOpen = true;
		ham.GetEl().classList.toggle('clickable');
		ham.pos = auxl.playerRig.GetEl().getAttribute('position');
		ham.systemMenuData = {
			id: 'systemMenu',
			prompt: 'X - System Menu',
			options: {option0: '0'},
			actions: {action0: '0'},
			layout: 'vertical',
			data: auxl.menuBaseData,
			cursorObj: ham.id,
			method: 'SystemMenuClick',
			pos: new THREE.Vector3(ham.pos.x+1,1.5,ham.pos.z-1),
		}

		let currNum = 0;
		for(let options in systemMenuButtons){
			//console.log(options);
			ham.systemMenuData.options['option'+currNum] = systemMenuButtons[options];
			ham.systemMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.systemMenu = auxl.Menu(ham.systemMenuData);
		ham.systemMenu.SpawnMenu();
		ham.systemMenu.AddToParentSpawnTracker(ham.systemMenu, ham);
		ham.GetEl().classList.toggle('clickable');
		//ham.systemMenu.menu.layer.AnimateParent(auxl.animClickData);
	}

	const closeSystemMenu = () => {
		ham.systemOpen = false;
		ham.systemMenu.DespawnMenu();
		ham.systemMenu.RemoveMenuFromSceneTracker();
	}

	const SystemMenuClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);//connect0
		//toggle clickable class
		//ham.systemMenu
		ham.systemMenu.ToggleOptionClicking();
		//Timeout
		let timeout = setTimeout(function () {
			if(result === 'travelSettings'){
				travelSettings();
			} else if(result === 'sceneSettings'){
				sceneSettings();
			}
			//Removing this menu breaks the mapZone travel menu
			closeSystemMenu();
			clearTimeout(timeout);
		}, 250);
	}

	const travelSettings = () => {
		//console.log('Travel Settings');
		travelSettingsSpawnMenu();
	}

	const travelSettingsSpawnMenu = () => {
		ham.travelSettingsOpen = true;
		ham.pos = auxl.playerRig.GetEl().getAttribute('position');
		ham.travelSettingsMenuData = {
			id: 'travelSettings',
			prompt: '< - Travel Settings',
			options: {option0: '0'},
			actions: {action0: '0'},
			layout: 'vertical',
			data: auxl.menuBaseData,
			cursorObj: ham.id,
			method: 'TravelSettingsMenuClick',
			pos: new THREE.Vector3(ham.pos.x+1,1.5,ham.pos.z-1),
		}

		let currNum = 0;
		for(let options in travelSettingsButtons){
			//console.log(options);
			ham.travelSettingsMenuData.options['option'+currNum] = travelSettingsButtons[options];
			ham.travelSettingsMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.travelSettingsMenu = auxl.Menu(ham.travelSettingsMenuData);
		ham.travelSettingsMenu.SpawnMenu();
		ham.systemMenu.AddToParentSpawnTracker(ham.travelSettingsMenu, ham);

	}

	const closeTravelSettingsMenu = () => {
		ham.travelSettingsOpen = false;
		ham.travelSettingsMenu.DespawnMenu();
		ham.travelSettingsMenu.RemoveMenuFromSceneTracker();
	}

	const TravelSettingsMenuClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);
		//Display confirmation window on selection
		//Add animation feedback on click of button
		//instant
		//fade
		//sphere
		//blink
		ham.travelSettingsMenu.ToggleOptionClicking();
		auxl.player.layer.transition = result;
		//Timeout
		let timeout = setTimeout(function () {
			closeTravelSettingsMenu();
			clearTimeout(timeout);
		}, 250);
	}

	const sceneSettings = () => {
		//console.log('Scene Settings');
	}

return{ham, SpawnHam, DespawnHam, SystemMenuClick, TravelSettingsMenuClick};
}

//
//Single Objs Gen Ring Spawn
this.ObjsGenRing = (data) => {
	let singleGen = Object.assign({}, data);
	let ogData = Object.assign({}, data.objData);
	let objData = JSON.parse(JSON.stringify(data.objData));

//scenario
//zone
//node
//let spawnSection;

	//gen.id
	//gen.objData
	//gen.total
	//gen.outerRingRadius
	//gen.innerRingRadius
	//gen.sameTypeRadius
	//gen.otherTypeRadius
	//gen.ranYPos
	//gen.yPosFlex
	//gen.ranScaleX
	//gen.ranScaleY
	//gen.ranScaleZ
	//gen.scaleFlex
	//gen.ranRotX
	//gen.ranRotY
	//gen.ranRotZ
	//gen.ranColor
	//gen.ranTexture

	singleGen.all = [];
	let posX;
	let posY;
	let posZ;
	let positionVec3;
	let scaleX;
	let scaleY;
	let scaleZ;
	let rotX;
	let rotY;
	let rotZ;
	let color;

	//Function to calculate distance between two points
	function distance(x1, z1, x2, z2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2) * 1.0);
	}

	function randomPosition(radius, yPos){
		posX = Math.random() * (radius*2) - radius;
		posZ = Math.random() * (radius*2) - radius;
		return new THREE.Vector3(posX, yPos, posZ);
	}

	const genCores = () => {

		for(let a = 0; a < singleGen.total; a++){
			objData.id = ogData.id + a;

			//Color
			if(singleGen.ranColor){
				color = auxl.colorTheoryGen().base;
				objData.material.color = color;
				if(objData.material.emissive){
					objData.material.emissive = color;
				}
			}
			//Texture
			if(singleGen.ranTexture){
				objData.material.src = auxl.patterns[Math.floor(Math.random()*auxl.patterns.length)];
			}
			//Rotation
			rotX = objData.rotation.x;
			rotY = objData.rotation.y;
			rotZ = objData.rotation.z;
			if(singleGen.ranRotX){
				rotX += Math.random() * 360;
			}
			if(singleGen.ranRotY){
				rotY += Math.random() * 360;
			}
			if(singleGen.ranRotZ){
				rotZ += Math.random() * 360;
			}
			objData.rotation = new THREE.Vector3(rotX, rotY, rotZ);

			//Scale
			scaleX = singleGen.objData.scale.x;
			scaleY = singleGen.objData.scale.y;
			scaleZ = singleGen.objData.scale.z;
			if(singleGen.ranScaleX){
				scaleX += Math.random() * singleGen.scaleFlex;
			}
			if(singleGen.ranScaleY){
				scaleY += Math.random() * singleGen.scaleFlex;
			}
			if(singleGen.ranScaleZ){
				scaleZ += Math.random() * singleGen.scaleFlex;
			}
			objData.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);

			//Scale adjustment needs affect gen.sameTypeRadius
			//Need to spawn equal amount in each quadrant?
			posY = singleGen.objData.position.y;
			if(singleGen.ranYPos){
				posY += Math.random() * singleGen.yPosFlex;
			}

			//Position
			positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
			objData.position = positionVec3;

			//Max attempts to check for avoiding collision
			let checking = 42;
			checkAllData: while (checking > 0) {
				if(a === 0){
					if(distance(positionVec3.x,positionVec3.z,0,0) < singleGen.innerRingRadius) {
						positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				for(let z=0; z < singleGen.all.length; z++) {
					//Check the distance, if too close, change and repeat
					if(distance(positionVec3.x, positionVec3.z, singleGen.all[z].core.position.x, singleGen.all[z].core.position.z) < singleGen.sameTypeRadius || distance(positionVec3.x,positionVec3.z,0,0) < singleGen.innerRingRadius) {
						positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				break;
			}

			//Add randomized Core to All
			singleGen.all.push(auxl.Core(objData));
		}

	}

	const SpawnObjRing = () => {
		genCores();
		for(let a = 0; a < singleGen.total; a++){
			singleGen.all[a].SpawnCore(false, false, true);
		}
	}

	const DespawnObjRing = () => {
		for(let a = 0; a < singleGen.total; a++){
			singleGen.all[a].DespawnCore(false, false, true);
		}
		RemoveFromTracker(singleGen.id);
	}

	return {singleGen, SpawnObjRing, DespawnObjRing};
}

//
//Multi Asset Generator
this.MultiAssetGen = (multiGenData) =>{
	//let ogData = Object.assign({}, data.objData);
	//let objData = JSON.parse(JSON.stringify(data.objData));
	//multiGenData.data
	//multiGenData.id
//Add the ability to read an array of different objects for same size
//Need to better optimize each size's radius
	//multiGenData.tiny
	//multiGenData.small
	//multiGenData.med
	//multiGenData.large
	//multiGenData.huge
	let multiGen = Object.assign({}, multiGenData);
	multiGen.assets = {}
	multiGen.assets.tiny = [];
	multiGen.assets.small = [];
	multiGen.assets.med = [];
	multiGen.assets.large = [];
	multiGen.assets.huge = [];
	let sizes = ['tiny','small','med','large','huge'];
	multiGen.grid = [];
	multiGen.ring0 = [];
	multiGen.ring1 = [];
	multiGen.ring2 = [];
	multiGen.ring3 = [];
	multiGen.ring4 = [];
	multiGen.ring5 = [];
	/*
	multiGen.ring = {
		i0:0.25,
		o0:4,
		i1:1,
		o1:8,
		i2:2,
		o2:16,
		i3:4,
		o3:32,
		i4:8,
		o4:64,
		i5:16,
		o5:128,
	};*/
	multiGen.ring = {
		i0:0.5,
		o0:4,
		i1:3,
		o1:25,
		i2:5,
		o2:60,
		i3:6,
		o3:80,
		i4:8,
		o4:100,
		i5:18,
		o5:150,
	};
	//multiGen.size.data
	//multiGen.size.id
	//multiGen.size.type
	//multiGen.size.radius
	//multiGen.size.min
	//multiGen.size.max
	//multiGen.size.rings
	//multiGen.size.objs
	//multiGen.size.ranYPos
	//multiGen.size.yPosFlex
	//multiGen.size.ranScaleX
	//multiGen.size.ranScaleY
	//multiGen.size.ranScaleZ
	//multiGen.size.scaleFlex
	//multiGen.size.ranRotX
	//multiGen.size.ranRotY
	//multiGen.size.ranRotZ
	//multiGen.size.ranColor
	//multiGen.size.ranTexture
	//multiGen.size.ranAnim
//Ring 0 : 0-2 Radius - user spawn area - tiny/small
//Ring 1 : 2-4 Radius - immeadiately surrounding the spawn area - tiny/small/med
//Ring 2 : 4-8 Radius - a bit farther from spawn area - small/med/large
//Ring 3 : 8-12 Radius - medium distance from spawn - med/large
//Ring 4 : 12-20 Radius - far distance from spawn - large/huge
//Ring 5 : 20-40 Radius - super far distance from spawn - huge
//As grid creation creates a rectangle, could delete everything beyond 5

//Object Size Radius (meters)
//tiny - 0.1
//small - 0.25
//med - 1
//large - 2
//huge - 3

//On every loop through the grid creator, it will always use the center to spawn one, allow that one a parent, but do not use it for a spawning location

//Start with 1 mega mutating grid and add each size's recently added only on grid during generation
//Huge object grid spawn
//Import generated grid and spawn Large
//Import mutated grid and spawn Med
//Import mutated grid and spawn Small
//Import mutated grid and spawn Tiny
//console.log(multiGen.ring);
//Generate Distribution Points at Ring Radius'
let ring5 = [];
let ring4 = [];
let ring3 = [];
let ring2 = [];
let ring1 = [];
let ring0 = [];
let gridRing5 = discSampling('ring5',multiGen.ring.o5,multiGen.ring.i5);
//console.log(gridRing5);

let gridRing4 = discSampling('ring4',multiGen.ring.o4,multiGen.ring.i4,gridRing5);
//console.log(gridRing4);

let gridRing3 = discSampling('ring3',multiGen.ring.o3,multiGen.ring.i3,gridRing4);
//console.log(gridRing3);

let gridRing2 = discSampling('ring2',multiGen.ring.o2,multiGen.ring.i2,gridRing3);
//console.log(gridRing2);

let gridRing1 = discSampling('ring1',multiGen.ring.o1,multiGen.ring.i1,gridRing2);
//console.log(gridRing1);

let gridRing0 = discSampling('ring0',multiGen.ring.o0,multiGen.ring.i0,gridRing1);
//console.log(gridRing0);
//console.log(gridRing0.length);
let ring5Current = 0;
let ring4Current = 0;
let ring3Current = 0;
let ring2Current = 0;
let ring1Current = 0;
let ring0Current = 0;


//And check each for how close to center they are, if too close, remove
//Instead of offsetting here, which pushes all smaller ones super negative, offset them forward in the gridGeneration stage

//Offset all to center and remove center
for(let pos in ring5){
	ring5[pos][0] -= multiGen.ring.o5/2;
	ring5[pos][1] -= multiGen.ring.o5/2;
	if(ring5[pos][0] === 0 && ring5[pos][1] === 0){
		ring5[pos][0] = ring5[pos][1] = multiGen.ring.o5/2;
	}
}
for(let pos in ring4){
	ring4[pos][0] -= multiGen.ring.o4/2;
	ring4[pos][1] -= multiGen.ring.o4/2;
	if(ring4[pos][0] === 0 && ring4[pos][1] === 0){
		ring4[pos][0] = ring4[pos][1] = multiGen.ring.o4/2;
	}
}
for(let pos in ring3){
	ring3[pos][0] -= multiGen.ring.o3/2;
	ring3[pos][1] -= multiGen.ring.o3/2;
	if(ring3[pos][0] === 0 && ring3[pos][1] === 0){
		ring3[pos][0] = ring3[pos][1] = multiGen.ring.o3/2;
	}
}
for(let pos in ring2){
	ring2[pos][0] -= multiGen.ring.o2/2;
	ring2[pos][1] -= multiGen.ring.o2/2;
	if(ring2[pos][0] === 0 && ring2[pos][1] === 0){
		ring2[pos][0] = ring2[pos][1] = multiGen.ring.o2/2;
	}
}
for(let pos in ring1){
	ring1[pos][0] -= multiGen.ring.o1/2;
	ring1[pos][1] -= multiGen.ring.o1/2;
	if(ring1[pos][0] === 0 && ring1[pos][1] === 0){
		ring1[pos][0] = ring1[pos][1] = multiGen.ring.o1/2;
	}
}
for(let pos in ring0){
	ring0[pos][0] -= multiGen.ring.o0/2;
	ring0[pos][1] -= multiGen.ring.o0/2;
	if(ring0[pos][0] === 0 && ring0[pos][1] === 0){
		ring0[pos][0] = ring0[pos][1] = multiGen.ring.o0/2;
	}
}

//Shuffle Array
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

//Shuffle Each Array for better randomness
shuffle(ring5);
shuffle(ring4);
shuffle(ring3);
shuffle(ring2);
shuffle(ring1);
shuffle(ring0);
//console.log(ring5);
//console.log(ring4);
//console.log(ring3);
//console.log(ring2);
//console.log(ring1);
//console.log(ring0);

//
//Disc Sampling
function discSampling(ring, area, space, currentGrid){
//Generates grid starting from 0,0 in the + direction
//Could adjust to use - as well or just spawn and shift the entire spawned set based on provided grid. i.e. 10x10 grid, move everything -5,-5
//But need a center radius to be clear which would be within 5,5 here. Could create a sample automatically which is always blank which would be the very first sample always!

//Need different radius for different objects and all checked

//Generates grid starting from 0,0 in the + direction
//Could adjust to use - as well or just spawn and shift the entire spawned set based on provided grid. i.e. 10x10 grid, move everything -5,-5
//But need a center radius to be clear which would be within 5,5 here. Could create a sample automatically which is always blank which would be the very first sample always!
//console.log(ring);
//Need different radius for different objects and all checked
let grid;
let center;
if(currentGrid){
	center = currentGrid.center;
} else {
	center = false;
}
function* poissonDiscSampler(width, height, radius, center){
	//const k = 4; // maximum number of samples before rejection
	const k = 15// maximum number of samples before rejection
	const radius2 = radius * radius;
	//radius is of the generated area
	//radius2 is the minimum distance allowed between spawns
	const cellSize = radius * Math.SQRT1_2;
	//Math.SQRT1_2 is a constant square root of 0.5 which is ~0.707
	const gridWidth = Math.ceil(width / cellSize);
	const gridHeight = Math.ceil(height / cellSize);
	//const grid = new Array(gridWidth * gridHeight);
	//const queue = [];
	let queue = [];
	grid = new Array(gridWidth * gridHeight);
	if(currentGrid){
		for(let each in currentGrid){
			grid[each] = currentGrid[each];
			queue[each] = currentGrid[each];
		}
		//console.log(currentGrid);
		//console.log(grid);
	}
	//
	if(center){
		yield {add: sample(center, center, null)};
	} else {
		yield {add: sample(width / 2 , height / 2, null)};
	}


	//console.log(k);//4
	//console.log(radius2);//4
	//console.log(cellSize);//1.4
	//console.log(gridWidth);//8
	//console.log(gridHeight);//8
	//console.log(grid);//64slots = 8x8 grid
	//console.log(queue);
	//
	//Instead of letting it go to what it thinks is center, offset the starting position be center of the very first one
	//
	// Pick the first sample at center of width/height grid
	//console.log('Picking 1st Sample');


	// Pick a random existing sample from the queue.
	pick: while (queue.length) {
		//console.log('Picking...');
		//const i = Math.random() * queue.length | 0;
		const i = Math.trunc(Math.random() * queue.length);
		const parent = queue[i];
		const seed = Math.random();
		const epsilon = 0.0000001;
		//console.log(i);
		//console.log(parent);
		//console.log(seed);
		//console.log(epsilon);

		// Make a new candidate.
		//console.log('Make New Candidate');
		for (let j = 0; j < k; ++j) {
			const a = 2 * Math.PI * (seed + 1.0*j/k);
			//Depending on the amount of tries allowed
			//start from 0degrees and move radius to check
			//as the loop continues/fails, keep moving counter-clockwise in equal parts depending on the current attempt number out of max
			//checking each new direction if that space is available
			const r = radius + epsilon;
			const x = parent[0] + r * Math.cos(a);
			const y = parent[1] + r * Math.sin(a);
			//console.log('Candidate Loop...');
			//console.log(a);
			//console.log(r);
			//console.log(x);
			//console.log(y);

			// Accept candidates that are inside the allowed extent
			// and farther than 2 * radius to all existing samples.
			//area o0 4
			//space i0 0.5
			if (space <= x && x < area && space <= y && y < area && far(x, y)) {
				//console.log('Candidate Accepted');
				yield {add: sample(x, y), parent};
				//console.log('Pick Again');
				continue pick;
			}
			//console.log('Candidate Rejected');
		}

		// If none of k candidates were accepted, remove it from the queue.
		//console.log('Max Attempts Hit. Clear Parent');
		const r = queue.pop();
		if (i < queue.length) queue[i] = r;
			yield {remove: parent};
	}

	function far(x, y) {
		//const i = x / cellSize | 0;
		const i = Math.trunc(x / cellSize);
		//const j = y / cellSize | 0;
		const j = Math.trunc(y / cellSize);
		// | is bitwise OR operator
		//returns a 1 in each bit position for which the corresponding bits of either or both operands are 1s. 
		//const a = 5;        // 00000000000000000000000000000101
		//const b = 3;        // 00000000000000000000000000000011
		//console.log(a | b); // 00000000000000000000000000000111
		// Expected output: 7
		//Bitwise ORing any number x with 0 returns x converted to a 32-bit integer. Do not use | 0 to truncate numbers to integers; use Math.trunc() instead.
		const i0 = Math.max(i - 2, 0);
		const j0 = Math.max(j - 2, 0);
		const i1 = Math.min(i + 3, gridWidth);
		const j1 = Math.min(j + 3, gridHeight);
		//Only check surrounding squares of a 2x2 grid from candidate xy center

		//console.log('Checking Distance');
		//console.log(i);
		//console.log(j);
		//console.log(i0);
		//console.log(j0);
		//console.log(i1);
		//console.log(j1);

		//Loop through grid
		for (let j = j0; j < j1; ++j) {
			const o = j * gridWidth;
			for (let i = i0; i < i1; ++i) {
				const s = grid[o + i];
				//only does a check if something on the grid in that position exists
				if (s) {
					//get the difference in grid stored xy with the imported
					const dx = s[0] - x;
					const dy = s[1] - y;
					//pythagorean check for distance. Needs to be at least 2xRadius away from current check point
					if (dx * dx + dy * dy < radius2) return false;
				}
			}
		}
		return true;
	}

	//Sample
	function sample(x, y, parent) {
		//const s = grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [x, y];
		const s = grid[gridWidth * (Math.trunc(y / cellSize)) + (Math.trunc(x / cellSize))] = [x, y];
		queue.push(s);
		//console.log('Sample Added!');
		//console.log(s);
		//console.log(queue);
		if(ring === 'ring5'){
			ring5.push(s);
			//console.log(ring5)
		} else if(ring === 'ring4'){
			ring4.push(s);
		} else if(ring === 'ring3'){
			ring3.push(s);
		} else if(ring === 'ring2'){
			ring2.push(s);
		} else if(ring === 'ring1'){
			ring1.push(s);
		} else if(ring === 'ring0'){
			ring0.push(s);
		}
		return s;
	}

}

	let gridSample = poissonDiscSampler(area,area,space,center);

	function next(){
		//next yielded spot and update done var
		gridSample.done = gridSample.next().done;
		if(gridSample.done){
			//console.log('All Done!');
			//console.log(grid)
			//console.log(grid.length)
		} else {
			//console.log('Running...');
			next();
		}
	}
	next();
	let goodGrid = [];
	for(let each in grid){
		if(grid[each]){
			goodGrid.push(grid[each]);
		}
	}

	//console.log(goodGrid);
	return goodGrid;
}

	const genCores = () => {

		//loop through each size
		for(let type in sizes){
			//sizes[type]//tiny,small,med,large,huge
			//let size = multiGen[sizes[type]];//multiGen.tiny object, multiGen.small object
			let size = Object.assign({}, multiGen[sizes[type]]);
			//console.log(size);
			//Inside of single data object of a Size
			//Tiny

			//using max amount dived by amount of objs provided, loop through that many for each of those obj

			//using obj data provided, randomize max amount of potential data objects to be spawned


			//loop through each different object provided
			for(let each in size.objs){
				let ogData = Object.assign({}, size.objs[each]);
				//console.log(ogData);
				let objData = JSON.parse(JSON.stringify(size.objs[each]));
				let posX;
				let posY;
				let posZ;
				let positionVec3;
				let scaleX;
				let scaleY;
				let scaleZ;
				let rotX;
				let rotY;
				let rotZ;
				let color;

//instanced-mesh="positioning: local"
//instanced-mesh-member="mesh:#instanceTest1"

				//Loop through an even amount for each obj based on max
				for(let a = 0; a < size.max/size.objs.length; a++){
					objData.id = ogData.id + a;
					/* Instanced Mesh struggles with GLTF layers
<script src="https://cdn.jsdelivr.net/gh/diarmidmackenzie/instanced-mesh@v0.5.0/src/instanced-mesh.min.js"></script>
					if(a === 0){
						objData.components['instanced-mesh'] = {positioning: 'world'};
					} else {
						//Remove gltf component and add instanced mesh
						delete objData.components['gltf-model'];
						objData.components['instanced-mesh-member'] = {mesh: '#'+ogData.id+0};
					}*/
					//Color
					if(size.ranColor){
						color = auxl.colorTheoryGen().base;
						objData.material.color = color;
						if(objData.material.emissive){
							objData.material.emissive = color;
						}
					}
					//Texture
					if(size.ranTexture){
						objData.material.src = auxl.patterns[Math.floor(Math.random()*auxl.patterns.length)];
					}
					//Rotation
					rotX = ogData.rotation.x;
					rotY = ogData.rotation.y;
					rotZ = ogData.rotation.z;
					if(size.ranRotX){
						rotX += Math.random() * 360;
					}
					if(size.ranRotY){
						rotY += Math.random() * 360;
					}
					if(size.ranRotZ){
						rotZ += Math.random() * 360;
					}
					objData.rotation = new THREE.Vector3(rotX, rotY, rotZ);

					//Scale
					scaleX = ogData.scale.x;
					scaleY = ogData.scale.y;
					scaleZ = ogData.scale.z;
					if(size.ranScaleX){
						scaleX += Math.random() * size.scaleFlex;
					}
					if(size.ranScaleY){
						scaleY += Math.random() * size.scaleFlex;
					}
					if(size.ranScaleZ){
						scaleZ += Math.random() * size.scaleFlex;
					}
					objData.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);

					//Position
					posY = ogData.position.y;
					if(size.ranYPos){
						posY += Math.random() * size.yPosFlex;
					}
					if(size.rings === 0){
						if(ring0Current < ring0.length){
							posX = ring0[ring0Current][0];
							posZ = ring0[ring0Current][1];
							ring0Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 0 Pos');
							posX = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
							posZ = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
						}
					} else if(size.rings === 1){
						if(ring1Current < ring1.length){
							posX = ring1[ring1Current][0];
							posZ = ring1[ring1Current][1];
							ring1Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 1 Pos');
							posX = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
							posZ = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
						}
					} else if(size.rings === 2){
						if(ring2Current < ring2.length){
							posX = ring2[ring2Current][0];
							posZ = ring2[ring2Current][1];
							ring2Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 2 Pos');
							posX = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
							posZ = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
						}
					} else if(size.rings === 3){
						if(ring3Current < ring3.length){
							posX = ring3[ring3Current][0];
							posZ = ring3[ring3Current][1];
							ring3Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 3 Pos');
							posX = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
							posZ = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
						}
					} else if(size.rings === 4){
						if(ring4Current < ring4.length){
							posX = ring4[ring4Current][0];
							posZ = ring4[ring4Current][1];
							ring4Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 4 Pos');
							posX = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
							posZ = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
						}
					} else if(size.rings === 5){
						if(ring5Current < ring5.length){
							posX = ring5[ring5Current][0];
							posZ = ring5[ring5Current][1];
							ring5Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 5 Pos');
							posX = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
							posZ = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
						}
					} 



					objData.position = new THREE.Vector3(posX, posY, posZ);
					//console.log(objData.position);
					//Add randomized Core to All
					multiGen.assets[sizes[type]].push(auxl.Core(objData));
				}

			}
		}
	}
	genCores();
	const SpawnMultiAsset = () => {
		//console.log(multiGen.assets)
		//loop throusgh each size
		for(let type in sizes){
			//sizes[type]//tiny,small,med,large,huge
			//let size = multiGen[sizes[type]];//multiGen.tiny object, multiGen.small object
			let size = multiGen.assets[sizes[type]];
			//console.log(size);
			for(let each in size){
				size[each].SpawnCore(false, false, true);
			}
		}
	}

	const DespawnMultiAsset = () => {
		for(let type in sizes){
			//sizes[type]//tiny,small,med,large,huge
			//let size = multiGen[sizes[type]];//multiGen.tiny object, multiGen.small object
			let size = multiGen.assets[sizes[type]];
			//console.log(size);
			for(let each in size){
				size[each].DespawnCore(false, false, true);
			}
		}
		RemoveFromTracker(multiGen.id);
	}

	return {multiGen, SpawnMultiAsset, DespawnMultiAsset,}

}

//
//Teleport
this.Teleport = (id, locations) => {

	let teleport = {};
	teleport.id = id;
	teleport.all = [];
	let teleportLayer;
	let teleportLayerData;
	let teleportParent;
	let teleportParentId = '';
	let teleportChild0;//Confirm
	let teleportChild0Id = '';
	let teleportChild1;//Cancel
	let teleportChild1Id = '';
	let spotColor;

	//ToDo
	//Add an additional style, a light beam cylinder

	for(let spot in locations){
		spotColor = auxl.colorTheoryGen().base;
		teleportParentId = 'teleport' + spot + 'Parent';
		auxl.teleportParentData.id = teleportParentId;
		auxl.teleportParentData.position = locations[spot];
		teleportParent = auxl.Core(auxl.teleportParentData);
		teleportChild0Id = 'teleport' + spot + 'Confirm';
		auxl.teleportConfirmData.id = teleportChild0Id;
		auxl.teleportConfirmData.material.color = spotColor;
		auxl.teleportConfirmData.material.emissive = spotColor;
		teleportChild0 = auxl.Core(auxl.teleportConfirmData);
		teleportChild1Id = 'teleport' + spot + 'Cancel';
		auxl.teleportCancelData.id = teleportChild1Id;
		auxl.teleportCancelData.material.color = spotColor.compl;
		auxl.teleportCancelData.material.emissive = spotColor.compl;
		teleportChild1 = auxl.Core(auxl.teleportCancelData);
		teleportLayerData = {
			parent: {core: teleportParent},
			child0: {core: teleportChild0},
			child1: {core: teleportChild1},
		}
		teleport.all[spot] = auxl.Layer('teleport'+spot, teleportLayerData);
	}

	const SpawnTeleport = () => {
		for(let each in teleport.all){
			teleport.all[each].SpawnLayer(true);
		}
	}

	const DespawnTeleport = () => {
		for(let each in teleport.all){
			teleport.all[each].DespawnLayer(true);
		}
		RemoveFromTracker(teleport.id);
	}

	return {teleport, SpawnTeleport, DespawnTeleport};
}


//
//Memory Mini Game
this.MemoryGame = (id, data) => {

	//Game Objects
	let memory = {};
	memory.id = id;
	//Layered Object Generation
	let layerData = {}
	let memoryNullParentData = JSON.parse(JSON.stringify(auxl.nullParentData));
	memoryNullParentData.id = 'memoryParent';
	memoryNullParentData.position = new THREE.Vector3(0,1,-2);
	let memoryNullParent = auxl.Core(memoryNullParentData);
	layerData['parent'] = {};
	layerData['parent'].core = memoryNullParent;
	let memoryObjData = {};
	let memoryCores = {};
	for(let each in data){
		memoryObjData = data[each];
		memoryObjData.id = 'memory' + each;
		//memoryObjData.material = materials[each];
		memoryCores[each] = auxl.Core(memoryObjData);
		layerData['child'+each] = {};
		layerData['child'+each].core = memoryCores[each];
	}
	memory.layer = auxl.Layer('memory',layerData);

	//UI
	//Game Status
	auxl.memoryUIData.text = {value:'High Score : 0 | Game Ready', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	auxl.memoryUIData.position = new THREE.Vector3(0,2.6,-2);
	auxl.memoryUIData.id = 'memoryUI1';
	let memoryUI1 =  auxl.Core(auxl.memoryUIData);

	//Sequence Status
	auxl.memoryUIData.text = {value:'Sequence : *', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	auxl.memoryUIData.position = new THREE.Vector3(0,0.35,-2);
	auxl.memoryUIData.id = 'memoryUI2';
	let memoryUI2 =  auxl.Core(auxl.memoryUIData);

	//Game Support
	let playSequenceInterval;
	let roundCompleteTimeout1;
	let roundCompleteTimeout2;
	let gameOverTimeout1;
	let gameOverTimeout2;
	let allSequence = [];
	let playerSequence = [];
	let currInSequence = 0;
	let currMaxSequence = 1;
	let sequenceRef = '*';
	let sequenceTempArray = [];
	let currentScore = 0;
	let highScore = 0;
	let sequenceChunk = 5;
	let pauseClick = true;
	let gameStarted = false;

	const AddSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().addEventListener('click', memoryClick);
		}
	}

	const RemoveSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().removeEventListener('click', memoryClick);
		}
	}

	const SpawnMemGame = () => {
		memory.layer.SpawnLayer(true);
		memoryUI1.SpawnCore(false, false, true);
		memoryUI2.SpawnCore(false, false, true);
		AddSequenceListeners();
		GameSpawnMenu();
	}

	const DespawnMemGame = () => {
		RemoveSequenceListeners();
		memory.gameMenu.DespawnMenu()
		memory.layer.DespawnLayer(true);
		memoryUI1.DespawnCore(false, false, true);
		memoryUI2.DespawnCore(false, false, true);
		RemoveFromTracker(memory.id);
	}

	const StartGame = () => {
		GenRanSequence();
		gameStarted = true;
		memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Game Started'}});
		memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		PlaySequence();
	}

	const GenRanSequence = () => {
		for(let a = 0; a < sequenceChunk; a++){
			allSequence.push(Math.floor(Math.random()*4))
		}
		console.log(allSequence);
	}

	const PlaySequence = () => {
		console.log('Playing Sequence');
		pauseClick = true;
		if(currMaxSequence >= allSequence.length){
			GenRanSequence();
		}
		let current = 0;

		playSequenceInterval = setInterval(function() {
			memoryCores[allSequence[current]].EmitEvent('select');
			current++;
			if(current >= currMaxSequence){
				pauseClick = false;
				clearInterval(playSequenceInterval);
			}
		}, 750); //Interval
	}

	const CheckSequence = () => {
		console.log(allSequence);
		console.log(playerSequence);
		console.log(currInSequence);
		console.log(playerSequence[currInSequence]);
		console.log(allSequence[currInSequence]);
		if(playerSequence[currInSequence] === allSequence[currInSequence]){
			console.log('Match');
			currInSequence++;
			//push selection to front of sequenceRef and remove the last item
			sequenceTempArray.unshift('X');
			sequenceTempArray.pop();
			sequenceRef = sequenceTempArray.join("");
			memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		} else {
			console.log('Game Over');
			gameStarted = false;
			if(currMaxSequence-1 > highScore){
				highScore = currMaxSequence-1;
				console.log('New High Score : ' + highScore);
			} else {
				//let currentScore = currMaxSequence-1;
				console.log('Sequence Score : ' + currentScore);
			}
			gameOverTimeout1 = setTimeout(function () {
				gameOverAnim();
				gameOverTimeout2 = setTimeout(function () {
					ResetGame();
					clearTimeout(gameOverTimeout2);
				}, 2000);
			}, 250);

		}
		if(currInSequence >= currMaxSequence){
			console.log('Correct Sequence');
			currInSequence = 0;
			currMaxSequence++;
			currentScore++;
			memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Current : ' + currentScore}});
			sequenceTempArray = [];
			for(let a = 1; a <= currMaxSequence; a++){
				sequenceTempArray.push('*');
			}
			sequenceRef = sequenceTempArray.join("");
			memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
			playerSequence = [];
			roundCompleteTimeout1 = setTimeout(function () {
				roundCompleteAnim();
				roundCompleteTimeout2 = setTimeout(function () {
					PlaySequence();
					clearTimeout(roundCompleteTimeout2);
				}, 1500);
				clearTimeout(roundCompleteTimeout1);
			}, 250);


		}
	}

	const ResetGame = () => {
		clearInterval(playSequenceInterval);
		clearTimeout(roundCompleteTimeout1);
		clearTimeout(roundCompleteTimeout2);
		currentScore = 0;
		currInSequence = 0;
		currMaxSequence = 1;
		allSequence = [];
		playerSequence = [];
		sequenceTempArray = [];
		pauseClick = true;
		gameStarted = false;
		memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Game Over'}});
	}

	//listen for first click to start the countdown timer based on how long current sequence is and a timer for in-between single clicks to timeout as well
	function memoryClick(){
		if(pauseClick){}else{
			console.log('Memory Click')
			console.log(this.id)
			let selection;
			if(this.id === 'memory0'){
				selection = 0;
			} else if(this.id === 'memory1'){
				selection = 1;
			} else if(this.id === 'memory2'){
				selection = 2;
			} else if(this.id === 'memory3'){
				selection = 3;
			}
			playerSequence.push(selection);
			CheckSequence();
		}
	}

	function roundCompleteAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('roundComplete');
		}
	}

	function gameOverAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('gameOver');
		}
	}

	const GameSpawnMenu = () => {

		memory.GameMenuData = {
			id: 'memoryGameMenu',
			prompt: 'Memory Game',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: 'memory',
			method: 'GameMenuClick',
			pos: new THREE.Vector3(0.75,1.55,-2),
		}
		memory.GameMenuData.options['option'+0] = 'Play Game';
		memory.GameMenuData.actions['action'+0] = 'playGame';
		memory.GameMenuData.options['option'+1] = 'Reset Game';
		memory.GameMenuData.actions['action'+1] = 'resetGame';

		memory.gameMenu = auxl.Menu(memory.GameMenuData);
		memory.gameMenu.SpawnMenu();
	}

	const GameMenuClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);
		if(result === 'playGame'){
			if(gameStarted){}else{
				StartGame();
			}
		} else if(result === 'resetGame'){
			if(gameStarted){
				ResetGame();
			}
		}
	}

	return{memory, SpawnMemGame, DespawnMemGame, GameMenuClick};
}

//
//Image Swapper
this.ImageSwapper = (id,mainData,buttonData,...materials) => {

	let imageSwapper = {};
	imageSwapper.id = id;
	let imageSwapperCore;
	imageSwapper.thumbnailCores = [];
	let thumbnailPos = new THREE.Vector3(0,-0.3,0.05);
	//let startPos = (mainData.geometry.width/2)/materials.length;
	//let movePos = mainData.geometry.width/materials.length;

	//Layer
	imageSwapper.layerData = {}
	for(let mat in materials){
		if(mat === '0'){
			mainData.material = materials[mat];
			imageSwapperCore = auxl.Core(mainData);
			imageSwapper.layerData['parent'] = {};
			imageSwapper.layerData['parent'].core = imageSwapperCore;
		} else {
			buttonData.id = 'thumbnail' + mat;
			buttonData.material = materials[mat];
			if(materials.length === 3){
				if(mat === '1'){
					thumbnailPos.x = -0.25;
				} else if(mat === '2'){
					thumbnailPos.x = 0.25;
				}
			} else if(materials.length === 4){
				if(mat === '1'){
					thumbnailPos.x = -0.33;
				} else if(mat === '2'){
					thumbnailPos.x = 0;
				} else if(mat === '3'){
					thumbnailPos.x = 0.33;
				}
			} else if(materials.length === 5){
				if(mat === '1'){
					thumbnailPos.x = -0.375;
				} else if(mat === '2'){
					thumbnailPos.x = -0.125;
				} else if(mat === '3'){
					thumbnailPos.x = 0.125;
				} else if(mat === '4'){
					thumbnailPos.x = 0.375;
				}
			}
			//thumbnailPos;
			buttonData.position = thumbnailPos;
			imageSwapper.thumbnailCores[mat] = auxl.Core(buttonData);
			imageSwapper.layerData['child'+mat] = {};
			imageSwapper.layerData['child'+mat].core = imageSwapper.thumbnailCores[mat];
		}
	}
	imageSwapper.layer = auxl.Layer('imageSwapper',imageSwapper.layerData);

	const Click = (el) => {
		//Swap Material Sources with Parent
		let selectedMat = el.getAttribute('material').src;
		let replacedMat = JSON.parse(JSON.stringify(el.parentNode.getAttribute('material').src));

		el.parentNode.setAttribute('material',{src: selectedMat})
		el.setAttribute('material',{src: replacedMat})
	}

	const SpawnImgSwap = () => {
		imageSwapper.layer.SpawnLayer(true);
		//AddToImageSwapperSceneTracker();
	}

	const DespawnImgSwap = () => {
		imageSwapper.layer.DespawnLayer(true);
		RemoveFromTracker(imageSwapper.id);
	}

	//Add autoplay and pause on hovering
	//Controls either left/right or thumbnails for each
	return {imageSwapper, Click, SpawnImgSwap, DespawnImgSwap};
}

//
//ImageCarousel
this.ImageCarousel = (carouselData) => {
//calculate the amount of framesPerPage to do display
//Add 180 view non-movement functions
//get images to play through carousel.images pages

//Changing between Forward & Reverse either way messes up which frames should be updated

//Data
let imageCarousel = Object.assign({}, carouselData);
imageCarousel.frames = 8;//temp, will be imported
let playInterval;
let updateTimeout;
let scaleTimeout;
imageCarousel.framesPerPage = 8;
currentImageForward = -1;
currentImageBackward = imageCarousel.images.length - imageCarousel.framesPerPage;
let frameRotationEach = 360/imageCarousel.framesPerPage;
let frameRotation = 0;
currentRotation = -1;

//Prep Movement Flags
let notMoving = true;
let notPlaying = true;
let autoRotate = 0;
let loadingPage = false;
let animating = false;
let scale = 0;
let info = false;

//Frame Templates

//Art Frame Parent
let artFrameParentData = {
data: 'artFrameParentData',
id:'artFrameParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Art Frame
let artFrameData = {
data: 'artFrameData',
id:'artFrame',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.01, width: 4.4, height: 2.55},
material: {shader: "flat", color: "#55a5be", opacity: 1, alphaTest: 0.1},
position: new THREE.Vector3(0,1.75,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
scale0:{property: 'scale', from: '1 1 1', to: '2 2 2', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to0'},
position0:{property: 'position', from: '0 1.75 -6', to: '0 3.5 -12', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to0'},
scale1:{property: 'scale', from: '2 2 2', to: '1 1 1', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to1'},
position1:{property: 'position', from: '0 3.5 -12', to: '0 1.75 -6', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to1'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Art Frame
let artFrameTextData = {
data: 'artFrameTextData',
id:'artFrameText',
sources: false,
text: {value:'Art Frame Text', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'},
geometry: false,
material: false,
position: new THREE.Vector3(0,-1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//carousel Layer

//All Frame Parent
artFrameParentData.id = 'artFrameParentAll';
artFrameParentData.rotation = new THREE.Vector3(0,1,0);
let artFrameParentAll = auxl.Core(artFrameParentData);

let artFrameAllLayerData = {
	parent: {core: artFrameParentAll},
};

let parentId = 'artFrameParent';
let parentFrameCores = [];
let frameId = 'artFrame';
let imageFrameCores = [];
let textId = 'artFrameText';
let textFrameCores = [];

for(let a=0; a < imageCarousel.frames; a++){

	//Temp
	if(a === 0){
		frameRotation = -45;
	} else if(a === 1){
		frameRotation = 0;
	} else if(a === 2){
		frameRotation = -315;
	} else if(a === 3){
		frameRotation = -270;
	} else if(a === 4){
		frameRotation = -225;
	} else if(a === 5){
		frameRotation = -180;
	} else if(a === 6){
		frameRotation = -135;
	} else if(a === 7){
		frameRotation = -90;
	}

	//Parent
	parentId = 'artFrameParent' + a;
	let parentRotation = new THREE.Vector3(0,0,0);
	parentRotation.y = frameRotation;
	artFrameParentData.id = parentId;
	artFrameParentData.rotation = parentRotation;
	parentFrameCores[a] = auxl.Core(artFrameParentData);
	//Frame
	frameId = 'artFrame' + a;
	artFrameData.id = frameId;
	imageFrameCores[a] = auxl.Core(artFrameData);
	//Text
	textId = 'artFrameText' + a;
	artFrameTextData.id = textId;
	textFrameCores[a] = auxl.Core(artFrameTextData);
	//Layer
	artFrameAllLayerData['child'+a] = {
		parent: {core: parentFrameCores[a]}, 
		child0: {
			parent: {core: imageFrameCores[a]}, 
			child0: {core: textFrameCores[a]}, 
		},
	};
}
let artFrameAllLayer = auxl.Layer('artFrameAllLayer',artFrameAllLayerData);

//Button Templates

let mainColor = auxl.colorTheoryGen('#6ab0db');

//Button Parent
let buttonParentData = {
data: 'Button Parent',
id:'buttonParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,80,0),
scale: new THREE.Vector3(1,1,1),
animations:{
scaleclick:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};

//Button Obj
let buttonObjData = {
data: 'Button Obj',
id:'buttonObj',
sources: false,
text: false,
geometry: false,
material: {shader: "flat", color: mainColor.base, opacity: 1},
position: new THREE.Vector3(0,0.4,-2.5),
rotation: new THREE.Vector3(-30,0,0),
scale: new THREE.Vector3(0.1,0.1,0.1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//Button Border
let buttonBorderData = {
data: 'Button Border',
id:'buttonBorder',
sources: false,
text: false,
geometry: false,
material: {shader: "flat", color: mainColor.splitCompl[0], opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['obj-model']:{obj: './assets/3d/buttons/border.obj'},
//['model-loaded']:null,
},
};

//Button Click Background
let buttonClickData = {
data: 'Button Click Background',
id:'buttonClick',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 2, segments: 12},
material: {shader: "flat", color: mainColor.splitCompl[1], opacity: 0.5, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};

//Button Click Background
let buttonTextData = {
data: 'Button Text',
id:'buttonText',
sources: false,
text: {value:'Button', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'},
geometry: false,
material: false,
position: new THREE.Vector3(0,-2.75,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};

//Button Layers

//Backward
buttonParentData.id = 'buttonBackwardParent';
buttonParentData.rotation = new THREE.Vector3(0,22.5,0);
let buttonBackwardParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/backward.obj'}};
buttonObjData.id = 'buttonBackward';
buttonBorderData.id = 'buttonBackwardBorder';
buttonClickData.id = 'buttonBackwardClick';
buttonTextData.id = 'buttonBackwardText';
buttonTextData.text.value = 'Back';
let buttonBackward = auxl.Core(buttonObjData);
let buttonBackwardBorder = auxl.Core(buttonBorderData);
let buttonBackwardClick = auxl.Core(buttonClickData);
let buttonBackwardText = auxl.Core(buttonTextData);
//Forward
buttonParentData.id = 'buttonForwardParent';
buttonParentData.rotation = new THREE.Vector3(0,-22.5,0);
let buttonForwardParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/forward.obj'}};
buttonObjData.id = 'buttonForward';
buttonBorderData.id = 'buttonForwardBorder';
buttonClickData.id = 'buttonForwardClick';
buttonTextData.id = 'buttonForwardText';
buttonTextData.text.value = 'Forward';
let buttonForward = auxl.Core(buttonObjData);
let buttonForwardBorder = auxl.Core(buttonBorderData);
let buttonForwardClick = auxl.Core(buttonClickData);
let buttonForwardText = auxl.Core(buttonTextData);
//Left Skip
buttonParentData.id = 'buttonLeftSkipParent';
buttonParentData.rotation = new THREE.Vector3(0,37.5,0);
let buttonLeftSkipParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/left_skip.obj'}};
buttonObjData.id = 'buttonLeftSkip';
buttonBorderData.id = 'buttonLeftSkipBorder';
buttonClickData.id = 'buttonLeftSkipClick';
buttonTextData.id = 'buttonLeftSkipText';
buttonTextData.text.value = 'Back Page';
let buttonLeftSkip = auxl.Core(buttonObjData);
let buttonLeftSkipBorder = auxl.Core(buttonBorderData);
let buttonLeftSkipClick = auxl.Core(buttonClickData);
let buttonLeftSkipText = auxl.Core(buttonTextData);
//Play
buttonParentData.id = 'buttonPlayParent';
buttonParentData.rotation = new THREE.Vector3(0,-7.5,0);
let buttonPlayParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/play.obj'}};
buttonObjData.id = 'buttonPlay';
buttonBorderData.id = 'buttonPlayBorder';
buttonClickData.id = 'buttonPlayClick';
buttonTextData.id = 'buttonPlayText';
buttonTextData.text.value = 'Play';
let buttonPlay = auxl.Core(buttonObjData);
let buttonPlayBorder = auxl.Core(buttonBorderData);
let buttonPlayClick = auxl.Core(buttonClickData);
let buttonPlayText = auxl.Core(buttonTextData);
//Right Skip
buttonParentData.id = 'buttonRightSkipParent';
buttonParentData.rotation = new THREE.Vector3(0,-37.5,0);
let buttonRightSkipParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/right_skip.obj'}};
buttonObjData.id = 'buttonRightSkip';
buttonBorderData.id = 'buttonRightSkipBorder';
buttonClickData.id = 'buttonRightSkipClick';
buttonTextData.id = 'buttonRightSkipText';
buttonTextData.text.value = 'Next Page';
let buttonRightSkip = auxl.Core(buttonObjData);
let buttonRightSkipBorder = auxl.Core(buttonBorderData);
let buttonRightSkipClick = auxl.Core(buttonClickData);
let buttonRightSkipText = auxl.Core(buttonTextData);
//Settings
buttonParentData.id = 'buttonSettingsParent';
buttonParentData.rotation = new THREE.Vector3(0,-52.5,0);
let buttonSettingsParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/settings.obj'}};
buttonObjData.id = 'buttonSettings';
buttonBorderData.id = 'buttonSettingsBorder';
buttonClickData.id = 'buttonSettingsClick';
buttonTextData.id = 'buttonSettingsText';
buttonTextData.text.value = 'Scale';
let buttonSettings = auxl.Core(buttonObjData);
let buttonSettingsBorder = auxl.Core(buttonBorderData);
let buttonSettingsClick = auxl.Core(buttonClickData);
let buttonSettingsText = auxl.Core(buttonTextData);
//Stop
buttonParentData.id = 'buttonStopParent';
buttonParentData.rotation = new THREE.Vector3(0,7.5,0);
buttonStopParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/stop.obj'}};
buttonObjData.id = 'buttonStop';
buttonBorderData.id = 'buttonStopBorder';
buttonClickData.id = 'buttonStopClick';
buttonTextData.id = 'buttonStopText';
buttonTextData.text.value = 'Info';
let buttonStop = auxl.Core(buttonObjData);
let buttonStopBorder = auxl.Core(buttonBorderData);
let buttonStopClick = auxl.Core(buttonClickData);
let buttonStopText = auxl.Core(buttonTextData);
//Hashtag
buttonParentData.id = 'buttonHashtagParent';
buttonParentData.rotation = new THREE.Vector3(0,52.5,0);
let buttonHashtagParent = auxl.Core(buttonParentData);
buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/hashtag.obj'}};
buttonObjData.id = 'buttonHashtag';
buttonBorderData.id = 'buttonHashtagBorder';
buttonClickData.id = 'buttonHashtagClick';
buttonTextData.id = 'buttonHashtagText';
buttonTextData.text.value = 'Random Page';
let buttonHashtag = auxl.Core(buttonObjData);
let buttonHashtagBorder = auxl.Core(buttonBorderData);
let buttonHashtagClick = auxl.Core(buttonClickData);
let buttonHashtagText = auxl.Core(buttonTextData);

//Button Backward Layer
let buttonBackwardLayerData = {
parent: {core: buttonBackwardParent}, 
child0: {
	parent: {core: buttonBackward}, 
	child0: {core: buttonBackwardBorder},
	child1: {core: buttonBackwardClick},
	child2: {core: buttonBackwardText},
},
};
let buttonBackwardLayer = auxl.Layer('buttonBackwardLayer',buttonBackwardLayerData);

//Button Hashtag Layer
let buttonHashtagLayerData = {
parent: {core: buttonHashtagParent}, 
child0: {
	parent: {core: buttonHashtag}, 
	child0: {core: buttonHashtagBorder},
	child1: {core: buttonHashtagClick},
	child2: {core: buttonHashtagText},
},
};
let buttonHashtagLayer = auxl.Layer('buttonHashtagLayer',buttonHashtagLayerData);

//Button Forward Layer
let buttonForwardLayerData = {
parent: {core: buttonForwardParent}, 
child0: {
	parent: {core: buttonForward}, 
	child0: {core: buttonForwardBorder},
	child1: {core: buttonForwardClick},
	child2: {core: buttonForwardText},
},
};
let buttonForwardLayer = auxl.Layer('buttonForwardLayer',buttonForwardLayerData);

//Button Left Skip Layer
let buttonLeftSkipLayerData = {
parent: {core: buttonLeftSkipParent}, 
child0: {
	parent: {core: buttonLeftSkip}, 
	child0: {core: buttonLeftSkipBorder},
	child1: {core: buttonLeftSkipClick},
	child2: {core: buttonLeftSkipText},
},
};
let buttonLeftSkipLayer = auxl.Layer('buttonLeftSkipLayer',buttonLeftSkipLayerData);

//Button Play Layer
let buttonPlayLayerData = {
parent: {core: buttonPlayParent}, 
child0: {
	parent: {core: buttonPlay}, 
	child0: {core: buttonPlayBorder},
	child1: {core: buttonPlayClick},
	child2: {core: buttonPlayText},
},
};
let buttonPlayLayer = auxl.Layer('buttonPlayLayer',buttonPlayLayerData);

//Button Right Skip Layer
let buttonRightSkipLayerData = {
parent: {core: buttonRightSkipParent}, 
child0: {
	parent: {core: buttonRightSkip}, 
	child0: {core: buttonRightSkipBorder},
	child1: {core: buttonRightSkipClick},
	child2: {core: buttonRightSkipText},
},
};
let buttonRightSkipLayer = auxl.Layer('buttonRightSkipLayer',buttonRightSkipLayerData);

//Button Settings Layer
let buttonSettingsLayerData = {
parent: {core: buttonSettingsParent}, 
child0: {
	parent: {core: buttonSettings}, 
	child0: {core: buttonSettingsBorder},
	child1: {core: buttonSettingsClick},
	child2: {core: buttonSettingsText},
},
};
let buttonSettingsLayer = auxl.Layer('buttonSettingsLayer',buttonSettingsLayerData);

//Button Stop Layer
let buttonStopLayerData = {
parent: {core: buttonStopParent}, 
child0: {
	parent: {core: buttonStop}, 
	child0: {core: buttonStopBorder},
	child1: {core: buttonStopClick},
	child2: {core: buttonStopText},
},
};
let buttonStopLayer = auxl.Layer('buttonStopLayer',buttonStopLayerData);

//Animations

//Rotate 45
let anim45Data = {
	name: 'anim45',
	property: 'object3D.rotation.y',
	from: '0',
	to: '45', 
	dur: 1000, 
	delay: 0, 
	loop: 'false', 
	dir: 'normal', 
	easing: 'easeInOutSine', 
	elasticity: 400, 
	autoplay: true, 
	enabled: true,
};
//Rotate 45 from Misc
let anim45MiscData = {
	name: 'anim45misc',
	property: 'object3D.rotation.y',
	from: '0',
	to: '1', 
	dur: 500, 
	delay: 0, 
	loop: 'false', 
	dir: 'normal', 
	easing: 'easeInOutSine', 
	elasticity: 400, 
	autoplay: true, 
	enabled: true,
};
//Rotate 90
let anim90Data = {
	name: 'anim90',
	property: 'object3D.rotation.y',
	from: '0',
	to: '90', 
	dur: 2500,
	delay: 0, 
	loop: 'false', 
	dir: 'normal', 
	easing: 'easeInOutSine', 
	elasticity: 400, 
	autoplay: true, 
	enabled: true,
};
//Rotate 360
let anim360Data = {
	name: 'anim360',
	property: 'object3D.rotation.y',
	from: '0',
	to: '360', 
	dur: 120000, 
	delay: 0, 
	loop: 'true', 
	dir: 'normal', 
	easing: 'linear', 
	elasticity: 400, 
	autoplay: false, 
	enabled: true,
	startEvents: 'play',
	pauseEvents: 'pause',
};

	const UpdateFrame = (frame, textValue, imgSrc) => {
		artFrameAllLayerData[frame].child0.parent.core.ChangeSelf({property: 'material', value:{src: imgSrc,shader: "flat", color: "#FFFFFF", opacity: 1}});
		artFrameAllLayerData[frame].child0.child0.core.ChangeSelf({property: 'text', value:{value: textValue, width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'}})
	}

	const Update = (frame, direction) => {
		if(direction === 'forward'){
			currentImageForward++;
			currentImageBackward++;
			if(currentImageForward >= imageCarousel.images.length){
				currentImageForward = 0
			}
			if(currentImageBackward >= imageCarousel.images.length){
				currentImageBackward = 0
			}
			//console.log(direction);
			//console.log(currentImageForward);
			//console.log(currentImageBackward);
			UpdateFrame('child'+frame, imageCarousel.images[currentImageForward].text, imageCarousel.images[currentImageForward].image);
		} else if(direction === 'backward'){
			currentImageBackward--;
			currentImageForward--;
			if(currentImageBackward < 0){
				currentImageBackward = imageCarousel.images.length-1;
			}
			if(currentImageForward < 0){
				currentImageForward = imageCarousel.images.length-1;
			}
			//console.log(direction);
			//console.log(currentImageForward);
			//console.log(currentImageBackward);
			UpdateFrame('child'+frame, imageCarousel.images[currentImageBackward].text, imageCarousel.images[currentImageBackward].image);
		}
	}

	const UpdateAll = (direction) => {
		for(let a = 0; a < imageCarousel.frames; a++){
			Update(a,direction);
		}
		loadingPage = false;
	}

	const UpdateBackTwo = (direction) => {
		//console.log('Current Rotation')
		//console.log(currentRotation);
		let update2 = [];
		let num;
		if(direction === 'forward'){
			if(currentRotation === 0){
				update2 = [0,1];
			} else if(currentRotation === 1){
				update2 = [2,3];
			} else if(currentRotation === 2){
				update2 = [4,5];
			} else if(currentRotation === 3){
				update2 = [6,7];
			}
		} else if(direction === 'backward'){
			if(currentRotation === 0){
				update2 = [6,7];
			} else if(currentRotation === 1){
				update2 = [0,1];
			} else if(currentRotation === 2){
				update2 = [2,3];
			} else if(currentRotation === 3){
				update2 = [4,5];
			}
			update2.reverse();
		}
		//console.log(update2);
		for(let each in update2){
			num = update2[each];
			Update(num,direction);
		}
	}

	const UpdateBack = (direction) => {
		let current = autoRotate;
		let num;
		if(current === 0){
			num = 3;
		} else if(current === 1){
			num = 2;
		} else if(current === 2){
			num = 1;
		} else if(current === 3){
			num = 0;
		} else if(current === 4){
			num = 7;
		} else if(current === 5){
			num = 6;
		} else if(current === 6){
			num = 5;
		} else if(current === 7){
			num = 4;
		}
		Update(num,direction);
	}

	const SpawnImgCarousel = () => {
		artFrameAllLayer.SpawnLayer(true);
		buttonBackwardLayer.SpawnLayer(true);
		buttonHashtagLayer.SpawnLayer(true);
		buttonForwardLayer.SpawnLayer(true);
		buttonLeftSkipLayer.SpawnLayer(true);
		buttonPlayLayer.SpawnLayer(true);
		buttonRightSkipLayer.SpawnLayer(true);
		buttonSettingsLayer.SpawnLayer(true);
		buttonStopLayer.SpawnLayer(true);

		buttonBackwardClick.GetEl().addEventListener('click', Backward);
		buttonForwardClick.GetEl().addEventListener('click', Forward);
		buttonLeftSkipClick.GetEl().addEventListener('click', PrevPage);
		buttonPlayClick.GetEl().addEventListener('click', PlayPause);
		buttonRightSkipClick.GetEl().addEventListener('click', NextPage);
		buttonSettingsClick.GetEl().addEventListener('click', Scale);
		buttonStopClick.GetEl().addEventListener('click', Stop);
		buttonHashtagClick.GetEl().addEventListener('click', RandomPage);

		Init();
		//AddToImageCarouselSceneTracker();
	}

	const DespawnImgCarousel = () => {
		buttonBackwardClick.GetEl().removeEventListener('click', Backward);
		buttonForwardClick.GetEl().removeEventListener('click', Forward);
		buttonLeftSkipClick.GetEl().removeEventListener('click', PrevPage);
		buttonPlayClick.GetEl().removeEventListener('click', PlayPause);
		buttonRightSkipClick.GetEl().removeEventListener('click', NextPage);
		buttonSettingsClick.GetEl().removeEventListener('click', Scale);
		buttonStopClick.GetEl().removeEventListener('click', Stop);
		buttonHashtagClick.GetEl().removeEventListener('click', RandomPage);

		artFrameAllLayer.DespawnLayer(true);
		buttonBackwardLayer.DespawnLayer(true);
		buttonHashtagLayer.DespawnLayer(true);
		buttonForwardLayer.DespawnLayer(true);
		buttonLeftSkipLayer.DespawnLayer(true);
		buttonPlayLayer.DespawnLayer(true);
		buttonRightSkipLayer.DespawnLayer(true);
		buttonSettingsLayer.DespawnLayer(true);
		buttonStopLayer.DespawnLayer(true);

		RemoveFromTracker(imageCarousel.id);
	}

	const Forward = () => {
		if(notMoving){
			notMoving = false;
			//Get current artFrameAllLayer rotation
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY - 90;
			artFrameAllLayer.AnimateParent(anim90Data);
			updateTimeout = setTimeout(() => {
				currentRotation++;
				if(currentRotation > 3){
					currentRotation = 0;
				}
				UpdateBackTwo('forward');
				notMoving = true;
				clearTimeout(updateTimeout);
			}, anim90Data.dur+10); //Delay
		}
	}

	const Backward = () => {
		if(notMoving){
			notMoving = false;
			//Get current artFrameAllLayer rotation
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY + 90;
			artFrameAllLayer.AnimateParent(anim90Data);
			updateTimeout = setTimeout(() => {
				currentRotation--;
				if(currentRotation < 0){
					currentRotation = 3;
				}
				console.log(currentRotation);
				UpdateBackTwo('backward');
				notMoving = true;
				clearTimeout(updateTimeout);
			}, anim90Data.dur+10); //Delay
		}
	}

	const PlayPause = () => {
		if(notPlaying){
			notPlaying = false;
			notMoving = false;
				//currentPage++;
				playInterval = setInterval(() => {
					UpdateBack();
					currentRotation = autoRotate;
					if(currentRotation === 7){
						currentRotation = 0;
						//currentPage++;
					} else {
						currentRotation++;
					}
				}, anim360Data.dur/8); //Interval
			//Get current artFrameAllLayer rotation
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim360Data.from = rotY;
			anim360Data.to = rotY - 360;
			artFrameAllLayer.AnimateParent(anim360Data);
			artFrameAllLayer.layer.all.parent.core.EmitEvent('play');

			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/pause.obj'} });
			buttonPlayText.ChangeSelf({property: 'text', value: {value:'Pause', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		} else {
			notPlaying = true;
			notMoving = true;
			clearInterval(playInterval);
			//Stop current animation
			artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} })
			buttonPlayText.ChangeSelf({property: 'text', value: {value:'Play', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		}
	}

	const Stop = () => {
		if(notPlaying){} else {
			//Stop current animation
			//artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim45MiscData.from = rotY;
			anim45MiscData.to = 1;
			artFrameAllLayer.AnimateParent(anim45MiscData);

			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} });
			notPlaying = true;
			notMoving = true;
		}
	}

	const NextPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('forward');
		}
	}

	const PrevPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('backward');
		}
	}

	const RandomPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			currentImageForward = Math.floor(Math.random()*imageCarousel.images.length);
			UpdateAll('forward');
		}
	}

	const Scale = () => {
		//limit effects to the amount of spawned frames
		if(animating){} else {
			animating = true;
			scaleTimeout = setTimeout(() => {
				animating = false;
				clearTimeout(scaleTimeout);
			}, 2050); //Delay
			if(scale === 0){
				scale = 1;
				artFrameAllLayerData.child0.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child1.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child2.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child3.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child4.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child5.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child6.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child7.child0.parent.core.EmitEvent('to0');
			} else {
				scale = 0;
				artFrameAllLayerData.child0.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child1.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child2.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child3.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child4.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child5.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child6.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child7.child0.parent.core.EmitEvent('to1');
			}
		}
	}

	const Info = () => {
		if(info){
			info = false;
		} else {
			info = true;
		}
	}

	const Init = () => {
		buttonStopClick.EnableDetail({text: imageCarousel.description, position: new THREE.Vector3(0,1.5,-2)});
		UpdateAll('forward');
	}

	return {imageCarousel, SpawnImgCarousel, DespawnImgCarousel, PlayPause};
}


},
checkSceneLoad: function (time, timeDelta) {

	//console.log('loading...');
	//console.log(this.loadingObjects);
	if(this.loadingObjects.size <= 0){
		let sceneTimeout;
		if(this.player.layer.transition === 'blink'){
			this.blink1Screen.EmitEvent('blinkScene2');
			this.blink2Screen.EmitEvent('blinkScene2');
			this.loadingScene = false;
			sceneTimeout = setTimeout(() => {
				this.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
				this.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
				this.player.layer.teleporting = false;
				this.player.EnableClick();
				clearTimeout(sceneTimeout);
			}, 800);
		} else if (this.player.layer.transition === 'fade'){
			this.fadeScreen.EmitEvent('fadeScene2');
			this.loadingScene = false;
			sceneTimeout = setTimeout(() => {
				this.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
				this.player.layer.teleporting = false;
				this.player.EnableClick();
				clearTimeout(sceneTimeout);
			}, 800);
		} else if (this.player.layer.transition === 'sphere'){
			this.sphereScreen.EmitEvent('sphereScene2');
			this.loadingScene = false;
			sceneTimeout = setTimeout(() => {
				this.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
				this.player.layer.teleporting = false;
				this.player.EnableClick();
				clearTimeout(sceneTimeout);
			}, 800);
		} else if (this.player.layer.transition === 'instant'){
			this.loadingScene = false;
			this.player.layer.teleporting = false;
			this.player.EnableClick();
		}
		//console.log('loading done');
		//console.log(this.loadingObjects);
	}

},
tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.
	//Throttle
	if(this.loadingScene){
		this.checkSceneLoadThrottled();
	}

},

});


//auxl-library
//AUXL Library : List of Materials, Geometries, Sounds, Animations, Data, Cores, Layers & Objects
AFRAME.registerComponent('auxl-library', {
	dependencies: ['auxl'],
    //schema: {
        //clickObj: {type: 'string', default: 'auxlObj'}
    //},
    init: function () {
		//console.log('AUXL Library INIT');
		//AUXL System
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

//360 Rotation
auxl.animSpinData = {
	name: 'animspin',
	property: 'object3D.rotation.y', 
	from: '0', 
	to: '360', 
	dur: 20000, 
	delay: 0, 
	loop: 'true', 
	dir: 'normal', 
	easing: 'linear', 
	elasticity: 400, 
	autoplay: true, 
	enabled: true
};
//Animation Test 1
auxl.animTest1Data = {
	name: 'animtest1',
	property: 'object3D.scale.y',
	to: 0.25,
	dur: 3000,
	delay: 0,
	loop: '1',
	dir: 'alternate',
	easing:'easeInOutSine',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
};
//Animation Test 2
auxl.animTest2Data = {
	name: 'animtest2',
	property: 'object3D.scale.x',
	to: 2,
	dur: 3000,
	delay: 0,
	loop: '1',
	dir: 'alternate',
	easing:'easeInOutSine',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
};
//Animation Test 3
auxl.animTest3Data = {
	name: 'animtest3',
	property: 'object3D.scale.z',
	to: 4,
	dur: 3000,
	delay: 0,
	loop: '1',
	dir: 'alternate',
	easing:'easeInOutSine',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
};
//Animation Click
auxl.animClickData = {
	name: 'animClick',
	property: 'scale',
	from: new THREE.Vector3(0, 0 ,0),
	to: new THREE.Vector3(1, 1, 1),
	dur: 1000,
	delay: 0,
	loop: '0',
	dir: 'normal',
	easing:'easeInOutSine',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
};
//Animation Test 4
auxl.animStuffData = {
	name: 'animstuff',
	property: 'object3D.rotation.z',
	from: 0,
	to: 360,
	dur: 5000,
	delay: 0,
	loop: '10',
	dir: 'normal',
	easing:'linear',
	elasticity: 400,
	autoplay: 'true',
	enabled: 'true',
	//startEvents: 'testevent',
};

//
//Player

//Rig
auxl.playerRigData = {
data:'Player Base',
id:'playerRig',
entity: 'preAdded',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,1),
rotation: new THREE.Vector3(0,1,0),
scale: new THREE.Vector3(1,1,1),
animations: {
crouchdownstanding: {property: 'object3D.position.y', from: 0, to: -0.5, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownStanding'},
crouchupstanding: {property: 'object3D.position.y', from: -0.5, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpStanding'},

crouchdownsitting: {property: 'object3D.position.y', from: 0.5, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownSitting'},
crouchupsitting: {property: 'object3D.position.y', from: 0, to: 0.5, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpSitting'},

sit: {property: 'object3D.position.y', from: 0, to: 0.5, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sit'},
stand: {property: 'object3D.position.y', from: 0.5, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'stand'},

},
mixins: false,
classes: ['a-ent','player'],
components: {
['universal-controls']:null,
['locomotion']:{uiid: false, courserid: 'mouseController', movetype: 'desktop'},
//['vr-input-test']:null,
//['desktop-inputs']:null,
//['mobile-inputs']:null,
},};
auxl.playerRig = auxl.Core(auxl.playerRigData);
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
click:{property: 'scale', from: '0.75 0.75 0.75', to: '0.15 0.15 0.15', dur: 100, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
click2:{property: 'scale', from: '0.15 0.15 0.15', to: '0.25 0.25 0.25', dur: 25, delay: 100, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
clickreset:{property: 'scale', from: '0.25 0.25 0.25', to: '0.75 0.75 0.75', dur: 300, delay: 400, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
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
text: {value:'Controller UI', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
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
text: {value:'Controller UI', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
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
//Player Bottom
auxl.playerFloorData = {
data:'Player Floor',
id:'playerFloor',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "flat", color: "#3EB489", opacity: 0.69, side: 'both'},
position: new THREE.Vector3(0,0.05,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player', 'clickable'],
components: false,
};
auxl.playerFloor = auxl.Core(auxl.playerFloorData);
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
//Player Light
auxl.playerPointLightData = {
data:'playerPointLight',
id:'playerPointLight',
sources: false,
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
light: {type: 'point', intensity: 0.075, distance: 5, decay:0.75},
},
};
auxl.playerPointLight = auxl.Core(auxl.playerPointLightData);
//Player Layer
auxl.playerAll = {
parent: {core: auxl.playerRig},
child0: {
	parent: {core: auxl.camera},
	child0: {core: auxl.mouseController},
	child1: {core: auxl.cameraUI},
	child2: {core: auxl.fadeScreen},
	child3: {core: auxl.sphereScreen},
	child4: {core: auxl.blink1Screen},
	child5: {core: auxl.blink2Screen},
	child6: {core: auxl.playerPointLight},
},
child1: {
	parent: {core: auxl.vrController1},
	child0: {core: auxl.vrController1UI},
},
child2: {
	parent: {core: auxl.vrController2},
	child0: {core: auxl.vrController2UI},
},
child3: {core: auxl.playerFloor},
}
//SPECIAL : Player Base and Child Camera entity are already in HTML and Layer has special exceptions for it
auxl.playerLayer = auxl.Layer('playerLayer', auxl.playerAll);
//Player Obj
auxl.player = auxl.Player(auxl.playerLayer);

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
//sources: {['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',},
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
['look-at']:'#camera',
},
};

//
//Hamburger Menu Companion
auxl.hamCompData = {
data:'HAM',
id:'hamComp',
sources:false,
//sources: {['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',},
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(1,1,-0.25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
clickrun:{cursorObj: 'hamComp', method: 'Click', params: null}, 
fusingrun:{cursorObj: 'hamComp', method: 'FuseClickRun', params: null}, 
mousedownrun:{cursorObj: 'hamComp', method: 'CursorDownRun', params: null}, 
mouseenterrun:{cursorObj: 'hamComp', method: 'CursorEnterRun', params: null}, 
mouseleaverun:{cursorObj: 'hamComp', method: 'CursorLeaveRun', params: null}, 
mouseuprun:{cursorObj: 'hamComp', method: 'CursorUpRun', params: null},
eventrun:{event: 'testEventHit',cursorObj: 'hamComp', method: 'FuseClickRun', params: null}, 
['look-at']:'#camera', 
},
};
auxl.hamComp = auxl.Core(auxl.hamCompData);
auxl.ham = auxl.HamMenu('ham',auxl.hamComp);
//Inventory Screen
auxl.inventoryScreenData = {
data:'inventoryScreenData',
id:'inventoryScreen',
sources:false,
text: {value:'Inventory :\nEmpty', color: "#FFFFFF", align: "center", font: "exo2bold", width: 1.2, zOffset: 0.025, side: 'front', wrapCount: 35, baseline: 'bottom', anchor: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.75},
material: {shader: "standard", color: "#4bb8c1", opacity: 0.8, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,1.05,-1.25),
rotation: new THREE.Vector3(15,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.inventoryScreen = auxl.Core(auxl.inventoryScreenData);

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
detailprompt:{type: 'detail'},
['look-at']:'#camera',
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
components: {detailprompt:{type: 'detail'}},
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
['look-at-xyz']:{match: 'camera', y:true},
['raycast-teleportation']:null,
},
};
auxl.teleportPortalData.id = 'teleportPortal1';
auxl.teleportPortal1 = auxl.Core(auxl.teleportPortalData);
auxl.teleportPortalData.id = 'teleportPortal2';
auxl.teleportPortalData.position = new THREE.Vector3(0,5,3);
auxl.teleportPortal2 = auxl.Core(auxl.teleportPortalData);


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
daylight:{property: 'light.intensity', from: 0.5, to: 0.25, dur: auxl.timeInDay/2, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
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
nightlight:{property: 'light.intensity', from: 0.2, to: 0.1, dur: auxl.timeInDay/4, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},
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
rotation: new THREE.Vector3(-10,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: -5, to: 355, dur: auxl.timeInDay, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.sunData = {
data:'sun',
id:'sun',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 30, segments: 32},
material: {shader: "standard", color: "#F0A500", opacity: 1, side: 'front', emissive: '#F0A500', emissiveIntensity: 1, roughness: 0.42},
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
rotation: new THREE.Vector3(170,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: 175, to: 535, dur: auxl.timeInDay, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.moonData = {
data:'moon',
id:'moon',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 24, segments: 32},
material: {shader: "standard", color: "#5c2196", opacity: 1, side: 'front', emissive: '#5c2196', emissiveIntensity: 0.75, roughness: 0.42},
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
//Alpha Stars
auxl.skyStarAlphaData = {
data: 'sky alpha',
id: 'skyStarAlpha',
entity: 'a-sky',
sources: false,
text: false,
geometry: false,
material: {shader: "flat", src:'./assets/img/360/star-alpha.png', alphaTest: 0.89, transparent: true,},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.95, 0.95, 0.95),
animations:{rotate: {property: 'object3D.rotation.z', from: 0, to: 360, dur: 4000000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true}, },
mixins: false,
classes: ['a-ent'],
components: false,
};
//Not used just yet

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
//Testing Objects

//Testing Object for Interactions and Events
auxl.eventTestingData = {
data:'Event Testing',
id:'eventTesting',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.75,1.25,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.eventTesting = auxl.Core(auxl.eventTestingData);
auxl.eventTesting2Data = {
data:'Event Testing 2',
id:'eventTesting2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern15, repeat: '1 1', color: "#3999a5", emissive: '#3999a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0.75,1.25,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.eventTesting2 = auxl.Core(auxl.eventTesting2Data);
auxl.eventTesting3Data = {
data:'Event Testing 3',
id:'eventTesting3',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern22, repeat: '1 1', color: "#ad482a", emissive: '#ad482a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.25,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.eventTesting3 = auxl.Core(auxl.eventTesting3Data);
auxl.eventTesting4Data = {
data:'Event Testing 4',
id:'eventTesting4',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern27, repeat: '1 1', color: "#d2e025", emissive: '#d2e025', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.eventTesting4 = auxl.Core(auxl.eventTesting4Data);
auxl.eventTesting5Data = {
data:'Event Testing 5',
id:'eventTesting5',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern33, repeat: '1 1', color: "#25e074", emissive: '#25e074', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.5,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.eventTesting5 = auxl.Core(auxl.eventTesting5Data);

auxl.spawnTestingData = {
data:'spawnTestingData',
id:'spawnTesting',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern69, repeat: '1 1', color: "#25e074", emissive: '#25e074', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.5,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.5,1.5,1.5),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.spawnTesting = auxl.Core(auxl.spawnTestingData);

//Sound Testing
auxl.soundTestingData = {
data:'Sound Testing',
id:'soundTesting',
sources: false,
sound: {src: './assets/audio/270341__littlerobotsoundfactory__pickup-04.wav', autoplay: false, loop: false, volume: 1, on: 'playSound'},
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['sound','a-ent'],
components: false,
};
auxl.soundTesting = auxl.Core(auxl.soundTestingData);

//
//ImageSwapper

//ImageSwapper Main View
auxl.imageSwapperViewData = {
data: 'imageSwapperViewData',
id:'imageSwapperView',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: false,
position: new THREE.Vector3(2,1.5,0.25),
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//ImageSwapper Thumbnail Button Previews
auxl.imageSwapperButtonData = {
data: 'imageSwapperButtonData',
id:'imageSwapperButton',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 0.2, height: 0.2},
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: {clickfunc: {clickObj: 'imageSwapper1'}},
};
//ImageSwapper Example
auxl.imageSwapper1 = auxl.ImageSwapper('imageSwapper1',auxl.imageSwapperViewData, auxl.imageSwapperButtonData, auxl.mat0, auxl.mat1, auxl.mat2, auxl.mat3, auxl.mat4);

//
//ImageCarousel

//Testing
auxl.carouselTestingData = {
id: 'carouselTesting',
//mode: 360,
//frames: 8,
description: 'Browse through an example carousel. Control the image frames with a handful of buttons to jump to a random page, go back a page, go back a few images, view info, play the slideshow, go forward a few images, go to the next page and switch between 2 frame sizings.',
images: [
	{image: auxl.pattern01, text: 'Example1'},
	{image: auxl.pattern02, text: 'Example2'},
	{image: auxl.pattern03, text: 'Example3'},
	{image: auxl.pattern04, text: 'Example4'},
	{image: auxl.pattern05, text: 'Example5'},
	{image: auxl.pattern06, text: 'Example6'},
	{image: auxl.pattern07, text: 'Example7'},
	{image: auxl.pattern08, text: 'Example8'},
	{image: auxl.pattern09, text: 'Example9'},
	{image: auxl.pattern10, text: 'Example10'},
	{image: auxl.pattern11, text: 'Example11'},
	{image: auxl.pattern12, text: 'Example12'},
	{image: auxl.pattern13, text: 'Example13'},
	{image: auxl.pattern14, text: 'Example14'},
	{image: auxl.pattern15, text: 'Example15'},
	{image: auxl.pattern16, text: 'Example16'},
	{image: auxl.pattern17, text: 'Example17'},
	{image: auxl.pattern18, text: 'Example18'},
	{image: auxl.pattern19, text: 'Example19'},
	{image: auxl.pattern20, text: 'Example20'},
	{image: auxl.pattern21, text: 'Example21'},
	{image: auxl.pattern22, text: 'Example22'},
	{image: auxl.pattern23, text: 'Example23'},
	{image: auxl.pattern24, text: 'Example24'},
],
};
auxl.carouselTesting = auxl.ImageCarousel(auxl.carouselTestingData);

//
//Memory Game

//Memory 0
auxl.memory0Data = {
data:'0',
id:'memory0',
sources:false,
text: false,
geometry: {primitive: 'triangle', vertexA: '0 0.5 0', vertexB: '-0.5 -0.5 0', vertexC: '0.5 -0.5 0'},
material: {shader: "standard", color: "#3EB489", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3EB489", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(-0.6,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 1
auxl.memory1Data = {
data:'1',
id:'memory1',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 0.75, height: 0.75,},
material: {shader: "standard", color: "#C14B76", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#C14B76", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0.6,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 2
auxl.memory2Data = {
data:'2',
id:'memory2',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 0.15, height: 0.75,},
material: {shader: "standard", color: "#ce782f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ce782f", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(-0.6,0,0),
rotation: new THREE.Vector3(0,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 3
auxl.memory3Data = {
data:'3',
id:'memory3',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 0.5, segments: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#4b54c1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#4b54c1", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0.6,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory UI
auxl.memoryUIData = {
data:'memoryUIData',
id:'memoryUI',
sources:false,
text: {value:'Memory Game UI', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'plane', width: '2', height: '0.25'},
material: {shader: "standard", color: "#3EB489", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3EB489", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0,2.6,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['memory','a-ent'],
components: false,
};
//Memory Example
auxl.memory = auxl.MemoryGame('memory',[auxl.memory0Data,auxl.memory1Data,auxl.memory2Data,auxl.memory3Data]);


//
//Horizon
//mountains,hills,buildings,cylinderWall,squareWall
//omit texture to use ThreeGradientShader
//low,normal,high

//Mountains 1
//Forest Mountains
auxl.horizonMountains1Data = {
id: 'horizonMountains1',
type: 'mountains',
texture: false,
baseColor: false,
baseColorFamily: 'maroon',
radius: 200,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.horizonMountains1 = auxl.Horizon(auxl.horizonMountains1Data);
//Mountains 2
//Snow Mountains
auxl.horizonMountains2Data = {
id: 'horizonMountains2',
type: 'mountains',
texture: false,
baseColor: '#e0d7ca',
baseColorFamily: false,
radius: 200,
density: 'normal',
height: 'high',
width: 'normal',
};
auxl.horizonMountains2 = auxl.Horizon(auxl.horizonMountains2Data);
//Hills
//Graveyard Hills
auxl.horizonHills1Data = {
id: 'horizonHills1',
type: 'hills',
texture: false,
baseColor: false,
baseColorFamily: 'olive',
radius: 200,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.horizonHills1 = auxl.Horizon(auxl.horizonHills1Data);
//Wall 1 - Cylinder
//Desert Wall
auxl.horizonWalls1Data = {
id: 'horizonWalls1',
type: 'cylinderWall',
texture: false,
baseColor: false,
baseColorFamily: 'orange',
radius: 200,
density: 'normal',
height: 'low',
width: 'normal',
};
auxl.horizonWalls1 = auxl.Horizon(auxl.horizonWalls1Data);
//Wall2 - Square
//Underwater
auxl.horizonWalls2Data = {
id: 'horizonWalls2',
type: 'squareWall',
texture: {src: auxl.pattern55, repeat: '6 4', emissive: true,},
baseColor: '#275876',
baseColorFamily: false,
radius: 100,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.horizonWalls2 = auxl.Horizon(auxl.horizonWalls2Data);
//Wall3 - Square
//Indoor Room
auxl.horizonWalls3Data = {
id: 'horizonWalls3',
type: 'squareWall',
texture: {src: auxl.pattern18, repeat: '4 4', emissive: true,},
baseColor: '#80401f',
baseColorFamily: false,
radius: 10,
density: 'low',
height: 'low',
width: 'low',
};
auxl.horizonWalls3 = auxl.Horizon(auxl.horizonWalls3Data);
//Wall4 - Square
//Cave
auxl.horizonWalls4Data = {
id: 'horizonWalls4',
type: 'squareWall',
texture: {src: auxl.pattern81, repeat: '4 4', emissive: true,},
baseColor: '#bc8fa0',
baseColorFamily: false,
radius: 10,
density: 'low',
height: 'low',
width: 'low',
};
auxl.horizonWalls4 = auxl.Horizon(auxl.horizonWalls4Data);
//Buildings
//Beach Pillars
auxl.horizonBuildings1Data = {
id: 'horizonBuildings1',
type: 'buildings',
texture: {src: auxl.pattern74, repeat: '1 1'},
baseColor: false,
baseColorFamily: 'yellow',
radius: 200,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.horizonBuildings1 = auxl.Horizon(auxl.horizonBuildings1Data);
//Random Buildings
//Starting Island Misc
auxl.horizonBuildings2Data = {
id: 'horizonBuildings2',
type: 'buildings',
texture: {src: auxl.patterns, repeat: '2 2', opacity: 1, metalness: 0.4, roughness: 0.6, emissive: true, emissiveIntensity: 0.3,},
baseColor: false,
baseColorFamily: false,
radius: 200,
density: 'high',
height: 'high',
width: 'normal',
};
auxl.horizonBuildings2 = auxl.Horizon(auxl.horizonBuildings2Data);


//
//Testing GLTF Material Modification

//modify materials testing
auxl.testingData = {
data:'testingData',
id:'testing',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1.5,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crop_melon.glb',
//['modify-materials']:null,
//['auxl-object']:{dataName: 'testingData'},
},
};
auxl.testing = auxl.Core(auxl.testingData);

    },
});

//Testing
//Altering GLTF Materials & Toon Shader
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
//Attach
AFRAME.registerComponent('attach', {
	dependencies: ['auxl'],
    schema: {
        idname: {type: 'string', default: 'ui'},
        position: {type: 'vec3'},
    },
    init: function () {
        //Do something when component first attached.
        //Thing To Attach
        this.attachee = document.getElementById(this.data.idname);
        //Empty Pos Vec3
        this.offset = new THREE.Vector3();
		if(this.data.position){
			this.offset.copy(this.data.position);
		} else {
        	this.offset.copy(this.attachee.object3D.position);
		}
        this.newPosVec3 = new THREE.Vector3();
    },

    update: function () {
        //Do something when component's data is updated.
    },

    remove: function () {
        //Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
        //Do something on every scene tick or frame.
        this.attached();
    },
    attached: function () {
        //attached
        //Clone current the entity this component is attached to's position
		//console.log(this.el.object3D.position);
        this.newPosVec3.copy(this.el.object3D.position);
        //Offsets
        this.newPosVec3.x += this.offset.x;
        this.newPosVec3.y += this.offset.y;
        this.newPosVec3.z += this.offset.z;
        //Set position for UI at 3js level for speed!
        this.attachee.object3D.position.copy(this.newPosVec3);
		//console.log(this.newPosVec3);
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
    remove: function () {
        //Do something the component or its entity is detached.
    },
    tick: function (time, timeDelta) {
        //Do something on every scene tick or frame.
        this.lookAtXYZThrottled();
    },
    lookAtXYZ: function () {
		this.matchRotation.copy(this.matchView.object3D.rotation);
		if(this.data.x){
			this.rotation.x = this.matchRotation.x;
		}
		if(this.data.y){
			this.rotation.y = this.matchRotation.y;
		}
		if(this.data.z){
			this.rotation.z = this.matchRotation.z;
		}
        //Set rotation for UI at 3js level for speed!
		this.el.object3D.rotation.copy(this.rotation);
    },
});

//
//Click event listener for obj.Click(el) within auxl system
AFRAME.registerComponent('clickfunc', {
//el.setAttribute('clickfunc',{clickObj: 'auxlObj'})
//auxlObj is a string exact name for a this.auxlObj named object which has it's Click() func ran
	dependencies: ['auxl'],
    schema: {
        clickObj: {type: 'string', default: 'auxlObj'}
    },
    init: function () {
        //Do something when component first attached.
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		click: function (evt) {
			//console.log('Clicked on ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.clickObj);//zone0?auxlObj
			this.auxl[this.data.clickObj].Click(evt.target);
		}
	}
});
//
AFRAME.registerComponent('clickrun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'Click'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		click: function (evt) {
			//console.log('Clicked on ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});
//
AFRAME.registerComponent('fusingrun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'methodName'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		fusing: function (evt) {
			//console.log('Fused on ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});
//
AFRAME.registerComponent('mousedownrun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'methodName'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		mousedown: function (evt) {
			//console.log('Cursor down on ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});
//
AFRAME.registerComponent('mouseenterrun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'methodName'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		mouseenter: function (evt) {
			//console.log('Cursor entered on ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});
//
AFRAME.registerComponent('mouseleaverun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'methodName'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		mouseleave: function (evt) {
			//console.log('Cursor left from ' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});
//
AFRAME.registerComponent('mouseuprun', {
	dependencies: ['auxl'],
    schema: {
        cursorObj: {type: 'string', default: 'auxlObj'},
        method: {type: 'string', default: 'methodName'},
        params: {type: 'string', default: 'null'}
    },
    init: function () {
        //Do something when component first attached.
		//console.log('clickrun attached');
		this.auxl = document.querySelector('a-scene').systems.auxl;
    },//End initialization Function
	events: {
		mouseup: function (evt) {
			//console.log('Cursor up from' + evt.target.id);
			//console.log(evt.target);
			//console.log(this.data.cursorObj);
			//console.log(this.data.method);
			//console.log(this.data.params);
			if(this.auxl[this.data.cursorObj][this.data.method]){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			}

		}
	}
});

//
//Locomotion
AFRAME.registerComponent('locomotion', {
dependencies: ['auxl'],
schema: {
	uiid: {type: 'string', default: 'ui'},
	courserid: {type: 'string', default: 'mouseCursor'},
	movetype: {type: 'string', default: 'vr'},
},

init: function () {
	const auxl = document.querySelector('a-scene').systems.auxl;
	// Set up the tick throttling.
	this.everySomeThrottled = AFRAME.utils.throttle(this.everySome, 30, this);

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

	//
	//Band Controller Support
	this.directionForward;
	this.directionReverse;
	this.directionBrake1;
	this.directionBrake2;
	this.directionBrake3;
	this.directionBrake4;

	//Walk Support
	this.camera = document.getElementById('camera');
	this.player = document.getElementById('playerRig');
	this.ui = document.getElementById('beltUIParent');
    this.positionCam = new THREE.Vector3();
    this.positionPlayer = new THREE.Vector3();
    this.positionNew = new THREE.Vector3();
    this.positionTemp = new THREE.Vector3();
	this.quaternion = new THREE.Quaternion();
	this.vector;
	this.angle;
	//this.theta;

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
	//Brake Engaged by Default
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay
	this.moveSpeedDefault = 0.075;
	this.moveSpeedSlow = 0.03;

},
//Move Forward
movingForward: function (){
	if(this.moveTo){}else{
		this.moveTo = true;
	}
},
//Cancel Forward
cancelForward: function (){
	if(this.moveTo){
		this.moveTo = false;
	}
},
//Move Reverse
movingReverse: function (){
	if(this.moveBack){}else{
		this.moveBack = true;
	}
},
//Cancel Reverse
cancelReverse: function (){
	if(this.moveBack){
		this.moveBack = false;
	}
},
//Move Left
movingLeft: function (){
	if(this.moveLeft){}else{
		this.moveLeft = true;
	}
},
//Cancel Left
cancelLeft: function (){
	if(this.moveLeft){
		this.moveLeft = false;
	}
},
//Move Right
movingRight: function (){
	if(this.moveRight){}else{
		this.moveRight = true;
	}
},
//Cancel Right
cancelRight: function (){
	if(this.moveRight){
		this.moveRight = false;
	}
},
//Clear All Movement
clearMovement: function (){
	this.cancelForward();
	this.cancelReverse();
	this.cancelLeft();
	this.cancelRight();
},
//Toggle Speed Change
toggleSpeed: function (){
	//console.log('Toggling Speed');
	//Brake is disabled for 1.5 seconds after engaging
	if(this.brakeReady){
		if(this.brakeToggle){
			//console.log('Break On');
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
		} else {
			//console.log('Break Off');
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake Off
			this.moveBrake = false;
		}
		this.brakeReset = setTimeout(() => {
			//Set reset switch toggle
			this.brakeReady = true;
			clearTimeout(this.brakeReset);
		}, 250); //Delay
	}
},
//Buffer for Toggling Speed Change Long
brakeReadBufferLong: function (){
	//This will start the reset timer to allow the brake to be re-engadged
	//Brake Reset Timeout
	this.brakeReset = setTimeout(() => {
		//Set reset switch toggle
		this.brakeReady = true;
		clearTimeout(this.brakeReset);
	}, 2250); //Delay
},

hoverLocomotion: function (e) {
	//Brake is disabled for 1.5 seconds after engaging
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
			//set brake color to red
			this.directionBrake1.setAttribute('material', {color: 'red'});
			this.directionBrake2.setAttribute('material', {color: 'red'});
			this.directionBrake3.setAttribute('material', {color: 'red'});
			this.directionBrake4.setAttribute('material', {color: 'red'});
			//anim positition for forward/reverse bar and brakes
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
			//Brake Off
			this.moveBrake = false;
			//set brake color to default
			this.directionBrake1.setAttribute('material', {color: 'black'});
			this.directionBrake2.setAttribute('material', {color: 'black'});
			this.directionBrake3.setAttribute('material', {color: 'black'});
			this.directionBrake4.setAttribute('material', {color: 'black'});
			//anim positition for forward/reverse bar back to default
			this.directionForward.emit('brakeOff',{});
			this.directionReverse.emit('brakeOff',{});
			this.directionBrake1.emit('brakeOff',{});
			this.directionBrake2.emit('brakeOff',{});
			this.directionBrake3.emit('brakeOff',{});
			this.directionBrake4.emit('brakeOff',{});
		}
	}
},

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
	this.moveSpeedDefault = 0.075;
	this.moveSpeedSlow = 0.03;

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
	} else if(this.movetype === 'mobile'){
	} else if(this.movetype === 'vr'){
	} else if(this.movetype === 'vrHover'){
		//this.vrController1 = document.getElementById('vrController1');
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

remove: function () {
	//Keyboard Controller Event Listeners
	if(this.movetype === 'desktop'){
	} else if(this.movetype === 'mobile'){
	} else if(this.movetype === 'vr'){
	} else if(this.movetype === 'vrHover'){
		//directionForward
		this.directionForward.removeEventListener('mouseenter', this.movingForward);
		this.directionForward.removeEventListener('mouseleave', this.cancelForward);
		//directionReverse
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

everySome: function (time, timeDelta) {
	//Do something on every scene tick or frame.
	//console.log('everysome running');
	//console.log(move);
	if(this.moveBrake){
		if(this.moveTo && this.moveRight) {
			this.walk('forwardRight', this.moveSpeedSlow);
		} else if(this.moveTo && this.moveLeft) {
			this.walk('forwardLeft', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveRight) {
			this.walk('reverseRight', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveLeft) {
			this.walk('reverseLeft', this.moveSpeedSlow);
		} else if(this.moveTo) {
			this.walk('forward', this.moveSpeedSlow);
		} else if(this.moveBack) {
			this.walk('reverse', this.moveSpeedSlow);
		} else if(this.moveRight) {
			this.walk('right', this.moveSpeedSlow);
		} else if(this.moveLeft) {
			this.walk('left', this.moveSpeedSlow);
		}
	} else {
		if(this.moveTo && this.moveRight) {
			this.walk('forwardRight', this.moveSpeedDefault);
		} else if(this.moveTo && this.moveLeft) {
			this.walk('forwardLeft', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveRight) {
			this.walk('reverseRight', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveLeft) {
			this.walk('reverseLeft', this.moveSpeedDefault);
		} else if(this.moveTo) {
			this.walk('forward', this.moveSpeedDefault);
		} else if(this.moveBack) {
			this.walk('reverse', this.moveSpeedDefault);
		} else if(this.moveRight) {
			this.walk('right', this.moveSpeedDefault);
		} else if(this.moveLeft) {
			this.walk('left', this.moveSpeedDefault);
		}
	}
},

tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.
	//Throttle
	this.everySomeThrottled();

	//Run uiSync Function
	if(this.movetype === 'vrHover'){
		this.uiSync();
	}

},

//Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},

uiSync: function () {
	//uiSync
	//Clone current the entity this component is attached to's position
	this.elPosVec3New.copy(this.el.object3D.position);
	//No Offsets as UI Parent is at 0 0 0
	//Set position for UI at 3js level for speed!
	this.ui.object3D.position.copy(this.elPosVec3New);
},

walk: function (action, speed) {
//console.log('walking');

this.cameraVector = new THREE.Vector3();
this.positionNew = new THREE.Vector3();

this.velocity = speed;
//Get Camera Vec3
this.camera.object3D.getWorldDirection(this.cameraVector);
this.positionPlayer.copy(this.player.object3D.position);
//Math out the Angle
//Degrees from -180 to 0 to 180
//this.angleDeg = Math.atan2(this.cameraVector.x,this.cameraVector.z) * 180 / Math.PI;
//console.log(this.angleDeg)
//Radians
this.angle = Math.atan2(this.cameraVector.x,this.cameraVector.z);
// 0 < θ < π/2
//Quadrants
//1 - Front Left
//2 - Front Right
//3 - Back Left
//4 - Back Right
if(action === 'forwardRight'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x + this.velocity;
		this.positionNew.z = this.positionPlayer.z - this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'forwardLeft'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x - this.velocity;
		this.positionNew.z = this.positionPlayer.z - this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'reverseRight'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x + this.velocity;
		this.positionNew.z = this.positionPlayer.z + this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'reverseLeft'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x - this.velocity;
		this.positionNew.z = this.positionPlayer.z + this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'forward'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z - this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'reverse'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z + this.velocity;
		//console.log('0 Angle');
	}
} else if(action === 'right'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x + this.velocity;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0 Angle');
	}

} else if(action === 'left'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x - this.velocity;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0 Angle');
	}
}

this.positionNew.y = this.positionPlayer.y;

//No Offsets as UI Parent is at 0 0 0
//Set position for UI at 3js level for speed!
this.player.object3D.position.copy(this.positionNew);
//console.log(this.angle);
//console.log(this.positionNew);

},

//spawnwithuser support
userDirection: function (){
	//Get User's current XZ position
	this.userPos = this.player.getAttribute('position');
	//Check current User Rotation view
	//let userRot = user.getAttribute('rotation');
	this.userRot = this.camera.getAttribute('rotation');

	//Could use userTravel and userView to determine a shorter distance in which a particle is flagged for respawn. Think as soon as something is out of the users view like they just walked past it.

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
		//Test Logging
		//console.log(radials);
		//console.log(Math.floor(radials));
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

	//Test Logging
	console.log("User Direction: " + this.userView);


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
//Teleportation
AFRAME.registerComponent('teleportation',{
dependencies: ['auxl'],
init: function(){
	//Prepare
	if (this.el.classList.contains('teleport')) {
		//Set parent wrapper's active status
		this.el.parentNode.setAttribute('active', 'false');
	} else if (this.el.classList.contains('cancel')) {
		this.el.classList.toggle('clickable', false);
		//Set parent wrapper's active status
		this.el.parentNode.setAttribute('active', 'false');
	}
},
resetTeleCircles: function () {
	this.allTeleportors = document.querySelectorAll('.teleporter');
	for (let i= 0; i < this.allTeleportors.length; i++){
		if (this.allTeleportors[i].parentNode.getAttribute('active') === 'true') {
			this.allTeleportors[i].emit('resetInstant',{});
			this.allTeleportors[i].nextSibling.emit('resetInstant',{});
		}
	}
},
resetInstantEvent: function () {
	if (this.classList.contains('teleport')) {
		//Reset parent wrapper's active status
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')) {
		this.classList.toggle('clickable', false);
		//Reset parent wrapper's active status
		this.parentNode.setAttribute('active', 'false');
	}
},
resetEvent: function () {
	if (this.classList.contains('teleport')) {
		//Reset parent wrapper's active status
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')) {
		this.classList.toggle('clickable', false);
		//Reset parent wrapper's active status
		this.parentNode.setAttribute('active', 'false');
	}
},
clickToTeleport: function () {
	let element = this;
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition;
	let newPosition = new THREE.Vector3();
	let teleportPos = this.parentNode.getAttribute('position');
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	function playerTeleportAnim(){
		if(auxl.player.layer.teleporting){} else {
			auxl.player.layer.teleporting = true;
			if(auxl.player.layer.transition === 'blink'){
				auxl.player.TempDisableClick();
				auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink1Screen.EmitEvent('blinkPort');
				auxl.blink2Screen.EmitEvent('blinkPort');
				animTimeout = setTimeout(function () {
					auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'fade'){
				auxl.player.TempDisableClick();
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.fadeScreen.EmitEvent('fadePort');
				animTimeout = setTimeout(function () {
					auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'sphere'){
				auxl.player.TempDisableClick();
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.sphereScreen.EmitEvent('spherePort');
				animTimeout = setTimeout(function () {
					auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'instant'){
				animTimeout = setTimeout(function () {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			}
		}
	}

	function prepMove(element, newPos, telePos){
		//Do an reset on element to not interfer with anim
		element.emit('reset',{});//select circle
		element.nextSibling.emit('reset',{});//cancel circle
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	function resetTeleCircles(){
		//this.allTeleportors = document.querySelectorAll('.teleporter');
		for(let i= 0; i < allTeleportors.length; i++){
			if(allTeleportors[i].parentNode.getAttribute('active') === 'true') {
				allTeleportors[i].emit('resetInstant',{});
				allTeleportors[i].nextSibling.emit('resetInstant',{});
			}
		}
	}

	if(element.parentNode.getAttribute('active') === 'false') {
		//default state
		//Allow cancel circle to be viewable and clickable
		element.nextSibling.classList.toggle('clickable', true);
		element.nextSibling.emit('click1',{});
		//Set rotation anim for select circle
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
		//if clicked once and activated, setAttribute that be checked for reset
		element.parentNode.setAttribute('active', 'true');
	} else {

		//circle1 and circle2 are ready to be clicked
		//if circle1 was selected, teleport user and reset properties
		//if circle2 was selcted, reset properties
		if(element.classList.contains('teleport')) {
			//Teleportation Type
			if(teleportType === 'instant') {
				resetTeleCircles();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 150);
			} else if(teleportType === 'fade') {
				playerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 1050);
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
				playerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 1000);
			} else if(teleportType === 'blink') {
				playerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 800);
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
	//Do something the component or its entity is detached.
	this.el.removeEventListener('reset', this.resetEvent);
	this.el.removeEventListener('resetInstant', this.resetInstantEvent);
	this.el.removeEventListener('click', this.clickToTeleport);
},
});

//
//Raycast Teleportation
AFRAME.registerComponent('raycast-teleportation', {
init: function () {},
clickToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition;
	let newPosition = new THREE.Vector3();
	let teleportPos = event.detail.intersection.point;
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	function playerTeleportAnim(){
		if(auxl.player.layer.teleporting){} else {
			auxl.player.layer.teleporting = true;
			if(auxl.player.layer.transition === 'blink'){
				auxl.player.TempDisableClick();
				auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink1Screen.EmitEvent('blink');
				auxl.blink2Screen.EmitEvent('blink');
				animTimeout = setTimeout(function () {
					auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'fade'){
				auxl.player.TempDisableClick();
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.fadeScreen.EmitEvent('fade');
				animTimeout = setTimeout(function () {
					auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'sphere'){
				auxl.player.TempDisableClick();
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.sphereScreen.EmitEvent('sphere');
				animTimeout = setTimeout(function () {
					auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition === 'instant'){
				animTimeout = setTimeout(function () {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			}
		}
	}

	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	//Teleportation Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 150);
	} else if(teleportType === 'fade') {
		playerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 1050);
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
		playerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 1000);
	} else if(teleportType === 'blink') {
		playerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 800);
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

//Control Actions :
//Main Click
//Alt Click
//Directional Movement
//Rotational Movement
//Action 1 - Button X, Key Q, HTML A
//Action 2 - Button Y, Key E, HTML B
//Action 3 - Button A, Key R, HTML C
//Action 4 - Button B, Key C, HTML D
//Action 5 - Right Joystick Down, Key V, HTML E
//Action 6 - Right Joystick Up, Key B, HTML F

this.aScene = document.querySelector('a-scene');
this.auxl = document.querySelector('a-scene').systems.auxl;
//Locomotion Component
this.locomotion;
//VR Controllers
this.vrController1;
this.vrController2;

//Remappable Controls
this.controls = {
directionForwardKeys: ['w','W','ArrowUp'],
directionLeftKeys: ['a','A','ArrowLeft'],
directionBackwardKeys: ['s','S','ArrowDown'],
directionRightKeys: ['d','D','ArrowRight'],
action1Keys: ['q','Q'],
action2Keys: ['e','E'],
action3Keys: ['r','R'],
action4Keys: ['c','C'],
action5Keys: ['v','V'],
action6Keys: ['b','B'],
snapLeftKeys: ['z','Z'],
snapRightKeys: ['x','X'],
};

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
this.mobileSnapLeft = document.getElementById('snapLeft');
this.mobileSnapRight = document.getElementById('snapRight');
this.mobileA = document.getElementById('a');
this.mobileB = document.getElementById('b');
this.mobileC = document.getElementById('c');
this.mobileD = document.getElementById('d');
this.mobileE = document.getElementById('e');
this.mobileF = document.getElementById('f');

//Customizable Action Controls
this.altDownFunc = false;
this.altUpFunc = false;
this.action1DownFunc = false;
this.action1UpFunc = false;
this.action2DownFunc = false;
this.action2UpFunc = false;
this.action3DownFunc = false;
this.action3UpFunc = false;
this.action4DownFunc = false;
this.action4UpFunc = false;
this.action5DownFunc = false;
this.action5UpFunc = false;
this.action6DownFunc = false;
this.action6UpFunc = false;

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
this.dispatchRotation = () => {
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
	this.questJoystickLocomotion(e);
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
	this.questJoystickOther(e);
}
//Other Joystick
this.deadzoneOther = 0.1;
this.xNumOther = 0;
this.yNumOther = 0;
this.angleOther = 0;
this.angleDegOther = 0;

//Snap Turning
this.snapLeftHit = (e) => {
	this.snapLeft();
}
this.snapRightHit = (e) => {
	this.snapRight();
}

    },
//DEV
updateInput: function (input){
	//Display Inputs - DEV Testing
	const displayInput = document.querySelector('#displayInput');
	let displayInputText = {value: 'No Input', color: 'white', align: 'center'}
	displayInputText.value = input;
	displayInput.setAttribute('text',displayInputText);
},
//Change Action function
updateAction: function (actionObj){
	//console.log(actionObj);
	for(let action in actionObj){
		//console.log(action);//actionName
		//console.log(actionObj[action]);//params
		let actionFunc;
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
		} else {
			console.log('Failed to identify action')
			return;
		}

		if(actionObj[action]){
			let auxlObj = actionObj[action].auxlObj;
			let component = actionObj[action].component;
			let func = actionObj[action].func;
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
		} else {
			this[actionFunc] = false;
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
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
		} else {
			console.log('Failed to identify action')
			return;
		}
		this[actionFunc] = false;
	}
},
//Main Click
mainClick: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
},
//Alt Click
altClick: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'altClickHit'){
		if(this.altDownFunc){
			this.altDownFunc();
		}
	} else if(e.detail.action === 'altClickRelease'){
		if(this.altUpFunc){
			this.altUpFunc();
		}
	}
},
//Directional Movement
direction: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
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
	this.updateInput(e.detail.info);
},
//Action 1
action1: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action1Hit'){
		if(this.action1DownFunc){
			this.action1DownFunc();
		}
	} else if(e.detail.action === 'action1Release'){
		if(this.action1UpFunc){
			this.action1UpFunc();
		}
	}
},
//Action 2
action2: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action2Hit'){
		if(this.action2DownFunc){
			this.action2DownFunc();
		}
	} else if(e.detail.action === 'action2Release'){
		if(this.action2UpFunc){
			this.action2UpFunc();
		}
	}
},
//Action 3
action3: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action3Hit'){
		if(this.action3DownFunc){
			this.action3DownFunc();
		}
	} else if(e.detail.action === 'action3Release'){
		if(this.action3UpFunc){
			this.action3UpFunc();
		}
	}
},
//Action 4
action4: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action4Hit'){
		if(this.action4DownFunc){
			this.action4DownFunc();
		}
	} else if(e.detail.action === 'action4Release'){
		if(this.action4UpFunc){
			this.action4UpFunc();
		}
	}
},
//Action 5
action5: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action5Hit'){
		if(this.action5DownFunc){
			this.action5DownFunc();
		}
	} else if(e.detail.action === 'action5Release'){
		if(this.action5UpFunc){
			this.action5UpFunc();
		}
	}
},
//Action 6
action6: function (e){
	//console.log(e.detail);
	this.updateInput(e.detail.info);
	if(e.detail.action === 'action6Hit'){
		if(this.action6DownFunc){
			this.action6DownFunc();
		}
	} else if(e.detail.action === 'action6Release'){
		if(this.action6UpFunc){
			this.action6UpFunc();
		}
	}
},

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
	} else if(this.controls.snapLeftKeys.includes(e.key)){
		//Snap Left
		this.snapLeftHit();
	} else if(this.controls.snapRightKeys.includes(e.key)){
		//Snap Right
		this.snapRightHit();
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
	}
},
//Joystick Locomotion
questJoystickLocomotion: function (e){
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
			this.updateInput('Backward');
		} else if(this.angleDegLoco > 22.5 && this.angleDegLoco < 67.5){
			//BackwardRight : 22.5 -> 67.5
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			this.locomotion.movingRight();
			this.updateInput('Backward Right');
		} else if(this.angleDegLoco > 67.5 && this.angleDegLoco < 112.5){
			//Right : 67.5 -> 112.5
			this.locomotion.clearMovement();
			this.locomotion.movingRight();
			this.updateInput('Right');
		} else if(this.angleDegLoco > 112.5 && this.angleDegLoco < 157.5){
			//ForwardRight : 112.5 -> 157.5
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			this.locomotion.movingRight();
			this.updateInput('Forward Right');
		} else if(this.angleDegLoco > 157.5 || this.angleDegLoco < -157.5){
			//Forward : 157.5 -> 180 or -157.5 -> -180
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			this.updateInput('Forward');
		} else if(this.angleDegLoco < -112.5 && this.angleDegLoco > -157.5){
			//ForwardLeft: -112.5 -> -157.5
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			this.locomotion.movingLeft();
			this.updateInput('Forward Left');
		} else if(this.angleDegLoco < -67.5 && this.angleDegLoco > -112.5){
			//Left : -67.5 -> -112.5
			this.locomotion.clearMovement();
			this.locomotion.movingLeft();
			this.updateInput('Left');
		} else if(this.angleDegLoco < -22.5 && this.angleDegLoco > -67.5){
			//BackwardLeft: -22.5 -> -67.5 
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			this.locomotion.movingLeft();
			this.updateInput('Backward Left');
		}
	} else {
		this.locomotion.clearMovement();
		this.updateInput('Locomotion Clear');
	}
},
//Snap Turning Left
snapLeft: function (){
	this.auxl.player.SnapLeft();
},
//Snap Turning Right
snapRight: function (){
	this.auxl.player.SnapRight();
},
//Joystick Other
questJoystickOther: function (e){
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
		if(this.angleDegOther > -22.5 && this.angleDegOther < 22.5){
			//Backward : -22.5 -> 22.5
			this.updateInput('Duck');
			this.action5Down();
		} else if(this.angleDegOther > 22.5 && this.angleDegOther < 67.5){
			//BackwardRight : 22.5 -> 67.5
			this.updateInput('Rotate Right');
			this.snapRightHit();
		} else if(this.angleDegOther > 67.5 && this.angleDegOther < 112.5){
			//Right : 67.5 -> 112.5
			this.updateInput('Rotate Right');
			this.snapRightHit();
		} else if(this.angleDegOther > 112.5 && this.angleDegOther < 157.5){
			//ForwardRight : 112.5 -> 157.5
			this.updateInput('Rotate Right');
			this.snapRightHit();
		} else if(this.angleDegOther > 157.5 || this.angleDegOther < -157.5){
			//Forward : 157.5 -> 180 or -157.5 -> -180
			this.updateInput('Stand');
			this.action6Down();
		} else if(this.angleDegOther < -112.5 && this.angleDegOther > -157.5){
			//ForwardLeft: -112.5 -> -157.5
			this.updateInput('Rotate Left');
			this.snapLeftHit();
		} else if(this.angleDegOther < -67.5 && this.angleDegOther > -112.5){
			//Left : -67.5 -> -112.5
			this.updateInput('Rotate Left');
			this.snapLeftHit();
		} else if(this.angleDegOther < -22.5 && this.angleDegOther > -67.5){
			//BackwardLeft: -22.5 -> -67.5 
			this.updateInput('Rotate Left');
			this.snapLeftHit();
		}
	} else {
		this.updateInput('Rotation|Duck Clear');
	}
},

blank: function (e){
	console.log(e);
	this.updateInput('Blank Button');
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

	//Desktop
	document.addEventListener('click', this.mainClickE);
	document.addEventListener('contextmenu', this.dispatchAlt);
	document.addEventListener('keydown', this.keyboardDownHit);
	document.addEventListener('keyup', this.keyboardUpHit);

//Allow elements to spawn before grabbing/assigning
let initTimeout = setTimeout(() => {

	//Locomotion Component
	this.locomotion = document.getElementById('playerRig').components.locomotion;

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
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else if(this.auxl.vrHand === 'bothLeft' || this.auxl.vrHand === 'bothRightLoco'){
		//Right Locomotion
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Left Other
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else {
		//Left Locomotion
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	}
}, 100);


	//Mobile
	this.mobileUpLeft.addEventListener('mousedown', this.directionForwardLeftDown);
	this.mobileUpLeft.addEventListener('mouseup', this.directionForwardLeftUp);
	this.mobileUp.addEventListener('mousedown', this.directionForwardDown);
	this.mobileUp.addEventListener('mouseup', this.directionForwardUp);
	this.mobileUpRight.addEventListener('mousedown', this.directionForwardRightDown);
	this.mobileUpRight.addEventListener('mouseup', this.directionForwardRightUp);
	this.mobileLeft.addEventListener('mousedown', this.directionLeftDown);
	this.mobileLeft.addEventListener('mouseup', this.directionLeftUp);
	this.mobileCenter.addEventListener('mousedown', this.blankHit);
	this.mobileCenter.addEventListener('mouseup', this.blankHit);
	this.mobileRight.addEventListener('mousedown', this.directionRightDown);
	this.mobileRight.addEventListener('mouseup', this.directionRightUp);
	this.mobileDownLeft.addEventListener('mousedown', this.directionBackwardLeftDown);
	this.mobileDownLeft.addEventListener('mouseup', this.directionBackwardLeftUp);
	this.mobileDown.addEventListener('mousedown', this.directionBackwardDown);
	this.mobileDown.addEventListener('mouseup', this.directionBackwardUp);
	this.mobileDownRight.addEventListener('mousedown', this.directionBackwardRightDown);
	this.mobileDownRight.addEventListener('mouseup', this.directionBackwardRightUp);
	this.mobileSelect.addEventListener('mousedown', this.blankHit);
	//this.mobileSelect.addEventListener('mouseup', this.blankHit);
	this.mobileStart.addEventListener('mousedown', this.blankHit);
	//this.mobileStart.addEventListener('mouseup', this.blankHit);
	this.mobileSnapLeft.addEventListener('mousedown', this.snapLeftHit);
	//this.mobileSnapLeft.addEventListener('mouseup', this.blankHit);
	this.mobileSnapRight.addEventListener('mousedown', this.snapRightHit);
	//this.mobileSnapRight.addEventListener('mouseup', this.blankHit);
	this.mobileA.addEventListener('mousedown', this.action1Down);
	this.mobileA.addEventListener('mouseup', this.action1Up);
	this.mobileB.addEventListener('mousedown', this.action2Down);
	this.mobileB.addEventListener('mouseup', this.action2Up);
	this.mobileC.addEventListener('mousedown', this.action3Down);
	this.mobileC.addEventListener('mouseup', this.action3Up);
	this.mobileD.addEventListener('mousedown', this.action4Down);
	this.mobileD.addEventListener('mouseup', this.action4Up);
	this.mobileE.addEventListener('mousedown', this.action5Down);
	this.mobileE.addEventListener('mouseup', this.action5Up);
	this.mobileF.addEventListener('mousedown', this.action6Down);
	this.mobileF.addEventListener('mouseup', this.action6Up);
	//touchstart
	//touchend
	//touchcancel
	//touchmove

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
	this.mobileSnapLeft.removeEventListener('mousedown', this.snapLeftHit);
	//this.mobileSnapLeft.removeEventListener('mouseup', this.blankHit);
	this.mobileSnapRight.removeEventListener('mousedown', this.snapRightHit);
	//this.mobileSnapRight.removeEventListener('mouseup', this.blankHit);
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

},
});


//
//Dev
AFRAME.registerComponent('vr-input-test', {
dependencies: ['auxl'],
//schema: {
	//bar: {type: 'number'},
	//baz: {type: 'string'}
//},

init: function () {


let timeout = setTimeout(function () {

const displayInput = document.querySelector('#displayInput');

let displayInputText = {value: 'No Input', color: 'white', align: 'center'}

function updateInput(input){

displayInputText.value = input;
displayInput.setAttribute('text',displayInputText);

}


const vrController1 = document.getElementById('vrController1');
const vrController2 = document.getElementById('vrController2');

console.log(vrController1)
console.log(vrController2)


	//Triggers
	//
	//Main Trigger
	vrController1.addEventListener('triggerdown', function (e) {
		updateInput('left main trigger');
	});

	//
	//Secondary Trigger
	vrController1.addEventListener('gripdown', function (e) {
		updateInput('left secondary trigger');
	});
	//
	//Main Trigger
	vrController2.addEventListener('triggerdown', function (e) {
		updateInput('right main trigger');
	});

	//
	//Secondary Trigger
	vrController2.addEventListener('gripdown', function (e) {
		updateInput('right secondary trigger');
	});

	//Buttons
	//
	//Right Controller - Button 1 (A)
	vrController2.addEventListener('abuttondown', function (e) {
		updateInput('right button 1');
	});
	//
	//Right Controller - Button 2 (B)
	vrController2.addEventListener('bbuttondown', function (e) {
		updateInput('right button 2');
	});
	//
	//Left Controller - Button 1 (X)
	vrController1.addEventListener('xbuttondown', function (e) {
		updateInput('left button 1');
	});
	//
	//Left Controller - Button 2 (Y)
	vrController1.addEventListener('ybuttondown', function (e) {
		updateInput('left button 2');
	});

	//Joystick
	//
	//Controller
	vrController1.addEventListener('thumbstickmoved', function (e) {
		if (e.detail.y > 0.95) { 
			updateInput('left down');
		}
		if (e.detail.y < -0.95) { 
			updateInput('left up');
		}
		if (e.detail.x < -0.95) { 
			updateInput('left left');
		}
		if (e.detail.x > 0.95) { 
			updateInput('left right');
		}
	});
	vrController2.addEventListener('thumbstickmoved', function (e) {
		if (e.detail.y > 0.95) { 
			updateInput('right down');
		}
		if (e.detail.y < -0.95) { 
			updateInput('right up');
		}
		if (e.detail.x < -0.95) { 
			updateInput('right left');
		}
		if (e.detail.x > 0.95) { 
			updateInput('right right');
		}
	});




}, 250);






    }//End Init
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
