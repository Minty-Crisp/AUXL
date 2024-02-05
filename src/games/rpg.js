//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)

//AUXL v0.3 Beta - RPG

//
//AUXL RPG
//Adventure game focused ObjGens
const rpg = AFRAME.registerComponent('auxl-rpg', {
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

export default rpg;