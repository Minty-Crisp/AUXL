//
//AUXL : A-Frame UX Library
//v0.1 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//
//A-Frame UX Library
AFRAME.registerSystem('auxl', {
//schema: {
	//bar: {type: 'number'},
	//style: {type: 'string', default: 'random'}
//},

init: function () {

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
let playerRig;
let camera;
let cameraUI;
let playerFloor;
let mouseController;
let vrController;
let vrControllerUI;

//Core, Layer & Aux currently spawned in scene.
this.spawned = {};
this.zoneSpawned = {};
this.nodeSpawned = {};
this.menuSpawned = {};
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
//this.menus = {};
//this.npcs = {};
//this.carousels = {};

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
		startButton.innerHTML = 'Resume'
		aThis.zone0.StartScene();
		updateControls();
		aThis.expStarted = true;
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
	vrController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'true', useWorldCoordinates: 'false'});
	//vrController cursor property
	vrController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController', mouseCursorStylesEnabled: 'true'});
	//vrController laser-controls property
	vrController.setAttribute('laser-controls',{hand: 'right'});
	//Update Controls
	aThis.controls = 'VR';
	//menuModeButton.innerHTML = 'Mode : VR'
}
//Desktop
function disableDesktopControls(){
	//Disable Desktop Controls
	//Remove Desktop WASD Controls
	playerRig.removeAttribute('wasd-controls');
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
	playerRig.setAttribute('wasd-controls',{enabled: 'true', acceleration: 25});
	//Set mouseController to invisible
	mouseController.setAttribute('visible',true);
	//Set mouseController raycaster to false
	mouseController.setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	//Remove cursor attribute
	mouseController.setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	//Update Controls
	aThis.controls = 'Desktop';
	//menuModeButton.innerHTML = 'Mode : Desktop'
}
//Mobile
function disableMobileControls(){

}
function enableMobileControls(){

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
		menuModeButton.innerHTML = 'Mode : VR'
	} else if(aThis.controls === 'Mobile'){
		//Implement Mobile Controls
	} else if(aThis.controls === 'VR'){
		aThis.controls = 'Desktop';
		menuModeButton.innerHTML = 'Mode : Desktop'
	}
	if(aThis.expStarted){
		updateControls();
	}
}
menuModeButton.addEventListener('click', changeControls);

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
			return core.el;
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

	const GetChild = (child) => {

		//return specific child to access their indv change/animate/remove funcs

	}

	return {layer, AddAllToScene, RemoveAllFromScene, GetParentEl, ChangeParent, ChangeAll, AnimateParent, AnimateAll, GetChild};
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

	return {layer, SetFlag, GetFlag, TempDisableClick}
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

	const IfElse = (objRef, {cond, ifTrue, ifFalse}) => {
//npcBook1:{IfElse: {cond: 'bookFlag1', ifTrue: {testBook1: 	{AddToScene: null},}, ifFalse: {testBook2: {AddToScene: null},},}},
		//ifTrue
		//ifFalse
		//for loop for above objects with key name as object and value key as method and that value the params
		//console.log(objRef)//this.obj name
		//console.log(cond)//cond name
		//console.log(ifTrue)
		//console.log(ifFalse)
		//console.log(aThis[objRef].GetFlag(cond))
		if(aThis[objRef].GetFlag(cond) === 'true') {
			//run ifTrue
			for(let a in ifTrue){
				//console.log(ifTrue);
				//console.log(a);
				//console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					AThisObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else if (aThis[objRef].GetFlag(cond) === 'false' || !aThis[objRef].GetFlag(cond)) {
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

	const AddToTimeIntEvtTracker = ({name,type,method,params,event}) => {
		if(type === 'timeout'){
			aThis.running[name] = {type, name};
		} else if (type === 'interval'){
			aThis.running[name] = {type, name};
		} else if (type === 'interaction' || type === 'event'){
			aThis.running[name] = {type, name, method, params, event};
		}
	}

	const RemoveFromTimeIntEvtTracker = (name) => {
		delete aThis.running[name];
	}

	const ClearSceneTimeIntEvt = () => {
		//console.log(aThis.running)
		for(let ran in aThis.running){
		//console.log(ran);//name of ID
		//console.log(aThis.running[ran]);//object
			if(aThis.running[ran].type === 'timeout'){
					//console.log('clearing timeout');
					//console.log(aThis.running[ran].name);
					//console.log(aThis.timeouts[aThis.running[ran].name]);
					//clearTimeout(aThis.running[ran].name);
					clearTimeout(aThis.timeouts[aThis.running[ran].name]);
					//console.log(aThis.running)
			} else if (aThis.running[ran].type === 'interval'){
					//console.log('clearing interval');
					clearInterval(aThis.intervals[aThis.running[ran].name]);
			} else if (aThis.running[ran].type === 'interaction' || aThis.running[ran].type === 'event'){
				//Event
				//console.log('Need to remove an interaction.')
aThis[aThis.running[ran].name].GetEl().removeEventListener(aThis.running[ran].event, function(){
AThisObjMethod(aThis.running[ran].object,aThis.running[ran].method,aThis.running[ran].params);
});
			}
			RemoveFromTimeIntEvtTracker(ran);
		}

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
						AddToTimeIntEvtTracker({name: line, type: 'timeout'});
						aThis.timeouts[line] = setTimeout(function () {
							//console.log('IfElse Timeout Hit')
							IfElse(a,core[time][line][a][b]);
							clearTimeout(aThis.timeouts[line]);
						}, line); //Delay
					} else if(b === 'SetFlag'){
						AddToTimeIntEvtTracker({name: line, type: 'timeout'});
						aThis.timeouts[line] = setTimeout(function () {
							//console.log('SetFlag Timeout Hit')
							SetFlag(a,core[time][line][a][b]);
							clearTimeout(aThis.timeouts[line]);
						}, line); //Delay


					} else {
						AddToTimeIntEvtTracker({name: line, type: 'timeout'});
						aThis.timeouts[line] = setTimeout(function () {
							//console.log('Timeout Hit')
							AThisObjMethod(a,b,core[time][line][a][b]);
							clearTimeout(aThis.timeouts[line]);
						}, line); //Delay
					}
				}
			}
		} else if(time === 'interval'){
			//5000: {run: {
			//hamComp:{SetFlag:{flag: 'testVar', value: 'false'},},}, 
			//loop: 'infinite',
			//end: 'TestVar'},
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
								AddToTimeIntEvtTracker({name: line, type: 'interval'});
								aThis.intervals[line] = setInterval(function() {
									//Interval Functions
									//Check for End Condition
									if(aThis[b].GetFlag(endCond) === 'true'){
										clearInterval(aThis.intervals[line]);
										RemoveFromTimeIntEvtTracker(line);
									}
									//console.log('IfElse Interval Hit')
									IfElse(b,core[time][line][a][b][c]);
									//Check and update Loop Total
									if(loopTotal === 'infinite'){} else {
										ranTotal++;
										if(ranTotal >= loopTotal){
											clearInterval(aThis.intervals[line]);
											RemoveFromTimeIntEvtTracker(line);
										}
									}
								}, line); //Interval
							} else if(c === 'SetFlag'){
								AddToTimeIntEvtTracker({name: line, type: 'interval'});
								aThis.intervals[line] = setInterval(function() {
									//Interval Functions
									//Check for End Condition
									if(aThis[b].GetFlag(endCond) === 'true'){
										clearInterval(aThis.intervals[line]);
										RemoveFromTimeIntEvtTracker(line);
									}
									console.log('SetFlag Interval Hit')
									SetFlag(b,core[time][line][a][b][c]);
									//Check and update Loop Total
									if(loopTotal === 'infinite'){} else {
										ranTotal++;
										if(ranTotal >= loopTotal){
											clearInterval(aThis.intervals[line]);
											RemoveFromTimeIntEvtTracker(line);
										}
									}
								}, line); //Interval
							} else {
								let method = c;
								let params = core[time][line][a][b][c];
								AddToTimeIntEvtTracker({name: line, type: 'interval'});
								aThis.intervals[line] = setInterval(function() {
									//Interval Functions
									//Check for End Condition
									if(aThis[b].GetFlag(endCond) === 'true'){
										clearInterval(aThis.intervals[line]);
										RemoveFromTimeIntEvtTracker(line);
									}
									//console.log('Interval Hit')
									AThisObjMethod(b,method,params);
									//Check and update Loop Total
									if(loopTotal === 'infinite'){} else {
										ranTotal++;
										if(ranTotal >= loopTotal){
											clearInterval(aThis.intervals[line]);
											RemoveFromTimeIntEvtTracker(line);
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
					let object = a;
					let method = b;
					let params = core[time][line][a][b];
					//aThis.interactions[object];
					//aThis.running[ran].name;
					AddToTimeIntEvtTracker({name: object, type: 'interaction', method, params, event: line});
					aThis[object].GetEl().addEventListener(line, function(){
						AThisObjMethod(object,method,params);
					});
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
					let object = a;
					let method = b;
					let params = core[time][line][a][b];
					//aThis.interactions[object];
					//aThis.running[ran].name;
					AddToTimeIntEvtTracker({name: object, type: 'event', method, params, event: line});
					aThis[object].GetEl().addEventListener(line, function(){
						AThisObjMethod(object,method,params);
					});
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
						IfElse(line, core[time][line][a]);
					} else if (a === 'SetFlag') {
						SetFlag(line,core[time][line][a]);
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
						IfElse(line,core[time][line][a]);
					} else if (a === 'SetFlag') {
						SetFlag(line,core[time][line][a]);
					} else {
						AThisObjMethod(line,a,core[time][line][a]);
					}
				} else if(time === 'zone'){
					if(a === 'IfElse'){
						console.log('IfElse shouldnt be used in Zone. Move to Start.');
						//IfElse(line,core[time][line][a]);
					} else if (a === 'SetFlag') {
						console.log('SetFlag shouldnt be used in Zone. Move to Start.');
						//SetFlag(line,core[time][line][a]);
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

				}else {
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
		Zone();
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
//core.nodes.nodeName.map = {connect0:{},connect1:{}};
//console.log('Running Map Zone...')
//console.log(mapZoneData)

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
		core.currentNode = nodeName || Object.keys(core.nodes)[0];
		core.currentZone = core.info.id;
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
			pos: new THREE.Vector3(-0.25,1.5,-1),
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
						aThis[newNode.inZone].StartScene(newNode.node)
					}
				clearTimeout(timeout);
			}, 450);
			//Instant, Shrink/Grow, Fade, Sphere, Blink
			//console.log(aThis.player)
			//console.log(aThis.player.layer)
			//console.log(aThis.player.layer.transition)
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
				}, 1050);
			} else if (aThis.player.layer.transition === 'fade'){
				aThis.player.TempDisableClick();
				aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				aThis.fadeScreen.EmitEvent('fade');
				timeout2 = setTimeout(function () {
					aThis.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					clearTimeout(timeout2);
				}, 1050);
			} else if (aThis.player.layer.transition === 'sphere'){
				aThis.player.TempDisableClick();
				aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				aThis.sphereScreen.EmitEvent('sphere');
				timeout2 = setTimeout(function () {
					aThis.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					clearTimeout(timeout2);
				}, 1050);
			} else if (aThis.player.layer.transition === 'instant'){}
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
		clearInterval(core.textDisplayInterval);
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

	AddToTimeIntEvtTracker({name: 'textDisplayInterval', type: 'interval'});
		core.textDisplayInterval = setInterval(function() {
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
		aThis.intervals.textDisplayInterval = core.textDisplayInterval;
	}

	const AddToTimeIntEvtTracker = ({name,type,method,params}) => {
		if(type === 'timeout'){
			aThis.running[name] = {type, name};
		} else if (type === 'interval'){
			aThis.running[name] = {type, name};
		} else if (type === 'event'){
			aThis.running[name] = {type, name, method, params};
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
//objRef, {cond, ifTrue, ifFalse}
/*
IfElse: {
npc0:{cond: 'testVar',
ifTrue: {
npc0:{Speak:{role: 'Dev', speech:'Is True'}},
},
ifFalse: {
npc0:{Speak:{role: 'Dev', speech:'Is False'}},
},}
}*/
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

		//console.log(aThis[objRef].GetFlag(cond))
		if(aThis[objRef].GetFlag(cond) === 'true') {
			//run ifTrue
			for(let a in ifTrue){
				//console.log(ifTrue);
				//console.log(a);
				//console.log(ifTrue[a]);
				for(let b in ifTrue[a]){
					AThisObjMethod(a,b,ifTrue[a][b]);
				}
			}
		} else if (aThis[objRef].GetFlag(cond) === 'false' || !aThis[objRef].GetFlag(cond)) {
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
			pos: new THREE.Vector3(0.5,1.5,-0.5),
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
			pos: new THREE.Vector3(0.5,1.5,-0.5),
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

//HamComp ClickRun Component External
const ClickTest = (core) => {

	const Click = () =>{
		console.log('Running Seperate Click Method');
	}

return {core, Click}
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

/********************************************************************/
//
//Materials Library
//

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

/********************************************************************/
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
['wasd-controls']:{enabled: true, acceleration: 25},
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
['look-controls']:{pointerLockEnabled: false},
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
animations: false,
mixins: ['clickAnimation'],
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
animations: false,
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
fadein:{property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'},
fadeout:{property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 600, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fade'}, 
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
spherein1:{property: 'geometry.thetaLength', from: 0, to: 180, dur: 400, delay: 0, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
spherein2: {property: 'geometry.thetaStart', from: 90, to: 0, dur: 400, delay: 0, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
sphereout1:{property: 'geometry.thetaLength', from: 180, to: 0, dur: 400, delay: 600, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
sphereout2: {property: 'geometry.thetaStart', from: 0, to: 90, dur: 400, delay: 600, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sphere'},
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
blinkin:{property: 'object3D.position.y', from: 2.5, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkout:{property: 'object3D.position.y', from: 1, to: 2.5, dur: 400, delay: 600, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 600, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
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
blinkin:{property: 'object3D.position.y', from: -2.5, to: -1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacin: {property: 'components.material.material.opacity', from: 0, to: 1, dur: 400, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkout:{property: 'object3D.position.y', from: -1, to: -2.5, dur: 400, delay: 600, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkopacout: {property: 'components.material.material.opacity', from: 1, to: 0, dur: 400, delay: 600, loop: 'false', dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
},
mixins: false,
classes: ['a-ent','player'],
components: {visible: false},
};

//
//Menu

//Menu Button Base
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
position: new THREE.Vector3(0.3,1,-0.5),
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
//NPC
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

//Testing Object for Interactions and Events
this.eventTestingData = {
data:'Event Testing',
id:'eventTesting',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.5,1.25,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, customevent: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'customevent'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', },
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
position: new THREE.Vector3(-1,1.5,-2),
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
//Speech System TextBubble
//Scene Text
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
//Side
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
//Bottom
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
//Top
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
//NPC
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

//
//Environment

//Floor
//

//Node Floor
this.nodeFloorData = {
data:'full floor',
id:'nodeFloor',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 50, segmentsWidth: 10, segmentsHeight: 10, phiLength: 180},
material: {shader: "standard", src: './assets/img/tiles/grid-border.png', repeat: '100 100',color: "#ff71ce", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ff71ce", emissiveIntensity: 0.8, side: 'front',},
position: new THREE.Vector3(0,-1,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.02),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//Full Floor
this.fullFloorData = {
data:'full floor',
id:'fullFloor',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 100, height: 100, segmentsHeight: 1, segmentsWidth: 1},
material: {shader: "standard",color: "#0c905e", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#0c905e", emissiveIntensity: 0.25, side: 'double',},
position: new THREE.Vector3(0,-0.15,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
this.fullFloorGridData = {
data:'full floor grid',
id:'fullFloorGrid',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 100, height: 100, segmentsHeight: 1, segmentsWidth: 1},
material: {shader: "standard", src: './assets/img/tiles/grid-border.png', repeat: '100 100',color: "#ff71ce", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ff71ce", emissiveIntensity: 0.8, side: 'double', transparent: 'true',},
position: new THREE.Vector3(0,0,0),
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
material: {shader: 'threeColorGradientShader', topColor: '#01cdfe', middleColor: '#fffb96', bottomColor: '#b967ff'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
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

//Cosmic Sun 
this.skyCosmicSunData = {
data:'background 1',
id:'skyCosmicSun',
entity: 'a-sky',
sources:false,
text: false,
geometry: false,
material: {shader: "flat", src: "./assets/img/360/cosmic-sun.jpg", color: '#FFFFFF'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//
//NPC Speech

//NPC 0 Pages
this.npc0BookTestPage1Data = {
info:{
id:'npc0BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc0',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc0:{Speak:{role: 'Dev', speech:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac metus sodales, rhoncus tellus at, pretium mi.'}, SetFlag:{flag: 'testVar', value: 'true'},},
},
timeline1:{
npc0:{IfElse: {npc0:{cond: 'testVar',
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
//NPC 0 Book
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

//NPC 1 Pages
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
//NPC 1 Book
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

//NPC 2 Pages
this.npc2BookTestPage1Data = {
info:{
id:'npc2BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc1',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
//npc2:{IfElse: {cond: 'masterKey', ifTrue: {npc2:{Speak:{role: 'Ham', speech:'Did you find where the Key goes?'}},}, ifFalse: {npc2:{Speak:{role: 'Ham', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},}}},

npc2:{Speak:{role: 'Ham', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},
},
timeline1:{
npc2:{Speak:{role: 'Ham', speech:'Here you go!'}},
player:{SetFlag: {flag: 'masterKey', value: 'true'}},
},
timeline2:{
npc2:{Speak:{role: 'Ham', speech:'Good luck finding where it goes!'}},
},
timeline3:{
npc2: {ResetBook: true},
},
};
//NPC 2 Book
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

//
//Animations

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
//World Atlas Map & Node Data

//
//Zone 0
this.zone0Data = {
info:{
id: 'zone0',
name: 'Home',
zoneNum: 0,
},

zone0Node0In0:{
connect0: {inZone: true, node: 'zone0Node0In1',},
},
zone0Node0In1:{
connect0: {inZone: true, node: 'zone0Node0In0',},
connect1: {inZone: true, node: 'zone0Node0Out'},
},
zone0Node0Out:{
connect0: {inZone: true, node: 'zone0Node0In1'},
connect1: {inZone: true, node: 'zone0Node1Out',},
},
zone0Node1Out:{
connect0: {inZone: true, node: 'zone0Node0Out',},
connect1: {inZone: true, node: 'zone0Node2Out', locked: true, key: 'masterKey', keepKey: true},
connect2: {inZone: 'zone1', node: 'zone1Node0Out',},
},
zone0Node2Out:{
connect0: {inZone: true, node: 'zone0Node1Out'},
},
};

//Indoor Node 0 [HomeBase & Starter Node]
this.zone0Node0In0Data = {
info:{
id:'zone0Node0In0',
name: 'Your Home Bedroom',
description: 'HomeBase starting point for Zone 0.',
sceneText: true,
},
zone:{
skyStarLayer: {AddAllToScene: null},
},
start:{
HamGirl:{Start: null},
eventTesting:{AddToScene: null, EnableDetail: 'This is a test detail to read.'},
soundTesting:{AddToScene: null},
nodeFloor:{
IfElse: {cond: 'testVar',
ifTrue: {
nodeFloor:{AddToScene: null,ChangeSelf: {property: 'material', value: {color: '#90e024', emissive: '#90e024'}}},},
ifFalse: {
nodeFloor:{AddToScene: null,ChangeSelf: {property: 'material', value: {color: '#24a6e0', emissive: '#24a6e0'}}},},}},
},
delay:{
5000:{eventTesting:{EmitEvent: 'customevent'},},
5001:{soundTesting:{EmitEvent: 'playSound'},},
},
interval:{
},
event:{
customevent: {eventTesting: {ChangeSelf: {property: 'material', value: {color: '#90e024', emissive: '#90e024'}}},},
},
interaction:{
click: {eventTesting: {ChangeSelf: {property: 'material', value: {color: '#24a6e0', emissive: '#24a6e0'}}},},
},
exit:{
HamGirl:{Remove: null},
},
map:{
data: this.zone0Data.zone0Node0In0,
},
};
//Indoor Node 1
this.zone0Node0In1Data = {
info:{
id:'zone0Node0In1',
name: 'Your Living Room',
description: 'Secondary room in starting HomeBase indoor zone and connection to outside.',
sceneText: true,
},
zone:{},
start:{
npc0:{Spawn: null},
},
delay:{
},
interval:{},
event:{},
interaction:{},
exit:{

},
map:{
data: this.zone0Data.zone0Node0In1,
},
};
//Outdoor Node 0
this.zone0Node0OutData = {
info:{
id:'zone0Node0Out',
name: 'Front Porch',
description: 'Right outside the HomeBase building. Go back inside head to travel station.',
sceneText: true,
},
zone:{},
start:{
carousel1:{Show: null},
},
delay:{

},
interval:{},
event:{},
interaction:{},
exit:{},
map:{
data: this.zone0Data.zone0Node0Out,
},
};
//Outdoor Node 1 - Connects to all 2nd zone
this.zone0Node1OutData = {
info:{
id:'zone0Node1Out',
name: 'Travel Station',
description: 'Right next door to the HomeBase building. Go back or travel the world.',
sceneText: true,
},
zone:{},
start:{
npc1:{Spawn: null},
},
delay:{

},
interval:{},
event:{},
interaction:{},
exit:{},
map:{
data: this.zone0Data.zone0Node1Out,
},
};
//Outdoor Node 2 - Locked
this.zone0Node2OutData = {
info:{
id:'zone0Node2Out',
name: 'Janitor Closet',
description: 'A Locked Room.',
sceneText: true,
},
zone:{},
start:{},
delay:{},
interval:{},
event:{},
interaction:{},
exit:{},
map:{
data: this.zone0Data.zone0Node2Out,
},
};

//
//Zone 1
this.zone1Data = {
info:{
id: 'zone1',
name: 'Forest',
zoneNum: 1,
},
zone1Node0Out:{
connect0: {inZone: 'zone0', node: 'zone0Node1Out',},
connect1: {inZone: true, node: 'zone1Node0In0',},
},
zone1Node0In0:{
connect0: {inZone: true, node: 'zone1Node0Out',},
connect1: {inZone: 'zone0', node: 'zone0Node0In0',},
},

};

//Outdoor Node 1
this.zone1Node0OutData = {
info:{
id:'zone1Node0Out',
name: 'Zone 1 Forest Exterior',
description: 'Landing Area for Zone 1',
sceneText: true,
},
zone:{},
start:{
skyCosmicSun:{AddToScene: null}
},
delay:{

},
interval:{},
event:{},
interaction:{},
exit:{},
map:{
data: this.zone1Data.zone1Node0Out,
},
};
//Indoor Node 1
this.zone1Node0In0Data = {
info:{
id:'zone1Node0In0',
name: 'Zone 1 Forest Interior',
description: 'Indoor Zone 1 and 1way Return to HomeBase.',
sceneText: true,
},
zone:{},
start:{
//npc2:{Spawn: null},
},
delay:{},
interval:{},
event:{},
interaction:{},
exit:{},
map:{
data: this.zone1Data.zone1Node0In0,
},
};

/********************************************************************/
//
//Core, Layer & Aux Library

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
//Carousel
this.carousel1 = Carousel('carousel1',this.carouselViewData, this.carouselButtonData, mat0, mat1, mat2, mat3, mat4);

//Speech System TextBubble
this.textBubbleSide = Core(this.textBubbleSideData);
this.textBubbleBottom = Core(this.textBubbleBottomData);
this.textBubbleTop = Core(this.textBubbleTopData);

//
//Environment

//Node Floor
this.nodeFloor = Core(this.nodeFloorData);

//Full Floor
this.fullFloor = Core(this.fullFloorData);
this.fullFloorGrid = Core(this.fullFloorGridData);
this.fullFloorLayer = {
parent: {core: this.fullFloor}, 
child0: {core: this.fullFloorGrid},}
this.fullFloorLayer = Layer('fullFloorLayer',this.fullFloorLayer);

//3Grad Dual Sky
this.skyGrad = Core(this.skyGradData);
this.skyStarAlpha = Core(this.skyStarAlphaData);
this.skyLayer = {
parent: {core: this.skyGrad}, 
child0: {core: this.skyStarAlpha},}
this.skyStarLayer = Layer('skyStarLayer',this.skyLayer);

//Cosmic Sun Sky
this.skyCosmicSun = Core(this.skyCosmicSunData);

//
//Hamburger Menu Companion
this.hamComp = Core(this.hamCompData);
this.HamGirl = HamMenu('HamGirl',this.hamComp);

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

//
//Scripted Events Testing Object
this.eventTesting = Core(this.eventTestingData);
//this.eventTestingClick = ClickTest(this.eventTesting);

//Sound
this.soundTesting = Core(this.soundTestingData);

//
//World Atlas & Map
//Define at end of Init to ensure all objects are ready

//Zone 0
//
//Node 0 In 0
this.zone0Node0In0 = SceneNode(this.zone0Node0In0Data);
//Node 0 In 1
this.zone0Node0In1 = SceneNode(this.zone0Node0In1Data);
//Node 0 Out
this.zone0Node0Out = SceneNode(this.zone0Node0OutData);
//Node 1 Out
this.zone0Node1Out = SceneNode(this.zone0Node1OutData);
//Node 2 Out
this.zone0Node2Out = SceneNode(this.zone0Node2OutData);
//Map Zone 0
this.zone0 = MapZone(this.zone0Data);

//Zone 1
//
//Node 0 Out 0
this.zone1Node0Out = SceneNode(this.zone1Node0OutData);
//Node 0 Int
this.zone1Node0In0 = SceneNode(this.zone1Node0In0Data);
//Map Zone 1
this.zone1 = MapZone(this.zone1Data);

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

//External Components
/*
Look-At 
https://github.com/supermedium/superframe/tree/master/components/look-at/ 
*/
!function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t){var o=AFRAME.utils.debug,n=AFRAME.utils.coordinates,i=o("components:look-at:warn"),r=n.isCoordinates||n.isCoordinate;delete AFRAME.components["look-at"],AFRAME.registerComponent("look-at",{schema:{default:"0 0 0",parse:function(e){return r(e)||"object"==typeof e?n.parse(e):e},stringify:function(e){return"object"==typeof e?n.stringify(e):e}},init:function(){this.target3D=null,this.vector=new THREE.Vector3,this.cameraListener=AFRAME.utils.bind(this.cameraListener,this),this.el.addEventListener("componentinitialized",this.cameraListener),this.el.addEventListener("componentremoved",this.cameraListener)},update:function(){var e,t=this,o=t.data;return!o||"object"==typeof o&&!Object.keys(o).length?t.remove():"object"==typeof o?this.lookAt(new THREE.Vector3(o.x,o.y,o.z)):(e=t.el.sceneEl.querySelector(o),e?e.hasLoaded?t.beginTracking(e):e.addEventListener("loaded",function(){t.beginTracking(e)}):void i('"'+o+'" does not point to a valid entity to look-at'))},tick:function(){var e=new THREE.Vector3;return function(t){var o=this.target3D;o&&(o.getWorldPosition(e),this.lookAt(e))}}(),remove:function(){this.el.removeEventListener("componentinitialized",this.cameraListener),this.el.removeEventListener("componentremoved",this.cameraListener)},beginTracking:function(e){this.target3D=e.object3D},cameraListener:function(e){e.detail&&"camera"===e.detail.name&&this.update()},lookAt:function(e){var t=this.vector,o=this.el.object3D;this.el.getObject3D("camera")?t.subVectors(o.position,e).add(o.position):t.copy(e),o.lookAt(t)}})}]);

/* //threeColorGradientShader shader
https://github.com/tlaukkan/aframe-three-color-gradient-shader
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}*/
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