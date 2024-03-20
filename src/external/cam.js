//Source : view-source:https://jgbarah.github.io/aframe-playground/camrender-01/camrender.js
//Code for a component implementing texture coming from a camera
//
//Original code:
//https://wirewhiz.com/how-to-use-a-cameras-output-as-a-texture-in-aframe/

//!!! Stops Rendering Camera Feed to Canvas
//When feed camera becomes active
//When inspector mode is toggled once
const camrender = AFRAME.registerComponent('camrender',{
    'schema': {
       // desired FPS
       fps: {
            type: 'number',
            default: 90.0
       },
       // Id of the canvas element used for rendering the camera
       cid: {
            type: 'string',
            default: 'camRenderer'
       },
       // Height of the renderer element
       height: {
            type: 'number',
            default: 300
       },
       // Width of the renderer element
       width: {
            type: 'number',
            default: 400
       }
    },
    'update': function(oldData) {
        var data = this.data
        if (oldData.cid !== data.cid) {
            // Find canvas element to be used for rendering
            var canvasEl = document.getElementById(this.data.cid);
            // Create renderer
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvasEl
            });
            // Set properties for renderer DOM element
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.domElement.crossorigin = "anonymous";
        };
        if (oldData.width !== data.width || oldData.height !== data.height) {
            // Set size of canvas renderer
            this.renderer.setSize(data.width, data.height);
            this.renderer.domElement.height = data.height;
            this.renderer.domElement.width = data.width;
        };
        if (oldData.fps !== data.fps) {
            // Set how often to call tick
            this.tick = AFRAME.utils.throttleTick(this.tick, 1000 / data.fps , this);
        };
    },
    'tick': function(time, timeDelta) {
        this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
    }
});

const canvasUpdater = AFRAME.registerComponent('canvas-updater', {
    dependencies: ['geometry', 'material'],

    tick: function () {
	    var el = this.el;
	    var material;

	    material = el.getObject3D('mesh').material;
	    if (!material.map) { return; }
        material.map.needsUpdate = true;
    }
});

const ortho = AFRAME.registerComponent('ortho', {
  init: function () {
    this.oldCam = this.el.components.camera;
    this.el.addEventListener('render-target-loaded', () => {
      this.originalCamera = this.el.components.camera;
      this.cameraParent = this.el.parent;
      this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1);
      this.cameraParent.add(this.orthoCamera);
      this.el.camera = this.orthoCamera;
    });
  },
  remove: function () {
    this.cameraParent.remove(this.orthoCamera);
    this.oldCam.camera = this.originalCamera;
  }
});


//Export
export {camrender, canvasUpdater, ortho}