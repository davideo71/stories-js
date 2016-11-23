const { applyMiddleware, combineReducers, createStore } = require('redux');
const config = require('../../config.js');
const canvasReducer = require('./canvasReducer.js');
const nodesReducer = require('./nodesReducer.js');

const rootReducer = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

const middleware = [];

if (config.environment !== 'production') {
  middleware.push(require('redux-immutable-state-invariant')());

  // NOTE: the logger is not really useful with a plain console
  // middleware.push(require('redux-logger')());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

const { actionTypes, actions } = require('./actions.js');
module.exports = {
  store, actionTypes, actions
};
