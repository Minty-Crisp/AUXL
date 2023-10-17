//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Doors
//
//doorway
//doorwayTrigger

//
//doorway
//zone is the zone that the door is in
//to is the key name connect# in the map data for the scene the door is in
const doorway = AFRAME.registerComponent('doorway', {
	dependencies: ['auxl'],
schema: {
	zone: {type: 'string', default: 'zone0'},
	to: {type: 'string', default: 'connect0'},
    posTo: {type: 'boolean', default: false},
    pos: {type: 'vec3'},
    twistTo: {type: 'boolean', default: false},
	twist: {type: 'number', default: 0},



	delay: {type: 'number', default: 0},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.zone = this.data.zone;
	this.to = this.data.to;
	this.delay = this.data.delay;
	this.pos = new THREE.Vector3(0,0,0);
	if(this.data.pos.x){
		this.pos.x = this.data.pos.x;
	}
	if(this.data.pos.y){
		this.pos.y = this.data.pos.y;
	}
	if(this.data.pos.z){
		this.pos.z = this.data.pos.z;
	}
	this.twist = this.data.twist;
},
posTwist: function(){
	this.moveTimeout = setTimeout(() => {
		if(this.data.posTo){
			this.auxl.player.UpdatePlayerPosition(this.pos);
		}
		if(this.data.twistTo){
			this.auxl.player.TwistTo(this.twist);
		}
		clearTimeout(this.moveTimeout);
	}, 450);
},
swap: function(){
	this.timeout = setTimeout(() => {
		this.auxl[this.zone].Move(this.to);
		this.posTwist();
		clearTimeout(this.timeout);
	}, this.delay);
},
events: {
	click: function (evt) {
		this.swap();
	}
},
remove: function() {
	clearTimeout(this.timeout);
},
});

//Trigger
const doorwayTrigger = AFRAME.registerComponent('doorway-trigger', {
	dependencies: ['auxl'],
schema: {
	zone: {type: 'string', default: 'zone0'},
	to: {type: 'string', default: 'connect0'},
	delay: {type: 'number', default: 0},
},
init: function () {
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.zone = this.data.zone;
	this.to = this.data.to;
	this.delay = this.data.delay;
},
swap: function(){
	this.timeout = setTimeout(() => {
		this.auxl[this.zone].Move(this.to);
		clearTimeout(this.timeout);
	}, this.delay);
},
remove: function() {
	clearTimeout(this.timeout);
},
});

//
//Export
export {doorway, doorwayTrigger};