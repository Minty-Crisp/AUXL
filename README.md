# AUXL : A-Frame UX Library :palm_tree: v0.2

## Web XR Scenario, Object Generator Engine & Universal Controller System

[View Wiki](https://github.com/Minty-Crisp/AUXL/wiki)

[v0.2 Demo Scenario](https://minty-crisp.github.io/AUXL/)

Learn how to build your first AUXL Scenario with the [Getting Started with AUXL](https://github.com/Minty-Crisp/AUXL/wiki/Getting-Started-with-AUXL) guide using the [Starter Scenario](https://minty-crisp.github.io/AUXL/starter.html).

[v0.3 Beta Scenario](https://minty-crisp.github.io/AUXL/v03.html)

AUXL Summary : :star2:
---
AUXL is a javascript engine built to streamline and unify the creation of Web XR experiences based on [A-Frame](https://github.com/aframevr/) & [Three.js](https://threejs.org/). It provides a variety of critical system, object, scene and scenario building tools that allows the user to create XR experiences as if they were making classic 2D HTML websites or game worlds. The types of website styles that can be built with are as endless as the web itself. Anything like a portfolio, gallery, blog, virtual tour, visual novel, video game and more. I envision the system to be a combination of tools like Wordpress and Unity with a long term plan to create 2D/3D admin panel like generation tools to open access to all users in creating their own personal XR content. It is being released under the GPL 3.0 license for all to use and hopefully will help with the adoption of the Web XR ecosystem.

AUXL is built to accomplish 3 main goals : :hearts:
---
- Dynamic Experiences : Swap through experiences in a single browser session that each have their own set of Scenario defined builds and navigatable Zone maps of Scenes.
- Object Generators : All of the various basic and special objects that you would use, view & interact with inside the 3D environment.
- Universal Controls : The unified hardware input controls for interacting with the 3D content that a browser can communicate with.

[Read more about the System Overview in the Wiki](https://github.com/Minty-Crisp/AUXL/wiki/System-Overview)

Control Configurations : :eyes:
---
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
- Map out how the Player moves along the Scenario, Zone and Scenes with support for Lock & Keys.
- Object spawn tracking for each Scenario, Zone, Scene and Book instructions.
- Scene Swap/Teleportation transition animations with dynamic loading times to account for new asset downloads.
- Dynamically load in component javascript URLs as needed.
- Configure unique controls to object methods or component methods within a Scenario, Zone and Scene.
- Build Scenario, Zone and Scene instructions with on start, delay, interval, interaction, event, exit & if/else conditionals.
- Interactable NPC object with text bubble speech system using their Book as instructions.
- Companion object with access to settings, inventory and more.
- Built in Player Rig with locomotion, teleportation, snap turning, crouching, sitting mode & adjustable walk speed actions.
- Prebuilt AUXL object library to utilize in addition to your own library.
- Extendable system to build new custom objects that take advantage of AUXL.

Interested!? Browse through the [Wiki](https://github.com/Minty-Crisp/AUXL/wiki) to Learn More!!!
---

# v0.3 Beta Updates : :fire:
- Custom Object Generators can now be added dynamically to Scenario, Zone, Node and Book Trackers.
- Updated all ObjGen's to support SetFlag & GetFlag methods, so now If/Else Instructions support all AUXL object.
- Updated ObjGen's to track if they are already spawned to avoid duplicates and added ToggleSpawn method for use ideally with action controls. Objects added this way are not added to any tracker currently.
- Updated instruction action controls to support adding parameters to object or component methods. Component and Params can be omitted if not needed.
- Added ToggleFlashlight method to Player which spawns a flashlight on Camera or dominant VR hand.
- New AUXL Object : MultiMenu. Generates a navigatable menu from a core button with multiple generations of parent/child sub menus all containing actions to jump to a specific menu, run an AUXL Object Method w/Parameters or an AUXL Object Component Method w/Parameters. Button description texts are toggled on hover.
- Added support component : menurun as well as updated clickrun, fusingrun, mousedownrun, mouseenterrun, mouseleaverun and mouseuprun to be able to run component attached methods.
- Added GetChildEl() to layer.
- Added doorway component that can be assigned a zone's scene connection travel point activated upon click.
- Added new customizable Action 7 and Action 8 to Joystick Other Left/Right, Desktop Keys Z/X and Mobile Buttons Left/Right.
- Added grid movement support to Locomotion component
- Additional Locomotion Types in Progress
- Premade & Dynamic Collision Map Spawning in Progress
- NPC's Page instructions now accept the keyword 'self' which will run said instructions on the NPC reading it.
- NPC's Book now accepts new Info key 'name' to be displayed with Speak() method if the 'role' key is omitted or labeled as 'self'.
- Reduced Notification TempDisableClick time.
- Added a minimum load time to scene instruction reading to ensure that all items that require downloading are added in complete to the auxl.loadingObjects object before logic checks.
- NPC now spawns Book's SpeechBubble on initial mouseover unless Idle Speech is configured. Added Idle Speech autoplay support with customizable delay, interval and IdlePage instructions. Idle Speech is swapped out for regular Pages on interaction.
- NPC speech now displays a blinking indicator to prompt additional interaction for next slide or to restart book.
- Companion now uses a mutli-menu Main Menu with settings such as Travel to Scenes, Toggle FlashLight, Toggle Sit/Stand Mode, Change Scene Transition Type, Change Teleport Transition Type and Change Transition Color.
- Zone's can now define if the basic Travel menu will display. Travel menu will always update in Companion Menu and other objects aka Doorways can be configured for Travel as well.
- Updated Spawn/DespawnCore and Spawn/DespawnLayer. Layer's can now be attached to a Parent entity via AUXL.object, entity or element ID.
- Multi-Menu Updates
- - Supports Circle Up, Circle Down, Vertical and Horizontal Layouts
- - Fixed an issue with how actions were being added.
- - Dynamically update a subMenu with UpdateSubMenu() method.
- - Parent can now be dynamically updated via the method UpdateParent().
- - Actions can now control how the menu reacts on click whether to stay open, goBack a menu or close.
- - Can now be configured to 'stare' at an object with look-at-xyz component providing the id and which axis x,y and/or z angles.
- Added support to Multi-Menu for Circle Down Layout
- Re-arranged all components into 4 javascript file categories : System, Support, Addons and Scenes.
- User position is reset back to 0,0,0 on scene change
- Added new hovertext support component which on mousehover will display configured text either on top or in front of the object and rotates to user view.
- Ham Companion now accepts a Layer as an Avatar.
- Added raycast-teleportation-select that spawns a select button on click.
- Added in-progress Mini Games SwipeLaunchGame & GuessHitGame, DragDiffuse.
- Added in-progress Pet, Battler & BattleRef systems.
- Added in-progress Gimbal controller of the player avatar 1st/3rd.
- Added World ObjGen that can hold and navigate multiple Scenarios.
- Zone's map data has been moved into each Scenario to allow dynamic mapping through Scenario progression as well as changeable via UpdateMap(mapData) auxl.zoneObject method.
- Added in-progress profile storage save/load/reset system. Upon reset, entire system is unloaded and restarted via Menu.
- Fixed an issue with Multi-Menus overlapping with each other.
- Added UpdateUIText() method to Player to update HTML header and VR controller text.
- Added 90degree snap turning.
- Can now change which object's is used with 1st POV Locomotion direction between Camera or Controller.
- Dynamic controls now take in an Action name and Action description that populate a control configuration window toggleable from the Ham menu to display all current control configurations for the current mode (Desktop, Mobile, VR Advanced, VR Basic, etc...).

# Features Roadmap : :cherries:
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
- VRM Asset Support for NPC's with Animations & Reactions
- Quiz, Question, Polls & Feedback Form Submissions
- Object Notifications & Alerts
- Home Area, Widgets & Themes
- RSS Support for Browsing Experiences, Rooms and Components
- 2D/3D Creation & Editing Tools
- AR Background & GPS Support

# Minty Crisp ^-^ :watermelon: 

If you have made it this far, let me just say Thank You! AUXL has been a dream of mine and a labor of love. I still have so much more to accomplish and it will far easier if I can get others to test, play with, contribute, donate or just offer words of encouragement to keep going. This all wouldn't be possible without the open source work of so many others as well especially the teams that have made A-Frame and Three.js! If you are interested in discussing AUXL further, have any questions or even interested in collaborating with me please reach out to me. You can find all my contact info on my [website](https://mintycrisp.com) or even my Github profile here. Thank You ^_^

- If you want to see more work of mine playing with A-Frame, check out my site [mintycrisp.com](https://mintycrisp.com).
- You can also check me out on a few other places like [dev.to](https://dev.to/mintycrisp) or where I spend most of my free time [reddit](https://www.reddit.com/user/Minty-Crisp/).
- I am available for Web XR work if you are interested in hiring me or collaborating on future projects.
- You can reach me via socials or email : minty-crisp @ proton . me
- If you really enjoy my work and want to support me making more of these types of projects, you can help me out with a [kofi](https://ko-fi.com/mintycrisp) or just by sharing my work.
