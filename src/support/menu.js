//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Menu
//
//Scroll

//
//Scroll
const scroll = AFRAME.registerComponent('scroll', {
dependencies: ['auxl', 'raycaster'],
schema: {
	type: {type: 'string', default: 'plane'},
	axis: {type: 'string', default: 'horizontal'},
	parent: {type: 'string', default: 'auxlObj'},
	length: {type: 'number', default: 1},
	options: {type: 'number', default: 5},
	elements: {type: 'array', default: []},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.scrollee = document.getElementById(this.data.parent);
	this.domEnt;
	this.elements = [];
	this.data.elements.forEach(el => this.elements.push(document.getElementById(el)));

	//Map needs to import dynamically
	//Scroll Map
	this.scrollMap = new Map();
	this.scrollMap.set(4, this.elements[7]);
	this.scrollMap.set(3, this.elements[6]);
	this.scrollMap.set(2, this.elements[5]);
	this.scrollMap.set(1, this.elements[4]);
	this.scrollMap.set(0, this.elements[3]);
	this.scrollMap.set(-1, this.elements[2]);
	this.scrollMap.set(-2, this.elements[1]);
	this.scrollMap.set(-3, this.elements[0]);

	//Throttled Scroll Function
	this.scrollThrottled = AFRAME.utils.throttle(this.scroll, 50, this);

	//Raycaster
	this.mouse = document.querySelector('#mouseController');
	this.mouseRay = this.mouse.components.raycaster;
	//Need VR Raycasters as well

	//Intersection Data
	this.intersection;
	this.previous = new THREE.Vector3(0,0,0);
	//this.previous.copy(this.scrollee.object3D.position);

	//Scroll Calc
	this.hold = false;
	this.distance = 0;
	this.compass = false;
	this.direction = false;
	this.location = 0;
	this.prevPos = 0;
	this.pos = 0;
	this.size = this.data.length / this.data.options;
	this.opacInit = true;
	this.opacityPlus = 0;
	this.plusFadeEl = false;
	//this.plusExtraEl = false;
	this.opacityMinus = 0;
	this.minusFadeEl = false;
	//this.minusExtraEl = false;
	this.extraEl = false;

	//Mousedown
    this.el.addEventListener('mousedown', () => {
		//console.log('mousedown');
		//Mouse held down to drag
		this.hold = true;
		//Init starting intersection point to avoid drag on first click
		this.previous.copy(this.mouseRay.getIntersection(this.el).point);
	});
	//Mouseup
    this.el.addEventListener('mouseup', () => {
		//console.log('mouseup');
		//Mouse released to stop drag
		this.hold = false;
		this.opacInit = true;
	});
	//Mouseleave
    this.el.addEventListener('mouseleave', () => {
		//console.log('mouseleave');
		//Mouse left to stop tracking pos
		this.hold = false;
		this.opacInit = true;
	});

	//Helper
	//Raycaster Intersected
    this.el.addEventListener('raycaster-intersected', function (evt) {
		//console.log('raycaster-intersected');
		//console.log(evt);
    });

},
//Calc which direction to move
axisDirection: function(previous, next){
	let axis;
	let directions = [];
	if(this.data.axis === 'vertical'){
		axis = 'y';
		directions = ['down','up'];
	} else if(this.data.axis === 'horizontal'){
		axis = 'x';
		directions = ['left','right'];
	}
	if(previous[axis] < next[axis]){
		return {axis, dir:directions[0]};
	} else {
		return {axis, dir:directions[1]};
	}
},
//Convert Number to 2 Decimals
twoDecimal: function(num){
	return Math.round(num*100)/100;
},
//Absolute single point to point distance
distanceTo: function(num1, num2){
	return Math.abs(Math.abs(num1) - Math.abs(num2));
},
getMapEl: function(map, location){
	function offMap(key){
		if(map.get(key) === undefined){
			return true;
		} else {
			return false;
		}
	}
	while(offMap(location)){
		if(location > 0){
			location -= this.elements.length;
		} else if(location < 0){
			location += this.elements.length;
		}
	}
	return map.get(location);
},
//Throttle Scrolling
scroll: function(){
	if(this.hold){
		//Get current intersection point
		this.intersection = this.mouseRay.getIntersection(this.el);
		//Ensure returned intersection is complete
		if(this.intersection === null || this.intersection === undefined){}else{
			//Ensure movement has happened
			if(this.intersection.point.equals(this.previous)){} else {
				//Get Up,Down,Left,Right direction
				this.compass = this.axisDirection(this.previous, this.intersection.point);
				//Calc absolute distance of difference and move in direction
				this.distance = this.distanceTo(this.previous[this.compass.axis], this.intersection.point[this.compass.axis]);
				this.pos = this.scrollee.object3D.position[this.compass.axis];
				//Move in direction type
				if(this.data.type === 'plane'){
					if(this.compass.dir === 'left' || this.compass.dir === 'down'){
						this.scrollee.object3D.position[this.compass.axis] += this.distance;
					} else if(this.compass.dir === 'right' || this.compass.dir === 'up'){
						this.scrollee.object3D.position[this.compass.axis] -= this.distance;
					}
//2 Decimal Tracking
this.pos = this.twoDecimal(this.pos);

//Menu Swapping
let prev;
let next;

if(this.location > 0){
	prev = ((this.location * this.size) + this.size)*-1;
	next = prev + this.size;
} else if(this.location < 0){
	next = ((this.location * this.size) - this.size)*-1;
	prev = next - this.size;
} else {
	prev = (this.location * this.size) - this.size;
	next = (this.location * this.size) + this.size;
}
prev = this.twoDecimal(prev);
next = this.twoDecimal(next);

//Changing from 1 direction to another breaks it initially, but after a few more scrolls in the same direction it fixes itself.
//Don't swap elements until checkpoint, need to make 0 as a checkpoint
//When exact el placement is working perfectly, convert using this.data.options and this.elements.length
//What about starting off center, like 0.02 to detect direction right away

if(this.pos > next){
	this.location--;
	this.opacityPlus = 1;
	this.opacityMinus = 0;
	this.direction = 'plus';
	this.opacInit = false;
	//swap extra to plus position
	this.plusFadeEl = this.getMapEl(this.scrollMap, this.location+2);
	this.minusFadeEl = this.getMapEl(this.scrollMap, this.location-3);
	this.extraEl = this.getMapEl(this.scrollMap, this.location+4);
	this.extraEl.object3D.position[this.compass.axis] = (this.location - this.elements.length/2) * this.size;
console.log('Shift Plus');
console.log(this.pos);
console.log(this.location);
} else if(this.pos < prev){
	this.location++;
	this.opacityPlus = 0;
	this.opacityMinus = 1;
	this.direction = 'minus';
	this.opacInit = false;
	//swap extra to minus position
	this.plusFadeEl = this.getMapEl(this.scrollMap, this.location+3);
	this.minusFadeEl = this.getMapEl(this.scrollMap, this.location-2);
	this.extraEl = this.getMapEl(this.scrollMap, this.location-4);
	this.extraEl.object3D.position[this.compass.axis] = (this.location + this.elements.length/2) * this.size;

console.log('Shift Minus');
console.log(this.pos);
console.log(this.location);
}

//Option Opacity
let opacTotal = 0;
if(this.pos > this.prevPos){
	if(this.opacInit){
//This is allowed each time the mouse is cleared
		if(this.direction === 'minus' || !this.direction){
			this.opacityPlus = 1;
			this.opacityMinus = 0;
			this.direction = 'plus';
			//ensure extra is at plus position
			this.plusFadeEl = this.getMapEl(this.scrollMap, this.location+2);
			this.minusFadeEl = this.getMapEl(this.scrollMap, this.location-3);
			this.extraEl = this.getMapEl(this.scrollMap, this.location+4);
			this.extraEl.object3D.position[this.compass.axis] = (this.location - this.elements.length/2) * this.size;
console.log('swap')
		}
	}
	opacTotal = this.twoDecimal((this.pos - this.prevPos)*this.data.options);
	this.opacityPlus = this.twoDecimal(this.opacityPlus - opacTotal);
	this.opacityMinus = this.twoDecimal(this.opacityMinus + opacTotal);
console.log('Plus');
} else if(this.pos < this.prevPos){
	if(this.opacInit){
//This is allowed each time the mouse is cleared
		if(this.direction === 'plus' || !this.direction){
			this.opacityPlus = 0;
			this.opacityMinus = 1;
			this.direction = 'minus';
			//ensure extra is at minus position
			this.plusFadeEl = this.getMapEl(this.scrollMap, this.location+3);
			this.minusFadeEl = this.getMapEl(this.scrollMap, this.location-2);
			this.extraEl = this.getMapEl(this.scrollMap, this.location-4);
			this.extraEl.object3D.position[this.compass.axis] = (this.location + this.elements.length/2) * this.size;
console.log('swap')
		}
	}
	opacTotal = this.twoDecimal((this.prevPos - this.pos)*this.data.options);
	this.opacityPlus = this.twoDecimal(this.opacityPlus + opacTotal);
	this.opacityMinus = this.twoDecimal(this.opacityMinus - opacTotal);
console.log('Minus');
}
this.prevPos = this.pos;

if(this.plusFadeEl && this.minusFadeEl){
	this.plusFadeEl.setAttribute('material',{opacity: this.opacityPlus});
	this.minusFadeEl.setAttribute('material',{opacity: this.opacityMinus});
}

console.log({
previous:prev, next, location: this.location,
plusFadeEl: this.plusFadeEl,
minusFadeEl: this.minusFadeEl,
extraEl: this.extraEl,
})

//Changing from 1 direction to another breaks it

/*
0
0.8 : 4
0.6 : 3
0.4 : 2 *
0.2 : 1 *
0 : 0 *
-0.2 : -1 *
-0.4 : -2 *
-0.6 : -3

1 Minus (Left/Down)
1 : 5
0.8 : 4
0.6 : 3 *
0.4 : 2 *
0.2 : 1 *
0 : 0 *
-0.2 : -1 *
-0.4 : -2

2 Minus (Left/Down)
1.2 : 6
1 : 5
0.8 : 4 *
0.6 : 3 *
0.4 : 2 *
0.2 : 1 *
0 : 0 *
-0.2 : -1


-1 Plus (Right/Up)
0.6 : 3
0.4 : 2
0.2 : 1 *
0 : 0 *
-0.2 : -1 *
-0.4 : -2 *
-0.6 : -3 *
- 0.8 : -4

-2 Plus (Right/Up)
0.4 : 2
0.2 : 1
0 : 0 *
-0.2 : -1 *
-0.4 : -2 *
-0.6 : -3 *
- 0.8 : -4 *
-1 : -5

*/
				} else if(this.data.type === 'cylinder'){
					if(this.compass === 'left'){
						this.scrollee.object3D.rotation.y += this.distance;
					} else if(this.compass === 'right'){
						this.scrollee.object3D.rotation.y -= this.distance;
					} else if(this.compass === 'up'){
						this.scrollee.object3D.rotation.x += this.distance;
					} else if(this.compass === 'down'){
						this.scrollee.object3D.rotation.x -= this.distance;
					}
				}
				//Update current intersection to previous
				this.previous.copy(this.intersection.point);
			}
		}
	}
},
tick: function (time, timeDelta) {
	this.scrollThrottled();
},
});


//
//Export
export {scroll};