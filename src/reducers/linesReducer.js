/*
 * based on http://redux.js.org/docs/basics/ExampleTodoList.html
 */
//const defaults = require('../defaults');
const { actionTypes } = require('./actions');
const { mapObject, updateObject } = require('./reducerUtils');

const initialLineState = {
  lineID: -1,
  startNode: -1,
  endNode: -1

  //color: defaults.LINE.COLOR,
  //transitionType: defaults.LINE.TRANSITION


};

const initialLinesState = {
  nextId: 0,
  items: {}
};

// performs operations for one line, only used internally by linesReducer
const lineReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.LINE_CREATE:
    return updateObject(initialLineState, action.payload);
  case actionTypes.LINE_DELETE:
    return updateObject(initialLinesState, action.payload);
  default:
    return state;
  }
};

const linesReducerHandlers = {
  [actionTypes.LINE_CREATE]: (state, action) => {
    const newItems = updateObject(state.items, {
      [action.payload.id]: lineReducer(undefined, action)
    });
    return updateObject(state, { items: newItems });
  },
   [actionTypes.LINE_DELETE]: (state, action) => {
     const newItems = updateObject(state.items);
     delete newItems[action.payload];
     return updateObject(state, { items: newItems });
  },
  [actionTypes.LINE_SET_NEXT_ID]: (state, action) => {
    return updateObject(state, { nextId: action.payload });
  }
};

const createLinesReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

module.exports = createLinesReducer(initialLinesState, linesReducerHandlers);
