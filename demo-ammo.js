//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - ammo

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('ammo-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Rag Doll
//lock, fixed, spring, slider, hinge, coneTwist, pointToPoint

//Parent Rig
auxl.ragdollRigData = {
data:'ragdollRigData',
id:'ragdollRig',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.025, height: 0.05, depth: 0.025},
material: {shader: "standard", color: "#d80e92", opacity: 1, metalness: 0, roughness: 1, emissive: "#d80e92", emissiveIntensity: 0.2, side: 'front',},
position: new THREE.Vector3(2,0,2),
rotation: new THREE.Vector3(0,90,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	move:{property: 'object3D.position.x', from: 2, to: 3, dur: 6000, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent', 'clickable', 'ragdoll'],
components: {
	['ammo-body']:{type: 'kinematic',},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__torso']: {
		type: 'lock', 
		target: '#dollTorso', 
	},
},
};
auxl.ragdollRig = auxl.Core(auxl.ragdollRigData);

//Doll Pelvis
auxl.dollPelvisData = {
data:'dollPelvisData',
id:'dollPelvis',
sources:false,
text: false,
geometry: {primitive: 'box', width: 0.2, height: 0.1, depth: 0.1},
material: {shader: "standard", color: "#84897f", opacity: 1, metalness: 0, roughness: 1, emissive: "#84897f", emissiveIntensity: 0.2, side: 'front',},
position: new THREE.Vector3(0,0.975,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent', 'clickable', 'target'],
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__torso']: {
		type: 'coneTwist', 
		target: '#dollTorso', 
		pivot: '0 0.1 0', 
		targetPivot: '0 -0.3 0', 
	},
	['ammo-constraint__leftleg']: {
		type: 'coneTwist', 
		target: '#dollLeftUpperLeg', 
		pivot: '-0.05 -0.1 0', 
		targetPivot: '0 0.2 0', 
	},
	['ammo-constraint__rightleg']: {
		type: 'coneTwist', 
		target: '#dollRightUpperLeg', 
		pivot: '0.5 -0.1 0', 
		targetPivot: '0 0.2 0', 
	},
},
};
auxl.dollPelvis = auxl.Core(auxl.dollPelvisData);


//Doll Head
auxl.dollHeadData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollHead', geometry: {primitive: 'dodecahedron', radius: 0.1, detail: 0}, position: new THREE.Vector3(0,1.6,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, linearSleepingThreshold : 0.4, angularSleepingThreshold : 0.5, },
	['ammo-shape']:{type: 'box',},
},
}, true);
auxl.dollHead = auxl.Core(auxl.dollHeadData);

//Doll Torso
auxl.dollTorsoData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollTorso', geometry: {primitive: 'box', width: 0.2, height: 0.4, depth: 0.1}, position: new THREE.Vector3(0,1.25,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint']: {
		type: 'fixed', 
		target: '#dollHead', 
	},
},
}, true);
auxl.dollTorso = auxl.Core(auxl.dollTorsoData);


//Doll Left Upper Leg
auxl.dollLeftUpperLegData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollLeftUpperLeg', geometry: {primitive: 'box', width: 0.07, height: 0.3, depth: 0.1}, position: new THREE.Vector3(-0.05,0.75,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__leftleg']: {
		type: 'coneTwist', 
		target: '#dollLeftLowerLeg', 
		pivot: '0 -0.2 0', 
		targetPivot: '0 0.2 0', 
	},
},
}, true);
auxl.dollLeftUpperLeg = auxl.Core(auxl.dollLeftUpperLegData);

//Doll Left Lower Leg
auxl.dollLeftLowerLegData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollLeftLowerLeg', geometry: {primitive: 'box', width: 0.05, height: 0.375, depth: 0.05}, position: new THREE.Vector3(0.05,0.375,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
},
}, true);
auxl.dollLeftLowerLeg = auxl.Core(auxl.dollLeftLowerLegData);

//Doll Right Upper Leg
auxl.dollRightUpperLegData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollRightUpperLeg', geometry: {primitive: 'box', width: 0.07, height: 0.3, depth: 0.1}, position: new THREE.Vector3(0.05,0.75,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__rightleg']: {
		type: 'coneTwist', 
		target: '#dollRightLowerLeg', 
		pivot: '0 -0.2 0', 
		targetPivot: '0 0.2 0', 
	},
},
}, true);
auxl.dollRightUpperLeg = auxl.Core(auxl.dollRightUpperLegData);

//Doll Right Lower Leg
auxl.dollRightLowerLegData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollRightLowerLeg', geometry: {primitive: 'box', width: 0.05, height: 0.375, depth: 0.05}, position: new THREE.Vector3(-0.05,0.375,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
},
}, true);
auxl.dollRightLowerLeg = auxl.Core(auxl.dollRightLowerLegData);

//Doll Left Upper Arm
auxl.dollLeftUpperArmData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollLeftUpperArm', geometry: {primitive: 'box', width: 0.05, height: 0.25, depth: 0.05}, position: new THREE.Vector3(-0.15,1.3,0), rotation: new THREE.Vector3(0,0,0), 
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__torso']: {
		type: 'coneTwist', 
		target: '#dollTorso', 
		pivot: '0 0.2 0', 
		targetPivot: '-0.2 0.2 0', 
	},
	['ammo-constraint__leftarm']: {
		type: 'coneTwist', 
		target: '#dollLeftLowerArm', 
		pivot: '0 -0.25 0', 
		targetPivot: '0 0 0', 
	},
},
}, true);
auxl.dollLeftUpperArm = auxl.Core(auxl.dollLeftUpperArmData);

//Doll Left Lower Arm
auxl.dollLeftLowerArmData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollLeftLowerArm', geometry: {primitive: 'box', width: 0.03, height: 0.3, depth: 0.1}, position: new THREE.Vector3(-0.15,1,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
		pivot: '0 0 0', 
		targetPivot: '0 0 0', 

},
}, true);
auxl.dollLeftLowerArm = auxl.Core(auxl.dollLeftLowerArmData);

//Doll Right Upper Arm
auxl.dollRightUpperArmData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollRightUpperArm', geometry: {primitive: 'box', width: 0.05, height: 0.25, depth: 0.05}, position: new THREE.Vector3(0.15,1.3,0), rotation: new THREE.Vector3(0,0,0), 
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
	['ammo-constraint__torso']: {
		type: 'coneTwist', 
		target: '#dollTorso', 
		pivot: '0 0.2 0', 
		targetPivot: '0.2 0.2 0', 
	},
	['ammo-constraint__leftarm']: {
		type: 'coneTwist', 
		target: '#dollRightLowerArm', 
		pivot: '0 0 0', 
		targetPivot: '0 -0.25 0', 
	},
},
}, true);
auxl.dollRightUpperArm = auxl.Core(auxl.dollRightUpperArmData);

//Doll Right Lower Arm
auxl.dollRightLowerArmData = auxl.CoreDataFromTemplate(auxl.dollPelvisData, {id: 'dollRightLowerArm', geometry: {primitive: 'box', width: 0.03, height: 0.3, depth: 0.05}, position: new THREE.Vector3(0.15,1,0), rotation: new THREE.Vector3(0,0,0),
components: {
	['ammo-body']:{type: 'dynamic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
	['ammo-shape']:{type: 'box',},
},
}, true);
auxl.dollRightLowerArm = auxl.Core(auxl.dollRightLowerArmData);

auxl.ragdollLayerData = {
	parent: {core: auxl.ragdollRig}, 
	child0: {core: auxl.dollHead}, 
	child1: {core: auxl.dollTorso},
	child2: {core: auxl.dollPelvis},
	child3: {core: auxl.dollLeftUpperLeg},
	child4: {core: auxl.dollLeftLowerLeg},
	child5: {core: auxl.dollRightUpperLeg},
	child6: {core: auxl.dollRightLowerLeg},
	child7: {core: auxl.dollLeftUpperArm},
	child8: {core: auxl.dollLeftLowerArm},
	child9: {core: auxl.dollRightUpperArm},
	child10: {core: auxl.dollRightLowerArm},
}
auxl.ragdollLayer = auxl.Layer('ragdollLayer',auxl.ragdollLayerData);




//
//Ammo Testing

//Floor Ammo
auxl.ammoFloorData = {
	data:'ammoFloorData',
	id:'ammoFloor',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 40, height: 1, depth: 40},
	material: {shader: "standard", color: "#28b228", opacity: 1, metalness: 0, roughness: 1, emissive: "#28b228", emissiveIntensity: 0.2, side: 'front',  src: auxl.pattern49, repeat: '40 40'},
	position: new THREE.Vector3(0,-0.5,-4),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['ammo-body']:{type: 'static'},
		['ammo-shape']:{type: 'box'},
	},
};
auxl.ammoFloor = auxl.Core(auxl.ammoFloorData);

//Ammo Wall 1
auxl.ammoWall1Data = {
	data:'ammoWall1Data',
	id:'ammoWall1',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, height: 40, depth: 40},
	material: {shader: "standard", color: "#1ac6c6", opacity: 0.5, metalness: 0, roughness: 1, emissive: "#1ac6c6", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern34, repeat: '40 40'},
	position: new THREE.Vector3(20,20,-4),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['ammo-body']:{type: 'static'},
		['ammo-shape']:{type: 'box'},
	},
};
auxl.ammoWall1 = auxl.Core(auxl.ammoWall1Data);


//Ammo Wall 2
auxl.ammoWall2Data = auxl.CoreDataFromTemplate(auxl.ammoWall1Data, {id: 'ammoWall2', position: new THREE.Vector3(-20,20,-4),}, true);
auxl.ammoWall2 = auxl.Core(auxl.ammoWall2Data);

//Ammo Wall 3
auxl.ammoWall3Data = auxl.CoreDataFromTemplate(auxl.ammoWall1Data, {id: 'ammoWall3', position: new THREE.Vector3(0,20,16), geometry: {primitive: 'box', width: 40, height: 40, depth: 1},}, true);
auxl.ammoWall3 = auxl.Core(auxl.ammoWall3Data);

//Ammo Wall 4
auxl.ammoWall4Data = auxl.CoreDataFromTemplate(auxl.ammoWall1Data, {id: 'ammoWall4', position: new THREE.Vector3(0,20,-24), geometry: {primitive: 'box', width: 40, height: 40, depth: 1},}, true);
auxl.ammoWall4 = auxl.Core(auxl.ammoWall4Data);




//Ammo 1
auxl.ammo1Data = {
	data:'ammo1Data',
	id:'ammo1',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 3, height: 2, depth: 1},
	material: {shader: "standard", color: "#ea1154", opacity: 1, metalness: 0, roughness: 1,  emissive: "#ea1154", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(0,5,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		['ammo-body']:{type: 'dynamic', emitCollisionEvents: true, activationState: 'disableDeactivation'},
		['ammo-shape']:{type: 'box'},
	},
};
auxl.ammo1 = auxl.Core(auxl.ammo1Data);
//Ammo 2
auxl.ammo2Data = {
	data:'ammo2Data',
	id:'ammo2',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, height: 1, depth: 1},
	material: {shader: "standard", color: "#1186ea", opacity: 1, metalness: 0, roughness: 1,  emissive: "#1186ea", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(2,11,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		['ammo-body']:{type: 'dynamic', emitCollisionEvents: true, activationState: 'disableDeactivation'},
		['ammo-shape']:{type: 'box'},
	},
};
auxl.ammo2 = auxl.Core(auxl.ammo2Data);

//Ammo 3
auxl.ammo3Data = {
	data:'ammo3Data',
	id:'ammo3',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, height: 1, depth: 1},
	material: {shader: "standard", color: "#1186ea", opacity: 1, metalness: 0, roughness: 1,  emissive: "#1186ea", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(-3, 4, -2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		//ammopush: null,
		['ammo-body']:{type: 'dynamic', emitCollisionEvents: true, activationState: 'disableDeactivation'},
		['ammo-shape']:{type: 'box'},
	},
};
auxl.ammo3 = auxl.Core(auxl.ammo3Data);



//Cam 0 : Rig, Camera & View

//Rig
auxl.cam0RigData = {
	data:'cam0RigData',
	id:'cam0Rig',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,1.6,-5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.cam0Rig = auxl.Core(auxl.cam0RigData);

//
//Camera
auxl.cam0Data = {
	data:'cam0Data',
	id:'cam0',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 0.15, height: 0.15, depth: 0.15},
	material: {shader: "standard", color: "#d42a7f", opacity: 1, metalness: 0, roughness: 1,  emissive: "#d42a7f", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(0,1.4,-5.5),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		ortho: null,
		camera:{active:false, fov: 90, near: 0.005, far: 10000.00, zoom: 1, },
		camrender: "cid: cam0Canvas; height: 300; width: 400;",
	},
};
auxl.cam0 = auxl.Core(auxl.cam0Data);

//
//Viewer
auxl.cam0ViewerData = {
	data:'cam0ViewerData',
	id:'cam0Viewer',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', width: 0.33, height: 0.25,},
	material: {src: '#cam0Canvas', repeat: '-1 1', opacity: 1, shader: 'flat'},
	position: new THREE.Vector3(0,1.5,-4.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['canvas-updater']: null,
	},
};
auxl.cam0Viewer = auxl.Core(auxl.cam0ViewerData);


//Cam0Layer
auxl.cam0LayerData = {
parent: {core: auxl.cam0Rig},
child0: {core: auxl.cam0Viewer},
child0: {core: auxl.cam0},
}
auxl.cam0Layer = auxl.Layer('cam0Layer', auxl.cam0LayerData);

/*
//
//Draw Testing
auxl.drawTestingData = {
	data:'drawTestingData',
	id:'drawTesting',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 1, height: 1, depth: 1},
	material: false,
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
		draw:{width: 256, height: 256},
		drawtesting:{text: 'Hello World!', fontColor: '#ffffff', bkgdColor: '#c12eb6',},

	},
};
auxl.drawTesting = auxl.Core(auxl.drawTestingData);
*/

//
//Shaders Testing

//Shader Park Test
auxl.shaderTestData = {
	data:'shaderTestData',
	id:'shaderTest',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(-2,2,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
		['shadertest']: null,
	},
};
auxl.shaderTest = auxl.Core(auxl.shaderTestData);

//Shader Cloud
auxl.shaderCloudData = {
	data:'shaderCloudData',
	id:'shaderCloud',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(4,8,-4),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
		['shadercloud']: null,
	},
};
auxl.shaderCloud = auxl.Core(auxl.shaderCloudData);

//Shader Cloud
auxl.shaderRandom0Data = {
	data:'shaderRandom0Data',
	id:'shaderRandom0',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(6,1.4,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
		['shaderrandom0']: null,
	},
};
auxl.shaderRandom0 = auxl.Core(auxl.shaderRandom0Data);



//
//Hover Target Testing
auxl.hoverhoverTarget0Data = {
	data:'hoverhoverTarget0Data',
	id:'hoverTarget0',
	sources:false,
	text: false,
	geometry: {primitive: 'box', width: 0.5, height: 0.5, depth: 0.5},
	material: {shader: "standard", color: "#ad1f97", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ad1f97", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(-2,2,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'components.material.material.emissiveIntensity', from: 0.2, to: 0.8, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'raycaster-intersected'},
		hoveroff: {property: 'components.material.material.emissiveIntensity', from: 0.8, to: 0.2, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'raycaster-intersected-cleared'},
	},
	mixins: false,
	classes: ['a-ent', 'clickable', 'target'],
	components: {
		['ammo-body']:{type: 'dynamic', emitCollisionEvents: true, activationState: 'disableDeactivation'},
		['ammo-shape']:{type: 'box'},
		//ammobounce: null,
/*
		oneventrun__raycasterintersected:{
			event: 'raycaster-intersected',
			cursorObj: 'player',
			component: 'null',
			method: 'TestFunc',
			params: 'Ray On',
		},
		oneventrun__oneventrun__raycasterintersectedcleared:{
			event: 'raycaster-intersected-cleared',
			cursorObj: 'player',
			component: 'null',
			method: 'TestFunc',
			params: 'Ray Off',
		},
*/
	},
};
auxl.hoverTarget0 = auxl.Core(auxl.hoverhoverTarget0Data);
auxl.hoverTarget1Data = auxl.CoreDataFromTemplate(auxl.hoverhoverTarget0Data, {id: 'hoverTarget1', position: new THREE.Vector3(0,3,-2)}, true);
auxl.hoverTarget1 = auxl.Core(auxl.hoverTarget1Data);
auxl.hoverTarget2Data = auxl.CoreDataFromTemplate(auxl.hoverhoverTarget0Data, {id: 'hoverTarget2', position: new THREE.Vector3(2,2,-2)}, true);
auxl.hoverTarget2 = auxl.Core(auxl.hoverTarget2Data);

auxl.AmmoCubes = (data) => {
	let ammoCubes = {};
	ammoCubes.id = data.id || auxl.RanNameGen();
	ammoCubes.radius = data.radius || 10;
	ammoCubes.total = data.total || 42;
	ammoCubes.coreData = data.coreData || auxl.hoverhoverTarget0Data;

	ammoCubes.all = [];

	const GenCubes = () => {
		ammoCubes.all = [];
		for(let a=0; a < ammoCubes.total; a++){
			let baseColor = auxl.ColorTheoryGen();
			let material = {shader: "standard", color: baseColor.base, opacity: 1, metalness: 0.6, roughness: 0.4, emissive: baseColor.base, emissiveIntensity: 0.2, side: 'front',  src: auxl.RandomOfArray(auxl.patterns), repeat: '1 1'}
			let position = auxl.RandomPosition(ammoCubes.radius) 
			position.add(new THREE.Vector3(0,ammoCubes.radius,ammoCubes.radius*-1))
			auxl[ammoCubes.id+a+'Data'] = auxl.CoreDataFromTemplate(ammoCubes.coreData, {id: ammoCubes.id+a, position, material}, true);
			auxl[ammoCubes.id+a] = auxl.Core(auxl[ammoCubes.id+a+'Data']);
			auxl[ammoCubes.id+a].SpawnCore();
			ammoCubes.all.push(auxl[ammoCubes.id+a])
		}
	}
	const SpawnCubes = () => {
		GenCubes();
		ammoCubes.all.forEach(each => each.SpawnCore());
	}
	const DespawnCubes = () => {
		ammoCubes.all.forEach(each => each.DespawnCore());
	}

	return {ammoCubes, SpawnCubes, DespawnCubes}
}
auxl.AddObjGenToTracker('ammoCubes', 'SpawnCubes', 'DespawnCubes');

auxl.powerCubes = auxl.AmmoCubes({
id: 'powerCubes',
radius: 10,
data: auxl.hoverhoverTarget0Data,
})


//
//Menus

//skinny width menu 0.5
//normal width menu 1
//wide width menu 1.5




//Large Widescreen
//1.25h x 1.65w

//Full Square
//1.25h x 1.25w

//Skinny Tallscreen
//1h x 1.75w


//Build Scene Library Objects
auxl.buildAmmoLibrary = () => {
auxl.shaderTest = auxl.Core(auxl.shaderTestData);
auxl.shaderCloud = auxl.Core(auxl.shaderCloudData);
auxl.hoverTarget0 = auxl.Core(auxl.hoverhoverTarget0Data);
auxl.hoverTarget1 = auxl.Core(auxl.hoverTarget1Data);
auxl.hoverTarget2 = auxl.Core(auxl.hoverTarget2Data);

}
auxl.ToBeRebuilt('buildAmmoLibrary');

},
});

//auxl-ammo
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('ammo-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;
//
//World Atlas MapZones & Nodeammo


//
//ammo World

//
//Zone 0
auxl.zoneIntroData = {
	info:{
		id: 'zoneIntro',
		name: 'zoneIntro',
		zoneNum: 0,
		start: 'zoneIntroScene0',
		travelMenu: false,
	},
	controls:{
	},
	start:{
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
//Zone 0 Scene 0
auxl.zoneIntroScene0Data = {
	info:{
		id:'zoneIntroScene0',
		name: 'Ammo Playground',
		description: 'Use your actions to hover target and grab, throw, launch, pull, etc...',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
		//shaderTest:{SpawnCore: null},
		shaderCloud:{SpawnCore: null},

		//hoverTarget0:{SpawnCore: null},
		//hoverTarget1:{SpawnCore: null},
		hoverTarget2:{SpawnCore: null},

		ammoFloor:{SpawnCore: null},

		ammoWall1:{SpawnCore: null},
		ammoWall2:{SpawnCore: null},
		ammoWall3:{SpawnCore: null},
		ammoWall4:{SpawnCore: null},

		//ammo1:{SpawnCore: null},
		//ammo2:{SpawnCore: null},
		//ammo3:{SpawnCore: null},

		//ragdollLayer:{SpawnLayer: null},
		powerCubes:{SpawnCubes: null},
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: auxl.zoneIntroData.zoneIntroScene0,
	},
};
//Zone 0 Scene 1
auxl.zoneIntroScene1Data = {
	info:{
		id:'zoneIntroScene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: auxl.zoneIntroData.zoneIntroScene1,
	},
};
//Zone 0 Scene 0
auxl.zoneIntroScene0 = auxl.SceneNode(auxl.zoneIntroScene0Data);
//Zone 0 Scene 1
auxl.zoneIntroScene1 = auxl.SceneNode(auxl.zoneIntroScene1Data);
//Map Zone 0
auxl.zoneIntro = auxl.MapZone(auxl.zoneIntroData);

//
//Zone 1
auxl.zoneTrainingData = {
	info:{
		id: 'zoneTraining',
		name: 'zoneTraining',
		zoneNum: 0,
		start: 'zoneTrainingScene0',
		travelMenu: true,
	},
	controls:{

	},
	start:{

	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
//Zone 1 Scene 0
auxl.zoneTrainingScene0Data = {
	info:{
		id:'zoneTrainingScene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{

	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{

	},
	map:{
		data: auxl.zoneTrainingData.zoneTrainingScene0,
	},
};
//Zone 1 Scene 0
auxl.zoneTrainingScene0 = auxl.SceneNode(auxl.zoneTrainingScene0Data);
//Zone 1
auxl.zoneTraining = auxl.MapZone(auxl.zoneTrainingData);

//
//Scenarios

//
//ammo Scenario
auxl.ammoScenarioData = {
	info:{
		id: 'ammoScenario',
		name: 'v03 ammo Scenario',
		scenarioNum: 0,
		startZone: 'zoneIntro',
		instructions: 'A scenario ammo the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	
	map:{
		zoneIntro:{
			zoneIntroScene0:{
				connect0: {inZone: true, node: 'zoneIntroScene1',},
				connect1: {inZone: 'zoneTraining', node: 'zoneTrainingScene0',},
			},
			zoneIntroScene1:{
				connect0: {inZone: true, node: 'zoneIntroScene0',},
			},
		},
		zoneTraining:{
			zoneTrainingScene0:{
				connect0: {inZone: 'zoneIntro', node: 'zoneIntroScene0',},
			},
		},
	},
	controls:{

		//Force Pull
		action1Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action1pull', name: 'Force Pull Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action1Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action1pull', name: 'Force Pull Targets', info: 'Force pull targets.'},

		//Force Up
		action2Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action2up', name: 'Force Up Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action2Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action2up', name: 'Force Up Targets', info: 'Force throw up targets.'},

		//Force Release
		//action2Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action2release', name: 'Force Release Targets', info: 'Force release targets.'},

		//Force Flick - Not working properly, is the same as throw
		action3Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action3grab', name: 'Force Flick Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action3Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action3flick', name: 'Force Flick Targets', info: 'Force flick targets.'},

		//Force Throw
		//action3Down:{auxlObj: 'player', func: 'HoverTargetDown', params: false, name: 'Force Throw Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		//action3Up:{auxlObj: 'player', func: 'HoverTargetUp', params: false, name: 'Force Throw Targets', info: 'Force throw targets.'},

		//Force Grab
		action4Down:{auxlObj: 'player', func: 'HoverTargetDown', params: 'action4grab', name: 'Force Grab Targetting', info: 'Start hovering over targetable entities while holding down, Click to cancel.'},
		action4Up:{auxlObj: 'player', func: 'HoverTargetUp', params: 'action4grab', name: 'Force Grab Targets', info: 'Force grab targets.'},

		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
	},
	delay:{
		100:{
			//skyBox0:{DayNightCycle: null},
			skyBox0:{SetTime: 11},
		},
		500:{
			comp:{SpawnComp: null,},
		},
	},
	interval:{
/*
		3000: {
			run: {
				hoverTarget0:{IfElse: {hoverTarget0:{cond: 'inScene',
				ifTrue: false,
				ifFalse: {
					hoverTarget0:{SpawnCore:null,},
				},}}},
				hoverTarget1:{IfElse: {hoverTarget1:{cond: 'inScene',
				ifTrue: false,
				ifFalse: {
					hoverTarget1:{SpawnCore:null,},
				},}}},
				hoverTarget2:{IfElse: {hoverTarget2:{cond: 'inScene',
				ifTrue: false,
				ifFalse: {
					hoverTarget2:{SpawnCore:null,},
				},}}},
			 }, loop: 'infinite'
		},
*/
	},
	event:{
	},
	interaction:{
	},
	exit:{

	},
};
auxl.ammoScenario = auxl.Scenario(auxl.ammoScenarioData);

//
//ammo World
auxl.ammoWorldData = {
	info:{
		id: 'ammoWorld',
		name: 'Ammo World',
		description: 'A world containing various test scenarios.',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: 'ammo',
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		auxl.ammoScenario,
	],
};
auxl.ammoWorld = auxl.World(auxl.ammoWorldData);
//auxl.ammoWorld.SetAsDefault();

//
//System Loaded
//auxl.SystemLoaded();
console.log({msg: 'demo ammo world loaded', world: auxl.ammoWorld})
    },
});