//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('auxl-scene-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;



//Testing Object
auxl.build = auxl.BuildIn3D();




//
//Cores

//Toggle Test
auxl.testCubeCoreData = {
data:'testCubeCoreData',
id:'testCubeCore',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: auxl.pattern17, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.testCubeCore = auxl.Core(auxl.testCubeCoreData);

//Cube
auxl.cubeCoreData = {
data:'cubeCoreData',
id:'cubeCore',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(1,1.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.cubeCore = auxl.Core(auxl.cubeCoreData);

//Floor
auxl.floorData = {
	data:'floorData',
	id:'floor',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#1e7e5d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1e7e5d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '150 150'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(0.5,0.5,0.02),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: false,
};
auxl.floor = auxl.Core(auxl.floorData);

auxl.floor1Data = {
	data:'floor1Data',
	id:'floor1',
	sources:false,
	text: false,
	geometry: false,
	material: {shader: "standard", color: "#1caed1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1caed1", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '150 150'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
	['obj-model']:{obj: './assets/3d/land/floor1.obj'},
	},
};
auxl.floor1 = auxl.Core(auxl.floor1Data);

//Ceiling
auxl.indoorCeilingData = {
	data:'indoorCeilingData',
	id:'indoorCeiling',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', width: 20, height: 20,},
	material: {shader: "flat", src: auxl.pattern41, repeat: '20 20',color: "#642138", side: 'double'},
	position: new THREE.Vector3(0,8,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.indoorCeiling = auxl.Core(auxl.indoorCeilingData);

//
//Layers

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
auxl.cloudsParent = auxl.Core(auxl.cloudsParentData);
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
auxl.cloudData.id = 'cloud1';
auxl.cloudData.position = new THREE.Vector3(-150,200,-300);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud2';
auxl.cloudData.position = new THREE.Vector3(-150,200,200);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud2 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud3';
auxl.cloudData.position = new THREE.Vector3(100,200,0);
auxl.cloudData.scale = new THREE.Vector3(0.5,0.5,0.25);
auxl.cloud3 = auxl.Core(auxl.cloudData);
auxl.cloudLayerData = {
	parent: {core: auxl.cloudsParent}, 
	child0: {core: auxl.cloud1}, 
	child1: {core: auxl.cloud2},
	child2: {core: auxl.cloud3},
}
auxl.clouds = auxl.Layer('clouds',auxl.cloudLayerData);


//
//ObjsGenRing

//Basic
auxl.basicData = {
	data:'basicData',
	id:'basic',
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
auxl.basicRingData = {
	id: 'basicRing',
	objData: auxl.basicData,
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
auxl.basicRing = auxl.ObjsGenRing(auxl.basicRingData);


//
//GLTF Models
//Used in MultiAssetGen

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


//
//MultiAssetGen

//Biome
auxl.tinyData = {
	data: 'tinyData',
	id: 'tiny',
	type: 'tiny',
	radius: 0.1,
	min: 20,
	max: 30,
	rings: 1,
	objs:[
		auxl.flower_purpleAData,
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
auxl.smallData = {
	data: 'smallData',
	id: 'small',
	type: 'small',
	radius: 0.25,
	min: 4,
	max: 8,
	rings: 2,
	objs:[
		auxl.shovelDirtData,
	],
	ranYPos: false,
	yPosFlex: 6,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 1,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.mediumData = {
	data: 'mediumData',
	id: 'medium',
	type: 'med',
	radius: 1,
	min: 30,
	max: 50,
	rings: 3,
	objs:[
		auxl.grass_largeData,
	],
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: false,
	ranScaleZ: true,
	scaleFlex: 4,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.largeData = {
	data: 'largeData',
	id: 'large',
	type: 'large',
	radius: 2,
	min: 5,
	max: 10,
	rings: 4,
	objs:[
		auxl.rockLargeData,
	],
	ranYPos: false,
	yPosFlex: 2,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 1,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.hugeData = {
	data: 'hugeData',
	id: 'huge',
	type: 'huge',
	radius: 4,
	min: 20,
	max: 40,
	rings: 5,
	objs:[
		auxl.pineData,
	],
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
	ranAnim: false,
};
auxl.biomeData = {
data:'biomeData',
id:'biome',
tiny: auxl.tinyData,
small: auxl.smallData,
med: auxl.mediumData,
large: auxl.largeData,
huge: auxl.hugeData,
};
auxl.biome = auxl.MultiAssetGen(auxl.biomeData);

//
//Horizon

//Hills
auxl.hillsData = {
id: 'hills',
type: 'hills',
texture: false,
baseColor: false,
baseColorFamily: 'olive',
radius: 200,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.hills = auxl.Horizon(auxl.hillsData);


//Indoor Wall
auxl.indoorWallData = {
id: 'indoorWall',
type: 'squareWall',
texture: {src: auxl.pattern18, repeat: '20 14', emissive: true,},
baseColor: '#80401f',
baseColorFamily: false,
radius: 10,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.indoorWall = auxl.Horizon(auxl.indoorWallData);


//
//NPC

//Key Giver
auxl.npcKeyBubbleData = {
	data:'npcKeyBubbleData',
	id:'npcKeyBubble',
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
		['look-at']:'#camera',
	},
};
auxl.npcKeyBodyData = {
	data:'npcKeyBodyData',
	id:'npcKeyGiver',
	sources: false,
	text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
	geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
	material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
	position: new THREE.Vector3(0.5,1,-0.75),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		['look-at']:'#camera', 
	},
};
auxl.npcKeyPage1Data = {
	info:{
		id:'npcKeyPage1',
		description:'A basic example of a NPC with Speech.',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{IfElse: {self:{cond: 'zone1Key',
		ifTrue: {
			self:{Speak:{speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline3'},},
		},ifFalse: {
			self:{Speak:{role: '???', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},},}}},
	},
	timeline1:{
		self:{Speak:{speech:'Here you go!'}, SetFlag: {flag: 'zone1Key', value: true}},
		player:{AddToInventory: 'zone1Key'},
	},
	timeline2:{
		self:{Speak:{speech:'Good luck finding where it goes!'}},
	},
	timeline3:{
		self: {ResetBook: true},
	},
};
auxl.npcKeyIdleData = {
	info:{
		id:'npcKeyIdleData',
		description:'A basic example of a NPC Idle Speech.',
		tags:'npc',
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
auxl.npcKeyBookData = {
	info:{
		id:'npcKeyGiver',
		name: 'Key Giver',
		description:'A basic example of a NPC giving a Key.',
		tags:'npc',
		timeline: 'linear',
		idleDelay: 7000,
		idleInterval: 10000,
	},
	pages:{
		page0: auxl.npcKeyPage1Data,
	},
	idle:{
		page0: auxl.npcKeyIdleData,
	},
};
auxl.npcKeyBody = auxl.Core(auxl.npcKeyBodyData);
auxl.npcKeyBubble = auxl.Core(auxl.npcKeyBubbleData);
auxl.npcKeyGiver = auxl.NPC(auxl.npcKeyBody, auxl.npcKeyBookData, auxl.npcKeyBubble);

//
//Doorways

//Doorway1
auxl.doorway1Data = {
data:'doorway1Data',
id:'doorway1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1.5},
material: {shader: "standard", src: auxl.pattern16, repeat: '1 1', color: "#52a539", emissive: '#52a539', emissiveIntensity: 0.25, opacity: 0.75},
position: new THREE.Vector3(-1.5,0.75,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	doorway:{zone: 'zone0', to: 'connect0'},
	hovertext:{value: 'Doorway to Scene 1',  hover: 'front', offset: 0.5, x: false, y: true, z: false},
},
};
auxl.doorway1 = auxl.Core(auxl.doorway1Data);

//Doorway2
auxl.doorway2Data = {
data:'doorway2Data',
id:'doorway2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1.5},
material: {shader: "standard", src: auxl.pattern16, repeat: '1 1', color: "#9439a5", emissive: '#9439a5', emissiveIntensity: 0.25, opacity: 0.75},
position: new THREE.Vector3(-2.75,0.75,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	doorway:{zone: 'zone0', to: 'connect1'},
	hovertext:{value: 'Doorway to Scene 2', hover: 'top', offset: 1, x: true, y: true, z: true},
},
};
auxl.doorway2 = auxl.Core(auxl.doorway2Data);

},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('auxl-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//World Atlas MapZones & NodeScenes


//
//Testing World

//
//Zone 0
auxl.zone0Data = {
	info:{
		id: 'zone0',
		name: 'Zone0',
		zoneNum: 0,
		start: 'zone0Scene0',
		travelMenu: true,
	},
	controls:{
	},
	start:{
		cubeCore:{SpawnCore:null},
	},
	delay:{
		60000:{
			player:{Notification: {message:'1 Minute'}},
		},
	},
	interval:{
		6000: {
			run: {cubeCore:{EmitEvent: 'swapEvent'},}, loop: 'infinite'
		},
	},
	event:{
		swapEvent: {
			cubeCore:{IfElse: {cubeCore:{cond: 'testVar',
			ifTrue: {
				cubeCore:{EmitEvent: 'customevent1',SetFlag:{flag: 'testVar', value: false},},
			},ifFalse: {
				cubeCore:{EmitEvent: 'customevent2',SetFlag:{flag: 'testVar', value: true},},
			},}}},
		},
		customevent1: {
			cubeCore: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
		},
		customevent2: {
			cubeCore: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
		},
	},
	interaction:{
		click: {
			cubeCore:{EmitEvent:'swapEvent'},
		},
	},
	exit:{

	},
};
//Zone 0 Scene 0
auxl.zone0Scene0Data = {
	info:{
		id:'zone0Scene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: true,
	},
	controls:{

	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#1e7e5d", emissive: "#1e7e5d",},}},
		//biome:{SpawnMultiAsset:null},
		hills:{SpawnHorizon:null},
		//teleport:{SpawnTeleport:null},
		//test:{SpawnTest:null},
		//guessHitGame:{SpawnGHGame:null},
		doorway1:{SpawnCore:null},
		doorway2:{SpawnCore:null},
		//ghost:{SpawnLayer:null},
		//multiMenuTest:{SpawnMultiMenu:null},
	},
	delay:{
	},
	interval:{
/*
		5000: {
			run: {ghost:{IfElse: {ghost: {cond: 'power',
			ifTrue: {
			ghost:{EmitEventAll: 'poweredDown',SetFlagParent:{flag: 'power', value: false},},
			},
			ifFalse: {
			ghost:{EmitEventAll: 'poweredUp',SetFlagParent:{flag: 'power', value: true},},
			},
			},}},}, loop: 2
		},
*/
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: auxl.zone0Data.zone0Scene0,
	},
};
//Zone 0 Scene 1
auxl.zone0Scene1Data = {
	info:{
		id:'zone0Scene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern67, repeat: '150 150',color: "#6f421a", emissive: "#6f421a",},}},
		indoorWall:{SpawnHorizon:null},
		indoorCeiling:{SpawnCore:null},
		npcKeyGiver:{SpawnNPC:null},
		teleport0:{SpawnTeleport:null},
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
		data: auxl.zone0Data.zone0Scene1,
	},
};
//Zone 0 Scene 0
auxl.zone0Scene0 = auxl.SceneNode(auxl.zone0Scene0Data);
//Zone 0 Scene 1
auxl.zone0Scene1 = auxl.SceneNode(auxl.zone0Scene1Data);
//Map Zone 0
auxl.zone0 = auxl.MapZone(auxl.zone0Data);

//
//Zone 1
auxl.zone1Data = {
	info:{
		id: 'zone1',
		name: 'Zone1',
		zoneNum: 0,
		start: 'zone1Scene0',
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
auxl.zone1Scene0Data = {
	info:{
		id:'zone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:[{property: 'material', value: {src: auxl.pattern80, repeat: '150 150',color: "#21679a", emissive: "#21679a",},},{property: 'position', value: new THREE.Vector3(0,0,0),},{property: 'raycast-teleportation-select', value: null,}],},
		basicRing:{SpawnObjRing:null},
		swipeLaunchGame:{SpawnSLGame:null},
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
		floor:{RemoveComponent:'raycast-teleportation'},
	},
	map:{
		data: auxl.zone1Data.zone1Scene0,
	},
};
//Zone 1 Scene 0
auxl.zone1Scene0 = auxl.SceneNode(auxl.zone1Scene0Data);
//Zone 1
auxl.zone1 = auxl.MapZone(auxl.zone1Data);

//
//Scenarios

//
//Testing Scenario
auxl.v03TestingScenarioData = {
	info:{
		id: 'v03TestingScenario',
		name: 'v03 Testing Scenario',
		scenarioNum: 0,
		startZone: 'zone0',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	
	map:{
		zone0:{
			zone0Scene0:{
				connect0: {inZone: true, node: 'zone0Scene1',},
				connect1: {inZone: 'zone1', node: 'zone1Scene0', locked: true, key: 'zone1Key', keepKey: true},
			},
			zone0Scene1:{
				connect0: {inZone: true, node: 'zone0Scene0',},
			},
		},
		zone1:{
			zone1Scene0:{
				connect0: {inZone: 'zone0', node: 'zone0Scene0',},
			},
		},
	},
	controls:{
		//action1Down:{auxlObj: 'player', func: 'TestFunc', params: {test1: 1, test2: 2}},
		action1Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'movingUp', name: 'Test', info: 'Info'},
		action1Up:{auxlObj: 'playerRig', component: 'locomotion', func: 'cancelUp', name: 'Test', info: 'Info'},
		action2Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'movingDown', name: 'Test', info: 'Info'},
		action2Up:{auxlObj: 'playerRig', component: 'locomotion', func: 'cancelDown', name: 'Test', info: 'Info'},
		action3Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed', name: 'Test', info: 'Info'},
		//action3Down:{auxlObj: 'testCubeCore', func: 'ToggleSpawn',},
		action5Down:{auxlObj: 'player', func: 'ToggleCrouch', name: 'Test', info: 'Info'},
		//action6Down:{auxlObj: 'player', func: 'ToggleSittingMode'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft45', name: 'Test', info: 'Info'},
		action8Down:{auxlObj: 'player', func: 'SnapRight45', name: 'Test', info: 'Info'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		ham:{SpawnHam: null},
		floor:{SpawnCore: null},
		clouds:{SpawnLayer: null},
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
auxl.v03TestingScenario = auxl.Scenario(auxl.v03TestingScenarioData);

//
//Testing World
auxl.TestingWorldData = {
	info:{
		id: 'testingWorld',
		name: 'Testing World',
		description: 'A world containing various test scenarios.',
	},
	scenarios:[
		auxl.v03TestingScenario,
	],
};
auxl.testingWorld = auxl.World(auxl.TestingWorldData);
auxl.testingWorld.SetAsDefault();






//
//Loading World

//
//Zone Load Data
auxl.zoneLoadData = {
	info:{
		id: 'zoneLoad',
		name: 'Loading Zone',
		zoneNum: 0,
		start: 'zoneLoadScene',
		travelMenu: false,
	},
	map:{
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
//Zone Load Scene Data
auxl.zoneLoadSceneData = {
	info:{
		id:'zoneLoadScene',
		name: 'Loading Area',
		description: 'A loading area to select what you want to do.',
		sceneText: true,
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern75, repeat: '150 150',color: "#be1f8d", emissive: "#be1f8d",},},},
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
		data: auxl.zoneLoadData.zoneLoadScene,
	},
};
//Zone Load Scene
auxl.zoneLoadScene = auxl.SceneNode(auxl.zoneLoadSceneData);
//Zone Load
auxl.zoneLoad = auxl.MapZone(auxl.zoneLoadData);

//
//Load Scenario
auxl.loadScenarioData = {
	info:{
		id: 'loadScenario',
		name: 'Loading Scenario',
		scenarioNum: 0,
		startZone: 'zoneLoad',
		instructions: 'A loading area to select your World to load.',
	},
	map:{},
	controls:{
		action7Down:{auxlObj: 'player', func: 'SnapLeft'},
		action8Down:{auxlObj: 'player', func: 'SnapRight'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		ham:{SpawnHam: null},
		floor:{SpawnCore: null},
		clouds:{SpawnLayer: null},
		//Worlds Loaded Menu Spawn
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
auxl.loadScenario = auxl.Scenario(auxl.loadScenarioData);

//
//Load World
auxl.LoadWorldData = {
	info:{
		id: 'loadWorld',
		name: 'Load World',
		description: 'A loading world.',
	},
	scenarios:[
		auxl.loadScenario,
	],
};
auxl.loadWorld = auxl.World(auxl.LoadWorldData);

//System Loaded
auxl.systemLoaded();

    },
});