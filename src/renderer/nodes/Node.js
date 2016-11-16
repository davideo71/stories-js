/* eslint-env browser */

const THREE = require('three');

const RING_RADIUS = 5;
const RING_THICKNESS = 1;
const NODE_WIDTH = 80;
const NODE_HEIGHT = 60;
const FRAME_MARGIN = 0.08;
const DEFAULT_COLOR = 0xAB2D4A;

// so the data in this node is a 'mere' reflection of actual data in the store;
// should a node be recreated whenever data changes? or should it be updated?
module.exports = class Node extends THREE.Object3D {
  constructor(id, position, size = [5, 7], published = false) {
    super();
    this._name;
    this._id = id;  // each node has a unique ID for the moent that can be just an increasing counter
    this._position = position;
    this._size = size;  // the size is useful because the aspect ratio is not always the same, but this can potentially be directly retrieved from the image it is linked to
    this._imageId;
    this._dimensionsFull;
    this._dimensionsAspect;
    this._uploadStatus;
    this._published = published;  // this bool indicates wether the image is currently selected and on display online
    this._editingInfo;
    this._notes;
    this._colorTest = DEFAULT_COLOR;
    // FIXME: we need a good way to get the project root path
    this._imagePath = '../../assets/img/758px-Canestra_di_frutta_(Caravaggio).jpg';

    this._setupModel();
  }

  get id() { return this._id; }
  get size() { return this._size; }
  get published() { return this._published; }
  get imagePath() { return this._imgPath; }
  get color() { return this._colortest; }

  _ringMesh() {
    const geometry = new THREE.RingBufferGeometry(RING_RADIUS, RING_RADIUS + RING_THICKNESS, 32);  // save something here with less segments
    const material = new THREE.MeshBasicMaterial({ color: 0xAB2D4A });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.x = NODE_WIDTH * 0.5 + RING_RADIUS * 2;
    ring.position.y = 0;
    ring.position.z = 0;

    return ring;
  }

  // _planeMesh() {
  //   const geometry = new THREE.PlaneBufferGeometry(NODE_WIDTH, NODE_HEIGHT);
  //   const material = new THREE.MeshBasicMaterial({ color: 0xDCF4DF });
  //   const plane = new THREE.Mesh(geometry, material);
  //
  //   return plane;
  // }

  _setupModel() {
    console.log(`this._size: ${this._size}`);
    // const [w, h] = this._size;
    const w = this._size[0];
    const h = this._size[1];
    const texture = new THREE.TextureLoader().load(this._imagePath, (tex) => {
      // FIXME: just here to observe loading/rendering order, should fire an event or something along those lines
      console.log('texture loaded');
    });

    const geometry = new THREE.PlaneBufferGeometry(w, h);
    const geometry2 = new THREE.PlaneBufferGeometry(w * 1.08, h * 1.08);

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const plane = new THREE.Mesh(geometry, material);
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane.position.z = +0.01;

    this.add(plane);
    this.add(plane2);

    this.add(this._ringMesh());
    // render();  // for some reason, with this render, the image stays dark
  }
};
