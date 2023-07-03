//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Misc
//
//attach
//lookAtXYZ
//stare
//hovertext

//
//Sync Pos
const syncPos = AFRAME.registerComponent('sync-pos', {
	dependencies: ['auxl'],
    schema: {
        idname: {type: 'string', default: 'ui'},
        position: {type: 'vec3'},
    },
    init: function () {
        //Thing To Attach
        this.attachee = document.getElementById(this.data.idname);
        this.offset = new THREE.Vector3();
		if(this.data.position){
			this.offset.copy(this.data.position);
		} else {
        	this.offset.copy(this.attachee.object3D.position);
		}
        this.newPosVec3 = new THREE.Vector3();
    },
    attached: function () {
        //Clone current the entity this component is attached to's position
        this.newPosVec3.copy(this.el.object3D.position);
        //Offsets
        this.newPosVec3.x += this.offset.x;
        this.newPosVec3.y += this.offset.y;
        this.newPosVec3.z += this.offset.z;
        //Set position for UI at 3js level for speed!
        this.attachee.object3D.position.copy(this.newPosVec3);
    },
    tick: function (time, timeDelta) {
        this.attached();
    },
});

//
//Look At XYZ
const lookAtXYZ = AFRAME.registerComponent('look-at-xyz', {
	dependencies: ['auxl'],
	schema: {
		match: {type: 'string', default:'camera'},
		x: {type: 'boolean', default: false},
		y: {type: 'boolean', default: false},
		z: {type: 'boolean', default: false},
	},
    init: function () {
    },
    update: function () {
		this.rotation = this.el.object3D.rotation;
		this.matchView = document.getElementById(this.data.match);
		this.matchRotation = new THREE.Euler();
		this.lookAtXYZThrottled = AFRAME.utils.throttle(this.lookAtXYZ, 30, this);
    },
    lookAtXYZ: function () {
		this.matchRotation.copy(this.matchView.object3D.rotation);
		//Sync X,Y and/or Z
		if(this.data.x){
			this.rotation.x = this.matchRotation.x;
		}
		if(this.data.y){
			this.rotation.y = this.matchRotation.y;
		}
		if(this.data.z){
			this.rotation.z = this.matchRotation.z;
		}
		this.el.object3D.rotation.copy(this.rotation);
    },
    tick: function (time, timeDelta) {
        this.lookAtXYZThrottled();
    },
});

//
//Stare
const stare = AFRAME.registerComponent('stare', {
	dependencies: ['auxl'],
	schema: {
		id: {type: 'string', default:'playerRig'},
		twist: {type: 'boolean', default: false},
	},
    init: function () {
    },
    update: function () {
		this.idView = document.getElementById(this.data.id);
		this.idPosition = new THREE.Vector3();
		this.stareThrottled = AFRAME.utils.throttle(this.stare, 30, this);
    },
    stare: function () {
		//Get Position of Stare Object
		this.idPosition.copy(this.idView.object3D.position);
		//If player, add current camera height
		if(this.data.id === 'playerRig'){
			this.idPosition.y += document.getElementById('camera').object3D.position.y;
		}
		//Twist will not look up or down
		if(this.data.twist){
			this.idPosition.y = this.el.object3D.position.y;
		}
		this.el.object3D.lookAt(this.idPosition);
    },
    tick: function (time, timeDelta) {
        this.stareThrottled();
    },
});

//
//Display Text Description on Hover
const hovertext = AFRAME.registerComponent('hovertext', {
	dependencies: ['auxl'],
schema: {
	value: {type: 'string', default: 'TEXT'},
	hover: {type: 'string', default: 'front'},
	offset: {type: 'number', default: 1},
	twist: {type: 'bool', default: true},
	size: {type: 'number', default: 20},
},
    init: function () {
		this.auxl = document.querySelector('a-scene').systems.auxl;
		this.value = this.data.value;
		this.hover = this.data.hover;
		this.offset = this.data.offset;
		this.twist = this.data.twist;
		this.size = this.data.size;
		this.hoverSpawned = false;

		this.position = new THREE.Vector3(0,0,0);

		if(this.hover === 'top'){
			this.position = new THREE.Vector3(0,this.offset,0);
		} else if(this.hover === 'front'){
			this.position = new THREE.Vector3(0,0,this.offset);
		}

		//
		//Hover Text Template
		this.hoverTextParentData = {
		data:'hoverTextParentData',
		id:'hoverTextParent',
		sources:false,
		text: false,
		geometry: false,
		material: false,
		position: new THREE.Vector3(0,0,0),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['nullParent','a-ent'],
		components: {
			//['look-at-xyz']:{match: 'camera', y:this.twist,},
			['stare']:{id: 'playerRig', twist: this.twist},
		},
		};
		this.hoverTextParent = this.auxl.Core(this.hoverTextParentData);
		this.hoverTextData = {
		data:'hoverTextData',
		id:'hoverText',
		text: {value:this.value, wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center', width: 2},
		position: this.position,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
		};
		this.hoverText = this.auxl.Core(this.hoverTextData);
		this.hoverTextAllData = {
			parent: {core: this.hoverTextParent},
			child0: {core: this.hoverText},
		}
		this.hoverTextAll = this.auxl.Layer('hoverTextAll', this.hoverTextAllData);

    },
events: {
	mouseenter: function (evt) {
		if(this.hoverSpawned){}else{
			this.hoverSpawned = true;
			this.hoverTextAll.SpawnLayer(this.el);
		}
	},
	mouseleave: function (evt) {
		if(this.hoverSpawned){
			this.hoverTextAll.DespawnLayer();
			this.hoverSpawned = false;
		}
	},
},
    update: function () {

    },
    remove: function () {
		if(this.hoverSpawned){}else{
			this.hoverTextAll.DespawnLayer();
			this.hoverSpawned = false;
		}
    },

});

//
//Export
export {syncPos, lookAtXYZ, stare, hovertext};