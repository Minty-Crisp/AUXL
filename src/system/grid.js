//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Grid
//
//Collision
//GridLayout
//Gate

//
//Collision
//Build a collision map in 0.5 meter sections 
//Allow or Deny moving outside of collision map
const Collision = (auxl) => {
//lower to higher number
//0.5 increments per grid square
//start cube grid position
//end cube grid position

	let grid = {};
	grid.size = 0;
	grid.topHeight = 0;
	grid.bottomHeight = 0;
	grid.collide = {};
	grid.trigger = {};
	grid.triggersActive = false;
	grid.edgeSpawned = false;
	grid.edges = {};
	grid.edge = auxl.mapEdgeBasic;
	grid.waiting = false;
	grid.spawnWaiting = {};
	grid.waitingMove = false;
	grid.moveWaiting = {};

	//Enable Collision Checks for Locomotion
	const EnableCollision = () => {
		auxl.collision = true;
	}
	EnableCollision();
	//Disable Collision Checks for Locomotion
	const DisableCollision = () => {
		auxl.collision = false;
	}

	//Build Blank Collision & Trigger Map
	const BuildMap = (size, height) => {
		grid.size = size;
		grid.topHeight = height.top || 2;
		grid.bottomHeight = height.bottom || 0;
		BlankMap();
		BlankMapTrigger();
	}

	//
	//Collision
	//Blank Map @ Size
	const BlankMap = () => {
		//Clear Current Map and Objects
		grid.collide = {};
		auxl.collisionMap[0] = [];
		auxl.collisionMap[1] = [];

		//Build Top Map
		if(grid.topHeight > 0){
			for(let level = 0; level < grid.topHeight; level++){
				BlankMapLevel(auxl.collisionMap[0], level);
			}
		}
		//Build Bottom Map
		if(grid.bottomHeight > 0){
			for(let level = 0; level < grid.bottomHeight; level++){
				BlankMapLevel(auxl.collisionMap[1], level);
			}
		}
	}
	//Build a Single Height Level Collision Map
	const BlankMapLevel = (array, level) => {
		//Blank Level
		let levelMap = [[],[],[],[]];
		//Top Left
		levelMap[0] = [];
		levelMap[0] = Array(grid.size/2).fill(0, 0);
		for(let each in levelMap[0]){
			levelMap[0][each] = Array(grid.size/2).fill(0, 0);
		}
		//Top Right
		levelMap[1] = [];
		levelMap[1] = Array(grid.size/2).fill(0, 0);
		for(let each in levelMap[1]){
			levelMap[1][each] = Array(grid.size/2).fill(0, 0);
		}
		//Bottom Left
		levelMap[2] = [];
		levelMap[2] = Array(grid.size/2).fill(0, 0);
		for(let each in levelMap[2]){
			levelMap[2][each] = Array(grid.size/2).fill(0, 0);
		}
		//Bottom Right
		levelMap[3] = [];
		levelMap[3] = Array(grid.size/2).fill(0, 0);
		for(let each in levelMap[3]){
			levelMap[3][each] = Array(grid.size/2).fill(0, 0);
		}
		//Add to System
		array.push(levelMap);
	}
	//Add to Map
	const OnMap = (obj) => {
		if(grid.collide[obj.name]){} else {
			grid.collide[obj.name] = {};
		}
		grid.collide[obj.name]['space'+obj.spaces] = {};
		grid.collide[obj.name]['space'+obj.spaces].pos = obj.pos;
		
	}
	//Remove from Map
	const OffMap = (name) => {
		delete grid.collide[name];
	}
	//Check Map for no other Overlapping Objects
	const CheckMapOverlap = (obj) => {
		for(let each in grid.collide){
			if(each === obj.name){}else{
				for(let space in grid.collide[each]){
					if(grid.collide[each][space].pos.x === obj.pos.x && grid.collide[each][space].pos.y === obj.pos.y && grid.collide[each][space].pos.z === obj.pos.z){
						return false;
					}
				}
			}
		}
		return true;
	}
	//Update Map Multi Space
	const UpdateMapArea = (name,start,end,collide) => {
		let pos = {x: start.x, y: start.y, z: start.z};
		let xSpaces;
		let xCurrent;
		let ySpaces;
		let yCurrent;
		let zSpaces;
		let zCurrent;
		let mapKey;
		let spaces = 0;
		//Assign Map Key Code Add or Remove
		if(collide){
			mapKey = 1;
		} else {
			mapKey = 0;
		}
		//Calc X
		function calcXPos(){
			if(start.x === end.x){
				xSpaces = 1;
			} else {
				xSpaces = start.x - end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = start.x;
			xCurrent = xSpaces;
		}
		//Calc Y
		function calcYPos(){
			if(start.y === end.y){
				ySpaces = 1;
			} else {
				ySpaces = Math.abs(start.y) + Math.abs(end.y);
				ySpaces += 1;
			}
			pos.y = start.y;
			yCurrent = ySpaces;
		}
		//Calc Z
		function calcZPos(){
			if(start.z === end.z){
				zSpaces = 1;
			} else {
				zSpaces = start.z - end.z;
				zSpaces *= 2;
				if(zSpaces < 0){
					zSpaces *= -1;
				}
				zSpaces += 1;
			}
			pos.z = start.z;
			zCurrent = zSpaces;
		}
		//Assign Map Collisions
		calcYPos();
		for(let y = 0; y < ySpaces;y++){
			calcZPos();
			for(let z = 0; z < zSpaces;z++){
				calcXPos();
				for(let x = 0; x < xSpaces;x++){
					if(mapKey === 0){
						//Removing
						//If another object doesn't exist in same space, clear it
						if(CheckMapOverlap({name, pos:{x:pos.x, y:pos.y, z:pos.z}})){
							UpdateMap(pos,mapKey);
						}
						spaces++;
					} else if(mapKey === 1){
						//Adding
						UpdateMap(pos,mapKey);
						spaces++;
						OnMap({name, spaces, pos:{x:pos.x, y:pos.y, z:pos.z}});
					}
					//Next X Space
					xCurrent--;
					if(xCurrent > 0){
						pos.x += 0.5;
					}
				}
				//Next Z Space
				zCurrent--;
				if(zCurrent > 0){
					pos.z += 0.5;
				}
			}
			//Next Y Space
			yCurrent--;
			if(yCurrent > 0){
				pos.y += 1;
			}
		}
		//Remove from grid.collide
		if(mapKey === 0){
			OffMap(name);
		}
	}
	//Update Map Single Space
	const UpdateMap = (pos, mapKey) => {
		//0.5 meter to integer grid adjustment
		let xPos = pos.x * 2;
		let yPos = pos.y;
		let zPos = pos.z * 2;
		//console.log({x: xPos, z: zPos})
		let map;
		if(yPos >= 0){
			//Top
			map = 0;
		} else {
			//Bottom
			map = 1;
		}
		//Add a mechanism to detect if the collision it is adding is the same sq that the player is in. If so, do not add until the player has moved out of the square.
		if(xPos < 0 && zPos < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			auxl.collisionMap[map][yPos][0][zPos * -1][xPos * -1] = mapKey;
		} else if(pos.x >= 0 && zPos < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			auxl.collisionMap[map][yPos][1][zPos * -1][xPos] = mapKey
		} else if(xPos < 0 && zPos >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			auxl.collisionMap[map][yPos][2][zPos][xPos * -1] = mapKey;
		} else if(xPos >= 0 && zPos >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			auxl.collisionMap[map][yPos][3][zPos][xPos] = mapKey;
		} else {
			console.log('Update out of bounds')
			//resize map
		}
	}
	//Check for Player Collision
	const CheckForPlayer = (grid) => {
		let playerGrid = auxl.player.GetPlayerInfo().grid;
		if(grid.start.x <= playerGrid.x && grid.end.x >= playerGrid.x && grid.start.y <= playerGrid.y && grid.end.y >= playerGrid.y && grid.start.z <= playerGrid.z && grid.end.z >= playerGrid.z){
			//Player Occupied
			return false;
		} else {
			if(auxl.player.layer.standing){
				playerGrid.y += 1;
				if(grid.start.x <= playerGrid.x && grid.end.x >= playerGrid.x && grid.start.y <= playerGrid.y && grid.end.y >= playerGrid.y && grid.start.z <= playerGrid.z && grid.end.z >= playerGrid.z){
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	}
	//Check for Map Obstacles 0.5 Meter Forward or Side
	const CheckMapObstacles = (pos) => {

		let newPos = {};
		newPos.x = pos.x * 2;
		newPos.y = pos.y || 0;
		newPos.z = pos.z * 2;
		let map;
		if(newPos.y >= 0){
			//Top
			map = 0;
		} else {
			//Bottom
			map = 1;
		}

		//Height map checks for overflow
		if(newPos.y >= 0){
			if(auxl.collisionMap[map].length <= newPos.y){
				console.log('height out of bounds');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else {
			if(auxl.collisionMap[map].length >= newPos.y*-1){
				console.log('height out of bounds');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		}
		//Quadrant Checks
		if(newPos.x < 0 && newPos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			if(auxl.collisionMap[map][newPos.y][0].length > newPos.z * -1){
				if(auxl.collisionMap[map][newPos.y][0][newPos.z * -1].length > newPos.x * -1){
					//console.log('Within Map');
					if(auxl.collisionMap[map][newPos.y][0][newPos.z * -1][newPos.x * -1] === 0){
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			if(auxl.collisionMap[map][newPos.y][1].length > newPos.z * -1){
				if(auxl.collisionMap[map][newPos.y][1][newPos.z * -1].length > newPos.x){
					//console.log('Within Map');
					if(auxl.collisionMap[map][newPos.y][1][newPos.z * -1][newPos.x] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x < 0 && newPos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			if(auxl.collisionMap[map][newPos.y][2].length > newPos.z){
				if(auxl.collisionMap[map][newPos.y][2][newPos.z].length > newPos.x * -1){
					//console.log('Within Map');
					if(auxl.collisionMap[map][newPos.y][2][newPos.z][newPos.x * -1] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			if(auxl.collisionMap[map][newPos.y][3].length > newPos.z){
				if(auxl.collisionMap[map][newPos.y][3][newPos.z].length > newPos.x){
					if(auxl.collisionMap[map][newPos.y][3][newPos.z][newPos.x] === 0){
						//User can move
						return true;
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else {
			return false;
		}
	}
	//Check for Map Obstacles 0.5 Meter and block diagonal movement if forward and side are blocked, but not the actual diagonal spot
	const CheckMapObstaclesDiagonal = (goPos, atPos) => {

		let pos = {};
		pos.x = atPos.x;
		pos.y = atPos.y;
		pos.z = atPos.z;
		pos.x *= 2;
		pos.z *= 2;
		let map;
		if(pos.y >= 0){
			//Top
			map = 0;
		} else {
			//Bottom
			map = 1;
		}

		let newPos = {};
		newPos.x = goPos.x;
		newPos.y = goPos.y;
		newPos.z = goPos.z;
		newPos.x *= 2;
		newPos.z *= 2;
		let newMap;
		if(newPos.y >= 0){
			//Top
			newMap = 0;
		} else {
			//Bottom
			newMap = 1;
		}

		let travelDirection;
		let travelElevation;

		//World direction of movement
		if(newPos.x === pos.x && newPos.z === pos.z){
			//console.log('Same Square')
			travelDirection = 'same';
		} else {
			if(newPos.x === pos.x || newPos.z === pos.z){
				if(newPos.x === pos.x){
					//console.log('Forward|Backward');
					travelDirection = 'z';
				} else if(newPos.z === pos.z){
					//console.log('Side to Side');
					travelDirection = 'x';
				}
			} else {
				//console.log('Diagonal');
				if(newPos.x > pos.x){
					//Right
					if(newPos.z > pos.z){
						//Backward
						travelDirection = 'reverseRight';
					} else {
						//Forward
						travelDirection = 'forwardRight';
					}
				} else {
					//Left
					if(newPos.z > pos.z){
						//Backward
						travelDirection = 'reverseLeft';
					} else {
						//Forward
						travelDirection = 'forwardLeft';
					}
				}
			}
		}
		//Travel Elevation
		if(newPos.y === pos.y){
			//console.log('Same Square')
			travelElevation = 'same';
		} else {
			//console.log('Diagonal');
			if(newPos.y > pos.y){
				travelElevation = 'up';
			} else {
				travelElevation = 'down';
			}
		}
		//Height map checks for overflow
		if(newPos.y >= 0){
			if(auxl.collisionMap[map].length <= newPos.y){
				console.log('height out of bounds');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else {
			if(auxl.collisionMap[map].length >= newPos.y*-1){
				console.log('height out of bounds');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		}

		//Map Lookup
		function mapLookup(m,q,x,y,z){
			if(typeof auxl.collisionMap[m][y] === 'undefined'){
				//console.log({q,x,y,z});
				//console.log('Undefined')
				if(m === 0){
					if(y < 0){
						if(auxl.collisionMap[1] === 'undefined'){
							//console.log('Bottom map missing')
						} else {
							mapLookup(1,q,x,y*-1,z);
						}
					}
				} else if(m === 1){
					if(y < 0){
						if(auxl.collisionMap[0] === 'undefined'){
							//console.log('Top map missing')
						} else {
							mapLookup(0,q,x,y*-1,z);
						}
					}
				}
			} else if(typeof auxl.collisionMap[m][y][q][z] === 'undefined'){
				//console.log({q,x,y,z});
				//console.log('Undefined')
				if(q === 0){
					if(z < 0){
						mapLookup(m,2,x,y,z*-1);
					}
				} else if(q === 1){
					if(z < 0){
						mapLookup(m,3,x,y,z*-1);
					}
				} else if(q === 2){
					if(z < 0){
						mapLookup(m,0,x,y,z*-1);
					}
				} else if(q === 3){
					if(z < 0){
						mapLookup(m,1,x,y,z*-1);
					}
				}
			} else if(typeof auxl.collisionMap[m][y][q][z][x] === 'undefined'){
				//console.log({q,x,y,z});
				//console.log('Undefined')
				if(q === 0){
					if(x < 0){
						mapLookup(m,1,x*-1,y,z);
					}
				} else if(q === 1){
					if(x < 0){
						mapLookup(m,0,x*-1,y,z);
					}
				} else if(q === 2){
					if(x < 0){
						mapLookup(m,3,x*-1,y,z);
					}
				} else if(q === 3){
					if(x < 0){
						mapLookup(m,2,x*-1,y,z);
					}
				}
			} else {
				//console.log(auxl.collisionMap[m][y][q][z][x])
				return auxl.collisionMap[m][y][q][z][x];
			}
		}

		//Check Map in Direction
		if(newPos.x < 0 && newPos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			if(auxl.collisionMap[newMap][newPos.y][0].length > newPos.z * -1){
				if(auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1].length > newPos.x * -1){
					//console.log('Within Map');
					//if(auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1][newPos.x * -1] === 0){
if(mapLookup(newMap,0,newPos.x*-1,newPos.y,newPos.z*-1) === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][0][(newPos.z * -1)+1][newPos.x * -1] === 1 && auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1][(newPos.x * -1)-1] === 1){
if(mapLookup(newMap,0,newPos.x*-1,newPos.y,(newPos.z*-1)+1) !== 0 && mapLookup(newMap,0,(newPos.x*-1)-1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
//auxl.collisionMap[newMap][newPos.y][0][((newPos.z * -1) + 1)] is undefined
							//if(auxl.collisionMap[newMap][newPos.y][0][(newPos.z * -1)+1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1][(newPos.x * -1)+1] !== 0){
if(mapLookup(newMap,0,newPos.x*-1,newPos.y,(newPos.z*-1)+1) !== 0 && mapLookup(newMap,0,(newPos.x*-1)+1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][0][(newPos.z * -1)-1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1][(newPos.x * -1)-1] !== 0){
if(mapLookup(newMap,0,newPos.x*-1,newPos.y,(newPos.z*-1)-1) !== 0 && mapLookup(newMap,0,(newPos.x*-1)-1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//+Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][0][(newPos.z * -1)-1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][0][newPos.z * -1][(newPos.x * -1)+1] !== 0){
if(mapLookup(newMap,0,newPos.x*-1,newPos.y,(newPos.z*-1)-1) !== 0 && mapLookup(newMap,0,(newPos.x*-1)+1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			if(auxl.collisionMap[newMap][newPos.y][1].length > newPos.z * -1){
				if(auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1].length > newPos.x){
					//console.log('Within Map');
					//if(auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1][newPos.x] === 0){
if(mapLookup(newMap,1,newPos.x,newPos.y,newPos.z*-1) === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][1][(newPos.z * -1)+1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1][(newPos.x)-1] !== 0){
if(mapLookup(newMap,1,newPos.x,newPos.y,(newPos.z*-1)+1) !== 0 && mapLookup(newMap,1,newPos.x-1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][1][(newPos.z * -1)+1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1][(newPos.x)+1] !== 0){
if(mapLookup(newMap,1,newPos.x,newPos.y,(newPos.z*-1)+1) !== 0 && mapLookup(newMap,1,newPos.x+1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][1][(newPos.z * -1)-1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1][(newPos.x)-1] !== 0){
if(mapLookup(newMap,1,newPos.x,newPos.y,(newPos.z*-1)-1) !== 0 && mapLookup(newMap,1,newPos.x-1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//+Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][1][(newPos.z * -1)-1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][1][newPos.z * -1][(newPos.x)+1] !== 0){
if(mapLookup(newMap,1,newPos.x,newPos.y,(newPos.z*-1)-1) !== 0 && mapLookup(newMap,1,newPos.x+1,newPos.y,newPos.z*-1) !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x < 0 && newPos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			if(auxl.collisionMap[newMap][newPos.y][2].length > newPos.z){
				if(auxl.collisionMap[newMap][newPos.y][2][newPos.z].length > newPos.x * -1){
					//console.log('Within Map');
					//if(auxl.collisionMap[newMap][newPos.y][2][newPos.z][newPos.x * -1] === 0){
if(mapLookup(newMap,2,newPos.x*-1,newPos.y,newPos.z) === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][2][(newPos.z)+1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][2][newPos.z][(newPos.x * -1)-1] !== 0){
if(mapLookup(newMap,2,newPos.x*-1,newPos.y,newPos.z+1) !== 0 && mapLookup(newMap,2,(newPos.x*-1)-1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][2][(newPos.z)+1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][2][newPos.z][(newPos.x * -1)+1] !== 0){
if(mapLookup(newMap,2,newPos.x*-1,newPos.y,newPos.z+1) !== 0 && mapLookup(newMap,2,(newPos.x*-1)+1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
//uxl.collisionMap[newMap][newPos.y][2][(newPos.z - 1)] is undefined
							//if(auxl.collisionMap[newMap][newPos.y][2][(newPos.z)-1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][2][newPos.z][(newPos.x * -1)-1] !== 0){
if(mapLookup(newMap,2,newPos.x*-1,newPos.y,newPos.z-1) !== 0 && mapLookup(newMap,2,(newPos.x*-1)-1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//+Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][2][(newPos.z)-1][newPos.x * -1] !== 0 && auxl.collisionMap[newMap][newPos.y][2][newPos.z][(newPos.x * -1)+1] !== 0){
if(mapLookup(newMap,2,newPos.x*-1,newPos.y,newPos.z-1) !== 0 && mapLookup(newMap,2,(newPos.x*-1)+1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else if(newPos.x >= 0 && newPos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			if(auxl.collisionMap[newMap][newPos.y][3].length > newPos.z){
				if(auxl.collisionMap[newMap][newPos.y][3][newPos.z].length > newPos.x){
					//if(auxl.collisionMap[newMap][newPos.y][3][newPos.z][newPos.x] === 0){
if(mapLookup(newMap,3,newPos.x,newPos.y,newPos.z) === 0){
						//Block diagonal movement if both adjacent squares are occupied
						if(travelDirection === 'forwardRight'){
							//-Z
							//+X
							//if(auxl.collisionMap[newMap][newPos.y][3][newPos.z+1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][3][newPos.z][newPos.x-1] !== 0){
if(mapLookup(newMap,3,newPos.x,newPos.y,newPos.z+1) !== 0 && mapLookup(newMap,3,newPos.x-1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'forwardLeft'){
							//-Z
							//-X
							//if(auxl.collisionMap[newMap][newPos.y][3][newPos.z+1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][3][newPos.z][newPos.x+1] !== 0){
if(mapLookup(newMap,3,newPos.x,newPos.y,newPos.z+1) !== 0 && mapLookup(newMap,3,newPos.x+1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseRight'){
							//+Z
							//+X
// auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
//auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
//auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
							//if(auxl.collisionMap[newMap][newPos.y][3][newPos.z-1][newPos.x] !== 0 && auxl.collisionMap[newMap][newPos.y][3][newPos.z][newPos.x-1] !== 0){
if(mapLookup(newMap,3,newPos.x,newPos.y,newPos.z-1) !== 0 && mapLookup(newMap,3,newPos.x-1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else if(travelDirection === 'reverseLeft'){
							//+Z
							//-X
//auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
//auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
//auxl.collisionMap[newMap][newPos.y][3][(newPos.z - 1)] is undefined
							//if(auxl.collisionMap[newMap][newPos.y][3][newPos.z-1][newPos.x] === 1 && auxl.collisionMap[newMap][newPos.y][3][newPos.z][newPos.x+1] === 1){
if(mapLookup(newMap,3,newPos.x,newPos.y,newPos.z-1) !== 0 && mapLookup(newMap,3,newPos.x+1,newPos.y,newPos.z) !== 0){
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				} else {
					//console.log('Out of Map');
					if(auxl.mapEdge){
						return false;
					} else {
						return true;
					}
				}
			} else {
				//console.log('Out of Map');
				if(auxl.mapEdge){
					return false;
				} else {
					return true;
				}
			}
		} else {
			return false;
		}
	}
	//NOT USED
	//Check for Map Obstacles in an Area 
	const CheckMapObstaclesArea = (start,end) => {
		let pos = {x: start.x, z: start.z};
		let xSpaces;
		let xCurrent;
		let zSpaces;
		let zCurrent;
		let spaces = 0;
		//Calc X
		function calcXPos(){
			if(start.x === end.x){
				xSpaces = 1;
			} else {
				xSpaces = start.x - end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = start.x;
			xCurrent = xSpaces;
		}
		//Calc Z
		function calcZPos(){
			if(start.z === end.z){
				zSpaces = 1;
			} else {
				zSpaces = start.z - end.z;
				zSpaces *= 2;
				if(zSpaces < 0){
					zSpaces *= -1;
				}
				zSpaces += 1;
			}
			pos.z = start.z;
			zCurrent = zSpaces;
		}
		//Assign Map Collisions
		calcZPos();
		//Check for Player Collision
		if(CheckForPlayer({start,end})){}else{
			console.log('Hit Player')
			return false;
		}
		for(let z = 0; z < zSpaces;z++){
			calcXPos();
			for(let x = 0; x < xSpaces;x++){
				//Check for Other Object Collision
				if(CheckMapObstacles(pos)){}else{
					console.log('Hit Object')
					console.log(pos)
					return false;
				}
				spaces++;
				//Next X Space
				xCurrent--;
				if(xCurrent > 0){
					pos.x += 0.5;
				}
			}
			//Next Z Space
			zCurrent--;
			if(zCurrent > 0){
				pos.z += 0.5;
			}
		}
		return true;
	}
	//Build an Array for the Area
	const BuildAreaArray = (start, end, height) => {
		let pos = {x: start.x, y: start.y, z: start.z};
		let xSpaces;
		let xCurrent;
		let ySpaces;
		let yCurrent;
		let zSpaces;
		let zCurrent;
		//let spaces = 0;
		let area = [];
		//Build Area Dual Array
		let yMovement = Math.abs(start.y) + Math.abs(end.y) + height;
		//Using array.fill causes a stupid issue, don't use
		for(let a = 0; a < yMovement+1; a++){
			area.push(new Array());
		}
		//Calc X
		function calcXPos(){
			if(start.x === end.x){
				xSpaces = 1;
			} else {
				xSpaces = start.x - end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = start.x;
			xCurrent = xSpaces;
		}
		//Calc Y
		function calcYPos(){
			if(start.y === end.y){
				ySpaces = 1;
			} else {
				ySpaces = Math.abs(start.y) + Math.abs(end.y);
				ySpaces += 1;
			}
			pos.y = start.y;
			yCurrent = ySpaces;
		}
		//Calc Z
		function calcZPos(){
			if(start.z === end.z){
				zSpaces = 1;
			} else {
				zSpaces = start.z - end.z;
				zSpaces *= 2;
				if(zSpaces < 0){
					zSpaces *= -1;
				}
				zSpaces += 1;
			}
			pos.z = start.z;
			zCurrent = zSpaces;
		}
		//Assign Map Collisions
		calcYPos();
		for(let y = 0; y < ySpaces;y++){
			calcZPos();
			for(let z = 0; z < zSpaces;z++){
				calcXPos();
				for(let x = 0; x < xSpaces;x++){
					//Add to Area Array
					area[pos.y].push({x:pos.x,z:pos.z});
					//spaces++;
					//Next X Space
					xCurrent--;
					if(xCurrent > 0){
						pos.x += 0.5;
					}
				}
				//Next Z Space
				zCurrent--;
				if(zCurrent > 0){
					pos.z += 0.5;
				}
			}
			//Next Y Space
			yCurrent--;
			if(yCurrent > 0){
				pos.y += 1;
			}
		}
		return area;
	}
	//Check for Map Obstacles in an Area and Avoid Checking an Area
	const CheckMapAreaSansArea = (from, to, height) => {
		//to is the area moving into
		//from is the area moving from, do not check any of these spaces
		let original = BuildAreaArray(from.start, from.end, height);
		let skip = false;
		let pos = {x: to.start.x, y: to.start.y, z: to.start.z};
		let xSpaces;
		let xCurrent;
		let ySpaces;
		let yCurrent;
		let zSpaces;
		let zCurrent;
		let spaces = 0;
		//Calc X
		function calcXPos(){
			if(to.start.x === to.end.x){
				xSpaces = 1;
			} else {
				xSpaces = to.start.x - to.end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = to.start.x;
			xCurrent = xSpaces;
		}
		//Calc Y
		function calcYPos(){
			if(to.start.y === to.end.y){
				ySpaces = 1;
			} else {
				ySpaces = Math.abs(to.start.y) + Math.abs(to.end.y);
				ySpaces += 1;
			}
			pos.y = to.start.y;
			yCurrent = ySpaces;
		}
		//Calc Z
		function calcZPos(){
			if(to.start.z === to.end.z){
				zSpaces = 1;
			} else {
				zSpaces = to.start.z - to.end.z;
				zSpaces *= 2;
				if(zSpaces < 0){
					zSpaces *= -1;
				}
				zSpaces += 1;
			}
			pos.z = to.start.z;
			zCurrent = zSpaces;
		}
		//Check for Player Collision
		if(CheckForPlayer(to)){}else{
			//console.log('Hit Player')
			return false;
		}
		//Check Map Collisions
		calcYPos();
		for(let y = 0; y < ySpaces;y++){
			calcZPos();
			for(let z = 0; z < zSpaces;z++){
				calcXPos();
				for(let x = 0; x < xSpaces;x++){
					//Check if within From
					for(let each in original[pos.y]){
						//if(pos.x === original[each].x && pos.x === original[each].x && pos.z === original[each].z && pos.z === original[each].z){
						if(pos.x === original[pos.y][each].x && pos.z === original[pos.y][each].z){
							skip = true;
							break;
						}
					}
					//Check for Other Object Collision
					if(skip){}else{
						if(CheckMapObstacles(pos)){}else{
							//console.log('Hit Object')
							return false;
						}
					}
					spaces++;
					skip = false;
					//Next X Space
					xCurrent--;
					if(xCurrent > 0){
						pos.x += 0.5;
					}
				}
				//Next Z Space
				zCurrent--;
				if(zCurrent > 0){
					pos.z += 0.5;
				}
			}
			//Next Y Space
			yCurrent--;
			if(yCurrent > 0){
				pos.y += 1;
			}
		}
		return true;
	}

	//
	//Triggers
	//Blank Map @ Size
	const BlankMapTrigger = () => {
		//Clear Current Map and Objects
		grid.triggers = {};
		auxl.triggerMap[0] = [];
		auxl.triggerMap[1] = [];

		//Build Top Map
		if(grid.topHeight > 0){
			for(let level = 0; level < grid.topHeight; level++){
				BlankMapLevel(auxl.triggerMap[0], level);
			}
		}
		//Build Bottom Map
		if(grid.bottomHeight > 0){
			for(let level = 0; level < grid.bottomHeight; level++){
				BlankMapLevel(auxl.triggerMap[1], level);
			}
		}
	}
	//Add to Map
	const OnMapTrigger = (obj) => {
		if(grid.trigger[obj.name]){} else {
			grid.trigger[obj.name] = {};
		}
		grid.trigger[obj.name]['space'+obj.spaces] = {};
		grid.trigger[obj.name]['space'+obj.spaces].pos = obj.pos;
		
	}
	//Remove from Map
	const OffMapTrigger = (name) => {
		delete grid.trigger[name];
	}
	//Check Map for no other Overlapping Objects
	const CheckMapOverlapTrigger = (obj) => {
		for(let each in grid.trigger){
			if(each === obj.name){}else{
				for(let space in grid.trigger[each]){
					if(grid.trigger[each][space].pos.x === obj.pos.x && grid.trigger[each][space].pos.y === obj.pos.y && grid.trigger[each][space].pos.z === obj.pos.z){
						return false;
					}
				}
			}
		}
		return true;
	}
	//Update Map Multi Space
	const UpdateMapAreaTrigger = (name,start,end,trigger) => {
		let pos = {x: start.x, y: start.y, z: start.z};
		let xSpaces;
		let xCurrent;
		let ySpaces;
		let yCurrent;
		let zSpaces;
		let zCurrent;
		let mapKey;
		let spaces = 0;
		//Assign Map Key Code Add or Remove
		if(trigger){
			mapKey = 1;
		} else {
			mapKey = 0;
		}
		//Calc X
		function calcXPos(){
			if(start.x === end.x){
				xSpaces = 1;
			} else {
				xSpaces = start.x - end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = start.x;
			xCurrent = xSpaces;
		}
		//Calc Y
		function calcYPos(){
			if(start.y === end.y){
				ySpaces = 1;
			} else {
				ySpaces = Math.abs(start.y) + Math.abs(end.y);
				ySpaces += 1;
			}
			pos.y = start.y;
			yCurrent = ySpaces;
		}
		//Calc Z
		function calcZPos(){
		if(start.z === end.z){
			zSpaces = 1;
		} else {
			zSpaces = start.z - end.z;
			zSpaces *= 2;
			if(zSpaces < 0){
				zSpaces *= -1;
			}
			zSpaces += 1;
		}
		pos.z = start.z;
		zCurrent = zSpaces;
		}
		//Assign Map Collisions
		calcYPos();
		for(let y = 0; y < ySpaces;y++){
			calcZPos();
			for(let z = 0; z < zSpaces;z++){
				calcXPos();
				for(let x = 0; x < xSpaces;x++){
					if(mapKey === 0){
						//Removing
						//If another object doesn't exist in same space, clear it
						if(CheckMapOverlapTrigger({name, pos:{x:pos.x,y:pos.y,z:pos.z}})){
							UpdateMapTrigger(pos,mapKey);
						}
						spaces++;
					} else if(mapKey === 1){
						//Adding
						UpdateMapTrigger(pos,mapKey);
						spaces++;
						OnMapTrigger({name, spaces, pos:{x:pos.x,y:pos.y,z:pos.z}});
					}
					//Next X Space
					xCurrent--;
					if(xCurrent > 0){
						pos.x += 0.5;
					}
				}
				//Next Z Space
				zCurrent--;
				if(zCurrent > 0){
					pos.z += 0.5;
				}
			}
			//Next Y Space
			yCurrent--;
			if(yCurrent > 0){
				pos.y += 1;
			}
		}
		//Remove from grid.trigger
		if(mapKey === 0){
			OffMapTrigger(name);
		}
	}
	//Update Map Single Space
	const UpdateMapTrigger = (pos, mapKey) => {
		//0.5 meter to integer grid adjustment
		let xPos = pos.x * 2;
		let yPos = pos.y;
		let zPos = pos.z * 2;
		//console.log({x: xPos, z: zPos})
		let map;
		if(pos.y >= 0){
			//Top
			map = 0;
		} else {
			//Bottom
			map = 1;
		}
		//Add a mechanism to detect if the collision it is adding is the same sq that the player is in. If so, do not add until the player has moved out of the square.

		if(xPos < 0 && zPos < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			auxl.triggerMap[map][yPos][0][zPos * -1][xPos * -1] = mapKey;
		} else if(pos.x >= 0 && zPos < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			auxl.triggerMap[map][yPos][1][zPos * -1][xPos] = mapKey
		} else if(xPos < 0 && zPos >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			auxl.triggerMap[map][yPos][2][zPos][xPos * -1] = mapKey;
		} else if(xPos >= 0 && zPos >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			auxl.triggerMap[map][yPos][3][zPos][xPos] = mapKey;
		} else {
			console.log('Update out of bounds')
			//resize map
		}

	}

	//Check for Map Trigger in an Area and Avoid Checking an Area
	//Not working well
	const UpdateMapAreaSansAreaTrigger = (name, from, to) => {
		//to is the area moving into
		//from is the area moving from, do not check any of these spaces
		let original = BuildAreaArray(from.start, from.end);
		let skip = false;
		let pos = {x: to.start.x, z: to.start.z};
		let xSpaces;
		let xCurrent;
		let zSpaces;
		let zCurrent;
		let spaces = 0;
		//Calc X
		function calcXPos(){
			if(to.start.x === to.end.x){
				xSpaces = 1;
			} else {
				xSpaces = to.start.x - to.end.x;
				xSpaces *= 2;
				if(xSpaces < 0){
					xSpaces *= -1;
				}
				xSpaces += 1;
			}
			pos.x = to.start.x;
			xCurrent = xSpaces;
		}
		//Calc Z
		function calcZPos(){
			if(to.start.z === to.end.z){
				zSpaces = 1;
			} else {
				zSpaces = to.start.z - to.end.z;
				zSpaces *= 2;
				if(zSpaces < 0){
					zSpaces *= -1;
				}
				zSpaces += 1;
			}
			pos.z = to.start.z;
			zCurrent = zSpaces;
		}
		//Assign Map Collisions
		calcZPos();
		//Check for Player Collision
		if(CheckForPlayer(to)){}else{
			console.log('Hit Player')
			return false;
		}
		for(let z = 0; z < zSpaces;z++){
			calcXPos();
			for(let x = 0; x < xSpaces;x++){



				//Check if within From
				for(let each in original){
					if(pos.x === original[each].x && pos.z === original[each].z){
original.splice(original.indexOf(each), 1);
						skip = true;
						break;
					}
				}
				//Check for Other Object Collision
				if(skip){}else{
					UpdateMapTrigger(pos,mapKey);
					OnMapTrigger({name, spaces, pos:{x:pos.x,z:pos.z}});
				}
				//OffMapTrigger(name);

				spaces++;
				skip = false;
				//Next X Space
				xCurrent--;
				if(xCurrent > 0){
					pos.x += 0.5;
				}
			}
			//Next Z Space
			zCurrent--;
			if(zCurrent > 0){
				pos.z += 0.5;
			}
		}
		console.log(original)
	}
	//Check for Map Triggers 0.5 Meter
	//Returns True if Hit Trigger
	//Corners need 3 squares in L shape to completely block travel
	const CheckMapTriggers = (pos) => {

		let newPos = {};
		newPos.x = pos.x * 2;
		newPos.y = pos.y;
		newPos.z = pos.z * 2;
		let map;
		if(newPos.y >= 0){
			//Top
			map = 0;
		} else {
			//Bottom
			map = 1;
		}
		if(newPos.x < 0 && newPos.z < 0){
			//Top Left - 0
			//Loop 1 : -Z
			//Loop 2 : -X
			if(auxl.triggerMap[map][newPos.y][0].length > newPos.z * -1){
				if(auxl.triggerMap[map][newPos.y][0][newPos.z * -1].length > newPos.x * -1){
					//console.log('Within Map');
					if(auxl.triggerMap[map][newPos.y][0][newPos.z * -1][newPos.x * -1] === 1){
						return true;
					} else {
						return false;
					}
				}
			}
		} else if(newPos.x >= 0 && newPos.z < 0){
			//Top Right - 1
			//Loop 1 : -Z
			//Loop 2 : +X
			if(auxl.triggerMap[map][newPos.y][1].length > newPos.z * -1){
				if(auxl.triggerMap[map][newPos.y][1][newPos.z * -1].length > newPos.x){
					//console.log('Within Map');
					if(auxl.triggerMap[map][newPos.y][1][newPos.z * -1][newPos.x] === 1){
						//User can move
						return true;
					} else {
						return false;
					}
				}
			}
		} else if(newPos.x < 0 && newPos.z >= 0){
			//Bottom Left - 2
			//Loop 1 : +Z
			//Loop 2 : -X
			if(auxl.triggerMap[map][newPos.y][2].length > newPos.z){
				if(auxl.triggerMap[map][newPos.y][2][newPos.z].length > newPos.x * -1){
					//console.log('Within Map');
					if(auxl.triggerMap[map][newPos.y][2][newPos.z][newPos.x * -1] === 1){
						//User can move
						return true;
					} else {
						return false;
					}
				}
			}
		} else if(newPos.x >= 0 && newPos.z >= 0){
			//Bottom Right - 3
			//Loop 1 : +Z
			//Loop 2 : +X
			if(auxl.triggerMap[map][newPos.y][3].length > newPos.z){
				if(auxl.triggerMap[map][newPos.y][3][newPos.z].length > newPos.x){
					if(auxl.triggerMap[map][newPos.y][3][newPos.z][newPos.x] === 1){
						//User can move
						return true;
					} else {
						return false;
					}
				}
			}
		} else {
			return false;
		}



	}
	//Trigger Event
	const TriggerEvent = (obj, active) => {
		if(auxl[obj.name]){
			if(active){
				//Trigger Enter
				if(grid.trigger[obj.name].active){} else {
					//console.log('Trigger Enter')
					if(auxl[obj.name].EmitEvent){
						auxl[obj.name].EmitEvent('triggerEnter');
					} else if(auxl[obj.name].EmitEventParent){
						auxl[obj.name].EmitEventParent('triggerEnter');
					}
					grid.trigger[obj.name].active = true;
				}
			} else {
				//Trigger Exit
				if(grid.trigger[obj.name].active){
					//console.log('Trigger Exit')
					if(auxl[obj.name].EmitEvent){
						auxl[obj.name].EmitEvent('triggerExit');
					} else if(auxl[obj.name].EmitEventParent){
						auxl[obj.name].EmitEventParent('triggerExit');
					}
					grid.trigger[obj.name].active = false;
				}
			}
		} else {
			console.log(obj.name)
			console.log('Trigger is not an AUXL object')
		}
	}
	//Check Which Trigger was Hit
	const TriggerEnterHit = (pos) => {
		let triggers = [];
		for(let each in grid.trigger){
			for(let space in grid.trigger[each]){
				if(space === 'active'){}else{
					if(grid.trigger[each][space].pos.x === pos.x && grid.trigger[each][space].pos.z === pos.z){
						//Trigger Match
						triggers.push({name: each, pos: grid.trigger[each][space]})
					}
				}
			}
		}
		if(triggers.length > 0){
			grid.triggersActive = true;
			for(let each in triggers){
				TriggerEvent(triggers[each], true);
			}
		}
	}
	//Check Active Triggers for Exit
	const CheckActiveTriggers = (pos) => {
		if(grid.triggersActive){
			let clear = false;
			let keep = false;
			for(let each in grid.trigger){
				keep = false;
				if(grid.trigger[each].active){
					//currently active
					for(let space in grid.trigger[each]){
						if(grid.trigger[each][space].pos){
							if(grid.trigger[each][space].pos.x === pos.x && grid.trigger[each][space].pos.z === pos.z){
								keep = true;
							}
						}
					}
					if(keep){}else{
						TriggerEvent({name: each}, false);
					}
				}
			}
			if(clear){
				grid.triggersActive = false;
			}
		}
	}
	//Clear Triggers
	const ClearTriggers = () => {
		for(let each in grid.trigger){
			for(let space in grid.trigger[each]){
				if(space === 'active'){
					grid.trigger[each][space] = false;
				}
			}
		}
		grid.triggersActive = false;
	}

	//
	//Edges
	//Update Edge Core
	const UpdateEdge = (core) => {
		grid.edge = core;
	}
	//Spawn Map Edge Object
	const SpawnEdges = () => {
		let pos = (grid.size/4) +1;
		let length = (grid.size/2) +2.5;

		//North
		grid.edges.northEdge = auxl.coreFromTemplate(grid.edge,{id: 'northEdge', geometry: {primitive: 'box', depth: 0.5, width: length, height: 0.5}, position: new THREE.Vector3(0,0.25,pos*-1)}, true);
		grid.edges.northEdge.SpawnCore();
		//South
		grid.edges.southEdge = auxl.coreFromTemplate(grid.edge,{id: 'southEdge', geometry: {primitive: 'box', depth: 0.5, width: length, height: 0.5}, position: new THREE.Vector3(0,0.25,pos)}, true);
		grid.edges.southEdge.SpawnCore();
		//West
		grid.edges.westEdge = auxl.coreFromTemplate(grid.edge,{id: 'westEdge', geometry: {primitive: 'box', depth: length, width: 0.5, height: 0.5}, position: new THREE.Vector3(pos*-1,0.25,0)}, true);
		grid.edges.westEdge.SpawnCore();
		//East
		grid.edges.eastEdge = auxl.coreFromTemplate(grid.edge,{id: 'eastEdge', geometry: {primitive: 'box', depth: length, width: 0.5, height: 0.5}, position: new THREE.Vector3(pos,0.25,0)}, true);
		grid.edges.eastEdge.SpawnCore();

		grid.edgeSpawned = true;

	}
	//Spawn Map Edge Object
	const DespawnEdges = (map) => {
		grid.edges.northEdge.DespawnCore();
		delete grid.edges.northEdge;
		grid.edges.southEdge.DespawnCore();
		delete grid.edges.southEdge;
		grid.edges.westEdge.DespawnCore();
		delete grid.edges.westEdge;
		grid.edges.eastEdge.DespawnCore();
		delete grid.edges.eastEdge;

		grid.edgeSpawned = false;
	}

	//
	//Wait to Spawn
	//Objects that need to wait to be Spawned
	const WaitToSpawn = (obj) => {
		if(grid.waiting){}else{
			grid.waiting = true;
		}
		grid.spawnWaiting[obj.name] = obj;
	}
	//Object Was Spawned
	const Spawned = (name) => {
		delete grid.spawnWaiting[name];
		if(Object.keys(grid.spawnWaiting).length === 0){
			grid.waiting = false;
		}
	}
	//Attempt Spawning of Waiting Objects
	const WaitingToSpawn = () => {
		if(grid.waiting){
			for(let each in grid.spawnWaiting){
				auxl[each][grid.spawnWaiting[each].func]();
				if(auxl[each].inScene){
					Spawned(each);
				}
			}
		}
	}
	//Clear Waiting
	const ClearWaiting = () => {
		grid.waiting = false;
		grid.spawnWaiting = {};
	}



	//OLD
	//Move to Grid
	const MoveToGrid = (move, obj) => {
		//Depending on X or Z direction of movement, the grid for which the object will occupy will get 0.5 bigger in either direction. Once it lands on the space, it will remove the attachment to the previous grid it has since moved out of (with a grace period).
console.log(move)//{z:-3, time: 1000, type: 'direct'}
console.log(obj)//core's data

let animMoveXData;
let animRotXData;
let animRotZData;
let animMoveZData;

//Move x space +/-
//Move z space +/-
//move.x is +5, means move to the right 5 spaces
//move.z is +3, means move to the front 3 spaces
//move.time is how long the total movement will take
//move.type can be direct which if both x and z are defined would make up a diagonal path
//move.type can be long which if both x and z are defined take the longest path first
//move.type can be short which if both x and z are defined take the shortest path first

//need parent core to attach move anim and rotate anim as well as emit each anim event

/*
//Check if Object as all 4 spin rotations, otherwise add them
let prepSpin = false;
if(Object.keys(auxl[obj.id].core.animations).length === 0){
	prepSpin = true;
} else {
	if(auxl[obj.id].core.animations.animspinright){} else {
		prepSpin = true;
	}
}
if(prepSpin){
	//Spin Right
	animRotData = {
		name: 'animspinright',
		property: 'object3D.rotation.y', 
		to: -90, 
		dur: 500, 
		delay: 0, 
		loop: false, 
		dir: 'normal', 
		easing: 'linear', 
		elasticity: 400, 
		autoplay: false, 
		enabled: true,
		startEvents: 'spinRightStart',
		pauseEvents: 'spinRightStop',
	};
	auxl[obj.id].Animate(animRotData);
	//Spin Left
	animRotData.name = 'animspinleft';
	animRotData.to = 90;
	animRotData.startEvents = 'spinLeftStart';
	animRotData.pauseEvents = 'spinLeftStop';
	auxl[obj.id].Animate(animRotData);
	//Spin Forward
	animRotData.name = 'animspinforward';
	animRotData.to = 1;
	animRotData.startEvents = 'spinForwardStart';
	animRotData.pauseEvents = 'spinForwardStop';
	auxl[obj.id].Animate(animRotData);
	//Spin Backward
	animRotData.name = 'animspinbackward';
	animRotData.to = 180;
	animRotData.startEvents = 'spinBackwardStart';
	animRotData.pauseEvents = 'spinBackwardStop';
	auxl[obj.id].Animate(animRotData);
}
*/









console.log(auxl[obj.id])

	}

	//Path on Grid
	const PathOnGrid = (path) => {

		//path.move is an array of grid locations in order from start to finish
		//path.pause is the amount of time to pause in between each move
		//path.loop is the amount of times to complete path or infinite
		//path.type is what kind of path, wether a loop were object ends where it starts or destination where the object ends elsewhere
		//path.collide is what to do on collision with player or other object like wait or reverse direction
		//path.direction is which way the object will move each path like normal (continue in same direction), alternate (at end of path go backwards), random (after each move, may go forward or back)

		//Apply move anim and rotate animation on new direction

	}


	//
	//Map Spawning
	//Spawn Map
	const SpawnMap = (map) => {
		//Could easily do a list of objects that have grid info, but what would be the best way to do a dual array map?
		//A single object would take up 1+ squares and any duplicates would be automatically generated as new objects

		//Basic Block Spawner
		function sectionSpawner(map,quadrant) {
			//Loop through Z array set
			for (let i = 0; i < map.length; i++) {
				//Loop through X array set
				for (let j = 0; j < map[i].length; j++) {
					//Check for objects
					if(map[i][j] === 0){}else{
						//map[i][j] object identifier

						//Set position
						let posX;
						let posY = 0.5;//half the height of object
						let posZ;

						if(quadrant === 'topLeft'){
							posX = j * -1;
							posZ = i * -1;
						} else if(quadrant === 'topRight'){
							posX = j;
							posZ = i * -1;
						} else if(quadrant === 'bottomLeft'){
							posX = j * -1;
							posZ = i;
						} else if(quadrant === 'bottomRight'){
							posX = j;
							posZ = i;
						}
						posX /= 2;
						posZ /= 2;
						//Set Position
						let positionVec3 = new THREE.Vector3(posX, posY, posZ);
						//Update object grid position
						//object.SpawnOnGrid();
					}
				}
			}
		}

		//Loop map set
		for (let h = 0; h < map.length; h++) {
			if (h === 0){
				sectionSpawner(map[h],'topLeft');
			} else if (h === 1){
				sectionSpawner(map[h],'topRight');
			} else if (h === 2){
				sectionSpawner(map[h],'bottomLeft');
			} else if (h === 3){
				sectionSpawner(map[h],'bottomRight');
			}
		}
	}
	//Despawn Map
	const DespawnMap = (map) => {

	}

	return {grid, BuildMap, BlankMap, UpdateMap, UpdateMapArea, EnableCollision, DisableCollision, CheckMapObstacles, CheckMapObstaclesDiagonal, CheckMapObstaclesArea, CheckMapAreaSansArea, SpawnEdges, DespawnEdges, UpdateEdge, BlankMapTrigger, OnMapTrigger, OffMapTrigger, CheckMapOverlapTrigger, UpdateMapAreaTrigger, UpdateMapTrigger, CheckMapTriggers, TriggerEnterHit, CheckActiveTriggers, ClearTriggers, WaitToSpawn, WaitingToSpawn, ClearWaiting, MoveToGrid, PathOnGrid,};

}

//
//Grid Layout
//Spawn coreData, Core, layerData or Layer Objects at Grid Layouts
const GridLayout = (auxl, gridLayoutData) => {
	let gridLayout = Object.assign({}, gridLayoutData);
	gridLayout.inScene = false;
	gridLayout.current = false;
	//Object Type
	gridLayout.type;
	gridLayout.objInfo = 'single';
	if(gridLayout.coreData){
		gridLayout.type = 'coreData';
		if(Array.isArray(gridLayout.coreData)){
			gridLayout.objInfo = 'array';
		}
	} else if(gridLayout.core){
		gridLayout.type = 'core';
		if(Array.isArray(gridLayout.core)){
			gridLayout.objInfo = 'array';
		}
	} else if(gridLayout.layerData){
		gridLayout.type = 'layerData';
		if(Array.isArray(gridLayout.layerData)){
			gridLayout.objInfo = 'array';
		}
	} else if(gridLayout.layer){
		gridLayout.type = 'layer';
		if(Array.isArray(gridLayout.layer)){
			gridLayout.objInfo = 'array';
		}
	}
	//Objects Holder
	gridLayout.objs = [];
	gridLayout.amount = 0;
	//Get the max amount of cores needed
	for(let grid in gridLayout.grids){
		if(gridLayout.grids[grid].length > gridLayout.amount){
			gridLayout.amount = gridLayout.grids[grid].length;
		}
	}

//Randomize
//Randomize texture color shade, scale of material, offset of material
//colorShade
//['red','orange','yellow','lime','blue','cyan','magenta','maroon','olive','green','purple','teal','navy',];
//matOffsetRange
//matRepeatRange

	//Prep Objects from Single
	const PrepObjectsSingle = () => {
		for(let each = 0; each < gridLayout.amount; each++){
			let data = {};
			let obj = {};

			if(gridLayout.type === 'coreData'){
				data = auxl.coreDataFromTemplate(gridLayout.coreData,{id: gridLayout.id+each}, true);
				obj = auxl.Core(data);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'core'){
				obj = auxl.coreFromTemplate(gridLayout.core,{id: gridLayout.id+each}, true);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'layerData'){
				data = auxl.layerDataFromTemplate(gridLayout.layerData,{id: gridLayout.id+each}, true);
				obj = auxl.Layer(gridLayout.id+'layer', data);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'layer'){
				obj = auxl.layerFromTemplate(gridLayout.layer, gridLayout.id+each, {id: gridLayout.id+each}, false, true);
				gridLayout.objs.push(obj);
			}
		}
	}
	//Prep Objects from Array
	const PrepObjectsAll = () => {
		let current = 0;
		let max = 1;
		if(gridLayout.type === 'coreData'){
			max = gridLayout.coreData.length;
		} else if(gridLayout.type === 'core'){
			max = gridLayout.core.length;
		} else if(gridLayout.type === 'layerData'){
			max = gridLayout.layerData.length;
		} else if(gridLayout.type === 'layer'){
			max = gridLayout.layer.length;
		}
		for(let each = 0; each < gridLayout.amount; each++){
			let data = {};
			let obj = {};

			if(gridLayout.type === 'coreData'){
				data = auxl.coreDataFromTemplate(gridLayout.coreData[current],{id: gridLayout.id+each}, true);
				obj = auxl.Core(data);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'core'){
				obj = auxl.coreFromTemplate(gridLayout.core[current],{id: gridLayout.id+each}, true);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'layerData'){
				data = auxl.layerDataFromTemplate(gridLayout.layerData[current],{id: gridLayout.id+each}, true);
				obj = auxl.Layer(gridLayout.id+'layer', data);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'layer'){
				obj = auxl.layerFromTemplate(gridLayout.layer[current], gridLayout.id+each, {id: gridLayout.id+each}, false, true);
				gridLayout.objs.push(obj);
			}
			current++
			if(current >= max){
				current = 0;
			}
		}
	}
	//Prep All Needed Core/Layers
	if(gridLayout.objInfo === 'single'){
		PrepObjectsSingle();
	} else {
		PrepObjectsAll();
	}
	//Generate Grid Objects
	const GenGrid = (name) => {
		for(let each in gridLayout.grids[name]){
			if(gridLayout.type === 'coreData' || gridLayout.type === 'core'){
				gridLayout.objs[each].core.grid = gridLayout.grids[name][each];
			} else if(gridLayout.type === 'data' || gridLayout.type === 'core'){
				gridLayout.objs[each].layer.grid = gridLayout.grids[name][each];
			}
		}
	}
	//Randomized Grid
	const GenGridRandomizeOld = () => {
		for(let a = 0; a<gridLayout.amount; a++){
			let data = {};
			let obj = {};
			let color = false;
			let repeatX = false;
			let repeatZ = false;
			let offset = Math.random();

			//Color
			if(gridLayout.colorShade){
				color = auxl.colorTheoryGen(false, gridLayout.colorShade).base;
			}
			//Repeat
			if(gridLayout.minRepeatX && gridLayout.maxRepeatX){
				repeatX = (Math.random()*gridLayout.maxRepeatX)+gridLayout.minRepeatX;
			} else if(gridLayout.minRepeatX){
				repeatX = Math.random()+gridLayout.minRepeatX;
			} else if(gridLayout.maxRepeatX){
				repeatX = Math.random()*gridLayout.maxRepeatX;
			}
			if(gridLayout.minRepeatZ && gridLayout.maxRepeatX){
				repeatZ = (Math.random()*gridLayout.maxRepeatZ)+gridLayout.minRepeatZ;
			} else if(gridLayout.minRepeatZ){
				repeatZ = Math.random()+gridLayout.minRepeatZ;
			} else if(gridLayout.maxRepeatZ){
				repeatZ = Math.random()*gridLayout.maxRepeatZ;
			}


			if(gridLayout.type === 'data'){
				data = auxl.coreDataFromTemplate(gridLayout.data,{id: gridLayout.id+a, grid: gridLayout.grid[a]}, true);
//Color
if(color){
	data.material.color = color;
	if(data.material.emissive){
		data.material.emissive = color;
	}
}
//Repeat
if(repeatX && repeatZ){
	data.material.repeat = repeatX+' '+repeatZ;
} else if(repeatX){
	data.material.repeat = repeatX+' 1';
} else if(repeatZ){
	data.material.repeat = '1 '+repeatZ;
}
//Offset
if(repeatX || repeatZ){
	data.material.offset = offset+' '+offset;
}

				obj = auxl.Core(data);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'core'){
				obj = auxl.coreFromTemplate(gridLayout.core,{id: gridLayout.id+a, grid: gridLayout.grid[a]}, true);
				gridLayout.objs.push(obj);
			} else if(gridLayout.type === 'layer'){
				obj = auxl.layerFromTemplate(gridLayout.layer, gridLayout.id+a, {id: gridLayout.id+a}, {grid: gridLayout.grid[a]}, true);
				gridLayout.objs.push(obj);
			}
		}
	}
	//Spawn Grid Layout
	const SpawnGridLayout = (name) =>{
		if(gridLayout.inScene){}else{
			GenGrid(name);
			for(let each in gridLayout.grids[name]){
				if(gridLayout.type === 'coreData' || gridLayout.type === 'core'){
					gridLayout.objs[each].SpawnCoreOnGrid();
				} else if(gridLayout.type === 'layerData' || gridLayout.type === 'layer'){
					gridLayout.objs[each].SpawnLayerOnGrid();
				}
			}
			gridLayout.current = name;
			gridLayout.inScene = true;
		}
	}
	//Despawn Grid Layout
	const DespawnGridLayout = () =>{
		if(gridLayout.inScene){
			for(let each in gridLayout.grids[gridLayout.current]){
				if(gridLayout.type === 'coreData' || gridLayout.type === 'core'){
					gridLayout.objs[each].DespawnCore();
				} else if(gridLayout.type === 'layerData' || gridLayout.type === 'layer'){
					gridLayout.objs[each].DespawnLayer();
				}
			}
			gridLayout.current = false;
			gridLayout.inScene = false;
			auxl.RemoveFromTracker(gridLayout.id)
		}
	}

	return {gridLayout, SpawnGridLayout, DespawnGridLayout};
}

//
//Gates
//Grid Based One Direction Close Behind Player
const Gate = (auxl, id, object, direction) => {

	let gate = {};
	gate.id = id;
	gate.object = object;
	gate.objType;
	if(gate.object.core){
		gate.objType = 'core';
	} else if(gate.object.core){
		gate.objType = 'layer';
	}
	gate.direction = direction;
	gate.directions = [];
	gate.inScene = false;
	gate.open = false;

	const ResetGate = (direction) => {
		if(direction){
			gate.direction = direction;
			gate.directions = [];
			if(gate.direction === 'forward'){
				gate.directions.push('forwardright');
				gate.directions.push('forwardleft');
				gate.directions.push('forward');
			} else if(gate.direction === 'reverse'){
				gate.directions.push('reverseright');
				gate.directions.push('reverseleft');
				gate.directions.push('reverse');
			} else if(gate.direction === 'right'){
				gate.directions.push('forwardright');
				gate.directions.push('reverseright');
				gate.directions.push('right');
			} else if(gate.direction === 'left'){
				gate.directions.push('reverseleft');
				gate.directions.push('forwardleft');
				gate.directions.push('left');
			}
		}
		if(gate.objType === 'core'){
			if(Object.keys(gate.object.core.components).length === 0){
				gate.object.core.components = {};
			}
			gate.object.core.components.oneventrun__closegate = {event: 'triggerExit', cursorObj: gate.id, component: 'null', method: 'CloseGate', params: 'null'};
		} else if(gate.objType === 'layer'){
			if(Object.keys(gate.object.layer.all.parent.core.core.components.length === 0)){
				gate.object.layer.all.parent.core.core.components = {};
			}
			gate.object.layer.all.parent.core.core.components.oneventrun__closegate = {event: 'triggerExit', cursorObj: gate.id, component: 'null', method: 'CloseGate', params: 'null'};
		}
		gate.open = true;
	}

	const SpawnGate = () => {
		if(gate.inScene){}else{
			if(gate.objType === 'core'){
				gate.object.SpawnCoreOnGrid();
			} else if(gate.objType === 'layer'){
				gate.object.SpawnLayerOnGrid();
			}
			gate.inScene = true;
		}
	}

	const DespawnGate = () => {
		if(gate.inScene){
			if(gate.objType === 'core'){
				gate.object.DespawnCore();
			} else if(gate.objType === 'layer'){
				gate.object.DespawnLayer();
			}
			gate.inScene = false;
			auxl.RemoveFromTracker(gate.id);
		}
	}

	const RemoveGate = () => {
		if(gate.inScene){
			if(gate.objType === 'core'){
				gate.object.DespawnCore();
			} else if(gate.objType === 'layer'){
				gate.object.DespawnLayer();
			}
			gate.inScene = false;
		}
	}

	const CloseGate = () => {
		if(gate.open){
			for(let each in gate.directions){
				if(auxl.player.layer.gridDirection === gate.directions[each]){
					console.log('closing gate')
					if(gate.objType === 'core'){
						gate.object.core.grid.trigger = false;
						gate.object.core.grid.collide = true;
						delete gate.object.core.components.oneventrun__closegate;
						gate.object.core.material.opacity = 1;
					} else if(gate.objType === 'layer'){
						gate.object.layer.all.parent.core.core.grid.trigger = false;
						gate.object.layer.all.parent.core.core.grid.collide = true;
						delete gate.object.layer.all.parent.core.core.components.oneventrun__closegate;
						gate.object.layer.all.parent.core.core.material.opacity = 1;
					}
					RemoveGate();
					SpawnGate();
					gate.open = false;
//testing
let timeout = setTimeout(() => {
console.log('Re-opening Gate')
OpenGate();
clearTimeout(timeout);
}, 3000);
				}
			}
		}
	}

	const OpenGate = () => {
		if(gate.open){}else{
			console.log('opening gate')
			RemoveGate();
			if(gate.objType === 'core'){
				gate.object.core.grid.collide = false;
				gate.object.core.grid.trigger = true;
				gate.object.core.material.opacity = 0;
			} else if(gate.objType === 'layer'){
				gate.object.layer.all.parent.core.core.grid.collide = false;
				gate.object.layer.all.parent.core.core.grid.trigger = true;
				gate.object.layer.all.parent.core.core.material.opacity = 0;
			}
			ResetGate();
			SpawnGate();
		}
	}

	ResetGate(gate.direction);

	return {gate, SpawnGate, DespawnGate, CloseGate, OpenGate,  ResetGate};
}

//
//Export
export {Collision, GridLayout, Gate};