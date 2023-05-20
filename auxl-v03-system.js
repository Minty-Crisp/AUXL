//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - System

//
//AUXL System
//Main System, ObjGens & Support Functions
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
this.state = 'play';
this.states = ['play', 'add', 'edit', 'delete'];
this.expStarted = false;
this.defaultWorld;
this.currentWorld;
this.currentZone;
this.worldLoaded = false;
this.local = {};
this.local.profile = {};
this.rebuildObjects = [];

//Controller
let playerRig;
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
	ApplySettings();
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
	auxl.comp.ClearInventoryNotifications();
	auxl.player.Reset();
	for(let each in auxl.rebuildObjects){
		auxl[auxl.rebuildObjects[each]]();
	}
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
//Default Save Data
const newData = () => {
	this.local = {};
	this.local.profile = {};
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
	window.localStorage.setItem("auxl", JSON.stringify(auxl.local));
	ApplySettings();
}
//Load
const loadStorage = () => {
	//Return Session, Load Site Wide Settings
	console.log('Loading previous data.');
	//Overwrite default profile
	this.local = JSON.parse(window.localStorage.getItem("auxl"));
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
}
//Set
//If the value exists then we have already entered once, do not repeat link anims
const setStorage = (reset) => {
  	if(reset){
		newStorage();
	} else if(localStorage.getItem('auxl')){
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
	window.localStorage.setItem("auxl", JSON.stringify(auxl.local));
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
core:{type:'core', spawn: 'SpawnCore', despawn: 'DespawnCore'},
layer:{type:'layer', spawn: 'SpawnLayer', despawn: 'DespawnLayer'},
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
imageSwapper:{type:'imageSwapper', spawn: 'SpawnImgSwap', despawn: 'DespawnImgSwap'},
imageCarousel:{type:'imageCarousel', spawn: 'SpawnImgCarousel', despawn: 'DespawnImgCarousel'},
memory:{type:'memory', spawn: 'SpawnMemGame', despawn: 'DespawnMemGame'},
swipeLaunch:{type:'swipeLaunch', spawn: 'SpawnSLGame', despawn: 'DespawnSLGame'},
guessHit:{type:'guessHit', spawn: 'SpawnGHGame', despawn: 'DespawnGHGame'},
dragDiffuse:{type:'dragDiffuse', spawn: 'SpawnDDGame', despawn: 'DespawnDDGame'},
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
//Check if Exists in Tracker
function ExistsInTracker(id, bookname){
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
//Collision
this.collision = false;

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

//Update Control Info
function UpdateControlText(){
	auxl.controlsText = 'Control Configuration : ' + auxl.controls + ' mode\n';
	//Locomotion
	auxl.controlsText += 'Movement | ' + locomotionText + '\n';
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
		this.locomotionText = 'Left Controller Joystick';
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
		this.locomotionText = 'Right Controller Joystick';
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
			this.locomotionText = 'Left Controller Joystick';
		} else if (auxl.vrHand === 'bothRightLoco'){
			this.locomotionText = 'Right Controller Joystick';
		}
	} else if(auxl.vrHand === 'right'){
		vrController2.setAttribute('visible',true);
		vrController2UI.setAttribute('visible',true);
		vrController2.setAttribute('laser-controls',{hand: 'right'});
		vrController2.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController2.setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 4});
		auxl.player.EnableVRHoverLocomotion('vrController2');
		this.locomotionText = 'Hover on Forward/Backward Belt.';
	} else if(auxl.vrHand === 'left'){
		vrController1.setAttribute('visible',true);
		vrController1UI.setAttribute('visible',true);
		vrController1.setAttribute('laser-controls',{hand: 'left'});
		vrController1.setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		playerRig.setAttribute('universal-controls',{update: 5});
		auxl.player.EnableVRHoverLocomotion('vrController1');
		this.locomotionText = 'Hover on Forward/Backward Belt.';
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
	this.locomotionText = 'WASD Keys';
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
	this.locomotionText = 'Arrow Buttons';
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
	UpdateControlText();
}
//Menu Controls Button
function changeControls(){
	if(auxl.controls === 'Desktop'){
		auxl.controls = 'VR';
		menuModeButton.innerHTML = 'Mode : VR';
		vrHandButton.style.display = 'flex';
		vrLocomotionType.style.display = 'flex';
	} else if(auxl.controls === 'VR'){
		vrHandButton.style.display = 'none';
		vrLocomotionType.style.display = 'none';
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
	if(auxl.worldLoaded){
		auxl.currentWorld.StopWorld();
		startButton.innerHTML = 'Restart';
		auxl.worldLoaded = false;
	}
	auxl.systemLoaded(true);
	toggleData();
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

//Generate new Core Data from Template
this.coreFromTemplate = (data, edit) => {
	let newCore = JSON.parse(JSON.stringify(data));
	//Apply Edits
	if(edit){
		for(let each in edit){
			newCore[each] = edit[each];
		}
	}
	//Generate Unique ID if not Specified
	if(!edit.id){
		let num = 1;
		idRandomize: while (true) {
			if(auxl[newCore.id+num]){
				num++;
				continue idRandomize;
			} else {
				newCore.id = newCore.id + num;
				break;
			}
		}
	}
	//console.log(newCore);
	return newCore;
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
	core.events = {};
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
	//
	const AddToTimeIntEvtCore = ({name,type,id,method,params,events}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			core.events[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			core.events[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			core.events[nameId] = {type, name, id, nameId, method, params, events};
		}
	}
	//
	const ClearCoreTimeIntEvt = () => {
		for(let run in core.events){
			if(core.events[run].type === 'timeout'){
				clearTimeout(auxl.timeouts[core.events[run].nameId]);
				delete auxl.timeouts[core.events[run].nameId];
			} else if (core.events[run].type === 'interval'){
				clearInterval(auxl.intervals[core.events[run].nameId]);
				delete auxl.intervals[core.events[run].nameId];
			} else if (core.events[run].type === 'interaction' || core.events[run].type === 'event'){
auxl[core.events[run].name].GetEl().removeEventListener(core.events[ran].events, function(){
auxlObjMethod(core.events[run].object,core.events[run].method,core.events[run].params);
});
			}
			RemoveFromTimeIntEvtTracker(run);
		}
	}
	//
	function addTimeIntEvt(){
AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
auxl[object].GetEl().addEventListener(line, function(){
	auxlObjMethod(object,method,params);
});
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
		if(this.audioEnabled){
			if(core.sound){
				core.el.setAttribute('sound', core.sound);
			};
			if(core.sounds){
				for(let each in core.sounds){
					core.el.setAttribute('sound__'+each, core.sounds[each]);
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
			core.inScene = true;
		}
	}
	//Despawn Entity Object
	const DespawnCore = () => {
		if(core.inScene){
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
			//Remove from Scene or Parent
			if(core.parent){
				core.parent.removeChild(core.el);
			} else {
				sceneEl.removeChild(core.el);
			}
			//Scene Tracking Support
			if(ExistsInTracker(core.id)){
				RemoveFromTracker(core.id);
			}
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
			console.log(core)
			return false;
		}
		return aEl;
	}
/*
	//Add Event
	const AddEvent = (eventName, action) => {
		if(core.events[action]){}else{
			core.events[action] = {event: eventName, method: action}
		}
	}
	//Spawn Events
	const SpawnEvents = () => {
		//AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
		GetEl().addEventListener(line, function(){
			auxlObjMethod(core,method,params);
		});
	}
*/
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

	return {core, Generate, SpawnCore, DespawnCore, ToggleSpawn, RemoveComponent, ChangeSelf, Animate, GetEl, EmitEvent, SetFlag, GetFlag, EnableDetail, DisableDetail};
}

//
//Layered Cores
//Multiple Entity Cores Combined
this.Layer = (id, all) => {
	let layer = {id, all};
	layer.inScene = false;
	layer.allNames = [];
	layer.children = {};
	layer.tempParents = [];
	layer.parent = false;
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
			if(ExistsInTracker(layer.id)){
				RemoveFromTracker(layer.id);
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
	//Return Parent Element in Scene
	const GetParentEl = () => {
		return layer.all.parent.core.GetEl();
	}
	//Return Child Element in Scene
	const GetChildEl = (child) => {
		let childCore = GetChild(child);
		if(childCore){
			return childCore.GetEl();
		}
	}
	//Return Child Element in Scene
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

	return {layer, SpawnLayer, DespawnLayer, ToggleSpawn, GetParentEl, GetChildEl, GetAllEl, EmitEventParent, EmitEventChild, EmitEventAll, ChangeParent, ChangeChild, ChangeAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, AnimateParent, AnimateChild, AnimateAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, EnableDetailParent, EnableDetailChild, EnableDetailAll, DisableDetailParent, DisableDetailChild, DisableDetailAll, GetChild};
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

	//Spawn Player
	layer.SpawnLayer();
	//Currently not tracking Player object as it should not be removed
	//Grab HTML Elements that have spawned
	id = document.getElementById(layer.id);
	playerSelf = document.getElementById(layer.id);
	div = document.getElementById('div');
	playerRig = document.getElementById('playerRig');
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
	//Enable VR Controller Joystick Locomotion
	const EnableVRLocomotion = () => {
		RemoveBelt();
		playerRig.setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'vr'});
	}
	//Enable VR Belt UI Locomotion
	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer();
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
			auxl.locomotionUILayer.DespawnLayer();
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
	//Play Snap View Anim to the Right 45degrees
	const SnapRight45 = () => {
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
	//Play Snap View Anim to the Left 45degrees
	const SnapLeft45 = () => {
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
	//Play Snap View Anim to the Right 90degrees
	const SnapRight90 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerRig.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY - 90;
			auxl.playerRig.Animate(anim90Data);
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
			let rotY = auxl.playerRig.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY + 90;
			auxl.playerRig.Animate(anim90Data);
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
		auxl.playerRig.ChangeSelf({property: 'position', value: new THREE.Vector3(0,0,1)});

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
	//Get user current infomation
	const GetPlayerInfo = () => {

		return {layer, id: layer.layer.all.parent.core.core.id, pos: playerRig.getAttribute('position'), rot: playerRig.getAttribute('rotation')};
	}
	//Attach to user
	const AttachToPlayer = (element,offset) => {
		let connectPos = new THREE.Vector3(0,0,0);
		if(offset){
			connectPos.x += offset.x;
			connectPos.y += offset.y;
			connectPos.z += offset.z;
		}
		element.setAttribute('attach',{idname: layer.id, position: connectPos});
	}
	//Deattach from user
	const DetachFromPlayer = (element) => {
		element.removeAttribute('attach');
	}
	

	//Assign to each joystick, 
	//Player Rotation
	const UpdatePlayerRotation = (axisX,axisY,axisZ) => {

		let div = new THREE.Vector3(0,0,0);
		div.x = axisX;
		div.y = axisY;
		div.z = axisZ;

		player.ChangeSelf({property: 'rotation', value: div});



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
	const UpdatePlayerPosition = (axisX,axisY,axisZ) => {
		console.log(params);
		let div = new THREE.Vector3(0,0,0);
		div.x = axisX;
		div.y = axisY;
		div.z = axisZ;

		player.ChangeSelf({property: 'position', value: div});

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

	return {layer, Reset, PlayerSceneAnim, UpdateSceneTransitionStyle, PlayerTeleportAnim, UpdateTeleportTransitionStyle, UpdateTransitionColor, UpdateUIText, ToggleBeltText, UpdateBeltText, Notification, TempDisableClick, DisableClick, EnableClick, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight45, SnapLeft45, SnapRight90, SnapLeft90, ToggleFlashlight, ResetUserPosRot,GetPlayerInfo, AttachToPlayer, DetachFromPlayer, TestFunc}
}

//
//Menu
//Single Menu | Vertical/Horizontal
this.Menu = (menuData) => {
	let menu = {};
	menu.inScene = false;
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
	menu.data.position = new THREE.Vector3(0,0,0);
	menu.data.position.x = menuData.pos.x;
	menu.data.position.y = menuData.pos.y;
	menu.data.position.z = menuData.pos.z;

	//Generate & Spawn Menu
	const SpawnMenu = () => {
		if(menu.inScene){}else{
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
			menu.layer.SpawnLayer();
			menu.inScene = true;
		}
	}
	//Despawn Menu
	const DespawnMenu = () => {
		if(menu.inScene){
			menu.layer.DespawnLayer();
			menu.inScene = false;
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				menu[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: menu.id, type: 'menu', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			menu[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: menu.id, type: 'menu', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(menu(flag[each]));
			}
			return flagArray;
		} else {
			return menu[flag];
		}
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

	return {menu, SpawnMenu, DespawnMenu, SetFlag, GetFlag, AddToParentSpawnTracker, RemoveMenuFromSceneTracker};
}

//
//MultiMenu
//Multi Sub Menus | Circle/Vertical/Horizontal
this.MultiMenu = (multiMenuData) => {
	let multiMenu = {};
	multiMenu.data = Object.assign({}, multiMenuData);
	multiMenu.inScene = false;
	multiMenu.menuOpen = false;
	multiMenu.descriptionOpen = false;
	multiMenu.buttonHover = '';
	multiMenu.currentMenu = 'menu0';
	multiMenu.menuPath = ['menu0'];
	multiMenu.switching = false;
	multiMenu.switchingTimeout;
	multiMenu.id = multiMenuData.info.id || 'multiMenu';
	multiMenu.layout = multiMenuData.info.layout || 'circleUp';
	multiMenu.posOffset = multiMenuData.info.posOffset || new THREE.Vector3(0,0,0);
	multiMenu.offset = multiMenuData.info.offset || -1;
	multiMenu.parent = multiMenu.data.info.parent || false;
	multiMenu.stare = multiMenu.data.info.stare || false;

	//circle
	//vertical
	//horizontal
	let circleRot = -45;
	let maxNulls = 0;
	let switchDelay = 250;

	multiMenu.buttonData = JSON.parse(JSON.stringify(multiMenu.data.info.buttonData));

	multiMenu.hoverData = JSON.parse(JSON.stringify(multiMenu.data.info.hoverData));

	multiMenu.nullParentData = {
		data:'nullParentData',
		id:'nullParent',
		sources:false,
		text: false,
		geometry: false,
		material: false,
		position: multiMenu.posOffset,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
	};
/*
	if(multiMenu.stare){
		multiMenu.nullParentData.components['look-at-xyz'] = {match: multiMenu.stare.id, x: multiMenu.stare.x, y: multiMenu.stare.y, z: multiMenu.stare.z}
	}
*/
	if(multiMenu.stare){
		multiMenu.nullParentData.components['stare'] = {id: multiMenu.stare.id, twist: multiMenu.stare.twist,}
	}
	multiMenu.cores = {};
	multiMenu.cores.hover = {};
	//Main Menu Null
	multiMenu.nullParentData.id = multiMenu.id;
	//Default Position
	if(multiMenu.data.info.position){
		multiMenu.nullParentData.position = multiMenu.data.info.position;
	}
	multiMenu.cores.parent = auxl.Core(multiMenu.nullParentData);
	//Reset Null Parent
	multiMenu.nullParentData.position = new THREE.Vector3(0,0,0);
	multiMenu.nullParentData.components = {};
	//Main Button Parent Core
	multiMenu.buttonData.id = multiMenu.data.info.id + 'menu';
	//Layout
	if(multiMenu.layout === 'circleUp' || multiMenu.layout === 'circleDown' ){
		multiMenu.buttonData.position.x = multiMenu.offset;
	}
	multiMenu.cores.main = auxl.Core(multiMenu.buttonData);
	//Sub Button Cores

	//Init each main menu array storage
	for(let menu in multiMenu.data){
		//console.log(menu)
		//console.log(multiMenu.data[menu])
		if(menu === 'info'){}else{
			multiMenu.cores[menu] = [];
			multiMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in multiMenu.data[menu]){
				buttonTotal++;
				//Generate Button Core
				multiMenu.buttonData.id = multiMenu.data[menu][button].id;
				multiMenu.buttonData.text.value = multiMenu.data[menu][button].title;
				//Layout
				if(multiMenu.layout === 'circleUp'){
					multiMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(multiMenu.layout === 'circleDown'){
					multiMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(multiMenu.layout === 'vertical'){
					multiMenu.buttonData.position.y = buttonTotal*multiMenu.offset;
				} else if(multiMenu.layout === 'horizontal'){
					multiMenu.buttonData.position.x = buttonTotal*multiMenu.offset;
				}
				//Reset Button Actions
				multiMenu.buttonData.components = {};
				//Add Button Actions
				if(multiMenu.data[menu][button].action){
					multiMenu.buttonData.components.clickrun = {};
					multiMenu.buttonData.components.clickrun.cursorObj = multiMenu.data[menu][button].action.auxlObj;
					multiMenu.buttonData.components.clickrun.method = multiMenu.data[menu][button].action.method;
					if(multiMenu.data[menu][button].action.component){
						multiMenu.buttonData.components.clickrun.component = multiMenu.data[menu][button].action.component;
					}
					if(multiMenu.data[menu][button].action.params){
						multiMenu.buttonData.components.clickrun.params = multiMenu.data[menu][button].action.params;
					}
					//Menu Controls
					if(multiMenu.data[menu][button].action.menu){
						//menu: 'close', close menu
						//menu: 'goBack', go back 1 menu
						//menu: 'stay', stay in same subMenu
						if(multiMenu.data[menu][button].action.menu === 'stay'){} else if(multiMenu.data[menu][button].action.menu === 'goBack'){

							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ToggleMenu';
							multiMenu.buttonData.components.menurun.params = null;
						} else if(multiMenu.data[menu][button].action.menu === 'close'){
							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ResetMenu';
						}
					} else {
						multiMenu.buttonData.components.menurun = {};
						multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
						multiMenu.buttonData.components.menurun.method = 'ResetMenu';
					}

				} else {
					multiMenu.buttonData.components.menurun = {};
					multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
					multiMenu.buttonData.components.menurun.method = 'SubMenu';
					multiMenu.buttonData.components.menurun.params = multiMenu.data[menu][button].subMenu;
				}

				//Gen Hover
				multiMenu.buttonData.components.mouseenterrun = {};
				multiMenu.buttonData.components.mouseenterrun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				multiMenu.buttonData.components.mouseenterrun.params = button;

				multiMenu.buttonData.components.mouseleaverun = {};
				multiMenu.buttonData.components.mouseleaverun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				multiMenu.buttonData.components.mouseleaverun.params = button;

				multiMenu.hoverData.id = multiMenu.data[menu][button].id + 'hover';
				multiMenu.hoverData.text.value = multiMenu.data[menu][button].description;
				multiMenu.cores.hover[menu][button] = auxl.Core(multiMenu.hoverData);

				//Gen Button
				multiMenu.cores[menu][button] = auxl.Core(multiMenu.buttonData);

			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}

	//Circle Rotation Degree
	//let circleRot = (360/maxNulls+1)*-1;
	//Generate a null parent for the maximum amount of buttons and main button
	multiMenu.cores.nulls = [];
	//If you update the menu to hold more then any preconfigured menu amount of nulls then this breaks, so might as well configure to the max
	//for(let a = 0; a <= maxNulls+1; a++){
	for(let a = 0; a <= 8; a++){
		multiMenu.nullParentData.id = multiMenu.id + 'null' + a;
		if(multiMenu.layout === 'circleUp'){
			multiMenu.nullParentData.rotation.z = circleRot*a;
		} else if(multiMenu.layout === 'circleDown'){
			multiMenu.nullParentData.rotation.z = (circleRot*a)*-1;
		}
		multiMenu.cores.nulls.push(auxl.Core(multiMenu.nullParentData));
	}
	//console.log(maxNulls)
	//console.log(multiMenu.cores.nulls);
	//Init Layer
	multiMenu.menuLayerData = {
		parent: {core: multiMenu.cores.parent},
		child0: {
			parent: {core: multiMenu.cores.nulls[0]},
			child0: {core: multiMenu.cores.main},
		},
	}
	//Init Null Children
	for(let a = 1; a < multiMenu.cores.nulls.length; a++){
		multiMenu.menuLayerData['child'+a] = {};
		multiMenu.menuLayerData['child'+a].core = multiMenu.cores.nulls[a];
	}
	//console.log(multiMenu.menuLayerData);
	//Init Layer
	multiMenu.menuLayer = auxl.Layer(multiMenu.id, multiMenu.menuLayerData);
	//Spawn Menu
	const SpawnMultiMenu = (open) => {
		if(multiMenu.inScene){}else{
			multiMenu.menuLayer.SpawnLayer(multiMenu.parent);
			multiMenu.menuLayer.GetChildEl(multiMenu.id+'null0').addEventListener('click',ToggleMenu);
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Open'}});
			if(open){
				ToggleMenu();
			}
			multiMenu.inScene = true;
		}
	}

	const UpdateParent = (parent) => {
		let newParent = parent || false;
		if(multiMenu.inScene){}else{
			multiMenu.parent = newParent;
		}
	}

	const UpdateSubMenu = (menu,buttons) => {
		if(multiMenu.currentMenu === menu){}else{
			//Purge and Rebuild SubMenu
			multiMenu.cores[menu] = [];
			multiMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in buttons){
				buttonTotal++;
				//Generate Button Core
				multiMenu.buttonData.id = buttons[button].id;
				multiMenu.buttonData.text.value = buttons[button].title;
				//Layout
				if(multiMenu.layout === 'circleUp'){
					multiMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(multiMenu.layout === 'circleDown'){
					multiMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(multiMenu.layout === 'vertical'){
					multiMenu.buttonData.position.y = buttonTotal*multiMenu.offset;
				} else if(multiMenu.layout === 'horizontal'){
					multiMenu.buttonData.position.x = buttonTotal*multiMenu.offset;
				}
				//Reset Button Actions
				multiMenu.buttonData.components = {};
				//Add Button Actions
				if(buttons[button].action){
					multiMenu.buttonData.components.clickrun = {};
					multiMenu.buttonData.components.clickrun.cursorObj = buttons[button].action.auxlObj;
					multiMenu.buttonData.components.clickrun.method = buttons[button].action.method;
					if(buttons[button].action.component){
						multiMenu.buttonData.components.clickrun.component = buttons[button].action.component;
					}
					if(buttons[button].action.params){
						multiMenu.buttonData.components.clickrun.params = buttons[button].action.params;
					}
					//Menu Controls
					if(buttons[button].action.menu){
						//menu: 'close', close menu
						//menu: 'goBack', go back 1 menu
						//menu: 'stay', stay in same subMenu
						if(buttons[button].action.menu === 'stay'){} else if(buttons[button].action.menu === 'goBack'){

							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ToggleMenu';
							multiMenu.buttonData.components.menurun.params = null;
						} else if(buttons[button].action.menu === 'close'){
							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ResetMenu';
						}
					} else {
						multiMenu.buttonData.components.menurun = {};
						multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
						multiMenu.buttonData.components.menurun.method = 'ResetMenu';
					}

				} else {
					multiMenu.buttonData.components.menurun = {};
					multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
					multiMenu.buttonData.components.menurun.method = 'SubMenu';
					multiMenu.buttonData.components.menurun.params = buttons[button].subMenu;
				}

				//Gen Hover
				multiMenu.buttonData.components.mouseenterrun = {};
				multiMenu.buttonData.components.mouseenterrun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				multiMenu.buttonData.components.mouseenterrun.params = button;

				multiMenu.buttonData.components.mouseleaverun = {};
				multiMenu.buttonData.components.mouseleaverun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				multiMenu.buttonData.components.mouseleaverun.params = button;

				multiMenu.hoverData.id = buttons[button].id + 'hover';
				multiMenu.hoverData.text.value = buttons[button].description;
				multiMenu.cores.hover[menu][button] = auxl.Core(multiMenu.hoverData);

				//Gen Button
				multiMenu.cores[menu][button] = auxl.Core(multiMenu.buttonData);
			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}
	//Spawn Sub Menu
	const SpawnMenu = () => {
		if(multiMenu.menuPath.length > 1){
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Back'}});
		} else {
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Close'}});
		}
		multiMenu.menuOpen = true;
		multiMenu.switching = true;
		let currentMenu = multiMenu.currentMenu;
		let nullNum = 1;
		let spawnParent;
		let spawnTimeout = setTimeout(() => {
			for(let button in multiMenu.cores[currentMenu]){
				spawnParent = multiMenu.menuLayer.GetChildEl(multiMenu.id+'null'+nullNum);
				multiMenu.cores[currentMenu][button].SpawnCore(spawnParent);
				nullNum++;
			}
			clearTimeout(spawnTimeout);
		}, switchDelay);
		multiMenu.switchingTimeout = setTimeout(() => {
			multiMenu.switching = false;
			clearTimeout(multiMenu.switchingTimeout);
		}, switchDelay*2);
	}
	//Despawn Sub Menu
	const DespawnMenu = (instant) => {
		multiMenu.menuOpen = false;
		multiMenu.switching = true;
		let currentMenu = multiMenu.currentMenu;
		let nullNum = 1;
		let spawnParents = {};
		let despawnDelay;
		if(instant){
			despawnDelay = 25;
		} else {
			despawnDelay = switchDelay;
		}
		if(multiMenu.descriptionOpen){
			DespawnDescription(multiMenu.buttonHover);
		}
		let despawnTimeout = setTimeout(() => {
			for(let button in multiMenu.cores[currentMenu]){
				spawnParents[button] = multiMenu.menuLayer.GetChildEl(multiMenu.id+'null'+nullNum);
				multiMenu.cores[currentMenu][button].DespawnCore();
				nullNum++;
			}
			clearTimeout(despawnTimeout);
		}, despawnDelay);
		multiMenu.switchingTimeout = setTimeout(() => {
			multiMenu.switching = false;
			clearTimeout(multiMenu.switchingTimeout);
		}, despawnDelay*2);
	}

	const ToggleMenu = () => {
		if(multiMenu.switching){}else{
			if(multiMenu.menuOpen){
				if(multiMenu.menuPath.length > 1){
					SubMenu(multiMenu.menuPath[multiMenu.menuPath.length-2]);
				} else {
					ResetMenu();
				}
			} else {
				SpawnMenu();
			}
		}
	}

	const DefaultMenu = () => {
		multiMenu.currentMenu = 'menu0';
		multiMenu.menuPath = ['menu0'];
		multiMenu.menuOpen = false;
	}

	const ResetMenu = (instant) => {
		multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Open'}});
		let despawnDelay;
		if(instant){
			despawnDelay = 0;
		} else {
			despawnDelay = switchDelay;
		}
		if(multiMenu.switching){}else{
			if(multiMenu.menuOpen){
				let resetTimeout = setTimeout(() => {
					DespawnMenu(instant);
					DefaultMenu();
					clearTimeout(resetTimeout);
				}, despawnDelay);
			}
		}
	}

	const SubMenu = (newMenu) => {
		if(multiMenu.switching){}else{
			DespawnMenu();
			multiMenu.currentMenu = newMenu;
			if(multiMenu.menuPath.includes(multiMenu.currentMenu)){
				multiMenu.menuPath.pop();
			} else {
				multiMenu.menuPath.push(multiMenu.currentMenu);
			}
			SpawnMenu();
		}
	}

	const DespawnMultiMenu = () => {
		if(multiMenu.inScene){
			ResetMenu(true);
/*
			multiMenu.menuLayer.GetChildEl('null0').removeEventListener('click',ToggleMenu);
			multiMenu.menuLayer.DespawnLayer();
			multiMenu.inScene = false;
*/
			let resetTimeout = setTimeout(() => {
				multiMenu.menuLayer.GetChildEl(multiMenu.id+'null0').removeEventListener('click',ToggleMenu);
				multiMenu.menuLayer.DespawnLayer();
				multiMenu.inScene = false;
				clearTimeout(resetTimeout);
			}, switchDelay);

		}
	}

	const SpawnDescription = (button) => {
		if(multiMenu.descriptionOpen){}else{
			multiMenu.buttonHover = button;
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();

			multiMenu.cores.hover[multiMenu.currentMenu][button].SpawnCore(spawnParent);
			multiMenu.descriptionOpen = true;
		}
	}

	const DespawnDescription = (button) => {
		if(multiMenu.descriptionOpen){
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();
			multiMenu.cores.hover[multiMenu.currentMenu][button].DespawnCore();
			multiMenu.buttonHover = '';
			multiMenu.descriptionOpen = false;
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				multiMenu[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: multiMenu.id, type: 'multiMenu', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			multiMenu[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: multiMenu.id, type: 'multiMenu', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(multiMenu(flag[each]));
			}
			return flagArray;
		} else {
			return multiMenu[flag];
		}
	}

	return {multiMenu, SpawnMultiMenu, DespawnMultiMenu, ToggleMenu, UpdateParent, UpdateSubMenu, SubMenu, ResetMenu, SpawnDescription, DespawnDescription};
}

//
//Companion
//System Menu & Inventory
this.Companion = (id, object) => {
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

	comp.id = id;
	comp.inScene = false;
	comp.toggle = false;
	comp.infoDisplay = false;
	comp.pos = auxl.playerRig.GetEl().getAttribute('position');
	comp.height = 1.5;
	comp.distance = -2;
	comp.firstSpawn = true;

	comp.viewConfig = false;

	//Inventory
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
		button0:{
			id: 'subMenu1',
			style: false,
			title: 'Inventory',
			description: 'View your inventory.',
			subMenu: 'inventory',
			action: false,
		},
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				menu: 'goBack',
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
				params: 'compCube',
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
				params: 'compSphere',
				menu: 'close',
			},
		},
		button3:{
			id: 'action4',
			style: false,
			title: 'Plane',
			description: 'Change to a plane avatar.',
			subMenu: false,
			action: {
				auxlObj: 'comp',
				component: false,
				method: 'UpdateShape',
				params: 'compPlane',
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
	items1:{
		button0:{
			id: 'testItem1',
			style: false,
			title: 'Test Item 1',
			description: 'A test item.',
			subMenu: false,
			action: {
				auxlObj: 'itemObj',
				component: false,
				method: 'itemMethod',
				params: null,
				menu: 'close',
			},
		},
	},
	tools1:{
		button0:{
			id: 'testTool1',
			style: false,
			title: 'Test Tool 1',
			description: 'A test tool.',
			subMenu: false,
			action: {
				auxlObj: 'toolObj',
				component: false,
				method: 'toolMethod',
				params: null,
				menu: 'close',
			},
		},
	},
	keys1:{
		button0:{
			id: 'testKey1',
			style: false,
			title: 'Test Key 1',
			description: 'A test key.',
			subMenu: false,
			action: {
				auxlObj: 'keyObj',
				component: false,
				method: 'keyMethod',
				params: null,
				menu: 'close',
			},
		},
	},
	specials1:{
		button0:{
			id: 'testSpecial1',
			style: false,
			title: 'Test Special 1',
			description: 'A test special object.',
			subMenu: false,
			action: {
				auxlObj: 'specialObj',
				component: false,
				method: 'specialMethod',
				params: null,
				menu: 'close',
			},
		},
	},
	};
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
			if(comp.avatarType === 'core'){
				buddy = comp.avatar.GetEl();
			} else {
				buddy = comp.avatar.GetParentEl();
			}
			speechIntervalB = setInterval(function() {
				buddyFaceMaterial.value = emotiSpeechArray[b];
				buddy.setAttribute('text', buddyFaceMaterial);
				if(b === emotiSpeechArray.length){b = 0}else{b++}
			}, 2700);
		}, 250);
	}
	//Update Shape
	const UpdateShape = (newObj) => {
		let respawn = false;
		if(comp.inScene){
			respawn = true;
			DespawnComp();
		}
		let rebuildTimeout = setTimeout(function () {
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
		if(comp.toggle){}else{
			if(comp.inScene){
				DespawnComp();
			} else {
				SpawnComp();
			}
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
			if(comp.avatarType === 'core'){
				comp.avatar.SpawnCore(auxl.playerRig.GetEl());
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
				}
			} else {
				comp.avatar.SpawnLayer(auxl.playerRig.GetEl());
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
				}
			}
			//autoScriptEmoticon();
			//console.log(auxl.build)
			let spawnTimeout = setTimeout(() => {
				//auxl.build.SpawnBuild();
				//Update Inventory
				UpdateInventoryMenu();
				//Update Main Menu Parent Shape ID
				auxl.mainMenu.multiMenu.parent = comp.menuParentId;
				auxl.mainMenu.SpawnMultiMenu();
				ToggleSpawnClick();
				clearTimeout(spawnTimeout);
			}, 100);
			comp.inScene = true;
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
				if(comp.avatarType === 'core'){
					comp.avatar.DespawnCore();
				} else {
					comp.avatar.DespawnLayer();
				}
				RemoveFromTracker(comp.id);
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
	//Add To Inventory
	const AddToInventory = ({item, hide}) => {
		function inventoryAdd(item){
			if(comp[item.category][item.name]){
				if(comp[item.category][item.name].persist = 'limited'){
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
				if(comp[item.category][item.name].persist = 'limited'){
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
		let currNum = 1;
		let currPage = 1;
		let total = Object.keys(comp[category]).length;
		let pages = Math.ceil(total/8);
		let subMenuName = category + currPage;

		for(let each in comp[category]){
			let name;
			if(comp[category][each].persist === 'limited'){
				name = comp[category][each].name+' x'+comp[category][each].amount;
			} else {
				name = comp[category][each].name;
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
					menu: 'close',
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

	return{comp, TestFunc, UpdateShape, SpawnComp, DespawnComp, SetFlag, GetFlag, UpdatePosition, ToggleControlView, AddToInventory, ClearInventoryNotifications, RemoveFromInventory, CheckInventory, CheckForKey};
}

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
this.SceneNode = (sceneData) => {
	let core = Object.assign({}, sceneData);
	//Scene Text Support
	let textBubble = auxl.Core(this.sceneTextData);
	let sceneText = auxl.SpeechSystem(textBubble);
	//Minimum Scene Loading Timeout
	let loadTimeout;
	let minLoadTime = 400;
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
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
	//Switch support to run auxlObjMethod()
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
				switchCases.push(each)
			}
		}
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			let switchCondition = auxl[condObj].GetFlag(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			let switchCondition = auxl[condObj].GetFlagParent(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else {
			console.log(condObj);
			console.log('Unable to find value');
			console.log(switchInfo.cond);
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
		//Fog
		if(time === 'info'){
			if(core[time].fog){
				sceneEl.setAttribute('fog',core[time].fog);
			} else {
				sceneEl.setAttribute('fog',{type: "linear", near: 999, far: 1000, color: "#FFF" });
			}
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
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
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
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
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
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
										if(auxl[b].GetFlag(endCond) === true){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromTimeIntEvtTracker(line+b);
										}
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else {
						console.log(time)
						console.log(line)
						console.log(a)
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
		UpdateControlText();
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
		auxl.sceneReading = true;
		Info();
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
		sceneTextDisplay();
		loadTimeout = setTimeout(() => {
			auxl.sceneReading = false;
			clearTimeout(loadTimeout);
		}, minLoadTime);
		auxl.local.location.scene = core.info.id;
		auxl.saveToProfile();
		if(auxl.local.location.load){
			auxl.local.location.load = false;
		}
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
	core.mapMainMenuData = false;
	core.mapMenu;
	core.nodes = {};
	//core.info;
	core.currentNode;
	core.zoneLoaded = false;
	core.displayBasicTravelMenu = core.info.travelMenu || false;
	//Map Movement Support
	let timeout;
	let timeout2;
	let newNode;

	//Prepare Zone Map
	const ReadMapData = () => {
		for(let key in core.map){
			core.nodes[key] = auxl[key];
		}
	}
	//ReadMapData();
	//Update Map
	const UpdateMap = (data) => {
		core.nodes = {};
		core.map = data;
		for(let key in data){
			core.nodes[key] = auxl[key];
		}
	}
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
	//Switch support to run auxlObjMethod()
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
				switchCases.push(each)
			}
		}
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			let switchCondition = auxl[condObj].GetFlag(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			let switchCondition = auxl[condObj].GetFlagParent(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else {
			console.log(condObj);
			console.log('Unable to find value');
			console.log(switchInfo.cond);
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
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
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
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
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
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
										if(auxl[b].GetFlag(endCond) === true){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromZoneTimeIntEvtTracker(line+b);
										}
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
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
		//UpdateControlText();
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
		core.zoneLoaded = false;
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
		if(auxl.local.location.load){
			core.currentNode = auxl.local.location.scene;
		} else {
			core.currentNode = nodeName || core.info.start;
		}
		core.currentZone = core.info.id;
		auxl.currentZone = core.info.id;
		if(core.zoneLoaded){} else {
			StartZone();
			auxl.local.location.zone = core.info.id;
			core.zoneLoaded = true;
		}
		auxl[core.currentNode].StartScene();
		//Main Menu Travel Update
		MoveMainMenuUpdate();
		//Basic Zone Menu Travel Update
		if(core.displayBasicTravelMenu){
			MoveSpawnMenu();
		}
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
		for(let connect in core.map[core.currentNode]){
			//In Zone Node or Out of Zone Node
			if(core.nodes[core.map[core.currentNode][connect].node]){
				moveToNode = core.nodes[core.map[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core.map[core.currentNode][connect].node];
			}
			//Open, Locked or Unlocked Travel
			if(core.map[core.currentNode][connect].locked && !auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Locked]';
			} else if(core.map[core.currentNode][connect].locked && auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
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
	//Generate & Spawn MapZone Map Menu
	const MoveMainMenuUpdate = () => {
		core.mapMainMenuData = {};
		let buttonTemplate = {};
		let currNum = 0;
		let moveToNode;
		let nodeName;
		//scenario UpdateZoneMap
		if(auxl.local.location.load){}else{
			if(auxl.local.location.scenario === ''){}else{
				auxl[auxl.local.location.scenario].UpdateZoneMap();
			}
		}
		for(let connect in core.map[core.currentNode]){
			//console.log(connect)
			//console.log(core[core.currentNode][connect])
			//In Zone Node or Out of Zone Node
			if(core.nodes[core.map[core.currentNode][connect].node]){
				moveToNode = core.nodes[core.map[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core.map[core.currentNode][connect].node];
			}
			//Open, Locked or Unlocked Travel
			if(core.map[core.currentNode][connect].locked && !auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				nodeName = moveToNode.core.info.name + ' [Locked]';
			} else if(core.map[core.currentNode][connect].locked && auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				nodeName = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				nodeName = moveToNode.core.info.name;
			}
			//Update Button
			buttonTemplate = {
				id: 'action'+currNum,
				style: false,
				title: nodeName,
				description: 'Travel to '+nodeName,
				subMenu: false,
				action: {
					auxlObj: core.currentZone,
					component: false,
					method: 'Move',
					params: connect,
					menu: 'close',
				},
			};
			core.mapMainMenuData['button'+currNum] = buttonTemplate;
			currNum++;
		}
		//Update Companion main menu
		auxl.mainMenu.UpdateSubMenu('menu1',core.mapMainMenuData);
		//console.log(auxl.mainMenu.multiMenu.cores.menu1)
		//auxl.mainMenu.multiMenu.cores.menu1
	}
	//MapZone Menu Click
	const MenuMoveClick = (el) => {
		let result = el.getAttribute('result');
		Move(result);
	}
	//Move Scenes
	const Move = (connect) => {
		newNode = core.map[core.currentNode][connect];
		//Check for Lock & Keys
		if(newNode.locked && !auxl.comp.CheckForKey(newNode.keyId)){
			clearTimeout(timeout2);
			auxl.player.Notification({message:'Requires : ' + newNode.keyName});
		} else {
			if(newNode.locked && auxl.comp.CheckForKey(newNode.keyId) && !newNode.keepKey){
				auxl.comp.RemoveFromInventory(newNode.keyId);
			}
			//Move to NodeScene and/or MapZone
			timeout = setTimeout(() => {
				if(core.displayBasicTravelMenu){
					core.mapMenu.DespawnMenu();
				}
				ClearScene();
				//Reset User Position/Rotation
				auxl.player.ResetUserPosRot();
				if(core.nodes[newNode.node]){
					StartScene(newNode.node);
				} else {
					ClearZone();
					core.zoneLoaded = false;
					auxl[newNode.inZone].StartScene(newNode.node);
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
		if(core.displayBasicTravelMenu){
			core.mapMenu.DespawnMenu();
		}
	}

	return {core, UpdateMap, StartScene, MoveSpawnMenu, MenuMoveClick, Move, ClearZone};
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
	//Switch support to run auxlObjMethod()
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
				switchCases.push(each)
			}
		}
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			let switchCondition = auxl[condObj].GetFlag(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			let switchCondition = auxl[condObj].GetFlagParent(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else {
			console.log(condObj);
			console.log('Unable to find value');
			console.log(switchInfo.cond);
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
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
											if(auxl[b].GetFlag(endCond) === true){
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
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
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
										if(auxl[b].GetFlag(endCond) === true){
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
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
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
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
		//UpdateControlText();
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
			//Update Zone Map
			UpdateZoneMap();
			//Update HTML
			updateHTMLTitle();
			updateHTMLInstructions();
			//Get Universal Controls component
			auxl.universalControls = document.getElementById('playerRig').components['universal-controls'];
			//Start scene mid Player anim
			startTimeout = setTimeout(() => {
				//Load All Scenario Items
				Init();
				//zone to start in
				if(auxl.local.location.load){
					zoneSpawn = auxl.local.location.zone;
				} else {
					zoneSpawn = core.info.startZone;
				}
				auxl[zoneSpawn].StartScene();
				core.scenarioLoaded = true;
				auxl.local.location.scenario = core.info.id;
				clearTimeout(startTimeout);
			}, 425);
		}
	}
	//Exit & Clear Scenario
	const ClearScenario = () => {
		//unload current zone and scene
		auxl[auxl[auxl.currentZone].core.currentNode].ClearScene();
		auxl[auxl.currentZone].ClearZone();
		Exit();
		ClearScenarioTimeIntEvt();
		RemoveControls();
		clearSpawned(auxl.scenarioSpawned);

		core.scenarioLoaded = false;
	}
	//Update Zone Maps
	const UpdateZoneMap = () => {
		for(let key in core.map){
			//console.log(key)
			//console.log(core.map[key])
			auxl[key].UpdateMap(core.map[key]);
		}
	}

	return {core, StartScenario, ClearScenario, UpdateZoneMap};
}

//
//World Gen
//containAllScenarios
this.World = (worldData) => {

	let world = {};
	world.data = Object.assign({}, worldData);
	world.id = world.data.info.id;
	world.name = world.data.info.name;
	world.scenarios = world.data.scenarios;
	world.current = 0;
	world.loaded = false;
	world.scenarioLoaded = false;

	//Set World as Default
	const SetAsDefault = () => {
		auxl.defaultWorld = auxl[world.id];
	}
	//Start World at Default Scenario
	const StartWorld = () => {
		StartScenario(world.current);
		auxl.currentWorld = auxl[world.id];
		auxl.worldLoaded = true;
		auxl.local.location.world = world.id;
	}
	//Stop World
	const StopWorld = () => {
		ClearScenario(world.current);
		auxl.worldLoaded = false;
	}
	//Start a Scenario
	const StartScenario = (num) => {
		world.current = num;
		world.scenarios[num].StartScenario();
		world.scenarioLoaded = true;
	}
	//Clear a Scenario
	const ClearScenario = (num) => {
		world.scenarios[num].ClearScenario();
		world.scenarioLoaded = false;
	}
	//Next Scenario
	const NextScenario = () => {
		ClearScenario(world.current);
		world.current++;
		StartScenario(world.current);
	}
	//Load Scenario
	const LoadScenario = (num) => {
		ClearScenario(world.current);
		world.current = num;
		StartScenario(world.current);
	}

	return {world, SetAsDefault, StartWorld, StopWorld, StartScenario, ClearScenario, NextScenario, LoadScenario}
}


//
//Story Book
//Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
this.Book = (bookData, npc) => {
	let progress = 0;
	//Run Object Generator Function within Book w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		if(object === 'self'){
			object = npc.id;
		}
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
		//Update and Check Book Progress
		progress++;
		if(progress >= Object.keys(book.pages.page0).length-1){
			npc.bookEnd = true;
		} else {
			npc.bookEnd = false;
		}
		//Run Line
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
			if(time === bookData.jumpTo){
				bookData.jumping = false;
			}
			if(bookData.jumping){}else{
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
		progress = 0;
		npc.bookEnd = false;
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
	let book = bookReader(bookData);
	//Yield Timeline
	function* idleLineReader(book,time){
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
	function* idleTimeReader(book,page){
		for(let time in page){
			book.currentTimeline = time;
			book.timelineQue.push([time,page[time]]);
			//Skip|Ignore Data til timeline# reach if jumping
			if(time === bookData.jumpTo){
				bookData.jumping = false;
			}
			if(bookData.jumping){}else{
				yield* idleLineReader(book, page[time]);
			}
		}
	}
	//Yield Page
	function* idlePageReader(book){
		for(let page in book.idle){
			book.currentPage = page;
			book.pageQue.push([page,book.idle[page]]);
			yield* idleTimeReader(book, book.idle[page]);
		}
	}
	//Yield Book
	function* idleBookReader(book){
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
		yield* idlePageReader(book);
	};
	let idle;
	if(bookData.idle){
		idle = idleBookReader(bookData);
	}
	//Read Book Timeline
	function readTimeline({page,time}){
		for(let line in bookData.pages[page][time]){
			if(line === 'pureFunction'){
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in bookData.pages[page][time][line]){
					auxl[line][a](bookData.pages[page][time][line][a]);
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
	//Next Idle Yield
	const IdleNext = () => {
		idle.done = idle.next().done;
		if(idle.done){
			//console.log('All Done!');
		} else {
			//console.log('Continue...')
		}
	}
	//Jump to Timeline
	const Jump = ({timeline, page}) => {
		let toPage = page || bookData.currentPage;
		bookData.jumpTo = timeline;
		if(bookData.pages[toPage][bookData.jumpTo]){
			bookData.jumping = true;
		}
	}
	//Jump Menu
	const SelectJump = (jumpOptions) => {
		let selectedTime;
		let selectedPage = false;
		let selectJumpData = {
			id: 'selectJump',
			prompt: jumpOptions[0],
			options: {},
			actions: {},
			data: auxl.menuBaseData,
			cursorObj: npc.id,
			pos: new THREE.Vector3(1,1.5,-0.5),
			method: 'Click',
		}
		for(let a = 1; a < jumpOptions.length; a++){
			selectJumpData.options['option'+(a-1)] = jumpOptions[a][0];
			selectJumpData.actions['action'+(a-1)] = jumpOptions[a][1];
		}
		book.selectJumpMenu = auxl.Menu(selectJumpData);
		book.selectJumpMenu.SpawnMenu();
		book.selectJumpMenu.AddToParentSpawnTracker(book.selectJumpMenu, npc);
		//npc.GetEl().classList.toggle('clickable', false);
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().classList.toggle('clickable', false);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].classList.toggle('clickable', false);
			}
		}
	}

	return {bookData, book, Next, IdleNext, Jump, SelectJump, readTimeline};
}

//
//Speech System
//Speaking Textbubble
this.SpeechSystem = (core, npc) => {
	core.on = false;
	core.speaking = false;
	core.blinking = false;
	core.blinkNextText = '';
	core.blinkText0 = '';
	core.blinkText1 = '';
	core.textDisplayInterval;
	//Start Textbubble
	const Start = () => {
		core.SpawnCore();
		core.GetEl().addEventListener('mouseenter', Skip);
		core.on = true;
	}
	//Skip to end of speech
	const Skip = () => {
		core.GetEl().emit('skip',{});
	}
	//Stop Textbubble
	const Stop = () => {
		if(core.on){
			core.GetEl().removeEventListener('mouseenter', Skip);
			core.DespawnCore();
			core.on = false;
		}
	}
	//Kill Speech
	const Kill = () => {
		core.speaking = false;
		clearInterval(auxl.intervals[core.core.id]);
		delete auxl.intervals[core.core.id];
	}
	//Kill Blink
	const KillBlink = () => {
		core.blinking = false;
		clearInterval(auxl.intervals[core.core.id+'blink']);
		delete auxl.intervals[core.core.id+'blink'];
	}
	//Kill Speech & Stop Textbuble
	const KillStop = () => {
		Kill();
		KillBlink();
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
		KillBlink();
		let startText = role + ' : ';
		let currText = startText;
		let currChar = 0;
		core.GetEl().setAttribute('text',{value: currText});
		core.speaking = true;

		function skipText(){
			core.GetEl().setAttribute('text',{value: startText + speech});
			core.speaking = false;
			Kill();
			if(core.blink){
				core.blinkText0 = startText + speech;
				core.blinkText1 = startText + speech;
				if(npc.bookEnd){
					core.blinkNextText = ' X';
				} else {
					core.blinkNextText = ' ->';
				}
				core.blinkText1 += core.blinkNextText;
				Blink();
			}
			core.GetEl().removeEventListener('skip',skipText);
		}
		core.GetEl().addEventListener('skip', skipText);

		AddToTimeIntEvtTracker({name: 'textDisplayInterval', type: 'interval', id: core.core.id});
		auxl.intervals[core.core.id] = setInterval(() => {
			//Interval Functions
			if(currChar < speech.length){
				currText += speech[currChar];
				currChar++;
			}
			if(currChar >= speech.length){
				core.speaking = false;
				core.GetEl().removeEventListener('skip',skipText);
				Kill();
				if(core.blink){
					core.blinkText0 = currText;
					core.blinkText1 = currText;
					if(npc.bookEnd){
						core.blinkNextText = ' X';
					} else {
						core.blinkNextText = ' ->';
					}
					core.blinkText1 += core.blinkNextText;
					Blink();
				}
			}
			if(core.on){
				core.GetEl().setAttribute('text',{value: currText});
			}
		}, 20);
	}
	//Blink
	const Blink = () => {
		AddToTimeIntEvtTracker({name: 'blinkDisplayInterval', type: 'interval', id: core.core.id});
		auxl.intervals[core.core.id+'blink'] = setInterval(() => {
			if(core.blinking){
				core.GetEl().setAttribute('text',{value: core.blinkText1});
				core.blinking = false;
			} else {
				core.GetEl().setAttribute('text',{value: core.blinkText0});
				core.blinking = true;
			}
		}, 1000);
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
this.NPC = (id, object, bookData, textDisplay) => {
	let npc = {};
	npc.avatar = Object.assign({}, object);
	npc.avatarType;
	npc.parentId;
	if(object.SpawnCore){
		npc.avatarType = 'core';
		npc.parentId = object.core.id;
	} else if(object.SpawnLayer){
		npc.avatarType = 'layer';
		npc.parentId = object.layer.all.parent.core.core.id;
	}
	npc.id = id;
	npc.inScene = false;
	npc.speaking = false;
	npc.bookEnd = false;
	npc.idle = false;
	npc.idleSpeech = false;
	if(bookData.info.name){
		npc.name = bookData.info.name;
	} else {
		npc.name = npc.id;
	}
	let bubble = Object.assign({}, textDisplay);
	bubble.blink = true;
	let book;
	let text = auxl.SpeechSystem(bubble, npc);

	//Idle
	if(bookData.idle){
		npc.idleSpeech = true;
	}
	let idleTimeout;
	let idleDelayTime = bookData.info.idleDelay || 7000;
	let idleInterval;
	let idleIntervalTime = bookData.info.idleInterval || 10000;
	let menuTimeout;

	//Get NPC Element
	const GetNPCEl = () => {
		let allEl;
		if(npc.avatarType === 'core'){
			allEl = npc.avatar.GetEl();
		} else {
			allEl = npc.avatar.GetAllEl();
		}
		return allEl;
	}
	//AddEventListener to Avatar
	const AddNPCEvents = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().addEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].addEventListener(eventName, method);
			}
		}
	}
	//RemoveEventListener to Avatar
	const RemoveNPCEvents = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().removeEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].removeEventListener(eventName, method);
			}
		}
	}
	//Spawn NPC, Reset Book & Start Speaking
	const SpawnNPC = () => {
		if(npc.inScene){}else{
			//Reset book on each spawn
			book = auxl.Book(bookData, npc);
			//npc.SpawnCore();
			if(npc.avatarType === 'core'){
				npc.avatar.SpawnCore();
			} else {
				npc.avatar.SpawnLayer();
			}
			//npc.GetEl().addEventListener('mouseenter', EnableSpeech);
			AddNPCEvents('mouseenter', EnableSpeech);
			if(npc.idleSpeech){
				idleTimeout = setTimeout(() => {
					EnableIdleSpeech()
					clearTimeout(idleTimeout);
				}, idleDelayTime);
			}
			npc.inScene = true;
		}
	}
	//Despawn NPC
	const DespawnNPC = () => {
		if(npc.inScene){
			if(npc.speaking){
				//npc.GetEl().removeEventListener('mouseenter', NextPage);
				//npc.GetEl().removeEventListener('click', ResetBook);
				RemoveNPCEvents('mouseenter',NextPage);
				RemoveNPCEvents('click',ResetBook);
			} else {
				//npc.GetEl().removeEventListener('mouseenter', EnableSpeech);
				RemoveNPCEvents('mouseenter',EnableSpeech);
			}
			ClearBookSpawn();
			clearTimeout(idleTimeout);
			DisableSpeech();
			DisableIdleSpeech();
			//npc.DespawnCore();
			if(npc.avatarType === 'core'){
				npc.avatar.DespawnCore();
			} else {
				npc.avatar.DespawnLayer();
			}
			RemoveFromTracker(npc.id);
			npc.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(npc.inScene){
			DespawnNPC();
		} else {
			SpawnNPC();
		}
	}
	//Clear Book Spawned Objects
	const ClearBookSpawn = () => {
		clearSpawned(auxl.bookSpawned[npc.id]);
		delete auxl.bookSpawned[npc.id];
	}
	//Prep & Start NPC Speaking
	const EnableSpeech = () => {
		if(npc.idle){
			DisableIdleSpeech();
		}
		clearTimeout(idleTimeout);
		npc.speaking = true;
		//npc.GetEl().removeEventListener('mouseenter', EnableSpeech);
		RemoveNPCEvents('mouseenter',EnableSpeech);
		text.Start();
		//npc.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}})
		if(npc.avatarType === 'core'){
			npc.avatar.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}});
		} else {
			npc.avatar.ChangeParent({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}});
		}
		//Jump over Info to Timeline0
		NextPage();
		NextPage();
		//npc.GetEl().addEventListener('mouseenter', NextPage);
		//npc.GetEl().addEventListener('click', ResetBook);
		AddNPCEvents('mouseenter',NextPage);
		AddNPCEvents('click',ResetBook);
	}
	//Disable NPC Speaking
	const DisableSpeech = () => {
		text.KillStop();
		//npc.GetEl().removeEventListener('mouseenter', NextPage);
		//npc.GetEl().removeEventListener('click', ResetBook);
		RemoveNPCEvents('mouseenter',NextPage);
		RemoveNPCEvents('click',ResetBook);
	}
	//Prep & Start NPC Speaking
	const EnableIdleSpeech = () => {
		npc.idle = true;
		text.Start();
		//npc.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}})
		if(npc.avatarType === 'core'){
			npc.avatar.ChangeSelf({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}});
		} else {
			npc.avatar.ChangeParent({property: 'attach', value: {idname: text.core.core.id, position: text.core.core.position}});
		}
		//Jump over Info to Timeline0
		IdleNext();
		IdleNext();
		idleInterval = setInterval(() => {
			IdleNext();
		}, idleIntervalTime);
	}
	//Disable NPC Speaking
	const DisableIdleSpeech = () => {
		clearInterval(idleInterval);
		npc.idle = false;
	}
	//NPC Speaking
	const Speak = ({role,speech}) => {
		if(role){
			if(role === 'self'){
				role = npc.name;
			}
		} else {
			role = npc.name;
		}
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
	//NPC Book Next Item
	const IdleNext = () => {
		//Prevent pushing next speech until current is over or skipped to end
		if(text.core.on){
			if(text.core.speaking){} else {
				book.IdleNext()
			}
		} else {
			book.IdleNext()
		}
	}
	//Reset NPC Book
	const IdleReset = (force) => {
		if(book.book.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			IdleNext();
			IdleNext();
		}
	}
	//NPC Book Jump Menu Click
	const Click = (el) => {
		text.Skip();
		let result = el.getAttribute('result');
		Jump({timeline: result});
		book.Next();
		//Need to update after creating book control component
		//npc.GetEl().classList.toggle('clickable', true);
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().classList.toggle('clickable', true);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].classList.toggle('clickable', true);
			}
		}
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
		if(object === 'self'){
			object = npc.id;
		}
		//console.log(object)
		//console.log(func)
		//console.log(params)
		auxl[object][func](params);
	}
	//If/Else for NPC Methods
	const IfElse = (obj) => {
		let objRef = Object.keys(obj)[0];
		let cond = obj[objRef].cond;
		let ifTrue = obj[objRef].ifTrue;
		let ifFalse = obj[objRef].ifFalse;
		if(objRef === 'self'){
			objRef = npc.id;
		}
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
	//Switch support to run auxlObjMethod()
	const Switch = (obj) => {
		let condObj = Object.keys(obj)[0]
		let switchInfo = obj[condObj];
		if(condObj === 'self'){
			condObj = npc.id;
		}
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'cond' || each === 'default'){}else{
				switchCases.push(each)
			}
		}
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			let switchCondition = auxl[condObj].GetFlag(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			let switchCondition = auxl[condObj].GetFlagParent(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else {
			console.log(condObj);
			console.log('Unable to find value');
			console.log(switchInfo.cond);
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				npc[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: npc.id, type: 'npc', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			npc[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: npc.id, type: 'npc', sub: false, name: flagValue.flag, data: flagValue.value});
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


return {npc, GetNPCEl, AddNPCEvents, RemoveNPCEvents, SpawnNPC, DespawnNPC, ToggleSpawn, EnableSpeech, DisableSpeech, EnableIdleSpeech, DisableIdleSpeech, Speak, NextPage, ResetBook, IdleNext, IdleReset, Click, Jump, SelectJump, auxlObjMethod, IfElse, Switch, SetFlag, GetFlag}
}

//
//SkyBox
//Lights, Sky, Space
this.SkyBox = (skyBoxData) => {
	let skyBox = Object.assign({}, skyBoxData);
	skyBox.inScene = false;
	skyBox.day = false;
	let dayNightTimeout;
	let dayNightInterval;
	//Spawn All Light Core/Layers
	const SpawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].SpawnCore){
				skyBox.lights[each].SpawnCore();
			} else if(skyBox.lights[each].SpawnLayer){
				skyBox.lights[each].SpawnLayer();
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
				skyBox.lights[each].DespawnCore();
			} else if(skyBox.lights[each].DespawnLayer){
				skyBox.lights[each].DespawnLayer();
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
				skyBox.sky[each].SpawnCore();
			} else if(skyBox.sky[each].SpawnLayer){
				skyBox.sky[each].SpawnLayer();
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
				skyBox.sky[each].DespawnCore();
			} else if(skyBox.sky[each].DespawnLayer){
				skyBox.sky[each].DespawnLayer();
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
				skyBox.space[each].SpawnCore();
			} else if(skyBox.space[each].SpawnLayer){
				skyBox.space[each].SpawnLayer();
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
				skyBox.space[each].DespawnCore();
			} else if(skyBox.space[each].DespawnLayer){
				skyBox.space[each].DespawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}
	//Spawn SkyBox
	const SpawnSkyBox = () => {
		if(skyBox.inScene){}else{
			SpawnLights();
			SpawnSky();
			SpawnSpace();
			skyBox.inScene = true;
		}
	}
	//Despawn SkyBox
	const DespawnSkyBox = () => {
		if(skyBox.inScene){
			clearTimeout(dayNightTimeout);
			clearInterval(dayNightInterval);
			DespawnLights();
			DespawnSky();
			DespawnSpace();
			RemoveFromTracker(skyBox.id);
			skyBox.inScene = false;
		}
	}
	//Emit Event for All in Array
	const EmitEventArray = (all, event) => {
		for(let each in all){
			if(all[each].SpawnCore){
				all[each].EmitEvent(event);
			} else if(all[each].SpawnLayer){
				all[each].EmitEventAll(event);
			} else {
				console.log('Failed to emit event to object');
				console.log(all[each]);
			}
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(skyBox.inScene){
			DespawnSkyBox();
		} else {
			SpawnSkyBox();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				skyBox[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: skyBox.id, type: 'skyBox', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			skyBox[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: skyBox.id, type: 'skyBox', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(skyBox(flag[each]));
			}
			return flagArray;
		} else {
			return skyBox[flag];
		}
	}
	//Sunrise Animation Event
	const Sunrise = () => {
		skyBox.day = true;
		EmitEventArray(skyBox.lights, 'sunrise');
		EmitEventArray(skyBox.sky, 'sunrise');
		EmitEventArray(skyBox.space, 'sunrise');
	}
	//Sunset Animation Event
	const Sunset = () => {
		skyBox.day = false;
		EmitEventArray(skyBox.lights, 'sunset');
		EmitEventArray(skyBox.sky, 'sunset');
		EmitEventArray(skyBox.space, 'sunset');
	}
	//Suspend Day/Night Animation
	const PauseDayNight = () => {
		EmitEventArray(skyBox.lights, 'pauseDayNight');
		EmitEventArray(skyBox.sky, 'pauseDayNight');
		EmitEventArray(skyBox.space, 'pauseDayNight');
	}
	//Resume Day/Night Animation
	const ResumeDayNight = () => {
		EmitEventArray(skyBox.lights, 'resumeDayNight');
		EmitEventArray(skyBox.sky, 'resumeDayNight');
		EmitEventArray(skyBox.space, 'resumeDayNight');
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
		dayNightTimeout = setTimeout(function () {
			Sunset();
			dayNightInterval = setInterval(function() {
				if(skyBox.day){
					Sunset();
				}else{
					Sunrise();
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

	return {skyBox, SpawnSkyBox, DespawnSkyBox, ToggleSpawn, SetFlag, GetFlag, DayNightCycle, PauseDayNight, ResumeDayNight, RestartDayNight};
}

//
//Horizon
//Mountains, Hills, Buildings, Cylinder/Square Wall
this.Horizon = (horizonData) => {
	let horizon = Object.assign({}, horizonData);
	horizon.inScene = false;

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
		if(horizon.inScene){}else{
			horizonLayer.SpawnLayer();
			horizon.inScene = true;
		}
	}
	//Despawn Horizon
	const DespawnHorizon = () => {
		if(horizon.inScene){
			horizonLayer.DespawnLayer();
			RemoveFromTracker(horizon.id);
			horizon.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(horizon.inScene){
			DespawnHorizon();
		} else {
			SpawnHorizon();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				horizon[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: horizon.id, type: 'horizon', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			horizon[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: horizon.id, type: 'horizon', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(horizon(flag[each]));
			}
			return flagArray;
		} else {
			return horizon[flag];
		}
	}

	return {horizon, SpawnHorizon, DespawnHorizon, ToggleSpawn, SetFlag, GetFlag};
}

//
//Ring of Objects
//Randomize Set of Objects from Single in a Ring Radius
this.ObjsGenRing = (objRingData) => {
	let singleGen = Object.assign({}, objRingData);
	singleGen.inScene = false;
	let ogData = Object.assign({}, objRingData.objData);
	let objData = JSON.parse(JSON.stringify(objRingData.objData));
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
		if(singleGen.inScene){}else{
			genCores();
			for(let a = 0; a < singleGen.total; a++){
				singleGen.all[a].SpawnCore();
			}
			singleGen.inScene = true;
		}
	}
	//Despawn all Randomized Cores
	const DespawnObjRing = () => {
		if(singleGen.inScene){
			for(let a = 0; a < singleGen.total; a++){
				singleGen.all[a].DespawnCore();
			}
			RemoveFromTracker(singleGen.id);
			singleGen.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(singleGen.inScene){
			DespawnObjRing();
		} else {
			SpawnObjRing();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				singleGen[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: singleGen.id, type: 'singleGen', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			singleGen[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: singleGen.id, type: 'singleGen', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(singleGen(flag[each]));
			}
			return flagArray;
		} else {
			return singleGen[flag];
		}
	}

	return {singleGen, SpawnObjRing, DespawnObjRing, ToggleSpawn, SetFlag, GetFlag};
}

//
//Multi Asset Generator
//Randomize Sets of Various Sized Objects in various Ring Radius'
this.MultiAssetGen = (multiGenData) =>{
//Add the ability to read an array of different objects for same size
//Need to better optimize each size's radius
	let multiGen = Object.assign({}, multiGenData);
	multiGen.inScene = false;
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
	//Spawn All Assets
	const SpawnMultiAsset = () => {
		if(multiGen.inScene){}else{
			genCores();
			for(let type in sizes){
				let size = multiGen.assets[sizes[type]];
				for(let each in size){
					size[each].SpawnCore();
				}
			}
			multiGen.inScene = true;
		}
	}
	//Despawn All Assets
	const DespawnMultiAsset = () => {
		if(multiGen.inScene){
			for(let type in sizes){
				let size = multiGen.assets[sizes[type]];
				for(let each in size){
					size[each].DespawnCore();
				}
			}
			RemoveFromTracker(multiGen.id);
			multiGen.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(multiGen.inScene){
			DespawnMultiAsset();
		} else {
			SpawnMultiAsset();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				multiGen[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: multiGen.id, type: 'multiGen', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			multiGen[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: multiGen.id, type: 'multiGen', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(multiGen(flag[each]));
			}
			return flagArray;
		} else {
			return multiGen[flag];
		}
	}

	return {multiGen, SpawnMultiAsset, DespawnMultiAsset, ToggleSpawn, SetFlag, GetFlag}

}

//
//Teleport
//Generate Teleport Points at Array of Locations
this.Teleport = (id, locations) => {
//Allow to select mutli-interactino circle, light beam and more.
	let teleport = {};
	teleport.id = id;
	teleport.inScene = false;
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
		if(teleport.inScene){}else{
			for(let each in teleport.all){
				teleport.all[each].SpawnLayer();
			}
			teleport.inScene = true;
		}
	}
	//Despawn Teleports
	const DespawnTeleport = () => {
		if(teleport.inScene){
			for(let each in teleport.all){
				teleport.all[each].DespawnLayer();
			}
			RemoveFromTracker(teleport.id);
			teleport.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(teleport.inScene){
			DespawnTeleport();
		} else {
			SpawnTeleport();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				teleport[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: teleport.id, type: 'teleport', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			teleport[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: teleport.id, type: 'teleport', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(teleport(flag[each]));
			}
			return flagArray;
		} else {
			return teleport[flag];
		}
	}

	return {teleport, SpawnTeleport, DespawnTeleport, ToggleSpawn, SetFlag, GetFlag,};
}

//
//Info Bubble
//Display an Emote or Alert Bubble
this.InfoBubble = (id, object, offset, color) => {
//Not in Tracker as it is controlled via component
//Add sound to play on spawn in and out
let infoBubble = {};

infoBubble.id = id;
let bubbleId = infoBubble.id + 'bubble';
let textId = infoBubble.id + 'text';
infoBubble.parent = object;
infoBubble.custom = {};
infoBubble.inScene = false;
infoBubble.position = new THREE.Vector3(0,0.5,0);
infoBubble.rotation = new THREE.Vector3(0,0,0);
infoBubble.color = color || '#14d9a4';
//Position
if(offset){
	if(offset.x){
		infoBubble.position.x = offset.x;
		infoBubble.position.y = offset.y;
		infoBubble.position.z = offset.z;
	} else {
		infoBubble.position.y = offset;
	}
}
//Emoti Bubble
infoBubble.infoBubbleData = {
data:'infoBubbleData',
id: bubbleId,
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 0.3, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: infoBubble.color, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: infoBubble.color, emissiveIntensity: 0.6, side: 'double'},
position: infoBubble.position,
rotation: infoBubble.rotation,
scale: new THREE.Vector3(0.01,0.01,0.01),
animations:{
spawnin:{property: 'scale', from: '0.01 0.01 0.01', to: '1 1 1', dur: 1500, delay: 500, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: true, enabled: true},
spawnout:{property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 3000, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
infoBubble[bubbleId] = auxl.Core(infoBubble.infoBubbleData);
//Emoti Text
infoBubble.emotiTextData = {
data:'emotiTextData',
id: textId,
sources:false,
text: {value:'!', wrapCount: 2, color: "#FFFFFF", font: "exo2bold", zOffset: 0, side: 'double', align: "center", baseline: 'center'},
geometry: false,
material: false,
position: new THREE.Vector3(0.025,0.1,0.025),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
infoBubble[textId] = auxl.Core(infoBubble.emotiTextData);
//Emoti Layer
infoBubble.emotiLayerData = {
	parent: {core: infoBubble[bubbleId]},
	child0: {core: infoBubble[textId]},
}
infoBubble[infoBubble.id] = auxl.Layer(infoBubble.id, infoBubble.emotiLayerData);

//Spawn Emote Bubble Layer
const SpawnBubble = () => {
	if(infoBubble.inScene){}else{
		infoBubble[infoBubble.id].layer.all.parent.core.core.animations.spawnout = {property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 3000, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true,};
		infoBubble[infoBubble.id].SpawnLayer(infoBubble.parent);
		infoBubble.inScene = true;
		infoBubble.timeout = setTimeout(() => {
			DespawnBubble();
			clearTimeout(infoBubble.timeout);
		}, 4050);
	}
}
//Despawn Emote Bubble Layer
const DespawnBubble = () => {
	infoBubble[infoBubble.id].DespawnLayer();
	infoBubble.inScene = false;
}
//Spawn Alert Bubble Layer
const SpawnAlert = () => {
	if(infoBubble.inScene){}else{
		infoBubble[infoBubble.id].layer.all.parent.core.core.animations.spawnout = {property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true, startEvents: 'spawnOut'};

		infoBubble[infoBubble.id].SpawnLayer(infoBubble.parent);
		infoBubble.inScene = true;
		infoBubble.parent.GetEl().addEventListener('mouseenter',DespawnAlert);
	}
}
//Despawn Emote Bubble Layer
const DespawnAlert = () => {
	infoBubble.parent.GetEl().removeEventListener('mouseenter',DespawnAlert);
	infoBubble[infoBubble.id].EmitEventParent('spawnOut');
	infoBubble.timeout = setTimeout(() => {
		DespawnBubble();
		clearTimeout(infoBubble.timeout);
	}, 1050);
}
//Update Emote Text Core
const UpdateText = (text, rotation) => {
	infoBubble[textId].core.text.value = text;
	infoBubble[textId].core.text.wrapCount = text.length+1;
	if(rotation){
		infoBubble[textId].core.rotation.z = rotation;
	} else {
		infoBubble[textId].core.rotation.z = 0;
	}
}
//Add Event Listener
const AddSpawnEvent = (event, action) => {
	infoBubble.parent.GetEl().addEventListener(event,action);
}
//Remove Event Listener
const RemoveSpawnEvent = (event, action) => {
	infoBubble.parent.GetEl().removeEventListener(event,action);
}
//Add Custom Emote
const NewBubble = (details) => {
	infoBubble.custom[details.eventName] = details;
	//details.emote or alert
	//details.text
	//details.eventName
	//details.rotation
}
//Spawn a Custom Emote
const CustomBubble = (event) => {
	for(let emote in infoBubble.custom){
		if(event.type === emote){
			if(infoBubble.custom[emote].rotation){
				UpdateText(infoBubble.custom[emote].text,infoBubble.custom[emote].rotation);
			} else {
				UpdateText(infoBubble.custom[emote].text);
			}
			if(infoBubble.custom[emote].alert){
				SpawnAlert();
			} else {
				SpawnBubble();
			}
			break;
		}
	}
}
//Emote !
const Emote1 = () => {
	UpdateText('!');
	SpawnBubble();
}
//Alert !
const Alert1 = () => {
	UpdateText('!');
	SpawnAlert();
}
//Emote ?
const Emote2 = () => {
	UpdateText('?');
	SpawnBubble();
}
//Alert ?
const Alert2 = () => {
	UpdateText('?');
	SpawnAlert();
}
//Emote :)
const Emote3 = () => {
	UpdateText(':)', -90);
	SpawnBubble();
}
//Emote ^-^
const Emote4 = () => {
	UpdateText('^-^');
	SpawnBubble();
}
//Add all Emotes to Element
const AddEmotes = () => {
	AddSpawnEvent('alert1', Alert1);
	AddSpawnEvent('alert2', Alert2);
	AddSpawnEvent('emote1', Emote1);
	AddSpawnEvent('emote2', Emote2);
	AddSpawnEvent('emote3', Emote3);
	AddSpawnEvent('emote4', Emote4);
	for(let each in infoBubble.custom){
		AddSpawnEvent(each, CustomBubble);
	}
}
//Remove all Emotes to Element
const RemoveEmotes = () => {
	if(infoBubble.inScene){
		clearTimeout(infoBubble.timeout);
		DespawnBubble();
	}
	RemoveSpawnEvent('alert1', Alert1);
	RemoveSpawnEvent('alert2', Alert2);
	RemoveSpawnEvent('emote1', Emote1);
	RemoveSpawnEvent('emote2', Emote2);
	RemoveSpawnEvent('emote3', Emote3);
	RemoveSpawnEvent('emote4', Emote4);
	for(let each in infoBubble.custom){
		RemoveSpawnEvent(each, CustomBubble);
	}
}
//On init, add required component methods to parent
const Init = () => {
	infoBubble.parent.core.components['onspawnrun__emote'] = {
		cursorObj: infoBubble.id,
		component: null,
		method: 'AddEmotes',
		params: null,
	};
	infoBubble.parent.core.components['ondespawnrun__emote'] = {
		cursorObj: infoBubble.id,
		component: null,
		method: 'RemoveEmotes',
		params: null,
	};
}
Init();

return {infoBubble, AddEmotes, RemoveEmotes, NewBubble};

}


//
//In-Progress

//
//Build Core/Layer/Other objects in the 3D environment
this.BuildIn3D = () => {

	let one = {};
	one.player = auxl.player.GetPlayerInfo();
	one.core = {};
	one.core.data = {};
	one.core.made = [];
	one.layer = {};
	one.objGen = {};
	one.null = {};
	one.templates = {};

	one.core.blank = {
		data:'blankData',
		id:'blank',
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

	one.states = ['ready', 'building', 'editing', 'deleting', 'settings'];
	one.state = one.states[0];

	one.building = {};
	one.building.current = false;
	one.building.prepped = false;
	one.building.building = false;

	//player.id
//Spawn a multi-menu
// w/ various individual options for each type of Core/Layer/Other
/*
Build
Edit
Delete
Settings


Build
- Core
- - Name
- - Geometry
- - Material
- - Text
- - Position
- - Rotation
- - Scale
- - Animations
- - Clickable
- - Components
- - Done
- Layer
- ObjGen
- Null
- Templates



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

*/
	one.buildMenuData = {
	info:{
		id: 'buildMenu',
		buttonData: auxl.buildCoreData,
		hoverData: auxl.buildHoverData,
		title: 'Build Mode',
		description: 'Build objects.',
		layout:'circleUp',
		posOffset: new THREE.Vector3(0,1.5,1.5),
		offset: -1,
		parent: false,
		stare: false,
	},
	menu0:{
		button0:{
			id: 'subMenu1',
			style: false,
			title: 'Build',
			description: 'Build a new object.',
			subMenu: 'menu1',
			action: false,
		},
		button1:{
			id: 'subMenu2',
			style: false,
			title: 'Edit',
			description: 'Edit an object in-scene.',
			subMenu: 'menu22',
			action: false,
		},
		button2:{
			id: 'subMenu3',
			style: false,
			title: 'Delete',
			description: 'Delete an object in-scene.',
			subMenu: 'menu23',
			action: false,
		},
		button3:{
			id: 'subMenu4',
			style: false,
			title: 'Settings',
			description: 'Configure system settings.',
			subMenu: 'menu24',
			action: false,
		},
	},
	menu1:{
		button0:{
			id: 'subMenu2',
			style: false,
			title: 'Core',
			description: 'Build a Core object.',
			subMenu: 'menu2',
			action: false,
		},
		button1:{
			id: 'subMenu3',
			style: false,
			title: 'Layer',
			description: 'Build a Layer object.',
			subMenu: 'end',
			action: false,
		},
		button2:{
			id: 'subMenu4',
			style: false,
			title: 'ObjGen',
			description: 'Build an object.',
			subMenu: 'end',
			action: false,
		},
		button3:{
			id: 'subMenu5',
			style: false,
			title: 'Null',
			description: 'Build a Null object.',
			subMenu: 'end',
			action: false,
		},
		button4:{
			id: 'subMenu6',
			style: false,
			title: 'Templates',
			description: 'Build a from a Template.',
			subMenu: 'end',
			action: false,
		},
	},
	menu2:{
		button0:{
			id: 'subMenu0',
			style: false,
			title: 'Generate',
			description: 'Generate a default Core object.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'StartBuilding',
				params: null,
				menu: 'stay',
			},
		},
		button1:{
			id: 'subMenu1',
			style: false,
			title: 'Name',
			description: 'Update core Name.',
			subMenu: 'coreName',
			action: false,
		},
		button2:{
			id: 'subMenu2',
			style: false,
			title: 'Geometry',
			description: 'Update core Geometry.',
			subMenu: 'coreGeometry',
			action: false,
		},
		button3:{
			id: 'subMenu3',
			style: false,
			title: 'Material',
			description: 'Update core Material.',
			subMenu: 'coreMaterial',
			action: false,
		},
		button4:{
			id: 'subMenu4',
			style: false,
			title: 'Text',
			description: 'Update core Text.',
			subMenu: 'coreText',
			action: false,
		},
		button5:{
			id: 'subMenu5',
			style: false,
			title: 'Position',
			description: 'Update core Position.',
			subMenu: 'corePosition',
			action: false,
		},
		button6:{
			id: 'subMenu6',
			style: false,
			title: 'More',
			description: 'More options.',
			subMenu: 'menu3',
			action: false,
		},
	},
	menu3:{
			button0:{
				id: 'subMenu0',
				style: false,
				title: 'Rotation',
				description: 'Update core Rotation.',
				subMenu: 'coreRotation',
				action: false,
			},
			button1:{
				id: 'subMenu1',
				style: false,
				title: 'Scale',
				description: 'Update core Scale.',
				subMenu: 'coreScale',
				action: false,
			},
			button2:{
				id: 'subMenu2',
				style: false,
				title: 'Animations',
				description: 'Update core Animations.',
				subMenu: 'coreAnimations',
				action: false,
			},
			button3:{
				id: 'subMenu3',
				style: false,
				title: 'Clickable',
				description: 'Toggle core to be clickable in-scene.',
				subMenu: 'coreClickable',
				action: false,
			},
			button4:{
				id: 'subMenu4',
				style: false,
				title: 'Components',
				description: 'Update core Components.',
				subMenu: 'coreComponents',
				action: false,
			},
			button5:{
				id: 'subMenu5',
				style: false,
				title: 'Done',
				description: 'Finalize core updates.',
				subMenu: 'coreDone',
				action: false,
			},
	},
	coreName:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Name',
			description: 'Update the cores name and id.',
			subMenu: false,
			action: {
				auxlObj: 'one',
				component: false,
				method: 'UpdateName',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreGeometry:{
		button0:{
			id: 'action0',
			style: false,
			title: 'Plane',
			description: 'A 2D plane.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'plane',
				menu: 'stay',
			},
		},
		button1:{
			id: 'action1',
			style: false,
			title: 'Cube',
			description: 'A 3D cube.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'box',
				menu: 'stay',
			},
		},
		button2:{
			id: 'action2',
			style: false,
			title: 'Circle',
			description: 'A 2D circle.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'circle',
				menu: 'stay',
			},
		},
		button3:{
			id: 'action3',
			style: false,
			title: 'Cylinder',
			description: 'A 3D cylinder.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'cylinder',
				menu: 'stay',
			},
		},
		button4:{
			id: 'action4',
			style: false,
			title: 'Sphere',
			description: 'A 3D sphere.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateGeometry',
				params: 'sphere',
				menu: 'stay',
			},
		},

	},
	coreMaterial:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Material',
			description: 'Update the cores Material.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateMaterial',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreText:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Text',
			description: 'Update the cores text.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateText',
				params: null,
				menu: 'stay',
			},
		},
	},
	corePosition:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Position',
			description: 'Update the cores position.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdatePosition',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreRotation:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Rotation',
			description: 'Update the cores rotation.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateRotation',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreScale:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Scale',
			description: 'Update the cores scale.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateScale',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreAnimations:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Animations',
			description: 'Update the cores animations.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateAnimations',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreClickable:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Toggle Clickable',
			description: 'Toggle the core being interactable. ',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'ToggleClickable',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreComponents:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Update Components',
			description: 'Update the cores components.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'UpdateComponents',
				params: null,
				menu: 'stay',
			},
		},
	},
	coreDone:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Done',
			description: 'Finalize the core.',
			subMenu: false,
			action: {
				auxlObj: 'build',
				component: false,
				method: 'Done',
				params: null,
				menu: 'close',
			},
		},
	},
	end:{
		button0:{
			id: 'subMenu2',
			style: false,
			title: 'Core',
			description: 'Build a Core object.',
			subMenu: 'menu0',
			action: false,
		},
	},

	};
	auxl.buildMenu = auxl.MultiMenu(one.buildMenuData);

	one.building.geometry = {};
	one.building.geometry.plane = {primitive: 'plane', width: 0.5, height: 0.5};
	one.building.geometry.box = {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5};
	one.building.geometry.circle = {primitive: 'circle', radius: 0.5, segments: 32};
	one.building.geometry.cylinder = {primitive: 'cylinder', radius: 0.25, height: 0.75, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
	one.building.geometry.sphere = {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 360, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 360};


	const SpawnBuild = () => {
		//console.log('Spawning');
		auxl.buildMenu.SpawnMultiMenu();
	}
	const DespawnBuild = () => {
		//console.log('Despawning');
		auxl.buildMenu.DespawnMultiMenu();
	}

	const NewCore = () => {
		if(one.building.prepped){
			console.log('Already Prepped');
		} else {
			console.log('New Core')
			let name = one.core.made.length;
			one.core.data[name+'data'] = {
				data:name+'data',
				id:name,
				sources: false,
				text: false,
				geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
				material: {shader: "standard", color: "#2aad7b", emissive: '#2aad7b', emissiveIntensity: 0.25, opacity: 1},
				position: new THREE.Vector3(0,1.5,1.5),
				rotation: new THREE.Vector3(0,0,0),
				scale: new THREE.Vector3(1,1,1),
				animations: false,
				mixins: false,
				classes: ['a-ent'],
				components: false,
			};
			one.core[name] = auxl.Core(one.core.data[name+'data']);
			one.building.current = one.core[name];
			one.building.prepped = true;
			one.building.building = true;

			one.building.current.SpawnCore();
		}
	}


	const StartBuilding = () => {
		console.log('Start Building')

		NewCore();


	}

	const UpdateName = () => {
		console.log('UpdateName')
	}

	const UpdateGeometry = (geometry) => {
		console.log('UpdateGeometry');
		let geometryData;
		if(geometry === 'plane'){
			geometryData = one.building.geometry.plane;
		} else if(geometry === 'box'){
			geometryData = one.building.geometry.box;
		} else if(geometry === 'circle'){
			geometryData = one.building.geometry.circle;
		} else if(geometry === 'cylinder'){
			geometryData = one.building.geometry.cylinder;
		} else if(geometry === 'sphere'){
			geometryData = one.building.geometry.sphere;
		} 
		//Update Data
		one.core.data[one.building.current.core.id+'data'].geometry = geometryData;
		//Update Preview
		one.building.current.ChangeSelf({property: 'geometry', value: geometryData});
	}
	const UpdateMaterial = () => {
		console.log('UpdateMaterial')
	}
	const UpdateText = () => {
		console.log('UpdateText')
	}
	const UpdatePosition = () => {
		console.log('UpdatePosition')
	}
	const UpdateRotation = () => {
		console.log('UpdateRotation')
	}
	const UpdateScale = () => {
		console.log('UpdateScale')
	}
	const UpdateAnimations = () => {
		console.log('UpdateAnimations')
	}
	const UpdateClickable = () => {
		console.log('UpdateClickable')
	}
	const UpdateComponents = () => {
		console.log('UpdateComponents')
	}
	const UpdateDone = () => {
		console.log('UpdateDone')
	}

	const Testing = () => {
		console.log(one)
	}

	return {one, SpawnBuild, DespawnBuild, StartBuilding, UpdateName, UpdateGeometry, UpdateMaterial, UpdateText, UpdatePosition, UpdateRotation, UpdateScale, UpdateAnimations, UpdateClickable, UpdateComponents, UpdateDone, Testing,}


}

//
//GridAssetGen
//Build a scene from a dual array grid of asset related ids
this.GridAssetGen = (gridGenData) => {
	let gridGen = Object.assign({}, gridGenData);
	gridGen.inScene = false;

	//Generate Grid Cores
	const genCores = () => {

	}
	//Spawn all Grid Cores
	const SpawnGrid = () => {
		if(gridGen.inScene){}else{
			genCores();
			for(let a = 0; a < gridGen.total; a++){
				gridGen.all[a].SpawnCore();
			}
			gridGen.inScene = true;
		}
	}
	//Despawn all Grid Cores
	const DespawnGrid = () => {
		if(gridGen.inScene){
			for(let a = 0; a < gridGen.total; a++){
				gridGen.all[a].DespawnCore();
			}
			RemoveFromTracker(gridGen.id);
			gridGen.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(gridGen.inScene){
			DespawnGrid();
		} else {
			SpawnGrid();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				gridGen[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: gridGen.id, type: 'gridGen', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			gridGen[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: gridGen.id, type: 'gridGen', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(gridGen(flag[each]));
			}
			return flagArray;
		} else {
			return gridGen[flag];
		}
	}

	return {gridGen, SpawnGrid, DespawnGrid, ToggleSpawn, SetFlag, GetFlag};
}

//In-Progress
//Blocks completed, Walls not yet
//
//Collision
//Build a collision map of 0.5 meter sections 
//Allow or Deny moving outside of collision map
this.Collision = (gridData) => {
	let grid = Object.assign({}, gridData);
	grid.inScene = false;
	//grid.id
	//grid.mapSize
	//grid.edgeCollide
	//grid.spawn

	grid.mapTopLeft = [];
	grid.mapTopRight = [];
	grid.mapBottomLeft = [];
	grid.mapBottomRight = [];
	grid.mapAll = [
		grid.mapTopLeft,
		grid.mapTopRight,
		grid.mapBottomLeft,
		grid.mapBottomRight,
	];

	//Currently using a single object as a shared map that will be built, reset, rebuilt through each. But wont work well with flags, should each scene have it's own collision map or should I have an object of scenes within the map collision that flags will be saved to and read from.

	//Spawn Object w/ Collision & add to Grid Map Square or Squares
	//Spawn at center of 0.5 coords - Block : Can't move into from any squares
	//Spawn at edge of 0.5 coords - Wall/s : Can't move between connected square/s
	//Spawn off center of 0.5 coords - Wall : Can't move between connected square
	//Despawn Object w/ Collision & add to Grid Map Square or Squares
	//
	//Object moves. Update map to block space they will be moving into and once moved, clear out previous space
	//Object is interactable when user is in surrounding or specific grid square
	//Object is auto picked up when user is in specific grid square


	//Maps
	//
	//-X requires .reverse() on each inner one
	//-Z requires .reverse() on the outer set

	//Top Left
	//Loop 1 : -Z
	//Loop 2 : -X
	//[1,1,1,1,1,1,1,1,1,1].reverse(),
	let mapTopLeft = [ 
	[1,0,0,0,0,0,1,0,0,0].reverse(),
	[1,0,0,0,0,0,1,0,0,0].reverse(),
	[1,0,0,0,0,0,1,0,0,0].reverse(),
	[1,0,0,1,0,0,0,0,0,0].reverse(),
	[1,0,0,0,1,0,0,0,0,0].reverse(),
	[1,0,1,0,1,0,0,0,0,0].reverse(),
	[1,0,1,0,0,0,0,0,1,0].reverse(),
	[1,0,1,0,0,0,0,0,0,0].reverse(),
	[1,0,1,0,0,0,1,0,0,0].reverse(),
	[1,0,0,0,0,0,0,0,0,0].reverse()
	];

	//Top Right
	//Loop 1 : -Z
	//Loop 2 : +X
	let mapTopRight = [ 
	[0,0,0,0,1,0,0,0,0,1],
	[0,0,0,0,1,0,0,0,0,1],
	[0,0,1,0,0,0,1,0,0,1],
	[0,0,0,0,0,0,1,0,0,1],
	[0,0,0,0,0,0,1,0,0,1],
	[0,0,1,0,1,0,0,0,0,1],
	[0,0,1,0,0,0,0,0,1,1],
	[0,0,1,0,0,0,0,0,0,1],
	[0,0,0,1,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,0,1]
	];

	//Bottom Left
	//Loop 1 : +Z
	//Loop 2 : -X
	let mapBottomLeft = [ 
	[1,0,0,0,0,0,0,0,0,0].reverse(),
	[1,0,0,0,1,0,0,0,0,0].reverse(),
	[1,0,1,0,1,0,0,0,0,0].reverse(),
	[1,0,1,0,0,0,0,0,1,0].reverse(),
	[1,0,1,0,0,0,0,0,0,0].reverse(),
	[1,0,1,0,0,0,1,0,0,0].reverse(),
	[1,0,0,0,0,0,1,0,0,0].reverse(),
	[1,0,0,0,0,0,1,0,0,0].reverse(),
	[1,0,0,1,0,0,0,0,0,0].reverse(),
	[1,1,1,1,1,1,1,1,1,1].reverse()
	];

	//Bottom Right
	//Loop 1 : +Z
	//Loop 2 : +X
	let mapBottomRight = [ 
	[0,0,0,0,0,0,0,0,0,1],
	[0,0,1,0,0,0,1,0,0,1],
	[0,0,0,0,0,0,1,0,0,1],
	[0,0,0,0,0,0,1,0,0,1],
	[1,0,0,1,0,0,0,0,0,1],
	[0,0,0,0,1,0,0,0,0,1],
	[1,0,1,0,1,0,0,0,0,1],
	[0,0,1,0,0,0,0,0,1,1],
	[1,0,1,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
	];

	//Combined Map Array
	let mapAll = [
	mapTopLeft.reverse(),
	mapTopRight.reverse(),
	mapBottomLeft,
	mapBottomRight
	];


	//
	//Basic Block Spawner
	function basicBlockSpawner(map,parentEl,quadrant) {

	//Loop through Z array set
	for (let i = 0; i < map.length; i++) {

		//Loop through X array set
		for (let j = 0; j < map[i].length; j++) {

			//Check for non-interactable obstacles (1)
			//Spawn Basic Blocks
			if(map[i][j] === 1){
				//Create block Entity
				let block = document.createElement('a-entity');
				//Set primitive shape
				block.setAttribute('geometry', {primitive: 'box', width: 0.5, height: 1, depth: 0.5});
				//Set Material
				block.setAttribute('material', {shader: "standard", color: "#91502d", opacity: "1",});

				//Add basic block class
				block.classList.add("block");

				//Set position
				let posX;
				let posY = 0.5;//half the height of object
				let posZ;

				if(quadrant === 'topLeft'){
					posX = j * -1;
					posZ = i * -1;
				} else if(quadrant === 'topRight'){
					posX = j;
					posZ = i * -1;
				} else if(quadrant === 'bottomLeft'){
					posX = j * -1;
					posZ = i;
				} else if(quadrant === 'bottomRight'){
					posX = j;
					posZ = i;
				}

				posX /= 2;
				posZ /= 2;

				//Set Position
				let positionVec3 = new THREE.Vector3(posX, posY, posZ);
				block.setAttribute('position', positionVec3);

				//Attach to parent entity
				parentEl.appendChild(block);
			   }//End Basic Block Detection

		}//End X array Loop
	}//End Z array Loop

	}//End Basic Block Spawner

	//
	//Map Spawner
	function mapSpawner(map) {

	//Create parent identity w/ id
	let blockParent = document.createElement('a-entity');
	blockParent.setAttribute('id','blockParent');
	//Append parent entity to scene
	sceneEl.appendChild(blockParent);

	//Loop through mega array set
	for (let h = 0; h < map.length; h++) {

		if (h === 0){
			//Spawn Basic Blocks
			basicBlockSpawner(map[h],blockParent,'topLeft');

		} else if (h === 1){
			//Spawn Basic Blocks
			basicBlockSpawner(map[h],blockParent,'topRight');

		} else if (h === 2){
			//Spawn Basic Blocks
			basicBlockSpawner(map[h],blockParent,'bottomLeft');

		} else if (h === 3){
			//Spawn Basic Blocks
			basicBlockSpawner(map[h],blockParent,'bottomRight');

		}//End if Checks

	}//End Multi-Map array Loop

	}//End Map Spawner Function

	//
	//Testing mapSpawner function
	mapSpawner(mapAll);

	//Init blank map
	const BuildBlankMap = () => {
		for(let map in grid.mapAll){
			for(let a = 0; a < grid.mapSize/2; a++){
				grid.mapAll[map].push([]);
				for(let b = 0; b < grid.mapSize/2; b++){
					grid.mapAll[map][a].push(1);
				}
			}
		}
	}
	//Reset to blank map
	const ResetMap = () => {
		for(let map in grid.mapAll){
			grid.mapAll[map].fill(0,0,grid.mapSize/2);
		}
	}

	//Update Map
	const UpdateMap = (pos, mapKey) => {

		//0.5 meter to integer grid adjustment
		pos.x *= 2;
		pos.z *= 2;

		if(pos.x < 0 && pos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			mapAll[0][pos.z * -1][pos.x * -1] = mapKey;
		} else if(pos.x >= 0 && pos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			mapAll[1][pos.z * -1][pos.x] = mapKey
		} else if(pos.x < 0 && pos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			mapAll[2][pos.z][pos.x * -1] = mapKey;
		} else if(pos.x >= 0 && pos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			mapAll[3][pos.z][pos.x] = mapKey;
		} else {
			console.log('Update out of bounds')
		}

	}

	//Check for Map Obstacles 0.5 Meter
	//Corners need 3 squares in L shape to completely block travel
	const checkMapObstacles = (newPos) => {

		newPos.x *= 2;
		newPos.z *= 2;

		if(newPos.x < 0 && newPos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			if(mapAll[0].length > newPos.z * -1){
				if(mapAll[0][newPos.z * -1].length > newPos.x * -1){
					//console.log('Within Map');
					if(mapAll[0][newPos.z * -1][newPos.x * -1] === 0){
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			if(mapAll[1].length > newPos.z * -1){
				if(mapAll[1][newPos.z * -1].length > newPos.x){
					//console.log('Within Map');
					if(mapAll[1][newPos.z * -1][newPos.x] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x < 0 && newPos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			if(mapAll[2].length > newPos.z){
				if(mapAll[2][newPos.z].length > newPos.x * -1){
					//console.log('Within Map');
					if(mapAll[2][newPos.z][newPos.x * -1] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			if(mapAll[3].length > newPos.z){
				if(mapAll[3][newPos.z].length > newPos.x){
					if(mapAll[3][newPos.z][newPos.x] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else {
			return false;
		}
	}

	//Check for Map Obstacles 0.5 Meter
	//Attempting to fix L required corners, only requiring 2 instead of 3
	const checkMapObstaclesDiagonal = (newPos, pos) => {

		newPos.x *= 2;
		newPos.z *= 2;

		pos.x *= 2;
		pos.z *= 2;

		//World direction of movement
		if(newPos.x === pos.x && newPos.z === pos.z){
			//console.log('Same Square')
			travelDirection = 'same';
		} else {
			if(newPos.x === pos.x || newPos.z === pos.z){
				if(newPos.x === pos.x){
					//console.log('Forward|Backward');
					travelDirection = 'z';
				} else if(newPos.z === pos.z){
					//console.log('Side to Side');
					travelDirection = 'x';
				}
			} else {
				console.log('Diagonal');
				if(newPos.x > pos.x){
					//Right
					if(newPos.z > pos.z){
						//Backward
						travelDirection = 'reverseRight';
					} else {
						//Forward
						travelDirection = 'forwardRight';
					}
				} else {
					//Left
					if(newPos.z > pos.z){
						//Backward
						travelDirection = 'reverseLeft';
					} else {
						//Forward
						travelDirection = 'forwardLeft';
					}
				}
			}
		}


		if(newPos.x < 0 && newPos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			if(mapAll[0].length > newPos.z * -1){
				if(mapAll[0][newPos.z * -1].length > newPos.x * -1){
					//console.log('Within Map');
					if(mapAll[0][newPos.z * -1][newPos.x * -1] === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z * -1][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z * -1][(newPos.x * -1)-1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							if(mapAll[0][(newPos.z * -1)+1][newPos.x * -1] !== 0 && mapAll[0][newPos.z * -1][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z * -1][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			if(mapAll[1].length > newPos.z * -1){
				if(mapAll[1][newPos.z * -1].length > newPos.x){
					//console.log('Within Map');
					if(mapAll[1][newPos.z * -1][newPos.x] === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x] !== 0 && mapAll[0][newPos.z * -1][(newPos.x)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x] !== 0 && mapAll[0][newPos.z * -1][(newPos.x)-1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							if(mapAll[0][(newPos.z * -1)+1][newPos.x] !== 0 && mapAll[0][newPos.z * -1][(newPos.x)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z * -1)-1][newPos.x] !== 0 && mapAll[0][newPos.z * -1][(newPos.x)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x < 0 && newPos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			if(mapAll[2].length > newPos.z){
				if(mapAll[2][newPos.z].length > newPos.x * -1){
					//console.log('Within Map');
					if(mapAll[2][newPos.z][newPos.x * -1] === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							if(mapAll[0][(newPos.z)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z][(newPos.x * -1)-1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							if(mapAll[0][(newPos.z)+1][newPos.x * -1] !== 0 && mapAll[0][newPos.z][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//-Z
							//+X
							if(mapAll[0][(newPos.z)-1][newPos.x * -1] !== 0 && mapAll[0][newPos.z][(newPos.x * -1)+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			if(mapAll[3].length > newPos.z){
				if(mapAll[3][newPos.z].length > newPos.x){
					if(mapAll[3][newPos.z][newPos.x] === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							if(mapAll[0][newPos.z-1][newPos.x] !== 0 && mapAll[0][newPos.z][newPos.x+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							if(mapAll[0][newPos.z-1][newPos.x] !== 0 && mapAll[0][newPos.z][newPos.x-1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							if(mapAll[0][newPos.z+1][newPos.x] !== 0 && mapAll[0][newPos.z][newPos.x+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//-Z
							//+X
							if(mapAll[0][newPos.z-1][newPos.x] !== 0 && mapAll[0][newPos.z][newPos.x+1] !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(grid.edgeCollide){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(grid.edgeCollide){
					return false;
				} else {
					return true;
				}
			}
		} else {
			return false;
		}
	}

	//Enable Collision Checks for Locomotion
	const EnableCollision = () => {
		auxl.collision = true;
	}
	//Disable Collision Checks for Locomotion
	const DisableCollision = () => {
		auxl.collision = false;
	}

	//Spawn Edge Collision Object
	const SpawnEdge = () => {

	}

	//Despawn Edge Collision Object
	const DespawnEdge = () => {

	}

	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				grid[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: grid.id, type: 'grid', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			grid[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: grid.id, type: 'grid', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(grid(flag[each]));
			}
			return flagArray;
		} else {
			return grid[flag];
		}
	}

	return {grid, BuildBlankMap, ResetMap, UpdateMap, EnableCollision, DisableCollision, checkMapObstacles, SpawnEdge, DespawnEdge, SetFlag, GetFlag};
}

//
//Collision Map

this.mapCollisionData = {
	data: 'mapCollisionData',
	id: 'mapCollision',
	mapSize: 20,
	edgeCollide: false,

};
//this.mapCollision = auxl.Collision(auxl.mapCollisionData);
//this.mapCollision.BuildBlankMap();
//this.mapCollision.EnableCollision();

//
//Premade Object Spawning Map Brainstorming
this.testCoreData = {
data:'testCore',
id:'test',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#52a539", emissive: '#52a539', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-1.5,2.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

this.gridObjTest11Data = {
auxlObj: auxl.objTest11Data,
mapKeyId: 101,
size: 1,
single: true,
collision: true,
interactable: false,
moveable: false,
walls: false,
offset: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),

};

this.mapSpawnData = {
	data: 'mapSpawnData',
	id: 'mapCollision',
	mapSize: 20,
	edgeCollide: false,
	spawn: '6 6',//xz coords
	map:[
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0],
	],

};




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

//auxl-library
//AUXL Library : List of Materials, Geometries, Sounds, Animations, Data, Cores, Layers & Objects
AFRAME.registerComponent('auxl-library', {
dependencies: ['auxl'],
update: function () {
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
//['gimbal']:{uiid: false, courserid: 'mouseController', movetype: 'desktop'},
light: {type: 'point', intensity: 0.075, distance: 5, decay:0.75},
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
classes: ['clickable','a-ent'],
components: {
	clickrun__movecomp:{
		cursorObj: 'comp',
		component: 'null',
		method: 'UpdatePosition',
		params: 'null',
	},
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
child4: {core: auxl.playerFloor},
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
//Comp Avatar
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
classes: ['clickable','a-ent'],
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
auxl.eye2SocketData = auxl.coreFromTemplate(auxl.eye1SocketData, {id: 'eye2Socket', position: new THREE.Vector3(0.15,0.1,0.4)});
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
auxl.eye2PupilData = auxl.coreFromTemplate(auxl.eye1PupilData, {id: 'eye2Pupil',});
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
classes: ['a-ent'],
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
classes: ['a-ent'],
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
auxl.leg1Data = auxl.coreFromTemplate(auxl.legData, {id: 'leg1',});
auxl.leg1 = auxl.Core(auxl.leg1Data);
//Leg 2
auxl.leg2Data = auxl.coreFromTemplate(auxl.legData, {id: 'leg2', position: new THREE.Vector3(0.25,-0.25,0)});
auxl.leg2 = auxl.Core(auxl.leg2Data);
//Leg 3
auxl.leg3Data = auxl.coreFromTemplate(auxl.legData, {id: 'leg3', position: new THREE.Vector3(0,-0.25,-0.25)});
auxl.leg3 = auxl.Core(auxl.leg3Data);
//Leg 4
auxl.leg4Data = auxl.coreFromTemplate(auxl.legData, {id: 'leg4', position: new THREE.Vector3(0,-0.25,0.25)});
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
//Companion Shapes

//Cube
auxl.compCubeData = {
data:'compCubeData',
id:'compCube',
sources:false,
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.45, to: 1.55, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, 
//click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
clickrun:{cursorObj: 'compCube', method: 'Click', params: null}, 
fusingrun:{cursorObj: 'compCube', method: 'FuseClickRun', params: null}, 
mousedownrun:{cursorObj: 'compCube', method: 'CursorDownRun', params: null}, 
mouseenterrun:{cursorObj: 'compCube', method: 'CursorEnterRun', params: null}, 
mouseleaverun:{cursorObj: 'compCube', method: 'CursorLeaveRun', params: null}, 
mouseuprun:{cursorObj: 'compCube', method: 'CursorUpRun', params: null},
eventrun:{event: 'testEventHit',cursorObj: 'compCube', method: 'FuseClickRun', params: null}, 
['stare']:{id: 'playerRig'},
},
};
auxl.compCube = auxl.Core(auxl.compCubeData);
//Sphere
auxl.compSphereData = {
data:'compSphereData',
id:'compSphere',
sources:false,
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'sphere', radius: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.45, to: 1.55, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, 
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compSphere = auxl.Core(auxl.compSphereData);
//Plane
auxl.compPlaneData = {
data:'compPlaneData',
id:'compPlane',
sources:false,
text: {value:'Menu', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'plane', width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.45, to: 1.55, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, 
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compPlane = auxl.Core(auxl.compPlaneData);

//Companion
auxl.comp = auxl.Companion('comp',auxl.ghost);


/*
auxl.compBubbleData = {
	data:'compBubbleData',
	id:'compBubble',
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
	components: false,
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
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Yo ho ho ho and a bottle of rum for me...'}},
	},
	timeline1:{
		self:{Speak:{speech:'Ooh a piece of candy!'}},
	},
	timeline1:{
		self:{Speak:{speech:'Nom nom nom nom.....'}},
	},
	timeline3:{
		self: {IdleReset: true},
	},
};
auxl.compBookData = {
	info:{
		id:'compBook',
		name: 'Companion',
		description:'Companion book.',
		tags:'comp',
		timeline: 'linear',
		idleDelay: 7000,
		idleInterval: 10000,
	},
	pages:{
		page0: auxl.compPage1Data,
	},
	idle:{
		page0: auxl.compIdleData,
	},
};
auxl.compBubble = auxl.Core(auxl.compBubbleData);
auxl.compNPC = auxl.NPC(auxl.ghost, auxl.compBookData, auxl.compBubble);
*/



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
detailprompt:{type: 'detail'},
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
//['look-at-xyz']:{match: 'camera', y:true},
['stare']:{id: 'playerRig', twist: true},
['raycast-teleportation']:null,
},
};
auxl.teleportPortal1Data = auxl.coreFromTemplate(auxl.teleportPortalData, {id: 'teleportPortal1',});
auxl.teleportPortal1 = auxl.Core(auxl.teleportPortal1Data);
auxl.teleportPortal2Data = auxl.coreFromTemplate(auxl.teleportPortalData, {id: 'teleportPortal2', position: new THREE.Vector3(0,5,3)});
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
rotation: new THREE.Vector3(-10,45,0),
scale: new THREE.Vector3(1,1,1),
animations:{daynight:{property: 'object3D.rotation.x', from: -5, to: 355, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
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
material: {shader: "standard", color: "#F0A500", opacity: 1, side: 'front', emissive: '#F0A500', emissiveIntensity: 1, roughness: 0.42, fog: false},
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
animations:{daynight:{property: 'object3D.rotation.x', from: 175, to: 535, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true,startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'},},
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
material: {shader: "standard", color: "#5c2196", opacity: 1, side: 'front', emissive: '#5c2196', emissiveIntensity: 0.75, roughness: 0.42, fog: false},
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
components: false,
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
components: false,
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
components: false,
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
components: false,
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
components: false,
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
components: false,
};
auxl.spawnTesting = auxl.Core(auxl.spawnTestingData);
//Sound Testing
auxl.soundTestingData = {
data:'Sound Testing',
id:'soundTesting',
sources: false,
//sound: {src: './assets/audio/270341__littlerobotsoundfactory__pickup-04.wav', autoplay: false, loop: false, volume: 1, on: 'playSound'},
sounds: {
pickup:{src: './assets/audio/270341__littlerobotsoundfactory__pickup-04.wav', autoplay: false, loop: false, volume: 1, on: 'playSound'},
pickup2:{src: './assets/audio/270341__littlerobotsoundfactory__pickup-04.wav', autoplay: false, loop: false, volume: 1, on: 'playSound2'},
},
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
//Event Testing
//Spawn Tester
auxl.coreEventTestingData = {
data:'coreEventTestingData',
id:'coreEventTesting',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern54, repeat: '1 1', color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(2,1,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	oneventrun__test:{
		event: 'test',
		cursorObj: 'comp',
		component: 'null',
		method: 'TestFunc',
		params: 'Event Test',
	},
	ondelayrun__test:{
		delay: 1000,
		cursorObj: 'comp',
		component: 'null',
		method: 'TestFunc',
		params: 'Delay Test'
	},
	onintervalrun__test:{
		interval: 2000,
		loop: 13,
		end: 'test',
		cursorObj: 'comp',
		component: 'null',
		method: 'TestFunc',
		params: 'Interval Test',
	},
},

};
auxl.coreEventTesting = auxl.Core(auxl.coreEventTestingData);


//Emoticon Bubble
auxl.emoticonTesting = auxl.InfoBubble('emoticonTesting', auxl.coreEventTesting, false, 'red');
auxl.emoticonTesting.NewBubble({
emote: true,
text: '$_$',
eventName: 'emote10',
rotation: false,
});
auxl.emoticonTesting.NewBubble({
alert: true,
text: '$_$',
eventName: 'alert10',
rotation: false,
});

//Build Library Objects
auxl.buildLibrary = () => {

//Player is Reset within Rebuild()

//Companion
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
auxl.compCube = auxl.Core(auxl.compCubeData);
auxl.compSphere = auxl.Core(auxl.compSphereData);
auxl.compPlane = auxl.Core(auxl.compPlaneData);
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

//Testing
auxl.eventTesting = auxl.Core(auxl.eventTestingData);
auxl.eventTesting2 = auxl.Core(auxl.eventTesting2Data);
auxl.eventTesting3 = auxl.Core(auxl.eventTesting3Data);
auxl.eventTesting4 = auxl.Core(auxl.eventTesting4Data);
auxl.eventTesting5 = auxl.Core(auxl.eventTesting5Data);
auxl.spawnTesting = auxl.Core(auxl.spawnTestingData);
auxl.soundTesting = auxl.Core(auxl.soundTestingData);
auxl.testing = auxl.Core(auxl.testingData);
auxl.coreEventTesting = auxl.Core(auxl.coreEventTestingData);
auxl.emoticonTesting = auxl.InfoBubble('emoticonTesting', auxl.coreEventTesting, false, 'red');
auxl.emoticonTesting.NewBubble({
emote: true,
text: '$_$',
eventName: 'emote10',
rotation: false,
});
auxl.emoticonTesting.NewBubble({
alert: true,
text: '$_$',
eventName: 'alert10',
rotation: false,
});

}
auxl.toBeRebuilt('buildLibrary');

},
});