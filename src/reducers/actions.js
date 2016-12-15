const actionTypes = {
  SET_BACKGROUND_COLOR: 'SET_BACKGROUND_COLOR',
  NODE_CREATE: 'NODE_CREATE',
  NODE_DELETE: 'NODE_DELETE',
  NODE_UPDATE: 'NODE_UPDATE',
  NODE_SET_NEXT_ID: 'NODE_SET_NEXT_ID'
};

const actions = {
  setBackgroundColor: (color) => {
    return { type: actionTypes.SET_BACKGROUND_COLOR, payload: color };
  },
  createNode: (props) => {
    return (dispatch, getState) => {
      const id = getState().nodes.nextId;
      dispatch({ type: actionTypes.NODE_CREATE, payload: Object.assign({}, props, { id }) });
      dispatch({ type: actionTypes.NODE_SET_NEXT_ID, payload: id + 1 });
    };
  },
  deleteNode: (id) => {
    return { type: actionTypes.NODE_DELETE, payload: id };
  },
  updateNode: (id, props) => {
    return { type: actionTypes.NODE_UPDATE, payload: Object.assign({}, { id }, props) };
  }
};

module.exports = { actionTypes, actions };
