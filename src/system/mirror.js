//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Mirrors


//Mirrors
const Mirrors = (auxl, mirrorData) => {
	let mirror = {}
	mirror.on = false;
	mirror.type = mirrorData.type || 'reflect';
	mirror.to = mirrorData.to || 'playerRig';
	mirror.id = 'mirror' + core.id +  Math.floor(Math.random().toFixed(8)*10000000);
	mirror.amount = 0;
	mirror.pos = new THREE.Vector3(0,0,0);
	mirror.always = true;

	//Build
	const Build = () => {
		//Type
		if(mirror.type === 'lock'){
			//Lock
			mirror.connect = {
				name: 'auxmirror__'+mirror.id,
				type: mirror.type,
				connectTo: mirror.to,
			};
		}
	}

	//Update
	const Update = (data) => {
		if(data){
			if(data.type){
				mirror.type = data.type;
			}
/*
			for(let each in data){
				if(typeof each[each] !== "undefined"){
					mirror[each] = each[data];
				}
			}
*/
		}
		Build();

	}
	//Update Self
//console.log({event: 'mirror prebuild', base: mirror, update: mirrorData})
	Update(mirrorData);
//console.log({event: 'mirror updated', base: mirror})
	//Connect To
	const Connect = (data) => {
		Update(data);
//console.log({core: mirror, update: data})
		//mirror.core.core.components[mirror.connect.name] = mirror.connect;
		//mirror.core.ChangeSelf({property: mirror.connect.name, value: mirror.connect}, true);
	}
	//Disconnect Self
	const Disable = () => {
		delete mirror.core.core.components[mirror.connect.name];
//console.log({event: 'mirror disconnet', base: mirror})
	}
	//Disconnect Self
	const Disconnect = () => {
		mirror.core.RemoveComponent(mirror.connect.name);
//console.log({event: 'mirror disconnet', base: mirror})
	}


	//Template
/*
	const Template = (data) => {
//console.log({event: 'Template', update: data})
	}
*/
	//Activate
	const Activate = (data) => {
//console.log({event: 'Activate', update: data})

//var mirrorMaterial = new THREE.MeshBasicMaterial( { color: 0x111111, envMap: mirrorCamera.renderTarget } );


	}
	//Deactivate
	const Deactivate = (data) => {
//console.log({event: 'Deactivate', update: data})
	}
	//Start
	const Start = (data) => {
//console.log({event: 'Start', update: data})
	}
	//Continue
	const Continue = (data) => {
//console.log({event: 'Continue', update: data})
	}
	//Stop
	const Stop = (data) => {
//console.log({event: 'Stop', update: data})
	}
	//Click
	const Click = (data) => {
//console.log({event: 'Click', update: data})
	}
	//Toggle
	const Toggle = (data) => {
//console.log({event: 'Toggle', update: data})
	}
	//Menu
	const Menu = (data) => {
//console.log({event: 'Menu', update: data})
	}
	//Directional
	const Directional = (data) => {
//console.log({event: 'Directional', update: data})
	}
	//Rotational
	const Rotational = (data) => {
//console.log({event: 'Rotational', update: data})
	}



	//Connect Right Away if On
	if(mirror.on){
		Connect();
	}

	return {mirror, Update, Connect, Disconnect, Disable, Activate, Deactivate, Start, Continue, Stop, Click, Toggle, Menu, Directional, Rotational};
}

export default Mirrors;