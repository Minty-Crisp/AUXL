//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Menu
//
//Menu
//MultiMenu
//HoverMenu
//ComboLock
//ScrollMenu

//
//Menu
//Single Menu | Vertical/Horizontal
const Menu = (auxl, menuData) => {
	let menu = {};
	menu.inScene = false;
	menu.data = Object.assign({}, menuData.data);
	menu.id = menuData.id || 'menu';
	menu.prompt = menuData.prompt;
	menu.options = menuData.options;
	menu.actions = menuData.actions;
	menu.layers = {};
	menu.layer = {};
	let prompt = {};
	let menuOption = {};
	let menuOptions = [];
	let menuNum = 0;
	let menuLength = Object.keys(menu.options).length;
	//Reset component data
	menu.clickrun = {};
	menu.clickrun.cursorObj = menuData.cursorObj || false;
	menu.clickrun.method = menuData.method || 'Click';
	menu.clickrun.params = menuData.params || 'target';
	//Menu Style
	menu.layout = menuData.layout;
	//Default Start Position
	menu.data.position = new THREE.Vector3(0,0,0);
	menu.data.position.x = menuData.pos.x;
	menu.data.position.y = menuData.pos.y;
	menu.data.position.z = menuData.pos.z;

	//Generate & Spawn Menu
	const SpawnMenu = () => {
		if(menu.inScene){}else{
			menuNum=0;
			menuOptions = [];
			menuOption = {};
			//Layer Parent Prompt
			//menu.data.id = menu.id + 'prompt';
			menu.data.id = menu.id;
			menu.data.text.value = menu.prompt;
			menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
			prompt = auxl.Core(menu.data);
			menu.layers = {
			parent: {core: prompt},}
			menu.data.position.x = menu.data.geometry.width * 1.15;
			menu.data.position.z = 0;
			if(menuLength === 1 || menu.layout === 'horizontal'){
				menu.data.position.y = 0;
			} else {
				menu.data.position.y = (menu.data.geometry.height*0.75) * menuLength/2;
			}
			//Reset component data
			menu.data.sources = {};
			menu.data.components = {};
			menu.data.components.clickrun = {};
			menu.data.components.clickrun.cursorObj = menu.clickrun.cursorObj ;
			menu.data.components.clickrun.method = menu.clickrun.method;
			menu.data.components.clickrun.params = menu.clickrun.params;
			//Layer Children Options
			for(let menuItem in menu.options){
				if(menuLength === 1 || menuNum === 0){} else {
					if(menu.layout === 'vertical'){
						menu.data.position.y -= (menu.data.geometry.height*1.15);
					} else if(menu.layout === 'horizontal'){
						menu.data.position.x += (menu.data.geometry.width*1.15);
					} else {
						//backup for legacy, classic vertical mode
						menu.data.position.y -= (menu.data.geometry.height*1.15);
					}
				}
				menu.data.material.color, menu.data.material.emissive = auxl.colorTheoryGen().base;
				menu.data.text.value = menu.options[menuItem];
				menu.data.id = menu.id + 'option' + menuNum;
				menu.data.components.result = menu.actions['action'+menuNum];
				menuOption = auxl.Core(menu.data);
				menuOptions.push(menuOption);
				menu.layers['child'+menuNum] = {core: menuOptions[menuNum]}
				menuNum++;
			}
			menu.layer = auxl.Layer(menu.id, menu.layers);
			menu.layer.SpawnLayer();
			menu.inScene = true;
		}
	}
	//Despawn Menu
	const DespawnMenu = () => {
		if(menu.inScene){
			menu.layer.DespawnLayer();
			menu.inScene = false;
		}
	}
	//Attach Menu to Tracker matching object generator 
	const AddToParentSpawnTracker = (obj, parent) => {
		if(auxl.scenarioSpawned[parent.id]){
			auxl.scenarioSpawned[menu.id] = {type: 'menu', obj, parent};
		} else if(auxl.zoneSpawned[parent.id]){
			auxl.zoneSpawned[menu.id] = {type: 'menu', obj, parent};
		} else if(auxl.nodeSpawned[parent.id]){
			auxl.nodeSpawned[menu.id] = {type: 'menu', obj, parent};
		} else if(auxl.bookSpawned[parent.id]){
			auxl.bookSpawned[menu.id] = {type: 'menu', obj, parent};
		}
	}
	//Remove Menu from Tracker matching object generator 
	const RemoveMenuFromSceneTracker = () => {
		if(auxl.scenarioSpawned[menu.id]){
			delete auxl.scenarioSpawned[menu.id];
		} else if(auxl.zoneSpawned[menu.id]){
			delete auxl.zoneSpawned[menu.id];
		} else if(auxl.nodeSpawned[menu.id]){
			delete auxl.nodeSpawned[menu.id];
		} else if(auxl.bookSpawned[menu.id]){
			delete auxl.bookSpawned[menu.id];
		}
	}

	return {menu, SpawnMenu, DespawnMenu, AddToParentSpawnTracker, RemoveMenuFromSceneTracker};
}

//
//MultiMenu
//Multi Sub Menus | Circle/Vertical/Horizontal
const MultiMenu = (auxl, multiMenuData) => {
	let multiMenu = {};
	multiMenu.data = Object.assign({}, multiMenuData);
	multiMenu.inScene = false;
	multiMenu.menuOpen = false;
	multiMenu.descriptionOpen = false;
	multiMenu.buttonHover = '';
	multiMenu.currentMenu = 'menu0';
	multiMenu.menuPath = ['menu0'];
	multiMenu.switching = false;
	multiMenu.switchingTimeout;
	multiMenu.id = multiMenuData.info.id || 'multiMenu';
	multiMenu.layout = multiMenuData.info.layout || 'circleUp';
	multiMenu.posOffset = multiMenuData.info.posOffset || new THREE.Vector3(0,0,0);
	multiMenu.offset = multiMenuData.info.offset || -1;
	multiMenu.parent = multiMenu.data.info.parent || false;
	multiMenu.stare = multiMenu.data.info.stare || false;

	//circle
	//vertical
	//horizontal
	let circleRot = -45;
	let maxNulls = 0;
	let switchDelay = 250;

	multiMenu.buttonData = JSON.parse(JSON.stringify(multiMenu.data.info.buttonData));

	multiMenu.hoverData = JSON.parse(JSON.stringify(multiMenu.data.info.hoverData));

	multiMenu.nullParentData = {
		data:'nullParentData',
		id:'nullParent',
		sources:false,
		text: false,
		geometry: false,
		material: false,
		position: multiMenu.posOffset,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: false,
	};

	if(multiMenu.stare || multiMenu.look){
		multiMenu.nullParentData.components = {};
		if(multiMenu.stare){
			multiMenu.nullParentData.components.stare = multiMenu.stare;
		}
		if(multiMenu.look){
			multiMenu.nullParentData.components['look-at-xyz'] = multiMenu.look;
		}
	}

	multiMenu.cores = {};
	multiMenu.cores.hover = {};
	//Main Menu Null
	multiMenu.nullParentData.id = multiMenu.id;
	//Default Position
	if(multiMenu.data.info.position){
		multiMenu.nullParentData.position = multiMenu.data.info.position;
	}
	multiMenu.cores.parent = auxl.Core(multiMenu.nullParentData);
	//Reset Null Parent
	multiMenu.nullParentData.position = new THREE.Vector3(0,0,0);
	multiMenu.nullParentData.components = {};
	//Main Button Parent Core
	multiMenu.buttonData.id = multiMenu.data.info.id + 'menu';
	//Layout
	if(multiMenu.layout === 'circleUp' || multiMenu.layout === 'circleDown' ){
		multiMenu.buttonData.position.x = multiMenu.offset;
	}
	multiMenu.cores.main = auxl.Core(multiMenu.buttonData);
	//Sub Button Cores

	//Init each main menu array storage
	for(let menu in multiMenu.data){
		//console.log(menu)
		//console.log(multiMenu.data[menu])
		if(menu === 'info'){}else{
			multiMenu.cores[menu] = [];
			multiMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in multiMenu.data[menu]){
				buttonTotal++;
				//Generate Button Core
				multiMenu.buttonData.id = multiMenu.data[menu][button].id;
				multiMenu.buttonData.text.value = multiMenu.data[menu][button].title;
				//Layout
				if(multiMenu.layout === 'circleUp'){
					multiMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(multiMenu.layout === 'circleDown'){
					multiMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(multiMenu.layout === 'vertical'){
					multiMenu.buttonData.position.y = buttonTotal*multiMenu.offset;
				} else if(multiMenu.layout === 'horizontal'){
					multiMenu.buttonData.position.x = buttonTotal*multiMenu.offset;
				}
				//Reset Button Actions
				multiMenu.buttonData.components = {};
				//Add Button Actions
				if(multiMenu.data[menu][button].action){
					multiMenu.buttonData.components.clickrun = {};
					multiMenu.buttonData.components.clickrun.cursorObj = multiMenu.data[menu][button].action.auxlObj;
					multiMenu.buttonData.components.clickrun.method = multiMenu.data[menu][button].action.method;
					if(multiMenu.data[menu][button].action.component){
						multiMenu.buttonData.components.clickrun.component = multiMenu.data[menu][button].action.component;
					}
					if(multiMenu.data[menu][button].action.params){
						multiMenu.buttonData.components.clickrun.params = multiMenu.data[menu][button].action.params;
					}
					//Menu Controls
					if(multiMenu.data[menu][button].action.menu){
						//menu: 'close', close menu
						//menu: 'back', go back 1 menu
						//menu: 'stay', stay in same subMenu
						if(multiMenu.data[menu][button].action.menu === 'stay'){} else if(multiMenu.data[menu][button].action.menu === 'back'){

							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ToggleMenu';
							multiMenu.buttonData.components.menurun.params = null;
						} else if(multiMenu.data[menu][button].action.menu === 'close'){
							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ResetMenu';
						}
					} else {
						multiMenu.buttonData.components.menurun = {};
						multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
						multiMenu.buttonData.components.menurun.method = 'ResetMenu';
					}

				} else {
					multiMenu.buttonData.components.menurun = {};
					multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
					multiMenu.buttonData.components.menurun.method = 'SubMenu';
					multiMenu.buttonData.components.menurun.params = multiMenu.data[menu][button].subMenu;
				}

				//Gen Hover
				multiMenu.buttonData.components.mouseenterrun = {};
				multiMenu.buttonData.components.mouseenterrun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				multiMenu.buttonData.components.mouseenterrun.params = button;

				multiMenu.buttonData.components.mouseleaverun = {};
				multiMenu.buttonData.components.mouseleaverun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				multiMenu.buttonData.components.mouseleaverun.params = button;

				multiMenu.hoverData.id = multiMenu.data[menu][button].id + 'hover';
				multiMenu.hoverData.text.value = multiMenu.data[menu][button].description;
				multiMenu.cores.hover[menu][button] = auxl.Core(multiMenu.hoverData);

				//Gen Button
				multiMenu.cores[menu][button] = auxl.Core(multiMenu.buttonData);

			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}

	//Circle Rotation Degree
	//let circleRot = (360/maxNulls+1)*-1;
	//Generate a null parent for the maximum amount of buttons and main button
	multiMenu.cores.nulls = [];
	//If you update the menu to hold more then any preconfigured menu amount of nulls then this breaks, so might as well configure to the max
	//for(let a = 0; a <= maxNulls+1; a++){
	for(let a = 0; a <= 8; a++){
		multiMenu.nullParentData.id = multiMenu.id + 'null' + a;
		if(multiMenu.layout === 'circleUp'){
			multiMenu.nullParentData.rotation.z = circleRot*a;
		} else if(multiMenu.layout === 'circleDown'){
			multiMenu.nullParentData.rotation.z = (circleRot*a)*-1;
		}
		multiMenu.cores.nulls.push(auxl.Core(multiMenu.nullParentData));
	}
	//console.log(maxNulls)
	//console.log(multiMenu.cores.nulls);
	//Init Layer
	multiMenu.menuLayerData = {
		parent: {core: multiMenu.cores.parent},
		child0: {
			parent: {core: multiMenu.cores.nulls[0]},
			child0: {core: multiMenu.cores.main},
		},
	}
	//Init Null Children
	for(let a = 1; a < multiMenu.cores.nulls.length; a++){
		multiMenu.menuLayerData['child'+a] = {};
		multiMenu.menuLayerData['child'+a].core = multiMenu.cores.nulls[a];
	}
	//console.log(multiMenu.menuLayerData);
	//Init Layer
	multiMenu.menuLayer = auxl.Layer(multiMenu.id, multiMenu.menuLayerData);
	//Spawn Menu
	const SpawnMultiMenu = (open) => {
		if(multiMenu.inScene){}else{
			multiMenu.menuLayer.SpawnLayer(multiMenu.parent);
			multiMenu.menuLayer.GetChildEl(multiMenu.id+'null0').addEventListener('click',ToggleMenu);
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Open'}});
			if(open){
				ToggleMenu();
			}
			multiMenu.inScene = true;
		}
	}
	//New Menu Parent
	const UpdateParent = (parent) => {
		let newParent = parent || false;
		if(multiMenu.inScene){}else{
			multiMenu.parent = newParent;
		}
	}
	//Update Button Styles
	const UpdateButtons = (changes) => {
		console.log(multiMenu.cores)
	}
	//Update a Menu
	const UpdateSubMenu = (menu,buttons) => {
		if(multiMenu.currentMenu === menu){}else{
			//Purge and Rebuild SubMenu
			multiMenu.cores[menu] = [];
			multiMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in buttons){
				buttonTotal++;
				//Generate Button Core
				multiMenu.buttonData.id = buttons[button].id;
				multiMenu.buttonData.text.value = buttons[button].title;
				//Layout
				if(multiMenu.layout === 'circleUp'){
					multiMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(multiMenu.layout === 'circleDown'){
					multiMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(multiMenu.layout === 'vertical'){
					multiMenu.buttonData.position.y = buttonTotal*multiMenu.offset;
				} else if(multiMenu.layout === 'horizontal'){
					multiMenu.buttonData.position.x = buttonTotal*multiMenu.offset;
				}
				//Reset Button Actions
				multiMenu.buttonData.components = {};
				//Add Button Actions
				if(buttons[button].action){
					multiMenu.buttonData.components.clickrun = {};
					multiMenu.buttonData.components.clickrun.cursorObj = buttons[button].action.auxlObj;
					multiMenu.buttonData.components.clickrun.method = buttons[button].action.method;
					if(buttons[button].action.component){
						multiMenu.buttonData.components.clickrun.component = buttons[button].action.component;
					}
					if(buttons[button].action.params){
						multiMenu.buttonData.components.clickrun.params = buttons[button].action.params;
					}
					//Menu Controls
					if(buttons[button].action.menu){
						//menu: 'close', close menu
						//menu: 'back', go back 1 menu
						//menu: 'stay', stay in same subMenu
						if(buttons[button].action.menu === 'stay'){} else if(buttons[button].action.menu === 'back'){

							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ToggleMenu';
							multiMenu.buttonData.components.menurun.params = null;
						} else if(buttons[button].action.menu === 'close'){
							multiMenu.buttonData.components.menurun = {};
							multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
							multiMenu.buttonData.components.menurun.method = 'ResetMenu';
						}
					} else {
						multiMenu.buttonData.components.menurun = {};
						multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
						multiMenu.buttonData.components.menurun.method = 'ResetMenu';
					}

				} else {
					multiMenu.buttonData.components.menurun = {};
					multiMenu.buttonData.components.menurun.cursorObj = multiMenu.id;
					multiMenu.buttonData.components.menurun.method = 'SubMenu';
					multiMenu.buttonData.components.menurun.params = buttons[button].subMenu;
				}

				//Gen Hover
				multiMenu.buttonData.components.mouseenterrun = {};
				multiMenu.buttonData.components.mouseenterrun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				multiMenu.buttonData.components.mouseenterrun.params = button;

				multiMenu.buttonData.components.mouseleaverun = {};
				multiMenu.buttonData.components.mouseleaverun.cursorObj = multiMenu.id;
				multiMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				multiMenu.buttonData.components.mouseleaverun.params = button;

				multiMenu.hoverData.id = buttons[button].id + 'hover';
				multiMenu.hoverData.text.value = buttons[button].description;
				multiMenu.cores.hover[menu][button] = auxl.Core(multiMenu.hoverData);

				//Gen Button
				multiMenu.cores[menu][button] = auxl.Core(multiMenu.buttonData);
			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}
	//Spawn Sub Menu
	const SpawnMenu = () => {
		if(multiMenu.menuPath.length > 1){
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Back'}});
		} else {
			multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Close'}});
		}
		multiMenu.menuOpen = true;
		multiMenu.switching = true;
		let currentMenu = multiMenu.currentMenu;
		let nullNum = 1;
		let spawnParent;
		let spawnTimeout = setTimeout(() => {
			for(let button in multiMenu.cores[currentMenu]){
				spawnParent = multiMenu.menuLayer.GetChildEl(multiMenu.id+'null'+nullNum);
				multiMenu.cores[currentMenu][button].SpawnCore(spawnParent);
				nullNum++;
			}
			clearTimeout(spawnTimeout);
		}, switchDelay);
		multiMenu.switchingTimeout = setTimeout(() => {
			multiMenu.switching = false;
			clearTimeout(multiMenu.switchingTimeout);
		}, switchDelay*2);
	}
	//Despawn Sub Menu
	const DespawnMenu = (instant) => {
		multiMenu.menuOpen = false;
		multiMenu.switching = true;
		let currentMenu = multiMenu.currentMenu;
		let nullNum = 1;
		let spawnParents = {};
		let despawnDelay;
		if(instant){
			despawnDelay = 25;
		} else {
			despawnDelay = switchDelay;
		}
		if(multiMenu.descriptionOpen){
			DespawnDescription(multiMenu.buttonHover);
		}
		let despawnTimeout = setTimeout(() => {
			for(let button in multiMenu.cores[currentMenu]){
				spawnParents[button] = multiMenu.menuLayer.GetChildEl(multiMenu.id+'null'+nullNum);
				multiMenu.cores[currentMenu][button].DespawnCore();
				nullNum++;
			}
			clearTimeout(despawnTimeout);
		}, despawnDelay);
		multiMenu.switchingTimeout = setTimeout(() => {
			multiMenu.switching = false;
			clearTimeout(multiMenu.switchingTimeout);
		}, despawnDelay*2);
	}
	//Toggle Menu
	const ToggleMenu = () => {
		if(multiMenu.switching){}else{
			if(multiMenu.menuOpen){
				if(multiMenu.menuPath.length > 1){
					SubMenu(multiMenu.menuPath[multiMenu.menuPath.length-2]);
				} else {
					ResetMenu();
				}
			} else {
				SpawnMenu();
			}
		}
	}
	//Default Menu
	const DefaultMenu = () => {
		multiMenu.currentMenu = 'menu0';
		multiMenu.menuPath = ['menu0'];
		multiMenu.menuOpen = false;
	}
	//Reset Menu
	const ResetMenu = (instant) => {
		multiMenu.cores.main.ChangeSelf({property: 'text', value:{value:'Open'}});
		let despawnDelay;
		if(instant){
			despawnDelay = 0;
		} else {
			despawnDelay = switchDelay;
		}
		if(multiMenu.switching){}else{
			if(multiMenu.menuOpen){
				let resetTimeout = setTimeout(() => {
					DespawnMenu(instant);
					DefaultMenu();
					clearTimeout(resetTimeout);
				}, despawnDelay);
			}
		}
	}
	//Open a Sub Menu
	const SubMenu = (newMenu) => {
		if(multiMenu.switching){}else{
			DespawnMenu();
			multiMenu.currentMenu = newMenu;
			if(multiMenu.menuPath.includes(multiMenu.currentMenu)){
				multiMenu.menuPath.pop();
			} else {
				multiMenu.menuPath.push(multiMenu.currentMenu);
			}
			SpawnMenu();
		}
	}
	//Despawn Menu
	const DespawnMultiMenu = () => {
		if(multiMenu.inScene){
			ResetMenu(true);
			let resetTimeout = setTimeout(() => {
				multiMenu.menuLayer.GetChildEl(multiMenu.id+'null0').removeEventListener('click',ToggleMenu);
				multiMenu.menuLayer.DespawnLayer();
				multiMenu.inScene = false;
				auxl.RemoveFromTracker(multiMenu.id);
				clearTimeout(resetTimeout);
			}, switchDelay);

		}
	}
	//Display Description
	const SpawnDescription = (button) => {
		if(multiMenu.descriptionOpen){}else{
			multiMenu.buttonHover = button;
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();

			multiMenu.cores.hover[multiMenu.currentMenu][button].SpawnCore(spawnParent);
			multiMenu.descriptionOpen = true;
		}
	}
	//Despawn Description
	const DespawnDescription = (button) => {
		if(multiMenu.descriptionOpen){
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();
			multiMenu.cores.hover[multiMenu.currentMenu][button].DespawnCore();
			multiMenu.buttonHover = '';
			multiMenu.descriptionOpen = false;
		}
	}

	return {multiMenu, SpawnMultiMenu, DespawnMultiMenu, ToggleMenu, UpdateParent, UpdateButtons, UpdateSubMenu, SubMenu, ResetMenu, SpawnDescription, DespawnDescription};
}

//Quick Hover Menu :
//Hold down button to spawn circle menu, hover on option and let go of button. Active hover selection on button up happens and menu closes
const HoverMenu = (auxl, hoverMenuData) => {
	let hoverMenu = {};
	hoverMenu.data = Object.assign({}, hoverMenuData);
	hoverMenu.inScene = false;
	hoverMenu.menuOpen = false;
	hoverMenu.active = false;
	hoverMenu.descriptionOpen = false;
	hoverMenu.buttonHover = '';
	hoverMenu.currentMenu = 'menu';
	hoverMenu.menuPath = ['menu'];
	hoverMenu.switching = false;
	hoverMenu.switchingTimeout;
	hoverMenu.id = hoverMenuData.info.id || 'hoverMenu';
	hoverMenu.name = hoverMenuData.info.name || 'Quick Menu';
	hoverMenu.layout = hoverMenuData.info.layout || 'circleUp';
	hoverMenu.posOffset = hoverMenuData.info.posOffset || new THREE.Vector3(0,0,0);
	hoverMenu.offset = hoverMenuData.info.offset || -1;
	hoverMenu.parent = hoverMenu.data.info.parent || false;
	hoverMenu.spawnPos = new THREE.Vector3(0,0,0);
	hoverMenu.attached =  hoverMenu.data.info.attached || false;

	//circle
	//vertical
	//horizontal
	let circleRot = -45;
	let maxNulls = 0;
	let switchDelay = 50;

	hoverMenu.buttonData = JSON.parse(JSON.stringify(hoverMenu.data.info.buttonData));

	hoverMenu.hoverData = JSON.parse(JSON.stringify(hoverMenu.data.info.hoverData));

	hoverMenu.nullParentData = {
		data:'nullParentData',
		id:'nullParent',
		sources:false,
		text: false,
		geometry: false,
		material: false,
		position: hoverMenu.posOffset,
		rotation: new THREE.Vector3(0,0,0),
		scale: new THREE.Vector3(1,1,1),
		animations: false,
		mixins: false,
		classes: ['a-ent'],
		components: {
			//['look-at-xyz']:{match: 'camera', x:false, y:true, z:false},
			stare:{id: 'playerRig'},
		},
	};

	hoverMenu.cores = {};
	hoverMenu.cores.hover = {};
	//Main Menu Null
	hoverMenu.nullParentData.id = hoverMenu.id;
	//Default Position
	if(hoverMenu.data.info.position){
		hoverMenu.nullParentData.position = hoverMenu.data.info.position;
	}
	hoverMenu.cores.parent = auxl.Core(hoverMenu.nullParentData);
	//Reset Null Parent
	hoverMenu.nullParentData.position = new THREE.Vector3(0,0,0);
	hoverMenu.nullParentData.components = {};
	//Main Button Parent Core
	hoverMenu.buttonData.id = hoverMenu.data.info.id + 'menu';
	//Layout
	if(hoverMenu.layout === 'circleUp' || hoverMenu.layout === 'circleDown' ){
		hoverMenu.buttonData.position.x = hoverMenu.offset;
	}
	hoverMenu.buttonData.text.value = hoverMenu.name;
	hoverMenu.cores.main = auxl.Core(hoverMenu.buttonData);
	//Sub Button Cores

	//Init each main menu array storage
	for(let menu in hoverMenu.data){
		//console.log(menu)
		//console.log(hoverMenu.data[menu])
		if(menu === 'info'){}else{
			hoverMenu.cores[menu] = [];
			hoverMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in hoverMenu.data[menu]){
				buttonTotal++;
				//Generate Button Core
				hoverMenu.buttonData.id = hoverMenu.data[menu][button].id;
				hoverMenu.buttonData.text.value = hoverMenu.data[menu][button].title;
				//Layout
				if(hoverMenu.layout === 'circleUp'){
					hoverMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(hoverMenu.layout === 'circleDown'){
					hoverMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(hoverMenu.layout === 'vertical'){
					hoverMenu.buttonData.position.y = buttonTotal*hoverMenu.offset;
				} else if(hoverMenu.layout === 'horizontal'){
					hoverMenu.buttonData.position.x = buttonTotal*hoverMenu.offset;
				}
				//Reset Button Actions
				hoverMenu.buttonData.components = {};
				//Add Hover Active/Deactive
				hoverMenu.buttonData.components.hoverrun = {};
				hoverMenu.buttonData.components.hoverrun.menu = hoverMenu.id;
				hoverMenu.buttonData.components.hoverrun.action = button;
				if(hoverMenu.attached){
					hoverMenu.buttonData.components.hoverrun.attached = hoverMenu.attached;
				}
				//Gen Hover
				hoverMenu.buttonData.components.mouseenterrun = {};
				hoverMenu.buttonData.components.mouseenterrun.cursorObj = hoverMenu.id;
				hoverMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				hoverMenu.buttonData.components.mouseenterrun.params = button;

				hoverMenu.buttonData.components.mouseleaverun = {};
				hoverMenu.buttonData.components.mouseleaverun.cursorObj = hoverMenu.id;
				hoverMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				hoverMenu.buttonData.components.mouseleaverun.params = button;

				hoverMenu.hoverData.id = hoverMenu.data[menu][button].id + 'hover';
				hoverMenu.hoverData.text.value = hoverMenu.data[menu][button].description;
				hoverMenu.cores.hover[menu][button] = auxl.Core(hoverMenu.hoverData);

				//Gen Button
				hoverMenu.cores[menu][button] = auxl.Core(hoverMenu.buttonData);

			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}

	//Circle Rotation Degree
	//let circleRot = (360/maxNulls+1)*-1;
	//Generate a null parent for the maximum amount of buttons and main button
	hoverMenu.cores.nulls = [];
	//If you update the menu to hold more then any preconfigured menu amount of nulls then this breaks, so might as well configure to the max
	//for(let a = 0; a <= maxNulls+1; a++){
	for(let a = 0; a <= 8; a++){
		hoverMenu.nullParentData.id = hoverMenu.id + 'null' + a;
		if(hoverMenu.layout === 'circleUp'){
			hoverMenu.nullParentData.rotation.z = circleRot*a;
		} else if(hoverMenu.layout === 'circleDown'){
			hoverMenu.nullParentData.rotation.z = (circleRot*a)*-1;
		}
		hoverMenu.cores.nulls.push(auxl.Core(hoverMenu.nullParentData));
	}
	//console.log(maxNulls)
	//console.log(hoverMenu.cores.nulls);
	//Init Layer
	hoverMenu.menuLayerData = {
		parent: {core: hoverMenu.cores.parent},
		child0: {
			parent: {core: hoverMenu.cores.nulls[0]},
			child0: {core: hoverMenu.cores.main},
		},
	}
	//Init Null Children
	for(let a = 1; a < hoverMenu.cores.nulls.length; a++){
		hoverMenu.menuLayerData['child'+a] = {};
		hoverMenu.menuLayerData['child'+a].core = hoverMenu.cores.nulls[a];
	}
	//console.log(hoverMenu.menuLayerData);
	//Init Layer
	hoverMenu.menuLayer = auxl.Layer(hoverMenu.id, hoverMenu.menuLayerData);

	//Return Position Direction of Camera
	function cameraDirection(){
		//Get the direction vector in world space
		let direction = new THREE.Vector3();
		auxl.camera.GetEl().object3D.getWorldDirection(direction);
		//Calculate the position based on the direction and distance
		let position = new THREE.Vector3();
		//position.copy(auxl.camera.GetEl().object3D.position).add(new THREE.Vector3(direction.x, 0, direction.z).normalize().multiplyScalar(hoverMenu.posOffset.z));
		position.copy(auxl.camera.GetEl().object3D.position).add(new THREE.Vector3(direction.x, direction.y, direction.z).normalize().multiplyScalar(hoverMenu.posOffset.z));
		return position;
	}
	//Run AUXL Method
	function run(action){
		if(!action.component || action.component === 'null'){
			if(auxl[action.auxlObj][action.method]){
				if(!action.params || action.params === 'null'){
					auxl[action.auxlObj][action.method]();
				} else {
					auxl[action.auxlObj][action.method](action.params);
				}
			}
		} else {
			//object is a dom entity and the component is attached to that object and the func is in that component
			if(document.getElementById(action.auxlObj)){
				let domEnt = document.getElementById(action.auxlObj);
				if(!action.params || action.params === 'null'){
					domEnt.components[action.component][action.method]();
				} else {
					domEnt.components[action.component][action.method](action.params);
				}
			}
		}
	}
	//Spawn Menu
	const SpawnHoverMenu = () => {
		if(hoverMenu.inScene){}else{
			hoverMenu.active = false;
			hoverMenu.menuLayer.layer.all.parent.core.core.position = cameraDirection();
			hoverMenu.menuLayer.SpawnLayer(hoverMenu.parent);
			SpawnMenu();
			hoverMenu.inScene = true;
		}
	}
	//Update Parent
	const UpdateParent = (parent) => {
		let newParent = parent || false;
		if(hoverMenu.inScene){}else{
			hoverMenu.parent = newParent;
		}
	}
	//Update Sub Menu
	const UpdateSubMenu = (menu,buttons) => {
		if(hoverMenu.currentMenu === menu){}else{
			//Purge and Rebuild SubMenu
			hoverMenu.cores[menu] = [];
			hoverMenu.cores.hover[menu] = [];
			let buttonTotal = 0;
			for(let button in buttons){
				buttonTotal++;
				//Generate Button Core
				hoverMenu.buttonData.id = buttons[button].id;
				hoverMenu.buttonData.text.value = buttons[button].title;
				//Layout
				if(hoverMenu.layout === 'circleUp'){
					hoverMenu.buttonData.rotation.z = (circleRot*buttonTotal)*-1;
				} else if(hoverMenu.layout === 'circleDown'){
					hoverMenu.buttonData.rotation.z = circleRot*buttonTotal;
				} else if(hoverMenu.layout === 'vertical'){
					hoverMenu.buttonData.position.y = buttonTotal*hoverMenu.offset;
				} else if(hoverMenu.layout === 'horizontal'){
					hoverMenu.buttonData.position.x = buttonTotal*hoverMenu.offset;
				}
				//Reset Button Actions
				hoverMenu.buttonData.components = {};
				//Add Button Actions
				if(buttons[button].action){
					hoverMenu.buttonData.components.clickrun = {};
					hoverMenu.buttonData.components.clickrun.cursorObj = buttons[button].action.auxlObj;
					hoverMenu.buttonData.components.clickrun.method = buttons[button].action.method;
					if(buttons[button].action.component){
						hoverMenu.buttonData.components.clickrun.component = buttons[button].action.component;
					}
					if(buttons[button].action.params){
						hoverMenu.buttonData.components.clickrun.params = buttons[button].action.params;
					}
				}
				//Gen Hover
				hoverMenu.buttonData.components.mouseenterrun = {};
				hoverMenu.buttonData.components.mouseenterrun.cursorObj = hoverMenu.id;
				hoverMenu.buttonData.components.mouseenterrun.method = 'SpawnDescription';
				hoverMenu.buttonData.components.mouseenterrun.params = button;

				hoverMenu.buttonData.components.mouseleaverun = {};
				hoverMenu.buttonData.components.mouseleaverun.cursorObj = hoverMenu.id;
				hoverMenu.buttonData.components.mouseleaverun.method = 'DespawnDescription';
				hoverMenu.buttonData.components.mouseleaverun.params = button;

				hoverMenu.hoverData.id = buttons[button].id + 'hover';
				hoverMenu.hoverData.text.value = buttons[button].description;
				hoverMenu.cores.hover[menu][button] = auxl.Core(hoverMenu.hoverData);

				//Gen Button
				hoverMenu.cores[menu][button] = auxl.Core(hoverMenu.buttonData);
			}
			if(buttonTotal > maxNulls){
				maxNulls = buttonTotal;
			}
		}
	}
	//Spawn Sub Menu
	const SpawnMenu = () => {
		hoverMenu.menuOpen = true;
		hoverMenu.switching = true;
		let currentMenu = hoverMenu.currentMenu;
		let nullNum = 1;
		let spawnParent;
		let spawnTimeout = setTimeout(() => {
			for(let button in hoverMenu.cores[currentMenu]){
				spawnParent = hoverMenu.menuLayer.GetChildEl(hoverMenu.id+'null'+nullNum);
				hoverMenu.cores[currentMenu][button].SpawnCore(spawnParent);
				nullNum++;
			}
			clearTimeout(spawnTimeout);
		}, switchDelay);
		hoverMenu.switchingTimeout = setTimeout(() => {
			hoverMenu.switching = false;
			clearTimeout(hoverMenu.switchingTimeout);
		}, switchDelay*2);
	}
	//Despawn Sub Menu
	const DespawnMenu = (instant) => {
		hoverMenu.menuOpen = false;
		hoverMenu.switching = true;
		let currentMenu = hoverMenu.currentMenu;
		let nullNum = 1;
		let spawnParents = {};
		let despawnDelay;
		if(instant){
			despawnDelay = 25;
		} else {
			despawnDelay = switchDelay;
		}
		if(hoverMenu.descriptionOpen){
			DespawnDescription(hoverMenu.buttonHover);
		}
		let despawnTimeout = setTimeout(() => {
			for(let button in hoverMenu.cores[currentMenu]){
				spawnParents[button] = hoverMenu.menuLayer.GetChildEl(hoverMenu.id+'null'+nullNum);
				hoverMenu.cores[currentMenu][button].DespawnCore();
				nullNum++;
			}
			clearTimeout(despawnTimeout);
		}, despawnDelay);
		hoverMenu.switchingTimeout = setTimeout(() => {
			hoverMenu.switching = false;
			clearTimeout(hoverMenu.switchingTimeout);
		}, despawnDelay*2);
	}
	//Reset Menu
	const ResetMenu = (instant) => {
		let despawnDelay;
		if(instant){
			despawnDelay = 0;
		} else {
			despawnDelay = switchDelay;
		}
		if(hoverMenu.switching){}else{
			if(hoverMenu.menuOpen){
				let resetTimeout = setTimeout(() => {
					DespawnMenu(instant);
					clearTimeout(resetTimeout);
				}, despawnDelay);
			}
		}
	}
	//Despawn Menu
	const DespawnHoverMenu = () => {
		if(hoverMenu.inScene){
			//check which one is hovering if any to activate
			console.log(hoverMenu.active)
			if(hoverMenu.active){
				run(hoverMenu.data.menu[hoverMenu.active].action)
			}

			ResetMenu(true);
			let resetTimeout = setTimeout(() => {
				hoverMenu.menuLayer.DespawnLayer();
				hoverMenu.inScene = false;
				clearTimeout(resetTimeout);
			}, switchDelay);

		}
	}
	//Spawn Description
	const SpawnDescription = (button) => {
		if(hoverMenu.descriptionOpen){}else{
			hoverMenu.buttonHover = button;
			let spawnParent = hoverMenu.cores[hoverMenu.currentMenu][button].GetEl();

			hoverMenu.cores.hover[hoverMenu.currentMenu][button].SpawnCore(spawnParent);
			hoverMenu.descriptionOpen = true;
		}
	}
	//Despawn Description
	const DespawnDescription = (button) => {
		if(hoverMenu.descriptionOpen){
			let spawnParent = hoverMenu.cores[hoverMenu.currentMenu][button].GetEl();
			hoverMenu.cores.hover[hoverMenu.currentMenu][button].DespawnCore();
			hoverMenu.buttonHover = '';
			hoverMenu.descriptionOpen = false;
		}
	}

	return {hoverMenu, SpawnHoverMenu, DespawnHoverMenu, UpdateParent, UpdateSubMenu, ResetMenu, SpawnDescription, DespawnDescription};
}

//
//Combo Lock
//Enter Correct Sequence to Run Func
const ComboLock = (auxl, id, display, seq, run, position) => {

	let comboLock = {};
	comboLock.id = id;
	let layerId = comboLock.id + 'layer';
	let combo0Id = comboLock.id + 'combo0';
	let combo1Id = comboLock.id + 'combo1';
	let combo2Id = comboLock.id + 'combo2';
	let combo3Id = comboLock.id + 'combo3';
	let combo4Id = comboLock.id + 'combo4';
	comboLock.sequence = seq;
	comboLock.run = run;
	comboLock.current = 0;
	comboLock.locked = true;
	comboLock.correctSoFar = true;
	comboLock.lockedTimeout;
	comboLock.unlockedTimeout;
	comboLock.position = position || new THREE.Vector3(0,0,0);

	comboLock.texts = [];

	if(display){
		for(let each in display){
			comboLock.texts[each] = {value:display[each], color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0.051, side: 'front', wrapCount: 2, baseline: 'center'}
		}
	} else {
		comboLock.texts[0] = false;
		comboLock.texts[1] = false;
		comboLock.texts[2] = false;
		comboLock.texts[3] = false;
		comboLock.texts[4] = false;
	}



	//Combo Parent
	comboLock.comboParentData = {
	data:'comboParentData',
	id:'comboParent',
	sources: false,
	text: false,
	geometry: false,
	material: false,
	position: comboLock.position,
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	comboLock.comboParent = auxl.Core(comboLock.comboParentData);
	//Combo 0
	comboLock.combo0Data = {
	data:'combo0Data',
	id:combo0Id,
	sources: false,
	text: comboLock.texts[0],
	geometry: {primitive: 'box', depth: 0.1, width: 0.2, height: 0.3},
	material: {shader: "standard", color: "#e02574", emissive: '#e02574', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-0.4,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		click: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
		locked: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 250, delay: 0, loop: false, dir: 'normal', easing: 'easeInSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'locked'},
		locked2: {property: 'material.emissiveIntensity', from: '1', to: '0.25', dur: 250, delay: 1750, loop: false, dir: 'normal', easing: 'easeOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'locked'},
		unlocked: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 250, delay: 0, loop: '8', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'unlocked'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		clickrun:{
			cursorObj: comboLock.id,
			component: 'null',
			method: 'KeyClick',
			params: '0',
		},
	},
	};
	comboLock[combo0Id] = auxl.Core(comboLock.combo0Data);
	//Combo 1
	comboLock.combo1Data = auxl.coreDataFromTemplate(comboLock.combo0Data,{id: combo1Id, text: comboLock.texts[1], position: new THREE.Vector3(-0.2,0,0), material: {shader: "standard", color: "#66e025", emissive: '#66e025', emissiveIntensity: 0.25, opacity: 1},components:{clickrun:{cursorObj: comboLock.id, component: 'null', method: 'KeyClick', params: '1',},},}, true);
	comboLock[combo1Id] = auxl.Core(comboLock.combo1Data);
	//Combo 2
	comboLock.combo2Data = auxl.coreDataFromTemplate(comboLock.combo0Data,{id: combo2Id, text: comboLock.texts[2], position: new THREE.Vector3(0,0,0), material: {shader: "standard", color: "#256de0", emissive: '#256de0', emissiveIntensity: 0.25, opacity: 1},components:{clickrun:{cursorObj: comboLock.id, component: 'null', method: 'KeyClick', params: '2',},},}, true);
	comboLock[combo2Id] = auxl.Core(comboLock.combo2Data);
	//Combo 3
	comboLock.combo3Data = auxl.coreDataFromTemplate(comboLock.combo0Data,{id: combo3Id, text: comboLock.texts[3], position: new THREE.Vector3(0.2,0,0), material: {shader: "standard", color: "#e0e025", emissive: '#e0e025', emissiveIntensity: 0.25, opacity: 1},components:{clickrun:{cursorObj: comboLock.id, component: 'null', method: 'KeyClick', params: '3',},},}, true);
	comboLock[combo3Id] = auxl.Core(comboLock.combo3Data);
	//Combo 4
	comboLock.combo4Data = auxl.coreDataFromTemplate(comboLock.combo0Data,{id: combo4Id, text: comboLock.texts[4], position: new THREE.Vector3(0.4,0,0), material: {shader: "standard", color: "#e09825", emissive: '#e09825', emissiveIntensity: 0.25, opacity: 1},components:{clickrun:{cursorObj: comboLock.id, component: 'null', method: 'KeyClick', params: '4',},},}, true);
	comboLock[combo4Id] = auxl.Core(comboLock.combo4Data);

	comboLock.comboAll = {
		parent: {core: comboLock.comboParent}, 
		child0: {core: comboLock[combo0Id]}, 
		child1: {core: comboLock[combo1Id]},
		child2: {core: comboLock[combo2Id]},
		child3: {core: comboLock[combo3Id]},
		child4: {core: comboLock[combo4Id]},
	}
	comboLock[layerId] = auxl.Layer(layerId,comboLock.comboAll);
	//Key Click
	const KeyClick = (key) => {
		if(comboLock.locked){
			CheckSeq(key);
		}
	}
	//Check Sequence
	const CheckSeq = (key) => {
		if(comboLock.correctSoFar){
			if(key === comboLock.sequence[comboLock.current]){
				comboLock.correctSoFar = true;
			} else {
				comboLock.correctSoFar = false;
			}
		}
		//Continue
		comboLock.current++;
		if(comboLock.current >= comboLock.sequence.length){
			if(comboLock.correctSoFar){
				//Correct Sequence
				Unlock();
			} else {
				//Incorrect Sequence
				Reset();
				LockedAnim();
				ToggleClick();
				comboLock.unlockedTimeout = setTimeout(() => {
					ToggleClick();
					clearTimeout(comboLock.unlockedTimeout)
				}, 2000);
			}
		}
	}
	//Run
	const Run = () => {
		if(comboLock.run.component && comboLock.run.component !== 'null'){
			let domEnt = document.getElementById(comboLock.run.cursorObj);
			domEnt.components[comboLock.run.component][comboLock.run.method](comboLock.run.params);

		} else {
			auxl[comboLock.run.cursorObj][comboLock.run.method](comboLock.run.params);
		}
	}
	//Unlock
	const Unlock = () => {
		comboLock.locked = false;
		UnlockAnim();
		ToggleClick();
		comboLock.unlockedTimeout = setTimeout(() => {
			Run();
			ToggleClick();
			DespawnComboLock();
			clearTimeout(comboLock.lockedTimeout)
		}, 2250);
	}
	//Unlock Anim
	const UnlockAnim = () => {
		comboLock[layerId].EmitEventAll('unlocked');
	}
	//Locked Anim
	const LockedAnim = () => {
		comboLock[layerId].EmitEventAll('locked');
	}
	//Toggle Clickable
	const ToggleClick = () => {
		comboLock[layerId].GetAllChildEl().forEach(each => each.classList.toggle('clickable'))
	}
	//Update Sequence
	const NewSequence = (newSeq) => {
		clearTimeout(comboLock.lockedTimeout)
		clearTimeout(comboLock.unlockedTimeout)
		comboLock.sequence = newSeq;
		Reset();
	}
	//Reset Lock
	const Reset = () => {
		comboLock.current = 0;
		comboLock.correctSoFar = true;
		comboLock.locked = true;
	}
	//Spawn Combo Lock
	const SpawnComboLock = () => {
		comboLock.locked = true;
		comboLock[layerId].SpawnLayer();
	}
	//Despawn Combo Lock
	const DespawnComboLock = () => {
		clearTimeout(comboLock.lockedTimeout)
		clearTimeout(comboLock.unlockedTimeout)
		comboLock[layerId].DespawnLayer();
	}

	return {comboLock, SpawnComboLock, DespawnComboLock, KeyClick, NewSequence};

}

//
//Scroll Multi Menu
//Infinite Scroll of Options
const ScrollMenu = (auxl, id) => {

//2 Types
//Objects scroll vertically/horizontally over a flat plane. Flat plane handles scroll clicks
//
//Objects scroll vertically/horizontally over a rotated cylinder. Cylinder handles scroll clicks

//Menu Options
//Menu Size
//Options to display
//Options Size
//Option Spacing Size


	let scrollMenu = {};
	scrollMenu.id = id;

	//All Parent
	scrollMenu.AllParentData = {
	data:'AllParentData',
	id:'allParent',
	sources: false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,1.5,-1.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	scrollMenu.allParent = auxl.Core(scrollMenu.AllParentData);
	//Scroll Bkgd Clickable
	scrollMenu.scrollBkgdData = {
	data:'scrollBkgdData',
	id:'scrollBkgd',
	sources: false,
	text: false,
	geometry: {primitive: 'box', depth: 0.1, width: 0.5, height: 1.4},
	material: {shader: "standard", color: "#e02574", emissive: '#e02574', emissiveIntensity: 0.25, opacity: 0.5},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		scroll: {type: 'plane', axis: 'vertical', parent: 'scrollParent', length: 1, options: 5, elements: ['scroll0','scroll1','scroll2','scroll3','scroll4','scroll5','scroll6','scroll7']},
	},
	};
	scrollMenu.scrollBkgd = auxl.Core(scrollMenu.scrollBkgdData);
	//Scroll Parent
	scrollMenu.scrollParentData = {
	data:'scrollParentData',
	id:'scrollParent',
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
	components: false,
	};
	scrollMenu.scrollParent = auxl.Core(scrollMenu.scrollParentData);
	//Scroll 0
	scrollMenu.scroll0Data = {
	data:'scroll0Data',
	id: 'scroll0',
	sources: false,
	text: false,
	geometry: {primitive: 'box', depth: 0.025, width: 0.1, height: 0.1},
	material: {shader: "standard", color: "#e02574", emissive: '#e02574', opacity: 0},
	position: new THREE.Vector3(0,-0.6,0.1),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		click: {property: 'material.emissiveIntensity', from: '0.25', to: '1', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutElastic', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
	},
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	scrollMenu.scroll0 = auxl.Core(scrollMenu.scroll0Data);
	//Scroll 1
	scrollMenu.scroll1Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll1', position: new THREE.Vector3(0,-0.4,0.1), material: {shader: "standard", color: "#66e025", emissive: '#66e025', opacity: 1},}, true);
	scrollMenu.scroll1 = auxl.Core(scrollMenu.scroll1Data);
	//Scroll 2
	scrollMenu.scroll2Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll2', position: new THREE.Vector3(0,-0.2,0.1), material: {shader: "standard", color: "#256de0", emissive: '#256de0', opacity: 1},}, true);
	scrollMenu.scroll2 = auxl.Core(scrollMenu.scroll2Data);
	//Scroll 3
	scrollMenu.scroll3Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll3', position: new THREE.Vector3(0,0,0.1), material: {shader: "standard", color: "#e0e025", emissive: '#e0e025', opacity: 1},}, true);
	scrollMenu.scroll3 = auxl.Core(scrollMenu.scroll3Data);
	//Scroll 4
	scrollMenu.scroll4Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll4', position: new THREE.Vector3(0,0.2,0.1), material: {shader: "standard", color: "#e09825", emissive: '#e09825', opacity: 1},}, true);
	scrollMenu.scroll4 = auxl.Core(scrollMenu.scroll4Data);
	//Scroll 5
	scrollMenu.scroll5Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll5', position: new THREE.Vector3(0,0.4,0.1), material: {shader: "standard", color: "#e02525", emissive: '#e02525', opacity: 1},}, true);
	scrollMenu.scroll5 = auxl.Core(scrollMenu.scroll5Data);
	//Scroll 6
	scrollMenu.scroll6Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll6', position: new THREE.Vector3(0,0.6,0.1), material: {shader: "standard", color: "#25e0d9", emissive: '#25e0d9', opacity: 0},}, true);
	scrollMenu.scroll6 = auxl.Core(scrollMenu.scroll6Data);
	//Scroll 7
	scrollMenu.scroll7Data = auxl.coreDataFromTemplate(scrollMenu.scroll0Data,{id: 'scroll7', position: new THREE.Vector3(0,0.8,0.1), material: {shader: "standard", color: "#ffffff", emissive: '#ffffff', opacity: 0},}, true);
	scrollMenu.scroll7 = auxl.Core(scrollMenu.scroll7Data);

	scrollMenu.scrollAllData = {
		parent: {core: scrollMenu.allParent}, 
		child0: {core: scrollMenu.scrollBkgd}, 
		child1: {
			parent: {core: scrollMenu.scrollParent}, 
			child0: {core: scrollMenu.scroll0}, 
			child1: {core: scrollMenu.scroll1},
			child2: {core: scrollMenu.scroll2},
			child3: {core: scrollMenu.scroll3},
			child4: {core: scrollMenu.scroll4},
			child5: {core: scrollMenu.scroll5},
			child6: {core: scrollMenu.scroll6},
			child7: {core: scrollMenu.scroll7},
		},
	}
	scrollMenu.scrollAll = auxl.Layer('scrollAll',scrollMenu.scrollAllData);

	//Spawn Scroll
	const SpawnScrollMenu = () => {
		scrollMenu.scrollAll.SpawnLayer();
	}

	//Despawn Scroll
	const DespawnScrollMenu = () => {
		scrollMenu.scrollAll.DespawnLayer();
	}

	return {scrollMenu, SpawnScrollMenu, DespawnScrollMenu};
};

//
//Export
export {Menu, MultiMenu, HoverMenu, ComboLock, ScrollMenu};