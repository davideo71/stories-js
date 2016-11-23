const { combineReducers, createStore } = require('redux');
const canvasReducer = require('./canvasReducer.js');
const nodesReducer = require('./nodesReducer.js');

const rootReducer = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

const { actionTypes, actions } = require('./actions.js');
module.exports = {
  store: createStore(rootReducer),
  actionTypes,
  actions
};
