const defaults = require('../defaults');

const initialState = {
  backgroundColor: defaults.CANVAS.BACKGROUND_COLOR
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BACKGROUND_COLOR':
    return Object.assign({}, state, { backgroundColor: action.payload });
  }

  return state;
};

module.exports = canvasReducer;
