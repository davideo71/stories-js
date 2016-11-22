const { combineReducers, createStore } = require('redux');
const canvasReducer = require('./canvasReducer.js');
const nodesReducer = require('./nodesReducer.js');

const rootReducer = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

module.exports = {
  store: createStore(rootReducer),
  actions: require('./actions.js')
};
