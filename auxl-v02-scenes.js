//
//AUXL : A-Frame UX Library
//v0.2 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.2 Scenes - In Progress

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('auxl-scene-library', {
	dependencies: ['auxl'],
    //schema: {
        //clickObj: {type: 'string', default: 'auxlObj'}
    //},
    init: function () {
		//console.log('AUXL Data INIT');
		//AUXL System
		const auxl = document.querySelector('a-scene').systems.auxl;

//Floor
//

//Node Floor
auxl.nodeFloorData = {
data:'full floor',
id:'nodeFloor',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#b133a7", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#b133a7", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern75, repeat: '150 150'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.02),
animations: {
daycolor:{property: 'material.color', from: '#613381', to: '#298625', dur: 90000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise'},
daycolor2:{property: 'material.color', from: '#298625', to: '#613381', dur: 180000, delay: 180000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunrise'},
nightcolor:{property: 'material.color', from: '#613381', to: '#99154E', dur: 90000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunset'},
nightcolor2:{property: 'material.color', from: '#613381', to: '#99154E', dur: 90000, delay: 90000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: false, startEvents: 'sunset'},
},
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
//['src-loaded']:null,
},
};
auxl.nodeFloor = auxl.Core(auxl.nodeFloorData);

//Water Floor
auxl.waterFloorData = {
data:'waterFloorData',
id:'waterFloor',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 150, segments: 64, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", src: auxl.pattern80, repeat: '25 25',color: "#3c86b4", opacity: 1, metalness: 0.8, roughness: 0.2, emissive: "#3c86b4", emissiveIntensity: 0.2, side: 'front'},
position: new THREE.Vector3(0,0.1,-100),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(0.5,0.5,0.02),
animations: {
water1:{property: 'material.offset', from: '0 0', to: '10 -10', dur: 120000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.waterFloor = auxl.Core(auxl.waterFloorData);

//Ceilings
//

//Node Ceiling
auxl.nodeCeilingData = {
data:'nodeCeilingData',
id:'nodeCeiling',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 250, height: 250,},
material: {shader: "standard", src: auxl.pattern80, repeat: '25 25',color: "#3c86b4", opacity: 0.69, metalness: 0.8, roughness: 0.2, emissive: "#3c86b4", emissiveIntensity: 0.2, side: 'back'},
position: new THREE.Vector3(0,40,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
water1:{property: 'material.offset', from: '0 0', to: '-10 10', dur: 120000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeCeiling = auxl.Core(auxl.nodeCeilingData);

//Small Ceiling
auxl.smallCeilingData = {
data:'smallCeilingData',
id:'smallCeiling',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 20, height: 20,},
material: {shader: "standard", src: auxl.pattern80, repeat: '40 40',color: "#214a64", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#214a64", emissiveIntensity: 0.2, side: 'back'},
position: new THREE.Vector3(0,8,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.smallCeiling = auxl.Core(auxl.smallCeilingData);

//Walls
//

//Node Wall
auxl.nodeWallParentData = {
data:'node wall',
id:'nodeWallParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,2,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeWallData = {
data:'node wall',
id:'nodeWall',
sources:false,
text: false,
geometry: {primitive: 'box', depth: 0.25, width: 20, height: 4},
material: {shader: "standard", src: auxl.pattern18, repeat: '10 2.5',color: "#80401f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#80401f", emissiveIntensity: 0.8, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.nodeWallParent = auxl.Core(auxl.nodeWallParentData);
auxl.nodeWallData.id = 'nodeWall1';
auxl.nodeWallData.position = new THREE.Vector3(0,0,-10);
auxl.nodeWall1 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall2';
auxl.nodeWallData.position = new THREE.Vector3(0,0,10);
auxl.nodeWall2 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall3';
auxl.nodeWallData.position = new THREE.Vector3(-10,0,0);
auxl.nodeWallData.rotation = new THREE.Vector3(0,90,0);
auxl.nodeWall3 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallData.id = 'nodeWall4';
auxl.nodeWallData.position = new THREE.Vector3(10,0,0);
auxl.nodeWall4 = auxl.Core(auxl.nodeWallData);
auxl.nodeWallsData = {
parent: {core: auxl.nodeWallParent}, 
child0: {core: auxl.nodeWall1}, 
child1: {core: auxl.nodeWall2},
child2: {core: auxl.nodeWall3},
child3: {core: auxl.nodeWall4},}
auxl.nodeWalls = auxl.Layer('nodeWalls',auxl.nodeWallsData);

//Atmosphere
//

//Clouds
auxl.cloudsParentData = {
data:'cloudsParentData',
id:'cloudsParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.cloudData = {
data:'cloudData',
id:'cloud',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 100, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: 'threeColorGradientShader', topColor: '#bf83b8', middleColor: '#795474', bottomColor: '#cb9cc5', side: 'back',},
position: new THREE.Vector3(-250,100,-350),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,0.25,0.75),
animations:{
rotate:{property: 'rotation', from: new THREE.Vector3(0,0,0), to: new THREE.Vector3(45,360,45), dur: auxl.timeInDay, delay: 0, loop: 'true', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.cloudsParent = auxl.Core(auxl.cloudsParentData);
auxl.cloudData.id = 'cloud1';
auxl.cloudData.position = new THREE.Vector3(-150,200,-300);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud2';
auxl.cloudData.position = new THREE.Vector3(-150,200,200);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud2 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud3';
auxl.cloudData.position = new THREE.Vector3(-50,200,-300);
auxl.cloudData.scale = new THREE.Vector3(0.5,0.5,0.25);
auxl.cloud3 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud4';
auxl.cloudData.position = new THREE.Vector3(-300,200,-50);
auxl.cloudData.scale = new THREE.Vector3(0.25,0.75,0.75);
auxl.cloud4 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud5';
auxl.cloudData.position = new THREE.Vector3(100,200,-100);
auxl.cloudData.scale = new THREE.Vector3(0.25,1,0.5);
auxl.cloud5 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud6';
auxl.cloudData.position = new THREE.Vector3(-25,200,25);
auxl.cloudData.scale = new THREE.Vector3(1,0.5,0.25);
auxl.cloud6 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud7';
auxl.cloudData.position = new THREE.Vector3(-200,200,50);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud7 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud8';
auxl.cloudData.position = new THREE.Vector3(50,200,100);
auxl.cloudData.scale = new THREE.Vector3(0.75,0.25,0.75);
auxl.cloud8 = auxl.Core(auxl.cloudData);
auxl.cloudLayerData = {
parent: {core: auxl.cloudsParent}, 
child0: {core: auxl.cloud1}, 
child1: {core: auxl.cloud2},
child2: {core: auxl.cloud3},
child3: {core: auxl.cloud4},
child4: {core: auxl.cloud5},
child5: {core: auxl.cloud6},
child6: {core: auxl.cloud7},
child7: {core: auxl.cloud8},
}
auxl.clouds = auxl.Layer('clouds',auxl.cloudLayerData);

//Environmental Ring Gen from Single Asset Testing
//

//Snow Mountains Basic
auxl.snowMountainsBasicData = {
data:'snowMountainsBasicData',
id:'snowMountainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiSnowMountainsBasicData = {
id: 'multiSnowMountainsBasic',
objData: auxl.snowMountainsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiSnowMountainsBasic = auxl.ObjsGenRing(auxl.multiSnowMountainsBasicData);
//Rainy Forest Basic
auxl.rainyForestBasicData = {
data:'rainyForestBasicData',
id:'rainyForestBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiRainyForestBasicData = {
id: 'multiRainyForestBasic',
objData: auxl.rainyForestBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiRainyForestBasic = auxl.ObjsGenRing(auxl.multiRainyForestBasicData);
//Grassy Hills Basic
auxl.grassyHillsBasicData = {
data:'grassyHillsBasicData',
id:'grassyHillsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiGrassyHillsBasicData = {
id: 'multiGrassyHillsBasic',
objData: auxl.grassyHillsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiGrassyHillsBasic = auxl.ObjsGenRing(auxl.multiGrassyHillsBasicData);
//Desert Plains Basic
auxl.desertPlainsBasicData = {
data:'desertPlainsBasicData',
id:'desertPlainsBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiDesertPlainsBasicData = {
id: 'multiDesertPlainsBasic',
objData: auxl.desertPlainsBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiDesertPlainsBasic = auxl.ObjsGenRing(auxl.multiDesertPlainsBasicData);
//Ocean Beach Basic
auxl.oceanBeachBasicData = {
data:'oceanBeachBasicData',
id:'oceanBeachBasic',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#bdc338", emissive: '#bdc338', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.multiOceanBeachBasicData = {
id: 'multiOceanBeachBasic',
objData: auxl.oceanBeachBasicData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 3,
sameTypeRadius: 2,
otherTypeRadius: 1,
ranYPos: true,
yPosFlex: 2,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: true,
ranRotY: true,
ranRotZ: true,
ranColor: true,
ranTexture: true,
};
auxl.multiOceanBeachBasic = auxl.ObjsGenRing(auxl.multiOceanBeachBasicData);

//Forest
//

//crop_melon
auxl.crop_melonData = {
data:'crop_melonData',
id:'crop_melon',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crop_melon.glb',
},
};
//flower_purpleA
auxl.flower_purpleAData = {
data:'flower_purpleA',
id:'flower_purpleA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_purpleA.glb',
},
};
//flower_redA
auxl.flower_redAData = {
data:'flower_redA',
id:'flower_redA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_redA.glb',
},
};
//flower_yellowA
auxl.flower_yellowAData = {
data:'flower_yellowA',
id:'flower_yellowA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(2,2,2),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/flower_yellowA.glb',
},
};
//grass_large
auxl.grass_largeData = {
data:'grass_large',
id:'grass_large',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(6,3,6),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grass_large.glb',
},
};
//grass_leafsLarge
auxl.grass_leafsLargeData = {
data:'grass_leafsLarge',
id:'grass_leafsLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(6,3,6),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grass_leafsLarge.glb',
},
};
//pine
auxl.pineData = {
data:'pine',
id:'pine',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pine.glb',
},
};
//pineCrooked
auxl.pineCrookedData = {
data:'pineCrooked',
id:'pineCrooked',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pineCrooked.glb',
},
};
//plant_bush
auxl.plant_bushData = {
data:'plant_bush',
id:'plant_bush',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/plant_bush.glb',
},
};
//plant_bushLarge
auxl.plant_bushLargeData = {
data:'plant_bushLarge',
id:'plant_bushLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/plant_bushLarge.glb',
},
};
//rockLarge
auxl.rockLargeData = {
data:'rockLarge',
id:'rockLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockLarge.glb',
},
};
//rockMedium
auxl.rockMediumData = {
data:'rockMedium',
id:'rockMedium',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockMedium.glb',
},
};//MISSING
//rockSmall
auxl.rockSmallData = {
data:'rockSmall',
id:'rockSmall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockSmall.glb',
},
};
//shovelDirt
auxl.shovelDirtData = {
data:'shovelDirt',
id:'shovelDirt',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/shovelDirt.glb',
},
};
//tree_cone
auxl.tree_coneData = {
data:'tree_cone',
id:'tree_cone',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_cone.glb',
},
};
//tree_default
auxl.tree_defaultData = {
data:'tree_default',
id:'tree_default',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_default.glb',
},
};
//tree_fat
auxl.tree_fatData = {
data:'tree_fat',
id:'tree_fat',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_fat.glb',
},
};
//tree_oak
auxl.tree_oakData = {
data:'tree_oak',
id:'tree_oak',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_oak.glb',
},
};
//tree_pineDefaultA
auxl.tree_pineDefaultAData = {
data:'tree_pineDefaultA',
id:'tree_pineDefaultA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineDefaultA.glb',
},
};
//tree_pineDefaultB
auxl.tree_pineDefaultBData = {
data:'tree_pineDefaultB',
id:'tree_pineDefaultB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineDefaultB.glb',
},
};
//tree_pineGroundA
auxl.tree_pineGroundAData = {
data:'tree_pineGroundA',
id:'tree_pineGroundA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineGroundA.glb',
},
};
//tree_pineGroundB
auxl.tree_pineGroundBData = {
data:'tree_pineGroundB',
id:'tree_pineGroundB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineGroundB.glb',
},
};
//tree_pineRoundA
auxl.tree_pineRoundAData = {
data:'tree_pineRoundA',
id:'tree_pineRoundA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundA.glb',
},
};
//tree_pineRoundB
auxl.tree_pineRoundBData = {
data:'tree_pineRoundB',
id:'tree_pineRoundB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundB.glb',
},
};
//tree_pineRoundC
auxl.tree_pineRoundCData = {
data:'tree_pineRoundC',
id:'tree_pineRoundC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundC.glb',
},
};
//tree_pineRoundD
auxl.tree_pineRoundDData = {
data:'tree_pineRoundD',
id:'tree_pineRoundD',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundD.glb',
},
};
//tree_pineRoundE
auxl.tree_pineRoundEData = {
data:'tree_pineRoundE',
id:'tree_pineRoundE',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundE.glb',
},
};
//tree_pineRoundF
auxl.tree_pineRoundFData = {
data:'tree_pineRoundF',
id:'tree_pineRoundF',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineRoundF.glb',
},
};
//tree_pineSmallA
auxl.tree_pineSmallAData = {
data:'tree_pineSmallA',
id:'tree_pineSmallA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallA.glb',
},
};
//tree_pineSmallB
auxl.tree_pineSmallBData = {
data:'tree_pineSmallB',
id:'tree_pineSmallB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallB.glb',
},
};
//tree_pineSmallC
auxl.tree_pineSmallCData = {
data:'tree_pineSmallC',
id:'tree_pineSmallC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallC.glb',
},
};
//tree_pineSmallD
auxl.tree_pineSmallDData = {
data:'tree_pineSmallD',
id:'tree_pineSmallD',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineSmallD.glb',
},
};
//tree_pineTallA_detailed
auxl.tree_pineTallA_detailedData = {
data:'tree_pineTallA_detailedData',
id:'tree_pineTallA_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallA_detailed.glb',
},
};
//tree_pineTallB_detailed
auxl.tree_pineTallB_detailedData = {
data:'tree_pineTallB_detailedData',
id:'tree_pineTallB_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallB_detailed.glb',
},
};
//tree_pineTallC_detailed
auxl.tree_pineTallC_detailedData = {
data:'tree_pineTallC_detailedData',
id:'tree_pineTallC_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallC_detailed.glb',
},
};
//tree_pineTallD_detailed
auxl.tree_pineTallD_detailedData = {
data:'tree_pineTallD_detailedData',
id:'tree_pineTallD_detailed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_pineTallD_detailed.glb',
},
};
//trunk
auxl.trunkData = {
data:'trunk',
id:'trunk',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/trunk.glb',
},
};
//trunkLong
auxl.trunkLongData = {
data:'trunkLong',
id:'trunkLong',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/trunkLong.glb',
},
};
//tree_plateau
auxl.tree_plateauData = {
data:'tree_plateauData',
id:'tree_plateau',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_plateau.glb',
},
};
//tree_simple
auxl.tree_simpleData = {
data:'tree_simpleData',
id:'tree_simple',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_simple.glb',
},
};
//tree_small
auxl.tree_smallData = {
data:'tree_smallData',
id:'tree_small',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_small.glb',
},
};
//tree_tall
auxl.tree_tallData = {
data:'tree_tallData',
id:'tree_tall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_tall.glb',
},
};
//tree_thin
auxl.tree_thinData = {
data:'tree_thinData',
id:'tree_thin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_thin.glb',
},
};
//log
auxl.logData = {
data:'logData',
id:'log',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/log.glb',
},
};
//mushroom_redGroup
auxl.mushroom_redGroupData = {
data:'mushroom_redGroupData',
id:'mushroom_redGroup',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/mushroom_redGroup.glb',
},
};
//mushroom_redTall
auxl.mushroom_redTallData = {
data:'mushroom_redTallData',
id:'mushroom_redTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/mushroom_redTall.glb',
},
};
//rock_tallA
auxl.rock_tallAData = {
data:'rock_tallAData',
id:'rock_tallA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rock_tallA.glb',
},
};
//rock_tallB
auxl.rock_tallBData = {
data:'rock_tallBData',
id:'rock_tallB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rock_tallB.glb',
},
};
//rockFlatGrass
auxl.rockFlatGrassData = {
data:'rockFlatGrassData',
id:'rockFlatGrass',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFlatGrass.glb',
},
};

//Snow
//

//treePineSnow
auxl.treePineSnowData = {
data:'treePineSnowData',
id:'treePineSnow',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnow.glb',
},
};
//treePineSnowed
auxl.treePineSnowedData = {
data:'treePineSnowedData',
id:'treePineSnowed',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnowed.glb',
},
};
//treePineSnowRound
auxl.treePineSnowRoundData = {
data:'treePineSnowRoundData',
id:'treePineSnowRound',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treePineSnowRound.glb',
},
};
//treeDecorated
auxl.treeDecoratedData = {
data:'treeDecoratedData',
id:'treeDecorated',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/treeDecorated.glb',
},
};
//snowFort
auxl.snowFortData = {
data:'snowFortData',
id:'snowFort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowFort.glb',
},
};
//snowman
auxl.snowmanData = {
data:'snowmanData',
id:'snowman',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowman.glb',
},
};
//snowmanFancy
auxl.snowmanFancyData = {
data:'snowmanFancyData',
id:'snowmanFancy',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowmanFancy.glb',
},
};
//snowPatch
auxl.snowPatchData = {
data:'snowPatchData',
id:'snowPatch',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/snowPatch.glb',
},
};
//rocks
auxl.rocksData = {
data:'rocksData',
id:'rocks',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rocks.glb',
},
};
//rocksTall
auxl.rocksTallData = {
data:'rocksTallData',
id:'rocksTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rocksTall.glb',
},
};

//Graveyard
//

//cross
auxl.crossData = {
data:'crossData',
id:'cross',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cross.glb',
},
};
//crossColumn
auxl.crossColumnData = {
data:'crossColumnData',
id:'crossColumn',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crossColumn.glb',
},
};
//crossWood
auxl.crossWoodData = {
data:'crossWoodData',
id:'crossWood',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crossWood.glb',
},
};
//debris
auxl.debrisData = {
data:'debrisData',
id:'debris',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/debris.glb',
},
};
//debrisWood
auxl.debrisWoodData = {
data:'debrisWoodData',
id:'debrisWood',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/debrisWood.glb',
},
};
//fenceDamaged
auxl.fenceDamagedData = {
data:'fenceDamagedData',
id:'fenceDamaged',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/fenceDamaged.glb',
},
};
//ghost
auxl.ghostData = {
data:'ghostData',
id:'ghost',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/ghost.glb',
},
};
//grave
auxl.graveData = {
data:'graveData',
id:'grave',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/grave.glb',
},
};
//gravestoneBevel
auxl.gravestoneBevelData = {
data:'gravestoneBevelData',
id:'gravestoneBevel',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneBevel.glb',
},
};
//gravestoneBroken
auxl.gravestoneBrokenData = {
data:'gravestoneBrokenData',
id:'gravestoneBroken',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneBroken.glb',
},
};
//gravestoneCross
auxl.gravestoneCrossData = {
data:'gravestoneCrossData',
id:'gravestoneCross',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneCross.glb',
},
};
//gravestoneCrossLarge
auxl.gravestoneCrossLargeData = {
data:'gravestoneCrossLargeData',
id:'gravestoneCrossLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneCrossLarge.glb',
},
};
//gravestoneDebris
auxl.gravestoneDebrisData = {
data:'gravestoneDebrisData',
id:'gravestoneDebris',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneDebris.glb',
},
};
//gravestoneDecorative
auxl.gravestoneDecorativeData = {
data:'gravestoneDecorativeData',
id:'gravestoneDecorative',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneDecorative.glb',
},
};
//gravestoneFlat
auxl.gravestoneFlatData = {
data:'gravestoneFlatData',
id:'gravestoneFlat',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneFlat.glb',
},
};
//gravestoneFlatOpen
auxl.gravestoneFlatOpenData = {
data:'gravestoneFlatOpenData',
id:'gravestoneFlatOpen',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneFlatOpen.glb',
},
};
//gravestoneRoof
auxl.gravestoneRoofData = {
data:'gravestoneRoofData',
id:'gravestoneRoof',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneRoof.glb',
},
};
//gravestoneRound
auxl.gravestoneRoundData = {
data:'gravestoneRoundData',
id:'gravestoneRound',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneRound.glb',
},
};
//gravestoneWide
auxl.gravestoneWideData = {
data:'gravestoneWideData',
id:'gravestoneWide',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/gravestoneWide.glb',
},
};
//pumpkin
auxl.pumpkinData = {
data:'pumpkinData',
id:'pumpkin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkin.glb',
},
};
//pumpkinCarved
auxl.pumpkinCarvedData = {
data:'pumpkinCarvedData',
id:'pumpkinCarved',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinCarved.glb',
},
};
//pumpkinTall
auxl.pumpkinTallData = {
data:'pumpkinTallData',
id:'pumpkinTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinTall.glb',
},
};
//pumpkinTallCarved
auxl.pumpkinTallCarvedData = {
data:'pumpkinTallCarvedData',
id:'pumpkinTallCarved',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/pumpkinTallCarved.glb',
},
};
//shovelDirt
auxl.shovelDirtData = {
data:'shovelDirtData',
id:'shovelDirt',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/shovelDirt.glb',
},
};

//Desert
//

//cactus_short
auxl.cactus_shortData = {
data:'cactus_shortData',
id:'cactus_short',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cactus_short.glb',
},
};
//cactus_tall
auxl.cactus_tallData = {
data:'cactus_tallData',
id:'cactus_tall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/cactus_tall.glb',
},
};
//crops_cornStageA
auxl.crops_cornStageAData = {
data:'crops_cornStageAData',
id:'crops_cornStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageA.glb',
},
};

//Beach
//

//tree_palm
auxl.tree_palmData = {
data:'tree_palm',
id:'tree_palm',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palm.glb',
},
};
//tree_palmBend
auxl.tree_palmBendData = {
data:'tree_palmBend',
id:'tree_palmBend',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmBend.glb',
},
};
//tree_palmDetailedShort
auxl.tree_palmDetailedShortData = {
data:'tree_palmDetailedShort',
id:'tree_palmDetailedShort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmDetailedShort.glb',
},
};
//tree_palmDetailedTall
auxl.tree_palmDetailedTallData = {
data:'tree_palmDetailedTall',
id:'tree_palmDetailedTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmDetailedTall.glb',
},
};
//tree_palmShort
auxl.tree_palmShortData = {
data:'tree_palmShortData',
id:'tree_palmShort',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmShort.glb',
},
};
//tree_palmTall
auxl.tree_palmTallData = {
data:'tree_palmTallData',
id:'tree_palmTall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/tree_palmTall.glb',
},
};
//canoe
auxl.canoeData = {
data:'canoeData',
id:'canoe',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,-30,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/canoe.glb',
},
};
//canoe_paddle
auxl.canoe_paddleData = {
data:'canoe_paddleData',
id:'canoe_paddle',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,0),
rotation: new THREE.Vector3(0,15,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/canoe_paddle.glb',
},
};
//crops_bambooStageA
auxl.crops_bambooStageAData = {
data:'crops_bambooStageAData',
id:'crops_bambooStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_bambooStageA.glb',
},
};
//crops_bambooStageB
auxl.crops_bambooStageBData = {
data:'crops_bambooStageBData',
id:'crops_bambooStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_bambooStageB.glb',
},
};

//Underwater
//

//crops_wheatStageA
auxl.crops_wheatStageAData = {
data:'crops_wheatStageAData',
id:'crops_wheatStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_wheatStageA.glb',
},
};
//crops_wheatStageB
auxl.crops_wheatStageBData = {
data:'crops_wheatStageBData',
id:'crops_wheatStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_wheatStageB.glb',
},
};
//crops_cornStageB
auxl.crops_cornStageBData = {
data:'crops_cornStageBData',
id:'crops_cornStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageB.glb',
},
};
//crops_cornStageC
auxl.crops_cornStageCData = {
data:'crops_cornStageCData',
id:'crops_cornStageC',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_cornStageC.glb',
},
};
//crops_leafsStageA
auxl.crops_leafsStageAData = {
data:'crops_leafsStageAData',
id:'crops_leafsStageA',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_leafsStageA.glb',
},
};
//crops_leafsStageB
auxl.crops_leafsStageBData = {
data:'crops_leafsStageBData',
id:'crops_leafsStageB',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/crops_leafsStageB.glb',
},
};
//statue_head
auxl.statue_headData = {
data:'statue_headData',
id:'statue_head',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(3,3,3),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/statue_head.glb',
},
};
//rockFormationLarge
auxl.rockFormationLargeData = {
data:'rockFormationLarge',
id:'rockFormationLarge',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationLarge.glb',
},
};
//rockFormationMedium
auxl.rockFormationMediumData = {
data:'rockFormationMedium',
id:'rockFormationMedium',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationMedium.glb',
},
};
//rockFormationSmall
auxl.rockFormationSmallData = {
data:'rockFormationSmall',
id:'rockFormationSmall',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(5,5,5),
animations:false,
mixins: false,
classes: ['a-ent'],
components:{
['gltf-model']:'./assets/3d/kenny/rockFormationSmall.glb',
},
};

//
//Scene Gen Data

//Floating Island Forest
//
//Tiny
auxl.tinyForest2Data = {
data: 'tinyForest2Data',
id: 'tinyForest2',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.flower_redAData,
auxl.mushroom_redGroupData,
auxl.mushroom_redTallData,
auxl.crop_melonData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallForest2Data = {
data: 'smallForest2Data',
id: 'smallForest2',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.grass_largeData,
],
ranYPos: false,
yPosFlex: 6,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medForest2Data = {
data: 'medForest2Data',
id: 'medForest2',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.plant_bushData,
auxl.tree_simpleData,
auxl.tree_smallData,
auxl.tree_thinData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeForest2Data = {
data: 'largeForest2Data',
id: 'largeForest2',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.tree_plateauData,
auxl.tree_tallData,
auxl.tree_coneData,
auxl.tree_defaultData,

],
ranYPos: false,
yPosFlex: 2,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeForest2Data = {
data: 'hugeForest2Data',
id: 'hugeForest2',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.tree_fatData,
auxl.tree_oakData,
auxl.rock_tallAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Forest Scene 2 Data
auxl.forestScene2Data = {
data:'forestScene2Data',
id:'forestScene2',
tiny: auxl.tinyForest2Data,
small: auxl.smallForest2Data,
med: auxl.medForest2Data,
large: auxl.largeForest2Data,
huge: auxl.hugeForest2Data,
};
auxl.forestScene2 = auxl.MultiAssetGen(auxl.forestScene2Data);
//Rainy Forest
//
//Tiny
auxl.tinyForest1Data = {
data: 'tinyForest1Data',
id: 'tinyForest1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.flower_purpleAData,
auxl.flower_yellowAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallForest1Data = {
data: 'smallForest1Data',
id: 'smallForest1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.grass_leafsLargeData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medForest1Data = {
data: 'medForest1Data',
id: 'medForest1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.plant_bushLargeData,
auxl.tree_pineRoundCData,
auxl.tree_pineRoundDData,
auxl.tree_pineRoundEData,
auxl.tree_pineRoundFData,
auxl.tree_pineSmallAData,
auxl.tree_pineSmallBData,
auxl.tree_pineSmallCData,
auxl.tree_pineSmallDData,
auxl.trunkData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeForest1Data = {
data: 'largeForest1Data',
id: 'largeForest1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.pineCrookedData,
auxl.tree_pineRoundAData,
auxl.tree_pineRoundBData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkLongData,
auxl.logData,
auxl.rock_tallBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeForest1Data = {
data: 'hugeForest1Data',
id: 'hugeForest1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.rockSmallData,
auxl.rockLargeData,
auxl.pineData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
auxl.tree_pineDefaultAData,
auxl.tree_pineDefaultBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Forest Scene 1 Data
auxl.forestScene1Data = {
data:'forestScene1Data',
id:'forestScene1',
tiny: auxl.tinyForest1Data,
small: auxl.smallForest1Data,
med: auxl.medForest1Data,
large: auxl.largeForest1Data,
huge: auxl.hugeForest1Data,
};
auxl.forestScene1 = auxl.MultiAssetGen(auxl.forestScene1Data);
//Snowy Forest
//
//Tiny
auxl.tinySnowForest1Data = {
data: 'tinySnowForest1Data',
id: 'tinySnowForest1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallSnowForest1Data = {
data: 'smallSnowForest1Data',
id: 'smallSnowForest1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.snowmanData,
auxl.snowmanFancyData,
auxl.treeDecoratedData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medSnowForest1Data = {
data: 'medSnowForest1Data',
id: 'medSnowForest1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.treePineSnowRoundData,
auxl.treePineSnowedData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeSnowForest1Data = {
data: 'largeSnowForest1Data',
id: 'largeSnowForest1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.treePineSnowData,
auxl.rocksData,
auxl.snowFortData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeSnowForest1Data = {
data: 'hugeSnowForest1Data',
id: 'hugeSnowForest1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.treePineSnowedData,
auxl.rocksTallData,
auxl.snowPatchData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Snow Forest Scene 1 Data
auxl.snowForestScene1Data = {
data:'snowForestScene1Data',
id:'snowForestScene1',
tiny: auxl.tinySnowForest1Data,
small: auxl.smallSnowForest1Data,
med: auxl.medSnowForest1Data,
large: auxl.largeSnowForest1Data,
huge: auxl.hugeSnowForest1Data,
};
auxl.snowForestScene1 = auxl.MultiAssetGen(auxl.snowForestScene1Data);
//Graveyard
//
//Tiny
auxl.tinyGraveyard1Data = {
data: 'tinyGraveyard1Data',
id: 'tinyGraveyard1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.pumpkinData,
auxl.pumpkinCarvedData,
auxl.pumpkinTallData,
auxl.pumpkinTallCarvedData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallGraveyard1Data = {
data: 'smallGraveyard1Data',
id: 'smallGraveyard1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.gravestoneBevelData,
auxl.gravestoneBrokenData,
auxl.gravestoneCrossData,
auxl.gravestoneDebrisData,
auxl.gravestoneFlatData,
auxl.trunkData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medGraveyard1Data = {
data: 'medGraveyard1Data',
id: 'medGraveyard1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.ghostData,
auxl.gravestoneCrossLargeData,
auxl.gravestoneDecorativeData,
auxl.gravestoneFlatOpenData,
auxl.gravestoneRoofData,
auxl.gravestoneRoundData,
auxl.gravestoneWideData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeGraveyard1Data = {
data: 'largeGraveyard1Data',
id: 'largeGraveyard1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.debrisData,
auxl.debrisWoodData,
auxl.fenceDamagedData,
auxl.graveData,
auxl.shovelDirtData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkData,
auxl.trunkLongData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeGraveyard1Data = {
data: 'hugeGraveyard1Data',
id: 'hugeGraveyard1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.crossData,
auxl.crossColumnData,
auxl.crossWoodData,
auxl.tree_pineTallA_detailedData,
auxl.tree_pineTallB_detailedData,
auxl.tree_pineTallC_detailedData,
auxl.tree_pineTallD_detailedData,
auxl.trunkData,
auxl.trunkLongData,
auxl.tree_pineGroundAData,
auxl.tree_pineGroundBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Graveyard Scene 1 Data
auxl.graveyardScene1Data = {
data:'graveyardScene1Data',
id:'graveyardScene1',
tiny: auxl.tinyGraveyard1Data,
small: auxl.smallGraveyard1Data,
med: auxl.medGraveyard1Data,
large: auxl.largeGraveyard1Data,
huge: auxl.hugeGraveyard1Data,
};
auxl.graveyardScene1 = auxl.MultiAssetGen(auxl.graveyardScene1Data);
//Desert
//
//Tiny
auxl.tinyDesert1Data = {
data: 'tinyDesert1Data',
id: 'tinyDesert1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_cornStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallDesert1Data = {
data: 'smallDesert1Data',
id: 'smallDesert1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.cactus_shortData,
auxl.crops_cornStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medDesert1Data = {
data: 'medDesert1Data',
id: 'medDesert1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.cactus_tallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeDesert1Data = {
data: 'largeDesert1Data',
id: 'largeDesert1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.cactus_shortData,
auxl.cactus_tallData,

],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeDesert1Data = {
data: 'hugeDesert1Data',
id: 'hugeDesert1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.cactus_shortData,
auxl.cactus_tallData,
auxl.rockFormationSmallData,
auxl.rockFormationMediumData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 6,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Desert Scene 1 Data
auxl.desertScene1Data = {
data:'desertScene1Data',
id:'desertScene1',
tiny: auxl.tinyDesert1Data,
small: auxl.smallDesert1Data,
med: auxl.medDesert1Data,
large: auxl.largeDesert1Data,
huge: auxl.hugeDesert1Data,
};
auxl.desertScene1 = auxl.MultiAssetGen(auxl.desertScene1Data);
//Beach
//
//Tiny
auxl.tinyBeach1Data = {
data: 'tinyBeach1Data',
id: 'tinyBeach1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_bambooStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallBeach1Data = {
data: 'smallBeach1Data',
id: 'smallBeach1',
type: 'small',
radius: 0.25,
min: 10,
max: 25,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.crops_bambooStageAData,
auxl.crops_bambooStageBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medBeach1Data = {
data: 'medBeach1Data',
id: 'medBeach1',
type: 'med',
radius: 1,
min: 15,
max: 30,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeBeach1Data = {
data: 'largeBeach1Data',
id: 'largeBeach1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeBeach1Data = {
data: 'hugeBeach1Data',
id: 'hugeBeach1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[
auxl.tree_palmData,
auxl.tree_palmBendData,
auxl.tree_palmDetailedShortData,
auxl.tree_palmDetailedTallData,
auxl.tree_palmShortData,
auxl.tree_palmTallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Beach Scene 1 Data
auxl.beachScene1Data = {
data:'beachScene1Data',
id:'beachScene1',
tiny: auxl.tinyBeach1Data,
small: auxl.smallBeach1Data,
med: auxl.medBeach1Data,
large: auxl.largeBeach1Data,
huge: auxl.hugeBeach1Data,
};
auxl.beachScene1 = auxl.MultiAssetGen(auxl.beachScene1Data);
//Underwater
//
//Tiny
auxl.tinyUnderwater1Data = {
data: 'tinyUnderwater1Data',
id: 'tinyUnderwater1',
type: 'tiny',
radius: 0.1,
min: 12,
max: 30,
//rings: [0,1],
rings: 1,
objs:[
auxl.crops_wheatStageAData,
auxl.crops_cornStageBData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Small
auxl.smallUnderwater1Data = {
data: 'smallUnderwater1Data',
id: 'smallUnderwater1',
type: 'small',
radius: 0.25,
min: 30,
max: 50,
//rings: [0,1,2],
rings: 2,
objs:[
auxl.crops_wheatStageBData,
auxl.crops_cornStageCData,
auxl.crops_leafsStageAData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Med
auxl.medUnderwater1Data = {
data: 'medUnderwater1Data',
id: 'medUnderwater1',
type: 'med',
radius: 1,
min: 25,
max: 50,
//rings: [1,2,3],
rings: 3,
objs:[
auxl.crops_wheatStageBData,
auxl.crops_cornStageCData,
auxl.crops_leafsStageAData,
auxl.crops_wheatStageAData,
auxl.crops_cornStageBData,
auxl.crops_leafsStageBData,
auxl.rockFormationSmallData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 2,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Large
auxl.largeUnderwater1Data = {
data: 'largeUnderwater1Data',
id: 'largeUnderwater1',
type: 'large',
radius: 2,
min: 25,
max: 50,
//rings: [2,3,4],
rings: 4,
objs:[
auxl.rockFormationMediumData,
auxl.statue_headData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Huge
auxl.hugeUnderwater1Data = {
data: 'hugeUnderwater1Data',
id: 'hugeUnderwater1',
type: 'huge',
radius: 4,
min: 25,
max: 50,
//rings: [3,4,5],
rings: 5,
objs:[

auxl.statue_headData,
auxl.rockFormationLargeData,
],
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
ranAnim: false,
};
//Underwater Scene 1 Data
auxl.underwaterScene1Data = {
data:'underwaterScene1Data',
id:'underwaterScene1',
tiny: auxl.tinyUnderwater1Data,
small: auxl.smallUnderwater1Data,
med: auxl.medUnderwater1Data,
large: auxl.largeUnderwater1Data,
huge: auxl.hugeUnderwater1Data,
};
auxl.underwaterScene1 = auxl.MultiAssetGen(auxl.underwaterScene1Data);

//
//Multi Obj Gen Data

//Grass Rock
auxl.multiRockFlatGrassData = {
data: 'multiRockFlatGrassData',
id: 'multiRockFlatGrass',
objData: auxl.rockFlatGrassData,
total: 20,
outerRingRadius: 140,
innerRingRadius: 80,
sameTypeRadius: 15,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: true,
ranScaleZ: true,
scaleFlex: 10,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiRockFlatGrass = auxl.ObjsGenRing(auxl.multiRockFlatGrassData);
//Flowers
auxl.multiFlowerPurpleAData = {
id: 'multiFlowerPurpleA',
objData: auxl.flower_purpleAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerPurpleA = auxl.ObjsGenRing(auxl.multiFlowerPurpleAData);
auxl.multiFlowerRedAData = {
id: 'multiFlowerRedA',
objData: auxl.flower_redAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerRedA = auxl.ObjsGenRing(auxl.multiFlowerRedAData);
auxl.multiFlowerYellowAData = {
id: 'multiFlowerYellowA',
objData: auxl.flower_yellowAData,
total: 5,
outerRingRadius: 10,
innerRingRadius: 1.5,
sameTypeRadius: 1,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 0.25,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiFlowerYellowA = auxl.ObjsGenRing(auxl.multiFlowerYellowAData);
//Grass
auxl.multiGrassLargeData = {
id: 'multiGrassLarge',
objData: auxl.grass_largeData,
total: 30,
outerRingRadius: 30,
innerRingRadius: 2,
sameTypeRadius: 3,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiGrassLarge = auxl.ObjsGenRing(auxl.multiGrassLargeData);
auxl.multiGrassLeafsLargeData = {
id: 'multiGrassLeafsLarge',
objData: auxl.grass_leafsLargeData,
total: 10,
outerRingRadius: 30,
innerRingRadius: 2,
sameTypeRadius: 4,
otherTypeRadius: 1,
ranYPos: false,
yPosFlex: 1,
ranScaleX: true,
ranScaleY: false,
ranScaleZ: true,
scaleFlex: 3,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multiGrassLeafsLarge = auxl.ObjsGenRing(auxl.multiGrassLeafsLargeData);
//Trees
auxl.multitree_pineGroundAData = {
id: 'multitree_pineGroundA',
objData: auxl.tree_pineGroundAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineGroundA = auxl.ObjsGenRing(auxl.multitree_pineGroundAData);
auxl.multitree_pineGroundBData = {
id: 'multitree_pineGroundB',
objData: auxl.tree_pineGroundBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineGroundB = auxl.ObjsGenRing(auxl.multitree_pineGroundBData);
auxl.multitree_pineRoundAData = {
id: 'multitree_pineRoundA',
objData: auxl.tree_pineRoundAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundA = auxl.ObjsGenRing(auxl.multitree_pineRoundAData);
auxl.multitree_pineRoundBData = {
id: 'multitree_pineRoundB',
objData: auxl.tree_pineRoundBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundB = auxl.ObjsGenRing(auxl.multitree_pineRoundBData);
auxl.multitree_pineRoundCData = {
id: 'multitree_pineRoundC',
objData: auxl.tree_pineRoundCData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundC = auxl.ObjsGenRing(auxl.multitree_pineRoundCData);
auxl.multitree_pineRoundDData = {
id: 'multitree_pineRoundD',
objData: auxl.tree_pineRoundDData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundD = auxl.ObjsGenRing(auxl.multitree_pineRoundDData);
auxl.multitree_pineRoundEData = {
id: 'multitree_pineRoundE',
objData: auxl.tree_pineRoundEData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundE = auxl.ObjsGenRing(auxl.multitree_pineRoundEData);
auxl.multitree_pineRoundFData = {
id: 'multitree_pineRoundF',
objData: auxl.tree_pineRoundFData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineRoundF = auxl.ObjsGenRing(auxl.multitree_pineRoundFData);
auxl.multitree_pineSmallAData = {
id: 'multitree_pineSmallA',
objData: auxl.tree_pineSmallAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallA = auxl.ObjsGenRing(auxl.multitree_pineSmallAData);
auxl.multitree_pineSmallBData = {
id: 'multitree_pineSmallB',
objData: auxl.tree_pineSmallBData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallB = auxl.ObjsGenRing(auxl.multitree_pineSmallBData);
auxl.multitree_pineSmallCData = {
id: 'multitree_pineSmallC',
objData: auxl.tree_pineSmallCData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallC = auxl.ObjsGenRing(auxl.multitree_pineSmallCData);
auxl.multitree_pineSmallDData = {
id: 'multitree_pineSmallD',
objData: auxl.tree_pineSmallDData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineSmallD = auxl.ObjsGenRing(auxl.multitree_pineSmallDData);
auxl.multitrunkData = {
id: 'multitrunk',
objData: auxl.trunkData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitrunk = auxl.ObjsGenRing(auxl.multitrunkData);
auxl.multitrunkLongData = {
id: 'multitrunkLong',
objData: auxl.trunkLongData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 1,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitrunkLong = auxl.ObjsGenRing(auxl.multitrunkLongData);
auxl.multipineData = {
id: 'multipine',
objData: auxl.pineData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multipine = auxl.ObjsGenRing(auxl.multipineData);
auxl.multipineCrookedData = {
id: 'multipineCrooked',
objData: auxl.pineCrookedData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multipineCrooked = auxl.ObjsGenRing(auxl.multipineCrookedData);
auxl.multitree_coneData = {
id: 'multitree_cone',
objData: auxl.tree_coneData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_cone = auxl.ObjsGenRing(auxl.multitree_coneData);
auxl.multitree_defaultData = {
id: 'multitree_default',
objData: auxl.tree_defaultData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 5,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_default = auxl.ObjsGenRing(auxl.multitree_defaultData);
auxl.multitree_fatData = {
id: 'multitree_fat',
objData: auxl.tree_fatData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_fat = auxl.ObjsGenRing(auxl.multitree_fatData);
auxl.multitree_oakData = {
id: 'multitree_oak',
objData: auxl.tree_oakData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_oak = auxl.ObjsGenRing(auxl.multitree_oakData);
auxl.multitree_pineDefaultAData = {
id: 'multitree_pineDefaultA',
objData: auxl.tree_pineDefaultAData,
total: 5,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineDefaultA = auxl.ObjsGenRing(auxl.multitree_pineDefaultAData);
auxl.multitree_pineDefaultBData = {
id: 'multitree_pineDefaultB',
objData: auxl.tree_pineDefaultBData,
total: 4,
outerRingRadius: 50,
innerRingRadius: 15,
sameTypeRadius: 3,
otherTypeRadius: 2,
ranYPos: false,
yPosFlex: 1,
ranScaleX: false,
ranScaleY: true,
ranScaleZ: false,
scaleFlex: 4,
ranRotX: false,
ranRotY: true,
ranRotZ: false,
ranColor: false,
ranTexture: false,
};
auxl.multitree_pineDefaultB = auxl.ObjsGenRing(auxl.multitree_pineDefaultBData);
//Singles
auxl.canoe = auxl.Core(auxl.canoeData);
auxl.canoe_paddle = auxl.Core(auxl.canoe_paddleData);

//
//NPCs

//NPC Overview
auxl.npcMintyTextBubbleData = {
data:'npc text bubble on top',
id:'npcMintyTextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.7, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,1.65,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npcMintyCubeTextBubbleData = {
data:'npc text bubble on top',
id:'npcMintyCubeTextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.7, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npcMintyCubeData = {
data:'NPC Minty',
id:'npcMinty',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0,1.1,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.15, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npcMintyData = {
data:'npcMinty',
id:'npcMinty',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0.1,-1.1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
morphtalk:{property: 'gltf-morph__talk.value', from: 0, to: 1, dur: 500, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['clickable','a-ent'],
components:{
['gltf-model']:'./assets/3d/avatar/mc1-1.glb',
//['animation-mixer']:{timeScale:1},
//['gltf-morph']:{morphtarget:'Fcl_ALL_Joy', value:1}
['gltf-morph__talk']:{morphtarget:'target_43', value:0},
},
};//VRM Avatar
auxl.npcMintyBookTestPage1Data = {
info:{
id:'npcMintyBookTestPage1',
description:'An explainer NPC to show off the AUXL system.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npcMinty:{Speak:{role: 'Minty', speech:'Hello and thank you for visiting!'}},
},
timeline1:{
npcMinty:{Speak:{role: 'Minty', speech:'My digital name is Minty Crisp (irl you can call me Justin), it\'s nice to meet you.'}},
},
timeline2:{
npcMinty:{Speak:{role: 'Minty', speech:'You can find more about me, if you are interested in supporting my work or interested in collaborating with me at mintycrisp.com .'}},
},
timeline3:{
npcMinty:{Speak:{role: 'Minty', speech:'Today I will show something I\'ve been dreaming up for a while as a way to create more interesting and dynamic XR scenes.'}},
},
timeline4:{
npcMinty:{Speak:{role: 'Minty', speech:'The A-Frame UX Library v0.1 Engine or AUXL for short.'}},
},
timeline5:{
npcMinty:{Speak:{role: 'Minty', speech:'AUXL provides a variety of critical object, scene and scenario building tools at the javascript level that allows for a more streamlined creation process.'}},
},
timeline6:{
npcMinty:{Speak:{role: 'Minty', speech:'It\'s basically a Javascript scripting system and JSON structured data library with various UX add-ons built for the A-Frame XR renderer.'}},
},
timeline7:{
npcMinty:{Speak:{role: 'Minty', speech:'The AUXL XR Engine is still very much a work in progress being released under the MIT license, but it\'s ready to be shared and tested while I continue improvements as well as additional features.'}},
},
timeline8:{
npcMinty:{Speak:{role: 'Minty', speech:'To better understand what AUXL can currently do currently, I\'ll explain some of the important features we can see in action now.'}},
},
timeline9:{
npcMinty:{Speak:{role: 'Minty', speech:'We\'ll start with the most basic function of the AUXL system which is creating in-scene objects.'}},
},
timeline10:{
npcMinty:{Speak:{role: 'Minty', speech:'To create an in-scene object, we start with a Library Data Object.'}},
},
timeline11:{
npcMinty:{Speak:{role: 'Minty', speech:'A Library Data Object is a JSON structured variable that contains all of the necessary information to spawn an object in-scene.'}},
},
timeline12:{
npcMinty:{Speak:{role: 'Minty', speech:'It includes information such as ID, Settings, Geometry, Model, Material, Text, Position, Rotation, Scale, Animations, Mixins, Classes & Components.'}},
},
timeline13:{
npcMinty:{Speak:{role: 'Minty', speech:'This structure allows for creating presets of objects as well as libraries of smaller data to mix and match for greater diversity and control.'}},
},
timeline14:{
npcMinty:{Speak:{role: 'Minty', speech:'That set of information is then used to form a Library Core Object.'}},
},
timeline15:{
npcMinty:{Speak:{role: 'Minty', speech:'The Library Core Object provides the vital functions like a spawn controller, the access to and editing of the object, object specific flag checks and settings as well as event support.'}},
},
timeline16:{
npcMinty:{Speak:{role: 'Minty', speech:'That provides you with major core functions like core.SpawnCore(), core.DespawnCore(), core.ChangeSelf(), core.Animate(), core.EmitEvent(), core.SetFlag(), core.GetFlag(), core.ClickRun(), etc...'}},
},
timeline17:{
npcMinty:{Speak:{role: 'Minty', speech:'As well as minor support functions like core.GetEl() to connect with the object in-scene.'}},
},
timeline18:{
npcMinty:{Speak:{role: 'Minty', speech:'The next step up from this single Core object is to combine multiple Cores into a Library Layered Object.'}},
},
timeline19:{
npcMinty:{Speak:{role: 'Minty', speech:'We start from a single Parent Core and add additional children/grandchildren Cores to build out a more complex object.'}},
},
timeline20:{
npcMinty:{Speak:{role: 'Minty', speech:'The layered object provides wrapped function access to control the Layer like a single object as well as accessing any individual parts.'}},
},
timeline21:{
npcMinty:{Speak:{role: 'Minty', speech:'Functions like layer.SpawnLayer(), layer.DespawnLayer(), layer.ChangeParent(), layer.ChangeAll(), layer.AnimateParent(), layer.AnimateAll(), layer.GetChild(), etc...'}},
},
timeline22:{
npcMinty:{Speak:{role: 'Minty', speech:'With access to just these Cores and Layers, we can already start to build out an XR scene and provide some interactions.'}},
},
timeline23:{
npcMinty:{Speak:{role: 'Minty', speech:'At this point we\'ve basically got a Javascript Entity Spawner that creates A-Frame HTML entities with all our given properties.'}},
},
timeline24:{
npcMinty:{Speak:{role: 'Minty', speech:'Combine these Core/Layer functions with any A-Frame components to give objects all the advanced controls you require and update them on the fly.'}},
},
timeline25:{
npcMinty:{Speak:{role: 'Minty', speech:'Using this method of a JSON Data set, Core object and Layered object creation, we can build out a Library of objects to be used in our scenes and scenarios.'}},
},
timeline26:{
npcMinty:{Speak:{role: 'Minty', speech:'From this Library of prebuilt objects, we can define a scene layout and even create a map to connect our scenes together.'}},
},
timeline27:{
npcMinty:{Speak:{role: 'Minty', speech:'An individual area on a Map is called a Node Scene.'}},
},
timeline28:{
npcMinty:{Speak:{role: 'Minty', speech:'The Node Scene defines the overall layout of the entire scene built from Cores and Layers.'}},
},
timeline29:{
npcMinty:{Speak:{role: 'Minty', speech:'You can specify that objects do something at node start, after a delay, on interval, on interaction, on event, on exit, etc...'}},
},
timeline30:{
npcMinty:{Speak:{role: 'Minty', speech:'You have access to all the Core and Layer functions like spawning, despawning, animating, changing, etc...'}},
},
timeline31:{
npcMinty:{Speak:{role: 'Minty', speech:'Additionaly, the Node Scene script allows you customize the object actions with If|If/Else conditional checking and flag setting.'}},
},
timeline32:{
npcMinty:{Speak:{role: 'Minty', speech:'Connecting multiple Node Scenes, you can create a Zone Map that allows for travel like Scene Swapping.'}},
},
timeline33:{
npcMinty:{Speak:{role: 'Minty', speech:'The Zone Map allows you to configure Core|Layer objects that would belong to a generalized area and wouldn\'t normally be swapped out when traveling between nodes unless you enter a new zone.'}},
},
timeline34:{
npcMinty:{Speak:{role: 'Minty', speech:'Nodes and Zones can be used to build out maps of all complexities in addition to supporting If|If/Else conditional checking and flag setting for travel control.'}},
},
timeline35:{
npcMinty:{Speak:{role: 'Minty', speech:'An example to better understand the concept is to think about if you wanted to recreate traveling between rooms within a House and then exiting the house to the outside world of the town you live in.'}},
},
timeline36:{
npcMinty:{Speak:{role: 'Minty', speech:'The Zone would define the basic room shape and textures, but each node fills in all the room details.'}},
},
timeline37:{
npcMinty:{Speak:{role: 'Minty', speech:'You start in the living room and a couch spawns, the wall changes to a window and move to a bedroom which despawns couch and adds a bed then changes another wall to a doorway.'}},
},
timeline38:{
npcMinty:{Speak:{role: 'Minty', speech:'When you finally exit outside, all Zone walls and node objects despawn then the Outside zone takes over and adds your house, then street items as if you walked outside.'}},
},
timeline39:{
npcMinty:{Speak:{role: 'Minty', speech:'That brings us up to Cores, Layers, Node Scenes and Zone Maps so far that we can script into a scenario.'}},
},
timeline40:{
npcMinty:{Speak:{role: 'Minty', speech:'An important support function is the actual Player which is built from a Layered object to be an adjustable controller with swapping support for VR and non-VR use.'}},
},
timeline41:{
npcMinty:{Speak:{role: 'Minty', speech:'The Player Layer rig has animations set up to assist in Scene Swapping without discomfort using various transitions too.'}},
},
timeline42:{
npcMinty:{Speak:{role: 'Minty', speech:'Some basic UX features that add additional interaction ability and scene functions we have the ability to generate menus, an open/close detailed prompt and image swapper viewer.'}},
},
timeline43:{
npcMinty:{Speak:{role: 'Minty', speech:'You can generate a Menu with a Prompt and Options for the player to choose from and have it execute what on selection.'}},
},
timeline44:{
npcMinty:{Speak:{role: 'Minty', speech:'For example, we use a Menu to display all the Travel options that allow the player to move between Nodes and Zones.'}},
},
timeline45:{
npcMinty:{Speak:{role: 'Minty', speech:'You can also add an open/closed detailed prompt to an object to access more info on it.'}},
},
timeline46:{
npcMinty:{Speak:{role: 'Minty', speech:'As well as view images within a swapping like view controller.'}},
},
timeline47:{
npcMinty:{Speak:{role: 'Minty', speech:'Additionaly, in keeping with the idea of classic 2D sites that utilize a Hamburger Menu to control your website URL switching, you can also add a Hamburger Companion.'}},
},
timeline48:{
npcMinty:{Speak:{role: 'Minty', speech:'The Companion allows the player access to a main menu. They can make setting changes, view info and otherwise assist in experiencing the XR world!'}},
},
timeline49:{
npcMinty:{Speak:{role: 'Minty', speech:'And then we have a NPC like Book|Page speech and interaction scripting system.'}},
},
timeline50:{
npcMinty:{Speak:{role: 'Minty', speech:'The NPC like system allows you to define various speech scenarios you can interact with.'}},
},
timeline51:{
npcMinty:{Speak:{role: 'Minty', speech:'The speech system also supports conditionals, flags, menus and jumps to provide a tree like conversation flow.'}},
},
timeline52:{
npcMinty:{Speak:{role: 'Minty', speech:'We also have some environmental features to help fill out various scenes with a single object procedural spawner and a multiple object procedural spawner which you will see both in action here.'}},
},
timeline53:{
npcMinty:{Speak:{role: 'Minty', speech:'There is additionally a Day/Night system that utilizes scene wide lighting to help with environment realism as well.'}},
},
timeline54:{
npcMinty:{Speak:{role: 'Minty', speech:'To help explore the scene we also have basic movement locomotion supported on Desktop, Mobile & VR in addition to Teleportation points to help quick move the player around.'}},
},
timeline55:{
npcMinty:{Speak:{role: 'Minty', speech:'And finally, we have a simple Memory mini-game just for fun!'}},
},
timeline56:{
npcMinty:{Speak:{role: 'Minty', speech:'That is a basic overview of all the current features provided by AUXL v0.1.'}},
},
timeline57:{
npcMinty:{Speak:{role: 'Minty', speech:'Thank you for taking the time to visit and learn!'}},
},
timeline58:{
npcMinty: {ResetBook: true},
},
};
auxl.npcMintyBookTestData = {
info:{
id:'npcMintyBookTest',
description:'An explainer NPC to show off the AUXL system.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npcMintyBookTestPage1Data,
},
};
//auxl.npcMintyCore = auxl.Core(auxl.npcMintyData);//VRM Avatar
auxl.npcMintyCore = auxl.Core(auxl.npcMintyCubeData);
auxl.npcMintyTextBubble = auxl.Core(auxl.npcMintyCubeTextBubbleData);
auxl.npcMinty = auxl.NPC(auxl.npcMintyCore, auxl.npcMintyBookTestData, auxl.npcMintyTextBubble);

//NPC 0
auxl.npc0TextBubbleData = {
data:'npc text bubble on top',
id:'npc0TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc0Data = {
data:'NPC 0',
id:'npc0',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.3,1,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc0BookTestPage1Data = {
info:{
id:'npc0BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc0:{Speak:{role: 'Dev', speech:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac metus sodales, rhoncus tellus at, pretium mi.'}, SetFlag:{flag: 'testSpeechVar', value: false},},
player:{SetFlag:{flag: 'testSpeechVar', value: true},},
},
timeline1:{
spawnTesting:{SpawnCore:null},
npc0:{IfElse: {player:{cond: 'testSpeechVar',
ifTrue: {
npc0:{Speak:{role: 'Dev', speech:'Is True'}},},
ifFalse: {
npc0:{Speak:{role: 'Dev', speech:'Is False'}},},}}},
},
timeline2:{
//npc0:{Speak:{role: 'Dev', speech:'Jump to Text section.'}, SelectJump:[['Answer 1','timeline3'], ['Answer 2','timeline4'], ['Answer 3','timeline5']]},
npc0:{Speak:{role: 'Dev', speech:'Jump to Text section.'}, SelectJump:[['Answer 1','timeline3'], ['Answer 2','timeline4'], ['Answer 3','timeline5'],]},
},
timeline3:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 1 section.'}, Jump: {timeline: 'timeline6'}},
},
timeline4:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 2 section.'}, Jump: {timeline: 'timeline6'}},
},
timeline5:{
npc0:{Speak:{role: 'Dev', speech:'Jumped to the Answer 3 section.'}},
},
timeline6:{
npc0:{Speak:{role: 'Dev', speech:'Nullam sed ante a velit porttitor semper. Donec quis lacus a tellus interdum venenatis.'}},
},
timeline7:{
npc0:{Speak:{role: 'Dev', speech:'End and Restart'}},
},
timeline8:{
npc0: {ResetBook: true},
},

};
auxl.npc0BookTestData = {
info:{
id:'npc0BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc0BookTestPage1Data,
},
};
auxl.npc0Core = auxl.Core(auxl.npc0Data);
auxl.npc0TextBubble = auxl.Core(auxl.npc0TextBubbleData);
auxl.npc0 = auxl.NPC(auxl.npc0Core, auxl.npc0BookTestData, auxl.npc0TextBubble);

//NPC 1
auxl.npc1TextBubbleData = {
data:'npc text bubble on top',
id:'npc1TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc1Data = {
data:'NPC 1',
id:'npc1',
sources: false,
text: {value:'^-^', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.3,1,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc1BookTestPage1Data = {
info:{
id:'npc1BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc1',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc1:{Speak:{role: 'Ham', speech:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac metus sodales, rhoncus tellus at, pretium mi.'}},
},
timeline1:{
npc1:{Speak:{role: 'Ham', speech:'Cras lobortis est enim, in vulputate odio ullamcorper in. In lobortis metus nec justo blandit, a lobortis nunc pretium.'}},
},
timeline2:{
npc1:{Speak:{role: 'Ham', speech:'Donec finibus massa ut tortor dapibus laoreet. Ut diam nulla, rhoncus eu turpis sed, viverra eleifend nulla. '}},
},
timeline3:{
npc1:{Speak:{role: 'Ham', speech:'Suspendisse accumsan nunc eros, et porta tellus ornare nec. Donec at velit non orci pretium mattis sit amet ac nunc.'}},
},
timeline4:{
npc1:{Speak:{role: 'Ham', speech:'Duis sollicitudin eros venenatis orci luctus, eu volutpat mauris condimentum. Ut aliquam orci in quam elementum, vel elementum nisi posuere.'}},
},
timeline5:{
npc1:{Speak:{role: 'Ham', speech:'Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus eleifend enim porta lacus consequat, nec pulvinar sem efficitur.'}},
},
timeline6:{
npc1:{Speak:{role: 'Ham', speech:'Nullam congue eleifend massa, sed fermentum enim porttitor ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'}},
},
timeline7:{
npc1:{Speak:{role: 'Ham', speech:'Pellentesque posuere purus vel molestie bibendum. Nunc at hendrerit risus. Donec id urna elit.'}},
},
timeline8:{
npc1:{Speak:{role: 'Ham', speech:'Proin interdum ut mauris sed pharetra. Suspendisse a nisl fringilla, feugiat ligula sed, placerat lacus.'}},
},
timeline9:{
npc1:{Speak:{role: 'Ham', speech:'Mauris vulputate tincidunt velit, id maximus augue porta eget. Vivamus mattis sapien purus, vel mattis felis posuere a.'}},
},
timeline10:{
npc1:{Speak:{role: 'Ham', speech:'Curabitur et condimentum velit, vel fermentum magna. Nulla ligula dolor, dapibus a nisl quis, blandit volutpat nibh.'}},
},
timeline11:{
npc1:{Speak:{role: 'Ham', speech:'Quisque iaculis venenatis sem, vel fermentum nisi volutpat id. Praesent nulla libero, scelerisque porta est ac, aliquam consequat tortor.'}},
},
timeline12:{
npc1:{Speak:{role: 'Ham', speech:'Fusce congue et lacus ac sagittis. Sed mi quam, pulvinar pretium convallis vel, egestas sit amet ipsum. Maecenas aliquam sit amet nulla at gravida.'}},
},
timeline13:{
npc1:{Speak:{role: 'Ham', speech:'Ut ullamcorper nunc in tortor accumsan congue et et dolor. Sed pulvinar nec nulla posuere finibus.'}},
},
timeline14:{
npc1:{Speak:{role: 'Ham', speech:'Vivamus turpis urna, dignissim non ante vel, suscipit hendrerit urna. Nam a ligula id arcu faucibus ornare in in odio.'}},
},
timeline15:{
npc1:{Speak:{role: 'Ham', speech:'Nulla mattis nisi non felis tempus blandit. Quisque quis scelerisque massa. Quisque lacinia blandit ultrices.'}},
},
timeline16:{
npc1:{Speak:{role: 'Ham', speech:'Quisque ut sollicitudin mauris, et sodales dui. Sed pretium leo sit amet euismod maximus.'}},
},
timeline17:{
npc1:{Speak:{role: 'Ham', speech:'Integer at suscipit turpis. Mauris dignissim orci at iaculis malesuada.'}},
},
timeline18:{
npc1:{Speak:{role: 'Ham', speech:'Jump to Text section.'}, SelectJump:[['Timeline 19','timeline19'], ['Timeline 20','timeline20'], ['Timeline 21','timeline21']]},
},
timeline19:{
npc1:{Speak:{role: 'Ham', speech:'timeline19'}, Jump: {timeline: 'timeline22'}},
},
timeline20:{
npc1:{Speak:{role: 'Ham', speech:'timeline20'},Jump: {timeline: 'timeline22'}},
},
timeline21:{
npc1:{Speak:{role: 'Ham', speech:'timeline21'}},
},
timeline22:{
npc1:{Speak:{role: 'Ham', speech:'Nullam sed ante a velit porttitor semper. Donec quis lacus a tellus interdum venenatis.'}},
},
timeline23:{
npc1:{Speak:{role: 'Ham', speech:'Quisque auctor interdum mi faucibus malesuada. Maecenas tristique ac justo sit amet fermentum.'}},
},
timeline24:{
npc1:{Speak:{role: 'Ham', speech:'Praesent fermentum nunc nisl, a porttitor magna laoreet quis. Morbi elementum pulvinar ante sit amet dapibus.'}},
},
timeline25:{
npc1:{Speak:{role: 'Ham', speech:'Fusce ac magna sit amet ipsum luctus mattis. Nunc eu metus eros. Fusce a tempus est.'}},
},
timeline26:{
npc1:{Speak:{role: 'Ham', speech:'In rutrum turpis ut dictum semper. Sed euismod, erat vel dignissim porttitor, sapien diam tristique sapien, ut viverra nisl diam ut quam.'}},
},
timeline27:{
npc1:{Speak:{role: 'Ham', speech:'End and Restart'}},
},
timeline28:{
npc1: {Restart: null},
},

};
auxl.npc1BookTestData = {
info:{
id:'npc1BookTest',
description:'A basic example of a NPC.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc1BookTestPage1Data,
},
};
auxl.npc1Core = auxl.Core(auxl.npc1Data);
auxl.npc1TextBubble = auxl.Core(auxl.npc1TextBubbleData);
auxl.npc1 = auxl.NPC(auxl.npc1Core, auxl.npc1BookTestData, auxl.npc1TextBubble);

//NPC 2
auxl.npc2TextBubbleData = {
data:'npc text bubble on top',
id:'npc2TextBubble',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 0.75, zOffset: 0.025, side: 'front', wrapCount: 45, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.8, height: 0.15},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.25,0.25,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',},
};
auxl.npc2Data = {
data:'NPC 2',
id:'npc2',
sources: false,
text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
position: new THREE.Vector3(0.5,1,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 1.4, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 280, to: 320, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: false}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera', 
},
};
auxl.npc2BookTestPage1Data = {
info:{
id:'npc2BookTestPage1',
description:'A basic example of a NPC with Speech.',
tags:'npc',
nextPage: null,
prevPage: null,
timeline:'linear',
},
timeline0:{
npc2:{IfElse: {npc2:{cond: 'masterKey',
ifTrue: {
npc2:{Speak:{role: 'Ham', speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline2'},},
},ifFalse: {
npc2:{Speak:{role: 'Ham', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},},}}},
},
timeline1:{
npc2:{Speak:{role: 'Ham', speech:'Here you go!'}, SetFlag: {flag: 'masterKey', value: true}},
player:{AddToInventory: 'masterKey'},
//player:{AddToInventory: ['masterKey1','masterKey2','masterKey3']},
},
timeline2:{
npc2:{Speak:{role: 'Ham', speech:'Good luck finding where it goes!'}},
},
timeline3:{
npc2: {ResetBook: true},
},
};
auxl.npc2BookTestData = {
info:{
id:'npc2BookTest',
description:'A basic example of a NPC giving a Key.',
tags:'npc',
timeline: 'linear',
},
//pages
pages:{
page0: auxl.npc2BookTestPage1Data,
},
};
auxl.npc2Core = auxl.Core(auxl.npc2Data);
auxl.npc2TextBubble = auxl.Core(auxl.npc2TextBubbleData);
auxl.npc2 = auxl.NPC(auxl.npc2Core, auxl.npc2BookTestData, auxl.npc2TextBubble);

    },
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('auxl-scenes', {
	dependencies: ['auxl'],
    //schema: {
        //clickObj: {type: 'string', default: 'auxlObj'}
    //},
    init: function () {
		//console.log('AUXL Scenes INIT');
		//AUXL System
		const auxl = document.querySelector('a-scene').systems.auxl;

//
//Scenarios

//Scenario Demo Example
//
//scenarioDemo
auxl.scenarioDemoData = {
info:{
id: 'scenarioDemo',
name: 'Example Demo',
scenarioNum: 0,
default: true,
startZone: 'zone0',
instructions: 'A demo scenario of traversing a variety of different areas and showcasing the core features and functionality of the A-Frame UX Library engine v0.2.',
},
controls:{
//altDown:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//altUp:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action1Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action1Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action2Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action2Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action3Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action3Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action4Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action4Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action5Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action5Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action6Down:{auxlObj: 'auxlObj', component: false, func: 'Name'},
//action6Up:{auxlObj: 'auxlObj', component: false, func: 'Name'},

//auxl.player.SnapLeft();
//auxl.player.SnapRight();

action1Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed'},
action5Down:{auxlObj: 'player', component: false, func: 'ToggleCrouch'},
action6Down:{auxlObj: 'player', component: false, func: 'ToggleSittingMode'},

},
start:{
skyBox0:{SpawnSkyBox: null},
nodeFloor:{SpawnCore: null},
clouds:{SpawnLayer: null},
ham:{SpawnHam:null},
},
delay:{
100:{
skyBox0:{DayNightCycle: null},
},
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
auxl.scenarioDemo = auxl.Scenario(auxl.scenarioDemoData);

//
//World Atlas MapZones & NodeScenes

//Floating Island - Connects to all zones
//
//Zone 0
auxl.zone0Data = {
info:{
id: 'zone0',
name: 'Zone0',
zoneNum: 0,
start: 'zone0Node0',
},
zone0Node0:{
connect0: {inZone: 'zone1', node: 'zone1Node0',},
connect1: {inZone: 'zone2', node: 'zone2Node0',},
connect2: {inZone: 'zone3', node: 'zone3Node0',},
connect3: {inZone: 'zone4', node: 'zone4Node0',},
connect4: {inZone: 'zone5', node: 'zone5Node0',},
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
//Node 0
auxl.zone0Node0Data = {
info:{
id:'zone0Node0',
name: 'Floating Island',
description: 'Click anywhere on the floor to teleport on this island!',
sceneText: true,
},
controls:{

},
start:{
nodeFloor:{ChangeSelf:[{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#27693d", emissive: "#27693d",},},{property: 'position', value: new THREE.Vector3(0,0,0),},{property: 'raycast-teleportation', value: null,}],},
forestScene2:{SpawnMultiAsset:null},
multiRockFlatGrass:{SpawnObjRing :null},
npcMinty:{SpawnNPC:null},
horizonBuildings2:{SpawnHorizon:null},
soundTesting:{SpawnCore:null},
teleportPortal1:{SpawnCore:null},
teleportPortal2:{SpawnCore:null},
//testing:{SpawnCore:null},
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
nodeFloor:{RemoveComponent:'raycast-teleportation'},
},
map:{
data: auxl.zone0Data.zone0Node0,
},
};
//Node Scene 0
auxl.zone0Node0 = auxl.SceneNode(auxl.zone0Node0Data);
//Map Zone 0
auxl.zone0 = auxl.MapZone(auxl.zone0Data);

//Snow Mountains w/Underground Cave
//
//Zone 1
auxl.zone1Data = {
info:{
id: 'zone1',
name: 'Zone1',
zoneNum: 0,
start: 'zone1Node0',
},
zone1Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: true, node: 'zone1Node1',},
connect2: {inZone: 'zone2', node: 'zone2Node0',},
},
zone1Node1:{
connect0: {inZone: true, node: 'zone1Node0',},
},
controls:{

},
start:{

},
delay:{
2000:{
//player:{UpdateTransitionColor:'red',},
},
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
//Node 0
auxl.zone1Node0Data = {
info:{
id:'zone1Node0',
name: 'Snowy Mountains',
description: 'Open Tundra',
sceneText: true,
},
controls:{

},
start:{
teleport:{SpawnTeleport:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern69, repeat: '150 150',color: "#d6a9ba", emissive: "#d6a9ba",},}},
snowForestScene1:{SpawnMultiAsset:null},
npc1:{SpawnNPC: null},
horizonMountains2:{SpawnHorizon: null},
multiSnowMountainsBasic:{SpawnObjRing: null},
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
data: auxl.zone1Data.zone1Node0,
},
};
//Node 1
auxl.zone1Node1Data = {
info:{
id:'zone1Node1',
name: 'Mountain Cave',
description: 'Underground Shelter',
sceneText: true,
},
controls:{

},
start:{
teleport0:{SpawnTeleport:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern37, repeat: '150 150',color: "#bc8fa0", emissive: "#bc8fa0",},}},
//nodeWalls: {SpawnLayer: null,ChangeAll:{property: 'material', value: {src: auxl.pattern81, repeat: '5 1.25', color: "#bc8fa0", emissive: "#bc8fa0",}}},
horizonWalls4:{SpawnHorizon: null},
eventTesting:{SpawnCore: null, EnableDetail: {text: 'This shows various ways to utilize Delay, Interval, Events and Interactions to affect the scene.', textColor: 'black', windowColor: 'white', windowWidth: 2, windowHeight: 2}},
eventTesting2:{SpawnCore: null, EnableDetail: {text: 'This also shows various ways to utilize Delay, Interval, Events and Interactions to affect the scene.'}},
eventTesting3:{SpawnCore: null,},
eventTesting4:{SpawnCore: null,},
smallCeiling: {SpawnCore: null,ChangeSelf:{property: 'material', value: {src: auxl.pattern76, repeat: '10 10', color: "#9b7a87", emissive: "#9b7a87",}}},
},
delay:{

2000:{
eventTesting:{EmitEvent: 'customevent1'},
},
4000:{
eventTesting:{IfElse: {player:{cond: 'testDelayVar',
ifTrue: {
eventTesting:{EmitEvent: 'customevent3'},
},ifFalse: {
eventTesting:{EmitEvent: 'customevent2'},
},}}},
},
6000:{
player:{SetFlag:{flag: 'testDelayVar', value: true},},
},
8000:{
eventTesting:{IfElse: {player:{cond: 'testDelayVar',
ifTrue: {
eventTesting:{EmitEvent: 'customevent3'},
},ifFalse: {
eventTesting:{EmitEvent: 'customevent2'},
},}}},
},

},
interval:{

5000: {run: {eventTesting2:{IfElse: {eventTesting2: {cond: 'testIntervalVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent5',SetFlag:{flag: 'testIntervalVar', value: false},},
},
ifFalse: {
eventTesting2:{EmitEvent: 'customevent6',SetFlag:{flag: 'testIntervalVar', value: true},},
},
},}},}, loop: 'infinite'},

6000: {run: {
eventTesting4:{EmitEvent: 'testintervalevent'},
}, loop: 'infinite'},

},
event:{

customevent1: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent2: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#3630c7', emissive: '#3630c7'}}},
},
customevent3: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#c73076', emissive: '#c73076'}}},
},
customevent4: {
eventTesting: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent5: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent6: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent7: {
eventTesting3: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
},
customevent8: {
eventTesting3: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
},
customevent9: {
eventTesting4: {ChangeSelf: {property: 'material', value: {color: '#5c3724', emissive: '#5c3724'}}},
},
customevent10: {
eventTesting4: {ChangeSelf: {property: 'material', value: {color: '#e62f2f', emissive: '#e62f2f'}}},
},
testintervalevent: {
eventTesting4:{IfElse: {eventTesting4:{cond: 'testInteractionVar',
ifTrue: {
eventTesting4:{EmitEvent: 'customevent9',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting4:{EmitEvent: 'customevent10',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},

},
interaction:{

click: {
eventTesting3:{IfElse: {eventTesting3:{cond: 'testInteractionVar',
ifTrue: {
eventTesting3:{EmitEvent: 'customevent7',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting3:{EmitEvent: 'customevent8',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},

},
exit:{

},
map:{
data: auxl.zone1Data.zone1Node1,
},
};
//Node Scene 0
auxl.zone1Node0 = auxl.SceneNode(auxl.zone1Node0Data);
//Node Scene 1
auxl.zone1Node1 = auxl.SceneNode(auxl.zone1Node1Data);
//Map Zone 1
auxl.zone1 = auxl.MapZone(auxl.zone1Data);

//Deep Forest
//
//Zone 2
auxl.zone2Data = {
info:{
id: 'zone2',
name: 'Zone2',
zoneNum: 0,
start: 'zone2Node0',
},
zone2Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone1', node: 'zone1Node0',},
connect2: {inZone: 'zone3', node: 'zone3Node0',},
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
//Node 0
auxl.zone2Node0Data = {
info:{
id:'zone2Node0',
name: 'Deep Forest',
description: 'Thick Woodlands',
sceneText: true,
},
controls:{
action3Down:{auxlObj: 'carouselTesting', component: false, func: 'PlayPause'},

},
start:{
teleport:{SpawnTeleport:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern24, repeat: '300 300', color: "#228343", emissive: "#228343",},}},
forestScene1:{SpawnMultiAsset:null},
horizonMountains1:{SpawnHorizon: null},
carouselTesting:{SpawnImgCarousel:null},
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
data: auxl.zone2Data.zone2Node0,
},
};
//Node Scene 0
auxl.zone2Node0 = auxl.SceneNode(auxl.zone2Node0Data);
//Map Zone 2
auxl.zone2 = auxl.MapZone(auxl.zone2Data);

//Graveyard w/Cabin House
//
//Zone 3
auxl.zone3Data = {
info:{
id: 'zone3',
name: 'Zone3',
zoneNum: 0,
start: 'zone3Node0',
},
zone3Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone2', node: 'zone2Node0',},
connect2: {inZone: true, node: 'zone3Node1', locked: true, key: 'masterKey', keepKey: true},
connect3: {inZone: 'zone4', node: 'zone4Node0',},
},
zone3Node1:{
connect0: {inZone: true, node: 'zone3Node0',},
},
controls:{

},
start:{
npc0:{SpawnNPC: null},
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
//Node 0
auxl.zone3Node0Data = {
info:{
id:'zone3Node0',
name: 'Graveyard',
description: 'Spooky Cemetary',
sceneText: true,
},
controls:{

},
start:{
teleport:{SpawnTeleport:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern44, repeat: '150 150',color: "#618136", emissive: "#618136",},}},
multiGrassyHillsBasic:{SpawnObjRing: null},
graveyardScene1:{SpawnMultiAsset:null},
horizonHills1:{SpawnHorizon: null},
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
data: auxl.zone3Data.zone3Node0,
},
};
//Node 1
auxl.zone3Node1Data = {
info:{
id:'zone3Node1',
name: 'Cemetary Cabin',
description: 'Graveyard Shelter',
sceneText: true,
},
controls:{

},
start:{
teleport0:{SpawnTeleport:null},
memory:{SpawnMemGame: null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern50, repeat: '150 150',color: "#763a3a", emissive: "#763a3a",},}},
//nodeWalls: {SpawnLayer: null,ChangeAll:{property: 'material', value: {src: auxl.pattern18, repeat: '10 2.5', color: "#80401f", emissive: "#80401f",}}},
horizonWalls3:{SpawnHorizon: null},
smallCeiling: {SpawnCore: null,ChangeSelf:{property: 'material', value: {src: auxl.pattern22, repeat: '5 5', color: "#623018", emissive: "#623018",}}},
imageSwapper1:{SpawnImgSwap: null},
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
data: auxl.zone3Data.zone3Node1,
},
};
//Node Scene 0
auxl.zone3Node0 = auxl.SceneNode(auxl.zone3Node0Data);
//Node Scene 1
auxl.zone3Node1 = auxl.SceneNode(auxl.zone3Node1Data);
//Map Zone 3
auxl.zone3 = auxl.MapZone(auxl.zone3Data);

//Desert Plains
//
//Zone 4
auxl.zone4Data = {
info:{
id: 'zone4',
name: 'Zone4',
zoneNum: 0,
start: 'zone4Node0',
},
zone4Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone3', node: 'zone3Node0',},
connect2: {inZone: 'zone5', node: 'zone5Node0',},
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
//Node 0
auxl.zone4Node0Data = {
info:{
id:'zone4Node0',
name: 'Open Desert',
description: 'Dry Plains',
sceneText: true,
},
controls:{

},
start:{
teleport:{SpawnTeleport:null},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern58, repeat: '150 150',color: "#c1bd52", emissive: "#c1bd52",},}},
npc2:{SpawnNPC: null},
multiDesertPlainsBasic:{SpawnObjRing: null},
desertScene1:{SpawnMultiAsset:null},
horizonWalls1:{SpawnHorizon:null},
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
data: auxl.zone4Data.zone4Node0,
},
};
//Node Scene 0
auxl.zone4Node0 = auxl.SceneNode(auxl.zone4Node0Data);
//Map Zone 4
auxl.zone4 = auxl.MapZone(auxl.zone4Data);

//Oasis Beach w/Underwater
//
//Zone 5
auxl.zone5Data = {
info:{
id: 'zone5',
name: 'Zone5',
zoneNum: 0,
start: 'zone5Node0',
},
zone5Node0:{
connect0: {inZone: 'zone0', node: 'zone0Node0',},
connect1: {inZone: 'zone4', node: 'zone4Node0',},
connect2: {inZone: true, node: 'zone5Node1',},
},
zone5Node1:{
connect0: {inZone: true, node: 'zone5Node0',},
},
controls:{

},
start:{
eventTesting2:{SpawnCore: null},
eventTesting5:{SpawnCore: null},
},
delay:{

2000:{
eventTesting2:{EmitEvent: 'customevent1'},
},

},
interval:{

5000: {run: {eventTesting2:{IfElse: {eventTesting2: {cond: 'testIntervalVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent5',SetFlag:{flag: 'testIntervalVar', value: false},},
},
ifFalse: {
eventTesting2:{EmitEvent: 'customevent6',SetFlag:{flag: 'testIntervalVar', value: true},},
},
},}},}, loop: 'infinite'},

},
event:{

customevent5: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#c76530', emissive: '#c76530'}}},
},
customevent6: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#d1e62f', emissive: '#d1e62f'}}},
},
customevent7: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
},
customevent8: {
eventTesting2: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
},

},
interaction:{

click: {
eventTesting2:{IfElse: {eventTesting2:{cond: 'testInteractionVar',
ifTrue: {
eventTesting2:{EmitEvent: 'customevent7',SetFlag:{flag: 'testInteractionVar', value: false},},
},ifFalse: {
eventTesting2:{EmitEvent: 'customevent8',SetFlag:{flag: 'testInteractionVar', value: true},},
},}}},
},

},
exit:{

},
};
//Node 0
auxl.zone5Node0Data = {
info:{
id:'zone5Node0',
name: 'Oasis Beach',
description: 'Rolling Sands',
sceneText: true,
},
controls:{

},
start:{
teleport:{SpawnTeleport:null},
eventTesting5:{SetFlag:{flag: 'testExitVar', value: true}, EnableDetail: {text: 'An example of using start/exit to set variables and change scene settings.'}},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55, repeat: '150 150',color: "#b4933c", emissive: "#b4933c",},}},
multiOceanBeachBasic:{SpawnObjRing: null},
beachScene1:{SpawnMultiAsset:null},
horizonBuildings1:{SpawnHorizon: null},
canoe:{SpawnCore:null,ChangeSelf:{property: 'position', value: new THREE.Vector3(1.5,0,3),}},
canoe_paddle:{SpawnCore:null,ChangeSelf:{property: 'position', value: new THREE.Vector3(-2,0.1,1),}},
waterFloor:{SpawnCore:null},
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

eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},

},
map:{
data: auxl.zone5Data.zone5Node0,
},
};
//Node 1
auxl.zone5Node1Data = {
info:{
id:'zone5Node1',
name: 'Underwater',
description: 'Submerged',
sceneText: true,
},
controls:{

},
start:{
teleport0:{SpawnTeleport:null},
eventTesting5:{SetFlag:{flag: 'testExitVar', value: false},},
nodeFloor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern83, repeat: '150 150',color: "#3c86b4", emissive: "#3c86b4",},}},
horizonWalls2:{SpawnHorizon: null},
underwaterScene1:{SpawnMultiAsset:null},
nodeCeiling:{SpawnCore:null},
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
nodeWalls: {ChangeParent:{property: 'scale', value: new THREE.Vector3(1,1,1)}},

eventTesting5:{IfElse: {eventTesting5:{cond: 'testExitVar',
ifTrue: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern55,color: "#1f5298", emissive: "#1f5298",},}},
},ifFalse: {
eventTesting5:{ChangeSelf:{property: 'material', value: {src: auxl.pattern54,color: "#9b206c", emissive: "#9b206c",},}},
},}}},

},
map:{
data: auxl.zone5Data.zone5Node1,
},
};
//Node Scene 0
auxl.zone5Node0 = auxl.SceneNode(auxl.zone5Node0Data);
//Node Scene 1
auxl.zone5Node1 = auxl.SceneNode(auxl.zone5Node1Data);
//Map Zone 5
auxl.zone5 = auxl.MapZone(auxl.zone5Data);

    },
});