//
//AUXL : A-Frame UX Library
//v0.1 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL Demo Scenario

//
//A-Frame UX Library
AFRAME.registerSystem('auxl', {
//schema: {
	//bar: {type: 'number'},
	//style: {type: 'string', default: 'random'}
//},

init: function () {

// System
/********************************************************************/
//

//Establish a-frame objects
const sceneEl = document.querySelector('a-scene');
const head = document.querySelector('head');
let aThis = this;
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
this.menuOpen = true;
this.infoOpen = false;
//Audio
this.audioEnabled = false;
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
const controllerBlock = document.getElementById('controllerBlock');
//Core, Layer & Aux currently spawned in scene.
this.spawned = {};
this.zoneSpawned = {};
this.nodeSpawned = {};
this.menuSpawned = {};
this.genSpawned = {};
this.npcSpawned = {};
this.carouselSpawned = {};
function clearSpawned(spawned){
	for(let spawn in spawned){
		//console.log(spawn);//name of ID
		//console.log(spawned[spawn]);//obj
		//console.log(aThis[spawn]);
		if(aThis[spawn]){
			if(aThis[spawn].type === 'core'){
				aThis[spawn].core.RemoveFromScene();
			} else if (aThis[spawn].type === 'layer'){
				aThis[spawn].layer.RemoveAllFromScene();
			} else if (spawned[spawn].type === 'gen'){
				aThis[spawn].DespawnAll();
			} else if (spawned[spawn].type === 'npc'){
				aThis[spawn].Despawn();
			}  else if (spawned[spawn].type === 'carousel'){
				aThis[spawn].Remove();
			} else {
				if(aThis[spawn].RemoveFromScene){
					aThis[spawn].RemoveFromScene();
				} else if(aThis[spawn].RemoveAllFromScene){
					aThis[spawn].RemoveAllFromScene();
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
this.timeouts = {};
this.intervals = {};
this.interactions = {};
this.events = {};

//
//HTML Menu
function toggleMenu(){
	if(aThis.menuOpen){
		//Close Menu
		beginDiv.style.display = 'none';
		aThis.menuOpen = false;
		if(aThis.infoOpen){
			toggleInfo();
		}
	} else {
		//Open Menu
		beginDiv.style.display = 'flex';
		aThis.menuOpen = true;
	}
}
stickyMenu.addEventListener('click', toggleMenu);

//
//Start Experience
function startExp(){
	if(aThis.expStarted){}else{
		let timeoutSpawn = setTimeout(function () {
			startButton.innerHTML = 'Resume'
			aThis.zone0.StartScene();
			updateControls();
			aThis.expStarted = true;
			dayNight();
			clearTimeout(timeoutSpawn);
		}, 425);
		playerSpawnAnim();
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
	vrController.setAttribute('laser-controls',{hand: aThis.vrHand});
	//Enable VR Locomotion
	aThis.player.EnableVRLocomotion();
	//Update Controls
	aThis.controls = 'VR';
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
	aThis.player.EnableDesktopLocomotion();
	//Update Controls
	aThis.controls = 'Desktop';
}
//Mobile
function disableMobileControls(){
	sceneEl.setAttribute('device-orientation-permission-ui', {enabled: false});
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
	sceneEl.setAttribute('device-orientation-permission-ui', {enabled: true});
	sceneEl.addEventListener('deviceorientationpermissiongranted', function(){
		aThis.mobilePermissionGranted = true;
	});
	sceneEl.addEventListener('deviceorientationpermissionrejected', function(){
		aThis.mobilePermissionGranted = false;
	});
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
	aThis.player.EnableMobileLocomotion();
	//Update Controls
	aThis.controls = 'Mobile';
}
//Update Controls
function updateControls(){
	if(aThis.controls === 'Desktop'){
		disableMobileControls();
		disableVRControls();
		enableDesktopControls();
	} else if(aThis.controls === 'Mobile'){
		disableVRControls();
		disableDesktopControls();
		enableMobileControls();
	} else if(aThis.controls === 'VR'){
		disableDesktopControls();
		disableMobileControls();
		enableVRControls();
	}
}
//Menu Button Controls
function changeControls(){
	if(aThis.controls === 'Desktop'){
		aThis.controls = 'VR';
		menuModeButton.innerHTML = 'Mode : VR';
		vrHandButton.style.display = 'flex';
	} else if(aThis.controls === 'VR'){
		vrHandButton.style.display = 'none';
		aThis.controls = 'Mobile';
		menuModeButton.innerHTML = 'Mode : Mobile';
	} else if(aThis.controls === 'Mobile'){
		aThis.controls = 'Desktop';
		menuModeButton.innerHTML = 'Mode : Desktop'
	}
	if(aThis.expStarted){
		updateControls();
	}
}
menuModeButton.addEventListener('click', changeControls);

function changeVRHand(){
	if(aThis.vrHand === 'right'){
		aThis.vrHand = 'left';
		vrHandButton.innerHTML = 'Hand : Left';
	} else {
		aThis.vrHand = 'right';
		vrHandButton.innerHTML = 'Hand : Right';
	}
	if(aThis.expStarted){
		updateControls();
	}
}
vrHandButton.addEventListener('click', changeVRHand);

//
//Audio
function toggleAudio(){
	if(aThis.audioEnabled){
		//Disable Audio
		aThis.audioEnabled = false;
		audioButton.innerHTML = 'Sound : Disabled';
	} else {
		//Enable Audio
		aThis.audioEnabled = true;
		audioButton.innerHTML = 'Sound : Enabled';
	}
}
audioButton.addEventListener('click', toggleAudio);

//
//Instructions
function toggleInfo(){
	if(aThis.infoOpen){
		//Close Info
		expInfo.style.display = 'none';
		aThis.infoOpen = false;
	} else {
		//Open Info
		expInfo.style.display = 'flex';
		aThis.infoOpen = true;
	}
}
viewInfo.addEventListener('click', toggleInfo);
infoClose.addEventListener('click', toggleInfo);

//
//Environmental Settings
this.timeInDay = 360000;

//
//Support

//Color Theory Hex Generator
function colorsHexGen(color){
//Could allow importing the main color family to choose from. Like start with a random red and build from there or import a specifc hex and build from there

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
//Pick Random Color from Color Family
function colorFamilyGen(color){
//In-Progress
//Creating an arrays for each color section with preselected colors to randomly choose from 
}



let r;
let r0;
let g;
let g0;
let b;
let b0;
let base;
let baseRGB;

//If color doesn't exist then create a randomized one
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

r = Math.floor(Math.random()*255);
r0 = r/255;
g = Math.floor(Math.random()*255);
g0 = g/255;
b = Math.floor(Math.random()*255);
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
let analagRGB = [
HSLToRGB(Math.abs((hue + 30) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 60) - 360), sat, lum),
HSLToRGB(Math.abs((hue + 90) - 360), sat, lum)
];
let analag = [
RGBToHex(analagRGB[0].r, analagRGB[0].g, analagRGB[0].b),
RGBToHex(analagRGB[1].r, analagRGB[1].g, analagRGB[1].b),
RGBToHex(analagRGB[2].r, analagRGB[2].g, analagRGB[2].b)
];

//Monochrome (25-60% | 42%)
const spread = 0.42;
let light = RGBToHex(r*(1+spread),g*(1+spread),b*(1+spread));
let dark = RGBToHex(r*(1-spread),g*(1-spread),b*(1-spread));
//red_light = red_primary * (1 + scaling_factor)
//green_light = green_primary * (1 + scaling_factor)
//blue_light = blue_primary * (1 + scaling_factor)

//red_dark = red_primary * (1 - scaling_factor)
//green_dark = green_primary * (1 - scaling_factor)
//blue_dark = blue_primary * (1 - scaling_factor)



//Colors :
//Base
//Complementary
//Split-complementary
//Triadic
//Tetradic
//Analagous
//Monochrome

return {base, light, dark, compl, splitCompl, triadic, tetradic, analag};

}
/*
let newColor1 = colorsHexGen();
console.log(newColor1.base);
console.log(newColor1.compl);
console.log(newColor1.splitCompl[0]);
console.log(newColor1.splitCompl[1]);
console.log(newColor1.triadic[0]);
console.log(newColor1.triadic[1]);
console.log(newColor1.tetradic[0]);
console.log(newColor1.tetradic[1]);
console.log(newColor1.tetradic[2]);
console.log(newColor1.analag[0]);
console.log(newColor1.analag[1]);
console.log(newColor1.analag[2]);
*/

//Entity Core
const Core = (data) => {

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
		//Scene Tracking of Assets
		if(aThis.zoneSpawned[core.id]){} else {
			aThis.nodeSpawned[core.id] = {type: 'core', obj: core};
		}
	}

	const RemoveFromSceneTracker = () => {
		//Clear Tracking of Asset
		delete aThis.nodeSpawned[core.id];
	}

	const ChangeSelf = ({property,value}) => {
		//console.log(property);
		//console.log(value);
		GetEl().setAttribute(property, value);
	}

	const ChangeSelfArray = (...setAlt) => {
		//console.log(setAlt);

		for(let a = 0; a < setAlt.length; a++){
			//console.log(setAlt[a].property);
			//console.log(setAlt[a].value);
			GetEl().setAttribute(setAlt[a].property, setAlt[a].value);
		}
	}

	const Animate = (animProps) => {
		//let el = document.getElementById(core.el.id);
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


		//console.log(name);
		//console.log(anim);
		//console.log(GetEl());
		GetEl().setAttribute(name, anim);
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
		GetEl().emit(eventName,{})
		//console.log(GetEl());
		//console.log(eventName);
	}

	const SetFlag = ({flag, value}) => {
		core[flag] = value;
		//console.log(flag);
		//console.log(core[flag]);
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
		core.detailMain = Core(aThis.detailMainData);
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
		core.detailClose = Core(aThis.detailCloseData);
		//Detail Layer
		core.detailLayer = {
		parent: {core: core.detailMain}, 
		child0: {core: core.detailClose},
		}
		core.detailAll = Layer('detailAll',core.detailLayer);
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
		if(core.isOpen){
			//console.log('Is Open');
			core.isOpen = detailPrompt_close();
			core.detailClose.core.el.removeEventListener('click',{});
		} else {
			//console.log('Is Closed');
			core.detailAll.AddAllToScene();
			core.isOpen = detailPrompt_open();
			core.detailClose.core.el.addEventListener('click', function(){
				core.isOpen = detailPrompt_close();
				core.detailClose.core.el.removeEventListener('click',{});
			});
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

	return {core, Generate, AddToScene, RemoveFromScene, ChangeSelf, ChangeSelfArray, Animate, GetEl, EmitEvent, SetFlag, GetFlag, ClickRun, FuseClickRun, CursorDownRun, CursorEnterRun, CursorLeaveRun, CursorUpRun, EnableDetail, DisableDetail};
}

//
//layered Core
const Layer = (id, all) => {

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
		if(aThis.zoneSpawned[layer.id]){} else {
    		aThis.nodeSpawned[layer.id] = {type: 'layer', obj: layer};
		}
    	//aThis.zoneSpawned[layer.id] = {type: 'layer', obj: this};
	}

	const RemoveFromSceneTracker = () => {
		delete aThis.nodeSpawned[layer.id];
		//delete aThis.zoneSpawned[layer.id];
	}

	const GetParentEl = () => {
		return layer.all.parent.core.GetEl();
	}

	const EmitEventParent = (eventName) => {
		all.parent.core.EmitEvent(eventName);
	}

	const ChangeParent = (property, value) => {
		all.parent.core.ChangeSelf(property, value);
	}

	const ChangeAll = (property, value) => {
		for(let section of accessOrder){
			//console.log(section);
			for(let each of section){
				//console.log(each);
				each.ChangeSelf(property, value);
			}
		}
	}

	const AnimateParent = (animProps) => {
		all.parent.core.Animate(animProps);
	}

	const AnimateAll = (animProps) => {
		for(let section of accessOrder){
			//console.log(section);
			for(let each of section){
				//console.log(each);
				each.Animate(animProps);
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
const Player = (layer) => {

	layer.transition = 'blink';
	//instant
	//fade
	//sphere
	//blink

	//Controlled by swap-controls component
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

	const SetFlag = ({flag, value}) => {
		layer[flag] = value;
		//console.log(flag);
		//console.log(core[flag]);
	}

	const GetFlag = (varName) => {
		//console.log(varName)
		//console.log(core[varName])
		return layer[varName];
	}

	const TempDisableClick = () => {
	//Need to check which controls are currently enabled
	//mouseController
	//vrController
		let disableTimeout;
		if(layer.controls === 'desktop'){
			aThis.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: 'true', autoRefresh: 'true', objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
			//Timeout
			disableTimeout = setTimeout(function () {
				aThis.mouseController.ChangeSelf({property: 'raycaster',value: {enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'}});
				clearTimeout(disableTimeout);
			}, 1000);
		} else if(layer.controls === 'vr'){
			aThis.vrController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.disabled', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'}});
			//Timeout
			disableTimeout = setTimeout(function () {
				aThis.vrController.ChangeSelf({property: 'raycaster', value: {enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'}});
				clearTimeout(disableTimeout);
			}, 1000);
		}


	//vrController raycaster property

	}

	const EnableVRLocomotion = () => {
		playerRig.removeAttribute('belt');
		aThis.locomotionUILayer.AddAllToScene(true);
		playerRig.setAttribute('belt',{uiid: 'beltUIParent', controller1id: 'vrController', courserid: 'mouseController', movetype: 'vr'});
	}

	const EnableDesktopLocomotion = () => {
		playerRig.removeAttribute('belt');
		if(document.getElementById('beltUIParent')){
			aThis.locomotionUILayer.RemoveAllFromScene();
		}
		playerRig.setAttribute('belt',{uiid: false, controller1id: false, courserid: 'mouseController', movetype: 'desktop'});
	}

	const EnableMobileLocomotion = () => {
		playerRig.removeAttribute('belt');
		if(document.getElementById('beltUIParent')){
			aThis.locomotionUILayer.RemoveAllFromScene();
		}
		playerRig.setAttribute('belt',{uiid: false, controller1id: false, courserid: 'mouseController', movetype: 'mobile'});
	}

	const DisableLocomotion = () => {
		playerRig.removeAttribute('belt');
		if(document.getElementById('beltUIParent')){
			aThis.locomotionUILayer.RemoveAllFromScene();
		}
	}

	return {layer, SetFlag, GetFlag, TempDisableClick, EnableVRLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, DisableLocomotion}
}
//Spawn Function
function playerSpawnAnim(){
	if(aThis.player.layer.transition === 'blink'){
		aThis.player.TempDisableClick();
		aThis.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
		aThis.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
		aThis.blink1Screen.EmitEvent('blink');
		aThis.blink2Screen.EmitEvent('blink');
		timeout2 = setTimeout(function () {
			aThis.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
			aThis.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(timeout2);
		}, 1200);
	} else if (aThis.player.layer.transition === 'fade'){
		aThis.player.TempDisableClick();
		aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
		aThis.fadeScreen.EmitEvent('fade');
		timeout2 = setTimeout(function () {
			aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(timeout2);
		}, 1200);
	} else if (aThis.player.layer.transition === 'sphere'){
		aThis.player.TempDisableClick();
		aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
		aThis.sphereScreen.EmitEvent('sphere');
		timeout2 = setTimeout(function () {
			aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(timeout2);
		}, 1200);
	} else if (aThis.player.layer.transition === 'instant'){}
}

//
//Menu
const Menu = (menuData) => {

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
		menu.data.material.color, menu.data.material.emissive = colorsHexGen().base;
		prompt = Core(menu.data);
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
			menu.data.material.color, menu.data.material.emissive = colorsHexGen().base;
			menu.data.text.value = menu.options[menuItem];
			menu.data.id = menu.id + 'option' + menuNum;
			menu.data.components.result = menu.actions['action'+menuNum];
			menuOption = Core(menu.data);
			//menuOption.AddToScene();
			menuOptions.push(menuOption);
			menu.layers['child'+menuNum] = {core: menuOptions[menuNum]}
			menuNum++;
		}
		//AddToSceneTracker();

		//Build layered Menu
		menu.layer = Layer(menu.id, menu.layers);
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
    	aThis.menuSpawned[menu.id] = {type: 'menu', obj};
	}

	const RemoveFromMenuSceneTracker = () => {
		delete aThis.menuSpawned[menu.id];
	}

	return {menu, MenuGen, MenuRemove, ToggleOptionClicking, AddToMenuSceneTracker, RemoveFromMenuSceneTracker};
}

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
const SceneNode = (sceneData) => {
//Configure and Display Scene
let core = Object.assign({}, sceneData);

let textBubble= Core(this.sceneTextData);
let sceneText = SpeechSystem(textBubble);

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
		//console.log(aThis[condObj].GetFlag(cond))
		if(aThis[condObj].GetFlag(cond)) {
			//run ifTrue
			for(let a in ifTrue){
				//console.log(ifTrue);
				//console.log(a);
				//console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					AThisObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			//run ifFalse
			for(let a in ifFalse){
				//console.log(ifFalse);
				//console.log(a);//this.object name should match objRef
				//console.log(ifFalse[a]);//method w/ params
				for(let b in ifFalse[a]){
					AThisObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}

	}

	const SetFlag = (objRef, flagInfo) => {
		//console.log('Setting Flag')
		//console.log(objRef)
		//console.log(flagInfo)
		//access variables
		let flag = '';
		let value = '';
		let params = {};
		for(let a in flagInfo){
			//console.log(b);//flag, value
			if(a === 'flag'){
				flag = flagInfo[a];
			} else if (a === 'value'){
				value = flagInfo[a];
			}
		}
		params = {flag, value};
		//set this.obj.flag = value;
		//console.log(flag);
		//console.log(value);
		//console.log(params);
		//aThis[line][flag] = value;
		AThisObjMethod(objRef,'SetFlag',params);
	}

	const AddToTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		//console.log({name,type,id,method,params,event})
		let nameId = name+id;
		if(type === 'timeout'){
			aThis.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			aThis.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			//console.log({name,type,id,method,params,event})
			//console.log(nameId);
			aThis.running[nameId] = {type, name, id, nameId, method, params, event};
		}
		//console.log(aThis.running);
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete aThis.running[name];
	}

	const ClearSceneTimeIntEvt = () => {
		//console.log(aThis.running);
		for(let ran in aThis.running){
			//console.log(ran);//name of ID
			//console.log(aThis.running[ran]);//object
			if(aThis.running[ran].type === 'timeout'){
				//console.log('clearing timeout');
				//console.log(aThis.running[ran].nameId);
				//console.log(aThis.timeouts[aThis.running[ran].nameId]);
				//clearTimeout(aThis.running[ran].nameId);
				clearTimeout(aThis.timeouts[aThis.running[ran].nameId]);
				delete aThis.timeouts[aThis.running[ran].nameId];
			} else if (aThis.running[ran].type === 'interval'){
				//console.log('clearing interval');
				//console.log(aThis.running[ran].nameId);
				//console.log(aThis.intervals);
				clearInterval(aThis.intervals[aThis.running[ran].nameId]);
				delete aThis.intervals[aThis.running[ran].nameId];
			} else if (aThis.running[ran].type === 'interaction' || aThis.running[ran].type === 'event'){
				//Event
				//console.log('clearing interaction|event');
				//console.log(aThis.running[ran].name);
				//console.log(aThis.running[ran].event);
aThis[aThis.running[ran].name].GetEl().removeEventListener(aThis.running[ran].event, function(){
AThisObjMethod(aThis.running[ran].object,aThis.running[ran].method,aThis.running[ran].params);
});
			}
			RemoveFromTimeIntEvtTracker(ran);
		}
		//console.log(aThis.running);
		//console.log(aThis.timeouts);
		//console.log(aThis.intervals);
	}

	const ClearScene = () => {
		//Clear Core | Layer Scene Tracked Items
		//Run Exit section of current Node
		Exit();

		//console.log('Clearing Scene...')
		//console.log(aThis.nodeSpawned);
		//Clear Timeout, Intervals and Event Listeners first
		ClearSceneTimeIntEvt();
		clearSpawned(aThis.nodeSpawned);

		//What if these were added in Zone?
		clearSpawned(aThis.genSpawned);
		clearSpawned(aThis.menuSpawned);
		clearSpawned(aThis.npcSpawned);
		clearSpawned(aThis.carouselSpawned);
		/*
		for(let spawn in aThis.nodeSpawned){
			//console.log(spawn);//name of ID
			//console.log(aThis[spawn]);

			if(aThis[spawn]){
				if(aThis[spawn].type === 'core'){
						aThis[spawn].core.RemoveFromScene();
				} else if (aThis[spawn].type === 'layer'){
						aThis[spawn].layer.RemoveAllFromScene();
				} else {
					if(aThis[spawn].RemoveFromScene){
						aThis[spawn].RemoveFromScene();
					} else if(aThis[spawn].RemoveAllFromScene){
						aThis[spawn].RemoveAllFromScene();
					}
				}
			} else if(document.getElementById(spawn)){
				//console.log(spawn);
				//console.log(document.getElementById(spawn));
			}

			//console.log(aThis.nodeSpawned[spawn]);//Book & Page spawned from
			delete aThis.nodeSpawned[spawn];
		}*/
		//Clear Timeout, Intervals and Event Listeners as well
		//ClearSceneTimeIntEvt();
	}

	const AThisObjMethod = (object, func, params) => {
		//console.log(object);
		//console.log(func);
		//console.log(params);
		//console.log(aThis[object]);
		aThis[object][func](params);
	}

	function readTimeline(time){
	//find a specific timeline/key name and load up that
	//core : page/data/object
	//time : name of section within a core's pageData
	//line : a single line set of instructions within time
	//
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
							aThis.timeouts[line+a] = setTimeout(function () {
								//console.log('IfElse Timeout Hit');
								IfElse(a,c,core[time][line][a][b][c]);
								clearTimeout(aThis.timeouts[line+a]);
							}, line); //Delay
						}
					} else {
						//console.log('Normal Timeout');
						AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
						aThis.timeouts[line+a] = setTimeout(function () {
							//console.log('Timeout Hit')
							AThisObjMethod(a,b,core[time][line][a][b]);
							clearTimeout(aThis.timeouts[line+a]);
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
									aThis.intervals[line+b] = setInterval(function() {
										//Interval Functions
										//Check for End Condition
										if(aThis[b].GetFlag(endCond) === 'true'){
											clearInterval(aThis.intervals[line+b]);
											RemoveFromTimeIntEvtTracker(line+b);
										}
										//console.log('IfElse Interval Hit')
										IfElse(b,d,core[time][line][a][b][c][d]);
										//Check and update Loop Total
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(aThis.intervals[line+b]);
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
								aThis.intervals[line+b] = setInterval(function() {
									//Interval Functions
									//Check for End Condition
									if(aThis[b].GetFlag(endCond) === 'true'){
										clearInterval(aThis.intervals[line+b]);
										RemoveFromTimeIntEvtTracker(line+b);
									}
									AThisObjMethod(b,method,params);
									//Check and update Loop Total
									if(loopTotal === 'infinite'){} else {
										ranTotal++;
										if(ranTotal >= loopTotal){
											clearInterval(aThis.intervals[line+b]);
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
							aThis[object].GetEl().addEventListener(line, function(){
								IfElse(object,c,params);
								//AThisObjMethod(object,method,params);
							});
						}
					} else {
						//console.log('Normal Interaction');
						object = a;
						method = b;
						params = core[time][line][a][b];
						//aThis.interactions[object];
						//aThis.running[ran].name;
						AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
						aThis[object].GetEl().addEventListener(line, function(){
							AThisObjMethod(object,method,params);
						});
					}
				}
				//aThis[line][a](core[time][line][a]);
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
							aThis[object].GetEl().addEventListener(line, function(){
								IfElse(object,c,params);
								//AThisObjMethod(object,method,params);
							});
						}
					} else {
						//console.log('Normal Event');
						object = a;
						method = b;
						params = core[time][line][a][b];
						//aThis.interactions[object];
						//aThis.running[ran].name;
						AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
						aThis[object].GetEl().addEventListener(line, function(){
							AThisObjMethod(object,method,params);
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
					//aThis.interactions[object];
					//aThis.running[ran].name;
					AddToTimeIntEvtTracker({name: object, type: 'event', id: line, method, params, event: line});
					aThis[object].GetEl().addEventListener(line, function(){
						AThisObjMethod(object,method,params);
					});
					*/
				}
				//aThis[line][a](core[time][line][a]);
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
						AThisObjMethod(line,a,core[time][line][a]);
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
						AThisObjMethod(line,a,core[time][line][a]);
					}
				} else if(time === 'zone'){
					if(a === 'IfElse'){
						console.log('IfElse shouldnt be used in Zone. Move to Other.');
						//IfElse(line,core[time][line][a]);
					} else {
						//Check if Zone element already exists
						//console.log('Adding Zone Element');
						//Add to Zone Tracker
						if(a === 'AddToScene'){
							if(aThis.zoneSpawned[aThis[line].core.id]){} else {
								AddToZoneTracker('core', aThis[line]);
								AThisObjMethod(line,a,core[time][line][a]);
							}
						} else if(a === 'AddAllToScene'){
							if(aThis.zoneSpawned[aThis[line].layer.id]){} else {
								AddToZoneTracker('layer', aThis[line]);
								AThisObjMethod(line,a,core[time][line][a]);
							}
						}
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
					//console.log(aThis);//this.object
					//console.log(aThis[line]);//this.object
					//aThis[line][a](core[time][line][a]);
					//AThisObjMethod(line,a,core[time][line][a]);
				}
			}
		}
	}
	return;
	}

	const Info = () => {
		readTimeline('info');
	}

	const Zone = () => {
		readTimeline('zone');
	}

	const AddToZoneTracker = (type, obj) => {
		if(type === 'core'){
    		aThis.zoneSpawned[obj.core.id] = {type, obj};
		} else if(type === 'layer'){
    		aThis.zoneSpawned[obj.layer.id] = {type, obj};
		}
		//console.log(aThis.zoneSpawned)
	}

	const RemoveFromZoneTracker = (type) => {
		delete aThis.zoneSpawned[type.id];
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
		Interaction();
		Event();
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

	return {core, IfElse, SetFlag, ClearScene, AThisObjMethod, Info, Zone, Start, Delay, Interval, Event, Interaction, Exit, Map, StartScene}
}
//DayNight
function dayNight(){

	aThis.directionalLight.EmitEvent('sunrise');
	aThis.directionalLight2.EmitEvent('sunrise');
	aThis.directionalLight3.EmitEvent('sunrise');
	aThis.ambientLight.EmitEvent('sunrise');
	aThis.sunLayer.EmitEventParent('sunrise');
	aThis.moonLayer.EmitEventParent('sunrise');
	aThis.skyGrad.EmitEvent('sunrise');

	aThis.skyGrad.SetFlag({flag:'day', value: true});
	//SkyGrad Color Anim
	//Timeout
	let timeoutDayNight = setTimeout(function () {
		aThis.skyGrad.SetFlag({flag:'day', value: false});
		aThis.skyGrad.EmitEvent('sunset');
		let intervalDayNight = setInterval(function() {
			if(aThis.skyGrad.GetFlag('day')){
				aThis.skyGrad.SetFlag({flag:'day', value: false});
				aThis.skyGrad.EmitEvent('sunset');
			}else{
				aThis.skyGrad.SetFlag({flag:'day', value: true});
				aThis.skyGrad.EmitEvent('sunrise');
			}
		//clearInterval(intervalDayNight);
		}, aThis.timeInDay/2); //Interval
	}, aThis.timeInDay/2 - aThis.timeInDay/24); //Delay
}

//
//mapRegionDistrictTerritoryZoneSection
//Map Zone Gen & reader
const MapZone = (mapZoneData) => {
//Display Local Map and facilitate travel between Nodes
let core = {};
core.map = Object.assign({}, mapZoneData)
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
		for(let key in core.map){
			if(key === 'info'){
				core.info = core.map[key]
			} else {
				//console.log(key)//key - info, zone0Node0In1
				core.nodes[key] = aThis[key];
				//console.log(aThis[key])//this.nodeObj
				//console.log(core.map[key])//value - node connections
				for(let connect in core.map[key]){
					//console.log(core.map[key][connect]);//connect0, connect1
					for(let travel in core.map[key][connect]){
						//console.log(travel);//connect keys
						//console.log(core.map[key][connect][travel]);//connect values
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

	const StartScene = (nodeName) => {
		//core.currentNode = nodeName || Object.keys(core.nodes)[0];
		core.currentNode = nodeName || core.map.info.start;
		core.currentZone = core.info.id;
		if(core.zoneLoaded){} else {
			aThis[core.map.info.start].Zone();
			core.zoneLoaded = true;
		}
		aThis[core.currentNode].StartScene();
		MoveMenuGen();
		//console.log('Scene Start');
		//console.log(core.currentNode);
	}

	const ClearScene = () => {
		aThis[core.currentNode].ClearScene();
	}

	const MoveMenuGen = () => {

		core.mapMenuData = {
			id: 'moveMenu',
			prompt: 'Move to...',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: aThis.menuBaseData,
			cursorObj: core.currentZone,
			method: 'MenuMoveClick',
			pos: new THREE.Vector3(-1.5,1.5,-1),
		}
		//console.log(core.map);
		//console.log(core.map[core.currentNode]);
		let currNum = 0;
		let moveToNode;
		for(let connect in core.map[core.currentNode]){
			//console.log(connect);
			//core.map[core.currentNode][connect].inZone
			//core.map[core.currentNode][connect].node
			//core.map[core.currentNode][connect].travel
			//core.map[core.currentNode][connect].locked
			//core.map[core.currentNode][connect].key
			//core.map[core.currentNode][connect].keepKey

			//In Zone Node or Out of Zone Node
			if(core.nodes[core.map[core.currentNode][connect].node]){
				moveToNode = core.nodes[core.map[core.currentNode][connect].node];
			} else {
				moveToNode = aThis[core.map[core.currentNode][connect].node];
			}

			if(core.map[core.currentNode][connect].locked && !aThis.player.GetFlag(core.map[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Locked]';
			} else if(core.map[core.currentNode][connect].locked && aThis.player.GetFlag(core.map[core.currentNode][connect].key)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name;
			}

			core.mapMenuData.actions['action'+currNum] = connect;
			//core.mapMenuData.actions['action'+currNum] = moveToNode.core.info.id;
			currNum++;

		}
		//core.map[core.currentNode][connect].inZone;
		//inZone
		//node
		//travel
		//locked
		//key
		//keepKey
		core.mapMenu = Menu(core.mapMenuData);
		core.mapMenu.MenuGen();
	}

	const MenuMoveClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);//connect0
		Move(result);
	}

	const Move = (connect) => {

		newNode = core.map[core.currentNode][connect];

		if(newNode.locked && !aThis.player.GetFlag(newNode.key)){
			//console.log('Needs key');
			clearTimeout(timeout2);
			aThis.player.TempDisableClick();
			aThis.cameraUI.ChangeSelf({property: 'text', value: {value:'Requires : ' + newNode.key, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
			aThis.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
			aThis.cameraUI.EmitEvent('cameraMsg');
			timeout2 = setTimeout(function () {
				aThis.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
				clearTimeout(timeout2);
			}, 3750);
			//Testing
			//aThis.player.SetFlag({flag: newNode.key, value: true})
			//console.log('Key given');
		} else {
			if(newNode.locked && aThis.player.GetFlag(newNode.key) && !newNode.keepKey){
				aThis.player.SetFlag({flag: newNode.key, value: false})
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
						aThis[newNode.inZone].StartScene(newNode.node)
					}
				clearTimeout(timeout);
			}, 425);
			//Instant, Shrink/Grow, Fade, Sphere, Blink
			//console.log(aThis.player)
			//console.log(aThis.player.layer)
			//console.log(aThis.player.layer.transition)
			playerSpawnAnim();
		}
	}

	const ClearZone = () => {
	//Clear Core | Layer Scene Tracked Items
		//console.log('Clearing Scene...')
		//console.log(aThis.zoneSpawned);
		clearSpawned(aThis.zoneSpawned);
		/*
		for(let spawn in aThis.zoneSpawned){
			//console.log(spawn);//name of ID
			//console.log(aThis[spawn]);

			if(aThis[spawn]){
				if(aThis[spawn].type === 'core'){
						aThis[spawn].core.RemoveFromScene();
				} else if (aThis[spawn].type === 'layer'){
						aThis[spawn].layer.RemoveAllFromScene();
				} else {
					if(aThis[spawn].RemoveFromScene){
						aThis[spawn].RemoveFromScene();
					} else if(aThis[spawn].RemoveAllFromScene){
						aThis[spawn].RemoveAllFromScene();
					}
				}
			} else if(document.getElementById(spawn)){
				//console.log(spawn);
				//console.log(document.getElementById(spawn));
			}

			//console.log(aThis.zoneSpawned[spawn]);//Book & Page spawned from
			delete aThis.zoneSpawned[spawn];
		}*/
		//console.log(aThis.zoneSpawned);
	}

return {core, ReadMapData, StartScene, MoveMenuGen, MenuMoveClick, Move, ClearZone};
}

//
//Story Book - Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
const Book = (core, npc) => {
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
				//console.log(aThis[line])
				//aThis[line](time[line])
				//console.log('pureFunction');
				//console.log(aThis[line]);
				aThis[line](time[line])
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
					//console.log(aThis[line][a]);
					aThis[line][a](time[line][a]);
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
		if(props === 'floor'){
			if(book.scene[props] === 'default'){
				//nodeFloorCore.AddToScene();
			}
		} else if(props === 'background'){
			if(book.scene[props] === '3GradStarRot'){
				//skyLayerAll.AddAllToScene();
			}
		}
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
	//aThis.bookOverviewAuxlFeatures.readTimeline('page0','timeline6');
	//page - 'page0'
	//time - 'timeline6'
		for(let line in core.pages[page][time]){
			if(line === 'pureFunction'){
				//Need a good check condition for this.func() and not this.obj.func()
				//console.log('pureFunction');
				//console.log(aThis[line]);
				aThis[line](time[line])
			} else {
				for(let a in core.pages[page][time][line]){
					//console.log('Executing...');
					//console.log(aThis[line][a]);
					aThis[line][a](core.pages[page][time][line][a]);
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
		data: aThis.menuBaseData,
		cursorObj: npc.core.id,
		pos: new THREE.Vector3(1,1.5,-0.5),
		method: 'Click',
		}

		for(let a = 0; a < jumpOptions.length; a++){
			selectJumpData.options['option'+a] = jumpOptions[a][0];
			selectJumpData.actions['action'+a] = jumpOptions[a][1];
		}

		book.selectJumpMenu = Menu(selectJumpData);
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
const SpeechSystem = (core) => {

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
		core.GetEl().removeEventListener('mouseenter', function(){});
		core.RemoveFromScene(false,false,true);
		core.on = false;
		//removeFromSceneTracker(core);
	}

	const Kill = (interval) => {
		core.speaking = false;
		clearInterval(aThis.intervals[core.core.id]);
		delete aThis.intervals[core.core.id];
	}

	const KillStop = () => {
		Kill();
		Stop();
	}

	const ChangeCore = (setAlt) => {
		core.ChangeSelf(setAlt)
	}

	const ChangeCoreArray = (...setAlt) => {
		core.ChangeSelfArray(...setAlt)
	}

	const DisplaySpeech = ({role,speech}) => {
		let startText = role + ' : ';
		let currText = startText;
		let currChar = 0;
		core.GetEl().setAttribute('text',{value: currText});
		core.speaking = true;

		core.GetEl().addEventListener('skip', function(){
			core.GetEl().setAttribute('text',{value: startText + speech});
			core.speaking = false;
			Kill();
			core.GetEl().removeEventListener('skip',{});
		});

		AddToTimeIntEvtTracker({name: 'textDisplayInterval', type: 'interval', id: core.core.id});
		aThis.intervals[core.core.id] = setInterval(function() {
			//Interval Functions
			if(currChar < speech.length){
				currText += speech[currChar];
				currChar++;
			}
			if(currChar >= speech.length){
				core.speaking = false;
				Kill();
				core.GetEl().removeEventListener('skip',function(){});
			}
			if(core.on){
				core.GetEl().setAttribute('text',{value: currText});
			}
		}, 20); //Interval
	}

	const AddToTimeIntEvtTracker = ({name,type,id,method,params}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			aThis.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			aThis.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			aThis.running[nameId] = {type, name, id, nameId, method, params, event};
		}
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete aThis.running[name];
	}

	return {core, Start, Skip, KillStop, ChangeCore, ChangeCoreArray, DisplaySpeech};
}

//
//NPC
const NPC = (core, bookData, textDisplay) => {

let npc = Object.assign({}, core);
let bubble = Object.assign({}, textDisplay);
let book;
//bubble.core.position.x = core.core.position.x;
//bubble.core.position.y = core.core.position.y - 0.5;
//bubble.core.position.z = core.core.position.z + 0.25;
let text = SpeechSystem(bubble);
let menuTimeout;

	const Spawn = () => {
		//Reset book on each spawn
		book = Book(bookData, npc);
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
    	aThis.npcSpawned[npc.core.id] = {type: 'npc', obj: npc};
	}

	const RemoveFromNPCSceneTracker = () => {
		delete aThis.npcSpawned[npc.core.id];
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
			book = Book(bookData, npc);
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

	const AThisObjMethod = (object, func, params) => {
		//console.log(object);
		//console.log(func);
		//console.log(params);
		//console.log(aThis[object]);
		aThis[object][func](params);
	}

	const IfElse = (obj) => {
		//ifTrue
		//ifFalse
		//for loop for above objects with key name as object and value key as method and that value the params
		console.log(obj)//entire ifElse object
		let objRef = Object.keys(obj);
		console.log(Object.keys(obj))//this.obj name
		let cond = obj[objRef].cond;
		let ifTrue = obj[objRef].ifTrue;
		let ifFalse = obj[objRef].ifFalse;
		console.log(cond)//cond name
		console.log(ifTrue)
		console.log(ifFalse)

		console.log(aThis[objRef].GetFlag(cond))
		if(aThis[objRef].GetFlag(cond)) {
			//run ifTrue
			for(let a in ifTrue){
				console.log(ifTrue);
				console.log(a);
				console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					AThisObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else {
			//run ifFalse
			for(let a in ifFalse){
				console.log(ifFalse);
				console.log(a);//this.object name should match objRef
				console.log(ifFalse[a]);//method w/ params
				for(let b in ifFalse[a]){
					AThisObjMethod(a,b,ifFalse[a][b]);
				}
			}
		}

	}

	const SetFlag = ({flag, value}) => {
		npc[flag] = value;
		//console.log(flag);
		//console.log(core[flag]);
	}

	const GetFlag = (varName) => {
		//console.log(varName)
		//console.log(core[varName])
		return npc[varName];
	}

return {npc, Spawn, Despawn, EnableSpeech, DisableSpeech, Speak, NextPage, ResetBook, Click, Jump, SelectJump, AThisObjMethod, IfElse, SetFlag, GetFlag}
}

//
//Hamburger Menu Companion
const HamMenu = (name, core) => {

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
sceneSettings: 'Scene Settings',
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
			data: aThis.menuBaseData,
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
		ham.systemMenu = Menu(ham.systemMenuData);
		ham.systemMenu.MenuGen();
		ham.systemMenu.AddToMenuSceneTracker(ham.systemMenu);
		ham.GetEl().classList.toggle('clickable');
		//ham.systemMenu.menu.layer.AnimateParent(aThis.animClickData);
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
			data: aThis.menuBaseData,
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
		ham.travelSettingsMenu = Menu(ham.travelSettingsMenuData);
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
		aThis.player.layer.transition = result;
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
//Carousel
const Carousel = (id,mainData,buttonData,...materials) => {

	let carouselCore;
	let thumbnailCores = [];
	let thumbnailPos = new THREE.Vector3(0,-0.3,0.05);
	//let startPos = (mainData.geometry.width/2)/materials.length;
	//let movePos = mainData.geometry.width/materials.length;

	//Layer
	let carouselLayerData = {}
	for(let mat in materials){
		if(mat === '0'){
			mainData.material = materials[mat];
			carouselCore = Core(mainData);
			carouselLayerData['parent'] = {};
			carouselLayerData['parent'].core = carouselCore;
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
			thumbnailCores[mat] = Core(buttonData);
			carouselLayerData['child'+mat] = {};
			carouselLayerData['child'+mat].core = thumbnailCores[mat];
		}
	}
	let carousel = Layer('carousel',carouselLayerData);

	const Click = (el) => {
		//Swap Material Sources with Parent
		let selectedMat = el.getAttribute('material').src;
		let replacedMat = JSON.parse(JSON.stringify(el.parentNode.getAttribute('material').src));

		el.parentNode.setAttribute('material',{src: selectedMat})
		el.setAttribute('material',{src: replacedMat})
	}

	const Show = () => {
		carousel.AddAllToScene(true);
		AddToCarouselSceneTracker();
	}

	const Remove = () => {
		carousel.RemoveAllFromScene(true);
		RemoveFromCarouselSceneTracker();
	}

	const AddToCarouselSceneTracker = () => {
    	aThis.carouselSpawned[id] = {type: 'carousel', obj: carousel};
	}

	const RemoveFromCarouselSceneTracker = () => {
		delete aThis.carouselSpawned[id];
	}

	//Add autoplay and pause on hovering
	//Controls either left/right or thumbnails for each
	return {carousel, Click, Show, Remove};

}

//
//Objs Gen Ring Spawn
const ObjsGenRing = (data) => {
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
				color = colorsHexGen().base;
				objData.material.color = color;
				if(objData.material.emissive){
					objData.material.emissive = color;
				}
			}
			//Texture
			if(gen.ranTexture){
				objData.material.src = patterns[Math.floor(Math.random()*patterns.length)];
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
			all.push(Core(objData));
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
		if(aThis.zoneSpawned[gen.id]){} else {
			aThis.genSpawned[gen.id] = {type: 'gen', obj: gen};
		}
	}

	const RemoveFromSceneTracker = () => {
		//Clear Tracking of Asset
		delete aThis.genSpawned[gen.id];
	}

	return {all, genCores, SpawnAll, DespawnAll, AddToSceneTracker, RemoveFromSceneTracker};
}

//
//Memory Mini Game
const MemoryGame = (...data) => {

	//Add a game over anim and delay

	//Game Objects
	//Layered Object Generation
	let memoryLayerData = {}
	let memoryNullParentData = JSON.parse(JSON.stringify(aThis.nullParentData));
	memoryNullParentData.id = 'memoryParent';
	memoryNullParentData.position = new THREE.Vector3(0,1,-2);
	let memoryNullParent = Core(memoryNullParentData);
	memoryLayerData['parent'] = {};
	memoryLayerData['parent'].core = memoryNullParent;
	let memoryObjData = {};
	let memoryCores = {};
	for(let each in data){
		memoryObjData = data[each];
		memoryObjData.id = 'memory' + each;
		//memoryObjData.material = materials[each];
		memoryCores[each] = Core(memoryObjData);
		memoryLayerData['child'+each] = {};
		memoryLayerData['child'+each].core = memoryCores[each];
	}
	let memory = Layer('memory',memoryLayerData);

	//UI
	//Game Status
	aThis.memoryUIData.text = {value:'High Score : 0 | Game Ready', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	aThis.memoryUIData.position = new THREE.Vector3(0,2.6,-2);
	aThis.memoryUIData.id = 'memoryUI1';
	let memoryUI1 =  Core(aThis.memoryUIData);

	//Sequence Status
	aThis.memoryUIData.text = {value:'Sequence : *', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	aThis.memoryUIData.position = new THREE.Vector3(0,0.35,-2);
	aThis.memoryUIData.id = 'memoryUI2';
	let memoryUI2 =  Core(aThis.memoryUIData);

	//Game Support
	let playSequenceInterval;
	let roundCompleteTimeout1;
	let roundCompleteTimeout2;
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
			//Reset
			ResetGame();
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
				roundComplete();
				roundCompleteTimeout2 = setTimeout(function () {
					PlaySequence();
					clearTimeout(roundCompleteTimeout2);
				}, 1500);
				clearTimeout(roundCompleteTimeout1);
			}, 500);


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

	function roundComplete(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('roundComplete');
		}
	}

	const GameMenuGen = () => {

		memory.GameMenuData = {
			id: 'memoryGameMenu',
			prompt: 'Memory Game',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: aThis.menuBaseData,
			cursorObj: 'memory',
			method: 'GameMenuClick',
			pos: new THREE.Vector3(0.75,1.55,-2),
		}
		memory.GameMenuData.options['option'+0] = 'Play Game';
		memory.GameMenuData.actions['action'+0] = 'playGame';
		memory.GameMenuData.options['option'+1] = 'Reset Game';
		memory.GameMenuData.actions['action'+1] = 'resetGame';

		memory.gameMenu = Menu(memory.GameMenuData);
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

// Library Data
/********************************************************************/
//

//Materials Library
//

//mintyGreen - #3EB489
//mintyPink - #C14B76
//vaporPink - #ff71ce
//vaporBlue - #01cdfe
//vaporGreen - #05ffa1
//vaporPurple - #b967ff
//vaporYellow - #fffb96

//Grass Material
const grassMaterial = {shader: "standard", color: "#55be71", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#397e4b", emissiveIntensity: 0.2};

//Water Material
const waterMaterial = {shader: "standard", color: "#55a5be", opacity: 1, metalness: 0.1, roughness: 0.9, emissive: "#65c3e0", emissiveIntensity: 0.2};

//Carousel Materials
const mat0 = {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
const mat1 = {src: './assets/img/vwave/1.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
const mat2 = {src: './assets/img/vwave/2.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
const mat3 = {src: './assets/img/vwave/3.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};
const mat4 = {src: './assets/img/vwave/4.jpg', shader: "flat", color: "#FFFFFF", opacity: 1};

//Tiles

//Kenny
const pattern01 = './assets/img/tiles/kenny/pattern_01.png';
const pattern02 = './assets/img/tiles/kenny/pattern_02.png';
const pattern03 = './assets/img/tiles/kenny/pattern_03.png';
const pattern04 = './assets/img/tiles/kenny/pattern_04.png';
const pattern05 = './assets/img/tiles/kenny/pattern_05.png';
const pattern06 = './assets/img/tiles/kenny/pattern_06.png';
const pattern07 = './assets/img/tiles/kenny/pattern_07.png';
const pattern08 = './assets/img/tiles/kenny/pattern_08.png';
const pattern09 = './assets/img/tiles/kenny/pattern_09.png';
const pattern10 = './assets/img/tiles/kenny/pattern_10.png';
const pattern11 = './assets/img/tiles/kenny/pattern_11.png';
const pattern12 = './assets/img/tiles/kenny/pattern_12.png';
const pattern13 = './assets/img/tiles/kenny/pattern_13.png';
const pattern14 = './assets/img/tiles/kenny/pattern_14.png';
const pattern15 = './assets/img/tiles/kenny/pattern_15.png';
const pattern16 = './assets/img/tiles/kenny/pattern_16.png';
const pattern17 = './assets/img/tiles/kenny/pattern_17.png';
const pattern18 = './assets/img/tiles/kenny/pattern_18.png';
const pattern19 = './assets/img/tiles/kenny/pattern_19.png';
const pattern20 = './assets/img/tiles/kenny/pattern_20.png';
const pattern21 = './assets/img/tiles/kenny/pattern_21.png';
const pattern22 = './assets/img/tiles/kenny/pattern_22.png';
const pattern23 = './assets/img/tiles/kenny/pattern_23.png';
const pattern24 = './assets/img/tiles/kenny/pattern_24.png';
const pattern25 = './assets/img/tiles/kenny/pattern_25.png';
const pattern26 = './assets/img/tiles/kenny/pattern_26.png';
const pattern27 = './assets/img/tiles/kenny/pattern_27.png';
const pattern28 = './assets/img/tiles/kenny/pattern_28.png';
const pattern29 = './assets/img/tiles/kenny/pattern_29.png';
const pattern30 = './assets/img/tiles/kenny/pattern_30.png';
const pattern31 = './assets/img/tiles/kenny/pattern_31.png';
const pattern32 = './assets/img/tiles/kenny/pattern_32.png';
const pattern33 = './assets/img/tiles/kenny/pattern_33.png';
const pattern34 = './assets/img/tiles/kenny/pattern_34.png';
const pattern35 = './assets/img/tiles/kenny/pattern_35.png';
const pattern36 = './assets/img/tiles/kenny/pattern_36.png';
const pattern37 = './assets/img/tiles/kenny/pattern_37.png';
const pattern38 = './assets/img/tiles/kenny/pattern_38.png';
const pattern39 = './assets/img/tiles/kenny/pattern_39.png';
const pattern40 = './assets/img/tiles/kenny/pattern_40.png';
const pattern41 = './assets/img/tiles/kenny/pattern_41.png';
const pattern42 = './assets/img/tiles/kenny/pattern_42.png';
const pattern43 = './assets/img/tiles/kenny/pattern_43.png';
const pattern44 = './assets/img/tiles/kenny/pattern_44.png';
const pattern45 = './assets/img/tiles/kenny/pattern_45.png';
const pattern46 = './assets/img/tiles/kenny/pattern_46.png';
const pattern47 = './assets/img/tiles/kenny/pattern_47.png';
const pattern48 = './assets/img/tiles/kenny/pattern_48.png';
const pattern49 = './assets/img/tiles/kenny/pattern_49.png';
const pattern50 = './assets/img/tiles/kenny/pattern_50.png';
const pattern51 = './assets/img/tiles/kenny/pattern_51.png';
const pattern52 = './assets/img/tiles/kenny/pattern_52.png';
const pattern53 = './assets/img/tiles/kenny/pattern_53.png';
const pattern54 = './assets/img/tiles/kenny/pattern_54.png';
const pattern55 = './assets/img/tiles/kenny/pattern_55.png';
const pattern56 = './assets/img/tiles/kenny/pattern_56.png';
const pattern57 = './assets/img/tiles/kenny/pattern_57.png';
const pattern58 = './assets/img/tiles/kenny/pattern_58.png';
const pattern59 = './assets/img/tiles/kenny/pattern_59.png';
const pattern60 = './assets/img/tiles/kenny/pattern_60.png';
const pattern61 = './assets/img/tiles/kenny/pattern_61.png';
const pattern62 = './assets/img/tiles/kenny/pattern_62.png';
const pattern63 = './assets/img/tiles/kenny/pattern_63.png';
const pattern64 = './assets/img/tiles/kenny/pattern_64.png';
const pattern65 = './assets/img/tiles/kenny/pattern_65.png';
const pattern66 = './assets/img/tiles/kenny/pattern_66.png';
const pattern67 = './assets/img/tiles/kenny/pattern_67.png';
const pattern68 = './assets/img/tiles/kenny/pattern_68.png';
const pattern69 = './assets/img/tiles/kenny/pattern_69.png';
const pattern70 = './assets/img/tiles/kenny/pattern_70.png';
const pattern71 = './assets/img/tiles/kenny/pattern_71.png';
const pattern72 = './assets/img/tiles/kenny/pattern_72.png';
const pattern73 = './assets/img/tiles/kenny/pattern_73.png';
const pattern74 = './assets/img/tiles/kenny/pattern_74.png';
const pattern75 = './assets/img/tiles/kenny/pattern_75.png';
const pattern76 = './assets/img/tiles/kenny/pattern_76.png';
const pattern77 = './assets/img/tiles/kenny/pattern_77.png';
const pattern78 = './assets/img/tiles/kenny/pattern_78.png';
const pattern79 = './assets/img/tiles/kenny/pattern_79.png';
const pattern80 = './assets/img/tiles/kenny/pattern_80.png';
const pattern81 = './assets/img/tiles/kenny/pattern_81.png';
const pattern82 = './assets/img/tiles/kenny/pattern_82.png';
const pattern83 = './assets/img/tiles/kenny/pattern_83.png';
const pattern84 = './assets/img/tiles/kenny/pattern_84.png';

const patterns = [pattern01,pattern02,pattern03,pattern04,pattern05,pattern06,pattern07,pattern08,pattern09,pattern10,pattern11,pattern12,pattern13,pattern14,pattern15,pattern16,pattern17,pattern18,pattern19,pattern20,pattern21,pattern22,pattern23,pattern24,pattern25,pattern26,pattern27,pattern28,pattern29,pattern30,pattern31,pattern32,pattern33,pattern34,pattern35,pattern36,pattern37,pattern38,pattern39,pattern40,pattern41,pattern42,pattern43,pattern44,pattern45,pattern46,pattern47,pattern48,pattern49,pattern50,pattern51,pattern52,pattern53,pattern54,pattern55,pattern56,pattern57,pattern58,pattern59,pattern60,pattern61,pattern62,pattern63,pattern64,pattern65,pattern66,pattern67,pattern68,pattern69,pattern70,pattern71,pattern72,pattern73,pattern74,pattern75,pattern76,pattern77,pattern78,pattern79,pattern80,pattern81,pattern82,pattern83,pattern84];

//
//Animations Library

//360 Rotation
this.animSpinData = {
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
this.animTest1Data = {
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
this.animTest2Data = {
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
this.animTest3Data = {
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
this.animClickData = {
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
this.animStuffData = {
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
//Data Library

//
//Player
//Works with Swap-Controls component which needs to be integrated
this.playerRigData = {
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
//belt:{uiid: 'beltUIParent', controller1id: 'vrController', courserid: 'mouseController',},
//['wasd-controls']:{enabled: true, acceleration: 25},
//['movement-controls']:{enabled: true, controls: 'gamepad, keyboard, touch', speed: 0.3, fly: false, constrainToNavMesh: false, camera: '#camera',},
},};

this.cameraData = {
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

this.cameraUIData = {
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

this.mouseControllerData = {
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

this.vrControllerData = {
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

this.vrControllerUIData = {
data:'VR Controller UI',
id:'vrControllerUI',
sources: false,
text: {value:'Controller UI', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
geometry: {primitive: 'plane', width: 0.25, height: 0.1},
material: {shader: "flat", color: "#ac2d2d", opacity: 0.75, side: 'double'},
position: new THREE.Vector3(-0.15,-0.15,-0.25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.5,0.5,0.5),
animations: false,
mixins: false,
classes: ['a-ent','player'],
components: {visible: 'false',},
};

this.playerFloorData = {
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

this.fadeScreenData = {
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

this.sphereScreenData = {
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

this.blink1ScreenData = {
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

this.blink2ScreenData = {
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

//
//Belt Locomotion UI

//Belt UI
this.beltUIParentData = {
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

//directionForward
//Locomotion Forward UI
this.locomotionForwardUIData = {
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

//directionReverse
//Locomotion Reverse UI
this.locomotionReverseUIData = {
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

//directionBrake1
//Locomotion Brake 1 UI
this.locomotionBrake1UIData = {
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

//directionBrake2
//Locomotion Brake 2 UI
this.locomotionBrake2UIData = {
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

//directionBrake3
//Locomotion Brake 3 UI
this.locomotionBrake3UIData = {
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

//directionBrake4
//Locomotion Brake 4 UI
this.locomotionBrake4UIData = {
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


//
//Teleportation Points

//
//Teleport Parent
this.teleportParentData = {
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
this.teleportConfirmData = {
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
this.teleportCancelData = {
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

//
//Null Parent Template
this.nullParentData = {
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
this.menuBaseData = {
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
//Companion Hamburger Menu Dude Data
this.hamCompData = {
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

//
//Details & Prompt

//Detail Main View
this.detailMainData = {
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
components: {detailprompt:{type: 'detail'}},
};
//Detail Close Button
this.detailCloseData = {
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
//Carousel

//Carousel Main View
this.carouselViewData = {
data: 'Carousel View',
id:'carouselView',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: false,
position: new THREE.Vector3(0,1.5,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Carousel Thumbnail Button Previews
this.carouselButtonData = {
data: 'Carousel Thumbnail',
id:'thumbnail',
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
components: {clickfunc: {clickObj: 'carousel1'}},
};

//
//Text Bubbles

//Scene Text Template
this.sceneTextData = {
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
//Side Text Template
this.textBubbleSideData = {
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
//Bottom Text Template
this.textBubbleBottomData = {
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
//Top Text Template
this.textBubbleTopData = {
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
//
//NPC Text Bubbles
this.npc0TextBubbleData = {
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
this.npc1TextBubbleData = {
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
this.npc2TextBubbleData = {
data:'npc text bubble on top',
id:'npc2TextBubble',
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
this.npcMintyTextBubbleData = {
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
this.npcMintyCubeTextBubbleData = {
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

//
//NPCs Avatars
this.npc0Data = {
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
this.npc1Data = {
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
this.npc2Data = {
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
this.npcMintyCubeData = {
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
this.npcMintyData = {
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
};

//
//NPC Speech Book & Pages

//NPC 0
this.npc0BookTestPage1Data = {
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
this.npc0BookTestData = {
info:{
id:'npc0BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: this.npc0BookTestPage1Data,
},
};
//NPC 1
this.npc1BookTestPage1Data = {
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
this.npc1BookTestData = {
info:{
id:'npc1BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: this.npc1BookTestPage1Data,
},
};
//NPC 2
this.npc2BookTestPage1Data = {
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
this.npc2BookTestData = {
info:{
id:'npc2BookTest',
description:'A basic example of a NPC giving a Key.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: this.npc2BookTestPage1Data,
},
};
//NPC Minty
this.npcMintyBookTestPage1Data = {
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
npcMinty:{Speak:{role: 'Minty', speech:'Some basic UX features that add additional interaction ability and scene functions we have the ability to generate menus, an open/close detailed prompt and carousel image viewer.'}},
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
npcMinty:{Speak:{role: 'Minty', speech:'As well as view images within a Carousel like view controller.'}},
},
timeline47:{
npcMinty:{Speak:{role: 'Minty', speech:'Additionaly, in keeping with the idea of classic 2D sites that utilize a Hamburger Menu to control your website URL switching, you can also add a Hamburger Companion.'}},
},
timeline48:{
npcMinty:{Speak:{role: 'Minty', speech:'The Companion allows the player access to a main menu. They can make setting changes, view info and otherwise assist in experiencing the XR world!'}},
},
timeline49:{
npcMinty:{Speak:{role: 'Minty', speech:'And finally, we have a NPC like Book|Page speech and interaction scripting system.'}},
},
timeline50:{
npcMinty:{Speak:{role: 'Minty', speech:'The NPC like system allows you to define various speech scenarios you can interact with.'}},
},
timeline51:{
npcMinty:{Speak:{role: 'Minty', speech:'The speech system also supports conditionals, flags, menus and jumps to provide a tree like conversation flow.'}},
},
timeline52:{
npcMinty:{Speak:{role: 'Minty', speech:'That is a basic overview of all the current features provided by AUXL v0.1.'}},
},
timeline52:{
npcMinty:{Speak:{role: 'Minty', speech:'Thank you for taking the time to visit and learn!'}},
},
timeline54:{
npcMinty: {ResetBook: true},
},
};
this.npcMintyBookTestData = {
info:{
id:'npcMintyBookTest',
description:'An explainer NPC to show off the AUXL system.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: this.npcMintyBookTestPage1Data,
},
};

//
//Testing

//Testing Object for Interactions and Events
this.eventTestingData = {
data:'Event Testing',
id:'eventTesting',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.75,1.25,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
this.eventTesting2Data = {
data:'Event Testing 2',
id:'eventTesting2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#3999a5", emissive: '#3999a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0.75,1.25,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
this.eventTesting3Data = {
data:'Event Testing 3',
id:'eventTesting3',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: pattern22, repeat: '1 1', color: "#ad482a", emissive: '#ad482a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.25,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
this.eventTesting4Data = {
data:'Event Testing 4',
id:'eventTesting4',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: pattern27, repeat: '1 1', color: "#d2e025", emissive: '#d2e025', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
this.eventTesting5Data = {
data:'Event Testing 5',
id:'eventTesting5',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: pattern33, repeat: '1 1', color: "#25e074", emissive: '#25e074', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.5,-0.25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
//['look-at']:'#camera', 
},
};
//Sound Testing
this.soundTestingData = {
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

//
//Environment

//Lights
//

//Directional - Built-in
this.directionalLightData = {
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
daylight:{property: 'light.intensity', from: 0.1, to: 1.25, dur: aThis.timeInDay/4, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
daypos:{property: 'position', from: new THREE.Vector3(-1,1,-1), to: new THREE.Vector3(1,1,1), dur: aThis.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 1, castShadow: false},
},
};

//Ambient - Built-in
this.ambientLightData = {
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
daylight:{property: 'light.intensity', from: 0.7, to: 0.4, dur: aThis.timeInDay/2, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
daycolor:{property: 'light.color', from: '#99154E', to: '#fffb96', dur: aThis.timeInDay/4, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'ambient', intensity: 1, color: '#716a9a'},
},
};

//Directional 2
this.directionalLight2Data = {
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
nightlight:{property: 'light.intensity', from: 0.3, to: 0.1, dur: aThis.timeInDay/4, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
daypos:{property: 'position', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(-1,1,-1), dur: aThis.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},

},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 0.1, castShadow: false},
},
};

//Directional 3
this.directionalLight3Data = {
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
daylight:{property: 'light.intensity', from: 0.05, to: 0.1, dur: aThis.timeInDay/4, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
daypos:{property: 'position', from: new THREE.Vector3(1,1,-1), to: new THREE.Vector3(-1,1,-1), dur: aThis.timeInDay/2, delay: 0, loop: '1', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise'},
},
mixins: false,
classes: ['a-ent'],
components: {
light: {type: 'directional', intensity: 0.05, castShadow: false},
},
};

//Sun
this.sunOuterData = {
data:'sunOuter',
id:'sunOuter',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-10,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: -5, to: 355, dur: aThis.timeInDay, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
this.sunData = {
data:'sun',
id:'sun',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 30, segments: 32},
material: {shader: "standard", color: "#F0A500", opacity: 1, side: 'front', emissive: '#F0A500', emissiveIntensity: 1, roughness: 0.42},
position: new THREE.Vector3(0,0,-350),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//Moon
this.moonOuterData = {
data:'moonOuter',
id:'moonOuter',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(170,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: 175, to: 535, dur: aThis.timeInDay, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise'},},
mixins: false,
classes: ['a-ent'],
components: false,
};
this.moonData = {
data:'moon',
id:'moon',
sources: false,
text: false,
geometry: {primitive: 'circle', radius: 24, segments: 32},
material: {shader: "standard", color: "#5c2196", opacity: 1, side: 'front', emissive: '#5c2196', emissiveIntensity: 0.75, roughness: 0.42},
position: new THREE.Vector3(0,0,-350),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//Background | Sky
//

//3GradDualSky
this.skyGradData = {
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
sunrisetop:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: aThis.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'},
sunrisemid:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: aThis.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise'}, 
sunsettop:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: aThis.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset'},
sunsetmid:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: aThis.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunset'}, 
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Alpha Stars
this.skyStarAlphaData = {
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

//Floor
//

//Node Floor
this.nodeFloorData = {
data:'full floor',
id:'nodeFloor',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 150, segments: 32, thetaStart: 0, thetaLength: 360},
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
classes: ['a-ent'],
components: false,
};

//Walls
//

//Node Wall
this.nodeWallParentData = {
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
this.nodeWallData = {
data:'node wall',
id:'nodeWall',
sources:false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 20, height: 4},
material: {shader: "standard", src: pattern18, repeat: '10 2.5',color: "#80401f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#80401f", emissiveIntensity: 0.8, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//
//Scene Assets

//flower_purpleA
this.flower_purpleAData = {
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
this.flower_redAData = {
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
this.flower_yellowAData = {
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
this.grass_largeData = {
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
this.grass_leafsLargeData = {
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
this.pineData = {
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
this.pineCrookedData = {
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
this.plant_bushData = {
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
this.plant_bushLargeData = {
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
//rockFormationLarge
this.rockFormationLargeData = {
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
this.rockFormationMediumData = {
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
this.rockFormationSmallData = {
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
//rockLarge
this.rockLargeData = {
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
this.rockMediumData = {
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
};
//rockSmall
this.rockSmallData = {
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
this.shovelDirtData = {
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
this.tree_coneData = {
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
this.tree_defaultData = {
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
this.tree_fatData = {
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
this.tree_oakData = {
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
//tree_palm
this.tree_palmData = {
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
this.tree_palmBendData = {
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
this.tree_palmDetailedShortData = {
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
this.tree_palmDetailedTallData = {
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
//tree_pineDefaultA
this.tree_pineDefaultAData = {
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
this.tree_pineDefaultBData = {
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
this.tree_pineGroundAData = {
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
this.tree_pineGroundBData = {
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
this.tree_pineRoundAData = {
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
this.tree_pineRoundBData = {
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
this.tree_pineRoundCData = {
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
this.tree_pineRoundDData = {
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
this.tree_pineRoundEData = {
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
this.tree_pineRoundFData = {
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
this.tree_pineSmallAData = {
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
this.tree_pineSmallBData = {
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
this.tree_pineSmallCData = {
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
this.tree_pineSmallDData = {
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
//trunk
this.trunkData = {
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
this.trunkLongData = {
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

//
//Scene Object Spawners

//Flowers
this.multiFlowerPurpleAData = {
id: 'multiFlowerPurpleA',
objData: aThis.flower_purpleAData,
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
this.multiFlowerRedAData = {
id: 'multiFlowerRedA',
objData: aThis.flower_redAData,
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
this.multiFlowerYellowAData = {
id: 'multiFlowerYellowA',
objData: aThis.flower_yellowAData,
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
//Grass
this.multiGrassLargeData = {
id: 'multiGrassLarge',
objData: aThis.grass_largeData,
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
this.multiGrassLeafsLargeData = {
id: 'multiGrassLeafsLarge',
objData: aThis.grass_leafsLargeData,
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
//Trees
this.multitree_pineGroundAData = {
id: 'multitree_pineGroundA',
objData: aThis.tree_pineGroundAData,
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
this.multitree_pineGroundBData = {
id: 'multitree_pineGroundB',
objData: aThis.tree_pineGroundBData,
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
this.multitree_pineRoundAData = {
id: 'multitree_pineRoundA',
objData: aThis.tree_pineRoundAData,
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
this.multitree_pineRoundBData = {
id: 'multitree_pineRoundB',
objData: aThis.tree_pineRoundBData,
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
this.multitree_pineRoundCData = {
id: 'multitree_pineRoundC',
objData: aThis.tree_pineRoundCData,
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
this.multitree_pineRoundDData = {
id: 'multitree_pineRoundD',
objData: aThis.tree_pineRoundDData,
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
this.multitree_pineRoundEData = {
id: 'multitree_pineRoundE',
objData: aThis.tree_pineRoundEData,
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
this.multitree_pineRoundFData = {
id: 'multitree_pineRoundF',
objData: aThis.tree_pineRoundFData,
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
this.multitree_pineSmallAData = {
id: 'multitree_pineSmallA',
objData: aThis.tree_pineSmallAData,
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
this.multitree_pineSmallBData = {
id: 'multitree_pineSmallB',
objData: aThis.tree_pineSmallBData,
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
this.multitree_pineSmallCData = {
id: 'multitree_pineSmallC',
objData: aThis.tree_pineSmallCData,
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
this.multitree_pineSmallDData = {
id: 'multitree_pineSmallD',
objData: aThis.tree_pineSmallDData,
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
this.multitrunkData = {
id: 'multitrunk',
objData: aThis.trunkData,
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
this.multitrunkLongData = {
id: 'multitrunkLong',
objData: aThis.trunkLongData,
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
this.multipineData = {
id: 'multipine',
objData: aThis.pineData,
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
this.multipineCrookedData = {
id: 'multipineCrooked',
objData: aThis.pineCrookedData,
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
this.multitree_coneData = {
id: 'multitree_cone',
objData: aThis.tree_coneData,
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
this.multitree_defaultData = {
id: 'multitree_default',
objData: aThis.tree_defaultData,
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
this.multitree_fatData = {
id: 'multitree_fat',
objData: aThis.tree_fatData,
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
this.multitree_oakData = {
id: 'multitree_oak',
objData: aThis.tree_oakData,
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
this.multitree_pineDefaultAData = {
id: 'multitree_pineDefaultA',
objData: aThis.tree_pineDefaultAData,
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
this.multitree_pineDefaultBData = {
id: 'multitree_pineDefaultB',
objData: aThis.tree_pineDefaultBData,
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

//Environmental Basics
//
//Snow Mountains
//Snow Mountains Basic
this.snowMountainsBasicData = {
data:'snowMountainsBasicData',
id:'snowMountainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Multi Snow Mountains Basic
this.multiSnowMountainsBasicData = {
id: 'multiSnowMountainsBasic',
objData: aThis.snowMountainsBasicData,
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
//
//Rainy Forest Basic
this.rainyForestBasicData = {
data:'rainyForestBasicData',
id:'rainyForestBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Multi Forest Basic
this.multiRainyForestBasicData = {
id: 'multiRainyForestBasic',
objData: aThis.rainyForestBasicData,
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
//
//Grassy Hills
//Basic
this.grassyHillsBasicData = {
data:'grassyHillsBasicData',
id:'grassyHillsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Multi
this.multiGrassyHillsBasicData = {
id: 'multiGrassyHillsBasic',
objData: aThis.grassyHillsBasicData,
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
//
//Desert Plains
//Basic
this.desertPlainsBasicData = {
data:'desertPlainsBasicData',
id:'desertPlainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Multi
this.multiDesertPlainsBasicData = {
id: 'multiDesertPlainsBasic',
objData: aThis.desertPlainsBasicData,
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
//
//Ocean Beach
//Basic
this.oceanBeachBasicData = {
data:'oceanBeachBasicData',
id:'oceanBeachBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: pattern15, repeat: '1 1', color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Multi
this.multiOceanBeachBasicData = {
id: 'multiOceanBeachBasic',
objData: aThis.oceanBeachBasicData,
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

//
//Memory Game

//Memory 0
this.memory0Data = {
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
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};

//Memory 1
this.memory1Data = {
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
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};

//Memory 2
this.memory2Data = {
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
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};

//Memory 3
this.memory3Data = {
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
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};

//Memory UI
this.memoryUIData = {
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


//
//World Atlas Map & Node Data

//Floating Island - Connects to all zones
//
//Zone 0
this.zone0Data = {
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
};
//Node 0
this.zone0Node0Data = {
info:{
id:'zone0Node0',
name: 'Floating Island',
description: 'Starting Zone',
sceneText: true,
},
zone:{
},
start:{
HamGirl:{Start: null},
npcMinty:{Spawn:null},
soundTesting:{AddToScene: null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern49, repeat: '50 50',color: "#27693d", emissive: "#27693d",},}},
multiFlowerPurpleA:{genCores: null, SpawnAll: null},
multiFlowerRedA:{genCores: null, SpawnAll: null},
multiFlowerYellowA:{genCores: null, SpawnAll: null},
multiGrassLarge:{genCores: null, SpawnAll: null},
multiGrassLeafsLarge:{genCores: null, SpawnAll: null},
multitree_pineGroundA:{genCores: null, SpawnAll: null},
multitree_pineGroundB:{genCores: null, SpawnAll: null},
multitree_pineRoundA:{genCores: null, SpawnAll: null},
multitree_pineRoundB:{genCores: null, SpawnAll: null},
multitree_pineRoundC:{genCores: null, SpawnAll: null},
multitree_pineRoundD:{genCores: null, SpawnAll: null},
multitree_pineRoundE:{genCores: null, SpawnAll: null},
multitree_pineRoundF:{genCores: null, SpawnAll: null},
multitree_pineSmallA:{genCores: null, SpawnAll: null},
multitree_pineSmallB:{genCores: null, SpawnAll: null},
multitree_pineSmallC:{genCores: null, SpawnAll: null},
multitree_pineSmallD:{genCores: null, SpawnAll: null},
multitrunk:{genCores: null, SpawnAll: null},
multitrunkLong:{genCores: null, SpawnAll: null},
multipine:{genCores: null, SpawnAll: null},
multipineCrooked:{genCores: null, SpawnAll: null},
multitree_cone:{genCores: null, SpawnAll: null},
multitree_default:{genCores: null, SpawnAll: null},
multitree_fat:{genCores: null, SpawnAll: null},
multitree_oak:{genCores: null, SpawnAll: null},
multitree_pineDefaultA:{genCores: null, SpawnAll: null},
multitree_pineDefaultB:{genCores: null, SpawnAll: null},
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
},
map:{
data: this.zone0Data.zone0Node0,
},
};


//Snow Mountains w/Underground Cave
//
//Zone 1
this.zone1Data = {
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
};
//Node 0
this.zone1Node0Data = {
info:{
id:'zone1Node0',
name: 'Snowy Mountains',
description: 'Open Tundra',
sceneText: true,
},
zone:{
},
start:{
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern69, color: "#d6a9ba", emissive: "#d6a9ba",},}},
multiSnowMountainsBasic:{genCores: null, SpawnAll: null},
eventTesting:{AddToScene: null, EnableDetail: 'This is a test detail to read.'},
eventTesting2:{AddToScene: null, EnableDetail: 'This is another test detail to read.'},
eventTesting3:{AddToScene: null,},
eventTesting4:{AddToScene: null,},
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
data: this.zone1Data.zone1Node0,
},
};
//Node 1
this.zone1Node1Data = {
info:{
id:'zone1Node1',
name: 'Mountain Cave',
description: 'Underground Shelter',
sceneText: true,
},
zone:{
},
start:{
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern37, color: "#bc8fa0", emissive: "#bc8fa0",},}},
nodeWalls: {AddAllToScene: null,ChangeAll:{property: 'material', value: {src: pattern81, repeat: '5 1.25', color: "#bc8fa0", emissive: "#bc8fa0",}}},
npc1:{Spawn: null},
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
map:{
data: this.zone1Data.zone1Node1,
},
};

//Rainy Forest
//
//Zone 2
this.zone2Data = {
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
};
//Node 2
this.zone2Node0Data = {
info:{
id:'zone2Node0',
name: 'Rainy Forest',
description: 'Deep Wetlands',
sceneText: true,
},
zone:{
},
start:{
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern24, color: "#228343", emissive: "#228343",},}},
multiRainyForestBasic:{genCores: null, SpawnAll: null},
memory:{SpawnGame: null},
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
data: this.zone2Data.zone2Node0,
},
};

//Grassy Hills w/Cabin House
//
//Zone 3
this.zone3Data = {
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
};
//Node 0
this.zone3Node0Data = {
info:{
id:'zone3Node0',
name: 'Grassy Hills',
description: 'Vast Plains',
sceneText: true,
},
zone:{
},
start:{
npc0:{Spawn: null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern49, color: "#47a868", emissive: "#47a868",},}},
multiGrassyHillsBasic:{genCores: null, SpawnAll: null},
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
map:{
data: this.zone3Data.zone3Node0,
},
};
//Node 1
this.zone3Node1Data = {
info:{
id:'zone3Node1',
name: 'Hill Cabin',
description: 'Farm Shelter',
sceneText: true,
},
zone:{

},
start:{
ifElseCheckForTesting124:{IfElse: {player:{cond: 'testSpeechVar',
ifTrue: {
eventTesting5:{AddToScene: null},
},ifFalse: {
eventTesting4:{AddToScene: null},
},}}
},

nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern50, repeat: '100 100',color: "#763a3a", emissive: "#763a3a",},}},
nodeWalls: {AddAllToScene: null,ChangeAll:{property: 'material', value: {src: pattern18, repeat: '10 2.5', color: "#80401f", emissive: "#80401f",}}},
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
map:{
data: this.zone3Data.zone3Node1,
},
};

//Desert Plains
//
//Zone 4
this.zone4Data = {
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
};
//Node 0
this.zone4Node0Data = {
info:{
id:'zone4Node0',
name: 'Open Desert',
description: 'Dry Plains',
sceneText: true,
},
zone:{
},
start:{
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern58, color: "#c1bd52", emissive: "#c1bd52",},}},
npc2:{Spawn: null},
multiDesertPlainsBasic:{genCores: null, SpawnAll: null},
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
map:{
data: this.zone4Data.zone4Node0,
},
};

//Ocean Beach w/Underwater
//
//Zone 5
this.zone5Data = {
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
};
//Node 0
this.zone5Node0Data = {
info:{
id:'zone5Node0',
name: 'Ocean Beach',
description: 'Rolling Sands',
sceneText: true,
},
zone:{
eventTesting5:{AddToScene: null,},
},
start:{
eventTesting5:{SetFlag:{flag: 'testExitVar', value: true},},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern55, color: "#b4933c", emissive: "#b4933c",},}},
multiOceanBeachBasic:{genCores: null, SpawnAll: null},
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
eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},
},
map:{
data: this.zone5Data.zone5Node0,
},
};
//Node 1
this.zone5Node1Data = {
info:{
id:'zone5Node1',
name: 'Underwater',
description: 'Submerged',
sceneText: true,
},
zone:{

},
start:{
eventTesting5:{SetFlag:{flag: 'testExitVar', value: false},},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: pattern83, color: "#3c86b4", emissive: "#3c86b4",},}},
nodeWalls: {AddAllToScene: null,ChangeAll:{property: 'material', value: {src: pattern80, repeat: '5 1.25', color: "#3c86b4", emissive: "#3c86b4",}}},
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
eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},
},
map:{
data: this.zone5Data.zone5Node1,
},
};


// Core, Layer & Aux Library
/********************************************************************/
//

//
//Player
this.playerRig = Core(this.playerRigData);
this.camera = Core(this.cameraData);
this.cameraUI = Core(this.cameraUIData);
this.mouseController = Core(this.mouseControllerData);
this.vrController = Core(this.vrControllerData);
this.vrControllerUI = Core(this.vrControllerUIData);
this.playerFloor = Core(this.playerFloorData);
this.fadeScreen = Core(this.fadeScreenData);
this.sphereScreen = Core(this.sphereScreenData);
this.blink1Screen = Core(this.blink1ScreenData);
this.blink2Screen = Core(this.blink2ScreenData);
this.playerAll = {
parent: {core: this.playerRig},
child0: {
	parent: {core: this.camera},
	child0: {core: this.mouseController},
	child1: {core: this.cameraUI},
	child2: {core: this.fadeScreen},
	child3: {core: this.sphereScreen},
	child4: {core: this.blink1Screen},
	child5: {core: this.blink2Screen},
},
child1: {
	parent: {core: this.vrController},
	child0: {core: this.vrControllerUI},
},
child2: {core: this.playerFloor},
}
//SPECIAL : Player Base and Child Camera entity are already in HTML and Layer has special exceptions for it
this.playerLayer = Layer('playerLayer', this.playerAll);
//Main User Player
this.player = Player(this.playerLayer);

//
//Locomotion UI
this.beltUIParent = Core(this.beltUIParentData);
this.locomotionForwardUI = Core(this.locomotionForwardUIData);
this.locomotionReverseUI = Core(this.locomotionReverseUIData);
this.locomotionBrake1UI = Core(this.locomotionBrake1UIData);
this.locomotionBrake2UI = Core(this.locomotionBrake2UIData);
this.locomotionBrake3UI = Core(this.locomotionBrake3UIData);
this.locomotionBrake4UI = Core(this.locomotionBrake4UIData);
this.locomotionUIAllData = {
	parent: {core: this.beltUIParent},
	child0: {core: this.locomotionForwardUI},
	child1: {core: this.locomotionReverseUI},
	child2: {core: this.locomotionBrake1UI},
	child3: {core: this.locomotionBrake2UI},
	child4: {core: this.locomotionBrake3UI},
	child5: {core: this.locomotionBrake4UI},
}
this.locomotionUILayer = Layer('locomotionUILayer', this.locomotionUIAllData);

//
//Teleportation Points

//Origin
let tele0Color = colorsHexGen().base;
this.teleportParentData.id = 'teleportOriginParent';
this.teleportParentData.position = new THREE.Vector3(0,0.025,0);
this.teleportOriginParent = Core(this.teleportParentData);
this.teleportConfirmData.id = 'teleportOriginConfirm';
this.teleportConfirmData.material.color = tele0Color;
this.teleportConfirmData.material.emissive = tele0Color;
this.teleportOriginConfirm = Core(this.teleportConfirmData);
this.teleportCancelData.id = 'teleportOriginCancel';
this.teleportCancelData.material.color = tele0Color.compl;
this.teleportCancelData.material.emissive = tele0Color.compl;
this.teleportOriginCancel = Core(this.teleportCancelData);
this.teleportOriginData = {
	parent: {core: this.teleportOriginParent},
	child0: {core: this.teleportOriginConfirm},
	child1: {core: this.teleportOriginCancel},
}
this.teleportOriginLayer = Layer('teleportOriginLayer', this.teleportOriginData);
//1
let tele1Color = colorsHexGen().base;
this.teleportParentData.id = 'teleport1Parent';
this.teleportParentData.position = new THREE.Vector3(-5,0.025,-5);
this.teleport1Parent = Core(this.teleportParentData);
this.teleportConfirmData.id = 'teleport1Confirm';
this.teleportConfirmData.material.color = tele1Color;
this.teleportConfirmData.material.emissive = tele1Color;
this.teleport1Confirm = Core(this.teleportConfirmData);
this.teleportCancelData.id = 'teleport1Cancel';
this.teleportCancelData.material.color = tele1Color.compl;
this.teleportCancelData.material.emissive = tele1Color.compl;
this.teleport1Cancel = Core(this.teleportCancelData);
this.teleport1Data = {
	parent: {core: this.teleport1Parent},
	child0: {core: this.teleport1Confirm},
	child1: {core: this.teleport1Cancel},
}
this.teleport1Layer = Layer('teleport1Layer', this.teleport1Data);
//2
let tele2Color = colorsHexGen().base;
this.teleportParentData.id = 'teleport2Parent';
this.teleportParentData.position = new THREE.Vector3(-5,0.025,5);
this.teleport2Parent = Core(this.teleportParentData);
this.teleportConfirmData.id = 'teleport2Confirm';
this.teleportConfirmData.material.color = tele2Color;
this.teleportConfirmData.material.emissive = tele2Color;
this.teleport2Confirm = Core(this.teleportConfirmData);
this.teleportCancelData.id = 'teleport2Cancel';
this.teleportCancelData.material.color = tele2Color.compl;
this.teleportCancelData.material.emissive = tele2Color.compl;
this.teleport2Cancel = Core(this.teleportCancelData);
this.teleport2Data = {
	parent: {core: this.teleport2Parent},
	child0: {core: this.teleport2Confirm},
	child1: {core: this.teleport2Cancel},
}
this.teleport2Layer = Layer('teleport1Layer', this.teleport2Data);
//3
let tele3Color = colorsHexGen().base;
this.teleportParentData.id = 'teleport3Parent';
this.teleportParentData.position = new THREE.Vector3(5,0.025,-5);
this.teleport3Parent = Core(this.teleportParentData);
this.teleportConfirmData.id = 'teleport3Confirm';
this.teleportConfirmData.material.color = tele3Color;
this.teleportConfirmData.material.emissive = tele3Color;
this.teleport3Confirm = Core(this.teleportConfirmData);
this.teleportCancelData.id = 'teleport3Cancel';
this.teleportCancelData.material.color = tele3Color.compl;
this.teleportCancelData.material.emissive = tele3Color.compl;
this.teleport3Cancel = Core(this.teleportCancelData);
this.teleport3Data = {
	parent: {core: this.teleport3Parent},
	child0: {core: this.teleport3Confirm},
	child1: {core: this.teleport3Cancel},
}
this.teleport3Layer = Layer('teleport1Layer', this.teleport3Data);
//4
let tele4Color = colorsHexGen().base;
this.teleportParentData.id = 'teleport4Parent';
this.teleportParentData.position = new THREE.Vector3(5,0.025,5);
this.teleport4Parent = Core(this.teleportParentData);
this.teleportConfirmData.id = 'teleport4Confirm';
this.teleportConfirmData.material.color = tele4Color;
this.teleportConfirmData.material.emissive = tele4Color;
this.teleport4Confirm = Core(this.teleportConfirmData);
this.teleportCancelData.id = 'teleport4Cancel';
this.teleportCancelData.material.color = tele4Color.compl;
this.teleportCancelData.material.emissive = tele4Color.compl;
this.teleport4Cancel = Core(this.teleportCancelData);
this.teleport4Data = {
	parent: {core: this.teleport4Parent},
	child0: {core: this.teleport4Confirm},
	child1: {core: this.teleport4Cancel},
}
this.teleport4Layer = Layer('teleport4Layer', this.teleport4Data);

//
//Hamburger Menu Companion
this.hamComp = Core(this.hamCompData);
this.HamGirl = HamMenu('HamGirl',this.hamComp);

//
//Speech System TextBubble
this.textBubbleSide = Core(this.textBubbleSideData);
this.textBubbleBottom = Core(this.textBubbleBottomData);
this.textBubbleTop = Core(this.textBubbleTopData);

//
//NPCs
this.npc0Core = Core(this.npc0Data);
this.npc0TextBubble = Core(this.npc0TextBubbleData);
this.npc0 = NPC(this.npc0Core, this.npc0BookTestData, this.npc0TextBubble);

this.npc1Core = Core(this.npc1Data);
this.npc1TextBubble = Core(this.npc1TextBubbleData);
this.npc1 = NPC(this.npc1Core, this.npc1BookTestData, this.npc1TextBubble);

this.npc2Core = Core(this.npc2Data);
this.npc2TextBubble = Core(this.npc2TextBubbleData);
this.npc2 = NPC(this.npc2Core, this.npc2BookTestData, this.npc2TextBubble);

//Minty|Overview
//this.npcMintyCore = Core(this.npcMintyData);
this.npcMintyCore = Core(this.npcMintyCubeData);
this.npcMintyTextBubble = Core(this.npcMintyCubeTextBubbleData);
this.npcMinty = NPC(this.npcMintyCore, this.npcMintyBookTestData, this.npcMintyTextBubble);

//
//Scripted Events Testing Object
this.eventTesting = Core(this.eventTestingData);
this.eventTesting2 = Core(this.eventTesting2Data);
this.eventTesting3 = Core(this.eventTesting3Data);
this.eventTesting4 = Core(this.eventTesting4Data);
this.eventTesting5 = Core(this.eventTesting5Data);

//Sound Testing
this.soundTesting = Core(this.soundTestingData);

//
//Environment

//Lights
this.directionalLight = Core(this.directionalLightData);
this.directionalLight2 = Core(this.directionalLight2Data);
this.directionalLight3 = Core(this.directionalLight3Data);
this.ambientLight = Core(this.ambientLightData);

//Sun
this.sunOuter = Core(this.sunOuterData);
this.sun = Core(this.sunData);
this.sunLayerData = {
parent: {core: this.sunOuter},
child0: {core: this.sun},
}
this.sunLayer = Layer('sunLayer', this.sunLayerData);
//Moon
this.moonOuter = Core(this.moonOuterData);
this.moon = Core(this.moonData);
this.moonLayerData = {
parent: {core: this.moonOuter},
child0: {core: this.moon},
}
this.moonLayer = Layer('moonLayer', this.moonLayerData);

//3Grad Dual Sky
this.skyGrad = Core(this.skyGradData);

//Node Floor
this.nodeFloor = Core(this.nodeFloorData);

//Node Walls
this.nodeWallParent = Core(this.nodeWallParentData);
this.nodeWallData.id = 'nodeWall1';
this.nodeWallData.position = new THREE.Vector3(0,0,-10);
this.nodeWall1 = Core(this.nodeWallData);
this.nodeWallData.id = 'nodeWall2';
this.nodeWallData.position = new THREE.Vector3(0,0,10);
this.nodeWall2 = Core(this.nodeWallData);
this.nodeWallData.id = 'nodeWall3';
this.nodeWallData.position = new THREE.Vector3(-10,0,0);
this.nodeWallData.rotation = new THREE.Vector3(0,90,0);
this.nodeWall3 = Core(this.nodeWallData);
this.nodeWallData.id = 'nodeWall4';
this.nodeWallData.position = new THREE.Vector3(10,0,0);
this.nodeWall4 = Core(this.nodeWallData);
this.nodeWallsData = {
parent: {core: this.nodeWallParent}, 
child0: {core: this.nodeWall1}, 
child1: {core: this.nodeWall2},
child2: {core: this.nodeWall3},
child3: {core: this.nodeWall4},}
this.nodeWalls = Layer('nodeWalls',this.nodeWallsData);

//Environment Basics
this.multiSnowMountainsBasic = ObjsGenRing(this.multiSnowMountainsBasicData);
this.multiRainyForestBasic = ObjsGenRing(this.multiRainyForestBasicData);
this.multiGrassyHillsBasic = ObjsGenRing(this.multiGrassyHillsBasicData);
this.multiDesertPlainsBasic = ObjsGenRing(this.multiDesertPlainsBasicData);
this.multiOceanBeachBasic = ObjsGenRing(this.multiOceanBeachBasicData);

//Forest Multi
this.multiFlowerPurpleA = ObjsGenRing(this.multiFlowerPurpleAData);
this.multiFlowerRedA = ObjsGenRing(this.multiFlowerRedAData);
this.multiFlowerYellowA = ObjsGenRing(this.multiFlowerYellowAData);
this.multiGrassLarge = ObjsGenRing(this.multiGrassLargeData);
this.multiGrassLeafsLarge = ObjsGenRing(this.multiGrassLeafsLargeData);
this.multitree_pineGroundA = ObjsGenRing(this.multitree_pineGroundAData);
this.multitree_pineGroundB = ObjsGenRing(this.multitree_pineGroundBData);
this.multitree_pineRoundA = ObjsGenRing(this.multitree_pineRoundAData);
this.multitree_pineRoundB = ObjsGenRing(this.multitree_pineRoundBData);
this.multitree_pineRoundC = ObjsGenRing(this.multitree_pineRoundCData);
this.multitree_pineRoundD = ObjsGenRing(this.multitree_pineRoundDData);
this.multitree_pineRoundE = ObjsGenRing(this.multitree_pineRoundEData);
this.multitree_pineRoundF = ObjsGenRing(this.multitree_pineRoundFData);
this.multitree_pineSmallA = ObjsGenRing(this.multitree_pineSmallAData);
this.multitree_pineSmallB = ObjsGenRing(this.multitree_pineSmallBData);
this.multitree_pineSmallC = ObjsGenRing(this.multitree_pineSmallCData);
this.multitree_pineSmallD = ObjsGenRing(this.multitree_pineSmallDData);
this.multitrunk = ObjsGenRing(this.multitrunkData);
this.multitrunkLong = ObjsGenRing(this.multitrunkLongData);
this.multipine = ObjsGenRing(this.multipineData);
this.multipineCrooked = ObjsGenRing(this.multipineCrookedData);
this.multitree_cone = ObjsGenRing(this.multitree_coneData);
this.multitree_default = ObjsGenRing(this.multitree_defaultData);
this.multitree_fat = ObjsGenRing(this.multitree_fatData);
this.multitree_oak = ObjsGenRing(this.multitree_oakData);
this.multitree_pineDefaultA = ObjsGenRing(this.multitree_pineDefaultAData);
this.multitree_pineDefaultB = ObjsGenRing(this.multitree_pineDefaultBData);

//Forest
/*
this.flower_purpleA = Core(this.flower_purpleAData);
this.flower_redA = Core(this.flower_redAData);
this.flower_yellowA = Core(this.flower_yellowAData);
this.grass_large = Core(this.grass_largeData);
this.grass_leafsLarge = Core(this.grass_leafsLargeData);
this.pine = Core(this.pineData);
this.pineCrooked = Core(this.pineCrookedData);
this.plant_bush = Core(this.plant_bushData);
this.plant_bushLarge = Core(this.plant_bushLargeData);
this.rockFormationLarge = Core(this.rockFormationLargeData);
this.rockFormationMedium = Core(this.rockFormationMediumData);
this.rockFormationSmall = Core(this.rockFormationSmallData);
this.rockLarge = Core(this.rockLargeData);
this.rockMedium = Core(this.rockMediumData);
this.rockSmall = Core(this.rockSmallData);
this.shovelDirt = Core(this.shovelDirtData);
this.tree_cone = Core(this.tree_coneData);
this.tree_default = Core(this.tree_defaultData);
this.tree_fat = Core(this.tree_fatData);
this.tree_oak = Core(this.tree_oakData);
this.tree_palm = Core(this.tree_palmData);
this.tree_palmBend = Core(this.tree_palmBendData);
this.tree_palmDetailedShort = Core(this.tree_palmDetailedShortData);
this.tree_palmDetailedTall = Core(this.tree_palmDetailedTallData);
this.tree_pineDefaultA = Core(this.tree_pineDefaultAData);
this.tree_pineDefaultB = Core(this.tree_pineDefaultBData);
this.tree_pineGroundA = Core(this.tree_pineGroundAData);
this.tree_pineGroundB = Core(this.tree_pineGroundBData);
this.tree_pineRoundA = Core(this.tree_pineRoundAData);
this.tree_pineRoundB = Core(this.tree_pineRoundBData);
this.tree_pineRoundC = Core(this.tree_pineRoundCData);
this.tree_pineRoundD = Core(this.tree_pineRoundDData);
this.tree_pineRoundE = Core(this.tree_pineRoundEData);
this.tree_pineRoundF = Core(this.tree_pineRoundFData);
this.tree_pineSmallA = Core(this.tree_pineSmallAData);
this.tree_pineSmallB = Core(this.tree_pineSmallBData);
this.tree_pineSmallC = Core(this.tree_pineSmallCData);
this.tree_pineSmallD = Core(this.tree_pineSmallDData);
this.trunk = Core(this.trunkData);
this.trunkLong = Core(this.trunkLongData);
*/

//
//Memory
this.memory = MemoryGame(this.memory0Data,this.memory1Data,this.memory2Data,this.memory3Data,);

//
//World Atlas & Map
//Define at end of Init to ensure all objects are ready

//
//Environmental Globals
this.directionalLight.AddToScene(false, false, true);
this.directionalLight2.AddToScene(false, false, true);
this.directionalLight3.AddToScene(false, false, true);
this.ambientLight.AddToScene(false, false, true);
this.skyGrad.AddToScene(false, false, true);
this.sunLayer.AddAllToScene(true);
this.moonLayer.AddAllToScene(true);
this.nodeFloor.AddToScene(false, false, true);

//Teleportation Points
this.teleportOriginLayer.AddAllToScene(true);
this.teleport1Layer.AddAllToScene(true);
this.teleport2Layer.AddAllToScene(true);
this.teleport3Layer.AddAllToScene(true);
this.teleport4Layer.AddAllToScene(true);

//Floating Island - Connects to all zones
//Zone 0
//
//Node 0
this.zone0Node0 = SceneNode(this.zone0Node0Data);
//Map Zone 0
this.zone0 = MapZone(this.zone0Data);

//Snow Mountains w/Underground Cave
//Zone 1
//
//Node 0
this.zone1Node0 = SceneNode(this.zone1Node0Data);
//Node 1
this.zone1Node1 = SceneNode(this.zone1Node1Data);
//Map Zone 1
this.zone1 = MapZone(this.zone1Data);

//Rainy Forest
//Zone 2
//
//Node 0
this.zone2Node0 = SceneNode(this.zone2Node0Data);
//Map Zone 2
this.zone2 = MapZone(this.zone2Data);

//Grassy Hills w/Cabin House
//Zone 3
//
//Node 0
this.zone3Node0 = SceneNode(this.zone3Node0Data);
//Node 1
this.zone3Node1 = SceneNode(this.zone3Node1Data);
//Map Zone 3
this.zone3 = MapZone(this.zone3Data);

//Desert Plains
//Zone 4
//
//Node 0
this.zone4Node0 = SceneNode(this.zone4Node0Data);
//Map Zone 4
this.zone4 = MapZone(this.zone4Data);

//Ocean Beach w/Underwater
//Zone 5
//
//Node 0
this.zone5Node0 = SceneNode(this.zone5Node0Data);
//Node 1
this.zone5Node1 = SceneNode(this.zone5Node1Data);
//Map Zone 5
this.zone5 = MapZone(this.zone5Data);

},//Init


});//End of AUXL

//
//Dev - Detect Inputs
AFRAME.registerComponent('detect-inputs', {
//schema: {
	//bar: {type: 'number'},
	//baz: {type: 'string'}
//},

init: function () {
//Do something when component first attached.
//Called once when the component is initialized. Used to set up initial state and instantiate variables.

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
//Left Controller
this.el.addEventListener('thumbstickmoved', function (e) {
	if (e.detail.y > 0.95) { 
		updateInput('down')
	}
	if (e.detail.y < -0.95) { 
		updateInput('up')
	}
	if (e.detail.x < -0.95) { 
		updateInput('left')
	}
	if (e.detail.x > 0.95) { 
		updateInput('right')
	}
});



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

//
//Locomotion Belt
AFRAME.registerComponent('belt', {
	//dependencies: ['auxl'],
    schema: {
        uiid: {type: 'string', default: 'ui'},
        controller1id: {type: 'string', default: 'controller1'},
        controller2id: {type: 'string', default: 'controller2'},
		courserid: {type: 'string', default: 'mouseCursor'},
		movetype: {type: 'string', default: 'vr'},
    },

init: function () {
	//Do something when component first attached.
	//this.auxl = document.querySelector('a-scene').systems.auxl;

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
	let directionForward;
	let directionReverse;
	let directionBrake1;
	let directionBrake2;
	let directionBrake3;
	let directionBrake4;
	if(this.movetype === 'vr'){
		directionForward = document.getElementById('locomotionForwardUI');
		directionReverse = document.getElementById('locomotionReverseUI');
		directionBrake1 = document.getElementById('locomotionBrake1UI');
		directionBrake2 = document.getElementById('locomotionBrake2UI');
		directionBrake3 = document.getElementById('locomotionBrake3UI');
		directionBrake4 = document.getElementById('locomotionBrake4UI');
	}

	//HTML Controller Support
	const htmlUp = document.getElementById('up');
	const htmlLeft = document.getElementById('left');
	const htmlRight = document.getElementById('right');
	const htmlDown = document.getElementById('down');

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

	//Belt Controller Event Listeners
	//
	if(this.movetype === 'vr'){
		//directionForward
		directionForward.addEventListener('mouseenter', function(){
			if(moveTo){}else{
				moveTo = true;
			}
		});
		directionForward.addEventListener('mouseleave', function(){
			if(moveTo){
				moveTo = false;
			}
		});
		//directionReverse
		directionReverse.addEventListener('mouseenter', function(){
			if(moveBack){}else{
				moveBack = true;
			}
		});
		directionReverse.addEventListener('mouseleave', function(){
			if(moveBack){
				moveBack = false;
			}
		});
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
						directionBrake1.setAttribute('material', {color: 'red'});
						directionBrake2.setAttribute('material', {color: 'red'});
						directionBrake3.setAttribute('material', {color: 'red'});
						directionBrake4.setAttribute('material', {color: 'red'});
						//anim positition for forward/reverse bar and brakes
						directionForward.emit('brakeOn',{});
						directionReverse.emit('brakeOn',{});
						directionBrake1.emit('brakeOn',{});
						directionBrake2.emit('brakeOn',{});
						directionBrake3.emit('brakeOn',{});
						directionBrake4.emit('brakeOn',{});
					} else {
						//Set reset switch toggle
						brakeToggle = true;
						//Set reset timer switch toggle
						brakeReady = false;
						//Brake Off
						moveBrake = false;
						//set brake color to default
						directionBrake1.setAttribute('material', {color: 'black'});
						directionBrake2.setAttribute('material', {color: 'black'});
						directionBrake3.setAttribute('material', {color: 'black'});
						directionBrake4.setAttribute('material', {color: 'black'});
						//anim positition for forward/reverse bar back to default
						directionForward.emit('brakeOff',{});
						directionReverse.emit('brakeOff',{});
						directionBrake1.emit('brakeOff',{});
						directionBrake2.emit('brakeOff',{});
						directionBrake3.emit('brakeOff',{});
						directionBrake4.emit('brakeOff',{});
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
	}


	//Keyboard Controller Event Listeners
	//
	//Key Down - WASD | QE
	document.body.addEventListener('keydown', function (e) {
		if (e.key === 'w' || e.key === 'W') {
			//Start moving player
			//console.log('up');
			if(moveTo){}else{
				moveTo = true;
			}
		} else if (e.key === 'a' || e.key === 'A') {
			//Start moving player
			//console.log('left');
			if(moveLeft){}else{
				moveLeft = true;
			}
		} else if (e.key === 's' || e.key === 'S') {
			//Start moving player
			//console.log('down');
			if(moveBack){}else{
				moveBack = true;
			}
		} else if (e.key === 'd' || e.key === 'D') {
			//Start moving player
			//console.log('right');
			if(moveRight){}else{
				moveRight = true;
			}
		} else if (e.key === 'q' || e.key === 'Q') {
			//Start moving player
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Start moving player
			//console.log('button 2');
		}
	});
	//Key Down - WASD | QE
	document.body.addEventListener('keyup', function (e) {
		if (e.key === 'w' || e.key === 'W') {
			//Start moving player
			//console.log('up');
			if(moveTo){
				moveTo = false;
			}
		} else if (e.key === 'a' || e.key === 'A') {
			//Start moving player
			//console.log('left');
			if(moveLeft){
				moveLeft = false;
			}
		} else if (e.key === 's' || e.key === 'S') {
			//Start moving player
			//console.log('down');
			if(moveBack){
				moveBack = false;
			}
		} else if (e.key === 'd' || e.key === 'D') {
			//Start moving player
			//console.log('right');
			if(moveRight){
				moveRight = false;
			}
		} else if (e.key === 'q' || e.key === 'Q') {
			//Start moving player
			//console.log('button 1');
		} else if (e.key === 'e' || e.key === 'E') {
			//Start moving player
			//console.log('button 2');
		}
	});

	//HTML Controller Event Listeners
	//
	//Mouse Down
	htmlUp.addEventListener('mousedown', function(){
		if(moveTo){}else{
			moveTo = true;
		}
	});
	htmlLeft.addEventListener('mousedown', function(){
		if(moveLeft){}else{
			moveLeft = true;
		}
	});
	htmlRight.addEventListener('mousedown', function(){
		if(moveRight){}else{
			moveRight = true;
		}
	});
	htmlDown.addEventListener('mousedown', function(){
		if(moveBack){}else{
			moveBack = true;
		}
	});
	//Mouse Up
	htmlUp.addEventListener('mouseup', function(){
		if(moveTo){
			moveTo = false;
		}
	});
	htmlLeft.addEventListener('mouseup', function(){
		if(moveLeft){
			moveLeft = false;
		}
	});
	htmlRight.addEventListener('mouseup', function(){
		if(moveRight){
			moveRight = false;
		}
	});
	htmlDown.addEventListener('mouseup', function(){
		if(moveBack){
			moveBack = false;
		}
	});

//End Init
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
	//AUXL
	const aThis = document.querySelector('a-scene').systems.auxl;
	//Scene
	var sceneEl = document.querySelector('a-scene');
	//This element
	let element = this.el;
	//Player Rig 
	let user = document.getElementById('playerRig');
	//User View
	let userView = document.getElementById('camera');

	//current Teleportation methods
	//instant
	//fade
	//locomotion - NEEDS TO BE ADDED TO AUXL MENUS
	//sphere
	//blink
	let teleportType = aThis.player.layer.transition;

	//Support
	//let timeout;
	let posTimeout;
	let timeout2;
	let teleportPos;
	let userPos;
	let newPosition;
	let allTeleportors;
	let userPov;
	let rotationParams;

	//Spawn Function
	function playerTeleportAnim(){
		if(aThis.player.layer.transition === 'blink'){
			aThis.player.TempDisableClick();
			aThis.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
			aThis.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
			aThis.blink1Screen.EmitEvent('blink');
			aThis.blink2Screen.EmitEvent('blink');
			timeout2 = setTimeout(function () {
				aThis.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
				aThis.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
				clearTimeout(timeout2);
			}, 1200);
		} else if (aThis.player.layer.transition === 'fade'){
			aThis.player.TempDisableClick();
			aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
			aThis.fadeScreen.EmitEvent('fade');
			timeout2 = setTimeout(function () {
				aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
				clearTimeout(timeout2);
			}, 1200);
		} else if (aThis.player.layer.transition === 'sphere'){
			aThis.player.TempDisableClick();
			aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
			aThis.sphereScreen.EmitEvent('sphere');
			timeout2 = setTimeout(function () {
				aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
				clearTimeout(timeout2);
			}, 1200);
		} else if (aThis.player.layer.transition === 'instant'){}
	}

	//Reset Teleportation Circles
	function resetTeleCircles(){
		allTeleportors = document.querySelectorAll('.teleporter');
		for (let i= 0; i < allTeleportors.length; i++){
			if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
				allTeleportors[i].emit('resetInstant',{});
				allTeleportors[i].nextSibling.emit('resetInstant',{});
			}
		}
	}

	//Prep Movement
	function prepMove(){
		//Do an reset on element to not interfer with anim
		element.emit('reset',{});//select circle
		element.nextSibling.emit('reset',{});//cancel circle
		//Clone current entity's position User
		newPosition.copy(teleportPos);
		//Reset User's Y back to 0 - Flat Mode
		newPosition.y = 0;
	}

	//Initialize 
	if (element.classList.contains('teleport')) {
		active = false; //is the button active for teleport
		//Set parent wrapper's active status
		element.parentNode.setAttribute('active', 'false');

	} else if (element.classList.contains('cancel')) {
		active = true; //is the button active for cancel
		element.classList.toggle('clickable', false);
		//Set parent wrapper's active status
		element.parentNode.setAttribute('active', 'false');
	}
	//Reset Event
	this.el.addEventListener('reset', function() {
		if (element.classList.contains('teleport')) {
			active = false; //is the button active for teleport
			//Reset parent wrapper's active status
			element.parentNode.setAttribute('active', 'false');
		} else if (element.classList.contains('cancel')) {
			active = true; //is the button active for cancel
			element.classList.toggle('clickable', false);
			//Reset parent wrapper's active status
			element.parentNode.setAttribute('active', 'false');
		}
	});
	//Reset Instant Event
	this.el.addEventListener('resetInstant', function() {
		if (element.classList.contains('teleport')) {
			active = false; //is the button active for teleport
			//Reset parent wrapper's active status
			element.parentNode.setAttribute('active', 'false');
		} else if (element.classList.contains('cancel')) {
			active = true; //is the button active for cancel
			element.classList.toggle('clickable', false);
			//Reset parent wrapper's active status
			element.parentNode.setAttribute('active', 'false');
		}
	});

	//Listen for Click to teleport
	this.el.addEventListener('click', function(){
		if(element.parentNode.getAttribute('active') === 'false') {
			//default state
			//Allow cancel circle to be viewable and clickable
			element.nextSibling.classList.toggle('clickable', true);
			element.nextSibling.emit('click1',{});
			//Set rotation anim for select circle
			userPov = userView.getAttribute('rotation');
			rotationParams = {
				property: 'object3D.rotation.y',
				to: userPov.y,
				dur: 500,
				delay: 0,
				loop: 'false',
				dir: 'normal',
				easing:'easeInOutSine',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			element.parentNode.setAttribute('animation__rotateToUser', rotationParams);
			//if clicked once and activated, setAttribute that be checked for reset
			element.parentNode.setAttribute('active', 'true');
		} else {
			//circle1 and circle2 are ready to be clicked
			//if circle1 was selected, teleport user and reset properties
			//if circle2 was selcted, reset properties
			if (element.classList.contains('teleport')) {
				teleportPos = element.parentNode.getAttribute('position');
				userPos = user.getAttribute('position');
				newPosition = new THREE.Vector3();

				//Teleportation Type
				if (teleportType === 'instant') {
					resetTeleCircles();
					prepMove();
					posTimeout = setTimeout(function () {
						user.object3D.position.copy(newPosition);
					}, 150);
				} else if (teleportType === 'fade') {
					playerTeleportAnim();
					prepMove();
					posTimeout = setTimeout(function () {
						resetTeleCircles();
						user.object3D.position.copy(newPosition);
					}, 1050);
				} else if (teleportType === 'locomotion') {
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
				} else if (teleportType === 'sphere') {
					playerTeleportAnim();
					prepMove();
					posTimeout = setTimeout(function () {
						resetTeleCircles();
						user.object3D.position.copy(newPosition);
					}, 1000); //Delay
				} else if (teleportType === 'blink') {
					playerTeleportAnim();
					prepMove();
					posTimeout = setTimeout(function () {
						resetTeleCircles();
						user.object3D.position.copy(newPosition);
					}, 800); //Delay
				}

			} else if (element.classList.contains('cancel')) {
				element.emit('reset',{});
			}

		}
	});
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