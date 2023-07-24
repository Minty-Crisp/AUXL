//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//NPC
//
//Book
//SpeechSystem
//NPC
//InfoBubble
//Creature

//
//Story Book
//Linear, Tree, Quests, Jump, Menu, Conditionals, Flags...
const Book = (auxl, bookData, npc) => {
	let progress = 0;
	let currentPage = 0;
	let currentPageIdle = 0;
	let pagesTimelineLength = 0;
	for(let page in bookData.pages){
		pagesTimelineLength += Object.keys(bookData.pages[page]).length-1;
	}

	//let type = bookData.pages.page0.info.timeline;
	//let idleType = bookData.idle.page0.info.timeline;
	let type = bookData.pages['page'+currentPage].info.timeline;
	let idleType = bookData.idle['page'+currentPageIdle].info.timeline;

	let timelineLength = Object.keys(bookData.pages.page0).length;
	let random = Math.floor(Math.random()*timelineLength-1)+1;
	let previousRandom = 0;

	let timelineLengthIdle = Object.keys(bookData.idle.page0).length;
	let randomIdle = Math.floor(Math.random()*timelineLengthIdle-1)+1;
	let previousRandomIdle = 0;

	//Run Object Generator Function within Book w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		if(object === 'self'){
			object = npc.id;
		}
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn || func === auxl.objGenTracking[types].altSpawn){
				auxl.spawnTracker(object, 'book', npc.id);
			}
		}
		auxl[object][func](params);
	}
	//Yield Timeline
	function* lineReader(book,time){
		//Update and Check Book Progress
		progress++;
		if(progress >= pagesTimelineLength){
			npc.bookEnd = true;
		} else {
			npc.bookEnd = false;
		}
		//Run Line
		for(let line in time){
			//Ignore Page Data
			if(line === 'id' || line === 'description' ||line === 'tags' ||line === 'nextPage' ||line === 'prevPage' ||line === 'timeline'){
				//page data only
			} else if(line === 'pureFunction'){
				//pure functions
				//not object generated methods
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in time[line]){
					auxlObjMethod(line,a,time[line][a]);
				}
			}
		}
		yield;
	}
	//Yield Time
	function* timeReader(book,page){
		for(let time in page){
			book.currentTimeline = time;
			book.timelineQue.push([time,page[time]]);
			//Skip|Ignore Data til timeline# reach if jumping
			if(time === bookData.jumpTo){
				bookData.jumping = false;
			}
			if(bookData.jumping){}else{
				yield* lineReader(book, page[time]);
			}
		}
	}
	//Yield Page
	function* pageReader(book){
		for(let page in book.pages){
			book.currentPage = page;
			book.pageQue.push([page,book.pages[page]]);
			yield* timeReader(book, book.pages[page]);
		}
	}
	//Yield Book
	function* bookReader(book){
		//book.currentPage = 0;
		book.currentTimeline = 0;
		book.currentEntry = 0;
		book.currentDialog = 0;
		book.pageQue = [];
		book.timelineQue = [];
		book.entryQue = [];
		book.textBubbleQue = [];
		book.speaker = '';
		book.speaking = false;
		book.jumping = false;
		book.jumpTo;
		book.selectJumpMenu;
		progress = 0;
		npc.bookEnd = false;
		//Book Info & Contents
		//for(let setting in book.info){
			//console.log(setting);
			//console.log(book.info[setting]);
			//Book Info
			//id
			//description
			//tags
		//};

		//Start reading Pages
		yield* pageReader(book);
	};
	//Init Yield Gen Book
	let book = bookReader(bookData);
	//Yield Timeline
	function* idleLineReader(book,time){
		for(let line in time){
			//Ignore Page Data
			if(line === 'id' || line === 'description' ||line === 'tags' ||line === 'nextPage' ||line === 'prevPage' ||line === 'timeline'){
				//page data only
			} else if(line === 'pureFunction'){
				//pure functions
				//not object generated methods
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in time[line]){
					auxlObjMethod(line,a,time[line][a]);
				}
			}
		}
		yield;
	}
	//Yield Time
	function* idleTimeReader(book,page){
		for(let time in page){
			book.currentTimeline = time;
			book.timelineQue.push([time,page[time]]);
			//Skip|Ignore Data til timeline# reach if jumping
			if(time === bookData.jumpTo){
				bookData.jumping = false;
			}
			if(bookData.jumping){}else{
				yield* idleLineReader(book, page[time]);
			}
		}
	}
	//Yield Page
	function* idlePageReader(book){
		for(let page in book.idle){
			book.currentPage = page;
			book.pageQue.push([page,book.idle[page]]);
			yield* idleTimeReader(book, book.idle[page]);
		}
	}
	//Yield Book
	function* idleBookReader(book){
		book.currentPage = 0;
		book.currentTimeline = 0;
		book.currentEntry = 0;
		book.currentDialog = 0;
		book.pageQue = [];
		book.timelineQue = [];
		book.entryQue = [];
		book.textBubbleQue = [];
		book.speaker = '';
		book.speaking = false;
		book.jumping = false;
		book.jumpTo;
		book.selectJumpMenu;
		//Book Info & Contents
		//for(let setting in book.info){
			//console.log(setting);
			//console.log(book.info[setting]);
			//Book Info
			//id
			//description
			//tags
		//};

		//Start reading Pages
		yield* idlePageReader(book);
	};
	//Build Idle Book
	let idleBook = false;
	if(bookData.idle){
		idleBook = idleBookReader(bookData);
	}
	//Read Book Timeline
	function readTimeline({page,time}){
		for(let line in bookData.pages[page][time]){
			if(line === 'pureFunction'){
				//Need a good check condition for this.func() and not this.obj.func()
				auxl[line](time[line])
			} else {
				for(let a in bookData.pages[page][time][line]){
					auxl[line][a](bookData.pages[page][time][line][a]);
				}
			}
		}
		return;
	}
	//Init Book
	const Init = () => {
		//Jump to 1st Line
		book.done = book.next().done;
		book.done = book.next().done;
		npc.loadingTimeline = false;
	}
	//Next
	const Next = (timeline) => {
		if(type === 'random'){
			Random(timeline);
		}
		book.done = book.next().done;
		let nextTimeout = setTimeout(function () {
			npc.loadingTimeline = false;
			clearTimeout(nextTimeout);
		}, 1000);
	}
	//New Page
	const NewPage = ({page, timeline}) => {
		let newPage;
		if(page){
			newPage = page;
		} else {
			currentPage += 1;
			newPage = 'page' + currentPage;
		}
		let newTimeline = timeline || 'timeline0';
		Jump({timeline: newTimeline, page: newPage});
		let pageTimeout = setTimeout(function () {
			Next();
			clearTimeout(pageTimeout);
		}, 250);
		type = bookData.pages['page'+currentPage].info.timeline;
	}
	//Random
	const Random = (timeline) => {
		if(timeline){
			random = timeline;
		} else {
			random = Math.floor(Math.random()*timelineLength);
			randomNum: while (true) {
				if(random >= timelineLength-1 || random === previousRandom){
					random = Math.floor(Math.random()*timelineLength-1)+1;
					continue randomNum;
				} else {
					break;
				}
			}
			if(random <= previousRandom){
				//reset
				auxl[npc.id].ResetBookRandom(true);
			}
		}
		let randomJump = 'timeline' + random;
		Jump({timeline: randomJump, page: 'page'+currentPage});
		previousRandom = random;
	}
	//Init Idle
	const IdleInit = () => {
		idleBook.done = idleBook.next().done;
		npc.loadingTimeline = false;
	}
	//Idle Next
	const IdleNext = (timeline) => {
		if(idleType === 'random'){
			RandomIdle(timeline);
		}
		idleBook.done = idleBook.next().done;
		let idleNextTimeout = setTimeout(function () {
			npc.loadingTimeline = false;
			clearTimeout(idleNextTimeout);
		}, 1000);
	}
	//Random
	const RandomIdle = (timeline) => {
		if(timeline){
			randomIdle = timeline
		} else {
			randomIdle = Math.floor(Math.random()*timelineLengthIdle)+1;
			randomNumIdle: while (true) {
				if(randomIdle >= timelineLengthIdle-1 || randomIdle === previousRandomIdle){
					randomIdle = Math.floor(Math.random()*timelineLengthIdle-1)+1;
					continue randomNumIdle;
				} else {
					break;
				}
			}
			if(randomIdle <= previousRandomIdle){
				//reset
				auxl[npc.id].ResetIdleRandom(true, randomIdle);
			}
		}
		let randomJumpIdle = 'timeline' + randomIdle;
		JumpIdle({timeline: randomJumpIdle, page: 'page0'});
		previousRandomIdle = randomIdle;
	}
	//Jump to Idle Timeline
	const JumpIdle = ({timeline, page}) => {
		let toPage = page || bookData.currentPage;
		bookData.jumpTo = timeline;
		if(bookData.idle[toPage][bookData.jumpTo]){
			bookData.jumping = true;
		}
	}
	//Jump to Timeline
	const Jump = ({timeline, page}) => {
		let toPage = page || bookData.currentPage;
		bookData.jumpTo = timeline;
		if(bookData.pages[toPage][bookData.jumpTo]){
			bookData.jumping = true;
		}
	}
	//Jump Menu
	const SelectJump = (jumpOptions) => {
		let selectedTime;
		let selectedPage = false;
		let selectJumpData = {
			id: 'selectJumpMenu',
			prompt: jumpOptions[0],
			options: {},
			actions: {},
			data: auxl.menuBaseData,
			cursorObj: npc.id,
			pos: new THREE.Vector3(1,1.5,-0.5),
			method: 'Click',
		}
		for(let a = 1; a < jumpOptions.length; a++){
			selectJumpData.options['option'+(a-1)] = jumpOptions[a][0];
			selectJumpData.actions['action'+(a-1)] = jumpOptions[a][1];
		}
		npc.selectJumpMenu = auxl.Menu(selectJumpData);
		npc.selectJumpMenu.SpawnMenu();
		npc.selectJumpMenu.AddToParentSpawnTracker(npc.selectJumpMenu, npc, 'book');
		if(npc.bubble.type === 'core'){
			npc.bubble.GetEl().classList.toggle('clickable', false);
		} else {
			npc.bubble.GetParentEl().classList.toggle('clickable', false);
		}
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().classList.toggle('clickable', false);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].classList.toggle('clickable', false);
			}
		}
	}

	return {bookData, book, idleBook, Init, Next, NewPage, Random, IdleInit, IdleNext, RandomIdle, Jump, JumpIdle, SelectJump, readTimeline};
}

//
//Speech System
//Speaking Textbubble
const SpeechSystem = (auxl, core, npc, fixed) => {
	core.on = false;
	core.speaking = false;
	core.blinking = false;
	core.blinkNextText = '';
	core.blinkText0 = '';
	core.blinkText1 = '';
	core.textDisplayInterval;
	let bubbleDespawnTimeout;
	let bubbleSpawnTimeout;
	let id = 'speech'
	core.type = 'core';
	if(core.core){
		core.type = 'core';
		id = core.core.id;
	} else {
		core.type = 'layer';
		id = core.layer.id;
	}
	let parent = false;
	if(npc){
		if(npc.avatar.core){
			parent = 'core';
		} else {
			parent = 'layer';
		}
	}
	//Start Textbubble
	const Start = () => {
		let spawnParent = false;
		if(parent === 'core'){
			spawnParent = npc.avatar.GetEl();
		} else if(parent === 'layer'){
			spawnParent = npc.avatar.GetParentEl();
		}
		if(core.type === 'core'){
			core.SpawnCore(spawnParent);
			core.GetEl().addEventListener('mouseenter', Skip);
			bubbleSpawnTimeout = setTimeout(() => {
				core.EmitEvent('loadin');
				clearTimeout(bubbleDespawnTimeout);
			}, 25);
		} else {
			core.SpawnLayer(spawnParent);
			core.GetParentEl().addEventListener('mouseenter', Skip);
			StartCloseReset();
			bubbleSpawnTimeout = setTimeout(() => {
				core.EmitEventAll('loadin');
				clearTimeout(bubbleDespawnTimeout);
			}, 25);
		}
		core.on = true;
	}
	//Skip to end of speech
	const Skip = () => {
		if(core.type === 'core'){
			core.GetEl().emit('skip',{});
		} else {
			core.GetParentEl().emit('skip',{});
		}
	}
	//Stop Textbubble
	const Stop = () => {
		if(core.on){
			if(core.type === 'core'){
				core.GetEl().removeEventListener('mouseenter', Skip);
				core.EmitEvent('loadout');
				bubbleDespawnTimeout = setTimeout(() => {
					core.DespawnCore();
					core.on = false;
					clearTimeout(bubbleDespawnTimeout);
				}, 1000);
			} else {
				core.GetParentEl().removeEventListener('mouseenter', Skip);
				core.EmitEventAll('loadout');
				StopCloseReset();
				bubbleDespawnTimeout = setTimeout(() => {
					core.DespawnLayer();
					core.on = false;
					clearTimeout(bubbleDespawnTimeout);
				}, 1000);
			}
		}
	}
	//Start Close & Reset
	const StartCloseReset = () => {
		//Close
		core.layer.all.child0.core.GetEl().addEventListener('click',auxl[npc.id].ResetSpeech)
		//Reset
		core.layer.all.child1.core.GetEl().addEventListener('click',auxl[npc.id].ForceResetBook)
	}
	//Stop Close & Reset
	const StopCloseReset = () => {
		//Close
		core.layer.all.child0.core.GetEl().removeEventListener('click',npc.ResetSpeech)
		//Reset
		core.layer.all.child1.core.GetEl().removeEventListener('click',npc.ForceResetBook)
	}
	//Kill Speech
	const Kill = () => {
		core.speaking = false;
		clearInterval(auxl.intervals[id]);
		delete auxl.intervals[id];
	}
	//Kill Blink
	const KillBlink = () => {
		core.blinking = false;
		clearInterval(auxl.intervals[id+'blink']);
		delete auxl.intervals[id+'blink'];
	}
	//Kill Speech & Stop Textbuble
	const KillStop = () => {
		Kill();
		KillBlink();
		Stop();
	}
	//Change Textbubble - Single or Array
	const ChangeCore = (setAlt) => {
		if(core.type === 'core'){
			if(Array.isArray(setAlt)){
				for(let each in setAlt){
					core.ChangeSelf(setAlt[each])
				}
			} else {
				core.ChangeSelf(setAlt)
			}
		} else {
			if(Array.isArray(setAlt)){
				for(let each in setAlt){
					core.ChangeParent(setAlt[each])
				}
			} else {
				core.ChangeParent(setAlt)
			}
		}

	}
	//Speaking Controls
	const DisplaySpeech = ({role,speech}) => {
		KillBlink();
		let startText = role + ' : ';
		let currText = startText;
		let currChar = 0;
		if(core.type === 'core'){
			//Scene text which uses a Core to display has an issue with re-using core.dom, so a forced refresh is needed with GetEl(true)
			core.GetEl(true).setAttribute('text',{value: currText});
		} else {
			core.GetParentEl().setAttribute('text',{value: currText});
		}
		core.speaking = true;

		function skipText(){
			if(core.type === 'core'){
				core.GetEl().setAttribute('text',{value: startText + speech});
			} else {
				core.GetParentEl().setAttribute('text',{value: startText + speech});
			}
			core.speaking = false;
			Kill();
			if(core.blink){
				core.blinkText0 = startText + speech;
				core.blinkText1 = startText + speech;
				if(npc.bookEnd){
					core.blinkNextText = ' X';
				} else {
					core.blinkNextText = ' ->';
				}
				core.blinkText1 += core.blinkNextText;
				Blink();
			}
			if(core.type === 'core'){
				core.GetEl().removeEventListener('skip',skipText);
			} else {
				core.GetParentEl().removeEventListener('skip',skipText);
			}

		}
		if(core.type === 'core'){
			core.GetEl().addEventListener('skip', skipText);
		} else {
			core.GetParentEl().addEventListener('skip', skipText);
		}

		AddToTimeIntEvtTracker({name: 'textDisplayInterval', type: 'interval', id: id});
		auxl.intervals[id] = setInterval(() => {
			//Interval Functions
			if(currChar < speech.length){
				currText += speech[currChar];
				currChar++;
			}
			if(currChar >= speech.length){
				core.speaking = false;
				if(core.type === 'core'){
					core.GetEl().removeEventListener('skip',skipText);

				} else {
					core.GetParentEl().removeEventListener('skip',skipText);
				}
				Kill();
				if(core.blink){
					core.blinkText0 = currText;
					core.blinkText1 = currText;
					if(npc.bookEnd){
						core.blinkNextText = ' X';
					} else {
						core.blinkNextText = ' ->';
					}
					core.blinkText1 += core.blinkNextText;
					Blink();
				}
			}
			if(core.on){
				if(core.type === 'core'){
					core.GetEl().setAttribute('text',{value: currText});
				} else {
					core.GetParentEl().setAttribute('text',{value: currText});
				}
			}
		}, 20);
	}
	//Blink
	const Blink = () => {
		AddToTimeIntEvtTracker({name: 'blinkDisplayInterval', type: 'interval', id: id});
		auxl.intervals[id+'blink'] = setInterval(() => {
			if(core.blinking){
				if(core.type === 'core'){
					core.GetEl().setAttribute('text',{value: core.blinkText1});
				} else {
					core.GetParentEl().setAttribute('text',{value: core.blinkText1});
				}
				core.blinking = false;
			} else {
				if(core.type === 'core'){
					core.GetEl().setAttribute('text',{value: core.blinkText0});
				} else {
//BUG - Issue here sometimes on idle speech
//core.GetParentEl() is null
					core.GetParentEl().setAttribute('text',{value: core.blinkText0});
				}
				core.blinking = true;
			}
		}, 1000);
	}
	//Add Textbubble Timeout, Interval, Interaction & Events to Tracker
	const AddToTimeIntEvtTracker = ({name,type,id,method,params}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.running[nameId] = {type, name, id, nameId, method, params, event};
		}
	}
	//Remove Textbubble Timeout, Interval, Interaction & Events to Tracker
	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}

	return {core, Start, Skip, KillStop, ChangeCore, DisplaySpeech};
}

//
//NPC
//Core Object w/ Book|Pages & Textbubble
const NPC = (auxl, id, object, bookData, textDisplay, special) => {
	let npc = {};
	npc.avatar = Object.assign({}, object);
	npc.avatarType;
	npc.parentId;
	if(object.SpawnCore){
		npc.avatarType = 'core';
		npc.parentId = object.core.id;
	} else if(object.SpawnLayer){
		npc.avatarType = 'layer';
		npc.parentId = object.layer.all.parent.core.core.id;
	}
	npc.id = id;
	npc.special = special || true;
	npc.inScene = false;
	npc.speaking = false;
	npc.bookEnd = false;
	npc.idle = false;
	npc.idleSpeech = false;
	npc.loadingTimeline = false;
	if(bookData.info.name){
		npc.name = bookData.info.name;
	} else {
		npc.name = npc.id;
	}
	//let bubble = Object.assign({}, textDisplay);
	npc.bubble = Object.assign({}, textDisplay);
	npc.bubble.blink = true;
	let book;
	let text = auxl.SpeechSystem(npc.bubble, npc);

	//Idle
	if(bookData.idle){
		npc.idleSpeech = true;
	}
	let spawnTimeout;
	let idleTimeout;
	let idleDelayTime = bookData.info.idleDelay || 7000;
	let idleInterval;
	let idleIntervalTime = bookData.info.idleInterval || 10000;
	let menuTimeout;

	//Get All NPC Elements
	const GetAllNPCEl = () => {
		let allEl;
		if(npc.avatarType === 'core'){
			allEl = npc.avatar.GetEl();
		} else {
			allEl = npc.avatar.GetAllEl();
		}
		return allEl;
	}
	//Get Main NPC Element
	const GetMainNPCEl = () => {
		let allEl;
		if(npc.avatarType === 'core'){
			allEl = npc.avatar.GetEl();
		} else {
			allEl = npc.avatar.GetParentEl();
		}
		return allEl;
	}
	//AddEventListener to Avatar
	const AddNPCEventsAll = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().addEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].addEventListener(eventName, method);
			}
		}
	}
	//RemoveEventListener to Avatar
	const RemoveNPCEventsAll = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().removeEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].removeEventListener(eventName, method);
			}
		}
	}
	//AddEventListener to Avatar
	const AddNPCEventsChildren = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().addEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllChildEl();
			for(let each in all){
				all[each].addEventListener(eventName, method);
			}
		}
	}
	//RemoveEventListener to Avatar
	const RemoveNPCEventsChildren = (eventName, method) => {
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().removeEventListener(eventName, method);
		} else {
			let all = npc.avatar.GetAllChildEl();
			for(let each in all){
				all[each].removeEventListener(eventName, method);
			}
		}
	}
	//Spawn NPC, Reset Book & Start Speaking
	const SpawnNPC = (parent) => {
		if(npc.inScene){}else{
			let spawnParent = parent || false;
			//Reset book on each spawn
			book = auxl.Book(bookData, npc);
			//npc.SpawnCore();
			if(npc.avatarType === 'core'){
				npc.avatar.SpawnCore(spawnParent);
			} else {
				npc.avatar.SpawnLayer(spawnParent);
			}
			//Spawn Timeout fix for Companion if spawned at mouse location
			spawnTimeout = setTimeout(() => {
				if(npc.special){
					AddNPCEventsChildren('mouseenter', EnableSpeech);
				} else {
					AddNPCEventsAll('mouseenter', EnableSpeech);
				}
				clearTimeout(spawnTimeout);
			}, 25);
			if(npc.idleSpeech){
				idleTimeout = setTimeout(() => {
					EnableIdleSpeech()
					clearTimeout(idleTimeout);
				}, idleDelayTime);
			}
			npc.inScene = true;
		}
	}
	//Despawn NPC
	const DespawnNPC = () => {
		if(npc.inScene){
			ClearBookSpawn();
			clearTimeout(spawnTimeout);
			clearTimeout(idleTimeout);
			DisableSpeech();
			DisableIdleSpeech();
			if(npc.speaking){
				if(npc.special){
					RemoveNPCEventsChildren('mouseenter',NextTimeline);
					//RemoveNPCEventsChildren('click',ResetSpeech);
				} else {
					RemoveNPCEventsAll('mouseenter',NextTimeline);
					//RemoveNPCEventsAll('click',ResetSpeech);
				}
			} else {
				if(npc.special){
					RemoveNPCEventsChildren('mouseenter',EnableSpeech);
				} else {
					RemoveNPCEventsAll('mouseenter',EnableSpeech);
				}
			}
			if(npc.avatarType === 'core'){
				npc.avatar.DespawnCore();
			} else {
				npc.avatar.DespawnLayer();
			}
			auxl.RemoveFromTracker(npc.id);
			npc.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(npc.inScene){
			DespawnNPC();
		} else {
			SpawnNPC();
		}
	}
	//Clear Book Spawned Objects
	const ClearBookSpawn = () => {
		auxl.clearSpawned(auxl.bookSpawned[npc.id]);
		delete auxl.bookSpawned[npc.id];
	}
	//Prep & Start NPC Speaking
	const EnableSpeech = () => {
		if(npc.idle){
			DisableIdleSpeech();
		}
		clearTimeout(idleTimeout);
		npc.speaking = true;
		if(npc.special){
			RemoveNPCEventsChildren('mouseenter',EnableSpeech);
		} else {
			RemoveNPCEventsAll('mouseenter',EnableSpeech);
		}
		text.Start();
		book.Init()
		if(npc.special){
			AddNPCEventsChildren('mouseenter',NextTimeline);
			//AddNPCEventsChildren('click',ResetSpeech);
		} else {
			AddNPCEventsAll('mouseenter',NextTimeline);
			//AddNPCEventsAll('click',ResetSpeech);
		}

	}
	//Disable NPC Speaking
	const DisableSpeech = () => {
		text.KillStop();
		if(npc.special){
			RemoveNPCEventsChildren('mouseenter',NextTimeline);
			//RemoveNPCEventsChildren('click',ResetSpeech);
		} else {
			RemoveNPCEventsAll('mouseenter',NextTimeline);
			//RemoveNPCEventsAll('click',ResetSpeech);
		}
	}
	//NPC Speaking
	const Speak = ({role,speech}) => {
		if(role){
			if(role === 'self'){
				role = npc.name;
			}
		} else {
			role = npc.name;
		}
		text.DisplaySpeech({role, speech});
	}
	//NPC Book Next Item
	const NextTimeline = (timeline) => {
		//Prevent pushing next speech until current is over or skipped to end
		if(text.core.on){
			if(text.core.speaking){} else {
				if(npc.loadingTimeline){}else{
					npc.loadingTimeline = true;
					book.Next(timeline);
				}
			}
		} else {
			if(npc.loadingTimeline){}else{
				npc.loadingTimeline = true;
				book.Next(timeline);
			}
		}
	}
	//NPC Book New Page
	const NewPage = ({page,timeline}) => {
		//Prevent pushing next speech until current is over or skipped to end
		book.NewPage({page,timeline});
	}
	//Restart NPC Book
	const ResetSpeech = (force) => {
		DisableSpeech();
		ClearBookSpawn();
		book = auxl.Book(bookData, npc);
		if(npc.special){
			AddNPCEventsChildren('mouseenter',EnableSpeech);
		} else {
			AddNPCEventsAll('mouseenter',EnableSpeech);
		}
	}
	//Reset NPC Book
	const ResetBook = (force) => {
		if(book.book.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			book.Init()
		}
	}
	//Force Reset NPC Book
	const ForceResetBook = () => {
		ClearBookSpawn();
		book = auxl.Book(bookData, npc);
		book.Init()
		//book.Next()
	}
	//Reset NPC Book
	const ResetBookRandom = (force, timeline) => {
		if(book.book.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			book.Init();
			NextTimeline(timeline);
		}
	}
	//Prep & Start NPC Speaking
	const EnableIdleSpeech = () => {
		npc.idle = true;
		text.Start();
		//Jump over Info to Timeline0
		book.IdleInit();
		IdleNextTimeline();
		idleInterval = setInterval(() => {
			IdleNextTimeline();
		}, idleIntervalTime);
	}
	//Disable NPC Speaking
	const DisableIdleSpeech = () => {
		clearInterval(idleInterval);
		npc.idle = false;
	}
	//NPC Book Next Item
	const IdleNextTimeline = (timeline) => {
		//Prevent pushing next speech until current is over or skipped to end
		if(text.core.on){
			if(text.core.speaking){} else {
				if(npc.loadingTimeline){}else{
					npc.loadingTimeline = true;
					book.IdleNext(timeline);
				}
			}
		} else {
			if(npc.loadingTimeline){}else{
				npc.loadingTimeline = true;
				book.IdleNext(timeline);
			}
		}
	}
	//Reset NPC Book
	const IdleReset = (force) => {
		if(book.idleBook.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			book.IdleInit();
		}
	}
	//Reset NPC Idle
	const ResetIdleRandom = (force, timeline) => {
		if(book.idleBook.done || force){
			ClearBookSpawn();
			book = auxl.Book(bookData, npc);
			book.IdleInit();
			IdleNextTimeline(timeline);
		}
	}
	//Update Book
	const UpdateBook = () => {
		console.log(bookData)
		console.log(bookData.pages)
		console.log(bookData.idle)
	}
	//NPC Book Jump Menu Click
	const Click = (el) => {
		text.Skip();
		let result = el.getAttribute('result');
		Jump({timeline: result});
		book.Next();
		//Need to update after creating book control component
		if(npc.bubble.type === 'core'){
			npc.bubble.GetEl().classList.toggle('clickable', false);
		} else {
			npc.bubble.GetParentEl().classList.toggle('clickable', false);
		}
		if(npc.avatarType === 'core'){
			npc.avatar.GetEl().classList.toggle('clickable', true);
		} else {
			let all = npc.avatar.GetAllEl();
			for(let each in all){
				all[each].classList.toggle('clickable', true);
			}
		}
		menuTimeout = setTimeout(function () {
			npc.selectJumpMenu.DespawnMenu();
			npc.selectJumpMenu.RemoveMenuFromSceneTracker();
			clearTimeout(menuTimeout);
		}, 250);
	}
	//NPC Book Jump
	const Jump = ({timeline, page}) => {
		book.Jump({timeline, page})
	}
	//NPC Book Menu Jump
	const SelectJump = (jumpOptions) => {
		book.SelectJump(jumpOptions);
	}
	//Run NPC Methods
	const auxlObjMethod = (object, func, params) => {
		//Only used to run NPC methods
		if(object === 'self'){
			object = npc.id;
		}
		//console.log(object)
		//console.log(func)
		//console.log(params)
		auxl[object][func](params);
	}
	//If/Else for NPC Methods
	const IfElse = (obj) => {
		let objRef = Object.keys(obj)[0];
		let cond = obj[objRef].cond;
		let ifTrue = obj[objRef].ifTrue;
		let ifFalse = obj[objRef].ifFalse;
		if(objRef === 'self'){
			objRef = npc.id;
		}
		if(auxl[objRef].GetFlag){
			if(auxl[objRef].GetFlag(cond)) {
				for(let a in ifTrue){
					for(let b in ifTrue[a]){
						auxlObjMethod(a,b,ifTrue[a][b]);
					}
				}
			} else {
				for(let a in ifFalse){
					for(let b in ifFalse[a]){
						auxlObjMethod(a,b,ifFalse[a][b]);
					}
				}
			}
		} else if(auxl[objRef].GetFlagParent){
			if(auxl[objRef].GetFlagParent(cond)) {
				for(let a in ifTrue){
					for(let b in ifTrue[a]){
						auxlObjMethod(a,b,ifTrue[a][b]);
					}
				}
			} else {
				for(let a in ifFalse){
					for(let b in ifFalse[a]){
						auxlObjMethod(a,b,ifFalse[a][b]);
					}
				}
			}
		}
	}
	//Switch support to run auxlObjMethod()
	const Switch = (obj) => {
		let condObj = Object.keys(obj)[0]
		let switchInfo = obj[condObj];
		if(condObj === 'self'){
			condObj = npc.id;
		}
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'cond' || each === 'default'){}else{
				switchCases.push(each)
			}
		}
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			let switchCondition = auxl[condObj].GetFlag(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			let switchCondition = auxl[condObj].GetFlagParent(switchInfo.cond);
			//console.log(switchCondition);
			//Cases
			for(let each in switchCases){
				if(switchCondition === switchCases[each]){
					for(let a in switchInfo[switchCases[each]]){
						for(let b in switchInfo[switchCases[each]][a]){
							auxlObjMethod(a,b,switchInfo[switchCases[each]][a][b]);
						}
					}
					return;
				}
			}
			//Default
			for(let a in switchInfo.default){
				for(let b in switchInfo.default[a]){
					auxlObjMethod(a,b,switchInfo.default[a][b]);
				}
			}
		} else {
			console.log(condObj);
			console.log('Unable to find value');
			console.log(switchInfo.cond);
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				npc[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: npc.id, type: 'npc', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			npc[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: npc.id, type: 'npc', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(npc(flag[each]));
			}
			return flagArray;
		} else {
			return npc[flag];
		}
	}


return {npc, GetAllNPCEl, GetMainNPCEl, AddNPCEventsAll, RemoveNPCEventsAll, SpawnNPC, DespawnNPC, ToggleSpawn, EnableSpeech, DisableSpeech, EnableIdleSpeech, DisableIdleSpeech, Speak, NextTimeline, NewPage, ResetSpeech, ResetBook, ForceResetBook, ResetBookRandom, IdleNextTimeline, IdleReset, ResetIdleRandom, UpdateBook, Click, Jump, SelectJump, auxlObjMethod, IfElse, Switch, SetFlag, GetFlag}
}

//
//Info Bubble
//Display an Emote or Alert Bubble
const InfoBubble = (auxl, id, object, offset, color) => {
	//Not in Tracker as it is controlled via component
	//Set up for Core parent only at the moment
	let infoBubble = {};
	infoBubble.id = id;
	let bubbleId = infoBubble.id + 'bubble';
	let textId = infoBubble.id + 'text';
	infoBubble.parent = object;
	if(object.SpawnCore){
		infoBubble.parentType = 'core';
	} else if(object.SpawnLayer){
		infoBubble.parentType = 'layer';
	}
	infoBubble.custom = {};
	infoBubble.inScene = false;
	infoBubble.position = new THREE.Vector3(0,0.5,0);
	infoBubble.rotation = new THREE.Vector3(0,0,0);
	infoBubble.color = color || '#14d9a4';
	//Position
	if(offset){
		if(offset.x){
			infoBubble.position.x = offset.x;
			infoBubble.position.y = offset.y;
			infoBubble.position.z = offset.z;
		} else {
			infoBubble.position.y = offset;
		}
	}
	//Emoti Bubble
	infoBubble.infoBubbleData = {
	data:'infoBubbleData',
	id: bubbleId,
	sources:false,
	sounds: {
	maximize:{src: auxl.maximize6, autoplay: true, loop: false, volume: 1,},
	minimize:{src: auxl.minimize6, autoplay: false, loop: false, volume: 1, on: 'spawnOut'},
	},
	text: false,
	geometry: {primitive: 'circle', radius: 0.3, segments: 32, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: infoBubble.color, opacity: 1, metalness: 0.2, roughness: 0.8, emissive: infoBubble.color, emissiveIntensity: 0.6, side: 'double'},
	position: infoBubble.position,
	rotation: infoBubble.rotation,
	scale: new THREE.Vector3(0.01,0.01,0.01),
	animations:{
	spawnin:{property: 'scale', from: '0.01 0.01 0.01', to: '1 1 1', dur: 1500, delay: 500, loop: false, dir: 'normal', easing: 'easeOutElastic', elasticity: 400, autoplay: true, enabled: true},
	spawnout:{property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 3000, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true},
	},
	mixins: false,
	classes: ['a-ent'],
	components: {
	['stare']:{id: 'playerRig'},
	},
	};
	infoBubble[bubbleId] = auxl.Core(infoBubble.infoBubbleData);
	//Emoti Text
	infoBubble.emotiTextData = {
	data:'emotiTextData',
	id: textId,
	sources:false,
	text: {value:'!', wrapCount: 2, color: "#FFFFFF", font: "exo2bold", zOffset: 0, side: 'double', align: "center", baseline: 'center'},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0.025,0.1,0.025),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	infoBubble[textId] = auxl.Core(infoBubble.emotiTextData);
	//Emoti Layer
	infoBubble.emotiLayerData = {
		parent: {core: infoBubble[bubbleId]},
		child0: {core: infoBubble[textId]},
	}
	infoBubble[infoBubble.id] = auxl.Layer(infoBubble.id, infoBubble.emotiLayerData);

	//Spawn Emote Bubble Layer
	const SpawnBubble = () => {
		if(infoBubble.inScene){}else{
			infoBubble[infoBubble.id].layer.all.parent.core.core.animations.spawnout = {property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 3000, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true,};

			infoBubble[infoBubble.id].SpawnLayer(infoBubble.parent);

			infoBubble.inScene = true;
			infoBubble.soundTimeout = setTimeout(() => {
				infoBubble[infoBubble.id].EmitEventParent('spawnOut');
				clearTimeout(infoBubble.soundTimeout);
			}, 3000);
			infoBubble.timeout = setTimeout(() => {
				DespawnBubble();
				clearTimeout(infoBubble.timeout);
			}, 4050);
		}
	}
	//Despawn Emote Bubble Layer
	const DespawnBubble = () => {
		if(infoBubble.inScene){
			infoBubble[infoBubble.id].DespawnLayer();
			infoBubble.inScene = false;
			auxl.RemoveFromTracker(infoBubble.id);
		}
	}
	//Spawn Alert Bubble Layer
	const SpawnAlert = () => {
		if(infoBubble.inScene){}else{
			infoBubble[infoBubble.id].layer.all.parent.core.core.animations.spawnout = {property: 'scale', from: '1 1 1', to: '0.01 0.01 0.01', dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutElastic', elasticity: 400, autoplay: true, enabled: true, startEvents: 'spawnOut'};

			infoBubble[infoBubble.id].SpawnLayer(infoBubble.parent);
			infoBubble.inScene = true;
			AddEvent('mouseenter',DespawnAlert);

		}
	}
	//Despawn Emote Bubble Layer
	const DespawnAlert = () => {
		if(infoBubble.inScene){
			RemoveEvent('mouseenter',DespawnAlert);
			infoBubble[infoBubble.id].EmitEventParent('spawnOut');
			infoBubble.timeout = setTimeout(() => {
				DespawnBubble();
				auxl.RemoveFromTracker(infoBubble.id);
				clearTimeout(infoBubble.timeout);
			}, 1050);
		}
	}
	//Update Emote Text Core
	const UpdateText = (text, rotation, offset) => {
		//Take in xOffset, yOffset
		infoBubble[textId].core.text.value = text;
		infoBubble[textId].core.text.wrapCount = text.length+2;
		if(offset){
			if(offset.x){
				infoBubble[textId].core.text.xOffset = offset.x;
			} else {
				infoBubble[textId].core.text.xOffset = 0;
			}
			if(offset.x){
				infoBubble[textId].core.text.yOffset = offset.y;
			} else {
				infoBubble[textId].core.text.yOffset = 0;
			}
		} else {
			infoBubble[textId].core.text.xOffset = 0;
			infoBubble[textId].core.text.zOffset = 0;
		}
		if(rotation){
			infoBubble[textId].core.rotation.z = rotation;
		} else {
			infoBubble[textId].core.rotation.z = 0;
		}
	}
	//Add Event Listener
	const AddEvent = (event, action) => {
		if(infoBubble.parentType === 'core'){
			infoBubble.parent.GetEl().addEventListener(event,action);
		} else {
			infoBubble.parent.GetParentEl().addEventListener(event,action);
		}
	}
	//Remove Event Listener
	const RemoveEvent = (event, action) => {
		if(infoBubble.parentType === 'core'){
			infoBubble.parent.GetEl().removeEventListener(event,action);
		} else {
			infoBubble.parent.GetParentEl().removeEventListener(event,action);
		}
	}
	//Add Custom Emote
	const NewBubble = (details) => {
		infoBubble.custom[details.eventName] = details;
		//details.emote or alert
		//details.textValue
		//details.offset:{x:0.1,y:0.1}
		//details.eventName
		//details.rotation
	}
	//Spawn a Custom Emote
	const CustomBubble = (event) => {
		for(let emote in infoBubble.custom){
			if(event.type === emote){
				if(infoBubble.custom[emote].rotation){
					UpdateText(infoBubble.custom[emote].text,infoBubble.custom[emote].rotation, infoBubble.custom[emote].offset);
				} else {
					UpdateText(infoBubble.custom[emote].text);
				}
				if(infoBubble.custom[emote].alert){
					SpawnAlert();
				} else {
					SpawnBubble();
				}
				break;
			}
		}
	}
	//
	//Emotes
	//
	//Emote !
	const Emote1 = () => {
		UpdateText('!');
		SpawnBubble();
	}
	//Alert !
	const Alert1 = () => {
		UpdateText('!');
		SpawnAlert();
	}
	//Emote ?
	const Emote2 = () => {
		UpdateText('?');
		SpawnBubble();
	}
	//Alert ?
	const Alert2 = () => {
		UpdateText('?');
		SpawnAlert();
	}
	//Emote :)
	const Emote3 = () => {
		UpdateText(':)', -90);
		SpawnBubble();
	}
	//Emote ^-^
	const Emote4 = () => {
		UpdateText('^-^');
		SpawnBubble();
	}
	//Emote Casual @
	const EmoteCasual = () => {
		UpdateText('@');
		SpawnBubble();
	}
	//Emote Happy ^^
	const EmoteHappy = () => {
		UpdateText('^^');
		SpawnBubble();
	}
	//Emote Sad "
	const EmoteSad = () => {
		UpdateText('"');
		SpawnBubble();
	}
	//Emote Angry *
	const EmoteAngry = () => {
		UpdateText('*');
		SpawnBubble();
	}
	//Emote Confused ?
	const EmoteConfused = () => {
		UpdateText('?');
		SpawnBubble();
	}
	//Emote Tired %
	const EmoteTired = () => {
		UpdateText('%');
		SpawnBubble();
	}
	//Emote Asleep zzz
	const EmoteAsleep = () => {
		UpdateText('zzz');
		SpawnBubble();
	}
	//Emote Annoyed +
	const EmoteAnnoyed = () => {
		UpdateText('+');
		SpawnBubble();
	}
	//Emote Smug +
	const EmoteSmug = () => {
		UpdateText('~');
		SpawnBubble();
	}
	//Emote Shocked !
	const EmoteShocked = () => {
		UpdateText('!');
		SpawnBubble();
	}
	//Emote Scared =
	const EmoteScared = () => {
		UpdateText('=');
		SpawnBubble();
	}
	//Emote Confident $
	const EmoteConfident = () => {
		UpdateText('$');
		SpawnBubble();
	}
	//Emote Love <3
	const EmoteLove = () => {
		UpdateText('<3\n', 90, {x:-0.1});
		SpawnBubble();
	}
	//Emote Shy #
	const EmoteShy = () => {
		UpdateText('#');
		SpawnBubble();
	}

	//Add all Emotes to Element
	const AddEmotes = () => {
		AddEvent('alert1', Alert1);
		AddEvent('alert2', Alert2);
		AddEvent('emote1', Emote1);
		AddEvent('emote2', Emote2);
		AddEvent('emote3', Emote3);
		AddEvent('emote4', Emote4);

		AddEvent('casual', EmoteCasual);
		AddEvent('happy', EmoteHappy);
		AddEvent('sad', EmoteSad);
		AddEvent('angry', EmoteAngry);
		AddEvent('confused', EmoteConfused);
		AddEvent('tired', EmoteTired);
		AddEvent('asleep', EmoteAsleep);
		AddEvent('annoyed', EmoteAnnoyed);
		AddEvent('smug', EmoteSmug);
		AddEvent('shocked', EmoteShocked);
		AddEvent('scared', EmoteScared);
		AddEvent('confident', EmoteConfident);
		AddEvent('love', EmoteLove);
		AddEvent('shy', EmoteShy);

		for(let each in infoBubble.custom){
			AddEvent(each, CustomBubble);
		}
	}
	//Remove all Emotes to Element
	const RemoveEmotes = () => {
		if(infoBubble.inScene){
			clearTimeout(infoBubble.soundTimeout);
			clearTimeout(infoBubble.timeout);
			DespawnBubble();
		}
		RemoveEvent('alert1', Alert1);
		RemoveEvent('alert2', Alert2);
		RemoveEvent('emote1', Emote1);
		RemoveEvent('emote2', Emote2);
		RemoveEvent('emote3', Emote3);
		RemoveEvent('emote4', Emote4);

		RemoveEvent('casual', EmoteCasual);
		RemoveEvent('happy', EmoteHappy);
		RemoveEvent('sad', EmoteSad);
		RemoveEvent('angry', EmoteAngry);
		RemoveEvent('confused', EmoteConfused);
		RemoveEvent('tired', EmoteTired);
		RemoveEvent('asleep', EmoteAsleep);
		RemoveEvent('annoyed', EmoteAnnoyed);
		RemoveEvent('smug', EmoteSmug);
		RemoveEvent('shocked', EmoteShocked);
		RemoveEvent('scared', EmoteScared);
		RemoveEvent('confident', EmoteConfident);
		RemoveEvent('love', EmoteLove);
		RemoveEvent('shy', EmoteShy);

		for(let each in infoBubble.custom){
			RemoveEvent(each, CustomBubble);
		}
	}
	//On init, add required component methods to parent
	const Init = () => {
		if(infoBubble.parentType === 'core'){
			if(Object.keys(infoBubble.parent.core.components).length === 0){
				infoBubble.parent.core.components = {};
			}
			infoBubble.parent.core.components['onspawnrun__emote'] = {
				cursorObj: infoBubble.id,
				component: null,
				method: 'AddEmotes',
				params: null,
			};
			infoBubble.parent.core.components['ondespawnrun__emote'] = {
				cursorObj: infoBubble.id,
				component: null,
				method: 'RemoveEmotes',
				params: null,
			};
		} else {
			if(Object.keys(infoBubble.parent.layer.all.parent.core.core.components).length === 0){
				infoBubble.parent.layer.all.parent.core.core.components = {};
			}
			infoBubble.parent.layer.all.parent.core.core.components['onspawnrun__emote'] = {
				cursorObj: infoBubble.id,
				component: null,
				method: 'AddEmotes',
				params: null,
			};
			infoBubble.parent.layer.all.parent.core.core.components['ondespawnrun__emote'] = {
				cursorObj: infoBubble.id,
				component: null,
				method: 'RemoveEmotes',
				params: null,
			};
		}
	}
	Init();

return {infoBubble, AddEmotes, RemoveEmotes, NewBubble};

}

//
//CreatureGen
//Generate a creature object
const Creature = (auxl, id, attach, customizations) => {

//No longer will this be an creature, but a creature generator
//Weave in the ghost body and allow for legs/arms to be added
//Keep the current round head and cylinder body, but more shape combos to come

//Have creature types like animal (normal eye,pupil,iris), robot (single eye with no pupil or iris, but text character maybe) or celestial (special eyes)

//Seed generator

//A 'crystal' like object that on click spawns the creature and on hide goes into it

//Sounds

//Name Generator

//Wing/s (bird/butterfly/moth) and or Tail

//Accesories like crown, hat, bow, stick w/ leaves, etc...

//Ghost body
//Various body radius sizes

//Cone horn

//Curves with torus like curved horns or arms

//Partial Cones for Ears

//For triangles, do a cylinder with 3 side so it can have depth
//Diamond Pupils

//Bottom eye lid

//Nose, Mouth and/or beak

//Belly shape/color

//Feet, floaties, ball, wheels, etc...

//Skin textures with randomized repeat sizes

//Pupil Text Character or just match the same shape

//Instead of Accent use, infoBubble?

//Emotion Animation
/*
Eye 1/2 : Wide/Normal/Squint/Tired/Blink/Closed
Eyebrow 1/2 : Low/Mid/High
Ear : Slow Pulse/Quick Rattle
Pupil Direction : Forward/Right/Up/Left/Down
Mouth : Normal/Smile/Sad/Gasp/Shocked/Speaking
-
Emotions/Animations :
Casual
Happy
Sad
Angry
Confused
Tired
Asleep
Annoyed
Smug
Shocked
Scared
Confident
Star Struck
Shy
*/




let creature = {};
creature.id = id;
creature.auxlId = id+'layer';
creature.bubbleId = id+'bubble';
creature.parent = attach || false;

creature.inScene = false;

//Object IDs
let parentId = 'parent' + creature.id;
let headId = 'head' + creature.id;
let eye1SocketId = 'eye1Socket' + creature.id;
let eyebrow1Id = 'eyebrow1' + creature.id;
let eye1PupilId = 'eye1Pupil' + creature.id;
let eye1PupilAccentId = 'eye1PupilAccent' + creature.id;
let eye1BlinkId = 'eye1Blink' + creature.id;
let eye1LidOffsetId = 'eye1LidOffset' + creature.id;
let eye1LidId = 'eye1Lid' + creature.id;
let eye2SocketId = 'eye2Socket' + creature.id;
let eyebrow2Id = 'eyebrow2' + creature.id;
let eye2PupilId = 'eye2Pupil' + creature.id;
let eye2PupilAccentId = 'eye2PupilAccent' + creature.id;
let eye2BlinkId = 'eye2Blink' + creature.id;
let eye2LidOffsetId = 'eye2LidOffset' + creature.id;
let eye2LidId = 'eye2Lid' + creature.id;
let ear1OffsetId = 'ear1Offset' + creature.id;
let ear1Id = 'ear1' + creature.id;
let ear2OffsetId = 'ear2Offset' + creature.id;
let ear2Id = 'ear2' + creature.id;

let bodyId = 'body' + creature.id;
let tailId = 'tail' + creature.id;
let leg1Id = 'leg1' + creature.id;
let leg2Id = 'leg2' + creature.id;
let leg3Id = 'leg3' + creature.id;
let leg4Id = 'leg4' + creature.id;

let acc1Id = 'acc1' + creature.id;

//Custommizations
creature.custom = customizations || false;
let eye = false;
let eyeTypes = ['egg', 'circle', 'square', 'rectangle', 'triangle'];
let pupil = false;
let pupilTypes = ['egg', 'circle', 'square', 'rectangle', 'triangle'];
let pupilAccent = false;
let pupilAccentTypes = ['*', '!', 'x', '&', '<3', 'z'];
let ear = false;
let earTypes = ['bun', 'bunny', 'mouse', 'ant', 'horn'];
//Choose Specifics
if(creature.custom){
	if(creature.custom.eye){
		eye = creature.custom.eye;
	}
	if(creature.custom.pupil){
		pupil = creature.custom.pupil;
	}
	if(creature.custom.accent){
		pupilAccent = creature.custom.accent;
	}
	if(creature.custom.ear){
		ear = creature.custom.ear;
	}
}
if(!eye){
	eye = eyeTypes[Math.floor(Math.random()*eyeTypes.length)];
}
if(!pupil){
	pupil = pupilTypes[Math.floor(Math.random()*pupilTypes.length)];
}
if(!pupilAccent){
	pupilAccent = pupilAccentTypes[Math.floor(Math.random()*pupilAccentTypes.length)];
}
if(!ear){
	ear = earTypes[Math.floor(Math.random()*earTypes.length)];
}


//Position
//Rotation
//Scale
creature.position = new THREE.Vector3(0,3,-3);
creature.rotation = new THREE.Vector3(0,0,0);
creature.scale = new THREE.Vector3(1,1,1);
if(creature.custom){
	//Position
	if(customizations.offset){
		if(customizations.offset.x){
			creature.position.x = customizations.offset.x;
			creature.position.y = customizations.offset.y;
			creature.position.z = customizations.offset.z;
		} else {
			creature.position.z = customizations.offset;
		}
	}
	//Rotation
	if(customizations.rotation){
		if(customizations.rotation.x){
			creature.rotation.x = customizations.rotation.x;
			creature.rotation.y = customizations.rotation.y;
			creature.rotation.z = customizations.rotation.z;
		} else {
			creature.rotation.y = customizations.rotation;
		}
	}
	//Scale
	if(customizations.scale){
		if(customizations.scale.x){
			creature.scale.x = customizations.scale.x;
			creature.scale.y = customizations.scale.y;
			creature.scale.z = customizations.scale.z;
		} else {
			creature.scale.y = customizations.scale;
		}
	}
}
//Random All Below
creature.color = auxl.colorTheoryGen(false, true);
//Pupil Material
creature.pupilColor = creature.color.base;
creature.pupilMaterial = {shader: "standard", color: creature.pupilColor, emissive: creature.pupilColor, emissiveIntensity: 0.5, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8};
//Skin Material
creature.skinColor0 = creature.color.splitCompl[1];
creature.skinMaterial = {shader: "standard", color: creature.skinColor0, emissive: creature.skinColor0, emissiveIntensity: 0.5, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8};
//Brow Material
creature.skinColor1 = auxl.colorTheoryGen(creature.skinColor0).base;
creature.browMaterial = {shader: "standard", color: creature.skinColor1, emissive: creature.skinColor1, emissiveIntensity: 0.5, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8};
//Accent
//creature.accentColor = creature.color.compl;
creature.accentColor = 'white';
creature.accentText = {value:pupilAccent, wrapCount: 3, color: creature.accentColor, font: "exo2bold", side: 'double', align: "center", baseline: 'center', zOffset: 0.0175,};

//
//Eyebrow Thickness
let browSizeMod = Math.random();
if(creature.custom){
	if(customizations.browSize === 'small'){
		browSizeMod = 0;
	} else if(customizations.browSize === 'medium'){
		browSizeMod = 0.5;
	} else if(customizations.browSize === 'large'){
		browSizeMod = 1;
	}
}
creature.browThickness = (browSizeMod*0.04)+0.01;
//
//Eye
//eyeSize
let eyeSizeMod = Math.random();
if(creature.custom){
	if(customizations.eyeSize === 'small'){
		eyeSizeMod = 0;
	} else if(customizations.eyeSize === 'medium'){
		eyeSizeMod = 0.5;
	} else if(customizations.eyeSize === 'large'){
		eyeSizeMod = 1;
	}
}
//Eye Shape
//
//Egg
let eggSize = (eyeSizeMod*0.08)+0.125;
//Shape
let eggSocketShape = {primitive: 'cylinder', radius: eggSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360};
let eggSocketScale = new THREE.Vector3(0.75,1,1);
//Lid
let eggLidShape = {primitive: 'cylinder', radius: eggSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let eggLidPosition = new THREE.Vector3(0,0,eggSize);
let eggLidOffsetPosition = new THREE.Vector3(0,0,eggSize*-1);
//Blink
let eggBlinkShape = {primitive: 'cylinder', radius: eggSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
//Anims
//Eye 1/2 : Wide/Normal/Squint/Tired/Blink/Closed
//Flux
let eggBlinkAnim = {property: 'object3D.scale.z', from: 0.65, to: 1.3, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'flux', pauseEvents: 'stopFlux'};
//Wide
let eggWideAnim = {property: 'object3D.scale.z', to: 0.5, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'wide'};
//Normal
let eggNormalAnim = {property: 'object3D.scale.z', to: 0.65, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'normal'};
//Squint
let eggSquintAnim = {property: 'object3D.scale.z', to: 1.3, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'squint'};
//Tired
let eggTiredAnim = {property: 'object3D.scale.z', to: 1.1, dur: 1000, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'tired'};

//Pupil
let eggPupilShape = {primitive: 'cylinder', radius: eggSize/3, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
//
//Circle
let circleSize = (eyeSizeMod*0.0575)+0.1;
//Shape
let circleSocketShape = {primitive: 'cylinder', radius: circleSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
let circleSocketScale = new THREE.Vector3(1,1,1);
//Lid
let circleLidShape = {primitive: 'cylinder', radius: circleSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let circleLidPosition = new THREE.Vector3(0,0,circleSize);
let circleLidOffsetPosition = new THREE.Vector3(0,0,circleSize*-1);
//Blink
let circleBlinkShape = {primitive: 'cylinder', radius: circleSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
//Anims
let circleBlinkAnim = {property: 'object3D.scale.z', from: 0.65, to: 1.3, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true};
//Pupil
let circlePupilShape = {primitive: 'cylinder', radius: circleSize/3, height: 0.025, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
//
//Square
let squareSize = (eyeSizeMod*0.125)+0.175;
//Shape
let squareSocketShape = {primitive: 'box', depth: squareSize, width: squareSize, height: 0.015};
let squareSocketScale = new THREE.Vector3(1,1,1);
//Lid
let squareLidShape = {primitive: 'box', depth: squareSize, width: squareSize, height: 0.015};
let squareLidPosition = new THREE.Vector3(0,0,squareSize);
let squareLidOffsetPosition = new THREE.Vector3(0,0,squareSize*-1);
//Blink
let squareBlinkShape = {primitive: 'box', depth: squareSize, width: squareSize, height: 0.015};
let squareBlinkAnim = {property: 'object3D.scale.z', from: 0.45, to: 0.8, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true};
//Pupil
let squarePupilShape = {primitive: 'box', depth: squareSize/3, width: squareSize/3, height: 0.015};
//
//Rectangle
let rectSize1 = (eyeSizeMod*0.25)+0.225;
let rectSize2 = rectSize1*0.66;
//Shape
let rectSocketShape = {primitive: 'box', depth: rectSize1, width: rectSize2, height: 0.015};
let rectSocketScale = new THREE.Vector3(1,1,1);
//Lid
let rectLidShape = {primitive: 'box', depth: rectSize1, width: rectSize2, height: 0.015};
let rectLidPosition = new THREE.Vector3(0,0,rectSize2);
let rectLidOffsetPosition = new THREE.Vector3(0,0,rectSize2*-1);
//Blink
let rectBlinkShape = {primitive: 'box', depth: rectSize1, width: rectSize2, height: 0.015};
//Anims
let rectBlinkAnim = {property: 'object3D.scale.z', from: 0.35, to: 0.75, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true};
//Pupil
let rectPupilShape = {primitive: 'box', depth: rectSize1/3, width: rectSize2/3, height: 0.015};
//
//Triangle
let triSize = (eyeSizeMod*0.15)+0.1;
//Shape
let triSocketShape = {primitive: 'triangle', vertexA: new THREE.Vector3(0,0,triSize), vertexB: new THREE.Vector3(triSize*-1,0,triSize*-1), vertexC: new THREE.Vector3(triSize,0,triSize*-1)};
let triSocketScale = new THREE.Vector3(1,1.5,1);
//Lid
let triLidShape = {primitive: 'triangle', vertexA: new THREE.Vector3(0,0,triSize), vertexB: new THREE.Vector3(triSize*-1,0,triSize*-1), vertexC: new THREE.Vector3(triSize,0,triSize*-1)};
let triLidPosition = new THREE.Vector3(0,0.05,triSize);
let triLidOffsetPosition = new THREE.Vector3(0,0,triSize*-1);
//Blink
let triBlinkShape = {primitive: 'triangle', vertexA: new THREE.Vector3(0,0,triSize), vertexB: new THREE.Vector3(triSize*-1,0,triSize*-1), vertexC: new THREE.Vector3(triSize,0,triSize*-1)};
//Anims
let triBlinkAnim = {property: 'object3D.scale.z', from: 0.325, to: 0.6, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true};
//Pupil
let triPupilShape = {primitive: 'triangle', vertexA: new THREE.Vector3(0,0,triSize*0.33), vertexB: new THREE.Vector3(triSize*-0.33,0,triSize*-0.33), vertexC: new THREE.Vector3(triSize*0.33,0,triSize*-0.33)};

//Pupil Accent
let accentSize = (eyeSizeMod*0.05)+0.075;

//Eye & Pupil Shape : Egg, Circle, Square, Rectangle, Triangle
if(pupil === 'egg'){
	creature.pupilShape = eggPupilShape;
} else if(pupil === 'circle'){
	creature.pupilShape = circlePupilShape;
} else if(pupil === 'square'){
	creature.pupilShape = squarePupilShape;
} else if(pupil === 'rectangle'){
	creature.pupilShape = rectPupilShape;
} else if(pupil === 'triangle'){
	creature.pupilShape = triPupilShape;
}
if(eye === 'egg'){
	creature.socketShape = eggSocketShape;
	creature.socketScale = eggSocketScale;
	creature.lidShape = eggLidShape;
	creature.lidPosition = eggLidPosition;
	creature.lidOffsetPosition = eggLidOffsetPosition;
	creature.blinkShape = eggBlinkShape;
	creature.blinkAnim = eggBlinkAnim;

	creature.wideAnim = eggWideAnim;
	creature.normalAnim = eggNormalAnim;
	creature.squintAnim = eggSquintAnim;
	creature.tiredAnim = eggTiredAnim;

} else if(eye === 'circle'){
	creature.socketShape = circleSocketShape;
	creature.socketScale = circleSocketScale;
	creature.lidShape = circleLidShape;
	creature.lidPosition = circleLidPosition;
	creature.lidOffsetPosition = circleLidOffsetPosition;
	creature.blinkShape = circleBlinkShape;
	creature.blinkAnim = circleBlinkAnim;
} else if(eye === 'square'){
	creature.socketShape = squareSocketShape;
	creature.socketScale = squareSocketScale;
	creature.lidShape = squareLidShape;
	creature.lidPosition = squareLidPosition;
	creature.lidOffsetPosition = squareLidOffsetPosition;
	creature.blinkShape = squareBlinkShape;
	creature.blinkAnim = squareBlinkAnim;
} else if(eye === 'rectangle'){
	creature.socketShape = rectSocketShape;
	creature.socketScale = rectSocketScale;
	creature.lidShape = rectLidShape;
	creature.lidPosition = rectLidPosition;
	creature.lidOffsetPosition = rectLidOffsetPosition;
	creature.blinkShape = rectBlinkShape;
	creature.blinkAnim = rectBlinkAnim;
} else if(eye === 'triangle'){
	creature.socketShape = triSocketShape;
	creature.socketScale = triSocketScale;
	creature.lidShape = triLidShape;
	creature.lidPosition = triLidPosition;
	creature.lidOffsetPosition = triLidOffsetPosition;
	creature.blinkShape = triBlinkShape;
	creature.blinkAnim = triBlinkAnim;
}
//
//Ear
let earSizeMod = Math.random();
if(creature.custom){
	if(customizations.earSize === 'small'){
		earSizeMod = 0;
	} else if(customizations.earSize === 'medium'){
		earSizeMod = 0.5;
	} else if(customizations.earSize === 'large'){
		earSizeMod = 1;
	}
}
//Bun
let bunSize = (earSizeMod*0.15)+0.1;
let bunEar1OffsetPos = new THREE.Vector3(-0.25,0.5,0.4);
let bunEar2OffsetPos = new THREE.Vector3(0.25,0.5,0.4);
let bunEarOffsetScale = new THREE.Vector3(0.9,1,0.9);
let bunEarShape = {primitive: 'cylinder', radius: bunSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let bunEarPos = new THREE.Vector3(0,0,0.175);
let bunEarScale = new THREE.Vector3(1,1,1);

//Bunny
let bunnySize = (earSizeMod*0.1)+0.15;
let bunnyEar1OffsetPos = new THREE.Vector3(-0.25,0.5,0.4);
let bunnyEar2OffsetPos = new THREE.Vector3(0.25,0.5,0.4);
let bunnyEarOffsetScale = new THREE.Vector3(0.5,1,0.5);
let bunnyEarShape = {primitive: 'cylinder', radius: bunnySize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let bunnyEarPos = new THREE.Vector3(0,0,0.175);
let bunnyEarScale = new THREE.Vector3(1,1,5);

//Antennae
let antSize = (earSizeMod*0.175)+0.075;
let antEar1OffsetPos = new THREE.Vector3(-0.125,0.51,0.4);
let antEar2OffsetPos = new THREE.Vector3(0.125,0.51,0.4);
let antEarOffsetScale = new THREE.Vector3(0.5,1,0.5);
let antEarShape = {primitive: 'cylinder', radius: antSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let antEarPos = new THREE.Vector3(0,0,0.175);
let antEarScale = new THREE.Vector3(0.35,0.35,6);

//Horns
let hornSize = (earSizeMod*0.2)+0.125;
let hornEar1OffsetPos = new THREE.Vector3(-0.25,0.5,0.4);
let hornEar2OffsetPos = new THREE.Vector3(0.25,0.5,0.4);
let hornEarOffsetScale = new THREE.Vector3(0.5,1,0.5);
let hornEarShape = {primitive: 'cylinder', radius: hornSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 90, thetaLength: 180};
let hornEarPos = new THREE.Vector3(0,0,0.175);
let hornEarScale = new THREE.Vector3(0.4,0.4,2);

//Mouse
let mouseSize = (earSizeMod*0.15)+0.1;
let mouseEar1OffsetPos = new THREE.Vector3(-0.325,0.625,0.4);
let mouseEar2OffsetPos = new THREE.Vector3(0.325,0.625,0.4);
let mouseEarOffsetScale = new THREE.Vector3(1,1,1);
let mouseEarShape = {primitive: 'cylinder', radius: mouseSize, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 16, thetaStart: 0, thetaLength: 360};
let mouseEarPos = new THREE.Vector3(0,0,0.175);
let mouseEarScale = new THREE.Vector3(1,1,1);

//Ear Type : Bun, Bunny, Antennae, Horns, Mouse
if(ear === 'bun'){
	creature.ear1OffsetPos = bunEar1OffsetPos;
	creature.ear2OffsetPos = bunEar2OffsetPos;
	creature.earOffsetScale = bunEarOffsetScale;
	creature.earShape = bunEarShape;
	creature.earPos = bunEarPos;
	creature.earScale = bunEarScale;
} else if(ear === 'bunny'){
	creature.ear1OffsetPos = bunnyEar1OffsetPos;
	creature.ear2OffsetPos = bunnyEar2OffsetPos;
	creature.earOffsetScale = bunnyEarOffsetScale;
	creature.earShape = bunnyEarShape;
	creature.earPos = bunnyEarPos;
	creature.earScale = bunnyEarScale;
} else if(ear === 'mouse'){
	creature.ear1OffsetPos = mouseEar1OffsetPos;
	creature.ear2OffsetPos = mouseEar2OffsetPos;
	creature.earOffsetScale = mouseEarOffsetScale;
	creature.earShape = mouseEarShape;
	creature.earPos = mouseEarPos;
	creature.earScale = mouseEarScale;
} else if(ear === 'ant'){
	creature.ear1OffsetPos = antEar1OffsetPos;
	creature.ear2OffsetPos = antEar2OffsetPos;
	creature.earOffsetScale = antEarOffsetScale;
	creature.earShape = antEarShape;
	creature.earPos = antEarPos;
	creature.earScale = antEarScale;
} else if(ear === 'horn'){
	creature.ear1OffsetPos = hornEar1OffsetPos;
	creature.ear2OffsetPos = hornEar2OffsetPos;
	creature.earOffsetScale = hornEarOffsetScale;
	creature.earShape = hornEarShape;
	creature.earPos = hornEarPos;
	creature.earScale = hornEarScale;
}

//
//Build

//Parent
creature.faceParentData = {
data:'faceParentData',
id: parentId,
sources: false,
text: false,
geometry: false,
material: false,
position: creature.position,
rotation: creature.rotation,
scale: creature.scale,
animations: false,
mixins: false,
classes: ['a-ent'],
components: {
['stare']:{id: 'playerRig'},
},
};
creature[parentId] = auxl.Core(creature.faceParentData);

//Head
creature.headData = {
data:'headData',
id:headId,
sources: false,
text: false,
geometry: {primitive: 'sphere', radius: 0.4, phiStart: 0, phiLength: 180, segmentsWidth: 16, segmentsHeight: 16, thetaStart: 0, thetaLength: 180},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0.15,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
creature[headId] = auxl.Core(creature.headData);

//
//Face

//EyeSocket
creature.faceEye1SocketData = {
data:'faceEye1SocketData',
id: eye1SocketId,
sources: false,
text: false,
geometry: creature.socketShape,
material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.15,0.1,0.4),
rotation: new THREE.Vector3(90,0,0),
scale: creature.socketScale,
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[eye1SocketId] = auxl.Core(creature.faceEye1SocketData);
//Eye2Socket
creature.faceEye2SocketData = auxl.coreDataFromTemplate(creature.faceEye1SocketData, {id: eye2SocketId, position: new THREE.Vector3(0.15,0.1,0.4)}, true);
creature[eye2SocketId] = auxl.Core(creature.faceEye2SocketData);
//Eye1Pupil
creature.faceEye1PupilData = {
data:'faceEye1PupilData',
id: eye1PupilId,
sources: false,
text: false,
geometry: creature.pupilShape,
material: creature.pupilMaterial,
position: new THREE.Vector3(0,0.01,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
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
creature[eye1PupilId] = auxl.Core(creature.faceEye1PupilData);
//Eye2Pupil
creature.faceEye2PupilData = auxl.coreDataFromTemplate(creature.faceEye1PupilData, {id: eye2PupilId,}, true);
creature[eye2PupilId] = auxl.Core(creature.faceEye2PupilData);
//Eye1PupilAccent
creature.faceEye1PupilAccentData = {
data:'faceEye1PupilAccentData',
id: eye1PupilAccentId,
sources: false,
//text: creature.accentText,
text: false,
geometry: false,
material: false,
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(-90,0,0),
scale: new THREE.Vector3(accentSize,accentSize,accentSize),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[eye1PupilAccentId] = auxl.Core(creature.faceEye1PupilAccentData);
//Eye2Pupil
creature.faceEye2PupilAccentData = auxl.coreDataFromTemplate(creature.faceEye1PupilAccentData, {id: eye2PupilAccentId,}, true);
creature[eye2PupilAccentId] = auxl.Core(creature.faceEye2PupilAccentData);

//Eyebrow
creature.faceEyebrow1Data = {
data:'faceEyebrow1Data',
id: eyebrow1Id,
sources: false,
text: false,
geometry: {primitive: 'box', depth: creature.browThickness, width: 0.25, height: 0.025, },
material: creature.browMaterial,
position: new THREE.Vector3(0,0,-0.25),
rotation: new THREE.Vector3(0,10,0),
scale: new THREE.Vector3(1,1,1),
animations: {
updown: {property: 'object3D.position.z', from: -0.3, to: -0.225, dur: 2000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[eyebrow1Id] = auxl.Core(creature.faceEyebrow1Data);
creature.faceEyebrow2Data = auxl.coreDataFromTemplate(creature.faceEyebrow1Data, {id: eyebrow2Id, rotation: new THREE.Vector3(0,-10,0)}, true);
creature[eyebrow2Id] = auxl.Core(creature.faceEyebrow2Data);

//Eyelid Offset
creature.faceEye1LidOffsetData = {
data:'faceEye1LidOffsetData',
id: eye1LidOffsetId,
sources: false,
text: false,
geometry: false,
material: false,
position: creature.lidOffsetPosition,
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: {
flux: creature.blinkAnim,
wide: creature.wideAnim,
normal: creature.normalAnim,
squint: creature.squintAnim,
tired: creature.tiredAnim,
},
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[eye1LidOffsetId] = auxl.Core(creature.faceEye1LidOffsetData);
creature.faceEye2LidOffsetData = auxl.coreDataFromTemplate(creature.faceEye1LidOffsetData, {id: eye2LidOffsetId}, true);
creature[eye2LidOffsetId] = auxl.Core(creature.faceEye2LidOffsetData);
//Eyelid
creature.faceEye1LidData = {
data:'faceEye1LidData',
id: eye1LidId,
sources: false,
text: false,
geometry: creature.lidShape,
material: creature.skinMaterial,
position: creature.lidPosition,
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.06,4,1.06),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[eye1LidId] = auxl.Core(creature.faceEye1LidData);
creature.faceEye2LidData = auxl.coreDataFromTemplate(creature.faceEye1LidData, {id: eye2LidId}, true);
creature[eye2LidId] = auxl.Core(creature.faceEye2LidData);
//Blink
creature.faceEye1BlinkData = {
data:'faceEye1BlinkData',
id: eye1BlinkId,
sources: false,
text: false,
geometry: creature.blinkShape,
material: creature.skinMaterial,
position: new THREE.Vector3(0,0.05,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1.05,1.05,1.05),
animations: {
blinkin: {property: 'visible', from: false, to: true, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
blinkout: {property: 'visible', from: true, to: false, dur: 1, delay: 250, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'blink'},
close: {property: 'visible', from: false, to: true, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'close'},
open: {property: 'visible', from: true, to: false, dur: 1, delay: 0, loop: false, dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'open'},
},
mixins: false,
classes: ['a-ent'],
components: {
visible: false,
},
};
creature[eye1BlinkId] = auxl.Core(creature.faceEye1BlinkData);
creature.faceEye2BlinkData = auxl.coreDataFromTemplate(creature.faceEye1BlinkData, {id: eye2BlinkId}, true);
creature[eye2BlinkId] = auxl.Core(creature.faceEye2BlinkData);

//Ear Offset
creature.faceEar1OffsetData = {
data:'faceEar1OffsetData',
id: ear1OffsetId,
sources: false,
text: false,
geometry: false,
material: false,
position: creature.ear1OffsetPos,
rotation: new THREE.Vector3(90,0,0),
scale: creature.earOffsetScale,
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[ear1OffsetId] = auxl.Core(creature.faceEar1OffsetData);
creature.faceEar2OffsetData = auxl.coreDataFromTemplate(creature.faceEar1OffsetData, {id: ear2OffsetId, position: creature.ear2OffsetPos}, true);
creature[ear2OffsetId] = auxl.Core(creature.faceEar2OffsetData);
//Ear
creature.faceEar1Data = {
data:'faceEar1Data',
id: ear1Id,
sources: false,
text: false,
geometry: creature.earShape,
material: creature.skinMaterial,
position: creature.earPos,
rotation: new THREE.Vector3(0,30,0),
scale: creature.earScale,
animations: {
twitch: {property: 'object3D.rotation.y', from: 25, to: 35, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},
},
mixins: false,
classes: ['a-ent'],
components: false,
};
creature[ear1Id] = auxl.Core(creature.faceEar1Data);
creature.faceEar2Data = auxl.coreDataFromTemplate(creature.faceEar1Data, {id: ear2Id, rotation: new THREE.Vector3(0,-30,0), animations:{twitch: {property: 'object3D.rotation.y', from: -25, to: -35, dur: 3000, delay: 0, loop: true, dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true},}}, true);
creature[ear2Id] = auxl.Core(creature.faceEar2Data);


//Body
creature.bodyData = {
data:'bodyData',
id: bodyId,
sources: false,
text: false,
geometry: {primitive: 'cylinder', radius: 0.4, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 32, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(0,0,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['clickable','a-ent'],
components: false,
};
creature[bodyId] = auxl.Core(creature.bodyData);
//Legs
creature.legData = {
data:'legData',
id:'leg',
sources: false,
text: false,
geometry: {primitive: 'cone', radiusBottom: 0, radiusTop: 0.15, height: 0.2, openEnded: false, segmentsHeight: 4, segmentsRadial: 8, thetaStart: 0, thetaLength: 360},
material: {shader: "standard", color: "#C14B76", emissive: '#C14B76', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
position: new THREE.Vector3(-0.25,-0.25,0),
rotation: new THREE.Vector3(0,0,0),
scale: new THREE.Vector3(1,1,1),
animations: false,
mixins: false,
classes: ['a-ent'],
components: false,
};
//Leg 1
creature.leg1Data = auxl.coreDataFromTemplate(creature.legData, {id: leg1Id,}, true);
creature[leg1Id] = auxl.Core(creature.leg1Data);
//Leg 2
creature.leg2Data = auxl.coreDataFromTemplate(creature.legData, {id: leg2Id, position: new THREE.Vector3(0.25,-0.25,0)}, true);
creature[leg2Id] = auxl.Core(creature.leg2Data);
//Leg 3
creature.leg3Data = auxl.coreDataFromTemplate(creature.legData, {id: leg3Id, position: new THREE.Vector3(0,-0.25,-0.25)}, true);
creature[leg3Id] = auxl.Core(creature.leg3Data);
//Leg 4
creature.leg4Data = auxl.coreDataFromTemplate(creature.legData, {id: leg4Id, position: new THREE.Vector3(0,-0.25,0.25)}, true);
creature[leg4Id] = auxl.Core(creature.leg4Data);

//Layer
creature.faceLayerData = {
	parent: {core: creature[parentId]},
	child0: {
		parent: {core: creature[headId]},
		child0: {
			parent: {core: creature[eye1SocketId]}, 
			child0: {core: creature[eyebrow1Id]}, 
			child1: {
				parent: {core: creature[eye1PupilId]},
				child0: {core: creature[eye1PupilAccentId]},
			},
			child2: {core: creature[eye1BlinkId]}, 
			child3: {
				parent: {core: creature[eye1LidOffsetId]}, 
				child0: {core: creature[eye1LidId]}, 
			}, 
		},
		child1: {
			parent: {core: creature[eye2SocketId]}, 
			child0: {core: creature[eyebrow2Id]}, 
			child1: {
				parent: {core: creature[eye2PupilId]},
				child0: {core: creature[eye2PupilAccentId]},
			},
			child2: {core: creature[eye2BlinkId]}, 
			child3: {
				parent: {core: creature[eye2LidOffsetId]}, 
				child0: {core: creature[eye2LidId]}, 
			}, 
		},
		child2: {
			parent: {core: creature[ear1OffsetId]}, 
			child0: {core: creature[ear1Id]}, 
		},
		child3: {
			parent: {core: creature[ear2OffsetId]}, 
			child0: {core: creature[ear2Id]}, 
		},
	},
	child1: {
		parent: {core: creature[bodyId]}, 
		child0: {core: creature[leg1Id]}, 
		child1: {core: creature[leg2Id]}, 
		child2: {core: creature[leg3Id]}, 
		child3: {core: creature[leg4Id]},
	}, 


}
auxl[creature.auxlId] = auxl.Layer(creature.auxlId,creature.faceLayerData);

//Info Bubble
auxl[creature.bubbleId] = auxl.InfoBubble(creature.bubbleId, auxl[creature.auxlId], 0.75, creature.color.base);

//Spawn creature
const SpawnCreature = () => {
	if(creature.inScene){}else{
		auxl[creature.auxlId].SpawnLayer(creature.parent);
		Blinking();
		//testing();
		creature.inScene = true;
	}
}
//Despawn creature
const DespawnCreature = () => {
	if(creature.inScene){
		ClearEvents();
		auxl[creature.auxlId].DespawnLayer();
		creature.inScene = false;
	}
}

//Clear Timeouts & Intervals
const ClearEvents = () => {
	clearInterval(creature.blinkInterval);
	clearTimeout(creature.accentTimeout);
	clearTimeout(creature.emoteTimeout);
	clearInterval(creature.intervalTest);
	clearTimeout(creature.timeoutTest);
}

//Emote Testing
function testing(){
creature.timeoutTest = setTimeout(function () {
	let loopNum = 0;
	creature.intervalTest = setInterval(function() {
		if(loopNum === 0){
			Emote('love');
		} else if(loopNum === 1){
			Emote('shy');
		} else if(loopNum === 2){
			Emote('casual');
		} else if(loopNum === 3){
			Emote('confused');
		} else if(loopNum === 4){
			Emote('angry');
		} else if(loopNum === 5){
			Emote('shocked');
		} else if(loopNum === 6){
			Emote('tired');
		} else if(loopNum === 7){
			Emote('asleep');
		} else if(loopNum === 8){
			Emote('wakeUp');
		} else if(loopNum === 9){
			Emote('annoyed');
		} else if(loopNum === 10){
			Emote('scared');
		} else if(loopNum === 11){
			Emote('confident');
		} else if(loopNum === 12){
			Emote('sad');
		} else if(loopNum === 13){
			Emote('smug');
		} else if(loopNum === 14){
			Emote('happy');
			loopNum = -1;
		}
		loopNum++;
	}, 6000);
}, 2000);
}

//Blinking
const Blinking = () => {
	let blinkChance = 0.25;
	creature.blinkInterval = setInterval(() => {
		if(Math.random() >= blinkChance){
			creature[eye1BlinkId].EmitEvent('blink');
			creature[eye2BlinkId].EmitEvent('blink');
			blinkChance = 0.25;
		} else {
			blinkChance += 0.25;
		}
	}, 3000);
}

//Implement a Finite State Machine for Emotions

//Emote State
const Emote = (emote) => {
console.log(emote)
	//Anim
	if(emote === 'casual'){
		Casual();
	} else if(emote === 'happy'){
		Happy();
	} else if(emote === 'sad'){
		Sad();
	} else if(emote === 'angry'){
		Angry();
	} else if(emote === 'confused'){
		Confused();
	} else if(emote === 'tired'){
		Tired();
	} else if(emote === 'asleep'){
		Asleep();
	} else if(emote === 'wakeUp'){
		WakeUp();
	} else if(emote === 'annoyed'){
		Annoyed();
	} else if(emote === 'smug'){
		Smug();
	} else if(emote === 'shocked'){
		Shocked();
	} else if(emote === 'scared'){
		Scared();
	} else if(emote === 'confident'){
		Confident();
	} else if(emote === 'love'){
		Love();
	} else if(emote === 'shy'){
		Shy();
	}
}

//Casual
const Casual = () => {
	creature[eye1LidOffsetId].EmitEvent('normal');
	creature[eye2LidOffsetId].EmitEvent('normal');
	auxl[creature.auxlId].EmitEventParent('casual');
}

//Happy
const Happy = () => {
	creature[eye1LidOffsetId].EmitEvent('wide');
	creature[eye2LidOffsetId].EmitEvent('wide');
	auxl[creature.auxlId].EmitEventParent('happy');
}

//Sad
const Sad = () => {
	creature[eye1LidOffsetId].EmitEvent('squint');
	creature[eye2LidOffsetId].EmitEvent('squint');
	auxl[creature.auxlId].EmitEventParent('sad');
}

//Angry
const Angry = () => {
	creature[eye1LidOffsetId].EmitEvent('squint');
	creature[eye2LidOffsetId].EmitEvent('squint');
	auxl[creature.auxlId].EmitEventParent('angry');
}

//Confused
const Confused = () => {
	creature[eye1LidOffsetId].EmitEvent('wide');
	creature[eye2LidOffsetId].EmitEvent('squint');
	auxl[creature.auxlId].EmitEventParent('confused');
}

//Tired
const Tired = () => {
	creature[eye1LidOffsetId].EmitEvent('tired');
	creature[eye2LidOffsetId].EmitEvent('tired');
	auxl[creature.auxlId].EmitEventParent('tired');
}

//Asleep
const Asleep = () => {
	creature[eye1BlinkId].EmitEvent('close');
	creature[eye2BlinkId].EmitEvent('close');
	auxl[creature.auxlId].EmitEventParent('asleep');
}

//Wake Up
const WakeUp = () => {
	creature[eye1BlinkId].EmitEvent('open');
	creature[eye2BlinkId].EmitEvent('open');
	auxl[creature.auxlId].EmitEventParent('shocked');
}

//Annoyed
const Annoyed = () => {
	creature[eye1LidOffsetId].EmitEvent('normal');
	creature[eye2LidOffsetId].EmitEvent('normal');
	auxl[creature.auxlId].EmitEventParent('annoyed');
}

//Smug
const Smug = () => {
	creature[eye1LidOffsetId].EmitEvent('squint');
	creature[eye2LidOffsetId].EmitEvent('squint');
	auxl[creature.auxlId].EmitEventParent('smug');
}

//Shocked
const Shocked = () => {
	creature[eye1LidOffsetId].EmitEvent('wide');
	creature[eye2LidOffsetId].EmitEvent('wide');
	auxl[creature.auxlId].EmitEventParent('shocked');
}

//Scared
const Scared = () => {
	creature[eye1LidOffsetId].EmitEvent('wide');
	creature[eye2LidOffsetId].EmitEvent('wide');
	auxl[creature.auxlId].EmitEventParent('scared');
}

//Confident
const Confident = () => {
	creature[eye1LidOffsetId].EmitEvent('normal');
	creature[eye2LidOffsetId].EmitEvent('normal');
	auxl[creature.auxlId].EmitEventParent('confident');
}

//Love
const Love = () => {
	creature[eye1LidOffsetId].EmitEvent('wide');
	creature[eye2LidOffsetId].EmitEvent('wide');
	auxl[creature.auxlId].EmitEventParent('love');
}

//Shy
const Shy = () => {
	creature[eye1LidOffsetId].EmitEvent('squint');
	creature[eye2LidOffsetId].EmitEvent('squint');
	auxl[creature.auxlId].EmitEventParent('shy');
}

return {creature, SpawnCreature, DespawnCreature, Emote};

}

//
//Export
export {Book, SpeechSystem, NPC, InfoBubble, Creature};