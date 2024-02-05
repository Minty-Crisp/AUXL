//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Canvas
//
//drawtesting

//drawtesting
const drawtesting = AFRAME.registerComponent("drawtesting", {
	dependencies: ["draw"],
/*
	schema: {
		idname: {type: 'string', default: 'ui'},
		position: {type: 'vec3'},
	},
*/
init: function () {
	//this.newPosVec3 = new THREE.Vector3();
	console.log('drawtesting init')
},

update: function() {
	let draw = this.el.components.draw; //get access to the draw component
	let ctx = draw.ctx;
	let canvas = draw.canvas;
	//Bkgd
	ctx.fillStyle = this.data.bkgdColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "blue";
	ctx.fillRect(68, 68, 120, 120);
	//Font Color
	ctx.fillStyle = this.data.fontColor;
	ctx.font = "36px Georgia";
	//Text Attribute
	ctx.fillText(this.data.text, 80, 140);
	draw.render(); //tell it to update the texture
},

/*
more: function () {

},
tick: function (time, timeDelta) {
	this.more();
},
*/


});

//
//Export
export default drawtesting;