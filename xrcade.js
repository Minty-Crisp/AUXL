//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-xrcade-library
//User Library : User added Library items
AFRAME.registerComponent('xrcade-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Library
//Audio by White Noise Meditation | Loop by Minty Crisp
auxl.weatherStormThunderLoop = './assets/audio/weather/thunder-loop.mp3';
//Audio by https://freesound.org/people/parnellij/ 
auxl.weatherStormLightningStrike = './assets/audio/weather/74892__parnellij__lightning-strike.mp3';
//Cloud
auxl.cloud0 = './assets/3d/weather/cloud1.glb';

//kenney
auxl.pattern01 = './assets/img/tiles/kenney/pattern_01.png';
auxl.pattern02 = './assets/img/tiles/kenney/pattern_02.png';
auxl.pattern03 = './assets/img/tiles/kenney/pattern_03.png';
auxl.pattern04 = './assets/img/tiles/kenney/pattern_04.png';
auxl.pattern05 = './assets/img/tiles/kenney/pattern_05.png';
auxl.pattern06 = './assets/img/tiles/kenney/pattern_06.png';
auxl.pattern07 = './assets/img/tiles/kenney/pattern_07.png';
auxl.pattern08 = './assets/img/tiles/kenney/pattern_08.png';
auxl.pattern09 = './assets/img/tiles/kenney/pattern_09.png';
auxl.pattern10 = './assets/img/tiles/kenney/pattern_10.png';
auxl.pattern11 = './assets/img/tiles/kenney/pattern_11.png';
auxl.pattern12 = './assets/img/tiles/kenney/pattern_12.png';
auxl.pattern13 = './assets/img/tiles/kenney/pattern_13.png';
auxl.pattern14 = './assets/img/tiles/kenney/pattern_14.png';
auxl.pattern15 = './assets/img/tiles/kenney/pattern_15.png';
auxl.pattern16 = './assets/img/tiles/kenney/pattern_16.png';
auxl.pattern17 = './assets/img/tiles/kenney/pattern_17.png';
auxl.pattern18 = './assets/img/tiles/kenney/pattern_18.png';
auxl.pattern19 = './assets/img/tiles/kenney/pattern_19.png';
auxl.pattern20 = './assets/img/tiles/kenney/pattern_20.png';
auxl.pattern21 = './assets/img/tiles/kenney/pattern_21.png';
auxl.pattern22 = './assets/img/tiles/kenney/pattern_22.png';
auxl.pattern23 = './assets/img/tiles/kenney/pattern_23.png';
auxl.pattern24 = './assets/img/tiles/kenney/pattern_24.png';
auxl.pattern25 = './assets/img/tiles/kenney/pattern_25.png';
auxl.pattern26 = './assets/img/tiles/kenney/pattern_26.png';
auxl.pattern27 = './assets/img/tiles/kenney/pattern_27.png';
auxl.pattern28 = './assets/img/tiles/kenney/pattern_28.png';
auxl.pattern29 = './assets/img/tiles/kenney/pattern_29.png';
auxl.pattern30 = './assets/img/tiles/kenney/pattern_30.png';
auxl.pattern31 = './assets/img/tiles/kenney/pattern_31.png';
auxl.pattern32 = './assets/img/tiles/kenney/pattern_32.png';
auxl.pattern33 = './assets/img/tiles/kenney/pattern_33.png';
auxl.pattern34 = './assets/img/tiles/kenney/pattern_34.png';
auxl.pattern35 = './assets/img/tiles/kenney/pattern_35.png';
auxl.pattern36 = './assets/img/tiles/kenney/pattern_36.png';
auxl.pattern37 = './assets/img/tiles/kenney/pattern_37.png';
auxl.pattern38 = './assets/img/tiles/kenney/pattern_38.png';
auxl.pattern39 = './assets/img/tiles/kenney/pattern_39.png';
auxl.pattern40 = './assets/img/tiles/kenney/pattern_40.png';
auxl.pattern41 = './assets/img/tiles/kenney/pattern_41.png';
auxl.pattern42 = './assets/img/tiles/kenney/pattern_42.png';
auxl.pattern43 = './assets/img/tiles/kenney/pattern_43.png';
auxl.pattern44 = './assets/img/tiles/kenney/pattern_44.png';
auxl.pattern45 = './assets/img/tiles/kenney/pattern_45.png';
auxl.pattern46 = './assets/img/tiles/kenney/pattern_46.png';
auxl.pattern47 = './assets/img/tiles/kenney/pattern_47.png';
auxl.pattern48 = './assets/img/tiles/kenney/pattern_48.png';
auxl.pattern49 = './assets/img/tiles/kenney/pattern_49.png';
auxl.pattern50 = './assets/img/tiles/kenney/pattern_50.png';
auxl.pattern51 = './assets/img/tiles/kenney/pattern_51.png';
auxl.pattern52 = './assets/img/tiles/kenney/pattern_52.png';
auxl.pattern53 = './assets/img/tiles/kenney/pattern_53.png';
auxl.pattern54 = './assets/img/tiles/kenney/pattern_54.png';
auxl.pattern55 = './assets/img/tiles/kenney/pattern_55.png';
auxl.pattern56 = './assets/img/tiles/kenney/pattern_56.png';
auxl.pattern57 = './assets/img/tiles/kenney/pattern_57.png';
auxl.pattern58 = './assets/img/tiles/kenney/pattern_58.png';
auxl.pattern59 = './assets/img/tiles/kenney/pattern_59.png';
auxl.pattern60 = './assets/img/tiles/kenney/pattern_60.png';
auxl.pattern61 = './assets/img/tiles/kenney/pattern_61.png';
auxl.pattern62 = './assets/img/tiles/kenney/pattern_62.png';
auxl.pattern63 = './assets/img/tiles/kenney/pattern_63.png';
auxl.pattern64 = './assets/img/tiles/kenney/pattern_64.png';
auxl.pattern65 = './assets/img/tiles/kenney/pattern_65.png';
auxl.pattern66 = './assets/img/tiles/kenney/pattern_66.png';
auxl.pattern67 = './assets/img/tiles/kenney/pattern_67.png';
auxl.pattern68 = './assets/img/tiles/kenney/pattern_68.png';
auxl.pattern69 = './assets/img/tiles/kenney/pattern_69.png';
auxl.pattern70 = './assets/img/tiles/kenney/pattern_70.png';
auxl.pattern71 = './assets/img/tiles/kenney/pattern_71.png';
auxl.pattern72 = './assets/img/tiles/kenney/pattern_72.png';
auxl.pattern73 = './assets/img/tiles/kenney/pattern_73.png';
auxl.pattern74 = './assets/img/tiles/kenney/pattern_74.png';
auxl.pattern75 = './assets/img/tiles/kenney/pattern_75.png';
auxl.pattern76 = './assets/img/tiles/kenney/pattern_76.png';
auxl.pattern77 = './assets/img/tiles/kenney/pattern_77.png';
auxl.pattern78 = './assets/img/tiles/kenney/pattern_78.png';
auxl.pattern79 = './assets/img/tiles/kenney/pattern_79.png';
auxl.pattern80 = './assets/img/tiles/kenney/pattern_80.png';
auxl.pattern81 = './assets/img/tiles/kenney/pattern_81.png';
auxl.pattern82 = './assets/img/tiles/kenney/pattern_82.png';
auxl.pattern83 = './assets/img/tiles/kenney/pattern_83.png';
auxl.pattern84 = './assets/img/tiles/kenney/pattern_84.png';

auxl.patterns = [auxl.pattern01,auxl.pattern02,auxl.pattern03,auxl.pattern04,auxl.pattern05,auxl.pattern06,auxl.pattern07,auxl.pattern08,auxl.pattern09,auxl.pattern10,auxl.pattern11,auxl.pattern12,auxl.pattern13,auxl.pattern14,auxl.pattern15,auxl.pattern16,auxl.pattern17,auxl.pattern18,auxl.pattern19,auxl.pattern20,auxl.pattern21,auxl.pattern22,auxl.pattern23,auxl.pattern24,auxl.pattern25,auxl.pattern26,auxl.pattern27,auxl.pattern28,auxl.pattern29,auxl.pattern30,auxl.pattern31,auxl.pattern32,auxl.pattern33,auxl.pattern34,auxl.pattern35,auxl.pattern36,auxl.pattern37,auxl.pattern38,auxl.pattern39,auxl.pattern40,auxl.pattern41,auxl.pattern42,auxl.pattern43,auxl.pattern44,auxl.pattern45,auxl.pattern46,auxl.pattern47,auxl.pattern48,auxl.pattern49,auxl.pattern50,auxl.pattern51,auxl.pattern52,auxl.pattern53,auxl.pattern54,auxl.pattern55,auxl.pattern56,auxl.pattern57,auxl.pattern58,auxl.pattern59,auxl.pattern60,auxl.pattern61,auxl.pattern62,auxl.pattern63,auxl.pattern64,auxl.pattern65,auxl.pattern66,auxl.pattern67,auxl.pattern68,auxl.pattern69,auxl.pattern70,auxl.pattern71,auxl.pattern72,auxl.pattern73,auxl.pattern74,auxl.pattern75,auxl.pattern76,auxl.pattern77,auxl.pattern78,auxl.pattern79,auxl.pattern80,auxl.pattern81,auxl.pattern82,auxl.pattern83,auxl.pattern84];




//Default Library Modifications
auxl.sun.core.geometry.radius = 100;
auxl.moon.core.geometry.radius = 100;
auxl.sun.core.position = new THREE.Vector3(0,0,-510)
auxl.moon.core.position = new THREE.Vector3(0,0,-510)

//Paintings
auxl.spookyPainting1 = './assets/img/spooky_portraits/1.jpg';
auxl.spookyPainting1Alt = './assets/img/spooky_portraits/1alt.jpg';
auxl.spookyPainting2 = './assets/img/spooky_portraits/2.jpg';
auxl.spookyPainting2Alt = './assets/img/spooky_portraits/2alt.jpg';
auxl.spookyPainting3 = './assets/img/spooky_portraits/3.jpg';
auxl.spookyPainting3Alt = './assets/img/spooky_portraits/3alt.jpg';
auxl.spookyPainting4 = './assets/img/spooky_portraits/4.jpg';
auxl.spookyPainting4Alt = './assets/img/spooky_portraits/4alt.jpg';
auxl.spookyPainting5 = './assets/img/spooky_portraits/5.jpg';
auxl.spookyPainting5Alt = './assets/img/spooky_portraits/5alt.jpg';
auxl.spookyPainting6 = './assets/img/spooky_portraits/6.jpg';
auxl.spookyPainting6Alt = './assets/img/spooky_portraits/6alt.jpg';
auxl.spookyPainting7 = './assets/img/spooky_portraits/7.jpg';
auxl.spookyPainting7Alt = './assets/img/spooky_portraits/7alt.jpg';
auxl.spookyPainting8 = './assets/img/spooky_portraits/8.jpg';
auxl.spookyPainting8Alt = './assets/img/spooky_portraits/8alt.jpg';
auxl.spookyPainting9 = './assets/img/spooky_portraits/9.jpg';
auxl.spookyPainting9Alt = './assets/img/spooky_portraits/9alt.jpg';
auxl.spookyPainting10 = './assets/img/spooky_portraits/10.jpg';
auxl.spookyPainting10Alt = './assets/img/spooky_portraits/10alt.jpg';
auxl.spookyPainting11 = './assets/img/spooky_portraits/11.jpg';
auxl.spookyPainting11Alt = './assets/img/spooky_portraits/11alt.jpg';
auxl.spookyPainting12 = './assets/img/spooky_portraits/12.jpg';
auxl.spookyPainting12Alt = './assets/img/spooky_portraits/12alt.jpg';
auxl.spookyPainting13 = './assets/img/spooky_portraits/13.jpg';
auxl.spookyPainting13Alt = './assets/img/spooky_portraits/13alt.jpg';
auxl.spookyJump1 = './assets/img/spooky_portraits/jump1.jpg';


//Sounds
//

//Game Sounds (https://gamesounds.xyz/)

//Music
auxl.soundSpookyMusic1 = './assets/audio/gameSounds/Anttis instrumentals - Sad Piece.mp3';

//Spooky Sounds
//Non-positionals
//Respawn
auxl.soundHarpAsscend = './assets/audio/gameSounds/33 FX3184 Ascending Harp Glissando.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__respawn', value: {src: auxl.soundHarpAsscend, autoplay: false, loop: false, volume: 0.5, on: 'respawn'}}, true)
//Hearbeat
auxl.soundHeartbeatSpeed = './assets/audio/gameSounds/heartbeat-speeding-up-02.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__heartbeat', value: {src: auxl.soundHeartbeatSpeed, autoplay: false, loop: false, volume: 0.35, on: 'heartbeat'}}, true)
//Juicy Impact
auxl.soundJuicyImpact1 = './assets/audio/gameSounds/Smash_Gore_Juicy_Smash_07.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__juicyimpact', value: {src: auxl.soundJuicyImpact1, autoplay: false, loop: false, volume: 0.75, on: 'juicyimpact'}}, true)
//Trap Door
auxl.soundTrapDoor = './assets/audio/gameSounds/trap-door-1.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__trapdoor', value: {src: auxl.soundTrapDoor, autoplay: false, loop: false, volume: 0.75, on: 'trapdoor'}}, true)
//Trap
auxl.soundConcreteGrind = './assets/audio/gameSounds/Metallic ball rolling on concrete 02.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__trap', value: {src: auxl.soundConcreteGrind, autoplay: false, loop: false, volume: 0.75, on: 'trap'}}, true)
//Wind Fall
auxl.soundWindFall = './assets/audio/gameSounds/wind_blustery_08_loop.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__windfall', value: {src: auxl.soundWindFall, autoplay: false, loop: false, volume: 1, on: 'trapdoor'}}, true)
//Underwater
auxl.soundUnderwater1 = './assets/audio/gameSounds/underwater_object_movement_quick_deep_15.mp3';
auxl.playerAudio.ChangeSelf({property:'auxlsound__underwater', value: {src: auxl.soundUnderwater1, autoplay: false, loop: false, volume: 0.5, on: 'underwater'}}, true)


//Positional
auxl.soundDoorOpen = './assets/audio/gameSounds/SBvfe1_Door Handle D 002.mp3'

auxl.spookWoosh = './assets/audio/gameSounds/Scary_Breath_Whoosh_05.mp3';
auxl.soundGlassBreak = './assets/audio/gameSounds/Glass6.mp3';
auxl.soundFootsteps = './assets/audio/gameSounds/heavy_footsteps.mp3';
auxl.soundKnifeSharpening = './assets/audio/gameSounds/sharpening-knife-1.mp3';
auxl.soundMonster1 = './assets/audio/gameSounds/6Monsters_BlackBoss_Scream_04.mp3';
auxl.soundMonster3 = './assets/audio/gameSounds/Dinosaur Growl 3_Mono.mp3';
auxl.soundPendulumMachine = './assets/audio/gameSounds/79 Horror, Pendulum Torture Machine.mp3';
auxl.soundSqueakingChair = './assets/audio/gameSounds/SqueakingChair.mp3';
auxl.soundWaterDrops = './assets/audio/gameSounds/water_drops2.mp3';
auxl.soundWhaleCalls1 = './assets/audio/gameSounds/Whale Call-Answer Close (echo) 7.mp3';
auxl.soundFlareFirework = './assets/audio/gameSounds/04 Fireworks, Mine Of Serpents--Fizz.mp3';






//
//Doors

//Door 1
auxl.kayKitDoor1Data = {
	data:'kayKitDoor1Data',
	id:'kayKitDoor1',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	},
};
auxl.kayKitDoor1 = auxl.Core(auxl.kayKitDoor1Data);
//Door 2
auxl.kayKitDoor2Data = {
	data:'kayKitDoor2Data',
	id:'kayKitDoor2',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door2.glb',
	},
};
auxl.kayKitDoor2 = auxl.Core(auxl.kayKitDoor2Data);
//Door 3
auxl.kayKitDoor3Data = {
	data:'kayKitDoor3Data',
	id:'kayKitDoor3',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door3.glb',
	},
};
auxl.kayKitDoor3 = auxl.Core(auxl.kayKitDoor3Data);
//Door 4
auxl.kayKitDoor4Data = {
	data:'kayKitDoor4Data',
	id:'kayKitDoor4',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door4.glb',
	},
};
auxl.kayKitDoor4 = auxl.Core(auxl.kayKitDoor4Data);
//Door 5
auxl.kayKitDoor5Data = {
	data:'kayKitDoor5Data',
	id:'kayKitDoor5',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door5.glb',
	},
};
auxl.kayKitDoor5 = auxl.Core(auxl.kayKitDoor5Data);
//Door 6
auxl.kayKitDoor6Data = {
	data:'kayKitDoor6Data',
	id:'kayKitDoor6',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door6.glb',
	},
};
auxl.kayKitDoor6 = auxl.Core(auxl.kayKitDoor6Data);
//Door 7
auxl.kayKitDoor7Data = {
	data:'kayKitDoor7Data',
	id:'kayKitDoor7',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4.5,0,1.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/doors/door7.glb',
	},
};
auxl.kayKitDoor7 = auxl.Core(auxl.kayKitDoor7Data);

//
//Spooky Zone

//SkyBox
auxl.skyGradSpookyData = {
data: 'skyGradSpookyData',
id: 'skyGradSpooky',
entity: 'a-sky',
sources: false,
text: false,
geometry: false,
material: {shader: 'threeColorGradientShader', topColor: '#613381', middleColor: '#99154E', bottomColor: '#b967ff'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {

top0:{property: 'material.topColor', from: '#04718b', to: '#04718b', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

mid0:{property: 'material.middleColor', from: '#b2590c', to: '#b2590c', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

top1:{property: 'material.topColor', from: '#613381', to: '#04718b', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'},

mid1:{property: 'material.middleColor', from: '#99154E', to: '#b2590c', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid0, animationcomplete__mid2', pauseEvents: 'pause', resumeEvents: 'resume'}, 

top2:{property: 'material.topColor', from: '#04718b', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top1', pauseEvents: 'pause', resumeEvents: 'resume'},

mid2:{property: 'material.middleColor', from: '#b2590c', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid1', pauseEvents: 'pause', resumeEvents: 'resume'},

},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.skyGradSpooky = auxl.Core(auxl.skyGradSpookyData);

//Lights
auxl.directionalLight.core.components.light.intensity = 0.75;
auxl.directionalLight.core.position = new THREE.Vector3(-0.25,0.75,0.5);
auxl.directionalLight2.core.components.light.intensity = 0.1;
auxl.directionalLight2.core.position = new THREE.Vector3(0.25,0.75,-0.5);
auxl.directionalLight3.core.components.light.intensity = 0.2;
auxl.directionalLight3.core.position = new THREE.Vector3(0.25,0.75,0.5);
auxl.ambientLight.core.components.light.intensity = 0.5;



//The Deep Dark SkyBox Anims
auxl.directionalLight.core.animations.fadeout = {property: 'light.intensity', from: 0.75, to: 0, dur: 23000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeout', pauseEvents: 'stop',};

auxl.directionalLight2.core.animations.fadeout = {property: 'light.intensity', from: 0.1, to: 0, dur: 23000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeout', pauseEvents: 'stop',};

auxl.directionalLight3.core.animations.fadeout = {property: 'light.intensity', from: 0.2, to: 0, dur: 23000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeout', pauseEvents: 'stop',};

auxl.ambientLight.core.animations.fadeout = {property: 'light.intensity', from: 0.75, to: 0, dur: 23000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fadeout', pauseEvents: 'stop',};

//SkyBox
//

//Mooneyes
auxl.moonEyesData = {
	data:'moonEyesData',
	id:'moonEyes',
	defaultParent: 'moon',
	position: new THREE.Vector3(0,10,100),
	rotation: new THREE.Vector3(105,90,90),
	scale: new THREE.Vector3(1.5,1.5,1.5),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/spooky/mooneyes.glb',
		gltfmat: {colors: '#C14B76', emissives: '1'},
	},
};
auxl.moonEyes = auxl.Core(auxl.moonEyesData);

//skyBoxSpooky
auxl.skyBoxSpookyData = {
data:'skyBoxSpookyData',
id:'skyBoxSpooky',
sources:false,
lights:[
auxl.directionalLight,
auxl.directionalLight2,
auxl.directionalLight3,
auxl.ambientLight,
],
sky:[
auxl.skyGradSpooky,
],
space:[
auxl.moonLayer,
auxl.moonEyes,
],
};
auxl.skyBoxSpooky = auxl.SkyBox(auxl.skyBoxSpookyData);
//Fix
auxl.SkyBoxSpawnFix = () => {
	let self = {};
	self.id = 'SpookySkyBoxSpawnFix';

	const Fix = () => {
		let timeout1 = setTimeout(() => {
			auxl.skyBoxSpooky.SpawnSkyBox();
			clearTimeout(timeout1);
		}, 450);
		let timeout2 = setTimeout(() => {
			auxl.skyBoxSpooky.SetTime(21);
			clearTimeout(timeout2);
		}, 500);

		//delete auxl.nodeSpawned['skyBoxSpooky'];
	}
	return {self, Fix};
}
auxl.SpookySkyBoxSpawnFix = auxl.SkyBoxSpawnFix();


//Doorways
//

//Spooky to Entrance
auxl.spookyToEntranceData = {
data:'spookyToEntranceData',
id:'spookyToEntrance',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
geometry: {primitive: 'box', depth: 1, width: 3, height: 4},
material: {shader: "standard", color: "#264e1a", emissive: '#264e1a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,2.41),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components: {
	doorway:{zone: 'spookyZone', to: 'connect0', posTo: true, pos: new THREE.Vector3(5,0,-12), twistTo: true, twist: 180},
	hovertext:{value: 'Entrance',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
},
};
auxl.spookyToEntrance = auxl.Core(auxl.spookyToEntranceData);

//Spooky to Exterior
auxl.spookyToExteriorData = {
data:'spookyToExteriorData',
id:'spookyToExterior',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(3,0,0.5),
grid: {start:{x:-1.5, y:0, z:-19.5}, xOffset: 1, yOffset: 1, zOffset: 1, collide: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door6.glb',
	doorway:{zone: 'spookyZone', to: 'connect1', posTo: true, pos: new THREE.Vector3(-1.75,0,20), twistTo: true, twist: 0},
	hovertext:{value: 'The Hallows',  hover: 'front', offset: 0.75, altOffset: 2, twist: true,},
},
};
auxl.spookyToExterior = auxl.Core(auxl.spookyToExteriorData);
auxl.spookyToExteriorEmote = auxl.InfoBubble('spookyToExteriorEmote', auxl.spookyToExterior, 3, 'orange');
//Block
auxl.spookyToExteriorBlockData = {
	data:'spookyToExteriorBlockData',
	id:'spookyToExteriorBlock',
	geometry: {primitive: 'box', height: 10, width: 20, depth: 0.1},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(0,0,-14),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.spookyToExteriorBlock = auxl.Core(auxl.spookyToExteriorBlockData);

//Exterior to Spooky
auxl.exteriorToSpookyData = {
data:'exteriorToSpookyData',
id:'exteriorToSpooky',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(4,0,0.5),
grid: {start:{x:-3.5, y:0, z:21.5}, yOffset: 0, collide: true},
rotation: new THREE.Vector3(0,180,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door6.glb',
	doorway:{zone: 'spookyZone', to: 'connect0', posTo: true, pos: new THREE.Vector3(0,0,-18), twistTo: true, twist: 180},
	hovertext:{value: 'To safety!',  hover: 'top', offset: 2, altOffset: 0.75, twist: true,},
},
};
auxl.exteriorToSpooky = auxl.Core(auxl.exteriorToSpookyData);
auxl.exteriorToSpookyEmote = auxl.InfoBubble('exteriorToSpookyEmote', auxl.exteriorToSpooky, 3, 'orange');
//Block
auxl.exteriorRoom0BlockData = {
	data:'exteriorRoom0BlockData',
	id:'exteriorRoom0Block',
	geometry: {primitive: 'box', height: 10, width: 20, depth: 0.1},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(-2.25,0,16),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.exteriorRoom0Block = auxl.Core(auxl.exteriorRoom0BlockData);
//Exterior to Room 1
auxl.exteriorToRoom1Data = {
data:'exteriorToRoom1Data',
id:'exteriorToRoom1',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(2,0,0.5),
grid: {start:{x:-2.5, y:0, z:-20.5}, yOffset: 0, collide: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	doorway:{zone: 'spookyZone', to: 'connect1', posTo: true, pos: new THREE.Vector3(0,0,58.5), twistTo: true, twist: 0},
	hovertext:{value: 'Haunted Hallway',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.exteriorToRoom1 = auxl.Core(auxl.exteriorToRoom1Data);
auxl.exteriorToRoom1Emote = auxl.InfoBubble('exteriorToRoom1Emote', auxl.exteriorToRoom1, 3, 'yellow');
//Block
auxl.exteriorRoom1BlockData = {
	data:'exteriorRoom1BlockData',
	id:'exteriorRoom1Block',
	geometry: {primitive: 'box', height: 10, width: 20, depth: 0.1},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(-1,0,-16),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.exteriorRoom1Block = auxl.Core(auxl.exteriorRoom1BlockData);
//Exterior to Room 2
auxl.exteriorToRoom2Data = {
data:'exteriorToRoom2Data',
id:'exteriorToRoom2',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(0.5,0,2),
grid: {start:{x:20.5, y:0, z:-2.5}, yOffset: 0, collide: true},
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door4.glb',
	doorway:{zone: 'spookyZone', to: 'connect2', posTo: true, pos: new THREE.Vector3(0,0,4.5), twistTo: true, twist: 0},
	hovertext:{value: 'Its a Trap!',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.exteriorToRoom2 = auxl.Core(auxl.exteriorToRoom2Data);
auxl.exteriorToRoom2Emote = auxl.InfoBubble('exteriorToRoom2Emote', auxl.exteriorToRoom2, 3, 'orange');
//Block
auxl.exteriorRoom2BlockData = {
	data:'exteriorRoom2BlockData',
	id:'exteriorRoom2Block',
	geometry: {primitive: 'box', height: 10, width: 0.1, depth: 20},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(16,0,-2.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.exteriorRoom2Block = auxl.Core(auxl.exteriorRoom2BlockData);
//Exterior to Room 3
auxl.exteriorToRoom3Data = {
data:'exteriorToRoom3Data',
id:'exteriorToRoom3',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(0.5,0,1),
grid: {start:{x:-20.5, y:0, z:-2}, yOffset: 0, collide: true},
rotation: new THREE.Vector3(0,90,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door2.glb',
	doorway:{zone: 'spookyZone', to: 'connect3', posTo: true, pos: new THREE.Vector3(0,8,0), twistTo: true, twist: 0},
	hovertext:{value: 'The Dark Deep',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.exteriorToRoom3 = auxl.Core(auxl.exteriorToRoom3Data);
auxl.exteriorToRoom3Emote = auxl.InfoBubble('exteriorToRoom3Emote', auxl.exteriorToRoom3, 3, 'red');
//Block
auxl.exteriorRoom3BlockData = {
	data:'exteriorRoom3BlockData',
	id:'exteriorRoom3Block',
	geometry: {primitive: 'box', height: 10, width: 0.1, depth: 20},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(-16,0,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.exteriorRoom3Block = auxl.Core(auxl.exteriorRoom3BlockData);

//Neons
//

//Jacko
auxl.jackoSignData = {
	data:'jackoSignData',
	id:'jackoSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(10.65,1.1,-9),
	rotation: new THREE.Vector3(90,-90,0),
	scale: new THREE.Vector3(1.8,1.8,1.8),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/spooky/jacko.glb',
		gltfmat: {colors: '#d47d16, #8131d1, #eddd23, #f4057c, #11bfab', emissives: '1,1,1,1,1'},
	},
};
auxl.jackoSign = auxl.Core(auxl.jackoSignData);

//Ghost
auxl.ghostSignData = {
	data:'ghostSignData',
	id:'ghostSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(-10.65,1.1,-9),
	rotation: new THREE.Vector3(90,90,0),
	scale: new THREE.Vector3(1.8,1.8,1.8),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/spooky/ghost.glb',
		gltfmat: {colors: '#a882ce, #11bfab, #f4057c', emissives: '1,1,1'},
	},
};
auxl.ghostSign = auxl.Core(auxl.ghostSignData);

//Bats
auxl.batsSignData = {
	data:'batsSignData',
	id:'batsSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0.9,3.2,-19.65),
	rotation: new THREE.Vector3(90,180,0),
	scale: new THREE.Vector3(1.5,1.5,1.5),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/spooky/bats.glb',
		gltfmat: {colors: '#8131d1, #eddd23', emissives: '1,1'},
	},
};
auxl.batsSign = auxl.Core(auxl.batsSignData);

//Spooky Exterior Floor
auxl.spookyFloorData = {
	data:'spookyFloorData',
	id:'spookyFloor',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', width: 210, height: 210,},
	material: {shader: "standard", color: "#8e6b1c", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#8e6b1c", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern45, repeat: '100 100'},
	position: new THREE.Vector3(0,-0.1,-9),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: false,
};
auxl.spookyFloor = auxl.Core(auxl.spookyFloorData);

//Horizon
//

//Hills
auxl.spookyHillsData = {
id: 'spookyHills',
type: 'mountains',
texture: false,
baseColor: false,
baseColorFamily: 'maroon',
radius: 190,
density: 'normal',
height: 'high',
width: 'normal',
};
auxl.spookyHills = auxl.Horizon(auxl.spookyHillsData);

//Halloween
//

//Bone A
auxl.kayKitBoneAData = {
	data:'kayKitBoneAData',
	id:'kayKitBoneA',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bone_A.glb',
	},
};
auxl.kayKitBoneA = auxl.Core(auxl.kayKitBoneAData);
//Bone B
auxl.kayKitBoneBData = {
	data:'kayKitBoneBData',
	id:'kayKitBoneB',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bone_B.glb',
	},
};
auxl.kayKitBoneB = auxl.Core(auxl.kayKitBoneBData);
//Bone C
auxl.kayKitBoneCData = {
	data:'kayKitBoneCData',
	id:'kayKitBoneC',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bone_C.glb',
	},
};
auxl.kayKitBoneC = auxl.Core(auxl.kayKitBoneCData);
//Candle Triple
auxl.kayKitCandleTripleData = {
	data:'kayKitCandleTripleData',
	id:'kayKitCandleTriple',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/candle_triple.glb',
	},
};
auxl.kayKitCandleTriple = auxl.Core(auxl.kayKitCandleTripleData);
//Bench Decorated
auxl.kayKitBenchDecoratedData = {
	data:'kayKitBenchDecoratedData',
	id:'kayKitBenchDecorated',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bench_decorated.glb',
	},
};
auxl.kayKitBenchDecorated = auxl.Core(auxl.kayKitBenchDecoratedData);
//Coffin
auxl.kayKitCoffinData = {
	data:'kayKitCoffinData',
	id:'kayKitCoffin',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,3),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/coffin.glb',
	},
};
auxl.kayKitCoffin = auxl.Core(auxl.kayKitCoffinData);
//Coffin Decorated
auxl.kayKitCoffinDecoratedData = {
	data:'kayKitCoffinDecoratedData',
	id:'kayKitCoffinDecorated',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,3),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/coffin_decorated.glb',
	},
};
auxl.kayKitCoffinDecorated = auxl.Core(auxl.kayKitCoffinDecoratedData);
//Crypt
auxl.kayKitCryptData = {
	data:'kayKitCryptData',
	id:'kayKitCrypt',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(6,0,9),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/crypt.glb',
	},
};
auxl.kayKitCrypt = auxl.Core(auxl.kayKitCryptData);
//Grave A
auxl.kayKitGraveAData = {
	data:'kayKitGraveAData',
	id:'kayKitGraveA',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(0.75,0.65,0.75),
	gridSize: new THREE.Vector3(1.5,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/grave_A.glb',
	},
};
auxl.kayKitGraveA = auxl.Core(auxl.kayKitGraveAData);
//Grave A Destroyed
auxl.kayKitGraveADestroyedData = {
	data:'kayKitGraveADestroyedData',
	id:'kayKitGraveADestroyed',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(0.75,0.65,0.75),
	gridSize: new THREE.Vector3(2,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/grave_A_destroyed.glb',
	},
};
auxl.kayKitGraveADestroyed = auxl.Core(auxl.kayKitGraveADestroyedData);
//Grave B
auxl.kayKitGraveBData = {
	data:'kayKitGraveBData',
	id:'kayKitGraveA',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(0.75,0.65,0.75),
	gridSize: new THREE.Vector3(1.5,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/grave_B.glb',
	},
};
auxl.kayKitGraveA = auxl.Core(auxl.kayKitGraveBData);
//Gravemarker A
auxl.kayKitGravemarkerAData = {
	data:'kayKitGravemarkerAData',
	id:'kayKitGraveA',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/gravemarker_A.glb',
	},
};
auxl.kayKitGraveA = auxl.Core(auxl.kayKitGravemarkerAData);
//Gravemarker B
auxl.kayKitGravemarkerBData = {
	data:'kayKitGravemarkerBData',
	id:'kayKitGraveB',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/gravemarker_B.glb',
	},
};
auxl.kayKitGraveB = auxl.Core(auxl.kayKitGravemarkerBData);
//Gravestone
auxl.kayKitGravestoneData = {
	data:'kayKitGravestoneData',
	id:'kayKitGravestone',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(0.75,0.65,0.75),
	gridSize: new THREE.Vector3(1,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/gravestone.glb',
	},
};
auxl.kayKitGravestone = auxl.Core(auxl.kayKitGravestoneData);
//Lantern Hanging
auxl.kayKitLanternHangingData = {
	data:'kayKitLanternHangingData',
	id:'kayKitLanternHanging',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/lantern_hanging.glb',
	},
};
auxl.kayKitLanternHanging = auxl.Core(auxl.kayKitLanternHangingData);
//Lantern Standing
auxl.kayKitLanternStandingData = {
	data:'kayKitLanternStandingData',
	id:'kayKitLanternStanding',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/lantern_standing.glb',
	},
};
auxl.kayKitLanternStanding = auxl.Core(auxl.kayKitLanternStandingData);
//Pillar
auxl.kayKitPillarData = {
	data:'kayKitPillarData',
	id:'kayKitPillar',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/lantern_standing.glb',
	},
};
auxl.kayKitPillar = auxl.Core(auxl.kayKitPillarData);
//Plaque
auxl.kayKitPlaqueData = {
	data:'kayKitPlaqueData',
	id:'kayKitPlaque',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,1.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/plaque.glb',
	},
};
auxl.kayKitPlaque = auxl.Core(auxl.kayKitPlaqueData);
//Plaque Candles
auxl.kayKitPlaqueCandlesData = {
	data:'kayKitPlaqueCandlesData',
	id:'kayKitPlaqueCandles',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,1.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/plaque_candles.glb',
	},
};
auxl.kayKitPlaqueCandles = auxl.Core(auxl.kayKitPlaqueCandlesData);
//Post
auxl.kayKitPostData = {
	data:'kayKitPostData',
	id:'kayKitPost',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/post.glb',
	},
};
auxl.kayKitPost = auxl.Core(auxl.kayKitPostData);
//Post Lantern
auxl.kayKitPostLanternData = {
	data:'kayKitPostLanternData',
	id:'kayKitPostLantern',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/post_lantern.glb',
	},
};
auxl.kayKitPostLantern = auxl.Core(auxl.kayKitPostLanternData);
//Post Skull
auxl.kayKitPostSkullData = {
	data:'kayKitPostSkullData',
	id:'kayKitPostSkull',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/post_skull.glb',
	},
};
auxl.kayKitPostSkull = auxl.Core(auxl.kayKitPostSkullData);
//Pumpkin Orange
auxl.kayKitPumpkinOrangeData = {
	data:'kayKitPumpkinOrangeData',
	id:'kayKitPumpkinOrange',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_orange.glb',
	},
};
auxl.kayKitPumpkinOrange = auxl.Core(auxl.kayKitPumpkinOrangeData);
//Pumpkin Orange Jacko Lantern
auxl.kayKitPumpkinOrangeJackoData = {
	data:'kayKitPumpkinOrangeJackoData',
	id:'kayKitPumpkinOrangeJacko',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,1.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_orange_jackolantern.glb',
	},
};
auxl.kayKitPumpkinOrangeJacko = auxl.Core(auxl.kayKitPumpkinOrangeJackoData);
auxl.kayKitPumpkinOrangeJacko1Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinOrangeJackoData, {id: 'kayKitPumpkinOrangeJacko1', rotation: new THREE.Vector3(0,45,0),}, true);
auxl.kayKitPumpkinOrangeJacko2Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinOrangeJackoData, {id: 'kayKitPumpkinOrangeJacko2', rotation: new THREE.Vector3(0,135,0),}, true);
auxl.kayKitPumpkinOrangeJacko3Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinOrangeJackoData, {id: 'kayKitPumpkinOrangeJacko3', rotation: new THREE.Vector3(0,225,0),}, true);
auxl.kayKitPumpkinOrangeJacko4Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinOrangeJackoData, {id: 'kayKitPumpkinOrangeJacko4', rotation: new THREE.Vector3(0,315,0),}, true);
//Pumpkin Orange Small
auxl.kayKitPumpkinOrangeSmallData = {
	data:'kayKitPumpkinOrangeSmallData',
	id:'kayKitPumpkinOrangeSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_orange_small.glb',
	},
};
auxl.kayKitPumpkinOrangeSmall = auxl.Core(auxl.kayKitPumpkinOrangeSmallData);
//Pumpkin Yellow
auxl.kayKitPumpkinYellowData = {
	data:'kayKitPumpkinYellowData',
	id:'kayKitPumpkinYellow',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_yellow.glb',
	},
};
auxl.kayKitPumpkinYellow = auxl.Core(auxl.kayKitPumpkinYellowData);
//Pumpkin Yellow Jacko Lantern
auxl.kayKitPumpkinYellowJackoData = {
	data:'kayKitPumpkinYellowJackoData',
	id:'kayKitPumpkinYellowJacko',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,1.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_yellow_jackolantern.glb',
	},
};
auxl.kayKitPumpkinYellowJacko = auxl.Core(auxl.kayKitPumpkinYellowJackoData);
auxl.kayKitPumpkinYellowJacko1Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinYellowJackoData, {id: 'kayKitPumpkinYellowJacko1', rotation: new THREE.Vector3(0,45,0),}, true);
auxl.kayKitPumpkinYellowJacko2Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinYellowJackoData, {id: 'kayKitPumpkinYellowJacko2', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.kayKitPumpkinYellowJacko3Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinYellowJackoData, {id: 'kayKitPumpkinYellowJacko3', rotation: new THREE.Vector3(0,225,0),}, true);
auxl.kayKitPumpkinYellowJacko4Data = auxl.CoreDataFromTemplate(auxl.kayKitPumpkinYellowJackoData, {id: 'kayKitPumpkinYellowJacko4', rotation: new THREE.Vector3(0,315,0),}, true);
//Pumpkin Yellow Small
auxl.kayKitPumpkinYellowSmallData = {
	data:'kayKitPumpkinYellowSmallData',
	id:'kayKitPumpkinYellowSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/pumpkin_yellow_small.glb',
	},
};
auxl.kayKitPumpkinYellowSmall = auxl.Core(auxl.kayKitPumpkinYellowSmallData);
//Ribcage
auxl.kayKitRibcageData = {
	data:'kayKitRibcageData',
	id:'kayKitRibcage',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/ribcage.glb',
	},
};
auxl.kayKitRibcage = auxl.Core(auxl.kayKitRibcageData);
//Shrine
auxl.kayKitShrineData = {
	data:'kayKitShrineData',
	id:'kayKitShrine',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/shrine.glb',
	},
};
auxl.kayKitShrine = auxl.Core(auxl.kayKitShrineData);
//Shrine Candles
auxl.kayKitShrineCandlesData = {
	data:'kayKitShrineCandlesData',
	id:'kayKitShrineCandles',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/shrine_candles.glb',
	},
};
auxl.kayKitShrineCandles = auxl.Core(auxl.kayKitShrineCandlesData);
//Skull
auxl.kayKitSkullData = {
	data:'kayKitSkullData',
	id:'kayKitSkull',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,45,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/skull.glb',
	},
};
auxl.kayKitSkull = auxl.Core(auxl.kayKitSkullData);
//Skull Candles
auxl.kayKitSkullCandlesData = {
	data:'kayKitSkullCandlesData',
	id:'kayKitSkullCandles',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,315,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/skull_candle.glb',
	},
};
auxl.kayKitSkullCandles = auxl.Core(auxl.kayKitSkullCandlesData);

//Fences
//

//Arch
auxl.kayKitArchData = {
	data:'kayKitArchData',
	id:'kayKitArch',
	position: new THREE.Vector3(-1.75,0,21),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4,0,0.5),
	grid: {start:{x:-3.5, y:0, z:21}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/arch.glb',
	},
};
auxl.kayKitArch = auxl.Core(auxl.kayKitArchData);
//Arch Gate
auxl.kayKitArchGateData = {
	data:'kayKitArchGateData',
	id:'kayKitArchGate',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4,0,0.5),
	grid: {start:{x:-3.5, y:0, z:-21}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/arch_gate.glb',
	},
};
auxl.kayKitArchGate = auxl.Core(auxl.kayKitArchGateData);
auxl.kayKitArchGateX1Data = auxl.CoreDataFromTemplate(auxl.kayKitArchGateData, {id: 'kayKitArchGateX1', rotation: new THREE.Vector3(0,90,0), gridSize: new THREE.Vector3(0.5,0,4), grid: {start:{x:21, y:0, z:-3.5}, yOffset: 0, collide: true},}, true);
auxl.kayKitArchGateX1 = auxl.Core(auxl.kayKitArchGateX1Data);
auxl.kayKitArchGateX2Data = auxl.CoreDataFromTemplate(auxl.kayKitArchGateData, {id: 'kayKitArchGateX2', rotation: new THREE.Vector3(0,90,0), gridSize: new THREE.Vector3(0.5,0,4), grid: {start:{x:-21, y:0, z:-3.5}, yOffset: 0, collide: true},}, true);
auxl.kayKitArchGateX2 = auxl.Core(auxl.kayKitArchGateX2Data);

//Arch Gate Z
auxl.kayKitArchGateZData = {
	data:'kayKitArchGateZData',
	id:'kayKitArchGateZ',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,4),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/arch_gate.glb',
	},
};
//Fence
auxl.kayKitFenceData = {
	data:'kayKitFenceData',
	id:'kayKitFence',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4,0,0.5),
	grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence.glb',
	},
};
auxl.kayKitFence = auxl.Core(auxl.kayKitFenceData);
//Fence Z
auxl.kayKitFenceZData = {
	data:'kayKitFenceZData',
	id:'kayKitFenceZ',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,4),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence.glb',
	},
};
//Fence Broken
auxl.kayKitFenceBrokenData = {
	data:'kayKitFenceBrokenData',
	id:'kayKitFenceBroken',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4,0,0.5),
	grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_broken.glb',
	},
};
auxl.kayKitFenceBroken = auxl.Core(auxl.kayKitFenceBrokenData);
//Fence Broken Z
auxl.kayKitFenceBrokenZData = {
	data:'kayKitFenceBrokenZData',
	id:'kayKitFenceBrokenZ',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,4),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_broken.glb',
	},
};
//Fence Gate
auxl.kayKitFenceGateData = {
	data:'kayKitFenceGateData',
	id:'kayKitFenceGate',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(4,0,0.5),
	grid: {start:{x:-10, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_gate.glb',
	},
};
auxl.kayKitFenceGate = auxl.Core(auxl.kayKitFenceGateData);
//Fence Gate Z
auxl.kayKitFenceGateZData = {
	data:'kayKitFenceGateZData',
	id:'kayKitFenceGateZ',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,4),
	//grid: {start:{x:-10, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_gate.glb',
	},
};
//Fence Pillar
auxl.kayKitFencePillarData = {
	data:'kayKitFencePillarData',
	id:'kayKitFencePillar',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_pillar.glb',
	},
};
auxl.kayKitFencePillar = auxl.Core(auxl.kayKitFencePillarData);
//Fence Pillar Broken
auxl.kayKitFencePillarBrokenData = {
	data:'kayKitFencePillarBrokenData',
	id:'kayKitFencePillarBroken',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(0.5,0,0.5),
	grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/fence_pillar_broken.glb',
	},
};
auxl.kayKitFencePillarBroken = auxl.Core(auxl.kayKitFencePillarBrokenData);


//Trees
//

//Tree Dead Large
auxl.kayKitTreeDeadLargeData = {
	data:'kayKitTreeDeadLargeData',
	id:'kayKitTreeDeadLarge',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_dead_large.glb',
	},
};
auxl.kayKitTreeDeadLarge = auxl.Core(auxl.kayKitTreeDeadLargeData);
//Tree Dead Large Decorated
auxl.kayKitTreeDeadLargeDecoratedData = {
	data:'kayKitTreeDeadLargeDecoratedData',
	id:'kayKitTreeDeadLargeDecorated',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_dead_large_decorated.glb',
	},
};
auxl.kayKitTreeDeadLargeDecorated = auxl.Core(auxl.kayKitTreeDeadLargeDecoratedData);
auxl.kayKitTreeDeadLargeDecorated1Data = auxl.CoreDataFromTemplate(auxl.kayKitTreeDeadLargeDecoratedData, {id: 'kayKitTreeDeadLargeDecorated1', rotation: new THREE.Vector3(0,90,0),}, true);
auxl.kayKitTreeDeadLargeDecorated2Data = auxl.CoreDataFromTemplate(auxl.kayKitTreeDeadLargeDecoratedData, {id: 'kayKitTreeDeadLargeDecorated2', rotation: new THREE.Vector3(0,180,0),}, true);
auxl.kayKitTreeDeadLargeDecorated3Data = auxl.CoreDataFromTemplate(auxl.kayKitTreeDeadLargeDecoratedData, {id: 'kayKitTreeDeadLargeDecorated3', rotation: new THREE.Vector3(0,0,0),}, true);
auxl.kayKitTreeDeadLargeDecorated4Data = auxl.CoreDataFromTemplate(auxl.kayKitTreeDeadLargeDecoratedData, {id: 'kayKitTreeDeadLargeDecorated4', rotation: new THREE.Vector3(0,315,0),}, true);



//Tree Dead Medium
auxl.kayKitTreeDeadMediumData = {
	data:'kayKitTreeDeadMediumData',
	id:'kayKitTreeDeadMedium',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_dead_medium.glb',
	},
};
auxl.kayKitTreeDeadMedium = auxl.Core(auxl.kayKitTreeDeadMediumData);
//Tree Dead Small
auxl.kayKitTreeDeadSmallData = {
	data:'kayKitTreeDeadSmallData',
	id:'kayKitTreeDeadSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_dead_small.glb',
	},
};
auxl.kayKitTreeDeadSmall = auxl.Core(auxl.kayKitTreeDeadSmallData);
//Tree Pine Orange Large
auxl.kayKitTreePineOrangeLargeData = {
	data:'kayKitTreePineOrangeLargeData',
	id:'kayKitTreePineOrangeLarge',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_orange_large.glb',
	},
};
auxl.kayKitTreePineOrangeLarge = auxl.Core(auxl.kayKitTreePineOrangeLargeData);
//Tree Pine Orange Medium
auxl.kayKitTreePineOrangeMediumData = {
	data:'kayKitTreePineOrangeMediumData',
	id:'kayKitTreePineOrangeMedium',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_orange_medium.glb',
	},
};
auxl.kayKitTreePineOrangeMedium = auxl.Core(auxl.kayKitTreePineOrangeMediumData);
//Tree Pine Orange Small
auxl.kayKitTreePineOrangeSmallData = {
	data:'kayKitTreePineOrangeSmallData',
	id:'kayKitTreePineOrangeSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_orange_small.glb',
	},
};
auxl.kayKitTreePineOrangeSmall = auxl.Core(auxl.kayKitTreePineOrangeSmallData);
//Tree Pine Yellow Large
auxl.kayKitTreePineYellowLargeData = {
	data:'kayKitTreePineYellowLargeData',
	id:'kayKitTreePineYellowLarge',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_yellow_large.glb',
	},
};
auxl.kayKitTreePineYellowLarge = auxl.Core(auxl.kayKitTreePineYellowLargeData);
//Tree Pine Yellow Medium
auxl.kayKitTreePineYellowMediumData = {
	data:'kayKitTreePineYellowMediumData',
	id:'kayKitTreePineYellowMedium',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_yellow_medium.glb',
	},
};
auxl.kayKitTreePineYellowMedium = auxl.Core(auxl.kayKitTreePineYellowMediumData);
//Tree Pine Yellow Small
auxl.kayKitTreePineYellowSmallData = {
	data:'kayKitTreePineYellowSmallData',
	id:'kayKitTreePineYellowSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(1,0,1),
	//grid: {start:{x:0, y:0, z:-10}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_pine_yellow_small.glb',
	},
};
auxl.kayKitTreePineYellowSmall = auxl.Core(auxl.kayKitTreePineYellowSmallData);


//
//Collision Decoration

//Doors
auxl.hallowGridDoorsData = {
id: 'hallowGridDoors',
coreData: [
	auxl.kayKitDoor1Data,
	auxl.kayKitDoor2Data,
	auxl.kayKitDoor3Data,
	auxl.kayKitDoor4Data,
	auxl.kayKitDoor5Data,
	auxl.kayKitDoor6Data,
	auxl.kayKitDoor7Data,
],
grids:{
layout1:[
	{start:{x:-15, y:0, z:-5},},
	{start:{x:-15, y:0, z:-10},},
	{start:{x:-15, y:0, z:-15},},
	{start:{x:-15, y:0, z:-20},},
	{start:{x:-15, y:0, z:-25},},
	{start:{x:-15, y:0, z:-30},},
	{start:{x:-15, y:0, z:-35},},
],},};
auxl.hallowGridDoors = auxl.GridLayout(auxl.hallowGridDoorsData);

//Fences X
auxl.hallowGridFencesXData = {
id: 'hallowGridFencesX',
coreData: [
	auxl.kayKitFenceData,
	auxl.kayKitFenceBrokenData,
	auxl.kayKitFenceGateData,
],
grids:{
layout1:[
	{start:{x:-21, y:0, z:-21,},},
	{start:{x:-17.5, y:0, z:-21,},},
	{start:{x:-14, y:0, z:-21,},},
	{start:{x:-10.5, y:0, z:-21,},},
	{start:{x:-7, y:0, z:-21,},},
	//{start:{x:-3.5, y:0, z:-21,},},
	{start:{x:0, y:0, z:-21,},},
	{start:{x:3.5, y:0, z:-21,},},
	{start:{x:7, y:0, z:-21,},},
	{start:{x:10.5, y:0, z:-21,},},
	{start:{x:14, y:0, z:-21,},},
	{start:{x:17.5, y:0, z:-21,},},
	{start:{x:-21, y:0, z:21,},},
	{start:{x:-17.5, y:0, z:21,},},
	{start:{x:-14, y:0, z:21,},},
	{start:{x:-10.5, y:0, z:21,},},
	{start:{x:-7, y:0, z:21,},},
	{start:{x:0, y:0, z:21,},},
	{start:{x:3.5, y:0, z:21,},},
	{start:{x:7, y:0, z:21,},},
	{start:{x:10.5, y:0, z:21,},},
	{start:{x:14, y:0, z:21,},},
	{start:{x:17.5, y:0, z:21,},},

	{start:{x:-21, y:0, z:-14},},
	{start:{x:-21, y:0, z:7},},
	{start:{x:17.5, y:0, z:-10.5},},
	{start:{x:17.5, y:0, z:3.5},},
	{start:{x:17.5, y:0, z:14.5},},
	{start:{x:-21, y:0, z:14},},
],},};
auxl.hallowGridFencesX = auxl.GridLayout(auxl.hallowGridFencesXData);


//Fences Z
auxl.hallowGridFencesZData = {
id: 'hallowGridFencesZ',
coreData: [
	auxl.kayKitFenceZData,
	auxl.kayKitFenceBrokenZData,
	auxl.kayKitFenceGateZData,
],
grids:{
layout1:[
	{start:{x:-21, y:0, z:-21},},
	{start:{x:-21, y:0, z:-17.5},},
	{start:{x:-21, y:0, z:-14},},
	{start:{x:-21, y:0, z:-10.5},},
	{start:{x:-21, y:0, z:-7},},
	//{start:{x:-21, y:0, z:-3.5},},
	{start:{x:-21, y:0, z:0},},
	{start:{x:-21, y:0, z:3.5},},
	{start:{x:-21, y:0, z:7},},
	{start:{x:-21, y:0, z:10.5},},
	{start:{x:-21, y:0, z:14},},
	{start:{x:-21, y:0, z:17.5},},
	{start:{x:21, y:0, z:-21},},
	{start:{x:21, y:0, z:-17.5},},
	{start:{x:21, y:0, z:-14},},
	{start:{x:21, y:0, z:-10.5},},
	{start:{x:21, y:0, z:-7},},
	//{start:{x:21, y:0, z:-3.5},},
	{start:{x:21, y:0, z:0},},
	{start:{x:21, y:0, z:3.5},},
	{start:{x:21, y:0, z:7},},
	{start:{x:21, y:0, z:10.5},},
	{start:{x:21, y:0, z:14},},
	{start:{x:21, y:0, z:17.5},},

	{start:{x:-10.5, y:0, z:-21,},},
	{start:{x:3.5, y:0, z:-21,},},
	{start:{x:14, y:0, z:-21,},},
	{start:{x:-14, y:0, z:17.5,},},
	{start:{x:-7, y:0, z:17.5,},},
	{start:{x:10.5, y:0, z:17.5,},},
],},};
auxl.hallowGridFencesZ = auxl.GridLayout(auxl.hallowGridFencesZData);

//Graves
auxl.hallowGridGravesData = {
id: 'hallowGridGraves',
coreData: [
	auxl.kayKitGravemarkerAData,
	auxl.kayKitGraveAData,
	auxl.kayKitGraveADestroyedData,
	auxl.kayKitGraveBData,
	auxl.kayKitGravestoneData,
	auxl.kayKitGravemarkerBData,
],
grids:{
layout1:[
	{start:{x:-17, y:0, z:12},},
	{start:{x:-12, y:0, z:12},},
	{start:{x:-7, y:0, z:12},},
	{start:{x:3, y:0, z:12},},
	{start:{x:8, y:0, z:12},},
	{start:{x:13, y:0, z:12},},

	{start:{x:-17, y:0, z:-5},},
	{start:{x:-12, y:0, z:-5},},
	{start:{x:-7, y:0, z:-5},},
	{start:{x:3, y:0, z:-5},},
	{start:{x:8, y:0, z:-5},},
	{start:{x:13, y:0, z:-5},},

],},};
auxl.hallowGridGraves = auxl.GridLayout(auxl.hallowGridGravesData);
auxl.hallowGridGravesAltData = {
id: 'hallowGridGravesAlt',
coreData: [
	auxl.kayKitGravemarkerBData,
	auxl.kayKitGravemarkerAData,
	auxl.kayKitGraveAData,
	auxl.kayKitGravestoneData,
	auxl.kayKitGraveBData,
	auxl.kayKitGraveADestroyedData,
],
grids:{
layout1:[
	{start:{x:-15, y:0, z:5},},
	{start:{x:-10, y:0, z:5},},
	{start:{x:-5, y:0, z:5},},
	{start:{x:5, y:0, z:5},},
	{start:{x:10, y:0, z:5},},
	{start:{x:15, y:0, z:5},},

	{start:{x:-15, y:0, z:-12},},
	{start:{x:-10, y:0, z:-12},},
	{start:{x:-5, y:0, z:-12},},
	{start:{x:5, y:0, z:-12},},
	{start:{x:10, y:0, z:-12},},
	{start:{x:15, y:0, z:-12},},

],},};
auxl.hallowGridGravesAlt = auxl.GridLayout(auxl.hallowGridGravesAltData);

//Alt Graves
auxl.hallowGridAltGravesData = {
id: 'hallowGridAltGraves',
coreData: [

	auxl.kayKitShrineCandlesData,
	auxl.kayKitCoffinDecoratedData,
	auxl.kayKitPlaqueData,
	auxl.kayKitPlaqueCandlesData,
	auxl.kayKitCoffinData,
	auxl.kayKitShrineData,
],
grids:{
layout1:[
	{start:{x:-16, y:0, z:0},},
	{start:{x:-11, y:0, z:0},},
	{start:{x:-6, y:0, z:0},},
	{start:{x:4, y:0, z:0},},
	{start:{x:9, y:0, z:0},},
	{start:{x:14, y:0, z:0},},
],},};
auxl.hallowGridAltGraves = auxl.GridLayout(auxl.hallowGridAltGravesData);

//Trees
auxl.hallowGridTreesData = {
id: 'hallowGridTrees',
coreData: [
	auxl.kayKitTreeDeadSmallData,
	auxl.kayKitTreePineOrangeSmallData,
	auxl.kayKitTreePineYellowSmallData,
],
grids:{
layout1:[
	//Back
	{start:{x:-17, y:0, z:-20.5},},
	//{start:{x:-9, y:0, z:-20},},
	{start:{x:7, y:0, z:-19.5},},
	{start:{x:15, y:0, z:-20},},
	//Front
	{start:{x:-14, y:0, z:18.5},},
	{start:{x:-6, y:0, z:19},},
	//{start:{x:10, y:0, z:19.5},},
	{start:{x:18, y:0, z:19},},
	//Left
	{start:{x:-19.5, y:0, z:-16},},
	{start:{x:-20, y:0, z:-8},},
	//{start:{x:-18, y:0, z:8},},
	{start:{x:-20, y:0, z:16},},
	//Right
	{start:{x:19, y:0, z:-17},},
	{start:{x:18.5, y:0, z:-9},},
	//{start:{x:19, y:0, z:7},},
	{start:{x:18, y:0, z:15},},
],},};
auxl.hallowGridTrees = auxl.GridLayout(auxl.hallowGridTreesData);

//Trees
auxl.hallowGridSkullTreesData = {
id: 'hallowGridSkullTrees',
coreData: [
	auxl.kayKitTreeDeadLargeDecorated3Data,
	auxl.kayKitTreeDeadLargeDecorated2Data,
	auxl.kayKitTreeDeadLargeDecorated1Data,
	auxl.kayKitTreeDeadLargeDecorated4Data,
],
grids:{
layout1:[
	{start:{x:1, y:0, z:-20},},
	{start:{x:2, y:0, z:19},},
	{start:{x:-20, y:0, z:2},},
	{start:{x:19, y:0, z:1},},
],},};
auxl.hallowGridSkullTrees = auxl.GridLayout(auxl.hallowGridSkullTreesData);

//Deco
auxl.hallowGridDecoData = {
id: 'hallowGridDeco',
coreData: [
	auxl.kayKitPumpkinOrangeData,
	auxl.kayKitPumpkinOrangeSmallData,
	auxl.kayKitPumpkinYellowData,
	auxl.kayKitPumpkinYellowSmallData,
	auxl.kayKitSkullData,
	auxl.kayKitSkullCandlesData,
],
grids:{
layout1:[
	{start:{x:-18.5, y:0, z:16.5},},
	{start:{x:-13.5, y:0, z:7.5},},
	{start:{x:7.5, y:0, z:-10},},
	{start:{x:16.5, y:0, z:-16.5},},
	{start:{x:16.5, y:0, z:11.5},},
	{start:{x:11.5, y:0, z:3.5},},
	{start:{x:-8.5, y:0, z:-1.5},},
	{start:{x:-18.5, y:0, z:-10.5},},
	{start:{x:-11.5, y:0, z:16.5},},
	{start:{x:-14.5, y:0, z:4.5},},
	{start:{x:1, y:0, z:-2},},
	{start:{x:-7, y:0, z:-11},},
	{start:{x:6.5, y:0, z:13.5},},
	{start:{x:4.5, y:0, z:4.5},},
	{start:{x:-17.5, y:0, z:-4.5},},
	{start:{x:-14.5, y:0, z:3.5},},
],},};
auxl.hallowGridDeco = auxl.GridLayout(auxl.hallowGridDecoData);


//Jackos
auxl.hallowGridJackosData = {
id: 'hallowGridJackos',
coreData: [
	auxl.kayKitPumpkinYellowJacko2Data,
	auxl.kayKitPumpkinOrangeJacko1Data,
	auxl.kayKitPumpkinYellowJacko3Data,
	auxl.kayKitPumpkinOrangeJacko3Data,
	auxl.kayKitPumpkinYellowJacko1Data,
	auxl.kayKitPumpkinYellowJacko4Data,
	auxl.kayKitPumpkinOrangeJacko2Data,
	auxl.kayKitPumpkinOrangeJacko4Data,
],
grids:{
layout1:[
	{start:{x:-7, y:0, z:6},},
	{start:{x:-9, y:0, z:-16},},
	{start:{x:13, y:0, z:17.5},},
	{start:{x:9, y:0, z:-2},},
	{start:{x:-19, y:0, z:-10},},
	{start:{x:3, y:0, z:-12},},
	{start:{x:-17.5, y:0, z:12.5},},
	{start:{x:17.5, y:0, z:-17.5},},

],},};
auxl.hallowGridJackos = auxl.GridLayout(auxl.hallowGridJackosData);


//Tall Deco
auxl.hallowGridTallDecoData = {
id: 'hallowGridTallDeco',
coreData: [
	auxl.kayKitPostLanternData,
	auxl.kayKitPostSkullData,
	auxl.kayKitPostData,
],
grids:{
layout1:[
	{start:{x:-9, y:0, z:-20},},
	{start:{x:10, y:0, z:19.5},},
	{start:{x:-18, y:0, z:8},},
	{start:{x:19, y:0, z:7},},
],},};
auxl.hallowGridTallDeco = auxl.GridLayout(auxl.hallowGridTallDecoData);

//Benchs
//

//Bench Decorated 1
auxl.spookyBenchDecorated1Data = {
	data:'spookyBenchDecorated1Data',
	id:'spookyBenchDecorated1',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,1),
	grid: {start:{x:11, y:0, z:-20}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bench_decorated.glb',
	},
};
auxl.spookyBenchDecorated1 = auxl.Core(auxl.spookyBenchDecorated1Data);
//Bench Decorated 2
auxl.spookyBenchDecorated2Data = {
	data:'spookyBenchDecorated2Data',
	id:'spookyBenchDecorated2',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,1),
	grid: {start:{x:-13, y:0, z:20}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bench_decorated.glb',
	},
};
auxl.spookyBenchDecorated2 = auxl.Core(auxl.spookyBenchDecorated2Data);
//Bench Decorated 3
auxl.spookyBenchDecorated3Data = {
	data:'spookyBenchDecorated3Data',
	id:'spookyBenchDecorated3',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,2),
	grid: {start:{x:-20.5, y:0, z:-13}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bench_decorated.glb',
	},
};
auxl.spookyBenchDecorated3 = auxl.Core(auxl.spookyBenchDecorated3Data);
//Bench Decorated 4
auxl.spookyBenchDecorated4Data = {
	data:'spookyBenchDecorated4Data',
	id:'spookyBenchDecorated4',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,270,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,2),
	grid: {start:{x:20, y:0, z:-8}, yOffset: 0, collide: true},
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/bench_decorated.glb',
	},
};
auxl.spookyBenchDecorated4 = auxl.Core(auxl.spookyBenchDecorated4Data);





//
//No Collision Decoration


//Outer Environment Ring
auxl.spookyTreeRingData = {
	data:'spookyTreeRingData',
	id:'spookyTreeRing',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	components:{
		['gltf-model']:'./assets/3d/kayKit/hallows/tree_ring.glb',
	},
};
auxl.spookyTreeRing = auxl.Core(auxl.spookyTreeRingData);

//Inner Environment Decoration Rings
//

//Inner Ring 1
auxl.innerRing1Data = {
	id: 'innerRing1',
	objData: auxl.kayKitBoneAData,
	total: 5,
	outerRingRadius: 22,
	innerRingRadius: 1,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: false,
	ranScaleZ: true,
	scaleFlex: 0.25,
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
};
auxl.innerRing1 = auxl.ObjsGenRing(auxl.innerRing1Data);
//Inner Ring 2
auxl.innerRing2Data = {
	id: 'innerRing2',
	objData: auxl.kayKitBoneBData,
	total: 4,
	outerRingRadius: 22,
	innerRingRadius: 1,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: false,
	ranScaleZ: true,
	scaleFlex: 0.25,
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
};
auxl.innerRing2 = auxl.ObjsGenRing(auxl.innerRing2Data);
//Inner Ring 3
auxl.innerRing3Data = {
	id: 'innerRing3',
	objData: auxl.kayKitBoneCData,
	total: 3,
	outerRingRadius: 22,
	innerRingRadius: 1,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: false,
	ranScaleZ: true,
	scaleFlex: 0.25,
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
};
auxl.innerRing3 = auxl.ObjsGenRing(auxl.innerRing3Data);
//Inner Ring 4
auxl.innerRing4Data = {
	id: 'innerRing4',
	objData: auxl.kayKitCandleTripleData,
	total: 6,
	outerRingRadius: 22,
	innerRingRadius: 1,
	sameTypeRadius: 2,
	otherTypeRadius: 1,
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 0.5,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
};
auxl.innerRing4 = auxl.ObjsGenRing(auxl.innerRing4Data);

//
//Room 1

//Exterior Darkness
auxl.spookyRoom1ExtData = {
	data:'spookyRoom1ExtData',
	id:'spookyRoom1Ext',
	geometry: {primitive: 'box', height: 20, width: 20, depth: 140},
	material: {shader: "standard", color: "#000000", opacity: 1, side: 'back'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Ext = auxl.Core(auxl.spookyRoom1ExtData);

//Room 1 to Exterior
auxl.room1ToExteriorData = {
data:'room1ToExteriorData',
id:'room1ToExterior',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,59.725),
gridSize: new THREE.Vector3(2.5,0,0.5),
grid: {start:{x:-1, y:0, z:59.5}, collide: true},
rotation: new THREE.Vector3(0,180,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	doorway:{zone: 'spookyZone', to: 'connect0', posTo: true, pos: new THREE.Vector3(-2.5,0,-19.5), twistTo: true, twist: 180},
	hovertext:{value: 'Return',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
	clickrun__click1:{
		delay: '450',
		cursorObj: 'skyBoxSpooky',
		component: 'null',
		method: 'SpawnSkyBox',
		params: 'null',
	},
	clickrun__click2:{
		delay: '450',
		cursorObj: 'skyBoxSpooky',
		component: 'null',
		method: 'SetTime',
		params: '21',
	},
},
};
auxl.room1ToExterior = auxl.Core(auxl.room1ToExteriorData);

//Room 1 to Room 1 Alt
auxl.room1ToRoom1AltData = {
data:'room1ToRoom1AltData',
id:'room1ToRoom1Alt',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,59.725),
gridSize: new THREE.Vector3(2.5,0,0.5),
grid: {start:{x:-1, y:0, z:-59.5}, collide: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	doorway:{zone: 'spookyZone', to: 'connect2', posTo: true, pos: new THREE.Vector3(0,0,0), twistTo: true, twist: 0},
	hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.room1ToRoom1Alt = auxl.Core(auxl.room1ToRoom1AltData);

//Block Room 1 Alt Far Click
auxl.spookyRoom1AltBlockData = {
	data:'spookyRoom1AltBlockData',
	id:'spookyRoom1AltBlock',
	geometry: {primitive: 'box', height: 20, width: 20, depth: 0.1},
	material: {shader: "standard", color: "#000000", opacity: 0},
	position: new THREE.Vector3(0,0,-54),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
};
auxl.spookyRoom1AltBlock = auxl.Core(auxl.spookyRoom1AltBlockData);

//Floor
auxl.spookyRoom1FloorData = {
	data:'spookyRoom1FloorData',
	id:'spookyRoom1Floor',
	geometry: {primitive: 'plane', width: 11, height: 122,},
	material: {shader: "standard", color: "#571529", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#571529", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '2.5 66'},
	position: new THREE.Vector3(0,-0.1,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Floor = auxl.Core(auxl.spookyRoom1FloorData);
//Alt Floor
auxl.spookyRoom1AltFloorData = {
	data:'spookyRoom1AltFloorData',
	id:'spookyRoom1AltFloor',
	geometry: {primitive: 'plane', width: 12, height: 12,},
	material: {shader: "standard", color: "#571529", opacity: 1, metalness: 0.2, roughness: 0.8, side: 'front', src: auxl.pattern50, repeat: '6 6'},
	position: new THREE.Vector3(0,-1.5,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1AltFloor = auxl.Core(auxl.spookyRoom1AltFloorData);

//Ceiling
auxl.spookyRoom1CeilingData = {
	data:'spookyRoom1CeilingData',
	id:'spookyRoom1Ceiling',
	geometry: {primitive: 'plane', width: 11, height: 122,},
	material: {shader: "standard", color: "#571529", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#571529", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '2.5 60'},
	position: new THREE.Vector3(0,7,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent'],
};
auxl.spookyRoom1Ceiling = auxl.Core(auxl.spookyRoom1CeilingData);
//Alt Ceiling
auxl.spookyRoom1AltCeilingData = {
	data:'spookyRoom1AltCeilingData',
	id:'spookyRoom1AltCeiling',
	geometry: {primitive: 'plane', width: 12, height: 12,},
	material: {shader: "standard", color: "#571529", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#571529", emissiveIntensity: 0, side: 'front', src: auxl.pattern50, repeat: '3 3'},
	position: new THREE.Vector3(0,7,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1AltCeiling = auxl.Core(auxl.spookyRoom1AltCeilingData);
//Wall 0
auxl.spookyRoom1Wall0Data = {
	data:'spookyRoom1Wall0Data',
	id:'spookyRoom1Wall0',
	geometry: {primitive: 'plane', width: 11, height: 9,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '4 5.5'},
	position: new THREE.Vector3(0,4.5,59.75),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Wall0 = auxl.Core(auxl.spookyRoom1Wall0Data);
//Wall 1
auxl.spookyRoom1Wall1Data = {
	data:'spookyRoom1Wall1Data',
	id:'spookyRoom1Wall1',
	geometry: {primitive: 'box', height: 8, width: 0.5, depth: 119.5},
	material: {shader: "standard", color: "#7e2641", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#7e2641", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '59.25 4'},
	position: new THREE.Vector3(0,0,0),
	grid: {start:{x:-5, y:0, z:-59.5}, yOffset: 4, collide: true},
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Wall1 = auxl.Core(auxl.spookyRoom1Wall1Data);
//Wall 2
auxl.spookyRoom1Wall2Data = {
	data:'spookyRoom1Wall2Data',
	id:'spookyRoom1Wall2',
	geometry: {primitive: 'box', height: 8, width: 0.5, depth: 119.5},
	material: {shader: "standard", color: "#7e2641", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#7e2641", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '59.25 4'},
	position: new THREE.Vector3(5,0,0),
	grid: {start:{x:5, y:0, z:-59.5}, yOffset: 4, collide: true},
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Wall2 = auxl.Core(auxl.spookyRoom1Wall2Data);
//Wall 3
auxl.spookyRoom1Wall3Data = {
	data:'spookyRoom1Wall3Data',
	id:'spookyRoom1Wall3',
	geometry: {primitive: 'plane', width: 11, height: 9,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern50, repeat: '4 5.5'},
	position: new THREE.Vector3(0,4.5,-59.75),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom1Wall3 = auxl.Core(auxl.spookyRoom1Wall3Data);

//Alt Walls
auxl.room1AltHorizonData = {
id: 'room1AltHorizon',
type: 'squareWall',
texture: {src: auxl.pattern18, repeat: '3 5',},
baseColor: '#80401f',
baseColorFamily: false,
radius: 6,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.room1AltHorizon = auxl.Horizon(auxl.room1AltHorizonData);

//Room 1 Rug
auxl.spookyRoom1RugData = {
	data:'spookyRoom1RugData',
	id:'spookyRoom1Rug',
	text: false,
	geometry: {primitive: 'plane', width: 3, height: 120,},
	material: {shader: "standard", color: "#b11e4b", opacity: 1, roughness: 1, emissive: "#b11e4b", emissiveIntensity: 0.1, side: 'front', src: auxl.pattern07, repeat: '1 1'},
	position: new THREE.Vector3(0,-0.05,0),
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
};
auxl.spookyRoom1Rug = auxl.Core(auxl.spookyRoom1RugData);

//Doors
//

//Door 1
auxl.room1Door1Data = {
data:'room1Door1Data',
id:'room1Door1',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(1.5,0,3),
grid: {start:{x:4, y:0, z:43.5}, collide: true},
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	['teleportation-to']:{x:0, y:0, z:58.5, twistTo: true, twist: 0, event: 'click'},
	hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.room1Door1 = auxl.Core(auxl.room1Door1Data);
//Door 2
auxl.room1Door2Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door2', position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:-5, y:0, z:28.5}, collide: true}, rotation: new THREE.Vector3(0,90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:3.5, y:0, z:45, twistTo: true, twist: 90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door2 = auxl.Core(auxl.room1Door2Data);
//Door 3
auxl.room1Door3Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door3', sounds:{open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'}, knife: {src: auxl.soundKnifeSharpening, autoplay: true, loop: true, volume: 1, }, }, position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:4, y:0, z:13.5}, collide: true}, rotation: new THREE.Vector3(0,-90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:-3.5, y:0, z:30, twistTo: true, twist: -90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door3 = auxl.Core(auxl.room1Door3Data);
//Door 4
auxl.room1Door4Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door4', position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:-5, y:0, z:-1.5}, collide: true}, rotation: new THREE.Vector3(0,90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:3.5, y:0, z:15, twistTo: true, twist: 90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door4 = auxl.Core(auxl.room1Door4Data);
//Door 5
auxl.room1Door5Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door5', sounds:{open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'}, drops: {src: auxl.soundWaterDrops, autoplay: true, loop: true, volume: 1,}, },position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:4, y:0, z:-16.5}, collide: true}, rotation: new THREE.Vector3(0,-90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:-3.5, y:0, z:0, twistTo: true, twist: -90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door5 = auxl.Core(auxl.room1Door5Data);
//Door 6
auxl.room1Door6Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door6', position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:-5, y:0, z:-31.5}, collide: true}, rotation: new THREE.Vector3(0,90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:3.5, y:0, z:-15, twistTo: true, twist: 90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door6 = auxl.Core(auxl.room1Door6Data);
//Door 7
auxl.room1Door7Data = auxl.CoreDataFromTemplate(auxl.room1Door1Data, {id: 'room1Door7', sounds:{open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'}, pendulum: {src: auxl.soundPendulumMachine, autoplay: true, loop: true, volume: 1,}, }, position: new THREE.Vector3(0,0,0), gridSize: new THREE.Vector3(1.5,0,3), grid: {start:{x:4, y:0, z:-46.5}, collide: true}, rotation: new THREE.Vector3(0,-90,0), components: {['gltf-model']:'./assets/3d/kayKit/doors/door1.glb', ['teleportation-to']:{x:-3.5, y:0, z:-30, twistTo: true, twist: -90, event: 'click'}, hovertext:{value: '???',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},},}, true);
auxl.room1Door7 = auxl.Core(auxl.room1Door7Data);
//Alt Door
//Door 7
auxl.room1AltDoorData = {
data:'room1AltDoorData',
id:'room1AltDoor',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,-1.5,5.725),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door1.glb',
	hovertext:{value: 'Locked',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.room1AltDoor = auxl.Core(auxl.room1AltDoorData);

//Table
auxl.spookyRoom1Table1Data = {
	data:'spookyRoom1Table1Data',
	id:'spookyRoom1Table1',
	position: new THREE.Vector3(0,0,0),
	gridSize: new THREE.Vector3(1,0,1),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cabinet_small.glb',
	},
};
auxl.spookyRoom1Table1AltData = auxl.CoreDataFromTemplate(auxl.spookyRoom1Table1Data, {id: 'spookyRoom1Table1Alt',rotation: new THREE.Vector3(0,-90,0), }, true);

auxl.spookyRoom1Table2Data = {
	data:'spookyRoom1Table2Data',
	id:'spookyRoom1Table2',
	position: new THREE.Vector3(0,0,0),
	gridSize: new THREE.Vector3(1,0,1),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cabinet_small_decorated.glb',
	},
};
auxl.spookyRoom1Table2AltData = auxl.CoreDataFromTemplate(auxl.spookyRoom1Table2Data, {id: 'spookyRoom1Table1Alt',rotation: new THREE.Vector3(0,90,0), }, true);
//Tables 1 - 7
auxl.room1TablesGridData = {
id: 'room1TablesGrid',
coreData: [
	auxl.spookyRoom1Table1Data,
	auxl.spookyRoom1Table2Data,
	auxl.spookyRoom1Table2AltData,
	auxl.spookyRoom1Table1AltData,
],
grids:{
layout1:[
	{start:{x:-4.5, y:0, z:45},},
	{start:{x:4, y:0, z:30},},
	{start:{x:-4.5, y:0, z:15},},
	{start:{x:4, y:0, z:0},},
	{start:{x:-4.5, y:0, z:-15},},
	{start:{x:4, y:0, z:-30},},
	{start:{x:-4.5, y:0, z:-45},},

],},};
auxl.room1TablesGrid = auxl.GridLayout(auxl.room1TablesGridData);

//Paintings 1 - 13

//Painting 1
auxl.spookyRoom1Painting1Data = {
	data:'spookyRoom1Painting1Data',
	id:'spookyRoom1Painting1',
	sounds:{
		spookwoosh: {src: auxl.spookWoosh, autoplay: false, loop: false, volume: 0.5, on: 'mouseenter'},
	},
	geometry: {primitive: 'plane', width: 2.5, height: 3.75,},
	material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting1Alt,},
	position: new THREE.Vector3(-4.725,3.25,40),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
		mouseenterrun__spooky:{
			cursorObj: 'spookyRoom1Painting1',
			component: 'null',
			method: 'ChangeMatSrc',
			params: auxl.spookyPainting1Alt,
		},
		mouseleaverun__normal:{
			cursorObj: 'spookyRoom1Painting1',
			component: 'null',
			method: 'ChangeMatSrc',
			params: auxl.spookyPainting1,
		},
	},
};
auxl.spookyRoom1Painting1 = auxl.Core(auxl.spookyRoom1Painting1Data);
//Painting 2
auxl.spookyRoom1Painting2Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting2', sounds:{spookwoosh: {src: auxl.spookWoosh, autoplay: false, loop: false, volume: 0.5, on: 'mouseenter'}, footsteps: {src: auxl.soundFootsteps, autoplay: true, loop: true, volume: 1,},}, position: new THREE.Vector3(4.725,3.25,35), rotation: new THREE.Vector3(0,-90,0),	material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting2Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting2', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting2Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting2', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting2,},},}, true);
auxl.spookyRoom1Painting2 = auxl.Core(auxl.spookyRoom1Painting2Data);
//Painting 3
auxl.spookyRoom1Painting3Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting3', position: new THREE.Vector3(4.725,3.25,25), rotation: new THREE.Vector3(0,-90,0),	material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting3Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting3', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting3Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting3', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting3,},}}, true);
auxl.spookyRoom1Painting3 = auxl.Core(auxl.spookyRoom1Painting3Data);
//Painting 4
auxl.spookyRoom1Painting4Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting4', position: new THREE.Vector3(-4.725,3.25,20), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting4Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting4', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting4Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting4', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting4,},}}, true);
auxl.spookyRoom1Painting4 = auxl.Core(auxl.spookyRoom1Painting4Data);
//Painting 5
auxl.spookyRoom1Painting5Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting5', position: new THREE.Vector3(-4.725,3.25,10), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting5Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting5', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting5Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting5', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting5,},}}, true);
auxl.spookyRoom1Painting5 = auxl.Core(auxl.spookyRoom1Painting5Data);
//Painting 6
auxl.spookyRoom1Painting6Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting6', position: new THREE.Vector3(4.725,3.25,5), rotation: new THREE.Vector3(0,-90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting6Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting6', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting6Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting6', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting6,},}}, true);
auxl.spookyRoom1Painting6 = auxl.Core(auxl.spookyRoom1Painting6Data);
//Painting 7
auxl.spookyRoom1Painting7Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting7', position: new THREE.Vector3(4.725,3.25,-5), rotation: new THREE.Vector3(0,-90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting13Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting7', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting13Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting7', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting13,},}}, true);
auxl.spookyRoom1Painting7 = auxl.Core(auxl.spookyRoom1Painting7Data);
//Painting 8
auxl.spookyRoom1Painting8Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting8', position: new THREE.Vector3(-4.725,3.25,-10), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting7Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting8', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting7Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting8', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting7,},}}, true);
auxl.spookyRoom1Painting8 = auxl.Core(auxl.spookyRoom1Painting8Data);
//Painting 9
auxl.spookyRoom1Painting9Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting9', position: new THREE.Vector3(-4.725,3.25,-20), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting8Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting9', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting8Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting9', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting8,},}}, true);
auxl.spookyRoom1Painting9 = auxl.Core(auxl.spookyRoom1Painting9Data);
//Painting 10
auxl.spookyRoom1Painting10Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting10', position: new THREE.Vector3(4.725,3.25,-25), rotation: new THREE.Vector3(0,-90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting9Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting10', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting9Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting10', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting9,},}}, true);
auxl.spookyRoom1Painting10 = auxl.Core(auxl.spookyRoom1Painting10Data);
//Painting 11
auxl.spookyRoom1Painting11Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting11', position: new THREE.Vector3(4.725,3.25,-35), rotation: new THREE.Vector3(0,-90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting10Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting11', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting10Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting11', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting10,},}}, true);
auxl.spookyRoom1Painting11 = auxl.Core(auxl.spookyRoom1Painting11Data);
//Painting 12
auxl.spookyRoom1Painting12Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting12', position: new THREE.Vector3(-4.725,3.25,-40), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting11Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting12', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting11Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting12', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting11,},}}, true);
auxl.spookyRoom1Painting12 = auxl.Core(auxl.spookyRoom1Painting12Data);
//Painting 13
auxl.spookyRoom1Painting13Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Painting13', position: new THREE.Vector3(-4.725,3.25,-50), rotation: new THREE.Vector3(0,90,0), material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.spookyPainting12Alt,}, components: {mouseenterrun__spooky:{cursorObj: 'spookyRoom1Painting13', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting12Alt,}, mouseleaverun__normal:{ cursorObj: 'spookyRoom1Painting13', component: 'null', method: 'ChangeMatSrc', params: auxl.spookyPainting12,},}}, true);
auxl.spookyRoom1Painting13 = auxl.Core(auxl.spookyRoom1Painting13Data);
//Jump
auxl.spookyRoom1Jump1Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Painting1Data, {id: 'spookyRoom1Jump1', geometry: {primitive: 'box', height: 3.75, width: 2.5, depth: 0.1}, position: new THREE.Vector3(2,0,-15), rotation: new THREE.Vector3(0,0,0), material: {shader: "standard", opacity: 1, src: auxl.spookyJump1,},
sounds:{
	scare: {src: auxl.soundMonster1, autoplay: false, loop: false, volume: 1, on: 'jump'},
},
components: {
['stare']:{id: 'playerRig', twist: false,},
['camera-forward']: {distance: 2.5},
oneventrun__jump:{
	event: 'jump',
	cursorObj: 'spookyRoom1Jump1',
	component: 'camera-forward',
	method: 'forward',
	params: 'null',
},
},}, true);
auxl.spookyRoom1Jump1 = auxl.Core(auxl.spookyRoom1Jump1Data);

//Lights

//Light 1
auxl.spookyRoom1Light1Data = {
data:'spookyRoom1Light1Data',
id:'spookyRoom1Light1',
geometry: {primitive: 'sphere', radius: 0.1, segmentsWidth: 18, segmentsHeight: 9, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: "standard", color: "#d4e76d", opacity: 1, metalness: 0.3, roughness: 0, emissive: "#d4e76d", emissiveIntensity: 1, side: 'front',},
position: new THREE.Vector3(0,6.9,37.5),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 1, to: 1, dur: 1, delay: 300, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 7000, delay: 300, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinklight1: {property: 'light.intensity', from: 1, to: 0, dur: 7000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 700, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinklight2: {property: 'light.intensity', from: 1, to: 0, dur: 700, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
blinklight3: {property: 'light.intensity', from: 1, to: 0, dur: 1750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
classes: ['a-ent'],
components: {
light: {type: 'spot', angle: 60, intensity: 1, distance: 20, decay: 0.5, castShadow: false, color: '#d4e76d', penumbra: 0.4,},
},
};
auxl.spookyRoom1Light1 = auxl.Core(auxl.spookyRoom1Light1Data);
//Light 0
auxl.spookyRoom1Light0Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light0', position: new THREE.Vector3(0,6.9,59.5), 
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 1, to: 1, dur: 1, delay: 0, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 8000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinklight1: {property: 'light.intensity', from: 1, to: 0, dur: 8000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 800, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinklight2: {property: 'light.intensity', from: 1, to: 0, dur: 800, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 2000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
blinklight3: {property: 'light.intensity', from: 1, to: 0, dur: 2000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
}, true);
auxl.spookyRoom1Light0 = auxl.Core(auxl.spookyRoom1Light0Data);
//Light 2
auxl.spookyRoom1Light2Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light2', position: new THREE.Vector3(0,6.9,22.5),
animations:{
matoff: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'off'},
lightoff: {property: 'light.intensity', from: 1, to: 0, dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'off'},
},
}, true);
auxl.spookyRoom1Light2 = auxl.Core(auxl.spookyRoom1Light2Data);
//Light 3
auxl.spookyRoom1Light3Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light3', position: new THREE.Vector3(0,6.9,7.5),
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 1, to: 1, dur: 1, delay: 900, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 5000, delay: 900, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinklight1: {property: 'light.intensity', from: 1, to: 0, dur: 5000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 500, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinklight2: {property: 'light.intensity', from: 1, to: 0, dur: 500, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1250, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
blinklight3: {property: 'light.intensity', from: 1, to: 0, dur: 1250, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
}, true);
auxl.spookyRoom1Light3 = auxl.Core(auxl.spookyRoom1Light3Data);
//Light 4
auxl.spookyRoom1Light4Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light4', position: new THREE.Vector3(0,6.9,-7.5),
animations:{
matoff: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'off'},
lightoff: {property: 'light.intensity', from: 1, to: 0, dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'off'},
},
}, true);
auxl.spookyRoom1Light4 = auxl.Core(auxl.spookyRoom1Light4Data);
//Light 5
auxl.spookyRoom1Light5Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light5', position: new THREE.Vector3(0,6.9,-22.5),
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 1, to: 1, dur: 1, delay: 1500, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 3000, delay: 1500, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinklight1: {property: 'light.intensity', from: 1, to: 0, dur: 3000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 300, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinklight2: {property: 'light.intensity', from: 1, to: 0, dur: 300, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
blinklight3: {property: 'light.intensity', from: 1, to: 0, dur: 750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
}, true);
auxl.spookyRoom1Light5 = auxl.Core(auxl.spookyRoom1Light5Data);
//Light 6
auxl.spookyRoom1Light6Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light6', position: new THREE.Vector3(0,6.9,-37.5),
material: {shader: "standard", color: "#d4e76d", opacity: 1, metalness: 0.3, roughness: 0, emissive: "#d4e76d", emissiveIntensity: 0.25, side: 'front',},
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 0.25, to: 0.25, dur: 1, delay: 300, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 0.25, to: 0, dur: 2000, delay: 300, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 0.25, to: 0, dur: 200, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 0.25, to: 0, dur: 500, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
components: false,
}, true);
auxl.spookyRoom1Light6 = auxl.Core(auxl.spookyRoom1Light6Data);
//Light 7
auxl.spookyRoom1Light7Data = auxl.CoreDataFromTemplate(auxl.spookyRoom1Light1Data, {id: 'spookyRoom1Light7', position: new THREE.Vector3(0,6.9,-59.5),
animations:{
blinkstart: {property: 'material.emissiveIntensity', from: 1, to: 1, dur: 1, delay: 2100, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
blinkmat1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1000, delay: 2100, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinklight1: {property: 'light.intensity', from: 1, to: 0, dur: 1000, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkstart, animationcomplete__blinkmat3'},
blinkmat2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 100, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinklight2: {property: 'light.intensity', from: 1, to: 0, dur: 100, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat1'},
blinkmat3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 250, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
blinklight3: {property: 'light.intensity', from: 1, to: 0, dur: 250, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__blinkmat2'},
},
}, true);
auxl.spookyRoom1Light7 = auxl.Core(auxl.spookyRoom1Light7Data);

//Disable Light 2 Trigger
auxl.spookyRoom1Light2TriggerData = {
data:'spookyRoom1Light2TriggerData',
id:'spookyRoom1Light2Trigger',
sounds:{
	break: {src: auxl.soundGlassBreak, autoplay: false, loop: false, volume: 0.75, on: 'triggerEnter'},
},
geometry: {primitive: 'box', depth: 2, width: 10, height: 1},
material: {shader: "standard", opacity: 0},
position: new THREE.Vector3(0,0,0),
grid: {start:{x:-5, z:35}, end: {x:4.5, z:36.5}, yOffset: 0.5, trigger: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
classes: ['a-ent'],
components: {
	oneventrun__triggerin:{event: 'triggerEnter', cursorObj: 'spookyRoom1Light2', component: 'null', method: 'EmitEvent', params: 'off', once: true},
},
};
auxl.spookyRoom1Light2Trigger = auxl.Core(auxl.spookyRoom1Light2TriggerData);

//Disable Light 4 Trigger
auxl.spookyRoom1Light4TriggerData = {
data:'spookyRoom1Light4TriggerData',
id:'spookyRoom1Light4Trigger',
sounds:{
	break: {src: auxl.soundGlassBreak, autoplay: false, loop: false, volume: 0.75, on: 'triggerEnter'},
},
geometry: {primitive: 'box', depth: 2, width: 10, height: 1},
material: {shader: "standard", opacity: 0},
position: new THREE.Vector3(0,0,0),
grid: {start:{x:-5, z:7.5}, end: {x:4.5, z:9}, yOffset: 0.5, trigger: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
classes: ['a-ent'],
components: {
	oneventrun__triggerin:{event: 'triggerEnter', cursorObj: 'spookyRoom1Light4', component: 'null', method: 'EmitEvent', params: 'off', once: true},
},
};
auxl.spookyRoom1Light4Trigger = auxl.Core(auxl.spookyRoom1Light4TriggerData);

//
//Room 2

//Exterior Darkness
auxl.spookyRoom2ExtData = {
	data:'spookyRoom2ExtData',
	id:'spookyRoom2Ext',
	geometry: {primitive: 'box', height: 400, width: 400, depth: 400},
	material: {shader: "standard", color: "#000000", opacity: 1, side: 'back', roughness: 1},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['a-ent'],
};
auxl.spookyRoom2Ext = auxl.Core(auxl.spookyRoom2ExtData);

//Floor
auxl.spookyRoom2FloorData = {
	data:'spookyRoom2FloorData',
	id:'spookyRoom2Floor',
	geometry: {primitive: 'plane', width: 12, height: 12,},
	material: {shader: "standard", color: "#834f4f", opacity: 1, metalness: 0.2, roughness: 0.8, side: 'front', src: auxl.pattern06, repeat: '6 6'},
	position: new THREE.Vector3(0,0.05,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		fall: {property: 'object3D.position.y', from: 0.05, to: 1000.05, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Floor = auxl.Core(auxl.spookyRoom2FloorData);
//Ceiling
auxl.spookyRoom2CeilingData = {
	data:'spookyRoom2CeilingData',
	id:'spookyRoom2Ceiling',
	geometry: {primitive: 'plane', width: 12, height: 12,},
	material: {shader: "standard", color: "#5d3e3e", opacity: 1, roughness: 1, side: 'front', src: auxl.pattern60, repeat: '2 2'},
	position: new THREE.Vector3(0,6,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		fall: {property: 'object3D.position.y', from: 6, to: 1006, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Ceiling = auxl.Core(auxl.spookyRoom2CeilingData);

//Walls
//

//Wall North
auxl.spookyRoom2NorthData = {
	data:'spookyRoom2NorthData',
	id:'spookyRoom2North',
	geometry: {primitive: 'plane', width: 12, height: 6,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern50, repeat: '8 4'},
	position: new THREE.Vector3(0,3,-6),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		trap: {property: 'object3D.position.z', from: -6, to: -0.5, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'trap'},
		fall: {property: 'object3D.position.y', from: 3, to: 1003, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2North = auxl.Core(auxl.spookyRoom2NorthData);
//Wall South
auxl.spookyRoom2SouthData = {
	data:'spookyRoom2SouthData',
	id:'spookyRoom2South',
	geometry: {primitive: 'plane', width: 12, height: 6,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern50, repeat: '8 4'},
	position: new THREE.Vector3(0,3,6),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		trap: {property: 'object3D.position.z', from: 6, to: 0.5, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'trap'},
		fall: {property: 'object3D.position.y', from: 3, to: 1003, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2South = auxl.Core(auxl.spookyRoom2SouthData);
//Wall West
auxl.spookyRoom2WestData = {
	data:'spookyRoom2WestData',
	id:'spookyRoom2West',
	geometry: {primitive: 'plane', width: 12, height: 6,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern50, repeat: '8 4'},
	position: new THREE.Vector3(6,3,0),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		trap: {property: 'object3D.position.x', from: 6, to: 0.5, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'trap'},
		fall: {property: 'object3D.position.y', from: 3, to: 1003, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2West = auxl.Core(auxl.spookyRoom2WestData);
//Wall East
auxl.spookyRoom2EastData = {
	data:'spookyRoom2EastData',
	id:'spookyRoom2East',
	geometry: {primitive: 'plane', width: 12, height: 6,},
	material: {shader: "standard", color: "#761734", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#761734", emissiveIntensity: 0.2, side: 'double', src: auxl.pattern50, repeat: '8 4'},
	position: new THREE.Vector3(-6,3,0),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		trap: {property: 'object3D.position.x', from: -6, to: -0.5, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'trap'},
		fall: {property: 'object3D.position.y', from: 3, to: 1003, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2East = auxl.Core(auxl.spookyRoom2EastData);


//Basement
auxl.spookyRoom2BasementData = {
	data:'spookyRoom2BasementData',
	id:'spookyRoom2Basement',
	geometry: {primitive: 'box', width: 42, height: 1000, depth: 42},
	material: {shader: "standard", color: "#43aece", opacity: 1, metalness: 0.3, roughness: 0.7, src: auxl.pattern33, side: 'double', repeat: '7 100'},
	position: new THREE.Vector3(0,-500.125,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		fall1: {property: 'object3D.position.y', from: -500.125, to: 501, dur: 15000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInCubic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fall'},
		fall2: {property: 'object3D.position.y', from: 501, to: 500, dur: 1500, delay: 0, loop: 'false', dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__fall1'},
	},
	classes: ['a-ent'],
};
auxl.spookyRoom2Basement = auxl.Core(auxl.spookyRoom2BasementData);

//Door
auxl.room2ToExteriorDoorData = {
data:'room2ToExteriorDoorData',
id:'room2ToExteriorDoor',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	squeak: {src: auxl.soundSqueakingChair, autoplay: true, loop: true, volume: 1,},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(2.5,0,0.5),
grid: {start:{x:-1, y:0, z:5.5}, collide: true},
rotation: new THREE.Vector3(0,180,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door4.glb',
	doorway:{zone: 'spookyZone', to: 'connect0', posTo: true, pos: new THREE.Vector3(19.5,0,-2.5), twistTo: true, twist: 90},
	hovertext:{value: 'Return',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.room2ToExteriorDoor = auxl.Core(auxl.room2ToExteriorDoorData);

//House
//

//Armchair Pillows
auxl.kayKitArmchairPillowsData = {
	data:'kayKitArmchairPillowsData',
	id:'kayKitArmchairPillows',
	sounds:{
		interact: {src: auxl.drop1, autoplay: false, loop: false, volume: 0.5, on: 'mousedown'},
	},
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,2),
	grid: {start:{x:-6, y:0, z:0}, yOffset: 0, collide: true},
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/armchair_pillows.glb',
		hovertext:{value: 'Sit',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
		clickrun__trap:{
			delay: '0',
			cursorObj: 'Room2Trap',
			component: 'null',
			method: 'Start',
			params: 'null',
		},
	},
};
auxl.kayKitArmchairPillows = auxl.Core(auxl.kayKitArmchairPillowsData);
//Bed Single A
auxl.kayKitBedSingleAData = {
	data:'kayKitBedSingleAData',
	id:'kayKitBedSingleA',
	sounds:{
		interact: {src: auxl.drop1, autoplay: false, loop: false, volume: 0.5, on: 'mousedown'},
	},
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1.25,1.75,1.25),
	gridSize: new THREE.Vector3(2,0,4),
	grid: {start:{x:2, y:0, z:-5.5}, yOffset: 0, collide: true},
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/bed_single_A.glb',
		hovertext:{value: 'Sleep',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
		clickrun__trap:{
			delay: '0',
			cursorObj: 'Room2Trap',
			component: 'null',
			method: 'Start',
			params: 'null',
		},
	},
};
auxl.kayKitBedSingleA = auxl.Core(auxl.kayKitBedSingleAData);
//Cabinet Medium Decoarated
auxl.kayKitCabinetMediumDecoratedData = {
	data:'kayKitCabinetMediumDecoratedData',
	id:'kayKitCabinetMediumDecorated',
	sounds:{
		interact: {src: auxl.drop1, autoplay: false, loop: false, volume: 0.5, on: 'mousedown'},
	},
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,2),
	grid: {start:{x:5, y:0, z:2}, yOffset: 0, collide: true},
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cabinet_medium_decorated.glb',
		hovertext:{value: 'Search',  hover: 'top', offset: 1.5, altOffset: 1, twist: true,},
		clickrun__trap:{
			delay: '0',
			cursorObj: 'Room2Trap',
			component: 'null',
			method: 'Start',
			params: 'null',
		},
	},
};
auxl.kayKitCabinetMediumDecorated = auxl.Core(auxl.kayKitCabinetMediumDecoratedData);
//Cabinet Small
auxl.kayKitCabinetSmallData = {
	data:'kayKitCabinetSmallData',
	id:'kayKitCabinetSmall',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	grid: {start:{x:-5.5, y:0, z:-1.5}, yOffset: 0, collide: true},
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cabinet_small.glb',
	},
};
auxl.kayKitCabinetSmall = auxl.Core(auxl.kayKitCabinetSmallData);
//Cabinet Small Decorated
auxl.kayKitCabinetSmallDecoratedData = {
	data:'kayKitCabinetSmallDecoratedData',
	id:'kayKitCabinetSmallDecorated',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	grid: {start:{x:4.5, y:0, z:-5.5}, yOffset: 0, collide: true},
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cabinet_small_decorated.glb',
	},
};
auxl.kayKitCabinetSmallDecorated = auxl.Core(auxl.kayKitCabinetSmallDecoratedData);
//Cactus Medium A
auxl.kayKitCactusMediumAData = {
	data:'kayKitCactusMediumAData',
	id:'kayKitCactusMediumA',
	sounds:{
		interact: {src: auxl.drop1, autoplay: false, loop: false, volume: 0.5, on: 'mousedown'},
	},
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	grid: {start:{x:-5.5, y:0, z:2.5}, yOffset: 0, collide: true},
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/cactus_medium_A.glb',
		hovertext:{value: 'Poke',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
		clickrun__trap:{
			delay: '0',
			cursorObj: 'Room2Trap',
			component: 'null',
			method: 'Start',
			params: 'null',
		},
	},
};
auxl.kayKitCactusMediumA = auxl.Core(auxl.kayKitCactusMediumAData);
//Chair Stool
auxl.kayKitChairStoolData = {
	data:'kayKitChairStoolData',
	id:'kayKitChairStool',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1,0,1),
	grid: {start:{x:-2, y:0, z:-2}, yOffset: 0, collide: true},
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/chair_stool.glb',
	},
};
auxl.kayKitChairStool = auxl.Core(auxl.kayKitChairStoolData);
//Lamp Standing
auxl.kayKitLampStandingData = {
	data:'kayKitLampStandingData',
	id:'kayKitLampStanding',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(1.5,0,1.5),
	grid: {start:{x:-4, y:0, z:-4}, yOffset: 0, collide: true},
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/lamp_standing.glb',
	},
};
auxl.kayKitLampStanding = auxl.Core(auxl.kayKitLampStandingData);
//Rug Oval A
auxl.kayKitRugOvalAData = {
	data:'kayKitRugOvalAData',
	id:'kayKitRugOvalA',
	position: new THREE.Vector3(-3,0,0.75),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/rug_oval_A.glb',
	},
};
auxl.kayKitRugOvalA = auxl.Core(auxl.kayKitRugOvalAData);
//Sheld B Large Decorated
auxl.kayKitShelfBLargeDecoratedData = {
	data:'kayKitShelfBLargeDecoratedData',
	id:'kayKitShelfBLargeDecorated',
	sounds:{
		interact: {src: auxl.drop1, autoplay: false, loop: false, volume: 0.5, on: 'mousedown'},
	},
	position: new THREE.Vector3(-1.5,1.5,-6),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/kayKit/house/shelf_B_large_decorated.glb',
		hovertext:{value: 'Read',  hover: 'top', offset: 1.5, altOffset: 0.5, twist: true,},
		clickrun__trap:{
			delay: '0',
			cursorObj: 'Room2Trap',
			component: 'null',
			method: 'Start',
			params: 'null',
		},
	},
};
auxl.kayKitShelfBLargeDecorated = auxl.Core(auxl.kayKitShelfBLargeDecoratedData);
auxl.grid2x05Data = {
	data:'grid2x05Data',
	id:'grid2x05',
	position: new THREE.Vector3(),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	gridSize: new THREE.Vector3(2,0,1),
	grid: {start:{x:-2, y:0, z:-5.5}, yOffset: 0, collide: true},
};
auxl.grid2x05 = auxl.Core(auxl.grid2x05Data);

//Blood Pools
//

//Blood 1
auxl.spookyRoom2Blood1Data = {
	data:'spookyRoom2Blood1Data',
	id:'spookyRoom2Blood1',
	geometry: {primitive: 'box', width: 1, height: 0.3, depth: 1},
	material: {shader: "standard", color: "#b11f4c", opacity: 1, blending: 'multiply', metalness: 0.6, roughness: 0.4, emissive: "#b11f4c", emissiveIntensity: 0.5, side: 'double', },
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.01,0.01,0.01),
	animations:{
		poolx: {property: 'object3D.scale.x', from: 0.01, to: 6, dur: 5000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		pooly: {property: 'object3D.scale.y', from: 0.01, to: 1, dur: 5000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		poolz: {property: 'object3D.scale.z', from: 0.01, to: 6, dur: 5000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Blood1 = auxl.Core(auxl.spookyRoom2Blood1Data);
//Blood 2
auxl.spookyRoom2Blood2Data = {
	data:'spookyRoom2Blood2Data',
	id:'spookyRoom2Blood2',
	geometry: {primitive: 'box', width: 1, height: 0.3, depth: 1},
	material: {shader: "standard", color: "#b11f4c", opacity: 1, blending: 'multiply', metalness: 0.6, roughness: 0.4, emissive: "#b11f4c", emissiveIntensity: 0.5, side: 'double', },
	position: new THREE.Vector3(-1.5,0.5,-1.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.01,0.01,0.01),
	animations:{
		poolx: {property: 'object3D.scale.x', from: 0.01, to: 8, dur: 5000, delay: 2500, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		pooly: {property: 'object3D.scale.y', from: 0.01, to: 1, dur: 5000, delay: 2500, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		poolz: {property: 'object3D.scale.z', from: 0.01, to: 6, dur: 5000, delay: 2500, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Blood2 = auxl.Core(auxl.spookyRoom2Blood2Data);
//Blood 3
auxl.spookyRoom2Blood3Data = {
	data:'spookyRoom2Blood3Data',
	id:'spookyRoom2Blood3',
	geometry: {primitive: 'box', width: 1, height: 0.3, depth: 1},
	material: {shader: "standard", color: "#b11f4c", opacity: 1, blending: 'multiply', metalness: 0.6, roughness: 0.4, emissive: "#b11f4c", emissiveIntensity: 0.5, side: 'double', },
	position: new THREE.Vector3(2,0.25,2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.01,0.01,0.01),
	animations:{
		poolx: {property: 'object3D.scale.x', from: 0.01, to: 7, dur: 5000, delay: 2000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		pooly: {property: 'object3D.scale.y', from: 0.01, to: 1, dur: 5000, delay: 2000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		poolz: {property: 'object3D.scale.z', from: 0.01, to: 5, dur: 5000, delay: 2000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Blood3 = auxl.Core(auxl.spookyRoom2Blood3Data);
//Blood 4
auxl.spookyRoom2Blood4Data = {
	data:'spookyRoom2Blood4Data',
	id:'spookyRoom2Blood4',
	geometry: {primitive: 'box', width: 1, height: 0.3, depth: 1},
	material: {shader: "standard", color: "#b11f4c", opacity: 1, blending: 'multiply', metalness: 0.6, roughness: 0.4, emissive: "#b11f4c", emissiveIntensity: 0.5, side: 'double', },
	position: new THREE.Vector3(-1.25,0.25,1.75),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.01,0.01,0.01),
	animations:{
		poolx: {property: 'object3D.scale.x', from: 0.01, to: 3, dur: 5000, delay: 3000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		pooly: {property: 'object3D.scale.y', from: 0.01, to: 1, dur: 5000, delay: 3000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		poolz: {property: 'object3D.scale.z', from: 0.01, to: 5, dur: 5000, delay: 3000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom2Blood4 = auxl.Core(auxl.spookyRoom2Blood4Data);

//Room 2 Trap
auxl.Room2TrapSetup = () => {
	let trap = {};
	trap.id = 'Room2Trap';
	const Start = () => {
		//Play Quick Anim
		auxl.player.PlayerQuickAnim();
		//Teleport with anim to center
		let timeout1 = setTimeout(() => {
			auxl.player.LockLocomotion();
			auxl.player.DisableClick();
			auxl.player.UpdatePlayerPosition(new THREE.Vector3(0,0,0));
			clearTimeout(timeout1);
		}, 250);
		//Start trap
		let timeout2 = setTimeout(() => {
			auxl.spookyRoom2North.EmitEvent('trap');
			auxl.spookyRoom2South.EmitEvent('trap');
			auxl.spookyRoom2West.EmitEvent('trap');
			auxl.spookyRoom2East.EmitEvent('trap');
			auxl.playerAudio.EmitEvent('trap');
			clearTimeout(timeout2);
		}, 1000);
		//Clear Furniture
		let timeout3 = setTimeout(() => {
			auxl.room2ToExteriorDoor.DespawnCore();
			auxl.kayKitArmchairPillows.DespawnCore();
			auxl.kayKitBedSingleA.DespawnCore();
			auxl.kayKitCabinetMediumDecorated.DespawnCore();
			auxl.kayKitCabinetSmall.DespawnCore();
			auxl.kayKitCabinetSmallDecorated.DespawnCore();
			auxl.kayKitCactusMediumA.DespawnCore();
			auxl.kayKitChairStool.DespawnCore();
			auxl.kayKitLampStanding.DespawnCore();
			auxl.kayKitRugOvalA.DespawnCore();
			auxl.kayKitShelfBLargeDecorated.DespawnCore();
			auxl.grid2x05.DespawnCore();
			clearTimeout(timeout3);
		}, 6700);
		//Fall
		let timeout4 = setTimeout(() => {
			auxl.playerAudio.EmitEvent('trapdoor');
			auxl.spookyRoom2Floor.EmitEvent('fall');
			auxl.spookyRoom2Ceiling.EmitEvent('fall');
			auxl.spookyRoom2North.EmitEvent('fall');
			auxl.spookyRoom2South.EmitEvent('fall');
			auxl.spookyRoom2West.EmitEvent('fall');
			auxl.spookyRoom2East.EmitEvent('fall');
			auxl.spookyRoom2Basement.EmitEvent('fall');
			clearTimeout(timeout4);
		}, 7750);
		//Blood
		let timeoutHit = setTimeout(() => {
			auxl.playerAudio.EmitEvent('juicyimpact');
			clearTimeout(timeoutHit);
		}, 22500);
		//Blood
		let timeout5 = setTimeout(() => {
			auxl.spookyRoom2Blood1.SpawnCore();
			auxl.spookyRoom2Blood2.SpawnCore();
			auxl.spookyRoom2Blood3.SpawnCore();
			auxl.spookyRoom2Blood4.SpawnCore();
			clearTimeout(timeout5);
		}, 23300);
		//Move
		let timeout6 = setTimeout(() => {
			auxl.playerAudio.EmitEvent('respawn');
			auxl.spookyZone.Move('connect0'),
			clearTimeout(timeout6);
		}, 30000);
		//End
		let timeout7 = setTimeout(() => {
			auxl.player.UpdatePlayerPosition(new THREE.Vector3(-13,0,1.25));
			auxl.player.TwistTo(270);
			auxl.player.UnlockLocomotion();
			auxl.player.EnableClick();
			auxl.exteriorToRoom2.SetFlag({flag: 'done', value: true});
			auxl.spookyRoom2Blood1.DespawnCore();
			auxl.spookyRoom2Blood2.DespawnCore();
			auxl.spookyRoom2Blood3.DespawnCore();
			auxl.spookyRoom2Blood4.DespawnCore();
			clearTimeout(timeout7);
		}, 30500);
	}
	return {trap, Start}
}
auxl.Room2Trap = auxl.Room2TrapSetup();

//
//Room 3

//Door
auxl.room3ToExteriorDoorData = {
data:'room3ToExteriorDoorData',
id:'room3ToExteriorDoor',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
position: new THREE.Vector3(0,0,0),
gridSize: new THREE.Vector3(2.5,2,0.5),
grid: {start:{x:-1, y:0, z:14}, collide: true},
rotation: new THREE.Vector3(0,180,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door2.glb',
	doorway:{zone: 'spookyZone', to: 'connect0', posTo: true, pos: new THREE.Vector3(-19.5,0,-2), twistTo: true, twist: 270},
	hovertext:{value: 'Return',  hover: 'top', offset: 1, altOffset: 0.5, twist: true,},
},
};
auxl.room3ToExteriorDoor = auxl.Core(auxl.room3ToExteriorDoorData);

//Exterior Darkness
auxl.spookyRoom3ExtData = {
	data:'spookyRoom3ExtData',
	id:'spookyRoom3Ext',
	geometry: {primitive: 'sphere', radius: 150},
	material: {shader: "standard", color: "#29527b", opacity: 1, side: 'back', roughness: 1},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom3Ext = auxl.Core(auxl.spookyRoom3ExtData);


//Block Rocks
//

//Block 1
auxl.spookyRoom2Block1Data = {
	data:'spookyRoom2Block1Data',
	id:'spookyRoom2Block1',
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(6,1,7),
	gridSize: new THREE.Vector3(6.5,1,6.5),
	classes: ['a-ent'],
	components:{
		['gltf-model']:'./assets/3d/mintyKit/cube_bevel-1.glb',
		gltfmat: {colors:['#83522f', '#6f4526',], emissives: '0,0', textures:[auxl.pattern83, false],}
	},
};
//Block 2
auxl.spookyRoom2Block2Data = {
	data:'spookyRoom2Block2Data',
	id:'spookyRoom2Block2',
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(8,1,3),
	gridSize: new THREE.Vector3(6.5,1,3.5),
	classes: ['a-ent'],
	components:{
		['gltf-model']:'./assets/3d/mintyKit/cube_bevel-1.glb',
		gltfmat: {colors:['#81471e', '#6f3c19',], emissives: '0,0', textures:[auxl.pattern83, false],}
	},
};
//Block 3
auxl.spookyRoom2Block3Data = {
	data:'spookyRoom2Block3Data',
	id:'spookyRoom2Block3',
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(2,1,10),
	gridSize: new THREE.Vector3(2.5,1,6.5),
	classes: ['a-ent'],
	components:{
		['gltf-model']:'./assets/3d/mintyKit/cube_bevel-1.glb',
		gltfmat: {colors:['#80502f', '#714629',], emissives: '0,0', textures:[auxl.pattern83, false],}
	},
};

//Block 1 Grid
auxl.room2Block1GridData = {
id: 'room2Block1Grid',
coreData: [
	auxl.spookyRoom2Block1Data,
],
grids:{
layout1:[
	{start:{x:-7, y:0, z:10},},
	{start:{x:-14, y:5, z:3},},
	{start:{x:12, y:7, z:-8},},
	{start:{x:-13, y:15, z:-8},},
	{start:{x:-4.5, y:10, z:8},},
	{start:{x:4.5, y:14, z:15},},
],},};
auxl.room2Block1Grid = auxl.GridLayout(auxl.room2Block1GridData);
//Block 2 Grid
auxl.room2Block2GridData = {
id: 'room2Block2Grid',
coreData: [
	auxl.spookyRoom2Block2Data,
],
grids:{
layout1:[
	{start:{x:8, y:1, z:-4.5},},
	{start:{x:-12, y:7, z:-14},},
	{start:{x:0, y:15, z:0},},
	{start:{x:13, y:8, z:-14},},
	{start:{x:-11, y:2, z:12},},
	{start:{x:-15, y:6, z:1},},
],},};
auxl.room2Block2Grid = auxl.GridLayout(auxl.room2Block2GridData);
//Block 3 Grid
auxl.room2Block3GridData = {
id: 'room2Block3Grid',
coreData: [
	auxl.spookyRoom2Block3Data,
],
grids:{
layout1:[
	{start:{x:4.5, y:0, z:8},},
	{start:{x:14, y:5, z:-3},},
	{start:{x:-12, y:12, z:8},},
	{start:{x:8, y:14, z:8},},
	{start:{x:-15, y:1, z:-12},},
	{start:{x:12, y:12, z:-15},},
],},};
auxl.room2Block3Grid = auxl.GridLayout(auxl.room2Block3GridData);
//Block 4
auxl.spookyRoom2Block4Data = {
	data:'spookyRoom2Block4Data',
	id:'spookyRoom2Block4',
	geometry: {primitive: 'box', width: 1, height: 1, depth: 1},
	material: {shader: "standard", color: "#805538", src: auxl.pattern83, repeat: '0.25 0.5', opacity: 1, side: 'front', roughness: 0.8, metalness: 0.2 },
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(5,20,10),
	classes: ['a-ent'],
};
//Block 4 Ring
auxl.block4RingData = {
	id: 'block4Ring',
	objData: auxl.spookyRoom2Block4Data,
	total: 50,
	outerRingRadius: 125,
	innerRingRadius: 35,
	sameTypeRadius: 5,
	otherTypeRadius: 1,
	ranYPos: true,
	yPosFlex: 100,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 10,
	ranRotX: true,
	ranRotY: true,
	ranRotZ: true,
	ranColor: false,
	ranTexture: false,
};
auxl.block4Ring = auxl.ObjsGenRing(auxl.block4RingData);


//Fauna

//Sharks

//Shark 1 Parent
auxl.shark1ParentData = {
	data:'shark1ParentData',
	id:'shark1Parent',
	position: new THREE.Vector3(0,-10,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		swimming: {property: 'object3D.rotation.y', from: 0, to: 360, dur: 40000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
};
auxl.shark1Parent = auxl.Core(auxl.shark1ParentData);
//Shark 1
auxl.shark1Data = {
	data:'shark1Data',
	id:'shark1',
	position: new THREE.Vector3(0,0,-45),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(7,7,7),
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 1, },
	},
};
auxl.shark1 = auxl.Core(auxl.shark1Data);
//Shark 1 Layer
auxl.shark1LayerData = {
	parent: {core: auxl.shark1Parent}, 
	child0: {core: auxl.shark1}, 
}
auxl.shark1Layer = auxl.Layer('shark1Layer',auxl.shark1LayerData);

//Shark 2 Parent
auxl.shark2ParentData = {
	data:'shark2ParentData',
	id:'shark2Parent',
	position: new THREE.Vector3(0,5,0),
	rotation: new THREE.Vector3(0,570,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		swimming: {property: 'object3D.rotation.y', from: 570, to: 210, dur: 30000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
};
auxl.shark2Parent = auxl.Core(auxl.shark2ParentData);
//Shark 2
auxl.shark2Data = {
	data:'shark2Data',
	id:'shark2',
	position: new THREE.Vector3(0,0,-35),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(5,5,5),
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 0.9, },
	},
};
auxl.shark2 = auxl.Core(auxl.shark2Data);
//Shark 2 Layer
auxl.shark2LayerData = {
	parent: {core: auxl.shark2Parent}, 
	child0: {core: auxl.shark2}, 
}
auxl.shark2Layer = auxl.Layer('shark2Layer',auxl.shark2LayerData);

//Shark 3 Parent
auxl.shark3ParentData = {
	data:'shark3ParentData',
	id:'shark3Parent',
	position: new THREE.Vector3(0,20,0),
	rotation: new THREE.Vector3(0,135,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		swimming: {property: 'object3D.rotation.y', from: 225, to: 585, dur: 35000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
};
auxl.shark3Parent = auxl.Core(auxl.shark3ParentData);
//Shark 3
auxl.shark3Data = {
	data:'shark3Data',
	id:'shark3',
	position: new THREE.Vector3(0,0,-40),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(6,6,6),
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 1.1, },
	},
};
auxl.shark3 = auxl.Core(auxl.shark3Data);
//Shark 3 Layer
auxl.shark3LayerData = {
	parent: {core: auxl.shark3Parent}, 
	child0: {core: auxl.shark3}, 
}
auxl.shark3Layer = auxl.Layer('shark3Layer',auxl.shark3LayerData);

//Shark 4 Parent
auxl.shark4ParentData = {
	data:'shark4ParentData',
	id:'shark4Parent',
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,45,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		swimming: {property: 'object3D.rotation.y', from: 45, to: -315, dur: 35000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
};
auxl.shark4Parent = auxl.Core(auxl.shark4ParentData);
//Shark 3
auxl.shark4Data = {
	data:'shark4Data',
	id:'shark4',
	position: new THREE.Vector3(0,0,-55),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(8,8,8),
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 1.1, },
	},
};
auxl.shark4 = auxl.Core(auxl.shark4Data);
//Shark 3 Layer
auxl.shark4LayerData = {
	parent: {core: auxl.shark4Parent}, 
	child0: {core: auxl.shark4}, 
}
auxl.shark4Layer = auxl.Layer('shark4Layer',auxl.shark4LayerData);


//Shark Mega Parent
auxl.sharkMegaParentData = {
	data:'sharkMegaParentData',
	id:'sharkMegaParent',
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		swimming: {property: 'object3D.rotation.y', from: 180, to: 480, dur: 35000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
};
auxl.sharkMegaParent = auxl.Core(auxl.sharkMegaParentData);
//Shark Mega
auxl.sharkMegaData = {
	data:'sharkMegaData',
	id:'sharkMega',
	position: new THREE.Vector3(0,69,-69),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(22,22,22),
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 1, },
	},
};
auxl.sharkMega = auxl.Core(auxl.sharkMegaData);

//Shark Mega
auxl.sharkMegaLayerData = {
	parent: {core: auxl.sharkMegaParent}, 
	child0: {core: auxl.sharkMega}, 
}
auxl.sharkMegaLayer = auxl.Layer('sharkMegaLayer',auxl.sharkMegaLayerData);

//Shark Attack
auxl.sharkMegaAttackData = {
	data:'sharkMegaAttackData',
	id:'sharkMegaAttack',
	sounds:{
		attack: {src: auxl.soundMonster3, autoplay: true, loop: false, volume: 10,},
	},
	position: new THREE.Vector3(0,8.5,-51),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(26,26,26),
	animations:{
		attack: {property: 'object3D.position.z', from: -56, to: -25.5, dur: 5000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
	components:{
		['gltf-model']:'./assets/3d/fauna/Shark-attack.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 1, },
	},
};
auxl.sharkMegaAttack = auxl.Core(auxl.sharkMegaAttackData);

//Squid
auxl.squidData = {
	data:'squidData',
	id:'squid',
	sounds:{
		sing: {src: auxl.soundWhaleCalls1, autoplay: false, loop: false, volume: 30, on: 'sing'},
	},
	position: new THREE.Vector3(0,-69,-69),
	rotation: new THREE.Vector3(),
	scale: new THREE.Vector3(38,38,38),
	animations:{
		swimming1: {property: 'object3D.position.z', from: -69, to: 69, dur: 60000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
		swimming2: {property: 'object3D.rotation.z', from: 0, to: -360, dur: 60000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
	components:{
		['gltf-model']:'./assets/3d/fauna/Squid.glb',
		['animation-mixer']: {loop: 'repeat', repetitions: 'Infinity', timeScale: 0.25, },
	},
};
auxl.squid = auxl.Core(auxl.squidData);

//Flare
auxl.spookyRoom3FlareData = {
	data:'spookyRoom3FlareData',
	id:'spookyRoom3Flare',
	sounds:{
		fire: {src: auxl.soundFlareFirework, autoplay: true, loop: false, volume: 1.25,},
	},
	geometry: {primitive: 'cylinder', radius: 0.0325, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#9a254d", opacity: 1, side: 'front', emissive: '#9a254d', emissiveIntensity: 0.05},
	position: new THREE.Vector3(0,13,-1),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		falling: {property: 'object3D.position.y', from: 13, to: 8, dur: 6000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom3Flare = auxl.Core(auxl.spookyRoom3FlareData);
//Flare Fire
auxl.spookyRoom3FlareFireData = {
	data:'spookyRoom3FlareFireData',
	id:'spookyRoom3FlareFire',
	geometry: {primitive: 'sphere', radius: 0.05,},
	material: {shader: "standard", color: "#e2aa13", opacity: 1, side: 'front', emissive: '#e2aa13', emissiveIntensity: 0},
	position: new THREE.Vector3(0,0.14,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.6,2.2,0.6),
	animations: {
		flickerstart: {property: 'material.emissiveIntensity', from: 0, to: 1, dur: 500, delay: 300, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		flicker1: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 3500, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__flickerstart, animationcomplete__flicker3'},
		flicker2: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__flicker1'},
		flicker3: {property: 'material.emissiveIntensity', from: 1, to: 0, dur: 1750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__flicker2'},
	},
	classes: ['a-ent'],
	components: false,
};
auxl.spookyRoom3FlareFire = auxl.Core(auxl.spookyRoom3FlareFireData);
//Flare Light
auxl.spookyRoom3FlareLightData = {
	data:'spookyRoom3FlareLightData',
	id:'spookyRoom3FlareLight',
	position: new THREE.Vector3(0,0.14,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		flickerstart: {property: 'light.intensity', from: 0, to: 1, dur: 500, delay: 300, loop: 'false', dir: 'alternate', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
		flicker1: {property: 'light.intensity', from: 1.5, to: 0, dur: 3500, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__flickerstart, animationcomplete__flicker3'},
		flicker2: {property: 'light.intensity', from: 1.5, to: 0, dur: 750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__flicker1'},
		flicker3: {property: 'light.intensity', from: 1.5, to: 0, dur: 1750, delay: 0, loop: 'false', dir: 'alternate', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true,startEvents: 'animationcomplete__flicker2'},
	},
	classes: ['a-ent'],
	components: {
	light: {type: 'point', intensity: 0, distance: 15, decay: 2},
	},
};
auxl.spookyRoom3FlareLight = auxl.Core(auxl.spookyRoom3FlareLightData);

//Layer
auxl.spookyRoom3FlareLayerData = {
	parent: {core: auxl.spookyRoom3Flare}, 
	child1: {core: auxl.spookyRoom3FlareFire}, 
	child0: {core: auxl.spookyRoom3FlareLight}, 
}
auxl.spookyRoom3FlareLayer = auxl.Layer('spookyRoom3FlareLayer',auxl.spookyRoom3FlareLayerData);

//Ghost
auxl.spookyGhostLayerData = auxl.LayerDataFromTemplate(auxl.ghostLayerData, 'spookyGhostLayer', {position: new THREE.Vector3(10.5,-2,-11.75), rotation: new THREE.Vector3(0,-35,0), scale: new THREE.Vector3(3,3,3),
animations:{
	rotate: {property: 'object3D.rotation.y', from: -35, to: -25, dur: 13000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
	hauntstart: {property: 'object3D.position.y', from: -3, to: -3, dur: 1, delay: 7000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
	haunt1: {property: 'object3D.position.y', from: -3, to: 2, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__hauntstart, animationcomplete__haunt5'},
	haunt2: {property: 'object3D.position.z', from: -11.75, to: 12.25, dur: 20000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__haunt1'},
	haunt3: {property: 'object3D.position.x', from: 10.5, to: -11.5, dur: 20000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__haunt1'},
	haunt4: {property: 'object3D.position.y', from: 2, to: -3, dur: 7000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__haunt3'},
	haunt5: {property: 'position', from: '10.5,-2,-11.75', to: '10.5,-2,-11.75', dur: 1, delay: 7000, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__haunt4'},
},
}, false, true);
auxl.spookyGhostLayerData.child0.child3.parent.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.parent.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child0.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child0.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child1.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child1.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child2.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child2.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child3.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child3.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child4.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child4.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child5.core.core.material.color = '#eeb63d'
auxl.spookyGhostLayerData.child0.child3.child5.core.core.material.emissive = '#eeb63d'
auxl.spookyGhostLayer = auxl.Layer('spookyGhostLayer', auxl.spookyGhostLayerData);

//
//Entrance & Floor 1


//SkyBox
auxl.skyGrad1Data = {
data: 'skyGrad1Data',
id: 'skyGrad1',
entity: 'a-sky',
sources: false,
text: false,
geometry: false,
material: {shader: 'threeColorGradientShader', topColor: '#613381', middleColor: '#99154E', bottomColor: '#b967ff'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {

top0:{property: 'material.topColor', from: '#01cdfe', to: '#01cdfe', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

mid0:{property: 'material.middleColor', from: '#fffb96', to: '#fffb96', dur: 1, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

top1:{property: 'material.topColor', from: '#613381', to: '#01cdfe', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top0, animationcomplete__top2', pauseEvents: 'pause', resumeEvents: 'resume'},

mid1:{property: 'material.middleColor', from: '#99154E', to: '#fffb96', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid0, animationcomplete__mid2', pauseEvents: 'pause', resumeEvents: 'resume'}, 

top2:{property: 'material.topColor', from: '#01cdfe', to: '#613381', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__top1', pauseEvents: 'pause', resumeEvents: 'resume'},

mid2:{property: 'material.middleColor', from: '#fffb96', to: '#99154E', dur: auxl.timeInDay/6, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__mid1', pauseEvents: 'pause', resumeEvents: 'resume'},

},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.skyGrad1 = auxl.Core(auxl.skyGrad1Data);

//Lights
auxl.directionalLight.core.components.light.intensity = 0.75;
auxl.directionalLight.core.position = new THREE.Vector3(-0.25,0.75,0.5);
auxl.directionalLight2.core.components.light.intensity = 0.1;
auxl.directionalLight2.core.position = new THREE.Vector3(0.25,0.75,-0.5);
auxl.directionalLight3.core.components.light.intensity = 0.2;
auxl.directionalLight3.core.position = new THREE.Vector3(0.25,0.75,0.5);
auxl.ambientLight.core.components.light.intensity = 0.5;

//
//skyBox1
auxl.skyBox1Data = {
data:'skyBox1Data',
id:'skyBox1',
sources:false,
lights:[
auxl.directionalLight,
auxl.directionalLight2,
auxl.directionalLight3,
auxl.ambientLight,
],
sky:[
auxl.skyGrad1,
],
space:[
auxl.sunLayer,
],
};
auxl.skyBox1 = auxl.SkyBox(auxl.skyBox1Data);


//
//Doorways

//Entrance to Floor1
auxl.entranceToFloor1Data = {
data:'entranceToFloor1Data',
id:'entranceToFloor1',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 3, height: 4},
material: {shader: "standard", color: "#264e1a", emissive: '#264e1a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,2.41),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	doorway:{zone: 'entranceZone', to: 'connect0'},
	hovertext:{value: 'Floor 1',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
},
};
auxl.entranceToFloor1 = auxl.Core(auxl.entranceToFloor1Data);

//Floor1 to Entrance
auxl.floor1ToEntranceData = {
data:'floor1ToEntranceData',
id:'floor1ToEntrance',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 3, height: 4},
material: {shader: "standard", color: "#264e1a", emissive: '#264e1a', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,2,2.41),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
	doorway:{zone: 'xrcadeZone', to: 'connect0'},
	hovertext:{value: 'Entrance',  hover: 'top', offset: 0.75, altOffset: 0.5, twist: true,},
},
};
auxl.floor1ToEntrance = auxl.Core(auxl.floor1ToEntranceData);

//Entrance to Spooky
auxl.entranceToSpookyData = {
data:'entranceToSpookyData',
id:'entranceToSpooky',
sounds:{
	open: {src: auxl.soundDoorOpen, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
},
gridSize: new THREE.Vector3(3,0,0.5),
grid: {start:{x:4.5, y:0, z:-13}, yOffset: 0, collide: true},
//position: new THREE.Vector3(3,2,-13),
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1.25,1.25),
classes: ['clickable','a-ent'],
components: {
	['gltf-model']:'./assets/3d/kayKit/doors/door6.glb',
	doorway:{zone: 'entranceZone', to: 'connect1', posTo: true, pos: new THREE.Vector3(0,0,-1), twistTo: true, twist: 0},
	hovertext:{value: 'Spooky Zone',  hover: 'top', offset: 1.25, altOffset: 1, twist: true,},
},
};
auxl.entranceToSpooky = auxl.Core(auxl.entranceToSpookyData);
auxl.entranceToSpookyEmote = auxl.InfoBubble('entranceToSpookyEmote', auxl.entranceToSpooky, 3, 'orange');



//Materials
auxl.floorPattern1 = './assets/img/tiles/xrcade/1.jpg';
auxl.floorPattern2 = './assets/img/tiles/xrcade/2.png';
auxl.floorPattern3 = './assets/img/tiles/xrcade/3.gif';
auxl.floorPattern4 = './assets/img/tiles/xrcade/4.jpg';
auxl.floorPattern5 = './assets/img/tiles/xrcade/5.jpg';
auxl.floorPattern6 = './assets/img/tiles/xrcade/6.jpg';
//
//Floor
auxl.xrcadeFloorData = {
	data:'xrcadeFloorData',
	id:'xrcadeFloor',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', height: 22, width: 22},
	material: {shader: 'flat', side: 'front', src: auxl.floorPattern1, repeat: '5.5 5.5'},
	position: new THREE.Vector3(0,0,-9),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.xrcadeFloor = auxl.Core(auxl.xrcadeFloorData);



//Style 1
auxl.carpetChange1Data = {
data:'carpetChange1Data',
id:'carpetChange1',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern1, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(5.75,2.5,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern1',
	},
},
};
auxl.carpetChange1 = auxl.Core(auxl.carpetChange1Data);
//Style 2
auxl.carpetChange2Data = {
data:'carpetChange2Data',
id:'carpetChange2',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern2, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(6.5,1.25,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern2',
	},
},
};
auxl.carpetChange2 = auxl.Core(auxl.carpetChange2Data);
//Style 3
auxl.carpetChange3Data = {
data:'carpetChange3Data',
id:'carpetChange3',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern3, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(5,1.25,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern3',
	},
},
};
auxl.carpetChange3 = auxl.Core(auxl.carpetChange3Data);
//Style 4
auxl.carpetChange4Data = {
data:'carpetChange4Data',
id:'carpetChange4',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern4, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(3.5,1.25,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern4',
	},
},
};
auxl.carpetChange4 = auxl.Core(auxl.carpetChange4Data);
//Style 5
auxl.carpetChange5Data = {
data:'carpetChange5Data',
id:'carpetChange5',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern5, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(4.25,2.5,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern5',
	},
},
};
auxl.carpetChange5 = auxl.Core(auxl.carpetChange5Data);
//Style 6
auxl.carpetChange6Data = {
data:'carpetChange6Data',
id:'carpetChange6',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.1, width: 1, height: 1},
material: {shader: "flat", src: auxl.floorPattern6, repeat: '1 1', opacity: 1},
position: new THREE.Vector3(2.75,2.5,1.74),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__carpet:{
		method: 'changeCarpetTexture',
		params: 'floorPattern6',
	},
},
};
auxl.carpetChange6 = auxl.Core(auxl.carpetChange6Data);
//mtnFloor
auxl.mtnFloorData = {
	data:'mtnFloorData',
	id:'mtnFloor',
	sources:false,
	text: false,
	geometry: false,
	material: {shader: "standard", color: "#1caed1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1caed1", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '100 100'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
	['obj-model']:{obj: './assets/3d/XRcade/mtnFloor.obj'},
	},
};
auxl.mtnFloor = auxl.Core(auxl.mtnFloorData);
//Ceiling
auxl.ceilingData = {
	data:'ceilingData',
	id:'ceiling',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', height: 22, width: 22},
	material: {shader: 'flat', side: 'front', src: auxl.pattern49, repeat: '2 2', blending: 'additive', opacity: 0.05},
	position: new THREE.Vector3(0,10,-9),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.ceiling = auxl.Core(auxl.ceilingData);

//
//Walls

//Wall Frame
auxl.wallFrameData = {
	data:'wallFrameData',
	id:'wallFrame',
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
	components:{
		['gltf-model']:'./assets/3d/XRcade/glass-frame.glb',
		gltfmat: {colors:['white','black',], opacities:[1,0.25],},
	},
};

//Wall East
auxl.wallEastWestSegData = {
	data:'wallEastWestSegData',
	id:'wallEastWestSeg',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 10, width: 0.5, depth: 4},
	material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '4 10'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
//Wall East Segment 1 (Left)
auxl.wallEastSeg1Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallEastSeg1', grid: {start:{x:11, y:0, z:-20}, end: {x:11, y:0, z:-16}, yOffset: 5, collide: true}, }, true);
auxl.wallEastSeg1 = auxl.Core(auxl.wallEastSeg1Data);
//Wall East Segment 2 (Middle)
auxl.wallEastSeg2Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallEastSeg2', grid: {start:{x:11, y:0, z:-13.5}, end: {x:11, y:0, z:-4.5}, yOffset: 5, collide: true}, geometry: {primitive: 'box', height: 10, width: 0.5, depth: 9}, material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '10 10'}, }, true);
auxl.wallEastSeg2 = auxl.Core(auxl.wallEastSeg2Data);
//Wall East Segment 3 (Right)
auxl.wallEastSeg3Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallEastSeg3', grid: {start:{x:11, y:0, z:-2}, end: {x:11, y:0, z:2}, yOffset: 5, collide: true}, }, true);
auxl.wallEastSeg3 = auxl.Core(auxl.wallEastSeg3Data);
//Wall East Frame 1 (Left)
auxl.wallEastFrame1Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallEastFrame1', grid: {start:{x:11, y:0, z:-16}, end: {x:11, y:0, z:-13.5}, collide: true}, }, true);
auxl.wallEastFrame1 = auxl.Core(auxl.wallEastFrame1Data);
//Wall East Frame 2 (Right)
auxl.wallEastFrame2Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallEastFrame2', grid: {start:{x:11, y:0, z:-4.5}, end: {x:11, y:0, z:-2}, collide: true}, }, true);
auxl.wallEastFrame2 = auxl.Core(auxl.wallEastFrame2Data);

//Wall West

//Wall West Segment 1 (Left)
auxl.wallWestSeg1Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallWestSeg1', grid: {start:{x:-11, y:0, z:-20}, end: {x:-11, y:0, z:-16}, yOffset: 5, collide: true}, }, true);
auxl.wallWestSeg1 = auxl.Core(auxl.wallWestSeg1Data);
//Wall West Segment 2 (Middle)
auxl.wallWestSeg2Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallWestSeg2', grid: {start:{x:-11, y:0, z:-13.5}, end: {x:-11, y:0, z:-4.5}, yOffset: 5, collide: true}, geometry: {primitive: 'box', height: 10, width: 0.5, depth: 9}, material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '10 10'}, }, true);
auxl.wallWestSeg2 = auxl.Core(auxl.wallWestSeg2Data);
//Wall West Segment 3 (Right)
auxl.wallWestSeg3Data = auxl.CoreDataFromTemplate(auxl.wallEastWestSegData, {id: 'wallWestSeg3', grid: {start:{x:-11, y:0, z:-2}, end: {x:-11, y:0, z:2}, yOffset: 5, collide: true}, rotation: new THREE.Vector3(0,180,0),}, true);
auxl.wallWestSeg3 = auxl.Core(auxl.wallWestSeg3Data);
//Wall West Frame 1 (Left)
auxl.wallWestFrame1Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallWestFrame1', grid: {start:{x:-11, y:0, z:-16}, end: {x:-11, y:0, z:-13.5}, collide: true}, rotation: new THREE.Vector3(0,180,0),}, true);
auxl.wallWestFrame1 = auxl.Core(auxl.wallWestFrame1Data);
//Wall West Frame 2 (Right)
auxl.wallWestFrame2Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallWestFrame2', grid: {start:{x:-11, y:0, z:-4.5}, end: {x:-11, y:0, z:-2}, collide: true}, rotation: new THREE.Vector3(0,180,0),}, true);
auxl.wallWestFrame2 = auxl.Core(auxl.wallWestFrame2Data);


//Wall North
auxl.wallNorthSegData = {
	data:'wallNorthSegData',
	id:'wallNorthSeg',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 10, width: 4.5, depth: 0.5},
	material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '4.5 10'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
//Wall North Segment 1 (Left)
auxl.wallNorthSeg1Data = auxl.CoreDataFromTemplate(auxl.wallNorthSegData, {id: 'wallNorthSeg1', grid: {start:{x:-11, y:0, z:-20}, end: {x:-7.5, y:0, z:-20}, yOffset: 5, collide: true}, }, true);
auxl.wallNorthSeg1 = auxl.Core(auxl.wallNorthSeg1Data);
//Wall North Segment 2 (Middle)
auxl.wallNorthSeg2Data = auxl.CoreDataFromTemplate(auxl.wallNorthSegData, {id: 'wallNorthSeg2', grid: {start:{x:-4.5, y:0, z:-20}, end: {x:4.5, y:0, z:-20}, yOffset: 5, collide: true}, geometry: {primitive: 'box', height: 10, width: 9, depth: 0.5}, material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '10 10'}, }, true);
auxl.wallNorthSeg2 = auxl.Core(auxl.wallNorthSeg2Data);
//Wall North Segment 3 (Right)
auxl.wallNorthSeg3Data = auxl.CoreDataFromTemplate(auxl.wallNorthSegData, {id: 'wallNorthSeg3', grid: {start:{x:7.5, y:0, z:-20}, end: {x:11, y:0, z:-20}, yOffset: 5, collide: true}, }, true);
auxl.wallNorthSeg3 = auxl.Core(auxl.wallNorthSeg3Data);
//Wall North Frame 1 (Left)
auxl.wallNorthFrame1Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallNorthFrame1', grid: {start:{x:-7, y:0, z:-20}, end: {x:-4.5, y:0, z:-20}, collide: true}, rotation: new THREE.Vector3(0,90,0),}, true);
auxl.wallNorthFrame1 = auxl.Core(auxl.wallNorthFrame1Data);
//Wall North Frame 2 (Right)
auxl.wallNorthFrame2Data = auxl.CoreDataFromTemplate(auxl.wallFrameData, {id: 'wallNorthFrame2', grid: {start:{x:4.5, y:0, z:-20}, end: {x:7, y:0, z:-20}, collide: true}, rotation: new THREE.Vector3(0,90,0),}, true);
auxl.wallNorthFrame2 = auxl.Core(auxl.wallNorthFrame2Data);

//Wall South
auxl.wallSouthPartData = {
	data:'wallSouthPartData',
	id:'wallSouthPart',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 6, width: 22, depth: 0.5},
	material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '22 6'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
//Wall Segment Top
auxl.wallSouthTopData = auxl.CoreDataFromTemplate(auxl.wallSouthPartData, {id: 'wallSouthTop', grid: {start:{x:-11, y:0, z:2}, end: {x:11, y:0, z:2}, yOffset: 7, collide: false}, }, true);
auxl.wallSouthTop = auxl.Core(auxl.wallSouthTopData);
//Wall Segment Partial 1 (Left)
auxl.wallSouthPart1Data = auxl.CoreDataFromTemplate(auxl.wallSouthPartData, {id: 'wallSouthPart1', grid: {start:{x:1.5, y:0, z:2}, end: {x:11, y:0, z:2}, yOffset: 2, collide: true}, geometry: {primitive: 'box', height: 4, width: 9.5, depth: 0.5}, material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '9.5 4'},}, true);
auxl.wallSouthPart1 = auxl.Core(auxl.wallSouthPart1Data);
//Wall Segment Partial 2 (Right)
auxl.wallSouthPart2Data = auxl.CoreDataFromTemplate(auxl.wallSouthPartData, {id: 'wallSouthPart2', grid: {start:{x:-11, y:0, z:2}, end: {x:-1.5, y:0, z:2}, yOffset: 2, collide: true}, geometry: {primitive: 'box', height: 4, width: 9.5, depth: 0.5}, material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '9.5 4'}, }, true);
auxl.wallSouthPart2 = auxl.Core(auxl.wallSouthPart2Data);

//
//Wall Pilar

//North West
auxl.wallPilarData = {
	data:'wallPilarData',
	id:'wallPilar',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 10, width: 4, depth: 4},
	material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '4 10'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.wallPilar1Data = auxl.CoreDataFromTemplate(auxl.wallPilarData, {id: 'wallPilar1', grid: {start:{x:9, y:0, z:0}, end: {x:13, y:0, z:4}, yOffset: 5, collide: true}}, true);
auxl.wallPilar1 = auxl.Core(auxl.wallPilar1Data);
//North East
auxl.wallPilar2Data = auxl.CoreDataFromTemplate(auxl.wallPilarData, {id: 'wallPilar2', grid: {start:{x:-13, y:0, z:0}, end: {x:-9, y:0, z:4}, yOffset: 5, collide: true}}, true);
auxl.wallPilar2 = auxl.Core(auxl.wallPilar2Data);
//South West
auxl.wallPilar3Data = auxl.CoreDataFromTemplate(auxl.wallPilarData, {id: 'wallPilar3', grid: {start:{x:9, y:0, z:-22}, end: {x:13, y:0, z:-18}, yOffset: 5, collide: true}}, true);
auxl.wallPilar3 = auxl.Core(auxl.wallPilar3Data);
//South East
auxl.wallPilar4Data = auxl.CoreDataFromTemplate(auxl.wallPilarData, {id: 'wallPilar4', grid: {start:{x:-13, y:0, z:-22}, end: {x:-9, y:0, z:-18}, yOffset: 5, collide: true}}, true);
auxl.wallPilar4 = auxl.Core(auxl.wallPilar4Data);


//
//Inner Pilars

//North West
auxl.InnerPilarData = {
	data:'InnerPilarData',
	id:'InnerPilar',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 10, width: 2, depth: 2},
	material: {shader: "standard", opacity: 1, color: '#a23737', metalness: 0.3, roughness: 0.7, emissive: '#a23737', emissiveIntensity: 0.7, side: 'double', src: auxl.pattern18, repeat: '2 10',},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.InnerPilar1Data = auxl.CoreDataFromTemplate(auxl.InnerPilarData, {id: 'InnerPilar1', grid: {start:{x:-7, y:0, z:-4.5}, end: {x:-5, y:0, z:-2}, yOffset: 5, collide: true}}, true);
auxl.InnerPilar1 = auxl.Core(auxl.InnerPilar1Data);
//North East
auxl.InnerPilar2Data = auxl.CoreDataFromTemplate(auxl.InnerPilarData, {id: 'InnerPilar2', grid: {start:{x:5, y:0, z:-4.5}, end: {x:7, y:0, z:-2}, yOffset: 5, collide: true}}, true);
auxl.InnerPilar2 = auxl.Core(auxl.InnerPilar2Data);
//South West
auxl.InnerPilar3Data = auxl.CoreDataFromTemplate(auxl.InnerPilarData, {id: 'InnerPilar3', grid: {start:{x:-7, y:0, z:-16}, end: {x:-5, y:0, z:-13.5}, yOffset: 5, collide: true}}, true);
auxl.InnerPilar3 = auxl.Core(auxl.InnerPilar3Data);
//South East
auxl.InnerPilar4Data = auxl.CoreDataFromTemplate(auxl.InnerPilarData, {id: 'InnerPilar4', grid: {start:{x:5, y:0, z:-16}, end: {x:7, y:0, z:-13.5}, yOffset: 5, collide: true}}, true);
auxl.InnerPilar4 = auxl.Core(auxl.InnerPilar4Data);


//
//Dividers

//Divider
auxl.dividerData = {
	data:'dividerData',
	id:'divider',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 1.5, width: 1, depth: 6},
	material: {shader: 'flat', src: auxl.floorPattern1, repeat: '2 0.5'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
//East
auxl.dividerEastData = auxl.CoreDataFromTemplate(auxl.dividerData, {id: 'dividerEast', grid: {start:{x:5.5, y:0, z:-12}, end: {x:6, y:0, z:-6}, yOffset: 0.75, collide: true}, }, true);
auxl.dividerEast = auxl.Core(auxl.dividerEastData);
//West
auxl.dividerWestData = auxl.CoreDataFromTemplate(auxl.dividerData, {id: 'dividerWest', grid: {start:{x:-6, y:0, z:-12}, end: {x:-5.5, y:0, z:-6}, yOffset: 0.75, collide: true}, }, true);
auxl.dividerWest = auxl.Core(auxl.dividerWestData);
//North
auxl.dividerNorthData = auxl.CoreDataFromTemplate(auxl.dividerData, {id: 'dividerNorth', grid: {start:{x:-3, y:0, z:-15}, end: {x:3, y:0, z:-14.5}, yOffset: 0.75, collide: true}, geometry: {primitive: 'box', height: 1.5, width: 6, depth: 1},}, true);
auxl.dividerNorth = auxl.Core(auxl.dividerNorthData);
//South
auxl.dividerSouthData = auxl.CoreDataFromTemplate(auxl.dividerData, {id: 'dividerSouth', grid: {start:{x:-3, y:0, z:-3.5}, end: {x:3, y:0, z:-3}, yOffset: 0.75, collide: true}, geometry: {primitive: 'box', height: 1.5, width: 6, depth: 1},}, true);
auxl.dividerSouth = auxl.Core(auxl.dividerSouthData);

//
//Elevator Soon


//Jukebox
auxl.jukeBoxData = {
	data:'jukeBoxData',
	id:'jukeBox',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	grid: {start:{x:-5, y:0, z:-3.5}, end: {x:-4, y:0, z:-3}, yOffset: 0, collide: true},
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		click: {property: 'scale', from: '1 1 1', to: '1.1 1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/jukebox.glb',
		gltfmat: {colors: '#16aa60, #05aaf4, #f4057c', emissives: '0.25,0.25,0.75'},
		clickrun__toggle:{
			cursorObj: 'jukeBoxAudioToggle',
			component: 'null',
			method: 'ToggleSpawn',
			params: 'null',
		},
		hovertext:{value: 'Background Music', hover: 'top', offset: 2, twist: true,},
	},
};
auxl.jukeBox = auxl.Core(auxl.jukeBoxData);
//Background Toggle
auxl.jukeBoxAudioToggleData = {
data:'jukeBoxAudioToggleData',
id:'jukeBoxAudioToggle',
sources: false,
text: {value:'Disable Background Audio', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.051, side: 'double', align: "center", baseline: 'center', width: 1.4},
geometry: {primitive: 'box', depth: 0.1, width: 1.5, height: 0.5},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.4, side: 'double'},
position: new THREE.Vector3(-4.75,2.25,-3.25),
rotation: new THREE.Vector3(0,90,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	hoveron: {property: 'material.emissiveIntensity', from: '0.4', to: '0.8', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoveroff: {property: 'material.emissiveIntensity', from: '0.8', to: '0.4', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__toggleaudio:{
		method: 'ToggleBackgroundAudio',
		params: 'null',
	},
	clickrunfunc__updatebackgroundtoggle:{
		method: 'ToggleBackgroundAudioText',
		params: 'null',
	},
	onspawnfunc__update:{
		auxlFunc: 'UpdateBackgroundToggleText',
		params: 'null',
	},
},
};
auxl.jukeBoxAudioToggle = auxl.Core(auxl.jukeBoxAudioToggleData);

//Token
auxl.tokenData = {
	data:'tokenData',
	id:'token',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	grid: {start:{x:4, y:0, z:-3.5}, end: {x:5, y:0, z:-3}, yOffset: 0, collide: true},
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/token.glb',
		gltfmat: {colors: '#f4057c, #05aaf4, #16aa60', emissives: '0.75,0.25,0.75'},
		hovertext:{value: 'Sponsor My Work', hover: 'top', offset: 2, twist: true,},
		clickrun__link1:{
			cursorObj: 'tokenLink1',
			component: 'null',
			method: 'ToggleSpawn',
			params: 'null',
		},
		clickrun__link2:{
			cursorObj: 'tokenLink2',
			component: 'null',
			method: 'ToggleSpawn',
			params: 'null',
		},
		clickrun__link3:{
			cursorObj: 'tokenLink3',
			component: 'null',
			method: 'ToggleSpawn',
			params: 'null',
		},
	},
};
auxl.token = auxl.Core(auxl.tokenData);
//Link 1 - Portfolio
auxl.tokenLink1Data = {
data:'tokenLink1Data',
id:'tokenLink1',
sources: false,
text: {value:'Open Portfolio Link', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.051, side: 'double', align: "center", baseline: 'center', width: 1.4},
geometry: {primitive: 'box', depth: 0.1, width: 1.5, height: 0.5},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.4, side: 'double'},
position: new THREE.Vector3(4.75,2.25,-3.25),
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	hoveron: {property: 'material.emissiveIntensity', from: '0.4', to: '0.8', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoveroff: {property: 'material.emissiveIntensity', from: '0.8', to: '0.4', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__toggleaudio:{
		method: 'OpenLink',
		params: 'https://mintycrisp.com',
	},
	onspawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink1, node',
	},
	ondespawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink1, node',
	},
},
};
auxl.tokenLink1 = auxl.Core(auxl.tokenLink1Data);
//Link 2 - Kofi
auxl.tokenLink2Data = {
data:'tokenLink2Data',
id:'tokenLink2',
sources: false,
text: {value:'Open Ko-fi Link', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.051, side: 'double', align: "center", baseline: 'center', width: 1.4},
geometry: {primitive: 'box', depth: 0.1, width: 1.5, height: 0.5},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.4, side: 'double'},
position: new THREE.Vector3(4.75,3,-3.25),
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	hoveron: {property: 'material.emissiveIntensity', from: '0.4', to: '0.8', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoveroff: {property: 'material.emissiveIntensity', from: '0.8', to: '0.4', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__toggleaudio:{
		method: 'OpenLink',
		params: 'https://ko-fi.com/mintycrisp',
	},
	onspawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink2, node',
	},
	ondespawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink2, node',
	},
},
};
auxl.tokenLink2 = auxl.Core(auxl.tokenLink2Data);
//Link 3 - Itch
auxl.tokenLink3Data = {
data:'tokenLink3Data',
id:'tokenLink3',
sources: false,
text: {value:'Open Itch Store', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.051, side: 'double', align: "center", baseline: 'center', width: 1.4, opacity: 1},
geometry: {primitive: 'box', depth: 0.1, width: 1.5, height: 0.5},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.4, side: 'double'},
position: new THREE.Vector3(4.75,3.75,-3.25),
rotation: new THREE.Vector3(0,-90,0),
scale: new THREE.Vector3(1,1,1),
animations:{
	hoveron: {property: 'material.emissiveIntensity', from: '0.4', to: '0.8', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	hoveroff: {property: 'material.emissiveIntensity', from: '0.8', to: '0.4', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
	clickrunfunc__toggleaudio:{
		method: 'OpenLink',
		params: 'https://mintycrisp.itch.io/',
	},
	onspawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink3, node',
	},
	ondespawnfuncdual:{
		auxlFunc: 'SpawnTracker',
		params: 'tokenLink3, node',
	},
},
};
auxl.tokenLink3 = auxl.Core(auxl.tokenLink3Data);


//Sponsor
/*
auxl.sponsorData = {
	data:'sponsorData',
	id:'sponsor',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,180,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		['zesty-banner']: {adUnit: '5380481b-af7b-4aaa-b97d-92c7d35ab4ae', format: 'wide', style: 'standard', beacon: true},
		//['stare']:{id: 'playerRig'},
	},
};
*/
//auxl.sponsor1Data = auxl.CoreDataFromTemplate(auxl.sponsorData, {id: 'sponsor1', position: new THREE.Vector3(-5.5,6,1.74),}, true);
//auxl.sponsor1 = auxl.Core(auxl.sponsor1Data);

//
//Neons

//Neon Lines
auxl.lineSignData = {
	data:'lineSignData',
	id:'lineSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,7,-5.95),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(2,2,2),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};

//Center
//

//Minty's XRCade Sign
auxl.cadeSignData = {
	data:'cadeSignData',
	id:'cadeSign1',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,-0.25,0.1),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(2,2,2),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/xrcade.glb',
		gltfmat: {colors: '#f4057c, #05aaf4, #eddd23, #16aa60', emissives: '1,1,1,1'},
	},
};
auxl.cadeSign1 = auxl.Core(auxl.cadeSignData);

auxl.cadeSign2Data = auxl.CoreDataFromTemplate(auxl.cadeSignData, {id: 'cadeSign2', position: new THREE.Vector3(0,-0.25,-0.1), rotation: new THREE.Vector3(90,180,0)}, true);
auxl.cadeSign2 = auxl.Core(auxl.cadeSign2Data);


auxl.signSpinnerData = {
	data:'signSpinnerData',
	id:'signSpinner',
	sources:false,
	text: false,
	geometry: {primitive: 'box', height: 2.25, width: 8, depth: 0.1},
	material: {shader: "standard", opacity: 1, color: '#4a4848', metalness: 0.3, roughness: 0.7, emissive: '#4a4848', emissiveIntensity: 0.7,},
	position: new THREE.Vector3(0,9,-9),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{spin: {property: 'object3D.rotation.y', from: 0, to: 360, dur: 20000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,}, },
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.signSpinner = auxl.Core(auxl.signSpinnerData);

//Sign Spinner Layer
auxl.cadeSignSpinnerData = {
	parent: {core: auxl.signSpinner},
	child0: {core: auxl.cadeSign1},
	child1: {core: auxl.cadeSign2},
}
auxl.cadeSignSpinner = auxl.Layer('cadeSignSpinner', auxl.cadeSignSpinnerData);


//East Wall Neon
//

//Waves
auxl.wavesSignData = {
	data:'wavesSignData',
	id:'wavesSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(-10.65,4.5,-9),
	rotation: new THREE.Vector3(90,90,0),
	scale: new THREE.Vector3(1.8,1.8,1.8),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/waves.glb',
		gltfmat: {colors: '#11bfab, #05aaf4', emissives: '1,1'},
	},
};
auxl.wavesSign = auxl.Core(auxl.wavesSignData);

//Wave Lines
auxl.waveLineSignData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'waveLineSign', position: new THREE.Vector3(-10.65,8.5,-8.75), rotation: new THREE.Vector3(90,90,0), scale: new THREE.Vector3(1.6,1.6,1.6), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},}}, true);
auxl.waveLineSign = auxl.Core(auxl.waveLineSignData);

//West Wall Neon
//

//Trees
auxl.treeSignData = {
	data:'treeSignData',
	id:'treeSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(10.65,2,-9),
	rotation: new THREE.Vector3(90,-90,0),
	scale: new THREE.Vector3(1.25,1.25,1.25),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/palm.glb',
		gltfmat: {colors: '#912b5e, #16aa60', emissives: '1,1'},
	},
};
auxl.treeSign = auxl.Core(auxl.treeSignData);
//Tree Lines
auxl.treeLineSignData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'treeLineSign', position: new THREE.Vector3(10.65,8.5,-9.25), rotation: new THREE.Vector3(90,-90,0), scale: new THREE.Vector3(1.6,1.6,1.6), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},}}, true);
auxl.treeLineSign = auxl.Core(auxl.treeLineSignData);

//South Wall Neon
//

//Hearts
auxl.heartsSignData = {
	data:'heartsSignData',
	id:'heartsSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0.5,5.75,1.65),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(2,2,2),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/hearts.glb',
		gltfmat: {colors: '#f4057c, #16aa60', emissives: '1,1'},
	},
};
auxl.heartsSign = auxl.Core(auxl.heartsSignData);
//Geart Lines
auxl.heartLineSignData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'heartLineSign', position: new THREE.Vector3(0,8.5,1.65), rotation: new THREE.Vector3(-90,0,0), scale: new THREE.Vector3(1.6,1.6,1.6), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#eddd23, #f4057c', emissives: '1,1'},}}, true);
auxl.heartLineSign = auxl.Core(auxl.heartLineSignData);

//North Wall Neon
//

//IVX
auxl.ivxSignData = {
	data:'ivxSignData',
	id:'ivxSign',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,5,-19.65),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(2,2,2),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		['gltf-model']:'./assets/3d/XRcade/IVX.glb',
		gltfmat: {colors: '#05aaf4, #f4057c, #16aa60', emissives: '1,1,1'},
	},
};
auxl.ivxSign = auxl.Core(auxl.ivxSignData);
//IVX Line Sign
auxl.ivxLineSignData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'ivxLineSign', position: new THREE.Vector3(-0.25,8.5,-19.65), rotation: new THREE.Vector3(90,0,0), scale: new THREE.Vector3(1.6,1.6,1.6), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},}}, true);
auxl.ivxLineSign = auxl.Core(auxl.ivxLineSignData);




//North West Wall Pilar Lines
//East
auxl.nwWallPilarLineEastData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'nwWallPilarLineEast', position: new THREE.Vector3(-8.95,4.7,-18.93), rotation: new THREE.Vector3(0,0,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},}}, true);
auxl.nwWallPilarLineEast = auxl.Core(auxl.nwWallPilarLineEastData);
//South
auxl.nwWallPilarLineSouthData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'nwWallPilarLineSouth', position: new THREE.Vector3(-10.05,4.7,-17.945), rotation: new THREE.Vector3(0,90,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},}}, true);
auxl.nwWallPilarLineSouth = auxl.Core(auxl.nwWallPilarLineSouthData);

//South West Wall Pilar Lines
//West
auxl.swWallPilarLineWestData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'swWallPilarLineWest', position: new THREE.Vector3(-8.95,4.7,0.93), rotation: new THREE.Vector3(0,0,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},}}, true);
auxl.swWallPilarLineWest = auxl.Core(auxl.swWallPilarLineWestData);
//North
auxl.swWallPilarLineNorthData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'swWallPilarLineNorth', position: new THREE.Vector3(-10.05,4.7,-0.05), rotation: new THREE.Vector3(0,90,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},}}, true);
auxl.swWallPilarLineNorth = auxl.Core(auxl.swWallPilarLineNorthData);


//North East Wall Pilar Lines
//West
auxl.neWallPilarLineWestData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'neWallPilarLineWest', position: new THREE.Vector3(8.95,4.7,-18.93), rotation: new THREE.Vector3(0,0,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},}}, true);
auxl.neWallPilarLineWest = auxl.Core(auxl.neWallPilarLineWestData);
//South
auxl.neWallPilarLineSouthData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'neWallPilarLineSouth', position: new THREE.Vector3(10.05,4.7,-17.945), rotation: new THREE.Vector3(0,-90,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},}}, true);
auxl.neWallPilarLineSouth = auxl.Core(auxl.neWallPilarLineSouthData);

//South East Wall Pilar Lines
//West
auxl.seWallPilarLineWestData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'seWallPilarLineWest', position: new THREE.Vector3(8.95,4.7,0.93), rotation: new THREE.Vector3(0,180,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},}}, true);
auxl.seWallPilarLineWest = auxl.Core(auxl.seWallPilarLineWestData);
//North
auxl.seWallPilarLineNorthData = auxl.CoreDataFromTemplate(auxl.lineSignData, {id: 'seWallPilarLineNorth', position: new THREE.Vector3(10.05,4.7,-0.05), rotation: new THREE.Vector3(0,-90,90), scale: new THREE.Vector3(1.9,1.9,1.9), components: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},}}, true);
auxl.seWallPilarLineNorth = auxl.Core(auxl.seWallPilarLineNorthData);


//Cabinet
auxl.cadeCabData = {
	data:'cadeCabData',
	id:'cadeCab',
	sources: false,
	text: false,
	sounds:{
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.45,0.45,0.45),
	animations:false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components:{
		['gltf-model']:'./assets/3d/XRcade/cabinet.glb',
		gltfmat: {colors:['random','random','random','random','random', 'black','random','random','random','random'],},
		hovertext:{value: 'Ready?\nPlayer One', hover: 'top', offset: 5, twist: true,},
	},
};
auxl.cadeCab = auxl.Core(auxl.cadeCabData);
//Game Title
auxl.cabTitleData = {
	data:'cabTitleData',
	id:'cabTitle',
	sources: false,
	text: {value:'Coming Soon!', color: "#FFFFFF", align: "center", font: "exo2bold", width: 2, zOffset: 0.025, side: 'front', wrapCount: 16, baseline: 'center'},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,4.15,0.95),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.cabTitle = auxl.Core(auxl.cabTitleData);
//Logo Left
auxl.logoLeftData = {
	data:'logoLeftData',
	id:'logoLeft',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 0.5, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "white", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1e7e5d", emissiveIntensity: 0.2, side: 'front',},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,-90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent',],
	components: false,
};
auxl.logoLeft = auxl.Core(auxl.logoLeftData);

//Cab Layer
auxl.cabLayerData = {
	parent: {core: auxl.cadeCab},
	child0: {core: auxl.cabTitle},
}
auxl.cabLayer = auxl.Layer('cabLayer', auxl.cabLayerData);

//Left
//Cab 1
auxl.cadeCab1Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab1Layer', {rotation: new THREE.Vector3(0,90,0), components:{['gltf-model']:'./assets/3d/XRcade/cabinet.glb', gltfmat: {colors:['random', 'random', 'random', 'random', 'random', 'white', 'random', 'random', 'random', 'random'], textures:[false, false, false, false, false, auxl.game1Preview,],}, hovertext:{value: 'Ready?\nPlayer One', hover: 'top', offset: 5, twist: true,},},}, {grid: {start:{x:-5.5, y:0, z:-7.5}, end: {x:-4, y:0, z:-6}, yOffset: 0, collide: true}}, true);
auxl.cadeCab1Layer.layer.all.child0.core.core.text.value = 'Memory Order';
//Cab 2
auxl.cadeCab2Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab2Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-9}, end: {x:-4, y:0, z:-7.5}, yOffset: 0, collide: true}}, true);
auxl.cadeCab2Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game2Preview,]};
auxl.cadeCab2Layer.layer.all.child0.core.core.text.value = 'Swipe Launch';
//Cab 3
auxl.cadeCab3Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab3Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-10.5}, end: {x:-4, y:0, z:-9}, yOffset: 0, collide: true}}, true);
auxl.cadeCab3Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game3Preview,]};
auxl.cadeCab3Layer.layer.all.child0.core.core.text.value = 'Guess Hit';
//Cab 4
auxl.cadeCab4Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab4Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-12}, end: {x:-4, y:0, z:-10.5}, yOffset: 0, collide: true}}, true);
auxl.cadeCab4Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game4Preview,]};
auxl.cadeCab4Layer.layer.all.child0.core.core.text.value = 'Drag Diffuse';
//Cab 5
auxl.cadeCab5Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab5Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-3, y:0, z:-14.5}, end: {x:-1.5, y:0, z:-13}, yOffset: 0, collide: true}}, true);
auxl.cadeCab5Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game5Preview,]};
auxl.cadeCab5Layer.layer.all.child0.core.core.text.value = 'Sharp Shooter';
//Cab 6
auxl.cadeCab6Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab6Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-1.5, y:0, z:-14.5}, end: {x:0, y:0, z:-13}, yOffset: 0, collide: true}}, true);
auxl.cadeCab6Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game6Preview,]};
auxl.cadeCab6Layer.layer.all.child0.core.core.text.value = 'Perfect Scale';
//Cab 7
auxl.cadeCab7Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab7Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:0, y:0, z:-14.5}, end: {x:1.5, y:0, z:-13}, yOffset: 0, collide: true}}, true);
auxl.cadeCab7Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game7Preview,]};
auxl.cadeCab7Layer.layer.all.child0.core.core.text.value = 'Reflex 7';
//Cab 8
auxl.cadeCab8Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab8Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:1.5, y:0, z:-14.5}, end: {x:3, y:0, z:-13}, yOffset: 0, collide: true}}, true);
auxl.cadeCab8Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game8Preview,]};
auxl.cadeCab8Layer.layer.all.child0.core.core.text.value = 'Tap It';
//Cab 9
auxl.cadeCab9Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab9Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-12}, end: {x:5.5, y:0, z:-10.5}, yOffset: 0, collide: true}}, true);
auxl.cadeCab9Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game9Preview,]};
auxl.cadeCab9Layer.layer.all.child0.core.core.text.value = 'Pop Pop';
//Cab 10
auxl.cadeCab10Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab10Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-10.5}, end: {x:5.5, y:0, z:-9}, yOffset: 0, collide: true}}, true);
auxl.cadeCab10Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game10Preview,]};
auxl.cadeCab10Layer.layer.all.child0.core.core.text.value = 'Horde Halt';
//Cab 11
auxl.cadeCab11Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab11Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-9}, end: {x:5.5, y:0, z:-7.5}, yOffset: 0, collide: true}}, true);
//Cab 12
auxl.cadeCab12Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab12Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-7.5}, end: {x:5.5, y:0, z:-6}, yOffset: 0, collide: true}}, true);



//Cab 13
auxl.cadeCab13Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab13Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:8.5, y:0, z:-22}, end: {x:9, y:0, z:-21.5}, yOffset: 0, collide: true}}, true);
//Cab 14
auxl.cadeCab14Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab14Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:8.5, y:0, z:-24}, end: {x:9, y:0, z:-23.5}, yOffset: 0, collide: true}}, true);

//Back
//Cab 15
auxl.cadeCab15Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab15Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:6, y:0, z:-26.5}, end: {x:6.5, y:0, z:-26}, yOffset: 0, collide: true}}, true);
//Cab 16
auxl.cadeCab16Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab16Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:3.5, y:0, z:-26.5}, end: {x:4, y:0, z:-26}, yOffset: 0, collide: true}}, true);
//Cab 17
auxl.cadeCab17Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab17Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:1, y:0, z:-26.5}, end: {x:1.5, y:0, z:-26}, yOffset: 0, collide: true}}, true);
//Cab 18
auxl.cadeCab18Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab18Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-1.5, y:0, z:-26.5}, end: {x:-1, y:0, z:-26}, yOffset: 0, collide: true}}, true);
//Cab 19
auxl.cadeCab19Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab19Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-4, y:0, z:-26.5}, end: {x:-3.5, y:0, z:-26}, yOffset: 0, collide: true}}, true);
//Cab 20
auxl.cadeCab20Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab20Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-6.5, y:0, z:-26.5}, end: {x:-6, y:0, z:-26}, yOffset: 0, collide: true}}, true);

//Front
//Cab 21
auxl.cadeCab21Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab21Layer', {rotation: new THREE.Vector3(0,180,0)}, {grid: {start:{x:-3.5, y:0, z:-10}, end: {x:-3, y:0, z:-9.5}, yOffset: 0, collide: true}}, true);
//Cab 22
auxl.cadeCab22Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab22Layer', {rotation: new THREE.Vector3(0,180,0)}, {grid: {start:{x:-1.5, y:0, z:-10}, end: {x:-1, y:0, z:-9.5}, yOffset: 0, collide: true}}, true);
//Cab 23
auxl.cadeCab23Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab23Layer', {rotation: new THREE.Vector3(0,180,0)}, {grid: {start:{x:1, y:0, z:-10}, end: {x:1.5, y:0, z:-9.5}, yOffset: 0, collide: true}}, true);
//Cab 24
auxl.cadeCab24Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab24Layer', {rotation: new THREE.Vector3(0,180,0)}, {grid: {start:{x:3, y:0, z:-10}, end: {x:3.5, y:0, z:-9.5}, yOffset: 0, collide: true}}, true);



//
//NPC

//Attendant
//

//Podium
auxl.npcAttPodiumData = {
data:'npcAttPodiumData',
id:'npcAttPodium',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 1, width: 1, height: 0.4},
material: {shader: "standard", color: "#c6dec9", opacity: 1, side: 'double', metalness: 0.8, roughness: 0.2},
position: new THREE.Vector3(0,0,0),
grid: {start:{x:-0.5, y:0, z:-5.5}, end: {x:0.5, y:0, z:-4.5}, yOffset: 0.2, collide: true},
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent', 'clickable'],
components: {
	hovertext:{value: 'Attendant',  hover: 'front', offset: 0.707, twist: true,},
},
};
auxl.npcAttPodium = auxl.Core(auxl.npcAttPodiumData);

//Parent
auxl.npcAttParentData = {
data:'npcAttParentData',
id:'npcAttParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1.2,-5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
	['stare']:{id: 'playerRig'},
},
};
auxl.npcAttParent = auxl.Core(auxl.npcAttParentData);
//Body
auxl.npcAttBodyData = {
data:'npcAttBodyData',
id:'npcAtt',
sources: false,
text: {value:'O_O', width: 2, wrapCount: 14, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.26, side: 'double'},
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", color: "#139b23", emissive: '#139b23', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.npcAttBody = auxl.Core(auxl.npcAttBodyData);
//Rig
auxl.npcAttRigData = {
	parent: {core: auxl.npcAttParent}, 
	child0: {core: auxl.npcAttBody}, 
}
auxl.npcAttRig = auxl.Layer('npcAttRig',auxl.npcAttRigData);

//Book & Pages
auxl.npcAttPage0Data = {
	info:{
		id:'npcAttPage0',
		description:'Attendant intro and topic selection.',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Hey there and welcome to Mintys XRcade!'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'I am the buildings attendant and can help answer some questions you may have.'},},
	},
	timeline2:{
		self:{Speak:{speech:'If there is nothing though, you may proceed to any doorway aka floor you currently have access to and of course have fun!'},},
	},
	topics:{
		self:{Speak:{speech:'Anything you want to know?'}, SelectJump:['Questions?',
['What is this place?','timeline4'],
['What are the controls?','timeline5'],
['Where are the games?','timeline6'],
['What kind of games are there?','timeline7'],
['How do you play a game?','timeline8'],
['When will more games be added?','timeline9'],
['Is this free to play?','timeline10'],
['Nothing else, thank you.','timelineEnd'],
],},
	},

/*
auxl.addToMainMenu = {
	menu0: {
		id: 'testMenu',
		style: false,
		title: 'Test',
		description: 'A test menu to add to main menu',
		subMenu: 'testing',
		action: false,
	},
	testing:{
		button1:{
			id: 'action1',
			style: false,
			title: 'Test 1',
			description: 'Test action 1',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 1',
				menu: 'close',
			},
		},
		button2:{
			id: 'action2',
			style: false,
			title: 'Test 2',
			description: 'Test action 2',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 2',
				menu: 'close',
			},
		},
		button3:{
			id: 'action3',
			style: false,
			title: 'Test 3',
			description: 'Test action 3',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 3',
				menu: 'close',
			},
		},
		button4:{
			id: 'action4',
			style: false,
			title: 'Test 4',
			description: 'Test action 4',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 4',
				menu: 'close',
			},
		},
		button5:{
			id: 'action5',
			style: false,
			title: 'Test 5',
			description: 'Test action 5',
			subMenu: false,
			action: {
				auxlObj: 'player',
				component: false,
				method: 'TestFunc',
				params: 'Test Action 5',
				menu: 'close',
			},
		},
	},
};

	topics:{
		self:{Speak:{speech:'Anything you want to know?'}, SelectJump:['Questions?',
['What is this place?','timeline4'],
['What are the controls?','timeline5'],
['Where are the games?','timeline6'],
['What kind of games are there?','timeline7'],
['How do you play a game?','timeline8'],
['When will more games be added?','timeline9'],
['Is this free to play?','timeline10'],
['Nothing else, thank you.','timelineEnd'],
],},
	},
*/
	timeline4:{
		self:{
			Speak:{speech:'What is this place?'},
			Jump: {page: 'page1', timeline: 'timeline0'},
		}, 
	},
	timeline5:{
		self:{
			Speak:{speech:'What are the controls?'},
			Jump: {page: 'page2', timeline: 'page2Time0',},
		}, 
	},
	timeline6:{
		self:{
			Speak:{speech:'Where are the games?'},
			Jump: {page: 'page3', timeline: 'page3Time0'},
		}, 
	},
	timeline7:{
		self:{
			Speak:{speech:'What kind of games are there?'},
			Jump: {page: 'page4', timeline: 'page4Time0'},
		}, 
	},
	timeline8:{
		self:{
			Speak:{speech:'How do you play a game?'},
			Jump: {page: 'page5', timeline: 'page5Time0'},
		}, 
	},
	timeline9:{
		self:{
			Speak:{speech:'When will more games be added?'},
			Jump: {page: 'page6', timeline: 'page6Time0'},
		}, 
	},
	timeline10:{
		self:{
			Speak:{speech:'Is this free to play?'},
			Jump: {page: 'page7', timeline: 'page7Time0'},
		}, 
	},
	timelineEnd:{
		self:{
			Speak:{speech:'Enjoy your time at Mintys XRcade!'},
		}, 
	},
	timelineReset:{
		self: {ResetSpeech: true},
	},
};
auxl.npcAttPage1Data = {
	info:{
		id:'npcAttPage1',
		description:'What is this place?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'This is Mintys XRcade, a collection of mini-games, experiences, demos, experiments and more.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'All of that in the browser with support for XR. Playable on Desktop, Mobile and in VR too. More to be added!'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'It is a creative outlet and good place to showcase things I ve built with my personally made A-Frame engine called AUXL (A-Frame UX Library).'}}, 
	},
	timeline3:{
		self:{Speak:{speech:'Please have a look around and if you have any questions, comments or inquiries, feel free to reach me at one of my contacts you can find at mintycrisp.com .'}}, 
	},
	timeline4:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline5:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage2Data = {
	info:{
		id:'npcAttPage2',
		description:'What are the controls?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page2Time0:{
		self:{Speak:{speech:'Controls are dependent upon your hardware and the mode selected such as Desktop, Mobile or VR.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'The system allows the use of about a dozen or so actions at one time which can change from scene.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'Standard controls will allow you to move, look around, click/select with a raycaster, snap turn, crouch mode, vr sitting mode, etc...'}}, 
	},
	timeline3:{
		self:{Speak:{speech:'Reverting, overwriting and/or additional controls can be introduced in new scenes, during the scene, manually by the player or by the system due to an action.'}}, 
	},
	timeline4:{
		self:{
			Speak:{speech:'You can always view you a list of the current actions assigned and the mode settings in your Companions Menu under Controls.'},
		}, 
	},
	timeline5:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline6:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage3Data = {
	info:{
		id:'npcAttPage3',
		description:'Where are the games?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page3Time0:{
		self:{Speak:{speech:'You are currently in the building lobby. To find something to do, please take any doorway you see to another floor.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'Other floors will contain various shaped portals such as an arcade cabinet that will allow you to load into the connect game.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'In addition to games, there may be other types of experiences. Keep an open mind when exploring!'}}, 
	},
	timeline3:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline4:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage4Data = {
	info:{
		id:'npcAttPage4',
		description:'What kind of games are there?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page4Time0:{
		self:{Speak:{speech:'Currently a majority of mini-games with the addition of a Spooky set of experiences in progress, but much more coming soon.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'The game lengths can be quite varied too. Some quick, some endless and some other are fixed length.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'All games can be exitted while in-progress. If main menu isnt available, use your Companion Menu.'}}, 
	},
	timeline3:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline4:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage5Data = {
	info:{
		id:'npcAttPage5',
		description:'How do you play a game?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page5Time0:{
		self:{Speak:{speech:'On each floor, there will be various hardware consoles such as arcade cabinets which act the games menu toggle.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'Click on one to bring up the menu where you can read all about what the game is, controls, high scores as well as load it.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'When you load a game, you are jumping into the game world via the console.'}}, 
	},
	timeline3:{
		self:{Speak:{speech:'Each game world can have its own set of rules, control layouts, objectives, high scores, etc...'}}, 
	},
	timeline4:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline5:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage6Data = {
	info:{
		id:'npcAttPage6',
		description:'When will more games be added?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page6Time0:{
		self:{Speak:{speech:'For the month of October, a focus on Spooky games and experiences is the priority.'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'Next month will see experiments with Rollercoasters, using the engines new Physics access to create attractions, games and more.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'Check back often for new updates or follow one of Minty Crisps channels to stay up to date.'}}, 
	},
	timeline3:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline4:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttPage7Data = {
	info:{
		id:'npcAttPage7',
		description:'Is this free to play?',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	page7Time0:{
		self:{Speak:{speech:'Mintys XRcade is currently totally free to play. Built by Minty Crisp and shared with the world!'}}, 
	},
	timeline1:{
		self:{Speak:{speech:'If you enjoy the product and can afford to donate however, anything would be greatly appreciated.'}}, 
	},
	timeline2:{
		self:{Speak:{speech:'You can find out how to contribute and more at mintycrisp.com or within the arcades sponsor/token machines for a link to donation portals.'}}, 
	},
	timeline3:{
		self:{
			Speak:{speech:'The site does use a Zesty Billboard Ad in addition for monetization, however we have yet to book a client.'},
		}, 
	},
	timeline4:{
		self:{
			Speak:{speech:'So if you are interested in advertising via Zesty, we are on the marketplace or if you are interested in other advertising, please contact Minty Crisp.'},
		}, 
	},
	timeline5:{
		self:{
			Speak:{speech:'Any more questions?'},
		}, 
	},
	timeline4:{
		self: {BackwardJump: {page: 'page0', timeline: 'topics'},},
	},
};
auxl.npcAttIdleData = {
	info:{
		id:'npcAttIdleData',
		description:'Attendant idle speech.',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Yo ho ho ho and a bottle of rum for me...'}},
	},
	timeline1:{
		self:{Speak:{speech:'Ooh a piece of candy!'}},
	},
	timeline1:{
		self:{Speak:{speech:'Nom nom nom nom.....'}},
	},
	timeline3:{
		self: {IdleReset: true},
	},
};
auxl.npcAttBookData = {
	info:{
		id:'npcAtt',
		name: 'Att',
		description:'XRcade Attendant',
		tags:'npc',
		timeline: 'linear',
		idleDelay: 7000,
		idleInterval: 10000,
		offset: new THREE.Vector3(0.5,0.25,0.25),
	},
	pages:{
		page0: auxl.npcAttPage0Data,
		page1: auxl.npcAttPage1Data,
		page2: auxl.npcAttPage2Data,
		page3: auxl.npcAttPage3Data,
		page4: auxl.npcAttPage4Data,
		page5: auxl.npcAttPage5Data,
		page6: auxl.npcAttPage6Data,
		page7: auxl.npcAttPage7Data,
	},
	idle:{
		page0: auxl.npcAttIdleData,
	},
};
//Bubble
auxl.attBubbleParentData = {
data:'attBubbleParentData',
id:'attBubbleParent',
sources:false,
text: {value:'... ... ...', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.1, zOffset: 0.025, side: 'front', wrapCount: 30, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 1.15, height: 0.4},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0,0.6,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.attBubbleParent = auxl.Core(auxl.attBubbleParentData);
//Speech Close
auxl.attBubbleCloseData = {
data:'attBubbleCloseData',
id:'attBubbleClose',
sources:false,
text: {value:'X', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.12, height: 0.12},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.7,0.08,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.attBubbleClose = auxl.Core(auxl.attBubbleCloseData);
//Speech Reset
auxl.attBubbleResetData = {
data:'attBubbleResetData',
id:'attBubbleReset',
sources:false,
text: {value:'@', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.025, side: 'front', wrapCount: 2, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.025, width: 0.12, height: 0.12},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(0.7,-0.06,-0.05),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.01,0.01,0.01),
animations: {
loadin: {property: 'scale', from: new THREE.Vector3(0.01,0.01,0.01), to: new THREE.Vector3(1,1,1), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadin'},
loadout: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.01,0.01,0.01), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loadout'},

hoveron: {property: 'text.color', to: '#000000', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
hoveroff: {property: 'text.color', to: '#ffffff', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.attBubbleReset = auxl.Core(auxl.attBubbleResetData);
//Comp Bubble Layer
auxl.attBubbleLayerData = {
	parent: {core: auxl.attBubbleParent}, 
	child0: {core: auxl.attBubbleClose}, 
	child1: {core: auxl.attBubbleReset}, 
}
auxl.attBubbleLayer = auxl.Layer('attBubbleLayer',auxl.attBubbleLayerData);
//NPC
auxl.npcAtt = auxl.NPC('npcAtt', auxl.npcAttRig, auxl.npcAttBookData, auxl.attBubbleLayer, true);
 

//
//Companion Additions

//
//Companion Menu Style
auxl.menuStyleData = {
data:'menuStyleData',
id:'menuStyle',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#2694ce", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#2694ce", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
hoveron:{property: 'components.material.material.emissiveIntensity', from: 0.4, to: 0.6, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},

hoveroff:{property: 'components.material.material.emissiveIntensity', from: 0.6, to: 0.4, dur: 125, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},

click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};

//
//Companion Menu Additions
//Main Menu Additions
auxl.addToMainMenu = {
	menu3: {
		id: 'backgroundMusic',
		style: false,
		title: 'Music',
		description: 'Toggle background audio',
		subMenu: false,
		action: {
			auxlObj: 'auxl',
			component: false,
			method: 'ToggleBackgroundAudio',
			params: '',
			menu: 'stay',
		},
	},
};

//
//More Companion Shapes

//
//Pac-Man
auxl.compManParentData = {
data:'compManParentData',
id:'compManParent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compManParent = auxl.Core(auxl.compManParentData);
auxl.compManData = {
data:'compManData',
id:'compMan',
sources: false,
text: false,
geometry: {primitive: 'cylinder', height:0.225, radius:0.325, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:225, thetaLength:270},
material: {shader: "standard", color: "#f2f603", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#f2f603", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,90,90),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compMan = auxl.Core(auxl.compManData);
auxl.compManLayerData = {
	parent: {core: auxl.compManParent},
	child0: {core: auxl.compMan}, 
}
auxl.compManLayer = auxl.Layer('compManLayer',auxl.compManLayerData);
auxl.comp.AddAvatar('Pac Man','compManLayer');

//
//Snow Man
auxl.compShape1ParentData = {
data:'compShape1ParentData',
id:'compShape1Parent',
sources:false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
auxl.compShape1Parent = auxl.Core(auxl.compShape1ParentData);
auxl.compShape1Data = {
data:'compShape1Data',
id:'compShape1',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 0.25,},
material: {shader: "standard", color: "#d6d6d6", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#d6d6d6", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,-0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1 = auxl.Core(auxl.compShape1Data);
auxl.compShape1aData = {
data:'compShape1aData',
id:'compShape1a',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 0.2,},
material: {shader: "standard", color: "#d6d6d6", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#d6d6d6", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,-0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1a = auxl.Core(auxl.compShape1aData);
auxl.compShape1bData = {
data:'compShape1bData',
id:'compShape1b',
sources:false,
text: false,
geometry: {primitive: 'sphere', radius: 0.15,},
material: {shader: "standard", color: "#d6d6d6", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#d6d6d6", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1b = auxl.Core(auxl.compShape1bData);
auxl.compShape1b1Data = {
data:'compShape1b1Data',
id:'compShape1b1',
sources:false,
text: false,
geometry: {primitive: 'cylinder', height:0.04, radius:0.04, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#4b4848", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4b4848", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(-0.075,0.025,0.15),
rotation: new THREE.Vector3(0,90,90),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1b1 = auxl.Core(auxl.compShape1b1Data);
auxl.compShape1b2Data = {
data:'compShape1b2Data',
id:'compShape1b2',
sources:false,
text: false,
geometry: {primitive: 'cylinder', height:0.04, radius:0.04, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#4b4848", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4b4848", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.075,0.025,0.15),
rotation: new THREE.Vector3(0,90,90),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1b2 = auxl.Core(auxl.compShape1b2Data);
auxl.compShape1b3Data = {
data:'compShape1b3Data',
id:'compShape1b3',
sources:false,
text: false,
geometry: {primitive: 'cone', height:0.04, radiusBottom:0.04, radiusTop: 0, segmentsHeight:2, segmentsRadial:32, openEnded:false, side:'double', thetaStart:0, thetaLength:360},
material: {shader: "standard", color: "#e29c00", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#e29c00", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,-0.025,0.15),
rotation: new THREE.Vector3(0,90,90),
scale: new THREE.Vector3(1,1,1),
animations:false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.compShape1b3 = auxl.Core(auxl.compShape1b3Data);
auxl.compShape1LayerData = {
	parent: {core: auxl.compShape1Parent},
	child0: {core: auxl.compShape1}, 
	child1: {core: auxl.compShape1a}, 
	child2: {
		parent: {core: auxl.compShape1b},
		child0: {core: auxl.compShape1b1}, 
		child1: {core: auxl.compShape1b2},
		child2: {core: auxl.compShape1b3},
	},
}
auxl.compShape1Layer = auxl.Layer('compShape1Layer',auxl.compShape1LayerData);
auxl.comp.AddAvatar('Snow Man','compShape1Layer');

//
//Companion Speech
//Comp Book
auxl.compCadePage0Data = {
	info:{
		id:'compCadePage0',
		description:'Companion page 0.',
		tags:'comp',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{Speak:{speech:'Hello! I am your attendant, open my menu to see everything I can do for you.'},},
	},
	timeline1:{
		self:{Speak:{speech:'Use the assigned button or click on the your floor compass to toggle me.'},},
	},
	timeline2:{
		self:{Speak:{speech:'Check out each named arcade cabinet for a game to play.'},},
	},
	timeline3:{
		self:{Speak:{speech:'Your top 5 High Scores for each game are recorded. Use the HTML menu to reset them if you need.'},},
	},
	timeline4:{
		self:{Speak:{speech:'For more nostalgic styles, you can change the carpet with a few classic options on the back wall.'},},
	},
	timeline5:{
		self:{Speak:{speech:'Check back often for more games!'},},
	},
	timeline6:{
		self:{Speak:{speech:'Interested in supporting Mintys XRcade development?'},},
	},
	timeline7:{
		self:{Speak:{speech:'There are various ways you can help, view them all at mintycrisp.com or mintyxr.com .'},},
	},
	timeline8:{
		self:{Speak:{speech:'Mintys XRcade is made for Web XR. You can play on Desktop, Mobile and in VR!'},},
	},
	timeline9:{
		self:{Speak:{speech:'XRcade is built with AUXL (A-Frame UX Library). An engine built on top of the excellent XR renderer A-Frame.'},},
	},
	timeline10:{
		self: {ResetBook: true},
	},
};
auxl.compCadeIdleData = {
	info:{
		id:'compCadeIdleData',
		description:'Companion idle page.',
		tags:'comp',
		nextPage: null,
		prevPage: null,
		timeline:'random',
	},
	timeline0:{
		self:{Speak:{speech:'How good are your memory skills? Play the Memory Order game to test yourself.'}},
	},
	timeline1:{
		self:{Speak:{speech:'Do you have a quick hand? See how quick with the Swipe Launch game.'}},
	},
	timeline2:{
		self:{Speak:{speech:'Have an eye for distance? Use your skills progress through the Guess Hit game.'}},
	},
	timeline3:{
		self:{Speak:{speech:'Do you have fast reflexes? Test your speed with an onslaught of targets with Drag Diffuse.'}},
	},
	timeline4:{
		self:{Speak:{speech:'Fancy yourself a quick shot? Try the Sharp Shooter game to see!'}},
	},
	timeline5:{
		self:{Speak:{speech:'Can you find the right shape in Perfect Scale? Tweak them till you find it!'}},
	},
	timeline6:{
		self:{Speak:{speech:'You may have a quick response time once, but how well can you do with 7 average chances?'}},
	},
	timeline7:{
		self:{Speak:{speech:'Tap it, Swipe it, Double Tap it or Drag it! Can you keep up?'}},
	},
	timeline8:{
		self:{Speak:{speech:'Call yourself a collector? Collect as many as you can in Pop Pop!'}},
	},
	timeline9:{
		self:{Speak:{speech:'Can you withstand the onslaught? Stun and Slash to protect yourself and see how long you can last.'}},
	},
	timeline10:{
		self:{Speak:{speech:'Your top 5 High Scores for each game are recorded. Use the HTML menu to reset them if you need.'},},
	},
	timeline11:{
		self:{Speak:{speech:'For more nostalgic styles, you can change the carpet with a few classic options on the back wall.'},},
	},
	timeline12:{
		self:{Speak:{speech:'Check back often for more games!'},},
	},
	timeline13:{
		self:{Speak:{speech:'Interested in supporting Mintys XRcade development?'},},
	},
	timeline14:{
		self:{Speak:{speech:'There are various ways you can help, view them all at mintycrisp.com or mintyxr.com .'},},
	},
	timeline15:{
		self:{Speak:{speech:'Mintys XRcade is made for Web XR. You can play on Desktop, Mobile and in VR!'},},
	},
	timeline16:{
		self:{Speak:{speech:'XRcade is built with AUXL (A-Frame UX Library). An engine built on top of the excellent XR renderer A-Frame.'},},
	},
	timeline11:{
		self: {IdleReset: true},
	},
};
auxl.compCadeBookData = {
	info:{
		id:'compCadeBook',
		name: 'Comp',
		description:'Companion book.',
		tags:'comp',
		timeline: 'other',
		idleDelay: 5000,
		idleInterval: 8000,
	},
	pages:{
		page0: auxl.compCadePage0Data,
	},
	idle:{
		page0: auxl.compCadeIdleData,
	},
};

//
//Custom Scene Functions

//Carpet Changes Buttons
auxl.changeCarpetTexture = (style) => {
	//Floor is reused everywhere, clear previous material if so
	let clear = auxl.xrcadeFloor.GetEl().getAttribute('material');
	if(clear && clear.shader !== 'flat'){auxl.floor.RemoveComponent('material')}
	
	auxl.xrcadeFloor.ChangeSelf({property: 'material', value:{shader: 'flat', side: 'front', src: auxl[style], repeat: auxl.xrcadeFloor.core.material.repeat}}, true)
	auxl.dividerEast.ChangeSelf({property: 'material', value:{shader: 'flat', src: auxl[style], repeat: auxl.dividerEast.core.material.repeat}}, true)
	auxl.dividerWest.ChangeSelf({property: 'material', value:{shader: 'flat', src: auxl[style], repeat: auxl.dividerWest.core.material.repeat}}, true)
	auxl.dividerNorth.ChangeSelf({property: 'material', value:{shader: 'flat', src: auxl[style], repeat: auxl.dividerNorth.core.material.repeat}}, true)
	auxl.dividerSouth.ChangeSelf({property: 'material', value:{shader: 'flat', src: auxl[style], repeat: auxl.dividerSouth.core.material.repeat}}, true)
}

//JukeBox Controls
//Update Text
auxl.UpdateBackgroundToggleText = () => {
	if(auxl.backgroundAudio){
		auxl.jukeBoxAudioToggle.ChangeSelf({property: 'text', value:{value: 'Disable Background Audio'}});
	} else {
		auxl.jukeBoxAudioToggle.ChangeSelf({property: 'text', value:{value: 'Enable Background Audio'}});
	}
	//Workaround to ensure toggled spawn of option is removed on scene swap
	auxl.SpawnTracker('jukeBoxAudioToggle', 'node');
}
//Toggle Text
auxl.ToggleBackgroundAudioText = () => {
	if(auxl.backgroundAudio){
		auxl.jukeBoxAudioToggle.ChangeSelf({property: 'text', value:{value: 'Disable Background Audio'}});
	} else {
		auxl.jukeBoxAudioToggle.ChangeSelf({property: 'text', value:{value: 'Enable Background Audio'}});
	}
}

//Enable Lightning Rain Storm Weather
auxl.WeatherControls = () => {

	let weather = {};
	weather.id = 'atmos';

	//Spawn Weather
	const SpawnWeather = () => {
		auxl.sceneEl.setAttribute('rain', {density: 20})
		auxl.sceneEl.setAttribute('lightningbolt', true)
	}
	//Despawn Weather
	const DespawnWeather = () => {
		auxl.sceneEl.removeAttribute('rain');
		auxl.sceneEl.removeAttribute('lightningbolt');
	}

	return {weather, SpawnWeather, DespawnWeather}
}
auxl.atmos = auxl.WeatherControls();




//New
/*
auxl.emoticonTesting = auxl.InfoBubble('emoticonTesting', auxl.coreEventTesting, false, 'yellow');
auxl.emoticonTesting.NewBubble({
emote: true,
text: '$_$',
eventName: 'emote10',
rotation: false,
});
auxl.emoticonTesting.NewBubble({
alert: true,
text: '$_$',
eventName: 'alert10',
rotation: false,
});

auxl.emoticonTesting = auxl.InfoBubble('emoticonTesting', auxl.coreEventTesting, false, 'yellow');
coreEventTesting:{EmitEvent:'alert1'},

*/

//#rebuild
//Build Scene Library Objects - Re-add all objGen declerations
auxl.buildXRcadeLibrary = () => {
	auxl.skyGrad1 = auxl.Core(auxl.skyGrad1Data);
	auxl.skyBox1 = auxl.SkyBox(auxl.skyBox1Data);
	auxl.carpetChange1 = auxl.Core(auxl.carpetChange1Data);
	auxl.carpetChange2 = auxl.Core(auxl.carpetChange2Data);
	auxl.carpetChange3 = auxl.Core(auxl.carpetChange3Data);
	auxl.carpetChange4 = auxl.Core(auxl.carpetChange4Data);
	auxl.carpetChange5 = auxl.Core(auxl.carpetChange5Data);
	auxl.carpetChange6 = auxl.Core(auxl.carpetChange6Data);
	auxl.mtnFloor = auxl.Core(auxl.mtnFloorData);
	auxl.jukeBox = auxl.Core(auxl.jukeBoxData);
	auxl.jukeBoxAudioToggle = auxl.Core(auxl.jukeBoxAudioToggleData);
	auxl.token = auxl.Core(auxl.tokenData);
	//auxl.sponsor1 = auxl.Core(auxl.sponsor1Data);
	auxl.wavesSign = auxl.Core(auxl.wavesSignData);
	auxl.heartsSign = auxl.Core(auxl.heartsSignData);
	auxl.heartLineSign = auxl.Core(auxl.heartLineSignData);
	auxl.treeSign = auxl.Core(auxl.treeSignData);
	auxl.ivxSign = auxl.Core(auxl.ivxSignData);
	auxl.cadeSign1 = auxl.Core(auxl.cadeSignData);
	auxl.cadeSign2 = auxl.Core(auxl.cadeSign2Data);
	auxl.signSpinner = auxl.Core(auxl.signSpinnerData);
	auxl.cadeSignSpinner = auxl.Layer('cadeSignSpinner', auxl.cadeSignSpinnerData);
	auxl.treeLineSign = auxl.Core(auxl.treeLineSignData);
	auxl.ivxLineSign = auxl.Core(auxl.ivxLineSignData);
	auxl.waveLineSign = auxl.Core(auxl.waveLineSignData);
	auxl.cadeCab = auxl.Core(auxl.cadeCabData);
	auxl.cabTitle = auxl.Core(auxl.cabTitleData);
	auxl.cabLayer = auxl.Layer('cabLayer', auxl.cabLayerData);
	auxl.compManLayer = auxl.Layer('compManLayer',auxl.compManLayerData);
	auxl.comp.AddAvatar('Pac Man','compManLayer');
	auxl.compShape1Parent = auxl.Core(auxl.compShape1ParentData);
	auxl.compShape1 = auxl.Core(auxl.compShape1Data);
	auxl.compShape1a = auxl.Core(auxl.compShape1aData);
	auxl.compShape1b = auxl.Core(auxl.compShape1bData);
	auxl.compShape1b1 = auxl.Core(auxl.compShape1b1Data);
	auxl.compShape1b2 = auxl.Core(auxl.compShape1b2Data);
	auxl.compShape1b3 = auxl.Core(auxl.compShape1b3Data);
	auxl.compShape1Layer = auxl.Layer('compShape1Layer',auxl.compShape1LayerData);
	auxl.comp.AddAvatar('Snow Man','compShape1Layer');
	//Left
	//Cab 1
	auxl.cadeCab1Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab1Layer', {rotation: new THREE.Vector3(0,90,0), components:{['gltf-model']:'./assets/3d/XRcade/cabinet.glb', gltfmat: {colors:['random', 'random', 'random', 'random', 'random', 'white', 'random', 'random', 'random', 'random'], textures:[false, false, false, false, false, auxl.game1Preview,],}, hovertext:{value: 'Ready?\nPlayer One', hover: 'top', offset: 5, twist: true,},},}, {grid: {start:{x:-5.5, y:0, z:-7.5}, end: {x:-4, y:0, z:-6}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab1Layer.layer.all.child0.core.core.text.value = 'Memory Order';
	//Cab 2
	auxl.cadeCab2Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab2Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-9}, end: {x:-4, y:0, z:-7.5}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab2Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game2Preview,]};
	auxl.cadeCab2Layer.layer.all.child0.core.core.text.value = 'Swipe Launch';
	//Cab 3
	auxl.cadeCab3Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab3Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-10.5}, end: {x:-4, y:0, z:-9}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab3Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game3Preview,]};
	auxl.cadeCab3Layer.layer.all.child0.core.core.text.value = 'Guess Hit';
	//Cab 4
	auxl.cadeCab4Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab4Layer', {rotation: new THREE.Vector3(0,90,0)}, {grid: {start:{x:-5.5, y:0, z:-12}, end: {x:-4, y:0, z:-10.5}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab4Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game4Preview,]};
	auxl.cadeCab4Layer.layer.all.child0.core.core.text.value = 'Drag Diffuse';
	//Cab 5
	auxl.cadeCab5Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab5Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-3, y:0, z:-14.5}, end: {x:-1.5, y:0, z:-13}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab5Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game5Preview,]};
	auxl.cadeCab5Layer.layer.all.child0.core.core.text.value = 'Sharp Shooter';
	//Cab 6
	auxl.cadeCab6Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab6Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:-1.5, y:0, z:-14.5}, end: {x:0, y:0, z:-13}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab6Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game6Preview,]};
	auxl.cadeCab6Layer.layer.all.child0.core.core.text.value = 'Perfect Scale';
	//Cab 7
	auxl.cadeCab7Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab7Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:0, y:0, z:-14.5}, end: {x:1.5, y:0, z:-13}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab7Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game7Preview,]};
	auxl.cadeCab7Layer.layer.all.child0.core.core.text.value = 'Reflex 7';
	//Cab 8
	auxl.cadeCab8Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab8Layer', {rotation: new THREE.Vector3(0,0,0)}, {grid: {start:{x:1.5, y:0, z:-14.5}, end: {x:3, y:0, z:-13}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab8Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game8Preview,]};
	auxl.cadeCab8Layer.layer.all.child0.core.core.text.value = 'Tap It';
	//Cab 9
	auxl.cadeCab9Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab9Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-12}, end: {x:5.5, y:0, z:-10.5}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab9Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game9Preview,]};
	auxl.cadeCab9Layer.layer.all.child0.core.core.text.value = 'Pop Pop';
	//Cab 10
	auxl.cadeCab10Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab10Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-10.5}, end: {x:5.5, y:0, z:-9}, yOffset: 0, collide: true}}, true);
	auxl.cadeCab10Layer.layer.all.parent.core.core.components.gltfmat = {colors:['random','random','random','random','random','white','random','random','random','random'], textures:[false, false, false, false, false, auxl.game10Preview,]};
	auxl.cadeCab10Layer.layer.all.child0.core.core.text.value = 'Horde Halt';
	//Cab 11
	auxl.cadeCab11Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab11Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-9}, end: {x:5.5, y:0, z:-7.5}, yOffset: 0, collide: true}}, true);
	//Cab 12
	auxl.cadeCab12Layer = auxl.LayerFromTemplate(auxl.cabLayer, 'cadeCab12Layer', {rotation: new THREE.Vector3(0,-90,0)}, {grid: {start:{x:4, y:0, z:-7.5}, end: {x:5.5, y:0, z:-6}, yOffset: 0, collide: true}}, true);

	//Spooky
	auxl.skyGradSpooky = auxl.Core(auxl.skyGradSpookyData);
	auxl.moonEyes = auxl.Core(auxl.moonEyesData);
	auxl.skyBoxSpooky = auxl.SkyBox(auxl.skyBoxSpookyData);
	auxl.SpookySkyBoxSpawnFix = auxl.SkyBoxSpawnFix();
	auxl.spookyToEntrance = auxl.Core(auxl.spookyToEntranceData);
	auxl.spookyToExterior = auxl.Core(auxl.spookyToExteriorData);
	auxl.spookyToExteriorEmote = auxl.InfoBubble('spookyToExteriorEmote', auxl.spookyToExterior, 3, 'orange');
	auxl.spookyToExteriorBlock = auxl.Core(auxl.spookyToExteriorBlockData);
	auxl.exteriorToSpooky = auxl.Core(auxl.exteriorToSpookyData);
	auxl.exteriorToSpookyEmote = auxl.InfoBubble('exteriorToSpookyEmote', auxl.exteriorToSpooky, 3, 'orange');
	auxl.exteriorRoom0Block = auxl.Core(auxl.exteriorRoom0BlockData);
	auxl.exteriorToRoom1 = auxl.Core(auxl.exteriorToRoom1Data);
	auxl.exteriorToRoom1Emote = auxl.InfoBubble('exteriorToRoom1Emote', auxl.exteriorToRoom1, 3, 'yellow');
	auxl.exteriorRoom1Block = auxl.Core(auxl.exteriorRoom1BlockData);
	auxl.exteriorToRoom2 = auxl.Core(auxl.exteriorToRoom2Data);
	auxl.exteriorToRoom2Emote = auxl.InfoBubble('exteriorToRoom2Emote', auxl.exteriorToRoom2, 3, 'orange');
	auxl.exteriorRoom2Block = auxl.Core(auxl.exteriorRoom2BlockData);
	auxl.exteriorToRoom3 = auxl.Core(auxl.exteriorToRoom3Data);
	auxl.exteriorToRoom3Emote = auxl.InfoBubble('exteriorToRoom3Emote', auxl.exteriorToRoom3, 3, 'red');
	auxl.exteriorRoom3Block = auxl.Core(auxl.exteriorRoom3BlockData);
	auxl.jackoSign = auxl.Core(auxl.jackoSignData);
	auxl.ghostSign = auxl.Core(auxl.ghostSignData);
	auxl.batsSign = auxl.Core(auxl.batsSignData);
	auxl.spookyFloor = auxl.Core(auxl.spookyFloorData);
	auxl.spookyHills = auxl.Horizon(auxl.spookyHillsData);
	auxl.hallowGridDoors = auxl.GridLayout(auxl.hallowGridDoorsData);
	auxl.hallowGridFencesX = auxl.GridLayout(auxl.hallowGridFencesXData);
	auxl.hallowGridFencesZ = auxl.GridLayout(auxl.hallowGridFencesZData);
	auxl.hallowGridGraves = auxl.GridLayout(auxl.hallowGridGravesData);
	auxl.hallowGridGravesAlt = auxl.GridLayout(auxl.hallowGridGravesAltData);
	auxl.hallowGridAltGraves = auxl.GridLayout(auxl.hallowGridAltGravesData);
	auxl.hallowGridTrees = auxl.GridLayout(auxl.hallowGridTreesData);
	auxl.hallowGridSkullTrees = auxl.GridLayout(auxl.hallowGridSkullTreesData);
	auxl.hallowGridDeco = auxl.GridLayout(auxl.hallowGridDecoData);
	auxl.hallowGridJackos = auxl.GridLayout(auxl.hallowGridJackosData);
	auxl.hallowGridTallDeco = auxl.GridLayout(auxl.hallowGridTallDecoData);
	auxl.spookyBenchDecorated1 = auxl.Core(auxl.spookyBenchDecorated1Data);
	auxl.spookyBenchDecorated2 = auxl.Core(auxl.spookyBenchDecorated2Data);
	auxl.spookyBenchDecorated3 = auxl.Core(auxl.spookyBenchDecorated3Data);
	auxl.spookyBenchDecorated4 = auxl.Core(auxl.spookyBenchDecorated4Data);
	auxl.innerRing1 = auxl.ObjsGenRing(auxl.innerRing1Data);
	auxl.innerRing2 = auxl.ObjsGenRing(auxl.innerRing2Data);
	auxl.innerRing3 = auxl.ObjsGenRing(auxl.innerRing3Data);
	auxl.innerRing4 = auxl.ObjsGenRing(auxl.innerRing4Data);
	auxl.spookyRoom1Ext = auxl.Core(auxl.spookyRoom1ExtData);
	auxl.room1ToExterior = auxl.Core(auxl.room1ToExteriorData);
	auxl.room1ToRoom1Alt = auxl.Core(auxl.room1ToRoom1AltData);
	auxl.spookyRoom1AltBlock = auxl.Core(auxl.spookyRoom1AltBlockData);
	auxl.spookyRoom1Floor = auxl.Core(auxl.spookyRoom1FloorData);
	auxl.spookyRoom1AltFloor = auxl.Core(auxl.spookyRoom1AltFloorData);
	auxl.spookyRoom1Ceiling = auxl.Core(auxl.spookyRoom1CeilingData);
	auxl.spookyRoom1AltCeiling = auxl.Core(auxl.spookyRoom1AltCeilingData);
	auxl.spookyRoom1Wall0 = auxl.Core(auxl.spookyRoom1Wall0Data);
	auxl.spookyRoom1Wall1 = auxl.Core(auxl.spookyRoom1Wall1Data);
	auxl.spookyRoom1Wall2 = auxl.Core(auxl.spookyRoom1Wall2Data);
	auxl.spookyRoom1Wall3 = auxl.Core(auxl.spookyRoom1Wall3Data);
	auxl.room1AltHorizon = auxl.Horizon(auxl.room1AltHorizonData);
	auxl.spookyRoom1Rug = auxl.Core(auxl.spookyRoom1RugData);
	auxl.room1Door1 = auxl.Core(auxl.room1Door1Data);
	auxl.room1Door2 = auxl.Core(auxl.room1Door2Data);
	auxl.room1Door3 = auxl.Core(auxl.room1Door3Data);
	auxl.room1Door4 = auxl.Core(auxl.room1Door4Data);
	auxl.room1Door5 = auxl.Core(auxl.room1Door5Data);
	auxl.room1Door6 = auxl.Core(auxl.room1Door6Data);
	auxl.room1Door7 = auxl.Core(auxl.room1Door7Data);
	auxl.room1AltDoor = auxl.Core(auxl.room1AltDoorData);
	auxl.room1TablesGrid = auxl.GridLayout(auxl.room1TablesGridData);
	auxl.spookyRoom1Painting1 = auxl.Core(auxl.spookyRoom1Painting1Data);
	auxl.spookyRoom1Painting2 = auxl.Core(auxl.spookyRoom1Painting2Data);
	auxl.spookyRoom1Painting3 = auxl.Core(auxl.spookyRoom1Painting3Data);
	auxl.spookyRoom1Painting4 = auxl.Core(auxl.spookyRoom1Painting4Data);
	auxl.spookyRoom1Painting5 = auxl.Core(auxl.spookyRoom1Painting5Data);
	auxl.spookyRoom1Painting6 = auxl.Core(auxl.spookyRoom1Painting6Data);
	auxl.spookyRoom1Painting7 = auxl.Core(auxl.spookyRoom1Painting7Data);
	auxl.spookyRoom1Painting8 = auxl.Core(auxl.spookyRoom1Painting8Data);
	auxl.spookyRoom1Painting9 = auxl.Core(auxl.spookyRoom1Painting9Data);
	auxl.spookyRoom1Painting10 = auxl.Core(auxl.spookyRoom1Painting10Data);
	auxl.spookyRoom1Painting11 = auxl.Core(auxl.spookyRoom1Painting11Data);
	auxl.spookyRoom1Painting12 = auxl.Core(auxl.spookyRoom1Painting12Data);
	auxl.spookyRoom1Painting13 = auxl.Core(auxl.spookyRoom1Painting13Data);
	auxl.spookyRoom1Jump1 = auxl.Core(auxl.spookyRoom1Jump1Data);
	auxl.spookyRoom1Light1 = auxl.Core(auxl.spookyRoom1Light1Data);
	auxl.spookyRoom1Light0 = auxl.Core(auxl.spookyRoom1Light0Data);
	auxl.spookyRoom1Light2 = auxl.Core(auxl.spookyRoom1Light2Data);
	auxl.spookyRoom1Light3 = auxl.Core(auxl.spookyRoom1Light3Data);
	auxl.spookyRoom1Light4 = auxl.Core(auxl.spookyRoom1Light4Data);
	auxl.spookyRoom1Light5 = auxl.Core(auxl.spookyRoom1Light5Data);
	auxl.spookyRoom1Light6 = auxl.Core(auxl.spookyRoom1Light6Data);
	auxl.spookyRoom1Light7 = auxl.Core(auxl.spookyRoom1Light7Data);
	auxl.spookyRoom1Light2Trigger = auxl.Core(auxl.spookyRoom1Light2TriggerData);
	auxl.spookyRoom1Light4Trigger = auxl.Core(auxl.spookyRoom1Light4TriggerData);
	auxl.spookyRoom2Ext = auxl.Core(auxl.spookyRoom2ExtData);
	auxl.spookyRoom2Floor = auxl.Core(auxl.spookyRoom2FloorData);
	auxl.spookyRoom2Ceiling = auxl.Core(auxl.spookyRoom2CeilingData);
	auxl.spookyRoom2North = auxl.Core(auxl.spookyRoom2NorthData);
	auxl.spookyRoom2South = auxl.Core(auxl.spookyRoom2SouthData);
	auxl.spookyRoom2West = auxl.Core(auxl.spookyRoom2WestData);
	auxl.spookyRoom2East = auxl.Core(auxl.spookyRoom2EastData);
	auxl.spookyRoom2Basement = auxl.Core(auxl.spookyRoom2BasementData);
	auxl.room2ToExteriorDoor = auxl.Core(auxl.room2ToExteriorDoorData);
	auxl.kayKitArmchairPillows = auxl.Core(auxl.kayKitArmchairPillowsData);
	auxl.kayKitBedSingleA = auxl.Core(auxl.kayKitBedSingleAData);
	auxl.kayKitCabinetMediumDecorated = auxl.Core(auxl.kayKitCabinetMediumDecoratedData);
	auxl.kayKitCabinetSmall = auxl.Core(auxl.kayKitCabinetSmallData);
	auxl.kayKitCabinetSmallDecorated = auxl.Core(auxl.kayKitCabinetSmallDecoratedData);
	auxl.kayKitCactusMediumA = auxl.Core(auxl.kayKitCactusMediumAData);
	auxl.kayKitChairStool = auxl.Core(auxl.kayKitChairStoolData);
	auxl.kayKitLampStanding = auxl.Core(auxl.kayKitLampStandingData);
	auxl.kayKitRugOvalA = auxl.Core(auxl.kayKitRugOvalAData);
	auxl.kayKitShelfBLargeDecorated = auxl.Core(auxl.kayKitShelfBLargeDecoratedData);
	auxl.grid2x05 = auxl.Core(auxl.grid2x05Data);
	auxl.spookyRoom2Blood1 = auxl.Core(auxl.spookyRoom2Blood1Data);
	auxl.spookyRoom2Blood2 = auxl.Core(auxl.spookyRoom2Blood2Data);
	auxl.spookyRoom2Blood3 = auxl.Core(auxl.spookyRoom2Blood3Data);
	auxl.spookyRoom2Blood4 = auxl.Core(auxl.spookyRoom2Blood4Data);
	auxl.Room2Trap = auxl.Room2TrapSetup();
	auxl.room3ToExteriorDoor = auxl.Core(auxl.room3ToExteriorDoorData);
	auxl.spookyRoom3Ext = auxl.Core(auxl.spookyRoom3ExtData);
	auxl.room2Block1Grid = auxl.GridLayout(auxl.room2Block1GridData);
	auxl.room2Block2Grid = auxl.GridLayout(auxl.room2Block2GridData);
	auxl.room2Block3Grid = auxl.GridLayout(auxl.room2Block3GridData);
	auxl.block4Ring = auxl.ObjsGenRing(auxl.block4RingData);
	auxl.shark1Parent = auxl.Core(auxl.shark1ParentData);
	auxl.shark1 = auxl.Core(auxl.shark1Data);
	auxl.shark1Layer = auxl.Layer('shark1Layer',auxl.shark1LayerData);
	auxl.shark2Parent = auxl.Core(auxl.shark2ParentData);
	auxl.shark2 = auxl.Core(auxl.shark2Data);
	auxl.shark2Layer = auxl.Layer('shark2Layer',auxl.shark2LayerData);
	auxl.shark3Parent = auxl.Core(auxl.shark3ParentData);
	auxl.shark3 = auxl.Core(auxl.shark3Data);
	auxl.shark3Layer = auxl.Layer('shark3Layer',auxl.shark3LayerData);
	auxl.shark4Parent = auxl.Core(auxl.shark4ParentData);
	auxl.shark4 = auxl.Core(auxl.shark4Data);
	auxl.shark4Layer = auxl.Layer('shark4Layer',auxl.shark4LayerData);
	auxl.sharkMegaParent = auxl.Core(auxl.sharkMegaParentData);
	auxl.sharkMega = auxl.Core(auxl.sharkMegaData);
	auxl.sharkMegaLayer = auxl.Layer('sharkMegaLayer',auxl.sharkMegaLayerData);
	auxl.sharkMegaAttack = auxl.Core(auxl.sharkMegaAttackData);
	auxl.squid = auxl.Core(auxl.squidData);
	auxl.spookyRoom3Flare = auxl.Core(auxl.spookyRoom3FlareData);
	auxl.spookyRoom3FlareFire = auxl.Core(auxl.spookyRoom3FlareFireData);
	auxl.spookyRoom3FlareLight = auxl.Core(auxl.spookyRoom3FlareLightData);
	auxl.spookyRoom3FlareLayer = auxl.Layer('spookyRoom3FlareLayer',auxl.spookyRoom3FlareLayerData);
	auxl.spookyGhostLayer = auxl.Layer('spookyGhostLayer', auxl.spookyGhostLayerData);
}
auxl.ToBeRebuilt('buildXRcadeLibrary');

},
});

//xrcade-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('xrcade-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//World Atlas MapZones & NodeScenes

//
//Entrance Zone
auxl.entranceZoneData = {
	info:{
		id: 'entranceZone',
		name: 'Entrance Zone',
		zoneNum: 0,
		start: 'entranceHome',
		travelMenu: false,
		backgroundAudio: 'town3',
	},
	controls:{
	},
	start:{
		xrcadeWorld:{IfElse: {auxl:{cond: 'backgroundAudio',
		ifTrue: {
			xrcadeWorld:{MusicPlaylist: 'town3',},
		},ifFalse: {
			player:{Notification: 'fail',},
		},}}},
		skyBox1:{SpawnSkyBox: null},
		player:{UpdatePlayerPosition: new THREE.Vector3(0,0,-1), TwistTo: 0},
	},
	delay:{
		100:{
			skyBox1:{SetTime: 9},
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
//Home
auxl.entranceHomeData = {
	info:{
		id:'entranceHome',
		name: 'Entrance Home',
		description: 'Welcome to Minty&sbquo;s XR Land! This is the home area for all the zones.',
		sceneText: false,
		fog: false,
		map: {
			size: 120,
			height: {top: 2, bottom: 0},
			edge: false,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos:'other',
	},
	controls:{
	},
	start:{
		//Billboard Ad
		//sponsor1:{SpawnCore:null, ChangeSelf: {property: 'position', value: new THREE.Vector3(-5.5,6,1.74)}},
		//Bug workaround to ensure game menus are removed
		allGameMenus:{DespawnAllGameMenus:null},
		//Attendant
		npcAtt:{SpawnNPC:null},
		npcAttPodium:{SpawnCoreOnGrid:null},
		//Doorways
		entranceToFloor1:{SpawnCore:null},
		entranceToSpooky:{SpawnCoreOnGrid:null},
		//Floor
		xrcadeFloor:{SpawnCore:null,},
		carpetChange1:{SpawnCore:null},
		carpetChange2:{SpawnCore:null},
		carpetChange3:{SpawnCore:null},
		carpetChange4:{SpawnCore:null},
		carpetChange5:{SpawnCore:null},
		carpetChange6:{SpawnCore:null},
		//North
		wallNorthSeg1:{SpawnCoreOnGrid:null},
		wallNorthFrame1:{SpawnCoreOnGrid:null},
		wallNorthSeg2:{SpawnCoreOnGrid:null},
		wallNorthFrame2:{SpawnCoreOnGrid:null},
		wallNorthSeg3:{SpawnCoreOnGrid:null},
		//East
		wallEastSeg1:{SpawnCoreOnGrid:null},
		wallEastFrame1:{SpawnCoreOnGrid:null},
		wallEastSeg2:{SpawnCoreOnGrid:null},
		wallEastFrame2:{SpawnCoreOnGrid:null},
		wallEastSeg3:{SpawnCoreOnGrid:null},
		//South
		wallSouthTop:{SpawnCoreOnGrid:null},
		wallSouthPart1:{SpawnCoreOnGrid:null},
		wallSouthPart2:{SpawnCoreOnGrid:null},
		//West
		wallWestSeg1:{SpawnCoreOnGrid:null},
		wallWestFrame1:{SpawnCoreOnGrid:null},
		wallWestSeg2:{SpawnCoreOnGrid:null},
		wallWestFrame2:{SpawnCoreOnGrid:null},
		wallWestSeg3:{SpawnCoreOnGrid:null},
		//Wall Pilars
		wallPilar1:{SpawnCoreOnGrid:null},
		wallPilar2:{SpawnCoreOnGrid:null},
		wallPilar3:{SpawnCoreOnGrid:null},
		wallPilar4:{SpawnCoreOnGrid:null},
		//Inner Pilars
		InnerPilar1:{SpawnCoreOnGrid:null},
		InnerPilar2:{SpawnCoreOnGrid:null},
		InnerPilar3:{SpawnCoreOnGrid:null},
		InnerPilar4:{SpawnCoreOnGrid:null},
		//Dividers
		//dividerNorth:{SpawnCoreOnGrid:null},
		//dividerEast:{SpawnCoreOnGrid:null},
		//dividerSouth:{SpawnCoreOnGrid:null},
		//dividerWest:{SpawnCoreOnGrid:null},
		//Mini Menus
		jukeBox:{SpawnCoreOnGrid:null},
		token:{SpawnCoreOnGrid:null},
		//XRCade Sign
		cadeSignSpinner:{SpawnLayer:null},
		//North Wall
		ivxSign:{SpawnCore:null},
		ivxLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//East Wall
		treeSign:{SpawnCore:null},
		treeLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//South Wall
		heartsSign:{SpawnCore:null},
		heartLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#eddd23, #f4057c', emissives: '1,1'},},}, SpawnCore:null,},
		//West Wall
		wavesSign:{SpawnCore:null},
		waveLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//Wall Pilar Lines
		nwWallPilarLineEast:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		nwWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
	},
	delay:{
		1000:{
			entranceToSpooky:{EmitEvent:'alert1'},
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
//Build
auxl.entranceHome = auxl.SceneNode(auxl.entranceHomeData);
auxl.entranceZone = auxl.MapZone(auxl.entranceZoneData);

//
//XRcade Zone
auxl.xrcadeZoneData = {
	info:{
		id: 'xrcadeZone',
		name: 'XRcade Zone',
		zoneNum: 1,
		start: 'xrcadeHome',
		travelMenu: false,
		backgroundAudio: 'town3',
	},
	controls:{
	},
	start:{
		skyBox1:{SpawnSkyBox: null},
		player:{UpdatePlayerPosition: new THREE.Vector3(0,0,-1), TwistTo: 0},
	},
	delay:{
		100:{
			skyBox1:{SetTime: 6.45},
		},
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
		//allGameMenus:{DespawnAllGameMenus:null},
	},
};
//Home
auxl.xrcadeHomeData = {
	info:{
		id:'xrcadeHome',
		name: 'XRcade Home',
		description: 'Welcome to XRcade! This is the home area for all the games.',
		sceneText: false,
		fog: false,
		map: {
			size: 100,
			height: {top: 2, bottom: 0},
			edge: false,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos:'other',
	},
	controls:{
	},
	start:{
		//Billboard Ad
		//sponsor1:{SpawnCore:null, ChangeSelf: {property: 'position', value: new THREE.Vector3(-5.5,6,1.74)}},
		//Doorway
		floor1ToEntrance:{SpawnCore:null},
		//Floor
		xrcadeFloor:{SpawnCore:null},
		carpetChange1:{SpawnCore:null},
		carpetChange2:{SpawnCore:null},
		carpetChange3:{SpawnCore:null},
		carpetChange4:{SpawnCore:null},
		carpetChange5:{SpawnCore:null},
		carpetChange6:{SpawnCore:null},
		//North
		wallNorthSeg1:{SpawnCoreOnGrid:null},
		wallNorthFrame1:{SpawnCoreOnGrid:null},
		wallNorthSeg2:{SpawnCoreOnGrid:null},
		wallNorthFrame2:{SpawnCoreOnGrid:null},
		wallNorthSeg3:{SpawnCoreOnGrid:null},
		//East
		wallEastSeg1:{SpawnCoreOnGrid:null},
		wallEastFrame1:{SpawnCoreOnGrid:null},
		wallEastSeg2:{SpawnCoreOnGrid:null},
		wallEastFrame2:{SpawnCoreOnGrid:null},
		wallEastSeg3:{SpawnCoreOnGrid:null},
		//South
		wallSouthTop:{SpawnCoreOnGrid:null},
		wallSouthPart1:{SpawnCoreOnGrid:null},
		wallSouthPart2:{SpawnCoreOnGrid:null},
		//West
		wallWestSeg1:{SpawnCoreOnGrid:null},
		wallWestFrame1:{SpawnCoreOnGrid:null},
		wallWestSeg2:{SpawnCoreOnGrid:null},
		wallWestFrame2:{SpawnCoreOnGrid:null},
		wallWestSeg3:{SpawnCoreOnGrid:null},
		//Wall Pilars
		wallPilar1:{SpawnCoreOnGrid:null},
		wallPilar2:{SpawnCoreOnGrid:null},
		wallPilar3:{SpawnCoreOnGrid:null},
		wallPilar4:{SpawnCoreOnGrid:null},
		//Inner Pilars
		InnerPilar1:{SpawnCoreOnGrid:null},
		InnerPilar2:{SpawnCoreOnGrid:null},
		InnerPilar3:{SpawnCoreOnGrid:null},
		InnerPilar4:{SpawnCoreOnGrid:null},
		//Dividers
		dividerNorth:{SpawnCoreOnGrid:null},
		dividerEast:{SpawnCoreOnGrid:null},
		//dividerSouth:{SpawnCoreOnGrid:null},
		dividerWest:{SpawnCoreOnGrid:null},
		//Mini Menus
		jukeBox:{SpawnCoreOnGrid:null},
		token:{SpawnCoreOnGrid:null},
		//XRCade Sign
		cadeSignSpinner:{SpawnLayer:null},
		//North Wall
		ivxSign:{SpawnCore:null},
		ivxLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//East Wall
		treeSign:{SpawnCore:null},
		treeLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//South Wall
		heartsSign:{SpawnCore:null},
		heartLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#eddd23, #f4057c', emissives: '1,1'},},}, SpawnCore:null,},
		//West Wall
		wavesSign:{SpawnCore:null},
		waveLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//Wall Pilar Lines
		nwWallPilarLineEast:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		nwWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#16aa60, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#f4057c, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#05aaf4, #eddd23', emissives: '1,1'},},}, SpawnCore:null,},
		//Cabinets
		cadeCab1Layer:{SpawnLayerOnGrid:null},
		cadeCab2Layer:{SpawnLayerOnGrid:null},
		cadeCab3Layer:{SpawnLayerOnGrid:null},
		cadeCab4Layer:{SpawnLayerOnGrid:null},
		cadeCab5Layer:{SpawnLayerOnGrid:null},
		cadeCab6Layer:{SpawnLayerOnGrid:null},
		cadeCab7Layer:{SpawnLayerOnGrid:null},
		cadeCab8Layer:{SpawnLayerOnGrid:null},
		cadeCab9Layer:{SpawnLayerOnGrid:null},
		cadeCab10Layer:{SpawnLayerOnGrid:null},
		cadeCab11Layer:{SpawnLayerOnGrid:null},
		cadeCab12Layer:{SpawnLayerOnGrid:null},
		//High Scores
		highScoresBoard:{SpawnBoard:null, UpdateBoard:null},
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
		click:{
			cadeCab1Layer:{relay:{
				memoryGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab2Layer:{relay:{
				swipeLaunchGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab3Layer:{relay:{
				guessHitGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab4Layer:{relay:{
				dragDiffuseGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab5Layer:{relay:{
				sharpShooterGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab6Layer:{relay:{
				perfectScaleGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab7Layer:{relay:{
				reflex7GameMenu:{ToggleGameMenu:null},
			}},
			cadeCab8Layer:{relay:{
				tapItGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab9Layer:{relay:{
				popPopGameMenu:{ToggleGameMenu:null},
			}},
			cadeCab10Layer:{relay:{
				hordeHaltGameMenu:{ToggleGameMenu:null},
			}},
		},
	},
	exit:{
	},
};
//Game 1 - Memory Order
auxl.game1Data = {
	info:{
		id:'game1',
		name: 'Memory Order',
		description: 'Play the Memory Order game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.memoryGameColor.compl, emissive: auxl.memoryGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		memory:{SpawnMemGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern27, repeat: '50 50',color: auxl.memoryGameColor.base, emissive: auxl.memoryGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-3.5,0,-6.75), TwistTo: 90},
	},
};
//Game 2 - Swipe Launch
auxl.game2Data = {
	info:{
		id:'game2',
		name: 'Swipe Launch',
		description: 'Play the Swipe Launch game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.swipeLaunchGameColor.compl, emissive: auxl.swipeLaunchGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		swipeLaunchGame:{SpawnSLGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern16, repeat: '50 50',color: auxl.swipeLaunchGameColor.base, emissive: auxl.swipeLaunchGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-3.5,0,-8.25), TwistTo: 90},
	},
};
//Game 3 - Guess Hit
auxl.game3Data = {
	info:{
		id:'game3',
		name: 'Guess Hit',
		description: 'Play the Guess Hit game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.guessHitGameColor.compl, emissive: auxl.guessHitGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		guessHitGame:{SpawnGHGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern14, repeat: '50 50',color: auxl.guessHitGameColor.base, emissive: auxl.guessHitGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-3.5,0,-9.75), TwistTo: 90},
	},
};
//Game 4 - Drag Diffuse
auxl.game4Data = {
	info:{
		id:'game4',
		name: 'Drag Diffuse',
		description: 'Play the Drag Diffuse game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.dragDiffuseGameColor.compl, emissive: auxl.dragDiffuseGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:1},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		dragDiffuseGame:{SpawnDDGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern32, repeat: '50 50',color: auxl.dragDiffuseGameColor.base, emissive: auxl.dragDiffuseGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-3.5,0,-11.25), TwistTo: 90},
	},
};
//Game 5 - Sharp Shooter
auxl.game5Data = {
	info:{
		id:'game5',
		name: 'Sharp Shooter',
		description: 'Play the Sharp Shooter game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.sharpShooterGameColor.compl, emissive: auxl.sharpShooterGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		sharpShooterGame:{SpawnSSGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern80, repeat: '50 50', color: auxl.sharpShooterGameColor.base, emissive: auxl.sharpShooterGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-2.5,0,-12.5), TwistTo: 0},
	},
};
//Game 6 - Perfect Scale
auxl.game6Data = {
	info:{
		id:'game6',
		name: 'Perfect Scale',
		description: 'Play the Perfect Scale game.',
		sceneText: false,
		fog: false,
		map: {
			size: 50,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.perfectScaleGameColor.compl, emissive: auxl.perfectScaleGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:9},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		perfectScaleGame:{SpawnPSGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern60, repeat: '50 50', color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(-0.75,0,-12.5), TwistTo: 0},
	},
};
//Game 7 - Reflex 7
auxl.game7Data = {
	info:{
		id:'game7',
		name: 'Reflex 7',
		description: 'Play the Reflex 7 game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.reflex7GameColor.compl, emissive: auxl.reflex7GameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		reflex7Game:{SpawnR7Game: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern83, repeat: '50 50', color: auxl.reflex7GameColor.base, emissive: auxl.reflex7GameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(0.75,0,-12.5), TwistTo: 0},
	},
};
//Game 8 - Tap It
auxl.game8Data = {
	info:{
		id:'game8',
		name: 'Tap It',
		description: 'Play the Tap It game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.tapItGameColor.compl, emissive: auxl.tapItGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		tapItGame:{SpawnTIGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern75, repeat: '50 50', color: auxl.tapItGameColor.base, emissive: auxl.tapItGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(2.25,0,-12.5), TwistTo: 0},
	},
};
//Game 9 - Pop Pop
auxl.game9Data = {
	info:{
		id:'game9',
		name: 'Pop Pop',
		description: 'Play the Pop Pop game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.popPopGameColor.compl, emissive: auxl.popPopGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		popPopGame:{SpawnPPGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern34, repeat: '50 50', color: auxl.popPopGameColor.base, emissive: auxl.popPopGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(3,0,-11.25), TwistTo: -90},
	},
};
//Game 10 - Horde Halt
auxl.game10Data = {
	info:{
		id:'game10',
		name: 'Horde Halt',
		description: 'Play the Horde Halt game.',
		sceneText: false,
		fog: false,
		map: {
			size: 10,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: {shader: "standard", color: auxl.hordeHaltGameColor.compl, emissive: auxl.hordeHaltGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		},
		spawnPos:{x:0,y:0,z:2},
	},
	controls:{
	},
	start:{
		player:{TwistTo: 0},
		hordeHaltGame:{SpawnHHGame: null},
		mtnFloor:{SpawnCore:null,ChangeSelf:{property: 'material', value: {src: auxl.pattern82, repeat: '50 50', color: auxl.hordeHaltGameColor.base, emissive: auxl.hordeHaltGameColor.base,},}},
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
		player:{UpdatePlayerPosition: new THREE.Vector3(3,0,-9.75), TwistTo: -90},
	},
};
//Build
auxl.xrcadeHome = auxl.SceneNode(auxl.xrcadeHomeData);
auxl.game1 = auxl.SceneNode(auxl.game1Data);
auxl.game2 = auxl.SceneNode(auxl.game2Data);
auxl.game3 = auxl.SceneNode(auxl.game3Data);
auxl.game4 = auxl.SceneNode(auxl.game4Data);
auxl.game5 = auxl.SceneNode(auxl.game5Data);
auxl.game6 = auxl.SceneNode(auxl.game6Data);
auxl.game7 = auxl.SceneNode(auxl.game7Data);
auxl.game8 = auxl.SceneNode(auxl.game8Data);
auxl.game9 = auxl.SceneNode(auxl.game9Data);
auxl.game10 = auxl.SceneNode(auxl.game10Data);
auxl.xrcadeZone = auxl.MapZone(auxl.xrcadeZoneData);

//
//Spooky Zone
auxl.spookyZoneData = {
	info:{
		id: 'spookyZone',
		name: 'Spooky Zone',
		zoneNum: 0,
		start: 'spookyHome',
		travelMenu: false,
		backgroundAudio: 'spookymusic1',
	},
	controls:{
	},
	start:{
		skyBoxSpooky:{SpawnSkyBox: null, SetTime: 21},
		//player:{UpdatePlayerPosition: new THREE.Vector3(0,0,1.5), TwistTo: 0},
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
//Home
auxl.spookyHomeData = {
	info:{
		id:'spookyHome',
		name: 'Spooky Home',
		description: 'Welcome to the Spooky Zone!',
		sceneText: false,
		fog: false,
		map: {
			size: 120,
			height: {top: 2, bottom: 0},
			edge: false,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos:'other',
	},
	controls:{
	},
	start:{
		//Billboard Ad
		//sponsor1:{SpawnCore:null, ChangeSelf: {property: 'position', value: new THREE.Vector3(-5.5,6,1.74)}},
		//Doorway
		spookyToEntrance:{SpawnCore:null},
		spookyToExterior:{SpawnCoreOnGrid:null},
		spookyToExteriorBlock:{SpawnCore:null},
		//Floor
		xrcadeFloor:{SpawnCore:null},
		carpetChange1:{SpawnCore:null},
		carpetChange2:{SpawnCore:null},
		carpetChange3:{SpawnCore:null},
		carpetChange4:{SpawnCore:null},
		carpetChange5:{SpawnCore:null},
		carpetChange6:{SpawnCore:null},
		//North
		wallNorthSeg1:{SpawnCoreOnGrid:null},
		wallNorthFrame1:{SpawnCoreOnGrid:null},
		wallNorthSeg2:{SpawnCoreOnGrid:null},
		wallNorthFrame2:{SpawnCoreOnGrid:null},
		wallNorthSeg3:{SpawnCoreOnGrid:null},
		//East
		wallEastSeg1:{SpawnCoreOnGrid:null},
		wallEastFrame1:{SpawnCoreOnGrid:null},
		wallEastSeg2:{SpawnCoreOnGrid:null},
		wallEastFrame2:{SpawnCoreOnGrid:null},
		wallEastSeg3:{SpawnCoreOnGrid:null},
		//South
		wallSouthTop:{SpawnCoreOnGrid:null},
		wallSouthPart1:{SpawnCoreOnGrid:null},
		wallSouthPart2:{SpawnCoreOnGrid:null},
		//West
		wallWestSeg1:{SpawnCoreOnGrid:null},
		wallWestFrame1:{SpawnCoreOnGrid:null},
		wallWestSeg2:{SpawnCoreOnGrid:null},
		wallWestFrame2:{SpawnCoreOnGrid:null},
		wallWestSeg3:{SpawnCoreOnGrid:null},
		//Wall Pilars
		wallPilar1:{SpawnCoreOnGrid:null},
		wallPilar2:{SpawnCoreOnGrid:null},
		wallPilar3:{SpawnCoreOnGrid:null},
		wallPilar4:{SpawnCoreOnGrid:null},
		//Inner Pilars
		InnerPilar1:{SpawnCoreOnGrid:null},
		InnerPilar2:{SpawnCoreOnGrid:null},
		InnerPilar3:{SpawnCoreOnGrid:null},
		InnerPilar4:{SpawnCoreOnGrid:null},
		//Dividers
		//dividerNorth:{SpawnCoreOnGrid:null},
		//dividerEast:{SpawnCoreOnGrid:null},
		//dividerSouth:{SpawnCoreOnGrid:null},
		//dividerWest:{SpawnCoreOnGrid:null},
		//Mini Menus
		jukeBox:{SpawnCoreOnGrid:null},
		token:{SpawnCoreOnGrid:null},
		//XRCade Sign
		cadeSignSpinner:{SpawnLayer:null},
		//North Wall
		batsSign:{SpawnCore:null},
		ivxLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#000000, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		//East Wall
		jackoSign:{SpawnCore:null},
		treeLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#9939e0, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		//South Wall
		heartsSign:{SpawnCore:null},
		heartLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#d47d16, #000000', emissives: '1,1'},},}, SpawnCore:null,},
		//West Wall
		ghostSign:{SpawnCore:null},
		waveLineSign:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#11bfab, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		//Wall Pilar Lines
		nwWallPilarLineEast:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#000000, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		nwWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#11bfab, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#000000, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		swWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#11bfab, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#000000, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		neWallPilarLineSouth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#9939e0, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineWest:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#000000, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},
		seWallPilarLineNorth:{ChangeCore:{property: 'components', value: {['gltf-model']:'./assets/3d/XRcade/line.glb', gltfmat: {colors: '#9939e0, #d47d16', emissives: '1,1'},},}, SpawnCore:null,},

	},
	delay:{
		1000:{
/*
		xrcadeWorld:{IfElse: {auxl:{cond: 'backgroundAudio',
		ifTrue: {
			xrcadeWorld:{MusicPlaylist: 'town3',},
		},ifFalse: {
			player:{Notification: 'fail',},
		},}}},

*/
			spookyToExterior:{EmitEvent:'alert1'},
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
//Exterior
auxl.spookyExtData = {
	info:{
		id:'spookyExt',
		name: 'Hallows Cemetery Ext',
		description: 'Exterior of the Hallows Cemetery.',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 200,
			height: {top: 2, bottom: 0},
			edge: false,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos: 'other',
	},
	controls:{
	},
	start:{

		//Billboard Ad
		//sponsor1:{SpawnCore:null, ChangeSelf: {property: 'position', value: new THREE.Vector3(-1.75,8,22)}},
		//Disable Flashlight
		player:{ToggleFlashlight:{off:true},},
		//Doors
		exteriorToSpooky:{SpawnCoreOnGrid:null},
		exteriorToRoom1:{SpawnCoreOnGrid:null},
		exteriorToRoom2:{SpawnCoreOnGrid:null},
		exteriorToRoom3:{SpawnCoreOnGrid:null},
		exteriorRoom0Block:{SpawnCore:null},
		exteriorRoom1Block:{SpawnCore:null},
		exteriorRoom2Block:{SpawnCore:null},
		exteriorRoom3Block:{SpawnCore:null},
		//Horizon
		spookyHills:{SpawnHorizon:null},
		//Floor
		spookyFloor:{SpawnCore:null},
		//Grids
		kayKitArch:{SpawnCore:null},
		hallowGridFencesX:{SpawnGridLayout:'layout1'},
		hallowGridFencesZ:{SpawnGridLayout:'layout1'},
		kayKitArchGate:{SpawnCoreOnGrid:null},
		kayKitArchGateX1:{SpawnCoreOnGrid:null},
		kayKitArchGateX2:{SpawnCoreOnGrid:null},
		hallowGridGraves:{SpawnGridLayout:'layout1'},
		hallowGridGravesAlt:{SpawnGridLayout:'layout1'},
		hallowGridAltGraves:{SpawnGridLayout:'layout1'},
		hallowGridTrees:{SpawnGridLayout:'layout1'},
		hallowGridSkullTrees:{SpawnGridLayout:'layout1'},
		hallowGridDeco:{SpawnGridLayout:'layout1'},
		hallowGridJackos:{SpawnGridLayout:'layout1'},
		hallowGridTallDeco:{SpawnGridLayout:'layout1'},
		spookyBenchDecorated1:{SpawnCoreOnGrid:null},
		spookyBenchDecorated2:{SpawnCoreOnGrid:null},
		spookyBenchDecorated3:{SpawnCoreOnGrid:null},
		spookyBenchDecorated4:{SpawnCoreOnGrid:null},
		//Outer Ring
		spookyTreeRing:{SpawnCore:null},
		//Inner Ring
		innerRing1:{SpawnObjRing:null},
		innerRing2:{SpawnObjRing:null},
		innerRing3:{SpawnObjRing:null},
		innerRing4:{SpawnObjRing:null},
		//Ghost
		spookyGhostLayer:{SpawnLayer:null, ChangeAll:{property: 'material', value: {opacity: 0.5}}}
	},
	delay:{
		250:{
			atmos:{SpawnWeather:null},
		},
		1000:{
			exteriorToRoom1:{IfElse: {exteriorToRoom1:{cond: 'done',
			ifTrue: {},ifFalse: {
				exteriorToRoom1:{EmitEvent:'alert1'},
			},}}},
		},
		2000:{
			exteriorToRoom2:{IfElse: {exteriorToRoom2:{cond: 'done',
			ifTrue: {},ifFalse: {
				exteriorToRoom2:{EmitEvent:'alert1'},
			},}}},
		},
		3000:{
			exteriorToRoom3:{IfElse: {exteriorToRoom3:{cond: 'done',
			ifTrue: {},ifFalse: {
				exteriorToRoom3:{EmitEvent:'alert1'},
			},}}},
		},
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
		//Weather
		atmos:{DespawnWeather:null},
	},
};
//Room 1
auxl.spookyRoom1Data = {
	info:{
		id:'spookyRoom1',
		name: 'Room 1',
		description: 'Spooky room 1.',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 240,
			height: {top: 0, bottom: 0},
			edge: true,
			spawnEdge: true,
			edgeUpdate: false,
		},
		spawnPos: 'other',
	},
	controls:{
	},
	start:{
		//Remove Skybox
		skyBoxSpooky:{DespawnSkyBox: null},
		//Enable Flashlight
		player:{ToggleFlashlight:{on:true},},
		//Sky
		spookyRoom1Ext:{SpawnCore:null},
		//Doors
		room1ToExterior:{SpawnCoreOnGrid:null},
		room1ToRoom1Alt:{SpawnCoreOnGrid:null},
		spookyRoom1AltBlock:{SpawnCore:null},
		room1Door1:{SpawnCoreOnGrid:null},
		room1Door2:{SpawnCoreOnGrid:null},
		room1Door3:{SpawnCoreOnGrid:null},
		room1Door4:{SpawnCoreOnGrid:null},
		room1Door5:{SpawnCoreOnGrid:null},
		room1Door6:{SpawnCoreOnGrid:null},
		room1Door7:{SpawnCoreOnGrid:null},
		//Floor
		spookyRoom1Floor:{SpawnCore:null},
		//Ceiling
		spookyRoom1Ceiling:{SpawnCore:null},
		//Walls
		spookyRoom1Wall0:{SpawnCore:null},
		spookyRoom1Wall1:{SpawnCoreOnGrid:null},
		spookyRoom1Wall2:{SpawnCoreOnGrid:null},
		spookyRoom1Wall3:{SpawnCore:null},
		//Rug
		spookyRoom1Rug:{SpawnCore:null},
		//Tables
		room1TablesGrid:{SpawnGridLayout:'layout1'},
		//Paintings
		spookyRoom1Painting1:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting1}},},
		spookyRoom1Painting2:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting2}},},
		spookyRoom1Painting3:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting3}},},
		spookyRoom1Painting4:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting4}},},
		spookyRoom1Painting5:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting5}},},
		spookyRoom1Painting6:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting6}},},
		spookyRoom1Painting7:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting13}},},
		spookyRoom1Painting8:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting7}},},
		spookyRoom1Painting9:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting8}},},
		spookyRoom1Painting10:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting9}},},
		spookyRoom1Painting11:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting10}},},
		spookyRoom1Painting12:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting11}},},
		spookyRoom1Painting13:{SpawnCore:null, ChangeSelf:{property: 'material', value: {src: auxl.spookyPainting12}},},
		//Lights
		spookyRoom1Light0:{SpawnCore:null},
		spookyRoom1Light1:{SpawnCore:null},
		spookyRoom1Light2:{SpawnCore:null},
		spookyRoom1Light3:{SpawnCore:null},
		spookyRoom1Light4:{SpawnCore:null},
		spookyRoom1Light5:{SpawnCore:null},
		spookyRoom1Light6:{SpawnCore:null},
		spookyRoom1Light7:{SpawnCore:null},
		//Light Triggers
		spookyRoom1Light2Trigger:{SpawnCoreOnGrid:null},
		spookyRoom1Light4Trigger:{SpawnCoreOnGrid:null},
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
//Room 1 Alt
auxl.spookyRoom1AltData = {
	info:{
		id:'spookyRoom1Alt',
		name: 'Room 1 Alt',
		description: 'Spooky room 1 alt.',
		sceneText: false,
		fog: false,
		map: {
			size: 24,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos: 'other',
	},
	controls:{
	},
	start:{
		//Door
		room1AltDoor:{SpawnCore:null},
		//Floor, Ceiling & Walls
		spookyRoom1AltFloor:{SpawnCore:null},
		spookyRoom1AltCeiling:{SpawnCore:null},
		room1AltHorizon:{SpawnHorizon:null},
		//Jump
		spookyRoom1Jump1:{SpawnCore:null},
	},
	delay:{
		100:{
			//Lock Player Movement
			player:{LockLocomotion:null},
		},
		3000:{
			//Disable Flashlight
			player:{ToggleFlashlight:{off:true},},
		},
		5900:{
			//Move Jump Scare
			spookyRoom1Jump1:{EmitEvent: 'jump'},
		},
		6000:{
			//Enable Flashlight
			player:{ToggleFlashlight:{on:true},},
		},
		8000:{
			//Reload Skybox
			SpookySkyBoxSpawnFix:{Fix: null},
			//Move Back to Hallows
			spookyZone:{Move: 'connect1'},
			player:{ToggleFlashlight:{off:true}, UpdatePlayerPosition: new THREE.Vector3(4.75,0,2), TwistTo: 0,},
			playerAudio:{EmitEvent: 'respawn'},
			//Completed
			exteriorToRoom1:{SetFlag:{flag: 'done', value: true}},
		},
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
		//Unlock Player Movement
		player:{UnlockLocomotion:null},
	},
};
//Room 2
auxl.spookyRoom2Data = {
	info:{
		id:'spookyRoom2',
		name: 'Room 2',
		description: 'Spooky room 2.',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 24,
			height: {top: 2, bottom: 0},
			edge: true,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos: 'other',
	},
	controls:{
	},
	start:{
		//Door
		room2ToExteriorDoor:{SpawnCoreOnGrid:null},
		//Exterior, Floor, Ceiling & Walls
		spookyRoom2Ext:{SpawnCore:null},
		spookyRoom2Floor:{SpawnCore:null},
		spookyRoom2Ceiling:{SpawnCore:null},
		spookyRoom2North:{SpawnCore:null},
		spookyRoom2South:{SpawnCore:null},
		spookyRoom2West:{SpawnCore:null},
		spookyRoom2East:{SpawnCore:null},
		spookyRoom2Basement:{SpawnCore:null},
		//Decorations
		kayKitArmchairPillows:{SpawnCoreOnGrid:null},
		kayKitBedSingleA:{SpawnCoreOnGrid:null},
		kayKitCabinetMediumDecorated:{SpawnCoreOnGrid:null},
		kayKitCabinetSmall:{SpawnCoreOnGrid:null},
		kayKitCabinetSmallDecorated:{SpawnCoreOnGrid:null},
		kayKitCactusMediumA:{SpawnCoreOnGrid:null},
		kayKitChairStool:{SpawnCoreOnGrid:null},
		kayKitLampStanding:{SpawnCoreOnGrid:null},
		kayKitRugOvalA:{SpawnCore:null},
		kayKitShelfBLargeDecorated:{SpawnCore:null},
		grid2x05:{SpawnCoreOnGrid:null},

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
		//Unlock Player Movement
		player:{UnlockLocomotion:null},
	},
};
//Room 3
auxl.spookyRoom3Data = {
	info:{
		id:'spookyRoom3',
		name: 'Room 3',
		description: 'Spooky room 3.',
		sceneText: false,
		fog: {type: 'exponential', color: '#000', density: 0.025},
		map: {
			size: 96,
			height: {top: 32, bottom: 0},
			edge: true,
			spawnEdge: false,
			edgeUpdate: false,
		},
		spawnPos: 'other',
	},
	controls:{
	},
	start:{
		//Light Adjustments
		directionalLight:{ChangeSelf: [{property: 'light', value: {intensity: 0.75}}, {property: 'position', value: new THREE.Vector3(0,1,0)}]},
		directionalLight2:{ChangeSelf: {property: 'position', value: new THREE.Vector3(-1,-1,1)}},
		directionalLight3:{ChangeSelf: {property: 'position', value: new THREE.Vector3(1,-1,-1)}},
		ambientLight:{ChangeSelf: {property: 'light', value: {intensity: 0.75}}},
		//Swimming
		player:{ChangeLocomotionType:{pov: '1st', axis: 'posXYZ', type: 'free'}},
		//Exterior
		spookyRoom3Ext:{SpawnCore:null},
		//Door
		room3ToExteriorDoor:{SpawnCoreOnGrid:null},
		room2Block1Grid:{SpawnGridLayout:'layout1'},
		room2Block2Grid:{SpawnGridLayout:'layout1'},
		room2Block3Grid:{SpawnGridLayout:'layout1'},
		block4Ring:{SpawnObjRing:null},
		//Fauna
		shark1Layer:{SpawnLayer:null},
		shark2Layer:{SpawnLayer:null},
		shark3Layer:{SpawnLayer:null},
		shark4Layer:{SpawnLayer:null},
		squid:{SpawnCore:null},
		sharkMegaLayer:{SpawnLayer:null},
	},
	delay:{
		3000:{
			squid:{EmitEvent: 'sing'}
		},
		7000:{
			room3ToExteriorDoor:{DespawnCore:null},
			directionalLight:{EmitEvent: 'fadeout'},
			directionalLight2:{EmitEvent: 'fadeout'},
			directionalLight3:{EmitEvent: 'fadeout'},
			ambientLight:{EmitEvent: 'fadeout'},
			playerAudio:{EmitEvent: 'heartbeat'},
		},
		32250:{
			player:{PlayerTeleportAnim: null},
		},
		32500:{
			player:{LockLocomotion:null, UpdatePlayerPosition: new THREE.Vector3(0,8.5,1), TwistTo: 1,},
		},
		32750:{
			player:{TwistTo: 1,},
		},
		33000:{
			spookyRoom3FlareLayer:{SpawnLayer:null},
		},
		36500:{
			sharkMegaAttack:{SpawnCore:null},
		},
		38700:{
			playerAudio:{EmitEvent: 'respawn'},
			spookyZone:{Move: 'connect0'},
			player:{UpdatePlayerPosition: new THREE.Vector3(10.5,0,-10.5), TwistTo: 45, SetFlag:{flag: 'room3', value: true}},
			exteriorToRoom3:{SetFlag:{flag: 'done', value: true}},
		},
	},
	interval:{
		4000: {
			run: {playerAudio:{EmitEvent: 'underwater'},}, loop: 'infinite', end: 'stop',
		},
		11000: {
			run: {squid:{EmitEvent: 'sing'},}, loop: 2, end: 'stop',
		},
	},
	event:{
	},
	interaction:{
	},
	exit:{
		//Walking
		player:{ChangeLocomotionType:{pov: '1st', axis: 'posXZ', type: 'free'}, UnlockLocomotion:null,},
		directionalLight:{EmitEvent: 'stop', ChangeSelf: [{property: 'light', value: {intensity: 0.75}}, {property: 'position', value: new THREE.Vector3(-0.25,0.75,0.5)}]},
		directionalLight2:{EmitEvent: 'stop', ChangeSelf: [{property: 'light', value: {intensity: 0.1}}, {property: 'position', value: new THREE.Vector3(0.25,0.75,-0.5)}]},
		directionalLight3:{EmitEvent: 'stop', ChangeSelf: [{property: 'light', value: {intensity: 0.2}}, {property: 'position', value: new THREE.Vector3(0.25,0.75,0.5)}]},
		ambientLight:{EmitEvent: 'stop', ChangeSelf: {property: 'light', value: {intensity: 0.5}}},

	},
};

//Build
auxl.spookyHome = auxl.SceneNode(auxl.spookyHomeData);
auxl.spookyExt = auxl.SceneNode(auxl.spookyExtData);
auxl.spookyRoom1 = auxl.SceneNode(auxl.spookyRoom1Data);
auxl.spookyRoom1Alt = auxl.SceneNode(auxl.spookyRoom1AltData);
auxl.spookyRoom2 = auxl.SceneNode(auxl.spookyRoom2Data);
auxl.spookyRoom3 = auxl.SceneNode(auxl.spookyRoom3Data);
auxl.spookyZone = auxl.MapZone(auxl.spookyZoneData);

//
//Scenarios

//
//XRcade Scenario
auxl.xrcadeScenarioData = {
	info:{
		id: 'xrcadeScenario',
		name: 'Minty XRcade',
		scenarioNum: 0,
		startZone: 'entranceZone',
		instructions: 'A scenario consisting of a bunch of mini games.',
	},
	map:{
		entranceZone:{
			entranceHome:{
				connect0: {inZone: 'xrcadeZone', node: 'xrcadeHome',},
				connect1: {inZone: 'spookyZone', node: 'spookyHome',},
			},
		},
		xrcadeZone:{
			xrcadeHome:{
				connect0: {inZone: 'entranceZone', node: 'entranceHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game6',},
				connect7: {inZone: true, node: 'game7',},
				connect8: {inZone: true, node: 'game8',},
				connect9: {inZone: true, node: 'game9',},
				connect10: {inZone: true, node: 'game10',},
			},
			game1:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game2',},
				connect2: {inZone: true, node: 'game3',},
				connect3: {inZone: true, node: 'game4',},
				connect4: {inZone: true, node: 'game5',},
				connect5: {inZone: true, node: 'game6',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game2:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game3',},
				connect3: {inZone: true, node: 'game4',},
				connect4: {inZone: true, node: 'game5',},
				connect5: {inZone: true, node: 'game6',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game3:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game4',},
				connect4: {inZone: true, node: 'game5',},
				connect5: {inZone: true, node: 'game6',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game4:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game5',},
				connect5: {inZone: true, node: 'game6',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game5:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game6',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game6:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game7',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game7:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game6',},
				connect7: {inZone: true, node: 'game8',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game8:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game6',},
				connect7: {inZone: true, node: 'game7',},
				connect8: {inZone: true, node: 'game9',},
				connect9: {inZone: true, node: 'game10',},
			},
			game9:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game6',},
				connect7: {inZone: true, node: 'game7',},
				connect8: {inZone: true, node: 'game8',},
				connect9: {inZone: true, node: 'game10',},
			},
			game10:{
				connect0: {inZone: true, node: 'xrcadeHome',},
				connect1: {inZone: true, node: 'game1',},
				connect2: {inZone: true, node: 'game2',},
				connect3: {inZone: true, node: 'game3',},
				connect4: {inZone: true, node: 'game4',},
				connect5: {inZone: true, node: 'game5',},
				connect6: {inZone: true, node: 'game6',},
				connect7: {inZone: true, node: 'game7',},
				connect8: {inZone: true, node: 'game8',},
				connect9: {inZone: true, node: 'game9',},
			},
		},
		spookyZone:{
			spookyHome:{
				connect0: {inZone: 'entranceZone', node: 'entranceHome',},
				connect1: {inZone: true, node: 'spookyExt',},
			},
			spookyExt:{
				connect0: {inZone: true, node: 'spookyHome',},
				connect1: {inZone: true, node: 'spookyRoom1',},
				connect2: {inZone: true, node: 'spookyRoom2',},
				connect3: {inZone: true, node: 'spookyRoom3',},
			},
			spookyRoom1:{
				connect0: {inZone: true, node: 'spookyExt',},
				connect1: {inZone: true, node: 'spookyRoom1',},
				connect2: {inZone: true, node: 'spookyRoom1Alt',},
			},
			spookyRoom1Alt:{
				connect0: {inZone: true, node: 'spookyRoom1',},
				connect1: {inZone: true, node: 'spookyExt',},
			},
			spookyRoom2:{
				connect0: {inZone: true, node: 'spookyExt',},
			},
			spookyRoom3:{
				connect0: {inZone: true, node: 'spookyExt',},
			},
		},
	},
	controls:{
		//
		//Default Player Controls
		action5Down:{auxlObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{auxlObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{auxlObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		//comp:{SpawnComp: null},
		//Reset Spooky Complete
		exteriorToRoom1:{SetFlag: {flag: 'done', value: false}},
		exteriorToRoom2:{SetFlag: {flag: 'done', value: false}},
		exteriorToRoom3:{SetFlag: {flag: 'done', value: false}},
	},
	delay:{
		500:{
			comp:{SpawnComp: null,},
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
auxl.xrcadeScenario = auxl.Scenario(auxl.xrcadeScenarioData);

//
//XRcade World
auxl.xrcadeWorldData = {
	info:{
		id: 'xrcadeWorld',
		name: 'XRcade World',
		description: 'A world containing various games.',
		maxLoadtime: 5000,
		dayTime: 60000,
		inventory: true,
		collision: true,
		physics: 'ammo',
		menuStyle: auxl.menuStyleData,
		menuOptions: auxl.addToMainMenu,
		backgroundAudio: {
			town3: {src: auxl.town3, autoplay: false, loop: true, volume: 0.4, on: 'town3'},
			spookymusic1: {src: auxl.soundSpookyMusic1, autoplay: false, loop: true, volume: 0.3, on: 'spookymusic1'},
		},
		soundEffects: {
			thunderstorm: {src: auxl.weatherStormThunderLoop, autoplay: false, loop: true, volume: 0.5, on: 'thunderstorm'},
			boltsound: {src: auxl.weatherStormLightningStrike, autoplay: false, loop: false, volume: 0.35, on: 'boltHit', poolSize: 2},
		},
		compBookUpdate: auxl.compCadeBookData,
	},
	scenarios:[
		auxl.xrcadeScenario,
	],
};
auxl.xrcadeWorld = auxl.World(auxl.xrcadeWorldData);
//auxl.xrcadeWorld.SetAsDefault();

//
//System Loaded
//auxl.SystemLoaded();
console.log({msg: 'xrcade world loaded', world: auxl.xrcadeWorld})
    },
});