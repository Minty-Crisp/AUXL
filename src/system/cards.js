//
//AUXL : A-Frame UX Library
//v0.4 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Cards
//
//Build a Trading Card, Business Card, Playing Card, etc...

//Card
const Card = (auxl,cardData) => {
	let card = {};
	card.data = JSON.parse(JSON.stringify(cardData));
	card.id = cardData.id || auxl.RanNameGen();

	card.position = cardData.position || new THREE.Vector3();
	card.rotation = cardData.rotation || new THREE.Vector3();
	card.scale = cardData.scale || new THREE.Vector3(0.1,0.1,0.1);

	//Text
	card.title = cardData.title || card.id;
/*
Title
Specific
Background (3) Image, Video, Core or Layer
Color Palette
Body & Skills(3) w/ Title, Description & Cost
Attack(Strength) & Defense(Resiliance)
Logo
Number
Link(3) Icons w/ Hover Info
Signature
Flavor Text
*/

	//Colors
	card.colors = (cardData.colors && cardData.colors.base)? cardData.colors : auxl.ColorTheoryGen();

	//Text - Light
	//card.textColor = card.colors.mono[0];
	//Text - Dark
	//card.textColor = card.colors.mono[1];
/*
background : card.colors.mono[1]
body : card.colors.mono[1]
text : card.colors.compl
color1 : card.colors.base
color2 : card.colors.splitCompl[0]
color3 : card.colors.splitCompl[1]

let newColor1 = auxl.ColorTheoryGen(false, 'red');
newColor1.base
newColor1.compl
newColor1.splitCompl[0]
newColor1.splitCompl[1]
newColor1.triadic[0]
newColor1.triadic[1]
newColor1.tetradic[0]
newColor1.tetradic[1]
newColor1.tetradic[2]
newColor1.analog[0]
newColor1.analog[1]
newColor1.analog[2]
newColor1.mono[0]
newColor1.mono[1]
*/

	const BuildCardLayer = () => {
//Parent
card.parentData = {
	data:'parentData',
	id: card.id + 'parent',
	sources:false,
	text: false,
	geometry: false,
	material: false,
	position: card.position,
	rotation: card.rotation,
	scale: card.scale,
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
card.parent = auxl.Core(card.parentData);
//Icon
card.iconBaseData = {
	data:'iconBaseData',
	id: card.id + 'iconBase',
	sources: false,
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.175, height: 0.0125, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: "#fcfafd", emissive: '#fcfafd', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(90,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['a-ent'],
	components: false,
};
//card.iconBase = auxl.Core(card.iconBaseData);
//Text
card.textBaseData = {
	data:'textBaseData',
	id: card.id + 'textBase',
	sources:false,
	text: {value:'Card', wrapCount: 24, color: "#ffffff", font: "exo2bold", zOffset: 0.025, side: 'double', align: "center", baseline: 'center'},
	geometry: {primitive: 'box', width: 2.25, height: 0.25, depth: 0.2,},
	material: {shader: "standard", color: "#e7fa00", emissive: '#e7fa00', emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	position: new THREE.Vector3(0,0,0),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations:{
		click:{property: 'object3D.scale.y', to: 1, dur: 250, delay: 0, loop: '1', dir: 'alternate', easing: 'easeInOutSine', elasticity: 400, autoplay: true, enabled: true,},
	},
	mixins: false,
	classes: ['a-ent'],
	components: false,
};

//Background
card.backgroundData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'background',
	position: new THREE.Vector3(0,0,0),
	text: false,
	geometry: {primitive: 'box', width: 2.5, height: 3.5, depth: 0.1,},
	material: {shader: "standard", color: card.colors.mono[1], emissive: card.colors.mono[1], emissiveIntensity: 0.25, opacity: 0.85, side: 'double', metalness: 0.2, roughness: 0.8},


}, true);
card.background = auxl.Core(card.backgroundData);


//Display Name & ID
//Special Cost(6) Icons w/ Hover Info
card.titleBarData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'titleBar',
	position: new THREE.Vector3(0,1.5,0),
	text: {value: card.title, wrapCount: 24, color: card.colors.base.compl, font: "exo2bold", zOffset: 0.125, xOffset: 0.05,  side: 'double', align: "left", baseline: 'center'},
	material: {shader: "standard", color: card.colors.base, emissive: card.colors.base, emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},



}, true);
card.titleBar = auxl.Core(card.titleBarData);

//Notification
card.notificationBarData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'notificationBar',
	position: new THREE.Vector3(0,0,0),
	geometry: {primitive: 'box', width: 2, height: 0.225, depth: 0.15,},
	text: {value:'!-------!Notification!-------!', wrapCount: 24, color: "#ffffff", font: "exo2bold", zOffset: 0.125, xOffset: 0,  side: 'double', align: "center", baseline: 'center'},
	material: {shader: "standard", color: card.colors.splitCompl[1], emissive: card.colors.splitCompl[1], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},

}, true);
card.notificationBar = auxl.Core(card.notificationBarData);

//Title
//Specific
//Logo
card.controlBarData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'controlBar',
	position: new THREE.Vector3(0,-0.225,0),
	text: {value:'Title - Specific : Logo', wrapCount: 24, color: "#ffffff", font: "exo2bold", zOffset: 0.125, xOffset: 0.05,  side: 'double', align: "left", baseline: 'center'},

	material: {shader: "standard", color: card.colors.splitCompl[0], emissive: card.colors.splitCompl[0], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
}, true);
card.controlBar = auxl.Core(card.controlBarData);

//Body
card.textBodyData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'cardTextBody',
	position: new THREE.Vector3(0,-0.875,0),
	text: false,
	geometry: {primitive: 'box', width: 2.25, height: 1.5, depth: 0.15,},
	material: {shader: "standard", color: card.colors.mono[1], emissive: card.colors.mono[1], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	text: {value:'Body\n- Wrap :\nMore info...\n- Wrap :\nMore info...\n- Wrap :\nMore info...', wrapCount: 42, color: "#ffffff", font: "exo2bold", zOffset: 0.125, xOffset: 0.05,  xOffset: 0.05, side: 'double', align: "left", baseline: 'center'},

}, true);
card.textBody = auxl.Core(card.textBodyData);

//Accent
card.textAccentData = auxl.CoreDataFromTemplate(card.textBaseData, {
	id: card.id + 'textAccent',
	position: new THREE.Vector3(1,-1.5,0),
	text: false,
	geometry: {primitive: 'box', width: 0.525, height: 0.525, depth: 0.2,},
	material: {shader: "standard", color: card.colors.splitCompl[1], emissive: card.colors.splitCompl[1], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	text: {value:'Accent', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.125, xOffset: 0,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.textAccent = auxl.Core(card.textAccentData);

//Cost 1
card.costIcon1Data = auxl.CoreDataFromTemplate(card.iconBaseData, {
	id: card.id + 'costIcon1',
	position: new THREE.Vector3(0.95,1.26,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.base, emissive: card.colors.base, emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	//text: {value:'A', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.costIcon1 = auxl.Core(card.costIcon1Data);

//Cost 2
card.costIcon2Data = auxl.CoreDataFromTemplate(card.costIcon1Data, {
	id: card.id + 'cardCostIcon2',
	position: new THREE.Vector3(0.6,1.26,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.splitCompl[0], emissive: card.colors.splitCompl[0], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	//text: {value:'B', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.costIcon2 = auxl.Core(card.costIcon2Data);

//Cost 3
card.costIcon3Data = auxl.CoreDataFromTemplate(card.costIcon1Data, {
	id: card.id + 'costIcon3',
	position: new THREE.Vector3(0.25,1.26,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.splitCompl[1], emissive: card.colors.splitCompl[1], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	//text: {value:'B', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.costIcon3 = auxl.Core(card.costIcon3Data);

//Extra 1
card.extraIcon1Data = auxl.CoreDataFromTemplate(card.iconBaseData, {
	id: card.id + 'extraIcon1',
	position: new THREE.Vector3(1.1,-1.1,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.splitCompl[1], emissive: card.colors.splitCompl[1], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	text: {value:'A', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.extraIcon1 = auxl.Core(card.extraIcon1Data);

//Extra 2
card.extraIcon2Data = auxl.CoreDataFromTemplate(card.iconBaseData, {
	id: card.id + 'extraIcon2',
	position: new THREE.Vector3(1.1,-0.8,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.splitCompl[0], emissive: card.colors.splitCompl[0], emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	text: {value:'A', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.extraIcon2 = auxl.Core(card.extraIcon2Data);

//Extra 3
card.extraIcon3Data = auxl.CoreDataFromTemplate(card.iconBaseData, {
	id: card.id + 'extraIcon3',
	position: new THREE.Vector3(1.1,-0.5,0),
	text: false,
	geometry: {primitive: 'cylinder', radius: 0.15, height: 0.3, openEnded: false, segmentsHeight: 2, segmentsRadial: 24, thetaStart: 0, thetaLength: 360},
	material: {shader: "standard", color: card.colors.base, emissive: card.colors.base, emissiveIntensity: 0.25, opacity: 1, side: 'double', metalness: 0.2, roughness: 0.8},
	text: {value:'A', wrapCount: 8, color: "#ffffff", font: "exo2bold", zOffset: 0.155, xOffset: 0.05,  side: 'double', align: "center", baseline: 'center'},

}, true);
card.extraIcon3 = auxl.Core(card.extraIcon3Data);

//Layer
card.layerData = {
	parent: {core: card.parent},
	child0: {core: card.background},
	child1: {core: card.titleBar},//base
	child2: {core: card.controlBar},//split0
	child3: {core: card.notificationBar},//split1
	child4: {core: card.textBody},//mono1
	child5: {core: card.textAccent},//split1
	child6: {core: card.costIcon1},//base
	child7: {core: card.costIcon2},//split0
	child8: {core: card.costIcon3},//split1
	child9: {core: card.extraIcon1},//split1
	child10: {core: card.extraIcon2},//split0
	child11: {core: card.extraIcon3},//base
}
card.layer = auxl.Layer(card.id,card.layerData);


/*
//Large View
card.cardLargeLayerData = auxl.LayerDataFromTemplate(card.layerData, 'cardLarge',{scale: new THREE.Vector3(1,1,1),
position: new THREE.Vector3(4,1.7,3),
rotation: new THREE.Vector3(0,270,0),
}, false, true);


card.cardLarge = auxl.Layer('cardLarge',card.cardLargeLayerData);
*/
	}
	BuildCardLayer()

	const SpawnCard = () => {
		card.layer.SpawnLayer();
	}
	const DespawnCard = () => {
		card.layer.DespawnLayer();
	}

	return {card, SpawnCard, DespawnCard}

}

//
//Export
export default Card;