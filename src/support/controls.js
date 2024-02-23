//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Controls

//
//Aux Controller
//Customizable Controls and Methods, Defaults for Locomotion and Snap Turning
const auxcontroller = AFRAME.registerComponent('auxcontroller', {
dependencies: ['auxl'],
schema: {
	update: {type: 'number', default: 0},
	id: {type: 'string', default: 'player'},
},
init: function () {

//Currently configured to have a single instance in the entire scene.

//Controls to Configure for :
//Desktop : Mouse & Keyboard
//Mobile : Touchscreen
//VR Advanced : Dual 6DoF Controllers
//VR Basic : Single 3DoF Button Controller - Need to Finish
//VR Mobile : Headset Only - Need to Add
//Hand Tracking : Dual Hand Movements - Need to Add
//Game Controller - Need To Add

//Control Actions :
//Main Click - Triggers, Mouse Click, Screen Tap
//Alt Click - Grip, Mouse Right Click, HTML Alt
//Directional Movement - Locomotion Joystick, Key WASD/Arrows, HTML Direction Buttons
//Rotational Movement - Headset, Mouse, Gyro
//Action 1 - Button X, Key Q, HTML A
//Action 2 - Button Y, Key E, HTML B
//Action 3 - Button A, Key R, HTML C
//Action 4 - Button B, Key T, HTML D
//Action 5 - Other Joystick Down, Key C, HTML E
//Action 6 - Other Joystick Up, Key V, HTML F
//Action 7 - Other Joystick Left, Key Z, HTML <-
//Action 8 - Other Joystick Right, Key X, HTML ->


//Default Actions :
//Main Menu Toggle
//Player Camera Rotation
//Player Camera Zoom In
//Player Camera Zoom Out
//Player Rig Locomotion
//Player Rig Snap Turn Left
//Player Rig Snap Turn Right

//ToDo : Add Button combinations, pressing multiple at the same time, etc... as an action assignable

//Self
this.id = this.data.id;

//Time
this.time = 0;

this.aScene = document.querySelector('a-scene');
this.auxl = document.querySelector('a-scene').systems.auxl;
//Locomotion Component
this.locomotion;
this.gimbal;
//VR Controllers
this.vrController1;
this.vrController2;

//Gimbal Disabled

//Remappable Desktop Controls
this.controls = {
directionForwardKeys: ['w','W'],
directionLeftKeys: ['a','A'],
directionBackwardKeys: ['s','S'],
directionRightKeys: ['d','D'],
//rotationForwardKeys: ['ArrowUp'],
rotationForwardKeys: [null],
//rotationLeftKeys: ['ArrowLeft'],
rotationLeftKeys: [null],
//rotationBackwardKeys: ['ArrowDown'],
rotationBackwardKeys: [null],
//rotationRightKeys: ['ArrowRight'],
rotationRightKeys: [null],
//Link Current Keyboard Toggles
//Allow customization here
action1Keys: [' ',' '],
action2Keys: ['q','Q'],
action3Keys: ['e','E'],
action4Keys: ['r','R'],
action5Keys: ['t','T'],
action6Keys: ['x','X'],
action7Keys: ['c','C'],
action8Keys: ['v','V'],

};
this.auxl.controlConfig = this.controls;

//Mobile HTML Buttons
this.mobileUpLeft = document.getElementById('upLeft');
this.mobileUp = document.getElementById('up');
this.mobileUpRight = document.getElementById('upRight');
this.mobileLeft = document.getElementById('left');
this.mobileCenter = document.getElementById('center');
this.mobileRight = document.getElementById('right');
this.mobileDownLeft = document.getElementById('downLeft');
this.mobileDown = document.getElementById('down');
this.mobileDownRight = document.getElementById('downRight');
this.mobileSelect = document.getElementById('select');
this.mobileStart = document.getElementById('start');
this.mobileA = document.getElementById('a');
this.mobileB = document.getElementById('b');
this.mobileC = document.getElementById('c');
this.mobileD = document.getElementById('d');
this.mobileE = document.getElementById('e');
this.mobileF = document.getElementById('f');
this.mobileG = document.getElementById('g');
this.mobileH = document.getElementById('h');
this.mobileI = document.getElementById('i');

//Customizable Action Controls
this.altDownFunc = false;
this.altDownParams = false;
this.altUpFunc = false;
this.altUpParams = false;
this.action1DownFunc = false;
this.action1DownParams = false;
this.action1UpFunc = false;
this.action1UpParams = false;
this.action2DownFunc = false;
this.action2DownParams = false;
this.action2UpFunc = false;
this.action2UpParams = false;
this.action3DownFunc = false;
this.action3DownParams = false;
this.action3UpFunc = false;
this.action3UpParams = false;
this.action4DownFunc = false;
this.action4DownParams = false;
this.action4UpFunc = false;
this.action4UpParams = false;
this.action5DownFunc = false;
this.action5DownParams = false;
this.action5UpFunc = false;
this.action5UpParams = false;
this.action6DownFunc = false;
this.action6DownParams = false;
this.action6UpFunc = false;
this.action6UpParams = false;
this.action7DownFunc = false;
this.action7DownParams = false;
this.action7UpFunc = false;
this.action7UpParams = false;
this.action8DownFunc = false;
this.action8DownParams = false;
this.action8UpFunc = false;
this.action8UpParams = false;

//
//Control Events

//Main Click
this.mainClickDetail = {info: 'Main Click', click: null};
this.mainClickEvent = new CustomEvent('mainClick', {
	bubbles: false,
	cancelable: true,
	detail: this.mainClickDetail,
});
//Alt Click
this.altClickDetail = {info: 'Alt Click', click: null};
this.altClickEvent = new CustomEvent('altClick', {
	bubbles: false,
	cancelable: true,
	detail: this.altClickDetail,
});
//Directional Movement
this.directionEventDetail = {info: 'Direction', direction: null};
this.directionEvent = new CustomEvent('direction', {
	bubbles: false,
	cancelable: true,
	detail: this.directionEventDetail,
});
//Rotational Movement
this.rotationEventDetail = {info: 'Rotation', rotation: null};
this.rotationEvent = new CustomEvent('rotation', {
	bubbles: false,
	cancelable: true,
	detail: this.rotationEventDetail,
});
//Action 1
this.action1EventDetail = {info: 'Action 1', action: null};
this.action1Event = new CustomEvent('action1', {
	bubbles: false,
	cancelable: true,
	detail: this.action1EventDetail,
});
//Action 2
this.action2EventDetail = {info: 'Action 2', action: null};
this.action2Event = new CustomEvent('action2', {
	bubbles: false,
	cancelable: true,
	detail: this.action2EventDetail,
});
//Action 3
this.action3EventDetail = {info: 'Action 3', action: null};
this.action3Event = new CustomEvent('action3', {
	bubbles: false,
	cancelable: true,
	detail: this.action3EventDetail,
});
//Action 4
this.action4EventDetail = {info: 'Action 4', action: null};
this.action4Event = new CustomEvent('action4', {
	bubbles: false,
	cancelable: true,
	detail: this.action4EventDetail,
});
//Action 5
this.action5EventDetail = {info: 'Action 5', action: null};
this.action5Event = new CustomEvent('action5', {
	bubbles: false,
	cancelable: true,
	detail: this.action5EventDetail,
});
//Action 6
this.action6EventDetail = {info: 'Action 6', action: null};
this.action6Event = new CustomEvent('action6', {
	bubbles: false,
	cancelable: true,
	detail: this.action6EventDetail,
});
//Action 7
this.action7EventDetail = {info: 'Action 7', action: null};
this.action7Event = new CustomEvent('action7', {
	bubbles: false,
	cancelable: true,
	detail: this.action7EventDetail,
});
//Action 8
this.action8EventDetail = {info: 'Action 8', action: null};
this.action8Event = new CustomEvent('action8', {
	bubbles: false,
	cancelable: true,
	detail: this.action8EventDetail,
});

//Main Click
this.mainClickHit = (e) => {
	this.mainClick(e);
}
this.mainClickE = () => {
	this.mainClickDetail.click = 'click';
	document.dispatchEvent(this.mainClickEvent);
}
this.mainClickDown = () => {
	this.mainClickDetail.click = 'clickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.mainClickUp = () => {
	this.mainClickDetail.click = 'clickUp';
	document.dispatchEvent(this.mainClickEvent);
}

//Alt Click
this.altClickHit = (e) => {
	this.altClick(e);
}
this.altClickDown = () => {
	this.altClickDetail.click = 'altClickHit';
	document.dispatchEvent(this.altClickEvent);
}
this.altClickUp = () => {
	this.altClickDetail.click = 'altClickRelease';
	document.dispatchEvent(this.altClickEvent);
}
this.dispatchAlt = () => {
	document.dispatchEvent(this.altClickEvent);
}

//Directional Movement
this.directionHit = (e) => {
	this.direction(e);
}
//Forward Left
this.directionForwardLeftDown = () => {
	this.directionForwardDown();
	this.directionLeftDown();
}
this.directionForwardLeftUp = () => {
	this.directionForwardUp();
	this.directionLeftUp();
}
//Forward
this.directionForwardDown = () => {
	this.directionEventDetail.direction = 'forwardHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionForwardUp = () => {
	this.directionEventDetail.direction = 'forwardRelease';
	document.dispatchEvent(this.directionEvent);
}
//Forward Right
this.directionForwardRightDown = () => {
	this.directionForwardDown();
	this.directionRightDown();
}
this.directionForwardRightUp = () => {
	this.directionForwardUp();
	this.directionRightUp();
}
//Left
this.directionLeftDown = () => {
	this.directionEventDetail.direction = 'leftHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionLeftUp = () => {
	this.directionEventDetail.direction = 'leftRelease';
	document.dispatchEvent(this.directionEvent);
}
//Backward Left
this.directionBackwardLeftDown = () => {
	this.directionBackwardDown();
	this.directionLeftDown();
}
this.directionBackwardLeftUp = () => {
	this.directionBackwardUp();
	this.directionLeftUp();
}
//Backward
this.directionBackwardDown = () => {
	this.directionEventDetail.direction = 'backwardHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionBackwardUp = () => {
	this.directionEventDetail.direction = 'backwardRelease';
	document.dispatchEvent(this.directionEvent);
}
//Backward Right
this.directionBackwardRightDown = () => {
	this.directionBackwardDown();
	this.directionRightDown();
}
this.directionBackwardRightUp = () => {
	this.directionBackwardUp();
	this.directionRightUp();
}
//Right
this.directionRightDown = () => {
	this.directionEventDetail.direction = 'rightHit';
	document.dispatchEvent(this.directionEvent);
}
this.directionRightUp = () => {
	this.directionEventDetail.direction = 'rightRelease';
	document.dispatchEvent(this.directionEvent);
}

//Rotational Movement
this.rotationHit = (e) => {
	this.rotation(e);
}
/*
this.dispatchRotation = () => {
	document.dispatchEvent(this.rotationEvent);
}
*/
//Forward Left
this.rotationForwardLeftDown = () => {
	this.rotationForwardDown();
	this.rotationLeftDown();
}
this.rotationForwardLeftUp = () => {
	this.rotationForwardUp();
	this.rotationLeftUp();
}
//Forward
this.rotationForwardDown = () => {
	this.rotationEventDetail.rotation = 'forwardHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationForwardUp = () => {
	this.rotationEventDetail.rotation = 'forwardRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Forward Right
this.rotationForwardRightDown = () => {
	this.rotationForwardDown();
	this.rotationRightDown();
}
this.rotationForwardRightUp = () => {
	this.rotationForwardUp();
	this.rotationRightUp();
}
//Left
this.rotationLeftDown = () => {
	this.rotationEventDetail.rotation = 'leftHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationLeftUp = () => {
	this.rotationEventDetail.rotation = 'leftRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Backward Left
this.rotationBackwardLeftDown = () => {
	this.rotationBackwardDown();
	this.rotationLeftDown();
}
this.rotationBackwardLeftUp = () => {
	this.rotationBackwardUp();
	this.rotationLeftUp();
}
//Backward
this.rotationBackwardDown = () => {
	this.rotationEventDetail.rotation = 'backwardHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationBackwardUp = () => {
	this.rotationEventDetail.rotation = 'backwardRelease';
	document.dispatchEvent(this.rotationEvent);
}
//Backward Right
this.rotationBackwardRightDown = () => {
	this.rotationBackwardDown();
	this.rotationRightDown();
}
this.rotationBackwardRightUp = () => {
	this.rotationBackwardUp();
	this.rotationRightUp();
}
//Right
this.rotationRightDown = () => {
	this.rotationEventDetail.rotation = 'rightHit';
	document.dispatchEvent(this.rotationEvent);
}
this.rotationRightUp = () => {
	this.rotationEventDetail.rotation = 'rightRelease';
	document.dispatchEvent(this.rotationEvent);
}

//Action 1
this.action1Hit = (e) => {
	this.action1(e);
}
this.action1Down = () => {
	this.action1EventDetail.action = 'action1Hit';
	document.dispatchEvent(this.action1Event);
}
this.action1Up = () => {
	this.action1EventDetail.action = 'action1Release';
	document.dispatchEvent(this.action1Event);
}
//Action 2
this.action2Hit = (e) => {
	this.action2(e);
}
this.action2Down = () => {
	this.action2EventDetail.action = 'action2Hit';
	document.dispatchEvent(this.action2Event);
}
this.action2Up = () => {
	this.action2EventDetail.action = 'action2Release';
	document.dispatchEvent(this.action2Event);
}
//Action 3
this.action3Hit = (e) => {
	this.action3(e);
}
this.action3Down = () => {
	this.action3EventDetail.action = 'action3Hit';
	document.dispatchEvent(this.action3Event);
}
this.action3Up = () => {
	this.action3EventDetail.action = 'action3Release';
	document.dispatchEvent(this.action3Event);
}
//Action 4
this.action4Hit = (e) => {
	this.action4(e);
}
this.action4Down = () => {
	this.action4EventDetail.action = 'action4Hit';
	document.dispatchEvent(this.action4Event);
}
this.action4Up = () => {
	this.action4EventDetail.action = 'action4Release';
	document.dispatchEvent(this.action4Event);
}
//Action 5
this.action5Hit = (e) => {
	this.action5(e);
}
this.action5Down = () => {
	this.action5EventDetail.action = 'action5Hit';
	document.dispatchEvent(this.action5Event);
}
this.action5Up = () => {
	this.action5EventDetail.action = 'action5Release';
	document.dispatchEvent(this.action5Event);
}
//Action 6
this.action6Hit = (e) => {
	this.action6(e);
}
this.action6Down = () => {
	this.action6EventDetail.action = 'action6Hit';
	document.dispatchEvent(this.action6Event);
}
this.action6Up = () => {
	this.action6EventDetail.action = 'action6Release';
	document.dispatchEvent(this.action6Event);
}
//Action 7
this.action7Hit = (e) => {
	this.action7(e);
}
this.action7Down = () => {
	this.action7EventDetail.action = 'action7Hit';
	document.dispatchEvent(this.action7Event);
}
this.action7Up = () => {
	this.action7EventDetail.action = 'action7Release';
	document.dispatchEvent(this.action7Event);
}
//Action 8
this.action8Hit = (e) => {
	this.action8(e);
}
this.action8Down = () => {
	this.action8EventDetail.action = 'action8Hit';
	document.dispatchEvent(this.action8Event);
}
this.action8Up = () => {
	this.action8EventDetail.action = 'action8Release';
	document.dispatchEvent(this.action8Event);
}

//
//Keyboard Events
this.keyboardDownHit = (e) => {
	this.keyboardDown(e);
}
this.keyboardUpHit = (e) => {
	this.keyboardUp(e);
}

//
//Blank
this.blankHit = (e) => {
	this.blank(e);
}

//
//Controller Events

//Left
//Main Trigger
this.questLeftMainClickDown = () => {
	this.mainClickDetail.click = 'leftClickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.questLeftMainClickUp = () => {
	this.mainClickDetail.click = 'leftClickUp';
	document.dispatchEvent(this.mainClickEvent);
}
//Secondary Trigger
this.questLeftAltClickDown = () => {
	this.altClickDetail.click = 'leftAltClickDown';
	document.dispatchEvent(this.altClickEvent);
}
this.questLeftAltClickUp = () => {
	this.altClickDetail.click = 'leftAltClickUp';
	document.dispatchEvent(this.altClickEvent);
}

//Right
//Main Trigger
this.questRightMainClickDown = () => {
	this.mainClickDetail.click = 'rightClickDown';
	document.dispatchEvent(this.mainClickEvent);
}
this.questRightMainClickUp = () => {
	this.mainClickDetail.click = 'rightClickUp';
	document.dispatchEvent(this.mainClickEvent);
}
//Secondary Trigger
this.questRightAltClickDown = () => {
	this.altClickDetail.click = 'rightAltClickDown';
	document.dispatchEvent(this.altClickEvent);
}
this.questRightAltClickUp = () => {
	this.altClickDetail.click = 'rightAltClickUp';
	document.dispatchEvent(this.altClickEvent);
}
//Joystick
this.questJoystickOtherEvent = (e) => {
	this.questJoystick4Other(e);
}

//Joystick Settings
//Locomotion Joystick
this.deadzoneLoco = 0.1;
this.xNumLoco = 0;
this.yNumLoco = 0;
this.angleLoco = 0;
this.angleDegLoco = 0;
//Other Joystick
this.deadzoneOther = 0.1;
this.xNumOther = 0;
this.yNumOther = 0;
this.angleOther = 0;
this.angleDegOther = 0;
//Locomotion Joystick
this.deadzoneRot = 0.1;
this.xNumRot = 0;
this.yNumRot = 0;
this.angleRot = 0;
this.angleDegRot = 0;

//Keyboard
this.toggled = {};

//Universal Events
document.addEventListener('mainClick', this.mainClickHit);
document.addEventListener('altClick', this.altClickHit);
document.addEventListener('direction', this.directionHit);
document.addEventListener('rotation', this.rotationHit);
document.addEventListener('action1', this.action1Hit);
document.addEventListener('action2', this.action2Hit);
document.addEventListener('action3', this.action3Hit);
document.addEventListener('action4', this.action4Hit);
document.addEventListener('action5', this.action5Hit);
document.addEventListener('action6', this.action6Hit);
document.addEventListener('action7', this.action7Hit);
document.addEventListener('action8', this.action8Hit);

//Desktop
//Click down/up assigned to cursor in initTimeout
//document.addEventListener('click', this.mainClickE);
document.addEventListener('contextmenu', this.dispatchAlt);
document.addEventListener('keydown', this.keyboardDownHit);
document.addEventListener('keyup', this.keyboardUpHit);

//Allow elements to spawn before grabbing/assigning
let initTimeout = setTimeout(() => {
	this.auxl.mouseController.GetEl().addEventListener('mousedown', this.mainClickDown);
	this.auxl.mouseController.GetEl().addEventListener('mouseup', this.mainClickUp);

	//Locomotion Component
	this.locomotion = this.el.components.locomotion;

	//Quest
	this.vrController1 = document.getElementById('vrController1');
	this.vrController2 = document.getElementById('vrController2');

	//Left
	//Main Trigger
	this.vrController1.addEventListener('triggerdown', this.questLeftMainClickDown);
	this.vrController1.addEventListener('triggerup', this.questLeftMainClickUp);
	//Secondary Trigger
	this.vrController1.addEventListener('gripdown', this.questLeftAltClickDown);
	this.vrController1.addEventListener('gripup', this.questLeftAltClickUp);
	//Button 1 (X)
	this.vrController1.addEventListener('xbuttondown', this.action1Down);
	this.vrController1.addEventListener('xbuttonup', this.action1Up);
	//Button 2 (Y)
	this.vrController1.addEventListener('ybuttondown', this.action2Down);
	this.vrController1.addEventListener('ybuttonup', this.action2Up);

	//Right
	//Main Trigger
	this.vrController2.addEventListener('triggerdown', this.questRightMainClickDown);
	this.vrController2.addEventListener('triggerup', this.questRightMainClickUp);
	//Secondary Trigger
	this.vrController2.addEventListener('gripdown', this.questRightAltClickDown);
	this.vrController2.addEventListener('gripup', this.questRightAltClickUp);
	//Button 1 (A)
	this.vrController2.addEventListener('abuttondown', this.action3Down);
	this.vrController2.addEventListener('abuttonup', this.action3Up);
	//Button 2 (B)
	this.vrController2.addEventListener('bbuttondown', this.action4Down);
	this.vrController2.addEventListener('bbuttonup', this.action4Up);

	//Joysticks
	this.addJoystickEvents();

	this.mobileSelect.addEventListener('touchstart', this.auxl.ToggleHTMLMenu);
	this.mobileStart.addEventListener('touchstart', this.auxl.player.MainMenuAction);

}, 250);


//Mobile
this.mobileUpLeft.addEventListener('touchstart', this.directionForwardLeftDown);
this.mobileUpLeft.addEventListener('touchend', this.directionForwardLeftUp);
this.mobileUp.addEventListener('touchstart', this.directionForwardDown);
this.mobileUp.addEventListener('touchend', this.directionForwardUp);
this.mobileUpRight.addEventListener('touchstart', this.directionForwardRightDown);
this.mobileUpRight.addEventListener('touchend', this.directionForwardRightUp);
this.mobileLeft.addEventListener('touchstart', this.directionLeftDown);
this.mobileLeft.addEventListener('touchend', this.directionLeftUp);
this.mobileCenter.addEventListener('touchstart', this.blankHit);
this.mobileCenter.addEventListener('touchend', this.blankHit);
this.mobileRight.addEventListener('touchstart', this.directionRightDown);
this.mobileRight.addEventListener('touchend', this.directionRightUp);
this.mobileDownLeft.addEventListener('touchstart', this.directionBackwardLeftDown);
this.mobileDownLeft.addEventListener('touchend', this.directionBackwardLeftUp);
this.mobileDown.addEventListener('touchstart', this.directionBackwardDown);
this.mobileDown.addEventListener('touchend', this.directionBackwardUp);
this.mobileDownRight.addEventListener('touchstart', this.directionBackwardRightDown);
this.mobileDownRight.addEventListener('touchend', this.directionBackwardRightUp);
this.mobileSelect.addEventListener('touchstart', this.blankHit);
//this.mobileSelect.addEventListener('touchend', this.blankHit);
//this.mobileStart.addEventListener('touchstart', this.blankHit);
//this.mobileStart.addEventListener('touchend', this.blankHit);
this.mobileA.addEventListener('touchstart', this.action1Down);
this.mobileA.addEventListener('touchend', this.action1Up);
this.mobileB.addEventListener('touchstart', this.action2Down);
this.mobileB.addEventListener('touchend', this.action2Up);
this.mobileC.addEventListener('touchstart', this.action3Down);
this.mobileC.addEventListener('touchend', this.action3Up);
this.mobileD.addEventListener('touchstart', this.action4Down);
this.mobileD.addEventListener('touchend', this.action4Up);
this.mobileE.addEventListener('touchstart', this.action5Down);
this.mobileE.addEventListener('touchend', this.action5Up);
this.mobileF.addEventListener('touchstart', this.action6Down);
this.mobileF.addEventListener('touchend', this.action6Up);
this.mobileG.addEventListener('touchstart', this.action7Down);
this.mobileG.addEventListener('touchend', this.action7Up);
this.mobileH.addEventListener('touchstart', this.action8Down);
this.mobileH.addEventListener('touchend', this.action8Up);


//this.mobileL.addEventListener('touchend', this.action7Up);

//this.mobileR.addEventListener('touchend', this.action8Up);
//document.addEventListener('mousedown', this.mainClickDown);
//document.addEventListener('mouseup', this.mainClickUp);
//Both the mouseCursor and Canvas element fire mousedown and mouseup resulting in 2 events firing at the same time
/*
mousedown { target: a-entity#mouseCursor, isTrusted: false, detail: {…}, srcElement: a-entity#mouseCursor, currentTarget: HTMLDocument http://localhost/auxl/test.html, eventPhase: 3, bubbles: true, cancelable: false, returnValue: true, defaultPrevented: false, … }

mousedown { target: canvas.a-canvas.a-grab-cursor, buttons: 1, clientX: 1245, clientY: 326, layerX: 1245, layerY: 326 }

	document.addEventListener('mousedown', function(e){
		//e.stopImmediatePropagation();
		//e.stopPropagation();
		//e.preventDefault();
		console.log('Mouse Down')
	});
*/
//To Avoid, do not add listener to the document, but to the cursors itself

    },
//Dev Input Display
updateInput: function (input){
	//console.log(input)
	//Enable A-Frame Entity to use below
	//Display Inputs - DEV Testing
	/*
	const displayInput = document.querySelector('#displayInput');
	let displayInputText = {value: 'No Input', color: 'white', align: 'center'}
	displayInputText.value = input;
	displayInput.setAttribute('text',displayInputText);
	*/
},
//Change Action function
updateAction: function (actionObj){
	//console.log(actionObj);
	for(let action in actionObj){
		//console.log(action);//actionName
		//console.log(actionObj[action]);//object
		let actionFunc;
		let actionParams;
		let actionCommand;
		let htmlDisplay;
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
			actionParams = 'altDownParams';
			htmlDisplay = 'center';
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
			actionParams = 'altUpParams';
			htmlDisplay = 'center';
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
			actionParams = 'action1DownParams';
			htmlDisplay = 'a';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
			actionParams = 'action1UpParams';
			htmlDisplay = 'a';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
			actionParams = 'action2DownParams';
			htmlDisplay = 'b';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
			actionParams = 'action2UpParams';
			htmlDisplay = 'b';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
			actionParams = 'action3DownParams';
			htmlDisplay = 'c';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
			actionParams = 'action3UpParams';
			htmlDisplay = 'c';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
			actionParams = 'action4DownParams';
			htmlDisplay = 'd';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
			actionParams = 'action4UpParams';
			htmlDisplay = 'd';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
			actionParams = 'action5DownParams';
			htmlDisplay = 'e';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
			actionParams = 'action5UpParams';
			htmlDisplay = 'e';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
			actionParams = 'action6DownParams';
			htmlDisplay = 'f';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
			actionParams = 'action6UpParams';
			htmlDisplay = 'f';
		} else if(action === 'action7Down'){
			actionFunc = 'action7DownFunc';
			actionParams = 'action7DownParams';
			htmlDisplay = 'g';
		} else if(action === 'action7Up'){
			actionFunc = 'action7UpFunc';
			actionParams = 'action7UpParams';
			htmlDisplay = 'g';
		} else if(action === 'action8Down'){
			actionFunc = 'action8DownFunc';
			actionParams = 'action8DownParams';
			htmlDisplay = 'h';
		} else if(action === 'action8Up'){
			actionFunc = 'action8UpFunc';
			actionParams = 'action8UpParams';
			htmlDisplay = 'h';
		} else {
			console.log('Failed to identify action')
			return;
		}
		if(actionObj[action]){
			let auxlObj = actionObj[action].auxlObj;
			let component = false;
			if(actionObj[action].component){
				component = actionObj[action].component;
			}
			let func = actionObj[action].func;
			//Assign Parameters if Required
			this[actionParams] = false;
			if(actionObj[action].params){
				this[actionParams] = actionObj[action].params;
			}
			if(component){
				//if component is not auxl, then the object is a dom entity and the component is attached to that object and the func is in that component
				//if component is true, then
//Bind function to the component itself
this[actionFunc] = document.getElementById(auxlObj).components[component][func].bind(document.getElementById(auxlObj).components[component]);
			} else {
				//if component is false, then
				this[actionFunc] = this.auxl[auxlObj][func];
			}
			//Update Control Text
			if(actionObj[action].name){
				this.auxl.controlsInfo[action] = {name: actionObj[action].name, info: actionObj[action].info};
			}
			//Display Mobile HTML
			this.auxl.ToggleHTML(htmlDisplay, true);
		} else {
			this[actionFunc] = false;
			this[actionParams] = false;
		}
	}
},
//Disable Action function
disableAction: function (actionObj){
	//console.log(actionObj);
	for(let action in actionObj){
		//console.log(action);//actionName
		//console.log(actionObj[action]);//params
		let actionFunc;
		let actionParams;
		let htmlDisplay;
		if(action === 'altDown'){
			actionFunc = 'altDownFunc';
			actionParams = 'altDownParams';
			htmlDisplay = 'center';//i
		} else if(action === 'altUp'){
			actionFunc = 'altUpFunc';
			actionParams = 'altUpParams';
			htmlDisplay = 'center';//i
		} else if(action === 'action1Down'){
			actionFunc = 'action1DownFunc';
			actionParams = 'action1DownParams';
			htmlDisplay = 'a';
		} else if(action === 'action1Up'){
			actionFunc = 'action1UpFunc';
			actionParams = 'action1UpParams';
			htmlDisplay = 'a';
		} else if(action === 'action2Down'){
			actionFunc = 'action2DownFunc';
			actionParams = 'action2DownParams';
			htmlDisplay = 'b';
		} else if(action === 'action2Up'){
			actionFunc = 'action2UpFunc';
			actionParams = 'action2UpParams';
			htmlDisplay = 'b';
		} else if(action === 'action3Down'){
			actionFunc = 'action3DownFunc';
			actionParams = 'action3DownParams';
			htmlDisplay = 'c';
		} else if(action === 'action3Up'){
			actionFunc = 'action3UpFunc';
			actionParams = 'action3UpParams';
			htmlDisplay = 'c';
		} else if(action === 'action4Down'){
			actionFunc = 'action4DownFunc';
			actionParams = 'action4DownParams';
			htmlDisplay = 'd';
		} else if(action === 'action4Up'){
			actionFunc = 'action4UpFunc';
			actionParams = 'action4UpParams';
			htmlDisplay = 'd';
		} else if(action === 'action5Down'){
			actionFunc = 'action5DownFunc';
			actionParams = 'action5DownParams';
			htmlDisplay = 'e';
		} else if(action === 'action5Up'){
			actionFunc = 'action5UpFunc';
			actionParams = 'action5UpParams';
			htmlDisplay = 'e';
		} else if(action === 'action6Down'){
			actionFunc = 'action6DownFunc';
			actionParams = 'action6DownParams';
			htmlDisplay = 'f';
		} else if(action === 'action6Up'){
			actionFunc = 'action6UpFunc';
			actionParams = 'action6UpParams';
			htmlDisplay = 'f';
		} else if(action === 'action7Down'){
			actionFunc = 'action7DownFunc';
			actionParams = 'action7DownParams';
			htmlDisplay = 'g';
		} else if(action === 'action7Up'){
			actionFunc = 'action7UpFunc';
			actionParams = 'action7UpParams';
			htmlDisplay = 'g';
		} else if(action === 'action8Down'){
			actionFunc = 'action8DownFunc';
			actionParams = 'action8DownParams';
			htmlDisplay = 'h';
		} else if(action === 'action8Up'){
			actionFunc = 'action8UpFunc';
			actionParams = 'action8UpParams';
			htmlDisplay = 'h';
		} else {
			console.log('Failed to identify action')
			console.log(action)
			console.log(actionObj[action])
			return;
		}
		//Remove Control Text
		if(this.auxl.controlsInfo[action]){
			delete this.auxl.controlsInfo[action];
		}
		//Display Mobile HTML
		this.auxl.ToggleHTML(htmlDisplay, false);
		this[actionFunc] = false;
		this[actionParams] = false;
	}
},
//Main Click
mainClick: function (e){
	//Ignore document clicks, listen for cursors only.
	if(e.target && e.target.URL){
		return;
	}
	//console.log(e);
	//this.updateInput(e.detail.info);
	if(['clickDown','leftClickDown','rightClickDown'].includes(e.detail.click)){
//console.log('clickDown') 
		//this.Measure();
		//this.auxl.player.TriggerDown(e);
	} else if(['clickUp','leftClickUp','rightClickUp'].includes(e.detail.click)){
//console.log('clickUp')
		//this.auxl.player.TriggerUp(e);
		//this.Measure(true);
	} else {
//console.log('click')
	}
},
//Alt Click
altClick: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'altClickHit'){
		if(this.altDownFunc){
			if(this.altDownParams){
				this.altDownFunc(this.altDownParams);
			} else {
				this.altDownFunc();
			}
		}
	} else if(e.detail.action === 'altClickRelease'){
		if(this.altUpFunc){
			if(this.altUpParams){
				this.altUpFunc(this.altUpParams);
			} else {
				this.altUpFunc();
			}
		}
	}
},
//Directional Movement
direction: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	//Direction Movement Unlocked
	if(e.detail.direction === 'forwardHit'){
		this.locomotion.movingForward();
	} else if(e.detail.direction === 'forwardRelease'){
		this.locomotion.cancelForward();
	} else if(e.detail.direction === 'leftHit'){
		this.locomotion.movingLeft();
	} else if(e.detail.direction === 'leftRelease'){
		this.locomotion.cancelLeft();
	} else if(e.detail.direction === 'backwardHit'){
		this.locomotion.movingReverse();
	} else if(e.detail.direction === 'backwardRelease'){
		this.locomotion.cancelReverse();
	} else if(e.detail.direction === 'rightHit'){
		this.locomotion.movingRight();
	} else if(e.detail.direction === 'rightRelease'){
		this.locomotion.cancelRight();
	}
},
//Rotational Movement
rotation: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.rotation === 'forwardHit'){
		this.gimbal.movingForward();
	} else if(e.detail.rotation === 'forwardRelease'){
		this.gimbal.cancelForward();
	} else if(e.detail.rotation === 'leftHit'){
		this.gimbal.movingLeft();
	} else if(e.detail.rotation === 'leftRelease'){
		this.gimbal.cancelLeft();
	} else if(e.detail.rotation === 'backwardHit'){
		this.gimbal.movingReverse();
	} else if(e.detail.rotation === 'backwardRelease'){
		this.gimbal.cancelReverse();
	} else if(e.detail.rotation === 'rightHit'){
		this.gimbal.movingRight();
	} else if(e.detail.rotation === 'rightRelease'){
		this.gimbal.cancelRight();
	} 
},
//Action 1
action1: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action1Hit'){
		if(this.action1DownFunc){
			if(this.action1DownParams){
				this.action1DownFunc(this.action1DownParams);
			} else {
				this.action1DownFunc();
			}
		}
	} else if(e.detail.action === 'action1Release'){
		if(this.action1UpFunc){
			if(this.action1UpParams){
				this.action1UpFunc(this.action1UpParams);
			} else {
				this.action1UpFunc();
			}
		}
	}
},
//Action 2
action2: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action2Hit'){
		if(this.action2DownFunc){
			if(this.action2DownParams){
				this.action2DownFunc(this.action2DownParams);
			} else {
				this.action2DownFunc();
			}
		}
	} else if(e.detail.action === 'action2Release'){
		if(this.action2UpFunc){
			if(this.action2UpParams){
				this.action2UpFunc(this.action2UpParams);
			} else {
				this.action2UpFunc();
			}
		}
	}
},
//Action 3
action3: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action3Hit'){
		if(this.action3DownFunc){
			if(this.action3DownParams){
				this.action3DownFunc(this.action3DownParams);
			} else {
				this.action3DownFunc();
			}
		}
	} else if(e.detail.action === 'action3Release'){
		if(this.action3UpFunc){
			if(this.action3UpParams){
				this.action3UpFunc(this.action3UpParams);
			} else {
				this.action3UpFunc();
			}
		}
	}
},
//Action 4
action4: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action4Hit'){
		if(this.action4DownFunc){
			if(this.action4DownParams){
				this.action4DownFunc(this.action4DownParams);
			} else {
				this.action4DownFunc();
			}
		}
	} else if(e.detail.action === 'action4Release'){
		if(this.action4UpFunc){
			if(this.action4UpParams){
				this.action4UpFunc(this.action4UpParams);
			} else {
				this.action4UpFunc();
			}
		}
	}
},
//Action 5
action5: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action5Hit'){
		if(this.action5DownFunc){
			if(this.action5DownParams){
				this.action5DownFunc(this.action5DownParams);
			} else {
				this.action5DownFunc();
			}
		}
	} else if(e.detail.action === 'action5Release'){
		if(this.action5UpFunc){
			if(this.action5UpParams){
				this.action5UpFunc(this.action5UpParams);
			} else {
				this.action5UpFunc();
			}
		}
	}
},
//Action 6
action6: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action6Hit'){
		if(this.action6DownFunc){
			if(this.action6DownParams){
				this.action6DownFunc(this.action6DownParams);
			} else {
				this.action6DownFunc();
			}
		}
	} else if(e.detail.action === 'action6Release'){
		if(this.action6UpFunc){
			if(this.action6UpParams){
				this.action6UpFunc(this.action6UpParams);
			} else {
				this.action6UpFunc();
			}
		}
	}
},
//Action 7
action7: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action7Hit'){
		if(this.action7DownFunc){
			if(this.action7DownParams){
				this.action7DownFunc(this.action7DownParams);
			} else {
				this.action7DownFunc();
			}
		}
	} else if(e.detail.action === 'action7Release'){
		if(this.action7UpFunc){
			if(this.action7UpParams){
				this.action7UpFunc(this.action7UpParams);
			} else {
				this.action7UpFunc();
			}
		}
	}
},
//Action 8
action8: function (e){
	//console.log(e.detail);
	//this.updateInput(e.detail.info);
	if(e.detail.action === 'action8Hit'){
		if(this.action8DownFunc){
			if(this.action8DownParams){
				this.action8DownFunc(this.action8DownParams);
			} else {
				this.action8DownFunc();
			}
		}
	} else if(e.detail.action === 'action8Release'){
		if(this.action8UpFunc){
			if(this.action8UpParams){
				this.action8UpFunc(this.action8UpParams);
			} else {
				this.action8UpFunc();
			}
		}
	}
},
//Keyboard Controls
keyboardDown: function (e){
	//Key is being toggled
	if(Object.keys(this.toggled).includes(e.key)){
		return;
	} else {
		this.toggled[e.key] = true;
	}
	//Check Key
	if(this.controls.directionForwardKeys.includes(e.key)) {
		//Direction : Forward
		this.directionForwardDown();
	} else if(this.controls.directionLeftKeys.includes(e.key)){
		//Direction : Left
		this.directionLeftDown();
	} else if(this.controls.directionBackwardKeys.includes(e.key)){
		//Direction : Backward
		this.directionBackwardDown();
	} else if(this.controls.directionRightKeys.includes(e.key)){
		//Direction : Right
		this.directionRightDown();
	} else if(this.controls.rotationForwardKeys.includes(e.key)) {
		//Rotation : Forward
		this.rotationForwardDown();
	} else if(this.controls.rotationLeftKeys.includes(e.key)){
		//Rotation : Left
		this.rotationLeftDown();
	} else if(this.controls.rotationBackwardKeys.includes(e.key)){
		//Rotation : Backward
		this.rotationBackwardDown();
	} else if(this.controls.rotationRightKeys.includes(e.key)){
		//Rotation : Right
		this.rotationRightDown();
	} else if(this.controls.action1Keys.includes(e.key)){
		//Action 1
		this.action1Down();
	} else if(this.controls.action2Keys.includes(e.key)){
		//Action 2
		this.action2Down();
	} else if(this.controls.action3Keys.includes(e.key)){
		//Action 3
		this.action3Down();
	} else if(this.controls.action4Keys.includes(e.key)){
		//Action 4
		this.action4Down();
	} else if(this.controls.action5Keys.includes(e.key)){
		//Action 5
		this.action5Down();
	} else if(this.controls.action6Keys.includes(e.key)){
		//Action 6
		this.action6Down();
	} else if(this.controls.action7Keys.includes(e.key)){
		//Action 7
		this.action7Down();
	} else if(this.controls.action8Keys.includes(e.key)){
		//Action 8
		this.action8Down();
	}

},
keyboardUp: function (e){
	//No longer being toggled
	delete this.toggled[e.key];
	//Check Key
	if(this.controls.directionForwardKeys.includes(e.key)) {
		//Direction : Forward
		this.directionForwardUp();
	} else if(this.controls.directionLeftKeys.includes(e.key)){
		//Direction : Left
		this.directionLeftUp();
	} else if(this.controls.directionBackwardKeys.includes(e.key)){
		//Direction : Backward
		this.directionBackwardUp();
	} else if(this.controls.directionRightKeys.includes(e.key)){
		//Direction : Right
		this.directionRightUp();
	} else if(this.controls.rotationForwardKeys.includes(e.key)) {
		//Rotation : Forward
		this.rotationForwardUp();
	} else if(this.controls.rotationLeftKeys.includes(e.key)){
		//Rotation : Left
		this.rotationLeftUp();
	} else if(this.controls.rotationBackwardKeys.includes(e.key)){
		//Rotation : Backward
		this.rotationBackwardUp();
	} else if(this.controls.rotationRightKeys.includes(e.key)){
		//Rotation : Right
		this.rotationRightUp();
	} else if(this.controls.action1Keys.includes(e.key)){
		//Action 1
		this.action1Up();
	} else if(this.controls.action2Keys.includes(e.key)){
		//Action 2
		this.action2Up();
	} else if(this.controls.action3Keys.includes(e.key)){
		//Action 3
		this.action3Up();
	} else if(this.controls.action4Keys.includes(e.key)){
		//Action 4
		this.action4Up();
	} else if(this.controls.action5Keys.includes(e.key)){
		//Action 5
		this.action5Up();
	} else if(this.controls.action6Keys.includes(e.key)){
		//Action 6
		this.action6Up();
	} else if(this.controls.action7Keys.includes(e.key)){
		//Action 7
		this.action7Up();
	} else if(this.controls.action8Keys.includes(e.key)){
		//Action 8
		this.action8Up();
	}
},
//Joystick 1Locomotion - Not Working
questJoystick1Locomotion: function (e){
	//Check for deadzone
	let x = e.detail.x * -1;//reverse for correct direction
	let z = e.detail.y;//up/down converts to forward/backward
	let xDead = false;
	let zDead = false;
	if((x > 0 && x < this.deadzoneLoco) || (x < 0 && x > this.deadzoneLoco *-1)){
		//X in deadzone
		xDead = true;
	}
	if((z > 0 && z < this.deadzoneLoco) || (z < 0 && z > this.deadzoneLoco *-1)){
		//Z in deadzone
		zDead = true;
	}
	//if both in deadzone, cancel joystick movement
	if(xDead && zDead){
		this.locomotion.joystickCancel();
	} else {
		//Update current joystick input
		this.joystickPos = new THREE.Vector3(x,0,z);
		//Inform Locomotion component
		this.locomotion.joystick(this.joystickPos);
	}
},
//Joystick 4 Locomotion
questJoystick4Locomotion: function (e){
	//Update this.locomotion.func into this.directionEvent
	this.xNumLoco = e.detail.x;
	this.yNumLoco = e.detail.y;
	this.angleLoco = Math.atan2(this.xNumLoco,this.yNumLoco);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegLoco = radToDeg(this.angleLoco);

	if(this.yNumLoco < this.deadzoneLoco && this.yNumLoco > this.deadzoneLoco*-1 && this.xNumLoco > this.deadzoneLoco*-1 && this.xNumLoco < this.deadzoneLoco){
		this.locomotion.clearMovement();
		this.updateInput('Locomotion Clear');
	} else if(this.yNumLoco > this.deadzoneLoco || this.yNumLoco < this.deadzoneLoco*-1 || this.xNumLoco < this.deadzoneLoco*-1 || this.xNumLoco > this.deadzoneLoco) {
		if(this.angleDegLoco > -45 && this.angleDegLoco < 45){
			//Backward : -45 -> 45
			this.locomotion.clearMovement();
			this.locomotion.movingReverse();
			//this.updateInput('Backward');
		} else if(this.angleDegLoco > 45 && this.angleDegLoco < 135){
			//Right : 45 -> 135
			this.locomotion.clearMovement();
			this.locomotion.movingRight();
			//this.updateInput('Right');
		} else if(this.angleDegLoco > 135 || this.angleDegLoco < -135){
			//Forward : 135 -> 180 or -135 -> -180
			this.locomotion.clearMovement();
			this.locomotion.movingForward();
			//this.updateInput('Forward');
		} else if(this.angleDegLoco < -45 && this.angleDegLoco > -135){
			//Left : -45 -> -135
			this.locomotion.clearMovement();
			this.locomotion.movingLeft();
			//this.updateInput('Left');
		}
	} else {
		this.locomotion.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 8 Locomotion
questJoystick8Locomotion: function (e){
	//Update this.locomotion.func into this.directionEvent
	this.xNumLoco = e.detail.x;
	this.yNumLoco = e.detail.y;
	this.angleLoco = Math.atan2(this.xNumLoco,this.yNumLoco);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegLoco = radToDeg(this.angleLoco);

	if(this.yNumLoco < this.deadzoneLoco && this.yNumLoco > this.deadzoneLoco*-1 && this.xNumLoco > this.deadzoneLoco*-1 && this.xNumLoco < this.deadzoneLoco){
		this.locomotion.clearMovement();
		//this.updateInput('Locomotion Clear');
	} else if(this.yNumLoco > this.deadzoneLoco || this.yNumLoco < this.deadzoneLoco*-1 || this.xNumLoco < this.deadzoneLoco*-1 || this.xNumLoco > this.deadzoneLoco) {
		//Testing Joystick Tweak
		this.locomotion.clearMovement();
		if(this.angleDegLoco > -22.5 && this.angleDegLoco < 22.5){
			//Backward : -22.5 -> 22.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingReverse();
			//this.updateInput('Backward');
			this.directionBackwardDown()
		} else if(this.angleDegLoco > 22.5 && this.angleDegLoco < 67.5){
			//BackwardRight : 22.5 -> 67.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingReverse();
			//this.locomotion.movingRight();
			//this.updateInput('Backward Right');
			this.directionBackwardRightDown()
		} else if(this.angleDegLoco > 67.5 && this.angleDegLoco < 112.5){
			//Right : 67.5 -> 112.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingRight();
			//this.updateInput('Right');
			this.directionRightDown()
		} else if(this.angleDegLoco > 112.5 && this.angleDegLoco < 157.5){
			//ForwardRight : 112.5 -> 157.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingForward();
			//this.locomotion.movingRight();
			//this.updateInput('Forward Right');
			this.directionForwardRightDown()
		} else if(this.angleDegLoco > 157.5 || this.angleDegLoco < -157.5){
			//Forward : 157.5 -> 180 or -157.5 -> -180
			//this.locomotion.clearMovement();
			//this.locomotion.movingForward();
			//this.updateInput('Forward');
			this.directionForwardDown()
		} else if(this.angleDegLoco < -112.5 && this.angleDegLoco > -157.5){
			//ForwardLeft: -112.5 -> -157.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingForward();
			//this.locomotion.movingLeft();
			//this.updateInput('Forward Left');
			this.directionForwardLeftDown()
		} else if(this.angleDegLoco < -67.5 && this.angleDegLoco > -112.5){
			//Left : -67.5 -> -112.5
			//this.locomotion.clearMovement();
			//this.locomotion.movingLeft();
			//this.updateInput('Left');
			this.directionLeftDown()
		} else if(this.angleDegLoco < -22.5 && this.angleDegLoco > -67.5){
			//BackwardLeft: -22.5 -> -67.5 
			//this.locomotion.clearMovement();
			//this.locomotion.movingReverse();
			//this.locomotion.movingLeft();
			//this.updateInput('Backward Left');
			this.directionBackwardLeftDown()
		}
	} else {
		this.locomotion.clearMovement();
		//this.updateInput('Locomotion Clear');
	}
},
//Joystick 4 Other
questJoystick4Other: function (e){
	this.xNumOther = e.detail.x;
	this.yNumOther = e.detail.y;
	this.angleOther = Math.atan2(this.xNumOther,this.yNumOther);
	function radToDeg(rad) {
	  return rad / (Math.PI / 180);
	}
	this.angleDegOther = radToDeg(this.angleOther);

	if(this.yNumOther < this.deadzoneOther && this.yNumOther > this.deadzone*-1 && this.xNumOther > this.deadzoneOther*-1 && this.xNumOther < this.deadzoneOther){
		this.updateInput('Rotation|Duck Clear');
	} else if(this.yNumOther > this.deadzoneOther || this.yNumOther < this.deadzoneOther*-1 || this.xNumOther < this.deadzoneOther*-1 || this.xNumOther > this.deadzoneOther) {
		if(this.angleDegOther > -45 && this.angleDegOther < 45){
			//Backward : -45 -> 45
			//this.updateInput('Stand');
			this.action6Down();
		} else if(this.angleDegOther > 45 && this.angleDegOther < 135){
			//Right : 45 -> 135
			//this.updateInput('Rotate Right');
			//this.snapRightHit();
			this.action8Down();
		} else if(this.angleDegOther > 135 || this.angleDegOther < -135){
			//Forward : 135 -> 180 or -135 -> -180
			//this.updateInput('Duck');
			this.action5Down();
		} else if(this.angleDegOther < -45 && this.angleDegOther > -135){
			//Left : -45 -> -135
			//this.updateInput('Rotate Left');
			//this.snapLeftHit();
			this.action7Down();
		}
	} else {
		//this.updateInput('Rotation|Duck Clear');
	}
},
//Add Joystick Listeners
addJoystickEvents: function (){
	//Locomotion Type
	this.questJoystickLocomotionEvent = (e) => {
		if(this.auxl.joystickLoco === 1){
			this.questJoystick1Locomotion(e);
		} else if(this.auxl.joystickLoco === 4){
			this.questJoystick4Locomotion(e);
		} else if(this.auxl.joystickLoco === 8){
			this.questJoystick8Locomotion(e);
		}
	}
	//Joysticks
	if(['bothRight', 'bothLeftLoco'].includes(this.auxl.vrHand)){
		//Left Locomotion
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else if(['bothLeft', 'bothRightLoco'].includes(this.auxl.vrHand)){
		//Right Locomotion
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Left Other
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else {
		//Left Locomotion
		this.vrController1.addEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		this.vrController2.addEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	}
},
//Clear Joystick Listeners
clearJoystickEvents: function (){
	//Joysticks
	if(['bothRight', 'bothLeftLoco'].includes(this.auxl.vrHandPrevious)){
		//Left Locomotion
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else if(['bothLeft', 'bothRightLoco'].includes(this.auxl.vrHandPrevious)){
		//Right Locomotion
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Left Other
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	} else {
		//Left Locomotion
		this.vrController1.removeEventListener('thumbstickmoved', this.questJoystickLocomotionEvent);
		//Right Other
		this.vrController2.removeEventListener('thumbstickmoved', this.questJoystickOtherEvent);
	}
},
//Temp Blank
blank: function (e){
	console.log(e);
	//this.updateInput('Blank Button');
},
//Update
update: function () {
	//Clear previous joystick events
	if(this.auxl.vrHandPrevious){
		this.clearJoystickEvents();
		this.addJoystickEvents();
	}
},
//Remove
remove: function () {
	//Universal Events
	document.removeEventListener('mainClick', this.mainClickHit);
	document.removeEventListener('altClick', this.altClickHit);
	document.removeEventListener('direction', this.directionHit);
	document.removeEventListener('rotation', this.rotationHit);
	document.removeEventListener('action1', this.action1Hit);
	document.removeEventListener('action2', this.action2Hit);
	document.removeEventListener('action3', this.action3Hit);
	document.removeEventListener('action4', this.action4Hit);
	document.removeEventListener('action5', this.action5Hit);
	document.removeEventListener('action6', this.action6Hit);
	document.removeEventListener('action7', this.action7Hit);
	document.removeEventListener('action8', this.action8Hit);
	//Desktop
	//document.removeEventListener('click', this.mainClickE);
	document.removeEventListener('contextmenu', this.dispatchAlt);
	document.removeEventListener('keydown', this.keyboardDownHit);
	document.removeEventListener('keyup', this.keyboardUpHit);
	this.auxl.mouseController.GetEl().removeEventListener('mousedown', this.mainClickDown);
	this.auxl.mouseController.GetEl().removeEventListener('mouseup', this.mainClickUp);

	//VR Controllers
	this.vrController1.removeEventListener('triggerdown', this.questLeftMainClickDown);
	this.vrController1.removeEventListener('triggerup', this.questLeftMainClickUp);
	this.vrController1.removeEventListener('gripdown', this.questLeftAltClickDown);
	this.vrController1.removeEventListener('gripup', this.questLeftAltClickUp);
	this.vrController1.removeEventListener('xbuttondown', this.action1Down);
	this.vrController1.removeEventListener('xbuttonup', this.action1Up);
	this.vrController1.removeEventListener('ybuttondown', this.action2Down);
	this.vrController1.removeEventListener('ybuttonup', this.action2Up);
	this.vrController2.removeEventListener('triggerdown', this.questRightMainClickDown);
	this.vrController2.removeEventListener('triggerup', this.questRightMainClickUp);
	this.vrController2.removeEventListener('gripdown', this.questRightAltClickDown);
	this.vrController2.removeEventListener('gripup', this.questRightAltClickUp);
	this.vrController2.removeEventListener('abuttondown', this.action3Down);
	this.vrController2.removeEventListener('abuttonup', this.action3Up);
	this.vrController2.removeEventListener('bbuttondown', this.action4Down);
	this.vrController2.removeEventListener('bbuttonup', this.action4Up);
	this.clearJoystickEvents();
	//Mobile
	this.mobileUpLeft.removeEventListener('mousedown', this.directionForwardLeftDown);
	this.mobileUpLeft.removeEventListener('mouseup', this.directionForwardLeftUp);
	this.mobileUp.removeEventListener('mousedown', this.directionForwardDown);
	this.mobileUp.removeEventListener('mouseup', this.directionForwardUp);
	this.mobileUpRight.removeEventListener('mousedown', this.directionForwardRightDown);
	this.mobileUpRight.removeEventListener('mouseup', this.directionForwardRightUp);
	this.mobileLeft.removeEventListener('mousedown', this.directionLeftDown);
	this.mobileLeft.removeEventListener('mouseup', this.directionLeftUp);
	this.mobileCenter.removeEventListener('mousedown', this.blankHit);
	this.mobileCenter.removeEventListener('mouseup', this.blankHit);
	this.mobileRight.removeEventListener('mousedown', this.directionRightDown);
	this.mobileRight.removeEventListener('mouseup', this.directionRightUp);
	this.mobileDownLeft.removeEventListener('mousedown', this.directionBackwardLeftDown);
	this.mobileDownLeft.removeEventListener('mouseup', this.directionBackwardLeftUp);
	this.mobileDown.removeEventListener('mousedown', this.directionBackwardDown);
	this.mobileDown.removeEventListener('mouseup', this.directionBackwardUp);
	this.mobileDownRight.removeEventListener('mousedown', this.directionBackwardRightDown);
	this.mobileDownRight.removeEventListener('mouseup', this.directionBackwardRightUp);
	this.mobileSelect.removeEventListener('mousedown', this.blankHit);
	//this.mobileSelect.removeEventListener('mouseup', this.blankHit);
	this.mobileStart.removeEventListener('mousedown', this.blankHit);
	//this.mobileStart.removeEventListener('mouseup', this.blankHit);
	this.mobileA.removeEventListener('mousedown', this.action1Down);
	this.mobileA.removeEventListener('mouseup', this.action1Up);
	this.mobileB.removeEventListener('mousedown', this.action2Down);
	this.mobileB.removeEventListener('mouseup', this.action2Up);
	this.mobileC.removeEventListener('mousedown', this.action3Down);
	this.mobileC.removeEventListener('mouseup', this.action3Up);
	this.mobileD.removeEventListener('mousedown', this.action4Down);
	this.mobileD.removeEventListener('mouseup', this.action4Up);
	this.mobileE.removeEventListener('mousedown', this.action5Down);
	this.mobileE.removeEventListener('mouseup', this.action5Up);
	this.mobileF.removeEventListener('mousedown', this.action6Down);
	this.mobileF.removeEventListener('mouseup', this.action6Up);
	this.mobileG.removeEventListener('touchstart', this.action7Down);
	this.mobileG.removeEventListener('touchend', this.action7Up);
	this.mobileH.removeEventListener('touchstart', this.action8Down);
	this.mobileH.removeEventListener('touchend', this.action8Up);

	//this.mobileL.removeEventListener('touchstart', this.auxl.player.SnapLeft);
	//this.mobileL.removeEventListener('touchend', this.action7Up);
	//this.mobileR.removeEventListener('touchstart', this.auxl.player.SnapRight);
	//this.mobileR.removeEventListener('touchend', this.action8Up);
},
//tick: function (time, timeDelta) {},
events: {
	//Raycaster Events

	//Mouse Events
	['raycaster-intersected']: function (event) {
		//console.log({event: 'raycaster-intersected', data: event})
		//this.auxl[this.id].RaycastMethod(event);
	},
	['raycaster-intersected-cleared']: function (event) {
		//console.log({event: 'raycaster-intersected-cleared', data: event})
		//this.auxl[this.id].RaycastMethod(event);
	},
	['raycaster-intersection']: function (event) {
		//console.log({event: 'raycaster-intersection', data: event})
		//this.auxl[this.id].RaycastMethod(event);
	},
	['raycaster-intersection-cleared']: function (event) {
		//console.log({event: 'raycaster-intersection-cleared', data: event})
		//this.auxl[this.id].RaycastMethod(event);
	},
	['raycaster-closest-entity-changed']: function (event) {
		//console.log({event: 'raycaster-closest-entity-changed', data: event})
		//this.auxl[this.id].RaycastMethod(event);
	},

	//Mouse Events
	mouseenter: function (event) {
		//console.log({event: 'mouseenter', data: event})
		this.auxl[this.id].TriggerEnter(event);
	},
	mousedown: function (event) {
		//console.log({event: 'mousedown', data: event})
		this.Measure();
		this.auxl[this.id].TriggerDown(event);
	},
	mouseup: function (event) {
		//console.log('Link')
		//console.log(this.data.type)
		//console.log({event: 'mouseup', data: event})
		this.auxl[this.id].TriggerUp(event);
		this.Measure(true);
	},
	mouseleave: function (event) {
		//console.log({event: 'mouseleave', data: event})
		this.auxl[this.id].TriggerLeave(event);
	},
   //Collision Events
	collide: function (event) {
		//console.log({event: 'collision', data: event})
		//this.auxl[this.id].Collide(event);
	},
   //Other Events
	click: function (event) {
		//console.log({event: 'click', data: event})
		//this.auxl[this.id].Click(event);
	},
	altclick: function (event) {
		//console.log({event: 'altclick', data: event})
		//this.auxl[this.id].AltClick(event);
	},
//Key Events
//Key Down 
	keydown: function (event) {
		//console.log({event: 'keydown', data: event})
		//this.auxl[this.id].ButtonDown(event);
	},
//Key Up
	keyup: function (event) {
		//console.log({event: 'keyup', data: event})
		//this.auxl[this.id].ButtonUp(event);
	},
//Joystick
//Buttons
//Position
//Rotation

},
//Measure
Measure: function (toggle) {
	this.measure = !toggle;
},
//Tick
tick: function (time, timeDelta) {
	//Time Measurements
	if(this.measure){
		if(this.time > 1){
			this.time --;
//console.log(this.time)
		} else {
			this.time = 0;
			this.Measure(true);
		}
	} else {
		this.time = 1;
	}

	//AUXL ObjGen Ticker Function Link
	if(this.auxl[this.id] && this.auxl[this.id].Ticker){
		this.auxl[this.id].Ticker(this.time, this);
	}
},

});

//
//Export
export default auxcontroller;