const { combineReducers, createStore } = require('redux');
const canvasReducer = require('./canvasReducer.js');
const nodesReducer = require('./nodesReducer.js');

const reducers = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

module.exports = createStore(reducers);
