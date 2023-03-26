//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 - System

//auxl
//AUXL System : System, ObjGens & Support Functions
AFRAME.registerSystem('auxl', {
init: function () {
// System
/*************************************************************/
//
//HTML Elements
const sceneEl = document.querySelector('a-scene');
const head = document.querySelector('head');
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
const controllerBlock = document.getElementById('controllerBlock');
let playerRig;
let camera;
let cameraUI;
let playerPointLight;
let playerFloor;
let mouseController;
let vrController1;
let vrController1UI;
let vrController2;
let vrController2UI;
//System
let auxl = this;
this.expStarted = false;
this.defaultScenario;
//Throttled Scene Loading Function
this.checkSceneLoadThrottled = AFRAME.utils.throttle(this.checkSceneLoad, 30, this);
this.loadingScene = false;
this.loadingObjects = new Map();
this.jsLoaded = {};
//JS Scripts Predefined, Ready to be loaded dynamically
this.jsAll = {
['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',
//threeGradShader: 'https://unpkg.com/@tlaukkan/aframe-three-color-gradient-shader@0.0.1/index.js',//Shaders needs it's own checker
};
//Menu
this.menuOpen = true;
this.infoOpen = false;
this.audioEnabled = false;
this.universalControls;
this.controls = 'Desktop';
this.vrHand = 'bothRight';
this.mobilePermissionGranted = false;
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
this.objGenTracking = {
core:{type:'core', spawn: 'SpawnCore', despawn: 'DespawnCore'},
layer:{type:'layer', spawn: 'SpawnLayer', despawn: 'DespawnLayer'},
menu:{type:'menu', spawn: 'SpawnMenu', despawn: 'DespawnMenu'},
singleGen:{type:'singleGen', spawn: 'SpawnObjRing', despawn: 'DespawnObjRing'},
multiGen:{type:'multiGen', spawn: 'SpawnMultiAsset', despawn: 'DespawnMultiAsset'},
ham:{type:'ham', spawn: 'SpawnHam', despawn: 'DespawnHam'},
teleport:{type:'teleport', spawn: 'SpawnTeleport', despawn: 'DespawnTeleport'},
npc:{type:'npc', spawn: 'SpawnNPC', despawn: 'DespawnNPC'},
speechSystem:{type:'speechSystem', spawn: 'SpawnSpeech', despawn: 'DespawnSpeech'},
book:{type:'book', spawn: 'SpawnBook', despawn: 'DespawnBook'},
horizon:{type:'horizon', spawn: 'SpawnHorizon', despawn: 'DespawnHorizon'},
skyBox:{type:'skyBox', spawn: 'SpawnSkyBox', despawn: 'DespawnSkyBox'},
imageSwapper:{type:'imageSwapper', spawn: 'SpawnImgSwap', despawn: 'DespawnImgSwap'},
imageCarousel:{type:'imageCarousel', spawn: 'SpawnImgCarousel', despawn: 'DespawnImgCarousel'},
memory:{type:'memory', spawn: 'SpawnMemGame', despawn: 'DespawnMemGame'},
};
//Add Custom Built Object to Tracker
this.AddObjGenToTracker = (type, spawn, despawn) => {
	auxl.objGenTracking[type] = {};
	auxl.objGenTracking[type].type = type;
	auxl.objGenTracking[type].spawn = spawn;
	auxl.objGenTracking[type].despawn = despawn;
}
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
		for(let types in auxl.objGenTracking){
			if(auxl[obj][auxl.objGenTracking[types].spawn]){
				type = auxl.objGenTracking[types].type;
				id = auxl[obj][type].id;
				break;
			}
		}
		if(type){}else{
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
//Clear Spawned from Scenario, Zone, Node or Book
function clearSpawned(spawned){
	for(let spawn in spawned){
		if(auxl[spawn]){
			auxl[spawn][auxl.objGenTracking[spawned[spawn].type].despawn]();
		} else {
			auxl[spawn].obj[auxl.objGenTracking[spawned[spawn].type].despawn]();
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
//Day|Night Time Length
this.timeInDay = 360000;

//
//HTML Menu
function toggleMenu(){
	if(auxl.menuOpen){
		beginDiv.style.display = 'none';
		auxl.menuOpen = false;
		if(auxl.infoOpen){
			toggleInfo();
		}
	} else {
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
	vrController1.setAttribute('visible',false);
	vrController2.setAttribute('visible',false);
	vrController1UI.setAttribute('visible',false);
	vrController2UI.setAttribute('visible',false);
	vrController1.removeAttribute('cursor');
	vrController2.removeAttribute('cursor');
	vrController1.removeAttribute('laser-controls');
	vrController2.removeAttribute('laser-controls');
}
function enableVRControls(){
	if(auxl.vrHand === 'bothRight'){
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController1.setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 1});
		auxl.player.EnableVRLocomotion();
	} else if(auxl.vrHand === 'bothLeft'){
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 2});
		auxl.player.EnableVRLocomotion();
	} else if(auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'bothLeftLoco'){
		vrController1.setAttribute('visible',true);
		vrController2.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: 'false'});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		vrController2.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 3});
		auxl.player.EnableVRLocomotion();
	} else if(auxl.vrHand === 'right'){
		vrController2.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 4});
		auxl.player.EnableVRHoverLocomotion('vrController2');
	} else if(auxl.vrHand === 'left'){
		vrController1.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 5});
		auxl.player.EnableVRHoverLocomotion('vrController1');
	}
}
//Desktop
function disableDesktopControls(){
	mouseController.setAttribute('visible',false);
	mouseController.removeAttribute('raycaster');
	mouseController.removeAttribute('cursor');
}
function enableDesktopControls(){
	mouseController.setAttribute('visible',true);
	mouseController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true',});
	playerRig.setAttribute('universal-controls',{update: 0});
	auxl.player.EnableDesktopLocomotion();
}
//Mobile
function disableMobileControls(){
	mouseController.setAttribute('visible',false);
	mouseController.removeAttribute('raycaster');
	mouseController.removeAttribute('cursor');
	controllerBlock.style.display = 'none';
}
function enableMobileControls(){
	/*
	function mobilePermissionGrantedTrue(){
		auxl.mobilePermissionGranted = true;
	}
	function mobilePermissionGrantedFalse(){
		auxl.mobilePermissionGranted = false;
	}*/
	//deviceorientationpermissiongranted
	//deviceorientationpermissionrejected
	//deviceorientationpermissionrequested
	//sceneEl.setAttribute('device-orientation-permission-ui', {enabled: true});
	//sceneEl.addEventListener('deviceorientationpermissiongranted', mobilePermissionGrantedTrue);
	//sceneEl.addEventListener('deviceorientationpermissionrejected', mobilePermissionGrantedFalse);
	mouseController.setAttribute('visible',true);
	mouseController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	controllerBlock.style.display = 'flex';
	playerRig.setAttribute('universal-controls',{update: 6});
	auxl.player.EnableMobileLocomotion();
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
//Menu Controls Button
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
//Cycle VR Configurations
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
//Toggle Audio
function toggleAudio(){
	if(auxl.audioEnabled){
		auxl.audioEnabled = false;
		audioButton.innerHTML = 'Sound : Disabled';
	} else {
		auxl.audioEnabled = true;
		audioButton.innerHTML = 'Sound : Enabled';
	}
}
audioButton.addEventListener('click', toggleAudio);

//
//Toggle Instructions
function toggleInfo(){
	if(auxl.infoOpen){
		expInfo.style.display = 'none';
		auxl.infoOpen = false;
	} else {
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
//Generate a color theory palette from a given color, color family or a random color. Exported object contains Base, Complementary, Split-complementary, Triadic, Tetradic, Analagous & Monochrome(Not Yet)
this.colorTheoryGen = (color, family) => {
//color accepts Hex values only at the moment, more options coming soon
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

	if (h.length == 4) {
	r = "0x" + h[1] + h[1];
	g = "0x" + h[2] + h[2];
	b = "0x" + h[3] + h[3];

	} else if (h.length == 7) {
	r = "0x" + h[1] + h[2];
	g = "0x" + h[3] + h[4];
	b = "0x" + h[5] + h[6];
	}

	return {r,g,b};
}
function randomColorFamily(){
	//Ignore last 4 Black/White/Grey/Silver
	return colorFamily[Math.floor(Math.random()*(colorFamily.length-4))];
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

//
//Object Generators

//
//Entity Core
this.Core = (data) => {
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
		auxl.loadingObjects.delete(core.id);
	}
	//Generate Entity Element
	const Generate = () => {
		core.el = {};
		//Instead of adding a source to each object that uses a component, add it to auxl.jsAll to dynamically load instead
		if(core.sources){
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
		//Entity Type
		if(core.entity === 'preAdded'){
			core.el = document.getElementById(core.id);
		} else if(core.entity){
			core.el = document.createElement(core.entity);
		} else {
			core.el = document.createElement('a-entity');
		}
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
		//Class
		for (let key in core.classes) {
			core.el.classList.add(core.classes[key]);
		}
		//Animations
		let animationKeys = Object.keys(core.animations);
		let animationValues = Object.values(core.animations);
		for (let key in animationKeys) {
			if(key === 0){} else {
				core.el.setAttribute('animation__'+animationKeys[key], animationValues[key]);
			}
		}
		//Wait for Model to Load?
		if(core.components['gltf-model'] || core.components['obj-model']){
			load3D = true;
		}
		//Components with auxl.jsAll dynamic JS loading support
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
	//Spawn Entity Object
	const SpawnCore = (parent) => {
		let needParent = parent || false;
		//Generate Entity Element
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
	//Despawn Entity Object
	const DespawnCore = (parent, layer) => {
		//Loaded Events
		if(load3D){
			core.el.removeEventListener('model-loaded', loaded);
		}
		if(loadMat || loadNewMat){
			core.el.removeEventListener('loaded', loaded);
		}
		//Remove all core.components to remove all event listeners before clearing from scene
		let componentKeys = Object.keys(core.components);
		for (let key in componentKeys) {
			if(key === 0){} else {
				GetEl().removeAttribute(componentKeys[key])
			}
		}
		let needParent = parent || false;
		let fromLayer = layer || false;
		//Remove from Scene or Parent
		if(needParent){
			needParent.removeChild(core.el);
		} else {
			sceneEl.removeChild(core.el);
		}
		//Scene Tracking Support
		if(fromLayer){} else {
			RemoveFromTracker(core.id);
		}
	}
	//Change Element - Single or Array
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
	//Remove Element Component
	const RemoveComponent = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				GetEl().removeAttribute(property[each]);
			}
		} else {
			GetEl().removeAttribute(property);
		}
	}
	//Prepare Animation Input for Animate()
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
	//Add Animation to Element - Single or Array
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
	//Return Element in Scene
	const GetEl = () => {
		let aEl = document.getElementById(core.id);
		if(aEl){}else{
			return false;
		}
		return aEl;
	}
	//Emit Event from Entity Element - Single or Array
	const EmitEvent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				GetEl().emit(eventName[each],{bubbles: false});
			}
		} else {
			GetEl().emit(eventName,{bubbles: false});
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			core[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			core[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(core(flag[each]));
			}
			return flagArray;
		} else {
			return core[flag];
		}
	}
	//Prep Details for Scene Display
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
	//Open Details Support
	function detailPrompt_open(){
	let elGenDelay = setTimeout(function () {
		core.detailMain.core.el.emit('open',{});
		core.detailClose.core.el.emit('open',{});
		core.isOpen = true;
		clearTimeout(elGenDelay);
	}, 25);
	}
	//Close Details Support
	function detailPrompt_close(){
		core.detailMain.core.el.emit('close',{});
		core.detailClose.core.el.emit('close',{});
		let elDelDelay = setTimeout(function () {
			core.detailAll.DespawnLayer(true);
			core.isOpen = false;
			clearTimeout(elDelDelay);
		}, 550);
	}
	//Toggle Details Support
	function openClose(){
		function closePrompt(){
			core.detailClose.core.el.removeEventListener('click',closePrompt);
			core.isOpen = detailPrompt_close();
		}
		if(core.isOpen){
			core.isOpen = detailPrompt_close();
			core.detailClose.core.el.removeEventListener('click',closePrompt);
		} else {
			core.detailAll.SpawnLayer();
			core.isOpen = detailPrompt_open();
			core.detailClose.core.el.addEventListener('click', closePrompt);
		}
	}
	//Enable Details Window on Click
	const EnableDetail = (detailInfo) => {
		if(details){} else {
			prepDetails(detailInfo.text, detailInfo.position, detailInfo.textColor, detailInfo.windowColor, detailInfo.windowWidth, detailInfo.windowHeight);
		}
			GetEl().addEventListener('click', openClose);
	}
	//Disable Details Window
	const DisableDetail = () => {
		GetEl().removeEventListener('click', openClose);
	}

	return {core, Generate, SpawnCore, DespawnCore, RemoveComponent, ChangeSelf, Animate, GetEl, EmitEvent, SetFlag, GetFlag, EnableDetail, DisableDetail};
}

//
//layered Cores
this.Layer = (id, all) => {
	let layer = {id, all};
	layer.children = {};
	layer.secondParents = [];
	layer.thirdParents = [];
	//Spawn Multi Entity Object
	const SpawnLayer = () => {
		for(let each in all){
			if(each === 'parent'){
				all[each].core.SpawnCore(false, true);
			} else {
				for(let a in all[each]){
					if(a === 'core'){
						layer.children[all[each].core.core.id] = {obj: all[each][a], parent: all.parent.core.core.el};
						all[each][a].SpawnCore(all.parent.core.core.el, true);
					} else {
						if(a === 'parent'){
							layer.children[all[each][a].core.core.id] = {obj: all[each][a].core, parent: all.parent.core.core.el};
							layer.secondParents.push(all[each][a].core);
							all[each][a].core.SpawnCore(all.parent.core.core.el, true);
						} else {
							for(let b in all[each][a]){
								if(b === 'core'){
									layer.children[all[each][a].core.core.id] = {obj: all[each][a][b], parent: all[each].parent.core.core.el};
									all[each][a][b].SpawnCore(all[each].parent.core.core.el, true);
								} else {
									if(b === 'parent'){
										layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b].core, parent: all[each].parent.core.core.el};
										layer.thirdParents.push(all[each][a][b].core);
										all[each][a][b].core.SpawnCore(all[each].parent.core.core.el, true);
									} else {
										for(let c in all[each][a][b]){
											if(c === 'parent'){
												console.log('Add support for more layers')
											} else {
												layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b][c], parent: all[each][a].parent.core.core.el};
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
	//Order of Despawning
	function layerOrder(object) {
		let result = [[], [], [], []];
		function traverse(object, depth) {
			for (let key in object) {
				if (object.hasOwnProperty(key)) {
					if (key === 'core') {
						result[depth].push(object[key]);
					} else if (key === "parent" && object[key].hasOwnProperty('core')) {
						result[depth].push(object[key].core);
					} else if (typeof object[key] === 'object') {
						traverse(object[key], depth + 1);
					}
				}
			}
		}

		traverse(object, 0);
		return result;
	}
	let accessOrder = layerOrder(layer.all);
	//Despawn Multi Entity Object
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
		//Scene Tracking Support
		if(other){} else {
			RemoveFromTracker(layer.id);
		}
	}
	//Return Parent Element in Scene
	const GetParentEl = () => {
		return layer.all.parent.core.GetEl();
	}
	//Emit Event from Parent Entity Element - Single or Array
	const EmitEventParent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				all.parent.core.EmitEvent(eventName[each]);
			}
		} else {
			all.parent.core.EmitEvent(eventName);
		}
	}
	//Emit Event from a Child Entity Element - Single or Array
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
	//Emit Event from All Entity Elements - Single or Array
	const EmitEventAll = (eventName) => {
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
	//Change Parent Element - Single or Array
	const ChangeParent = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				all.parent.core.ChangeSelf(propertyValue[each]);
			}
		} else {
			all.parent.core.ChangeSelf(propertyValue);
		}
	}
	//Change Child Element - Single or Array
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
	//Change All Elements - Single or Array
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
	//Remove Parent Element Component - Single or Array
	const RemoveComponentParent = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				all.parent.core.RemoveComponent(property[each]);
			}
		} else {
			all.parent.core.RemoveComponent(property);
		}
	}
	//Remove Child Element Component - Single or Array
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
	//Remove All Elements Component - Single or Array
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
	//Add Animation to Parent Element - Single or Array
	const AnimateParent = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				all.parent.core.Animate(animProps[each]);
			}
		} else {
			all.parent.core.Animate(animProps);
		}
	}
	//Add Animation to Child Element - Single or Array
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
	//Add Animation to All Elements - Single or Array
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
	//Set Flag & Value to Parent Object - Single or Array
	const SetFlagParent = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				all.parent.core.SetFlag(flagValue[each]);
			}
		} else {
			all.parent.core.SetFlag(flagValue);
		}
	}
	//Set Flag & Value to Child Object - Single or Array
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
	//Set Flag & Value to All Objects - Single or Array
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
	//Retreive Flag Value from Parent Object - Single or Array
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
	//Retreive Flag Value from Child Object - Single or Array
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
	//Retreive Flag Value from All Objects - Single or Array
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
	//Enable Details for Parent Object
	const EnableDetailParent = (detailInfo) => {
		all.parent.core.EnableDetail(detailInfo);
	}
	//Enable Details for Child Object
	const EnableDetailChild = (child, detailInfo) => {
		GetChild(child).EnableDetail(detailInfo);
	}
	//Enable Details for All Objects
	const EnableDetailAll = (detailInfo) => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.EnableDetail(detailInfo);
			}
		}
	}
	//Disable Details for Parent Object
	const DisableDetailParent = () => {
		all.parent.core.DisableDetail();
	}
	//Disable Details for Child Object
	const DisableDetailChild = (child) => {
		GetChild(child).DisableDetail();
	}
	//Disable Details for All Objects
	const DisableDetailAll = () => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.DisableDetail();
			}
		}
	}
	//Support by returning child core object from name
	const GetChild = (childName) => {
		let result = [];
		function traverse(object, depth) {
			for (let key in object) {
				if (object.hasOwnProperty(key)) {
					if (key === 'core') {
						if(object[key].core.id === childName){
							result.push(object[key]);
							return;
						}
					} else if (key === "parent" && object[key].hasOwnProperty('core')) {
						if(object[key].core.core.id === childName){
							result.push(object[key].core);
							return;
						}
					} else if (typeof object[key] === 'object') {
						traverse(object[key], depth + 1);
					}
				}
			}
		}

		traverse(layer.all, 0);
		if(result[0]){
			return result[0];
		} else {
			console.log('Unable to find child');
		}
	}

	return {layer, SpawnLayer, DespawnLayer, GetParentEl, EmitEventParent, EmitEventChild, EmitEventAll, ChangeParent, ChangeChild, ChangeAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, AnimateParent, AnimateChild, AnimateAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, EnableDetailParent, EnableDetailChild, EnableDetailAll, DisableDetailParent, DisableDetailChild, DisableDetailAll, GetChild};

}

//
//Player
this.Player = (layer) => {
	//Build directly off of imported Layer and load right away as only single player is supported

	//Default Transition Type
	//instant
	//fade
	//sphere
	//blink
	layer.transition = 'fade';
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

	//Spawn Player
	layer.SpawnLayer(true);
	//Currently not tracking Player object as it should not be removed

	//Grab HTML Elements that have spawned
	playerRig = document.getElementById('playerRig');
	camera = document.getElementById('camera');
	cameraUI = document.getElementById('cameraUI');
	playerPointLight = document.getElementById('playerPointLight');
	playerFloor = document.getElementById('playerFloor');
	mouseController = document.getElementById('mouseController');
	vrController1 = document.getElementById('vrController1');
	vrController1UI = document.getElementById('vrController1UI');
	vrController2 = document.getElementById('vrController2');
	vrController2UI = document.getElementById('vrController2UI');

	//Scene Load Animation Support
	const PlayerSceneAnim = () => {
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
	//Player Transition Animation
	const PlayerTeleportAnim = () => {
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
	//Display Camera UI Notification
	const Notification = (notificationInfo) => {
		displayTime = notificationInfo.time || 3750;
		TempDisableClick(displayTime);
		auxl.cameraUI.ChangeSelf({property: 'text', value: {value: notificationInfo.message, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
		auxl.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
		auxl.cameraUI.EmitEvent('cameraMsg');
		notificationTimeout = setTimeout(function () {
			auxl.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(notificationTimeout);
		}, displayTime);
	}
	//Set Flag & Value to Player - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			layer[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			layer[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Player - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(layer(flag[each]));
			}
			return flagArray;
		} else {
			return layer[flag];
		}
	}
	//Add Item/Key to Player Inventory - Single or Array
	const AddToInventory = (item) => {
		if(Array.isArray(item)){
			for(let each in item){
				layer.inventory.push(item[each]);
				layer[item[each]] = true;
			}
		} else {
			layer.inventory.push(item);
			layer[item] = true;
		}
		if(auxl.ham.ham.show){
			UpdateInventoryScreen();
		}
		//Notifications
		inventoryTimeouts = [];
		if(Array.isArray(item)){
			for(let each in item){
				let delay = 3800;
				delay *= each;
				inventoryTimeouts[each] = setTimeout(function () {
					Notification({message:'Acquired : ' + item[each]});
					clearTimeout(inventoryTimeouts[each]);
				}, delay);
			}
		} else {
			Notification({message:'Acquired : ' + item});
		}
	}
	//Remove Item/Key to Player Inventory - Single or Array
	const RemoveFromInventory = (item) => {
		if(Array.isArray(item)){
			for(let each in item){
				layer.inventory.splice(layer.inventory.indexOf(item[each]), 1);
				layer[item[each]] = false;
			}
		} else {
			layer.inventory.splice(layer.inventory.indexOf(item), 1);
			layer[item] = false;
		}
		if(auxl.ham.ham.show){
			UpdateInventoryScreen();
		}
		//Notifications
		inventoryTimeouts = [];
		if(Array.isArray(item)){
			for(let each in item){
				let delay = 3800;
				delay *= each;
				inventoryTimeouts[each] = setTimeout(function () {
					Notification({message:'Removed : ' + item[each]});
					clearTimeout(inventoryTimeouts[each]);
				}, delay);
			}
		} else {
			Notification({message:'Removed : ' + item});
		}
	}
	//Check if Item/Key is in Player Inventory - Single or Array
	const CheckInventory = (item) => {
		if(Array.isArray(item)){
			let itemArray = [];
			for(let each in item){
				if(layer.inventory.includes(item)){
					itemArray.push(true);
				} else {
					itemArray.push(false);
				}
			}
			return itemArray;
		} else {
			if(layer.inventory.includes(item)){
				return true;
			} else {
				return false;
			}
		}
	}
	//Update Inventory Display Screen
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
	//Disable Player Selection for a Time
	const TempDisableClick = (time) => {
		let delayTime = time || 1000;
		DisableClick();
		let disableTimeout = setTimeout(function () {
			EnableClick();
			clearTimeout(disableTimeout);
		}, delayTime);
	}
	//Disable Player Selection
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
	//Enable Player Selection
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
	//Change Player Transition Color
	const UpdateTransitionColor = (newColor) => {
		auxl.fadeScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.sphereScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink1Screen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink2Screen.ChangeSelf({property: 'material', value:{color: newColor}});
	}
	//Enable VR Controller Joystick Locomotion
	const EnableVRLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'vr'});
	}
	//Enable VR Belt UI Locomotion
	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer(true);
		}
		playerRig.setAttribute('locomotion',{uiid: 'beltUIParent', courserid: 'mouseController', movetype: 'vrHover'});
	}
	//Enable Desktop Locomotion
	const EnableDesktopLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'desktop'});
	}
	//Enable Mobile Locomotion
	const EnableMobileLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'mobile'});
	}
	//Despawn VR Belt UI
	const RemoveBelt = () => {
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.DespawnLayer(true);
		}
	}
	//Toggle Sitting|Standing View Mode
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
	//Toggle Player Crouch
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
	//Play Snap View Anim to the Right
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
	//Play Snap View Anim to the Left
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

	return {layer, PlayerSceneAnim, PlayerTeleportAnim, Notification, SetFlag, GetFlag, AddToInventory, RemoveFromInventory, CheckInventory, UpdateInventoryScreen, TempDisableClick, DisableClick, EnableClick, UpdateTransitionColor, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight, SnapLeft}
}

//
//Menu
this.Menu = (menuData) => {
	let menu = {};
	menu.data = Object.assign({}, menuData.data);
	menu.id = menuData.id || 'menu';
	menu.prompt = menuData.prompt;
	menu.options = menuData.options;
	menu.actions = menuData.actions;
	menu.layers = {};
	menu.layer = {};
	let prompt = {};
	let menuOption = {};
	let menuOptions = [];
	let menuNum = 0;
	let menuLength = Object.keys(menu.options).length;
	//Reset component data
	menu.clickrun = {};
	menu.clickrun.cursorObj = menuData.cursorObj || false;
	menu.clickrun.method = menuData.method || 'Click';
	menu.clickrun.params = menuData.params || 'null';
	//Menu Style
	menu.layout = menuData.layout;
	//Default Start Position
	menu.data.position.x = menuData.pos.x;
	menu.data.position.y = menuData.pos.y;
	menu.data.position.z = menuData.pos.z;

	//Generate & Spawn Menu
	const SpawnMenu = () => {
		menuNum=0;
		menuOptions = [];
		menuOption = {};
		//Layer Parent Prompt
		menu.data.id = menu.id + 'prompt';
		menu.data.text.value = menu.prompt;
		menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
		prompt = auxl.Core(menu.data);
		menu.layers = {
		parent: {core: prompt},}
		menu.data.position.x = menu.data.geometry.width * 1.15;
		menu.data.position.z = 0;
		if(menuLength === 1 || menu.layout === 'horizontal'){
			menu.data.position.y = 0;
		} else {
			menu.data.position.y = (menu.data.geometry.height*0.75) * menuLength/2;
		}
		//Reset component data
		menu.data.sources = {};
		menu.data.components = {};
		menu.data.components.clickrun = {};
		menu.data.components.clickrun.cursorObj = menu.clickrun.cursorObj ;
		menu.data.components.clickrun.method = menu.clickrun.method;
		menu.data.components.clickrun.params = menu.clickrun.params;
		//Layer Children Options
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
			menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
			menu.data.text.value = menu.options[menuItem];
			menu.data.id = menu.id + 'option' + menuNum;
			menu.data.components.result = menu.actions['action'+menuNum];
			menuOption = auxl.Core(menu.data);
			menuOptions.push(menuOption);
			menu.layers['child'+menuNum] = {core: menuOptions[menuNum]}
			menuNum++;
		}
		menu.layer = auxl.Layer(menu.id, menu.layers);
		menu.layer.SpawnLayer(true);
	}
	//Despawn Menu
	const DespawnMenu = () => {
		menu.layer.DespawnLayer(true);
	}
	//Attach Menu to Tracker matching object generator 
	const AddToParentSpawnTracker = (obj, parent) => {
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
	//Remove Menu from Tracker matching object generator 
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

	return {menu, SpawnMenu, DespawnMenu, AddToParentSpawnTracker, RemoveMenuFromSceneTracker};
}

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
this.SceneNode = (sceneData) => {
	let core = Object.assign({}, sceneData);
	//Scene Text Support
	let textBubble = auxl.Core(this.sceneTextData);
	let sceneText = auxl.SpeechSystem(textBubble);
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	}
	//Add Timeout, Interval, Interaction & Event listeners to NodeScene Tracker
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
	//Remove Timeout, Interval, Interaction & Event listeners from NodeScene Tracker
	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}
	//Clear All Timeout, Interval, Interaction & Event NodeScene Tracker Listeners
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
	//Exit & Clear NodeScene
	const ClearScene = () => {
		Exit();
		ClearSceneTimeIntEvt();
		clearSpawned(auxl.nodeSpawned);
	}
	//Run Object Generator Function within NodeScene w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn){
				spawnTracker(object, 'node');
			}
		}
		auxl[object][func](params);
	}
	//Read NodeScene Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			//Check for special object support
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
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
					/*
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}*/
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											/*
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}*/
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										/*
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromTimeIntEvtTracker(line+b);
										}*/
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
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

								AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
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

								AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else {
				//Reading non-special timeline, read normally
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
						//Data only
					} else {
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
		return;
	}
	//Read NodeScene Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into NodeScene
	const AddControls = () => {
		readTimeline('controls');
	}
	//Remove NodeScene Controls
	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}
	//Read NodeScene Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read NodeScene Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read NodeScene Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read NodeScene Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read NodeScene Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read NodeScene Exit Section & Remove NodeScene Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
		if(core.info.sceneText){
			sceneText.KillStop();
		}
	}
	//Support to Connect NodeScenes
	const Map = () => {
		readTimeline('map');
	}
	//NodeScene Start
	const StartScene = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
		sceneTextDisplay();
	}
	//Scene Text Support
	const sceneTextDisplay = () => {
		if(core.info.sceneText){
			sceneText.Start();
			sceneText.DisplaySpeech({role: core.info.name,speech: '...'});
			let sceneTextTimeout = setTimeout(function () {
				sceneText.DisplaySpeech({role: core.info.name,speech: core.info.description});
				clearTimeout(sceneTextTimeout);
			}, 1250);
		}
	}

	return {core, ClearScene, StartScene}
}

//
//Map Zone Gen & reader
//mapRegionDistrictTerritoryZoneSection
this.MapZone = (mapZoneData) => {
	let core = Object.assign({}, mapZoneData);
	core.mapMenuData = false;
	core.mapMenu;
	core.nodes = {};
	core.info;
	core.currentNode;
	core.zoneLoaded = false;
	//Map Movement Support
	let timeout;
	let timeout2;
	let newNode;

	//Prepare Zone Map
	const ReadMapData = () => {
		for(let key in core){
			if(key === 'info'){
				core.info = core[key]
			} else if(key === 'controls' || key === 'start' || key === 'delay' || key === 'interval' || key === 'event' || key === 'interaction' || key === 'exit'){
				//Ignore
			} else {
				core.nodes[key] = auxl[key];
			}
		}
	}
	ReadMapData();
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	}
	//Run Object Generator Function within MapZone w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn){
				spawnTracker(object, 'zone');
			}
		}
		auxl[object][func](params);
	}
	//Add Timeout, Interval, Interaction & Event listeners to MapZone Tracker
	const AddToZoneTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId, method, params, event};
		}
	}
	//Remove Timeout, Interval, Interaction & Event listeners from MapZone Tracker
	const RemoveFromZoneTimeIntEvtTracker = (name) => {
		delete auxl.zoneRunning[name];
	}
	//Clear All Timeout, Interval, Interaction & Event MapZone Tracker Listeners
	const ClearZoneTimeIntEvt = () => {
		for(let ran in auxl.zoneRunning){
			if(auxl.zoneRunning[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.zoneRunning[ran].nameId]);
				delete auxl.timeouts[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.zoneRunning[ran].nameId]);
				delete auxl.intervals[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interaction' || auxl.zoneRunning[ran].type === 'event'){
auxl[auxl.zoneRunning[ran].name].GetEl().removeEventListener(auxl.zoneRunning[ran].event, function(){
auxlObjMethod(auxl.zoneRunning[ran].object,auxl.zoneRunning[ran].method,auxl.zoneRunning[ran].params);
});

			}
			RemoveFromZoneTimeIntEvtTracker(ran);
		}
	}
	//Read MapZone Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			//Check for special object support
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
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
					/*
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}*/
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											/*
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}*/
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromZoneTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										/*
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromZoneTimeIntEvtTracker(line+b);
										}*/
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
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

								AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
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

								AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else {
				//Reading non-special timeline, read normally
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
						//Data only
					} else {
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
		return;
	}
	//Read MapZone Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into MapZone
	const AddControls = () => {
		readTimeline('controls');
	}
	//Remove MapZone Controls
	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}
	//Read MapZone Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read MapZone Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read MapZone Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read MapZone Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read MapZone Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read MapZone Exit Section & Remove MapZone Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
	}
	//MapZone Start
	const StartZone = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
	}
	//Start NodeScene within MapZone
	const StartScene = (nodeName) => {
		core.currentNode = nodeName || core.info.start;
		core.currentZone = core.info.id;
		if(core.zoneLoaded){} else {
			StartZone();
			core.zoneLoaded = true;
		}
		auxl[core.currentNode].StartScene();
		MoveSpawnMenu();
	}
	//Exit & Clear NodeScene
	const ClearScene = () => {
		auxl[core.currentNode].ClearScene();
	}
	//Generate & Spawn MapZone Map Menu
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
		let currNum = 0;
		let moveToNode;
		for(let connect in core[core.currentNode]){
			//In Zone Node or Out of Zone Node
			if(core.nodes[core[core.currentNode][connect].node]){
				moveToNode = core.nodes[core[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core[core.currentNode][connect].node];
			}
			//Open, Locked or Unlocked Travel
			if(core[core.currentNode][connect].locked && !auxl.player.GetFlag(core[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Locked]';
			} else if(core[core.currentNode][connect].locked && auxl.player.GetFlag(core[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name;
			}
			core.mapMenuData.actions['action'+currNum] = connect;
			currNum++;
		}
		core.mapMenu = auxl.Menu(core.mapMenuData);
		core.mapMenu.SpawnMenu();
	}
	//MapZone Menu Click
	const MenuMoveClick = (el) => {
		let result = el.getAttribute('result');
		Move(result);
	}
	//Move Scenes
	const Move = (connect) => {
		newNode = core[core.currentNode][connect];
		//Check for Lock & Keys
		if(newNode.locked && !auxl.player.GetFlag(newNode.key)){
			clearTimeout(timeout2);
			auxl.player.Notification({message:'Requires : ' + newNode.key});
		} else {
			if(newNode.locked && auxl.player.GetFlag(newNode.key) && !newNode.keepKey){
				auxl.player.SetFlag({flag: newNode.key, value: false})
			}
			//Move to NodeScene and/or MapZone
			timeout = setTimeout(function () {
					core.mapMenu.DespawnMenu();
					ClearScene();
					if(core.nodes[newNode.node]){
						StartScene(newNode.node);
					} else {
						ClearZone();
						core.zoneLoaded = false;
						auxl[newNode.inZone].StartScene(newNode.node)
					}
				clearTimeout(timeout);
			}, 425);
			auxl.player.PlayerSceneAnim();
		}
	}
	//Clear Zone on Move
	const ClearZone = () => {
		Exit();
		ClearZoneTimeIntEvt();
		RemoveControls();
		clearSpawned(auxl.zoneSpawned);
	}

	return {core, StartScene, MoveSpawnMenu, MenuMoveClick, Move, ClearZone};
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

	//Check if default scenario, delay to allow object to be built
	let scenarioTimeout = setTimeout(function () {
		if(core.info.default){
			auxl.defaultScenario = auxl[core.info.id];
			updateHTMLTitle();
			updateHTMLInstructions();
		}
		clearTimeout(scenarioTimeout);
	}, 50);
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	}
	//Run Object Generator Function within Scenario w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn){
				spawnTracker(object, 'scenario');
			}
		}
		auxl[object][func](params);
	}
	//Remove Timeout, Interval, Interaction & Event listeners from Scenario Tracker
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
	//Clear All Timeout, Interval, Interaction & Event Scenario Tracker Listeners
	const RemoveFromScenarioTimeIntEvtTracker = (name) => {
		delete auxl.scenarioRunning[name];
	}
	//Clear All Timeout, Interval, Interaction & Event Scenario Tracker Listeners
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
	//Read Scenario Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.universalControls.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			//Check for special object support
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
					/*
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}*/
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											/*
											if(auxl[b].GetFlag(endCond) === 'true'){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}*/
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
										/*
										if(auxl[b].GetFlag(endCond) === 'true'){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromScenarioTimeIntEvtTracker(line+b);
										}*/
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
				//Reading non-special timeline, read normally
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
	//Update HTML w/Scenario Name
	function updateHTMLTitle(){
		scenarioHeaderTitle.innerHTML = scenarioName;
		scenarioMenuTitle.innerHTML = scenarioName;
	}
	//Update HTML w/Scenario Info
	function updateHTMLInstructions(){
		instructions.innerHTML = scenarioInstructions;
	}
	//Read Scenario Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into Scenario
	const AddControls = () => {
		readTimeline('controls');
	}
	//Remove Scenario Controls
	const RemoveControls = () => {
		auxl.universalControls.disableAction(core['controls']);
	}
	//Read Scenario Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read Scenario Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read Scenario Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read Scenario Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read Scenario Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read Scenario Exit Section & Remove Scenario Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
	}
	//Load all Scenario Items
	const Init = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
	}
	//Start Scenario
	const StartScenario = () => {
		if(core.scenarioLoaded){} else {
			auxl.player.PlayerSceneAnim();
			//Get Universal Controls component
			auxl.universalControls = document.getElementById('playerRig').components['universal-controls'];
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
	//Exit & Clear Scenario
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
	let skyBox = Object.assign({}, skyBoxData);
	let dayNightTimeout;
	let dayNightInterval;
	//Spawn All Light Core/Layers
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
	//Despawn All Light Core/Layers
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
	//Spawn All Sky Core/Layers
	const SpawnSky = () => {
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
	//Despawn All Sky Core/Layers
	const DespawnSky = () => {
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
	//Spawn All Sky Core/Layers
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
	//Despawn All Sky Core/Layers
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
	//Spawn SkyBox
	const SpawnSkyBox = () => {
		SpawnLights();
		SpawnSky();
		SpawnSpace();
	}
	//Despawn SkyBox
	const DespawnSkyBox = () => {
		clearTimeout(dayNightTimeout);
		clearInterval(dayNightInterval);
		DespawnLights();
		DespawnSky();
		DespawnSpace();
		RemoveFromTracker(skyBox.id);
	}
	//Sunrise Animation Event
	const Sunrise = () => {
		auxl.directionalLight.EmitEvent('sunrise');
		auxl.directionalLight2.EmitEvent('sunrise');
		auxl.directionalLight3.EmitEvent('sunrise');
		auxl.ambientLight.EmitEvent('sunrise');
		auxl.skyGrad.EmitEvent('sunrise');
		auxl.sunLayer.EmitEventParent('sunrise');
		auxl.moonLayer.EmitEventParent('sunrise');
	}
	//Suspend Day/Night Animation
	const PauseDayNight = () => {
		auxl.directionalLight.EmitEvent('pauseDayNight');
		auxl.directionalLight2.EmitEvent('pauseDayNight');
		auxl.directionalLight3.EmitEvent('pauseDayNight');
		auxl.ambientLight.EmitEvent('pauseDayNight');
		auxl.skyGrad.EmitEvent('pauseDayNight');
		auxl.sunLayer.EmitEventParent('pauseDayNight');
		auxl.moonLayer.EmitEventParent('pauseDayNight');
	}
	//Resume Day/Night Animation
	const ResumeDayNight = () => {
		auxl.directionalLight.EmitEvent('resumeDayNight');
		auxl.directionalLight2.EmitEvent('resumeDayNight');
		auxl.directionalLight3.EmitEvent('resumeDayNight');
		auxl.ambientLight.EmitEvent('resumeDayNight');
		auxl.skyGrad.EmitEvent('resumeDayNight');
		auxl.sunLayer.EmitEventParent('resumeDayNight');
		auxl.moonLayer.EmitEventParent('resumeDayNight');
	}
	//Looping Day/Night Cycle
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

			}, auxl.timeInDay/2);
		}, auxl.timeInDay/2 - auxl.timeInDay/24);
	}
	//Restart Day/Night Animation
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
	let horizon = Object.assign({}, horizonData);

	//Prep Material
	let top;
	let mid;
	let bottom;
	let colorPick;

	//Prep Density
	let spawnAmount;
	if(horizon.density === 'low'){
		spawnAmount = 5;
	} else if(horizon.density === 'normal'){
		spawnAmount = 10;
	} else if(horizon.density === 'high'){
		spawnAmount = 20;
	}

	//Prep Height
	let spawnHeight;
	if(horizon.height === 'low'){
		spawnHeight = 0.5;
	} else if(horizon.height === 'normal'){
		spawnHeight = 1;
	} else if(horizon.height === 'high'){
		spawnHeight = 1.5;
	}

	//Prep Width
	let spawnWidth;
	if(horizon.width === 'low'){
		spawnWidth = 0.5;
	} else if(horizon.width === 'normal'){
		spawnWidth = 1;
	} else if(horizon.width === 'high'){
		spawnWidth = 1.5;
	}

	//Prep Type
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
	//Horizon Layer
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
	//Horizon Parent
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
	let horizonParentId = 'horizonParent';
	let horizonParentCores = [];
	//Horizon Child
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
	let horizonChildId = 'horizonChild';
	let horizonChildCores = [];
	//Build Layer
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
	//Spawn Horizon
	const SpawnHorizon = () => {
		horizonLayer.SpawnLayer(true);
	}
	//Despawn Horizon
	const DespawnHorizon = () => {
		horizonLayer.DespawnLayer(true);
		RemoveFromTracker(horizon.id);
	}

	return {horizon, SpawnHorizon, DespawnHorizon};
}

//
//Story Book
//Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
this.Book = (core, npc) => {

	//Run Object Generator Function within Book w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn){
				spawnTracker(object, 'book', npc.id);
			}
		}
		auxl[object][func](params);
	}
	//Yield Timeline
	function* lineReader(book,time){
		for(let line in time){
			//Ignore Page Data
			if(line === 'id' || line === 'description' ||line === 'tags' ||line === 'nextPage' ||line === 'prevPage' ||line === 'timeline'){
				//page data only
			} else if(line === 'pureFunction'){
				//pure functions
				//not object generated methods
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in time[line]){
					auxlObjMethod(line,a,time[line][a]);
				}
			}
		}
		yield;
	}
	//Yield Time
	function* timeReader(book,page){
		for(let time in page){
			book.currentTimeline = time;
			book.timelineQue.push([time,page[time]]);
			//Skip|Ignore Data til timeline# reach if jumping
			if(time === core.jumpTo){
				core.jumping = false;
			}
			if(core.jumping){}else{
				yield* lineReader(book, page[time]);
			}
		}
	}
	//Yield Page
	function* pageReader(book){
		for(let page in book.pages){
			book.currentPage = page;
			book.pageQue.push([page,book.pages[page]]);
			yield* timeReader(book, book.pages[page]);
		}
	}
	//Yield Book
	function* bookReader(book){
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
		//Book Info & Contents
		//for(let setting in book.info){
			//console.log(setting);
			//console.log(book.info[setting]);
			//Book Info
			//id
			//description
			//tags
		//};

		//Start reading Pages
		yield* pageReader(book);
	};
	//Init Yield Gen Book
	let book = bookReader(core);
	//Read Book Timeline
	function readTimeline({page,time}){
		for(let line in core.pages[page][time]){
			if(line === 'pureFunction'){
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in core.pages[page][time][line]){
					auxl[line][a](core.pages[page][time][line][a]);
				}
			}
		}
		return;
	}
	//Next Yield
	const Next = () => {
		book.done = book.next().done;
		if(book.done){
			//console.log('All Done!');
		} else {
			//console.log('Continue...')
		}
	}
	//Jump to Timeline
	const Jump = ({timeline, page}) => {
		let toPage = page || core.currentPage;
		core.jumpTo = timeline;
		if(core.pages[toPage][core.jumpTo]){
			core.jumping = true;
		}
	}
	//Jump Menu
	const SelectJump = (jumpOptions) => {
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
		npc.GetEl().classList.toggle('clickable', false);
	}

	return {core, book, Next, Jump, SelectJump, readTimeline};
}

//
//Speech System
//Speaking Textbubble
this.SpeechSystem = (core) => {
	core.on = false;
	core.speaking = false;
	core.textDisplayInterval;
	//Start Textbubble
	const Start = () => {
		core.SpawnCore(false,false,true);
		core.GetEl().addEventListener('mouseenter', Skip);
		core.on = true;
	}
	//Skip to end of speech
	const Skip = () => {
		core.GetEl().emit('skip',{});
	}
	//Stop Textbubble
	const Stop = () => {
		core.GetEl().removeEventListener('mouseenter', Skip);
		core.DespawnCore(false,false,true);
		core.on = false;
	}
	//Kill Speech
	const Kill = () => {
		core.speaking = false;
		clearInterval(auxl.intervals[core.core.id]);
		delete auxl.intervals[core.core.id];
	}
	//Kill Speech & Stop Textbuble
	const KillStop = () => {
		Kill();
		Stop();
	}
	//Change Textbubble - Single or Array
	const ChangeCore = (setAlt) => {
		if(Array.isArray(setAlt)){
			for(let each in setAlt){
				core.ChangeSelf(setAlt[each])
			}
		} else {
			core.ChangeSelf(setAlt)
		}
	}
	//Speaking Controls
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
		}, 20);
	}
	//Add Textbubble Timeout, Interval, Interaction & Events to Tracker
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
	//Remove Textbubble Timeout, Interval, Interaction & Events to Tracker
	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}

	return {core, Start, Skip, KillStop, ChangeCore, DisplaySpeech};
}

//
//NPC
//Core Object w/ Book|Pages & Textbubble
this.NPC = (core, bookData, textDisplay) => {
	let npc = Object.assign({}, core);
	npc.id = npc.core.id;
	let bubble = Object.assign({}, textDisplay);
	let book;
	let text = auxl.SpeechSystem(bubble);
	let menuTimeout;

	//Spawn NPC, Reset Book & Start Speaking
	const SpawnNPC = () => {
		//Reset book on each spawn
		book = auxl.Book(bookData, npc);
		npc.SpawnCore(false,false,true);
		EnableSpeech();
	}
	//Despawn NPC
	const DespawnNPC = () => {
		ClearBookSpawn();
		DisableSpeech();
		npc.DespawnCore(false,false,true);
		RemoveFromTracker(npc.id);
	}
	//Clear Book Spawned Objects
	const ClearBookSpawn = () => {
		clearSpawned(auxl.bookSpawned[npc.id]);
		delete auxl.bookSpawned[npc.id];
	}
	//Prep & Start NPC Speaking
	const EnableSpeech = () => {
		text.Start();
		npc.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}})
		//Jump over Info to Timeline0
		NextPage();
		NextPage();
		npc.GetEl().addEventListener('mouseenter', NextPage);
		npc.GetEl().addEventListener('click', ResetBook);
	}
	//Disable NPC Speaking
	const DisableSpeech = () => {
		text.KillStop();
		npc.GetEl().removeEventListener('mouseenter', NextPage);
		npc.GetEl().removeEventListener('click', ResetBook);
	}
	//NPC Speaking
	const Speak = ({role,speech}) => {
		text.DisplaySpeech({role, speech});
	}
	//NPC Book Next Item
	const NextPage = () => {
		//Prevent pushing next speech until current is over or skipped to end
		if(text.core.on){
			if(text.core.speaking){} else {
				book.Next()
			}
		} else {
			book.Next()
		}
	}
	//Reset NPC Book
	const ResetBook = (force) => {
		if(book.book.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			NextPage();
			NextPage();
		}
	}
	//NPC Book Jump Menu Click
	const Click = (el) => {
		let result = el.getAttribute('result');
		Jump({timeline: result});
		book.Next();
		//Need to update after creating book control component
		npc.GetEl().classList.toggle('clickable', true);
		menuTimeout = setTimeout(function () {
			book.book.selectJumpMenu.DespawnMenu();
			book.book.selectJumpMenu.RemoveMenuFromSceneTracker();
			clearTimeout(menuTimeout);
		}, 250);
	}
	//NPC Book Jump
	const Jump = ({timeline, page}) => {
		book.Jump({timeline, page})
	}
	//NPC Book Menu Jump
	const SelectJump = (jumpOptions) => {
		book.SelectJump(jumpOptions);
	}
	//Run NPC Methods
	const auxlObjMethod = (object, func, params) => {
		//Only used to run NPC methods
		auxl[object][func](params);
	}
	//If/Else for NPC Methods
	const IfElse = (obj) => {
		let objRef = Object.keys(obj);
		let cond = obj[objRef].cond;
		let ifTrue = obj[objRef].ifTrue;
		let ifFalse = obj[objRef].ifFalse;
		if(auxl[objRef].GetFlag){
			if(auxl[objRef].GetFlag(cond)) {
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
		} else if(auxl[objRef].GetFlagParent){
			if(auxl[objRef].GetFlagParent(cond)) {
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
	}

	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			npc[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			npc[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(npc(flag[each]));
			}
			return flagArray;
		} else {
			return npc[flag];
		}
	}

return {npc, SpawnNPC, DespawnNPC, EnableSpeech, DisableSpeech, Speak, NextPage, ResetBook, Click, Jump, SelectJump, auxlObjMethod, IfElse, SetFlag, GetFlag}
}

//
//Ham Companion
//System Menu & Inventory
this.HamMenu = (id, core) => {
	let ham = Object.assign({}, core);
	ham.id = id;
	ham.systemOpen = false;
	ham.travelSettingsOpen = false;
	ham.sceneSettingsOpen = false;
	ham.show = false;
	ham.pos = auxl.playerRig.GetEl().getAttribute('position');
	//Hamburger Menu Companion - Main Menu, Settings and Controls
	//More Settings to be added

	//Travel|Site Menu
	let systemMenuButtons = {
	travelSettings: 'Travel Settings',
	sceneSettings: 'More Settings[DISABLED]',
	};
	let systemMenuTimeout;
	//Travel Settings : Instant, Blink, Fade, Sphere
	let travelSettingsButtons = {
	instant: 'Instant Transition',
	blink: 'Blink Transition',
	fade: 'Fade In/Out Transition',
	sphere: 'Sphere Transition',
	};
	let travelMenuTimeout;
	//Scene Settings : Color Themes, Accessibility, Scene Info, etc...
	let sceneSettingsButtons = {
	theme: 'Color Theme',
	accessibility: 'Accessibility Settings',
	author: 'Made by Minty Crisp!',
	};

	//Emoti Prep
	let speechIntervalB;
	let speechTimeoutB;

	//Emoticon Loop Display
	const autoScriptEmoticon = () => {
		//Emoticons
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
		for (speech of emotiSpeech()) {
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
			}, 2700);
		}, 250);
	}
	//Toggle Ham Display
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
	//Spawn & Start Ham
	const SpawnHam = () => {
		ham.SpawnCore(auxl.playerRig.GetEl(), false, true);
		ShowInventory();
		ham.show = true;
		autoScriptEmoticon();
		ham.GetEl().addEventListener('click', openCloseMenu);
	}
	//Despawn & Stop Ham
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
	//Display Inventory Screen attached to Ham
	const ShowInventory = () => {
		auxl.inventoryScreen.SpawnCore(ham.GetEl(), false, true);
		auxl.player.UpdateInventoryScreen();
	}
	//Remove Inventory Screen
	const HideInventory = () => {
		auxl.inventoryScreen.DespawnCore(ham.GetEl(), false, true);
	}
	//Toggle Ham Menu
	const openCloseMenu = () => {
		if(ham.systemOpen){
			closeSystemMenu();
		} else if(ham.travelSettingsOpen){
			closeTravelSettingsMenu()
			systemSpawnMenu();
		} else if(ham.sceneSettingsOpen){
			//Incomplete
		} else {
			systemSpawnMenu();
		}
	}
	//Close Any Opened Ham Menu
	const closeAll = () => {
		if(ham.systemOpen){
			closeSystemMenu();
		} else if(ham.travelSettingsOpen){
			closeTravelSettingsMenu()
		} else if(ham.sceneSettingsOpen){
			//Incomplete
		}
	}
	//Spawn Ham System Menu
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
			ham.systemMenuData.options['option'+currNum] = systemMenuButtons[options];
			ham.systemMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.systemMenu = auxl.Menu(ham.systemMenuData);
		ham.systemMenu.SpawnMenu();
		ham.systemMenu.AddToParentSpawnTracker(ham.systemMenu, ham);
		ham.GetEl().classList.toggle('clickable');
	}
	//Despawn Ham System Menu
	const closeSystemMenu = () => {
		ham.systemOpen = false;
		ham.systemMenu.DespawnMenu();
		ham.systemMenu.RemoveMenuFromSceneTracker();
	}
	//Ham System Menu Click
	const SystemMenuClick = (el) => {
		let result = el.getAttribute('result');
		systemMenuTimeout = setTimeout(function () {
			if(result === 'travelSettings'){
				travelSettingsSpawnMenu();
			} else if(result === 'sceneSettings'){
				//Incomplete
			}
			closeSystemMenu();
			clearTimeout(systemMenuTimeout);
		}, 250);
	}
	//Open Travel Menu
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
			ham.travelSettingsMenuData.options['option'+currNum] = travelSettingsButtons[options];
			ham.travelSettingsMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.travelSettingsMenu = auxl.Menu(ham.travelSettingsMenuData);
		ham.travelSettingsMenu.SpawnMenu();
		ham.systemMenu.AddToParentSpawnTracker(ham.travelSettingsMenu, ham);
	}
	//Close Travel Menu
	const closeTravelSettingsMenu = () => {
		ham.travelSettingsOpen = false;
		ham.travelSettingsMenu.DespawnMenu();
		ham.travelSettingsMenu.RemoveMenuFromSceneTracker();
	}
	//Handle Travel Menu Click
	const TravelSettingsMenuClick = (el) => {
		let result = el.getAttribute('result');
		auxl.player.layer.transition = result;
		travelMenuTimeout = setTimeout(function () {
			closeTravelSettingsMenu();
			clearTimeout(travelMenuTimeout);
		}, 250);
	}

	return{ham, SpawnHam, DespawnHam, SystemMenuClick, TravelSettingsMenuClick};
}

//
//Ring of Objects
//Randomize Set of Objects from Single in a Ring Radius
this.ObjsGenRing = (data) => {
	let singleGen = Object.assign({}, data);
	let ogData = Object.assign({}, data.objData);
	let objData = JSON.parse(JSON.stringify(data.objData));
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
	//Return a random position within Ring radius
	function randomPosition(radius, yPos){
		posX = Math.random() * (radius*2) - radius;
		posZ = Math.random() * (radius*2) - radius;
		return new THREE.Vector3(posX, yPos, posZ);
	}
	//Generate Randomized Cores
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
			//Scale affects position
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
	//Spawn all Randomized Cores
	const SpawnObjRing = () => {
		genCores();
		for(let a = 0; a < singleGen.total; a++){
			singleGen.all[a].SpawnCore(false, false, true);
		}
	}
	//Despawn all Randomized Cores
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
//Randomize Sets of Various Sized Objects in various Ring Radius'
this.MultiAssetGen = (multiGenData) =>{
//Add the ability to read an array of different objects for same size
//Need to better optimize each size's radius
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
	//Multi Ring Inner/Outer Radius'
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
	//Ring 0 - user spawn area - tiny/small
	//Ring 1 - immeadiately surrounding the spawn area - tiny/small/med
	//Ring 2 - a bit farther from spawn area - small/med/large
	//Ring 3 - medium distance from spawn - med/large
	//Ring 4 - far distance from spawn - large/huge
	//Ring 5 - super far distance from spawn - huge

	//On every loop through the grid creator, it will always use the center to spawn one, allow that one a parent, but do not use it for a spawning location

	//Start with 1 mega mutating grid and add each size's recently added only on grid during generation

	//Generate Distribution Points at Ring Radius'
	let ring5 = [];
	let ring4 = [];
	let ring3 = [];
	let ring2 = [];
	let ring1 = [];
	let ring0 = [];
	let gridRing5 = discSampling('ring5',multiGen.ring.o5,multiGen.ring.i5);
	let gridRing4 = discSampling('ring4',multiGen.ring.o4,multiGen.ring.i4,gridRing5);
	let gridRing3 = discSampling('ring3',multiGen.ring.o3,multiGen.ring.i3,gridRing4);
	let gridRing2 = discSampling('ring2',multiGen.ring.o2,multiGen.ring.i2,gridRing3);
	let gridRing1 = discSampling('ring1',multiGen.ring.o1,multiGen.ring.i1,gridRing2);
	let gridRing0 = discSampling('ring0',multiGen.ring.o0,multiGen.ring.i0,gridRing1);
	let ring5Current = 0;
	let ring4Current = 0;
	let ring3Current = 0;
	let ring2Current = 0;
	let ring1Current = 0;
	let ring0Current = 0;
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
	//Shuffle Each Array for better randomness
	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}
	shuffle(ring5);
	shuffle(ring4);
	shuffle(ring3);
	shuffle(ring2);
	shuffle(ring1);
	shuffle(ring0);

	//Disc Sampling Support Function
	function discSampling(ring, area, space, currentGrid){
		//Generates grid starting from 0,0 in the + direction
		let grid;
		let center;
		if(currentGrid){
			center = currentGrid.center;
		} else {
			center = false;
		}
		function* poissonDiscSampler(width, height, radius, center){
			//radius is of the generated area
			//k is maximum number of samples before rejection
			const k = 15
			//radius2 is the minimum distance allowed between spawns
			const radius2 = radius * radius;
			//Math.SQRT1_2 is a constant square root of 0.5 which is ~0.707
			const cellSize = radius * Math.SQRT1_2;
			//Grid
			const gridWidth = Math.ceil(width / cellSize);
			const gridHeight = Math.ceil(height / cellSize);
			let queue = [];
			grid = new Array(gridWidth * gridHeight);
			if(currentGrid){
				for(let each in currentGrid){
					grid[each] = currentGrid[each];
					queue[each] = currentGrid[each];
				}
			}
			//Ignore center object
			if(center){
				yield {add: sample(center, center, null)};
			} else {
				yield {add: sample(width / 2 , height / 2, null)};
			}
			// Pick a random existing sample from the queue.
			pick: while (queue.length) {
				const i = Math.trunc(Math.random() * queue.length);
				const parent = queue[i];
				const seed = Math.random();
				const epsilon = 0.0000001;
				// Make a new candidate.
				for (let j = 0; j < k; ++j) {
					const a = 2 * Math.PI * (seed + 1.0*j/k);
					//Depending on the amount of tries allowed
					//start from 0degrees and move radius to check
					//as the loop continues/fails, keep moving counter-clockwise in equal parts depending on the current attempt number out of max
					//checking each new direction if that space is available
					const r = radius + epsilon;
					const x = parent[0] + r * Math.cos(a);
					const y = parent[1] + r * Math.sin(a);
					//Accept candidates that are inside the allowed extent and farther than 2 * radius to all existing samples.
					//area o0 4 aka outer radiues
					//space i0 0.5 aka inner radius
					if (space <= x && x < area && space <= y && y < area && far(x, y)) {
						//Accepted
						yield {add: sample(x, y), parent};
						//Try Again
						continue pick;
					}
				}
				//Rejected, remove from Queue
				const r = queue.pop();
				if (i < queue.length) queue[i] = r;
					yield {remove: parent};
			}

			function far(x, y) {
				const i = Math.trunc(x / cellSize);
				const j = Math.trunc(y / cellSize);
				const i0 = Math.max(i - 2, 0);
				const j0 = Math.max(j - 2, 0);
				const i1 = Math.min(i + 3, gridWidth);
				const j1 = Math.min(j + 3, gridHeight);
				//Only check surrounding squares of a 2x2 grid from candidate xy center
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
			//Accepted Sample, Add to Ring
			function sample(x, y, parent) {
				const s = grid[gridWidth * (Math.trunc(y / cellSize)) + (Math.trunc(x / cellSize))] = [x, y];
				queue.push(s);
				if(ring === 'ring5'){
					ring5.push(s);
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
		//Init Disc Sampling of Grid
		let gridSample = poissonDiscSampler(area,area,space,center);
		//Continue Disc Sampling
		function next(){
			gridSample.done = gridSample.next().done;
			if(gridSample.done){} else {
				next();
			}
		}
		//Start Disc Sampling of Grid
		next();
		//Prep Grid Array
		let goodGrid = [];
		for(let each in grid){
			if(grid[each]){
				goodGrid.push(grid[each]);
			}
		}
		return goodGrid;
	}
	//Generate Multi Objects Ring Cores w/ Randomization Support
	const genCores = () => {
		//Each Size
		for(let type in sizes){
			let size = Object.assign({}, multiGen[sizes[type]]);
			//Each Object Data
			for(let each in size.objs){
				let ogData = Object.assign({}, size.objs[each]);
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
				//Each Object
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
					//If ran out of predefined positions, choose random
					if(size.rings === 0){
						if(ring0Current < ring0.length){
							posX = ring0[ring0Current][0];
							posZ = ring0[ring0Current][1];
							ring0Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
							posZ = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
						}
					} else if(size.rings === 1){
						if(ring1Current < ring1.length){
							posX = ring1[ring1Current][0];
							posZ = ring1[ring1Current][1];
							ring1Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
							posZ = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
						}
					} else if(size.rings === 2){
						if(ring2Current < ring2.length){
							posX = ring2[ring2Current][0];
							posZ = ring2[ring2Current][1];
							ring2Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
							posZ = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
						}
					} else if(size.rings === 3){
						if(ring3Current < ring3.length){
							posX = ring3[ring3Current][0];
							posZ = ring3[ring3Current][1];
							ring3Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
							posZ = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
						}
					} else if(size.rings === 4){
						if(ring4Current < ring4.length){
							posX = ring4[ring4Current][0];
							posZ = ring4[ring4Current][1];
							ring4Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
							posZ = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
						}
					} else if(size.rings === 5){
						if(ring5Current < ring5.length){
							posX = ring5[ring5Current][0];
							posZ = ring5[ring5Current][1];
							ring5Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
							posZ = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
						}
					} 
					objData.position = new THREE.Vector3(posX, posY, posZ);
					//Add randomized Core to All
					multiGen.assets[sizes[type]].push(auxl.Core(objData));
				}
			}
		}
	}
	genCores();
	//Spawn All Assets
	const SpawnMultiAsset = () => {
		for(let type in sizes){
			let size = multiGen.assets[sizes[type]];
			for(let each in size){
				size[each].SpawnCore(false, false, true);
			}
		}
	}
	//Despawn All Assets
	const DespawnMultiAsset = () => {
		for(let type in sizes){
			let size = multiGen.assets[sizes[type]];
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
//Generate Teleport Points at Array of Locations
this.Teleport = (id, locations) => {
//Allow to select mutli-interactino circle, light beam and more.
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

	//Build Teleport Multi-Interaction Layer
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
	//Spawn Teleports
	const SpawnTeleport = () => {
		for(let each in teleport.all){
			teleport.all[each].SpawnLayer(true);
		}
	}
	//Despawn Teleports
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
//ToDo
//Allow for importing of however many button objects to add complexity
//Listen for first click to start the countdown timer based on how long current sequence is and a timer for in-between single clicks to timeout as well
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

	//Add memoryClick() Listeners to all Memory Buttons
	const AddSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().addEventListener('click', memoryClick);
		}
	}
	//Remove memoryClick() Listeners from all Memory Buttons
	const RemoveSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().removeEventListener('click', memoryClick);
		}
	}
	//Spawn Memory Game
	const SpawnMemGame = () => {
		memory.layer.SpawnLayer(true);
		memoryUI1.SpawnCore(false, false, true);
		memoryUI2.SpawnCore(false, false, true);
		AddSequenceListeners();
		GameSpawnMenu();
	}
	//Despawn Memory Game
	const DespawnMemGame = () => {
		RemoveSequenceListeners();
		memory.gameMenu.DespawnMenu()
		memory.layer.DespawnLayer(true);
		memoryUI1.DespawnCore(false, false, true);
		memoryUI2.DespawnCore(false, false, true);
		RemoveFromTracker(memory.id);
	}
	//Start Memory Game
	const StartGame = () => {
		GenRanSequence();
		gameStarted = true;
		memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Game Started'}});
		memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		PlaySequence();
	}
	//Build Level Sequence
	const GenRanSequence = () => {
		for(let a = 0; a < sequenceChunk; a++){
			allSequence.push(Math.floor(Math.random()*4))
		}
		//console.log(allSequence);
	}
	//Play Level Sequence
	const PlaySequence = () => {
		//console.log('Playing Sequence');
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
		}, 750);
	}
	//Check Level Sequence
	const CheckSequence = () => {
		//console.log(allSequence);
		//console.log(playerSequence);
		//console.log(currInSequence);
		//console.log(playerSequence[currInSequence]);
		//console.log(allSequence[currInSequence]);
		if(playerSequence[currInSequence] === allSequence[currInSequence]){
			//console.log('Match');
			currInSequence++;
			//push selection to front of sequenceRef and remove the last item
			sequenceTempArray.unshift('X');
			sequenceTempArray.pop();
			sequenceRef = sequenceTempArray.join("");
			memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		} else {
			//console.log('Game Over');
			gameStarted = false;
			if(currMaxSequence-1 > highScore){
				highScore = currMaxSequence-1;
				//console.log('New High Score : ' + highScore);
			} else {
				//let currentScore = currMaxSequence-1;
				//console.log('Sequence Score : ' + currentScore);
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
			//console.log('Correct Sequence');
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
	//Reset Game
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
	//Handle Memory Clicks & Check Sequence
	function memoryClick(){
		if(pauseClick){}else{
			//console.log('Memory Click')
			//console.log(this.id)
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
	//Play Round Complete Animation
	function roundCompleteAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('roundComplete');
		}
	}
	//Play Game Over Animation
	function gameOverAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('gameOver');
		}
	}
	//Spawn Game Menu
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
	//Handle Game Menu Click
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
//ToDo
//Add autoplay and pause on hovering
//Controls either left/right or thumbnails for each
	let imageSwapper = {};
	imageSwapper.id = id;
	let imageSwapperCore;
	imageSwapper.thumbnailCores = [];
	let thumbnailPos = new THREE.Vector3(0,-0.3,0.05);
	imageSwapper.layerData = {}
	//Prep Layer Core Objects
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
			buttonData.position = thumbnailPos;
			imageSwapper.thumbnailCores[mat] = auxl.Core(buttonData);
			imageSwapper.layerData['child'+mat] = {};
			imageSwapper.layerData['child'+mat].core = imageSwapper.thumbnailCores[mat];
		}
	}
	imageSwapper.layer = auxl.Layer('imageSwapper',imageSwapper.layerData);
	//Swap Material Sources with Parent
	const Click = (el) => {
		let selectedMat = el.getAttribute('material').src;
		let replacedMat = JSON.parse(JSON.stringify(el.parentNode.getAttribute('material').src));
		el.parentNode.setAttribute('material',{src: selectedMat})
		el.setAttribute('material',{src: replacedMat})
	}
	//Spawn ImageSwapper
	const SpawnImgSwap = () => {
		imageSwapper.layer.SpawnLayer(true);
	}
	//Despawn ImageSwapper
	const DespawnImgSwap = () => {
		imageSwapper.layer.DespawnLayer(true);
		RemoveFromTracker(imageSwapper.id);
	}

	return {imageSwapper, Click, SpawnImgSwap, DespawnImgSwap};
}

//
//ImageCarousel
this.ImageCarousel = (carouselData) => {
//ToDo
//Allow the amount of frames to be adjusted
//Add 180 view non-movement functions
//Bug
//Changing between Forward & Reverse either way messes up which frames should be updated
	let imageCarousel = Object.assign({}, carouselData);
	imageCarousel.frames = 8;//temp
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
	//Frame Templates & Prep
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
	//Build Cores
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
	//Main Button Color
	let mainColor = auxl.colorTheoryGen('#6ab0db');
	//Button Templates
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
	//Update Frame's Image & Text Description
	const UpdateFrame = (frame, textValue, imgSrc) => {
		artFrameAllLayerData[frame].child0.parent.core.ChangeSelf({property: 'material', value:{src: imgSrc,shader: "flat", color: "#FFFFFF", opacity: 1}});
		artFrameAllLayerData[frame].child0.child0.core.ChangeSelf({property: 'text', value:{value: textValue, width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'}})
	}
	//Update Frame from Direction
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
			UpdateFrame('child'+frame, imageCarousel.images[currentImageBackward].text, imageCarousel.images[currentImageBackward].image);
		}
	}
	//Update All Frames
	const UpdateAll = (direction) => {
		for(let a = 0; a < imageCarousel.frames; a++){
			Update(a,direction);
		}
		loadingPage = false;
	}
	//Update Back 2 Frames
	const UpdateBackTwo = (direction) => {
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
		for(let each in update2){
			num = update2[each];
			Update(num,direction);
		}
	}
	//Update Back Frame
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
	//Spawn Image Carousel
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
		//buttonStopClick.GetEl().addEventListener('click', Stop);
		buttonHashtagClick.GetEl().addEventListener('click', RandomPage);

		Init();
	}
	//Despawn Image Carousel
	const DespawnImgCarousel = () => {
		buttonBackwardClick.GetEl().removeEventListener('click', Backward);
		buttonForwardClick.GetEl().removeEventListener('click', Forward);
		buttonLeftSkipClick.GetEl().removeEventListener('click', PrevPage);
		buttonPlayClick.GetEl().removeEventListener('click', PlayPause);
		buttonRightSkipClick.GetEl().removeEventListener('click', NextPage);
		buttonSettingsClick.GetEl().removeEventListener('click', Scale);
		//buttonStopClick.GetEl().removeEventListener('click', Stop);
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
	//Move Frames Forward 90 Degrees
	const Forward = () => {
		if(notMoving){
			notMoving = false;
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
			}, anim90Data.dur+10);
		}
	}
	//Move Frames Backward 90 Degrees
	const Backward = () => {
		if(notMoving){
			notMoving = false;
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
			}, anim90Data.dur+10);
		}
	}
	//Toggle Rotating View Animation
	const PlayPause = () => {
		if(notPlaying){
			notPlaying = false;
			notMoving = false;
				playInterval = setInterval(() => {
					UpdateBack();
					currentRotation = autoRotate;
					if(currentRotation === 7){
						currentRotation = 0;
					} else {
						currentRotation++;
					}
				}, anim360Data.dur/8);
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
			artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} })
			buttonPlayText.ChangeSelf({property: 'text', value: {value:'Play', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		}
	}
	//Stops View Animation & Resets - Disabled
	const Stop = () => {
		if(notPlaying){} else {
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim45MiscData.from = rotY;
			anim45MiscData.to = 1;
			artFrameAllLayer.AnimateParent(anim45MiscData);
			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} });
			notPlaying = true;
			notMoving = true;
		}
	}
	//Load Next Page of Images
	const NextPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('forward');
		}
	}
	//Load Previous Page of Images
	const PrevPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('backward');
		}
	}
	//Load Randomized Page of Images
	const RandomPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			currentImageForward = Math.floor(Math.random()*imageCarousel.images.length);
			UpdateAll('forward');
		}
	}
	//Adjust Frame Scale w/ Animation
	const Scale = () => {
		//limit effects to the amount of spawned frames
		if(animating){} else {
			animating = true;
			scaleTimeout = setTimeout(() => {
				animating = false;
				clearTimeout(scaleTimeout);
			}, 2050);
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
	//Toggle Display of Detail Info
	const Info = () => {
		if(info){
			info = false;
		} else {
			info = true;
		}
	}
	//Prep Images and Detail Info after Spawn
	const Init = () => {
		buttonStopClick.EnableDetail({text: imageCarousel.description, position: new THREE.Vector3(0,1.5,-2)});
		UpdateAll('forward');
	}

	return {imageCarousel, SpawnImgCarousel, DespawnImgCarousel, PlayPause, Forward, Backward, NextPage, PrevPage, RandomPage, Scale, Info};
}


},
//Delay Player Load in Animation until Scene is Ready
checkSceneLoad: function (time, timeDelta) {
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
	}
},
//AUXL Tick - Running Throttled checkSceneLoad()
tick: function (time, timeDelta) {
	if(this.loadingScene){
		//Run Throttled checkSceneLoad()
		this.checkSceneLoadThrottled();
	}
},

});


//auxl-library
//AUXL Library : List of Materials, Geometries, Sounds, Animations, Data, Cores, Layers & Objects
AFRAME.registerComponent('auxl-library', {
dependencies: ['auxl'],

init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//Make a new ObjGen for Multi-Menu that will handle multiple levels of the menu. And instead of returning an option on click to then logic, could instead attach a method to it directly.

//Should I bother syncing the 2 or have the menu load connectd to camera when not in VR mode

//
//A-Frame <-> HTML Menu Sync Test
/*
let allMenu = {
	menuSceneSwap:{
		title,
		options,
	},
	menuTeleport:{
		title,
		options,
	},
	menuMain:{
		title,
		options:{
			start:{
				id,
				class,
				innerHTML,
				auxlObj,
				component,
				method,
				params,
			},
			mode,
			vrHand,
			audioToggle,
			viewInfo,
		},
	},
};
*/
/* Main menu
<div id="beginDiv">
<span class="flexCol"><h4 id="scenarioMenuTitle"></h4></span>
<li><button class="menu" id="startButton">Start</button></li>
<li><button id="menuModeButton" class="flexCol">Mode : Desktop</button></li>
<li><button id="vrHandButton" class="flexCol">2 Hands : Right Ray | Left Move</button></li>
<li><button id="audioButton" class="flexCol">Sound : Disabled</button></li>
<li><button id="viewInfo" class="flexCol">View Instructions</button></li>
</div>
*/

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
//ImageSwapper Testing

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
//ImageCarousel Testing
auxl.carouselTestingData = {
id: 'carouselTesting',
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
//Memory Game Testing
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
//Spawn Tester
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
//GLTF Material Modification Testing
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
//Event Listener Components to run Auxl.Object.Methods()

//Attach to run Object's .Click() method on click
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
//Attach to run specified method from Object on click event
AFRAME.registerComponent('clickrun', {
dependencies: ['auxl'],
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
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});
//Attach to run specified method from Object on fusing event
AFRAME.registerComponent('fusingrun', {
dependencies: ['auxl'],
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	fusing: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});
//Attach to run specified method from Object on mousedown event
AFRAME.registerComponent('mousedownrun', {
dependencies: ['auxl'],
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	mousedown: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});
//Attach to run specified method from Object on mouseenter event
AFRAME.registerComponent('mouseenterrun', {
dependencies: ['auxl'],
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	mouseenter: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});
//Attach to run specified method from Object on mouseleave event
AFRAME.registerComponent('mouseleaverun', {
dependencies: ['auxl'],
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	mouseleave: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});
//Attach to run specified method from Object on mouseup event
AFRAME.registerComponent('mouseuprun', {
dependencies: ['auxl'],
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	mouseup: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			this.auxl[this.data.cursorObj][this.data.method](evt.target);
		}
	}
},
});

//
//Locomotion
//Walk or Run Player in Camera Direction from Selection
AFRAME.registerComponent('locomotion', {
dependencies: ['auxl'],
schema: {
	uiid: {type: 'string', default: 'ui'},
	courserid: {type: 'string', default: 'mouseCursor'},
	movetype: {type: 'string', default: 'vr'},
},
init: function () {
	//AUXL System Connection
	const auxl = document.querySelector('a-scene').systems.auxl;
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
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
		} else {
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
		//Controlled by Universal Controls
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
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
//Listen for Directions
everySome: function (time, timeDelta) {
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
	this.everySomeThrottled();
	//Sync Belt
	if(this.movetype === 'vrHover'){
		this.uiSync();
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
//Walk in Direction of Camera
walk: function (action, speed) {
	this.velocity = speed;
	this.cameraVector = new THREE.Vector3();
	this.camera.object3D.getWorldDirection(this.cameraVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.cameraVector.x,this.cameraVector.z);
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	if(action === 'forwardRight'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		//Check Camera Angle Quadrant
		if(this.angle > 0 && this.angle < Math.PI/2) {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < 0 && this.angle > -Math.PI/2) {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}
	this.positionNew.y = this.positionPlayer.y;
	this.player.object3D.position.copy(this.positionNew);
},
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
	let teleportType = auxl.player.layer.transition;
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
AFRAME.registerComponent('raycast-teleportation', {
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
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
//Action 4 - Button B, Key C, HTML D
//Action 5 - Other Joystick Down, Key V, HTML E
//Action 6 - Other Joystick Up, Key B, HTML F
//Snap Left - Other Joystick Left, Key Z, HTML <-
//Snap Right - Other Joystick Right, Key X, HTML ->

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
//Temp Blank
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
	this.mobileSnapLeft.addEventListener('touchstart', this.snapLeftHit);
	//this.mobileSnapLeft.addEventListener('touchend', this.blankHit);
	this.mobileSnapRight.addEventListener('touchstart', this.snapRightHit);
	//this.mobileSnapRight.addEventListener('touchend', this.blankHit);
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
