/*
 * based on http://redux.js.org/docs/basics/ExampleTodoList.html
 */
const defaults = require('../defaults');

const initialNodeState = {
  name: '',
  id: -1,
  position: [0, 0],
  size: [1, 1],  // the size is useful because the aspect ratio is not always the same, but this can potentially be directly retrieved from the image it is linked to
  // imageFilename: '',
  // dimensionsFull: [0, 0],
  // dimensionsAspect: 1,
  // uploadStatus: false,
  // published: false,  // this bool indicates wether the image is currently selected and on display online
  // editingInfo: '',
  // notes: '',
  // color: defaults.NODE.COLOR
};

const initialNodesState = [];  // an array here might be fine, as they are hash tables internally

// performs operations for one node, only used internally by nodesReducer
const nodeReducer = (state = {}, action) => {
  switch (action.type) {
  case 'NODE_CREATE':
    return Object.assign({}, initialNodeState, action.payload);
  case 'NODE_UPDATE':
    if (state.id === action.payload.id) {
      return Object.assign({}, state, action.payload);
    } else {
      return state;
    }
  default:
    return state;
  }
};

// manages the list of nodes
const nodesReducer = (state = initialNodesState, action) => {
  switch (action.type) {
  case 'NODE_CREATE':
    return [...state, nodeReducer(undefined, action)];
  case 'NODE_UPDATE':
    return state.map((n) => nodeReducer(n, action));
  case 'NODE_DELETE':
    return [
      ...state.slice(0, action.payload),
      ...state.slice(action.payload + 1)
    ];
  default:
    return state;
  }
};

module.exports = nodesReducer;
