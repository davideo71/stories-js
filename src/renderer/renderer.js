/* eslint-env browser */

// TODO: meh
// require('css-loader');
// let xyz = require('css!normalize.css');
// let xyz = require('css!desktop-normalize');
const THREE = require('three');
const Node = require('./nodes/Node.js');

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let scene;
let camera;
let renderer;

const setupScene = () => {
  const createRenderer = () => {
    const r = new THREE.WebGLRenderer({ antialias: true });
    r.setClearColor(0x27272D);
    r.setPixelRatio(window.devicePixelRatio);
    r.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    r.autoClear = false;

    return r;
  };

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000);
  camera.position.z = 70;
  renderer = createRenderer();

  const container = document.getElementById('canvasContainer');
  renderer.domElement.style.position = 'relative';
  container.appendChild(renderer.domElement);
};

const render = () => {
  console.log('render');
  camera.lookAt(scene.position);
  renderer.clear();
  renderer.render(scene, camera);
};

const initHandlers = () => {
  window.addEventListener('click', () => {
    render();
  }, false);
};

// const animate = () => {
//   const MAX_FPS = 30;
//   setTimeout(() => {
//     requestAnimationFrame(animate);
//   }, 1000 / MAX_FPS);
//   render();
// }


/** ********* ENTRY POINT ***********/
setupScene();
initHandlers();

const node = new Node(53, [0, 0, 0], [80, 60], true);
scene.add(node);

render();
// animate();
