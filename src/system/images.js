//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Images
//
//ImageSwapper
//ImageCarousel

//
//Image Swapper
const ImageSwapper = (id,mainData,buttonData,...materials) => {
//ToDo
//Add autoplay and pause on hovering
//Controls either left/right or thumbnails for each
	let imageSwapper = {};
	imageSwapper.id = id;
	imageSwapper.inScene = false;
	let imageSwapperCore;
	imageSwapper.thumbnailCores = [];
	let thumbnailPos = new THREE.Vector3(0,-0.3,0.05);
	imageSwapper.layerData = {}
	//Prep Layer Core Objects
	for(let mat in materials){
		if(mat === '0'){
			mainData.material = materials[mat];
			imageSwapperCore = auxl.Core(mainData);
			imageSwapper.layerData['parent'] = {};
			imageSwapper.layerData['parent'].core = imageSwapperCore;
		} else {
			buttonData.id = 'thumbnail' + mat;
			buttonData.material = materials[mat];
			if(materials.length === 3){
				if(mat === '1'){
					thumbnailPos.x = -0.25;
				} else if(mat === '2'){
					thumbnailPos.x = 0.25;
				}
			} else if(materials.length === 4){
				if(mat === '1'){
					thumbnailPos.x = -0.33;
				} else if(mat === '2'){
					thumbnailPos.x = 0;
				} else if(mat === '3'){
					thumbnailPos.x = 0.33;
				}
			} else if(materials.length === 5){
				if(mat === '1'){
					thumbnailPos.x = -0.375;
				} else if(mat === '2'){
					thumbnailPos.x = -0.125;
				} else if(mat === '3'){
					thumbnailPos.x = 0.125;
				} else if(mat === '4'){
					thumbnailPos.x = 0.375;
				}
			}
			buttonData.position = thumbnailPos;
			imageSwapper.thumbnailCores[mat] = auxl.Core(buttonData);
			imageSwapper.layerData['child'+mat] = {};
			imageSwapper.layerData['child'+mat].core = imageSwapper.thumbnailCores[mat];
		}
	}
	imageSwapper.layer = auxl.Layer('imageSwapper',imageSwapper.layerData);
	//Swap Material Sources with Parent
	const Click = (el) => {
		let selectedMat = el.getAttribute('material').src;
		let replacedMat = JSON.parse(JSON.stringify(el.parentNode.getAttribute('material').src));
		el.parentNode.setAttribute('material',{src: selectedMat})
		el.setAttribute('material',{src: replacedMat})
	}
	//Spawn ImageSwapper
	const SpawnImgSwap = () => {
		if(imageSwapper.inScene){}else{
			imageSwapper.layer.SpawnLayer();
			imageSwapper.inScene = true;
		}
	}
	//Despawn ImageSwapper
	const DespawnImgSwap = () => {
		if(imageSwapper.inScene){
			imageSwapper.layer.DespawnLayer();
			RemoveFromTracker(imageSwapper.id);
			imageSwapper.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(imageSwapper.inScene){
			DespawnImgSwap();
		} else {
			SpawnImgSwap();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			imageSwapper[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			imageSwapper[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(imageSwapper(flag[each]));
			}
			return flagArray;
		} else {
			return imageSwapper[flag];
		}
	}

	return {imageSwapper, Click, SpawnImgSwap, DespawnImgSwap, ToggleSpawn, SetFlag, GetFlag};
}

//
//ImageCarousel
const ImageCarousel = (carouselData) => {
//ToDo
//Allow the amount of frames to be adjusted
//Add 180 view non-movement functions
//Bug
//Changing between Forward & Reverse either way messes up which frames should be updated
	let imageCarousel = Object.assign({}, carouselData);
	imageCarousel.inScene = false;
	imageCarousel.frames = 8;//temp
	let playInterval;
	let updateTimeout;
	let scaleTimeout;
	imageCarousel.framesPerPage = 8;
	currentImageForward = -1;
	currentImageBackward = imageCarousel.images.length - imageCarousel.framesPerPage;
	let frameRotationEach = 360/imageCarousel.framesPerPage;
	let frameRotation = 0;
	currentRotation = -1;
	//Prep Movement Flags
	let notMoving = true;
	let notPlaying = true;
	let autoRotate = 0;
	let loadingPage = false;
	let animating = false;
	let scale = 0;
	let info = false;
	//Frame Templates & Prep
	let artFrameParentData = {
	data: 'artFrameParentData',
	id:'artFrameParent',
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
	let artFrameData = {
	data: 'artFrameData',
	id:'artFrame',
	sources: false,
	text: false,
	geometry: {primitive: 'box', depth: 0.01, width: 4.4, height: 2.55},
	material: {shader: "flat", color: "#55a5be", opacity: 1, alphaTest: 0.1},
	position: new THREE.Vector3(0,1.75,-6),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: {
	scale0:{property: 'scale', from: '1 1 1', to: '2 2 2', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to0'},
	position0:{property: 'position', from: '0 1.75 -6', to: '0 3.5 -12', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to0'},
	scale1:{property: 'scale', from: '2 2 2', to: '1 1 1', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to1'},
	position1:{property: 'position', from: '0 3.5 -12', to: '0 1.75 -6', dur: 2000, delay: 0, loop: 'false', dir: 'normal', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'to1'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	let artFrameTextData = {
	data: 'artFrameTextData',
	id:'artFrameText',
	sources: false,
	text: {value:'Art Frame Text', width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,-1.5,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	artFrameParentData.id = 'artFrameParentAll';
	artFrameParentData.rotation = new THREE.Vector3(0,1,0);
	let artFrameParentAll = auxl.Core(artFrameParentData);
	let artFrameAllLayerData = {
		parent: {core: artFrameParentAll},
	};
	let parentId = 'artFrameParent';
	let parentFrameCores = [];
	let frameId = 'artFrame';
	let imageFrameCores = [];
	let textId = 'artFrameText';
	let textFrameCores = [];
	//Build Cores
	for(let a=0; a < imageCarousel.frames; a++){

		//Temp
		if(a === 0){
			frameRotation = -45;
		} else if(a === 1){
			frameRotation = 0;
		} else if(a === 2){
			frameRotation = -315;
		} else if(a === 3){
			frameRotation = -270;
		} else if(a === 4){
			frameRotation = -225;
		} else if(a === 5){
			frameRotation = -180;
		} else if(a === 6){
			frameRotation = -135;
		} else if(a === 7){
			frameRotation = -90;
		}

		//Parent
		parentId = 'artFrameParent' + a;
		let parentRotation = new THREE.Vector3(0,0,0);
		parentRotation.y = frameRotation;
		artFrameParentData.id = parentId;
		artFrameParentData.rotation = parentRotation;
		parentFrameCores[a] = auxl.Core(artFrameParentData);
		//Frame
		frameId = 'artFrame' + a;
		artFrameData.id = frameId;
		imageFrameCores[a] = auxl.Core(artFrameData);
		//Text
		textId = 'artFrameText' + a;
		artFrameTextData.id = textId;
		textFrameCores[a] = auxl.Core(artFrameTextData);
		//Layer
		artFrameAllLayerData['child'+a] = {
			parent: {core: parentFrameCores[a]}, 
			child0: {
				parent: {core: imageFrameCores[a]}, 
				child0: {core: textFrameCores[a]}, 
			},
		};
	}
	let artFrameAllLayer = auxl.Layer('artFrameAllLayer',artFrameAllLayerData);
	//Main Button Color
	let mainColor = auxl.colorTheoryGen('#6ab0db');
	//Button Templates
	//Button Parent
	let buttonParentData = {
	data: 'Button Parent',
	id:'buttonParent',
	sources: false,
	text: false,
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,80,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
	scaleclick:{property: 'scale', from: '1 1 1', to: '1.05 1.05 1.05', dur: 125, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: false, enabled: true, startEvents: 'click'},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	//Button Obj
	let buttonObjData = {
	data: 'Button Obj',
	id:'buttonObj',
	sources: false,
	text: false,
	geometry: false,
	material: {shader: "flat", color: mainColor.base, opacity: 1},
	position: new THREE.Vector3(0,0.4,-2.5),
	rotation: new THREE.Vector3(-30,0,0),
	scale: new THREE.Vector3(0.1,0.1,0.1),
	animations:false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
	};
	//Button Border
	let buttonBorderData = {
	data: 'Button Border',
	id:'buttonBorder',
	sources: false,
	text: false,
	geometry: false,
	material: {shader: "flat", color: mainColor.splitCompl[0], opacity: 1},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:false,
	mixins: false,
	classes: ['a-ent'],
	components: {
	['obj-model']:{obj: './assets/3d/buttons/border.obj'},
	//['model-loaded']:null,
	},
	};
	//Button Click Background
	let buttonClickData = {
	data: 'Button Click Background',
	id:'buttonClick',
	sources: false,
	text: false,
	geometry: {primitive: 'circle', radius: 2, segments: 12},
	material: {shader: "flat", color: mainColor.splitCompl[1], opacity: 0.5, side: 'double'},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	//Button Click Background
	let buttonTextData = {
	data: 'Button Text',
	id:'buttonText',
	sources: false,
	text: {value:'Button', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'},
	geometry: false,
	material: false,
	position: new THREE.Vector3(0,-2.75,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: false,
	};
	//Button Layers
	//Backward
	buttonParentData.id = 'buttonBackwardParent';
	buttonParentData.rotation = new THREE.Vector3(0,22.5,0);
	let buttonBackwardParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/backward.obj'}};
	buttonObjData.id = 'buttonBackward';
	buttonBorderData.id = 'buttonBackwardBorder';
	buttonClickData.id = 'buttonBackwardClick';
	buttonTextData.id = 'buttonBackwardText';
	buttonTextData.text.value = 'Back';
	let buttonBackward = auxl.Core(buttonObjData);
	let buttonBackwardBorder = auxl.Core(buttonBorderData);
	let buttonBackwardClick = auxl.Core(buttonClickData);
	let buttonBackwardText = auxl.Core(buttonTextData);
	let buttonBackwardLayerData = {
	parent: {core: buttonBackwardParent}, 
	child0: {
		parent: {core: buttonBackward}, 
		child0: {core: buttonBackwardBorder},
		child1: {core: buttonBackwardClick},
		child2: {core: buttonBackwardText},
	},
	};
	let buttonBackwardLayer = auxl.Layer('buttonBackwardLayer',buttonBackwardLayerData);
	//Forward
	buttonParentData.id = 'buttonForwardParent';
	buttonParentData.rotation = new THREE.Vector3(0,-22.5,0);
	let buttonForwardParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/forward.obj'}};
	buttonObjData.id = 'buttonForward';
	buttonBorderData.id = 'buttonForwardBorder';
	buttonClickData.id = 'buttonForwardClick';
	buttonTextData.id = 'buttonForwardText';
	buttonTextData.text.value = 'Forward';
	let buttonForward = auxl.Core(buttonObjData);
	let buttonForwardBorder = auxl.Core(buttonBorderData);
	let buttonForwardClick = auxl.Core(buttonClickData);
	let buttonForwardText = auxl.Core(buttonTextData);
	let buttonForwardLayerData = {
	parent: {core: buttonForwardParent}, 
	child0: {
		parent: {core: buttonForward}, 
		child0: {core: buttonForwardBorder},
		child1: {core: buttonForwardClick},
		child2: {core: buttonForwardText},
	},
	};
	let buttonForwardLayer = auxl.Layer('buttonForwardLayer',buttonForwardLayerData);
	//Left Skip
	buttonParentData.id = 'buttonLeftSkipParent';
	buttonParentData.rotation = new THREE.Vector3(0,37.5,0);
	let buttonLeftSkipParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/left_skip.obj'}};
	buttonObjData.id = 'buttonLeftSkip';
	buttonBorderData.id = 'buttonLeftSkipBorder';
	buttonClickData.id = 'buttonLeftSkipClick';
	buttonTextData.id = 'buttonLeftSkipText';
	buttonTextData.text.value = 'Back Page';
	let buttonLeftSkip = auxl.Core(buttonObjData);
	let buttonLeftSkipBorder = auxl.Core(buttonBorderData);
	let buttonLeftSkipClick = auxl.Core(buttonClickData);
	let buttonLeftSkipText = auxl.Core(buttonTextData);
	let buttonLeftSkipLayerData = {
	parent: {core: buttonLeftSkipParent}, 
	child0: {
		parent: {core: buttonLeftSkip}, 
		child0: {core: buttonLeftSkipBorder},
		child1: {core: buttonLeftSkipClick},
		child2: {core: buttonLeftSkipText},
	},
	};
	let buttonLeftSkipLayer = auxl.Layer('buttonLeftSkipLayer',buttonLeftSkipLayerData);
	//Play
	buttonParentData.id = 'buttonPlayParent';
	buttonParentData.rotation = new THREE.Vector3(0,-7.5,0);
	let buttonPlayParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/play.obj'}};
	buttonObjData.id = 'buttonPlay';
	buttonBorderData.id = 'buttonPlayBorder';
	buttonClickData.id = 'buttonPlayClick';
	buttonTextData.id = 'buttonPlayText';
	buttonTextData.text.value = 'Play';
	let buttonPlay = auxl.Core(buttonObjData);
	let buttonPlayBorder = auxl.Core(buttonBorderData);
	let buttonPlayClick = auxl.Core(buttonClickData);
	let buttonPlayText = auxl.Core(buttonTextData);
	let buttonPlayLayerData = {
	parent: {core: buttonPlayParent}, 
	child0: {
		parent: {core: buttonPlay}, 
		child0: {core: buttonPlayBorder},
		child1: {core: buttonPlayClick},
		child2: {core: buttonPlayText},
	},
	};
	let buttonPlayLayer = auxl.Layer('buttonPlayLayer',buttonPlayLayerData);
	//Right Skip
	buttonParentData.id = 'buttonRightSkipParent';
	buttonParentData.rotation = new THREE.Vector3(0,-37.5,0);
	let buttonRightSkipParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/right_skip.obj'}};
	buttonObjData.id = 'buttonRightSkip';
	buttonBorderData.id = 'buttonRightSkipBorder';
	buttonClickData.id = 'buttonRightSkipClick';
	buttonTextData.id = 'buttonRightSkipText';
	buttonTextData.text.value = 'Next Page';
	let buttonRightSkip = auxl.Core(buttonObjData);
	let buttonRightSkipBorder = auxl.Core(buttonBorderData);
	let buttonRightSkipClick = auxl.Core(buttonClickData);
	let buttonRightSkipText = auxl.Core(buttonTextData);
	let buttonRightSkipLayerData = {
	parent: {core: buttonRightSkipParent}, 
	child0: {
		parent: {core: buttonRightSkip}, 
		child0: {core: buttonRightSkipBorder},
		child1: {core: buttonRightSkipClick},
		child2: {core: buttonRightSkipText},
	},
	};
	let buttonRightSkipLayer = auxl.Layer('buttonRightSkipLayer',buttonRightSkipLayerData);
	//Settings
	buttonParentData.id = 'buttonSettingsParent';
	buttonParentData.rotation = new THREE.Vector3(0,-52.5,0);
	let buttonSettingsParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/settings.obj'}};
	buttonObjData.id = 'buttonSettings';
	buttonBorderData.id = 'buttonSettingsBorder';
	buttonClickData.id = 'buttonSettingsClick';
	buttonTextData.id = 'buttonSettingsText';
	buttonTextData.text.value = 'Scale';
	let buttonSettings = auxl.Core(buttonObjData);
	let buttonSettingsBorder = auxl.Core(buttonBorderData);
	let buttonSettingsClick = auxl.Core(buttonClickData);
	let buttonSettingsText = auxl.Core(buttonTextData);
	let buttonSettingsLayerData = {
	parent: {core: buttonSettingsParent}, 
	child0: {
		parent: {core: buttonSettings}, 
		child0: {core: buttonSettingsBorder},
		child1: {core: buttonSettingsClick},
		child2: {core: buttonSettingsText},
	},
	};
	let buttonSettingsLayer = auxl.Layer('buttonSettingsLayer',buttonSettingsLayerData);
	//Stop
	buttonParentData.id = 'buttonStopParent';
	buttonParentData.rotation = new THREE.Vector3(0,7.5,0);
	buttonStopParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/stop.obj'}};
	buttonObjData.id = 'buttonStop';
	buttonBorderData.id = 'buttonStopBorder';
	buttonClickData.id = 'buttonStopClick';
	buttonTextData.id = 'buttonStopText';
	buttonTextData.text.value = 'Info';
	let buttonStop = auxl.Core(buttonObjData);
	let buttonStopBorder = auxl.Core(buttonBorderData);
	let buttonStopClick = auxl.Core(buttonClickData);
	let buttonStopText = auxl.Core(buttonTextData);
	let buttonStopLayerData = {
	parent: {core: buttonStopParent}, 
	child0: {
		parent: {core: buttonStop}, 
		child0: {core: buttonStopBorder},
		child1: {core: buttonStopClick},
		child2: {core: buttonStopText},
	},
	};
	let buttonStopLayer = auxl.Layer('buttonStopLayer',buttonStopLayerData);
	//Hashtag
	buttonParentData.id = 'buttonHashtagParent';
	buttonParentData.rotation = new THREE.Vector3(0,52.5,0);
	let buttonHashtagParent = auxl.Core(buttonParentData);
	buttonObjData.components = {['obj-model']:{obj: './assets/3d/buttons/hashtag.obj'}};
	buttonObjData.id = 'buttonHashtag';
	buttonBorderData.id = 'buttonHashtagBorder';
	buttonClickData.id = 'buttonHashtagClick';
	buttonTextData.id = 'buttonHashtagText';
	buttonTextData.text.value = 'Random Page';
	let buttonHashtag = auxl.Core(buttonObjData);
	let buttonHashtagBorder = auxl.Core(buttonBorderData);
	let buttonHashtagClick = auxl.Core(buttonClickData);
	let buttonHashtagText = auxl.Core(buttonTextData);
	let buttonHashtagLayerData = {
	parent: {core: buttonHashtagParent}, 
	child0: {
		parent: {core: buttonHashtag}, 
		child0: {core: buttonHashtagBorder},
		child1: {core: buttonHashtagClick},
		child2: {core: buttonHashtagText},
	},
	};
	let buttonHashtagLayer = auxl.Layer('buttonHashtagLayer',buttonHashtagLayerData);
	//Animations
	//Rotate 45
	let anim45Data = {
		name: 'anim45',
		property: 'object3D.rotation.y',
		from: '0',
		to: '45', 
		dur: 1000, 
		delay: 0, 
		loop: 'false', 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};
	//Rotate 45 from Misc
	let anim45MiscData = {
		name: 'anim45misc',
		property: 'object3D.rotation.y',
		from: '0',
		to: '1', 
		dur: 500, 
		delay: 0, 
		loop: 'false', 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};
	//Rotate 90
	let anim90Data = {
		name: 'anim90',
		property: 'object3D.rotation.y',
		from: '0',
		to: '90', 
		dur: 2500,
		delay: 0, 
		loop: 'false', 
		dir: 'normal', 
		easing: 'easeInOutSine', 
		elasticity: 400, 
		autoplay: true, 
		enabled: true,
	};
	//Rotate 360
	let anim360Data = {
		name: 'anim360',
		property: 'object3D.rotation.y',
		from: '0',
		to: '360', 
		dur: 120000, 
		delay: 0, 
		loop: 'true', 
		dir: 'normal', 
		easing: 'linear', 
		elasticity: 400, 
		autoplay: false, 
		enabled: true,
		startEvents: 'play',
		pauseEvents: 'pause',
	};
	//Update Frame's Image & Text Description
	const UpdateFrame = (frame, textValue, imgSrc) => {
		artFrameAllLayerData[frame].child0.parent.core.ChangeSelf({property: 'material', value:{src: imgSrc,shader: "flat", color: "#FFFFFF", opacity: 1}});
		artFrameAllLayerData[frame].child0.child0.core.ChangeSelf({property: 'text', value:{value: textValue, width: 3, color: "#FFFFFF", align: "center", font: "exo2bold", zOffset: 0, side: 'double'}})
	}
	//Update Frame from Direction
	const Update = (frame, direction) => {
		if(direction === 'forward'){
			currentImageForward++;
			currentImageBackward++;
			if(currentImageForward >= imageCarousel.images.length){
				currentImageForward = 0
			}
			if(currentImageBackward >= imageCarousel.images.length){
				currentImageBackward = 0
			}
			UpdateFrame('child'+frame, imageCarousel.images[currentImageForward].text, imageCarousel.images[currentImageForward].image);
		} else if(direction === 'backward'){
			currentImageBackward--;
			currentImageForward--;
			if(currentImageBackward < 0){
				currentImageBackward = imageCarousel.images.length-1;
			}
			if(currentImageForward < 0){
				currentImageForward = imageCarousel.images.length-1;
			}
			UpdateFrame('child'+frame, imageCarousel.images[currentImageBackward].text, imageCarousel.images[currentImageBackward].image);
		}
	}
	//Update All Frames
	const UpdateAll = (direction) => {
		for(let a = 0; a < imageCarousel.frames; a++){
			Update(a,direction);
		}
		loadingPage = false;
	}
	//Update Back 2 Frames
	const UpdateBackTwo = (direction) => {
		let update2 = [];
		let num;
		if(direction === 'forward'){
			if(currentRotation === 0){
				update2 = [0,1];
			} else if(currentRotation === 1){
				update2 = [2,3];
			} else if(currentRotation === 2){
				update2 = [4,5];
			} else if(currentRotation === 3){
				update2 = [6,7];
			}
		} else if(direction === 'backward'){
			if(currentRotation === 0){
				update2 = [6,7];
			} else if(currentRotation === 1){
				update2 = [0,1];
			} else if(currentRotation === 2){
				update2 = [2,3];
			} else if(currentRotation === 3){
				update2 = [4,5];
			}
			update2.reverse();
		}
		for(let each in update2){
			num = update2[each];
			Update(num,direction);
		}
	}
	//Update Back Frame
	const UpdateBack = (direction) => {
		let current = autoRotate;
		let num;
		if(current === 0){
			num = 3;
		} else if(current === 1){
			num = 2;
		} else if(current === 2){
			num = 1;
		} else if(current === 3){
			num = 0;
		} else if(current === 4){
			num = 7;
		} else if(current === 5){
			num = 6;
		} else if(current === 6){
			num = 5;
		} else if(current === 7){
			num = 4;
		}
		Update(num,direction);
	}
	//Spawn Image Carousel
	const SpawnImgCarousel = () => {
		if(imageCarousel.inScene){}else{
			artFrameAllLayer.SpawnLayer();
			buttonBackwardLayer.SpawnLayer();
			buttonHashtagLayer.SpawnLayer();
			buttonForwardLayer.SpawnLayer();
			buttonLeftSkipLayer.SpawnLayer();
			buttonPlayLayer.SpawnLayer();
			buttonRightSkipLayer.SpawnLayer();
			buttonSettingsLayer.SpawnLayer();
			buttonStopLayer.SpawnLayer();
			buttonBackwardClick.GetEl().addEventListener('click', Backward);
			buttonForwardClick.GetEl().addEventListener('click', Forward);
			buttonLeftSkipClick.GetEl().addEventListener('click', PrevPage);
			buttonPlayClick.GetEl().addEventListener('click', PlayPause);
			buttonRightSkipClick.GetEl().addEventListener('click', NextPage);
			buttonSettingsClick.GetEl().addEventListener('click', Scale);
			//buttonStopClick.GetEl().addEventListener('click', Stop);
			buttonHashtagClick.GetEl().addEventListener('click', RandomPage);
			Init();
			imageCarousel.inScene = true;
		}
	}
	//Despawn Image Carousel
	const DespawnImgCarousel = () => {
		if(imageCarousel.inScene){
			buttonBackwardClick.GetEl().removeEventListener('click', Backward);
			buttonForwardClick.GetEl().removeEventListener('click', Forward);
			buttonLeftSkipClick.GetEl().removeEventListener('click', PrevPage);
			buttonPlayClick.GetEl().removeEventListener('click', PlayPause);
			buttonRightSkipClick.GetEl().removeEventListener('click', NextPage);
			buttonSettingsClick.GetEl().removeEventListener('click', Scale);
			//buttonStopClick.GetEl().removeEventListener('click', Stop);
			buttonHashtagClick.GetEl().removeEventListener('click', RandomPage);
			artFrameAllLayer.DespawnLayer();
			buttonBackwardLayer.DespawnLayer();
			buttonHashtagLayer.DespawnLayer();
			buttonForwardLayer.DespawnLayer();
			buttonLeftSkipLayer.DespawnLayer();
			buttonPlayLayer.DespawnLayer();
			buttonRightSkipLayer.DespawnLayer();
			buttonSettingsLayer.DespawnLayer();
			buttonStopLayer.DespawnLayer();
			RemoveFromTracker(imageCarousel.id);
			imageCarousel.inScene = false;
		}
	}
	//Toggle Spawn
	const ToggleSpawn = () => {
		if(imageCarousel.inScene){
			DespawnImgCarousel();
		} else {
			SpawnImgCarousel();
		}
	}
	//Set Flag & Value to Object - Single or Array
	const SetFlag = (flagValue) => {
		if(Array.isArray(flagValue)){
			for(let each in flagValue){
			imageCarousel[flagValue[each].flag] = flagValue[each].value;
			}
		} else {
			imageCarousel[flagValue.flag] = flagValue.value;
		}
	}
	//Retreive Flag Value from Object - Single or Array
	const GetFlag = (flag) => {
		if(Array.isArray(flag)){
			let flagArray = [];
			for(let each in flag){
				flagArray.push(imageCarousel(flag[each]));
			}
			return flagArray;
		} else {
			return imageCarousel[flag];
		}
	}
	//Move Frames Forward 90 Degrees
	const Forward = () => {
		if(notMoving){
			notMoving = false;
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY - 90;
			artFrameAllLayer.AnimateParent(anim90Data);
			updateTimeout = setTimeout(() => {
				currentRotation++;
				if(currentRotation > 3){
					currentRotation = 0;
				}
				UpdateBackTwo('forward');
				notMoving = true;
				clearTimeout(updateTimeout);
			}, anim90Data.dur+10);
		}
	}
	//Move Frames Backward 90 Degrees
	const Backward = () => {
		if(notMoving){
			notMoving = false;
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim90Data.from = rotY;
			anim90Data.to = rotY + 90;
			artFrameAllLayer.AnimateParent(anim90Data);
			updateTimeout = setTimeout(() => {
				currentRotation--;
				if(currentRotation < 0){
					currentRotation = 3;
				}
				console.log(currentRotation);
				UpdateBackTwo('backward');
				notMoving = true;
				clearTimeout(updateTimeout);
			}, anim90Data.dur+10);
		}
	}
	//Toggle Rotating View Animation
	const PlayPause = () => {
		if(notPlaying){
			notPlaying = false;
			notMoving = false;
				playInterval = setInterval(() => {
					UpdateBack();
					currentRotation = autoRotate;
					if(currentRotation === 7){
						currentRotation = 0;
					} else {
						currentRotation++;
					}
				}, anim360Data.dur/8);
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim360Data.from = rotY;
			anim360Data.to = rotY - 360;
			artFrameAllLayer.AnimateParent(anim360Data);
			artFrameAllLayer.layer.all.parent.core.EmitEvent('play');

			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/pause.obj'} });
			buttonPlayText.ChangeSelf({property: 'text', value: {value:'Pause', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		} else {
			notPlaying = true;
			notMoving = true;
			clearInterval(playInterval);
			artFrameAllLayer.layer.all.parent.core.EmitEvent('pause');
			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} })
			buttonPlayText.ChangeSelf({property: 'text', value: {value:'Play', width: 20, color: mainColor.base, align: "center", font: "exo2bold", zOffset: 0, side: 'double'} })
		}
	}
	//Stops View Animation & Resets - Disabled
	const Stop = () => {
		if(notPlaying){} else {
			let rotY = artFrameAllLayer.GetParentEl().getAttribute('rotation').y;
			anim45MiscData.from = rotY;
			anim45MiscData.to = 1;
			artFrameAllLayer.AnimateParent(anim45MiscData);
			buttonPlay.ChangeSelf({property: 'obj-model', value:{obj: './assets/3d/buttons/play.obj'} });
			notPlaying = true;
			notMoving = true;
		}
	}
	//Load Next Page of Images
	const NextPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('forward');
		}
	}
	//Load Previous Page of Images
	const PrevPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			UpdateAll('backward');
		}
	}
	//Load Randomized Page of Images
	const RandomPage = () => {
		if(loadingPage){} else {
			loadingPage = true;
			currentImageForward = Math.floor(Math.random()*imageCarousel.images.length);
			UpdateAll('forward');
		}
	}
	//Adjust Frame Scale w/ Animation
	const Scale = () => {
		//limit effects to the amount of spawned frames
		if(animating){} else {
			animating = true;
			scaleTimeout = setTimeout(() => {
				animating = false;
				clearTimeout(scaleTimeout);
			}, 2050);
			if(scale === 0){
				scale = 1;
				artFrameAllLayerData.child0.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child1.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child2.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child3.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child4.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child5.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child6.child0.parent.core.EmitEvent('to0');
				artFrameAllLayerData.child7.child0.parent.core.EmitEvent('to0');
			} else {
				scale = 0;
				artFrameAllLayerData.child0.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child1.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child2.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child3.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child4.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child5.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child6.child0.parent.core.EmitEvent('to1');
				artFrameAllLayerData.child7.child0.parent.core.EmitEvent('to1');
			}
		}
	}
	//Toggle Display of Detail Info
	const Info = () => {
		if(info){
			info = false;
		} else {
			info = true;
		}
	}
	//Prep Images and Detail Info after Spawn
	const Init = () => {
		buttonStopClick.EnableDetail({text: imageCarousel.description, position: new THREE.Vector3(0,1.5,-2)});
		UpdateAll('forward');
	}

	return {imageCarousel, SpawnImgCarousel, DespawnImgCarousel, ToggleSpawn, SetFlag, GetFlag, PlayPause, Forward, Backward, NextPage, PrevPage, RandomPage, Scale, Info};
}

//
//Export
export {ImageSwapper, ImageCarousel};