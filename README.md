# AUXL : A-Frame UX Library :palm_tree: v0.4

## A Web XR System, Support Components, World Maps, Object Generators, Universal Controller & Interactive Powers.

Overview : :star2:
---
Built on top of the amazing open source [A-Frame](https://github.com/aframevr/) & the underlying renderer [Three.js](https://threejs.org/), AUXL is a system to help streamline the creation of all types of Web XR experiences by providing vital features to ease the creation of complex and dynamic content.

![March Preview 1](https://github.com/Minty-Crisp/AUXL/blob/main/assets/img/previews/mintycrisp-auxl-march-preview1.jpg)
![March Preview 2](https://github.com/Minty-Crisp/AUXL/blob/main/assets/img/previews/mintycrisp-auxl-march-preview2.jpg)

Demo : :zap:
---
Explore various Worlds, Map Zones & Node Scenes via the companion menu and in-scene actions that showcase the various system features. Use the HTML menu to adjust your input style for Desktop, Mobile or VR along with other vital options. Reference the companion's menu(blue) __Controls__ option to view a list of configured hotkeys and control powers currently loaded.
- __Grid World__ : AUXL grid collision system, travel, npcs & more custom object generators.
- __Cannon World__ : Cannon physics system with various travel & action powers.
- __Ammo World__ : Ammo physics system combined with the grid collision and additional action powers.
- __XRcade World__ : Arcade with various non-physics mini games and a spooky zone with a few mini experiences.
- __Mascot World__ : Character avatars build area.
- __Caos World__ : Testing grounds for a new power based adventure game.

[Launch AUXL v0.4 In-Progress Web XR Experience](https://minty-crisp.github.io/AUXL/)

Note from the Developer : **Minty Crisp** | Justin Ekema :watermelon:
---
I am a dedicated Web XR developer with a passion for building unique experiences actively looking for work and collaboration. I have experience developing with many up and coming Web XR ecosystems along with a specialty in A-Frame & Blender. I also have experience in many essential support areas required to create complete interactive products. If any of my past works including this repository peaks your interest, please do not hesitate to get in contact with me. Thank you ^-^.

[Portfolio | MintyCrisp.com](https://mintycrisp.com)

[Mastodon Social | MintyCrisp](https://mastodon.social/@mintycrisp)

[Blue Sky Social | MintyCrisp.bsky.social](https://bsky.app/profile/mintycrisp.bsky.social)

[Discord | MintyCrisp](discordapp.com/users/983857672233304064)

Email : [minty-crisp@protonmail.com](mailto:minty-crisp@protonmail.com)

[Support me on Ko-fi | MintyCrisp](https://ko-fi.com/mintycrisp)

License Updates : :snowflake:
---
To better align with my current goals and circumstances, AUXL has updated it's license for all future updates, please see the current LICENSE file for more information.

This change is intended to help me focus on building and sustaining the project as well as ensuring its long-term viability. The new license restricts the use, modification and distribution of the code without explicit permission.

If you are interested in using any part of this codebase or its associated assets built by me, please feel free to reach out for permission and guidance.

Thank you,
Justin Tyler Ekema (also known as Minty Crisp)

Contact Info : [Portfolio | MintyCrisp.com](https://mintycrisp.com)

Email : [minty-crisp@protonmail.com](mailto:minty-crisp@protonmail.com)

AUXL is built to accomplish a few main goals : :hearts:
---
- __System Features__ : Controlling the vast array of features, controls and customization, the AUXL system links together an expansive internal library of functions, components, data & assets while supporting the full A-Frame ecosystem of amazing components.
- __Support Functions__ : XR profile data for loaded url with Save/Load/Reset as well as various internal functions and components to add all sorts of functionality to the experience.
- __Dynamic Experiences__ : Swap through World experiences in a single browser session that each have their own set of Scenario defined builds and navigable Zone maps of Node Scenes.
- __Object Generators__ : All of the various basic and special objects that you would use, view & interact with inside the 3D environment.
- __Universal Controls__ : Unified hardware input controls for interacting with the 3D content that a browser can communicate with.
- __User Customization__ : Allow the user to fine tune their experience and how they use this system.
- __Interactive Powers__ : Do more then just be a passive observer of the virtual world with various controls, powers, abilities & other ways to influence the simulation.

Control Configurations : :eyes:
---
- __Desktop__ : Mouse & Keyboard
- __Mobile__ : Gyro & HTML Touchscreen
- __VR Quest__ : Dual 6DoF Quest Controllers
- __VR Basic__ : Single 3DoF Button Controller (In-Progress)
- __VR Gaze__ : Headset Only (In-Progress)
- __Game-Pad__ Controller (Soon)
- __Hand Tracking__ : Dual Hand Movements (Soon)
- __Alternative Controls__ (Soon)
- __Assistive Technology__ (Soon)

A few cool features of AUXL to highlight : :first_quarter_moon_with_face:
---
- Reusable & re-mixable data to build more with less.
- Generate various types of in-scene entities all with an abundant amount of customization and controls.
- Map out how the Player moves along the World, Scenario, Zone and Scenes with support for Lock, Keys & other requirements.
- Build Scenario, Zone and Scene instructions with on start, delay, interval, interaction, event, exit & if/else conditionals.
- Track settings & objects for each World, Scenario, Zone, Scene as well as Book instructions to swap when out of scope.
- Scene Swap/Teleportation transition animation & customization with dynamic loading times to account for new asset downloads.
- Dynamically load in component javascript URLs as needed.
- Configure unique controls to object methods or component methods within a Scenario, Zone and Scene and view current load out for specific type (i.e. Mobile, Desktop, VR, etc...).
- Interactable NPC object with text bubble speech system using their Book as instructions for progression, idle or random timeline.
- Companion object with access to settings, inventory and more.
- Built in support for various Physics systems and other third party components.
- Built in Player Rig with locomotion, teleportation, snap turning, crouching, sitting mode & adjustable walk speed actions.
- Pre-built AUXL object library to utilize in addition to your own library.
- Extendable system to build new custom objects that take advantage of AUXL.

Recent Updates : :fire:
---
- Added window.navigator.userAgent to user profile.
- Added github repo external link to HTML menu and moved Donation external link to HTML menu.
- Added error protection to avoid issues with multimenu toggleMenu function and confirmed the listeners are removed when the entity is.
- Added PlayerColors method to Player which is updated on system init to the color pallete.
- Adjusted Mobile/Desktop reference of Player RayDir method to the world location of avatarHead.
- Updated Mobile UI so that both center buttons will click through to the document for normal mouse click. Alt click temporarily disabled and charge actions confirmed not working, working on fix.
- Adjusted Mobile UI font size and opacity.
- Added pointerLock toggle option to main menu settings.
- Updated all run components to support connecting to AUXL system functions.
- Added new hide button attached to MultiMenu control button that will hide the menu at the current location and on click of either that hide button or the main menu control button will redisplay the menu at the saved location.
- Added the new hide method to menu options in to compliment stay, back & close.

Third Party Credits : :pray:
---
- A-Frame Three Color Gradient Shader by [tlaukkan](https://github.com/tlaukkan/)
- A-Frame Physics System by [c-frame](https://github.com/c-frame)
- A-Frame Animation Mixer by [c-frame](https://github.com/c-frame)
- A-Frame GLTF Morph by [elbobo](https://github.com/elbobo)
- A-Frame Cam Render by [jgbarah](https://github.com/jgbarah)
- A-Frame Shader Park Component [shader park](https://github.com/shader-park)
- Shader Park Templates [shader park community](https://shaderpark.com/explore)
- CSS Template [andybrewer](https://github.com/andybrewer)
- Various Audio & Visual Assets by [kenney](https://kenney.nl/)
- Various Visual Assets by [kaylousberg](https://kaylousberg.com/)
- Town III Song by [silverNimbus](https://silvernimbus.itch.io/)
- Lightning Strike SFX by [parnellij](https://freesound.org/people/parnellij/)
- Additional Misc SFX by lukas tvrdon, anttis instrumentals, sound ex machina, sonic bat, sound rangers, david fienup, soundjay via (gamesounds)[https://gamesounds.xyz/]
- Thunderstorm Audio by White Noise Meditation, will find link.
- XRcade Tiles, Shark & Squid Assets by unknown, will find attribution.
