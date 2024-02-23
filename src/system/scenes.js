//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Scenes
//
//SceneNode
//MapZone
//Scenario
//World

//
//Scene Node ObjGen
//scenePlaceTownBuildingCastleLabrynthLevelAreaOfInterest
const SceneNode = (auxl, sceneData) => {
	let core = Object.assign({}, sceneData);
	//Scene Text Support
	let textBubble = auxl.Core(auxl.sceneTextData);
	let sceneText = auxl.SpeechSystem(textBubble);
	//Minimum Scene Loading Timeout
	let loadTimeout;
	let minLoadTime = 400;
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core, Basic Objects
			if(auxl[condObj].GetFlag(cond)) {
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
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
	//Add Timeout, Interval, Interaction & Event listeners to NodeScene Tracker
	const AddToTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.running[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.running[nameId] = {type, name, id, nameId, method, params, event};
		}
	}
	//Remove Timeout, Interval, Interaction & Event listeners from NodeScene Tracker
	const RemoveFromTimeIntEvtTracker = (name) => {
		delete auxl.running[name];
	}
	//Clear All Timeout, Interval, Interaction & Event NodeScene Tracker Listeners
	const ClearSceneTimeIntEvt = () => {
		for(let ran in auxl.running){
			if(auxl.running[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.running[ran].nameId]);
				delete auxl.timeouts[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.running[ran].nameId]);
				delete auxl.intervals[auxl.running[ran].nameId];
			} else if (auxl.running[ran].type === 'interaction' || auxl.running[ran].type === 'event'){
if(auxl[auxl.running[ran].name].GetEl){
	auxl[auxl.running[ran].name].GetEl().removeEventListener(auxl.running[ran].event, function(){
	auxlObjMethod(auxl.running[ran].object,auxl.running[ran].method,auxl.running[ran].params);
	});
} else if(auxl[auxl.running[ran].name].GetParentEl){
	auxl[auxl.running[ran].name].GetParentEl().removeEventListener(auxl.running[ran].event, function(){
	auxlObjMethod(auxl.running[ran].object,auxl.running[ran].method,auxl.running[ran].params);
	});
}
			}
			RemoveFromTimeIntEvtTracker(ran);
		}
	}
	//Exit & Clear NodeScene
	const ClearScene = () => {
		Exit();
		ClearSceneTimeIntEvt();
		auxl.clearSpawned(auxl.nodeSpawned);
	}
	//Run Object Generator Function within NodeScene w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn || func === auxl.objGenTracking[types].altSpawn){
				auxl.spawnTracker(object, 'node');
			}
		}
		auxl[object][func](params);
	}
	//Read NodeScene Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.controller.updateAction(core[time]);
			return;
		}
		//Fog
		if(time === 'info'){
			if(core[time].fog){
				auxl.sceneEl.setAttribute('fog',core[time].fog);
			} else {
				auxl.sceneEl.setAttribute('fog',{type: "linear", near: 999, far: 1000, color: "#FFF" });
			}
		}
		for(let line in core[time]){
			//Check for special object support
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line);
						}
					}
				}
			} else if(time === 'interval'){
				for(let a in core[time][line]){
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										if(auxl[b].GetFlag(endCond) === true){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromTimeIntEvtTracker(line+b);
											}
										}
									}, line);
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						//let object;
						//let method;
						//let params;
						//let relay;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								let object = a;
								let params = core[time][line][a][b][c];

								AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								if(auxl[object].GetEl){
									auxl[object].GetEl().addEventListener(line, function(){
										IfElse(object,c,params);
									});
								} else if(auxl[object].GetParentEl){
									auxl[object].GetParentEl().addEventListener(line, function(){
										IfElse(object,c,params);
									});
								}
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								let object = a;
								let params = core[time][line][a][b][c];
								AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								if(auxl[object].GetEl){
									auxl[object].GetEl().addEventListener(line, function(){
										Switch(object,c,params);
									});
								} else if(auxl[object].GetParentEl){
									auxl[object].GetParentEl().addEventListener(line, function(){
										Switch(object,c,params);
									});
								}
							}
						} else if(b === 'relay'){
for(let c in core[time][line][a][b]){
	for(let d in core[time][line][a][b][c]){
		let object = a;
		let relay = c;
		let method = d;
		let params = core[time][line][a][b][c][d];
		AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
		if(auxl[object].GetEl){
			auxl[object].GetEl().addEventListener(line, function(){
				auxlObjMethod(relay,method,params);
console.log({object, relay, method, params})
			});
		} else if(auxl[object].GetParentEl){
			auxl[object].GetParentEl().addEventListener(line, function(){
				auxlObjMethod(relay,method,params);
			});
		}
	}
}
						} else {
							let object = a;
							let method = b;
							let params = core[time][line][a][b];
							AddToTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							if(auxl[object].GetEl){
								auxl[object].GetEl().addEventListener(line, function(){
									auxlObjMethod(object,method,params);
								});
							} else if(auxl[object].GetParentEl){
								auxl[object].GetParentEl().addEventListener(line, function(){
									auxlObjMethod(object,method,params);
								});
							}
						}
					}
				}
			} else if(time === 'event'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						let relay;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								if(auxl[object].GetEl){
									auxl[object].GetEl().addEventListener(line, function(){
										IfElse(object,c,params);
									});
								} else if(auxl[object].GetParentEl){
									auxl[object].GetParentEl().addEventListener(line, function(){
										IfElse(object,c,params);
									});
								}
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								if(auxl[object].GetEl){
									auxl[object].GetEl().addEventListener(line, function(){
										Switch(object,c,params);
									});
								} else if(auxl[object].GetParentEl){
									auxl[object].GetParentEl().addEventListener(line, function(){
										Switch(object,c,params);
									});
								}
							}
						} else if(b === 'relay'){
							for(let c in core[time][line][a][b]){
								for(let d in core[time][line][a][b][c]){
									object = a;
									relay = c;
									method = d;
									params = core[time][line][a][b][c][d];
									AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
									if(auxl[object].GetEl){
										auxl[object].GetEl().addEventListener(line, function(){
											auxlObjMethod(relay,method,params);
										});
									} else if(auxl[object].GetParentEl){
										auxl[object].GetParentEl().addEventListener(line, function(){
											auxlObjMethod(relay,method,params);
										});
									}
								}
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							if(auxl[object].GetEl){
								auxl[object].GetEl().addEventListener(line, function(){
									auxlObjMethod(object,method,params);
								});
							} else if(auxl[object].GetParentEl){
								auxl[object].GetParentEl().addEventListener(line, function(){
									auxlObjMethod(object,method,params);
								});
							}
						}
					}
				}
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else {
						console.log(time)
						console.log(line)
						console.log(a)
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
		return;
	}
	//Read NodeScene Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into NodeScene
	const AddControls = () => {
		readTimeline('controls');
		auxl.UpdateControlText();
	}
	//Remove NodeScene Controls
	const RemoveControls = () => {
		auxl.controller.disableAction(core['controls']);
	}
	//Read NodeScene Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read NodeScene Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read NodeScene Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read NodeScene Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read NodeScene Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read NodeScene Exit Section & Remove NodeScene Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
		GridMapStop();
		auxl.player.EmitEvent('sceneExit', true);
		if(core.info.sceneText){
			sceneText.KillStop();
		}
	}
	//Support to Connect NodeScenes
	const Map = () => {
		readTimeline('map');
	}
	//Grid Map Start
	const GridMapStart = () => {
		if(core.info.map){
			auxl.map.BuildMap(core.info.map.size, core.info.map.height);
			auxl.mapEdge = core.info.map.edge || false;
			if(auxl.mapEdge && core.info.map.spawnEdge){
				auxl.map.SpawnEdges(core.info.map.edgeUpdate);
			}
		}
	}
	//Grid Map Stop
	const GridMapStop = () => {
		if(auxl.map.grid.edgeSpawned){
			auxl.map.DespawnEdges();
		}
		auxl.map.ClearWaiting();
		auxl.map.ClearTriggers();
	}
	//Physics Updates
	const PhysUpdates = (update) => {
		//physics : {gravity: 9.8, axis: new THREE.Vector3(0,-1,0),},
//auxl.playerRig.GetEl().body.world.gravity
		//auxl.world
	}
	//Scene Text Support
	const SceneTextDisplay = () => {
		if(core.info.sceneText){
			sceneText.Start();
			sceneText.DisplaySpeech({role: core.info.name,speech: '... ... ...'});
			let sceneTextTimeout = setTimeout(() => {
				sceneText.DisplaySpeech({role: core.info.name,speech: core.info.description});
				clearTimeout(sceneTextTimeout);
			}, 1150);
		}
	}
	//Load Player Default Position 
	const ScenePlayerPosition = () => {
		if(core.info.spawnPos === 'other'){
			//If using other, be sure to manually update default position, otherwise will default back to blank
			auxl.player.UpdateDefaultPosition(new THREE.Vector3())
		} else if(core.info.spawnPos){
			auxl.player.UpdateDefaultPosition(core.info.spawnPos)
		} else {
			auxl.player.UpdateDefaultPosition(new THREE.Vector3())
		}
		auxl.player.UpdatePlayerPosition(auxl.player.layer.defaultPosition);
	}
	//NodeScene Start
	const StartScene = () => {
		auxl.sceneReading = true;
		auxl.SceneLoadTimeout();
		ScenePlayerPosition();
		Info();
		GridMapStart();
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
		SceneTextDisplay();
		loadTimeout = setTimeout(() => {
			auxl.sceneReading = false;
			clearTimeout(loadTimeout);
		}, minLoadTime);
		auxl.local.location.scene = core.info.id;
		auxl.saveToProfile();
		if(auxl.local.location.load){
			auxl.local.location.load = false;
		}
	}

	return {core, ClearScene, StartScene, ScenePlayerPosition}
}

//
//Map Zone Gen & reader
//mapRegionDistrictTerritoryZoneSection
const MapZone = (auxl, mapZoneData) => {
	let core = Object.assign({}, mapZoneData);
	core.mapMenuData = false;
	core.mapMainMenuData = false;
	core.mapWorldsMenuData = false;
	core.mapMenu;
	core.nodes = {};
	//core.info;
	core.currentNode;
	core.zoneLoaded = false;
	core.displayBasicTravelMenu = core.info.travelMenu || false;
	//Map Movement Support
	let timeout;
	let timeout2;
	let newNode;

	//Prepare Zone Map
	const ReadMapData = () => {
		for(let key in core.map){
			core.nodes[key] = auxl[key];
		}
	}
	//ReadMapData();
	//Update Map
	const UpdateMap = (data) => {
		core.nodes = {};
		core.map = data;
		for(let key in data){
			core.nodes[key] = auxl[key];
		}
	}
	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core
			if(auxl[condObj].GetFlag(cond)) {
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
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
	//Run Object Generator Function within MapZone w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn || func === auxl.objGenTracking[types].altSpawn){
				auxl.spawnTracker(object, 'zone');
			}
		}
		auxl[object][func](params);
	}
	//Add Timeout, Interval, Interaction & Event listeners to MapZone Tracker
	const AddToZoneTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interval'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId};
		} else if (type === 'interaction' || type === 'event'){
			auxl.zoneRunning[nameId] = {type, name, id, nameId, method, params, event};
		}
	}
	//Remove Timeout, Interval, Interaction & Event listeners from MapZone Tracker
	const RemoveFromZoneTimeIntEvtTracker = (name) => {
		delete auxl.zoneRunning[name];
	}
	//Clear All Timeout, Interval, Interaction & Event MapZone Tracker Listeners
	const ClearZoneTimeIntEvt = () => {
		for(let ran in auxl.zoneRunning){
			if(auxl.zoneRunning[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.zoneRunning[ran].nameId]);
				delete auxl.timeouts[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.zoneRunning[ran].nameId]);
				delete auxl.intervals[auxl.zoneRunning[ran].nameId];
			} else if (auxl.zoneRunning[ran].type === 'interaction' || auxl.zoneRunning[ran].type === 'event'){
auxl[auxl.zoneRunning[ran].name].GetEl().removeEventListener(auxl.zoneRunning[ran].event, function(){
auxlObjMethod(auxl.zoneRunning[ran].object,auxl.zoneRunning[ran].method,auxl.zoneRunning[ran].params);
});

			}
			RemoveFromZoneTimeIntEvtTracker(ran);
		}
	}
	//Read MapZone Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.controller.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			//Check for special object support
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToZoneTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line);
						}
					}
				}
			} else if(time === 'interval'){
				for(let a in core[time][line]){
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromZoneTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromZoneTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToZoneTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										if(auxl[b].GetFlag(endCond) === true){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromZoneTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromZoneTimeIntEvtTracker(line+b);
											}
										}
									}, line);
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToZoneTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else if(time === 'event'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToZoneTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else {
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
		return;
	}
	//Read MapZone Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into MapZone
	const AddControls = () => {
		readTimeline('controls');
		//UpdateControlText();
	}
	//Remove MapZone Controls
	const RemoveControls = () => {
		auxl.controller.disableAction(core['controls']);
	}
	//Read MapZone Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read MapZone Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read MapZone Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read MapZone Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read MapZone Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read MapZone Exit Section & Remove MapZone Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
		auxl.player.EmitEvent('zoneExit', true);
		core.zoneLoaded = false;
	}
	//Zone Music
	const ZoneMusic = () => {
		if(auxl.audioEnabled && auxl.backgroundAudio && !auxl.isFalsey(core.info.backgroundAudio)){
			//core.info.backgroundAudio
			auxl.currentWorld.MusicPlaylist(core.info.backgroundAudio);
		} else if(core.info.backgroundAudio === 'none'){
			auxl.currentWorld.MusicPlaylist(false);
		}
	}
	//MapZone Start
	const StartZone = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
		ZoneMusic();
	}
	//Start NodeScene within MapZone
	const StartScene = (nodeName) => {
		if(auxl.local.location.load){
			core.currentNode = auxl.local.location.scene;
		} else {
			core.currentNode = nodeName || core.info.start;
		}
		core.currentZone = core.info.id;
		auxl.currentZone = core.info.id;
		if(core.zoneLoaded){} else {
			StartZone();
			auxl.local.location.zone = core.info.id;
			core.zoneLoaded = true;
		}
		auxl[core.currentNode].StartScene();
		//Main Menu Travel Update
		MoveMainMenuUpdate();
		//WorldMainMenuUpdate();
		//Basic Zone Menu Travel Update
		if(core.displayBasicTravelMenu){
			MoveSpawnMenu();
		}
		auxl.player.UnlockLocomotion();
	}
	//Exit & Clear NodeScene
	const ClearScene = () => {
		auxl[core.currentNode].ClearScene();
	}
	//Generate & Spawn MapZone Map Menu z
	const MoveSpawnMenu = () => {
		core.mapMenuData = {
			id: 'moveMenu',
			prompt: 'Move to...',
			options: {option0: '0'},
			actions: {action0: '0'},
			data: auxl.menuBaseData,
			cursorObj: core.currentZone,
			method: 'MenuMoveClick',
			pos: new THREE.Vector3(-1.5,1.5,-1),
		}
		let currNum = 0;
		let moveToNode;
		for(let connect in core.map[core.currentNode]){
			//In Zone Node or Out of Zone Node
			if(core.nodes[core.map[core.currentNode][connect].node]){
				moveToNode = core.nodes[core.map[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core.map[core.currentNode][connect].node];
			}
			//Open, Locked or Unlocked Travel
			if(core.map[core.currentNode][connect].locked && !auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Locked]';
			} else if(core.map[core.currentNode][connect].locked && auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				core.mapMenuData.options['option'+currNum] = moveToNode.core.info.name;
			}
			core.mapMenuData.actions['action'+currNum] = connect;
			currNum++;
		}
		core.mapMenu = auxl.Menu(core.mapMenuData);
		core.mapMenu.SpawnMenu();
	}
	//Generate & Spawn MapZone Map Menu
	const MoveMainMenuUpdate = () => {
		core.mapMainMenuData = {};
		let buttonTemplate = {};
		let moreTemplate = {};
		//let currNum = 0;
		let currNum = 1;
		let currPage = 1;
		let moveToNode;
		let nodeName;
		let total = Object.keys(core.map[core.currentNode]).length;
		let pages = Math.ceil(total/7);
		let subMenuName = 'travel' + currPage;
		//scenario UpdateZoneMap
		if(auxl.local.location.load){}else{
			if(auxl.local.location.scenario === ''){}else{
				auxl[auxl.local.location.scenario].UpdateZoneMap();
			}
		}
		for(let connect in core.map[core.currentNode]){
			if(core.nodes[core.map[core.currentNode][connect].node]){
				moveToNode = core.nodes[core.map[core.currentNode][connect].node];
			} else {
				moveToNode = auxl[core.map[core.currentNode][connect].node];
			}
			//Open, Locked or Unlocked Travel
			if(core.map[core.currentNode][connect].locked && !auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				nodeName = moveToNode.core.info.name + ' [Locked]';
			} else if(core.map[core.currentNode][connect].locked && auxl.comp.CheckForKey(core.map[core.currentNode][connect].keyId)){
				nodeName = moveToNode.core.info.name + ' [Unlocked]';
			} else {
				nodeName = moveToNode.core.info.name;
			}
			//Update Button
			buttonTemplate = {
				id: 'action'+currNum,
				style: false,
				title: nodeName,
				description: 'Travel to '+nodeName,
				subMenu: false,
				action: {
					auxlObj: core.currentZone,
					component: false,
					method: 'Move',
					params: connect,
					menu: 'close',
				},
			};
			moreTemplate = {
				id: 'action'+currNum,
				style: false,
				title: 'More',
				description: 'Next Page',
				subMenu: false,
				action: false,
			};
			core.mapMainMenuData['button'+currNum] = buttonTemplate;
			if(currNum === total){
				//Update Companion main menu
				auxl.mainMenu.UpdateSubMenu(subMenuName,core.mapMainMenuData);
			} else {
				currNum++;
			}
			if(pages > 1){
				if(currNum % 7 === 0){
					currPage++;
					//build more button
					moreTemplate.id = 'action'+currNum;
					moreTemplate.subMenu = 'travel' + currPage;
					core.mapMainMenuData['button'+currNum] = moreTemplate;
					//Update Companion main menu
					auxl.mainMenu.UpdateSubMenu(subMenuName, core.mapMainMenuData);
					core.mapMainMenuData = {};
					subMenuName = 'travel' + currPage;
				}
			}
		}
	}
	//MapZone Menu Click
	const MenuMoveClick = (el) => {
		let result = el.getAttribute('result');
		Move(result);
	}
	//Move Scenes
	const Move = (connect) => {
		newNode = core.map[core.currentNode][connect];
		//Check for Lock & Keys
		if(newNode.locked && !auxl.comp.CheckForKey(newNode.keyId)){
			clearTimeout(timeout2);
			auxl.player.Notification({message:'Requires : ' + newNode.keyName});
		} else {
			auxl.player.LockLocomotion();
			auxl.player.PlayerSceneAnim();
			if(newNode.locked && auxl.comp.CheckForKey(newNode.keyId) && !newNode.keepKey){
				auxl.comp.RemoveFromInventory(newNode.keyId);
			}
			//Move to NodeScene and/or MapZone
			timeout = setTimeout(() => {
				if(core.displayBasicTravelMenu){
					core.mapMenu.DespawnMenu();
				}
				ClearScene();
				if(core.nodes[newNode.node]){
					StartScene(newNode.node);
				} else {
					ClearZone();
					core.zoneLoaded = false;
					auxl[newNode.inZone].StartScene(newNode.node);
				}
				clearTimeout(timeout);
			}, 425);
		}
	}
	//Change Scene
	//Not running Exit instructions correctly, possibly others
	const Change = (zone,scene) => {
		auxl.player.PlayerSceneAnim();
		//No Key Checks
		timeout = setTimeout(() => {
			if(core.displayBasicTravelMenu){
				core.mapMenu.DespawnMenu();
			}
			ClearScene();
			if(core.info.id === zone){
				StartScene(scene);
			} else {
				ClearZone();
				core.zoneLoaded = false;
				auxl[zone].StartScene(scene);
			}
			clearTimeout(timeout);
		}, 425);
	}
	//Clear Zone on Move
	const ClearZone = () => {
		Exit();
		ClearZoneTimeIntEvt();
		RemoveControls();
		auxl.clearSpawned(auxl.zoneSpawned);
		if(core.displayBasicTravelMenu){
			core.mapMenu.DespawnMenu();
		}
	}

	//Generate & Spawn World List
	const WorldMainMenuUpdate = () => {
		core.mapWorldsMenuData = {};
		let buttonTemplate = {};
		let moreTemplate = {};
		//let currNum = 0;
		let currNum = 1;
		let currPage = 1;
		let moveToWorld;
		let worldName;
		let total = auxl.worlds.length;
		let pages = Math.ceil(total/7);
		let subMenuName = 'worlds' + currPage;

		for(let connect in auxl.worlds){
			moveToWorld = auxl[auxl.worlds[connect].id];

			worldName = auxl.worlds[connect].name;

			//Update Button
			buttonTemplate = {
				id: 'action'+currNum,
				style: false,
				title: worldName,
				description: 'Load the world of '+worldName,
				subMenu: false,
				action: {
					auxlObj: auxl.currentWorld,
					component: false,
					method: 'SwapWorld',
					params: moveToWorld,
					menu: 'close',
				},
			};
			moreTemplate = {
				id: 'action'+currNum,
				style: false,
				title: 'More',
				description: 'Next Page',
				subMenu: false,
				action: false,
			};
			core.mapWorldsMenuData['button'+currNum] = buttonTemplate;

			if(currNum === total){
				//Update Companion main menu
				auxl.mainMenu.UpdateSubMenu(subMenuName,core.mapWorldsMenuData);
			} else {
				currNum++;
			}

			if(pages > 1){
				if(currNum % 7 === 0){
					currPage++;
					//build more button
					moreTemplate.id = 'action'+currNum;
					moreTemplate.subMenu = 'worlds' + currPage;
					core.mapWorldsMenuData['button'+currNum] = moreTemplate;
					//Update Companion main menu
					auxl.mainMenu.UpdateSubMenu(subMenuName,core.mapWorldsMenuData);
					core.mapWorldsMenuData = {};
					subMenuName = 'worlds' + currPage;
				}
			}
		}
	}


	return {core, UpdateMap, StartScene, MoveSpawnMenu, MenuMoveClick, Move, Change, ClearZone};
}

//
//Scenario Gen
//entireScenarioSpawnLocationAlwaysDisplay
const Scenario = (auxl, scenarioData) => {
	let core = Object.assign({}, scenarioData);
	core.scenarioLoaded = false;
	let startTimeout;
	let zoneSpawn = core.info.startZone;
	let scenarioName = core.info.name;
	let scenarioInstructions = core.info.instructions;

	//If/Else support to run auxlObjMethod()
	const IfElse = (objRef, condObj,{cond, ifTrue, ifFalse}) => {
		if(auxl[condObj].GetFlag){
			//Core
			if(auxl[condObj].GetFlag(cond)) {
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
		} else if(auxl[condObj].GetFlagParent){
			//Layer
			if(auxl[condObj].GetFlagParent(cond)) {
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
	const Switch = (objRef, condObj,switchInfo) => {
		let switchCases = [];
		for(let each in switchInfo){
			if(each === 'default'){}else{
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
	//Run Object Generator Function within Scenario w/Scene Tracking
	const auxlObjMethod = (object, func, params) => {
		//Check if spawning to add to Tracker
		for (let types in auxl.objGenTracking) {
			if(func === auxl.objGenTracking[types].spawn || func === auxl.objGenTracking[types].altSpawn){
				auxl.spawnTracker(object, 'scenario');
			}
		}
		auxl[object][func](params);
	}
	//Remove Timeout, Interval, Interaction & Event listeners from Scenario Tracker
	const AddToScenarioTimeIntEvtTracker = ({name,type,id,method,params,event}) => {
		let nameId = name+id;
		if(type === 'timeout'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId};
		} else if(type === 'interval'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId};
		} else if(type === 'interaction' || type === 'event'){
			auxl.scenarioRunning[nameId] = {type, name, id, nameId, method, params, event};
		}
	}
	//Clear All Timeout, Interval, Interaction & Event Scenario Tracker Listeners
	const RemoveFromScenarioTimeIntEvtTracker = (name) => {
		delete auxl.scenarioRunning[name];
	}
	//Clear All Timeout, Interval, Interaction & Event Scenario Tracker Listeners
	const ClearScenarioTimeIntEvt = () => {
		for(let ran in auxl.scenarioRunning){
			if(auxl.scenarioRunning[ran].type === 'timeout'){
				clearTimeout(auxl.timeouts[auxl.scenarioRunning[ran].nameId]);
				delete auxl.timeouts[auxl.scenarioRunning[ran].nameId];
			} else if (auxl.scenarioRunning[ran].type === 'interval'){
				clearInterval(auxl.intervals[auxl.scenarioRunning[ran].nameId]);
				delete auxl.intervals[auxl.scenarioRunning[ran].nameId];
			} else if (auxl.scenarioRunning[ran].type === 'interaction' || auxl.scenarioRunning[ran].type === 'event'){
auxl[auxl.scenarioRunning[ran].name].GetEl().removeEventListener(auxl.scenarioRunning[ran].event, function(){
auxlObjMethod(auxl.scenarioRunning[ran].object,auxl.scenarioRunning[ran].method,auxl.scenarioRunning[ran].params);
});
			}
			RemoveFromScenarioTimeIntEvtTracker(ran);
		}
	}
	//Read Scenario Data Timeline
	function readTimeline(time){
		if(time === 'controls'){
			auxl.controller.updateAction(core[time]);
			return;
		}
		for(let line in core[time]){
			//Check for special object support
			if(time === 'delay'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									IfElse(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
								auxl.timeouts[line+a] = setTimeout(function () {
									Switch(a,c,core[time][line][a][b][c]);
									clearTimeout(auxl.timeouts[line+a]);
								}, line);
							}
						} else {
							AddToScenarioTimeIntEvtTracker({name: line, type: 'timeout', id: a});
							auxl.timeouts[line+a] = setTimeout(function () {
								auxlObjMethod(a,b,core[time][line][a][b]);
								clearTimeout(auxl.timeouts[line+a]);
							}, line);
						}
					}
				}
			} else if(time === 'interval'){
				for(let a in core[time][line]){
					let ranTotal = 0;
					let loopTotal = core[time][line]['loop'];
					let endCond;
					if(core[time][line]['end']){
						endCond = core[time][line]['end'];
					}
					if(a === 'run'){
						for(let b in core[time][line][a]){
							for(let c in core[time][line][a][b]){
								if(c === 'IfElse'){
									for(let d in core[time][line][a][b][c]){
										AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
											IfElse(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromScenarioTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else if(c === 'Switch'){
									for(let d in core[time][line][a][b][c]){
										AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
										auxl.intervals[line+b] = setInterval(function() {
											if(auxl[b].GetFlag(endCond) === true){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
											Switch(b,d,core[time][line][a][b][c][d]);
											if(loopTotal === 'infinite'){} else {
												ranTotal++;
												if(ranTotal >= loopTotal){
													clearInterval(auxl.intervals[line+b]);
													RemoveFromScenarioTimeIntEvtTracker(line+b);
												}
											}
										}, line);
									}
								} else {
									let method = c;
									let params = core[time][line][a][b][c];
									AddToScenarioTimeIntEvtTracker({name: line, type: 'interval', id: b});
									auxl.intervals[line+b] = setInterval(function() {
										if(auxl[b].GetFlag(endCond) === true){
											clearInterval(auxl.intervals[line+b]);
											RemoveFromScenarioTimeIntEvtTracker(line+b);
										}
										auxlObjMethod(b,method,params);
										if(loopTotal === 'infinite'){} else {
											ranTotal++;
											if(ranTotal >= loopTotal){
												clearInterval(auxl.intervals[line+b]);
												RemoveFromScenarioTimeIntEvtTracker(line+b);
											}
										}
									}, line);
								}
							}
						}
					}
				}
			} else if(time === 'interaction'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToScenarioTimeIntEvtTracker({name: object, type: 'interaction', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else if(time === 'event'){
				for(let a in core[time][line]){
					for(let b in core[time][line][a]){
						let object;
						let method;
						let params;
						if(b === 'IfElse'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];

								AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									IfElse(object,c,params);
								});
							}
						} else if(b === 'Switch'){
							for(let c in core[time][line][a][b]){
								object = a;
								params = core[time][line][a][b][c];
								AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
								auxl[object].GetEl().addEventListener(line, function(){
									Switch(object,c,params);
								});
							}
						} else {
							object = a;
							method = b;
							params = core[time][line][a][b];
							AddToScenarioTimeIntEvtTracker({name: object, type: 'event', id: a, method, params, event: line});
							auxl[object].GetEl().addEventListener(line, function(){
								auxlObjMethod(object,method,params);
							});
						}
					}
				}
			} else if(time === 'info'){} else {
				//Reading non-special timeline, read normally
				for(let a in core[time][line]){
					if(time === 'start'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else if(time === 'exit'){
						if(a === 'IfElse'){
							for(let b in core[time][line][a]){
								IfElse(line,b,core[time][line][a][b]);
							}
						} else if(a === 'Switch'){
							for(let b in core[time][line][a]){
								Switch(line,b,core[time][line][a][b]);
							}
						} else {
							auxlObjMethod(line,a,core[time][line][a]);
						}
					} else {
						console.log('Hit Other Timeline, Please Investigate');
					}
				}
			}
		}
		return;
	}
	//Update HTML w/Scenario Name
	function updateHTMLTitle(){
		scenarioHeaderTitle.innerHTML = scenarioName;
		scenarioMenuTitle.innerHTML = scenarioName;
	}
	//Update HTML w/Scenario Info
	function updateHTMLInstructions(){
		instructions.innerHTML = scenarioInstructions;
	}
	//Read Scenario Info Section
	const Info = () => {
		readTimeline('info');
	}
	//Add Controls into Scenario
	const AddControls = () => {
		readTimeline('controls');
		//UpdateControlText();
	}
	//Remove Scenario Controls
	const RemoveControls = () => {
		auxl.controller.disableAction(core['controls']);
		//auxl.player.UpdateActions({actions, remove, tracker, limit})
	}
	//Read Scenario Start Section
	const Start = () => {
		readTimeline('start');
	}
	//Read Scenario Delay Section
	const Delay = () => {
		readTimeline('delay');
	}
	//Read Scenario Interval Section
	const Interval = () => {
		readTimeline('interval');
	}
	//Read Scenario Event Section
	const Event = () => {
		readTimeline('event');
	}
	//Read Scenario Interaction Section
	const Interaction = () => {
		readTimeline('interaction');
	}
	//Read Scenario Exit Section & Remove Scenario Controls
	const Exit = () => {
		readTimeline('exit');
		RemoveControls();
		auxl.player.EmitEvent('scenarioExit', true);
	}
	//Load all Scenario Items
	const Init = () => {
		Start();
		Delay();
		Interval();
		Event();
		Interaction();
		AddControls();
	}
	//Start Scenario
	const StartScenario = () => {
		if(core.scenarioLoaded){} else {
			auxl.player.PlayerSceneAnim();
			//Update Zone Map
			UpdateZoneMap();
			//Update HTML
			updateHTMLTitle();
			updateHTMLInstructions();
			//Get auxcontroller component
			//auxl.controller = document.getElementById('playerRig').components['auxcontroller'];
			//Start scene mid Player anim
			startTimeout = setTimeout(() => {
				//Load All Scenario Items
				Init();
				//zone to start in
				if(auxl.local.location.load){
					zoneSpawn = auxl.local.location.zone;
				} else {
					zoneSpawn = core.info.startZone;
				}
				auxl[zoneSpawn].StartScene();
				core.scenarioLoaded = true;
				auxl.local.location.scenario = core.info.id;
				clearTimeout(startTimeout);
			}, 425);
		}
	}
	//Exit & Clear Scenario
	const ClearScenario = () => {
		//unload current zone and scene
		auxl[auxl[auxl.currentZone].core.currentNode].ClearScene();
		auxl[auxl.currentZone].ClearZone();
		Exit();
		ClearScenarioTimeIntEvt();
		RemoveControls();
		auxl.clearSpawned(auxl.scenarioSpawned);

		core.scenarioLoaded = false;
	}
	//Update Zone Maps
	const UpdateZoneMap = () => {
		for(let key in core.map){
			//console.log(key)
			//console.log(core.map[key])
			auxl[key].UpdateMap(core.map[key]);
		}
	}

	return {core, StartScenario, ClearScenario, UpdateZoneMap};
}

//
//World Gen
//containAllScenarios
const World = (auxl, worldData) => {

	let world = {};
	world.data = Object.assign({}, worldData);
	world.id = world.data.info.id;
	world.name = world.data.info.name;
	world.scenarios = world.data.scenarios;
	world.current = 0;
	world.loaded = false;
	world.scenarioLoaded = false;
	world.soundtrack = false;
	world.soundtracks = false;

	auxl.WorldsLoaded(world);

	//Set World as Default
	const SetAsDefault = () => {
		auxl.defaultWorld = auxl[world.id];
	}
	//Start World at Default Scenario
	const StartWorld = () => {
		let startDelay = WorldSettings();
		auxl.player.ResetUserPosRot()
		let startTimeout = setTimeout(() => {
			StartScenario(world.current);
			auxl.currentWorld = auxl[world.id];
			auxl.local.location.world = world.id;
			auxl.worldLoaded = true;
			clearTimeout(startTimeout);
		}, startDelay);

/*
		WorldSettings();
//console.log(world)
//console.log(world.current)
		StartScenario(world.current);
		auxl.currentWorld = auxl[world.id];
		auxl.local.location.world = world.id;
		auxl.worldLoaded = true;
*/
	}
	//Stop World
	const StopWorld = () => {
		auxl.currentWorld = false;
		auxl.local.location.world = false;
		auxl.worldLoaded = false;
		ClearScenario(world.current);
	}
	//World Settings
	const WorldSettings = () => {
		//Load World Delay
		let delay = 0;
		//Max Load Time
		if(world.data.info.maxLoadtime){
			auxl.maxLoadTime = world.data.info.maxLoadtime;
		} else {
			auxl.maxLoadTime = 5000;
		}
		//Day Time Length
		if(world.data.info.dayTime){
			auxl.timeInDay = world.data.info.dayTime;
		} else {
			auxl.timeInDay = 360000;
		}
		//Inventory
		if(world.data.info.inventory){
			auxl.comp.EnableInventory();
		} else {
			auxl.comp.enableInventory = false;
		}
		//Collision
		if(world.data.info.collision){
			auxl.collision = true;
			//auxl.compassDisplay = world.data.info.collision.compass || false;
		} else {
			auxl.collision = false;
			//auxl.compassDisplay = false;
		}
		//Compass Display
		//auxl.playerFloor.ChangeSelf({property: 'visible', value: auxl.compassDisplay}) 





		//Physics
		if(world.data.info.physics){
			if(!auxl.worldPhysics){
				delay += 500;
				auxl.worldPhysics = world.data.info.physics;
				auxl.EnablePhysics();
			} else if(auxl.worldPhysics && auxl.worldPhysics === world.data.info.physics){
				//Physics already enabled
			} else if(auxl.worldPhysics && auxl.worldPhysics !== world.data.info.physics){
				//Swap Physics
				delay += 500;
				auxl.DisablePhysics();
				auxl.worldPhysics = world.data.info.physics;
				auxl.EnablePhysics();
				let physSwapTimeout = setTimeout(() => {
					clearTimeout(physSwapTimeout);
				}, 500);
			}
		} else {
			if(auxl.worldPhysics){
				auxl.DisablePhysics();
				delay += 500;
			}
		}

		//Main Menu Style
		if(world.data.info.menuStyle){
			auxl.comp.UpdateMainMenuStyle(world.data.info.menuStyle);
		}
		//Main Menu Options
		if(world.data.info.menuOptions){
			auxl.comp.UpdateMainMenu(world.data.info.menuOptions);
		}
		//Background Audio
		if(world.data.info.backgroundAudio){
			world.soundtracks = JSON.parse(JSON.stringify(world.data.info.backgroundAudio));
			for(let each in world.soundtracks){
				auxl.playerAudio.ChangeSelf({property: 'auxlsound__'+each, value: world.soundtracks[each]})
			}
			auxl.backgroundAudio = true;
		}
		//Sound Effects
		if(world.data.info.soundEffects){
			world.soundEffects = JSON.parse(JSON.stringify(world.data.info.soundEffects));
			for(let each in world.soundEffects){
				auxl.playerAudio.ChangeSelf({property: 'auxlsound__'+each, value: world.soundEffects[each]})
			}
		}
		//Companion Book Update
		if(world.data.info.compBookUpdate){
			auxl.comp.UpdateBook(world.data.info.compBookUpdate);
		}

		return delay;
	}
	//Start a Scenario
	const StartScenario = (num) => {
		world.current = num;
		world.scenarios[num].StartScenario();
		world.scenarioLoaded = true;
	}
	//Clear a Scenario
	const ClearScenario = (num) => {
		world.scenarios[num].ClearScenario();
		world.scenarioLoaded = false;
	}
	//Next Scenario
	const NextScenario = () => {
		ClearScenario(world.current);
		world.current++;
		StartScenario(world.current);
	}
	//Load Scenario
	const LoadScenario = (num) => {
		ClearScenario(world.current);
		world.current = num;
		StartScenario(world.current);
	}

	//Music Playlist
	const MusicPlaylist = (track) => {
		//Stop current
		if(world.soundtrack){
			auxl.playerAudio.GetEl().components['auxlsound__'+world.soundtrack].stopSound();
			world.soundtrack = false;
		}
		if(!auxl.isFalsey(track)){
			//Play new if exists
			if(world.soundtracks.hasOwnProperty(track)){
				auxl.playerAudio.EmitEvent(track);
				world.soundtrack = track;
			} else {
				console.log({world, track, msg: 'Unable to find track'})
			}
		}
	}

	//Swap World
	const SwapWorld = (swapWorld) => {
//console.log(swapWorld)
//console.log(auxl[swapWorld])
		auxl.currentWorld.StopWorld()
		StartWorld();
	}

	return {world, SetAsDefault, StartWorld, StopWorld, StartScenario, ClearScenario, NextScenario, LoadScenario, MusicPlaylist, SwapWorld}
}






//
//Export
export {SceneNode, MapZone, Scenario, World};