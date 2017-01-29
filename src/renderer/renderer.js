const React = require('react');
const ReactDOM = require('react-dom');
const rootRequire = require('app-root-path').require;
const config = rootRequire('/config');
const { version } = rootRequire('/package.json');
const { store, actions } = require('../reducers/');
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

const keyDownCB = (e) => {
  switch (e.code){
  case 'ArrowUp':
    store.dispatch(actions.createNode({
      name: 'new',
      size: [80, 60],
      imageName: 'villa.jpg',
      position: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), 0.01]
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
document.addEventListener('keydown', keyDownCB);


// TEMP
store.dispatch(actions.createNode({
  name: 'ONE',
  size: [80, 60],
  imageName: '758px-Canestra_di_frutta_(Caravaggio).jpg',
  position: [-20, Math.floor(Math.random() * 100), 0.01]
 }));
// store.dispatch(actions.createNode({ name: 'TWO' }));
store.dispatch(actions.createNode({
  name: 'THREE',
  size: [80, 60],
  imageName: '758px-Canestra_di_frutta_(Caravaggio).jpg',
  position: [-20, Math.floor(Math.random() * 100), 0.01]
}));
//store.dispatch(actions.deleteNode(1));
store.dispatch(actions.updateNode(0, { size: [100, 100] }));
store.dispatch(actions.createLine({
  startNode: 1,
  endNode: 2
}));
// /TEMP



// FIXME: normally we'd use a <Provider> here to pass the store along but this does
//   not work with R3R yet (see: https://github.com/toxicFork/react-three-renderer/issues/140);
//   therefore the provider is currently placed directly within the <React3> component.
ReactDOM.render(
  <World store={store} />,
  document.getElementById('canvasContainer')
);
