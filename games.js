//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - Games

//
//AUXL Mini Game
//Unique Game system ObjGens
AFRAME.registerComponent('mini-games', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Memory Mini Game
auxl.MemoryGame = (id, data) => {
//ToDo
//Allow for importing of however many button objects to add complexity
//Listen for first click to start the countdown timer based on how long current sequence is and a timer for in-between single clicks to timeout as well
	let memory = {};
	memory.id = id;
	memory.inScene = false;
	//Layered Object Generation
	let layerData = {};
	let memoryNullParentData = {
	data:'memoryParentData',
	id:'memoryParent',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,1,-2),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['nullParent','a-ent'],
	components: false,
	};
	let memoryNullParent = auxl.Core(memoryNullParentData);
	layerData['parent'] = {};
	layerData['parent'].core = memoryNullParent;
	let memoryObjData = {};
	let memoryCores = {};
	for(let each in data){
		memoryObjData = data[each];
		memoryObjData.id = 'memory' + each;
		memoryCores[each] = auxl.Core(memoryObjData);
		layerData['child'+each] = {};
		layerData['child'+each].core = memoryCores[each];
	}
	memory.layer = auxl.Layer('memory',layerData);

	//UI
	//Game Status
	auxl.memoryUIData.text = {value:'High Score : 0 | Game Ready', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	auxl.memoryUIData.position = new THREE.Vector3(0,2.6,-2);
	auxl.memoryUIData.id = 'memoryUI1';
	let memoryUI1 =  auxl.Core(auxl.memoryUIData);

	//Sequence Status
	auxl.memoryUIData.text = {value:'Sequence : *', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'};
	auxl.memoryUIData.position = new THREE.Vector3(0,0.35,-2);
	auxl.memoryUIData.id = 'memoryUI2';
	let memoryUI2 =  auxl.Core(auxl.memoryUIData);

	//Game Support
	let playSequenceInterval;
	let roundCompleteTimeout1;
	let roundCompleteTimeout2;
	let gameOverTimeout1;
	let gameOverTimeout2;
	let allSequence = [];
	let playerSequence = [];
	let currInSequence = 0;
	let currMaxSequence = 1;
	let sequenceRef = '*';
	let sequenceTempArray = [];
	let currentScore = 0;
	let highScore = 0;
	let sequenceChunk = 5;
	let pauseClick = true;
	let gameStarted = false;

	//Add memoryClick() Listeners to all Memory Buttons
	const AddSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().addEventListener('click', memoryClick);
		}
	}
	//Remove memoryClick() Listeners from all Memory Buttons
	const RemoveSequenceListeners = () => {
		for(let each in memoryCores){
			memoryCores[each].GetEl().removeEventListener('click', memoryClick);
		}
	}
	//Spawn Memory Game
	const SpawnMemGame = () => {
		if(memory.inScene){}else{
			memory.layer.SpawnLayer();
			memoryUI1.SpawnCore();
			memoryUI2.SpawnCore();
			AddSequenceListeners();
			GameSpawnMenu();
			memory.inScene = true;
		}
	}
	//Despawn Memory Game
	const DespawnMemGame = () => {
		if(memory.inScene){
			RemoveSequenceListeners();
			memory.gameMenu.DespawnMenu()
			memory.layer.DespawnLayer();
			memoryUI1.DespawnCore();
			memoryUI2.DespawnCore();
			memory.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(memory.inScene){
			DespawnMemGame();
		} else {
			SpawnMemGame();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			memory[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			memory[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(memory(flag[each]));
			}
			return flagArray;
		} else {
			return memory[flag];
		}
	}
	//Start Memory Game
	const StartGame = () => {
		GenRanSequence();
		gameStarted = true;
		memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Game Started'}});
		memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		PlaySequence();
	}
	//Build Level Sequence
	const GenRanSequence = () => {
		for(let a = 0; a < sequenceChunk; a++){
			allSequence.push(Math.floor(Math.random()*4))
		}
		//console.log(allSequence);
	}
	//Play Level Sequence
	const PlaySequence = () => {
		//console.log('Playing Sequence');
		pauseClick = true;
		if(currMaxSequence >= allSequence.length){
			GenRanSequence();
		}
		let current = 0;
		playSequenceInterval = setInterval(function() {
			memoryCores[allSequence[current]].EmitEvent('select');
			current++;
			if(current >= currMaxSequence){
				pauseClick = false;
				clearInterval(playSequenceInterval);
			}
		}, 750);
	}
	//Check Level Sequence
	const CheckSequence = () => {
		//console.log(allSequence);
		//console.log(playerSequence);
		//console.log(currInSequence);
		//console.log(playerSequence[currInSequence]);
		//console.log(allSequence[currInSequence]);
		if(playerSequence[currInSequence] === allSequence[currInSequence]){
			//console.log('Match');
			currInSequence++;
			//push selection to front of sequenceRef and remove the last item
			sequenceTempArray.unshift('X');
			sequenceTempArray.pop();
			sequenceRef = sequenceTempArray.join("");
			memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
		} else {
			//console.log('Game Over');
			gameStarted = false;
			if(currMaxSequence-1 > highScore){
				highScore = currMaxSequence-1;
				//console.log('New High Score : ' + highScore);
			} else {
				//let currentScore = currMaxSequence-1;
				//console.log('Sequence Score : ' + currentScore);
			}
			gameOverTimeout1 = setTimeout(function () {
				gameOverAnim();
				gameOverTimeout2 = setTimeout(function () {
					ResetGame();
					clearTimeout(gameOverTimeout2);
				}, 2000);
			}, 250);
		}
		if(currInSequence >= currMaxSequence){
			//console.log('Correct Sequence');
			currInSequence = 0;
			currMaxSequence++;
			currentScore++;
			memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Current : ' + currentScore}});
			sequenceTempArray = [];
			for(let a = 1; a <= currMaxSequence; a++){
				sequenceTempArray.push('*');
			}
			sequenceRef = sequenceTempArray.join("");
			memoryUI2.ChangeSelf({property: 'text', value: {value: 'Sequence : '+sequenceRef}});
			playerSequence = [];
			roundCompleteTimeout1 = setTimeout(function () {
				roundCompleteAnim();
				roundCompleteTimeout2 = setTimeout(function () {
					PlaySequence();
					clearTimeout(roundCompleteTimeout2);
				}, 1500);
				clearTimeout(roundCompleteTimeout1);
			}, 250);
		}
	}
	//Reset Game
	const ResetGame = () => {
		clearInterval(playSequenceInterval);
		clearTimeout(roundCompleteTimeout1);
		clearTimeout(roundCompleteTimeout2);
		currentScore = 0;
		currInSequence = 0;
		currMaxSequence = 1;
		allSequence = [];
		playerSequence = [];
		sequenceTempArray = [];
		pauseClick = true;
		gameStarted = false;
		memoryUI1.ChangeSelf({property: 'text', value: {value: 'High Score : '+highScore+' | Game Over'}});
	}
	//Handle Memory Clicks & Check Sequence
	function memoryClick(){
		if(pauseClick){}else{
			//console.log('Memory Click')
			//console.log(this.id)
			let selection;
			if(this.id === 'memory0'){
				selection = 0;
			} else if(this.id === 'memory1'){
				selection = 1;
			} else if(this.id === 'memory2'){
				selection = 2;
			} else if(this.id === 'memory3'){
				selection = 3;
			}
			playerSequence.push(selection);
			CheckSequence();
		}
	}
	//Play Round Complete Animation
	function roundCompleteAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('roundComplete');
		}
	}
	//Play Game Over Animation
	function gameOverAnim(){
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('gameOver');
		}
	}
	//Spawn Game Menu
	const GameSpawnMenu = () => {
		memory.GameMenuData = {
			id: 'memoryGameMenu',
			prompt: 'Memory Game',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: 'memory',
			method: 'GameMenuClick',
			pos: new THREE.Vector3(0.75,1.55,-2),
		}
		memory.GameMenuData.options['option'+0] = 'Play Game';
		memory.GameMenuData.actions['action'+0] = 'playGame';
		memory.GameMenuData.options['option'+1] = 'Reset Game';
		memory.GameMenuData.actions['action'+1] = 'resetGame';

		memory.gameMenu = auxl.Menu(memory.GameMenuData);
		memory.gameMenu.SpawnMenu();
	}
	//Handle Game Menu Click
	const GameMenuClick = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);
		if(result === 'playGame'){
			if(gameStarted){}else{
				StartGame();
			}
		} else if(result === 'resetGame'){
			if(gameStarted){
				ResetGame();
			}
		}
	}

	return{memory, SpawnMemGame, DespawnMemGame, ToggleSpawn, GameMenuClick, SetFlag, GetFlag};
}


//Move these into Memory Game

//Memory 0
auxl.memory0Data = {
data:'0',
id:'memory0',
sources:false,
text: false,
geometry: {primitive: 'triangle', vertexA: '0 0.5 0', vertexB: '-0.5 -0.5 0', vertexC: '0.5 -0.5 0'},
material: {shader: "standard", color: "#3EB489", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3EB489", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(-0.6,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 1
auxl.memory1Data = {
data:'1',
id:'memory1',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 0.75, height: 0.75,},
material: {shader: "standard", color: "#C14B76", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#C14B76", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0.6,1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 2
auxl.memory2Data = {
data:'2',
id:'memory2',
sources:false,
text: false,
geometry: {primitive: 'plane', width: 0.15, height: 0.75,},
material: {shader: "standard", color: "#ce782f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ce782f", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(-0.6,0,0),
rotation: new THREE.Vector3(0,0,45),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory 3
auxl.memory3Data = {
data:'3',
id:'memory3',
sources:false,
text: false,
geometry: {primitive: 'circle', radius: 0.5, segments: 16, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#4b54c1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#4b54c1", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0.6,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click, select'},
roundcomplete: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'roundComplete'},
gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
},
mixins: false,
classes: ['clickable','memory','a-ent'],
components: false,
};
//Memory UI
auxl.memoryUIData = {
data:'memoryUIData',
id:'memoryUI',
sources:false,
text: {value:'Memory Game UI', wrapCount: 45, color: "#FFFFFF", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
geometry: {primitive: 'plane', width: '2', height: '0.25'},
material: {shader: "standard", color: "#3EB489", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3EB489", emissiveIntensity: 0.2, side: 'double'},
position: new THREE.Vector3(0,2.6,-2),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['memory','a-ent'],
components: false,
};
//Memory Example
auxl.memory = auxl.MemoryGame('memory',[auxl.memory0Data,auxl.memory1Data,auxl.memory2Data,auxl.memory3Data]);

//
//Pet Mini Game
auxl.Pet = (petData) => {

	let pet = Object.assign({}, petData);

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
//Pet Object
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


//Swipe Launch
//Intersect In/Out as many times as you can to build up a meter and click to finalize it within a time frame to launch it a distance
auxl.SwipeLaunchGame = (id) => {
//ToDo
//Add a build up animation to visualize building power
//Add a launch animation to visualize total power hit
//Speed up power display animation on power greater than 1000 either by time or number

	let swipeLaunch = {};
	swipeLaunch.id = id;
	//Main Core
	swipeLaunch.data = {
	data:'swipeLaunchData',
	id:'swipeLaunchCore',
	sources: false,
	text: false,
	geometry: {primitive: 'sphere', radius: 0.5},
	material: {shader: "standard", src: auxl.pattern37, repeat: '1 1', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,1,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	swipeLaunch.core = auxl.Core(swipeLaunch.data);
	//Current Time
	swipeLaunch.displayTimeData = {
	data:'displayTimeData',
	id:'displayTime',
	sources:false,
	text: {value:'Ready?', color: "#FFFFFF", align: "left", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center', align: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.3, height: 0.3},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(0,1.75,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable' ,'a-ent'],
	components: false,
	};
	swipeLaunch.displayTime = auxl.Core(swipeLaunch.displayTimeData);
	//Current Score
	swipeLaunch.displayScoreData = {
	data:'displayScoreData',
	id:'displayScore',
	sources:false,
	text: {value:'0 meters', color: "#FFFFFF", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center', align: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.3, height: 0.3},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(0,2.25,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	swipeLaunch.displayScore = auxl.Core(swipeLaunch.displayScoreData);
	//High Scores
	swipeLaunch.highScores = {};
	swipeLaunch.highScores.score1 = 0;
	swipeLaunch.highScores.name1 = 0;
	swipeLaunch.highScores.score2 = 0;
	swipeLaunch.highScores.name2 = 0;
	swipeLaunch.highScores.score3 = 0;
	swipeLaunch.highScores.name3 = 0;
	swipeLaunch.highScores.score4 = 0;
	swipeLaunch.highScores.name4 = 0;
	swipeLaunch.highScores.score5 = 0;
	swipeLaunch.highScores.name5 = 0;
	swipeLaunch.highScores.text = '1. Name : 0 Meters\n2. Name : 0 Meters\n3. Name : 0 Meters\n4. Name : 0 Meters\n5. Name : 0 Meters\n';
	//High Score List
	swipeLaunch.highScoreData = {
	data:'highScoreData',
	id:'highScore',
	sources:false,
	text: {value: swipeLaunch.highScores.text, color: "#FFFFFF", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center', align: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.75, height: 0.4},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(1,2.25,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	swipeLaunch.highScore = auxl.Core(swipeLaunch.highScoreData);
	//How To Play Instructions
	swipeLaunch.instructionsData = {
	data:'instructionsData',
	id:'instructions',
	sources:false,
	text: {value:'How To Play?\nClick the Ready button to start the 3 second countdown.\nOn completion, you will have 6 seconds to hover on and off the ball as many times as you can.\nBefore the timer hits 0, click the ball to launch it.\nThe more times you hover and the closer you get to 0 when clicked, the more power to launch!', color: "#FFFFFF", font: "exo2bold", width: 0.45, zOffset: 0.025, side: 'front', wrapCount: 25, baseline: 'center', align: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.75},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(1,1.25,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	swipeLaunch.instructions = auxl.Core(swipeLaunch.instructionsData);

	//Game Var
	swipeLaunch.starting = false;
	swipeLaunch.start = false;
	swipeLaunch.time = 6000;
	swipeLaunch.timeDisplay = 6;
	swipeLaunch.countdownTimeout;
	swipeLaunch.countdownInterval;
	swipeLaunch.in = false;
	swipeLaunch.out = true;
	swipeLaunch.launch = false;
	swipeLaunch.hits = 0;
	swipeLaunch.power = 0;
	swipeLaunch.powerDisplay = 0;

	//Build High Score Text
	function refreshHighScoreText(){
		swipeLaunch.highScores.text = '1. '+swipeLaunch.highScores.name1+' : '+swipeLaunch.highScores.score1.toFixed(2)+' Meters\n2. '+swipeLaunch.highScores.name2+' : '+swipeLaunch.highScores.score2.toFixed(2)+' Meters\n3. '+swipeLaunch.highScores.name3+' : '+swipeLaunch.highScores.score3.toFixed(2)+' Meters\n4. '+swipeLaunch.highScores.name4+' : '+swipeLaunch.highScores.score4.toFixed(2)+' Meters\n5. '+swipeLaunch.highScores.name5+' : '+swipeLaunch.highScores.score5.toFixed(2)+' Meters\n';
		swipeLaunch.highScore.ChangeSelf({property:'text',value:{value:swipeLaunch.highScores.text}});
		auxl.saveToProfile({auxlObject: swipeLaunch.id, type: 'swipeLaunch', sub: false, name: 'highScores', data: swipeLaunch.highScores});
	}
	//Check for High Score
	function checkHighScore(score){
		if(score > swipeLaunch.highScores.score1){
			swipeLaunch.highScores.score5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score4));
			swipeLaunch.highScores.name5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name4));
			swipeLaunch.highScores.score4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score3));
			swipeLaunch.highScores.name4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name3));
			swipeLaunch.highScores.score3 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score2));
			swipeLaunch.highScores.name3 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name2));
			swipeLaunch.highScores.score2 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score1));
			swipeLaunch.highScores.name2 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name1));
			swipeLaunch.highScores.score1 = score;
			swipeLaunch.highScores.name1 = auxl.local.profile.shortname;
			refreshHighScoreText();
			return;
		} else if(score > swipeLaunch.highScores.score2){
			swipeLaunch.highScores.score5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score4));
			swipeLaunch.highScores.name5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name4));
			swipeLaunch.highScores.score4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score3));
			swipeLaunch.highScores.name4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name3));
			swipeLaunch.highScores.score3 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score2));
			swipeLaunch.highScores.name3 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name2));
			swipeLaunch.highScores.score2 = score;
			swipeLaunch.highScores.name2 = auxl.local.profile.shortname;
			refreshHighScoreText();
			return;
		} else if(score > swipeLaunch.highScores.score3){
			swipeLaunch.highScores.score5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score4));
			swipeLaunch.highScores.name5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name4));
			swipeLaunch.highScores.score4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score3));
			swipeLaunch.highScores.name4 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name3));
			swipeLaunch.highScores.score3 = score;
			swipeLaunch.highScores.name3 = auxl.local.profile.shortname;
			refreshHighScoreText();
			return;
		} else if(score > swipeLaunch.highScores.score4){
			swipeLaunch.highScores.score5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.score4));
			swipeLaunch.highScores.name5 = JSON.parse(JSON.stringify(swipeLaunch.highScores.name4));
			swipeLaunch.highScores.score4 = score;
			swipeLaunch.highScores.name4 = auxl.local.profile.shortname;
			refreshHighScoreText();
			return;
		} else if(score > swipeLaunch.highScores.score5){
			swipeLaunch.highScores.score5 = score;
			swipeLaunch.highScores.name5 = auxl.local.profile.shortname;
			refreshHighScoreText();
			return;
		}
	}
	//Reset
	function reset(){
		swipeLaunch.start = false;
		swipeLaunch.time = 6000;
		swipeLaunch.timeDisplay = 6;
		swipeLaunch.countdownTimeout;
		swipeLaunch.in = false;
		swipeLaunch.out = true;
		swipeLaunch.launch = false;
		swipeLaunch.hits = 0;
		swipeLaunch.power = 0;
		swipeLaunch.powerDisplay = 0;
	};
	//Update Time Text
	function updateTimeText(text){
		swipeLaunch.displayTime.ChangeSelf({property: 'text', value:{value:text}})
	};
	//Update Power Text
	function updatePowerText(text){
		swipeLaunch.displayScore.ChangeSelf({property: 'text', value:{value:text}})
	};
	//Game Start Countdown
	function countdownPrep(){
		if(swipeLaunch.starting){}else{
			swipeLaunch.starting = true;
			reset();
			updateTimeText('3');
			swipeLaunch.starting2 = setTimeout(() => {
				updateTimeText('2');
				swipeLaunch.starting1 = setTimeout(() => {
					updateTimeText('1');
					swipeLaunch.starting0 = setTimeout(() => {
						updateTimeText('GO');
						Start();
						clearTimeout(swipeLaunch.starting0);
						clearTimeout(swipeLaunch.starting1);
						clearTimeout(swipeLaunch.starting2);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}
	//Game Start
	function Start(time){
		swipeLaunch.start = true;
		swipeLaunch.timeDisplay = swipeLaunch.time/1000;
		swipeLaunch.countdownInterval = setInterval(() => {
			swipeLaunch.timeDisplay -= 0.01;
			swipeLaunch.time -= 10;
			if(swipeLaunch.timeDisplay <= 0){
				if(swipeLaunch.launch){}else{
					updateTimeText('TIME!');
					swipeLaunch.start = false;
					gameOver();
				}
				clearInterval(swipeLaunch.countdownInterval);
			} else {
				updateTimeText(swipeLaunch.timeDisplay.toFixed(2));
			}
		}, 10);
	}
	//Hover On Hit
	function hoverOn(){
		if(swipeLaunch.start){
			if(swipeLaunch.in){}else{
				swipeLaunch.in = true;
				swipeLaunch.hits++;
			}
		}
	};
	//Hover Off Reset
	function hoverOff(){
		if(swipeLaunch.start){
			if(swipeLaunch.in){
				swipeLaunch.in = false;
			}
		}
	};
	//Launch
	function launch(){
		if(swipeLaunch.start){
			swipeLaunch.start = false;
			swipeLaunch.launch = true;
			clearInterval(swipeLaunch.countdownInterval);
			let exp = 1.41;
			exp = exp + (((swipeLaunch.hits*17)/swipeLaunch.time) * 0.01);
			swipeLaunch.power = Math.pow(swipeLaunch.hits, exp);

			displayPowerFast();
			console.log('Launch');
			console.log(swipeLaunch.hits);
			console.log(swipeLaunch.power);
		}
	};
	//Display Power Fast
	function displayPowerFast(){
		console.log('displayPowerFast');
		let addTo = 1;
		let slowTotal = swipeLaunch.power * 0.975;
		swipeLaunch.powerDisplayFastInterval = setInterval(() => {
			swipeLaunch.powerDisplay += addTo;
			updatePowerText(swipeLaunch.powerDisplay.toFixed(2));
			if(swipeLaunch.powerDisplay >= slowTotal){
				displayPowerSlow();
				clearInterval(swipeLaunch.powerDisplayFastInterval);
			}
		}, 10);
	}
	//Display Power Slow
	function displayPowerSlow(){
		console.log('displayPowerSlow');
		let addTo = 0.1;
		let slowerTotal = swipeLaunch.power * 0.999;
		swipeLaunch.powerDisplaySlowInterval = setInterval(() => {
			swipeLaunch.powerDisplay += addTo;
			updatePowerText(swipeLaunch.powerDisplay.toFixed(2));
			if(swipeLaunch.powerDisplay >= slowerTotal){
				displayPowerSlower();
				clearInterval(swipeLaunch.powerDisplaySlowInterval);
			}
		}, 50);
	}
	//Display Power Slower
	function displayPowerSlower(){
		console.log('displayPowerSlower');
		let addTo = 0.01;
		swipeLaunch.powerDisplaySlowerInterval = setInterval(() => {
			swipeLaunch.powerDisplay += addTo;
			if(swipeLaunch.powerDisplay >= swipeLaunch.power){
				updatePowerText(swipeLaunch.power.toFixed(2));
				gameOver();
				clearInterval(swipeLaunch.powerDisplaySlowerInterval);
			} else {
				updatePowerText(swipeLaunch.powerDisplay.toFixed(2));
			}
		}, 100);
	}
	//Game Over
	function gameOver(){
		checkHighScore(swipeLaunch.power);
		swipeLaunch.gameOver = setTimeout(() => {
			updateTimeText('Ready?');
			swipeLaunch.start = false;
			swipeLaunch.starting = false;
			updatePowerText('0');
			clearTimeout(swipeLaunch.gameOver);
		}, 3000);
	};
	//Spawn Game
	const SpawnSLGame = () => {
		swipeLaunch.core.SpawnCore();
		swipeLaunch.displayTime.SpawnCore();
		swipeLaunch.displayScore.SpawnCore();
		swipeLaunch.highScore.SpawnCore();
		refreshHighScoreText();
		swipeLaunch.instructions.SpawnCore();
		swipeLaunch.core.GetEl().addEventListener('mouseenter', hoverOn);
		swipeLaunch.core.GetEl().addEventListener('mouseleave', hoverOff);
		swipeLaunch.core.GetEl().addEventListener('mousedown', launch);
		swipeLaunch.displayTime.GetEl().addEventListener('mousedown', countdownPrep);
	}
	//Despawn Game
	const DespawnSLGame = () => {
		swipeLaunch.core.GetEl().removeEventListener('mouseenter', hoverOn);
		swipeLaunch.core.GetEl().removeEventListener('mouseleave', hoverOff);
		swipeLaunch.core.GetEl().removeEventListener('mousedown', launch);
		swipeLaunch.displayTime.GetEl().removeEventListener('mousedown', countdownPrep);
		swipeLaunch.core.DespawnCore();
		swipeLaunch.displayTime.DespawnCore();
		swipeLaunch.displayScore.DespawnCore();
		swipeLaunch.highScore.DespawnCore();
		swipeLaunch.instructions.DespawnCore();
	}

	return {swipeLaunch, SpawnSLGame, DespawnSLGame};

}
auxl.swipeLaunchGame = auxl.SwipeLaunchGame('swipeLaunchGame');


//Guess Hit
//Guesstimate intersection point selection on ceiling that would match objects on floor. Like a claw machine.
auxl.GuessHitGame = (id) => {

//Block movement out of inner area

//Types per Level to cycle through
//Type 1 : Circle radius around user
//Type 2 : Rectangle longwise away from user
//Type 3 : Ring radius around user

//Load 4 objects in random positions within field range

//User has 10 click chances to hit them all. If user fails to hit at least 3 out of 4, game over.

//As Level progresses, object gets smaller

	let guessHit = {};
	guessHit.id = id;

	//Fields
	//Field 1 : Circle
	//Field 2 : Rectangle
	//Field 3 : Ring
	guessHit.fieldData = {
	data:'fieldData',
	id:'field',
	sources: false,
	text: false,
	geometry: {primitive: 'circle', radius: 30},
	material: {shader: "standard", src: auxl.pattern37, repeat: '1 1', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,10,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	guessHit.field = auxl.Core(guessHit.fieldData);

	//Guessing Objects
	//Guess1
	guessHit.guessData = {
	data:'guessData',
	id:'guess1',
	sources: false,
	text: false,
	geometry: {primitive: 'box', width: 1, height: 0.5, depth: 1},
	material: {shader: "standard", src: auxl.pattern37, repeat: '1 1', color: "#3e82b4", emissive: '#3e82b4', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,0.25,-3),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	guessHit.guess1 = auxl.Core(guessHit.guessData);
	guessHit.guessData.id = 'guess2';
	guessHit.guess2 = auxl.Core(guessHit.guessData);
	guessHit.guessData.id = 'guess3';
	guessHit.guess3 = auxl.Core(guessHit.guessData);
	guessHit.guessData.id = 'guess4';
	guessHit.guess4 = auxl.Core(guessHit.guessData);
	//Display on click
	guessHit.hitData = {
	data:'hitData',
	id:'hit',
	sources: false,
	text: false,
	geometry: {primitive: 'cylinder', radius: 1, height: 20,},
	material: {shader: "standard", src: auxl.pattern37, repeat: '1 1', color: "#ddd517", emissive: '#ddd517', emissiveIntensity: 0.25, opacity: 0.25},
	position: new THREE.Vector3(0,4,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	guessHit.hit = auxl.Core(guessHit.hitData);
	//Total Point Display
	guessHit.displayData = {
	data:'displayData',
	id:'displayTotal',
	sources:false,
	text: {value:'Level 1-1 | 0pts', color: "#FFFFFF", font: "exo2bold", width: 1.9, zOffset: 0.025, side: 'front', wrapCount: 75, baseline: 'center', align: 'center'},
	geometry: {primitive: 'box', depth: 0.025, width: 0.5, height: 0.3},
	material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
	position: new THREE.Vector3(0,1.75,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	guessHit.displayTotal = auxl.Core(guessHit.displayData);
	//Miss, Hit & Hit Point Display
	guessHit.displayData.id = 'displayCurrent';
	guessHit.displayData.position = new THREE.Vector3(0,2.25,-0.5);
	guessHit.displayData.text.value = 'Ready\n4 Left\n10 Tries';
	guessHit.displayData.classes = ['clickable' ,'a-ent'];
	guessHit.displayCurrent = auxl.Core(guessHit.displayData);

	//Game Var
	guessHit.start = false;
	guessHit.hitSpawned = false;
	guessHit.points = 0;
	guessHit.type = 1;
	guessHit.level = 1;
	guessHit.clicks = 10;
	guessHit.spawnRadius = 12.5;
	guessHit.hitRadius = 1;
	guessHit.checkFor = [guessHit.guess1, guessHit.guess2, guessHit.guess3, guessHit.guess4];

	//Reduce Decimals
	function reduceDecimal(num, x){
		return Math.round(num * Math.pow(10,x)) / Math.pow(10,x);
	}
	//Function to calculate distance between two points
	function distance(x1, y1, x2,  y2) {
		//Calculating distance
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
	}
	//Randomly spawn guess at XZ
	function ranPos(object, type){

		let newX;
		let newZ;
		if(type === 1){
			newX = (Math.random()*(25))-12.5;
			newZ = (Math.random()*(25))-12.5;
		} else if(type === 2){
			//Rectangle
			newX = (Math.random()*20)-10;
			newZ = (Math.random()*28)*-1;
		} else {
			//Ring
			newX = (Math.random()*60)-30;
			if(newX > 10 && newX > -10){
				if(newX > 0){
					newX += 10;
				} else {
					newX -= 10;
				}
			}
			newZ = (Math.random()*60)-30;
			if(newZ > 10 && newZ > -10){
				if(newZ > 0){
					newZ += 10;
				} else {
					newZ -= 10;
				}
			}
		}

		guessHit[object].core.position = new THREE.Vector3(newX,0.25,newZ);

	}
	//On click off click object, use intersection XZ to see if it is within radius
	function checkForHit(event){
		guessHit.clicks--;

		let hit = false;

		let guessPos = event.detail.intersection.point;

		spawnHit();
		guessHit.hit.ChangeSelf({property: 'position', value: new THREE.Vector3(guessPos.x,4,guessPos.z)});

		let checkHit;
		for(let guess in guessHit.checkFor){
			updateHitColor('yellow');
			checkHit = distance(guessHit.checkFor[guess].core.position.x, guessHit.checkFor[guess].core.position.z, guessPos.x, guessPos.z);
			if(checkHit < guessHit.hitRadius){
				hit = true;
				let bonus = guessHit.hitRadius / checkHit;
				if(checkHit === 0){
					//Perfect hit, mega bonus
					bonus = 100;
				} else {
					bonus = guessHit.hitRadius / checkHit;
					bonus = reduceDecimal(bonus, 2);
					if(bonus > 10){
						bonus = 10;
					}
				}
				guessHit.checkFor[guess].DespawnCore();
				guessHit.checkFor.splice(guessHit.checkFor.indexOf(guessHit.checkFor[guess]), 1);
				let points = 10*bonus;
				points = reduceDecimal(points, 2);
				guessHit.points += points;
				guessHit.points = reduceDecimal(guessHit.points, 2);
				updateTotalText('Level ' + guessHit.level + '-' + guessHit.type + ' | ' + guessHit.points + 'pts');
				if(guessHit.checkFor.length <= 0){
					updateCurrentText('Hit! | ' + points + '\n'+ 'Complete!\nStart Next?');
					guessHit.displayCurrent.GetEl().addEventListener('click', next);
					guessHit.field.GetEl().removeEventListener('click',checkForHit);
				} else {
					updateCurrentText('Hit! | ' + points + '\n'+ guessHit.checkFor.length + ' Left\n' + guessHit.clicks + ' Tries');
				}
				break;
			}
		}
		if(hit){}else{
			updateHitColor('red');
			updateCurrentText('Miss | ' + guessHit.clicks + ' Tries');
			updateCurrentText('Miss\n' + guessHit.checkFor.length + ' Left\n' + guessHit.clicks + ' Tries');
		}
		if(guessHit.checkFor.length > 0){
			if(guessHit.clicks <= 0){
				gameOver();
			}
		}
	}
	//Load Objects
	function loadObjects(type){
		guessHit.checkFor = [guessHit.guess1, guessHit.guess2, guessHit.guess3, guessHit.guess4];
		ranPos('guess1', type);
		guessHit.guess1.SpawnCore();
		ranPos('guess2', type);
		guessHit.guess2.SpawnCore();
		ranPos('guess3', type);
		guessHit.guess3.SpawnCore();
		ranPos('guess4', type);
		guessHit.guess4.SpawnCore();
	}
	//Unload Objects
	function unloadObjects(){
		for(let guess in guessHit.checkFor){
			guessHit.checkFor[guess].DespawnCore();
			guessHit.checkFor.splice(guessHit.checkFor.indexOf(guessHit.checkFor[guess]), 0);
		}

	}
	//Start Game
	function start(){
		reset();
		updateCurrentText('Ready\n4 Left\n10 Tries');
		guessHit.field.GetEl().addEventListener('click',checkForHit);
		loadObjects(guessHit.type);
		guessHit.displayCurrent.GetEl().removeEventListener('click', start);
	}
	//Game Over
	function gameOver(){
		updateCurrentText('Game Over\nRestart?');
		guessHit.displayCurrent.GetEl().addEventListener('click', start);
		guessHit.field.GetEl().removeEventListener('click',checkForHit);
		unloadObjects();
		DespawnHit();
	}
	//Spawn Hit
	function spawnHit(){
		if(guessHit.hitSpawned){}else{
			guessHit.hitSpawned = true;
			guessHit.hit.SpawnCore();
		}
	}
	//Despawn Hit
	function DespawnHit(){
		if(guessHit.hitSpawned){
			guessHit.hitSpawned = false;
			guessHit.hit.DespawnCore();
		}
	}
	//Next Type/Level
	function reset(){
		guessHit.points = 0;
		guessHit.level = 1;
		guessHit.type = 1;
		guessHit.clicks = 10;
		guessHit.hitRadius = 1;
		updateField(1);
	}
	//Next Type/Level
	function next(){
		updateCurrentText('Ready\n4 Left\n10 Tries');
		guessHit.displayCurrent.GetEl().removeEventListener('click', next);
		guessHit.type++;
		if(guessHit.type === 4){
			guessHit.level++;
			guessHit.type = 1;
		}
		updateField(guessHit.type);
		updateTotalText('Level ' + guessHit.level + '-' + guessHit.type + ' | ' + guessHit.points + 'pts');
		loadObjects(guessHit.type);
		//change field type
		guessHit.clicks = 10;
		DespawnHit();
		guessHit.field.GetEl().addEventListener('click',checkForHit);
	}
	//Display Current Text
	function updateCurrentText(text){
		guessHit.displayCurrent.ChangeSelf({property: 'text', value:{value:text}})
	};
	//Display Total Score Text
	function updateTotalText(text){
		guessHit.displayTotal.ChangeSelf({property: 'text', value:{value:text}})
	};
	//Update Hit Color
	function updateHitColor(color){
		guessHit.hit.ChangeSelf({property: 'material', value:{color: color, emissive: color}});
	}
	//Update Field Type
	function updateField(type){
		let geo = {};
		let position = new THREE.Vector3(0,10,0);
		if(type === 1){
			geo = {primitive: 'circle', radius: 30};
			position = new THREE.Vector3(0,10,0);
		} else if(type === 2){
			geo = {primitive: 'plane', height: 30, width: 20};
			position = new THREE.Vector3(0,10,-15);
		} else {
			geo = {primitive: 'ring', radiusInner: 10, radiusOuter: 60, segmentsPhi: 8, segmentsTheta: 32, thetaStart: 0, thetaLength: 360};
			position = new THREE.Vector3(0,10,0);
		}
		guessHit.field.ChangeSelf([{property: 'geometry', value:geo},{property: 'position', value: position}]);
	}

	//Spawn Game
	const SpawnGHGame = () => {
		guessHit.field.SpawnCore();
		guessHit.displayTotal.SpawnCore();
		guessHit.displayCurrent.SpawnCore();
		start();
	}
	//Despawn Game
	const DespawnGHGame = () => {
		unloadObjects();
		DespawnHit();
		guessHit.displayTotal.DespawnCore();
		guessHit.displayCurrent.DespawnCore();
		guessHit.field.DespawnCore();
	}

	return {guessHit, SpawnGHGame, DespawnGHGame};
}
auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');


//Drag Diffuse
//Drag from center to randomly spawned outward point before it times out/explodes
auxl.DragDiffuse = (id) => {

	let dragDiffuse = {};
	dragDiffuse.id = id;

	dragDiffuse.gameParentData = {
	data:'gameParentData',
	id:'gameParent',
	sources:false,
	text: false,
	geometry: {primitive: 'sphere', radius: 0.5, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
	material: {shader: "standard", color: "#8c39a5", emissive: '#8c39a5', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,1.25,-3),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	dragDiffuse.gameParent = auxl.Core(dragDiffuse.gameParentData);

	dragDiffuse.dragParentData = {
	data:'dragParentData',
	id:'dragParent',
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
	components: false,
	};
	dragDiffuse.dragParentData.id = 'dragParent1';
	dragDiffuse.dragParent1 = auxl.Core(dragDiffuse.dragParentData);

	dragDiffuse.dragMainData = {
	data:'dragMainData',
	id:'dragMain',
	text: false,
	geometry: {primitive: 'sphere', radius: 0.15, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
	material: {shader: "standard", color: "#39a56b", emissive: '#39a56b', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(1,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		countdown: {property: 'scale', from: new THREE.Vector3(0.001,0.001,0.001), to: new THREE.Vector3(1,1,1), dur: 500, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown'},
		reset: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.001,0.001,0.001), dur: 1000, delay: 500, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	dragDiffuse.dragMainData.id = 'dragMain1';
	dragDiffuse.dragMain1 = auxl.Core(dragDiffuse.dragMainData);

	dragDiffuse.dragOuterData = {
	data:'dragOuterData',
	id:'dragOuter',
	text: false,
	geometry: {primitive: 'ring', radiusInner: 0.175, radiusOuter: 0.25, thetaLength: 0},
	material: {shader: "standard", color: "#a5394e", emissive: '#a5394e', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(1,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		countdown: {property: 'geometry.thetaLength', from: 0, to: 360, dur: 6000, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown', pauseEvents: 'countdownPause'},
		reset: {property: 'geometry.thetaLength', to: 0, dur: 500, delay: 250, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset',},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	dragDiffuse.dragOuterData.id = 'dragOuter1';
	dragDiffuse.dragOuter1 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent2';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-45);
	dragDiffuse.dragParent2 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain2';
	dragDiffuse.dragMain2 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter2';
	dragDiffuse.dragOuter2 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent3';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-90);
	dragDiffuse.dragParent3 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain3';
	dragDiffuse.dragMain3 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter3';
	dragDiffuse.dragOuter3 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent4';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-135);
	dragDiffuse.dragParent4 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain4';
	dragDiffuse.dragMain4 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter4';
	dragDiffuse.dragOuter4 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent5';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-180);
	dragDiffuse.dragParent5 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain5';
	dragDiffuse.dragMain5 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter5';
	dragDiffuse.dragOuter5 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent6';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-225);
	dragDiffuse.dragParent6 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain6';
	dragDiffuse.dragMain6 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter6';
	dragDiffuse.dragOuter6 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent7';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-270);
	dragDiffuse.dragParent7 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain7';
	dragDiffuse.dragMain7 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter7';
	dragDiffuse.dragOuter7 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.dragParentData.id = 'dragParent8';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-315);
	dragDiffuse.dragParent8 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain8';
	dragDiffuse.dragMain8 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter8';
	dragDiffuse.dragOuter8 = auxl.Core(dragDiffuse.dragOuterData);

	dragDiffuse.gameAllData = {
		parent: {core: dragDiffuse.gameParent},
		child0: {
			parent: {core: dragDiffuse.dragParent1},
			child0: {core: dragDiffuse.dragMain1},
			child1: {core: dragDiffuse.dragOuter1},
		},
		child1: {
			parent: {core: dragDiffuse.dragParent2},
			child0: {core: dragDiffuse.dragMain2},
			child1: {core: dragDiffuse.dragOuter2},
		},
		child2: {
			parent: {core: dragDiffuse.dragParent3},
			child0: {core: dragDiffuse.dragMain3},
			child1: {core: dragDiffuse.dragOuter3},
		},
		child3: {
			parent: {core: dragDiffuse.dragParent4},
			child0: {core: dragDiffuse.dragMain4},
			child1: {core: dragDiffuse.dragOuter4},
		},
		child4: {
			parent: {core: dragDiffuse.dragParent5},
			child0: {core: dragDiffuse.dragMain5},
			child1: {core: dragDiffuse.dragOuter5},
		},
		child5: {
			parent: {core: dragDiffuse.dragParent6},
			child0: {core: dragDiffuse.dragMain6},
			child1: {core: dragDiffuse.dragOuter6},
		},
		child6: {
			parent: {core: dragDiffuse.dragParent7},
			child0: {core: dragDiffuse.dragMain7},
			child1: {core: dragDiffuse.dragOuter7},
		},
		child7: {
			parent: {core: dragDiffuse.dragParent8},
			child0: {core: dragDiffuse.dragMain8},
			child1: {core: dragDiffuse.dragOuter8},
		},
	}
	dragDiffuse.gameAll = auxl.Layer('gameAll', dragDiffuse.gameAllData);


	dragDiffuse.startDelay;
	dragDiffuse.gameInterval;

	dragDiffuse.mainsAll = ['dragMain1','dragMain2','dragMain3','dragMain4','dragMain5','dragMain6','dragMain7','dragMain8'];

	dragDiffuse.outersAll = ['dragOuter1','dragOuter2','dragOuter3','dragOuter4','dragOuter5','dragOuter6','dragOuter7','dragOuter8'];

	//Game Start
	function gameStart(){
		dragDiffuse.startDelay = setTimeout(() => {
			dragDiffuse.gameInterval = setInterval(() => {
				countdownRandom();
			}, 3000);
		}, 1000);
	};

	function levelComplete(){
		console.log('Level Complete');
		clearTimeout(dragDiffuse.startDelay);
		clearInterval(dragDiffuse.gameInterval);
	}

	dragDiffuse.level = 1;
	dragDiffuse.diffuseTotal = 8;
	let countdownMains = Array.from(dragDiffuse.mainsAll);
	let countdownOuter = Array.from(dragDiffuse.outersAll);

	//Random Drag Selection Countdown
	function countdownRandom(){
		if(countdownOuter.length <= 0){
			console.log('No more countdown obejcts');
			return;
		}else{
			let select = Math.floor(Math.random()*countdownOuter.length);
			dragDiffuse[countdownMains[select]].EmitEvent('countdown');
			dragDiffuse[countdownOuter[select]].EmitEvent('countdown');
			countdownMains.splice(select, 1);
			countdownOuter.splice(select, 1);
		}

	}


	let dragStarted = false;
	let dragEnded = false;

	let dragMains = Array.from(dragDiffuse.mainsAll);

	let dragOuters = Array.from(dragDiffuse.outersAll);

	//Drag Start
	function dragStart(){
		if(dragStarted){}else{
			console.log('Start');
			dragStarted = true;
			dragEnded = false;
		}
	}
	//Drag Fail
	function dragFail(){
		if(dragStarted){
			console.log('Fail');
			dragStarted = false;
		}
	}

	//Drag Complete
	function dragEnd(event){
		if(dragStarted){
			for(let main in dragMains){
				if(event.target.id === dragMains[main]){
dragDiffuse[dragOuters[main]].ChangeSelf({property: 'material', value: {color: 'green', emissive: 'green'}});

dragDiffuse[dragOuters[main]].EmitEvent('countdownPause');
dragDiffuse[dragMains[main]].EmitEvent('reset');
dragDiffuse[dragOuters[main]].EmitEvent('reset');

dragMains.splice(main, 1);
dragOuters.splice(main, 1);

					console.log('End');
					dragStarted = false;
					dragEnded = true;

dragDiffuse.diffuseTotal--;
if(dragDiffuse.diffuseTotal <= 0){
	levelComplete();
}

				}
			}
		}
	}


	//Spawn Game
	const SpawnDDGame = () => {
	dragDiffuse.gameAll.SpawnLayer();
		gameStart();

	dragDiffuse.gameParent.GetEl().addEventListener('mousedown', dragStart);
	dragDiffuse.gameParent.GetEl().addEventListener('mouseup', dragFail);

	dragDiffuse.dragMain1.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain2.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain3.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain4.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain5.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain6.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain7.GetEl().addEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain8.GetEl().addEventListener('mouseenter', dragEnd);
	}
	//Despawn Game
	const DespawnDDGame = () => {
		clearTimeout(dragDiffuse.startDelay);
		clearInterval(dragDiffuse.gameInterval);

	dragDiffuse.gameParent.GetEl().removeEventListener('mousedown', dragStart);
	dragDiffuse.gameParent.GetEl().removeEventListener('mouseup', dragFail);

	dragDiffuse.dragMain1.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain2.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain3.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain4.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain5.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain6.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain7.GetEl().removeEventListener('mouseenter', dragEnd);
	dragDiffuse.dragMain8.GetEl().removeEventListener('mouseenter', dragEnd);

		dragDiffuse.gameAll.DespawnLayer();
	}


	return {dragDiffuse, SpawnDDGame, DespawnDDGame}

}
auxl.dragDiffuseGame = auxl.DragDiffuse('dragDiffuseGame');
//auxl.dragDiffuseGame.SpawnDDGame();

/*
Quick Targets
- Quick click, hit all surrounding targets as quickly as possible

Follow Me
- Trace object, follow object without breaking intersection

Balloon Pop
- Falling blocks that need to be clicked before hitting ground. or Floating blocks that need to be clicked before reaching the ceiling. Change color of raycaster to destroy specific color of block or shape of block

High Low
- Quickly show objects, attempt to count which one spawns the most or least, shape, color and texture.

Reflex Range
- Object moves, press button to stop, try to stop within range. Have multiple ones, need to stop them all within range?
*/


//Build Mini Games Objects
auxl.buildMiniGames = () => {

auxl.memory = auxl.MemoryGame('memory',[auxl.memory0Data,auxl.memory1Data,auxl.memory2Data,auxl.memory3Data]);
auxl.petCore = auxl.Core(auxl.petCoreData);
let pet0 = auxl.Pet(auxl.pet0Data);
auxl.swipeLaunchGame = auxl.SwipeLaunchGame('swipeLaunchGame');
auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');
auxl.dragDiffuseGame = auxl.DragDiffuse('dragDiffuseGame');

}
auxl.toBeRebuilt('buildMiniGames');


},
});


//
//AUXL RPG
//Adventure game focused ObjGens
AFRAME.registerComponent('rpg', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

// Battle
/*********************************************************/
//


//Summon Object Gen
auxl.Battler = (id, data) => {

	//Import Core Data
	let core = Object.assign({}, data);
	let name = id;
	let life = true;

	//Bonus
	//minor RNG bonus to stats

	//Stats
	let healthPoolMax = 10;
	let healthPoolCurr = healthPoolMax;
	let healthRegen = 0.25;
	let rank = 1;
	let attack = 5;
	let defense = 3;
	let speed = 1;
	let evasion = 100;
	let magicProf = 1;
	let manaPoolMax = 5;
	let manaPoolCurr = manaPoolMax;
	let manaRegen = 0.15;
	let manaType = 7;
	let manaTypeResistance = {
	type1: false,
	type2: false,
	type3: false,
	type4: false,
	type5: false,
	type6: false,
	type7: false,
	type8: false,
	type9: false,
	type10: false,
	}
	let altResistance = {
	aR1: false,
	}


	//Base Stats
	//Level/Rank altered Stats


	//Health Pool : the amount of health you currently have.

	//Health Regen : the amount of health you regen every turn.

	//Attack : your base physical strength and 100% attack hit amount.

	//Defense : your base defense 

	//Speed : your base speed for determining battle order

	//Magic Profiency : your base magic proficiency. Greater # means it's easier to land hard spells, level up spells, find spells, etc...

	//Mana Pool : you total amount of mana that can be used on spells.

	//Mana Regen : the amount of mana you naturally regain every turn.

	//Mana Type : your base mana type. Power of incoming attacks are buffed and debuffed based on their attacking type vs your mana type.

	//Mana Resistances : any additional mana type pairing to help battler. Limited in capacity.

	//Resistances : Other sorts of things they can do better against like move types, items, not being sleepy, etc...

	//Rank : aka Stat Bonuses like IVs



	//
	//Abilities

	//Additional class,mixin, groups
	//core.groups = '';

	//
	//Animations

	//Attack Anim
	//Hit Anim
	//Death Anim

	//Poly animation of attack as well as text notification update string
	//Poly animation of hit as well as text notification update string

	const basicAttack1_1 = {
	property: 'material.color',
	from: '#01cdfe',
	to: '#fcfafd',
	dur: 250,
	delay: 0,
	loop: '8',
	dir: 'alternate',
	easing:'linear',
	elasticity: 400,
	autoplay: 'false',
	enabled: 'true',
	startEvents: 'attack'
	};

	//Mana Chart Type Advantage Disadvantage Check
	const manaChart = (attackType, defendType) => {

	}


	//How does the battle system work?

	//An initial order is determined before the start of each round
	//some selected moves may move up the priority of the attack however

	//User selects they and their partner's move as well as the targers. Confirms choice. Enemy ai calcs it's move and target.

	//Round battle order starts, 1st Turn

	//Move accuracy/hit check

	//DMG is
	//( ( (10xRank/5) + 2 x movePower x (attackerAtk / defenderDefense) ) / 50) + 2 x targets(1 or 0.75) x multiMove(1, 0.5 or 0.25) x weather(0.5 - 1.5) x  critical(1.5 - 2) x RNG(.9 - 1.05) x moveTypeSameTypeAsAttacker(1 or 1.25) x typeChart(0.5 - 1.5) x otherBuffDebuff(0.5 - 1.5)

	//
	//Moves

	//basicAttack
	//specialAttack
	//utility
	//defend

	let specialAttack = {
	name: 'Special Attack',
	id: 'specialAttack',
	description: 'Attack a single Target for base 75 power at 90% hit chance of DMG via Water Magic. Target has a 20% chance to flinch.',
	manaType: 1,
	rank: 1,
	turns: 1,
	cooldown: 1,
	power: 75,
	accuracy: 90,
	critChance: 10,
	targets: 1,
	manaType: 1,
	moveType: 1,
	castCost: 1,
	effects: {chance1: 20, effect1: 'flinch'},
	}

	let moves = ['basicAttack', 'specialAttack', 'utility', 'defend'];
	let moveChoice = false;
	let moveHit = false;

	//OLD
	const Attack = (you, them) => {
		if(moveHit){
			//Update Text Notification String
			console.log(you.name + ' attacks ' + them.name + ' for ' + you.attack + ' dmg');
			//Play your Attack Anim
			//Play their Hit Anim w/delay

			moveHit = false;
		} else {
			//Update Text Notification String
			console.log(you.name + ' missed their attack against ' + them.name);
		}
	}
	//OLD
	const Hurt = (you, dmg) => {
		//Play your Hit Anim w/delay
		//Calc Hit, Check for Death / Side Effects
		you.UpdateHealth(you, dmg);
		//Update Text Notification String
		console.log(you.name + ' takes ' + dmg + ' dmg');
	}

	const UpdateHealth = (you, dmg) => {
		you.healthPoolCurr -= dmg;
		//Update Text Notification String
		console.log(you.name + '\'s health is at ' + you.healthPoolCurr);
		if(you.healthPoolCurr <= 0){
			you.life = false;
			//Play your Death Anim
			//Update Text Notification String
			console.log(you.name + ' is dead...');
		} else {
			//Update Text Notification String
			console.log(you.name + ' withstood the attack!');
		}
	}

	return {core, name, life, rank, healthPoolMax, healthPoolCurr, attack, defense, speed, magicProf, manaPoolMax, manaPoolCurr, manaType, manaTypeResistance, altResistance, Attack, Hurt, UpdateHealth};
}

const DmgCheck = function(you, them, move) {
	console.log(move);
	//Targets mulitplier adjustment
	let targetMod = 1;
	if(move.targets > 1){
		targetMod = 0.75;
	}

	//Multi-turn mulitplier adjustment
	let turnMod = 1;
	if(move.turns === 2){
		turnMod = 0.5;
	} else if (move.turns > 2){
		turnMod = 0.25;
	}

	//Check for Critical Hits
	let critMod = 1;
	if(move.critChance >= Math.floor(Math.random()*100) ){
		critMod = 1.5;
	}

	//Rnd Dmg adjustment
	let rngMod = (Math.floor(Math.random()*15+90))/100;

	//Mana Match
	let manaMatch = 1;
	if(you.manaType === move.manaType){
		manaMatch = 1.25;
	}

	//Mana Chart Check
	//let manaChartPower = manaChart(move.manaType, them.manaType);
	let manaChartPower = 1;

	let totalDmg = (((((10 * move.rank/5) + 1) * move.power * (you.attack / them.defense) ) / 50) + 1) * targetMod * turnMod * rngMod * manaMatch * manaChartPower;

	return Math.floor(totalDmg);

}

//
//Moves

//Description Example
//Attack a single Target for base 50 power at 100% hit chance of DMG via Water Magic.

//Basic Attack
let basicAttack = {
name: 'Basic Attack',
id: 'basicAttack',
description: 'Basic Attack',
manaType: 1,
rank: 1,
turns: 1,
cooldown: 1,
power: 40,
accuracy: 100,
critChance: 10,
targets: 1,
manaType: 1,
moveType: 1,
castCost: 1,
effects: false,
}

//Special Attack
let specialAttack = {
name: 'Special Attack',
id: 'specialAttack',
description: 'Special Attack',
manaType: 1,
rank: 1,
turns: 1,
cooldown: 1,
power: 60,
accuracy: 100,
critChance: 10,
targets: 1,
manaType: 1,
moveType: 1,
castCost: 1,
effects: false,
}

//Utility
let utility = {
name: 'Utility',
id: 'utility',
description: 'Utility Move',
manaType: 1,
rank: 1,
turns: 1,
cooldown: 1,
power: 25,
accuracy: 100,
critChance: 10,
targets: 1,
manaType: 1,
moveType: 1,
castCost: 1,
effects: false,
}

//Defend
let defend = {
name: 'Defend',
id: 'defend',
description: 'Defend Move',
manaType: 1,
rank: 1,
turns: 1,
cooldown: 1,
power: 10,
accuracy: 100,
critChance: 10,
targets: 1,
manaType: 1,
moveType: 1,
castCost: 1,
effects: false,
}

//List of Move Ids for enemy random attacks
let moveIds = [basicAttack.id,specialAttack.id,utility.id,defend.id];

//
//Battle System
auxl.BattleRef = (id, battler1, battler2) => {
	//Import Data
	let battle = {};
	battle.poly1 = battler1;
	battle.poly2 = battler2;
	battle.order = [];

	battle.battleStart = false;
	battle.battleEnd = false;
	battle.roundStart = false;
	battle.roundEnd = false;
	battle.roundPrep = false;
	battle.rounds = 0;

	//Turn based in the 1 person chooses an attack, completes it, then moves to the next player.

	//
	//Battle Assets Prep

	//Battle Prompt
	battle.roundMenuData = {
		id: 'battleRoundMenu',
		prompt: 'Ready...',
		options: {option0:'Basic Attack', option1:'Special Attack', option2:'Utility', option3: 'Defend'},
		actions: {action0:'basicAttack', action1:'specialAttack', action2:'utility', action3: 'defend'},
		data: auxl.menuBaseData,
		cursorObj: id,
		method: 'Click',
		pos: new THREE.Vector3(-0.25,1.25,-1.25),
	}

	const Start = () => {
		//gen all battlers
		console.log(battle.poly1)
		battle.poly1.core.SpawnCore();
		battle.poly2.core.SpawnCore();
		battle.battleStart  = true;
		console.log('Battle Start!');
		RoundPrep();
		//battle.battleInterval = setInterval(function() {}, 1000);
	}

	const RoundPrep = () => {
		//New Round in Prep
		battle.rounds++;
		console.log( 'Round ' + battle.rounds + ' Start');
		//Determine the battle order for round
		//Clear any previous
		battle.order = [];
		if(battle.poly1.speed > battle.poly2.speed){
			battle.order.push('poly1');
			battle.order.push('poly2');
		} else if(battle.poly1.speed < battle.poly2.speed){
			battle.order.push('poly2');
			battle.order.push('poly1');
		} else {
			//Random Order if speed is same
			if(Math.floor(Math.random()*2) === 0){
				battle.order.push('poly1');
				battle.order.push('poly2');
			} else {
				battle.order.push('poly2');
				battle.order.push('poly1');
			}
		}

		console.log('Round Order :')
		console.log(battle.order)

		//1 of them accepts an input for the action before the round order of attacks actually start.
		//Defaults to battler1 being controlled by user

		battle.roundMenu = auxl.Menu(battle.roundMenuData);
		battle.roundMenu.SpawnMenu();
		//Input is accepted, round starts
	}

	const Round = (userInput) => {
		//complete an ordered battle round
		//battle.order[0].Attack(battle.order[0], battle.order[1]);
		//battle.order[1].Attack(battle.order[1], battle.order[0]);

		//console.log(userInput);
		//console.log(battle.order);
		//console.log(battle.order[0]);
		//console.log(battle.order[1]);

		let enemyMove = moveIds[Math.floor(Math.random()*moveIds.length)];

		//1st Side Attacks
		if(battle.order[0] === 'poly1') {
			Turn(battle.poly1, battle.poly2, userInput);
		} else {
			Turn(battle.poly2, battle.poly1, enemyMove);
		}
		//battle checks and calcs. anims finish and settle
		if(battle.poly1.life && battle.poly2.life){
			//next turn or round
			//2nd Side Attacks
			if(battle.order[1] === 'poly1') {
				Turn(battle.poly1, battle.poly2, userInput);
			} else {
				Turn(battle.poly2, battle.poly1, enemyMove);
			}
			//battle checks and calcs. anims finish and settle
			if(battle.poly1.life && battle.poly2.life){
				//Next round prep
				console.log( 'Round ' + battle.rounds + ' Complete');
				return RoundPrep();
			} else {
				return BattleOver();
			}
		} else {
			return BattleOver();
		}
	}

	const Turn = (you, them, move) => {
		//complete an ordered battle round
		//Prep Move
		let moveChoice = move || 'basicAttack';
		let moveData;
		//Act depending on input
		//console.log(moveChoice);

		switch (moveChoice) {
		  case 'basicAttack':
			console.log("Basic Attack!");
			moveData = JSON.parse(JSON.stringify(basicAttack));
			break;
		  case 'specialAttack':
			moveData = JSON.parse(JSON.stringify(specialAttack));
			console.log("Special Attack!");
			break;
		  case 'utility':
			moveData = JSON.parse(JSON.stringify(utility));
			console.log("Utility!");
			break;
		  case 'defend':
			moveData = JSON.parse(JSON.stringify(defend));
			console.log("Defend!");
			break;
		  default:
			console.log("Huh????");
		}

		//Check Accuracy
		//if(move.accuracy >= them.evasion){
		if(true){
			//Move hit

			//Calc Dmg
			let dmgTotal = DmgCheck(you, them, moveData);
			console.log('Total Hit Dmg :');
			console.log(dmgTotal);

			//Apply Dmg
			you.UpdateHealth(you, dmgTotal);

		} else {
			//Move miss
			//Update Text Notification String
			console.log(you.name + ' missed their attack against ' + them.name);
		}

	}

	const BattleOver = () => {
	//Finalize all changes, drops, exhchanges and updates to the battlers.
	//Clear battleRef data
	console.log( 'Round ' + battle.rounds + ' Complete');
	if(battle.poly1.life){
		console.log('poly1 lives');
		battle.poly2.core.DespawnCore();
	} else {
		console.log('poly2 lives');
		battle.poly1.core.DespawnCore();
	}
	console.log('Battle Over!');
	}

	const Click = (el) => {
		let result = el.getAttribute('result');
		//console.log(result);
		battle.roundMenu.DespawnMenu();
		Round(result);
	}

	return {battle, Start, Round, Click}
}

//Battle Pet 1
auxl.battlerPet1Build = {
data:'battler pet 1 build',
id:'battlerPet1',
sources:false,
text: {value:'O_O', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.135, side: 'double'},
geometry: {primitive: 'box', depth: 0.25, width: 0.25, height: 0.25},
material: {shader: "standard", color: "#4bb8c1", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#4bb8c1", emissiveIntensity: 0.6},
position: new THREE.Vector3(-1,1.2,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 0.9, to: 1.1, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter', resumeEvents: 'mouseleave'}, weaving: {property: 'object3D.rotation.y', from: 90, to: 30, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.battlerPet2Build = {
data:'battler pet 2 build',
id:'battlerPet2',
sources:false,
text: {value:'o_o', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.171, side: 'double'},
geometry: {primitive: 'icosahedron', radius: 0.2, detail: 0},
material: {shader: "standard", color: "#C14B76", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#C14B76", emissiveIntensity: 0.6},
position: new THREE.Vector3(1,1.13,-1),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{bobbing:{property: 'object3D.position.y', from: 1.1, to: 0.9, dur: 7000, delay: 2000, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'mouseenter,attack,hit,death', resumeEvents: 'mouseleave, idle'}, weaving: {property: 'object3D.rotation.y', from: 330, to: 280, dur: 10000, delay: 2000, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true, pauseEvents: 'attack,hit,death', resumeEvents: 'idle'}, click: {property: 'scale', from: '1 1 1', to: '1.25 1.25 1.25', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'}  },
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.battlerPet1Core = auxl.Core(auxl.battlerPet1Build);
auxl.battlerPet2Core = auxl.Core(auxl.battlerPet2Build);
auxl.battlerPet1 = auxl.Battler('Turq', auxl.battlerPet1Core);
auxl.battlerPet2 = auxl.Battler('Minera', auxl.battlerPet2Core);


//
//Crystal Summon Creatures

//1
auxl.cs1B0Data = {
data:'cs1B0',
id:'cs1B0',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,1.5,-0.75),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
bobbing:{property: 'object3D.position.y', from: 1.45, to: 1.55, dur: 7000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
weaving: {property: 'object3D.rotation.y', from: 170, to: 190, dur: 10000, delay: 0, loop: 'true', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true}, 


},
mixins: false,
classes: ['clickable', 'a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.cs1B1Data = {
data:'cs1B1',
id:'cs1B1',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.3, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: "standard", src: auxl.pattern08, repeat: '10 10', color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
anim1:{property: 'material.offset', from: '0 0', to: '10 10', dur: 120000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},

},
mixins: false,
classes: ['a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.cs1B2Data = {
data:'cs1B2',
id:'cs1B2',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.075, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: "standard", src: auxl.pattern10, repeat: '5 5', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.5,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
rotate1: {property: 'object3D.rotation.y', from: 0, to: 360, dur: 30000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
anim1:{property: 'material.offset', from: '0 0', to: '-10 -10', dur: 60000, delay: 0, loop: 'true', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
//['look-at']:'#camera', 
},
};
auxl.cs1B3Data = {
data:'cs1B3',
id:'cs1B3',
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.075, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
material: {shader: "standard", src: auxl.pattern10, repeat: '5 5', color: "#3EB489", emissive: '#3EB489', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0.5,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
rotate1: {property: 'object3D.rotation.y', from: 0, to: -1080, dur: 30000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true},
anim1:{property: 'material.offset', from: '0 0', to: '-10 -10', dur: 60000, delay: 0, loop: true, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
},
mixins: false,
classes: ['a-ent'],
components: {
//['look-at']:'#camera', 
},
};

auxl.cs1B0 = auxl.Core(auxl.cs1B0Data);
auxl.cs1B1 = auxl.Core(auxl.cs1B1Data);
auxl.cs1B2 = auxl.Core(auxl.cs1B2Data);
auxl.cs1B3 = auxl.Core(auxl.cs1B3Data);
auxl.cs1Data = {
parent: {core: auxl.cs1B0},
child0: {core: auxl.cs1B1},
child1: {core: auxl.cs1B2},
child2: {core: auxl.cs1B3},
}
auxl.cs1 = auxl.Layer('cs1', auxl.cs1Data);

//Build Battle
auxl.newBattle = auxl.BattleRef('newBattle' ,auxl.battlerPet1, auxl.battlerPet2);

//
//Start Battle
function startBattle(){
	auxl.newBattle.Start();
}
//startBattle();

//Build RPG Objects
auxl.buildRPG = () => {

auxl.battlerPet1Core = auxl.Core(auxl.battlerPet1Build);
auxl.battlerPet2Core = auxl.Core(auxl.battlerPet2Build);
auxl.battlerPet1 = auxl.Battler('Turq', auxl.battlerPet1Core);
auxl.battlerPet2 = auxl.Battler('Minera', auxl.battlerPet2Core);
auxl.cs1B0 = auxl.Core(auxl.cs1B0Data);
auxl.cs1B1 = auxl.Core(auxl.cs1B1Data);
auxl.cs1B2 = auxl.Core(auxl.cs1B2Data);
auxl.cs1B3 = auxl.Core(auxl.cs1B3Data);
auxl.cs1 = auxl.Layer('cs1', auxl.cs1Data);
auxl.newBattle = auxl.BattleRef('newBattle' ,auxl.battlerPet1, auxl.battlerPet2);

}
auxl.toBeRebuilt('buildRPG');


},
});