/* eslint-env browser */

const three = require('three');

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const MAX_FPS = 30;
let container;
let camera, scene1, renderer;
const nodeWidth = 80;
const nodeHight = 60;
const torusRadius = 5;
// TODO: we need a way to get to the project root path
const picPath = '../../assets/img/758px-Canestra_di_frutta_(Caravaggio).jpg';

/*
var myMaterial = new three.MeshPhysicalMaterial( {
  color: 0xAB2D4A ,
  metalness: 0.5 ,
  roughness: 0.5 ,
  clearCoat:  0.5 ,
  clearCoatRoughness: 0.5 ,
  reflectivity: 0.5 ,
  envMap: null
} );
*/

// const myMaterial = new three.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, shading: three.FlatShading, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 5 } );
const myMaterial = new three.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 5 });


function init() {
  container = document.getElementById('canvasContainer');
  camera = new three.PerspectiveCamera(70, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000);
  camera.position.z = 70;

  scene1 = new three.Scene();

  // PAINTING
  const callbackPicture = function() {
    // var image = texturePicture1.image;
    const geometry = new three.PlaneBufferGeometry(nodeWidth, nodeHight);
    const mesh1 = new three.Mesh(geometry, materialPicture1);

    function addPicture(zscene, zmesh) {
      zscene.add(zmesh);
    // var meshFrame = new three.Mesh( geometry, new three.MeshBasicMaterial( { color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 5 } ) );
      const meshFrame = new three.Mesh(geometry, myMaterial);
      meshFrame.scale.x = 1.08 * meshFrame.scale.x;
      meshFrame.scale.y = 1.08 * meshFrame.scale.y;
      zscene.add(meshFrame);
    }

    function addStuff(aScene) {
      const geometry2 = new three.TorusBufferGeometry(torusRadius, 0.5, 2, 50);
      const material2 = new three.MeshBasicMaterial({ color: 0xAB2D4A });
      const torus = new three.Mesh(geometry2, material2);
      torus.position.x = +(nodeWidth * 0.5) + (torusRadius * 2);
      torus.position.y = 0;
      aScene.add(torus);

    }

    addPicture(scene1, mesh1);
    addStuff(scene1);
  };

  const texturePicture1 = new three.TextureLoader().load(picPath, callbackPicture); // second parameter is what it does onload
  const materialPicture1 = new three.MeshBasicMaterial({ color: 0xffffff, map: texturePicture1 });
  texturePicture1.minFilter = texturePicture1.magFilter = three.LinearFilter;// dit maakt het een stuk scherper
  texturePicture1.mapping = three.UVMapping;

  renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.autoClear = false;
  renderer.domElement.style.position = 'relative';
  container.appendChild(renderer.domElement);

}

// function onDocumentMouseMove( event ) {
//	mouseX = ( event.clientX - windowHalfX );
//	mouseY = ( event.clientY - windowHalfY );
//	}

function render() {
  camera.lookAt(scene1.position);
  renderer.clear();
  renderer.render(scene1, camera);
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / MAX_FPS);
  render();
}

init();
animate();
