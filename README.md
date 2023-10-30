# AUXL : A-Frame UX Library :palm_tree: v0.3

## Web XR World, System, Object Generator Engine & Universal Controller

[View Wiki](https://github.com/Minty-Crisp/AUXL/wiki)

[Launch v0.3 In-Progress Demo Scenario](https://minty-crisp.github.io/AUXL/)

![Grid Demo Preview](https://github.com/Minty-Crisp/AUXL/blob/main/assets/img/preview/mintycrisp-auxl-preview1.jpg)

[Launch v0.3 Physics Testing Demo Integration](https://minty-crisp.github.io/AUXL/physics.html)

![Physics Demo Preview](https://github.com/Minty-Crisp/AUXL/blob/main/assets/img/preview/mintycrisp-auxl-preview2.jpg)

#### Project's using AUXL
[Minty's XRcade Repo](https://github.com/Minty-Crisp/XRcade)

![Minty's XRcade Preview](https://github.com/Minty-Crisp/XRcade/blob/main/assets/img/previews/mintyxr-cade-revamp0.jpg)

[Launch Minty's XRcade](https://mintyxr.com)

### v0.3 Wiki Update and Starter Coming Soon!!!
Learn how to build your first v0.2 AUXL Scenario with the [Getting Started with AUXL](https://github.com/Minty-Crisp/AUXL/wiki/Getting-Started-with-AUXL) guide using the [Starter Scenario](https://minty-crisp.github.io/AUXL/starter.html).

AUXL Summary : :star2:
---
AUXL is a javascript engine built to streamline and unify the creation of Web XR experiences based on [A-Frame](https://github.com/aframevr/) & [Three.js](https://threejs.org/). It provides a variety of critical system, object, scene and scenario building tools that allows the user to create XR experiences as if they were making classic 2D HTML websites or game worlds. The types of website styles that can be built with are as endless as the web itself. Anything like a portfolio, gallery, blog, virtual tour, visual novel, video game and more. I envision the system to be a combination of tools like Wordpress and Unity with a long term plan to create 2D/3D admin panel like generation tools to open access to all users in creating their own personal XR content. It is being released under the GPL 3.0 license for all to use and hopefully will help with the adoption of the Web XR ecosystem.

AUXL is built to accomplish a few main goals : :hearts:
---
- Dynamic Experiences : Swap through World experiences in a single browser session that each have their own set of Scenario defined builds and navigatable Zone maps of Scenes.
- System Support : XR profile data with Save/Load/Reset as well as various internal functions and components to add all sorts of functionality to the experience.
- Object Generators : All of the various basic and special objects that you would use, view & interact with inside the 3D environment.
- Universal Controls : The unified hardware input controls for interacting with the 3D content that a browser can communicate with.

[Read more about the System Overview in the Wiki](https://github.com/Minty-Crisp/AUXL/wiki/System-Overview)

Control Configurations : :eyes:
---
- Raycaster Interaction : (Complete)
- Physics Interaction : (In-Progress)
- Desktop : Mouse & Keyboard (Complete)
- Mobile : Touchscreen (Complete)
- VR Advanced : Dual 6DoF Controllers (Complete)
- VR Basic : Single 3DoF Button Controller (In-Progress)
- VR Mobile : Headset Only (Soon)
- Game Controller (Soon)
- Hand Tracking : Dual Hand Movements (Soon)
- Assitive Technology and Alternative Use of Above Hardware (Designing)

[Read more about the controls in the Wiki](https://github.com/Minty-Crisp/AUXL/wiki/Customizing-AUXL-Controls)

A few cool features of AUXL to highlight : :first_quarter_moon_with_face:
---
- Reusable & remixable data to build more with less.
- Generate various types of in-scene entities all with an abundant amount of customizations and controls.
- Map out how the Player moves along the World, Scenario, Zone and Scenes with support for Lock & Keys.
- Object spawn tracking for each Scenario, Zone, Scene and Book instructions.
- Scene Swap/Teleportation transition animations with dynamic loading times to account for new asset downloads.
- Dynamically load in component javascript URLs as needed.
- Configure unique controls to object methods or component methods within a Scenario, Zone and Scene and view current loadout for specific type (i.e. Mobile, Desktop, VR, etc...).
- Build Scenario, Zone and Scene instructions with on start, delay, interval, interaction, event, exit & if/else conditionals.
- Interactable NPC object with text bubble speech system using their Book as instructions for progression, idle or random timeline.
- Companion object with access to settings, inventory and more.
- Built in Player Rig with locomotion, teleportation, snap turning, crouching, sitting mode & adjustable walk speed actions.
- Prebuilt AUXL object library to utilize in addition to your own library.
- Extendable system to build new custom objects that take advantage of AUXL.

Interested!? Browse through the [Wiki](https://github.com/Minty-Crisp/AUXL/wiki) to Learn More!!!
---
# v0.3 Brief Overview of Major Updates So Far : :fire:
## Highlights



## Core & Layers
- Layers now support unlimited depth of parent/child entities.
- The connected parent for a Core/Layer can now be identified via a core, name of a core, html element or string name of the element.
- Some new support methods and lots of various optimizations and improvements.

## World, Scenario, Zone, Scene and Books
- Instructions now support Switch statements.
- Scenes now support Fog configuration.
- Zone maps have been moved into Scenario objects and can be dynamically updated.
- New ObjGen World : Main system loader that holds Scenarios. Allows for dynamically loading and unloading of the current Scenario with all of its attached Zones and Scenes as well as progressing to the next or a specific Scenario. It is also used to handle global controls for things like max load time, speed of the day/night cycle, enable an inventory, enable grid collision, enable physics, update companion and main menu as well as background audio. 

## Player
- New player body entity added to the player rig.
- Method to dynamically change player locomotion types.
- Can lock/unlock player locomotion.
- Player body rotation reset to forward on new scene.
- Player flashlight attached to dominant hand or camera(mobile/desktop).
- Player floor compass texture for better direction awareness.
- Player body 45 & 90 degree snap turning.
- Player movement is locked until world is loaded, locked when scene is changes and unlocked when scene is loaded
- VR Controller UI turned off by default and is toggleable via player method.

## Companion
- Updated main menu with Inventory, Fast Travel, Settings and View Current Control Configuration.
- - Inventory holds Items, Tools, Keys and Special Objects added via companion methods. Objects can be permenant or have limited uses.
- - Fast Travel menu for all connected areas in the scene.
- - Settings menu to toggle Sit/Stand mode, change Companion Avatar shape, change Scene Transistion style, change Teleportation Transistion style and change Transistion color.
- - Control Configuration option to display an information window of all currently configured actions from the Scenario, Zone or Scene as well as the specific interactions for the current control type (i.e. Mobile, Desktop or VR).
- Combined NPC Book functions into Companion.
- Toggle spawn still configured to player floor, but can be repositioned without toggling via clicking on the Belt Text UI.
- Added companion UpdateMainMenu method to dynamically update the Main Menu and added to World Info via menuOption
- Added companion UpdateMainMenuStyle method to dynamically update the Main Menu style and added to World Info via menuStyle
- Add custom Avatar Core/Layers to Settings menu via auxl.comp.AddAvatar('Display Name','auxlObjectName');
- Action to control companion and menu. If menu if open, will go back 1 level. If menu is closed will despawn companion. If companion is despawned, will spawn companion.

## NPC
- Now accepts an idle speech page to be displayed if not interacted for specified amount of time.
- Book Timelines now supports multiple pages, page jumps and reading in a randomized order.
- Added speech progression blink notification to continue book or indicate book end.
- Configured the keyword 'self' to be used in place of an auxlObj name which runs any assigned action on the NPC reading the book.
- Textbubble options such as close and reset added. Used with NPC layer and parent rig for body avatar.
- Textbubbles emit a loadin/loadout event for animation support.
- Various other minor improvements.

## Inventory
- clickaddinventory component to add an auxl object item/tool/special/etc... on click. Can be configured to use only once, despawn and delay to allow animation to play.
- Player equipping and unequipping inventory objects with the acceptobject component to use player equipped object on entity

## Tile Map Grid Collision System
- Scenes can now build blank collision based tile map grids of defined size for each scene at 0.5m increments xz and 1m increments y direction.
- Define the size of the map, block or allow movement beyond size edges and spawn customizable cores to indicate edges for each scene map.
- Grid objects can take up multiple height sections at a time. Player while standing will hit 2 height levels, but crouching will only hit 1 height level. When crouching under a collision object, player cannot stand until cleared.
- Spawn Core/Layers on the grid coordinate system with SpawnCoreOnGrid() or SpawnLayerOnGrid() that uses the object.grid info such as {start: {x:1, z:1}, end: {x:2, z:2}, collide: true,} to define the area for which the object occupies. Each 0.5 increment is a single grid square.
- Objects can be spawned with collision (collide: true) which will block the player and other collision objects from spawning/moving into that grid space. Any colliding object attempting to spawn in a location which is occupied will wait until the space is cleared before adding itself.
- Objects can be spawned with a trigger (trigger: true) which will allow the player to collide and will fire an event upon entering the grid area 'triggerEnter' on the grid object as well as fire an event upon exiting the grid area 'triggerExit' on the grid object. Can be combined with the new support component oneventrun for further control of the trigger process to run any AUXL or component method on any object. Can always be set to (once: true) to only allow the trigger to fire In/Out one time.
- Objects can be spawned without collision or trigger as well to utilize grid coordination system such as foley and decor.
- Grid spawned objects can also walk along a defined path built with  GridPath() and started with WalkPath(). Paths are built with +/- XZ directions from it's current position. Many path attributes can be customized such as animation or jump to each 0.5 step position, how long each step takes, how long to pause in-between each step, how long to wait if path is blocked to reverse direction or to stubbornly wait, if path should be looped in a specific direction, any direction or to alternate back and forth from start to finish.
- Movement on collision now continues by skimming walls and floor/ceilings instead of stopping when at edge/collision including when flying.
- GridLayout ObjGen : Spawn objects from a single or array of Core Data, Core, Layer Data or Layer templates and generate various defined Grid layouts. Spawn individual grid layouts in each scene using the same pool of prebuilt objects that all support the various Tile Map Grid Collision features.
- New ObjGen Gate. Allow pass through in a specific direction to close the gate behind the user. Can otherwise trigger close or opening of Gate.

## Physics Support
- Basic Physics integration from c-frame/aframe-physics-system using CANNON.js
- Physics support components added such as camerasync, staticsync, collision, trigger, bodymaterial, auxconstraint, auxspring and gravitycontrol
- One ObjGen : Still in progress, universal physics objGen to hold and control all physics based info and functions as well as connections.
- Constraints ObjGen : Create a physic based constraint, connect, disconnect, update, etc...
- Player Physic Powers : Displayed in Physics Demo
- - Personal Gravity Axis(Rotation) & Planet Type(Amount) w/ Velocity or Off/Float
- - World Gravity Axis & Planet Type(Amount) w/ Velocity or Off/Float
- - Jump
- - Parachute
- - Charge Boost Ray Forward
- - Charge Boost Ray Reverse
- - Freeze|UnFreeze
- - Braking
- - Charge Rubberband[Web Sling] (Pogo, Swing, Launch)
- - Charge Teleport
- - Charge Shoot


## Other New Object Generators
- Multi-Menu : Generates a navigatable menu from a main button with multiple generations of parent/child sub menus all containing actions to jump to a specific menu, run an AUXL Object Method w/Parameters or an AUXL Object Component Method w/Parameters. Button description texts are toggled on hover with Circle Up, Circle Down, Vertical and Horizontal Layouts. Menu can be dynamically updated as well.
- Quick Hover Menu : Hold down button to spawn circle menu, hover on option and let go of button. Active hover selection on button up happens
- InfoBubble : A bubble object that attaches to a parent object to act as either an Emote or Alert prompted by an event called on the parent. Emotes are temporarily displayed, while Alerts require interaction to dismiss. Preconfigured and custom text emote/alerts supported.
- Color Lock Combination ObjGen. Generate a lock and combination to run an AUXL Obj Method on correct input. Can also display a string over each color input from an imported array. The lock waits till full password length input to display correct/incorrect animation and open/reset.

## In-Progress Object Generators
- Infinite Scroll Multi Menu
- Mirror
- Creature
- UniRay
- One
- Powers
- Vehicle
- Build In 3D


## New Support Components
- hovertext : on mouse hover of attached object will display configured text either on top or in front of the object and rotates with user view.
- doorway : assign a zone's scene connection travel point to an object with movement activated upon click.
- stare : have one object rotate to watch another object's movement. In addition to ID of object to watch, can also enable twist which only rotates on the y axis.
- onspawnrun : Run auxl object method on spawn.
- ondespawnrun : Run auxl object method on despawn.
- oneventrun : Run auxl object method on event.
- ondelayrun : Run auxl object method on delay.
- onintervalrun : Run auxl object method on interval.
- raycast-teleportation-select : spawn a teleport select button on click.
- teleportation-to : Use specific XYZ coords to move the player to on specified event such as click object.

# A Few Misc Updates : :zap:
- Max scene load time setting for max time under transition animation while assets load in-between scenes.
- Event and Interaction Instructions now support a relay which links a different auxlObject and methods to run on defined object's event/interaction.
- Added Save/Load/Reset system to store profile, date/time/visit, location, support of auxl object flags and more.
- Generate new Core Data, Core or Layer from a previously existing object with overwrite protection and customization support via auxl.coreDataFromTemplate(), auxl.coreFromTemplate() and auxl.layerFromTemplate().
- Added pagenation to support more than 7 options in the Quick Travel Menu
- Scene Info can now take in a spawnPos object to set the default spawn position when loading into the scene
- doorway component now accepts a delay amount to postpone before swapping scenes in-case an animation needs to play like a door that opens.
- doorway-trigger component to activate scene transition on trigger collision
- Updated save data to load data on same domain only
- Updated HTML menu to a state machine and synced control configuration to save profile
- Added volume control to html system menu and syncing to profile
- EdgeUpdate now accepts a new material to be used on Edges
- Mobile HTML UI will be hidden unless actions are assigned to them
- Organized all scripts and utilized webpack to export into a single used script. Base assets will now also include A-Frame min.js and C-Frame Physics min.js for locally linked reference.
- Each object generator component has a rebuild function to regenerate all defined objects upon system reset without reloading the webpage.
- Support to add custom Object Generators to Scenario, Zone, Scene and Book trackers via auxl.AddObjGenToTracker('objectCoreName', 'SpawnMethodName', 'DespawnMethodName');


# v0.4+ Features
- Grid Enhancements & Features
- Large & Personal Vehicle Modes
- Infinite Scroll Menu
- Locomotion movements such as flying, 3rd Person POV & more
- Dungeon Wall Maze Generator
- Creature Generator
- In 3D Object Builder
- VRM Asset Support for NPC's with Reaction Animations
- Additional Locomotion Styles and Gimbal Player Control
- Enhanced Cannon JS Physics Integration
- Physics Based Movement & Unique Power System
- System Function, Component & ObjGen Updates
- Additional Control Configurations and Enhancements
- Companion Improvements & Customizations
- Scenario, Zone, Scene & Object builds via DOM components
- New AUXL ObjGen's Emulating Traditional Web Objects
- Scene Layouts : Venue, Stage, Forum, Class, Meeting, Museum, Bubbles, etc...
- Variety of Gallery Asset Designs
- 3D Object Inspection
- Endless Scene Asset Spawning
- Enhanced Scenary : Horizon, Foley, Weather, SkyBox, etc...
- Quiz, Question, Polls & Feedback Form Submissions
- Home Area, Widgets & Themes
- RSS Support for Browsing Experiences, Rooms and Components
- 2D/3D Creation & Editing Tools
- AR Background & GPS Support

# Minty Crisp ^-^ :watermelon: 

If you have made it this far, let me just say Thank You! AUXL has been a dream of mine and a labor of love. I still have so much more to accomplish and it will far easier if I can get others to test, play with, contribute, donate or just offer words of encouragement to keep going. This all wouldn't be possible without the open source work of so many others as well especially the teams that have made A-Frame and Three.js! If you are interested in discussing AUXL further, have any questions or even interested in collaborating with me please reach out to me. You can find all my contact info on my [website](https://mintycrisp.com) or even my Github profile here. Thank You ^_^

- If you want to see more work of mine playing with A-Frame, check out my site [mintycrisp.com](https://mintycrisp.com) and my [Itch Store](https://mintycrisp.itch.io/).
- You may also be interested in an arcade I built using AUXL as it's foundation filled with XR mini games called [Minty's XRcade](https://mintyxr.com).
- You can also check me out on a few other places like [Mastodon](https://mastodon.social/@mintycrisp) or [dev.to](https://dev.to/mintycrisp).
- I am available for Web XR work if you are interested in hiring me or collaborating on future projects.
- You can reach me via socials or email : minty-crisp @ proton . me
- If you really enjoy my work and want to support me making more of these types of projects, you can help me out with any kind of donation at [ko-fi](https://ko-fi.com/mintycrisp) or just by sharing my work.
