//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Powers


//Powers
const Powers = (auxl, powerData, one, core, layer) => {
//one is self aka UniRay.one aka parent to attach power to
//core or layer is the base look for the power used

//UniRay Support
//Ray Straight Line
//Ray Arc Line

//world gravity
//maxForce
//damping
//stiffness
//restLength
//friction
//restitution
//angular damping
//linear damping
//locking rotation
//locking position
//World Scale
//Constraints

	let power = {}
	power.on = atStart || false;
	power.one = one || false;
	power.core = core || false;
	power.layer = layer || false;
	power.type = powerData.type || 'select';
	power.to = powerData.to || 'playerRig';
	power.id = 'power' + core.id +  Math.floor(Math.random().toFixed(8)*10000000);
	power.amount = 0;
	power.pos = new THREE.Vector3(0,0,0);
	power.always = true;

	//Build
	const Build = () => {
		//Type
		if(power.type === 'lock'){
			//Lock
			power.connect = {
				name: 'auxpower__'+power.id,
				type: power.type,
				connectTo: power.to,
				maxForce: 1e6,
				collideConnected: power.collideConnected,
				always: power.always,
			};
		}
	}

	//Update
	const Update = (data) => {
		if(data){
			if(data.type){
				power.type = data.type;
			}
			if(data.restLength){
				power.restLength = data.restLength;
			}
			if(data.damping){
				power.damping = data.damping;
			}
			if(data.stiffness){
				power.stiffness = data.stiffness;
			}
			if(data.maxForce){
				power.maxForce = data.maxForce;
			}
/*
			for(let each in data){
				if(typeof each[each] !== "undefined"){
					power[each] = each[data];
				}
			}
*/
		}
		Build();

	}
	//Update Self
//console.log({event: 'power prebuild', base: power, update: powerData})
	Update(powerData);
//console.log({event: 'power updated', base: power})
	//Connect To
	const Connect = (data) => {
		Update(data);
//console.log({core: power, update: data})
		//power.core.core.components[power.connect.name] = power.connect;
		//power.core.ChangeSelf({property: power.connect.name, value: power.connect}, true);
	}
	//Disconnect Self
	const Disable = () => {
		delete power.core.core.components[power.connect.name];
//console.log({event: 'power disconnet', base: power})
	}
	//Disconnect Self
	const Disconnect = () => {
		power.core.RemoveComponent(power.connect.name);
//console.log({event: 'power disconnet', base: power})
	}

//Can detect collisions via physics

//but also can detect vision via dot product

//Raycast length using Radius

//Starting from local 0,0,0
//Build a sphere from self as center outward to point, test if any point is within radius. Radius aka distance from you to all edges
//Build a sphere from point as center back to self point

//Raycast Helper
	const RaycastHelper = (data) => {
//console.log({event: 'Testing', update: data})
		power.testing = new THREE.Vector3(0,0,0);
		power.testingTo = new THREE.Vector3(0,1,0);
		//power.testing.lerp ( v : Vector3, alpha : Float ) 
		let power = Math.random()+0.25;
		power.testing.lerp(power.testingTo,power); 
		//distance is now a 0.25-1 distance from itself on it's way towards  testingTo position
		power.testing = new THREE.Vector3(0,0,0);
		power.testingTo = new THREE.Vector3(0,1,0);
		power.testingHit = new THREE.Vector3(0,0,0);
		//power.testing.lerp ( v : Vector3, alpha : Float ) 
		let powerHit = Math.random()+0.25;
		power.testingHit.lerpVectors(power.testing,power.testingTo, powerHit); 
		//testingHit is now a 0.25-1 distance from testing on it's way towards  testingTo position

		//Dot Product
		power.testing2 = new THREE.Vector3(0,1,-1);
		power.testing2To = new THREE.Vector3(-1,-1,-1);
		power.testing2Hit = new THREE.Vector3(0,0,0);
		power.testing2Hit.dot(power.testing2To);
		//Dot product is 
		//given 2 points to form a line aka radius
		//returns radians of the reflected angle

		//Works well for
		//ai vision
		//One way triggers - figuring out the direction they are traveling in
		//Interactable object prompts


		//Cross Product
		//Right Hand Finger Point
		//Any 2 Vectors can solve for the 3rd with normalized vectors
		//Unlike the dot product, which returns a number, the result of a cross product is another vector
		//First, it is perpendicular to both a nd b. Phrasing this in terms of the dot product, we could say that a or b or C 0, which makes it perpendicular.

//left handed coord
//desiredRight = normalize(cross(worldUp, desiredForward))
//desiredUp = cross(desiredForward, desiredRight)


//cross product can be thought of as being a special case of a more general "wedge product". Wedges (and their complementary anti-wedges) turn out to be powerful tools for working with constructs of different dimensions, like finding intersections between lines and planes etc., in a really elegant way.

	}


	//Affect the parent avatar
	//Affect the linked avatar
	//link parent and linked

	//Template
/*
	const Template = (data) => {
//console.log({event: 'Template', update: data})
	}
*/

	//Activate
	const Activate = (data) => {
//console.log({event: 'Activate', update: data})
	}
	//Deactivate
	const Deactivate = (data) => {
//console.log({event: 'Deactivate', update: data})
	}
	//Start
	const Start = (data) => {
//console.log({event: 'Start', update: data})
	}
	//Continue
	const Continue = (data) => {
//console.log({event: 'Continue', update: data})
	}
	//Stop
	const Stop = (data) => {
//console.log({event: 'Stop', update: data})
	}
	//Click
	const Click = (data) => {
//console.log({event: 'Click', update: data})
	}
	//Toggle
	const Toggle = (data) => {
//console.log({event: 'Toggle', update: data})
	}
	//Menu
	const Menu = (data) => {
//console.log({event: 'Menu', update: data})
	}
	//Directional
	const Directional = (data) => {
//console.log({event: 'Directional', update: data})
	}
	//Rotational
	const Rotational = (data) => {
//console.log({event: 'Rotational', update: data})
	}
	//Running Tick
	const Running = () => {

	}

//Enable/Disable All
//Toggle body no clip
//Walk
//Skate
//Boost
//Dash
//Jump
//Float
//Gravity
//Gravity Axis
//Velocity
//Fly
//Parachute
//Glide
//Bounce
//Yoyo Rubber Link
//Yoyo Swing Link
//Yoyo Land Link
//Teleport
//Freeze
//Slow
//Hover Board
//Grab
//Drop
//Climb
//Climb Ledge
//Projectile Trigger Launch
//Projectile Pull Back Launch
//Projectile Pitch/Lob Launch
//Projectile Arc Launch

	//Connect Right Away if On
	if(power.on){
		Connect();
	}

	return {power, Update, Connect, Disconnect, Disable, Activate, Deactivate, Start, Continue, Stop, Click, Toggle, Menu, Directional, Rotational, Running};
}

export default Powers;

//

//Connect powers to UniRay via controls import instructions in scenario, zone, scene and dynamically.




//an objgen to create powers.

//each with their own unique components

//What unique things would need to be imported?

//Link Launch
//follow raycaster distance while charging further away, intersect with linkable object within current distance is to spawn there instead



//Physics Power




//
//Change World Scale Small(You are giant)/Normal/Large(You are small)
//
//Spawn Object with properties. Bouncy ball, sheild, core, layer, objgen, etc...
//Change other Object properties Goo, Glue, Rubber, Slip, Stick, Bounce, Scale

//Combo, rubber band into a raycasted object. The rubberband will fling the user and the object will be super bouncy and reverted right after the hit to launch the user.

/*

Link Magnet
player with maxForce, damping and stiffness variables
set restLength based on intersection distance
Straight Line Link (Raycaster click)
Arc Line Link (Shoot object and activate on collision)
- Link Magnet Launch (hook with spring)
- Link Magnet Swing (hook with pointToPoint)
- Link Magnet MagShot (shoot disabled magnet to hit objects)
- Link Magnet Grab (collect object)
- Link Magnet Arc Shot (shoot collected object in arc)
- Link Magnet Connect (hook multiple objects together with constraint)
- Link Magnet MagBouncer (shoot super bouncy disabled magnet to hit objects)
- Link Magnet Net (shoot disabled magnet that expands before returning)
- Link Magnet Bomb (shoot disabled magnet that expands huge quickly to hit a bunch of objects at once)
- Link Trampoline (Spawn a super bounce plane)
- Link Magnet Climb (hook with distance)
- Link Magnet Parachute (Float downward)
- Link Magnet Glider (Glide directionally)
- Link Magnet Boost (Impulse in raycaster direction)
- Link Magnet Grow (Grow object)
- Link Magnet Shrink (Shrink object)
- Link Magent Sheild (Block attacks)
- Link Magnet Board (Hoverboard dual controller)
- Link Slide (Grind a rail)
- Link Magnet Goo (Make material super slippery)
- Link Magnet Glue (Make material super sticky)
- Link Magnet Rubber (Make material super bouncy)
- Link Magnet Slip (Make body slippery)
- Link Magnet Stick (Make body sticky)
- Link Magnet Bounce (Make body bouncy)
- Link Magnet Build (spawn objects)
- Build walkable platform?
- Yo yo like abilities?
Click on object to spawn/move lure to point and create spring constraint
button to discount constraint
buttons to up/down constraint length

Fishing Rod
Pole, Reel & Magnetic Lure Hook
- Pole
- - Hit object
- - Poke/Stab object
- - Defend self from projectile
- Reel
- - Throw Lure
- - Shoot Lure
- - Release & Snap Reel in Lure line
- - Hook & Snap Reel in Lure line
- - Extend Lure line
- - Shrink Lure line
- Lure
- - Shoot or Throw at object to pickup, activate button, stun creature, etc...
- - Shoot or Throw Hook Lure
- - Spring player to hooked point
- - Drag player with moving hooked object
- - Reel In/Out to Ascend/Descend or Pull/Push from hooked point/object
- - Swing from hooked point
- - Pull hooked object towards
- - Push hooked object away
- - Attach object from inventory aka bait
- - With proper bait, catch/distract/lure creatures to a point
- - With proper bait, guide mount creature to move in a direction while riding them. It eats it on dismount
------------------
*/


//All Powers

//UniRay handles View & HMD updates

//UniRay component
//Triggers & Alt
//Select - normal raycaster that can click on any clickable object
//Alt - alternative raycaster select aka grip, right click, special tap

//Joystick, D-Pad, Keys, HTML :
//uses locomotion component
//2D Locomotion
//3D Locomotion
//Vehicle Locomotion

//Button On/Off & Button Toggle :
//Powers...
//Gravity
//Gravity Axis
//Rubberband ball
//Swing ball
//Slam ball
//Teleport
//Freeze
//Slow
//Jump
//Boost
//Fly
//Skate
//Bounce
//Gen Obj
//Gen Obj with force
//Gen Mount Vehicle

//Double Click within 1 second
//Double Click & Hold for 1 second
//Quick Hover Menu

//Triple Click within 1 second
//Triple Click & Hold for 1 second
//Systems Multi Menu

//
//Power Controls
//Button and Trigger Combination

//Button Action Types

//Hold to Use
//Buttons held to activate and released to toggle back. So mousedown on an action button to toggle the mode, continue to hold the button while using the mode, and release to toggle the mode back.

//Press to Use
//Buttons toggle switch modes.
//So mousedown on an action button to toggle the mode. mouseup on the button would be used for very special cases, but utlimately switches the main/alt triggers controls of.

//Activate Power
//Deactivate Power
//
//Start - mousedown
//Continue - duration until mouseup
//Stop - mouseup
//Click

//Depending on Action Type
//Toggle - click + short continue duration til Start again and held for a second or complete double click release.
//Menu - tripleclick, 3 short bursts of mousedown and a hold for a second or complete triple click release.

//Directional Movement - Locomotion Joystick, Key WASD/Arrows, D-Pad, HTML Direction Buttons

//Rotational Movement - Headset, Mouse, Gyro, Camera Control, Gimbal Body with Joystick, Key WASD/Arrows, D-Pad, HTML Direction Buttons