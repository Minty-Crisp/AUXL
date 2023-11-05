//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Movement
//
//locomotion
//gimbal
//teleportation
//raycastTeleport
//raycastTeleportSelect

//
//Locomotion
//1st/3rd Walk|Run X,Y and/or Z w/ Collision Support
const locomotion = AFRAME.registerComponent('locomotion', {
dependencies: ['auxl'],
schema: {
	uiid: {type: 'string', default: 'ui'},
	ray: {type: 'string', default: 'camera'},
	courserid: {type: 'string', default: 'mouseCursor'},
	movetype: {type: 'string', default: 'vr'},
	pov: {type: 'string', default: '1st'},
	style: {type: 'string', default: 'free'},
	axis: {type: 'string', default: 'posXZ'},
	speedFast: {type: 'number', default: 0.15},
	speedSlow: {type: 'number', default: 0.075},

},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	//Free Locomotion
	this.freeStepThrottled = AFRAME.utils.throttle(this.freeStep, 30, this);
	//this.freeStepThrottled = AFRAME.utils.throttle(this.freeStepPlus, 30, this);
	//Grid Locomotion
	this.gridStepThrottled = AFRAME.utils.throttle(this.gridStep, 400, this);

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uuid){
		this.ui = document.getElementById(this.data.uiid);
	}
//
//posXZ
//directionXZ : 1st POV Walk along XZ Floor relative to Camera View
//rigXZ : 3rd POV Walk along XZ Floor
//
//posXZY
//directionXZY : 1st POV Fly relative to Camera View
//
//posXY
//directionXY : 1st POV Walk along XY Wall relative to Camera View
//rigXY : 3rd POV Walk along XY Wall
//
//posXYZ
//directionXYZ : 1st POV Walk along XZ Floor relative to Camera View w/ Up & Down Controls
//rigXYZ : 3rd POV Walk along XZ Floor w/ Up & Down Controls
//
//posXYZWall
//directionXYZWall : 1st POV Walk along X, Y or Z Floor/Walls In or Out
//rigXYZWall : 3rd POV Walk along X, Y or Z Floor/Walls In or Out
//
//angleXY
//directionAXY : 1st POV Orbit Rotate
//rigAXY : 3rd POV Orbit Rotate
//
//angleXYZ
//directionAXYZ : 1st POV Orbit Rotate w/ Zoom In & Out
//rigAXYZ : 3rd POV Orbit Rotate w/ Zoom In & Out
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
	//Movement Type
	this.movetype = this.data.movetype;
	//vr
	//vrHover
	//desktop
	//mobile

	//Point of View
	this.pov = this.data.pov;
	//1st
	//3rd

	//Free or Grid Locomotion Style
	this.style = this.data.style;
	//free
	//grid

	//Movement Coords
	this.axis = this.data.axis;
	//Move XZ - floor movement
	//Move XY - wall movement
	//Move XYZ - fly movement
	//Move Sphere Angle - orbit movement
	//Move Sphere Angle & Z(In and Out) - orbit with zoom

	//
	//Band Controller Support
	this.directionForward;
	this.directionReverse;
	this.directionBrake1;
	this.directionBrake2;
	this.directionBrake3;
	this.directionBrake4;

	//Camera Walk Support
	//this.camera = document.getElementById('camera');
	this.camera = document.getElementById(this.data.ray);
	this.ray = document.getElementById(this.data.ray);
	this.rayBody = document.getElementById('playerRig');
	this.rayRot = new THREE.Vector3();
	this.player = document.getElementById('playerRig');
	//this.playerSphere = document.getElementById('playerSphere');
	this.avatar;
	this.avatarSphere;
	this.ui = document.getElementById('beltUIParent');
    this.positionCam = new THREE.Vector3();
    this.positionPlayer = new THREE.Vector3();
    this.rotationPlayer = new THREE.Vector3();
    this.positionAvatar = new THREE.Vector3();
    this.rotationAvatar = new THREE.Vector3();
    this.positionNew = new THREE.Vector3();
    this.rotationNew = new THREE.Vector3();
    this.positionTemp = new THREE.Vector3();
	this.quaternion = new THREE.Quaternion();
	this.vector;
	this.angle;
	//Direction of Movement
	this.directionObject;
    this.directionVector = new THREE.Vector3();


	//Collision
	this.posRound = new THREE.Vector3();
	this.newPosRound = new THREE.Vector3();
	this.newPosStandRound = new THREE.Vector3();
	this.newPosTemp = new THREE.Vector3();
	this.mapX;
	this.mapZ;

	//Attach to Player Support
	this.elPosVec3New = new THREE.Vector3();

	//User Direction Support
	this.velocity;
	this.userPreviousPos = this.player.getAttribute('position');
	this.userPos;
	this.userRot;
	this.userPov;
	this.userTravel;
	this.userView;
	this.newX;
	this.newZ;

	//Locomotion Support
	//Brake Engaged by Default aka Slow Speed
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveUp = false;
	this.moveDown = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay

	//Free Locomotion Support
	this.moveSpeedDefault = this.data.speedFast;
	this.moveSpeedSlow = this.data.speedSlow;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridUpTimeout;
	this.gridDownTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 400;

	//Move into its own thing
	//3rd Person Config
	let initDelay = setTimeout(()=> {
		if(this.pov === '3rd'){
			this.auxl.avatar.SpawnLayer(true);
			this.player.object3D.position.copy(new THREE.Vector3(0,5,10));
			let initDelay = setTimeout(()=> {
				this.avatar = document.getElementById('avatarRig');
				this.avatarSphere = document.getElementById('avatarSphere');
				if(this.axis === 'angleXY'){
					this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
					this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
				}
			},500)
		}
	},1000)
},
//1 Increments
round: function (num){
	return Math.round(num);
},
//0.5 Increments
roundHalf: function (num){
	return Math.round(num*2)/2;
},
//Move Forward
movingForward: function (){
	clearTimeout(this.gridForwardTimeout);
	if(this.moveTo){}else{
		this.moveTo = true;
	}
},
//Cancel Forward
cancelForward: function (){
	if(this.moveTo){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveTo = false;
			} else {
				this.gridForwardTimeout = setTimeout(() => {
					this.moveTo = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveTo = false;
		}
	}
},
//Move Reverse
movingReverse: function (){
	clearTimeout(this.gridReverseTimeout);
	if(this.moveBack){}else{
		this.moveBack = true;
	}
},
//Cancel Reverse
cancelReverse: function (){
	if(this.moveBack){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveBack = false;
			} else {
				this.gridReverseTimeout = setTimeout(() => {
					this.moveBack = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveBack = false;
		}
	}
},
//Move Left
movingLeft: function (){
	clearTimeout(this.gridLeftTimeout);
	if(this.moveLeft){}else{
		this.moveLeft = true;
	}
},
//Cancel Left
cancelLeft: function (){
	if(this.moveLeft){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveLeft = false;
			} else {
				this.gridLeftTimeout = setTimeout(() => {
					this.moveLeft = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveLeft = false;
		}
	}
},
//Move Right
movingRight: function (){
	clearTimeout(this.gridRightTimeout);
	if(this.moveRight){}else{
		this.moveRight = true;
	}
},
//Cancel Right
cancelRight: function (){
	if(this.moveRight){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveRight = false;
			} else {
				this.gridRightTimeout = setTimeout(() => {
					this.moveRight = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveRight = false;
		}
	}
},
//Move Up
movingUp: function (){
	clearTimeout(this.gridUpTimeout);
	if(this.moveUp){}else{
		this.moveUp = true;
	}
},
//Cancel Up
cancelUp: function (){
	if(this.moveUp){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveUp = false;
			} else {
				this.gridUpTimeout = setTimeout(() => {
					this.moveUp = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveUp = false;
		}
	}
},
//Move Down
movingDown: function (){
	clearTimeout(this.gridDownTimeout);
	if(this.moveDown){}else{
		this.moveDown = true;
	}
},
//Cancel Down
cancelDown: function (){
	if(this.moveDown){
		if(this.style === 'grid'){
			if(this.gridMove){
				this.moveDown = false;
			} else {
				this.gridDownTimeout = setTimeout(() => {
					this.moveDown = false;
				}, this.gridSpeed/1.25);
			}
		} else {
			this.moveDown = false;
		}
	}
},
//Clear All Movement
clearMovement: function (){
	this.cancelForward();
	this.cancelReverse();
	this.cancelLeft();
	this.cancelRight();
	this.cancelUp();
	this.cancelDown();
},
//Clear All Grid Movement
clearGridMovement: function (){
	this.moveTo = false;
	this.moveBack = false;
	this.moveLeft = false;
	this.moveRight = false;
	clearTimeout(this.gridForwardTimeout);
	clearTimeout(this.gridReverseTimeout);
	clearTimeout(this.gridLeftTimeout);
	clearTimeout(this.gridRightTimeout);
},
//Toggle Speed Change
toggleSpeed: function (){
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake On
			this.moveBrake = true;
			//Slower Grid Move
			this.gridSpeed = 400;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		} else {
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			//Brake Off
			this.moveBrake = false;
			//Faster Grid Move
			this.gridSpeed = 200;
			this.everyStepThrottled = AFRAME.utils.throttle(this.everyStep, this.gridSpeed, this);
		}
		this.brakeReset = setTimeout(() => {
			//Set reset switch toggle
			this.brakeReady = true;
			clearTimeout(this.brakeReset);
		}, 250);
	}
},
//Long Buffer for Toggling Speed Change
brakeReadBufferLong: function (){
	//This will start the reset timer to allow the brake to be re-engadged
	this.brakeReset = setTimeout(() => {
		this.brakeReady = true;
		clearTimeout(this.brakeReset);
	}, 2250);
},
//Hover Interaction on Belt UI
hoverLocomotion: function (e) {
	if(this.brakeReady){
		if(this.brakeToggle){
			//Set reset switch toggle
			this.brakeToggle = false;
			//Set reset timer switch toggle
			this.brakeReady = false;
			this.moveBrake = true;
			//Set brake color to red
			this.directionBrake1.setAttribute('material', {color: 'red'});
			this.directionBrake2.setAttribute('material', {color: 'red'});
			this.directionBrake3.setAttribute('material', {color: 'red'});
			this.directionBrake4.setAttribute('material', {color: 'red'});
			//Anim positition for forward/reverse bar and brakes
			this.directionForward.emit('brakeOn',{});
			this.directionReverse.emit('brakeOn',{});
			this.directionBrake1.emit('brakeOn',{});
			this.directionBrake2.emit('brakeOn',{});
			this.directionBrake3.emit('brakeOn',{});
			this.directionBrake4.emit('brakeOn',{});
		} else {
			//Set reset switch toggle
			this.brakeToggle = true;
			//Set reset timer switch toggle
			this.brakeReady = false;
			this.moveBrake = false;
			//Set brake color to default
			this.directionBrake1.setAttribute('material', {color: 'black'});
			this.directionBrake2.setAttribute('material', {color: 'black'});
			this.directionBrake3.setAttribute('material', {color: 'black'});
			this.directionBrake4.setAttribute('material', {color: 'black'});
			//Anim positition for forward/reverse bar back to default
			this.directionForward.emit('brakeOff',{});
			this.directionReverse.emit('brakeOff',{});
			this.directionBrake1.emit('brakeOff',{});
			this.directionBrake2.emit('brakeOff',{});
			this.directionBrake3.emit('brakeOff',{});
			this.directionBrake4.emit('brakeOff',{});
		}
	}
},
//Update
update: function () {
	//Locomotion Support
	//Brake Engaged by Default
	this.moveTo = false;
	this.moveBack = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.moveBrake = true;
	this.brakeReady = true;
	this.brakeToggle = false;
	this.brakeReset; //Delay
	this.moveSpeedDefault = this.data.speedFast;
	this.moveSpeedSlow = this.data.speedSlow;

	//Grid Locomotion Support
	this.gridForwardTimeout;
	this.gridReverseTimeout;
	this.gridLeftTimeout;
	this.gridRightTimeout;
	this.gridMove = false;
	//Movement is always 1 meter, so speed is in ms
	this.gridSpeed = 500;

	//Schema Imoprt
	//
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	if(this.data.uiid){
		this.ui = document.getElementById(this.data.uiid);
	}
	//Movement Type
	this.movetype = this.data.movetype;
	//Point of View
	this.pov = this.data.pov;
	//Free or Grid Locomotion Style
	this.style = this.data.style;
	//Movement Coords
	this.axis = this.data.axis;
	//3rd Person Config
	let initDelay = setTimeout(()=> {
		this.mouseController = document.getElementById('mouseController');
		if(this.pov === '3rd'){
			this.auxl.avatar.SpawnLayer(true);
			this.player.object3D.position.copy(new THREE.Vector3(0,5,10));
			let initDelay = setTimeout(()=> {
				this.avatar = document.getElementById('avatarRig');
				this.avatarSphere = document.getElementById('avatarSphere');
				if(this.axis === 'angleXY'){
					this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
					this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
				}
			},500)
		}
	},1000)


	//LEGACY
	//Keyboard Controller Event Listeners
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
		this.directionObject = this.camera;
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
		this.directionObject = this.camera;
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
		if(this.auxl.directionType === 'camera'){
			this.directionObject = this.camera;
		} else {
			if(this.auxl.vrHand === 'bothRight' || this.auxl.vrHand === 'bothLeftLoco'){
				this.directionObject = document.getElementById('vrController1');
			} else if(this.auxl.vrHand === 'bothLeft' || this.auxl.vrHand === 'bothRightLoco'){
				this.directionObject = document.getElementById('vrController2');
			} else {
				this.directionObject = document.getElementById('vrController1');
			}
		}
	} else if(this.movetype === 'vrHover'){
		if(this.auxl.directionType === 'camera'){
			this.directionObject = this.camera;
		} else {
			this.directionObject = document.getElementById('vrController1');
		}	
		//this.vrController1;
		this.directionForward = document.getElementById('locomotionForwardUI');
		this.directionReverse = document.getElementById('locomotionReverseUI');
		this.directionBrake1 = document.getElementById('locomotionBrake1UI');
		this.directionBrake2 = document.getElementById('locomotionBrake2UI');
		this.directionBrake3 = document.getElementById('locomotionBrake3UI');
		this.directionBrake4 = document.getElementById('locomotionBrake4UI');
		//directionForward
		this.directionForward.addEventListener('mouseenter', this.movingForward);
		this.directionForward.addEventListener('mouseleave', this.cancelForward);
		//directionReverse
		this.directionReverse.addEventListener('mouseenter', this.movingReverse);
		this.directionReverse.addEventListener('mouseleave', this.cancelReverse);

		this.hoverLocomotionEvent = (event) => {
			this.hoverLocomotion(event);
		}
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseenter', event => this.hoverLocomotionEvent)
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.addEventListener('mouseleave', event => this.brakeReadBufferLong)
		});
	}

	//Raycaster Camera
	this.directionObject = this.camera;
	//this.directionObject = this.courserid;

},
//Remove
remove: function () {
	if(this.movetype === 'desktop'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'mobile'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vr'){
		//Controlled by Universal Controls
	} else if(this.movetype === 'vrHover'){
		this.directionForward.removeEventListener('mouseenter', this.movingForward);
		this.directionForward.removeEventListener('mouseleave', this.cancelForward);
		this.directionReverse.removeEventListener('mouseenter', this.movingReverse);
		this.directionReverse.removeEventListener('mouseleave', this.cancelReverse);
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseenter', event => this.hoverLocomotionEvent)
		});
		document.querySelectorAll('.directionBrake').forEach(item => {
			item.removeEventListener('mouseleave', event => this.brakeReadBufferLong)
		});
	}
},
//Tick
tick: function (time, timeDelta) {
	//Unlocked Locomotion
	if(this.auxl.player.layer.move){
		//Locomotion Type
		if(this.style === 'free'){
			this.freeStepThrottled();
		} else if(this.style === 'grid'){
			this.gridStepThrottled();
		}

		//Sync Belt
		if(this.movetype === 'vrHover'){
			this.uiSync();
		}
	}
},
//Free Locomotion Tick
freeStep: function (time, timeDelta) {
	if(this.moveBrake){
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedSlow);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedSlow);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedSlow);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedSlow);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedSlow);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedSlow);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedSlow);
		}
	} else {
		if(this.moveTo && this.moveRight) {
			this.move('forwardRight', this.moveSpeedDefault);
		} else if(this.moveTo && this.moveLeft) {
			this.move('forwardLeft', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveRight) {
			this.move('reverseRight', this.moveSpeedDefault);
		} else if(this.moveBack && this.moveLeft) {
			this.move('reverseLeft', this.moveSpeedDefault);
		} else if(this.moveTo) {
			this.move('forward', this.moveSpeedDefault);
		} else if(this.moveBack) {
			this.move('reverse', this.moveSpeedDefault);
		} else if(this.moveRight) {
			this.move('right', this.moveSpeedDefault);
		} else if(this.moveLeft) {
			this.move('left', this.moveSpeedDefault);
		}
	}
},
//Free Locomotion For Up/Down Button Support
freeStepPlus: function (time, timeDelta) {

//Not Working
//UpForwardLeft
//UpReverseLeft
//DownForwardRight
//DownReverseRight
	this.movement = '';
	//Up|Down
	if(this.moveUp && this.moveDown){} else {
		if(this.moveUp){
			this.movement += 'Up';
		} else if(this.moveDown){
			this.movement += 'Down';
		}
	}
	//Forward|Reverse
	if(this.moveTo && this.moveBack){} else {
		if(this.moveTo){
			this.movement += 'Forward';
		} else if(this.moveBack){
			this.movement += 'Reverse';
		}
	}
	//Right|Left
	if(this.moveRight && this.moveLeft){} else {
		if(this.moveRight){
			this.movement += 'Right';
		} else if(this.moveLeft){
			this.movement += 'Left';
		}
	}
	//console.log(this.movement)

	//Speed
	if(this.moveBrake){
		this.move(this.movement, this.moveSpeedSlow);
	} else {
		this.move(this.movement, this.moveSpeedDefault);
	}
},
//Grid Locomotion Tick
gridStep: function (time, timeDelta) {
	if(this.moveTo || this.moveBack || this.moveRight || this.moveLeft){
		if(this.gridMove){} else {
			this.gridMove = true;
		}
	} else {
		this.gridMove = false;
	}
	if(this.moveTo && this.moveRight) {
		this.move('forwardRight', 0.5);
	} else if(this.moveTo && this.moveLeft) {
		this.move('forwardLeft', 0.5);
	} else if(this.moveBack && this.moveRight) {
		this.move('reverseRight', 0.5);
	} else if(this.moveBack && this.moveLeft) {
		this.move('reverseLeft', 0.5);
	} else if(this.moveTo) {
		this.move('forward', 0.5);
	} else if(this.moveBack) {
		this.move('reverse', 0.5);
	} else if(this.moveRight) {
		this.move('right', 0.5);
	} else if(this.moveLeft) {
		this.move('left', 0.5);
	}

},
//Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},
//Sync Belt UI
uiSync: function () {
	this.elPosVec3New.copy(this.el.object3D.position);
	//No Offsets as UI Parent is at 0 0 0
	this.ui.object3D.position.copy(this.elPosVec3New);
},
//Move
move: function (direction, speed) {
	if(this.pov === '1st'){
		if(this.axis === 'posXZ'){
			this.directionXZ(direction, speed);
		} else if(this.axis === 'posXZY'){
			this.directionXZY(direction, speed);
		} else if(this.axis === 'posXY'){
			this.directionXY(direction, speed);
		} else if(this.axis === 'posXYZ'){
			this.directionXYZ(direction, speed);
		} else if(this.axis === 'posXYZWall'){
			this.directionXYZWall(direction, speed);
		} else if(this.axis === 'angleXY'){
			this.directionAXY(direction, speed);
		} else if(this.axis === 'angleXYZ'){
			this.directionAXYZ(direction, speed);
		}
	} else if(this.pov === '3rd'){
		if(this.axis === 'posXZ'){
			this.rigXZ(direction, speed);
		} else if(this.axis === 'posXZY'){
			this.rigXZY(direction, speed);
		} else if(this.axis === 'posXY'){
			this.rigXY(direction, speed);
		} else if(this.axis === 'posXYZ'){
			this.rigXYZ(direction, speed);
		} else if(this.axis === 'posXYZWall'){
			this.rigXYZWall(direction, speed);
		} else if(this.axis === 'angleXY'){
			this.rigAXY(direction, speed);
		} else if(this.axis === 'angleXYZ'){
			this.rigAXYZ(direction, speed);
		}
	}
},
//Toggle 1st/3rd POV
togglePOV: function (){

	//Load 3rd POV
	if(this.pov === '3rd'){
		//Spawn Avatar
		this.auxl.avatar.SpawnLayer(true);
		//Move Avatar to Player Current POS

		//Move Player to Avatar Offset
		this.player.object3D.position.copy(new THREE.Vector3(0,5,10));

		let initDelay = setTimeout(()=> {
			//Update Avatar Reference
			this.avatar = document.getElementById('avatarRig');
			this.avatarSphere = document.getElementById('avatarSphere');

/*
			if(this.axis === 'angleXY'){
				this.avatar.object3D.position.copy(new THREE.Vector3(0,0,-10));
				this.player.object3D.position.copy(new THREE.Vector3(0,1.6,2));
			}
*/

		},500)


	}


},
//Ray Dorection
rayDirection: function (ray,action,distance){
//Move angles for yaw, pitch, and roll example...
/*
// Define the angles for yaw, pitch, and roll
const yawAngle = Math.PI / 4;   // 45 degrees
const pitchAngle = Math.PI / 6; // 30 degrees
const rollAngle = Math.PI / 3;  // 60 degrees

// Calculate the individual rotation matrices
const R_yaw = new THREE.Matrix3();
R_yaw.set(
  Math.cos(yawAngle), 0, Math.sin(yawAngle),
  0, 1, 0,
  -Math.sin(yawAngle), 0, Math.cos(yawAngle)
);

const R_pitch = new THREE.Matrix3();
R_pitch.set(
  1, 0, 0,
  0, Math.cos(pitchAngle), -Math.sin(pitchAngle),
  0, Math.sin(pitchAngle), Math.cos(pitchAngle)
);

const R_roll = new THREE.Matrix3();
R_roll.set(
  Math.cos(rollAngle), -Math.sin(rollAngle), 0,
  Math.sin(rollAngle), Math.cos(rollAngle), 0,
  0, 0, 1
);

// Combine the rotation matrices (in the order of roll, pitch, yaw)
const combinedRotationMatrix = R_yaw.clone().multiply(R_pitch).multiply(R_roll);

*/
	//Get the direction vector in world space
	//Calculate the position based on the direction and distance
	//Support current local axis of uniray to apply height in
	let rayDir = new THREE.Vector3();
	ray.object3D.getWorldDirection(rayDir);

	//degrees in radians, starting from behind towards the left around to the front as 180m then to the right back around
	const angle0 = 0;
	//const angle30 = Math.PI / 6;
	const angle45 = Math.PI / 4;
	//const angle60 = Math.PI / 3;
	const angle90 = Math.PI / 2;
	//const angle120 = 2*Math.PI / 3;
	const angle135 = 3*Math.PI / 4;
	//const angle150 = 5*Math.PI / 6;
	const angle180 = Math.PI;
	//const angle210 = 7*Math.PI / 6;
	const angle225 = 5*Math.PI / 4;
	//const angle240 = 4*Math.PI / 3;
	const angle270 = 3*Math.PI / 2;
	//const angle300 = 5*Math.PI / 3;
	const angle315 = 7*Math.PI / 4;
	//const angle330 = 11*Math.PI / 6;

	const matrixAxisRot = (axis, angle) => {
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
		return rotationMatrix;
	}


	let rotationMatrix = new THREE.Matrix4();
	//Adjust Raycaster Angle
	if(action === 'forwardRight'){
		rotationMatrix = matrixAxisRot('y', angle135);
	} else if(action === 'forwardLeft'){
		rotationMatrix = matrixAxisRot('y', angle225);
	} else if(action === 'reverseRight'){
		rotationMatrix = matrixAxisRot('y', angle45);
	} else if(action === 'reverseLeft'){
		rotationMatrix = matrixAxisRot('y', angle315);
	} else if(action === 'forward'){
		rotationMatrix = matrixAxisRot('y', angle180);
	} else if(action === 'reverse'){
		rotationMatrix = matrixAxisRot('y', angle0);
	} else if(action === 'right'){
		rotationMatrix = matrixAxisRot('y', angle90);
	} else if(action === 'left'){
		rotationMatrix = matrixAxisRot('y', angle270);
	}

	// Apply the rotation matrix
	let pointM = new THREE.Vector3().copy(rayDir).applyMatrix4(rotationMatrix);
	rayDir.copy(pointM)

	//Calculate the position based on the direction and distance
	let position = new THREE.Vector3();
	//Add Starting Position
	//Add normalized (-1 to 0 to 1) angle
	//Distance to next point at angle
	position.copy(this.rayBody.object3D.position).add(new THREE.Vector3(rayDir.x, rayDir.y, rayDir.z).normalize().multiplyScalar(distance));
//console.log({rayDir,position,distance})
	return position;

/*
	if(height){
		position.copy(position).add(new THREE.Vector3(this.rayRot.x, 0, this.rayRot.z).normalize().multiplyScalar(distance));
		position.y = height || 0;
	} else {
		position.copy(position).add(new THREE.Vector3(this.rayRot.x, this.rayRot.y, this.rayRot.z).normalize().multiplyScalar(distance));
	}
*/

},
//Movement
movement: function (){
//testing grounds, currently, but extract the finalized movement from RigXZ, modify it to account for x,y,z and apply to all other similar methods

	//Position locked?
	if(this.auxl.player.layer.move){
		//Physics, Grid Collision or No Clip
		if(this.auxl.player.layer.playerPhysics){
			if(this.auxl.player.layer.physMove){
				//gravity based movement
				//Calculate directional difference
				if(!this.positionNew.equals(this.positionPlayer)){
					this.moveForce.copy(this.positionNew);
					this.moveForce.sub(this.positionPlayer);
					this.player.body.applyLocalImpulse(this.moveForce,new THREE.Vector3(0,0,0));
				}
			} else {
				//position based 
				this.player.body.position.copy(this.positionNew);
				//Hands
				//this.mouseController.body.position.copy(this.positionNew);
			}
			//Update AABB
			this.player.body.computeAABB();
		} else if(this.auxl.collision){
			//Locomotion with Collision every 0.5 meter on XZ and 1 meter on Y
			this.newPosRound.x = this.roundHalf(this.positionNew.x);
			this.newPosRound.y = this.round(this.positionNew.y);
			this.newPosRound.z = this.roundHalf(this.positionNew.z);
			this.posRound.x = this.roundHalf(this.positionPlayer.x);
			this.posRound.y = this.round(this.positionPlayer.y);
			this.posRound.z = this.roundHalf(this.positionPlayer.z);
			//Check for Obstacles
			if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
				if(!this.auxl.player.layer.bodyCrouch){
					this.newPosStandRound.copy(this.newPosRound);
					this.newPosStandRound.y+=1;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosStandRound, this.posRound)){
						this.allow = true;
					} else {
						this.allow = false;
					}
				} else {
					this.allow = true;
				}
			}
			//Atempt to move parallel
			if(!this.allow){
				//Backup
				this.newPosTemp.copy(this.newPosRound);
				//Test X
				this.newPosRound.x = this.posRound.x;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
					//X is blocked
					this.positionNew.x = this.positionPlayer.x;
					this.allow = true;
				} else {
					//Test Z
					this.newPosRound.z = this.posRound.z;
					//Reset X
					this.newPosRound.x = this.newPosTemp.x;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
						//Z is blocked
						this.positionNew.z = this.positionPlayer.z;
						this.allow = true;
					} 
				}
			}
			//Move
			if(this.allow){
				this.player.object3D.position.copy(this.positionNew);
				this.auxl.player.layer.gridPos.copy(this.newPosRound);

				let direction = '';
				if(this.newPosRound.z < this.posRound.z){
					direction += 'forward'
				} else if(this.newPosRound.z > this.posRound.z){
					direction += 'reverse'
				}
				if(this.newPosRound.x > this.posRound.x){
					direction += 'right'
				} else if(this.newPosRound.x < this.posRound.x){
					direction += 'left'
				}
				this.auxl.player.layer.gridDirection = direction;
				//Check for Triggers on New Coords
				if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
					//Check for Trigger Enter
					if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
						this.auxl.map.TriggerEnterHit(this.newPosRound);
					}
					//Check for Trigger Exits
					this.auxl.map.CheckActiveTriggers(this.newPosRound);
					//Check for Cleared Spawn Collision Conditions
					this.auxl.map.WaitingToSpawn();
				}
			}
		} else {
			//Free Locomotion No Clip
			this.player.object3D.position.copy(this.positionNew);
		}
	}
},

//2D Plane Locomotion
plane2D: function (axis, action, speed) {
	this.allow = false;
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.moveForce = new THREE.Vector3();
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;

	//All configured for
	//Gravity -Y
	//Allow the uniRay.localAxis to be used when calc

	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}

	//6 Quadrants
	//Front Left
	//Front Right
	//Back Left
	//Back Right
	//Top
	//Down

	//6 Axis to be in
	let actions = ['forward', 'right', 'up'];


	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}
	//Y Height Position is unchanged
	this.positionNew.y = this.positionPlayer.y;

	return this.positionNew;
},

//1st POV Walk along XZ Floor relative to Direction View
directionXZ: function (action, speed) {
	this.allow = false;
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.moveForce = new THREE.Vector3(speed,speed,speed);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}

	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}

	//rayDirection override testing
	//console.log({facing: this.face, action, next: this.positionNew})
	//this.positionNew = new THREE.Vector3();
	//this.positionNew.copy(this.rayDirection(this.directionObject, action, this.velocity));

	//Y Height Position is unchanged
	this.positionNew.y = this.positionPlayer.y;

	//Position locked?
	if(this.auxl.player.layer.move){
		//Physics, Grid Collision or No Clip
		if(this.auxl.player.layer.playerPhysics){
			if(this.auxl.player.layer.physMove){
				//gravity based movement
				this.moveForce.copy(this.positionNew);
				this.moveForce.sub(this.positionPlayer);
/*
let rotationMatrix = new THREE.Matrix4();
rotationMatrix.makeRotationX(Math.PI);
this.moveForce.applyMatrix4(rotationMatrix);
*/
//#return
				//Calculate directional difference
				if(!this.positionNew.equals(this.positionPlayer)) {
					this.player.body.applyLocalImpulse(this.moveForce, new THREE.Vector3(0,0,0));
					//Slow down movement only quick then friction, but limit it so things like slopes can take affect
				}
			} else {
				//position based
				this.player.body.position.copy(this.positionNew);
				//Hands
				//this.mouseController.body.position.copy( this.positionNew);
			}
			//Update AABB
			this.player.body.computeAABB();
		} else if(this.auxl.collision){
			//Locomotion with Collision every 0.5 meter on XZ and 1 meter on Y
			this.newPosRound.x = this.roundHalf(this.positionNew.x);
			this.newPosRound.y = this.round(this.positionNew.y);
			this.newPosRound.z = this.roundHalf(this.positionNew.z);
			this.posRound.x = this.roundHalf(this.positionPlayer.x);
			this.posRound.y = this.round(this.positionPlayer.y);
			this.posRound.z = this.roundHalf(this.positionPlayer.z);
			//Check for Obstacles
			if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
				if(!this.auxl.player.layer.bodyCrouch){
					this.newPosStandRound.copy(this.newPosRound);
					this.newPosStandRound.y+=1;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosStandRound, this.posRound)){
						this.allow = true;
					} else {
						this.allow = false;
					}
				} else {
					this.allow = true;
				}
			}
			//Atempt to move parallel
			if(!this.allow){
				//Backup
				this.newPosTemp.copy(this.newPosRound);
				//Test X
				this.newPosRound.x = this.posRound.x;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
					//X is blocked
					this.positionNew.x = this.positionPlayer.x;
					this.allow = true;
				} else {
					//Test Z
					this.newPosRound.z = this.posRound.z;
					//Reset X
					this.newPosRound.x = this.newPosTemp.x;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
						//Z is blocked
						this.positionNew.z = this.positionPlayer.z;
						this.allow = true;
					} 
				}
			}
			//Move
			if(this.allow){
				this.player.object3D.position.copy(this.positionNew);
				this.auxl.player.layer.gridPos.copy(this.newPosRound);

				let direction = '';
				if(this.newPosRound.z < this.posRound.z){
					direction += 'forward'
				} else if(this.newPosRound.z > this.posRound.z){
					direction += 'reverse'
				}
				if(this.newPosRound.x > this.posRound.x){
					direction += 'right'
				} else if(this.newPosRound.x < this.posRound.x){
					direction += 'left'
				}
				this.auxl.player.layer.gridDirection = direction;
				//Check for Triggers on New Coords
				if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
					//Check for Trigger Enter
					if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
						this.auxl.map.TriggerEnterHit(this.newPosRound);
					}
					//Check for Trigger Exits
					this.auxl.map.CheckActiveTriggers(this.newPosRound);
					//Check for Cleared Spawn Collision Conditions
					this.auxl.map.WaitingToSpawn();
				}
			}

		} else {
			//Free Locomotion No Clip
			this.player.object3D.position.copy(this.positionNew);
		}
	}
},
//1st POV Walk with Fly Buttons relative to Direction View
directionXZY: function (action, speed) {
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionStep = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	if(action === 'UpForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ForwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ForwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ReverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'ReverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpForward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownForward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpReverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownReverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'UpLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'DownLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'Left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'Up'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'Down'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else {
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.z = this.positionPlayer.z;
		this.positionNew.y = this.positionPlayer.y;
	}

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.z = this.roundHalf(this.positionPlayer.z);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.player.object3D.position.copy(this.positionNew);
		}
	} else if(this.auxl.player.layer.playerPhysics){
		//Move Static Body in Phys
		this.player.body.position.copy(this.positionNew);
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}


},
//1st POV Walk along XY Wall relative to Direction View
directionXY: function (action, speed) {
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'front';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'front';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'back';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'back';
	} else {
		//console.log('Level');
		this.face = 'front';
	}

	if(action === 'forwardRight'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'forwardLeft'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'reverseRight'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'reverseLeft'){
		if(this.face === 'front'){
			this.positionNew.x = this.positionPlayer.x - this.velocity;
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
		}
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.y = this.positionPlayer.y + this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionPlayer.x;
		this.positionNew.y = this.positionPlayer.y - this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionPlayer.x + this.velocity;
		this.positionNew.y = this.positionPlayer.y;
	} else if(action === 'left'){
		this.positionNew.x = this.positionPlayer.x - this.velocity;
		this.positionNew.y = this.positionPlayer.y;
	}
	this.positionNew.z = this.positionPlayer.z;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.roundHalf(this.positionNew.y);
		this.posRound.x = this.roundHalf(this.positionPlayer.x);
		this.posRound.y = this.roundHalf(this.positionPlayer.y);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.player.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.player.object3D.position.copy(this.positionNew);
	}
},
//1st POV Fly relative to Direction View
directionXYZ: function (action, speed) {
	this.allow = false;
	this.yDeadZone = 0.1;
	this.velocity = speed;
	this.directionVector = new THREE.Vector3();
	this.cameraVector = new THREE.Vector3();
	this.camera.object3D.getWorldDirection(this.cameraVector);
	this.directionObject.object3D.getWorldDirection(this.directionVector);
	this.positionNew = new THREE.Vector3();
	this.positionPlayer.copy(this.player.object3D.position);
	//Math out the Angle of Camera
	this.angle = Math.atan2(this.directionVector.x,this.directionVector.z);
	//Facing
	this.face;
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	//Check Camera Angle Quadrant
	if(this.angle > 0 && this.angle < Math.PI/2) {
		//console.log('Forward Left');
		this.face = 'frontLeft';
	} else if(this.angle < 0 && this.angle > -Math.PI/2) {
		//console.log('Forward Right');
		this.face = 'frontRight';
	} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
		//console.log('Backward Left');
		this.face = 'backLeft';
	} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
		//console.log('Backward Right');
		this.face = 'backRight';
	} else {
		//console.log('Level');
		this.face = 'level';
	}
	//Quadrant 1 : -x, -z
	//Quadrant 2 : +x, -z
	//Quadrant 3 : -x, +z
	//Quadrant 4 : +x, +z
	if(action === 'forwardRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'forwardLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverseRight'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'reverseLeft'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity) + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity) - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity) - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity) + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'forward'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z - this.velocity;
		}
	} else if(action === 'reverse'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x;
			this.positionNew.z = this.positionPlayer.z + this.velocity;
		}
	} else if(action === 'right'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x + this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	} else if(action === 'left'){
		if(this.face === 'frontLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'frontRight') {
			this.angle += Math.PI;
			this.positionNew.x = this.positionPlayer.x + (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z - (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backLeft') {
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else if(this.face === 'backRight') {
			this.angle += (Math.PI * 2);
			this.positionNew.x = this.positionPlayer.x - (Math.cos(this.angle) * this.velocity);
			this.positionNew.z = this.positionPlayer.z + (Math.sin(this.angle) * this.velocity);
		} else {
			this.positionNew.x = this.positionPlayer.x - this.velocity;
			this.positionNew.z = this.positionPlayer.z;
		}
	}

	//Up Down
	if(this.cameraVector.y < this.yDeadZone){
		this.positionNew.y = this.positionPlayer.y + ((this.cameraVector.y * -1) * this.velocity);
	} else if(this.cameraVector.y > (this.yDeadZone*-1)){
		this.positionNew.y = this.positionPlayer.y - (this.cameraVector.y * this.velocity);
	} else {
		this.positionNew.y = this.positionPlayer.y;
	}

	//Position locked?
	if(this.auxl.player.layer.move){
		//Collision Enabled or Not
		if(this.auxl.collision){
			//Locomotion with Collision every 0.5 meter at XZ and 1m on Y
			this.newPosRound.x = this.roundHalf(this.positionNew.x);
			this.newPosRound.y = this.round(this.positionNew.y);
			this.newPosRound.z = this.roundHalf(this.positionNew.z);
			this.posRound.x = this.roundHalf(this.positionPlayer.x);
			this.posRound.y = this.round(this.positionPlayer.y);
			this.posRound.z = this.roundHalf(this.positionPlayer.z);

			//Check for Obstacles
			if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
				if(!this.auxl.player.layer.bodyCrouch){
					this.newPosStandRound.copy(this.newPosRound);
					this.newPosStandRound.y+=1;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosStandRound, this.posRound)){
						this.allow = true;
					} else {
						this.allow = false;
					}
				} else {
					this.allow = true;
				}
			} else {
				this.allow = false;
			}
			//Atempt to move parallel
			if(!this.allow){
				//Backup
				this.newPosTemp.copy(this.newPosRound);
				//Test Y
				this.newPosRound.y = this.posRound.y;
				if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
					//Y is blocked
					this.positionNew.y = this.positionPlayer.y;
					this.allow = true;
				} else {
					//Test X
					this.newPosRound.x = this.posRound.x;
					//Reset Y
					this.newPosRound.y = this.newPosTemp.y;
					if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
						//Z is blocked
						this.positionNew.x = this.positionPlayer.x;
						this.allow = true;
					} else {
						//Test Z
						this.newPosRound.z = this.posRound.z;
						//Reset XY
						this.newPosRound.x = this.newPosTemp.x;
						this.newPosRound.y = this.newPosTemp.y;
						if(this.auxl.map.CheckMapObstaclesDiagonal(this.newPosRound, this.posRound)){
							//Z is blocked
							this.positionNew.z = this.positionPlayer.z;
							this.allow = true;
						} 
					}
				}
			}
			//Move
			if(this.allow){
				this.player.object3D.position.copy(this.positionNew);
				this.auxl.player.layer.gridPos.copy(this.newPosRound);
				//Check for Triggers on New Coords
				if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
					//Check for Trigger Enter
					if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
						this.auxl.map.TriggerEnterHit(this.newPosRound);
					}
					//Check for Trigger Exits
					this.auxl.map.CheckActiveTriggers(this.newPosRound);
					//Check for Cleared Spawn Collision Conditions
					this.auxl.map.WaitingToSpawn();
				}
			}
	/*
			if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
				this.player.object3D.position.copy(this.positionNew);
				this.auxl.player.layer.gridPos.copy(this.newPosRound);
				//Check for Triggers on New Coords
				if(this.newPosRound.x === this.posRound.x && this.newPosRound.z === this.posRound.z){} else {
					//Check for Trigger Enter
					if(this.auxl.map.CheckMapTriggers(this.newPosRound)){
						this.auxl.map.TriggerEnterHit(this.newPosRound);
					}
					//Check for Trigger Exits
					this.auxl.map.CheckActiveTriggers(this.newPosRound);
					//Check for Cleared Spawn Collision Conditions
					this.auxl.map.WaitingToSpawn();
				}
			}
	*/
		} else {
			//Free Locomotion No Collision
			this.player.object3D.position.copy(this.positionNew);
		}
	}
},
//1st POV Walk along X, Y or Z Floor/Walls relative to Direction View
directionXYZWall: function (action, speed){},
//1st POV Orbit Rotate
directionAXY: function (action, speed){},
//1st POV Orbit Rotate w/ Zoom In & Out
directionAXYZ: function (action, speed){},
//3rd POV Walk along XZ Floor
rigXZ: function (action, speed) {
	this.velocity = speed;
	this.positionNew = new THREE.Vector3();
	this.positionAvatar.copy(this.avatar.object3D.position);

	if(action === 'forwardRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'forwardLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'reverseRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'reverseLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.z = this.positionAvatar.z - this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.z = this.positionAvatar.z + this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.z = this.positionAvatar.z;
	} else if(action === 'left'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.z = this.positionAvatar.z;
	}
	this.positionNew.y = this.positionAvatar.y;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.z = this.roundHalf(this.positionNew.z);
		this.posRound.x = this.roundHalf(this.positionAvatar.x);
		this.posRound.z = this.roundHalf(this.positionAvatar.z);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.avatar.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.avatar.object3D.position.copy(this.positionNew);
	}
},
//3rd POV Walk with Fly Buttons
rigXZY: function (action, speed){},
//3rd POV Walk along XY Wall
rigXY: function (action, speed) {
	this.velocity = speed;
	this.positionNew = new THREE.Vector3();
	this.positionAvatar.copy(this.avatar.object3D.position);

	if(action === 'forwardRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'forwardLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'reverseRight'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'reverseLeft'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'forward'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.y = this.positionAvatar.y + this.velocity;
	} else if(action === 'reverse'){
		this.positionNew.x = this.positionAvatar.x;
		this.positionNew.y = this.positionAvatar.y - this.velocity;
	} else if(action === 'right'){
		this.positionNew.x = this.positionAvatar.x + this.velocity;
		this.positionNew.y = this.positionAvatar.y;
	} else if(action === 'left'){
		this.positionNew.x = this.positionAvatar.x - this.velocity;
		this.positionNew.y = this.positionAvatar.y;
	}
	this.positionNew.z = this.positionAvatar.z;

	//Collision Enabled or Not
	if(this.auxl.collision){
		//Locomotion with Collision every 0.5 meter
		this.newPosRound.x = this.roundHalf(this.positionNew.x);
		this.newPosRound.y = this.roundHalf(this.positionNew.y);
		this.posRound.x = this.roundHalf(this.positionAvatar.x);
		this.posRound.y = this.roundHalf(this.positionAvatar.y);

		//Check for Obstacles
		if(this.auxl.map.CheckMapObstacles(this.newPosRound, this.posRound)){
			this.avatar.object3D.position.copy(this.positionNew);
		}
	} else {
		//Free Locomotion No Collision
		this.avatar.object3D.position.copy(this.positionNew);
	}
},
//3rd POV Walk along XZ Floor w/ Up & Down Controls
rigXYZ: function (action, speed){},
//3rd POV Walk along X, Y or Z Floor/Walls
rigXYZWall: function (action, speed){},
//3rd POV Orbit Rotate
rigAXY: function (action, speed) {
	this.velocity = speed/10;
	this.rotationNew = new THREE.Euler(0,0,0,'YXZ');
	this.rotationAvatar.copy(this.avatarSphere.object3D.rotation);

	if(action === 'forwardRight'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'forwardLeft'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	} else if(action === 'reverseRight'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'reverseLeft'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	} else if(action === 'forward'){
		this.rotationNew.x = this.rotationAvatar.x + this.velocity;
		this.rotationNew.y = this.rotationAvatar.y;
	} else if(action === 'reverse'){
		this.rotationNew.x = this.rotationAvatar.x - this.velocity;
		this.rotationNew.y = this.rotationAvatar.y;
	} else if(action === 'right'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.y = this.rotationAvatar.y - this.velocity;
	} else if(action === 'left'){
		this.rotationNew.x = this.rotationAvatar.x;
		this.rotationNew.y = this.rotationAvatar.y + this.velocity;
	}
	this.rotationNew.z = this.rotationAvatar.z;

	//Free Locomotion No Collision
	this.avatarSphere.object3D.rotation.copy(this.rotationNew);
},
//3rd POV Orbit Rotate w/ Zoom In & Out
rigAXYZ: function (action, speed){},
//Camera Direction to Spawn Assets In - Unused Currently
userDirection: function (){
	this.userPos = this.player.getAttribute('position');
	this.userRot = this.camera.getAttribute('rotation');
	//Check which direction the user is traveling
	if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northWest -x-z
		this.userTravel = 'northWest';
	} else if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southWest -x +z
		this.userTravel = 'southWest';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southEast +x+z
		this.userTravel = 'southEast';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northEast +x-z
		this.userTravel = 'northEast';
	} else {
		//Default
		this.userTravel = 'northEast';
	}
	//After previous to current position check, update the previous position value to be compared against on the next run cycle
	this.userPreviousPos = this.userPos;

	//If POV Rotation is more then 360 or -360, divide it by sets of 360 to obtain 0-360 degrees to assign from
	if( this.userRot.y > 360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else if(this.userRot.y < -360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else {
		this.userPov = this.userRot.y;
	}
	//Check which direciton the User is facing
	if ((this.userPov > 0 && this.userPov < 15) || (this.userPov > 345 && this.userPov < 360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov > 255 && this.userPov > 285) {
			//East
			this.userView = 'east';
		} else if (this.userPov > 75 && this.userPov < 105) {
			//West
			this.userView = 'west';
		} else if (this.userPov > 165 && this.userPov < 195) {
			//South
			this.userView = 'south';
		} else if ((this.userPov < 0 && this.userPov > -15) || (this.userPov < -345 && this.userPov > -360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov < -255 && this.userPov > -285) {
			//West
			this.userView = 'west';
		} else if (this.userPov < -75 && this.userPov > -105) {
			//East
			this.userView = 'east';
		} else if (this.userPov < -165 && this.userPov > -195) {
			//South
			this.userView = 'south';
		} else if (this.userPov > 15 && this.userPov < 75) {//
			//North West
			this.userView = 'northWest';
	   } else if (this.userPov > 105 && this.userPov < 165) {//
			//South West
			this.userView = 'southWest';
		} else if (this.userPov > 195 && this.userPov < 255) {//
			//South East
			this.userView = 'southEast';
		} else if (this.userPov > 285 && this.userPov < 345) {//
			//North East
			this.userView = 'northEast';
		} else if (this.userPov < -15 && this.userPov > -75 ) {//Negative direction
			//North East
			this.userView = 'northEast';
	   } else if (this.userPov < -105 && this.userPov > -165) {
			//South East
			this.userView = 'southEast';
		} else if (this.userPov < -195 && this.userPov > -255) {
			//South West
			this.userView = 'southWest';
		} else if (this.userPov < -285 && this.userPov > -345) {
			//North West
			this.userView = 'northWest';
		} else {
			this.userView = 'north';
		}
	//Depending on the User's facing direction, spawn in that quadrant
	if(this.userView === "northWest"){// -x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z = (this.velocity + this.positionPlayer.z) * -1;
		this.positionTemp.z += this.positionPlayer.z;
	} else if(this.userView === "southWest"){// -x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "southEast"){// +x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "northEast"){// +x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "north"){// +-x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "west"){// -x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "east"){// +x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "south"){// +-x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else {
		this.positionTemp.x = 0;
		this.positionTemp.z = 0;
	}
	this.positionNew = new THREE.Vector3(this.positionTemp.x, 0, this.positionTemp.z);
},

});

//
//Teleportation
//Component for Teleportation Points Object
const teleportation = AFRAME.registerComponent('teleportation',{
dependencies: ['auxl'],
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
init: function(){
	//Prepare Teleport Controls
	if(this.el.classList.contains('teleport')){
		this.el.parentNode.setAttribute('active', 'false');
	} else if(this.el.classList.contains('cancel')){
		this.el.classList.toggle('clickable', false);
		this.el.parentNode.setAttribute('active', 'false');
	}
},
//Instantly Reset All Teleportation Points
resetTeleCircles: function () {
	this.allTeleportors = document.querySelectorAll('.teleporter');
	for (let i= 0; i < this.allTeleportors.length; i++){
		if (this.allTeleportors[i].parentNode.getAttribute('active') === 'true') {
			this.allTeleportors[i].emit('resetInstant',{});
			this.allTeleportors[i].nextSibling.emit('resetInstant',{});
		}
	}
},
//Reset of Teleportation Point
resetInstantEvent: function () {
	if(this.classList.contains('teleport')) {
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')) {
		this.classList.toggle('clickable', false);
		this.parentNode.setAttribute('active', 'false');
	}
},
//Regular Reset of Teleportation Point
resetEvent: function () {
	if(this.classList.contains('teleport')){
		this.parentNode.setAttribute('active', 'false');
	} else if(this.classList.contains('cancel')){
		this.classList.toggle('clickable', false);
		this.parentNode.setAttribute('active', 'false');
	}
},
//Dynamically Teleport to Point Selected
clickToTeleport: function () {
	let element = this;
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = this.parentNode.getAttribute('position');
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;
	//Prepare Player Movement
	function prepMove(element, newPos, telePos){
		//Do an reset on element to not interfer with anim
		//Selected Circle
		element.emit('reset',{});
		//Cancel Circle
		element.nextSibling.emit('reset',{});
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}
	//Instantly Reset All Teleportation Points
	function resetTeleCircles(){
		for(let i= 0; i < allTeleportors.length; i++){
			if(allTeleportors[i].parentNode.getAttribute('active') === 'true') {
				allTeleportors[i].emit('resetInstant',{});
				allTeleportors[i].nextSibling.emit('resetInstant',{});
			}
		}
	}
	//Teleport Control
	if(element.parentNode.getAttribute('active') === 'false') {
		//Allow cancel circle to be viewable and clickable
		element.nextSibling.classList.toggle('clickable', true);
		element.nextSibling.emit('click1',{});
		element.userPov = userView.getAttribute('rotation');
		element.rotationParams = {
			property: 'object3D.rotation.y',
			to: element.userPov.y,
			dur: 500,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		element.parentNode.setAttribute('animation__rotateToUser', element.rotationParams);
		element.parentNode.setAttribute('active', 'true');
	} else {
		//Confirm and Cancel circle are ready to be clicked
		//if Confirm was selected, teleport user and reset properties
		//if Cancel was selcted, reset properties
		if(element.classList.contains('teleport')) {
			//Teleportation Type
			if(teleportType === 'instant') {
				resetTeleCircles();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 250);
			} else if(teleportType === 'fade') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			} else if(teleportType === 'locomotion') {
				//Create locomotion animation based on teleported Pos
				let travelParams = {
					property: 'position',
					from: {x: userPos.x, y: 0, z: userPos.z},
					to: {x: teleportPos.x, y: 0, z: teleportPos.z},
					dur: 1000,
					delay: 0,
					loop: 'false',
					dir: 'normal',
					easing:'easeInOutSine',
					elasticity: 400,
					autoplay: 'true',
					enabled: 'true',
					};
				user.setAttribute('animation__locomotion', travelParams);
				element.nextSibling.emit('reset',{});//cancel circle
				resetTeleCircles();
			} else if(teleportType === 'sphere') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			} else if(teleportType === 'blink') {
				auxl.player.PlayerTeleportAnim();
				prepMove(element, newPosition, teleportPos);
				posTimeout = setTimeout(function () {
					resetTeleCircles();
					user.object3D.position.copy(newPosition);
					clearTimeout(posTimeout);
				}, 600);
			}
		} else if (element.classList.contains('cancel')) {
			element.emit('reset',{});
		}
	}
},
update: function () {
	this.el.addEventListener('reset', this.resetEvent);
	this.el.addEventListener('resetInstant', this.resetInstantEvent);
	this.el.addEventListener('click', this.clickToTeleport);
},
remove: function () {
	this.el.removeEventListener('reset', this.resetEvent);
	this.el.removeEventListener('resetInstant', this.resetInstantEvent);
	this.el.removeEventListener('click', this.clickToTeleport);
},
});

//
//Raycast Teleportation
//Add to Clickable Object to Teleport to Raycast Intersection Position
const raycastTeleport = AFRAME.registerComponent('raycast-teleportation-select', {
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported
dependencies: ['auxl'],
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.hoverSelectData = {
	data:'hoverSelectData',
	id:'hoverSelect',
	text: {value:'Teleport Here', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
	geometry: {primitive: 'circle', radius: 0.5, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#3eb58c", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3eb58c", emissiveIntensity: 0.2, side: 'front'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		stare:{twist: true,}
	},
	};
	this.hoverSelect = this.auxl.Core(this.hoverSelectData);

	this.spawned = false;
},
spawnSelect: function (event){
	let teleportPos = event.detail.intersection.point;
	if(this.spawned){
		this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
		this.hoverSelect.DespawnCore();
	}
	this.hoverSelect.core.position.x = teleportPos.x;
	this.hoverSelect.core.position.y = 1;
	this.hoverSelect.core.position.z = teleportPos.z;
	this.hoverSelect.SpawnCore();

	this.clickToTeleportEvent = (event) => {
		this.clickToTeleport(event);
	}
	this.hoverSelect.GetEl().addEventListener('click',this.clickToTeleportEvent);
	this.spawned = true;
},
clickToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = event.detail.intersection.point;
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	//Remove HoverSelect
	this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
	this.hoverSelect.DespawnCore();
	this.spawned = false;

	//Prepare Movement
	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	//Teleportation Based on Player Transition Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 250);
	} else if(teleportType === 'fade') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'locomotion') {
		//Create locomotion animation based on teleported Pos
		let travelParams = {
			property: 'position',
			from: {x: userPos.x, y: 0, z: userPos.z},
			to: {x: teleportPos.x, y: 0, z: teleportPos.z},
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		user.setAttribute('animation__locomotion', travelParams);
	} else if(teleportType === 'sphere') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'blink') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	}
},
update: function () {
	this.spawnSelectEvent = (event) => {
		this.spawnSelect(event);
	}
	this.el.addEventListener('click', this.spawnSelectEvent);

},
remove: function () {
	if(this.spawned){
		this.hoverSelect.GetEl().removeEventListener('click',this.clickToTeleportEvent);
		this.hoverSelect.DespawnCore();
	}

	this.el.removeEventListener('click', this.spawnSelectEvent);
},
});

//
//Raycast Teleportation
const raycastTeleportSelect = AFRAME.registerComponent('raycast-teleportation', {
dependencies: ['auxl'],
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
init: function () {},
clickToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	let teleportPos = event.detail.intersection.point;
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	//Prepare Movement
	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		newPos.y = 0;
	}

	//Teleportation Based on Player Transition Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 250);
	} else if(teleportType === 'fade') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'locomotion') {
		//Create locomotion animation based on teleported Pos
		let travelParams = {
			property: 'position',
			from: {x: userPos.x, y: 0, z: userPos.z},
			to: {x: teleportPos.x, y: 0, z: teleportPos.z},
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
			};
		user.setAttribute('animation__locomotion', travelParams);
	} else if(teleportType === 'sphere') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	} else if(teleportType === 'blink') {
		auxl.player.PlayerTeleportAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			user.object3D.position.copy(newPosition);
			clearTimeout(posTimeout);
		}, 600);
	}
},
update: function () {
	this.raycastTeleport = (event) => {
		this.clickToTeleport(event);
	}
	this.el.addEventListener('click', this.raycastTeleport);
},
remove: function () {
	this.el.removeEventListener('click', this.raycastTeleport);
},
});

//
//Teleportation To
const teleportto = AFRAME.registerComponent('teleportation-to', {
dependencies: ['auxl'],
schema: {
	x: {type: 'number', default: 0},
	y: {type: 'number', default: 0},
	z: {type: 'number', default: 0},
    //posTo: {type: 'boolean', default: false},
    //pos: {type: 'vec3'},
    twistTo: {type: 'boolean', default: false},
	twist: {type: 'number', default: 0},
	event: {type: 'string', default: 'click'},
},
//Uses Player's Scene Transition Type to Teleport
//Locomotion Teleportation also supported 
init: function () {},
eventToTeleport: function (event) {
	let user = document.getElementById('playerRig');
	let userView = document.getElementById('camera');
	let auxl = document.querySelector('a-scene').systems.auxl;
	let userPos = user.getAttribute('position');
	let teleportType = auxl.player.layer.transition.teleport;
	let newPosition = new THREE.Vector3();
	//let teleportPos = event.detail.intersection.point;
	let teleportPos = new THREE.Vector3(this.data.x,this.data.y,this.data.z);
	let allTeleportors = document.querySelectorAll('.teleporter');
	let posTimeout;
	let animTimeout;

	let twistTo = this.data.twistTo;
	let twist = this.data.twist;

	//Prepare Movement
	function prepMove(newPos, telePos){
		//Clone current entity's position User
		newPos.copy(telePos);
		//Reset User's Y back to 0 - Flat Mode
		//newPos.y = 0;
	}
	function move(pos){
		if(auxl.player.layer.playerPhysics){
			user.body.position.copy(pos);
			user.body.computeAABB();
		} else {
			user.object3D.position.copy(newPosition);
		}
		if(twistTo){
			auxl.player.TwistTo(twist);
		}
	}
	//Teleportation Based on Player Transition Type
	if(teleportType === 'instant') {
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			//user.object3D.position.copy(newPosition);
			move(newPosition);
			clearTimeout(posTimeout);
		}, 250);
	} else if(teleportType === 'fade') {
		auxl.player.PlayerQuickAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			//user.object3D.position.copy(newPosition);
			move(newPosition);
			clearTimeout(posTimeout);
		}, 225);
	} else if(teleportType === 'locomotion') {
		//Create locomotion animation based on teleported Pos
		if(auxl.player.layer.playerPhysics){
			console.log('Configure Physics Locomotion Teleportation')
		} else {
			let travelParams = {
				property: 'position',
				from: {x: userPos.x, y: 0, z: userPos.z},
				to: {x: teleportPos.x, y: 0, z: teleportPos.z},
				dur: 1000,
				delay: 0,
				loop: 'false',
				dir: 'normal',
				easing:'easeInOutSine',
				elasticity: 400,
				autoplay: 'true',
				enabled: 'true',
				};
			user.setAttribute('animation__locomotion', travelParams);
		}
	} else if(teleportType === 'sphere') {
		auxl.player.PlayerQuickAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			//user.object3D.position.copy(newPosition);
			move(newPosition);
			clearTimeout(posTimeout);
		}, 225);
	} else if(teleportType === 'blink') {
		auxl.player.PlayerQuickAnim();
		prepMove(newPosition, teleportPos);
		posTimeout = setTimeout(function () {
			//user.object3D.position.copy(newPosition);
			move(newPosition);
			clearTimeout(posTimeout);
		}, 225);
	}
},
update: function () {
	this.raycastTeleport = (event) => {
		this.eventToTeleport(event);
	}
	this.el.addEventListener(this.data.event, this.raycastTeleport);
},
remove: function () {
	this.el.removeEventListener(this.data.event, this.raycastTeleport);
},
});

//
//Export
export {locomotion, teleportation, raycastTeleport, raycastTeleportSelect, teleportto};