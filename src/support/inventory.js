//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Inventory
//
//clickaddinventory
//acceptobject

//
//Click to Add to Inventory
const clickaddinventory = AFRAME.registerComponent('clickaddinventory', {
dependencies: ['auxl'],
multiple: true,
schema: {
	item: {type: 'string', default: 'itemName'},
	once: {type: 'boolean', default: true},
	delay: {type: 'number', default: 0},
	despawn: {type: 'boolean', default: true},
	auxlObj: {type: 'string', default: 'auxlObj'},
	despawnMethod: {type: 'string', default: 'DespawnCore'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	this.item = this.data.item;
	this.once = this.data.once;
	this.delay = this.data.delay;
	this.give = true;
	this.despawn = this.data.despawn;
	this.auxlObj = this.data.auxlObj;
	this.despawnMethod = this.data.despawnMethod;
},
events: {
	click: function () {
		if(this.give){
			this.timeout = setTimeout(() => {
				this.auxl.comp.AddToInventory({item:this.auxl[this.item]});
				if(this.once){
					this.give = false;
				}
				if(this.despawn){
					this.auxl[this.auxlObj][this.despawnMethod]();
				}
				clearTimeout(this.timeout);
			}, this.delay);
		}
	}
},
});

//
//Use on Object
const acceptobject = AFRAME.registerComponent('acceptobject', {
dependencies: ['auxl'],
multiple: true,
schema: {
	item: {type: 'string', default: 'itemName'},
	uses: {type: 'number', default: 1},
	delay: {type: 'number', default: 0},
	despawn: {type: 'boolean', default: true},
	auxlObj: {type: 'string', default: 'auxlObj'},
	despawnMethod: {type: 'string', default: 'DespawnCore'},
	methodObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	this.item = this.data.item;
	this.uses = this.data.uses;
	this.delay = this.data.delay;
	this.inUse = false;
	this.despawn = this.data.despawn;
	this.auxlObj = this.data.auxlObj;
	this.despawnMethod = this.data.despawnMethod;
	this.methodObj = this.data.methodObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
},
run: function(){
	this.timeout = setTimeout(() => {
		if(this.component === 'null'){
			if(this.auxl[this.methodObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.methodObj][this.method]();
				} else {
					this.auxl[this.methodObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.methodObj)){
				this.domEnt = document.getElementById(this.methodObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
		if(this.auxl[this.item].persist === 'limited'){
			this.auxl[this.item].amount--;
			this.auxl.comp.UpdateInventoryMenu();
			this.auxl.player.Unequip();
		}
		this.uses--;
		if(this.uses <= 0 && this.despawn){
			this.auxl[this.auxlObj][this.despawnMethod]();
		}
		this.inUse = false;
		clearTimeout(this.timeout);
	}, this.delay);
},
events: {
	click: function () {
		if(this.auxl.player.layer.equipped){
			if(this.auxl.player.layer.equippedObject === this.item){
				if(this.inUse){}else{
					this.inUse = true;
					this.run();
				}
			}
		}
	}
},
});

//
//Export
export {clickaddinventory, acceptobject};