//
//AUXL : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/AUXL
//
//Created by Minty-Crisp (mintycrisp.com)
//
//Physics Ammo
//
//

/*
Ammo Notes

- - -
Important
- - -

Currently Bullet 2.82

There is no automatic garbage collection for instantiated Bullet objects. Any time you use the new keyword for a Bullet class you must also at some point (when you are done with the object) release the memory by calling Ammo.destroy.

const vector3 = new Ammo.btVector3();
... do stuff
Ammo.destroy(vector3);


el.body.btRigidBody


btScalar : float

btVector3 : vec3

btQuaternion : quat

btMatrix3x3 : matrix

3D orientations and rotations can be represented using either btQuaternion or btMatrix3x3

btTransform

btCollisionObject.getWorldTransform()
btCollisionObject.setWorldTransform()

btRigidBody.getCenterOfMassTransform()


Adjust scale of phys mesh
this.el.object3D.scale.set(
	scale.x * 0.01,
	scale.y * 0.01,
	scale.z * 0.01
);

- - -
Vehicle & Player Controller
- - -
Raycast Vehicle
For arcade style vehicle simulations, it is recommended to use the simplified Bullet vehicle model as
provided in btRaycastVehicle. Instead of simulation each wheel and chassis as separate rigid bodies,
connected by constraints, it uses a simplified model. This simplified model has many benefits, and is
widely used in commercial driving games.
The entire vehicle is represented as a single rigidbody, the chassis. The collision detection of the
wheels is approximated by ray casts, and the tire friction is a basic anisotropic friction model.
See src/BulletDynamics/Vehicle and examples/ForkLiftDemo for more details, or check
the Bullet forums.
Kester Maddock shared an interesting document about Bullet vehicle simulation here:
http://tinyurl.com/ydfb7lm
Character Controller
A player or NPC character can be constructed using a capsule shape, sphere or other shape. To avoid
rotation, you can set the ‘angular factor’ to zero, which disables the angular rotation effect during
collisions and other constraints. See btRigidBody::setAngularFactor. Other options (that are
less recommended) include setting the inverse inertia tensor to zero for the up axis, or using a
angular-only hinge constraint.
There is also an experimental3 btKinematicCharacterController as an example a non-physical
character controller. It uses a btGhostShape to perform collision queries to create a character that
can climb stairs, slide smoothly along walls etc. See src/BulletDynamics/Character and
Demos/CharacterDemo for its usage
- - -
Example
- - -
<a-scene>
  <a-entity id="nyan" dynamic-body="shape: hull" obj-model="obj: url(nyan-cat.obj)"></a-entity>
  <a-plane static-body></a-plane>
</a-scene>

var el = sceneEl.querySelector('#nyan');
const force = new Ammo.btVector3(0, 1, -0);
const pos = new Ammo.btVector3(el.object3D.position.x, el.object3D.position.y, el.object3D.position.z);
el.body.applyForce(force, pos);
Ammo.destroy(force);
Ammo.destroy(pos);



['ammo-body']:{type: 'kinematic', linearDamping: 0.05, angularDamping: 0.85, activationState: 'disableDeactivation'},
['ammo-shape']:{type: 'box',},

- - -
ammo-body properties
- - -
type :

- dynamic : A freely-moving object. Dynamic bodies have mass, collide with other bodies, bounce or slow during collisions, and fall if gravity is enabled.

- static: A fixed-position object. Other bodies may collide with static bodies, but static bodies themselves are unaffected by gravity and collisions. These bodies should typically not be moved after initialization as they cannot impart forces on dynamic bodies. If you do re-position a static object after initialization, you'll need to explicitly update the physics system with the new position. You can do that like this:
- this.el.components['ammo-body'].syncToPhysics();

- kinematic : Like a static body, except that they can be moved via updating the position of the entity. Unlike a static body, they impart forces on dynamic bodies when moved. Useful for animated or remote (networked) objects.
If you plan to animate or move static objects, you should flag them as kinematic. Also disable the
sleeping/deactivation for them during the animation.

mass : 1
- Weight of >=0

gravity : (0,-9.8,0)
- if undefined, use world gravity

linearDamping : 0.01
- Resistance to movement.

angularDamping : 0.01
- Resistance to rotation.

linearSleepingThreshold : 1.6
- Minimum movement cutoff before a body can enter activationState: wantsDeactivation

angularSleepingThreshold : 2.5
- Minimum rotation cutoff before a body can enter activationState: wantsDeactivation

angularFactor : (1,1,1)
- Constrains how much the body is allowed to rotate on an axis. E.g. 1 0 1 will prevent rotation around y axis.

activationState : active
- Options: active, islandSleeping, wantsDeactivation, disableDeactivation, disableSimulation

emitCollisionEvents : false
- Events | Set to true to enable firing of collidestart and collideend events on this entity
: Example : ['ammo-body']:{type: 'dynamic', emitCollisionEvents: true},

disableCollision : false
- Set to true to disable object from colliding with all others.

collisionFilterGroup : 1
- 32-bit bitmask to determine what collision "group" this object belongs to

collisionFilterMask : 1
- 32-bit bitmask to determine what collision "groups" this object should collide with.

scaleAutoUpdate : true
- Should the shapes of the object be automatically scaled to match the scale of the entity.

restitution : 0
- Coefficient of restitution (bounciness). Note that this must be set to a non-zero value on both objects to get bounce from a collision.
This value cannot be changed after initialization of the ammo-body.


- - -
Activation States
- - -
Activation states are only used for type: dynamic bodies. Most bodies should be left at the default activationState: active so that they can go to sleep (sleeping bodies are very cheap). It can be useful to set bodies to activationState: disableDeactivation if also using an ammo-constraint as constraints will stop functioning if the body goes to sleep, however they should be used sparingly. Each activation state has a color used for wireframe rendering when debug is enabled.


active : white - Waking state. Bodies will enter this state if collisions with other bodies occur. This is the default state.

islandSleeping : green - Sleeping state. Bodies will enter this state if they fall below linearSleepingThreshold and angularSleepingThreshold and no other active or disableDeactivation bodies are nearby.

wantsDeactivation : cyan - Intermediary state between active and islandSleeping. Bodies will enter this state if they fall below linearSleepingThreshold and angularSleepingThreshold.

disableDeactivation : red - Forced active state. Bodies set to this state will never enter islandSleeping or wantsDeactivation.

disableSimulation : yellow - Bodies in this state will be completely ignored by the physics system.


- - -
Collision Filtering
- - -
Collision filtering allows you to control what bodies are allowed to collide with others. For Ammo.js, they are represented as two 32-bit bitmasks, collisionFilterGroup and collisionFilterMask.

Using collision filtering requires basic understanding of the bitwise OR (a | b) and bitwise AND (a & b) operations.

Example: Imagine 3 groups of objects, A, B, and C. We will say their bit values are as follows:

collisionGroups: {
    A: 1,
    B: 2,
    C: 4
}

????
collisionGroups: {
    A: 1,
    B: 2,
    C: 4,
    D: 8,
    E: 16,
    F: 32,
    G: 64,
}

Assume all A objects should only collide with other A objects, and only B objects should collide with other B objects.

<!-- All A objects will look like this -->
<a-entity id="alpha" ammo-body="collisionFilterGroup: 1; collisionFilterMask: 1;"></a-entity>
<!-- All B objects will look like this -->
<a-entity id="beta" ammo-body="collisionFilterGroup: 2; collisionFilterMask: 2;"></a-entity>

Now Assume all C objects can collide with either A or B objects.

<!-- All A objects will look like this -->
<a-entity id="alpha" ammo-body="collisionFilterGroup: 1; collisionFilterMask: 5;"></a-entity>
<!-- All B objects will look like this -->
<a-entity id="beta" ammo-body="collisionFilterGroup: 2; collisionFilterMask: 6;"></a-entity>
<!-- All C objects will look like this -->
<a-entity id="gamma" ammo-body="collisionFilterGroup: 4; collisionFilterMask: 7;"></a-entity>



- - -
ammo-shape
- - -
Any entity with an ammo-body component can also have 1 or more ammo-shape components. The ammo-shape component is what defines the collision shape of the entity. ammo-shape components can be added and removed at any time.

type :
box, 
cylinder,
sphere,
capsule,
cone,
hull,
hacd,
vhacd,
mesh,
heightfield

ammo-shape="type: box; halfExtents: 0.6 0.6 0.6; fit: manual;"
ammo-shape="type: sphere;"
ammo-shape="type: cone;"
ammo-shape="type: capsule; cylinderAxis: z;"
ammo-shape="type: cylinder"
ammo-shape="type: box;"
ammo-shape="type: mesh;"
ammo-shape="type: hacd;"

Convex Primitives
Most primitive shapes are centered around the origin of their local coordinate frame:
btBoxShape : Box defined by the half extents (half length) of its sides
btSphereShape : Sphere defined by its radius
btCapsuleShape: Capsule around the Y axis. Also btCapsuleShapeX/Z
btCylinderShape : Cylinder around the Y axis. Also btCylinderShapeX/Z.
btConeShape : Cone around the Y axis. Also btConeShapeX/Z
btMultiSphereShape : Convex hull of multiple spheres, that can be used to create a Capsule (by
passing 2 spheres) or other convex shapes

Compound Shapes
Multiple convex shapes can be combined into a composite or compound shape, using the
btCompoundShape. This is a concave shape made out of convex sub parts, called child shapes. Each
child shape has its own local offset transform, relative to the btCompoundShape. It is a good idea to
approximate concave shapes using a collection of convex hulls, and store them in a
btCompoundShape. You can adjust the center of mass using a utility method btCompoundShape
::calculatePrincipalAxisTransform.
Convex Hull Shapes
Bullet supports several ways to represent a convex triangle meshes. The easiest way is to create a
btConvexHullShape and pass in an array of vertices. In some cases the graphics mesh contains too
many vertices to be used directly as btConvexHullShape. In that case, try to reduce the number of
vertices.
Concave Triangle Meshes
For static world environment, a very efficient way to represent static triangle meshes is to use a
btBvhTriangleMeshShape. This collision shape builds an internal acceleration structure from a
btTriangleMesh or btStridingMeshInterface. Instead of building the tree at run-time, it is
also possible to serialize the binary tree to disc. See examples/ConcaveDemo how to save and load
this btOptimizedBvh tree acceleration structure. When you have several instances of the same
triangle mesh, but with different scaling, you can instance a btBvhTriangleMeshShape multiple
times using the btScaledBvhTriangleMeshShape. The btBvhTriangleMeshShape can store
multiple mesh parts. It keeps a triangle index and part index in a 32bit structure, reserving 10 bits for
the part Id and the remaining 22 bits for triangle index. If you need more than 2 million triangles,
either split the the triangle mesh into multiple sub meshes, or change the default in #define
MAX_NUM_PARTS_IN_BITS in the file
src\BulletCollision\BroadphaseCollision\btQuantizedBvh.h
Convex Decomposition
Ideally, concave meshes should only be used for static artwork. Otherwise its convex hull should be
used by passing the mesh to btConvexHullShape. If a single convex shape is not detailed enough,
multiple convex parts can be combined into a composite object called btCompoundShape. Convex
decomposition can be used to decompose the concave mesh into several convex parts. See the
Demos/ConvexDecompositionDemo for an automatic way of doing convex decomposition

Height field
Bullet provides support for the special case of a flat 2D concave terrain through the
btHeightfieldTerrainShape. See examples/TerrainDemo for its usage.
btStaticPlaneShape
As the name suggests, the btStaticPlaneShape can represent an infinite plane or half space. This
shape can only be used for static, non-moving objects. This shape has been introduced mainly for
demo purposes.
Scaling of Collision Shapes
Some collision shapes can have local scaling applied. Use
btCollisionShape::setScaling(vector3). Non uniform scaling with different scaling values for
each axis, can be used for btBoxShape, btMultiSphereShape, btConvexShape,
btTriangleMeshShape. Uniform scaling, using x value for all axis, can be used for
btSphereShape. Note that a non-uniform scaled sphere can be created by using a
btMultiSphereShape with 1 sphere. As mentioned before, the
btScaledBvhTriangleMeshShape allows to instantiate a btBvhTriangleMeshShape at different
non-uniform scale factors. The btUniformScalingShape allows to instantiate convex shapes at
different scales, reducing the amount of memory


Primitives
	Box (box) – Requires halfExtents if using fit: manual.
	Cylinder (cylinder) – Requires halfExtents if using fit: manual. Use cylinderAxis to change which axis the length of the cylinder is aligned.
	Sphere (sphere) – Requires sphereRadius if using fit: manual.
	Capsule (capsule) – Requires halfExtents if using fit: manual. Use cylinderAxis to change which axis the length of the capsule is aligned.
	Cone (cone) – Requires halfExtents if using fit: manual. Use cylinderAxis to change which axis the point of the cone is aligned.
Hull (hull) – Wraps a model in a convex hull, like a shrink-wrap. Not quite as performant as primitives, but still very fast.
Hull Approximate Convex Decomposition (hacd) – This is an experimental feature that generates multiple convex hulls to approximate any convex or concave shape.
Volumetric Hull Approximate Convex Decomposition (vhacd) – Also experimental, this is hacd with a different algorithm. See: https://kmamou.blogspot.com/2014/11/v-hacd-v20-is-here.html for more information.
Mesh (mesh) – Creates a 1:1 concave collision shape with the triangles of the meshes of the entity. May only be used on static bodies. This is the least performant shape, however they can work very well for static environments if the following is observed:
	Avoid using meshes with very high triangle density relative to size of convex objects (primitives and hulls) colliding with the mesh. E.g. avoid meshes where an object could collide with dozens or more triangles in a single spot.
	Avoid very high poly meshes in general and use mesh decimation (simplification) if possible.
Heightfield (heightfield) – Similar to a mesh shape, but you must provide an array of heights and the distance between those values. E.g. heightfieldData: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] and heightfieldDistance: 1 will create a 3x3 meter heightfield with a height of 0 except for the center with a height of 1.

Shape Fit

    fit: all – Requires a mesh to exist on the entity. The specified shape will be created to contain all the vertices of the mesh.
    fit: manual – Does not require a mesh, however you must specifiy either the halfExtents or sphereRadius manually. This is not supported for hull, hacd, vhacd and mesh types.

Note that in general, fit: manual is more performant than fit: all. This is because fit: all iterates over every point in the geometry to determine a suitable bounding volume, whereas fit: manual can just create the shape to the specified parameters. This is particularly important if you are going to be spawning new instances of objects while the physics simulation is ongoing.

Note that there is currently no caching of shapes generated from geometries, so even if you are creating shapes for the same geometry over & over you'll still pay this performance penalty for each new ammo-shape.


fit :
all, manual. Use manual if defining halfExtents or sphereRadius 

halfExtents 	fit: manual and type: box, cylinder, capsule, cone 	1 1 1 	Set the halfExtents to use.
minHalfExtent 	fit: all and type: box, cylinder, capsule, cone 	0 	The minimum value for any axis of the halfExtents.
maxHalfExtent 	fit: all and type: box, cylinder, capsule, cone 	Number.POSITIVE_INFINITY 	The maximum value for any axis of the halfExtents.
sphereRadius 	fit: manual and type: sphere 	NaN 	Set the radius for spheres.
cylinderAxis 	— 	y 	Options: x, y, z. Override default axis for cylinder, capsule, and cone types.
margin 	— 	0.01 	The amount of 'padding' to add around the shape. Larger values have better performance but reduce collision shape precision.
offset 	— 	0 0 0 	Where to position the shape relative to the origin of the entity.
heightfieldData 	fit: manual and type: heightfield 	[] 	An array of arrays of float values that represent a height at a fixed interval heightfieldDistance
heightfieldDistance 	fit: manual and type: heightfield 	1 	The distance between each height value in both the x and z direction in heightfieldData
includeInvisible 	fit: all 	false 	Should invisible meshes be included when using fit: all




- - -
ammo-constraint
- - -
The ammo-constraint component is used to bind ammo-bodies together using hinges, fixed distances, or fixed attachment points. Note that an ammo-shape is not required for ammo-constraint to work, however you may get strange results with some constraint types.

<a-box id="other-box" ammo-body ammo-shape />
<a-box ammo-constraint="target: #other-box;" ammo-body ammo-shape />

lock :
- Lock 2 targets at current position, very sturdy

fixed :
- Attach an object to a set/fixed distance

pointToPoint :
- Fixed attachment points between 2 objects

slider : 
- Movement along target's X axis only, object seems fixed to X face movement as well

	<a-sphere id="slider-target"
		   radius="0.125"
		   position="-0.5 1 0"
		   color="#777"
		   ammo-body="type: static" ammo-shape>
	</a-sphere>
	<a-sphere color="#F00"
		   radius="0.125"
		   position="0 1 0"
		   ammo-body ammo-shape
		   force-pushable
		   ammo-constraint="type: slider; target: #slider-target">
	</a-sphere>

hinge :
- Axis and Target Axis are 0 0 0 to 1 1 1 for rotation being allowed
- Pivot is part 1 of 2 to a hinge, the vec3 coords are based the requesting object's local pos
- targetPivot is part 2 of 2 to a hinge, the vec3 coords are based the connecting target's local pos

	<a-box id="hinge-target" position="-0.25 1 0.0" color="#777" ammo-body="type: static" ammo-shape scale="0.25 0.25 0.25"></a-box>
	<a-box depth="0.1"
		   color="#F00"
		   scale="0.25 0.25 0.25"
		   ammo-body ammo-shape
		   force-pushable
		   ammo-constraint="type: hinge;
					   target: #hinge-target;
					   axis: 0 1 0;
					   targetAxis: 0 1 0;
					   pivot: -0.125 0 0;
					   targetPivot: 0.125 0 0.125;">
	</a-box>

coneTwist :
- Axis and Target Axis are 0 0 0 to 1 1 1 for rotation being allowed
- Pivot is part 1 of 2 to a hinge, the vec3 coords are based the requesting object's local pos
- targetPivot is part 2 of 2 to a hinge, the vec3 coords are based the connecting target's local pos

spring : ! DONT USE !
- Doesn't work very well, nothing like cannon, seems usable for background untouched animation

	<a-box id="two" position="0 2.75 -3" color="blue" ammo-body="type: static"></a-box>
	<a-box id="twospring"
		 position="0 1.75 -3"
		 color="green"
		 ammo-body="activationState: 'disableDeactivation'"
		 ammo-constraint="type: spring; target: #two;"
	></a-box>





type 	— 	lock 	Options: lock, fixed, spring, slider, hinge, coneTwist, pointToPoint.

target 	— 	— 	Selector for a single entity to which current entity should be bound.

pivot 	type: pointToPoint, coneTwist, hinge 	0 0 0 	Offset of the hinge or point-to-point constraint, defined locally in this element's body.

targetPivot 	type: pointToPoint, coneTwist, hinge 	0 0 0 	Offset of the hinge or point-to-point constraint, defined locally in the target's body.

axis 	type: hinge 	0 0 1 	An axis that each body can rotate around, defined locally to this element's body.

targetAxis 	type: hinge 	0 0 1 	An axis that each body can rotate around, defined locally to the target's body.

damping		1.000

stiffness	type: spring	100.00

- - -
- - -
- - -
- - -


- - -
Events
- - -
body-loaded : Fired when physics body (el.body) has been created.


collidestart : Fired when two bodies collide. emitCollisionEvents: true must be set on the ammo-body.

collideend : Fired when two bodies stop colliding. emitCollisionEvents: true must be set on the ammo-body.

collide : start or end hits
var playerEl = document.querySelector("[camera]");
playerEl.addEventListener("collide", function(e) {
  console.log("Player has collided with body #" + e.detail.targetEl.id);
  e.detail.targetEl; // Other entity, which playerEl touched.
});

- - -

- - -
- - -
- - -
- - -
- - -
- - -
- - -
- - -
- - -
System Config
- - -
driver 	local 	[local, worker, ammo]
debug 	true 	Whether to show wireframes for debugging.
debugDrawMode 	0 	See AmmoDebugDrawer
gravity 	-9.8 	Force of gravity (in m/s^2).
iterations 	10 	The number of solver iterations determines quality of the constraints in the world.
maxSubSteps 	4 	The max number of physics steps to calculate per tick.
fixedTimeStep 	0.01667 	The internal framerate of the physics simulation.
stats 		Where to output performance stats (if any), panel, console, events (or some combination).
- panel output stats to a panel similar to the A-Frame stats panel.
-events generates physics-tick-timer events, which can be processed externally.
-consoleoutputs stats to the console.


- - -


*/
const ammoPush = AFRAME.registerComponent('ammopush', {
init: function() {
	  var el = this.el;
	  el.addEventListener("collidestart", function () {
		const impulse = new Ammo.btVector3(1.4, 1, 0);
		const pos = new Ammo.btVector3(0, 0, 0);
		el.body.applyImpulse(impulse, pos);
		Ammo.destroy(impulse);
		Ammo.destroy(pos);
  });
},
});

const ammoBounce = AFRAME.registerComponent('ammobounce', {
init: function() {
	  var el = this.el;
	  //el.addEventListener("body-loaded", function () {
	  //el.addEventListener("collide", function () {
	  //el.addEventListener("collideend", function () {
	  el.addEventListener("collidestart", function () {
		const impulse = new Ammo.btVector3(0, 6, 0);
		const pos = new Ammo.btVector3(0, 0, 0);
		el.body.applyImpulse(impulse, pos);
		Ammo.destroy(impulse);
		Ammo.destroy(pos);
  });
},
});
//
//Export
export {ammoPush, ammoBounce};