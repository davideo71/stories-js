const { applyMiddleware, combineReducers, compose, createStore } = require('redux');
const { electronEnhancer } = require('redux-electron-store');
const thunk = require('redux-thunk').default;
const isRenderer = require('is-electron-renderer');
const config = require('../config');
const canvasReducer = require('./canvasReducer');
const nodesReducer = require('./nodesReducer');

const rootReducer = combineReducers({
  canvas: canvasReducer,
  nodes: nodesReducer
});

const middleware = [thunk];

if (config.environment !== 'production') {
  middleware.push(require('redux-immutable-state-invariant')());
  if (isRenderer) middleware.push(require('redux-logger')({
    diff: true,
    collapsed: true
  }));
}

// NOTE: electronEnhancer must be placed after any middleware/enhancers dispatching actions themselves
const enhancer = compose(
  applyMiddleware(...middleware),
  electronEnhancer({
    dispatchProxy: (a) => store.dispatch(a)
  }) /* eslint no-use-before-define: 0 */
);

const store = createStore(rootReducer, enhancer);

const { actionTypes, actions } = require('./actions');
module.exports = {
  store, actionTypes, actions
};
