//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Project Library, World, Zone, Scene & AUXLObj caoss

//
//Customize

//
//Replace the following keywords
//Single Word, No Caps, Project Name : caos
//name : caosZone
//Start Scene : caosZoneScene0
//More Scene : caosZoneScene1
//Start Zone : caosZone
//More Scene :caosZone1Scene0
//More Zone : caosZone1
//Scenario : caosScenario
//World : caosWorld
//Reloading Library, Start with Capital : Caos

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('caos-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//Core caos
auxl.coreCaosData = {
	data:'coreCaosData',
	id:'corecaos',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#169066", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#169066", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(0.5,0.5,0.02),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: false,
};
auxl.coreCaos = auxl.Core(auxl.coreCaosData);

//Build Scene Library Objects
auxl.buildCaosLibrary = () => {
	auxl.coreCaos = auxl.Core(auxl.coreCaosData);
}
auxl.ToBeRebuilt('buildCaosLibrary');

},
});

//auxl-project
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('caos-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;
//
//World Atlas MapZones & NodeScenes


//
//Caos World

//
//Zone 0
auxl.caosZoneData = {
	info:{
		id: 'caosZone',
		name: 'caosZone',
		zoneNum: 0,
		start: 'caosZoneScene0',
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
auxl.caosZoneScene0Data = {
	info:{
		id:'caosZoneScene0',
		name: 'Zone 0 | Scene 0',
		description: '....',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
		ammoFloor:{SpawnCore: null},
		ammoWall1:{SpawnCore: null},
		ammoWall2:{SpawnCore: null},
		ammoWall3:{SpawnCore: null},
		ammoWall4:{SpawnCore: null},
		powerCubes:{SpawnCubes: null},
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
		data: auxl.caosZoneData.caosZoneScene0,
	},
};
//Zone 0 Scene 1
auxl.caosZoneScene1Data = {
	info:{
		id:'caosZoneScene1',
		name: 'Zone 0 | Scene 1',
		description: '...',
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
		data: auxl.caosZoneData.caosZoneScene1,
	},
};
//Zone 0 Scene 0
auxl.caosZoneScene0 = auxl.SceneNode(auxl.caosZoneScene0Data);
//Zone 0 Scene 1
auxl.caosZoneScene1 = auxl.SceneNode(auxl.caosZoneScene1Data);
//Map Zone 0
auxl.caosZone = auxl.MapZone(auxl.caosZoneData);

//
//Zone 1
auxl.caosZone1Data = {
	info:{
		id: 'caosZone1',
		name: 'caosZone1',
		zoneNum: 0,
		start: 'caosZone1Scene0',
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
auxl.caosZone1Scene0Data = {
	info:{
		id:'caosZone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: '...',
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
		data: auxl.caosZone1Data.caosZone1Scene0,
	},
};
//Zone 1 Scene 0
auxl.caosZone1Scene0 = auxl.SceneNode(auxl.caosZone1Scene0Data);
//Zone 1
auxl.caosZone1 = auxl.MapZone(auxl.caosZone1Data);

//
//Scenarios

//
//Testing Scenario
auxl.caosScenarioData = {
	info:{
		id: 'caosScenario',
		name: 'Caos Scenario',
		scenarioNum: 0,
		startZone: 'caosZone',
		instructions: '...',
	},
	
	map:{
		caosZone:{
			caosZoneScene0:{
				connect0: {inZone: true, node: 'caosZoneScene1',},
				connect1: {inZone: 'caosZone1', node: 'caosZone1Scene0',},
			},
			caosZoneScene1:{
				connect0: {inZone: true, node: 'caosZoneScene0',},
			},
		},
		caosZone1:{
			caosZone1Scene0:{
				connect0: {inZone: 'caosZone', node: 'caosZoneScene0',},
			},
		},
	},
	controls:{

		//Force Pull
		action1Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action1pull', name: 'Force Pull Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action1Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action1pull', name: 'Force Pull Targets', info: 'Force pull targets.'},

		//Force Up
		action2Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action2up', name: 'Force Up Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action2Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action2up', name: 'Force Up Targets', info: 'Force throw up targets.'},

		//Force Release
		//action2Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action2release', name: 'Force Release Targets', info: 'Force release targets.'},

		//Force Flick - Not working properly, is the same as throw
		action3Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action3grab', name: 'Force Flick Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action3Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action3flick', name: 'Force Flick Targets', info: 'Force flick targets.'},

		//Force Throw
		//action3Down:{auxlObj: 'player', func: 'HoverTargetDown', params: false, name: 'Force Throw Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		//action3Up:{auxlObj: 'player', func: 'HoverTargetUp', params: false, name: 'Force Throw Targets', info: 'Force throw targets.'},

		//Force Grab
		action4Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action4grab', name: 'Force Grab Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action4Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action4grab', name: 'Force Grab Targets', info: 'Force grab targets.'},

		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		comp:{SpawnComp: null,},

		building1Door:{SpawnCore: null},
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
auxl.caosScenario = auxl.Scenario(auxl.caosScenarioData);

//
//Testing World
auxl.caosWorldData = {
	info:{
		id: 'caosWorld',
		name: 'Caos World',
		description: '...',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: 'ammo',
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		auxl.caosScenario,
	],
};
auxl.caosWorld = auxl.World(auxl.caosWorldData);
//auxl.caosWorld.SetAsDefault();

//
//System Loaded
//auxl.SystemLoaded();
console.log({msg: 'caos world loaded', world: auxl.caosWorld})

    },
});