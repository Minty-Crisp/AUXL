//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('grid-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Library

//kenney
auxl.pattern01 = './assets/img/tiles/kenney/pattern_01.png';
auxl.pattern02 = './assets/img/tiles/kenney/pattern_02.png';
auxl.pattern03 = './assets/img/tiles/kenney/pattern_03.png';
auxl.pattern04 = './assets/img/tiles/kenney/pattern_04.png';
auxl.pattern05 = './assets/img/tiles/kenney/pattern_05.png';
auxl.pattern06 = './assets/img/tiles/kenney/pattern_06.png';
auxl.pattern07 = './assets/img/tiles/kenney/pattern_07.png';
auxl.pattern08 = './assets/img/tiles/kenney/pattern_08.png';
auxl.pattern09 = './assets/img/tiles/kenney/pattern_09.png';
auxl.pattern10 = './assets/img/tiles/kenney/pattern_10.png';
auxl.pattern11 = './assets/img/tiles/kenney/pattern_11.png';
auxl.pattern12 = './assets/img/tiles/kenney/pattern_12.png';
auxl.pattern13 = './assets/img/tiles/kenney/pattern_13.png';
auxl.pattern14 = './assets/img/tiles/kenney/pattern_14.png';
auxl.pattern15 = './assets/img/tiles/kenney/pattern_15.png';
auxl.pattern16 = './assets/img/tiles/kenney/pattern_16.png';
auxl.pattern17 = './assets/img/tiles/kenney/pattern_17.png';
auxl.pattern18 = './assets/img/tiles/kenney/pattern_18.png';
auxl.pattern19 = './assets/img/tiles/kenney/pattern_19.png';
auxl.pattern20 = './assets/img/tiles/kenney/pattern_20.png';
auxl.pattern21 = './assets/img/tiles/kenney/pattern_21.png';
auxl.pattern22 = './assets/img/tiles/kenney/pattern_22.png';
auxl.pattern23 = './assets/img/tiles/kenney/pattern_23.png';
auxl.pattern24 = './assets/img/tiles/kenney/pattern_24.png';
auxl.pattern25 = './assets/img/tiles/kenney/pattern_25.png';
auxl.pattern26 = './assets/img/tiles/kenney/pattern_26.png';
auxl.pattern27 = './assets/img/tiles/kenney/pattern_27.png';
auxl.pattern28 = './assets/img/tiles/kenney/pattern_28.png';
auxl.pattern29 = './assets/img/tiles/kenney/pattern_29.png';
auxl.pattern30 = './assets/img/tiles/kenney/pattern_30.png';
auxl.pattern31 = './assets/img/tiles/kenney/pattern_31.png';
auxl.pattern32 = './assets/img/tiles/kenney/pattern_32.png';
auxl.pattern33 = './assets/img/tiles/kenney/pattern_33.png';
auxl.pattern34 = './assets/img/tiles/kenney/pattern_34.png';
auxl.pattern35 = './assets/img/tiles/kenney/pattern_35.png';
auxl.pattern36 = './assets/img/tiles/kenney/pattern_36.png';
auxl.pattern37 = './assets/img/tiles/kenney/pattern_37.png';
auxl.pattern38 = './assets/img/tiles/kenney/pattern_38.png';
auxl.pattern39 = './assets/img/tiles/kenney/pattern_39.png';
auxl.pattern40 = './assets/img/tiles/kenney/pattern_40.png';
auxl.pattern41 = './assets/img/tiles/kenney/pattern_41.png';
auxl.pattern42 = './assets/img/tiles/kenney/pattern_42.png';
auxl.pattern43 = './assets/img/tiles/kenney/pattern_43.png';
auxl.pattern44 = './assets/img/tiles/kenney/pattern_44.png';
auxl.pattern45 = './assets/img/tiles/kenney/pattern_45.png';
auxl.pattern46 = './assets/img/tiles/kenney/pattern_46.png';
auxl.pattern47 = './assets/img/tiles/kenney/pattern_47.png';
auxl.pattern48 = './assets/img/tiles/kenney/pattern_48.png';
auxl.pattern49 = './assets/img/tiles/kenney/pattern_49.png';
auxl.pattern50 = './assets/img/tiles/kenney/pattern_50.png';
auxl.pattern51 = './assets/img/tiles/kenney/pattern_51.png';
auxl.pattern52 = './assets/img/tiles/kenney/pattern_52.png';
auxl.pattern53 = './assets/img/tiles/kenney/pattern_53.png';
auxl.pattern54 = './assets/img/tiles/kenney/pattern_54.png';
auxl.pattern55 = './assets/img/tiles/kenney/pattern_55.png';
auxl.pattern56 = './assets/img/tiles/kenney/pattern_56.png';
auxl.pattern57 = './assets/img/tiles/kenney/pattern_57.png';
auxl.pattern58 = './assets/img/tiles/kenney/pattern_58.png';
auxl.pattern59 = './assets/img/tiles/kenney/pattern_59.png';
auxl.pattern60 = './assets/img/tiles/kenney/pattern_60.png';
auxl.pattern61 = './assets/img/tiles/kenney/pattern_61.png';
auxl.pattern62 = './assets/img/tiles/kenney/pattern_62.png';
auxl.pattern63 = './assets/img/tiles/kenney/pattern_63.png';
auxl.pattern64 = './assets/img/tiles/kenney/pattern_64.png';
auxl.pattern65 = './assets/img/tiles/kenney/pattern_65.png';
auxl.pattern66 = './assets/img/tiles/kenney/pattern_66.png';
auxl.pattern67 = './assets/img/tiles/kenney/pattern_67.png';
auxl.pattern68 = './assets/img/tiles/kenney/pattern_68.png';
auxl.pattern69 = './assets/img/tiles/kenney/pattern_69.png';
auxl.pattern70 = './assets/img/tiles/kenney/pattern_70.png';
auxl.pattern71 = './assets/img/tiles/kenney/pattern_71.png';
auxl.pattern72 = './assets/img/tiles/kenney/pattern_72.png';
auxl.pattern73 = './assets/img/tiles/kenney/pattern_73.png';
auxl.pattern74 = './assets/img/tiles/kenney/pattern_74.png';
auxl.pattern75 = './assets/img/tiles/kenney/pattern_75.png';
auxl.pattern76 = './assets/img/tiles/kenney/pattern_76.png';
auxl.pattern77 = './assets/img/tiles/kenney/pattern_77.png';
auxl.pattern78 = './assets/img/tiles/kenney/pattern_78.png';
auxl.pattern79 = './assets/img/tiles/kenney/pattern_79.png';
auxl.pattern80 = './assets/img/tiles/kenney/pattern_80.png';
auxl.pattern81 = './assets/img/tiles/kenney/pattern_81.png';
auxl.pattern82 = './assets/img/tiles/kenney/pattern_82.png';
auxl.pattern83 = './assets/img/tiles/kenney/pattern_83.png';
auxl.pattern84 = './assets/img/tiles/kenney/pattern_84.png';

auxl.patterns = [auxl.pattern01,auxl.pattern02,auxl.pattern03,auxl.pattern04,auxl.pattern05,auxl.pattern06,auxl.pattern07,auxl.pattern08,auxl.pattern09,auxl.pattern10,auxl.pattern11,auxl.pattern12,auxl.pattern13,auxl.pattern14,auxl.pattern15,auxl.pattern16,auxl.pattern17,auxl.pattern18,auxl.pattern19,auxl.pattern20,auxl.pattern21,auxl.pattern22,auxl.pattern23,auxl.pattern24,auxl.pattern25,auxl.pattern26,auxl.pattern27,auxl.pattern28,auxl.pattern29,auxl.pattern30,auxl.pattern31,auxl.pattern32,auxl.pattern33,auxl.pattern34,auxl.pattern35,auxl.pattern36,auxl.pattern37,auxl.pattern38,auxl.pattern39,auxl.pattern40,auxl.pattern41,auxl.pattern42,auxl.pattern43,auxl.pattern44,auxl.pattern45,auxl.pattern46,auxl.pattern47,auxl.pattern48,auxl.pattern49,auxl.pattern50,auxl.pattern51,auxl.pattern52,auxl.pattern53,auxl.pattern54,auxl.pattern55,auxl.pattern56,auxl.pattern57,auxl.pattern58,auxl.pattern59,auxl.pattern60,auxl.pattern61,auxl.pattern62,auxl.pattern63,auxl.pattern64,auxl.pattern65,auxl.pattern66,auxl.pattern67,auxl.pattern68,auxl.pattern69,auxl.pattern70,auxl.pattern71,auxl.pattern72,auxl.pattern73,auxl.pattern74,auxl.pattern75,auxl.pattern76,auxl.pattern77,auxl.pattern78,auxl.pattern79,auxl.pattern80,auxl.pattern81,auxl.pattern82,auxl.pattern83,auxl.pattern84];


//
//Testing Objects


//Add To Inventory Test
auxl.chest1Data = {
data:'chest1Data',
id:'chest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.25},
material: {shader: "standard", src: auxl.pattern55, repeat: '1 1', color: "#fff500", emissive: '#fff500', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
clickaddinventory:{item: 'flashlightTool', once: true, despawn: true, auxlObj: 'chest1', despawnMethod: 'DespawnCore'},
},
};
auxl.chest1 = auxl.Core(auxl.chest1Data);

//Use Object Test
auxl.use1Data = {
data:'use1Data',
id:'use1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.25},
material: {shader: "standard", src: auxl.pattern56, repeat: '1 1', color: "#00b1ff", emissive: '#00b1ff', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(2,2,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}, },
mixins: false,
classes: ['clickable','a-ent'],
components: {
acceptobject:{item: 'testItem1', uses: 2, despawn: true, auxlObj: 'use1', despawnMethod: 'DespawnCore', methodObj: 'player', component: 'null', method: 'TestFunc', params: 'testItem1 Used',},
},
};
auxl.use1 = auxl.Core(auxl.use1Data);

//Grid Layout Testing
auxl.dataGridObjectData = {
data:'dataGridObjectData',
id:'dataGrid',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.5, height: 2},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.5, opacity: 1},
position: new THREE.Vector3(0,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.dataGridObject2Data = {
data:'dataGridObject2Data',
id:'dataGrid',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.5, height: 2},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#a53941", emissive: '#a53941', emissiveIntensity: 0.5, opacity: 1},
position: new THREE.Vector3(0,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.testGrid2Data = {
id: 'testGrid2',
//coreData: auxl.dataGridObjectData,
coreData: [auxl.dataGridObjectData, auxl.dataGridObject2Data],
//layerData: auxl.layerGridObjectData,
//layerData: [auxl.layerGridObjectData, auxl.layerGridObject2Data],

grids:{
	grid1:[
	{start: {x:-2, z:-4}, end: {x:-1.5, z:-4}, collide: true,},
	{start: {x:-1, z:-4}, end: {x:-0.5, z:-4}, collide: true,},
	{start: {x:0, z:-4}, end: {x:0.5, z:-4}, collide: true,},
	{start: {x:1, z:-4}, end: {x:1.5, z:-4}, collide: true,},
	{start: {x:2, z:-4}, end: {x:2.5, z:-4}, collide: true,},
	],
	grid2:[
	{start: {x:-2, z:4}, end: {x:-1.5, z:4}, collide: true,},
	{start: {x:-1, z:4}, end: {x:-0.5, z:4}, collide: true,},
	{start: {x:0, z:4}, end: {x:0.5, z:4}, collide: true,},
	{start: {x:1, z:4}, end: {x:1.5, z:4}, collide: true,},
	{start: {x:2, z:4}, end: {x:2.5, z:4}, collide: true,},
	],
},
//combine : true,
};
auxl.testGrid2 = auxl.GridLayout(auxl.testGrid2Data);


//Testing Object for Interactions and Events
auxl.eventTestingData = {
data:'eventTestingData',
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
//sound: {src: './assets/audio/kenney/confirmation_001.mp3', autoplay: false, loop: false, volume: 1, on: 'playSound'},
sounds: {
pickup:{src: './assets/audio/kenney/confirmation_001.mp3', autoplay: false, loop: false, volume: 1, on: 'playSound'},
pickup2:{src: './assets/audio/kenney/confirmation_001.mp3', autoplay: false, loop: false, volume: 1, on: 'playSound2'},
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


//Assign Core Duplication
auxl.coreDupeTestAssign = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTestAssign', position: new THREE.Vector3(-2,2,-1)}, true);
//auxl.coreDupeTestAssign.SpawnCore();


//Individual Core Duplication from Template
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest', position: new THREE.Vector3(0,3,-1)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest2', position: new THREE.Vector3(-2,3,-1)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest3', position: new THREE.Vector3(-2,3,-1)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest4', position: new THREE.Vector3(-2,3,-1)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest5', position: new THREE.Vector3(-2,3,-1)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest6', position: new THREE.Vector3(-1,2,-2)});
auxl.CoreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest7', position: new THREE.Vector3(-1,2,-2)});

auxl.layerDupeTestData = {
	parent: {core: auxl.coreDupeTest}, 
	child0: {
		parent: {core: auxl.coreDupeTest2}, 
		child0: {
			parent: {core: auxl.coreDupeTest3}, 
			child0: {
				parent: {core: auxl.coreDupeTest4}, 
				child0: {core: auxl.coreDupeTest5}, 
			}, 
		}, 
	},
	child1: {
		parent: {core: auxl.coreDupeTest6}, 
		child0: {core: auxl.coreDupeTest7}, 
	},
}
auxl.layerDupeTest = auxl.Layer('layerDupeTest',auxl.layerDupeTestData);
//auxl.layerDupeTest.SpawnLayer();

//Layer Duplication from Template
/*
auxl.LayerFromTemplate(auxl.layerDupeTest, 'layerDupeTest', {position: new THREE.Vector3(0,3,-6)});
auxl.layerDupeTestCopy0.SpawnLayer();
*/

auxl.layerDataTest = auxl.LayerDataFromTemplate(auxl.layerDupeTestData, 'layerTest',{position: new THREE.Vector3(0,3,-12)}, false, true);
auxl.layerTest = auxl.Layer('layerTest', auxl.layerDataTest);
//auxl.layerTest.SpawnLayer();


//Collision Spawn Testing
auxl.collisionTest1 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest1', geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:-1, z:1}, end: {x:-1, z:1}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest2 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest2', geometry: {primitive: 'box', depth: 0.5, width: 1, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:0, y:0, z:3}, end: {x:0.5, y:0, z:3}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest8 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest8', geometry: {primitive: 'box', depth: 0.5, width: 1, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:1, z:3.5}, end: {x:1.5, z:3.5}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest3 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest3', geometry: {primitive: 'box', depth: 2.5, width: 0.5, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:3, z:0}, end: {x:3, z:2}, yOffset: 0.5, collide: true}}, true);



auxl.collisionTest4 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest4', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:-5, y:0, z:-2}, end: {x:-3.5, y:0, z:-0.5}, yOffset: 0.5, collide: true}}, true);

auxl.collisionTest4.GridPath({route: 'any', loop: 'infinite', speed:1000, wait:500, patience: 6, type: 'anim', path:[{z:-2,y:1,x:2,}, {z:2,y:-1,x:-2,},]});
//auxl.collisionTest4.GridPath({route: 'any', loop: 'infinite', speed:1000, wait:500, patience: 3, type: 'anim', path:[{z:-2,y:1,x:2,}, {z:2,y:-1,x:-2,},]});

auxl.collisionTest5 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest5', geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:0, z:-5}, end: {x:0, z:-5}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest6 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest6', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a57739", emissive: '#a57739', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:-3, y:0, z:-0.5}, end: {x:-1.5, y:0, z:1}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest7 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest7', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a57739", emissive: '#a57739', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:20, z:-1}, end: {x:21.5, z:0.5}, yOffset: 0.5, collide: true}}, true);


auxl.collisionTest9 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest9', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a57739", emissive: '#a57739', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:-5, y:1, z:-4.5}, end: {x:-3.5, y:1, z:-3}, yOffset: 0.5, collide: true}}, true);


//GridTriggerTesting 1 
//Trigger In and Out Once Only
auxl.GridTriggerTest1Data = {
data:'GridTriggerTest1Data',
id:'GridTriggerTest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, 
material: {shader: "standard", src: auxl.pattern15, repeat: '1 1', color: "#e6f257", emissive: '#e6f257', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
	in: {property: 'object3D.scale.y', from: '1', to: '2', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'in'},
	out: {property: 'object3D.scale.y', from: '2', to: '1', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'out'},
}, 
components: {
	oneventrun__triggerin:{event: 'triggerEnter', cursorObj: 'GridTriggerTest1', component: 'null', method: 'EmitEvent', params: 'in', once: true},
	oneventrun__triggerout:{event: 'triggerExit', cursorObj: 'GridTriggerTest1', component: 'null', method: 'EmitEvent', params: 'out', once: true},
},
grid: {start:{x:5, z:-2}, end: {x:6.5, z:-0.5}, yOffset: 0.5, trigger: true},
classes: ['a-ent'],

};
auxl.GridTriggerTest1 = auxl.Core(auxl.GridTriggerTest1Data);




//GridTriggerTesting 2
//Trigger In and Out Always
auxl.GridTriggerTest2 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'GridTriggerTest2', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern15, repeat: '1 1', color: "#f28757", emissive: '#f28757', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), animations: {in: {property: 'object3D.scale.y', from: '1', to: '2', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'in'}, out: {property: 'object3D.scale.y', from: '2', to: '1', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'out'},}, components: {oneventrun__triggerin:{event: 'triggerEnter', cursorObj: 'GridTriggerTest2', component: 'null', method: 'EmitEvent', params: 'in',}, oneventrun__triggerout:{event: 'triggerExit', cursorObj: 'GridTriggerTest2', component: 'null', method: 'EmitEvent', params: 'out',},},grid: {start:{x:5, z:6}, yOffset: 0.5, end: {x:6.5, z:7.5}, trigger: true}}, true);

//
//Gates

//Gate 1
auxl.gate1Base = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'gate1Base', geometry: {primitive: 'box', depth: 0.5, width: 1.5, height: 2}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a58c", emissive: '#39a58c', emissiveIntensity: 0.25, opacity:0}, position: new THREE.Vector3(0,0,0), grid: {start:{x:3.5, y:0, z:-8}, end: {x:5, y:1, z:-7.5}, yOffset: 1, trigger: true}}, true);

auxl.gate1 = auxl.Gate('gate1', auxl.gate1Base, 'forward');

//Gate Poles
auxl.collisionTest10 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest10', geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 2}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:3, y:0, z:-8}, end: {x:3.5, y:1, z:-7.5}, yOffset: 1, collide: true}}, true);

auxl.collisionTest11 = auxl.CoreFromTemplate(auxl.eventTesting,{id: 'collisionTest11', geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 2}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0,0), grid: {start:{x:5, y:0, z:-8}, end: {x:5.5, y:1, z:-7.5}, yOffset: 1, collide: true}}, true);



//copy ghost body, add layer details

//Collision Layer
auxl.ghostCollisionData = auxl.LayerDataFromTemplate(auxl.ghostLayerData, 'ghostCollisionData', {position: new THREE.Vector3(0,0,0)}, {grid: {start:{x:3, y:0, z:-5}, end: {x:4, y:1, z:-4}, yOffset: 1, collide: true},}, true);
auxl.ghostCollision = auxl.Layer('ghostCollision', auxl.ghostCollisionData);
auxl.ghostCollision.GridPath({route: 'any', loop: 'infinite', speed:1000, wait:500, patience: 3, type: 'anim', path:[{z:-2,y:1,x:2,}, {z:2,y:-1,x:-2,},]});

//auxl.ghostCollision.GridPath({route: 'any', loop: 'infinite', speed:1000, wait:500, patience: 6, type: 'anim', path:[{z:-1,y:1,x:1,}, {z:1,y:-1,x:-1,},]});


//Info Bubble
auxl.infoTesting = auxl.InfoBubble('infoTesting', auxl.coreEventTesting, false, 'red');
auxl.infoTesting.NewBubble({
emote: true,
text: '$_$',
eventName: 'emote10',
rotation: false,
});
auxl.infoTesting.NewBubble({
alert: true,
text: '$_$',
eventName: 'alert10',
rotation: false,
});

//Creature Testing
//auxl.emoticonTesting = auxl.Creature('emoticonTesting', false, {eyeSize: 'large', eye: 'egg', pupil: 'square', earSize: 'large', ear: 'bun'});
auxl.creatureTesting1 = auxl.Creature('creatureTesting1', false, {eye: 'egg', pupil: 'egg'});

auxl.creatureTesting2 = auxl.Creature('creatureTesting2', false, {offset: new THREE.Vector3(2,3,-3)});

//Physics Testing
auxl.physicsTest1Data = {
data:'physicsTest1Data',
id:'physicsTest1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,6,-6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['dynamic-body']:null,
},
};
auxl.physicsTest1 = auxl.Core(auxl.physicsTest1Data);


//Collision testing
auxl.physicsTest2Data = {
data:'physicsTest2Data',
id:'physicsTest2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 2, height: 1},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['static-body']:null,
},
};
auxl.physicsTest2 = auxl.Core(auxl.physicsTest2Data);

//
//Creature Face Testing

//Parent
auxl.faceParentData = {
data:'faceParentData',
id:'faceParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(-4,3,-3),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig', twist: true},
},
};
auxl.faceParent = auxl.Core(auxl.faceParentData);
//EyeSocket
auxl.faceEye1SocketData = {
data:'faceEye1SocketData',
id:'faceEye1Socket',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.15,0.1,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(0.75,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEye1Socket = auxl.Core(auxl.faceEye1SocketData);
//Eye2Socket
auxl.faceEye2SocketData = auxl.CoreDataFromTemplate(auxl.faceEye1SocketData, {id: 'faceEye2Socket', position: new THREE.Vector3(0.15,0.1,0.4)}, true);
auxl.faceEye2Socket = auxl.Core(auxl.faceEye2SocketData);
//Eye1Pupil
auxl.faceEye1PupilData = {
data:'faceEye1PupilData',
id:'faceEye1Pupil',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.075, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#1500fa", emissive: '#1500fa', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1,1),
animations: {
lookdown: {property: 'position', to: new THREE.Vector3(0,0.01,0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookDown'},
lookup: {property: 'position', to: new THREE.Vector3(0,0.01,-0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookUp'},
lookright: {property: 'position', to: new THREE.Vector3(0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookRight'},
lookleft: {property: 'position', to: new THREE.Vector3(-0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookLeft'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEye1Pupil = auxl.Core(auxl.faceEye1PupilData);
//Eye2Pupil
auxl.faceEye2PupilData = auxl.CoreDataFromTemplate(auxl.faceEye1PupilData, {id: 'faceEye2Pupil',}, true);
auxl.faceEye2Pupil = auxl.Core(auxl.faceEye2PupilData);

//Eyebrow
auxl.faceEyebrow1Data = {
data:'faceEyebrow1Data',
id:'faceEyebrow1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.04, width: 0.3, height: 0.025, },
material: {shader: "standard", color: "#c921af", emissive: '#c921af', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,-0.25),
rotation: new THREE.Vector3(0,10,0),
scale: new THREE.Vector3(1,1,1),
animations: {
updown: {property: 'object3D.position.z', from: -0.3, to: -0.225, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEyebrow1 = auxl.Core(auxl.faceEyebrow1Data);
auxl.faceEyebrow2Data = auxl.CoreDataFromTemplate(auxl.faceEyebrow1Data, {id: 'faceEyebrow2', rotation: new THREE.Vector3(0,-10,0)}, true);
auxl.faceEyebrow2 = auxl.Core(auxl.faceEyebrow2Data);

//Eyelid Offset
auxl.faceEye1LidOffsetData = {
data:'faceEye1LidOffsetData',
id:'faceEye1LidOffset',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,-0.175),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
scale: {property: 'object3D.scale.z', from: 0.65, to: 1.3, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEye1LidOffset = auxl.Core(auxl.faceEye1LidOffsetData);
auxl.faceEye2LidOffsetData = auxl.CoreDataFromTemplate(auxl.faceEye1LidOffsetData, {id: 'faceEye2LidOffset'}, true);
auxl.faceEye2LidOffset = auxl.Core(auxl.faceEye2LidOffsetData);
//Eyelid
auxl.faceEye1LidData = {
data:'faceEye1LidData',
id:'faceEye1Lid',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180},
material: {shader: "standard", color: "#c921af", emissive: '#c921af', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0.175),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.06,4,1.06),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEye1Lid = auxl.Core(auxl.faceEye1LidData);
auxl.faceEye2LidData = auxl.CoreDataFromTemplate(auxl.faceEye1LidData, {id: 'faceEye2Lid'}, true);
auxl.faceEye2Lid = auxl.Core(auxl.faceEye2LidData);

//Blink
auxl.faceEye1BlinkData = {
data:'faceEye1BlinkData',
id:'faceEye1Blink',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c921af", emissive: '#c921af', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.1,4,1.1),
animations: {
blinkin: {property: 'visible', from: false, to: true, dur: 1, delay: 2000, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
blinkout: {property: 'visible', from: true, to: false, dur: 1, delay: 2250, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
},
};
auxl.faceEye1Blink = auxl.Core(auxl.faceEye1BlinkData);
auxl.faceEye2BlinkData = auxl.CoreDataFromTemplate(auxl.faceEye1BlinkData, {id: 'faceEye2Blink'}, true);
auxl.faceEye2Blink = auxl.Core(auxl.faceEye2BlinkData);


//Ear Offset
auxl.faceEar1OffsetData = {
data:'faceEar1OffsetData',
id:'faceEar1Offset',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(-0.25,0.5,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(0.5,1,0.5),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEar1Offset = auxl.Core(auxl.faceEar1OffsetData);
auxl.faceEar2OffsetData = auxl.CoreDataFromTemplate(auxl.faceEar1OffsetData, {id: 'faceEar2Offset', position: new THREE.Vector3(0.25,0.5,0.4)}, true);
auxl.faceEar2Offset = auxl.Core(auxl.faceEar2OffsetData);
//Ear
auxl.faceEar1Data = {
data:'faceEar1Data',
id:'faceEar1',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180},
material: {shader: "standard", color: "#c921af", emissive: '#c921af', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0.175),
rotation: new THREE.Vector3(0,30,0),
scale: new THREE.Vector3(1,1,3),
animations: {
twitch: {property: 'object3D.rotation.y', from: 25, to: 35, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.faceEar1 = auxl.Core(auxl.faceEar1Data);
auxl.faceEar2Data = auxl.CoreDataFromTemplate(auxl.faceEar1Data, {id: 'faceEar2', rotation: new THREE.Vector3(0,-30,0), animations:{twitch: {property: 'object3D.rotation.y', from: -25, to: -35, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},}}, true);
auxl.faceEar2 = auxl.Core(auxl.faceEar2Data);

auxl.faceLayerData = {
	parent: {core: auxl.faceParent}, 
	child0: {
		parent: {core: auxl.faceEye1Socket}, 
		child0: {core: auxl.faceEyebrow1}, 
		child1: {core: auxl.faceEye1Pupil},
		child2: {core: auxl.faceEye1Blink}, 
		child3: {
			parent: {core: auxl.faceEye1LidOffset}, 
			child0: {core: auxl.faceEye1Lid}, 
		}, 
	},
	child1: {
		parent: {core: auxl.faceEye2Socket}, 
		child0: {core: auxl.faceEyebrow2}, 
		child1: {core: auxl.faceEye2Pupil},
		child2: {core: auxl.faceEye2Blink}, 
		child3: {
			parent: {core: auxl.faceEye2LidOffset}, 
			child0: {core: auxl.faceEye2Lid}, 
		}, 
	},
	child2: {
		parent: {core: auxl.faceEar1Offset}, 
		child0: {core: auxl.faceEar1}, 
	},
	child3: {
		parent: {core: auxl.faceEar2Offset}, 
		child0: {core: auxl.faceEar2}, 
	},
}
auxl.faceTest = auxl.Layer('faceTest',auxl.faceLayerData);


//
//Testing

//Build
auxl.build = auxl.BuildIn3D();

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
geometry: {primitive: 'box', depth: 0.35, width: 0.35, height: 0.35},
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
auxl.cubeCoreInfo = auxl.InfoBubble('cubeCoreInfo', auxl.cubeCore, false, 'red');

//Switch Cube
auxl.switchCubeData = {
data:'switchCubeData',
id:'switchCube',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.15, width: 0.35, height: 0.35},
material: {shader: "standard", src: auxl.pattern11, repeat: '1 1', color: "#2380b2", emissive: '#2380b2', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-1,2,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['stare']:{id: 'playerRig', twist: true,},
},
};
auxl.switchCube = auxl.Core(auxl.switchCubeData);
auxl.switchCubeInfo = auxl.InfoBubble('switchCubeInfo', auxl.switchCube, false, 'blue');

//Floor
auxl.floorData = {
	data:'floorData',
	id:'floor',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 825, segments: 32, thetaStart: 0, thetaLength: 360},
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
auxl.cloud1Data = auxl.CoreDataFromTemplate(auxl.cloudData, {id: 'cloud1', position: new THREE.Vector3(-150,200,-300), scale: new THREE.Vector3(1,0.25,0.75)}, true);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloud2Data = auxl.CoreDataFromTemplate(auxl.cloudData, {id: 'cloud2', position: new THREE.Vector3(-150,200,200), scale: new THREE.Vector3(1,0.25,0.75)}, true);
auxl.cloud2 = auxl.Core(auxl.cloud2Data);
auxl.cloud3Data = auxl.CoreDataFromTemplate(auxl.cloudData, {id: 'cloud3', position: new THREE.Vector3(100,200,0), scale: new THREE.Vector3(0.5,0.5,0.25)}, true);
auxl.cloud3 = auxl.Core(auxl.cloud3Data);
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
['gltf-model']:'./assets/3d/flora/kenney/crop_melon.glb',
//['modify-materials']:null,
//['auxl-object']:{dataName: 'testingData'},
},
};
auxl.testing = auxl.Core(auxl.testingData);

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
		['gltf-model']:'./assets/3d/flora/minty/flower_purpleA.glb',
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
		['gltf-model']:'./assets/3d/flora/minty/grass_large.glb',
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
		['gltf-model']:'./assets/3d/flora/kenney/pine.glb',
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
		['gltf-model']:'./assets/3d/flora/kenney/rockLarge.glb',
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
		['gltf-model']:'./assets/3d/flora/kenney/shovelDirt.glb',
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
//Inventory Objects

//Items
auxl.testItem1 = {
	name: 'Test Item 1',
	description: 'Just a test item.',
	category: 'items',
	type: 'use',
	persist: 'limited',
	amount: 3,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testItem1',
	menu: 'stay',
};
auxl.testItem2 = {
	name: 'Test Item 2',
	description: 'Just a test item.',
	category: 'items',
	type: 'equip',
	persist: 'limited',
	amount: 1,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testItem2',
	menu: 'stay',
};

//Tools
auxl.flashlightTool = {
	name: 'Toggle Flashlight',
	description: 'Turn On/Off your flashlight.',
	category: 'tools',
	type: 'use',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'ToggleFlashlight',
	params: 'null',
	menu: 'back',
};
auxl.testTool1 = {
	name: 'Test Tool 1',
	description: 'Just a test tool.',
	category: 'tools',
	type: 'use',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testTool1',
	menu: 'back',
};
auxl.testTool2 = {
	name: 'Test Tool 2',
	description: 'Just a test tool.',
	category: 'tools',
	type: 'use',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testTool2',
	menu: 'back',
};

//Keys
auxl.gridZone1Key = {
	name: 'Zone 1 Key',
	id: 'gridZone1Key',
	description: 'A Key to unlock Zone 1.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'gridZone1Key',
	menu: 'back',
};
auxl.testKey1 = {
	name: 'Test Key 1',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey1',
	menu: 'back',
};
auxl.testKey2 = {
	name: 'Test Key 2',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey2',
	menu: 'back',
};
auxl.testKey3 = {
	name: 'Test Key 3',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey3',
	menu: 'back',
};
auxl.testKey4 = {
	name: 'Test Key 4',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey4',
	menu: 'back',
};
auxl.testKey5 = {
	name: 'Test Key 5',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey5',
	menu: 'back',
};
auxl.testKey6 = {
	name: 'Test Key 6',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey6',
	menu: 'back',
};
auxl.testKey7 = {
	name: 'Test Key 7',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey7',
	menu: 'back',
};
auxl.testKey8 = {
	name: 'Test Key 8',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey8',
	menu: 'back',
};
auxl.testKey9 = {
	name: 'Test Key 9',
	description: 'Just a test key.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testKey9',
	menu: 'back',
};

//Specials
auxl.testSpecial1 = {
	name: 'Test Special 1',
	description: 'Just a test special object.',
	category: 'specials',
	type: 'spawnable',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testSpecial1',
	menu: 'back',
};
auxl.testSpecial2 = {
	name: 'Test Special 2',
	description: 'Just a test special object.',
	category: 'specials',
	type: 'spawnable',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'Equip',
	params: 'testSpecial2',
	menu: 'back',
};


//
//NPC

//Key Giver
//Parent
auxl.npcKeyParentData = {
data:'npcKeyParentData',
id:'npcKeyParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0.5,1,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.npcKeyParent = auxl.Core(auxl.npcKeyParentData);
//Body
auxl.npcKeyBodyData = {
data:'npcKeyBodyData',
id:'npcKeyGiver',
sources: false,
text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6, src: auxl.pattern1, repeat: '1 1'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	['stare']:{id: 'playerRig'},
},
};
auxl.npcKeyBody = auxl.Core(auxl.npcKeyBodyData);
//Rig
auxl.npcKeyRigData = {
	parent: {core: auxl.npcKeyParent}, 
	child0: {core: auxl.npcKeyBody}, 
}
auxl.npcKeyRig = auxl.Layer('npcKeyRig',auxl.npcKeyRigData);
//Book & Pages
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
		self:{IfElse: {self:{cond: 'gridZone1Key',
		ifTrue: {
			self:{Speak:{speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline2'},},
		},ifFalse: {
			self:{Speak:{role: '???', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}, SelectJump:['Take the Key?',['Yes','timeline1'], ['No','timeline3'],],},},}}},
	},
	timeline1:{
		self:{Speak:{speech:'Here you go!'}, SetFlag: {flag: 'gridZone1Key', value: true}},
		comp:{AddToInventory: {item: auxl.gridZone1Key}},
	},
	timeline2:{
		self:{Speak:{speech:'Good luck finding where it goes!'}, Jump: {timeline: 'timeline4'},},

	},
	timeline3:{
		self:{Speak:{speech:'Oklie doklie then, I guess I will keep it for now!'}},
	},
	timeline4:{
		self:{Speak:{speech:'Now... where was that cookie I was eating?'}},
	},
	timeline5:{
		self:{Switch: {self:{cond: 'testSwitch',
			switchCond1: {
				self:{Speak:{speech:'Found it!'},SetFlag:{flag: 'testSwitch', value: 'switchCond2'},},
			},switchCond2: {
				self:{Speak:{speech:'Nom nom nom nom.'},SetFlag:{flag: 'testSwitch', value: 'switchCond3'},},
			},switchCond3: {
				self:{Speak:{speech:'That was delicious.'},SetFlag:{flag: 'testSwitch', value: 'switchCond4'},},
			},default: {
				self:{Speak:{speech:'Hmmmmm.'},SetFlag:{flag: 'testSwitch', value: 'switchCond1'},},
			},
		}}},
	},
	timeline6:{
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
//Bubble
auxl.keyGiverBubbleParentData = {
data:'keyGiverBubbleParentData',
id:'keyGiverBubbleParent',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.75, zOffset: 0.025, side: 'front', wrapCount: 30, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.8, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.45,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.keyGiverBubbleParent = auxl.Core(auxl.keyGiverBubbleParentData);
//Speech Close
auxl.keyGiverBubbleCloseData = {
data:'keyGiverBubbleCloseData',
id:'keyGiverBubbleClose',
sources:false,
text: {value:'X', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.08, height: 0.08},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.5,0.06,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.keyGiverBubbleClose = auxl.Core(auxl.keyGiverBubbleCloseData);
//Speech Reset
auxl.keyGiverBubbleResetData = {
data:'keyGiverBubbleResetData',
id:'keyGiverBubbleReset',
sources:false,
text: {value:'@', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.08, height: 0.08},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.5,-0.04,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.keyGiverBubbleReset = auxl.Core(auxl.keyGiverBubbleResetData);
//Comp Bubble Layer
auxl.keyGiverBubbleLayerData = {
	parent: {core: auxl.keyGiverBubbleParent}, 
	child0: {core: auxl.keyGiverBubbleClose}, 
	child1: {core: auxl.keyGiverBubbleReset}, 
}
auxl.keyGiverBubbleLayer = auxl.Layer('keyGiverBubbleLayer',auxl.keyGiverBubbleLayerData);
//NPC
auxl.npcKeyGiver = auxl.NPC('npcKeyGiver', auxl.npcKeyRig, auxl.npcKeyBookData, auxl.keyGiverBubbleLayer, true);
/*
//Minty NPC
auxl.npcMintyTextBubbleData = {
data:'npc text bubble on top',
id:'npcMintyTextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.7, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,1.75,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
	loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
	loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.npcMintyTextBubble = auxl.Core(auxl.npcMintyTextBubbleData);
auxl.npcMintyData = {
data:'npcMinty',
id:'npcMinty',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(-0.4,0.2,-1.1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.05,1.05,1.05),
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
auxl.npcMintyCore = auxl.Core(auxl.npcMintyData);
auxl.npcMintyPage1Data = {
	info:{
	id:'npcMintyPage1Data',
	description:'An explainer NPC to show off the AUXL system.',
	tags:'npc',
	nextPage: null,
	prevPage: null,
	timeline:'linear',
	},
	timeline0:{
	self:{Speak:{speech:'Hello and thank you for visiting!'}},
	},
	timeline1:{
	self:{Speak:{speech:'My digital name is Minty Crisp (irl you can call me Justin), it\'s nice to meet you.'}},
	},
	timeline2:{
	self:{Speak:{speech:'You can find more about me, if you are interested in supporting my work or interested in collaborating with me at mintycrisp.com .'}},
	},
	timeline3:{
	self:{Speak:{speech:'Feel free to look around!.'}},
	},
	timeline4:{
	self: {ResetBook: true},
	},
};
auxl.npcMintyIdleData = {
	info:{
		id:'npcMintyIdleData',
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
auxl.npcMintyBookTestData = {
	info:{
	id:'npcMinty',
	name:'Minty',
	description:'Minty dev NPC.',
	tags:'npc',
	timeline: 'linear',
	idleDelay: 7000,
	idleInterval: 10000,
	},
	pages:{
		page0: auxl.npcMintyPage1Data,
	},
	idle:{
		page0: auxl.npcMintyIdleData,
	},
};
auxl.npcMinty = auxl.NPC('npcMinty', auxl.npcMintyCore, auxl.npcMintyBookTestData, auxl.npcMintyTextBubble);
*/

//NPC Layer Test
auxl.testNullData = {
data:'testNullData',
id:'testNull',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1,-3),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.testNull = auxl.Core(auxl.testNullData);
auxl.test0Data = {
data:'test0Data',
id:'test0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.1,},
material: {shader: "standard", color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.test0 = auxl.Core(auxl.test0Data);
auxl.test1Data = {
data:'test1Data',
id:'test1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.test1 = auxl.Core(auxl.test1Data);
auxl.testLayerData = {
	parent: {core: auxl.testNull}, 
	child0: {
		parent: {core: auxl.test0}, 
		child0: {core: auxl.test1}, 
	}, 
}
auxl.testLayer = auxl.Layer('testLayer',auxl.testLayerData);

auxl.layerBubbleData = {
	data:'layerBubbleData',
	id:'layerBubble',
	sources:false,
	text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.75, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.8, height: 0.15},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(0.25,0.75,-0.05),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
		loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.layerPage1Data = {
	info:{
		id:'layerPage1',
		description:'Layer test page 1.',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Hey there!'},},
	},
	timeline1:{
		self:{Speak:{speech:'Having fun? Lets test adding temp controls Action 7 and 8'},},
		player:{
			UpdateActions:{actions: {action7Down:{auxlObj: 'player', func: 'SnapLeft45', name: 'Snap View Left', info: 'Quick snap your view 45 degrees to the left.'},
			action8Down:{auxlObj: 'player', func: 'SnapRight45', name: 'Snap View Right', info: 'Quick snap your view 45 degrees to the right.'},}, remove: false, tracker: 'layerNPC',},
		},
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
		self:{Speak:{speech:'Found it! And actions are gone'}},
		player:{
			UpdateActions:{actions: false, remove: true, tracker: 'layerNPC',},
		},
	},
	timeline6:{
		self: {ResetBook: true},
	},
};
auxl.layerIdleData = {
	info:{
		id:'layerIdleData',
		description:'Layer test idle page.',
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
auxl.layerBookData = {
	info:{
		id:'layerNPC',
		name: 'Layer Test',
		description:'Layer test book.',
		tags:'npc',
		timeline: 'linear',
		idleDelay: 7000,
		idleInterval: 10000,
	},
	pages:{
		page0: auxl.layerPage1Data,
	},
	idle:{
		page0: auxl.layerIdleData,
	},
};
auxl.layerBubble = auxl.Core(auxl.layerBubbleData);
auxl.layerNPC = auxl.NPC('layerNPC', auxl.testLayer, auxl.layerBookData, auxl.layerBubble);



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
	doorway:{zone: 'gridZone0', to: 'connect0'},
	hovertext:{value: 'Doorway to Scene 1',  hover: 'front', offset: 0.75, twist: true,},
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
	doorway:{zone: 'gridZone0', to: 'connect1'},
	hovertext:{value: 'Doorway to Scene 2', hover: 'top', offset: 1, twist: true,},
},
};
auxl.doorway2 = auxl.Core(auxl.doorway2Data);

//Hover Menu Test
auxl.testHoverMenuData = {
info:{
	id: 'testHoverMenu',
	buttonData: auxl.menuCylinderAltData,
	hoverData: auxl.menuHoverData,
	title: 'Test Hover Menu',
	description: 'A test hover menu for quick access.',
	layout:'circleUp',
	offset: -1,
	attached: false,
	parent: 'playerBody',
	posOffset: new THREE.Vector3(0,1.5,-2),
},
menu:{
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
			menu: 'stay',
		},
	},
	button1:{
		id: 'action2',
		style: false,
		title: 'Toggle Flashlight 2',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
	button2:{
		id: 'action3',
		style: false,
		title: 'Toggle Flashlight 3',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
	button3:{
		id: 'action4',
		style: false,
		title: 'Toggle Flashlight 4',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
	button4:{
		id: 'action5',
		style: false,
		title: 'Toggle Flashlight 5',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
	button5:{
		id: 'action6',
		style: false,
		title: 'Toggle Flashlight 6',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
	button6:{
		id: 'action7',
		style: false,
		title: 'Toggle Flashlight 7',
		description: 'Turn On/Off your flashlight.',
		subMenu: false,
		action: {
			auxlObj: 'player',
			component: false,
			method: 'ToggleFlashlight',
			params: null,
			menu: 'stay',
		},
	},
},
};
auxl.testHoverMenu = auxl.HoverMenu(auxl.testHoverMenuData);

//
//CastRay
auxl.castRay0Data = {
data:'castRay0Data',
id:'castRay0',
sources:false,
text: {value:'A', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 24, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#d31d9b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#d31d9b", emissiveIntensity: 0.4, side: 'double',  },
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.castRay0 = auxl.Core(auxl.castRay0Data);


/*
['red','orange','yellow','lime','blue','cyan','magenta','maroon','olive','green','purple','teal','navy','silver','grey','black','white']
*/

auxl.cube3x3x3Data = {
data:'cube3x3x3Data',
id:'cube3x3x3',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.57, height: 0.57, depth: 0.57,},
material: {shader: "standard", color: "#571442", opacity: 0.9, metalness: 0.2, roughness: 0.8, emissive: "#571442", emissiveIntensity: 0.4, side: 'back', wireframe: true, wireframeLinewidth: 2},
position: new THREE.Vector3(0,1,6),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
start:{property: 'object3D.rotation.y', from: 0, to: 0, dur: 0, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
spin0:{property: 'object3D.rotation.x', from: 0, to: 360, dur: 3000, delay: 0, loop: '2', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__start, animationcomplete__spin2'},
spin1:{property: 'object3D.rotation.y', from: 0, to: 360, dur: 3000, delay: 0, loop: '2', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__spin0'},
spin2:{property: 'object3D.rotation.z', from: 0, to: 360, dur: 3000, delay: 0, loop: '2', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__spin1'},


},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.cube3x3x3 = auxl.Core(auxl.cube3x3x3Data);
 
let cube3x0Color = auxl.ColorTheoryGen();
auxl.cube3x0Data = {
data:'cube3x0Data',
id:'cube3x0',
sources:false,
text: {value:'A', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'box', width: 0.16, height: 0.16, depth: 0.16},
material: {shader: "standard", color: cube3x0Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x0Color.base, emissiveIntensity: 0.4, side: 'double',  },
position: new THREE.Vector3(0,0,0.185),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.cube3x0 = auxl.Core(auxl.cube3x0Data);


//cube3x1
let cube3x1Color = auxl.ColorTheoryGen();
auxl.cube3x1Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x1',
	position: new THREE.Vector3(0.185,0,0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x1Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x1Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x1 = auxl.Core(auxl.cube3x1Data);


//cube3x2
let cube3x2Color = auxl.ColorTheoryGen();
auxl.cube3x2Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x2',
	position: new THREE.Vector3(-0.185,0,0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x2Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x2Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x2 = auxl.Core(auxl.cube3x2Data);



//cube3x3
let cube3x3Color = auxl.ColorTheoryGen();
auxl.cube3x3Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x3',
	position: new THREE.Vector3(0,0.185,0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x3Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x3Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x3 = auxl.Core(auxl.cube3x3Data);

//cube3x4
let cube3x4Color = auxl.ColorTheoryGen();
auxl.cube3x4Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x4',
	position: new THREE.Vector3(0.185,0.185,0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x4Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x4Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x4 = auxl.Core(auxl.cube3x4Data);


//cube3x5
let cube3x5Color = auxl.ColorTheoryGen();
auxl.cube3x5Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x5',
	position: new THREE.Vector3(-0.185,0.185,0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x5Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x5Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x5 = auxl.Core(auxl.cube3x5Data);


//cube3x6
let cube3x6Color = auxl.ColorTheoryGen();
auxl.cube3x6Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x6',
	position: new THREE.Vector3(0,-0.185,0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x6Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x6Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x6 = auxl.Core(auxl.cube3x6Data);

//cube3x7
let cube3x7Color = auxl.ColorTheoryGen();
auxl.cube3x7Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x7',
	position: new THREE.Vector3(0.185,-0.185,0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x7Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x7Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x7 = auxl.Core(auxl.cube3x7Data);


//cube3x8
let cube3x8Color = auxl.ColorTheoryGen();
auxl.cube3x8Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x8',
	position: new THREE.Vector3(-0.185,-0.185,0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x8Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x8Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x8 = auxl.Core(auxl.cube3x8Data);


//cube3x9
let cube3x9Color = auxl.ColorTheoryGen();
auxl.cube3x9Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x9',
	position: new THREE.Vector3(0.185,0,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x9Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x9Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x9 = auxl.Core(auxl.cube3x9Data);




//cube3x1
let cube3x10Color = auxl.ColorTheoryGen();
auxl.cube3x10Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x10',
	position: new THREE.Vector3(0.185,0,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x10Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x10Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x10 = auxl.Core(auxl.cube3x10Data);


//cube3x11
let cube3x11Color = auxl.ColorTheoryGen();
auxl.cube3x11Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x11',
	position: new THREE.Vector3(-0.185,0,0),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x11Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x11Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x11 = auxl.Core(auxl.cube3x11Data);



//cube3x12
let cube3x12Color = auxl.ColorTheoryGen();
auxl.cube3x12Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x12',
	position: new THREE.Vector3(0,0.185,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x12Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x12Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x12 = auxl.Core(auxl.cube3x12Data);

//cube3x13
let cube3x13Color = auxl.ColorTheoryGen();
auxl.cube3x13Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x13',
	position: new THREE.Vector3(0.185,0.185,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x13Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x13Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x13 = auxl.Core(auxl.cube3x13Data);


//cube3x14
let cube3x14Color = auxl.ColorTheoryGen();
auxl.cube3x14Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x14',
	position: new THREE.Vector3(-0.185,0.185,0),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x14Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x14Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x14 = auxl.Core(auxl.cube3x14Data);


//cube3x15
let cube3x15Color = auxl.ColorTheoryGen();
auxl.cube3x15Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x15',
	position: new THREE.Vector3(0,-0.185,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x15Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x15Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x15 = auxl.Core(auxl.cube3x15Data);

//cube3x16
let cube3x16Color = auxl.ColorTheoryGen();
auxl.cube3x16Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x16',
	position: new THREE.Vector3(0.185,-0.185,0),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x16Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x16Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x16 = auxl.Core(auxl.cube3x16Data);


//cube3x17
let cube3x17Color = auxl.ColorTheoryGen();
auxl.cube3x17Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x17',
	position: new THREE.Vector3(-0.185,-0.185,0),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x17Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x17Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x17 = auxl.Core(auxl.cube3x17Data);
 

//cube3x18
let cube3x18Color = auxl.ColorTheoryGen();
auxl.cube3x18Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x18',
	position: new THREE.Vector3(0.185,0,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x18Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x18Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x18 = auxl.Core(auxl.cube3x18Data);




//cube3x19
let cube3x19Color = auxl.ColorTheoryGen();
auxl.cube3x19Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x19',
	position: new THREE.Vector3(0,0,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x19Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x19Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x19 = auxl.Core(auxl.cube3x19Data);


//cube3x20
let cube3x20Color = auxl.ColorTheoryGen();
auxl.cube3x20Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x20',
	position: new THREE.Vector3(-0.185,0,-0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x20Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x20Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x20 = auxl.Core(auxl.cube3x20Data);



//cube3x21
let cube3x21Color = auxl.ColorTheoryGen();
auxl.cube3x21Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x21',
	position: new THREE.Vector3(0,0.185,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x21Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x21Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x21 = auxl.Core(auxl.cube3x21Data);

//cube3x22
let cube3x22Color = auxl.ColorTheoryGen();
auxl.cube3x22Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x22',
	position: new THREE.Vector3(0.185,0.185,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x22Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x22Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x22 = auxl.Core(auxl.cube3x22Data);


//cube3x23
let cube3x23Color = auxl.ColorTheoryGen();
auxl.cube3x23Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x23',
	position: new THREE.Vector3(-0.185,0.185,-0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x23Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x23Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x23 = auxl.Core(auxl.cube3x23Data);


//cube3x24
let cube3x24Color = auxl.ColorTheoryGen();
auxl.cube3x24Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x24',
	position: new THREE.Vector3(0,-0.185,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x24Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x24Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x24 = auxl.Core(auxl.cube3x24Data);

//cube3x25
let cube3x25Color = auxl.ColorTheoryGen();
auxl.cube3x25Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x25',
	position: new THREE.Vector3(0.185,-0.185,-0.185),
text: {value:'B', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x25Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x25Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x25 = auxl.Core(auxl.cube3x25Data);


//cube3x26
let cube3x26Color = auxl.ColorTheoryGen();
auxl.cube3x26Data = auxl.CoreDataFromTemplate(auxl.cube3x0Data, {
	id: 'cube3x26',
	position: new THREE.Vector3(-0.185,-0.185,-0.185),
text: {value:'C', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
material: {shader: "standard", color: cube3x26Color.base, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: cube3x26Color.base, emissiveIntensity: 0.4, side: 'double',  },

}, true);
auxl.cube3x26 = auxl.Core(auxl.cube3x26Data);




auxl.cube3x3x3LayerData = {
	parent: {core: auxl.cube3x3x3}, 
	//Front Most Layer
	child0: {core: auxl.cube3x0}, 
	child1: {core: auxl.cube3x1}, 
	child2: {core: auxl.cube3x2}, 
	child3: {core: auxl.cube3x3}, 
	child4: {core: auxl.cube3x4}, 
	child5: {core: auxl.cube3x5}, 
	child6: {core: auxl.cube3x6}, 
	child7: {core: auxl.cube3x7}, 
	child8: {core: auxl.cube3x8},
	child9: {core: auxl.cube3x9},
	child10: {core: auxl.cube3x10},
	child11: {core: auxl.cube3x11},
	child12: {core: auxl.cube3x12},
	child13: {core: auxl.cube3x13},
	child14: {core: auxl.cube3x14},
	child15: {core: auxl.cube3x15},
	child16: {core: auxl.cube3x16},
	child17: {core: auxl.cube3x17},
	child18: {core: auxl.cube3x18},
	child19: {core: auxl.cube3x19},
	child20: {core: auxl.cube3x20},
	child21: {core: auxl.cube3x21},
	child22: {core: auxl.cube3x22},
	child23: {core: auxl.cube3x23},
	child24: {core: auxl.cube3x24},
	child25: {core: auxl.cube3x25},
	child26: {core: auxl.cube3x26},

}

auxl.cube3x3x3Layer = auxl.Layer('cube3x3x3Layer',auxl.cube3x3x3LayerData);



/*
auxl.testLayerData = {
	parent: {core: auxl.cube3x3x3}, 
	child0: {
		parent: {core: auxl.test0}, 
		child0: {core: auxl.test1}, 
	}, 
}
*/
//
//Mouse Sphere
auxl.mouseSphereParentData = {
data:'mouseSphereParentData',
id:'mouseSphereParent',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 0.22,},
material: {shader: "standard", color: "#ffffff", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 0.75},
position: new THREE.Vector3(0,1.4,2),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.mouseSphereParent = auxl.Core(auxl.mouseSphereParentData);

//
//Pin Base
auxl.pinBaseData = {
data:'pinBaseData',
id:'pinBase',
sources:false,
text: false,
geometry: {primitive: 'cone', height:0.25, radiusBottom:0, radiusTop: 0.05, segmentsHeight:2, segmentsRadial:16, openEnded:false, side:'double', thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#e29c00", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#e29c00", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0.125,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent',],
components: false,
};
auxl.pinBase = auxl.Core(auxl.pinBaseData);

auxl.pinTopData = {
data:'pinTopData',
id:'pinTop',
sources:false,
text: {value:'W', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.001, side: 'double', align: "center", baseline: 'center', width: 0.15},
geometry: {primitive: 'circle', radius: 0.05, segments: 24, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#982373", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#982373", emissiveIntensity: 0.4, side: 'double',},
position: new THREE.Vector3(0,0.125,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['a-ent', 'clickable'],
components: false,
};
auxl.pinTop = auxl.Core(auxl.pinTopData);

//Pin0
auxl.pinBase0Data = auxl.CoreDataFromTemplate(auxl.pinBaseData
, {
id: 'pinBase0',
rotation: new THREE.Vector3(0,0,45),
}, true);
auxl.pinBase0 = auxl.Core(auxl.pinBase0Data);

//Pin0
auxl.pin0TopData = auxl.CoreDataFromTemplate(auxl.pinTopData, {
id: 'pinTop0',
text: {value:'Q', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.001, side: 'double', align: "center", baseline: 'center', width: 0.05},
material: {shader: "standard", color: "#982373", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#982373", emissiveIntensity: 0.4, side: 'double',},
}, true);
auxl.pinTop0 = auxl.Core(auxl.pin0TopData);

//Pin1
auxl.pinBase1Data = auxl.CoreDataFromTemplate(auxl.pinBaseData
, {
id: 'pinBase1',
rotation: new THREE.Vector3(0,0,0),
}, true);
auxl.pinBase1 = auxl.Core(auxl.pinBase1Data);

//Pin1
auxl.pineTop1Data = auxl.CoreDataFromTemplate(auxl.pinTopData, {
id: 'pinTop1',
text: {value:'W', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.001, side: 'double', align: "center", baseline: 'center', width: 0.05},
material: {shader: "standard", color: "#2990be", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2990be", emissiveIntensity: 0.4, side: 'double',},
}, true);
auxl.pinTop1 = auxl.Core(auxl.pineTop1Data);




//Pin2
auxl.pinBase2Data = auxl.CoreDataFromTemplate(auxl.pinBaseData
, {
id: 'pinBase2',
rotation: new THREE.Vector3(0,0,-45),
}, true);
auxl.pinBase2 = auxl.Core(auxl.pinBase2Data);

//Pin2
auxl.pineTo2Data = auxl.CoreDataFromTemplate(auxl.pinTopData, {
id: 'pinTop2',
text: {value:'E', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.001, side: 'double', align: "center", baseline: 'center', width: 0.05},
material: {shader: "standard", color: "#40be29", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#40be29", emissiveIntensity: 0.4, side: 'double',},
}, true);
auxl.pinTop2 = auxl.Core(auxl.pineTo2Data);





auxl.mouseSphereLayerData = {
	parent: {core: auxl.mouseSphereParent}, 
	child0: {
		parent: {core: auxl.pinBase0}, 
		child0: {core: auxl.pinTop0},
	},
	child1: {
		parent: {core: auxl.pinBase1}, 
		child0: {core: auxl.pinTop1},
	},
	child2: {
		parent: {core: auxl.pinBase2}, 
		child0: {core: auxl.pinTop2},
	},
}

auxl.mouseSphereLayer = auxl.Layer('mouseSphereLayer',auxl.mouseSphereLayerData);





//Mouse Sphere
auxl.keyboardParentData = {
data:'keyboardParentData',
id:'keyboardParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.keyboardParent = auxl.Core(auxl.keyboardParentData);

//key 0
auxl.key0Data = auxl.CoreDataFromTemplate(auxl.pinTopData, {
id: 'key0',
text: {value:'Q', wrapCount: 3, color: "#FFFFFF", font: "exo2bold", zOffset: 0.001, side: 'double', align: "center", baseline: 'center', width: 0.05},
material: {shader: "standard", color: "#982373", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#982373", emissiveIntensity: 0.4, side: 'double',},
position: new THREE.Vector3(-1,1,1),
rotation: new THREE.Vector3(0,0,0),

}, true);
auxl.key0 = auxl.Core(auxl.key0Data);


auxl.keyboardLayerData = {
	parent: {core: auxl.keyboardParent}, 
	child0: {core: auxl.key0},
}

auxl.keyboardLayer = auxl.Layer('keyboardLayer',auxl.keyboardLayerData);


//Main Menu Additions
auxl.addToMainMenu = {
	menu0: {
		id: 'testMenu',
		style: false,
		title: 'Test',
		description: 'A test menu to add to main menu',
		subMenu: 'testing',
		action: false,
	},
	testing:{
		button1:{
			id: 'action1',
			style: false,
			title: 'Test 1',
			description: 'Test action 1',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 1',
				menu: 'close',
			},
		},
		button2:{
			id: 'action2',
			style: false,
			title: 'Test 2',
			description: 'Test action 2',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 2',
				menu: 'close',
			},
		},
		button3:{
			id: 'action3',
			style: false,
			title: 'Test 3',
			description: 'Test action 3',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 3',
				menu: 'close',
			},
		},
		button4:{
			id: 'action4',
			style: false,
			title: 'Test 4',
			description: 'Test action 4',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 4',
				menu: 'close',
			},
		},
		button5:{
			id: 'action5',
			style: false,
			title: 'Test 5',
			description: 'Test action 5',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 5',
				menu: 'close',
			},
		},
	},
};
//Main Menu Style
auxl.menuStyleData = {
data:'menuStyleData',
id:'menuStyle',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center', opacity: 0.9},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#2694ce", opacity: 0.9, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};


//Combo Lock Test
auxl.testUnlock = {
	cursorObj: 'player',
	component: 'null',
	method: 'TestFunc',
	params: 'Unlock Run',
};
auxl.testLock = auxl.ComboLock('testLock', ['0','1','2','3','4'], ['4','3','2','1','0'], auxl.testUnlock, new THREE.Vector3(3,1.5,-2.5));

//Scroll Menu Test
auxl.testScroll = auxl.ScrollMenu('testScroll');



//
//Cards

//Card Test 0
auxl.cardTest0Data = {
	id: 'cardTest0',
	title: 'Card Test #0',
	position: new THREE.Vector3(1,1.6,-2.5),
	rotation: new THREE.Vector3(0,-30,0),
	scale: new THREE.Vector3(0.2,0.2,0.2),
	colors: auxl.ColorTheoryGen(false, 'red'),
}
auxl.cardTest0 = auxl.Card(auxl.cardTest0Data)

//Card Test 1
auxl.cardTest1Data = {
	id: 'cardTest1',
	title: 'Card Test #1',
	position: new THREE.Vector3(-1,1.6,-2.5),
	rotation: new THREE.Vector3(0,30,0),
	scale: new THREE.Vector3(0.2,0.2,0.2),
	colors: auxl.ColorTheoryGen(false, 'green'),
}
auxl.cardTest1 = auxl.Card(auxl.cardTest1Data)

//Build Scene Library Objects
auxl.buildGridLibrary = () => {

auxl.ghostCollision = auxl.Layer('ghostCollision', auxl.ghostCollisionData);
auxl.ghostCollision.GridPath({route: 'any', loop: 'infinite', speed:1000, wait:500, patience: 3, type: 'anim', path:[{z:-2,x:2,}, {z:2,x:-2,},]});

//Testing
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
auxl.emoticonTesting = auxl.InfoBubble('emoticonTesting', auxl.coreEventTesting, false, 'yellow');
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

auxl.build = auxl.BuildIn3D();
auxl.testCubeCore = auxl.Core(auxl.testCubeCoreData);
auxl.cubeCore = auxl.Core(auxl.cubeCoreData);
auxl.switchCube = auxl.Core(auxl.switchCubeData);
//Floor
auxl.floor = auxl.Core(auxl.floorData);
auxl.floor1 = auxl.Core(auxl.floor1Data);
//Ceiling
auxl.indoorCeiling = auxl.Core(auxl.indoorCeilingData);
//Clouds
auxl.cloudsParent = auxl.Core(auxl.cloudsParentData);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloud2 = auxl.Core(auxl.cloud2Data);
auxl.cloud3 = auxl.Core(auxl.cloud3Data);
auxl.clouds = auxl.Layer('clouds',auxl.cloudLayerData);
//Environment
auxl.basicRing = auxl.ObjsGenRing(auxl.basicRingData);
auxl.biome = auxl.MultiAssetGen(auxl.biomeData);
auxl.hills = auxl.Horizon(auxl.hillsData);
auxl.indoorWall = auxl.Horizon(auxl.indoorWallData);
//NPCs
//Key Giver
auxl.npcKeyBody = auxl.Core(auxl.npcKeyBodyData);
auxl.keyGiverBubbleParent = auxl.Core(auxl.keyGiverBubbleParentData);
auxl.keyGiverBubbleClose = auxl.Core(auxl.keyGiverBubbleCloseData);
auxl.keyGiverBubbleReset = auxl.Core(auxl.keyGiverBubbleResetData);
auxl.keyGiverBubbleLayer = auxl.Layer('keyGiverBubbleLayer',auxl.keyGiverBubbleLayerData);
auxl.npcKeyGiver = auxl.NPC('npcKeyGiver', auxl.npcKeyRig, auxl.npcKeyBookData, auxl.keyGiverBubbleLayer, true);
//Minty
auxl.npcMintyTextBubble = auxl.Core(auxl.npcMintyTextBubbleData);
auxl.npcMintyCore = auxl.Core(auxl.npcMintyData);
auxl.npcMinty = auxl.NPC('npcMinty', auxl.npcMintyCore, auxl.npcMintyBookTestData, auxl.npcMintyTextBubble);
//Layer NPC Test
auxl.testNull = auxl.Core(auxl.testNullData);
auxl.test0 = auxl.Core(auxl.test0Data);
auxl.test1 = auxl.Core(auxl.test1Data);
auxl.testLayer = auxl.Layer('testLayer',auxl.testLayerData);
auxl.layerBubble = auxl.Core(auxl.layerBubbleData);
//auxl.layerNPC = auxl.NPC('layerNPC', auxl.testLayer, auxl.layerBookData, auxl.layerBubble);

//Doorways
auxl.doorway1 = auxl.Core(auxl.doorway1Data);
auxl.doorway2 = auxl.Core(auxl.doorway2Data);

}
auxl.ToBeRebuilt('buildGridLibrary');

},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('grid-scenes', {
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
auxl.gridZone0Data = {
	info:{
		id: 'gridZone0',
		name: 'gridZone0',
		zoneNum: 0,
		start: 'gridZone0Scene0',
		travelMenu: true,
	},
	controls:{

	},
	start:{
		switchCube:{SpawnCore:null},
		cubeCore:{SpawnCore:null},
		//creatureTesting1:{SpawnCreature:null},
		//creatureTesting2:{SpawnCreature:null},
		faceTest:{SpawnLayer:null},
	},
	delay:{
		30000:{
			cubeCore:{SetFlag:{flag: 'stopIntervalVar', value: true},},
		},
		60000:{
			player:{Notification: {message:'1 Minute'}},
		},
	},
	interval:{
		6000: {
			run: {cubeCore:{EmitEvent: 'swapEvent'},}, loop: 'infinite', end: 'stopIntervalVar',
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
		player:{TestFunc: 'exiting zone',},
	},
};
//Zone 0 Scene 0
auxl.gridZone0Scene0Data = {
	info:{
		id:'gridZone0Scene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: true,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 64,
			height: {top: 10, bottom: 4},
			edge: true,
			spawnEdge: true,
			edgeUpdate: false,
		},
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{

	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#1e7e5d", emissive: "#1e7e5d",},}},
		//biome:{SpawnMultiAsset:null},
		hills:{SpawnHorizon:null},
		coreEventTesting:{SpawnCore:null},
		chest1:{SpawnCore:null},
		use1:{SpawnCore:null},
		doorway1:{SpawnCore:null},
		doorway2:{SpawnCore:null},

		layerDupeTest:{SpawnLayer:null},
		layerTest:{SpawnLayer:null},

		collisionTest1:{SpawnCoreOnGrid:null},
		collisionTest2:{SpawnCoreOnGrid:null},
		collisionTest3:{SpawnCoreOnGrid:null},
		collisionTest4:{SpawnCoreOnGrid:null, WalkPath:null},
		collisionTest5:{SpawnCoreOnGrid:null},
		collisionTest6:{SpawnCoreOnGrid:null},
		collisionTest7:{SpawnCoreOnGrid:null},
		collisionTest8:{SpawnCoreOnGrid:null},
		collisionTest9:{SpawnCoreOnGrid:null},
		collisionTest10:{SpawnCoreOnGrid:null},
		collisionTest11:{SpawnCoreOnGrid:null},
		gate1:{SpawnGate:null},
		GridTriggerTest1:{SpawnCoreOnGrid:null},
		GridTriggerTest2:{SpawnCoreOnGrid:null},
		//ghostCollision:{SpawnLayerOnGrid:null, WalkPath: null},
		testGrid2:{SpawnGridLayout:'grid1'},
		//layerNPC:{SpawnNPC:null},
	},
	delay:{
		3000:{
			switchCube:{EmitEvent:'emote1'},
			//skyBox0:{SetTime: 10},
		},
		4000:{
			coreEventTesting:{EmitEvent:'test'},
			cubeCore:{EmitEvent:'alert2'},
			//player:{ChangeLocomotionType:{pov: '1st', axis: 'posXYZ', type: 'free'}},
		},
		5000:{
			comp:{SetFlag:{flag: 'test', value: true}},
			coreEventTesting:{EmitEvent:'alert1'},
			//ghostCollision:{DespawnLayer:null},
		},
/*
		8000:{
			player:{ChangeLocomotionType:{pov: '1st', axis: 'posXZ', type: 'free'}},
		},
*/
		10000:{
			collisionTest9:{DespawnCore:null},
		},
		30000:{
			collisionTest6:{DespawnCore:null},
		},

	},
	interval:{
		5000: {
			run: {switchCube:{EmitEvent: 'switchEvent'},}, loop: 'infinite'
		},
	},
	event:{
		switchEvent: {
			switchCube:{Switch: {switchCube:{cond: 'testSwitch',
				switchCond1: {
					switchCube:{EmitEvent: 'switch1',SetFlag:{flag: 'testSwitch', value: 'switchCond2'},},
				},switchCond2: {
					switchCube:{EmitEvent: 'switch2',SetFlag:{flag: 'testSwitch', value: 'switchCond3'},},
				},switchCond3: {
					switchCube:{EmitEvent: 'switch3',SetFlag:{flag: 'testSwitch', value: 'switchCond4'},},
				},default: {
					switchCube:{EmitEvent: 'switch4',SetFlag:{flag: 'testSwitch', value: 'switchCond1'},},
				},
			}}},
		},
		switch1: {
			switchCube: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
		},
		switch2: {
			switchCube: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
		},
		switch3: {
			switchCube: {ChangeSelf: {property: 'material', value: {color: '#e6ca2f', emissive: '#e6ca2f'}}},
		},
		switch4: {
			switchCube: {ChangeSelf: {property: 'material', value: {color: '#e62f59', emissive: '#e62f59'}}},
		},
	},
	interaction:{
		mouseenter:{
			coreEventTesting:{EmitEvent:'alert'},
		},
	},
	exit:{
		player:{TestFunc: 'exiting scenario',},
	},
};
//Zone 0 Scene 1
auxl.gridZone0Scene1Data = {
	info:{
		id:'gridZone0Scene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
		fog: false,
		map: {
			size: 38,
			height: false,
			edge: true,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
/*
		action1Down:{auxlObj: 'player', func: 'TestFunc', params: {test1: 1, test2: 2}, name: 'Test Action', info: 'Just a Dev test function.'},
*/
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
};
//Zone 0 Scene 0
auxl.gridZone0Scene0 = auxl.SceneNode(auxl.gridZone0Scene0Data);
//Zone 0 Scene 1
auxl.gridZone0Scene1 = auxl.SceneNode(auxl.gridZone0Scene1Data);
//Map Zone 0
auxl.gridZone0 = auxl.MapZone(auxl.gridZone0Data);

//
//Zone 1
auxl.gridZone1Data = {
	info:{
		id: 'gridZone1',
		name: 'gridZone1',
		zoneNum: 0,
		start: 'gridZone1Scene0',
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
auxl.gridZone1Scene0Data = {
	info:{
		id:'gridZone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
		fog: {type: 'exponential', color: '#AAA', density: 0.05},
		map: {
			size: 100,
			height: {top: 20, bottom: 0},
			edge: false,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:[{property: 'material', value: {src: auxl.pattern80, repeat: '150 150',color: "#21679a", emissive: "#21679a",},},{property: 'position', value: new THREE.Vector3(0,0,0),}, {property:'raycast-teleportation', value: null}],},
		basicRing:{SpawnObjRing:null},
		testGrid2:{SpawnGridLayout:'grid2'},
		//build:{SpawnBuild:null},
		testLock:{SpawnComboLock:null},
		//testScroll:{SpawnScrollMenu:null},
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
		testLock:{DespawnComboLock:null},
		//testScroll:{DespawnScrollMenu:null}
		floor:{RemoveComponent:'raycast-teleportation'},
	},
};
//Zone 1 Scene 0
auxl.gridZone1Scene0 = auxl.SceneNode(auxl.gridZone1Scene0Data);
//Zone 1
auxl.gridZone1 = auxl.MapZone(auxl.gridZone1Data);

//
//Scenarios

//
//Testing Scenario
auxl.gridScenario0Data = {
	info:{
		id: 'gridScenario0',
		name: 'Grid Scenario',
		scenarioNum: 0,
		startZone: 'gridZone0',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	
	map:{
		gridZone0:{
			gridZone0Scene0:{
				connect0: {inZone: true, node: 'gridZone0Scene1',},
				connect1: {inZone: 'gridZone1', node: 'gridZone1Scene0', locked: true, keyId: 'gridZone1Key', keyName: 'Zone 1 Key', keepKey: true},
			},
			gridZone0Scene1:{
				connect0: {inZone: true, node: 'gridZone0Scene0',},
			},
		},
		gridZone1:{
			gridZone1Scene0:{
				connect0: {inZone: 'gridZone0', node: 'gridZone0Scene0',},
			},
		},
	},
	controls:{

		//
		//Default Player Controls
		action1Down:{auxlObj: 'player', func: 'ToggleCrouch', name: 'Toggle Crouch/Stand', info: 'Toggle Crouch or Stand mode.'},
		//Hover Menu Test
		action2Down:{auxlObj: 'testHoverMenu', func: 'SpawnHoverMenu', name: 'Open Test Hover Menu', info: 'Show the test hover menu selections.'},
		action2Up:{auxlObj: 'testHoverMenu', func: 'DespawnHoverMenu', params: 'false',name: 'Confirm Test Hover Menu', info: 'Confirm hover menu selection or close.'},
		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		//build:{SpawnBuild: null},
		floor:{SpawnCore: null},
		clouds:{SpawnLayer: null},
		cube3x3x3Layer:{SpawnLayer: null},


		cardTest0:{SpawnCard: null},
		cardTest1:{SpawnCard: null},

		//mouseSphereLayer:{SpawnLayer: null},
		//keyboardLayer:{SpawnLayer: null},
		player:{Freeze:null, UpdatePlayerPosition: new THREE.Vector3(0,0,1.5), TwistTo: 0},
	},
	delay:{
		100:{
			skyBox0:{DayNightCycle: null},
		},
		500:{
			//comp:{SpawnComp: null,},
			comp:{SpawnComp: null, AddToInventory:{item:[ auxl.testItem1, auxl.testItem2, auxl.flashlightTool, auxl.testTool1, auxl.testTool2, auxl.testKey1, auxl.testKey2, auxl.testKey3, auxl.testKey4, auxl.testKey5, auxl.testKey6, auxl.testKey7, auxl.testKey8, auxl.testKey9, auxl.testSpecial1, auxl.testSpecial2,], hide: true}},
		},
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
		player:{TestFunc: 'exiting scenario',},
	},
};
auxl.gridScenario0 = auxl.Scenario(auxl.gridScenario0Data);

//
//Testing World
auxl.gridWorldData = {
	info:{
		id: 'gridWorld',
		name: 'Grid World',
		description: 'A world containing various test scenarios.',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: true,
		collision: true,
		//physics: 'ammo',
		physics: false,
		menuStyle: auxl.menuStyleData,
		menuOptions: auxl.addToMainMenu,
	},
	scenarios:[
		auxl.gridScenario0,
	],
};
auxl.gridWorld = auxl.World(auxl.gridWorldData);
auxl.gridWorld.SetAsDefault();

//
//System Loaded
auxl.SystemLoaded();
console.log({msg: 'demo grid world loaded', world: auxl.gridWorld})

    },
});