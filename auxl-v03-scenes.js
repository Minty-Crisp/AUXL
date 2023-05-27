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


//Core Duplicating Testing
//auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest', position: new THREE.Vector3(0,3,-1)});


//auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest2', position: new THREE.Vector3(-2,3,-1)});
//auxl.coreDupeTest2 = auxl.coreFromTemplate(auxl.coreDupeTest,{id: 'coreDupeTest2', position: new THREE.Vector3(-2,3,-1)}, true);
//auxl.coreDupeTest2.SpawnCore();

/*
auxl.layerDupeTestData = {
	parent: {core: auxl.coreDupeTest}, 
	child0: {core: auxl.coreDupeTest2}, 
}
auxl.layerDupeTest = auxl.Layer('layerDupeTest',auxl.layerDupeTestData);
auxl.layerDupeTest.SpawnLayer();
*/

//Assign Core Duplication
auxl.coreDupeTestAssign = auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTestAssign', position: new THREE.Vector3(-2,2,-1)}, true);
auxl.coreDupeTestAssign.SpawnCore();


//Individual Core Duplication from Template
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest', position: new THREE.Vector3(0,3,-1)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest2', position: new THREE.Vector3(-2,3,-1)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest3', position: new THREE.Vector3(-2,3,-1)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest4', position: new THREE.Vector3(-2,3,-1)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest5', position: new THREE.Vector3(-2,3,-1)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest6', position: new THREE.Vector3(-1,2,-2)});
auxl.coreFromTemplate(auxl.eventTesting,{id: 'coreDupeTest7', position: new THREE.Vector3(-1,2,-2)});

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
auxl.layerDupeTest.SpawnLayer();

//Layer Duplication from Template
auxl.layerFromTemplate(auxl.layerDupeTest, 'layerDupeTest', {position: new THREE.Vector3(0,3,-6)});
auxl.layerDupeTestCopy0.SpawnLayer();


//Collision Spawn Testing
auxl.collisionTest1 = auxl.coreFromTemplate(auxl.eventTesting,{id: 'collisionTest1', geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0.5,0)}, true);
auxl.collisionTest1.SpawnOnGrid({start:{x:0, z:-2}, end: {x:0, z:-2}, collide: true});


auxl.collisionTest2 = auxl.coreFromTemplate(auxl.eventTesting,{id: 'collisionTest2', geometry: {primitive: 'box', depth: 0.5, width: 1, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0.5,0)}, true);
auxl.collisionTest2.SpawnOnGrid({start:{x:0, z:3}, end: {x:0.5, z:3}, collide: true});

auxl.collisionTest3 = auxl.coreFromTemplate(auxl.eventTesting,{id: 'collisionTest3', geometry: {primitive: 'box', depth: 2.5, width: 0.5, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0.5,0)}, true);
auxl.collisionTest3.SpawnOnGrid({start:{x:3, z:0}, end: {x:3, z:2}, collide: true});


auxl.collisionTest4 = auxl.coreFromTemplate(auxl.eventTesting,{id: 'collisionTest4', geometry: {primitive: 'box', depth: 2, width: 2, height: 1}, material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#39a54a", emissive: '#39a54a', emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(0,0.5,0), grid: {start:{x:-5, z:-2}, end: {x:-3.5, z:-0.5}, collide: true}}, true);
//auxl.collisionTest4.SpawnOnGrid({start:{x:-5, z:-2}, end: {x:-3.5, z:-0.5}, collide: true});
auxl.collisionTest4.SpawnOnGrid();



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
position: new THREE.Vector3(0,5,-3),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
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
auxl.faceEye2SocketData = auxl.coreDataFromTemplate(auxl.faceEye1SocketData, {id: 'faceEye2Socket', position: new THREE.Vector3(0.15,0.1,0.4)}, true);
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
auxl.faceEye2PupilData = auxl.coreDataFromTemplate(auxl.faceEye1PupilData, {id: 'faceEye2Pupil',}, true);
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
auxl.faceEyebrow2Data = auxl.coreDataFromTemplate(auxl.faceEyebrow1Data, {id: 'faceEyebrow2', rotation: new THREE.Vector3(0,-10,0)}, true);
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
auxl.faceEye2LidOffsetData = auxl.coreDataFromTemplate(auxl.faceEye1LidOffsetData, {id: 'faceEye2LidOffset'}, true);
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
auxl.faceEye2LidData = auxl.coreDataFromTemplate(auxl.faceEye1LidData, {id: 'faceEye2Lid'}, true);
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
auxl.faceEye2BlinkData = auxl.coreDataFromTemplate(auxl.faceEye1BlinkData, {id: 'faceEye2Blink'}, true);
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
auxl.faceEar2OffsetData = auxl.coreDataFromTemplate(auxl.faceEar1OffsetData, {id: 'faceEar2Offset', position: new THREE.Vector3(0.25,0.5,0.4)}, true);
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
auxl.faceEar2Data = auxl.coreDataFromTemplate(auxl.faceEar1Data, {id: 'faceEar2', rotation: new THREE.Vector3(0,-30,0), animations:{twitch: {property: 'object3D.rotation.y', from: -25, to: -35, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},}}, true);
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
auxl.cloud1Data = auxl.coreDataFromTemplate(auxl.cloudData, {id: 'cloud1', position: new THREE.Vector3(-150,200,-300), scale: new THREE.Vector3(1,0.25,0.75)}, true);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloud2Data = auxl.coreDataFromTemplate(auxl.cloudData, {id: 'cloud2', position: new THREE.Vector3(-150,200,200), scale: new THREE.Vector3(1,0.25,0.75)}, true);
auxl.cloud2 = auxl.Core(auxl.cloud2Data);
auxl.cloud3Data = auxl.coreDataFromTemplate(auxl.cloudData, {id: 'cloud3', position: new THREE.Vector3(100,200,0), scale: new THREE.Vector3(0.5,0.5,0.25)}, true);
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
};

//Tools
auxl.flashlightTool = {
	name: 'Toggle Flashlight',
	description: 'Turn On/Off your flashlight.',
	category: 'items',
	type: 'use',
	persist: 'permenant',
	amount: false,
	style: false,
	action: true,
	auxlObj: 'player',
	component: false,
	method: 'ToggleFlashlight',
	params: 'close'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
};

//Keys
auxl.zone1Key = {
	name: 'Zone 1 Key',
	id: 'zone1Key',
	description: 'A Key to unlock Zone 1.',
	category: 'keys',
	type: 'passive',
	persist: 'permenant',
	amount: false,
	style: false,
	action: false,
	auxlObj: 'player',
	component: false,
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
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
	method: 'test',
	params: 'null'
};


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
		['stare']:{id: 'playerRig'},
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
		['stare']:{id: 'playerRig'},
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
			self:{Speak:{speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline2'},},
		},ifFalse: {
			self:{Speak:{role: '???', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}, SelectJump:['Take the Key?',['Yes','timeline1'], ['No','timeline3'],],},},}}},
	},
	timeline1:{
		self:{Speak:{speech:'Here you go!'}, SetFlag: {flag: 'zone1Key', value: true}},
		comp:{AddToInventory: {item: auxl.zone1Key}},
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
auxl.npcKeyBody = auxl.Core(auxl.npcKeyBodyData);
auxl.npcKeyBubble = auxl.Core(auxl.npcKeyBubbleData);
auxl.npcKeyGiver = auxl.NPC('npcKeyGiver', auxl.npcKeyBody, auxl.npcKeyBookData, auxl.npcKeyBubble);

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
animations: false,
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
	animations: false,
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
	doorway:{zone: 'zone0', to: 'connect0'},
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
	doorway:{zone: 'zone0', to: 'connect1'},
	hovertext:{value: 'Doorway to Scene 2', hover: 'top', offset: 1, twist: true,},
},
};
auxl.doorway2 = auxl.Core(auxl.doorway2Data);


//Build Scene Library Objects
auxl.buildSceneLibrary = () => {

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
auxl.npcKeyBubble = auxl.Core(auxl.npcKeyBubbleData);
auxl.npcKeyGiver = auxl.NPC('npcKeyGiver', auxl.npcKeyBody, auxl.npcKeyBookData, auxl.npcKeyBubble);
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
auxl.layerNPC = auxl.NPC('layerNPC', auxl.testLayer, auxl.layerBookData, auxl.layerBubble);

//Doorways
auxl.doorway1 = auxl.Core(auxl.doorway1Data);
auxl.doorway2 = auxl.Core(auxl.doorway2Data);

}
auxl.toBeRebuilt('buildSceneLibrary');

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
		action6Down:{auxlObj: 'player', func: 'ToggleSittingMode', name: 'Toggle Sit/Stand', info: 'Change your height between sitting and standing mode.'},
	},
	start:{
		switchCube:{SpawnCore:null},
		cubeCore:{SpawnCore:null},
		faceTest:{SpawnLayer:null},
		creatureTesting1:{SpawnCreature:null},
		creatureTesting2:{SpawnCreature:null},
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

	},
};
//Zone 0 Scene 0
auxl.zone0Scene0Data = {
	info:{
		id:'zone0Scene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: true,
		fog: {type: 'exponential', color: '#000', density: 0.025},
	},
	controls:{
		action3Down:{auxlObj: 'testCubeCore', func: 'ToggleSpawn', name: 'Toggle Cube', info: 'Toggle an in-scene cube.'},
	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#1e7e5d", emissive: "#1e7e5d",},}},
		biome:{SpawnMultiAsset:null},
		hills:{SpawnHorizon:null},
		coreEventTesting:{SpawnCore:null},
		doorway1:{SpawnCore:null},
		doorway2:{SpawnCore:null},
	},
	delay:{
		3000:{
			switchCube:{EmitEvent:'emote1'},
			collisionTest1:{DespawnFromGrid:null},
		},
		4000:{
			coreEventTesting:{EmitEvent:'test'},
			cubeCore:{EmitEvent:'alert2'},
		},
		5000:{
			comp:{SetFlag:{flag: 'test', value: true}},
			coreEventTesting:{EmitEvent:'alert1'},
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
		action1Down:{auxlObj: 'player', func: 'TestFunc', params: {test1: 1, test2: 2}, name: 'Test Action', info: 'Just a Dev test function.'},
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
		fog: {type: 'exponential', color: '#AAA', density: 0.05},
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:[{property: 'material', value: {src: auxl.pattern80, repeat: '150 150',color: "#21679a", emissive: "#21679a",},},{property: 'position', value: new THREE.Vector3(0,0,0),},{property: 'raycast-teleportation-select', value: null,}],},
		basicRing:{SpawnObjRing:null},
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
				connect1: {inZone: 'zone1', node: 'zone1Scene0', locked: true, keyId: 'zone1Key', keyName: 'Zone 1 Key', keepKey: true},
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
		action3Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed', name: 'Toggle Walk/Run', info: 'Change your walking speed between walk and run.'},
		action5Down:{auxlObj: 'player', func: 'ToggleCrouch', name: 'Toggle Crouch/Stand', info: 'Change your position speed between crouch and standing.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft45', name: 'Snap View Left', info: 'Quick snap your view 45 degrees to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight45', name: 'Snap View Right', info: 'Quick snap your view 45 degrees to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		comp:{SpawnComp: null, AddToInventory:{item:[ auxl.testItem1, auxl.testItem2, auxl.flashlightTool, auxl.testTool1, auxl.testTool2, auxl.testKey1, auxl.testKey2, auxl.testKey3, auxl.testKey4, auxl.testKey5, auxl.testKey6, auxl.testKey7, auxl.testKey8, auxl.testKey9, auxl.testSpecial1, auxl.testSpecial2,], hide: true}},
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
//System Loaded
auxl.systemLoaded();

    },
});