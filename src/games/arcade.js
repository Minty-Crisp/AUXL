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
	gameMenu.title = gameMenu.game.title;
	gameMenu.instructions = gameMenu.game.instructionsText;
	gameMenu.controls = gameMenu.game.controlsText;
	gameMenu.preview = gameMenu.game.previewImage;
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
	components: {
		//['look-at-xyz']:{match: 'camera', x:false, y:true, z:false},
		['stare']:{id: 'playerRig'},
	},
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
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
	text: {value:'Load', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
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
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
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
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
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
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
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
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
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
	gameMenu.menuHideButtonData = {
	data:'menuHideButtonData',
	id:'menuHideButton',
	sources:false,
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
	},
	text: {value:'Close', wrapCount: 20, color: "#FFFFFF", font: "exo2bold", zOffset: 0.005, side: 'double', align: "center", baseline: 'center', width: 0.4},
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
	components: false,
	};
	gameMenu.menuHideButton = auxl.Core(gameMenu.menuHideButtonData);
	//Game Menu Layer
	gameMenu.gameMenuData = {
		parent: {core: gameMenu.windowPreview},
		child0: {core: gameMenu.gameTitle},
		child1: {core: gameMenu.gameControlButton},
		child2: {core: gameMenu.gameInstructionsButton},
		child3: {core: gameMenu.gameControlsButton},
		child4: {core: gameMenu.gameScoresButton},
		child5: {core: gameMenu.gameSettingsButton},
		child6: {core: gameMenu.menuHideButton},
	}
	gameMenu[gameMenu.menuId] = auxl.Layer(gameMenu.menuId, gameMenu.gameMenuData);

	//Spawn Game Menu
	const SpawnGameMenu = () => {
		if(gameMenu.inScene){}else{
			if(auxl.currentGameMenu){
				auxl[auxl.currentGameMenu].DespawnGameMenu();
			}
			gameMenu[gameMenu.menuId].SpawnLayer();
			LoadButtonEvents();
			if(gameMenu.game.inScene){
				Load();
			} else {
				Exit();
			}
			ViewPreview();
			auxl.currentGameMenu = gameMenu.id;
			gameMenu.inScene = true;
		}
	}
	//Despawn Game Menu
	const DespawnGameMenu = () => {
		if(gameMenu.inScene){
			clearTimeout(gameMenu.sceneTimeout);
			MenuState(false);
			UnloadButtonEvents();
			gameMenu[gameMenu.menuId].DespawnLayer();
			auxl.currentGameMenu = false;
			gameMenu.inScene = false;
		}
	}
	//Toggle Game Menu
	const ToggleGameMenu = () => {
		if(gameMenu.inScene){
			DespawnGameMenu();
		} else {
			SpawnGameMenu();
		}
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
		gameMenu.menuHideButton.GetEl().addEventListener('click', DespawnGameMenu);
	}
	//UnloadButtonEvents
	const UnloadButtonEvents = () => {
		gameMenu.gameControlButton.GetEl().removeEventListener('click', MoveToGame);
		gameMenu.gameInstructionsButton.GetEl().removeEventListener('click', ViewInstructions);
		gameMenu.gameControlsButton.GetEl().removeEventListener('click', ViewControls);
		gameMenu.gameScoresButton.GetEl().removeEventListener('click', ViewScores);
		gameMenu.menuHideButton.GetEl().removeEventListener('click', DespawnGameMenu);
	}
	//Move to Game
	const MoveToGame = () => {
		auxl[gameMenu.gameZone].Change(gameMenu.gameZone, gameMenu.gameConnect);
		Load();
	}
	//Load Game World
	const Load = () => {
		gameMenu.gameControlButton.GetEl().removeEventListener('click', MoveToGame);
		gameMenu[gameMenu.menuId].ChangeParent({property: 'position', value: gameMenu.inGamePos});
		gameMenu.sceneTimeout = setTimeout(() => {
			gameMenu.gameControlButton.GetEl().addEventListener('click', MoveToHome);
			gameMenu.gameControlButton.ChangeSelf({property: 'text', value: {value: 'Return'}})
			clearTimeout(gameMenu.sceneTimeout);
		}, 500);
	}
	//Move to Home
	const MoveToHome = () => {
		auxl[gameMenu.homeZone].Change(gameMenu.homeZone, gameMenu.homeConnect);
		Exit();
	}
	//Exit Game World
	const Exit = () => {
		gameMenu.gameControlButton.GetEl().removeEventListener('click', MoveToHome);
		gameMenu.sceneTimeout = setTimeout(() => {
			gameMenu.gameControlButton.GetEl().addEventListener('click', MoveToGame);
			gameMenu[gameMenu.menuId].ChangeParent({property: 'position', value: gameMenu.outGamePos});
			gameMenu.gameControlButton.ChangeSelf({property: 'text', value: {value: 'Load'}})
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

	return {gameMenu, SpawnGameMenu, DespawnGameMenu, ToggleGameMenu}
}

//
//Highscore

//Blank High Scores
const blankHighScores = (type, acc) => {
	let highScores = {};
	highScores.type = ' '+type +'\n';
	highScores.acc = acc || 0;
	highScores.score1 = 0;
	highScores.name1 = 'Null';
	highScores.score2 = 0;
	highScores.name2 = 'Null';
	highScores.score3 = 0;
	highScores.name3 = 'Null';
	highScores.score4 = 0;
	highScores.name4 = 'Null';
	highScores.score5 = 0;
	highScores.name5 = 'Null';
	//highScores.text = 'High Scores :\n1. Name : 0 '+highScores.type+'2. Name : 0 '+highScores.type+'3. Name : 0 '+highScores.type+'4. Name : 0 '+highScores.type+'5. Name : 0 '+highScores.type+'';
	highScores.text = 'High Scores :\n1| 0 '+highScores.type+'2| 0 '+highScores.type+'3|0 '+highScores.type+'4| 0 '+highScores.type+'5| 0 '+highScores.type+'';
	return highScores;
}
//Build High Score Text
const refreshHighScoreText = (highScores) => {
	//highScores.text = 'High Scores :\n' + '1. '+highScores.name1+' : '+highScores.score1.toFixed(highScores.acc)+highScores.type+'2. '+highScores.name2+' : '+highScores.score2.toFixed(highScores.acc)+highScores.type+'3. '+highScores.name3+' : '+highScores.score3.toFixed(highScores.acc)+highScores.type+'4. '+highScores.name4+' : '+highScores.score4.toFixed(highScores.acc)+highScores.type+'5. '+highScores.name5+' : '+highScores.score5.toFixed(highScores.acc)+highScores.type;
	highScores.text = 'High Scores :\n' + '1| '+highScores.score1.toFixed(highScores.acc)+highScores.type+'2| '+highScores.score2.toFixed(highScores.acc)+highScores.type+'3| '+highScores.score3.toFixed(highScores.acc)+highScores.type+'4| '+highScores.score4.toFixed(highScores.acc)+highScores.type+'5| '+highScores.score5.toFixed(highScores.acc)+highScores.type;
	return highScores.text;
}
//Check for High Score
const checkHighScore = (score, highScores) => {
	if(score > highScores.score1){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = JSON.parse(JSON.stringify(highScores.score2));
		highScores.name3 = JSON.parse(JSON.stringify(highScores.name2));
		highScores.score2 = JSON.parse(JSON.stringify(highScores.score1));
		highScores.name2 = JSON.parse(JSON.stringify(highScores.name1));
		highScores.score1 = score;
		highScores.name1 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score > highScores.score2){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = JSON.parse(JSON.stringify(highScores.score2));
		highScores.name3 = JSON.parse(JSON.stringify(highScores.name2));
		highScores.score2 = score;
		highScores.name2 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score > highScores.score3){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = score;
		highScores.name3 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score > highScores.score4){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = score;
		highScores.name4 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score > highScores.score5){
		highScores.score5 = score;
		highScores.name5 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else {
		return highScores;
	}
}
//Check for Low Score
const checkLowScore = (score, highScores) => {
	if(score < highScores.score1){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = JSON.parse(JSON.stringify(highScores.score2));
		highScores.name3 = JSON.parse(JSON.stringify(highScores.name2));
		highScores.score2 = JSON.parse(JSON.stringify(highScores.score1));
		highScores.name2 = JSON.parse(JSON.stringify(highScores.name1));
		highScores.score1 = score;
		highScores.name1 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score < highScores.score2){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = JSON.parse(JSON.stringify(highScores.score2));
		highScores.name3 = JSON.parse(JSON.stringify(highScores.name2));
		highScores.score2 = score;
		highScores.name2 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score < highScores.score3){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = JSON.parse(JSON.stringify(highScores.score3));
		highScores.name4 = JSON.parse(JSON.stringify(highScores.name3));
		highScores.score3 = score;
		highScores.name3 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score < highScores.score4){
		highScores.score5 = JSON.parse(JSON.stringify(highScores.score4));
		highScores.name5 = JSON.parse(JSON.stringify(highScores.name4));
		highScores.score4 = score;
		highScores.name4 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else if(score < highScores.score5){
		highScores.score5 = score;
		highScores.name5 = auxl.local.profile.shortname;
		highScores.text = refreshHighScoreText(highScores);
		return highScores;
	} else {
		return highScores;
	}
}

//
//UI Menu Layer Template
//Parent : 0
auxl.uiGameParentData = {
data:'uiGameParentData',
id:'uiGameParent',
sources: false,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(2,1.5,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig', twist: true,},
},
};
auxl.uiGameParent = auxl.Core(auxl.uiGameParentData);
//Game Status : 1
auxl.uiGameStatusData = {
data:'uiGameStatusData',
id:'uiGameStatus',
sources: false,
text: {value:'Game Status', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 30, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.75, height: 0.1},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.uiGameStatus = auxl.Core(auxl.uiGameStatusData);
//Game Title : 2
auxl.uiGameTitleData = {
data:'uiGameTitleData',
id:'uiGameTitle',
sources: false,
text: {value:'Game Title', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 30, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.75, height: 0.1},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,-0.2,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.uiGameTitle = auxl.Core(auxl.uiGameTitleData);
//Current Level & Points : 3
auxl.uiGameLevelData = {
data:'uiGameLevelData',
id:'uiGameLevel',
sources: false,
text: {value:'Game Level', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 12, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.35, height: 0.4},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.2,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.uiGameLevel = auxl.Core(auxl.uiGameLevelData);
//High Score Board : 4
auxl.uiGameScoresData = {
data:'uiGameScoresData',
id:'uiGameScores',
sources: false,
text: {value:'High Scores', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 15, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.35, height: 0.4},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0.2,0.1,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
auxl.uiGameScores = auxl.Core(auxl.uiGameScoresData);
//Game Start : 5
auxl.uiGameStartData = {
data:'uiGameStartData',
id:'uiGameStart',
sources: false,
text: {value:'Start', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 8, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.2, height: 0.2},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0,-0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.uiGameStart = auxl.Core(auxl.uiGameStartData);
//Game Control : 6
auxl.uiGameControlData = {
data:'uiGameControlData',
id:'uiGameControl',
sources: false,
text: {value:'Continue', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 8, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.2, height: 0.2},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(-0.3,-0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.uiGameControl = auxl.Core(auxl.uiGameControlData);
//Game Menu : 7
auxl.uiGameMenuData = {
data:'uiGameMenuData',
id:'uiGameMenu',
sources: false,
text: {value:'Menu', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0525, side: 'front', wrapCount: 8, baseline: 'center'},
geometry: {primitive: 'box', depth: 0.1, width: 0.2, height: 0.2},
material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},
position: new THREE.Vector3(0.3,-0.4,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations:{
click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
},
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
auxl.uiGameMenu = auxl.Core(auxl.uiGameMenuData);
//UI Game Layer
auxl.uiGameLayerData = {
	parent: {core: auxl.uiGameParent},
	child0: {core: auxl.uiGameStatus},
	child1: {core: auxl.uiGameTitle},
	child2: {core: auxl.uiGameLevel},
	child3: {core: auxl.uiGameScores},
	child4: {core: auxl.uiGameStart},
	child5: {core: auxl.uiGameControl},
	child6: {core: auxl.uiGameMenu},
}

//
//Memory Mini Game
auxl.MemoryGame = (id) => {
	let memory = {};
	memory.id = id;
	let core = 'memory';
	memory.title = 'Memory Order';
	memory.instructionsText = 'How To Play :\nWatch the sequence play.\nClick each item in the exact same sequence to continue.\nSee how far you can get!';
	memory.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	memory.previewImage = auxl.pattern01;
	memory.inScene = false;
	//Colors
	auxl.memoryGameColor = auxl.colorTheoryGen(false, 'lime');
	//High Scores
	memory.highScores = blankHighScores('Matches', 0);

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

	//Memory 0
	memory.memory0Data = {
	data:'0',
	id:'memory0',
	sources:false,
	text: false,
	sounds: {
		click: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'click'},
		select: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'select'},
		gamestart: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'gameStart'},
		gameover: {src: auxl.minimize6, autoplay: false, loop: false, volume: 1, on: 'gameOver'},
		nextlevel: {src: auxl.maximize6, autoplay: false, loop: false, volume: 1, on: 'nextLevel'},
	},
	geometry: {primitive: 'cylinder', radius: 0.45, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 3, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#3EB489", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#3EB489", emissiveIntensity: 0.2, side: 'double'},
	position: new THREE.Vector3(-0.45,0.7,0),
	rotation: new THREE.Vector3(-90,0,0),
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
	components: {
		clickrun__click:{
			cursorObj: memory.id,
			component: 'null',
			method: 'MemoryClick',
			params: 'target',
		},
	},
	};
	//Memory 1
	memory.memory1Data = {
	data:'1',
	id:'memory1',
	sources:false,
	text: false,
	sounds: {
		click: {src: auxl.drop2, autoplay: false, loop: false, volume: 1, on: 'click'},
		select: {src: auxl.drop2, autoplay: false, loop: false, volume: 1, on: 'select'},
	},
	geometry: {primitive: 'box', width: 0.75, height: 0.75, depth: 0.15},
	material: {shader: "standard", color: "#C14B76", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#C14B76", emissiveIntensity: 0.2, side: 'double'},
	position: new THREE.Vector3(0.45,0.85,0),
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
	components: {
		clickrun__click:{
			cursorObj: memory.id,
			component: 'null',
			method: 'MemoryClick',
			params: 'target',
		},
	},
	};
	//Memory 2
	memory.memory2Data = {
	data:'2',
	id:'memory2',
	sources:false,
	text: false,
	sounds: {
		click: {src: auxl.drop3, autoplay: false, loop: false, volume: 1, on: 'click'},
		select: {src: auxl.drop3, autoplay: false, loop: false, volume: 1, on: 'select'},
	},
	geometry: {primitive: 'box', width: 0.15, height: 0.75, depth: 0.15,},
	material: {shader: "standard", color: "#ce782f", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#ce782f", emissiveIntensity: 0.2, side: 'double'},
	position: new THREE.Vector3(-0.45,0,0),
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
	components: {
		clickrun__click:{
			cursorObj: memory.id,
			component: 'null',
			method: 'MemoryClick',
			params: 'target',
		},
	},
	};
	//Memory 3
	memory.memory3Data = {
	data:'3',
	id:'memory3',
	sources:false,
	text: false,
	sounds: {
		click: {src: auxl.drop4, autoplay: false, loop: false, volume: 1, on: 'click'},
		select: {src: auxl.drop4, autoplay: false, loop: false, volume: 1, on: 'select'},
	},
	geometry: {primitive: 'cylinder', radius: 0.4, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#4b54c1", opacity: 1, metalness: 0.6, roughness: 0.4, emissive: "#4b54c1", emissiveIntensity: 0.2, side: 'double'},
	position: new THREE.Vector3(0.45,0,0),
	rotation: new THREE.Vector3(90,0,0),
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
	components: {
		clickrun__click:{
			cursorObj: memory.id,
			component: 'null',
			method: 'MemoryClick',
			params: 'target',
		},
	},
	};

	let data = [memory.memory0Data, memory.memory1Data, memory.memory2Data, memory.memory3Data]
	for(let each in data){
		memoryObjData = data[each];
		memoryObjData.id = 'memory' + each;
		memoryCores[each] = auxl.Core(memoryObjData);
		layerData['child'+each] = {};
		layerData['child'+each].core = memoryCores[each];
	}
	memory.layer = auxl.Layer('memory',layerData);

	//UI
	memory.memoryUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'memoryUI',{position: new THREE.Vector3(1.25,1.5,-1.5)}, true);
	memory.memoryUI = auxl.Layer('memoryUI',memory.memoryUIData);
	//Parent : memoryUI0
	//Game Status : memoryUI1
	memory.memoryUI.layer.all.child0.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child0.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : memoryUI2
	memory.memoryUI.layer.all.child1.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child1.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child1.core.core.text.value = 'Memory Order';
	//Current Level & Points : memoryUI3
	memory.memoryUI.layer.all.child2.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child2.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child2.core.core.text.value = 'Sequence :\n*';
	//High Score Board : memoryUI4
	memory.memoryUI.layer.all.child3.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child3.core.core.material.emissive = auxl.memoryGameColor.compl;
	//Game Start : memoryUI5
	memory.memoryUI.layer.all.child4.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child4.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child4.core.core.components = {};
	memory.memoryUI.layer.all.child4.core.core.components.clickrun__gamemenu = {cursorObj: memory.id, component: 'null', method: 'GameMenuClick', params: 'null',};
	//Game Control : memoryUI6
	memory.memoryUI.layer.all.child5.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child5.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child5.core.core.components = {};
	memory.memoryUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : memoryUI7
	memory.memoryUI.layer.all.child6.core.core.material.color = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child6.core.core.material.emissive = auxl.memoryGameColor.compl;
	memory.memoryUI.layer.all.child6.core.core.components = {};
	memory.memoryUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'memoryGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

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
	let sequenceChunk = 5;
	let pauseClick = true;
	let gameStarted = false;

	//Spawn Memory Game
	const SpawnMemGame = () => {
		if(memory.inScene){}else{
			memory.layer.SpawnLayer();
			memory.memoryUI.SpawnLayer();
			UpdateScores();
			memory.inScene = true;
		}
	}
	//Despawn Memory Game
	const DespawnMemGame = () => {
		if(memory.inScene){
			memory.layer.DespawnLayer();
			memory.memoryUI.DespawnLayer();
			memory.inScene = false;
			auxl.RemoveFromTracker(memory.id);
		}
	}
	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			memory.highScores = checkHighScore(score, memory.highScores);
		}
		memory.highScores.text = refreshHighScoreText(memory.highScores);
		memory.memoryUI.GetChild('memoryUI4').ChangeSelf({property:'text',value:{value:memory.highScores.text}});
		auxl.saveToProfile({auxlObject: memory.id, type: 'memory', sub: false, name: 'highScores', data: memory.highScores});
	}
	//Handle Game Menu Click
	const GameMenuClick = () => {
			if(gameStarted){
				GameReset();
			}else{
				GameStart();
			}
	}
	//Handle Memory Clicks & Check Sequence
	const MemoryClick = (el) => {
		if(pauseClick){}else{
			let selection;
			if(el.id === 'memory0'){
				selection = 0;
			} else if(el.id === 'memory1'){
				selection = 1;
			} else if(el.id === 'memory2'){
				selection = 2;
			} else if(el.id === 'memory3'){
				selection = 3;
			}
			playerSequence.push(selection);
			CheckSequence();
		}
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
		if(playerSequence[currInSequence] === allSequence[currInSequence]){
			//console.log('Match');
			currInSequence++;
			//push selection to front of sequenceRef and remove the last item
			sequenceTempArray.unshift('X');
			sequenceTempArray.pop();
			sequenceRef = sequenceTempArray.join("");
			memory.memoryUI.GetChild('memoryUI3').ChangeSelf({property: 'text', value: {value: 'Sequence :\n'+sequenceRef}});
		} else {
			//console.log('Game Over');
			gameStarted = false;
			gameOverTimeout1 = setTimeout(() => {
				GameOver();
			}, 250);
		}
		if(currInSequence >= currMaxSequence){
			//console.log('Correct Sequence');
			currInSequence = 0;
			currMaxSequence++;
			currentScore++;
			memory.memoryUI.GetChild('memoryUI1').ChangeSelf({property: 'text', value: {value: 'Current : ' + currentScore}});
			sequenceTempArray = [];
			for(let a = 1; a <= currMaxSequence; a++){
				sequenceTempArray.push('*');
			}
			sequenceRef = sequenceTempArray.join("");
			memory.memoryUI.GetChild('memoryUI3').ChangeSelf({property: 'text', value: {value: 'Sequence :\n'+sequenceRef}});
			playerSequence = [];
			roundCompleteTimeout1 = setTimeout(() => {
				NextLevel();
				clearTimeout(roundCompleteTimeout1);
			}, 250);
		}
	}
	//Game Reset
	const GameReset = () => {
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
		memory.memoryUI.GetChild('memoryUI1').ChangeSelf({property: 'text', value: {value: 'Game Over'}});
		memory.memoryUI.GetChild('memoryUI3').ChangeSelf({property: 'text', value: {value: 'Sequence :\n'}});
		memory.memoryUI.GetChild('memoryUI5').ChangeSelf({property: 'text', value: {value: 'Start'}});
	}
	//Game Start
	const GameStart = () => {
		GenRanSequence();
		gameStarted = true;
		memory.layer.GetChild('memory0').EmitEvent('gameStart');
		memory.memoryUI.GetChild('memoryUI1').ChangeSelf({property: 'text', value: {value: 'Game Started'}});
		memory.memoryUI.GetChild('memoryUI3').ChangeSelf({property: 'text', value: {value: 'Sequence :\n'+sequenceRef}});
		memory.memoryUI.GetChild('memoryUI5').ChangeSelf({property: 'text', value: {value: 'Reset'}});
		PlaySequence();
	}
	//Game Over
	const GameOver = () => {
		//Play Game Over Anim
		memory.layer.GetChild('memory0').EmitEvent('gameOver');
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('gameOver');
		}
		gameOverTimeout2 = setTimeout(() => {
			UpdateScores(currentScore);
			GameReset();
			clearTimeout(gameOverTimeout2);
		}, 2000);
	}
	//Next Level
	const NextLevel = () => {
		memory.layer.GetChild('memory0').EmitEvent('nextLevel');
		for(let each in memoryCores){
			memoryCores[each].EmitEvent('roundComplete');
		}
		roundCompleteTimeout2 = setTimeout(() => {
			PlaySequence();
			clearTimeout(roundCompleteTimeout2);
		}, 1500);
	}

	return{memory, core, SpawnMemGame, DespawnMemGame, GameMenuClick, MemoryClick};
}
auxl.memory = auxl.MemoryGame('memory');
//Memory Game Menu
auxl.memoryGameMenuData = {
	id: 'memoryGameMenu',
	game: auxl.memory.memory,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game1',
	gameCabinet: 'cadeCab1Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-11.75),
	inGamePos: new THREE.Vector3(0.8,1.5,-1.25),
};
auxl.memoryGameMenu = auxl.GameMenu(auxl.memoryGameMenuData);

//
//Swipe Launch
//Intersect In/Out as many times as you can to build up a meter and click to finalize it within a time frame to launch it a distance
auxl.SwipeLaunchGame = (id) => {

	let swipeLaunch = {};
	swipeLaunch.id = id;
	let core = 'swipeLaunch';
	swipeLaunch.title = 'Swipe Launch';
	swipeLaunch.instructionsText = 'How To Play :\nClick the Ready button to start the 3 second countdown.\nOn completion, you will have 6 seconds to hover on and off the ball as many times as you can.\nBefore the timer hits 0, click the ball to launch it.\nThe more times you hover and the closer you get to 0 when clicked, the more power to launch!';
	swipeLaunch.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	swipeLaunch.previewImage = auxl.pattern01;
	swipeLaunch.inScene = false;
	//Colors
	auxl.swipeLaunchGameColor = auxl.colorTheoryGen(false, 'red');
	//High Scores
	swipeLaunch.highScores = blankHighScores('Pts', 2);
	//Main Core
	swipeLaunch.data = {
	data:'swipeLaunchData',
	id:'swipeLaunchCore',
	sources: false,
	text: false,
	sounds: {
		start: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'gameStart'},
		hover: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'mouseenter'},
		launch: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
		timer: {src: auxl.glass1, autoplay: false, loop: false, volume: 1, on: 'second'},
		timeout: {src: auxl.minimize6, autoplay: false, loop: false, volume: 1, on: 'timeout'},
		gameover: {src: auxl.maximize6, autoplay: false, loop: false, volume: 1, on: 'gameOver'},
	},
	geometry: {primitive: 'sphere', radius: 0.5},
	material: {shader: "standard", color: auxl.swipeLaunchGameColor.splitCompl[1], emissive: auxl.swipeLaunchGameColor.splitCompl[1], emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,1,-0.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
	hover: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 1, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
	click: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 1000, delay: 0, loop: '1', dir: 'alternate', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mouseenterrun__hoveron:{
			cursorObj: swipeLaunch.id,
			component: 'null',
			method: 'hoverOn',
			params: 'null',
		},
		mouseleaverun__hoveroff:{
			cursorObj: swipeLaunch.id,
			component: 'null',
			method: 'hoverOff',
			params: 'null',
		},
		mousedownrun__launch:{
			cursorObj: swipeLaunch.id,
			component: 'null',
			method: 'launch',
			params: 'null',
		},
	},
	};
	swipeLaunch.core = auxl.Core(swipeLaunch.data);
	//Launch
	let launchAnimData = {
		name: 'launch',
		property: 'scale',
		to: new THREE.Vector3(1,1,1), 
		dur: 2500,
		delay: 0, 
		loop: false, 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};
	swipeLaunch.showData = {
	data:'swipeLaunchData',
	id:'swipeLaunchShow',
	sources: false,
	text: false,
	geometry: {primitive: 'sphere', radius: 0.5},
	material: {shader: "standard", color: auxl.swipeLaunchGameColor.splitCompl[0], emissive: auxl.swipeLaunchGameColor.splitCompl[0], emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,30,-45),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.1,0.1,0.1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	swipeLaunch.show = auxl.Core(swipeLaunch.showData);
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

	//UI
	swipeLaunch.swipeLaunchUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'swipeLaunchUI',{position: new THREE.Vector3(1,1.5,-0.5)}, true);
	swipeLaunch.swipeLaunchUI = auxl.Layer('swipeLaunchUI',swipeLaunch.swipeLaunchUIData);
	//Parent : swipeLaunchUI0
	//Game Status : swipeLaunchUI1
	swipeLaunch.swipeLaunchUI.layer.all.child0.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child0.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child0.core.core.text.value = 'Ready?';
	//Game Title : swipeLaunchUI2
	swipeLaunch.swipeLaunchUI.layer.all.child1.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child1.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child1.core.core.text.value = 'Swipe Launch';
	//Current Level & Points : swipeLaunchUI3
	swipeLaunch.swipeLaunchUI.layer.all.child2.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child2.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child2.core.core.text.value = '0';
	//High Score Board : swipeLaunchUI4
	swipeLaunch.swipeLaunchUI.layer.all.child3.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child3.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	//Game Start : swipeLaunchUI5
	swipeLaunch.swipeLaunchUI.layer.all.child4.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child4.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child4.core.core.components = {};
	swipeLaunch.swipeLaunchUI.layer.all.child4.core.core.components.clickrun__countdown = {cursorObj: swipeLaunch.id, component: 'null', method: 'countdownPrep', params: 'null',};
	//Game Control : swipeLaunchUI6
	swipeLaunch.swipeLaunchUI.layer.all.child5.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child5.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child5.core.core.components = {};
	swipeLaunch.swipeLaunchUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : swipeLaunchUI7
	swipeLaunch.swipeLaunchUI.layer.all.child6.core.core.material.color = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child6.core.core.material.emissive = auxl.swipeLaunchGameColor.compl;
	swipeLaunch.swipeLaunchUI.layer.all.child6.core.core.components = {};
	swipeLaunch.swipeLaunchUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'swipeLaunchGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};


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

	//Update Scores
	function updateScores(score){
		if(score){
			swipeLaunch.highScores = checkHighScore(score, swipeLaunch.highScores);
		}
		swipeLaunch.highScores.text = refreshHighScoreText(swipeLaunch.highScores);
		swipeLaunch.swipeLaunchUI.GetChild('swipeLaunchUI4').ChangeSelf({property:'text', value:{value:swipeLaunch.highScores.text}});
		auxl.saveToProfile({auxlObject: swipeLaunch.id, type: 'swipeLaunch', sub: false, name: 'highScores', data: swipeLaunch.highScores});
	}
	//Reset
	function reset(){
		clearTimeout(swipeLaunch.starting0);
		clearTimeout(swipeLaunch.starting1);
		clearTimeout(swipeLaunch.starting2);
		clearInterval(swipeLaunch.countdownInterval);
		clearTimeout(swipeLaunch.gameOver);
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
		swipeLaunch.show.ChangeSelf({property: 'scale', value: new THREE.Vector3(0.1,0.1,0.1)})
	};
	//Update Time Text
	function updateTimeText(text){
		swipeLaunch.swipeLaunchUI.GetChild('swipeLaunchUI1').ChangeSelf({property: 'text', value:{value:text}})
	};
	//Update Power Text
	function updatePowerText(text){
		swipeLaunch.swipeLaunchUI.GetChild('swipeLaunchUI3').ChangeSelf({property: 'text', value:{value:text}})
	};
	//Game Start Countdown
	function countdownPrep(){
		if(swipeLaunch.starting){}else{
			swipeLaunch.starting = true;
			reset();
			updateTimeText('3');
			swipeLaunch.core.EmitEvent('second');
			swipeLaunch.starting2 = setTimeout(() => {
				updateTimeText('2');
				swipeLaunch.core.EmitEvent('second');
				swipeLaunch.starting1 = setTimeout(() => {
					updateTimeText('1');
					swipeLaunch.core.EmitEvent('second');
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
		swipeLaunch.core.EmitEvent('gameStart');
		swipeLaunch.core.GetEl().classList.toggle('clickable');
		swipeLaunch.timeDisplay = swipeLaunch.time/1000;
		swipeLaunch.countdownInterval = setInterval(() => {
			swipeLaunch.timeDisplay -= 0.01;
			swipeLaunch.time -= 10;
			if(swipeLaunch.time % 1000 === 0){
				swipeLaunch.core.EmitEvent('second');
			}
			if(swipeLaunch.timeDisplay <= 0){
				swipeLaunch.core.EmitEvent('timeout');
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
			swipeLaunch.core.GetEl().classList.toggle('clickable');
			clearInterval(swipeLaunch.countdownInterval);
			let exp = 1.41;
			exp = exp + (((swipeLaunch.hits*17)/swipeLaunch.time) * 0.01);
			swipeLaunch.power = Math.pow(swipeLaunch.hits, exp);
			let scale = swipeLaunch.power /10;
			launchAnimData.to = new THREE.Vector3(scale,scale,scale);

			let time = ((swipeLaunch.power * 0.975) * 10) + (((swipeLaunch.power * 0.024)/0.1) * 50) + (((swipeLaunch.power * 0.001)/0.01) * 100);
			//console.log(time)

			launchAnimData.dur = time;
			swipeLaunch.show.Animate(launchAnimData);
			displayPowerFast();
			//console.log('Launch');
			//console.log(swipeLaunch.hits);
			//console.log(swipeLaunch.power);
		}
	};
	//Display Power Fast
	function displayPowerFast(){
		//console.log('displayPowerFast');
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
		//console.log('displayPowerSlow');
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
		//console.log('displayPowerSlower');
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
		updateScores(swipeLaunch.power);
		swipeLaunch.core.EmitEvent('gameOver');
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
		if(swipeLaunch.inScene){}else{
			swipeLaunch.core.SpawnCore();
			swipeLaunch.show.SpawnCore();
			swipeLaunch.swipeLaunchUI.SpawnLayer();
			updateScores();
			swipeLaunch.inScene = true;
		}
	}
	//Despawn Game
	const DespawnSLGame = () => {
		if(swipeLaunch.inScene){
			reset();
			swipeLaunch.core.DespawnCore();
			swipeLaunch.show.DespawnCore();
			swipeLaunch.swipeLaunchUI.DespawnLayer();
			auxl.RemoveFromTracker(swipeLaunch.id);
			swipeLaunch.inScene = false;
			auxl.RemoveFromTracker(swipeLaunch.id);
		}
	}

	return {swipeLaunch, core, SpawnSLGame, DespawnSLGame, hoverOn, hoverOff, launch, countdownPrep};
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
	gameCabinet: 'cadeCab2Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-13.75),
	inGamePos: new THREE.Vector3(0.75,1.5,-0.25),
};
auxl.swipeLaunchGameMenu = auxl.GameMenu(auxl.swipeLaunchGameMenuData);

//
//Guess Hit
//Guesstimate intersection point selection on ceiling that would match objects on floor. Like a claw machine.
auxl.GuessHitGame = (id) => {

	let guessHit = {};
	guessHit.id = id;
	let core = 'guessHit';
	guessHit.title = 'Guess Hit';
	guessHit.instructionsText = 'How To Play :\nFor each box, guess the the position by clicking on the ceiling.\nIf you hit it, it will be removed.\nIf you can hit them all within 10 tries, you move to the next level.\nMore points for better accuracy hits.';
	guessHit.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	guessHit.previewImage = auxl.pattern02;
	guessHit.inScene = false;
	//Colors
	auxl.guessHitGameColor = auxl.colorTheoryGen(false, 'yellow');
	//High Scores
	guessHit.highScores = blankHighScores('Pts', 1);

	//Fields
	//Field 1 : Circle
	//Field 2 : Rectangle
	//Field 3 : Ring
	guessHit.fieldData = {
	data:'fieldData',
	id:'field',
	sources: false,
	text: false,
	sounds: {
		hit: {src: auxl.drop4, autoplay: false, loop: false, volume: 1, on: 'hit'},
		miss: {src: auxl.switch2, autoplay: false, loop: false, volume: 1, on: 'miss'},
		gamestart: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'gameStart'},
		gameover: {src: auxl.minimize6, autoplay: false, loop: false, volume: 1, on: 'gameOver'},
		nextlevel: {src: auxl.maximize6, autoplay: false, loop: false, volume: 1, on: 'nextLevel'},
	},
	geometry: {primitive: 'circle', radius: 30},
	material: {shader: "standard", src: auxl.pattern14, repeat: '30 30', color: auxl.guessHitGameColor.splitCompl[1], emissive: auxl.guessHitGameColor.splitCompl[1], emissiveIntensity: 0.25, opacity: 1, side: 'double'},
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
	guessHit.hitTimeouts = [guessHit.hitTimeout1, guessHit.hitTimeout2, guessHit.hitTimeout3, guessHit.hitTimeout4];
	//Guess1
	guessHit.guessData = {
	data:'guessData',
	id:'guess1',
	sources: false,
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.5, height: 0.5, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", src: auxl.pattern78, repeat: '1 1', color: auxl.guessHitGameColor.compl, emissive: auxl.guessHitGameColor.compl, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,0.25,-3),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
	hit: {property: 'scale', from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(0.001,0.001,0.001), dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'hit'},
	},
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
	material: {shader: "standard", src: auxl.pattern10, repeat: '10 10', color: "#ddd517", emissive: '#ddd517', emissiveIntensity: 0.25, opacity: 0.25},
	position: new THREE.Vector3(0,4,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,0.01,1),
	animations: {
	spawn: {property: 'object3D.scale.y', from: 0.01, to: 1, dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'loaded'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	guessHit.hit = auxl.Core(guessHit.hitData);

	//UI
	guessHit.guessHitUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'guessHitUI',{position: new THREE.Vector3(1,1.5,-0.5)}, true);
	guessHit.guessHitUI = auxl.Layer('guessHitUI',guessHit.guessHitUIData);

	//Parent : guessHitUI0
	//Game Status : guessHitUI1
	guessHit.guessHitUI.layer.all.child0.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child0.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : guessHitUI2
	guessHit.guessHitUI.layer.all.child1.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child1.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child1.core.core.text.value = 'Guess Hit';
	//Current Level & Points : guessHitUI3
	guessHit.guessHitUI.layer.all.child2.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child2.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child2.core.core.text.value = 'Level 1-1\n0pts';
	//High Score Board : guessHitUI4
	guessHit.guessHitUI.layer.all.child3.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child3.core.core.material.emissive = auxl.guessHitGameColor.compl;
	//Game Start : guessHitUI5
	guessHit.guessHitUI.layer.all.child4.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child4.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child4.core.core.components = {};
	guessHit.guessHitUI.layer.all.child4.core.core.components.clickrun__start = {cursorObj: guessHit.id, component: 'null', method: 'start', params: 'null',};
	//Game Control : guessHitUI6
	guessHit.guessHitUI.layer.all.child5.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child5.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child5.core.core.components = {};
	guessHit.guessHitUI.layer.all.child5.core.core.components.visible = false;
	guessHit.guessHitUI.layer.all.child5.core.core.components.clickrun__next = {cursorObj: guessHit.id, component: 'null', method: 'next', params: 'null',};
	//Game Menu : guessHitUI7
	guessHit.guessHitUI.layer.all.child6.core.core.material.color = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child6.core.core.material.emissive = auxl.guessHitGameColor.compl;
	guessHit.guessHitUI.layer.all.child6.core.core.components = {};
	guessHit.guessHitUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'guessHitGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Game Var
	guessHit.start = false;
	guessHit.hitSpawned = false;
	guessHit.points = 0;
	guessHit.type = 1;
	guessHit.level = 1;
	guessHit.clicks = 10;
	guessHit.spawnRadius = 12.5;
	guessHit.hitRadius = 1.5;
	guessHit.checkFor = [guessHit.guess1, guessHit.guess2, guessHit.guess3, guessHit.guess4];

	//Update Scores
	function updateScores(score){
		if(score){
			guessHit.highScores = checkHighScore(score, guessHit.highScores);
		}
		guessHit.highScores.text = refreshHighScoreText(guessHit.highScores);
		guessHit.guessHitUI.GetChild('guessHitUI4').ChangeSelf({property:'text',value:{value:guessHit.highScores.text}});
		auxl.saveToProfile({auxlObject: guessHit.id, type: 'guessHit', sub: false, name: 'highScores', data: guessHit.highScores});
	}
	//Reduce Decimals
	function reduceDecimal(num, x){
		return Math.round(num * Math.pow(10,x)) / Math.pow(10,x);
	}
	//Function to calculate distance between two points
	function distance(x1, y1, x2, y2) {
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
			if(newX < 12 && newX > -12){
				if(newX > 0){
					newX += 12;
				} else {
					newX -= 12;
				}
			}
			newZ = (Math.random()*60)-30;
			if(newZ < 12 && newZ > -12){
				if(newZ > 0){
					newZ += 12;
				} else {
					newZ -= 12;
				}
			}
		}
		guessHit[object].core.position = new THREE.Vector3(newX,0.25,newZ);
	}
	//Object Hit
	function objectHit(object, timeout){
		object.EmitEvent('hit');
		guessHit.hitTimeouts[timeout] = setTimeout(() => {
			object.DespawnCore();
			clearTimeout(guessHit.hitTimeouts[timeout]);
		}, 1010);
	}
	//On click off click object, use intersection XZ to see if it is within radius
	function checkForHit(event){
		guessHit.clicks--;

		let hit = false;

		let guessPos = event.detail.intersection.point;

		spawnHit();
		guessHit.hit.ChangeSelf([{property: 'scale', value: new THREE.Vector3(1,0.01,1)},{property: 'position', value: new THREE.Vector3(guessPos.x,4,guessPos.z)}]);
		guessHit.hit.EmitEvent('loaded');

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
				objectHit(guessHit.checkFor[guess], guessHit.checkFor.length);
				guessHit.checkFor.splice(guessHit.checkFor.indexOf(guessHit.checkFor[guess]), 1);
				let points = 10*bonus;
				points = reduceDecimal(points, 2);
				guessHit.points += points;
				guessHit.points = reduceDecimal(guessHit.points, 2);
				updateTotalText('Level ' + guessHit.level + '-' + guessHit.type + '\n' + guessHit.points + 'pts');
				if(guessHit.checkFor.length <= 0){
					updateCurrentText('Hit! ' + points + ' Pts | Complete! | Next?');
					guessHit.guessHitUI.GetChild('guessHitUI6').ChangeSelf({property: 'visible', value: true});
					guessHit.field.GetEl().removeEventListener('click',checkForHit);
				} else {
					updateCurrentText('Hit! ' + points + ' Pts | '+ guessHit.checkFor.length + ' Left | ' + guessHit.clicks + ' Tries');
				}
				break;
			}
		}
		if(hit){
			guessHit.field.EmitEvent('hit');
		}else{
			updateHitColor('red');
			updateCurrentText('Miss | ' + guessHit.clicks + ' Tries');
			updateCurrentText('Miss | ' + guessHit.checkFor.length + ' Left | ' + guessHit.clicks + ' Tries');
			guessHit.field.EmitEvent('miss');
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
		guessHit.guessHitUI.GetChild('guessHitUI5').ChangeSelf({property: 'text', value:{value:'Restart'}});
		reset();
		guessHit.field.GetEl().addEventListener('click',checkForHit);
		loadObjects(guessHit.type);
		guessHit.field.EmitEvent('gameStart');
	}
	//Game Over
	function gameOver(){
		updateScores(guessHit.points);
		updateCurrentText('Game Over');
		guessHit.field.GetEl().removeEventListener('click',checkForHit);
		unloadObjects();
		DespawnHit();
		guessHit.guessHitUI.GetChild('guessHitUI5').ChangeSelf({property: 'text', value:{value:'Start'}});
		guessHit.field.EmitEvent('gameOver');
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
		DespawnHit();
		guessHit.points = 0;
		guessHit.level = 1;
		guessHit.type = 1;
		guessHit.clicks = 10;
		guessHit.hitRadius = 1.5;
		updateField(1);
		updateCurrentText('Ready | 4 Left | 10 Tries');
		updateTotalText('Level ' + guessHit.level + '-' + guessHit.type + '\n' + guessHit.points + 'pts');
	}
	//Next Type/Level
	function next(){
		guessHit.guessHitUI.GetChild('guessHitUI6').ChangeSelf({property: 'visible', value: false});
		guessHit.type++;
		if(guessHit.type === 4){
			guessHit.level++;
			guessHit.type = 1;
		}
		if(guessHit.type === 1){
			guessHit.clicks = 10;
		} else if(guessHit.type === 2){
			guessHit.clicks = 11;
		} else if(guessHit.type === 3){
			guessHit.clicks = 12;
		}
		updateField(guessHit.type);
		updateCurrentText('Ready | 4 Left | '+guessHit.clicks+' Tries');
		updateTotalText('Level ' + guessHit.level + '-' + guessHit.type + '\n' + guessHit.points + 'pts');
		loadObjects(guessHit.type);
		//change field type
		DespawnHit();
		guessHit.field.GetEl().addEventListener('click',checkForHit);
		guessHit.field.EmitEvent('nextLevel');
	}
	//Display Current Text
	function updateCurrentText(text){
		guessHit.guessHitUI.GetChild('guessHitUI1').ChangeSelf({property: 'text', value:{value:text}})
	};
	//Display Total Score Text
	function updateTotalText(text){
		guessHit.guessHitUI.GetChild('guessHitUI3').ChangeSelf({property: 'text', value:{value:text}})
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
		if(guessHit.inScene){}else{
			guessHit.field.SpawnCore();
			guessHit.guessHitUI.SpawnLayer();
			updateScores();
			guessHit.inScene = true;
		}
	}
	//Despawn Game
	const DespawnGHGame = () => {
		if(guessHit.inScene){
			guessHit.hitTimeouts.forEach(timeout => guessHit.hitTimeouts[timeout]);
			unloadObjects();
			DespawnHit();
			guessHit.guessHitUI.DespawnLayer();
			guessHit.field.DespawnCore();
			auxl.RemoveFromTracker(guessHit.id);
			guessHit.inScene = false;
			auxl.RemoveFromTracker(guessHit.id);
		}
	}

	return {guessHit, core, SpawnGHGame, DespawnGHGame, start, next};
}
auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');
//Guess Hit Game Menu
auxl.guessHitGameMenuData = {
	id: 'guessHitGameMenu',
	game: auxl.guessHitGame.guessHit,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game3',
	gameCabinet: 'cadeCab3Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-15.75),
	inGamePos: new THREE.Vector3(0.75,1.5,-0.25),
};
auxl.guessHitGameMenu = auxl.GameMenu(auxl.guessHitGameMenuData);

//
//Drag Diffuse
//Drag from center to randomly spawned outward point before it times out/explodes
auxl.DragDiffuse = (id) => {

	let dragDiffuse = {};
	dragDiffuse.id = id;
	let core = 'dragDiffuse';
	dragDiffuse.title = 'Drag Diffuse';
	dragDiffuse.instructionsText = 'How To Play :\nAs each bomb pops up, drag from the center to a bomb to diffuse it.\nDiffuse each bomb before 1 blows up.';
	dragDiffuse.controlsText = 'Game Controls :\nUse the controller ray and controller click and hold to play the game.';
	dragDiffuse.previewImage = auxl.pattern04;
	dragDiffuse.inScene = false;
	//Colors
	auxl.dragDiffuseGameColor = auxl.colorTheoryGen(false, 'cyan');
	//High Scores
	dragDiffuse.highScores = blankHighScores('Pts', 2);

	//Timeout & Intervals
	dragDiffuse.levelDelay;
	dragDiffuse.startDelay;
	dragDiffuse.gameInterval;

	//Game Status
	let level = 1;
	dragDiffuse.gameStarted = false;
	dragDiffuse.level = level;
	dragDiffuse.bombsLeft = 0;
	dragDiffuse.points = 0;
	//Level Progression
	let spawnSpeed = 2000;
	let blowSpeed = 4000;
	let bombsToSpawn = 1;
	dragDiffuse.spawnSpeed = spawnSpeed;
	dragDiffuse.blowSpeed = blowSpeed;
	dragDiffuse.bombsToSpawn = bombsToSpawn;

	//UI
	dragDiffuse.dragDiffuseUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'dragDiffuseUI',{position: new THREE.Vector3(1.35,1.5,-0.5)}, true);
	dragDiffuse.dragDiffuseUI = auxl.Layer('dragDiffuseUI',dragDiffuse.dragDiffuseUIData);
	//Parent : dragDiffuseUI0
	//Game Status : dragDiffuseUI1
	dragDiffuse.dragDiffuseUI.layer.all.child0.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child0.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : dragDiffuseUI2
	dragDiffuse.dragDiffuseUI.layer.all.child1.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child1.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child1.core.core.text.value = 'Drag Diffuse';
	//Current Level & Points : dragDiffuseUI3
	dragDiffuse.dragDiffuseUI.layer.all.child2.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child2.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child2.core.core.text.value = 'Level 1\nReady?\n0.00pts';
	//High Score Board : dragDiffuseUI4
	dragDiffuse.dragDiffuseUI.layer.all.child3.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child3.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	//Game Start : dragDiffuseUI5
	dragDiffuse.dragDiffuseUI.layer.all.child4.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child4.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child4.core.core.components = {};
	dragDiffuse.dragDiffuseUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: 'dragDiffuseGame', component: 'null', method: 'GameStart', params: 'null',};;
	//Game Control : dragDiffuseUI6
	dragDiffuse.dragDiffuseUI.layer.all.child5.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child5.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child5.core.core.components = {};
	dragDiffuse.dragDiffuseUI.layer.all.child5.core.core.components.visible = false;
	dragDiffuse.dragDiffuseUI.layer.all.child5.core.core.components.clickrun__levelstart = {cursorObj: 'dragDiffuseGame', component: 'null', method: 'LevelStart', params: 'null',};;
	//Game Menu : dragDiffuseUI7
	dragDiffuse.dragDiffuseUI.layer.all.child6.core.core.material.color = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child6.core.core.material.emissive = auxl.dragDiffuseGameColor.compl;
	dragDiffuse.dragDiffuseUI.layer.all.child6.core.core.components = {};
	dragDiffuse.dragDiffuseUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'dragDiffuseGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};
	//Game Parts
	dragDiffuse.gameParentData = {
	data:'gameParentData',
	id:'gameParent',
	sources:false,
	text: false,
	sounds: {
		dragstart: {src: auxl.drop2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
		spawn: {src: auxl.pluck1, autoplay: false, loop: false, volume: 1, on: 'spawn'},
		diffuse: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'diffuse'},
		explode: {src: auxl.error7, autoplay: false, loop: false, volume: 1, on: 'explode'},
		gamestart: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'gameStart'},
		levelstart: {src: auxl.maximize8, autoplay: false, loop: false, volume: 1, on: 'levelStart'},
		gameover: {src: auxl.minimize6, autoplay: false, loop: false, volume: 1, on: 'gameOver'},
		nextlevel: {src: auxl.maximize6, autoplay: false, loop: false, volume: 1, on: 'nextLevel'},
	},
	geometry: {primitive: 'sphere', radius: 0.5, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
	material: {shader: "standard", color: auxl.dragDiffuseGameColor.splitCompl[1], emissive: auxl.dragDiffuseGameColor.splitCompl[1], emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,1.25,-1),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		levelstart: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 575, delay: 0, loop: 4, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'levelstart'},
		levelcomplete: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 125, delay: 0, loop: 8, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'levelcomplete'},
		gamefail: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 2000, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gamefail'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mousedownrun__start:{
			cursorObj: dragDiffuse.id,
			component: 'null',
			method: 'DragStart',
			params: 'null',
		},
		mouseuprun__fail:{
			cursorObj: dragDiffuse.id,
			component: 'null',
			method: 'DragFail',
			params: 'null',
		},
	},
	};
	dragDiffuse.gameParent = auxl.Core(dragDiffuse.gameParentData);
	//Parent
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
	dragDiffuse.dragParentData.id = 'dragParent0';
	dragDiffuse.dragParent0 = auxl.Core(dragDiffuse.dragParentData);
	//0
	dragDiffuse.dragMainData = {
	data:'dragMainData',
	id:'dragMain',
	text: false,
	geometry: {primitive: 'sphere', radius: 0.15, segmentsWidth: 36, segmentsHeight: 18, phiLength: 360, phiStart: 0, thetaLength: 360, thetaStart: 0},
	material: {shader: "standard", color: auxl.dragDiffuseGameColor.compl, emissive: auxl.dragDiffuseGameColor.compl, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0.8,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		countdownx: {property: 'object3D.scale.x', from: 0.001, to: 0.9, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown'},
		countdowny: {property: 'object3D.scale.y', from: 0.001, to: 0.9, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown'},
		countdownz: {property: 'object3D.scale.z', from: 0.001, to: 0.9, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown'},

		resetx: {property: 'object3D.scale.x', from: 0.9, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
		resety: {property: 'object3D.scale.y', from: 0.9, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},
		resetz: {property: 'object3D.scale.z', from: 0.9, to: 0.001, dur: 500, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset'},

		blowupx: {property: 'object3D.scale.x', from: 0.9, to: 100, dur: 1250, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blow'},
		blowupy: {property: 'object3D.scale.y', from: 0.9, to: 100, dur: 1250, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blow'},
		blowupz: {property: 'object3D.scale.z', from: 0.9, to: 100, dur: 1250, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blow'},

		blowbackx: {property: 'object3D.scale.x', from: 100, to: 0.001, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__blowupx'},
		blowbacky: {property: 'object3D.scale.y', from: 100, to: 0.001, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__blowupy'},
		blowbackz: {property: 'object3D.scale.z', from: 100, to: 0.001, dur: 750, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__blowupz'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		mousedownrun__stop:{
			cursorObj: dragDiffuse.id,
			component: 'null',
			method: 'StopBombBubbling',
			params: 'null',
		},
		mouseenterrun__end:{
			cursorObj: dragDiffuse.id,
			component: 'null',
			method: 'DragEnd',
			params: 'target',
		},
	},
	};
	dragDiffuse.dragMainData.id = 'dragMain0';
	dragDiffuse.dragMain0 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData = {
	data:'dragOuterData',
	id:'dragOuter',
	text: false,
	geometry: {primitive: 'ring', radiusInner: 0.175, radiusOuter: 0.25, thetaLength: 0},
	material: {shader: "standard", color: auxl.dragDiffuseGameColor.base, emissive: auxl.dragDiffuseGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0.8,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		countdown: {property: 'geometry.thetaLength', from: 0, to: 360, dur: dragDiffuse.blowSpeed, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown', pauseEvents: 'reset'},
		reset: {property: 'geometry.thetaLength', to: 0, dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'reset',},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		oneventrun__blow:{
			event: 'animationcomplete__countdown',
			cursorObj: 'dragDiffuseGame',
			component: 'null',
			method: 'Blow',
			params: 'null',
		},
	},
	};
	dragDiffuse.dragOuterData.id = 'dragOuter0';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '0';
	dragDiffuse.dragOuter0 = auxl.Core(dragDiffuse.dragOuterData);
	//1
	dragDiffuse.dragParentData.id = 'dragParent1';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-45);
	dragDiffuse.dragParent1 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain1';
	dragDiffuse.dragMain1 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter1';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '1';
	dragDiffuse.dragOuter1 = auxl.Core(dragDiffuse.dragOuterData);
	//2
	dragDiffuse.dragParentData.id = 'dragParent2';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-90);
	dragDiffuse.dragParent2 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain2';
	dragDiffuse.dragMain2 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter2';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '2';
	dragDiffuse.dragOuter2 = auxl.Core(dragDiffuse.dragOuterData);
	//3
	dragDiffuse.dragParentData.id = 'dragParent3';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-135);
	dragDiffuse.dragParent3 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain3';
	dragDiffuse.dragMain3 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter3';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '3';
	dragDiffuse.dragOuter3 = auxl.Core(dragDiffuse.dragOuterData);
	//4
	dragDiffuse.dragParentData.id = 'dragParent4';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-180);
	dragDiffuse.dragParent4 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain4';
	dragDiffuse.dragMain4 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter4';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '4';
	dragDiffuse.dragOuter4 = auxl.Core(dragDiffuse.dragOuterData);
	//5
	dragDiffuse.dragParentData.id = 'dragParent5';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-225);
	dragDiffuse.dragParent5 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain5';
	dragDiffuse.dragMain5 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter5';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '5';
	dragDiffuse.dragOuter5 = auxl.Core(dragDiffuse.dragOuterData);
	//6
	dragDiffuse.dragParentData.id = 'dragParent6';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-270);
	dragDiffuse.dragParent6 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain6';
	dragDiffuse.dragMain6 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter6';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '6';
	dragDiffuse.dragOuter6 = auxl.Core(dragDiffuse.dragOuterData);
	//7
	dragDiffuse.dragParentData.id = 'dragParent7';
	dragDiffuse.dragParentData.rotation = new THREE.Vector3(0,0,-315);
	dragDiffuse.dragParent7 = auxl.Core(dragDiffuse.dragParentData);
	dragDiffuse.dragMainData.id = 'dragMain7';
	dragDiffuse.dragMain7 = auxl.Core(dragDiffuse.dragMainData);
	dragDiffuse.dragOuterData.id = 'dragOuter7';
	dragDiffuse.dragOuterData.components.oneventrun__blow.params = '7';
	dragDiffuse.dragOuter7 = auxl.Core(dragDiffuse.dragOuterData);
	//Layer
	dragDiffuse.gameAllData = {
		parent: {core: dragDiffuse.gameParent},
		child0: {
			parent: {core: dragDiffuse.dragParent0},
			child0: {core: dragDiffuse.dragMain0},
			child1: {core: dragDiffuse.dragOuter0},
		},
		child1: {
			parent: {core: dragDiffuse.dragParent1},
			child0: {core: dragDiffuse.dragMain1},
			child1: {core: dragDiffuse.dragOuter1},
		},
		child2: {
			parent: {core: dragDiffuse.dragParent2},
			child0: {core: dragDiffuse.dragMain2},
			child1: {core: dragDiffuse.dragOuter2},
		},
		child3: {
			parent: {core: dragDiffuse.dragParent3},
			child0: {core: dragDiffuse.dragMain3},
			child1: {core: dragDiffuse.dragOuter3},
		},
		child4: {
			parent: {core: dragDiffuse.dragParent4},
			child0: {core: dragDiffuse.dragMain4},
			child1: {core: dragDiffuse.dragOuter4},
		},
		child5: {
			parent: {core: dragDiffuse.dragParent5},
			child0: {core: dragDiffuse.dragMain5},
			child1: {core: dragDiffuse.dragOuter5},
		},
		child6: {
			parent: {core: dragDiffuse.dragParent6},
			child0: {core: dragDiffuse.dragMain6},
			child1: {core: dragDiffuse.dragOuter6},
		},
		child7: {
			parent: {core: dragDiffuse.dragParent7},
			child0: {core: dragDiffuse.dragMain7},
			child1: {core: dragDiffuse.dragOuter7},
		},
	}
	dragDiffuse.gameAll = auxl.Layer('gameAll', dragDiffuse.gameAllData);
	//Main & Outer Name References
	let mainsAll = ['dragMain0','dragMain1','dragMain2','dragMain3','dragMain4','dragMain5','dragMain6','dragMain7'];
	let outersAll = ['dragOuter0','dragOuter1','dragOuter2','dragOuter3','dragOuter4','dragOuter5','dragOuter6','dragOuter7'];
	//Array of Outer Cores
	let allOuter = [
		dragDiffuse.dragOuter0,
		dragDiffuse.dragOuter1,
		dragDiffuse.dragOuter2,
		dragDiffuse.dragOuter3,
		dragDiffuse.dragOuter4,
		dragDiffuse.dragOuter5,
		dragDiffuse.dragOuter6,
		dragDiffuse.dragOuter7,
	];
	//Drag Gameplay
	let dragStarted = false;
	let fuseStart = Array.from(mainsAll);
	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			dragDiffuse.highScores = checkHighScore(score, dragDiffuse.highScores);
		}
		dragDiffuse.highScores.text = refreshHighScoreText(dragDiffuse.highScores);
		dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI4').ChangeSelf({property:'text',value:{value:dragDiffuse.highScores.text}});
		auxl.saveToProfile({auxlObject: dragDiffuse.id, type: 'dragDiffuse', sub: false, name: 'highScores', data: dragDiffuse.highScores});
	}
	//System Reset
	const Reset = () => {
		clearTimeout(dragDiffuse.levelDelay)
		clearTimeout(dragDiffuse.startDelay)
		clearInterval(dragDiffuse.gameInterval)
		Dragged();
		fuseStart = Array.from(mainsAll);
	}
	//Game Start
	const GameStart = () => {
		if(dragDiffuse.gameStarted){
			//Reset
			GameOver();
		} else {
			dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI5').ChangeSelf({property: 'visible', value: false});
			dragDiffuse.gameStarted = true;
			dragDiffuse.points = 0;
			dragDiffuse.level = level;
			dragDiffuse.spawnSpeed = spawnSpeed;
			dragDiffuse.blowSpeed = blowSpeed;
			allOuter.forEach(outer => outer.Animate({name: 'countdown', property: 'geometry.thetaLength', from: 0, to: 360, dur: dragDiffuse.blowSpeed, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown', pauseEvents: 'reset'}));
			dragDiffuse.bombsToSpawn = bombsToSpawn;
			LevelStart();
		}
	};
	//Level Start
	const LevelStart = () => {
		dragDiffuse.gameParent.EmitEvent('gameStart');
		dragDiffuse.gameParent.GetEl().classList.toggle('clickable');
		dragDiffuse.gameAll.EmitEventParent('levelstart');
		dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI6').ChangeSelf({property:'visible', value: false});
		dragDiffuse.diffuseTotal = 4 + (dragDiffuse.level*2);
		UpdateStatus('Fusing | ' + dragDiffuse.bombsToSpawn +' Bombs | ' + dragDiffuse.diffuseTotal + ' Bombs Left');
		UpdateCurrent('Level ' + dragDiffuse.level + '\n' + 'Get Ready\n' + dragDiffuse.points.toFixed(2) + ' Pts');
		dragDiffuse.startDelay = setTimeout(() => {
			dragDiffuse.gameParent.EmitEvent('levelStart');
			dragDiffuse.gameInterval = setInterval(() => {
				for(let a = 0; a < dragDiffuse.bombsToSpawn; a++){
					CountdownRandom();
				}
			}, dragDiffuse.spawnSpeed);
		}, 2250);
	};
	//Level Complete
	const LevelComplete = () => {
		dragDiffuse.gameParent.EmitEvent('nextLevel');
		ResetBombs();
		dragDiffuse.gameAll.EmitEventParent('levelcomplete');
		dragDiffuse.level++;
		UpdateStatus('Complete | ' + dragDiffuse.bombsToSpawn +' Bombs | ' + dragDiffuse.diffuseTotal + ' Bombs Left');
		//Increase Difficulty
		if(dragDiffuse.level === 5 || dragDiffuse.level === 15 || dragDiffuse.level === 25){
			dragDiffuse.bombsToSpawn += 1;//1->4
			dragDiffuse.spawnSpeed = spawnSpeed;//2500
			dragDiffuse.blowSpeed = blowSpeed;//5000
			allOuter.forEach(outer => outer.Animate({name: 'countdown', property: 'geometry.thetaLength', from: 0, to: 360, dur: dragDiffuse.blowSpeed, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown', pauseEvents: 'reset'}));
		} else if(dragDiffuse.level < 57 && dragDiffuse.level % 2 === 0){
			dragDiffuse.spawnSpeed -= 100;//2000->500
			dragDiffuse.blowSpeed -= 200;//4000->1000
			allOuter.forEach(outer => outer.Animate({name: 'countdown', property: 'geometry.thetaLength', from: 0, to: 360, dur: dragDiffuse.blowSpeed, delay: 0, loop: 'false', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'countdown', pauseEvents: 'reset'}));
		}
//console.log({level: dragDiffuse.level, bombs: dragDiffuse.bombsToSpawn, spawn: dragDiffuse.spawnSpeed, blow: dragDiffuse.blowSpeed,})
		dragDiffuse.points += (dragDiffuse.level*10);
		Reset();
		dragDiffuse.levelDelay = setTimeout(() => {
			dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI6').ChangeSelf({property:'visible',value: true});
			dragDiffuse.gameParent.GetEl().classList.toggle('clickable');
		}, 1000);
	}
	//Random Drag Selection Countdown
	const CountdownRandom = () => {
		if(fuseStart.length > 0){
			let select = Math.floor(Math.random()*fuseStart.length);
			let drag = mainsAll.indexOf(fuseStart[select]);
			dragDiffuse[mainsAll[drag]].EmitEvent('countdown');
			dragDiffuse[outersAll[drag]].EmitEvent('countdown');
			fuseStart.splice(select, 1);
			dragDiffuse.gameParent.EmitEvent('spawn');
		}
	}
	//Drag Start
	const DragStart = () => {
		if(dragStarted){}else{
			dragStarted = true;
			dragDiffuse.gameParent.ChangeSelf({property: 'material', value: {emissiveIntensity: 1}})
		}
	}
	//Dragged
	const Dragged = () => {
		dragStarted = false;
		dragDiffuse.gameParent.ChangeSelf({property: 'material', value: {emissiveIntensity: 0.25}})
	}
	//Drag Fail
	const DragFail = () => {
		if(dragStarted){
			Dragged();
		}
	}
	//Drag Complete
	const DragEnd = (target) => {
		if(dragStarted){
			for(let main in mainsAll){
				if(target.id === mainsAll[main]){
					dragDiffuse.gameParent.EmitEvent('diffuse');
					Dragged();
					let bonus = ((dragDiffuse.blowSpeed - dragDiffuse[outersAll[main]].GetEl().components.animation__countdown.time) / dragDiffuse.blowSpeed) + 1;
					dragDiffuse[outersAll[main]].EmitEvent('reset');
					dragDiffuse[mainsAll[main]].EmitEvent('reset');
					fuseStart.push(target.id);
					dragDiffuse.diffuseTotal--;
					let pts = dragDiffuse.level * bonus;
					dragDiffuse.points += pts;
					UpdateStatus('Fusing | ' + dragDiffuse.bombsToSpawn +' Bombs | ' + dragDiffuse.diffuseTotal + ' Bombs Left');
					UpdateCurrent('Level ' + dragDiffuse.level + '\n' + pts.toFixed(2)+' Pts\n' + dragDiffuse.points.toFixed(2) + ' Pts');
					if(dragDiffuse.diffuseTotal <= 0){
						LevelComplete();
					}
				}
			}
		}
	}
	//Blow Up
	const Blow = (bomb) => {
		dragDiffuse.gameParent.EmitEvent('explode');
		dragDiffuse[mainsAll[bomb]].EmitEvent('blow');
		dragDiffuse[outersAll[bomb]].EmitEvent('reset');
		//pause all current animations
		for(let main in mainsAll){
			if(main === bomb){} else {
				dragDiffuse[outersAll[main]].EmitEvent('reset');
				dragDiffuse[mainsAll[main]].EmitEvent('reset');
			}
		}
		GameOver();
	}
	//Reset Remaining Bombs
	const ResetBombs = () => {
		for(let main in mainsAll){
			dragDiffuse[outersAll[main]].EmitEvent('reset');
			dragDiffuse[mainsAll[main]].EmitEvent('reset');
		}
	}
	//Update Game Status
	const UpdateStatus = (text) => {
		dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI1').ChangeSelf({property:'text', value:{value:text}});
	}
	//Update Game Current
	const UpdateCurrent = (text) => {
		dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI3').ChangeSelf({property:'text', value:{value:text}});
	}
	//Game Over
	const GameOver = () => {
		dragDiffuse.gameParent.EmitEvent('gameOver');
		UpdateStatus('Game Over | Exploded! | Try Again?');
		UpdateScores(dragDiffuse.points);
		dragDiffuse.dragDiffuseUI.GetChild('dragDiffuseUI5').ChangeSelf({property: 'visible', value: true})
		dragDiffuse.gameParent.GetEl().classList.toggle('clickable');
		dragDiffuse.gameStarted = false;
		Reset();
	}
	//Stop Bomb Bubbling
	const StopBombBubbling = (event) => {
		event.stopPropagation();
	}
	//Spawn Game
	const SpawnDDGame = () => {
		if(dragDiffuse.inScene){} else {
			dragDiffuse.gameAll.SpawnLayer();
			dragDiffuse.dragDiffuseUI.SpawnLayer();
			UpdateScores();
			dragDiffuse.inScene = true;
		}
	}
	//Despawn Game
	const DespawnDDGame = () => {
		if(dragDiffuse.inScene){
			Reset();
			dragDiffuse.gameAll.DespawnLayer();
			dragDiffuse.dragDiffuseUI.DespawnLayer();
			auxl.RemoveFromTracker(dragDiffuse.id);
			dragDiffuse.inScene = false;
			auxl.RemoveFromTracker(dragDiffuse.id);
		}
	}

	return {dragDiffuse, core, SpawnDDGame, DespawnDDGame, Blow, GameStart, LevelStart, DragStart, DragFail, StopBombBubbling, DragEnd}
}
auxl.dragDiffuseGame = auxl.DragDiffuse('dragDiffuseGame');
//Guess Hit Game Menu
auxl.dragDiffuseGameMenuData = {
	id: 'dragDiffuseGameMenu',
	game: auxl.dragDiffuseGame.dragDiffuse,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game4',
	gameCabinet: 'cadeCab4Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-17.75),
	inGamePos: new THREE.Vector3(1,1.5,-0.25),
};
auxl.dragDiffuseGameMenu = auxl.GameMenu(auxl.dragDiffuseGameMenuData);

//
//Sharp Shooter
//Keep shooting a single object that moves on every hit farther away with diminishing time adds
auxl.SharpShooter = (id) => {

	let sharpShooter = {};
	sharpShooter.id = id;
	let core = 'sharpShooter';
	sharpShooter.title = 'Sharp Shooter';
	sharpShooter.instructionsText = 'How To Play :\nShoot the target before the countdown hits 0.\nOn each hit,it will respawn farther away.\nThe quicker you are and more hits you make, the more points you will earn.';
	sharpShooter.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	sharpShooter.previewImage = auxl.pattern01;
	sharpShooter.inScene = false;
	//Colors
	auxl.sharpShooterGameColor = auxl.colorTheoryGen('#00ebff');
	//High Scores
	sharpShooter.highScores = blankHighScores('Pts', 2);

	let timer = 3000;
	let respawnTime = 500;
	let timeBonus = 2000;
	sharpShooter.timer = timer;
	sharpShooter.respawnTime = respawnTime;
	sharpShooter.timeBonus = timeBonus;
	sharpShooter.ptsBonus = 0;
	sharpShooter.seconds = 1000;
	sharpShooter.timeout;
	sharpShooter.hitDelay;
	sharpShooter.spawnDelay;
	sharpShooter.countdown2;
	sharpShooter.countdown1;
	sharpShooter.countdown0;
	sharpShooter.countdownInterval;
	sharpShooter.hits = 0;
	sharpShooter.pts = 0;
	sharpShooter.pos = new THREE.Vector3(0,0,0);

	//Target
	sharpShooter.targetData = {
		data:'targetData',
		id:'target',
		sources: false,
		text: false,
		sounds: {
			hover: {src: auxl.drop1, autoplay: false, loop: false, volume: 1, on: 'mouseenter'},
			hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
			spawn: {src: auxl.confirm3, autoplay: false, loop: false, volume: 1, on: 'spawn'},
		},
		geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
		material: {shader: "standard", color: auxl.sharpShooterGameColor.compl, emissive: auxl.sharpShooterGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
		position: new THREE.Vector3(0,2,-2),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(0.001,0.001,0.001),
		animations:{
			spawnin: {property: 'scale', from: '0.001 0.001 0.001', to: '1 1 1', dur: 200, delay: 0, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spawn'}, 
			hoveron: {property: 'material.emissiveIntensity', from: '0.1', to: '1', dur: 200, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
			hoveroff: {property: 'material.emissiveIntensity', from: '1', to: '0.1', dur: 200, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'}, 
			spawnout: {property: 'scale', from: '1 1 1', to: '0.001 0.001 0.001', dur: 200, delay: 0, loop: false, dir: 'normal', easing: 'easeInElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'}, 
		},
		mixins: false,
		classes: ['a-ent'],
		components: {
			mousedownrun__hit:{
				cursorObj: sharpShooter.id,
				component: 'null',
				method: 'TargetHit',
				params: 'null',
			},
		},
	};
	sharpShooter.target = auxl.Core(sharpShooter.targetData);
	//Sound Controller
	sharpShooter.gameSoundData = {
		data:'gameSoundData',
		id:'gameSound',
		sources: false,
		text: false,
		sounds: {
			start: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'gameStart'},
			begin: {src: auxl.confirm4, autoplay: false, loop: false, volume: 1, on: 'begin'},
			timer: {src: auxl.glass1, autoplay: false, loop: false, volume: 1, on: 'second'},
			gameover: {src: auxl.maximize6, autoplay: false, loop: false, volume: 1, on: 'gameOver'},
		},
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
	sharpShooter.gameSound = auxl.Core(sharpShooter.gameSoundData);

	//UI
	sharpShooter.sharpShooterUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'sharpShooterUI',{position: new THREE.Vector3(1,1.5,0.5)}, true);
	sharpShooter.sharpShooterUI = auxl.Layer('sharpShooterUI',sharpShooter.sharpShooterUIData);
	//Parent : sharpShooterUI0
	//Game Status : sharpShooterUI1
	sharpShooter.sharpShooterUI.layer.all.child0.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child0.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : sharpShooterUI2
	sharpShooter.sharpShooterUI.layer.all.child1.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child1.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child1.core.core.text.value = 'Sharp Shooter';
	//Current Level & Points : sharpShooterUI3
	sharpShooter.sharpShooterUI.layer.all.child2.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child2.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child2.core.core.text.value = 'Hits : 0\nPts : 0';
	//High Score Board : sharpShooterUI4
	sharpShooter.sharpShooterUI.layer.all.child3.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child3.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	//Game Start : sharpShooterUI5
	sharpShooter.sharpShooterUI.layer.all.child4.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child4.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child4.core.core.components = {};
	sharpShooter.sharpShooterUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: sharpShooter.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : sharpShooterUI6
	sharpShooter.sharpShooterUI.layer.all.child5.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child5.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child5.core.core.components = {};
	sharpShooter.sharpShooterUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : sharpShooterUI7
	sharpShooter.sharpShooterUI.layer.all.child6.core.core.material.color = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child6.core.core.material.emissive = auxl.sharpShooterGameColor.compl;
	sharpShooter.sharpShooterUI.layer.all.child6.core.core.components = {};
	sharpShooter.sharpShooterUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'sharpShooterGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			sharpShooter.highScores = checkHighScore(score, sharpShooter.highScores);
		}
		sharpShooter.highScores.text = refreshHighScoreText(sharpShooter.highScores);
		sharpShooter.sharpShooterUI.GetChild('sharpShooterUI4').ChangeSelf({property:'text',value:{value:sharpShooter.highScores.text}});
		auxl.saveToProfile({auxlObject: sharpShooter.id, type: 'sharpShooter', sub: false, name: 'highScores', data: sharpShooter.highScores});
	}
	//Game Start
	const GameStart = () => {
		sharpShooter.target.position = TargetPosition();
		sharpShooter.target.SpawnCore();
		//Update UI
		sharpShooter.sharpShooterUI.GetChild('sharpShooterUI3').ChangeSelf({property:'text',value:{value: 'Hits : '+sharpShooter.hits+'\nPts : '+sharpShooter.pts}});
		//3 Second Countdown to prepare
		sharpShooter.gameSound.EmitEvent('gameStart');
		sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: 'Starting in 3...'}});
		sharpShooter.countdown2 = setTimeout(() => {
			//2 Seconds
			sharpShooter.gameSound.EmitEvent('second');
			sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: '2..'}});
			sharpShooter.countdown1 = setTimeout(() => {
				//1 Seconds
				sharpShooter.gameSound.EmitEvent('second');
				sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: '1.'}});
				sharpShooter.countdown0 = setTimeout(() => {
					//0 Seconds
					sharpShooter.gameSound.EmitEvent('begin');
					sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: 'SHOOT!'}});
					TargetSpawn();
					UpdateTimer(sharpShooter.timer);
				}, 1000);
			}, 1000);
		}, 1000);
	}
	//Game Over
	const GameOver = () => {
		sharpShooter.gameSound.EmitEvent('gameOver');
		sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: 'Game Over'}});
		UpdateScores(sharpShooter.pts);
		Reset();
	}
	//Reset
	const Reset = () => {
		clearTimeout(sharpShooter.hitDelay);
		clearTimeout(sharpShooter.timeout);
		clearTimeout(sharpShooter.spawnDelay);
		clearTimeout(sharpShooter.countdown2);
		clearTimeout(sharpShooter.countdown1);
		clearTimeout(sharpShooter.countdown0);
		clearInterval(sharpShooter.countdownInterval);
		sharpShooter.timer = timer;
		sharpShooter.respawnTime = respawnTime;
		sharpShooter.timeBonus = timeBonus;
		sharpShooter.hits = 0;
		sharpShooter.pts = 0;
		sharpShooter.seconds = 1000;
		if(sharpShooter.target.core.inScene){
			sharpShooter.target.DespawnCore();
		}
	}
	//Target Hit
	const TargetHit = () => {
		sharpShooter.target.GetEl().classList.toggle('clickable', false);
		sharpShooter.hits++;
		sharpShooter.pts += ((sharpShooter.timer/1000) * sharpShooter.hits);
		sharpShooter.timer += sharpShooter.respawnTime;
		if(sharpShooter.timeBonus > 800){
			sharpShooter.timeBonus -= 100;
		}
		sharpShooter.timer += sharpShooter.timeBonus;
		UpdateTimer(sharpShooter.timer);
		//Respawn
		sharpShooter.hitDelay = setTimeout(() => {
			TargetRespawn();
		}, 300);
		//Update UI
		sharpShooter.sharpShooterUI.GetChild('sharpShooterUI3').ChangeSelf({property:'text',value:{value: 'Hits : '+sharpShooter.hits+'\nPts : '+sharpShooter.pts.toFixed(2)}});
	}
	//UpdateTimer
	const UpdateTimer = (timer) => {
		clearTimeout(sharpShooter.timeout);
		clearInterval(sharpShooter.countdownInterval);
		//Countdown
		let counter = 0;
		sharpShooter.countdownInterval = setInterval(() => {
			counter++;
			let time = (timer-(counter*100))/1000;
			sharpShooter.timer -= 100;
			sharpShooter.seconds -= 100;
			if(sharpShooter.seconds <= 0){
				sharpShooter.gameSound.EmitEvent('second');
				sharpShooter.seconds = 1000;
			}
			sharpShooter.sharpShooterUI.GetChild('sharpShooterUI1').ChangeSelf({property:'text',value:{value: time.toFixed(2)}});
		}, 100);
		//Game Over Timer
		sharpShooter.timeout = setTimeout(() => {
			GameOver();
		}, timer);
	}
	//Target Position
	const TargetPosition = () => {
		let x = Math.floor((Math.random()*sharpShooter.hits*-2) + sharpShooter.hits*0.5);
		let y = Math.floor(Math.random()*sharpShooter.hits)+0.5;
		let z = (sharpShooter.hits*-1)-1;
		return new THREE.Vector3(x,y,z);
	}
	//Target Spawn
	const TargetSpawn = () => {
		sharpShooter.spawnDelay = setTimeout(() => {
			sharpShooter.target.EmitEvent('spawn');
			sharpShooter.target.GetEl().classList.toggle('clickable', true);
			clearTimeout(sharpShooter.spawnDelay)
		}, 50);
	}
	//Target Respawn
	const TargetRespawn = () => {
		sharpShooter.target.ChangeSelf({property:'position', value: TargetPosition()});
		TargetSpawn();
	}
	//Spawn Sharp Shooter
	const SpawnSSGame = () => {
		if(sharpShooter.inScene){}else{
			sharpShooter.sharpShooterUI.SpawnLayer();
			sharpShooter.gameSound.SpawnCore();
			UpdateScores();
			sharpShooter.inScene = true;
		}
	}
	//Despawn Sharp Shooter
	const DespawnSSGame = () => {
		if(sharpShooter.inScene){
			Reset();
			sharpShooter.gameSound.DespawnCore();
			sharpShooter.sharpShooterUI.DespawnLayer();
			sharpShooter.inScene = false;
			auxl.RemoveFromTracker(sharpShooter.id);
		}
	}

	return {sharpShooter, core, SpawnSSGame, DespawnSSGame, GameStart, TargetHit};

}
auxl.sharpShooterGame = auxl.SharpShooter('sharpShooterGame');
//Sharp Shooter Game Menu
auxl.sharpShooterGameMenuData = {
	id: 'sharpShooterGameMenu',
	game: auxl.sharpShooterGame.sharpShooter,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game5',
	gameCabinet: 'cadeCab5Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-19.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.75),
};
auxl.sharpShooterGameMenu = auxl.GameMenu(auxl.sharpShooterGameMenuData);


//
//Perfect Scale
//Adjust 3 Shapes to be as close to 1 1 1 scale as possible
auxl.PerfectScale = (id) => {

	let perfectScale = {};
	perfectScale.id = id;
	let core = 'perfectScale';
	perfectScale.title = 'Perfect Scale';
	perfectScale.instructionsText = 'How To Play :\nAdjust the scale of each shape in attempt to make each one a perfect size.\n The closer you get to exact scale within the fewest clicks, the more points you will earn.';
	perfectScale.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	perfectScale.previewImage = auxl.pattern01;
	perfectScale.inScene = false;
	//Colors
	auxl.perfectScaleGameColor = auxl.colorTheoryGen('#eb21a5');
	//High Scores
	perfectScale.highScores = blankHighScores('Pts', 2);
	//Game Vars
	perfectScale.gameStarted = false;
	perfectScale.levelDelay;
	perfectScale.despawnDelay;
	perfectScale.scaleDelay;
	perfectScale.bonusDelay;
	perfectScale.level = 0;
	perfectScale.levelClicks = 0;
	perfectScale.clicks = 0;
	perfectScale.pts = 0;
	perfectScale.levelScaleAmount = 0.1;
	perfectScale.startingScale = new THREE.Vector3(0,0,0);
	perfectScale.levelScalers = ['Cube', 'Pyramid', 'Sphere', 'Cylinder'];
	perfectScale.axis = false;
	perfectScale.scaler = false;
	//Scale 1 Cube
	perfectScale.scale1Data = {
	data:'scale1Data',
	id:'scale1',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
	material: {shader: "standard", color: 'red', emissive: 'red', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		spinx: {property: 'object3D.rotation.y', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinX'},
		spiny: {property: 'object3D.rotation.z', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinY'},
		spinz: {property: 'object3D.rotation.x', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinZ'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale1 = auxl.Core(perfectScale.scale1Data);
	//Scale 2 Pyramid
	//Scale2a
	perfectScale.scale2ParentData = {
	data:'scale2ParentData',
	id:'scale2Parent',
	sources: false,
	text: false,
	sounds: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,3.5,0),
	rotation: new THREE.Vector3(0,45,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		spinx: {property: 'object3D.rotation.y', from: '45', to: '405', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinX'},
		spiny: {property: 'object3D.rotation.z', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinY'},
		spinz: {property: 'object3D.rotation.x', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinZ'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2Parent = auxl.Core(perfectScale.scale2ParentData);
	//Scale2a
	perfectScale.scale2aData = {
	data:'scale2aData',
	id:'scale2a',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'triangle', vertexA: '0 1 0', vertexB: '-0.5 0 0.5', vertexC: '0.5 0 0.5'},
	material: {shader: "standard", color: 'yellow', emissive: 'yellow', emissiveIntensity: 0.1, opacity: 1, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2a = auxl.Core(perfectScale.scale2aData);
	//Scale2b
	perfectScale.scale2bData = {
	data:'scale2bData',
	id:'scale2b',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'triangle', vertexA: '0 1 0', vertexB: '-0.5 0 0.5', vertexC: '-0.5 0 -0.5'},
	material: {shader: "standard", color: 'yellow', emissive: 'yellow', emissiveIntensity: 0.1, opacity: 1, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2b = auxl.Core(perfectScale.scale2bData);
	//Scale2c
	perfectScale.scale2cData = {
	data:'scale2cData',
	id:'scale2c',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'triangle', vertexA: '0 1 0', vertexB: '-0.5 0 -0.5', vertexC: '0.5 0 -0.5'},
	material: {shader: "standard", color: 'yellow', emissive: 'yellow', emissiveIntensity: 0.1, opacity: 1, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2c = auxl.Core(perfectScale.scale2cData);
	//Scale2d
	perfectScale.scale2dData = {
	data:'scale2dData',
	id:'scale2d',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'triangle', vertexA: '0 1 0', vertexB: '0.5 0 -0.5', vertexC: '0.5 0 0.5'},
	material: {shader: "standard", color: 'yellow', emissive: 'yellow', emissiveIntensity: 0.1, opacity: 1, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2d = auxl.Core(perfectScale.scale2dData);
	//Scale2e
	perfectScale.scale2eData = {
	data:'scale2eData',
	id:'scale2e',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'plane', height: 1, width: 1},
	material: {shader: "standard", color: 'yellow', emissive: 'yellow', emissiveIntensity: 0.1, opacity: 1, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale2e = auxl.Core(perfectScale.scale2eData);
	//Scale 2 Layer
	perfectScale.scale2Data = {
		parent: {core: perfectScale.scale2Parent}, 
		child0: {core: perfectScale.scale2a}, 
		child1: {core: perfectScale.scale2b},
		child2: {core: perfectScale.scale2c},
		child3: {core: perfectScale.scale2d},
		child4: {core: perfectScale.scale2e},
	}
	perfectScale.scale2 = auxl.Layer('scale2',perfectScale.scale2Data);
	//Scale 3 Sphere
	perfectScale.scale3Data = {
	data:'scale3Data',
	id:'scale3',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'sphere', radius: 1,},
	material: {shader: "standard", color: 'blue', emissive: 'blue', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		spinx: {property: 'object3D.rotation.y', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinX'},
		spiny: {property: 'object3D.rotation.z', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinY'},
		spinz: {property: 'object3D.rotation.x', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinZ'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale3 = auxl.Core(perfectScale.scale3Data);
	//Scale 4 Cylinder
	perfectScale.scale4Data = {
	data:'scale4Data',
	id:'scale4',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.5, height: 0.5, openEnded: false, segmentsHeight: 4, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: 'green', emissive: 'green', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.001,0.001,0.001),
	animations: {
		spawn: {property: 'material.opacity', from: '0', to: '1', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
		despawn: {property: 'material.opacity', from: '1', to: '0', dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'despawn'},
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		spinx: {property: 'object3D.rotation.y', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinX'},
		spiny: {property: 'object3D.rotation.z', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinY'},
		spinz: {property: 'object3D.rotation.x', from: '0', to: '360', dur: 3000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spinZ'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	perfectScale.scale4 = auxl.Core(perfectScale.scale4Data);

	//UI
	perfectScale.perfectScaleUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'perfectScaleUI',{position: new THREE.Vector3(1.5,1.5,8)}, true);
	perfectScale.perfectScaleUI = auxl.Layer('perfectScaleUI',perfectScale.perfectScaleUIData);
	//Parent : perfectScaleUI0
	//Game Status : perfectScaleUI1
	perfectScale.perfectScaleUI.layer.all.child0.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child0.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : perfectScaleUI2
	perfectScale.perfectScaleUI.layer.all.child1.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child1.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child1.core.core.text.value = 'Perfect Scale';
	//Current Level & Points : perfectScaleUI3
	perfectScale.perfectScaleUI.layer.all.child2.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child2.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child2.core.core.text.value = 'Pts : 0';
	//High Score Board : perfectScaleUI4
	perfectScale.perfectScaleUI.layer.all.child3.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child3.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	//Game Start : perfectScaleUI5
	perfectScale.perfectScaleUI.layer.all.child4.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child4.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child4.core.core.components = {};
	perfectScale.perfectScaleUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: perfectScale.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : perfectScaleUI6
	perfectScale.perfectScaleUI.layer.all.child5.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child5.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child5.core.core.text.value = 'Confirm';
	perfectScale.perfectScaleUI.layer.all.child5.core.core.components = {};
	perfectScale.perfectScaleUI.layer.all.child5.core.core.components.clickrun__confirm = {cursorObj: perfectScale.id, component: 'null', method: 'Confirm', params: 'null',};
	perfectScale.perfectScaleUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : perfectScaleUI7
	perfectScale.perfectScaleUI.layer.all.child6.core.core.material.color = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child6.core.core.material.emissive = auxl.perfectScaleGameColor.compl;
	perfectScale.perfectScaleUI.layer.all.child6.core.core.components = {};
	perfectScale.perfectScaleUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'perfectScaleGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Scaling UI
	perfectScale.scalingUIParentData = {
		data:'scalingUIParentData',
		id:'scalingUIParent',
		sources: false,
		text: false,
		sounds: false,
		geometry: false,
		material: false,
		position: new THREE.Vector3(0.175,0.25,0),
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: {
			['look-at-xyz']:{buffer: 0.65, drag: 0.25, match: 'camera', x:false, y:true, z:false},
		},
	};
	perfectScale.scalingUIParent = auxl.Core(perfectScale.scalingUIParentData);
	//Scaling UI
	perfectScale.scalingUIHolderData = {
		data:'scalingUIHolderData',
		id:'scalingUIHolder',
		sources: false,
		text: false,
		sounds: false,
		geometry: false,
		material: false,
		position: new THREE.Vector3(0,0,-1),
		rotation: new THREE.Vector3(-15,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
	};
	perfectScale.scalingUIHolder = auxl.Core(perfectScale.scalingUIHolderData);
	//Scale Up
	perfectScale.scaleUpData = {
	data:'scaleUpData',
	id:'scaleUp',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.125, height: 0.05, openEnded: false, segmentsHeight: 2, segmentsRadial: 3, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#ff8900', emissive: '#ff8900', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,1.15,0),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		click: {property: 'material.emissiveIntensity', from: '0.5', to: '1', dur: 125, delay: 0, loop: 1, dir: 'alternate', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
	},
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		clickrun__scaleup:{
		cursorObj: perfectScale.id,
		component: 'null',
		method: 'ScaleUp',
		params: 'null',},
	},
	};
	perfectScale.scaleUp = auxl.Core(perfectScale.scaleUpData);
	//Scale Down
	perfectScale.scaleDownData = {
	data:'scaleDownData',
	id:'scaleDown',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.125, height: 0.05, openEnded: false, segmentsHeight: 2, segmentsRadial: 3, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#ff8900', emissive: '#ff8900', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,0.95,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		click: {property: 'material.emissiveIntensity', from: '0.5', to: '1', dur: 125, delay: 0, loop: 1, dir: 'alternate', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
	},
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		clickrun__scaleup:{
		cursorObj: perfectScale.id,
		component: 'null',
		method: 'ScaleDown',
		params: 'null',},
	},
	};
	perfectScale.scaleDown = auxl.Core(perfectScale.scaleDownData);
	//Selection
	perfectScale.confirmData = {
	data:'confirmData',
	id: 'confirm',
	sources: false,
	text: {value:'Confirm', color: "#FFFFFF", align: "center", font: "exo2bold", xOffset: 0.01, zOffset: 0.0251, side: 'front', wrapCount: 10, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.05, width: 0.4, height: 0.1},
	material: {shader: "standard", color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,0.75,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		clickrun__confirm:{
			cursorObj: perfectScale.id,
			component: 'null',
			method: 'Confirm',
			params: 'null',
		},
	},
	};
	perfectScale.confirm = auxl.Core(perfectScale.confirmData);
	//Axis X
	perfectScale.axisXData = {
	data:'axisXData',
	id: 'axisX',
	sources: false,
	text: {value:'X', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0251, side: 'front', wrapCount: 2, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.05, width: 0.2, height: 0.2},
	material: {shader: "standard", color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-0.5,1.2,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		clickrun:{
			cursorObj: perfectScale.id,
			component: 'null',
			method: 'ChangeAxis',
			params: 'x',
		},
	},
	};
	perfectScale.axisX = auxl.Core(perfectScale.axisXData);
	//Axis Y
	perfectScale.axisYData = {
	data:'axisYData',
	id: 'axisY',
	sources: false,
	text: {value:'Y', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0251, side: 'front', wrapCount: 2, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.05, width: 0.2, height: 0.2},
	material: {shader: "standard", color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-0.5,1,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		clickrun:{
			cursorObj: perfectScale.id,
			component: 'null',
			method: 'ChangeAxis',
			params: 'y',
		},
	},
	};
	perfectScale.axisY = auxl.Core(perfectScale.axisYData);
	//Axis Z
	perfectScale.axisZData = {
	data:'axisZData',
	id: 'axisZ',
	sources: false,
	text: {value:'Z', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0251, side: 'front', wrapCount: 2, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.05, width: 0.2, height: 0.2},
	material: {shader: "standard", color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-0.5,0.8,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		clickrun:{
			cursorObj: perfectScale.id,
			component: 'null',
			method: 'ChangeAxis',
			params: 'z',
		},
	},
	};
	perfectScale.axisZ = auxl.Core(perfectScale.axisZData);
	//Spin
	perfectScale.spinData = {
	data:'spinData',
	id: 'spin',
	sources: false,
	text: {value:'Spin', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.0251, side: 'front', wrapCount: 5, baseline: 'center'},
	geometry: {primitive: 'box', depth: 0.05, width: 0.2, height: 0.2},
	material: {shader: "standard", color: auxl.perfectScaleGameColor.base, emissive: auxl.perfectScaleGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-0.3,1,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		hoveron: {property: 'material.emissiveIntensity', from: '0.25', to: '0.5', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hoveroff: {property: 'material.emissiveIntensity', from: '0.5', to: '0.25', dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseleave'},
		click: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 250, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		clickrun:{
			cursorObj: perfectScale.id,
			component: 'null',
			method: 'Spin',
			params: 'null',
		},
	},
	};
	perfectScale.spin = auxl.Core(perfectScale.spinData);
	//Scaling UI Layer
	perfectScale.scalingUIData = {
		parent: {core: perfectScale.scalingUIParent}, 
		child0: {
			parent: {core: perfectScale.scalingUIHolder}, 
			child0: {core: perfectScale.confirm}, 
			child1: {core: perfectScale.scaleUp}, 
			child2: {core: perfectScale.scaleDown},
			child3: {core: perfectScale.axisX},
			child4: {core: perfectScale.axisY},
			child5: {core: perfectScale.axisZ},
			child6: {core: perfectScale.spin},
		}, 
	}
	perfectScale.scalingUI = auxl.Layer('scalingUI',perfectScale.scalingUIData);

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			perfectScale.highScores = checkHighScore(score, perfectScale.highScores);
		}
		perfectScale.highScores.text = refreshHighScoreText(perfectScale.highScores);
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI4').ChangeSelf({property:'text',value:{value:perfectScale.highScores.text}});
		auxl.saveToProfile({auxlObject: perfectScale.id, type: 'perfectScale', sub: false, name: 'highScores', data: perfectScale.highScores});
	}
	//Reset
	const Reset = () => {
		clearTimeout(perfectScale.levelDelay)
		clearTimeout(perfectScale.despawnDelay)
		clearTimeout(perfectScale.scaleDelay)
		clearTimeout(perfectScale.bonusDelay)
		perfectScale.level = 0;
		perfectScale.levelClicks = 0;
		perfectScale.clicks = 0;
		perfectScale.pts = 0;
		perfectScale.startingScale = new THREE.Vector3(0,0,0);
		perfectScale.scaler = false;
		perfectScale.axis = false;
		ResetAxisButtons();
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI3').ChangeSelf({property:'text',value:{value:'0 Pts\nTotal 0 Pts'}});
	}
	//Spawn Scalers
	const SpawnScaler = (type) => {
		perfectScale.scaler = type;
		if(type === 'Cube'){
			perfectScale.scale1.SpawnCore();
		} else if(type === 'Pyramid'){
			perfectScale.scale2.SpawnLayer();
		} else if(type === 'Sphere'){
			perfectScale.scale3.SpawnCore();
		} else if(type === 'Cylinder'){
			perfectScale.scale4.SpawnCore();
		}

	}
	//Despawn Scalers
	const DespawnScaler = () => {
		if(perfectScale.scale1.core.inScene){
			perfectScale.scale1.EmitEvent('despawn');
			perfectScale.despawnDelay = setTimeout(() => {
				perfectScale.scale1.DespawnCore();
			}, 2000);
		}
		if(perfectScale.scale2.layer.inScene){
			perfectScale.scale2.EmitEventAll('despawn');
			perfectScale.despawnDelay = setTimeout(() => {
				perfectScale.scale2.DespawnLayer();
			}, 2000);
		}
		if(perfectScale.scale3.core.inScene){
			perfectScale.scale3.EmitEvent('despawn');
			perfectScale.despawnDelay = setTimeout(() => {
				perfectScale.scale3.DespawnCore();
			}, 2000);
		}
		if(perfectScale.scale4.core.inScene){
			perfectScale.scale4.EmitEvent('despawn');
			perfectScale.despawnDelay = setTimeout(() => {
				perfectScale.scale4.DespawnCore();
			}, 2000);
		}
	}
	//Spin
	const Spin = () => {
		//Spin current scaler upons currently selected axis
		if(perfectScale.scaler === 'Cube'){
			perfectScale.scale1.EmitEvent('spin' + perfectScale.axis.toUpperCase());
		} else if(perfectScale.scaler === 'Pyramid'){
			perfectScale.scale2.EmitEventParent('spin' + perfectScale.axis.toUpperCase());
		} else if(perfectScale.scaler === 'Sphere'){
			perfectScale.scale3.EmitEvent('spin' + perfectScale.axis.toUpperCase());
		} else if(perfectScale.scaler === 'Cylinder'){
			perfectScale.scale4.EmitEvent('spin' + perfectScale.axis.toUpperCase());
		}
	}
	//Change Axis
	const ChangeAxis = (axis) => {
		//Select new Axis
		perfectScale.axis = axis;
		//Reset all Axis Buttons
		ResetAxisButtons();
		//Update Selected Axis Button
		if(axis === 'x'){
			perfectScale.axisX.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.compl}})
		} else if(axis === 'y'){
			perfectScale.axisY.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.compl}})
		} else if(axis === 'z'){
			perfectScale.axisZ.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.compl}})
		}
	}
	//Reset Axis Buttons
	const ResetAxisButtons = () => {
		perfectScale.axisX.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.base}})
		perfectScale.axisY.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.base}})
		perfectScale.axisZ.ChangeSelf({property: 'material', value:{emissive: auxl.perfectScaleGameColor.base}})
	}
	//Scale Up
	const ScaleUp = () => {
		if(perfectScale.axis){
			let scale = new THREE.Vector3(0,0,0);
			if(perfectScale.scaler === 'Cube'){
				scale = perfectScale.scale1.GetEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Pyramid'){
				scale = perfectScale.scale2.GetParentEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Sphere'){
				scale = perfectScale.scale3.GetEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Cylinder'){
				scale = perfectScale.scale4.GetEl().getAttribute('scale');
			}
			if(scale[perfectScale.axis] + perfectScale.levelScaleAmount < perfectScale.startingScale[perfectScale.axis] + (perfectScale.level)+1){
				perfectScale.clicks++;
				scale[perfectScale.axis] += perfectScale.levelScaleAmount;
			}
		}
	}
	//Scale Down
	const ScaleDown = () => {
		if(perfectScale.axis){
			let scale = new THREE.Vector3(0,0,0);
			if(perfectScale.scaler === 'Cube'){
				scale = perfectScale.scale1.GetEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Pyramid'){
				scale = perfectScale.scale2.GetParentEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Sphere'){
				scale = perfectScale.scale3.GetEl().getAttribute('scale');
			} else if(perfectScale.scaler === 'Cylinder'){
				scale = perfectScale.scale4.GetEl().getAttribute('scale');
			}
			if(scale[perfectScale.axis] - perfectScale.levelScaleAmount > perfectScale.startingScale[perfectScale.axis] - (perfectScale.level+1)){
				perfectScale.clicks++;
				scale[perfectScale.axis] -= perfectScale.levelScaleAmount;
			}
		}
	}
	//Confirm
	const Confirm = () => {
		//UI Text
		let text = '';
		//Get Object Scale & Despawn
		let confirmScale = new THREE.Vector3(0,0,0);
		if(perfectScale.scale1.core.inScene){
			confirmScale.copy(perfectScale.scale1.GetEl().getAttribute('scale'));
		}
		if(perfectScale.scale2.layer.inScene){
			confirmScale.copy(perfectScale.scale2.GetParentEl().getAttribute('scale'));
		}
		if(perfectScale.scale3.core.inScene){
			confirmScale.copy(perfectScale.scale3.GetEl().getAttribute('scale'));
		}
		if(perfectScale.scale4.core.inScene){
			confirmScale.copy(perfectScale.scale4.GetEl().getAttribute('scale'));
		}
		DespawnScaler();
		//Round to single decimal
		let compareX = Decimal(confirmScale.x);
		let compareY = Decimal(confirmScale.y);
		let compareZ = Decimal(confirmScale.z);
		//Compare Scale
		let compare = [compareX, compareY, compareZ];
		//Sort from low to high
		compare.sort(function(a, b){return a - b});
		//Get differences
		function diff(a,b){
			return Decimal(Math.abs(a-b));
		}
		let diff1 = diff(compare[0], compare[1]);
		let diff2 = diff(compare[1], compare[2]);
		//Accuracy Bonus
		let score = 0;
		let score1 = 0;
		let score2 = 0;
		//Perfect Bonus
		if(diff1 === 0 && diff2 === 0){
			//console.log('Perfect Scale!')
			score += (perfectScale.level*100);
			text += 'Perfect! ';
		} else {
			if(diff1 === 0){
				score1 = (perfectScale.level*25);
				text += 'Great! ';
			} else {
				score1 = (Math.floor(diff1/0.1) * (perfectScale.level*2))*-1;
			}
			if(diff2 === 0){
				score2 = (perfectScale.level*25);
				text += 'Great! ';
			} else {
				score2 = (Math.floor(diff2/0.1) * (perfectScale.level*2))*-1;
			}
		}
		let score3 = (perfectScale.level*50) + score1 + score2;
		if(score3 > 0){
			score += score3;
		}
		//Click Bonus
		let clickBonus = diff(perfectScale.clicks, perfectScale.levelClicks);
		if(perfectScale.clicks === perfectScale.levelClicks){
			score += (perfectScale.levelClicks*2);
		} else if(perfectScale.clicks > (perfectScale.levelClicks*0.69) && perfectScale.clicks < perfectScale.levelClicks){
			score += (clickBonus*3);
		} else if(perfectScale.clicks > perfectScale.levelClicks && perfectScale.clicks < (perfectScale.levelClicks*1.5)) {
			score += (clickBonus*2);
		} else if(perfectScale.clicks > (perfectScale.levelClicks*1.5) && perfectScale.clicks < (perfectScale.levelClicks*2)) {
			score += clickBonus;
		}
		//Apply Total Score
		perfectScale.pts += score;
		text += score;
		//Update UI
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI3').ChangeSelf({property:'text',value:{value:text + ' Pts\nTotal '+perfectScale.pts+' Pts'}});

		//Testing
		//console.log({confirmScale, compareX, compareY, compareZ, diff1, diff2, clicks: perfectScale.clicks, levelClicks: perfectScale.levelClicks, clickBonus, score, score1, score2, score3, pts: perfectScale.pts});

		//Remove Confirm Buttons
		perfectScale.scalingUI.GetChild('confirm').ChangeSelf({property:'visible',value: false});
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI6').ChangeSelf({property:'visible',value: false});

		//Start Next Level
		perfectScale.levelDelay = setTimeout(() => {
			LevelStart();
		}, 2100);

	}
	//Game Start
	const GameStart = () => {
		Reset();
		LevelStart();
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI5').ChangeSelf({property:'text',value: {value: 'Restart'}});
		perfectScale.gameStarted = true;
	}
	//Game Complete
	const GameComplete = () => {
		UpdateScores(perfectScale.pts);
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI1').ChangeSelf({property:'text',value:{value:'Game Complete!'}});
		perfectScale.scalingUI.GetChild('confirm').ChangeSelf({property:'visible',value: false});
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI5').ChangeSelf({property:'text',value: {value: 'Start'}});
		perfectScale.gameStarted = false;
	}
	//Level Start
	const LevelStart = () => {
		perfectScale.level++;
		if(perfectScale.level > perfectScale.levelScalers.length){
			GameComplete();
			return;
		}
		perfectScale.clicks = 0;
		SpawnScaler(perfectScale.levelScalers[perfectScale.level-1]);
		RandomizeScaler();

		perfectScale.perfectScaleUI.GetChild('perfectScaleUI1').ChangeSelf({property:'text',value:{value:'Level : '+perfectScale.level+' | Shape : ' + perfectScale.scaler}});
		perfectScale.scalingUI.GetChild('confirm').ChangeSelf({property:'visible',value: true});
		perfectScale.perfectScaleUI.GetChild('perfectScaleUI6').ChangeSelf({property:'visible',value: true});

	}
	//Single Place Decimal Number
	const Decimal = (num) => {
		return Math.round(num*10)/10;
	}
	//Randomize Scalers
	const RandomizeScaler = () => {
		perfectScale.scaleDelay = setTimeout(() => {
			if(perfectScale.scale1.core.inScene){
				perfectScale.scale1.ChangeSelf({property: 'scale', value: RanScale(1)});
			}
			if(perfectScale.scale2.layer.inScene){
				perfectScale.scale2.ChangeParent({property: 'scale', value: RanScale(1)});
			}
			if(perfectScale.scale3.core.inScene){
				perfectScale.scale3.ChangeSelf({property: 'scale', value: RanScale(1)});
			}
			if(perfectScale.scale4.core.inScene){
				perfectScale.scale4.ChangeSelf({property: 'scale', value: RanScale(1)});
			}
		}, 50);
	}
	//Random Scale
	const RanScale = (level) => {
		perfectScale.levelClicks = Math.floor(Math.random()*(perfectScale.level*5))+(perfectScale.level*2)+5;
		let mean = Decimal(Math.random()*perfectScale.level+2);
		let low = Decimal(Math.floor(perfectScale.levelClicks/3)*0.1);
		let high = Decimal((perfectScale.levelClicks - Math.floor(perfectScale.levelClicks/3))*0.1);
		let x = false;
		let y = false;
		let z = false;
		let order = Math.random();
		let alternate = Math.floor(Math.random()*2-1);
		if(order >= 0.67){
			x = mean;
		} else if(order < 0.67 && order > 0.33){
			y = mean;
		} else {
			z = mean;
		}
		if(Math.random() > 0.5){
			low *= -1;
		} else {
			high *= -1;
		}
		if(x){
			if(alternate > 0){
				y = mean + low;
				z = mean + high;
			} else {
				y = mean + high;
				z = mean + low;
			}
		} else if(y){
			if(alternate > 0){
				x = mean + low;
				z = mean + high;
			} else {
				x = mean + high;
				z = mean + low;
			}
		} else if(z){
			if(alternate > 0){
				x = mean + low;
				y = mean + high;
			} else {
				x = mean + high;
				y = mean + low;
			}
		}
		//console.log({clicks: perfectScale.levelClicks, low, mean, high, x:Decimal(x), y:Decimal(y), z:Decimal(z)})
		let newScale = new THREE.Vector3(Decimal(x),Decimal(y),Decimal(z));
		perfectScale.startingScale.copy(newScale);
		return newScale;
	}
	//Spawn Perfect Scale
	const SpawnPSGame = () => {
		if(perfectScale.inScene){}else{
			perfectScale.perfectScaleUI.SpawnLayer();
			perfectScale.scalingUI.SpawnLayer(auxl.playerBody);
			UpdateScores();
			perfectScale.inScene = true;
		}
	}
	//Despawn Perfect Scale
	const DespawnPSGame = () => {
		if(perfectScale.inScene){
			Reset();
			perfectScale.scalingUI.DespawnLayer();
			DespawnScaler();
			perfectScale.perfectScaleUI.DespawnLayer();
			perfectScale.inScene = false;
			auxl.RemoveFromTracker(perfectScale.id);
		}
	}

	return {perfectScale, core, SpawnPSGame, DespawnPSGame, GameStart, Confirm, Spin, ChangeAxis, ScaleUp, ScaleDown}

}
auxl.perfectScaleGame = auxl.PerfectScale('perfectScaleGame');
//Sharp Shooter Game Menu
auxl.perfectScaleGameMenuData = {
	id: 'perfectScaleGameMenu',
	game: auxl.perfectScaleGame.perfectScale,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game6',
	gameCabinet: 'cadeCab6Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-21.75),
	inGamePos: new THREE.Vector3(1,1.5,8.5),
};
auxl.perfectScaleGameMenu = auxl.GameMenu(auxl.perfectScaleGameMenuData);

//
//Reflex 7
//7 consecitive hit prompts to test your reflexes
auxl.Reflex7 = (id) => {

	let reflex7 = {};
	reflex7.id = id;
	let core = 'reflex7';
	reflex7.title = 'Reflex 7';
	reflex7.instructionsText = 'How To Play :\nWait for 1 of 7 consecitive prompts via Color, Rotation and Sound to click on the object as fast as you can once you notice the prompt.\nThe quicker you are, the more points you will earn.';
	reflex7.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	reflex7.previewImage = auxl.pattern01;
	reflex7.inScene = false;
	//Colors
	auxl.reflex7GameColor = auxl.colorTheoryGen('#9e22a2');
	//High Scores
	reflex7.highScores = blankHighScores('ms', 2);
	//Game Vars
	reflex7.gameStarted = false;
	reflex7.hits = 7;
	reflex7.times = [];
	reflex7.currentTime = 0;
	reflex7.avgTime = 0;
	reflex7.bestTime = 0;
	reflex7.hitTimeout;
	reflex7.fireTimeout;
	reflex7.prematureTimeout;
	reflex7.fired = false;
	reflex7.hitDelay = (Math.random()*4000)+3000;
	//Target
	reflex7.targetData = {
		data:'targetData',
		id:'target',
		sources: false,
		text: false,
		sounds: {
			fire: {src: auxl.confirm1, autoplay: false, loop: false, volume: 1, on: 'fire'},
			hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
		},
		geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
		material: {shader: "standard", color: auxl.reflex7GameColor.compl, emissive: auxl.reflex7GameColor.compl, emissiveIntensity: 0.25, opacity: 0.5},
		position: new THREE.Vector3(0,1.95,-4),
		rotation: new THREE.Vector3(0,45,0),
		scale: new THREE.Vector3(3,3,3),
		animations:{
			onload: {property: 'object3D.position.y', to: 1.95, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: true, enabled: true,},
			anticipation: {property: 'object3D.position.y', from: 1.95, to: 2.05, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true, startEvents: 'animationcomplete__onload, click', pauseEvents: 'fire'},
			spin: {property: 'object3D.rotation.y', from: 45, to: 405, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
			fire0: {property: 'material.opacity', to: 1, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fire'},
			fire1: {property: 'material.opacity', from: 1, to: 0.5, dur: 2000, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'fire',},
			clickx: {property: 'object3D.scale.x', from: 3, to: 3.5, dur: 75, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
			clicky: {property: 'object3D.scale.y', from: 3, to: 3.5, dur: 75, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
			clickz: {property: 'object3D.scale.z', from: 3, to: 3.5, dur: 75, delay: 0, loop: 1, dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
		},
		mixins: false,
		classes: ['a-ent'],
		components: {
			mousedownrun__hit:{
				cursorObj: reflex7.id,
				component: 'null',
				method: 'TargetHit',
				params: 'null',
			},
		},
	};
	reflex7.target = auxl.Core(reflex7.targetData);
	//UI
	reflex7.reflex7UIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'reflex7UI',{position: new THREE.Vector3(1.5,1.5,0)}, true);
	reflex7.reflex7UI = auxl.Layer('reflex7UI',reflex7.reflex7UIData);
	//Parent : reflex7UI0
	//Game Status : reflex7UI1
	reflex7.reflex7UI.layer.all.child0.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child0.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : reflex7UI2
	reflex7.reflex7UI.layer.all.child1.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child1.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child1.core.core.text.value = 'Reflex 7';
	//Current Level & Points : reflex7UI3
	reflex7.reflex7UI.layer.all.child2.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child2.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child2.core.core.text.wrapCount = 15;
	reflex7.reflex7UI.layer.all.child2.core.core.text.value = 'Time : 0.00ms\nAvg : 0.00ms\nBest : 0.00ms';
	//High Score Board : reflex7UI4
	reflex7.reflex7UI.layer.all.child3.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child3.core.core.material.emissive = auxl.reflex7GameColor.compl;
	//Game Start : reflex7UI5
	reflex7.reflex7UI.layer.all.child4.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child4.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child4.core.core.components = {};
	reflex7.reflex7UI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: reflex7.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : reflex7UI6
	reflex7.reflex7UI.layer.all.child5.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child5.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child5.core.core.text.value = 'Give Up';
	reflex7.reflex7UI.layer.all.child5.core.core.components = {};
	reflex7.reflex7UI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : reflex7UI7
	reflex7.reflex7UI.layer.all.child6.core.core.material.color = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child6.core.core.material.emissive = auxl.reflex7GameColor.compl;
	reflex7.reflex7UI.layer.all.child6.core.core.components = {};
	reflex7.reflex7UI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'reflex7GameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			reflex7.highScores = checkLowScore(score, reflex7.highScores);
		}
		reflex7.highScores.text = refreshHighScoreText(reflex7.highScores);
		reflex7.reflex7UI.GetChild('reflex7UI4').ChangeSelf({property:'text',value:{value:reflex7.highScores.text}});
		auxl.saveToProfile({auxlObject: reflex7.id, type: 'reflex7', sub: false, name: 'highScores', data: reflex7.highScores});
	}
	//Reset
	const Reset = () => {
		reflex7.hits = 7;
		reflex7.times = [];
		reflex7.currentTime = 0;
		reflex7.avgTime = 0;
		reflex7.bestTime = 0;
		reflex7.hitDelay = (Math.random()*4000)+3000;
		reflex7.fired = false;
		clearTimeout(reflex7.hitTimeout);
		clearTimeout(reflex7.fireTimeout);
		clearTimeout(reflex7.prematureTimeout);

	}
	//Game Start
	const GameStart = () => {
		Reset();
		reflex7.target.GetEl().classList.toggle('clickable', true);
		reflex7.reflex7UI.GetChild('reflex7UI1').ChangeSelf({property:'text',value:{value: 'Get Ready!'}});
		reflex7.gameStarted = true;
		GameLoop(reflex7.hits);
	}
	//Game Complete
	const GameComplete = () => {
		reflex7.target.GetEl().classList.toggle('clickable', false);
		reflex7.reflex7UI.GetChild('reflex7UI1').ChangeSelf({property:'text',value:{value: 'Game Completed!'}});
		UpdateScores(reflex7.avgTime);
		reflex7.gameStarted = false;
	}
	//Game Loop
	const GameLoop = (loop) => {
		clearTimeout(reflex7.hitTimeout);
		if(loop > 1){
			reflex7.fired = false;
			reflex7.hitDelay = (Math.random()*4000)+3000;
			reflex7.hitTimeout = setTimeout(() => {
				reflex7.target.EmitEvent('fire');
				reflex7.fired = true;
				HitTimer();

			}, reflex7.hitDelay);
		} else {
			GameComplete();
		}
	}
	//Hit Timer
	const HitTimer = () => {
		clearTimeout(reflex7.fireTimeout);
		reflex7.currentTime = 0;
		reflex7.fireTimeout = setTimeout(() => {
			TimerFail();
			clearTimeout(reflex7.fireTimeout);
		}, 2000);

	}
	//Timer Fail
	const TimerFail = () => {
		reflex7.currentTime = 2000;
		UpdateAvgTime(reflex7.currentTime);
		GameLoop(reflex7.hits--);
	}
	//Target Hit
	const TargetHit = () => {
		if(reflex7.fired){
			clearTimeout(reflex7.fireTimeout);
			reflex7.currentTime = reflex7.target.GetEl().components.animation__fire1.time;
			UpdateAvgTime(reflex7.currentTime);
			GameLoop(reflex7.hits--);
		} else {
			reflex7.target.GetEl().classList.toggle('clickable', false);
			auxl.player.Notification({message: 'Too Soon!', time: 1250});
			reflex7.prematureTimeout = setTimeout(() => {
				reflex7.target.GetEl().classList.toggle('clickable', true);
				clearTimeout(reflex7.prematureTimeout);
			}, 1250);
		}
	}

	//Average Hit Time
	const UpdateAvgTime = (time) => {
		reflex7.times.push(time);
		reflex7.avgTime = reflex7.times.reduce((a, b) => a + b, 0);
		reflex7.avgTime /= reflex7.times.length;
		let bestTime = [...reflex7.times];
		bestTime.sort(function(a, b){return a - b}); 
		reflex7.bestTime = bestTime[0];
		//Update UI
		reflex7.reflex7UI.GetChild('reflex7UI3').ChangeSelf({property:'text',value:{value:'Time : '+reflex7.currentTime.toFixed(2)+' ms\nAvg : '+reflex7.avgTime.toFixed(2)+' ms\nBest : '+ reflex7.bestTime.toFixed(2)+' ms'}});
		reflex7.reflex7UI.GetChild('reflex7UI1').ChangeSelf({property:'text',value:{value: reflex7.hits + ' Chances Left'}});
	}


	//Spawn Reflex 7
	const SpawnR7Game = () => {
		if(reflex7.inScene){}else{
			reflex7.target.SpawnCore();
			reflex7.reflex7UI.SpawnLayer();
			UpdateScores();
			reflex7.inScene = true;
		}
	}
	//Despawn Reflex 7
	const DespawnR7Game = () => {
		if(reflex7.inScene){
			Reset();
			reflex7.target.DespawnCore();
			reflex7.reflex7UI.DespawnLayer();
			reflex7.inScene = false;
			auxl.RemoveFromTracker(reflex7.id);
		}
	}

	return {reflex7, core, SpawnR7Game, DespawnR7Game, GameStart, TargetHit}
}
auxl.reflex7Game = auxl.Reflex7('reflex7Game');
//Reflex 7 Game Menu
auxl.reflex7GameMenuData = {
	id: 'reflex7GameMenu',
	game: auxl.reflex7Game.reflex7,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game7',
	gameCabinet: 'cadeCab7Layer',
	outGamePos: new THREE.Vector3(-8,1.5,-23.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.5),
};
auxl.reflex7GameMenu = auxl.GameMenu(auxl.reflex7GameMenuData);

//
//Tap It
//Watch for callouts to do 1 of 4 mechanics within an ever increasing timer.
auxl.TapIt = (id) => {

	let tapIt = {};
	tapIt.id = id;
	let core = 'tapIt';
	tapIt.title = 'Tap It';
	tapIt.instructionsText = 'How To Play :\n';
	tapIt.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	tapIt.previewImage = auxl.pattern01;
	tapIt.inScene = false;
	//Colors
	auxl.tapItGameColor = auxl.colorTheoryGen('#e02020');
	//High Scores
	tapIt.highScores = blankHighScores('Hits', 0);

	//Game Vars
	tapIt.gameStarted = false;
	tapIt.hits = 0;
	tapIt.startTimeout;
	tapIt.hitTimer;
	tapIt.hitTimerDelay = 3100;
	tapIt.correct = false;
	tapIt.current = false;
	tapIt.objectives = ['tap','doubleTap','hover','drag'];
	tapIt.objectivesText = ['Tap It!','Double Tap It!','Hover It!','Drag It!'];
	tapIt.dragStart = false;
	tapIt.doubleTapStart = false;

	//Tap
	tapIt.tapData = {
	data:'tapData',
	id:'tap',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.45, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 3, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#b967ff', emissive: '#b967ff', emissiveIntensity: 0.2, opacity: 1},
	position: new THREE.Vector3(0,2,-1),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		gamestart: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 500, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameStart'},
		click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown, select'},
		click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown, select'},
		gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
		gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mousedownrun__tap:{
			cursorObj: tapIt.id,
			component: 'null',
			method: 'Tap',
			params: 'null',
		},
	},
	};
	tapIt.tap = auxl.Core(tapIt.tapData);
	//Double Tap
	tapIt.doubleTapData = {
	data:'doubleTapData',
	id:'doubleTap',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'box', depth: 0.15, width: 0.75, height: 0.75},
	material: {shader: "standard", color: '#01cdfe', emissive: '#01cdfe', emissiveIntensity: 0.2, opacity: 1},
	position: new THREE.Vector3(0,0.5,-1),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		gamestart: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 500, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameStart'},
		click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
		click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown'},
		click1select: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '4', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'select'},
		click2select: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '4', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'select'},
		gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
		gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mousedownrun__doubletap:{
			cursorObj: tapIt.id,
			component: 'null',
			method: 'DoubleTap',
			params: 'null',
		},
	},
	};
	tapIt.doubleTap = auxl.Core(tapIt.doubleTapData);
	//Hover
	tapIt.hoverData = {
	data:'hoverData',
	id:'hover',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.35, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#05ffa1', emissive: '#05ffa1', emissiveIntensity: 0.2, opacity: 1},
	position: new THREE.Vector3(1,1.35,-1),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		gamestart: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 500, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameStart'},
		click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, select'},
		click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, select'},
		gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
		gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mouseenterrun__hover:{
			cursorObj: tapIt.id,
			component: 'null',
			method: 'Hover',
			params: 'null',
		},
	},
	};
	tapIt.hover = auxl.Core(tapIt.hoverData);
	//Drag 1
	tapIt.drag1Data = {
	data:'drag1Data',
	id:'drag1',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.45, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 3, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#ff71ce', emissive: '#ff71ce', emissiveIntensity: 0.2, opacity: 1},
	position: new THREE.Vector3(-0.85,1.25,-1),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		gamestart: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 500, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameStart'},
		click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown, select'},
		click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown, select'},
		gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
		gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mousedownrun__dragstart:{
			cursorObj: tapIt.id,
			component: 'null',
			method: 'DragStart',
			params: 'null',
		},
	},
	};
	tapIt.drag1 = auxl.Core(tapIt.drag1Data);
	//Drag 2
	tapIt.drag2Data = {
	data:'drag2Data',
	id:'drag2',
	sources: false,
	text: false,
	sounds: false,
	geometry: {primitive: 'cylinder', radius: 0.35, height: 0.15, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: '#fffb96', emissive: '#fffb96', emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(-1.5,1.35,-1),
	rotation: new THREE.Vector3(-90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		gamestart: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 500, delay: 0, loop: '6', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameStart'},
		click1: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		click2: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		click1select: {property: 'scale', from: '1 1 1', to: '1.1 1.1 1.1', dur: 125, delay: 125, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'select'},
		click2select: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 125, delay: 125, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'select'},
		gameover1: {property: 'material.emissiveIntensity', from: '0.2', to: '0.8', dur: 250, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
		gameover2: {property: 'material.emissiveIntensity', from: '0.8', to: '0.2', dur: 250, delay: 2000, loop: 'false', dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'gameOver'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
		mouseenterrun__dragend:{
			cursorObj: tapIt.id,
			component: 'null',
			method: 'DragEnd',
			params: 'null',
		},
	},
	};
	tapIt.drag2 = auxl.Core(tapIt.drag2Data);

	//UI
	tapIt.tapItUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'tapItUI',{position: new THREE.Vector3(1.5,1.5,0)}, true);
	tapIt.tapItUI = auxl.Layer('tapItUI',tapIt.tapItUIData);
	//Parent : reflex7UI0
	//Game Status : reflex7UI1
	tapIt.tapItUI.layer.all.child0.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child0.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : reflex7UI2
	tapIt.tapItUI.layer.all.child1.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child1.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child1.core.core.text.value = 'Tap It';
	//Current Level & Points : reflex7UI3
	tapIt.tapItUI.layer.all.child2.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child2.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child2.core.core.text.value = 'Hits : 0';
	//High Score Board : reflex7UI4
	tapIt.tapItUI.layer.all.child3.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child3.core.core.material.emissive = auxl.tapItGameColor.compl;
	//Game Start : reflex7UI5
	tapIt.tapItUI.layer.all.child4.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child4.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child4.core.core.components = {};
	tapIt.tapItUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: tapIt.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : reflex7UI6
	tapIt.tapItUI.layer.all.child5.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child5.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child5.core.core.text.value = 'Give Up';
	tapIt.tapItUI.layer.all.child5.core.core.components = {};
	tapIt.tapItUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : reflex7UI7
	tapIt.tapItUI.layer.all.child6.core.core.material.color = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child6.core.core.material.emissive = auxl.tapItGameColor.compl;
	tapIt.tapItUI.layer.all.child6.core.core.components = {};
	tapIt.tapItUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'tapItGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			tapIt.highScores = checkHighScore(score, tapIt.highScores);
		}
		tapIt.highScores.text = refreshHighScoreText(tapIt.highScores);
		tapIt.tapItUI.GetChild('tapItUI4').ChangeSelf({property:'text',value:{value:tapIt.highScores.text}});
		auxl.saveToProfile({auxlObject: tapIt.id, type: 'tapIt', sub: false, name: 'highScores', data: tapIt.highScores});
	}
	//Clear
	const Clear = () => {
		tapIt.dragStart = false;
		tapIt.doubleTapStart = false;
		tapIt.current = false;
	}
	//Reset
	const Reset = () => {
		Clear();
		tapIt.correct = false;
		tapIt.hits = 0;
		tapIt.hitTimerDelay = 3100;
		clearTimeout(tapIt.startTimeout);
		clearTimeout(tapIt.hitTimer);

	}
	//ToggleClicks
	const ToggleClick = (toggle) => {
		tapIt.tap.GetEl().classList.toggle('clickable', toggle);
		tapIt.doubleTap.GetEl().classList.toggle('clickable', toggle);
		tapIt.hover.GetEl().classList.toggle('clickable', toggle);
		tapIt.drag1.GetEl().classList.toggle('clickable', toggle);
		tapIt.drag2.GetEl().classList.toggle('clickable', toggle);
	}
	//Emit All
	const EmitAll = (event) => {
		tapIt.tap.EmitEvent(event);
		tapIt.doubleTap.EmitEvent(event);
		tapIt.hover.EmitEvent(event);
		tapIt.drag1.EmitEvent(event);
		tapIt.drag2.EmitEvent(event);
	}
	//Game Start
	const GameStart = () => {
		Reset();
		tapIt.tapItUI.GetChild('tapItUI1').ChangeSelf({property:'text',value:{value:'Get Ready!'}});
		EmitAll('gameStart');
		tapIt.gameStarted = true;
		tapIt.startTimeout = setTimeout(() => {
			Next();
			clearTimeout(tapIt.startTimeout);
		}, 3000);
	}
	//Game Over
	const GameOver = () => {
		ToggleClick(false);
		EmitAll('gameOver');
		if(tapIt.hits > 0){
			tapIt.hits--;
		}
		UpdateScores(tapIt.hits);
		tapIt.tapItUI.GetChild('tapItUI1').ChangeSelf({property:'text',value:{value:'Ahhhh Game Over!'}});
		tapIt.gameStarted = false;
		Reset();
	}
	//Hit Timer
	const HitTimer = () => {
		if(tapIt.current === 'tap'){
			tapIt.tap.EmitEvent('select');
		} else if(tapIt.current === 'doubleTap'){
			tapIt.doubleTap.EmitEvent('select');
		} else if(tapIt.current === 'hover'){
			tapIt.hover.EmitEvent('select');
		} else if(tapIt.current === 'drag'){
			tapIt.drag1.EmitEvent('select');
			tapIt.drag2.EmitEvent('select');
		}
		tapIt.hitTimer = setTimeout(() => {
			if(tapIt.correct){
				Next();
			} else {
				TimerFail();
			}
		}, tapIt.hitTimerDelay);
	}
	//Next
	const Next = () => {
		ToggleClick(true);
		clearTimeout(tapIt.hitTimer);
		tapIt.correct = false;
		let next = Math.floor(Math.random()*tapIt.objectives.length);
		tapIt.current = tapIt.objectives[next];
		tapIt.hits++;
		if(tapIt.hitTimerDelay > 1100){
			tapIt.hitTimerDelay -= 100;
		}
		tapIt.tapItUI.GetChild('tapItUI1').ChangeSelf({property:'text',value:{value: tapIt.objectivesText[next]}});
		HitTimer();
	}
	//Timer Fail
	const TimerFail = () => {
		clearTimeout(tapIt.hitTimer);
		GameOver();
	}
	//Correct
	const Correct = () => {
		Clear();
		tapIt.correct = true;
		ToggleClick(false);
		tapIt.tapItUI.GetChild('tapItUI3').ChangeSelf({property:'text',value:{value:'Hits : '+tapIt.hits}});
		tapIt.tapItUI.GetChild('tapItUI1').ChangeSelf({property:'text',value:{value: 'Correct'}});
	}
	//Tap
	const Tap = () => {
		if(tapIt.current === 'tap'){
			Correct();
		} else {
			GameOver();
		}
	}
	//Double Tap
	const DoubleTap = () => {
		if(tapIt.doubleTapStart){
			if(tapIt.current === 'doubleTap'){
				Correct();
			}
		} else {
			if(tapIt.current === 'doubleTap'){
				tapIt.doubleTapStart = true;
			} else {
				GameOver();
			}
		}
	}
	//Hover
	const Hover = () => {
		if(tapIt.current === 'hover'){
			Correct();
		} else {
			GameOver();
		}
	}
	//Drag Start
	const DragStart = () => {
		if(tapIt.current === 'drag'){
			tapIt.dragStart = true;
		} else {
			GameOver();
		}
	}
	//Drag End
	const DragEnd = () => {
		if(tapIt.dragStart){
			if(tapIt.current === 'drag'){
				Correct();
			} else {
				GameOver();
			}
		}
	}
	//Spawn Tap It
	const SpawnTIGame = () => {
		if(tapIt.inScene){}else{
			tapIt.tap.SpawnCore();
			tapIt.doubleTap.SpawnCore();
			tapIt.hover.SpawnCore();
			tapIt.drag1.SpawnCore();
			tapIt.drag2.SpawnCore();
			tapIt.tapItUI.SpawnLayer();
			UpdateScores();
			tapIt.inScene = true;
		}
	}
	//Despawn Tap It
	const DespawnTIGame = () => {
		if(tapIt.inScene){
			Reset();
			tapIt.tap.DespawnCore();
			tapIt.doubleTap.DespawnCore();
			tapIt.hover.DespawnCore();
			tapIt.drag1.DespawnCore();
			tapIt.drag2.DespawnCore();
			tapIt.tapItUI.DespawnLayer();
			tapIt.inScene = false;
			auxl.RemoveFromTracker(tapIt.id);
		}
	}

	return {tapIt, core, SpawnTIGame, DespawnTIGame, GameStart, Tap, DoubleTap, Hover, DragStart, DragEnd};
}
auxl.tapItGame = auxl.TapIt('tapItGame');
//Tap It Game Menu
auxl.tapItGameMenuData = {
	id: 'tapItGameMenu',
	game: auxl.tapItGame.tapIt,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game8',
	gameCabinet: 'cadeCab8Layer',
	outGamePos: new THREE.Vector3(8,1.5,-11.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.5),
};
auxl.tapItGameMenu = auxl.GameMenu(auxl.tapItGameMenuData);

//
//PopPop Game
//Collect as many Pops as you can every level. The quicker, the greater the bonus
auxl.PopPopGame = (id) => {

	let popPop = {};
	popPop.id = id;
	let core = 'popPop';
	popPop.title = 'Pop Pop';
	popPop.instructionsText = 'How To Play :\n';
	popPop.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	popPop.previewImage = auxl.pattern01;
	popPop.inScene = false;
	//Colors
	auxl.popPopGameColor = auxl.colorTheoryGen('#d0621e');
	//High Scores
	popPop.highScores = blankHighScores('Pts', 0);
	//Game Vars
	popPop.gameStarted = false;
	popPop.totalPoints = 0;
	popPop.levelPoints = 0;
	popPop.level = 1;
	popPop.startTimeout;
	popPop.levelTimeout;
	popPop.hits = [];
	popPop.poptotal = 200;
	popPop.levelSpawn = [0,50,65,80,95,110,135,150,165,180,200];
	popPop.loopTime = [0,1500,1375,1250,1125,1000,875,750,625,500,375];
	popPop.loopBonus = [0,10,5,3,2,1,1,1,1,1,1];

	//Base
	popPop.baseData = {
	data:'baseData',
	id:'base',
	sources: false,
	text: false,
	geometry: {primitive: 'cylinder', radius: 7.5, height: 1, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: auxl.popPopGameColor.base, emissive: auxl.popPopGameColor.base, emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(0,0.5,-15),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: false,
	};
	popPop.base = auxl.Core(popPop.baseData);
	//Pop Template
	popPop.popData = {
	data:'popData',
	id:'pop',
	sources: false,
	text: false,
	sounds: {
		pop: {src: auxl.confirm1, autoplay: false, loop: false, volume: 1, on: 'pop'},
		hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	},
	geometry:{primitive: 'dodecahedron', radius: 0.6, detail: 0},
	material: {shader: "standard", color: '#fffb96', emissive: '#fffb96', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-1,0,-15),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
		pop: {property: 'object3D.position.y', from: '0', to: '10', dur: 1500, delay: 0, loop: '20', dir: 'alternate', easing: 'easeOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'pop', pauseEvents: 'animationcomplete__hitx, reset'},
		hitx: {property: 'object3D.scale.x', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hity: {property: 'object3D.scale.y', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		hitz: {property: 'object3D.scale.z', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter'},
		resetx: {property: 'object3D.scale.x', from: 0.0001, to: 1, dur: 1, delay: 500, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, reset'},
		resety: {property: 'object3D.scale.y', from: 0.0001, to: 1, dur: 1, delay: 500, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, reset'},
		resetz: {property: 'object3D.scale.z', from: 0.0001, to: 1, dur: 1, delay: 500, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, reset'},
		reset: {property: 'object3D.position.y', to: '0', dur: 1, delay: 450, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mouseenter, reset',},
	},
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		mouseenterrun__hit:{
			cursorObj: popPop.id,
			component: 'null',
			method: 'Hit',
			params: '0',
		},
	},
	};
	popPop.pop = auxl.Core(popPop.popData);
	popPop.popCores = [];
	//Build Pops
	let x = 0;
	let y = 0;
	let z = 0;
	let color;
	for(let a = 0; a < popPop.poptotal; a++){
		x = (Math.random()*14)-7;
		y = (Math.random()*7)+7;
		z = (Math.random()*-6)-15;
		color = auxl.colorTheoryGen(false, 'yellow').base;
		popPop.popCores[a] = auxl.coreFromTemplate(popPop.pop,{id: 'pop'+a, material: {shader: "standard", color: color, emissive: color, emissiveIntensity: 0.25, opacity: 1}, position: new THREE.Vector3(x,0,z), components: {mouseenterrun__hit:{cursorObj: popPop.id, component: 'null', method: 'Hit', params: a,},},}, true);
		popPop.popCores[a].core.animations.pop.to = y;
		popPop.popCores[a].core.animations.pop.delay = Math.random()*1500;
	}

	//UI
	popPop.popPopUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'popPopUI',{position: new THREE.Vector3(1.5,1.5,0)}, true);
	popPop.popPopUI = auxl.Layer('popPopUI',popPop.popPopUIData);
	//Parent : popPopUI0
	//Game Status : popPopUI1
	popPop.popPopUI.layer.all.child0.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child0.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : popPopUI2
	popPop.popPopUI.layer.all.child1.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child1.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child1.core.core.text.value = 'Pop Pop';
	//Current Level & Points : popPopUI3
	popPop.popPopUI.layer.all.child2.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child2.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child2.core.core.text.value = 'Hits : 0\nPts : 0\nTotal : 0';
	//High Score Board : popPopUI4
	popPop.popPopUI.layer.all.child3.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child3.core.core.material.emissive = auxl.popPopGameColor.compl;
	//Game Start : popPopUI5
	popPop.popPopUI.layer.all.child4.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child4.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child4.core.core.components = {};
	popPop.popPopUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: popPop.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : popPopUI6
	popPop.popPopUI.layer.all.child5.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child5.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child5.core.core.text.value = 'Next';
	popPop.popPopUI.layer.all.child5.core.core.components = {};
	popPop.popPopUI.layer.all.child5.core.core.components.visible = false;
	popPop.popPopUI.layer.all.child5.core.core.components.clickrun__menutoggle = {cursorObj: popPop.id, component: 'null', method: 'GameLoop', params: 'null',};
	//Game Menu : popPopUI7
	popPop.popPopUI.layer.all.child6.core.core.material.color = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child6.core.core.material.emissive = auxl.popPopGameColor.compl;
	popPop.popPopUI.layer.all.child6.core.core.components = {};
	popPop.popPopUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'popPopGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			popPop.highScores = checkHighScore(score, popPop.highScores);
		}
		popPop.highScores.text = refreshHighScoreText(popPop.highScores);
		popPop.popPopUI.GetChild('popPopUI4').ChangeSelf({property:'text',value:{value:popPop.highScores.text}});
		auxl.saveToProfile({auxlObject: popPop.id, type: 'popPop', sub: false, name: 'highScores', data: popPop.highScores});
	}
	//Reset
	const Reset = () => {
		clearTimeout(popPop.startTimeout);
		clearTimeout(popPop.levelTimeout);
		popPop.popCores.forEach(pop => pop.EmitEvent('reset'));
		popPop.totalPoints = 0;
		popPop.levelPoints = 0;
		popPop.level = 1;
		popPop.hits = 0;
		UpdateCores(popPop.level);
	}
	//Countdown
	const Countdown = (count) => {
		popPop.popPopUI.GetChild('popPopUI1').ChangeSelf({property:'text',value:{value:'Starting in '+ count + '...'}});
		let countTimeout = setTimeout(() => {
			if(count > 1){
				Countdown(count-1);
			} else {
				popPop.popPopUI.GetChild('popPopUI1').ChangeSelf({property:'text',value:{value:'GO!'}});
			}
			clearTimeout(countTimeout);
		}, 1000);
	}
	//Pop
	const Pop = (amount) => {
		for(let a = 0; a < amount; a++){
			popPop.popCores[a].EmitEvent('pop');
		}
	}
	//Update Cores
	const UpdateCores = (level) => {
		let x = 0;
		let y = 0;
		let z = 0;
		let pop = {name: 'pop', property: 'object3D.position.y', from: '0', to: '10', dur: popPop.loopTime[popPop.level], delay: 0, loop: '20', dir: 'alternate', easing: 'easeOutCirc', elasticity: 400, autoplay: false, enabled: true, startEvents: 'pop', pauseEvents: 'animationcomplete__hitx, reset'};
		for(let a = 0; a < popPop.levelSpawn[popPop.level]; a++){
			x = (Math.random()*14)-7;
			y = (Math.random()*10)+7;
			z = (Math.random()*-6)-15;
			pop.to = y;
			pop.delay = Math.random()*1000 + a*5;
			popPop.popCores[a].Animate(pop);
			popPop.popCores[a].ChangeSelf({property: 'position', value: new THREE.Vector3(x,0,z)});
			popPop.popCores[a].GetEl().classList.toggle('clickable', true);
		}
	}
	//Game Loop
	const GameLoop = () => {
		popPop.popPopUI.GetChild('popPopUI3').ChangeSelf({property:'text',value:{value:'Hits : '+ popPop.hits +'\nPts : '+ popPop.levelPoints +'\nTotal : ' + popPop.totalPoints}});
		popPop.popPopUI.GetChild('popPopUI6').ChangeSelf({property:'visible',value: false});
		//Level Countdown
		Countdown(3);
		//Start Popping
		popPop.startTimeout = setTimeout(() => {
			Pop(popPop.levelSpawn[popPop.level]);
			clearTimeout(popPop.startTimeout);
		}, 3000);
		//Level Time
		popPop.levelTimeout = setTimeout(() => {
			LevelOver();
		}, (popPop.loopTime[popPop.level]*20)+5000);
	}
	//Level Complete
	const LevelOver = () => {
		clearTimeout(popPop.levelTimeout);
		popPop.popPopUI.GetChild('popPopUI1').ChangeSelf({property:'text',value:{value:'Level '+popPop.level+' Over'}});
		if(popPop.level === 10){
			GameOver();
		} else {
			popPop.level++;
			popPop.hits = 0;
			popPop.levelPoints = 0;
			UpdateCores(popPop.level);
			//Display Next Level Button to continue GameLoop
			popPop.popPopUI.GetChild('popPopUI6').ChangeSelf({property:'visible',value: true});
		}
	}
	//Good Hit
	const Hit = (item) => {
		popPop.popCores[item].GetEl().classList.toggle('clickable', false);
		let bonus = popPop.popCores[item].GetEl().components.animation__pop.animation.remaining;
		bonus = Math.ceil(bonus/2);
		let points = popPop.loopBonus[bonus]*(popPop.level*10);
		popPop.totalPoints += points;
		popPop.levelPoints += points;
		popPop.hits++;
		popPop.popPopUI.GetChild('popPopUI3').ChangeSelf({property:'text',value:{value:'Hits : '+ popPop.hits +'\nPts : '+ popPop.levelPoints +'\nTotal : ' + popPop.totalPoints}});
		//Collected All
		if(popPop.hits >= popPop.levelSpawn[popPop.level]){
			//Bonus
			popPop.totalPoints += popPop.level*100;
			popPop.levelPoints += popPop.level*100;
			popPop.popPopUI.GetChild('popPopUI3').ChangeSelf({property:'text',value:{value:'Bonus '+ popPop.level*100+'!\nHits : '+ popPop.hits +'\nPts : '+ popPop.levelPoints +'\nTotal : ' + popPop.totalPoints}});
			LevelOver();
		}
	}
	//Game Start
	const GameStart = () => {
		Reset();
		popPop.gameStarted = true;
		popPop.popPopUI.GetChild('popPopUI5').ChangeSelf({property:'text',value:{value:'Restart'}});
		GameLoop();
	}
	//Game Over
	const GameOver = () => {
		popPop.gameStarted = false;
		popPop.popPopUI.GetChild('popPopUI1').ChangeSelf({property:'text',value:{value:'Game Complete'}});
		popPop.popPopUI.GetChild('popPopUI5').ChangeSelf({property:'text',value:{value:'Start'}});
		UpdateScores(popPop.totalPoints);
	}
	//Spawn popPop Game
	const SpawnPPGame = () => {
		if(popPop.inScene){}else{
			popPop.popPopUI.SpawnLayer();
			popPop.base.SpawnCore();
			popPop.popCores.forEach(pop => pop.SpawnCore());
			UpdateScores();
			popPop.inScene = true;
		}
	}
	//Despawn popPop
	const DespawnPPGame = () => {
		if(popPop.inScene){
			popPop.base.DespawnCore();
			popPop.popCores.forEach(pop => pop.DespawnCore());
			popPop.popPopUI.DespawnLayer();
			popPop.inScene = false;
			auxl.RemoveFromTracker(popPop.id);
		}
	}

	return {popPop, core, SpawnPPGame, DespawnPPGame, GameStart, Hit, GameLoop}
}
auxl.popPopGame = auxl.PopPopGame('popPopGame');
//popPop Game Menu
auxl.popPopGameMenuData = {
	id: 'popPopGameMenu',
	game: auxl.popPopGame.popPop,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game9',
	gameCabinet: 'cadeCab9Layer',
	outGamePos: new THREE.Vector3(8,1.5,-13.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.5),
};
auxl.popPopGameMenu = auxl.GameMenu(auxl.popPopGameMenuData);



//
//Horde Halt Game 
//Stop on onslaught of enemies that by clicking to stun and swiping to kill
auxl.HordeHaltGame = (id) => {

	let hordeHalt = {};
	hordeHalt.id = id;
	let core = 'hordeHalt';
	hordeHalt.title = 'hordeHalt';
	hordeHalt.instructionsText = 'How To Play :\n';
	hordeHalt.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	hordeHalt.previewImage = auxl.pattern01;
	hordeHalt.inScene = false;
	//Colors
	auxl.hordeHaltGameColor = auxl.colorTheoryGen('#4cd041');
	//High Scores
	hordeHalt.highScores = blankHighScores('Kills', 0);
	//Game Vars
	hordeHalt.gameStarted = false;
	hordeHalt.targetPos = new THREE.Vector3(0,0,-4.5);
	hordeHalt.level = 1;
	hordeHalt.health = 5;
	hordeHalt.totalKills = 0;
	hordeHalt.kills = 0;
	hordeHalt.maxEnemies = 30;
	hordeHalt.levelKills = 10;
	hordeHalt.spawnRate = 2000;
	hordeHalt.resumeSpeed = 3000;
	hordeHalt.spawnDistance = -20;
	hordeHalt.moveSpeed = 8000;
	hordeHalt.enemyHealth = 3;

	//Target
	hordeHalt.targetData = {
	data:'targetData',
	id:'target',
	sources: false,
	text: false,
	sounds: {
		fire: {src: auxl.confirm1, autoplay: false, loop: false, volume: 1, on: 'fire'},
		hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	},
	geometry: {primitive: 'box', depth: 1, width: 1, height: 1.25},
	material: {shader: "standard", color: auxl.hordeHaltGameColor.compl, emissive: auxl.hordeHaltGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
	position: hordeHalt.targetPos,
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	hordeHalt.target = auxl.Core(hordeHalt.targetData);
	//Enemy Template
	hordeHalt.enemyData = {
	data:'enemyData',
	id:'enemy',
	sources: false,
	text: false,
	sounds: {
		pop: {src: auxl.confirm1, autoplay: false, loop: false, volume: 1, on: 'pop'},
		hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	},
	geometry:{primitive: 'dodecahedron', radius: 0.6, detail: 0},
	material: {shader: "standard", color: '#fffb96', emissive: '#fffb96', emissiveIntensity: 0.25, opacity: 0.5},
	position: new THREE.Vector3(-1,0,-15),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.0001,0.0001,0.0001),
	animations: {
		move: {property: 'position', to: hordeHalt.targetPos, dur: 8000, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'start', pauseEvents: 'mousedown', resumeEvents: 'resume'},
		stun: {property: 'material.opacity', to: 1, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'mousedown',},
		hit: {property: 'material.emissiveIntensity', from: 0.25, to: 1, dur: 50, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'hit'},
		resume: {property: 'material.opacity', from: 1, to: 0.25, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'resume'},
		spawnx: {property: 'object3D.scale.x', from: 0.0001, to: 1, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spawn'},
		spawny: {property: 'object3D.scale.y', from: 0.0001, to: 1, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spawn'},
		spawnz: {property: 'object3D.scale.z', from: 0.0001, to: 1, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'spawn'},
		killx: {property: 'object3D.scale.x', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'kill'},
		killy: {property: 'object3D.scale.y', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'kill'},
		killz: {property: 'object3D.scale.z', from: 1, to: 0.0001, dur: 400, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'kill'},
		remove: {property: 'object3D.position.y', to: -5, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__killz',},
		damagex: {property: 'object3D.scale.x', from: 1, to: 5, dur: 250, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'damage'},
		damagex1: {property: 'object3D.scale.x', from: 1, to: 0.0001, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__damagex'},
		damagey: {property: 'object3D.scale.y', from: 1, to: 5, dur: 250, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'damage'},
		damagey1: {property: 'object3D.scale.y', from: 1, to: 0.0001, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__damagey'},
		damagez: {property: 'object3D.scale.z', from: 1, to: 5, dur: 250, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'damage'},
		damagez1: {property: 'object3D.scale.z', from: 1, to: 0.0001, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'animationcomplete__damagez'},
	},
	mixins: false,
	classes: ['clickable', 'a-ent'],
	components: {
		mousedownrun__hit:{
			cursorObj: hordeHalt.id,
			component: 'null',
			method: 'Stun',
			params: '0',
		},
		mouseenterrun__slashin:{
			cursorObj: hordeHalt.id,
			component: 'null',
			method: 'SlashIn',
			params: '0',
		},
		mouseleaverun__slashout:{
			cursorObj: hordeHalt.id,
			component: 'null',
			method: 'SlashOut',
			params: '0',
		},
		oneventrun__kill:{
			event: 'kill',
			cursorObj: hordeHalt.id,
			component: 'null',
			method: 'ToggleClick',
			params: '0',
		},
		oneventrun__damage:{
			event: 'animationcomplete__move',
			cursorObj: hordeHalt.id,
			component: 'null',
			method: 'Damage',
			params: '0',
		},
	},
	};
	hordeHalt.enemy = auxl.Core(hordeHalt.enemyData);
	hordeHalt.enemies = [];
	hordeHalt.enemyCores = [];
	//Build Enemies
	let x = 0;
	let y = 0;
	let z = 0;
	let color;
	for(let a = 0; a < hordeHalt.maxEnemies; a++){
		x = (Math.random()*40)-20;
		y = (Math.random()*20)+0.5;
		z = (Math.random()*-10)-20;
		color = auxl.colorTheoryGen(false, 'red').base;
		hordeHalt.enemyCores[a] = auxl.coreFromTemplate(hordeHalt.enemy,{id: 'enemy'+a, material: {shader: "standard", color: color, emissive: color, emissiveIntensity: 0.25, opacity: 0.5}, position: new THREE.Vector3(x,y,z), components: {mousedownrun__hit:{cursorObj: hordeHalt.id, component: 'null', method: 'Stun', params: a,}, oneventrun__kill:{event: 'kill', cursorObj: hordeHalt.id, component: 'null', method: 'ToggleClick', params: a,}, mouseenterrun__slashin:{cursorObj: hordeHalt.id, component: 'null', method: 'SlashIn', params: a,}, mouseenterrun__slashout:{cursorObj: hordeHalt.id, component: 'null', method: 'SlashOut', params: a,}, oneventrun__damage:{event: 'animationcomplete__move', cursorObj: hordeHalt.id, component: 'null', method: 'Damage', params: a,}, },}, true);
		hordeHalt.enemyCores[a].core.animations.move.dur = (Math.random()*5000)+20000;
		hordeHalt.enemies.push({num: a, stunned: false, health: 4, slashStart: false, resumeTimeout: false, spawnDistance: -20, moveSpeed: 8000, resumeSpeed: hordeHalt.resumeSpeed});
	}

	//UI
	hordeHalt.hordeHaltUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'hordeHaltUI',{position: new THREE.Vector3(1.5,1.5,0)}, true);
	hordeHalt.hordeHaltUI = auxl.Layer('hordeHaltUI',hordeHalt.hordeHaltUIData);
	//Parent : hordeHaltUI0
	//Game Status : hordeHaltUI1
	hordeHalt.hordeHaltUI.layer.all.child0.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child0.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : hordeHaltUI2
	hordeHalt.hordeHaltUI.layer.all.child1.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child1.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child1.core.core.text.value = 'Horde Halt';
	//Current Level & Points : hordeHaltUI3
	hordeHalt.hordeHaltUI.layer.all.child2.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child2.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child2.core.core.text.value = 'Health 0\nKills: 0\nLeft: 0\nTotal: 0';
	//High Score Board : hordeHaltUI4
	hordeHalt.hordeHaltUI.layer.all.child3.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child3.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	//Game Start : hordeHaltUI5
	hordeHalt.hordeHaltUI.layer.all.child4.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child4.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child4.core.core.components = {};
	hordeHalt.hordeHaltUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: hordeHalt.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : hordeHaltUI6
	hordeHalt.hordeHaltUI.layer.all.child5.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child5.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child5.core.core.text.value = 'Next';
	hordeHalt.hordeHaltUI.layer.all.child5.core.core.components = {};
	hordeHalt.hordeHaltUI.layer.all.child5.core.core.components.visible = false;
	hordeHalt.hordeHaltUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: hordeHalt.id, component: 'null', method: 'GameLoop', params: 'null',};
	//Game Menu : hordeHaltUI7
	hordeHalt.hordeHaltUI.layer.all.child6.core.core.material.color = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child6.core.core.material.emissive = auxl.hordeHaltGameColor.compl;
	hordeHalt.hordeHaltUI.layer.all.child6.core.core.components = {};
	hordeHalt.hordeHaltUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'hordeHaltGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			hordeHalt.highScores = checkHighScore(score, hordeHalt.highScores);
		}
		hordeHalt.highScores.text = refreshHighScoreText(hordeHalt.highScores);
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI4').ChangeSelf({property:'text',value:{value:hordeHalt.highScores.text}});
		auxl.saveToProfile({auxlObject: hordeHalt.id, type: 'hordeHalt', sub: false, name: 'highScores', data: hordeHalt.highScores});
	}
	//Countdown
	const Countdown = (count) => {
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI1').ChangeSelf({property:'text',value:{value:'Starting in '+ count + '...'}});
		let countTimeout = setTimeout(() => {
			if(count > 1){
				Countdown(count-1);
			} else {
				hordeHalt.hordeHaltUI.GetChild('hordeHaltUI1').ChangeSelf({property:'text',value:{value:'GO!'}});
			}
			clearTimeout(countTimeout);
		}, 1000);
	}
	//Toggle Click
	const ToggleClick = (enemy, toggle) => {
		hordeHalt.enemyCores[enemy].GetEl().classList.toggle('clickable', toggle);
	}
	//Update Enemies
	const UpdateEnemies = () => {
		//Enemies
		hordeHalt.enemies.forEach(enemy => {
			enemy.stunned = false;
			enemy.health = hordeHalt.enemyHealth;
			enemy.slashStart = false;
			enemy.spawnDistance = hordeHalt.spawnDistance;
			enemy.moveSpeed = hordeHalt.moveSpeed;
			enemy.resumeSpeed = hordeHalt.resumeSpeed;
			enemy.resumeTimeout = false;
			ToggleClick(enemy.num, true);
		});
		let x = 0;
		let y = 0;
		let z = 0;
		hordeHalt.enemyCores.forEach(enemy => {
			x = (Math.random()*40)-20;
			y = (Math.random()*20)+0.5;
			z = (Math.random()*-10)-20;
 			enemy.ChangeSelf([{property: 'position', value: new THREE.Vector3(x,y,z)}, {property: 'material', value: {opacity: 0.25}}])
		});
	}
	//Reset
	const Reset = () => {
		clearTimeout(hordeHalt.gameDelay);
		hordeHalt.level = 1;
		hordeHalt.health = 5;
		hordeHalt.totalKills = 0;
		hordeHalt.kills = 0;
		hordeHalt.levelKills = 10;
		hordeHalt.spawnRate = 2000;
		hordeHalt.resumeSpeed = 3000;
		hordeHalt.spawnDistance = -20;
		hordeHalt.moveSpeed = 8000;
		hordeHalt.enemyHealth = 3;
		UpdateEnemies();
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI6').ChangeSelf({property:'visible',value:{value: false}});
	}
	//Game Start
	const GameStart = () => {
console.log('Game Start');
		Reset();
		hordeHalt.gameStarted = true;
		GameLoop();
	}
	//Game Over
	const GameOver = () => {
console.log('Game Over');
		hordeHalt.gameStarted = false;
		UpdateScores(hordeHalt.totalKills);
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI1').ChangeSelf({property:'text',value:{value:'Game Over!'}});
	}

	//Game Loop
	const GameLoop = () => {
console.log('Game Started');
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI6').ChangeSelf({property:'visible',value:{value: false}});
		Countdown(3);
		hordeHalt.gameDelay = setTimeout(() => {
			hordeHalt.enemyCores.forEach(enemy => enemy.EmitEvent('spawn'));
			hordeHalt.enemyCores.forEach(enemy => enemy.EmitEvent('start'));
			clearTimeout(hordeHalt.gameDelay);
		}, 3000);
	}
	//Level Complete
	const LevelComplete = () => {
console.log('Level Complete')
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI1').ChangeSelf({property:'text',value:{value:'Level '+hordeHalt.level+' Complete!'}});
		hordeHalt.level++;
		hordeHalt.health += Math.ceil(hordeHalt.level/2);
		hordeHalt.kills = 0;
		hordeHalt.levelKills = 10;
		hordeHalt.spawnRate = 2000;
		hordeHalt.resumeSpeed = 3000;
		hordeHalt.enemyHealth = 3;
		UpdateEnemies();
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI6').ChangeSelf({property:'visible',value:{value: true}});
	}

	//Damage
	const Damage = (enemy) => {
console.log('Damage')
		hordeHalt.health--;
		hordeHalt.enemyCores[enemy].EmitEvent('damage');
		hordeHalt.hordeHaltUI.GetChild('hordeHaltUI3').ChangeSelf({property:'text',value:{value:'Health '+hordeHalt.health+'\nKills: '+hordeHalt.kills+'\nLeft: '+hordeHalt.kills-hordeHalt.levelKills+'\nTotal: '+hordeHalt.total}});
		if(hordeHalt.health <= 0){
			GameOver();
		}
	}

	//Stun
	const Stun = (enemy) => {
console.log('Stun')
		if(hordeHalt.enemies[enemy].stunned){}else{
			hordeHalt.enemies[enemy].stunned = true;
			hordeHalt.enemies[enemy].resumeTimeout = setTimeout(() => {
				hordeHalt.enemyCores[enemy].EmitEvent('resume');
				console.log('Resume');
				clearTimeout(hordeHalt.enemies[enemy].resumeTimeout);
			}, hordeHalt.enemies[enemy].resumeSpeed);
		}
	}

	//Slash In
	const SlashIn = (enemy) => {
		if(hordeHalt.enemies[enemy].stunned){
			hordeHalt.enemies[enemy].slashStart = true;
console.log('Slash In')
		}
	}

	//Slash Out
	const SlashOut = (enemy) => {
		if(hordeHalt.enemies[enemy].stunned && hordeHalt.enemies[enemy].slashStart){
			hordeHalt.enemies[enemy].health--;
			hordeHalt.enemies[enemy].slashStart = false;
console.log('Slash Out')
			hordeHalt.enemyCores[enemy].EmitEvent('hit');
			if(hordeHalt.enemies[enemy].health <= 0){
				hordeHalt.kills++;
				clearTimeout(hordeHalt.enemies[enemy].resumeTimeout);
				hordeHalt.enemyCores[enemy].EmitEvent('kill');
				hordeHalt.hordeHaltUI.GetChild('hordeHaltUI3').ChangeSelf({property:'text',value:{value:'Health '+hordeHalt.health+'\nKills: '+hordeHalt.kills+'\nLeft: '+hordeHalt.kills-hordeHalt.levelKills+'\nTotal: '+hordeHalt.total}});
console.log('Kill')
			}
		}
	}

	//Spawn hordeHalt Game
	const SpawnHHGame = () => {
		hordeHalt.target.SpawnCore();
		hordeHalt.hordeHaltUI.SpawnLayer();
		UpdateScores();
		hordeHalt.enemyCores.forEach(enemy => enemy.SpawnCore());
		hordeHalt.inScene = true;
	}
	//Despawn hordeHalt
	const DespawnHHGame = () => {
		hordeHalt.target.DespawnCore();
		hordeHalt.hordeHaltUI.DespawnLayer();
		hordeHalt.inScene = false;
		auxl.RemoveFromTracker(hordeHalt.id);
	}

	return {hordeHalt, core, SpawnHHGame, DespawnHHGame, GameStart, GameLoop, Stun, SlashIn, SlashOut, Damage, ToggleClick}
}
auxl.hordeHaltGame = auxl.HordeHaltGame('hordeHaltGame');
//hordeHalt Game Menu
auxl.hordeHaltGameMenuData = {
	id: 'hordeHaltGameMenu',
	game: auxl.hordeHaltGame.hordeHalt,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game10',
	gameCabinet: 'cadeCab10Layer',
	outGamePos: new THREE.Vector3(8,1.5,-15.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.5),
};
auxl.hordeHaltGameMenu = auxl.GameMenu(auxl.hordeHaltGameMenuData);



//
//Basic Game Template
//Basic game description
auxl.BasicGame = (id) => {
//Create new Scene for Game
//Add ObjGen info to objGenTracking
//Update cadeCabLayer in both locations
//Add Relay to Main Scene
//Add Game to High Score Board ObjGen


	let basic = {};
	basic.id = id;
	let core = 'basic';
	basic.title = 'Basic';
	basic.instructionsText = 'How To Play :\n';
	basic.controlsText = 'Game Controls :\nUse the controller ray and controller click to play the game.';
	basic.previewImage = auxl.pattern01;
	basic.inScene = false;
	//Colors
	auxl.basicGameColor = auxl.colorTheoryGen('#0076ff');
	//High Scores
	basic.highScores = blankHighScores('Hits', 0);
	//Game Vars
	basic.gameStarted = false;

	//Target
	basic.basicObjData = {
	data:'basicObjData',
	id:'basicObj',
	sources: false,
	text: false,
	sounds: {
		fire: {src: auxl.confirm1, autoplay: false, loop: false, volume: 1, on: 'fire'},
		hit: {src: auxl.confirm2, autoplay: false, loop: false, volume: 1, on: 'mousedown'},
	},
	geometry: {primitive: 'box', depth: 1, width: 1, height: 1},
	material: {shader: "standard", color: auxl.basicGameColor.compl, emissive: auxl.basicGameColor.compl, emissiveIntensity: 0.1, opacity: 1},
	position: new THREE.Vector3(0,2,-4),
	rotation: new THREE.Vector3(0,45,0),
	scale: new THREE.Vector3(2,2,2),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: {
		mousedownrun__hit:{
			cursorObj: basic.id,
			component: 'null',
			method: 'TargetHit',
			params: 'null',
		},
	},
	};
	basic.basicObj = auxl.Core(basic.basicObjData);

	//UI
	basic.basicUIData = auxl.layerDataFromTemplate(auxl.uiGameLayerData, 'basicUI',{position: new THREE.Vector3(1.5,1.5,0)}, true);
	basic.basicUI = auxl.Layer('basicUI',basic.basicUIData);
	//Parent : basicUI0
	//Game Status : basicUI1
	basic.basicUI.layer.all.child0.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child0.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child0.core.core.text.value = 'Game Ready';
	//Game Title : basicUI2
	basic.basicUI.layer.all.child1.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child1.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child1.core.core.text.value = 'Basic';
	//Current Level & Points : basicUI3
	basic.basicUI.layer.all.child2.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child2.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child2.core.core.text.value = 'Pts : 0';
	//High Score Board : basicUI4
	basic.basicUI.layer.all.child3.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child3.core.core.material.emissive = auxl.basicGameColor.compl;
	//Game Start : basicUI5
	basic.basicUI.layer.all.child4.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child4.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child4.core.core.components = {};
	basic.basicUI.layer.all.child4.core.core.components.clickrun__gamestart = {cursorObj: basic.id, component: 'null', method: 'GameStart', params: 'null',};
	//Game Control : basicUI6
	basic.basicUI.layer.all.child5.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child5.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child5.core.core.text.value = 'Give Up';
	basic.basicUI.layer.all.child5.core.core.components = {};
	basic.basicUI.layer.all.child5.core.core.components.visible = false;
	//Game Menu : basicUI7
	basic.basicUI.layer.all.child6.core.core.material.color = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child6.core.core.material.emissive = auxl.basicGameColor.compl;
	basic.basicUI.layer.all.child6.core.core.components = {};
	basic.basicUI.layer.all.child6.core.core.components.clickrun__menutoggle = {cursorObj: 'basicGameMenu', component: 'null', method: 'ToggleGameMenu', params: 'null',};

	//Update Scores
	const UpdateScores = (score) => {
		if(score){
			basic.highScores = checkHighScore(score, basic.highScores);
		}
		basic.highScores.text = refreshHighScoreText(basic.highScores);
		basic.basicUI.GetChild('basicUI4').ChangeSelf({property:'text',value:{value:basic.highScores.text}});
		auxl.saveToProfile({auxlObject: basic.id, type: 'basic', sub: false, name: 'highScores', data: basic.highScores});
	}
	//Reset
	const Reset = () => {
console.log('Reset');

	}
	//Game Start
	const GameStart = () => {
console.log('Game Start');
		Reset();
		basic.gameStarted = true;
	}
	//Game Over
	const GameOver = () => {
console.log('Game Over');
		basic.gameStarted = false;
	}

	//Game Loop
	const GameLoop = () => {

	}

	//Target Hit
	const TargetHit = () => {
console.log('Hit')

	}

	//Spawn Basic Game
	const SpawnBasicGame = () => {
		basic.basicObj.SpawnCore();
		basic.basicUI.SpawnLayer();
		basic.inScene = true;
	}
	//Despawn Basic
	const DespawnBasicGame = () => {
		basic.basicObj.DespawnCore();
		basic.basicUI.DespawnLayer();
		basic.inScene = false;
		auxl.RemoveFromTracker(basic.id);
	}

	return {basic, core, SpawnBasicGame, DespawnBasicGame, GameStart, TargetHit}
}
auxl.basicGame = auxl.BasicGame('basicGame');
//Basic Game Menu
auxl.basicGameMenuData = {
	id: 'basicGameMenu',
	game: auxl.basicGame.basic,
	homeZone: 'xrcadeZone',
	homeConnect: 'xrcadeHome',
	gameZone: 'xrcadeZone',
	gameConnect: 'game#',
	gameCabinet: 'cadeCab#Layer',
	outGamePos: new THREE.Vector3(8,1.5,-11.75),
	inGamePos: new THREE.Vector3(0.75,1.5,0.5),
};
auxl.basicGameMenu = auxl.GameMenu(auxl.basicGameMenuData);

//
//Highest Scores Board
auxl.HighScoreBoard = (id) => {

	let highScoreBoard = {};
	highScoreBoard.id = id;
	highScoreBoard.inScene = false;

	highScoreBoard.boardData = {
	data:'boardData',
	id:'board',
	sources: false,
	text: {value:'High Scores', color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.005, side: 'front', wrapCount: 25, baseline: 'center', align: 'left', width: 2.75},
	geometry: {primitive: 'plane', width: 3, height: 3},
	material: {shader: "standard", color: '#2694ce', emissive: '#2694ce', emissiveIntensity: 0.75, opacity: 1},
	position: new THREE.Vector3(-9,2,-2),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	highScoreBoard.board = auxl.Core(highScoreBoard.boardData);
	highScoreBoard.backBoardData = {
	data:'backBoardData',
	id:'backBoard',
	sources: false,
	text: false,
	geometry: {primitive: 'plane', width: 3.2, height: 3.2},
	material: {shader: "standard", color: '#FFFFFF', emissive: '#FFFFFF', emissiveIntensity: 0.5, opacity: 1},
	position: new THREE.Vector3(-9.01,2,-2),
	rotation: new THREE.Vector3(0,90,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	highScoreBoard.backBoard = auxl.Core(highScoreBoard.backBoardData);

	highScoreBoard.allGames = [
		auxl.memory,
		auxl.swipeLaunchGame,
		auxl.guessHitGame,
		auxl.dragDiffuseGame,
		auxl.sharpShooterGame,
		auxl.perfectScaleGame,
		auxl.reflex7Game,
		auxl.tapItGame,
		auxl.popPopGame,
		auxl.hordeHaltGame,
	];
	highScoreBoard.allScores = {};
	highScoreBoard.text = 'XRcade High Scores\n';

	//Compile Scores
	const CompileScores = () => {
		highScoreBoard.text = 'XRcade High Scores\n';
		highScoreBoard.allGames.forEach(game => {
			//console.log({game:game[game.core].title, name: game[game.core].highScores.name1, score: game[game.core].highScores.score1, type: game[game.core].highScores.type, acc: game[game.core].highScores.acc});
			highScoreBoard.allScores[game.core] = {};
			highScoreBoard.allScores[game.core].title = game[game.core].title;
			highScoreBoard.allScores[game.core].name = game[game.core].highScores.name1;
			highScoreBoard.allScores[game.core].score = game[game.core].highScores.score1;
			highScoreBoard.allScores[game.core].type = game[game.core].highScores.type;
			highScoreBoard.allScores[game.core].acc = game[game.core].highScores.acc;
			highScoreBoard.text += game[game.core].title + ' : ' + game[game.core].highScores.score1.toFixed(game[game.core].highScores.acc) + ' ' + game[game.core].highScores.type;
		});
	}

	//Update
	const UpdateBoard = () => {
		CompileScores();
		highScoreBoard.board.ChangeSelf({property: 'text', value:{value: highScoreBoard.text}});
	}

	//Spawn Board
	const SpawnBoard = () => {
		highScoreBoard.board.SpawnCore();
		highScoreBoard.backBoard.SpawnCore();
		highScoreBoard.inScene = true;
	}
	//Despawn Board
	const DespawnBoard = () => {
		highScoreBoard.board.DespawnCore();
		highScoreBoard.backBoard.DespawnCore();
		highScoreBoard.inScene = false;
	}

	return {highScoreBoard, SpawnBoard, DespawnBoard, UpdateBoard}
}
auxl.highScoresBoard = auxl.HighScoreBoard('highScoresBoard');


//Build Mini Games Objects
auxl.buildMiniGames = () => {
	//Memory Game
	auxl.memory = auxl.MemoryGame('memory');
	auxl.memoryGameMenu = auxl.GameMenu(auxl.memoryGameMenuData);
	//Swipe Launch
	auxl.swipeLaunchGame = auxl.SwipeLaunchGame('swipeLaunchGame');
	auxl.swipeLaunchGameMenu = auxl.GameMenu(auxl.swipeLaunchGameMenuData);
	//Guess Hit
	auxl.guessHitGame = auxl.GuessHitGame('guessHitGame');
	auxl.guessHitGameMenu = auxl.GameMenu(auxl.guessHitGameMenuData);
	//Drag Diffuse
	auxl.dragDiffuseGame = auxl.DragDiffuse('dragDiffuseGame');
	auxl.dragDiffuseGameMenu = auxl.GameMenu(auxl.dragDiffuseGameMenuData);
	//Sharp Shooter
	auxl.sharpShooterGame = auxl.SharpShooter('sharpShooterGame');
	auxl.sharpShooterGameMenu = auxl.GameMenu(auxl.sharpShooterGameMenuData);
	//Perfect Scale
	auxl.perfectScaleGame = auxl.PerfectScale('perfectScaleGame');
	auxl.perfectScaleGameMenu = auxl.GameMenu(auxl.perfectScaleGameMenuData);
	//Reflex 7
	auxl.reflex7Game = auxl.Reflex7('reflex7Game');
	auxl.reflex7GameMenu = auxl.GameMenu(auxl.reflex7GameMenuData);
	//Tap It
	auxl.tapItGame = auxl.TapIt('tapItGame');
	auxl.tapItGameMenu = auxl.GameMenu(auxl.tapItGameMenuData);

}
auxl.toBeRebuilt('buildMiniGames');

},
});

//
//Export
export default arcade;