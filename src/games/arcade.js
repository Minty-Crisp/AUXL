//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Arcade

//
//Arcade System & Games
//Unique Game system ObjGens
const arcade = AFRAME.registerComponent('arcade', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;

//
//Game Menu
auxl.GameMenu = (gameMenuData) => {

	let gameMenu = Object.assign({}, gameMenuData);
	gameMenu.inScene = false;
	gameMenu.menuId = gameMenu.id + 'layer';
	gameMenu.state = false;

	gameMenu.sceneTimeout;

//console.log(gameMenu.game)
gameMenu.id = gameMenu.game.id;
gameMenu.title = gameMenu.game.title;
gameMenu.instructions = gameMenu.game.instructionsText;
gameMenu.controls = gameMenu.game.controlsText;
gameMenu.preview = gameMenu.game.previewImage;
//gameMenu.highScores = gameMenu.game.highScores.text;
	//Preview Window
	gameMenu.windowText = {value:'', wrapCount: 30, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.45};
	//Window Material
	gameMenu.windowMaterial = {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double',};
	//Preview Material
	gameMenu.previewMaterial = {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double', src: gameMenu.preview, repeat: '1 1'};

//Window Preview
gameMenu.windowPreviewData = {
data:'windowPreviewData',
id:'windowPreview',
sources:false,
text: gameMenu.windowText,
geometry: {primitive: 'plane', width: 0.5, height: 0.5,},
material: gameMenu.previewMaterial,
position: new THREE.Vector3(-0.25,1.5,0.25),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
gameMenu.windowPreview = auxl.Core(gameMenu.windowPreviewData);
//Game Title
gameMenu.gameTitleData = {
data:'gameTitleData',
id:'gameTitle',
sources:false,
text: {value:gameMenu.title, wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.5},
geometry: false,
material: false,
position: new THREE.Vector3(0,0.225,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
gameMenu.gameTitle = auxl.Core(gameMenu.gameTitleData);
//Game Control Button - Play|Start|Restart
gameMenu.gameControlButtonData = {
data:'gameControlButtonData',
id:'gameControlButton',
sources:false,
text: {value:'Play', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.5,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
gameMenu.gameControlButton = auxl.Core(gameMenu.gameControlButtonData);
//View Instructions Button
gameMenu.gameInstructionsButtonData = {
data:'gameInstructionsButtonData',
id:'gameInstructionsButton',
sources:false,
text: {value:'Instructions', wrapCount: 30, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.75,0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
gameMenu.gameInstructionsButton = auxl.Core(gameMenu.gameInstructionsButtonData);
//View Controls Button
gameMenu.gameControlsButtonData = {
data:'gameControlsButtonData',
id:'gameControlsButton',
sources:false,
text: {value:'Controls', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.5,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
gameMenu.gameControlsButton = auxl.Core(gameMenu.gameControlsButtonData);
//View High Scores Button
gameMenu.gameScoresButtonData = {
data:'gameScoresButtonData',
id:'gameScoresButton',
sources:false,
text: {value:'High Scores', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.75,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
gameMenu.gameScoresButton = auxl.Core(gameMenu.gameScoresButtonData);
//Change Difficulty Setting Button
gameMenu.gameSettingsButtonData = {
data:'gameSettingsButtonData',
id:'gameSettingsButton',
sources:false,
text: {value:'Settings', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.5,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
gameMenu.gameSettingsButton = auxl.Core(gameMenu.gameSettingsButtonData);
//Exit Game
gameMenu.gameExitButtonData = {
data:'gameExitButtonData',
id:'gameExitButton',
sources:false,
text: {value:'Exit', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
geometry: {primitive: 'circle', radius: 0.1, segments: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#c1664b", opacity: 1, metalness: 0.2, roughness: 0.8, emissive: "#c1664b", emissiveIntensity: 0.6, side: 'double'},
position: new THREE.Vector3(0.75,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click1:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: {
visible: false,
},
};
gameMenu.gameExitButton = auxl.Core(gameMenu.gameExitButtonData);

//Game Menu Layer
gameMenu.gameMenuData = {
	parent: {core: gameMenu.windowPreview},
	child0: {core: gameMenu.gameTitle},
	child1: {core: gameMenu.gameControlButton},
	child2: {core: gameMenu.gameInstructionsButton},
	child3: {core: gameMenu.gameControlsButton},
	child4: {core: gameMenu.gameScoresButton},
	child5: {core: gameMenu.gameSettingsButton},
	child6: {core: gameMenu.gameExitButton},
}
gameMenu[gameMenu.menuId] = auxl.Layer(gameMenu.menuId, gameMenu.gameMenuData);

	//Spawn Game Menu
	const SpawnGameMenu = () => {
		gameMenu[gameMenu.menuId].SpawnLayer();
		LoadButtonEvents();
		if(gameMenu.game.inScene){
			Load();
		} else {
			Exit();
		}
		ViewPreview();
	}
	//Despawn Game Menu
	const DespawnGameMenu = () => {
		clearTimeout(gameMenu.sceneTimeout);
		MenuState(false);
		UnloadButtonEvents();
		gameMenu[gameMenu.menuId].DespawnLayer();
	}
	//Menu State
	const MenuState = (state) => {
		//Old
		if(gameMenu.state === 'preview'){
			PreviewModeOff();
		} else if(gameMenu.state === 'instructions'){
			InstructionsModeOff();
		} else if(gameMenu.state === 'controls'){
			ControlsModeOff();
		} else if(gameMenu.state === 'scores'){
			ScoresModeOff();
		} else if(state === 'load'){

		} else if(state === 'exit'){

		}
		//New
		if(state === 'preview'){
			PreviewModeOn();
		} else if(state === 'instructions'){
			InstructionsModeOn();
		} else if(state === 'controls'){
			ControlsModeOn();
		} else if(state === 'scores'){
			ScoresModeOn();
		} else if(state === 'load'){

		} else if(state === 'exit'){

		}
		gameMenu.state = state;
	}
	//LoadButtonEvents
	const LoadButtonEvents = () => {
		gameMenu.gameControlButton.GetEl().addEventListener('click', MoveToGame);
		gameMenu.gameInstructionsButton.GetEl().addEventListener('click', ViewInstructions);
		gameMenu.gameControlsButton.GetEl().addEventListener('click', ViewControls);
		gameMenu.gameScoresButton.GetEl().addEventListener('click', ViewScores);
		gameMenu.gameExitButton.GetEl().addEventListener('click', MoveToHome);
	}
	//UnloadButtonEvents
	const UnloadButtonEvents = () => {
		gameMenu.gameControlButton.GetEl().removeEventListener('click', MoveToGame);
		gameMenu.gameInstructionsButton.GetEl().removeEventListener('click', ViewInstructions);
		gameMenu.gameControlsButton.GetEl().removeEventListener('click', ViewControls);
		gameMenu.gameScoresButton.GetEl().removeEventListener('click', ViewScores);
		gameMenu.gameExitButton.GetEl().removeEventListener('click', MoveToHome);

	}
	//Move to Game
	const MoveToGame = () => {
		auxl[gameMenu.gameZone].Change(gameMenu.gameConnect);
		Load();
	}
	//Load Game World
	const Load = () => {
		gameMenu.sceneTimeout = setTimeout(() => {
			gameMenu.gameExitButton.ChangeSelf({property: 'visible', value: true})
			gameMenu.gameControlButton.ChangeSelf({property: 'text', value: {value: 'Start'}})
			clearTimeout(gameMenu.sceneTimeout);
		}, 500);
	}
	//Move to Home
	const MoveToHome = () => {
		auxl[gameMenu.homeZone].Change(gameMenu.homeConnect);
		Exit();
	}
	//Exit Game World
	const Exit = () => {
		gameMenu.sceneTimeout = setTimeout(() => {
			gameMenu.gameExitButton.ChangeSelf({property: 'visible', value: false})
			gameMenu.gameControlButton.ChangeSelf({property: 'text', value: {value: 'Play'}})
			clearTimeout(gameMenu.sceneTimeout);
		}, 500);
	}
	//View Preview
	const ViewPreview = () => {
		MenuState('preview');
	}
	//Preview Mode On
	const PreviewModeOn = () => {
		gameMenu.windowText.value = '';
		gameMenu.windowPreview.ChangeSelf([{property: 'material', value: gameMenu.previewMaterial},{property: 'text', value: gameMenu.windowText}]);
	}
	//Preview Mode Off
	const PreviewModeOff = () => {

	}
	//View Instructions
	const ViewInstructions = () => {
		MenuState('instructions');
	}
	//Instructions Mode On
	const InstructionsModeOn = () => {
		gameMenu.windowText.value = gameMenu.instructions;
		gameMenu.windowPreview.ChangeSelf([{property: 'material', value: gameMenu.windowMaterial},{property: 'text', value: gameMenu.windowText}]);
		gameMenu.gameInstructionsButton.ChangeSelf({property: 'text', value: {value: 'Back'}})
		gameMenu.gameInstructionsButton.GetEl().removeEventListener('click', ViewInstructions);
		gameMenu.gameInstructionsButton.GetEl().addEventListener('click', ViewPreview);
	}
	//Instructions Mode Off
	const InstructionsModeOff = () => {
		gameMenu.gameInstructionsButton.ChangeSelf({property: 'text', value: {value: 'Instructions'}})
		gameMenu.gameInstructionsButton.GetEl().removeEventListener('click', ViewPreview);
		gameMenu.gameInstructionsButton.GetEl().addEventListener('click', ViewInstructions);
	}
	//View Controls
	const ViewControls = () => {
		MenuState('controls');
	}
	//Controls Mode On
	const ControlsModeOn = () => {
		gameMenu.windowText.value = gameMenu.controls;
		gameMenu.windowPreview.ChangeSelf([{property: 'material', value: gameMenu.windowMaterial},{property: 'text', value: gameMenu.windowText}]);
		gameMenu.gameControlsButton.ChangeSelf({property: 'text', value: {value: 'Back'}})
		gameMenu.gameControlsButton.GetEl().removeEventListener('click', ViewControls);
		gameMenu.gameControlsButton.GetEl().addEventListener('click', ViewPreview);
	}
	//Controls Mode Off
	const ControlsModeOff = () => {
		gameMenu.gameControlsButton.ChangeSelf({property: 'text', value: {value: 'Controls'}})
		gameMenu.gameControlsButton.GetEl().removeEventListener('click', ViewPreview);
		gameMenu.gameControlsButton.GetEl().addEventListener('click', ViewControls);
	}
	//View High Scores
	const ViewScores = () => {
		MenuState('scores');
	}
	//Scores Mode On
	const ScoresModeOn = () => {
		gameMenu.windowText.value = gameMenu.game.highScores.text;
		gameMenu.windowPreview.ChangeSelf([{property: 'material', value: gameMenu.windowMaterial},{property: 'text', value: gameMenu.windowText}]);
		gameMenu.gameScoresButton.ChangeSelf({property: 'text', value: {value: 'Back'}})
		gameMenu.gameScoresButton.GetEl().removeEventListener('click', ViewScores);
		gameMenu.gameScoresButton.GetEl().addEventListener('click', ViewPreview);
	}
	//Scores Mode Off
	const ScoresModeOff = () => {
		gameMenu.gameScoresButton.ChangeSelf({property: 'text', value: {value: 'High Scores'}})
		gameMenu.gameScoresButton.GetEl().removeEventListener('click', ViewPreview);
		gameMenu.gameScoresButton.GetEl().addEventListener('click', ViewScores);
	}
	//Change Difficulty
	const ChangeMode = () => {

	}

	return {gameMenu, SpawnGameMenu, DespawnGameMenu}
}

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
			auxl.RemoveFromTracker(memory.id);
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
//Swipe Launch
//Intersect In/Out as many times as you can to build up a meter and click to finalize it within a time frame to launch it a distance
auxl.SwipeLaunchGame = (id) => {
//ToDo
//Add a build up animation to visualize building power
//Add a launch animation to visualize total power hit
//Speed up power display animation on power greater than 1000 either by time or number

	let swipeLaunch = {};
	swipeLaunch.id = id;
	swipeLaunch.title = 'Swipe Launch';
	swipeLaunch.instructionsText = 'How To Play :\nClick the Ready button to start the 3 second countdown.\nOn completion, you will have 6 seconds to hover on and off the ball as many times as you can.\nBefore the timer hits 0, click the ball to launch it.\nThe more times you hover and the closer you get to 0 when clicked, the more power to launch!';
	swipeLaunch.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	swipeLaunch.previewImage = auxl.pattern01;
	swipeLaunch.inScene = false;
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
	swipeLaunch.highScores.text = 'High Scores :\n1. Name : 0 Meters\n2. Name : 0 Meters\n3. Name : 0 Meters\n4. Name : 0 Meters\n5. Name : 0 Meters\n';
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
		swipeLaunch.highScores.text = 'High Scores :\n' + '1. '+swipeLaunch.highScores.name1+' : '+swipeLaunch.highScores.score1.toFixed(2)+' Meters\n2. '+swipeLaunch.highScores.name2+' : '+swipeLaunch.highScores.score2.toFixed(2)+' Meters\n3. '+swipeLaunch.highScores.name3+' : '+swipeLaunch.highScores.score3.toFixed(2)+' Meters\n4. '+swipeLaunch.highScores.name4+' : '+swipeLaunch.highScores.score4.toFixed(2)+' Meters\n5. '+swipeLaunch.highScores.name5+' : '+swipeLaunch.highScores.score5.toFixed(2)+' Meters\n';
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
		swipeLaunch.inScene = true;
	}
	//Despawn Game
	const DespawnSLGame = () => {
		clearTimeout(swipeLaunch.starting0);
		clearTimeout(swipeLaunch.starting1);
		clearTimeout(swipeLaunch.starting2);
		clearInterval(swipeLaunch.countdownInterval);
		clearTimeout(swipeLaunch.gameOver);
		swipeLaunch.core.GetEl().removeEventListener('mouseenter', hoverOn);
		swipeLaunch.core.GetEl().removeEventListener('mouseleave', hoverOff);
		swipeLaunch.core.GetEl().removeEventListener('mousedown', launch);
		swipeLaunch.displayTime.GetEl().removeEventListener('mousedown', countdownPrep);
		swipeLaunch.core.DespawnCore();
		swipeLaunch.displayTime.DespawnCore();
		swipeLaunch.displayScore.DespawnCore();
		swipeLaunch.highScore.DespawnCore();
		swipeLaunch.instructions.DespawnCore();
		auxl.RemoveFromTracker(swipeLaunch.id);
		swipeLaunch.inScene = false;
	}

	return {swipeLaunch, SpawnSLGame, DespawnSLGame};

}
auxl.swipeLaunchGame = auxl.SwipeLaunchGame('swipeLaunchGame');
//Swipe Launch Game Menu
auxl.swipeLaunchGameMenuData = {
	id: 'swipeLaunchGameMenu',
	game: auxl.swipeLaunchGame.swipeLaunch,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game2',
};
auxl.swipeLaunchGameMenu = auxl.GameMenu(auxl.swipeLaunchGameMenuData);
//auxl.swipeLaunchGameMenu.SpawnGameMenu();

//
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
		auxl.RemoveFromTracker(guessHit.id);
	}

	return {guessHit, SpawnGHGame, DespawnGHGame};
}
auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');

//
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
		auxl.RemoveFromTracker(dragDiffuse.id);
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
auxl.swipeLaunchGame = auxl.SwipeLaunchGame('swipeLaunchGame');
auxl.swipeLaunchGameMenu = auxl.GameMenu(auxl.swipeLaunchGameMenuData);
auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');
auxl.dragDiffuseGame = auxl.DragDiffuse('dragDiffuseGame');

}
auxl.toBeRebuilt('buildMiniGames');
},
});

//
//Export
export default arcade;