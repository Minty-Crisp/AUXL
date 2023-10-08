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
import {clickfunc, clickrun, clickrunfunc, fusingrun, mousedownrun, mouseenterrun, mouseleaverun, mouseuprun, menurun, hoverrun, onspawnrun, onspawnfunc, ondespawnrun, oneventrun, ondelayrun, onintervalrun} from './support/run.js';
//
//Misc
import {syncPos, syncRot, lookAtXYZ, stare, hovertext} from './support/misc.js';
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
import {linkcable, camerasync, staticsync, collision, trigger, bodymaterial, auxconstraint, auxspring, gravitycontrol} from './support/physics.js';
//
//Modified Sound
import auxsound from './support/sound.js';

//
//External
//
//Third Party New ObjGen Support Demo
import auxlthirdparty from './external/other.js';
//
//Three Grad Shader
import threeColorGradientShader from './external/threeGradShader.js';

//
//Load
//
//Import Library
import library from './load/library.js';