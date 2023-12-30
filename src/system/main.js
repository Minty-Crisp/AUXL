//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Main
//
//Core
//Core & Data Copying
//Layer
//Layer & Data Copying

//
//Entity Core
//Single Base Object
const Core = (auxl, data) => {
	let core = JSON.parse(JSON.stringify(data));
	core.inScene = false;
	core.el = {};
	core.dom = false;
	core.domInterval;
	core.events = {};
	core.parent = false;
	if(!core.hasOwnProperty('defaultParent')){
		core.defaultParent = false;
	}
	core.gridSpawned = false;
	core.gridPath = [];
	core.pathSpeed = 1000;
	core.pathWait = 1000;
	core.pathRoute = 'any';
	core.pathLoop = 'infinite';
	core.pathType = 'jump';
	core.currentPath = -1;
	core.gridPathInterval;
	core.gridPathTimeout;
	let details = false;
	let load3D = false;
	let loadMat = false;
	let loadNewMat = false;

	//Build Data Defaults
	const DataDefaults = () => {
		//Set defaults on empty data to avoid errors

		//Position
		if(!data.hasOwnProperty('position')){
			data.position = new THREE.Vector3();
		}
		//Rotation
		if(!data.hasOwnProperty('rotation')){
			data.rotation = new THREE.Vector3();
		}
		//Scale
		if(!data.hasOwnProperty('scale')){
			data.scale = new THREE.Vector3(1,1,1);
		}
		//sources
		if(!data.hasOwnProperty('sources')){
			data.sources = false;
		}
		//text
		if(!data.hasOwnProperty('text')){
			data.text = false;
		}
		//geometry
		if(!data.hasOwnProperty('geometry')){
			data.geometry = false;
		}
		//material
		if(!data.hasOwnProperty('material')){
			data.material = false;
		}
		//animations
		if(!data.hasOwnProperty('animations')){
			data.animations = false;
		}
		//mixins
		if(!data.hasOwnProperty('mixins')){
			data.mixins = false;
		}
		//classes
		if(!data.hasOwnProperty('classes')){
			data.classes = ['a-ent',];
		}
		//components
		if(!data.hasOwnProperty('components')){
			data.components = false;
		}
	}
	//Import external JS script
	async function getJsSrc(url){
		const response = await fetch(url)
		await import(response.url);
		return true;
	}
	//Loading Asset
	function loading(){
		auxl.loadingObjects.set(core.id,true);
		if(auxl.loadingScene){} else {
			auxl.loadingScene = true;
		}
	}
	//Asset Loaded
	function loaded(){
		auxl.loadingObjects.delete(core.id);
		GetEl(true);
		auxl.el.emit(core.id+'spawned',{});
	}
	//Generate Entity Element
	const Generate = () => {
		core.el = {};
		//Instead of adding a source to each object that uses a component, add it to auxl.jsAll to dynamically load instead
		if(core.sources){
			let propertyKeys = Object.keys(core.sources);
			let propertyValues = Object.values(core.sources);
			for (let propKey in propertyKeys) {
				//if js key exists and is false, it is not ready yet, delay
				if(auxl.jsLoaded.hasOwnProperty(propertyKeys[propKey])){
					if(auxl.jsLoaded[propertyKeys[propKey]] === false){
						console.log(core.id);
						console.log('JS is not yet loaded');
						//add to this.spawnedWaitingForJS for reapplication of component info when finished loading
						auxl.spawnedWaitingForJS[propertyKeys[propKey]].push({id:core.id, properties: core.components[propertyKeys[propKey]]});
					}
				} else {
					auxl.spawnedWaitingForJS[propertyKeys[propKey]] = [];
					console.log(propertyKeys[propKey]);
					console.log(propertyValues[propKey]);
					auxl.jsLoaded[propertyKeys[propKey]] = false;
					function doneImporting(){
						console.log(propertyKeys[propKey]);
						console.log('Done');
						auxl.jsLoaded[propertyKeys[propKey]] = true;
						//re-apply component
						ChangeSelf({property:propertyKeys[propKey], value:core.components[propertyKeys[propKey]]});
						//auxl.spawnedWaitingForJS
						console.log(auxl.spawnedWaitingForJS);
						for(let each in auxl.spawnedWaitingForJS[propertyKeys[propKey]]){
					let name = auxl.spawnedWaitingForJS[propertyKeys[propKey]][each].id;
					let properties = auxl.spawnedWaitingForJS[propertyKeys[propKey]][each].properties;
					console.log(name);
					console.log(properties);
					document.getElementById(name).setAttribute(propertyKeys[propKey],properties);
						}
					//clear pending array after reapplications
					delete auxl.spawnedWaitingForJS[propertyKeys[propKey]];
					console.log(auxl.spawnedWaitingForJS);
					}
					getJsSrc(propertyValues[propKey]).then(doneImporting);
				}
			}
		}
		//Entity Type
		if(core.entity === 'preAdded'){
			if(document.getElementById(core.id)){
				core.el = document.getElementById(core.id);
			} else {
				core.el = document.createElement('a-entity');
			}
		} else if(core.entity){
			core.el = document.createElement(core.entity);
		} else {
			core.el = document.createElement('a-entity');
		}
		//Sound
		if(auxl.audioEnabled){
			let sound = {};
			if(core.sound){
				sound = JSON.parse(JSON.stringify(core.sound));
				if(!sound.volume){
					sound.volume = 1;
				}
				sound.volume *= auxl.volume;
				//core.el.setAttribute('sound', sound);
				core.el.setAttribute('auxsound', sound);
			};
			if(core.sounds){
				for(let each in core.sounds){
					sound = JSON.parse(JSON.stringify(core.sounds[each]));
					if(!sound.volume){
						sound.volume = 1;
					}
					sound.volume *= auxl.volume;
					//core.el.setAttribute('sound__'+each, sound);
					core.el.setAttribute('auxsound__'+each, sound);
				}
			};
		}
		//Text
		if(core.text){core.el.setAttribute('text', core.text)};
		//ID
		core.el.setAttribute('id', core.id);
		//Geometry
		if(core.geometry){
			core.el.setAttribute('geometry', core.geometry);
		}
		//Material
		if(core.material){
			if(core.material.src){
				loadMat = true;
			}
			core.el.setAttribute('material', core.material);
		}
		//Position
		if(core.position){
			core.el.setAttribute('position', core.position);
		}
		//Rotation
		if(core.rotation){
			core.el.setAttribute('rotation', core.rotation);
		}
		//Scale
		if(core.scale){
			core.el.setAttribute('scale', core.scale);
		}
		//Mixins
		if(core.mixins){
			core.el.setAttribute('mixins', core.mixins);
		}
		//Class
		if(core.classes){
			core.el.classList.add(...core.classes);
		} else {
			//Defaults to adding a-ent aka auxl entity
			core.el.classList.add('a-ent');
		}
/*
		for (let key in core.classes) {
			core.el.classList.add(core.classes[key]);
		}
*/
		//Animations
		if(core.hasOwnProperty('animations')){
			let animationKeys = Object.keys(core.animations);
			let animationValues = Object.values(core.animations);
			for (let key in animationKeys) {
				if(key === 0){} else {
					core.el.setAttribute('animation__'+animationKeys[key], animationValues[key]);
				}
			}
		}
		//Components with auxl.jsAll dynamic JS loading support
		if(core.hasOwnProperty('components')){
			//Wait for Model to Load?
			if(core.components['gltf-model'] || core.components['obj-model']){
				load3D = true;
			}
			let componentKeys = Object.keys(core.components);
			let componentValues = Object.values(core.components);
			for (let key in componentKeys) {
				if(key === 0){} else {
					if(auxl.jsAll.hasOwnProperty(componentKeys[key])){
						if(auxl.jsLoaded.hasOwnProperty(componentKeys[key])){
							//JS has started loading or is loaded
							if(auxl.jsLoaded[componentKeys[key]] === false){
								//JS is Pending
								auxl.spawnedWaitingForJS[componentKeys[key]].push({id:core.id, properties: core.components[componentKeys[key]]});
							} else {
								//JS is Ready
								core.el.setAttribute(componentKeys[key],componentValues[key]);
							}
						} else {
							//Start to load JS
							auxl.spawnedWaitingForJS[componentKeys[key]] = [];
							auxl.jsLoaded[componentKeys[key]] = false;
							function doneImporting(){
								auxl.jsLoaded[componentKeys[key]] = true;
								//re-apply component
								ChangeSelf({property:componentKeys[key], value:core.components[componentKeys[key]]});
								for(let each in auxl.spawnedWaitingForJS[componentKeys[key]]){
									let name = auxl.spawnedWaitingForJS[componentKeys[key]][each].id;
									let properties = auxl.spawnedWaitingForJS[componentKeys[key]][each].properties;
									document.getElementById(name).setAttribute(componentKeys[key],properties);
								}
								//clear pending array after reapplications
								delete auxl.spawnedWaitingForJS[componentKeys[key]];
							}
							getJsSrc(auxl.jsAll[componentKeys[key]]).then(doneImporting);
								}
					} else {
						//Does not exist in jsAll, so it's an internal component/property or the js is attached seperately
						core.el.setAttribute(componentKeys[key],componentValues[key]);
					}
				}
			}
		}
		//Object element generation done
		return core.el;
	}
	//Spawn Entity Object
	const SpawnCore = (parent) => {
		core.parent = parent || core.defaultParent || false;
		let preAdded = false;
		if(core.inScene){
			if(parent){
				if(core.parent.core){
					//console.log('Core');
					if(core.parent.core.inScene){
						core.parent = core.parent.GetEl();
					} else {
						core.parent = false;
					}
				} else if(core.parent.layer){
					//console.log('Layer');
					if(parent.layer.inScene){
						core.parent = core.parent.GetParentEl();
					} else {
						core.parent = false;
					}
				} else if(core.parent.id){
					//console.log('Entity');
				} else if(typeof core.parent === 'string'){
					//console.log('ID');
					if(document.getElementById(core.parent)){
						core.parent = document.getElementById(core.parent);
					} else {
						core.parent = false;
					}
				}
				if(!core.parent){
					console.log(id);
					console.log(core.parent);
					console.log(document.getElementById(core.parent));
					console.log('Parent is not in scene!');
				} else {
					core.parent.appendChild(core.el);
				}
			}
		}else{
			//Generate Entity Element
			Generate();
			//Loading should only apply to gltf, obj and material textures
			if(load3D || loadMat){
				loading();
			}
			//Add to Scene or Parent
			if(core.entity === 'preAdded'){
				if(document.getElementById(core.id)){
					preAdded = true;
				}
			}
			if(preAdded){} else {
				if(core.parent){
					if(core.parent.core){
						//console.log('Core');
						if(core.parent.core.inScene){
							core.parent = core.parent.GetEl();
						} else {
							core.parent = false;
						}
					} else if(core.parent.layer){
						//console.log('Layer');
						if(parent.layer.inScene){
							core.parent = core.parent.GetParentEl();
						} else {
							core.parent = false;
						}
					} else if(core.parent.id){
						//console.log('Entity');
					} else if(typeof core.parent === 'string'){
						//console.log('ID');
						if(document.getElementById(core.parent)){
							core.parent = document.getElementById(core.parent);
						} else {
							core.parent = false;
						}
					}
					if(!core.parent){
						console.log(id);
						console.log(core.parent);
						console.log(document.getElementById(core.parent));
						console.log('Parent is not in scene!');
					} else {
						core.parent.appendChild(core.el);
					}
				} else {
					auxl.sceneEl.appendChild(core.el);
				}
			}
			//Loaded Events
			let loadingEvent = false;
			//Model
			if(load3D){
				core.el.addEventListener('model-loaded', loaded);
				loadingEvent = true;
			}
			//Texture
			if(loadMat){
				core.el.addEventListener('loaded', loaded);
				loadingEvent = true;
			}
			//Cannon Physics
			if(core.el.components && core.el.components.body){
				core.el.addEventListener('body-loaded', loaded);
				loadingEvent = true;
			}
			if(!loadingEvent){
				//Link to DOM
				core.domInterval = setTimeout(() => {
					if(GetEl(true)){
						auxl.el.emit(core.id+'spawned',{});
						//console.log(core.dom)
						clearInterval(core.domInterval);
					}
				}, 100);
			}
			core.inScene = true;
		}
	}
	//Despawn Entity Object
	const DespawnCore = () => {
		if(core.inScene){
			//Clear Core Timeout/Intervals
			clearInterval(core.domInterval);
			clearTimeout(core.gridPathTimeout);
			clearInterval(core.gridPathInterval);
			//Loaded Events
			if(load3D){
				core.el.removeEventListener('model-loaded', loaded);
			}
			if(loadMat || loadNewMat){
				core.el.removeEventListener('loaded', loaded);
			}
			//Remove all core.components to remove all event listeners before clearing from scene
			if(core.hasOwnProperty('components')){
				let componentKeys = Object.keys(core.components);
				for (let key in componentKeys) {
					if(key === 0){} else {
						if(!componentKeys[key].startsWith('shape')){
							GetEl().removeAttribute(componentKeys[key])
						}

					}
				}
			}
			//Collision
			if(core.gridSpawned){
				if(core.grid.collide){
					auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, false);
				} else if(core.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, false);
				}
				core.gridSpawned = false;
			}
			//Remove from Scene or Parent
			if(core.parent){
				core.parent.removeChild(core.el);
			} else {
				auxl.sceneEl.removeChild(core.el);
			}
			//Scene Tracking Support
			if(auxl.ExistsInTracker(core.id)){
				auxl.RemoveFromTracker(core.id);
			}
			core.dom = false;
			core.inScene = false;
			auxl.el.emit(core.id+'despawned',{});
		}
	}
	//Toggle Spawn
	const ToggleSpawn = (parent, track) => {
		let newParent = parent || false;
		if(newParent){
			core.parent = newParent;
		}
		if(core.inScene){
			DespawnCore();
		} else {
			SpawnCore(core.parent);
			if(track){
				auxl.spawnTracker(core.id, track);
			}
		}
	}
	//Return Element in Scene
	const GetEl = (refresh) => {
		if(refresh){
			core.dom = document.getElementById(core.id);
		} else if(core.dom){} else {
			core.dom = document.getElementById(core.id);
		}
		return core.dom;
	}
	//vec3 and vec3
	const GridCalc = (objSize, gridStart, collide) => {
		let grid = {};
		let size = new THREE.Vector3();
		//what about scaling?
		if(!objSize) {
			//3D Models - GLTF
			if(!core.gridSize){
				core.gridSize = {x:1, y:1, z:1};
			}
			size.x = core.gridSize.x;
			size.y = core.gridSize.y;
			size.z = core.gridSize.z;
		} else if(objSize.width){
			//box or plane
			size.x = objSize.width;
			size.y = objSize.height;
			size.z = objSize.depth;
		} else if(objSize.radius && !objSize.height){
			//torus, torusknot, circle, sphere, d20,d10,etc...,
			size.x = objSize.radius*2;
			size.y = objSize.radius*2;
			size.z = objSize.radius*2;
		} else if(objSize.radius && objSize.height){
			//cone, cylinder
			size.x = objSize.radius*2;
			size.y = objSize.height;
			size.z = objSize.radius*2;
		}
		grid.yOffset = 0;
		grid.start = new THREE.Vector3().copy(gridStart);
		grid.end = new THREE.Vector3();

		grid.collide = collide || false;

		let looping = 0;
		//X
		grid.end.x = grid.start.x;
		if(size.x > 0.5){
			looping = size.x/0.5;
			for(let a=0; a < looping; a++){
				if(a !== 0){
					grid.end.x += 0.5;
				}
			}
		}
		/*
		//Y Grid is 1 instead of 0.5 like X and Z
		grid.end.y = grid.start.y;
		if(size.y > 0.5){
			looping = size.y/0.5;
			for(let a=0; a < looping; a++){
				if(a !== 0){
					grid.end.y += 0.5;
				}
			}
		}
		*/
		grid.end.y = grid.start.y;
		grid.yOffset = size.y/2;
		//Z
		grid.end.z = grid.start.z;
		if(size.z > 0.5){
			looping = size.z/0.5;
			for(let a=0; a < looping; a++){
				if(a !== 0){
					grid.end.z += 0.5;
				}
			}
		}
		return grid;
	}
	//Exact Pos from Grid Pos
	function posOnGrid(grid){
		let pos = new THREE.Vector3();
		if(grid.start.x === grid.end.x && grid.start.z === grid.end.z){
			pos.x = grid.start.x;
			pos.z = grid.start.z;
		} else {
			let xDif = (grid.start.x - grid.end.x)*-1;
			let zDif = (grid.start.z - grid.end.z)*-1;
			xDif /= 2;
			zDif /= 2;
			pos.x = grid.start.x + xDif;
			pos.z = grid.start.z + zDif;
		}
		pos.y = grid.start.y;
		return pos;
	}
	//Spawn on Grid
	const SpawnCoreOnGrid = (grid) => {
		//Start should always be less than or equal to end
		//Start from top left to bottom right

		//Grid goes from 0 - 2 takes up 5 grid spaces of 0, 0.5, 1, 1.5, 2
		//5 spaces of 0.5 equals 2.5, so width or height would be 2.5
		if(core.inScene){}else{
			if(grid){
				core.grid = grid;
			}
			//Collision on by default
			if(!core.grid.hasOwnProperty('collide') && !core.grid.hasOwnProperty('trigger')){
				core.grid.collide = true;
			}
			//Build end pos from geo size and start pos
			if(!core.grid.end){
				core.grid = GridCalc(core.geometry, core.grid.start, core.grid.collide);
			}
			//Ensure Grid Y Level is Set
			if(core.grid.start.y){} else {
				core.grid.start.y = 0;
			}
			if(core.grid.end.y){} else {
				core.grid.end.y = 0;
			}
			if(grid && grid.xOffset){
				core.grid.xOffset = grid.xOffset;
			} else if(core.grid.xOffset){} else {
				core.grid.xOffset = 0;
			}
			if(grid && grid.yOffset){
				core.grid.yOffset = grid.yOffset;
			} else if(core.grid.yOffset){} else {
				core.grid.yOffset = 0;
			}
			if(grid && grid.zOffset){
				core.grid.zOffset = grid.zOffset;
			} else if(core.grid.zOffset){} else {
				core.grid.zOffset = 0;
			}

			//core.grid.height = Math.abs(core.grid.start.y) + Math.abs(core.grid.end.y) + 1;
			if(core.grid.start.y === core.grid.end.y){
				core.grid.height = 1;
			} else {
				core.grid.height = 1 + Math.ceil(Math.abs(Math.abs(core.grid.start.y) - Math.abs(core.grid.end.y)));
			}
			//Prevent Player Collision Overlap
			let playerGrid = auxl.player.GetPlayerInfo().grid;
			if(core.grid.start.x <= playerGrid.x && core.grid.end.x >= playerGrid.x && core.grid.start.y <= playerGrid.y && core.grid.end.y >= playerGrid.y && core.grid.start.z <= playerGrid.z && core.grid.end.z >= playerGrid.z){
				//Wait to Spawn till Player moves out of Range
				auxl.map.WaitToSpawn({name:core.id, func: 'SpawnCoreOnGrid'});
			} else {
				//Grid Position
				let startPos = posOnGrid(core.grid);
				core.position.x = core.grid.xOffset + startPos.x;
				core.position.y = core.grid.yOffset + startPos.y;
				core.position.z = core.grid.zOffset + startPos.z;
				//Spawn Core
				SpawnCore();
				//Collision or Trigger Map Update
				if(core.grid.collide){
					auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, core.grid.collide);
				} else if(core.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, core.grid.trigger);
				}
				core.gridSpawned = true;
			}
		}
	}
	//Toggle Grid Spawn
	const ToggleCoreGridSpawn = (grid) => {
		if(core.inScene){
			DespawnFromGrid();
		} else {
			SpawnOnGrid(grid);
		}
	}
	//Move on Grid
	const GridMove = (move) => {
		//with new start/end coords, check if free, if so move, otherwise wait till it is cleared
		//let gridMovement = {start:{x:0, z:-5}, end: {x:0, z:-5}};
		let gridMovement = {start:{}, end: {}};
		gridMovement.start.x = core.grid.start.x;
		gridMovement.start.y = core.grid.start.y;
		gridMovement.start.z = core.grid.start.z;
		gridMovement.end.x = core.grid.end.x;
		gridMovement.end.y = core.grid.end.y;
		gridMovement.end.z = core.grid.end.z;
		//Calc X
		if(move.x){
			gridMovement.start.x += move.x;
			gridMovement.end.x += move.x;
		}
		//Calc Y
		if(move.y){
			gridMovement.start.y += move.y;
			gridMovement.end.y += move.y;
		}
		//Calc Z
		if(move.z){
			gridMovement.start.z += move.z;
			gridMovement.end.z += move.z;
		}
		//Actual Position to Move Into
		let movePos = posOnGrid(gridMovement);
		//movePos.y = core.position.y;
		//Collision Move Checks
		if(core.grid.collide){
			if(auxl.map.CheckMapAreaSansArea(core.grid, gridMovement, core.grid.height)){
				//console.log('free')
				//Clear previous grid pos
				auxl.map.UpdateMapArea(core.id, core.grid.start, core.grid.end, false);
				//Update new grid pos
				auxl.map.UpdateMapArea(core.id, gridMovement.start, gridMovement.end, true);
				//Move Object
				if(core.pathType === 'anim'){
					//Animate Object Move
					if(move.x){
						EmitEvent('animstartx' + movePos.x);
					} else if(move.y){
						EmitEvent('animstarty' + movePos.y);
					} else if(move.z){
						EmitEvent('animstartz' + movePos.z);
					}
				} else if(core.pathType === 'jump'){
					//Jump Object Move
					ChangeSelf({property: 'position', value: movePos});
				}
				//Update core.grid with new grid pos
				core.grid.start.x = gridMovement.start.x;
				core.grid.start.y = gridMovement.start.y;
				core.grid.start.z = gridMovement.start.z;
				core.grid.end.x = gridMovement.end.x;
				core.grid.end.y = gridMovement.end.y;
				core.grid.end.z = gridMovement.end.z;
				return true;
			} else {
				//console.log('not free')
				return false;
			}
		} else if(core.grid.trigger){
			//Clear previous grid pos
			auxl.map.UpdateMapAreaTrigger(core.id, core.grid.start, core.grid.end, false);
			//Update new grid pos
			auxl.map.UpdateMapAreaTrigger(core.id, gridMovement.start, gridMovement.end, true);
			//Move Object
			if(core.pathType === 'anim'){
				//Animate Object Move
				if(move.x){
					EmitEvent('animstartx' + movePos.x);
				} else if(move.y){
					EmitEvent('animstarty' + movePos.y);
				} else if(move.z){
					EmitEvent('animstartz' + movePos.z);
				}
			} else if(core.pathType === 'jump'){
				//Jump Object Move
				move.pos.y + core.grid.yOffset;
				ChangeSelf({property: 'position', value: movePos});
			}
			//Update core.grid with new grid pos
			core.grid.start.x = gridMovement.start.x;
			core.grid.start.y = gridMovement.start.y;
			core.grid.start.z = gridMovement.start.z;
			core.grid.end.x = gridMovement.end.x;
			core.grid.end.y = gridMovement.end.y;
			core.grid.end.z = gridMovement.end.z;

			return true;
		}
	}
	//Build Path
	const GridPath = (grid) => {
		//Update Speed & Type
		core.pathSpeed = grid.speed || 1000;
		core.pathWait = grid.wait || 1000;
		core.pathPatience = grid.patience || 3;
		core.pathRoute = grid.route || 'any';
		core.pathLoop = grid.loop || 'infinite';
		core.pathType = grid.type || 'jump';

		//Any will walk in either direction along path, each loop may continue or reverse, if blocked will reverse to start/end of path. Closed loops only
		//Circuit follows path from start to finish, if blocked it will go back to start and try again, otherwise it will keep looping. Closed loops only.
		//Alternate will walk to end of path and back, if blocked it will reverse to start/end of path and try again. Point A to Point B or Closed loops

		//Ensure Starting Position is Correct
		let startPos = posOnGrid(core.grid);

		core.position.x = startPos.x;
		if(startPos.y){
			core.position.y = startPos.y;
		}
		core.position.z = startPos.z;
		//Add Path Grid Points
		let step = 0.5;
		for(let each in grid.path){
			let steps = 1;
			for(let pos in grid.path[each]){
				if(pos === 'y'){
					if(grid.path[each][pos] > 0){
						step = 1;
					} else {
						step = -1;
					}
					steps = Math.abs(grid.path[each][pos]);
				} else {
					if(grid.path[each][pos] > 0){
						step = 0.5;
					} else {
						step = -0.5;
					}
					steps = Math.abs(grid.path[each][pos]/0.5);
				}
				for(let a = 0; a < steps; a++){
					core.gridPath.push({[pos]:step});
				}
			}
		}
		//Step Animations
		let key;
		let move;
		let currentX = core.position.x;
		let currentY = core.position.y;
		let currentZ = core.position.z;

		//Build Step Animations
		if(core.pathType === 'anim'){
			//Add 90 degree rotation anims
			for(let each in core.gridPath){
				let animMoveData = {
					name: 'animmove',
					property: 'object3D.position.x',
					to: 0,
					dur: core.pathSpeed,
					delay: 0,
					loop: false,
					dir: 'normal',
					easing: 'linear',
					elasticity: 400,
					autoplay: false,
					enabled: true,
					startEvents: 'moveXStart',
					pauseEvents: 'moveXStop',
				};
				//console.log(core.gridPath[each])
				//console.log(Object.keys(core.gridPath[each])[0])
				key = Object.keys(core.gridPath[each])[0];
				move = core.gridPath[each][key];

				animMoveData.property = 'object3D.position.' + key;
				if(key === 'x'){
					animMoveData.to = (currentX += move);
					animMoveData.name = 'animmove' + key + currentX;
					animMoveData.startEvents = 'animstart' + key + currentX;
					animMoveData.pauseEvents = 'animstop' + key + currentX;
				} else if(key === 'y'){
					animMoveData.to = (currentY += move) + core.grid.yOffset;
					animMoveData.name = 'animmove' + key + currentY;
					animMoveData.startEvents = 'animstart' + key + currentY;
					animMoveData.pauseEvents = 'animstop' + key + currentY;
				} else if(key === 'z'){
					animMoveData.to = (currentZ += move);
					animMoveData.name = 'animmove' + key + currentZ;
					animMoveData.startEvents = 'animstart' + key + currentZ;
					animMoveData.pauseEvents = 'animstop' + key + currentZ;
				}
				//Add Step Animations
				if(core.inScene){
					Animate(animMoveData);
				} else {
					if(Object.keys(core.animations).length === 0){
						core.animations = {};
					}
					delete animMoveData.name;
					core.animations['move'+each] = animMoveData;
				}
			}
		}
	}
	//Walk Along Path
	const WalkPath = () => {
		let movedX = true;
		let moveX = false;
		let movedY = true;
		let moveY = false;
		let movedZ = true;
		let moveZ = false;
		let loop = 0;
		let alternate = false;
		let stopped = 0;

		//Randomize Direction for Path Any
		if(core.pathRoute === 'any'){
			if(Math.random()*100 >50){
				alternate = true;
			}
		}
		//Alternate Direction
		function changeDirection(){
			if(alternate){
				alternate = false;
			} else {
				alternate = true;
			}
		}
		//Walk from Start of Path
		function walkFromStart(){
			core.currentPath = 0;
		}
		//Walk Forward Along Path
		function forward(){
			core.currentPath++;
			if(core.currentPath >= core.gridPath.length){
				if(core.pathLoop === 'infinite'){
				} else if(loop >= core.pathLoop){
					clearInterval(core.gridPathInterval);
				} else {
					loop++;
				}
				if(core.pathRoute === 'circuit'){
					walkFromStart();
				} else if(core.pathRoute === 'alternate'){
					walkFromEnd();
					changeDirection();
				} else if(core.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
					} else {
						walkFromEnd();
						changeDirection();
					}
				}
			}
		}
		//Walk from End of Path
		function walkFromEnd(){
			core.currentPath = core.gridPath.length-1;
		}
		//Walk Reverse Along Path
		function reverse(){
			core.currentPath--;
			if(core.currentPath < 0){
				if(core.pathLoop === 'infinite'){
				} else if(loop >= core.pathLoop){
					clearInterval(core.gridPathInterval);
				} else {
					loop++;
				}
				if(core.pathRoute === 'circuit'){
					if(alternate){
						walkFromStart();
						changeDirection();
					}
				} else if(core.pathRoute === 'alternate'){
					walkFromStart();
					changeDirection();
				} else if(core.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
						changeDirection();
					} else {
						walkFromEnd();
					}
				}
			}
		}
		//Walk Interval
		core.gridPathInterval = setInterval(() => {
			//Path Step Completed, Calc Next
			if(movedX && movedY && movedZ){
				//Path Direction
				if(core.pathRoute === 'circuit'){
					//forward();
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'alternate'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(core.pathRoute === 'any'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				}
				//Reset Path Step
				movedX = false;
				movedY = false;
				movedZ = false;
				//Step XYZ Movement
				if(core.gridPath[core.currentPath].x){
					moveX = true;
				} else {
					moveX = false;
				}
				if(core.gridPath[core.currentPath].y){
					moveY = true;
				} else {
					moveY = false;
				}
				if(core.gridPath[core.currentPath].z){
					moveZ = true;
				} else {
					moveZ = false;
				}
			}

			//X then Y then Z Movement
			if(moveX){
				if(alternate){
					movedX = GridMove({x:core.gridPath[core.currentPath].x*-1});
				} else {
					movedX = GridMove({x:core.gridPath[core.currentPath].x});
				}
				if(movedX){
					moveX = false;
					stopped = 0;
					//If X move only, ensure YZ is reset
					if(moveY){}else{
						movedY = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= core.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else if(moveY){
				if(alternate){
					movedY = GridMove({y:core.gridPath[core.currentPath].y*-1});
				} else {
					movedY = GridMove({y:core.gridPath[core.currentPath].y});
				}
				if(movedY){
					moveY = false;
					stopped = 0;
					//If Y move only, ensure XZ is reset
					if(moveX){}else{
						movedX = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= core.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else {
				if(moveZ){
					if(alternate){
						movedZ = GridMove({z:core.gridPath[core.currentPath].z*-1});
					} else {
						movedZ = GridMove({z:core.gridPath[core.currentPath].z});
					}
					if(movedZ){
						moveZ = false;
						stopped = 0;
						//If Z move only, ensure XY is reset
						if(moveX){}else{
							movedX = true;
						}
						if(moveY){}else{
							movedY = true;
						}
					} else {
						//Patience before reversing direction if blocked
						stopped++;
						if(stopped >= core.pathPatience){
							//reverse and restart
							movedX = true;
							movedY = true;
							movedZ = true;
							changeDirection();
						}
					}
				}
			}

		}, core.pathSpeed + core.pathWait);
	}
	//Change Core - Single or Array
	const ChangeCore = (propertyValue) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				core[propertyValue[each].property] = Object.assign({}, propertyValue[each].value);
			}
		} else {
			core[propertyValue.property] = Object.assign({}, propertyValue.value);
		}
	}
	//Change Element - Single or Array
	const ChangeSelf = (propertyValue, update) => {
		if(update){
			ChangeCore(propertyValue)
		}
		if(core.inScene){
			if(Array.isArray(propertyValue)){
				for(let each in propertyValue){
					if(propertyValue[each].value){
						if(propertyValue[each].value.src){
							if(auxl.loadingScene){
								if(loadNewMat){}else{
									loadNewMat = true;
									loading();
									core.el.addEventListener('loaded', loaded);
								}
							}
						}
					}
					GetEl().setAttribute(propertyValue[each].property, propertyValue[each].value);
				}
			} else {
				if(propertyValue.value){
					if(propertyValue.value.src){
						if(auxl.loadingScene){
							if(loadNewMat){}else{
								loadNewMat = true;
								loading();
								core.el.addEventListener('loaded', loaded);
							}
						}
					}
				}
				GetEl().setAttribute(propertyValue.property, propertyValue.value);
			}
		}
	}
	//Remove Element Component
	const RemoveComponent = (property) => {
		if(core.inScene){
			if(Array.isArray(property)){
				for(let each in property){
					GetEl().removeAttribute(property[each]);
				}
			} else {
				GetEl().removeAttribute(property);
			}
		}
	}
	//Physics
	//Enable Physics
	const EnablePhysics = (bodyShape) => {
		if(bodyShape?.body){
			core.body = bodyShape.body;
			if(!core.body.type){
				core.body.shape = 'dynamic';
			}
			if(!core.body.mass){
				core.body.mass = 1;
			}
			core.body.shape = 'none';
		} else if(!core.body){
			core.body = {type: 'dynamic', shape: 'none', mass: 1};
		}
		if(bodyShape?.shape){
			core.shape = bodyShape.shape;
		} else if(core.shape){
			if(core.data.geometry){
				core.shape = core.data.geometry;
				if(core.data.geometry.height){
					core.shape.offset = new THREE.Vector3(0,core.data.geometry.height/2,0);
				} else if(core.data.geometry.radius){
					core.shape.offset = new THREE.Vector3(0,core.data.geometry.radius/2,0);
				}
			} else {
				core.shape = {shape: 'box', height: 0.5, width: 0.5, depth: 0.5, offset: '0 0.25 0',};
			}
		}
		//Add Physics Body
		GetEl().setAttribute('body',core.body);
		GetEl().setAttribute('shape__core',core.shape);

		//Disable Rotation
		//GetEl().body.fixedRotation = true;
		//GetEl().body.updateMassProperties();

//console.log(auxl.playerRig.GetEl().body)
	}
	//Physics Position
	const PhysPos = (pos) => {
		if(core.el.body){
			if(core.inScene){
				core.el.body.position.copy(pos);
				core.el.object3D.position.copy(pos);
			}
		}
	}
	//Prepare Animation Input for Animate()
	function prepAnimation(animProps){
		let name = 'animation__' + animProps.name || 'animation__customAnim';
		let property = animProps.property;
		//0 is falsy
		let from = animProps.from || false;
		if(animProps.from === 0){from = 0;}
		let to = animProps.to || false;
		if(animProps.to === 0){to = 0;}
		let dur = animProps.dur || false;
		let delay = animProps.delay || false;
		let loop = animProps.loop || false;
		let dir = animProps.dir || false;
		let easing = animProps.easing || false;
		let elasticity = animProps.elasticity || false;
		let autoplay = animProps.autoplay || false;
		let enabled = animProps.enabled || false;
		let startEvents = animProps.startEvents || false;
		let pauseEvents = animProps.pauseEvents || false;
		let resumeEvents = animProps.resumeEvents || false;
		let anim = {
			property: 'object3D.rotation.y',
			to: 360,
			dur: 1000,
			delay: 0,
			loop: 'false',
			dir: 'normal',
			easing:'easeInOutSine',
			elasticity: 400,
			autoplay: 'true',
			enabled: 'true',
		};
		if(property){anim.property = property};
		//0 is falsy
		if(from || from === 0){anim.from = from};
		if(to || to === 0){anim.to = to};
		if(dur){anim.dur = dur};
		if(delay){anim.delay = delay};
		if(loop){anim.loop = loop};
		if(dir){anim.dir = dir};
		if(easing){anim.easing = easing};
		if(elasticity){anim.elasticity = elasticity};
		if(autoplay){anim.autoplay = autoplay};
		if(enabled){anim.enabled = enabled};
		if(startEvents){anim.startEvents = startEvents};
		if(pauseEvents){anim.pauseEvents = pauseEvents};
		if(resumeEvents){anim.resumeEvents = resumeEvents};

		return {name, anim}
	}
	//Add Animation to Element - Single or Array
	const Animate = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				let animation = prepAnimation(animProps[each]);
				GetEl().setAttribute(animation.name, animation.anim);
			}
		} else {
			let animation = prepAnimation(animProps);
			GetEl().setAttribute(animation.name, animation.anim);
		}
	}
	//Emit Event from Entity Element - Single or Array
	const EmitEvent = (eventName, bubbles) => {
		if(core.inScene){
			if(Array.isArray(eventName)){
				for(let each in eventName){
					GetEl().emit(eventName[each],{bubbles});
				}
			} else {
				GetEl().emit(eventName,{bubbles});
			}
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				core[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: core.id, type: 'core', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			core[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: core.id, type: 'core', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(core(flag[each]));
			}
			return flagArray;
		} else {
			return core[flag];
		}
	}
	//Update Core Classes
	const DomClass = (domClasses, wipe, update) => {
		//Wipe
		if(wipe){
			core.el.classList.remove(...core.classes);
			core.classes = [];
		}
		if(core.inScene){
			if(Array.isArray(domClasses)){
				core.el.classList.add(...domClasses)
				if(update){
					domClasses.forEach(each => core.classes.push(each))
				}
			} else {
				core.el.classList.add(domClasses);
				if(update){
					core.classes.push(domClasses);
				}
			}
		}
	}
	//Prep Details for Scene Display
	const prepDetails = (text, position, textColor, windowColor, windowWidth, windowHeight) => {
		core.isOpen = false;
		//Main Screen
		core.detailMain = auxl.Core(auxl.detailMainData);
		//Close Button
		core.detailClose = auxl.Core(auxl.detailCloseData);
		//Update Position
		if(position){
			core.detailMain.core.position.x = position.x;
			core.detailMain.core.position.y = position.y;
			core.detailMain.core.position.z = position.z;
		} else {
			core.detailMain.core.position.x = core.position.x + 0.1;
			core.detailMain.core.position.y = core.position.y + 0.75;
			core.detailMain.core.position.z = core.position.z + 0.25;
		}
		if(windowColor){
			core.detailMain.core.material.color = windowColor;
		}

		if(text){
			core.detailMain.core.text.value = text;
		} else {
			if(core.detail){
				core.detailMain.core.text.value = core.detail;
			}
		}
		if(textColor){
			core.detailMain.core.text.color = textColor;
		}

		if(windowWidth){
			core.detailMain.core.geometry.width = windowWidth;
			//update close position based on geometry change
			core.detailClose.core.position.x = windowHeight/2;
		}
		if(windowHeight){
			core.detailMain.core.geometry.height = windowHeight;
			//update close position based on geometry change
			core.detailClose.core.position.y = windowHeight/2;
		}

		//Detail Layer
		core.detailLayer = {
			parent: {core: core.detailMain}, 
			child0: {core: core.detailClose},
		}
		core.detailAll = auxl.Layer('detailAll',core.detailLayer);
		details = true;
	}
	//Open Details Support
	function detailPrompt_open(){
	let elGenDelay = setTimeout(function () {
		core.detailMain.core.el.emit('open',{});
		core.detailClose.core.el.emit('open',{});
		core.isOpen = true;
		clearTimeout(elGenDelay);
	}, 25);
	}
	//Close Details Support
	function detailPrompt_close(){
		core.detailMain.core.el.emit('close',{});
		core.detailClose.core.el.emit('close',{});
		let elDelDelay = setTimeout(function () {
			core.detailAll.DespawnLayer();
			core.isOpen = false;
			clearTimeout(elDelDelay);
		}, 550);
	}
	//Toggle Details Support
	function openClose(){
		function closePrompt(){
			core.detailClose.core.el.removeEventListener('click',closePrompt);
			core.isOpen = detailPrompt_close();
		}
		if(core.isOpen){
			core.isOpen = detailPrompt_close();
			core.detailClose.core.el.removeEventListener('click',closePrompt);
		} else {
			core.detailAll.SpawnLayer();
			core.isOpen = detailPrompt_open();
			core.detailClose.core.el.addEventListener('click', closePrompt);
		}
	}
	//Enable Details Window on Click
	const EnableDetail = (detailInfo) => {
		if(details){} else {
			prepDetails(detailInfo.text, detailInfo.position, detailInfo.textColor, detailInfo.windowColor, detailInfo.windowWidth, detailInfo.windowHeight);
		}
			GetEl().addEventListener('click', openClose);
	}
	//Disable Details Window
	const DisableDetail = () => {
		if(core.isOpen){
			core.isOpen = detailPrompt_close();
		}
		GetEl().removeEventListener('click', openClose);
	}
	//Change Material Src
	const ChangeMatSrc = (src) => {
		if(core.inScene){
			if(auxl.loadingScene){
				if(loadNewMat){}else{
					loadNewMat = true;
					loading();
					core.el.addEventListener('loaded', loaded);
				}
			}
			GetEl().setAttribute('material', {src});
		}
	}
	return {core, Generate, SpawnCore, DespawnCore, ToggleSpawn, GetEl, SpawnCoreOnGrid, ToggleCoreGridSpawn, RemoveComponent, GridMove, GridPath, WalkPath, ChangeSelf, ChangeCore, EnablePhysics, PhysPos, Animate, EmitEvent, SetFlag, GetFlag, DomClass, EnableDetail, DisableDetail, ChangeMatSrc};
}
//
//Generate new Core Data from Template
const coreDataFromTemplate = (auxl, data, edit, assign) => {
	//Omit element & parent data that contains reference to original
	let newCoreData = auxl.ShallowOmit(data, 'el', 'parent', );
	newCoreData = JSON.parse(JSON.stringify(newCoreData));
	//Apply Edits
	if(edit){
		for(let each in edit){
			newCoreData[each] = edit[each];
		}
	}
	//Prevent Overwritting
	if(assign){}else{
		if(!edit.id){
			newCoreData.id = auxl.ranNameGen();
		}
		newCoreData.id = auxl.checkDupeName(newCoreData.id);
	}
	//Output
	if(assign){
		return newCoreData;
	} else {
		auxl[newCoreData.id] = newCoreData;
	}
}
//Generate new Core from Template
const coreFromTemplate = (auxl, core, edit, assign) => {
	//Prevent Overwritting
	if(assign){}else{
		if(edit){
			if(!edit.id){
				edit.id = auxl.ranNameGen();
			}
		} else {
			edit = {};
			edit.id = auxl.ranNameGen();
		}
		edit.id = auxl.checkDupeName(edit.id);
	}
	let newCoreData = auxl.coreDataFromTemplate(core.core, edit, true);
	//Output
	if(assign){
		return auxl.Core(newCoreData)
	} else {
		auxl[newCoreData.id] = auxl.Core(newCoreData);
	}
}
//
//Layered Cores
//Multiple Entity Cores Combined
const Layer = (auxl, id, data, update) => {
	let layer = {id};
	layer.config = data.config || false;

	layer.all = auxl.ShallowOmit(data, 'config');
	layer.inScene = false;
	layer.allNames = [];
	layer.children = {};
	layer.tempParents = [];
	layer.parent = false;
	layer.gridSpawned = false;
	layer.gridPath = [];
	layer.pathSpeed = 1000;
	layer.pathWait = 1000;
	layer.pathRoute = 'any';
	layer.pathLoop = 'infinite';
	layer.pathType = 'jump';
	layer.currentPath = -1;
	layer.gridPathInterval;
	layer.gridPathTimeout;
	//Layer Config
	if(layer.config){
		for(let each in layer.config){
			layer[each] = layer.config[each];
		}
	}
	//Manual Override Config
	if(update){
		for(let each in update){
			layer[each] = update[each];
		}
	}
	//Order of Elements Added to Scene
	let accessOrder = [];

	//Spawn Multi Entity Object
	const SpawnLayer = (parent) => {
		layer.parent = parent || false;
		if(parent){
			if(parent.core){
				//console.log('Core')
				if(parent.core.inScene){
					layer.parent = parent.GetEl();
				} else {
					layer.parent = false;
				}
			} else if(parent.layer){
				//console.log('Layer')
				if(parent.layer.inScene){
					layer.parent = parent.GetParentEl();
				} else {
					layer.parent = false;
				}
			} else if(parent.id){
				//console.log('Entity')
				layer.parent = parent;
			} else if(typeof parent === 'string'){
				//console.log('ID')
				if(document.getElementById(parent)){
					layer.parent = document.getElementById(parent);
				} else {
					layer.parent = false;
				}
			}
			if(!layer.parent){
				console.log(id);
				console.log(parent);
				console.log(document.getElementById(parent));
				console.log('Parent is not in scene!');
			}
		}
		if(layer.inScene){}else{
			let currentParent = layer.parent;
			let previousParent = false
			function spawnSection(sectionParent, object, depth) {
				currentParent = sectionParent || false;
				//New Depth Parent
				if(object.parent){
					layer.tempParents[depth] = object.parent.core.core.id;
				}
				for(let key in object){
					if(object.hasOwnProperty(key)){
						if(key === 'core'){
						//Access Order
						if(accessOrder.length === depth){
							accessOrder.push([]);
						}
						accessOrder[depth].push(object[key]);
						layer.allNames.push(object[key].core.id);
						//Skip Parent Spawns
						if(object[key].core.id === layer.all.parent.core.core.id || object[key].core.id === currentParent || object[key].core.id === layer.tempParents[depth] || object[key].core.id === layer.tempParents[depth-1]){} else {
							//Spawning Child
							layer.children[object[key].core.id] = {obj: object[key], parent: currentParent};
							object[key].SpawnCore(currentParent);
						}
						} else if(key === "parent" && object[key].hasOwnProperty('core')){
							//Access Order of Elements
							if(accessOrder.length === depth){
								accessOrder.push([]);
							}
							accessOrder[depth].push(object[key].core);

							//Update Current Parent
							if(object[key].core.core.id === layer.all.parent.core.core.id){
								//Main Layer Parent
								currentParent = layer.parent;
							} else if(object[key].core.core.id === currentParent || object[key].core.core.id === layer.tempParents[depth]){
								//Previous Depth Parent
								currentParent = layer.tempParents[depth-1];
							} else {
								//Current Depth Parent
								currentParent = layer.tempParents[depth];
							}

							//Spawn
							layer.children[object[key].core.id] = {obj: object[key], parent: currentParent};
							object[key].core.SpawnCore(currentParent);

							//Continue
							spawnSection(currentParent, object[key], depth + 1);
						} else if(typeof object[key] === 'object'){
							//Update Current Parent
							if(object[key].parent){
								currentParent = object[key].parent;
							} else {
								currentParent = layer.tempParents[depth];
							}
							//Continue
							spawnSection(currentParent, object[key], depth + 1);
						}
					}
				}
			}
			spawnSection(layer.parent, layer.all, 0);
			layer.inScene = true;
		}
	}
	//Despawn Multi Entity Object
	const DespawnLayer = () => {
		if(layer.inScene){
			//Clear Core Timeout/Intervals
			clearTimeout(layer.gridPathTimeout);
			clearInterval(layer.gridPathInterval);
			//Collision
			if(layer.gridSpawned){
				if(layer.grid.collide){
					auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, false);
				} else if(layer.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, false);
				}
			}
			let removeOrder = [...accessOrder];
			removeOrder.reverse();
			let levelOrder;
			for(let layer of removeOrder){
				levelOrder = [...layer];
				levelOrder.reverse();
				for(let each of levelOrder){
					each.DespawnCore();
				}
			}
			//Scene Tracking Support
			if(auxl.ExistsInTracker(layer.id)){
				auxl.RemoveFromTracker(layer.id);
			}
			layer.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = (parent) => {
		let newParent = parent || false;
		if(newParent){
			layer.parent = newParent;
		}
		if(layer.inScene){
			DespawnLayer();
		} else {
			SpawnLayer(layer.parent);
		}
	}
	//PosOnGrid
	function posOnGrid(grid){
		let pos = new THREE.Vector3(0,0,0);
		if(grid.start.x === grid.end.x && grid.start.z === grid.end.z){
			pos.x = grid.start.x;
			pos.z = grid.start.z;
		} else {
			let xDif = (grid.start.x - grid.end.x)*-1;
			let zDif = (grid.start.z - grid.end.z)*-1;
			xDif /= 2;
			zDif /= 2;
			pos.x = grid.start.x + xDif;
			pos.z = grid.start.z + zDif;
		}
		pos.y = grid.start.y;
		return pos;
	}
	//Spawn on Grid
	const SpawnLayerOnGrid = (grid) => {
		//Start should always be less than or equal to end
		//Start from top left to bottom right

		//Grid goes from 0 - 2 takes up 5 grid spaces of 0, 0.5, 1, 1.5, 2
		//5 spaces of 0.5 equals 2.5, so width or height would be 2.5
		if(layer.inScene){}else{
			if(grid){
				layer.grid = grid;
			}
			//Ensure Grid Y Level is Set
			if(layer.grid.start.y){} else {
				layer.grid.start.y = 0;
			}
			if(layer.grid.end.y){} else {
				layer.grid.end.y = 0;
			}
			if(layer.grid.yOffset){} else {
				layer.grid.yOffset = 0;
			}
			layer.grid.height = Math.abs(layer.grid.start.y) + Math.abs(layer.grid.end.y) + 1;
			//Prevent Player Collision Overlap
			let playerGrid = auxl.player.GetPlayerInfo().grid;
			if(layer.grid.start.x <= playerGrid.x && layer.grid.end.x >= playerGrid.x && layer.grid.start.y <= playerGrid.y && layer.grid.end.y >= playerGrid.y && layer.grid.start.z <= playerGrid.z && layer.grid.end.z >= playerGrid.z){
				//Wait to Spawn till Player moves out of Range
				auxl.map.WaitToSpawn({name:layer.id, func: 'SpawnLayerOnGrid'});
			} else {
				//Grid Position
				let startPos = posOnGrid(layer.grid);
				layer.all.parent.core.core.position.x = startPos.x;
				//layer.all.parent.core.core.position.y = layer.all.parent.core.core.position.y + startPos.y;
				layer.all.parent.core.core.position.y = layer.grid.yOffset + startPos.y;
				layer.all.parent.core.core.position.z = startPos.z;
				//Spawn Layer
				SpawnLayer();
				//Collision or Trigger Map Update
				if(layer.grid.collide){
					auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, layer.grid.collide);
				} else if(layer.grid.trigger){
					auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, layer.grid.trigger);
				}
				layer.gridSpawned = true;
			}
		}
	}
	//Toggle Grid Spawn
	const ToggleLayerGridSpawn = (grid) => {
		if(layer.inScene){
			DespawnFromGrid();
		} else {
			SpawnOnGrid(grid);
		}
	}
	//Move on Grid
	const GridMove = (move, type) => {
		//with new start/end coords, check if free, if so move, otherwise wait till it is cleared
		//let gridMovement = {start:{x:0, z:-5}, end: {x:0, z:-5}};
		let gridMovement = {start:{}, end: {}};
		gridMovement.start.x = layer.grid.start.x;
		gridMovement.start.y = layer.grid.start.y;
		gridMovement.start.z = layer.grid.start.z;
		gridMovement.end.x = layer.grid.end.x;
		gridMovement.end.y = layer.grid.end.y;
		gridMovement.end.z = layer.grid.end.z;
		//Calc X
		if(move.x){
			gridMovement.start.x += move.x;
			gridMovement.end.x += move.x;
		}
		//Calc Y
		if(move.y){
			gridMovement.start.y += move.y;
			gridMovement.end.y += move.y;
		}
		//Calc Z
		if(move.z){
			gridMovement.start.z += move.z;
			gridMovement.end.z += move.z;
		}
		//Actual Position to Move Into
		let movePos = posOnGrid(gridMovement);
		movePos.y = layer.all.parent.core.core.position.y + movePos.y;
		//Collision Move Checks
		if(layer.grid.collide){
			if(auxl.map.CheckMapAreaSansArea(layer.grid, gridMovement, layer.grid.height)){
				//console.log('free')
				//Clear previous grid pos
				auxl.map.UpdateMapArea(layer.id, layer.grid.start, layer.grid.end, false);
				//Update new grid pos
				auxl.map.UpdateMapArea(layer.id, gridMovement.start, gridMovement.end, true);
				//Move Object
				if(layer.pathType === 'anim'){
					//Animate Object Move
					if(move.x){
						EmitEventParent('animstartx' + movePos.x);
					} else if(move.y){
						EmitEventParent('animstarty' + movePos.y);
					} else if(move.z){
						EmitEventParent('animstartz' + movePos.z);
					}
				} else if(layer.pathType === 'jump'){
					//Jump Object Move
					ChangeParent({property: 'position', value: movePos});
				}
				//Update core.grid with new grid pos
				layer.grid.start.x = gridMovement.start.x;
				layer.grid.start.y = gridMovement.start.y;
				layer.grid.start.z = gridMovement.start.z;
				layer.grid.end.x = gridMovement.end.x;
				layer.grid.end.y = gridMovement.end.y;
				layer.grid.end.z = gridMovement.end.z;
				return true;
			} else {
				//console.log('not free')
				return false;
			}
		} else if(layer.grid.trigger){
			//Clear previous grid pos
			auxl.map.UpdateMapAreaTrigger(layer.id, layer.grid.start, layer.grid.end, false);
			//Update new grid pos
			auxl.map.UpdateMapAreaTrigger(layer.id, gridMovement.start, gridMovement.end, true);
			//Move Object
			if(layer.pathType === 'anim'){
				//Animate Object Move
				if(move.x){
					EmitEventParent('animstartx' + movePos.x);
				} else if(move.y){
					EmitEventParent('animstarty' + movePos.y);
				} else if(move.z){
					EmitEventParent('animstartz' + movePos.z);
				}
			} else if(layer.pathType === 'jump'){
				//Jump Object Move
				ChangeParent({property: 'position', value: movePos});
			}
			//Update core.grid with new grid pos
			layer.grid.start.x = gridMovement.start.x;
			layer.grid.start.y = gridMovement.start.y;
			layer.grid.start.z = gridMovement.start.z;
			layer.grid.end.x = gridMovement.end.x;
			layer.grid.end.y = gridMovement.end.y;
			layer.grid.end.z = gridMovement.end.z;
			return true;
		}
	}
	//Build Path
	const GridPath = (grid) => {
		//Update Speed & Type
		layer.pathSpeed = grid.speed || 1000;
		layer.pathWait = grid.wait || 1000;
		layer.pathPatience = grid.patience || 3;
		layer.pathRoute = grid.route || 'any';
		layer.pathLoop = grid.loop || 'infinite';
		layer.pathType = grid.type || 'jump';

		//Any will walk in either direction along path, each loop may continue or reverse, if blocked will reverse to start/end of path. Closed loops only
		//Circuit follows path from start to finish, if blocked it will go back to start and try again, otherwise it will keep looping. Closed loops only.
		//Alternate will walk to end of path and back, if blocked it will reverse to start/end of path and try again. Point A to Point B or Closed loops

		//Ensure Starting Position is Correct
		let startPos = posOnGrid(layer.grid);
		layer.all.parent.core.core.position.x = startPos.x;
		if(startPos.y){
			layer.all.parent.core.core.position.y = layer.all.parent.core.core.position.y + startPos.y;
		}
		layer.all.parent.core.core.position.z = startPos.z;

		//Add Path Grid Points
		let step = 0.5;
		for(let each in grid.path){
			let steps = 1;
			for(let pos in grid.path[each]){
				if(grid.path[each][pos] > 0){
					step = 0.5;
				} else {
					step = -0.5;
				}
				if(pos === 'y'){
					steps = Math.abs(grid.path[each][pos]);
				} else {
					steps = Math.abs(grid.path[each][pos])/0.5;
				}
				for(let a = 0; a < steps; a++){
					layer.gridPath.push({[pos]:step});
				}
			}
		}

		//Step Animations
		let key;
		let move;
		let currentX = layer.all.parent.core.core.position.x;
		let currentY = layer.all.parent.core.core.position.y;
		let currentZ = layer.all.parent.core.core.position.z;

		//Build Step Animations
		if(layer.pathType === 'anim'){
			//Add 90 degree rotation anims

			for(let each in layer.gridPath){
				let animMoveData = {
					name: 'animmove',
					property: 'object3D.position.x',
					to: 0,
					dur: layer.pathSpeed,
					delay: 0,
					loop: false,
					dir: 'normal',
					easing: 'linear',
					elasticity: 400,
					autoplay: false,
					enabled: true,
					startEvents: 'moveXStart',
					pauseEvents: 'moveXStop',
				};
				//console.log(layer.gridPath[each])
				//console.log(Object.keys(layer.gridPath[each])[0])
				key = Object.keys(layer.gridPath[each])[0];
				move = layer.gridPath[each][key];

				animMoveData.property = 'object3D.position.' + key;
				if(key === 'x'){
					animMoveData.to = (currentX += move);
					animMoveData.name = 'animmove' + key + currentX;
					animMoveData.startEvents = 'animstart' + key + currentX;
					animMoveData.pauseEvents = 'animstop' + key + currentX;
				} else if(key === 'y'){
					animMoveData.to = (currentY += move);
					animMoveData.name = 'animmove' + key + currentY;
					animMoveData.startEvents = 'animstart' + key + currentY;
					animMoveData.pauseEvents = 'animstop' + key + currentY;
				} else if(key === 'z'){
					animMoveData.to = (currentZ += move);
					animMoveData.name = 'animmove' + key + currentZ;
					animMoveData.startEvents = 'animstart' + key + currentZ;
					animMoveData.pauseEvents = 'animstop' + key + currentZ;
				}
				//Add Step Animations
				if(layer.inScene){
					AnimateParent(animMoveData);
				} else {
					if(Object.keys(layer.all.parent.core.core.animations).length === 0){
						layer.all.parent.core.core.animations = {};
					}
					delete animMoveData.name;
					layer.all.parent.core.core.animations['move'+each] = animMoveData;
				}
			}
		}
	}
	//Walk Along Path
	const WalkPath = () => {
		let movedX = true;
		let moveX = false;
		let movedY = true;
		let moveY = false;
		let movedZ = true;
		let moveZ = false;
		let loop = 0;
		let alternate = false;
		let stopped = 0;

		//Randomize Direction for Path Any
		if(layer.pathRoute === 'any'){
			if(Math.random()*100 >50){
				alternate = true;
			}
		}
		//Alternate Direction
		function changeDirection(){
			if(alternate){
				alternate = false;
			} else {
				alternate = true;
			}
		}
		//Walk from Start of Path
		function walkFromStart(){
			layer.currentPath = 0;
		}
		//Walk Forward Along Path
		function forward(){
			layer.currentPath++;
			if(layer.currentPath >= layer.gridPath.length){
				if(layer.pathLoop === 'infinite'){
				} else if(loop >= layer.pathLoop){
					clearInterval(layer.gridPathInterval);
				} else {
					loop++;
				}
				if(layer.pathRoute === 'circuit'){
					walkFromStart();
				} else if(layer.pathRoute === 'alternate'){
					walkFromEnd();
					changeDirection();
				} else if(layer.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
					} else {
						walkFromEnd();
						changeDirection();
					}
				}
			}
		}
		//Walk from End of Path
		function walkFromEnd(){
			layer.currentPath = layer.gridPath.length-1;
		}
		//Walk Reverse Along Path
		function reverse(){
			layer.currentPath--;
			if(layer.currentPath < 0){
				if(layer.pathLoop === 'infinite'){
				} else if(loop >= layer.pathLoop){
					clearInterval(layer.gridPathInterval);
				} else {
					loop++;
				}
				if(layer.pathRoute === 'circuit'){
					if(alternate){
						walkFromStart();
						changeDirection();
					}
				} else if(layer.pathRoute === 'alternate'){
					walkFromStart();
					changeDirection();
				} else if(layer.pathRoute === 'any'){
					if(Math.random()*100 >50){
						walkFromStart();
						changeDirection();
					} else {
						walkFromEnd();
					}
				}
			}
		}
		//Walk Interval
		layer.gridPathInterval = setInterval(() => {
			//Path Step Completed, Calc Next
			if(movedX && movedY && movedZ){
				//Path Direction
				if(layer.pathRoute === 'circuit'){
					//forward();
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(layer.pathRoute === 'alternate'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				} else if(layer.pathRoute === 'any'){
					if(alternate){
						reverse();
					} else {
						forward();
					}
				}
				//Reset Path Step
				movedX = false;
				movedY = false;
				movedZ = false;
				//Step XYZ Movement
				if(layer.gridPath[layer.currentPath].x){
					moveX = true;
				} else {
					moveX = false;
				}
				if(layer.gridPath[layer.currentPath].y){
					moveY = true;
				} else {
					moveY = false;
				}
				if(layer.gridPath[layer.currentPath].z){
					moveZ = true;
				} else {
					moveZ = false;
				}
			}

			//X then Y then Z Movement
			if(moveX){
				if(alternate){
					movedX = GridMove({x:layer.gridPath[layer.currentPath].x*-1});
				} else {
					movedX = GridMove({x:layer.gridPath[layer.currentPath].x});
				}
				if(movedX){
					moveX = false;
					stopped = 0;
					//If X move only, ensure YZ is reset
					if(moveY){}else{
						movedY = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= layer.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else if(moveY){
				if(alternate){
					movedY = GridMove({y:layer.gridPath[layer.currentPath].y*-1});
				} else {
					movedY = GridMove({y:layer.gridPath[layer.currentPath].y});
				}
				if(movedY){
					moveY = false;
					stopped = 0;
					//If Y move only, ensure XZ is reset
					if(moveX){}else{
						movedX = true;
					}
					if(moveZ){}else{
						movedZ = true;
					}
				} else {
					//Patience before reversing direction if blocked
					stopped++;
					if(stopped >= layer.pathPatience){
						//reverse and restart
						movedX = true;
						movedY = true;
						movedZ = true;
						changeDirection();
					}
				}
			} else {
				if(moveZ){
					if(alternate){
						movedZ = GridMove({z:layer.gridPath[layer.currentPath].z*-1});
					} else {
						movedZ = GridMove({z:layer.gridPath[layer.currentPath].z});
					}
					if(movedZ){
						moveZ = false;
						stopped = 0;
						//If Z move only, ensure XY is reset
						if(moveX){}else{
							movedX = true;
						}
						if(moveY){}else{
							movedY = true;
						}
					} else {
						//Patience before reversing direction if blocked
						stopped++;
						if(stopped >= layer.pathPatience){
							//reverse and restart
							movedX = true;
							movedY = true;
							movedZ = true;
							changeDirection();
						}
					}
				}
			}

		}, layer.pathSpeed + layer.pathWait);
	}
	//Return Parent Element in Scene
	const GetParentEl = (refresh) => {
		return layer.all.parent.core.GetEl(refresh);
	}
	//Return a Child Element in Scene
	const GetChildEl = (child, refresh) => {
		let childCore = GetChild(child);
		if(childCore){
			return childCore.GetEl(refresh);
		}
	}
	//Return Only Child Elements in Scene
	const GetAllChildEl = (refresh) => {
		let allEl = [];
		for(let each in layer.allNames){
			if(layer.allNames[each] === layer.all.parent.core.core.id){} else {
				allEl.push(GetChildEl(layer.allNames[each], refresh));
			}
		}
		return allEl;
	}
	//Return All Elements in Scene
	const GetAllEl = (refresh) => {
		let allEl = [];
		for(let each in layer.allNames){
			allEl.push(GetChildEl(layer.allNames[each], refresh));
		}
		return allEl;
	}
	//Emit Event from Parent Entity Element - Single or Array
	const EmitEventParent = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				layer.all.parent.core.EmitEvent(eventName[each]);
			}
		} else {
			layer.all.parent.core.EmitEvent(eventName);
		}
	}
	//Emit Event from a Child Entity Element - Single or Array
	const EmitEventChild = (child, eventName) => {
		let childCore = GetChild(child);

		if(Array.isArray(eventName)){
			for(let each in eventName){
				childCore.EmitEvent(eventName[each]);
			}
		} else {
			childCore.EmitEvent(eventName);
		}
	}
	//Emit Event from All Entity Elements - Single or Array
	const EmitEventAll = (eventName) => {
		if(Array.isArray(eventName)){
			for(let each in eventName){
				for(let section of accessOrder){
					for(let indv of section){
						indv.EmitEvent(eventName[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.EmitEvent(eventName);
				}
			}
		}
	}
	//Change Parent Element - Single or Array
	const ChangeParent = (propertyValue, update) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				layer.all.parent.core.ChangeSelf(propertyValue[each], update);
			}
		} else {
			layer.all.parent.core.ChangeSelf(propertyValue, update);
		}
	}
	//Change Child Element - Single or Array
	const ChangeChild = (child, propertyValue, update) => {
		let childCore = GetChild(child);
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				childCore.ChangeSelf(propertyValue[each]);
			}
		} else {
			childCore.ChangeSelf(propertyValue);
		}
	}
	//Change All Elements - Single or Array
	const ChangeAll = (propertyValue, update) => {
		if(Array.isArray(propertyValue)){
			for(let each in propertyValue){
				for(let section of accessOrder){
					for(let indv of section){
						indv.ChangeSelf(propertyValue[each], update);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.ChangeSelf(propertyValue, update);
				}
			}
		}
	}
	//Remove Parent Element Component - Single or Array
	const RemoveComponentParent = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				layer.all.parent.core.RemoveComponent(property[each]);
			}
		} else {
			layer.all.parent.core.RemoveComponent(property);
		}
	}
	//Remove Child Element Component - Single or Array
	const RemoveComponentChild = (child, property) => {
		let childCore = GetChild(child);
		if(Array.isArray(property)){
			for(let each in property){
				childCore.RemoveComponent(property[each]);
			}
		} else {
			childCore.RemoveComponent(property);
		}
	}
	//Remove All Elements Component - Single or Array
	const RemoveComponentAll = (property) => {
		if(Array.isArray(property)){
			for(let each in property){
				for(let section of accessOrder){
					for(let indv of section){
						indv.RemoveComponent(property[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.RemoveComponent(property);
				}
			}
		}
	}
	//Add Animation to Parent Element - Single or Array
	const AnimateParent = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				layer.all.parent.core.Animate(animProps[each]);
			}
		} else {
			layer.all.parent.core.Animate(animProps);
		}
	}
	//Add Animation to Child Element - Single or Array
	const AnimateChild = (child, animProps) => {
		let childCore = GetChild(child);
		if(Array.isArray(animProps)){
			for(let each in animProps){
				childCore.Animate(animProps[each]);
			}
		} else {
			childCore.Animate(animProps);
		}
	}
	//Add Animation to All Elements - Single or Array
	const AnimateAll = (animProps) => {
		if(Array.isArray(animProps)){
			for(let each in animProps){
				for(let section of accessOrder){
					for(let indv of section){
						indv.Animate(animProps[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.Animate(animProps);
				}
			}
		}
	}
	//Set Flag & Value to Parent Object - Single or Array
	const SetFlagParent = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				layer.all.parent.core.SetFlag(flagValue[each]);
			}
		} else {
			layer.all.parent.core.SetFlag(flagValue);
		}
	}
	//Set Flag & Value to Child Object - Single or Array
	const SetFlagChild = (child, flagValue) => {
		let childCore = GetChild(child);
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				childCore.SetFlag(flagValue[each]);
			}
		} else {
			childCore.SetFlag(flagValue);
		}
	}
	//Set Flag & Value to All Objects - Single or Array
	const SetFlagAll = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				for(let section of accessOrder){
					for(let indv of section){
						indv.SetFlag(flagValue[each]);
					}
				}
			}
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					indv.SetFlag(flagValue);
				}
			}
		}
	}
	//Retreive Flag Value from Parent Object - Single or Array
	const GetFlagParent = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(layer.all.parent.core.GetFlag(flag[each]));
			}
			return flagArray;
		} else {
			return layer.all.parent.core.GetFlag(flag);
		}
	}
	//Retreive Flag Value from Child Object - Single or Array
	const GetFlagChild = (child, flag) => {
		let childCore = GetChild(child);
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(childCore.GetFlag(flag[each]));
			}
			return flagArray;
		} else {
			return childCore.GetFlag(flag);
		}
	}
	//Retreive Flag Value from All Objects - Single or Array
	const GetFlagAll = (flag) => {
		let allObjects = [];
		if(Array.isArray(flag)){
			for(let each in flag){
				let flagArray = [];
				for(let section of accessOrder){
					for(let indv of section){
						flagArray.push(indv.GetFlag(flag[each]));
					}
				}
				allObjects.push(flagArray);
			}
			return allObjects;
		} else {
			for(let section of accessOrder){
				for(let indv of section){
					allObjects.push(indv.GetFlag(flag));
				}
			}
			return allObjects;
		}
	}
	//Dom Class Parent
	const DomClassParent = (domClasses, wipe, update) => {
		layer.all.parent.core.DomClass(domClasses, wipe, update);
	}
	//Dom Class Child
	const DomClassChild = (child, domClasses, wipe, update) => {
		let childCore = GetChild(child);
		childCore.DomClass(domClasses, wipe, update);
	}
	//Dom Class All
	const DomClassAll = (domClasses, wipe, update) => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.DomClass(domClasses, wipe, update);
			}
		}
	}
	//Enable Details for Parent Object
	const EnableDetailParent = (detailInfo) => {
		layer.all.parent.core.EnableDetail(detailInfo);
	}
	//Enable Details for Child Object
	const EnableDetailChild = (child, detailInfo) => {
		GetChild(child).EnableDetail(detailInfo);
	}
	//Enable Details for All Objects
	const EnableDetailAll = (detailInfo) => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.EnableDetail(detailInfo);
			}
		}
	}
	//Disable Details for Parent Object
	const DisableDetailParent = () => {
		layer.all.parent.core.DisableDetail();
	}
	//Disable Details for Child Object
	const DisableDetailChild = (child) => {
		GetChild(child).DisableDetail();
	}
	//Disable Details for All Objects
	const DisableDetailAll = () => {
		for(let section of accessOrder){
			for(let indv of section){
				indv.DisableDetail();
			}
		}
	}
	//Support by returning child core object from name
	const GetChild = (childName) => {
		let result = [];
		function traverse(object, depth) {
			for (let key in object) {
				if (object.hasOwnProperty(key)) {
					if (key === 'core') {
						if(object[key].core.id === childName){
							result.push(object[key]);
							return;
						}
					} else if (key === "parent" && object[key].hasOwnProperty('core')) {
						if(object[key].core.core.id === childName){
							result.push(object[key].core);
							return;
						}
					} else if (typeof object[key] === 'object') {
						traverse(object[key], depth + 1);
					}
				}
			}
		}

		traverse(layer.all, 0);
		if(result[0]){
			return result[0];
		} else {
			console.log('Unable to find child');
			console.log(childName)
			return false;
		}
	}

	return {layer, SpawnLayer, DespawnLayer, ToggleSpawn, SpawnLayerOnGrid, ToggleLayerGridSpawn, GridMove, GridPath, WalkPath, GetParentEl, GetChildEl, GetAllChildEl, GetAllEl, EmitEventParent, EmitEventChild, EmitEventAll, ChangeParent, ChangeChild, ChangeAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, AnimateParent, AnimateChild, AnimateAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, DomClassParent, DomClassChild, DomClassAll, EnableDetailParent, EnableDetailChild, EnableDetailAll, DisableDetailParent, DisableDetailChild, DisableDetailAll, GetChild};
}
//
//Generate new Layer from Layer Data Template
const layerDataFromTemplate = (auxl, data, nameScheme, changeParent, layerConfig, assign) => {
	let id = nameScheme || auxl.ranNameGen();
	id = auxl.checkDupeName(id);
	let newStruct = {};
	let num = 0;
	//Prep Parent Core Name
	if(changeParent){
		if(changeParent.id){}else{
			changeParent.id = id+num;
		}
	} else {
		changeParent = {};
		changeParent.id = id+num;
	}
	changeParent.id = auxl.checkDupeName(changeParent.id);
	//Traverse Layer Data Object
	function layerTraverse(structure, newStructure){
		for(let level in structure){
			if(structure[level].core){
				newStructure[level] = {};
				if(num === 0){
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, changeParent, true);
				} else {
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, {id:auxl.checkDupeName(id+num)}, true);
				}
				num++;
			} else {
				newStructure[level] = {};
				layerTraverse(structure[level], newStructure[level]);
			}
		}
	}
	layerTraverse(data, newStruct);
	//Update Parent
	if(changeParent){
		for(let each in changeParent){
			newStruct.parent.core.core[each] = changeParent[each];
		}
	}
	//Add any Layer configs
	if(layerConfig){
		newStruct.config = {...layerConfig};
	}
	//Output
	if(assign){
		return newStruct;
	} else {
		auxl[id] = newStruct;
	}
}
//Generate new Layer from Layer Template
const layerFromTemplate = (auxl, layer, id, changeParent, layerConfig, assign) => {
	let struct;
	let newStruct = {};
	let num = 0;
	//Prevent Overwritting
	if(assign){}else{
		if(!id){
			id = auxl.ranNameGen();
		}
		id = auxl.checkDupeName(id);
	}
	//Prep Parent Core Name
	if(changeParent){
		if(changeParent.id){}else{
			changeParent.id = id+num;
		}
	} else {
		changeParent = {};
		changeParent.id = id+num;
	}
	changeParent.id = auxl.checkDupeName(changeParent.id);
	//Assign Layout from Existing Layer or Layer Data
	if(layer.layer){
		struct = layer.layer.all;
	} else {
		struct = layer;
	}
	//Traverse Layer Data Object
	function layerTraverse(structure, newStructure){
		for(let level in structure){
			if(structure[level].core){
				newStructure[level] = {};
				if(num === 0){
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, changeParent, true);
				} else {
					newStructure[level].core = auxl.coreFromTemplate(structure[level].core, {id:auxl.checkDupeName(id+num)}, true);
				}
				num++;
			} else {
				newStructure[level] = {};
				layerTraverse(structure[level], newStructure[level]);
			}
		}
	}
	layerTraverse(struct, newStruct);
	//Update Parent
	if(changeParent){
		for(let each in changeParent){
			newStruct.parent.core.core[each] = changeParent[each];
		}
	}
	//Add any Layer configs
	if(layerConfig){
		newStruct.config = {...layerConfig}
	}
	//Output
	if(assign){
		return auxl.Layer(id, newStruct)
	} else {
		auxl[id] = auxl.Layer(id, newStruct);
	}
}

//
//Export
export {Core, coreDataFromTemplate, coreFromTemplate, Layer, layerDataFromTemplate, layerFromTemplate};