const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const THREE = require('three');
const rootRequire = require('app-root-path').require;
const config = rootRequire('/config');
const { version } = rootRequire('/package.json');
const { store, actions } = require('../reducers/index');
const World = require('./containers/world');

console.info(`***** Stories ${version} (env mode: ${config.environment}) *****`);

const mouseDownCB = (ev) => {
  // console.info(ev);

  const color1 = 0xFF00FF;
  const color2 = 0x00FF00;
  const newColor = store.getState().canvas.backgroundColor === color1 ? color2 : color1;
  store.dispatch(actions.setBackgroundColor(newColor));

 // const { position: curPos, color: curColor } = store.getState().nodes.items[2];
 // store.dispatch(actions.updateNode(2, {
 //   position: [curPos[0] + 1, curPos[1]],
 //   color: curColor === color2 ? color1 : color2
 // }));
};

const keyDownCB = (daKey) => {
  switch (daKey.code){
  case 'ArrowUp':
    store.dispatch(actions.createNode({
      name: 'Four',
      size: [80, 60],
      imageName: '758px-Canestra_di_frutta_(Caravaggio).jpg',
      position: new THREE.Vector3(-20, 30, 0.01)
    }));
    console.info('arrow up was pressed');
    break;
  case 'ArrowDown':
    console.info('arrow down was pressed');
    break;
  default:
    console.info('something else was pressed');
    break;
  };
};

document.addEventListener('mousedown', mouseDownCB);
document.addEventListener('keydown', function (e) { keyDownCB(e)});// eslint thinks it's ugly but i love all my children



// TEMP
store.dispatch(actions.createNode({ name: 'ONE' }));
store.dispatch(actions.createNode({ name: 'TWO' }));
store.dispatch(actions.createNode({
  name: 'THREE',
  size: [80, 60],
  imageName: '758px-Canestra_di_frutta_(Caravaggio).jpg'
}));
store.dispatch(actions.deleteNode(1));
store.dispatch(actions.updateNode(0, { size: [100, 100] }));
// /TEMP



// FIXME: something is going wrong with the Provider construction, so we pass it explicitly for now
ReactDOM.render(
  <Provider store={store}>
    <World store={store} />
  </Provider>,
  document.getElementById('canvasContainer')
);
