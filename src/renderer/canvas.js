const React = require('react');
const { PropTypes } = React;

const THREE = require('three');
const { Vector3 } = THREE;

const React3 = require('react-three-renderer');


const PLANE_WIDTH = 100;
const PLANE_HEIGHT = 100;

module.exports = class Canvas extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.instanceOf(THREE.Color).isRequired,

    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this._geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    this._position = new THREE.Vector3(0, 0, 0);
  }

  render() {
    return (<div ref="container">
      {/* <h1>test-dom-element</h1> */}
      <React3
        width={window.innerWidth}
        height={window.innerHeight}
        clearColor={this.props.backgroundColor}
      ></React3>
    </div>);
  }
};
