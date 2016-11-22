const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';
const NODE_CREATE = 'NODE_CREATE';
const NODE_DELETE = 'NODE_DELETE';
const NODE_UPDATE = 'NODE_UPDATE';

const actions = {
  setBackgroundColor: (color) => {
    return { type: SET_BACKGROUND_COLOR, payload: color };
  },
  createNode: (props) => {
    return { type: NODE_CREATE, payload: props };
  },
  deleteNode: (id) => {
    return { type: NODE_DELETE, payload: id };
  },
  updateNode: (id, props) => {
    return { type: NODE_UPDATE, payload: Object.assign({}, { id }, props) };
  }
};

module.exports = actions;
