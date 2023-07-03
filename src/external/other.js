//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Third Party
//
//auxlthirdparty

//
//AUXL Third Party Showcase
//Externally built ObjGen testing example
const auxlthirdparty = AFRAME.registerComponent('auxl-third-party', {
dependencies: ['auxl'],
init: function () {
//AUXL System Connection
const auxl = document.querySelector('a-scene').systems.auxl;


//
//Testing Object Custom
auxl.TestObj = (id) => {

	let testObj = {};
	testObj.id = id;
	//Cube
	testObj.testData = {
	data:'testData',
	id:'test',
	sources: false,
	text: false,
	geometry: {primitive: 'box', depth: 0.5, width: 0.5, height: 0.5},
	material: {shader: "standard", src: auxl.pattern10, repeat: '1 1', color: "#52a539", emissive: '#52a539', emissiveIntensity: 0.25, opacity: 1},
	position: new THREE.Vector3(-1.5,2.5,-1.5),
	rotation: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(1,1,1),
	animations: false,
	mixins: false,
	classes: ['clickable','a-ent'],
	components: {
		doorway:{zone: 'zone0', to: 'connect0'},
	},
	};
	testObj.test = auxl.Core(testObj.testData);

	const SpawnTest = () => {
		testObj.test.SpawnCore();
	}

	const DespawnTest = () => {
		testObj.test.DespawnCore();
	}

	const TestMethod = (params) => {
		console.log(params);
	}

	return {testObj, SpawnTest, DespawnTest, TestMethod};
}
//Dynamically Add to Tracker
//name of the object inside of the ObjGen
//name of the Spawn and Despawn methods, must be unique
auxl.AddObjGenToTracker('testObj', 'SpawnTest', 'DespawnTest');
auxl.test = auxl.TestObj('test');

//Build Extra Objects
auxl.buildExtra = () => {

auxl.test = auxl.TestObj('test');

}
auxl.toBeRebuilt('buildExtra');


},
});

//
//Export
export default auxlthirdparty;