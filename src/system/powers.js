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

//Migrate Player Powers

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