
//
//UniRay
const UniRay = (auxl, id, layer, data) => {
console.log({auxl, id, layer, data})

	let uniRay = {};
	uniRay.id = 'uniRayDefault';
	uniRay.name = 'uniRayDefault';
	uniRay.pos = new THREE.Vector3(0,0,0);
	uniRay.intersection = new THREE.Vector3(0,0,0);
	uniRay.powers = {};
	uniRay.power = 'select';
	uniRay.active = false;

if(data){
	uniRay.id = data.id;
	uniRay.name = data.name;
	uniRay.pos = data.pos;
	uniRay.intersection = new THREE.Vector3(0,0,0);
	uniRay.powers = data.powers;
	uniRay.power = data.power
}

	//AUXL Entities

	//A-Frame requires a camera, so unless one is defined in html, it will inject one.
	//Remove or simplify html camera that will be taken over
	//Take over html camera if uniray is the first one to init
	//SPECIAL : Player Base and Child Camera entity are already in HTML and Layer has special exceptions for it

	//Ray Rig
	uniRay.rigData = {
	data: 'rigData',
	id: uniRay.id + 'Rig',
	sources: false,
	text: false,
	geometry: false,
	material: false,
	position: uniRay.pos,
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent','rig',uniRay.id,],
	components: {
	['wasd-controls']:{enabled: true},
	//['universal-controls']:null,
	//['locomotion']:{uiid: false, courserid: uniRay.id + 'CameraRay', movetype: 'desktop'},
	//['gimbal']:{uiid: false, courserid: 'mouseController', movetype: 'desktop'},
	light: {type: 'point', intensity: 0.075, distance: 5, decay:0.75},
	},};
	uniRay.rig = auxl.Core(uniRay.rigData);

	//Ray Body
	uniRay.bodyData = {
	data: 'bodyData',
	id:uniRay.id + 'Body',
	sources: false,
	text: false,
	geometry: {primitive: 'box', width: 0.5, height: 0.5, depth: 0.5},
	material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,1,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
	crouchdownstanding: {property: 'object3D.position.y', from: 0, to: -0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownStanding'},
	crouchupstanding: {property: 'object3D.position.y', from: -0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpStanding'},

	crouchdownsitting: {property: 'object3D.position.y', from: 0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchDownSitting'},
	crouchupsitting: {property: 'object3D.position.y', from: 0, to: 0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'crouchUpSitting'},

	sit: {property: 'object3D.position.y', from: 0, to: 0.75, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sit'},
	stand: {property: 'object3D.position.y', from: 0.75, to: 0, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'stand'},

	},
	mixins: false,
	classes: ['a-ent','body',uniRay.id,],
	components: false,
	};
	uniRay.body = auxl.Core(uniRay.bodyData);

	//Raycaster & Camera
	uniRay.cameraRayData = {
	data:'cameraRayData',
	id:uniRay.id + 'CameraRay',
	entity: 'a-camera',
	sources: false,
	text: false,
	geometry: {primitive: 'ring', radiusInner: 0.005, radiusOuter: 0.01},
	material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
	position: new THREE.Vector3(0,0,-0.5),
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent','cameraray',uniRay.id,],
	components: {
	active: false,

	['look-controls']:{enabled: true, reverseMouseDrag: false, reverseTouchDrag: false, touchEnabled: true, mouseEnabled: true, pointerLockEnabled: true, magicWindowTrackingEnabled: true},

	['wasd-controls']:{enabled: false},

	raycaster:{enabled: 'true', autoRefresh: 'true', objects: '.clickable', origin: new THREE.Vector3(0,0,0), direction: new THREE.Vector3(0,0,-1), far: 'Infinity', near: 0, interval: 0, lineColor: 'white', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'},
	//raycaster:{enabled: 'true', autoRefresh: 'true', objects: '.detect', origin: new THREE.Vector3(0,0,0), direction: new THREE.Vector3(0,0,-1), far: 'Infinity', near: 0, interval: 0, lineColor: 'white', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'},

	cursor: {fuse: 'false', rayOrigin: uniRay.id + 'CameraRay', mouseCursorStylesEnabled: 'true',},

	},};
	uniRay.cameraRay = auxl.Core(uniRay.cameraRayData);
	//Ray Camera UI
	uniRay.rayUIData = {
	data:'rayUIData',
	id:uniRay.id + 'RayUI',
	sources: false,
	text: false,
	geometry: {primitive: 'ring', radiusInner: 0.005, radiusOuter: 0.01},
	material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
	//text: {value:'Message', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},
	//geometry: {primitive: 'plane', width: 0.3, height: 0.15},
	//material: {shader: "flat", color: "#ac2d2d", opacity: 0.69, side: 'double'},
	position: new THREE.Vector3(0,0,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
	opacinbk:{property: 'components.material.material.opacity', from: 0, to: 0.82, dur: 750, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',}, 
	opacoutbk:{property: 'components.material.material.opacity', from: 0.82, to: 0, dur: 750, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',},
	opacintxt:{property: 'text.opacity', from: 0, to: 0.82, dur: 750, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',}, 
	opacouttxt:{property: 'text.opacity', from: 0.82, to: 0, dur: 750, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'cameraMsg',},

	click:{property: 'scale', from: '0.75 0.75 0.75', to: '0.4 0.4 0.4', dur: 100, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
	clickreset:{property: 'scale', from: '0.4 0.4 0.4', to: '0.75 0.75 0.75', dur: 300, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseup'},
	hoverenter:{property: 'material.color', from: '#228da7', to: '#22a741', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoverleave:{property: 'material.color', from: '#22a741', to: '#228da7', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['clickable', 'a-ent','rayui',uniRay.id,],
	components: {
	visible: true,
	},
	}
	uniRay.rayUI = auxl.Core(uniRay.rayUIData);

	//update look-at-xyz with specific current camera
	//Belt UI
	uniRay.bodyBeltUIData = {
	data:'bodyBeltUIData',
	id:uniRay.id + 'BodyBeltUI',
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
	uniRay.bodyBeltUI = auxl.Core(uniRay.bodyBeltUIData);
	//Belt Text
	uniRay.bodyBeltTextData = {
	data:'bodyBeltTextData',
	id:uniRay.id + 'bodyBeltText',
	sources:false,
	text: {value:'Hello World!', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.9, zOffset: 0.03, side: 'front', wrapCount: 45, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 1, height: 0.25},
	material: {shader: "standard", color: "#4bb8c1", opacity: 0.75, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(0,0.69,-0.8),
	rotation: new THREE.Vector3(-30,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
	visible: false,
	},
	};
	uniRay.bodyBeltText = auxl.Core(uniRay.bodyBeltTextData);

	//Player Vehicle
	uniRay.rayVehicleData = {
	data:'rayVehicleData',
	id:uniRay.id + 'RayVehicle',
	sources: false,
	text: false,
	geometry: {primitive: 'circle', radius: 1, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "flat", repeat: '1 1', color: "#3EB489", opacity: 0.42, side: 'double'},
	position: new THREE.Vector3(0,0.05,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	//classes: ['a-ent','player', 'clickable'],
	classes: ['a-ent','player'],
	components: {
	visible: true,
	},
	};
	uniRay.rayVehicle = auxl.Core(uniRay.rayVehicleData);

	//Raycaster Support

	//Raycaster Configurations
	//Mouse|Mobile Controller
	uniRay.mouseControllerData = {
	data:'mouseControllerData',
	id:uniRay.id + 'MouseController',
	sources: false,
	text: false,
	geometry: {primitive: 'ring', radiusInner: 0.005, radiusOuter: 0.01},
	material: {shader: "flat", color: "#228da7", opacity: 0.75, side: 'double'},
	position: new THREE.Vector3(0,0,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.75,0.75,0.75),
	animations: {
	click:{property: 'scale', from: '0.75 0.75 0.75', to: '0.4 0.4 0.4', dur: 100, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
	clickreset:{property: 'scale', from: '0.4 0.4 0.4', to: '0.75 0.75 0.75', dur: 300, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseup'},
	hoverenter:{property: 'material.color', from: '#228da7', to: '#22a741', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoverleave:{property: 'material.color', from: '#22a741', to: '#228da7', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['clickable', 'a-ent','player'],
	components: {
	raycaster:{enabled: 'true', autoRefresh: 'true', objects: '.clickable', origin: new THREE.Vector3(0,0,0), direction: new THREE.Vector3(0,0,-1), far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'},
	cursor: {fuse: 'false', rayOrigin: uniRay.id + 'MouseController', mouseCursorStylesEnabled: 'true',},
	},};
	uniRay.mouseController = auxl.Core(uniRay.mouseControllerData);
	//VR Controller 1
	uniRay.vrController1Data = {
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
	uniRay.vrController1 = auxl.Core(uniRay.vrController1Data);
	//VR Controller 1 UI
	uniRay.vrController1UIData = {
	data:'vrController1UIData',
	id:'vrController1UI',
	sources: false,
	text: {value:'...', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
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
	uniRay.vrController1UI = auxl.Core(uniRay.vrController1UIData);
	//VR Controller 2
	uniRay.vrController2Data = {
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
	uniRay.vrController2 = auxl.Core(uniRay.vrController2Data);
	//VR Controller 2 UI
	uniRay.vrController2UIData = {
	data:'vrController2UIData',
	id:'vrController2UI',
	sources: false,
	text: {value:'...', width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold"},
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
	uniRay.vrController2UI = auxl.Core(uniRay.vrController2UIData);


	//Animation Support

	//Could make them all from 2 geometry changing shapes 

	//Teleportation Fade
	uniRay.fadeScreenData = {
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
	uniRay.fadeScreen = auxl.Core(uniRay.fadeScreenData);
	//Teleportation Sphere
	uniRay.sphereScreenData = {
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
	uniRay.sphereScreen = auxl.Core(uniRay.sphereScreenData);
	//Teleportation Blink 1
	uniRay.blink1ScreenData = {
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
	uniRay.blink1Screen = auxl.Core(uniRay.blink1ScreenData);
	//Teleportation Blink 2
	uniRay.blink2ScreenData = {
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
	uniRay.blink2Screen = auxl.Core(uniRay.blink2ScreenData);


	//Layer
	uniRay.uniRayAll = {
	parent: {core: uniRay.rig},
	child0: {
		parent: {core: uniRay.body},
		child0: {
			parent: {core: uniRay.cameraRay},
			child0: {core: uniRay.rayUI},
			//child2: {core: uniRay.fadeScreen},
			//child3: {core: uniRay.sphereScreen},
			//child4: {core: uniRay.blink1Screen},
			//child5: {core: uniRay.blink2Screen},
		},
		child1: {
			parent: {core: uniRay.bodyBeltUI},
			child0: {core: uniRay.rayBeltText},
		},
	},
	child1: {core: uniRay.rayVehicle},
	}
	uniRay.uniRayLayer = auxl.Layer('uniRayLayer', uniRay.uniRayAll);

	//Spawn UniRay
	const SpawnUniRay = (parent) => {
		uniRay.uniRayLayer.SpawnLayer(parent);
	}
	//Despawn UniRay
	const DespawnUniRay = () => {
		uniRay.uniRayLayer.DespawnLayer();
	}
	//Set As Active
	const Activate = (camera) => {
		//Check for systems currently active camera, to update
		uniRay.active = true;
		auxl.camera.ChangeSelf({property: 'active', value: false})
		uniRay.cameraRay.ChangeSelf({property: 'active', value: true})
	}
	//Deactive
	const Deactivate = (camera) => {
		//Check for systems currently active camera, to update
		uniRay.active = false;
		uniRay.cameraRay.ChangeSelf({property: 'active', value: false})
		auxl.camera.ChangeSelf({property: 'active', value: true})
	}
	//Toggle
	const Toggle = (camera) => {
		if(uniRay.active){
			Deactivate(camera);
		} else {
			Activate(camera);
		}
	}
	//Ray Toggle
	const RayDisable = () => {
		uniRay.cameraRay.GetEl().setAttribute('visible',false);
		uniRay.cameraRay.GetEl().removeAttribute('raycaster');
		uniRay.cameraRay.GetEl().removeAttribute('cursor');
		controllerBlock.style.display = 'none';
	}
	const RayEnable = () => {
		uniRay.cameraRay.GetEl().setAttribute('visible',true);
		uniRay.cameraRay.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
		//uniRay.cameraRay.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: 'mouseController', mouseCursorStylesEnabled: 'true'});
		uniRay.cameraRay.GetEl().setAttribute('cursor',{fuse: 'false', mouseCursorStylesEnabled: 'true', rayOrigin: uniRay.id});
		controllerBlock.style.display = 'flex';
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 6});
		auxl.player.EnableMobileLocomotion();
		auxl.locomotionText = 'Arrow Buttons';
	}

	//Ray Controls
	const RayControls = (controls) => {
		controls = controls || '.clickable,';
		uniRay.cameraRay.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: controls, far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	}

//VR

//HMD
//No Trigger or button inputs, only up to 6DoF  

//VR Right Config
const ModeVRRight = (el) => {
	el.setAttribute('laser-controls',{hand: 'right'});
}
//VR Left Config
const ModeVRLeft = (el) => {
	el.setAttribute('laser-controls',{hand: 'left'});
}
//VR Config Off
const ModeVROff = (el) => {
	el.removeAttribute('laser-controls');
}






//raycaster-intersected
const RayIntersected = (event) => {
console.log({event:'raycaster-intersected'})
}
//Emitted on the intersected entity. Entity is intersecting with a raycaster. Event detail will contain el, the raycasting entity, and intersection, and .getIntersection (el) function which can be used to obtain current intersection data.
//raycaster-intersected-cleared
const RayIntersectCleared = (event) => {
console.log({event:'raycaster-intersected-cleared'})
}
//Emitted on the intersected entity. Entity is no longer intersecting with a raycaster. Event detail will contain el, the raycasting entity.
//raycaster-intersection
const RayIntersection = (event) => {
console.log({event:'raycaster-intersection'})
}
//Emitted on the raycasting entity. Raycaster is intersecting with one or more entities. Event detail will contain els, an array with the newly intersected entities, and intersections, and .getIntersection (el) function which can be used to obtain current intersection data. For access to a complete list of intersections (existing & new), see Members intersectedEls.
//raycaster-intersection-cleared
const RayIntersectionCleared = (event) => {
console.log({event:'raycaster-intersection-cleared'})
}
//Emitted on the raycasting entity. Raycaster is no longer intersecting with one or more entities. Event detail will contain clearedEls, an array with the formerly intersected entities.
//raycaster-closest-entity-changed
const RayIntersectUpdate = (event) => {
console.log({event:'raycaster-closest-entity-changed'})
}



//Most likely requires recent update to main auxl set that fixed a bug
//VR
function disableVRControls(){
	auxl.vrController1.GetEl().setAttribute('visible',false);
	auxl.vrController2.GetEl().setAttribute('visible',false);
	auxl.vrController1UI.GetEl().setAttribute('visible',false);
	auxl.vrController2UI.GetEl().setAttribute('visible',false);
	auxl.vrController1.GetEl().removeAttribute('cursor');
	auxl.vrController2.GetEl().removeAttribute('cursor');
	auxl.vrController1.GetEl().removeAttribute('laser-controls');
	auxl.vrController2.GetEl().removeAttribute('laser-controls');
}
function enableVRControls(){
	if(auxl.vrHand === 'bothRight'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 1});
		auxl.player.EnableVRLocomotion();
		auxl.locomotionText = 'Left Controller Joystick';
	} else if(auxl.vrHand === 'bothLeft'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: false, autoRefresh: false, objects: '.disabled', far: 0, near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false});
		auxl.vrController1.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 2});
		auxl.player.EnableVRLocomotion();
		auxl.locomotionText = 'Right Controller Joystick';
	} else if(auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'bothLeftLoco'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: 'false'});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		vrController1.setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 3});
		auxl.player.EnableVRLocomotion();
		if(auxl.vrHand === 'bothLeftLoco'){
			auxl.locomotionText = 'Left Controller Joystick';
		} else if (auxl.vrHand === 'bothRightLoco'){
			auxl.locomotionText = 'Right Controller Joystick';
		}
	} else if(auxl.vrHand === 'right'){
		auxl.vrController2.GetEl().setAttribute('visible',true);
		//auxl.vrController2UI.GetEl().setAttribute('visible',true);
		auxl.vrController2.GetEl().setAttribute('laser-controls',{hand: 'right'});
		auxl.vrController2.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController2.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: 'vrController2', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 4});
		auxl.player.EnableVRHoverLocomotion('vrController2');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
	} else if(auxl.vrHand === 'left'){
		auxl.vrController1.GetEl().setAttribute('visible',true);
		//auxl.vrController1UI.GetEl().setAttribute('visible',true);
		auxl.vrController1.GetEl().setAttribute('laser-controls',{hand: 'left'});
		auxl.vrController1.GetEl().setAttribute('raycaster',{enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: '#228da7', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false});
		auxl.vrController1.GetEl().setAttribute('cursor',{fuse: false, rayOrigin: 'vrController1', mouseCursorStylesEnabled: true});
		auxl.playerRig.GetEl().setAttribute('uniray',{update: 5});
		auxl.player.EnableVRHoverLocomotion('vrController1');
		auxl.locomotionText = 'Hover on Forward/Backward Belt.';
	}
}
//Desktop
function disableDesktopControls(){
	uniRay.cameraRay.GetEl().setAttribute('visible',false);
	uniRay.cameraRay.GetEl().removeAttribute('raycaster');
	uniRay.cameraRay.GetEl().removeAttribute('cursor');
}
function enableDesktopControls(){
	uniRay.cameraRay.GetEl().setAttribute('visible',true);
	uniRay.cameraRay.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	uniRay.cameraRay.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: uniRay.cameraRay.id, mouseCursorStylesEnabled: 'true',});
	auxl.playerRig.GetEl().setAttribute('uniray',{update: 0});
	auxl.player.EnableDesktopLocomotion();
	auxl.locomotionText = 'WASD Keys';
}
//Mobile
function disableMobileControls(){
	uniRay.cameraRay.GetEl().setAttribute('visible',false);
	uniRay.cameraRay.GetEl().removeAttribute('raycaster');
	uniRay.cameraRay.GetEl().removeAttribute('cursor');
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
	uniRay.cameraRay.GetEl().setAttribute('visible',true);
	uniRay.cameraRay.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: '.clickable', far: 'Infinity', near: 0, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
	uniRay.cameraRay.GetEl().setAttribute('cursor',{fuse: 'false', rayOrigin: uniRay.cameraRay.id, mouseCursorStylesEnabled: 'true'});
	controllerBlock.style.display = 'flex';
	auxl.playerRig.GetEl().setAttribute('uniray',{update: 6});
	auxl.player.EnableMobileLocomotion();
	auxl.locomotionText = 'Arrow Buttons';
}

return {uniRay, SpawnUniRay, DespawnUniRay, Activate, Deactivate, Toggle, RayDisable, RayEnable, RayControls, ModeVRRight, ModeVRLeft, ModeVROff, disableVRControls, enableVRControls, disableDesktopControls, enableDesktopControls, disableMobileControls, enableMobileControls, RayIntersected, RayIntersectCleared, RayIntersection, RayIntersectionCleared, RayIntersectUpdate}

}

export default UniRay;