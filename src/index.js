//Import System & Components
//

//
//System
//
//Auxl
import auxl from './system/auxl.js';

//
//Games
//
//Arcade
//import arcade from './games/arcade.js';
//
//Pet
//import pet from './games/pet.js';
//
//RPG
//import rpg from './games/rpg.js';

//
//Support
//
//Controls
import controls from './support/controls.js';
//
//Movement
import {locomotion, gimbal, teleportation, raycastTeleport, raycastTeleportSelect, teleportto} from './support/movement.js';
//
//Run
import {clickfunc, clickrun, clickrunfunc, fusingrun, mousedownrun, mouseenterrun, mouseleaverun, mouseuprun, menurun, hoverrun, onspawnrun, onspawnfunc, ondespawnrun, oneventrun, ondelayrun, onintervalrun} from './support/run.js';
//
//Misc
import {syncPos, lookAtXYZ, stare, hovertext} from './support/misc.js';
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
import {camerasync, collision, trigger, bodymaterial, auxconstraint, auxspring, ungravity} from './support/physics.js';

//
//External
//
//Third Party ObjGen
import auxlthirdparty from './external/other.js';
//
//Three Grad Shader
import threeColorGradientShader from './external/threeGradShader.js';

//
//Load
//
//Import Library
import library from './load/library.js';