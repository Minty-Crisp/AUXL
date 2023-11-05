//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Weather
//
//rain
//raindrop
//lightningbolt

//
//Add Rain to the Scene
const rain = AFRAME.registerComponent('rain', {
    schema: {
        density: {type: 'number', default: 30},
    },
    init: function () {
		this.auxl = document.querySelector('a-scene').systems.auxl;
		//Audio
		if(this.auxl.audioEnabled){
        	this.playerAudio = document.querySelector('#playerAudio');
			this.playerAudio.emit('thunderstorm', {bubbles: false});
		}

        //Create Rain Entities
        let sceneEl = document.querySelector('a-scene'); 
        //Create rain Parent Entity to hold all
        let weather = document.createElement('a-entity');
		//Set ID
		this.parentId = 'rain';
		weather.setAttribute('id',this.parentId)
        //Set element class
        weather.classList.add("weather");
        //Add Rain Elements to scene
        sceneEl.appendChild(weather);
        //Allow for selecting various particles sizes, and speed
        //How many particles to create
        let particlesAmount = this.data.density;
        //Which particle to use
        let particleType = 'triangle'; //plane, triangle, etc...
        //How many particles to create
        let baseSize = 'large'; //small, normal, large
        //How fast animations should complete
        //Need to pass this variable to the raindrop component
        let particlesSpeed = 'normal'; //slow, normal, fast
        //Rain area to spawn
        let spawnRadius = 40;//40-100
        let spawnArea = spawnRadius/2;
        //Automosphere Height, Spawn Y Position
        let spawnHeight = 40;
        //Initialize Particles
        for (let i = 0; i < particlesAmount; i++) {
            //Create individual Entity for each particle
            let weatherEl = document.createElement('a-entity');
            //Create Entity to hold each rain drop and splash 
            let weatherElGroup = document.createElement('a-entity');
            //Set element class
            weather.classList.add("weatherElGroup");
            //Add group to main Weather Entity
            weather.appendChild(weatherElGroup);
            //Prep Size properties
            let sizeA;
            let sizeB;
            let sizeC;
            //Check Geometry Selection
            if (particleType === 'triangle') {
                //Triangle Sizes
                if (baseSize === 'small') {
                    sizeA = new THREE.Vector3(-0.015, -0.3, 0);
                    sizeB = new THREE.Vector3(0.015, -0.3, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                } else if (baseSize === 'large') {
                    sizeA = new THREE.Vector3(-0.04, -0.55, 0);
                    sizeB = new THREE.Vector3(0.04, -0.55, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                } else {//Normal
                    sizeA = new THREE.Vector3(-0.025, -0.4, 0);
                    sizeB = new THREE.Vector3(0.025, -0.4, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                }
                //Triangle Version
                weatherEl.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeA, vertexB: sizeB, vertexC: sizeC});
            } else { //Defaults to Plane
                //Plane Sizes
                if (baseSize === 'small') {
                    sizeA = 0.025;
                    sizeB = 0.5;
                } else if (baseSize === 'large') {
                    sizeA = 0.035;
                    sizeB = 0.5;
                } else {//Normal
                    sizeA = 0.025;
                    sizeB = 0.4;
                }
                //Plane Version
                weatherEl.setAttribute('geometry', {primitive: 'plane', width: 0.025, height: 0.5});
            }
            //Set Element material - Rain/Water
            weatherEl.setAttribute('material', {color: '#55a5be', opacity: 0.75, metalness: 0, roughness: 1, side: 'double'});
            //Set Element random starting Position
            let posX = Math.random() * spawnRadius - spawnArea;
            let posY = spawnHeight;
            let posZ = Math.random() * spawnRadius - spawnArea;
            weatherEl.setAttribute('position', {x: posX, y: posY, z: posZ});
            //Set Element random Scale
            weatherEl.setAttribute('scale', {x: Math.random() * 1 + 0.5, y: Math.random() * 1 + 0.5, z: Math.random() * 1 + 0.5});
            //Test set look-at component
            //weatherEl.setAttribute('look-at','#userView');
            //Set element class
            weatherEl.classList.add("weatherEl");
            //Attach raindrop Component for Anim | XZ Loop Change
            weatherEl.setAttribute('raindrop',{});
            //Splash
            //Generate a splash at floor level position
            let attachSplash = false;
			let weatherElSplash = false;
            if ( i !== 0 && i % 2 === 0 ){//Adjustable amount of splashes
                weatherElSplash = document.createElement('a-entity');
                //Prep Size properties
                let sizeSplashA = new THREE.Vector3(-0.1, -0.1, 0);
                let sizeSplashB = new THREE.Vector3(0.1, -0.1, 0);
                let sizeSplashC = new THREE.Vector3(0, 0, 0);
                //Triangle Version
                weatherElSplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
                //Splash Material - Water
                weatherElSplash.setAttribute('material', {color: '#327186', opacity: 0.75, metalness: 0, roughness: 1, side: 'double'});
                //Splash
                weatherElSplash.setAttribute('rotation', '-90 0 0');
                //Turn element invisible to start
                weatherElSplash.setAttribute('visible', false);
                //Match rain positioning
                weatherElSplash.setAttribute('position', {x: posX, y: '0.05', z: posZ});
                //Set element class
                weatherElSplash.classList.add("weatherElSplash");
                //Attach raindropsplash Component
                //weatherElSplash.setAttribute('raindropsplash', {});
                //Test change visibility in the raindrop component
                attachSplash = true;
            }
            //Add rain Elements to weather wrap Entity
            weatherElGroup.appendChild(weatherEl);
            //Add splash Elements to weather Entity
            if (attachSplash) {
                weatherElGroup.appendChild(weatherElSplash);
            }
        }
    },
	remove: function () {
		let sceneEl = document.querySelector('a-scene'); 
		let parentEl = document.getElementById(this.parentId);
		//Remove All Particles
		sceneEl.removeChild(parentEl);
		if(this.auxl.audioEnabled && this.playerAudio.components.sound__thunderstorm){
			this.playerAudio.components.sound__thunderstorm.stopSound();
		}
	},
});//rain component
//
//Rain Drop Animations
//Splash display does seem to line up perfectly for every el regardless of offsets
const raindrop = AFRAME.registerComponent('raindrop', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
        //Do something when component first attached.
        let element = this.el;
        let player = document.getElementById('playerRig');
        //Need to pass this info from the main Rain component
        //Rain area to spawn
        let spawnRadius = 40;//100
        let spawnArea = spawnRadius/2;
        //Add a random starting time to the animation for fluidity
        //Normal Speed
        let randomDelay = Math.floor(Math.random() * 2000); // 0 - 2 senconds
        //let randomDelay = 1000; testing
        let randomDur = Math.floor(Math.random() * 1000 + 1000); // 1 - 2 seconds
        //let randomDur = 4000; testing
        //Rain drop Animation Properties
        let positionParams = {
            property: 'object3D.position.y',
            to: -2,
            dur: randomDur,
            delay: randomDelay,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',
            enabled: 'true',
            };
        //Attach Anim to Element
        element.setAttribute('animation__drop', positionParams);
        //Rain drop splash check
        let splash = false;
        //Check if a sibling exists, if so set to true
        let weatherElSplash = element.nextSibling;
        if (weatherElSplash){
            splash = true;
        }
        function splashAnim () {
            //Display splash
            weatherElSplash.setAttribute('visible', true);
            //Let Splash Animation finish
            setTimeout(function() {
                weatherElSplash.setAttribute('visible', false);
                let weatherPos = element.getAttribute('position');
                weatherElSplash.setAttribute('position', {x: weatherPos.x, z: weatherPos.z});
            }, 500);//Splash anim duration
        }
        //Adjust rain Element XZ position after loop completion
        function changeXZ () {
            //Get User's current XZ position
            let userPos = player.getAttribute('position');
            //Offset XZ with User position
            let newX = Math.random() * spawnRadius - spawnArea + userPos.x;
            let newZ = Math.random() * spawnRadius - spawnArea + userPos.z;
            //Set new XZ position for rain
            element.setAttribute('position', {x: newX, z: newZ});
        }//changeXZ Function
        //Change XZ after first loop is finished every loop afterwards
        this.splashTimeout = setTimeout(function () {
            setInterval(changeXZ, randomDur);
            if (splash){
                setInterval(splashAnim, randomDur);
            }
        }, randomDelay + randomDur);
    },
	remove: function(){
		//stop audio
		clearTimeout(this.splashTimeout)
	},
});
//
//Lightning Bolt Creator and Handler
const lightningbolt = AFRAME.registerComponent('lightningbolt', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
		this.auxl = document.querySelector('a-scene').systems.auxl;
        let sceneEl = document.querySelector('a-scene'); 
        //let element = this.el;
        let user = document.querySelector('#playerRig');
        //Need to pass this info from the main Rain component
        //Rain area to spawn
        let lightningRadius = 80;//100
        let lightningArea = lightningRadius/2;
        //Time in between lightning strikes
        let intervalTime = Math.floor((Math.random() * 5000) + 15000 ); // 15 - 20 senconds
        //Test Logging
        //console.log("Bolt Interval Time: " + intervalTime);
        //Lightning bolt Parent wrapper
        let bolt = document.createElement('a-entity');
        bolt.setAttribute('position', {x:'0' , y: '0', z: '0'});
        bolt.setAttribute('scale', '1 1 1');
        bolt.setAttribute('id', 'lightningbolt');
        bolt.setAttribute('visible', false);
        bolt.classList.add("bolt");
        //Rain drop Animation Properties
        let visibleParams = {
            property: 'visible',
            from: false,
            to: true,
            dur: 250,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        bolt.setAttribute('animation__visibility', visibleParams);
        sceneEl.appendChild(bolt); //double check emitter for this anim
        //Lightning bolt Parent wrapper
        let lightningbolt = document.createElement('a-entity');
        lightningbolt.setAttribute('position', {x:'0' , y: '7.5', z: '-3'});
        lightningbolt.setAttribute('scale', '10 10 0');
        lightningbolt.classList.add("lightningbolt");
        bolt.appendChild(lightningbolt);
        //Lightning bolt splash sizes
        let sizeSplashA = new THREE.Vector3(-0.05, -0.5, 0);
        let sizeSplashB = new THREE.Vector3(0.05, -0.5, 0);
        let sizeSplashC = new THREE.Vector3(0, 0, 0);
        //Lightning bolt splash left
        let lightningboltleftsplash = document.createElement('a-entity');
        lightningboltleftsplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
        lightningboltleftsplash.setAttribute('position', {x:'-0.15' , y: '-0.7', z: '0'});
        lightningboltleftsplash.setAttribute('scale', '0.25 0.25 0.25');
        lightningboltleftsplash.setAttribute('rotation', '0 0 215');
        lightningboltleftsplash.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        lightningboltleftsplash.classList.add("lightningboltleftsplash");
        //Splash left Scale anim properties
        let leftScaleParams = {
            property: 'scale',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltleftsplash.setAttribute('animation__scale', leftScaleParams);
        //Splash left Rotation anim properties
        let leftRotateParams = {
            property: 'rotation',
            from: '0 0 215',
            to: '0 0 250',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltleftsplash.setAttribute('animation__rotation', leftRotateParams);
        //Append to Lightning Bolt parent Entity
        lightningbolt.appendChild(lightningboltleftsplash);
        //Main bolt wrapper
        let mainBoltWrapper = document.createElement('a-entity');
        mainBoltWrapper.setAttribute('rotation', '0 0 -5');
        mainBoltWrapper.classList.add("midBoltWrapper");
        lightningbolt.appendChild(mainBoltWrapper);
        //Top bolt wrapper
        let boltTopWrapper = document.createElement('a-entity');
        boltTopWrapper.setAttribute('rotation', '0 0 0');
        boltTopWrapper.setAttribute('scale', '0.25 1 1');
        boltTopWrapper.classList.add("boltTopWrapper");
        mainBoltWrapper.appendChild(boltTopWrapper);
        //Top bolt
        let topBolt = document.createElement('a-entity');
        topBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        topBolt.setAttribute('position', {x:'1.6' , y: '4', z: '0'});
        topBolt.setAttribute('rotation', '0 0 45');
        topBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        topBolt.classList.add("topBolt");
        boltTopWrapper.appendChild(topBolt);
        //TopMid bolt wrapper
        let boltTopMidWrapper = document.createElement('a-entity');
        boltTopMidWrapper.setAttribute('rotation', '0 0 0');
        boltTopMidWrapper.setAttribute('scale', '0.25 1 1');
        boltTopMidWrapper.classList.add("boltTopMidWrapper");
        mainBoltWrapper.appendChild(boltTopMidWrapper);
        //TopMid bolt
        let topMidBolt = document.createElement('a-entity');
        topMidBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        topMidBolt.setAttribute('position', {x:'1.2' , y: '3', z: '0'});
        topMidBolt.setAttribute('rotation', '0 0 45');
        topMidBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        topMidBolt.classList.add("topMidBolt");
        boltTopMidWrapper.appendChild(topMidBolt);
        //Mid bolt wrapper
        let boltMidWrapper = document.createElement('a-entity');
        boltMidWrapper.setAttribute('rotation', '0 0 0');
        boltMidWrapper.setAttribute('scale', '0.25 1 1');
        boltMidWrapper.classList.add("boltMidWrapper");
        mainBoltWrapper.appendChild(boltMidWrapper);
        //Mid bolt
        let midBolt = document.createElement('a-entity');
        midBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        midBolt.setAttribute('position', {x:'0.8' , y: '2', z: '0'});
        midBolt.setAttribute('rotation', '0 0 45');
        midBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        midBolt.classList.add("midBolt");
        boltMidWrapper.appendChild(midBolt);
        //BottomMid bolt wrapper
        let boltBottomMidWrapper = document.createElement('a-entity');
        boltBottomMidWrapper.setAttribute('rotation', '0 0 0');
        boltBottomMidWrapper.setAttribute('scale', '0.25 1 1');
        boltBottomMidWrapper.classList.add("boltBottomMidWrapper");
        mainBoltWrapper.appendChild(boltBottomMidWrapper);
        //BottomMid bolt
        let bottomMidBolt = document.createElement('a-entity');
        bottomMidBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        bottomMidBolt.setAttribute('position', {x:'0.4' , y: '1', z: '0'});
        bottomMidBolt.setAttribute('rotation', '0 0 45');
        bottomMidBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        bottomMidBolt.classList.add("bottomMidBolt");
        boltBottomMidWrapper.appendChild(bottomMidBolt);
        //Bottom bolt wrapper
        let boltBottomWrapper = document.createElement('a-entity');
        boltBottomWrapper.setAttribute('rotation', '0 0 0');
        boltBottomWrapper.setAttribute('scale', '0.25 1 1');
        boltBottomWrapper.classList.add("boltBottomWrapper");
        mainBoltWrapper.appendChild(boltBottomWrapper);
        //Bottom bolt
        let bottomBolt = document.createElement('a-entity');
        bottomBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        bottomBolt.setAttribute('position', {x:'0' , y: '0', z: '0'});
        bottomBolt.setAttribute('rotation', '0 0 45');
        bottomBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        bottomBolt.classList.add("bottomBolt");
        boltBottomWrapper.appendChild(bottomBolt);
        //Lightning bolt splash right
        let lightningboltrightsplash = document.createElement('a-entity');
        lightningboltrightsplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
        lightningboltrightsplash.setAttribute('position', {x:'0.05' , y: '-0.7', z: '0'});
        lightningboltrightsplash.setAttribute('scale', '0.25 0.25 0.25');
        lightningboltrightsplash.setAttribute('rotation', '0 0 -215');
        lightningboltrightsplash.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        lightningboltrightsplash.classList.add("lightningboltrightsplash");
        //Splash left Scale anim properties
        let rightScaleParams = {
            property: 'scale',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltrightsplash.setAttribute('animation__scale', rightScaleParams);
        //Splash left Rotation anim properties
        let rightRotateParams = {
            property: 'rotation',
            from: '0 0 -215',
            to: '0 0 -250',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltrightsplash.setAttribute('animation__rotation', rightRotateParams);
        //Append to Lightning Bolt parent Entity
        lightningbolt.appendChild(lightningboltrightsplash);
        //Bolt floor
        let boltfloor = document.createElement('a-entity');
        boltfloor.setAttribute('geometry', {primitive: 'circle', radius: 4, segments: 16});
        boltfloor.setAttribute('position', {x:'-0.5' , y: '0.2', z: '-3'});
        boltfloor.setAttribute('rotation', '-90 0 0');
        boltfloor.setAttribute('material', {color: '#dba54f', opacity: 0.75, shader: 'flat', side: 'double'});
        boltfloor.classList.add("boltfloor");
        bolt.appendChild(boltfloor);
        //Bolt cloud
        let boltCloud = document.createElement('a-entity');
        boltCloud.setAttribute('gltf-model',this.auxl.cloud0);
        boltCloud.setAttribute('position', {x:'6' , y: '50', z: '-2'});
        boltCloud.setAttribute('rotation', '0 0 180');
        boltCloud.classList.add("boltCloud");
        bolt.appendChild(boltCloud);
        //Ambient Light
        let ambientLight;
        if (document.querySelector('#ambientLight')) {
            ambientLight = document.querySelector('#ambientLight');
            ambientLight.setAttribute('light',{type: 'ambient', color: '#716a9a', intensity: 0.5});
        } else {
            ambientLight = document.createElement('a-entity');
            ambientLight.setAttribute('light',{type: 'ambient', color: '#716a9a', intensity: 0.5});
            ambientLight.setAttribute('id','#ambientLight');
            sceneEl.appendChild(ambientLight);
            //search all entitys for an ambient light and modify it if it exists
            //let ambientLightSearch = document.querySelectorAll('a-entity');
            //for(let i=0; i < ambientLightSearch.length; i++){
                //if(ambientLightSearch[i].getAttribute('light').ambient) {
                    //ambientLight = ambientLightSearch[i];
                    //currently will select the last ambient light found
                    //create an array to store all found ambient lights
                    //grab one to reset values and delete the rest?
                   //}
            //}
        }
        //Lighting anim 1
        let lighting1 = {
            property: 'light.intensity',
            from: '0.5',
            to: '4.5',
            dur: 1,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeOutCirc',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt1', lighting1);
        //Lighting anim 2
        let lighting2 = {
            property: 'light.intensity',
            from: '4.5',
            to: '0',
            dur: 200,
            delay: 300,
            loop: 'false',
            dir: 'normal',
            easing:'easeInElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt2', lighting2);
        //Lighting anim 3
        let lighting3 = {
            property: 'light.intensity',
            from: '0',
            to: '2.5',
            dur: 1,
            delay: 500,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt3', lighting3);
        //Lighting anim 4
        let lighting4 = {
            property: 'light.intensity',
            from: '3.5',
            to: '0',
            dur: 200,
            delay: 500,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt4', lighting4);
        //Lighting anim 5
        let lighting5 = {
            property: 'light.intensity',
            from: '0',
            to: '3.5',
            dur: 1,
            delay: 700,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt5', lighting5);
        //Lighting anim 6
        let lighting6 = {
            property: 'light.intensity',
            from: '2.5',
            to: '0.5',
            dur: 50,
            delay: 1000,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt6', lighting6);
        //Bolt Scene Connectors
        let boltWrap = document.querySelector('.bolt');
        let boltLeft = document.querySelector('.lightningboltleftsplash');
        let boltRight = document.querySelector('.lightningboltrightsplash');
        let boltSound = document.querySelector('#playerAudio');
        //Spawn with the User
        function spawnWithUser(){
            //Get User's current XZ position
            let userPos = user.getAttribute('position');
            //Offset XZ with User position
            let newX = ((Math.random() * lightningRadius) - lightningArea) + userPos.x;
            let newZ = ((Math.random() * lightningRadius) - lightningArea) + userPos.z;
            //Change XZ position
            boltWrap.setAttribute('position', {x: newX, y: 0.15, z: newZ});
        }
        //Initialize starting position
        spawnWithUser()
        //Lightning Bolt anim
        this.boltInterval = setInterval(() => {
			if(this.auxl.audioEnabled){
				boltSound.emit('boltHit');
			}
			setTimeout(() => {
				boltWrap.setAttribute('visible', true);
				ambientLight.emit('boltHit');
				setTimeout(() => {
					boltWrap.emit('boltHit');
					boltLeft.emit('boltHit');
					boltRight.emit('boltHit');
					//Reset anim properties
					setTimeout(() => {
						boltWrap.setAttribute('visible', false);
						bolt.emit('boltStop');
						ambientLight.emit('boltStop');
						//ambientLight.setAttribute('visible', true);
						boltLeft.emit('boltStop');
						boltLeft.setAttribute('scale','0.25 0.25 0.25');
						boltLeft.setAttribute('rotation','0 0 215');
						boltRight.emit('boltStop');
						boltRight.setAttribute('scale','0.25 0.25 0.25');
						boltRight.setAttribute('rotation','0 0 -215');
						//Update XYZ Coords
						spawnWithUser()
					}, 800); //Timeout
				}, 250); //Timeout
			}, 1500); //Sound delay adjustment
        }, intervalTime);
    },
	remove: function () {
		clearInterval(this.boltInterval);
		let sceneEl = document.querySelector('a-scene'); 
		let parentEl = document.getElementById('lightningbolt');
		//Remove All Particles
		sceneEl.removeChild(parentEl);
	},
});

export {rain, raindrop, lightningbolt};