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
//
AFRAME.registerComponent('menu', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;


//
//Menu
//Single Menu | Vertical/Horizontal
auxl.Menu = (menuData) => {
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
	menu.clickrun.params = menuData.params || 'null';
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
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				menu[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: menu.id, type: 'menu', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			menu[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: menu.id, type: 'menu', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(menu(flag[each]));
			}
			return flagArray;
		} else {
			return menu[flag];
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

	return {menu, SpawnMenu, DespawnMenu, SetFlag, GetFlag, AddToParentSpawnTracker, RemoveMenuFromSceneTracker};
}

//
//MultiMenu
//Multi Sub Menus | Circle/Vertical/Horizontal
auxl.MultiMenu = (multiMenuData) => {
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
/*
	if(multiMenu.stare){
		multiMenu.nullParentData.components['look-at-xyz'] = {match: multiMenu.stare.id, x: multiMenu.stare.x, y: multiMenu.stare.y, z: multiMenu.stare.z}
	}
*/
	if(multiMenu.stare){
		multiMenu.nullParentData.components['stare'] = {id: multiMenu.stare.id, twist: multiMenu.stare.twist,}
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

	const UpdateParent = (parent) => {
		let newParent = parent || false;
		if(multiMenu.inScene){}else{
			multiMenu.parent = newParent;
		}
	}

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

	const DefaultMenu = () => {
		multiMenu.currentMenu = 'menu0';
		multiMenu.menuPath = ['menu0'];
		multiMenu.menuOpen = false;
	}

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

	const DespawnMultiMenu = () => {
		if(multiMenu.inScene){
			ResetMenu(true);
/*
			multiMenu.menuLayer.GetChildEl('null0').removeEventListener('click',ToggleMenu);
			multiMenu.menuLayer.DespawnLayer();
			multiMenu.inScene = false;
*/
			let resetTimeout = setTimeout(() => {
				multiMenu.menuLayer.GetChildEl(multiMenu.id+'null0').removeEventListener('click',ToggleMenu);
				multiMenu.menuLayer.DespawnLayer();
				multiMenu.inScene = false;
				auxl.RemoveFromTracker(multiMenu.id);
				clearTimeout(resetTimeout);
			}, switchDelay);

		}
	}

	const SpawnDescription = (button) => {
		if(multiMenu.descriptionOpen){}else{
			multiMenu.buttonHover = button;
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();

			multiMenu.cores.hover[multiMenu.currentMenu][button].SpawnCore(spawnParent);
			multiMenu.descriptionOpen = true;
		}
	}

	const DespawnDescription = (button) => {
		if(multiMenu.descriptionOpen){
			let spawnParent = multiMenu.cores[multiMenu.currentMenu][button].GetEl();
			multiMenu.cores.hover[multiMenu.currentMenu][button].DespawnCore();
			multiMenu.buttonHover = '';
			multiMenu.descriptionOpen = false;
		}
	}

	return {multiMenu, SpawnMultiMenu, DespawnMultiMenu, ToggleMenu, UpdateParent, UpdateSubMenu, SubMenu, ResetMenu, SpawnDescription, DespawnDescription};
}

//
//Quick Hover Menu :
//Hold down button to spawn circle menu, hover on option and let go of button. Active hover selection on button up happens and menu closes
auxl.HoverMenu = (hoverMenuData) => {
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

	const UpdateParent = (parent) => {
		let newParent = parent || false;
		if(hoverMenu.inScene){}else{
			hoverMenu.parent = newParent;
		}
	}

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

	const SpawnDescription = (button) => {
		if(hoverMenu.descriptionOpen){}else{
			hoverMenu.buttonHover = button;
			let spawnParent = hoverMenu.cores[hoverMenu.currentMenu][button].GetEl();

			hoverMenu.cores.hover[hoverMenu.currentMenu][button].SpawnCore(spawnParent);
			hoverMenu.descriptionOpen = true;
		}
	}

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




},
});