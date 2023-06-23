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
//Click
const doorway = AFRAME.registerComponent('doorway', {
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