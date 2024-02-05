//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-mascot-library
//User Library : User added Library items
AFRAME.registerComponent('mascot-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

auxl.rayTestData = {
data:'rayTestData',
id:'rayTest',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(-1,1.6,-2),
rotation: new THREE.Vector3(0,0,0),
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
auxl.rayTest = auxl.Core(auxl.rayTestData);




//Blink

//Face Expressions
//happy
//sad
//angry
//confused
//tired
//asleep
//wakeUp
//annoyed
//smug
//shocked
//scared
//confident
//love
//shy
//wink


//Body Expressions
//Idle : Arms swinging, head side to side. normal exp
//Greet : 1 Hand Wave. wide exp
//Get Attention : 2 Hand Wave. wide exp
//Point : Arm follow look-at thing or player. squint exp
//Jump : Body compresses, expands and moves up, moves down and compresses, back to normal. Arms flail up. Squint, wide, normal exp
//Fall asleep : body rocks back and forth a bit till the head slumps down. tired then sleep exp
//What? : Head cocked, arm scratch head. Confused exp
//Smug : Head tilt back. wide, normal, wide, normal... wink exp. Head tilt forward
//Lost : Head looks around, arms swing, squint, normal, squint, normal
//Sad : Head tilt forward, arms still and slumped, body compresses
//Shocked : Arms, head and body slightly jump up and back. wide exp
//Love : Body expands slightly, eyes turn to hearts that scale thump






//
//Robot

//Parent
auxl.mascotParentData = {
data:'mascotParentData',
id:'mascotParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.mascotParent = auxl.Core(auxl.mascotParentData);

//Head Parent
auxl.headParentData = {
data:'headParentData',
id:'headParent',
position: new THREE.Vector3(0,1.375,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
classes: ['clickable','a-ent'],
components: {
//['stare']:{id: 'playerRig', twist: true,},
},
};
auxl.headParent = auxl.Core(auxl.headParentData);

//Head Parent
auxl.headShapeParentData = {
data:'headShapeParentData',
id:'headShapeParent',
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-15,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
classes: ['clickable','a-ent'],
components: {
//['stare']:{id: 'playerRig', twist: true,},
},
};
auxl.headShapeParent = auxl.Core(auxl.headShapeParentData);
//Head 0 Tear
auxl.head0Data = {
data:'head0Data',
id:'head0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.head0 = auxl.Core(auxl.head0Data);
//Head 1 Tear
auxl.head1Data = {
data:'head1Data',
id:'head1',
sources: false,
text: false,
geometry: {primitive: 'cone', height:0.15, radiusBottom:0.25, radiusTop: 0.225, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.075,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.head1 = auxl.Core(auxl.head1Data);
//Head 2 Tear
auxl.head2Data = {
data:'head2Data',
id:'head2',
sources: false,
text: false,
geometry: {primitive: 'cone', height:0.4, radiusBottom:0, radiusTop: 0.225, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.35,0),
rotation: new THREE.Vector3(180,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.head2 = auxl.Core(auxl.head2Data);


//head ring
auxl.headRingData = {
data:'headRingData',
id:'headRing',
sources: false,
text: false,
geometry: {primitive: 'torus', radius: 0.1, radiusTubular: 0.01, segmentsRadial: 36, segmentsTubular: 32,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.450,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.headRing = auxl.Core(auxl.headRingData);

//Head Box
auxl.headData = {
data:'headData',
id:'head',
sources: false,
text: false,
geometry: {primitive: 'box', width: 0.5, height: 0.5, depth: 0.5},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.head = auxl.Core(auxl.headData);
//eye1
auxl.eye1Data = {
data:'eye1Data',
id:'eye1',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.1, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
//geometry: {primitive: 'box', width: 0.1, height: 0.025, depth: 0.125, },
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.125,0,0.25),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1.1),
animations: {

blink: {property: 'object3D.scale.z', to: 0.01, dur: 375, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink',},

wide: {property: 'object3D.scale.z', to: 1.25, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'wide'},

normal: {property: 'object3D.scale.z', to: 1.1, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'normal'},

squint: {property: 'object3D.scale.z', to: 0.5, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'squint'},

tired: {property: 'object3D.scale.z', to: 0.9, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'tired'},

close: {property: 'object3D.scale.z', to: 0.01, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'close'},

},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.eye1 = auxl.Core(auxl.eye1Data);
//eye2
auxl.eye2Data = auxl.coreDataFromTemplate(auxl.eye1Data, {id: 'eye2', position: new THREE.Vector3(0.125,0,0.25),}, true);
auxl.eye2 = auxl.Core(auxl.eye2Data);
//Eye Anims : Wide/Normal/Squint/Tired/Blink/Closed


//Ears
auxl.earData = {
data:'earData',
id:'ear1',
sources: false,
text: false,
geometry: {primitive: 'dodecahedron', radius: 0.075, detail: 0,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.24,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1.1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.ear1 = auxl.Core(auxl.earData);
//eye2
auxl.ear2Data = auxl.coreDataFromTemplate(auxl.earData, {id: 'ear2', position: new THREE.Vector3(0.24,0,0),}, true);
auxl.ear2 = auxl.Core(auxl.ear2Data);

//Antennae
auxl.antennaeData = {
data:'antennaeData',
id:'antennae',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.01, height: 0.2, openEnded: false, segmentsHeight: 2, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.34,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1.1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.antennae = auxl.Core(auxl.antennaeData);


//A Parent
auxl.aParentData = {
data:'aParentData',
id:'aParent',
position: new THREE.Vector3(0,0.305,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
classes: ['clickable','a-ent'],
components: {
visible: false,
},
};
auxl.aParent = auxl.Core(auxl.aParentData);
//A1
auxl.a1Data = {
data:'a1Data',
id:'a1',
sources: false,
text: false,
geometry: {primitive: 'box', width: 0.01, height: 0.125, depth: 0.125,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0.021,0,0),
rotation: new THREE.Vector3(0,0,20),
scale: new THREE.Vector3(1,1,1.1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.a1 = auxl.Core(auxl.a1Data);
//A2
auxl.a2Data = {
data:'a2Data',
id:'a2',
sources: false,
text: false,
geometry: {primitive: 'box', width: 0.01, height: 0.125, depth: 0.125,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.021,0,0),
rotation: new THREE.Vector3(0,0,-20),
scale: new THREE.Vector3(1,1,1.1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.a2 = auxl.Core(auxl.a2Data);
//A3
auxl.a3Data = {
data:'a3Data',
id:'a3',
sources: false,
text: false,
geometry: {primitive: 'box', width: 0.065, height: 0.01, depth: 0.125,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,-0.025,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1.1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.a3 = auxl.Core(auxl.a3Data);




//Body Parent
auxl.bodyParentData = {
data:'bodyParentData',
id:'bodyParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.bodyParent = auxl.Core(auxl.bodyParentData);

//Body
auxl.bodyData = {
data:'bodyData',
id:'body',
sources: false,
text: false,
geometry: {primitive: 'octahedron', radius: 0.25, detail: 0},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.75,1.25,0.75),
animations: {
rotate: {property: 'object3D.rotation.y', to: 360, dur: 30000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body = auxl.Core(auxl.bodyData);




//body Parent
auxl.bodyShapeParentData = {
data:'bodyShapeParentData',
id:'bodyShapeParent',
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-15,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
classes: ['clickable','a-ent'],
components: {
//['stare']:{id: 'playerRig', twist: true,},
},
};
auxl.bodyShapeParent = auxl.Core(auxl.bodyShapeParentData);
//body 0 Tear
auxl.body0Data = {
data:'body0Data',
id:'body0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body0 = auxl.Core(auxl.body0Data);
//body 1 Tear
auxl.body1Data = {
data:'body1Data',
id:'body1',
sources: false,
text: false,
geometry: {primitive: 'cone', height:0.1, radiusBottom:0.25, radiusTop: 0.2, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.05,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body1 = auxl.Core(auxl.body1Data);
//body 2 Tear
auxl.body2Data = {
data:'body2Data',
id:'body2',
sources: false,
text: false,
geometry: {primitive: 'cone', height:0.25, radiusBottom:0.1, radiusTop: 0.2, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.225,0),
rotation: new THREE.Vector3(180,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body2 = auxl.Core(auxl.body2Data);

//body 0 Tear
auxl.body3Data = {
data:'body3Data',
id:'body3',
sources: false,
text: false,
geometry: {primitive: 'cone', height:0.275, radiusBottom:0.1, radiusTop: 0, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.487,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.body3 = auxl.Core(auxl.body3Data);


//Shoulders
auxl.shoulderData = {
data:'shoulderData',
id:'shoulder1',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.075, phiStart: 0, phiLength: 360, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.2,0.45,0),
rotation: new THREE.Vector3(5,0,1),
scale: new THREE.Vector3(1,1,1),
animations: {

idlex: {property: 'object3D.rotation.x', from: 5, to: -5, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'idle, animationcomplete__normal'},
idlez: {property: 'object3D.rotation.z', from: 1, to: -1, dur: 1750, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'idle, animationcomplete__normal'},


wave: {property: 'rotation',to: '3 0 -150', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'wave'},
wavex: {property: 'object3D.rotation.x', from: 3, to: -3, dur: 1000, delay: 0, loop: 6, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__wave'},
wavez: {property: 'object3D.rotation.z',from: -150, to: -100, dur: 1000, delay: 0, loop: 6, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__wave'},





normal: {property: 'rotation', to: '0 0 0', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'normal, animationcomplete__wavex'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.shoulder1 = auxl.Core(auxl.shoulderData);
//Shoulder 2
auxl.shoulder2Data = auxl.coreDataFromTemplate(auxl.shoulderData, {id: 'shoulder2', position: new THREE.Vector3(0.2,0.45,0), rotation: new THREE.Vector3(5,0,-1),
animations: {
idlex: {property: 'object3D.rotation.x', from: 5, to: -5, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'idle, animationcomplete__normal'},
idlez: {property: 'object3D.rotation.z', from: -1, to: 1, dur: 1750, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'idle, animationcomplete__normal'},


wave: {property: 'rotation',to: '3 0 150', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'wave'},
wavex: {property: 'object3D.rotation.x', from: 3, to: -3, dur: 1000, delay: 0, loop: 6, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__wave'},
wavez: {property: 'object3D.rotation.z',from: 150, to: 100, dur: 1000, delay: 0, loop: 6, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__wave'},





normal: {property: 'rotation', to: '0 0 0', dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'normal, animationcomplete__wavex'},
},
}, true);
auxl.shoulder2 = auxl.Core(auxl.shoulder2Data);





//Arms
auxl.armData = {
data:'armData',
id:'arm1',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.05, phiStart: 0, phiLength: 360, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.04,-0.25,0.05),
rotation: new THREE.Vector3(-16,7,3),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//arm 1
auxl.arm1 = auxl.Core(auxl.armData);
//arm 2
auxl.arm2Data = auxl.coreDataFromTemplate(auxl.armData, {id: 'arm2', position: new THREE.Vector3(0.04,-0.25,0.05), rotation: new THREE.Vector3(0,0,0), }, true);
auxl.arm2 = auxl.Core(auxl.arm2Data);




//hands
auxl.handData = {
data:'handData',
id:'hand1',
sources: false,
text: false,
geometry: {primitive: 'cone', radiusBottom: 0, radiusTop: 0.1, height: 0.25, openEnded: false, segmentsHeight: 4, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,-0.25,0),
rotation: new THREE.Vector3(180,0,0),
scale: new THREE.Vector3(1,1.25,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//hand 1
auxl.hand1 = auxl.Core(auxl.handData);
//hand 2
auxl.hand2Data = auxl.coreDataFromTemplate(auxl.handData, {id: 'hand2', position: new THREE.Vector3(0,-0.25,0), rotation: new THREE.Vector3(180,0,0), }, true);
auxl.hand2 = auxl.Core(auxl.hand2Data);

//new THREE.Vector3(0,-30,-150)

//Leg
auxl.legData = {
data:'legData',
id:'leg',
sources: false,
text: false,
geometry: {primitive: 'torus', radius: 0.21, radiusTubular: 0.025, segmentsRadial: 36, segmentsTubular: 32,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1.5),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.leg = auxl.Core(auxl.legData);

//Foot
auxl.footData = {
data:'footData',
id:'foot1',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.125,},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.1,-0.37,-0.075),
rotation: new THREE.Vector3(0,-60,90),
scale: new THREE.Vector3(4,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.foot1 = auxl.Core(auxl.footData);
//hand 2
auxl.foot2Data = auxl.coreDataFromTemplate(auxl.footData, {id: 'foot2', position: new THREE.Vector3(0.1,-0.37,-0.075),
rotation: new THREE.Vector3(0,150,90), }, true);
auxl.foot2 = auxl.Core(auxl.foot2Data);

//Backpack
auxl.backpackData = {
data:'backpackData',
id:'backpack',
sources: false,
text: false,
geometry: {primitive: 'ring', radiusInner: 0.2, radiusOuter: 0.275, segmentsPhi: 8, segmentsTheta: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.275,-0.25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.backpack = auxl.Core(auxl.backpackData);


//mascot Layer
auxl.aframeMascotData = {
	parent: {core: auxl.mascotParent}, 
	child0: {
		parent: {core: auxl.headParent},
		child0: {
			parent: {core: auxl.headShapeParent},
			child0: {core: auxl.head0},
			child1: {core: auxl.head1},
			child2: {core: auxl.head2},
			child3: {core: auxl.headRing},
		},
		child1: {core: auxl.eye1},
		child2: {core: auxl.eye2},
		child3: {core: auxl.ear1},
		child4: {core: auxl.ear2},
		child5: {
			parent: {core: auxl.aParent},
			child0: {core: auxl.a1},
			child1: {core: auxl.a2},
			child2: {core: auxl.a3},
		},

	}, 
	child1: {
		parent: {core: auxl.bodyParent},
		//child0: {core: auxl.body},
		child0: {core: auxl.body0},
		child1: {core: auxl.body1},
		child2: {core: auxl.body2},
		child3: {core: auxl.body3},
		//child0: {core: auxl.body4},
		//child0: {core: auxl.body5},
		child11: {
			parent: {core: auxl.shoulder1},
			child0: {
				parent: {core: auxl.arm1},
				child0: {core: auxl.hand1},
			},
		},
		child12: {
			parent: {core: auxl.shoulder2},
			child0: {
				parent: {core: auxl.arm2},
				child0: {core: auxl.hand2},
			},
		},
		child13: {core: auxl.leg},
		child14: {core: auxl.foot1},
		child15: {core: auxl.foot2},
		child16: {core: auxl.backpack},
	}, 

}
auxl.aframeMascot = auxl.Layer('aframeMascot',auxl.aframeMascotData);





//
//Buddy
auxl.buddyParentData = {
data:'buddyParentData',
id:'buddyParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(-1.5,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyParent = auxl.Core(auxl.buddyParentData);

auxl.buddyBodyParentData = {
data:'buddyBodyParentData',
id:'buddyBodyParent',
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
components: {['stare']:{id: 'playerRig'},},
};
auxl.buddyBodyParent = auxl.Core(auxl.buddyBodyParentData);

auxl.buddyBodyData = {
data:'buddyBodyData',
id:'buddyBody',
sources: false,
text: false,
//geometry: {primitive: 'sphere', radius: 0.125, thetaLength: 30},
geometry: {primitive: 'sphere', radius: 0.125, thetaStart: 20, thetaLength: 160},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyBody = auxl.Core(auxl.buddyBodyData);

auxl.buddyIrisData = {
data:'buddyIrisData',
id:'buddyIris',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.12,},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyIris = auxl.Core(auxl.buddyIrisData);


auxl.buddyShellParentData = {
data:'buddyShellParentData',
id:'buddyShellParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'rotation', from: new THREE.Vector3(0,0,0), to: new THREE.Vector3(0,360,0), dur: 6000, delay: 0, loop: true, dir: 'normal', easing: 'easeInOutCirc', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShellParent = auxl.Core(auxl.buddyShellParentData);

auxl.buddyShell1Data = {
data:'buddyShell1Data',
id:'buddyShell1',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.05,-0.125),
rotation: new THREE.Vector3(90,0,-45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0,0.05,-0.125), to: new THREE.Vector3(0,0.25,-0.25), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell1 = auxl.Core(auxl.buddyShell1Data);

auxl.buddyShell2Data = {
data:'buddyShell2Data',
id:'buddyShell2',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.05,0.125),
rotation: new THREE.Vector3(90,0,-45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0,0.05,0.125), to: new THREE.Vector3(0,0.25,0.25), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell2 = auxl.Core(auxl.buddyShell2Data);

auxl.buddyShell3Data = {
data:'buddyShell3Data',
id:'buddyShell3',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0.125,0.05,0),
rotation: new THREE.Vector3(90,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0.125,0.05,0), to: new THREE.Vector3(0.25,0.25,0), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell3 = auxl.Core(auxl.buddyShell3Data);

auxl.buddyShell4Data = {
data:'buddyShell4Data',
id:'buddyShell4',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.125,0.05,0),
rotation: new THREE.Vector3(90,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(-0.125,0.05,0), to: new THREE.Vector3(-0.25,0.25,0), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell4 = auxl.Core(auxl.buddyShell4Data);

auxl.buddyShell5Data = {
data:'buddyShell5Data',
id:'buddyShell5',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,-0.05,-0.125),
rotation: new THREE.Vector3(90,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0,-0.05,-0.125), to: new THREE.Vector3(0,-0.25,-0.25), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell5 = auxl.Core(auxl.buddyShell5Data);

auxl.buddyShell6Data = {
data:'buddyShell6Data',
id:'buddyShell6',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,-0.05,0.125),
rotation: new THREE.Vector3(90,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0,-0.05,0.125), to: new THREE.Vector3(0,-0.25,0.25), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell6 = auxl.Core(auxl.buddyShell6Data);

auxl.buddyShell7Data = {
data:'buddyShell7Data',
id:'buddyShell7',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0.125,-0.05,0),
rotation: new THREE.Vector3(90,0,-45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(0.125,-0.05,0), to: new THREE.Vector3(0.25,-0.25,0), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell7 = auxl.Core(auxl.buddyShell7Data);

auxl.buddyShell8Data = {
data:'buddyShell8Data',
id:'buddyShell8',
sources: false,
text: false,
geometry: {primitive: 'tetrahedron', radius: 0.09, detail: 0},
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.125,-0.05,0),
rotation: new THREE.Vector3(90,0,-45),
scale: new THREE.Vector3(1,1,1),
animations: {
	flex: {property: 'position', from: new THREE.Vector3(-0.125,-0.05,0), to: new THREE.Vector3(-0.25,-0.25,0), dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.buddyShell8 = auxl.Core(auxl.buddyShell8Data);


//Buddy Layer
auxl.aframeBuddyData = {
	parent: {core: auxl.buddyParent}, 
	child0: {
		parent: {core: auxl.buddyBodyParent}, 
		child0: {
			parent: {core: auxl.buddyBody}, 
			child0: {core: auxl.buddyIris},
			child1: {
				parent: {core: auxl.buddyShellParent}, 
				child0: {core: auxl.buddyShell1},
				child1: {core: auxl.buddyShell2},
				child2: {core: auxl.buddyShell3},
				child3: {core: auxl.buddyShell4},
				child4: {core: auxl.buddyShell5},
				child5: {core: auxl.buddyShell6},
				child6: {core: auxl.buddyShell7},
				child7: {core: auxl.buddyShell8},
			},
		},
	},

}
auxl.aframeBuddy = auxl.Layer('aframeBuddy',auxl.aframeBuddyData);





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
position: new THREE.Vector3(3,1.5,0),
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
material: {shader: "standard", color: "#F2E646", emissive: '#F2E646', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
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
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
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
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
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
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
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
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
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
//Egg

//Egg Parent
auxl.eggParentData = {
data:'eggParentData',
id:'eggParent',
position: new THREE.Vector3(3,0.25,0),
rotation: new THREE.Vector3(-15,1.5,15),
scale: new THREE.Vector3(1,1,1),
animations: {
wobblex: {property: 'object3D.rotation.x', from: -15, to: 5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: true},
wobbley: {property: 'object3D.rotation.y', from: 1.5, to: -1.5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: true},
wobblez: {property: 'object3D.rotation.z', from: 15, to: -5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: true},
},
classes: ['clickable','a-ent'],
components: false,
};
auxl.eggParent = auxl.Core(auxl.eggParentData);

//Head 0 Bowl
auxl.egg0Data = {
data:'egg0Data',
id:'egg0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.egg0 = auxl.Core(auxl.egg0Data);
//Head 1 Bowl
auxl.egg1Data = {
data:'egg1Data',
id:'egg1',
sources: false,
text: false,
//geometry: {primitive: 'cylinder', radius: 0.25, height: 0.25, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#EF2D5E", emissive: '#EF2D5E', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1.5),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.egg1 = auxl.Core(auxl.egg1Data);



auxl.eggLayerData = {
	parent: {core: auxl.eggParent}, 
	child0: {core: auxl.egg0}, 
	child1: {core: auxl.egg1}, 
}
auxl.eggMascot = auxl.Layer('eggMascot',auxl.eggLayerData);








//
//yTear

//yTear Parent
auxl.yTearParentData = {
data:'yTearParentData',
id:'yTearParent',
position: new THREE.Vector3(3,1.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
wobblex: {property: 'object3D.rotation.x', from: -15, to: 5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: false},
wobbley: {property: 'object3D.rotation.y', from: 1.5, to: -1.5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: false},
wobblez: {property: 'object3D.rotation.z', from: 15, to: -5, dur: 6000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutBack', elasticity: 400, autoplay: true, enabled: false},
},
classes: ['clickable','a-ent'],
components: false,
};
auxl.yTearParent = auxl.Core(auxl.yTearParentData);

//Head 0 Bowl
auxl.yTear0Data = {
data:'yTear0Data',
id:'yTear0',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#2defe8", emissive: '#2defe8', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.yTear0 = auxl.Core(auxl.yTear0Data);
//Head 1 Bowl
auxl.yTear1Data = {
data:'yTear1Data',
id:'yTear1',
sources: false,
text: false,
//geometry: {primitive: 'cylinder', radius: 0.25, height: 0.25, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
//geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
geometry: {primitive: 'cone', height:0.1, radiusBottom:0.25, radiusTop: 0.2, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},

material: {shader: "standard", color: "#2defe8", emissive: '#2defe8', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.05,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.yTear1 = auxl.Core(auxl.yTear1Data);

//Head 1 Bowl
auxl.yTear2Data = {
data:'yTear2Data',
id:'yTear2',
sources: false,
text: false,
//geometry: {primitive: 'cylinder', radius: 0.25, height: 0.25, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
//geometry: {primitive: 'sphere', radius: 0.25, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
geometry: {primitive: 'cone', height:0.5, radiusBottom:0, radiusTop: 0.2, segmentsHeight:3, segmentsRadial:32, openEnded:false, thetaStart:0, thetaLength:360},

material: {shader: "standard", color: "#2defe8", emissive: '#2defe8', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.35,0),
rotation: new THREE.Vector3(180,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.yTear2 = auxl.Core(auxl.yTear2Data);



auxl.yTearLayerData = {
	parent: {core: auxl.yTearParent}, 
	child0: {core: auxl.yTear0}, 
	child1: {core: auxl.yTear1}, 
	child2: {core: auxl.yTear2}, 
}
auxl.yTearLayer = auxl.Layer('yTearLayer',auxl.yTearLayerData);









//Build Scene Library Objects
auxl.buildMascotLibrary = () => {
	auxl.mascotParent = auxl.Core(auxl.mascotParentData);
	auxl.headParent = auxl.Core(auxl.headParentData);
	auxl.head0 = auxl.Core(auxl.head0Data);
	auxl.head1 = auxl.Core(auxl.head1Data);
	auxl.head = auxl.Core(auxl.headData);
	auxl.eye1 = auxl.Core(auxl.eye1Data);
	auxl.eye2 = auxl.Core(auxl.eye2Data);
	auxl.ear1 = auxl.Core(auxl.earData);
	auxl.ear2 = auxl.Core(auxl.ear2Data);
	auxl.antennae = auxl.Core(auxl.antennaeData);
	auxl.aParent = auxl.Core(auxl.aParentData);
	auxl.a1 = auxl.Core(auxl.a1Data);
	auxl.a2 = auxl.Core(auxl.a2Data);
	auxl.a3 = auxl.Core(auxl.a3Data);
	auxl.bodyParent = auxl.Core(auxl.bodyParentData);
	auxl.body = auxl.Core(auxl.bodyData);
	auxl.shoulder1 = auxl.Core(auxl.shoulderData);
	auxl.shoulder2 = auxl.Core(auxl.shoulder2Data);
	auxl.arm1 = auxl.Core(auxl.armData);
	auxl.arm2 = auxl.Core(auxl.arm2Data);
	auxl.leg = auxl.Core(auxl.legData);
	auxl.foot = auxl.Core(auxl.footData);
	auxl.backpack = auxl.Core(auxl.backpackData);
	auxl.aframeMascot = auxl.Layer('aframeMascot',auxl.aframeMascotData);


auxl.yTearLayer = auxl.Layer('yTearLayer',auxl.yTearLayerData);

}
auxl.toBeRebuilt('buildMascotLibrary');

},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('mascot-scenes', {
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
auxl.zoneMascotTestsData = {
	info:{
		id: 'zoneMascotTests',
		name: 'zoneMascotTests',
		zoneNum: 0,
		start: 'zoneMascotTestsScene0',
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
auxl.zoneMascotTestsScene0Data = {
	info:{
		id:'zoneMascotTestsScene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 64,
			height: {top: 10, bottom: 4},
			edge: true,
			spawnEdge: true,
			edgeUpdate: false,
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		aframeMascot:{SpawnLayer:null},
		aframeBuddy:{SpawnLayer:null},
		faceTest:{SpawnLayer:null},
		eggMascot:{SpawnLayer:null},
		yTearLayer:{SpawnLayer:null},

		//rayTest:{SpawnCore: null},
	},
	delay:{
		1000:{
			eye1:{EmitEvent: 'blink'},
			eye2:{EmitEvent: 'blink'},
		},
		3000:{
			shoulder1:{EmitEvent: 'wave'},
		},
		6000:{
			eye1:{EmitEvent: 'wide'},
			eye2:{EmitEvent: 'wide'},
		},
		9000:{
			shoulder2:{EmitEvent: 'wave'},
			eye1:{EmitEvent: 'tired'},
			eye2:{EmitEvent: 'tired'},
		},
		12000:{
			eye1:{EmitEvent: 'squint'},
			eye2:{EmitEvent: 'squint'},
		},
		15000:{
			eye1:{EmitEvent: 'close'},
			eye2:{EmitEvent: 'close'},
		},
		18000:{
			eye1:{EmitEvent: 'normal'},
			eye2:{EmitEvent: 'normal'},
			shoulder1:{EmitEvent: 'wave'},
			shoulder2:{EmitEvent: 'wave'},
		},
		21000:{
			eye1:{EmitEvent: 'wide'},
			eye2:{EmitEvent: 'squint'},
		},
		24000:{
			eye1:{EmitEvent: 'normal'},
			eye2:{EmitEvent: 'normal'},
		},
	},
	interval:{
		4300: {
			run: {
				eye1:{EmitEvent: 'blink'},
				eye2:{EmitEvent: 'blink'},
			}, loop: 'infinite'
		},
		33000: {
			run: {
				shoulder1:{EmitEvent: 'wave'},
			}, loop: 'infinite'
		},
		36000: {
			run: {
				eye1:{EmitEvent: 'wide'},
				eye2:{EmitEvent: 'wide'},
			}, loop: 'infinite'
		},
		39000: {
			run: {
				shoulder2:{EmitEvent: 'wave'},
				eye1:{EmitEvent: 'tired'},
				eye2:{EmitEvent: 'tired'},
			}, loop: 'infinite'
		},
		42000: {
			run: {
				eye1:{EmitEvent: 'squint'},
				eye2:{EmitEvent: 'squint'},
			}, loop: 'infinite'
		},
		45000: {
			run: {
				eye1:{EmitEvent: 'close'},
				eye2:{EmitEvent: 'close'},
			}, loop: 'infinite'
		},
		48000: {
			run: {
				shoulder1:{EmitEvent: 'wave'},
				shoulder2:{EmitEvent: 'wave'},
				eye1:{EmitEvent: 'normal'},
				eye2:{EmitEvent: 'normal'},
			}, loop: 'infinite'
		},
		51000: {
			run: {
				eye1:{EmitEvent: 'wide'},
				eye2:{EmitEvent: 'squint'},
			}, loop: 'infinite'
		},
		54000: {
			run: {
				eye1:{EmitEvent: 'normal'},
				eye2:{EmitEvent: 'normal'},
			}, loop: 'infinite'
		},

	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: auxl.zoneMascotTestsData.zoneMascotTestsScene0,
	},
};
//Zone 0 Scene 0
auxl.zoneMascotTestsScene0 = auxl.SceneNode(auxl.zoneMascotTestsScene0Data);
//Map Zone 0
auxl.zoneMascotTests = auxl.MapZone(auxl.zoneMascotTestsData);

//
//Scenarios

//
//Scenario
auxl.mascotScenarioData = {
	info:{
		id: 'mascotScenario',
		name: ' Mascot',
		scenarioNum: 0,
		startZone: 'zoneMascotTests',
		instructions: '...',
	},
	
	map:{
		zoneMascotTests:{
			zoneMascotTestsScene0:{
			},
		},
	},
	controls:{

		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action6Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		//comp:{SpawnComp: null,},
		floor:{SpawnCore: null},

	},
	delay:{
		100:{
			skyBox0:{SetTime: 12},
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
auxl.mascotScenario = auxl.Scenario(auxl.mascotScenarioData);

//
//Testing World
auxl.mascotWorldData = {
	info:{
		id: 'mascotWorld',
		name: 'Mascot World',
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
		auxl.mascotScenario,
	],
};
auxl.mascotWorld = auxl.World(auxl.mascotWorldData);
//auxl.mascotWorld.SetAsDefault();

//
//System Loaded
//auxl.systemLoaded();
console.log({msg: 'mascot world loaded', world: auxl.mascotWorld})
    },
});