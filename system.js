//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//AUXL
//
//System
//Support
//Core
//Layer
//Player
//Companion
//
AFRAME.registerSystem('auxl', {
schema: {
	id: {type: 'string', default:'#FFFFFF'},
	color: {type: 'string', default: '#FFFFFF'},
	shortname: {type: 'string', default: '#FFFFFF'},
	longname: {type: 'string', default: '#FFFFFF'},
	server: {type: 'string', default: 'localhost'},
	onlineKey: {type: 'string', default: 'FFFFFF'},
},
init: function () {
/*************************************************************/
//System
const auxl = this;
this.expStarted = false;
this.defaultWorld;
this.currentWorld;
this.currentZone;
this.worldLoaded = false;
this.local = {};
this.local.profile = {};
this.rebuildObjects = [];
this.volume = 1;

//Controller
let playerRig;
let playerBody;
let camera;
let cameraUI;
let playerBeltUI;
let playerBeltText;
let playerFloor;
let mouseController;
let vrController1;
let vrController1UI;
let vrController2;
let vrController2UI;

//Throttled Scene Loading Function
this.checkSceneLoadThrottled = AFRAME.utils.throttle(this.checkSceneLoad, 30, this);
this.sceneReading = false;
this.loadingScene = false;
this.loadingObjects = new Map();
this.maxLoadTime = 5000;
this.jsLoaded = {};
//JS Scripts Predefined, Ready to be loaded dynamically
this.jsAll = {
['look-at']:'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',
//threeGradShader: 'https://unpkg.com/@tlaukkan/aframe-three-color-gradient-shader@0.0.1/index.js',//Shaders needs it's own checker
['gltf-morph']:'https://rawcdn.githack.com/elbobo/aframe-gltf-morph-component/07e9b80bd382cc1c19223468d35c453e7c76e9a2/dist/aframe-gltf-morph-component.js',
};

/*************************************************************/
//HTML Elements
const sceneEl = document.querySelector('a-scene');
const head = document.querySelector('head');
const body = document.querySelector('body');
const stickyMenu = document.getElementById('stickyMenu');
const stickyTitle = document.getElementById('stickyTitle');
const systemText = document.getElementById('systemText');
const beginDiv = document.getElementById('beginDiv');
const startButton = document.getElementById('startButton');
const menuModeButton = document.getElementById('menuModeButton');
const audioButton = document.getElementById('audioButton');
const audioVolume = document.getElementById('audioVolume');
const volDownButton = document.getElementById('volDownButton');
const volume = document.getElementById('volume');
const volUpButton = document.getElementById('volUpButton');
const viewInfo = document.getElementById('viewInfo');
const viewData = document.getElementById('viewData');
const expInfo = document.getElementById('expInfo');
const infoClose = document.getElementById('infoClose');
const instructions = document.getElementById('instructions');
const dataInfo = document.getElementById('dataInfo');
const dataClose = document.getElementById('dataClose');
const manageData = document.getElementById('manageData');
const resetData = document.getElementById('resetData');
const scenarioHeaderTitle = document.getElementById('scenarioHeaderTitle');
const scenarioMenuTitle = document.getElementById('scenarioMenuTitle');
const controllerBlock = document.getElementById('controllerBlock');
const vrHandButton = document.getElementById('vrHandButton');
const vrLocomotionType = document.getElementById('vrLocomotionType');
//Mobile HTML Buttons
const mobileUpLeft = document.getElementById('upLeft');
const mobileUp = document.getElementById('up');
const mobileUpRight = document.getElementById('upRight');
const mobileLeft = document.getElementById('left');
const mobileCenter = document.getElementById('center');
const mobileRight = document.getElementById('right');
const mobileDownLeft = document.getElementById('downLeft');
const mobileDown = document.getElementById('down');
const mobileDownRight = document.getElementById('downRight');
const mobileSelect = document.getElementById('select');
const mobileStart = document.getElementById('start');
const mobileA = document.getElementById('a');
const mobileB = document.getElementById('b');
const mobileC = document.getElementById('c');
const mobileD = document.getElementById('d');
const mobileE = document.getElementById('e');
const mobileF = document.getElementById('f');
const mobileL = document.getElementById('l');
const mobileR = document.getElementById('r');

let htmlBackground = [body, beginDiv, startButton, menuModeButton, audioButton, viewInfo, viewData, expInfo, infoClose, instructions, scenarioMenuTitle, dataInfo, dataClose, manageData, resetData, controllerBlock, vrHandButton, vrLocomotionType];

let htmlForeground = [stickyMenu, stickyTitle, scenarioHeaderTitle, controllerBlock, mobileUpLeft, mobileUp, mobileUpRight, mobileLeft, mobileCenter, mobileRight, mobileDownLeft, mobileDown, mobileDownRight, mobileSelect, mobileStart, mobileA, mobileB, mobileC, mobileD, mobileE, mobileF, mobileL, mobileR];

// System Configure
/***********************************************************/
//System Loaded, Runs after World/Scenario/Zone/Scenes loaded
this.systemLoaded = (reset) => {
	setStorage(reset);
	auxl.player.infoText = 'Player : ' + auxl.local.profile.shortname + '\n';
	SystemStart();
	ApplySettings();
}
//System Start
const SystemStart = () => {
	//Init Collision
	auxl.map = auxl.Collision();

}
//Apply System Settings
const ApplySettings = () => {
	ApplyColorScheme();
	ApplySystemText();
	UpdateSystemText(this.local.profile.systemText);
}
//Apply Color Scheme
const ApplyColorScheme = () => {
	//HTML
	for(let element in htmlBackground){
		htmlBackground[element].style.setProperty('background-color', this.local.profile.colorScheme.base);
		htmlBackground[element].style.setProperty('color-text', this.local.profile.colorScheme.compl);
	}
	for(let element in htmlForeground){
		htmlForeground[element].style.setProperty('background-color', 'transparent');
		htmlForeground[element].style.setProperty('color-text', this.local.profile.colorScheme.compl);
		htmlForeground[element].style.setProperty('border-color', this.local.profile.colorScheme.compl);
	}
	//Camera UI
	auxl.cameraUI.ChangeSelf({property: 'material', value: {color: this.local.profile.colorScheme.base,}})
	auxl.cameraUI.ChangeSelf({property: 'text', value: {color: this.local.profile.colorScheme.compl,}})
	//Floor
	auxl.playerFloor.ChangeSelf({property: 'material', value: {color: this.local.profile.colorScheme.base,}})
	auxl.playerFloor.ChangeSelf({property: 'text', value: {color: this.local.profile.colorScheme.compl,}})
	//Hands
	//Floor
	auxl.vrController1UI.ChangeSelf({property: 'material', value: {color: this.local.profile.colorScheme.base,}})
	auxl.vrController1UI.ChangeSelf({property: 'text', value: {color: this.local.profile.colorScheme.compl,}})
	auxl.vrController2UI.ChangeSelf({property: 'material', value: {color: this.local.profile.colorScheme.base,}})
	auxl.vrController2UI.ChangeSelf({property: 'text', value: {color: this.local.profile.colorScheme.compl,}})

	//console.log('Color Applied');
}
//Apply System Text
const ApplySystemText = () => {
	//HTML
	systemText.innerHTML = this.systemText;
	//Player Belt
	auxl.player.UpdateBeltText(this.systemText);
	//Camera UI
	auxl.cameraUI.ChangeSelf({property: 'text', value: {value: this.systemText,}})
	//Hands
	auxl.vrController1UI.ChangeSelf({property: 'text', value: {value: this.systemText,}})
	auxl.vrController2UI.ChangeSelf({property: 'text', value: {value: this.systemText,}})

	//console.log('System Text Applied');
}
//Update System Text
const UpdateSystemText = (text) => {
	this.systemText = text;
	ApplySystemText()
}
//Add Component Rebuild Method
this.toBeRebuilt = (methodName) => {
	auxl.rebuildObjects.push(methodName);
}
//Rebuild Player and All ObjGens
const Rebuild = () => {
	//Clear System Intervals & Timeouts
	clearTimeout(auxl.sceneLoadTimeout);
	//Clear Inventory
	auxl.comp.ClearInventoryNotifications();
	//Reset Player
	auxl.player.Reset();
	//Rebuild All Objects
	for(let each in auxl.rebuildObjects){
		auxl[auxl.rebuildObjects[each]]();
	}
}
//Scene Asset Load Timeout
this.SceneLoadTimeout = () => {
	auxl.sceneLoadTimeout = setTimeout(() => {
		//Empty Loading Objects
		auxl.loadingObjects = new Map();
		clearTimeout(auxl.sceneLoadTimeout);
	}, auxl.maxLoadTime);
}

// Local Storage
/*************************************************************/
/*
localStorage.setItem("myCat", "Tom");
const cat = localStorage.getItem("myCat");
localStorage.removeItem("myCat");
localStorage.clear();

sessionStorage.setItem("myCat", "Tom");
const cat = sessionStorage.getItem("myCat");
sessionStorage.removeItem("myCat");
sessionStorage.clear();
*/
//Save Name
this.save = 'auxl' + window.location.pathname;
//console.log(window.location.href)
//console.log(window.location.hostname)
//console.log(window.location.pathname)
//Default Save Data
const newData = () => {
	this.local = {};
	this.local.profile = {};
	this.local.profile.domain = window.location.hostname;
	this.local.profile.page = window.location.pathname;
	this.local.profile.controls = this.controls;
	this.local.profile.vrHand = this.vrHand;
	this.local.profile.volume = this.volume;
	this.local.profile.time = {};
	this.local.profile.time.creation = time();
	this.local.profile.time.lastVisit = time();
	this.local.profile.colorScheme = auxl.colorTheoryGen();
	this.local.profile.id = this.local.profile.colorScheme.base;
	this.local.profile.color = this.local.profile.colorScheme.base;
	this.local.profile.shortname = this.local.profile.colorScheme.base;
	this.local.profile.longname = this.data.longname;
	this.local.profile.server = this.data.server;
	this.local.profile.onlineKey = this.data.onlineKey;
	//this.local.profile.systemText = 'Welcome ' + this.local.profile.shortname + '! ID :'+ this.local.profile.id + '| AUXL Engine v0.3.3!\n ^-^!\n Starting...';
	this.local.profile.systemText = 'Welcome ' + this.local.profile.shortname;
	this.systemText = this.local.profile.systemText
	//Current Location
	this.local.location = {};
	this.local.location.load = false;
	this.local.location.world = '';
	this.local.location.scenario = '';
	this.local.location.zone = '';
	this.local.location.scene = '';
}
//New
const newStorage = () => {
	//Fresh Session, Initiliaze Site Wide Settings
	console.log('New here. Loading default data.');
	//Default Data
	newData();
	//Rebuild All Objects
	Rebuild();
	//Assign Completion to Storage
	window.localStorage.setItem(this.save, JSON.stringify(auxl.local));
	ApplySettings();

	//Update Controls
	vrHandMenu(this.local.profile.vrHand)
	controlsMenu(this.local.profile.controls)
	updateControls();
}
//Load
const loadStorage = () => {
	//Return Session, Load Site Wide Settings
	console.log('Loading previous data.');
	//Overwrite default profile
	this.local = JSON.parse(window.localStorage.getItem(this.save));
	ApplySettings();
	this.local.profile.time.return = time();

	this.local.profile.time.span = timeDif(this.local.profile.time.lastVisit, this.local.profile.time.return);
	console.log('Time since last visit :');
	console.log(this.local.profile.time.span);
	//Update new Last Visit Data
	this.local.profile.time.lastVisit = this.local.profile.time.return;
	//Flag that we are loading data
	if(this.local.location.world === '' ||  this.local.location.scenario === '' || this.local.location.zone === '' || this.local.location.scene === ''){
		this.local.location.load = false;
	}else{
		this.local.location.load = true;
	}

	//Save Last Visit Date
	auxl.saveToProfile();
	UpdateFromLocal();

	//Update Controls
	vrHandMenu(this.local.profile.vrHand)
	controlsMenu(this.local.profile.controls)
	updateControls();

	//Update Audio
	this.volume = this.local.profile.volume;
}
//Set
//If the value exists then we have already entered once, do not repeat link anims
const setStorage = (reset) => {
  	if(reset){
		newStorage();
	} else if(localStorage.getItem(this.save)){
		loadStorage();
	} else {
		newStorage();
	}
}

//Save to Profile and Local
this.saveToProfile = (sync) => {
//sync.auxlObject, sync.type, sync.sub, sync.name, sync.data
	if(!sync){
		//Save Profile Only
	} else {
		if(auxl.local[sync.auxlObject]){
			if(sync.sub){
				if(auxl.local[sync.auxlObject][sync.type][sync.sub]){
					auxl.local[sync.auxlObject][sync.type][sync.sub][sync.name] = sync.data;
				} else {
					auxl.local[sync.auxlObject][sync.type][sync.sub] = {};
					auxl.local[sync.auxlObject][sync.type][sync.sub][sync.name] = sync.data;
				}
			} else {
				auxl.local[sync.auxlObject][sync.type][sync.name] = sync.data;
			}
		} else {
			auxl.local[sync.auxlObject] = {};
			auxl.local[sync.auxlObject][sync.type] = {};
			if(sync.sub){
				auxl.local[sync.auxlObject][sync.type][sync.sub] = {};
				auxl.local[sync.auxlObject][sync.type][sync.sub][sync.name] = sync.data;
			} else {
				auxl.local[sync.auxlObject][sync.type][sync.name] = sync.data;
			}
		}
	}
	window.localStorage.setItem(this.save, JSON.stringify(auxl.local));
	//console.log(auxl.local)
}
//Update from Local
const UpdateFromLocal = () => {
	console.log(auxl.local)
	for(let each in auxl.local){
		if(each === 'profile' || each === 'location'){} else {
			for(let type in auxl.local[each]){
				for(let a in auxl.local[each][type]){
					if(auxl[each]){
						auxl[each][type][a] = auxl.local[each][type][a];
					}
				}
			}
		}
	}
}

//Time
/*************************************************************/
//Get Time
function time(){
	let time = {};
	time.time = new Date();
	time.year = time.time.getFullYear();
	time.month = time.time.getMonth();
	time.date = time.time.getDate();
	time.day = time.time.getDay();
	time.hour = time.time.getHours();
	time.minute = time.time.getMinutes();
	time.second = time.time.getSeconds();
	time.ms = time.time.getTime();
	return time;
}
//Time Difference from returned time() object
function timeDif(start, end){
	let timeDif = {};
	let time = {};
	//Time in MS
	let ms = 1;
	let msSecond = 1000;
	let msMinute = msSecond * 60;
	let msHour = msMinute * 60;
	let msDay = msHour * 24;
	let msMonth = msDay * (365.25/12);
	let msYear = msMonth * 12;
	//Get Amount of Time from MS
	function totalTime(ms){
		let time = {};
		time.ms = ms;
		time.seconds = Math.floor(time.ms / 1000);
		time.minutes = Math.floor(time.seconds / 60);
		time.hours = Math.floor(time.minutes / 60);
		time.days = Math.floor(time.hours / 24);
		time.months = Math.floor(time.days / (365/12));
		time.years = Math.floor(time.months / 12);
		return time;
	}
	//Total Time Difference
	//time.total = end.getTime() - start.getTime();
	time.total = end.ms - start.ms;
	//Current Time Difference
	//let msCurrentDif = end.getTime() - start.getTime();
	let msCurrentDif = end.ms - start.ms;
	timeDif = totalTime(msCurrentDif);
	//Calculate Amounts
	//Year
	msCurrentDif -= (timeDif.years * msYear);
	time.years = timeDif.years;
	timeDif = totalTime(msCurrentDif);
	//Month
	msCurrentDif -= (timeDif.months * msMonth);
	time.months = timeDif.months;
	timeDif = totalTime(msCurrentDif);
	//Days
	msCurrentDif -= (timeDif.days * msDay);
	time.days = timeDif.days;
	timeDif = totalTime(msCurrentDif);
	//Hours
	msCurrentDif -= (timeDif.hours * msHour);
	time.hours = timeDif.hours;
	timeDif = totalTime(msCurrentDif);
	//Minutes
	msCurrentDif -= (timeDif.minutes * msMinute);
	time.minutes = timeDif.minutes;
	timeDif = totalTime(msCurrentDif);
	//Seconds
	msCurrentDif -= (timeDif.seconds * msSecond);
	time.seconds = timeDif.seconds;
	timeDif = totalTime(msCurrentDif);
	//MS
	msCurrentDif -= (timeDif.ms * ms);
	time.ms = timeDif.ms;
	timeDif = totalTime(msCurrentDif);
	return time;
}

/*************************************************************/

//Controls
this.universalControls;
this.controls = 'Desktop';
this.vrHand = 'bothRight';
this.directionType = 'camera';
this.locomotionText = 'WASD Keys';

//Joystick Configurations : 1,4,8
this.joystickLoco = 8;
this.joystickRot = 8;
this.controlsInfo = {};
this.controlsText = '';
//Menu
this.menuOpen = true;
this.infoOpen = false;
this.dataOpen = false;
this.audioEnabled = false;
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
//Unique Spawn/Despawn methods required
this.objGenTracking = {
core:{type:'core', spawn: 'SpawnCore', despawn: 'DespawnCore', altSpawn: 'SpawnCoreOnGrid'},
layer:{type:'layer', spawn: 'SpawnLayer', despawn: 'DespawnLayer', altSpawn: 'SpawnLayerOnGrid'},
menu:{type:'menu', spawn: 'SpawnMenu', despawn: 'DespawnMenu'},
multiMenu:{type:'multiMenu', spawn: 'SpawnMultiMenu', despawn: 'DespawnMultiMenu'},
singleGen:{type:'singleGen', spawn: 'SpawnObjRing', despawn: 'DespawnObjRing'},
multiGen:{type:'multiGen', spawn: 'SpawnMultiAsset', despawn: 'DespawnMultiAsset'},
comp:{type:'comp', spawn: 'SpawnComp', despawn: 'DespawnComp'},
teleport:{type:'teleport', spawn: 'SpawnTeleport', despawn: 'DespawnTeleport'},
npc:{type:'npc', spawn: 'SpawnNPC', despawn: 'DespawnNPC'},
speechSystem:{type:'speechSystem', spawn: 'SpawnSpeech', despawn: 'DespawnSpeech'},
book:{type:'book', spawn: 'SpawnBook', despawn: 'DespawnBook'},
horizon:{type:'horizon', spawn: 'SpawnHorizon', despawn: 'DespawnHorizon'},
skyBox:{type:'skyBox', spawn: 'SpawnSkyBox', despawn: 'DespawnSkyBox'},
gridLayout:{type:'gridLayout', spawn: 'SpawnGridLayout', despawn: 'DespawnGridLayout'},
gate:{type:'gate', spawn: 'SpawnGate', despawn: 'DespawnGate'},
imageSwapper:{type:'imageSwapper', spawn: 'SpawnImgSwap', despawn: 'DespawnImgSwap'},
imageCarousel:{type:'imageCarousel', spawn: 'SpawnImgCarousel', despawn: 'DespawnImgCarousel'},
//gameMenu:{type:'gameMenu', spawn: 'SpawnGameMenu', despawn: 'DespawnGameMenu'},
memory:{type:'memory', spawn: 'SpawnMemGame', despawn: 'DespawnMemGame'},
swipeLaunch:{type:'swipeLaunch', spawn: 'SpawnSLGame', despawn: 'DespawnSLGame'},
guessHit:{type:'guessHit', spawn: 'SpawnGHGame', despawn: 'DespawnGHGame'},
dragDiffuse:{type:'dragDiffuse', spawn: 'SpawnDDGame', despawn: 'DespawnDDGame'},
};
//Add Custom Built Object to Tracker
this.AddObjGenToTracker = (type, spawn, despawn, altSpawn) => {
	auxl.objGenTracking[type] = {};
	auxl.objGenTracking[type].type = type;
	auxl.objGenTracking[type].spawn = spawn;
	auxl.objGenTracking[type].altSpawn = spawn;
	auxl.objGenTracking[type].despawn = despawn;
}
//Spawn Tracker
this.spawnTracker = (obj, spawnLocation, bookName) => {
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
			if(auxl[obj][auxl.objGenTracking[types].spawn] || auxl[obj][auxl.objGenTracking[types].altSpawn]){
				type = auxl.objGenTracking[types].type;
				id = auxl[obj][type].id;
				break;
			}
		}
		if(type){}else{
			console.log(obj)
			console.log(spawnLocation)
			console.log(tracker)
			console.log(type)
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
this.clearSpawned = (spawned) => {
	for(let spawn in spawned){
		if(auxl[spawn]){
			auxl[spawn][auxl.objGenTracking[spawned[spawn].type].despawn]();
		} else {
			if(spawned[spawn].parent){
				spawned[spawn].parent[spawn][auxl.objGenTracking[spawned[spawn].type].despawn]();
			} else {
				auxl[spawn].obj[auxl.objGenTracking[spawned[spawn].type].despawn]();
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
this.RemoveFromTracker = (id, bookname) => {
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
//Check if Exists in Tracker
this.ExistsInTracker = (id, bookname) => {
	let book = bookname || false;
	if(auxl.scenarioSpawned[id]){
		return true;
	} else if(auxl.zoneSpawned[id]){
		return true;
	} else if(auxl.nodeSpawned[id]){
		return true;
	} else {
		if(book){
			if(auxl.bookSpawned[book][id]){
				delete auxl.bookSpawned[book][id];
			} else {
				return false;
			}
		} else {
			return false;
		}
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
//Physics
this.physics = false;
//Collision Maps
this.collisionMap = [[],[]];
this.triggerMap = [[],[]];
this.mapEdge = false;

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
	if(auxl.worldLoaded){}else{
		if(auxl.local.location.world === ''){
			auxl.defaultWorld.StartWorld();
		} else {
			auxl[auxl.local.location.world].StartWorld();
		}
		startButton.innerHTML = 'Resume';
		updateControls();
		auxl.worldLoaded = true;
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
		auxl.locomotionText = 'Left Controller Joystick';
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
		auxl.locomotionText = 'Right Controller Joystick';
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
		if(auxl.vrHand === 'bothLeftLoco'){
			auxl.locomotionText = 'Left Controller Joystick';
		} else if (auxl.vrHand === 'bothRightLoco'){
			auxl.locomotionText = 'Right Controller Joystick';
		}
	} else if(auxl.vrHand === 'right'){
		vrController2.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 4});
		auxl.player.EnableVRHoverLocomotion('vrController2');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
	} else if(auxl.vrHand === 'left'){
		vrController1.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 5});
		auxl.player.EnableVRHoverLocomotion('vrController1');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
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
	auxl.locomotionText = 'WASD Keys';
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
	auxl.locomotionText = 'Arrow Buttons';
}
//Controls Menu
function controlsMenu(state){
	//Old
	if(auxl.controls === 'Desktop'){
		disableVRControls();
	} else if(auxl.controls === 'Mobile'){
		disableMobileControls();
	} else if(auxl.controls === 'VR'){
		vrHandButton.style.display = 'none';
		vrLocomotionType.style.display = 'none';
		disableVRControls();
	}
	//New
	if(state === 'Desktop'){
		menuModeButton.innerHTML = 'Mode : Desktop'
		enableDesktopControls();
	} else if(state === 'Mobile'){
		menuModeButton.innerHTML = 'Mode : Mobile';
		enableMobileControls();
	} else if(state === 'VR'){
		menuModeButton.innerHTML = 'Mode : VR';
		vrHandButton.style.display = 'flex';
		vrLocomotionType.style.display = 'flex';
		enableVRControls();
	}
	//Update State
	auxl.controls = state;
	updateControls();
}
//VR Hand Menu
function vrHandMenu(state){
	//New
	if(state === 'bothRight'){
		vrHandButton.innerHTML = '2 Hands : Right Ray | Left Move';
	} else if(state === 'bothLeft'){
		vrHandButton.innerHTML = '2 Hands : Left Ray | Right Move';
	} else if(state === 'bothLeftLoco'){
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Left Move';
	} else if(state === 'bothRightLoco'){
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Right Move';
	} else if(state === 'right'){
		vrHandButton.innerHTML = '1 Hand : Right Ray | Belt Move';
	} else if(state === 'left'){
		vrHandButton.innerHTML = '1 Hand : Left Ray | Belt Move';
	}
	//Update State
	auxl.vrHand = state;
}

//Update Control Info
this.UpdateControlText = () => {
	auxl.controlsText = 'Control Configuration : ' + auxl.controls + ' mode\n';
	//Locomotion
	auxl.controlsText += 'Movement | ' + auxl.locomotionText + '\n';
	let actionCommand = '';
	for(let action in auxl.controlsInfo){
		if(action === 'altDown'){
			if(auxl.controls === 'Desktop'){
				actionCommand = 'Mouse Right Click';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'Middle Directional Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Grip';
			}
		} else if(action === 'altUp'){
		} else if(action === 'action1Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action1Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'A Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'X Button';
			}
		} else if(action === 'action1Up'){
		} else if(action === 'action2Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action2Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'B Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Y Button';
			}
		} else if(action === 'action2Up'){
		} else if(action === 'action3Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action3Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'C Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'A Button';
			}
		} else if(action === 'action3Up'){
		} else if(action === 'action4Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action4Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'D Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'B Button';
			}
		} else if(action === 'action4Up'){
		} else if(action === 'action5Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action5Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'E Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Alt Joystick Down';
			}
		} else if(action === 'action5Up'){
		} else if(action === 'action6Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action6Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'F Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Alt Joystick Up';
			}
		} else if(action === 'action6Up'){
		} else if(action === 'action7Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action7Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = '<- Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Alt Joystick Left';
			}
		} else if(action === 'action7Up'){
		} else if(action === 'action8Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action8Keys[1] + ' Key';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = '-> Button';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Alt Joystick Right';
			}
		} else if(action === 'action8Up'){
		} else {
			console.log('Failed to identify action')
		}


		auxl.controlsText += actionCommand + ' | ' + auxl.controlsInfo[action].name + ' : ' + auxl.controlsInfo[action].info + '\n';
	}
	auxl.controlsText += 'Click to Close Window'
	//console.log(auxl.controlsText);
}
//Update Controls
function updateControls(){
	auxl.UpdateControlText();
	auxl.local.profile.controls = auxl.controls;
	auxl.local.profile.vrHand = auxl.vrHand;
	auxl.saveToProfile();
}
//Menu Controls Button
function changeControls(){
	if(auxl.controls === 'Desktop'){
		controlsMenu('VR');
	} else if(auxl.controls === 'VR'){
		controlsMenu('Mobile');
	} else if(auxl.controls === 'Mobile'){
		controlsMenu('Desktop');
	}
	updateControls();
}
menuModeButton.addEventListener('click', changeControls);
//Cycle VR Configurations
function changeVRHand(){
	if(auxl.vrHand === 'bothRight'){
		vrHandMenu('bothLeft');
	} else if(auxl.vrHand === 'bothLeft'){
		vrHandMenu('bothLeftLoco');
	} else if(auxl.vrHand === 'bothLeftLoco'){
		vrHandMenu('bothRightLoco');
	} else if(auxl.vrHand === 'bothRightLoco'){
		vrHandMenu('right');
	} else if(auxl.vrHand === 'right'){
		vrHandMenu('left');
	} else if(auxl.vrHand = 'left') {
		vrHandMenu('bothRight');
	}
	updateControls();
}
vrHandButton.addEventListener('click', changeVRHand);
//Change Locomotion Direction Type
function changeLocoDirection(){
	if(auxl.directionType === 'camera'){
		auxl.directionType = 'controller';
		vrLocomotionType.innerHTML = 'Direction : Controller';
	} else {
		auxl.directionType = 'camera';
		vrLocomotionType.innerHTML = 'Direction : Camera';
	}
	updateControls();
}
vrLocomotionType.addEventListener('click', changeLocoDirection);

//
//Toggle Audio
function toggleAudio(){
	if(auxl.audioEnabled){
		auxl.audioEnabled = false;
		audioVolume.style.display = 'none';
		audioButton.innerHTML = 'Sound : Disabled';
	} else {
		auxl.audioEnabled = true;
		audioButton.innerHTML = 'Sound : Enabled';
		audioVolume.style.display = 'flex';
		volume.innerHTML = auxl.volume.toFixed(1);
	}
}
audioButton.addEventListener('click', toggleAudio);

//
//Volume Control
//Up
function audioUp(){
	auxl.volume += 0.1;
	if(auxl.volume > 2){
		auxl.volume = 2;
	}
	volume.innerHTML = auxl.volume.toFixed(1);
	auxl.local.profile.volume = auxl.volume;
	auxl.saveToProfile();
}
volUpButton.addEventListener('click', audioUp);
//Down
function audioDown(){
	auxl.volume -= 0.1;
	if(auxl.volume < 0){
		auxl.volume = 0;
	}
	volume.innerHTML = auxl.volume.toFixed(1);
	auxl.local.profile.volume = auxl.volume;
	auxl.saveToProfile();
}
volDownButton.addEventListener('click', audioDown);

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
//Toggle Data
function toggleData(){
	if(auxl.dataOpen){
		dataInfo.style.display = 'none';
		auxl.dataOpen = false;
	} else {
		dataInfo.style.display = 'flex';
		auxl.dataOpen = true;
	}
}
viewData.addEventListener('click', toggleData);
dataClose.addEventListener('click', toggleData);
//Reset Storage
function resetSystem(){
	//unload current world and reload default world
	auxl.comp.DespawnComp();
	let resetTimeout = setTimeout(function () {
		if(auxl.worldLoaded){
			auxl.currentWorld.StopWorld();
			startButton.innerHTML = 'Restart';
			auxl.worldLoaded = false;
		}
		auxl.systemLoaded(true);
		toggleData();
		clearTimeout(resetTimeout);
	}, 750);
}
resetData.addEventListener('click', resetSystem);
//Reset and Reload
function resetReload(){
	auxl.systemLoaded(true);
	window.location.reload();
}
//resetData.addEventListener('click', resetReload);



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
/*
let newColor1 = colorTheoryGen();
let newColor1 = colorTheoryGen('#00d3d3');
let newColor1 = colorTheoryGen(false, 'red');
console.log(newColor1.base);
console.log(newColor1.compl);
console.log(newColor1.splitCompl[0]);
console.log(newColor1.splitCompl[1]);
console.log(newColor1.triadic[0]);
console.log(newColor1.triadic[1]);
console.log(newColor1.tetradic[0]);
console.log(newColor1.tetradic[1]);
console.log(newColor1.tetradic[2]);
console.log(newColor1.analog[0]);
console.log(newColor1.analog[1]);
console.log(newColor1.analog[2]);
*/

//
//Name Generator

//Check for Duplicate Object
this.checkDupeName = (id) => {
	let name = id;
	let num = -1;
	idRandomize: while (true){
		if(auxl[name]){
			num++;
			name = id + 'Copy' + num;
			continue idRandomize;
		} else {
			if(id === name){} else {
				console.log(id + ' changed to ' + name);
			}
			return name;
		}
	}
}
//Randomly Generate a Name
this.ranNameGen = () => {
	let name = '';
	let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	let nameLength = Math.floor(Math.random()*12)+4;
	for(let letter = 0; letter < nameLength; letter++){
		name += alphabet[Math.floor(Math.random()*alphabet.length)]
	}
	return name;
}

//
//Pronoun Speech Assist
this.pronoun = (sex) => {
	let you = {};
		if(sex === 'male'){
			you.sex = 'male';
			you.sexe = 'man';
			you.sexes = 'men';
		} else if(sex === 'female'){
			you.sex = 'female';
			you.sexe = 'woman';
			you.sexes = 'women';
		} else if(sex === 'other'){
			you.sex = 'person';
			you.sexe = 'person';
			you.sexes = 'people';
		}
}

//
//Duplicate Core Data, Core, Layer Data or Layer

//Generate new Core Data from Template
this.coreDataFromTemplate = (data, edit, assign) => {
	//Omit 2 Keys from Object
	function omit(key1, key2, obj) {
	  const {[key1]: omitted1, [key2]: omitted2, ...rest} = obj;
	  return rest;
	}
	//Omit element/parent key that contains reference to original Core
	let newCoreData = omit('el', 'parent', data);
	newCoreData = JSON.parse(JSON.stringify(newCoreData));
	//Apply Edits
	if(edit){
		for(let each in edit){
			newCoreData[each] = edit[each];
		}
	}
	//Prevent Overwritting
	if(assign){}else{
		if(!edit.id){
			newCoreData.id = auxl.ranNameGen();
		}
		newCoreData.id = auxl.checkDupeName(newCoreData.id);
	}
	//Output
	if(assign){
		return newCoreData;
	} else {
		auxl[newCoreData.id] = newCoreData;
	}
}
//Generate new Core from Template
this.coreFromTemplate = (core, edit, assign) => {
	//Prevent Overwritting
	if(assign){}else{
		if(edit){
			if(!edit.id){
				edit.id = auxl.ranNameGen();
			}
		} else {
			edit = {};
			edit.id = auxl.ranNameGen();
		}
		edit.id = auxl.checkDupeName(edit.id);
	}
	let newCoreData = auxl.coreDataFromTemplate(core.core, edit, true);
	//Output
	if(assign){
		return auxl.Core(newCoreData)
	} else {
		auxl[newCoreData.id] = auxl.Core(newCoreData);
	}
}
//Generate new Layer from Layer Data Template
this.layerDataFromTemplate = (layer, changeParent, assign) => {
	let id = auxl.ranNameGen();
	id = auxl.checkDupeName(id);
	let newStruct = {};
	let num = 0;
	//Prep Parent Core Name
	if(changeParent){
		if(changeParent.id){}else{
			changeParent.id = id+num;
		}
	} else {
		changeParent = {};
		changeParent.id = id+num;
	}
	changeParent.id = auxl.checkDupeName(changeParent.id);
	//Traverse Layer Data Object
	function layerTraverse(structure, newStructure){
		for(let level in structure){
			if(structure[level].core){
				newStructure[level] = {};
				if(num === 0){
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, changeParent, true);
				} else {
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, {id:auxl.checkDupeName(id+num)}, true);
				}
				num++;
			} else {
				newStructure[level] = {};
				layerTraverse(structure[level], newStructure[level]);
			}
		}
	}
	layerTraverse(layer, newStruct);
	//Update Parent
	if(changeParent){
		for(let each in changeParent){
			newStruct.parent.core.core[each] = changeParent[each];
		}
	}
	//Output
	if(assign){
		return newStruct;
		//return auxl.Layer(id, newStruct, updateLayer)
	} else {
		auxl[id] = newStruct;
		//auxl[id] = auxl.Layer(id, newStruct, updateLayer);
	}
}
//Generate new Layer from Layer Template
this.layerFromTemplate = (layer, id, changeParent, updateLayer, assign) => {
	let struct;
	let newStruct = {};
	let num = 0;
	//Prevent Overwritting
	if(assign){}else{
		if(!id){
			id = auxl.ranNameGen();
		}
		id = auxl.checkDupeName(id);
	}
	//Prep Parent Core Name
	if(changeParent){
		if(changeParent.id){}else{
			changeParent.id = id+num;
		}
	} else {
		changeParent = {};
		changeParent.id = id+num;
	}
	changeParent.id = auxl.checkDupeName(changeParent.id);
	//Assign Layout from Existing Layer or Layer Data
	if(layer.layer){
		struct = layer.layer.all;
	} else {
		struct = layer;
	}
	//Traverse Layer Data Object
	function layerTraverse(structure, newStructure){
		for(let level in structure){
			if(structure[level].core){
				newStructure[level] = {};
				if(num === 0){
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, changeParent, true);
				} else {
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, {id:auxl.checkDupeName(id+num)}, true);
				}
				num++;
			} else {
				newStructure[level] = {};
				layerTraverse(structure[level], newStructure[level]);
			}
		}
	}
	layerTraverse(struct, newStruct);
	//Update Parent
	if(changeParent){
		for(let each in changeParent){
			newStruct.parent.core.core[each] = changeParent[each];
		}
	}
	//Output
	if(assign){
		return auxl.Layer(id, newStruct, updateLayer)
	} else {
		auxl[id] = auxl.Layer(id, newStruct, updateLayer);
	}
}

//
//DOM Scene

//Find Entity in Scene
this.findInScene = (item) => {
	let self = item;
	if(self.core){
		//console.log('Core');
		if(self.core.inScene){
			self = self.GetEl();
		} else {
			self = false;
		}
	} else if(self.layer){
		//console.log('Layer');
		if(self.layer.inScene){
			self = self.GetParentEl();
		} else {
			self = false;
		}
	} else if(self.id){
		//console.log('Entity');
	} else if(typeof self === 'string'){
		//console.log('ID');
		if(document.getElementById(self)){
			self = document.getElementById(self);
		} else {
			self = false;
		}
	}
	return self;
}

//Parent DOM Ent to other DOM Ent
this.attach = (child, parent) => {
	//Self
	let item = auxl.findInScene(child);
	//Parent
	let to = auxl.findInScene(parent);
	//Attach
	if(!item || !to){
		console.log('Failed to find Child or Parent');
	} else {
		to.appendChild(item);
	}
}
//Remove DOM Ent from parent DOM ent
this.detach = (child) => {
	//Self
	let item = auxl.findInScene(child);
	//Detach
	if(!item){
		console.log('Failed to find Child')
	} else {
		auxl.sceneEl.appendChild(item);
	}
}

//
//Object Generators

//
//Entity Core
//Single Base Object
this.Core = (data) => {
	let core = JSON.parse(JSON.stringify(data));
	core.inScene = false;
	core.el = {};
	core.dom = false;
	core.domTimeout;
	core.events = {};
	core.parent = false;
	core.gridSpawned = false;
	core.gridPath = [];
	core.pathSpeed = 1000;
	core.pathWait = 1000;
	core.pathRoute = 'any';
	core.pathLoop = 'infinite';
	core.pathType = 'jump';
	core.currentPath = -1;
	core.gridPathInterval;
	core.gridPathTimeout;
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
			if(document.getElementById(core.id)){
				core.el = document.getElementById(core.id);
			} else {
				core.el = document.createElement('a-entity');
			}
		} else if(core.entity){
			core.el = document.createElement(core.entity);
		} else {
			core.el = document.createElement('a-entity');
		}
		//Sound
		if(auxl.audioEnabled){
			let sound = {};
			if(core.sound){
				sound = JSON.parse(JSON.stringify(core.sound));
				if(!sound.volume){
					sound.volume = 1;
				}
				sound.volume *= auxl.volume;
				core.el.setAttribute('sound', sound);
			};
			if(core.sounds){
				for(let each in core.sounds){
					sound = JSON.parse(JSON.stringify(core.sounds[each]));
					if(!sound.volume){
						sound.volume = 1;
					}
					sound.volume *= auxl.volume;
					core.el.setAttribute('sound__'+each, sound);
				}
			};
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
		core.parent = parent || false;
		let preAdded = false;
		if(core.inScene){}else{
			//Generate Entity Element
			Generate();
			//Loading should only apply to gltf, obj and material textures
			if(load3D || loadMat){
				loading();
			}
			//Add to Scene or Parent
			if(core.entity === 'preAdded'){
				if(document.getElementById(core.id)){
					preAdded = true;
				}
			}
			if(preAdded){} else {
				if(core.parent){
					if(core.parent.core){
						//console.log('Core');
						if(core.parent.core.inScene){
							core.parent = core.parent.GetEl();
						} else {
							core.parent = false;
						}
					} else if(core.parent.layer){
						//console.log('Layer');
						if(parent.layer.inScene){
							core.parent = core.parent.GetParentEl();
						} else {
							core.parent = false;
						}
					} else if(core.parent.id){
						//console.log('Entity');
					} else if(typeof core.parent === 'string'){
						//console.log('ID');
						if(document.getElementById(core.parent)){
							core.parent = document.getElementById(core.parent);
						} else {
							core.parent = false;
						}
					}
					if(!core.parent){
						console.log(id);
						console.log(core.parent);
						console.log(document.getElementById(core.parent));
						console.log('Parent is not in scene!');
					} else {
						core.parent.appendChild(core.el);
					}
				} else {
					auxl.sceneEl.appendChild(core.el);
				}
			}
			//Loaded Events
			if(load3D){
				core.el.addEventListener('model-loaded', loaded);
			}
			if(loadMat){
				core.el.addEventListener('loaded', loaded);
			}
			//Link to DOM
			core.domTimeout = setTimeout(() => {
				core.dom = document.getElementById(core.id);
				//console.log(core.dom)
				clearTimeout(core.domTimeout);
			}, 100);

			core.inScene = true;
		}
	}
	//Despawn Entity Object
	const DespawnCore = () => {
		if(core.inScene){
			//Clear Core Timeout/Intervals
			clearTimeout(core.domTimeout);
			clearTimeout(core.gridPathTimeout);
			clearInterval(core.gridPathInterval);
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
			//Collision
			if(core.gridSpawned){
				if(core.grid.collide){
					auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, false);
				} else if(core.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, false);
				}
				core.gridSpawned = false;
			}
			//Remove from Scene or Parent
			if(core.parent){
				core.parent.removeChild(core.el);
			} else {
				auxl.sceneEl.removeChild(core.el);
			}
			//Scene Tracking Support
			if(auxl.ExistsInTracker(core.id)){
				auxl.RemoveFromTracker(core.id);
			}
			core.dom = false;
			core.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = (parent) => {
		let newParent = parent || false;
		if(newParent){
			core.parent = newParent;
		}
		if(core.inScene){
			DespawnCore();
		} else {
			SpawnCore(core.parent);
		}
	}
	//PosOnGrid
	function posOnGrid(grid){
		let pos = new THREE.Vector3(0,0,0);
		if(grid.start.x === grid.end.x && grid.start.z === grid.end.z){
			pos.x = grid.start.x;
			pos.z = grid.start.z;
		} else {
			let xDif = (grid.start.x - grid.end.x)*-1;
			let zDif = (grid.start.z - grid.end.z)*-1;
			xDif /= 2;
			zDif /= 2;
			pos.x = grid.start.x + xDif;
			pos.z = grid.start.z + zDif;
		}
		pos.y = grid.start.y;
		return pos;
	}
	//Spawn on Grid
	const SpawnCoreOnGrid = (grid) => {
		//Start should always be less than or equal to end
		//Start from top left to bottom right

		//Grid goes from 0 - 2 takes up 5 grid spaces of 0, 0.5, 1, 1.5, 2
		//5 spaces of 0.5 equals 2.5, so width or height would be 2.5
		if(core.inScene){}else{
			if(grid){
				core.grid = grid;
			}
			//Ensure Grid Y Level is Set
			if(core.grid.start.y){} else {
				core.grid.start.y = 0;
			}
			if(core.grid.end.y){} else {
				core.grid.end.y = 0;
			}
			if(core.grid.yOffset){} else {
				core.grid.yOffset = 0;
			}
			core.grid.height = Math.abs(core.grid.start.y) + Math.abs(core.grid.end.y) + 1;
			//Prevent Player Collision Overlap
			let playerGrid = auxl.player.GetPlayerInfo().grid;
			if(core.grid.start.x <= playerGrid.x && core.grid.end.x >= playerGrid.x && core.grid.start.y <= playerGrid.y && core.grid.end.y >= playerGrid.y && core.grid.start.z <= playerGrid.z && core.grid.end.z >= playerGrid.z){
				//Wait to Spawn till Player moves out of Range
				auxl.map.WaitToSpawn({name:core.id, func: 'SpawnCoreOnGrid'});
			} else {
				//Grid Position
				let startPos = posOnGrid(core.grid);
				core.position.x = startPos.x;
				core.position.y = core.grid.yOffset + startPos.y;
				core.position.z = startPos.z;
				//Spawn Core
				SpawnCore();
				//Collision or Trigger Map Update
				if(core.grid.collide){
					auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, core.grid.collide);
				} else if(core.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, core.grid.trigger);
				}
				core.gridSpawned = true;
			}
		}
	}
	//Toggle Grid Spawn
	const ToggleCoreGridSpawn = (grid) => {
		if(core.inScene){
			DespawnFromGrid();
		} else {
			SpawnOnGrid(grid);
		}
	}
	//Move on Grid
	const GridMove = (move, type) => {
		//with new start/end coords, check if free, if so move, otherwise wait till it is cleared
		//let gridMovement = {start:{x:0, z:-5}, end: {x:0, z:-5}};
		let gridMovement = {start:{}, end: {}};
		gridMovement.start.x = core.grid.start.x;
		gridMovement.start.y = core.grid.start.y;
		gridMovement.start.z = core.grid.start.z;
		gridMovement.end.x = core.grid.end.x;
		gridMovement.end.y = core.grid.end.y;
		gridMovement.end.z = core.grid.end.z;
		//Calc X
		if(move.x){
			gridMovement.start.x += move.x;
			gridMovement.end.x += move.x;
		}
		//Calc Y
		if(move.y){
			gridMovement.start.y += move.y;
			gridMovement.end.y += move.y;
		}
		//Calc Z
		if(move.z){
			gridMovement.start.z += move.z;
			gridMovement.end.z += move.z;
		}
		//Actual Position to Move Into
		let movePos = posOnGrid(gridMovement);
		//movePos.y = core.position.y;
		//Collision Move Checks
		if(core.grid.collide){
			if(auxl.map.CheckMapAreaSansArea(core.grid, gridMovement, core.grid.height)){
				//console.log('free')
				//Clear previous grid pos
				auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, false);
				//Update new grid pos
				auxl.map.UpdateMapArea(core.id, gridMovement.start, gridMovement.end, true);
				//Move Object
				if(core.pathType === 'anim'){
					//Animate Object Move
					if(move.x){
						EmitEvent('animstartx' + movePos.x);
					} else if(move.y){
						EmitEvent('animstarty' + movePos.y);
					} else if(move.z){
						EmitEvent('animstartz' + movePos.z);
					}
				} else if(core.pathType === 'jump'){
					//Jump Object Move
					ChangeSelf({property: 'position', value: movePos});
				}
				//Update core.grid with new grid pos
				core.grid.start.x = gridMovement.start.x;
				core.grid.start.y = gridMovement.start.y;
				core.grid.start.z = gridMovement.start.z;
				core.grid.end.x = gridMovement.end.x;
				core.grid.end.y = gridMovement.end.y;
				core.grid.end.z = gridMovement.end.z;
				return true;
			} else {
				//console.log('not free')
				return false;
			}
		} else if(core.grid.trigger){
			//Clear previous grid pos
			auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, false);
			//Update new grid pos
			auxl.map.UpdateMapAreaTrigger(core.id, gridMovement.start, gridMovement.end, true);
			//Move Object
			if(core.pathType === 'anim'){
				//Animate Object Move
				if(move.x){
					EmitEvent('animstartx' + movePos.x);
				} else if(move.y){
					EmitEvent('animstarty' + movePos.y);
				} else if(move.z){
					EmitEvent('animstartz' + movePos.z);
				}
			} else if(core.pathType === 'jump'){
				//Jump Object Move
				move.pos.y + core.grid.yOffset;
				ChangeSelf({property: 'position', value: movePos});
			}
			//Update core.grid with new grid pos
			core.grid.start.x = gridMovement.start.x;
			core.grid.start.y = gridMovement.start.y;
			core.grid.start.z = gridMovement.start.z;
			core.grid.end.x = gridMovement.end.x;
			core.grid.end.y = gridMovement.end.y;
			core.grid.end.z = gridMovement.end.z;

			return true;
		}
	}
	//Build Path
	const GridPath = (grid) => {
		//Update Speed & Type
		core.pathSpeed = grid.speed || 1000;
		core.pathWait = grid.wait || 1000;
		core.pathPatience = grid.patience || 3;
		core.pathRoute = grid.route || 'any';
		core.pathLoop = grid.loop || 'infinite';
		core.pathType = grid.type || 'jump';

		//Any will walk in either direction along path, each loop may continue or reverse, if blocked will reverse to start/end of path. Closed loops only
		//Circuit follows path from start to finish, if blocked it will go back to start and try again, otherwise it will keep looping. Closed loops only.
		//Alternate will walk to end of path and back, if blocked it will reverse to start/end of path and try again. Point A to Point B or Closed loops

		//Ensure Starting Position is Correct
		let startPos = posOnGrid(core.grid);

		core.position.x = startPos.x;
		if(startPos.y){
			core.position.y = startPos.y;
		}
		core.position.z = startPos.z;
		//Add Path Grid Points
		let step = 0.5;
		for(let each in grid.path){
			let steps = 1;
			for(let pos in grid.path[each]){
				if(pos === 'y'){
					if(grid.path[each][pos] > 0){
						step = 1;
					} else {
						step = -1;
					}
					steps = Math.abs(grid.path[each][pos]);
				} else {
					if(grid.path[each][pos] > 0){
						step = 0.5;
					} else {
						step = -0.5;
					}
					steps = Math.abs(grid.path[each][pos]/0.5);
				}
				for(let a = 0; a < steps; a++){
					core.gridPath.push({[pos]:step});
				}
			}
		}
		//Step Animations
		let key;
		let move;
		let currentX = core.position.x;
		let currentY = core.position.y;
		let currentZ = core.position.z;

		//Build Step Animations
		if(core.pathType === 'anim'){
			//Add 90 degree rotation anims
			for(let each in core.gridPath){
				let animMoveData = {
					name: 'animmove',
					property: 'object3D.position.x',
					to: 0,
					dur: core.pathSpeed,
					delay: 0,
					loop: false,
					dir: 'normal',
					easing: 'linear',
					elasticity: 400,
					autoplay: false,
					enabled: true,
					startEvents: 'moveXStart',
					pauseEvents: 'moveXStop',
				};
				//console.log(core.gridPath[each])
				//console.log(Object.keys(core.gridPath[each])[0])
				key = Object.keys(core.gridPath[each])[0];
				move = core.gridPath[each][key];

				animMoveData.property = 'object3D.position.' + key;
				if(key === 'x'){
					animMoveData.to = (currentX += move);
					animMoveData.name = 'animmove' + key + currentX;
					animMoveData.startEvents = 'animstart' + key + currentX;
					animMoveData.pauseEvents = 'animstop' + key + currentX;
				} else if(key === 'y'){
					animMoveData.to = (currentY += move) + core.grid.yOffset;
					animMoveData.name = 'animmove' + key + currentY;
					animMoveData.startEvents = 'animstart' + key + currentY;
					animMoveData.pauseEvents = 'animstop' + key + currentY;
				} else if(key === 'z'){
					animMoveData.to = (currentZ += move);
					animMoveData.name = 'animmove' + key + currentZ;
					animMoveData.startEvents = 'animstart' + key + currentZ;
					animMoveData.pauseEvents = 'animstop' + key + currentZ;
				}
				//Add Step Animations
				if(core.inScene){
					Animate(animMoveData);
				} else {
					if(Object.keys(core.animations).length === 0){
						core.animations = {};
					}
					delete animMoveData.name;
					core.animations['move'+each] = animMoveData;
				}
			}
		}
	}
	//Walk Along Path
	const WalkPath = () => {
		let movedX = true;
		let moveX = false;
		let movedY = true;
		let moveY = false;
		let movedZ = true;
		let moveZ = false;
		let loop = 0;
		let alternate = false;
		let stopped = 0;

		//Randomize Direction for Path Any
		if(core.pathRoute === 'any'){
			if(Math.random()*100 >50){
				alternate = true;
			}
		}
		//Alternate Direction
		function changeDirection(){
			if(alternate){
				alternate = false;
			} else {
				alternate = true;
			}
		}
		//Walk from Start of Path
		function walkFromStart(){
			core.currentPath = 0;
		}
		//Walk Forward Along Path
		function forward(){
			core.currentPath++;
			if(core.currentPath >= core.gridPath.length){
				if(core.pathLoop === 'infinite'){
				} else if(loop >= core.pathLoop){
					clearInterval(core.gridPathInterval);
				} else {
					loop++;
				}
				if(core.pathRoute === 'circuit'){
					walkFromStart();
				} else if(core.pathRoute === 'alternate'){
					walkFromEnd();
					changeDirection();
				} else if(core.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
					} else {
						walkFromEnd();
						changeDirection();
					}
				}
			}
		}
		//Walk from End of Path
		function walkFromEnd(){
			core.currentPath = core.gridPath.length-1;
		}
		//Walk Reverse Along Path
		function reverse(){
			core.currentPath--;
			if(core.currentPath < 0){
				if(core.pathLoop === 'infinite'){
				} else if(loop >= core.pathLoop){
					clearInterval(core.gridPathInterval);
				} else {
					loop++;
				}
				if(core.pathRoute === 'circuit'){
					if(alternate){
						walkFromStart();
						changeDirection();
					}
				} else if(core.pathRoute === 'alternate'){
					walkFromStart();
					changeDirection();
				} else if(core.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
						changeDirection();
					} else {
						walkFromEnd();
					}
				}
			}
		}
		//Walk Interval
		core.gridPathInterval = setInterval(() => {
			//Path Step Completed, Calc Next
			if(movedX && movedY && movedZ){
				//Path Direction
				if(core.pathRoute === 'circuit'){
					//forward();
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'alternate'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'any'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				}
				//Reset Path Step
				movedX = false;
				movedY = false;
				movedZ = false;
				//Step XYZ Movement
				if(core.gridPath[core.currentPath].x){
					moveX = true;
				} else {
					moveX = false;
				}
				if(core.gridPath[core.currentPath].y){
					moveY = true;
				} else {
					moveY = false;
				}
				if(core.gridPath[core.currentPath].z){
					moveZ = true;
				} else {
					moveZ = false;
				}
			}

			//X then Y then Z Movement
			if(moveX){
				if(alternate){
					movedX = GridMove({x:core.gridPath[core.currentPath].x*-1});
				} else {
					movedX = GridMove({x:core.gridPath[core.currentPath].x});
				}
				if(movedX){
					moveX = false;
					stopped = 0;
					//If X move only, ensure YZ is reset
					if(moveY){}else{
						movedY = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= core.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else if(moveY){
				if(alternate){
					movedY = GridMove({y:core.gridPath[core.currentPath].y*-1});
				} else {
					movedY = GridMove({y:core.gridPath[core.currentPath].y});
				}
				if(movedY){
					moveY = false;
					stopped = 0;
					//If Y move only, ensure XZ is reset
					if(moveX){}else{
						movedX = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= core.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else {
				if(moveZ){
					if(alternate){
						movedZ = GridMove({z:core.gridPath[core.currentPath].z*-1});
					} else {
						movedZ = GridMove({z:core.gridPath[core.currentPath].z});
					}
					if(movedZ){
						moveZ = false;
						stopped = 0;
						//If Z move only, ensure XY is reset
						if(moveX){}else{
							movedX = true;
						}
						if(moveY){}else{
							movedY = true;
						}
					} else {
						//Patience before reversing direction if blocked
						stopped++;
						if(stopped >= core.pathPatience){
							//reverse and restart
							movedX = true;
							movedY = true;
							movedZ = true;
							changeDirection();
						}
					}
				}
			}

		}, core.pathSpeed + core.pathWait);
/*
		core.gridPathInterval = setInterval(() => {
			//Path Step Completed, Calc Next
			if(movedX && movedZ){
				//Path Direction
				if(core.pathRoute === 'circuit'){
					//forward();
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'alternate'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'any'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				}
				//Reset Path Step
				movedX = false;
				movedZ = false;
				//Step XZ Movement
				if(core.gridPath[core.currentPath].x){
					moveX = true;
				} else {
					moveX = false;
				}
				if(core.gridPath[core.currentPath].z){
					moveZ = true;
				} else {
					moveZ = false;
				}
			}

			//X than Z Movement
			if(moveX){
				if(alternate){
					movedX = GridMove({x:core.gridPath[core.currentPath].x*-1});
				} else {
					movedX = GridMove({x:core.gridPath[core.currentPath].x});
				}
				if(movedX){
					moveX = false;
					stopped = 0;
					//If X move only, ensure movedZ is reset
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= core.pathPatience){
						//reverse and restart
						movedX = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else {
				if(moveZ){
					if(alternate){
						movedZ = GridMove({z:core.gridPath[core.currentPath].z*-1});
					} else {
						movedZ = GridMove({z:core.gridPath[core.currentPath].z});
					}
					if(movedZ){
						moveZ = false;
						stopped = 0;
						//If Z move only, ensure movedX is reset
						if(moveX){}else{
							movedX = true;
						}
					} else {
						//Patience before reversing direction if blocked
						stopped++;
						if(stopped >= core.pathPatience){
							//reverse and restart
							movedX = true;
							movedZ = true;
							changeDirection();
						}
					}
				}
			}

		}, core.pathSpeed + core.pathWait);
*/
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
	//Change Core - Single or Array
	const ChangeCore = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			core.el[propertyValue[each].property] = propertyValue[each].value;
		} else {
			core.el[propertyValue.property] = propertyValue.value;
		}
		if(core.inScene){
			ChangeSelf(propertyValue);
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
	//Physics Position
	const PhysPos = (pos) => {
		//Requires Dynamic or Static Body
 		if(typeof core.el.getAttribute('static-body') === 'object' || typeof core.el.getAttribute('dynamic-body') === 'object'){
			if(core.inScene){
				core.el.body.position.copy(pos);
			}
		} else {
			console.log('No physics body attached!');
		}
	}
	//Update Physics
	const UpdatePhys = (update) => {
		//Requires Dynamic or Static Body
 		if(typeof core.el.getAttribute('static-body') === 'object' || typeof core.el.getAttribute('dynamic-body') === 'object'){
			if(core.inScene){
				//core.el.body.position.copy(pos);
console.log(update)
/*
    [position] Vec3 optional
    [velocity] Vec3 optional
    [angularVelocity] Vec3 optional
    [quaternion] Quaternion optional
    [mass] Number optional
    [material] Material optional
    [type] Number optional
    [linearDamping=0.01] Number optional
    [angularDamping=0.01] Number optional
    [allowSleep=true] Boolean optional
    [sleepSpeedLimit=0.1] Number optional
    [sleepTimeLimit=1] Number optional
    [collisionFilterGroup=1] Number optional
    [collisionFilterMask=1] Number optional
    [fixedRotation=false] Boolean optional
    [shape] Body optional
*/
			}
		} else {
			console.log('No physics body attached!');
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
			console.log(core)
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
				auxl.saveToProfile({auxlObject: core.id, type: 'core', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			core[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: core.id, type: 'core', sub: false, name: flagValue.flag, data: flagValue.value});
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
			core.detailAll.DespawnLayer();
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

	return {core, Generate, SpawnCore, DespawnCore, ToggleSpawn, SpawnCoreOnGrid, ToggleCoreGridSpawn, RemoveComponent, GridMove, GridPath, WalkPath, ChangeSelf, ChangeCore, PhysPos, UpdatePhys, Animate, GetEl, EmitEvent, SetFlag, GetFlag, EnableDetail, DisableDetail};
}

//
//Layered Cores
//Multiple Entity Cores Combined
this.Layer = (id, all, update) => {
	let layer = {id, all};
	layer.inScene = false;
	layer.allNames = [];
	layer.children = {};
	layer.tempParents = [];
	layer.parent = false;
	layer.gridSpawned = false;
	layer.gridPath = [];
	layer.pathSpeed = 1000;
	layer.pathWait = 1000;
	layer.pathRoute = 'any';
	layer.pathLoop = 'infinite';
	layer.pathType = 'jump';
	layer.currentPath = -1;
	layer.gridPathInterval;
	layer.gridPathTimeout;
	if(update){
		for(let each in update){
			layer[each] = update[each];
		}
	}
	//Order of Elements Added to Scene
	let accessOrder = [];

	//Spawn Multi Entity Object
	const SpawnLayer = (parent) => {
		layer.parent = parent || false;
		if(parent){
			if(parent.core){
				//console.log('Core')
				if(parent.core.inScene){
					layer.parent = parent.GetEl();
				} else {
					layer.parent = false;
				}
			} else if(parent.layer){
				//console.log('Layer')
				if(parent.layer.inScene){
					layer.parent = parent.GetParentEl();
				} else {
					layer.parent = false;
				}
			} else if(parent.id){
				//console.log('Entity')
				layer.parent = parent;
			} else if(typeof parent === 'string'){
				//console.log('ID')
				if(document.getElementById(parent)){
					layer.parent = document.getElementById(parent);
				} else {
					layer.parent = false;
				}
			}
			if(!layer.parent){
				console.log(id);
				console.log(parent);
				console.log(document.getElementById(parent));
				console.log('Parent is not in scene!');
			}
		}
		if(layer.inScene){}else{
			let currentParent = layer.parent;
			let previousParent = false
			function spawnSection(sectionParent, object, depth) {
				currentParent = sectionParent || false;
				//New Depth Parent
				if(object.parent){
					layer.tempParents[depth] = object.parent.core.core.id;
				}
				for(let key in object){
					if(object.hasOwnProperty(key)){
						if(key === 'core'){
						//Access Order
						if(accessOrder.length === depth){
							accessOrder.push([]);
						}
						accessOrder[depth].push(object[key]);
						layer.allNames.push(object[key].core.id);
						//Skip Parent Spawns
						if(object[key].core.id === layer.all.parent.core.core.id || object[key].core.id === currentParent || object[key].core.id === layer.tempParents[depth] || object[key].core.id === layer.tempParents[depth-1]){} else {
							//Spawning Child
							layer.children[object[key].core.id] = {obj: object[key], parent: currentParent};
							object[key].SpawnCore(currentParent);
						}
						} else if(key === "parent" && object[key].hasOwnProperty('core')){
							//Access Order of Elements
							if(accessOrder.length === depth){
								accessOrder.push([]);
							}
							accessOrder[depth].push(object[key].core);

							//Update Current Parent
							if(object[key].core.core.id === layer.all.parent.core.core.id){
								//Main Layer Parent
								currentParent = layer.parent;
							} else if(object[key].core.core.id === currentParent || object[key].core.core.id === layer.tempParents[depth]){
								//Previous Depth Parent
								currentParent = layer.tempParents[depth-1];
							} else {
								//Current Depth Parent
								currentParent = layer.tempParents[depth];
							}

							//Spawn
							layer.children[object[key].core.id] = {obj: object[key], parent: currentParent};
							object[key].core.SpawnCore(currentParent);

							//Continue
							spawnSection(currentParent, object[key], depth + 1);
						} else if(typeof object[key] === 'object'){
							//Update Current Parent
							if(object[key].parent){
								currentParent = object[key].parent;
							} else {
								currentParent = layer.tempParents[depth];
							}
							//Continue
							spawnSection(currentParent, object[key], depth + 1);
						}
					}
				}
			}
			spawnSection(layer.parent, layer.all, 0);
			layer.inScene = true;
		}
	}
	//Despawn Multi Entity Object
	const DespawnLayer = () => {
		if(layer.inScene){
			//Clear Core Timeout/Intervals
			clearTimeout(layer.gridPathTimeout);
			clearInterval(layer.gridPathInterval);
			//Collision
			if(layer.gridSpawned){
				if(layer.grid.collide){
					auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, false);
				} else if(layer.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, false);
				}
			}
			let removeOrder = [...accessOrder];
			removeOrder.reverse();
			let levelOrder;
			for(let layer of removeOrder){
				levelOrder = [...layer];
				levelOrder.reverse();
				for(let each of levelOrder){
					each.DespawnCore();
				}
			}
			//Scene Tracking Support
			if(auxl.ExistsInTracker(layer.id)){
				auxl.RemoveFromTracker(layer.id);
			}
			layer.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = (parent) => {
		let newParent = parent || false;
		if(newParent){
			layer.parent = newParent;
		}
		if(layer.inScene){
			DespawnLayer();
		} else {
			SpawnLayer(layer.parent);
		}
	}
	//PosOnGrid
	function posOnGrid(grid){
		let pos = new THREE.Vector3(0,0,0);
		if(grid.start.x === grid.end.x && grid.start.z === grid.end.z){
			pos.x = grid.start.x;
			pos.z = grid.start.z;
		} else {
			let xDif = (grid.start.x - grid.end.x)*-1;
			let zDif = (grid.start.z - grid.end.z)*-1;
			xDif /= 2;
			zDif /= 2;
			pos.x = grid.start.x + xDif;
			pos.z = grid.start.z + zDif;
		}
		pos.y = grid.start.y;
		return pos;
	}
	//Spawn on Grid
	const SpawnLayerOnGrid = (grid) => {
		//Start should always be less than or equal to end
		//Start from top left to bottom right

		//Grid goes from 0 - 2 takes up 5 grid spaces of 0, 0.5, 1, 1.5, 2
		//5 spaces of 0.5 equals 2.5, so width or height would be 2.5
		if(layer.inScene){}else{
			if(grid){
				layer.grid = grid;
			}
			//Ensure Grid Y Level is Set
			if(layer.grid.start.y){} else {
				layer.grid.start.y = 0;
			}
			if(layer.grid.end.y){} else {
				layer.grid.end.y = 0;
			}
			//Prevent Player Collision Overlap
			let playerGrid = auxl.player.GetPlayerInfo().grid;
			if(layer.grid.start.x <= playerGrid.x && layer.grid.end.x >= playerGrid.x && layer.grid.start.y <= playerGrid.y && layer.grid.end.y >= playerGrid.y && layer.grid.start.z <= playerGrid.z && layer.grid.end.z >= playerGrid.z){
				//Wait to Spawn till Player moves out of Range
				auxl.map.WaitToSpawn({name:layer.id, func: 'SpawnLayerOnGrid'});
			} else {
				//Grid Position
				let startPos = posOnGrid(layer.grid);
				layer.all.parent.core.core.position.x = startPos.x;
				layer.all.parent.core.core.position.y = layer.all.parent.core.core.position.y + startPos.y;
				layer.all.parent.core.core.position.z = startPos.z;
				//Spawn Layer
				SpawnLayer();
				//Collision or Trigger Map Update
				if(layer.grid.collide){
					auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, layer.grid.collide);
				} else if(layer.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, layer.grid.trigger);
				}
				layer.gridSpawned = true;
			}
		}
	}
	//Toggle Grid Spawn
	const ToggleLayerGridSpawn = (grid) => {
		if(layer.inScene){
			DespawnFromGrid();
		} else {
			SpawnOnGrid(grid);
		}
	}
	//Move on Grid
	const GridMove = (move, type) => {
		//with new start/end coords, check if free, if so move, otherwise wait till it is cleared
		//let gridMovement = {start:{x:0, z:-5}, end: {x:0, z:-5}};
		let gridMovement = {start:{}, end: {}};
		gridMovement.start.x = layer.grid.start.x;
		gridMovement.start.y = layer.grid.start.y;
		gridMovement.start.z = layer.grid.start.z;
		gridMovement.end.x = layer.grid.end.x;
		gridMovement.end.y = layer.grid.end.y;
		gridMovement.end.z = layer.grid.end.z;
		//Calc X
		if(move.x){
			gridMovement.start.x += move.x;
			gridMovement.end.x += move.x;
		}
		//Calc Y
		if(move.y){
			gridMovement.start.y += move.y;
			gridMovement.end.y += move.y;
		}
		//Calc Z
		if(move.z){
			gridMovement.start.z += move.z;
			gridMovement.end.z += move.z;
		}
		//Actual Position to Move Into
		let movePos = posOnGrid(gridMovement);
		movePos.y = layer.all.parent.core.core.position.y + movePos.y;
		//Collision Move Checks
		if(layer.grid.collide){
			if(auxl.map.CheckMapAreaSansArea(layer.grid, gridMovement)){
				//console.log('free')
				//Clear previous grid pos
				auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, false);
				//Update new grid pos
				auxl.map.UpdateMapArea(layer.id, gridMovement.start, gridMovement.end, true);
				//Move Object
				if(layer.pathType === 'anim'){
					//Animate Object Move
					if(move.x){
						EmitEventParent('animstartx' + movePos.x);
					} else if(move.y){
						EmitEventParent('animstarty' + movePos.y);
					} else if(move.z){
						EmitEventParent('animstartz' + movePos.z);
					}
				} else if(layer.pathType === 'jump'){
					//Jump Object Move
					ChangeParent({property: 'position', value: movePos});
				}
				//Update core.grid with new grid pos
				layer.grid.start.x = gridMovement.start.x;
				layer.grid.start.y = gridMovement.start.y;
				layer.grid.start.z = gridMovement.start.z;
				layer.grid.end.x = gridMovement.end.x;
				layer.grid.end.y = gridMovement.end.y;
				layer.grid.end.z = gridMovement.end.z;
				return true;
			} else {
				//console.log('not free')
				return false;
			}
		} else if(layer.grid.trigger){
			//Clear previous grid pos
			auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, false);
			//Update new grid pos
			auxl.map.UpdateMapAreaTrigger(layer.id, gridMovement.start, gridMovement.end, true);
			//Move Object
			if(layer.pathType === 'anim'){
				//Animate Object Move
				if(move.x){
					EmitEventParent('animstartx' + movePos.x);
				} else if(move.y){
					EmitEventParent('animstarty' + movePos.y);
				} else if(move.z){
					EmitEventParent('animstartz' + movePos.z);
				}
			} else if(layer.pathType === 'jump'){
				//Jump Object Move
				ChangeParent({property: 'position', value: movePos});
			}
			//Update core.grid with new grid pos
			layer.grid.start.x = gridMovement.start.x;
			layer.grid.start.y = gridMovement.start.y;
			layer.grid.start.z = gridMovement.start.z;
			layer.grid.end.x = gridMovement.end.x;
			layer.grid.end.y = gridMovement.end.y;
			layer.grid.end.z = gridMovement.end.z;
			return true;
		}
	}
	//Build Path
	const GridPath = (grid) => {
		//Update Speed & Type
		layer.pathSpeed = grid.speed || 1000;
		layer.pathWait = grid.wait || 1000;
		layer.pathPatience = grid.patience || 3;
		layer.pathRoute = grid.route || 'any';
		layer.pathLoop = grid.loop || 'infinite';
		layer.pathType = grid.type || 'jump';

		//Any will walk in either direction along path, each loop may continue or reverse, if blocked will reverse to start/end of path. Closed loops only
		//Circuit follows path from start to finish, if blocked it will go back to start and try again, otherwise it will keep looping. Closed loops only.
		//Alternate will walk to end of path and back, if blocked it will reverse to start/end of path and try again. Point A to Point B or Closed loops

		//Ensure Starting Position is Correct
		let startPos = posOnGrid(layer.grid);
		layer.all.parent.core.core.position.x = startPos.x;
		if(startPos.y){
			layer.all.parent.core.core.position.y = layer.all.parent.core.core.position.y + startPos.y;
		}
		layer.all.parent.core.core.position.z = startPos.z;

		//Add Path Grid Points
		let step = 0.5;
		for(let each in grid.path){
			let steps = 1;
			for(let pos in grid.path[each]){
				if(grid.path[each][pos] > 0){
					step = 0.5;
				} else {
					step = -0.5;
				}
				if(pos === 'y'){
					steps = Math.abs(grid.path[each][pos]);
				} else {
					steps = Math.abs(grid.path[each][pos])/0.5;
				}
				for(let a = 0; a < steps; a++){
					layer.gridPath.push({[pos]:step});
				}
			}
		}

		//Step Animations
		let key;
		let move;
		let currentX = layer.all.parent.core.core.position.x;
		let currentY = layer.all.parent.core.core.position.y;
		let currentZ = layer.all.parent.core.core.position.z;

		//Build Step Animations
		if(layer.pathType === 'anim'){
			//Add 90 degree rotation anims

			for(let each in layer.gridPath){
				let animMoveData = {
					name: 'animmove',
					property: 'object3D.position.x',
					to: 0,
					dur: layer.pathSpeed,
					delay: 0,
					loop: false,
					dir: 'normal',
					easing: 'linear',
					elasticity: 400,
					autoplay: false,
					enabled: true,
					startEvents: 'moveXStart',
					pauseEvents: 'moveXStop',
				};
				//console.log(layer.gridPath[each])
				//console.log(Object.keys(layer.gridPath[each])[0])
				key = Object.keys(layer.gridPath[each])[0];
				move = layer.gridPath[each][key];

				animMoveData.property = 'object3D.position.' + key;
				if(key === 'x'){
					animMoveData.to = (currentX += move);
					animMoveData.name = 'animmove' + key + currentX;
					animMoveData.startEvents = 'animstart' + key + currentX;
					animMoveData.pauseEvents = 'animstop' + key + currentX;
				} else if(key === 'y'){
					animMoveData.to = (currentY += move);
					animMoveData.name = 'animmove' + key + currentY;
					animMoveData.startEvents = 'animstart' + key + currentY;
					animMoveData.pauseEvents = 'animstop' + key + currentY;
				} else if(key === 'z'){
					animMoveData.to = (currentZ += move);
					animMoveData.name = 'animmove' + key + currentZ;
					animMoveData.startEvents = 'animstart' + key + currentZ;
					animMoveData.pauseEvents = 'animstop' + key + currentZ;
				}
				//Add Step Animations
				if(layer.inScene){
					AnimateParent(animMoveData);
				} else {
					if(Object.keys(layer.all.parent.core.core.animations).length === 0){
						layer.all.parent.core.core.animations = {};
					}
					delete animMoveData.name;
					layer.all.parent.core.core.animations['move'+each] = animMoveData;
				}
			}
		}
	}
	//Walk Along Path
	const WalkPath = () => {
		let movedX = true;
		let moveX = false;
		let movedY = true;
		let moveY = false;
		let movedZ = true;
		let moveZ = false;
		let loop = 0;
		let alternate = false;
		let stopped = 0;

		//Randomize Direction for Path Any
		if(layer.pathRoute === 'any'){
			if(Math.random()*100 >50){
				alternate = true;
			}
		}
		//Alternate Direction
		function changeDirection(){
			if(alternate){
				alternate = false;
			} else {
				alternate = true;
			}
		}
		//Walk from Start of Path
		function walkFromStart(){
			layer.currentPath = 0;
		}
		//Walk Forward Along Path
		function forward(){
			layer.currentPath++;
			if(layer.currentPath >= layer.gridPath.length){
				if(layer.pathLoop === 'infinite'){
				} else if(loop >= layer.pathLoop){
					clearInterval(layer.gridPathInterval);
				} else {
					loop++;
				}
				if(layer.pathRoute === 'circuit'){
					walkFromStart();
				} else if(layer.pathRoute === 'alternate'){
					walkFromEnd();
					changeDirection();
				} else if(layer.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
					} else {
						walkFromEnd();
						changeDirection();
					}
				}
			}
		}
		//Walk from End of Path
		function walkFromEnd(){
			layer.currentPath = layer.gridPath.length-1;
		}
		//Walk Reverse Along Path
		function reverse(){
			layer.currentPath--;
			if(layer.currentPath < 0){
				if(layer.pathLoop === 'infinite'){
				} else if(loop >= layer.pathLoop){
					clearInterval(layer.gridPathInterval);
				} else {
					loop++;
				}
				if(layer.pathRoute === 'circuit'){
					if(alternate){
						walkFromStart();
						changeDirection();
					}
				} else if(layer.pathRoute === 'alternate'){
					walkFromStart();
					changeDirection();
				} else if(layer.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
						changeDirection();
					} else {
						walkFromEnd();
					}
				}
			}
		}
		//Walk Interval
		layer.gridPathInterval = setInterval(() => {
			//Path Step Completed, Calc Next
			if(movedX && movedY && movedZ){
				//Path Direction
				if(layer.pathRoute === 'circuit'){
					//forward();
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(layer.pathRoute === 'alternate'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(layer.pathRoute === 'any'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				}
				//Reset Path Step
				movedX = false;
				movedY = false;
				movedZ = false;
				//Step XYZ Movement
				if(layer.gridPath[layer.currentPath].x){
					moveX = true;
				} else {
					moveX = false;
				}
				if(layer.gridPath[layer.currentPath].y){
					moveY = true;
				} else {
					moveY = false;
				}
				if(layer.gridPath[layer.currentPath].z){
					moveZ = true;
				} else {
					moveZ = false;
				}
			}

			//X then Y then Z Movement
			if(moveX){
				if(alternate){
					movedX = GridMove({x:layer.gridPath[layer.currentPath].x*-1});
				} else {
					movedX = GridMove({x:layer.gridPath[layer.currentPath].x});
				}
				if(movedX){
					moveX = false;
					stopped = 0;
					//If X move only, ensure YZ is reset
					if(moveY){}else{
						movedY = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= layer.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else if(moveY){
				if(alternate){
					movedY = GridMove({y:layer.gridPath[layer.currentPath].y*-1});
				} else {
					movedY = GridMove({y:layer.gridPath[layer.currentPath].y});
				}
				if(movedY){
					moveY = false;
					stopped = 0;
					//If Y move only, ensure XZ is reset
					if(moveX){}else{
						movedX = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= layer.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else {
				if(moveZ){
					if(alternate){
						movedZ = GridMove({z:layer.gridPath[layer.currentPath].z*-1});
					} else {
						movedZ = GridMove({z:layer.gridPath[layer.currentPath].z});
					}
					if(movedZ){
						moveZ = false;
						stopped = 0;
						//If Z move only, ensure XY is reset
						if(moveX){}else{
							movedX = true;
						}
						if(moveY){}else{
							movedY = true;
						}
					} else {
						//Patience before reversing direction if blocked
						stopped++;
						if(stopped >= layer.pathPatience){
							//reverse and restart
							movedX = true;
							movedY = true;
							movedZ = true;
							changeDirection();
						}
					}
				}
			}

		}, layer.pathSpeed + layer.pathWait);
	}
	//Return Parent Element in Scene
	const GetParentEl = () => {
		return layer.all.parent.core.GetEl();
	}
	//Return a Child Element in Scene
	const GetChildEl = (child) => {
		let childCore = GetChild(child);
		if(childCore){
			return childCore.GetEl();
		}
	}
	//Return Only Child Elements in Scene
	const GetAllChildEl = () => {
		let allEl = [];
		for(let each in layer.allNames){
			if(layer.allNames[each] === layer.all.parent.core.core.id){} else {
				allEl.push(GetChildEl(layer.allNames[each]));
			}
		}
		return allEl;
	}
	//Return All Elements in Scene
	const GetAllEl = () => {
		let allEl = [];
		for(let each in layer.allNames){
			allEl.push(GetChildEl(layer.allNames[each]));
		}
		return allEl;
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
			console.log(childName)
			return false;
		}
	}

	return {layer, SpawnLayer, DespawnLayer, ToggleSpawn, SpawnLayerOnGrid, ToggleLayerGridSpawn, GridMove, GridPath, WalkPath, GetParentEl, GetChildEl, GetAllChildEl, GetAllEl, EmitEventParent, EmitEventChild, EmitEventAll, ChangeParent, ChangeChild, ChangeAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, AnimateParent, AnimateChild, AnimateAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, EnableDetailParent, EnableDetailChild, EnableDetailAll, DisableDetailParent, DisableDetailChild, DisableDetailAll, GetChild};
}


//
//Player
//User Controller, Settings and Actions
this.Player = (id,layer) => {
	//Build directly off of imported Layer and load right away as only single player is supported

	//Player Name
	layer.id = id;

	//Update Layer Copy
	//layer.layer.all.parent.core.core.id = id;

	//Default Transition Type
	//instant
	//fade
	//sphere
	//blink
	layer.transition = {};
	layer.transition.id = '000000';
	layer.transition.scene = 'fade';
	layer.transition.teleport = 'fade';
	layer.teleporting = false;
	//Notifications
	let notificationTimeout;
	let displayTime;
	//Lock/Unlock Movement
	layer.move = false;
	//Locomotion Type
	layer.moveType = {pov : '1st', axis : 'posXYZ', style : 'free'}
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
	//Rotate 90
	let anim90Data = {
		name: 'anim90',
		property: 'object3D.rotation.y',
		from: '0',
		to: '90', 
		dur: 250,
		delay: 0, 
		loop: 'false', 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};
	//Belt Inventory, Toggle & Text
	layer.beltDisplay = true;
	layer.beltDefaultText = 'Hello World!';
	layer.beltText = 'Hello World!';

	//Flashlight
	layer.flashlight = false;
	//Info Text
	layer.infoText = 'Player :\n'

	//Collision
	layer.gridPos = new THREE.Vector3(0,0,0);
	layer.gridDirection = 'still';
	//forwardRight
	//forwardLeft
	//reverseRight
	//reverseLeft
	//forward
	//reverse
	//right
	//left

	//Item|Tool|Key|Special Equipped
	layer.equipped = false;
	layer.equippedObject = 'none';

	//Menu Toggle
	layer.menuToggle = true;

	//Spawn Player
	layer.SpawnLayer();
	//Currently not tracking Player object as it should not be removed
	//Grab HTML Elements that have spawned
	id = document.getElementById(layer.id);
	playerRig = document.getElementById('playerRig');
	playerBody = document.getElementById('playerBody');
	camera = document.getElementById('camera');
	cameraUI = document.getElementById('cameraUI');
	playerFloor = document.getElementById('playerFloor');
	playerBeltUI = document.getElementById('playerBeltUI');
	playerBeltText = document.getElementById('playerBeltText');
	mouseController = document.getElementById('mouseController');
	vrController1 = document.getElementById('vrController1');
	vrController1UI = document.getElementById('vrController1UI');
	vrController2 = document.getElementById('vrController2');
	vrController2UI = document.getElementById('vrController2UI');

	//Update Current Position
	layer.gridPos.copy(playerRig.getAttribute('position'));

	//Reset to Defaults
	const Reset = () => {
		layer.transition = {};
		layer.transition.id = '000000';
		layer.transition.scene = 'fade';
		layer.transition.teleport = 'fade';
		layer.teleporting = false;
		//Sitting or Standing Mode
		layer.stand = true;
		//Duck | Standing
		layer.standing = true;
		layer.animating = false;
		//Snap Rotation
		layer.snapRotating = false;
		//Belt Inventory, Toggle & Text
		layer.beltDisplay = true;
		layer.beltDefaultText = 'Hello World!';
		layer.beltText = 'Hello World!';
		//Flashlight
		layer.flashlight = false;
		//Info Text
		layer.infoText = 'Player :\n'
	}
	//Scene Load Animation Support
	const PlayerSceneAnim = () => {
		//Minimum Anim Delay if assets don't need loading
		let animTimeout0 = setTimeout(function () {
			if(auxl.loadingScene){} else {
				auxl.loadingScene = true;
			}
			clearTimeout(animTimeout0);
		}, 800);
		if(layer.teleporting){} else {
			layer.teleporting = true;
			if(layer.transition.scene === 'blink'){
				DisableClick();
				layer.GetChild('blink1Screen').ChangeSelf({property: 'visible', value: 'true'});
				layer.GetChild('blink2Screen').ChangeSelf({property: 'visible', value: 'true'});
				layer.GetChild('blink1Screen').EmitEvent('blinkScene1');
				layer.GetChild('blink2Screen').EmitEvent('blinkScene1');
			} else if(layer.transition.scene === 'fade'){
				DisableClick();
				layer.GetChild('fadeScreen').ChangeSelf({property: 'visible', value: 'true'});
				layer.GetChild('fadeScreen').EmitEvent('fadeScene1');

			} else if(layer.transition.scene === 'sphere'){
				DisableClick();
					layer.GetChild('sphereScreen').ChangeSelf({property: 'visible', value: 'true'});
					layer.GetChild('sphereScreen').EmitEvent('sphereScene1');
			} else if(layer.transition.scene === 'instant'){
				DisableClick();
			}
		}
	}
	//Update Scene Transition Style
	const UpdateSceneTransitionStyle = (style) => {
		layer.transition.scene = style;
	}
	//Player Transition Animation
	const PlayerTeleportAnim = () => {
		let animTimeout;
		if(auxl.player.layer.teleporting){} else {
			auxl.player.layer.teleporting = true;
			if(auxl.player.layer.transition.teleport === 'blink'){
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
			} else if (auxl.player.layer.transition.teleport === 'fade'){
				auxl.player.TempDisableClick();
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.fadeScreen.EmitEvent('fade');
				animTimeout = setTimeout(function () {
					auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition.teleport === 'sphere'){
				auxl.player.TempDisableClick();
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.sphereScreen.EmitEvent('sphere');
				animTimeout = setTimeout(function () {
					auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition.teleport === 'instant'){
				animTimeout = setTimeout(function () {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			} else if (auxl.player.layer.transition.teleport === 'locomotion'){
				animTimeout = setTimeout(function () {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			}
		}
	}
	//Update Scene Transition Style
	const UpdateTeleportTransitionStyle = (style) => {
		layer.transition.teleport = style;
	}
	//Change Player Transition Color
	const UpdateTransitionColor = (newColor) => {
		auxl.fadeScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.sphereScreen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink1Screen.ChangeSelf({property: 'material', value:{color: newColor}});
		auxl.blink2Screen.ChangeSelf({property: 'material', value:{color: newColor}});
	}
	//Toggle Belt Text
	const ToggleBeltText = () => {
		if(layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'visible', value:false})
			layer.beltDisplay = false;
		} else {
			auxl.playerBeltText.ChangeSelf({property: 'visible', value:true})
			UpdateBeltText();
			layer.beltDisplay = true;
		}
	}
	playerFloor.addEventListener('click',ToggleBeltText);
	//Update Belt Text
	const UpdateBeltText = (text) => {
		if(text){
			layer.beltText = text;
		}
		if(layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'text', value:{value: layer.beltText}})
		}

	}
	//Update UI Text
	const UpdateUIText = (text) => {
		UpdateSystemText(text);
		if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight'){
				auxl.vrController2.ChangeSelf({property: 'text', value: text});
			} else if(auxl.vrHand === 'bothLeft'){
				auxl.vrController1.ChangeSelf({property: 'text', value: text});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'text', value: text});
				auxl.vrController2.ChangeSelf({property: 'text', value: text});
			} else if(auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'text', value: text});
			} else if(auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'text', value: text});
			}
		}
	}
	//Display Camera UI Notification
	const Notification = (notificationInfo) => {
		displayTime = notificationInfo.time || 2750;
		TempDisableClick(displayTime);
		auxl.cameraUI.ChangeSelf({property: 'text', value: {value: notificationInfo.message, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
		auxl.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
		auxl.cameraUI.EmitEvent('cameraMsg');
		notificationTimeout = setTimeout(function () {
			auxl.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(notificationTimeout);
		}, displayTime);
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
	//Unlock Locomotion
	const UnlockLocomotion = () => {
		layer.move = true;
	}
	//Lock Locomotion
	const LockLocomotion = () => {
		layer.move = false;
	}
	//Enable VR Controller Joystick Locomotion
	const EnableVRLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'vr'});
		UnlockLocomotion();
	}
	//Enable VR Belt UI Locomotion
	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer();
		}
		playerRig.setAttribute('locomotion',{uiid: 'beltUIParent', courserid: 'mouseController', movetype: 'vrHover'});
		UnlockLocomotion();
	}
	//Enable Desktop Locomotion
	const EnableDesktopLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'desktop'});
		UnlockLocomotion();
	}
	//Enable Mobile Locomotion
	const EnableMobileLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'mobile'});
		UnlockLocomotion();
	}
	//Change Locomotion Type
	const ChangeLocomotionType = (type) => {
		if(type.pov){
			layer.moveType.pov = type.pov;
		}
		if(type.axis){
			layer.moveType.axis = type.axis;
		}
		if(type.style){
			layer.moveType.style = type.style;
		}
		playerRig.setAttribute('locomotion',{pov: layer.moveType.pov, axis: layer.moveType.axis, style: layer.moveType.style});
		/*
		pov :
		1st
		3rd

		style :
		free
		grid

		axis :
		posXZ
		posXZY
		posXY
		posXYZ
		posXYZWall
		angleXY
		angleXYZ
		*/
	}
	//Despawn VR Belt UI
	const RemoveBelt = () => {
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.DespawnLayer();
		}
	}
	//Toggle Sitting|Standing View Mode
	const ToggleSittingMode = () => {
		if(layer.animating){} else {
			layer.animating = true;
			if(layer.stand){
				auxl.playerBody.EmitEvent('sit');
				layer.stand = false;
			} else {
				auxl.playerBody.EmitEvent('stand');
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
					auxl.playerBody.EmitEvent('crouchDownStanding');
					layer.standing = false;
				} else {
					let standPos = new THREE.Vector3(0,0,0);
					standPos.copy(layer.gridPos);
					standPos.y += 1;
					if(auxl.map.CheckMapObstaclesDiagonal(standPos,layer.gridPos)){
						auxl.playerBody.EmitEvent('crouchUpStanding');
						layer.standing = true;
					}

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
					auxl.playerBody.EmitEvent('crouchDownSitting');
					layer.standing = false;
				} else {
					let standPos = new THREE.Vector3(0,0,0);
					standPos.copy(layer.gridPos);
					standPos.y += 1;
					if(auxl.map.CheckMapObstaclesDiagonal(standPos,layer.gridPos)){
						auxl.playerBody.EmitEvent('crouchUpSitting');
						layer.standing = true;
					}
				}
				crouchTimeout = setTimeout(function () {
					layer.animating = false;
					clearTimeout(crouchTimeout);
				}, 775);
			}
		}
	}
	//Play Snap View Anim to the Right 45degrees
	const SnapRight45 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY - 45;
			auxl.playerBody.Animate(anim45Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim45Data.dur+10);
		}
	}
	//Play Snap View Anim to the Left 45degrees
	const SnapLeft45 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY + 45;
			auxl.playerBody.Animate(anim45Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim45Data.dur+10);
		}
	}
	//Play Snap View Anim to the Right 90degrees
	const SnapRight90 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY - 90;
			auxl.playerBody.Animate(anim90Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim90Data.dur+10);
		}
	}
	//Play Snap View Anim to the Left 90degrees
	const SnapLeft90 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY + 90;
			auxl.playerBody.Animate(anim90Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim90Data.dur+10);
		}
	}
	//Flashlight
	const ToggleFlashlight = () => {
		if(layer.flashlight){
			if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
				auxl.camera.RemoveComponent('light');
			} else if(auxl.controls === 'VR'){
				if(auxl.vrHand === 'bothRight' || auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'right'){
					auxl.vrController2.RemoveComponent('light');
				} else {
					auxl.vrController1.RemoveComponent('light');
				}
			}
			layer.flashlight = false;
		} else {
			if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
				auxl.camera.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.5, distance: 15, decay: 0.3, penumbra: 0.15, angle: 25,}});
			} else if(auxl.controls === 'VR'){
				if(auxl.vrHand === 'bothRight' || auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'right'){
					auxl.vrController2.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.5, distance: 15, decay: 0.3, penumbra: 0.15, angle: 25,}});
				} else {
					auxl.vrController1.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.5, distance: 15, decay: 0.3, penumbra: 0.15, angle: 25,}});
				}
			}
			layer.flashlight = true;
		}
	}
	//Reset User Position/Rotation
	const ResetUserPosRot = () => {
		//Reset Rotation
		auxl.playerRig.ChangeSelf({property: 'position', value: new THREE.Vector3(0,0,1)});
		//Update Grid Position
		layer.gridPos.copy(playerRig.getAttribute('position'));
		//Reset Rotation via playerBody
		let y = auxl.camera.GetEl().getAttribute('rotation').y;
		if(y > 0){
			if(y<360){
				y = y % 360;
			}
		} else if(y < 0){
			if(y < -360){
				y = y % 360;
			}
		}
		auxl.playerBody.ChangeSelf({property:'rotation',value:new THREE.Vector3(0,(y*-1)+1,0)});

	}
	//Get user current infomation
	const GetPlayerInfo = () => {

		return {layer, id: layer.layer.all.parent.core.core.id, pos: playerRig.getAttribute('position'), bodyRot: playerBody.getAttribute('rotation'), headRot: camera.getAttribute('rotation'), grid:layer.gridPos};
	}
	//Attach to user
	const AttachToPlayer = (element,offset) => {
		let connectPos = new THREE.Vector3(0,0,0);
		if(offset){
			connectPos.x += offset.x;
			connectPos.y += offset.y;
			connectPos.z += offset.z;
		}
		element.setAttribute('sync-pos',{idname: layer.id, position: connectPos});
	}
	//Deattach from user
	const DetachFromPlayer = (element) => {
		element.removeAttribute('sync-pos');
	}
	//Equip Object|Tool
	const Equip = (object) => {
		let hold = false;
		if(layer.equipped){
			if(object === layer.equippedObject){
				Unequip();
			} else {
				hold = true;
			}
		} else {
			hold = true;
		}
		if(hold){
			layer.equipped = true;
			layer.equippedObject = object;
			let beltText = 'Equipped : ' + auxl[object].name;
			UpdateBeltText(beltText);
		}
	}
	//Unequip Object|Tool
	const Unequip = () => {
		layer.equipped = false;
		layer.equippedObject = 'none';
		UpdateBeltText(auxl.systemText);
	}
	//Toggle Companion | Menu Back
	const MainMenuAction = () => {
		//if comp is spawned
		if(layer.menuToggle){
			layer.menuToggle = false;
			let toggleTimeout = setTimeout(() => {
				layer.menuToggle = true;
				clearTimeout(toggleTimeout);
			}, 350);
			if(auxl.comp.comp.inScene){
				if(auxl.mainMenu.multiMenu.menuOpen){
					auxl.mainMenu.ToggleMenu();
				} else {
					auxl.comp.DespawnComp();
				}
			} else {
				auxl.comp.SpawnComp();
			}
		}
	}

	//Assign to each joystick, 
	//Player Rotation
	const UpdatePlayerRotation = (axisX,axisY,axisZ) => {

		let div = new THREE.Vector3(0,0,0);
		div.x = axisX;
		div.y = axisY;
		div.z = axisZ;

		auxl.playerBody.ChangeSelf({property: 'rotation', value: div});



		//auxl.playerRig.ChangeSelf({property: 'rotation', value: new THREE.Vector3(0,0,0)});

		//This technically works and sets it, but it doesn't actually change it. Look-Controls prevents this?
		//auxl.camera.ChangeSelf({property: 'rotation', value: new THREE.Vector3(0,0,0)});

		//For example
		/*
		let currentCameraRot = auxl.camera.GetEl().getAttribute('rotation');
		console.log(currentCameraRot);

		auxl.camera.ChangeSelf({property: 'rotation', value: new THREE.Vector3(0,0,0)});

		currentCameraRot = auxl.camera.GetEl().getAttribute('rotation');
		console.log(currentCameraRot);
		*/

		//Workaround could read current rotation and rotate playerRig to compensate




	}
	//Player Position
	const UpdatePlayerPosition = (position) => {
		let pos = new THREE.Vector3(0,0,0);
		pos.x = position.x || 0;
		pos.y = position.y || 0;
		pos.z = position.z || 0;
		//Configured to non-physics only currently
		auxl.playerRig.ChangeSelf({property: 'position', value: pos});
		layer.gridPos.copy(pos);
	}
	//Player Twist
	const TwistTo = (yRot) => {

		//Reset Rotation via playerBody
		let y = auxl.camera.GetEl().getAttribute('rotation').y;
		if(y > 0){
			if(y<360){
				y = y % 360;
			}
		} else if(y < 0){
			if(y < -360){
				y = y % 360;
			}
		}
		let rot = new THREE.Vector3(0,((y*-1)+1)+yRot,0);
		auxl.playerBody.ChangeSelf({property:'rotation',value:rot});
	}
	//Player Forward Position
	//going forward will be a trigger / grip action
	const Forward = (speed, div) => {
		return div += layer.speed;
	}

	const Speed = (velocity) => {
		layer.speed = velocity;

	}

	//Testing Function
	const TestFunc = (params) => {
		console.log(params);
	}

	return {layer, Reset, PlayerSceneAnim, UpdateSceneTransitionStyle, PlayerTeleportAnim, UpdateTeleportTransitionStyle, UpdateTransitionColor, UpdateUIText, ToggleBeltText, UpdateBeltText, Notification, TempDisableClick, DisableClick, EnableClick, UnlockLocomotion, LockLocomotion, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, ChangeLocomotionType, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight45, SnapLeft45, SnapRight90, SnapLeft90, ToggleFlashlight, ResetUserPosRot,GetPlayerInfo, AttachToPlayer, Equip, Unequip, MainMenuAction, DetachFromPlayer, UpdatePlayerPosition, TwistTo, TestFunc}
}

//
//Companion
//System Menu & Inventory
this.Companion = (id, object, inventory) => {
	let comp = {};
	comp.avatarType = '';
	comp.menuParentId;
	if(object.SpawnCore){
		comp.avatarType = 'core';
		comp.menuParentId = object.core.id;
	} else if(object.SpawnLayer){
		comp.avatarType = 'layer';
		comp.menuParentId = object.layer.all.parent.core.core.id;
	}
	comp.avatar = Object.assign({}, object);
	comp.shapes = {
		default: object,
	};

	comp.id = id;
	comp.inScene = false;
	comp.infoDisplay = false;
	comp.pos = auxl.playerRig.GetEl().getAttribute('position');
	comp.height = 1.5;
	comp.distance = -2;
	comp.firstSpawn = true;

	comp.viewConfig = false;

	//NPC
	//auxl.compNPC = auxl.NPC('compNPC', comp.avatar, auxl.compBookData, auxl.compBubble, true);
	auxl.compNPC = auxl.NPC('compNPC', comp.avatar, auxl.compBookData, auxl.compBubbleLayer, true);

	//Inventory
	comp.enableInventory = inventory || false;
	comp.inventoryTimeouts = [];
	comp.items = {};
	comp.tools = {};
	comp.keys = {};
	comp.specials = {};

	//
	//Main Menu
	comp.mainMenuData = {
	info:{
		id: 'mainMenu',
		buttonData: auxl.menuCylinderData,
		hoverData: auxl.menuHoverData,
		title: 'Main Menu',
		description: 'Main menu for travel, system and settings.',
		layout:'circleUp',
		offset: -1,
		parent: comp.menuParentId,
		stare: false,
	},
	menu0:{
		button1:{
			id: 'subMenu2',
			style: false,
			title: 'Travel to',
			description: 'Select your next travel destination.',
			subMenu: 'menu1',
			action: false,
		},
		button2:{
			id: 'subMenu3',
			style: false,
			title: 'Settings',
			description: 'Configure system settings.',
			subMenu: 'menu3',
			action: false,
		},
		button3:{
			id: 'subMenu4',
			style: false,
			title: 'Controls',
			description: 'View current control configuration.',
			subMenu: false,
			action: {
				auxlObj: 'comp',
				component: false,
				method: 'ToggleControlView',
				params: null,
				menu: 'close',
			},
		},
	},
	menu1:{
		button0:{
			id: 'subMenu4',
			style: false,
			title: 'Sub Menu 4 Test',
			description: 'A test sub menu.',
			subMenu: 'menu4',
			action: false,
		},
		button1:{
			id: 'subMenu5',
			style: false,
			title: 'Sub Menu 5 Test',
			description: 'A test sub menu.',
			subMenu: 'menu5',
			action: false,
		},
	},
	menu2:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Toggle Flashlight',
			description: 'Turn On/Off your flashlight.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ToggleFlashlight',
				params: null,
				menu: 'close',
			},
		},
	},
	menu3:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Sit/Stand Toggle',
			description: 'Toggle between sitting or standing mode.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ToggleSittingMode',
				params: null,
				menu: 'stay',
			},
		},
		button1:{
			id: 'subMenu1',
			style: false,
			title: 'Companion Avatar',
			description: 'Change the companion avatar shape.',
			subMenu: 'menu7',
			action: false,
		},
		button2:{
			id: 'subMenu2',
			style: false,
			title: 'Scene Transition Type',
			description: 'Change the scene transition animation style.',
			subMenu: 'menu4',
			action: false,
		},
		button3:{
			id: 'subMenu3',
			style: false,
			title: 'Teleport Transition Type',
			description: 'Change the teleport transition animation style.',
			subMenu: 'menu5',
			action: false,
		},
		button4:{
			id: 'subMenu4',
			style: false,
			title: 'Transition Color',
			description: 'Change the transition animation color.',
			subMenu: 'menu6',
			action: false,
		},
	},
	menu4:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Instant',
			description: 'Disable animation.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateSceneTransitionStyle',
				params: 'instant',
				menu: 'back',
			},
		},
		button1:{
			id: 'action2',
			style: false,
			title: 'Blink',
			description: 'Blink in and out in between scenes.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateSceneTransitionStyle',
				params: 'blink',
				menu: 'back',
			},
		},
		button2:{
			id: 'action3',
			style: false,
			title: 'Fade',
			description: 'Fade in and out in between scenes.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateSceneTransitionStyle',
				params: 'fade',
				menu: 'back',
			},
		},
		button3:{
			id: 'action4',
			style: false,
			title: 'Sphere',
			description: 'Close and open a sphere in between scenes.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateSceneTransitionStyle',
				params: 'sphere',
				menu: 'back',
			},
		},
	},
	menu5:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Instant',
			description: 'Disable animation.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTeleportTransitionStyle',
				params: 'instant',
				menu: 'back',
			},
		},
		button1:{
			id: 'action2',
			style: false,
			title: 'Locomotion',
			description: 'Slide to teleport position.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTeleportTransitionStyle',
				params: 'locomotion',
				menu: 'back',
			},
		},
		button2:{
			id: 'action3',
			style: false,
			title: 'Blink',
			description: 'Blink in and out in between teleports.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTeleportTransitionStyle',
				params: 'blink',
				menu: 'back',
			},
		},
		button3:{
			id: 'action4',
			style: false,
			title: 'Fade',
			description: 'Fade in and out in between teleports.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTeleportTransitionStyle',
				params: 'fade',
				menu: 'back',
			},
		},
		button4:{
			id: 'action5',
			style: false,
			title: 'Sphere',
			description: 'Close and open a sphere in between teleports.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTeleportTransitionStyle',
				params: 'sphere',
				menu: 'back',
			},
		},
	},
	menu6:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Black',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'black',
				menu: 'back',
			},
		},
		button1:{
			id: 'action2',
			style: false,
			title: 'Grey',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'grey',
				menu: 'back',
			},
		},
		button2:{
			id: 'action3',
			style: false,
			title: 'White',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'white',
				menu: 'back',
			},
		},
		button3:{
			id: 'action4',
			style: false,
			title: 'Red',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'red',
				menu: 'back',
			},
		},
		button4:{
			id: 'action5',
			style: false,
			title: 'Green',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'green',
				menu: 'back',
			},
		},
		button5:{
			id: 'action6',
			style: false,
			title: 'Blue',
			description: 'Change transition color.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'UpdateTransitionColor',
				params: 'blue',
				menu: 'back',
			},
		},
	},
	menu7:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Ghost',
			description: 'Change to a ghost avatar.',
			subMenu: false,
			action: {
				auxlObj: 'comp',
				component: false,
				method: 'UpdateShape',
				params: 'ghost',
				menu: 'close',
			},
		},
		button1:{
			id: 'action2',
			style: false,
			title: 'Cube',
			description: 'Change to a cube avatar.',
			subMenu: false,
			action: {
				auxlObj: 'comp',
				component: false,
				method: 'UpdateShape',
				params: 'compCubeLayer',
				menu: 'close',
			},
		},
		button2:{
			id: 'action3',
			style: false,
			title: 'Sphere',
			description: 'Change to a sphere avatar.',
			subMenu: false,
			action: {
				auxlObj: 'comp',
				component: false,
				method: 'UpdateShape',
				params: 'compSphereLayer',
				menu: 'close',
			},
		},
	},
	inventory:{
		button0:{
			id: 'subMenu1',
			style: false,
			title: 'Items',
			description: 'View your items.',
			subMenu: 'items1',
			action: false,
		},
		button1:{
			id: 'subMenu2',
			style: false,
			title: 'Tools',
			description: 'View your tools.',
			subMenu: 'tools1',
			action: false,
		},
		button2:{
			id: 'subMenu3',
			style: false,
			title: 'Keys',
			description: 'View your keys.',
			subMenu: 'keys1',
			action: false,
		},
		button3:{
			id: 'subMenu4',
			style: false,
			title: 'Special',
			description: 'View your special objects.',
			subMenu: 'specials1',
			action: false,
		},
	},
	items1:{},
	tools1:{},
	keys1:{},
	specials1:{},
	};

	if(comp.enableInventory){
		comp.mainMenuData.menu0.button0 = {
			id: 'subMenu1',
			style: false,
			title: 'Inventory',
			description: 'View your inventory.',
			subMenu: 'inventory',
			action: false,
		};
		comp.mainMenuData.menu0.button4 = {
			id: 'subMenu5',
			style: false,
			title: 'Unequip',
			description: 'Unequip your held object.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'Unequip',
				params: null,
				menu: 'stay',
			},
		};
	}

	auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
	/*
	Main Menu

	Inventory
	- Items
	- Tools
	- - Toggle Flashlight
	- - Toggle Click to Teleport *
	- Keys
	- Specials

	Travel
	- Scenes

	Settings
	- Sit/Stand Mode Toggle
	- Scene Transition Type :
	- - Instant, Blink, Fade, Sphere
	- Teleport Transition Type : 
	- - Locomotion, Instant, Blink, Fade, Sphere
	- Transition Color :
	- - Colors
	- Theme Color *
	- Companion Style *
	- Toggle 1st <-> 3rd POV *
	- Control Configurations (VR) *
	- Scene Instructions *
	- Sound Settings *
	*/

	//Return Position Direction of Camera
	function cameraDirection(){
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		camera.object3D.getWorldDirection(direction);
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3();
		position.copy(camera.object3D.position).add(new THREE.Vector3(direction.x, 0, direction.z).normalize().multiplyScalar(comp.distance));
		position.y = comp.height;
		return position;
	}

	//Testing Function
	const TestFunc = (params) => {
		console.log(params);
	}

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
			buddy = auxl.compNPC.GetAllNPCEl();
			speechIntervalB = setInterval(function() {
				buddyFaceMaterial.value = emotiSpeechArray[b];
				buddy.setAttribute('text', buddyFaceMaterial);
				if(b === emotiSpeechArray.length){b = 0}else{b++}
			}, 2700);
		}, 250);
	}
	//Add Shape
	const AddAvatar = (name, auxlObj) => {
		comp.shapes[name] = auxlObj;
		BuildAvatarMenu();
	}
	//Build Shape Menu
	const BuildAvatarMenu = () => {
		comp.shapeButtons = {};
		let buttonTemplate = {};
		let currNum = 1;
		let currPage = 1;
		let total = Object.keys(comp.shapes).length;
		let pages = Math.ceil(total/8);
		let subMenuName = 'compShape' + currPage;
console.log(comp.shapes)
		for(let each in comp.shapes){
			buttonTemplate = {
				id: 'action'+currNum,
				style: false,
				title: each,
				description: 'Change to a '+each+' avatar.',
				subMenu: false,
				action: {
					auxlObj: 'comp',
					component: false,
					method: 'UpdateShape',
					params: comp.shapes[each],
					menu: 'close',
				},
			};
			if(comp.shapes[each].action){} else {
				buttonTemplate.action = false;
			}
			moreTemplate = {
				id: 'action'+currNum,
				style: false,
				title: 'More',
				description: 'Next Page',
				subMenu: false,
				action: false,
			};
			comp.shapeButtons['button'+currNum] = buttonTemplate;
			if(currNum === total){
				auxl.mainMenu.UpdateSubMenu(subMenuName,comp.shapeButtons);
			} else {
				currNum++;
			}

			if(pages > 1){
				if(currNum % 7 === 0){
					currPage++;
					//build more button
					moreTemplate.id = 'action'+currNum;
					moreTemplate.subMenu = 'compShape' + currPage;
					comp.shapeButtons['button'+currNum] = moreTemplate;
					auxl.mainMenu.UpdateSubMenu(subMenuName,comp.shapeButtons);
					comp.shapeButtons = {};
					subMenuName = 'compShape' + currPage;
				}
			}
		}
	}
	//Update Shape
	const UpdateShape = (newObj) => {
		let respawn = false;
		if(comp.inScene){
			respawn = true;
			DespawnComp();
		}
		let rebuildTimeout = setTimeout(() => {
			if(newObj.SpawnCore){
				comp.avatarType = 'core';
				comp.menuParentId = newObj.core.id;
				comp.avatar = Object.assign({}, newObj);
			} else if(newObj.SpawnLayer){
				comp.avatarType = 'layer';
				comp.menuParentId = newObj.layer.all.parent.core.core.id;
				comp.avatar = Object.assign({}, newObj);
			} else {
				if(auxl[newObj].SpawnCore){
					comp.avatarType = 'core';
					comp.menuParentId = auxl[newObj].core.id;
				} else if(auxl[newObj].SpawnLayer){
					comp.avatarType = 'layer';
					comp.menuParentId = auxl[newObj].layer.all.parent.core.core.id;
				} else {
					console.log(newObj);
					console.log('failed to detect type');
				}
				comp.avatar = Object.assign({}, auxl[newObj]);
			}
			auxl.compNPC = auxl.NPC('compNPC', comp.avatar, auxl.compBookData, auxl.compBubbleLayer, true);
			if(respawn){
				SpawnComp();
			}
		clearTimeout(rebuildTimeout);
		}, 400);

	}
	//Toggle playerFloor Clickable Class
	const ToggleSpawnClick = () => {
		playerFloor.classList.toggle('clickable');
	}
	//Toggle Companion Display
	const ToggleComp = () => {
		if(comp.inScene){
			DespawnComp();
		} else {
			SpawnComp();
		}
	}
	//Attach Toggle to playerFloor
	playerFloor.addEventListener('click',ToggleComp);
	//Update Position
	const UpdatePosition = () => {
		if(comp.avatarType === 'core'){
			comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
		} else {
			comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
		}
	}
	//Spawn & Start Companion
	const SpawnComp = () => {
		if(comp.inScene){}else{
			ToggleSpawnClick();
			auxl.compNPC.SpawnNPC(auxl.playerRig.GetEl());
			if(comp.avatarType === 'core'){
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
				}
			} else {
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
				}
			}
			//autoScriptEmoticon();
			let spawnTimeout = setTimeout(() => {
				//auxl.build.SpawnBuild();
				//Update Inventory
				if(comp.enableInventory){
					UpdateInventoryMenu();
				}
				//Update Main Menu Parent Shape ID
				auxl.mainMenu.multiMenu.parent = comp.menuParentId;
				auxl.mainMenu.SpawnMultiMenu();
				ToggleSpawnClick();
				comp.inScene = true;
				clearTimeout(spawnTimeout);
			}, 100);
		}
	}
	//Despawn & Stop Companion
	const DespawnComp = () => {
		if(comp.inScene){
			ToggleSpawnClick();
			//clearInterval(speechTimeoutB);
			//clearInterval(speechIntervalB);
			//auxl.build.DespawnBuild();
			auxl.mainMenu.DespawnMultiMenu();
			//Delay to let multi-menu complete it's despawn seq
			let despawnTimeout = setTimeout(() => {
				auxl.compNPC.DespawnNPC();
				auxl.RemoveFromTracker(comp.id);
				comp.inScene = false;
				ToggleSpawnClick();
				clearTimeout(despawnTimeout);
			}, 300);
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				comp[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: comp.id, type: 'comp', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			comp[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: comp.id, type: 'comp', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(comp(flag[each]));
			}
			return flagArray;
		} else {
			return comp[flag];
		}
	}
	//Display Current Control Configuration
	const ToggleControlView = () => {
		if(comp.viewConfig){
			auxl.configurationView.DespawnCore();
			comp.viewConfig = false;
		} else {
			auxl.configurationView.SpawnCore(auxl.playerRig.GetEl());
			auxl.configurationView.ChangeSelf({property: 'text', value: {value: auxl.controlsText}});
			comp.viewConfig = true;
		}
	}
	//Update Main Menu
	const UpdateMainMenu = (updates) => {
		let restart = false;
		if(auxl.mainMenu.inScene){
			auxl.mainMenu.DespawnMultiMenu();
			restart = true;
		}
		Object.keys(updates).forEach(section => {
			if(comp.mainMenuData[section]){
				comp.mainMenuData[section][updates[section].id] = updates[section];
			} else {
				comp.mainMenuData[section] = updates[section];
			}
		});
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
		if(restart){
			auxl.mainMenu.SpawnMultiMenu();
		}
	}
	//Update Main Menu Style
	const UpdateMainMenuStyle = (core) => {
		let restart = false;
		if(auxl.mainMenu.inScene){
			auxl.mainMenu.DespawnMultiMenu();
			restart = true;
		}
		comp.mainMenuData.info.buttonData = core;
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
		if(restart){
			auxl.mainMenu.SpawnMultiMenu();
		}
	}
	//Enable Inventory
	const EnableInventory = () => {
		comp.enableInventory = true;
		comp.mainMenuData.menu0.button0 = {
			id: 'subMenu1',
			style: false,
			title: 'Inventory',
			description: 'View your inventory.',
			subMenu: 'inventory',
			action: false,
		};
		comp.mainMenuData.menu0.button4 = {
			id: 'subMenu5',
			style: false,
			title: 'Unequip',
			description: 'Unequip your held object.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'Unequip',
				params: null,
				menu: 'stay',
			},
		};
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
	}
	//Add To Inventory
	const AddToInventory = ({item, hide}) => {
		function inventoryAdd(item){
			if(comp[item.category][item.name]){
				if(comp[item.category][item.name].persist === 'limited'){
					comp[item.category][item.name].amount += item.amount;
				}
			} else {
				comp[item.category][item.name] = item;
			}
			auxl.saveToProfile({auxlObject: comp.id, type: 'comp', sub: item.category, name: item.name, data: item});
		}
		if(Array.isArray(item)){
			for(let each in item){
				inventoryAdd(item[each]);
			}
		} else {
			inventoryAdd(item);
		}
		UpdateInventoryMenu();
		//Notifications
		ClearInventoryNotifications();
		if(hide){}else{
			if(Array.isArray(item)){
				for(let each in item){
					let delay = 3800;
					delay *= each;
					comp.inventoryTimeouts[each] = setTimeout(() => {
						auxl.player.Notification({message:'Acquired : ' + item[each].name});
						clearTimeout(comp.inventoryTimeouts[each]);
					}, delay);
				}
			} else {
				auxl.player.Notification({message:'Acquired : ' + item.name});
			}
		}
	}
	//Clear Inventory Notifications
	const ClearInventoryNotifications = () => {
		for(let each in comp.inventoryTimeouts){
			clearTimeout(comp.inventoryTimeouts[each])
		}
		comp.inventoryTimeouts = [];
	}
	//Remove Item/Key to Player Inventory - Single or Array
	const RemoveFromInventory = (item) => {
		function inventoryRemove(item){
			if(comp[item.category][item.name]){
				if(comp[item.category][item.name].persist === 'limited'){
					comp[item.category][item.name].amount--;
					if(comp[item.category][item.name].amount <= 0){
						delete comp[item.category][item.name];
					}
				}
			} else {
				delete comp[item.category][item.name];
			}
			auxl.saveToProfile({auxlObject: comp.id, type: 'comp', sub: item.category, name: item.name, data: item});
		}
		if(Array.isArray(item)){
			for(let each in item){
				inventoryRemove(item[each]);
			}
		} else {
			inventoryRemove(item);
		}
		UpdateInventoryMenu();
	}
	//Check if Item/Key is in Player Inventory - Single or Array
	const CheckInventory = (item) => {
		let returnValue;
		function inventoryCheck(item){
			if(comp[item.category][item.name]){
				return true;
			} else {
				return false;
			}
		}
		if(Array.isArray(item)){
			for(let each in item){
				returnValue.push(inventoryCheck(item[each]));
			}
		} else {
			returnValue = inventoryCheck(item);
		}
		return returnValue;
	}
	//Check for Key
	const CheckForKey = (name) => {
		let match = false;
		if(Object.keys(comp.keys).length === 0){
			match = false;
		} else {
			for(let each in comp.keys){
				if(comp.keys[each].id === name){
					match =  true;
					break;
				}
			}
		}
		return match;
	}
	//Update Inventory Menu Category
	const UpdateInventoryMenuCategory = (category) => {
		comp.inventoryButtons = {};
		let buttonTemplate = {};
		let moreTemplate = {};
		let currNum = 1;
		let currPage = 1;
		let total = Object.keys(comp[category]).length;
		let pages = Math.ceil(total/8);
		let subMenuName = category + currPage;
		let menuControl = 'stay';

		for(let each in comp[category]){
			let name;
			if(comp[category][each].persist === 'limited'){
				name = comp[category][each].name+' x'+comp[category][each].amount;
			} else {
				name = comp[category][each].name;
			}
			if(comp[category][each].menu){
				menuControl = comp[category][each].menu;
			} else {
				menuControl = 'stay';
			}
			buttonTemplate = {
				id: 'action'+currNum,
				style: comp[category][each].style,
				title: name,
				description: comp[category][each].description,
				subMenu: false,
				action: {
					auxlObj: comp[category][each].auxlObj,
					component: comp[category][each].component,
					method: comp[category][each].method,
					params: comp[category][each].params,
					menu: menuControl,
				},
			};
			if(comp[category][each].action){} else {
				buttonTemplate.action = false;
			}
			moreTemplate = {
				id: 'action'+currNum,
				style: false,
				title: 'More',
				description: 'Next Page',
				subMenu: false,
				action: false,
			};
			comp.inventoryButtons['button'+currNum] = buttonTemplate;
			if(currNum === total){
				auxl.mainMenu.UpdateSubMenu(subMenuName,comp.inventoryButtons);
			} else {
				currNum++;
			}
			if(pages > 1){
				if(currNum % 7 === 0){
					currPage++;
					//build more button
					moreTemplate.id = 'action'+currNum;
					moreTemplate.subMenu = category + currPage;
					comp.inventoryButtons['button'+currNum] = moreTemplate;
					auxl.mainMenu.UpdateSubMenu(subMenuName,comp.inventoryButtons);
					comp.inventoryButtons = {};
					subMenuName = category + currPage;
				}
			}

		}
	}
	//Update Inventory Menu
	const UpdateInventoryMenu = () => {
		UpdateInventoryMenuCategory('items');
		UpdateInventoryMenuCategory('tools');
		UpdateInventoryMenuCategory('keys');
		UpdateInventoryMenuCategory('specials');
	}

	return{comp, TestFunc, UpdateShape, SpawnComp, DespawnComp, SetFlag, GetFlag, UpdatePosition, ToggleControlView, UpdateMainMenu, UpdateMainMenuStyle, EnableInventory, AddToInventory, ClearInventoryNotifications, RemoveFromInventory, CheckInventory, CheckForKey, UpdateInventoryMenu};
}

},
//Delay Player Load in Animation until Scene is Ready
checkSceneLoad: function (time, timeDelta) {
	if(this.loadingObjects.size <= 0){
		let sceneTimeout;
		if(this.player.layer.transition.scene === 'blink'){
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
		} else if (this.player.layer.transition.scene === 'fade'){
			this.fadeScreen.EmitEvent('fadeScene2');
			this.loadingScene = false;
			sceneTimeout = setTimeout(() => {
				this.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
				this.player.layer.teleporting = false;
				this.player.EnableClick();
				clearTimeout(sceneTimeout);
			}, 800);
		} else if (this.player.layer.transition.scene === 'sphere'){
			this.sphereScreen.EmitEvent('sphereScene2');
			this.loadingScene = false;
			sceneTimeout = setTimeout(() => {
				this.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
				this.player.layer.teleporting = false;
				this.player.EnableClick();
				clearTimeout(sceneTimeout);
			}, 800);
		} else if (this.player.layer.transition.scene === 'instant'){
			this.loadingScene = false;
			this.player.layer.teleporting = false;
			this.player.EnableClick();
		}
	}
},
//AUXL Tick - Running Throttled checkSceneLoad()
tick: function (time, timeDelta) {
	if(this.loadingScene){
		//Run Throttled checkSceneLoad() after scene was read
		if(this.sceneReading){} else {
			this.checkSceneLoadThrottled();
		}
	}

},
});