const { applyMiddleware, combineReducers, compose, createStore } = require('redux');
const { electronEnhancer } = require('redux-electron-store');
const isRenderer = require('is-electron-renderer');
const config = require('../config.js');
const canvasReducer = require('./canvasReducer.js');
const nodesReducer = require('./nodesReducer.js');

const rootReducer = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

const middleware = [];

if (config.environment !== 'production') {
  middleware.push(require('redux-immutable-state-invariant')());
  if (isRenderer) middleware.push(require('redux-logger')());
}

// NOTE: electronEnhancer must be placed after any middleware/enhancers dispatching actions themselves
const enhancer = compose(
  applyMiddleware(...middleware),
  electronEnhancer({
    dispatchProxy: (a) => store.dispatch(a)
  }) /* eslint no-use-before-define: 0 */
);

const store = createStore(rootReducer, enhancer);

const { actionTypes, actions } = require('./actions.js');
module.exports = {
  store, actionTypes, actions
};
