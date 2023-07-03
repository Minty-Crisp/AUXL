//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Run
//Event Listener Components to run Auxl.Object.Methods()
//
//clickfunc
//clickrun
//fusingrun
//mousedownrun
//mouseenterrun
//mouseleaverun
//mouseuprun
//menurun
//hoverrun
//onspawnrun
//ondespawnrun
//oneventrun
//ondelayrun
//onintervalrun

//
//Attach to run Object's .Click() method on click
//Legacy | Will be replaced by clickrun
const clickfunc = AFRAME.registerComponent('clickfunc', {
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
//Attach to run specified method from Object on click event or method from component if in scene
const clickrun = AFRAME.registerComponent('clickrun', {
dependencies: ['auxl'],
multiple: true,
//multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	click: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method]();
				} else if(this.data.params === 'target'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//Run AUXL Function on Click
const clickrunfunc = AFRAME.registerComponent('clickrunfunc', {
dependencies: ['auxl'],
multiple: true,
//multiple: true,
schema: {
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	click: function (evt) {
		if(this.data.params === 'null'){
			this.auxl[this.data.method](evt.target);
		} else {
			this.auxl[this.data.method](this.data.params);
		}
	}
},
});

//
//Attach to run specified method from Object on fusing event
const fusingrun = AFRAME.registerComponent('fusingrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	fusing: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//Attach to run specified method from Object on mousedown event
const mousedownrun = AFRAME.registerComponent('mousedownrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mousedown: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//Attach to run specified method from Object on mouseenter event
const mouseenterrun = AFRAME.registerComponent('mouseenterrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseenter: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//Attach to run specified method from Object on mouseleave event
const mouseleaverun = AFRAME.registerComponent('mouseleaverun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseleave: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//Attach to run specified method from Object on mouseup event
const mouseuprun = AFRAME.registerComponent('mouseuprun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'methodName'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
},
events: {
	mouseup: function (evt) {
		if(this.data.component === 'null'){
			if(this.auxl[this.data.cursorObj][this.data.method]){
				if(this.data.params === 'null'){
					this.auxl[this.data.cursorObj][this.data.method](evt.target);
				} else {
					this.auxl[this.data.cursorObj][this.data.method](this.data.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.data.cursorObj)){
				this.domEnt = document.getElementById(this.data.cursorObj);
				if(this.data.params === 'null'){
					this.domEnt.components[this.data.component][this.data.method](evt.target);
				} else {
					this.domEnt.components[this.data.component][this.data.method](this.data.params);
				}
			}
		}
	}
},
});

//
//MultiMenu Suppot
//Attach to run specified method from Object on click event
const menurun = AFRAME.registerComponent('menurun', {
dependencies: ['auxl'],
//multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
},
events: {
	click: function (evt) {
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method](evt.target);
			} else {
				this.auxl[this.data.cursorObj][this.data.method](this.data.params);
			}
		}
	}
},
});

//
//HoverMenu Support
//Attach to run specified method from Object on mouseenter event
const hoverrun = AFRAME.registerComponent('hoverrun', {
dependencies: ['auxl'],
schema: {
	attached: {type: 'string', default: 'none'},
	menu: {type: 'string', default: 'menuName'},
	action: {type: 'string', default: 'actionName'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.attached = this.data.attached;
	this.menu = this.data.menu;
	this.action = this.data.action;
},
events: {
	mouseenter: function (evt) {
		//Active
		if(this.attached !== 'none'){
			this.auxl[this.attached][this.menu].hoverMenu.active = this.action;
		} else {
			this.auxl[this.menu].hoverMenu.active = this.action;
		}
	},
	mouseleave: function (evt) {
		//No longer active
		if(this.attached !== 'none'){
			this.auxl[this.attached][this.menu].hoverMenu.active = false;
		} else {
			this.auxl[this.menu].hoverMenu.active = false;
		}
	}
},
});

//
//On Spawn Run
//Run AUXL object method
const onspawnrun = AFRAME.registerComponent('onspawnrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	if(this.data.component === 'null'){
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method]();
			} else {
				this.auxl[this.data.cursorObj][this.data.method](this.data.params);
			}
		}
	} else {
		//object is a dom entity and the component is attached to that object and the func is in that component
		if(document.getElementById(this.data.cursorObj)){
			this.domEnt = document.getElementById(this.data.cursorObj);
			if(this.data.params === 'null'){
				this.domEnt.components[this.data.component][this.data.method]();
			} else {
				this.domEnt.components[this.data.component][this.data.method](this.data.params);
			}
		}
	}
},
});

//
//On Spawn Run Func
//Run AUXL Function
const onspawnfunc = AFRAME.registerComponent('onspawnfunc', {
dependencies: ['auxl'],
multiple: true,
schema: {
	auxlFunc: {type: 'string', default: 'auxlFunc'},
	params: {type: 'string', default: 'null'},
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	if(this.data.params === 'null'){
		this.auxl[this.data.auxlFunc]();
	} else {
		this.auxl[this.data.auxlFunc](this.data.params);
	}
},
});

//
//On Despawn Run
//Run AUXL object method
const ondespawnrun = AFRAME.registerComponent('ondespawnrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
},
remove: function () {
	if(this.data.component === 'null'){
		if(this.auxl[this.data.cursorObj][this.data.method]){
			if(this.data.params === 'null'){
				this.auxl[this.data.cursorObj][this.data.method]();
			} else {
				this.auxl[this.data.cursorObj][this.data.method](this.data.params);
			}
		}
	} else {
		//object is a dom entity and the component is attached to that object and the func is in that component
		if(document.getElementById(this.data.cursorObj)){
			this.domEnt = document.getElementById(this.data.cursorObj);
			if(this.data.params === 'null'){
				this.domEnt.components[this.data.component][this.data.method]();
			} else {
				this.domEnt.components[this.data.component][this.data.method](this.data.params);
			}
		}
	}
},
});

//
//On Event Run
//On Event fired, run method
const oneventrun = AFRAME.registerComponent('oneventrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	event: {type: 'string', default: 'eventName'},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'},
	once: {type: 'boolean', default: false}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.event = this.data.event;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	this.once = this.data.once;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Add Event Listener
	this.el.addEventListener(this.event,this.run,{once: this.once });
},
remove: function () {
	//Remove Event Listener
	this.el.removeEventListener(this.event,this.run);
},
});

//
//On Delay Run
//On Delay, run method
const ondelayrun = AFRAME.registerComponent('ondelayrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	delay: {type: 'number', default: 1000},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.delay = this.data.delay;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Set Timeout
	this.timeout = setTimeout(() => {
		this.run();
		clearTimeout(this.timeout);
	}, this.delay);

},
remove: function () {
	//Clear Timeout
	clearTimeout(this.timeout);
},
});

//
//On Interval Run
//On Interval, run method
const onintervalrun = AFRAME.registerComponent('onintervalrun', {
dependencies: ['auxl'],
multiple: true,
schema: {
	interval: {type: 'number', default: 1000},
	loop: {type: 'number', default: 0},
	end: {type: 'string', default: 'null'},
	cursorObj: {type: 'string', default: 'auxlObj'},
	component: {type: 'string', default: 'null'},
	method: {type: 'string', default: 'Click'},
	params: {type: 'string', default: 'null'}
},
init: function () {
	//AUXL System Connection
	this.auxl = document.querySelector('a-scene').systems.auxl;
	this.domEnt;
	//console.log(this.attrName)
	//console.log(this.id)
	//console.log(this.data)
},
update: function () {
	//Prep
	this.interval = this.data.interval;
	this.loop = this.data.loop;
	if(this.loop === 0){
		this.loop = false;
	}
	this.end = this.data.end;
	this.checkEnd = false;
	if(this.end === 'null'){} else {
		this.checkEnd = true;
	}
	this.running = true;
	this.cursorObj = this.data.cursorObj;
	this.component = this.data.component;
	this.method = this.data.method;
	this.params = this.data.params;
	//Run Function
	this.run = () => {
		if(this.component === 'null'){
			if(this.auxl[this.cursorObj][this.method]){
				if(this.params === 'null'){
					this.auxl[this.cursorObj][this.method]();
				} else {
					this.auxl[this.cursorObj][this.method](this.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(this.cursorObj)){
				this.domEnt = document.getElementById(this.cursorObj);
				if(this.params === 'null'){
					this.domEnt.components[this.component][this.method]();
				} else {
					this.domEnt.components[this.component][this.method](this.params);
				}
			}
		}
	}
	//Set Timeout
	this.repeat = setInterval(() => {
		//Flag End Condition
		if(this.checkEnd){
			if(this.auxl[this.cursorObj].GetFlag(this.end) === true){
				this.running = false;
				clearInterval(this.repeat);
			}
		}
		if(this.running){
			this.run();
		}
		//Loop End Condition
		if(this.loop){
			this.loop--;
			if(this.loop <= 0){
				this.running = false;
				clearInterval(this.repeat);
			}
		}
	}, this.interval);

},
remove: function () {
	//Clear Timeout
	clearInterval(this.repeat);
},
});

//
//Export
export {clickfunc, clickrun, clickrunfunc, fusingrun, mousedownrun, mouseenterrun, mouseleaverun, mouseuprun, menurun, hoverrun, onspawnrun, onspawnfunc, ondespawnrun, oneventrun, ondelayrun, onintervalrun};