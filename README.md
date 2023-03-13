# AUXL : A-Frame UX Library :palm_tree:

## Web XR Scenario, Object Generator Engine & Unified Controller System

Built specifically for use with [A-Frame](https://github.com/aframevr/). Essentially, AUXL provides a variety of critical object, scene and scenario building tools at the javascript level that allows for a more streamlined creation process. It's basically a scripting system and JSON structured data library with various UX add-ons built for the A-Frame XR renderer in addition to unifying the 3D/VR/AR controls to all devices. It is being released under the MIT license for all to use and hopefully will help with the adoption of the Web XR ecosystem.

[View Demo Example Scenario](https://minty-crisp.github.io/AUXL/)

# AUXL is still an in progress build!
While ready to be tested and played with, various in-progress improvements for v0.2 will solidify the base version more complete in what I had in mind. Allowing for updates after that point to focus more on adding unique features as well as being ready to for an accompanying Wiki, Tutorials & sets of Examples to showcase features.

# v0.2 In-Progress Update Notes :
- Dedicated MapZone data to control objects with start, delay, interval, event, interaction, exit & map with it's own tracker. 
- Dedicated Scenario data to control objects with start, delay, interval, event, interaction, exit, site wide dispaly name & instructions with it's own tracker.
- System & Data seperated into multiple components
- - auxl : Main systems, support functions & Object Generators
- - auxl-library : AUXL supplied list of materials, geometries, sounds, animations, data, cores, layers & objects.
- - auxl-scene-library : User supplied list of materials, geometries, sounds, animations, data, cores, layers & objects.
- - auxl-scenes : Scenario, MapZone & NodeScene's data/cores each with their own start, delay, interval, event, interaction, exit & object specific sections for controlling objects.
- SkyBox Object Generator to control/display Lights, Sky & Space objects. A time adjustable DayNight cycle included with prebuilt objects.
- Teleport Object Generator accepting an array of positions to display teleportation points.
- New raycast-teleportation component that allows the same teleportation with animation to any spot clicked to attached clickable object.
- Additional Core methods added : RemoveComponent
- Updated all Object methods that can be used multiple times to accept an array of inputs if needed.
- Additional Layer methods added : EmitEventChild, ChangeChild, AnimateChild, EmitEventAll, SetFlagParent, SetFlagChild, SetFlagAll, GetFlagParent, GetFlagChild, GetFlagAll, RemoveComponentParent, RemoveComponentChild, RemoveComponentAll, EnableDetailParent, EnableDetailChild & EnableDetailAll.
- Updated EnableDetail methods to accept text, position, textColor, windowColor, windowWidth & windowHeight arguments.
- Added ability to dynamically import js scripts declared either within individual object data or to a system wide script reference object utilized when an object's component requires it on generation.
- Image Carousel Object Generator : Generate a gallery of images in carousel form with a gallery description from an array of images and control with a set of buttons to browse through all images.
- Horizon Object Generator : Generate an customizable radius horizon to simulate mountains, buildings/pillars, hills, cylinder wall or square wall with support for materials and color randomization.
- Updated Locomotion component : Fixed a few bugs and added diagonal movement.
- Reworked and optimized object tracking for Scenario, MapZone, NodeScene and NPC Books.
- Added Player method to change the transition animation color.
- Added support for Dual Handed Controllers.
- Added look-at-xyz component which matches the roation of an object specified on the axis' enabled.
- Scene swapping now dynamically delays the load in transition animation until all 3D asset and image textures have been fully downloaded.
- Universal XR Controller testing in progress.

# Remaining Goals for v0.2
- Updated Menu ObjGen
- Updated Hamburger Menu
- Enhanced MultiGen Asset Spawner
- Mobile CSS Improvement
- Basic Inventory & Key Checker System
- Readable Notes JS & Minified JS
- Wiki, Individual Examples & Tutorials

# v0.1 Summary :
- Datas, Cores & Layers for in-scene object entities with Details Prompt
- Menu Generator
- Image Swapper Viewer
- Memory Mini Game
- Map Nodes & Zones for Dynamic Scene Swapping with Locks & Keys
- Scene Swap with Start, Delay, Interval, Interaction, Event & Exit checks with Conditionals/Flag Support for Cores, Layers and Special Objects
- Object Scene Tracking for Auto Removal on Scene/Zone Swap
- Procedural Object Spawning of Single or Multiple Sets of Assets
- DayNight Environmental Cycle & Lighting
- NPC Avatar Book Progressive Text Tree Viewer with Conditionals/Flag Support & Scene Tracking
- 3D Companion (Hamburger Menu) Control Settings
- VR/2D Mode Player w/ Scene Transitions Animations & Interaction Reactivity
- Locomotion Movement with VR Belt UI, WASD and Mobile HTML Controller 
- Teleportation Movement to Assigned Point Spawners
- HTML System Menu to Start Experience, Adjust Controls|Audio & View Instructions
- Color Theory Swatch Generator from Provided, Random or within a Color Family
- Components : detect-input(dev debug), attach, support interaction event components, locomotion & teleportation.

# v0.3+ Roadmap :
- v0.2 Function, Component & ObjGen Updates
- Scenario, Zone, Scene & Object built via DOM components
- 1st Person to 3rd Person Mode Swapping
- VRM Asset Support for Reaction Animations
- Physics Support
- 3D Object Inspection
- More Object/Image Gallery Layouts
- AR Background & GPS Support
- Enhanced Horizon, Foley & Weather Spawns
- Venue|Stage|Forum
- Question, Polls & Feedback
- Inventory & Item System
- Quest System
- Magic System
- Spell Casting
- Mob Generator
- Support for building with [Banter](bantervr.com)

# Minty Crisp ^-^ :watermelon: 

- If you want to see more work of mine playing with A-Frame, check out my site [mintycrisp.com](https://mintycrisp.com).
- You can also check me out on a few other places like [dev.to](https://dev.to/mintycrisp) or where I spend most of my free time [reddit](https://www.reddit.com/user/Minty-Crisp/).
- I am available for Web XR work if you are interested in hiring me or collaborating on future projects.
- You can reach me via socials or email : minty-crisp @ proton . me
- If you really enjoy my work and want to support me making more of these types of projects, you can help me out with a [kofi](https://ko-fi.com/mintycrisp) or just by sharing my work.
