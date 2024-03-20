//Import System & Components
//

//
//System
//
//Auxl
import auxl from './system/auxl.js';

//
//Support
//
//Controls
import auxcontroller from './support/controls.js';
//
//Movement
import {locomotion, teleportation, raycastTeleport, raycastTeleportSelect, teleportto} from './support/movement.js';
//
//Run
import {clickfunc, clickrun, clickrunfunc, fusingrun, mousedownrun, mouseenterrun, mouseleaverun, mouseuprun, menurun, hoverrun, onspawnrun, onspawnfunc, onspawnfuncdual, ondespawnfuncdual, ondespawnrun, oneventrun, ondelayrun, onintervalrun} from './support/run.js';
//
//Misc
import {syncPos, syncRot, lookAtXYZ, stare, cameraForward, hovertext, lookaround} from './support/misc.js';
//
//Material
import {gltfmat, modifyMaterials} from './support/material.js';
//
//Menu
import {scroll} from './support/menu.js';
//
//Grid Doors
import {doorway, doorwayTrigger} from './support/doors.js';
//
//Inventory
import {clickaddinventory, acceptobject} from './support/inventory.js';
//
//Import Physics
//Cannon
import {linkcable, camerasync, staticsync, collision, trigger, bodymaterial, auxconstraint, auxspring, gravitycontrol} from './support/physics-cannon.js';
//Ammo
import {kinsync, ammoPush, ammoBounce} from './support/physics-ammo.js';

//
//Weather
import {rain, raindrop, lightningbolt} from './support/weather.js';

//
//Games

//
//Import Arcade
import arcade from './games/arcade.js';
//
//Import RPG
import rpg from './games/rpg.js';

//
//Modified A-Frame Components
//
//AUXL Sound
import auxlsound from './modified/auxl-sound.js';

//
//External
//
//Third Party New ObjGen Support Demo
import auxlthirdparty from './external/other.js';
//
//Three Grad Shader
import threeColorGradientShader from './external/threeGradShader.js';
//
//Animation Mixed
//import animMixer from './external/animation-mixer.js';
//
//Draw
//import draw from './external/aframe-draw-component.min.js';
//
//Cam
import {camrender, canvasUpdater, ortho} from './external/cam.js';

//
//Load
//
//Import Library
import library from './load/library.js';
//
//Import Start Scene & Library
import {startLibrary, startScenes} from './load/start.js';

//
//CSS
import baseCSS from '../assets/css/mvp.css';
import moreCSS from '../assets/css/style.css';