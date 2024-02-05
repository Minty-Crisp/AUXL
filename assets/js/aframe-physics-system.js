(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var CANNON = require('cannon-es');

require('./src/components/math');
require('./src/components/body/ammo-body');
require('./src/components/body/body');
require('./src/components/body/dynamic-body');
require('./src/components/body/static-body');
require('./src/components/shape/shape');
require('./src/components/shape/ammo-shape')
require('./src/components/ammo-constraint');
require('./src/components/constraint');
require('./src/components/spring');
require('./src/system');

module.exports = {
  registerAll: function () {
    console.warn('registerAll() is deprecated. Components are automatically registered.');
  }
};

// Export CANNON.js.
window.CANNON = window.CANNON || CANNON;

},{"./src/components/ammo-constraint":9,"./src/components/body/ammo-body":10,"./src/components/body/body":11,"./src/components/body/dynamic-body":12,"./src/components/body/static-body":13,"./src/components/constraint":14,"./src/components/math":15,"./src/components/shape/ammo-shape":17,"./src/components/shape/shape":18,"./src/components/spring":19,"./src/system":29,"cannon-es":5}],2:[function(require,module,exports){
/**
 * CANNON.shape2mesh
 *
 * Source: http://schteppe.github.io/cannon.js/build/cannon.demo.js
 * Author: @schteppe
 */
var CANNON = require('cannon-es');

CANNON.shape2mesh = function(body){
    var obj = new THREE.Object3D();

    function createBufferGeometry(positions, faces) {

      var geometry = new THREE.BufferGeometry();
      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
      geometry.setIndex(faces);
      geometry.computeBoundingSphere();
      return geometry;
    }

    for (var l = 0; l < body.shapes.length; l++) {
        var shape = body.shapes[l];

        var mesh;

        switch(shape.type){

        case CANNON.Shape.types.SPHERE:
            var sphere_geometry = new THREE.SphereGeometry( shape.radius, 8, 8);
            mesh = new THREE.Mesh( sphere_geometry, this.currentMaterial );
            break;

        case CANNON.Shape.types.PARTICLE:
            mesh = new THREE.Mesh( this.particleGeo, this.particleMaterial );
            var s = this.settings;
            mesh.scale.set(s.particleSize,s.particleSize,s.particleSize);
            break;

        case CANNON.Shape.types.PLANE:
            var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
            mesh = new THREE.Object3D();
            var submesh = new THREE.Object3D();
            var ground = new THREE.Mesh( geometry, this.currentMaterial );
            ground.scale.set(100, 100, 100);
            submesh.add(ground);

            ground.castShadow = true;
            ground.receiveShadow = true;

            mesh.add(submesh);
            break;

        case CANNON.Shape.types.BOX:
            var box_geometry = new THREE.BoxGeometry(  shape.halfExtents.x*2,
                                                        shape.halfExtents.y*2,
                                                        shape.halfExtents.z*2 );
            mesh = new THREE.Mesh( box_geometry, this.currentMaterial );
            break;

        case CANNON.Shape.types.CONVEXPOLYHEDRON:
            
            // Add vertices
            var positions = []
            for (var i = 0; i < shape.vertices.length; i++) {
                var v = shape.vertices[i];
                positions.push(v.x, v.y, v.z);
            }

            var faces = []
            for(var i=0; i < shape.faces.length; i++){
                var face = shape.faces[i];

                // add triangles
                var a = face[0];
                for (var j = 1; j < face.length - 1; j++) {
                    var b = face[j];
                    var c = face[j + 1];
                    faces.push(a, b, c);
                }
            }

            var geo = createBufferGeometry(positions, faces);
            mesh = new THREE.Mesh( geo, this.currentMaterial );
            break;

        case CANNON.Shape.types.HEIGHTFIELD:

            var v0 = new CANNON.Vec3();
            var v1 = new CANNON.Vec3();
            var v2 = new CANNON.Vec3();
            var positions = [];
            var faces = [];
            for (var xi = 0; xi < shape.data.length - 1; xi++) {
                for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
                    for (var k = 0; k < 2; k++) {
                        shape.getConvexTrianglePillar(xi, yi, k===0);
                        v0.copy(shape.pillarConvex.vertices[0]);
                        v1.copy(shape.pillarConvex.vertices[1]);
                        v2.copy(shape.pillarConvex.vertices[2]);
                        v0.vadd(shape.pillarOffset, v0);
                        v1.vadd(shape.pillarOffset, v1);
                        v2.vadd(shape.pillarOffset, v2);
                        positions.push(
                            v0.x, v0.y, v0.z,
                            v1.x, v1.y, v1.z,
                            v2.x, v2.y, v2.z
                        );
                        var i = positions.length / 3 - 3;
                        faces.push(i, i+1, i+2);
                    }
                }
            }
            var geometry = createBufferGeometry(positions, faces);
            mesh = new THREE.Mesh(geometry, this.currentMaterial);
            break;

        case CANNON.Shape.types.TRIMESH:
            var geometry = new THREE.BufferGeometry();

            var v0 = new CANNON.Vec3();
            var v1 = new CANNON.Vec3();
            var v2 = new CANNON.Vec3();
            var positions = [];
            var faces = [];
            for (var i = 0; i < shape.indices.length / 3; i++) {
                shape.getTriangleVertices(i, v0, v1, v2);
                positions.push(
                    v0.x, v0.y, v0.z,
                    v1.x, v1.y, v1.z,
                    v2.x, v2.y, v2.z
                );
                var j = positions.length / 3 - 3;
                faces.push(j, j+1, j+2);
            }
            var geometry = createBufferGeometry(positions, faces);
            mesh = new THREE.Mesh(geometry, this.currentMaterial);
            break;

        default:
            throw "Visual type not recognized: "+shape.type;
        }

        mesh.receiveShadow = true;
        mesh.castShadow = true;
        if(mesh.children){
            for(var i=0; i<mesh.children.length; i++){
                mesh.children[i].castShadow = true;
                mesh.children[i].receiveShadow = true;
                if(mesh.children[i]){
                    for(var j=0; j<mesh.children[i].length; j++){
                        mesh.children[i].children[j].castShadow = true;
                        mesh.children[i].children[j].receiveShadow = true;
                    }
                }
            }
        }

        var o = body.shapeOffsets[l];
        var q = body.shapeOrientations[l];
        mesh.position.set(o.x, o.y, o.z);
        mesh.quaternion.set(q.x, q.y, q.z, q.w);

        obj.add(mesh);
    }

    return obj;
};

module.exports = CANNON.shape2mesh;

},{"cannon-es":5}],3:[function(require,module,exports){
AFRAME.registerComponent('stats-panel', {
  schema: {
    merge: {type: 'boolean', default: true}
  },

  init() {

    const container = document.querySelector('.rs-container')

    if (container && this.data.merge) {
      //stats panel exists, just merge into it.
      this.container = container
      return;
    }

    // if stats panel doesn't exist, add one to support our custom stats.
    this.base = document.createElement('div')
    this.base.classList.add('rs-base')
    const body = document.body || document.getElementsByTagName('body')[0]

    if (container && !this.data.merge) {
      this.base.style.top = "auto"
      this.base.style.bottom = "20px"
    }

    body.appendChild(this.base)

    this.container = document.createElement('div')
    this.container.classList.add('rs-container')
    this.base.appendChild(this.container)
  }
});

AFRAME.registerComponent('stats-group', {
  multiple: true,
  schema: {
    label: {type: 'string'}
  },

  init() {

    let container
    const baseComponent = this.el.components['stats-panel']
    if (baseComponent) {
      container = baseComponent.container
    }
    else {
      container = document.querySelector('.rs-container')
    }

    if (!container) {
      console.warn(`Couldn't find stats container to add stats to.
                    Add either stats or stats-panel component to a-scene`)
      return;
    }
    
    this.groupHeader = document.createElement('h1')
    this.groupHeader.innerHTML = this.data.label
    container.appendChild(this.groupHeader)

    this.group = document.createElement('div')
    this.group.classList.add('rs-group')
    // rs-group hs style flex-direction of 'column-reverse'
    // No idea why it's like that, but it's not what we want for our stats.
    // We prefer them rendered in the order speified.
    // So override this style.
    this.group.style.flexDirection = 'column'
    this.group.style.webKitFlexDirection = 'column'
    container.appendChild(this.group)
  }
});

AFRAME.registerComponent('stats-row', {
  multiple: true,
  schema: {
    // name of the group to add the stats row to.
    group: {type: 'string'},

    // name of an event to listen for
    event: {type: 'string'},

    // property from event to output in stats panel
    properties: {type: 'array'},

    // label for the row in the stats panel
    label: {type: 'string'}
  },

  init () {

    const groupComponentName = "stats-group__" + this.data.group
    const groupComponent = this.el.components[groupComponentName] ||
                           this.el.sceneEl.components[groupComponentName] ||
                           this.el.components["stats-group"] ||
                           this.el.sceneEl.components["stats-group"]

    if (!groupComponent) {
      console.warn(`Couldn't find stats group ${groupComponentName}`)
      return;
    }
  
    this.counter = document.createElement('div')
    this.counter.classList.add('rs-counter-base')
    groupComponent.group.appendChild(this.counter)

    this.counterId = document.createElement('div')
    this.counterId.classList.add('rs-counter-id')
    this.counterId.innerHTML = this.data.label
    this.counter.appendChild(this.counterId)

    this.counterValues = {}
    this.data.properties.forEach((property) => {
      const counterValue = document.createElement('div')
      counterValue.classList.add('rs-counter-value')
      counterValue.innerHTML = "..."
      this.counter.appendChild(counterValue)
      this.counterValues[property] = counterValue
    })

    this.updateData = this.updateData.bind(this)
    this.el.addEventListener(this.data.event, this.updateData)

    this.splitCache = {}
  },

  updateData(e) {
    
    this.data.properties.forEach((property) => {
      const split = this.splitDot(property);
      let value = e.detail;
      for (i = 0; i < split.length; i++) {
        value = value[split[i]];
      }
      this.counterValues[property].innerHTML = value
    })
  },

  splitDot (path) {
    if (path in this.splitCache) { return this.splitCache[path]; }
    this.splitCache[path] = path.split('.');
    return this.splitCache[path];
  }

});

AFRAME.registerComponent('stats-collector', {
  multiple: true,

  schema: {
    // name of an event to listen for
    inEvent: {type: 'string'},

    // property from event to output in stats panel
    properties: {type: 'array'},

    // frequency of output in terms of events received.
    outputFrequency: {type: 'number', default: 100},

    // name of event to emit
    outEvent: {type: 'string'},
    
    // outputs (generated for each property)
    // Combination of: mean, max, percentile__XX.X (where XX.X is a number)
    outputs: {type: 'array'},

    // Whether to output to console as well as generating events
    // If a string is specified, this is output to console, together with the event data
    // If no string is specified, nothing is output to console.
    outputToConsole: {type: 'string'}
  },

  init() {
    
    this.statsData = {}
    this.resetData()
    this.outputDetail = {}
    this.data.properties.forEach((property) => {
      this.outputDetail[property] = {}
    })

    this.statsReceived = this.statsReceived.bind(this)
    this.el.addEventListener(this.data.inEvent, this.statsReceived)
  },
  
  resetData() {

    this.counter = 0
    this.data.properties.forEach((property) => {
      
      // For calculating percentiles like 0.01 and 99.9% we'll want to store
      // additional data - something like this...
      // Store off outliers, and discard data.
      // const min = Math.min(...this.statsData[property])
      // this.lowOutliers[property].push(min)
      // const max = Math.max(...this.statsData[property])
      // this.highOutliers[property].push(max)

      this.statsData[property] = []
    })
  },

  statsReceived(e) {

    this.updateData(e.detail)

    this.counter++ 
    if (this.counter === this.data.outputFrequency) {
      this.outputData()
      this.resetData()
    }
  },

  updateData(detail) {

    this.data.properties.forEach((property) => {
      let value = detail;
      value = value[property];
      this.statsData[property].push(value)
    })
  },

  outputData() {
    this.data.properties.forEach((property) => {
      this.data.outputs.forEach((output) => {
        this.outputDetail[property][output] = this.computeOutput(output, this.statsData[property])
      })
    })

    if (this.data.outEvent) {
      this.el.emit(this.data.outEvent, this.outputDetail)
    }

    if (this.data.outputToConsole) {
      console.log(this.data.outputToConsole, this.outputDetail)
    }
  },

  computeOutput(outputInstruction, data) {

    const outputInstructions = outputInstruction.split("__")
    const outputType = outputInstructions[0]
    let output

    switch (outputType) {
      case "mean":
        output = data.reduce((a, b) => a + b, 0) / data.length;
        break;
      
      case "max":
        output = Math.max(...data)
        break;

      case "min":
        output = Math.min(...data)
        break;

      case "percentile":
        const sorted = data.sort((a, b) => a - b)
        // decimal percentiles encoded like 99+9 rather than 99.9 due to "." being used as a 
        // separator for nested properties.
        const percentileString = outputInstructions[1].replace("_", ".")
        const proportion = +percentileString / 100

        // Note that this calculation of the percentile is inaccurate when there is insufficient data
        // e.g. for 0.1th or 99.9th percentile when only 100 data points.
        // Greater accuracy would require storing off more data (specifically outliers) and folding these
        // into the computation.
        const position = (data.length - 1) * proportion
        const base = Math.floor(position)
        const delta = position - base;
        if (sorted[base + 1] !== undefined) {
            output = sorted[base] + delta * (sorted[base + 1] - sorted[base]);
        } else {
            output = sorted[base];
        }
        break;
    }
    return output.toFixed(2)
  }
});

},{}],4:[function(require,module,exports){
/* global Ammo,THREE */

THREE.AmmoDebugConstants = {
  NoDebug: 0,
  DrawWireframe: 1,
  DrawAabb: 2,
  DrawFeaturesText: 4,
  DrawContactPoints: 8,
  NoDeactivation: 16,
  NoHelpText: 32,
  DrawText: 64,
  ProfileTimings: 128,
  EnableSatComparison: 256,
  DisableBulletLCP: 512,
  EnableCCD: 1024,
  DrawConstraints: 1 << 11, //2048
  DrawConstraintLimits: 1 << 12, //4096
  FastWireframe: 1 << 13, //8192
  DrawNormals: 1 << 14, //16384
  DrawOnTop: 1 << 15, //32768
  MAX_DEBUG_DRAW_MODE: 0xffffffff
};

/**
 * An implementation of the btIDebugDraw interface in Ammo.js, for debug rendering of Ammo shapes
 * @class AmmoDebugDrawer
 * @param {THREE.Scene} scene
 * @param {Ammo.btCollisionWorld} world
 * @param {object} [options]
 */
THREE.AmmoDebugDrawer = function(scene, world, options) {
  this.scene = scene;
  this.world = world;
  options = options || {};

  this.debugDrawMode = options.debugDrawMode || THREE.AmmoDebugConstants.DrawWireframe;
  var drawOnTop = this.debugDrawMode & THREE.AmmoDebugConstants.DrawOnTop || false;
  var maxBufferSize = options.maxBufferSize || 1000000;

  this.geometry = new THREE.BufferGeometry();
  var vertices = new Float32Array(maxBufferSize * 3);
  var colors = new Float32Array(maxBufferSize * 3);

  this.geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3).setUsage(THREE.DynamicDrawUsage));
  this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

  this.index = 0;

  var material = new THREE.LineBasicMaterial({
    vertexColors: true,
    depthTest: !drawOnTop
  });

  this.mesh = new THREE.LineSegments(this.geometry, material);
  if (drawOnTop) this.mesh.renderOrder = 999;
  this.mesh.frustumCulled = false;

  this.enabled = false;

  this.debugDrawer = new Ammo.DebugDrawer();
  this.debugDrawer.drawLine = this.drawLine.bind(this);
  this.debugDrawer.drawContactPoint = this.drawContactPoint.bind(this);
  this.debugDrawer.reportErrorWarning = this.reportErrorWarning.bind(this);
  this.debugDrawer.draw3dText = this.draw3dText.bind(this);
  this.debugDrawer.setDebugMode = this.setDebugMode.bind(this);
  this.debugDrawer.getDebugMode = this.getDebugMode.bind(this);
  this.debugDrawer.enable = this.enable.bind(this);
  this.debugDrawer.disable = this.disable.bind(this);
  this.debugDrawer.update = this.update.bind(this);

  this.world.setDebugDrawer(this.debugDrawer);
};

THREE.AmmoDebugDrawer.prototype = function() {
  return this.debugDrawer;
};

THREE.AmmoDebugDrawer.prototype.enable = function() {
  this.enabled = true;
  this.scene.add(this.mesh);
};

THREE.AmmoDebugDrawer.prototype.disable = function() {
  this.enabled = false;
  this.scene.remove(this.mesh);
};

THREE.AmmoDebugDrawer.prototype.update = function() {
  if (!this.enabled) {
    return;
  }

  if (this.index != 0) {
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  this.index = 0;

  this.world.debugDrawWorld();

  this.geometry.setDrawRange(0, this.index);
};

THREE.AmmoDebugDrawer.prototype.drawLine = function(from, to, color) {
  const heap = Ammo.HEAPF32;
  const r = heap[(color + 0) / 4];
  const g = heap[(color + 4) / 4];
  const b = heap[(color + 8) / 4];

  const fromX = heap[(from + 0) / 4];
  const fromY = heap[(from + 4) / 4];
  const fromZ = heap[(from + 8) / 4];
  this.geometry.attributes.position.setXYZ(this.index, fromX, fromY, fromZ);
  this.geometry.attributes.color.setXYZ(this.index++, r, g, b);

  const toX = heap[(to + 0) / 4];
  const toY = heap[(to + 4) / 4];
  const toZ = heap[(to + 8) / 4];
  this.geometry.attributes.position.setXYZ(this.index, toX, toY, toZ);
  this.geometry.attributes.color.setXYZ(this.index++, r, g, b);
};

//TODO: figure out how to make lifeTime work
THREE.AmmoDebugDrawer.prototype.drawContactPoint = function(pointOnB, normalOnB, distance, lifeTime, color) {
  const heap = Ammo.HEAPF32;
  const r = heap[(color + 0) / 4];
  const g = heap[(color + 4) / 4];
  const b = heap[(color + 8) / 4];

  const x = heap[(pointOnB + 0) / 4];
  const y = heap[(pointOnB + 4) / 4];
  const z = heap[(pointOnB + 8) / 4];
  this.geometry.attributes.position.setXYZ(this.index, x, y, z);
  this.geometry.attributes.color.setXYZ(this.index++, r, g, b);

  const dx = heap[(normalOnB + 0) / 4] * distance;
  const dy = heap[(normalOnB + 4) / 4] * distance;
  const dz = heap[(normalOnB + 8) / 4] * distance;
  this.geometry.attributes.position.setXYZ(this.index, x + dx, y + dy, z + dz);
  this.geometry.attributes.color.setXYZ(this.index++, r, g, b);
};

THREE.AmmoDebugDrawer.prototype.reportErrorWarning = function(warningString) {
  if (Ammo.hasOwnProperty("Pointer_stringify")) {
    console.warn(Ammo.Pointer_stringify(warningString));
  } else if (!this.warnedOnce) {
    this.warnedOnce = true;
    console.warn("Cannot print warningString, please rebuild Ammo.js using 'debug' flag");
  }
};

THREE.AmmoDebugDrawer.prototype.draw3dText = function(location, textString) {
  //TODO
  console.warn("TODO: draw3dText");
};

THREE.AmmoDebugDrawer.prototype.setDebugMode = function(debugMode) {
  this.debugDrawMode = debugMode;
};

THREE.AmmoDebugDrawer.prototype.getDebugMode = function() {
  return this.debugDrawMode;
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Records what objects are colliding with each other
 * @class ObjectCollisionMatrix
 * @constructor
 */
var ObjectCollisionMatrix = /*#__PURE__*/function () {
  // The matrix storage.
  function ObjectCollisionMatrix() {
    this.matrix = {};
  }
  /**
   * @method get
   * @param  {Body} i
   * @param  {Body} j
   * @return {boolean}
   */


  var _proto = ObjectCollisionMatrix.prototype;

  _proto.get = function get(bi, bj) {
    var i = bi.id;
    var j = bj.id;

    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    return i + "-" + j in this.matrix;
  }
  /**
   * @method set
   * @param  {Body} i
   * @param  {Body} j
   * @param {boolean} value
   */
  ;

  _proto.set = function set(bi, bj, value) {
    var i = bi.id;
    var j = bj.id;

    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    if (value) {
      this.matrix[i + "-" + j] = true;
    } else {
      delete this.matrix[i + "-" + j];
    }
  }
  /**
   * Empty the matrix
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    this.matrix = {};
  }
  /**
   * Set max number of objects
   * @method setNumObjects
   * @param {Number} n
   */
  ;

  _proto.setNumObjects = function setNumObjects(n) {};

  return ObjectCollisionMatrix;
}();

/**
 * A 3x3 matrix.
 * @class Mat3
 * @constructor
 * @param {Array} elements A vector of length 9, containing all matrix elements. Optional.
 * @author schteppe / http://github.com/schteppe
 */
var Mat3 = /*#__PURE__*/function () {
  function Mat3(elements) {
    if (elements === void 0) {
      elements = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.elements = elements;
  }
  /**
   * Sets the matrix to identity
   * @method identity
   * @todo Should perhaps be renamed to setIdentity() to be more clear.
   * @todo Create another function that immediately creates an identity matrix eg. eye()
   */


  var _proto = Mat3.prototype;

  _proto.identity = function identity() {
    var e = this.elements;
    e[0] = 1;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;
    e[4] = 1;
    e[5] = 0;
    e[6] = 0;
    e[7] = 0;
    e[8] = 1;
  }
  /**
   * Set all elements to zero
   * @method setZero
   */
  ;

  _proto.setZero = function setZero() {
    var e = this.elements;
    e[0] = 0;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;
    e[4] = 0;
    e[5] = 0;
    e[6] = 0;
    e[7] = 0;
    e[8] = 0;
  }
  /**
   * Sets the matrix diagonal elements from a Vec3
   * @method setTrace
   * @param {Vec3} vec3
   */
  ;

  _proto.setTrace = function setTrace(vector) {
    var e = this.elements;
    e[0] = vector.x;
    e[4] = vector.y;
    e[8] = vector.z;
  }
  /**
   * Gets the matrix diagonal elements
   * @method getTrace
   * @return {Vec3}
   */
  ;

  _proto.getTrace = function getTrace(target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var e = this.elements;
    target.x = e[0];
    target.y = e[4];
    target.z = e[8];
  }
  /**
   * Matrix-Vector multiplication
   * @method vmult
   * @param {Vec3} v The vector to multiply with
   * @param {Vec3} target Optional, target to save the result in.
   */
  ;

  _proto.vmult = function vmult(v, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var e = this.elements;
    var x = v.x;
    var y = v.y;
    var z = v.z;
    target.x = e[0] * x + e[1] * y + e[2] * z;
    target.y = e[3] * x + e[4] * y + e[5] * z;
    target.z = e[6] * x + e[7] * y + e[8] * z;
    return target;
  }
  /**
   * Matrix-scalar multiplication
   * @method smult
   * @param {Number} s
   */
  ;

  _proto.smult = function smult(s) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i] *= s;
    }
  }
  /**
   * Matrix multiplication
   * @method mmult
   * @param {Mat3} matrix Matrix to multiply with from left side.
   * @return {Mat3} The result.
   */
  ;

  _proto.mmult = function mmult(matrix, target) {
    if (target === void 0) {
      target = new Mat3();
    }

    var elements = matrix.elements;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var sum = 0.0;

        for (var k = 0; k < 3; k++) {
          sum += elements[i + k * 3] * this.elements[k + j * 3];
        }

        target.elements[i + j * 3] = sum;
      }
    }

    return target;
  }
  /**
   * Scale each column of the matrix
   * @method scale
   * @param {Vec3} v
   * @return {Mat3} The result.
   */
  ;

  _proto.scale = function scale(vector, target) {
    if (target === void 0) {
      target = new Mat3();
    }

    var e = this.elements;
    var t = target.elements;

    for (var i = 0; i !== 3; i++) {
      t[3 * i + 0] = vector.x * e[3 * i + 0];
      t[3 * i + 1] = vector.y * e[3 * i + 1];
      t[3 * i + 2] = vector.z * e[3 * i + 2];
    }

    return target;
  }
  /**
   * Solve Ax=b
   * @method solve
   * @param {Vec3} b The right hand side
   * @param {Vec3} target Optional. Target vector to save in.
   * @return {Vec3} The solution x
   * @todo should reuse arrays
   */
  ;

  _proto.solve = function solve(b, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    // Construct equations
    var nr = 3; // num rows

    var nc = 4; // num cols

    var eqns = [];
    var i;
    var j;

    for (i = 0; i < nr * nc; i++) {
      eqns.push(0);
    }

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        eqns[i + nc * j] = this.elements[i + 3 * j];
      }
    }

    eqns[3 + 4 * 0] = b.x;
    eqns[3 + 4 * 1] = b.y;
    eqns[3 + 4 * 2] = b.z; // Compute right upper triangular version of the matrix - Gauss elimination

    var n = 3;
    var k = n;
    var np;
    var kp = 4; // num rows

    var p;

    do {
      i = k - n;

      if (eqns[i + nc * i] === 0) {
        // the pivot is null, swap lines
        for (j = i + 1; j < k; j++) {
          if (eqns[i + nc * j] !== 0) {
            np = kp;

            do {
              // do ligne( i ) = ligne( i ) + ligne( k )
              p = kp - np;
              eqns[p + nc * i] += eqns[p + nc * j];
            } while (--np);

            break;
          }
        }
      }

      if (eqns[i + nc * i] !== 0) {
        for (j = i + 1; j < k; j++) {
          var multiplier = eqns[i + nc * j] / eqns[i + nc * i];
          np = kp;

          do {
            // do ligne( k ) = ligne( k ) - multiplier * ligne( i )
            p = kp - np;
            eqns[p + nc * j] = p <= i ? 0 : eqns[p + nc * j] - eqns[p + nc * i] * multiplier;
          } while (--np);
        }
      }
    } while (--n); // Get the solution


    target.z = eqns[2 * nc + 3] / eqns[2 * nc + 2];
    target.y = (eqns[1 * nc + 3] - eqns[1 * nc + 2] * target.z) / eqns[1 * nc + 1];
    target.x = (eqns[0 * nc + 3] - eqns[0 * nc + 2] * target.z - eqns[0 * nc + 1] * target.y) / eqns[0 * nc + 0];

    if (isNaN(target.x) || isNaN(target.y) || isNaN(target.z) || target.x === Infinity || target.y === Infinity || target.z === Infinity) {
      throw "Could not solve equation! Got x=[" + target.toString() + "], b=[" + b.toString() + "], A=[" + this.toString() + "]";
    }

    return target;
  }
  /**
   * Get an element in the matrix by index. Index starts at 0, not 1!!!
   * @method e
   * @param {Number} row
   * @param {Number} column
   * @param {Number} value Optional. If provided, the matrix element will be set to this value.
   * @return {Number}
   */
  ;

  _proto.e = function e(row, column, value) {
    if (value === undefined) {
      return this.elements[column + 3 * row];
    } else {
      // Set value
      this.elements[column + 3 * row] = value;
    }
  }
  /**
   * Copy another matrix into this matrix object.
   * @method copy
   * @param {Mat3} source
   * @return {Mat3} this
   */
  ;

  _proto.copy = function copy(matrix) {
    for (var i = 0; i < matrix.elements.length; i++) {
      this.elements[i] = matrix.elements[i];
    }

    return this;
  }
  /**
   * Returns a string representation of the matrix.
   * @method toString
   * @return string
   */
  ;

  _proto.toString = function toString() {
    var r = '';
    var sep = ',';

    for (var i = 0; i < 9; i++) {
      r += this.elements[i] + sep;
    }

    return r;
  }
  /**
   * reverse the matrix
   * @method reverse
   * @param {Mat3} target Optional. Target matrix to save in.
   * @return {Mat3} The solution x
   */
  ;

  _proto.reverse = function reverse(target) {
    if (target === void 0) {
      target = new Mat3();
    }

    // Construct equations
    var nr = 3; // num rows

    var nc = 6; // num cols

    var eqns = [];
    var i;
    var j;

    for (i = 0; i < nr * nc; i++) {
      eqns.push(0);
    }

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        eqns[i + nc * j] = this.elements[i + 3 * j];
      }
    }

    eqns[3 + 6 * 0] = 1;
    eqns[3 + 6 * 1] = 0;
    eqns[3 + 6 * 2] = 0;
    eqns[4 + 6 * 0] = 0;
    eqns[4 + 6 * 1] = 1;
    eqns[4 + 6 * 2] = 0;
    eqns[5 + 6 * 0] = 0;
    eqns[5 + 6 * 1] = 0;
    eqns[5 + 6 * 2] = 1; // Compute right upper triangular version of the matrix - Gauss elimination

    var n = 3;
    var k = n;
    var np;
    var kp = nc; // num rows

    var p;

    do {
      i = k - n;

      if (eqns[i + nc * i] === 0) {
        // the pivot is null, swap lines
        for (j = i + 1; j < k; j++) {
          if (eqns[i + nc * j] !== 0) {
            np = kp;

            do {
              // do line( i ) = line( i ) + line( k )
              p = kp - np;
              eqns[p + nc * i] += eqns[p + nc * j];
            } while (--np);

            break;
          }
        }
      }

      if (eqns[i + nc * i] !== 0) {
        for (j = i + 1; j < k; j++) {
          var multiplier = eqns[i + nc * j] / eqns[i + nc * i];
          np = kp;

          do {
            // do line( k ) = line( k ) - multiplier * line( i )
            p = kp - np;
            eqns[p + nc * j] = p <= i ? 0 : eqns[p + nc * j] - eqns[p + nc * i] * multiplier;
          } while (--np);
        }
      }
    } while (--n); // eliminate the upper left triangle of the matrix


    i = 2;

    do {
      j = i - 1;

      do {
        var _multiplier = eqns[i + nc * j] / eqns[i + nc * i];

        np = nc;

        do {
          p = nc - np;
          eqns[p + nc * j] = eqns[p + nc * j] - eqns[p + nc * i] * _multiplier;
        } while (--np);
      } while (j--);
    } while (--i); // operations on the diagonal


    i = 2;

    do {
      var _multiplier2 = 1 / eqns[i + nc * i];

      np = nc;

      do {
        p = nc - np;
        eqns[p + nc * i] = eqns[p + nc * i] * _multiplier2;
      } while (--np);
    } while (i--);

    i = 2;

    do {
      j = 2;

      do {
        p = eqns[nr + j + nc * i];

        if (isNaN(p) || p === Infinity) {
          throw "Could not reverse! A=[" + this.toString() + "]";
        }

        target.e(i, j, p);
      } while (j--);
    } while (i--);

    return target;
  }
  /**
   * Set the matrix from a quaterion
   * @method setRotationFromQuaternion
   * @param {Quaternion} q
   */
  ;

  _proto.setRotationFromQuaternion = function setRotationFromQuaternion(q) {
    var x = q.x;
    var y = q.y;
    var z = q.z;
    var w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var e = this.elements;
    e[3 * 0 + 0] = 1 - (yy + zz);
    e[3 * 0 + 1] = xy - wz;
    e[3 * 0 + 2] = xz + wy;
    e[3 * 1 + 0] = xy + wz;
    e[3 * 1 + 1] = 1 - (xx + zz);
    e[3 * 1 + 2] = yz - wx;
    e[3 * 2 + 0] = xz - wy;
    e[3 * 2 + 1] = yz + wx;
    e[3 * 2 + 2] = 1 - (xx + yy);
    return this;
  }
  /**
   * Transpose the matrix
   * @method transpose
   * @param  {Mat3} target Optional. Where to store the result.
   * @return {Mat3} The target Mat3, or a new Mat3 if target was omitted.
   */
  ;

  _proto.transpose = function transpose(target) {
    if (target === void 0) {
      target = new Mat3();
    }

    var Mt = target.elements;
    var M = this.elements;

    for (var i = 0; i !== 3; i++) {
      for (var j = 0; j !== 3; j++) {
        Mt[3 * i + j] = M[3 * j + i];
      }
    }

    return target;
  };

  return Mat3;
}();

/**
 * 3-dimensional vector
 * @class Vec3
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @author schteppe
 * @example
 *     const v = new Vec3(1, 2, 3);
 *     console.log('x=' + v.x); // x=1
 */

var Vec3 = /*#__PURE__*/function () {
  function Vec3(x, y, z) {
    if (x === void 0) {
      x = 0.0;
    }

    if (y === void 0) {
      y = 0.0;
    }

    if (z === void 0) {
      z = 0.0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * Vector cross product
   * @method cross
   * @param {Vec3} v
   * @param {Vec3} target Optional. Target to save in.
   * @return {Vec3}
   */


  var _proto = Vec3.prototype;

  _proto.cross = function cross(vector, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var vx = vector.x;
    var vy = vector.y;
    var vz = vector.z;
    var x = this.x;
    var y = this.y;
    var z = this.z;
    target.x = y * vz - z * vy;
    target.y = z * vx - x * vz;
    target.z = x * vy - y * vx;
    return target;
  }
  /**
   * Set the vectors' 3 elements
   * @method set
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @return Vec3
   */
  ;

  _proto.set = function set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  /**
   * Set all components of the vector to zero.
   * @method setZero
   */
  ;

  _proto.setZero = function setZero() {
    this.x = this.y = this.z = 0;
  }
  /**
   * Vector addition
   * @method vadd
   * @param {Vec3} v
   * @param {Vec3} target Optional.
   * @return {Vec3}
   */
  ;

  _proto.vadd = function vadd(vector, target) {
    if (target) {
      target.x = vector.x + this.x;
      target.y = vector.y + this.y;
      target.z = vector.z + this.z;
    } else {
      return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
  }
  /**
   * Vector subtraction
   * @method vsub
   * @param {Vec3} v
   * @param {Vec3} target Optional. Target to save in.
   * @return {Vec3}
   */
  ;

  _proto.vsub = function vsub(vector, target) {
    if (target) {
      target.x = this.x - vector.x;
      target.y = this.y - vector.y;
      target.z = this.z - vector.z;
    } else {
      return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
  }
  /**
   * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
   * @method crossmat
   * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
   * @return {Mat3}
   */
  ;

  _proto.crossmat = function crossmat() {
    return new Mat3([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0]);
  }
  /**
   * Normalize the vector. Note that this changes the values in the vector.
   * @method normalize
   * @return {Number} Returns the norm of the vector
   */
  ;

  _proto.normalize = function normalize() {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var n = Math.sqrt(x * x + y * y + z * z);

    if (n > 0.0) {
      var invN = 1 / n;
      this.x *= invN;
      this.y *= invN;
      this.z *= invN;
    } else {
      // Make something up
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }

    return n;
  }
  /**
   * Get the version of this vector that is of length 1.
   * @method unit
   * @param {Vec3} target Optional target to save in
   * @return {Vec3} Returns the unit vector
   */
  ;

  _proto.unit = function unit(target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var x = this.x;
    var y = this.y;
    var z = this.z;
    var ninv = Math.sqrt(x * x + y * y + z * z);

    if (ninv > 0.0) {
      ninv = 1.0 / ninv;
      target.x = x * ninv;
      target.y = y * ninv;
      target.z = z * ninv;
    } else {
      target.x = 1;
      target.y = 0;
      target.z = 0;
    }

    return target;
  }
  /**
   * Get the length of the vector
   * @method length
   * @return {Number}
   */
  ;

  _proto.length = function length() {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Get the squared length of the vector.
   * @method lengthSquared
   * @return {Number}
   */
  ;

  _proto.lengthSquared = function lengthSquared() {
    return this.dot(this);
  }
  /**
   * Get distance from this point to another point
   * @method distanceTo
   * @param  {Vec3} p
   * @return {Number}
   */
  ;

  _proto.distanceTo = function distanceTo(p) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var px = p.x;
    var py = p.y;
    var pz = p.z;
    return Math.sqrt((px - x) * (px - x) + (py - y) * (py - y) + (pz - z) * (pz - z));
  }
  /**
   * Get squared distance from this point to another point
   * @method distanceSquared
   * @param  {Vec3} p
   * @return {Number}
   */
  ;

  _proto.distanceSquared = function distanceSquared(p) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var px = p.x;
    var py = p.y;
    var pz = p.z;
    return (px - x) * (px - x) + (py - y) * (py - y) + (pz - z) * (pz - z);
  }
  /**
   * Multiply all the components of the vector with a scalar.
   * @method scale
   * @param {Number} scalar
   * @param {Vec3} target The vector to save the result in.
   * @return {Vec3}
   */
  ;

  _proto.scale = function scale(scalar, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var x = this.x;
    var y = this.y;
    var z = this.z;
    target.x = scalar * x;
    target.y = scalar * y;
    target.z = scalar * z;
    return target;
  }
  /**
   * Multiply the vector with an other vector, component-wise.
   * @method vmult
   * @param {Number} vector
   * @param {Vec3} target The vector to save the result in.
   * @return {Vec3}
   */
  ;

  _proto.vmul = function vmul(vector, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    target.x = vector.x * this.x;
    target.y = vector.y * this.y;
    target.z = vector.z * this.z;
    return target;
  }
  /**
   * Scale a vector and add it to this vector. Save the result in "target". (target = this + vector * scalar)
   * @method addScaledVector
   * @param {Number} scalar
   * @param {Vec3} vector
   * @param {Vec3} target The vector to save the result in.
   * @return {Vec3}
   */
  ;

  _proto.addScaledVector = function addScaledVector(scalar, vector, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    target.x = this.x + scalar * vector.x;
    target.y = this.y + scalar * vector.y;
    target.z = this.z + scalar * vector.z;
    return target;
  }
  /**
   * Calculate dot product
   * @method dot
   * @param {Vec3} v
   * @return {Number}
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
  /**
   * @method isZero
   * @return bool
   */
  ;

  _proto.isZero = function isZero() {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }
  /**
   * Make the vector point in the opposite direction.
   * @method negate
   * @param {Vec3} target Optional target to save in
   * @return {Vec3}
   */
  ;

  _proto.negate = function negate(target) {
    if (target === void 0) {
      target = new Vec3();
    }

    target.x = -this.x;
    target.y = -this.y;
    target.z = -this.z;
    return target;
  }
  /**
   * Compute two artificial tangents to the vector
   * @method tangents
   * @param {Vec3} t1 Vector object to save the first tangent in
   * @param {Vec3} t2 Vector object to save the second tangent in
   */
  ;

  _proto.tangents = function tangents(t1, t2) {
    var norm = this.length();

    if (norm > 0.0) {
      var n = Vec3_tangents_n;
      var inorm = 1 / norm;
      n.set(this.x * inorm, this.y * inorm, this.z * inorm);
      var randVec = Vec3_tangents_randVec;

      if (Math.abs(n.x) < 0.9) {
        randVec.set(1, 0, 0);
        n.cross(randVec, t1);
      } else {
        randVec.set(0, 1, 0);
        n.cross(randVec, t1);
      }

      n.cross(t1, t2);
    } else {
      // The normal length is zero, make something up
      t1.set(1, 0, 0);
      t2.set(0, 1, 0);
    }
  }
  /**
   * Converts to a more readable format
   * @method toString
   * @return string
   */
  ;

  _proto.toString = function toString() {
    return this.x + "," + this.y + "," + this.z;
  }
  /**
   * Converts to an array
   * @method toArray
   * @return Array
   */
  ;

  _proto.toArray = function toArray() {
    return [this.x, this.y, this.z];
  }
  /**
   * Copies value of source to this vector.
   * @method copy
   * @param {Vec3} source
   * @return {Vec3} this
   */
  ;

  _proto.copy = function copy(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    return this;
  }
  /**
   * Do a linear interpolation between two vectors
   * @method lerp
   * @param {Vec3} v
   * @param {Number} t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
   * @param {Vec3} target
   */
  ;

  _proto.lerp = function lerp(vector, t, target) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    target.x = x + (vector.x - x) * t;
    target.y = y + (vector.y - y) * t;
    target.z = z + (vector.z - z) * t;
  }
  /**
   * Check if a vector equals is almost equal to another one.
   * @method almostEquals
   * @param {Vec3} v
   * @param {Number} precision
   * @return bool
   */
  ;

  _proto.almostEquals = function almostEquals(vector, precision) {
    if (precision === void 0) {
      precision = 1e-6;
    }

    if (Math.abs(this.x - vector.x) > precision || Math.abs(this.y - vector.y) > precision || Math.abs(this.z - vector.z) > precision) {
      return false;
    }

    return true;
  }
  /**
   * Check if a vector is almost zero
   * @method almostZero
   * @param {Number} precision
   */
  ;

  _proto.almostZero = function almostZero(precision) {
    if (precision === void 0) {
      precision = 1e-6;
    }

    if (Math.abs(this.x) > precision || Math.abs(this.y) > precision || Math.abs(this.z) > precision) {
      return false;
    }

    return true;
  }
  /**
   * Check if the vector is anti-parallel to another vector.
   * @method isAntiparallelTo
   * @param  {Vec3}  v
   * @param  {Number}  precision Set to zero for exact comparisons
   * @return {Boolean}
   */
  ;

  _proto.isAntiparallelTo = function isAntiparallelTo(vector, precision) {
    this.negate(antip_neg);
    return antip_neg.almostEquals(vector, precision);
  }
  /**
   * Clone the vector
   * @method clone
   * @return {Vec3}
   */
  ;

  _proto.clone = function clone() {
    return new Vec3(this.x, this.y, this.z);
  };

  return Vec3;
}();
Vec3.ZERO = new Vec3(0, 0, 0);
Vec3.UNIT_X = new Vec3(1, 0, 0);
Vec3.UNIT_Y = new Vec3(0, 1, 0);
Vec3.UNIT_Z = new Vec3(0, 0, 1);
/**
 * Compute two artificial tangents to the vector
 * @method tangents
 * @param {Vec3} t1 Vector object to save the first tangent in
 * @param {Vec3} t2 Vector object to save the second tangent in
 */

var Vec3_tangents_n = new Vec3();
var Vec3_tangents_randVec = new Vec3();
var antip_neg = new Vec3();

/**
 * Axis aligned bounding box class.
 * @class AABB
 * @constructor
 * @param {Object} [options]
 * @param {Vec3}   [options.upperBound] The upper bound of the bounding box.
 * @param {Vec3}   [options.lowerBound] The lower bound of the bounding box
 */
var AABB = /*#__PURE__*/function () {
  // The lower bound of the bounding box
  // The upper bound of the bounding box
  function AABB(options) {
    if (options === void 0) {
      options = {};
    }

    this.lowerBound = new Vec3();
    this.upperBound = new Vec3();

    if (options.lowerBound) {
      this.lowerBound.copy(options.lowerBound);
    }

    if (options.upperBound) {
      this.upperBound.copy(options.upperBound);
    }
  }
  /**
   * Set the AABB bounds from a set of points.
   * @method setFromPoints
   * @param {Array} points An array of Vec3's.
   * @param {Vec3} position Optional.
   * @param {Quaternion} quaternion Optional.
   * @param {number} skinSize Optional.
   * @return {AABB} The self object
   */


  var _proto = AABB.prototype;

  _proto.setFromPoints = function setFromPoints(points, position, quaternion, skinSize) {
    var l = this.lowerBound;
    var u = this.upperBound;
    var q = quaternion; // Set to the first point

    l.copy(points[0]);

    if (q) {
      q.vmult(l, l);
    }

    u.copy(l);

    for (var i = 1; i < points.length; i++) {
      var p = points[i];

      if (q) {
        q.vmult(p, tmp);
        p = tmp;
      }

      if (p.x > u.x) {
        u.x = p.x;
      }

      if (p.x < l.x) {
        l.x = p.x;
      }

      if (p.y > u.y) {
        u.y = p.y;
      }

      if (p.y < l.y) {
        l.y = p.y;
      }

      if (p.z > u.z) {
        u.z = p.z;
      }

      if (p.z < l.z) {
        l.z = p.z;
      }
    } // Add offset


    if (position) {
      position.vadd(l, l);
      position.vadd(u, u);
    }

    if (skinSize) {
      l.x -= skinSize;
      l.y -= skinSize;
      l.z -= skinSize;
      u.x += skinSize;
      u.y += skinSize;
      u.z += skinSize;
    }

    return this;
  }
  /**
   * Copy bounds from an AABB to this AABB
   * @method copy
   * @param  {AABB} aabb Source to copy from
   * @return {AABB} The this object, for chainability
   */
  ;

  _proto.copy = function copy(aabb) {
    this.lowerBound.copy(aabb.lowerBound);
    this.upperBound.copy(aabb.upperBound);
    return this;
  }
  /**
   * Clone an AABB
   * @method clone
   */
  ;

  _proto.clone = function clone() {
    return new AABB().copy(this);
  }
  /**
   * Extend this AABB so that it covers the given AABB too.
   * @method extend
   * @param  {AABB} aabb
   */
  ;

  _proto.extend = function extend(aabb) {
    this.lowerBound.x = Math.min(this.lowerBound.x, aabb.lowerBound.x);
    this.upperBound.x = Math.max(this.upperBound.x, aabb.upperBound.x);
    this.lowerBound.y = Math.min(this.lowerBound.y, aabb.lowerBound.y);
    this.upperBound.y = Math.max(this.upperBound.y, aabb.upperBound.y);
    this.lowerBound.z = Math.min(this.lowerBound.z, aabb.lowerBound.z);
    this.upperBound.z = Math.max(this.upperBound.z, aabb.upperBound.z);
  }
  /**
   * Returns true if the given AABB overlaps this AABB.
   * @method overlaps
   * @param  {AABB} aabb
   * @return {Boolean}
   */
  ;

  _proto.overlaps = function overlaps(aabb) {
    var l1 = this.lowerBound;
    var u1 = this.upperBound;
    var l2 = aabb.lowerBound;
    var u2 = aabb.upperBound; //      l2        u2
    //      |---------|
    // |--------|
    // l1       u1

    var overlapsX = l2.x <= u1.x && u1.x <= u2.x || l1.x <= u2.x && u2.x <= u1.x;
    var overlapsY = l2.y <= u1.y && u1.y <= u2.y || l1.y <= u2.y && u2.y <= u1.y;
    var overlapsZ = l2.z <= u1.z && u1.z <= u2.z || l1.z <= u2.z && u2.z <= u1.z;
    return overlapsX && overlapsY && overlapsZ;
  } // Mostly for debugging
  ;

  _proto.volume = function volume() {
    var l = this.lowerBound;
    var u = this.upperBound;
    return (u.x - l.x) * (u.y - l.y) * (u.z - l.z);
  }
  /**
   * Returns true if the given AABB is fully contained in this AABB.
   * @method contains
   * @param {AABB} aabb
   * @return {Boolean}
   */
  ;

  _proto.contains = function contains(aabb) {
    var l1 = this.lowerBound;
    var u1 = this.upperBound;
    var l2 = aabb.lowerBound;
    var u2 = aabb.upperBound; //      l2        u2
    //      |---------|
    // |---------------|
    // l1              u1

    return l1.x <= l2.x && u1.x >= u2.x && l1.y <= l2.y && u1.y >= u2.y && l1.z <= l2.z && u1.z >= u2.z;
  }
  /**
   * @method getCorners
   * @param {Vec3} a
   * @param {Vec3} b
   * @param {Vec3} c
   * @param {Vec3} d
   * @param {Vec3} e
   * @param {Vec3} f
   * @param {Vec3} g
   * @param {Vec3} h
   */
  ;

  _proto.getCorners = function getCorners(a, b, c, d, e, f, g, h) {
    var l = this.lowerBound;
    var u = this.upperBound;
    a.copy(l);
    b.set(u.x, l.y, l.z);
    c.set(u.x, u.y, l.z);
    d.set(l.x, u.y, u.z);
    e.set(u.x, l.y, u.z);
    f.set(l.x, u.y, l.z);
    g.set(l.x, l.y, u.z);
    h.copy(u);
  }
  /**
   * Get the representation of an AABB in another frame.
   * @method toLocalFrame
   * @param  {Transform} frame
   * @param  {AABB} target
   * @return {AABB} The "target" AABB object.
   */
  ;

  _proto.toLocalFrame = function toLocalFrame(frame, target) {
    var corners = transformIntoFrame_corners;
    var a = corners[0];
    var b = corners[1];
    var c = corners[2];
    var d = corners[3];
    var e = corners[4];
    var f = corners[5];
    var g = corners[6];
    var h = corners[7]; // Get corners in current frame

    this.getCorners(a, b, c, d, e, f, g, h); // Transform them to new local frame

    for (var i = 0; i !== 8; i++) {
      var corner = corners[i];
      frame.pointToLocal(corner, corner);
    }

    return target.setFromPoints(corners);
  }
  /**
   * Get the representation of an AABB in the global frame.
   * @method toWorldFrame
   * @param  {Transform} frame
   * @param  {AABB} target
   * @return {AABB} The "target" AABB object.
   */
  ;

  _proto.toWorldFrame = function toWorldFrame(frame, target) {
    var corners = transformIntoFrame_corners;
    var a = corners[0];
    var b = corners[1];
    var c = corners[2];
    var d = corners[3];
    var e = corners[4];
    var f = corners[5];
    var g = corners[6];
    var h = corners[7]; // Get corners in current frame

    this.getCorners(a, b, c, d, e, f, g, h); // Transform them to new local frame

    for (var i = 0; i !== 8; i++) {
      var corner = corners[i];
      frame.pointToWorld(corner, corner);
    }

    return target.setFromPoints(corners);
  }
  /**
   * Check if the AABB is hit by a ray.
   * @param  {Ray} ray
   * @return {Boolean}
   */
  ;

  _proto.overlapsRay = function overlapsRay(ray) {
    var direction = ray.direction,
        from = ray.from;

    var dirFracX = 1 / direction.x;
    var dirFracY = 1 / direction.y;
    var dirFracZ = 1 / direction.z; // this.lowerBound is the corner of AABB with minimal coordinates - left bottom, rt is maximal corner

    var t1 = (this.lowerBound.x - from.x) * dirFracX;
    var t2 = (this.upperBound.x - from.x) * dirFracX;
    var t3 = (this.lowerBound.y - from.y) * dirFracY;
    var t4 = (this.upperBound.y - from.y) * dirFracY;
    var t5 = (this.lowerBound.z - from.z) * dirFracZ;
    var t6 = (this.upperBound.z - from.z) * dirFracZ; // const tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)));
    // const tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)));

    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6)); // if tmax < 0, ray (line) is intersecting AABB, but whole AABB is behing us

    if (tmax < 0) {
      //t = tmax;
      return false;
    } // if tmin > tmax, ray doesn't intersect AABB


    if (tmin > tmax) {
      //t = tmax;
      return false;
    }

    return true;
  };

  return AABB;
}();
var tmp = new Vec3();
var transformIntoFrame_corners = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];

/**
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 * @class ArrayCollisionMatrix
 * @constructor
 */
var ArrayCollisionMatrix = /*#__PURE__*/function () {
  // The matrix storage.
  function ArrayCollisionMatrix() {
    this.matrix = [];
  }
  /**
   * Get an element
   * @method get
   * @param  {Body} i
   * @param  {Body} j
   * @return {Number}
   */


  var _proto = ArrayCollisionMatrix.prototype;

  _proto.get = function get(bi, bj) {
    var i = bi.index;
    var j = bj.index;

    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    return this.matrix[(i * (i + 1) >> 1) + j - 1];
  }
  /**
   * Set an element
   * @method set
   * @param {Body} i
   * @param {Body} j
   * @param {boolean} value
   */
  ;

  _proto.set = function set(bi, bj, value) {
    var i = bi.index;
    var j = bj.index;

    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    this.matrix[(i * (i + 1) >> 1) + j - 1] = value ? 1 : 0;
  }
  /**
   * Sets all elements to zero
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    for (var i = 0, l = this.matrix.length; i !== l; i++) {
      this.matrix[i] = 0;
    }
  }
  /**
   * Sets the max number of objects
   * @method setNumObjects
   * @param {Number} n
   */
  ;

  _proto.setNumObjects = function setNumObjects(n) {
    this.matrix.length = n * (n - 1) >> 1;
  };

  return ArrayCollisionMatrix;
}();

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * Base class for objects that dispatches events.
 * @class EventTarget
 * @constructor
 */
var EventTarget = /*#__PURE__*/function () {
  function EventTarget() {}
  /**
   * Add an event listener
   * @method addEventListener
   * @param  {String} type
   * @param  {Function} listener
   * @return {EventTarget} The self object, for chainability.
   */


  var _proto = EventTarget.prototype;

  _proto.addEventListener = function addEventListener(type, listener) {
    if (this._listeners === undefined) {
      this._listeners = {};
    }

    var listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (!listeners[type].includes(listener)) {
      listeners[type].push(listener);
    }

    return this;
  }
  /**
   * Check if an event listener is added
   * @method hasEventListener
   * @param  {String} type
   * @param  {Function} listener
   * @return {Boolean}
   */
  ;

  _proto.hasEventListener = function hasEventListener(type, listener) {
    if (this._listeners === undefined) {
      return false;
    }

    var listeners = this._listeners;

    if (listeners[type] !== undefined && listeners[type].includes(listener)) {
      return true;
    }

    return false;
  }
  /**
   * Check if any event listener of the given type is added
   * @method hasAnyEventListener
   * @param  {String} type
   * @return {Boolean}
   */
  ;

  _proto.hasAnyEventListener = function hasAnyEventListener(type) {
    if (this._listeners === undefined) {
      return false;
    }

    var listeners = this._listeners;
    return listeners[type] !== undefined;
  }
  /**
   * Remove an event listener
   * @method removeEventListener
   * @param  {String} type
   * @param  {Function} listener
   * @return {EventTarget} The self object, for chainability.
   */
  ;

  _proto.removeEventListener = function removeEventListener(type, listener) {
    if (this._listeners === undefined) {
      return this;
    }

    var listeners = this._listeners;

    if (listeners[type] === undefined) {
      return this;
    }

    var index = listeners[type].indexOf(listener);

    if (index !== -1) {
      listeners[type].splice(index, 1);
    }

    return this;
  }
  /**
   * Emit an event.
   * @method dispatchEvent
   * @param  {Object} event
   * @param  {String} event.type
   * @return {EventTarget} The self object, for chainability.
   */
  ;

  _proto.dispatchEvent = function dispatchEvent(event) {
    if (this._listeners === undefined) {
      return this;
    }

    var listeners = this._listeners;
    var listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      event.target = this;

      for (var i = 0, l = listenerArray.length; i < l; i++) {
        listenerArray[i].call(this, event);
      }
    }

    return this;
  };

  return EventTarget;
}();

/**
 * A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
 * @param {Number} x Multiplier of the imaginary basis vector i.
 * @param {Number} y Multiplier of the imaginary basis vector j.
 * @param {Number} z Multiplier of the imaginary basis vector k.
 * @param {Number} w Multiplier of the real part.
 * @see http://en.wikipedia.org/wiki/Quaternion
 */

var Quaternion = /*#__PURE__*/function () {
  function Quaternion(x, y, z, w) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    if (w === void 0) {
      w = 1;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  /**
   * Set the value of the quaternion.
   */


  var _proto = Quaternion.prototype;

  _proto.set = function set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  /**
   * Convert to a readable format
   * @return {String} "x,y,z,w"
   */
  ;

  _proto.toString = function toString() {
    return this.x + "," + this.y + "," + this.z + "," + this.w;
  }
  /**
   * Convert to an Array
   * @return {Array} [x, y, z, w]
   */
  ;

  _proto.toArray = function toArray() {
    return [this.x, this.y, this.z, this.w];
  }
  /**
   * Set the quaternion components given an axis and an angle in radians.
   */
  ;

  _proto.setFromAxisAngle = function setFromAxisAngle(vector, angle) {
    var s = Math.sin(angle * 0.5);
    this.x = vector.x * s;
    this.y = vector.y * s;
    this.z = vector.z * s;
    this.w = Math.cos(angle * 0.5);
    return this;
  }
  /**
   * Converts the quaternion to [ axis, angle ] representation.
   * @param {Vec3} [targetAxis] A vector object to reuse for storing the axis.
   * @return {Array} An array, first element is the axis and the second is the angle in radians.
   */
  ;

  _proto.toAxisAngle = function toAxisAngle(targetAxis) {
    if (targetAxis === void 0) {
      targetAxis = new Vec3();
    }

    this.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised

    var angle = 2 * Math.acos(this.w);
    var s = Math.sqrt(1 - this.w * this.w); // assuming quaternion normalised then w is less than 1, so term always positive.

    if (s < 0.001) {
      // test to avoid divide by zero, s is always positive due to sqrt
      // if s close to zero then direction of axis not important
      targetAxis.x = this.x; // if it is important that axis is normalised then replace with x=1; y=z=0;

      targetAxis.y = this.y;
      targetAxis.z = this.z;
    } else {
      targetAxis.x = this.x / s; // normalise axis

      targetAxis.y = this.y / s;
      targetAxis.z = this.z / s;
    }

    return [targetAxis, angle];
  }
  /**
   * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
   */
  ;

  _proto.setFromVectors = function setFromVectors(u, v) {
    if (u.isAntiparallelTo(v)) {
      var t1 = sfv_t1;
      var t2 = sfv_t2;
      u.tangents(t1, t2);
      this.setFromAxisAngle(t1, Math.PI);
    } else {
      var a = u.cross(v);
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      this.w = Math.sqrt(Math.pow(u.length(), 2) * Math.pow(v.length(), 2)) + u.dot(v);
      this.normalize();
    }

    return this;
  }
  /**
   * Multiply the quaternion with an other quaternion.
   */
  ;

  _proto.mult = function mult(quat, target) {
    if (target === void 0) {
      target = new Quaternion();
    }

    var ax = this.x;
    var ay = this.y;
    var az = this.z;
    var aw = this.w;
    var bx = quat.x;
    var by = quat.y;
    var bz = quat.z;
    var bw = quat.w;
    target.x = ax * bw + aw * bx + ay * bz - az * by;
    target.y = ay * bw + aw * by + az * bx - ax * bz;
    target.z = az * bw + aw * bz + ax * by - ay * bx;
    target.w = aw * bw - ax * bx - ay * by - az * bz;
    return target;
  }
  /**
   * Get the inverse quaternion rotation.
   */
  ;

  _proto.inverse = function inverse(target) {
    if (target === void 0) {
      target = new Quaternion();
    }

    var x = this.x;
    var y = this.y;
    var z = this.z;
    var w = this.w;
    this.conjugate(target);
    var inorm2 = 1 / (x * x + y * y + z * z + w * w);
    target.x *= inorm2;
    target.y *= inorm2;
    target.z *= inorm2;
    target.w *= inorm2;
    return target;
  }
  /**
   * Get the quaternion conjugate
   */
  ;

  _proto.conjugate = function conjugate(target) {
    if (target === void 0) {
      target = new Quaternion();
    }

    target.x = -this.x;
    target.y = -this.y;
    target.z = -this.z;
    target.w = this.w;
    return target;
  }
  /**
   * Normalize the quaternion. Note that this changes the values of the quaternion.
   * @method normalize
   */
  ;

  _proto.normalize = function normalize() {
    var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

    if (l === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
    } else {
      l = 1 / l;
      this.x *= l;
      this.y *= l;
      this.z *= l;
      this.w *= l;
    }

    return this;
  }
  /**
   * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
   * @see http://jsperf.com/fast-quaternion-normalization
   * @author unphased, https://github.com/unphased
   */
  ;

  _proto.normalizeFast = function normalizeFast() {
    var f = (3.0 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2.0;

    if (f === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
    } else {
      this.x *= f;
      this.y *= f;
      this.z *= f;
      this.w *= f;
    }

    return this;
  }
  /**
   * Multiply the quaternion by a vector
   */
  ;

  _proto.vmult = function vmult(v, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var x = v.x;
    var y = v.y;
    var z = v.z;
    var qx = this.x;
    var qy = this.y;
    var qz = this.z;
    var qw = this.w; // q*v

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;
    target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return target;
  }
  /**
   * Copies value of source to this quaternion.
   * @method copy
   * @param {Quaternion} source
   * @return {Quaternion} this
   */
  ;

  _proto.copy = function copy(quat) {
    this.x = quat.x;
    this.y = quat.y;
    this.z = quat.z;
    this.w = quat.w;
    return this;
  }
  /**
   * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
   * @method toEuler
   * @param {Vec3} target
   * @param {String} order Three-character string, defaults to "YZX"
   */
  ;

  _proto.toEuler = function toEuler(target, order) {
    if (order === void 0) {
      order = 'YZX';
    }

    var heading;
    var attitude;
    var bank;
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var w = this.w;

    switch (order) {
      case 'YZX':
        var test = x * y + z * w;

        if (test > 0.499) {
          // singularity at north pole
          heading = 2 * Math.atan2(x, w);
          attitude = Math.PI / 2;
          bank = 0;
        }

        if (test < -0.499) {
          // singularity at south pole
          heading = -2 * Math.atan2(x, w);
          attitude = -Math.PI / 2;
          bank = 0;
        }

        if (heading === undefined) {
          var sqx = x * x;
          var sqy = y * y;
          var sqz = z * z;
          heading = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz); // Heading

          attitude = Math.asin(2 * test); // attitude

          bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz); // bank
        }

        break;

      default:
        throw new Error("Euler order " + order + " not supported yet.");
    }

    target.y = heading;
    target.z = attitude;
    target.x = bank;
  }
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {String} order The order to apply angles: 'XYZ' or 'YXZ' or any other combination
   * @see http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
   */
  ;

  _proto.setFromEuler = function setFromEuler(x, y, z, order) {
    if (order === void 0) {
      order = 'XYZ';
    }

    var c1 = Math.cos(x / 2);
    var c2 = Math.cos(y / 2);
    var c3 = Math.cos(z / 2);
    var s1 = Math.sin(x / 2);
    var s2 = Math.sin(y / 2);
    var s3 = Math.sin(z / 2);

    if (order === 'XYZ') {
      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'YXZ') {
      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'ZXY') {
      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'ZYX') {
      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'YZX') {
      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'XZY') {
      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;
    }

    return this;
  }
  /**
   * @method clone
   * @return {Quaternion}
   */
  ;

  _proto.clone = function clone() {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {Quaternion} toQuat second operand
   * @param {Number} t interpolation amount between the self quaternion and toQuat
   * @param {Quaternion} [target] A quaternion to store the result in. If not provided, a new one will be created.
   * @returns {Quaternion} The "target" object
   */
  ;

  _proto.slerp = function slerp(toQuat, t, target) {
    if (target === void 0) {
      target = new Quaternion();
    }

    var ax = this.x;
    var ay = this.y;
    var az = this.z;
    var aw = this.w;
    var bx = toQuat.x;
    var by = toQuat.y;
    var bz = toQuat.z;
    var bw = toQuat.w;
    var omega;
    var cosom;
    var sinom;
    var scale0;
    var scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > 0.000001) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    target.x = scale0 * ax + scale1 * bx;
    target.y = scale0 * ay + scale1 * by;
    target.z = scale0 * az + scale1 * bz;
    target.w = scale0 * aw + scale1 * bw;
    return target;
  }
  /**
   * Rotate an absolute orientation quaternion given an angular velocity and a time step.
   */
  ;

  _proto.integrate = function integrate(angularVelocity, dt, angularFactor, target) {
    if (target === void 0) {
      target = new Quaternion();
    }

    var ax = angularVelocity.x * angularFactor.x,
        ay = angularVelocity.y * angularFactor.y,
        az = angularVelocity.z * angularFactor.z,
        bx = this.x,
        by = this.y,
        bz = this.z,
        bw = this.w;
    var half_dt = dt * 0.5;
    target.x += half_dt * (ax * bw + ay * bz - az * by);
    target.y += half_dt * (ay * bw + az * bx - ax * bz);
    target.z += half_dt * (az * bw + ax * by - ay * bx);
    target.w += half_dt * (-ax * bx - ay * by - az * bz);
    return target;
  };

  return Quaternion;
}();
var sfv_t1 = new Vec3();
var sfv_t2 = new Vec3();

var SHAPE_TYPES = {
  SPHERE: 1,
  PLANE: 2,
  BOX: 4,
  COMPOUND: 8,
  CONVEXPOLYHEDRON: 16,
  HEIGHTFIELD: 32,
  PARTICLE: 64,
  CYLINDER: 128,
  TRIMESH: 256
};

/**
 * Base class for shapes
 * @class Shape
 * @constructor
 * @param {object} [options]
 * @param {number} [options.collisionFilterGroup=1]
 * @param {number} [options.collisionFilterMask=-1]
 * @param {number} [options.collisionResponse=true]
 * @param {number} [options.material=null]
 * @author schteppe
 */
var Shape = /*#__PURE__*/function () {
  // Identifyer of the Shape.
  // The type of this shape. Must be set to an int > 0 by subclasses.
  // The local bounding sphere radius of this shape.
  // Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
  function Shape(options) {
    if (options === void 0) {
      options = {};
    }

    this.id = Shape.idCounter++;
    this.type = options.type || 0;
    this.boundingSphereRadius = 0;
    this.collisionResponse = options.collisionResponse ? options.collisionResponse : true;
    this.collisionFilterGroup = options.collisionFilterGroup !== undefined ? options.collisionFilterGroup : 1;
    this.collisionFilterMask = options.collisionFilterMask !== undefined ? options.collisionFilterMask : -1;
    this.material = options.material ? options.material : null;
    this.body = null;
  }
  /**
   * Computes the bounding sphere radius. The result is stored in the property .boundingSphereRadius
   * @method updateBoundingSphereRadius
   */


  var _proto = Shape.prototype;

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    throw "computeBoundingSphereRadius() not implemented for shape type " + this.type;
  }
  /**
   * Get the volume of this shape
   * @method volume
   * @return {Number}
   */
  ;

  _proto.volume = function volume() {
    throw "volume() not implemented for shape type " + this.type;
  }
  /**
   * Calculates the inertia in the local frame for this shape.
   * @method calculateLocalInertia
   * @param {Number} mass
   * @param {Vec3} target
   * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
   */
  ;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    throw "calculateLocalInertia() not implemented for shape type " + this.type;
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    throw "calculateWorldAABB() not implemented for shape type " + this.type;
  };

  return Shape;
}();
Shape.idCounter = 0;
/**
 * The available shape types.
 * @static
 * @property types
 * @type {Object}
 */

Shape.types = SHAPE_TYPES;

var Transform = /*#__PURE__*/function () {
  function Transform(options) {
    if (options === void 0) {
      options = {};
    }

    this.position = new Vec3();
    this.quaternion = new Quaternion();

    if (options.position) {
      this.position.copy(options.position);
    }

    if (options.quaternion) {
      this.quaternion.copy(options.quaternion);
    }
  }
  /**
   * Get a global point in local transform coordinates.
   */


  var _proto = Transform.prototype;

  _proto.pointToLocal = function pointToLocal(worldPoint, result) {
    return Transform.pointToLocalFrame(this.position, this.quaternion, worldPoint, result);
  }
  /**
   * Get a local point in global transform coordinates.
   */
  ;

  _proto.pointToWorld = function pointToWorld(localPoint, result) {
    return Transform.pointToWorldFrame(this.position, this.quaternion, localPoint, result);
  };

  _proto.vectorToWorldFrame = function vectorToWorldFrame(localVector, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    this.quaternion.vmult(localVector, result);
    return result;
  };

  Transform.pointToLocalFrame = function pointToLocalFrame(position, quaternion, worldPoint, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    worldPoint.vsub(position, result);
    quaternion.conjugate(tmpQuat);
    tmpQuat.vmult(result, result);
    return result;
  };

  Transform.pointToWorldFrame = function pointToWorldFrame(position, quaternion, localPoint, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    quaternion.vmult(localPoint, result);
    result.vadd(position, result);
    return result;
  };

  Transform.vectorToWorldFrame = function vectorToWorldFrame(quaternion, localVector, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    quaternion.vmult(localVector, result);
    return result;
  };

  Transform.vectorToLocalFrame = function vectorToLocalFrame(position, quaternion, worldVector, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    quaternion.w *= -1;
    quaternion.vmult(worldVector, result);
    quaternion.w *= -1;
    return result;
  };

  return Transform;
}();
var tmpQuat = new Quaternion();

/**
 * A set of polygons describing a convex shape.
 * @class ConvexPolyhedron
 * @constructor
 * @extends Shape
 * @description The shape MUST be convex for the code to work properly. No polygons may be coplanar (contained
 * in the same 3D plane), instead these should be merged into one polygon.
 *
 * @param {array} points An array of Vec3's
 * @param {array} faces Array of integer arrays, describing which vertices that is included in each face.
 *
 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
 * @author schteppe / https://github.com/schteppe
 * @see http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
 *
 * @todo Move the clipping functions to ContactGenerator?
 * @todo Automatically merge coplanar polygons in constructor.
 */
var ConvexPolyhedron = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(ConvexPolyhedron, _Shape);

  // Array of integer arrays, indicating which vertices each face consists of
  // If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
  function ConvexPolyhedron(props) {
    var _this;

    if (props === void 0) {
      props = {};
    }

    var _props = props,
        _props$vertices = _props.vertices,
        vertices = _props$vertices === void 0 ? [] : _props$vertices,
        _props$faces = _props.faces,
        faces = _props$faces === void 0 ? [] : _props$faces,
        _props$normals = _props.normals,
        normals = _props$normals === void 0 ? [] : _props$normals,
        axes = _props.axes,
        boundingSphereRadius = _props.boundingSphereRadius;
    _this = _Shape.call(this, {
      type: Shape.types.CONVEXPOLYHEDRON
    }) || this;
    _this.vertices = vertices;
    _this.faces = faces;
    _this.faceNormals = normals;

    if (_this.faceNormals.length === 0) {
      _this.computeNormals();
    }

    if (!boundingSphereRadius) {
      _this.updateBoundingSphereRadius();
    } else {
      _this.boundingSphereRadius = boundingSphereRadius;
    }

    _this.worldVertices = []; // World transformed version of .vertices

    _this.worldVerticesNeedsUpdate = true;
    _this.worldFaceNormals = []; // World transformed version of .faceNormals

    _this.worldFaceNormalsNeedsUpdate = true;
    _this.uniqueAxes = axes ? axes.slice() : null;
    _this.uniqueEdges = [];

    _this.computeEdges();

    return _this;
  }
  /**
   * Computes uniqueEdges
   * @method computeEdges
   */


  var _proto = ConvexPolyhedron.prototype;

  _proto.computeEdges = function computeEdges() {
    var faces = this.faces;
    var vertices = this.vertices;
    var edges = this.uniqueEdges;
    edges.length = 0;
    var edge = new Vec3();

    for (var i = 0; i !== faces.length; i++) {
      var face = faces[i];
      var numVertices = face.length;

      for (var j = 0; j !== numVertices; j++) {
        var k = (j + 1) % numVertices;
        vertices[face[j]].vsub(vertices[face[k]], edge);
        edge.normalize();
        var found = false;

        for (var p = 0; p !== edges.length; p++) {
          if (edges[p].almostEquals(edge) || edges[p].almostEquals(edge)) {
            found = true;
            break;
          }
        }

        if (!found) {
          edges.push(edge.clone());
        }
      }
    }
  }
  /**
   * Compute the normals of the faces. Will reuse existing Vec3 objects in the .faceNormals array if they exist.
   * @method computeNormals
   */
  ;

  _proto.computeNormals = function computeNormals() {
    this.faceNormals.length = this.faces.length; // Generate normals

    for (var i = 0; i < this.faces.length; i++) {
      // Check so all vertices exists for this face
      for (var j = 0; j < this.faces[i].length; j++) {
        if (!this.vertices[this.faces[i][j]]) {
          throw new Error("Vertex " + this.faces[i][j] + " not found!");
        }
      }

      var n = this.faceNormals[i] || new Vec3();
      this.getFaceNormal(i, n);
      n.negate(n);
      this.faceNormals[i] = n;
      var vertex = this.vertices[this.faces[i][0]];

      if (n.dot(vertex) < 0) {
        console.error(".faceNormals[" + i + "] = Vec3(" + n.toString() + ") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");

        for (var _j = 0; _j < this.faces[i].length; _j++) {
          console.warn(".vertices[" + this.faces[i][_j] + "] = Vec3(" + this.vertices[this.faces[i][_j]].toString() + ")");
        }
      }
    }
  }
  /**
   * Compute the normal of a face from its vertices
   * @method getFaceNormal
   * @param  {Number} i
   * @param  {Vec3} target
   */
  ;

  _proto.getFaceNormal = function getFaceNormal(i, target) {
    var f = this.faces[i];
    var va = this.vertices[f[0]];
    var vb = this.vertices[f[1]];
    var vc = this.vertices[f[2]];
    ConvexPolyhedron.computeNormal(va, vb, vc, target);
  }
  /**
   * @method clipAgainstHull
   * @param {Vec3} posA
   * @param {Quaternion} quatA
   * @param {ConvexPolyhedron} hullB
   * @param {Vec3} posB
   * @param {Quaternion} quatB
   * @param {Vec3} separatingNormal
   * @param {Number} minDist Clamp distance
   * @param {Number} maxDist
   * @param {array} result The an array of contact point objects, see clipFaceAgainstHull
   */
  ;

  _proto.clipAgainstHull = function clipAgainstHull(posA, quatA, hullB, posB, quatB, separatingNormal, minDist, maxDist, result) {
    var WorldNormal = new Vec3();
    var closestFaceB = -1;
    var dmax = -Number.MAX_VALUE;

    for (var face = 0; face < hullB.faces.length; face++) {
      WorldNormal.copy(hullB.faceNormals[face]);
      quatB.vmult(WorldNormal, WorldNormal);
      var d = WorldNormal.dot(separatingNormal);

      if (d > dmax) {
        dmax = d;
        closestFaceB = face;
      }
    }

    var worldVertsB1 = [];

    for (var i = 0; i < hullB.faces[closestFaceB].length; i++) {
      var b = hullB.vertices[hullB.faces[closestFaceB][i]];
      var worldb = new Vec3();
      worldb.copy(b);
      quatB.vmult(worldb, worldb);
      posB.vadd(worldb, worldb);
      worldVertsB1.push(worldb);
    }

    if (closestFaceB >= 0) {
      this.clipFaceAgainstHull(separatingNormal, posA, quatA, worldVertsB1, minDist, maxDist, result);
    }
  }
  /**
   * Find the separating axis between this hull and another
   * @method findSeparatingAxis
   * @param {ConvexPolyhedron} hullB
   * @param {Vec3} posA
   * @param {Quaternion} quatA
   * @param {Vec3} posB
   * @param {Quaternion} quatB
   * @param {Vec3} target The target vector to save the axis in
   * @return {bool} Returns false if a separation is found, else true
   */
  ;

  _proto.findSeparatingAxis = function findSeparatingAxis(hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    var faceANormalWS3 = new Vec3();
    var Worldnormal1 = new Vec3();
    var deltaC = new Vec3();
    var worldEdge0 = new Vec3();
    var worldEdge1 = new Vec3();
    var Cross = new Vec3();
    var dmin = Number.MAX_VALUE;
    var hullA = this;

    if (!hullA.uniqueAxes) {
      var numFacesA = faceListA ? faceListA.length : hullA.faces.length; // Test face normals from hullA

      for (var i = 0; i < numFacesA; i++) {
        var fi = faceListA ? faceListA[i] : i; // Get world face normal

        faceANormalWS3.copy(hullA.faceNormals[fi]);
        quatA.vmult(faceANormalWS3, faceANormalWS3);
        var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);

        if (d === false) {
          return false;
        }

        if (d < dmin) {
          dmin = d;
          target.copy(faceANormalWS3);
        }
      }
    } else {
      // Test unique axes
      for (var _i = 0; _i !== hullA.uniqueAxes.length; _i++) {
        // Get world axis
        quatA.vmult(hullA.uniqueAxes[_i], faceANormalWS3);

        var _d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);

        if (_d === false) {
          return false;
        }

        if (_d < dmin) {
          dmin = _d;
          target.copy(faceANormalWS3);
        }
      }
    }

    if (!hullB.uniqueAxes) {
      // Test face normals from hullB
      var numFacesB = faceListB ? faceListB.length : hullB.faces.length;

      for (var _i2 = 0; _i2 < numFacesB; _i2++) {
        var _fi = faceListB ? faceListB[_i2] : _i2;

        Worldnormal1.copy(hullB.faceNormals[_fi]);
        quatB.vmult(Worldnormal1, Worldnormal1);

        var _d2 = hullA.testSepAxis(Worldnormal1, hullB, posA, quatA, posB, quatB);

        if (_d2 === false) {
          return false;
        }

        if (_d2 < dmin) {
          dmin = _d2;
          target.copy(Worldnormal1);
        }
      }
    } else {
      // Test unique axes in B
      for (var _i3 = 0; _i3 !== hullB.uniqueAxes.length; _i3++) {
        quatB.vmult(hullB.uniqueAxes[_i3], Worldnormal1);

        var _d3 = hullA.testSepAxis(Worldnormal1, hullB, posA, quatA, posB, quatB);

        if (_d3 === false) {
          return false;
        }

        if (_d3 < dmin) {
          dmin = _d3;
          target.copy(Worldnormal1);
        }
      }
    } // Test edges


    for (var e0 = 0; e0 !== hullA.uniqueEdges.length; e0++) {
      // Get world edge
      quatA.vmult(hullA.uniqueEdges[e0], worldEdge0);

      for (var e1 = 0; e1 !== hullB.uniqueEdges.length; e1++) {
        // Get world edge 2
        quatB.vmult(hullB.uniqueEdges[e1], worldEdge1);
        worldEdge0.cross(worldEdge1, Cross);

        if (!Cross.almostZero()) {
          Cross.normalize();
          var dist = hullA.testSepAxis(Cross, hullB, posA, quatA, posB, quatB);

          if (dist === false) {
            return false;
          }

          if (dist < dmin) {
            dmin = dist;
            target.copy(Cross);
          }
        }
      }
    }

    posB.vsub(posA, deltaC);

    if (deltaC.dot(target) > 0.0) {
      target.negate(target);
    }

    return true;
  }
  /**
   * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
   * @method testSepAxis
   * @param {Vec3} axis
   * @param {ConvexPolyhedron} hullB
   * @param {Vec3} posA
   * @param {Quaternion} quatA
   * @param {Vec3} posB
   * @param {Quaternion} quatB
   * @return {number} The overlap depth, or FALSE if no penetration.
   */
  ;

  _proto.testSepAxis = function testSepAxis(axis, hullB, posA, quatA, posB, quatB) {
    var hullA = this;
    ConvexPolyhedron.project(hullA, axis, posA, quatA, maxminA);
    ConvexPolyhedron.project(hullB, axis, posB, quatB, maxminB);
    var maxA = maxminA[0];
    var minA = maxminA[1];
    var maxB = maxminB[0];
    var minB = maxminB[1];

    if (maxA < minB || maxB < minA) {
      return false; // Separated
    }

    var d0 = maxA - minB;
    var d1 = maxB - minA;
    var depth = d0 < d1 ? d0 : d1;
    return depth;
  }
  /**
   * @method calculateLocalInertia
   * @param  {Number} mass
   * @param  {Vec3} target
   */
  ;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    // Approximate with box inertia
    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
    var aabbmax = new Vec3();
    var aabbmin = new Vec3();
    this.computeLocalAABB(aabbmin, aabbmax);
    var x = aabbmax.x - aabbmin.x;
    var y = aabbmax.y - aabbmin.y;
    var z = aabbmax.z - aabbmin.z;
    target.x = 1.0 / 12.0 * mass * (2 * y * 2 * y + 2 * z * 2 * z);
    target.y = 1.0 / 12.0 * mass * (2 * x * 2 * x + 2 * z * 2 * z);
    target.z = 1.0 / 12.0 * mass * (2 * y * 2 * y + 2 * x * 2 * x);
  }
  /**
   * @method getPlaneConstantOfFace
   * @param  {Number} face_i Index of the face
   * @return {Number}
   */
  ;

  _proto.getPlaneConstantOfFace = function getPlaneConstantOfFace(face_i) {
    var f = this.faces[face_i];
    var n = this.faceNormals[face_i];
    var v = this.vertices[f[0]];
    var c = -n.dot(v);
    return c;
  }
  /**
   * Clip a face against a hull.
   * @method clipFaceAgainstHull
   * @param {Vec3} separatingNormal
   * @param {Vec3} posA
   * @param {Quaternion} quatA
   * @param {Array} worldVertsB1 An array of Vec3 with vertices in the world frame.
   * @param {Number} minDist Distance clamping
   * @param {Number} maxDist
   * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
   */
  ;

  _proto.clipFaceAgainstHull = function clipFaceAgainstHull(separatingNormal, posA, quatA, worldVertsB1, minDist, maxDist, result) {
    var faceANormalWS = new Vec3();
    var edge0 = new Vec3();
    var WorldEdge0 = new Vec3();
    var worldPlaneAnormal1 = new Vec3();
    var planeNormalWS1 = new Vec3();
    var worldA1 = new Vec3();
    var localPlaneNormal = new Vec3();
    var planeNormalWS = new Vec3();
    var hullA = this;
    var worldVertsB2 = [];
    var pVtxIn = worldVertsB1;
    var pVtxOut = worldVertsB2;
    var closestFaceA = -1;
    var dmin = Number.MAX_VALUE; // Find the face with normal closest to the separating axis

    for (var face = 0; face < hullA.faces.length; face++) {
      faceANormalWS.copy(hullA.faceNormals[face]);
      quatA.vmult(faceANormalWS, faceANormalWS);
      var d = faceANormalWS.dot(separatingNormal);

      if (d < dmin) {
        dmin = d;
        closestFaceA = face;
      }
    }

    if (closestFaceA < 0) {
      return;
    } // Get the face and construct connected faces


    var polyA = hullA.faces[closestFaceA];
    polyA.connectedFaces = [];

    for (var i = 0; i < hullA.faces.length; i++) {
      for (var j = 0; j < hullA.faces[i].length; j++) {
        if (
        /* Sharing a vertex*/
        polyA.indexOf(hullA.faces[i][j]) !== -1 &&
        /* Not the one we are looking for connections from */
        i !== closestFaceA &&
        /* Not already added */
        polyA.connectedFaces.indexOf(i) === -1) {
          polyA.connectedFaces.push(i);
        }
      }
    } // Clip the polygon to the back of the planes of all faces of hull A,
    // that are adjacent to the witness face


    var numVerticesA = polyA.length;

    for (var _i4 = 0; _i4 < numVerticesA; _i4++) {
      var a = hullA.vertices[polyA[_i4]];
      var b = hullA.vertices[polyA[(_i4 + 1) % numVerticesA]];
      a.vsub(b, edge0);
      WorldEdge0.copy(edge0);
      quatA.vmult(WorldEdge0, WorldEdge0);
      posA.vadd(WorldEdge0, WorldEdge0);
      worldPlaneAnormal1.copy(this.faceNormals[closestFaceA]);
      quatA.vmult(worldPlaneAnormal1, worldPlaneAnormal1);
      posA.vadd(worldPlaneAnormal1, worldPlaneAnormal1);
      WorldEdge0.cross(worldPlaneAnormal1, planeNormalWS1);
      planeNormalWS1.negate(planeNormalWS1);
      worldA1.copy(a);
      quatA.vmult(worldA1, worldA1);
      posA.vadd(worldA1, worldA1);
      var otherFace = polyA.connectedFaces[_i4];
      localPlaneNormal.copy(this.faceNormals[otherFace]);

      var _localPlaneEq = this.getPlaneConstantOfFace(otherFace);

      planeNormalWS.copy(localPlaneNormal);
      quatA.vmult(planeNormalWS, planeNormalWS);

      var _planeEqWS = _localPlaneEq - planeNormalWS.dot(posA); // Clip face against our constructed plane


      this.clipFaceAgainstPlane(pVtxIn, pVtxOut, planeNormalWS, _planeEqWS); // Throw away all clipped points, but save the remaining until next clip

      while (pVtxIn.length) {
        pVtxIn.shift();
      }

      while (pVtxOut.length) {
        pVtxIn.push(pVtxOut.shift());
      }
    } // only keep contact points that are behind the witness face


    localPlaneNormal.copy(this.faceNormals[closestFaceA]);
    var localPlaneEq = this.getPlaneConstantOfFace(closestFaceA);
    planeNormalWS.copy(localPlaneNormal);
    quatA.vmult(planeNormalWS, planeNormalWS);
    var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);

    for (var _i5 = 0; _i5 < pVtxIn.length; _i5++) {
      var depth = planeNormalWS.dot(pVtxIn[_i5]) + planeEqWS; // ???

      if (depth <= minDist) {
        console.log("clamped: depth=" + depth + " to minDist=" + minDist);
        depth = minDist;
      }

      if (depth <= maxDist) {
        var point = pVtxIn[_i5];

        if (depth <= 1e-6) {
          var p = {
            point: point,
            normal: planeNormalWS,
            depth: depth
          };
          result.push(p);
        }
      }
    }
  }
  /**
   * Clip a face in a hull against the back of a plane.
   * @method clipFaceAgainstPlane
   * @param {Array} inVertices
   * @param {Array} outVertices
   * @param {Vec3} planeNormal
   * @param {Number} planeConstant The constant in the mathematical plane equation
   */
  ;

  _proto.clipFaceAgainstPlane = function clipFaceAgainstPlane(inVertices, outVertices, planeNormal, planeConstant) {
    var n_dot_first;
    var n_dot_last;
    var numVerts = inVertices.length;

    if (numVerts < 2) {
      return outVertices;
    }

    var firstVertex = inVertices[inVertices.length - 1];
    var lastVertex = inVertices[0];
    n_dot_first = planeNormal.dot(firstVertex) + planeConstant;

    for (var vi = 0; vi < numVerts; vi++) {
      lastVertex = inVertices[vi];
      n_dot_last = planeNormal.dot(lastVertex) + planeConstant;

      if (n_dot_first < 0) {
        if (n_dot_last < 0) {
          // Start < 0, end < 0, so output lastVertex
          var newv = new Vec3();
          newv.copy(lastVertex);
          outVertices.push(newv);
        } else {
          // Start < 0, end >= 0, so output intersection
          var _newv = new Vec3();

          firstVertex.lerp(lastVertex, n_dot_first / (n_dot_first - n_dot_last), _newv);
          outVertices.push(_newv);
        }
      } else {
        if (n_dot_last < 0) {
          // Start >= 0, end < 0 so output intersection and end
          var _newv2 = new Vec3();

          firstVertex.lerp(lastVertex, n_dot_first / (n_dot_first - n_dot_last), _newv2);
          outVertices.push(_newv2);
          outVertices.push(lastVertex);
        }
      }

      firstVertex = lastVertex;
      n_dot_first = n_dot_last;
    }

    return outVertices;
  } // Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
  ;

  _proto.computeWorldVertices = function computeWorldVertices(position, quat) {
    while (this.worldVertices.length < this.vertices.length) {
      this.worldVertices.push(new Vec3());
    }

    var verts = this.vertices;
    var worldVerts = this.worldVertices;

    for (var i = 0; i !== this.vertices.length; i++) {
      quat.vmult(verts[i], worldVerts[i]);
      position.vadd(worldVerts[i], worldVerts[i]);
    }

    this.worldVerticesNeedsUpdate = false;
  };

  _proto.computeLocalAABB = function computeLocalAABB(aabbmin, aabbmax) {
    var vertices = this.vertices;
    aabbmin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    aabbmax.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

    for (var i = 0; i < this.vertices.length; i++) {
      var v = vertices[i];

      if (v.x < aabbmin.x) {
        aabbmin.x = v.x;
      } else if (v.x > aabbmax.x) {
        aabbmax.x = v.x;
      }

      if (v.y < aabbmin.y) {
        aabbmin.y = v.y;
      } else if (v.y > aabbmax.y) {
        aabbmax.y = v.y;
      }

      if (v.z < aabbmin.z) {
        aabbmin.z = v.z;
      } else if (v.z > aabbmax.z) {
        aabbmax.z = v.z;
      }
    }
  }
  /**
   * Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
   * @method computeWorldFaceNormals
   * @param  {Quaternion} quat
   */
  ;

  _proto.computeWorldFaceNormals = function computeWorldFaceNormals(quat) {
    var N = this.faceNormals.length;

    while (this.worldFaceNormals.length < N) {
      this.worldFaceNormals.push(new Vec3());
    }

    var normals = this.faceNormals;
    var worldNormals = this.worldFaceNormals;

    for (var i = 0; i !== N; i++) {
      quat.vmult(normals[i], worldNormals[i]);
    }

    this.worldFaceNormalsNeedsUpdate = false;
  }
  /**
   * @method updateBoundingSphereRadius
   */
  ;

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    // Assume points are distributed with local (0,0,0) as center
    var max2 = 0;
    var verts = this.vertices;

    for (var i = 0; i !== verts.length; i++) {
      var norm2 = verts[i].lengthSquared();

      if (norm2 > max2) {
        max2 = norm2;
      }
    }

    this.boundingSphereRadius = Math.sqrt(max2);
  }
  /**
   * @method calculateWorldAABB
   * @param {Vec3}        pos
   * @param {Quaternion}  quat
   * @param {Vec3}        min
   * @param {Vec3}        max
   */
  ;

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    var verts = this.vertices;
    var minx;
    var miny;
    var minz;
    var maxx;
    var maxy;
    var maxz;
    var tempWorldVertex = new Vec3();

    for (var i = 0; i < verts.length; i++) {
      tempWorldVertex.copy(verts[i]);
      quat.vmult(tempWorldVertex, tempWorldVertex);
      pos.vadd(tempWorldVertex, tempWorldVertex);
      var v = tempWorldVertex;

      if (minx === undefined || v.x < minx) {
        minx = v.x;
      }

      if (maxx === undefined || v.x > maxx) {
        maxx = v.x;
      }

      if (miny === undefined || v.y < miny) {
        miny = v.y;
      }

      if (maxy === undefined || v.y > maxy) {
        maxy = v.y;
      }

      if (minz === undefined || v.z < minz) {
        minz = v.z;
      }

      if (maxz === undefined || v.z > maxz) {
        maxz = v.z;
      }
    }

    min.set(minx, miny, minz);
    max.set(maxx, maxy, maxz);
  }
  /**
   * Get approximate convex volume
   * @method volume
   * @return {Number}
   */
  ;

  _proto.volume = function volume() {
    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
  }
  /**
   * Get an average of all the vertices positions
   * @method getAveragePointLocal
   * @param  {Vec3} target
   * @return {Vec3}
   */
  ;

  _proto.getAveragePointLocal = function getAveragePointLocal(target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var verts = this.vertices;

    for (var i = 0; i < verts.length; i++) {
      target.vadd(verts[i], target);
    }

    target.scale(1 / verts.length, target);
    return target;
  }
  /**
   * Transform all local points. Will change the .vertices
   * @method transformAllPoints
   * @param  {Vec3} offset
   * @param  {Quaternion} quat
   */
  ;

  _proto.transformAllPoints = function transformAllPoints(offset, quat) {
    var n = this.vertices.length;
    var verts = this.vertices; // Apply rotation

    if (quat) {
      // Rotate vertices
      for (var i = 0; i < n; i++) {
        var v = verts[i];
        quat.vmult(v, v);
      } // Rotate face normals


      for (var _i6 = 0; _i6 < this.faceNormals.length; _i6++) {
        var _v = this.faceNormals[_i6];
        quat.vmult(_v, _v);
      }
      /*
            // Rotate edges
            for(let i=0; i<this.uniqueEdges.length; i++){
                const v = this.uniqueEdges[i];
                quat.vmult(v,v);
            }*/

    } // Apply offset


    if (offset) {
      for (var _i7 = 0; _i7 < n; _i7++) {
        var _v2 = verts[_i7];

        _v2.vadd(offset, _v2);
      }
    }
  }
  /**
   * Checks whether p is inside the polyhedra. Must be in local coords.
   * The point lies outside of the convex hull of the other points if and only if the direction
   * of all the vectors from it to those other points are on less than one half of a sphere around it.
   * @method pointIsInside
   * @param  {Vec3} p      A point given in local coordinates
   * @return {Boolean}
   */
  ;

  _proto.pointIsInside = function pointIsInside(p) {
    var verts = this.vertices;
    var faces = this.faces;
    var normals = this.faceNormals;
    var pointInside = new Vec3();
    this.getAveragePointLocal(pointInside);

    for (var i = 0; i < this.faces.length; i++) {
      var n = normals[i];
      var v = verts[faces[i][0]]; // We only need one point in the face
      // This dot product determines which side of the edge the point is

      var vToP = new Vec3();
      p.vsub(v, vToP);
      var r1 = n.dot(vToP);
      var vToPointInside = new Vec3();
      pointInside.vsub(v, vToPointInside);
      var r2 = n.dot(vToPointInside);

      if (r1 < 0 && r2 > 0 || r1 > 0 && r2 < 0) {
        return false; // Encountered some other sign. Exit.
      }
    } // If we got here, all dot products were of the same sign.


    return  -1;
  };

  return ConvexPolyhedron;
}(Shape);
/**
 * Get face normal given 3 vertices
 * @static
 * @method computeNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */

ConvexPolyhedron.computeNormal = function (va, vb, vc, target) {
  var cb = new Vec3();
  var ab = new Vec3();
  vb.vsub(va, ab);
  vc.vsub(vb, cb);
  cb.cross(ab, target);

  if (!target.isZero()) {
    target.normalize();
  }
};

var maxminA = [];
var maxminB = [];
/**
 * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis.
 * Results are saved in the array maxmin.
 * @static
 * @method project
 * @param {ConvexPolyhedron} hull
 * @param {Vec3} axis
 * @param {Vec3} pos
 * @param {Quaternion} quat
 * @param {array} result result[0] and result[1] will be set to maximum and minimum, respectively.
 */

ConvexPolyhedron.project = function (shape, axis, pos, quat, result) {
  var n = shape.vertices.length;
  var localAxis = new Vec3();
  var max = 0;
  var min = 0;
  var localOrigin = new Vec3();
  var vs = shape.vertices;
  localOrigin.setZero(); // Transform the axis to local

  Transform.vectorToLocalFrame(pos, quat, axis, localAxis);
  Transform.pointToLocalFrame(pos, quat, localOrigin, localOrigin);
  var add = localOrigin.dot(localAxis);
  min = max = vs[0].dot(localAxis);

  for (var i = 1; i < n; i++) {
    var val = vs[i].dot(localAxis);

    if (val > max) {
      max = val;
    }

    if (val < min) {
      min = val;
    }
  }

  min -= add;
  max -= add;

  if (min > max) {
    // Inconsistent - swap
    var temp = min;
    min = max;
    max = temp;
  } // Output


  result[0] = max;
  result[1] = min;
};

/**
 * A 3d box shape.
 * @class Box
 * @constructor
 * @param {Vec3} halfExtents
 * @author schteppe
 * @extends Shape
 */
var Box = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Box, _Shape);

  // Used by the contact generator to make contacts with other convex polyhedra for example.
  function Box(halfExtents) {
    var _this;

    _this = _Shape.call(this, {
      type: Shape.types.BOX
    }) || this;
    _this.halfExtents = halfExtents;
    _this.convexPolyhedronRepresentation = null;

    _this.updateConvexPolyhedronRepresentation();

    _this.updateBoundingSphereRadius();

    return _this;
  }
  /**
   * Updates the local convex polyhedron representation used for some collisions.
   * @method updateConvexPolyhedronRepresentation
   */


  var _proto = Box.prototype;

  _proto.updateConvexPolyhedronRepresentation = function updateConvexPolyhedronRepresentation() {
    var sx = this.halfExtents.x;
    var sy = this.halfExtents.y;
    var sz = this.halfExtents.z;
    var V = Vec3;
    var vertices = [new V(-sx, -sy, -sz), new V(sx, -sy, -sz), new V(sx, sy, -sz), new V(-sx, sy, -sz), new V(-sx, -sy, sz), new V(sx, -sy, sz), new V(sx, sy, sz), new V(-sx, sy, sz)];
    var faces = [[3, 2, 1, 0], // -z
    [4, 5, 6, 7], // +z
    [5, 4, 0, 1], // -y
    [2, 3, 7, 6], // +y
    [0, 4, 7, 3], // -x
    [1, 2, 6, 5] // +x
    ];
    var axes = [new V(0, 0, 1), new V(0, 1, 0), new V(1, 0, 0)];
    var h = new ConvexPolyhedron({
      vertices: vertices,
      faces: faces,
      axes: axes
    });
    this.convexPolyhedronRepresentation = h;
    h.material = this.material;
  }
  /**
   * @method calculateLocalInertia
   * @param  {Number} mass
   * @param  {Vec3} target
   * @return {Vec3}
   */
  ;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    Box.calculateInertia(this.halfExtents, mass, target);
    return target;
  }
  /**
   * Get the box 6 side normals
   * @method getSideNormals
   * @param {array}      sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
   * @param {Quaternion} quat             Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
   * @return {array}
   */
  ;

  _proto.getSideNormals = function getSideNormals(sixTargetVectors, quat) {
    var sides = sixTargetVectors;
    var ex = this.halfExtents;
    sides[0].set(ex.x, 0, 0);
    sides[1].set(0, ex.y, 0);
    sides[2].set(0, 0, ex.z);
    sides[3].set(-ex.x, 0, 0);
    sides[4].set(0, -ex.y, 0);
    sides[5].set(0, 0, -ex.z);

    if (quat !== undefined) {
      for (var i = 0; i !== sides.length; i++) {
        quat.vmult(sides[i], sides[i]);
      }
    }

    return sides;
  };

  _proto.volume = function volume() {
    return 8.0 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
  };

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    this.boundingSphereRadius = this.halfExtents.length();
  };

  _proto.forEachWorldCorner = function forEachWorldCorner(pos, quat, callback) {
    var e = this.halfExtents;
    var corners = [[e.x, e.y, e.z], [-e.x, e.y, e.z], [-e.x, -e.y, e.z], [-e.x, -e.y, -e.z], [e.x, -e.y, -e.z], [e.x, e.y, -e.z], [-e.x, e.y, -e.z], [e.x, -e.y, e.z]];

    for (var i = 0; i < corners.length; i++) {
      worldCornerTempPos.set(corners[i][0], corners[i][1], corners[i][2]);
      quat.vmult(worldCornerTempPos, worldCornerTempPos);
      pos.vadd(worldCornerTempPos, worldCornerTempPos);
      callback(worldCornerTempPos.x, worldCornerTempPos.y, worldCornerTempPos.z);
    }
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    var e = this.halfExtents;
    worldCornersTemp[0].set(e.x, e.y, e.z);
    worldCornersTemp[1].set(-e.x, e.y, e.z);
    worldCornersTemp[2].set(-e.x, -e.y, e.z);
    worldCornersTemp[3].set(-e.x, -e.y, -e.z);
    worldCornersTemp[4].set(e.x, -e.y, -e.z);
    worldCornersTemp[5].set(e.x, e.y, -e.z);
    worldCornersTemp[6].set(-e.x, e.y, -e.z);
    worldCornersTemp[7].set(e.x, -e.y, e.z);
    var wc = worldCornersTemp[0];
    quat.vmult(wc, wc);
    pos.vadd(wc, wc);
    max.copy(wc);
    min.copy(wc);

    for (var i = 1; i < 8; i++) {
      var _wc = worldCornersTemp[i];
      quat.vmult(_wc, _wc);
      pos.vadd(_wc, _wc);
      var _x = _wc.x;
      var _y = _wc.y;
      var _z = _wc.z;

      if (_x > max.x) {
        max.x = _x;
      }

      if (_y > max.y) {
        max.y = _y;
      }

      if (_z > max.z) {
        max.z = _z;
      }

      if (_x < min.x) {
        min.x = _x;
      }

      if (_y < min.y) {
        min.y = _y;
      }

      if (_z < min.z) {
        min.z = _z;
      }
    } // Get each axis max
    // min.set(Infinity,Infinity,Infinity);
    // max.set(-Infinity,-Infinity,-Infinity);
    // this.forEachWorldCorner(pos,quat,function(x,y,z){
    //     if(x > max.x){
    //         max.x = x;
    //     }
    //     if(y > max.y){
    //         max.y = y;
    //     }
    //     if(z > max.z){
    //         max.z = z;
    //     }
    //     if(x < min.x){
    //         min.x = x;
    //     }
    //     if(y < min.y){
    //         min.y = y;
    //     }
    //     if(z < min.z){
    //         min.z = z;
    //     }
    // });

  };

  return Box;
}(Shape);

Box.calculateInertia = function (halfExtents, mass, target) {
  var e = halfExtents;
  target.x = 1.0 / 12.0 * mass * (2 * e.y * 2 * e.y + 2 * e.z * 2 * e.z);
  target.y = 1.0 / 12.0 * mass * (2 * e.x * 2 * e.x + 2 * e.z * 2 * e.z);
  target.z = 1.0 / 12.0 * mass * (2 * e.y * 2 * e.y + 2 * e.x * 2 * e.x);
};

var worldCornerTempPos = new Vec3();
var worldCornersTemp = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];

var BODY_TYPES = {
  DYNAMIC: 1,
  STATIC: 2,
  KINEMATIC: 4
};
var BODY_SLEEP_STATES = {
  AWAKE: 0,
  SLEEPY: 1,
  SLEEPING: 2
};

/**
 * Base class for all body types.
 * @class Body
 * @constructor
 * @extends EventTarget
 * @param {object} [options]
 * @param {Vec3} [options.position]
 * @param {Vec3} [options.velocity]
 * @param {Vec3} [options.angularVelocity]
 * @param {Quaternion} [options.quaternion]
 * @param {number} [options.mass]
 * @param {Material} [options.material]
 * @param {number} [options.type]
 * @param {number} [options.linearDamping=0.01]
 * @param {number} [options.angularDamping=0.01]
 * @param {boolean} [options.allowSleep=true]
 * @param {number} [options.sleepSpeedLimit=0.1]
 * @param {number} [options.sleepTimeLimit=1]
 * @param {number} [options.collisionFilterGroup=1]
 * @param {number} [options.collisionFilterMask=-1]
 * @param {boolean} [options.fixedRotation=false]
 * @param {Vec3} [options.linearFactor]
 * @param {Vec3} [options.angularFactor]
 * @param {Shape} [options.shape]
 * @example
 *     const body = new Body({
 *         mass: 1
 *     });
 *     const shape = new Sphere(1);
 *     body.addShape(shape);
 *     world.addBody(body);
 */
var Body = /*#__PURE__*/function (_EventTarget) {
  _inheritsLoose(Body, _EventTarget);

  // Position of body in World.bodies. Updated by World and used in ArrayCollisionMatrix.
  // Reference to the world the body is living in.
  // Callback function that is used BEFORE stepping the system. Use it to apply forces, for example. Inside the function, "this" will refer to this Body object. Deprecated - use World events instead.
  // Callback function that is used AFTER stepping the system. Inside the function, "this" will refer to this Body object. Deprecated - use World events instead.
  // Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled - i.e. "collide" events will be raised, but forces will not be altered.
  // World space position of the body.
  // Interpolated position of the body.
  // Initial position of the body.
  // World space velocity of the body.
  // Linear force on the body in world space.
  // One of: Body.DYNAMIC, Body.STATIC and Body.KINEMATIC.
  // If true, the body will automatically fall to sleep.
  // Current sleep state.
  // If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
  // If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
  // World space rotational force on the body, around center of mass.
  // World space orientation of the body.
  // Interpolated orientation of the body.
  // Angular velocity of the body, in world space. Think of the angular velocity as a vector, which the body rotates around. The length of this vector determines how fast (in radians per second) the body rotates.
  // Position of each Shape in the body, given in local Body space.
  // Orientation of each Shape, given in local Body space.
  // Set to true if you don't want the body to rotate. Make sure to run .updateMassProperties() after changing this.
  // Use this property to limit the motion along any world axis. (1,1,1) will allow motion along all axes while (0,0,0) allows none.
  // Use this property to limit the rotational motion along any world axis. (1,1,1) will allow rotation along all axes while (0,0,0) allows none.
  // World space bounding box of the body and its shapes.
  // Indicates if the AABB needs to be updated before use.
  // Total bounding radius of the Body including its shapes, relative to body.position.
  function Body(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _EventTarget.call(this) || this;
    _this.id = Body.idCounter++;
    _this.index = -1;
    _this.world = null;
    _this.preStep = null;
    _this.postStep = null;
    _this.vlambda = new Vec3();
    _this.collisionFilterGroup = typeof options.collisionFilterGroup === 'number' ? options.collisionFilterGroup : 1;
    _this.collisionFilterMask = typeof options.collisionFilterMask === 'number' ? options.collisionFilterMask : -1;
    _this.collisionResponse = typeof options.collisionResponse === 'boolean' ? options.collisionResponse : true;
    _this.position = new Vec3();
    _this.previousPosition = new Vec3();
    _this.interpolatedPosition = new Vec3();
    _this.initPosition = new Vec3();

    if (options.position) {
      _this.position.copy(options.position);

      _this.previousPosition.copy(options.position);

      _this.interpolatedPosition.copy(options.position);

      _this.initPosition.copy(options.position);
    }

    _this.velocity = new Vec3();

    if (options.velocity) {
      _this.velocity.copy(options.velocity);
    }

    _this.initVelocity = new Vec3();
    _this.force = new Vec3();
    var mass = typeof options.mass === 'number' ? options.mass : 0;
    _this.mass = mass;
    _this.invMass = mass > 0 ? 1.0 / mass : 0;
    _this.material = options.material || null;
    _this.linearDamping = typeof options.linearDamping === 'number' ? options.linearDamping : 0.01;
    _this.type = mass <= 0.0 ? Body.STATIC : Body.DYNAMIC;

    if (typeof options.type === typeof Body.STATIC) {
      _this.type = options.type;
    }

    _this.allowSleep = typeof options.allowSleep !== 'undefined' ? options.allowSleep : true;
    _this.sleepState = 0;
    _this.sleepSpeedLimit = typeof options.sleepSpeedLimit !== 'undefined' ? options.sleepSpeedLimit : 0.1;
    _this.sleepTimeLimit = typeof options.sleepTimeLimit !== 'undefined' ? options.sleepTimeLimit : 1;
    _this.timeLastSleepy = 0;
    _this.wakeUpAfterNarrowphase = false;
    _this.torque = new Vec3();
    _this.quaternion = new Quaternion();
    _this.initQuaternion = new Quaternion();
    _this.previousQuaternion = new Quaternion();
    _this.interpolatedQuaternion = new Quaternion();

    if (options.quaternion) {
      _this.quaternion.copy(options.quaternion);

      _this.initQuaternion.copy(options.quaternion);

      _this.previousQuaternion.copy(options.quaternion);

      _this.interpolatedQuaternion.copy(options.quaternion);
    }

    _this.angularVelocity = new Vec3();

    if (options.angularVelocity) {
      _this.angularVelocity.copy(options.angularVelocity);
    }

    _this.initAngularVelocity = new Vec3();
    _this.shapes = [];
    _this.shapeOffsets = [];
    _this.shapeOrientations = [];
    _this.inertia = new Vec3();
    _this.invInertia = new Vec3();
    _this.invInertiaWorld = new Mat3();
    _this.invMassSolve = 0;
    _this.invInertiaSolve = new Vec3();
    _this.invInertiaWorldSolve = new Mat3();
    _this.fixedRotation = typeof options.fixedRotation !== 'undefined' ? options.fixedRotation : false;
    _this.angularDamping = typeof options.angularDamping !== 'undefined' ? options.angularDamping : 0.01;
    _this.linearFactor = new Vec3(1, 1, 1);

    if (options.linearFactor) {
      _this.linearFactor.copy(options.linearFactor);
    }

    _this.angularFactor = new Vec3(1, 1, 1);

    if (options.angularFactor) {
      _this.angularFactor.copy(options.angularFactor);
    }

    _this.aabb = new AABB();
    _this.aabbNeedsUpdate = true;
    _this.boundingRadius = 0;
    _this.wlambda = new Vec3();

    if (options.shape) {
      _this.addShape(options.shape);
    }

    _this.updateMassProperties();

    return _this;
  }
  /**
   * Wake the body up.
   * @method wakeUp
   */


  var _proto = Body.prototype;

  _proto.wakeUp = function wakeUp() {
    var prevState = this.sleepState;
    this.sleepState = 0;
    this.wakeUpAfterNarrowphase = false;

    if (prevState === Body.SLEEPING) {
      this.dispatchEvent(Body.wakeupEvent);
    }
  }
  /**
   * Force body sleep
   * @method sleep
   */
  ;

  _proto.sleep = function sleep() {
    this.sleepState = Body.SLEEPING;
    this.velocity.set(0, 0, 0);
    this.angularVelocity.set(0, 0, 0);
    this.wakeUpAfterNarrowphase = false;
  }
  /**
   * Called every timestep to update internal sleep timer and change sleep state if needed.
   * @method sleepTick
   * @param {Number} time The world time in seconds
   */
  ;

  _proto.sleepTick = function sleepTick(time) {
    if (this.allowSleep) {
      var sleepState = this.sleepState;
      var speedSquared = this.velocity.lengthSquared() + this.angularVelocity.lengthSquared();
      var speedLimitSquared = Math.pow(this.sleepSpeedLimit, 2);

      if (sleepState === Body.AWAKE && speedSquared < speedLimitSquared) {
        this.sleepState = Body.SLEEPY; // Sleepy

        this.timeLastSleepy = time;
        this.dispatchEvent(Body.sleepyEvent);
      } else if (sleepState === Body.SLEEPY && speedSquared > speedLimitSquared) {
        this.wakeUp(); // Wake up
      } else if (sleepState === Body.SLEEPY && time - this.timeLastSleepy > this.sleepTimeLimit) {
        this.sleep(); // Sleeping

        this.dispatchEvent(Body.sleepEvent);
      }
    }
  }
  /**
   * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
   * @method updateSolveMassProperties
   */
  ;

  _proto.updateSolveMassProperties = function updateSolveMassProperties() {
    if (this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC) {
      this.invMassSolve = 0;
      this.invInertiaSolve.setZero();
      this.invInertiaWorldSolve.setZero();
    } else {
      this.invMassSolve = this.invMass;
      this.invInertiaSolve.copy(this.invInertia);
      this.invInertiaWorldSolve.copy(this.invInertiaWorld);
    }
  }
  /**
   * Convert a world point to local body frame.
   * @method pointToLocalFrame
   * @param  {Vec3} worldPoint
   * @param  {Vec3} result
   * @return {Vec3}
   */
  ;

  _proto.pointToLocalFrame = function pointToLocalFrame(worldPoint, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    worldPoint.vsub(this.position, result);
    this.quaternion.conjugate().vmult(result, result);
    return result;
  }
  /**
   * Convert a world vector to local body frame.
   * @method vectorToLocalFrame
   * @param  {Vec3} worldPoint
   * @param  {Vec3} result
   * @return {Vec3}
   */
  ;

  _proto.vectorToLocalFrame = function vectorToLocalFrame(worldVector, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    this.quaternion.conjugate().vmult(worldVector, result);
    return result;
  }
  /**
   * Convert a local body point to world frame.
   * @method pointToWorldFrame
   * @param  {Vec3} localPoint
   * @param  {Vec3} result
   * @return {Vec3}
   */
  ;

  _proto.pointToWorldFrame = function pointToWorldFrame(localPoint, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    this.quaternion.vmult(localPoint, result);
    result.vadd(this.position, result);
    return result;
  }
  /**
   * Convert a local body point to world frame.
   * @method vectorToWorldFrame
   * @param  {Vec3} localVector
   * @param  {Vec3} result
   * @return {Vec3}
   */
  ;

  _proto.vectorToWorldFrame = function vectorToWorldFrame(localVector, result) {
    if (result === void 0) {
      result = new Vec3();
    }

    this.quaternion.vmult(localVector, result);
    return result;
  }
  /**
   * Add a shape to the body with a local offset and orientation.
   * @method addShape
   * @param {Shape} shape
   * @param {Vec3} [_offset]
   * @param {Quaternion} [_orientation]
   * @return {Body} The body object, for chainability.
   */
  ;

  _proto.addShape = function addShape(shape, _offset, _orientation) {
    var offset = new Vec3();
    var orientation = new Quaternion();

    if (_offset) {
      offset.copy(_offset);
    }

    if (_orientation) {
      orientation.copy(_orientation);
    }

    this.shapes.push(shape);
    this.shapeOffsets.push(offset);
    this.shapeOrientations.push(orientation);
    this.updateMassProperties();
    this.updateBoundingRadius();
    this.aabbNeedsUpdate = true;
    shape.body = this;
    return this;
  }
  /**
   * Update the bounding radius of the body. Should be done if any of the shapes are changed.
   * @method updateBoundingRadius
   */
  ;

  _proto.updateBoundingRadius = function updateBoundingRadius() {
    var shapes = this.shapes;
    var shapeOffsets = this.shapeOffsets;
    var N = shapes.length;
    var radius = 0;

    for (var i = 0; i !== N; i++) {
      var shape = shapes[i];
      shape.updateBoundingSphereRadius();
      var offset = shapeOffsets[i].length();
      var r = shape.boundingSphereRadius;

      if (offset + r > radius) {
        radius = offset + r;
      }
    }

    this.boundingRadius = radius;
  }
  /**
   * Updates the .aabb
   * @method computeAABB
   * @todo rename to updateAABB()
   */
  ;

  _proto.computeAABB = function computeAABB() {
    var shapes = this.shapes;
    var shapeOffsets = this.shapeOffsets;
    var shapeOrientations = this.shapeOrientations;
    var N = shapes.length;
    var offset = tmpVec;
    var orientation = tmpQuat$1;
    var bodyQuat = this.quaternion;
    var aabb = this.aabb;
    var shapeAABB = computeAABB_shapeAABB;

    for (var i = 0; i !== N; i++) {
      var shape = shapes[i]; // Get shape world position

      bodyQuat.vmult(shapeOffsets[i], offset);
      offset.vadd(this.position, offset); // Get shape world quaternion

      bodyQuat.mult(shapeOrientations[i], orientation); // Get shape AABB

      shape.calculateWorldAABB(offset, orientation, shapeAABB.lowerBound, shapeAABB.upperBound);

      if (i === 0) {
        aabb.copy(shapeAABB);
      } else {
        aabb.extend(shapeAABB);
      }
    }

    this.aabbNeedsUpdate = false;
  }
  /**
   * Update .inertiaWorld and .invInertiaWorld
   * @method updateInertiaWorld
   */
  ;

  _proto.updateInertiaWorld = function updateInertiaWorld(force) {
    var I = this.invInertia;

    if (I.x === I.y && I.y === I.z && !force) ; else {
      var m1 = uiw_m1;
      var m2 = uiw_m2;
      m1.setRotationFromQuaternion(this.quaternion);
      m1.transpose(m2);
      m1.scale(I, m1);
      m1.mmult(m2, this.invInertiaWorld);
    }
  };

  _proto.applyForce = function applyForce(force, relativePoint) {
    if (this.type !== Body.DYNAMIC) {
      // Needed?
      return;
    } // Compute produced rotational force


    var rotForce = Body_applyForce_rotForce;
    relativePoint.cross(force, rotForce); // Add linear force

    this.force.vadd(force, this.force); // Add rotational force

    this.torque.vadd(rotForce, this.torque);
  };

  _proto.applyLocalForce = function applyLocalForce(localForce, localPoint) {
    if (this.type !== Body.DYNAMIC) {
      return;
    }

    var worldForce = Body_applyLocalForce_worldForce;
    var relativePointWorld = Body_applyLocalForce_relativePointWorld; // Transform the force vector to world space

    this.vectorToWorldFrame(localForce, worldForce);
    this.vectorToWorldFrame(localPoint, relativePointWorld);
    this.applyForce(worldForce, relativePointWorld);
  };

  _proto.applyImpulse = function applyImpulse(impulse, relativePoint) {
    if (this.type !== Body.DYNAMIC) {
      return;
    } // Compute point position relative to the body center


    var r = relativePoint; // Compute produced central impulse velocity

    var velo = Body_applyImpulse_velo;
    velo.copy(impulse);
    velo.scale(this.invMass, velo); // Add linear impulse

    this.velocity.vadd(velo, this.velocity); // Compute produced rotational impulse velocity

    var rotVelo = Body_applyImpulse_rotVelo;
    r.cross(impulse, rotVelo);
    /*
     rotVelo.x *= this.invInertia.x;
     rotVelo.y *= this.invInertia.y;
     rotVelo.z *= this.invInertia.z;
     */

    this.invInertiaWorld.vmult(rotVelo, rotVelo); // Add rotational Impulse

    this.angularVelocity.vadd(rotVelo, this.angularVelocity);
  };

  _proto.applyLocalImpulse = function applyLocalImpulse(localImpulse, localPoint) {
    if (this.type !== Body.DYNAMIC) {
      return;
    }

    var worldImpulse = Body_applyLocalImpulse_worldImpulse;
    var relativePointWorld = Body_applyLocalImpulse_relativePoint; // Transform the force vector to world space

    this.vectorToWorldFrame(localImpulse, worldImpulse);
    this.vectorToWorldFrame(localPoint, relativePointWorld);
    this.applyImpulse(worldImpulse, relativePointWorld);
  }
  /**
   * Should be called whenever you change the body shape or mass.
   * @method updateMassProperties
   */
  ;

  _proto.updateMassProperties = function updateMassProperties() {
    var halfExtents = Body_updateMassProperties_halfExtents;
    this.invMass = this.mass > 0 ? 1.0 / this.mass : 0;
    var I = this.inertia;
    var fixed = this.fixedRotation; // Approximate with AABB box

    this.computeAABB();
    halfExtents.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2);
    Box.calculateInertia(halfExtents, this.mass, I);
    this.invInertia.set(I.x > 0 && !fixed ? 1.0 / I.x : 0, I.y > 0 && !fixed ? 1.0 / I.y : 0, I.z > 0 && !fixed ? 1.0 / I.z : 0);
    this.updateInertiaWorld(true);
  }
  /**
   * Get world velocity of a point in the body.
   * @method getVelocityAtWorldPoint
   * @param  {Vec3} worldPoint
   * @param  {Vec3} result
   * @return {Vec3} The result vector.
   */
  ;

  _proto.getVelocityAtWorldPoint = function getVelocityAtWorldPoint(worldPoint, result) {
    var r = new Vec3();
    worldPoint.vsub(this.position, r);
    this.angularVelocity.cross(r, result);
    this.velocity.vadd(result, result);
    return result;
  }
  /**
   * Move the body forward in time.
   * @param {number} dt Time step
   * @param {boolean} quatNormalize Set to true to normalize the body quaternion
   * @param {boolean} quatNormalizeFast If the quaternion should be normalized using "fast" quaternion normalization
   */
  ;

  _proto.integrate = function integrate(dt, quatNormalize, quatNormalizeFast) {
    // Save previous position
    this.previousPosition.copy(this.position);
    this.previousQuaternion.copy(this.quaternion);

    if (!(this.type === Body.DYNAMIC || this.type === Body.KINEMATIC) || this.sleepState === Body.SLEEPING) {
      // Only for dynamic
      return;
    }

    var velo = this.velocity;
    var angularVelo = this.angularVelocity;
    var pos = this.position;
    var force = this.force;
    var torque = this.torque;
    var quat = this.quaternion;
    var invMass = this.invMass;
    var invInertia = this.invInertiaWorld;
    var linearFactor = this.linearFactor;
    var iMdt = invMass * dt;
    velo.x += force.x * iMdt * linearFactor.x;
    velo.y += force.y * iMdt * linearFactor.y;
    velo.z += force.z * iMdt * linearFactor.z;
    var e = invInertia.elements;
    var angularFactor = this.angularFactor;
    var tx = torque.x * angularFactor.x;
    var ty = torque.y * angularFactor.y;
    var tz = torque.z * angularFactor.z;
    angularVelo.x += dt * (e[0] * tx + e[1] * ty + e[2] * tz);
    angularVelo.y += dt * (e[3] * tx + e[4] * ty + e[5] * tz);
    angularVelo.z += dt * (e[6] * tx + e[7] * ty + e[8] * tz); // Use new velocity  - leap frog

    pos.x += velo.x * dt;
    pos.y += velo.y * dt;
    pos.z += velo.z * dt;
    quat.integrate(this.angularVelocity, dt, this.angularFactor, quat);

    if (quatNormalize) {
      if (quatNormalizeFast) {
        quat.normalizeFast();
      } else {
        quat.normalize();
      }
    }

    this.aabbNeedsUpdate = true; // Update world inertia

    this.updateInertiaWorld();
  };

  return Body;
}(EventTarget);
/**
 * Dispatched after two bodies collide. This event is dispatched on each
 * of the two bodies involved in the collision.
 * @event collide
 * @param {Body} body The body that was involved in the collision.
 * @param {ContactEquation} contact The details of the collision.
 */

Body.COLLIDE_EVENT_NAME = 'collide';
/**
 * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
 * @static
 * @property DYNAMIC
 * @type {Number}
 */

Body.DYNAMIC = 1;
/**
 * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
 * @static
 * @property STATIC
 * @type {Number}
 */

Body.STATIC = 2;
/**
 * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
 * @static
 * @property KINEMATIC
 * @type {Number}
 */

Body.KINEMATIC = 4;
/**
 * @static
 * @property AWAKE
 * @type {number}
 */

Body.AWAKE = BODY_SLEEP_STATES.AWAKE;
Body.SLEEPY = BODY_SLEEP_STATES.SLEEPY;
Body.SLEEPING = BODY_SLEEP_STATES.SLEEPING;
Body.idCounter = 0;
/**
 * Dispatched after a sleeping body has woken up.
 * @event wakeup
 */

Body.wakeupEvent = {
  type: 'wakeup'
};
/**
 * Dispatched after a body has gone in to the sleepy state.
 * @event sleepy
 */

Body.sleepyEvent = {
  type: 'sleepy'
};
/**
 * Dispatched after a body has fallen asleep.
 * @event sleep
 */

Body.sleepEvent = {
  type: 'sleep'
};
var tmpVec = new Vec3();
var tmpQuat$1 = new Quaternion();
var computeAABB_shapeAABB = new AABB();
var uiw_m1 = new Mat3();
var uiw_m2 = new Mat3();
var uiw_m3 = new Mat3();
/**
 * Apply force to a world point. This could for example be a point on the Body surface. Applying force this way will add to Body.force and Body.torque.
 * @method applyForce
 * @param  {Vec3} force The amount of force to add.
 * @param  {Vec3} relativePoint A point relative to the center of mass to apply the force on.
 */

var Body_applyForce_rotForce = new Vec3();
/**
 * Apply force to a local point in the body.
 * @method applyLocalForce
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */

var Body_applyLocalForce_worldForce = new Vec3();
var Body_applyLocalForce_relativePointWorld = new Vec3();
/**
 * Apply impulse to a world point. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
 * @method applyImpulse
 * @param  {Vec3} impulse The amount of impulse to add.
 * @param  {Vec3} relativePoint A point relative to the center of mass to apply the force on.
 */

var Body_applyImpulse_velo = new Vec3();
var Body_applyImpulse_rotVelo = new Vec3();
/**
 * Apply locally-defined impulse to a local point in the body.
 * @method applyLocalImpulse
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */

var Body_applyLocalImpulse_worldImpulse = new Vec3();
var Body_applyLocalImpulse_relativePoint = new Vec3();
var Body_updateMassProperties_halfExtents = new Vec3();

/**
 * Base class for broadphase implementations
 * @class Broadphase
 * @constructor
 * @author schteppe
 */
var Broadphase = /*#__PURE__*/function () {
  // The world to search for collisions in.
  // If set to true, the broadphase uses bounding boxes for intersection test, else it uses bounding spheres.
  // Set to true if the objects in the world moved.
  function Broadphase() {
    this.world = null;
    this.useBoundingBoxes = false;
    this.dirty = true;
  }
  /**
   * Get the collision pairs from the world
   * @method collisionPairs
   * @param {World} world The world to search in
   * @param {Array} p1 Empty array to be filled with body objects
   * @param {Array} p2 Empty array to be filled with body objects
   */


  var _proto = Broadphase.prototype;

  _proto.collisionPairs = function collisionPairs(world, p1, p2) {
    throw new Error('collisionPairs not implemented for this BroadPhase class!');
  }
  /**
   * Check if a body pair needs to be intersection tested at all.
   * @method needBroadphaseCollision
   * @param {Body} bodyA
   * @param {Body} bodyB
   * @return {bool}
   */
  ;

  _proto.needBroadphaseCollision = function needBroadphaseCollision(bodyA, bodyB) {
    // Check collision filter masks
    if ((bodyA.collisionFilterGroup & bodyB.collisionFilterMask) === 0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask) === 0) {
      return false;
    } // Check types


    if (((bodyA.type & Body.STATIC) !== 0 || bodyA.sleepState === Body.SLEEPING) && ((bodyB.type & Body.STATIC) !== 0 || bodyB.sleepState === Body.SLEEPING)) {
      // Both bodies are static or sleeping. Skip.
      return false;
    }

    return true;
  }
  /**
   * Check if the bounding volumes of two bodies intersect.
   * @method intersectionTest
   * @param {Body} bodyA
   * @param {Body} bodyB
   * @param {array} pairs1
   * @param {array} pairs2
   */
  ;

  _proto.intersectionTest = function intersectionTest(bodyA, bodyB, pairs1, pairs2) {
    if (this.useBoundingBoxes) {
      this.doBoundingBoxBroadphase(bodyA, bodyB, pairs1, pairs2);
    } else {
      this.doBoundingSphereBroadphase(bodyA, bodyB, pairs1, pairs2);
    }
  };

  _proto.doBoundingSphereBroadphase = function doBoundingSphereBroadphase(bodyA, bodyB, pairs1, pairs2) {
    var r = Broadphase_collisionPairs_r;
    bodyB.position.vsub(bodyA.position, r);
    var boundingRadiusSum2 = Math.pow(bodyA.boundingRadius + bodyB.boundingRadius, 2);
    var norm2 = r.lengthSquared();

    if (norm2 < boundingRadiusSum2) {
      pairs1.push(bodyA);
      pairs2.push(bodyB);
    }
  }
  /**
   * Check if the bounding boxes of two bodies are intersecting.
   * @method doBoundingBoxBroadphase
   * @param {Body} bodyA
   * @param {Body} bodyB
   * @param {Array} pairs1
   * @param {Array} pairs2
   */
  ;

  _proto.doBoundingBoxBroadphase = function doBoundingBoxBroadphase(bodyA, bodyB, pairs1, pairs2) {
    if (bodyA.aabbNeedsUpdate) {
      bodyA.computeAABB();
    }

    if (bodyB.aabbNeedsUpdate) {
      bodyB.computeAABB();
    } // Check AABB / AABB


    if (bodyA.aabb.overlaps(bodyB.aabb)) {
      pairs1.push(bodyA);
      pairs2.push(bodyB);
    }
  };

  _proto.makePairsUnique = function makePairsUnique(pairs1, pairs2) {
    var t = Broadphase_makePairsUnique_temp;
    var p1 = Broadphase_makePairsUnique_p1;
    var p2 = Broadphase_makePairsUnique_p2;
    var N = pairs1.length;

    for (var i = 0; i !== N; i++) {
      p1[i] = pairs1[i];
      p2[i] = pairs2[i];
    }

    pairs1.length = 0;
    pairs2.length = 0;

    for (var _i = 0; _i !== N; _i++) {
      var id1 = p1[_i].id;
      var id2 = p2[_i].id;
      var key = id1 < id2 ? id1 + "," + id2 : id2 + "," + id1;
      t[key] = _i;
      t.keys.push(key);
    }

    for (var _i2 = 0; _i2 !== t.keys.length; _i2++) {
      var _key = t.keys.pop();

      var pairIndex = t[_key];
      pairs1.push(p1[pairIndex]);
      pairs2.push(p2[pairIndex]);
      delete t[_key];
    }
  }
  /**
   * To be implemented by subcasses
   * @method setWorld
   * @param {World} world
   */
  ;

  _proto.setWorld = function setWorld(world) {}
  /**
   * Returns all the bodies within the AABB.
   * @method aabbQuery
   * @param  {World} world
   * @param  {AABB} aabb
   * @param  {array} result An array to store resulting bodies in.
   * @return {array}
   */
  ;

  _proto.aabbQuery = function aabbQuery(world, aabb, result) {
    console.warn('.aabbQuery is not implemented in this Broadphase subclass.');
    return [];
  };

  return Broadphase;
}();
/**
 * Check if the bounding spheres of two bodies are intersecting.
 * @method doBoundingSphereBroadphase
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Array} pairs1 bodyA is appended to this array if intersection
 * @param {Array} pairs2 bodyB is appended to this array if intersection
 */

var // Temp objects
Broadphase_collisionPairs_r = new Vec3();
var Broadphase_collisionPairs_normal = new Vec3();
var Broadphase_collisionPairs_quat = new Quaternion();
var Broadphase_collisionPairs_relpos = new Vec3();
/**
 * Removes duplicate pairs from the pair arrays.
 * @method makePairsUnique
 * @param {Array} pairs1
 * @param {Array} pairs2
 */

var Broadphase_makePairsUnique_temp = {
  keys: []
};
var Broadphase_makePairsUnique_p1 = [];
var Broadphase_makePairsUnique_p2 = [];
/**
 * Check if the bounding spheres of two bodies overlap.
 * @method boundingSphereCheck
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {boolean}
 */

var bsc_dist = new Vec3();

Broadphase.boundingSphereCheck = function (bodyA, bodyB) {
  var dist = new Vec3(); // bsc_dist;

  bodyA.position.vsub(bodyB.position, dist);
  var sa = bodyA.shapes[0];
  var sb = bodyB.shapes[0];
  return Math.pow(sa.boundingSphereRadius + sb.boundingSphereRadius, 2) > dist.lengthSquared();
};

/**
 * Axis aligned uniform grid broadphase.
 * @class GridBroadphase
 * @constructor
 * @extends Broadphase
 * @todo Needs support for more than just planes and spheres.
 * @param {Vec3} aabbMin
 * @param {Vec3} aabbMax
 * @param {Number} nx Number of boxes along x
 * @param {Number} ny Number of boxes along y
 * @param {Number} nz Number of boxes along z
 */
var GridBroadphase = /*#__PURE__*/function (_Broadphase) {
  _inheritsLoose(GridBroadphase, _Broadphase);

  function GridBroadphase(aabbMin, aabbMax, nx, ny, nz) {
    var _this;

    if (aabbMin === void 0) {
      aabbMin = new Vec3(100, 100, 100);
    }

    if (aabbMax === void 0) {
      aabbMax = new Vec3(-100, -100, -100);
    }

    if (nx === void 0) {
      nx = 10;
    }

    if (ny === void 0) {
      ny = 10;
    }

    if (nz === void 0) {
      nz = 10;
    }

    _this = _Broadphase.call(this) || this;
    _this.nx = nx;
    _this.ny = ny;
    _this.nz = nz;
    _this.aabbMin = aabbMin;
    _this.aabbMax = aabbMax;
    var nbins = _this.nx * _this.ny * _this.nz;

    if (nbins <= 0) {
      throw "GridBroadphase: Each dimension's n must be >0";
    }

    _this.bins = [];
    _this.binLengths = []; //Rather than continually resizing arrays (thrashing the memory), just record length and allow them to grow

    _this.bins.length = nbins;
    _this.binLengths.length = nbins;

    for (var i = 0; i < nbins; i++) {
      _this.bins[i] = [];
      _this.binLengths[i] = 0;
    }

    return _this;
  }

  var _proto = GridBroadphase.prototype;

  _proto.collisionPairs = function collisionPairs(world, pairs1, pairs2) {
    var N = world.numObjects();
    var bodies = world.bodies;
    var max = this.aabbMax;
    var min = this.aabbMin;
    var nx = this.nx;
    var ny = this.ny;
    var nz = this.nz;
    var xstep = ny * nz;
    var ystep = nz;
    var zstep = 1;
    var xmax = max.x;
    var ymax = max.y;
    var zmax = max.z;
    var xmin = min.x;
    var ymin = min.y;
    var zmin = min.z;
    var xmult = nx / (xmax - xmin);
    var ymult = ny / (ymax - ymin);
    var zmult = nz / (zmax - zmin);
    var binsizeX = (xmax - xmin) / nx;
    var binsizeY = (ymax - ymin) / ny;
    var binsizeZ = (zmax - zmin) / nz;
    var binRadius = Math.sqrt(binsizeX * binsizeX + binsizeY * binsizeY + binsizeZ * binsizeZ) * 0.5;
    var types = Shape.types;
    var SPHERE = types.SPHERE;
    var PLANE = types.PLANE;
    var BOX = types.BOX;
    var COMPOUND = types.COMPOUND;
    var CONVEXPOLYHEDRON = types.CONVEXPOLYHEDRON;
    var bins = this.bins;
    var binLengths = this.binLengths;
    var Nbins = this.bins.length; // Reset bins

    for (var i = 0; i !== Nbins; i++) {
      binLengths[i] = 0;
    }

    var ceil = Math.ceil;

    function addBoxToBins(x0, y0, z0, x1, y1, z1, bi) {
      var xoff0 = (x0 - xmin) * xmult | 0;
      var yoff0 = (y0 - ymin) * ymult | 0;
      var zoff0 = (z0 - zmin) * zmult | 0;
      var xoff1 = ceil((x1 - xmin) * xmult);
      var yoff1 = ceil((y1 - ymin) * ymult);
      var zoff1 = ceil((z1 - zmin) * zmult);

      if (xoff0 < 0) {
        xoff0 = 0;
      } else if (xoff0 >= nx) {
        xoff0 = nx - 1;
      }

      if (yoff0 < 0) {
        yoff0 = 0;
      } else if (yoff0 >= ny) {
        yoff0 = ny - 1;
      }

      if (zoff0 < 0) {
        zoff0 = 0;
      } else if (zoff0 >= nz) {
        zoff0 = nz - 1;
      }

      if (xoff1 < 0) {
        xoff1 = 0;
      } else if (xoff1 >= nx) {
        xoff1 = nx - 1;
      }

      if (yoff1 < 0) {
        yoff1 = 0;
      } else if (yoff1 >= ny) {
        yoff1 = ny - 1;
      }

      if (zoff1 < 0) {
        zoff1 = 0;
      } else if (zoff1 >= nz) {
        zoff1 = nz - 1;
      }

      xoff0 *= xstep;
      yoff0 *= ystep;
      zoff0 *= zstep;
      xoff1 *= xstep;
      yoff1 *= ystep;
      zoff1 *= zstep;

      for (var xoff = xoff0; xoff <= xoff1; xoff += xstep) {
        for (var yoff = yoff0; yoff <= yoff1; yoff += ystep) {
          for (var zoff = zoff0; zoff <= zoff1; zoff += zstep) {
            var idx = xoff + yoff + zoff;
            bins[idx][binLengths[idx]++] = bi;
          }
        }
      }
    } // Put all bodies into the bins


    for (var _i = 0; _i !== N; _i++) {
      var bi = bodies[_i];
      var si = bi.shapes[0];

      switch (si.type) {
        case SPHERE:
          {
            var shape = si; // Put in bin
            // check if overlap with other bins

            var x = bi.position.x;
            var y = bi.position.y;
            var z = bi.position.z;
            var r = shape.radius;
            addBoxToBins(x - r, y - r, z - r, x + r, y + r, z + r, bi);
            break;
          }

        case PLANE:
          {
            var _shape = si;

            if (_shape.worldNormalNeedsUpdate) {
              _shape.computeWorldNormal(bi.quaternion);
            }

            var planeNormal = _shape.worldNormal; //Relative position from origin of plane object to the first bin
            //Incremented as we iterate through the bins

            var xreset = xmin + binsizeX * 0.5 - bi.position.x;
            var yreset = ymin + binsizeY * 0.5 - bi.position.y;
            var zreset = zmin + binsizeZ * 0.5 - bi.position.z;
            var d = GridBroadphase_collisionPairs_d;
            d.set(xreset, yreset, zreset);

            for (var xi = 0, xoff = 0; xi !== nx; xi++, xoff += xstep, d.y = yreset, d.x += binsizeX) {
              for (var yi = 0, yoff = 0; yi !== ny; yi++, yoff += ystep, d.z = zreset, d.y += binsizeY) {
                for (var zi = 0, zoff = 0; zi !== nz; zi++, zoff += zstep, d.z += binsizeZ) {
                  if (d.dot(planeNormal) < binRadius) {
                    var idx = xoff + yoff + zoff;
                    bins[idx][binLengths[idx]++] = bi;
                  }
                }
              }
            }

            break;
          }

        default:
          {
            if (bi.aabbNeedsUpdate) {
              bi.computeAABB();
            }

            addBoxToBins(bi.aabb.lowerBound.x, bi.aabb.lowerBound.y, bi.aabb.lowerBound.z, bi.aabb.upperBound.x, bi.aabb.upperBound.y, bi.aabb.upperBound.z, bi);
            break;
          }
      }
    } // Check each bin


    for (var _i2 = 0; _i2 !== Nbins; _i2++) {
      var binLength = binLengths[_i2]; //Skip bins with no potential collisions

      if (binLength > 1) {
        var bin = bins[_i2]; // Do N^2 broadphase inside

        for (var _xi = 0; _xi !== binLength; _xi++) {
          var _bi = bin[_xi];

          for (var _yi = 0; _yi !== _xi; _yi++) {
            var bj = bin[_yi];

            if (this.needBroadphaseCollision(_bi, bj)) {
              this.intersectionTest(_bi, bj, pairs1, pairs2);
            }
          }
        }
      }
    } //	for (let zi = 0, zoff=0; zi < nz; zi++, zoff+= zstep) {
    //		console.log("layer "+zi);
    //		for (let yi = 0, yoff=0; yi < ny; yi++, yoff += ystep) {
    //			const row = '';
    //			for (let xi = 0, xoff=0; xi < nx; xi++, xoff += xstep) {
    //				const idx = xoff + yoff + zoff;
    //				row += ' ' + binLengths[idx];
    //			}
    //			console.log(row);
    //		}
    //	}


    this.makePairsUnique(pairs1, pairs2);
  };

  return GridBroadphase;
}(Broadphase);
/**
 * Get all the collision pairs in the physics world
 * @method collisionPairs
 * @param {World} world
 * @param {Array} pairs1
 * @param {Array} pairs2
 */

var GridBroadphase_collisionPairs_d = new Vec3();
var GridBroadphase_collisionPairs_binPos = new Vec3();

/**
 * Naive broadphase implementation, used in lack of better ones.
 * @class NaiveBroadphase
 * @constructor
 * @description The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
 * @extends Broadphase
 */
var NaiveBroadphase = /*#__PURE__*/function (_Broadphase) {
  _inheritsLoose(NaiveBroadphase, _Broadphase);

  function NaiveBroadphase() {
    return _Broadphase.call(this) || this;
  }
  /**
   * Get all the collision pairs in the physics world
   * @method collisionPairs
   * @param {World} world
   * @param {Array} pairs1
   * @param {Array} pairs2
   */


  var _proto = NaiveBroadphase.prototype;

  _proto.collisionPairs = function collisionPairs(world, pairs1, pairs2) {
    var bodies = world.bodies;
    var n = bodies.length;
    var bi;
    var bj; // Naive N^2 ftw!

    for (var i = 0; i !== n; i++) {
      for (var j = 0; j !== i; j++) {
        bi = bodies[i];
        bj = bodies[j];

        if (!this.needBroadphaseCollision(bi, bj)) {
          continue;
        }

        this.intersectionTest(bi, bj, pairs1, pairs2);
      }
    }
  }
  /**
   * Returns all the bodies within an AABB.
   * @method aabbQuery
   * @param  {World} world
   * @param  {AABB} aabb
   * @param {array} result An array to store resulting bodies in.
   * @return {array}
   */
  ;

  _proto.aabbQuery = function aabbQuery(world, aabb, result) {
    if (result === void 0) {
      result = [];
    }

    for (var i = 0; i < world.bodies.length; i++) {
      var b = world.bodies[i];

      if (b.aabbNeedsUpdate) {
        b.computeAABB();
      } // Ugly hack until Body gets aabb


      if (b.aabb.overlaps(aabb)) {
        result.push(b);
      }
    }

    return result;
  };

  return NaiveBroadphase;
}(Broadphase);

/**
 * Storage for Ray casting data.
 * @class RaycastResult
 * @constructor
 */
var RaycastResult = /*#__PURE__*/function () {
  // The index of the hit triangle, if the hit shape was a trimesh.
  // Distance to the hit. Will be set to -1 if there was no hit.
  // If the ray should stop traversing the bodies.
  function RaycastResult() {
    this.rayFromWorld = new Vec3();
    this.rayToWorld = new Vec3();
    this.hitNormalWorld = new Vec3();
    this.hitPointWorld = new Vec3();
    this.hasHit = false;
    this.shape = null;
    this.body = null;
    this.hitFaceIndex = -1;
    this.distance = -1;
    this.shouldStop = false;
  }
  /**
   * Reset all result data.
   * @method reset
   */


  var _proto = RaycastResult.prototype;

  _proto.reset = function reset() {
    this.rayFromWorld.setZero();
    this.rayToWorld.setZero();
    this.hitNormalWorld.setZero();
    this.hitPointWorld.setZero();
    this.hasHit = false;
    this.shape = null;
    this.body = null;
    this.hitFaceIndex = -1;
    this.distance = -1;
    this.shouldStop = false;
  }
  /**
   * @method abort
   */
  ;

  _proto.abort = function abort() {
    this.shouldStop = true;
  }
  /**
   * @method set
   * @param {Vec3} rayFromWorld
   * @param {Vec3} rayToWorld
   * @param {Vec3} hitNormalWorld
   * @param {Vec3} hitPointWorld
   * @param {Shape} shape
   * @param {Body} body
   * @param {number} distance
   */
  ;

  _proto.set = function set(rayFromWorld, rayToWorld, hitNormalWorld, hitPointWorld, shape, body, distance) {
    this.rayFromWorld.copy(rayFromWorld);
    this.rayToWorld.copy(rayToWorld);
    this.hitNormalWorld.copy(hitNormalWorld);
    this.hitPointWorld.copy(hitPointWorld);
    this.shape = shape;
    this.body = body;
    this.distance = distance;
  };

  return RaycastResult;
}();

var RAY_MODES = {
  CLOSEST: 1,
  ANY: 2,
  ALL: 4
};

/**
 * A line in 3D space that intersects bodies and return points.
 * @class Ray
 * @constructor
 * @param {Vec3} from
 * @param {Vec3} to
 */
var Ray = /*#__PURE__*/function () {
  // The precision of the ray. Used when checking parallelity etc.
  // Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
  // If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
  // The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
  // Current result object.
  // Will be set to true during intersectWorld() if the ray hit anything.
  // User-provided result callback. Will be used if mode is Ray.ALL.
  function Ray(from, to) {
    if (from === void 0) {
      from = new Vec3();
    }

    if (to === void 0) {
      to = new Vec3();
    }

    this.from = from.clone();
    this.to = to.clone();
    this.direction = new Vec3();
    this.precision = 0.0001;
    this.checkCollisionResponse = true;
    this.skipBackfaces = false;
    this.collisionFilterMask = -1;
    this.collisionFilterGroup = -1;
    this.mode = Ray.ANY;
    this.result = new RaycastResult();
    this.hasHit = false;

    this.callback = function (result) {};
  }
  /**
   * Do itersection against all bodies in the given World.
   * @method intersectWorld
   * @param  {World} world
   * @param  {object} options
   * @return {Boolean} True if the ray hit anything, otherwise false.
   */


  var _proto = Ray.prototype;

  _proto.intersectWorld = function intersectWorld(world, options) {
    this.mode = options.mode || Ray.ANY;
    this.result = options.result || new RaycastResult();
    this.skipBackfaces = !!options.skipBackfaces;
    this.collisionFilterMask = typeof options.collisionFilterMask !== 'undefined' ? options.collisionFilterMask : -1;
    this.collisionFilterGroup = typeof options.collisionFilterGroup !== 'undefined' ? options.collisionFilterGroup : -1;
    this.checkCollisionResponse = typeof options.checkCollisionResponse !== 'undefined' ? options.checkCollisionResponse : true;

    if (options.from) {
      this.from.copy(options.from);
    }

    if (options.to) {
      this.to.copy(options.to);
    }

    this.callback = options.callback || function () {};

    this.hasHit = false;
    this.result.reset();
    this.updateDirection();
    this.getAABB(tmpAABB);
    tmpArray.length = 0;
    world.broadphase.aabbQuery(world, tmpAABB, tmpArray);
    this.intersectBodies(tmpArray);
    return this.hasHit;
  }
  /**
   * Shoot a ray at a body, get back information about the hit.
   * @param {Body} body
   * @param {RaycastResult} [result] Deprecated - set the result property of the Ray instead.
   */
  ;

  _proto.intersectBody = function intersectBody(body, result) {
    if (result) {
      this.result = result;
      this.updateDirection();
    }

    var checkCollisionResponse = this.checkCollisionResponse;

    if (checkCollisionResponse && !body.collisionResponse) {
      return;
    }

    if ((this.collisionFilterGroup & body.collisionFilterMask) === 0 || (body.collisionFilterGroup & this.collisionFilterMask) === 0) {
      return;
    }

    var xi = intersectBody_xi;
    var qi = intersectBody_qi;

    for (var i = 0, N = body.shapes.length; i < N; i++) {
      var shape = body.shapes[i];

      if (checkCollisionResponse && !shape.collisionResponse) {
        continue; // Skip
      }

      body.quaternion.mult(body.shapeOrientations[i], qi);
      body.quaternion.vmult(body.shapeOffsets[i], xi);
      xi.vadd(body.position, xi);
      this.intersectShape(shape, qi, xi, body);

      if (this.result.shouldStop) {
        break;
      }
    }
  }
  /**
   * @method intersectBodies
   * @param {Array} bodies An array of Body objects.
   * @param {RaycastResult} [result] Deprecated
   */
  ;

  _proto.intersectBodies = function intersectBodies(bodies, result) {
    if (result) {
      this.result = result;
      this.updateDirection();
    }

    for (var i = 0, l = bodies.length; !this.result.shouldStop && i < l; i++) {
      this.intersectBody(bodies[i]);
    }
  }
  /**
   * Updates the direction vector.
   */
  ;

  _proto.updateDirection = function updateDirection() {
    this.to.vsub(this.from, this.direction);
    this.direction.normalize();
  };

  _proto.intersectShape = function intersectShape(shape, quat, position, body) {
    var from = this.from; // Checking boundingSphere

    var distance = distanceFromIntersection(from, this.direction, position);

    if (distance > shape.boundingSphereRadius) {
      return;
    }

    var intersectMethod = this[shape.type];

    if (intersectMethod) {
      intersectMethod.call(this, shape, quat, position, body, shape);
    }
  };

  _proto._intersectBox = function _intersectBox(box, quat, position, body, reportedShape) {
    return this._intersectConvex(box.convexPolyhedronRepresentation, quat, position, body, reportedShape);
  };

  _proto._intersectPlane = function _intersectPlane(shape, quat, position, body, reportedShape) {
    var from = this.from;
    var to = this.to;
    var direction = this.direction; // Get plane normal

    var worldNormal = new Vec3(0, 0, 1);
    quat.vmult(worldNormal, worldNormal);
    var len = new Vec3();
    from.vsub(position, len);
    var planeToFrom = len.dot(worldNormal);
    to.vsub(position, len);
    var planeToTo = len.dot(worldNormal);

    if (planeToFrom * planeToTo > 0) {
      // "from" and "to" are on the same side of the plane... bail out
      return;
    }

    if (from.distanceTo(to) < planeToFrom) {
      return;
    }

    var n_dot_dir = worldNormal.dot(direction);

    if (Math.abs(n_dot_dir) < this.precision) {
      // No intersection
      return;
    }

    var planePointToFrom = new Vec3();
    var dir_scaled_with_t = new Vec3();
    var hitPointWorld = new Vec3();
    from.vsub(position, planePointToFrom);
    var t = -worldNormal.dot(planePointToFrom) / n_dot_dir;
    direction.scale(t, dir_scaled_with_t);
    from.vadd(dir_scaled_with_t, hitPointWorld);
    this.reportIntersection(worldNormal, hitPointWorld, reportedShape, body, -1);
  }
  /**
   * Get the world AABB of the ray.
   */
  ;

  _proto.getAABB = function getAABB(aabb) {
    var lowerBound = aabb.lowerBound,
        upperBound = aabb.upperBound;
    var to = this.to;
    var from = this.from;
    lowerBound.x = Math.min(to.x, from.x);
    lowerBound.y = Math.min(to.y, from.y);
    lowerBound.z = Math.min(to.z, from.z);
    upperBound.x = Math.max(to.x, from.x);
    upperBound.y = Math.max(to.y, from.y);
    upperBound.z = Math.max(to.z, from.z);
  };

  _proto._intersectHeightfield = function _intersectHeightfield(shape, quat, position, body, reportedShape) {
    var data = shape.data;
    var w = shape.elementSize; // Convert the ray to local heightfield coordinates

    var localRay = intersectHeightfield_localRay; //new Ray(this.from, this.to);

    localRay.from.copy(this.from);
    localRay.to.copy(this.to);
    Transform.pointToLocalFrame(position, quat, localRay.from, localRay.from);
    Transform.pointToLocalFrame(position, quat, localRay.to, localRay.to);
    localRay.updateDirection(); // Get the index of the data points to test against

    var index = intersectHeightfield_index;
    var iMinX;
    var iMinY;
    var iMaxX;
    var iMaxY; // Set to max

    iMinX = iMinY = 0;
    iMaxX = iMaxY = shape.data.length - 1;
    var aabb = new AABB();
    localRay.getAABB(aabb);
    shape.getIndexOfPosition(aabb.lowerBound.x, aabb.lowerBound.y, index, true);
    iMinX = Math.max(iMinX, index[0]);
    iMinY = Math.max(iMinY, index[1]);
    shape.getIndexOfPosition(aabb.upperBound.x, aabb.upperBound.y, index, true);
    iMaxX = Math.min(iMaxX, index[0] + 1);
    iMaxY = Math.min(iMaxY, index[1] + 1);

    for (var i = iMinX; i < iMaxX; i++) {
      for (var j = iMinY; j < iMaxY; j++) {
        if (this.result.shouldStop) {
          return;
        }

        shape.getAabbAtIndex(i, j, aabb);

        if (!aabb.overlapsRay(localRay)) {
          continue;
        } // Lower triangle


        shape.getConvexTrianglePillar(i, j, false);
        Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);

        this._intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, reportedShape, intersectConvexOptions);

        if (this.result.shouldStop) {
          return;
        } // Upper triangle


        shape.getConvexTrianglePillar(i, j, true);
        Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);

        this._intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, reportedShape, intersectConvexOptions);
      }
    }
  };

  _proto._intersectSphere = function _intersectSphere(sphere, quat, position, body, reportedShape) {
    var from = this.from;
    var to = this.to;
    var r = sphere.radius;
    var a = Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2);
    var b = 2 * ((to.x - from.x) * (from.x - position.x) + (to.y - from.y) * (from.y - position.y) + (to.z - from.z) * (from.z - position.z));
    var c = Math.pow(from.x - position.x, 2) + Math.pow(from.y - position.y, 2) + Math.pow(from.z - position.z, 2) - Math.pow(r, 2);
    var delta = Math.pow(b, 2) - 4 * a * c;
    var intersectionPoint = Ray_intersectSphere_intersectionPoint;
    var normal = Ray_intersectSphere_normal;

    if (delta < 0) {
      // No intersection
      return;
    } else if (delta === 0) {
      // single intersection point
      from.lerp(to, delta, intersectionPoint);
      intersectionPoint.vsub(position, normal);
      normal.normalize();
      this.reportIntersection(normal, intersectionPoint, reportedShape, body, -1);
    } else {
      var d1 = (-b - Math.sqrt(delta)) / (2 * a);
      var d2 = (-b + Math.sqrt(delta)) / (2 * a);

      if (d1 >= 0 && d1 <= 1) {
        from.lerp(to, d1, intersectionPoint);
        intersectionPoint.vsub(position, normal);
        normal.normalize();
        this.reportIntersection(normal, intersectionPoint, reportedShape, body, -1);
      }

      if (this.result.shouldStop) {
        return;
      }

      if (d2 >= 0 && d2 <= 1) {
        from.lerp(to, d2, intersectionPoint);
        intersectionPoint.vsub(position, normal);
        normal.normalize();
        this.reportIntersection(normal, intersectionPoint, reportedShape, body, -1);
      }
    }
  };

  _proto._intersectConvex = function _intersectConvex(shape, quat, position, body, reportedShape, options) {
    var normal = intersectConvex_normal;
    var vector = intersectConvex_vector;
    var faceList = options && options.faceList || null; // Checking faces

    var faces = shape.faces;
    var vertices = shape.vertices;
    var normals = shape.faceNormals;
    var direction = this.direction;
    var from = this.from;
    var to = this.to;
    var fromToDistance = from.distanceTo(to);
    var Nfaces = faceList ? faceList.length : faces.length;
    var result = this.result;

    for (var j = 0; !result.shouldStop && j < Nfaces; j++) {
      var fi = faceList ? faceList[j] : j;
      var face = faces[fi];
      var faceNormal = normals[fi];
      var q = quat;
      var x = position; // determine if ray intersects the plane of the face
      // note: this works regardless of the direction of the face normal
      // Get plane point in world coordinates...

      vector.copy(vertices[face[0]]);
      q.vmult(vector, vector);
      vector.vadd(x, vector); // ...but make it relative to the ray from. We'll fix this later.

      vector.vsub(from, vector); // Get plane normal

      q.vmult(faceNormal, normal); // If this dot product is negative, we have something interesting

      var dot = direction.dot(normal); // Bail out if ray and plane are parallel

      if (Math.abs(dot) < this.precision) {
        continue;
      } // calc distance to plane


      var scalar = normal.dot(vector) / dot; // if negative distance, then plane is behind ray

      if (scalar < 0) {
        continue;
      } // if (dot < 0) {
      // Intersection point is from + direction * scalar


      direction.scale(scalar, intersectPoint);
      intersectPoint.vadd(from, intersectPoint); // a is the point we compare points b and c with.

      a.copy(vertices[face[0]]);
      q.vmult(a, a);
      x.vadd(a, a);

      for (var i = 1; !result.shouldStop && i < face.length - 1; i++) {
        // Transform 3 vertices to world coords
        b.copy(vertices[face[i]]);
        c.copy(vertices[face[i + 1]]);
        q.vmult(b, b);
        q.vmult(c, c);
        x.vadd(b, b);
        x.vadd(c, c);
        var distance = intersectPoint.distanceTo(from);

        if (!(pointInTriangle(intersectPoint, a, b, c) || pointInTriangle(intersectPoint, b, a, c)) || distance > fromToDistance) {
          continue;
        }

        this.reportIntersection(normal, intersectPoint, reportedShape, body, fi);
      } // }

    }
  }
  /**
   * @todo Optimize by transforming the world to local space first.
   * @todo Use Octree lookup
   */
  ;

  _proto._intersectTrimesh = function _intersectTrimesh(mesh, quat, position, body, reportedShape, options) {
    var normal = intersectTrimesh_normal;
    var triangles = intersectTrimesh_triangles;
    var treeTransform = intersectTrimesh_treeTransform;
    var vector = intersectConvex_vector;
    var localDirection = intersectTrimesh_localDirection;
    var localFrom = intersectTrimesh_localFrom;
    var localTo = intersectTrimesh_localTo;
    var worldIntersectPoint = intersectTrimesh_worldIntersectPoint;
    var worldNormal = intersectTrimesh_worldNormal;
    var faceList = options && options.faceList || null; // Checking faces

    var indices = mesh.indices;
    var vertices = mesh.vertices; // const normals = mesh.faceNormals

    var from = this.from;
    var to = this.to;
    var direction = this.direction;
    treeTransform.position.copy(position);
    treeTransform.quaternion.copy(quat); // Transform ray to local space!

    Transform.vectorToLocalFrame(position, quat, direction, localDirection);
    Transform.pointToLocalFrame(position, quat, from, localFrom);
    Transform.pointToLocalFrame(position, quat, to, localTo);
    localTo.x *= mesh.scale.x;
    localTo.y *= mesh.scale.y;
    localTo.z *= mesh.scale.z;
    localFrom.x *= mesh.scale.x;
    localFrom.y *= mesh.scale.y;
    localFrom.z *= mesh.scale.z;
    localTo.vsub(localFrom, localDirection);
    localDirection.normalize();
    var fromToDistanceSquared = localFrom.distanceSquared(localTo);
    mesh.tree.rayQuery(this, treeTransform, triangles);

    for (var i = 0, N = triangles.length; !this.result.shouldStop && i !== N; i++) {
      var trianglesIndex = triangles[i];
      mesh.getNormal(trianglesIndex, normal); // determine if ray intersects the plane of the face
      // note: this works regardless of the direction of the face normal
      // Get plane point in world coordinates...

      mesh.getVertex(indices[trianglesIndex * 3], a); // ...but make it relative to the ray from. We'll fix this later.

      a.vsub(localFrom, vector); // If this dot product is negative, we have something interesting

      var dot = localDirection.dot(normal); // Bail out if ray and plane are parallel
      // if (Math.abs( dot ) < this.precision){
      //     continue;
      // }
      // calc distance to plane

      var scalar = normal.dot(vector) / dot; // if negative distance, then plane is behind ray

      if (scalar < 0) {
        continue;
      } // Intersection point is from + direction * scalar


      localDirection.scale(scalar, intersectPoint);
      intersectPoint.vadd(localFrom, intersectPoint); // Get triangle vertices

      mesh.getVertex(indices[trianglesIndex * 3 + 1], b);
      mesh.getVertex(indices[trianglesIndex * 3 + 2], c);
      var squaredDistance = intersectPoint.distanceSquared(localFrom);

      if (!(pointInTriangle(intersectPoint, b, a, c) || pointInTriangle(intersectPoint, a, b, c)) || squaredDistance > fromToDistanceSquared) {
        continue;
      } // transform intersectpoint and normal to world


      Transform.vectorToWorldFrame(quat, normal, worldNormal);
      Transform.pointToWorldFrame(position, quat, intersectPoint, worldIntersectPoint);
      this.reportIntersection(worldNormal, worldIntersectPoint, reportedShape, body, trianglesIndex);
    }

    triangles.length = 0;
  }
  /**
   * @return {boolean} True if the intersections should continue
   */
  ;

  _proto.reportIntersection = function reportIntersection(normal, hitPointWorld, shape, body, hitFaceIndex) {
    var from = this.from;
    var to = this.to;
    var distance = from.distanceTo(hitPointWorld);
    var result = this.result; // Skip back faces?

    if (this.skipBackfaces && normal.dot(this.direction) > 0) {
      return;
    }

    result.hitFaceIndex = typeof hitFaceIndex !== 'undefined' ? hitFaceIndex : -1;

    switch (this.mode) {
      case Ray.ALL:
        this.hasHit = true;
        result.set(from, to, normal, hitPointWorld, shape, body, distance);
        result.hasHit = true;
        this.callback(result);
        break;

      case Ray.CLOSEST:
        // Store if closer than current closest
        if (distance < result.distance || !result.hasHit) {
          this.hasHit = true;
          result.hasHit = true;
          result.set(from, to, normal, hitPointWorld, shape, body, distance);
        }

        break;

      case Ray.ANY:
        // Report and stop.
        this.hasHit = true;
        result.hasHit = true;
        result.set(from, to, normal, hitPointWorld, shape, body, distance);
        result.shouldStop = true;
        break;
    }
  };

  return Ray;
}();
Ray.CLOSEST = 1;
Ray.ANY = 2;
Ray.ALL = 4;
var tmpAABB = new AABB();
var tmpArray = [];
var v1 = new Vec3();
var v2 = new Vec3();
/*
 * As per "Barycentric Technique" as named here http://www.blackpawn.com/texts/pointinpoly/default.html But without the division
 */

Ray.pointInTriangle = pointInTriangle;

function pointInTriangle(p, a, b, c) {
  c.vsub(a, v0);
  b.vsub(a, v1);
  p.vsub(a, v2);
  var dot00 = v0.dot(v0);
  var dot01 = v0.dot(v1);
  var dot02 = v0.dot(v2);
  var dot11 = v1.dot(v1);
  var dot12 = v1.dot(v2);
  var u;
  var v;
  return (u = dot11 * dot02 - dot01 * dot12) >= 0 && (v = dot00 * dot12 - dot01 * dot02) >= 0 && u + v < dot00 * dot11 - dot01 * dot01;
}

var intersectBody_xi = new Vec3();
var intersectBody_qi = new Quaternion();
var vector = new Vec3();
var normal = new Vec3();
var intersectPoint = new Vec3();
var a = new Vec3();
var b = new Vec3();
var c = new Vec3();
var d = new Vec3();
var tmpRaycastResult = new RaycastResult();
Ray.prototype[Shape.types.BOX] = Ray.prototype._intersectBox;
Ray.prototype[Shape.types.PLANE] = Ray.prototype._intersectPlane;
var intersectConvexOptions = {
  faceList: [0]
};
var worldPillarOffset = new Vec3();
var intersectHeightfield_localRay = new Ray();
var intersectHeightfield_index = [];
Ray.prototype[Shape.types.HEIGHTFIELD] = Ray.prototype._intersectHeightfield;
var Ray_intersectSphere_intersectionPoint = new Vec3();
var Ray_intersectSphere_normal = new Vec3();
Ray.prototype[Shape.types.SPHERE] = Ray.prototype._intersectSphere;
var intersectConvex_normal = new Vec3();
var intersectConvex_minDistNormal = new Vec3();
var intersectConvex_minDistIntersect = new Vec3();
var intersectConvex_vector = new Vec3();
Ray.prototype[Shape.types.CONVEXPOLYHEDRON] = Ray.prototype._intersectConvex;
var intersectTrimesh_normal = new Vec3();
var intersectTrimesh_localDirection = new Vec3();
var intersectTrimesh_localFrom = new Vec3();
var intersectTrimesh_localTo = new Vec3();
var intersectTrimesh_worldNormal = new Vec3();
var intersectTrimesh_worldIntersectPoint = new Vec3();
var intersectTrimesh_localAABB = new AABB();
var intersectTrimesh_triangles = [];
var intersectTrimesh_treeTransform = new Transform();
Ray.prototype[Shape.types.TRIMESH] = Ray.prototype._intersectTrimesh;
var v0 = new Vec3();
var intersect = new Vec3();

function distanceFromIntersection(from, direction, position) {
  // v0 is vector from from to position
  position.vsub(from, v0);
  var dot = v0.dot(direction); // intersect = direction*dot + from

  direction.scale(dot, intersect);
  intersect.vadd(from, intersect);
  var distance = position.distanceTo(intersect);
  return distance;
}

/**
 * Sweep and prune broadphase along one axis.
 *
 * @class SAPBroadphase
 * @constructor
 * @param {World} [world]
 * @extends Broadphase
 */
var SAPBroadphase = /*#__PURE__*/function (_Broadphase) {
  _inheritsLoose(SAPBroadphase, _Broadphase);

  // List of bodies currently in the broadphase.
  // The world to search in.
  // Axis to sort the bodies along. Set to 0 for x axis, and 1 for y axis. For best performance, choose an axis that the bodies are spread out more on.
  function SAPBroadphase(world) {
    var _this;

    _this = _Broadphase.call(this) || this;
    _this.axisList = [];
    _this.world = null;
    _this.axisIndex = 0;
    var axisList = _this.axisList;

    _this._addBodyHandler = function (event) {
      axisList.push(event.body);
    };

    _this._removeBodyHandler = function (event) {
      var idx = axisList.indexOf(event.body);

      if (idx !== -1) {
        axisList.splice(idx, 1);
      }
    };

    if (world) {
      _this.setWorld(world);
    }

    return _this;
  }
  /**
   * Change the world
   * @method setWorld
   * @param  {World} world
   */


  var _proto = SAPBroadphase.prototype;

  _proto.setWorld = function setWorld(world) {
    // Clear the old axis array
    this.axisList.length = 0; // Add all bodies from the new world

    for (var i = 0; i < world.bodies.length; i++) {
      this.axisList.push(world.bodies[i]);
    } // Remove old handlers, if any


    world.removeEventListener('addBody', this._addBodyHandler);
    world.removeEventListener('removeBody', this._removeBodyHandler); // Add handlers to update the list of bodies.

    world.addEventListener('addBody', this._addBodyHandler);
    world.addEventListener('removeBody', this._removeBodyHandler);
    this.world = world;
    this.dirty = true;
  }
  /**
   * Collect all collision pairs
   * @method collisionPairs
   * @param  {World} world
   * @param  {Array} p1
   * @param  {Array} p2
   */
  ;

  _proto.collisionPairs = function collisionPairs(world, p1, p2) {
    var bodies = this.axisList;
    var N = bodies.length;
    var axisIndex = this.axisIndex;
    var i;
    var j;

    if (this.dirty) {
      this.sortList();
      this.dirty = false;
    } // Look through the list


    for (i = 0; i !== N; i++) {
      var _bi = bodies[i];

      for (j = i + 1; j < N; j++) {
        var _bj = bodies[j];

        if (!this.needBroadphaseCollision(_bi, _bj)) {
          continue;
        }

        if (!SAPBroadphase.checkBounds(_bi, _bj, axisIndex)) {
          break;
        }

        this.intersectionTest(_bi, _bj, p1, p2);
      }
    }
  };

  _proto.sortList = function sortList() {
    var axisList = this.axisList;
    var axisIndex = this.axisIndex;
    var N = axisList.length; // Update AABBs

    for (var i = 0; i !== N; i++) {
      var _bi2 = axisList[i];

      if (_bi2.aabbNeedsUpdate) {
        _bi2.computeAABB();
      }
    } // Sort the list


    if (axisIndex === 0) {
      SAPBroadphase.insertionSortX(axisList);
    } else if (axisIndex === 1) {
      SAPBroadphase.insertionSortY(axisList);
    } else if (axisIndex === 2) {
      SAPBroadphase.insertionSortZ(axisList);
    }
  }
  /**
   * Computes the variance of the body positions and estimates the best
   * axis to use. Will automatically set property .axisIndex.
   * @method autoDetectAxis
   */
  ;

  _proto.autoDetectAxis = function autoDetectAxis() {
    var sumX = 0;
    var sumX2 = 0;
    var sumY = 0;
    var sumY2 = 0;
    var sumZ = 0;
    var sumZ2 = 0;
    var bodies = this.axisList;
    var N = bodies.length;
    var invN = 1 / N;

    for (var i = 0; i !== N; i++) {
      var b = bodies[i];
      var centerX = b.position.x;
      sumX += centerX;
      sumX2 += centerX * centerX;
      var centerY = b.position.y;
      sumY += centerY;
      sumY2 += centerY * centerY;
      var centerZ = b.position.z;
      sumZ += centerZ;
      sumZ2 += centerZ * centerZ;
    }

    var varianceX = sumX2 - sumX * sumX * invN;
    var varianceY = sumY2 - sumY * sumY * invN;
    var varianceZ = sumZ2 - sumZ * sumZ * invN;

    if (varianceX > varianceY) {
      if (varianceX > varianceZ) {
        this.axisIndex = 0;
      } else {
        this.axisIndex = 2;
      }
    } else if (varianceY > varianceZ) {
      this.axisIndex = 1;
    } else {
      this.axisIndex = 2;
    }
  }
  /**
   * Returns all the bodies within an AABB.
   * @method aabbQuery
   * @param  {World} world
   * @param  {AABB} aabb
   * @param {array} result An array to store resulting bodies in.
   * @return {array}
   */
  ;

  _proto.aabbQuery = function aabbQuery(world, aabb, result) {
    if (result === void 0) {
      result = [];
    }

    if (this.dirty) {
      this.sortList();
      this.dirty = false;
    }

    var axisIndex = this.axisIndex;
    var axis = 'x';

    if (axisIndex === 1) {
      axis = 'y';
    }

    if (axisIndex === 2) {
      axis = 'z';
    }

    var axisList = this.axisList;
    var lower = aabb.lowerBound[axis];
    var upper = aabb.upperBound[axis];

    for (var i = 0; i < axisList.length; i++) {
      var b = axisList[i];

      if (b.aabbNeedsUpdate) {
        b.computeAABB();
      }

      if (b.aabb.overlaps(aabb)) {
        result.push(b);
      }
    }

    return result;
  };

  return SAPBroadphase;
}(Broadphase);
/**
 * @static
 * @method insertionSortX
 * @param  {Array} a
 * @return {Array}
 */

SAPBroadphase.insertionSortX = function (a) {
  for (var i = 1, l = a.length; i < l; i++) {
    var v = a[i];
    var j = void 0;

    for (j = i - 1; j >= 0; j--) {
      if (a[j].aabb.lowerBound.x <= v.aabb.lowerBound.x) {
        break;
      }

      a[j + 1] = a[j];
    }

    a[j + 1] = v;
  }

  return a;
};
/**
 * @static
 * @method insertionSortY
 * @param  {Array} a
 * @return {Array}
 */


SAPBroadphase.insertionSortY = function (a) {
  for (var i = 1, l = a.length; i < l; i++) {
    var v = a[i];
    var j = void 0;

    for (j = i - 1; j >= 0; j--) {
      if (a[j].aabb.lowerBound.y <= v.aabb.lowerBound.y) {
        break;
      }

      a[j + 1] = a[j];
    }

    a[j + 1] = v;
  }

  return a;
};
/**
 * @static
 * @method insertionSortZ
 * @param  {Array} a
 * @return {Array}
 */


SAPBroadphase.insertionSortZ = function (a) {
  for (var i = 1, l = a.length; i < l; i++) {
    var v = a[i];
    var j = void 0;

    for (j = i - 1; j >= 0; j--) {
      if (a[j].aabb.lowerBound.z <= v.aabb.lowerBound.z) {
        break;
      }

      a[j + 1] = a[j];
    }

    a[j + 1] = v;
  }

  return a;
};
/**
 * Check if the bounds of two bodies overlap, along the given SAP axis.
 * @static
 * @method checkBounds
 * @param  {Body} bi
 * @param  {Body} bj
 * @param  {Number} axisIndex
 * @return {Boolean}
 */


SAPBroadphase.checkBounds = function (bi, bj, axisIndex) {
  var biPos;
  var bjPos;

  if (axisIndex === 0) {
    biPos = bi.position.x;
    bjPos = bj.position.x;
  } else if (axisIndex === 1) {
    biPos = bi.position.y;
    bjPos = bj.position.y;
  } else if (axisIndex === 2) {
    biPos = bi.position.z;
    bjPos = bj.position.z;
  }

  var ri = bi.boundingRadius,
      rj = bj.boundingRadius,
      // boundA1 = biPos - ri,
  boundA2 = biPos + ri,
      boundB1 = bjPos - rj; // boundB2 = bjPos + rj;

  return boundB1 < boundA2;
};

function Utils() {}
/**
 * Extend an options object with default values.
 * @static
 * @method defaults
 * @param  {object} options The options object. May be falsy: in this case, a new object is created and returned.
 * @param  {object} defaults An object containing default values.
 * @return {object} The modified options object.
 */

Utils.defaults = function (options, defaults) {
  if (options === void 0) {
    options = {};
  }

  for (var key in defaults) {
    if (!(key in options)) {
      options[key] = defaults[key];
    }
  }

  return options;
};

/**
 * Constraint base class
 * @class Constraint
 * @author schteppe
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {boolean} [options.collideConnected=true]
 * @param {boolean} [options.wakeUpBodies=true]
 */
var Constraint = /*#__PURE__*/function () {
  // Equations to be solved in this constraint.
  // Set to true if you want the bodies to collide when they are connected.
  function Constraint(bodyA, bodyB, options) {
    if (options === void 0) {
      options = {};
    }

    options = Utils.defaults(options, {
      collideConnected: true,
      wakeUpBodies: true
    });
    this.equations = [];
    this.bodyA = bodyA;
    this.bodyB = bodyB;
    this.id = Constraint.idCounter++;
    this.collideConnected = options.collideConnected;

    if (options.wakeUpBodies) {
      if (bodyA) {
        bodyA.wakeUp();
      }

      if (bodyB) {
        bodyB.wakeUp();
      }
    }
  }
  /**
   * Update all the equations with data.
   * @method update
   */


  var _proto = Constraint.prototype;

  _proto.update = function update() {
    throw new Error('method update() not implmemented in this Constraint subclass!');
  }
  /**
   * Enables all equations in the constraint.
   * @method enable
   */
  ;

  _proto.enable = function enable() {
    var eqs = this.equations;

    for (var i = 0; i < eqs.length; i++) {
      eqs[i].enabled = true;
    }
  }
  /**
   * Disables all equations in the constraint.
   * @method disable
   */
  ;

  _proto.disable = function disable() {
    var eqs = this.equations;

    for (var i = 0; i < eqs.length; i++) {
      eqs[i].enabled = false;
    }
  };

  return Constraint;
}();
Constraint.idCounter = 0;

/**
 * An element containing 6 entries, 3 spatial and 3 rotational degrees of freedom.
 */

var JacobianElement = /*#__PURE__*/function () {
  function JacobianElement() {
    this.spatial = new Vec3();
    this.rotational = new Vec3();
  }
  /**
   * Multiply with other JacobianElement
   */


  var _proto = JacobianElement.prototype;

  _proto.multiplyElement = function multiplyElement(element) {
    return element.spatial.dot(this.spatial) + element.rotational.dot(this.rotational);
  }
  /**
   * Multiply with two vectors
   */
  ;

  _proto.multiplyVectors = function multiplyVectors(spatial, rotational) {
    return spatial.dot(this.spatial) + rotational.dot(this.rotational);
  };

  return JacobianElement;
}();

/**
 * Equation base class
 * @class Equation
 * @constructor
 * @author schteppe
 * @param {Body} bi
 * @param {Body} bj
 * @param {Number} minForce Minimum (read: negative max) force to be applied by the constraint.
 * @param {Number} maxForce Maximum (read: positive max) force to be applied by the constraint.
 */
var Equation = /*#__PURE__*/function () {
  // SPOOK parameter
  // SPOOK parameter
  // SPOOK parameter
  // A number, proportional to the force added to the bodies.
  function Equation(bi, bj, minForce, maxForce) {
    if (minForce === void 0) {
      minForce = -1e6;
    }

    if (maxForce === void 0) {
      maxForce = 1e6;
    }

    this.id = Equation.id++;
    this.minForce = minForce;
    this.maxForce = maxForce;
    this.bi = bi;
    this.bj = bj;
    this.a = 0.0; // SPOOK parameter

    this.b = 0.0; // SPOOK parameter

    this.eps = 0.0; // SPOOK parameter

    this.jacobianElementA = new JacobianElement();
    this.jacobianElementB = new JacobianElement();
    this.enabled = true;
    this.multiplier = 0;
    this.setSpookParams(1e7, 4, 1 / 60); // Set typical spook params
  }
  /**
   * Recalculates a,b,eps.
   * @method setSpookParams
   */


  var _proto = Equation.prototype;

  _proto.setSpookParams = function setSpookParams(stiffness, relaxation, timeStep) {
    var d = relaxation;
    var k = stiffness;
    var h = timeStep;
    this.a = 4.0 / (h * (1 + 4 * d));
    this.b = 4.0 * d / (1 + 4 * d);
    this.eps = 4.0 / (h * h * k * (1 + 4 * d));
  }
  /**
   * Computes the right hand side of the SPOOK equation
   * @method computeB
   * @return {Number}
   */
  ;

  _proto.computeB = function computeB(a, b, h) {
    var GW = this.computeGW();
    var Gq = this.computeGq();
    var GiMf = this.computeGiMf();
    return -Gq * a - GW * b - GiMf * h;
  }
  /**
   * Computes G*q, where q are the generalized body coordinates
   * @method computeGq
   * @return {Number}
   */
  ;

  _proto.computeGq = function computeGq() {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var xi = bi.position;
    var xj = bj.position;
    return GA.spatial.dot(xi) + GB.spatial.dot(xj);
  }
  /**
   * Computes G*W, where W are the body velocities
   * @method computeGW
   * @return {Number}
   */
  ;

  _proto.computeGW = function computeGW() {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var vi = bi.velocity;
    var vj = bj.velocity;
    var wi = bi.angularVelocity;
    var wj = bj.angularVelocity;
    return GA.multiplyVectors(vi, wi) + GB.multiplyVectors(vj, wj);
  }
  /**
   * Computes G*Wlambda, where W are the body velocities
   * @method computeGWlambda
   * @return {Number}
   */
  ;

  _proto.computeGWlambda = function computeGWlambda() {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var vi = bi.vlambda;
    var vj = bj.vlambda;
    var wi = bi.wlambda;
    var wj = bj.wlambda;
    return GA.multiplyVectors(vi, wi) + GB.multiplyVectors(vj, wj);
  };

  _proto.computeGiMf = function computeGiMf() {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var fi = bi.force;
    var ti = bi.torque;
    var fj = bj.force;
    var tj = bj.torque;
    var invMassi = bi.invMassSolve;
    var invMassj = bj.invMassSolve;
    fi.scale(invMassi, iMfi);
    fj.scale(invMassj, iMfj);
    bi.invInertiaWorldSolve.vmult(ti, invIi_vmult_taui);
    bj.invInertiaWorldSolve.vmult(tj, invIj_vmult_tauj);
    return GA.multiplyVectors(iMfi, invIi_vmult_taui) + GB.multiplyVectors(iMfj, invIj_vmult_tauj);
  };

  _proto.computeGiMGt = function computeGiMGt() {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var invMassi = bi.invMassSolve;
    var invMassj = bj.invMassSolve;
    var invIi = bi.invInertiaWorldSolve;
    var invIj = bj.invInertiaWorldSolve;
    var result = invMassi + invMassj;
    invIi.vmult(GA.rotational, tmp$1);
    result += tmp$1.dot(GA.rotational);
    invIj.vmult(GB.rotational, tmp$1);
    result += tmp$1.dot(GB.rotational);
    return result;
  }
  /**
   * Add constraint velocity to the bodies.
   * @method addToWlambda
   * @param {Number} deltalambda
   */
  ;

  _proto.addToWlambda = function addToWlambda(deltalambda) {
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var bi = this.bi;
    var bj = this.bj;
    var temp = addToWlambda_temp; // Add to linear velocity
    // v_lambda += inv(M) * delta_lamba * G

    bi.vlambda.addScaledVector(bi.invMassSolve * deltalambda, GA.spatial, bi.vlambda);
    bj.vlambda.addScaledVector(bj.invMassSolve * deltalambda, GB.spatial, bj.vlambda); // Add to angular velocity

    bi.invInertiaWorldSolve.vmult(GA.rotational, temp);
    bi.wlambda.addScaledVector(deltalambda, temp, bi.wlambda);
    bj.invInertiaWorldSolve.vmult(GB.rotational, temp);
    bj.wlambda.addScaledVector(deltalambda, temp, bj.wlambda);
  }
  /**
   * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
   * @method computeInvC
   * @param  {Number} eps
   * @return {Number}
   */
  ;

  _proto.computeC = function computeC() {
    return this.computeGiMGt() + this.eps;
  };

  return Equation;
}();
Equation.id = 0;
/**
 * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
 * @method computeGiMf
 * @return {Number}
 */

var iMfi = new Vec3();
var iMfj = new Vec3();
var invIi_vmult_taui = new Vec3();
var invIj_vmult_tauj = new Vec3();
/**
 * Computes G*inv(M)*G'
 * @method computeGiMGt
 * @return {Number}
 */

var tmp$1 = new Vec3();
var addToWlambda_temp = new Vec3();

/**
 * Contact/non-penetration constraint equation
 * @class ContactEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @extends Equation
 */
var ContactEquation = /*#__PURE__*/function (_Equation) {
  _inheritsLoose(ContactEquation, _Equation);

  // "bounciness": u1 = -e*u0
  // World-oriented vector that goes from the center of bi to the contact point.
  // World-oriented vector that starts in body j position and goes to the contact point.
  // Contact normal, pointing out of body i.
  function ContactEquation(bodyA, bodyB, maxForce) {
    var _this;

    if (maxForce === void 0) {
      maxForce = 1e6;
    }

    _this = _Equation.call(this, bodyA, bodyB, 0, maxForce) || this;
    _this.restitution = 0.0;
    _this.ri = new Vec3();
    _this.rj = new Vec3();
    _this.ni = new Vec3();
    return _this;
  }

  var _proto = ContactEquation.prototype;

  _proto.computeB = function computeB(h) {
    var a = this.a;
    var b = this.b;
    var bi = this.bi;
    var bj = this.bj;
    var ri = this.ri;
    var rj = this.rj;
    var rixn = ContactEquation_computeB_temp1;
    var rjxn = ContactEquation_computeB_temp2;
    var vi = bi.velocity;
    var wi = bi.angularVelocity;
    var fi = bi.force;
    var taui = bi.torque;
    var vj = bj.velocity;
    var wj = bj.angularVelocity;
    var fj = bj.force;
    var tauj = bj.torque;
    var penetrationVec = ContactEquation_computeB_temp3;
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    var n = this.ni; // Caluclate cross products

    ri.cross(n, rixn);
    rj.cross(n, rjxn); // g = xj+rj -(xi+ri)
    // G = [ -ni  -rixn  ni  rjxn ]

    n.negate(GA.spatial);
    rixn.negate(GA.rotational);
    GB.spatial.copy(n);
    GB.rotational.copy(rjxn); // Calculate the penetration vector

    penetrationVec.copy(bj.position);
    penetrationVec.vadd(rj, penetrationVec);
    penetrationVec.vsub(bi.position, penetrationVec);
    penetrationVec.vsub(ri, penetrationVec);
    var g = n.dot(penetrationVec); // Compute iteration

    var ePlusOne = this.restitution + 1;
    var GW = ePlusOne * vj.dot(n) - ePlusOne * vi.dot(n) + wj.dot(rjxn) - wi.dot(rixn);
    var GiMf = this.computeGiMf();
    var B = -g * a - GW * b - h * GiMf;
    return B;
  }
  /**
   * Get the current relative velocity in the contact point.
   * @method getImpactVelocityAlongNormal
   * @return {number}
   */
  ;

  _proto.getImpactVelocityAlongNormal = function getImpactVelocityAlongNormal() {
    var vi = ContactEquation_getImpactVelocityAlongNormal_vi;
    var vj = ContactEquation_getImpactVelocityAlongNormal_vj;
    var xi = ContactEquation_getImpactVelocityAlongNormal_xi;
    var xj = ContactEquation_getImpactVelocityAlongNormal_xj;
    var relVel = ContactEquation_getImpactVelocityAlongNormal_relVel;
    this.bi.position.vadd(this.ri, xi);
    this.bj.position.vadd(this.rj, xj);
    this.bi.getVelocityAtWorldPoint(xi, vi);
    this.bj.getVelocityAtWorldPoint(xj, vj);
    vi.vsub(vj, relVel);
    return this.ni.dot(relVel);
  };

  return ContactEquation;
}(Equation);
var ContactEquation_computeB_temp1 = new Vec3(); // Temp vectors

var ContactEquation_computeB_temp2 = new Vec3();
var ContactEquation_computeB_temp3 = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_vi = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_vj = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_xi = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_xj = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_relVel = new Vec3();

/**
 * Connects two bodies at given offset points.
 * @class PointToPointConstraint
 * @extends Constraint
 * @constructor
 * @param {Body} bodyA
 * @param {Vec3} pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param {Body} bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
 * @param {Vec3} pivotB See pivotA.
 * @param {Number} maxForce The maximum force that should be applied to constrain the bodies.
 *
 * @example
 *     const bodyA = new Body({ mass: 1 });
 *     const bodyB = new Body({ mass: 1 });
 *     bodyA.position.set(-1, 0, 0);
 *     bodyB.position.set(1, 0, 0);
 *     bodyA.addShape(shapeA);
 *     bodyB.addShape(shapeB);
 *     world.addBody(bodyA);
 *     world.addBody(bodyB);
 *     const localPivotA = new Vec3(1, 0, 0);
 *     const localPivotB = new Vec3(-1, 0, 0);
 *     const constraint = new PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB);
 *     world.addConstraint(constraint);
 */
var PointToPointConstraint = /*#__PURE__*/function (_Constraint) {
  _inheritsLoose(PointToPointConstraint, _Constraint);

  // Pivot, defined locally in bodyA.
  // Pivot, defined locally in bodyB.
  function PointToPointConstraint(bodyA, pivotA, bodyB, pivotB, maxForce) {
    var _this;

    if (pivotA === void 0) {
      pivotA = new Vec3();
    }

    if (pivotB === void 0) {
      pivotB = new Vec3();
    }

    if (maxForce === void 0) {
      maxForce = 1e6;
    }

    _this = _Constraint.call(this, bodyA, bodyB) || this;
    _this.pivotA = pivotA.clone();
    _this.pivotB = pivotB.clone();
    var x = _this.equationX = new ContactEquation(bodyA, bodyB);
    var y = _this.equationY = new ContactEquation(bodyA, bodyB);
    var z = _this.equationZ = new ContactEquation(bodyA, bodyB); // Equations to be fed to the solver

    _this.equations.push(x, y, z); // Make the equations bidirectional


    x.minForce = y.minForce = z.minForce = -maxForce;
    x.maxForce = y.maxForce = z.maxForce = maxForce;
    x.ni.set(1, 0, 0);
    y.ni.set(0, 1, 0);
    z.ni.set(0, 0, 1);
    return _this;
  }

  var _proto = PointToPointConstraint.prototype;

  _proto.update = function update() {
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var x = this.equationX;
    var y = this.equationY;
    var z = this.equationZ; // Rotate the pivots to world space

    bodyA.quaternion.vmult(this.pivotA, x.ri);
    bodyB.quaternion.vmult(this.pivotB, x.rj);
    y.ri.copy(x.ri);
    y.rj.copy(x.rj);
    z.ri.copy(x.ri);
    z.rj.copy(x.rj);
  };

  return PointToPointConstraint;
}(Constraint);

/**
 * Cone equation. Works to keep the given body world vectors aligned, or tilted within a given angle from each other.
 * @class ConeEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA] Local axis in A
 * @param {Vec3} [options.axisB] Local axis in B
 * @param {Vec3} [options.angle] The "cone angle" to keep
 * @param {number} [options.maxForce=1e6]
 * @extends Equation
 */
var ConeEquation = /*#__PURE__*/function (_Equation) {
  _inheritsLoose(ConeEquation, _Equation);

  // The cone angle to keep.
  function ConeEquation(bodyA, bodyB, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    var maxForce = typeof options.maxForce !== 'undefined' ? options.maxForce : 1e6;
    _this = _Equation.call(this, bodyA, bodyB, -maxForce, maxForce) || this;
    _this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
    _this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);
    _this.angle = typeof options.angle !== 'undefined' ? options.angle : 0;
    return _this;
  }

  var _proto = ConeEquation.prototype;

  _proto.computeB = function computeB(h) {
    var a = this.a;
    var b = this.b;
    var ni = this.axisA;
    var nj = this.axisB;
    var nixnj = tmpVec1;
    var njxni = tmpVec2;
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB; // Caluclate cross products

    ni.cross(nj, nixnj);
    nj.cross(ni, njxni); // The angle between two vector is:
    // cos(theta) = a * b / (length(a) * length(b) = { len(a) = len(b) = 1 } = a * b
    // g = a * b
    // gdot = (b x a) * wi + (a x b) * wj
    // G = [0 bxa 0 axb]
    // W = [vi wi vj wj]

    GA.rotational.copy(njxni);
    GB.rotational.copy(nixnj);
    var g = Math.cos(this.angle) - ni.dot(nj);
    var GW = this.computeGW();
    var GiMf = this.computeGiMf();
    var B = -g * a - GW * b - h * GiMf;
    return B;
  };

  return ConeEquation;
}(Equation);
var tmpVec1 = new Vec3();
var tmpVec2 = new Vec3();

/**
 * Rotational constraint. Works to keep the local vectors orthogonal to each other in world space.
 * @class RotationalEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {number} [options.maxForce]
 * @extends Equation
 */
var RotationalEquation = /*#__PURE__*/function (_Equation) {
  _inheritsLoose(RotationalEquation, _Equation);

  function RotationalEquation(bodyA, bodyB, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    var maxForce = typeof options.maxForce !== 'undefined' ? options.maxForce : 1e6;
    _this = _Equation.call(this, bodyA, bodyB, -maxForce, maxForce) || this;
    _this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
    _this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);
    _this.maxAngle = Math.PI / 2;
    return _this;
  }

  var _proto = RotationalEquation.prototype;

  _proto.computeB = function computeB(h) {
    var a = this.a;
    var b = this.b;
    var ni = this.axisA;
    var nj = this.axisB;
    var nixnj = tmpVec1$1;
    var njxni = tmpVec2$1;
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB; // Caluclate cross products

    ni.cross(nj, nixnj);
    nj.cross(ni, njxni); // g = ni * nj
    // gdot = (nj x ni) * wi + (ni x nj) * wj
    // G = [0 njxni 0 nixnj]
    // W = [vi wi vj wj]

    GA.rotational.copy(njxni);
    GB.rotational.copy(nixnj);
    var g = Math.cos(this.maxAngle) - ni.dot(nj);
    var GW = this.computeGW();
    var GiMf = this.computeGiMf();
    var B = -g * a - GW * b - h * GiMf;
    return B;
  };

  return RotationalEquation;
}(Equation);
var tmpVec1$1 = new Vec3();
var tmpVec2$1 = new Vec3();

/**
 * @class ConeTwistConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA]
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
var ConeTwistConstraint = /*#__PURE__*/function (_PointToPointConstrai) {
  _inheritsLoose(ConeTwistConstraint, _PointToPointConstrai);

  function ConeTwistConstraint(bodyA, bodyB, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    var maxForce = typeof options.maxForce !== 'undefined' ? options.maxForce : 1e6; // Set pivot point in between

    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();
    _this = _PointToPointConstrai.call(this, bodyA, pivotA, bodyB, pivotB, maxForce) || this;
    _this.axisA = options.axisA ? options.axisA.clone() : new Vec3();
    _this.axisB = options.axisB ? options.axisB.clone() : new Vec3();
    _this.collideConnected = !!options.collideConnected;
    _this.angle = typeof options.angle !== 'undefined' ? options.angle : 0;
    var c = _this.coneEquation = new ConeEquation(bodyA, bodyB, options);
    var t = _this.twistEquation = new RotationalEquation(bodyA, bodyB, options);
    _this.twistAngle = typeof options.twistAngle !== 'undefined' ? options.twistAngle : 0; // Make the cone equation push the bodies toward the cone axis, not outward

    c.maxForce = 0;
    c.minForce = -maxForce; // Make the twist equation add torque toward the initial position

    t.maxForce = 0;
    t.minForce = -maxForce;

    _this.equations.push(c, t);

    return _this;
  }

  var _proto = ConeTwistConstraint.prototype;

  _proto.update = function update() {
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var cone = this.coneEquation;
    var twist = this.twistEquation;

    _PointToPointConstrai.prototype.update.call(this); // Update the axes to the cone constraint


    bodyA.vectorToWorldFrame(this.axisA, cone.axisA);
    bodyB.vectorToWorldFrame(this.axisB, cone.axisB); // Update the world axes in the twist constraint

    this.axisA.tangents(twist.axisA, twist.axisA);
    bodyA.vectorToWorldFrame(twist.axisA, twist.axisA);
    this.axisB.tangents(twist.axisB, twist.axisB);
    bodyB.vectorToWorldFrame(twist.axisB, twist.axisB);
    cone.angle = this.angle;
    twist.maxAngle = this.twistAngle;
  };

  return ConeTwistConstraint;
}(PointToPointConstraint);
var ConeTwistConstraint_update_tmpVec1 = new Vec3();
var ConeTwistConstraint_update_tmpVec2 = new Vec3();

/**
 * Constrains two bodies to be at a constant distance from each others center of mass.
 * @class DistanceConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} [distance] The distance to keep. If undefined, it will be set to the current distance between bodyA and bodyB
 * @param {Number} [maxForce=1e6]
 * @extends Constraint
 */
var DistanceConstraint = /*#__PURE__*/function (_Constraint) {
  _inheritsLoose(DistanceConstraint, _Constraint);

  function DistanceConstraint(bodyA, bodyB, distance, maxForce) {
    var _this;

    if (maxForce === void 0) {
      maxForce = 1e6;
    }

    _this = _Constraint.call(this, bodyA, bodyB) || this;

    if (typeof distance === 'undefined') {
      distance = bodyA.position.distanceTo(bodyB.position);
    }

    _this.distance = distance;
    var eq = _this.distanceEquation = new ContactEquation(bodyA, bodyB);

    _this.equations.push(eq); // Make it bidirectional


    eq.minForce = -maxForce;
    eq.maxForce = maxForce;
    return _this;
  }

  var _proto = DistanceConstraint.prototype;

  _proto.update = function update() {
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var eq = this.distanceEquation;
    var halfDist = this.distance * 0.5;
    var normal = eq.ni;
    bodyB.position.vsub(bodyA.position, normal);
    normal.normalize();
    normal.scale(halfDist, eq.ri);
    normal.scale(-halfDist, eq.rj);
  };

  return DistanceConstraint;
}(Constraint);

/**
 * Lock constraint. Will remove all degrees of freedom between the bodies.
 * @class LockConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
var LockConstraint = /*#__PURE__*/function (_PointToPointConstrai) {
  _inheritsLoose(LockConstraint, _PointToPointConstrai);

  function LockConstraint(bodyA, bodyB, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    var maxForce = typeof options.maxForce !== 'undefined' ? options.maxForce : 1e6; // Set pivot point in between

    var pivotA = new Vec3();
    var pivotB = new Vec3();
    var halfWay = new Vec3();
    bodyA.position.vadd(bodyB.position, halfWay);
    halfWay.scale(0.5, halfWay);
    bodyB.pointToLocalFrame(halfWay, pivotB);
    bodyA.pointToLocalFrame(halfWay, pivotA); // The point-to-point constraint will keep a point shared between the bodies

    _this = _PointToPointConstrai.call(this, bodyA, pivotA, bodyB, pivotB, maxForce) || this; // Store initial rotation of the bodies as unit vectors in the local body spaces

    _this.xA = bodyA.vectorToLocalFrame(Vec3.UNIT_X);
    _this.xB = bodyB.vectorToLocalFrame(Vec3.UNIT_X);
    _this.yA = bodyA.vectorToLocalFrame(Vec3.UNIT_Y);
    _this.yB = bodyB.vectorToLocalFrame(Vec3.UNIT_Y);
    _this.zA = bodyA.vectorToLocalFrame(Vec3.UNIT_Z);
    _this.zB = bodyB.vectorToLocalFrame(Vec3.UNIT_Z); // ...and the following rotational equations will keep all rotational DOF's in place

    var r1 = _this.rotationalEquation1 = new RotationalEquation(bodyA, bodyB, options);
    var r2 = _this.rotationalEquation2 = new RotationalEquation(bodyA, bodyB, options);
    var r3 = _this.rotationalEquation3 = new RotationalEquation(bodyA, bodyB, options);

    _this.equations.push(r1, r2, r3);

    return _this;
  }

  var _proto = LockConstraint.prototype;

  _proto.update = function update() {
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var motor = this.motorEquation;
    var r1 = this.rotationalEquation1;
    var r2 = this.rotationalEquation2;
    var r3 = this.rotationalEquation3;

    _PointToPointConstrai.prototype.update.call(this); // These vector pairs must be orthogonal


    bodyA.vectorToWorldFrame(this.xA, r1.axisA);
    bodyB.vectorToWorldFrame(this.yB, r1.axisB);
    bodyA.vectorToWorldFrame(this.yA, r2.axisA);
    bodyB.vectorToWorldFrame(this.zB, r2.axisB);
    bodyA.vectorToWorldFrame(this.zA, r3.axisA);
    bodyB.vectorToWorldFrame(this.xB, r3.axisB);
  };

  return LockConstraint;
}(PointToPointConstraint);
var LockConstraint_update_tmpVec1 = new Vec3();
var LockConstraint_update_tmpVec2 = new Vec3();

/**
 * Rotational motor constraint. Tries to keep the relative angular velocity of the bodies to a given value.
 * @class RotationalMotorEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} maxForce
 * @extends Equation
 */
var RotationalMotorEquation = /*#__PURE__*/function (_Equation) {
  _inheritsLoose(RotationalMotorEquation, _Equation);

  // World oriented rotational axis.
  // World oriented rotational axis.
  // Motor velocity.
  function RotationalMotorEquation(bodyA, bodyB, maxForce) {
    var _this;

    if (maxForce === void 0) {
      maxForce = 1e6;
    }

    _this = _Equation.call(this, bodyA, bodyB, -maxForce, maxForce) || this;
    _this.axisA = new Vec3();
    _this.axisB = new Vec3();
    _this.targetVelocity = 0;
    return _this;
  }

  var _proto = RotationalMotorEquation.prototype;

  _proto.computeB = function computeB(h) {
    var a = this.a;
    var b = this.b;
    var bi = this.bi;
    var bj = this.bj;
    var axisA = this.axisA;
    var axisB = this.axisB;
    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB; // g = 0
    // gdot = axisA * wi - axisB * wj
    // gdot = G * W = G * [vi wi vj wj]
    // =>
    // G = [0 axisA 0 -axisB]

    GA.rotational.copy(axisA);
    axisB.negate(GB.rotational);
    var GW = this.computeGW() - this.targetVelocity;
    var GiMf = this.computeGiMf();
    var B = -GW * b - h * GiMf;
    return B;
  };

  return RotationalMotorEquation;
}(Equation);

/**
 * Hinge constraint. Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
 * @class HingeConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA] A point defined locally in bodyA. This defines the offset of axisA.
 * @param {Vec3} [options.axisA] An axis that bodyA can rotate around, defined locally in bodyA.
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
var HingeConstraint = /*#__PURE__*/function (_PointToPointConstrai) {
  _inheritsLoose(HingeConstraint, _PointToPointConstrai);

  // Rotation axis, defined locally in bodyA.
  // Rotation axis, defined locally in bodyB.
  function HingeConstraint(bodyA, bodyB, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    var maxForce = typeof options.maxForce !== 'undefined' ? options.maxForce : 1e6;
    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();
    _this = _PointToPointConstrai.call(this, bodyA, pivotA, bodyB, pivotB, maxForce) || this;
    var axisA = _this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
    axisA.normalize();
    var axisB = _this.axisB = options.axisB ? options.axisB.clone() : new Vec3(1, 0, 0);
    axisB.normalize();
    _this.collideConnected = !!options.collideConnected;
    var rotational1 = _this.rotationalEquation1 = new RotationalEquation(bodyA, bodyB, options);
    var rotational2 = _this.rotationalEquation2 = new RotationalEquation(bodyA, bodyB, options);
    var motor = _this.motorEquation = new RotationalMotorEquation(bodyA, bodyB, maxForce);
    motor.enabled = false; // Not enabled by default
    // Equations to be fed to the solver

    _this.equations.push(rotational1, rotational2, motor);

    return _this;
  }
  /**
   * @method enableMotor
   */


  var _proto = HingeConstraint.prototype;

  _proto.enableMotor = function enableMotor() {
    this.motorEquation.enabled = true;
  }
  /**
   * @method disableMotor
   */
  ;

  _proto.disableMotor = function disableMotor() {
    this.motorEquation.enabled = false;
  }
  /**
   * @method setMotorSpeed
   * @param {number} speed
   */
  ;

  _proto.setMotorSpeed = function setMotorSpeed(speed) {
    this.motorEquation.targetVelocity = speed;
  }
  /**
   * @method setMotorMaxForce
   * @param {number} maxForce
   */
  ;

  _proto.setMotorMaxForce = function setMotorMaxForce(maxForce) {
    this.motorEquation.maxForce = maxForce;
    this.motorEquation.minForce = -maxForce;
  };

  _proto.update = function update() {
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var motor = this.motorEquation;
    var r1 = this.rotationalEquation1;
    var r2 = this.rotationalEquation2;
    var worldAxisA = HingeConstraint_update_tmpVec1;
    var worldAxisB = HingeConstraint_update_tmpVec2;
    var axisA = this.axisA;
    var axisB = this.axisB;

    _PointToPointConstrai.prototype.update.call(this); // Get world axes


    bodyA.quaternion.vmult(axisA, worldAxisA);
    bodyB.quaternion.vmult(axisB, worldAxisB);
    worldAxisA.tangents(r1.axisA, r2.axisA);
    r1.axisB.copy(worldAxisB);
    r2.axisB.copy(worldAxisB);

    if (this.motorEquation.enabled) {
      bodyA.quaternion.vmult(this.axisA, motor.axisA);
      bodyB.quaternion.vmult(this.axisB, motor.axisB);
    }
  };

  return HingeConstraint;
}(PointToPointConstraint);
var HingeConstraint_update_tmpVec1 = new Vec3();
var HingeConstraint_update_tmpVec2 = new Vec3();

/**
 * Constrains the slipping in a contact along a tangent
 * @class FrictionEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
 * @extends Equation
 */
var FrictionEquation = /*#__PURE__*/function (_Equation) {
  _inheritsLoose(FrictionEquation, _Equation);

  // Tangent.
  function FrictionEquation(bodyA, bodyB, slipForce) {
    var _this;

    _this = _Equation.call(this, bodyA, bodyB, -slipForce, slipForce) || this;
    _this.ri = new Vec3();
    _this.rj = new Vec3();
    _this.t = new Vec3();
    return _this;
  }

  var _proto = FrictionEquation.prototype;

  _proto.computeB = function computeB(h) {
    var a = this.a;
    var b = this.b;
    var bi = this.bi;
    var bj = this.bj;
    var ri = this.ri;
    var rj = this.rj;
    var rixt = FrictionEquation_computeB_temp1;
    var rjxt = FrictionEquation_computeB_temp2;
    var t = this.t; // Caluclate cross products

    ri.cross(t, rixt);
    rj.cross(t, rjxt); // G = [-t -rixt t rjxt]
    // And remember, this is a pure velocity constraint, g is always zero!

    var GA = this.jacobianElementA;
    var GB = this.jacobianElementB;
    t.negate(GA.spatial);
    rixt.negate(GA.rotational);
    GB.spatial.copy(t);
    GB.rotational.copy(rjxt);
    var GW = this.computeGW();
    var GiMf = this.computeGiMf();
    var B = -GW * b - h * GiMf;
    return B;
  };

  return FrictionEquation;
}(Equation);
var FrictionEquation_computeB_temp1 = new Vec3();
var FrictionEquation_computeB_temp2 = new Vec3();

/**
 * Defines what happens when two materials meet.
 * @class ContactMaterial
 * @constructor
 * @param {Material} m1
 * @param {Material} m2
 * @param {object} [options]
 * @param {Number} [options.friction=0.3]
 * @param {Number} [options.restitution=0.3]
 * @param {number} [options.contactEquationStiffness=1e7]
 * @param {number} [options.contactEquationRelaxation=3]
 * @param {number} [options.frictionEquationStiffness=1e7]
 * @param {Number} [options.frictionEquationRelaxation=3]
 * @todo Refactor materials to materialA and materialB
 */
var ContactMaterial = // Identifier of this material.
// Participating materials.
// Friction coefficient.
// Restitution coefficient.
// Stiffness of the produced contact equations.
// Relaxation time of the produced contact equations.
// Stiffness of the produced friction equations.
// Relaxation time of the produced friction equations
function ContactMaterial(m1, m2, options) {
  options = Utils.defaults(options, {
    friction: 0.3,
    restitution: 0.3,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 3,
    frictionEquationStiffness: 1e7,
    frictionEquationRelaxation: 3
  });
  this.id = ContactMaterial.idCounter++;
  this.materials = [m1, m2];
  this.friction = options.friction;
  this.restitution = options.restitution;
  this.contactEquationStiffness = options.contactEquationStiffness;
  this.contactEquationRelaxation = options.contactEquationRelaxation;
  this.frictionEquationStiffness = options.frictionEquationStiffness;
  this.frictionEquationRelaxation = options.frictionEquationRelaxation;
};
ContactMaterial.idCounter = 0;

/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param {object} [options]
 * @author schteppe
 */
var Material = // Material name.
// Material id.
// Friction for this material. If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
// Restitution for this material. If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
function Material(options) {
  if (options === void 0) {
    options = {};
  }

  var name = ''; // Backwards compatibility fix

  if (typeof options === 'string') {
    name = options;
    options = {};
  }

  this.name = name;
  this.id = Material.idCounter++;
  this.friction = typeof options.friction !== 'undefined' ? options.friction : -1;
  this.restitution = typeof options.restitution !== 'undefined' ? options.restitution : -1;
};
Material.idCounter = 0;

/**
 * A spring, connecting two bodies.
 *
 * @class Spring
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Object} [options]
 * @param {number} [options.restLength]   A number > 0. Default: 1
 * @param {number} [options.stiffness]    A number >= 0. Default: 100
 * @param {number} [options.damping]      A number >= 0. Default: 1
 * @param {Vec3}  [options.worldAnchorA] Where to hook the spring to body A, in world coordinates.
 * @param {Vec3}  [options.worldAnchorB]
 * @param {Vec3}  [options.localAnchorA] Where to hook the spring to body A, in local body coordinates.
 * @param {Vec3}  [options.localAnchorB]
 */
var Spring = /*#__PURE__*/function () {
  // Rest length of the spring.
  // Stiffness of the spring.
  // Damping of the spring.
  // First connected body.
  // Second connected body.
  // Anchor for bodyA in local bodyA coordinates.
  // Anchor for bodyB in local bodyB coordinates.
  function Spring(bodyA, bodyB, options) {
    if (options === void 0) {
      options = {};
    }

    this.restLength = typeof options.restLength === 'number' ? options.restLength : 1;
    this.stiffness = options.stiffness || 100;
    this.damping = options.damping || 1;
    this.bodyA = bodyA;
    this.bodyB = bodyB;
    this.localAnchorA = new Vec3();
    this.localAnchorB = new Vec3();

    if (options.localAnchorA) {
      this.localAnchorA.copy(options.localAnchorA);
    }

    if (options.localAnchorB) {
      this.localAnchorB.copy(options.localAnchorB);
    }

    if (options.worldAnchorA) {
      this.setWorldAnchorA(options.worldAnchorA);
    }

    if (options.worldAnchorB) {
      this.setWorldAnchorB(options.worldAnchorB);
    }
  }
  /**
   * Set the anchor point on body A, using world coordinates.
   * @method setWorldAnchorA
   * @param {Vec3} worldAnchorA
   */


  var _proto = Spring.prototype;

  _proto.setWorldAnchorA = function setWorldAnchorA(worldAnchorA) {
    this.bodyA.pointToLocalFrame(worldAnchorA, this.localAnchorA);
  }
  /**
   * Set the anchor point on body B, using world coordinates.
   * @method setWorldAnchorB
   * @param {Vec3} worldAnchorB
   */
  ;

  _proto.setWorldAnchorB = function setWorldAnchorB(worldAnchorB) {
    this.bodyB.pointToLocalFrame(worldAnchorB, this.localAnchorB);
  }
  /**
   * Get the anchor point on body A, in world coordinates.
   * @method getWorldAnchorA
   * @param {Vec3} result The vector to store the result in.
   */
  ;

  _proto.getWorldAnchorA = function getWorldAnchorA(result) {
    this.bodyA.pointToWorldFrame(this.localAnchorA, result);
  }
  /**
   * Get the anchor point on body B, in world coordinates.
   * @method getWorldAnchorB
   * @param {Vec3} result The vector to store the result in.
   */
  ;

  _proto.getWorldAnchorB = function getWorldAnchorB(result) {
    this.bodyB.pointToWorldFrame(this.localAnchorB, result);
  }
  /**
   * Apply the spring force to the connected bodies.
   * @method applyForce
   */
  ;

  _proto.applyForce = function applyForce() {
    var k = this.stiffness;
    var d = this.damping;
    var l = this.restLength;
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var r = applyForce_r;
    var r_unit = applyForce_r_unit;
    var u = applyForce_u;
    var f = applyForce_f;
    var tmp = applyForce_tmp;
    var worldAnchorA = applyForce_worldAnchorA;
    var worldAnchorB = applyForce_worldAnchorB;
    var ri = applyForce_ri;
    var rj = applyForce_rj;
    var ri_x_f = applyForce_ri_x_f;
    var rj_x_f = applyForce_rj_x_f; // Get world anchors

    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB); // Get offset points

    worldAnchorA.vsub(bodyA.position, ri);
    worldAnchorB.vsub(bodyB.position, rj); // Compute distance vector between world anchor points

    worldAnchorB.vsub(worldAnchorA, r);
    var rlen = r.length();
    r_unit.copy(r);
    r_unit.normalize(); // Compute relative velocity of the anchor points, u

    bodyB.velocity.vsub(bodyA.velocity, u); // Add rotational velocity

    bodyB.angularVelocity.cross(rj, tmp);
    u.vadd(tmp, u);
    bodyA.angularVelocity.cross(ri, tmp);
    u.vsub(tmp, u); // F = - k * ( x - L ) - D * ( u )

    r_unit.scale(-k * (rlen - l) - d * u.dot(r_unit), f); // Add forces to bodies

    bodyA.force.vsub(f, bodyA.force);
    bodyB.force.vadd(f, bodyB.force); // Angular force

    ri.cross(f, ri_x_f);
    rj.cross(f, rj_x_f);
    bodyA.torque.vsub(ri_x_f, bodyA.torque);
    bodyB.torque.vadd(rj_x_f, bodyB.torque);
  };

  return Spring;
}();
var applyForce_r = new Vec3();
var applyForce_r_unit = new Vec3();
var applyForce_u = new Vec3();
var applyForce_f = new Vec3();
var applyForce_worldAnchorA = new Vec3();
var applyForce_worldAnchorB = new Vec3();
var applyForce_ri = new Vec3();
var applyForce_rj = new Vec3();
var applyForce_ri_x_f = new Vec3();
var applyForce_rj_x_f = new Vec3();
var applyForce_tmp = new Vec3();

/**
 * @class WheelInfo
 * @constructor
 * @param {Object} [options]
 *
 * @param {Vec3} [options.chassisConnectionPointLocal]
 * @param {Vec3} [options.chassisConnectionPointWorld]
 * @param {Vec3} [options.directionLocal]
 * @param {Vec3} [options.directionWorld]
 * @param {Vec3} [options.axleLocal]
 * @param {Vec3} [options.axleWorld]
 * @param {number} [options.suspensionRestLength=1]
 * @param {number} [options.suspensionMaxLength=2]
 * @param {number} [options.radius=1]
 * @param {number} [options.suspensionStiffness=100]
 * @param {number} [options.dampingCompression=10]
 * @param {number} [options.dampingRelaxation=10]
 * @param {number} [options.frictionSlip=10000]
 * @param {number} [options.steering=0]
 * @param {number} [options.rotation=0]
 * @param {number} [options.deltaRotation=0]
 * @param {number} [options.rollInfluence=0.01]
 * @param {number} [options.maxSuspensionForce]
 * @param {boolean} [options.isFrontWheel=true]
 * @param {number} [options.clippedInvContactDotSuspension=1]
 * @param {number} [options.suspensionRelativeVelocity=0]
 * @param {number} [options.suspensionForce=0]
 * @param {number} [options.skidInfo=0]
 * @param {number} [options.suspensionLength=0]
 * @param {number} [options.maxSuspensionTravel=1]
 * @param {boolean} [options.useCustomSlidingRotationalSpeed=false]
 * @param {number} [options.customSlidingRotationalSpeed=-0.1]
 */
var WheelInfo = /*#__PURE__*/function () {
  // Max travel distance of the suspension, in meters.
  // Speed to apply to the wheel rotation when the wheel is sliding.
  // If the customSlidingRotationalSpeed should be used.
  // Connection point, defined locally in the chassis body frame.
  // Rotation value, in radians.
  // The result from raycasting.
  // Wheel world transform.
  function WheelInfo(options) {
    if (options === void 0) {
      options = {};
    }

    options = Utils.defaults(options, {
      chassisConnectionPointLocal: new Vec3(),
      chassisConnectionPointWorld: new Vec3(),
      directionLocal: new Vec3(),
      directionWorld: new Vec3(),
      axleLocal: new Vec3(),
      axleWorld: new Vec3(),
      suspensionRestLength: 1,
      suspensionMaxLength: 2,
      radius: 1,
      suspensionStiffness: 100,
      dampingCompression: 10,
      dampingRelaxation: 10,
      frictionSlip: 10000,
      steering: 0,
      rotation: 0,
      deltaRotation: 0,
      rollInfluence: 0.01,
      maxSuspensionForce: Number.MAX_VALUE,
      isFrontWheel: true,
      clippedInvContactDotSuspension: 1,
      suspensionRelativeVelocity: 0,
      suspensionForce: 0,
      slipInfo: 0,
      skidInfo: 0,
      suspensionLength: 0,
      maxSuspensionTravel: 1,
      useCustomSlidingRotationalSpeed: false,
      customSlidingRotationalSpeed: -0.1
    });
    this.maxSuspensionTravel = options.maxSuspensionTravel;
    this.customSlidingRotationalSpeed = options.customSlidingRotationalSpeed;
    this.useCustomSlidingRotationalSpeed = options.useCustomSlidingRotationalSpeed;
    this.sliding = false;
    this.chassisConnectionPointLocal = options.chassisConnectionPointLocal.clone();
    this.chassisConnectionPointWorld = options.chassisConnectionPointWorld.clone();
    this.directionLocal = options.directionLocal.clone();
    this.directionWorld = options.directionWorld.clone();
    this.axleLocal = options.axleLocal.clone();
    this.axleWorld = options.axleWorld.clone();
    this.suspensionRestLength = options.suspensionRestLength;
    this.suspensionMaxLength = options.suspensionMaxLength;
    this.radius = options.radius;
    this.suspensionStiffness = options.suspensionStiffness;
    this.dampingCompression = options.dampingCompression;
    this.dampingRelaxation = options.dampingRelaxation;
    this.frictionSlip = options.frictionSlip;
    this.steering = 0;
    this.rotation = 0;
    this.deltaRotation = 0;
    this.rollInfluence = options.rollInfluence;
    this.maxSuspensionForce = options.maxSuspensionForce;
    this.engineForce = 0;
    this.brake = 0;
    this.isFrontWheel = options.isFrontWheel;
    this.clippedInvContactDotSuspension = 1;
    this.suspensionRelativeVelocity = 0;
    this.suspensionForce = 0;
    this.slipInfo = 0;
    this.skidInfo = 0;
    this.suspensionLength = 0;
    this.sideImpulse = 0;
    this.forwardImpulse = 0;
    this.raycastResult = new RaycastResult();
    this.worldTransform = new Transform();
    this.isInContact = false;
  }

  var _proto = WheelInfo.prototype;

  _proto.updateWheel = function updateWheel(chassis) {
    var raycastResult = this.raycastResult;

    if (this.isInContact) {
      var project = raycastResult.hitNormalWorld.dot(raycastResult.directionWorld);
      raycastResult.hitPointWorld.vsub(chassis.position, relpos);
      chassis.getVelocityAtWorldPoint(relpos, chassis_velocity_at_contactPoint);
      var projVel = raycastResult.hitNormalWorld.dot(chassis_velocity_at_contactPoint);

      if (project >= -0.1) {
        this.suspensionRelativeVelocity = 0.0;
        this.clippedInvContactDotSuspension = 1.0 / 0.1;
      } else {
        var inv = -1 / project;
        this.suspensionRelativeVelocity = projVel * inv;
        this.clippedInvContactDotSuspension = inv;
      }
    } else {
      // Not in contact : position wheel in a nice (rest length) position
      raycastResult.suspensionLength = this.suspensionRestLength;
      this.suspensionRelativeVelocity = 0.0;
      raycastResult.directionWorld.scale(-1, raycastResult.hitNormalWorld);
      this.clippedInvContactDotSuspension = 1.0;
    }
  };

  return WheelInfo;
}();
var chassis_velocity_at_contactPoint = new Vec3();
var relpos = new Vec3();

/**
 * Vehicle helper class that casts rays from the wheel positions towards the ground and applies forces.
 * @class RaycastVehicle
 * @constructor
 * @param {object} [options]
 * @param {Body} [options.chassisBody] The car chassis body.
 * @param {integer} [options.indexRightAxis] Axis to use for right. x=0, y=1, z=2
 * @param {integer} [options.indexLeftAxis]
 * @param {integer} [options.indexUpAxis]
 */
var RaycastVehicle = /*#__PURE__*/function () {
  // Will be set to true if the car is sliding.
  // Index of the right axis, 0=x, 1=y, 2=z
  // Index of the forward axis, 0=x, 1=y, 2=z
  // Index of the up axis, 0=x, 1=y, 2=z
  function RaycastVehicle(options) {
    this.chassisBody = options.chassisBody;
    this.wheelInfos = [];
    this.sliding = false;
    this.world = null;
    this.indexRightAxis = typeof options.indexRightAxis !== 'undefined' ? options.indexRightAxis : 1;
    this.indexForwardAxis = typeof options.indexForwardAxis !== 'undefined' ? options.indexForwardAxis : 0;
    this.indexUpAxis = typeof options.indexUpAxis !== 'undefined' ? options.indexUpAxis : 2;
    this.constraints = [];

    this.preStepCallback = function () {};

    this.currentVehicleSpeedKmHour = 0;
  }
  /**
   * Add a wheel. For information about the options, see WheelInfo.
   * @method addWheel
   * @param {object} [options]
   */


  var _proto = RaycastVehicle.prototype;

  _proto.addWheel = function addWheel(options) {
    if (options === void 0) {
      options = {};
    }

    var info = new WheelInfo(options);
    var index = this.wheelInfos.length;
    this.wheelInfos.push(info);
    return index;
  }
  /**
   * Set the steering value of a wheel.
   * @method setSteeringValue
   * @param {number} value
   * @param {integer} wheelIndex
   */
  ;

  _proto.setSteeringValue = function setSteeringValue(value, wheelIndex) {
    var wheel = this.wheelInfos[wheelIndex];
    wheel.steering = value;
  }
  /**
   * Set the wheel force to apply on one of the wheels each time step
   * @method applyEngineForce
   * @param  {number} value
   * @param  {integer} wheelIndex
   */
  ;

  _proto.applyEngineForce = function applyEngineForce(value, wheelIndex) {
    this.wheelInfos[wheelIndex].engineForce = value;
  }
  /**
   * Set the braking force of a wheel
   * @method setBrake
   * @param {number} brake
   * @param {integer} wheelIndex
   */
  ;

  _proto.setBrake = function setBrake(brake, wheelIndex) {
    this.wheelInfos[wheelIndex].brake = brake;
  }
  /**
   * Add the vehicle including its constraints to the world.
   * @method addToWorld
   * @param {World} world
   */
  ;

  _proto.addToWorld = function addToWorld(world) {
    var constraints = this.constraints;
    world.addBody(this.chassisBody);
    var that = this;

    this.preStepCallback = function () {
      that.updateVehicle(world.dt);
    };

    world.addEventListener('preStep', this.preStepCallback);
    this.world = world;
  }
  /**
   * Get one of the wheel axles, world-oriented.
   * @private
   * @method getVehicleAxisWorld
   * @param  {integer} axisIndex
   * @param  {Vec3} result
   */
  ;

  _proto.getVehicleAxisWorld = function getVehicleAxisWorld(axisIndex, result) {
    result.set(axisIndex === 0 ? 1 : 0, axisIndex === 1 ? 1 : 0, axisIndex === 2 ? 1 : 0);
    this.chassisBody.vectorToWorldFrame(result, result);
  };

  _proto.updateVehicle = function updateVehicle(timeStep) {
    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;
    var chassisBody = this.chassisBody;

    for (var i = 0; i < numWheels; i++) {
      this.updateWheelTransform(i);
    }

    this.currentVehicleSpeedKmHour = 3.6 * chassisBody.velocity.length();
    var forwardWorld = new Vec3();
    this.getVehicleAxisWorld(this.indexForwardAxis, forwardWorld);

    if (forwardWorld.dot(chassisBody.velocity) < 0) {
      this.currentVehicleSpeedKmHour *= -1;
    } // simulate suspension


    for (var _i = 0; _i < numWheels; _i++) {
      this.castRay(wheelInfos[_i]);
    }

    this.updateSuspension(timeStep);
    var impulse = new Vec3();
    var relpos = new Vec3();

    for (var _i2 = 0; _i2 < numWheels; _i2++) {
      //apply suspension force
      var wheel = wheelInfos[_i2];
      var suspensionForce = wheel.suspensionForce;

      if (suspensionForce > wheel.maxSuspensionForce) {
        suspensionForce = wheel.maxSuspensionForce;
      }

      wheel.raycastResult.hitNormalWorld.scale(suspensionForce * timeStep, impulse);
      wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, relpos);
      chassisBody.applyImpulse(impulse, relpos);
    }

    this.updateFriction(timeStep);
    var hitNormalWorldScaledWithProj = new Vec3();
    var fwd = new Vec3();
    var vel = new Vec3();

    for (var _i3 = 0; _i3 < numWheels; _i3++) {
      var _wheel = wheelInfos[_i3]; //const relpos = new Vec3();
      //wheel.chassisConnectionPointWorld.vsub(chassisBody.position, relpos);

      chassisBody.getVelocityAtWorldPoint(_wheel.chassisConnectionPointWorld, vel); // Hack to get the rotation in the correct direction

      var m = 1;

      switch (this.indexUpAxis) {
        case 1:
          m = -1;
          break;
      }

      if (_wheel.isInContact) {
        this.getVehicleAxisWorld(this.indexForwardAxis, fwd);
        var proj = fwd.dot(_wheel.raycastResult.hitNormalWorld);

        _wheel.raycastResult.hitNormalWorld.scale(proj, hitNormalWorldScaledWithProj);

        fwd.vsub(hitNormalWorldScaledWithProj, fwd);
        var proj2 = fwd.dot(vel);
        _wheel.deltaRotation = m * proj2 * timeStep / _wheel.radius;
      }

      if ((_wheel.sliding || !_wheel.isInContact) && _wheel.engineForce !== 0 && _wheel.useCustomSlidingRotationalSpeed) {
        // Apply custom rotation when accelerating and sliding
        _wheel.deltaRotation = (_wheel.engineForce > 0 ? 1 : -1) * _wheel.customSlidingRotationalSpeed * timeStep;
      } // Lock wheels


      if (Math.abs(_wheel.brake) > Math.abs(_wheel.engineForce)) {
        _wheel.deltaRotation = 0;
      }

      _wheel.rotation += _wheel.deltaRotation; // Use the old value

      _wheel.deltaRotation *= 0.99; // damping of rotation when not in contact
    }
  };

  _proto.updateSuspension = function updateSuspension(deltaTime) {
    var chassisBody = this.chassisBody;
    var chassisMass = chassisBody.mass;
    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;

    for (var w_it = 0; w_it < numWheels; w_it++) {
      var wheel = wheelInfos[w_it];

      if (wheel.isInContact) {
        var force = void 0; // Spring

        var susp_length = wheel.suspensionRestLength;
        var current_length = wheel.suspensionLength;
        var length_diff = susp_length - current_length;
        force = wheel.suspensionStiffness * length_diff * wheel.clippedInvContactDotSuspension; // Damper

        var projected_rel_vel = wheel.suspensionRelativeVelocity;
        var susp_damping = void 0;

        if (projected_rel_vel < 0) {
          susp_damping = wheel.dampingCompression;
        } else {
          susp_damping = wheel.dampingRelaxation;
        }

        force -= susp_damping * projected_rel_vel;
        wheel.suspensionForce = force * chassisMass;

        if (wheel.suspensionForce < 0) {
          wheel.suspensionForce = 0;
        }
      } else {
        wheel.suspensionForce = 0;
      }
    }
  }
  /**
   * Remove the vehicle including its constraints from the world.
   * @method removeFromWorld
   * @param {World} world
   */
  ;

  _proto.removeFromWorld = function removeFromWorld(world) {
    var constraints = this.constraints;
    world.removeBody(this.chassisBody);
    world.removeEventListener('preStep', this.preStepCallback);
    this.world = null;
  };

  _proto.castRay = function castRay(wheel) {
    var rayvector = castRay_rayvector;
    var target = castRay_target;
    this.updateWheelTransformWorld(wheel);
    var chassisBody = this.chassisBody;
    var depth = -1;
    var raylen = wheel.suspensionRestLength + wheel.radius;
    wheel.directionWorld.scale(raylen, rayvector);
    var source = wheel.chassisConnectionPointWorld;
    source.vadd(rayvector, target);
    var raycastResult = wheel.raycastResult;
    raycastResult.reset(); // Turn off ray collision with the chassis temporarily

    var oldState = chassisBody.collisionResponse;
    chassisBody.collisionResponse = false; // Cast ray against world

    this.world.rayTest(source, target, raycastResult);
    chassisBody.collisionResponse = oldState;
    var object = raycastResult.body;
    wheel.raycastResult.groundObject = 0;

    if (object) {
      depth = raycastResult.distance;
      wheel.raycastResult.hitNormalWorld = raycastResult.hitNormalWorld;
      wheel.isInContact = true;
      var hitDistance = raycastResult.distance;
      wheel.suspensionLength = hitDistance - wheel.radius; // clamp on max suspension travel

      var minSuspensionLength = wheel.suspensionRestLength - wheel.maxSuspensionTravel;
      var maxSuspensionLength = wheel.suspensionRestLength + wheel.maxSuspensionTravel;

      if (wheel.suspensionLength < minSuspensionLength) {
        wheel.suspensionLength = minSuspensionLength;
      }

      if (wheel.suspensionLength > maxSuspensionLength) {
        wheel.suspensionLength = maxSuspensionLength;
        wheel.raycastResult.reset();
      }

      var denominator = wheel.raycastResult.hitNormalWorld.dot(wheel.directionWorld);
      var chassis_velocity_at_contactPoint = new Vec3();
      chassisBody.getVelocityAtWorldPoint(wheel.raycastResult.hitPointWorld, chassis_velocity_at_contactPoint);
      var projVel = wheel.raycastResult.hitNormalWorld.dot(chassis_velocity_at_contactPoint);

      if (denominator >= -0.1) {
        wheel.suspensionRelativeVelocity = 0;
        wheel.clippedInvContactDotSuspension = 1 / 0.1;
      } else {
        var inv = -1 / denominator;
        wheel.suspensionRelativeVelocity = projVel * inv;
        wheel.clippedInvContactDotSuspension = inv;
      }
    } else {
      //put wheel info as in rest position
      wheel.suspensionLength = wheel.suspensionRestLength + 0 * wheel.maxSuspensionTravel;
      wheel.suspensionRelativeVelocity = 0.0;
      wheel.directionWorld.scale(-1, wheel.raycastResult.hitNormalWorld);
      wheel.clippedInvContactDotSuspension = 1.0;
    }

    return depth;
  };

  _proto.updateWheelTransformWorld = function updateWheelTransformWorld(wheel) {
    wheel.isInContact = false;
    var chassisBody = this.chassisBody;
    chassisBody.pointToWorldFrame(wheel.chassisConnectionPointLocal, wheel.chassisConnectionPointWorld);
    chassisBody.vectorToWorldFrame(wheel.directionLocal, wheel.directionWorld);
    chassisBody.vectorToWorldFrame(wheel.axleLocal, wheel.axleWorld);
  }
  /**
   * Update one of the wheel transform.
   * Note when rendering wheels: during each step, wheel transforms are updated BEFORE the chassis; ie. their position becomes invalid after the step. Thus when you render wheels, you must update wheel transforms before rendering them. See raycastVehicle demo for an example.
   * @method updateWheelTransform
   * @param {integer} wheelIndex The wheel index to update.
   */
  ;

  _proto.updateWheelTransform = function updateWheelTransform(wheelIndex) {
    var up = tmpVec4;
    var right = tmpVec5;
    var fwd = tmpVec6;
    var wheel = this.wheelInfos[wheelIndex];
    this.updateWheelTransformWorld(wheel);
    wheel.directionLocal.scale(-1, up);
    right.copy(wheel.axleLocal);
    up.cross(right, fwd);
    fwd.normalize();
    right.normalize(); // Rotate around steering over the wheelAxle

    var steering = wheel.steering;
    var steeringOrn = new Quaternion();
    steeringOrn.setFromAxisAngle(up, steering);
    var rotatingOrn = new Quaternion();
    rotatingOrn.setFromAxisAngle(right, wheel.rotation); // World rotation of the wheel

    var q = wheel.worldTransform.quaternion;
    this.chassisBody.quaternion.mult(steeringOrn, q);
    q.mult(rotatingOrn, q);
    q.normalize(); // world position of the wheel

    var p = wheel.worldTransform.position;
    p.copy(wheel.directionWorld);
    p.scale(wheel.suspensionLength, p);
    p.vadd(wheel.chassisConnectionPointWorld, p);
  }
  /**
   * Get the world transform of one of the wheels
   * @method getWheelTransformWorld
   * @param  {integer} wheelIndex
   * @return {Transform}
   */
  ;

  _proto.getWheelTransformWorld = function getWheelTransformWorld(wheelIndex) {
    return this.wheelInfos[wheelIndex].worldTransform;
  };

  _proto.updateFriction = function updateFriction(timeStep) {
    var surfNormalWS_scaled_proj = updateFriction_surfNormalWS_scaled_proj; //calculate the impulse, so that the wheels don't move sidewards

    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;
    var chassisBody = this.chassisBody;
    var forwardWS = updateFriction_forwardWS;
    var axle = updateFriction_axle;

    for (var i = 0; i < numWheels; i++) {
      var wheel = wheelInfos[i];
      var groundObject = wheel.raycastResult.body;

      wheel.sideImpulse = 0;
      wheel.forwardImpulse = 0;

      if (!forwardWS[i]) {
        forwardWS[i] = new Vec3();
      }

      if (!axle[i]) {
        axle[i] = new Vec3();
      }
    }

    for (var _i4 = 0; _i4 < numWheels; _i4++) {
      var _wheel2 = wheelInfos[_i4];
      var _groundObject = _wheel2.raycastResult.body;

      if (_groundObject) {
        var axlei = axle[_i4];
        var wheelTrans = this.getWheelTransformWorld(_i4); // Get world axle

        wheelTrans.vectorToWorldFrame(directions[this.indexRightAxis], axlei);
        var surfNormalWS = _wheel2.raycastResult.hitNormalWorld;
        var proj = axlei.dot(surfNormalWS);
        surfNormalWS.scale(proj, surfNormalWS_scaled_proj);
        axlei.vsub(surfNormalWS_scaled_proj, axlei);
        axlei.normalize();
        surfNormalWS.cross(axlei, forwardWS[_i4]);

        forwardWS[_i4].normalize();

        _wheel2.sideImpulse = resolveSingleBilateral(chassisBody, _wheel2.raycastResult.hitPointWorld, _groundObject, _wheel2.raycastResult.hitPointWorld, axlei);
        _wheel2.sideImpulse *= sideFrictionStiffness2;
      }
    }

    var sideFactor = 1;
    var fwdFactor = 0.5;
    this.sliding = false;

    for (var _i5 = 0; _i5 < numWheels; _i5++) {
      var _wheel3 = wheelInfos[_i5];
      var _groundObject2 = _wheel3.raycastResult.body;
      var rollingFriction = 0;
      _wheel3.slipInfo = 1;

      if (_groundObject2) {
        var defaultRollingFrictionImpulse = 0;
        var maxImpulse = _wheel3.brake ? _wheel3.brake : defaultRollingFrictionImpulse; // btWheelContactPoint contactPt(chassisBody,groundObject,wheelInfraycastInfo.hitPointWorld,forwardWS[wheel],maxImpulse);
        // rollingFriction = calcRollingFriction(contactPt);

        rollingFriction = calcRollingFriction(chassisBody, _groundObject2, _wheel3.raycastResult.hitPointWorld, forwardWS[_i5], maxImpulse);
        rollingFriction += _wheel3.engineForce * timeStep; // rollingFriction = 0;

        var factor = maxImpulse / rollingFriction;
        _wheel3.slipInfo *= factor;
      } //switch between active rolling (throttle), braking and non-active rolling friction (nthrottle/break)


      _wheel3.forwardImpulse = 0;
      _wheel3.skidInfo = 1;

      if (_groundObject2) {
        _wheel3.skidInfo = 1;
        var maximp = _wheel3.suspensionForce * timeStep * _wheel3.frictionSlip;
        var maximpSide = maximp;
        var maximpSquared = maximp * maximpSide;
        _wheel3.forwardImpulse = rollingFriction; //wheelInfo.engineForce* timeStep;

        var x = _wheel3.forwardImpulse * fwdFactor;
        var y = _wheel3.sideImpulse * sideFactor;
        var impulseSquared = x * x + y * y;
        _wheel3.sliding = false;

        if (impulseSquared > maximpSquared) {
          this.sliding = true;
          _wheel3.sliding = true;

          var _factor = maximp / Math.sqrt(impulseSquared);

          _wheel3.skidInfo *= _factor;
        }
      }
    }

    if (this.sliding) {
      for (var _i6 = 0; _i6 < numWheels; _i6++) {
        var _wheel4 = wheelInfos[_i6];

        if (_wheel4.sideImpulse !== 0) {
          if (_wheel4.skidInfo < 1) {
            _wheel4.forwardImpulse *= _wheel4.skidInfo;
            _wheel4.sideImpulse *= _wheel4.skidInfo;
          }
        }
      }
    } // apply the impulses


    for (var _i7 = 0; _i7 < numWheels; _i7++) {
      var _wheel5 = wheelInfos[_i7];
      var rel_pos = new Vec3();

      _wheel5.raycastResult.hitPointWorld.vsub(chassisBody.position, rel_pos); // cannons applyimpulse is using world coord for the position
      //rel_pos.copy(wheel.raycastResult.hitPointWorld);


      if (_wheel5.forwardImpulse !== 0) {
        var impulse = new Vec3();

        forwardWS[_i7].scale(_wheel5.forwardImpulse, impulse);

        chassisBody.applyImpulse(impulse, rel_pos);
      }

      if (_wheel5.sideImpulse !== 0) {
        var _groundObject3 = _wheel5.raycastResult.body;
        var rel_pos2 = new Vec3();

        _wheel5.raycastResult.hitPointWorld.vsub(_groundObject3.position, rel_pos2); //rel_pos2.copy(wheel.raycastResult.hitPointWorld);


        var sideImp = new Vec3();

        axle[_i7].scale(_wheel5.sideImpulse, sideImp); // Scale the relative position in the up direction with rollInfluence.
        // If rollInfluence is 1, the impulse will be applied on the hitPoint (easy to roll over), if it is zero it will be applied in the same plane as the center of mass (not easy to roll over).


        chassisBody.vectorToLocalFrame(rel_pos, rel_pos);
        rel_pos['xyz'[this.indexUpAxis]] *= _wheel5.rollInfluence;
        chassisBody.vectorToWorldFrame(rel_pos, rel_pos);
        chassisBody.applyImpulse(sideImp, rel_pos); //apply friction impulse on the ground

        sideImp.scale(-1, sideImp);

        _groundObject3.applyImpulse(sideImp, rel_pos2);
      }
    }
  };

  return RaycastVehicle;
}();
var tmpVec1$2 = new Vec3();
var tmpVec2$2 = new Vec3();
var tmpVec3 = new Vec3();
var tmpVec4 = new Vec3();
var tmpVec5 = new Vec3();
var tmpVec6 = new Vec3();
var tmpRay = new Ray();
var torque = new Vec3();
var castRay_rayvector = new Vec3();
var castRay_target = new Vec3();
var directions = [new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1)];
var updateFriction_surfNormalWS_scaled_proj = new Vec3();
var updateFriction_axle = [];
var updateFriction_forwardWS = [];
var sideFrictionStiffness2 = 1;
var calcRollingFriction_vel1 = new Vec3();
var calcRollingFriction_vel2 = new Vec3();
var calcRollingFriction_vel = new Vec3();

function calcRollingFriction(body0, body1, frictionPosWorld, frictionDirectionWorld, maxImpulse) {
  var j1 = 0;
  var contactPosWorld = frictionPosWorld; // const rel_pos1 = new Vec3();
  // const rel_pos2 = new Vec3();

  var vel1 = calcRollingFriction_vel1;
  var vel2 = calcRollingFriction_vel2;
  var vel = calcRollingFriction_vel; // contactPosWorld.vsub(body0.position, rel_pos1);
  // contactPosWorld.vsub(body1.position, rel_pos2);

  body0.getVelocityAtWorldPoint(contactPosWorld, vel1);
  body1.getVelocityAtWorldPoint(contactPosWorld, vel2);
  vel1.vsub(vel2, vel);
  var vrel = frictionDirectionWorld.dot(vel);
  var denom0 = computeImpulseDenominator(body0, frictionPosWorld, frictionDirectionWorld);
  var denom1 = computeImpulseDenominator(body1, frictionPosWorld, frictionDirectionWorld);
  var relaxation = 1;
  var jacDiagABInv = relaxation / (denom0 + denom1); // calculate j that moves us to zero relative velocity

  j1 = -vrel * jacDiagABInv;

  if (maxImpulse < j1) {
    j1 = maxImpulse;
  }

  if (j1 < -maxImpulse) {
    j1 = -maxImpulse;
  }

  return j1;
}

var computeImpulseDenominator_r0 = new Vec3();
var computeImpulseDenominator_c0 = new Vec3();
var computeImpulseDenominator_vec = new Vec3();
var computeImpulseDenominator_m = new Vec3();

function computeImpulseDenominator(body, pos, normal) {
  var r0 = computeImpulseDenominator_r0;
  var c0 = computeImpulseDenominator_c0;
  var vec = computeImpulseDenominator_vec;
  var m = computeImpulseDenominator_m;
  pos.vsub(body.position, r0);
  r0.cross(normal, c0);
  body.invInertiaWorld.vmult(c0, m);
  m.cross(r0, vec);
  return body.invMass + normal.dot(vec);
}

var resolveSingleBilateral_vel1 = new Vec3();
var resolveSingleBilateral_vel2 = new Vec3();
var resolveSingleBilateral_vel = new Vec3(); //bilateral constraint between two dynamic objects

function resolveSingleBilateral(body1, pos1, body2, pos2, normal) {
  var normalLenSqr = normal.lengthSquared();

  if (normalLenSqr > 1.1) {
    return 0; // no impulse
  } // const rel_pos1 = new Vec3();
  // const rel_pos2 = new Vec3();
  // pos1.vsub(body1.position, rel_pos1);
  // pos2.vsub(body2.position, rel_pos2);


  var vel1 = resolveSingleBilateral_vel1;
  var vel2 = resolveSingleBilateral_vel2;
  var vel = resolveSingleBilateral_vel;
  body1.getVelocityAtWorldPoint(pos1, vel1);
  body2.getVelocityAtWorldPoint(pos2, vel2);
  vel1.vsub(vel2, vel);
  var rel_vel = normal.dot(vel);
  var contactDamping = 0.2;
  var massTerm = 1 / (body1.invMass + body2.invMass);
  var impulse = -contactDamping * rel_vel * massTerm;
  return impulse;
}

/**
 * Spherical shape
 * @class Sphere
 * @constructor
 * @extends Shape
 * @param {Number} radius The radius of the sphere, a non-negative number.
 * @author schteppe / http://github.com/schteppe
 */
var Sphere = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Sphere, _Shape);

  function Sphere(radius) {
    var _this;

    _this = _Shape.call(this, {
      type: Shape.types.SPHERE
    }) || this;
    _this.radius = radius !== undefined ? radius : 1.0;

    if (_this.radius < 0) {
      throw new Error('The sphere radius cannot be negative.');
    }

    _this.updateBoundingSphereRadius();

    return _this;
  }

  var _proto = Sphere.prototype;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    var I = 2.0 * mass * this.radius * this.radius / 5.0;
    target.x = I;
    target.y = I;
    target.z = I;
    return target;
  };

  _proto.volume = function volume() {
    return 4.0 * Math.PI * Math.pow(this.radius, 3) / 3.0;
  };

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    this.boundingSphereRadius = this.radius;
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    var r = this.radius;
    var axes = ['x', 'y', 'z'];

    for (var i = 0; i < axes.length; i++) {
      var ax = axes[i];
      min[ax] = pos[ax] - r;
      max[ax] = pos[ax] + r;
    }
  };

  return Sphere;
}(Shape);

/**
 * Simple vehicle helper class with spherical rigid body wheels.
 * @class RigidVehicle
 * @constructor
 * @param {Body} [options.chassisBody]
 */
var RigidVehicle = /*#__PURE__*/function () {
  function RigidVehicle(options) {
    if (options === void 0) {
      options = {};
    }

    this.wheelBodies = [];
    this.coordinateSystem = typeof options.coordinateSystem !== 'undefined' ? options.coordinateSystem.clone() : new Vec3(1, 2, 3);

    if (options.chassisBody) {
      this.chassisBody = options.chassisBody;
    } else {
      // No chassis body given. Create it!
      this.chassisBody = new Body({
        mass: 1,
        shape: new Box(new Vec3(5, 2, 0.5))
      });
    }

    this.constraints = [];
    this.wheelAxes = [];
    this.wheelForces = [];
  }
  /**
   * Add a wheel
   * @method addWheel
   * @param {object} options
   * @param {boolean} [options.isFrontWheel]
   * @param {Vec3} [options.position] Position of the wheel, locally in the chassis body.
   * @param {Vec3} [options.direction] Slide direction of the wheel along the suspension.
   * @param {Vec3} [options.axis] Axis of rotation of the wheel, locally defined in the chassis.
   * @param {Body} [options.body] The wheel body.
   */


  var _proto = RigidVehicle.prototype;

  _proto.addWheel = function addWheel(options) {
    if (options === void 0) {
      options = {};
    }

    var wheelBody;

    if (options.body) {
      wheelBody = options.body;
    } else {
      // No wheel body given. Create it!
      wheelBody = new Body({
        mass: 1,
        shape: new Sphere(1.2)
      });
    }

    this.wheelBodies.push(wheelBody);
    this.wheelForces.push(0); // Position constrain wheels

    var zero = new Vec3();
    var position = typeof options.position !== 'undefined' ? options.position.clone() : new Vec3(); // Set position locally to the chassis

    var worldPosition = new Vec3();
    this.chassisBody.pointToWorldFrame(position, worldPosition);
    wheelBody.position.set(worldPosition.x, worldPosition.y, worldPosition.z); // Constrain wheel

    var axis = typeof options.axis !== 'undefined' ? options.axis.clone() : new Vec3(0, 1, 0);
    this.wheelAxes.push(axis);
    var hingeConstraint = new HingeConstraint(this.chassisBody, wheelBody, {
      pivotA: position,
      axisA: axis,
      pivotB: Vec3.ZERO,
      axisB: axis,
      collideConnected: false
    });
    this.constraints.push(hingeConstraint);
    return this.wheelBodies.length - 1;
  }
  /**
   * Set the steering value of a wheel.
   * @method setSteeringValue
   * @param {number} value
   * @param {integer} wheelIndex
   * @todo check coordinateSystem
   */
  ;

  _proto.setSteeringValue = function setSteeringValue(value, wheelIndex) {
    // Set angle of the hinge axis
    var axis = this.wheelAxes[wheelIndex];
    var c = Math.cos(value);
    var s = Math.sin(value);
    var x = axis.x;
    var y = axis.y;
    this.constraints[wheelIndex].axisA.set(c * x - s * y, s * x + c * y, 0);
  }
  /**
   * Set the target rotational speed of the hinge constraint.
   * @method setMotorSpeed
   * @param {number} value
   * @param {integer} wheelIndex
   */
  ;

  _proto.setMotorSpeed = function setMotorSpeed(value, wheelIndex) {
    var hingeConstraint = this.constraints[wheelIndex];
    hingeConstraint.enableMotor();
    hingeConstraint.motorTargetVelocity = value;
  }
  /**
   * Set the target rotational speed of the hinge constraint.
   * @method disableMotor
   * @param {number} value
   * @param {integer} wheelIndex
   */
  ;

  _proto.disableMotor = function disableMotor(wheelIndex) {
    var hingeConstraint = this.constraints[wheelIndex];
    hingeConstraint.disableMotor();
  }
  /**
   * Set the wheel force to apply on one of the wheels each time step
   * @method setWheelForce
   * @param  {number} value
   * @param  {integer} wheelIndex
   */
  ;

  _proto.setWheelForce = function setWheelForce(value, wheelIndex) {
    this.wheelForces[wheelIndex] = value;
  }
  /**
   * Apply a torque on one of the wheels.
   * @method applyWheelForce
   * @param  {number} value
   * @param  {integer} wheelIndex
   */
  ;

  _proto.applyWheelForce = function applyWheelForce(value, wheelIndex) {
    var axis = this.wheelAxes[wheelIndex];
    var wheelBody = this.wheelBodies[wheelIndex];
    var bodyTorque = wheelBody.torque;
    axis.scale(value, torque$1);
    wheelBody.vectorToWorldFrame(torque$1, torque$1);
    bodyTorque.vadd(torque$1, bodyTorque);
  }
  /**
   * Add the vehicle including its constraints to the world.
   * @method addToWorld
   * @param {World} world
   */
  ;

  _proto.addToWorld = function addToWorld(world) {
    var constraints = this.constraints;
    var bodies = this.wheelBodies.concat([this.chassisBody]);

    for (var i = 0; i < bodies.length; i++) {
      world.addBody(bodies[i]);
    }

    for (var _i = 0; _i < constraints.length; _i++) {
      world.addConstraint(constraints[_i]);
    }

    world.addEventListener('preStep', this._update.bind(this));
  };

  _proto._update = function _update() {
    var wheelForces = this.wheelForces;

    for (var i = 0; i < wheelForces.length; i++) {
      this.applyWheelForce(wheelForces[i], i);
    }
  }
  /**
   * Remove the vehicle including its constraints from the world.
   * @method removeFromWorld
   * @param {World} world
   */
  ;

  _proto.removeFromWorld = function removeFromWorld(world) {
    var constraints = this.constraints;
    var bodies = this.wheelBodies.concat([this.chassisBody]);

    for (var i = 0; i < bodies.length; i++) {
      world.removeBody(bodies[i]);
    }

    for (var _i2 = 0; _i2 < constraints.length; _i2++) {
      world.removeConstraint(constraints[_i2]);
    }
  }
  /**
   * Get current rotational velocity of a wheel
   * @method getWheelSpeed
   * @param {integer} wheelIndex
   */
  ;

  _proto.getWheelSpeed = function getWheelSpeed(wheelIndex) {
    var axis = this.wheelAxes[wheelIndex];
    var wheelBody = this.wheelBodies[wheelIndex];
    var w = wheelBody.angularVelocity;
    this.chassisBody.vectorToWorldFrame(axis, worldAxis);
    return w.dot(worldAxis);
  };

  return RigidVehicle;
}();
var torque$1 = new Vec3();
var worldAxis = new Vec3();

/**
 * Smoothed-particle hydrodynamics system
 * @class SPHSystem
 * @constructor
 */
var SPHSystem = /*#__PURE__*/function () {
  // Density of the system (kg/m3).
  // Distance below which two particles are considered to be neighbors. It should be adjusted so there are about 15-20 neighbor particles within this radius.
  // Viscosity of the system.
  function SPHSystem() {
    this.particles = [];
    this.density = 1;
    this.smoothingRadius = 1;
    this.speedOfSound = 1;
    this.viscosity = 0.01;
    this.eps = 0.000001; // Stuff Computed per particle

    this.pressures = [];
    this.densities = [];
    this.neighbors = [];
  }
  /**
   * Add a particle to the system.
   * @method add
   * @param {Body} particle
   */


  var _proto = SPHSystem.prototype;

  _proto.add = function add(particle) {
    this.particles.push(particle);

    if (this.neighbors.length < this.particles.length) {
      this.neighbors.push([]);
    }
  }
  /**
   * Remove a particle from the system.
   * @method remove
   * @param {Body} particle
   */
  ;

  _proto.remove = function remove(particle) {
    var idx = this.particles.indexOf(particle);

    if (idx !== -1) {
      this.particles.splice(idx, 1);

      if (this.neighbors.length > this.particles.length) {
        this.neighbors.pop();
      }
    }
  };

  _proto.getNeighbors = function getNeighbors(particle, neighbors) {
    var N = this.particles.length;
    var id = particle.id;
    var R2 = this.smoothingRadius * this.smoothingRadius;
    var dist = SPHSystem_getNeighbors_dist;

    for (var i = 0; i !== N; i++) {
      var p = this.particles[i];
      p.position.vsub(particle.position, dist);

      if (id !== p.id && dist.lengthSquared() < R2) {
        neighbors.push(p);
      }
    }
  };

  _proto.update = function update() {
    var N = this.particles.length;
    var dist = SPHSystem_update_dist;
    var cs = this.speedOfSound;
    var eps = this.eps;

    for (var i = 0; i !== N; i++) {
      var p = this.particles[i]; // Current particle

      var neighbors = this.neighbors[i]; // Get neighbors

      neighbors.length = 0;
      this.getNeighbors(p, neighbors);
      neighbors.push(this.particles[i]); // Add current too

      var numNeighbors = neighbors.length; // Accumulate density for the particle

      var sum = 0.0;

      for (var j = 0; j !== numNeighbors; j++) {
        //printf("Current particle has position %f %f %f\n",objects[id].pos.x(),objects[id].pos.y(),objects[id].pos.z());
        p.position.vsub(neighbors[j].position, dist);
        var len = dist.length();
        var weight = this.w(len);
        sum += neighbors[j].mass * weight;
      } // Save


      this.densities[i] = sum;
      this.pressures[i] = cs * cs * (this.densities[i] - this.density);
    } // Add forces
    // Sum to these accelerations


    var a_pressure = SPHSystem_update_a_pressure;
    var a_visc = SPHSystem_update_a_visc;
    var gradW = SPHSystem_update_gradW;
    var r_vec = SPHSystem_update_r_vec;
    var u = SPHSystem_update_u;

    for (var _i = 0; _i !== N; _i++) {
      var particle = this.particles[_i];
      a_pressure.set(0, 0, 0);
      a_visc.set(0, 0, 0); // Init vars

      var Pij = void 0;
      var nabla = void 0;

      var _neighbors = this.neighbors[_i];
      var _numNeighbors = _neighbors.length; //printf("Neighbors: ");

      for (var _j = 0; _j !== _numNeighbors; _j++) {
        var neighbor = _neighbors[_j]; //printf("%d ",nj);
        // Get r once for all..

        particle.position.vsub(neighbor.position, r_vec);
        var r = r_vec.length(); // Pressure contribution

        Pij = -neighbor.mass * (this.pressures[_i] / (this.densities[_i] * this.densities[_i] + eps) + this.pressures[_j] / (this.densities[_j] * this.densities[_j] + eps));
        this.gradw(r_vec, gradW); // Add to pressure acceleration

        gradW.scale(Pij, gradW);
        a_pressure.vadd(gradW, a_pressure); // Viscosity contribution

        neighbor.velocity.vsub(particle.velocity, u);
        u.scale(1.0 / (0.0001 + this.densities[_i] * this.densities[_j]) * this.viscosity * neighbor.mass, u);
        nabla = this.nablaw(r);
        u.scale(nabla, u); // Add to viscosity acceleration

        a_visc.vadd(u, a_visc);
      } // Calculate force


      a_visc.scale(particle.mass, a_visc);
      a_pressure.scale(particle.mass, a_pressure); // Add force to particles

      particle.force.vadd(a_visc, particle.force);
      particle.force.vadd(a_pressure, particle.force);
    }
  } // Calculate the weight using the W(r) weightfunction
  ;

  _proto.w = function w(r) {
    // 315
    var h = this.smoothingRadius;
    return 315.0 / (64.0 * Math.PI * Math.pow(h, 9)) * Math.pow(h * h - r * r, 3);
  } // calculate gradient of the weight function
  ;

  _proto.gradw = function gradw(rVec, resultVec) {
    var r = rVec.length();
    var h = this.smoothingRadius;
    rVec.scale(945.0 / (32.0 * Math.PI * Math.pow(h, 9)) * Math.pow(h * h - r * r, 2), resultVec);
  } // Calculate nabla(W)
  ;

  _proto.nablaw = function nablaw(r) {
    var h = this.smoothingRadius;
    var nabla = 945.0 / (32.0 * Math.PI * Math.pow(h, 9)) * (h * h - r * r) * (7 * r * r - 3 * h * h);
    return nabla;
  };

  return SPHSystem;
}();
/**
 * Get neighbors within smoothing volume, save in the array neighbors
 * @method getNeighbors
 * @param {Body} particle
 * @param {Array} neighbors
 */

var SPHSystem_getNeighbors_dist = new Vec3(); // Temp vectors for calculation

var SPHSystem_update_dist = new Vec3(); // Relative velocity

var SPHSystem_update_a_pressure = new Vec3();
var SPHSystem_update_a_visc = new Vec3();
var SPHSystem_update_gradW = new Vec3();
var SPHSystem_update_r_vec = new Vec3();
var SPHSystem_update_u = new Vec3();

/**
 * @class Cylinder
 * @constructor
 * @extends ConvexPolyhedron
 * @author schteppe / https://github.com/schteppe
 * @param {Number} radiusTop
 * @param {Number} radiusBottom
 * @param {Number} height
 * @param {Number} numSegments The number of segments to build the cylinder out of
 */

var Cylinder = /*#__PURE__*/function (_ConvexPolyhedron) {
  _inheritsLoose(Cylinder, _ConvexPolyhedron);

  function Cylinder(radiusTop, radiusBottom, height, numSegments) {
    var N = numSegments;
    var vertices = [];
    var axes = [];
    var faces = [];
    var bottomface = [];
    var topface = [];
    var cos = Math.cos;
    var sin = Math.sin; // First bottom point

    vertices.push(new Vec3(radiusBottom * cos(0), radiusBottom * sin(0), -height * 0.5));
    bottomface.push(0); // First top point

    vertices.push(new Vec3(radiusTop * cos(0), radiusTop * sin(0), height * 0.5));
    topface.push(1);

    for (var i = 0; i < N; i++) {
      var theta = 2 * Math.PI / N * (i + 1);
      var thetaN = 2 * Math.PI / N * (i + 0.5);

      if (i < N - 1) {
        // Bottom
        vertices.push(new Vec3(radiusBottom * cos(theta), radiusBottom * sin(theta), -height * 0.5));
        bottomface.push(2 * i + 2); // Top

        vertices.push(new Vec3(radiusTop * cos(theta), radiusTop * sin(theta), height * 0.5));
        topface.push(2 * i + 3); // Face

        faces.push([2 * i + 2, 2 * i + 3, 2 * i + 1, 2 * i]);
      } else {
        faces.push([0, 1, 2 * i + 1, 2 * i]); // Connect
      } // Axis: we can cut off half of them if we have even number of segments


      if (N % 2 === 1 || i < N / 2) {
        axes.push(new Vec3(cos(thetaN), sin(thetaN), 0));
      }
    }

    faces.push(topface);
    axes.push(new Vec3(0, 0, 1)); // Reorder bottom face

    var temp = [];

    for (var _i = 0; _i < bottomface.length; _i++) {
      temp.push(bottomface[bottomface.length - _i - 1]);
    }

    faces.push(temp);
    return _ConvexPolyhedron.call(this, {
      vertices: vertices,
      faces: faces,
      axes: axes
    }) || this;
  }

  return Cylinder;
}(ConvexPolyhedron);

/**
 * Particle shape.
 * @class Particle
 * @constructor
 * @author schteppe
 * @extends Shape
 */
var Particle = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Particle, _Shape);

  function Particle() {
    return _Shape.call(this, {
      type: Shape.types.PARTICLE
    }) || this;
  }
  /**
   * @method calculateLocalInertia
   * @param  {Number} mass
   * @param  {Vec3} target
   * @return {Vec3}
   */


  var _proto = Particle.prototype;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    target.set(0, 0, 0);
    return target;
  };

  _proto.volume = function volume() {
    return 0;
  };

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    this.boundingSphereRadius = 0;
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    // Get each axis max
    min.copy(pos);
    max.copy(pos);
  };

  return Particle;
}(Shape);

/**
 * A plane, facing in the Z direction. The plane has its surface at z=0 and everything below z=0 is assumed to be solid plane. To make the plane face in some other direction than z, you must put it inside a Body and rotate that body. See the demos.
 * @class Plane
 * @constructor
 * @extends Shape
 * @author schteppe
 */
var Plane = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Plane, _Shape);

  function Plane() {
    var _this;

    _this = _Shape.call(this, {
      type: Shape.types.PLANE
    }) || this; // World oriented normal

    _this.worldNormal = new Vec3();
    _this.worldNormalNeedsUpdate = true;
    _this.boundingSphereRadius = Number.MAX_VALUE;
    return _this;
  }

  var _proto = Plane.prototype;

  _proto.computeWorldNormal = function computeWorldNormal(quat) {
    var n = this.worldNormal;
    n.set(0, 0, 1);
    quat.vmult(n, n);
    this.worldNormalNeedsUpdate = false;
  };

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    return target;
  };

  _proto.volume = function volume() {
    return (// The plane is infinite...
      Number.MAX_VALUE
    );
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    // The plane AABB is infinite, except if the normal is pointing along any axis
    tempNormal.set(0, 0, 1); // Default plane normal is z

    quat.vmult(tempNormal, tempNormal);
    var maxVal = Number.MAX_VALUE;
    min.set(-maxVal, -maxVal, -maxVal);
    max.set(maxVal, maxVal, maxVal);

    if (tempNormal.x === 1) {
      max.x = pos.x;
    } else if (tempNormal.x === -1) {
      min.x = pos.x;
    }

    if (tempNormal.y === 1) {
      max.y = pos.y;
    } else if (tempNormal.y === -1) {
      min.y = pos.y;
    }

    if (tempNormal.z === 1) {
      max.z = pos.z;
    } else if (tempNormal.z === -1) {
      min.z = pos.z;
    }
  };

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    this.boundingSphereRadius = Number.MAX_VALUE;
  };

  return Plane;
}(Shape);
var tempNormal = new Vec3();

/**
 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a given distance.
 * @class Heightfield
 * @extends Shape
 * @constructor
 * @param {Array} data An array of Y values that will be used to construct the terrain.
 * @param {object} options
 * @param {Number} [options.minValue] Minimum value of the data points in the data array. Will be computed automatically if not given.
 * @param {Number} [options.maxValue] Maximum value.
 * @param {Number} [options.elementSize=0.1] World spacing between the data points in X direction.
 * @todo Should be possible to use along all axes, not just y
 * @todo should be possible to scale along all axes
 * @todo Refactor elementSize to elementSizeX and elementSizeY
 *
 * @example
 *     // Generate some height data (y-values).
 *     const data = [];
 *     for(let i = 0; i < 1000; i++){
 *         const y = 0.5 * Math.cos(0.2 * i);
 *         data.push(y);
 *     }
 *
 *     // Create the heightfield shape
 *     const heightfieldShape = new Heightfield(data, {
 *         elementSize: 1 // Distance between the data points in X and Y directions
 *     });
 *     const heightfieldBody = new Body();
 *     heightfieldBody.addShape(heightfieldShape);
 *     world.addBody(heightfieldBody);
 */
var Heightfield = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Heightfield, _Shape);

  // An array of numbers, or height values, that are spread out along the x axis.
  // Max value of the data.
  // Max value of the data.
  // The width of each element. To do: elementSizeX and Y
  function Heightfield(data, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    options = Utils.defaults(options, {
      maxValue: null,
      minValue: null,
      elementSize: 1
    });
    _this = _Shape.call(this, {
      type: Shape.types.HEIGHTFIELD
    }) || this;
    _this.data = data;
    _this.maxValue = options.maxValue;
    _this.minValue = options.minValue;
    _this.elementSize = options.elementSize;

    if (options.minValue === null) {
      _this.updateMinValue();
    }

    if (options.maxValue === null) {
      _this.updateMaxValue();
    }

    _this.cacheEnabled = true;
    _this.pillarConvex = new ConvexPolyhedron();
    _this.pillarOffset = new Vec3();

    _this.updateBoundingSphereRadius(); // "i_j_isUpper" => { convex: ..., offset: ... }
    // for example:
    // _cachedPillars["0_2_1"]


    _this._cachedPillars = {};
    return _this;
  }
  /**
   * Call whenever you change the data array.
   * @method update
   */


  var _proto = Heightfield.prototype;

  _proto.update = function update() {
    this._cachedPillars = {};
  }
  /**
   * Update the .minValue property
   * @method updateMinValue
   */
  ;

  _proto.updateMinValue = function updateMinValue() {
    var data = this.data;
    var minValue = data[0][0];

    for (var i = 0; i !== data.length; i++) {
      for (var j = 0; j !== data[i].length; j++) {
        var v = data[i][j];

        if (v < minValue) {
          minValue = v;
        }
      }
    }

    this.minValue = minValue;
  }
  /**
   * Update the .maxValue property
   * @method updateMaxValue
   */
  ;

  _proto.updateMaxValue = function updateMaxValue() {
    var data = this.data;
    var maxValue = data[0][0];

    for (var i = 0; i !== data.length; i++) {
      for (var j = 0; j !== data[i].length; j++) {
        var v = data[i][j];

        if (v > maxValue) {
          maxValue = v;
        }
      }
    }

    this.maxValue = maxValue;
  }
  /**
   * Set the height value at an index. Don't forget to update maxValue and minValue after you're done.
   * @method setHeightValueAtIndex
   * @param {integer} xi
   * @param {integer} yi
   * @param {number} value
   */
  ;

  _proto.setHeightValueAtIndex = function setHeightValueAtIndex(xi, yi, value) {
    var data = this.data;
    data[xi][yi] = value; // Invalidate cache

    this.clearCachedConvexTrianglePillar(xi, yi, false);

    if (xi > 0) {
      this.clearCachedConvexTrianglePillar(xi - 1, yi, true);
      this.clearCachedConvexTrianglePillar(xi - 1, yi, false);
    }

    if (yi > 0) {
      this.clearCachedConvexTrianglePillar(xi, yi - 1, true);
      this.clearCachedConvexTrianglePillar(xi, yi - 1, false);
    }

    if (yi > 0 && xi > 0) {
      this.clearCachedConvexTrianglePillar(xi - 1, yi - 1, true);
    }
  }
  /**
   * Get max/min in a rectangle in the matrix data
   * @method getRectMinMax
   * @param  {integer} iMinX
   * @param  {integer} iMinY
   * @param  {integer} iMaxX
   * @param  {integer} iMaxY
   * @param  {array} [result] An array to store the results in.
   * @return {array} The result array, if it was passed in. Minimum will be at position 0 and max at 1.
   */
  ;

  _proto.getRectMinMax = function getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, result) {
    if (result === void 0) {
      result = [];
    }

    // Get max and min of the data
    var data = this.data; // Set first value

    var max = this.minValue;

    for (var i = iMinX; i <= iMaxX; i++) {
      for (var j = iMinY; j <= iMaxY; j++) {
        var height = data[i][j];

        if (height > max) {
          max = height;
        }
      }
    }

    result[0] = this.minValue;
    result[1] = max;
  }
  /**
   * Get the index of a local position on the heightfield. The indexes indicate the rectangles, so if your terrain is made of N x N height data points, you will have rectangle indexes ranging from 0 to N-1.
   * @method getIndexOfPosition
   * @param  {number} x
   * @param  {number} y
   * @param  {array} result Two-element array
   * @param  {boolean} clamp If the position should be clamped to the heightfield edge.
   * @return {boolean}
   */
  ;

  _proto.getIndexOfPosition = function getIndexOfPosition(x, y, result, clamp) {
    // Get the index of the data points to test against
    var w = this.elementSize;
    var data = this.data;
    var xi = Math.floor(x / w);
    var yi = Math.floor(y / w);
    result[0] = xi;
    result[1] = yi;

    if (clamp) {
      // Clamp index to edges
      if (xi < 0) {
        xi = 0;
      }

      if (yi < 0) {
        yi = 0;
      }

      if (xi >= data.length - 1) {
        xi = data.length - 1;
      }

      if (yi >= data[0].length - 1) {
        yi = data[0].length - 1;
      }
    } // Bail out if we are out of the terrain


    if (xi < 0 || yi < 0 || xi >= data.length - 1 || yi >= data[0].length - 1) {
      return false;
    }

    return true;
  };

  _proto.getTriangleAt = function getTriangleAt(x, y, edgeClamp, a, b, c) {
    var idx = getHeightAt_idx;
    this.getIndexOfPosition(x, y, idx, edgeClamp);
    var xi = idx[0];
    var yi = idx[1];
    var data = this.data;

    if (edgeClamp) {
      xi = Math.min(data.length - 2, Math.max(0, xi));
      yi = Math.min(data[0].length - 2, Math.max(0, yi));
    }

    var elementSize = this.elementSize;
    var lowerDist2 = Math.pow(x / elementSize - xi, 2) + Math.pow(y / elementSize - yi, 2);
    var upperDist2 = Math.pow(x / elementSize - (xi + 1), 2) + Math.pow(y / elementSize - (yi + 1), 2);
    var upper = lowerDist2 > upperDist2;
    this.getTriangle(xi, yi, upper, a, b, c);
    return upper;
  };

  _proto.getNormalAt = function getNormalAt(x, y, edgeClamp, result) {
    var a = getNormalAt_a;
    var b = getNormalAt_b;
    var c = getNormalAt_c;
    var e0 = getNormalAt_e0;
    var e1 = getNormalAt_e1;
    this.getTriangleAt(x, y, edgeClamp, a, b, c);
    b.vsub(a, e0);
    c.vsub(a, e1);
    e0.cross(e1, result);
    result.normalize();
  }
  /**
   * Get an AABB of a square in the heightfield
   * @param  {number} xi
   * @param  {number} yi
   * @param  {AABB} result
   */
  ;

  _proto.getAabbAtIndex = function getAabbAtIndex(xi, yi, _ref) {
    var lowerBound = _ref.lowerBound,
        upperBound = _ref.upperBound;
    var data = this.data;
    var elementSize = this.elementSize;
    lowerBound.set(xi * elementSize, yi * elementSize, data[xi][yi]);
    upperBound.set((xi + 1) * elementSize, (yi + 1) * elementSize, data[xi + 1][yi + 1]);
  }
  /**
   * Get the height in the heightfield at a given position
   * @param  {number} x
   * @param  {number} y
   * @param  {boolean} edgeClamp
   * @return {number}
   */
  ;

  _proto.getHeightAt = function getHeightAt(x, y, edgeClamp) {
    var data = this.data;
    var a = getHeightAt_a;
    var b = getHeightAt_b;
    var c = getHeightAt_c;
    var idx = getHeightAt_idx;
    this.getIndexOfPosition(x, y, idx, edgeClamp);
    var xi = idx[0];
    var yi = idx[1];

    if (edgeClamp) {
      xi = Math.min(data.length - 2, Math.max(0, xi));
      yi = Math.min(data[0].length - 2, Math.max(0, yi));
    }

    var upper = this.getTriangleAt(x, y, edgeClamp, a, b, c);
    barycentricWeights(x, y, a.x, a.y, b.x, b.y, c.x, c.y, getHeightAt_weights);
    var w = getHeightAt_weights;

    if (upper) {
      // Top triangle verts
      return data[xi + 1][yi + 1] * w.x + data[xi][yi + 1] * w.y + data[xi + 1][yi] * w.z;
    } else {
      // Top triangle verts
      return data[xi][yi] * w.x + data[xi + 1][yi] * w.y + data[xi][yi + 1] * w.z;
    }
  };

  _proto.getCacheConvexTrianglePillarKey = function getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle) {
    return xi + "_" + yi + "_" + (getUpperTriangle ? 1 : 0);
  };

  _proto.getCachedConvexTrianglePillar = function getCachedConvexTrianglePillar(xi, yi, getUpperTriangle) {
    return this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
  };

  _proto.setCachedConvexTrianglePillar = function setCachedConvexTrianglePillar(xi, yi, getUpperTriangle, convex, offset) {
    this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)] = {
      convex: convex,
      offset: offset
    };
  };

  _proto.clearCachedConvexTrianglePillar = function clearCachedConvexTrianglePillar(xi, yi, getUpperTriangle) {
    delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
  }
  /**
   * Get a triangle from the heightfield
   * @param  {number} xi
   * @param  {number} yi
   * @param  {boolean} upper
   * @param  {Vec3} a
   * @param  {Vec3} b
   * @param  {Vec3} c
   */
  ;

  _proto.getTriangle = function getTriangle(xi, yi, upper, a, b, c) {
    var data = this.data;
    var elementSize = this.elementSize;

    if (upper) {
      // Top triangle verts
      a.set((xi + 1) * elementSize, (yi + 1) * elementSize, data[xi + 1][yi + 1]);
      b.set(xi * elementSize, (yi + 1) * elementSize, data[xi][yi + 1]);
      c.set((xi + 1) * elementSize, yi * elementSize, data[xi + 1][yi]);
    } else {
      // Top triangle verts
      a.set(xi * elementSize, yi * elementSize, data[xi][yi]);
      b.set((xi + 1) * elementSize, yi * elementSize, data[xi + 1][yi]);
      c.set(xi * elementSize, (yi + 1) * elementSize, data[xi][yi + 1]);
    }
  }
  /**
   * Get a triangle in the terrain in the form of a triangular convex shape.
   * @method getConvexTrianglePillar
   * @param  {integer} i
   * @param  {integer} j
   * @param  {boolean} getUpperTriangle
   */
  ;

  _proto.getConvexTrianglePillar = function getConvexTrianglePillar(xi, yi, getUpperTriangle) {
    var result = this.pillarConvex;
    var offsetResult = this.pillarOffset;

    if (this.cacheEnabled) {
      var _data = this.getCachedConvexTrianglePillar(xi, yi, getUpperTriangle);

      if (_data) {
        this.pillarConvex = _data.convex;
        this.pillarOffset = _data.offset;
        return;
      }

      result = new ConvexPolyhedron();
      offsetResult = new Vec3();
      this.pillarConvex = result;
      this.pillarOffset = offsetResult;
    }

    var data = this.data;
    var elementSize = this.elementSize;
    var faces = result.faces; // Reuse verts if possible

    result.vertices.length = 6;

    for (var i = 0; i < 6; i++) {
      if (!result.vertices[i]) {
        result.vertices[i] = new Vec3();
      }
    } // Reuse faces if possible


    faces.length = 5;

    for (var _i = 0; _i < 5; _i++) {
      if (!faces[_i]) {
        faces[_i] = [];
      }
    }

    var verts = result.vertices;
    var h = (Math.min(data[xi][yi], data[xi + 1][yi], data[xi][yi + 1], data[xi + 1][yi + 1]) - this.minValue) / 2 + this.minValue;

    if (!getUpperTriangle) {
      // Center of the triangle pillar - all polygons are given relative to this one
      offsetResult.set((xi + 0.25) * elementSize, // sort of center of a triangle
      (yi + 0.25) * elementSize, h // vertical center
      ); // Top triangle verts

      verts[0].set(-0.25 * elementSize, -0.25 * elementSize, data[xi][yi] - h);
      verts[1].set(0.75 * elementSize, -0.25 * elementSize, data[xi + 1][yi] - h);
      verts[2].set(-0.25 * elementSize, 0.75 * elementSize, data[xi][yi + 1] - h); // bottom triangle verts

      verts[3].set(-0.25 * elementSize, -0.25 * elementSize, -h - 1);
      verts[4].set(0.75 * elementSize, -0.25 * elementSize, -h - 1);
      verts[5].set(-0.25 * elementSize, 0.75 * elementSize, -h - 1); // top triangle

      faces[0][0] = 0;
      faces[0][1] = 1;
      faces[0][2] = 2; // bottom triangle

      faces[1][0] = 5;
      faces[1][1] = 4;
      faces[1][2] = 3; // -x facing quad

      faces[2][0] = 0;
      faces[2][1] = 2;
      faces[2][2] = 5;
      faces[2][3] = 3; // -y facing quad

      faces[3][0] = 1;
      faces[3][1] = 0;
      faces[3][2] = 3;
      faces[3][3] = 4; // +xy facing quad

      faces[4][0] = 4;
      faces[4][1] = 5;
      faces[4][2] = 2;
      faces[4][3] = 1;
    } else {
      // Center of the triangle pillar - all polygons are given relative to this one
      offsetResult.set((xi + 0.75) * elementSize, // sort of center of a triangle
      (yi + 0.75) * elementSize, h // vertical center
      ); // Top triangle verts

      verts[0].set(0.25 * elementSize, 0.25 * elementSize, data[xi + 1][yi + 1] - h);
      verts[1].set(-0.75 * elementSize, 0.25 * elementSize, data[xi][yi + 1] - h);
      verts[2].set(0.25 * elementSize, -0.75 * elementSize, data[xi + 1][yi] - h); // bottom triangle verts

      verts[3].set(0.25 * elementSize, 0.25 * elementSize, -h - 1);
      verts[4].set(-0.75 * elementSize, 0.25 * elementSize, -h - 1);
      verts[5].set(0.25 * elementSize, -0.75 * elementSize, -h - 1); // Top triangle

      faces[0][0] = 0;
      faces[0][1] = 1;
      faces[0][2] = 2; // bottom triangle

      faces[1][0] = 5;
      faces[1][1] = 4;
      faces[1][2] = 3; // +x facing quad

      faces[2][0] = 2;
      faces[2][1] = 5;
      faces[2][2] = 3;
      faces[2][3] = 0; // +y facing quad

      faces[3][0] = 3;
      faces[3][1] = 4;
      faces[3][2] = 1;
      faces[3][3] = 0; // -xy facing quad

      faces[4][0] = 1;
      faces[4][1] = 4;
      faces[4][2] = 5;
      faces[4][3] = 2;
    }

    result.computeNormals();
    result.computeEdges();
    result.updateBoundingSphereRadius();
    this.setCachedConvexTrianglePillar(xi, yi, getUpperTriangle, result, offsetResult);
  };

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    if (target === void 0) {
      target = new Vec3();
    }

    target.set(0, 0, 0);
    return target;
  };

  _proto.volume = function volume() {
    return (// The terrain is infinite
      Number.MAX_VALUE
    );
  };

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    // TODO: do it properly
    min.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    max.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  };

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    // Use the bounding box of the min/max values
    var data = this.data;
    var s = this.elementSize;
    this.boundingSphereRadius = new Vec3(data.length * s, data[0].length * s, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).length();
  }
  /**
   * Sets the height values from an image. Currently only supported in browser.
   * @method setHeightsFromImage
   * @param {Image} image
   * @param {Vec3} scale
   */
  ;

  _proto.setHeightsFromImage = function setHeightsFromImage(image, scale) {
    var x = scale.x,
        z = scale.z,
        y = scale.y;
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    var imageData = context.getImageData(0, 0, image.width, image.height);
    var matrix = this.data;
    matrix.length = 0;
    this.elementSize = Math.abs(x) / imageData.width;

    for (var i = 0; i < imageData.height; i++) {
      var row = [];

      for (var j = 0; j < imageData.width; j++) {
        var a = imageData.data[(i * imageData.height + j) * 4];
        var b = imageData.data[(i * imageData.height + j) * 4 + 1];
        var c = imageData.data[(i * imageData.height + j) * 4 + 2];
        var height = (a + b + c) / 4 / 255 * z;

        if (x < 0) {
          row.push(height);
        } else {
          row.unshift(height);
        }
      }

      if (y < 0) {
        matrix.unshift(row);
      } else {
        matrix.push(row);
      }
    }

    this.updateMaxValue();
    this.updateMinValue();
    this.update();
  };

  return Heightfield;
}(Shape);
var getHeightAt_idx = [];
var getHeightAt_weights = new Vec3();
var getHeightAt_a = new Vec3();
var getHeightAt_b = new Vec3();
var getHeightAt_c = new Vec3();
var getNormalAt_a = new Vec3();
var getNormalAt_b = new Vec3();
var getNormalAt_c = new Vec3();
var getNormalAt_e0 = new Vec3();
var getNormalAt_e1 = new Vec3(); // from https://en.wikipedia.org/wiki/Barycentric_coordinate_system

function barycentricWeights(x, y, ax, ay, bx, by, cx, cy, result) {
  result.x = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / ((by - cy) * (ax - cx) + (cx - bx) * (ay - cy));
  result.y = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / ((by - cy) * (ax - cx) + (cx - bx) * (ay - cy));
  result.z = 1 - result.x - result.y;
}

/**
 * @class OctreeNode
 * @constructor
 * @param {object} [options]
 * @param {Octree} [options.root]
 * @param {AABB} [options.aabb]
 */
var OctreeNode = /*#__PURE__*/function () {
  // The root node
  // Boundary of this node
  // Contained data at the current node level
  // Children to this node
  function OctreeNode(options) {
    if (options === void 0) {
      options = {};
    }

    this.root = options.root || null;
    this.aabb = options.aabb ? options.aabb.clone() : new AABB();
    this.data = [];
    this.children = [];
  }

  var _proto = OctreeNode.prototype;

  _proto.reset = function reset() {
    this.children.length = this.data.length = 0;
  }
  /**
   * Insert data into this node
   * @method insert
   * @param  {AABB} aabb
   * @param  {object} elementData
   * @return {boolean} True if successful, otherwise false
   */
  ;

  _proto.insert = function insert(aabb, elementData, level) {
    if (level === void 0) {
      level = 0;
    }

    var nodeData = this.data; // Ignore objects that do not belong in this node

    if (!this.aabb.contains(aabb)) {
      return false; // object cannot be added
    }

    var children = this.children;
    var maxDepth = this.maxDepth || this.root.maxDepth;

    if (level < maxDepth) {
      // Subdivide if there are no children yet
      var subdivided = false;

      if (!children.length) {
        this.subdivide();
        subdivided = true;
      } // add to whichever node will accept it


      for (var i = 0; i !== 8; i++) {
        if (children[i].insert(aabb, elementData, level + 1)) {
          return true;
        }
      }

      if (subdivided) {
        // No children accepted! Might as well just remove em since they contain none
        children.length = 0;
      }
    } // Too deep, or children didnt want it. add it in current node


    nodeData.push(elementData);
    return true;
  }
  /**
   * Create 8 equally sized children nodes and put them in the .children array.
   * @method subdivide
   */
  ;

  _proto.subdivide = function subdivide() {
    var aabb = this.aabb;
    var l = aabb.lowerBound;
    var u = aabb.upperBound;
    var children = this.children;
    children.push(new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(0, 0, 0)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(1, 0, 0)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(1, 1, 0)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(1, 1, 1)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(0, 1, 1)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(0, 0, 1)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(1, 0, 1)
      })
    }), new OctreeNode({
      aabb: new AABB({
        lowerBound: new Vec3(0, 1, 0)
      })
    }));
    u.vsub(l, halfDiagonal);
    halfDiagonal.scale(0.5, halfDiagonal);
    var root = this.root || this;

    for (var i = 0; i !== 8; i++) {
      var child = children[i]; // Set current node as root

      child.root = root; // Compute bounds

      var lowerBound = child.aabb.lowerBound;
      lowerBound.x *= halfDiagonal.x;
      lowerBound.y *= halfDiagonal.y;
      lowerBound.z *= halfDiagonal.z;
      lowerBound.vadd(l, lowerBound); // Upper bound is always lower bound + halfDiagonal

      lowerBound.vadd(halfDiagonal, child.aabb.upperBound);
    }
  }
  /**
   * Get all data, potentially within an AABB
   * @method aabbQuery
   * @param  {AABB} aabb
   * @param  {array} result
   * @return {array} The "result" object
   */
  ;

  _proto.aabbQuery = function aabbQuery(aabb, result) {
    var nodeData = this.data; // abort if the range does not intersect this node
    // if (!this.aabb.overlaps(aabb)){
    //     return result;
    // }
    // Add objects at this level
    // Array.prototype.push.apply(result, nodeData);
    // Add child data
    // @todo unwrap recursion into a queue / loop, that's faster in JS

    var children = this.children; // for (let i = 0, N = this.children.length; i !== N; i++) {
    //     children[i].aabbQuery(aabb, result);
    // }

    var queue = [this];

    while (queue.length) {
      var node = queue.pop();

      if (node.aabb.overlaps(aabb)) {
        Array.prototype.push.apply(result, node.data);
      }

      Array.prototype.push.apply(queue, node.children);
    }

    return result;
  }
  /**
   * Get all data, potentially intersected by a ray.
   * @method rayQuery
   * @param  {Ray} ray
   * @param  {Transform} treeTransform
   * @param  {array} result
   * @return {array} The "result" object
   */
  ;

  _proto.rayQuery = function rayQuery(ray, treeTransform, result) {
    // Use aabb query for now.
    // @todo implement real ray query which needs less lookups
    ray.getAABB(tmpAABB$1);
    tmpAABB$1.toLocalFrame(treeTransform, tmpAABB$1);
    this.aabbQuery(tmpAABB$1, result);
    return result;
  }
  /**
   * @method removeEmptyNodes
   */
  ;

  _proto.removeEmptyNodes = function removeEmptyNodes() {
    for (var i = this.children.length - 1; i >= 0; i--) {
      this.children[i].removeEmptyNodes();

      if (!this.children[i].children.length && !this.children[i].data.length) {
        this.children.splice(i, 1);
      }
    }
  };

  return OctreeNode;
}();
/**
 * @class Octree
 * @param {AABB} aabb The total AABB of the tree
 * @param {object} [options]
 * @param {number} [options.maxDepth=8] Maximum subdivision depth
 * @extends OctreeNode
 */


var Octree = /*#__PURE__*/function (_OctreeNode) {
  _inheritsLoose(Octree, _OctreeNode);

  // Maximum subdivision depth
  function Octree(aabb, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _OctreeNode.call(this, {
      root: null,
      aabb: aabb
    }) || this;
    _this.maxDepth = typeof options.maxDepth !== 'undefined' ? options.maxDepth : 8;
    return _this;
  }

  return Octree;
}(OctreeNode);
var halfDiagonal = new Vec3();
var tmpAABB$1 = new AABB();

/**
 * @class Trimesh
 * @constructor
 * @param {array} vertices
 * @param {array} indices
 * @extends Shape
 * @example
 *     // How to make a mesh with a single triangle
 *     const vertices = [
 *         0, 0, 0, // vertex 0
 *         1, 0, 0, // vertex 1
 *         0, 1, 0  // vertex 2
 *     ];
 *     const indices = [
 *         0, 1, 2  // triangle 0
 *     ];
 *     const trimeshShape = new Trimesh(vertices, indices);
 */
var Trimesh = /*#__PURE__*/function (_Shape) {
  _inheritsLoose(Trimesh, _Shape);

  // Array of integers, indicating which vertices each triangle consists of. The length of this array is thus 3 times the number of triangles.
  // The normals data.
  // The local AABB of the mesh.
  // References to vertex pairs, making up all unique edges in the trimesh.
  // Local scaling of the mesh. Use .setScale() to set it.
  // The indexed triangles. Use .updateTree() to update it.
  function Trimesh(vertices, indices) {
    var _this;

    _this = _Shape.call(this, {
      type: Shape.types.TRIMESH
    }) || this;
    _this.vertices = new Float32Array(vertices);
    _this.indices = new Int16Array(indices);
    _this.normals = new Float32Array(indices.length);
    _this.aabb = new AABB();
    _this.edges = null;
    _this.scale = new Vec3(1, 1, 1);
    _this.tree = new Octree();

    _this.updateEdges();

    _this.updateNormals();

    _this.updateAABB();

    _this.updateBoundingSphereRadius();

    _this.updateTree();

    return _this;
  }
  /**
   * @method updateTree
   */


  var _proto = Trimesh.prototype;

  _proto.updateTree = function updateTree() {
    var tree = this.tree;
    tree.reset();
    tree.aabb.copy(this.aabb);
    var scale = this.scale; // The local mesh AABB is scaled, but the octree AABB should be unscaled

    tree.aabb.lowerBound.x *= 1 / scale.x;
    tree.aabb.lowerBound.y *= 1 / scale.y;
    tree.aabb.lowerBound.z *= 1 / scale.z;
    tree.aabb.upperBound.x *= 1 / scale.x;
    tree.aabb.upperBound.y *= 1 / scale.y;
    tree.aabb.upperBound.z *= 1 / scale.z; // Insert all triangles

    var triangleAABB = new AABB();
    var a = new Vec3();
    var b = new Vec3();
    var c = new Vec3();
    var points = [a, b, c];

    for (var i = 0; i < this.indices.length / 3; i++) {
      //this.getTriangleVertices(i, a, b, c);
      // Get unscaled triangle verts
      var i3 = i * 3;

      this._getUnscaledVertex(this.indices[i3], a);

      this._getUnscaledVertex(this.indices[i3 + 1], b);

      this._getUnscaledVertex(this.indices[i3 + 2], c);

      triangleAABB.setFromPoints(points);
      tree.insert(triangleAABB, i);
    }

    tree.removeEmptyNodes();
  }
  /**
   * Get triangles in a local AABB from the trimesh.
   * @method getTrianglesInAABB
   * @param  {AABB} aabb
   * @param  {array} result An array of integers, referencing the queried triangles.
   */
  ;

  _proto.getTrianglesInAABB = function getTrianglesInAABB(aabb, result) {
    unscaledAABB.copy(aabb); // Scale it to local

    var scale = this.scale;
    var isx = scale.x;
    var isy = scale.y;
    var isz = scale.z;
    var l = unscaledAABB.lowerBound;
    var u = unscaledAABB.upperBound;
    l.x /= isx;
    l.y /= isy;
    l.z /= isz;
    u.x /= isx;
    u.y /= isy;
    u.z /= isz;
    return this.tree.aabbQuery(unscaledAABB, result);
  }
  /**
   * @method setScale
   * @param {Vec3} scale
   */
  ;

  _proto.setScale = function setScale(scale) {
    var wasUniform = this.scale.x === this.scale.y && this.scale.y === this.scale.z;
    var isUniform = scale.x === scale.y && scale.y === scale.z;

    if (!(wasUniform && isUniform)) {
      // Non-uniform scaling. Need to update normals.
      this.updateNormals();
    }

    this.scale.copy(scale);
    this.updateAABB();
    this.updateBoundingSphereRadius();
  }
  /**
   * Compute the normals of the faces. Will save in the .normals array.
   * @method updateNormals
   */
  ;

  _proto.updateNormals = function updateNormals() {
    var n = computeNormals_n; // Generate normals

    var normals = this.normals;

    for (var i = 0; i < this.indices.length / 3; i++) {
      var i3 = i * 3;
      var a = this.indices[i3];
      var b = this.indices[i3 + 1];
      var c = this.indices[i3 + 2];
      this.getVertex(a, va);
      this.getVertex(b, vb);
      this.getVertex(c, vc);
      Trimesh.computeNormal(vb, va, vc, n);
      normals[i3] = n.x;
      normals[i3 + 1] = n.y;
      normals[i3 + 2] = n.z;
    }
  }
  /**
   * Update the .edges property
   * @method updateEdges
   */
  ;

  _proto.updateEdges = function updateEdges() {
    var edges = {};

    var add = function add(a, b) {
      var key = a < b ? a + "_" + b : b + "_" + a;
      edges[key] = true;
    };

    for (var i = 0; i < this.indices.length / 3; i++) {
      var i3 = i * 3;
      var a = this.indices[i3];
      var b = this.indices[i3 + 1];
      var c = this.indices[i3 + 2];
      add(a, b);
      add(b, c);
      add(c, a);
    }

    var keys = Object.keys(edges);
    this.edges = new Int16Array(keys.length * 2);

    for (var _i = 0; _i < keys.length; _i++) {
      var indices = keys[_i].split('_');

      this.edges[2 * _i] = parseInt(indices[0], 10);
      this.edges[2 * _i + 1] = parseInt(indices[1], 10);
    }
  }
  /**
   * Get an edge vertex
   * @method getEdgeVertex
   * @param  {number} edgeIndex
   * @param  {number} firstOrSecond 0 or 1, depending on which one of the vertices you need.
   * @param  {Vec3} vertexStore Where to store the result
   */
  ;

  _proto.getEdgeVertex = function getEdgeVertex(edgeIndex, firstOrSecond, vertexStore) {
    var vertexIndex = this.edges[edgeIndex * 2 + (firstOrSecond ? 1 : 0)];
    this.getVertex(vertexIndex, vertexStore);
  }
  /**
   * Get a vector along an edge.
   * @method getEdgeVector
   * @param  {number} edgeIndex
   * @param  {Vec3} vectorStore
   */
  ;

  _proto.getEdgeVector = function getEdgeVector(edgeIndex, vectorStore) {
    var va = getEdgeVector_va;
    var vb = getEdgeVector_vb;
    this.getEdgeVertex(edgeIndex, 0, va);
    this.getEdgeVertex(edgeIndex, 1, vb);
    vb.vsub(va, vectorStore);
  }
  /**
   * Get vertex i.
   * @method getVertex
   * @param  {number} i
   * @param  {Vec3} out
   * @return {Vec3} The "out" vector object
   */
  ;

  _proto.getVertex = function getVertex(i, out) {
    var scale = this.scale;

    this._getUnscaledVertex(i, out);

    out.x *= scale.x;
    out.y *= scale.y;
    out.z *= scale.z;
    return out;
  }
  /**
   * Get raw vertex i
   * @private
   * @method _getUnscaledVertex
   * @param  {number} i
   * @param  {Vec3} out
   * @return {Vec3} The "out" vector object
   */
  ;

  _proto._getUnscaledVertex = function _getUnscaledVertex(i, out) {
    var i3 = i * 3;
    var vertices = this.vertices;
    return out.set(vertices[i3], vertices[i3 + 1], vertices[i3 + 2]);
  }
  /**
   * Get a vertex from the trimesh,transformed by the given position and quaternion.
   * @method getWorldVertex
   * @param  {number} i
   * @param  {Vec3} pos
   * @param  {Quaternion} quat
   * @param  {Vec3} out
   * @return {Vec3} The "out" vector object
   */
  ;

  _proto.getWorldVertex = function getWorldVertex(i, pos, quat, out) {
    this.getVertex(i, out);
    Transform.pointToWorldFrame(pos, quat, out, out);
    return out;
  }
  /**
   * Get the three vertices for triangle i.
   * @method getTriangleVertices
   * @param  {number} i
   * @param  {Vec3} a
   * @param  {Vec3} b
   * @param  {Vec3} c
   */
  ;

  _proto.getTriangleVertices = function getTriangleVertices(i, a, b, c) {
    var i3 = i * 3;
    this.getVertex(this.indices[i3], a);
    this.getVertex(this.indices[i3 + 1], b);
    this.getVertex(this.indices[i3 + 2], c);
  }
  /**
   * Compute the normal of triangle i.
   * @method getNormal
   * @param  {Number} i
   * @param  {Vec3} target
   * @return {Vec3} The "target" vector object
   */
  ;

  _proto.getNormal = function getNormal(i, target) {
    var i3 = i * 3;
    return target.set(this.normals[i3], this.normals[i3 + 1], this.normals[i3 + 2]);
  }
  /**
   * @method calculateLocalInertia
   * @param  {Number} mass
   * @param  {Vec3} target
   * @return {Vec3} The "target" vector object
   */
  ;

  _proto.calculateLocalInertia = function calculateLocalInertia(mass, target) {
    // Approximate with box inertia
    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
    this.computeLocalAABB(cli_aabb);
    var x = cli_aabb.upperBound.x - cli_aabb.lowerBound.x;
    var y = cli_aabb.upperBound.y - cli_aabb.lowerBound.y;
    var z = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
    return target.set(1.0 / 12.0 * mass * (2 * y * 2 * y + 2 * z * 2 * z), 1.0 / 12.0 * mass * (2 * x * 2 * x + 2 * z * 2 * z), 1.0 / 12.0 * mass * (2 * y * 2 * y + 2 * x * 2 * x));
  }
  /**
   * Compute the local AABB for the trimesh
   * @method computeLocalAABB
   * @param  {AABB} aabb
   */
  ;

  _proto.computeLocalAABB = function computeLocalAABB(aabb) {
    var l = aabb.lowerBound;
    var u = aabb.upperBound;
    var n = this.vertices.length;
    var vertices = this.vertices;
    var v = computeLocalAABB_worldVert;
    this.getVertex(0, v);
    l.copy(v);
    u.copy(v);

    for (var i = 0; i !== n; i++) {
      this.getVertex(i, v);

      if (v.x < l.x) {
        l.x = v.x;
      } else if (v.x > u.x) {
        u.x = v.x;
      }

      if (v.y < l.y) {
        l.y = v.y;
      } else if (v.y > u.y) {
        u.y = v.y;
      }

      if (v.z < l.z) {
        l.z = v.z;
      } else if (v.z > u.z) {
        u.z = v.z;
      }
    }
  }
  /**
   * Update the .aabb property
   * @method updateAABB
   */
  ;

  _proto.updateAABB = function updateAABB() {
    this.computeLocalAABB(this.aabb);
  }
  /**
   * Will update the .boundingSphereRadius property
   * @method updateBoundingSphereRadius
   */
  ;

  _proto.updateBoundingSphereRadius = function updateBoundingSphereRadius() {
    // Assume points are distributed with local (0,0,0) as center
    var max2 = 0;
    var vertices = this.vertices;
    var v = new Vec3();

    for (var i = 0, N = vertices.length / 3; i !== N; i++) {
      this.getVertex(i, v);
      var norm2 = v.lengthSquared();

      if (norm2 > max2) {
        max2 = norm2;
      }
    }

    this.boundingSphereRadius = Math.sqrt(max2);
  }
  /**
   * @method calculateWorldAABB
   * @param {Vec3}        pos
   * @param {Quaternion}  quat
   * @param {Vec3}        min
   * @param {Vec3}        max
   */
  ;

  _proto.calculateWorldAABB = function calculateWorldAABB(pos, quat, min, max) {
    /*
        const n = this.vertices.length / 3,
            verts = this.vertices;
        const minx,miny,minz,maxx,maxy,maxz;
         const v = tempWorldVertex;
        for(let i=0; i<n; i++){
            this.getVertex(i, v);
            quat.vmult(v, v);
            pos.vadd(v, v);
            if (v.x < minx || minx===undefined){
                minx = v.x;
            } else if(v.x > maxx || maxx===undefined){
                maxx = v.x;
            }
             if (v.y < miny || miny===undefined){
                miny = v.y;
            } else if(v.y > maxy || maxy===undefined){
                maxy = v.y;
            }
             if (v.z < minz || minz===undefined){
                minz = v.z;
            } else if(v.z > maxz || maxz===undefined){
                maxz = v.z;
            }
        }
        min.set(minx,miny,minz);
        max.set(maxx,maxy,maxz);
        */
    // Faster approximation using local AABB
    var frame = calculateWorldAABB_frame;
    var result = calculateWorldAABB_aabb;
    frame.position = pos;
    frame.quaternion = quat;
    this.aabb.toWorldFrame(frame, result);
    min.copy(result.lowerBound);
    max.copy(result.upperBound);
  }
  /**
   * Get approximate volume
   * @method volume
   * @return {Number}
   */
  ;

  _proto.volume = function volume() {
    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
  };

  return Trimesh;
}(Shape);
var computeNormals_n = new Vec3();
var unscaledAABB = new AABB();
var getEdgeVector_va = new Vec3();
var getEdgeVector_vb = new Vec3();
/**
 * Get face normal given 3 vertices
 * @static
 * @method computeNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */

var cb = new Vec3();
var ab = new Vec3();

Trimesh.computeNormal = function (va, vb, vc, target) {
  vb.vsub(va, ab);
  vc.vsub(vb, cb);
  cb.cross(ab, target);

  if (!target.isZero()) {
    target.normalize();
  }
};

var va = new Vec3();
var vb = new Vec3();
var vc = new Vec3();
var cli_aabb = new AABB();
var computeLocalAABB_worldVert = new Vec3();
var calculateWorldAABB_frame = new Transform();
var calculateWorldAABB_aabb = new AABB();
/**
 * Create a Trimesh instance, shaped as a torus.
 * @static
 * @method createTorus
 * @param  {number} [radius=1]
 * @param  {number} [tube=0.5]
 * @param  {number} [radialSegments=8]
 * @param  {number} [tubularSegments=6]
 * @param  {number} [arc=6.283185307179586]
 * @return {Trimesh} A torus
 */

Trimesh.createTorus = function (radius, tube, radialSegments, tubularSegments, arc) {
  if (radius === void 0) {
    radius = 1;
  }

  if (tube === void 0) {
    tube = 0.5;
  }

  if (radialSegments === void 0) {
    radialSegments = 8;
  }

  if (tubularSegments === void 0) {
    tubularSegments = 6;
  }

  if (arc === void 0) {
    arc = Math.PI * 2;
  }

  var vertices = [];
  var indices = [];

  for (var j = 0; j <= radialSegments; j++) {
    for (var i = 0; i <= tubularSegments; i++) {
      var u = i / tubularSegments * arc;
      var v = j / radialSegments * Math.PI * 2;
      var x = (radius + tube * Math.cos(v)) * Math.cos(u);
      var y = (radius + tube * Math.cos(v)) * Math.sin(u);
      var z = tube * Math.sin(v);
      vertices.push(x, y, z);
    }
  }

  for (var _j = 1; _j <= radialSegments; _j++) {
    for (var _i2 = 1; _i2 <= tubularSegments; _i2++) {
      var a = (tubularSegments + 1) * _j + _i2 - 1;
      var b = (tubularSegments + 1) * (_j - 1) + _i2 - 1;
      var c = (tubularSegments + 1) * (_j - 1) + _i2;
      var d = (tubularSegments + 1) * _j + _i2;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  return new Trimesh(vertices, indices);
};

/**
 * Constraint equation solver base class.
 * @class Solver
 * @constructor
 * @author schteppe / https://github.com/schteppe
 */
var Solver = /*#__PURE__*/function () {
  // All equations to be solved
  function Solver() {
    this.equations = [];
  }
  /**
   * Should be implemented in subclasses!
   * @method solve
   * @param  {Number} dt
   * @param  {World} world
   * @return {Number} number of iterations performed
   */


  var _proto = Solver.prototype;

  _proto.solve = function solve(dt, world) {
    return (// Should return the number of iterations done!
      0
    );
  }
  /**
   * Add an equation
   * @method addEquation
   * @param {Equation} eq
   */
  ;

  _proto.addEquation = function addEquation(eq) {
    if (eq.enabled) {
      this.equations.push(eq);
    }
  }
  /**
   * Remove an equation
   * @method removeEquation
   * @param {Equation} eq
   */
  ;

  _proto.removeEquation = function removeEquation(eq) {
    var eqs = this.equations;
    var i = eqs.indexOf(eq);

    if (i !== -1) {
      eqs.splice(i, 1);
    }
  }
  /**
   * Add all equations
   * @method removeAllEquations
   */
  ;

  _proto.removeAllEquations = function removeAllEquations() {
    this.equations.length = 0;
  };

  return Solver;
}();

/**
 * Constraint equation Gauss-Seidel solver.
 * @class GSSolver
 * @constructor
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @author schteppe / https://github.com/schteppe
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 * @extends Solver
 */
var GSSolver = /*#__PURE__*/function (_Solver) {
  _inheritsLoose(GSSolver, _Solver);

  // The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
  // When tolerance is reached, the system is assumed to be converged.
  function GSSolver() {
    var _this;

    _this = _Solver.call(this) || this;
    _this.iterations = 10;
    _this.tolerance = 1e-7;
    return _this;
  }
  /**
   * Solve
   * @method solve
   * @param  {Number} dt
   * @param  {World} world
   * @return {Number} number of iterations performed
   */


  var _proto = GSSolver.prototype;

  _proto.solve = function solve(dt, world) {
    var iter = 0;
    var maxIter = this.iterations;
    var tolSquared = this.tolerance * this.tolerance;
    var equations = this.equations;
    var Neq = equations.length;
    var bodies = world.bodies;
    var Nbodies = bodies.length;
    var h = dt;
    var B;
    var invC;
    var deltalambda;
    var deltalambdaTot;
    var GWlambda;
    var lambdaj; // Update solve mass

    if (Neq !== 0) {
      for (var i = 0; i !== Nbodies; i++) {
        bodies[i].updateSolveMassProperties();
      }
    } // Things that does not change during iteration can be computed once


    var invCs = GSSolver_solve_invCs;
    var Bs = GSSolver_solve_Bs;
    var lambda = GSSolver_solve_lambda;
    invCs.length = Neq;
    Bs.length = Neq;
    lambda.length = Neq;

    for (var _i = 0; _i !== Neq; _i++) {
      var c = equations[_i];
      lambda[_i] = 0.0;
      Bs[_i] = c.computeB(h);
      invCs[_i] = 1.0 / c.computeC();
    }

    if (Neq !== 0) {
      // Reset vlambda
      for (var _i2 = 0; _i2 !== Nbodies; _i2++) {
        var b = bodies[_i2];
        var vlambda = b.vlambda;
        var wlambda = b.wlambda;
        vlambda.set(0, 0, 0);
        wlambda.set(0, 0, 0);
      } // Iterate over equations


      for (iter = 0; iter !== maxIter; iter++) {
        // Accumulate the total error for each iteration.
        deltalambdaTot = 0.0;

        for (var j = 0; j !== Neq; j++) {
          var _c = equations[j]; // Compute iteration

          B = Bs[j];
          invC = invCs[j];
          lambdaj = lambda[j];
          GWlambda = _c.computeGWlambda();
          deltalambda = invC * (B - GWlambda - _c.eps * lambdaj); // Clamp if we are not within the min/max interval

          if (lambdaj + deltalambda < _c.minForce) {
            deltalambda = _c.minForce - lambdaj;
          } else if (lambdaj + deltalambda > _c.maxForce) {
            deltalambda = _c.maxForce - lambdaj;
          }

          lambda[j] += deltalambda;
          deltalambdaTot += deltalambda > 0.0 ? deltalambda : -deltalambda; // abs(deltalambda)

          _c.addToWlambda(deltalambda);
        } // If the total error is small enough - stop iterate


        if (deltalambdaTot * deltalambdaTot < tolSquared) {
          break;
        }
      } // Add result to velocity


      for (var _i3 = 0; _i3 !== Nbodies; _i3++) {
        var _b = bodies[_i3];
        var v = _b.velocity;
        var w = _b.angularVelocity;

        _b.vlambda.vmul(_b.linearFactor, _b.vlambda);

        v.vadd(_b.vlambda, v);

        _b.wlambda.vmul(_b.angularFactor, _b.wlambda);

        w.vadd(_b.wlambda, w);
      } // Set the .multiplier property of each equation


      var l = equations.length;
      var invDt = 1 / h;

      while (l--) {
        equations[l].multiplier = lambda[l] * invDt;
      }
    }

    return iter;
  };

  return GSSolver;
}(Solver);
var GSSolver_solve_lambda = []; // Just temporary number holders that we want to reuse each solve.

var GSSolver_solve_invCs = [];
var GSSolver_solve_Bs = [];

/**
 * Splits the equations into islands and solves them independently. Can improve performance.
 * @class SplitSolver
 * @constructor
 * @extends Solver
 * @param {Solver} subsolver
 */
var SplitSolver = /*#__PURE__*/function (_Solver) {
  _inheritsLoose(SplitSolver, _Solver);

  // The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
  // When tolerance is reached, the system is assumed to be converged.
  function SplitSolver(subsolver) {
    var _this;

    _this = _Solver.call(this) || this;
    _this.iterations = 10;
    _this.tolerance = 1e-7;
    _this.subsolver = subsolver;
    _this.nodes = [];
    _this.nodePool = []; // Create needed nodes, reuse if possible

    while (_this.nodePool.length < 128) {
      _this.nodePool.push(_this.createNode());
    }

    return _this;
  }

  var _proto = SplitSolver.prototype;

  _proto.createNode = function createNode() {
    return {
      body: null,
      children: [],
      eqs: [],
      visited: false
    };
  }
  /**
   * Solve the subsystems
   * @method solve
   * @param  {Number} dt
   * @param  {World} world
   * @return {Number} number of iterations performed
   */
  ;

  _proto.solve = function solve(dt, world) {
    var nodes = SplitSolver_solve_nodes;
    var nodePool = this.nodePool;
    var bodies = world.bodies;
    var equations = this.equations;
    var Neq = equations.length;
    var Nbodies = bodies.length;
    var subsolver = this.subsolver; // Create needed nodes, reuse if possible

    while (nodePool.length < Nbodies) {
      nodePool.push(this.createNode());
    }

    nodes.length = Nbodies;

    for (var i = 0; i < Nbodies; i++) {
      nodes[i] = nodePool[i];
    } // Reset node values


    for (var _i = 0; _i !== Nbodies; _i++) {
      var _node = nodes[_i];
      _node.body = bodies[_i];
      _node.children.length = 0;
      _node.eqs.length = 0;
      _node.visited = false;
    }

    for (var k = 0; k !== Neq; k++) {
      var eq = equations[k];

      var _i2 = bodies.indexOf(eq.bi);

      var j = bodies.indexOf(eq.bj);
      var ni = nodes[_i2];
      var nj = nodes[j];
      ni.children.push(nj);
      ni.eqs.push(eq);
      nj.children.push(ni);
      nj.eqs.push(eq);
    }

    var child;
    var n = 0;
    var eqs = SplitSolver_solve_eqs;
    subsolver.tolerance = this.tolerance;
    subsolver.iterations = this.iterations;
    var dummyWorld = SplitSolver_solve_dummyWorld;

    while (child = getUnvisitedNode(nodes)) {
      eqs.length = 0;
      dummyWorld.bodies.length = 0;
      bfs(child, visitFunc, dummyWorld.bodies, eqs);
      var Neqs = eqs.length;
      eqs = eqs.sort(sortById);

      for (var _i3 = 0; _i3 !== Neqs; _i3++) {
        subsolver.addEquation(eqs[_i3]);
      }

      var iter = subsolver.solve(dt, dummyWorld);
      subsolver.removeAllEquations();
      n++;
    }

    return n;
  };

  return SplitSolver;
}(Solver); // Returns the number of subsystems

var SplitSolver_solve_nodes = []; // All allocated node objects

var SplitSolver_solve_eqs = []; // Temp array

var SplitSolver_solve_dummyWorld = {
  bodies: []
}; // Temp object

var STATIC = Body.STATIC;

function getUnvisitedNode(nodes) {
  var Nnodes = nodes.length;

  for (var i = 0; i !== Nnodes; i++) {
    var _node2 = nodes[i];

    if (!_node2.visited && !(_node2.body.type & STATIC)) {
      return _node2;
    }
  }

  return false;
}

var queue = [];

function bfs(root, visitFunc, bds, eqs) {
  queue.push(root);
  root.visited = true;
  visitFunc(root, bds, eqs);

  while (queue.length) {
    var _node3 = queue.pop(); // Loop over unvisited child nodes


    var child = void 0;

    while (child = getUnvisitedNode(_node3.children)) {
      child.visited = true;
      visitFunc(child, bds, eqs);
      queue.push(child);
    }
  }
}

function visitFunc(node, bds, eqs) {
  bds.push(node.body);
  var Neqs = node.eqs.length;

  for (var i = 0; i !== Neqs; i++) {
    var eq = node.eqs[i];

    if (!eqs.includes(eq)) {
      eqs.push(eq);
    }
  }
}

function sortById(a, b) {
  return b.id - a.id;
}

/**
 * For pooling objects that can be reused.
 * @class Pool
 * @constructor
 */
var Pool = /*#__PURE__*/function () {
  function Pool() {
    this.objects = [];
    this.type = Object;
  }
  /**
   * Release an object after use
   * @method release
   * @param {Object} obj
   */


  var _proto = Pool.prototype;

  _proto.release = function release() {
    var Nargs = arguments.length;

    for (var i = 0; i !== Nargs; i++) {
      this.objects.push(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    }

    return this;
  }
  /**
   * Get an object
   * @method get
   * @return {mixed}
   */
  ;

  _proto.get = function get() {
    if (this.objects.length === 0) {
      return this.constructObject();
    } else {
      return this.objects.pop();
    }
  }
  /**
   * Construct an object. Should be implemented in each subclass.
   * @method constructObject
   * @return {mixed}
   */
  ;

  _proto.constructObject = function constructObject() {
    throw new Error('constructObject() not implemented in this Pool subclass yet!');
  }
  /**
   * @method resize
   * @param {number} size
   * @return {Pool} Self, for chaining
   */
  ;

  _proto.resize = function resize(size) {
    var objects = this.objects;

    while (objects.length > size) {
      objects.pop();
    }

    while (objects.length < size) {
      objects.push(this.constructObject());
    }

    return this;
  };

  return Pool;
}();

/**
 * @class Vec3Pool
 * @constructor
 * @extends Pool
 */

var Vec3Pool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(Vec3Pool, _Pool);

  function Vec3Pool() {
    var _this;

    _this = _Pool.call(this) || this;
    _this.type = Vec3;
    return _this;
  }
  /**
   * Construct a vector
   * @method constructObject
   * @return {Vec3}
   */


  var _proto = Vec3Pool.prototype;

  _proto.constructObject = function constructObject() {
    return new Vec3();
  };

  return Vec3Pool;
}(Pool);

var COLLISION_TYPES = {
  sphereSphere: Shape.types.SPHERE,
  spherePlane: Shape.types.SPHERE | Shape.types.PLANE,
  boxBox: Shape.types.BOX | Shape.types.BOX,
  sphereBox: Shape.types.SPHERE | Shape.types.BOX,
  planeBox: Shape.types.PLANE | Shape.types.BOX,
  convexConvex: Shape.types.CONVEXPOLYHEDRON,
  sphereConvex: Shape.types.SPHERE | Shape.types.CONVEXPOLYHEDRON,
  planeConvex: Shape.types.PLANE | Shape.types.CONVEXPOLYHEDRON,
  boxConvex: Shape.types.BOX | Shape.types.CONVEXPOLYHEDRON,
  sphereHeightfield: Shape.types.SPHERE | Shape.types.HEIGHTFIELD,
  boxHeightfield: Shape.types.BOX | Shape.types.HEIGHTFIELD,
  convexHeightfield: Shape.types.CONVEXPOLYHEDRON | Shape.types.HEIGHTFIELD,
  sphereParticle: Shape.types.PARTICLE | Shape.types.SPHERE,
  planeParticle: Shape.types.PLANE | Shape.types.PARTICLE,
  boxParticle: Shape.types.BOX | Shape.types.PARTICLE,
  convexParticle: Shape.types.PARTICLE | Shape.types.CONVEXPOLYHEDRON,
  sphereTrimesh: Shape.types.SPHERE | Shape.types.TRIMESH,
  planeTrimesh: Shape.types.PLANE | Shape.types.TRIMESH
};

/**
 * Helper class for the World. Generates ContactEquations.
 * @class Narrowphase
 * @constructor
 * @todo Sphere-ConvexPolyhedron contacts
 * @todo Contact reduction
 * @todo should move methods to prototype
 */
var Narrowphase = /*#__PURE__*/function () {
  // Internal storage of pooled contact points.
  // Pooled vectors.
  function Narrowphase(world) {
    this.contactPointPool = [];
    this.frictionEquationPool = [];
    this.result = [];
    this.frictionResult = [];
    this.v3pool = new Vec3Pool();
    this.world = world;
    this.currentContactMaterial = world.defaultContactMaterial;
    this.enableFrictionReduction = false;
  }
  /**
   * Make a contact object, by using the internal pool or creating a new one.
   * @method createContactEquation
   * @param {Body} bi
   * @param {Body} bj
   * @param {Shape} si
   * @param {Shape} sj
   * @param {Shape} overrideShapeA
   * @param {Shape} overrideShapeB
   * @return {ContactEquation}
   */


  var _proto = Narrowphase.prototype;

  _proto.createContactEquation = function createContactEquation(bi, bj, si, sj, overrideShapeA, overrideShapeB) {
    var c;

    if (this.contactPointPool.length) {
      c = this.contactPointPool.pop();
      c.bi = bi;
      c.bj = bj;
    } else {
      c = new ContactEquation(bi, bj);
    }

    c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;
    var cm = this.currentContactMaterial;
    c.restitution = cm.restitution;
    c.setSpookParams(cm.contactEquationStiffness, cm.contactEquationRelaxation, this.world.dt);
    var matA = si.material || bi.material;
    var matB = sj.material || bj.material;

    if (matA && matB && matA.restitution >= 0 && matB.restitution >= 0) {
      c.restitution = matA.restitution * matB.restitution;
    }

    c.si = overrideShapeA || si;
    c.sj = overrideShapeB || sj;
    return c;
  };

  _proto.createFrictionEquationsFromContact = function createFrictionEquationsFromContact(contactEquation, outArray) {
    var bodyA = contactEquation.bi;
    var bodyB = contactEquation.bj;
    var shapeA = contactEquation.si;
    var shapeB = contactEquation.sj;
    var world = this.world;
    var cm = this.currentContactMaterial; // If friction or restitution were specified in the material, use them

    var friction = cm.friction;
    var matA = shapeA.material || bodyA.material;
    var matB = shapeB.material || bodyB.material;

    if (matA && matB && matA.friction >= 0 && matB.friction >= 0) {
      friction = matA.friction * matB.friction;
    }

    if (friction > 0) {
      // Create 2 tangent equations
      var mug = friction * world.gravity.length();
      var reducedMass = bodyA.invMass + bodyB.invMass;

      if (reducedMass > 0) {
        reducedMass = 1 / reducedMass;
      }

      var pool = this.frictionEquationPool;
      var c1 = pool.length ? pool.pop() : new FrictionEquation(bodyA, bodyB, mug * reducedMass);
      var c2 = pool.length ? pool.pop() : new FrictionEquation(bodyA, bodyB, mug * reducedMass);
      c1.bi = c2.bi = bodyA;
      c1.bj = c2.bj = bodyB;
      c1.minForce = c2.minForce = -mug * reducedMass;
      c1.maxForce = c2.maxForce = mug * reducedMass; // Copy over the relative vectors

      c1.ri.copy(contactEquation.ri);
      c1.rj.copy(contactEquation.rj);
      c2.ri.copy(contactEquation.ri);
      c2.rj.copy(contactEquation.rj); // Construct tangents

      contactEquation.ni.tangents(c1.t, c2.t); // Set spook params

      c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);
      c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);
      c1.enabled = c2.enabled = contactEquation.enabled;
      outArray.push(c1, c2);
      return true;
    }

    return false;
  } // Take the average N latest contact point on the plane.
  ;

  _proto.createFrictionFromAverage = function createFrictionFromAverage(numContacts) {
    // The last contactEquation
    var c = this.result[this.result.length - 1]; // Create the result: two "average" friction equations

    if (!this.createFrictionEquationsFromContact(c, this.frictionResult) || numContacts === 1) {
      return;
    }

    var f1 = this.frictionResult[this.frictionResult.length - 2];
    var f2 = this.frictionResult[this.frictionResult.length - 1];
    averageNormal.setZero();
    averageContactPointA.setZero();
    averageContactPointB.setZero();
    var bodyA = c.bi;
    var bodyB = c.bj;

    for (var i = 0; i !== numContacts; i++) {
      c = this.result[this.result.length - 1 - i];

      if (c.bi !== bodyA) {
        averageNormal.vadd(c.ni, averageNormal);
        averageContactPointA.vadd(c.ri, averageContactPointA);
        averageContactPointB.vadd(c.rj, averageContactPointB);
      } else {
        averageNormal.vsub(c.ni, averageNormal);
        averageContactPointA.vadd(c.rj, averageContactPointA);
        averageContactPointB.vadd(c.ri, averageContactPointB);
      }
    }

    var invNumContacts = 1 / numContacts;
    averageContactPointA.scale(invNumContacts, f1.ri);
    averageContactPointB.scale(invNumContacts, f1.rj);
    f2.ri.copy(f1.ri); // Should be the same

    f2.rj.copy(f1.rj);
    averageNormal.normalize();
    averageNormal.tangents(f1.t, f2.t); // return eq;
  }
  /**
   * Generate all contacts between a list of body pairs
   * @method getContacts
   * @param {array} p1 Array of body indices
   * @param {array} p2 Array of body indices
   * @param {World} world
   * @param {array} result Array to store generated contacts
   * @param {array} oldcontacts Optional. Array of reusable contact objects
   */
  ;

  _proto.getContacts = function getContacts(p1, p2, world, result, oldcontacts, frictionResult, frictionPool) {
    // Save old contact objects
    this.contactPointPool = oldcontacts;
    this.frictionEquationPool = frictionPool;
    this.result = result;
    this.frictionResult = frictionResult;
    var qi = tmpQuat1;
    var qj = tmpQuat2;
    var xi = tmpVec1$3;
    var xj = tmpVec2$3;

    for (var k = 0, N = p1.length; k !== N; k++) {
      // Get current collision bodies
      var bi = p1[k];
      var bj = p2[k]; // Get contact material

      var bodyContactMaterial = null;

      if (bi.material && bj.material) {
        bodyContactMaterial = world.getContactMaterial(bi.material, bj.material) || null;
      }

      var justTest = bi.type & Body.KINEMATIC && bj.type & Body.STATIC || bi.type & Body.STATIC && bj.type & Body.KINEMATIC || bi.type & Body.KINEMATIC && bj.type & Body.KINEMATIC;

      for (var i = 0; i < bi.shapes.length; i++) {
        bi.quaternion.mult(bi.shapeOrientations[i], qi);
        bi.quaternion.vmult(bi.shapeOffsets[i], xi);
        xi.vadd(bi.position, xi);
        var si = bi.shapes[i];

        for (var j = 0; j < bj.shapes.length; j++) {
          // Compute world transform of shapes
          bj.quaternion.mult(bj.shapeOrientations[j], qj);
          bj.quaternion.vmult(bj.shapeOffsets[j], xj);
          xj.vadd(bj.position, xj);
          var sj = bj.shapes[j];

          if (!(si.collisionFilterMask & sj.collisionFilterGroup && sj.collisionFilterMask & si.collisionFilterGroup)) {
            continue;
          }

          if (xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius) {
            continue;
          } // Get collision material


          var shapeContactMaterial = null;

          if (si.material && sj.material) {
            shapeContactMaterial = world.getContactMaterial(si.material, sj.material) || null;
          }

          this.currentContactMaterial = shapeContactMaterial || bodyContactMaterial || world.defaultContactMaterial; // Get contacts

          var resolverIndex = si.type | sj.type;
          var resolver = this[resolverIndex];

          if (resolver) {
            var retval = false; // TO DO: investigate why sphereParticle and convexParticle
            // resolvers expect si and sj shapes to be in reverse order
            // (i.e. larger integer value type first instead of smaller first)

            if (si.type < sj.type) {
              retval = resolver.call(this, si, sj, xi, xj, qi, qj, bi, bj, si, sj, justTest);
            } else {
              retval = resolver.call(this, sj, si, xj, xi, qj, qi, bj, bi, si, sj, justTest);
            }

            if (retval && justTest) {
              // Register overlap
              world.shapeOverlapKeeper.set(si.id, sj.id);
              world.bodyOverlapKeeper.set(bi.id, bj.id);
            }
          }
        }
      }
    }
  };

  _proto.sphereSphere = function sphereSphere(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    if (justTest) {
      return xi.distanceSquared(xj) < Math.pow(si.radius + sj.radius, 2);
    } // We will have only one contact in this case


    var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj); // Contact normal

    xj.vsub(xi, r.ni);
    r.ni.normalize(); // Contact point locations

    r.ri.copy(r.ni);
    r.rj.copy(r.ni);
    r.ri.scale(si.radius, r.ri);
    r.rj.scale(-sj.radius, r.rj);
    r.ri.vadd(xi, r.ri);
    r.ri.vsub(bi.position, r.ri);
    r.rj.vadd(xj, r.rj);
    r.rj.vsub(bj.position, r.rj);
    this.result.push(r);
    this.createFrictionEquationsFromContact(r, this.frictionResult);
  };

  _proto.spherePlane = function spherePlane(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    // We will have one contact in this case
    var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj); // Contact normal

    r.ni.set(0, 0, 1);
    qj.vmult(r.ni, r.ni);
    r.ni.negate(r.ni); // body i is the sphere, flip normal

    r.ni.normalize(); // Needed?
    // Vector from sphere center to contact point

    r.ni.scale(si.radius, r.ri); // Project down sphere on plane

    xi.vsub(xj, point_on_plane_to_sphere);
    r.ni.scale(r.ni.dot(point_on_plane_to_sphere), plane_to_sphere_ortho);
    point_on_plane_to_sphere.vsub(plane_to_sphere_ortho, r.rj); // The sphere position projected to plane

    if (-point_on_plane_to_sphere.dot(r.ni) <= si.radius) {
      if (justTest) {
        return true;
      } // Make it relative to the body


      var ri = r.ri;
      var rj = r.rj;
      ri.vadd(xi, ri);
      ri.vsub(bi.position, ri);
      rj.vadd(xj, rj);
      rj.vsub(bj.position, rj);
      this.result.push(r);
      this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
  };

  _proto.boxBox = function boxBox(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    si.convexPolyhedronRepresentation.material = si.material;
    sj.convexPolyhedronRepresentation.material = sj.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
    return this.convexConvex(si.convexPolyhedronRepresentation, sj.convexPolyhedronRepresentation, xi, xj, qi, qj, bi, bj, si, sj, justTest);
  };

  _proto.sphereBox = function sphereBox(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    var v3pool = this.v3pool; // we refer to the box as body j

    var sides = sphereBox_sides;
    xi.vsub(xj, box_to_sphere);
    sj.getSideNormals(sides, qj);
    var R = si.radius;

    var found = false; // Store the resulting side penetration info

    var side_ns = sphereBox_side_ns;
    var side_ns1 = sphereBox_side_ns1;
    var side_ns2 = sphereBox_side_ns2;
    var side_h = null;
    var side_penetrations = 0;
    var side_dot1 = 0;
    var side_dot2 = 0;
    var side_distance = null;

    for (var idx = 0, nsides = sides.length; idx !== nsides && found === false; idx++) {
      // Get the plane side normal (ns)
      var ns = sphereBox_ns;
      ns.copy(sides[idx]);
      var h = ns.length();
      ns.normalize(); // The normal/distance dot product tells which side of the plane we are

      var dot = box_to_sphere.dot(ns);

      if (dot < h + R && dot > 0) {
        // Intersects plane. Now check the other two dimensions
        var ns1 = sphereBox_ns1;
        var ns2 = sphereBox_ns2;
        ns1.copy(sides[(idx + 1) % 3]);
        ns2.copy(sides[(idx + 2) % 3]);
        var h1 = ns1.length();
        var h2 = ns2.length();
        ns1.normalize();
        ns2.normalize();
        var dot1 = box_to_sphere.dot(ns1);
        var dot2 = box_to_sphere.dot(ns2);

        if (dot1 < h1 && dot1 > -h1 && dot2 < h2 && dot2 > -h2) {
          var _dist = Math.abs(dot - h - R);

          if (side_distance === null || _dist < side_distance) {
            side_distance = _dist;
            side_dot1 = dot1;
            side_dot2 = dot2;
            side_h = h;
            side_ns.copy(ns);
            side_ns1.copy(ns1);
            side_ns2.copy(ns2);
            side_penetrations++;

            if (justTest) {
              return true;
            }
          }
        }
      }
    }

    if (side_penetrations) {
      found = true;

      var _r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);

      side_ns.scale(-R, _r.ri); // Sphere r

      _r.ni.copy(side_ns);

      _r.ni.negate(_r.ni); // Normal should be out of sphere


      side_ns.scale(side_h, side_ns);
      side_ns1.scale(side_dot1, side_ns1);
      side_ns.vadd(side_ns1, side_ns);
      side_ns2.scale(side_dot2, side_ns2);
      side_ns.vadd(side_ns2, _r.rj); // Make relative to bodies

      _r.ri.vadd(xi, _r.ri);

      _r.ri.vsub(bi.position, _r.ri);

      _r.rj.vadd(xj, _r.rj);

      _r.rj.vsub(bj.position, _r.rj);

      this.result.push(_r);
      this.createFrictionEquationsFromContact(_r, this.frictionResult);
    } // Check corners


    var rj = v3pool.get();
    var sphere_to_corner = sphereBox_sphere_to_corner;

    for (var j = 0; j !== 2 && !found; j++) {
      for (var k = 0; k !== 2 && !found; k++) {
        for (var l = 0; l !== 2 && !found; l++) {
          rj.set(0, 0, 0);

          if (j) {
            rj.vadd(sides[0], rj);
          } else {
            rj.vsub(sides[0], rj);
          }

          if (k) {
            rj.vadd(sides[1], rj);
          } else {
            rj.vsub(sides[1], rj);
          }

          if (l) {
            rj.vadd(sides[2], rj);
          } else {
            rj.vsub(sides[2], rj);
          } // World position of corner


          xj.vadd(rj, sphere_to_corner);
          sphere_to_corner.vsub(xi, sphere_to_corner);

          if (sphere_to_corner.lengthSquared() < R * R) {
            if (justTest) {
              return true;
            }

            found = true;

            var _r2 = this.createContactEquation(bi, bj, si, sj, rsi, rsj);

            _r2.ri.copy(sphere_to_corner);

            _r2.ri.normalize();

            _r2.ni.copy(_r2.ri);

            _r2.ri.scale(R, _r2.ri);

            _r2.rj.copy(rj); // Make relative to bodies


            _r2.ri.vadd(xi, _r2.ri);

            _r2.ri.vsub(bi.position, _r2.ri);

            _r2.rj.vadd(xj, _r2.rj);

            _r2.rj.vsub(bj.position, _r2.rj);

            this.result.push(_r2);
            this.createFrictionEquationsFromContact(_r2, this.frictionResult);
          }
        }
      }
    }

    v3pool.release(rj);
    rj = null; // Check edges

    var edgeTangent = v3pool.get();
    var edgeCenter = v3pool.get();
    var r = v3pool.get(); // r = edge center to sphere center

    var orthogonal = v3pool.get();
    var dist = v3pool.get();
    var Nsides = sides.length;

    for (var _j = 0; _j !== Nsides && !found; _j++) {
      for (var _k = 0; _k !== Nsides && !found; _k++) {
        if (_j % 3 !== _k % 3) {
          // Get edge tangent
          sides[_k].cross(sides[_j], edgeTangent);

          edgeTangent.normalize();

          sides[_j].vadd(sides[_k], edgeCenter);

          r.copy(xi);
          r.vsub(edgeCenter, r);
          r.vsub(xj, r);
          var orthonorm = r.dot(edgeTangent); // distance from edge center to sphere center in the tangent direction

          edgeTangent.scale(orthonorm, orthogonal); // Vector from edge center to sphere center in the tangent direction
          // Find the third side orthogonal to this one

          var _l = 0;

          while (_l === _j % 3 || _l === _k % 3) {
            _l++;
          } // vec from edge center to sphere projected to the plane orthogonal to the edge tangent


          dist.copy(xi);
          dist.vsub(orthogonal, dist);
          dist.vsub(edgeCenter, dist);
          dist.vsub(xj, dist); // Distances in tangent direction and distance in the plane orthogonal to it

          var tdist = Math.abs(orthonorm);
          var ndist = dist.length();

          if (tdist < sides[_l].length() && ndist < R) {
            if (justTest) {
              return true;
            }

            found = true;
            var res = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
            edgeCenter.vadd(orthogonal, res.rj); // box rj

            res.rj.copy(res.rj);
            dist.negate(res.ni);
            res.ni.normalize();
            res.ri.copy(res.rj);
            res.ri.vadd(xj, res.ri);
            res.ri.vsub(xi, res.ri);
            res.ri.normalize();
            res.ri.scale(R, res.ri); // Make relative to bodies

            res.ri.vadd(xi, res.ri);
            res.ri.vsub(bi.position, res.ri);
            res.rj.vadd(xj, res.rj);
            res.rj.vsub(bj.position, res.rj);
            this.result.push(res);
            this.createFrictionEquationsFromContact(res, this.frictionResult);
          }
        }
      }
    }

    v3pool.release(edgeTangent, edgeCenter, r, orthogonal, dist);
  };

  _proto.planeBox = function planeBox(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    sj.convexPolyhedronRepresentation.material = sj.material;
    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
    sj.convexPolyhedronRepresentation.id = sj.id;
    return this.planeConvex(si, sj.convexPolyhedronRepresentation, xi, xj, qi, qj, bi, bj, si, sj, justTest);
  };

  _proto.convexConvex = function convexConvex(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest, faceListA, faceListB) {
    var sepAxis = convexConvex_sepAxis;

    if (xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius) {
      return;
    }

    if (si.findSeparatingAxis(sj, xi, qi, xj, qj, sepAxis, faceListA, faceListB)) {
      var res = [];
      var q = convexConvex_q;
      si.clipAgainstHull(xi, qi, sj, xj, qj, sepAxis, -100, 100, res);
      var numContacts = 0;

      for (var j = 0; j !== res.length; j++) {
        if (justTest) {
          return true;
        }

        var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
        var ri = r.ri;
        var rj = r.rj;
        sepAxis.negate(r.ni);
        res[j].normal.negate(q);
        q.scale(res[j].depth, q);
        res[j].point.vadd(q, ri);
        rj.copy(res[j].point); // Contact points are in world coordinates. Transform back to relative

        ri.vsub(xi, ri);
        rj.vsub(xj, rj); // Make relative to bodies

        ri.vadd(xi, ri);
        ri.vsub(bi.position, ri);
        rj.vadd(xj, rj);
        rj.vsub(bj.position, rj);
        this.result.push(r);
        numContacts++;

        if (!this.enableFrictionReduction) {
          this.createFrictionEquationsFromContact(r, this.frictionResult);
        }
      }

      if (this.enableFrictionReduction && numContacts) {
        this.createFrictionFromAverage(numContacts);
      }
    }
  };

  _proto.sphereConvex = function sphereConvex(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    var v3pool = this.v3pool;
    xi.vsub(xj, convex_to_sphere);
    var normals = sj.faceNormals;
    var faces = sj.faces;
    var verts = sj.vertices;
    var R = si.radius;
    //     return;
    // }

    var found = false; // Check corners

    for (var i = 0; i !== verts.length; i++) {
      var v = verts[i]; // World position of corner

      var worldCorner = sphereConvex_worldCorner;
      qj.vmult(v, worldCorner);
      xj.vadd(worldCorner, worldCorner);
      var sphere_to_corner = sphereConvex_sphereToCorner;
      worldCorner.vsub(xi, sphere_to_corner);

      if (sphere_to_corner.lengthSquared() < R * R) {
        if (justTest) {
          return true;
        }

        found = true;
        var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
        r.ri.copy(sphere_to_corner);
        r.ri.normalize();
        r.ni.copy(r.ri);
        r.ri.scale(R, r.ri);
        worldCorner.vsub(xj, r.rj); // Should be relative to the body.

        r.ri.vadd(xi, r.ri);
        r.ri.vsub(bi.position, r.ri); // Should be relative to the body.

        r.rj.vadd(xj, r.rj);
        r.rj.vsub(bj.position, r.rj);
        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
        return;
      }
    } // Check side (plane) intersections


    for (var _i = 0, nfaces = faces.length; _i !== nfaces && found === false; _i++) {
      var normal = normals[_i];
      var face = faces[_i]; // Get world-transformed normal of the face

      var worldNormal = sphereConvex_worldNormal;
      qj.vmult(normal, worldNormal); // Get a world vertex from the face

      var worldPoint = sphereConvex_worldPoint;
      qj.vmult(verts[face[0]], worldPoint);
      worldPoint.vadd(xj, worldPoint); // Get a point on the sphere, closest to the face normal

      var worldSpherePointClosestToPlane = sphereConvex_worldSpherePointClosestToPlane;
      worldNormal.scale(-R, worldSpherePointClosestToPlane);
      xi.vadd(worldSpherePointClosestToPlane, worldSpherePointClosestToPlane); // Vector from a face point to the closest point on the sphere

      var penetrationVec = sphereConvex_penetrationVec;
      worldSpherePointClosestToPlane.vsub(worldPoint, penetrationVec); // The penetration. Negative value means overlap.

      var penetration = penetrationVec.dot(worldNormal);
      var worldPointToSphere = sphereConvex_sphereToWorldPoint;
      xi.vsub(worldPoint, worldPointToSphere);

      if (penetration < 0 && worldPointToSphere.dot(worldNormal) > 0) {
        // Intersects plane. Now check if the sphere is inside the face polygon
        var faceVerts = []; // Face vertices, in world coords

        for (var j = 0, Nverts = face.length; j !== Nverts; j++) {
          var worldVertex = v3pool.get();
          qj.vmult(verts[face[j]], worldVertex);
          xj.vadd(worldVertex, worldVertex);
          faceVerts.push(worldVertex);
        }

        if (pointInPolygon(faceVerts, worldNormal, xi)) {
          // Is the sphere center in the face polygon?
          if (justTest) {
            return true;
          }

          found = true;

          var _r3 = this.createContactEquation(bi, bj, si, sj, rsi, rsj);

          worldNormal.scale(-R, _r3.ri); // Contact offset, from sphere center to contact

          worldNormal.negate(_r3.ni); // Normal pointing out of sphere

          var penetrationVec2 = v3pool.get();
          worldNormal.scale(-penetration, penetrationVec2);
          var penetrationSpherePoint = v3pool.get();
          worldNormal.scale(-R, penetrationSpherePoint); //xi.vsub(xj).vadd(penetrationSpherePoint).vadd(penetrationVec2 , r.rj);

          xi.vsub(xj, _r3.rj);

          _r3.rj.vadd(penetrationSpherePoint, _r3.rj);

          _r3.rj.vadd(penetrationVec2, _r3.rj); // Should be relative to the body.


          _r3.rj.vadd(xj, _r3.rj);

          _r3.rj.vsub(bj.position, _r3.rj); // Should be relative to the body.


          _r3.ri.vadd(xi, _r3.ri);

          _r3.ri.vsub(bi.position, _r3.ri);

          v3pool.release(penetrationVec2);
          v3pool.release(penetrationSpherePoint);
          this.result.push(_r3);
          this.createFrictionEquationsFromContact(_r3, this.frictionResult); // Release world vertices

          for (var _j2 = 0, Nfaceverts = faceVerts.length; _j2 !== Nfaceverts; _j2++) {
            v3pool.release(faceVerts[_j2]);
          }

          return; // We only expect *one* face contact
        } else {
          // Edge?
          for (var _j3 = 0; _j3 !== face.length; _j3++) {
            // Get two world transformed vertices
            var v1 = v3pool.get();
            var v2 = v3pool.get();
            qj.vmult(verts[face[(_j3 + 1) % face.length]], v1);
            qj.vmult(verts[face[(_j3 + 2) % face.length]], v2);
            xj.vadd(v1, v1);
            xj.vadd(v2, v2); // Construct edge vector

            var edge = sphereConvex_edge;
            v2.vsub(v1, edge); // Construct the same vector, but normalized

            var edgeUnit = sphereConvex_edgeUnit;
            edge.unit(edgeUnit); // p is xi projected onto the edge

            var p = v3pool.get();
            var v1_to_xi = v3pool.get();
            xi.vsub(v1, v1_to_xi);
            var dot = v1_to_xi.dot(edgeUnit);
            edgeUnit.scale(dot, p);
            p.vadd(v1, p); // Compute a vector from p to the center of the sphere

            var xi_to_p = v3pool.get();
            p.vsub(xi, xi_to_p); // Collision if the edge-sphere distance is less than the radius
            // AND if p is in between v1 and v2

            if (dot > 0 && dot * dot < edge.lengthSquared() && xi_to_p.lengthSquared() < R * R) {
              // Collision if the edge-sphere distance is less than the radius
              // Edge contact!
              if (justTest) {
                return true;
              }

              var _r4 = this.createContactEquation(bi, bj, si, sj, rsi, rsj);

              p.vsub(xj, _r4.rj);
              p.vsub(xi, _r4.ni);

              _r4.ni.normalize();

              _r4.ni.scale(R, _r4.ri); // Should be relative to the body.


              _r4.rj.vadd(xj, _r4.rj);

              _r4.rj.vsub(bj.position, _r4.rj); // Should be relative to the body.


              _r4.ri.vadd(xi, _r4.ri);

              _r4.ri.vsub(bi.position, _r4.ri);

              this.result.push(_r4);
              this.createFrictionEquationsFromContact(_r4, this.frictionResult); // Release world vertices

              for (var _j4 = 0, _Nfaceverts = faceVerts.length; _j4 !== _Nfaceverts; _j4++) {
                v3pool.release(faceVerts[_j4]);
              }

              v3pool.release(v1);
              v3pool.release(v2);
              v3pool.release(p);
              v3pool.release(xi_to_p);
              v3pool.release(v1_to_xi);
              return;
            }

            v3pool.release(v1);
            v3pool.release(v2);
            v3pool.release(p);
            v3pool.release(xi_to_p);
            v3pool.release(v1_to_xi);
          }
        } // Release world vertices


        for (var _j5 = 0, _Nfaceverts2 = faceVerts.length; _j5 !== _Nfaceverts2; _j5++) {
          v3pool.release(faceVerts[_j5]);
        }
      }
    }
  };

  _proto.planeConvex = function planeConvex(planeShape, convexShape, planePosition, convexPosition, planeQuat, convexQuat, planeBody, convexBody, si, sj, justTest) {
    // Simply return the points behind the plane.
    var worldVertex = planeConvex_v;
    var worldNormal = planeConvex_normal;
    worldNormal.set(0, 0, 1);
    planeQuat.vmult(worldNormal, worldNormal); // Turn normal according to plane orientation

    var numContacts = 0;
    var relpos = planeConvex_relpos;

    for (var i = 0; i !== convexShape.vertices.length; i++) {
      // Get world convex vertex
      worldVertex.copy(convexShape.vertices[i]);
      convexQuat.vmult(worldVertex, worldVertex);
      convexPosition.vadd(worldVertex, worldVertex);
      worldVertex.vsub(planePosition, relpos);
      var dot = worldNormal.dot(relpos);

      if (dot <= 0.0) {
        if (justTest) {
          return true;
        }

        var r = this.createContactEquation(planeBody, convexBody, planeShape, convexShape, si, sj); // Get vertex position projected on plane

        var projected = planeConvex_projected;
        worldNormal.scale(worldNormal.dot(relpos), projected);
        worldVertex.vsub(projected, projected);
        projected.vsub(planePosition, r.ri); // From plane to vertex projected on plane

        r.ni.copy(worldNormal); // Contact normal is the plane normal out from plane
        // rj is now just the vector from the convex center to the vertex

        worldVertex.vsub(convexPosition, r.rj); // Make it relative to the body

        r.ri.vadd(planePosition, r.ri);
        r.ri.vsub(planeBody.position, r.ri);
        r.rj.vadd(convexPosition, r.rj);
        r.rj.vsub(convexBody.position, r.rj);
        this.result.push(r);
        numContacts++;

        if (!this.enableFrictionReduction) {
          this.createFrictionEquationsFromContact(r, this.frictionResult);
        }
      }
    }

    if (this.enableFrictionReduction && numContacts) {
      this.createFrictionFromAverage(numContacts);
    }
  };

  _proto.boxConvex = function boxConvex(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    return this.convexConvex(si.convexPolyhedronRepresentation, sj, xi, xj, qi, qj, bi, bj, si, sj, justTest);
  };

  _proto.sphereHeightfield = function sphereHeightfield(sphereShape, hfShape, spherePos, hfPos, sphereQuat, hfQuat, sphereBody, hfBody, rsi, rsj, justTest) {
    var data = hfShape.data;
    var radius = sphereShape.radius;
    var w = hfShape.elementSize;
    var worldPillarOffset = sphereHeightfield_tmp2; // Get sphere position to heightfield local!

    var localSpherePos = sphereHeightfield_tmp1;
    Transform.pointToLocalFrame(hfPos, hfQuat, spherePos, localSpherePos); // Get the index of the data points to test against

    var iMinX = Math.floor((localSpherePos.x - radius) / w) - 1;
    var iMaxX = Math.ceil((localSpherePos.x + radius) / w) + 1;
    var iMinY = Math.floor((localSpherePos.y - radius) / w) - 1;
    var iMaxY = Math.ceil((localSpherePos.y + radius) / w) + 1; // Bail out if we are out of the terrain

    if (iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMinY > data[0].length) {
      return;
    } // Clamp index to edges


    if (iMinX < 0) {
      iMinX = 0;
    }

    if (iMaxX < 0) {
      iMaxX = 0;
    }

    if (iMinY < 0) {
      iMinY = 0;
    }

    if (iMaxY < 0) {
      iMaxY = 0;
    }

    if (iMinX >= data.length) {
      iMinX = data.length - 1;
    }

    if (iMaxX >= data.length) {
      iMaxX = data.length - 1;
    }

    if (iMaxY >= data[0].length) {
      iMaxY = data[0].length - 1;
    }

    if (iMinY >= data[0].length) {
      iMinY = data[0].length - 1;
    }

    var minMax = [];
    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1]; // Bail out if we can't touch the bounding height box

    if (localSpherePos.z - radius > max || localSpherePos.z + radius < min) {
      return;
    }

    var result = this.result;

    for (var i = iMinX; i < iMaxX; i++) {
      for (var j = iMinY; j < iMaxY; j++) {
        var numContactsBefore = result.length;
        var intersecting = false; // Lower triangle

        hfShape.getConvexTrianglePillar(i, j, false);
        Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);

        if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
          intersecting = this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody, sphereShape, hfShape, justTest);
        }

        if (justTest && intersecting) {
          return true;
        } // Upper triangle


        hfShape.getConvexTrianglePillar(i, j, true);
        Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);

        if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
          intersecting = this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody, sphereShape, hfShape, justTest);
        }

        if (justTest && intersecting) {
          return true;
        }

        var numContacts = result.length - numContactsBefore;

        if (numContacts > 2) {
          return;
        }
        /*
          // Skip all but 1
          for (let k = 0; k < numContacts - 1; k++) {
              result.pop();
          }
        */

      }
    }
  };

  _proto.boxHeightfield = function boxHeightfield(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    return this.convexHeightfield(si.convexPolyhedronRepresentation, sj, xi, xj, qi, qj, bi, bj, si, sj, justTest);
  };

  _proto.convexHeightfield = function convexHeightfield(convexShape, hfShape, convexPos, hfPos, convexQuat, hfQuat, convexBody, hfBody, rsi, rsj, justTest) {
    var data = hfShape.data;
    var w = hfShape.elementSize;
    var radius = convexShape.boundingSphereRadius;
    var worldPillarOffset = convexHeightfield_tmp2;
    var faceList = convexHeightfield_faceList; // Get sphere position to heightfield local!

    var localConvexPos = convexHeightfield_tmp1;
    Transform.pointToLocalFrame(hfPos, hfQuat, convexPos, localConvexPos); // Get the index of the data points to test against

    var iMinX = Math.floor((localConvexPos.x - radius) / w) - 1;
    var iMaxX = Math.ceil((localConvexPos.x + radius) / w) + 1;
    var iMinY = Math.floor((localConvexPos.y - radius) / w) - 1;
    var iMaxY = Math.ceil((localConvexPos.y + radius) / w) + 1; // Bail out if we are out of the terrain

    if (iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMinY > data[0].length) {
      return;
    } // Clamp index to edges


    if (iMinX < 0) {
      iMinX = 0;
    }

    if (iMaxX < 0) {
      iMaxX = 0;
    }

    if (iMinY < 0) {
      iMinY = 0;
    }

    if (iMaxY < 0) {
      iMaxY = 0;
    }

    if (iMinX >= data.length) {
      iMinX = data.length - 1;
    }

    if (iMaxX >= data.length) {
      iMaxX = data.length - 1;
    }

    if (iMaxY >= data[0].length) {
      iMaxY = data[0].length - 1;
    }

    if (iMinY >= data[0].length) {
      iMinY = data[0].length - 1;
    }

    var minMax = [];
    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1]; // Bail out if we're cant touch the bounding height box

    if (localConvexPos.z - radius > max || localConvexPos.z + radius < min) {
      return;
    }

    for (var i = iMinX; i < iMaxX; i++) {
      for (var j = iMinY; j < iMaxY; j++) {
        var intersecting = false; // Lower triangle

        hfShape.getConvexTrianglePillar(i, j, false);
        Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);

        if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
          intersecting = this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, justTest, faceList, null);
        }

        if (justTest && intersecting) {
          return true;
        } // Upper triangle


        hfShape.getConvexTrianglePillar(i, j, true);
        Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);

        if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
          intersecting = this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, justTest, faceList, null);
        }

        if (justTest && intersecting) {
          return true;
        }
      }
    }
  };

  _proto.sphereParticle = function sphereParticle(sj, si, xj, xi, qj, qi, bj, bi, rsi, rsj, justTest) {
    // The normal is the unit vector from sphere center to particle center
    var normal = particleSphere_normal;
    normal.set(0, 0, 1);
    xi.vsub(xj, normal);
    var lengthSquared = normal.lengthSquared();

    if (lengthSquared <= sj.radius * sj.radius) {
      if (justTest) {
        return true;
      }

      var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
      normal.normalize();
      r.rj.copy(normal);
      r.rj.scale(sj.radius, r.rj);
      r.ni.copy(normal); // Contact normal

      r.ni.negate(r.ni);
      r.ri.set(0, 0, 0); // Center of particle

      this.result.push(r);
      this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
  };

  _proto.planeParticle = function planeParticle(sj, si, xj, xi, qj, qi, bj, bi, rsi, rsj, justTest) {
    var normal = particlePlane_normal;
    normal.set(0, 0, 1);
    bj.quaternion.vmult(normal, normal); // Turn normal according to plane orientation

    var relpos = particlePlane_relpos;
    xi.vsub(bj.position, relpos);
    var dot = normal.dot(relpos);

    if (dot <= 0.0) {
      if (justTest) {
        return true;
      }

      var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
      r.ni.copy(normal); // Contact normal is the plane normal

      r.ni.negate(r.ni);
      r.ri.set(0, 0, 0); // Center of particle
      // Get particle position projected on plane

      var projected = particlePlane_projected;
      normal.scale(normal.dot(xi), projected);
      xi.vsub(projected, projected); //projected.vadd(bj.position,projected);
      // rj is now the projected world position minus plane position

      r.rj.copy(projected);
      this.result.push(r);
      this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
  };

  _proto.boxParticle = function boxParticle(si, sj, xi, xj, qi, qj, bi, bj, rsi, rsj, justTest) {
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    return this.convexParticle(si.convexPolyhedronRepresentation, sj, xi, xj, qi, qj, bi, bj, si, sj, justTest);
  };

  _proto.convexParticle = function convexParticle(sj, si, xj, xi, qj, qi, bj, bi, rsi, rsj, justTest) {
    var penetratedFaceIndex = -1;
    var penetratedFaceNormal = convexParticle_penetratedFaceNormal;
    var worldPenetrationVec = convexParticle_worldPenetrationVec;
    var minPenetration = null;

    var local = convexParticle_local;
    local.copy(xi);
    local.vsub(xj, local); // Convert position to relative the convex origin

    qj.conjugate(cqj);
    cqj.vmult(local, local);

    if (sj.pointIsInside(local)) {
      if (sj.worldVerticesNeedsUpdate) {
        sj.computeWorldVertices(xj, qj);
      }

      if (sj.worldFaceNormalsNeedsUpdate) {
        sj.computeWorldFaceNormals(qj);
      } // For each world polygon in the polyhedra


      for (var i = 0, nfaces = sj.faces.length; i !== nfaces; i++) {
        // Construct world face vertices
        var verts = [sj.worldVertices[sj.faces[i][0]]];
        var normal = sj.worldFaceNormals[i]; // Check how much the particle penetrates the polygon plane.

        xi.vsub(verts[0], convexParticle_vertexToParticle);
        var penetration = -normal.dot(convexParticle_vertexToParticle);

        if (minPenetration === null || Math.abs(penetration) < Math.abs(minPenetration)) {
          if (justTest) {
            return true;
          }

          minPenetration = penetration;
          penetratedFaceIndex = i;
          penetratedFaceNormal.copy(normal);
        }
      }

      if (penetratedFaceIndex !== -1) {
        // Setup contact
        var r = this.createContactEquation(bi, bj, si, sj, rsi, rsj);
        penetratedFaceNormal.scale(minPenetration, worldPenetrationVec); // rj is the particle position projected to the face

        worldPenetrationVec.vadd(xi, worldPenetrationVec);
        worldPenetrationVec.vsub(xj, worldPenetrationVec);
        r.rj.copy(worldPenetrationVec); //const projectedToFace = xi.vsub(xj).vadd(worldPenetrationVec);
        //projectedToFace.copy(r.rj);
        //qj.vmult(r.rj,r.rj);

        penetratedFaceNormal.negate(r.ni); // Contact normal

        r.ri.set(0, 0, 0); // Center of particle

        var ri = r.ri;
        var rj = r.rj; // Make relative to bodies

        ri.vadd(xi, ri);
        ri.vsub(bi.position, ri);
        rj.vadd(xj, rj);
        rj.vsub(bj.position, rj);
        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
      } else {
        console.warn('Point found inside convex, but did not find penetrating face!');
      }
    }
  };

  _proto.sphereTrimesh = function sphereTrimesh(sphereShape, trimeshShape, spherePos, trimeshPos, sphereQuat, trimeshQuat, sphereBody, trimeshBody, rsi, rsj, justTest) {
    var edgeVertexA = sphereTrimesh_edgeVertexA;
    var edgeVertexB = sphereTrimesh_edgeVertexB;
    var edgeVector = sphereTrimesh_edgeVector;
    var edgeVectorUnit = sphereTrimesh_edgeVectorUnit;
    var localSpherePos = sphereTrimesh_localSpherePos;
    var tmp = sphereTrimesh_tmp;
    var localSphereAABB = sphereTrimesh_localSphereAABB;
    var v2 = sphereTrimesh_v2;
    var relpos = sphereTrimesh_relpos;
    var triangles = sphereTrimesh_triangles; // Convert sphere position to local in the trimesh

    Transform.pointToLocalFrame(trimeshPos, trimeshQuat, spherePos, localSpherePos); // Get the aabb of the sphere locally in the trimesh

    var sphereRadius = sphereShape.radius;
    localSphereAABB.lowerBound.set(localSpherePos.x - sphereRadius, localSpherePos.y - sphereRadius, localSpherePos.z - sphereRadius);
    localSphereAABB.upperBound.set(localSpherePos.x + sphereRadius, localSpherePos.y + sphereRadius, localSpherePos.z + sphereRadius);
    trimeshShape.getTrianglesInAABB(localSphereAABB, triangles); //for (let i = 0; i < trimeshShape.indices.length / 3; i++) triangles.push(i); // All
    // Vertices

    var v = sphereTrimesh_v;
    var radiusSquared = sphereShape.radius * sphereShape.radius;

    for (var i = 0; i < triangles.length; i++) {
      for (var j = 0; j < 3; j++) {
        trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + j], v); // Check vertex overlap in sphere

        v.vsub(localSpherePos, relpos);

        if (relpos.lengthSquared() <= radiusSquared) {
          // Safe up
          v2.copy(v);
          Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v);
          v.vsub(spherePos, relpos);

          if (justTest) {
            return true;
          }

          var r = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape, rsi, rsj);
          r.ni.copy(relpos);
          r.ni.normalize(); // ri is the vector from sphere center to the sphere surface

          r.ri.copy(r.ni);
          r.ri.scale(sphereShape.radius, r.ri);
          r.ri.vadd(spherePos, r.ri);
          r.ri.vsub(sphereBody.position, r.ri);
          r.rj.copy(v);
          r.rj.vsub(trimeshBody.position, r.rj); // Store result

          this.result.push(r);
          this.createFrictionEquationsFromContact(r, this.frictionResult);
        }
      }
    } // Check all edges


    for (var _i2 = 0; _i2 < triangles.length; _i2++) {
      for (var _j6 = 0; _j6 < 3; _j6++) {
        trimeshShape.getVertex(trimeshShape.indices[triangles[_i2] * 3 + _j6], edgeVertexA);
        trimeshShape.getVertex(trimeshShape.indices[triangles[_i2] * 3 + (_j6 + 1) % 3], edgeVertexB);
        edgeVertexB.vsub(edgeVertexA, edgeVector); // Project sphere position to the edge

        localSpherePos.vsub(edgeVertexB, tmp);
        var positionAlongEdgeB = tmp.dot(edgeVector);
        localSpherePos.vsub(edgeVertexA, tmp);
        var positionAlongEdgeA = tmp.dot(edgeVector);

        if (positionAlongEdgeA > 0 && positionAlongEdgeB < 0) {
          // Now check the orthogonal distance from edge to sphere center
          localSpherePos.vsub(edgeVertexA, tmp);
          edgeVectorUnit.copy(edgeVector);
          edgeVectorUnit.normalize();
          positionAlongEdgeA = tmp.dot(edgeVectorUnit);
          edgeVectorUnit.scale(positionAlongEdgeA, tmp);
          tmp.vadd(edgeVertexA, tmp); // tmp is now the sphere center position projected to the edge, defined locally in the trimesh frame

          var dist = tmp.distanceTo(localSpherePos);

          if (dist < sphereShape.radius) {
            if (justTest) {
              return true;
            }

            var _r5 = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape, rsi, rsj);

            tmp.vsub(localSpherePos, _r5.ni);

            _r5.ni.normalize();

            _r5.ni.scale(sphereShape.radius, _r5.ri);

            _r5.ri.vadd(spherePos, _r5.ri);

            _r5.ri.vsub(sphereBody.position, _r5.ri);

            Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
            tmp.vsub(trimeshBody.position, _r5.rj);
            Transform.vectorToWorldFrame(trimeshQuat, _r5.ni, _r5.ni);
            Transform.vectorToWorldFrame(trimeshQuat, _r5.ri, _r5.ri);
            this.result.push(_r5);
            this.createFrictionEquationsFromContact(_r5, this.frictionResult);
          }
        }
      }
    } // Triangle faces


    var va = sphereTrimesh_va;
    var vb = sphereTrimesh_vb;
    var vc = sphereTrimesh_vc;
    var normal = sphereTrimesh_normal;

    for (var _i3 = 0, N = triangles.length; _i3 !== N; _i3++) {
      trimeshShape.getTriangleVertices(triangles[_i3], va, vb, vc);
      trimeshShape.getNormal(triangles[_i3], normal);
      localSpherePos.vsub(va, tmp);

      var _dist2 = tmp.dot(normal);

      normal.scale(_dist2, tmp);
      localSpherePos.vsub(tmp, tmp); // tmp is now the sphere position projected to the triangle plane

      _dist2 = tmp.distanceTo(localSpherePos);

      if (Ray.pointInTriangle(tmp, va, vb, vc) && _dist2 < sphereShape.radius) {
        if (justTest) {
          return true;
        }

        var _r6 = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape, rsi, rsj);

        tmp.vsub(localSpherePos, _r6.ni);

        _r6.ni.normalize();

        _r6.ni.scale(sphereShape.radius, _r6.ri);

        _r6.ri.vadd(spherePos, _r6.ri);

        _r6.ri.vsub(sphereBody.position, _r6.ri);

        Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
        tmp.vsub(trimeshBody.position, _r6.rj);
        Transform.vectorToWorldFrame(trimeshQuat, _r6.ni, _r6.ni);
        Transform.vectorToWorldFrame(trimeshQuat, _r6.ri, _r6.ri);
        this.result.push(_r6);
        this.createFrictionEquationsFromContact(_r6, this.frictionResult);
      }
    }

    triangles.length = 0;
  };

  _proto.planeTrimesh = function planeTrimesh(planeShape, trimeshShape, planePos, trimeshPos, planeQuat, trimeshQuat, planeBody, trimeshBody, rsi, rsj, justTest) {
    // Make contacts!
    var v = new Vec3();
    var normal = planeTrimesh_normal;
    normal.set(0, 0, 1);
    planeQuat.vmult(normal, normal); // Turn normal according to plane

    for (var i = 0; i < trimeshShape.vertices.length / 3; i++) {
      // Get world vertex from trimesh
      trimeshShape.getVertex(i, v); // Safe up

      var v2 = new Vec3();
      v2.copy(v);
      Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v); // Check plane side

      var relpos = planeTrimesh_relpos;
      v.vsub(planePos, relpos);
      var dot = normal.dot(relpos);

      if (dot <= 0.0) {
        if (justTest) {
          return true;
        }

        var r = this.createContactEquation(planeBody, trimeshBody, planeShape, trimeshShape, rsi, rsj);
        r.ni.copy(normal); // Contact normal is the plane normal
        // Get vertex position projected on plane

        var projected = planeTrimesh_projected;
        normal.scale(relpos.dot(normal), projected);
        v.vsub(projected, projected); // ri is the projected world position minus plane position

        r.ri.copy(projected);
        r.ri.vsub(planeBody.position, r.ri);
        r.rj.copy(v);
        r.rj.vsub(trimeshBody.position, r.rj); // Store result

        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
      }
    }
  } // convexTrimesh(
  //   si: ConvexPolyhedron, sj: Trimesh, xi: Vec3, xj: Vec3, qi: Quaternion, qj: Quaternion,
  //   bi: Body, bj: Body, rsi?: Shape | null, rsj?: Shape | null,
  //   faceListA?: number[] | null, faceListB?: number[] | null,
  // ) {
  //   const sepAxis = convexConvex_sepAxis;
  //   if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
  //       return;
  //   }
  //   // Construct a temp hull for each triangle
  //   const hullB = new ConvexPolyhedron();
  //   hullB.faces = [[0,1,2]];
  //   const va = new Vec3();
  //   const vb = new Vec3();
  //   const vc = new Vec3();
  //   hullB.vertices = [
  //       va,
  //       vb,
  //       vc
  //   ];
  //   for (let i = 0; i < sj.indices.length / 3; i++) {
  //       const triangleNormal = new Vec3();
  //       sj.getNormal(i, triangleNormal);
  //       hullB.faceNormals = [triangleNormal];
  //       sj.getTriangleVertices(i, va, vb, vc);
  //       let d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //       if(!d){
  //           triangleNormal.scale(-1, triangleNormal);
  //           d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //           if(!d){
  //               continue;
  //           }
  //       }
  //       const res: ConvexPolyhedronContactPoint[] = [];
  //       const q = convexConvex_q;
  //       si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
  //       for(let j = 0; j !== res.length; j++){
  //           const r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
  //               ri = r.ri,
  //               rj = r.rj;
  //           r.ni.copy(triangleNormal);
  //           r.ni.negate(r.ni);
  //           res[j].normal.negate(q);
  //           q.mult(res[j].depth, q);
  //           res[j].point.vadd(q, ri);
  //           rj.copy(res[j].point);
  //           // Contact points are in world coordinates. Transform back to relative
  //           ri.vsub(xi,ri);
  //           rj.vsub(xj,rj);
  //           // Make relative to bodies
  //           ri.vadd(xi, ri);
  //           ri.vsub(bi.position, ri);
  //           rj.vadd(xj, rj);
  //           rj.vsub(bj.position, rj);
  //           result.push(r);
  //       }
  //   }
  // }
  ;

  return Narrowphase;
}();
var averageNormal = new Vec3();
var averageContactPointA = new Vec3();
var averageContactPointB = new Vec3();
var tmpVec1$3 = new Vec3();
var tmpVec2$3 = new Vec3();
var tmpQuat1 = new Quaternion();
var tmpQuat2 = new Quaternion();

Narrowphase.prototype[COLLISION_TYPES.boxBox] = Narrowphase.prototype.boxBox;
Narrowphase.prototype[COLLISION_TYPES.boxConvex] = Narrowphase.prototype.boxConvex;
Narrowphase.prototype[COLLISION_TYPES.boxParticle] = Narrowphase.prototype.boxParticle;
Narrowphase.prototype[COLLISION_TYPES.sphereSphere] = Narrowphase.prototype.sphereSphere;
var planeTrimesh_normal = new Vec3();
var planeTrimesh_relpos = new Vec3();
var planeTrimesh_projected = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.planeTrimesh] = Narrowphase.prototype.planeTrimesh;
var sphereTrimesh_normal = new Vec3();
var sphereTrimesh_relpos = new Vec3();
var sphereTrimesh_projected = new Vec3();
var sphereTrimesh_v = new Vec3();
var sphereTrimesh_v2 = new Vec3();
var sphereTrimesh_edgeVertexA = new Vec3();
var sphereTrimesh_edgeVertexB = new Vec3();
var sphereTrimesh_edgeVector = new Vec3();
var sphereTrimesh_edgeVectorUnit = new Vec3();
var sphereTrimesh_localSpherePos = new Vec3();
var sphereTrimesh_tmp = new Vec3();
var sphereTrimesh_va = new Vec3();
var sphereTrimesh_vb = new Vec3();
var sphereTrimesh_vc = new Vec3();
var sphereTrimesh_localSphereAABB = new AABB();
var sphereTrimesh_triangles = [];
Narrowphase.prototype[COLLISION_TYPES.sphereTrimesh] = Narrowphase.prototype.sphereTrimesh;
var point_on_plane_to_sphere = new Vec3();
var plane_to_sphere_ortho = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.spherePlane] = Narrowphase.prototype.spherePlane; // See http://bulletphysics.com/Bullet/BulletFull/SphereTriangleDetector_8cpp_source.html

var pointInPolygon_edge = new Vec3();
var pointInPolygon_edge_x_normal = new Vec3();
var pointInPolygon_vtp = new Vec3();

function pointInPolygon(verts, normal, p) {
  var positiveResult = null;
  var N = verts.length;

  for (var i = 0; i !== N; i++) {
    var v = verts[i]; // Get edge to the next vertex

    var edge = pointInPolygon_edge;
    verts[(i + 1) % N].vsub(v, edge); // Get cross product between polygon normal and the edge

    var edge_x_normal = pointInPolygon_edge_x_normal; //const edge_x_normal = new Vec3();

    edge.cross(normal, edge_x_normal); // Get vector between point and current vertex

    var vertex_to_p = pointInPolygon_vtp;
    p.vsub(v, vertex_to_p); // This dot product determines which side of the edge the point is

    var r = edge_x_normal.dot(vertex_to_p); // If all such dot products have same sign, we are inside the polygon.

    if (positiveResult === null || r > 0 && positiveResult === true || r <= 0 && positiveResult === false) {
      if (positiveResult === null) {
        positiveResult = r > 0;
      }

      continue;
    } else {
      return false; // Encountered some other sign. Exit.
    }
  } // If we got here, all dot products were of the same sign.


  return true;
}

var box_to_sphere = new Vec3();
var sphereBox_ns = new Vec3();
var sphereBox_ns1 = new Vec3();
var sphereBox_ns2 = new Vec3();
var sphereBox_sides = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
var sphereBox_sphere_to_corner = new Vec3();
var sphereBox_side_ns = new Vec3();
var sphereBox_side_ns1 = new Vec3();
var sphereBox_side_ns2 = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.sphereBox] = Narrowphase.prototype.sphereBox;
var convex_to_sphere = new Vec3();
var sphereConvex_edge = new Vec3();
var sphereConvex_edgeUnit = new Vec3();
var sphereConvex_sphereToCorner = new Vec3();
var sphereConvex_worldCorner = new Vec3();
var sphereConvex_worldNormal = new Vec3();
var sphereConvex_worldPoint = new Vec3();
var sphereConvex_worldSpherePointClosestToPlane = new Vec3();
var sphereConvex_penetrationVec = new Vec3();
var sphereConvex_sphereToWorldPoint = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.sphereConvex] = Narrowphase.prototype.sphereConvex;
var planeBox_normal = new Vec3();
var plane_to_corner = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.planeBox] = Narrowphase.prototype.planeBox;
var planeConvex_v = new Vec3();
var planeConvex_normal = new Vec3();
var planeConvex_relpos = new Vec3();
var planeConvex_projected = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.planeConvex] = Narrowphase.prototype.planeConvex;
var convexConvex_sepAxis = new Vec3();
var convexConvex_q = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.convexConvex] = Narrowphase.prototype.convexConvex; // Narrowphase.prototype[COLLISION_TYPES.convexTrimesh] = Narrowphase.prototype.convexTrimesh

var particlePlane_normal = new Vec3();
var particlePlane_relpos = new Vec3();
var particlePlane_projected = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.planeParticle] = Narrowphase.prototype.planeParticle;
var particleSphere_normal = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.sphereParticle] = Narrowphase.prototype.sphereParticle; // WIP

var cqj = new Quaternion();
var convexParticle_local = new Vec3();
var convexParticle_normal = new Vec3();
var convexParticle_penetratedFaceNormal = new Vec3();
var convexParticle_vertexToParticle = new Vec3();
var convexParticle_worldPenetrationVec = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.convexParticle] = Narrowphase.prototype.convexParticle;
Narrowphase.prototype[COLLISION_TYPES.boxHeightfield] = Narrowphase.prototype.boxHeightfield;
var convexHeightfield_tmp1 = new Vec3();
var convexHeightfield_tmp2 = new Vec3();
var convexHeightfield_faceList = [0];
Narrowphase.prototype[COLLISION_TYPES.convexHeightfield] = Narrowphase.prototype.convexHeightfield;
var sphereHeightfield_tmp1 = new Vec3();
var sphereHeightfield_tmp2 = new Vec3();
Narrowphase.prototype[COLLISION_TYPES.sphereHeightfield] = Narrowphase.prototype.sphereHeightfield;

/**
 * @class OverlapKeeper
 * @constructor
 */
var OverlapKeeper = /*#__PURE__*/function () {
  function OverlapKeeper() {
    this.current = [];
    this.previous = [];
  }

  var _proto = OverlapKeeper.prototype;

  _proto.getKey = function getKey(i, j) {
    if (j < i) {
      var temp = j;
      j = i;
      i = temp;
    }

    return i << 16 | j;
  }
  /**
   * @method set
   * @param {Number} i
   * @param {Number} j
   */
  ;

  _proto.set = function set(i, j) {
    // Insertion sort. This way the diff will have linear complexity.
    var key = this.getKey(i, j);
    var current = this.current;
    var index = 0;

    while (key > current[index]) {
      index++;
    }

    if (key === current[index]) {
      return; // Pair was already added
    }

    for (var _j = current.length - 1; _j >= index; _j--) {
      current[_j + 1] = current[_j];
    }

    current[index] = key;
  }
  /**
   * @method tick
   */
  ;

  _proto.tick = function tick() {
    var tmp = this.current;
    this.current = this.previous;
    this.previous = tmp;
    this.current.length = 0;
  }
  /**
   * @method getDiff
   * @param  {array} additions
   * @param  {array} removals
   */
  ;

  _proto.getDiff = function getDiff(additions, removals) {
    var a = this.current;
    var b = this.previous;
    var al = a.length;
    var bl = b.length;
    var j = 0;

    for (var i = 0; i < al; i++) {
      var found = false;
      var keyA = a[i];

      while (keyA > b[j]) {
        j++;
      }

      found = keyA === b[j];

      if (!found) {
        unpackAndPush(additions, keyA);
      }
    }

    j = 0;

    for (var _i = 0; _i < bl; _i++) {
      var _found = false;
      var keyB = b[_i];

      while (keyB > a[j]) {
        j++;
      }

      _found = a[j] === keyB;

      if (!_found) {
        unpackAndPush(removals, keyB);
      }
    }
  };

  return OverlapKeeper;
}();

function unpackAndPush(array, key) {
  array.push((key & 0xffff0000) >> 16, key & 0x0000ffff);
}

/**
 * @class TupleDictionary
 * @constructor
 */
var TupleDictionary = /*#__PURE__*/function () {
  function TupleDictionary() {
    this.data = {
      keys: []
    };
  }
  /**
   * @method get
   * @param  {Number} i
   * @param  {Number} j
   * @return {Object}
   */


  var _proto = TupleDictionary.prototype;

  _proto.get = function get(i, j) {
    if (i > j) {
      // swap
      var temp = j;
      j = i;
      i = temp;
    }

    return this.data[i + "-" + j];
  }
  /**
   * @method set
   * @param  {Number} i
   * @param  {Number} j
   * @param {Object} value
   */
  ;

  _proto.set = function set(i, j, value) {
    if (i > j) {
      var temp = j;
      j = i;
      i = temp;
    }

    var key = i + "-" + j; // Check if key already exists

    if (!this.get(i, j)) {
      this.data.keys.push(key);
    }

    this.data[key] = value;
  }
  /**
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    var data = this.data;
    var keys = data.keys;

    while (keys.length > 0) {
      var key = keys.pop();
      delete data[key];
    }
  };

  return TupleDictionary;
}();

/**
 * The physics world
 * @class World
 * @constructor
 * @extends EventTarget
 * @param {object} [options]
 * @param {Vec3} [options.gravity]
 * @param {boolean} [options.allowSleep]
 * @param {Broadphase} [options.broadphase]
 * @param {Solver} [options.solver]
 * @param {boolean} [options.quatNormalizeFast]
 * @param {number} [options.quatNormalizeSkip]
 */
var World = /*#__PURE__*/function (_EventTarget) {
  _inheritsLoose(World, _EventTarget);

  // Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
  // Makes bodies go to sleep when they've been inactive.
  // All the current contacts (instances of ContactEquation) in the world.
  // How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
  // Set to true to use fast quaternion normalization. It is often enough accurate to use. If bodies tend to explode, set to false.
  // The wall-clock time since simulation start.
  // Number of timesteps taken since start.
  // Default and last timestep sizes.
  // The broadphase algorithm to use. Default is NaiveBroadphase.
  // All bodies in this world
  // True if any bodies are not sleeping, false if every body is sleeping.
  // The solver algorithm to use. Default is GSSolver.
  // CollisionMatrix from the previous step.
  // All added materials.
  // Used to look up a ContactMaterial given two instances of Material.
  // This contact material is used if no suitable contactmaterial is found for a contact.
  // Time accumulator for interpolation. See http://gafferongames.com/game-physics/fix-your-timestep/
  // Dispatched after a body has been added to the world.
  // Dispatched after a body has been removed from the world.
  function World(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _EventTarget.call(this) || this;
    _this.dt = -1;
    _this.allowSleep = !!options.allowSleep;
    _this.contacts = [];
    _this.frictionEquations = [];
    _this.quatNormalizeSkip = options.quatNormalizeSkip !== undefined ? options.quatNormalizeSkip : 0;
    _this.quatNormalizeFast = options.quatNormalizeFast !== undefined ? options.quatNormalizeFast : false;
    _this.time = 0.0;
    _this.stepnumber = 0;
    _this.default_dt = 1 / 60;
    _this.nextId = 0;
    _this.gravity = new Vec3();

    if (options.gravity) {
      _this.gravity.copy(options.gravity);
    }

    _this.broadphase = options.broadphase !== undefined ? options.broadphase : new NaiveBroadphase();
    _this.bodies = [];
    _this.hasActiveBodies = false;
    _this.solver = options.solver !== undefined ? options.solver : new GSSolver();
    _this.constraints = [];
    _this.narrowphase = new Narrowphase(_assertThisInitialized(_this));
    _this.collisionMatrix = new ArrayCollisionMatrix();
    _this.collisionMatrixPrevious = new ArrayCollisionMatrix();
    _this.bodyOverlapKeeper = new OverlapKeeper();
    _this.shapeOverlapKeeper = new OverlapKeeper();
    _this.materials = [];
    _this.contactmaterials = [];
    _this.contactMaterialTable = new TupleDictionary();
    _this.defaultMaterial = new Material('default');
    _this.defaultContactMaterial = new ContactMaterial(_this.defaultMaterial, _this.defaultMaterial, {
      friction: 0.3,
      restitution: 0.0
    });
    _this.doProfiling = false;
    _this.profile = {
      solve: 0,
      makeContactConstraints: 0,
      broadphase: 0,
      integrate: 0,
      narrowphase: 0
    };
    _this.accumulator = 0;
    _this.subsystems = [];
    _this.addBodyEvent = {
      type: 'addBody',
      body: null
    };
    _this.removeBodyEvent = {
      type: 'removeBody',
      body: null
    };
    _this.idToBodyMap = {};

    _this.broadphase.setWorld(_assertThisInitialized(_this));

    return _this;
  }
  /**
   * Get the contact material between materials m1 and m2
   * @method getContactMaterial
   * @param {Material} m1
   * @param {Material} m2
   * @return {ContactMaterial} The contact material if it was found.
   */


  var _proto = World.prototype;

  _proto.getContactMaterial = function getContactMaterial(m1, m2) {
    return this.contactMaterialTable.get(m1.id, m2.id);
  }
  /**
   * Get number of objects in the world.
   * @method numObjects
   * @return {Number}
   * @deprecated
   */
  ;

  _proto.numObjects = function numObjects() {
    return this.bodies.length;
  }
  /**
   * Store old collision state info
   * @method collisionMatrixTick
   */
  ;

  _proto.collisionMatrixTick = function collisionMatrixTick() {
    var temp = this.collisionMatrixPrevious;
    this.collisionMatrixPrevious = this.collisionMatrix;
    this.collisionMatrix = temp;
    this.collisionMatrix.reset();
    this.bodyOverlapKeeper.tick();
    this.shapeOverlapKeeper.tick();
  }
  /**
   * Add a constraint to the simulation.
   * @method addConstraint
   * @param {Constraint} c
   */
  ;

  _proto.addConstraint = function addConstraint(c) {
    this.constraints.push(c);
  }
  /**
   * Removes a constraint
   * @method removeConstraint
   * @param {Constraint} c
   */
  ;

  _proto.removeConstraint = function removeConstraint(c) {
    var idx = this.constraints.indexOf(c);

    if (idx !== -1) {
      this.constraints.splice(idx, 1);
    }
  }
  /**
   * Raycast test
   * @method rayTest
   * @param {Vec3} from
   * @param {Vec3} to
   * @param {RaycastResult} result
   * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
   */
  ;

  _proto.rayTest = function rayTest(from, to, result) {
    if (result instanceof RaycastResult) {
      // Do raycastClosest
      this.raycastClosest(from, to, {
        skipBackfaces: true
      }, result);
    } else {
      // Do raycastAll
      this.raycastAll(from, to, {
        skipBackfaces: true
      }, result);
    }
  }
  /**
   * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
   * @method raycastAll
   * @param  {Vec3} from
   * @param  {Vec3} to
   * @param  {Object} options
   * @param  {number} [options.collisionFilterMask=-1]
   * @param  {number} [options.collisionFilterGroup=-1]
   * @param  {boolean} [options.skipBackfaces=false]
   * @param  {boolean} [options.checkCollisionResponse=true]
   * @param  {Function} callback
   * @return {boolean} True if any body was hit.
   */
  ;

  _proto.raycastAll = function raycastAll(from, to, options, callback) {
    if (options === void 0) {
      options = {};
    }

    options.mode = Ray.ALL;
    options.from = from;
    options.to = to;
    options.callback = callback;
    return tmpRay$1.intersectWorld(this, options);
  }
  /**
   * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
   * @method raycastAny
   * @param  {Vec3} from
   * @param  {Vec3} to
   * @param  {Object} options
   * @param  {number} [options.collisionFilterMask=-1]
   * @param  {number} [options.collisionFilterGroup=-1]
   * @param  {boolean} [options.skipBackfaces=false]
   * @param  {boolean} [options.checkCollisionResponse=true]
   * @param  {RaycastResult} result
   * @return {boolean} True if any body was hit.
   */
  ;

  _proto.raycastAny = function raycastAny(from, to, options, result) {
    if (options === void 0) {
      options = {};
    }

    options.mode = Ray.ANY;
    options.from = from;
    options.to = to;
    options.result = result;
    return tmpRay$1.intersectWorld(this, options);
  }
  /**
   * Ray cast, and return information of the closest hit.
   * @method raycastClosest
   * @param  {Vec3} from
   * @param  {Vec3} to
   * @param  {Object} options
   * @param  {number} [options.collisionFilterMask=-1]
   * @param  {number} [options.collisionFilterGroup=-1]
   * @param  {boolean} [options.skipBackfaces=false]
   * @param  {boolean} [options.checkCollisionResponse=true]
   * @param  {RaycastResult} result
   * @return {boolean} True if any body was hit.
   */
  ;

  _proto.raycastClosest = function raycastClosest(from, to, options, result) {
    if (options === void 0) {
      options = {};
    }

    options.mode = Ray.CLOSEST;
    options.from = from;
    options.to = to;
    options.result = result;
    return tmpRay$1.intersectWorld(this, options);
  }
  /**
   * Add a rigid body to the simulation.
   * @method add
   * @param {Body} body
   * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
   * @todo Adding an array of bodies should be possible. This would save some loops too
   */
  ;

  _proto.addBody = function addBody(body) {
    if (this.bodies.includes(body)) {
      return;
    }

    body.index = this.bodies.length;
    this.bodies.push(body);
    body.world = this;
    body.initPosition.copy(body.position);
    body.initVelocity.copy(body.velocity);
    body.timeLastSleepy = this.time;

    if (body instanceof Body) {
      body.initAngularVelocity.copy(body.angularVelocity);
      body.initQuaternion.copy(body.quaternion);
    }

    this.collisionMatrix.setNumObjects(this.bodies.length);
    this.addBodyEvent.body = body;
    this.idToBodyMap[body.id] = body;
    this.dispatchEvent(this.addBodyEvent);
  }
  /**
   * Remove a rigid body from the simulation.
   * @method remove
   * @param {Body} body
   */
  ;

  _proto.removeBody = function removeBody(body) {
    body.world = null;
    var n = this.bodies.length - 1;
    var bodies = this.bodies;
    var idx = bodies.indexOf(body);

    if (idx !== -1) {
      bodies.splice(idx, 1); // Todo: should use a garbage free method
      // Recompute index

      for (var i = 0; i !== bodies.length; i++) {
        bodies[i].index = i;
      }

      this.collisionMatrix.setNumObjects(n);
      this.removeBodyEvent.body = body;
      delete this.idToBodyMap[body.id];
      this.dispatchEvent(this.removeBodyEvent);
    }
  };

  _proto.getBodyById = function getBodyById(id) {
    return this.idToBodyMap[id];
  } // TODO Make a faster map
  ;

  _proto.getShapeById = function getShapeById(id) {
    var bodies = this.bodies;

    for (var i = 0, bl = bodies.length; i < bl; i++) {
      var shapes = bodies[i].shapes;

      for (var j = 0, sl = shapes.length; j < sl; j++) {
        var shape = shapes[j];

        if (shape.id === id) {
          return shape;
        }
      }
    }
  }
  /**
   * Adds a material to the World.
   * @method addMaterial
   * @param {Material} m
   * @todo Necessary?
   */
  ;

  _proto.addMaterial = function addMaterial(m) {
    this.materials.push(m);
  }
  /**
   * Adds a contact material to the World
   * @method addContactMaterial
   * @param {ContactMaterial} cmat
   */
  ;

  _proto.addContactMaterial = function addContactMaterial(cmat) {
    // Add contact material
    this.contactmaterials.push(cmat); // Add current contact material to the material table

    this.contactMaterialTable.set(cmat.materials[0].id, cmat.materials[1].id, cmat);
  }
  /**
   * Step the physics world forward in time.
   *
   * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
   *
   * @method step
   * @param {Number} dt                       The fixed time step size to use.
   * @param {Number} [timeSinceLastCalled]    The time elapsed since the function was last called.
   * @param {Number} [maxSubSteps=10]         Maximum number of fixed steps to take per function call.
   *
   * @example
   *     // fixed timestepping without interpolation
   *     world.step(1/60);
   *
   * @see http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World
   */
  ;

  _proto.step = function step(dt, timeSinceLastCalled, maxSubSteps) {
    if (timeSinceLastCalled === void 0) {
      timeSinceLastCalled = 0;
    }

    if (maxSubSteps === void 0) {
      maxSubSteps = 10;
    }

    if (timeSinceLastCalled === 0) {
      // Fixed, simple stepping
      this.internalStep(dt); // Increment time

      this.time += dt;
    } else {
      this.accumulator += timeSinceLastCalled;
      var substeps = 0;

      while (this.accumulator >= dt && substeps < maxSubSteps) {
        // Do fixed steps to catch up
        this.internalStep(dt);
        this.accumulator -= dt;
        substeps++;
      }

      var t = this.accumulator % dt / dt;

      for (var j = 0; j !== this.bodies.length; j++) {
        var b = this.bodies[j];
        b.previousPosition.lerp(b.position, t, b.interpolatedPosition);
        b.previousQuaternion.slerp(b.quaternion, t, b.interpolatedQuaternion);
        b.previousQuaternion.normalize();
      }

      this.time += timeSinceLastCalled;
    }
  };

  _proto.internalStep = function internalStep(dt) {
    this.dt = dt;
    var contacts = this.contacts;
    var p1 = World_step_p1;
    var p2 = World_step_p2;
    var N = this.numObjects();
    var bodies = this.bodies;
    var solver = this.solver;
    var gravity = this.gravity;
    var doProfiling = this.doProfiling;
    var profile = this.profile;
    var DYNAMIC = Body.DYNAMIC;
    var profilingStart = -Infinity;
    var constraints = this.constraints;
    var frictionEquationPool = World_step_frictionEquationPool;
    var gnorm = gravity.length();
    var gx = gravity.x;
    var gy = gravity.y;
    var gz = gravity.z;
    var i = 0;

    if (doProfiling) {
      profilingStart = performance.now();
    } // Add gravity to all objects


    for (i = 0; i !== N; i++) {
      var bi = bodies[i];

      if (bi.type === DYNAMIC) {
        // Only for dynamic bodies
        var f = bi.force;
        var m = bi.mass;
        f.x += m * gx;
        f.y += m * gy;
        f.z += m * gz;
      }
    } // Update subsystems


    for (var _i = 0, Nsubsystems = this.subsystems.length; _i !== Nsubsystems; _i++) {
      this.subsystems[_i].update();
    } // Collision detection


    if (doProfiling) {
      profilingStart = performance.now();
    }

    p1.length = 0; // Clean up pair arrays from last step

    p2.length = 0;
    this.broadphase.collisionPairs(this, p1, p2);

    if (doProfiling) {
      profile.broadphase = performance.now() - profilingStart;
    } // Remove constrained pairs with collideConnected == false


    var Nconstraints = constraints.length;

    for (i = 0; i !== Nconstraints; i++) {
      var c = constraints[i];

      if (!c.collideConnected) {
        for (var j = p1.length - 1; j >= 0; j -= 1) {
          if (c.bodyA === p1[j] && c.bodyB === p2[j] || c.bodyB === p1[j] && c.bodyA === p2[j]) {
            p1.splice(j, 1);
            p2.splice(j, 1);
          }
        }
      }
    }

    this.collisionMatrixTick(); // Generate contacts

    if (doProfiling) {
      profilingStart = performance.now();
    }

    var oldcontacts = World_step_oldContacts;
    var NoldContacts = contacts.length;

    for (i = 0; i !== NoldContacts; i++) {
      oldcontacts.push(contacts[i]);
    }

    contacts.length = 0; // Transfer FrictionEquation from current list to the pool for reuse

    var NoldFrictionEquations = this.frictionEquations.length;

    for (i = 0; i !== NoldFrictionEquations; i++) {
      frictionEquationPool.push(this.frictionEquations[i]);
    }

    this.frictionEquations.length = 0;
    this.narrowphase.getContacts(p1, p2, this, contacts, oldcontacts, // To be reused
    this.frictionEquations, frictionEquationPool);

    if (doProfiling) {
      profile.narrowphase = performance.now() - profilingStart;
    } // Loop over all collisions


    if (doProfiling) {
      profilingStart = performance.now();
    } // Add all friction eqs


    for (i = 0; i < this.frictionEquations.length; i++) {
      solver.addEquation(this.frictionEquations[i]);
    }

    var ncontacts = contacts.length;

    for (var k = 0; k !== ncontacts; k++) {
      // Current contact
      var _c = contacts[k]; // Get current collision indeces

      var _bi = _c.bi;
      var bj = _c.bj;
      var si = _c.si;
      var sj = _c.sj; // Get collision properties

      var cm = void 0;

      if (_bi.material && bj.material) {
        cm = this.getContactMaterial(_bi.material, bj.material) || this.defaultContactMaterial;
      } else {
        cm = this.defaultContactMaterial;
      } // c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;


      var mu = cm.friction; // c.restitution = cm.restitution;
      // If friction or restitution were specified in the material, use them

      if (_bi.material && bj.material) {
        if (_bi.material.friction >= 0 && bj.material.friction >= 0) {
          mu = _bi.material.friction * bj.material.friction;
        }

        if (_bi.material.restitution >= 0 && bj.material.restitution >= 0) {
          _c.restitution = _bi.material.restitution * bj.material.restitution;
        }
      } // c.setSpookParams(
      //           cm.contactEquationStiffness,
      //           cm.contactEquationRelaxation,
      //           dt
      //       );


      solver.addEquation(_c); // // Add friction constraint equation
      // if(mu > 0){
      // 	// Create 2 tangent equations
      // 	const mug = mu * gnorm;
      // 	const reducedMass = (bi.invMass + bj.invMass);
      // 	if(reducedMass > 0){
      // 		reducedMass = 1/reducedMass;
      // 	}
      // 	const pool = frictionEquationPool;
      // 	const c1 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
      // 	const c2 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
      // 	this.frictionEquations.push(c1, c2);
      // 	c1.bi = c2.bi = bi;
      // 	c1.bj = c2.bj = bj;
      // 	c1.minForce = c2.minForce = -mug*reducedMass;
      // 	c1.maxForce = c2.maxForce = mug*reducedMass;
      // 	// Copy over the relative vectors
      // 	c1.ri.copy(c.ri);
      // 	c1.rj.copy(c.rj);
      // 	c2.ri.copy(c.ri);
      // 	c2.rj.copy(c.rj);
      // 	// Construct tangents
      // 	c.ni.tangents(c1.t, c2.t);
      //           // Set spook params
      //           c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
      //           c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
      //           c1.enabled = c2.enabled = c.enabled;
      // 	// Add equations to solver
      // 	solver.addEquation(c1);
      // 	solver.addEquation(c2);
      // }

      if (_bi.allowSleep && _bi.type === Body.DYNAMIC && _bi.sleepState === Body.SLEEPING && bj.sleepState === Body.AWAKE && bj.type !== Body.STATIC) {
        var speedSquaredB = bj.velocity.lengthSquared() + bj.angularVelocity.lengthSquared();
        var speedLimitSquaredB = Math.pow(bj.sleepSpeedLimit, 2);

        if (speedSquaredB >= speedLimitSquaredB * 2) {
          _bi.wakeUpAfterNarrowphase = true;
        }
      }

      if (bj.allowSleep && bj.type === Body.DYNAMIC && bj.sleepState === Body.SLEEPING && _bi.sleepState === Body.AWAKE && _bi.type !== Body.STATIC) {
        var speedSquaredA = _bi.velocity.lengthSquared() + _bi.angularVelocity.lengthSquared();

        var speedLimitSquaredA = Math.pow(_bi.sleepSpeedLimit, 2);

        if (speedSquaredA >= speedLimitSquaredA * 2) {
          bj.wakeUpAfterNarrowphase = true;
        }
      } // Now we know that i and j are in contact. Set collision matrix state


      this.collisionMatrix.set(_bi, bj, true);

      if (!this.collisionMatrixPrevious.get(_bi, bj)) {
        // First contact!
        // We reuse the collideEvent object, otherwise we will end up creating new objects for each new contact, even if there's no event listener attached.
        World_step_collideEvent.body = bj;
        World_step_collideEvent.contact = _c;

        _bi.dispatchEvent(World_step_collideEvent);

        World_step_collideEvent.body = _bi;
        bj.dispatchEvent(World_step_collideEvent);
      }

      this.bodyOverlapKeeper.set(_bi.id, bj.id);
      this.shapeOverlapKeeper.set(si.id, sj.id);
    }

    this.emitContactEvents();

    if (doProfiling) {
      profile.makeContactConstraints = performance.now() - profilingStart;
      profilingStart = performance.now();
    } // Wake up bodies


    for (i = 0; i !== N; i++) {
      var _bi2 = bodies[i];

      if (_bi2.wakeUpAfterNarrowphase) {
        _bi2.wakeUp();

        _bi2.wakeUpAfterNarrowphase = false;
      }
    } // Add user-added constraints


    Nconstraints = constraints.length;

    for (i = 0; i !== Nconstraints; i++) {
      var _c2 = constraints[i];

      _c2.update();

      for (var _j = 0, Neq = _c2.equations.length; _j !== Neq; _j++) {
        var eq = _c2.equations[_j];
        solver.addEquation(eq);
      }
    } // Solve the constrained system


    solver.solve(dt, this);

    if (doProfiling) {
      profile.solve = performance.now() - profilingStart;
    } // Remove all contacts from solver


    solver.removeAllEquations(); // Apply damping, see http://code.google.com/p/bullet/issues/detail?id=74 for details

    var pow = Math.pow;

    for (i = 0; i !== N; i++) {
      var _bi3 = bodies[i];

      if (_bi3.type & DYNAMIC) {
        // Only for dynamic bodies
        var ld = pow(1.0 - _bi3.linearDamping, dt);
        var v = _bi3.velocity;
        v.scale(ld, v);
        var av = _bi3.angularVelocity;

        if (av) {
          var ad = pow(1.0 - _bi3.angularDamping, dt);
          av.scale(ad, av);
        }
      }
    }

    this.dispatchEvent(World_step_preStepEvent); // Invoke pre-step callbacks

    for (i = 0; i !== N; i++) {
      var _bi4 = bodies[i];

      if (_bi4.preStep) {
        _bi4.preStep.call(_bi4);
      }
    } // Leap frog
    // vnew = v + h*f/m
    // xnew = x + h*vnew


    if (doProfiling) {
      profilingStart = performance.now();
    }

    var stepnumber = this.stepnumber;
    var quatNormalize = stepnumber % (this.quatNormalizeSkip + 1) === 0;
    var quatNormalizeFast = this.quatNormalizeFast;

    for (i = 0; i !== N; i++) {
      bodies[i].integrate(dt, quatNormalize, quatNormalizeFast);
    }

    this.clearForces();
    this.broadphase.dirty = true;

    if (doProfiling) {
      profile.integrate = performance.now() - profilingStart;
    } // Update world time


    this.time += dt;
    this.stepnumber += 1;
    this.dispatchEvent(World_step_postStepEvent); // Invoke post-step callbacks

    for (i = 0; i !== N; i++) {
      var _bi5 = bodies[i];
      var postStep = _bi5.postStep;

      if (postStep) {
        postStep.call(_bi5);
      }
    } // Sleeping update


    var hasActiveBodies = true;

    if (this.allowSleep) {
      hasActiveBodies = false;

      for (i = 0; i !== N; i++) {
        var _bi6 = bodies[i];

        _bi6.sleepTick(this.time);

        if (_bi6.sleepState !== Body.SLEEPING) {
          hasActiveBodies = true;
        }
      }
    }

    this.hasActiveBodies = hasActiveBodies;
  }
  /**
   * Sets all body forces in the world to zero.
   * @method clearForces
   */
  ;

  _proto.clearForces = function clearForces() {
    var bodies = this.bodies;
    var N = bodies.length;

    for (var i = 0; i !== N; i++) {
      var b = bodies[i];
      var force = b.force;
      var tau = b.torque;
      b.force.set(0, 0, 0);
      b.torque.set(0, 0, 0);
    }
  };

  return World;
}(EventTarget); // Temp stuff

var tmpAABB1 = new AABB();
var tmpRay$1 = new Ray(); // performance.now()

if (typeof performance === 'undefined') {
  performance = {};
}

if (!performance.now) {
  var nowOffset = Date.now();

  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart;
  }

  performance.now = function () {
    return Date.now() - nowOffset;
  };
}

var step_tmp1 = new Vec3(); // Dispatched after the world has stepped forward in time.
// Reusable event objects to save memory.

var World_step_postStepEvent = {
  type: 'postStep'
}; // Dispatched before the world steps forward in time.

var World_step_preStepEvent = {
  type: 'preStep'
};
var World_step_collideEvent = {
  type: Body.COLLIDE_EVENT_NAME,
  body: null,
  contact: null
}; // Pools for unused objects

var World_step_oldContacts = [];
var World_step_frictionEquationPool = []; // Reusable arrays for collision pairs

var World_step_p1 = [];
var World_step_p2 = [];

World.prototype.emitContactEvents = function () {
  var additions = [];
  var removals = [];
  var beginContactEvent = {
    type: 'beginContact',
    bodyA: null,
    bodyB: null
  };
  var endContactEvent = {
    type: 'endContact',
    bodyA: null,
    bodyB: null
  };
  var beginShapeContactEvent = {
    type: 'beginShapeContact',
    bodyA: null,
    bodyB: null,
    shapeA: null,
    shapeB: null
  };
  var endShapeContactEvent = {
    type: 'endShapeContact',
    bodyA: null,
    bodyB: null,
    shapeA: null,
    shapeB: null
  };
  return function () {
    var hasBeginContact = this.hasAnyEventListener('beginContact');
    var hasEndContact = this.hasAnyEventListener('endContact');

    if (hasBeginContact || hasEndContact) {
      this.bodyOverlapKeeper.getDiff(additions, removals);
    }

    if (hasBeginContact) {
      for (var i = 0, l = additions.length; i < l; i += 2) {
        beginContactEvent.bodyA = this.getBodyById(additions[i]);
        beginContactEvent.bodyB = this.getBodyById(additions[i + 1]);
        this.dispatchEvent(beginContactEvent);
      }

      beginContactEvent.bodyA = beginContactEvent.bodyB = null;
    }

    if (hasEndContact) {
      for (var _i2 = 0, _l = removals.length; _i2 < _l; _i2 += 2) {
        endContactEvent.bodyA = this.getBodyById(removals[_i2]);
        endContactEvent.bodyB = this.getBodyById(removals[_i2 + 1]);
        this.dispatchEvent(endContactEvent);
      }

      endContactEvent.bodyA = endContactEvent.bodyB = null;
    }

    additions.length = removals.length = 0;
    var hasBeginShapeContact = this.hasAnyEventListener('beginShapeContact');
    var hasEndShapeContact = this.hasAnyEventListener('endShapeContact');

    if (hasBeginShapeContact || hasEndShapeContact) {
      this.shapeOverlapKeeper.getDiff(additions, removals);
    }

    if (hasBeginShapeContact) {
      for (var _i3 = 0, _l2 = additions.length; _i3 < _l2; _i3 += 2) {
        var shapeA = this.getShapeById(additions[_i3]);
        var shapeB = this.getShapeById(additions[_i3 + 1]);
        beginShapeContactEvent.shapeA = shapeA;
        beginShapeContactEvent.shapeB = shapeB;
        beginShapeContactEvent.bodyA = shapeA.body;
        beginShapeContactEvent.bodyB = shapeB.body;
        this.dispatchEvent(beginShapeContactEvent);
      }

      beginShapeContactEvent.bodyA = beginShapeContactEvent.bodyB = beginShapeContactEvent.shapeA = beginShapeContactEvent.shapeB = null;
    }

    if (hasEndShapeContact) {
      for (var _i4 = 0, _l3 = removals.length; _i4 < _l3; _i4 += 2) {
        var _shapeA = this.getShapeById(removals[_i4]);

        var _shapeB = this.getShapeById(removals[_i4 + 1]);

        endShapeContactEvent.shapeA = _shapeA;
        endShapeContactEvent.shapeB = _shapeB;
        endShapeContactEvent.bodyA = _shapeA.body;
        endShapeContactEvent.bodyB = _shapeB.body;
        this.dispatchEvent(endShapeContactEvent);
      }

      endShapeContactEvent.bodyA = endShapeContactEvent.bodyB = endShapeContactEvent.shapeA = endShapeContactEvent.shapeB = null;
    }
  };
}();

exports.AABB = AABB;
exports.ArrayCollisionMatrix = ArrayCollisionMatrix;
exports.BODY_SLEEP_STATES = BODY_SLEEP_STATES;
exports.BODY_TYPES = BODY_TYPES;
exports.Body = Body;
exports.Box = Box;
exports.Broadphase = Broadphase;
exports.COLLISION_TYPES = COLLISION_TYPES;
exports.ConeTwistConstraint = ConeTwistConstraint;
exports.Constraint = Constraint;
exports.ContactEquation = ContactEquation;
exports.ContactMaterial = ContactMaterial;
exports.ConvexPolyhedron = ConvexPolyhedron;
exports.Cylinder = Cylinder;
exports.DistanceConstraint = DistanceConstraint;
exports.Equation = Equation;
exports.EventTarget = EventTarget;
exports.FrictionEquation = FrictionEquation;
exports.GSSolver = GSSolver;
exports.GridBroadphase = GridBroadphase;
exports.Heightfield = Heightfield;
exports.HingeConstraint = HingeConstraint;
exports.JacobianElement = JacobianElement;
exports.LockConstraint = LockConstraint;
exports.Mat3 = Mat3;
exports.Material = Material;
exports.NaiveBroadphase = NaiveBroadphase;
exports.Narrowphase = Narrowphase;
exports.ObjectCollisionMatrix = ObjectCollisionMatrix;
exports.Particle = Particle;
exports.Plane = Plane;
exports.PointToPointConstraint = PointToPointConstraint;
exports.Pool = Pool;
exports.Quaternion = Quaternion;
exports.RAY_MODES = RAY_MODES;
exports.Ray = Ray;
exports.RaycastResult = RaycastResult;
exports.RaycastVehicle = RaycastVehicle;
exports.RigidVehicle = RigidVehicle;
exports.RotationalEquation = RotationalEquation;
exports.RotationalMotorEquation = RotationalMotorEquation;
exports.SAPBroadphase = SAPBroadphase;
exports.SHAPE_TYPES = SHAPE_TYPES;
exports.SPHSystem = SPHSystem;
exports.Shape = Shape;
exports.Solver = Solver;
exports.Sphere = Sphere;
exports.SplitSolver = SplitSolver;
exports.Spring = Spring;
exports.Transform = Transform;
exports.Trimesh = Trimesh;
exports.Vec3 = Vec3;
exports.Vec3Pool = Vec3Pool;
exports.World = World;

},{}],6:[function(require,module,exports){
"use strict";
/* global Ammo,THREE */

const TYPE = (exports.TYPE = {
  BOX: "box",
  CYLINDER: "cylinder",
  SPHERE: "sphere",
  CAPSULE: "capsule",
  CONE: "cone",
  HULL: "hull",
  HACD: "hacd", //Hierarchical Approximate Convex Decomposition
  VHACD: "vhacd", //Volumetric Hierarchical Approximate Convex Decomposition
  MESH: "mesh",
  HEIGHTFIELD: "heightfield"
});

const FIT = (exports.FIT = {
  ALL: "all", //A single shape is automatically sized to bound all meshes within the entity.
  MANUAL: "manual" //A single shape is sized manually. Requires halfExtents or sphereRadius.
});

const HEIGHTFIELD_DATA_TYPE = (exports.HEIGHTFIELD_DATA_TYPE = {
  short: "short",
  float: "float"
});

const hasUpdateMatricesFunction = THREE.Object3D.prototype.hasOwnProperty("updateMatrices");

exports.createCollisionShapes = function(root, options) {
  switch (options.type) {
    case TYPE.BOX:
      return [this.createBoxShape(root, options)];
    case TYPE.CYLINDER:
      return [this.createCylinderShape(root, options)];
    case TYPE.CAPSULE:
      return [this.createCapsuleShape(root, options)];
    case TYPE.CONE:
      return [this.createConeShape(root, options)];
    case TYPE.SPHERE:
      return [this.createSphereShape(root, options)];
    case TYPE.HULL:
      return [this.createHullShape(root, options)];
    case TYPE.HACD:
      return this.createHACDShapes(root, options);
    case TYPE.VHACD:
      return this.createVHACDShapes(root, options);
    case TYPE.MESH:
      return [this.createTriMeshShape(root, options)];
    case TYPE.HEIGHTFIELD:
      return [this.createHeightfieldTerrainShape(root, options)];
    default:
      console.warn(options.type + " is not currently supported");
      return [];
  }
};

//TODO: support gimpact (dynamic trimesh) and heightmap

exports.createBoxShape = function(root, options) {
  options.type = TYPE.BOX;
  _setOptions(options);

  if (options.fit === FIT.ALL) {
    options.halfExtents = _computeHalfExtents(
      root,
      _computeBounds(root, options),
      options.minHalfExtent,
      options.maxHalfExtent
    );
  }

  const btHalfExtents = new Ammo.btVector3(options.halfExtents.x, options.halfExtents.y, options.halfExtents.z);
  const collisionShape = new Ammo.btBoxShape(btHalfExtents);
  Ammo.destroy(btHalfExtents);

  _finishCollisionShape(collisionShape, options, _computeScale(root, options));
  return collisionShape;
};

exports.createCylinderShape = function(root, options) {
  options.type = TYPE.CYLINDER;
  _setOptions(options);

  if (options.fit === FIT.ALL) {
    options.halfExtents = _computeHalfExtents(
      root,
      _computeBounds(root, options),
      options.minHalfExtent,
      options.maxHalfExtent
    );
  }

  const btHalfExtents = new Ammo.btVector3(options.halfExtents.x, options.halfExtents.y, options.halfExtents.z);
  const collisionShape = (() => {
    switch (options.cylinderAxis) {
      case "y":
        return new Ammo.btCylinderShape(btHalfExtents);
      case "x":
        return new Ammo.btCylinderShapeX(btHalfExtents);
      case "z":
        return new Ammo.btCylinderShapeZ(btHalfExtents);
    }
    return null;
  })();
  Ammo.destroy(btHalfExtents);

  _finishCollisionShape(collisionShape, options, _computeScale(root, options));
  return collisionShape;
};

exports.createCapsuleShape = function(root, options) {
  options.type = TYPE.CAPSULE;
  _setOptions(options);

  if (options.fit === FIT.ALL) {
    options.halfExtents = _computeHalfExtents(
      root,
      _computeBounds(root, options),
      options.minHalfExtent,
      options.maxHalfExtent
    );
  }

  const { x, y, z } = options.halfExtents;
  const collisionShape = (() => {
    switch (options.cylinderAxis) {
      case "y":
        return new Ammo.btCapsuleShape(Math.max(x, z), y * 2);
      case "x":
        return new Ammo.btCapsuleShapeX(Math.max(y, z), x * 2);
      case "z":
        return new Ammo.btCapsuleShapeZ(Math.max(x, y), z * 2);
    }
    return null;
  })();

  _finishCollisionShape(collisionShape, options, _computeScale(root, options));
  return collisionShape;
};

exports.createConeShape = function(root, options) {
  options.type = TYPE.CONE;
  _setOptions(options);

  if (options.fit === FIT.ALL) {
    options.halfExtents = _computeHalfExtents(
      root,
      _computeBounds(root, options),
      options.minHalfExtent,
      options.maxHalfExtent
    );
  }

  const { x, y, z } = options.halfExtents;
  const collisionShape = (() => {
    switch (options.cylinderAxis) {
      case "y":
        return new Ammo.btConeShape(Math.max(x, z), y * 2);
      case "x":
        return new Ammo.btConeShapeX(Math.max(y, z), x * 2);
      case "z":
        return new Ammo.btConeShapeZ(Math.max(x, y), z * 2);
    }
    return null;
  })();

  _finishCollisionShape(collisionShape, options, _computeScale(root, options));
  return collisionShape;
};

exports.createSphereShape = function(root, options) {
  options.type = TYPE.SPHERE;
  _setOptions(options);

  let radius;
  if (options.fit === FIT.MANUAL && !isNaN(options.sphereRadius)) {
    radius = options.sphereRadius;
  } else {
    radius = _computeRadius(root, options, _computeBounds(root, options));
  }

  const collisionShape = new Ammo.btSphereShape(radius);
  _finishCollisionShape(collisionShape, options, _computeScale(root, options));

  return collisionShape;
};

exports.createHullShape = (function() {
  const vertex = new THREE.Vector3();
  const center = new THREE.Vector3();
  return function(root, options) {
    options.type = TYPE.HULL;
    _setOptions(options);

    if (options.fit === FIT.MANUAL) {
      console.warn("cannot use fit: manual with type: hull");
      return null;
    }

    const bounds = _computeBounds(root, options);

    const btVertex = new Ammo.btVector3();
    const originalHull = new Ammo.btConvexHullShape();
    originalHull.setMargin(options.margin);
    center.addVectors(bounds.max, bounds.min).multiplyScalar(0.5);

    let vertexCount = 0;
    _iterateGeometries(root, options, geo => {
      vertexCount += geo.attributes.position.array.length / 3;
    });

    const maxVertices = options.hullMaxVertices || 100000;
    // todo: might want to implement this in a deterministic way that doesn't do O(verts) calls to Math.random
    if (vertexCount > maxVertices) {
      console.warn(`too many vertices for hull shape; sampling ~${maxVertices} from ~${vertexCount} vertices`);
    }
    const p = Math.min(1, maxVertices / vertexCount);

    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      for (let i = 0; i < components.length; i += 3) {
        if (Math.random() <= p) {
          vertex
            .set(components[i], components[i + 1], components[i + 2])
            .applyMatrix4(transform)
            .sub(center);
          btVertex.setValue(vertex.x, vertex.y, vertex.z);
          originalHull.addPoint(btVertex, i === components.length - 3); // todo: better to recalc AABB only on last geometry
        }
      }
    });

    let collisionShape = originalHull;
    if (originalHull.getNumVertices() >= 100) {
      //Bullet documentation says don't use convexHulls with 100 verts or more
      const shapeHull = new Ammo.btShapeHull(originalHull);
      shapeHull.buildHull(options.margin);
      Ammo.destroy(originalHull);
      collisionShape = new Ammo.btConvexHullShape(
        Ammo.getPointer(shapeHull.getVertexPointer()),
        shapeHull.numVertices()
      );
      Ammo.destroy(shapeHull); // btConvexHullShape makes a copy
    }

    Ammo.destroy(btVertex);

    _finishCollisionShape(collisionShape, options, _computeScale(root, options));
    return collisionShape;
  };
})();

exports.createHACDShapes = (function() {
  const v = new THREE.Vector3();
  const center = new THREE.Vector3();
  return function(root, options) {
    options.type = TYPE.HACD;
    _setOptions(options);

    if (options.fit === FIT.MANUAL) {
      console.warn("cannot use fit: manual with type: hacd");
      return [];
    }

    if (!Ammo.hasOwnProperty("HACD")) {
      console.warn(
        "HACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."
      );
      return [];
    }

    const bounds = _computeBounds(root);
    const scale = _computeScale(root, options);

    let vertexCount = 0;
    let triCount = 0;
    center.addVectors(bounds.max, bounds.min).multiplyScalar(0.5);

    _iterateGeometries(root, options, geo => {
      vertexCount += geo.attributes.position.array.length / 3;
      if (geo.index) {
        triCount += geo.index.array.length / 3;
      } else {
        triCount += geo.attributes.position.array.length / 9;
      }
    });

    const hacd = new Ammo.HACD();
    if (options.hasOwnProperty("compacityWeight")) hacd.SetCompacityWeight(options.compacityWeight);
    if (options.hasOwnProperty("volumeWeight")) hacd.SetVolumeWeight(options.volumeWeight);
    if (options.hasOwnProperty("nClusters")) hacd.SetNClusters(options.nClusters);
    if (options.hasOwnProperty("nVerticesPerCH")) hacd.SetNVerticesPerCH(options.nVerticesPerCH);
    if (options.hasOwnProperty("concavity")) hacd.SetConcavity(options.concavity);

    const points = Ammo._malloc(vertexCount * 3 * 8);
    const triangles = Ammo._malloc(triCount * 3 * 4);
    hacd.SetPoints(points);
    hacd.SetTriangles(triangles);
    hacd.SetNPoints(vertexCount);
    hacd.SetNTriangles(triCount);

    const pptr = points / 8,
      tptr = triangles / 4;
    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      const indices = geo.index ? geo.index.array : null;
      for (let i = 0; i < components.length; i += 3) {
        v.set(components[i + 0], components[i + 1], components[i + 2])
          .applyMatrix4(transform)
          .sub(center);
        Ammo.HEAPF64[pptr + i + 0] = v.x;
        Ammo.HEAPF64[pptr + i + 1] = v.y;
        Ammo.HEAPF64[pptr + i + 2] = v.z;
      }
      if (indices) {
        for (let i = 0; i < indices.length; i++) {
          Ammo.HEAP32[tptr + i] = indices[i];
        }
      } else {
        for (let i = 0; i < components.length / 3; i++) {
          Ammo.HEAP32[tptr + i] = i;
        }
      }
    });

    hacd.Compute();
    Ammo._free(points);
    Ammo._free(triangles);
    const nClusters = hacd.GetNClusters();

    const shapes = [];
    for (let i = 0; i < nClusters; i++) {
      const hull = new Ammo.btConvexHullShape();
      hull.setMargin(options.margin);
      const nPoints = hacd.GetNPointsCH(i);
      const nTriangles = hacd.GetNTrianglesCH(i);
      const hullPoints = Ammo._malloc(nPoints * 3 * 8);
      const hullTriangles = Ammo._malloc(nTriangles * 3 * 4);
      hacd.GetCH(i, hullPoints, hullTriangles);

      const pptr = hullPoints / 8;
      for (let pi = 0; pi < nPoints; pi++) {
        const btVertex = new Ammo.btVector3();
        const px = Ammo.HEAPF64[pptr + pi * 3 + 0];
        const py = Ammo.HEAPF64[pptr + pi * 3 + 1];
        const pz = Ammo.HEAPF64[pptr + pi * 3 + 2];
        btVertex.setValue(px, py, pz);
        hull.addPoint(btVertex, pi === nPoints - 1);
        Ammo.destroy(btVertex);
      }

      _finishCollisionShape(hull, options, scale);
      shapes.push(hull);
    }

    return shapes;
  };
})();

exports.createVHACDShapes = (function() {
  const v = new THREE.Vector3();
  const center = new THREE.Vector3();
  return function(root, options) {
    options.type = TYPE.VHACD;
    _setOptions(options);

    if (options.fit === FIT.MANUAL) {
      console.warn("cannot use fit: manual with type: vhacd");
      return [];
    }

    if (!Ammo.hasOwnProperty("VHACD")) {
      console.warn(
        "VHACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."
      );
      return [];
    }

    const bounds = _computeBounds(root, options);
    const scale = _computeScale(root, options);

    let vertexCount = 0;
    let triCount = 0;
    center.addVectors(bounds.max, bounds.min).multiplyScalar(0.5);

    _iterateGeometries(root, options, geo => {
      vertexCount += geo.attributes.position.count;
      if (geo.index) {
        triCount += geo.index.count / 3;
      } else {
        triCount += geo.attributes.position.count / 3;
      }
    });

    const vhacd = new Ammo.VHACD();
    const params = new Ammo.Parameters();
    //https://kmamou.blogspot.com/2014/12/v-hacd-20-parameters-description.html
    if (options.hasOwnProperty("resolution")) params.set_m_resolution(options.resolution);
    if (options.hasOwnProperty("depth")) params.set_m_depth(options.depth);
    if (options.hasOwnProperty("concavity")) params.set_m_concavity(options.concavity);
    if (options.hasOwnProperty("planeDownsampling")) params.set_m_planeDownsampling(options.planeDownsampling);
    if (options.hasOwnProperty("convexhullDownsampling"))
      params.set_m_convexhullDownsampling(options.convexhullDownsampling);
    if (options.hasOwnProperty("alpha")) params.set_m_alpha(options.alpha);
    if (options.hasOwnProperty("beta")) params.set_m_beta(options.beta);
    if (options.hasOwnProperty("gamma")) params.set_m_gamma(options.gamma);
    if (options.hasOwnProperty("pca")) params.set_m_pca(options.pca);
    if (options.hasOwnProperty("mode")) params.set_m_mode(options.mode);
    if (options.hasOwnProperty("maxNumVerticesPerCH")) params.set_m_maxNumVerticesPerCH(options.maxNumVerticesPerCH);
    if (options.hasOwnProperty("minVolumePerCH")) params.set_m_minVolumePerCH(options.minVolumePerCH);
    if (options.hasOwnProperty("convexhullApproximation"))
      params.set_m_convexhullApproximation(options.convexhullApproximation);
    if (options.hasOwnProperty("oclAcceleration")) params.set_m_oclAcceleration(options.oclAcceleration);

    const points = Ammo._malloc(vertexCount * 3 * 8);
    const triangles = Ammo._malloc(triCount * 3 * 4);

    let pptr = points / 8,
      tptr = triangles / 4;
    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      const indices = geo.index ? geo.index.array : null;
      for (let i = 0; i < components.length; i += 3) {
        v.set(components[i + 0], components[i + 1], components[i + 2])
          .applyMatrix4(transform)
          .sub(center);
        Ammo.HEAPF64[pptr + 0] = v.x;
        Ammo.HEAPF64[pptr + 1] = v.y;
        Ammo.HEAPF64[pptr + 2] = v.z;
        pptr += 3;
      }
      if (indices) {
        for (let i = 0; i < indices.length; i++) {
          Ammo.HEAP32[tptr] = indices[i];
          tptr++;
        }
      } else {
        for (let i = 0; i < components.length / 3; i++) {
          Ammo.HEAP32[tptr] = i;
          tptr++;
        }
      }
    });

    vhacd.Compute(points, 3, vertexCount, triangles, 3, triCount, params);
    Ammo._free(points);
    Ammo._free(triangles);
    const nHulls = vhacd.GetNConvexHulls();

    const shapes = [];
    const ch = new Ammo.ConvexHull();
    for (let i = 0; i < nHulls; i++) {
      vhacd.GetConvexHull(i, ch);
      const nPoints = ch.get_m_nPoints();
      const hullPoints = ch.get_m_points();

      const hull = new Ammo.btConvexHullShape();
      hull.setMargin(options.margin);

      for (let pi = 0; pi < nPoints; pi++) {
        const btVertex = new Ammo.btVector3();
        const px = ch.get_m_points(pi * 3 + 0);
        const py = ch.get_m_points(pi * 3 + 1);
        const pz = ch.get_m_points(pi * 3 + 2);
        btVertex.setValue(px, py, pz);
        hull.addPoint(btVertex, pi === nPoints - 1);
        Ammo.destroy(btVertex);
      }

      _finishCollisionShape(hull, options, scale);
      shapes.push(hull);
    }
    Ammo.destroy(ch);
    Ammo.destroy(vhacd);

    return shapes;
  };
})();

exports.createTriMeshShape = (function() {
  const va = new THREE.Vector3();
  const vb = new THREE.Vector3();
  const vc = new THREE.Vector3();
  return function(root, options) {
    options.type = TYPE.MESH;
    _setOptions(options);

    if (options.fit === FIT.MANUAL) {
      console.warn("cannot use fit: manual with type: mesh");
      return null;
    }

    const scale = _computeScale(root, options);

    const bta = new Ammo.btVector3();
    const btb = new Ammo.btVector3();
    const btc = new Ammo.btVector3();
    const triMesh = new Ammo.btTriangleMesh(true, false);

    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      if (geo.index) {
        for (let i = 0; i < geo.index.count; i += 3) {
          const ai = geo.index.array[i] * 3;
          const bi = geo.index.array[i + 1] * 3;
          const ci = geo.index.array[i + 2] * 3;
          va.set(components[ai], components[ai + 1], components[ai + 2]).applyMatrix4(transform);
          vb.set(components[bi], components[bi + 1], components[bi + 2]).applyMatrix4(transform);
          vc.set(components[ci], components[ci + 1], components[ci + 2]).applyMatrix4(transform);
          bta.setValue(va.x, va.y, va.z);
          btb.setValue(vb.x, vb.y, vb.z);
          btc.setValue(vc.x, vc.y, vc.z);
          triMesh.addTriangle(bta, btb, btc, false);
        }
      } else {
        for (let i = 0; i < components.length; i += 9) {
          va.set(components[i + 0], components[i + 1], components[i + 2]).applyMatrix4(transform);
          vb.set(components[i + 3], components[i + 4], components[i + 5]).applyMatrix4(transform);
          vc.set(components[i + 6], components[i + 7], components[i + 8]).applyMatrix4(transform);
          bta.setValue(va.x, va.y, va.z);
          btb.setValue(vb.x, vb.y, vb.z);
          btc.setValue(vc.x, vc.y, vc.z);
          triMesh.addTriangle(bta, btb, btc, false);
        }
      }
    });

    const localScale = new Ammo.btVector3(scale.x, scale.y, scale.z);
    triMesh.setScaling(localScale);
    Ammo.destroy(localScale);

    const collisionShape = new Ammo.btBvhTriangleMeshShape(triMesh, true, true);
    collisionShape.resources = [triMesh];

    Ammo.destroy(bta);
    Ammo.destroy(btb);
    Ammo.destroy(btc);

    _finishCollisionShape(collisionShape, options);
    return collisionShape;
  };
})();

exports.createHeightfieldTerrainShape = function(root, options) {
  _setOptions(options);

  if (options.fit === FIT.ALL) {
    console.warn("cannot use fit: all with type: heightfield");
    return null;
  }
  const heightfieldDistance = options.heightfieldDistance || 1;
  const heightfieldData = options.heightfieldData || [];
  const heightScale = options.heightScale || 0;
  const upAxis = options.hasOwnProperty("upAxis") ? options.upAxis : 1; // x = 0; y = 1; z = 2
  const hdt = (() => {
    switch (options.heightDataType) {
      case "short":
        return Ammo.PHY_SHORT;
      case "float":
        return Ammo.PHY_FLOAT;
      default:
        return Ammo.PHY_FLOAT;
    }
  })();
  const flipQuadEdges = options.hasOwnProperty("flipQuadEdges") ? options.flipQuadEdges : true;

  const heightStickLength = heightfieldData.length;
  const heightStickWidth = heightStickLength > 0 ? heightfieldData[0].length : 0;

  const data = Ammo._malloc(heightStickLength * heightStickWidth * 4);
  const ptr = data / 4;

  let minHeight = Number.POSITIVE_INFINITY;
  let maxHeight = Number.NEGATIVE_INFINITY;
  let index = 0;
  for (let l = 0; l < heightStickLength; l++) {
    for (let w = 0; w < heightStickWidth; w++) {
      const height = heightfieldData[l][w];
      Ammo.HEAPF32[ptr + index] = height;
      index++;
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
  }

  const collisionShape = new Ammo.btHeightfieldTerrainShape(
    heightStickWidth,
    heightStickLength,
    data,
    heightScale,
    minHeight,
    maxHeight,
    upAxis,
    hdt,
    flipQuadEdges
  );

  const scale = new Ammo.btVector3(heightfieldDistance, 1, heightfieldDistance);
  collisionShape.setLocalScaling(scale);
  Ammo.destroy(scale);

  collisionShape.heightfieldData = data;

  _finishCollisionShape(collisionShape, options);
  return collisionShape;
};

function _setOptions(options) {
  options.fit = options.hasOwnProperty("fit") ? options.fit : FIT.ALL;
  options.type = options.type || TYPE.HULL;
  options.minHalfExtent = options.hasOwnProperty("minHalfExtent") ? options.minHalfExtent : 0;
  options.maxHalfExtent = options.hasOwnProperty("maxHalfExtent") ? options.maxHalfExtent : Number.POSITIVE_INFINITY;
  options.cylinderAxis = options.cylinderAxis || "y";
  options.margin = options.hasOwnProperty("margin") ? options.margin : 0.01;
  options.includeInvisible = options.hasOwnProperty("includeInvisible") ? options.includeInvisible : false;

  if (!options.offset) {
    options.offset = new THREE.Vector3();
  }

  if (!options.orientation) {
    options.orientation = new THREE.Quaternion();
  }
}

const _finishCollisionShape = function(collisionShape, options, scale) {
  collisionShape.type = options.type;
  collisionShape.setMargin(options.margin);
  collisionShape.destroy = () => {
    for (let res of collisionShape.resources || []) {
      Ammo.destroy(res);
    }
    if (collisionShape.heightfieldData) {
      Ammo._free(collisionShape.heightfieldData);
    }
    Ammo.destroy(collisionShape);
  };

  const localTransform = new Ammo.btTransform();
  const rotation = new Ammo.btQuaternion();
  localTransform.setIdentity();

  localTransform.getOrigin().setValue(options.offset.x, options.offset.y, options.offset.z);
  rotation.setValue(options.orientation.x, options.orientation.y, options.orientation.z, options.orientation.w);

  localTransform.setRotation(rotation);
  Ammo.destroy(rotation);

  if (scale) {
    const localScale = new Ammo.btVector3(scale.x, scale.y, scale.z);
    collisionShape.setLocalScaling(localScale);
    Ammo.destroy(localScale);
  }

  collisionShape.localTransform = localTransform;
};

// Calls `cb(geo, transform)` for each geometry under `root` whose vertices we should take into account for the physics shape.
// `transform` is the transform required to transform the given geometry's vertices into root-local space.
const _iterateGeometries = (function() {
  const transform = new THREE.Matrix4();
  const inverse = new THREE.Matrix4();
  const bufferGeometry = new THREE.BufferGeometry();
  return function(root, options, cb) {
    inverse.copy(root.matrixWorld).invert();
    root.traverse(mesh => {
      if (
        mesh.isMesh &&
        (!THREE.Sky || mesh.__proto__ != THREE.Sky.prototype) &&
        (options.includeInvisible || ((mesh.el && mesh.el.object3D.visible) || mesh.visible))
      ) {
        if (mesh === root) {
          transform.identity();
        } else {
          if (hasUpdateMatricesFunction) mesh.updateMatrices();
          transform.multiplyMatrices(inverse, mesh.matrixWorld);
        }
        // todo: might want to return null xform if this is the root so that callers can avoid multiplying
        // things by the identity matrix
        cb(mesh.geometry.isBufferGeometry ? mesh.geometry : bufferGeometry.fromGeometry(mesh.geometry), transform);
      }
    });
  };
})();

const _computeScale = function(root, options) {
  const scale = new THREE.Vector3(1, 1, 1);
  if (options.fit === FIT.ALL) {
    scale.setFromMatrixScale(root.matrixWorld);
  }
  return scale;
};

const _computeRadius = (function() {
  const v = new THREE.Vector3();
  const center = new THREE.Vector3();
  return function(root, options, bounds) {
    let maxRadiusSq = 0;
    let { x: cx, y: cy, z: cz } = bounds.getCenter(center);
    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      for (let i = 0; i < components.length; i += 3) {
        v.set(components[i], components[i + 1], components[i + 2]).applyMatrix4(transform);
        const dx = cx - v.x;
        const dy = cy - v.y;
        const dz = cz - v.z;
        maxRadiusSq = Math.max(maxRadiusSq, dx * dx + dy * dy + dz * dz);
      }
    });
    return Math.sqrt(maxRadiusSq);
  };
})();

const _computeHalfExtents = function(root, bounds, minHalfExtent, maxHalfExtent) {
  const halfExtents = new THREE.Vector3();
  return halfExtents
    .subVectors(bounds.max, bounds.min)
    .multiplyScalar(0.5)
    .clampScalar(minHalfExtent, maxHalfExtent);
};

const _computeLocalOffset = function(matrix, bounds, target) {
  target
    .addVectors(bounds.max, bounds.min)
    .multiplyScalar(0.5)
    .applyMatrix4(matrix);
  return target;
};

// returns the bounding box for the geometries underneath `root`.
const _computeBounds = (function() {
  const v = new THREE.Vector3();
  return function(root, options) {
    const bounds = new THREE.Box3();
    let minX = +Infinity;
    let minY = +Infinity;
    let minZ = +Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    bounds.min.set(0, 0, 0);
    bounds.max.set(0, 0, 0);
    _iterateGeometries(root, options, (geo, transform) => {
      const components = geo.attributes.position.array;
      for (let i = 0; i < components.length; i += 3) {
        v.set(components[i], components[i + 1], components[i + 2]).applyMatrix4(transform);
        if (v.x < minX) minX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.x > maxX) maxX = v.x;
        if (v.y > maxY) maxY = v.y;
        if (v.z > maxZ) maxZ = v.z;
      }
    });
    bounds.min.set(minX, minY, minZ);
    bounds.max.set(maxX, maxY, maxZ);
    return bounds;
  };
})();

},{}],7:[function(require,module,exports){
(function (global){
var cannonEs = require('cannon-es');
var three = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

/**
 * Ported from: https://github.com/maurizzzio/quickhull3d/ by Mauricio Poppe (https://github.com/maurizzzio)
 */

var ConvexHull = function () {
  var Visible = 0;
  var Deleted = 1;
  var v1 = new three.Vector3();

  function ConvexHull() {
    this.tolerance = -1;
    this.faces = []; // the generated faces of the convex hull

    this.newFaces = []; // this array holds the faces that are generated within a single iteration
    // the vertex lists work as follows:
    //
    // let 'a' and 'b' be 'Face' instances
    // let 'v' be points wrapped as instance of 'Vertex'
    //
    //     [v, v, ..., v, v, v, ...]
    //      ^             ^
    //      |             |
    //  a.outside     b.outside
    //

    this.assigned = new VertexList();
    this.unassigned = new VertexList();
    this.vertices = []; // vertices of the hull (internal representation of given geometry data)
  }

  Object.assign(ConvexHull.prototype, {
    setFromPoints: function (points) {
      if (Array.isArray(points) !== true) {
        console.error('THREE.ConvexHull: Points parameter is not an array.');
      }

      if (points.length < 4) {
        console.error('THREE.ConvexHull: The algorithm needs at least four points.');
      }

      this.makeEmpty();

      for (var i = 0, l = points.length; i < l; i++) {
        this.vertices.push(new VertexNode(points[i]));
      }

      this.compute();
      return this;
    },
    setFromObject: function (object) {
      var points = [];
      object.updateMatrixWorld(true);
      object.traverse(function (node) {
        var i, l, point;
        var geometry = node.geometry;
        if (geometry === undefined) return;

        if (geometry.isGeometry) {
          geometry = geometry.toBufferGeometry ? geometry.toBufferGeometry() : new three.BufferGeometry().fromGeometry(geometry);
        }

        if (geometry.isBufferGeometry) {
          var attribute = geometry.attributes.position;

          if (attribute !== undefined) {
            for (i = 0, l = attribute.count; i < l; i++) {
              point = new three.Vector3();
              point.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
              points.push(point);
            }
          }
        }
      });
      return this.setFromPoints(points);
    },
    containsPoint: function (point) {
      var faces = this.faces;

      for (var i = 0, l = faces.length; i < l; i++) {
        var face = faces[i]; // compute signed distance and check on what half space the point lies

        if (face.distanceToPoint(point) > this.tolerance) return false;
      }

      return true;
    },
    intersectRay: function (ray, target) {
      // based on "Fast Ray-Convex Polyhedron Intersection"  by Eric Haines, GRAPHICS GEMS II
      var faces = this.faces;
      var tNear = -Infinity;
      var tFar = Infinity;

      for (var i = 0, l = faces.length; i < l; i++) {
        var face = faces[i]; // interpret faces as planes for the further computation

        var vN = face.distanceToPoint(ray.origin);
        var vD = face.normal.dot(ray.direction); // if the origin is on the positive side of a plane (so the plane can "see" the origin) and
        // the ray is turned away or parallel to the plane, there is no intersection

        if (vN > 0 && vD >= 0) return null; // compute the distance from the ray’s origin to the intersection with the plane

        var t = vD !== 0 ? -vN / vD : 0; // only proceed if the distance is positive. a negative distance means the intersection point
        // lies "behind" the origin

        if (t <= 0) continue; // now categorized plane as front-facing or back-facing

        if (vD > 0) {
          //  plane faces away from the ray, so this plane is a back-face
          tFar = Math.min(t, tFar);
        } else {
          // front-face
          tNear = Math.max(t, tNear);
        }

        if (tNear > tFar) {
          // if tNear ever is greater than tFar, the ray must miss the convex hull
          return null;
        }
      } // evaluate intersection point
      // always try tNear first since its the closer intersection point


      if (tNear !== -Infinity) {
        ray.at(tNear, target);
      } else {
        ray.at(tFar, target);
      }

      return target;
    },
    intersectsRay: function (ray) {
      return this.intersectRay(ray, v1) !== null;
    },
    makeEmpty: function () {
      this.faces = [];
      this.vertices = [];
      return this;
    },
    // Adds a vertex to the 'assigned' list of vertices and assigns it to the given face
    addVertexToFace: function (vertex, face) {
      vertex.face = face;

      if (face.outside === null) {
        this.assigned.append(vertex);
      } else {
        this.assigned.insertBefore(face.outside, vertex);
      }

      face.outside = vertex;
      return this;
    },
    // Removes a vertex from the 'assigned' list of vertices and from the given face
    removeVertexFromFace: function (vertex, face) {
      if (vertex === face.outside) {
        // fix face.outside link
        if (vertex.next !== null && vertex.next.face === face) {
          // face has at least 2 outside vertices, move the 'outside' reference
          face.outside = vertex.next;
        } else {
          // vertex was the only outside vertex that face had
          face.outside = null;
        }
      }

      this.assigned.remove(vertex);
      return this;
    },
    // Removes all the visible vertices that a given face is able to see which are stored in the 'assigned' vertext list
    removeAllVerticesFromFace: function (face) {
      if (face.outside !== null) {
        // reference to the first and last vertex of this face
        var start = face.outside;
        var end = face.outside;

        while (end.next !== null && end.next.face === face) {
          end = end.next;
        }

        this.assigned.removeSubList(start, end); // fix references

        start.prev = end.next = null;
        face.outside = null;
        return start;
      }
    },
    // Removes all the visible vertices that 'face' is able to see
    deleteFaceVertices: function (face, absorbingFace) {
      var faceVertices = this.removeAllVerticesFromFace(face);

      if (faceVertices !== undefined) {
        if (absorbingFace === undefined) {
          // mark the vertices to be reassigned to some other face
          this.unassigned.appendChain(faceVertices);
        } else {
          // if there's an absorbing face try to assign as many vertices as possible to it
          var vertex = faceVertices;

          do {
            // we need to buffer the subsequent vertex at this point because the 'vertex.next' reference
            // will be changed by upcoming method calls
            var nextVertex = vertex.next;
            var distance = absorbingFace.distanceToPoint(vertex.point); // check if 'vertex' is able to see 'absorbingFace'

            if (distance > this.tolerance) {
              this.addVertexToFace(vertex, absorbingFace);
            } else {
              this.unassigned.append(vertex);
            } // now assign next vertex


            vertex = nextVertex;
          } while (vertex !== null);
        }
      }

      return this;
    },
    // Reassigns as many vertices as possible from the unassigned list to the new faces
    resolveUnassignedPoints: function (newFaces) {
      if (this.unassigned.isEmpty() === false) {
        var vertex = this.unassigned.first();

        do {
          // buffer 'next' reference, see .deleteFaceVertices()
          var nextVertex = vertex.next;
          var maxDistance = this.tolerance;
          var maxFace = null;

          for (var i = 0; i < newFaces.length; i++) {
            var face = newFaces[i];

            if (face.mark === Visible) {
              var distance = face.distanceToPoint(vertex.point);

              if (distance > maxDistance) {
                maxDistance = distance;
                maxFace = face;
              }

              if (maxDistance > 1000 * this.tolerance) break;
            }
          } // 'maxFace' can be null e.g. if there are identical vertices


          if (maxFace !== null) {
            this.addVertexToFace(vertex, maxFace);
          }

          vertex = nextVertex;
        } while (vertex !== null);
      }

      return this;
    },
    // Computes the extremes of a simplex which will be the initial hull
    computeExtremes: function () {
      var min = new three.Vector3();
      var max = new three.Vector3();
      var minVertices = [];
      var maxVertices = [];
      var i, l, j; // initially assume that the first vertex is the min/max

      for (i = 0; i < 3; i++) {
        minVertices[i] = maxVertices[i] = this.vertices[0];
      }

      min.copy(this.vertices[0].point);
      max.copy(this.vertices[0].point); // compute the min/max vertex on all six directions

      for (i = 0, l = this.vertices.length; i < l; i++) {
        var vertex = this.vertices[i];
        var point = vertex.point; // update the min coordinates

        for (j = 0; j < 3; j++) {
          if (point.getComponent(j) < min.getComponent(j)) {
            min.setComponent(j, point.getComponent(j));
            minVertices[j] = vertex;
          }
        } // update the max coordinates


        for (j = 0; j < 3; j++) {
          if (point.getComponent(j) > max.getComponent(j)) {
            max.setComponent(j, point.getComponent(j));
            maxVertices[j] = vertex;
          }
        }
      } // use min/max vectors to compute an optimal epsilon


      this.tolerance = 3 * Number.EPSILON * (Math.max(Math.abs(min.x), Math.abs(max.x)) + Math.max(Math.abs(min.y), Math.abs(max.y)) + Math.max(Math.abs(min.z), Math.abs(max.z)));
      return {
        min: minVertices,
        max: maxVertices
      };
    },
    // Computes the initial simplex assigning to its faces all the points
    // that are candidates to form part of the hull
    computeInitialHull: function () {
      var line3, plane, closestPoint;
      return function computeInitialHull() {
        if (line3 === undefined) {
          line3 = new three.Line3();
          plane = new three.Plane();
          closestPoint = new three.Vector3();
        }

        var vertex,
            vertices = this.vertices;
        var extremes = this.computeExtremes();
        var min = extremes.min;
        var max = extremes.max;
        var v0, v1, v2, v3;
        var i, l, j; // 1. Find the two vertices 'v0' and 'v1' with the greatest 1d separation
        // (max.x - min.x)
        // (max.y - min.y)
        // (max.z - min.z)

        var distance,
            maxDistance = 0;
        var index = 0;

        for (i = 0; i < 3; i++) {
          distance = max[i].point.getComponent(i) - min[i].point.getComponent(i);

          if (distance > maxDistance) {
            maxDistance = distance;
            index = i;
          }
        }

        v0 = min[index];
        v1 = max[index]; // 2. The next vertex 'v2' is the one farthest to the line formed by 'v0' and 'v1'

        maxDistance = 0;
        line3.set(v0.point, v1.point);

        for (i = 0, l = this.vertices.length; i < l; i++) {
          vertex = vertices[i];

          if (vertex !== v0 && vertex !== v1) {
            line3.closestPointToPoint(vertex.point, true, closestPoint);
            distance = closestPoint.distanceToSquared(vertex.point);

            if (distance > maxDistance) {
              maxDistance = distance;
              v2 = vertex;
            }
          }
        } // 3. The next vertex 'v3' is the one farthest to the plane 'v0', 'v1', 'v2'


        maxDistance = -1;
        plane.setFromCoplanarPoints(v0.point, v1.point, v2.point);

        for (i = 0, l = this.vertices.length; i < l; i++) {
          vertex = vertices[i];

          if (vertex !== v0 && vertex !== v1 && vertex !== v2) {
            distance = Math.abs(plane.distanceToPoint(vertex.point));

            if (distance > maxDistance) {
              maxDistance = distance;
              v3 = vertex;
            }
          }
        }

        var faces = [];

        if (plane.distanceToPoint(v3.point) < 0) {
          // the face is not able to see the point so 'plane.normal' is pointing outside the tetrahedron
          faces.push(Face.create(v0, v1, v2), Face.create(v3, v1, v0), Face.create(v3, v2, v1), Face.create(v3, v0, v2)); // set the twin edge

          for (i = 0; i < 3; i++) {
            j = (i + 1) % 3; // join face[ i ] i > 0, with the first face

            faces[i + 1].getEdge(2).setTwin(faces[0].getEdge(j)); // join face[ i ] with face[ i + 1 ], 1 <= i <= 3

            faces[i + 1].getEdge(1).setTwin(faces[j + 1].getEdge(0));
          }
        } else {
          // the face is able to see the point so 'plane.normal' is pointing inside the tetrahedron
          faces.push(Face.create(v0, v2, v1), Face.create(v3, v0, v1), Face.create(v3, v1, v2), Face.create(v3, v2, v0)); // set the twin edge

          for (i = 0; i < 3; i++) {
            j = (i + 1) % 3; // join face[ i ] i > 0, with the first face

            faces[i + 1].getEdge(2).setTwin(faces[0].getEdge((3 - i) % 3)); // join face[ i ] with face[ i + 1 ]

            faces[i + 1].getEdge(0).setTwin(faces[j + 1].getEdge(1));
          }
        } // the initial hull is the tetrahedron


        for (i = 0; i < 4; i++) {
          this.faces.push(faces[i]);
        } // initial assignment of vertices to the faces of the tetrahedron


        for (i = 0, l = vertices.length; i < l; i++) {
          vertex = vertices[i];

          if (vertex !== v0 && vertex !== v1 && vertex !== v2 && vertex !== v3) {
            maxDistance = this.tolerance;
            var maxFace = null;

            for (j = 0; j < 4; j++) {
              distance = this.faces[j].distanceToPoint(vertex.point);

              if (distance > maxDistance) {
                maxDistance = distance;
                maxFace = this.faces[j];
              }
            }

            if (maxFace !== null) {
              this.addVertexToFace(vertex, maxFace);
            }
          }
        }

        return this;
      };
    }(),
    // Removes inactive faces
    reindexFaces: function () {
      var activeFaces = [];

      for (var i = 0; i < this.faces.length; i++) {
        var face = this.faces[i];

        if (face.mark === Visible) {
          activeFaces.push(face);
        }
      }

      this.faces = activeFaces;
      return this;
    },
    // Finds the next vertex to create faces with the current hull
    nextVertexToAdd: function () {
      // if the 'assigned' list of vertices is empty, no vertices are left. return with 'undefined'
      if (this.assigned.isEmpty() === false) {
        var eyeVertex,
            maxDistance = 0; // grap the first available face and start with the first visible vertex of that face

        var eyeFace = this.assigned.first().face;
        var vertex = eyeFace.outside; // now calculate the farthest vertex that face can see

        do {
          var distance = eyeFace.distanceToPoint(vertex.point);

          if (distance > maxDistance) {
            maxDistance = distance;
            eyeVertex = vertex;
          }

          vertex = vertex.next;
        } while (vertex !== null && vertex.face === eyeFace);

        return eyeVertex;
      }
    },
    // Computes a chain of half edges in CCW order called the 'horizon'.
    // For an edge to be part of the horizon it must join a face that can see
    // 'eyePoint' and a face that cannot see 'eyePoint'.
    computeHorizon: function (eyePoint, crossEdge, face, horizon) {
      // moves face's vertices to the 'unassigned' vertex list
      this.deleteFaceVertices(face);
      face.mark = Deleted;
      var edge;

      if (crossEdge === null) {
        edge = crossEdge = face.getEdge(0);
      } else {
        // start from the next edge since 'crossEdge' was already analyzed
        // (actually 'crossEdge.twin' was the edge who called this method recursively)
        edge = crossEdge.next;
      }

      do {
        var twinEdge = edge.twin;
        var oppositeFace = twinEdge.face;

        if (oppositeFace.mark === Visible) {
          if (oppositeFace.distanceToPoint(eyePoint) > this.tolerance) {
            // the opposite face can see the vertex, so proceed with next edge
            this.computeHorizon(eyePoint, twinEdge, oppositeFace, horizon);
          } else {
            // the opposite face can't see the vertex, so this edge is part of the horizon
            horizon.push(edge);
          }
        }

        edge = edge.next;
      } while (edge !== crossEdge);

      return this;
    },
    // Creates a face with the vertices 'eyeVertex.point', 'horizonEdge.tail' and 'horizonEdge.head' in CCW order
    addAdjoiningFace: function (eyeVertex, horizonEdge) {
      // all the half edges are created in ccw order thus the face is always pointing outside the hull
      var face = Face.create(eyeVertex, horizonEdge.tail(), horizonEdge.head());
      this.faces.push(face); // join face.getEdge( - 1 ) with the horizon's opposite edge face.getEdge( - 1 ) = face.getEdge( 2 )

      face.getEdge(-1).setTwin(horizonEdge.twin);
      return face.getEdge(0); // the half edge whose vertex is the eyeVertex
    },
    //  Adds 'horizon.length' faces to the hull, each face will be linked with the
    //  horizon opposite face and the face on the left/right
    addNewFaces: function (eyeVertex, horizon) {
      this.newFaces = [];
      var firstSideEdge = null;
      var previousSideEdge = null;

      for (var i = 0; i < horizon.length; i++) {
        var horizonEdge = horizon[i]; // returns the right side edge

        var sideEdge = this.addAdjoiningFace(eyeVertex, horizonEdge);

        if (firstSideEdge === null) {
          firstSideEdge = sideEdge;
        } else {
          // joins face.getEdge( 1 ) with previousFace.getEdge( 0 )
          sideEdge.next.setTwin(previousSideEdge);
        }

        this.newFaces.push(sideEdge.face);
        previousSideEdge = sideEdge;
      } // perform final join of new faces


      firstSideEdge.next.setTwin(previousSideEdge);
      return this;
    },
    // Adds a vertex to the hull
    addVertexToHull: function (eyeVertex) {
      var horizon = [];
      this.unassigned.clear(); // remove 'eyeVertex' from 'eyeVertex.face' so that it can't be added to the 'unassigned' vertex list

      this.removeVertexFromFace(eyeVertex, eyeVertex.face);
      this.computeHorizon(eyeVertex.point, null, eyeVertex.face, horizon);
      this.addNewFaces(eyeVertex, horizon); // reassign 'unassigned' vertices to the new faces

      this.resolveUnassignedPoints(this.newFaces);
      return this;
    },
    cleanup: function () {
      this.assigned.clear();
      this.unassigned.clear();
      this.newFaces = [];
      return this;
    },
    compute: function () {
      var vertex;
      this.computeInitialHull(); // add all available vertices gradually to the hull

      while ((vertex = this.nextVertexToAdd()) !== undefined) {
        this.addVertexToHull(vertex);
      }

      this.reindexFaces();
      this.cleanup();
      return this;
    }
  }); //

  function Face() {
    this.normal = new three.Vector3();
    this.midpoint = new three.Vector3();
    this.area = 0;
    this.constant = 0; // signed distance from face to the origin

    this.outside = null; // reference to a vertex in a vertex list this face can see

    this.mark = Visible;
    this.edge = null;
  }

  Object.assign(Face, {
    create: function (a, b, c) {
      var face = new Face();
      var e0 = new HalfEdge(a, face);
      var e1 = new HalfEdge(b, face);
      var e2 = new HalfEdge(c, face); // join edges

      e0.next = e2.prev = e1;
      e1.next = e0.prev = e2;
      e2.next = e1.prev = e0; // main half edge reference

      face.edge = e0;
      return face.compute();
    }
  });
  Object.assign(Face.prototype, {
    getEdge: function (i) {
      var edge = this.edge;

      while (i > 0) {
        edge = edge.next;
        i--;
      }

      while (i < 0) {
        edge = edge.prev;
        i++;
      }

      return edge;
    },
    compute: function () {
      var triangle;
      return function compute() {
        if (triangle === undefined) triangle = new three.Triangle();
        var a = this.edge.tail();
        var b = this.edge.head();
        var c = this.edge.next.head();
        triangle.set(a.point, b.point, c.point);
        triangle.getNormal(this.normal);
        triangle.getMidpoint(this.midpoint);
        this.area = triangle.getArea();
        this.constant = this.normal.dot(this.midpoint);
        return this;
      };
    }(),
    distanceToPoint: function (point) {
      return this.normal.dot(point) - this.constant;
    }
  }); // Entity for a Doubly-Connected Edge List (DCEL).

  function HalfEdge(vertex, face) {
    this.vertex = vertex;
    this.prev = null;
    this.next = null;
    this.twin = null;
    this.face = face;
  }

  Object.assign(HalfEdge.prototype, {
    head: function () {
      return this.vertex;
    },
    tail: function () {
      return this.prev ? this.prev.vertex : null;
    },
    length: function () {
      var head = this.head();
      var tail = this.tail();

      if (tail !== null) {
        return tail.point.distanceTo(head.point);
      }

      return -1;
    },
    lengthSquared: function () {
      var head = this.head();
      var tail = this.tail();

      if (tail !== null) {
        return tail.point.distanceToSquared(head.point);
      }

      return -1;
    },
    setTwin: function (edge) {
      this.twin = edge;
      edge.twin = this;
      return this;
    }
  }); // A vertex as a double linked list node.

  function VertexNode(point) {
    this.point = point;
    this.prev = null;
    this.next = null;
    this.face = null; // the face that is able to see this vertex
  } // A double linked list that contains vertex nodes.


  function VertexList() {
    this.head = null;
    this.tail = null;
  }

  Object.assign(VertexList.prototype, {
    first: function () {
      return this.head;
    },
    last: function () {
      return this.tail;
    },
    clear: function () {
      this.head = this.tail = null;
      return this;
    },
    // Inserts a vertex before the target vertex
    insertBefore: function (target, vertex) {
      vertex.prev = target.prev;
      vertex.next = target;

      if (vertex.prev === null) {
        this.head = vertex;
      } else {
        vertex.prev.next = vertex;
      }

      target.prev = vertex;
      return this;
    },
    // Inserts a vertex after the target vertex
    insertAfter: function (target, vertex) {
      vertex.prev = target;
      vertex.next = target.next;

      if (vertex.next === null) {
        this.tail = vertex;
      } else {
        vertex.next.prev = vertex;
      }

      target.next = vertex;
      return this;
    },
    // Appends a vertex to the end of the linked list
    append: function (vertex) {
      if (this.head === null) {
        this.head = vertex;
      } else {
        this.tail.next = vertex;
      }

      vertex.prev = this.tail;
      vertex.next = null; // the tail has no subsequent vertex

      this.tail = vertex;
      return this;
    },
    // Appends a chain of vertices where 'vertex' is the head.
    appendChain: function (vertex) {
      if (this.head === null) {
        this.head = vertex;
      } else {
        this.tail.next = vertex;
      }

      vertex.prev = this.tail; // ensure that the 'tail' reference points to the last vertex of the chain

      while (vertex.next !== null) {
        vertex = vertex.next;
      }

      this.tail = vertex;
      return this;
    },
    // Removes a vertex from the linked list
    remove: function (vertex) {
      if (vertex.prev === null) {
        this.head = vertex.next;
      } else {
        vertex.prev.next = vertex.next;
      }

      if (vertex.next === null) {
        this.tail = vertex.prev;
      } else {
        vertex.next.prev = vertex.prev;
      }

      return this;
    },
    // Removes a list of vertices whose 'head' is 'a' and whose 'tail' is b
    removeSubList: function (a, b) {
      if (a.prev === null) {
        this.head = b.next;
      } else {
        a.prev.next = b.next;
      }

      if (b.next === null) {
        this.tail = a.prev;
      } else {
        b.next.prev = a.prev;
      }

      return this;
    },
    isEmpty: function () {
      return this.head === null;
    }
  });
  return ConvexHull;
}();

const _v1 = new three.Vector3();

const _v2 = new three.Vector3();

const _q1 = new three.Quaternion();
/**
* Returns a single geometry for the given object. If the object is compound,
* its geometries are automatically merged. Bake world scale into each
* geometry, because we can't easily apply that to the cannonjs shapes later.
*/


function getGeometry(object) {
  const meshes = getMeshes(object);
  if (meshes.length === 0) return null; // Single mesh. Return, preserving original type.

  if (meshes.length === 1) {
    return normalizeGeometry(meshes[0]);
  } // Multiple meshes. Merge and return.


  let mesh;
  const geometries = [];

  while (mesh = meshes.pop()) {
    geometries.push(simplifyGeometry(normalizeGeometry(mesh)));
  }

  return mergeBufferGeometries(geometries);
}

function normalizeGeometry(mesh) {
  let geometry = mesh.geometry;

  if (geometry.toBufferGeometry) {
    geometry = geometry.toBufferGeometry();
  } else {
    // Preserve original type, e.g. CylinderBufferGeometry.
    geometry = geometry.clone();
  }

  mesh.updateMatrixWorld();
  mesh.matrixWorld.decompose(_v1, _q1, _v2);
  geometry.scale(_v2.x, _v2.y, _v2.z);
  return geometry;
}
/**
 * Greatly simplified version of BufferGeometryUtils.mergeBufferGeometries.
 * Because we only care about the vertex positions, and not the indices or
 * other attributes, we throw everything else away.
 */


function mergeBufferGeometries(geometries) {
  let vertexCount = 0;

  for (let i = 0; i < geometries.length; i++) {
    const position = geometries[i].attributes.position;

    if (position && position.itemSize === 3) {
      vertexCount += position.count;
    }
  }

  const positionArray = new Float32Array(vertexCount * 3);
  let positionOffset = 0;

  for (let i = 0; i < geometries.length; i++) {
    const position = geometries[i].attributes.position;

    if (position && position.itemSize === 3) {
      for (let j = 0; j < position.count; j++) {
        positionArray[positionOffset++] = position.getX(j);
        positionArray[positionOffset++] = position.getY(j);
        positionArray[positionOffset++] = position.getZ(j);
      }
    }
  }

  return new three.BufferGeometry().setAttribute('position', new three.BufferAttribute(positionArray, 3));
}

function getVertices(geometry) {
  const position = geometry.attributes.position;
  const vertices = new Float32Array(position.count * 3);

  for (let i = 0; i < position.count; i++) {
    vertices[i * 3] = position.getX(i);
    vertices[i * 3 + 1] = position.getY(i);
    vertices[i * 3 + 2] = position.getZ(i);
  }

  return vertices;
}
/**
* Returns a flat array of THREE.Mesh instances from the given object. If
* nested transformations are found, they are applied to child meshes
* as mesh.userData.matrix, so that each mesh has its position/rotation/scale
* independently of all of its parents except the top-level object.
*/

function getMeshes(object) {
  const meshes = [];
  object.traverse(function (o) {
    if (o.isMesh) {
      meshes.push(o);
    }
  });
  return meshes;
}

function getComponent(v, component) {
  switch (component) {
    case 'x':
      return v.x;

    case 'y':
      return v.y;

    case 'z':
      return v.z;
  }

  throw new Error("Unexpected component " + component);
}
/**
* Modified version of BufferGeometryUtils.mergeVertices, ignoring vertex
* attributes other than position.
*
* @param {THREE.BufferGeometry} geometry
* @param {number} tolerance
* @return {THREE.BufferGeometry>}
*/

function simplifyGeometry(geometry, tolerance = 1e-4) {
  tolerance = Math.max(tolerance, Number.EPSILON); // Generate an index buffer if the geometry doesn't have one, or optimize it
  // if it's already available.

  const hashToIndex = {};
  const indices = geometry.getIndex();
  const positions = geometry.getAttribute('position');
  const vertexCount = indices ? indices.count : positions.count; // Next value for triangle indices.

  let nextIndex = 0;
  const newIndices = [];
  const newPositions = []; // Convert the error tolerance to an amount of decimal places to truncate to.

  const decimalShift = Math.log10(1 / tolerance);
  const shiftMultiplier = Math.pow(10, decimalShift);

  for (let i = 0; i < vertexCount; i++) {
    const index = indices ? indices.getX(i) : i; // Generate a hash for the vertex attributes at the current index 'i'.

    let hash = ''; // Double tilde truncates the decimal value.

    hash += ~~(positions.getX(index) * shiftMultiplier) + ",";
    hash += ~~(positions.getY(index) * shiftMultiplier) + ",";
    hash += ~~(positions.getZ(index) * shiftMultiplier) + ","; // Add another reference to the vertex if it's already
    // used by another index.

    if (hash in hashToIndex) {
      newIndices.push(hashToIndex[hash]);
    } else {
      newPositions.push(positions.getX(index));
      newPositions.push(positions.getY(index));
      newPositions.push(positions.getZ(index));
      hashToIndex[hash] = nextIndex;
      newIndices.push(nextIndex);
      nextIndex++;
    }
  } // Construct merged BufferGeometry.


  const positionAttribute = new three.BufferAttribute(new Float32Array(newPositions), positions.itemSize, positions.normalized);
  const result = new three.BufferGeometry();
  result.setAttribute('position', positionAttribute);
  result.setIndex(newIndices);
  return result;
}

const PI_2 = Math.PI / 2;
exports.ShapeType = void 0;

(function (ShapeType) {
  ShapeType["BOX"] = "Box";
  ShapeType["CYLINDER"] = "Cylinder";
  ShapeType["SPHERE"] = "Sphere";
  ShapeType["HULL"] = "ConvexPolyhedron";
  ShapeType["MESH"] = "Trimesh";
})(exports.ShapeType || (exports.ShapeType = {}));
/**
 * Given a THREE.Object3D instance, creates parameters for a CANNON shape.
 */


const getShapeParameters = function (object, options = {}) {
  let geometry;

  if (options.type === exports.ShapeType.BOX) {
    return getBoundingBoxParameters(object);
  } else if (options.type === exports.ShapeType.CYLINDER) {
    return getBoundingCylinderParameters(object, options);
  } else if (options.type === exports.ShapeType.SPHERE) {
    return getBoundingSphereParameters(object, options);
  } else if (options.type === exports.ShapeType.HULL) {
    return getConvexPolyhedronParameters(object);
  } else if (options.type === exports.ShapeType.MESH) {
    geometry = getGeometry(object);
    return geometry ? getTrimeshParameters(geometry) : null;
  } else if (options.type) {
    throw new Error("[CANNON.getShapeParameters] Invalid type \"" + options.type + "\".");
  }

  geometry = getGeometry(object);
  if (!geometry) return null;

  switch (geometry.type) {
    case 'BoxGeometry':
    case 'BoxBufferGeometry':
      return getBoxParameters(geometry);

    case 'CylinderGeometry':
    case 'CylinderBufferGeometry':
      return getCylinderParameters(geometry);

    case 'PlaneGeometry':
    case 'PlaneBufferGeometry':
      return getPlaneParameters(geometry);

    case 'SphereGeometry':
    case 'SphereBufferGeometry':
      return getSphereParameters(geometry);

    case 'TubeGeometry':
    case 'BufferGeometry':
      return getBoundingBoxParameters(object);

    default:
      console.warn('Unrecognized geometry: "%s". Using bounding box as shape.', geometry.type);
      return getBoxParameters(geometry);
  }
};
/**
 * Given a THREE.Object3D instance, creates a corresponding CANNON shape.
 */

const threeToCannon = function (object, options = {}) {
  const shapeParameters = getShapeParameters(object, options);

  if (!shapeParameters) {
    return null;
  }

  const {
    type,
    params,
    offset,
    orientation
  } = shapeParameters;
  let shape;

  if (type === exports.ShapeType.BOX) {
    shape = createBox(params);
  } else if (type === exports.ShapeType.CYLINDER) {
    shape = createCylinder(params);
  } else if (type === exports.ShapeType.SPHERE) {
    shape = createSphere(params);
  } else if (type === exports.ShapeType.HULL) {
    shape = createConvexPolyhedron(params);
  } else {
    shape = createTrimesh(params);
  }

  return {
    shape,
    offset,
    orientation
  };
};
/******************************************************************************
 * Shape construction
 */

function createBox(params) {
  const {
    x,
    y,
    z
  } = params;
  const shape = new cannonEs.Box(new cannonEs.Vec3(x, y, z));
  return shape;
}

function createCylinder(params) {
  const {
    radiusTop,
    radiusBottom,
    height,
    segments
  } = params;
  const shape = new cannonEs.Cylinder(radiusTop, radiusBottom, height, segments); // Include metadata for serialization.
  // TODO(cleanup): Is this still necessary?

  shape.radiusTop = radiusBottom;
  shape.radiusBottom = radiusBottom;
  shape.height = height;
  shape.numSegments = segments;
  return shape;
}

function createSphere(params) {
  const shape = new cannonEs.Sphere(params.radius);
  return shape;
}

function createConvexPolyhedron(params) {
  const {
    faces,
    vertices: verticesArray
  } = params;
  const vertices = [];

  for (let i = 0; i < verticesArray.length; i += 3) {
    vertices.push(new cannonEs.Vec3(verticesArray[i], verticesArray[i + 1], verticesArray[i + 2]));
  }

  const shape = new cannonEs.ConvexPolyhedron({
    faces,
    vertices
  });
  return shape;
}

function createTrimesh(params) {
  const {
    vertices,
    indices
  } = params;
  const shape = new cannonEs.Trimesh(vertices, indices);
  return shape;
}
/******************************************************************************
 * Shape parameters
 */


function getBoxParameters(geometry) {
  const vertices = getVertices(geometry);
  if (!vertices.length) return null;
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  return {
    type: exports.ShapeType.BOX,
    params: {
      x: (box.max.x - box.min.x) / 2,
      y: (box.max.y - box.min.y) / 2,
      z: (box.max.z - box.min.z) / 2
    }
  };
}
/** Bounding box needs to be computed with the entire subtree, not just geometry. */


function getBoundingBoxParameters(object) {
  const clone = object.clone();
  clone.quaternion.set(0, 0, 0, 1);
  clone.updateMatrixWorld();
  const box = new three.Box3().setFromObject(clone);
  if (!isFinite(box.min.lengthSq())) return null;
  const localPosition = box.translate(clone.position.negate()).getCenter(new three.Vector3());
  return {
    type: exports.ShapeType.BOX,
    params: {
      x: (box.max.x - box.min.x) / 2,
      y: (box.max.y - box.min.y) / 2,
      z: (box.max.z - box.min.z) / 2
    },
    offset: localPosition.lengthSq() ? new cannonEs.Vec3(localPosition.x, localPosition.y, localPosition.z) : undefined
  };
}
/** Computes 3D convex hull as a CANNON.ConvexPolyhedron. */


function getConvexPolyhedronParameters(object) {
  const geometry = getGeometry(object);
  if (!geometry) return null; // Perturb.

  const eps = 1e-4;

  for (let i = 0; i < geometry.attributes.position.count; i++) {
    geometry.attributes.position.setXYZ(i, geometry.attributes.position.getX(i) + (Math.random() - 0.5) * eps, geometry.attributes.position.getY(i) + (Math.random() - 0.5) * eps, geometry.attributes.position.getZ(i) + (Math.random() - 0.5) * eps);
  } // Compute the 3D convex hull.


  const hull = new ConvexHull().setFromObject(new three.Mesh(geometry));
  const hullFaces = hull.faces;
  const vertices = [];
  const faces = [];
  let currentFaceVertex = 0;

  for (let i = 0; i < hullFaces.length; i++) {
    const hullFace = hullFaces[i];
    const face = [];
    faces.push(face);
    let edge = hullFace.edge;

    do {
      const point = edge.head().point;
      vertices.push(point.x, point.y, point.z);
      face.push(currentFaceVertex);
      currentFaceVertex++;
      edge = edge.next;
    } while (edge !== hullFace.edge);
  }

  const verticesTypedArray = new Float32Array(vertices.length);
  verticesTypedArray.set(vertices);
  return {
    type: exports.ShapeType.HULL,
    params: {
      vertices: verticesTypedArray,
      faces
    }
  };
}

function getCylinderParameters(geometry) {
  const params = geometry.parameters;
  return {
    type: exports.ShapeType.CYLINDER,
    params: {
      radiusTop: params.radiusTop,
      radiusBottom: params.radiusBottom,
      height: params.height,
      segments: params.radialSegments
    },
    orientation: new cannonEs.Quaternion().setFromEuler(three.MathUtils.degToRad(-90), 0, 0, 'XYZ').normalize()
  };
}

function getBoundingCylinderParameters(object, options) {
  const axes = ['x', 'y', 'z'];
  const majorAxis = options.cylinderAxis || 'y';
  const minorAxes = axes.splice(axes.indexOf(majorAxis), 1) && axes;
  const box = new three.Box3().setFromObject(object);
  if (!isFinite(box.min.lengthSq())) return null; // Compute cylinder dimensions.

  const height = box.max[majorAxis] - box.min[majorAxis];
  const radius = 0.5 * Math.max(getComponent(box.max, minorAxes[0]) - getComponent(box.min, minorAxes[0]), getComponent(box.max, minorAxes[1]) - getComponent(box.min, minorAxes[1]));
  const eulerX = majorAxis === 'y' ? PI_2 : 0;
  const eulerY = majorAxis === 'z' ? PI_2 : 0;
  return {
    type: exports.ShapeType.CYLINDER,
    params: {
      radiusTop: radius,
      radiusBottom: radius,
      height,
      segments: 12
    },
    orientation: new cannonEs.Quaternion().setFromEuler(eulerX, eulerY, 0, 'XYZ').normalize()
  };
}

function getPlaneParameters(geometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  return {
    type: exports.ShapeType.BOX,
    params: {
      x: (box.max.x - box.min.x) / 2 || 0.1,
      y: (box.max.y - box.min.y) / 2 || 0.1,
      z: (box.max.z - box.min.z) / 2 || 0.1
    }
  };
}

function getSphereParameters(geometry) {
  return {
    type: exports.ShapeType.SPHERE,
    params: {
      radius: geometry.parameters.radius
    }
  };
}

function getBoundingSphereParameters(object, options) {
  if (options.sphereRadius) {
    return {
      type: exports.ShapeType.SPHERE,
      params: {
        radius: options.sphereRadius
      }
    };
  }

  const geometry = getGeometry(object);
  if (!geometry) return null;
  geometry.computeBoundingSphere();
  return {
    type: exports.ShapeType.SPHERE,
    params: {
      radius: geometry.boundingSphere.radius
    }
  };
}

function getTrimeshParameters(geometry) {
  const vertices = getVertices(geometry);
  if (!vertices.length) return null;
  const indices = new Uint32Array(vertices.length);

  for (let i = 0; i < vertices.length; i++) {
    indices[i] = i;
  }

  return {
    type: exports.ShapeType.MESH,
    params: {
      vertices,
      indices
    }
  };
}

exports.getShapeParameters = getShapeParameters;
exports.threeToCannon = threeToCannon;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"cannon-es":5}],8:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'], (
            // try to call default if defined to also support babel esmodule
            // exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);'
        )),
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}],9:[function(require,module,exports){
/* global Ammo */
const CONSTRAINT = require("../constants").CONSTRAINT;

module.exports = AFRAME.registerComponent("ammo-constraint", {
  multiple: true,

  schema: {
    // Type of constraint.
    type: {
      default: CONSTRAINT.LOCK,
      oneOf: [
        CONSTRAINT.LOCK,
        CONSTRAINT.FIXED,
        CONSTRAINT.SPRING,
        CONSTRAINT.SLIDER,
        CONSTRAINT.HINGE,
        CONSTRAINT.CONE_TWIST,
        CONSTRAINT.POINT_TO_POINT
      ]
    },

    // Target (other) body for the constraint.
    target: { type: "selector" },

    // Offset of the hinge or point-to-point constraint, defined locally in the body. Used for hinge, coneTwist pointToPoint constraints.
    pivot: { type: "vec3" },
    targetPivot: { type: "vec3" },

    // An axis that each body can rotate around, defined locally to that body. Used for hinge constraints.
    axis: { type: "vec3", default: { x: 0, y: 0, z: 1 } },
    targetAxis: { type: "vec3", default: { x: 0, y: 0, z: 1 } },

    // damping & stuffness - used for spring contraints only
    damping: { type: "number", default: 1 },
    stiffness: { type: "number", default: 100 },
  },

  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.constraint = null;
  },

  remove: function() {
    if (!this.constraint) return;

    this.system.removeConstraint(this.constraint);
    this.constraint = null;
  },

  update: function() {
    const el = this.el,
      data = this.data;

    this.remove();

    if (!el.body || !data.target.body) {
      (el.body ? data.target : el).addEventListener("body-loaded", this.update.bind(this, {}), { once: true });
      return;
    }

    this.constraint = this.createConstraint();
    this.system.addConstraint(this.constraint);
  },

  /**
   * @return {Ammo.btTypedConstraint}
   */
  createConstraint: function() {
    let constraint;
    const data = this.data,
      body = this.el.body,
      targetBody = data.target.body;

    const bodyTransform = body
      .getCenterOfMassTransform()
      .inverse()
      .op_mul(targetBody.getWorldTransform());
    const targetTransform = new Ammo.btTransform();
    targetTransform.setIdentity();

    switch (data.type) {
      case CONSTRAINT.LOCK: {
        constraint = new Ammo.btGeneric6DofConstraint(body, targetBody, bodyTransform, targetTransform, true);
        const zero = new Ammo.btVector3(0, 0, 0);
        //TODO: allow these to be configurable
        constraint.setLinearLowerLimit(zero);
        constraint.setLinearUpperLimit(zero);
        constraint.setAngularLowerLimit(zero);
        constraint.setAngularUpperLimit(zero);
        Ammo.destroy(zero);
        break;
      }
      //TODO: test and verify all other constraint types
      case CONSTRAINT.FIXED: {
        //btFixedConstraint does not seem to debug render
        bodyTransform.setRotation(body.getWorldTransform().getRotation());
        targetTransform.setRotation(targetBody.getWorldTransform().getRotation());
        constraint = new Ammo.btFixedConstraint(body, targetBody, bodyTransform, targetTransform);
        break;
      }
      case CONSTRAINT.SPRING: {
        constraint = new Ammo.btGeneric6DofSpringConstraint(body, targetBody, bodyTransform, targetTransform, true);

        // Very limited initial implementation of spring constraint.
        // See: https://github.com/n5ro/aframe-physics-system/issues/171
        for (var i in [0,1,2,3,4,5]) {
          constraint.enableSpring(1, true)
          constraint.setStiffness(1, this.data.stiffness)
          constraint.setDamping(1, this.data.damping)
        }
        const upper = new Ammo.btVector3(-1, -1, -1);
        const lower = new Ammo.btVector3(1, 1, 1);
        constraint.setLinearUpperLimit(upper);
        constraint.setLinearLowerLimit(lower)
        Ammo.destroy(upper);
        Ammo.destroy(lower);
        break;
      }
      case CONSTRAINT.SLIDER: {
        //TODO: support setting linear and angular limits
        constraint = new Ammo.btSliderConstraint(body, targetBody, bodyTransform, targetTransform, true);
        constraint.setLowerLinLimit(-1);
        constraint.setUpperLinLimit(1);
        // constraint.setLowerAngLimit();
        // constraint.setUpperAngLimit();
        break;
      }
      case CONSTRAINT.HINGE: {
        const pivot = new Ammo.btVector3(data.pivot.x, data.pivot.y, data.pivot.z);
        const targetPivot = new Ammo.btVector3(data.targetPivot.x, data.targetPivot.y, data.targetPivot.z);

        const axis = new Ammo.btVector3(data.axis.x, data.axis.y, data.axis.z);
        const targetAxis = new Ammo.btVector3(data.targetAxis.x, data.targetAxis.y, data.targetAxis.z);

        constraint = new Ammo.btHingeConstraint(body, targetBody, pivot, targetPivot, axis, targetAxis, true);

        Ammo.destroy(pivot);
        Ammo.destroy(targetPivot);
        Ammo.destroy(axis);
        Ammo.destroy(targetAxis);
        break;
      }
      case CONSTRAINT.CONE_TWIST: {
        const pivotTransform = new Ammo.btTransform();
        pivotTransform.setIdentity();
        pivotTransform.getOrigin().setValue(data.pivot.x, data.pivot.y, data.pivot.z);
        const targetPivotTransform = new Ammo.btTransform();
        targetPivotTransform.setIdentity();
        targetPivotTransform.getOrigin().setValue(data.targetPivot.x, data.targetPivot.y, data.targetPivot.z);
        constraint = new Ammo.btConeTwistConstraint(body, targetBody, pivotTransform, targetPivotTransform);
        Ammo.destroy(pivotTransform);
        Ammo.destroy(targetPivotTransform);
        break;
      }
      case CONSTRAINT.POINT_TO_POINT: {
        const pivot = new Ammo.btVector3(data.pivot.x, data.pivot.y, data.pivot.z);
        const targetPivot = new Ammo.btVector3(data.targetPivot.x, data.targetPivot.y, data.targetPivot.z);

        constraint = new Ammo.btPoint2PointConstraint(body, targetBody, pivot, targetPivot);

        Ammo.destroy(pivot);
        Ammo.destroy(targetPivot);
        break;
      }
      default:
        throw new Error("[constraint] Unexpected type: " + data.type);
    }

    Ammo.destroy(bodyTransform);
    Ammo.destroy(targetTransform);

    return constraint;
  }
});

},{"../constants":20}],10:[function(require,module,exports){
/* global Ammo,THREE */
const AmmoDebugDrawer = require("ammo-debug-drawer");
const threeToAmmo = require("three-to-ammo");
const CONSTANTS = require("../../constants"),
  ACTIVATION_STATE = CONSTANTS.ACTIVATION_STATE,
  COLLISION_FLAG = CONSTANTS.COLLISION_FLAG,
  SHAPE = CONSTANTS.SHAPE,
  TYPE = CONSTANTS.TYPE,
  FIT = CONSTANTS.FIT;

const ACTIVATION_STATES = [
  ACTIVATION_STATE.ACTIVE_TAG,
  ACTIVATION_STATE.ISLAND_SLEEPING,
  ACTIVATION_STATE.WANTS_DEACTIVATION,
  ACTIVATION_STATE.DISABLE_DEACTIVATION,
  ACTIVATION_STATE.DISABLE_SIMULATION
];

const RIGID_BODY_FLAGS = {
  NONE: 0,
  DISABLE_WORLD_GRAVITY: 1
};

function almostEqualsVector3(epsilon, u, v) {
  return Math.abs(u.x - v.x) < epsilon && Math.abs(u.y - v.y) < epsilon && Math.abs(u.z - v.z) < epsilon;
}

function almostEqualsBtVector3(epsilon, u, v) {
  return Math.abs(u.x() - v.x()) < epsilon && Math.abs(u.y() - v.y()) < epsilon && Math.abs(u.z() - v.z()) < epsilon;
}

function almostEqualsQuaternion(epsilon, u, v) {
  return (
    (Math.abs(u.x - v.x) < epsilon &&
      Math.abs(u.y - v.y) < epsilon &&
      Math.abs(u.z - v.z) < epsilon &&
      Math.abs(u.w - v.w) < epsilon) ||
    (Math.abs(u.x + v.x) < epsilon &&
      Math.abs(u.y + v.y) < epsilon &&
      Math.abs(u.z + v.z) < epsilon &&
      Math.abs(u.w + v.w) < epsilon)
  );
}

let AmmoBody = {
  schema: {
    loadedEvent: { default: "" },
    mass: { default: 1 },
    gravity: { type: "vec3", default: { x: 0, y: -9.8, z: 0 } },
    linearDamping: { default: 0.01 },
    angularDamping: { default: 0.01 },
    linearSleepingThreshold: { default: 1.6 },
    angularSleepingThreshold: { default: 2.5 },
    angularFactor: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
    activationState: {
      default: ACTIVATION_STATE.ACTIVE_TAG,
      oneOf: ACTIVATION_STATES
    },
    type: { default: "dynamic", oneOf: [TYPE.STATIC, TYPE.DYNAMIC, TYPE.KINEMATIC] },
    emitCollisionEvents: { default: false },
    disableCollision: { default: false },
    collisionFilterGroup: { default: 1 }, //32-bit mask,
    collisionFilterMask: { default: 1 }, //32-bit mask
    scaleAutoUpdate: { default: true },
    restitution: {default: 0} // does not support updates
  },

  /**
   * Initializes a body component, assigning it to the physics system and binding listeners for
   * parsing the elements geometry.
   */
  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.shapeComponents = [];

    if (this.data.loadedEvent === "") {
      this.loadedEventFired = true;
    } else {
      this.el.addEventListener(
        this.data.loadedEvent,
        () => {
          this.loadedEventFired = true;
        },
        { once: true }
      );
    }

    if (this.system.initialized && this.loadedEventFired) {
      this.initBody();
    }
  },

  /**
   * Parses an element's geometry and component metadata to create an Ammo body instance for the
   * component.
   */
  initBody: (function() {
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const boundingBox = new THREE.Box3();

    return function() {
      const el = this.el,
        data = this.data;
      const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

      this.localScaling = new Ammo.btVector3();

      const obj = this.el.object3D;
      obj.getWorldPosition(pos);
      obj.getWorldQuaternion(quat);

      this.prevScale = new THREE.Vector3(1, 1, 1);
      this.prevNumChildShapes = 0;

      this.msTransform = new Ammo.btTransform();
      this.msTransform.setIdentity();
      this.rotation = new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w);

      this.msTransform.getOrigin().setValue(pos.x, pos.y, pos.z);
      this.msTransform.setRotation(this.rotation);

      this.motionState = new Ammo.btDefaultMotionState(this.msTransform);

      this.localInertia = new Ammo.btVector3(0, 0, 0);

      this.compoundShape = new Ammo.btCompoundShape(true);

      this.rbInfo = new Ammo.btRigidBodyConstructionInfo(
        data.mass,
        this.motionState,
        this.compoundShape,
        this.localInertia
      );
      this.rbInfo.m_restitution = clamp(this.data.restitution, 0, 1);
      this.body = new Ammo.btRigidBody(this.rbInfo);
      this.body.setActivationState(ACTIVATION_STATES.indexOf(data.activationState) + 1);
      this.body.setSleepingThresholds(data.linearSleepingThreshold, data.angularSleepingThreshold);

      this.body.setDamping(data.linearDamping, data.angularDamping);

      const angularFactor = new Ammo.btVector3(data.angularFactor.x, data.angularFactor.y, data.angularFactor.z);
      this.body.setAngularFactor(angularFactor);
      Ammo.destroy(angularFactor);

      const gravity = new Ammo.btVector3(data.gravity.x, data.gravity.y, data.gravity.z);
      if (!almostEqualsBtVector3(0.001, gravity, this.system.driver.physicsWorld.getGravity())) {
        this.body.setGravity(gravity);
        this.body.setFlags(RIGID_BODY_FLAGS.DISABLE_WORLD_GRAVITY);
      }
      Ammo.destroy(gravity);

      this.updateCollisionFlags();

      this.el.body = this.body;
      this.body.el = el;

      this.isLoaded = true;

      this.el.emit("body-loaded", { body: this.el.body });

      this._addToSystem();
    };
  })(),

  tick: function() {
    if (this.system.initialized && !this.isLoaded && this.loadedEventFired) {
      this.initBody();
    }
  },

  _updateShapes: (function() {
    const needsPolyhedralInitialization = [SHAPE.HULL, SHAPE.HACD, SHAPE.VHACD];
    return function() {
      let updated = false;

      const obj = this.el.object3D;
      if (this.data.scaleAutoUpdate && this.prevScale && !almostEqualsVector3(0.001, obj.scale, this.prevScale)) {
        this.prevScale.copy(obj.scale);
        updated = true;

        this.localScaling.setValue(this.prevScale.x, this.prevScale.y, this.prevScale.z);
        this.compoundShape.setLocalScaling(this.localScaling);
      }

      if (this.shapeComponentsChanged) {
        this.shapeComponentsChanged = false;
        updated = true;
        for (let i = 0; i < this.shapeComponents.length; i++) {
          const shapeComponent = this.shapeComponents[i];
          if (shapeComponent.getShapes().length === 0) {
            this._createCollisionShape(shapeComponent);
          }
          const collisionShapes = shapeComponent.getShapes();
          for (let j = 0; j < collisionShapes.length; j++) {
            const collisionShape = collisionShapes[j];
            if (!collisionShape.added) {
              this.compoundShape.addChildShape(collisionShape.localTransform, collisionShape);
              collisionShape.added = true;
            }
          }
        }

        if (this.data.type === TYPE.DYNAMIC) {
          this.updateMass();
        }

        this.system.driver.updateBody(this.body);
      }

      //call initializePolyhedralFeatures for hull shapes if debug is turned on and/or scale changes
      if (this.system.debug && (updated || !this.polyHedralFeaturesInitialized)) {
        for (let i = 0; i < this.shapeComponents.length; i++) {
          const collisionShapes = this.shapeComponents[i].getShapes();
          for (let j = 0; j < collisionShapes.length; j++) {
            const collisionShape = collisionShapes[j];
            if (needsPolyhedralInitialization.indexOf(collisionShape.type) !== -1) {
              collisionShape.initializePolyhedralFeatures(0);
            }
          }
        }
        this.polyHedralFeaturesInitialized = true;
      }
    };
  })(),

  _createCollisionShape: function(shapeComponent) {
    const data = shapeComponent.data;
    const collisionShapes = threeToAmmo.createCollisionShapes(shapeComponent.getMesh(), data);
    shapeComponent.addShapes(collisionShapes);
    return;
  },

  /**
   * Registers the component with the physics system.
   */
  play: function() {
    if (this.isLoaded) {
      this._addToSystem();
    }
  },

  _addToSystem: function() {
    if (!this.addedToSystem) {
      this.system.addBody(this.body, this.data.collisionFilterGroup, this.data.collisionFilterMask);

      if (this.data.emitCollisionEvents) {
        this.system.driver.addEventListener(this.body);
      }

      this.system.addComponent(this);
      this.addedToSystem = true;
    }
  },

  /**
   * Unregisters the component with the physics system.
   */
  pause: function() {
    if (this.addedToSystem) {
      this.system.removeComponent(this);
      this.system.removeBody(this.body);
      this.addedToSystem = false;
    }
  },

  /**
   * Updates the rigid body instance, where possible.
   */
  update: function(prevData) {
    if (this.isLoaded) {
      if (!this.hasUpdated) {
        //skip the first update
        this.hasUpdated = true;
        return;
      }

      const data = this.data;

      if (prevData.type !== data.type || prevData.disableCollision !== data.disableCollision) {
        this.updateCollisionFlags();
      }

      if (prevData.activationState !== data.activationState) {
        this.body.forceActivationState(ACTIVATION_STATES.indexOf(data.activationState) + 1);
        if (data.activationState === ACTIVATION_STATE.ACTIVE_TAG) {
          this.body.activate(true);
        }
      }

      if (
        prevData.collisionFilterGroup !== data.collisionFilterGroup ||
        prevData.collisionFilterMask !== data.collisionFilterMask
      ) {
        const broadphaseProxy = this.body.getBroadphaseProxy();
        broadphaseProxy.set_m_collisionFilterGroup(data.collisionFilterGroup);
        broadphaseProxy.set_m_collisionFilterMask(data.collisionFilterMask);
        this.system.driver.broadphase
          .getOverlappingPairCache()
          .removeOverlappingPairsContainingProxy(broadphaseProxy, this.system.driver.dispatcher);
      }

      if (prevData.linearDamping != data.linearDamping || prevData.angularDamping != data.angularDamping) {
        this.body.setDamping(data.linearDamping, data.angularDamping);
      }

      if (!almostEqualsVector3(0.001, prevData.gravity, data.gravity)) {
        const gravity = new Ammo.btVector3(data.gravity.x, data.gravity.y, data.gravity.z);
        if (!almostEqualsBtVector3(0.001, gravity, this.system.driver.physicsWorld.getGravity())) {
          this.body.setFlags(RIGID_BODY_FLAGS.DISABLE_WORLD_GRAVITY);
        } else {
          this.body.setFlags(RIGID_BODY_FLAGS.NONE);
        }
        this.body.setGravity(gravity);
        Ammo.destroy(gravity);
      }

      if (
        prevData.linearSleepingThreshold != data.linearSleepingThreshold ||
        prevData.angularSleepingThreshold != data.angularSleepingThreshold
      ) {
        this.body.setSleepingThresholds(data.linearSleepingThreshold, data.angularSleepingThreshold);
      }

      if (!almostEqualsVector3(0.001, prevData.angularFactor, data.angularFactor)) {
        const angularFactor = new Ammo.btVector3(data.angularFactor.x, data.angularFactor.y, data.angularFactor.z);
        this.body.setAngularFactor(angularFactor);
        Ammo.destroy(angularFactor);
      }

      if (prevData.restitution != data.restitution ) {
        console.warn("ammo-body restitution cannot be updated from its initial value.")
      }

      //TODO: support dynamic update for other properties
    }
  },

  /**
   * Removes the component and all physics and scene side effects.
   */
  remove: function() {
    if (this.triMesh) Ammo.destroy(this.triMesh);
    if (this.localScaling) Ammo.destroy(this.localScaling);
    if (this.compoundShape) Ammo.destroy(this.compoundShape);
    if (this.body) {
      Ammo.destroy(this.body);
      delete this.body;
    }
    Ammo.destroy(this.rbInfo);
    Ammo.destroy(this.msTransform);
    Ammo.destroy(this.motionState);
    Ammo.destroy(this.localInertia);
    Ammo.destroy(this.rotation);
  },

  beforeStep: function() {
    this._updateShapes();
    // Note that since static objects don't move,
    // we don't sync them to physics on a routine basis.
    if (this.data.type === TYPE.KINEMATIC) {
      this.syncToPhysics();
    }
  },

  step: function() {
    if (this.data.type === TYPE.DYNAMIC) {
      this.syncFromPhysics();
    }
  },

  /**
   * Updates the rigid body's position, velocity, and rotation, based on the scene.
   */
  syncToPhysics: (function() {
    const q = new THREE.Quaternion();
    const v = new THREE.Vector3();
    const q2 = new THREE.Vector3();
    const v2 = new THREE.Vector3();
    return function() {
      const el = this.el,
        parentEl = el.parentEl,
        body = this.body;

      if (!body) return;

      this.motionState.getWorldTransform(this.msTransform);

      if (parentEl.isScene) {
        v.copy(el.object3D.position);
        q.copy(el.object3D.quaternion);
      } else {
        el.object3D.getWorldPosition(v);
        el.object3D.getWorldQuaternion(q);
      }

      const position = this.msTransform.getOrigin();
      v2.set(position.x(), position.y(), position.z());

      const quaternion = this.msTransform.getRotation();
      q2.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());

      if (!almostEqualsVector3(0.001, v, v2) || !almostEqualsQuaternion(0.001, q, q2)) {
        if (!this.body.isActive()) {
          this.body.activate(true);
        }
        this.msTransform.getOrigin().setValue(v.x, v.y, v.z);
        this.rotation.setValue(q.x, q.y, q.z, q.w);
        this.msTransform.setRotation(this.rotation);
        this.motionState.setWorldTransform(this.msTransform);

        if (this.data.type === TYPE.STATIC) {
          this.body.setCenterOfMassTransform(this.msTransform);
        }
      }
    };
  })(),

  /**
   * Updates the scene object's position and rotation, based on the physics simulation.
   */
  syncFromPhysics: (function() {
    const v = new THREE.Vector3(),
      q1 = new THREE.Quaternion(),
      q2 = new THREE.Quaternion();
    return function() {
      this.motionState.getWorldTransform(this.msTransform);
      const position = this.msTransform.getOrigin();
      const quaternion = this.msTransform.getRotation();

      const el = this.el,
        body = this.body;

      // For the parent, prefer to use the THHREE.js scene graph parent (if it can be determined)
      // and only use the HTML scene graph parent as a fallback.
      // Usually these are the same, but there are various cases where it's useful to modify the THREE.js
      // scene graph so that it deviates from the HTML.
      // In these cases the THREE.js scene graph should be considered the definitive reference in terms
      // of object positioning etc.
      // For specific examples, and more discussion, see:
      // https://github.com/c-frame/aframe-physics-system/pull/1#issuecomment-1264686433
      const parentEl = el.object3D.parent.el ? el.object3D.parent.el : el.parentEl;

      if (!body) return;
      if (!parentEl) return;

      if (parentEl.isScene) {
        el.object3D.position.set(position.x(), position.y(), position.z());
        el.object3D.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
      } else {
        q1.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
        parentEl.object3D.getWorldQuaternion(q2);
        q1.multiply(q2.invert());
        el.object3D.quaternion.copy(q1);

        v.set(position.x(), position.y(), position.z());
        parentEl.object3D.worldToLocal(v);
        el.object3D.position.copy(v);
      }
    };
  })(),

  addShapeComponent: function(shapeComponent) {
    if (shapeComponent.data.type === SHAPE.MESH && this.data.type !== TYPE.STATIC) {
      console.warn("non-static mesh colliders not supported");
      return;
    }

    this.shapeComponents.push(shapeComponent);
    this.shapeComponentsChanged = true;
  },

  removeShapeComponent: function(shapeComponent) {
    const index = this.shapeComponents.indexOf(shapeComponent);
    if (this.compoundShape && index !== -1 && this.body) {
      const shapes = shapeComponent.getShapes();
      for (var i = 0; i < shapes.length; i++) {
        this.compoundShape.removeChildShape(shapes[i]);
      }
      this.shapeComponentsChanged = true;
      this.shapeComponents.splice(index, 1);
    }
  },

  updateMass: function() {
    const shape = this.body.getCollisionShape();
    const mass = this.data.type === TYPE.DYNAMIC ? this.data.mass : 0;
    shape.calculateLocalInertia(mass, this.localInertia);
    this.body.setMassProps(mass, this.localInertia);
    this.body.updateInertiaTensor();
  },

  updateCollisionFlags: function() {
    let flags = this.data.disableCollision ? 4 : 0;
    switch (this.data.type) {
      case TYPE.STATIC:
        flags |= COLLISION_FLAG.STATIC_OBJECT;
        break;
      case TYPE.KINEMATIC:
        flags |= COLLISION_FLAG.KINEMATIC_OBJECT;
        break;
      default:
        this.body.applyGravity();
        break;
    }
    this.body.setCollisionFlags(flags);

    this.updateMass();

    // TODO: enable CCD if dynamic?
    // this.body.setCcdMotionThreshold(0.001);
    // this.body.setCcdSweptSphereRadius(0.001);

    this.system.driver.updateBody(this.body);
  },

  getVelocity: function() {
    return this.body.getLinearVelocity();
  }
};

module.exports.definition = AmmoBody;
module.exports.Component = AFRAME.registerComponent("ammo-body", AmmoBody);

},{"../../constants":20,"ammo-debug-drawer":4,"three-to-ammo":6}],11:[function(require,module,exports){
var CANNON = require('cannon-es');
const { threeToCannon, ShapeType } = require('three-to-cannon');
const identityQuaternion = new THREE.Quaternion()

function mesh2shape (object, options) {

  const result = threeToCannon(object, options);
  return result;
}

require('../../../lib/CANNON-shape2mesh');

var Body = {
  dependencies: ['velocity'],

  schema: {
    mass: {default: 5, if: {type: 'dynamic'}},
    linearDamping:  { default: 0.01, if: {type: 'dynamic'}},
    angularDamping: { default: 0.01,  if: {type: 'dynamic'}},
    shape: {default: 'auto', oneOf: ['auto', 'box', 'cylinder', 'sphere', 'hull', 'mesh', 'none']},
    cylinderAxis: {default: 'y', oneOf: ['x', 'y', 'z']},
    sphereRadius: {default: NaN},
    type: {default: 'dynamic', oneOf: ['static', 'dynamic']}
  },

  /**
   * Initializes a body component, assigning it to the physics system and binding listeners for
   * parsing the elements geometry.
   */
  init: function () {
    this.system = this.el.sceneEl.systems.physics;

    if (this.el.sceneEl.hasLoaded) {
      this.initBody();
    } else {
      this.el.sceneEl.addEventListener('loaded', this.initBody.bind(this));
    }
  },

  /**
   * Parses an element's geometry and component metadata to create a CANNON.Body instance for the
   * component.
   */
  initBody: function () {
    var el = this.el,
        data = this.data;

    var obj = this.el.object3D;
    var pos = obj.position;
    var quat = obj.quaternion;

    this.body = new CANNON.Body({
      mass: data.type === 'static' ? 0 : data.mass || 0,
      material: this.system.getMaterial('defaultMaterial'),
      position: new CANNON.Vec3(pos.x, pos.y, pos.z),
      quaternion: new CANNON.Quaternion(quat.x, quat.y, quat.z, quat.w),
      linearDamping: data.linearDamping,
      angularDamping: data.angularDamping,
      type: data.type === 'dynamic' ? CANNON.Body.DYNAMIC : CANNON.Body.STATIC,
    });

    // Matrix World must be updated at root level, if scale is to be applied – updateMatrixWorld()
    // only checks an object's parent, not the rest of the ancestors. Hence, a wrapping entity with
    // scale="0.5 0.5 0.5" will be ignored.
    // Reference: https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js#L511-L541
    // Potential fix: https://github.com/mrdoob/three.js/pull/7019
    this.el.object3D.updateMatrixWorld(true);

    if(data.shape !== 'none') {
      var options = data.shape === 'auto' ? undefined : AFRAME.utils.extend({}, this.data, {
        type: ShapeType[data.shape.toUpperCase()]
      });

      var { shape, offset, orientation } = mesh2shape(this.el.object3D, options);

      if (!shape) {
        el.addEventListener('object3dset', this.initBody.bind(this));
        return;
      }
      this.body.addShape(shape, offset, orientation);

      // Show wireframe
      if (this.system.debug) {
        this.shouldUpdateWireframe = true;
      }

      this.hasShape = true;
    }

    this.el.body = this.body;
    this.body.el = el;

    // If component wasn't initialized when play() was called, finish up.
    if (this.isPlaying) {
      this._play();
    }

    if (this.hasShape) {
      this.el.emit('body-loaded', {body: this.el.body});
    }
  },

  addShape: function(shape, offset, orientation) {
    if (this.data.shape !== 'none') {
      console.warn('shape can only be added if shape property is none');
      return;
    }

    if (!shape) {
      console.warn('shape cannot be null');
      return;
    }

    if (!this.body) {
      console.warn('shape cannot be added before body is loaded');
      return;
    }
    this.body.addShape(shape, offset, orientation);

    if (this.system.debug) {
      this.shouldUpdateWireframe = true;
    }

    this.shouldUpdateBody = true;
  },

  tick: function () {
    if (this.shouldUpdateBody) {
      
      // Calling play will result in the object being re-added to the
      // physics system with the updated body / shape data.
      // But we mustn't add it twice, so any previously loaded body should be paused first.
      this._pause();
      this.hasShape = true;
      this._play()

      this.el.emit('body-loaded', {body: this.el.body});
      this.shouldUpdateBody = false;
    }

    if (this.shouldUpdateWireframe) {
      this.createWireframe(this.body);
      this.shouldUpdateWireframe = false;
    }
  },

  /**
   * Registers the component with the physics system, if ready.
   */
  play: function () {
    this._play();
  },

  /**
   * Internal helper to register component with physics system.
   */
  _play: function () {

    if (!this.hasShape) return;

    this.syncToPhysics();
    this.system.addComponent(this);
    this.system.addBody(this.body);
    if (this.wireframe) this.el.sceneEl.object3D.add(this.wireframe);
  },

  /**
   * Unregisters the component with the physics system.
   */
  pause: function () {
    this._pause();
  },

  _pause: function () {

    if (!this.hasShape) return;

    this.system.removeComponent(this);
    if (this.body) this.system.removeBody(this.body);
    if (this.wireframe) this.el.sceneEl.object3D.remove(this.wireframe);
  },

  /**
   * Updates the CANNON.Body instance, where possible.
   */
  update: function (prevData) {
    if (!this.body) return;

    var data = this.data;

    if (prevData.type != undefined && data.type != prevData.type) {
      this.body.type = data.type === 'dynamic' ? CANNON.Body.DYNAMIC : CANNON.Body.STATIC;
    }

    this.body.mass = data.mass || 0;
    if (data.type === 'dynamic') {
      this.body.linearDamping = data.linearDamping;
      this.body.angularDamping = data.angularDamping;
    }
    if (data.mass !== prevData.mass) {
      this.body.updateMassProperties();
    }
    if (this.body.updateProperties) this.body.updateProperties();
  },

  /**
   * Removes the component and all physics and scene side effects.
   */
  remove: function () {
    if (this.body) {
      delete this.body.el;
      delete this.body;
    }
    delete this.el.body;
    delete this.wireframe;
  },

  beforeStep: function () {
    if (this.body.mass === 0) {
      this.syncToPhysics();
    }
  },

  step: function () {
    if (this.body.mass !== 0) {
      this.syncFromPhysics();
    }
  },

  /**
   * Creates a wireframe for the body, for debugging.
   * TODO(donmccurdy) – Refactor this into a standalone utility or component.
   * @param  {CANNON.Body} body
   * @param  {CANNON.Shape} shape
   */
  createWireframe: function (body) {
    if (this.wireframe) {
      this.el.sceneEl.object3D.remove(this.wireframe);
      delete this.wireframe;
    }
    this.wireframe = new THREE.Object3D();
    this.el.sceneEl.object3D.add(this.wireframe);

    var offset, mesh;
    var orientation = new THREE.Quaternion();
    for (var i = 0; i < this.body.shapes.length; i++)
    {
      offset = this.body.shapeOffsets[i],
      orientation.copy(this.body.shapeOrientations[i]),
      mesh = CANNON.shape2mesh(this.body).children[i];

      var wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry),
        new THREE.LineBasicMaterial({color: 0xff0000})
      );

      if (offset) {
        wireframe.position.copy(offset);
      }

      if (orientation) {
        wireframe.quaternion.copy(orientation);
      }

      this.wireframe.add(wireframe);
    }

    this.syncWireframe();
  },

  /**
   * Updates the debugging wireframe's position and rotation.
   */
  syncWireframe: function () {
    var offset,
        wireframe = this.wireframe;

    if (!this.wireframe) return;

    // Apply rotation. If the shape required custom orientation, also apply
    // that on the wireframe.
    wireframe.quaternion.copy(this.body.quaternion);
    if (wireframe.orientation) {
      wireframe.quaternion.multiply(wireframe.orientation);
    }

    // Apply position. If the shape required custom offset, also apply that on
    // the wireframe.
    wireframe.position.copy(this.body.position);
    if (wireframe.offset) {
      offset = wireframe.offset.clone().applyQuaternion(wireframe.quaternion);
      wireframe.position.add(offset);
    }

    wireframe.updateMatrix();
  },

  /**
   * Updates the CANNON.Body instance's position, velocity, and rotation, based on the scene.
   */
  syncToPhysics: (function () {
    var q =  new THREE.Quaternion(),
        v = new THREE.Vector3();
    return function () {
      var el = this.el,
          parentEl = el.parentEl,
          body = this.body;

      if (!body) return;

      if (el.components.velocity) body.velocity.copy(el.getAttribute('velocity'));

      if (parentEl.isScene) {
        body.quaternion.copy(el.object3D.quaternion);
        body.position.copy(el.object3D.position);
      } else {
        el.object3D.getWorldQuaternion(q);
        body.quaternion.copy(q);
        el.object3D.getWorldPosition(v);
        body.position.copy(v);
      }

      if (this.body.updateProperties) this.body.updateProperties();
      if (this.wireframe) this.syncWireframe();
    };
  }()),

  /**
   * Updates the scene object's position and rotation, based on the physics simulation.
   */
  syncFromPhysics: (function () {
    var v = new THREE.Vector3(),
        q1 = new THREE.Quaternion(),
        q2 = new THREE.Quaternion();
    return function () {
      var el = this.el,
          parentEl = el.parentEl,
          body = this.body;

      if (!body) return;
      if (!parentEl) return;

      if (parentEl.isScene) {
        el.object3D.quaternion.copy(body.quaternion);
        el.object3D.position.copy(body.position);
      } else {
        q1.copy(body.quaternion);
        parentEl.object3D.getWorldQuaternion(q2);
        q1.premultiply(q2.invert());
        el.object3D.quaternion.copy(q1);

        v.copy(body.position);
        parentEl.object3D.worldToLocal(v);
        el.object3D.position.copy(v);
      }

      if (this.wireframe) this.syncWireframe();
    };
  }())
};

module.exports.definition = Body;
module.exports.Component = AFRAME.registerComponent('body', Body);

},{"../../../lib/CANNON-shape2mesh":2,"cannon-es":5,"three-to-cannon":7}],12:[function(require,module,exports){
var Body = require('./body');

/**
 * Dynamic body.
 *
 * Moves according to physics simulation, and may collide with other objects.
 */
var DynamicBody = AFRAME.utils.extend({}, Body.definition);

module.exports = AFRAME.registerComponent('dynamic-body', DynamicBody);

},{"./body":11}],13:[function(require,module,exports){
var Body = require('./body');

/**
 * Static body.
 *
 * Solid body with a fixed position. Unaffected by gravity and collisions, but
 * other objects may collide with it.
 */
var StaticBody = AFRAME.utils.extend({}, Body.definition);

StaticBody.schema = AFRAME.utils.extend({}, Body.definition.schema, {
  type: {default: 'static', oneOf: ['static', 'dynamic']},
  mass: {default: 0}
});

module.exports = AFRAME.registerComponent('static-body', StaticBody);

},{"./body":11}],14:[function(require,module,exports){
var CANNON = require("cannon-es");

module.exports = AFRAME.registerComponent("constraint", {
  multiple: true,

  schema: {
    // Type of constraint.
    type: { default: "lock", oneOf: ["coneTwist", "distance", "hinge", "lock", "pointToPoint"] },

    // Target (other) body for the constraint.
    target: { type: "selector" },

    // Maximum force that should be applied to constraint the bodies.
    maxForce: { default: 1e6, min: 0 },

    // If true, bodies can collide when they are connected.
    collideConnected: { default: true },

    // Wake up bodies when connected.
    wakeUpBodies: { default: true },

    // The distance to be kept between the bodies. If 0, will be set to current distance.
    distance: { default: 0, min: 0 },

    // Offset of the hinge or point-to-point constraint, defined locally in the body.
    pivot: { type: "vec3" },
    targetPivot: { type: "vec3" },

    // An axis that each body can rotate around, defined locally to that body.
    axis: { type: "vec3", default: { x: 0, y: 0, z: 1 } },
    targetAxis: { type: "vec3", default: { x: 0, y: 0, z: 1 } }
  },

  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.constraint = /* {CANNON.Constraint} */ null;
  },

  remove: function() {
    if (!this.constraint) return;

    this.system.removeConstraint(this.constraint);
    this.constraint = null;
  },

  update: function() {
    var el = this.el,
      data = this.data;

    this.remove();

    if (!el.body || !data.target.body) {
      (el.body ? data.target : el).addEventListener("body-loaded", this.update.bind(this, {}));
      return;
    }

    this.constraint = this.createConstraint();
    this.system.addConstraint(this.constraint);
  },

  /**
   * Creates a new constraint, given current component data. The CANNON.js constructors are a bit
   * different for each constraint type. A `.type` property is added to each constraint, because
   * `instanceof` checks are not reliable for some types. These types are needed for serialization.
   * @return {CANNON.Constraint}
   */
  createConstraint: function() {
    var constraint,
      data = this.data,
      pivot = new CANNON.Vec3(data.pivot.x, data.pivot.y, data.pivot.z),
      targetPivot = new CANNON.Vec3(data.targetPivot.x, data.targetPivot.y, data.targetPivot.z),
      axis = new CANNON.Vec3(data.axis.x, data.axis.y, data.axis.z),
      targetAxis = new CANNON.Vec3(data.targetAxis.x, data.targetAxis.y, data.targetAxis.z);

    var constraint;

    switch (data.type) {
      case "lock":
        constraint = new CANNON.LockConstraint(this.el.body, data.target.body, { maxForce: data.maxForce });
        constraint.type = "LockConstraint";
        break;

      case "distance":
        constraint = new CANNON.DistanceConstraint(this.el.body, data.target.body, data.distance, data.maxForce);
        constraint.type = "DistanceConstraint";
        break;

      case "hinge":
        constraint = new CANNON.HingeConstraint(this.el.body, data.target.body, {
          pivotA: pivot,
          pivotB: targetPivot,
          axisA: axis,
          axisB: targetAxis,
          maxForce: data.maxForce
        });
        constraint.type = "HingeConstraint";
        break;

      case "coneTwist":
        constraint = new CANNON.ConeTwistConstraint(this.el.body, data.target.body, {
          pivotA: pivot,
          pivotB: targetPivot,
          axisA: axis,
          axisB: targetAxis,
          maxForce: data.maxForce
        });
        constraint.type = "ConeTwistConstraint";
        break;

      case "pointToPoint":
        constraint = new CANNON.PointToPointConstraint(
          this.el.body,
          pivot,
          data.target.body,
          targetPivot,
          data.maxForce
        );
        constraint.type = "PointToPointConstraint";
        break;

      default:
        throw new Error("[constraint] Unexpected type: " + data.type);
    }

    constraint.collideConnected = data.collideConnected;
    return constraint;
  }
});

},{"cannon-es":5}],15:[function(require,module,exports){
module.exports = {
  'velocity':   require('./velocity'),

  registerAll: function (AFRAME) {
    if (this._registered) return;

    AFRAME = AFRAME || window.AFRAME;

    if (!AFRAME.components['velocity'])    AFRAME.registerComponent('velocity',   this.velocity);

    this._registered = true;
  }
};

},{"./velocity":16}],16:[function(require,module,exports){
/**
 * Velocity, in m/s.
 */
module.exports = AFRAME.registerComponent('velocity', {
  schema: {type: 'vec3'},

  init: function () {
    this.system = this.el.sceneEl.systems.physics;

    if (this.system) {
      this.system.addComponent(this);
    }
  },

  remove: function () {
    if (this.system) {
      this.system.removeComponent(this);
    }
  },

  tick: function (t, dt) {
    if (!dt) return;
    if (this.system) return;
    this.afterStep(t, dt);
  },

  afterStep: function (t, dt) {
    if (!dt) return;

    var physics = this.el.sceneEl.systems.physics || {data: {maxInterval: 1 / 60}},

    // TODO - There's definitely a bug with getComputedAttribute and el.data.
    velocity = this.el.getAttribute('velocity') || {x: 0, y: 0, z: 0},
    position = this.el.object3D.position || {x: 0, y: 0, z: 0};

    dt = Math.min(dt, physics.data.maxInterval * 1000);

    this.el.object3D.position.set(
      position.x + velocity.x * dt / 1000,
      position.y + velocity.y * dt / 1000,
      position.z + velocity.z * dt / 1000
    );
  }
});

},{}],17:[function(require,module,exports){
/* global Ammo,THREE */
const threeToAmmo = require("three-to-ammo");
const CONSTANTS = require("../../constants"),
  SHAPE = CONSTANTS.SHAPE,
  FIT = CONSTANTS.FIT;

var AmmoShape = {
  schema: {
    type: {
      default: SHAPE.HULL,
      oneOf: [
        SHAPE.BOX,
        SHAPE.CYLINDER,
        SHAPE.SPHERE,
        SHAPE.CAPSULE,
        SHAPE.CONE,
        SHAPE.HULL,
        SHAPE.HACD,
        SHAPE.VHACD,
        SHAPE.MESH,
        SHAPE.HEIGHTFIELD
      ]
    },
    fit: { default: FIT.ALL, oneOf: [FIT.ALL, FIT.MANUAL] },
    halfExtents: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
    minHalfExtent: { default: 0 },
    maxHalfExtent: { default: Number.POSITIVE_INFINITY },
    sphereRadius: { default: NaN },
    cylinderAxis: { default: "y", oneOf: ["x", "y", "z"] },
    margin: { default: 0.01 },
    offset: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
    orientation: { type: "vec4", default: { x: 0, y: 0, z: 0, w: 1 } },
    heightfieldData: { default: [] },
    heightfieldDistance: { default: 1 },
    includeInvisible: { default: false }
  },

  multiple: true,

  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.collisionShapes = [];

    let bodyEl = this.el;
    this.body = bodyEl.components["ammo-body"] || null;
    while (!this.body && bodyEl.parentNode != this.el.sceneEl) {
      bodyEl = bodyEl.parentNode;
      if (bodyEl.components["ammo-body"]) {
        this.body = bodyEl.components["ammo-body"];
      }
    }
    if (!this.body) {
      console.warn("body not found");
      return;
    }
    if (this.data.fit !== FIT.MANUAL) {
      if (!this.el.object3DMap.mesh) {
        console.error("Cannot use FIT.ALL without object3DMap.mesh");
        return;
      }
      this.mesh = this.el.object3DMap.mesh;
    }
    this.body.addShapeComponent(this);
  },

  getMesh: function() {
    return this.mesh || null;
  },

  addShapes: function(collisionShapes) {
    this.collisionShapes = collisionShapes;
  },

  getShapes: function() {
    return this.collisionShapes;
  },

  remove: function() {
    if (!this.body) {
      return;
    }

    this.body.removeShapeComponent(this);

    while (this.collisionShapes.length > 0) {
      const collisionShape = this.collisionShapes.pop();
      collisionShape.destroy();
      Ammo.destroy(collisionShape.localTransform);
    }
  }
};

module.exports.definition = AmmoShape;
module.exports.Component = AFRAME.registerComponent("ammo-shape", AmmoShape);

},{"../../constants":20,"three-to-ammo":6}],18:[function(require,module,exports){
var CANNON = require('cannon-es');

var Shape = {
  schema: {
    shape: {default: 'box', oneOf: ['box', 'sphere', 'cylinder']},
    offset: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    orientation: {type: 'vec4', default: {x: 0, y: 0, z: 0, w: 1}},

    // sphere
    radius: {type: 'number', default: 1, if: {shape: ['sphere']}},

    // box
    halfExtents: {type: 'vec3', default: {x: 0.5, y: 0.5, z: 0.5}, if: {shape: ['box']}},
    
    // cylinder
    radiusTop: {type: 'number', default: 1, if: {shape: ['cylinder']}},
    radiusBottom: {type: 'number', default: 1, if: {shape: ['cylinder']}},
    height: {type: 'number', default: 1, if: {shape: ['cylinder']}},
    numSegments: {type: 'int', default: 8, if: {shape: ['cylinder']}}
  },

  multiple: true,

  init: function() {
    if (this.el.sceneEl.hasLoaded) {
      this.initShape();
    } else {
      this.el.sceneEl.addEventListener('loaded', this.initShape.bind(this));
    }
  },

  initShape: function() {
    this.bodyEl = this.el;
    var bodyType = this._findType(this.bodyEl);
    var data = this.data;

    while (!bodyType && this.bodyEl.parentNode != this.el.sceneEl) {
      this.bodyEl = this.bodyEl.parentNode;
      bodyType = this._findType(this.bodyEl);
    }

    if (!bodyType) {
      console.warn('body not found');
      return;
    }

    var scale = new THREE.Vector3();
    this.bodyEl.object3D.getWorldScale(scale);
    var shape, offset, orientation;

    if (data.hasOwnProperty('offset')) {
      offset = new CANNON.Vec3(
        data.offset.x * scale.x, 
        data.offset.y * scale.y, 
        data.offset.z * scale.z
      );
    }

    if (data.hasOwnProperty('orientation')) {
      orientation = new CANNON.Quaternion();
      orientation.copy(data.orientation);
    }

    switch(data.shape) {
      case 'sphere':
        shape = new CANNON.Sphere(data.radius * scale.x);
        break;
      case 'box':
        var halfExtents = new CANNON.Vec3(
          data.halfExtents.x * scale.x, 
          data.halfExtents.y * scale.y, 
          data.halfExtents.z * scale.z
        );
        shape = new CANNON.Box(halfExtents);
        break;
      case 'cylinder':
        shape = new CANNON.Cylinder(
          data.radiusTop * scale.x, 
          data.radiusBottom * scale.x, 
          data.height * scale.y, 
          data.numSegments
        );

        //rotate by 90 degrees similar to mesh2shape:createCylinderShape
        var quat = new CANNON.Quaternion();
        quat.setFromEuler(90 * THREE.MathUtils.DEG2RAD, 0, 0, 'XYZ').normalize();
        orientation.mult(quat, orientation);
        break;
      default:
          console.warn(data.shape + ' shape not supported');
        return;
    }

    if (this.bodyEl.body) {
      this.bodyEl.components[bodyType].addShape(shape, offset, orientation);
    } else {
      this.bodyEl.addEventListener('body-loaded', function() {
        this.bodyEl.components[bodyType].addShape(shape, offset, orientation);
      }, {once: true});
    }
  },

  _findType: function(el) {
    if (el.hasAttribute('body')) {
      return 'body';
    } else if (el.hasAttribute('dynamic-body')) {
      return 'dynamic-body';
    } else if (el.hasAttribute('static-body')) {
      return'static-body';
    }
    return null;
  },

  remove: function() {
    if (this.bodyEl.parentNode) {
      console.warn('removing shape component not currently supported');
    }
  }
};

module.exports.definition = Shape;
module.exports.Component = AFRAME.registerComponent('shape', Shape);

},{"cannon-es":5}],19:[function(require,module,exports){
var CANNON = require('cannon-es');

module.exports = AFRAME.registerComponent('spring', {

  multiple: true,

  schema: {
    // Target (other) body for the constraint.
    target: {type: 'selector'},

    // Length of the spring, when no force acts upon it.
    restLength: {default: 1, min: 0},

    // How much will the spring suppress the force.
    stiffness: {default: 100, min: 0},

    // Stretch factor of the spring.
    damping: {default: 1, min: 0},

    // Offsets.
    localAnchorA: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    localAnchorB: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
  },

  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.system.addComponent(this);
    this.isActive = true;
    this.spring = /* {CANNON.Spring} */ null;
  },

  update: function(oldData) {
    var el = this.el;
    var data = this.data;

    if (!data.target) {
      console.warn('Spring: invalid target specified.');
      return; 
    }
    
    // wait until the CANNON bodies is created and attached
    if (!el.body || !data.target.body) {
      (el.body ? data.target : el).addEventListener('body-loaded', this.update.bind(this, {}));
      return;
    }

    // create the spring if necessary
    this.createSpring();
    // apply new data to the spring
    this.updateSpring(oldData);
  },

  updateSpring: function(oldData) {
    if (!this.spring) {
      console.warn('Spring: Component attempted to change spring before its created. No changes made.');
      return;
    } 
    var data = this.data;
    var spring = this.spring;

    // Cycle through the schema and check if an attribute has changed.
    // if so, apply it to the spring
    Object.keys(data).forEach(function(attr) {
      if (data[attr] !== oldData[attr]) {
        if (attr === 'target') {
          // special case for the target selector
          spring.bodyB = data.target.body;
          return;
        }
        spring[attr] = data[attr];
      }
    })
  },

  createSpring: function() {
    if (this.spring) return; // no need to create a new spring
    this.spring = new CANNON.Spring(this.el.body);
  },

  // If the spring is valid, update the force each tick the physics are calculated
  step: function(t, dt) {
    return this.spring && this.isActive ? this.spring.applyForce() : void 0;
  },

  // resume updating the force when component upon calling play()
  play: function() {
    this.isActive = true;
  },

  // stop updating the force when component upon calling stop()
  pause: function() {
    this.isActive = false;
  },

  //remove the event listener + delete the spring
  remove: function() {
    if (this.spring)
      delete this.spring;
      this.spring = null;
  }
})

},{"cannon-es":5}],20:[function(require,module,exports){
module.exports = {
  GRAVITY: -9.8,
  MAX_INTERVAL: 4 / 60,
  ITERATIONS: 10,
  CONTACT_MATERIAL: {
    friction: 0.01,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
    frictionEquationStiffness: 1e8,
    frictionEquationRegularization: 3
  },
  ACTIVATION_STATE: {
    ACTIVE_TAG: "active",
    ISLAND_SLEEPING: "islandSleeping",
    WANTS_DEACTIVATION: "wantsDeactivation",
    DISABLE_DEACTIVATION: "disableDeactivation",
    DISABLE_SIMULATION: "disableSimulation"
  },
  COLLISION_FLAG: {
    STATIC_OBJECT: 1,
    KINEMATIC_OBJECT: 2,
    NO_CONTACT_RESPONSE: 4,
    CUSTOM_MATERIAL_CALLBACK: 8, //this allows per-triangle material (friction/restitution)
    CHARACTER_OBJECT: 16,
    DISABLE_VISUALIZE_OBJECT: 32, //disable debug drawing
    DISABLE_SPU_COLLISION_PROCESSING: 64 //disable parallel/SPU processing
  },
  TYPE: {
    STATIC: "static",
    DYNAMIC: "dynamic",
    KINEMATIC: "kinematic"
  },
  SHAPE: {
    BOX: "box",
    CYLINDER: "cylinder",
    SPHERE: "sphere",
    CAPSULE: "capsule",
    CONE: "cone",
    HULL: "hull",
    HACD: "hacd",
    VHACD: "vhacd",
    MESH: "mesh",
    HEIGHTFIELD: "heightfield"
  },
  FIT: {
    ALL: "all",
    MANUAL: "manual"
  },
  CONSTRAINT: {
    LOCK: "lock",
    FIXED: "fixed",
    SPRING: "spring",
    SLIDER: "slider",
    HINGE: "hinge",
    CONE_TWIST: "coneTwist",
    POINT_TO_POINT: "pointToPoint"
  }
};

},{}],21:[function(require,module,exports){
/* global THREE */
const Driver = require("./driver");

if (typeof window !== 'undefined') {
  window.AmmoModule = window.Ammo;
  window.Ammo = null;
}

const EPS = 10e-6;

function AmmoDriver() {
  this.collisionConfiguration = null;
  this.dispatcher = null;
  this.broadphase = null;
  this.solver = null;
  this.physicsWorld = null;
  this.debugDrawer = null;

  this.els = new Map();
  this.eventListeners = [];
  this.collisions = new Map();
  this.collisionKeys = [];
  this.currentCollisions = new Map();
}

AmmoDriver.prototype = new Driver();
AmmoDriver.prototype.constructor = AmmoDriver;

module.exports = AmmoDriver;

/* @param {object} worldConfig */
AmmoDriver.prototype.init = function(worldConfig) {
  //Emscripten doesn't use real promises, just a .then() callback, so it necessary to wrap in a real promise.
  return new Promise(resolve => {
    AmmoModule().then(result => {
      Ammo = result;
      this.epsilon = worldConfig.epsilon || EPS;
      this.debugDrawMode = worldConfig.debugDrawMode || THREE.AmmoDebugConstants.NoDebug;
      this.maxSubSteps = worldConfig.maxSubSteps || 4;
      this.fixedTimeStep = worldConfig.fixedTimeStep || 1 / 60;
      this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
      this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
      this.broadphase = new Ammo.btDbvtBroadphase();
      this.solver = new Ammo.btSequentialImpulseConstraintSolver();
      this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        this.dispatcher,
        this.broadphase,
        this.solver,
        this.collisionConfiguration
      );
      this.physicsWorld.setForceUpdateAllAabbs(false);
      this.physicsWorld.setGravity(
        new Ammo.btVector3(0, worldConfig.hasOwnProperty("gravity") ? worldConfig.gravity : -9.8, 0)
      );
      this.physicsWorld.getSolverInfo().set_m_numIterations(worldConfig.solverIterations);
      resolve();
    });
  });
};

/* @param {Ammo.btCollisionObject} body */
AmmoDriver.prototype.addBody = function(body, group, mask) {
  this.physicsWorld.addRigidBody(body, group, mask);
  this.els.set(Ammo.getPointer(body), body.el);
};

/* @param {Ammo.btCollisionObject} body */
AmmoDriver.prototype.removeBody = function(body) {
  this.physicsWorld.removeRigidBody(body);
  this.removeEventListener(body);
  const bodyptr = Ammo.getPointer(body);
  this.els.delete(bodyptr);
  this.collisions.delete(bodyptr);
  this.collisionKeys.splice(this.collisionKeys.indexOf(bodyptr), 1);
  this.currentCollisions.delete(bodyptr);
};

AmmoDriver.prototype.updateBody = function(body) {
  if (this.els.has(Ammo.getPointer(body))) {
    this.physicsWorld.updateSingleAabb(body);
  }
};

/* @param {number} deltaTime */
AmmoDriver.prototype.step = function(deltaTime) {
  this.physicsWorld.stepSimulation(deltaTime, this.maxSubSteps, this.fixedTimeStep);

  const numManifolds = this.dispatcher.getNumManifolds();
  for (let i = 0; i < numManifolds; i++) {
    const persistentManifold = this.dispatcher.getManifoldByIndexInternal(i);
    const numContacts = persistentManifold.getNumContacts();
    const body0ptr = Ammo.getPointer(persistentManifold.getBody0());
    const body1ptr = Ammo.getPointer(persistentManifold.getBody1());
    let collided = false;

    for (let j = 0; j < numContacts; j++) {
      const manifoldPoint = persistentManifold.getContactPoint(j);
      const distance = manifoldPoint.getDistance();
      if (distance <= this.epsilon) {
        collided = true;
        break;
      }
    }

    if (collided) {
      if (!this.collisions.has(body0ptr)) {
        this.collisions.set(body0ptr, []);
        this.collisionKeys.push(body0ptr);
      }
      if (this.collisions.get(body0ptr).indexOf(body1ptr) === -1) {
        this.collisions.get(body0ptr).push(body1ptr);
        if (this.eventListeners.indexOf(body0ptr) !== -1) {
          this.els.get(body0ptr).emit("collidestart", { targetEl: this.els.get(body1ptr) });
        }
        if (this.eventListeners.indexOf(body1ptr) !== -1) {
          this.els.get(body1ptr).emit("collidestart", { targetEl: this.els.get(body0ptr) });
        }
      }
      if (!this.currentCollisions.has(body0ptr)) {
        this.currentCollisions.set(body0ptr, new Set());
      }
      this.currentCollisions.get(body0ptr).add(body1ptr);
    }
  }

  for (let i = 0; i < this.collisionKeys.length; i++) {
    const body0ptr = this.collisionKeys[i];
    const body1ptrs = this.collisions.get(body0ptr);
    for (let j = body1ptrs.length - 1; j >= 0; j--) {
      const body1ptr = body1ptrs[j];
      if (this.currentCollisions.get(body0ptr).has(body1ptr)) {
        continue;
      }
      if (this.eventListeners.indexOf(body0ptr) !== -1) {
        this.els.get(body0ptr).emit("collideend", { targetEl: this.els.get(body1ptr) });
      }
      if (this.eventListeners.indexOf(body1ptr) !== -1) {
        this.els.get(body1ptr).emit("collideend", { targetEl: this.els.get(body0ptr) });
      }
      body1ptrs.splice(j, 1);
    }
    this.currentCollisions.get(body0ptr).clear();
  }

  if (this.debugDrawer) {
    this.debugDrawer.update();
  }
};

/* @param {?} constraint */
AmmoDriver.prototype.addConstraint = function(constraint) {
  this.physicsWorld.addConstraint(constraint, false);
};

/* @param {?} constraint */
AmmoDriver.prototype.removeConstraint = function(constraint) {
  this.physicsWorld.removeConstraint(constraint);
};

/* @param {Ammo.btCollisionObject} body */
AmmoDriver.prototype.addEventListener = function(body) {
  this.eventListeners.push(Ammo.getPointer(body));
};

/* @param {Ammo.btCollisionObject} body */
AmmoDriver.prototype.removeEventListener = function(body) {
  const ptr = Ammo.getPointer(body);
  if (this.eventListeners.indexOf(ptr) !== -1) {
    this.eventListeners.splice(this.eventListeners.indexOf(ptr), 1);
  }
};

AmmoDriver.prototype.destroy = function() {
  Ammo.destroy(this.collisionConfiguration);
  Ammo.destroy(this.dispatcher);
  Ammo.destroy(this.broadphase);
  Ammo.destroy(this.solver);
  Ammo.destroy(this.physicsWorld);
  Ammo.destroy(this.debugDrawer);
};

/**
 * @param {THREE.Scene} scene
 * @param {object} options
 */
AmmoDriver.prototype.getDebugDrawer = function(scene, options) {
  if (!this.debugDrawer) {
    options = options || {};
    options.debugDrawMode = options.debugDrawMode || this.debugDrawMode;
    this.debugDrawer = new THREE.AmmoDebugDrawer(scene, this.physicsWorld, options);
  }
  return this.debugDrawer;
};

},{"./driver":22}],22:[function(require,module,exports){
/**
 * Driver - defines limited API to local and remote physics controllers.
 */

function Driver () {}

module.exports = Driver;

/******************************************************************************
 * Lifecycle
 */

/* @param {object} worldConfig */
Driver.prototype.init = abstractMethod;

/* @param {number} deltaMS */
Driver.prototype.step = abstractMethod;

Driver.prototype.destroy = abstractMethod;

/******************************************************************************
 * Bodies
 */

/* @param {CANNON.Body} body */
Driver.prototype.addBody = abstractMethod;

/* @param {CANNON.Body} body */
Driver.prototype.removeBody = abstractMethod;

/**
 * @param {CANNON.Body} body
 * @param {string} methodName
 * @param {Array} args
 */
Driver.prototype.applyBodyMethod = abstractMethod;

/** @param {CANNON.Body} body */
Driver.prototype.updateBodyProperties = abstractMethod;

/******************************************************************************
 * Materials
 */

/** @param {object} materialConfig */
Driver.prototype.addMaterial = abstractMethod;

/**
 * @param {string} materialName1
 * @param {string} materialName2
 * @param {object} contactMaterialConfig
 */
Driver.prototype.addContactMaterial = abstractMethod;

/******************************************************************************
 * Constraints
 */

/* @param {CANNON.Constraint} constraint */
Driver.prototype.addConstraint = abstractMethod;

/* @param {CANNON.Constraint} constraint */
Driver.prototype.removeConstraint = abstractMethod;

/******************************************************************************
 * Contacts
 */

/** @return {Array<object>} */
Driver.prototype.getContacts = abstractMethod;

/*****************************************************************************/

function abstractMethod () {
  throw new Error('Method not implemented.');
}

},{}],23:[function(require,module,exports){
module.exports = {
  INIT: 'init',
  STEP: 'step',

  // Bodies.
  ADD_BODY: 'add-body',
  REMOVE_BODY: 'remove-body',
  APPLY_BODY_METHOD: 'apply-body-method',
  UPDATE_BODY_PROPERTIES: 'update-body-properties',

  // Materials.
  ADD_MATERIAL: 'add-material',
  ADD_CONTACT_MATERIAL: 'add-contact-material',

  // Constraints.
  ADD_CONSTRAINT: 'add-constraint',
  REMOVE_CONSTRAINT: 'remove-constraint',

  // Events.
  COLLIDE: 'collide'
};

},{}],24:[function(require,module,exports){
var CANNON = require('cannon-es'),
    Driver = require('./driver');

function LocalDriver () {
  this.world = null;
  this.materials = {};
  this.contactMaterial = null;
}

LocalDriver.prototype = new Driver();
LocalDriver.prototype.constructor = LocalDriver;

module.exports = LocalDriver;

/******************************************************************************
 * Lifecycle
 */

/* @param {object} worldConfig */
LocalDriver.prototype.init = function (worldConfig) {
  var world = new CANNON.World();
console.log(world)
  world.quatNormalizeSkip = worldConfig.quatNormalizeSkip;
  world.quatNormalizeFast = worldConfig.quatNormalizeFast;
  world.solver.iterations = worldConfig.solverIterations;
  world.gravity.set(0, worldConfig.gravity, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  this.world = world;
};

/* @param {number} deltaMS */
LocalDriver.prototype.step = function (deltaMS) {
  this.world.step(deltaMS);
};

LocalDriver.prototype.destroy = function () {
  delete this.world;
  delete this.contactMaterial;
  this.materials = {};
};

/******************************************************************************
 * Bodies
 */
//#return
//1nd failue on ammo to cannon swap
/* @param {CANNON.Body} body */
LocalDriver.prototype.addBody = function (body) {
  this.world.addBody(body);
};

/* @param {CANNON.Body} body */
LocalDriver.prototype.removeBody = function (body) {
  this.world.removeBody(body);
};

/**
 * @param {CANNON.Body} body
 * @param {string} methodName
 * @param {Array} args
 */
LocalDriver.prototype.applyBodyMethod = function (body, methodName, args) {
  body['__' + methodName].apply(body, args);
};

/** @param {CANNON.Body} body */
LocalDriver.prototype.updateBodyProperties = function () {};

/******************************************************************************
 * Materials
 */

/**
 * @param {string} name
 * @return {CANNON.Material}
 */
LocalDriver.prototype.getMaterial = function (name) {
  return this.materials[name];
};

/** @param {object} materialConfig */
LocalDriver.prototype.addMaterial = function (materialConfig) {
  this.materials[materialConfig.name] = new CANNON.Material(materialConfig);
  this.materials[materialConfig.name].name = materialConfig.name;
};

/**
 * @param {string} matName1
 * @param {string} matName2
 * @param {object} contactMaterialConfig
 */
LocalDriver.prototype.addContactMaterial = function (matName1, matName2, contactMaterialConfig) {
  var mat1 = this.materials[matName1],
      mat2 = this.materials[matName2];
  this.contactMaterial = new CANNON.ContactMaterial(mat1, mat2, contactMaterialConfig);
  this.world.addContactMaterial(this.contactMaterial);
};

/******************************************************************************
 * Constraints
 */

/* @param {CANNON.Constraint} constraint */
LocalDriver.prototype.addConstraint = function (constraint) {
  if (!constraint.type) {
    if (constraint instanceof CANNON.LockConstraint) {
      constraint.type = 'LockConstraint';
    } else if (constraint instanceof CANNON.DistanceConstraint) {
      constraint.type = 'DistanceConstraint';
    } else if (constraint instanceof CANNON.HingeConstraint) {
      constraint.type = 'HingeConstraint';
    } else if (constraint instanceof CANNON.ConeTwistConstraint) {
      constraint.type = 'ConeTwistConstraint';
    } else if (constraint instanceof CANNON.PointToPointConstraint) {
      constraint.type = 'PointToPointConstraint';
    }
  }
  this.world.addConstraint(constraint);
};

/* @param {CANNON.Constraint} constraint */
LocalDriver.prototype.removeConstraint = function (constraint) {
  this.world.removeConstraint(constraint);
};

/******************************************************************************
 * Contacts
 */

/** @return {Array<object>} */
LocalDriver.prototype.getContacts = function () {
  return this.world.contacts;
};

},{"./driver":22,"cannon-es":5}],25:[function(require,module,exports){
var Driver = require('./driver');

function NetworkDriver () {
  throw new Error('[NetworkDriver] Driver not implemented.');
}

NetworkDriver.prototype = new Driver();
NetworkDriver.prototype.constructor = NetworkDriver;

module.exports = NetworkDriver;

},{"./driver":22}],26:[function(require,module,exports){
/**
 * Stub version of webworkify, for debugging code outside of a webworker.
 */
function webworkifyDebug (worker) {
  var targetA = new EventTarget(),
      targetB = new EventTarget();

  targetA.setTarget(targetB);
  targetB.setTarget(targetA);

  worker(targetA);
  return targetB;
}

module.exports = webworkifyDebug;

/******************************************************************************
 * EventTarget
 */

function EventTarget () {
  this.listeners = [];
}

EventTarget.prototype.setTarget = function (target) {
  this.target = target;
};

EventTarget.prototype.addEventListener = function (type, fn) {
  this.listeners.push(fn);
};

EventTarget.prototype.dispatchEvent = function (type, event) {
  for (var i = 0; i < this.listeners.length; i++) {
    this.listeners[i](event);
  }
};

EventTarget.prototype.postMessage = function (msg) {
  this.target.dispatchEvent('message', {data: msg});
};

},{}],27:[function(require,module,exports){
/* global performance */

var webworkify = require('webworkify'),
    webworkifyDebug = require('./webworkify-debug'),
    Driver = require('./driver'),
    Event = require('./event'),
    worker = require('./worker'),
    protocol = require('../utils/protocol');

var ID = protocol.ID;

/******************************************************************************
 * Constructor
 */

function WorkerDriver (options) {
  this.fps = options.fps;
  this.engine = options.engine;
  this.interpolate = options.interpolate;
  // Approximate number of physics steps to 'pad' rendering.
  this.interpBufferSize = options.interpolationBufferSize;
  this.debug = options.debug;

  this.bodies = {};
  this.contacts = [];

  // https://gafferongames.com/post/snapshot_interpolation/
  this.frameDelay = this.interpBufferSize * 1000 / this.fps;
  this.frameBuffer = [];

  this.worker = this.debug
    ? webworkifyDebug(worker)
    : webworkify(worker);
  this.worker.addEventListener('message', this._onMessage.bind(this));
}

WorkerDriver.prototype = new Driver();
WorkerDriver.prototype.constructor = WorkerDriver;

module.exports = WorkerDriver;

/******************************************************************************
 * Lifecycle
 */

/* @param {object} worldConfig */
WorkerDriver.prototype.init = function (worldConfig) {
  this.worker.postMessage({
    type: Event.INIT,
    worldConfig: worldConfig,
    fps: this.fps,
    engine: this.engine
  });
};

/**
 * Increments the physics world forward one step, if interpolation is enabled.
 * If disabled, increments are performed as messages arrive.
 * @param {number} deltaMS
 */
WorkerDriver.prototype.step = function () {
  if (!this.interpolate) return;

  // Get the two oldest frames that haven't expired. Ideally we would use all
  // available frames to keep things smooth, but lerping is easier and faster.
  var prevFrame = this.frameBuffer[0];
  var nextFrame = this.frameBuffer[1];
  var timestamp = performance.now();
  while (prevFrame && nextFrame && timestamp - prevFrame.timestamp > this.frameDelay) {
    this.frameBuffer.shift();
    prevFrame = this.frameBuffer[0];
    nextFrame = this.frameBuffer[1];
  }

  if (!prevFrame || !nextFrame) return;

  var mix = (timestamp - prevFrame.timestamp) / this.frameDelay;
  mix = (mix - (1 - 1 / this.interpBufferSize)) * this.interpBufferSize;

  for (var id in prevFrame.bodies) {
    if (prevFrame.bodies.hasOwnProperty(id) && nextFrame.bodies.hasOwnProperty(id)) {
      protocol.deserializeInterpBodyUpdate(
        prevFrame.bodies[id],
        nextFrame.bodies[id],
        this.bodies[id],
        mix
      );
    }
  }
};

WorkerDriver.prototype.destroy = function () {
  this.worker.terminate();
  delete this.worker;
};

/** {Event} event */
WorkerDriver.prototype._onMessage = function (event) {
  if (event.data.type === Event.STEP) {
    var data = event.data,
        bodies = data.bodies;

    this.contacts = event.data.contacts;

    // If interpolation is enabled, store the frame. If not, update all bodies
    // immediately.
    if (this.interpolate) {
      this.frameBuffer.push({timestamp: performance.now(), bodies: bodies});
    } else {
      for (var id in bodies) {
        if (bodies.hasOwnProperty(id)) {
          protocol.deserializeBodyUpdate(bodies[id], this.bodies[id]);
        }
      }
    }

  } else if (event.data.type === Event.COLLIDE) {
    var body = this.bodies[event.data.bodyID];
    var target = this.bodies[event.data.targetID];
    var contact = protocol.deserializeContact(event.data.contact, this.bodies);
    if (!body._listeners || !body._listeners.collide) return;
    for (var i = 0; i < body._listeners.collide.length; i++) {
      body._listeners.collide[i]({target: target, body: body, contact: contact});
    }

  } else {
    throw new Error('[WorkerDriver] Unexpected message type.');
  }
};

/******************************************************************************
 * Bodies
 */

/* @param {CANNON.Body} body */
WorkerDriver.prototype.addBody = function (body) {
  protocol.assignID('body', body);
  this.bodies[body[ID]] = body;
  this.worker.postMessage({type: Event.ADD_BODY, body: protocol.serializeBody(body)});
};

/* @param {CANNON.Body} body */
WorkerDriver.prototype.removeBody = function (body) {
  this.worker.postMessage({type: Event.REMOVE_BODY, bodyID: body[ID]});
  delete this.bodies[body[ID]];
};

/**
 * @param {CANNON.Body} body
 * @param {string} methodName
 * @param {Array} args
 */
WorkerDriver.prototype.applyBodyMethod = function (body, methodName, args) {
  switch (methodName) {
    case 'applyForce':
    case 'applyImpulse':
      this.worker.postMessage({
        type: Event.APPLY_BODY_METHOD,
        bodyID: body[ID],
        methodName: methodName,
        args: [args[0].toArray(), args[1].toArray()]
      });
      break;
    default:
      throw new Error('Unexpected methodName: %s', methodName);
  }
};

/** @param {CANNON.Body} body */
WorkerDriver.prototype.updateBodyProperties = function (body) {
  this.worker.postMessage({
    type: Event.UPDATE_BODY_PROPERTIES,
    body: protocol.serializeBody(body)
  });
};

/******************************************************************************
 * Materials
 */

/**
 * @param  {string} name
 * @return {CANNON.Material}
 */
WorkerDriver.prototype.getMaterial = function (name) {
  // No access to materials here. Eventually we might return the name or ID, if
  // multiple materials were selected, but for now there's only one and it's safe
  // to assume the worker is already using it.
  return undefined;
};

/** @param {object} materialConfig */
WorkerDriver.prototype.addMaterial = function (materialConfig) {
  this.worker.postMessage({type: Event.ADD_MATERIAL, materialConfig: materialConfig});
};

/**
 * @param {string} matName1
 * @param {string} matName2
 * @param {object} contactMaterialConfig
 */
WorkerDriver.prototype.addContactMaterial = function (matName1, matName2, contactMaterialConfig) {
  this.worker.postMessage({
    type: Event.ADD_CONTACT_MATERIAL,
    materialName1: matName1,
    materialName2: matName2,
    contactMaterialConfig: contactMaterialConfig
  });
};

/******************************************************************************
 * Constraints
 */

/* @param {CANNON.Constraint} constraint */
WorkerDriver.prototype.addConstraint = function (constraint) {
  if (!constraint.type) {
    if (constraint instanceof CANNON.LockConstraint) {
      constraint.type = 'LockConstraint';
    } else if (constraint instanceof CANNON.DistanceConstraint) {
      constraint.type = 'DistanceConstraint';
    } else if (constraint instanceof CANNON.HingeConstraint) {
      constraint.type = 'HingeConstraint';
    } else if (constraint instanceof CANNON.ConeTwistConstraint) {
      constraint.type = 'ConeTwistConstraint';
    } else if (constraint instanceof CANNON.PointToPointConstraint) {
      constraint.type = 'PointToPointConstraint';
    }
  }
  protocol.assignID('constraint', constraint);
  this.worker.postMessage({
    type: Event.ADD_CONSTRAINT,
    constraint: protocol.serializeConstraint(constraint)
  });
};

/* @param {CANNON.Constraint} constraint */
WorkerDriver.prototype.removeConstraint = function (constraint) {
  this.worker.postMessage({
    type: Event.REMOVE_CONSTRAINT,
    constraintID: constraint[ID]
  });
};

/******************************************************************************
 * Contacts
 */

/** @return {Array<object>} */
WorkerDriver.prototype.getContacts = function () {
  // TODO(donmccurdy): There's some wasted memory allocation here.
  var bodies = this.bodies;
  return this.contacts.map(function (message) {
    return protocol.deserializeContact(message, bodies);
  });
};

},{"../utils/protocol":31,"./driver":22,"./event":23,"./webworkify-debug":26,"./worker":28,"webworkify":8}],28:[function(require,module,exports){
var Event = require('./event'),
    LocalDriver = require('./local-driver'),
    AmmoDriver = require('./ammo-driver'),
    protocol = require('../utils/protocol');

var ID = protocol.ID;

module.exports = function (self) {
  var driver = null;
  var bodies = {};
  var constraints = {};
  var stepSize;

  self.addEventListener('message', function (event) {
    var data = event.data;

    switch (data.type) {
      // Lifecycle.
      case Event.INIT:
        driver = data.engine === 'cannon'
          ? new LocalDriver()
          : new AmmoDriver();
        driver.init(data.worldConfig);
        stepSize = 1 / data.fps;
        setInterval(step, 1000 / data.fps);
        break;

      // Bodies.
      case Event.ADD_BODY:
        var body = protocol.deserializeBody(data.body);
        body.material = driver.getMaterial( 'defaultMaterial' );
        bodies[body[ID]] = body;

        body.addEventListener('collide', function (evt) {
          var message = {
            type: Event.COLLIDE,
            bodyID: evt.target[ID], // set the target as the body to be identical to the local driver
            targetID: evt.body[ID], // set the body as the target to be identical to the local driver
            contact: protocol.serializeContact(evt.contact)
          }
          self.postMessage(message);
        });
        driver.addBody(body);
        break;
      case Event.REMOVE_BODY:
        driver.removeBody(bodies[data.bodyID]);
        delete bodies[data.bodyID];
        break;
      case Event.APPLY_BODY_METHOD:
        bodies[data.bodyID][data.methodName](
          protocol.deserializeVec3(data.args[0]),
          protocol.deserializeVec3(data.args[1])
        );
        break;
      case Event.UPDATE_BODY_PROPERTIES:
        protocol.deserializeBodyUpdate(data.body, bodies[data.body.id]);
        break;

      // Materials.
      case Event.ADD_MATERIAL:
        driver.addMaterial(data.materialConfig);
        break;
      case Event.ADD_CONTACT_MATERIAL:
        driver.addContactMaterial(
          data.materialName1,
          data.materialName2,
          data.contactMaterialConfig
        );
        break;

      // Constraints.
      case Event.ADD_CONSTRAINT:
        var constraint = protocol.deserializeConstraint(data.constraint, bodies);
        constraints[constraint[ID]] = constraint;
        driver.addConstraint(constraint);
        break;
      case Event.REMOVE_CONSTRAINT:
        driver.removeConstraint(constraints[data.constraintID]);
        delete constraints[data.constraintID];
        break;

      default:
        throw new Error('[Worker] Unexpected event type: %s', data.type);

    }
  });

  function step () {
    driver.step(stepSize);

    var bodyMessages = {};
    Object.keys(bodies).forEach(function (id) {
      bodyMessages[id] = protocol.serializeBody(bodies[id]);
    });

    self.postMessage({
      type: Event.STEP,
      bodies: bodyMessages,
      contacts: driver.getContacts().map(protocol.serializeContact)
    });
  }
};

},{"../utils/protocol":31,"./ammo-driver":21,"./event":23,"./local-driver":24}],29:[function(require,module,exports){
/* global THREE */
var CANNON = require('cannon-es'),
    CONSTANTS = require('./constants'),
    C_GRAV = CONSTANTS.GRAVITY,
    C_MAT = CONSTANTS.CONTACT_MATERIAL;

const { TYPE } = require('./constants');
var LocalDriver = require('./drivers/local-driver'),
    WorkerDriver = require('./drivers/worker-driver'),
    NetworkDriver = require('./drivers/network-driver'),
    AmmoDriver = require('./drivers/ammo-driver');
require('aframe-stats-panel')

/**
 * Physics system.
 */
module.exports = AFRAME.registerSystem('physics', {
  schema: {
    // CANNON.js driver type
    driver:                         { default: 'local', oneOf: ['local', 'worker', 'network', 'ammo'] },
    networkUrl:                     { default: '', if: {driver: 'network'} },
    workerFps:                      { default: 60, if: {driver: 'worker'} },
    workerInterpolate:              { default: true, if: {driver: 'worker'} },
    workerInterpBufferSize:         { default: 2, if: {driver: 'worker'} },
    workerEngine:                   { default: 'cannon', if: {driver: 'worker'}, oneOf: ['cannon'] },
    workerDebug:                    { default: false, if: {driver: 'worker'} },

    gravity:                        { default: C_GRAV },
    iterations:                     { default: CONSTANTS.ITERATIONS },
    friction:                       { default: C_MAT.friction },
    restitution:                    { default: C_MAT.restitution },
    contactEquationStiffness:       { default: C_MAT.contactEquationStiffness },
    contactEquationRelaxation:      { default: C_MAT.contactEquationRelaxation },
    frictionEquationStiffness:      { default: C_MAT.frictionEquationStiffness },
    frictionEquationRegularization: { default: C_MAT.frictionEquationRegularization },

    // Never step more than four frames at once. Effectively pauses the scene
    // when out of focus, and prevents weird "jumps" when focus returns.
    maxInterval:                    { default: 4 / 60 },

    // If true, show wireframes around physics bodies.
    debug:                          { default: false },

    // If using ammo, set the default rendering mode for debug
    debugDrawMode: { default: THREE.AmmoDebugConstants.NoDebug },
    // If using ammo, set the max number of steps per frame 
    maxSubSteps: { default: 4 },
    // If using ammo, set the framerate of the simulation
    fixedTimeStep: { default: 1 / 60 },
    // Whether to output stats, and how to output them.  One or more of "console", "events", "panel"
    stats: {type: 'array', default: []}
  },

  /**
   * Initializes the physics system.
   */
  async init() {
console.log({msg: 'Adding Physics', self: this, data: this.data})
    var data = this.data;

    // If true, show wireframes around physics bodies.
    this.debug = data.debug;
    this.initStats();

    this.callbacks = {beforeStep: [], step: [], afterStep: []};

    this.listeners = {};
    

    this.driver = null;
    switch (data.driver) {
      case 'local':
        this.driver = new LocalDriver();
        break;

      case 'ammo':
        this.driver = new AmmoDriver();
        break;

      case 'network':
        this.driver = new NetworkDriver(data.networkUrl);
        break;

      case 'worker':
        this.driver = new WorkerDriver({
          fps: data.workerFps,
          engine: data.workerEngine,
          interpolate: data.workerInterpolate,
          interpolationBufferSize: data.workerInterpBufferSize,
          debug: data.workerDebug
        });
        break;

      default:
        throw new Error('[physics] Driver not recognized: "%s".', data.driver);
    }

    if (data.driver !== 'ammo') {
      await this.driver.init({
        quatNormalizeSkip: 0,
        quatNormalizeFast: false,
        solverIterations: data.iterations,
        gravity: data.gravity,
      });
      this.driver.addMaterial({name: 'defaultMaterial'});
      this.driver.addMaterial({name: 'staticMaterial'});
      this.driver.addContactMaterial('defaultMaterial', 'defaultMaterial', {
        friction: data.friction,
        restitution: data.restitution,
        contactEquationStiffness: data.contactEquationStiffness,
        contactEquationRelaxation: data.contactEquationRelaxation,
        frictionEquationStiffness: data.frictionEquationStiffness,
        frictionEquationRegularization: data.frictionEquationRegularization
      });
      this.driver.addContactMaterial('staticMaterial', 'defaultMaterial', {
        friction: 1.0,
        restitution: 0.0,
        contactEquationStiffness: data.contactEquationStiffness,
        contactEquationRelaxation: data.contactEquationRelaxation,
        frictionEquationStiffness: data.frictionEquationStiffness,
        frictionEquationRegularization: data.frictionEquationRegularization
      });
    } else {
      await this.driver.init({
      gravity: data.gravity,
      debugDrawMode: data.debugDrawMode,
      solverIterations: data.iterations,
      maxSubSteps: data.maxSubSteps,
      fixedTimeStep: data.fixedTimeStep
    });
    }

    this.initialized = true;

    if (this.debug) {
      this.setDebug(true);
    }
  },

  initStats() {
    // Data used for performance monitoring.
    this.statsToConsole = this.data.stats.includes("console")
    this.statsToEvents = this.data.stats.includes("events")
    this.statsToPanel = this.data.stats.includes("panel")

    if (this.statsToConsole || this.statsToEvents || this.statsToPanel) {
      this.trackPerf = true;
      this.tickCounter = 0;
      
      this.statsTickData = {};
      this.statsBodyData = {};

      this.countBodies = {
        "ammo": () => this.countBodiesAmmo(),
        "local": () => this.countBodiesCannon(false),
        "worker": () => this.countBodiesCannon(true)
      }

      this.bodyTypeToStatsPropertyMap = {
        "ammo": {
          [TYPE.STATIC] : "staticBodies",
          [TYPE.KINEMATIC] : "kinematicBodies",
          [TYPE.DYNAMIC] : "dynamicBodies",
        }, 
        "cannon": {
          [CANNON.Body.STATIC] : "staticBodies",
          [CANNON.Body.DYNAMIC] : "dynamicBodies"
        }
      }
      
      const scene = this.el.sceneEl;
      scene.setAttribute("stats-collector", `inEvent: physics-tick-data;
                                             properties: before, after, engine, total;
                                             outputFrequency: 100;
                                             outEvent: physics-tick-summary;
                                             outputs: percentile__50, percentile__90, max`);
    }

    if (this.statsToPanel) {
      const scene = this.el.sceneEl;
      const space = "&nbsp&nbsp&nbsp"
    
      scene.setAttribute("stats-panel", "")
      scene.setAttribute("stats-group__bodies", `label: Physics Bodies`)
      scene.setAttribute("stats-row__b1", `group: bodies;
                                           event:physics-body-data;
                                           properties: staticBodies;
                                           label: Static`)
      scene.setAttribute("stats-row__b2", `group: bodies;
                                           event:physics-body-data;
                                           properties: dynamicBodies;
                                           label: Dynamic`)
      if (this.data.driver === 'local' || this.data.driver === 'worker') {
        scene.setAttribute("stats-row__b3", `group: bodies;
                                             event:physics-body-data;
                                             properties: contacts;
                                             label: Contacts`)
      }
      else if (this.data.driver === 'ammo') {
        scene.setAttribute("stats-row__b3", `group: bodies;
                                             event:physics-body-data;
                                             properties: kinematicBodies;
                                             label: Kinematic`)
        scene.setAttribute("stats-row__b4", `group: bodies;
                                             event: physics-body-data;
                                             properties: manifolds;
                                             label: Manifolds`)
        scene.setAttribute("stats-row__b5", `group: bodies;
                                             event: physics-body-data;
                                             properties: manifoldContacts;
                                             label: Contacts`)
        scene.setAttribute("stats-row__b6", `group: bodies;
                                             event: physics-body-data;
                                             properties: collisions;
                                             label: Collisions`)
        scene.setAttribute("stats-row__b7", `group: bodies;
                                             event: physics-body-data;
                                             properties: collisionKeys;
                                             label: Coll Keys`)
      }

      scene.setAttribute("stats-group__tick", `label: Physics Ticks: Median${space}90th%${space}99th%`)
      scene.setAttribute("stats-row__1", `group: tick;
                                          event:physics-tick-summary;
                                          properties: before.percentile__50, 
                                                      before.percentile__90, 
                                                      before.max;
                                          label: Before`)
      scene.setAttribute("stats-row__2", `group: tick;
                                          event:physics-tick-summary;
                                          properties: after.percentile__50, 
                                                      after.percentile__90, 
                                                      after.max; 
                                          label: After`)
      scene.setAttribute("stats-row__3", `group: tick; 
                                          event:physics-tick-summary; 
                                          properties: engine.percentile__50, 
                                                      engine.percentile__90, 
                                                      engine.max;
                                          label: Engine`)
      scene.setAttribute("stats-row__4", `group: tick;
                                          event:physics-tick-summary;
                                          properties: total.percentile__50, 
                                                      total.percentile__90, 
                                                      total.max;
                                          label: Total`)
    }
  },

  /**
   * Updates the physics world on each tick of the A-Frame scene. It would be
   * entirely possible to separate the two – updating physics more or less
   * frequently than the scene – if greater precision or performance were
   * necessary.
   * @param  {number} t
   * @param  {number} dt
   */
  tick: function (t, dt) {
    if (!this.initialized || !dt) return;

    const beforeStartTime = performance.now();

    var i;
    var callbacks = this.callbacks;

    for (i = 0; i < this.callbacks.beforeStep.length; i++) {
      this.callbacks.beforeStep[i].beforeStep(t, dt);
    }

    const engineStartTime = performance.now();

    this.driver.step(Math.min(dt / 1000, this.data.maxInterval));

    const engineEndTime = performance.now();

    for (i = 0; i < callbacks.step.length; i++) {
      callbacks.step[i].step(t, dt);
    }

    for (i = 0; i < callbacks.afterStep.length; i++) {
      callbacks.afterStep[i].afterStep(t, dt);
    }

    if (this.trackPerf) {
      const afterEndTime = performance.now();

      this.statsTickData.before = engineStartTime - beforeStartTime
      this.statsTickData.engine = engineEndTime - engineStartTime
      this.statsTickData.after = afterEndTime - engineEndTime
      this.statsTickData.total = afterEndTime - beforeStartTime

      this.el.emit("physics-tick-data", this.statsTickData)

      this.tickCounter++;

      if (this.tickCounter === 100) {

        this.countBodies[this.data.driver]()

        if (this.statsToConsole) {
          console.log("Physics body stats:", this.statsBodyData)
        }

        if (this.statsToEvents  || this.statsToPanel) {
          this.el.emit("physics-body-data", this.statsBodyData)
        }
        this.tickCounter = 0;
      }
    }
  },

  countBodiesAmmo() {

    const statsData = this.statsBodyData
    statsData.manifolds = this.driver.dispatcher.getNumManifolds();
    statsData.manifoldContacts = 0;
    for (let i = 0; i < statsData.manifolds; i++) {
      const manifold = this.driver.dispatcher.getManifoldByIndexInternal(i);
      statsData.manifoldContacts += manifold.getNumContacts();
    }
    statsData.collisions = this.driver.collisions.size;
    statsData.collisionKeys = this.driver.collisionKeys.length;
    statsData.staticBodies = 0
    statsData.kinematicBodies = 0
    statsData.dynamicBodies = 0
    
    function type(el) {
      return el.components['ammo-body'].data.type
    }

    this.driver.els.forEach((el) => {
      const property = this.bodyTypeToStatsPropertyMap["ammo"][type(el)]
      statsData[property]++
    })
  },

  countBodiesCannon(worker) {

    const statsData = this.statsBodyData
    statsData.contacts = worker ? this.driver.contacts.length : this.driver.world.contacts.length;
    statsData.staticBodies = 0
    statsData.dynamicBodies = 0

    const bodies = worker ? Object.values(this.driver.bodies)  : this.driver.world.bodies

    bodies.forEach((body) => {
      const property = this.bodyTypeToStatsPropertyMap["cannon"][body.type]
      statsData[property]++
    })
  },

  setDebug: function(debug) {
    this.debug = debug;
    if (this.data.driver === 'ammo' && this.initialized) {
      if (debug && !this.debugDrawer) {
        this.debugDrawer = this.driver.getDebugDrawer(this.el.object3D);
        this.debugDrawer.enable();
      } else if (this.debugDrawer) {
        this.debugDrawer.disable();
        this.debugDrawer = null;
      }
    }
  },

  /**
   * Adds a body to the scene, and binds proxied methods to the driver.
   * @param {CANNON.Body} body
   */
  addBody: function (body, group, mask) {
    var driver = this.driver;

    if (this.data.driver === 'local') {
      body.__applyImpulse = body.applyImpulse;
      body.applyImpulse = function () {
        driver.applyBodyMethod(body, 'applyImpulse', arguments);
      };

      body.__applyForce = body.applyForce;
      body.applyForce = function () {
        driver.applyBodyMethod(body, 'applyForce', arguments);
      };

      body.updateProperties = function () {
        driver.updateBodyProperties(body);
      };

      this.listeners[body.id] = function (e) { body.el.emit('collide', e); };
      body.addEventListener('collide', this.listeners[body.id]);
    }

    this.driver.addBody(body, group, mask);
  },

  /**
   * Removes a body and its proxied methods.
   * @param {CANNON.Body} body
   */
  removeBody: function (body) {
    this.driver.removeBody(body);

    if (this.data.driver === 'local' || this.data.driver === 'worker') {
      body.removeEventListener('collide', this.listeners[body.id]);
      delete this.listeners[body.id];

      body.applyImpulse = body.__applyImpulse;
      delete body.__applyImpulse;

      body.applyForce = body.__applyForce;
      delete body.__applyForce;

      delete body.updateProperties;
    }
  },

  /** @param {CANNON.Constraint or Ammo.btTypedConstraint} constraint */
  addConstraint: function (constraint) {
    this.driver.addConstraint(constraint);
  },

  /** @param {CANNON.Constraint or Ammo.btTypedConstraint} constraint */
  removeConstraint: function (constraint) {
    this.driver.removeConstraint(constraint);
  },

  /**
   * Adds a component instance to the system and schedules its update methods to be called
   * the given phase.
   * @param {Component} component
   * @param {string} phase
   */
  addComponent: function (component) {
    var callbacks = this.callbacks;
    if (component.beforeStep) callbacks.beforeStep.push(component);
    if (component.step)       callbacks.step.push(component);
    if (component.afterStep)  callbacks.afterStep.push(component);
  },

  /**
   * Removes a component instance from the system.
   * @param {Component} component
   * @param {string} phase
   */
  removeComponent: function (component) {
    var callbacks = this.callbacks;
    if (component.beforeStep) {
      callbacks.beforeStep.splice(callbacks.beforeStep.indexOf(component), 1);
    }
    if (component.step) {
      callbacks.step.splice(callbacks.step.indexOf(component), 1);
    }
    if (component.afterStep) {
      callbacks.afterStep.splice(callbacks.afterStep.indexOf(component), 1);
    }
  },

  /** @return {Array<object>} */
  getContacts: function () {
    return this.driver.getContacts();
  },

getMaterial: function (name) {
	//Workaround 1st failure
	if(!this.driver.getMaterial){
console.log({msg: 'error when switching from ammo to cannon, manually rebuild driver', self: this, driver: this.driver, world: this.world, data: this.data.driver})
		this.driver = null;
		//this.driver = new AmmoDriver();
        this.driver = new LocalDriver();
//init()
console.log({msg: 'New Driver, now checking material', newDriver: this.driver, world: this.world, data: this.data.driver})
console.log({msg: 'Checking material', material: this.driver.getMaterial, world: this.world, data: this.data.driver})
	}
	//#return
	//1st failue on ammo to cannon swap
	return this.driver.getMaterial(name);
}
});

},{"./constants":20,"./drivers/ammo-driver":21,"./drivers/local-driver":24,"./drivers/network-driver":25,"./drivers/worker-driver":27,"aframe-stats-panel":3,"cannon-es":5}],30:[function(require,module,exports){
module.exports.slerp = function ( a, b, t ) {
  if ( t <= 0 ) return a;
  if ( t >= 1 ) return b;

  var x = a[0], y = a[1], z = a[2], w = a[3];

  // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

  var cosHalfTheta = w * b[3] + x * b[0] + y * b[1] + z * b[2];

  if ( cosHalfTheta < 0 ) {

    a = a.slice();

    a[3] = - b[3];
    a[0] = - b[0];
    a[1] = - b[1];
    a[2] = - b[2];

    cosHalfTheta = - cosHalfTheta;

  } else {

    return b;

  }

  if ( cosHalfTheta >= 1.0 ) {

    a[3] = w;
    a[0] = x;
    a[1] = y;
    a[2] = z;

    return this;

  }

  var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

  if ( Math.abs( sinHalfTheta ) < 0.001 ) {

    a[3] = 0.5 * ( w + a[3] );
    a[0] = 0.5 * ( x + a[0] );
    a[1] = 0.5 * ( y + a[1] );
    a[2] = 0.5 * ( z + a[2] );

    return this;

  }

  var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
  var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta;
  var ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

  a[3] = ( w * ratioA + a[3] * ratioB );
  a[0] = ( x * ratioA + a[0] * ratioB );
  a[1] = ( y * ratioA + a[1] * ratioB );
  a[2] = ( z * ratioA + a[2] * ratioB );

  return a;

};

},{}],31:[function(require,module,exports){
var CANNON = require('cannon-es');
var mathUtils = require('./math');

/******************************************************************************
 * IDs
 */

var ID = '__id';
module.exports.ID = ID;

var nextID = {};
module.exports.assignID = function (prefix, object) {
  if (object[ID]) return;
  nextID[prefix] = nextID[prefix] || 1;
  object[ID] = prefix + '_' + nextID[prefix]++;
};

/******************************************************************************
 * Bodies
 */

module.exports.serializeBody = function (body) {
  var message = {
    // Shapes.
    shapes: body.shapes.map(serializeShape),
    shapeOffsets: body.shapeOffsets.map(serializeVec3),
    shapeOrientations: body.shapeOrientations.map(serializeQuaternion),

    // Vectors.
    position: serializeVec3(body.position),
    quaternion: body.quaternion.toArray(),
    velocity: serializeVec3(body.velocity),
    angularVelocity: serializeVec3(body.angularVelocity),

    // Properties.
    id: body[ID],
    mass: body.mass,
    linearDamping: body.linearDamping,
    angularDamping: body.angularDamping,
    fixedRotation: body.fixedRotation,
    allowSleep: body.allowSleep,
    sleepSpeedLimit: body.sleepSpeedLimit,
    sleepTimeLimit: body.sleepTimeLimit
  };

  return message;
};

module.exports.deserializeBodyUpdate = function (message, body) {
  body.position.set(message.position[0], message.position[1], message.position[2]);
  body.quaternion.set(message.quaternion[0], message.quaternion[1], message.quaternion[2], message.quaternion[3]);
  body.velocity.set(message.velocity[0], message.velocity[1], message.velocity[2]);
  body.angularVelocity.set(message.angularVelocity[0], message.angularVelocity[1], message.angularVelocity[2]);

  body.linearDamping = message.linearDamping;
  body.angularDamping = message.angularDamping;
  body.fixedRotation = message.fixedRotation;
  body.allowSleep = message.allowSleep;
  body.sleepSpeedLimit = message.sleepSpeedLimit;
  body.sleepTimeLimit = message.sleepTimeLimit;

  if (body.mass !== message.mass) {
    body.mass = message.mass;
    body.updateMassProperties();
  }

  return body;
};

module.exports.deserializeInterpBodyUpdate = function (message1, message2, body, mix) {
  var weight1 = 1 - mix;
  var weight2 = mix;

  body.position.set(
    message1.position[0] * weight1 + message2.position[0] * weight2,
    message1.position[1] * weight1 + message2.position[1] * weight2,
    message1.position[2] * weight1 + message2.position[2] * weight2
  );
  var quaternion = mathUtils.slerp(message1.quaternion, message2.quaternion, mix);
  body.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
  body.velocity.set(
    message1.velocity[0] * weight1 + message2.velocity[0] * weight2,
    message1.velocity[1] * weight1 + message2.velocity[1] * weight2,
    message1.velocity[2] * weight1 + message2.velocity[2] * weight2
  );
  body.angularVelocity.set(
    message1.angularVelocity[0] * weight1 + message2.angularVelocity[0] * weight2,
    message1.angularVelocity[1] * weight1 + message2.angularVelocity[1] * weight2,
    message1.angularVelocity[2] * weight1 + message2.angularVelocity[2] * weight2
  );

  body.linearDamping = message2.linearDamping;
  body.angularDamping = message2.angularDamping;
  body.fixedRotation = message2.fixedRotation;
  body.allowSleep = message2.allowSleep;
  body.sleepSpeedLimit = message2.sleepSpeedLimit;
  body.sleepTimeLimit = message2.sleepTimeLimit;

  if (body.mass !== message2.mass) {
    body.mass = message2.mass;
    body.updateMassProperties();
  }

  return body;
};

module.exports.deserializeBody = function (message) {
  var body = new CANNON.Body({
    mass: message.mass,

    position: deserializeVec3(message.position),
    quaternion: deserializeQuaternion(message.quaternion),
    velocity: deserializeVec3(message.velocity),
    angularVelocity: deserializeVec3(message.angularVelocity),

    linearDamping: message.linearDamping,
    angularDamping: message.angularDamping,
    fixedRotation: message.fixedRotation,
    allowSleep: message.allowSleep,
    sleepSpeedLimit: message.sleepSpeedLimit,
    sleepTimeLimit: message.sleepTimeLimit
  });

  for (var shapeMsg, i = 0; (shapeMsg = message.shapes[i]); i++) {
    body.addShape(
      deserializeShape(shapeMsg),
      deserializeVec3(message.shapeOffsets[i]),
      deserializeQuaternion(message.shapeOrientations[i])
    );
  }

  body[ID] = message.id;

  return body;
};

/******************************************************************************
 * Shapes
 */

module.exports.serializeShape = serializeShape;
function serializeShape (shape) {
  var shapeMsg = {type: shape.type};
  if (shape.type === CANNON.Shape.types.BOX) {
    shapeMsg.halfExtents = serializeVec3(shape.halfExtents);

  } else if (shape.type === CANNON.Shape.types.SPHERE) {
    shapeMsg.radius = shape.radius;

  // Patch schteppe/cannon.js#329.
  } else if (shape._type === CANNON.Shape.types.CYLINDER) {
    shapeMsg.type = CANNON.Shape.types.CYLINDER;
    shapeMsg.radiusTop = shape.radiusTop;
    shapeMsg.radiusBottom = shape.radiusBottom;
    shapeMsg.height = shape.height;
    shapeMsg.numSegments = shape.numSegments;

  } else {
    // TODO(donmccurdy): Support for other shape types.
    throw new Error('Unimplemented shape type: %s', shape.type);
  }
  return shapeMsg;
}

module.exports.deserializeShape = deserializeShape;
function deserializeShape (message) {
  var shape;

  if (message.type === CANNON.Shape.types.BOX) {
    shape = new CANNON.Box(deserializeVec3(message.halfExtents));

  } else if (message.type === CANNON.Shape.types.SPHERE) {
    shape = new CANNON.Sphere(message.radius);

  // Patch schteppe/cannon.js#329.
  } else if (message.type === CANNON.Shape.types.CYLINDER) {
    shape = new CANNON.Cylinder(message.radiusTop, message.radiusBottom, message.height, message.numSegments);
    shape._type = CANNON.Shape.types.CYLINDER;

  } else {
    // TODO(donmccurdy): Support for other shape types.
    throw new Error('Unimplemented shape type: %s', message.type);
  }

  return shape;
}

/******************************************************************************
 * Constraints
 */

module.exports.serializeConstraint = function (constraint) {

  var message = {
    id: constraint[ID],
    type: constraint.type,
    maxForce: constraint.maxForce,
    bodyA: constraint.bodyA[ID],
    bodyB: constraint.bodyB[ID]
  };

  switch (constraint.type) {
    case 'LockConstraint':
      break;
    case 'DistanceConstraint':
      message.distance = constraint.distance;
      break;
    case 'HingeConstraint':
    case 'ConeTwistConstraint':
      message.axisA = serializeVec3(constraint.axisA);
      message.axisB = serializeVec3(constraint.axisB);
      message.pivotA = serializeVec3(constraint.pivotA);
      message.pivotB = serializeVec3(constraint.pivotB);
      break;
    case 'PointToPointConstraint':
      message.pivotA = serializeVec3(constraint.pivotA);
      message.pivotB = serializeVec3(constraint.pivotB);
      break;
    default:
      throw new Error(''
        + 'Unexpected constraint type: ' + constraint.type + '. '
        + 'You may need to manually set `constraint.type = "FooConstraint";`.'
      );
  }

  return message;
};

module.exports.deserializeConstraint = function (message, bodies) {
  var TypedConstraint = CANNON[message.type];
  var bodyA = bodies[message.bodyA];
  var bodyB = bodies[message.bodyB];

  var constraint;

  switch (message.type) {
    case 'LockConstraint':
      constraint = new CANNON.LockConstraint(bodyA, bodyB, message);
      break;

    case 'DistanceConstraint':
      constraint = new CANNON.DistanceConstraint(
        bodyA,
        bodyB,
        message.distance,
        message.maxForce
      );
      break;

    case 'HingeConstraint':
    case 'ConeTwistConstraint':
      constraint = new TypedConstraint(bodyA, bodyB, {
        pivotA: deserializeVec3(message.pivotA),
        pivotB: deserializeVec3(message.pivotB),
        axisA: deserializeVec3(message.axisA),
        axisB: deserializeVec3(message.axisB),
        maxForce: message.maxForce
      });
      break;

    case 'PointToPointConstraint':
      constraint = new CANNON.PointToPointConstraint(
        bodyA,
        deserializeVec3(message.pivotA),
        bodyB,
        deserializeVec3(message.pivotB),
        message.maxForce
      );
      break;

    default:
      throw new Error('Unexpected constraint type: ' + message.type);
  }

  constraint[ID] = message.id;
  return constraint;
};

/******************************************************************************
 * Contacts
 */

module.exports.serializeContact = function (contact) {
  return {
    bi: contact.bi[ID],
    bj: contact.bj[ID],
    ni: serializeVec3(contact.ni),
    ri: serializeVec3(contact.ri),
    rj: serializeVec3(contact.rj)
  };
};

module.exports.deserializeContact = function (message, bodies) {
  return {
    bi: bodies[message.bi],
    bj: bodies[message.bj],
    ni: deserializeVec3(message.ni),
    ri: deserializeVec3(message.ri),
    rj: deserializeVec3(message.rj)
  };
};

/******************************************************************************
 * Math
 */

module.exports.serializeVec3 = serializeVec3;
function serializeVec3 (vec3) {
  return vec3.toArray();
}

module.exports.deserializeVec3 = deserializeVec3;
function deserializeVec3 (message) {
  return new CANNON.Vec3(message[0], message[1], message[2]);
}

module.exports.serializeQuaternion = serializeQuaternion;
function serializeQuaternion (quat) {
  return quat.toArray();
}

module.exports.deserializeQuaternion = deserializeQuaternion;
function deserializeQuaternion (message) {
  return new CANNON.Quaternion(message[0], message[1], message[2], message[3]);
}

},{"./math":30,"cannon-es":5}]},{},[1]);
