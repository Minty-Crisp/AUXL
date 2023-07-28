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
const Player = (auxl, id,layer) => {
	//Player Name
	layer.id = id;

	//Update Layer Copy
	//layer.layer.all.parent.core.core.id = id;

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

	//Physics
	layer.playerPhysics = false;

	//Joystick Movement Type
	layer.physMove = true;
	//impulse affetect by physics engine
	//position, not affected by physics engine

	//Rig Attributes

	//Test Backup
	let bodyBackup = {
		name: 'testingBodyv0.1',
		type: 'dynamic', 
		shape: 'none',
		mass: 1,
		angularDamping: 0.5,
		linearDamping: 0.5,
		friction : 0.1,
		restitution : 1
	};
	//Test Body 1
	let playerTestBody1 = {
		name: 'playerTestBody0.1',
		type: 'dynamic', 
		shape: 'none',
		mass: 3,
		angularDamping: 0.2,
		linearDamping: 0.2,
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
		linearDamping: 0.5,
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

	//Hands
	layer.handBody = {type: 'dynamic', shape: 'none', mass: 0.1};
	//layer.handShape = {shape: 'box', height: 0.01, width: 0.01, depth: 0.01, offset: '0 1 -0.5',};
	layer.hand1Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '0.5 1 -0.5',};
	layer.hand2Shape = {shape: 'box', halfExtents: '0.1 0.1 0.1', offset: '-0.5 1 -0.5',};

	//Allow Jump
	layer.jumping = false;
	layer.jumpTimeout;

	//Link
	//layer.distance = 25;

	//Spawn Player
	layer.SpawnLayer();
	//Currently not tracking Player object as it should not be removed

	//Update Current Position
	layer.gridPos.copy(auxl.playerRig.GetEl().getAttribute('position'));

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
	//Get Camera Direction
	const GetCameraDirection = () => {
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		camera.object3D.getWorldDirection(direction);
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

//
//Interaction States
//on tick, check wether to run interaction update

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
//Keysl - tap, press, hold, release, match, pattern,
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

//Raycaster

	layer.raycaster = {};
	layer.raycaster.name = 'minty0';
	layer.raycaster.powers = {};
	layer.raycaster.power = 'rubberband';

	//Add to playerRig a support component for updating important info
	//Power Controller
	const PowerController = (event) => {
console.log({event: 'Power Controller Running', event})
		//depending on the event input run power section

		//Connect to and run powers main controller for tick based controls

		//Temp
		//
		//Rubber Band
		if(layer.raycaster.power === 'rubberband'){
			RubberbandController();
		}

	}


	//Power Obj Gen
	const Power = (powerData) => {
		//Base Class
		let raycaster = {}
		raycaster.data = powerData; 
		raycaster.last = false;
		raycaster.localHome = false;
		raycaster.worldHome = false;
		return raycaster;

	}
	//Toggles
	layer.toggle0 = false;
	layer.toggle1 = false;

//Temp
//Hold down space button to activate rubberband
//Key Down
document.body.addEventListener('keydown', (e) => {
	if (e.key === ' ') {
		//Start moving player
		layer.toggle0 = true;
	} else if (e.key === 'b' || e.key === 'B') {
		//Start moving player
		layer.toggle1 = true;
	}

});
//Key Up
document.body.addEventListener('keyup', (e) => {

	if (e.key === ' ') {
		//Start moving player
		layer.toggle0 = false;
		Delink();
	} else if (e.key === 'b' || e.key === 'B') {
		//Start moving player
		layer.toggle1 = false;
		Delink();
	}

});


	//Cursor|Link
	//VR Dual 6Dof Controller Raycaster
	//
	//Extend from raycaster
	//Object Intersecting
	//Object synced attached to raycaster movement/rotation
	const Link = (data) => {
		//Currently setup for a single link to player
		//Link
		layer.distance = 25;
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
			geometry: {primitive: 'sphere', radius: 0.25,},
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

	//Pointing
	const ActionPoint = (event) => {
		//Use default raycaster for intersection interaction
		//Raycaster Pointing
		//Direction
		//Intersection

	}


	//
	//Actions

	//Both need to connect to closest intersection object if instead

	//Rubber Controller
	const RubberbandController = (event) => {
		//Rubber Tick Controls
console.log('Rubberband running')
	}
	//Rubberband
	const RubberbandUp = (event) => {
		if(layer.toggle0){
			//console.log(event)
			//console.log('Link')
			//console.log(this.data.type)
			//console.log(event)
			console.log('click')
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
	console.log(layer.quaternion)
	console.log(layer.position)
			//layer.position.negate();
	//console.log(layer.position)
		// Step 1: Get the Object3D's rotation as a Quaternion
		const rotationQuaternion = layer.quaternion.clone();
		// Step 2: Create a direction vector pointing towards the positive Z-axis
		const direction = new THREE.Vector3(0, 0, -1);
	console.log(direction)
		// Step 3: Apply the object's rotation to the direction vector
		direction.applyQuaternion(rotationQuaternion);
	console.log(direction)
	console.log(layer.distance)
		// Step 4: Scale the direction vector to the desired distance
		direction.multiplyScalar(layer.distance);
	console.log(direction)
		// Step 5: Add the scaled direction vector to the Object3D's position
		layer.positionNew = layer.position.clone().add(direction);
			//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
	console.log(layer.positionNew)
	console.log(layer.distance)
	console.log(layer.power)
			auxl.player.LinkTo(layer.positionNew, layer.power);
		}
	}
	//Rubberband
	const RubberbandDown = (event) => {
		if(layer.toggle0){
			console.log(event)
			auxl.player.Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}
	//Rubber Start
	const RubberbandStart = (event) => {
		//Trigger 1
		auxl.mouseController.GetEl().addEventListener('mousedown',RubberbandDown);
		auxl.mouseController.GetEl().addEventListener('mouseup',RubberbandUp);
	}

	//Rubber Stop
	const RubberbandStop = (event) => {
		auxl.mouseController.GetEl().removeEventListener('mousedown',RubberbandDown);
		auxl.mouseController.GetEl().removeEventListener('mouseup',RubberbandUp);
	}


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
	console.log('click')
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
console.log(layer.quaternion)
console.log(layer.position)
	//layer.position.negate();
//console.log(layer.position)
// Step 1: Get the Object3D's rotation as a Quaternion
const rotationQuaternion = layer.quaternion.clone();
// Step 2: Create a direction vector pointing towards the positive Z-axis
const direction = new THREE.Vector3(0, 0, -1);
console.log(direction)
// Step 3: Apply the object's rotation to the direction vector
direction.applyQuaternion(rotationQuaternion);
console.log(direction)
console.log(layer.distance)
// Step 4: Scale the direction vector to the desired distance
direction.multiplyScalar(layer.distance);
console.log(direction)
// Step 5: Add the scaled direction vector to the Object3D's position
layer.positionNew = layer.position.clone().add(direction);
	//layer.positionNew.copy(layer.position.multiplyScalar(layer.distance));
console.log(layer.positionNew)
console.log(layer.distance)
console.log(layer.power)
	auxl.player.SlamTo(layer.positionNew, layer.power, layer.distance);



		}
	}
	//Rubberband
	const RubberbandSlamDown = (event) => {
		if(layer.toggle1){
			console.log(event)
			auxl.player.Delink();
			layer.power = 1000;
			clearInterval(layer.playerLinkInt)
			//Get Charge
			layer.playerLinkInt = setInterval(() => {
				if(!layer.linking){
					//Rubberband
					if(layer.power > 30){
						layer.power -= 15;
			console.log(layer.power)
					} else {
						clearInterval(layer.playerLinkInt);
					}
				} else {
					clearInterval(layer.playerLinkInt);
				}

			}, 1);
		}
	}
	//Rubber Start
	const RubberbandSlamStart = (event) => {
		//Trigger 1
		auxl.mouseController.GetEl().addEventListener('mousedown',RubberbandSlamDown);
		auxl.mouseController.GetEl().addEventListener('mouseup',RubberbandSlamUp);
	}

	//Rubber Stop
	const RubberbandSlamStop = (event) => {
		auxl.mouseController.GetEl().removeEventListener('mousedown',RubberbandSlamDown);
		auxl.mouseController.GetEl().removeEventListener('mouseup',RubberbandSlamUp);
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

	//Get Object Instersection overriding

	//Link To
	const LinkTo = (position, power, distance) => {
		if(!layer.linking){
		console.log('Link To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect

		if(!position){
			//Calculate the position based on the direction and distance
			position = new THREE.Vector3();
			position.copy(GetCameraDirection());
			position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
		} else {
console.log(position)
		}
		let distance = DistanceFromPlayer(position);

		//Sping
		//Spring Point
		//Jump to Distance aka power
		//Spawn, spring, despawn
		//Closer to 0, the greater the power
		layer.linkLength = distance * power;
		//layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		layer.linkCoreConstraint.Connect({type: 'auxspring', restLength: layer.linkLength, damping: 0.5, stiffness: 10, maxForce: 1e6});
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
	const SlamTo = (position, power, distance) => {
		if(!layer.linking){
		console.log('Slamming To');
		console.log(position);
		console.log(power);

		layer.linking = true;
		let timeout = setTimeout(() => {
			layer.linking = false;
		}, 250);
		//Try instead of spawning on on clickable items, just have on mousedown start building power and on mouseup connect

		if(!position){
			//Calculate the position based on the direction and distance
			position = new THREE.Vector3();
			position.copy(GetCameraDirection());
			position.copy(position).add(new THREE.Vector3(distance, distance, distance).normalize().multiplyScalar(distance));
		} else {
console.log(position)
		}
		let distance = DistanceFromPlayer(position);

		//Sping
		//Spring Point
		//Jump to Distance aka power
		//Spawn, spring, despawn
		//Closer to 0, the greater the power
		layer.linkLength = 0;
/*
	type: 'auxspring',
	to: 'playerRig',
	minOneLength: 0,
	maxOneLength: 30,
	restLength: 1,
	damping: 0.5,
	stiffness: 10,
*/
		layer.linkCoreConstraint.Connect({type: 'distance', distance: layer.linkLength, maxForce: 1e6});

	//Change Damping

	console.log(auxl.playerRig.GetEl().body)
	let slamTimeout = setTimeout(() => {
		auxl.playerRig.GetEl().body.linearDamping = 1;
		let slamTimeout2 = setTimeout(() => {
			auxl.playerRig.GetEl().body.linearDamping = 0.2;
		}, 1000);
	}, 1000);
		//layer.linkCoreConstraint.Connect({type: 'auxspring', restLength: layer.linkLength, damping: 100, stiffness: 100, maxForce: 1e6});
console.log(layer.linkCoreConstraint)
/*
	let slamTimeout = setTimeout(() => {
		layer.linkCoreConstraint.Disconnect();
		layer.linkCoreConstraint.Connect({type: 'lock', distance: layer.linkLength, damping: 1, stiffness: 1, maxForce: 1e6});
		let slamTimeout2 = setTimeout(() => {
			layer.linkCoreConstraint.Disconnect();
		}, 3000);
	}, 1500);
*/

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
	//Delink
	const Delink = () => {
		if(layer.linkCore.core.inScene){
//console.log('Delink');
			layer.linkCore.DespawnCore();
		}
	}
	//Link Up
	const LinkUp = () => {
		if(layer.linkCore.core.inScene){
//console.log('Link Up');
			if(layer.linkLength < maxLinkLength){
				layer.linkLength++;
			}
			layer.linkCoreConstraint.Connect({restLength: layer.linkLength});
		}
	}
	//Link Dowm
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

	//Physics
	//Enable Physics
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
		//Temp
		//Load at start of power with power related data
		Link();
		RubberbandStart();
		RubberbandSlamStart();
		Power();
		//Linked component
		//auxl.mouseController.GetEl().setAttribute('playerlink');

//console.log(auxl.mouseController.GetEl())



		auxl.playerRig.GetEl().setAttribute('shape__hand1',layer.handShape);
		//auxl.playerRig.GetEl().setAttribute('shape__hand2',layer.hand2Shape);
		layer.playerPhysics = true;
		auxl.playerRig.ChangeSelf({property:'bodymaterial', value: {friction:0.01, restitution:0.01}});
		auxl.playerRig.ChangeSelf({property:'collision', value: null});

		//Disable Rotation for now
		auxl.playerRig.GetEl().body.fixedRotation = true;
		auxl.playerRig.GetEl().body.updateMassProperties();

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
	//Low Grav
	const LowGrav = () => {
		auxl.playerRig.GetEl().body.applyLocalForce(new THREE.Vector3(0,4.8,0),new THREE.Vector3(0,0,0));
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

	//Assign to each joystick, 
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
	//Player Forward Position
	//going forward will be a trigger / grip action
	const Forward = (speed, div) => {
		return div += layer.speed;
	}
	//Speed
	const Speed = (velocity) => {
		layer.speed = velocity;

	}
	//Toggle Background Audio
	const ToggleBackgroundAudio = () => {
		auxl.backgroundAudio = !auxl.backgroundAudio;
		if(auxl.backgroundAudio){
			auxl.playerAudio.SpawnCore(auxl.playerRig);
		} else {
			auxl.playerAudio.DespawnCore();
		}
	}
	//Testing Function
	const TestFunc = (params) => {
		console.log(params);
	}

	return {layer, Reset, PlayerSceneAnim, UpdateSceneTransitionStyle, PlayerTeleportAnim, UpdateTeleportTransitionStyle, UpdateTransitionColor, GetCameraDirection, ToggleVRText, UpdateUIText, ToggleBeltText, UpdateBeltText, Notification, TempDisableClick, DisableClick, EnableClick, UnlockLocomotion, LockLocomotion, EnableVRLocomotion, EnableVRHoverLocomotion, EnableDesktopLocomotion, EnableMobileLocomotion, ChangeLocomotionType, RemoveBelt, ToggleSittingMode, ToggleCrouch, SnapRight45, SnapLeft45, SnapRight90, SnapLeft90, ToggleFlashlight, ResetUserPosRot,GetPlayerInfo, AttachToPlayer, Equip, Unequip, MainMenuAction, DetachFromPlayer, EnablePhysics, PowerController, LinkTo, SlamTo, Delink, LinkUp, LinkDown, LinkGrab, LinkDrop, LinkShoot, LinkHit, PhysJump, PhysBoost, PhysDash, LowGrav, PhysPickup, PhysDrop, UpdatePlayerPosition, TwistTo, ToggleBackgroundAudio, TestFunc};
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
export {Player, Companion};