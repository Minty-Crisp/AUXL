//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Player
//
//Player
//Companion


//
//Player
//User Controller, Settings and Actions
const Player = (auxl, id, layer, data) => {
//console.log({auxl, id, layer, data})

	let player = {};
	player.id = id;
	player.layer = layer;

	//Legacy
	layer.id = id;

	//UI
	layer.vrUI = false;

	//Camera Rotation Sync
	auxl.camQuat = new THREE.Quaternion();
	auxl.rigQuat = new THREE.Quaternion();

	//Default Transition Settings
	//instant | fade | sphere | blink | locomotion
	layer.transition = {};
	layer.transition.id = '000000';
	layer.transition.scene = 'fade';
	layer.transition.teleport = 'fade';
	layer.teleporting = false;
	//Notifications
	let notificationFadeTimeout;
	let notificationEndTimeout;
	let displayTime;

	//Lock/Unlock Movement
	layer.move = false;
	//Locomotion Type
	//layer.moveType = {pov : '1st', axis : 'posXYZ', style : 'free'}
	layer.moveType = {pov : '1st', axis : 'posXZ', style : 'free'}

	//Sitting or Standing Mode
	layer.roomScaleStand = false;
	//Duck | Standing
	let crouchTimeout;
	let sitTimeout;
	layer.bodyCrouch = false;
	layer.animating = false;

	//Rig with camera
	//Snap Rotation
	layer.snapMode = 45;
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

	//Info Text
	layer.infoText = 'Player :\n'

	//Item|Tool|Key|Special Equipped
	layer.equipped = false;
	layer.equippedObject = 'none';

	//Menu Toggle
	layer.menuToggle = true;

	//Start Player take over from default.
	//Spawn Player
	layer.SpawnLayer();
	//Spawn Avatar Object
	auxl.avatar.SpawnLayer('playerBody');
	//auxl.avatar.SpawnLayer('playerRig');

	//Spawn Avatar Hands
	//auxl.avatarHand1.SpawnCore('vrController1');
	//auxl.avatarHand2.SpawnCore('vrController2');


	//Get auxcontroller component
	auxl.controller = auxl.playerRig.GetEl().components['auxcontroller'];
	//Currently not tracking Player object as it should not be removed

	//Collision
	layer.position = new THREE.Vector3(0,0,0);
	layer.gridPos = new THREE.Vector3(0,0,0);
	layer.gridPos.copy(auxl.playerRig.GetEl().getAttribute('position'));
	layer.gridDirection = 'still';
	//forwardRight | forwardLeft | reverseRight | reverseLeft | forward | reverse | right | left



	//
	//Raycasters 

	//
	//Raycasters - 14 small
	layer.linkDistance = 8;

	const LinkDistance = ({distance}) => {
		layer.linkDistance = distance;
		layer.raycasters.hmdmouse.distance = layer.linkDistance;
		layer.raycasters.hand1.distance = layer.linkDistance;
		layer.raycasters.hand2.distance = layer.linkDistance;

	}

	//Toggle Raycaster Helpers
	//If false, all false, otherwise show config helper
	const ToggleRayHelp = (state) => {
		state = (state === 'toggle')? !layer.raycasters.display : state;
		layer.raycasters.display = state;
		if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
			layer.raycasters.hmdmouse.linkDisplay = state;
			layer.raycasters.hand1.linkDisplay = (state)?!state:state;
			layer.raycasters.hand2.linkDisplay = (state)?!state:state;
			if(state){
				if(!layer.raycasters.hmdmouse.linkAnchor.core.inScene){
					layer.raycasters.hmdmouse.linkAnchor.SpawnCore();
				}
			} else {
				if(layer.raycasters.hmdmouse.linkAnchor.core.inScene){
					layer.raycasters.hmdmouse.linkAnchor.DespawnCore();
				}
			}
			if(layer.raycasters.hand1.linkAnchor.core.inScene){
				layer.raycasters.hand1.linkAnchor.DespawnCore();
			}
			if(layer.raycasters.hand2.linkAnchor.core.inScene){
				layer.raycasters.hand2.linkAnchor.DespawnCore();
			}
		} else if(auxl.controls === 'VR'){
			layer.raycasters.hmdmouse.linkDisplay = (state)?!state:state;
			layer.raycasters.hand1.linkDisplay = state;
			layer.raycasters.hand2.linkDisplay = state;
			if(state){
				if(!layer.raycasters.hand1.linkAnchor.core.inScene){
					layer.raycasters.hand1.linkAnchor.SpawnCore();
				}
				if(!layer.raycasters.hand2.linkAnchor.core.inScene){
					layer.raycasters.hand2.linkAnchor.SpawnCore();
				}
			} else {
				if(layer.raycasters.hand1.linkAnchor.core.inScene){
					layer.raycasters.hand1.linkAnchor.DespawnCore();
				}
				if(layer.raycasters.hand2.linkAnchor.core.inScene){
					layer.raycasters.hand2.linkAnchor.DespawnCore();
				}
			}
			if(layer.raycasters.hmdmouse.linkAnchor.core.inScene){
				layer.raycasters.hmdmouse.linkAnchor.DespawnCore();
			}
		}
	}

	//Move Bullets into their own generators
	//Build Raycasters
	const GenRaycasters = () => {
		layer.raycasters = {};
		layer.raycasters.display = false;
		//HMD Mouse
		layer.raycasters.hmdmouse = {};
		layer.raycasters.hmdmouse.core = auxl.mouseController;
		layer.raycasters.hmdmouse.el = auxl.mouseController.GetEl();
		layer.raycasters.hmdmouse.uiCore = auxl.mouseControllerUI;
		layer.raycasters.hmdmouse.uiEl = auxl.mouseControllerUI.GetEl();
		layer.raycasters.hmdmouse.intersection = new THREE.Vector3(0,0,0);
		layer.raycasters.hmdmouse.intersectionEl = false;
		//Link
		layer.raycasters.hmdmouse.distance = layer.linkDistance;
		layer.raycasters.hmdmouse.linkInterval;
		layer.raycasters.hmdmouse.hoverInterval;
		layer.raycasters.hmdmouse.linkDisplay = false;
		layer.raycasters.hmdmouse.linkCoreData = {
			data:'linkCoreData',
			id: 'hmdLinkCore',
			sources: false,
			text: false,
			geometry: {primitive: 'ring', radiusInner: 0.15, radiusOuter: 0.4},
//geometry: {primitive: 'torus', arc: 360, radius: 0.25, radiusTubular: 0.01, segmentsRadial: 36, segmentsTubular: 32},
			material: {shader: "standard", color: "#eb07a5", emissive: '#eb07a5', emissiveIntensity: 0.25, opacity: 0.69, side: 'double'},
			position: new THREE.Vector3(0,0,0.15),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: {
				body:{type: 'static', shape: 'none', mass: 0,},
				//bodymaterial: {friction: 0, restitution: 0},
['look-at-xyz']:{match: 'camera', x:true, y:true, z:true},
			},
		}; 
		layer.raycasters.hmdmouse.linkCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hmdmouse.linkCoreData, false, true));
		layer.raycasters.hmdmouse.linkAnchor = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hmdmouse.linkCoreData, {id: 'hmdLinkAnchor',
			geometry: {primitive: 'ring', radiusInner: 0.25, radiusOuter: 0.35},
			material: {shader: "standard", color: "#eb07a5", emissive: '#eb07a5', emissiveIntensity: 0.25, opacity: 0.69, side: 'double'},
}, true));
		layer.raycasters.hmdmouse.linkConfig = {
			type: 'auxspring',
			to: 'playerRig',
			minOneLength: 0,
			maxOneLength: 30,
			restLength: 1,
			damping: 0.5,
			stiffness: 10,
		};
		layer.raycasters.hmdmouse.linkConstraint = auxl.Constraints(layer.raycasters.hmdmouse.linkCore, layer.raycasters.hmdmouse.linkConfig, false)
		//Bullets
		layer.raycasters.hmdmouse.bullets = [];
		layer.raycasters.hmdmouse.bulletCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hmdmouse.linkCoreData, {id: 'hmdbulletCore', geometry: {primitive: 'sphere', radius: 0.2,}, material: {shader: "standard", color: "#d8f020", emissive: '#d8f020', emissiveIntensity: 0.25, opacity: 0.75,}, components: { body:{type: 'dynamic', shape: 'sphere', mass: 1,}, bodymaterial: {friction: 1, restitution: 0.01}, }, }, true));

		//Force
		//Grab List
		layer.raycasters.hmdmouse.grabbed = [];

		//Bullets
		//Bullet 0
		layer.raycasters.hmdmouse.bullet0 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet0', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet0)
		//Bullet 1
		layer.raycasters.hmdmouse.bullet1 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet1', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet1)
		//Bullet 2
		layer.raycasters.hmdmouse.bullet2 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet2', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet2)
		//Bullet 3
		layer.raycasters.hmdmouse.bullet3 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet3', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet3)
		//Bullet 4
		layer.raycasters.hmdmouse.bullet4 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet4', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet4)
		//Bullet 5
		layer.raycasters.hmdmouse.bullet5 = auxl.coreFromTemplate(layer.raycasters.hmdmouse.bulletCore, {id: 'hmdbullet5', }, true);
		layer.raycasters.hmdmouse.bullets.push( layer.raycasters.hmdmouse.bullet5)

		//Hand 1
		layer.raycasters.hand1 = {};
		layer.raycasters.hand1.core = auxl.vrController1;
		layer.raycasters.hand1.el = auxl.vrController1.GetEl();
		layer.raycasters.hand1.uiCore = auxl.vrController1UI;
		layer.raycasters.hand1.uiEl = auxl.vrController1UI.GetEl();
		layer.raycasters.hand1.intersection = new THREE.Vector3(0,0,0);
		layer.raycasters.hand1.intersectionEl = false;
		//Link
		layer.raycasters.hand1.distance = layer.linkDistance;
		layer.raycasters.hand1.linkInterval;
		layer.raycasters.hand1.hoverInterval;
		layer.raycasters.hand1.linkDisplay = false;
		layer.raycasters.hand1.linkCoreData = {
			data:'linkCoreData',
			id: 'hand1LinkCore',
			sources: false,
			text: false,
			geometry: {primitive: 'ring', radiusInner: 0.3, radiusOuter: 0.5},
			material: {shader: "standard", color: "#ebd107", emissive: '#ebd107', emissiveIntensity: 0.25, opacity: 0.75, side: 'double'},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: {
				body:{type: 'static', shape: 'none', mass: 0,},
				//bodymaterial: {friction: 0, restitution: 0},
['look-at-xyz']:{match: 'camera', x:true, y:true, z:true},
			},
		};
		layer.raycasters.hand1.linkCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand1.linkCoreData, false, true));
		layer.raycasters.hand1.linkAnchor = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand1.linkCoreData, {id: 'hand1LinkAnchor', 
			geometry: {primitive: 'ring', radiusInner: 0.25, radiusOuter: 0.35},
			material: {shader: "standard", color: "#eb07a5", emissive: '#eb07a5', emissiveIntensity: 0.25, opacity: 0.69, side: 'double'},
}, true));
		layer.raycasters.hand1.linkConfig = {
			type: 'auxspring',
			to: 'playerRig',
			minOneLength: 0,
			maxOneLength: 30,
			restLength: 1,
			damping: 0.5,
			stiffness: 10,
		};
		layer.raycasters.hand1.linkConstraint = auxl.Constraints(layer.raycasters.hand1.linkCore, layer.raycasters.hand1.linkConfig, false)
		//Bullets
		layer.raycasters.hand1.bullets = [];
		layer.raycasters.hand1.bulletCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand1.linkCoreData, {id: 'hmdbulletCore', geometry: {primitive: 'sphere', radius: 0.2,}, material: {shader: "standard", color: "#2dba74", emissive: '#2dba74', emissiveIntensity: 0.25, opacity: 0.5, blending: 'multiply'}, components: { body:{type: 'dynamic', shape: 'sphere', mass: 1,}, bodymaterial: {friction: 1, restitution: 0.01}, }, }, true));

		//Force
		//Grab List
		layer.raycasters.hand1.grabbed = [];

		//Bullets
		//Bullet 0
		layer.raycasters.hand1.bullet0 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet0', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet0)
		//Bullet 1
		layer.raycasters.hand1.bullet1 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet1', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet1)
		//Bullet 2
		layer.raycasters.hand1.bullet2 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet2', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet2)
		//Bullet 3
		layer.raycasters.hand1.bullet3 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet3', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet3)
		//Bullet 4
		layer.raycasters.hand1.bullet4 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet4', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet4)
		//Bullet 5
		layer.raycasters.hand1.bullet5 = auxl.coreFromTemplate(layer.raycasters.hand1.bulletCore, {id: 'hand1bullet5', }, true);
		layer.raycasters.hand1.bullets.push( layer.raycasters.hand1.bullet5)

		//Hand 2
		layer.raycasters.hand2 = {};
		layer.raycasters.hand2.core = auxl.vrController2;
		layer.raycasters.hand2.el = auxl.vrController2.GetEl();
		layer.raycasters.hand2.uiCore = auxl.vrController2UI;
		layer.raycasters.hand2.uiEl = auxl.vrController2UI.GetEl();
		layer.raycasters.hand2.intersection = new THREE.Vector3(0,0,0);
		layer.raycasters.hand2.intersectionEl = false;
		//Link
		layer.raycasters.hand2.distance = layer.linkDistance;
		layer.raycasters.hand2.linkInterval;
		layer.raycasters.hand2.hoverInterval;
		layer.raycasters.hand2.linkDisplay = false;
		layer.raycasters.hand2.linkCoreData = {
			data:'linkCoreData',
			id: 'hand2LinkCore',
			sources: false,
			text: false,
			geometry: {primitive: 'ring', radiusInner: 0.3, radiusOuter: 0.5},
			material: {shader: "standard", color: "#ebd107", emissive: '#ebd107', emissiveIntensity: 0.25, opacity: 0.75, side: 'double'},
			position: new THREE.Vector3(0,0,0),
			rotation: new THREE.Vector3(0,0,0),
			scale: new THREE.Vector3(1,1,1),
			animations: false,
			mixins: false,
			classes: ['a-ent'],
			components: {
				body:{type: 'static', shape: 'none', mass: 0,},
				//bodymaterial: {friction: 0, restitution: 0},
['look-at-xyz']:{match: 'camera', x:true, y:true, z:true},
			},
		};
		layer.raycasters.hand2.linkCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand2.linkCoreData, false, true));
		layer.raycasters.hand2.linkAnchor = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand2.linkCoreData, {id: 'hand2LinkAnchor', 
			geometry: {primitive: 'ring', radiusInner: 0.25, radiusOuter: 0.35},
			material: {shader: "standard", color: "#eb07a5", emissive: '#eb07a5', emissiveIntensity: 0.25, opacity: 0.69, side: 'double'},
}, true));
		layer.raycasters.hand2.linkConfig = {
			type: 'auxspring',
			to: 'playerRig',
			minOneLength: 0,
			maxOneLength: 30,
			restLength: 1,
			damping: 0.5,
			stiffness: 10,
		};
		layer.raycasters.hand2.linkConstraint = auxl.Constraints(layer.raycasters.hand2.linkCore, layer.raycasters.hand2.linkConfig, false)
		//Bullets
		layer.raycasters.hand2.bullets = [];
		layer.raycasters.hand2.bulletCore = auxl.Core(auxl.coreDataFromTemplate(layer.raycasters.hand2.linkCoreData, {id: 'hand2bulletCore', geometry: {primitive: 'sphere', radius: 0.2,}, material: {shader: "standard", color: "#d02caa", emissive: '#d02caa', emissiveIntensity: 0.25, opacity: 0.5, blending: 'multiply'}, components: { body:{type: 'dynamic', shape: 'sphere', mass: 1,}, bodymaterial: {friction: 1, restitution: 0.01}, }, }, true));

		//Force
		//Grab List
		layer.raycasters.hand2.grabbed = [];

		//Bullets
		//Bullet 0
		layer.raycasters.hand2.bullet0 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet0', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet0)
		//Bullet 1
		layer.raycasters.hand2.bullet1 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet1', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet1)
		//Bullet 2
		layer.raycasters.hand2.bullet2 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet2', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet2)
		//Bullet 3
		layer.raycasters.hand2.bullet3 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet3', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet3)
		//Bullet 4
		layer.raycasters.hand2.bullet4 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet4', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet4)
		//Bullet 5
		layer.raycasters.hand2.bullet5 = auxl.coreFromTemplate(layer.raycasters.hand2.bulletCore, {id: 'hand2bullet5', }, true);
		layer.raycasters.hand2.bullets.push( layer.raycasters.hand2.bullet5)
	}
	GenRaycasters();

	//Default Settings
	//Reset to Defaults
	const Reset = () => {
		layer.transition = {};
		layer.transition.id = '000000';
		layer.transition.scene = 'fade';
		layer.transition.teleport = 'fade';
		layer.teleporting = false;
		//Sitting or Standing Mode
		layer.roomScaleStand = false;
		//Duck | Standing
		layer.bodyCrouch = false;
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

	//
	//Camera Support
	layer.raycasters.activeCamera = 'camera';
	layer.raycasters.previousCamera = false;
	//Switch to new Cam. ('Camera core string')
	const CameraSwitch = (auxlCamID) => {
		//Deactivate Current
		auxl[layer.raycasters.activeCamera].ChangeSelf({property: 'active', value: false})
		//Active New
		auxl[auxlCamID].ChangeSelf({property: 'active', value: true})
		//Update Current
		layer.raycasters.previousCamera = layer.raycasters.activeCamera;
		layer.raycasters.activeCamera = auxlCamID;
	}
	//Camera Support
	const CameraSwitchBack = () => {
		//Deactivate Current
		auxl[layer.raycasters.activeCamera].ChangeSelf({property: 'active', value: false})
		//Active New
		auxl[layer.raycasters.previousCamera].ChangeSelf({property: 'active', value: true})
		//Update Current
		layer.raycasters.previousCamera = layer.raycasters.activeCamera;
		layer.raycasters.activeCamera = layer.raycasters.previousCamera;
	}
	layer.scroll = {};
	layer.scroll.zoomed = false;
	layer.scroll.distances = [0,1];
	layer.scroll.scrolls = [
		new THREE.Vector3(0,0,0),
		new THREE.Vector3(0,0.5,0),
	];
	//layer.scroll.mainCurrent = 0;
	//layer.scroll.roamCurrent = 0;

	//Camera Rig Height Manual Adjustment
	layer.CamRigHeight = 0;
	//The directional position return here is accurate in local space to the camera's rotation, but the playerHead doesn't rotate at all an thus the local xz position return is based off a rotated object.

	//Handle 1st & 3rd Pov Toggle
	function zoomDirection(zoom){
		let direction = new THREE.Vector3().copy(auxl.player.RayCoord(auxl.camera.GetEl(), 2, new THREE.Vector3(0,0,zoom)).direction);
		let offset = 0;
		if(zoom === 0){
			//offset += layer.CamRigHeight;
		} else if(zoom === 1){
			//Zoomed Out Additional Height
			offset += 0.5;
		}
		direction.setY(auxl.headRig.GetEl().object3D.position.y + offset);

//rotate current direction to match current snap rotation amount
//matrixAxisRot = (rayDir, axis, angle)

		return direction;
	}

	layer.allowZoom = true;
	//System Camera Scrolling
	const CycleCameraZoom = (direction, camType) => {
	//console.log('scrolling')
	//console.log(layer.scroll.current)
	//console.log(direction)

		//Prevent zoom change happening too quickly like with joysticks
		if(!layer.allowZoom){return}else{layer.allowZoom = false}
		let zoomTimeout = setTimeout(() => {
			layer.allowZoom = true;
			clearTimeout(zoomTimeout);
		}, 250);

		let camZoom = 0;
		//When at 1st pov, reset scroll position based on camera direction
		if(!layer.scroll.zoomed){
			layer.scroll.scrolls = [];
			layer.scroll.distances.forEach(each => {
				layer.scroll.scrolls.push(zoomDirection(each))
			})
			camZoom = 1;
		}
		let newPosition = new THREE.Vector3(0,0,0).copy(layer.scroll.scrolls[camZoom]);
		//Update Position
		auxl.headRig.GetEl().object3D.position.copy(newPosition);
		//Toggle Zoomed
		layer.scroll.zoomed = !layer.scroll.zoomed;
/*
		if(camType === 'roam'){
			if(auxl.isFalsey(direction)){
				layer.scroll.roamCurrent--;
			} else {
				layer.scroll.roamCurrent++;
			}
			if(layer.scroll.roamCurrent === layer.scroll.scrolls.length){
				layer.scroll.roamCurrent = 0;
			} else if(layer.scroll.roamCurrent < 0){
				layer.scroll.roamCurrent = layer.scroll.scrolls.length-1;
			}
			//Position to Move to
			let newPosition = new THREE.Vector3(0,0,0).copy(layer.scroll.scrolls[layer.scroll.roamCurrent]);
			auxl.roamCameraRig.GetEl().object3D.position.copy(newPosition);
		} else {
		//if(camType === 'camera'){}
			//When at 1st pov, reset scroll position based on avatarRig direction
			if(layer.scroll.mainCurrent === 0){
				layer.scroll.scrolls = [];
				layer.scroll.distances.forEach(each => {
					layer.scroll.scrolls.push(zoomDirection(each))
				})
			}

			if(auxl.isFalsey(direction)){
				layer.scroll.mainCurrent--;
			} else {
				layer.scroll.mainCurrent++;
			}
			if(layer.scroll.mainCurrent === layer.scroll.scrolls.length){
				layer.scroll.mainCurrent = 0;
			} else if(layer.scroll.mainCurrent < 0){
				layer.scroll.mainCurrent = layer.scroll.scrolls.length-1;
			}
		}
*/
	}

	layer.roamCamViewer = false;
	//This breaks the canvas streaming of the camera feed
	const ToggleRoamCamView = () => {
		layer.roamCamViewer = !layer.roamCamViewer;
		if(layer.roamCamViewer){
			auxl.roamCameraViewer.SpawnCore(auxl.camera.GetEl());
		} else {
			auxl.roamCameraViewer.DespawnCore();
		}

	}

	//Scene & Teleportation Camera Controls
	//Scene Load Animation Support
	const PlayerSceneAnim = () => {
		//Minimum Anim Delay if assets don't need loading
		let animTimeout0 = setTimeout(() => {
			if(auxl.loadingScene){} else {
				auxl.loadingScene = true;
			}
			clearTimeout(animTimeout0);
		}, 800);
		if(!layer.teleporting){
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
		if(!auxl.player.layer.teleporting){
			auxl.player.layer.teleporting = true;
			if(auxl.player.layer.transition.teleport === 'blink'){
				auxl.player.TempDisableClick();
				auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink1Screen.EmitEvent('blink');
				auxl.blink2Screen.EmitEvent('blink');
				animTimeout = setTimeout(() => {
					auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition.teleport === 'fade'){
				auxl.player.TempDisableClick();
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.fadeScreen.EmitEvent('fade');
				animTimeout = setTimeout(() => {
					auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition.teleport === 'sphere'){
				auxl.player.TempDisableClick();
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.sphereScreen.EmitEvent('sphere');
				animTimeout = setTimeout(() => {
					auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1200);
			} else if (auxl.player.layer.transition.teleport === 'instant'){
				animTimeout = setTimeout(() => {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			} else if (auxl.player.layer.transition.teleport === 'locomotion'){
				animTimeout = setTimeout(() => {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 1000);
			}
		}
	}
	//Player Transition Animation
	const PlayerQuickAnim = () => {
		let animTimeout;
		if(!auxl.player.layer.teleporting){
			auxl.player.layer.teleporting = true;
			if(auxl.player.layer.transition.teleport === 'blink'){
				auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.blink1Screen.EmitEvent('blinkquick');
				auxl.blink2Screen.EmitEvent('blinkquick');
				animTimeout = setTimeout(() => {
					auxl.blink1Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.blink2Screen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			} else if (auxl.player.layer.transition.teleport === 'fade'){
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.fadeScreen.EmitEvent('fadequick');
				animTimeout = setTimeout(() => {
					auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			} else if (auxl.player.layer.transition.teleport === 'sphere'){
				auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'true'});
				auxl.sphereScreen.EmitEvent('spherequick');
				animTimeout = setTimeout(() => {
					auxl.sphereScreen.ChangeSelf({property: 'visible', value: 'false'});
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			} else if (auxl.player.layer.transition.teleport === 'instant'){
				animTimeout = setTimeout(() => {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 50);
			} else if (auxl.player.layer.transition.teleport === 'locomotion'){
				animTimeout = setTimeout(() => {
					auxl.player.layer.teleporting = false;
					clearTimeout(animTimeout);
				}, 500);
			}
		}
	}
	//Fade Out
	const PlayerFadeOut = () => {
		if(!auxl.player.layer.teleporting && !auxl.player.layer.faded){
			let animTimeout;
			DisableClick();
			auxl.player.layer.teleporting = true;
			auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'true'});
			auxl.fadeScreen.EmitEvent('fadeout');
			animTimeout = setTimeout(() => {
				auxl.player.layer.faded = true;
				clearTimeout(animTimeout);
			}, 500);
		}
	}
	//Fade In
	const PlayerFadeIn = () => {
		if(auxl.player.layer.faded){
			let animTimeout;
			auxl.fadeScreen.EmitEvent('fadein');
			animTimeout = setTimeout(() => {
				EnableClick();
				auxl.fadeScreen.ChangeSelf({property: 'visible', value: 'false'});
				auxl.player.layer.teleporting = false;
				auxl.player.layer.faded = false;
				clearTimeout(animTimeout);
			}, 500);
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


	//Camera Rig Fine Tuning
	const CamRigAdjust = (dir) => {
		let offset = 0;
		if(dir === 'up'){
			if(layer.CamRigHeight >= 1.8){return} 
			else{offset = 0.1}
		} else if(dir === 'down'){
			if(layer.CamRigHeight <= -0.2){return} 
			else{offset = -0.1}
		} else if(dir === 'reset'){
			offset = layer.CamRigHeight * -1;
		}
		//Height Offset
		let height = offset + auxl.headRig.GetEl().object3D.position.y;
		//Set new height
		auxl.headRig.GetEl().object3D.position.setY(height);
		//Update Scroll Heights
		layer.scroll.scrolls.forEach(each => each.y += offset)
		//Update CamRigHeight
		if(dir === 'reset'){
			layer.CamRigHeight = 0;
		} else {
			layer.CamRigHeight += offset;
		}
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

	//Snap Mode Toggle
	const ToggleSnapMode = () => {
		layer.snapToggle = !layer.snapToggle;
		if(layer.snapToggle){
			layer.snapMode = 90;
		} else {
			//Defaults to 45
			layer.snapMode = 45;
		}
	}

	//Snap Right
	const SnapRight = () => {
		if(layer.snapMode === 45){
			SnapRight45();
		} else if(layer.snapMode === 90){
			SnapRight90();
		}
	}
	//Snap Left
	const SnapLeft = () => {
		if(layer.snapMode === 45){
			SnapLeft45();
		} else if(layer.snapMode === 90){
			SnapLeft90();
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
		} else {
			if(y < -360){
				y = y % 360;
			}
		}
		let rot = new THREE.Vector3(0,((y*-1)+1)+yRot,0);
		auxl.playerBody.ChangeSelf({property:'rotation',value:rot});
	}

	//Player Camera To Y Pos Animation
	const CamYTo = (from,to) => {
		let start = from || 0;
		let end = to || 0;
		let camYAnimData = {
			name: 'camYAnim',
			property: 'object3D.position.y',
			from: start,
			to: end,
			dur: 750,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing: 'easeInOutSine',
			elasticity: 400,
			autoplay: true,
			enabled: true,
		};
		auxl.playerBody.Animate(camYAnimData)
	}

	//REWORK
	//Toggle Player & Grid Crouch
	const ToggleCrouch = () => {
		if(layer.animating){} else {
			layer.animating = true;
			crouchTimeout = setTimeout(() => {
				layer.animating = false;
				clearTimeout(crouchTimeout);
			}, 775);
			if(layer.bodyCrouch){
				let togglePos = new THREE.Vector3(0,0,0);
				togglePos.copy(layer.gridPos);
				togglePos.y += 1;
				if(!auxl.map.CheckMapObstaclesDiagonal(togglePos, layer.gridPos)){
					return;
				}
			}

			let currHeight = auxl.playerBody.GetEl().getAttribute('position').y;
			if(layer.bodyCrouch){
				CamYTo(currHeight, currHeight+0.75)
			} else {
				CamYTo(currHeight, currHeight-0.75)
			}
			layer.bodyCrouch = !layer.bodyCrouch;
		}
	}

	//Flashlight
	layer.flashlight = false;
	const ToggleFlashlight = (onOff) => {
		let toggle = layer.flashlight;
		if(onOff.on){
			toggle = false;
		} else if(onOff.off){
			toggle = true;
		}
		if(toggle){
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
				auxl.camera.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.35, distance: 15, decay: 0.3, penumbra: 0.15, angle: 25,}});
			} else if(auxl.controls === 'VR'){
				if(auxl.vrHand === 'bothRight' || auxl.vrHand === 'bothRightLoco' || auxl.vrHand === 'right'){
					auxl.vrController2.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.3, distance: 15, decay: 0.3, penumbra: 0.15, angle: 35,}});
				} else {
					auxl.vrController1.ChangeSelf({property: 'light', value:{type: 'spot', intensity: 0.3, distance: 15, decay: 0.3, penumbra: 0.15, angle: 35,}});
				}
			}
			layer.flashlight = true;
		}
	}

	//UI
	//Update Belt Text
	const UpdateBeltText = (text) => {
		if(text){
			layer.beltText = text;
		}
		if(layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'text', value:{value: layer.beltText}})
		}
	}
	//Toggle Belt Text
	const ToggleBeltText = (force) => {
		if(force || !layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'visible', value:true})
			auxl.playerBeltTitleText.ChangeSelf({property: 'visible', value:true})
			UpdateBeltText();
			layer.beltDisplay = true;
		} else if(layer.beltDisplay){
			auxl.playerBeltText.ChangeSelf({property: 'visible', value:false})
			auxl.playerBeltTitleText.ChangeSelf({property: 'visible', value:false})
			layer.beltDisplay = false;
		}
	}

	//Update Hover Text
	const UpdateHoverText = (text) => {
		if(text){
			layer.HoverText = text;
		}
		if(layer.hoverDisplay){
			auxl.avatarHover.ChangeSelf({property: 'text', value:{value: layer.HoverText}})
		}
	}
	//Toggle Hover Display
	const ToggleHoverText = (force) => {
		if(force || !layer.hoverDisplay){
			auxl.avatarHover.ChangeSelf({property: 'visible', value:true})
			UpdateHoverText();
			layer.hoverDisplay = true;
		} else if(layer.hoverDisplay){
			auxl.avatarHover.ChangeSelf({property: 'visible', value:false})
			layer.hoverDisplay = false;
		}
	}

	//Toggle Hover Display
	const ToggleFloorText = (force) => {
		if(force || !layer.floorDisplay){
			auxl.playerFloor.ChangeSelf({property: 'visible', value:true})
			UpdateHoverText();
			layer.floorDisplay = true;
		} else if(layer.floorDisplay){
			auxl.playerFloor.ChangeSelf({property: 'visible', value:false})
			layer.floorDisplay = false;
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
		if(displayTime < 500){
			console.log({msg: 'Error. Too short of a time. Min is 1000ms', notificationInfo})
			displayTime = 1000;
		}
		TempDisableClick(displayTime);
		clearTimeout(notificationFadeTimeout);
		clearTimeout(notificationEndTimeout);
		auxl.cameraUI.ChangeSelf({property: 'text', value: {value: notificationInfo.message, width: 0.5, color: "#FFFFFF", align: "center", font: "exo2bold", side: 'double', opacity: 0},});
		auxl.cameraUI.ChangeSelf({property: 'visible', value: 'true'});
		auxl.cameraUI.EmitEvent('cameraMsg');
		notificationFadeTimeout = setTimeout(() => {
			auxl.cameraUI.EmitEvent('cameraMsgFadeOut');
			clearTimeout(notificationFadeTimeout);
		}, displayTime-501);
		notificationEndTimeout = setTimeout(() => {
			auxl.cameraUI.ChangeSelf({property: 'visible', value: 'false'});
			clearTimeout(notificationEndTimeout);
		}, displayTime);
	}
	//Controls
	layer.actions = {};
	const UpdateActions = ({actions, remove, tracker, limit}) => {
		//Remove or Add
		if(remove){
			if(tracker && layer.actions[tracker]){
				//Remove all in tracker
				layer.actionArray = {...layer.actions[tracker]};
			} else {
				if(actions){
					//Remove specific actions
					layer.actionArray = {...actions};
				} else {
					//None
					layer.actionArray = {};
				}
			}
			if(layer.actionArray){
				for(let each in layer.actionArray){
					//If any actions overrode, restore it
					if(layer.actions[each]){
						auxl.controller[each+'Func'] = layer.actions[each].func;
						auxl.controller[each+'Params'] = layer.actions[each].params;
						if(layer.actions[each].name){
							auxl.controlsInfo[each] = {name: layer.actions[each].name, info: layer.actions[each].info};
						}
						delete layer.actions[each];
					} else {
						auxl.controller.disableAction({[each]: layer.actionArray[each]});
					}
				}
			}
		} else {
			for(let each in actions){
				//If same action # already exists, back it up
				if(auxl.controller[each+'Func']){
					layer.actions[each] = {};
					layer.actions[each].func = auxl.controller[each+'Func'];
					layer.actions[each].params = auxl.controller[each+'Params'];
					if(auxl.controlsInfo[each]){
						layer.actions[each].name = auxl.controlsInfo[each].name;
						layer.actions[each].info = auxl.controlsInfo[each].info;
					}
				}
				//Add action to a tracker set which can be removel all at once by this same method with remove and tracker defined
				if(tracker){
					if(!layer.actions[tracker]){
						layer.actions[tracker] = {};
					}
					layer.actions[tracker][each] = layer.actions[each];
				}
//Incomplete TODO
//limit to scene, zone, scenario, time, a flag, until unequipped
				//Limit action to be removed on effect
				if(limit){
					switch (limit.type) {
						//limit.total
						case 'scenario':
							//if the player moves out of the scenario, remove action
//playerRig emits scenarioExit
							break;
						case 'zone':
							//if the player moves out of the zone, remove action
//playerRig emits zoneExit
							break;
						case 'scene':
							//if the player moves out of the scene, remove action
//playerRig emits sceneExit
							break;
						case 'time':
							//If this amount of time passed, remove action
							break;
						case 'uses':
							//If the action was used X times, remove action
							break;
						case 'flag':
							//If the player flag changes, remove action
							break;
						default:
							//If the player dismisses, remove action
							console.log('Other');
					}
				}
			}
			auxl.controller.updateAction(actions);
		}
		auxl.UpdateControlText();
/*
		action1Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed', name: 'Toggle Walk/Run', info: 'Change your walking speed between walk and run.'},
		action4Down:{auxlObj: 'testHoverMenu', func: 'SpawnHoverMenu', name: 'Quick Menu', info: 'Spawn Quick Menu', params: 'true'},
*/
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
		//ToggleRayHelp(true);
	}
	//Enable VR Belt UI Locomotion
	const EnableVRHoverLocomotion = (vrHand) => {
		if(auxl.locomotionUILayer.GetParentEl()){} else{
			auxl.locomotionUILayer.SpawnLayer();
		}
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: 'beltUIParent', courserid: 'mouseController', movetype: 'vrHover'});
	}
	//Enable Desktop Locomotion
	const EnableDesktopLocomotion = () => {
		RemoveBelt();
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'desktop'});
	}
	//Enable Mobile Locomotion
	const EnableMobileLocomotion = () => {
		RemoveBelt();
		auxl.playerRig.GetEl().setAttribute('locomotion',{uiid: false, courserid: 'mouseController', movetype: 'mobile'});
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
		//#return
		if(layer.playerPhysics){
			auxl.playerRig.PhysPos(pos);
		}
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
//if grid pr physics is enabled, check for collisions
		//Reset Rotation
		auxl.playerRig.ChangeSelf({property: 'position', value: new THREE.Vector3(0,0,1)});
		//Update Grid Position
		layer.gridPos.copy(auxl.playerRig.GetEl().getAttribute('position'));
		//Reset Rotation
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
		auxl.playerRig.ChangeSelf({property:'rotation',value:new THREE.Vector3(0,(y*-1)+1,0)});
	}
	//Get user current infomation
	const GetPlayerInfo = () => {
		return {layer, id: layer.layer.all.parent.core.core.id, pos: auxl.playerRig.GetEl().object3D.position, bodyRot: auxl.playerRig.GetEl().getAttribute('rotation'), headRot: auxl.camera.GetEl().getAttribute('rotation'), grid:layer.gridPos};
	}
	//Distance from Player
	const DistanceFromPlayer = (position) => {
		//let distance = new THREE.Vector3();
		let distance = position.distanceTo(GetPlayerInfo().pos);
		return distance;
	}

	//Within Player sphere radius aka realm such as... Is this position within X distance of the player?
	const WithinPlayerRealm = (position, distance) => {
		if(DistanceFromPlayer(position) <= distance){
			return true;
		} else {
			return false;
		}
	}

	//Camera with Rig Point at Distance
	const CamRigPoint = (distance, dir) => {
		//Reset
		let camRigPoint = new THREE.Vector3();
		layer.position = new THREE.Vector3();
		layer.quaternion = new THREE.Quaternion();
		layer.rigQuaternion = new THREE.Quaternion();
		//Update
		layer.quaternion.copy( auxl.camera.GetEl().object3D.quaternion);
		layer.rigQuaternion.copy( auxl.playerRig.GetEl().object3D.quaternion);
		layer.position.copy(auxl.camera.GetEl().object3D.position);
		layer.position.add(auxl.playerRig.GetEl().object3D.position);
		//Direction | Aim
		let direction = dir || new THREE.Vector3(0,0,-1);
		direction.applyQuaternion(layer.quaternion);
		direction.multiplyScalar(distance);
		//Apply only on non float or -y local axis gravity
		if(!auxl.playerRig.GetEl().object3D.quaternion.equals(new THREE.Quaternion(0,0,0,1))){
			direction.applyQuaternion(layer.rigQuaternion)
		}
		camRigPoint.copy(layer.position.clone().add(direction));
		return camRigPoint;
	}
	//Ray with Rig Point at Distance - *****
	//Ray Rotation is combined with Body Rotation
	const RayDistanceDirection = (rayEl, dist, dir) => {
		//let quaternion = new THREE.Quaternion().copy( auxl.camera.GetEl().object3D.quaternion);
		if(rayEl === false){
			rayEl = auxl.camera.GetEl();
		}
		//let quaternion = new THREE.Quaternion().copy(rayEl.object3D.quaternion);
		let quaternion = new THREE.Quaternion();
		rayEl.object3D.getWorldQuaternion(quaternion)
		//let bodyQuat = new THREE.Quaternion().copy(auxl.playerBody.GetEl().object3D.quaternion);
		//let bodyHead = new THREE.Quaternion().copy(auxl.playerHead.GetEl().object3D.quaternion);
		//let playerRig = new THREE.Quaternion().copy(auxl.playerRig.GetEl().object3D.quaternion);
		//quaternion.multiply(bodyQuat);
		//quaternion.multiply(bodyHead);
		//quaternion.multiply(playerRig);
		let distance = dist || 1;
		let direction = dir || new THREE.Vector3(0,0,-1);
		//Rotate Aim
		direction.applyQuaternion(quaternion);
		//Find point at Distance
		let position = new THREE.Vector3().copy(direction).normalize().multiplyScalar(distance);
		return position;
	}
	//Ray with Rig Point at Distance
	const RigPoint = (distance, rayEl, dir) => {
		//Reset
		let rigPoint = new THREE.Vector3();
		layer.position = new THREE.Vector3();
		layer.quaternion = new THREE.Quaternion();
		layer.rigQuaternion = new THREE.Quaternion();
		//Update
		layer.quaternion.copy(rayEl.object3D.quaternion);
		layer.rigQuaternion.copy( auxl.playerRig.GetEl().object3D.quaternion);
		layer.position.copy(rayEl.object3D.position);
		layer.position.add(auxl.playerRig.GetEl().object3D.position);
		//Direction | Aim
		let direction = dir || new THREE.Vector3(0,0,-1);
/*
		if(rayEl.id === 'vrController1' || rayEl.id === 'vrController2'){
			direction = new THREE.Vector3(0,-1,0);
		}
*/
		direction.applyQuaternion(layer.quaternion);
		direction.multiplyScalar(distance);
		//Apply only on non float or -y local axis gravity
		if(!auxl.playerRig.GetEl().object3D.quaternion.equals(new THREE.Quaternion(0,0,0,1))){
			direction.applyQuaternion(layer.rigQuaternion)
		}
		rigPoint.copy(layer.position.clone().add(direction));
		return rigPoint;
	}
	//Get Camera Direction
	const GetCameraDirection = () => {
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		auxl.camera.GetEl().object3D.getWorldDirection(direction);
		return direction;
	}
	//Get Ray Direction
	const GetRayDirection = (rayEl) => {
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		rayEl.object3D.getWorldDirection(direction);
		return direction;
	}
	//Get Ray Direction - *****
	const GetRayDirectionRig = (rayEl, distance) => {
		//Direction
		let direction = new THREE.Vector3();
		rayEl.object3D.getWorldDirection(direction);
		//Rig Rotation
		let rigQuaternion = new THREE.Quaternion();
		rigQuaternion.copy(auxl.playerRig.GetEl().object3D.quaternion);
		//Apply only on non float or -y local axis gravity
		if(!auxl.playerRig.GetEl().object3D.quaternion.equals(new THREE.Quaternion(0,0,0,1))){
			direction.applyQuaternion(rigQuaternion)
		}
		if(distance){
			direction.multiplyScalar(distance);
		}
		return direction;
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
	//Calculate the position based on the direction and distance
	const MoveDir = (distance) => {
		let position = new THREE.Vector3();
		position.copy(GetCameraDirection());
		position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
		return position;
	/*
	//Move in Direction of Cam Forward along Floor
	//RaySpawnPoint(rayEl, spawnHeight, distance) 
	let cam = RaySpawnPoint(auxl.camera.GetEl(), 0, 1).clone();
	auxl.playerRig.GetEl().object3D.translateOnAxis(cam, -0.25);

	//Fly in Direction of Cam Forward
	let cam = new THREE.Vector3(0,0,0);
	auxl.camera.GetEl().object3D.getWorldDirection(cam);
	auxl.playerRig.GetEl().object3D.translateOnAxis(cam, -1);
	*/
	}
	//Rotate a Vec3 on X/Y/Z axis at an Angle with Matrix4
	const matrixAxisRot = (rayDir, axis, angle) => {
		let rotationMatrix = new THREE.Matrix4();
		let angleMath = 0;
		switch (angle) {
			case 0: angleMath = 0; break;
			case 30: angleMath = Math.PI/6; break;
			case 45: angleMath = Math.PI/4; break;
			case 60: angleMath = Math.PI/3; break;
			case 90: angleMath = Math.PI/2; break;
			case 120: angleMath = 2*Math.PI/3; break;
			case 135: angleMath = 3*Math.PI/4; break;
			case 150: angleMath = 5*Math.PI/6; break;
			case 180: angleMath = Math.PI; break;
			case 210: angleMath = 7*Math.PI/6; break;
			case 225: angleMath = 5*Math.PI/4; break;
			case 240: angleMath = 4*Math.PI/3; break;
			case 270: angleMath = 3*Math.PI/2; break;
			case 300: angleMath = 5*Math.PI/3; break;
			case 315: angleMath = 7*Math.PI/4; break;
			case 330: angleMath = 11*Math.PI/6; break;
			case 360: angleMath = 2*Math.PI; break;
			default: angleMath = Math.PI;
		}
		if(axis === 'x'){
			rotationMatrix.makeRotationX(angleMath);
		} else if(axis === 'y'){
			rotationMatrix.makeRotationY(angleMath);
		} else if(axis === 'z'){
			rotationMatrix.makeRotationZ(angleMath);
		}

		// Apply the rotation matrix
		const pointM = new THREE.Vector3().copy(rayDir).applyMatrix4(rotationMatrix);
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3();
		//Add Starting Position
		//Add normalized (-1 to 0 to 1) angle
		//Distance to next point at angle
		position.copy(new THREE.Vector3()).add(new THREE.Vector3(pointM.x, pointM.y, pointM.z).normalize());
	//console.log({rayDir,position,distance})
		return position;
	}
	//Return Position Direction of Camera at Axis Height Level
	const RaySpawnPoint = (rayEl, height, distance) => {
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		rayEl.object3D.getWorldDirection(direction);

		//Current Rotation Axis (1of6)
		let axis = new THREE.Vector3();
		if(auxl.playerRig.GetEl().components.gravitycontrol){
			axis.copy(auxl.playerRig.GetEl().components.gravitycontrol.axis)
		} else {
			axis.copy(new THREE.Vector3(0,-1,0))
		}
		//Use gravity axis to determine up direction and those other 2 planes
		let x = 0;
		let y = 0;
		let z = 0;
		//Find current up/down/side axis 
		if(axis.equals(new THREE.Vector3())){
			x = direction.x;
			y = 0;
			z = direction.z;
		} else {
			if(axis.x !== 0){
				x = 0;
				y = direction.y;
				z = direction.z;
			} else if(axis.y !== 0){
				x = direction.x;
				y = 0;
				z = direction.z;
			} else if(axis.z !== 0){
				x = direction.x;
				y = direction.y;
				z = 0;
			}
		}
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3(x, y, z).normalize().multiplyScalar(distance);
		if(x === 0){
			position.x = height;
		} else if(y === 0){
			position.y = height;
		} else if(z === 0){
			position.z = height;
		}
		return position;

	}
	const RaySpawnPointOG = (rayEl, height, distance) => {
		//Current Rotation Axis (1of6)
		let axis = new THREE.Vector3();
		if(auxl.playerRig.GetEl().components.gravitycontrol){
			axis.copy( auxl.playerRig.GetEl().components.gravitycontrol.axis)
		} else {
			axis.copy(new THREE.Vector3(0,-1,0))
		}
		//Up Direction holder
		let up = 1;

		//Direction
		let direction = new THREE.Vector3();
		rayEl.object3D.getWorldDirection(direction);
		//Rig Rotation
		let rigQuaternion = new THREE.Quaternion();
		rigQuaternion.copy( auxl.playerRig.GetEl().object3D.quaternion);
		//Apply only on non float or -y local axis gravity
		if(!auxl.playerRig.GetEl().object3D.quaternion.equals(new THREE.Quaternion(0,0,0,1))){
			direction.applyQuaternion(rigQuaternion)
		}
		//Use gravity axis to determine up direction and those other 2 planes
		//let jumpTo = new THREE.Vector3();
		let x = 0;
		let y = 0;
		let z = 0;
		//Find current up/down/side axis 
		if(axis.equals(new THREE.Vector3())){
			x = direction.x;
			y = 0;
			//y = height;
			z = direction.z;
		} else {
			if(axis.x !== 0){
				x = 0;
				//x = height * (axis.x * -1);
				y = direction.y;
				z = direction.z;
				if(axis.x < 0){
					up *= -1;
				}
			} else if(axis.y !== 0){
				x = direction.x;
				y = 0;
				//y = height * (axis.y * -1);
				z = direction.z;
				if(axis.y < 0){
					up *= -1;
				}
			} else if(axis.z !== 0){
				x = direction.z;
				y = direction.y;
				z = 0;
				//z = height * (axis.z * -1);
				if(axis.z < 0){
					up *= -1;
				}
			}
		}
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3();
		position.add(new THREE.Vector3(x, y, z).normalize().multiplyScalar(distance));
		if(x === 0){
			position.x = height * up;
		} else if(y === 0){
			position.y = height * up;
		} else if(z === 0){
			position.z = height * up;
		}
		return position;
	}

	//Ray Direction
	//Use rotation to determine direction. Breaks with rotated parent
	const RayDir = (rayEl, dist, dir) => {
		let position = new THREE.Vector3();
		let rayQuat = new THREE.Quaternion();
		let spawnDistance = dist || 1.5;
		let direction = dir || new THREE.Vector3(0,0,-1);
		if(rayEl.hasAttribute('raycaster')){
			let rayDirObj = rayEl.getAttribute('raycaster').direction;
			//Import into Vec3
			direction.x = rayDirObj.x;
			direction.y = rayDirObj.y;
			direction.z = rayDirObj.z;
			if(dir){
				direction.add(dir);
			}
		}
		//Ray Rotation
		rayEl.object3D.getWorldQuaternion(rayQuat);

		//Get Ray Position
		if(rayEl.id === 'camera'){
			//Special Rule for Camera Configuration
			auxl.headRig.GetEl().object3D.getWorldPosition(position)
		} else {
			rayEl.object3D.getWorldPosition(position)
		}

		//Apply Rotation to Direction
		direction.applyQuaternion(rayQuat);
		//Add Direction to Position
		position.add( direction.clone().multiplyScalar(spawnDistance));

		return {position, direction};
	}

	//Ray Coordinates ******
	//Use local/world coords and convert back/forth
	const RayCoord = (rayEl, dist, dir, parent) => {
		let position = new THREE.Vector3();
		let direction = dir || new THREE.Vector3(0, 0, -1);
		//Raycaster Offset
		if(rayEl.hasAttribute('raycaster')) {
			let rayDirObj = rayEl.getAttribute('raycaster').direction;
			// Import into Vec3
			direction.x = rayDirObj.x;
			direction.y = rayDirObj.y;
			direction.z = rayDirObj.z;
			if(dir){
				direction.add(dir);
				direction.normalize();
			}
		}

		// Create a local position vector in front of the entity
		//let localPosition = new THREE.Vector3(0, 0, dist || 1.5);
		let localPosition = direction.clone();
		localPosition.multiplyScalar(dist || 1.5);
//
		// Transform the local position vector to world space
		rayEl.object3D.localToWorld(localPosition);

		//Parent Coordinate Adjustment
		let parentEl = auxl.findInScene(parent);

		// Get Ray Position
		if(rayEl.id === 'camera') {
			//Special Rule for Camera Configuration
			auxl.headRig.GetEl().object3D.getWorldPosition(position);
			//Transform the world position vector to local space of parent
			//parentEl = auxl.playerBody.GetEl();
			parentEl = auxl.headRig.GetEl();
			parentEl.object3D.worldToLocal(localPosition);
		} else {
			rayEl.object3D.getWorldPosition(position);
			if(parentEl){
				//Transform the world position vector to local space of parent
				parentEl.object3D.worldToLocal(localPosition);
			}
		}

		// Set the transformed position
		position.copy(localPosition);
		direction.copy(position).normalize().multiplyScalar(dist || 1);

		return {position, direction};
	};

	//Determine Ground Floor Gravity Direction
	//Not working well just yet for either algos. Currently just toggling through all 7, but if I can scan, approx by direction or another workaround like a enviroment cube with clickable
	layer.tracking = false;
	layer.track2DInterval;
	let rotateGround = new THREE.Vector3(0,0,0);
	let trackPlayer = new THREE.Vector3(0,0,0);
	//Calc Gravity Direction
	function calcSurfaceNormal(pointA, pointB, pointC) {
		const vectorAB = new THREE.Vector3().subVectors(pointB, pointA);
		const vectorAC = new THREE.Vector3().subVectors(pointC, pointA);
		const surfaceNormal = new THREE.Vector3().crossVectors(vectorAB, vectorAC).normalize();

		return surfaceNormal;
	}
	function calcGravityDirection(pointA, pointB, pointC) {
		let surfaceNormal = calcSurfaceNormal(pointA, pointB, pointC);
		const gravityDirections = [
			new THREE.Vector3(0,-1,0),
			new THREE.Vector3(-1,0,0),
			new THREE.Vector3(0,0,-1),
			new THREE.Vector3(0,1,0),
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(0,0,1),
			new THREE.Vector3(0,0,0)
		];

		let closestDirection = null;
		let maxDot = -1;

		for (const direction of gravityDirections) {
			const dot = direction.dot(surfaceNormal);
			if (dot > maxDot) {
				maxDot = dot;
				closestDirection = direction;
			}
		}
		return closestDirection;
	}
	//Determine 2D Ground Floor
	const Track2D = (intersection) => {
		let a = intersection || new THREE.Vector3(0,0,0);
		//Return if intersection is default
		if(a.equals(new THREE.Vector3(0,0,0))){
			return;
		}
		trackPlayer.copy(auxl.playerRig.GetEl().getAttribute('position'))
		//Now that we have the starter point determine the general direction be capture 1 additional point differnt that confirm the direction		
		let b = new THREE.Vector3(0,0,0);
		let c = new THREE.Vector3(0,0,0);
		let loops = 0;
		layer.track2DInterval = setInterval(() => {
			loops++;
			//grab raycaster information and grab intersection, if different then calc it's direction from and update player gravityAxis
			if(b.equals(new THREE.Vector3(0,0,0))){
				b.copy( auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
			} else if(c.equals(new THREE.Vector3(0,0,0))){
				c.copy( auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
			}

			if(loops > 1){
				layer.localAxis = calcGravityDirection(a, b, c);
//console.log(layer.localAxis)
				loops = 0;
				clearInterval(layer.track2DInterval);
			}
/*
				if(start.x.toFixed(1) === intersection.x.toFixed(1)){
					if(start.x > 0){
						layer.localAxis = new THREE.Vector3(1,0,0);
						rotateGround = new THREE.Vector3(0,0,90);
					} else {
						layer.localAxis = new THREE.Vector3(-1,0,0);
						rotateGround = new THREE.Vector3(0,0,-90);
					}
				} else if(start.y.toFixed(1) === intersection.y.toFixed(1)){
					if(start.y > 0){
						layer.localAxis = new THREE.Vector3(0,1,0);
						rotateGround = new THREE.Vector3(180,0,0);
					} else {
						layer.localAxis = new THREE.Vector3(0,-1,0);
						rotateGround = new THREE.Vector3(0,0,0);
					}
				} if(start.z.toFixed(1) === intersection.z.toFixed(1)){
					if(start.z > 0){
						layer.localAxis = new THREE.Vector3(0,0,1);
						rotateGround = new THREE.Vector3(0,0,90);
					} else {
						layer.localAxis = new THREE.Vector3(0,0,-1);
						rotateGround = new THREE.Vector3(0,0,-90);
					}
				} else {
					layer.localAxis = new THREE.Vector3(0,0,0);
					 = new THREE.Vector3(0,0,0);
					console.log({error: 'Cannot Calculate', start, intersection})
				}
*/
		}, 300);
	}

	//
	//Raycaster Support

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
		if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
			auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		} else if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight' || auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'bothLeft' || auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.disabled', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			}
		}
	}
	//Enable Player Selection
	const EnableClick = () => {
		if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
			auxl.mouseController.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: false, useWorldCoordinates: false}});
		} else if(auxl.controls === 'VR'){
			if(auxl.vrHand === 'bothRight' || auxl.vrHand === 'right'){
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'bothLeft' || auxl.vrHand === 'left'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			} else if(auxl.vrHand === 'both'){
				auxl.vrController1.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
				auxl.vrController2.ChangeSelf({property: 'raycaster', value: {enabled: true, autoRefresh: true, objects: '.clickable', far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: true, useWorldCoordinates: false}});
			}
		}
	}

//Bring that system controls toggle setup into player
//Core Method DomClass = (domClasses, wipe)
//NOT IN USE YET
const RayControls = (controls) => {
	controls = controls || '.clickable,';
	auxl.mousecontroller.GetEl().setAttribute('raycaster',{enabled: 'true', autoRefresh: 'true', objects: controls, far: 'Infinity', near: 0.15, interval: 0, lineColor: 'red', lineOpacity: 0.5, showLine: 'false', useWorldCoordinates: 'false'});
}




	//Legacy
	//Display Link Anchor at Intersection
	const AnchorAtIntersection = () => {
		//Check for controller type
		if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
			if(layer.raycasters.hmdmouse.linkDisplay){
				if(auxl.mouseController.GetEl().components.raycaster.intersections.length > 0){
					layer.raycasters.hmdmouse.intersection = new THREE.Vector3(0,0,0);
					layer.raycasters.hmdmouse.intersection.copy( auxl.mouseController.GetEl().components.raycaster.intersections[0].point)
					if(!layer.raycasters.hmdmouse.linkAnchor.core.inScene){
						layer.raycasters.hmdmouse.linkAnchor.core.position = new THREE.Vector3(0,0,0);
						layer.raycasters.hmdmouse.linkAnchor.core.position.copy( layer.raycasters.hmdmouse.intersection);
						layer.raycasters.hmdmouse.linkAnchor.SpawnCore();
					} else {
						layer.raycasters.hmdmouse.linkAnchor.ChangeSelf({property: 'position', value: layer.raycasters.hmdmouse.intersection})
					}
				}
			}
		} else if(auxl.controls === 'VR'){
			if(['bothLeft','bothLeftLoco','left'].includes(auxl.vrHand)){
				if(layer.raycasters.hand1.linkDisplay){
					if(auxl.vrController1.GetEl().components.raycaster.intersections.length > 0){
						layer.raycasters.hand1.intersection = new THREE.Vector3(0,0,0);
						layer.raycasters.hand1.intersection.copy( auxl.vrController1.GetEl().components.raycaster.intersections[0].point)
						if(!layer.raycasters.hand1.linkAnchor.core.inScene){
							layer.raycasters.hand1.linkAnchor.core.position = new THREE.Vector3(0,0,0);
							layer.raycasters.hand1.linkAnchor.core.position.copy( layer.raycasters.hand1.intersection);
							layer.raycasters.hand1.linkAnchor.SpawnCore();
						} else {
							layer.raycasters.hand1.linkAnchor.ChangeSelf({property: 'position', value: layer.raycasters.hand1.intersection})
						}
					}
				}
			} else if(['bothRight', 'bothRightLoco', 'right'].includes(auxl.vrHand)){
				if(layer.raycasters.hand2.linkDisplay){
					if(auxl.vrController2.GetEl().components.raycaster.intersections.length > 0){
						layer.raycasters.hand2.intersection = new THREE.Vector3(0,0,0);
						layer.raycasters.hand2.intersection.copy( auxl.vrController2.GetEl().components.raycaster.intersections[0].point)
						if(!layer.raycasters.hand2.linkAnchor.core.inScene){
							layer.raycasters.hand2.linkAnchor.core.position = new THREE.Vector3(0,0,0);
							layer.raycasters.hand2.linkAnchor.core.position.copy( layer.raycasters.hand2.intersection);
							layer.raycasters.hand2.linkAnchor.SpawnCore();
						} else {
							layer.raycasters.hand2.linkAnchor.ChangeSelf({property: 'position', value: layer.raycasters.hand2.intersection})
						}
					}
				}
			}
		}


	}

	//Trigger raycaster component Tick
	//Activated on auxcontroller component Tick
	const Ticker = () => {
		//Update Closest Raycast Intersection and Element
		
		//Controls Tick

	}

	//Raycaster Event Tick
	//Activated on Ray Enter, Leave, Down & Up
	const RayTick = (event) => {
		let intersect = new THREE.Vector3(0,0,0);
//console.log(event)
if(event && event.detail && event.detail.intersections && event.detail.intersections[0] && event.detail.intersections[0].point){
	intersect.copy(event.detail.intersections[0].point);
} else if(event && event.detail && event.detail.intersection){
	intersect.copy(event.detail.intersection.point);
}
if(event && event.target){
//console.log(event.detail)
//intersectedEl

//intersection.distance

//intersection.face
//intersection.face.a
//intersection.face.b
//intersection.face.c
//intersection.face.materialIndex
//intersection.face.normal
//intersection.face.normal.x
//intersection.face.normal.y
//intersection.face.normal.z

//intersection.faceIndex

//intersection.object
//intersection.object[Object3D Property]

//intersection.point
//intersection.point.x
//intersection.point.y
//intersection.point.z

//intersection.uv
//intersection.uv.x
//intersection.uv.y


//mouseEvent
//mouseEvent.mousedown
//mouseEvent.mouseup
//mouseEvent.mouseup.target
//mouseEvent.mouseup.clientX
//mouseEvent.mouseup.clientY
//mouseEvent.mouseup...


	if(event.target.id === 'mouseController'){
		layer.raycasters.hmdmouse.intersection.copy(intersect);
		//layer.raycasters.hmdmouse.lastEvent = JSON.parse(JSON.stringify(event.detail));
	} else if(event.target.id === 'vrController1'){
		//layer.raycasters.hand1.lastEvent = JSON.parse(JSON.stringify(event.detail));
		layer.raycasters.hand1.intersection.copy(intersect);
	} else if(event.target.id === 'vrController2'){
		//layer.raycasters.hand2.lastEvent = JSON.parse(JSON.stringify(event.detail));
		layer.raycasters.hand2.intersection.copy(intersect);
	} else {
	}
}
/*
if(layer.raycaster.display){
	if(layer.raycaster.intersection){
		//console.log(layer.raycaster.intersection)
		layer.anchorCore.ChangeSelf({property: 'position', value: layer.raycaster.intersection})
		if(!layer.anchorCore.core.inScene){
			layer.anchorCore.SpawnCore();
		}
	}
}
*/

	}

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

		//console.log(event.detail.intersection.point)
	}

	//Trigger, Click, Mouse Leave
	const TriggerLeave = (event) => {
		//layer.power.Leave(event);
		//console.log(event)
		RayTick(event);
		//console.log(event)
	}

	//
	//Trigger Toggles
	//Toggles to control which powers type of click main/alt
	layer.playerPowers = true;
	//Trigger, Click, Mouse Down
	const TriggerDown = (event) => {
		if(layer.playerPhysics || layer.playerPowers){
			PowersDown(event)
		}
	}
	//Trigger, Click, Mouse Up
	const TriggerUp = (event) => {
		if(layer.playerPhysics || layer.playerPowers){
			PowersUp(event)
		}
	}



	//Disabled - Moved into Component. Confirm is working
	//Mouse Over Controller Events
	const ControllerEvents = (event) => {
//technically headcursor/mouse/gyro/trackpad/joystick
auxl.mouseController.GetEl().addEventListener('mouseleave', TriggerLeave(event));
auxl.mouseController.GetEl().addEventListener('mouseenter', TriggerEnter(event));
//auxl.mouseController.GetEl().addEventListener('mousedown', TriggerDown(event));
//auxl.mouseController.GetEl().addEventListener('mouseup', TriggerUp(event));

auxl.vrController1.GetEl().addEventListener('mouseleave', TriggerLeave(event));
auxl.vrController1.GetEl().addEventListener('mouseenter', TriggerEnter(event));
//auxl.vrController1.GetEl().addEventListener('mousedown', TriggerDown(event));
//auxl.vrController1.GetEl().addEventListener('mouseup', TriggerUp(event));

auxl.vrController2.GetEl().addEventListener('mouseleave', TriggerLeave(event));
auxl.vrController2.GetEl().addEventListener('mouseenter', TriggerEnter(event));
//auxl.vrController2.GetEl().addEventListener('mousedown', TriggerDown(event));
//auxl.vrController2.GetEl().addEventListener('mouseup', TriggerUp(event));

	}
	//ControllerEvents();

/*
Single Controller
- Key Button : Init Action
- Mod Button 1 : Mod 1 Action
- Mod Button 2 : Mod 2 Action
- Mod Button 3 : Mod 3 Action
- Mod Button 1+2 : Mod 4 Action
- Mod Button 1+3 : Mod 5 Action
- Mod Button 2+3 : Mod 6 Action
- Mod Button 1+2+3 : Mod 7 Action
*/
	//Modifier Controls
	layer.raycasters.hmdmouse.mods = {};
	layer.raycasters.hand1.mods = {};
	layer.raycasters.hand2.mods = {};
	const ModControl = ({slot, toggle}) => {

		//TEMP - Select the ray based on event
		let ray = layer.raycasters.hmdmouse;

		ray.mods[slot] = toggle || false;


	}




	//Toggle Actions - Button Down/Up
	//Need to update DelinkCore selection
	const ToggleAction = (toggle) => {
		layer.toggle0 = false;
		layer.toggle1 = false;
		layer.toggle2 = false;
		layer.toggle3 = false;
		layer.toggle4 = false;
		layer.toggle5 = false;
		layer.toggle6 = false;
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
		} else if(toggle === '6'){
			layer.toggle6 = true;
		} else {
			//How do I know which trigger is unlinking it
			DelinkCore(layer.raycasters.hmdmouse.linkCore);
			DelinkCore(layer.raycasters.hand1.linkCore);
			DelinkCore(layer.raycasters.hand2.linkCore);
		}
	}

	//
	//Physics

	//CANNON Physics
	layer.playerPhysics = false;

	//Phase out as it is handled by a component, currently used as ref in other methods though
	//Players Gravity local
	layer.worldGravity = new THREE.Vector3(0,0,0);
	layer.localAxis = new THREE.Vector3(0,0,0);
	layer.worldAxis = new THREE.Vector3(0,0,0);
	layer.gravity = new THREE.Vector3(0,0,0);
	layer.axis = new THREE.Vector3(0,0,0);

	//Joystick Movement Type
	layer.physMove = true;
	//impulse affetect by physics engine
	//position, not affected by physics engine

	//Rotation
	layer.rotation = new THREE.Quaternion(0,0,0,0);
	layer.rotation.copy( auxl.playerRig.GetEl().object3D.quaternion);

	//
	//Body

	//One Test Backup
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
	let bodyStyle1 = {
		type: 'dynamic', 
		shape: 'none',
		mass: 2.2,
		angularDamping: 0.425,
		linearDamping: 0.225,
	};

	//All Player Body Styles
	let bodyStyles = {};
	bodyStyles.default = bodyStyle1;
	//Assign current body type
	layer.body = bodyStyles.default;

	//
	//Material

	//Test Material 1
	let materialStyle1 = {
		friction : 0.01,
		restitution : 0.0075
	};
	//All Player Body Styles
	let materialStyles = {};
	materialStyles.default = materialStyle1;
	//Assign current body type
	layer.material = materialStyles.default;

	//
	//Shape

	//One Test Backup
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
		shape: 'cylinder',
		height: 1.7,
		radiusTop: 0.225,
		radiusBottom: 0.225,
		offset: '0 0.85 0',
	};
	//All
	let shapeStyles = {};
	shapeStyles.default = testShape1;
	//Assign current body type
	layer.shape = shapeStyles.default;

/*
	//Hands -
	layer.handBody = {type: 'dynamic', shape: 'none', mass: 0.1};
	//layer.handShape = {shape: 'box', height: 0.01, width: 0.01, depth: 0.01, offset: '0 1 -0.5',};
	layer.hand1Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '0.5 1 -0.5',};
	layer.hand2Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '-0.5 1 -0.5',};
*/


//Abstract standard physics systems to use with various platforms
//Cannon
//Ammo
//Banter

	//
	//Enable Physics
	const EnablePhysics = (bodyShape) => {
		if(auxl.worldPhysics === 'ammo'){
			EnablePhysicsAmmo(bodyShape)
		} else if(auxl.worldPhysics === 'cannon'){
			EnableCannonPhysics(bodyShape);
		} else {
console.log({msg: 'Failed to recognize physics engine', engine: auxl.worldPhysics, layer})
		}
	}
	//Disable Physics
	const DisablePhysics = () => {
		if(auxl.worldPhysics === 'ammo'){
			DisablePhysicsAmmo()
		} else if(auxl.worldPhysics === 'cannon'){
			DisableCannonPhysics();
		} else {
console.log({msg: 'Failed to recognize physics engine', engine: auxl.worldPhysics, layer})
		}
	}

	//
	//AMMO

	//Enable Physics Ammo
	const EnablePhysicsAmmo = (bodyShape) => {

//Add ammo-body and shape to avatar
auxl.avatarHand1.ChangeSelf([{property: 'ammo-body', value: {type: 'kinematic', emitCollisionEvents: true,}}, {property: 'ammo-shape', value: {type: 'box'}}, {property: 'kinsync', value: {type: 'other', auxlObj: 'vrController1', offset: new THREE.Vector3(0,0,0), sync: true,}}])
auxl.avatarHand2.ChangeSelf([{property: 'ammo-body', value: {type: 'kinematic', emitCollisionEvents: true,}}, {property: 'ammo-shape', value: {type: 'box'}}, {property: 'kinsync', value: {type: 'other', auxlObj: 'vrController2', offset: new THREE.Vector3(0,0,0), sync: true,}}])
auxl.avatarTorso.ChangeSelf([{property: 'ammo-body', value: {type: 'kinematic', emitCollisionEvents: true,}}, {property: 'ammo-shape', value: {type: 'cylinder'}}])
auxl.avatarHead.ChangeSelf([{property: 'ammo-body', value: {type: 'kinematic', emitCollisionEvents: true,}}, {property: 'ammo-shape', value: {type: 'sphere'}}])





	}

	//Disable Physics Ammo
	const DisablePhysicsAmmo = () => {
		//remove ammo-body and shape from all
		auxl.avatar.RemoveComponentAll(['ammo-body', 'ammo-shape', 'kinsync'])
	}


	//
	//CANNON

	//Enable
	const EnableCannonPhysics = (bodyShape) => {
		if(bodyShape && bodyShape.body){
			layer.body = bodyShape.body;
		}
		if(bodyShape && bodyShape.shape){
			layer.shape = bodyShape.shape;
		}

		//Add Avatar Body
		auxl.playerRig.EnablePhysics({body: layer.body, shape: layer.shape});


		//Update Easy Access Body for Changes
		layer.worldBody = auxl.playerRig.GetEl().body;
		layer.playerPhysics = true;
//Movement Style
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

		//Body Material Settings
		auxl.playerRig.ChangeSelf({property:'bodymaterial', value: layer.material});

		//Collision Component Testing
		//auxl.playerRig.ChangeSelf({property:'collision', value: null});

		//Gravity Controls
		//auxl.playerRig.ChangeSelf({property:'gravitycontrol', value: {type: 'float', axis: new THREE.Vector3(0,0,0), customGravity:50, velocityExpo: 1000, gravityObject: 'planet1'}});//125
		auxl.playerRig.ChangeSelf({property:'gravitycontrol', value: {type: 'float', axis: new THREE.Vector3(0,0,0), customGravity:0.00001, velocityExpo: 1000, gravityObject: 'none'}});


		//Disable Rotation for now replace with Gimbal component
		auxl.playerRig.GetEl().body.fixedRotation = true;
		auxl.playerRig.GetEl().body.updateMassProperties();

		//Sync Camera aka Head Movement to Phys
		//Should be able to headbutt something
		//auxl.camera.ChangeSelf({property: 'camerasync', value: null});

		//Bug Workaround
		//To use Ticker with linkAnchor move to intersection point, need to disable hovering animations otherwise they go haywire.
		auxl.mouseController.RemoveComponent( ['animation__hoverenter', 'animation__hoverleave']);
/*
		//Hands
		//Add Hand
		//auxl.camera.EnablePhysics({body: layer.handBody, shape: layer.handShape});
		//Connect Hand to Body
		//auxl.camera.ChangeSelf({property: 'auxconstraint__hand', value: {type: 'pointToPoint', pivotB: new THREE.Vector3(0,1.6,0), connectTo: 'playerRig', maxForce: 1e6, collideConnected: false}});
		//auxl.playerRig.GetEl().setAttribute('shape__hand1',  layer.handShape);
		//auxl.playerRig.GetEl().setAttribute('shape__hand2',  layer.hand2Shape);
*/

		//Enable Raycaster Help Link Cores
		//ToggleRayHelp(true);
	}

	//Disable
	const DisableCannonPhysics = () => {
		auxl.playerRig.DisablePhysics();
		auxl.playerRig.RemoveComponent(['gravitycontrol', 'bodymaterial']);
		layer.worldBody = false;
		layer.playerPhysics = false;
	}

	//Pause Physics Simulation for self
	const TogglePlayerPhysics = (enable) => {
		if(enable){
			auxl.playerRig.GetEl().body.wakeUp();
		} else {
			auxl.playerRig.GetEl().body.sleep();
		}
	}

	//Pause Physics Simulation for all bodies except self if true
	const PausePhysics = (self) => {
		auxl.playerRig.GetEl().body.world.bodies.forEach(body => body.sleep());
		if(self){
			auxl.playerRig.GetEl().body.wakeUp();
		}
	}
	//Resume Physics
	const ResumePhysics = () => {
		auxl.playerRig.GetEl().body.world.bodies.forEach(body => body.wakeUp());
	}

	//Allow Jump
	layer.jumping = false;
	layer.jumpDistance = 4;
	layer.jumpTimeout;
	//Phys Jump
	const PhysJump = (vel, deg, dist) => {
		if(!layer.jumping){
			layer.jumping = true;
			//Velocity
			let velocity = vel || 4;
			const desiredAngleRad = THREE.MathUtils.degToRad(45);
			//Axis
			let axis = new THREE.Vector3();
			axis.copy( auxl.playerRig.GetEl().components.gravitycontrol.axis)
			let upward = new THREE.Vector3();
			upward.copy(axis)
			upward.negate()
			//Direction
			let forward = new THREE.Vector3();
			auxl.camera.GetEl().object3D.getWorldDirection(forward);
			forward.negate();
			let jumpDirection = new THREE.Vector3(0,0,0);
			jumpDirection.copy(forward).add(upward).multiplyScalar(velocity);
			auxl.playerRig.GetEl().body.velocity.x = jumpDirection.x;
			auxl.playerRig.GetEl().body.velocity.y = jumpDirection.y;
			auxl.playerRig.GetEl().body.velocity.z = jumpDirection.z;
		}
	}
	//Phys Jump Reset (Only in -Y axis confirmed)
    auxl.playerRig.GetEl().addEventListener("collide",function(e){
    	const contactNormal = new CANNON.Vec3();
		//Axis
		let axis = new THREE.Vector3();
		axis.copy(auxl.playerRig.GetEl().components.gravitycontrol.axis)
		let upAxis = new THREE.Vector3();
    	upAxis.copy(axis);
    	upAxis.negate();
        const contact = e.detail.contact;
        if(contact.bi.id == auxl.playerRig.GetEl().body.id){
            contact.ni.negate(contactNormal);
		} else {
            contactNormal.copy(contact.ni);
		}
		//Need to account for player axis
        if(contactNormal.dot(upAxis) > 0.5){
			layer.jumping = false;
		}
    });

	//Gravity
	const setAllGravity = (axisType) => {
		if(!auxl.playerRig.GetEl().components.gravitycontrol){return}
		if(axisType.type || axisType.type === 0){
auxl.playerRig.GetEl().components.gravitycontrol.setTypes(axisType.type);

auxl.playerRig.GetEl().components.gravitycontrol.setWorldTypes(axisType.type);
		}
		if(axisType.axis || axisType.axis === 0){
auxl.playerRig.GetEl().components.gravitycontrol.setAxis(axisType.axis);

auxl.playerRig.GetEl().components.gravitycontrol.setWorldAxis(axisType.axis);
		}
	}
	//Gravity Axis
	const setAllGravityAxis = (axis) => {
		setAllGravity({axis})
	}
	//Gravity Type
	const setAllGravityTypes = (type) => {
		setAllGravity({type})
	}
	//Cycle All Gravity Types
	const cycleAllGravityTypes = () => {
	if(!auxl.playerRig.GetEl().components.gravitycontrol){return}
auxl.playerRig.GetEl().components.gravitycontrol.cycleTypes();
auxl.playerRig.GetEl().components.gravitycontrol.cycleWorldTypes();
	}
	//Cycle World Gravity Axis
	const cycleWorldGravityAxis = () => {
	if(!auxl.playerRig.GetEl().components.gravitycontrol){return}
auxl.playerRig.GetEl().components.gravitycontrol.cycleWorldAxis();
	}



	//
	//Actions
	//
	//Personal Gravity Axis & Planet Type w/ Velocity or Off/Float
	//World Gravity Axis & Planet Type w/ Velocity or Off/Float
	//Jump
	//Parachute
	//Boost Forward
	//Boost Reverse
	//Freeze|UnFreeze
	//Brake
	//Redirect
	//Rubberband (Pogo, Swing, Launch)
	//Teleport
	//Shoot - bullet pool for all rays and targets to hit
	//Link Attach - TODO - Link at intersection with constraint, so if it moves, you move.

	//Button click events fire continously, at least for desktop. Test other platforms to be sure, but implement workaround to avoid issues

	//Powers Down
	const PowersDown = (event) => {
		RayTick(event);
		//Toggle Powers
		if(layer.toggle0){
			RubberbandDown(event);
		} else if(layer.toggle1){
			ShootDown(event);
		} else if(layer.toggle2){
			teleportToDown(event);
		} else if(layer.toggle3){
			RedirectDown(event)
		} else if(layer.toggle4){
			BoostDown(event)
		} else if(layer.toggle5){
			BackBoostDown(event)
		} else if(layer.toggle6){
			HoverTargetDown(event)
		}  else {
			//Selection Raycaster Power
		}
	}
	//Powers Up
	const PowersUp = (event) => {
		//console.log(event)
		RayTick(event);
		//Toggle Powers
		if(layer.toggle0){
			RubberbandUp(event);
		} else if(layer.toggle1){
			ShootUp(event);
		} else if(layer.toggle2){
			teleportToUp(event);
		} else if(layer.toggle3){
			RedirectUp(event)
		} else if(layer.toggle4){
			BoostUp(event)
		} else if(layer.toggle5){
			BackBoostUp(event)
		} else if(layer.toggle6){
			HoverTargetUp(event)
		} else {
			//Selection Raycaster Power
		}
		auxl.mouseControllerUI.EmitEvent('reset')
	}

	//Raycaster Build Charge - The higher the number the shorter the charge
	//Display ray ref core in front of raycaster that scales ever bigger to to full power to help demonstrate the charge process and timing.
	const RayBuildStart = (rayId, increment, interval) => {
		let rubberRay = false;
		if(rayId === 'mouseController'){
			rubberRay = layer.raycasters.hmdmouse;
		} else if(rayId === 'vrController1'){
			rubberRay = layer.raycasters.hand1;
		} else if(rayId === 'vrController2'){
			rubberRay = layer.raycasters.hand2;
		} else {
			return;
		}
		DelinkCore(rubberRay.linkCore);
		rubberRay.power = 1000;
		let speed = 1 || interval;
		let amount = 15 || increment;
		clearInterval(rubberRay.linkInterval)

		//Display Charging
		rubberRay.uiCore.EmitEvent('charge')

		//Get Charge
		rubberRay.linkInterval = setInterval(() => {
			if(rubberRay.power >= amount){
				rubberRay.power -= amount;
			} else {
				rubberRay.uiCore.EmitEvent('charged');
				clearInterval(rubberRay.linkInterval);
			}
		}, speed);
	}

	//Parachute (Fall without Velocity)
	//Spawn an object above the player
	const ChuteUp = () => {
//console.log('chute up')
auxl.playerRig.GetEl().components.gravitycontrol.data.chuteOpen = false;
	}
	const ChuteDown = () => {
//console.log('chute down')
auxl.playerRig.GetEl().components.gravitycontrol.data.chuteOpen = true;
	}

	//Boost (In Raycaster Looking Direction)
	layer.boostDistance = 25;
	const BoostUp = (event) => {
		if(layer.toggle4){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			BoostTo(rubberRayEl, rubberRay);
		}
	}
	const BoostDown = (event) => {
		if(layer.toggle4){
			RayBuildStart(event.target.id);
		}
	}
	const BoostTo = (raycasterEl, power) => {
		let direction = new THREE.Vector3();
		direction.copy(GetRayDirection(raycasterEl))
		direction.multiplyScalar(layer.boostDistance);
		direction.negate();
		auxl.playerRig.GetEl().body.applyLocalImpulse(direction, new THREE.Vector3(0,0,0));
	}

	//Back Boost (In Raycaster Opposite Looking Direction)
	layer.backBoostDistance = 20;
	const BackBoostUp = (event) => {
		if(layer.toggle5){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			BackBoost(rubberRayEl, rubberRay.power);
		}
	}
	const BackBoostDown = (event) => {
		if(layer.toggle5){
			RayBuildStart(event.target.id);
		}
	}
	const BackBoost = (raycasterEl, power) => {
		let direction = new THREE.Vector3();
		direction.copy(GetRayDirection(raycasterEl))
		direction.multiplyScalar(layer.backBoostDistance);
		auxl.playerRig.GetEl().body.applyLocalImpulse(direction, new THREE.Vector3(0,0,0));
	}

	//Freeze
	const Freeze = () => {
		if(auxl.playerRig.GetEl(true).body){
			auxl.playerRig.GetEl().body.sleep();
		}

	}
	//UnFreeze
	const UnFreeze = () => {
		if(auxl.playerRig.GetEl(true).body){
			auxl.playerRig.GetEl().body.wakeUp();
		}
	}

	//Brake
	layer.brakeDoubleTapSet = false;
	layer.playerRedirect = new THREE.Vector3();
	//The longer it is held, the close to complete stop you get. Otherwise snaps back to normal linear damping.
	const BrakeUp = (event) => {
		auxl.playerRig.GetEl().body.linearDamping = layer.brakeOff;
		clearInterval(layer.brakeInterval);
		//Double Tap Support
		layer.brakeDoubleTapSet = true;
		layer.brakeDoubleTapTimeout = setTimeout(() => {
			layer.brakeDoubleTapSet = false;
		}, 500);
	}
	const BrakeDown = (event) => {
//console.log('Brake down')
		if(layer.brakeDoubleTapSet){
			//Sudden Brake
			layer.brakeOff = layer.body.linearDamping;
			auxl.playerRig.GetEl().body.linearDamping = 0.9;
			layer.brakeDoubleTapSet = false;
			clearTimeout(layer.brakeDoubleTapTimeout);
		} else {
			//Gradual Brake
			layer.brakeOff = layer.body.linearDamping;
			layer.braking = layer.brakeOff/32;
			clearInterval(layer.brakeInterval);
			layer.brakeInterval = setInterval(() => {
				if(auxl.playerRig.GetEl().body.linearDamping < 0.9){
	//console.log({current: auxl.playerRig.GetEl().body.linearDamping, adding: layer.braking})
					auxl.playerRig.GetEl().body.linearDamping += layer.braking;
				} else {
					clearInterval(layer.brakeInterval);
				}
			}, 1);
		}
	}

	//Redirect
	const RedirectUp = (event) => {
		if(layer.toggle3){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			clearInterval(layer.redirectInterval);
			Redirect(rubberRayEl, rubberRay)
		}
	}
	const RedirectDown = (event) => {
		//Base Speed Max
		layer.velocitySpeed = 0;

		//Gradual Brake
		layer.brakeOff = layer.body.linearDamping;
		layer.braking = layer.brakeOff/32;
		clearInterval(layer.redirectInterval);
		layer.redirectInterval = setInterval(() => {
			if(layer.velocitySpeed < 121){
				layer.velocitySpeed++;
//console.log(layer.velocitySpeed)
			} else {
				clearInterval(layer.redirectInterval);
			}
			if(auxl.playerRig.GetEl().body.linearDamping < 0.9){
				auxl.playerRig.GetEl().body.linearDamping += layer.braking;
			}
		}, 1);
	}
	const Redirect = (rayEl, ray) => {
		auxl.playerRig.GetEl().body.linearDamping = layer.brakeOff;
		//Not velocity, but raycaster
		layer.playerRedirect.copy(GetRayDirectionRig(rayEl));
//console.log(layer.velocitySpeed)
//console.log(layer.playerRedirect)
		layer.playerRedirect.normalize().multiplyScalar(layer.velocitySpeed).negate();
//console.log(layer.playerRedirect)
		auxl.playerRig.GetEl().body.applyLocalImpulse(layer.playerRedirect, new THREE.Vector3(0,0,0));
	}

	//Rubberband
	const RubberbandUp = (event) => {
		if(layer.toggle0){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			Rubberband(rubberRayEl, rubberRay)
		}
	}
	const RubberbandDown = (event) => {
		if(layer.toggle0){
			RayBuildStart(event.target.id);
		}
	}
	const Rubberband = (rayEl, ray) => {
		//Prep Power
		ray.power/=1000
		//Link Distance
		let linkDistance = ray.distance || 42;
		//Bamboo Bounce Back 
		let bambooBounce = 0;
		//Tap Spring Backz
		if(ray.power > 0.85){
			bambooBounce = 15;
		}
		let position = new THREE.Vector3();
		//Ray Intersection Check
		if(DistanceFromPlayer(ray.intersection) <= linkDistance){
			position.copy(ray.intersection);
		} else {
			position.copy(RayDir(rayEl, linkDistance).position);
		}
		//Link Length
		let linkLength = linkDistance * ray.power + bambooBounce;
		//Build Effect
		ray.linkConstraint.Connect({type: 'auxspring', restLength: linkLength, damping: 0.5, stiffness: 0, maxForce: 1e6});
		//Display Effect Link
		if(ray.linkCore.core.inScene){
			ray.linkCore.PhysPos(position);
		} else {
			ray.linkCore.core.position = position;
			ray.linkCore.SpawnCore();
		}
	}

	//Teleport
	layer.teleDistance = 5;//5-55
	const teleportToUp = (event) => {
		if(layer.toggle2){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			TeleportTo(rubberRayEl, rubberRay);
		}
	}
	const teleportToDown = (event) => {
		if(layer.toggle2){
			RayBuildStart(event.target.id);
		}
	}
	const TeleportTo = (rayEl, ray) => {
		if(ray.power < 100){
			ray.power = 100;
		}
		ray.power /= 1000;
		//Teleport Distance
		let teleDistance = layer.teleDistance + (layer.teleDistance / ray.power);
		let position = new THREE.Vector3();
		//Ray Intersection Check
		if(DistanceFromPlayer(ray.intersection) <= teleDistance){
			position.copy(ray.intersection);
		} else {
			position.copy(RigPoint(teleDistance,rayEl));
		}
		let teleportTimeout1 = setTimeout(() => {
			auxl.playerRig.PhysPos(position)
			Freeze();
			let teleportTimeout2 = setTimeout(() => {
				UnFreeze();
				clearTimeout(teleportTimeout1);
				clearTimeout(teleportTimeout2);
			}, 275);
		}, 225);
		PlayerQuickAnim();
	}

	//Shoot
	layer.bulletLasts = 15000;
	layer.bulletAt = 0;
	const ShootUp = (event) => {
		if(layer.toggle1){
			let rubberRay = false;
			let rubberRayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rubberRayEl = auxl.camera.GetEl();
				rubberRay = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rubberRayEl = auxl.vrController1.GetEl();
				rubberRay = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rubberRayEl = auxl.vrController2.GetEl();
				rubberRay = layer.raycasters.hand2;
			} else {
				return;
			}
			Shoot(rubberRayEl, rubberRay);
		}
	}
	const ShootDown = (event) => {
		//Build Charge
		if(layer.toggle1){
			RayBuildStart(event.target.id);
		}
	}
	const Shoot = (rayEl, ray) => {
		if(!ray.shooting){
			ray.shooting = true;
			//Prep Power
			ray.power/=1000
			//Tap
			if(ray.power > 0.75){
				//Quick Shot
				ray.power = 0.5;
			}
			//RayDir(rayEl, dist, dir)
			//Bullets spawn X meters away to ensure does not conflict with body
			let shootPrep = RayDir(rayEl, 0.35);

			//Add Charge
			let speed = 30;
			shootPrep.direction.multiplyScalar((1-ray.power)*speed);
			//Spawn bullet if needed, update position
			let resetDespawn = false;
			if(ray.bullets[layer.bulletAt].core.inScene){
				ray.bullets[layer.bulletAt].PhysPos(shootPrep.position);
				ray.bullets[layer.bulletAt].RemoveComponent('velocity');
				ray.bullets[layer.bulletAt].GetEl().body.velocity.x = shootPrep.direction.x;
				ray.bullets[layer.bulletAt].GetEl().body.velocity.y = shootPrep.direction.y;
				ray.bullets[layer.bulletAt].GetEl().body.velocity.z = shootPrep.direction.z;
				resetDespawn = true;
			} else {
				ray.bullets[layer.bulletAt].core.components.velocity = {};
				ray.bullets[layer.bulletAt].core.components.velocity.x = shootPrep.direction.x;
				ray.bullets[layer.bulletAt].core.components.velocity.y = shootPrep.direction.y;
				ray.bullets[layer.bulletAt].core.components.velocity.z = shootPrep.direction.z;
				ray.bullets[layer.bulletAt].core.position = shootPrep.position;
				ray.bullets[layer.bulletAt].SpawnCore();
			}

			//Add Power Velocity
			clearTimeout(ray.shootTimeout)
			ray.shootTimeout = setTimeout(() => {
				//Next Bullet
				layer.bulletAt++;
				if(layer.bulletAt >= ray.bullets.length){
					layer.bulletAt = 0;
				}
				ray.shooting = false;
				clearTimeout(ray.shootTimeout)
			}, 3);

			//Remove bullet Timeout - Needs to be reset when bullet is still in scene
			let currentBullet = layer.bulletAt;
			if(resetDespawn){
				clearTimeout(ray['bulletTimeout'+ currentBullet])
			}
			ray['bulletTimeout'+ currentBullet] = setTimeout(() => {
				ray.bullets[currentBullet].DespawnCore();
				clearTimeout(ray['bullet'+ currentBullet])
			}, layer.bulletLasts);

		}
	}


//
//Hover Targets
//Identify 1 or more objects for action
//Hover target once to add to list
//Hover target again to remove from list
//Last target is dropped when new target is selected

//Engage action toggle, drag on/off targets to add or remove, press grip to cancel or release to trigger action on targets

//Targetting
//Which raycaster is used on which button?
//For mobile / desktop : camera
//For vr : controller 1 or 2

//TODO
//Target Pool
//Ammo Pool
//Targetting Distance Limit
//Target Adaptations for various shapes sizes

//Add to GenRaycasters
layer.raycasters.hmdmouse.id = 'mouseController';
layer.raycasters.hand1.id = 'vrController1';
layer.raycasters.hand2.id = 'vrController2';

layer.raycasters.hmdmouse.targets = [];
layer.raycasters.hand1.targets = [];
layer.raycasters.hand2.targets = [];

layer.raycasters.hmdmouse.maxTargets = 12;
layer.raycasters.hand1.maxTargets = 12;
layer.raycasters.hand2.maxTargets = 12;

layer.raycasters.hmdmouse.targetDistance = 50;
layer.raycasters.hand1.targetDistance = 50;
layer.raycasters.hand2.targetDistance = 50;

layer.raycasters.hmdmouse.targetChecked = false;
layer.raycasters.hand1.targetChecked = false;
layer.raycasters.hand2.targetChecked = false;

//Target
const BuildTarget = (id, color) => {

	let baseColor = color || "#eb07a5";
	let linkCoreData = {
		id: 'target'+id,
		sources: false,
		text: false,
		//geometry: {primitive: 'ring', radiusInner: 0.4, radiusOuter: 0.5},
		geometry: {primitive: 'torus', arc: 360, radius: 0.4, radiusTubular: 0.01, segmentsRadial: 36, segmentsTubular: 32},
		material: {shader: "standard", color: baseColor, emissive: baseColor, emissiveIntensity: 0.25, opacity: 1, side: 'double'},
		position: new THREE.Vector3(0,0,0),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
	animations: {
		targettedx: {property: 'object3D.scale.x', from: 3, to: 1, dur: 250, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		targettedy: {property: 'object3D.scale.y', from: 3, to: 1, dur: 250, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		targettedz: {property: 'object3D.scale.z', from: 3, to: 1, dur: 250, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},

		hitx: {property: 'object3D.scale.x', from: 1, to: 4, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fire'},
		hity: {property: 'object3D.scale.y', from: 1, to: 4, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fire'},
		hitz: {property: 'object3D.scale.z', from: 1, to: 4, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fire'},
/*
		hitx2: {property: 'object3D.scale.x', from: 4, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__hitx'},
		hity2: {property: 'object3D.scale.y', from: 1, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__hity'},
		hitz2: {property: 'object3D.scale.z', from: 4, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__hitz'},
*/
	},
		mixins: false,
		classes: ['a-ent'],
		components: {
			['look-at-xyz']:{match: 'camera', x:true, y:true, z:true},
		},
	}; 
	let linkAnchor = auxl.Core(linkCoreData);
	return linkAnchor;
}


const BuildAmmo = (id, offset, lifetime, color) => {

	let offsetPos = offset || new THREE.Vector3(0,0,0);
	let dur = lifetime || 1000;
	let baseColor = color || "#eb07a5";
	let ammoCoreData = {
		id: 'ammo'+id,
		sources: false,
		text: false,
		geometry: {primitive: 'box', width: 0.25, height: 0.25, depth: 0.25},
		material: {shader: "standard", color: baseColor, emissive: baseColor, emissiveIntensity: 0.25, opacity: 0.69, side: 'double'},
		position: offsetPos,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: {
hit: {property: 'position', to: new THREE.Vector3(0,0,0), dur, delay: 0, loop: false, dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: true, enabled: true, },
		},
		mixins: false,
		classes: ['a-ent'],
		components: false,
	}; 
	return auxl.Core(ammoCoreData);
}


//Loop through maxTargets amount to build a pool of targets to use instead of creating/destroying each time



//mouseenter and mouseleave seem to work on a face by face basis, so not the entire object which doesn't work well for


//Raycaster Hover On/Off & Confirm/Clear/Cancel
//mouseenter
const RayOn = (rayEl, ray) => {
	//check if the closest ray intersection has a class of target
	//Check for closest intersection when allowed
	if(!ray.targetsLocked && !ray.blocked && !ray.targetChecked && rayEl.components.raycaster.intersections.length > 0){
//console.log({msg: 'on', rayEl, ray})

		ray.intersection = new THREE.Vector3(0,0,0);
		let targetEl = false;



		//Loop through intersections and skip all that are self before continuing
		//rayEl.components.raycaster.intersections.forEach(each =>{
		rayEl.components.raycaster.intersections.every(each => {
//console.log(ray.id)
//console.log(each.object.el.id)
			if(each.object.el.id === ray.id){
//console.log({msg: 'bad target', each})
  				return true;
			} else {
				ray.intersection.copy(each.point)
				ray.intersectionEl = each.object.el;
				targetEl = each.object.el;
//console.log({msg: 'good potential target', each})
				return false;
			}

		})

//console.log({msg: 'intersections', all : rayEl.components.raycaster.intersections, first: rayEl.components.raycaster.intersections[0], targetEl,})


		//Attach to Targets Only not just clickables
		if(!targetEl || !targetEl.classList.contains('target')){
			//console.log('Not a Target')
			return;
		}

//console.log({msg: 'target', targetEl, classes: targetEl.classList, contains: targetEl.classList.contains('target')})
		if(ray.targets.includes(targetEl)){
//disabled as you can click remove or just hover a new one to replace, but changing faces toggles event switches on doesn't work well on full entity
			//Remove from list
			//ray.targets.splice(ray.targets.indexOf(targetEl), 1);
			//let targetIcon = document.getElementById('target'+targetEl.id)
			//targetEl.removeChild(targetIcon)
			//Instead of delete, use a pool
		} else {
			//check list size
			if(ray.targets.length >= ray.maxTargets){
				
				let targetIcon = document.getElementById('target'+ray.targets[0].id)
				ray.targets[0].removeChild(targetIcon)
				ray.targets.shift();
			}
			//Add to list
			ray.targets.push(targetEl);
			//Spawn Target Icon
			let targetIconCore = BuildTarget(ray.intersectionEl.id, '#fff500');
			targetIconCore.SpawnCore(ray.intersectionEl)
		}
		//Target Checked
		ray.targetChecked = true;
	}
}
//mouseleave
const RayOff = (rayEl, ray) => {
//console.log({msg: 'off', rayEl, ray})
	//Clear Targetting
	ray.targetChecked = false;
}
//mousedown
const TargetsClear = (rayEl, ray) => {
//console.log({msg: 'off', rayEl, ray})
	//Clear Targetting
	ray.targets.forEach(each => {
		let targetIcon = (document.getElementById('target'+each.id))? document.getElementById('target'+each.id) : false;
		if(targetIcon){each.removeChild(targetIcon)}
	})
	ray.blocked = true;
}
//mouseup
const TargetsReady = (rayEl, ray) => {
//console.log({msg: 'off', rayEl, ray})
	ray.targets = [];
	ray.targetsLocked = false;
	ray.blocked = false;
}
//altmousedown
const TargetsLock = (rayEl, ray) => {
//console.log({msg: 'off', rayEl, ray})
	ray.targetsLocked = true;
}
//Ray Event
const RayHit = (event) => {
//console.log({msg:'Ray Hit', event})

	//Choose Ray
	let rayId = event.target.id;
	let ray = false;
 	let rayEl = false;
	if(rayId === 'mouseController'){
		ray = layer.raycasters.hmdmouse;
		rayEl = auxl.mouseController.GetEl();
	} else if(rayId === 'vrController1'){
		ray = layer.raycasters.hand1;
		rayEl = auxl.vrController1.GetEl();
	} else if(rayId === 'vrController2'){
		ray = layer.raycasters.hand2;
		rayEl = auxl.vrController2.GetEl();
	} else {
		return;
	}

//Track which ray is doing which force power, so that on mouseup could instead of clear the targets, but launch them.

//Lock in selection - Hold mouse down to get targets locked in or release to clear. 

	//Ray Event Relay
	if(event.type === 'raycaster-intersection'){
		RayOn(rayEl, ray)
	} else if(event.type === 'raycaster-intersection-cleared'){
		RayOff(rayEl, ray)
	} else if(event.type === 'raycaster-closest-entity-changed'){
		//RayOff(rayEl, ray)
		//RayOn(rayEl, ray)
	} else if(event.type === 'mousedown'){
		TargetsLock(rayEl, ray)
	} else if(event.type === 'mouseup'){
		TargetsClear(rayEl, ray)
		TargetsReady(rayEl, ray)
	}
/*
No Lock in
mouse down to clear and stop
mouse up to allow

 else if(event.type === 'mousedown'){
		TargetsClear(rayEl, ray)
	} else if(event.type === 'mouseup'){
		TargetsReady(rayEl, ray)
	}
*/

}

//
//Target Toggles

//ActionDown
const HoverTargetDown = (actionParams) => {
//console.log(actionParams)
	let ray = false;
	let rayEl = false;
	let rayId = false;
	if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
		ray = layer.raycasters.hmdmouse;
		rayEl = auxl.mouseController.GetEl();
	} else if(auxl.controls === 'VR'){
/*
if(rayId === 'vrController1'){
ray = layer.raycasters.hand1;
rayEl = auxl.vrController1.GetEl();
} else if(rayId === 'vrController2'){
ray = layer.raycasters.hand2;
rayEl = auxl.vrController2.GetEl();
}
*/
	} else {
		return;
	}
	//Ray Helper
	rayId = rayEl.id;

	//No Hover Targetting
	if(actionParams === 'launch'){

	} else{
		//Hover Targetting Ray Event Bindings
		rayEl.addEventListener('raycaster-intersection',RayHit);
		rayEl.addEventListener('raycaster-intersection-cleared',RayHit);
		rayEl.addEventListener('raycaster-closest-entity-changed',RayHit);
		rayEl.addEventListener('mousedown',RayHit);
		rayEl.addEventListener('mouseup',RayHit);
	}


	//Animation is at 1sec charge cycle intervals
	//Starts at 1000, increment is removed each interval.
	RayBuildStart(rayId, 0.5, 1)

}

//ActionUp
const HoverTargetUp = (actionParams) => {
	let ray = false;
	let rayEl = false;
	if(auxl.controls === 'Desktop' || auxl.controls === 'Mobile'){
		ray = layer.raycasters.hmdmouse;
		rayEl = auxl.mouseController.GetEl();
	} else if(auxl.controls === 'VR'){
/*
if(rayId === 'vrController1'){
ray = layer.raycasters.hand1;
rayEl = auxl.vrController1.GetEl();
} else if(rayId === 'vrController2'){
ray = layer.raycasters.hand2;
rayEl = auxl.vrController2.GetEl();
}
*/
	} else {
		return;
	}

	//Reset Charge Display
	clearInterval(ray.linkInterval)
	ray.uiCore.EmitEvent('reset')

	//Action
	//Remove
	//if(!ray.blocked){HoverTargetEnd(rayEl, ray)}
	//Launch
	if(!ray.blocked){HoverTargetLaunch(rayEl, ray, actionParams)}
	//Clear Binding
	rayEl.removeEventListener('raycaster-intersection',RayHit);
	rayEl.removeEventListener('raycaster-intersection-cleared',RayHit);
	rayEl.removeEventListener('raycaster-closest-entity-changed',RayHit);
	rayEl.removeEventListener('mousedown',RayHit);
	rayEl.removeEventListener('mouseup',RayHit);
}

//Hover Target Launch
const HoverTargetLaunch = (rayEl, ray, type) => {
	//Clear targets and prevent more until action is complete/ready
	TargetsClear(rayEl, ray)

	let removeTimeout = setTimeout(() => {
		//Clear targets and prevent more until action is complete/ready
		TargetsReady(rayEl, ray)
		clearTimeout(removeTimeout)
	}, 500);

//Ways of throwing
//Free / Raycast Point <-> Object Position Direction
//Away / forwardDirection
//Pull / forwardDirection.negate()
//Throw Up / direction.x & z @ 0
//Grab / constraint to ray
//Release / remove constraint


function drop(){
	ray.grabbed.forEach(each => {
		//attach a constraint to each target instead of impulse
		each.removeAttribute('ammo-constraint');
	})
	ray.grabbed = [];
}

//Launch converts to grabbed targets
if(ray.grabbed.length > 0){
	ray.targets = [...ray.grabbed];
	drop();
}


//Release or Action
if(type === 'release'){
	drop();
} else {
	//Spawn an go home animated Ammo attached to target as player to target offset
	ray.targets.forEach(each => {
		//get target pos
		//get raycast point
		//get direction from both vec3 & normalize
		//multiply by power - the time in between targetting and releasing

		//Check if target is not dynamic, if so skip
		if(each.components['ammo-body'].data.type !== 'dynamic'){
			console.log({msg: 'Target is not dynamic, cannot grab', each, rayEl, ray, type})
			return;
		}

		//
		//Free & Up

		//Float Distance between player and target
		let player = new THREE.Vector3();
		let obj = new THREE.Vector3();
		auxl.playerRig.GetEl().object3D.getWorldPosition(player);
		each.object3D.getWorldPosition(obj);
		let distance = player.distanceTo(obj);
		let targetPosition = each.body.getCenterOfMassTransform();
		let raycastPoint = RayDir(rayEl, distance).direction;

		//Calculate the direction from both vectors and normalize:
		let direction = new THREE.Vector3().sub(raycastPoint, targetPosition).normalize();
		direction.negate();

		//Max Power Multiplier
		let max = 22;
		//Type Override
		let action = type || 'free';
		if(action === 'free'){
		//as is
		} else  if(action === 'pull'){
			//Vec3 Distance between target and player
			direction = new THREE.Vector3();
			let target = new THREE.Vector3();
			auxl.playerRig.GetEl().object3D.getWorldPosition(direction);
			each.object3D.getWorldPosition(target);
			direction.sub(target)//difference between player and object
			direction.normalize();
			direction.add(new THREE.Vector3(0,2,0));
			//max is the distance between object and player
			max = 14;
			distance = (distance > max)? max: distance;
			distance = (distance < 4)? 4: distance;
			max = (distance <= max)? distance : max;
		} else if(action === 'up'){
			//Throw Up Limit movement to Y axis only
			direction.setZ(0);
			direction.setX(0);
		} else if(action === 'grab' || action === 'flick'){
			let target = false;
			if(ray.id === 'mouseController'){
				target = 'avatarHead'; 
			} else if(ray.id === 'vrController1'){
				target = 'avatarHand1';
			} else if(ray.id === 'vrController2'){
				target = 'avatarHand2';
			}
			let timing = 0;
			let destroy = each.hasAttribute('ammo-constraint');
			if(destroy){
				console.log({msg: 'ammo-constraint still attached, removing and delaying.', each})
				each.removeAttribute('ammo-constraint');
				timing = 25;
			}

			if(action === 'flick'){
				let flickTimeout = setTimeout(() => {
					drop();
					clearTimeout(flickTimeout);
				}, 150);
			} else {
				let swapDelay = setTimeout(() => {
					//Just in Case Bail to avoid Crash
					let bail = each.hasAttribute('ammo-constraint');
					if(bail){
						console.log({msg: 'ammo-constraint still not removed, bailing.', timing, each})
						TargetsClear(rayEl, ray)
						TargetsReady(rayEl, ray)
						return;
					}
					//attach a constraint to each target instead of impulse
	//Options: lock, fixed, spring, slider, hinge, coneTwist, pointToPoint.
					each.setAttribute('ammo-constraint',{type: 'lock', target: '#' + target});
					ray.grabbed.push(each)
					clearTimeout(swapDelay)
				}, timing);
			}

		} else if(action === 'launch'){
			drop();
		}
		//Non-grab 
		if(action === 'grab'){
		} else {
			//Directional Multiplier of Power (time between targeting and releasing):
			let power = (1000-ray.power)/1000;
			power *= max;
			direction.multiplyScalar(power)

			//Apply Ammo Impulse Force
			let x = direction.x;
			let y = direction.y;
			let z = direction.z;
			const impulse = new Ammo.btVector3(x, y, z);
			const pos = new Ammo.btVector3(0, 0, 0);
			each.body.applyImpulse(impulse, pos);
			//Ammo Garbage Collection
			Ammo.destroy(impulse);
			Ammo.destroy(pos);
		}
	})
}


}

//Auto Hit & Remove
const HoverTargetEnd = (rayEl, ray) => {
	let lifetime = 1000;
	let color = '#823cbe';
	let ammos = [];
	//Spawn an go home animated Ammo attached to target as player to target offset
	ray.targets.forEach(each => {
		let offset = new THREE.Vector3();
		let target = new THREE.Vector3();
		auxl.playerRig.GetEl().object3D.getWorldPosition(offset);
		each.object3D.getWorldPosition(target);
		offset.sub(target)
		offset.add(new THREE.Vector3(0,1,0))
		let ammo = BuildAmmo(each.id, offset, lifetime, color);
		ammos.push(ammo)
		ammo.SpawnCore(each)
	})
/* NOT WORKING
	let animTimeout = setTimeout(() => {
		//Prep Animation Triggers
		ray.targets.forEach(each => {
			let targetIcon = (document.getElementById('target'+each.id)) ? document.getElementById('target'+each.id) : false ;
			if(targetIcon){
				targetIcon.emit('fire',{bubbles: false})
				//console.log(targetIcon)
			}
		})
		clearTimeout(animTimeout)
	}, lifetime);
*/
	let removeTimeout = setTimeout(() => {
		//Clear targets and prevent more until action is complete/ready
		TargetsClear(rayEl, ray)
		clearTimeout(removeTimeout)
	}, lifetime);

	//Remove ammo after use and ready action
	let shootTimeout = setTimeout(() => {
		ammos.forEach(each => {
			each.DespawnCore();
		})
		ray.targets.forEach(each => {
			if(auxl[each.id]){
				if(auxl[each.id].core){
					auxl[each.id].DespawnCore();
				} else if(auxl[each.id].layer){
					auxl[each.id].DespawnLayer();
				} 
			} else {
				let remove = document.getElementById(each.id);
				remove.parentNode.removeChild(remove);
			}

		})
		TargetsReady(rayEl, ray)
		clearTimeout(shootTimeout)
	}, lifetime+100);

}



	//
	//Earthbend
	//Click spot (quick hold), 1 meter cube slowly rises up lifting anything above it. Click spot, hold and release to launch long cuboid from that spot
	const EarthbendUp = (event) => {
		if(layer.toggle3){
			let ray = false;
			let rayEl = false;
			if(event.target.id === 'mouseController'){
				clearInterval(layer.raycasters.hmdmouse.linkInterval);
				rayEl = auxl.camera.GetEl();
				ray = layer.raycasters.hmdmouse;
			} else if(event.target.id === 'vrController1'){
				clearInterval(layer.raycasters.hand1.linkInterval);
				rayEl = auxl.vrController1.GetEl();
				ray = layer.raycasters.hand1;
			} else if(event.target.id === 'vrController2'){
				clearInterval(layer.raycasters.hand2.linkInterval);
				rayEl = auxl.vrController2.GetEl();
				ray = layer.raycasters.hand2;
			} else {
				return;
			}
			Earthbend(rayEl, ray);
		}
	}
	const EarthbendDown = (event) => {
		//Build Charge
		if(layer.toggle3){
			RayBuildStart(event.target.id);
		}
	}
	const Earthbend = (rayEl, ray) => {}

	//4 directional toggleable light sword. Directions make it go from sword, to claws, to sheild, to dagger.

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

	//Monkeyball Sphere Pin Float Vehicle
	//Pin an object with low rubber band pool and float the user. Use can tug themselves in various directions with the environment sphere 

	//spin object
	//el.body.torque.y += 100;


	//Link Controls
	//Delink
	const DelinkCore = (linkCore) => {
		if(linkCore.core.inScene){
			linkCore.DespawnCore();
		}
	}

	//Link Attach
	const LinkAttach = (rayEl, ray) => {
		//The bigger the charge, the shorter the distance between points will rest at
		//Prep Power
		ray.power/=1000
		let position = new THREE.Vector3();
		//Ray Intersection Check
		if(DistanceFromPlayer(ray.intersection) <= ray.distance){
			position.copy(ray.intersection);
		} else {
			position.copy(RigPoint(ray.distance,rayEl));
		}
		//Build Effect
		ray.linkConstraint.Connect({type: 'pointToPoint', connectTo: 'raycasterObject', pivotA: new THREE.Vector3(0,6,0), pivotB: new THREE.Vector3(0,-0.5,0), maxForce: 1e6});
		//Display Effect Link
		ray.linkCore.core.position = position;
		ray.linkCore.SpawnCore();

	}

	//Legacy - Rework
	//Link Length Up restLength
	const LinkUp = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Up');
			if(layer.linkLength < maxLinkLength){
				layer.linkLength++;
			}
			layer.linkConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Length Down restLength
	const LinkDown = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Down');
			if(layer.linkLength > 1){
				layer.linkLength--;
			}
			layer.linkConstraint.Connect({restLength: layer.linkLength});
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

	//Emit Event
	const EmitEvent = (eventName, bubbles) => {
		auxl.playerRig.EmitEvent(eventName, bubbles);
	}

	//Testing
	//Testing Function
	const TestFunc = (params) => {
		console.log(params);
	}
	//Button Firing Test
	let fired = 0;
	const FiringTest = (params) => {
		fired++;
		console.log({fired, params});
		auxl.firingTest.ChangeSelf({property: 'text', value: {value: 'Hit : '+ fired}});
	}

	//
	//Fixed Dev Controls

	//Keyboard
	document.addEventListener("keydown", (e) => {
//console.log(e.key)
		if(e.key === '`'){
			//Main Menu Toggle
			//MainMenuAction()
		} else if(e.key === '1'){
			//Snap Rotate Rig Left
			//SnapLeft();
		} else if(e.key === '2'){
			//Cycle Zoom Main Camera
			//CycleCameraZoom(false, 'camera');
		} else if(e.key === '3'){
			//Cycle Zoom Main Camera
			//CycleCameraZoom(true, 'camera');
		} else if(e.key === '4'){
			//Snap Rotate Rig Right
			//SnapRight();
		} else if(e.key === 'ArrowUp'){
			//Cycle Zoom Roam Camera
			//CycleCameraZoom(false, 'roam');
		} else if(e.key === 'ArrowDown'){
			//Cycle Zoom Roam Camera
			//CycleCameraZoom(true, 'roam');
		} else if(e.key === 'ArrowLeft'){
			//ToggleRoamCamView();
		} else if(e.key === 'ArrowRight'){
			//ToggleRoamCamView();
		}
	});

	return {layer, player, Reset, CameraSwitch, CameraSwitchBack, PlayerSceneAnim, UpdateSceneTransitionStyle, PlayerTeleportAnim, PlayerQuickAnim, PlayerFadeOut, PlayerFadeIn, UpdateTeleportTransitionStyle, UpdateTransitionColor, GetCameraDirection, ToggleVRText, UpdateUIText, ToggleBeltText, UpdateBeltText, ToggleHoverText, UpdateHoverText, ToggleFloorText, Notification, UpdateActions, TempDisableClick, DisableClick, EnableClick, UnlockLocomotion, LockLocomotion, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, ChangeLocomotionType, RemoveBelt, ToggleCrouch, SnapRight, SnapLeft, ToggleFlashlight, ResetUserPosRot, GetPlayerInfo, ToggleRayHelp, CamRigPoint, RigPoint, RaySpawnPoint, RayDir, RayDistanceDirection, GetRayDirectionRig, AttachToPlayer, Equip, Unequip, MainMenuAction, DetachFromPlayer, EnablePhysics, DisablePhysics, setAllGravity, setAllGravityAxis, setAllGravityTypes, cycleAllGravityTypes, cycleWorldGravityAxis, ToggleAction, Rubberband, TeleportTo, BoostTo, BackBoost, ChuteUp, ChuteDown, BrakeUp, BrakeDown, RedirectUp, RedirectDown, Redirect, Freeze, UnFreeze, DelinkCore, LinkUp, LinkDown, LinkGrab, LinkDrop, LinkShoot, LinkHit, PhysJump, UpdatePlayerPosition, TwistTo, ToggleBackgroundAudio, Ticker, TriggerEnter, TriggerDown, TriggerUp, TriggerLeave, Track2D, EmitEvent, TestFunc, TogglePlayerPhysics, CycleCameraZoom, ToggleRoamCamView, HoverTargetDown, HoverTargetUp, ToggleSnapMode, LinkDistance, CamRigAdjust, RayCoord};
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
	comp.el = false;
	comp.inScene = false;
	comp.infoDisplay = false;
	comp.pos = auxl.playerRig.GetEl().getAttribute('position');
	comp.height = 1.5;
	comp.distance = 2;
	comp.spawnToggling = false;

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
	//Right A
	//Main Menu
	comp.mainMenuData = {
	info:{
		id: 'mainMenu',
		buttonData: auxl.menuCylinderData,
		hoverData: auxl.menuHoverData,
		title: 'Main Menu',
		description: 'Main menu for travel, system and settings.',
		layout:'circleUp',
		offset: -1.025,
		posOffset: new THREE.Vector3(0,0,0),
		parent: 'ghostParent',
		stare: false,
		npc: 'compNPC',
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
		button4:{
			id: 'worldJump',
			style: false,
			title: 'World Jump',
			description: 'Jump into a new World.',
			subMenu: 'worlds1',
			action: false,
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
	worlds1:{
		button0:{
			id: 'XRcadeWorld',
			style: false,
			title: 'XRcade World',
			description: 'Load the arcade world of XRcade.',
			subMenu: false,
			action: {
				auxlObj: 'xrcadeWorld',
				component: false,
				method: 'SwapWorld',
				params: 'xrcadeWorld',
				menu: 'close',
			},
		},
		button1:{
			id: 'GridWorld',
			style: false,
			title: 'Grid World',
			description: 'Load the world of Grid map collision showcase.',
			subMenu: false,
			action: {
				auxlObj: 'gridWorld',
				component: false,
				method: 'SwapWorld',
				params: 'gridWorld',
				menu: 'close',
			},
		},
		button2:{
			id: 'AmmoWorld',
			style: false,
			title: 'Ammo World',
			description: 'Load the world of Ammo Physics.',
			subMenu: false,
			action: {
				auxlObj: 'ammoWorld',
				component: false,
				method: 'SwapWorld',
				params: 'ammoWorld',
				menu: 'close',
			},
		},
		button3:{
			id: 'CannonWorld',
			style: false,
			title: 'Cannon World',
			description: 'Load the world of Cannon Physics.',
			subMenu: false,
			action: {
				auxlObj: 'cannonWorld',
				component: false,
				method: 'SwapWorld',
				params: 'cannonWorld',
				menu: 'close',
			},
		},
		button4:{
			id: 'MascotWorld',
			style: false,
			title: 'Mascot World',
			description: 'Load the world of Mascot',
			subMenu: false,
			action: {
				auxlObj: 'mascotWorld',
				component: false,
				method: 'SwapWorld',
				params: 'mascotWorld',
				menu: 'close',
			},
		},
		button5:{
			id: 'CaosWorld',
			style: false,
			title: 'Caos World',
			description: 'Load the world of Caos',
			subMenu: false,
			action: {
				auxlObj: 'caosWorld',
				component: false,
				method: 'SwapWorld',
				params: 'caosWorld',
				menu: 'close',
			},
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
/*
		button5:{
			id: 'action5',
			style: false,
			title: 'Ray Helper Toggle',
			description: 'Toggle between ray helpers on or off.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ToggleRayHelp',
				params: 'toggle',
				menu: 'close',
			},
		},
		button5:{
			id: 'TargettingSystem',
			style: false,
			title: 'Target Assistant Helper Toggles.',
			description: 'Toggle between ray helpers on or off.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ToggleTargetHelp',
				params: 'toggle',
				menu: 'close',
			},
		},
*/
		button0:{
			id: 'subMenu0',
			style: false,
			title: 'Adjust Camera Height',
			description: 'Manually adjust the camera height.',
			subMenu: 'camRigMenu',
			action: false,
		},
		button01:{
			id: 'action2',
			style: false,
			title: '45/90 Snap Rotation Toggle',
			description: 'Toggle between 45* or 90* degree snap rotation.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ToggleSnapMode',
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
		button5:{
			id: 'action3',
			style: false,
			title: 'Reset Player Pos/Rot',
			description: 'Reset your Position and Rotation.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'ResetUserPosRot',
				params: null,
				menu: 'stay',
			},
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
	camRigMenu:{
		button0:{
			id: 'action1',
			style: false,
			title: 'Up',
			description: 'Adjust rig upward by 0.1 .',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'CamRigAdjust',
				params: 'up',
				menu: 'stay',
			},
		},
		button1:{
			id: 'action2',
			style: false,
			title: 'Down',
			description: 'Adjust rig downward by 0.1 .',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'CamRigAdjust',
				params: 'down',
				menu: 'stay',
			},
		},
		button2:{
			id: 'action3',
			style: false,
			title: 'Reset',
			description: 'Reset camera rig height back to 0.',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'CamRigAdjust',
				params: 'reset',
				menu: 'stay',
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


	//Legacy
	function cameraDirectionY(){
		let direction = auxl.player.GetRayDirectionRig(auxl.camera.GetEl());
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3().copy(auxl.camera.GetEl().object3D.position).add(new THREE.Vector3(direction.x, 0, direction.z).normalize().multiplyScalar(comp.distance));
		position.y = comp.height;
		return position;
	}

	//Minimum spawning distance
	let minSpawnDistance = 1.5;


	//!!!!!!!!!!!!!!!!!
	//Move into Player
	//cameraDirection
	//UpAxis
	//TurnToPlayer

	//Fixed height Camera Ray
	function cameraDirection(){
		//let direction = new THREE.Vector3().copy(auxl.player.RayDir(auxl.camera.GetEl(), comp.distance, new THREE.Vector3(0,0,-2)).direction);
		//direction.setY(comp.height);
		//return direction;

		let direction = new THREE.Vector3().copy(auxl.player.RayCoord(auxl.camera.GetEl(), comp.distance, new THREE.Vector3(0,0,-1)).direction);

		direction.setY(comp.height);

		return direction;
/*
		let direction = new THREE.Vector3().copy(auxl.player.RayDir(auxl.camera.GetEl(), comp.distance, new THREE.Vector3(0,0,-2)).direction);
		direction.setY(comp.height);
		return direction;
*/

/*
		//Get the position vector in world space
		let position = new THREE.Vector3();
		auxl.camera.GetEl().object3D.getWorldDirection(position);
		position.multiplyScalar(comp.distance);

		position.setY(comp.height);
		return position;

		let quaternion = new THREE.Quaternion().copy(auxl.camera.GetEl().object3D.quaternion);
		position.applyQuaternion(quaternion);
		let shootPrep = auxl.player.RayDir(rayEl, 0.35);

		let direction = auxl.player.RayDistanceDirection(auxl.camera.GetEl());
		//let direction = auxl.player.RayDir(auxl.camera.GetEl(), 1).direction
		direction.negate();
		let position = new THREE.Vector3();
		position = direction.clone().multiplyScalar(comp.distance);
		position.setY(comp.height);
		return position;

*/
	}
	function UpAxis(){
		//Current Rotation Axis (1of6)
		let axis = new THREE.Vector3(0,-1,0);
		if(auxl.playerRig.GetEl().components.gravitycontrol){
			axis.copy( auxl.playerRig.GetEl().components.gravitycontrol.axis)
			if(axis.equals(new THREE.Vector3())){
				axis.copy(new THREE.Vector3(0,-1,0));
			}
		}
		axis.negate();
		return axis;
	}
	//Face Player
	const TurnToPlayer = () => {
		let position = new THREE.Vector3();
		auxl.headRig.GetEl().object3D.getWorldPosition(position)
		let up = UpAxis().clone();
		up.multiplyScalar(auxl.camera.GetEl().object3D.position.y)
		position.add(new THREE.Vector3(0,1.6,0))
		auxl.comp.GetEl().object3D.up.copy(up);
		auxl.comp.GetEl().object3D.lookAt(position);

/*
	//Get Position of Stare Object
	this.idPosition = new THREE.Vector3();
	this.idPosition.copy(document.getElementById(this.data.id).object3D.position);
	//If player, add current camera height
	if(this.data.id === 'playerRig'){
		this.idPosition.y += (document.getElementById('camera').object3D.position.y + document.getElementById('playerBody').object3D.position.y);
	}
	//Twist will not look up or down
	if(this.data.twist){
		this.idPosition.y = this.el.object3D.position.y;
	}
	this.el.object3D.lookAt(this.idPosition);

auxl.player.RayDir(auxl.camera.GetEl(), 1.5).position

		let position = new THREE.Vector3().copy(auxl.camera.GetEl().object3D.position);
		let up = UpAxis().clone();
		up.multiplyScalar(auxl.camera.GetEl().object3D.position.y)
		//position.add(up)
		auxl.comp.GetEl().object3D.up.copy(up);
		auxl.comp.GetEl().object3D.lookAt(position);
*/

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
	//Toggle Companion Display
	const ToggleComp = () => {
		if(!comp.spawnToggling){
			comp.spawnToggling = true;
			if(comp.inScene){
				DespawnComp();
			} else {
				SpawnComp();
			}
			let toggleTimeout = setTimeout(() => {
				comp.spawnToggling = false;
				clearTimeout(toggleTimeout);
			}, 500);
		}
	}
	//Update Position
	const UpdatePosition = () => {
		if(comp.avatarType === 'core'){
			comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
		} else {
			comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
		}
	}
	//Drag To Position
	let dragInterval;
	const DragToPosition = (toggle) => {
		if(auxl.isFalsey(toggle)){
			clearInterval(dragInterval);
		} else {
			clearInterval(dragInterval);
			dragInterval = setInterval(() => {
				if(comp.avatarType === 'core'){
					comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
				} else {
					comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
				}
				TurnToPlayer();
			}, 1);
		}
	}
	//Spawn & Start Companion
	const SpawnComp = () => {
		if(comp.inScene){}else{
			auxl.compNPC.SpawnNPC(auxl.headRig.GetEl());  
			if(comp.avatarType === 'core'){
				comp.avatar.ChangeSelf({property: 'position', value: cameraDirection()});
			} else {
				comp.avatar.ChangeParent({property: 'position', value: cameraDirection()});
			}
			//autoScriptEmoticon();
			let spawnTimeoutTiny = setTimeout(() => {
				TurnToPlayer();
				clearTimeout(spawnTimeoutTiny);
			}, 10);
			let spawnTimeout = setTimeout(() => {
				//auxl.build.SpawnBuild();
				//Update Inventory
				if(comp.enableInventory){
					UpdateInventoryMenu();
				}
				//Update Main Menu Parent Shape ID
				auxl.mainMenu.multiMenu.parent = comp.menuParentId;
				auxl.mainMenu.SpawnMultiMenu();
				auxl.build.SpawnBuild();
				comp.inScene = true;
				auxl.player.ToggleBeltText(true);
				auxl.player.ToggleHoverText(true);
				auxl.player.ToggleFloorText(true);
				clearTimeout(spawnTimeout);
			}, 100);
		}
	}
	//Despawn & Stop Companion
	const DespawnComp = () => {
		if(comp.inScene){
			comp.playerQuat0 = auxl.playerRig.GetEl().object3D.quaternion.clone();
			auxl.player.ToggleBeltText();
			auxl.player.ToggleHoverText();
			auxl.player.ToggleFloorText();
			//clearInterval(speechTimeoutB);
			//clearInterval(speechIntervalB);
			auxl.mainMenu.DespawnMultiMenu();
			auxl.build.DespawnBuild();
			//Delay to let multi-menu complete it's despawn seq
			let despawnTimeout = setTimeout(() => {
				auxl.compNPC.DespawnNPC();
				auxl.RemoveFromTracker(comp.id);
				comp.inScene = false;
				clearTimeout(despawnTimeout);
			}, 300);
		}
	}
	//Get Current Avatar El
	const GetEl = () => {
		if(comp.avatarType === 'core'){
			return comp.avatar.GetEl();
		} else {
			return comp.avatar.GetParentEl();
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
	const ToggleControlViewOG = () => {
		if(comp.viewConfig){
			auxl.configurationView.DespawnCore();
			comp.viewConfig = false;
		} else {
			auxl.configurationView.SpawnCore(auxl.playerRig.GetEl());
			auxl.configurationView.ChangeSelf({property: 'text', value: {value: auxl.controlsText}});
			comp.viewConfig = true;
		}
	}

	//Generalize these methods

	//Fixed height Camera Ray
	const ViewDir = (distance, height) => {
		let direction = auxl.player.RayDistanceDirection(auxl.camera.GetEl());
		direction.negate();
		let position = new THREE.Vector3();
		position = direction.clone().multiplyScalar(distance);
		position.setY(height);
		return position;
	}
	//Face Player
	const FacePlayer = (el) => {
		let position = new THREE.Vector3().copy(auxl.playerRig.GetEl().object3D.position);
		let up = UpAxis().clone();
		up.multiplyScalar(auxl.camera.GetEl().object3D.position.y)
		position.add(up)
		el.object3D.up.copy(up);
		el.object3D.lookAt(position);
	}

	const ToggleControlView = () => {
		if(comp.viewConfig){
			auxl.configurationView.DespawnCore();
			comp.viewConfig = false;
		} else {
			auxl.configurationView.SpawnCore(auxl.playerRig.GetEl());

			auxl.configurationView.ChangeSelf([{property: 'text', value: {value: auxl.controlsText}}, {property: 'position', value: ViewDir(-1, 1.5)}, ]);
			comp.viewConfig = true;
			let spawnTimeoutTiny = setTimeout(() => {
				FacePlayer(auxl.configurationView.GetEl());
				clearTimeout(spawnTimeoutTiny);
			}, 10);
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
		button4:{
			id: 'worldJump',
			style: false,
			title: 'World Jump',
			description: 'Jump into a new World.',
			subMenu: 'worlds1',
			action: false,
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

	return{comp, TestFunc, AddAvatar, UpdateShape, UpdateBook, SpawnComp, DespawnComp, GetEl, SetFlag, GetFlag, TurnToPlayer, UpdatePosition, ToggleControlView, UpdateMainMenu, UpdateMainMenuStyle, EnableInventory, AddToInventory, ClearInventoryNotifications, RemoveFromInventory, CheckInventory, CheckForKey, UpdateInventoryMenu, DragToPosition};
}


//
//Export
export {Player, Companion};