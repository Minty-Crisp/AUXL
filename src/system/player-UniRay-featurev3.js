//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Player
//
//UniRay|Player
//Companion

/*
	//Primary, parent UniRay
	//Secondary, connected to another

	//Build a new Component akin to Universal-Controls for accessing single UniRay's set of inputs


	//Layer :
		//Cores :
			//ParentRig
			//Camera with Raycaster & Cursor
			//UI

	//Avatar
		//Head
		//Tag

	//One physics link
		//body dynamic/static fluid state
		//body static sync'd to main to pull in objects and set player barrier

	//Raycast Trigger and Alt
	//Modifier/Action Button

	//Buttons
	//Menu Button
		//Quick Access Hover Menu press and hold, swupe
		//Settings Menu - doubleClick
	//or
	//Button hold to activate power set
	//Button triple tap to open hover quick menu
	//
	//that way there are 4 set of powers to be used at once
	//No button Mode
	//Button 1 Mode
	//Button 2 Mode
	//Button 1+2 Mode

	//Joystick

	//Combo to cycle through power presets

	//Inputs
	//Linked Functions
	//Hardware layout
	//Raycaster/Mouse | HMD | 2D Trackpad | Joystick | Keyboard

	//In each of the layout's 3D depiction will include the itself as a head along with a body aka a tag that represents you as an entity. Who you are, what you are attached to such as an overall avatar as someone who has more then 1 UniRay device connected. That avatar could be made up of a single instance, or 2+ instances that allow additional controls to input access and thus what they can use in terms of powers they have access to. Since you can only assign so many powers to as many button modifiers as available, more hardware inputs more power access (I imagine just a bed full of controllers and 1 doofus in the middle either lazily swapping contorllers for different power/skills to with all haste quick grabbing new controllers to attend to matters in scene)


	//Each action has 3 modes
	//Trigger
	//Alt
	//Trigger & Alt




	//AUX Entity
	//
	//Player

	//Teleportation Animation should be its own camera extension

	//return {uniRay, SpawnUniRay, DespawnUniRay, Activate, Deactivate, Toggle}


//UniRay

//Runs from AUXLObjs
//One
//Player

//Needs the control changes from system
//Need to autodetect controller to configure as well
*/



//UniRay | Raycaster & Camera
//Rig | Locomotion & Avatar
//Inventory | Pick ups, Use, Drop, etc...

//Controller Style : Desktop, Mobile, VR 1/2 Hand, gamepad

//One physics body controller with access to method/powers


//Player | all of the above




//Sync another core to player body to act as a static with no body which has it's position updated via dynamic body to then link anything that has grab, rubberband, etc....


//Attach sphere to raycaster

//Set
//on mousedown, spawn sphere at set distance and move to closer intersection of available, lock on mouse up

//Charge
//on mousedown spawn and start moving in the ray direction outwards. Until mouseup hits and stops it or an intersecting object overrides
//Desktop | Mobile
//Main UniRay
//Head Camera, Body locomotion

//VR
//Sub UniRays
//Hand Camera
//Hand Camera 2

//Desktop
//Mobile
//VR Advanced 2 Controller
//VR Simple 1 Controller
//GamePad Controller
//Hand Tracking


//Head Ray Offset
//Body dynamic

//Hand Ray
//Digital body attached to body
//Body kinematic synced to body offset
//kinematic position is updated via dynamic body tracking tick updates

//Hand Ray
//Digital body attached to body
//Body kinematic synced to body offset

//Hand
//Static position updating on tick from a dynamic body

//
//Lock
//Will remove all degrees of freedom between the bodies.
//Point to Point
//Connects two bodies at given offset points. Like a string/link, so it limits rotation.
//Distance
//Constrains two bodies to be at a constant distance from each others center of mass. Doesn't limit rotation.
//Hinge
//Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
//Cone Twist
//Extends Point to Point and rotates like a joystick with varying tension.
//Spring
//Rubberband like connections


//Bundle all Raycasting information and methods related into a single UniRay objectGen
//Move all physics into One objGen  
//assign each uniRay power into a player power controller (on trigger up/down)
//build each power as controlling a one
/*
//
//Interaction States
//on tick, check wether to run interaction update

//On free, no button clicked down is a normal raycaster ready to interact/hover with things. Any button pressing to modify will take over that feature

//Indv Racyaster Inputs
//4 Button/Trigger Combo
//8 Button Configs
//Position | Rotation | Raycaster | El

//12 Base info

//2 Hover menus per raycaster
//Quick Powers / Layouts
//Menu

//17 conditions

//Rotation
//Joystick/Cursor
//Position
//Collision

//Button Events & Combos :
//Free
//Main Button
//Alt Button
//Main Trigger
//Alt Trigger

//6DoF Cursor Actions :
//Select Point - Main Index Raycaster Distance or Instersection
//Select Point Alt - Main Index Racaster Aim Rotation Offset Distance or Instersection
//Grab - start, hold, release, postional, collision
//Hold - hold, release, postional, rotational
//Drop - release, postional
//Throw - start, hold, release, postional, rotational, velocity
//Catch - start, hold, release, postional, rotational
//Poke - start, release, collision, postitional, rotational
//Punch - start, release, collision, postitional, rotational
//Extend - start, release, collision, postitional, rotational
//Slingshot - hold, release, postional, rotational
//Yo Yo / Plumball - start, release, collision, postitional, rotational
//Drive - start, hold, release, xypostional, rotational
//Joystick - start, hold, release, xzpostional, rotational
//Trackball - start, hold, release, xyzpostional, rotational
//Duals : Dual machine controller, wheel and stick, keyboard with trackpad, etc...
//Keys - tap, press, hold, release, match, pattern,
//Drum - Rythym
//Flick - build power, launch
//Wack - positional, collision
//Swing (Bat) - collision
//Hold and Pull (Bow) - collision
//Gun - collision
//Custom
//
//Combo - multiple actions activating at once
//Advanced - multiple actions in sequence and timing

//Styles :
//Arc / Straight / Boost / Fall / Pulse / Pattern / Lock / Custom
//Speed / Boost / Build / 


//,etc...

//Rotation/Raycaster Required
//Position Required
//Trigger Main
//Trigger Alt
//Button Main
//Button Alt

//Set up stacked events for each such as mousedown

//6 Inputs
//2 Buttons
//2 Triggers
//1 Position (collision)
//1 Rotation {raycaster direction}

//6 Modes
//Free
//Start
//Tap
//Hold
//Release
//Double

//Retreive tick based
//Button Updates
//Button Combos
//Rotation
//Joystick/Cursor
//Position
//Collision
*/

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
	material: {shader: "flat", src: './assets/img/compass/compass.jpg', repeat: '1 1', color: "#3EB489", opacity: 0.42, side: 'double'},
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
//
//Player
//User Controller, Settings and Actions
//const Player = (auxl,id,layer) => {
//
//UniRay
const Player = (auxl, id, layer, data) => {
console.log({auxl, id, layer, data})

	//Player Layer Legacy
	//Player Name
	let player = {};
	player.id = id;
	layer.id = id;

	//Old
	let uniRay = {};
	//Update Layer Copy
	//layer.layer.all.parent.core.core.id = id;

	//Base UniRay Headsup
	layer.uniRay0 = UniRay(auxl,id+'uniRay0', layer, data);
console.log(layer.uniRay0)
	//UI
	layer.vrUI = false;

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
	//Lock/Unlock Movement
	layer.move = false;
	//Locomotion Type
	layer.moveType = {pov : '1st', axis : 'posXYZ', style : 'free'}
	//layer.moveType = {pov : '1st', axis : 'posXZ', style : 'free'}

	//Sitting or Standing Mode
	layer.stand = true;
	//Duck | Standing
	let crouchTimeout;
	layer.standing = true;
	layer.animating = false;

	//Rig with camera
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

	//Collision
	layer.position = new THREE.Vector3(0,0,0);
	layer.gridPos = new THREE.Vector3(0,0,0);
	layer.gridDirection = 'still';
	//forwardRight
	//forwardLeft
	//reverseRight
	//reverseLeft
	//forward
	//reverse
	//right
	//left

	//Item|Tool|Key|Special Equipped
	layer.equipped = false;
	layer.equippedObject = 'none';

	//Menu Toggle
	layer.menuToggle = true;


	//Spawn Player
	layer.SpawnLayer();
	//Currently not tracking Player object as it should not be removed
	//Will start using a One instead

	//Update Current Position
	layer.gridPos.copy(auxl.playerRig.GetEl().getAttribute('position'));


	//Default Settings
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

	//Camera Support
	//Scene & Teleportation Camera Controls
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
		let animTimeout;
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
	//Quick Snap Camera Rotation
	//Play Snap View Anim to the Right 45degrees
	const SnapRight45 = () => {
		if(layer.snapRotating){} else {
			layer.snapRotating = true;
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY - 45;
			auxl.playerBody.Animate(anim45Data);
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
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim45Data.from = rotY;
			anim45Data.to = rotY + 45;
			auxl.playerBody.Animate(anim45Data);
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
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY - 90;
			auxl.playerBody.Animate(anim90Data);
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
			let rotY = auxl.playerBody.GetEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY + 90;
			auxl.playerBody.Animate(anim90Data);
			snapTimeout = setTimeout(() => {
				layer.snapRotating = false;
				clearTimeout(snapTimeout);
			}, anim90Data.dur+10);
		}
	}
	//Player Twist
	const TwistTo = (yRot) => {

		//Reset Rotation via playerBody
		let y = auxl.camera.GetEl().getAttribute('rotation').y;
		if(y > 0){
			if(y<360){
				y = y % 360;
			}
		} else if(y < 0){
			if(y < -360){
				y = y % 360;
			}
		}
		let rot = new THREE.Vector3(0,((y*-1)+1)+yRot,0);
		auxl.playerBody.ChangeSelf({property:'rotation',value:rot});
	}
	//Height Toggle
	//Toggle Sitting|Standing View Mode
	const ToggleSittingMode = () => {
		if(layer.animating){} else {
			layer.animating = true;
			if(layer.stand){
				auxl.playerBody.EmitEvent('sit');
				layer.stand = false;
			} else {
				auxl.playerBody.EmitEvent('stand');
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
					auxl.playerBody.EmitEvent('crouchDownStanding');
					layer.standing = false;
				} else {
					let standPos = new THREE.Vector3(0,0,0);
					standPos.copy(layer.gridPos);
					standPos.y += 1;
					if(auxl.map.CheckMapObstaclesDiagonal(standPos,layer.gridPos)){
						auxl.playerBody.EmitEvent('crouchUpStanding');
						layer.standing = true;
					}

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
					auxl.playerBody.EmitEvent('crouchDownSitting');
					layer.standing = false;
				} else {
					let standPos = new THREE.Vector3(0,0,0);
					standPos.copy(layer.gridPos);
					standPos.y += 1;
					if(auxl.map.CheckMapObstaclesDiagonal(standPos,layer.gridPos)){
						auxl.playerBody.EmitEvent('crouchUpSitting');
						layer.standing = true;
					}
				}
				crouchTimeout = setTimeout(function () {
					layer.animating = false;
					clearTimeout(crouchTimeout);
				}, 775);
			}
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

	//UI
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
	//playerFloor.addEventListener('click',ToggleBeltText);
	//Update Belt Text
	const UpdateBeltText = (text) => {
		if(text){
			layer.beltText = text;
		}
		if(layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'text', value:{value: layer.beltText}})
		}

	}
	//Toggle UI Text
	const ToggleVRText = () => {
		layer.vrUI = !layer.vrUI;
		if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight'){
				auxl.vrController2.ChangeSelf({property: 'visible', value: layer.vrUI});
			} else if(auxl.vrHand === 'bothLeft'){
				auxl.vrController1.ChangeSelf({property: 'visible', value: layer.vrUI});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'visible', value: layer.vrUI});
				auxl.vrController2.ChangeSelf({property: 'visible', value: layer.vrUI});
			} else if(auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'visible', value: layer.vrUI});
			} else if(auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'visible', value: layer.vrUI});
			}
		}
	}
	//Update UI Text
	const UpdateUIText = (text) => {
		UpdateSystemText(text);
		if(auxl.controls === 'VR'){
			if(layer.vrUI){
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




	//Body Movement
	//Unlock Locomotion
	const UnlockLocomotion = () => {
		layer.move = true;
	}
	//Lock Locomotion
	const LockLocomotion = () => {
		layer.move = false;
	}
	//Enable VR Controller Joystick Locomotion
	const EnableVRLocomotion = () => {
		RemoveBelt();
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'vr'});
		//UnlockLocomotion();
	}
	//Enable VR Belt UI Locomotion
	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer();
		}
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: 'beltUIParent', courserid: 'mouseController', movetype: 'vrHover'});
		//UnlockLocomotion();
	}
	//Enable Desktop Locomotion
	const EnableDesktopLocomotion = () => {
		RemoveBelt();
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'desktop'});
		//UnlockLocomotion();
	}
	//Enable Mobile Locomotion
	const EnableMobileLocomotion = () => {
		RemoveBelt();
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'mobile'});
		//UnlockLocomotion();
	}
	//Change Locomotion Type
	const ChangeLocomotionType = (type) => {
		if(type.pov){
			layer.moveType.pov = type.pov;
		}
		if(type.axis){
			layer.moveType.axis = type.axis;
		}
		if(type.style){
			layer.moveType.style = type.style;
		}
		auxl.playerRig.GetEl().setAttribute('locomotion',{pov: layer.moveType.pov, axis: layer.moveType.axis, style: layer.moveType.style});
		/*
		pov :
		1st
		3rd

		style :
		free
		grid

		axis :
		posXZ
		posXZY
		posXY
		posXYZ
		posXYZWall
		angleXY
		angleXYZ
		*/
	}
	//Despawn VR Belt UI
	const RemoveBelt = () => {
		if(document.getElementById('beltUIParent')){
			auxl.locomotionUILayer.DespawnLayer();
		}
	}
	//Player Rotation
	const UpdatePlayerRotation = (axisX,axisY,axisZ) => {

		let div = new THREE.Vector3(0,0,0);
		div.x = axisX;
		div.y = axisY;
		div.z = axisZ;

		auxl.playerBody.ChangeSelf({property: 'rotation', value: div});



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
	const UpdatePlayerPosition = (position) => {
		let pos = new THREE.Vector3(0,0,0);
		pos.x = position.x || 0;
		pos.y = position.y || 0;
		pos.z = position.z || 0;
		//Configured to non-physics only currently
		auxl.playerRig.ChangeSelf({property: 'position', value: pos});
		layer.gridPos.copy(pos);
	}


	//Item to body sync
	//Attach to user
	const AttachToPlayer = (element,offset) => {
		let connectPos = new THREE.Vector3(0,0,0);
		if(offset){
			connectPos.x += offset.x;
			connectPos.y += offset.y;
			connectPos.z += offset.z;
		}
		element.setAttribute('sync-pos',{idname: layer.id, position: connectPos});
	}
	//Deattach from user
	const DetachFromPlayer = (element) => {
		element.removeAttribute('sync-pos');
	}


	//Inventory
	//Equip Object|Tool
	const Equip = (object) => {
		let hold = false;
		if(layer.equipped){
			if(object === layer.equippedObject){
				Unequip();
			} else {
				hold = true;
			}
		} else {
			hold = true;
		}
		if(hold){
			layer.equipped = true;
			layer.equippedObject = object;
			let beltText = 'Equipped : ' + auxl[object].name;
			UpdateBeltText(beltText);
		}
	}
	//Unequip Object|Tool
	const Unequip = () => {
		layer.equipped = false;
		layer.equippedObject = 'none';
		UpdateBeltText(auxl.systemText);
	}


	//Important Info
	//Reset User Position/Rotation
	const ResetUserPosRot = () => {
		//Reset Rotation
		auxl.playerRig.ChangeSelf({property: 'position', value: new THREE.Vector3(0,0,1)});
		//Update Grid Position
		layer.gridPos.copy(auxl.playerRig.GetEl().getAttribute('position'));
		//Reset Rotation via playerBody
		let y = auxl.camera.GetEl().getAttribute('rotation').y;
		if(y > 0){
			if(y<360){
				y = y % 360;
			}
		} else if(y < 0){
			if(y < -360){
				y = y % 360;
			}
		}
		auxl.playerBody.ChangeSelf({property:'rotation',value:new THREE.Vector3(0,(y*-1)+1,0)});

	}
	//Get user current infomation
	const GetPlayerInfo = () => {

		return {layer, id: layer.layer.all.parent.core.core.id, pos: auxl.playerRig.GetEl().getAttribute('position'), bodyRot: auxl.playerBody.GetEl().getAttribute('rotation'), headRot: auxl.camera.GetEl().getAttribute('rotation'), grid:layer.gridPos};
	}
	//System Menu
	//Toggle Companion | Menu Back
	const MainMenuAction = () => {
		//if comp is spawned
		if(layer.menuToggle){
			layer.menuToggle = false;
			let toggleTimeout = setTimeout(() => {
				layer.menuToggle = true;
				clearTimeout(toggleTimeout);
			}, 350);
			if(auxl.comp.comp.inScene){
				if(auxl.mainMenu.multiMenu.menuOpen){
					auxl.mainMenu.ToggleMenu();
				} else {
					auxl.comp.DespawnComp();
				}
			} else {
				auxl.comp.SpawnComp();
			}
		}
	}
	//Distance from Player
	const DistanceFromPlayer = (position) => {
		let distance = position.distanceTo(GetPlayerInfo().pos);
		return distance;
	}
	//Get Camera Direction
	const GetCameraDirection = () => {
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		auxl.camera.GetEl().object3D.getWorldDirection(direction);
		return direction;
/*
		//Calculate the position based on the direction and distance
		let distance = 1;
		let position = new THREE.Vector3();
		position.copy(camera.object3D.position).add(new THREE.Vector3(direction.x, direction.y, direction.z).normalize().multiplyScalar(distance));
console.log(position)
		return position;
*/
	}
	//Point Along Axis
	const PointAlongAxis = (rayRot,distance) => {
		let position = new THREE.Vector3();
		position.copy(rayRot).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
		return position;
	}
	//Ray Point along Axis
	const RayDistanceTo = (point, distance) => {
		let rayCheck = DistanceFromPlayer(point)
		console.log(rayCheck)
		if(rayCheck <= distance){
			let position = new THREE.Vector3();
			position.copy(point);
			return position;
		} else {
			return false;
		}
	}
	//Intersection point check distance or not
	const MoveDir = (distance) => {
	//Calculate the position based on the direction and distance
		let position = new THREE.Vector3();
		position.copy(GetCameraDirection());
		position.copy(position).add(new THREE.Vector3(layer.distance, layer.distance, layer.distance).normalize().multiplyScalar(layer.distance));
		return position;
	}


	layer.tracking = false;
	layer.track2DInterval;
	//Determine 2D Ground Floor
	const Track2D = () => {
//console.log('Tracking')
//console.log(intInit)
		let start = layer.raycaster.intersection || new THREE.Vector3(0,0,0);
		if(start.equals(new THREE.Vector3(0,0,0))){
			return;
		}
		let intersection = new THREE.Vector3(0,0,0);
		//let getr = new THREE.Vector3(0,0,0);
		//Now that we have the starter point determine the general direction be capture 1 additional point differnt that confirm the direction		layer.tracking = true;

		//Earth Default Axis
		layer.worldAxis = new THREE.Vector3(0,-1,0);
		layer.track2DInterval = setInterval(() => {
			if(layer.tracking){
				//grab raycaster information and grab intersection, if different then calc it's direction from and update player gravityAxis
				intersection.copy(auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
				if(!start.equals(intersection)){
					//calc out which variable is the same and determine its negative or positive direction based on the location offset of player
					if(start.x.toFixed(2) === intersection.x.toFixed(2)){
//console.log('X')
						if(start.x > 0){
//console.log('+X')
							layer.worldAxis = new THREE.Vector3(1,0,0);
						} else {
//console.log('-X')
							layer.worldAxis = new THREE.Vector3(-1,0,0);
						}
					} else if(start.y.toFixed(2) === intersection.y.toFixed(2)){
//console.log('Y')
						if(start.y > 0){
//console.log('+Y')
							layer.worldAxis = new THREE.Vector3(0,-1,0);
						} else {
//console.log('-Y')
							layer.worldAxis = new THREE.Vector3(0,1,0);
						}
					} if(start.z.toFixed(2) === intersection.z.toFixed(2)){
//console.log('Z')
						if(start.z > 0){
//console.log('+Z')
							layer.worldAxis = new THREE.Vector3(0,0,1);
						} else {
//console.log('-Z')
							layer.worldAxis = new THREE.Vector3(0,0,-1);
						}
					} else {
						//console.log('Cannot Calculate')
						//console.log(start)
						//console.log(intersection)
					}
					//console.log(start)
					//console.log(intersection)
					//console.log(layer.worldAxis)
					//layer.gravitys
					//layer.worldAxis = 
layer.localAxis.copy(layer.worldAxis);
//Rotate player rig body accordingly
if(!layer.worldAxis.equals(new THREE.Vector3(0,0,0))){
console.log({GravitationalAxisChange: layer.worldAxis})
}
					layer.tracking = false;
					clearInterval(layer.track2DInterval);
				}
				//auxl.mouseController.GetEl().components.raycaster.direction AXIS
				//console.log(auxl.mouseController.GetEl().components.raycaster)
			}
		}, 1);

	}

		//Track2D();



	uniRay.raycaster = {};
	uniRay.raycaster.name = 'minty0';
	uniRay.raycaster.intersection = new THREE.Vector3(0,0,0);
	uniRay.raycaster.powers = {};
	uniRay.raycaster.power = 'rubberband';
	//Temp
	layer.raycaster = {};
	layer.raycaster.name = 'minty0';
	layer.raycaster.intersection = uniRay.raycaster.intersection;
	layer.raycaster.powers = {};
	layer.raycaster.power = 'rubberband';


	//
	//Events

	//Sync Link To Intersection point
	//Add to UniRay
	//Migrate to UniRay
	//Main Trigger Click Controls
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

	//Ticker
	const Ticker = () => {
		if(auxl.mouseController.GetEl()){
			if(auxl.mouseController.GetEl().components.raycaster.intersections.length > 0){
				layer.raycaster.intersection = new THREE.Vector3(0,0,0);
				layer.raycaster.intersection.copy(auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
				if(layer.distance <= auxl.mouseController.GetEl().components.raycaster.intersections[0].distance){
					//layer.raycaster.intersection
				//generate point along axis as far as distance and update

				}
			} 
		}
		if(layer.raycaster.intersection){
			//console.log(layer.raycaster.intersection)
			uniRay.anchorCore.ChangeSelf({property: 'position', value: layer.raycaster.intersection})
			if(!uniRay.anchorCore.core.inScene){
				uniRay.anchorCore.SpawnCore();
			}
		}

	}

	//Raycaster Tick
	const RayTick = (event) => {
	//const RayTick = (event, el) => {
/*
if(event){
console.log(event)
}
*/
//console.log(el)
		//this.activeEl = el || false;
		//console.log(event)
		if(event && event.detail && event.detail.intersection){
			layer.raycaster.intersection = new THREE.Vector3(0,0,0);
			layer.raycaster.intersection.copy(event.detail.intersection.point)
	   } else {
		   layer.raycaster.intersection = false;
	   }
if(layer.raycaster.intersection){
	//console.log(layer.raycaster.intersection)
	uniRay.anchorCore.ChangeSelf({property: 'position', value: layer.raycaster.intersection})
	if(!uniRay.anchorCore.core.inScene){
		uniRay.anchorCore.SpawnCore();
	}
}
		//layer.power
		//layer.power.Tick(event);
/*
		//Temp Power Loops
		if(layer.toggle0){
			RubberbandController();
		} else if(layer.toggle1){
			RubberbandSlamController();
		} else if(layer.toggle2){
			teleportController();
		} else if(layer.toggle3){
		} else {
		}
*/

	}

//Use component as tick runner instead
/*
layer.raycaster.interval = setInterval((event) => {
	RayTick(event);
}, 1);
*/
	//Trigger, Click, Mouse Enter
	const TriggerFree = (event) => {
		//layer.power.Free(event);
		//console.log(event.detail.intersection.point)
	}

	//Trigger, Click, Mouse Enter
	const TriggerEnter = (event) => {
		//layer.power.Enter(event);

		//console.log(event)
		RayTick(event);
		//console.log(intersection)

		//Determine the 2D plane in 3D grid system as floor
		//Track2D();

		//console.log(event.detail.intersection.point)
	}

	//Trigger, Click, Mouse Leave
	const TriggerLeave = (event) => {
		//layer.power.Leave(event);
		//console.log(event)
		RayTick(event);
		//console.log(event)
		//clearInterval(layer.track2DInterval);
	}

	//Trigger, Click, Mouse Down
	const TriggerDown = (event) => {
		//layer.power.Down(event);
//Toggles to control which powers type of click main/alt
		RayTick(event);

		//Temp Toggle Powers
		//Temp
		if(layer.toggle0){
			RubberbandDown();
		} else if(layer.toggle1){
			RubberbandSlamDown();
		} else if(layer.toggle2){
			teleportDown();
		} else if(layer.toggle3){
			ChuteDown()
		} else if(layer.toggle4){
			BoostDown()
		} else if(layer.toggle5){
			BackBoostDown()
		} else {
		}

	}
	//Trigger, Click, Mouse Up
	const TriggerUp = (event) => {
		//layer.power.Up(event);
		//console.log(event)
		RayTick(event);

		//Temp Toggle Powers
		//Temp
		if(layer.toggle0){
			RubberbandUp();
		} else if(layer.toggle1){
			RubberbandSlamUp();
		} else if(layer.toggle2){
			teleportUp();
		} else if(layer.toggle3){
			ChuteUp()
		} else if(layer.toggle4){
			BoostUp()
		} else if(layer.toggle5){
			BackBoostUp()
		} else {
		}
	}

	//Sets up Trigger, Click, Mouse Events
	const MouseEvents = (event) => {
//technically headcursor/mouse/gyro/trackpad/joystick
auxl.mouseController.GetEl().addEventListener('mouseleave', TriggerLeave(event));
auxl.mouseController.GetEl().addEventListener('mouseenter', TriggerEnter(event));
auxl.mouseController.GetEl().addEventListener('mousedown', TriggerDown(event));
auxl.mouseController.GetEl().addEventListener('mouseup', TriggerUp(event));
	}
	MouseEvents();

	//Toggle Actions
	const ToggleAction = (toggle) => {
		layer.toggle0 = false;
		layer.toggle1 = false;
		layer.toggle2 = false;
		layer.toggle3 = false;
		layer.toggle4 = false;
		layer.toggle5 = false;
		if(toggle === '0'){
			layer.toggle0 = true;
		} else if(toggle === '1'){
			layer.toggle1 = true;
		} else if(toggle === '2'){
			layer.toggle2 = true;
		} else if(toggle === '3'){
			layer.toggle3 = true;
		} else if(toggle === '4'){
			layer.toggle4 = true;
		} else if(toggle === '5'){
			layer.toggle5 = true;
		} else {
			Delink();
		}
/*
console.log({
toggle,
	tog0:layer.toggle0,
	tog1:layer.toggle1,
	tog2:layer.toggle2,
	tog3:layer.toggle3,
})
*/
	}



	//
	//Enable Physics

	//!!!!
	//Migrate to a One Controlled Object
	//!!!!

	//
	//Physics
	layer.playerPhysics = false;

	//Players Gravity

	//Earth Default
	layer.worldGravity = new THREE.Vector3(0,-9.8,0);
	layer.localAxis = new THREE.Vector3(0,0,0);
	layer.worldAxis = new THREE.Vector3(0,-1,0);
	//Float
	//layer.worldGravity = new THREE.Vector3(0,0,0);
	layer.gravity = new THREE.Vector3(0,0,0);
	layer.axis = new THREE.Vector3(0,-1,0);
	layer.gravity.copy(layer.worldGravity);

	//Joystick Movement Type
	layer.physMove = true;
	//impulse affetect by physics engine
	//position, not affected by physics engine

	//Belongs in One attached object and handled by that function
	//Allow Jump
	layer.jumping = false;
	layer.jumpTimeout;

	//Each raycaster hand will have a 4 directional toggleable light sword. Directions make it go from sword, to claws, to sheild, to dagger.

	//Rig Attributes for Body, Head will be handled by UniRay

	//Convert Gravity to be it's own component and function

	//Test Backup
	let bodyBackup = {
		name: 'testingBodyv0.1',
		type: 'dynamic', 
		shape: 'none',
		mass: 1,
		angularDamping: 0.5,
		linearDamping: 0.15,
		friction : 0.1,
		restitution : 1
	};
	//Test Body 1
	let playerTestBody1 = {
		name: 'playerTestBody0.1',
		type: 'dynamic', 
		shape: 'none',
		//mass: 3,
		mass: 2,
		//mass: 1,
		//mass: 1,
		//mass: 50,
		angularDamping: 0.2,
		linearDamping: 0.15,
		friction : 0.1,
		restitution : 1
	};
	//All Player Body Styles
	let bodyStyles = {};
	bodyStyles.default = playerTestBody1;
	//Assign current body type
	layer.body = bodyStyles.default;

	//Test Backup
	let shapeBackup = {
		name: 'testingShapev0.1',
		type: 'dynamic', 
		shape: 'none',
		mass: 1,
		angularDamping: 0.5,
		linearDamping: 0.15,
		friction : 0.1,
		restitution : 1
	};
	//Test Shape 1
	let testShape1 = {
		name: 'testingShapev0.1',
		shape: 'cylinder',
		height: 1.8,
		radiusTop: 0.5,
		radiusBottom: 0.5,
		offset: '0 0.9 0',
	};
	//All
	let shapeStyles = {};
	shapeStyles.default = testShape1;
	//Assign current body type
	layer.shape = shapeStyles.default;

	//Avatar
	//Testing One Phys Object
	layer.bodyOneData = {
	data:'bodyOneData',
	id:'bodyOne',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 0.25, depth: 0.25, height: 0.25},
	material: {shader: "standard", color: "#f08f1d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#f08f1d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '4 4'},
	position: new THREE.Vector3(0,10,-3),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: false,
	};
	layer.bodyOne = auxl.Core(layer.bodyOneData);

	layer.bodyOnePhysData = {
		type : 'dynamic',
		shape : 'box',
		mass : 0.1,
		friction : 0,
		restitution : 0,
		connectTo : false,
		restLength : 0,
		damping : 0,
		stiffness : 0,
	}
	layer.oneTest0One = auxl.One(layer.bodyOne, layer.bodyOnePhysData);

/*
	//Hands - These will be UniRays that attach to parent vehicle
	layer.handBody = {type: 'dynamic', shape: 'none', mass: 0.1};
	//layer.handShape = {shape: 'box', height: 0.01, width: 0.01, depth: 0.01, offset: '0 1 -0.5',};
	layer.hand1Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '0.5 1 -0.5',};
	layer.hand2Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '-0.5 1 -0.5',};
*/


	//Enable Powers
	const EnablePhysics = (bodyShape) => {
		if(bodyShape?.body){
			layer.body = bodyShape.body;
		}
		if(bodyShape?.shape){
			layer.shape = bodyShape.shape;
		}
		//Add Avatar Body
		auxl.playerRig.EnablePhysics({body: layer.body, shape: layer.shape});
		//Update Easy Access Body for Changes
		layer.worldBody = auxl.playerRig.GetEl().body;
		//Temp
		//Load at start of power with power related data
		//Link();
		//RubberbandStart();
		//RubberbandSlamStart();
		//teleportStart();
		PowerController();
		//Linked component
		//auxl.mouseController.GetEl().setAttribute('playerlink');

//console.log(auxl.mouseController.GetEl())
		//auxl.playerRig.GetEl().setAttribute('staticsync',{auxlObj: 'playerRig'});
//ChangeLocomotionType({pov: '1st',axis: 'posXZY',style: 'free'})

		/*
		pov :
		1st
		3rd

		style :
		free
		grid

		axis :
		posXZ
		posXZY
		posXY
		posXYZ
		posXYZWall
		angleXY
		angleXYZ
		*/

		//auxl.playerRig.GetEl().setAttribute('shape__hand1',layer.handShape);

		//auxl.playerRig.GetEl().setAttribute('shape__hand2',layer.hand2Shape);
		layer.playerPhysics = true;
		auxl.playerRig.ChangeSelf({property:'bodymaterial', value: {friction:0.01, restitution:0.01}});
		auxl.playerRig.ChangeSelf({property:'collision', value: null});

		//Disable Rotation for now replace with Gimbal component
		auxl.playerRig.GetEl().body.fixedRotation = true;
		auxl.playerRig.GetEl().body.updateMassProperties();
		//when disabled, will need to move the main head/body when rotated

		//Add Hand
		//auxl.camera.EnablePhysics({body: layer.handBody, shape: layer.handShape});

		//Sync Camera Movement to Phys
		//auxl.camera.ChangeSelf({property: 'camerasync', value: null});

		//Connect Hand to Body
		//auxl.camera.ChangeSelf({property: 'auxconstraint__hand', value: {type: 'pointToPoint', pivotB: new THREE.Vector3(0,1.6,0), connectTo: 'playerRig', maxForce: 1e6, collideConnected: false}});
	}
	//Phys Jump
	const PhysJump = (velocity) => {
		if(!layer.jumping){
			layer.jumping = true;
			if(!velocity){
				velocity = 5;
			}
			auxl.playerRig.GetEl().body.velocity.y = velocity;
			//use localAxis to multiple point the direction of the velocity which would be opposite if the current axis
		}
	}
	//Phys Jump Reset
    auxl.playerRig.GetEl().addEventListener("collide",function(e){
    	const contactNormal = new CANNON.Vec3();
    	const upAxis = new CANNON.Vec3(0,1,0);
        const contact = e.detail.contact;
        if(contact.bi.id == auxl.playerRig.GetEl().body.id){
            contact.ni.negate(contactNormal);
		} else {
            contactNormal.copy(contact.ni);
		}
        if(contactNormal.dot(upAxis) > 0.5){
			layer.jumping = false;
		}
    });
	//Phys Boost
	const PhysBoost = (velocity) => {
		if(!velocity){
			velocity = 10;
		}
		auxl.playerRig.GetEl().body.velocity.y = velocity;
	}
	//Phys Dash
	const PhysDash = (direction,velocity) => {
		if(!direction){
			direction = 'reverse';
		}
		if(!velocity){
			velocity = 10;
		}
		//Works the best with friction
		auxl.playerRig.GetEl().body.applyLocalImpulse(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));

		//auxl.playerRig.GetEl().body.applyImpulse(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//auxl.playerRig.GetEl().body.applyForce(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//auxl.playerRig.GetEl().body.applyLocalForce(new THREE.Vector3(30,0,0),new THREE.Vector3(0,0,0));
		//auxl.playerRig.GetEl().components.locomotion.directionXZ(direction, velocity,)
	}
	//Outdated, controlled in Gravity()
	//Low Grav
	const LowGrav = () => {
		//auxl.playerRig.GetEl().body.applyLocalForce(new THREE.Vector3(0,4.8,0),new THREE.Vector3(0,0,0));
//applying a small (less than gravity) upward force every tick. 
	}
	//Phys Pickup
	const PhysPickup = (object) => {
		//auxl.camera.ChangeSelf({property: 'auxconstraint__'+object, value: {type: 'lock', connectTo: object, maxForce: 1e6, collideConnected: false}});
	}
	//Phys Drop
	const PhysDrop = (object) => {
		//auxl.camera.RemoveComponent('auxconstraint__'+object);
	}

	//Player Forward Position going forward will be a trigger / grip action
	const Forward = (speed, div) => {
		return div += layer.speed;
	}
	//Speed
	const Speed = (velocity) => {
		layer.speed = velocity;

	}


	//Make this its own component and use with One
	//
	//Gravity
	layer.gravityStyle = 'earth';
	//layer.gravityStyle = 'jupiter';
	//layer.gravityStyle = 'Custom';
	//To be able to apply new gravity direction on playerRig
	//Gravity Loop Tick
	//Velocity
	//layer.velocityStyle = 'anomaly';
	//layer.currentVelocity = 7;
	layer.velocityStyle = 'slam';
	layer.currentVelocity = 30;

	//layer.velocityStyle = 'float';
	//layer.currentVelocity = 1000;
//I dont think I need to use localImpluse when I can just update it's velocity which is a world run function

	const Gravity = (gravityDir) => {
		//first get current world gravity to negate and start with
		//then add propery gravity offset this.el.body.applyLocalForce(new THREE.Vector3(0,9.8,0),new THREE.Vector3(0,0,0))
		//in the direction of the currently calculated trajectory
		//Reset current
	//layer.gravity = new THREE.Vector3(0,0,0);
	//layer.axis = new THREE.Vector3(0,-1,0);

		//6 Directions & Free Roam
		layer.gravitys = [
			new THREE.Vector3(0,0,0),
			new THREE.Vector3(0,-1,0),
			new THREE.Vector3(-1,0,0),
			new THREE.Vector3(0,0,-1),
			new THREE.Vector3(0,1,0),
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(0,0,1),
		];

		//Gravity Orientation Detection
		//Grab start pos at mouseEnter
		//Grab enough via tick to determine the axis direction between 1 of the 6
		//Apply that to the player rig via tick unless float is enabled in whichcase, only apply the new gravity with just negateGravity

		let playerPositionOld = new THREE.Vector3(0,0,0);
		let playerPosition = new THREE.Vector3(0,0,0);
		layer.velocity = new THREE.Vector3(0,0,0);
		let velocityTick = 0
let testVec = new THREE.Vector3(0,0,0);

		layer.playerGravityInterval = setInterval(() => {
			if(auxl.playerRig.GetEl() && auxl.playerRig.GetEl().body){

				let negateGravity = new THREE.Vector3(0,0,0);
				
//Get Velocity Working on continual downward localAxis trajectory
				playerPosition.copy(auxl.playerRig.GetEl().body.position)
//console.log({pos1: playerPosition.y, pos2 : playerPositionOld.y})

//Check proper axis and amount
//layer.localAxis
				let velocityDir = new THREE.Vector3(0,0,0);
				let addVelocity = false;
				if(layer.worldAxis.x !== 0){
					if(layer.worldAxis.x < 0){
						if(playerPosition.x < playerPositionOld.x){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.x > playerPositionOld.x){
							//Add velocity
							addVelocity = true;
						}
					}
				} else if(layer.worldAxis.y !== 0){
					if(layer.worldAxis.y < 0){
						if(playerPosition.y < playerPositionOld.y){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.y > playerPositionOld.y){
							//Add velocity
							addVelocity = true;
						}
					}
				} else if(layer.worldAxis.z !== 0){
					if(layer.worldAxis.z < 0){
						if(playerPosition.z < playerPositionOld.z){
							//Add velocity
							addVelocity = true;
						}
					} else {
						if(playerPosition.z > playerPositionOld.z){
							//Add velocity
							addVelocity = true;
						}
					}
				}

//Measure specific axis and greater and less then checks
//Velocity will always be down Y
				if(addVelocity){
				//if(playerPosition.y < playerPositionOld.y){
					//add velocity to fall
					velocityTick++;
//console.log(layer.velocity)
console.log('Adding Velocity')
//console.log(auxl.playerRig.GetEl().body.velocity)
let velocityNew = new THREE.Vector3((velocityTick/layer.currentVelocity),(velocityTick/layer.currentVelocity),(velocityTick/layer.currentVelocity));
velocityNew.multiply(layer.localAxis)
auxl.playerRig.GetEl().body.velocity.x += velocityNew.x;
auxl.playerRig.GetEl().body.velocity.y += velocityNew.y;
auxl.playerRig.GetEl().body.velocity.z += velocityNew.z;
//auxl.playerRig.GetEl().body.velocity.y -= velocityTick/25;
//layer.velocity.sub(new THREE.Vector3(0,(velocityTick/100),0));
//layer.velocity.add(0.01)
//let velocityNew = new THREE.Vector3((velocityTick/100),(velocityTick/100),(velocityTick/100));
//velocityNew.multiply(layer.localAxis)
//layer.velocity.add(velocityNew);
				} else {
					layer.velocity = new THREE.Vector3(0,0,0);
					velocityTick = 0;
				}
if(layer.toggle3){
	velocityTick = 0;
}
//if parachuting, then no velocity
//add momentum
				playerPositionOld.copy(playerPosition);
				//let worldGravity = new THREE.Vector3(0,0,0);
				//Apply Gravity
				if(!negateGravity.equals(auxl.playerRig.GetEl().body.world.gravity)){
					//update base gravity to build cancel out world defaults if any
					negateGravity.copy(auxl.playerRig.GetEl().body.world.gravity);
					//Calculate exact opposite to null out world defaults
					negateGravity.negate();
				}
				//Gravity Adjustments
				layer.gravityScale = new THREE.Vector3(1,1,1);

				//Fresh to Apply Gravity
				let gravityNew = new THREE.Vector3(0,0,0);
				//Negate World Gravity if Any
				gravityNew.copy(negateGravity);
//console.log(gravityNew)
		//console.log(auxl.playerRig.el.body.world.gravity)
		//console.log(gravityNew)

		//Earth 1g = 9.80665 m/s
		//Moon 0.1657g
		//Jupiter 2.528g
		//IO 0.183g
		//Mars 0.379g
		//Uranus 0.886g
		//Neptune 1.137g
		//Sun 28.02g
		//Pluto 0.063g
		//Saturn 1.065g
				let gravityAmount = 0;
				if(layer.gravityStyle === 'float'){
					//Negate World Gravity
				} else if(layer.gravityStyle === 'earth'){
					//Earth AU
					//Apply -9.8 in 1 direction of axis
//console.log(layer.gravityStyle)
					gravityAmount = 9.8;
				} else if(layer.gravityStyle === 'moon'){
					//Moon AU 16.% of Earth
					//Apply -1.6268 in 1 direction of axis
					gravityAmount = 1.6268;
				} else if(layer.gravityStyle === 'jupiter'){
					//Jupiter AU
					//Apply -24.7912112 in 1 direction of axis
					gravityAmount = 24.7912112;
				} else if(layer.gravityStyle === 'io'){

				} else if(layer.gravityStyle === 'mars'){

				} else if(layer.gravityStyle === 'Uranus'){

				} else if(layer.gravityStyle === 'Neptune'){

				} else if(layer.gravityStyle === 'Sun'){

				} else if(layer.gravityStyle === 'Pluto'){

				} else if(layer.gravityStyle === 'Saturn'){

				} else if(layer.gravityStyle === 'Custom'){
					//gravityAmount = 16;
					gravityAmount = 12;
				}



//console.log(gravityAmount)
				let gravityTemplate = new THREE.Vector3(0,0,0);
				gravityTemplate = new THREE.Vector3(gravityAmount,gravityAmount,gravityAmount);
//console.log(gravityTemplate)
				gravityNew.add(gravityTemplate);
//console.log(gravityNew)
//console.log(layer.localAxis)
				//Set gravity to worldVrctor from Axis
				gravityNew.multiply(layer.localAxis);
//console.log(gravityNew)
				//Gravity Scale
				gravityNew.multiply(layer.gravityScale);
				//Add Up Velocity
//console.log(gravityNew)
				//gravityNew.add(layer.velocity);
//console.log(gravityNew)
				//Apply Gravity
				//auxl.playerRig.GetEl().body.applyLocalForce(gravityNew, new THREE.Vector3(0,0,0));
				//auxl.playerRig.GetEl().body.applyLocalForce(gravityNew, new THREE.Vector3(0,0,0));
				auxl.playerRig.GetEl().body.velocity.x += gravityNew.x/50;
				auxl.playerRig.GetEl().body.velocity.y += gravityNew.y/50;
				auxl.playerRig.GetEl().body.velocity.z += gravityNew.z/50;


				//auxl.playerRig.GetEl().body.applyLocalForce(new THREE.Vector3(0,100,0), new THREE.Vector3(0,0,0));
				layer.gravity.copy(gravityNew);
//console.log(gravityNew)
			}
		}, 1);
	}
	let testTimeoutStart = setTimeout(() => {
		Gravity();
		clearTimeout(testTimeoutStart)
	}, 1000);

	//Cursor|Link
	//VR Dual 6Dof Controller Raycaster
	//
	//Extend from raycaster
	//Object Intersecting
	//Object synced attached to raycaster movement/rotation
	const Link = (data) => {
		//Currently setup for a single link to player
		//Link
		layer.distance = 40;
		//Need a system for building link to self, link to link and link to links
		//Link Controller
		auxl.linkHoverMenuData = {
		info:{
			id: 'linkHoverMenu',
			buttonData: auxl.menuCylinderData,
			hoverData: auxl.menuHoverData,
			title: 'Link Hover Menu',
			description: 'A link hover menu for quick access.',
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
				title: 'Rubber',
				description: 'Launch yourself at link.',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'rubber',
					menu: 'close',
				},
			},
			button1:{
				id: 'action2',
				style: false,
				title: 'Power',
				description: 'Swing from a far current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'power',
					menu: 'close',
				},
			},
	/*
			button2:{
				id: 'action3',
				style: false,
				title: 'Weak',
				description: 'Connect from short current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'weak',
					menu: 'close',
				},
			},
	*/
	/*
			button3:{
				id: 'action4',
				style: false,
				title: 'Mid',
				description: 'Connect from mid current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'mid',
					menu: 'close',
				},
			},
	*/
			button4:{
				id: 'action5',
				style: false,
				title: 'Swing',
				description: 'Swing from current distance',
				subMenu: false,
				action: {
					auxlObj: 'player',
					component: false,
					method: 'LinkControls',
					params: 'swing',
					menu: 'close',
				},
			},
		},
		};
		auxl.linkHoverMenu = auxl.HoverMenu(auxl.linkHoverMenuData);

		let maxLinkLength = 30;
		layer.linkLength = 1;
		//2 Modes 
		//Link to Self
		//Link to Other

		//Get 1 link tp self working for now

		//Link
		let linkData = {
			data:'linkData',
			id: 'linkCore',
			sources: false,
			text: false,
			geometry: {primitive: 'sphere', radius: 0.5,},
			material: {shader: "standard", color: "#ebd107", emissive: '#ebd107', emissiveIntensity: 0.25, opacity: 0.75},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: {
				body:{type: 'static', shape: 'none', mass: 0,},
				bodymaterial: {friction: 0, restitution: 0},
	/*
				auxspring:{
					connectTo: 'playerRig',
					restLength: 1,
					damping: 0.5,
					stiffness: 10,
					collideConnected: false,
					always: true,
				},
				*/
			},
		};
		//let name = 'magLink' + Object.keys(layer.links).length;
		layer.linkCore = auxl.Core(auxl.coreDataFromTemplate(linkData, false, true));
		layer.linkConfig = {
			type: 'auxspring',
			to: 'playerRig',
			minOneLength: 0,
			maxOneLength: 30,
			restLength: 1,
			damping: 0.5,
			stiffness: 10,
		};
		layer.linkCoreConstraint = auxl.Constraints(layer.linkCore, layer.linkConfig, false)
		layer.linkCoreType = 'rubber';

		//Anchor Core
		let anchorData = {
			data:'anchorData',
			id: 'anchorCore',
			sources: false,
			text: false,
			geometry: {primitive: 'sphere', radius: 0.5,},
			material: {shader: "standard", color: "#eb07bf", emissive: '#eb07bf', emissiveIntensity: 0.25, opacity: 0.5},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: false,
		};
		uniRay.anchorCore = auxl.Core(anchorData);

		const LinkControls = (template) => {
			layer.linkCoreType = template;
			if(layer.linkCoreType === 'rubber'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 20,
					restLength: 0,
					damping: 0.0001,
					stiffness: 1000,
				}
			} else if(layer.linkCoreType === 'power'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 40,
					restLength: 3,
					damping: 0.5,
					stiffness: 100,
				}
			} else if(layer.linkCoreType === 'swing'){
				layer.linkConfig = {
					type: 'auxspring',
					to: 'playerRig',
					minOneLength: 0,
					maxOneLength: 100,
					restLength: 1,
					damping: 0.3,
					stiffness: 100,
				}
			}
			layer.linkCoreConstraint.Update(layer.linkConfig);
		}

		layer.linkInterval;
	}
	Link();
	console.log('Link ran')

	//Add to playerRig a support component for updating important info
	//Power Controller
	const PowerController = (event) => {
console.log({event: 'Power Controller Running', event})
		//depending on the event input run power section
//layer.raycaster.powers.forEach(power => power.start())
for(let power in layer.raycaster.powers){
console.log(power)
}

	}

	//
	//Actions

	//Main Input Function
	//Get Ray Data

	//Using raycaster, point click and hold to map out the 2D surface, just a flick basically to determine dual xyz coords to have a force applied to the object as if it wore normal gravity.

	//Monkeyball Sphere Pin Float Vehicle
	//Pin an object with low rubber band pool and float the user. Use can tug themselves in various directions with the environment sphere 

	//Both need to connect to closest intersection object if instead

	//spin object
	//el.body.torque.y += 100;

	//Rubber Controller
	const RubberbandController = (event) => {
		//Rubber Tick Controls
console.log('Rubberband running')
	}
	//Rubberband
	const RubberbandUp = (event) => {
		if(layer.toggle0){
//console.log(event)
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			//console.log('RubberbandUp')
			clearInterval(layer.playerLinkInt);
	//instead of event.detail.intersection.point
	//get camera/hand direction and multiple by distance
	//always a set distance?

	//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead

			layer.building = false;
			layer.power /= 1000;
			layer.positionNew = new THREE.Vector3();
			layer.position = new THREE.Vector3();
			layer.quaternion = new THREE.Quaternion();
			//layer.position.copy(GetCameraDirection());
			layer.object3D = auxl.camera.GetEl().object3D;
			layer.quaternion.copy(layer.object3D.quaternion);
			layer.position.copy(auxl.playerRig.GetEl().body.position);

		//console.log(auxl.camera.GetEl().Object3D.getWorldDirection())
		//layer.position.copy(auxl.camera.GetEl().object3D.getLocalDirection()));
		//console.log(layer.quaternion)
		//console.log(layer.position)
				//layer.position.negate();
		//console.log(layer.position)
			// Step 1: Get the Object3D's rotation as a Quaternion
			const rotationQuaternion = layer.quaternion.clone();
			// Step 2: Create a direction vector pointing towards the positive Z-axis
			const direction = new THREE.Vector3(0, 0, -1);
		//console.log(direction)
			// Step 3: Apply the object's rotation to the direction vector
			direction.applyQuaternion(rotationQuaternion);
		//console.log(direction)
		//console.log(layer.distance)
			// Step 4: Scale the direction vector to the desired distance
			direction.multiplyScalar(layer.distance);
		//console.log(direction)
			// Step 5: Add the scaled direction vector to the Object3D's position
			layer.positionNew = layer.position.clone().add(direction);
				//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	//console.log(layer.positionNew)
	//console.log(layer.distance)
	//console.log(layer.power)
			auxl.player.LinkTo(layer.positionNew, layer.power);
		}
	}
	//Rubberband
	const RubberbandDown = (event) => {
		if(layer.toggle0){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power >= 15){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}
			}, 1);
		}
	}
//console.log(powerRubberband)
	//
	//A Rubber Band Slam
	//Quick pull towards the point and decrease the restLength
	//Rubber Controller
	const RubberbandSlamController = (event) => {
		//Rubber Tick Controls
console.log('Rubberband Slam running')
	}
	//Rubberband
	const RubberbandSlamUp = (event) => {
if(layer.toggle1){
	//console.log(event)
	//console.log('Link')
	//console.log(this.data.type)
	//console.log(event)
	//console.log('click')
	clearInterval(layer.playerLinkInt);
//instead of event.detail.intersection.point
//get camera/hand direction and multiple by distance
//always a set distance?

//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead

	layer.building = false;
	layer.power /= 1000;
	layer.positionNew = new THREE.Vector3();
	layer.position = new THREE.Vector3();
	layer.quaternion = new THREE.Quaternion();
	//layer.position.copy(GetCameraDirection());
	layer.object3D = auxl.camera.GetEl().object3D;
	layer.quaternion.copy(layer.object3D.quaternion);
	layer.position.copy(auxl.playerRig.GetEl().body.position);

//console.log(auxl.camera.GetEl().Object3D.getWorldDirection())
//layer.position.copy(auxl.camera.GetEl().object3D.getLocalDirection()));
//console.log(layer.quaternion)
//console.log(layer.position)
	//layer.position.negate();
//console.log(layer.position)
// Step 1: Get the Object3D's rotation as a Quaternion
const rotationQuaternion = layer.quaternion.clone();
// Step 2: Create a direction vector pointing towards the positive Z-axis
const direction = new THREE.Vector3(0, 0, -1);
//console.log(direction)
// Step 3: Apply the object's rotation to the direction vector
direction.applyQuaternion(rotationQuaternion);
//console.log(direction)
//console.log(layer.distance)
// Step 4: Scale the direction vector to the desired distance
direction.multiplyScalar(layer.distance);
//console.log(direction)
// Step 5: Add the scaled direction vector to the Object3D's position
layer.positionNew = layer.position.clone().add(direction);
	//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
//console.log(layer.positionNew)
//console.log(layer.distance)
//console.log(layer.power)
	auxl.player.SlamTo(layer.positionNew, layer.power, layer.distance);



		}
	}
	//Rubberband
	const RubberbandSlamDown = (event) => {
		if(layer.toggle1){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}



	//Teleport
	//teleportController Controller
	const teleportController = (event) => {
		//Rubber Tick Controls
console.log('Rubberband running')
	}
	//teleportUp
	const teleportUp = (event) => {
		if(layer.toggle3){
//console.log(event)
		//layer.distance = 50;
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			//console.log('teleportUp')
			clearInterval(layer.playerLinkInt);
	//instead of event.detail.intersection.point
	//get camera/hand direction and multiple by distance
	//always a set distance?

	//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead
	//layer.worldAxis = new THREE.Vector3(0,-1,0);
			layer.building = false;
			layer.power /= 1000;
			layer.positionNew = new THREE.Vector3();
			layer.position = new THREE.Vector3();
			layer.quaternion = new THREE.Quaternion();
			//layer.position.copy(GetCameraDirection());
			layer.object3D = auxl.camera.GetEl().object3D;
			layer.quaternion.copy(layer.object3D.quaternion);
			layer.position.copy(auxl.playerRig.GetEl().body.position);

		//console.log(auxl.camera.GetEl().Object3D.getWorldDirection())
		//layer.position.copy(auxl.camera.GetEl().object3D.getLocalDirection()));
		//console.log(layer.quaternion)
		//console.log(layer.position)
				//layer.position.negate();
		//console.log(layer.position)
			// Step 1: Get the Object3D's rotation as a Quaternion
			const rotationQuaternion = layer.quaternion.clone();
			// Step 2: Create a direction vector pointing towards the positive Z-axis
			const direction = new THREE.Vector3(0, 0, -1);
			const tweak = new THREE.Vector3(0, 0, 0);
		//console.log(direction)
			// Step 3: Apply the object's rotation to the direction vector
			direction.applyQuaternion(rotationQuaternion);
		//console.log(direction)
		//console.log(layer.distance)
			// Step 4: Scale the direction vector to the desired distance
			tweak.multiplyScalar(new THREE.Vector3(0, 0, 0));
			direction.multiplyScalar(layer.distance/2);
		//console.log(direction)
			// Step 5: Add the scaled direction vector to the Object3D's position
			layer.positionNew = layer.position.clone().add(direction);
				//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	//console.log(layer.positionNew)
	//console.log(layer.distance)
	//console.log(layer.power)
			auxl.player.TeleportTo(layer.positionNew, layer.power);
		}
	}
	//teleportDown
	const teleportDown = (event) => {
		if(layer.toggle3){
			//console.log(event)
			Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}

	//Link To Hit
/*
	const LinkToHit = (position) => {
console.log('LinkToHit')
console.log(position)
let positionTest = new THREE.Vector3();
positionTest.copy(position)
console.log(positionTest)
		//if the distance between this point and the player is less then the distance then set it to this

console.log(length)
if(length > layer.distance){
console.log('connect to object')
	positionTest = false;
}
LinkTo(positionTest, layer.power)
	}
//let length = positionTest.distanceTo(auxl.playerRig.GetEl().body.position);
*/

	const ChuteUp = () => {
		if(layer.toggle3){
			!layer.toggle3
		}
	}
	const ChuteDown = () => {
		if(!layer.toggle3){
			layer.toggle3
		}
	}


	//Boost
	const BoostUp = (event) => {
		if(layer.toggle4){
console.log('BoostUp')
//console.log(event)
		//layer.distance = 50;
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			//console.log('teleportUp')
			clearInterval(layer.playerLinkInt);
	//instead of event.detail.intersection.point
	//get camera/hand direction and multiple by distance
	//always a set distance?

	//if the mouseup hits somewhere else first within the max distance of the link, use those coords instead
	//layer.worldAxis = new THREE.Vector3(0,-1,0);

/*
			layer.building = false;
			layer.power /= 1000;
			layer.positionNew = new THREE.Vector3();
			layer.position = new THREE.Vector3();
			layer.quaternion = new THREE.Quaternion();
			//layer.position.copy(GetCameraDirection());
			layer.object3D = auxl.camera.GetEl().object3D;
			layer.quaternion.copy(layer.object3D.quaternion);
			layer.position.copy(auxl.playerRig.GetEl().body.position);
		//console.log(auxl.camera.GetEl().Object3D.getWorldDirection())
		//layer.position.copy(auxl.camera.GetEl().object3D.getLocalDirection()));
		//console.log(layer.quaternion)
		//console.log(layer.position)
				//layer.position.negate();
		//console.log(layer.position)
			// Step 1: Get the Object3D's rotation as a Quaternion
			const rotationQuaternion = layer.quaternion.clone();
			// Step 2: Create a direction vector pointing towards the positive Z-axis
			const direction = new THREE.Vector3(0, 0, -1);
			const tweak = new THREE.Vector3(0, 0, 0);
		//console.log(direction)
			// Step 3: Apply the object's rotation to the direction vector
			direction.applyQuaternion(rotationQuaternion);
		//console.log(direction)
		//console.log(layer.distance)
			// Step 4: Scale the direction vector to the desired distance
			tweak.multiplyScalar(new THREE.Vector3(0, 0, 0));
			direction.multiplyScalar(layer.distance/2);
		//console.log(direction)
			// Step 5: Add the scaled direction vector to the Object3D's position
			layer.positionNew = layer.position.clone().add(direction);
				//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	//console.log(layer.positionNew)
	//console.log(layer.distance)
	//console.log(layer.power)
*/
			//Power
			layer.boostPower = 100;
			auxl.player.BoostTo(layer.positionNew, layer.boostPower);
		}
	}
	//BoostDown
	const BoostDown = (event) => {
		if(layer.toggle4){
console.log('Boost Down')
			//console.log(event)
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}


	//BackBoostUp
	const BackBoostUp = (event) => {
		if(layer.toggle5){
console.log('BackBoostUp')
//console.log(event)
		//layer.distance = 50;
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			clearInterval(layer.playerLinkInt);

			//Power
			layer.boostPower = 75;
			auxl.player.BoostBack(layer.positionNew, layer.boostPower);
		}
	}
	//BackBoostDown
	const BackBoostDown = (event) => {
		if(layer.toggle5){
console.log('BackBoost Down')
			//console.log(event)
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			//console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}


	//Light Sword Down
	const LightSwordDown = (event) => {
console.log('Light Sword Down')
//extract light sword and attach to hand rotation/position
	}

	//Light Sword Up
	const LightSwordUp = (event) => {
console.log('Light Sword Up')
//Retract light sword and disconnect it
	}

	//Light Sword Effects
	const LightSwordCollision = (event) => {
console.log({log: 'Light sword collided with object', event})
//4 Direction Types
//0 1 0 : Straight up | Sword
//0 0 -1 : Straight out | Claw
//0 -1 0 : Straight out | Dagger
//0 0 1 : Straight out | Shield


	}

//Charge Jump
//Boost affects are being added/messed with elsewhere. Look into to clear up.

	layer.boostPower = 100;
	//Boost Back
	const BoostBack = (position, power) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
		auxl.playerRig.GetEl().body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower),new THREE.Vector3(0,0,0));
/*
		auxl.playerRig.GetEl().body.linearDamping = 0;
		let boost = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}

	//Boost To
	const BoostTo = (position, power,) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
//camDir.copy(camDir).add(new THREE.Vector3(power, power, power).normalize().multiplyScalar(power));
//let distance = power * DistanceFromPlayer(position)

//let boostDir = new THREE.Vector3();
//boostDir.copy(GetCameraDirection());
//boostDir.copy(camDir).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
//boostDir.negate();
//console.log({imported: position, distance, built: camDir, boost: boostDir})

//
		//Instead of constraint, update physMove
		//auxl.playerRig.GetEl().body.applyLocalImpulse(boostDir,new THREE.Vector3(0,0,0));
		auxl.playerRig.GetEl().body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower).negate(),new THREE.Vector3(0,0,0));
/*
		auxl.playerRig.GetEl().body.linearDamping = 0;
		let boost = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}

	//Boost Jump
	const BoostJump = (position, power) => {

//Calculate the position based on the direction and power
let camDir = new THREE.Vector3();
camDir.copy(GetCameraDirection());
//camDir.multiply(new THREE.Vector3(0,1,0));
camDir.multiply(layer.localAxis);
		auxl.playerRig.GetEl().body.applyLocalImpulse(camDir.multiplyScalar(layer.boostPower),new THREE.Vector3(0,0,0));
/*
		auxl.playerRig.GetEl().body.linearDamping = 0;
		let boost = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.2;
console.log({event: 'boosted', boostDir})
			clearTimeout(boost)
		}, 1000);
*/
	}


	//Slow
	const Slow = () => {
		auxl.playerRig.GetEl().body.linearDamping = 0.8;
	}
	//UnSlow
	const UnSlow = () => {
		auxl.playerRig.GetEl().body.linearDamping = 0.15;
	}

	//Freeze
	const Freeze = () => {
		auxl.playerRig.GetEl().body.sleep();
	}
	//UnFreeze
	const UnFreeze = () => {
		auxl.playerRig.GetEl().body.wakeUp();
	}



	//Link To
	const LinkTo = (position, power) => {
		if(!layer.linking){
		console.log('Link To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect
//layer.raycaster.instersection

//console.log(auxl.playerRig.GetEl().object3D.position)
//console.log(layer.raycaster.intersection)
if(!position){
	//Calculate the position based on the direction and distance
	position = new THREE.Vector3();
	position.copy(GetCameraDirection());
	position.copy(position).add(new THREE.Vector3(layer.distance * layer.power, layer.distance * layer.power, layer.distance * layer.power).normalize().multiplyScalar(layer.distance * layer.power));
} 
if(layer.raycaster.intersection){
console.log(layer.raycaster.intersection)
	//let rayCheck = layer.raycaster.intersection.distanceTo(auxl.playerRig.GetEl().object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance * layer.power){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
	}
}

let distance = DistanceFromPlayer(position);


/*
	if(!position){
		//Calculate the position based on the direction and distance
		position = new THREE.Vector3();
		position.copy(GetCameraDirection());
		position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
	} else {
console.log(position)
	}
	distance = DistanceFromPlayer(position);
*/
		//Sping
		//Spring Point
		//Jump to Distance aka power
		//Spawn, spring, despawn
		//Closer to 0, the greater the power
/*
		if(power < 0.1){
console.log('full power hit')
console.log('full power hit')	
			power = -1;
		} else if(power > 0.7){
console.log('quick hit power hit')
			power = 0.4;
		} else if(power < 0.7){
console.log('long hit power hit')
			power = -0.4;
		}

		if(power > 0.05){
//Noodle Bamboo
console.log('quick power hit')
			power += 0.8;
		} else if(power > 0.7){
//Launch Swing
console.log('quick power hit')
			power *= 2;
		}
 if(power < 0.6){
//Launch Swing
console.log('quick power hit')
			power = 1;
		}
 if(power < 0.7){
//Launch Swing
console.log('extra power hit')
			power *= 2;
		}
*/
//else
//Swing
		if(power > 0.85){
//Noodle Bamboo
console.log('quick hit')
			power += 0.75;
		} else if(power < 0.8){
//Noodle Bamboo
console.log('normal hit')
			//power += 1.6;
		}
		layer.linkLength = 35 * power;
		//layer.linkLength = distance * power;
		//layer.linkLength = (distance * power)*-1;
//console.log({length: layer.linkLength, distance, power})
		//layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		layer.linkCoreConstraint.Connect({type: 'auxspring', restLength: layer.linkLength, damping: 0.5, stiffness: 0, maxForce: 1e6});
		//Display Link
		if(layer.linkCore.core.inScene){
			layer.linkCore.PhysPos(position);
		} else {
//console.log('Spawn')
			layer.linkCore.core.position = position;
			layer.linkCore.SpawnCore();
		}
//Swing
/*
//use point to point instead
		if(above){
			//Swing
			//Display Hook on falling, but disable constraint
			layer.linkCoreConstraint.Disable();
			clearInterval(layer.linkInterval)
			let connect = new THREE.Vector3();
			connect.copy(position)
			layer.linkInterval = setInterval(() => {
	console.log('link checking')
				if(position.y >= GetPlayerInfo().pos.y){
	console.log('link hit')
					layer.linkLength = distance;
					layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
					layer.linking = false;
					//layer.linkCoreConstraint.Connect({type: 'pointToPoint'});
					clearInterval(layer.linkInterval)
				}
			}, 1);
		} else {
			layer.linkLength = distance * power;
		}
*/
		}
	}

	//Slam To
	const SlamTo = (position, power) => {
		if(!layer.linking){
		console.log('Slamming To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect
//console.log(auxl.playerRig.GetEl().object3D.position)
//console.log(layer.raycaster.intersection)
if(!position){
	//Calculate the position based on the direction and distance
	position = new THREE.Vector3();
	position.copy(GetCameraDirection());
	position.copy(position).add(new THREE.Vector3(layer.distance, layer.distance, layer.distance).normalize().multiplyScalar(layer.distance));
} 
if(layer.raycaster.intersection){
	//let rayCheck = layer.raycaster.intersection.distanceTo(auxl.playerRig.GetEl().object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
	}
}
		
	//Distance
	layer.linkLength = 0;

	//Instead of constraint, update physMove
	layer.linkCoreConstraint.Connect({type: 'distance', distance: layer.linkLength, maxForce: 1e6});
console.log(layer.linkCoreConstraint)

	//Change Damping
	console.log(auxl.playerRig.GetEl().body)
	let slamTimeout = setTimeout(() => {
		auxl.playerRig.GetEl().body.linearDamping = 1;
		let slamTimeout2 = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.15;
		}, 250);
	}, 1000);

	//Display Link
	if(layer.linkCore.core.inScene){
		layer.linkCore.PhysPos(position);
	} else {
//console.log('Spawn')
		layer.linkCore.core.position = position;
		layer.linkCore.SpawnCore();
	}


		}
	}

	//Teleport To
	const TeleportTo = (position, distance) => {
		//Teleport
//Calculate the position based on the direction and distance
position = new THREE.Vector3();
position.copy(GetCameraDirection());
position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));

if(layer.raycaster.intersection){
	//let rayCheck = layer.raycaster.intersection.distanceTo(auxl.playerRig.GetEl().object3D.position);
	let rayCheck = DistanceFromPlayer(layer.raycaster.intersection)
	console.log(rayCheck)
	if(rayCheck <= layer.distance){
console.log('Attach to')
		position = new THREE.Vector3();
		position.copy(layer.raycaster.intersection);
		let above = new THREE.Vector3();
		above.copy(layer.worldAxis)
		above.negate();
		above.multiplyScalar(5);

		position.add(above);
	}
}
		//Instead of constraint, update physMove
		auxl.playerRig.PhysPos(position)
		auxl.playerRig.GetEl().body.linearDamping = 1;
		//layer.linkCoreConstraint.Connect({type: 'distance', distance: layer.linkLength, maxForce: 1e6});
	console.log(layer.linkCoreConstraint)

		//Change Damping
		console.log(auxl.playerRig.GetEl().body)
		let slamTimeout = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.15;
			clearTimeout(slamTimeout)
		}, 1000);
	}


	//Delink
	const Delink = () => {
		if(layer.linkCore.core.inScene){
console.log('Delink');
			layer.linkCore.DespawnCore();
		}
	}
	//Link Length Up restLength
	const LinkUp = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Up');
			if(layer.linkLength < maxLinkLength){
				layer.linkLength++;
			}
			layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Length Down restLength
	const LinkDown = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Down');
			if(layer.linkLength > 1){
				layer.linkLength--;
			}
			layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Grab
	const LinkGrab = (link, el) => {
console.log('Link Grab');
console.log(el)

//Instead of contraint, anim body to player holding point

/*
auxl.playerRig.ChangeSelf({property: 'body', value:{mass: 0}});
el.setAttribute('auxconstraint', {type: 'distance', connectTo: 'playerRig', distance: 1,})

let grabTimeout = setTimeout(() => {
auxl.playerRig.ChangeSelf({property: 'body', value:{mass: bodyWeight}});
clearTimeout(grabTimeout)
}, 1000);
*/
	}
	//Link Drop
	const LinkDrop = (link, name) => {
console.log('Link Drop');
console.log(name)
	}
	//Link Shoot
	const LinkShoot = (link, name) => {
console.log('Link Shoot');
console.log(name)
	}
	//Link Hit
	const LinkHit = (link, event) => {
console.log('Link Hit');
console.log(event.target)
console.log(event.detail)
console.log(event.detail.intersection.point)
		//Apply directional impulse force at point of intersection
		let impulse = GetCameraDirection();
		impulse.x *= -2;
		impulse.y *= -2;
		impulse.z *= -2;
		event.target.body.applyLocalImpulse(impulse,new THREE.Vector3(0,0,0));
		}

	//Audio
	//Toggle Background Audio
	const ToggleBackgroundAudio = () => {
		//attach to playerRig instead
		auxl.backgroundAudio = !auxl.backgroundAudio;
		if(auxl.backgroundAudio){
			auxl.playerAudio.SpawnCore(auxl.playerRig);
		} else {
			auxl.playerAudio.DespawnCore();
		}
	}

	//Testing
	//Testing Function
	const TestFunc = (params) => {
		console.log(params);
	}

	return {player, uniRay, layer, Reset, PlayerSceneAnim, UpdateSceneTransitionStyle, PlayerTeleportAnim, UpdateTeleportTransitionStyle, UpdateTransitionColor, GetCameraDirection, ToggleVRText, UpdateUIText, ToggleBeltText, UpdateBeltText, Notification, TempDisableClick, DisableClick, EnableClick, UnlockLocomotion, LockLocomotion, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, ChangeLocomotionType, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight45, SnapLeft45, SnapRight90, SnapLeft90, ToggleFlashlight, ResetUserPosRot,GetPlayerInfo, AttachToPlayer, Equip, Unequip, MainMenuAction, DetachFromPlayer, EnablePhysics, Gravity, PowerController, ToggleAction, LinkTo, SlamTo, TeleportTo, BoostTo, BoostBack, ChuteUp, ChuteDown, Slow, UnSlow, Freeze, UnFreeze, Delink, LinkUp, LinkDown, LinkGrab, LinkDrop, LinkShoot, LinkHit, PhysJump, PhysBoost, PhysDash, LowGrav, PhysPickup, PhysDrop, UpdatePlayerPosition, TwistTo, ToggleBackgroundAudio, Ticker, TriggerEnter, TriggerDown, TriggerUp, TriggerLeave, Track2D, TestFunc};
}

//
//Companion
//System Menu & Inventory
const Companion = (auxl, id, object, inventory) => {

	let comp = {};
	comp.avatarType = '';
	comp.menuParentId;
	let defaultAvatar;
	if(object.SpawnCore){
		comp.avatarType = 'core';
		comp.menuParentId = object.core.id;
		defaultAvatar = object.core.id;
	} else if(object.SpawnLayer){
		comp.avatarType = 'layer';
		comp.menuParentId = object.layer.all.parent.core.core.id;
		defaultAvatar = object.layer.id;
	}
	comp.avatar = Object.assign({}, object);
	comp.shapes = {
		default: defaultAvatar,
		['Cube']: 'compCubeLayer',
		['Sphere']: 'compSphereLayer',
		//['Ghost']: 'ghost',
	};

	comp.id = id;
	comp.inScene = false;
	comp.infoDisplay = false;
	comp.pos = auxl.playerRig.GetEl().getAttribute('position');
	comp.height = 1.5;
	comp.distance = -2;
	comp.firstSpawn = true;

	comp.viewConfig = false;

	//NPC
	//auxl.compNPC = auxl.NPC('compNPC', comp.avatar, auxl.compBookData, auxl.compBubble, true);
	//Basic Book Data
	comp.bookData = auxl.compBookData;
	auxl.compNPC = auxl.NPC('compNPC', comp.avatar, comp.bookData, auxl.compBubbleLayer, true);

	//Inventory
	comp.enableInventory = inventory || false;
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
		button1:{
			id: 'subMenu2',
			style: false,
			title: 'Travel to',
			description: 'Select your next travel destination.',
			subMenu: 'travel1',
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
	travel1:{
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
			//subMenu: 'menu7',
			subMenu: 'compShape1',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
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
				menu: 'back',
			},
		},
	},
	compShape1:{},
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
	items1:{},
	tools1:{},
	keys1:{},
	specials1:{},
/*
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
*/
	};

	if(comp.enableInventory){
		comp.mainMenuData.menu0.button0 = {
			id: 'subMenu1',
			style: false,
			title: 'Inventory',
			description: 'View your inventory.',
			subMenu: 'inventory',
			action: false,
		};
		comp.mainMenuData.menu0.button4 = {
			id: 'subMenu5',
			style: false,
			title: 'Unequip',
			description: 'Unequip your held object.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'Unequip',
				params: null,
				menu: 'stay',
			},
		};
	}

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
			buddy = auxl.compNPC.GetAllNPCEl();
			speechIntervalB = setInterval(function() {
				buddyFaceMaterial.value = emotiSpeechArray[b];
				buddy.setAttribute('text', buddyFaceMaterial);
				if(b === emotiSpeechArray.length){b = 0}else{b++}
			}, 2700);
		}, 250);
	}
	//Add Shape
	const AddAvatar = (name, auxlObj) => {
		comp.shapes[name] = auxlObj;
		BuildAvatarMenu();
	}
	//Build Shape Menu
	const BuildAvatarMenu = () => {
		comp.shapeButtons = {};
		let buttonTemplate = {};
		let moreTemplate = {};
		let currNum = 1;
		let currPage = 1;
		let total = Object.keys(comp.shapes).length;
		let pages = Math.ceil(total/8);
		let subMenuName = 'compShape' + currPage;
		for(let each in comp.shapes){
			buttonTemplate = {
				id: 'action'+currNum,
				style: false,
				title: each,
				description: 'Change to a '+each+' avatar.',
				subMenu: false,
				action: {
					auxlObj: 'comp',
					component: false,
					method: 'UpdateShape',
					params: comp.shapes[each],
					menu: 'close',
				},
			};
			moreTemplate = {
				id: 'action'+currNum,
				style: false,
				title: 'More',
				description: 'Next Page',
				subMenu: false,
				action: false,
			};
			comp.shapeButtons['button'+currNum] = buttonTemplate;
			if(currNum === total){
				auxl.mainMenu.UpdateSubMenu(subMenuName,comp.shapeButtons);
			} else {
				currNum++;
			}
			if(pages > 1){
				if(currNum % 7 === 0){
					currPage++;
					//build more button
					moreTemplate.id = 'action'+currNum;
					moreTemplate.subMenu = 'compShape' + currPage;
					comp.shapeButtons['button'+currNum] = moreTemplate;
					auxl.mainMenu.UpdateSubMenu(subMenuName,comp.shapeButtons);
					comp.shapeButtons = {};
					subMenuName = 'compShape' + currPage;
				}
			}
		}
	}
	//Update Shape - Strings Only
	const UpdateShape = (newObj) => {
		let respawn = false;
		if(comp.inScene){
			respawn = true;
			DespawnComp();
		}
		let rebuildTimeout = setTimeout(() => {
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
			auxl.compNPC = auxl.NPC('compNPC', comp.avatar, auxl.compBookData, auxl.compBubbleLayer, true);
			if(respawn){
				SpawnComp();
			}
		clearTimeout(rebuildTimeout);
		}, 400);
	}
	//Update Book
	const UpdateBook = (bookData) => {
		let respawn = false;
		if(comp.inScene){
			respawn = true;
			DespawnComp();
		}
		comp.bookData = bookData;
		let rebuildTimeout = setTimeout(() => {
			auxl.compNPC = auxl.NPC('compNPC', comp.avatar, comp.bookData, auxl.compBubbleLayer, true);
			if(respawn){
				SpawnComp();
			}
		clearTimeout(rebuildTimeout);
		}, 400);
	}
	//Toggle playerFloor Clickable Class
	const ToggleSpawnClick = () => {
		auxl.playerFloor.GetEl().classList.toggle('clickable');
	}
	//Toggle Companion Display
	const ToggleComp = () => {
		if(comp.inScene){
			DespawnComp();
		} else {
			SpawnComp();
		}
	}
	//Attach Toggle to playerFloor
	auxl.playerFloor.GetEl().addEventListener('click',ToggleComp);
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
			auxl.compNPC.SpawnNPC(auxl.playerRig.GetEl());
			if(comp.avatarType === 'core'){
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
				}
			} else {
				if(comp.firstSpawn){
					comp.firstSpawn = false;
				} else {
					comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
				}
			}
			//autoScriptEmoticon();
			let spawnTimeout = setTimeout(() => {
				//auxl.build.SpawnBuild();
				//Update Inventory
				if(comp.enableInventory){
					UpdateInventoryMenu();
				}
				//Update Main Menu Parent Shape ID
				auxl.mainMenu.multiMenu.parent = comp.menuParentId;
				auxl.mainMenu.SpawnMultiMenu();
				ToggleSpawnClick();
				comp.inScene = true;
				clearTimeout(spawnTimeout);
			}, 100);
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
				auxl.compNPC.DespawnNPC();
				auxl.RemoveFromTracker(comp.id);
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
	//Update Main Menu
	const UpdateMainMenu = (updates) => {
		//Building New Menu Resets any Temp things like UpdateSubMenu
		let restart = false;
		if(auxl.mainMenu.inScene){
			auxl.mainMenu.DespawnMultiMenu();
			restart = true;
		}
		Object.keys(updates).forEach(section => {
			if(comp.mainMenuData[section]){
				comp.mainMenuData[section][updates[section].id] = updates[section];
			} else {
				comp.mainMenuData[section] = updates[section];
			}
		});
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
		BuildAvatarMenu();
		if(restart){
			auxl.mainMenu.SpawnMultiMenu();
		}
	}
	//Update Main Menu Style
	const UpdateMainMenuStyle = (core) => {
		let restart = false;
		if(auxl.mainMenu.inScene){
			auxl.mainMenu.DespawnMultiMenu();
			restart = true;
		}
		comp.mainMenuData.info.buttonData = core;
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
		BuildAvatarMenu();
		if(restart){
			auxl.mainMenu.SpawnMultiMenu();
		}
	}
	//Enable Inventory
	const EnableInventory = () => {
		comp.enableInventory = true;
		comp.mainMenuData.menu0 = {
		button0:{
			id: 'subMenu1',
			style: false,
			title: 'Inventory',
			description: 'View your inventory.',
			subMenu: 'inventory',
			action: false,
		},
		button4:{
			id: 'subMenu5',
			style: false,
			title: 'Unequip',
			description: 'Unequip your held object.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'Unequip',
				params: null,
				menu: 'stay',
			},
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
	};
		auxl.mainMenu = auxl.MultiMenu(comp.mainMenuData);
		UpdateInventoryMenu();
	}
	//Add To Inventory
	const AddToInventory = ({item, hide}) => {
		function inventoryAdd(item){
			if(comp[item.category][item.name]){
				if(comp[item.category][item.name].persist === 'limited'){
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
				if(comp[item.category][item.name].persist === 'limited'){
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
		let moreTemplate = {};
		let currNum = 1;
		let currPage = 1;
		let total = Object.keys(comp[category]).length;
		let pages = Math.ceil(total/8);
		let subMenuName = category + currPage;
		let menuControl = 'stay';

		for(let each in comp[category]){
			let name;
			if(comp[category][each].persist === 'limited'){
				name = comp[category][each].name+' x'+comp[category][each].amount;
			} else {
				name = comp[category][each].name;
			}
			if(comp[category][each].menu){
				menuControl = comp[category][each].menu;
			} else {
				menuControl = 'stay';
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
					menu: menuControl,
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

	return{comp, TestFunc, AddAvatar, UpdateShape, UpdateBook, SpawnComp, DespawnComp, SetFlag, GetFlag, UpdatePosition, ToggleControlView, UpdateMainMenu, UpdateMainMenuStyle, EnableInventory, AddToInventory, ClearInventoryNotifications, RemoveFromInventory, CheckInventory, CheckForKey, UpdateInventoryMenu};
}

//
//Export
export {UniRay, Player, Companion};