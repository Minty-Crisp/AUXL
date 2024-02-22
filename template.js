//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Project Library, World, Zone, Scene & AUXLObj Templates

//
//Customize

//
//Replace the following keywords
//Single Word, No Caps, Project Name : template
//name : templateZone
//Start Scene : templateZoneScene0
//More Scene : templateZoneScene1
//Start Zone : templateZone
//More Scene :templateZone1Scene0
//More Zone : templateZone1
//Scenario : templateScenario
//World : templateWorld
//Reloading Library, Start with Capital : Unique

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('template-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//Core Template
auxl.coreUniqueData = {
	data:'coreUniqueData',
	id:'coreUnique',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#169066", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#169066", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: false,
};
auxl.coreUnique = auxl.Core(auxl.coreUniqueData);

//Layer Template

//Custom AUXLObjGen w/ Add to Scene Tracker

/*
import {Core, coreDataFromTemplate, coreFromTemplate, Layer, layerDataFromTemplate, layerFromTemplate} from './main.js';
//Player : Player, Companion
import {Player, Companion, UniRay} from './player.js';
//Powers
import Powers from './powers.js';
//Scenes : SceneNode, MapZone, Scenario, World
import {SceneNode, MapZone, Scenario, World} from './scenes.js';
//Menu : Menu, MultiMenu, HoverMenu
import {Menu, MultiMenu, HoverMenu, ComboLock, ScrollMenu} from './menu.js';
//Environment : SkyBox, Horizon, ObjsGenRing, MultiAssetGen, Teleport
import {SkyBox, Horizon, ObjsGenRing, MultiAssetGen, Teleport} from './environment.js';
//NPC : Book, SpeechSystem, NPC, InfoBubble, Creature
import {Book, SpeechSystem, NPC, InfoBubble, Creature} from './npc.js';
//Grid : Collision, GridLayout, Gate
import {Collision, GridLayout, Gate} from './grid.js';
//Build : BuildIn3D
import {Constraints, One, BuildIn3D} from './build.js';
//
import {ImageSwapper, ImageCarousel} from './images.js';
*/
//Build Scene Library Objects
auxl.buildUniqueLibrary = () => {
	auxl.coreUnique = auxl.Core(auxl.coreUniqueData);
}
auxl.toBeRebuilt('buildUniqueLibrary');

},
});

//auxl-project
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('template-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;
//
//World Atlas MapZones & NodeScenes


//
//Template World

//
//Zone 0
auxl.templateZoneData = {
	info:{
		id: 'templateZone',
		name: 'templateZone',
		zoneNum: 0,
		start: 'templateZoneScene0',
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
//Zone 0 Scene 0
auxl.templateZoneScene0Data = {
	info:{
		id:'templateZoneScene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
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
	map:{
		data: auxl.templateZoneData.templateZoneScene0,
	},
};
//Zone 0 Scene 1
auxl.templateZoneScene1Data = {
	info:{
		id:'templateZoneScene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
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
	map:{
		data: auxl.templateZoneData.templateZoneScene1,
	},
};
//Zone 0 Scene 0
auxl.templateZoneScene0 = auxl.SceneNode(auxl.templateZoneScene0Data);
//Zone 0 Scene 1
auxl.templateZoneScene1 = auxl.SceneNode(auxl.templateZoneScene1Data);
//Map Zone 0
auxl.templateZone = auxl.MapZone(auxl.templateZoneData);

//
//Zone 1
auxl.templateZone1Data = {
	info:{
		id: 'templateZone1',
		name: 'templateZone1',
		zoneNum: 0,
		start: 'templateZone1Scene0',
		travelMenu: true,
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
//Zone 1 Scene 0
auxl.templateZone1Scene0Data = {
	info:{
		id:'templateZone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
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
	map:{
		data: auxl.templateZone1Data.templateZone1Scene0,
	},
};
//Zone 1 Scene 0
auxl.templateZone1Scene0 = auxl.SceneNode(auxl.templateZone1Scene0Data);
//Zone 1
auxl.templateZone1 = auxl.MapZone(auxl.templateZone1Data);

//
//Scenarios

//
//Testing Scenario
auxl.templateScenarioData = {
	info:{
		id: 'templateScenario',
		name: 'v03 Testing Scenario',
		scenarioNum: 0,
		startZone: 'templateZone',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	
	map:{
		templateZone:{
			templateZoneScene0:{
				connect0: {inZone: true, node: 'templateZoneScene1',},
				connect1: {inZone: 'templateZone1', node: 'templateZone1Scene0',},
			},
			templateZoneScene1:{
				connect0: {inZone: true, node: 'templateZoneScene0',},
			},
		},
		templateZone1:{
			templateZone1Scene0:{
				connect0: {inZone: 'templateZone', node: 'templateZoneScene0',},
			},
		},
	},
	controls:{
		action5Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action6Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		comp:{SpawnComp: null,},
		floor:{SpawnCore: null},
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
auxl.templateScenario = auxl.Scenario(auxl.templateScenarioData);

//
//Testing World
auxl.templateWorldData = {
	info:{
		id: 'templateWorld',
		name: 'Testing World',
		description: 'A world containing various test scenarios.',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: false,
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		auxl.templateScenario,
	],
};
auxl.templateWorld = auxl.World(auxl.templateWorldData);

//Default World
//auxl.templateWorld.SetAsDefault();

//
//System Loaded
//auxl.systemLoaded();
console.log({msg: 'template world loaded', world: auxl.templateWorld})

    },
});