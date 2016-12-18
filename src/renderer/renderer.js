const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');

const rootRequire = require('app-root-path').require;
const config = rootRequire('/config');
const version = rootRequire('/package.json').version;

const { store, actions } = require('../reducers/index');
const World = require('./containers/world');

console.info(`***** Stories ${version} (env mode: ${config.environment}) *****`);

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
    <World />
  </Provider>,
  document.getElementById('canvasContainer')
);
