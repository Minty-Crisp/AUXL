//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Environment
//
//SkyBox
//Horizon
//ObjsGenRing
//MultiAssetGen
//Teleport

//
//SkyBox
//Lights, Sky, Space
const SkyBox = (auxl, skyBoxData) => {
	let skyBox = Object.assign({}, skyBoxData);
	skyBox.inScene = false;
	skyBox.time = 5.5;
	skyBox.day = false;
	let dayNightTimeout;
	let dayNightInterval;
	//Spawn All Light Core/Layers
	const SpawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].SpawnCore){
				skyBox.lights[each].SpawnCore();
			} else if(skyBox.lights[each].SpawnLayer){
				skyBox.lights[each].SpawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}
	//Despawn All Light Core/Layers
	const DespawnLights = () => {
		for(let each in skyBox.lights){
			if(skyBox.lights[each].DespawnCore){
				skyBox.lights[each].DespawnCore();
			} else if(skyBox.lights[each].DespawnLayer){
				skyBox.lights[each].DespawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.lights[each]);
			}
		}
	}
	//Spawn All Sky Core/Layers
	const SpawnSky = () => {
		for(let each in skyBox.sky){
			if(skyBox.sky[each].SpawnCore){
				skyBox.sky[each].SpawnCore();
			} else if(skyBox.sky[each].SpawnLayer){
				skyBox.sky[each].SpawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}
	//Despawn All Sky Core/Layers
	const DespawnSky = () => {
		for(let each in skyBox.sky){
			if(skyBox.sky[each].DespawnCore){
				skyBox.sky[each].DespawnCore();
			} else if(skyBox.sky[each].DespawnLayer){
				skyBox.sky[each].DespawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.sky[each]);
			}
		}
	}
	//Spawn All Sky Core/Layers
	const SpawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].SpawnCore){
				skyBox.space[each].SpawnCore();
			} else if(skyBox.space[each].SpawnLayer){
				skyBox.space[each].SpawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}
	//Despawn All Sky Core/Layers
	const DespawnSpace = () => {
		for(let each in skyBox.space){
			if(skyBox.space[each].DespawnCore){
				skyBox.space[each].DespawnCore();
			} else if(skyBox.space[each].DespawnLayer){
				skyBox.space[each].DespawnLayer();
			} else {
				console.log('Failed to spawn object');
				console.log(skyBox.space[each]);
			}
		}
	}
	//Spawn SkyBox
	const SpawnSkyBox = () => {
		if(skyBox.inScene){}else{
			SpawnLights();
			SpawnSky();
			SpawnSpace();
			skyBox.inScene = true;
		}
	}
	//Despawn SkyBox
	const DespawnSkyBox = () => {
		if(skyBox.inScene){
			clearTimeout(dayNightTimeout);
			clearInterval(dayNightInterval);
			DespawnLights();
			DespawnSky();
			DespawnSpace();
			auxl.RemoveFromTracker(skyBox.id);
			skyBox.inScene = false;
		}
	}
	//Emit Event for All in Array
	const EmitEventArray = (all, event) => {
		for(let each in all){
			if(all[each].SpawnCore){
				all[each].EmitEvent(event);
			} else if(all[each].SpawnLayer){
				all[each].EmitEventAll(event);
			} else {
				console.log('Failed to emit event to object');
				console.log(all[each]);
			}
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(skyBox.inScene){
			DespawnSkyBox();
		} else {
			SpawnSkyBox();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				skyBox[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: skyBox.id, type: 'skyBox', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			skyBox[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: skyBox.id, type: 'skyBox', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(skyBox(flag[each]));
			}
			return flagArray;
		} else {
			return skyBox[flag];
		}
	}
	//Sunrise Animation Event
	const Sunrise = () => {
		skyBox.day = true;
		EmitEventArray(skyBox.lights, 'sunrise');
		EmitEventArray(skyBox.sky, 'sunrise');
		EmitEventArray(skyBox.space, 'sunrise');
	}
	//Sunset Animation Event
	const Sunset = () => {
		skyBox.day = false;
		EmitEventArray(skyBox.lights, 'sunset');
		EmitEventArray(skyBox.sky, 'sunset');
		EmitEventArray(skyBox.space, 'sunset');
	}
	//Suspend Day/Night Animation
	const PauseDayNight = () => {
		EmitEventArray(skyBox.lights, 'pauseDayNight');
		EmitEventArray(skyBox.sky, 'pauseDayNight');
		EmitEventArray(skyBox.space, 'pauseDayNight');
	}
	//Resume Day/Night Animation
	const ResumeDayNight = () => {
		EmitEventArray(skyBox.lights, 'resumeDayNight');
		EmitEventArray(skyBox.sky, 'resumeDayNight');
		EmitEventArray(skyBox.space, 'resumeDayNight');
	}
	//Looping Day/Night Cycle
	const DayNightCycle = (dayLength) => {
		if(dayLength){
			if(typeof dayLength === 'number'){
				//shortest day allowed 24 seconds
				if(dayLength >= 24000){
					auxl.timeInDay = dayLength;
				}
			}
		}
		Sunrise();
		dayNightTimeout = setTimeout(() => {
			Sunset();
			dayNightInterval = setInterval(() => {
				if(skyBox.day){
					Sunset();
				}else{
					Sunrise();
				}
			}, auxl.timeInDay/2);
		}, auxl.timeInDay/2 - auxl.timeInDay/24);
	}
	//Restart Day/Night Animation
	const RestartDayNight = (dayLength) => {
		PauseDayNight();
		Despawn();
		Spawn();
		DayNightCycle(dayLength);
	}
	//Set Time
	const SetTime = (time) => {
//Sun|Moon angle
//4 lights intensity and position
//Sky grad colors

		PauseDayNight();
		if(time >= 6 && time <=18 ){
			skyBox.day = true;
		} else {
			skyBox.day = false;
		}
		skyBox.time = time;

		//0 equals -90
		//6 equals 0
		//18 equals 180
		//24 equals 270
		//Each 1 is 15 degrees
		//Each 0.1 is 1.5 degrees

		//Set Sun
		let sunRotX = (skyBox.time * 15) -90;
		if(auxl.sunLayer.layer.inScene){
			auxl.sunLayer.GetChild('sunOuter').ChangeSelf({property: 'rotation', value: new THREE.Vector3(sunRotX,45,0)});
		}
		//Set Moon
		let moonRotX = (skyBox.time * 15) + 90;
		if(auxl.moonLayer.layer.inScene){
			auxl.moonLayer.GetChild('moonOuter').ChangeSelf({property: 'rotation', value: new THREE.Vector3(moonRotX,45,0)});
		}
		//ResumeDayNight();


//To properly start animation at a new time
//Pause current animations and clear current sunrise interval
//Set new animation that moves to end of sequence for which the sunrise interval will take it back over
//At end of this new animation time, reset interval timing sequence

/*
daynight:{property: 'object3D.rotation.x', from: -5, to: 355, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}

daynight:{property: 'object3D.rotation.x', from: 175, to: 535, dur: auxl.timeInDay, delay: 0, loop: '1', dir: 'normal', easing: 'linear', elasticity: 400, autoplay: false, enabled: true, startEvents: 'sunrise', pauseEvents: 'pauseDayNight', resumeEvents: 'resumeDayNight'}
*/

/*
auxl.directionalLight
auxl.ambientLight
auxl.directionalLight2
auxl.directionalLight3

set lights

ambientLight
from: 0.5, to: 0.25,
from: '#99154E', to: '#fffb96',

directionalLight
from: 0.1, to: 1,
from: new THREE.Vector3(-1,1,-1), to: new THREE.Vector3(1,1,1)

directionalLight2
from: 0.2, to: 0.1,
from: new THREE.Vector3(1,1,1), to: new THREE.Vector3(-1,1,-1)

directionalLight3
from: 0.05, to: 0.1,
from: new THREE.Vector3(1,1,-1), to: new THREE.Vector3(-1,1,-1)
*/

	}

	return {skyBox, SpawnSkyBox, DespawnSkyBox, ToggleSpawn, SetFlag, GetFlag, DayNightCycle, PauseDayNight, ResumeDayNight, RestartDayNight, SetTime};
}

//
//Horizon
//Mountains, Hills, Buildings, Cylinder/Square Wall
const Horizon = (auxl, horizonData) => {
	let horizon = Object.assign({}, horizonData);
	horizon.inScene = false;

	//Prep Material
	let top;
	let mid;
	let bottom;
	let colorPick;

	//Prep Density
	let spawnAmount;
	if(horizon.density === 'low'){
		spawnAmount = 5;
	} else if(horizon.density === 'normal'){
		spawnAmount = 10;
	} else if(horizon.density === 'high'){
		spawnAmount = 20;
	}

	//Prep Height
	let spawnHeight;
	if(horizon.height === 'low'){
		spawnHeight = 0.5;
	} else if(horizon.height === 'normal'){
		spawnHeight = 1;
	} else if(horizon.height === 'high'){
		spawnHeight = 1.5;
	}

	//Prep Width
	let spawnWidth;
	if(horizon.width === 'low'){
		spawnWidth = 0.5;
	} else if(horizon.width === 'normal'){
		spawnWidth = 1;
	} else if(horizon.width === 'high'){
		spawnWidth = 1.5;
	}

	//Prep Type
	let geometry;
	let position = new THREE.Vector3(0,0,horizon.radius*-1);
	let scale = new THREE.Vector3(1,1,1);
	let height;
	if(horizon.type === 'mountains'){
		height = 100*spawnHeight;
		geometry = {primitive: 'cone', height: height, radiusBottom: 50, radiusTop: 0, openEnded: true, segmentsHeight: 1, segmentsRadial: 9, thetaLength: 180, thetaStart: 90},
		scale.x = 1.5*spawnWidth;
	} else if(horizon.type === 'hills'){
		height = 50*spawnHeight;
		geometry = {primitive: 'circle', radius: height, thetaStart: 0, thetaLength: 180};
		scale.x = 1.5*spawnWidth;
	} else if(horizon.type === 'buildings'){
		height = 100*spawnHeight;
		geometry = {primitive: 'plane', width: 40*spawnWidth, height: height};
	} else if(horizon.type === 'cylinderWall'){
		height = 50*spawnHeight;
		geometry = {primitive: 'cylinder', openEnded: true, radius: horizon.radius, height: height, segmentsHeight: 9, segmentsRadial: 32, thetaStart: 0, thetaLength: 360 };
		position.z = 0;
		spawnAmount = 1;
	} else if(horizon.type === 'squareWall'){
		height = 40*spawnHeight;
		geometry = {primitive: 'plane', width: horizon.radius*2, height: height};
		spawnAmount = 4;
	}
	//Horizon Layer
	let horizonAllData = {
	data:'horizonAllData',
	id:'horizonParent',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,-5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	let horizonAll = auxl.Core(horizonAllData);
	let horizonLayerData = {
		parent: {core: horizonAll},
	};
	//Horizon Parent
	let horizonParentData = {
	data:'horizonParentData',
	id:'horizonParent',
	sources:false,
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
	let horizonParentId = 'horizonParent';
	let horizonParentCores = [];
	//Horizon Child
	let horizonChildData = {
	data:'horizonChildData',
	id:'horizonChild',
	sources:false,
	text: false,
	geometry: geometry,
	material: false,
	position: position,
	rotation: new THREE.Vector3(0,0,0),
	scale: scale,
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	let horizonChildId = 'horizonChild';
	let horizonChildCores = [];
	//Build Layer
	for(let a=0; a < spawnAmount; a++){
		//Parent
		horizonParentId = 'horizonParent' + a;
		let parentRotation = new THREE.Vector3(0,0,0);
		parentRotation.y = 360/spawnAmount*a;
		horizonParentData.id = horizonParentId;
		horizonParentData.rotation = parentRotation;
		horizonParentCores[a] = auxl.Core(horizonParentData);
		//Child
		horizonChildId = 'horizonChild' + a;
		horizonChildData.id = horizonChildId;
		if(horizon.type === 'squareWall'){}else{
			horizonChildData.scale.x = (1.5*spawnWidth) +(Math.random()*0.1-0.2);
			horizonChildData.scale.y = 1 + (Math.random()*0.2-0.4);
		}
		if(horizon.type === 'mountains' || horizon.type === 'buildings' || horizon.type === 'cylinderWall' || horizon.type === 'squareWall'){
			horizonChildData.position.y = ((horizonChildData.scale.y*height)/2)-1;
		} else if(horizon.type === 'hills'){
			horizonChildData.position.y = -1;
		}
		//Material
		let material;
		let textureSrc;
		let colorPickBase;
		if(horizon.texture){
			if(horizon.baseColor){
				colorPick = auxl.colorTheoryGen(horizon.baseColor);
			} else if(horizon.baseColorFamily){
				colorPick = auxl.colorTheoryGen(false, horizon.baseColorFamily);
			} else {
				colorPick = auxl.colorTheoryGen();
			}
			colorPickBase = colorPick.base;
			material = {shader: "standard", side: 'double', color: colorPickBase};

			if(horizon.texture.src){
				if(Array.isArray(horizon.texture.src)){
					textureSrc = horizon.texture.src[Math.floor(Math.random()*horizon.texture.src.length)];
				} else {
					textureSrc = horizon.texture.src;
				}
				material.src = textureSrc;
			}
			if(horizon.texture.repeat){
				material.repeat = horizon.texture.repeat;
			}
			if(horizon.texture.opacity){
				material.opacity = horizon.texture.opacity;
			}
			if(horizon.texture.metalness){
				material.metalness = horizon.texture.metalness;
			}
			if(horizon.texture.roughness){
				material.roughness = horizon.texture.roughness;
			}
			if(horizon.texture.emissive){
				material.emissive = colorPickBase;
			}
			if(horizon.texture.emissiveIntensity){
				material.emissiveIntensity = horizon.texture.emissiveIntensity;
			}

		} else if(horizon.baseColor){
			colorPick = auxl.colorTheoryGen(horizon.baseColor);
			mid = colorPick.base;
			top = colorPick.tetradic[0];
			bottom = colorPick.tetradic[1];
			material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
		} else if(horizon.baseColorFamily){
			colorPick = auxl.colorTheoryGen(false, horizon.baseColorFamily);
			mid = colorPick.base;
			top = colorPick.tetradic[0];
			bottom = colorPick.tetradic[1];
			material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
		} else {
			colorPick = auxl.colorTheoryGen();
			mid = colorPick.base;
			top = colorPick.tetradic[0];
			bottom = colorPick.tetradic[1];
			material = {shader: 'threeColorGradientShader', topColor: top, middleColor: mid, bottomColor: bottom, side: 'double'};
		}
		horizonChildData.material = material;
		//Core
		horizonChildCores[a] = auxl.Core(horizonChildData);
		//Layer
		horizonLayerData['child'+a] = {
			parent: {core: horizonParentCores[a]}, 
			child0: {core: horizonChildCores[a]},
		};
	}
	let horizonLayer = auxl.Layer('horizonLayer',horizonLayerData);
	//Spawn Horizon
	const SpawnHorizon = () => {
		if(horizon.inScene){}else{
			horizonLayer.SpawnLayer();
			horizon.inScene = true;
		}
	}
	//Despawn Horizon
	const DespawnHorizon = () => {
		if(horizon.inScene){
			horizonLayer.DespawnLayer();
			auxl.RemoveFromTracker(horizon.id);
			horizon.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(horizon.inScene){
			DespawnHorizon();
		} else {
			SpawnHorizon();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				horizon[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: horizon.id, type: 'horizon', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			horizon[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: horizon.id, type: 'horizon', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(horizon(flag[each]));
			}
			return flagArray;
		} else {
			return horizon[flag];
		}
	}

	return {horizon, SpawnHorizon, DespawnHorizon, ToggleSpawn, SetFlag, GetFlag};
}

//
//Ring of Objects
//Randomize Set of Objects from Single in a Ring Radius
const ObjsGenRing = (auxl, objRingData) => {
	let singleGen = Object.assign({}, objRingData);
	singleGen.inScene = false;
	let ogData = Object.assign({}, objRingData.objData);
	let objData = JSON.parse(JSON.stringify(objRingData.objData));
	singleGen.all = [];
	let posX;
	let posY;
	let posZ;
	let positionVec3;
	let scaleX;
	let scaleY;
	let scaleZ;
	let rotX;
	let rotY;
	let rotZ;
	let color;

	//Function to calculate distance between two points
	function distance(x1, z1, x2, z2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2) * 1.0);
	}
	//Return a random position within Ring radius
	function randomPosition(radius, yPos){
		posX = Math.random() * (radius*2) - radius;
		posZ = Math.random() * (radius*2) - radius;
		return new THREE.Vector3(posX, yPos, posZ);
	}
	//Generate Randomized Cores
	const genCores = () => {
		for(let a = 0; a < singleGen.total; a++){
			objData.id = ogData.id + a;
			//Color
			if(singleGen.ranColor){
				color = auxl.colorTheoryGen().base;
				objData.material.color = color;
				if(objData.material.emissive){
					objData.material.emissive = color;
				}
			}
			//Texture
			if(singleGen.ranTexture){
				objData.material.src = auxl.patterns[Math.floor(Math.random()*auxl.patterns.length)];
			}
			//Rotation
			rotX = objData.rotation.x;
			rotY = objData.rotation.y;
			rotZ = objData.rotation.z;
			if(singleGen.ranRotX){
				rotX += Math.random() * 360;
			}
			if(singleGen.ranRotY){
				rotY += Math.random() * 360;
			}
			if(singleGen.ranRotZ){
				rotZ += Math.random() * 360;
			}
			objData.rotation = new THREE.Vector3(rotX, rotY, rotZ);
			//Scale
			scaleX = singleGen.objData.scale.x;
			scaleY = singleGen.objData.scale.y;
			scaleZ = singleGen.objData.scale.z;
			if(singleGen.ranScaleX){
				scaleX += Math.random() * singleGen.scaleFlex;
			}
			if(singleGen.ranScaleY){
				scaleY += Math.random() * singleGen.scaleFlex;
			}
			if(singleGen.ranScaleZ){
				scaleZ += Math.random() * singleGen.scaleFlex;
			}
			objData.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);
			//Scale affects position
			posY = singleGen.objData.position.y;
			if(singleGen.ranYPos){
				posY += Math.random() * singleGen.yPosFlex;
			}
			//Position
			positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
			objData.position = positionVec3;
			//Max attempts to check for avoiding collision
			let checking = 42;
			checkAllData: while (checking > 0) {
				if(a === 0){
					if(distance(positionVec3.x,positionVec3.z,0,0) < singleGen.innerRingRadius) {
						positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				for(let z=0; z < singleGen.all.length; z++) {
					//Check the distance, if too close, change and repeat
					if(distance(positionVec3.x, positionVec3.z, singleGen.all[z].core.position.x, singleGen.all[z].core.position.z) < singleGen.sameTypeRadius || distance(positionVec3.x,positionVec3.z,0,0) < singleGen.innerRingRadius) {
						positionVec3 = randomPosition(singleGen.outerRingRadius, posY);
						checking--;
						continue checkAllData;
					} else {
						objData.position = positionVec3;
					}
				}
				break;
			}
			//Add randomized Core to All
			singleGen.all.push(auxl.Core(objData));
		}
	}
	//Spawn all Randomized Cores
	const SpawnObjRing = () => {
		if(singleGen.inScene){}else{
			genCores();
			for(let a = 0; a < singleGen.total; a++){
				singleGen.all[a].SpawnCore();
			}
			singleGen.inScene = true;
		}
	}
	//Despawn all Randomized Cores
	const DespawnObjRing = () => {
		if(singleGen.inScene){
			for(let a = 0; a < singleGen.total; a++){
				singleGen.all[a].DespawnCore();
			}
			auxl.RemoveFromTracker(singleGen.id);
			singleGen.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(singleGen.inScene){
			DespawnObjRing();
		} else {
			SpawnObjRing();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				singleGen[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: singleGen.id, type: 'singleGen', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			singleGen[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: singleGen.id, type: 'singleGen', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(singleGen(flag[each]));
			}
			return flagArray;
		} else {
			return singleGen[flag];
		}
	}

	return {singleGen, SpawnObjRing, DespawnObjRing, ToggleSpawn, SetFlag, GetFlag};
}

//
//Multi Asset Generator
//Randomize Sets of Various Sized Objects in various Ring Radius'
const MultiAssetGen = (auxl, multiGenData) => {
//Add the ability to read an array of different objects for same size
//Need to better optimize each size's radius
	let multiGen = Object.assign({}, multiGenData);
	multiGen.inScene = false;
	multiGen.assets = {}
	multiGen.assets.tiny = [];
	multiGen.assets.small = [];
	multiGen.assets.med = [];
	multiGen.assets.large = [];
	multiGen.assets.huge = [];
	let sizes = ['tiny','small','med','large','huge'];
	multiGen.grid = [];
	multiGen.ring0 = [];
	multiGen.ring1 = [];
	multiGen.ring2 = [];
	multiGen.ring3 = [];
	multiGen.ring4 = [];
	multiGen.ring5 = [];
	//Multi Ring Inner/Outer Radius'
	multiGen.ring = {
		i0:0.5,
		o0:4,
		i1:3,
		o1:25,
		i2:5,
		o2:60,
		i3:6,
		o3:80,
		i4:8,
		o4:100,
		i5:18,
		o5:150,
	};
	//Ring 0 - user spawn area - tiny/small
	//Ring 1 - immeadiately surrounding the spawn area - tiny/small/med
	//Ring 2 - a bit farther from spawn area - small/med/large
	//Ring 3 - medium distance from spawn - med/large
	//Ring 4 - far distance from spawn - large/huge
	//Ring 5 - super far distance from spawn - huge

	//On every loop through the grid creator, it will always use the center to spawn one, allow that one a parent, but do not use it for a spawning location

	//Start with 1 mega mutating grid and add each size's recently added only on grid during generation

	//Generate Distribution Points at Ring Radius'
	let ring5 = [];
	let ring4 = [];
	let ring3 = [];
	let ring2 = [];
	let ring1 = [];
	let ring0 = [];
	let gridRing5 = discSampling('ring5',multiGen.ring.o5,multiGen.ring.i5);
	let gridRing4 = discSampling('ring4',multiGen.ring.o4,multiGen.ring.i4,gridRing5);
	let gridRing3 = discSampling('ring3',multiGen.ring.o3,multiGen.ring.i3,gridRing4);
	let gridRing2 = discSampling('ring2',multiGen.ring.o2,multiGen.ring.i2,gridRing3);
	let gridRing1 = discSampling('ring1',multiGen.ring.o1,multiGen.ring.i1,gridRing2);
	let gridRing0 = discSampling('ring0',multiGen.ring.o0,multiGen.ring.i0,gridRing1);
	let ring5Current = 0;
	let ring4Current = 0;
	let ring3Current = 0;
	let ring2Current = 0;
	let ring1Current = 0;
	let ring0Current = 0;
	//Offset all to center and remove center
	for(let pos in ring5){
		ring5[pos][0] -= multiGen.ring.o5/2;
		ring5[pos][1] -= multiGen.ring.o5/2;
		if(ring5[pos][0] === 0 && ring5[pos][1] === 0){
			ring5[pos][0] = ring5[pos][1] = multiGen.ring.o5/2;
		}
	}
	for(let pos in ring4){
		ring4[pos][0] -= multiGen.ring.o4/2;
		ring4[pos][1] -= multiGen.ring.o4/2;
		if(ring4[pos][0] === 0 && ring4[pos][1] === 0){
			ring4[pos][0] = ring4[pos][1] = multiGen.ring.o4/2;
		}
	}
	for(let pos in ring3){
		ring3[pos][0] -= multiGen.ring.o3/2;
		ring3[pos][1] -= multiGen.ring.o3/2;
		if(ring3[pos][0] === 0 && ring3[pos][1] === 0){
			ring3[pos][0] = ring3[pos][1] = multiGen.ring.o3/2;
		}
	}
	for(let pos in ring2){
		ring2[pos][0] -= multiGen.ring.o2/2;
		ring2[pos][1] -= multiGen.ring.o2/2;
		if(ring2[pos][0] === 0 && ring2[pos][1] === 0){
			ring2[pos][0] = ring2[pos][1] = multiGen.ring.o2/2;
		}
	}
	for(let pos in ring1){
		ring1[pos][0] -= multiGen.ring.o1/2;
		ring1[pos][1] -= multiGen.ring.o1/2;
		if(ring1[pos][0] === 0 && ring1[pos][1] === 0){
			ring1[pos][0] = ring1[pos][1] = multiGen.ring.o1/2;
		}
	}
	for(let pos in ring0){
		ring0[pos][0] -= multiGen.ring.o0/2;
		ring0[pos][1] -= multiGen.ring.o0/2;
		if(ring0[pos][0] === 0 && ring0[pos][1] === 0){
			ring0[pos][0] = ring0[pos][1] = multiGen.ring.o0/2;
		}
	}
	//Shuffle Each Array for better randomness
	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}
	shuffle(ring5);
	shuffle(ring4);
	shuffle(ring3);
	shuffle(ring2);
	shuffle(ring1);
	shuffle(ring0);

	//Disc Sampling Support Function
	function discSampling(ring, area, space, currentGrid){
		//Generates grid starting from 0,0 in the + direction
		let grid;
		let center;
		if(currentGrid){
			center = currentGrid.center;
		} else {
			center = false;
		}
		function* poissonDiscSampler(width, height, radius, center){
			//radius is of the generated area
			//k is maximum number of samples before rejection
			const k = 15
			//radius2 is the minimum distance allowed between spawns
			const radius2 = radius * radius;
			//Math.SQRT1_2 is a constant square root of 0.5 which is ~0.707
			const cellSize = radius * Math.SQRT1_2;
			//Grid
			const gridWidth = Math.ceil(width / cellSize);
			const gridHeight = Math.ceil(height / cellSize);
			let queue = [];
			grid = new Array(gridWidth * gridHeight);
			if(currentGrid){
				for(let each in currentGrid){
					grid[each] = currentGrid[each];
					queue[each] = currentGrid[each];
				}
			}
			//Ignore center object
			if(center){
				yield {add: sample(center, center, null)};
			} else {
				yield {add: sample(width / 2 , height / 2, null)};
			}
			// Pick a random existing sample from the queue.
			pick: while (queue.length) {
				const i = Math.trunc(Math.random() * queue.length);
				const parent = queue[i];
				const seed = Math.random();
				const epsilon = 0.0000001;
				// Make a new candidate.
				for (let j = 0; j < k; ++j) {
					const a = 2 * Math.PI * (seed + 1.0*j/k);
					//Depending on the amount of tries allowed
					//start from 0degrees and move radius to check
					//as the loop continues/fails, keep moving counter-clockwise in equal parts depending on the current attempt number out of max
					//checking each new direction if that space is available
					const r = radius + epsilon;
					const x = parent[0] + r * Math.cos(a);
					const y = parent[1] + r * Math.sin(a);
					//Accept candidates that are inside the allowed extent and farther than 2 * radius to all existing samples.
					//area o0 4 aka outer radiues
					//space i0 0.5 aka inner radius
					if (space <= x && x < area && space <= y && y < area && far(x, y)) {
						//Accepted
						yield {add: sample(x, y), parent};
						//Try Again
						continue pick;
					}
				}
				//Rejected, remove from Queue
				const r = queue.pop();
				if (i < queue.length) queue[i] = r;
					yield {remove: parent};
			}

			function far(x, y) {
				const i = Math.trunc(x / cellSize);
				const j = Math.trunc(y / cellSize);
				const i0 = Math.max(i - 2, 0);
				const j0 = Math.max(j - 2, 0);
				const i1 = Math.min(i + 3, gridWidth);
				const j1 = Math.min(j + 3, gridHeight);
				//Only check surrounding squares of a 2x2 grid from candidate xy center
				//Loop through grid
				for (let j = j0; j < j1; ++j) {
					const o = j * gridWidth;
					for (let i = i0; i < i1; ++i) {
						const s = grid[o + i];
						//only does a check if something on the grid in that position exists
						if (s) {
							//get the difference in grid stored xy with the imported
							const dx = s[0] - x;
							const dy = s[1] - y;
							//pythagorean check for distance. Needs to be at least 2xRadius away from current check point
							if (dx * dx + dy * dy < radius2) return false;
						}
					}
				}
				return true;
			}
			//Accepted Sample, Add to Ring
			function sample(x, y, parent) {
				const s = grid[gridWidth * (Math.trunc(y / cellSize)) + (Math.trunc(x / cellSize))] = [x, y];
				queue.push(s);
				if(ring === 'ring5'){
					ring5.push(s);
				} else if(ring === 'ring4'){
					ring4.push(s);
				} else if(ring === 'ring3'){
					ring3.push(s);
				} else if(ring === 'ring2'){
					ring2.push(s);
				} else if(ring === 'ring1'){
					ring1.push(s);
				} else if(ring === 'ring0'){
					ring0.push(s);
				}
				return s;
			}
		}
		//Init Disc Sampling of Grid
		let gridSample = poissonDiscSampler(area,area,space,center);
		//Continue Disc Sampling
		function next(){
			gridSample.done = gridSample.next().done;
			if(gridSample.done){} else {
				next();
			}
		}
		//Start Disc Sampling of Grid
		next();
		//Prep Grid Array
		let goodGrid = [];
		for(let each in grid){
			if(grid[each]){
				goodGrid.push(grid[each]);
			}
		}
		return goodGrid;
	}
	//Generate Multi Objects Ring Cores w/ Randomization Support
	const genCores = () => {
		//Each Size
		for(let type in sizes){
			let size = Object.assign({}, multiGen[sizes[type]]);
			//Each Object Data
			for(let each in size.objs){
				let ogData = Object.assign({}, size.objs[each]);
				let objData = JSON.parse(JSON.stringify(size.objs[each]));
				let posX;
				let posY;
				let posZ;
				let positionVec3;
				let scaleX;
				let scaleY;
				let scaleZ;
				let rotX;
				let rotY;
				let rotZ;
				let color;
//instanced-mesh="positioning: local"
//instanced-mesh-member="mesh:#instanceTest1"
				//Each Object
				for(let a = 0; a < size.max/size.objs.length; a++){
					objData.id = ogData.id + a;
/* Instanced Mesh struggles with GLTF layers
<script src="https://cdn.jsdelivr.net/gh/diarmidmackenzie/instanced-mesh@v0.5.0/src/instanced-mesh.min.js"></script>
if(a === 0){
	objData.components['instanced-mesh'] = {positioning: 'world'};
} else {
	//Remove gltf component and add instanced mesh
	delete objData.components['gltf-model'];
	objData.components['instanced-mesh-member'] = {mesh: '#'+ogData.id+0};
}*/
					//Color
					if(size.ranColor){
						color = auxl.colorTheoryGen().base;
						objData.material.color = color;
						if(objData.material.emissive){
							objData.material.emissive = color;
						}
					}
					//Texture
					if(size.ranTexture){
						objData.material.src = auxl.patterns[Math.floor(Math.random()*auxl.patterns.length)];
					}
					//Rotation
					rotX = ogData.rotation.x;
					rotY = ogData.rotation.y;
					rotZ = ogData.rotation.z;
					if(size.ranRotX){
						rotX += Math.random() * 360;
					}
					if(size.ranRotY){
						rotY += Math.random() * 360;
					}
					if(size.ranRotZ){
						rotZ += Math.random() * 360;
					}
					objData.rotation = new THREE.Vector3(rotX, rotY, rotZ);
					//Scale
					scaleX = ogData.scale.x;
					scaleY = ogData.scale.y;
					scaleZ = ogData.scale.z;
					if(size.ranScaleX){
						scaleX += Math.random() * size.scaleFlex;
					}
					if(size.ranScaleY){
						scaleY += Math.random() * size.scaleFlex;
					}
					if(size.ranScaleZ){
						scaleZ += Math.random() * size.scaleFlex;
					}
					objData.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);
					//Position
					posY = ogData.position.y;
					if(size.ranYPos){
						posY += Math.random() * size.yPosFlex;
					}
					//If ran out of predefined positions, choose random
					if(size.rings === 0){
						if(ring0Current < ring0.length){
							posX = ring0[ring0Current][0];
							posZ = ring0[ring0Current][1];
							ring0Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
							posZ = (Math.random() * (multiGen.ring.o0*2) - multiGen.ring.o0) + multiGen.ring.i0;
						}
					} else if(size.rings === 1){
						if(ring1Current < ring1.length){
							posX = ring1[ring1Current][0];
							posZ = ring1[ring1Current][1];
							ring1Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
							posZ = (Math.random() * (multiGen.ring.o1*2) - multiGen.ring.o1) + multiGen.ring.i1;
						}
					} else if(size.rings === 2){
						if(ring2Current < ring2.length){
							posX = ring2[ring2Current][0];
							posZ = ring2[ring2Current][1];
							ring2Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
							posZ = (Math.random() * (multiGen.ring.o2*2) - multiGen.ring.o2) + multiGen.ring.i2;
						}
					} else if(size.rings === 3){
						if(ring3Current < ring3.length){
							posX = ring3[ring3Current][0];
							posZ = ring3[ring3Current][1];
							ring3Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
							posZ = (Math.random() * (multiGen.ring.o3*2) - multiGen.ring.o3) + multiGen.ring.i3;
						}
					} else if(size.rings === 4){
						if(ring4Current < ring4.length){
							posX = ring4[ring4Current][0];
							posZ = ring4[ring4Current][1];
							ring4Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
							posZ = (Math.random() * (multiGen.ring.o4*2) - multiGen.ring.o4) + multiGen.ring.i4;
						}
					} else if(size.rings === 5){
						if(ring5Current < ring5.length){
							posX = ring5[ring5Current][0];
							posZ = ring5[ring5Current][1];
							ring5Current++;
						} else {
							posX = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
							posZ = (Math.random() * (multiGen.ring.o5*2) - multiGen.ring.o5) + multiGen.ring.i5;
						}
					} 
					objData.position = new THREE.Vector3(posX, posY, posZ);
					//Add randomized Core to All
					multiGen.assets[sizes[type]].push(auxl.Core(objData));
				}
			}
		}
	}
	//Spawn All Assets
	const SpawnMultiAsset = () => {
		if(multiGen.inScene){}else{
			genCores();
			for(let type in sizes){
				let size = multiGen.assets[sizes[type]];
				for(let each in size){
					size[each].SpawnCore();
				}
			}
			multiGen.inScene = true;
		}
	}
	//Despawn All Assets
	const DespawnMultiAsset = () => {
		if(multiGen.inScene){
			for(let type in sizes){
				let size = multiGen.assets[sizes[type]];
				for(let each in size){
					size[each].DespawnCore();
				}
			}
			auxl.RemoveFromTracker(multiGen.id);
			multiGen.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(multiGen.inScene){
			DespawnMultiAsset();
		} else {
			SpawnMultiAsset();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				multiGen[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: multiGen.id, type: 'multiGen', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			multiGen[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: multiGen.id, type: 'multiGen', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(multiGen(flag[each]));
			}
			return flagArray;
		} else {
			return multiGen[flag];
		}
	}

	return {multiGen, SpawnMultiAsset, DespawnMultiAsset, ToggleSpawn, SetFlag, GetFlag}

}

//
//Teleport
//Generate Teleport Points at Array of Locations
const Teleport = (auxl, id, locations) => {
//Allow to select mutli-interactino circle, light beam and more.
	let teleport = {};
	teleport.id = id;
	teleport.inScene = false;
	teleport.all = [];
	let teleportLayer;
	let teleportLayerData;
	let teleportParent;
	let teleportParentId = '';
	let teleportChild0;//Confirm
	let teleportChild0Id = '';
	let teleportChild1;//Cancel
	let teleportChild1Id = '';
	let spotColor;

	//Build Teleport Multi-Interaction Layer
	for(let spot in locations){
		spotColor = auxl.colorTheoryGen().base;
		teleportParentId = 'teleport' + spot + 'Parent';
		auxl.teleportParentData.id = teleportParentId;
		auxl.teleportParentData.position = locations[spot];
		teleportParent = auxl.Core(auxl.teleportParentData);
		teleportChild0Id = 'teleport' + spot + 'Confirm';
		auxl.teleportConfirmData.id = teleportChild0Id;
		auxl.teleportConfirmData.material.color = spotColor;
		auxl.teleportConfirmData.material.emissive = spotColor;
		teleportChild0 = auxl.Core(auxl.teleportConfirmData);
		teleportChild1Id = 'teleport' + spot + 'Cancel';
		auxl.teleportCancelData.id = teleportChild1Id;
		auxl.teleportCancelData.material.color = spotColor.compl;
		auxl.teleportCancelData.material.emissive = spotColor.compl;
		teleportChild1 = auxl.Core(auxl.teleportCancelData);
		teleportLayerData = {
			parent: {core: teleportParent},
			child0: {core: teleportChild0},
			child1: {core: teleportChild1},
		}
		teleport.all[spot] = auxl.Layer('teleport'+spot, teleportLayerData);
	}
	//Spawn Teleports
	const SpawnTeleport = () => {
		if(teleport.inScene){}else{
			for(let each in teleport.all){
				teleport.all[each].SpawnLayer();
			}
			teleport.inScene = true;
		}
	}
	//Despawn Teleports
	const DespawnTeleport = () => {
		if(teleport.inScene){
			for(let each in teleport.all){
				teleport.all[each].DespawnLayer();
			}
			auxl.RemoveFromTracker(teleport.id);
			teleport.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(teleport.inScene){
			DespawnTeleport();
		} else {
			SpawnTeleport();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
				teleport[flagValue[each].flag] = flagValue[each].value;
				auxl.saveToProfile({auxlObject: teleport.id, type: 'teleport', sub: false, name: flagValue[each].flag, data: flagValue[each].value});
			}
		} else {
			teleport[flagValue.flag] = flagValue.value;
			auxl.saveToProfile({auxlObject: teleport.id, type: 'teleport', sub: false, name: flagValue.flag, data: flagValue.value});
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(teleport(flag[each]));
			}
			return flagArray;
		} else {
			return teleport[flag];
		}
	}

	return {teleport, SpawnTeleport, DespawnTeleport, ToggleSpawn, SetFlag, GetFlag,};
}

//
//Export
export {SkyBox, Horizon, ObjsGenRing, MultiAssetGen, Teleport};