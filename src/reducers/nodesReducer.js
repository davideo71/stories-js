/*
 * based on http://redux.js.org/docs/basics/ExampleTodoList.html
 */
const defaults = require('../defaults');
const { actionTypes } = require('./actions');
const { mapObject, updateObject } = require('./reducerUtils');

const initialNodeState = {
  name: '',
  id: -1,
  position: [0, 0],
  size: [1, 1],  // the size is useful because the aspect ratio is not always the same, but this can potentially be directly retrieved from the image it is linked to
  color: defaults.NODE.COLOR,
  // dimensionsFull: [0, 0],
  // dimensionsAspect: 1,
  // uploadStatus: false,
  // published: false,  // this bool indicates wether the image is currently selected and on display online
  // editingInfo: '',
  // notes: '',
  imageName: null
};

const initialNodesState = {
  nextId: 0,
  items: {}
};

// performs operations for one node, only used internally by nodesReducer
const nodeReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.NODE_CREATE:
    return updateObject(initialNodeState, action.payload);
  case actionTypes.NODE_UPDATE:
    if (state.id === action.payload.id) {
      return updateObject(state, action.payload);
    } else {
      return state;
    }
  default:
    return state;
  }
};

const nodesReducerHandlers = {
  [actionTypes.NODE_CREATE]: (state, action) => {
    const newItems = updateObject(state.items, {
      [action.payload.id]: nodeReducer(undefined, action)
    });
    return updateObject(state, { items: newItems });
  },

  [actionTypes.NODE_DELETE]: (state, action) => {
    const newItems = updateObject(state.items);
    delete newItems[action.payload];
    return updateObject(state, { items: newItems });
  },

  [actionTypes.NODE_UPDATE]: (state, action) => {
    return updateObject(state, {
      items: mapObject(state.items, (i) => nodeReducer(i, action))
    });
  },

  [actionTypes.NODE_SET_NEXT_ID]: (state, action) => {
    return updateObject(state, { nextId: action.payload });
  }
};

const createNodesReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

module.exports = createNodesReducer(initialNodesState, nodesReducerHandlers);
