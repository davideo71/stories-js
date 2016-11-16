/* eslint-env browser */

const three = require('three');


let container;  // , stats;
// let camera, controls, scene, renderer;
let camera, scene, renderer;
const objects = [];
const plane = new three.Plane();
const raycaster = new three.Raycaster();
const mouse = new three.Vector2();
const offset = new three.Vector3();
const intersection = new three.Vector3();
let INTERSECTED;
let SELECTED;


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (SELECTED) {
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      SELECTED.position.copy(intersection.sub(offset));
    }

    return;
  }

  const intersects = raycaster.intersectObjects(objects);
  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

      plane.setFromNormalAndCoplanarPoint(
        camera.getWorldDirection(plane.normal),
        INTERSECTED.position);
    }
    container.style.cursor = 'pointer';
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
    container.style.cursor = 'auto';
  }
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    // controls.enabled = false;

    SELECTED = intersects[0].object;

    if (raycaster.ray.intersectPlane(plane, intersection)) {
      offset.copy(intersection).sub(SELECTED.position);
    }

    container.style.cursor = 'move';
  }
}

function onDocumentMouseUp(event) {
  event.preventDefault();
  // controls.enabled = true;

  if (INTERSECTED) {
    SELECTED = null;
  }

  container.style.cursor = 'auto';
}


function init() {
  container = document.getElementById('canvasContainer');

  camera = new three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  // controls = new three.TrackballControls(camera);
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  // controls.noZoom = false;
  // controls.noPan = false;
  // controls.staticMoving = true;
  // controls.dynamicDampingFactor = 0.3;

  scene = new three.Scene();

  scene.add(new three.AmbientLight(0x505050));

  const light = new three.SpotLight(0xffffff, 1.5);
  light.position.set(0, 500, 2000);
  light.castShadow = true;

  light.shadow = new three.LightShadow(new three.PerspectiveCamera(50, 1, 200, 10000));
  light.shadow.bias = -0.00022;

  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  scene.add(light);

  const geometry = new three.BoxGeometry(40, 40, 40);

  for (let i = 0; i < 200; i++) {
    const object = new three.Mesh(geometry, new three.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

    object.position.x = Math.random() * 1000 - 500;
    object.position.y = Math.random() * 600 - 300;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() * 2 + 1;
    object.scale.y = Math.random() * 2 + 1;
    object.scale.z = Math.random() * 2 + 1;

    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);

    objects.push(object);
  }

  renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = three.PCFShadowMap;

  container.appendChild(renderer.domElement);

  const info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> Hello World with draggable cubes';

  container.appendChild(info);

  // stats = new Stats();
  // container.appendChild(stats.dom);

  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

  window.addEventListener('resize', onWindowResize, false);
}

function render() {
  // controls.update();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // stats.update();
}

// ENTRY POINT
init();
animate();
