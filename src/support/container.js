//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Container

//
//Comtainer
//Define an XYZ Coordinate to fit within a CSS synced grid
//TODO
const container = AFRAME.registerComponent('container', {
dependencies: ['auxl'],
schema: {
	clickObj: {type: 'string', default: 'auxlObj'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	click: function (evt) {
		this.auxl[this.data.clickObj].Click(evt.target);
	}
},
});

//
//Export
export {container};