const initialState = {
  backgroundColor: 0x27272D
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BACKGROUND_COLOR':
    return Object.assign({}, state, { backgroundColor: action.payload });
  }

  return state;
};
