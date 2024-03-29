//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//AUXL System

//Import ObjGens
//Main : Core, Layer, Templates
import {Core, CoreDataFromTemplate, CoreFromTemplate, Layer, LayerDataFromTemplate, LayerFromTemplate} from './main.js';
//Player : Player, Companion
import {Player, Companion} from './player.js';
//UniRay : Uniray
//import UniRay from './uniray.js';
//Powers
//import Powers from './powers.js';
//Scenes : SceneNode, MapZone, Scenario, World
import {SceneNode, MapZone, Scenario, World} from './scenes.js';
//Menu : Menu, MultiMenu, MegaMenu, HoverMenu
import {Menu, MultiMenu, MegaMenu, HoverMenu, ComboLock, ScrollMenu} from './menu.js';
//Environment : SkyBox, Horizon, ObjsGenRing, MultiAssetGen, Teleport
import {SkyBox, Horizon, ObjsGenRing, MultiAssetGen, Teleport} from './environment.js';
//NPC : Book, SpeechSystem, NPC, InfoBubble, Creature
import {Book, SpeechSystem, NPC, InfoBubble, Creature} from './npc.js';
//Grid : Collision, GridLayout, Gate
import {Collision, GridLayout, Gate} from './grid.js';
//Build : BuildIn3D
import {Constraints, One, BuildIn3D} from './build.js';
//Images
import {ImageSwapper, ImageCarousel} from './images.js';
//Cards
import Card from './cards.js';
//Import Pet
import Pet from '../games/pet.js';
//AUXL System
const auxl = AFRAME.registerSystem('auxl', {
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
this.auxl = auxl;
this.expStarted = false;
this.defaultWorld = false;
this.currentWorld = false;
this.currentZone = false;
this.worldLoaded = false;
this.local = {};
this.local.profile = {};
this.rebuildObjects = [];
this.libraries = [];
this.worlds = [];
this.volume = 1;
this.backgroundAudio = false;

//Throttled Scene Loading Function
this.checkSceneLoadThrottled = AFRAME.utils.throttle(this.checkSceneLoad, 30, this);
this.sceneReading = false;
this.loadingScene = false;
this.loadingObjects = new Map();
this.maxLoadTime = 5000;
this.jsLoaded = {};
//JS Scripts Predefined, Ready to be loaded dynamically
this.jsAll = {

//
//Relative
//Not Working
//draw: './assets/js/aframe-draw-component.js',
//draw: 'file://assets/js/aframe-draw-component.min.js',
//draw: 'filetype://./assets/js/aframe-draw-component.min.js',
//draw: '/assets/js/aframe-draw-component.min.js',


//
//Network

//Example
//GLTF Morph
//['gltf-morph']:'https://rawcdn.githack.com/elbobo/aframe-gltf-morph-component/07e9b80bd382cc1c19223468d35c453e7c76e9a2/dist/aframe-gltf-morph-component.js',
};

/*************************************************************/
//HTML Elements
const sceneEl = document.querySelector('a-scene');
auxl.sceneEl = sceneEl;
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
const donateLink = document.getElementById('donateLink');
const repoLink = document.getElementById('repoLink');
const scenarioHeaderTitle = document.getElementById('scenarioHeaderTitle');
const scenarioMenuTitle = document.getElementById('scenarioMenuTitle');
const fullScreen = document.getElementById('fullScreen');
const screenFooter = document.getElementById('screenFooter');
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
const mobileMain = document.getElementById('main');
const mobileF = document.getElementById('f');
const mobileG = document.getElementById('g');
const mobileH = document.getElementById('h');
const mobileI = document.getElementById('i');

let htmlBackground = [body, beginDiv, startButton, menuModeButton, audioButton, viewInfo, viewData, expInfo, infoClose, instructions, scenarioMenuTitle, dataInfo, dataClose, manageData, resetData, donateLink, repoLink, fullScreen, controllerBlock, vrHandButton, vrLocomotionType];

let htmlForeground = [stickyMenu, stickyTitle, scenarioHeaderTitle, fullScreen, controllerBlock, mobileUpLeft, mobileUp, mobileUpRight, mobileLeft, mobileCenter, mobileRight, mobileDownLeft, mobileDown, mobileDownRight, mobileSelect, mobileStart, mobileA, mobileB, mobileC, mobileD, mobileMain, mobileF, mobileG, mobileH, mobileI, ];

// System Configure
/***********************************************************/
//System Loaded, Runs after World/Scenario/Zone/Scenes loaded
this.SystemLoaded = (reset) => {
	SetStorage(reset);
	auxl.player.infoText = 'Player : ' + auxl.local.profile.shortname + '\n';
	SystemStart();
	ApplySettings();
}
//System Start
const SystemStart = () => {
	//Init Collision
	auxl.map = auxl.Collision();
	//System Info
	console.log({
		timeSince: this.local.profile.time.span,
		loadedProfile: auxl.local,
	})
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

	//Avatar
	auxl.player.PlayerColors(this.local.profile.colorScheme.base, this.local.profile.colorScheme.compl)

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
	auxl.avatarHover.ChangeSelf({property: 'text', value: {value: this.systemText,}})
	//Hover
	auxl.player.UpdateHoverText(this.local.profile.shortname);

	//console.log('System Text Applied');
}
//Update System Text
const UpdateSystemText = (text) => {
	this.systemText = text;
	ApplySystemText()
}
//Loaded
this.Loaded = (library) => {
	auxl.libraries.push(library);
}
//WorldsLoaded
this.WorldsLoaded = (world) => {
	auxl.worlds.push(world);
}
//Add Component Rebuild Method
this.ToBeRebuilt = (methodName) => {
	auxl.rebuildObjects.push(methodName);
	auxl.Loaded(methodName);
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
const NewData = () => {
	this.local = {};
	this.local.profile = {};
	this.local.profile.domain = window.location.hostname;
	this.local.profile.page = window.location.pathname;
	this.local.profile.userAgent = window.navigator.userAgent;
	this.local.profile.controls = this.controls;
	this.local.profile.vrHand = this.vrHand;
	this.local.profile.volume = this.volume;
	this.local.profile.time = {};
	this.local.profile.time.creation = auxl.Time();
	this.local.profile.time.lastVisit = auxl.Time();
	this.local.profile.colorScheme = auxl.ColorTheoryGen();
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
const NewStorage = () => {
	//Fresh Session, Initiliaze Site Wide Settings
	console.log('New here. Loading default data.');
	//Clear Local Storage
	window.localStorage.clear();
	//Default Data
	NewData();
	//Rebuild All Objects
	Rebuild();
	//Assign Completion to Storage
	window.localStorage.setItem(this.save, JSON.stringify(auxl.local));
	ApplySettings();

	//Update Controls
	VRHandMenu(this.local.profile.vrHand)
	ControlsMenu(this.local.profile.controls)
	UpdateControls();
}
//Load
const LoadStorage = () => {
	//Return Session, Load Site Wide Settings
	//console.log('Loading previous data.');
	console.log('Welcome Back! ^-^');
	//Overwrite default profile
	this.local = JSON.parse(window.localStorage.getItem(this.save));
	ApplySettings();
	this.local.profile.time.return = this.Time();

	this.local.profile.time.span = this.TimeDif(this.local.profile.time.lastVisit, this.local.profile.time.return);
	//console.log('Time since last visit :');
	//console.log(this.local.profile.time.span);
	//Update new Last Visit Data
	this.local.profile.time.lastVisit = this.local.profile.time.return;
	//Flag that we are loading data
	if(this.local.location.world === '' ||  this.local.location.scenario === '' || this.local.location.zone === '' || this.local.location.scene === ''){
		this.local.location.load = false;
	}else{
		this.local.location.load = true;
	}

	//Save Last Visit Date
	auxl.SaveToProfile();
	UpdateFromLocal();

	//Update Controls
	VRHandMenu(this.local.profile.vrHand)
	ControlsMenu(this.local.profile.controls)
	UpdateControls();

	//Update Audio
	this.volume = this.local.profile.volume;
}
//Set
const SetStorage = (reset) => {
  	if(reset){
		NewStorage();
	} else if(localStorage.getItem(this.save)){
		LoadStorage();
	} else {
		NewStorage();
	}
}
//Save to Profile and Local
this.SaveToProfile = (sync) => {
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
	//console.log(auxl.local)
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
this.Time = () => {
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
this.TimeDif = (start, end) => {
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
this.vrHand = 'bothLeftLoco';
this.vrHandPrevious = false;
this.directionType = 'camera';
this.locomotionText = 'WASD Keys';
this.joystickLoco = 8;//dpad
this.controlsInfo = {};
this.controlsText = '';

/*************************************************************/
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
comboLock:{type:'comboLock', spawn: 'SpawnComboLock', despawn: 'DespawnComboLock'},
card:{type:'card', spawn: 'SpawnCard', despawn: 'DespawnCard'},
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
this.SpawnTracker = (obj, spawnLocation, bookName) => {
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
this.ClearSpawned = (spawned) => {
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
	} else if(auxl.bookSpawned[bookname]){
		delete auxl.bookSpawned[bookname][id];
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
//Each instance of Instructions connects and uses this for tracking
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
//Update Day Length
this.TimeInDayUpdate = () => {

}
//Physics
//Physics Enabled / Type
this.physics = false;
this.worldPhysics = false;
this.physicsDebug = false;
//EnablePhysics
this.EnablePhysics = (bodyShape) => {
//console.log({msg: 'Enabling ' + auxl.worldPhysics + ' Physics'})
	let loaded = true;
	if(auxl.worldPhysics === 'cannon'){
		auxl.sceneEl.setAttribute('physics', {driver: 'local', debug: auxl.physicsDebug, debugDrawMode: 1, gravity: '-9.8'})
	} else if(auxl.worldPhysics === 'ammo'){
		auxl.sceneEl.setAttribute('physics', {driver: 'ammo', debug: auxl.physicsDebug, debugDrawMode: 1, gravity: '-9.8'})
	} else {
		loaded = false;
console.log({msg: 'Failed to recognize physics engine', engine: auxl.worldPhysics, auxl})
	}

	if(loaded){
		//Force reloading of physics system
		auxl.sceneEl.systems.physics.init();
		let loadTimeout = setTimeout(() => {
			//Physics Reference Links
			auxl.physics = auxl.el.systems.physics;

//console.log({msg: 'Physics Enabling : ' + auxl.worldPhysics, physics: auxl.physics, scene: auxl.el.getAttribute('physics')})

			if(auxl.worldPhysics === 'cannon'){
				auxl.physWorld = auxl.el.systems.physics.driver.world;
				//auxl.physWorld.allowSleep = true;
			} else if(auxl.worldPhysics === 'ammo'){
				auxl.physWorld = auxl.el.systems.physics.data;
			}

			//Enable Player Physics
			auxl.player.EnablePhysics(bodyShape);
//console.log({msg: 'Physics Enabled : ' + auxl.worldPhysics, physics: auxl.physics, physWorld: auxl.physWorld})
			clearTimeout(loadTimeout);
		}, 0);
	}
}
//EnablePhysics
this.DisablePhysics = () => {
	auxl.player.DisablePhysics();
	auxl.sceneEl.removeAttribute('physics');
	auxl.worldPhysics = false;
	auxl.physics = false;
	auxl.physWorld = false;
	//console.log({msg: 'Physics Disabled', physics: auxl.physics, physWorld: auxl.physWorld})
}
//Collision Maps
this.collisionMap = [[],[]];
this.triggerMap = [[],[]];
this.mapEdge = false;

//
//HTML Menu
this.ToggleHTMLMenu = () => {
	if(auxl.menuOpen){
		beginDiv.style.display = 'none';
		auxl.menuOpen = false;
		if(auxl.infoOpen){
			ToggleInfo();
		}
		if(auxl.backgroundAudio && !auxl.playerAudio.core.inScene){
			auxl.playerAudio.SpawnCore(auxl.playerRig);
		}
	} else {
		beginDiv.style.display = 'flex';
		auxl.menuOpen = true;
	}
}
stickyMenu.addEventListener('click', auxl.ToggleHTMLMenu);

//
//Start Experience
function StartExp(){
	if(auxl.worldLoaded){}else{
		if(auxl.local.location.world === ''){
			auxl.defaultWorld.StartWorld();
		} else {
			auxl[auxl.local.location.world].StartWorld();
		}
		startButton.innerHTML = 'Resume';
		UpdateControls();
		auxl.worldLoaded = true;
	}
	auxl.ToggleHTMLMenu();
}
startButton.addEventListener('click', StartExp);

//
//Controls

//
//VR
function DisableVRControls(){
	auxl.vrController1.GetEl().setAttribute('visible',false);
	auxl.vrController2.GetEl().setAttribute('visible',false);
	auxl.vrController1UI.GetEl().setAttribute('visible',false);
	auxl.vrController2UI.GetEl().setAttribute('visible',false);
	auxl.vrController1Cursor.GetEl().setAttribute('visible',false);
	auxl.vrController2Cursor.GetEl().setAttribute('visible',false);
	auxl.vrController1.GetEl().removeAttribute('cursor');
	auxl.vrController2.GetEl().removeAttribute('cursor');
	auxl.vrController1.GetEl().removeAttribute('laser-controls');
	auxl.vrController2.GetEl().removeAttribute('laser-controls');
}
function EnableVRControls(){
	//Ensure controller clicks are enabled, will ignore if already setup
	auxl.controller.swapClick(true);
	if(auxl.vrHand === 'bothRight'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		auxl.vrController1Cursor.GetEl().setAttribute('visible',true);
		auxl.vrController2Cursor.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
		auxl.player.EnableVRLocomotion();
		auxl.locomotionText = 'Left Controller Joystick';
	} else if(auxl.vrHand === 'bothLeft'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		auxl.vrController1Cursor.GetEl().setAttribute('visible',true);
		auxl.vrController2Cursor.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController1.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
		auxl.player.EnableVRLocomotion();
		auxl.locomotionText = 'Right Controller Joystick';
	} else if(auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'bothLeftLoco'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		auxl.vrController1Cursor.GetEl().setAttribute('visible',true);
		auxl.vrController2Cursor.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: 'false'});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController1.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
		auxl.player.EnableVRLocomotion();
		if(auxl.vrHand === 'bothLeftLoco'){
			auxl.locomotionText = 'Left Controller Joystick';
		} else if (auxl.vrHand === 'bothRightLoco'){
			auxl.locomotionText = 'Right Controller Joystick';
		}
	}
/*
 else if(auxl.vrHand === 'right'){
		auxl.vrController2.GetEl().setAttribute('visible',true);
		auxl.vrController2Cursor.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
		auxl.player.EnableVRHoverLocomotion('vrController2');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
	} else if(auxl.vrHand === 'left'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController1Cursor.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController1.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
		auxl.player.EnableVRHoverLocomotion('vrController1');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
	}
*/
}
//Desktop
function DisableDesktopControls(){
	auxl.mouseController.GetEl().setAttribute('visible',false);
	auxl.mouseController.GetEl().removeAttribute('raycaster');
	auxl.mouseController.GetEl().removeAttribute('cursor');
}
function EnableDesktopControls(){
	//Ensure document click is enabled, will ignore if already setup
	auxl.controller.swapClick();
	auxl.mouseController.GetEl().setAttribute('visible',true);
	auxl.mouseController.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	auxl.mouseController.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true',});
	auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
	auxl.player.EnableDesktopLocomotion();
	auxl.locomotionText = 'WASD Keys';
}
//Mobile
function DisableMobileControls(){
	auxl.mouseController.GetEl().setAttribute('visible',false);
	auxl.mouseController.GetEl().removeAttribute('raycaster');
	auxl.mouseController.GetEl().removeAttribute('cursor');
	//fullScreen.style.display = 'none';
	screenFooter.style.display = 'none';
	controllerBlock.style.display = 'none';
}
function EnableMobileControls(){
	//Ensure document click is enabled, will ignore if already setup
	auxl.controller.swapClick();
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
	auxl.mouseController.GetEl().setAttribute('visible',true);
	auxl.mouseController.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	auxl.mouseController.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
	screenFooter.style.display = 'flex';
	controllerBlock.style.display = 'flex';
	auxl.playerRig.GetEl().setAttribute('auxcontroller',{update: Math.random().toFixed(5)});
	auxl.player.EnableMobileLocomotion();
	auxl.locomotionText = 'Arrow Buttons';
	//console.log(auxl.mouseController.GetEl())
}
//Controls Menu
function ControlsMenu(state){

	//Old
	if(auxl.controls === 'Desktop'){
		DisableDesktopControls();
	} else if(auxl.controls === 'Mobile'){
		DisableMobileControls();
	} else if(auxl.controls === 'VR'){
		vrHandButton.style.display = 'none';
		vrLocomotionType.style.display = 'none';
		DisableVRControls();
	}
	//New
	if(state === 'Desktop'){
		menuModeButton.innerHTML = 'Mode : Desktop'
		EnableDesktopControls();
	} else if(state === 'Mobile'){
		menuModeButton.innerHTML = 'Mode : Mobile';
		EnableMobileControls();
	} else if(state === 'VR'){
		menuModeButton.innerHTML = 'Mode : VR';
		vrHandButton.style.display = 'flex';
		vrLocomotionType.style.display = 'flex';
		EnableVRControls();
	}
	//Update State
	auxl.controls = state;
	UpdateControls();
}
//VR Hand Menu
function VRHandMenu(state){
	//New
	if(state === 'bothRight'){
		vrHandButton.innerHTML = '2 Hands : Right Ray | Left Move';
	} else if(state === 'bothLeft'){
		vrHandButton.innerHTML = '2 Hands : Left Ray | Right Move';
	} else if(state === 'bothLeftLoco'){
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Left Move';
	} else if(state === 'bothRightLoco'){
		vrHandButton.innerHTML = '2 Hands : Dual Ray | Right Move';
	}
/*
 else if(state === 'right'){
		vrHandButton.innerHTML = '1 Hand : Right Ray | Belt Move';
	} else if(state === 'left'){
		vrHandButton.innerHTML = '1 Hand : Left Ray | Belt Move';
	}
*/
	//Update State
	auxl.vrHand = state;
}

//Pointer Lock
this.PointerLockToggle = () => {
	let toggle = auxl.camera.GetEl().getAttribute('look-controls').pointerLockEnabled;
	auxl.camera.ChangeSelf({property:'look-controls', value:{pointerLockEnabled: !toggle}})
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
				actionCommand = 'Mouse Right Click Down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'Middle Directional Button Down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Grip Down';
			}
		} else if(action === 'altUp'){
			if(auxl.controls === 'Desktop'){
				actionCommand = 'Mouse Right Click up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'Middle Directional Button up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Grip up';
			}
		} else if(action === 'action1Down'){
			if(auxl.controls === 'Desktop'){
				//Special Spacebar
				actionCommand = auxl.controlConfig.action1Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'A down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'X down';
			}
		} else if(action === 'action1Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action1Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'A up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'X up';
			}
		} else if(action === 'action2Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action2Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'B down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Y down';
			}
		} else if(action === 'action2Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action2Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'B up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Y up';
			}
		} else if(action === 'action3Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action3Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'C down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'A down';
			}
		} else if(action === 'action3Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action3Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'C up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'A up';
			}
		} else if(action === 'action4Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action4Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'D down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'B down';
			}
		} else if(action === 'action4Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action4Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'D up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'B up';
			}
		} else if(action === 'action5Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action5Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'F down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick down';
			}
		} else if(action === 'action5Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action5Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'F up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick reset';
			}
		} else if(action === 'action6Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action6Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'G down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick up';
			}
		} else if(action === 'action6Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action6Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'G up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick reset';
			}
		} else if(action === 'action7Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action7Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'H down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick left';
			}
		} else if(action === 'action7Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action7Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'H up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick reset';
			}
		} else if(action === 'action8Down'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action8Keys[1] + ' down';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'I down';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick right';
			}
		} else if(action === 'action8Up'){
			if(auxl.controls === 'Desktop'){
				actionCommand = auxl.controlConfig.action8Keys[1] + ' up';
			} else if(auxl.controls === 'Mobile'){
				actionCommand = 'I up';
			} else if(auxl.controls === 'VR'){
				actionCommand = 'Action Joystick reset';
			}
		} else {
			console.log('Failed to identify action')
		}

		if(actionCommand === '  down'){
			actionCommand = 'Spacebar down';
		} else if(actionCommand === '  up'){
			actionCommand = 'Spacebar up';
		}
		auxl.controlsText += '| ' + actionCommand + ' | ' + auxl.controlsInfo[action].name + ' : ' + auxl.controlsInfo[action].info + '\n';
	}
	auxl.controlsText += 'Click to Close Window'
	//console.log(auxl.controlsText);
}
//Update Controls
function UpdateControls(){
	auxl.UpdateControlText();
	auxl.local.profile.controls = auxl.controls;
	auxl.local.profile.vrHand = auxl.vrHand;
	auxl.SaveToProfile();
}
//Menu Controls Button
function changeControls(){
	if(auxl.controls === 'Desktop'){
		ControlsMenu('VR');
	} else if(auxl.controls === 'VR'){
		ControlsMenu('Mobile');
	} else if(auxl.controls === 'Mobile'){
		ControlsMenu('Desktop');
	}
	UpdateControls();
}
menuModeButton.addEventListener('click', changeControls);
//Cycle VR Configurations
function ChangeVRHand(){
	DisableVRControls();
	auxl.vrHandPrevious = auxl.vrHand;
	if(auxl.vrHand === 'bothRight'){
		VRHandMenu('bothLeft');
	} else if(auxl.vrHand === 'bothLeft'){
		VRHandMenu('bothLeftLoco');
	} else if(auxl.vrHand === 'bothLeftLoco'){
		VRHandMenu('bothRightLoco');
	} else if(auxl.vrHand === 'bothRightLoco'){
		VRHandMenu('bothRight');
	}
/*
 else if(auxl.vrHand === 'right'){
		VRHandMenu('left');
	} else if(auxl.vrHand = 'left') {
		VRHandMenu('bothRight');
	}
*/
	UpdateControls();
	EnableVRControls();
}
vrHandButton.addEventListener('click', ChangeVRHand);
//Change Locomotion Direction Type
function ChangeLocoDirection(){
	if(auxl.directionType === 'camera'){
		auxl.directionType = 'controller';
		vrLocomotionType.innerHTML = 'Direction : Controller';
	} else {
		auxl.directionType = 'camera';
		vrLocomotionType.innerHTML = 'Direction : Camera';
	}
	UpdateControls();
}
vrLocomotionType.addEventListener('click', ChangeLocoDirection);

//Add System Sounds
function AddSystemAudio(){
	let sound;
	for(let each in auxl.playerAudioData.sounds){
		sound = JSON.parse(JSON.stringify(auxl.playerAudioData.sounds[each]));
		if(!sound.volume){
			sound.volume = 1;
		}
		sound.volume *= auxl.volume;
		auxl.playerAudio.ChangeSelf({property: 'auxlsound__'+each, value: auxl.playerAudioData.sounds[each]})
	}
}
//Remove System Sounds
function RemoveSystemAudio(){
	for(let each in auxl.playerAudioData.sounds){
		auxl.playerAudio.removeComponent('auxlsound__'+each)
	}
}

//
//Toggle Audio
function toggleAudio(){
	if(auxl.audioEnabled){
		auxl.audioEnabled = false;
		audioVolume.style.display = 'none';
		audioButton.innerHTML = 'Sound : Disabled';
		RemoveSystemAudio();
	} else {
		auxl.audioEnabled = true;
		audioButton.innerHTML = 'Sound : Enabled';
		audioVolume.style.display = 'flex';
		volume.innerHTML = auxl.volume.toFixed(1);
		AddSystemAudio();
	}
}
audioButton.addEventListener('click', toggleAudio);

//
//Volume Control
//Up
function AudioUp(){
	auxl.volume += 0.1;
	if(auxl.volume > 2){
		auxl.volume = 2;
	}
	volume.innerHTML = auxl.volume.toFixed(1);
	auxl.local.profile.volume = auxl.volume;
	auxl.SaveToProfile();
	if(auxl.playerAudio.core.inScene){
		auxl.playerAudio.DespawnCore();
	}
}
volUpButton.addEventListener('click', AudioUp);
//Down
function AudioDown(){
	auxl.volume -= 0.1;
	if(auxl.volume < 0){
		auxl.volume = 0;
	}
	volume.innerHTML = auxl.volume.toFixed(1);
	auxl.local.profile.volume = auxl.volume;
	auxl.SaveToProfile();
	if(auxl.playerAudio.core.inScene){
		auxl.playerAudio.DespawnCore();
	}
}
volDownButton.addEventListener('click', AudioDown);

//
//Toggle Background Audio
this.ToggleBackgroundAudio = (track) => {
	auxl.backgroundAudio = !auxl.backgroundAudio;
	if(auxl.backgroundAudio){
		if(!auxl.IsFalsey(track)){
			auxl.currentWorld.MusicPlaylist(track);
		} else {
			//XRcade Temp
			if(['entranceZone', 'xrcadeZone'].includes(auxl.currentZone)){
				auxl.currentWorld.MusicPlaylist('town3');
			} else {
				auxl.currentWorld.MusicPlaylist('spookymusic1');
			}
			//Check for scene default first, then zone, then scenario, then world.
			//World Default
			//auxl.currentWorld.MusicPlaylist(Object.keys(auxl.currentWorld.world.soundtracks)[0]);
		}
	} else {
		auxl.currentWorld.MusicPlaylist(false);
	}
}

//
//Toggle Instructions
function ToggleInfo(){
	if(auxl.infoOpen){
		expInfo.style.display = 'none';
		auxl.infoOpen = false;
	} else {
		expInfo.style.display = 'flex';
		auxl.infoOpen = true;
	}
}
viewInfo.addEventListener('click', ToggleInfo);
infoClose.addEventListener('click', ToggleInfo);

//
//Toggle Data
function ToggleData(){
	if(auxl.dataOpen){
		dataInfo.style.display = 'none';
		auxl.dataOpen = false;
	} else {
		dataInfo.style.display = 'flex';
		auxl.dataOpen = true;
	}
}
viewData.addEventListener('click', ToggleData);
dataClose.addEventListener('click', ToggleData);
//Reset Storage
function ResetSystem(){
	//unload current world and reload default world
	if(auxl.comp.inScene){
		auxl.comp.DespawnComp();
	}
	let resetTimeout = setTimeout(function () {
		if(auxl.worldLoaded){
			auxl.currentWorld.StopWorld();
			startButton.innerHTML = 'Restart';
			auxl.worldLoaded = false;
		}
		auxl.SystemLoaded(true);
		ToggleData();
		clearTimeout(resetTimeout);
	}, 750);
}
resetData.addEventListener('click', ResetSystem);
//Reset and Reload
function ResetReload(){
	auxl.SystemLoaded(true);
	window.location.reload();
}
//resetData.addEventListener('click', ResetReload);

//
//Toggle HTML
this.ToggleHTML = (id, show, display) => {
	if(show){
		if(display){
			document.getElementById(id).style.display = display;
		} else {
			document.getElementById(id).style.display = 'block';
		}
	} else {
		document.getElementById(id).style.display = 'none';
	}
}

//
//Support

//Test function and default for components to log when not configured correctly
this.Test = (params) => {
	console.log(params)
}

//Reading Scene

//Clone Dom
this.CloneDom = (dom, deep) => {
	let clone = dom.CloneNode(deep);
	while(auxl.CheckDupeName(clone.id)){
		clone.id = auxl.RanNameGen(8, clone.id);
	}
	return clone;
}

//Convert a-scene data
this.ConvertHTMLScene = () => {
	//grab all children within a-scene
	//loop through all children
	//clone each dom element
	//store assets links seperately as a src collection, each can be linked directly to an entity
	//read mixins as additional settings to remove from base and combine main data
	let scene = {};
	return scene;

}


//
//Misc
this.IsFalsey = (value) => {
  if (
    value === null ||
    value === undefined ||
    //value === 0 ||
    value === false ||
    value === NaN ||
    value === ""||
    value === "false" ||
    value === "False" ||
    value === "FALSE"
  ) {
    return true;
  }
  return false;
};

//
//Links

//Open a Link
this.OpenLink = (link, newTab) => {
	let target = false;
	if(newTab){
		target = '_blank';
	}
	open(link, target);
}

//
//DOM Scene

//Find Entity in Scene
this.FindInScene = (item) => {
	if(auxl.IsFalsey(item)){return false}
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
this.Attach = (child, parent) => {
	//Self
	let item = auxl.FindInScene(child);
	//Parent
	let to = auxl.FindInScene(parent);
	//Attach
	if(!item || !to){
		console.log('Failed to find Child or Parent');
	} else {
		to.appendChild(item);
	}
}
//Remove DOM Ent from parent DOM ent
this.Detach = (child) => {
	//Self
	let item = auxl.FindInScene(child);
	//Detach
	if(!item){
		console.log('Failed to find Child')
	} else {
		auxl.sceneEl.appendChild(item);
	}
}

//
//Return Random from an array
this.RandomOfArray = (array) => {
	return array[Math.floor(Math.random()*array.length)];
}

//
//Shallow Copy object and omit Keys
this.ShallowOmit = (obj, ...keys) => {
	let copy = {...obj};
	keys.forEach(key => {
		const {[key]: omitted, ...breakdown} = copy;
		copy = {...breakdown};
	})
  return copy;
}

//
//Color Theory Generator
//Generate a color theory palette from a given color, color family or a random color. Exported object contains Base, Complementary, Split-complementary, Triadic, Tetradic,[ Analagous & Monochrome(]Not Yet)
this.ColorTheoryGen = (color, family) => {
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
HSLToRGB(Math.abs((hue + 30) % 360), sat, lum),
HSLToRGB(Math.abs((hue + 60) % 360), sat, lum),
HSLToRGB(Math.abs((hue + 90) % 360), sat, lum)
];
let analog = [
RGBToHex(analogRGB[0].r, analogRGB[0].g, analogRGB[0].b),
RGBToHex(analogRGB[1].r, analogRGB[1].g, analogRGB[1].b),
RGBToHex(analogRGB[2].r, analogRGB[2].g, analogRGB[2].b)
];

//
//Monochrome (25-60% | 42%)
let mono = [];
const spread = 0.42;

//Light color
//Some edge cases produce NaN
let lightR = Math.floor(r + (255 - r) * spread, 255);
let lightG = Math.floor(g + (255 - g) * spread, 255);
let lightB = Math.floor(b + (255 - b) * spread, 255);
//Check for NaN and replace with bright 255
lightR = isNaN(lightR) ? 255 : lightR;
lightG = isNaN(lightG) ? 255 : lightG;
lightB = isNaN(lightB) ? 255 : lightB;
let light = RGBToHex(lightR, lightG, lightB);
mono.push(light);

//Dark color
let dark = RGBToHex(
  Math.round(r * (1 - spread)),
  Math.round(g * (1 - spread)),
  Math.round(b * (1 - spread))
);
mono.push(dark);

return {base, light, dark, compl, splitCompl, triadic, tetradic, analog, mono};

}
/*
'red','orange','yellow','lime','blue','cyan','magenta','maroon','olive','green','purple','teal','navy','silver','grey','black','white'
let newColor1 = auxl.ColorTheoryGen();
let newColor1 = auxl.ColorTheoryGen('#00d3d3');
let newColor1 = auxl.ColorTheoryGen(false, 'red');
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
console.log(newColor1.mono[0]);
console.log(newColor1.mono[1]);
*/

//
//Name Generator

//Check for Duplicate Object
this.CheckDupeName = (id) => {
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
this.RanNameGen = (length, prefix) => {
	let name = '';
	let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	let nameLength = (length)? nameLength = Math.floor(Math.random()*length): nameLength = Math.floor(Math.random()*12)+4;

	for(let letter = 0; letter < nameLength; letter++){
		name += auxl.RandomOfArray(alphabet);
	}
	name = (prefix)? prefix+name: name;
	return name;
}

//
//Pronoun Speech Assist
this.Pronoun = (sex) => {
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
//Find ObjGen Type/Data Name
this.ObjGenType = (auxlObj) => {
	if(typeof auxlObj === 'string'){
		return Object.keys(auxl[auxlObj])[0];
	} else {
		return Object.keys(auxlObj)[0]
	}
}

//
//Positioning

//Function to calculate distance between two points
this.Distance = (x1, z1, x2, z2) => {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2) * 1.0);
}
//Return a random position within Ring radius
this.RandomPosition = (radius, yPos) => {
	let posX = Math.random() * (radius*2) - radius;
	let posY = (yPos) ? yPos : Math.random() * (radius*2) - radius;
	let posZ = Math.random() * (radius*2) - radius;
	return new THREE.Vector3(posX, posY, posZ);
}

//
//3D Math Helpers

//Matrix Rotation on Single Axis
this.MatrixAxisRot = (dir, axis, angle) => {
	let rotationMatrix = new THREE.Matrix4();
	let angleMath = 0;
	switch (angle) {
		case 0: angleMath = 0; break;
		case 30: angleMath = Math.PI/6; break;
		case 45: angleMath = Math.PI/4; break;
		case 60: angleMath = Math.PI/3; break;
		case 90: angleMath = Math.PI/2; break;
		case 120: angleMath = 2*Math.PI/3; break;
		case 135: angleMath = 3*Math.PI/4; break;
		case 150: angleMath = 5*Math.PI/6; break;
		case 180: angleMath = Math.PI; break;
		case 210: angleMath = 7*Math.PI/6; break;
		case 225: angleMath = 5*Math.PI/4; break;
		case 240: angleMath = 4*Math.PI/3; break;
		case 270: angleMath = 3*Math.PI/2; break;
		case 300: angleMath = 5*Math.PI/3; break;
		case 315: angleMath = 7*Math.PI/4; break;
		case 330: angleMath = 11*Math.PI/6; break;
		case 360: angleMath = 2*Math.PI; break;
		default: angleMath = Math.PI;
	}
	if(axis === 'x'){
		rotationMatrix.makeRotationX(angleMath);
	} else if(axis === 'y'){
		rotationMatrix.makeRotationY(angleMath);
	} else if(axis === 'z'){
		rotationMatrix.makeRotationZ(angleMath);
	}
	return new THREE.Vector3().copy(dir).applyMatrix4(rotationMatrix);
}


//
//Main

//
//Entity Core
//Single Base Object
this.Core = (data) => {
	return Core(auxl, data);
}
//
//Duplicate Core Data, Core, Layer Data or Layer

//Generate new Core Data from Template
this.CoreDataFromTemplate = (data, edit, assign) => {
	return CoreDataFromTemplate(auxl, data, edit, assign);
}
//Generate new Core from Template
this.CoreFromTemplate = (core, edit, assign) => {
	return CoreFromTemplate(auxl, core, edit, assign);
}

//
//Layered Cores
//Multiple Entity Cores Combined
this.Layer = (id, all, update) => {
	return Layer(auxl, id, all, update);
}

//Generate new Layer from Layer Data Template
this.LayerDataFromTemplate = (layer, coreBaseName, changeParent, layerConfig, assign) => {
	return LayerDataFromTemplate(auxl, layer, coreBaseName, changeParent, layerConfig, assign);
}
//Generate new Layer from Layer Template
this.LayerFromTemplate = (layer, id, changeParent, layerConfig, assign) => {
	return LayerFromTemplate(auxl, layer, id, changeParent, layerConfig, assign);
}

//
//Player
/*
//UniRay
this.UniRay = (id, layer, data) => {
	return UniRay(auxl, id, layer, data);
}
*/

//
//Player
//User Controller, Settings and Actions
this.Player = (id,layer) => {
	return Player (auxl, id, layer);
}

//
//Companion
//System Menu & Inventory
this.Companion = (id, object, inventory) => {
	return Companion(auxl, id, object, inventory);
}

/*
//Powers
this.Powers = (id, data, one, core, layer) => {
	return Powers(auxl, id, data, one, core, layer);
}
*/
//
//Scenes

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
this.SceneNode = (sceneData) => {
	return SceneNode(auxl, sceneData);
}

//
//Map Zone Gen & reader
//mapRegionDistrictTerritoryZoneSection
this.MapZone = (mapZoneData) => {
	return MapZone(auxl, mapZoneData);
}

//
//Scenario Gen
//entireScenarioSpawnLocationAlwaysDisplay
this.Scenario = (scenarioData) => {
	return Scenario(auxl, scenarioData);
}

//
//World Gen
//containAllScenarios
this.World = (worldData) => {
	return World(auxl, worldData);
}

//
//Menu

//
//Menu
//Single Menu | Vertical/Horizontal
this.Menu = (menuData) => {
	return Menu(auxl, menuData);
}

//
//MultiMenu
//Multi Sub Menus | Circle/Vertical/Horizontal
this.MultiMenu = (multiMenuData) => {
	return MultiMenu(auxl, multiMenuData);
}


//
//MegaMenu
//6x Combo Keyboard - Multi Sub Menus | Circle/Vertical/Horizontal
this.MegaMenu = (...multiMenuData) => {
	return MegaMenu(auxl, ...multiMenuData);
}

//
//Quick Hover Menu
//Hold down button to spawn circle menu, hover on option and let go of button. Active hover selection on button up happens and menu closes
this.HoverMenu = (hoverMenuData) => {
	return HoverMenu(auxl, hoverMenuData);
}

//
//Combo Lock
//Enter Correct Sequence to Run Func
this.ComboLock = (id, display, seq, run, position) => {
	return ComboLock(auxl, id, display, seq, run, position);
}

//
//Scroll Multi Menu
//Infinite Scroll of Options
this.ScrollMenu = (id) => {
	return ScrollMenu(auxl, id);
}

//
//Environment

//SkyBox
//Lights, Sky, Space
this.SkyBox = (skyBoxData) => {
	return SkyBox(auxl, skyBoxData);
}

//
//Horizon
//Mountains, Hills, Buildings, Cylinder/Square Wall
this.Horizon = (horizonData) => {
	return Horizon(auxl, horizonData);
}

//
//Ring of Objects
//Randomize Set of Objects from Single in a Ring Radius
this.ObjsGenRing = (objRingData) => {
	return ObjsGenRing(auxl, objRingData);
}

//
//Multi Asset Generator
//Randomize Sets of Various Sized Objects in various Ring Radius'
this.MultiAssetGen = (multiGenData) => {
	return MultiAssetGen(auxl, multiGenData);
}

//
//Teleport
//Generate Teleport Points at Array of Locations
this.Teleport = (id, locations) => {
	return Teleport(auxl, id, locations);
}

//
//NPC

//
//Story Book
//Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
this.Book = (bookData, npc) => {
 return Book(auxl, bookData, npc);
}

//
//Speech System
//Speaking Textbubble
this.SpeechSystem = (core, npc, fixed) => {
	return SpeechSystem(auxl, core, npc, fixed);
}

//
//NPC
//Core Object w/ Book|Pages & Textbubble
this.NPC = (id, object, bookData, textDisplay, special) => {
	return NPC(auxl, id, object, bookData, textDisplay, special);
}

//
//Info Bubble
//Display an Emote or Alert Bubble
this.InfoBubble = (id, object, offset, color) => {
	return InfoBubble(auxl, id, object, offset, color);
}

//
//CreatureGen
//Generate a creature object
this.Creature = (id, attach, customizations) => {
	return Creature(auxl, id, attach, customizations);
}

//
//Grid

//
//Collision
//Build a collision map in 0.5 meter sections 
//Allow or Deny moving outside of collision map
this.Collision = () => {
	return Collision(auxl);
}

//
//Grid Layout
//Spawn coreData, Core, layerData or Layer Objects at Grid Layouts
this.GridLayout = (gridLayoutData) => {
	return GridLayout(auxl, gridLayoutData);
}

//
//Gates
//Grid Based One Direction Close Behind Player
this.Gate = (id, object, direction) => {
	return Gate(auxl, id, object, direction);
}

//
//Physics

//Constraints
this.Constraints = (objGen, linkData, atStart) => {
	return Constraints(auxl, objGen, linkData, atStart);
}


//
//Build a Phys to Attach to Core
this.One = (objGen, oneData) => {
	return One(auxl, objGen, oneData);
}

//
//Build

//
//Build Core/Layer/Other objects in the 3D environment
this.BuildIn3D = () => {
	return BuildIn3D(auxl);
}

//
//Images

//
//Image Swapper
//Main Image and Image Thumbnails Click to Toggle to Main
this.ImageSwapper = (id, mainData, buttonData, ...materials) => {
	return ImageSwapper(auxl, id, mainData, buttonData, ...materials);
}

//
//ImageCarousel
//View large set of Images in a set of Frames and Button Controls
this.ImageCarousel = (carouselData) => {
	return ImageCarousel(auxl, carouselData);
}

//
//Cards
//Build a Trading Card, Business Card, Playing Card, etc...
this.Card = (cardData) => {
	return Card(auxl, cardData);
}


//
//Games

//
//Pet
//A digital pet to take care of
this.Pet = (petData) => {
	return Pet(auxl, petData);
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
		this.auxl.el.emit('sceneLoaded',{});
	}
},
//AUXL Tick - Running Throttled checkSceneLoad()
tick: function (time, timeDelta) {
	//Check for movement related assistance such as blink modes as well as preserving the illusion with scene swaps and loads
	if(this.loadingScene){
		//Run Throttled checkSceneLoad() after scene was read
		if(this.sceneReading){} else {
			this.checkSceneLoadThrottled();
		}
	}

},

});

//
//Export
export default auxl;