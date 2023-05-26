# AUXL : A-Frame UX Library :palm_tree: v0.3

## Web XR World, System, Object Generator Engine & Universal Controller System

[View Wiki](https://github.com/Minty-Crisp/AUXL/wiki)

[v0.3 Demo Scenario](https://minty-crisp.github.io/AUXL/)

### v0.3 Wiki Update and Starter Coming Soon!!!
Learn how to build your first AUXL Scenario with the [Getting Started with AUXL](https://github.com/Minty-Crisp/AUXL/wiki/Getting-Started-with-AUXL) guide using the [Starter Scenario](https://minty-crisp.github.io/AUXL/starter.html).

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

# v0.3 Brief Overview of Major Updates : :fire:
## System
- AUXL is now divided into 5 main files called System, Support, Extras, Shaders and Scenes to hold all needed components.
- Added Save/Load/Reset system to store profile, date/time/visit, location, support of auxl object flags and more.
- Generate new Core data from templates along with any customizations via auxl.coreFromTemplate().
- Each object generator component has a rebuild function to regenerate all defined objects upon system reset without reloading the webpage.
- Various additional v0.2 Object Generator improvements and methods.
- Support to add custom Object Generators to Scenario, Zone, Scene and Book trackers via auxl.AddObjGenToTracker('objectCoreName', 'SpawnMethodName', 'DespawnMethodName');

## Core & Layers
- Layers now support unlimited depth of parent/child entities.
- The connected parent for a Core/Layer can now be identified via a core, name of a core, html element or string name of the element.
- Various other methods and minor improvements.

## World, Scenario, Zone, Scene and Books
- Instructions now support Switch statements.
- Scenes now support Fog configuration.
- Zone maps have been moved into Scenario objects and can be dynamically updated.
- New main Object Generator, World which holds various Scenarios.

## Companion
- Updated main menu with Inventory, Fast Travel, Settings and View Current Control Configuration.
- - Inventory holds Items, Tools, Keys and Special Objects added via companion methods. Objects can be permenant or have limited uses.
- - Fast Travel menu for all connected areas in the scene.
- - Settings menu to toggle Sit/Stand mode, change Companion Avatar shape, change Scene Transistion style, change Teleportation Transistion style and change Transistion color.
- - Control Configuration option to display an information window of all currently configured actions from the Scenario, Zone or Scene as well as the specific interactions for the current control type (i.e. Mobile, Desktop or VR).
- Combined NPC Book functions into Companion.
- Toggle spawn still configured to player floor, but can be repositioned without toggling via clicking on the Belt Text UI.

## NPC
- Now accepts an idle speech page to be displayed if not interacted for specified amount of time.
- Book Timelines now supports multiple pages, page jumps and reading in a randomized order.
- Added speech progression blink notification to continue book or indicate book end.
- Configured the keyword 'self' to be used in place of an auxlObj name which runs any assigned action on the NPC reading the book.
- Various other minor improvements.

## New Object Generators
- World : Main system loader that holds Scenarios. Allows for dynamically loading and unloading of the current Scenario with all of its attached Zones and Scenes as well as progressing to the next or a specific Scenario. 
- Multi-Menu : Generates a navigatable menu from a main button with multiple generations of parent/child sub menus all containing actions to jump to a specific menu, run an AUXL Object Method w/Parameters or an AUXL Object Component Method w/Parameters. Button description texts are toggled on hover with Circle Up, Circle Down, Vertical and Horizontal Layouts. Menu can be dynamically updated as well.
- InfoBubble : A bubble object that attaches to a parent object to act as either an Emote or Alert prompted by an event called on the parent. Emotes are temporarily displayed, while Alerts require interaction to dismiss. Preconfigured and custom text emote/alerts supported.

## New Support Components
- hovertext : on mousehover of attached object will display configured text either on top or in front of the object and rotates with user view.
- doorway : assign a zone's scene connection travel point to an object with movement activated upon click.
- stare : have one object rotate to watch another object's movement. In addition to ID of object to watch, can also enable twist which only rotates on the y axis.
- onspawnrun : Run auxl object method on spawn.
- ondespawnrun : Run auxl object method on despawn.
- oneventrun : Run auxl object method on event.
- ondelayrun : Run auxl object method on delay.
- onintervalrun : Run auxl object method on interval.
- raycast-teleportation-select : spawn a teleport select button on click.

## Minor Additional Updates
- Player Flashlight
- Player Floor Compass Texture
- 45 & 90 Degree Snap Turning
- New Locomotion movements such as flying and 3rd Person POV

# v0.4+ Currently In-Progress Updates : :cherries:
- Cannon JS Physics
- Additional Locomotion Styles and Gimbal Player Control
- Non-Physics Wall Generation and Movement Collision
- Creature Generator
- VRM Asset Support for NPC's with Reaction Animations
- In 3D Object Builder
- Mini Games Arcade
- RPG Demo

# Various Feature Ideas
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

- If you want to see more work of mine playing with A-Frame, check out my site [mintycrisp.com](https://mintycrisp.com).
- You can also check me out on a few other places like [dev.to](https://dev.to/mintycrisp) or where I spend most of my free time [reddit](https://www.reddit.com/user/Minty-Crisp/).
- I am available for Web XR work if you are interested in hiring me or collaborating on future projects.
- You can reach me via socials or email : minty-crisp @ proton . me
- If you really enjoy my work and want to support me making more of these types of projects, you can help me out with a [kofi](https://ko-fi.com/mintycrisp) or just by sharing my work.
