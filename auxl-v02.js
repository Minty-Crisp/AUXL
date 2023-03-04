//
//AUXL : A-Frame UX Library
//v0.2 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.2 - In Progress

//auxl
//AUXL System : ObjGens, Functions, Vital Data,Core,Layer & Objects
AFRAME.registerSystem('auxl', {
//schema: {
	//bar: {type: 'number'},
	//style: {type: 'string', default: 'random'}
//},

init: function () {
//console.log('AUXL INIT');
// System
/********************************************************************/
//

//Establish a-frame objects
const sceneEl = document.querySelector('a-scene');
const head = document.querySelector('head');
let auxl = this;
//Experience
this.expStarted = false;
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
this.controls = 'Desktop';
this.vrHand = 'right';
this.mobilePermissionGranted = false;
let playerRig;
let camera;
let cameraUI;
let playerFloor;
let mouseController;
let vrController;
let vrControllerUI;
this.joystickReader = '';
this.controller1Reader = '';
this.controller2Reader = '';
//Core, Layer & Aux currently spawned in scene.
this.spawned = {};
this.scenarioSpawned = {};
this.zoneSpawned = {};
this.nodeSpawned = {};
//Clear Node or Zone
function clearSpawned(spawned){
	for(let spawn in spawned){
		//console.log(spawn);//name of ID
		//console.log(spawned[spawn]);//obj
		//console.log(auxl[spawn]);
		if(auxl[spawn]){
			if(auxl[spawn].type === 'core'){
				auxl[spawn].core.RemoveFromScene();
			} else if (auxl[spawn].type === 'layer'){
				auxl[spawn].layer.RemoveAllFromScene();
			} else if (spawned[spawn].type === 'gen'){
				auxl[spawn].DespawnAll();
			} else if (spawned[spawn].type === 'teleport'){
				auxl[spawn].DespawnAll();
			} else if (spawned[spawn].type === 'npc'){
				auxl[spawn].Despawn();
			}  else if (spawned[spawn].type === 'imageSwapper'){
				auxl[spawn].Remove();
			} else {
				if(auxl[spawn].RemoveFromScene){
					auxl[spawn].RemoveFromScene();
				} else if(auxl[spawn].RemoveAllFromScene){
					auxl[spawn].RemoveAllFromScene();
				}
			}
		} else {
			if (spawned[spawn].type === 'menu'){
				spawned[spawn].obj.MenuRemove();
			} else {
				console.log('Despawn not compatible');
				console.log(spawn);
				console.log(spawned[spawn]);
				console.log(document.getElementById(spawn));
			}
		}
		//console.log(spawned[spawn]);//Book & Page spawned from
		delete spawned[spawn];
	}
}
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
	//vrController visible to true
	vrController.setAttribute('visible',false);
	//vrControllerUI visible to true
	vrControllerUI.setAttribute('visible',false);
	//vrController cursor property
	vrController.removeAttribute('cursor');
	//vrController raycaster property
	vrController.removeAttribute('raycaster');
	//vrController laser-controls property
	vrController.removeAttribute('laser-controls');
}
function enableVRControls(){
	//Enable VR Controls
	//vrController visible to true
	vrController.setAttribute('visible',true);
	//vrControllerUI visible to true
	vrControllerUI.setAttribute('visible',true);
	//vrController raycaster property
	vrController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'});
	//vrController cursor property
	vrController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController', mouseCursorStylesEnabled: 'true'});
	//vrController laser-controls property
	vrController.setAttribute('laser-controls',{hand: auxl.vrHand});
	//Enable VR Locomotion
	auxl.player.EnableVRLocomotion();
	//Update Controls
	auxl.controls = 'VR';
}
//Desktop
function disableDesktopControls(){
	//Disable Desktop Controls
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
	//Remove cursor attribute
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	//Enable Desktop Locomotion
	auxl.player.EnableDesktopLocomotion();
	//Update Controls
	auxl.controls = 'Desktop';
}
//Mobile
function disableMobileControls(){
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
}
//Update Controls
function updateControls(){
	if(auxl.controls === 'Desktop'){
		disableMobileControls();
		disableVRControls();
		enableDesktopControls();
	} else if(auxl.controls === 'Mobile'){
		disableVRControls();
		disableDesktopControls();
		enableMobileControls();
	} else if(auxl.controls === 'VR'){
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
	if(auxl.expStarted){
		updateControls();
	}
}
menuModeButton.addEventListener('click', changeControls);

function changeVRHand(){
	if(auxl.vrHand === 'right'){
		auxl.vrHand = 'left';
		vrHandButton.innerHTML = 'Hand : Left';
	} else {
		auxl.vrHand = 'right';
		vrHandButton.innerHTML = 'Hand : Right';
	}
	if(auxl.expStarted){
		updateControls();
	}
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

//ToggleBool
function toggleBool(bool){
	if(bool){
		return bool = false;
	}else{
		return bool = true;
	}
}

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

	const Generate = () => {

		//Need additional gates if sources are needed to prevent spawning until script is fully downloaded.
		//
		//Check for external sources and append
		if(core.sources){
			//{['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',}
			//{threeGradShader: 'https://unpkg.com/@tlaukkan/aframe-three-color-gradient-shader@0.0.1/index.js',}
			//External JS Import
			//Multi-Property Values
			let propertyKeys = Object.keys(core.sources);
			let propertyValues = Object.values(core.sources);
			for (let propKey in propertyKeys) {
				//create new script element
				let newScript = document.createElement('script');
				//add src addtribute of componentValues[key]
				newScript.setAttribute('src', propertyValues[propKey]);
				console.log(propertyValues[propKey]);
				//append to Head
				head.appendChild(newScript);
			}//Component properties
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
		//console.log(JSON.stringify(data.id.id));

		//core.el.setAttribute('id', core.id.id);
		core.el.setAttribute('id', core.id);
		//core.el.classList.add(classes);
		//core.el.setAttribute(mixins);
		if(core.geometry){
			core.el.setAttribute('geometry', core.geometry);
		}
		if(core.material){
			core.el.setAttribute('material', core.material);
		}
		if(core.position){
			core.el.setAttribute('position', core.position);
		}
		if(core.rotation){
			core.el.setAttribute('rotation', core.rotation);
		}
		if(core.scale){
			core.el.setAttribute('scale', core.scale);
		}

		//core.el.setAttribute('animation__default', data.animations.default);

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

		//Check for Component Settings
		if(core.components){
		let componentKeys = Object.keys(core.components);
		let componentValues = Object.values(core.components);
		for (let key in componentKeys) {
			if(key === 0){} else {
				core.el.setAttribute(componentKeys[key],componentValues[key])
			}
		}
		}//Core Componenets

		//console.log(core.el);
		//console.log('Entity Generated');
		return core.el;
	}

	const AddToScene = (parent, layer, other) => {
		let needParent = parent || false;
		let fromLayer = layer || false;
		Generate();
		if(core.entity === 'preAdded'){} else {
			if(needParent){
				core.parent = needParent;
				needParent.appendChild(core.el);
				//Need a specific unspawn object form to add to this.spawned
			}else{
				sceneEl.appendChild(core.el);
			}
			if(fromLayer || other){} else {
				//console.log('Add to scene tracker')
				//console.log(core)
				AddToSceneTracker();
			}
		}
		//console.log(core)
	}

	const RemoveFromScene = (parent, layer, other) => {
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
		}else{
			//console.log(core)
			//console.log(core.el)
			sceneEl.removeChild(core.el);
		}
		if(core.entity === 'preAdded'){} else {
			if(fromLayer || other){} else {
				RemoveFromSceneTracker();
			}
		}
	}

	const AddToSceneTracker = () => {
		if(auxl.scenarioSpawned[core.id]){} else if(auxl.zoneSpawned[core.id]){} else {
			auxl.nodeSpawned[core.id] = {type: 'core', obj: core};
		}
	}

	const RemoveFromSceneTracker = () => {
		delete auxl.nodeSpawned[core.id];
	}

	const ChangeSelf = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				GetEl().setAttribute(propertyValue[each].property, propertyValue[each].value);
			}
		} else {
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

	function prepAnimation(properties){

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
			GetEl().setAttribute(name, anim);
		}
	}

	const GetEl = () => {
		//return core.id;

		let aEl = document.getElementById(core.id);
		if(aEl){}else{
			console.log(core.id)
		}
		return aEl;
	}

	const EmitEvent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				GetEl().emit(eventName[each],{});
			}
		} else {
			GetEl().emit(eventName,{});
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

	const prepDetails = (text) => {
		core.isOpen = false;
		//Main Screen
		core.detailMain = auxl.Core(auxl.detailMainData);
		//Update Position
		core.detailMain.core.position.x = core.position.x + 0.1;
		core.detailMain.core.position.y = core.position.y + 0.75;
		core.detailMain.core.position.z = core.position.z + 0.25;
		//Import Display Text from Core or a detailObject
		if(text){
		core.detailMain.core.text.value = text;
		} else {
		core.detailMain.core.text.value = core.data;
		}
		//Close Button
		core.detailClose = auxl.Core(auxl.detailCloseData);
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
			core.detailAll.RemoveAllFromScene();
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
			core.detailAll.AddAllToScene();
			core.isOpen = detailPrompt_open();
			core.detailClose.core.el.addEventListener('click', closePrompt);
		}
	}

	const EnableDetail = (text) => {
		//When core is added to scene...
		if(text){
			prepDetails(text);
		} else if(details){} else {
			prepDetails();
		}
		//Add Event Listener
		GetEl().addEventListener('click', openClose);
	}

	const DisableDetail = () => {
		//When core is removed from the scene...
		//Remove Event Listener
		GetEl().removeEventListener('click', openClose);
	}

	return {core, Generate, AddToScene, RemoveFromScene, RemoveComponent, ChangeSelf, Animate, GetEl, EmitEvent, SetFlag, GetFlag, ClickRun, FuseClickRun, CursorDownRun, CursorEnterRun, CursorLeaveRun, CursorUpRun, EnableDetail, DisableDetail};
}

//
//layered Core
this.Layer = (id, all) => {

	let layer = {id, all};
	layer.children = {};
	layer.secondParents = [];
	layer.thirdParents = [];

	const AddAllToScene = (other) => {
		for(let each in all){
			if(each === 'parent'){
				all[each].core.AddToScene(false, true);
			} else {
				for(let a in all[each]){
					if(a === 'core'){
						layer.children[all[each].core.core.id] = {obj: all[each][a], parent: all.parent.core.core.el};
						//console.log(layer.children)
						all[each][a].AddToScene(all.parent.core.core.el, true);
					} else {
						if(a === 'parent'){
							layer.children[all[each][a].core.core.id] = {obj: all[each][a].core, parent: all.parent.core.core.el};
							layer.secondParents.push(all[each][a].core);
							//console.log(layer.children)
							all[each][a].core.AddToScene(all.parent.core.core.el, true);
						} else {
							for(let b in all[each][a]){
								if(b === 'core'){
									layer.children[all[each][a].core.core.id] = {obj: all[each][a][b], parent: all[each].parent.core.core.el};
									//console.log(layer.children)
									all[each][a][b].AddToScene(all[each].parent.core.core.el, true);
								} else {
									if(b === 'parent'){
										layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b].core, parent: all[each].parent.core.core.el};
										layer.thirdParents.push(all[each][a][b].core);
										//console.log(layer.children)
										all[each][a][b].core.AddToScene(all[each].parent.core.core.el, true);
									} else {
										for(let c in all[each][a][b]){
											if(c === 'parent'){
												console.log('Add support for more layers')
											} else {
												layer.children[all[each][a][b].core.core.id] = {obj: all[each][a][b][c], parent: all[each][a].parent.core.core.el};
												//console.log(layer.children)
												all[each][a][b][c].AddToScene(all[each][a].parent.core.core.el, true);
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
		if(other){} else {
			AddToSceneTracker();
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

	const RemoveAllFromScene = (other) => {
		let removeOrder = layerOrder(layer.all).reverse();

		for(let layer of removeOrder){
			//console.log(layer);
			for(let each of layer){
				//console.log(each);
				if(each.core.parent){
					each.RemoveFromScene(each.core.parent);
				} else {
					each.RemoveFromScene();
				}
			}
		}
		RemoveFromSceneTracker();
	}

	const AddToSceneTracker = () => {
		if(auxl.scenarioSpawned[layer.id]){} else if(auxl.zoneSpawned[layer.id]){} else {
    		auxl.nodeSpawned[layer.id] = {type: 'layer', obj: layer};
		}
	}

	const RemoveFromSceneTracker = () => {
		delete auxl.nodeSpawned[layer.id];
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

	const ChangeParent = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				all.parent.core.ChangeSelf(propertyValue[each]);
			}
		} else {
			all.parent.core.ChangeSelf(propertyValue);
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

	const AnimateParent = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				all.parent.core.Animate(animProps[each]);
			}
		} else {
			all.parent.core.Animate(animProps);
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

	return {layer, AddAllToScene, RemoveAllFromScene, GetParentEl, EmitEventParent, ChangeParent, ChangeAll, AnimateParent, AnimateAll, GetChild};
}

//
//Player
this.Player = (layer) => {

	layer.transition = 'blink';
	//instant
	//fade
	//sphere
	//blink

	layer.teleporting = false;

	//layer.controls = 'desktop';

	//Initialize Player
	layer.AddAllToScene(true);
	//document.getElementById('camera').setAttribute('camera', 'active', true);

	//Update Control Variables
	playerRig = document.getElementById('playerRig');
	camera = document.getElementById('camera');
	cameraUI = document.getElementById('cameraUI');
	playerFloor = document.getElementById('playerFloor');
	mouseController = document.getElementById('mouseController');
	vrController = document.getElementById('vrController');
	vrControllerUI = document.getElementById('vrControllerUI');

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

	const TempDisableClick = () => {
	//Not working well, upgrade

	//Need to check which controls are currently enabled
	//mouseController
	//vrController
		let disableTimeout;
		if(auxl.controls === 'Desktop'){
			auxl.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: 'true', autoRefresh: 'true', objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
			//Timeout
			disableTimeout = setTimeout(function () {
				auxl.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
				clearTimeout(disableTimeout);
			}, 1000);
		} else if(auxl.controls === 'VR'){
			auxl.vrController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'}});
			//Timeout
			disableTimeout = setTimeout(function () {
				auxl.vrController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'}});
				clearTimeout(disableTimeout);
			}, 1000);
		} else if(auxl.controls === 'Mobile'){
			auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
			//Timeout
			disableTimeout = setTimeout(function () {
				auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
				clearTimeout(disableTimeout);
			}, 1000);
		}
	}

	const EnableVRLocomotion = () => {
		playerRig.removeAttribute('locomotion');
		auxl.locomotionUILayer.AddAllToScene(true);
		playerRig.setAttribute('locomotion',{uiid: 'beltUIParent', controller1id: 'vrController', courserid: 'mouseController', movetype: 'vr'});
	}

	const EnableDesktopLocomotion = () => {
		playerRig.removeAttribute('locomotion');
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.RemoveAllFromScene();
		}
		playerRig.setAttribute('locomotion',{uiid: false, controller1id: false, courserid: 'mouseController', movetype: 'desktop'});
	}

	const EnableMobileLocomotion = () => {
		playerRig.removeAttribute('locomotion');
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.RemoveAllFromScene();
		}
		playerRig.setAttribute('locomotion',{uiid: false, controller1id: false, courserid: 'mouseController', movetype: 'mobile'});
	}

	const DisableLocomotion = () => {
		playerRig.removeAttribute('locomotion');
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.RemoveAllFromScene();
		}
	}

	return {layer, SetFlag, GetFlag, TempDisableClick, EnableVRLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, DisableLocomotion}
}
//Spawn Function
function playerSpawnAnim(){
	if(auxl.player.layer.teleporting){} else {
		auxl.player.layer.teleporting = true;
		if(auxl.player.layer.transition === 'blink'){
			auxl.player.TempDisableClick();
			auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.blink1Screen.EmitEvent('blink');
			auxl.blink2Screen.EmitEvent('blink');
			timeout2 = setTimeout(function () {
				auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
				auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
				auxl.player.layer.teleporting = false;
				clearTimeout(timeout2);
			}, 1200);
		} else if (auxl.player.layer.transition === 'fade'){
			auxl.player.TempDisableClick();
			auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.fadeScreen.EmitEvent('fade');
			timeout2 = setTimeout(function () {
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
				auxl.player.layer.teleporting = false;
				clearTimeout(timeout2);
			}, 1200);
		} else if (auxl.player.layer.transition === 'sphere'){
			auxl.player.TempDisableClick();
			auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.sphereScreen.EmitEvent('sphere');
			timeout2 = setTimeout(function () {
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
				auxl.player.layer.teleporting = false;
				clearTimeout(timeout2);
			}, 1200);
		} else if (auxl.player.layer.transition === 'instant'){
			timeout2 = setTimeout(function () {
				auxl.player.layer.teleporting = false;
				clearTimeout(timeout2);
			}, 500);
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
menu.clickrun.cursorObj = menuData.cursorObj || '';
menu.clickrun.method = menuData.method || 'Click';
menu.clickrun.params = menuData.params || 'null';
//Update Starting Position
menu.data.position.x = menuData.pos.x;
menu.data.position.y = menuData.pos.y;
menu.data.position.z = menuData.pos.z;
//Menu Options Total
let menuLength = Object.keys(menu.options).length;

//Menu Style
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
	const MenuGen = () => {
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
		if(menuLength === 1){
			menu.data.position.y = 0;
		} else {
			menu.data.position.y = (menu.data.geometry.height*0.75) * menuLength/2;
		}
		//components: {clickfunc: {clickObj: 'auxlObj'}},
		//components: {clickrun: {cursorObj: 'auxlObj', method: 'Method', params: null}},
		menu.data.components = {};
		menu.data.components.clickrun = {};
		menu.data.components.clickrun.cursorObj = menu.clickrun.cursorObj ;
		menu.data.components.clickrun.method = menu.clickrun.method;
		menu.data.components.clickrun.params = menu.clickrun.params;
		//generate 1 for each responses use option
		for(let menuItem in menu.options){
			if(menuLength === 1 || menuNum === 0){} else {
				menu.data.position.y -= (menu.data.geometry.height*1.15);
			}
			//menu.data.position.y -= 0.2;
			menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
			menu.data.text.value = menu.options[menuItem];
			menu.data.id = menu.id + 'option' + menuNum;
			menu.data.components.result = menu.actions['action'+menuNum];
			menuOption = auxl.Core(menu.data);
			//menuOption.AddToScene();
			menuOptions.push(menuOption);
			menu.layers['child'+menuNum] = {core: menuOptions[menuNum]}
			menuNum++;
		}
		//AddToSceneTracker();

		//Build layered Menu
		menu.layer = auxl.Layer(menu.id, menu.layers);
		menu.layer.AddAllToScene(true);
		//menu.layer.ChangeParent({property: 'look-at', value: '#camera'})
	}//MenuGen

	const MenuRemove = () => {
		menu.layer.RemoveAllFromScene(true);
		RemoveFromMenuSceneTracker();
	}

	const ToggleOptionClicking = () => {
		for(let options in menuOptions){
			menuOptions[options].GetEl().classList.toggle('clickable');
			//element.classList.toggle('clickable', false);
		}
	}

	const AddToMenuSceneTracker = (obj) => {
		if(auxl.zoneSpawned[menu.id]){} else {
    		//auxl.menuSpawned[menu.id] = {type: 'menu', obj};
    		auxl.nodeSpawned[menu.id] = {type: 'menu', obj};
		}
	}

	const RemoveFromMenuSceneTracker = () => {
		//delete auxl.menuSpawned[menu.id];
		delete auxl.nodeSpawned[menu.id];
	}

	return {menu, MenuGen, MenuRemove, ToggleOptionClicking, AddToMenuSceneTracker, RemoveFromMenuSceneTracker};
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

	const AddToTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		//console.log({name,type,id,method,params,event})
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			//console.log({name,type,id,method,params,event})
			//console.log(nameId);
			auxl.running[nameId] = {type, name, id, nameId, method, params, event};
		}
		//console.log(auxl.running);
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}

	const ClearSceneTimeIntEvt = () => {
		//console.log(auxl.running);
		for(let ran in auxl.running){
			//console.log(ran);//name of ID
			//console.log(auxl.running[ran]);//object
			if(auxl.running[ran].type === 'timeout'){
				//console.log('clearing timeout');
				//console.log(auxl.running[ran].nameId);
				//console.log(auxl.timeouts[auxl.running[ran].nameId]);
				//clearTimeout(auxl.running[ran].nameId);
				clearTimeout(auxl.timeouts[auxl.running[ran].nameId]);
				delete auxl.timeouts[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interval'){
				//console.log('clearing interval');
				//console.log(auxl.running[ran].nameId);
				//console.log(auxl.intervals);
				clearInterval(auxl.intervals[auxl.running[ran].nameId]);
				delete auxl.intervals[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interaction' || auxl.running[ran].type === 'event'){
				//Event
				//console.log('clearing interaction|event');
				//console.log(auxl.running[ran].name);
				//console.log(auxl.running[ran].event);
auxl[auxl.running[ran].name].GetEl().removeEventListener(auxl.running[ran].event, function(){
auxlObjMethod(auxl.running[ran].object,auxl.running[ran].method,auxl.running[ran].params);
});
			}
			RemoveFromTimeIntEvtTracker(ran);
		}
		//console.log(auxl.running);
		//console.log(auxl.timeouts);
		//console.log(auxl.intervals);
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
		//console.log(object);
		//console.log(func);
		//console.log(params);
		//console.log(auxl[object]);
		auxl[object][func](params);
	}

	function readTimeline(time){
	//find a specific timeline/key name and load up that
	//core : page/data/object
	//time : name of section within a core's pageData
	//line : a single line set of instructions within time
	//
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
		//console.log(object);
		//console.log(func);
		//console.log(params);
		//console.log(auxl[object]);
		if(func === 'AddToScene'){
			if(auxl.zoneSpawned[auxl[object].core.id]){} else {
				AddToZoneTracker('core', auxl[object]);
			}
		} else if(func === 'AddAllToScene'){
			if(auxl.zoneSpawned[auxl[object].layer.id]){} else {
				AddToZoneTracker('layer', auxl[object]);
			}
		}
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
		MoveMenuGen();

	}

	const ClearScene = () => {
		auxl[core.currentNode].ClearScene();
	}

	const MoveMenuGen = () => {

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
		core.mapMenu.MenuGen();
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
			auxl.player.TempDisableClick();
			auxl.cameraUI.ChangeSelf({property: 'text', value: {value:'Requires : ' + newNode.key, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
			auxl.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
			auxl.cameraUI.EmitEvent('cameraMsg');
			timeout2 = setTimeout(function () {
				auxl.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
				clearTimeout(timeout2);
			}, 3750);
			//Testing
			//auxl.player.SetFlag({flag: newNode.key, value: true})
			//console.log('Key given');
		} else {
			if(newNode.locked && auxl.player.GetFlag(newNode.key) && !newNode.keepKey){
				auxl.player.SetFlag({flag: newNode.key, value: false})
				//console.log('Key taken');
			}
			//Timeout
			timeout = setTimeout(function () {
					core.mapMenu.MenuRemove();
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
			//Instant, Shrink/Grow, Fade, Sphere, Blink
			//console.log(auxl.player)
			//console.log(auxl.player.layer)
			//console.log(auxl.player.layer.transition)
			playerSpawnAnim();
		}
	}

	const ClearZone = () => {
	//Clear Core | Layer Scene Tracked Items
		//console.log('Clearing Zone...');
		//console.log(core.currentZone);
		//console.log(auxl.zoneSpawned);
		Exit();
		ClearZoneTimeIntEvt();
		clearSpawned(auxl.zoneSpawned);
		/*
		for(let spawn in auxl.zoneSpawned){
			//console.log(spawn);//name of ID
			//console.log(auxl[spawn]);

			if(auxl[spawn]){
				if(auxl[spawn].type === 'core'){
						auxl[spawn].core.RemoveFromScene();
				} else if (auxl[spawn].type === 'layer'){
						auxl[spawn].layer.RemoveAllFromScene();
				} else {
					if(auxl[spawn].RemoveFromScene){
						auxl[spawn].RemoveFromScene();
					} else if(auxl[spawn].RemoveAllFromScene){
						auxl[spawn].RemoveAllFromScene();
					}
				}
			} else if(document.getElementById(spawn)){
				//console.log(spawn);
				//console.log(document.getElementById(spawn));
			}

			//console.log(auxl.zoneSpawned[spawn]);//Book & Page spawned from
			delete auxl.zoneSpawned[spawn];
		}*/
		//console.log(auxl.zoneSpawned);
	}

	return {core, ReadMapData, StartScene, MoveMenuGen, MenuMoveClick, Move, ClearZone};
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
		if(func === 'AddToScene'){
			if(auxl.scenarioSpawned[auxl[object].core.id]){} else {
				AddToScenarioTracker('core', auxl[object]);
			}
		} else if(func === 'AddAllToScene'){
			if(auxl.scenarioSpawned[auxl[object].layer.id]){} else {
				AddToScenarioTracker('layer', auxl[object]);
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
	}

	const StartScenario = () => {
		if(core.scenarioLoaded){} else {
			playerSpawnAnim();
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
			if(skyBox.lights[each].AddToScene){
				skyBox.lights[each].AddToScene(false, false, true);
			} else if(skyBox.lights[each].AddAllToScene){
				skyBox.lights[each].AddAllToScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}

	const DespawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].RemoveFromScene){
				skyBox.lights[each].RemoveFromScene(false, false, true);
			} else if(skyBox.lights[each].RemoveAllFromScene){
				skyBox.lights[each].RemoveAllFromScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}

	const SpawnSky = () => {
		//combine with atmosphere?
		for(let each in skyBox.sky){
			if(skyBox.sky[each].AddToScene){
				skyBox.sky[each].AddToScene(false, false, true);
			} else if(skyBox.sky[each].AddAllToScene){
				skyBox.sky[each].AddAllToScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}

	const DespawnSky = () => {
		//combine with atmosphere?
		for(let each in skyBox.sky){
			if(skyBox.sky[each].RemoveFromScene){
				skyBox.sky[each].RemoveFromScene(false, false, true);
			} else if(skyBox.sky[each].RemoveAllFromScene){
				skyBox.sky[each].RemoveAllFromScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}

	const SpawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].AddToScene){
				skyBox.space[each].AddToScene(false, false, true);
			} else if(skyBox.space[each].AddAllToScene){
				skyBox.space[each].AddAllToScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}

	const DespawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].RemoveFromScene){
				skyBox.space[each].RemoveFromScene(false, false, true);
			} else if(skyBox.space[each].RemoveAllFromScene){
				skyBox.space[each].RemoveAllFromScene(true);
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}

	const Spawn = () => {
		SpawnLights();
		SpawnSky();
		SpawnSpace();
	}

	const Despawn = () => {
		clearTimeout(dayNightTimeout);
		clearInterval(dayNightInterval);
		DespawnLights();
		DespawnSky();
		DespawnSpace();
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

	return {skyBox, Spawn, Despawn, DayNightCycle, PauseDayNight, ResumeDayNight, RestartDayNight};
}

//
//Story Book - Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
this.Book = (core, npc) => {
//facilitate interaction between user, objects and story.

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
					//console.log(a);//AddToScene / ChangeSelf
					//console.log(time[line]);//{AddToScene: null} / {ChangeSelf: {mat...}}
					//console.log(time[line][a]);//null / {material: {opacity: 0.5}}
					//console.log('Executing...');
					//console.log(line);
					//console.log(a);
					//console.log(auxl[line][a]);
					auxl[line][a](time[line][a]);
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
		book.selectJumpMenu.MenuGen();
		book.selectJumpMenu.AddToMenuSceneTracker(book.selectJumpMenu);
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
		core.AddToScene(false,false,true);
		core.GetEl().addEventListener('mouseenter', Skip);
		core.on = true;
	}

	const Skip = () => {
		core.GetEl().emit('skip',{});
	}

	const Stop = () => {
		core.GetEl().removeEventListener('mouseenter', Skip);
		core.RemoveFromScene(false,false,true);
		core.on = false;
		//removeFromSceneTracker(core);
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
let bubble = Object.assign({}, textDisplay);
let book;
//bubble.core.position.x = core.core.position.x;
//bubble.core.position.y = core.core.position.y - 0.5;
//bubble.core.position.z = core.core.position.z + 0.25;
let text = auxl.SpeechSystem(bubble);
let menuTimeout;

	const Spawn = () => {
		//Reset book on each spawn
		book = auxl.Book(bookData, npc);
		npc.AddToScene(false,false,true);
		EnableSpeech();
		AddToNPCSceneTracker();
		//Need an NPC tracker, so it can run DisableSpeech on scene change
		//console.log('Spawn');
	}

	const Despawn = () => {
		DisableSpeech();
		npc.RemoveFromScene(false,false,true);
		RemoveFromNPCSceneTracker();
	}

	const AddToNPCSceneTracker = () => {
		if(auxl.zoneSpawned[npc.core.id]){} else {
    		//auxl.npcSpawned[npc.core.id] = {type: 'npc', obj: npc};
    		auxl.nodeSpawned[npc.core.id] = {type: 'npc', obj: npc};
		}
	}

	const RemoveFromNPCSceneTracker = () => {
		//delete auxl.npcSpawned[npc.core.id];
		delete auxl.nodeSpawned[npc.core.id];
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
			book.book.selectJumpMenu.MenuRemove();
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
		//console.log(object);
		//console.log(func);
		//console.log(params);
		//console.log(auxl[object]);
		auxl[object][func](params);
	}

	const IfElse = (obj) => {
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

return {npc, Spawn, Despawn, EnableSpeech, DisableSpeech, Speak, NextPage, ResetBook, Click, Jump, SelectJump, auxlObjMethod, IfElse, SetFlag, GetFlag}
}

//
//Hamburger Menu Companion
this.HamMenu = (name, core) => {

let ham = Object.assign({}, core);
ham.systemOpen = false;
ham.travelSettingsOpen = false;
ham.sceneSettingsOpen = false;

//Hamburger Menu Companion - Main Menu, Settings and Controls
//Travel Settings : Instant, Blink, Fade, Sphere
//Travel|Site Menu
//Scene Settings : Color Themes, Accessibility, Scene Info, etc...
let systemMenuButtons = {
travelSettings: 'Travel Settings',
sceneSettings: '[DISABLED]',
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


//On menu clicks, toggle the clickable class for all menu options to prevent multi-clicking intentional or not

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
		let speechIntervalB;
		let speechTimeoutB = setTimeout(function () {
			b = 0;
			buddy = ham.GetEl();

			speechIntervalB = setInterval(function() {
				buddyFaceMaterial.value = emotiSpeechArray[b];
				buddy.setAttribute('text', buddyFaceMaterial);
				if(b === emotiSpeechArray.length){b = 0}else{b++}
			}, 2700); //Interval
		}, 250); //Delay

	}

	const Start = () => {
		ham.AddToScene(false, false, true);
		autoScriptEmoticon();
		ham.GetEl().addEventListener('click', openCloseMenu)
	}

	const Remove = () => {
		//disable autoScriptEmoticon();
		ham.GetEl().removeEventListener('click', openCloseMenu);
		ham.RemoveFromScene(false, false, true);
		ham.systemOpen = false;
	}

	const openCloseMenu = () => {
		if(ham.systemOpen){
			closeSystemMenu();
		} else if(ham.travelSettingsOpen){
			closeTravelSettingsMenu()
			systemMenuGen();
		} else if(ham.sceneSettingsOpen){
		} else {
			systemMenuGen();
		}
	}

	const systemMenuGen = () => {
		ham.systemOpen = true;
		ham.GetEl().classList.toggle('clickable');
		ham.systemMenuData = {
			id: 'systemMenu',
			prompt: 'System Menu',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: name,
			method: 'SystemMenuClick',
			pos: new THREE.Vector3(0.5,1.5,-0.6),
		}

		let currNum = 0;
		for(let options in systemMenuButtons){
			//console.log(options);
			ham.systemMenuData.options['option'+currNum] = systemMenuButtons[options];
			ham.systemMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.systemMenu = auxl.Menu(ham.systemMenuData);
		ham.systemMenu.MenuGen();
		ham.systemMenu.AddToMenuSceneTracker(ham.systemMenu);
		ham.GetEl().classList.toggle('clickable');
		//ham.systemMenu.menu.layer.AnimateParent(auxl.animClickData);
	}

	const closeSystemMenu = () => {
		ham.systemOpen = false;
		ham.systemMenu.MenuRemove();
		ham.systemMenu.RemoveFromMenuSceneTracker();
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
		travelSettingsMenuGen();
	}

	const travelSettingsMenuGen = () => {
		ham.travelSettingsOpen = true;
		ham.travelSettingsMenuData = {
			id: 'travelSettings',
			prompt: 'Travel Settings',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: name,
			method: 'TravelSettingsMenuClick',
			pos: new THREE.Vector3(0.5,1.5,-0.6),
			//layout: 'vertical',
		}

		let currNum = 0;
		for(let options in travelSettingsButtons){
			//console.log(options);
			ham.travelSettingsMenuData.options['option'+currNum] = travelSettingsButtons[options];
			ham.travelSettingsMenuData.actions['action'+currNum] = options;
			currNum++;
		}
		ham.travelSettingsMenu = auxl.Menu(ham.travelSettingsMenuData);
		ham.travelSettingsMenu.MenuGen();
		ham.systemMenu.AddToMenuSceneTracker(ham.travelSettingsMenu);

	}

	const closeTravelSettingsMenu = () => {
		ham.travelSettingsOpen = false;
		ham.travelSettingsMenu.MenuRemove();
		ham.travelSettingsMenu.RemoveFromMenuSceneTracker();
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

return{ham, Start, Remove, SystemMenuClick, TravelSettingsMenuClick};
}

//
//Single Objs Gen Ring Spawn
this.ObjsGenRing = (data) => {
	let gen = Object.assign({}, data);
	let ogData = Object.assign({}, data.objData);
	let objData = JSON.parse(JSON.stringify(data.objData));

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

	let all = [];
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

		for(let a = 0; a < gen.total; a++){
			objData.id = ogData.id + a;

			//Color
			if(gen.ranColor){
				color = auxl.colorTheoryGen().base;
				objData.material.color = color;
				if(objData.material.emissive){
					objData.material.emissive = color;
				}
			}
			//Texture
			if(gen.ranTexture){
				objData.material.src = auxl.patterns[Math.floor(Math.random()*auxl.patterns.length)];
			}
			//Rotation
			rotX = objData.rotation.x;
			rotY = objData.rotation.y;
			rotZ = objData.rotation.z;
			if(gen.ranRotX){
				rotX += Math.random() * 360;
			}
			if(gen.ranRotY){
				rotY += Math.random() * 360;
			}
			if(gen.ranRotZ){
				rotZ += Math.random() * 360;
			}
			objData.rotation = new THREE.Vector3(rotX, rotY, rotZ);

			//Scale
			scaleX = gen.objData.scale.x;
			scaleY = gen.objData.scale.y;
			scaleZ = gen.objData.scale.z;
			if(gen.ranScaleX){
				scaleX += Math.random() * gen.scaleFlex;
			}
			if(gen.ranScaleY){
				scaleY += Math.random() * gen.scaleFlex;
			}
			if(gen.ranScaleZ){
				scaleZ += Math.random() * gen.scaleFlex;
			}
			objData.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);

			//Scale adjustment needs affect gen.sameTypeRadius
			//Need to spawn equal amount in each quadrant?
			posY = gen.objData.position.y;
			if(gen.ranYPos){
				posY += Math.random() * gen.yPosFlex;
			}

			//Position
			positionVec3 = randomPosition(gen.outerRingRadius, posY);
			objData.position = positionVec3;

			//Max attempts to check for avoiding collision
			let checking = 42;
			checkAllData: while (checking > 0) {
				if(a === 0){
					if(distance(positionVec3.x,positionVec3.z,0,0) < gen.innerRingRadius) {
						positionVec3 = randomPosition(gen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				for(let z=0; z < all.length; z++) {
					//Check the distance, if too close, change and repeat
					if(distance(positionVec3.x, positionVec3.z, all[z].core.position.x, all[z].core.position.z) < gen.sameTypeRadius || distance(positionVec3.x,positionVec3.z,0,0) < gen.innerRingRadius) {
						positionVec3 = randomPosition(gen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				break;
			}

			//Add randomized Core to All
			all.push(auxl.Core(objData));
		}

	}

	const SpawnAll = () => {
		for(let a = 0; a < gen.total; a++){
			all[a].AddToScene(false, false, true);
		}
		AddToSceneTracker();
	}

	const DespawnAll = () => {
		for(let a = 0; a < gen.total; a++){
			all[a].RemoveFromScene();
		}
		RemoveFromSceneTracker();
	}

	const AddToSceneTracker = () => {
		//Scene Tracking of Assets
		if(auxl.zoneSpawned[gen.id]){} else {
			//auxl.genSpawned[gen.id] = {type: 'gen', obj: gen};
			auxl.nodeSpawned[gen.id] = {type: 'gen', obj: gen};
		}
	}

	const RemoveFromSceneTracker = () => {
		//Clear Tracking of Asset
		//delete auxl.genSpawned[gen.id];
		delete auxl.nodeSpawned[gen.id];
	}

	return {all, genCores, SpawnAll, DespawnAll, AddToSceneTracker, RemoveFromSceneTracker};
}

//
//Scene Multi Asset Generator
this.SceneAssetGen = (sceneData) =>{
	//let ogData = Object.assign({}, data.objData);
	//let objData = JSON.parse(JSON.stringify(data.objData));
	//sceneData.data
	//sceneData.id
//Add the ability to read an array of different objects for same size
//Need to better optimize each size's radius
	//sceneData.tiny
	//sceneData.small
	//sceneData.med
	//sceneData.large
	//sceneData.huge
	let scene = Object.assign({}, sceneData);
	scene.assets = {}
	scene.assets.tiny = [];
	scene.assets.small = [];
	scene.assets.med = [];
	scene.assets.large = [];
	scene.assets.huge = [];
	let sizes = ['tiny','small','med','large','huge'];
	scene.grid = [];
	scene.ring0 = [];
	scene.ring1 = [];
	scene.ring2 = [];
	scene.ring3 = [];
	scene.ring4 = [];
	scene.ring5 = [];
	/*
	scene.ring = {
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
	scene.ring = {
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
	//scene.size.data
	//scene.size.id
	//scene.size.type
	//scene.size.radius
	//scene.size.min
	//scene.size.max
	//scene.size.rings
	//scene.size.objs
	//scene.size.ranYPos
	//scene.size.yPosFlex
	//scene.size.ranScaleX
	//scene.size.ranScaleY
	//scene.size.ranScaleZ
	//scene.size.scaleFlex
	//scene.size.ranRotX
	//scene.size.ranRotY
	//scene.size.ranRotZ
	//scene.size.ranColor
	//scene.size.ranTexture
	//scene.size.ranAnim
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
//console.log(scene.ring);
//Generate Distribution Points at Ring Radius'
let ring5 = [];
let ring4 = [];
let ring3 = [];
let ring2 = [];
let ring1 = [];
let ring0 = [];
let gridRing5 = discSampling('ring5',scene.ring.o5,scene.ring.i5);
//console.log(gridRing5);

let gridRing4 = discSampling('ring4',scene.ring.o4,scene.ring.i4,gridRing5);
//console.log(gridRing4);

let gridRing3 = discSampling('ring3',scene.ring.o3,scene.ring.i3,gridRing4);
//console.log(gridRing3);

let gridRing2 = discSampling('ring2',scene.ring.o2,scene.ring.i2,gridRing3);
//console.log(gridRing2);

let gridRing1 = discSampling('ring1',scene.ring.o1,scene.ring.i1,gridRing2);
//console.log(gridRing1);

let gridRing0 = discSampling('ring0',scene.ring.o0,scene.ring.i0,gridRing1);
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
	ring5[pos][0] -= scene.ring.o5/2;
	ring5[pos][1] -= scene.ring.o5/2;
	if(ring5[pos][0] === 0 && ring5[pos][1] === 0){
		ring5[pos][0] = ring5[pos][1] = scene.ring.o5/2;
	}
}
for(let pos in ring4){
	ring4[pos][0] -= scene.ring.o4/2;
	ring4[pos][1] -= scene.ring.o4/2;
	if(ring4[pos][0] === 0 && ring4[pos][1] === 0){
		ring4[pos][0] = ring4[pos][1] = scene.ring.o4/2;
	}
}
for(let pos in ring3){
	ring3[pos][0] -= scene.ring.o3/2;
	ring3[pos][1] -= scene.ring.o3/2;
	if(ring3[pos][0] === 0 && ring3[pos][1] === 0){
		ring3[pos][0] = ring3[pos][1] = scene.ring.o3/2;
	}
}
for(let pos in ring2){
	ring2[pos][0] -= scene.ring.o2/2;
	ring2[pos][1] -= scene.ring.o2/2;
	if(ring2[pos][0] === 0 && ring2[pos][1] === 0){
		ring2[pos][0] = ring2[pos][1] = scene.ring.o2/2;
	}
}
for(let pos in ring1){
	ring1[pos][0] -= scene.ring.o1/2;
	ring1[pos][1] -= scene.ring.o1/2;
	if(ring1[pos][0] === 0 && ring1[pos][1] === 0){
		ring1[pos][0] = ring1[pos][1] = scene.ring.o1/2;
	}
}
for(let pos in ring0){
	ring0[pos][0] -= scene.ring.o0/2;
	ring0[pos][1] -= scene.ring.o0/2;
	if(ring0[pos][0] === 0 && ring0[pos][1] === 0){
		ring0[pos][0] = ring0[pos][1] = scene.ring.o0/2;
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
			//let size = scene[sizes[type]];//scene.tiny object, scene.small object
			let size = Object.assign({}, scene[sizes[type]]);
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
							posX = (Math.random() * (scene.ring.o0*2) - scene.ring.o0) + scene.ring.i0;
							posZ = (Math.random() * (scene.ring.o0*2) - scene.ring.o0) + scene.ring.i0;
						}
					} else if(size.rings === 1){
						if(ring1Current < ring1.length){
							posX = ring1[ring1Current][0];
							posZ = ring1[ring1Current][1];
							ring1Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 1 Pos');
							posX = (Math.random() * (scene.ring.o1*2) - scene.ring.o1) + scene.ring.i1;
							posZ = (Math.random() * (scene.ring.o1*2) - scene.ring.o1) + scene.ring.i1;
						}
					} else if(size.rings === 2){
						if(ring2Current < ring2.length){
							posX = ring2[ring2Current][0];
							posZ = ring2[ring2Current][1];
							ring2Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 2 Pos');
							posX = (Math.random() * (scene.ring.o2*2) - scene.ring.o2) + scene.ring.i2;
							posZ = (Math.random() * (scene.ring.o2*2) - scene.ring.o2) + scene.ring.i2;
						}
					} else if(size.rings === 3){
						if(ring3Current < ring3.length){
							posX = ring3[ring3Current][0];
							posZ = ring3[ring3Current][1];
							ring3Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 3 Pos');
							posX = (Math.random() * (scene.ring.o3*2) - scene.ring.o3) + scene.ring.i3;
							posZ = (Math.random() * (scene.ring.o3*2) - scene.ring.o3) + scene.ring.i3;
						}
					} else if(size.rings === 4){
						if(ring4Current < ring4.length){
							posX = ring4[ring4Current][0];
							posZ = ring4[ring4Current][1];
							ring4Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 4 Pos');
							posX = (Math.random() * (scene.ring.o4*2) - scene.ring.o4) + scene.ring.i4;
							posZ = (Math.random() * (scene.ring.o4*2) - scene.ring.o4) + scene.ring.i4;
						}
					} else if(size.rings === 5){
						if(ring5Current < ring5.length){
							posX = ring5[ring5Current][0];
							posZ = ring5[ring5Current][1];
							ring5Current++;
						} else {
							//Out of predefined positions, choose ran
							//console.log('Out of Ring 5 Pos');
							posX = (Math.random() * (scene.ring.o5*2) - scene.ring.o5) + scene.ring.i5;
							posZ = (Math.random() * (scene.ring.o5*2) - scene.ring.o5) + scene.ring.i5;
						}
					} 



					objData.position = new THREE.Vector3(posX, posY, posZ);
					//console.log(objData.position);
					//Add randomized Core to All
					scene.assets[sizes[type]].push(auxl.Core(objData));
				}

			}
		}
	}
	genCores();
	const SpawnAll = () => {
		//console.log(scene.assets)
		//loop throusgh each size
		for(let type in sizes){
			//sizes[type]//tiny,small,med,large,huge
			//let size = scene[sizes[type]];//scene.tiny object, scene.small object
			let size = scene.assets[sizes[type]];
			//console.log(size);
			for(let each in size){
				size[each].AddToScene(false, false, true);
			}
			//AddToSceneTracker();
		}

	}

	const DespawnAll = () => {
		for(let type in sizes){
			//sizes[type]//tiny,small,med,large,huge
			//let size = scene[sizes[type]];//scene.tiny object, scene.small object
			let size = scene.assets[sizes[type]];
			//console.log(size);
			for(let each in size){
				size[each].RemoveFromScene();
			}
			//AddToSceneTracker();
		}
		//RemoveFromSceneTracker();
	}

	const AddToSceneTracker = () => {
		//Scene Tracking of Assets
		if(auxl.zoneSpawned[gen.id]){} else {
			//auxl.genSpawned[gen.id] = {type: 'gen', obj: gen};
			auxl.nodeSpawned[gen.id] = {type: 'gen', obj: gen};
		}
	}

	const RemoveFromSceneTracker = () => {
		//Clear Tracking of Asset
		//delete auxl.genSpawned[gen.id];
		delete auxl.nodeSpawned[gen.id];
	}


	return {scene, SpawnAll, DespawnAll,}

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

	const SpawnAll = (sceneWide) => {
		for(let each in teleport.all){
			teleport.all[each].AddAllToScene(true);
		}
		if(sceneWide){} else {
			AddToTeleportSceneTracker();
		}
	}

	const DespawnAll = (sceneWide) => {
		for(let each in teleport.all){
			teleport.all[each].RemoveAllFromScene(true);
		}
		if(sceneWide){} else {
			RemoveFromTeleportSceneTracker();
		}
	}

	const AddToTeleportSceneTracker = () => {
		if(auxl.zoneSpawned[teleport.id]){} else {
			auxl.nodeSpawned[teleport.id] = {type: 'teleport', obj: teleport};
		}
	}

	const RemoveFromTeleportSceneTracker = () => {
		delete auxl.nodeSpawned[id];
	}

	return {teleport, SpawnAll, DespawnAll};

}

//
//Memory Mini Game
this.MemoryGame = (...data) => {

	//Game Objects
	//Layered Object Generation
	let memoryLayerData = {}
	let memoryNullParentData = JSON.parse(JSON.stringify(auxl.nullParentData));
	memoryNullParentData.id = 'memoryParent';
	memoryNullParentData.position = new THREE.Vector3(0,1,-2);
	let memoryNullParent = auxl.Core(memoryNullParentData);
	memoryLayerData['parent'] = {};
	memoryLayerData['parent'].core = memoryNullParent;
	let memoryObjData = {};
	let memoryCores = {};
	for(let each in data){
		memoryObjData = data[each];
		memoryObjData.id = 'memory' + each;
		//memoryObjData.material = materials[each];
		memoryCores[each] = auxl.Core(memoryObjData);
		memoryLayerData['child'+each] = {};
		memoryLayerData['child'+each].core = memoryCores[each];
	}
	let memory = auxl.Layer('memory',memoryLayerData);

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

	const SpawnGame = () => {
		memory.AddAllToScene(true);
		memoryUI1.AddToScene(false, false, true);
		memoryUI2.AddToScene(false, false, true);
		AddSequenceListeners();
		GameMenuGen();
	}

	const DespawnGame = () => {
		RemoveSequenceListeners();
		memory.gameMenu.MenuRemove()
		memory.RemoveAllFromScene();
		memoryUI1.RemoveFromScene();
		memoryUI2.RemoveFromScene();
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

	const GameMenuGen = () => {

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
		memory.gameMenu.MenuGen();
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

	return{memory, SpawnGame, DespawnGame, GameMenuClick};
}

//
//Image Swapper
this.ImageSwapper = (id,mainData,buttonData,...materials) => {

	let imageSwapperCore;
	let thumbnailCores = [];
	let thumbnailPos = new THREE.Vector3(0,-0.3,0.05);
	//let startPos = (mainData.geometry.width/2)/materials.length;
	//let movePos = mainData.geometry.width/materials.length;

	//Layer
	let imageSwapperLayerData = {}
	for(let mat in materials){
		if(mat === '0'){
			mainData.material = materials[mat];
			imageSwapperCore = auxl.Core(mainData);
			imageSwapperLayerData['parent'] = {};
			imageSwapperLayerData['parent'].core = imageSwapperCore;
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
			thumbnailCores[mat] = auxl.Core(buttonData);
			imageSwapperLayerData['child'+mat] = {};
			imageSwapperLayerData['child'+mat].core = thumbnailCores[mat];
		}
	}
	let imageSwapper = auxl.Layer('imageSwapper',imageSwapperLayerData);

	const Click = (el) => {
		//Swap Material Sources with Parent
		let selectedMat = el.getAttribute('material').src;
		let replacedMat = JSON.parse(JSON.stringify(el.parentNode.getAttribute('material').src));

		el.parentNode.setAttribute('material',{src: selectedMat})
		el.setAttribute('material',{src: replacedMat})
	}

	const Show = () => {
		imageSwapper.AddAllToScene(true);
		AddToImageSwapperSceneTracker();
	}

	const Remove = () => {
		imageSwapper.RemoveAllFromScene(true);
		RemoveFromImageSwapperSceneTracker();
	}

	const AddToImageSwapperSceneTracker = () => {
		if(auxl.zoneSpawned[id]){} else {
    		auxl.nodeSpawned[id] = {type: 'imageSwapper', obj: imageSwapper};
		}

	}

	const RemoveFromImageSwapperSceneTracker = () => {
		delete auxl.nodeSpawned[id];
	}

	//Add autoplay and pause on hovering
	//Controls either left/right or thumbnails for each
	return {imageSwapper, Click, Show, Remove};

}

//Move the button generation and function assigning to within the Gallery as well as the art frame layer

//
//Gallery
this.Gallery = (core) => {

	let playInterval;
	let settingTimeout;

	const GetEl = () => {
		return core.GetEl();
	}

	const Forward = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('notMoving')){
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: false})
			let current = this.artFrameAllLayer.layer.all.parent.core.GetFlag('rotate');
			if(current === 3){
				current = 0;
			} else {
				current++;
			}
			if(current === 0 || current === 2){
			currentPage++;
			}
			this.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'rotate', value: current})
			updateBackTwo();
			//Get current artFrameAllLayer rotation
			let rotY = auxl.artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			auxl.anim90Data.from = rotY;
			auxl.anim90Data.to = rotY - 90;
			auxl.artFrameAllLayer.AnimateParent(auxl.anim90Data);
			let timeout = setTimeout(function () {
				auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: true})
			clearTimeout(timeout);
			}, auxl.anim90Data.dur+10); //Delay
		}
	}

	const Backward = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('notMoving')){
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: false})
			let current = this.artFrameAllLayer.layer.all.parent.core.GetFlag('rotate');
			if(current === 0){
				current = 3;
			} else {
				current--;
			}
			if(current === 0 || current === 2){
			currentPage--;
			}
			this.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'rotate', value: current})
			updateBackTwo();
			//Get current artFrameAllLayer rotation
			let rotY = auxl.artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			auxl.anim90Data.from = rotY;
			auxl.anim90Data.to = rotY + 90;
			auxl.artFrameAllLayer.AnimateParent(auxl.anim90Data);
			let timeout = setTimeout(function () {
				auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: true})
				clearTimeout(timeout);
			}, auxl.anim90Data.dur+10); //Delay
		}
	}

	const PlayPause = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('notPlaying')){
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notPlaying', value: false})
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: false})
			let current = auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('autoRotate');
				currentPage++;
				playInterval = setInterval(function() {
					current = auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('autoRotate');
					if(current === 7){
						current = 0;
						currentPage++;
					} else {
						current++;
					}
					auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'autoRotate', value: current})
					updateBack();
				}, auxl.anim360Data.dur/8); //Interval
			//Get current artFrameAllLayer rotation
			let rotY = auxl.artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			auxl.anim360Data.from = rotY;
			auxl.anim360Data.to = rotY - 360;
			auxl.artFrameAllLayer.AnimateParent(auxl.anim360Data);
			auxl.artFrameAllLayer.layer.all.parent.core.EmitEvent('play');

			auxl.buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/pause.obj'} });
			auxl.buttonPlayText.ChangeSelf({property: 'text', value: {value:'Pause', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		} else {
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notPlaying', value: true})
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: true})
			clearInterval(playInterval);
			//Stop current animation
			auxl.artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			auxl.buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} })
			auxl.buttonPlayText.ChangeSelf({property: 'text', value: {value:'Play', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		}
	}

	const Stop = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('notPlaying')){} else {
			//Stop current animation
			//auxl.artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			let rotY = auxl.artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			auxl.anim45MiscData.from = rotY;
			auxl.anim45MiscData.to = 1;
			auxl.artFrameAllLayer.AnimateParent(auxl.anim45MiscData);

			auxl.buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} });
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notPlaying', value: true})
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: true})
		}
	}

	const NextPage = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('loadingPage')){} else {
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'loadingPage', value: true})
			if(currentPage === auxl.maxPage){
				currentPage = 0;
			} else {
				currentPage++;
			}
			updateAll();
		}
	}

	const PrevPage = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('loadingPage')){} else {
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'loadingPage', value: true})
			if(currentPage === 0){
				currentPage = auxl.maxPage;
			} else {
				currentPage--;
			}
			updateAll();
		}
	}

	const RandomPage = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('loadingPage')){} else {
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'loadingPage', value: true})
			currentPage = Math.floor(Math.random()*auxl.maxPage);
			updateAll();
		}
	}

	const Settings = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('animating')){} else {
			auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'animating', value: true})
			settingTimeout = setTimeout(function () {
				auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'animating', value: false})
				clearTimeout(settingTimeout);
			}, 2050); //Delay
			if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('setting') === 0){
				auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'setting', value: 1})
				auxl.artFrame0.EmitEvent('to0');
				auxl.artFrame1.EmitEvent('to0');
				auxl.artFrame2.EmitEvent('to0');
				auxl.artFrame3.EmitEvent('to0');
				auxl.artFrame4.EmitEvent('to0');
				auxl.artFrame5.EmitEvent('to0');
				auxl.artFrame6.EmitEvent('to0');
				auxl.artFrame7.EmitEvent('to0');
			} else {
				auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'setting', value: 0})
				auxl.artFrame0.EmitEvent('to1');
				auxl.artFrame1.EmitEvent('to1');
				auxl.artFrame2.EmitEvent('to1');
				auxl.artFrame3.EmitEvent('to1');
				auxl.artFrame4.EmitEvent('to1');
				auxl.artFrame5.EmitEvent('to1');
				auxl.artFrame6.EmitEvent('to1');
				auxl.artFrame7.EmitEvent('to1');
			}
		}
	}

	const Info = () => {
		if(auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('info')){
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'info', value: false});
		} else {
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'info', value: true});
		}

	}

	const Init = () => {
		//Gallery Prep
		//Prep Movement Flags
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notMoving', value: true})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'notPlaying', value: true})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'rotate', value: 0})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'autoRotate', value: 0})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'loadingPage', value: false})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'animating', value: false})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'setting', value: 0})
		auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'info', value: false})
		auxl.buttonStopGallery.core.EnableDetail('Browse through the entire Art Institute of Chicago catalog of images in a casual viewing experiences. 8 frames surrounding the center displaying various images provided by AIC\'s public API. Control the image frames with a handful of buttons to jump to a random page, go back a page, go back a few images, view info, play the slideshow, go forward a few images, go to the next page and switch between 2 frame sizings. A random page number is loaded at the start from the 13209 available, so lots and lots of images to enjoy.');
		//Art Institute of Chicago API
		updateAll();
	}

	return {core,GetEl,Forward,Backward,PlayPause,Stop,NextPage,PrevPage,RandomPage,Settings, Info, Init}
}

//
//Gallery Testing

let mainColor = auxl.colorTheoryGen('#6ab0db');

//Frame Material
let paintingMaterial = {shader: "flat", color: "#55a5be", opacity: 1, alphaTest: 0.1};

//Button Parent
this.buttonParentData = {
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
this.buttonObjData = {
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
this.buttonBorderData = {
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
},
};

//Button Click Background
this.buttonClickData = {
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
this.buttonTextData = {
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

//Art Frame Parent
this.artFrameParentData = {
data: 'Art Frame Parent',
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
this.artFrameData = {
data: 'Art Frame',
id:'artFrame',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.01, width: 4.4, height: 2.55},
material: paintingMaterial,
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
this.artFrameTextData = {
data: 'Art Frame Text',
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

//Rotate 45
this.anim45Data = {
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
this.anim45MiscData = {
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
this.anim90Data = {
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
this.anim360Data = {
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

/*************************************************************/
//Convert from API update to list of gallery images

//use auxl.patterns as a list of images to display in the gallery
//how many images can be displayed, that amount is a page
//grab that amount from the beginning of the supplied image array
//and update all with those


//--header 'AIC-User-Agent: aic-xr-gallery (minty-crisp@protonmail.com)'
this.maxPage = 13209;
let art = {};
let currentPage = Math.floor(Math.random()*this.maxPage);

const img_url = "https://api.artic.edu/api/v1/artworks/";
let mainUrl = '';
let domain = '';
let id = '';
let end = '/full/843,/0/default.jpg';

async function getImgSrc(idNum){
	const response = await fetch(img_url + idNum);
	var data = await response.json();
	//console.log(data);

	//Get this once, then keep
	//console.log(data.config['iiif_url']);
	//	https://www.artic.edu/iiif/2

	//Append imageID
	//console.log(data.data['image_id']);
	//	1adf2696-8489-499b-cad2-821d7fde4b33

	//add this
	//	/full/843,/0/default.jpg

	domain = data.config['iiif_url'] + '/';
	id = data.data['image_id'];

	if(id){
		mainUrl = domain + id + end;
		//console.log(mainUrl)
		//Working Image
		//https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg
	} else {
		console.log('API missing image_id');
		mainUrl = './assets/img/api-error.jpg'
		//mainUrl = 'https://cdn.glitch.global/aee11787-4b00-4871-848e-af58f9f6147b/api-error.jpg?v=1673133033802'
	}
		return mainUrl;
}

async function updateFrame(frame, frameText, textValue, imgUrlWait){
	const imgSrc = await imgUrlWait;
	//console.log(frame)
	//console.log(imgSrc)
	auxl[frame].ChangeSelf({property: 'material', value:{src: imgSrc,shader: "flat", color: "#FFFFFF", opacity: 1}})
	auxl[frameText].ChangeSelf({property: 'text', value:{value: textValue, width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'}})

}

const pageUrlPrefix = "https://api.artic.edu/api/v1/artworks?page=";
const pageUrlPostfix = '&limit=8';

async function getPage(num){

	if(art[num]){
		//console.log('Page exists, do not redownload');
	} else {
		let url = pageUrlPrefix + num + pageUrlPostfix;
		const response = await fetch(url);
		var data = await response.json();

		//Page Info
		//data.pagination.total
		//data.pagination.limit
		//data.pagination.offset
		//data.pagination.total_pages
		//data.pagination.current_page
		//data.pagination.prev_url
		//data.pagination.next_url
		art[data.pagination.current_page] = {};
		//0-8 image info
		//data.data.0.id
		//data.data.0.api_link
		//data.data.0.title
		//data.data.0.artist_title
		let imagesInfo = data.data;
		for(let each in imagesInfo){
			//console.log(imagesInfo[each].id);
			//console.log(imagesInfo[each].title);
			//console.log(imagesInfo[each].artist_title);
			art[data.pagination.current_page][each] = {};
			art[data.pagination.current_page][each].id = imagesInfo[each].id;
			art[data.pagination.current_page][each].title = imagesInfo[each].title;
			art[data.pagination.current_page][each].artist = imagesInfo[each].artist_title;
		}
	}
	//console.log(art);
	return true;
}

async function updateAll(){
	if(await getPage(currentPage)){
		for(let each in art[currentPage]){
			//console.log(art[currentPage][each]);
			//let srcUrl = await getImgSrc(art[currentPage][each].id);
			updateFrame('artFrame'+each, 'artFrameText'+each, art[currentPage][each].title, await getImgSrc(art[currentPage][each].id));
		}
auxl.artFrameAllLayer.layer.all.parent.core.SetFlag({flag:'loadingPage', value: false})
	}
}

async function updateBackTwo(){
	if(await getPage(currentPage)){
		let current = auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('rotate');
		let update2 = [];
		let num;
		if(current === 0){
			update2 = [4,5];
		} else if(current === 1){
			update2 = [2,3];
		} else if(current === 2){
			update2 = [0,1];
		} else if(current === 3){
			update2 = [6,7];
		}
		for(let each in update2){
			num = update2[each];
			updateFrame('artFrame'+num, 'artFrameText'+num, art[currentPage][num].title, await getImgSrc(art[currentPage][num].id));
		}
	}
}

async function updateBack(){
	if(await getPage(currentPage)){
		let current = auxl.artFrameAllLayer.layer.all.parent.core.GetFlag('autoRotate');
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
		updateFrame('artFrame'+num, 'artFrameText'+num, art[currentPage][num].title, await getImgSrc(art[currentPage][num].id));
	}
}
/*************************************************************/

//Buttons

//Backward
this.buttonParentData.id = 'buttonBackwardParent';
this.buttonParentData.rotation = new THREE.Vector3(0,22.5,0);
this.buttonBackwardParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/backward.obj'}};
this.buttonObjData.id = 'buttonBackward';
this.buttonBorderData.id = 'buttonBackwardBorder';
this.buttonClickData.id = 'buttonBackwardClick';
this.buttonTextData.id = 'buttonBackwardText';
this.buttonTextData.text.value = 'Back';
this.buttonBackward = auxl.Core(this.buttonObjData);
this.buttonBackwardBorder = auxl.Core(this.buttonBorderData);
this.buttonBackwardClick = auxl.Core(this.buttonClickData);
this.buttonBackwardGallery = auxl.Gallery(this.buttonBackwardClick);
this.buttonBackwardText = auxl.Core(this.buttonTextData);
//Forward
this.buttonParentData.id = 'buttonForwardParent';
this.buttonParentData.rotation = new THREE.Vector3(0,-22.5,0);
this.buttonForwardParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/forward.obj'}};
this.buttonObjData.id = 'buttonForward';
this.buttonBorderData.id = 'buttonForwardBorder';
this.buttonClickData.id = 'buttonForwardClick';
this.buttonTextData.id = 'buttonForwardText';
this.buttonTextData.text.value = 'Forward';
this.buttonForward = auxl.Core(this.buttonObjData);
this.buttonForwardBorder = auxl.Core(this.buttonBorderData);
this.buttonForwardClick = auxl.Core(this.buttonClickData);
this.buttonForwardGallery = auxl.Gallery(this.buttonForwardClick);
this.buttonForwardText = auxl.Core(this.buttonTextData);
//Left Skip
this.buttonParentData.id = 'buttonLeftSkipParent';
this.buttonParentData.rotation = new THREE.Vector3(0,37.5,0);
this.buttonLeftSkipParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/left_skip.obj'}};
this.buttonObjData.id = 'buttonLeftSkip';
this.buttonBorderData.id = 'buttonLeftSkipBorder';
this.buttonClickData.id = 'buttonLeftSkipClick';
this.buttonTextData.id = 'buttonLeftSkipText';
this.buttonTextData.text.value = 'Back Page';
this.buttonLeftSkip = auxl.Core(this.buttonObjData);
this.buttonLeftSkipBorder = auxl.Core(this.buttonBorderData);
this.buttonLeftSkipClick = auxl.Core(this.buttonClickData);
this.buttonLeftSkipGallery = auxl.Gallery(this.buttonLeftSkipClick);
this.buttonLeftSkipText = auxl.Core(this.buttonTextData);
//Pause
//this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/pause.obj'}};
//this.buttonObjData.id = 'buttonObjPause';
//this.buttonBorderData.id = 'buttonBorderPause';
//this.buttonClickData.id = 'buttonClickPause';
//this.buttonPause = auxl.Core(this.buttonObjData);
//this.buttonPauseBorder = auxl.Core(this.buttonBorderData);
//this.buttonPauseClick = auxl.Core(this.buttonClickData);
//Play
this.buttonParentData.id = 'buttonPlayParent';
this.buttonParentData.rotation = new THREE.Vector3(0,-7.5,0);
this.buttonPlayParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/play.obj'}};
this.buttonObjData.id = 'buttonPlay';
this.buttonBorderData.id = 'buttonPlayBorder';
this.buttonClickData.id = 'buttonPlayClick';
this.buttonTextData.id = 'buttonPlayText';
this.buttonTextData.text.value = 'Play';
this.buttonPlay = auxl.Core(this.buttonObjData);
this.buttonPlayBorder = auxl.Core(this.buttonBorderData);
this.buttonPlayClick = auxl.Core(this.buttonClickData);
this.buttonPlayGallery = auxl.Gallery(this.buttonPlayClick);
this.buttonPlayText = auxl.Core(this.buttonTextData);
//Right Skip
this.buttonParentData.id = 'buttonRightSkipParent';
this.buttonParentData.rotation = new THREE.Vector3(0,-37.5,0);
this.buttonRightSkipParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/right_skip.obj'}};
this.buttonObjData.id = 'buttonRightSkip';
this.buttonBorderData.id = 'buttonRightSkipBorder';
this.buttonClickData.id = 'buttonRightSkipClick';
this.buttonTextData.id = 'buttonRightSkipText';
this.buttonTextData.text.value = 'Next Page';
this.buttonRightSkip = auxl.Core(this.buttonObjData);
this.buttonRightSkipBorder = auxl.Core(this.buttonBorderData);
this.buttonRightSkipClick = auxl.Core(this.buttonClickData);
this.buttonRightSkipGallery = auxl.Gallery(this.buttonRightSkipClick);
this.buttonRightSkipText = auxl.Core(this.buttonTextData);
//Settings
this.buttonParentData.id = 'buttonSettingsParent';
this.buttonParentData.rotation = new THREE.Vector3(0,-52.5,0);
this.buttonSettingsParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/settings.obj'}};
this.buttonObjData.id = 'buttonSettings';
this.buttonBorderData.id = 'buttonSettingsBorder';
this.buttonClickData.id = 'buttonSettingsClick';
this.buttonTextData.id = 'buttonSettingsText';
this.buttonTextData.text.value = 'Scale';
this.buttonSettings = auxl.Core(this.buttonObjData);
this.buttonSettingsBorder = auxl.Core(this.buttonBorderData);
this.buttonSettingsClick = auxl.Core(this.buttonClickData);
this.buttonSettingsGallery = auxl.Gallery(this.buttonSettingsClick);
this.buttonSettingsText = auxl.Core(this.buttonTextData);
//Stop
this.buttonParentData.id = 'buttonStopParent';
this.buttonParentData.rotation = new THREE.Vector3(0,7.5,0);
this.buttonStopParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/stop.obj'}};
this.buttonObjData.id = 'buttonStop';
this.buttonBorderData.id = 'buttonStopBorder';
this.buttonClickData.id = 'buttonStopClick';
this.buttonTextData.id = 'buttonStopText';
this.buttonTextData.text.value = 'Info';
this.buttonStop = auxl.Core(this.buttonObjData);
this.buttonStopBorder = auxl.Core(this.buttonBorderData);
this.buttonStopClick = auxl.Core(this.buttonClickData);
this.buttonStopGallery = auxl.Gallery(this.buttonStopClick);
this.buttonStopText = auxl.Core(this.buttonTextData);
//Hashtag
this.buttonParentData.id = 'buttonHashtagParent';
this.buttonParentData.rotation = new THREE.Vector3(0,52.5,0);
this.buttonHashtagParent = auxl.Core(this.buttonParentData);
this.buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/hashtag.obj'}};
this.buttonObjData.id = 'buttonHashtag';
this.buttonBorderData.id = 'buttonHashtagBorder';
this.buttonClickData.id = 'buttonHashtagClick';
this.buttonTextData.id = 'buttonHashtagText';
this.buttonTextData.text.value = 'Random Page';
this.buttonHashtag = auxl.Core(this.buttonObjData);
this.buttonHashtagBorder = auxl.Core(this.buttonBorderData);
this.buttonHashtagClick = auxl.Core(this.buttonClickData);
this.buttonHashtagGallery = auxl.Gallery(this.buttonHashtagClick);
this.buttonHashtagText = auxl.Core(this.buttonTextData);

//Button Backward Layer
this.buttonBackwardLayerData = {
parent: {core: this.buttonBackwardParent}, 
child0: {
	parent: {core: this.buttonBackward}, 
	child0: {core: this.buttonBackwardBorder},
	child1: {core: this.buttonBackwardClick},
	child2: {core: this.buttonBackwardText},
},
};
this.buttonBackwardLayer = auxl.Layer('buttonBackwardLayer',this.buttonBackwardLayerData);

//Button Hashtag Layer
this.buttonHashtagLayerData = {
parent: {core: this.buttonHashtagParent}, 
child0: {
	parent: {core: this.buttonHashtag}, 
	child0: {core: this.buttonHashtagBorder},
	child1: {core: this.buttonHashtagClick},
	child2: {core: this.buttonHashtagText},
},
};
this.buttonHashtagLayer = auxl.Layer('buttonHashtagLayer',this.buttonHashtagLayerData);

//Button Forward Layer
this.buttonForwardLayerData = {
parent: {core: this.buttonForwardParent}, 
child0: {
	parent: {core: this.buttonForward}, 
	child0: {core: this.buttonForwardBorder},
	child1: {core: this.buttonForwardClick},
	child2: {core: this.buttonForwardText},
},
};
this.buttonForwardLayer = auxl.Layer('buttonForwardLayer',this.buttonForwardLayerData);

//Button Left Skip Layer
this.buttonLeftSkipLayerData = {
parent: {core: this.buttonLeftSkipParent}, 
child0: {
	parent: {core: this.buttonLeftSkip}, 
	child0: {core: this.buttonLeftSkipBorder},
	child1: {core: this.buttonLeftSkipClick},
	child2: {core: this.buttonLeftSkipText},
},
};
this.buttonLeftSkipLayer = auxl.Layer('buttonLeftSkipLayer',this.buttonLeftSkipLayerData);

//Button Play Layer
this.buttonPlayLayerData = {
parent: {core: this.buttonPlayParent}, 
child0: {
	parent: {core: this.buttonPlay}, 
	child0: {core: this.buttonPlayBorder},
	child1: {core: this.buttonPlayClick},
	child2: {core: this.buttonPlayText},
},
};
this.buttonPlayLayer = auxl.Layer('buttonPlayLayer',this.buttonPlayLayerData);

//Button Right Skip Layer
this.buttonRightSkipLayerData = {
parent: {core: this.buttonRightSkipParent}, 
child0: {
	parent: {core: this.buttonRightSkip}, 
	child0: {core: this.buttonRightSkipBorder},
	child1: {core: this.buttonRightSkipClick},
	child2: {core: this.buttonRightSkipText},
},
};
this.buttonRightSkipLayer = auxl.Layer('buttonRightSkipLayer',this.buttonRightSkipLayerData);

//Button Settings Layer
this.buttonSettingsLayerData = {
parent: {core: this.buttonSettingsParent}, 
child0: {
	parent: {core: this.buttonSettings}, 
	child0: {core: this.buttonSettingsBorder},
	child1: {core: this.buttonSettingsClick},
	child2: {core: this.buttonSettingsText},
},
};
this.buttonSettingsLayer = auxl.Layer('buttonSettingsLayer',this.buttonSettingsLayerData);

//Button Stop Layer
this.buttonStopLayerData = {
parent: {core: this.buttonStopParent}, 
child0: {
	parent: {core: this.buttonStop}, 
	child0: {core: this.buttonStopBorder},
	child1: {core: this.buttonStopClick},
	child2: {core: this.buttonStopText},
},
};
this.buttonStopLayer = auxl.Layer('buttonStopLayer',this.buttonStopLayerData);

//Art Frame 0
this.artFrameParentData.id = 'artFrameParent0';
this.artFrameParentData.rotation = new THREE.Vector3(0,-315,0);
this.artFrameParent0 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame0',
this.artFrame0 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText0';
this.artFrameText0 = auxl.Core(this.artFrameTextData);

//Art Frame 1
this.artFrameParentData.id = 'artFrameParent1';
this.artFrameParentData.rotation = new THREE.Vector3(0,0,0);
this.artFrameParent1 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame1',
this.artFrame1 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText1';
this.artFrameText1 = auxl.Core(this.artFrameTextData);

//Art Frame 2
this.artFrameParentData.id = 'artFrameParent2';
this.artFrameParentData.rotation = new THREE.Vector3(0,-45,0);
this.artFrameParent2 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame2',
this.artFrame2 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText2';
this.artFrameText2 = auxl.Core(this.artFrameTextData);

//Art Frame 3
this.artFrameParentData.id = 'artFrameParent3';
this.artFrameParentData.rotation = new THREE.Vector3(0,-90,0);
this.artFrameParent3 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame3',
//this.artFrameData.material.opacity = 0.5,
this.artFrame3 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText3';
//this.artFrameTextData.text.opacity = 0.5;
this.artFrameText3 = auxl.Core(this.artFrameTextData);

//Art Frame 4
this.artFrameParentData.id = 'artFrameParent4';
this.artFrameParentData.rotation = new THREE.Vector3(0,-135,0);
this.artFrameParent4 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame4',
//this.artFrameData.material.opacity = 0,
this.artFrame4 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText4';
//this.artFrameTextData.text.opacity = 0;
this.artFrameText4 = auxl.Core(this.artFrameTextData);

//Art Frame 5
this.artFrameParentData.id = 'artFrameParent5';
this.artFrameParentData.rotation = new THREE.Vector3(0,-180,0);
this.artFrameParent5 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame5',
//this.artFrameData.material.opacity = 0,
this.artFrame5 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText5';
//this.artFrameTextData.text.opacity = 0;
this.artFrameText5 = auxl.Core(this.artFrameTextData);

//Art Frame 6
this.artFrameParentData.id = 'artFrameParent6';
this.artFrameParentData.rotation = new THREE.Vector3(0,-225,0);
this.artFrameParent6 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame6',
//this.artFrameData.material.opacity = 0,
this.artFrame6 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText6';
//this.artFrameTextData.text.opacity = 0;
this.artFrameText6 = auxl.Core(this.artFrameTextData);

//Art Frame 7
this.artFrameParentData.id = 'artFrameParent7';
this.artFrameParentData.rotation = new THREE.Vector3(0,-270,0);
this.artFrameParent7 = auxl.Core(this.artFrameParentData);
this.artFrameData.id = 'artFrame7',
//this.artFrameData.material.opacity = 0.5,
this.artFrame7 = auxl.Core(this.artFrameData);
this.artFrameTextData.id = 'artFrameText7';
//this.artFrameTextData.text.opacity = 0.5;
this.artFrameText7 = auxl.Core(this.artFrameTextData);

//All Frame Parent
this.artFrameParentData.id = 'artFrameParentAll';
this.artFrameParentData.rotation = new THREE.Vector3(0,1,0);
this.artFrameParentAll = auxl.Core(this.artFrameParentData);
//All Frames
this.artFrameAllLayerData = {
parent: {core: this.artFrameParentAll},
child0: {
	parent: {core: this.artFrameParent0}, 
	child0: {
		parent: {core: this.artFrame0}, 
		child0: {core: this.artFrameText0}, 
	},
},
child1: {
	parent: {core: this.artFrameParent1}, 
	child0: {
		parent: {core: this.artFrame1}, 
		child0: {core: this.artFrameText1}, 
	},
},
child2: {
	parent: {core: this.artFrameParent2}, 
	child0: {
		parent: {core: this.artFrame2}, 
		child0: {core: this.artFrameText2}, 
	},
},
child3: {
	parent: {core: this.artFrameParent3}, 
	child0: {
		parent: {core: this.artFrame3}, 
		child0: {core: this.artFrameText3}, 
	},
},
child4: {
	parent: {core: this.artFrameParent4}, 
	child0: {
		parent: {core: this.artFrame4}, 
		child0: {core: this.artFrameText4}, 
	},
},
child5: {
	parent: {core: this.artFrameParent5}, 
	child0: {
		parent: {core: this.artFrame5}, 
		child0: {core: this.artFrameText5}, 
	},
},
child6: {
	parent: {core: this.artFrameParent6}, 
	child0: {
		parent: {core: this.artFrame6}, 
		child0: {core: this.artFrameText6}, 
	},
},
child7: {
	parent: {core: this.artFrameParent7}, 
	child0: {
		parent: {core: this.artFrame7}, 
		child0: {core: this.artFrameText7}, 
	},
},

};
this.artFrameAllLayer = auxl.Layer('artFrameAllLayer',this.artFrameAllLayerData);

},//Init



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

//Grass Material
auxl.grassMaterial = {shader: "standard", color: "#55be71", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#397e4b", emissiveIntensity: 0.2};

//Water Material
auxl.waterMaterial = {shader: "standard", color: "#55a5be", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#65c3e0", emissiveIntensity: 0.2};

//Mountains
auxl.mountainMat1 = {shader: 'threeColorGradientShader', topColor: '#3b2f1d', middleColor: '#402e16', bottomColor: '#402e16', side: 'back'};
auxl.mountainMat2 = {shader: 'threeColorGradientShader', topColor: '#846943', middleColor: '#402e16', bottomColor: '#402e16', side: 'back'};
auxl.mountainMat3 = {shader: 'threeColorGradientShader', topColor: '#9b7d52', middleColor: '#58401f', bottomColor: '#4b3517', side: 'back'};
auxl.mountainMatSnow = {shader: 'threeColorGradientShader', topColor: '#e0d7ca', middleColor: '#b4a897', bottomColor: '#5f503b', side: 'back'};

//ImageSwapper Materials
auxl.mat0 = {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat1 = {src: './assets/img/vwave/1.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat2 = {src: './assets/img/vwave/2.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat3 = {src: './assets/img/vwave/3.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
auxl.mat4 = {src: './assets/img/vwave/4.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};



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
position: new THREE.Vector3(0,0,0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {
//locomotion:{uiid: 'beltUIParent', controller1id: 'vrController', courserid: 'mouseController',},
//['wasd-controls']:{enabled: true, acceleration: 25},
//['movement-controls']:{enabled: true, controls: 'gamepad, keyboard, touch', speed: 0.3, fly: false, constrainToNavMesh: false, camera: '#camera',},
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
//VR Controller
auxl.vrControllerData = {
data:'VR Controller',
id:'vrController',
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
['detect-inputs']:null,
visible: 'false',
},
};
auxl.vrController = auxl.Core(auxl.vrControllerData);
//VR Controller UI
auxl.vrControllerUIData = {
data:'VR Controller UI',
id:'vrControllerUI',
sources: false,
text: {value:'Controller UI', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
geometry: {primitive: 'plane', width: 0.25, height: 0.1},
material: {shader: "flat", color: "#ac2d2d", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(-0.15,-0.15,-0.25),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.5),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {visible: 'false',},
};
auxl.vrControllerUI = auxl.Core(auxl.vrControllerUIData);
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
classes: ['a-ent','player'],
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
material: {shader: "flat", color: "#000000", opacity: 0},
position: new THREE.Vector3(0,0,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
fadein:{property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'},

fadeout:{property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'}, 
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
material: {shader: "flat", color: "#000000", opacity: 1, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
spherein1:{property: 'geometry.thetaLength', from: 0, to: 180, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
spherein2: {property: 'geometry.thetaStart', from: 90, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},

sphereout1:{property: 'geometry.thetaLength', from: 180, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
sphereout2: {property: 'geometry.thetaStart', from: 0, to: 90, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
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
material: {shader: "flat", color: "#000000", opacity: 0, side: 'double'},
position: new THREE.Vector3(0,2.5,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
blinkin:{property: 'object3D.position.y', from: 2.5, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},

blinkout:{property: 'object3D.position.y', from: 1, to: 2.5, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
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
material: {shader: "flat", color: "#000000", opacity: 0, side: 'double'},
position: new THREE.Vector3(0,-2.5,-0.15),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
blinkin:{property: 'object3D.position.y', from: -2.5, to: -1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},

blinkout:{property: 'object3D.position.y', from: -1, to: -2.5, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 800, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
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
	parent: {core: auxl.vrController},
	child0: {core: auxl.vrControllerUI},
},
child2: {core: auxl.playerFloor},
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
sources: false,
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
auxl.HamGirl = auxl.HamMenu('HamGirl',auxl.hamComp);

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
data:'detail main',
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
data:'detail close',
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
auxl.memory = auxl.MemoryGame(auxl.memory0Data,auxl.memory1Data,auxl.memory2Data,auxl.memory3Data,);

    },
});

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('auxl-scene-library', {
	dependencies: ['auxl'],
    //schema: {
        //clickObj: {type: 'string', default: 'auxlObj'}
    //},
    init: function () {
		//console.log('AUXL Data INIT');
		//AUXL System
		const auxl = document.querySelector('a-scene').systems.auxl;

//Floor
//

//Node Floor
auxl.nodeFloorData = {
data:'full floor',
id:'nodeFloor',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#27693d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#27693d", emissiveIntensity: 0.2, side: 'front'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.02),
animations: {
daycolor:{property: 'material.color', from: '#613381', to: '#298625', dur: 90000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise'},
daycolor2:{property: 'material.color', from: '#298625', to: '#613381', dur: 180000, delay: 180000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise'},
nightcolor:{property: 'material.color', from: '#613381', to: '#99154E', dur: 90000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunset'},
nightcolor2:{property: 'material.color', from: '#613381', to: '#99154E', dur: 90000, delay: 90000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunset'},
},
mixins: false,
classes: ['a-ent', 'clickable'],
components: false,
};
auxl.nodeFloor = auxl.Core(auxl.nodeFloorData);

//Water Floor
auxl.waterFloorData = {
data:'waterFloorData',
id:'waterFloor',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 150, segments: 64, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", src: auxl.pattern80, repeat: '25 25',color: "#3c86b4", opacity: 1, metalness: 0.8, roughness: 0.2, emissive: "#3c86b4", emissiveIntensity: 0.2, side: 'front'},
position: new THREE.Vector3(0,0.1,-100),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.02),
animations: {
water1:{property: 'material.offset', from: '0 0', to: '10 -10', dur: 120000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.waterFloor = auxl.Core(auxl.waterFloorData);

//Ceilings
//

//Node Ceiling
auxl.nodeCeilingData = {
data:'nodeCeilingData',
id:'nodeCeiling',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 300, height: 300,},
material: {shader: "standard", src: auxl.pattern80, repeat: '25 25',color: "#3c86b4", opacity: 0.69, metalness: 0.8, roughness: 0.2, emissive: "#3c86b4", emissiveIntensity: 0.2, side: 'back'},
position: new THREE.Vector3(0,30,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
water1:{property: 'material.offset', from: '0 0', to: '-10 10', dur: 120000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeCeiling = auxl.Core(auxl.nodeCeilingData);

//Small Ceiling
auxl.smallCeilingData = {
data:'smallCeilingData',
id:'smallCeiling',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 20,},
material: {shader: "standard", src: auxl.pattern80, repeat: '40 40',color: "#214a64", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#214a64", emissiveIntensity: 0.2, side: 'back'},
position: new THREE.Vector3(0,4,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.smallCeiling = auxl.Core(auxl.smallCeilingData);

//Walls
//

//Node Wall
auxl.nodeWallParentData = {
data:'node wall',
id:'nodeWallParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,2,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeWallData = {
data:'node wall',
id:'nodeWall',
sources:false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 20, height: 4},
material: {shader: "standard", src: auxl.pattern18, repeat: '10 2.5',color: "#80401f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#80401f", emissiveIntensity: 0.8, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeWallParent = auxl.Core(auxl.nodeWallParentData);
auxl.nodeWallData.id = 'nodeWall1';
auxl.nodeWallData.position = new THREE.Vector3(0,0,-10);
auxl.nodeWall1 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall2';
auxl.nodeWallData.position = new THREE.Vector3(0,0,10);
auxl.nodeWall2 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall3';
auxl.nodeWallData.position = new THREE.Vector3(-10,0,0);
auxl.nodeWallData.rotation = new THREE.Vector3(0,90,0);
auxl.nodeWall3 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall4';
auxl.nodeWallData.position = new THREE.Vector3(10,0,0);
auxl.nodeWall4 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallsData = {
parent: {core: auxl.nodeWallParent}, 
child0: {core: auxl.nodeWall1}, 
child1: {core: auxl.nodeWall2},
child2: {core: auxl.nodeWall3},
child3: {core: auxl.nodeWall4},}
auxl.nodeWalls = auxl.Layer('nodeWalls',auxl.nodeWallsData);

//Horizon
//

//Mountains
auxl.mountainsParentData = {
data:'mountainsParentData',
id:'mountainsParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.mountainData = {
data:'mountainData',
id:'mountain',
sources:false,
text: false,
geometry: {primitive: 'cone', height: 5, radiusBottom: 5, radiusTop: 0, openEnded: true, segmentsHeight: 1, segmentsRadial: 9, thetaLength: 120, thetaStart: 0},
material: {shader: 'threeColorGradientShader', topColor: '#3b2f1d', middleColor: '#402e16', bottomColor: '#402e16', side: 'back'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(20,20,20),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.mountainsParent = auxl.Core(auxl.mountainsParentData);
auxl.mountainData.id = 'mountain1';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 0;
auxl.mountainData.position = new THREE.Vector3(175,0,175);
auxl.mountain1 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain2';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 150;
auxl.mountainData.geometry.thetaStart = -60;
auxl.mountainData.position = new THREE.Vector3(75,0,250);
auxl.mountain2 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain3';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 75;
auxl.mountainData.position = new THREE.Vector3(332,0,-192);
auxl.mountain3 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain4';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 160;
auxl.mountainData.geometry.thetaStart = 0;
auxl.mountainData.position = new THREE.Vector3(240,0,45);
auxl.mountain4 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain5';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 145;
auxl.mountainData.position = new THREE.Vector3(-84,0,-194);
auxl.mountain5 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain6';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 160;
auxl.mountainData.geometry.thetaStart = 90;
auxl.mountainData.position = new THREE.Vector3(143,0,-220);
auxl.mountain6 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain7';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 260;
auxl.mountainData.position = new THREE.Vector3(-291,0,174);
auxl.mountain7 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain8';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 160;
auxl.mountainData.geometry.thetaStart = 180;
auxl.mountainData.position = new THREE.Vector3(-254,0,-98);
auxl.mountain8 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain9';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 130;
auxl.mountainData.geometry.thetaStart = -85;
auxl.mountainData.position = new THREE.Vector3(-174,0,243);
auxl.mountain9 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain10';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 3;
auxl.mountainData.geometry.radiusBottom = 10;
auxl.mountainData.geometry.thetaLength = 150;
auxl.mountainData.geometry.thetaStart = -140;
auxl.mountainData.position = new THREE.Vector3(-325,0,42);
auxl.mountain10 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain11';
auxl.mountainData.material = auxl.mountainMat1;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 115;
auxl.mountainData.position = new THREE.Vector3(-55,0,-284);
auxl.mountain11 = auxl.Core(auxl.mountainData);
auxl.mountainData.id = 'mountain12';
auxl.mountainData.material = auxl.mountainMat2;
auxl.mountainData.geometry.height = 5;
auxl.mountainData.geometry.radiusBottom = 5;
auxl.mountainData.geometry.thetaLength = 120;
auxl.mountainData.geometry.thetaStart = 175;
auxl.mountainData.position = new THREE.Vector3(-180,0,-285);
auxl.mountain12 = auxl.Core(auxl.mountainData);
auxl.mountainsLayerData = {
parent: {core: auxl.mountainsParent}, 
child0: {core: auxl.mountain1}, 
child1: {core: auxl.mountain2},
child2: {core: auxl.mountain3},
child3: {core: auxl.mountain4},
child4: {core: auxl.mountain5},
child5: {core: auxl.mountain6},
child6: {core: auxl.mountain7},
child7: {core: auxl.mountain8},
child8: {core: auxl.mountain9},
child9: {core: auxl.mountain10},
child10: {core: auxl.mountain11},
child11: {core: auxl.mountain12},
}
auxl.mountains = auxl.Layer('mountains',auxl.mountainsLayerData);

//Atmosphere
//

//Clouds
auxl.cloudsParentData = {
data:'cloudsParentData',
id:'cloudsParent',
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
auxl.cloudData = {
data:'cloudData',
id:'cloud',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 100, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: 'threeColorGradientShader', topColor: '#bf83b8', middleColor: '#795474', bottomColor: '#cb9cc5', side: 'back',},
position: new THREE.Vector3(-250,100,-350),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,0.25,0.75),
animations:{
rotate:{property: 'rotation', from: new THREE.Vector3(0,0,0), to: new THREE.Vector3(45,360,45), dur: auxl.timeInDay, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.cloudsParent = auxl.Core(auxl.cloudsParentData);
auxl.cloudData.id = 'cloud1';
auxl.cloudData.position = new THREE.Vector3(-150,200,-300);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud2';
auxl.cloudData.position = new THREE.Vector3(-150,200,200);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud2 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud3';
auxl.cloudData.position = new THREE.Vector3(-50,200,-300);
auxl.cloudData.scale = new THREE.Vector3(0.5,0.5,0.25);
auxl.cloud3 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud4';
auxl.cloudData.position = new THREE.Vector3(-300,200,-50);
auxl.cloudData.scale = new THREE.Vector3(0.25,0.75,0.75);
auxl.cloud4 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud5';
auxl.cloudData.position = new THREE.Vector3(100,200,-100);
auxl.cloudData.scale = new THREE.Vector3(0.25,1,0.5);
auxl.cloud5 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud6';
auxl.cloudData.position = new THREE.Vector3(-25,200,25);
auxl.cloudData.scale = new THREE.Vector3(1,0.5,0.25);
auxl.cloud6 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud7';
auxl.cloudData.position = new THREE.Vector3(-200,200,50);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud7 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud8';
auxl.cloudData.position = new THREE.Vector3(50,200,100);
auxl.cloudData.scale = new THREE.Vector3(0.75,0.25,0.75);
auxl.cloud8 = auxl.Core(auxl.cloudData);
auxl.cloudLayerData = {
parent: {core: auxl.cloudsParent}, 
child0: {core: auxl.cloud1}, 
child1: {core: auxl.cloud2},
child2: {core: auxl.cloud3},
child3: {core: auxl.cloud4},
child4: {core: auxl.cloud5},
child5: {core: auxl.cloud6},
child6: {core: auxl.cloud7},
child7: {core: auxl.cloud8},
}
auxl.clouds = auxl.Layer('clouds',auxl.cloudLayerData);

//Environmental Ring Gen from Single Asset Testing
//

//Snow Mountains Basic
auxl.snowMountainsBasicData = {
data:'snowMountainsBasicData',
id:'snowMountainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiSnowMountainsBasicData = {
id: 'multiSnowMountainsBasic',
objData: auxl.snowMountainsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiSnowMountainsBasic = auxl.ObjsGenRing(auxl.multiSnowMountainsBasicData);
//Rainy Forest Basic
auxl.rainyForestBasicData = {
data:'rainyForestBasicData',
id:'rainyForestBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiRainyForestBasicData = {
id: 'multiRainyForestBasic',
objData: auxl.rainyForestBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiRainyForestBasic = auxl.ObjsGenRing(auxl.multiRainyForestBasicData);
//Grassy Hills Basic
auxl.grassyHillsBasicData = {
data:'grassyHillsBasicData',
id:'grassyHillsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiGrassyHillsBasicData = {
id: 'multiGrassyHillsBasic',
objData: auxl.grassyHillsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiGrassyHillsBasic = auxl.ObjsGenRing(auxl.multiGrassyHillsBasicData);
//Desert Plains Basic
auxl.desertPlainsBasicData = {
data:'desertPlainsBasicData',
id:'desertPlainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiDesertPlainsBasicData = {
id: 'multiDesertPlainsBasic',
objData: auxl.desertPlainsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiDesertPlainsBasic = auxl.ObjsGenRing(auxl.multiDesertPlainsBasicData);
//Ocean Beach Basic
auxl.oceanBeachBasicData = {
data:'oceanBeachBasicData',
id:'oceanBeachBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiOceanBeachBasicData = {
id: 'multiOceanBeachBasic',
objData: auxl.oceanBeachBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiOceanBeachBasic = auxl.ObjsGenRing(auxl.multiOceanBeachBasicData);

//Forest
//

//crop_melon
auxl.crop_melonData = {
data:'crop_melonData',
id:'crop_melon',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crop_melon.glb',
},
};
//flower_purpleA
auxl.flower_purpleAData = {
data:'flower_purpleA',
id:'flower_purpleA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_purpleA.glb',
},
};
//flower_redA
auxl.flower_redAData = {
data:'flower_redA',
id:'flower_redA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_redA.glb',
},
};
//flower_yellowA
auxl.flower_yellowAData = {
data:'flower_yellowA',
id:'flower_yellowA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_yellowA.glb',
},
};
//grass_large
auxl.grass_largeData = {
data:'grass_large',
id:'grass_large',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(6,3,6),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grass_large.glb',
},
};
//grass_leafsLarge
auxl.grass_leafsLargeData = {
data:'grass_leafsLarge',
id:'grass_leafsLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(6,3,6),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grass_leafsLarge.glb',
},
};
//pine
auxl.pineData = {
data:'pine',
id:'pine',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pine.glb',
},
};
//pineCrooked
auxl.pineCrookedData = {
data:'pineCrooked',
id:'pineCrooked',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pineCrooked.glb',
},
};
//plant_bush
auxl.plant_bushData = {
data:'plant_bush',
id:'plant_bush',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/plant_bush.glb',
},
};
//plant_bushLarge
auxl.plant_bushLargeData = {
data:'plant_bushLarge',
id:'plant_bushLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/plant_bushLarge.glb',
},
};
//rockLarge
auxl.rockLargeData = {
data:'rockLarge',
id:'rockLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockLarge.glb',
},
};
//rockMedium
auxl.rockMediumData = {
data:'rockMedium',
id:'rockMedium',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockMedium.glb',
},
};//MISSING
//rockSmall
auxl.rockSmallData = {
data:'rockSmall',
id:'rockSmall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockSmall.glb',
},
};
//shovelDirt
auxl.shovelDirtData = {
data:'shovelDirt',
id:'shovelDirt',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/shovelDirt.glb',
},
};
//tree_cone
auxl.tree_coneData = {
data:'tree_cone',
id:'tree_cone',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_cone.glb',
},
};
//tree_default
auxl.tree_defaultData = {
data:'tree_default',
id:'tree_default',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_default.glb',
},
};
//tree_fat
auxl.tree_fatData = {
data:'tree_fat',
id:'tree_fat',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_fat.glb',
},
};
//tree_oak
auxl.tree_oakData = {
data:'tree_oak',
id:'tree_oak',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_oak.glb',
},
};
//tree_pineDefaultA
auxl.tree_pineDefaultAData = {
data:'tree_pineDefaultA',
id:'tree_pineDefaultA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineDefaultA.glb',
},
};
//tree_pineDefaultB
auxl.tree_pineDefaultBData = {
data:'tree_pineDefaultB',
id:'tree_pineDefaultB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineDefaultB.glb',
},
};
//tree_pineGroundA
auxl.tree_pineGroundAData = {
data:'tree_pineGroundA',
id:'tree_pineGroundA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineGroundA.glb',
},
};
//tree_pineGroundB
auxl.tree_pineGroundBData = {
data:'tree_pineGroundB',
id:'tree_pineGroundB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineGroundB.glb',
},
};
//tree_pineRoundA
auxl.tree_pineRoundAData = {
data:'tree_pineRoundA',
id:'tree_pineRoundA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundA.glb',
},
};
//tree_pineRoundB
auxl.tree_pineRoundBData = {
data:'tree_pineRoundB',
id:'tree_pineRoundB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundB.glb',
},
};
//tree_pineRoundC
auxl.tree_pineRoundCData = {
data:'tree_pineRoundC',
id:'tree_pineRoundC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundC.glb',
},
};
//tree_pineRoundD
auxl.tree_pineRoundDData = {
data:'tree_pineRoundD',
id:'tree_pineRoundD',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundD.glb',
},
};
//tree_pineRoundE
auxl.tree_pineRoundEData = {
data:'tree_pineRoundE',
id:'tree_pineRoundE',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundE.glb',
},
};
//tree_pineRoundF
auxl.tree_pineRoundFData = {
data:'tree_pineRoundF',
id:'tree_pineRoundF',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundF.glb',
},
};
//tree_pineSmallA
auxl.tree_pineSmallAData = {
data:'tree_pineSmallA',
id:'tree_pineSmallA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallA.glb',
},
};
//tree_pineSmallB
auxl.tree_pineSmallBData = {
data:'tree_pineSmallB',
id:'tree_pineSmallB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallB.glb',
},
};
//tree_pineSmallC
auxl.tree_pineSmallCData = {
data:'tree_pineSmallC',
id:'tree_pineSmallC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallC.glb',
},
};
//tree_pineSmallD
auxl.tree_pineSmallDData = {
data:'tree_pineSmallD',
id:'tree_pineSmallD',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallD.glb',
},
};
//tree_pineTallA_detailed
auxl.tree_pineTallA_detailedData = {
data:'tree_pineTallA_detailedData',
id:'tree_pineTallA_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallA_detailed.glb',
},
};
//tree_pineTallB_detailed
auxl.tree_pineTallB_detailedData = {
data:'tree_pineTallB_detailedData',
id:'tree_pineTallB_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallB_detailed.glb',
},
};
//tree_pineTallC_detailed
auxl.tree_pineTallC_detailedData = {
data:'tree_pineTallC_detailedData',
id:'tree_pineTallC_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallC_detailed.glb',
},
};
//tree_pineTallD_detailed
auxl.tree_pineTallD_detailedData = {
data:'tree_pineTallD_detailedData',
id:'tree_pineTallD_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallD_detailed.glb',
},
};
//trunk
auxl.trunkData = {
data:'trunk',
id:'trunk',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/trunk.glb',
},
};
//trunkLong
auxl.trunkLongData = {
data:'trunkLong',
id:'trunkLong',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/trunkLong.glb',
},
};
//tree_plateau
auxl.tree_plateauData = {
data:'tree_plateauData',
id:'tree_plateau',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_plateau.glb',
},
};
//tree_simple
auxl.tree_simpleData = {
data:'tree_simpleData',
id:'tree_simple',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_simple.glb',
},
};
//tree_small
auxl.tree_smallData = {
data:'tree_smallData',
id:'tree_small',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_small.glb',
},
};
//tree_tall
auxl.tree_tallData = {
data:'tree_tallData',
id:'tree_tall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_tall.glb',
},
};
//tree_thin
auxl.tree_thinData = {
data:'tree_thinData',
id:'tree_thin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_thin.glb',
},
};
//log
auxl.logData = {
data:'logData',
id:'log',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/log.glb',
},
};
//mushroom_redGroup
auxl.mushroom_redGroupData = {
data:'mushroom_redGroupData',
id:'mushroom_redGroup',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/mushroom_redGroup.glb',
},
};
//mushroom_redTall
auxl.mushroom_redTallData = {
data:'mushroom_redTallData',
id:'mushroom_redTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/mushroom_redTall.glb',
},
};
//rock_tallA
auxl.rock_tallAData = {
data:'rock_tallAData',
id:'rock_tallA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rock_tallA.glb',
},
};
//rock_tallB
auxl.rock_tallBData = {
data:'rock_tallBData',
id:'rock_tallB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rock_tallB.glb',
},
};
//rockFlatGrass
auxl.rockFlatGrassData = {
data:'rockFlatGrassData',
id:'rockFlatGrass',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFlatGrass.glb',
},
};

//Snow
//

//treePineSnow
auxl.treePineSnowData = {
data:'treePineSnowData',
id:'treePineSnow',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnow.glb',
},
};
//treePineSnowed
auxl.treePineSnowedData = {
data:'treePineSnowedData',
id:'treePineSnowed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnowed.glb',
},
};
//treePineSnowRound
auxl.treePineSnowRoundData = {
data:'treePineSnowRoundData',
id:'treePineSnowRound',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnowRound.glb',
},
};
//treeDecorated
auxl.treeDecoratedData = {
data:'treeDecoratedData',
id:'treeDecorated',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treeDecorated.glb',
},
};
//snowFort
auxl.snowFortData = {
data:'snowFortData',
id:'snowFort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowFort.glb',
},
};
//snowman
auxl.snowmanData = {
data:'snowmanData',
id:'snowman',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowman.glb',
},
};
//snowmanFancy
auxl.snowmanFancyData = {
data:'snowmanFancyData',
id:'snowmanFancy',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowmanFancy.glb',
},
};
//snowPatch
auxl.snowPatchData = {
data:'snowPatchData',
id:'snowPatch',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowPatch.glb',
},
};
//rocks
auxl.rocksData = {
data:'rocksData',
id:'rocks',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rocks.glb',
},
};
//rocksTall
auxl.rocksTallData = {
data:'rocksTallData',
id:'rocksTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rocksTall.glb',
},
};

//Graveyard
//

//cross
auxl.crossData = {
data:'crossData',
id:'cross',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cross.glb',
},
};
//crossColumn
auxl.crossColumnData = {
data:'crossColumnData',
id:'crossColumn',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crossColumn.glb',
},
};
//crossWood
auxl.crossWoodData = {
data:'crossWoodData',
id:'crossWood',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crossWood.glb',
},
};
//debris
auxl.debrisData = {
data:'debrisData',
id:'debris',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/debris.glb',
},
};
//debrisWood
auxl.debrisWoodData = {
data:'debrisWoodData',
id:'debrisWood',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/debrisWood.glb',
},
};
//fenceDamaged
auxl.fenceDamagedData = {
data:'fenceDamagedData',
id:'fenceDamaged',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/fenceDamaged.glb',
},
};
//ghost
auxl.ghostData = {
data:'ghostData',
id:'ghost',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/ghost.glb',
},
};
//grave
auxl.graveData = {
data:'graveData',
id:'grave',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grave.glb',
},
};
//gravestoneBevel
auxl.gravestoneBevelData = {
data:'gravestoneBevelData',
id:'gravestoneBevel',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneBevel.glb',
},
};
//gravestoneBroken
auxl.gravestoneBrokenData = {
data:'gravestoneBrokenData',
id:'gravestoneBroken',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneBroken.glb',
},
};
//gravestoneCross
auxl.gravestoneCrossData = {
data:'gravestoneCrossData',
id:'gravestoneCross',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneCross.glb',
},
};
//gravestoneCrossLarge
auxl.gravestoneCrossLargeData = {
data:'gravestoneCrossLargeData',
id:'gravestoneCrossLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneCrossLarge.glb',
},
};
//gravestoneDebris
auxl.gravestoneDebrisData = {
data:'gravestoneDebrisData',
id:'gravestoneDebris',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneDebris.glb',
},
};
//gravestoneDecorative
auxl.gravestoneDecorativeData = {
data:'gravestoneDecorativeData',
id:'gravestoneDecorative',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneDecorative.glb',
},
};
//gravestoneFlat
auxl.gravestoneFlatData = {
data:'gravestoneFlatData',
id:'gravestoneFlat',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneFlat.glb',
},
};
//gravestoneFlatOpen
auxl.gravestoneFlatOpenData = {
data:'gravestoneFlatOpenData',
id:'gravestoneFlatOpen',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneFlatOpen.glb',
},
};
//gravestoneRoof
auxl.gravestoneRoofData = {
data:'gravestoneRoofData',
id:'gravestoneRoof',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneRoof.glb',
},
};
//gravestoneRound
auxl.gravestoneRoundData = {
data:'gravestoneRoundData',
id:'gravestoneRound',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneRound.glb',
},
};
//gravestoneWide
auxl.gravestoneWideData = {
data:'gravestoneWideData',
id:'gravestoneWide',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneWide.glb',
},
};
//pumpkin
auxl.pumpkinData = {
data:'pumpkinData',
id:'pumpkin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkin.glb',
},
};
//pumpkinCarved
auxl.pumpkinCarvedData = {
data:'pumpkinCarvedData',
id:'pumpkinCarved',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinCarved.glb',
},
};
//pumpkinTall
auxl.pumpkinTallData = {
data:'pumpkinTallData',
id:'pumpkinTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinTall.glb',
},
};
//pumpkinTallCarved
auxl.pumpkinTallCarvedData = {
data:'pumpkinTallCarvedData',
id:'pumpkinTallCarved',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinTallCarved.glb',
},
};
//shovelDirt
auxl.shovelDirtData = {
data:'shovelDirtData',
id:'shovelDirt',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/shovelDirt.glb',
},
};

//Desert
//

//cactus_short
auxl.cactus_shortData = {
data:'cactus_shortData',
id:'cactus_short',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cactus_short.glb',
},
};
//cactus_tall
auxl.cactus_tallData = {
data:'cactus_tallData',
id:'cactus_tall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cactus_tall.glb',
},
};
//crops_cornStageA
auxl.crops_cornStageAData = {
data:'crops_cornStageAData',
id:'crops_cornStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageA.glb',
},
};

//Beach
//

//tree_palm
auxl.tree_palmData = {
data:'tree_palm',
id:'tree_palm',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palm.glb',
},
};
//tree_palmBend
auxl.tree_palmBendData = {
data:'tree_palmBend',
id:'tree_palmBend',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmBend.glb',
},
};
//tree_palmDetailedShort
auxl.tree_palmDetailedShortData = {
data:'tree_palmDetailedShort',
id:'tree_palmDetailedShort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmDetailedShort.glb',
},
};
//tree_palmDetailedTall
auxl.tree_palmDetailedTallData = {
data:'tree_palmDetailedTall',
id:'tree_palmDetailedTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmDetailedTall.glb',
},
};
//tree_palmShort
auxl.tree_palmShortData = {
data:'tree_palmShortData',
id:'tree_palmShort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmShort.glb',
},
};
//tree_palmTall
auxl.tree_palmTallData = {
data:'tree_palmTallData',
id:'tree_palmTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmTall.glb',
},
};
//canoe
auxl.canoeData = {
data:'canoeData',
id:'canoe',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,-30,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/canoe.glb',
},
};
//canoe_paddle
auxl.canoe_paddleData = {
data:'canoe_paddleData',
id:'canoe_paddle',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,15,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/canoe_paddle.glb',
},
};
//crops_bambooStageA
auxl.crops_bambooStageAData = {
data:'crops_bambooStageAData',
id:'crops_bambooStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_bambooStageA.glb',
},
};
//crops_bambooStageB
auxl.crops_bambooStageBData = {
data:'crops_bambooStageBData',
id:'crops_bambooStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_bambooStageB.glb',
},
};

//Underwater
//

//crops_wheatStageA
auxl.crops_wheatStageAData = {
data:'crops_wheatStageAData',
id:'crops_wheatStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_wheatStageA.glb',
},
};
//crops_wheatStageB
auxl.crops_wheatStageBData = {
data:'crops_wheatStageBData',
id:'crops_wheatStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_wheatStageB.glb',
},
};
//crops_cornStageB
auxl.crops_cornStageBData = {
data:'crops_cornStageBData',
id:'crops_cornStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageB.glb',
},
};
//crops_cornStageC
auxl.crops_cornStageCData = {
data:'crops_cornStageCData',
id:'crops_cornStageC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageC.glb',
},
};
//crops_leafsStageA
auxl.crops_leafsStageAData = {
data:'crops_leafsStageAData',
id:'crops_leafsStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_leafsStageA.glb',
},
};
//crops_leafsStageB
auxl.crops_leafsStageBData = {
data:'crops_leafsStageBData',
id:'crops_leafsStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_leafsStageB.glb',
},
};
//statue_head
auxl.statue_headData = {
data:'statue_headData',
id:'statue_head',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/statue_head.glb',
},
};
//rockFormationLarge
auxl.rockFormationLargeData = {
data:'rockFormationLarge',
id:'rockFormationLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationLarge.glb',
},
};
//rockFormationMedium
auxl.rockFormationMediumData = {
data:'rockFormationMedium',
id:'rockFormationMedium',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationMedium.glb',
},
};
//rockFormationSmall
auxl.rockFormationSmallData = {
data:'rockFormationSmall',
id:'rockFormationSmall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationSmall.glb',
},
};

//
//Scene Gen Data

//Floating Island Forest
//
//Tiny
auxl.tinyForest2Data = {
data: 'tinyForest2Data',
id: 'tinyForest2',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.flower_redAData,
auxl.mushroom_redGroupData,
auxl.mushroom_redTallData,
auxl.crop_melonData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallForest2Data = {
data: 'smallForest2Data',
id: 'smallForest2',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.grass_largeData,
],
ranYPos: false,
yPosFlex: 6,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medForest2Data = {
data: 'medForest2Data',
id: 'medForest2',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.plant_bushData,
auxl.tree_simpleData,
auxl.tree_smallData,
auxl.tree_thinData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeForest2Data = {
data: 'largeForest2Data',
id: 'largeForest2',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.tree_plateauData,
auxl.tree_tallData,
auxl.tree_coneData,
auxl.tree_defaultData,

],
ranYPos: false,
yPosFlex: 2,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeForest2Data = {
data: 'hugeForest2Data',
id: 'hugeForest2',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.tree_fatData,
auxl.tree_oakData,
auxl.rock_tallAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Forest Scene 2 Data
auxl.forestScene2Data = {
data:'forestScene2Data',
id:'forestScene2',
tiny: auxl.tinyForest2Data,
small: auxl.smallForest2Data,
med: auxl.medForest2Data,
large: auxl.largeForest2Data,
huge: auxl.hugeForest2Data,
};
auxl.forestScene2 = auxl.SceneAssetGen(auxl.forestScene2Data);
//Rainy Forest
//
//Tiny
auxl.tinyForest1Data = {
data: 'tinyForest1Data',
id: 'tinyForest1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.flower_purpleAData,
auxl.flower_yellowAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallForest1Data = {
data: 'smallForest1Data',
id: 'smallForest1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.grass_leafsLargeData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medForest1Data = {
data: 'medForest1Data',
id: 'medForest1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.plant_bushLargeData,
auxl.tree_pineRoundCData,
auxl.tree_pineRoundDData,
auxl.tree_pineRoundEData,
auxl.tree_pineRoundFData,
auxl.tree_pineSmallAData,
auxl.tree_pineSmallBData,
auxl.tree_pineSmallCData,
auxl.tree_pineSmallDData,
auxl.trunkData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeForest1Data = {
data: 'largeForest1Data',
id: 'largeForest1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.pineCrookedData,
auxl.tree_pineRoundAData,
auxl.tree_pineRoundBData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkLongData,
auxl.logData,
auxl.rock_tallBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeForest1Data = {
data: 'hugeForest1Data',
id: 'hugeForest1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.rockSmallData,
auxl.rockLargeData,
auxl.pineData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
auxl.tree_pineDefaultAData,
auxl.tree_pineDefaultBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Forest Scene 1 Data
auxl.forestScene1Data = {
data:'forestScene1Data',
id:'forestScene1',
tiny: auxl.tinyForest1Data,
small: auxl.smallForest1Data,
med: auxl.medForest1Data,
large: auxl.largeForest1Data,
huge: auxl.hugeForest1Data,
};
auxl.forestScene1 = auxl.SceneAssetGen(auxl.forestScene1Data);
//Snowy Forest
//
//Tiny
auxl.tinySnowForest1Data = {
data: 'tinySnowForest1Data',
id: 'tinySnowForest1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallSnowForest1Data = {
data: 'smallSnowForest1Data',
id: 'smallSnowForest1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.snowmanData,
auxl.snowmanFancyData,
auxl.treeDecoratedData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medSnowForest1Data = {
data: 'medSnowForest1Data',
id: 'medSnowForest1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.treePineSnowRoundData,
auxl.treePineSnowedData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeSnowForest1Data = {
data: 'largeSnowForest1Data',
id: 'largeSnowForest1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.treePineSnowData,
auxl.rocksData,
auxl.snowFortData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeSnowForest1Data = {
data: 'hugeSnowForest1Data',
id: 'hugeSnowForest1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.treePineSnowedData,
auxl.rocksTallData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Snow Forest Scene 1 Data
auxl.snowForestScene1Data = {
data:'snowForestScene1Data',
id:'snowForestScene1',
tiny: auxl.tinySnowForest1Data,
small: auxl.smallSnowForest1Data,
med: auxl.medSnowForest1Data,
large: auxl.largeSnowForest1Data,
huge: auxl.hugeSnowForest1Data,
};
auxl.snowForestScene1 = auxl.SceneAssetGen(auxl.snowForestScene1Data);
//Graveyard
//
//Tiny
auxl.tinyGraveyard1Data = {
data: 'tinyGraveyard1Data',
id: 'tinyGraveyard1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.pumpkinData,
auxl.pumpkinCarvedData,
auxl.pumpkinTallData,
auxl.pumpkinTallCarvedData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallGraveyard1Data = {
data: 'smallGraveyard1Data',
id: 'smallGraveyard1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.gravestoneBevelData,
auxl.gravestoneBrokenData,
auxl.gravestoneCrossData,
auxl.gravestoneDebrisData,
auxl.gravestoneFlatData,
auxl.trunkData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medGraveyard1Data = {
data: 'medGraveyard1Data',
id: 'medGraveyard1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.ghostData,
auxl.gravestoneCrossLargeData,
auxl.gravestoneDecorativeData,
auxl.gravestoneFlatOpenData,
auxl.gravestoneRoofData,
auxl.gravestoneRoundData,
auxl.gravestoneWideData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeGraveyard1Data = {
data: 'largeGraveyard1Data',
id: 'largeGraveyard1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.debrisData,
auxl.debrisWoodData,
auxl.fenceDamagedData,
auxl.graveData,
auxl.shovelDirtData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkData,
auxl.trunkLongData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeGraveyard1Data = {
data: 'hugeGraveyard1Data',
id: 'hugeGraveyard1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.crossData,
auxl.crossColumnData,
auxl.crossWoodData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkData,
auxl.trunkLongData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Graveyard Scene 1 Data
auxl.graveyardScene1Data = {
data:'graveyardScene1Data',
id:'graveyardScene1',
tiny: auxl.tinyGraveyard1Data,
small: auxl.smallGraveyard1Data,
med: auxl.medGraveyard1Data,
large: auxl.largeGraveyard1Data,
huge: auxl.hugeGraveyard1Data,
};
auxl.graveyardScene1 = auxl.SceneAssetGen(auxl.graveyardScene1Data);
//Desert
//
//Tiny
auxl.tinyDesert1Data = {
data: 'tinyDesert1Data',
id: 'tinyDesert1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_cornStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallDesert1Data = {
data: 'smallDesert1Data',
id: 'smallDesert1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.cactus_shortData,
auxl.crops_cornStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medDesert1Data = {
data: 'medDesert1Data',
id: 'medDesert1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.cactus_tallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeDesert1Data = {
data: 'largeDesert1Data',
id: 'largeDesert1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.cactus_shortData,
auxl.cactus_tallData,

],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeDesert1Data = {
data: 'hugeDesert1Data',
id: 'hugeDesert1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.cactus_shortData,
auxl.cactus_tallData,
auxl.rockFormationSmallData,
auxl.rockFormationMediumData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Desert Scene 1 Data
auxl.desertScene1Data = {
data:'desertScene1Data',
id:'desertScene1',
tiny: auxl.tinyDesert1Data,
small: auxl.smallDesert1Data,
med: auxl.medDesert1Data,
large: auxl.largeDesert1Data,
huge: auxl.hugeDesert1Data,
};
auxl.desertScene1 = auxl.SceneAssetGen(auxl.desertScene1Data);
//Beach
//
//Tiny
auxl.tinyBeach1Data = {
data: 'tinyBeach1Data',
id: 'tinyBeach1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_bambooStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallBeach1Data = {
data: 'smallBeach1Data',
id: 'smallBeach1',
type: 'small',
radius: 0.25,
min: 10,
max: 25,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.crops_bambooStageAData,
auxl.crops_bambooStageBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medBeach1Data = {
data: 'medBeach1Data',
id: 'medBeach1',
type: 'med',
radius: 1,
min: 15,
max: 30,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeBeach1Data = {
data: 'largeBeach1Data',
id: 'largeBeach1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeBeach1Data = {
data: 'hugeBeach1Data',
id: 'hugeBeach1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Beach Scene 1 Data
auxl.beachScene1Data = {
data:'beachScene1Data',
id:'beachScene1',
tiny: auxl.tinyBeach1Data,
small: auxl.smallBeach1Data,
med: auxl.medBeach1Data,
large: auxl.largeBeach1Data,
huge: auxl.hugeBeach1Data,
};
auxl.beachScene1 = auxl.SceneAssetGen(auxl.beachScene1Data);
//Underwater
//
//Tiny
auxl.tinyUnderwater1Data = {
data: 'tinyUnderwater1Data',
id: 'tinyUnderwater1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_wheatStageAData,
auxl.crops_cornStageBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallUnderwater1Data = {
data: 'smallUnderwater1Data',
id: 'smallUnderwater1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.crops_wheatStageBData,
auxl.crops_cornStageCData,
auxl.crops_leafsStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medUnderwater1Data = {
data: 'medUnderwater1Data',
id: 'medUnderwater1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.crops_wheatStageBData,
auxl.crops_cornStageCData,
auxl.crops_leafsStageAData,
auxl.crops_wheatStageAData,
auxl.crops_cornStageBData,
auxl.crops_leafsStageBData,
auxl.rockFormationSmallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeUnderwater1Data = {
data: 'largeUnderwater1Data',
id: 'largeUnderwater1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.rockFormationMediumData,
auxl.statue_headData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeUnderwater1Data = {
data: 'hugeUnderwater1Data',
id: 'hugeUnderwater1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[

auxl.statue_headData,
auxl.rockFormationLargeData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Underwater Scene 1 Data
auxl.underwaterScene1Data = {
data:'underwaterScene1Data',
id:'underwaterScene1',
tiny: auxl.tinyUnderwater1Data,
small: auxl.smallUnderwater1Data,
med: auxl.medUnderwater1Data,
large: auxl.largeUnderwater1Data,
huge: auxl.hugeUnderwater1Data,
};
auxl.underwaterScene1 = auxl.SceneAssetGen(auxl.underwaterScene1Data);

//
//Multi Obj Gen Data

//Grass Rock
auxl.multiRockFlatGrassData = {
data: 'multiRockFlatGrassData',
id: 'multiRockFlatGrass',
objData: auxl.rockFlatGrassData,
total: 20,
outerRingRadius: 140,
innerRingRadius: 80,
sameTypeRadius: 15,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 10,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiRockFlatGrass = auxl.ObjsGenRing(auxl.multiRockFlatGrassData);
//Flowers
auxl.multiFlowerPurpleAData = {
id: 'multiFlowerPurpleA',
objData: auxl.flower_purpleAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerPurpleA = auxl.ObjsGenRing(auxl.multiFlowerPurpleAData);
auxl.multiFlowerRedAData = {
id: 'multiFlowerRedA',
objData: auxl.flower_redAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerRedA = auxl.ObjsGenRing(auxl.multiFlowerRedAData);
auxl.multiFlowerYellowAData = {
id: 'multiFlowerYellowA',
objData: auxl.flower_yellowAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerYellowA = auxl.ObjsGenRing(auxl.multiFlowerYellowAData);
//Grass
auxl.multiGrassLargeData = {
id: 'multiGrassLarge',
objData: auxl.grass_largeData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 2,
sameTypeRadius: 3,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiGrassLarge = auxl.ObjsGenRing(auxl.multiGrassLargeData);
auxl.multiGrassLeafsLargeData = {
id: 'multiGrassLeafsLarge',
objData: auxl.grass_leafsLargeData,
total: 10,
outerRingRadius: 30,
innerRingRadius: 2,
sameTypeRadius: 4,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiGrassLeafsLarge = auxl.ObjsGenRing(auxl.multiGrassLeafsLargeData);
//Trees
auxl.multitree_pineGroundAData = {
id: 'multitree_pineGroundA',
objData: auxl.tree_pineGroundAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineGroundA = auxl.ObjsGenRing(auxl.multitree_pineGroundAData);
auxl.multitree_pineGroundBData = {
id: 'multitree_pineGroundB',
objData: auxl.tree_pineGroundBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineGroundB = auxl.ObjsGenRing(auxl.multitree_pineGroundBData);
auxl.multitree_pineRoundAData = {
id: 'multitree_pineRoundA',
objData: auxl.tree_pineRoundAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundA = auxl.ObjsGenRing(auxl.multitree_pineRoundAData);
auxl.multitree_pineRoundBData = {
id: 'multitree_pineRoundB',
objData: auxl.tree_pineRoundBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundB = auxl.ObjsGenRing(auxl.multitree_pineRoundBData);
auxl.multitree_pineRoundCData = {
id: 'multitree_pineRoundC',
objData: auxl.tree_pineRoundCData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundC = auxl.ObjsGenRing(auxl.multitree_pineRoundCData);
auxl.multitree_pineRoundDData = {
id: 'multitree_pineRoundD',
objData: auxl.tree_pineRoundDData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundD = auxl.ObjsGenRing(auxl.multitree_pineRoundDData);
auxl.multitree_pineRoundEData = {
id: 'multitree_pineRoundE',
objData: auxl.tree_pineRoundEData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundE = auxl.ObjsGenRing(auxl.multitree_pineRoundEData);
auxl.multitree_pineRoundFData = {
id: 'multitree_pineRoundF',
objData: auxl.tree_pineRoundFData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundF = auxl.ObjsGenRing(auxl.multitree_pineRoundFData);
auxl.multitree_pineSmallAData = {
id: 'multitree_pineSmallA',
objData: auxl.tree_pineSmallAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallA = auxl.ObjsGenRing(auxl.multitree_pineSmallAData);
auxl.multitree_pineSmallBData = {
id: 'multitree_pineSmallB',
objData: auxl.tree_pineSmallBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallB = auxl.ObjsGenRing(auxl.multitree_pineSmallBData);
auxl.multitree_pineSmallCData = {
id: 'multitree_pineSmallC',
objData: auxl.tree_pineSmallCData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallC = auxl.ObjsGenRing(auxl.multitree_pineSmallCData);
auxl.multitree_pineSmallDData = {
id: 'multitree_pineSmallD',
objData: auxl.tree_pineSmallDData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallD = auxl.ObjsGenRing(auxl.multitree_pineSmallDData);
auxl.multitrunkData = {
id: 'multitrunk',
objData: auxl.trunkData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitrunk = auxl.ObjsGenRing(auxl.multitrunkData);
auxl.multitrunkLongData = {
id: 'multitrunkLong',
objData: auxl.trunkLongData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitrunkLong = auxl.ObjsGenRing(auxl.multitrunkLongData);
auxl.multipineData = {
id: 'multipine',
objData: auxl.pineData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multipine = auxl.ObjsGenRing(auxl.multipineData);
auxl.multipineCrookedData = {
id: 'multipineCrooked',
objData: auxl.pineCrookedData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multipineCrooked = auxl.ObjsGenRing(auxl.multipineCrookedData);
auxl.multitree_coneData = {
id: 'multitree_cone',
objData: auxl.tree_coneData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_cone = auxl.ObjsGenRing(auxl.multitree_coneData);
auxl.multitree_defaultData = {
id: 'multitree_default',
objData: auxl.tree_defaultData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_default = auxl.ObjsGenRing(auxl.multitree_defaultData);
auxl.multitree_fatData = {
id: 'multitree_fat',
objData: auxl.tree_fatData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_fat = auxl.ObjsGenRing(auxl.multitree_fatData);
auxl.multitree_oakData = {
id: 'multitree_oak',
objData: auxl.tree_oakData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_oak = auxl.ObjsGenRing(auxl.multitree_oakData);
auxl.multitree_pineDefaultAData = {
id: 'multitree_pineDefaultA',
objData: auxl.tree_pineDefaultAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineDefaultA = auxl.ObjsGenRing(auxl.multitree_pineDefaultAData);
auxl.multitree_pineDefaultBData = {
id: 'multitree_pineDefaultB',
objData: auxl.tree_pineDefaultBData,
total: 4,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineDefaultB = auxl.ObjsGenRing(auxl.multitree_pineDefaultBData);
//Singles
auxl.canoe = auxl.Core(auxl.canoeData);
auxl.canoe_paddle = auxl.Core(auxl.canoe_paddleData);

//
//NPCs

//NPC Overview
auxl.npcMintyTextBubbleData = {
data:'npc text bubble on top',
id:'npcMintyTextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.7, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,1.65,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npcMintyCubeTextBubbleData = {
data:'npc text bubble on top',
id:'npcMintyCubeTextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.7, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npcMintyCubeData = {
data:'NPC Minty',
id:'npcMinty',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0,1.1,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.15, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npcMintyData = {
data:'npcMinty',
id:'npcMinty',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,-1.1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
morphtalk:{property: 'gltf-morph__talk.value', from: 0, to: 1, dur: 500, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['clickable','a-ent'],
components:{
['gltf-model']:'./assets/3d/avatar/mc1-1.glb',
//['animation-mixer']:{timeScale:1},
//['gltf-morph']:{morphtarget:'Fcl_ALL_Joy', value:1}
['gltf-morph__talk']:{morphtarget:'target_43', value:0},
},
};//VRM Avatar
auxl.npcMintyBookTestPage1Data = {
info:{
id:'npcMintyBookTestPage1',
description:'An explainer NPC to show off the AUXL system.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npcMinty:{Speak:{role: 'Minty', speech:'Hello and thank you for visiting!'}},
},
timeline1:{
npcMinty:{Speak:{role: 'Minty', speech:'My digital name is Minty Crisp (irl you can call me Justin), it\'s nice to meet you.'}},
},
timeline2:{
npcMinty:{Speak:{role: 'Minty', speech:'You can find more about me, if you are interested in supporting my work or interested in collaborating with me at mintycrisp.com .'}},
},
timeline3:{
npcMinty:{Speak:{role: 'Minty', speech:'Today I will show something I\'ve been dreaming up for a while as a way to create more interesting and dynamic XR scenes.'}},
},
timeline4:{
npcMinty:{Speak:{role: 'Minty', speech:'The A-Frame UX Library v0.1 Engine or AUXL for short.'}},
},
timeline5:{
npcMinty:{Speak:{role: 'Minty', speech:'AUXL provides a variety of critical object, scene and scenario building tools at the javascript level that allows for a more streamlined creation process.'}},
},
timeline6:{
npcMinty:{Speak:{role: 'Minty', speech:'It\'s basically a Javascript scripting system and JSON structured data library with various UX add-ons built for the A-Frame XR renderer.'}},
},
timeline7:{
npcMinty:{Speak:{role: 'Minty', speech:'The AUXL XR Engine is still very much a work in progress being released under the MIT license, but it\'s ready to be shared and tested while I continue improvements as well as additional features.'}},
},
timeline8:{
npcMinty:{Speak:{role: 'Minty', speech:'To better understand what AUXL can currently do currently, I\'ll explain some of the important features we can see in action now.'}},
},
timeline9:{
npcMinty:{Speak:{role: 'Minty', speech:'We\'ll start with the most basic function of the AUXL system which is creating in-scene objects.'}},
},
timeline10:{
npcMinty:{Speak:{role: 'Minty', speech:'To create an in-scene object, we start with a Library Data Object.'}},
},
timeline11:{
npcMinty:{Speak:{role: 'Minty', speech:'A Library Data Object is a JSON structured variable that contains all of the necessary information to spawn an object in-scene.'}},
},
timeline12:{
npcMinty:{Speak:{role: 'Minty', speech:'It includes information such as ID, Settings, Geometry, Model, Material, Text, Position, Rotation, Scale, Animations, Mixins, Classes & Components.'}},
},
timeline13:{
npcMinty:{Speak:{role: 'Minty', speech:'This structure allows for creating presets of objects as well as libraries of smaller data to mix and match for greater diversity and control.'}},
},
timeline14:{
npcMinty:{Speak:{role: 'Minty', speech:'That set of information is then used to form a Library Core Object.'}},
},
timeline15:{
npcMinty:{Speak:{role: 'Minty', speech:'The Library Core Object provides the vital functions like a spawn controller, the access to and editing of the object, object specific flag checks and settings as well as event support.'}},
},
timeline16:{
npcMinty:{Speak:{role: 'Minty', speech:'That provides you with major core functions like core.AddToScene(), core.RemoveFromScene(), core.ChangeSelf(), core.Animate(), core.EmitEvent(), core.SetFlag(), core.GetFlag(), core.ClickRun(), etc...'}},
},
timeline17:{
npcMinty:{Speak:{role: 'Minty', speech:'As well as minor support functions like core.GetEl() to connect with the object in-scene.'}},
},
timeline18:{
npcMinty:{Speak:{role: 'Minty', speech:'The next step up from this single Core object is to combine multiple Cores into a Library Layered Object.'}},
},
timeline19:{
npcMinty:{Speak:{role: 'Minty', speech:'We start from a single Parent Core and add additional children/grandchildren Cores to build out a more complex object.'}},
},
timeline20:{
npcMinty:{Speak:{role: 'Minty', speech:'The layered object provides wrapped function access to control the Layer like a single object as well as accessing any individual parts.'}},
},
timeline21:{
npcMinty:{Speak:{role: 'Minty', speech:'Functions like layer.AddAllToScene(), layer.RemoveAllFromScene(), layer.ChangeParent(), layer.ChangeAll(), layer.AnimateParent(), layer.AnimateAll(), layer.GetChild(), etc...'}},
},
timeline22:{
npcMinty:{Speak:{role: 'Minty', speech:'With access to just these Cores and Layers, we can already start to build out an XR scene and provide some interactions.'}},
},
timeline23:{
npcMinty:{Speak:{role: 'Minty', speech:'At this point we\'ve basically got a Javascript Entity Spawner that creates A-Frame HTML entities with all our given properties.'}},
},
timeline24:{
npcMinty:{Speak:{role: 'Minty', speech:'Combine these Core/Layer functions with any A-Frame components to give objects all the advanced controls you require and update them on the fly.'}},
},
timeline25:{
npcMinty:{Speak:{role: 'Minty', speech:'Using this method of a JSON Data set, Core object and Layered object creation, we can build out a Library of objects to be used in our scenes and scenarios.'}},
},
timeline26:{
npcMinty:{Speak:{role: 'Minty', speech:'From this Library of prebuilt objects, we can define a scene layout and even create a map to connect our scenes together.'}},
},
timeline27:{
npcMinty:{Speak:{role: 'Minty', speech:'An individual area on a Map is called a Node Scene.'}},
},
timeline28:{
npcMinty:{Speak:{role: 'Minty', speech:'The Node Scene defines the overall layout of the entire scene built from Cores and Layers.'}},
},
timeline29:{
npcMinty:{Speak:{role: 'Minty', speech:'You can specify that objects do something at node start, after a delay, on interval, on interaction, on event, on exit, etc...'}},
},
timeline30:{
npcMinty:{Speak:{role: 'Minty', speech:'You have access to all the Core and Layer functions like spawning, despawning, animating, changing, etc...'}},
},
timeline31:{
npcMinty:{Speak:{role: 'Minty', speech:'Additionaly, the Node Scene script allows you customize the object actions with If|If/Else conditional checking and flag setting.'}},
},
timeline32:{
npcMinty:{Speak:{role: 'Minty', speech:'Connecting multiple Node Scenes, you can create a Zone Map that allows for travel like Scene Swapping.'}},
},
timeline33:{
npcMinty:{Speak:{role: 'Minty', speech:'The Zone Map allows you to configure Core|Layer objects that would belong to a generalized area and wouldn\'t normally be swapped out when traveling between nodes unless you enter a new zone.'}},
},
timeline34:{
npcMinty:{Speak:{role: 'Minty', speech:'Nodes and Zones can be used to build out maps of all complexities in addition to supporting If|If/Else conditional checking and flag setting for travel control.'}},
},
timeline35:{
npcMinty:{Speak:{role: 'Minty', speech:'An example to better understand the concept is to think about if you wanted to recreate traveling between rooms within a House and then exiting the house to the outside world of the town you live in.'}},
},
timeline36:{
npcMinty:{Speak:{role: 'Minty', speech:'The Zone would define the basic room shape and textures, but each node fills in all the room details.'}},
},
timeline37:{
npcMinty:{Speak:{role: 'Minty', speech:'You start in the living room and a couch spawns, the wall changes to a window and move to a bedroom which despawns couch and adds a bed then changes another wall to a doorway.'}},
},
timeline38:{
npcMinty:{Speak:{role: 'Minty', speech:'When you finally exit outside, all Zone walls and node objects despawn then the Outside zone takes over and adds your house, then street items as if you walked outside.'}},
},
timeline39:{
npcMinty:{Speak:{role: 'Minty', speech:'That brings us up to Cores, Layers, Node Scenes and Zone Maps so far that we can script into a scenario.'}},
},
timeline40:{
npcMinty:{Speak:{role: 'Minty', speech:'An important support function is the actual Player which is built from a Layered object to be an adjustable controller with swapping support for VR and non-VR use.'}},
},
timeline41:{
npcMinty:{Speak:{role: 'Minty', speech:'The Player Layer rig has animations set up to assist in Scene Swapping without discomfort using various transitions too.'}},
},
timeline42:{
npcMinty:{Speak:{role: 'Minty', speech:'Some basic UX features that add additional interaction ability and scene functions we have the ability to generate menus, an open/close detailed prompt and image swapper viewer.'}},
},
timeline43:{
npcMinty:{Speak:{role: 'Minty', speech:'You can generate a Menu with a Prompt and Options for the player to choose from and have it execute what on selection.'}},
},
timeline44:{
npcMinty:{Speak:{role: 'Minty', speech:'For example, we use a Menu to display all the Travel options that allow the player to move between Nodes and Zones.'}},
},
timeline45:{
npcMinty:{Speak:{role: 'Minty', speech:'You can also add an open/closed detailed prompt to an object to access more info on it.'}},
},
timeline46:{
npcMinty:{Speak:{role: 'Minty', speech:'As well as view images within a swapping like view controller.'}},
},
timeline47:{
npcMinty:{Speak:{role: 'Minty', speech:'Additionaly, in keeping with the idea of classic 2D sites that utilize a Hamburger Menu to control your website URL switching, you can also add a Hamburger Companion.'}},
},
timeline48:{
npcMinty:{Speak:{role: 'Minty', speech:'The Companion allows the player access to a main menu. They can make setting changes, view info and otherwise assist in experiencing the XR world!'}},
},
timeline49:{
npcMinty:{Speak:{role: 'Minty', speech:'And then we have a NPC like Book|Page speech and interaction scripting system.'}},
},
timeline50:{
npcMinty:{Speak:{role: 'Minty', speech:'The NPC like system allows you to define various speech scenarios you can interact with.'}},
},
timeline51:{
npcMinty:{Speak:{role: 'Minty', speech:'The speech system also supports conditionals, flags, menus and jumps to provide a tree like conversation flow.'}},
},
timeline52:{
npcMinty:{Speak:{role: 'Minty', speech:'We also have some environmental features to help fill out various scenes with a single object procedural spawner and a multiple object procedural spawner which you will see both in action here.'}},
},
timeline53:{
npcMinty:{Speak:{role: 'Minty', speech:'There is additionally a Day/Night system that utilizes scene wide lighting to help with environment realism as well.'}},
},
timeline54:{
npcMinty:{Speak:{role: 'Minty', speech:'To help explore the scene we also have basic movement locomotion supported on Desktop, Mobile & VR in addition to Teleportation points to help quick move the player around.'}},
},
timeline55:{
npcMinty:{Speak:{role: 'Minty', speech:'And finally, we have a simple Memory mini-game just for fun!'}},
},
timeline56:{
npcMinty:{Speak:{role: 'Minty', speech:'That is a basic overview of all the current features provided by AUXL v0.1.'}},
},
timeline57:{
npcMinty:{Speak:{role: 'Minty', speech:'Thank you for taking the time to visit and learn!'}},
},
timeline58:{
npcMinty: {ResetBook: true},
},
};
auxl.npcMintyBookTestData = {
info:{
id:'npcMintyBookTest',
description:'An explainer NPC to show off the AUXL system.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npcMintyBookTestPage1Data,
},
};
//auxl.npcMintyCore = auxl.Core(auxl.npcMintyData);//VRM Avatar
auxl.npcMintyCore = auxl.Core(auxl.npcMintyCubeData);
auxl.npcMintyTextBubble = auxl.Core(auxl.npcMintyCubeTextBubbleData);
auxl.npcMinty = auxl.NPC(auxl.npcMintyCore, auxl.npcMintyBookTestData, auxl.npcMintyTextBubble);

//NPC 0
auxl.npc0TextBubbleData = {
data:'npc text bubble on top',
id:'npc0TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc0Data = {
data:'NPC 0',
id:'npc0',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.3,1,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc0BookTestPage1Data = {
info:{
id:'npc0BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc0:{Speak:{role: 'Dev', speech:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac metus sodales, rhoncus tellus at, pretium mi.'}, SetFlag:{flag: 'testSpeechVar', value: false},},
player:{SetFlag:{flag: 'testSpeechVar', value: true},},
},
timeline1:{
npc0:{IfElse: {player:{cond: 'testSpeechVar',
ifTrue: {
npc0:{Speak:{role: 'Dev', speech:'Is True'}},},
ifFalse: {
npc0:{Speak:{role: 'Dev', speech:'Is False'}},},}}},
},
timeline2:{
npc0:{Speak:{role: 'Dev', speech:'Jump to Text section.'}, SelectJump:[['Answer 1','timeline3'], ['Answer 2','timeline4'], ['Answer 3','timeline5']]},
},
timeline3:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 1 section.'}, Jump: {timeline: 'timeline6'}},
},
timeline4:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 2 section.'}, Jump: {timeline: 'timeline6'}},
},
timeline5:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 3 section.'}},
},
timeline6:{
npc0:{Speak:{role: 'Dev', speech:'Nullam sed ante a velit porttitor semper. Donec quis lacus a tellus interdum venenatis.'}},
},
timeline7:{
npc0:{Speak:{role: 'Dev', speech:'End and Restart'}},
},
timeline8:{
npc0: {ResetBook: true},
},

};
auxl.npc0BookTestData = {
info:{
id:'npc0BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc0BookTestPage1Data,
},
};
auxl.npc0Core = auxl.Core(auxl.npc0Data);
auxl.npc0TextBubble = auxl.Core(auxl.npc0TextBubbleData);
auxl.npc0 = auxl.NPC(auxl.npc0Core, auxl.npc0BookTestData, auxl.npc0TextBubble);

//NPC 1
auxl.npc1TextBubbleData = {
data:'npc text bubble on top',
id:'npc1TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc1Data = {
data:'NPC 1',
id:'npc1',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.3,1,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc1BookTestPage1Data = {
info:{
id:'npc1BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc1',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc1:{Speak:{role: 'Ham', speech:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac metus sodales, rhoncus tellus at, pretium mi.'}},
},
timeline1:{
npc1:{Speak:{role: 'Ham', speech:'Cras lobortis est enim, in vulputate odio ullamcorper in. In lobortis metus nec justo blandit, a lobortis nunc pretium.'}},
},
timeline2:{
npc1:{Speak:{role: 'Ham', speech:'Donec finibus massa ut tortor dapibus laoreet. Ut diam nulla, rhoncus eu turpis sed, viverra eleifend nulla. '}},
},
timeline3:{
npc1:{Speak:{role: 'Ham', speech:'Suspendisse accumsan nunc eros, et porta tellus ornare nec. Donec at velit non orci pretium mattis sit amet ac nunc.'}},
},
timeline4:{
npc1:{Speak:{role: 'Ham', speech:'Duis sollicitudin eros venenatis orci luctus, eu volutpat mauris condimentum. Ut aliquam orci in quam elementum, vel elementum nisi posuere.'}},
},
timeline5:{
npc1:{Speak:{role: 'Ham', speech:'Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus eleifend enim porta lacus consequat, nec pulvinar sem efficitur.'}},
},
timeline6:{
npc1:{Speak:{role: 'Ham', speech:'Nullam congue eleifend massa, sed fermentum enim porttitor ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'}},
},
timeline7:{
npc1:{Speak:{role: 'Ham', speech:'Pellentesque posuere purus vel molestie bibendum. Nunc at hendrerit risus. Donec id urna elit.'}},
},
timeline8:{
npc1:{Speak:{role: 'Ham', speech:'Proin interdum ut mauris sed pharetra. Suspendisse a nisl fringilla, feugiat ligula sed, placerat lacus.'}},
},
timeline9:{
npc1:{Speak:{role: 'Ham', speech:'Mauris vulputate tincidunt velit, id maximus augue porta eget. Vivamus mattis sapien purus, vel mattis felis posuere a.'}},
},
timeline10:{
npc1:{Speak:{role: 'Ham', speech:'Curabitur et condimentum velit, vel fermentum magna. Nulla ligula dolor, dapibus a nisl quis, blandit volutpat nibh.'}},
},
timeline11:{
npc1:{Speak:{role: 'Ham', speech:'Quisque iaculis venenatis sem, vel fermentum nisi volutpat id. Praesent nulla libero, scelerisque porta est ac, aliquam consequat tortor.'}},
},
timeline12:{
npc1:{Speak:{role: 'Ham', speech:'Fusce congue et lacus ac sagittis. Sed mi quam, pulvinar pretium convallis vel, egestas sit amet ipsum. Maecenas aliquam sit amet nulla at gravida.'}},
},
timeline13:{
npc1:{Speak:{role: 'Ham', speech:'Ut ullamcorper nunc in tortor accumsan congue et et dolor. Sed pulvinar nec nulla posuere finibus.'}},
},
timeline14:{
npc1:{Speak:{role: 'Ham', speech:'Vivamus turpis urna, dignissim non ante vel, suscipit hendrerit urna. Nam a ligula id arcu faucibus ornare in in odio.'}},
},
timeline15:{
npc1:{Speak:{role: 'Ham', speech:'Nulla mattis nisi non felis tempus blandit. Quisque quis scelerisque massa. Quisque lacinia blandit ultrices.'}},
},
timeline16:{
npc1:{Speak:{role: 'Ham', speech:'Quisque ut sollicitudin mauris, et sodales dui. Sed pretium leo sit amet euismod maximus.'}},
},
timeline17:{
npc1:{Speak:{role: 'Ham', speech:'Integer at suscipit turpis. Mauris dignissim orci at iaculis malesuada.'}},
},
timeline18:{
npc1:{Speak:{role: 'Ham', speech:'Jump to Text section.'}, SelectJump:[['Timeline 19','timeline19'], ['Timeline 20','timeline20'], ['Timeline 21','timeline21']]},
},
timeline19:{
npc1:{Speak:{role: 'Ham', speech:'timeline19'}, Jump: {timeline: 'timeline22'}},
},
timeline20:{
npc1:{Speak:{role: 'Ham', speech:'timeline20'},Jump: {timeline: 'timeline22'}},
},
timeline21:{
npc1:{Speak:{role: 'Ham', speech:'timeline21'}},
},
timeline22:{
npc1:{Speak:{role: 'Ham', speech:'Nullam sed ante a velit porttitor semper. Donec quis lacus a tellus interdum venenatis.'}},
},
timeline23:{
npc1:{Speak:{role: 'Ham', speech:'Quisque auctor interdum mi faucibus malesuada. Maecenas tristique ac justo sit amet fermentum.'}},
},
timeline24:{
npc1:{Speak:{role: 'Ham', speech:'Praesent fermentum nunc nisl, a porttitor magna laoreet quis. Morbi elementum pulvinar ante sit amet dapibus.'}},
},
timeline25:{
npc1:{Speak:{role: 'Ham', speech:'Fusce ac magna sit amet ipsum luctus mattis. Nunc eu metus eros. Fusce a tempus est.'}},
},
timeline26:{
npc1:{Speak:{role: 'Ham', speech:'In rutrum turpis ut dictum semper. Sed euismod, erat vel dignissim porttitor, sapien diam tristique sapien, ut viverra nisl diam ut quam.'}},
},
timeline27:{
npc1:{Speak:{role: 'Ham', speech:'End and Restart'}},
},
timeline28:{
npc1: {Restart: null},
},

};
auxl.npc1BookTestData = {
info:{
id:'npc1BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc1BookTestPage1Data,
},
};
auxl.npc1Core = auxl.Core(auxl.npc1Data);
auxl.npc1TextBubble = auxl.Core(auxl.npc1TextBubbleData);
auxl.npc1 = auxl.NPC(auxl.npc1Core, auxl.npc1BookTestData, auxl.npc1TextBubble);

//NPC 2
auxl.npc2TextBubbleData = {
data:'npc text bubble on top',
id:'npc2TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.75, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.8, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc2Data = {
data:'NPC 2',
id:'npc2',
sources: false,
text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.5,1,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc2BookTestPage1Data = {
info:{
id:'npc2BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc2:{IfElse: {npc2:{cond: 'masterKey',
ifTrue: {
npc2:{Speak:{role: 'Ham', speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline2'},},
},ifFalse: {
npc2:{Speak:{role: 'Ham', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},},}}},
},
timeline1:{
npc2:{Speak:{role: 'Ham', speech:'Here you go!'}, SetFlag: {flag: 'masterKey', value: true}},
player:{SetFlag: {flag: 'masterKey', value: true}},
},
timeline2:{
npc2:{Speak:{role: 'Ham', speech:'Good luck finding where it goes!'}},
},
timeline3:{
npc2: {ResetBook: true},
},
};
auxl.npc2BookTestData = {
info:{
id:'npc2BookTest',
description:'A basic example of a NPC giving a Key.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc2BookTestPage1Data,
},
};
auxl.npc2Core = auxl.Core(auxl.npc2Data);
auxl.npc2TextBubble = auxl.Core(auxl.npc2TextBubbleData);
auxl.npc2 = auxl.NPC(auxl.npc2Core, auxl.npc2BookTestData, auxl.npc2TextBubble);

    },
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('auxl-scenes', {
	dependencies: ['auxl'],
    //schema: {
        //clickObj: {type: 'string', default: 'auxlObj'}
    //},
    init: function () {
		//console.log('AUXL Scenes INIT');
		//AUXL System
		const auxl = document.querySelector('a-scene').systems.auxl;

//
//Scenarios

//Scenario Demo Example
//
//scenarioDemo
auxl.scenarioDemoData = {
info:{
id: 'scenarioDemo',
name: 'Example Demo',
scenarioNum: 0,
default: true,
startZone: 'zone0',
instructions: 'A demo scenario of traversing a variety of different areas and showcasing the core features and functionality of the A-Frame UX Library engine v0.2.',
},
start:{
skyBox0:{Spawn: null},
nodeFloor:{AddToScene: null},
clouds:{AddAllToScene: null},
},
delay:{
100:{
skyBox0:{DayNightCycle: null},
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
};
auxl.scenarioDemo = auxl.Scenario(auxl.scenarioDemoData);

//
//World Atlas MapZones & NodeScenes
//['raycast-teleportation']:null,
//Floating Island - Connects to all zones
//
//Zone 0
auxl.zone0Data = {
info:{
id: 'zone0',
name: 'Zone0',
zoneNum: 0,
start: 'zone0Node0',
},
zone0Node0:{
connect0: {inZone: 'zone1', node: 'zone1Node0',},
connect1: {inZone: 'zone2', node: 'zone2Node0',},
connect2: {inZone: 'zone3', node: 'zone3Node0',},
connect3: {inZone: 'zone4', node: 'zone4Node0',},
connect4: {inZone: 'zone5', node: 'zone5Node0',},
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
//Node 0
auxl.zone0Node0Data = {
info:{
id:'zone0Node0',
name: 'Floating Island',
description: 'Starting Zone',
sceneText: true,
},
start:{
nodeFloor:{
ChangeSelf:[{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#27693d", emissive: "#27693d",},},
{property: 'position', value: new THREE.Vector3(0,0,0),},{property: 'raycast-teleportation', value: null,}],
},
forestScene2:{SpawnAll:null},
multiRockFlatGrass:{genCores:null, SpawnAll:null},
HamGirl:{Start:null},
npcMinty:{Spawn:null},
soundTesting:{AddToScene:null},
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
HamGirl:{Remove: null},
forestScene2:{DespawnAll:null},
nodeFloor:{RemoveComponent:'raycast-teleportation'},
},
map:{
data: auxl.zone0Data.zone0Node0,
},
};
//Node Scene 0
auxl.zone0Node0 = auxl.SceneNode(auxl.zone0Node0Data);
//Map Zone 0
auxl.zone0 = auxl.MapZone(auxl.zone0Data);

//Snow Mountains w/Underground Cave
//
//Zone 1
auxl.zone1Data = {
info:{
id: 'zone1',
name: 'Zone1',
zoneNum: 0,
start: 'zone1Node0',
},
zone1Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: true, node: 'zone1Node1',},
connect2: {inZone: 'zone2', node: 'zone2Node0',},
},
zone1Node1:{
connect0: {inZone: true, node: 'zone1Node0',},
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
//Node 0
auxl.zone1Node0Data = {
info:{
id:'zone1Node0',
name: 'Snowy Mountains',
description: 'Open Tundra',
sceneText: true,
},
start:{
teleport:{SpawnAll:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern69, repeat: '150 150',color: "#d6a9ba", emissive: "#d6a9ba",},}},
snowForestScene1:{SpawnAll:null},
npc1:{Spawn: null},
mountains:{AddAllToScene: null, ChangeAll:{property: 'material', value: auxl.mountainMatSnow}},
//multiSnowMountainsBasic:{genCores: null, SpawnAll: null},
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
snowForestScene1:{DespawnAll:null},
},
map:{
data: auxl.zone1Data.zone1Node0,
},
};
//Node 1
auxl.zone1Node1Data = {
info:{
id:'zone1Node1',
name: 'Mountain Cave',
description: 'Underground Shelter',
sceneText: true,
},
start:{
teleport0:{SpawnAll:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern37, repeat: '150 150',color: "#bc8fa0", emissive: "#bc8fa0",},}},
nodeWalls: {AddAllToScene: null,ChangeAll:{property: 'material', value: {src: auxl.pattern81, repeat: '5 1.25', color: "#bc8fa0", emissive: "#bc8fa0",}}},
eventTesting:{AddToScene: null, EnableDetail: 'This shows various ways to utilize Delay, Interval, Events and Interactions to affect the scene.'},
eventTesting2:{AddToScene: null, EnableDetail: 'This also shows various ways to utilize Delay, Interval, Events and Interactions to affect the scene.'},
eventTesting3:{AddToScene: null,},
eventTesting4:{AddToScene: null,},
smallCeiling: {AddToScene: null,ChangeSelf:{property: 'material', value: {src: auxl.pattern76, repeat: '10 10', color: "#9b7a87", emissive: "#9b7a87",}}},
},
delay:{
2000:{
eventTesting:{EmitEvent: 'customevent1'},
},
4000:{
eventTesting:{IfElse: {player:{cond: 'testDelayVar',
ifTrue: {
eventTesting:{EmitEvent: 'customevent3'},
},ifFalse: {
eventTesting:{EmitEvent: 'customevent2'},
},}}},
},
6000:{
player:{SetFlag:{flag: 'testDelayVar', value: true},},
},
8000:{
eventTesting:{IfElse: {player:{cond: 'testDelayVar',
ifTrue: {
eventTesting:{EmitEvent: 'customevent3'},
},ifFalse: {
eventTesting:{EmitEvent: 'customevent2'},
},}}},
},
},
interval:{

5000: {run: {eventTesting2:{IfElse: {eventTesting2: {cond: 'testIntervalVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent5',SetFlag:{flag: 'testIntervalVar', value: false},},
},
ifFalse: {
eventTesting2:{EmitEvent: 'customevent6',SetFlag:{flag: 'testIntervalVar', value: true},},
},
},}},}, loop: 'infinite'},

6000: {run: {
eventTesting4:{EmitEvent: 'testintervalevent'},
}, loop: 'infinite'},
},
event:{
customevent1: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent2: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#3630c7', emissive: '#3630c7'}}},
},
customevent3: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#c73076', emissive: '#c73076'}}},
},
customevent4: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent5: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent6: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent7: {
eventTesting3: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
},
customevent8: {
eventTesting3: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
},
customevent9: {
eventTesting4: {ChangeSelf: {property: 'material', value: {color: '#5c3724', emissive: '#5c3724'}}},
},
customevent10: {
eventTesting4: {ChangeSelf: {property: 'material', value: {color: '#e62f2f', emissive: '#e62f2f'}}},
},
testintervalevent: {
eventTesting4:{IfElse: {eventTesting4:{cond: 'testInteractionVar',
ifTrue: {
eventTesting4:{EmitEvent: 'customevent9',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting4:{EmitEvent: 'customevent10',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},
},
interaction:{
click: {
eventTesting3:{IfElse: {eventTesting3:{cond: 'testInteractionVar',
ifTrue: {
eventTesting3:{EmitEvent: 'customevent7',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting3:{EmitEvent: 'customevent8',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},
},
exit:{

},
map:{
data: auxl.zone1Data.zone1Node1,
},
};
//Node Scene 0
auxl.zone1Node0 = auxl.SceneNode(auxl.zone1Node0Data);
//Node Scene 1
auxl.zone1Node1 = auxl.SceneNode(auxl.zone1Node1Data);
//Map Zone 1
auxl.zone1 = auxl.MapZone(auxl.zone1Data);

//Deep Forest
//
//Zone 2
auxl.zone2Data = {
info:{
id: 'zone2',
name: 'Zone2',
zoneNum: 0,
start: 'zone2Node0',
},
zone2Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone1', node: 'zone1Node0',},
connect2: {inZone: 'zone3', node: 'zone3Node0',},
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
//Node 0
auxl.zone2Node0Data = {
info:{
id:'zone2Node0',
name: 'Deep Forest',
description: 'Thick Woodlands',
sceneText: true,
},
start:{
teleport:{SpawnAll:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern24, repeat: '300 300', color: "#228343", emissive: "#228343",},}},
forestScene1:{SpawnAll:null},
mountains:{AddAllToScene: null, ChangeAll:{property: 'material', value: auxl.mountainMat1}},

artFrameAllLayer:{AddAllToScene:null},
buttonBackwardLayer:{AddAllToScene:null},
buttonHashtagLayer:{AddAllToScene:null},
buttonForwardLayer:{AddAllToScene:null},
buttonLeftSkipLayer:{AddAllToScene:null},
buttonPlayLayer:{AddAllToScene:null},
buttonRightSkipLayer:{AddAllToScene:null},
buttonSettingsLayer:{AddAllToScene:null},
buttonStopLayer:{AddAllToScene:null},
buttonSettingsGallery:{Init:null},

},
delay:{
},
interval:{
},
event:{

},
interaction:{
click: {
buttonForwardGallery:{Forward: null},
buttonBackwardGallery:{Backward: null},
buttonRightSkipGallery:{NextPage: null},
buttonLeftSkipGallery:{PrevPage: null},
buttonPlayGallery:{PlayPause: null},
buttonStopGallery:{Info: null},
buttonHashtagGallery:{RandomPage: null},
buttonSettingsGallery:{Settings: null},
},
},
exit:{

forestScene1:{DespawnAll:null},
},
map:{
data: auxl.zone2Data.zone2Node0,
},
};
//Node Scene 0
auxl.zone2Node0 = auxl.SceneNode(auxl.zone2Node0Data);
//Map Zone 2
auxl.zone2 = auxl.MapZone(auxl.zone2Data);

//Graveyard w/Cabin House
//
//Zone 3
auxl.zone3Data = {
info:{
id: 'zone3',
name: 'Zone3',
zoneNum: 0,
start: 'zone3Node0',
},
zone3Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone2', node: 'zone2Node0',},
connect2: {inZone: true, node: 'zone3Node1', locked: true, key: 'masterKey', keepKey: true},
connect3: {inZone: 'zone4', node: 'zone4Node0',},
},
zone3Node1:{
connect0: {inZone: true, node: 'zone3Node0',},
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
//Node 0
auxl.zone3Node0Data = {
info:{
id:'zone3Node0',
name: 'Graveyard',
description: 'Spooky Cemetary',
sceneText: true,
},
start:{
teleport:{SpawnAll:null},
npc0:{Spawn: null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern44, repeat: '150 150',color: "#618136", emissive: "#618136",},}},
//multiGrassyHillsBasic:{genCores: null, SpawnAll: null},
graveyardScene1:{SpawnAll:null},
mountains:{AddAllToScene: null, ChangeAll:{property: 'material', value: auxl.mountainMat2}},
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
graveyardScene1:{DespawnAll:null},
},
map:{
data: auxl.zone3Data.zone3Node0,
},
};
//Node 1
auxl.zone3Node1Data = {
info:{
id:'zone3Node1',
name: 'Cemetary Cabin',
description: 'Graveyard Shelter',
sceneText: true,
},
start:{
teleport0:{SpawnAll:null},
memory:{SpawnGame: null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern50, repeat: '150 150',color: "#763a3a", emissive: "#763a3a",},}},
nodeWalls: {AddAllToScene: null,ChangeAll:{property: 'material', value: {src: auxl.pattern18, repeat: '10 2.5', color: "#80401f", emissive: "#80401f",}}},
smallCeiling: {AddToScene: null,ChangeSelf:{property: 'material', value: {src: auxl.pattern22, repeat: '5 5', color: "#623018", emissive: "#623018",}}},
imageSwapper1:{Show: null},
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
memory:{DespawnGame: null},
},
map:{
data: auxl.zone3Data.zone3Node1,
},
};
//Node Scene 0
auxl.zone3Node0 = auxl.SceneNode(auxl.zone3Node0Data);
//Node Scene 1
auxl.zone3Node1 = auxl.SceneNode(auxl.zone3Node1Data);
//Map Zone 3
auxl.zone3 = auxl.MapZone(auxl.zone3Data);

//Desert Plains
//
//Zone 4
auxl.zone4Data = {
info:{
id: 'zone4',
name: 'Zone4',
zoneNum: 0,
start: 'zone4Node0',
},
zone4Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone3', node: 'zone3Node0',},
connect2: {inZone: 'zone5', node: 'zone5Node0',},
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
//Node 0
auxl.zone4Node0Data = {
info:{
id:'zone4Node0',
name: 'Open Desert',
description: 'Dry Plains',
sceneText: true,
},
start:{
teleport:{SpawnAll:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern58, repeat: '150 150',color: "#c1bd52", emissive: "#c1bd52",},}},
npc2:{Spawn: null},
//multiDesertPlainsBasic:{genCores: null, SpawnAll: null},
desertScene1:{SpawnAll:null},
mountains:{AddAllToScene: null, ChangeAll:{property: 'material', value: auxl.mountainMat3}},
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
desertScene1:{DespawnAll:null},
},
map:{
data: auxl.zone4Data.zone4Node0,
},
};
//Node Scene 0
auxl.zone4Node0 = auxl.SceneNode(auxl.zone4Node0Data);
//Map Zone 4
auxl.zone4 = auxl.MapZone(auxl.zone4Data);

//Oasis Beach w/Underwater
//
//Zone 5
auxl.zone5Data = {
info:{
id: 'zone5',
name: 'Zone5',
zoneNum: 0,
start: 'zone5Node0',
},
zone5Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone4', node: 'zone4Node0',},
connect2: {inZone: true, node: 'zone5Node1',},
},
zone5Node1:{
connect0: {inZone: true, node: 'zone5Node0',},
},
start:{
eventTesting2:{AddToScene: null},
eventTesting5:{AddToScene: null},
},
delay:{

2000:{
eventTesting2:{EmitEvent: 'customevent1'},
},

},
interval:{

5000: {run: {eventTesting2:{IfElse: {eventTesting2: {cond: 'testIntervalVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent5',SetFlag:{flag: 'testIntervalVar', value: false},},
},
ifFalse: {
eventTesting2:{EmitEvent: 'customevent6',SetFlag:{flag: 'testIntervalVar', value: true},},
},
},}},}, loop: 'infinite'},

},
event:{

customevent5: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent6: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent7: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
},
customevent8: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
},

},
interaction:{

click: {
eventTesting2:{IfElse: {eventTesting2:{cond: 'testInteractionVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent7',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting2:{EmitEvent: 'customevent8',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},

},
exit:{

},
};
//Node 0
auxl.zone5Node0Data = {
info:{
id:'zone5Node0',
name: 'Oasis Beach',
description: 'Rolling Sands',
sceneText: true,
},
start:{
teleport:{SpawnAll:null},
eventTesting5:{SetFlag:{flag: 'testExitVar', value: true}, EnableDetail: 'An example of using start/exit to set variables and change scene settings.'},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55, repeat: '150 150',color: "#b4933c", emissive: "#b4933c",},}},
//multiOceanBeachBasic:{genCores: null, SpawnAll: null},
beachScene1:{SpawnAll:null},
mountains:{AddAllToScene: null, ChangeAll:{property: 'material', value: auxl.mountainMat2}},
canoe:{AddToScene:null,ChangeSelf:{property: 'position', value: new THREE.Vector3(1.5,0,3),}},
canoe_paddle:{AddToScene:null,ChangeSelf:{property: 'position', value: new THREE.Vector3(-2,0.1,1),}},
waterFloor:{AddToScene:null},
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
beachScene1:{DespawnAll:null},
eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},
},
map:{
data: auxl.zone5Data.zone5Node0,
},
};
//Node 1
auxl.zone5Node1Data = {
info:{
id:'zone5Node1',
name: 'Underwater',
description: 'Submerged',
sceneText: true,
},
start:{
teleport0:{SpawnAll:null},
eventTesting5:{SetFlag:{flag: 'testExitVar', value: false},},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern83, repeat: '150 150',color: "#3c86b4", emissive: "#3c86b4",},}},
nodeWalls:{AddAllToScene: null,ChangeParent:{property: 'scale', value: new THREE.Vector3(15,15,15)},ChangeAll:{property: 'material', value: {src: auxl.pattern55, repeat: '5 1.25', color: "#275876", emissive: "#275876",}}},
underwaterScene1:{SpawnAll:null},
nodeCeiling:{AddToScene:null},
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
underwaterScene1:{DespawnAll:null},
nodeWalls: {ChangeParent:{property: 'scale', value: new THREE.Vector3(1,1,1)}},
eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},
},
map:{
data: auxl.zone5Data.zone5Node1,
},
};
//Node Scene 0
auxl.zone5Node0 = auxl.SceneNode(auxl.zone5Node0Data);
//Node Scene 1
auxl.zone5Node1 = auxl.SceneNode(auxl.zone5Node1Data);
//Map Zone 5
auxl.zone5 = auxl.MapZone(auxl.zone5Data);

    },
});

//
//Dev - Detect Inputs
AFRAME.registerComponent('detect-inputs', {
//schema: {
	//bar: {type: 'number'},
	//baz: {type: 'string'}
//},

init: function () {
	//Display Input Selections
	//HMD View - Mouse Movement
	//Main Trigger Click - Mouse Left Click
	//Secondary Trigger Click - Mouse Right Click
	//Joystick Directional - WASD
	//Button 1 - Q
	//Button 2 - E

	const displayInput = document.querySelector('#displayInput');

	let displayInputText = {value: 'No Input', color: 'white', align: 'center'}

	function updateInput(input){

	displayInputText.value = input;
	displayInput.setAttribute('text',displayInputText);

	}


	//
	//Event Listeners

	//Desktop
	//

	//Mouse
	//
	//Left Click
	document.body.addEventListener('click', function (e) {
		updateInput('main click');
	});
	//
	//Right Click
	document.body.addEventListener('contextmenu', function (e) {
		updateInput('secondary click');
	});

	//Keyboard
	//
	//Key Down - WASD | QE
	document.body.addEventListener('keydown', function (e) {
		if (e.key === 'w' || e.key === 'W') {
			//Start moving player
			updateInput('up');
		} else if (e.key === 'a' || e.key === 'A') {
			//Start moving player
			updateInput('left');
		} else if (e.key === 's' || e.key === 'S') {
			//Start moving player
			updateInput('down');
		} else if (e.key === 'd' || e.key === 'D') {
			//Start moving player
			updateInput('right');
		} else if (e.key === 'q' || e.key === 'Q') {
			//Start moving player
			updateInput('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Start moving player
			updateInput('button 2');
		}
	});//End keydown


	//Quest
	//

	//Triggers
	//
	//Main Trigger
	document.body.addEventListener('triggerdown', function (e) {
		updateInput('main trigger');
	});

	//
	//Secondary Trigger
	document.body.addEventListener('gripdown', function (e) {
		updateInput('secondary trigger');
	});

	//Buttons
	//
	//Right Controller - Button 1 (A)
	document.body.addEventListener('abuttondown', function (e) {
		updateInput('button 1');
	});
	//
	//Right Controller - Button 2 (B)
	document.body.addEventListener('bbuttondown', function (e) {
		updateInput('button 2');
	});
	//
	//Left Controller - Button 1 (X)
	document.body.addEventListener('xbuttondown', function (e) {
		updateInput('button 1');
	});
	//
	//Left Controller - Button 2 (Y)
	document.body.addEventListener('ybuttondown', function (e) {
		updateInput('button 2');
	});

	//Joystick
	//
	//Controller
	/* Conflicts with Locomotion event listener
	this.el.addEventListener('thumbstickmoved', function (e) {
		if (e.detail.y > 0.95) { 
			updateInput('down');
		}
		if (e.detail.y < -0.95) { 
			updateInput('up');
		}
		if (e.detail.x < -0.95) { 
			updateInput('left');
		}
		if (e.detail.x > 0.95) { 
			updateInput('right');
		}
	});*/

    }//End Init
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
//Locomotion Globals
//Brake Engaged by Default
let moveTo = false;
let moveBack = false;
let moveRight = false;
let moveLeft = false;
let moveBrake = true;
let brakeReady = true;
let brakeToggle = false;
let brakeReset; //Delay
let moveSpeedDefault = 0.075;
let moveSpeedSlow = 0.03;
//Move Forward
function movingForward(){
	if(moveTo){}else{
		moveTo = true;
	}
}
//Cancel Forward
function cancelForward(){
	if(moveTo){
		moveTo = false;
	}
}
//Move Reverse
function movingReverse(){
	if(moveBack){}else{
		moveBack = true;
	}
}
//Cancel Reverse
function cancelReverse(){
	if(moveBack){
		moveBack = false;
	}
}
//Move Left
function movingLeft(){
	if(moveLeft){}else{
		moveLeft = true;
	}
}
//Cancel Left
function cancelLeft(){
	if(moveLeft){
		moveLeft = false;
	}
}
//Move Right
function movingRight(){
	if(moveRight){}else{
		moveRight = true;
	}
}
//Cancel Right
function cancelRight(){
	if(moveRight){
		moveRight = false;
	}
}
//Clear All Movement
function clearMovement(){
	cancelForward();
	cancelReverse();
	cancelLeft();
	cancelRight();
}
//Toggle Speed Change
function toggleSpeed(){
	console.log('Toggling Speed');
	//Brake is disabled for 1.5 seconds after engaging
	if(brakeReady){
		if(brakeToggle){
			console.log('Break On');
			//Set reset switch toggle
			brakeToggle = false;
			//Set reset timer switch toggle
			brakeReady = false;
			//Brake On
			moveBrake = true;
		} else {
			console.log('Break Off');
			//Set reset switch toggle
			brakeToggle = true;
			//Set reset timer switch toggle
			brakeReady = false;
			//Brake Off
			moveBrake = false;
		}
	}
}
//Buffer for Toggling Speed Change
function brakeReadyBuffer(){
	brakeReset = setTimeout(function () {
		//Set reset switch toggle
		brakeReady = true;
	}, 250); //Delay
}

//
//Locomotion
AFRAME.registerComponent('locomotion', {
	dependencies: ['auxl'],
    schema: {
        uiid: {type: 'string', default: 'ui'},
        controller1id: {type: 'string', default: 'controller1'},
        controller2id: {type: 'string', default: 'controller2'},
		courserid: {type: 'string', default: 'mouseCursor'},
		movetype: {type: 'string', default: 'vr'},
    },

init: function () {
	//Do something when component first attached.
	const auxl = document.querySelector('a-scene').systems.auxl;
	// Set up the tick throttling.
	this.throttledFunction = AFRAME.utils.throttle(this.everySome, 30, this);

	//Schema Imoprt
	//
	//Controller Elements
	if(this.data.controller1id){
		this.controller1 = document.getElementById(this.data.controller1id);
	}
	//this.controller2 = document.getElementById(this.data.controller2id);
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
	if(this.movetype === 'vr'){
		this.vrController = document.getElementById('vrController');
		this.directionForward = document.getElementById('locomotionForwardUI');
		this.directionReverse = document.getElementById('locomotionReverseUI');
		this.directionBrake1 = document.getElementById('locomotionBrake1UI');
		this.directionBrake2 = document.getElementById('locomotionBrake2UI');
		this.directionBrake3 = document.getElementById('locomotionBrake3UI');
		this.directionBrake4 = document.getElementById('locomotionBrake4UI');
	}

	//HTML Controller Support
	this.htmlUp = document.getElementById('up');
	this.htmlLeft = document.getElementById('left');
	this.htmlRight = document.getElementById('right');
	this.htmlDown = document.getElementById('down');
	this.htmlselect = document.getElementById('select');
	this.htmlstart = document.getElementById('start');
	this.htmla = document.getElementById('a');
	this.htmlb = document.getElementById('b');

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

	//
	//VR Event Listeners

	//Belt Controller Event Listeners
	if(this.movetype === 'vr'){
		//directionForward
		this.directionForward.addEventListener('mouseenter', movingForward);
		this.directionForward.addEventListener('mouseleave', cancelForward);
		//directionReverse
		this.directionReverse.addEventListener('mouseenter', movingReverse);
		this.directionReverse.addEventListener('mouseleave', cancelReverse);
		//This format does not like functions inside, adjust to allow
		//directionBrakes
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseenter', event => {
				//Brake is disabled for 1.5 seconds after engaging
				if(brakeReady){
					if(brakeToggle){
						//Set reset switch toggle
						brakeToggle = false;
						//Set reset timer switch toggle
						brakeReady = false;
						//Brake On
						moveBrake = true;
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
						brakeToggle = true;
						//Set reset timer switch toggle
						brakeReady = false;
						//Brake Off
						moveBrake = false;
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
			})
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseleave', event => {
				//This will start the reset timer to allow the brake to be re-engadged
				//Brake Reset Timeout
				brakeReset = setTimeout(function () {
					//Set reset switch toggle
					brakeReady = true;
				}, 2250); //Delay
			})
		});

		//
		//Quest Joystick Controller
		this.vrController.addEventListener('thumbstickmoved', function (e) {
			if (e.detail.y > 0.95) {
				clearMovement();
				movingReverse();
			}
			if (e.detail.y < -0.95) {
				clearMovement();
				movingForward();
			}
			if (e.detail.x < -0.95) {
				clearMovement();
				movingLeft();
			}
			if (e.detail.x > 0.95) {
				clearMovement();
				movingRight();
			}
		});
		this.vrController.addEventListener('thumbsticktouchend', function (e) {
			clearMovement();
		});
		this.vrController.addEventListener('thumbstickdown', function (e) {
			clearMovement();
		});
	}

	//Keyboard Controller Event Listeners
	//
	//Key Down - WASD/Arrows | QE
	document.body.addEventListener('keydown', function (e) {
		if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
			movingForward();
		} else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
			movingLeft();
		} else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
			movingReverse();
		} else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
			movingRight();
		} else if (e.key === 'q' || e.key === 'Q') {
			//Special Button 1
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Special Button 2
			//console.log('button 2');
			console.log('Toggle Speed');
			toggleSpeed();
		}
	});
	//Key Down - WASD/Arrows | QE
	document.body.addEventListener('keyup', function (e) {
		if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
			cancelForward();
		} else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
			cancelLeft();
		} else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
			cancelReverse();
		} else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
			cancelRight();
		} else if (e.key === 'q' || e.key === 'Q') {
			//Special Button 1
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Special Button 2
			//console.log('button 2');
			brakeReadyBuffer();
		}
	});

	//HTML Controller Event Listeners
	//
	//Mouse Down
	this.htmlUp.addEventListener('mousedown', movingForward);
	this.htmlLeft.addEventListener('mousedown', movingLeft);
	this.htmlRight.addEventListener('mousedown', movingRight);
	this.htmlDown.addEventListener('mousedown', movingReverse);
	this.htmlb.addEventListener('mousedown', toggleSpeed);
	//Mouse Up
	this.htmlUp.addEventListener('mouseup', cancelForward);
	this.htmlLeft.addEventListener('mouseup', cancelLeft);
	this.htmlRight.addEventListener('mouseup', cancelRight);
	this.htmlDown.addEventListener('mouseup', cancelReverse);
	this.htmlb.addEventListener('mouseup', brakeReadyBuffer);

//End Init
},

remove: function () {
	//Do something the component or its entity is detached.
	//Called when the component is removed from the entity (e.g., via removeAttribute) or when the entity is detached from the scene. Used to undo all previous modifications to the entity.

	//
	//VR Event Listeners

	//Belt Controller Event Listeners
	if(this.movetype === 'vr'){
		//Joystick Controller
		//this.vrController.removeEventListener('thumbstickmoved');
		//this.vrController.removeEventListener('thumbsticktouchend');
		//directionForward
		this.directionForward.removeEventListener('mouseenter', movingForward);
		this.directionForward.removeEventListener('mouseleave', cancelForward);
		//directionReverse
		this.directionReverse.removeEventListener('mouseenter', movingReverse);
		this.directionReverse.removeEventListener('mouseleave', cancelReverse);
		//This format does not like functions inside, adjust to allow
		//directionBrakes
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseenter', event => {
				//Brake is disabled for 1.5 seconds after engaging
				if(brakeReady){
					if(brakeToggle){
						//Set reset switch toggle
						brakeToggle = false;
						//Set reset timer switch toggle
						brakeReady = false;
						//Brake On
						moveBrake = true;
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
						brakeToggle = true;
						//Set reset timer switch toggle
						brakeReady = false;
						//Brake Off
						moveBrake = false;
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
			})
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseleave', event => {
				//This will start the reset timer to allow the brake to be re-engadged
				//Brake Reset Timeout
				brakeReset = setTimeout(function () {
					//Set reset switch toggle
					brakeReady = true;
				}, 2250); //Delay
			})
		});

		//
		//Quest Controller
	}


	//Keyboard Controller Event Listeners
	//
	//Key Down - WASD | QE
	document.body.removeEventListener('keydown', function (e) {
		if (e.key === 'w' || e.key === 'W') {
			movingForward();
		} else if (e.key === 'a' || e.key === 'A') {
			movingLeft();
		} else if (e.key === 's' || e.key === 'S') {
			movingReverse();
		} else if (e.key === 'd' || e.key === 'D') {
			movingRight();
		} else if (e.key === 'q' || e.key === 'Q') {
			//Special Button 1
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Special Button 2
			//console.log('button 2');
			console.log('Toggle Speed');
			toggleSpeed();
		}
	});
	//Key Down - WASD | QE
	document.body.removeEventListener('keyup', function (e) {
		if (e.key === 'w' || e.key === 'W') {
			cancelForward();
		} else if (e.key === 'a' || e.key === 'A') {
			cancelLeft();
		} else if (e.key === 's' || e.key === 'S') {
			cancelReverse();
		} else if (e.key === 'd' || e.key === 'D') {
			cancelRight();
		} else if (e.key === 'q' || e.key === 'Q') {
			//Special Button 1
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Special Button 2
			//console.log('button 2');
			brakeReadyBuffer();
		}
	});

	//HTML Controller Event Listeners
	//
	//Mouse Down
	this.htmlUp.removeEventListener('mousedown', movingForward);
	this.htmlLeft.removeEventListener('mousedown', movingLeft);
	this.htmlRight.removeEventListener('mousedown', movingRight);
	this.htmlDown.removeEventListener('mousedown', movingReverse);
	this.htmlb.removeEventListener('mousedown', toggleSpeed);
	//Mouse Up
	this.htmlUp.removeEventListener('mouseup', cancelForward);
	this.htmlLeft.removeEventListener('mouseup', cancelLeft);
	this.htmlRight.removeEventListener('mouseup', cancelRight);
	this.htmlDown.removeEventListener('mouseup', cancelReverse);
	this.htmlb.removeEventListener('mouseup', brakeReadyBuffer);
},

everySome: function (time, timeDelta) {
	//Do something on every scene tick or frame.
	//console.log('everysome running');
	//console.log(move);
	if(moveBrake){
		if(moveTo) {
			this.walk('forward', moveSpeedSlow);
		} else if(moveBack) {
			this.walk('reverse', moveSpeedSlow);
		} else if(moveRight) {
			this.walk('right', moveSpeedSlow);
		} else if(moveLeft) {
			this.walk('left', moveSpeedSlow);
		}
	} else {
		if(moveTo) {
			this.walk('forward', moveSpeedDefault);
		} else if(moveBack) {
			this.walk('reverse', moveSpeedDefault);
		} else if(moveRight) {
			this.walk('right', moveSpeedDefault);
		} else if(moveLeft) {
			this.walk('left', moveSpeedDefault);
		}
	}
},

tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//Throttle
	this.throttledFunction();

	//Run uiSync Function
	if(this.movetype === 'vr'){
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

this.vector = new THREE.Vector3();
this.positionNew = new THREE.Vector3();


this.velocity = speed;
//Get Camera Vec3
this.camera.object3D.getWorldDirection(this.vector);
this.positionPlayer.copy(this.player.object3D.position);
//Math out the Angle
//Degrees
//this.angle = Math.atan2(this.vector.x,this.vector.z) * 180 / Math.PI;
//Radians
this.angle = Math.atan2(this.vector.x,this.vector.z);
// 0 < θ < π/2

if(action === 'forward'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0');
	}
} else if(action === 'reverse'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0');
	}
} else if(action === 'right'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0');
	}

} else if(action === 'left'){
	//check which quadrant the vector is in
	if(this.angle > 0 && this.angle < Math.PI/2) {
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('1');
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('2');
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		this.angle += Math.PI;
		this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		//console.log('3');
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		this.angle += (Math.PI * 2);
		this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
		this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		//console.log('4');
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		//console.log('0');
	}

}

this.positionNew.y = this.positionPlayer.y;

//No Offsets as UI Parent is at 0 0 0
//Set position for UI at 3js level for speed!
this.player.object3D.position.copy(this.positionNew);
//console.log(this.angle);
//console.log(this.positionNew);

},

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
},//spawnwithuser

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
//External Components
//

//
//Look-At  - https://github.com/supermedium/superframe/tree/master/components/look-at/ 
!function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t){var o=AFRAME.utils.debug,n=AFRAME.utils.coordinates,i=o("components:look-at:warn"),r=n.isCoordinates||n.isCoordinate;delete AFRAME.components["look-at"],AFRAME.registerComponent("look-at",{schema:{default:"0 0 0",parse:function(e){return r(e)||"object"==typeof e?n.parse(e):e},stringify:function(e){return"object"==typeof e?n.stringify(e):e}},init:function(){this.target3D=null,this.vector=new THREE.Vector3,this.cameraListener=AFRAME.utils.bind(this.cameraListener,this),this.el.addEventListener("componentinitialized",this.cameraListener),this.el.addEventListener("componentremoved",this.cameraListener)},update:function(){var e,t=this,o=t.data;return!o||"object"==typeof o&&!Object.keys(o).length?t.remove():"object"==typeof o?this.lookAt(new THREE.Vector3(o.x,o.y,o.z)):(e=t.el.sceneEl.querySelector(o),e?e.hasLoaded?t.beginTracking(e):e.addEventListener("loaded",function(){t.beginTracking(e)}):void i('"'+o+'" does not point to a valid entity to look-at'))},tick:function(){var e=new THREE.Vector3;return function(t){var o=this.target3D;o&&(o.getWorldPosition(e),this.lookAt(e))}}(),remove:function(){this.el.removeEventListener("componentinitialized",this.cameraListener),this.el.removeEventListener("componentremoved",this.cameraListener)},beginTracking:function(e){this.target3D=e.object3D},cameraListener:function(e){e.detail&&"camera"===e.detail.name&&this.update()},lookAt:function(e){var t=this.vector,o=this.el.object3D;this.el.getObject3D("camera")?t.subVectors(o.position,e).add(o.position):t.copy(e),o.lookAt(t)}})}]);

//
//threeColorGradientShader shader - https://github.com/tlaukkan/aframe-three-color-gradient-shader
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