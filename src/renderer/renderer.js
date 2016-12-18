const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { store, actions } = require('../reducers/index');
const World = require('./containers/world');

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
