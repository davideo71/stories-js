const ReactDOM = require('react-dom');

const THREE = require('three');
const { store, actions } = require('../reducers/index');

// const animate = () => {
//   const MAX_FPS = 30;
//   setTimeout(() => {
//     requestAnimationFrame(animate);
//   }, 1000 / MAX_FPS);
//   render();
// }


/** ********* ENTRY POINT ***********/
const React = require('react');
const { Provider } = require('react-redux');
const World = require('./world');

// Canvas should take care of nodes management with R3
// const Node = require('./nodes/node');
// const node = new Node(53, [0, 0, 0], [80, 60], true);
// scene.add(node);

// render();
// animate();

const mouseDownCB = (ev) => {
  console.info(ev);

  const color1 = 0xFF00FF;
  const color2 = 0x00FF00;
  const newColor = store.getState().canvas.backgroundColor === color1 ? color2 : color1;
  store.dispatch(actions.setBackgroundColor(newColor));
};
document.addEventListener('mousedown', mouseDownCB);

ReactDOM.render(
  <Provider store={store}>
    <World backgroundColor={new THREE.Color('rgb(127, 255, 63)')} />
  </Provider>,
  document.getElementById('canvasContainer')
);
