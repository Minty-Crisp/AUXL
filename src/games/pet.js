//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Pet
//

/*

Pet Sim
- Controls : A(Next) B(Confirm) C(Cancel?)
Feed : Meal or Snack. Don't overfeed or it will refuse to eat.
Light : Room/System light. Turn light off while it sleeps or it will get restless. It will turn the light on when it wakes up.
Play : 5 left/right guess to match it.
Medicine : If it is sick, keep using.
Duck : Clean it's droppings
Health Meter : Status
Discipline : Needs this if it beeps even though happy and full, wont eat if it's hungry or wont play games when it is not happy. Neglection will affect evolution



Remix

Settings
- ID
- Status
- Name
- Info
- Upgrade
- Stats
- - Nature
- - Ability
- - Mood
- - Hunger
- - Stamina
- - Mana
- - Level / XP
- - Age
- Customize
- Save
- Load
- Reset

Bond
- Pet
- Love
- Tease
- Toy
- Praise
- Caution
- Reprimand

Feed (Drink, Snack, Meal or Treat[special])
- Vending
- Home Cooked
- Take Out

Soothe
- Amends
- Groom
- Bath
- Heal

Bed
- Sleep
- Nap
- Cuddle

Play
- Co-op & Vs (Owner vs Pet) Games

Story|Event (X per day, rng built)
- Fun, Chores, Events, Hijinks i.e. Walk, Park, Train, Picnic, Photo Op, Vet Visit, Prank Each Other, etc...




Advanced Pet Sim

Both a quick menu and the ability to hover/select an in scene object to launch menu options

What about location based actions and can travel?

Settings
- ID
- Status
- Name
- Info
- Upgrade
- Stats
- - Nature
- - Ability
- - Mood
- - Hunger
- - Stamina
- - Mana
- - Level / XP
- - Age
- Customize
- Save
- Load
- Reset

Bond
- Pet
- Love
- Tease
- Toy
- Praise
- Caution
- Reprimand

Feed (Drink, Snack, Meal or Treat[special])
- Vending
- Home Cooked
- Take Out

Soothe
- Groom
- Bath
- Heal

Bed
- Sleep
- Nap
- Cuddle

Play
- Lore readout of time spent
- Co-op Games
- Vs (Owner vs Pet) Games

Story|Event (X per day, rng built)
- Fun, Chores, Events, Hijinks i.e. Walk, Park, Train, Picnic, Photo Op, Vet Visit, Prank Each Other, etc...

Island
- Quests
- - Train
- - - Quick super mini games to build stats/status 
- - Type & Difficulty
- - Daily, Weekly or Event
- Town
- - Coin Games
- - Store
- Farm
- - Watch pet for time
- - Store/Pick up Pets
- - Breed

You are either an adventurer or farmer who finds an egg

--------------

Various Frames
- Styles
- Screen Shapes
- Face Plates
- Input Layouts
- Input Types (button, dpad, joystick, pointer, etc...)
- Templates - 3 button basic, handheld console, custom, etc...

Screen should be a-frame embeded and the handheld design should be html/css



*/

//
//Pet
//
//Pet Mini Game
const Pet = (auxl, petData) => {

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

	Main Button
	- Hidden : Click to show main menu
	- Display Main Menu : Click to hide menu
	- Display Sub Menu : Click to go back to main menu
	- Exit Mode : Close mode and display main menu
	*/

	const natures = ['nature1', 'nature2', 'nature3'];
	const abilities = ['ability1', 'ability2', 'ability3'];
	const moods = ['sad', 'happy'];
	const energy = ['famished', 'hungry', 'content', 'full', ];
	const full = 4;
	const maxStamina = 10;
	const xpLevels = [0, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600]

	//Nature
	pet.nature = natures[Math.floor(Math.random() * natures.length)];
	//Ability
	pet.ability = natures[Math.floor(Math.random() * abilities.length)];
	//Mana
	pet.mana = Math.floor(Math.random() * 5) + 5;
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
		if (xIs) {
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
		DevDisplay('is ' + pet.hunger, false);
	}

	const Groom = () => {
		if (pet.clean) {} else {
			pet.clean = true;
			DevDisplay('is clean.', false);
		}
	}

	const Play = () => {
		if (pet.stamina > 0) {
			DevDisplay('Playing with', true);
			pet.stamina--;
			pet.mind++;
		}
	}

	const Heal = () => {
		if (pet.currHealth < pet.maxHealth) {
			pet.currHealth += 2;
			DevDisplay('Healing', true);
			if (pet.currHealth > pet.maxHealth) {
				pet.currHealth = pet.maxHealth;
			}
		}
	}

	const Quest = () => {
		if (pet.stamina > 0) {
			DevDisplay('Questing with', false);
			pet.stamina -= 2;
			if (Math.random() * 100 - pet.mana >= 69) {
				DevDisplay('Completed a quest with ', true);
				GainXP(10);
			} else {
				DevDisplay('Failed a quest with', true);
			}
		}
	}

	const GainXP = (xp) => {
		pet.xp += xp;
		if (pet.xp >= xpLevels[pet.level]) {
			DevDisplay(' gained a level!', false);
		}
	}

	const Gamble = () => {
		if (pet.tokens > 0) {
			DevDisplay('Gambling with', false);
			pet.tokens--;
			if (Math.random() * 100 >= 50) {
				pet.currency++;
				DevDisplay(' is a winner', false);
			}
		}
	}

	const ToggleSleep = () => {
		if (pet.awake) {
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
			options: {
				option0: '0'
			},
			actions: {
				action0: '0'
			},
			layout: 'vertical',
			data: auxl.menuBaseData,
			cursorObj: pet.id,
			method: 'mainMenuClick',
			pos: new THREE.Vector3(pet.pos.x + 1, 1.5, pet.pos.z - 1),
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

	return {
		pet,
		SpawnPet,
		DespawnPet,
		Pet,
		Feed,
		Groom,
		Play,
		Heal,
		Quest,
		Gamble,
		ToggleSleep,
		Stats,
		Settings,
		spawnPetMainMenu,
		mainMenuClick
	}

}

//
//Export
export default Pet;
