//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Scenes

//auxl-scene-library
//User Library : User added Library items
AFRAME.registerComponent('auxl-scene-library', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Testing Object
auxl.TestObj = (id) => {

	let testObj = {};
	testObj.id = id;
	//Cube
	testObj.testData = {
	data:'testData',
	id:'test',
	sources: false,
	text: false,
	geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
	material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#52a539", emissive: '#52a539', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-1.5,2.5,-1.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		doorway:{zone: 'zone0', to: 'connect0'},
	},
	};
	testObj.test = auxl.Core(testObj.testData);

	const SpawnTest = () => {
		testObj.test.SpawnCore();
	}

	const DespawnTest = () => {
		testObj.test.DespawnCore();
	}

	const TestMethod = (params) => {
		console.log(params);
	}

	return {testObj, SpawnTest, DespawnTest, TestMethod};
}
auxl.AddObjGenToTracker('testObj', 'SpawnTest', 'DespawnTest');

auxl.test = auxl.TestObj('test');

//
//Multi Menu Button Base Template
auxl.menuCylinderData = {
data:'menuCylinderData',
id:'menuCylinder',
sources:false,
text: {value:'Menu', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'circle', radius: 0.25, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
//Multi-Menu Hover Text Display
auxl.menuHoverData = {
data:'menuHoverData',
id:'menuHover',
sources:false,
text: {value:'Menu', wrapCount: 40, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: false,
material: false,
position: new THREE.Vector3(0,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};

//
//MultiMenu test

auxl.multiMenuTestData = {
info:{
	id: 'multiMenuTest',
	buttonData: auxl.menuCylinderData,
	hoverData: auxl.menuHoverData,
	title: 'Multi-Menu Test Menu',
	description: 'A test menu that contains multiple sub menus to go between.',
	layout:'circle',
	//layout:'vertical',
	//layout:'horizontal',
	offset: -1,
	//offset: 0.5,
	//offset: 0.75,
	parent: false,
	position: new THREE.Vector3(0.25,1.5,-1.5),
},
menu0:{
	button0:{
		id: 'subMenu1',
		style: false,
		title: 'Sub Menu 1 Test',
		description: 'A test sub menu.',
		subMenu: 'menu1',
		action: false,
	},
	button1:{
		id: 'subMenu2',
		style: false,
		title: 'Sub Menu 2 Test',
		description: 'A test sub menu.',
		subMenu: 'menu2',
		action: false,
	},
	button2:{
		id: 'subMenu3',
		style: false,
		title: 'Sub Menu 3 Test',
		description: 'A test sub menu.',
		subMenu: 'menu3',
		action: false,
	},
},
menu1:{
	button0:{
		id: 'subMenu4',
		style: false,
		title: 'Sub Menu 4 Test',
		description: 'A test sub menu.',
		subMenu: 'menu4',
		action: false,
	},
	button1:{
		id: 'subMenu5',
		style: false,
		title: 'Sub Menu 5 Test',
		description: 'A test sub menu.',
		subMenu: 'menu5',
		action: false,
	},
},
menu2:{
	button0:{
		id: 'action1',
		style: false,
		title: 'Sub Menu 2 Action 1 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 2 Action 1',
		},
	},
	button1:{
		id: 'action2',
		style: false,
		title: 'Sub Menu 2 Action 2 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 2 Action 2',
		},
	},
},
menu3:{
	button0:{
		id: 'action1',
		style: false,
		title: 'Sub Menu 3 Action 1 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 3 Action 1',
		},
	},
	button1:{
		id: 'action2',
		style: false,
		title: 'Sub Menu 3 Action 2 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 3 Action 2',
		},
	},
},
menu4:{
	button0:{
		id: 'action1',
		style: false,
		title: 'Sub Menu 4 Action 1 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 4 Action 1',
		},
	},
	button1:{
		id: 'action2',
		style: false,
		title: 'Sub Menu 4 Action 2 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 4 Action 2',
		},
	},
},
menu5:{
	button0:{
		id: 'action1',
		style: false,
		title: 'Sub Menu 5 Action 1 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'test',
			component: false,
			method: 'TestMethod',
			params: 'Sub Menu 5 Action 1',
		},
	},
	button1:{
		id: 'action2',
		style: false,
		title: 'Sub Menu 5 Action 2 Test',
		description: 'A test sub menu action.',
		subMenu: false,
		action: {
			auxlObj: 'playerRig',
			component: 'locomotion',
			method: 'toggleSpeed',
			params: false,
		},
	},
},

};

auxl.multiMenuTest = auxl.MultiMenu(auxl.multiMenuTestData);



//
//Pet
auxl.Pet = (petData) => {

let pet = Object.assign({}, petData);

const natures = ['nature1','nature2','nature3'];
const abilities = ['ability1', 'ability2', 'ability3'];
const moods = ['sad', 'happy'];
const energy = ['famished', 'hungry', 'content', 'full',];
const full = 4;
const maxStamina = 10;
const xpLevels = [0, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600]

//Nature
pet.nature = natures[Math.floor(Math.random()*natures.length)];
//Ability
pet.ability = natures[Math.floor(Math.random()*abilities.length)];
//Mana
pet.mana = Math.floor(Math.random()*5)+5;
//Mood
pet.mood = moods[0];
pet.mind = 0;
//Hunger
pet.currHunger = 0;
pet.hunger = energy[pet.currHunger];
//Stamina
pet.stamina = 2;
//Health
pet.clean = true;
pet.maxHealth = 6;
pet.currHealth = 4;
//Level
pet.level = 0;
//XP
pet.xp = 0;
//Age
pet.age = 0;
//Currency
pet.tokens = 0;
pet.currency = 0;
//Sleep
pet.awake = true;
pet.sleepCycle = false;
//Menu
pet.menu = 0;
//0 : Hidden
//1 : Main Menu
//2 : Sub Menu
//3 : Action



const DevDisplay = (message, xIs) => {
	if(xIs){
		console.log(message + ' ' + pet.name + '.');
	} else {
		console.log(pet.name + ' ' + message + '.');
	}
}

const SpawnPet = () => {
	pet.core.SpawnCore();

}

const DespawnPet = () => {
	pet.core.DespawnCore();

}

const Pet = () => {
	DevDisplay('Petting', true);
	pet.mind++;
	pet.mood = moods[pet.mind];
	DevDisplay('is ' + pet.mood, false);
}

const Feed = () => {
	pet.currHunger++;
	pet.hunger = energy[pet.currHunger];
	DevDisplay( 'is ' + pet.hunger, false);
}

const Groom = () => {
	if(pet.clean){} else {
		pet.clean = true;
		DevDisplay( 'is clean.', false);
	}
}

const Play = () => {
	if(pet.stamina > 0){
		DevDisplay('Playing with', true);
		pet.stamina--;
		pet.mind++;
	}
}

const Heal = () => {
	if(pet.currHealth < pet.maxHealth){
		pet.currHealth+=2;
		DevDisplay('Healing', true);
		if(pet.currHealth > pet.maxHealth){
			pet.currHealth = pet.maxHealth;
		}
	}
}

const Quest = () => {
	if(pet.stamina > 0){
		DevDisplay('Questing with', false);
		pet.stamina-=2;
		if(Math.random()*100-pet.mana>=69){
			DevDisplay('Completed a quest with ', true);
			GainXP(10);
		} else {
			DevDisplay('Failed a quest with', true);
		}
	}
}

const GainXP = (xp) => {
	pet.xp+=xp;
	if(pet.xp >= xpLevels[pet.level]){
		DevDisplay(' gained a level!', false);
	}
}

const Gamble = () => {
	if(pet.tokens > 0){
		DevDisplay('Gambling with', false);
		pet.tokens--;
		if(Math.random()*100>=50){
			pet.currency++;
			DevDisplay(' is a winner', false);
		}
	}
}

const ToggleSleep = () => {
	if(pet.awake){
		pet.awake = false;
		DevDisplay(' is asleep', false);
	} else {
		pet.awake = true;
		DevDisplay(' is awake', false);
	}
}

const Stats = () => {
console.log(pet);
}

const Settings = () => {
//Save
//Load
//Reset

}

const spawnPetMainMenu = () => {
	
	pet.pos = pet.core.GetEl().getAttribute('position');
	pet.systemMenuData = {
		id: 'systemMenu',
		prompt: 'X - Pet Menu',
		options: {option0: '0'},
		actions: {action0: '0'},
		layout: 'vertical',
		data: auxl.menuBaseData,
		cursorObj: pet.id,
		method: 'mainMenuClick',
		pos: new THREE.Vector3(pet.pos.x+1,1.5,pet.pos.z-1),
	}
	/*
	let currNum = 0;
	for(let options in systemMenuButtons){
		pet.systemMenuData.options['option'+currNum] = systemMenuButtons[options];
		pet.systemMenuData.actions['action'+currNum] = options;
		currNum++;
	}
	*/
	pet.systemMenu = auxl.Menu(pet.systemMenuData);
	pet.systemMenu.SpawnMenu();
	pet.systemMenu.AddToParentSpawnTracker(pet.systemMenu, pet);

}

const mainMenuClick = (el) => {
	let result = el.getAttribute('result');
	console.log(result);
}

return {pet, SpawnPet, DespawnPet, Pet, Feed, Groom, Play, Heal, Quest, Gamble, ToggleSleep, Stats, Settings, spawnPetMainMenu, mainMenuClick}

}
//Pet Core
auxl.petCoreData = {
data:'petCoreData',
id:'petCore',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.5},
material: {shader: "standard", src: auxl.pattern30, repeat: '1 1', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1,-0.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.petCore = auxl.Core(auxl.petCoreData);

auxl.pet0Data = {
id: 'pet0',
name: 'Minty Pet',
core: auxl.petCore,
};

let pet0 = auxl.Pet(auxl.pet0Data);

//pet0.SpawnPet();
//pet0.Pet();
//pet0.Feed();
//pet0.Groom();
//pet0.Play();
//pet0.Heal();
//pet0.Quest();
//pet0.Gamble();
//pet0.ToggleSleep();
//pet0.Stats();
//pet0.spawnPetMainMenu();
/*
Show/Hide/Back
- Pet
- Feed
- - Meal
- - Snack
- Groom
- Play
- - Catch
- - Dodge
- - Jump
- - Fight
- Heal
- Quest
- - Adventure
- - Battle
- Gamble/Casino
- - RNG 1
- - RNG 2
- Stats
- - Nature
- - Ability
- - Mood
- - Hunger
- - Stamina
- - Mana
- - Level / XP
- - Age
- Settings
- - Save
- - Load
- - Reset

Main Button
- Hidden : Click to show main menu
- Display Main Menu : Click to hide menu
- Display Sub Menu : Click to go back to main menu
- Exit Mode : Close mode and display main menu
*/

//
//Ghost

//Parent
auxl.ghostParentData = {
data:'ghostParentData',
id:'ghostParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.9,0.9,0.9),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',
},
};
auxl.ghostParent = auxl.Core(auxl.ghostParentData);
//EyeSocket
auxl.eyeSocketData = {
data:'eyeSocketData',
id:'eye1Socket',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.15,0.1,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(0.75,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Eye1Socket
auxl.eye1Socket = auxl.Core(auxl.eyeSocketData);
//Eye2Socket
auxl.eyeSocketData.id = 'eye2Socket';
auxl.eyeSocketData.position = new THREE.Vector3(0.15,0.1,0.4);
auxl.eye2Socket = auxl.Core(auxl.eyeSocketData);
//EyePupil
auxl.eyePupilData = {
data:'eyePupilData',
id:'eye1Pupil',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.1, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#1500fa", emissive: '#1500fa', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1,1),
animations: {
lookdown: {property: 'position', to: new THREE.Vector3(0,0.01,0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookDown'},
lookup: {property: 'position', to: new THREE.Vector3(0,0.01,-0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookUp'},
lookright: {property: 'position', to: new THREE.Vector3(0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookRight'},
lookleft: {property: 'position', to: new THREE.Vector3(-0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookLeft'},

powerup1: {property: 'material.color', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#fcfafd', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Eye1Pupil
auxl.eye1Pupil = auxl.Core(auxl.eyePupilData);
//Eye2Pupil
auxl.eyePupilData.id = 'eye2Pupil';
auxl.eye2Pupil = auxl.Core(auxl.eyePupilData);
//Mouth
auxl.mouthData = {
data:'mouthData',
id:'mouth',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup: {property: 'visible', to: true, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown: {property: 'visible', to: false, dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
line:{start: new THREE.Vector3(-0.3,-0.2,0.41), end: new THREE.Vector3(-0.2,-0.15,0.41), color: 'white'},
['line__2']:{start: new THREE.Vector3(-0.2,-0.15,0.41), end: new THREE.Vector3(-0.1,-0.2,0.41), color: 'white'},
['line__3']:{start: new THREE.Vector3(-0.1,-0.2,0.41), end: new THREE.Vector3(0,-0.15,0.41), color: 'white'},
['line__4']:{start: new THREE.Vector3(0,-0.15,0.41), end: new THREE.Vector3(0.1,-0.2,0.41), color: 'white'},
['line__5']:{start: new THREE.Vector3(0.1,-0.2,0.41), end: new THREE.Vector3(0.2,-0.15,0.41), color: 'white'},
['line__6']:{start: new THREE.Vector3(0.2,-0.15,0.41), end: new THREE.Vector3(0.3,-0.2,0.41), color: 'white'},
},
};
auxl.mouth = auxl.Core(auxl.mouthData);
//Spin
auxl.spinData = {
data:'spinData',
id:'spin',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,-0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
rotate: {property: 'object3D.rotation.y', from: 0, to: 360, dur: 1500, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.spin = auxl.Core(auxl.spinData);
//Head
auxl.headData = {
data:'headData',
id:'head',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.head = auxl.Core(auxl.headData);
//Body
auxl.bodyData = {
data:'bodyData',
id:'body',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.4, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.body = auxl.Core(auxl.bodyData);
//Legs
auxl.legData = {
data:'legData',
id:'leg1',
sources: false,
text: false,
geometry: {primitive: 'cone', radiusBottom: 0, radiusTop: 0.15, height: 0.2, openEnded: false, segmentsHeight: 4, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.25,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
powerup1: {property: 'material.color', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerup2: {property: 'material.emissive', to: '#1500fa', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredUp'},
powerdown1: {property: 'material.color', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
powerdown2: {property: 'material.emissive', to: '#C14B76', dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'poweredDown'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Leg 1
auxl.leg1 = auxl.Core(auxl.legData);
//Leg 2
auxl.legData.id = 'leg2'
auxl.legData.position = new THREE.Vector3(0.25,-0.25,0);
auxl.leg2 = auxl.Core(auxl.legData);
//Leg 3
auxl.legData.id = 'leg3'
auxl.legData.position = new THREE.Vector3(0,-0.25,-0.25);
auxl.leg3 = auxl.Core(auxl.legData);
//Leg 4
auxl.legData.id = 'leg4'
auxl.legData.position = new THREE.Vector3(0,-0.25,0.25);
auxl.leg4 = auxl.Core(auxl.legData);
//Ghost Layer
auxl.ghostLayerData = {
	parent: {core: auxl.ghostParent}, 
	child0: {
		parent: {core: auxl.eye1Socket}, 
		child0: {core: auxl.eye1Pupil}, 
	}, 
	child1: {
		parent: {core: auxl.eye2Socket}, 
		child0: {core: auxl.eye2Pupil}, 
	}, 
	child2: {core: auxl.mouth},
	child3: {
		parent: {core: auxl.spin}, 
		child0: {core: auxl.head}, 
		child1: {core: auxl.body}, 
		child2: {core: auxl.leg1}, 
		child3: {core: auxl.leg2}, 
		child4: {core: auxl.leg3}, 
		child5: {core: auxl.leg4}, 
	}, 
}
auxl.ghost = auxl.Layer('ghost',auxl.ghostLayerData);


//
//Companion
/*
//Parent
auxl.ghostParentData = {
data:'ghostParentData',
id:'ghostParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(0.9,0.9,0.9),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: {
['look-at']:'#camera',
},
};
auxl.ghostParent = auxl.Core(auxl.ghostParentData);
//EyeSocket
auxl.eyeSocketData = {
data:'eyeSocketData',
id:'eye1Socket',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.15,0.1,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: new THREE.Vector3(0.75,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Eye1Socket
auxl.eye1Socket = auxl.Core(auxl.eyeSocketData);
//Eye2Socket
auxl.eyeSocketData.id = 'eye2Socket';
auxl.eyeSocketData.position = new THREE.Vector3(0.15,0.1,0.4);
auxl.eye2Socket = auxl.Core(auxl.eyeSocketData);
//EyePupil
auxl.eyePupilData = {
data:'eyePupilData',
id:'eye1Pupil',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.1, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#1500fa", emissive: '#1500fa', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.25,1,1),
animations: {
lookdown: {property: 'position', to: new THREE.Vector3(0,0.01,0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookDown'},
lookup: {property: 'position', to: new THREE.Vector3(0,0.01,-0.07), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookUp'},
lookright: {property: 'position', to: new THREE.Vector3(0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookRight'},
lookleft: {property: 'position', to: new THREE.Vector3(-0.05,0.01,0), dur: 100, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'lookLeft'},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
//Eye1Pupil
auxl.eye1Pupil = auxl.Core(auxl.eyePupilData);
//Eye2Pupil
auxl.eyePupilData.id = 'eye2Pupil';
auxl.eye2Pupil = auxl.Core(auxl.eyePupilData);
//Mouth
auxl.mouthData = {
data:'mouthData',
id:'mouth',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
line:{start: new THREE.Vector3(-0.3,-0.2,0.41), end: new THREE.Vector3(-0.2,-0.15,0.41), color: 'white'},
['line__2']:{start: new THREE.Vector3(-0.2,-0.15,0.41), end: new THREE.Vector3(-0.1,-0.2,0.41), color: 'white'},
['line__3']:{start: new THREE.Vector3(-0.1,-0.2,0.41), end: new THREE.Vector3(0,-0.15,0.41), color: 'white'},
['line__4']:{start: new THREE.Vector3(0,-0.15,0.41), end: new THREE.Vector3(0.1,-0.2,0.41), color: 'white'},
['line__5']:{start: new THREE.Vector3(0.1,-0.2,0.41), end: new THREE.Vector3(0.2,-0.15,0.41), color: 'white'},
['line__6']:{start: new THREE.Vector3(0.2,-0.15,0.41), end: new THREE.Vector3(0.3,-0.2,0.41), color: 'white'},
},
};
auxl.mouth = auxl.Core(auxl.mouthData);
//Head
auxl.headData = {
data:'headData',
id:'head',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.head = auxl.Core(auxl.headData);
//Body
auxl.bodyData = {
data:'bodyData',
id:'body',
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.4, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.body = auxl.Core(auxl.bodyData);
//Ghost Layer
auxl.ghostLayerData = {
	parent: {core: auxl.ghostParent}, 
	child0: {
		parent: {core: auxl.eye1Socket}, 
		child0: {core: auxl.eye1Pupil}, 
	}, 
	child1: {
		parent: {core: auxl.eye2Socket}, 
		child0: {core: auxl.eye2Pupil}, 
	}, 
	child2: {core: auxl.mouth},
	child3: {
		parent: {core: auxl.spin}, 
		child0: {core: auxl.head}, 
		child1: {core: auxl.body}, 
		child2: {core: auxl.leg1}, 
		child3: {core: auxl.leg2}, 
		child4: {core: auxl.leg3}, 
		child5: {core: auxl.leg4}, 
	}, 
}
auxl.ghost = auxl.Layer('ghost',auxl.ghostLayerData);
*/



















//
//Cores

//Toggle Test
auxl.testCubeCoreData = {
data:'testCubeCoreData',
id:'testCubeCore',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: auxl.pattern17, repeat: '1 1', color: "#a53939", emissive: '#a53939', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,1.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.testCubeCore = auxl.Core(auxl.testCubeCoreData);

//Cube
auxl.cubeCoreData = {
data:'cubeCoreData',
id:'cubeCore',
sources: false,
text: false,
geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(1,1.5,-1.5),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.cubeCore = auxl.Core(auxl.cubeCoreData);

//Floor
auxl.floorData = {
	data:'floorData',
	id:'floor',
	sources:false,
	text: false,
	geometry: {primitive: 'circle', radius: 340, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#1e7e5d", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1e7e5d", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern49, repeat: '150 150'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(0.5,0.5,0.02),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: false,
};
auxl.floor = auxl.Core(auxl.floorData);

auxl.floor1Data = {
	data:'floor1Data',
	id:'floor1',
	sources:false,
	text: false,
	geometry: false,
	material: {shader: "standard", color: "#1caed1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#1caed1", emissiveIntensity: 0.2, side: 'front', src: auxl.pattern13, repeat: '150 150'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent', 'clickable'],
	components: {
	['obj-model']:{obj: './assets/3d/land/floor1.obj'},
	},
};
auxl.floor1 = auxl.Core(auxl.floor1Data);

//Ceiling
auxl.indoorCeilingData = {
	data:'indoorCeilingData',
	id:'indoorCeiling',
	sources:false,
	text: false,
	geometry: {primitive: 'plane', width: 20, height: 20,},
	material: {shader: "flat", src: auxl.pattern41, repeat: '20 20',color: "#642138", side: 'double'},
	position: new THREE.Vector3(0,8,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
auxl.indoorCeiling = auxl.Core(auxl.indoorCeilingData);

//
//Layers

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
auxl.cloudsParent = auxl.Core(auxl.cloudsParentData);
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
auxl.cloudData.id = 'cloud1';
auxl.cloudData.position = new THREE.Vector3(-150,200,-300);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud1 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud2';
auxl.cloudData.position = new THREE.Vector3(-150,200,200);
auxl.cloudData.scale = new THREE.Vector3(1,0.25,0.75);
auxl.cloud2 = auxl.Core(auxl.cloudData);
auxl.cloudData.id = 'cloud3';
auxl.cloudData.position = new THREE.Vector3(100,200,0);
auxl.cloudData.scale = new THREE.Vector3(0.5,0.5,0.25);
auxl.cloud3 = auxl.Core(auxl.cloudData);
auxl.cloudLayerData = {
	parent: {core: auxl.cloudsParent}, 
	child0: {core: auxl.cloud1}, 
	child1: {core: auxl.cloud2},
	child2: {core: auxl.cloud3},
}
auxl.clouds = auxl.Layer('clouds',auxl.cloudLayerData);


//
//ObjsGenRing

//Basic
auxl.basicData = {
	data:'basicData',
	id:'basic',
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
auxl.basicRingData = {
	id: 'basicRing',
	objData: auxl.basicData,
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
auxl.basicRing = auxl.ObjsGenRing(auxl.basicRingData);


//
//GLTF Models
//Used in MultiAssetGen

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


//
//MultiAssetGen

//Biome
auxl.tinyData = {
	data: 'tinyData',
	id: 'tiny',
	type: 'tiny',
	radius: 0.1,
	min: 20,
	max: 30,
	rings: 1,
	objs:[
		auxl.flower_purpleAData,
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
auxl.smallData = {
	data: 'smallData',
	id: 'small',
	type: 'small',
	radius: 0.25,
	min: 4,
	max: 8,
	rings: 2,
	objs:[
		auxl.shovelDirtData,
	],
	ranYPos: false,
	yPosFlex: 6,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 1,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.mediumData = {
	data: 'mediumData',
	id: 'medium',
	type: 'med',
	radius: 1,
	min: 30,
	max: 50,
	rings: 3,
	objs:[
		auxl.grass_largeData,
	],
	ranYPos: false,
	yPosFlex: 1,
	ranScaleX: true,
	ranScaleY: false,
	ranScaleZ: true,
	scaleFlex: 4,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.largeData = {
	data: 'largeData',
	id: 'large',
	type: 'large',
	radius: 2,
	min: 5,
	max: 10,
	rings: 4,
	objs:[
		auxl.rockLargeData,
	],
	ranYPos: false,
	yPosFlex: 2,
	ranScaleX: true,
	ranScaleY: true,
	ranScaleZ: true,
	scaleFlex: 1,
	ranRotX: false,
	ranRotY: true,
	ranRotZ: false,
	ranColor: false,
	ranTexture: false,
	ranAnim: false,
};
auxl.hugeData = {
	data: 'hugeData',
	id: 'huge',
	type: 'huge',
	radius: 4,
	min: 20,
	max: 40,
	rings: 5,
	objs:[
		auxl.pineData,
	],
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
	ranAnim: false,
};
auxl.biomeData = {
data:'biomeData',
id:'biome',
tiny: auxl.tinyData,
small: auxl.smallData,
med: auxl.mediumData,
large: auxl.largeData,
huge: auxl.hugeData,
};
auxl.biome = auxl.MultiAssetGen(auxl.biomeData);

//
//Horizon

//Hills
auxl.hillsData = {
id: 'hills',
type: 'hills',
texture: false,
baseColor: false,
baseColorFamily: 'olive',
radius: 200,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.hills = auxl.Horizon(auxl.hillsData);


//Indoor Wall
auxl.indoorWallData = {
id: 'indoorWall',
type: 'squareWall',
texture: {src: auxl.pattern18, repeat: '20 14', emissive: true,},
baseColor: '#80401f',
baseColorFamily: false,
radius: 10,
density: 'normal',
height: 'normal',
width: 'normal',
};
auxl.indoorWall = auxl.Horizon(auxl.indoorWallData);


//
//NPC

//Key Giver
auxl.npcKeyBubbleData = {
	data:'npcKeyBubbleData',
	id:'npcKeyBubble',
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
		['look-at']:'#camera',
	},
};
auxl.npcKeyBodyData = {
	data:'npcKeyBodyData',
	id:'npcKeyGiver',
	sources: false,
	text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
	geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
	material: {src: './assets/img/minty/4up.jpg', shader: "flat", color: "#FFFFFF", opacity: 1},
	position: new THREE.Vector3(0.5,1,-0.75),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		['look-at']:'#camera', 
	},
};
auxl.npcKeyPage1Data = {
	info:{
		id:'npcKeyPage1',
		description:'A basic example of a NPC with Speech.',
		tags:'npc',
		nextPage: null,
		prevPage: null,
		timeline:'linear',
	},
	timeline0:{
		self:{IfElse: {self:{cond: 'zone1Key',
		ifTrue: {
			self:{Speak:{speech:'Did you find where the Key goes?'}, Jump: {timeline: 'timeline2'},},
		},ifFalse: {
			self:{Speak:{role: '???', speech:'I found this key, but I don\'t know what it is used for. Would you like it?'}},},}}},
	},
	timeline1:{
		self:{Speak:{speech:'Here you go!'}, SetFlag: {flag: 'zone1Key', value: true}},
		player:{AddToInventory: 'zone1Key'},
	},
	timeline2:{
		self:{Speak:{speech:'Good luck finding where it goes!'}},
	},
	timeline3:{
		self: {ResetBook: true},
	},
};
auxl.npcKeyBookData = {
	info:{
		id:'npcKeyGiver',
		name: 'Key Giver',
		description:'A basic example of a NPC giving a Key.',
		tags:'npc',
		timeline: 'linear',
	},
	pages:{
		page0: auxl.npcKeyPage1Data,
	},
};
auxl.npcKeyBody = auxl.Core(auxl.npcKeyBodyData);
auxl.npcKeyBubble = auxl.Core(auxl.npcKeyBubbleData);
auxl.npcKeyGiver = auxl.NPC(auxl.npcKeyBody, auxl.npcKeyBookData, auxl.npcKeyBubble);


},
});

//auxl-scenes
//AUXL Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('auxl-scenes', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Scenarios

//Scenario Starter Example
//
//scenarioStarter
auxl.v03ScenesData = {
	info:{
		id: 'v03Scenes',
		name: 'v03 Scenes',
		scenarioNum: 0,
		default: true,
		startZone: 'zone0',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	controls:{
		//action1Down:{auxlObj: 'player', func: 'TestFunc', params: {test1: 1, test2: 2}},
		action1Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'movingUp'},
		action1Up:{auxlObj: 'playerRig', component: 'locomotion', func: 'cancelUp'},
		action2Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'movingDown'},
		action2Up:{auxlObj: 'playerRig', component: 'locomotion', func: 'cancelDown'},
		action3Down:{auxlObj: 'playerRig', component: 'locomotion', func: 'toggleSpeed'},
		//action3Down:{auxlObj: 'testCubeCore', func: 'ToggleSpawn',},
		action4Down:{auxlObj: 'player', func: 'ToggleSittingMode'},
		action5Down:{auxlObj: 'player', func: 'ToggleCrouch'},
		action6Down:{auxlObj: 'player', func: 'ToggleSittingMode'},
		action7Down:{auxlObj: 'player', func: 'SnapLeft'},
		action8Down:{auxlObj: 'player', func: 'SnapRight'},
	},
	start:{
		skyBox0:{SpawnSkyBox: null},
		ham:{SpawnHam: null},
		floor:{SpawnCore: null},
		clouds:{SpawnLayer: null},
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
auxl.v03Scenes = auxl.Scenario(auxl.v03ScenesData);

//
//World Atlas MapZones & NodeScenes

//
//Zone 0
auxl.zone0Data = {
	info:{
		id: 'zone0',
		name: 'Zone0',
		zoneNum: 0,
		start: 'zone0Scene0',
	},
	zone0Scene0:{
		connect0: {inZone: true, node: 'zone0Scene1',},
		connect1: {inZone: 'zone1', node: 'zone1Scene0', locked: true, key: 'zone1Key', keepKey: true},
	},
	zone0Scene1:{
		connect0: {inZone: true, node: 'zone0Scene0',},
	},
	controls:{
	},
	start:{
		cubeCore:{SpawnCore:null},
	},
	delay:{
		60000:{
			player:{Notification: {message:'1 Minute'}},
		},
	},
	interval:{
		6000: {
			run: {cubeCore:{EmitEvent: 'swapEvent'},}, loop: 'infinite'
		},
	},
	event:{
		swapEvent: {
			cubeCore:{IfElse: {cubeCore:{cond: 'testVar',
			ifTrue: {
				cubeCore:{EmitEvent: 'customevent1',SetFlag:{flag: 'testVar', value: false},},
			},ifFalse: {
				cubeCore:{EmitEvent: 'customevent2',SetFlag:{flag: 'testVar', value: true},},
			},}}},
		},
		customevent1: {
			cubeCore: {ChangeSelf: {property: 'material', value: {color: '#1da356', emissive: '#1da356'}}},
		},
		customevent2: {
			cubeCore: {ChangeSelf: {property: 'material', value: {color: '#a72fe6', emissive: '#a72fe6'}}},
		},
	},
	interaction:{
		click: {
			cubeCore:{EmitEvent:'swapEvent'},
		},
	},
	exit:{

	},
};

/*
	ghost:{EmitEventChild:[{child: 'eye1Pupil', eventName: 'lookRight'},{child: 'eye2Pupil', eventName: 'lookRight'}]},
	ghost:{EmitEventAll:'poweredDown'},
	ghost:{EmitEventAll:'poweredUp'},
*/

//Zone 0 Scene 0
auxl.zone0Scene0Data = {
	info:{
		id:'zone0Scene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: true,
	},
	controls:{

	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern49, repeat: '150 150',color: "#1e7e5d", emissive: "#1e7e5d",},}},
		biome:{SpawnMultiAsset:null},
		hills:{SpawnHorizon:null},
		teleport:{SpawnTeleport:null},
		test:{SpawnTest:null},
		ghost:{SpawnLayer:null},
		multiMenuTest:{SpawnMultiMenu:null},
	},
	delay:{
	},
	interval:{
		5000: {
			run: {ghost:{IfElse: {ghost: {cond: 'power',
			ifTrue: {
			ghost:{EmitEventAll: 'poweredDown',SetFlagParent:{flag: 'power', value: false},},
			},
			ifFalse: {
			ghost:{EmitEventAll: 'poweredUp',SetFlagParent:{flag: 'power', value: true},},
			},
			},}},}, loop: 2
		},
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: auxl.zone0Data.zone0Scene0,
	},
};
//Zone 0 Scene 1
auxl.zone0Scene1Data = {
	info:{
		id:'zone0Scene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:{property: 'material', value: {src: auxl.pattern67, repeat: '150 150',color: "#6f421a", emissive: "#6f421a",},}},
		indoorWall:{SpawnHorizon:null},
		indoorCeiling:{SpawnCore:null},
		npcKeyGiver:{SpawnNPC:null},
		teleport0:{SpawnTeleport:null},
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
		data: auxl.zone0Data.zone0Scene1,
	},
};
//Zone 0 Scene 0
auxl.zone0Scene0 = auxl.SceneNode(auxl.zone0Scene0Data);
//Zone 0 Scene 1
auxl.zone0Scene1 = auxl.SceneNode(auxl.zone0Scene1Data);
//Map Zone 0
auxl.zone0 = auxl.MapZone(auxl.zone0Data);




//
//Zone 1
auxl.zone1Data = {
	info:{
		id: 'zone1',
		name: 'Zone1',
		zoneNum: 0,
		start: 'zone1Scene0',
	},
	zone1Scene0:{
		connect0: {inZone: 'zone0', node: 'zone0Scene0',},
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
auxl.zone1Scene0Data = {
	info:{
		id:'zone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
	},
	controls:{
	},
	start:{
		floor:{ChangeSelf:[{property: 'material', value: {src: auxl.pattern80, repeat: '150 150',color: "#21679a", emissive: "#21679a",},},{property: 'position', value: new THREE.Vector3(0,0,0),},{property: 'raycast-teleportation', value: null,}],},
		basicRing:{SpawnObjRing:null},
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
		floor:{RemoveComponent:'raycast-teleportation'},
	},
	map:{
		data: auxl.zone1Data.zone1Scene0,
	},
};
//Zone 1 Scene 0
auxl.zone1Scene0 = auxl.SceneNode(auxl.zone1Scene0Data);
//Map Zone 1
auxl.zone1 = auxl.MapZone(auxl.zone1Data);

    },
});