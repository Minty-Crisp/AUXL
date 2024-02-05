//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//Default Starting Area & Library

const startLibrary = AFRAME.registerComponent('start-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//Build Scene Library Objects
auxl.buildSceneLibrary = () => {


}
auxl.toBeRebuilt('buildSceneLibrary');

},
});


//World / Scenarios / Zones / Nodes
const startScenes = AFRAME.registerComponent('start-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;
//
//World Atlas MapZones & NodeScenes


//
//Home World

//
//Zone 0
auxl.zoneHomeData = {
	info:{
		id: 'zoneHome',
		name: 'zoneHome',
		zoneNum: 0,
		start: 'zoneHomeScene0',
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
auxl.zoneHomeScene0Data = {
	info:{
		id:'zoneHomeScene0',
		name: 'Scene: 0',
		description: '...',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
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
		data: auxl.zoneHomeData.zoneHomeScene0,
	},
};
//Zone 0 Scene 0
auxl.zoneHomeScene0 = auxl.SceneNode(auxl.zoneHomeScene0Data);
//Map Zone 0
auxl.zoneHome = auxl.MapZone(auxl.zoneHomeData);

//
//Scenarios

//
//Testing Scenario
auxl.scenarioStartData = {
	info:{
		id: 'scenarioStart',
		name: 'Scenario: Start',
		scenarioNum: 0,
		startZone: 'zoneHome',
		instructions: '...',
	},
	
	map:{
		zoneHome:{
			zoneHomeScene0:{

			},
		},
	},
	controls:{

	},
	start:{
		skyBox0:{SpawnSkyBox: null},
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
auxl.scenarioStart = auxl.Scenario(auxl.scenarioStartData);

//
//Testing World
auxl.worldHomeData = {
	info:{
		id: 'worldHome',
		name: 'World: Home',
		description: '...',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: false,
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		auxl.scenarioStart,
	],
};
auxl.worldHome = auxl.World(auxl.worldHomeData);
//auxl.worldHome.SetAsDefault();

//
//System Loaded
//auxl.systemLoaded();

    },
});

//Export
export {startLibrary, startScenes}