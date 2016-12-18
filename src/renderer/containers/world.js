const React = require('react');
const { PropTypes } = React;

const THREE = require('three');
const { Vector3 } = THREE;

const React3 = require('react-three-renderer');
const { connect } = require('react-redux');

const PLANE_WIDTH = 100;
const PLANE_HEIGHT = 100;

class World extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.instanceOf(THREE.Color).isRequired,

    // onMouseDown: PropTypes.func,
    // onMouseUp: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    // this._geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    // this._position = new THREE.Vector3(0, 0, 0);
  }

  render() {
    // NOTE: since this is a container (smart component), it gets its properties from the redux store, not from a parent;
    // this also means defaults are provided through the store (ultimately defaults.js) instead of defaultProps.
    const { backgroundColor } = this.props;

    const width = window.innerWidth;
    const height = window.innerHeight;

    return (<div ref="container">
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        clearColor={backgroundColor}
      >
        <scene ref="world">
          <perspectiveCamera
            fov={70}
            aspect={width / height}
            near={1}
            far={5000}
            name="mainCamera"
            position={new Vector3(0, 0, 70)}
            lookAt={new Vector3(0, 0, 0)}
          />
          {/* add ambient light? */}
          {/* add canvas (which contains all nodes+lines and manages their life cycles) */}

          {/* for now, let's just add a temporary box */}
          <mesh>
            <boxGeometry
              width={40}
              height={40}
              depth={40}
            />
            <meshBasicMaterial
              color={0x00ff00}
            />
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    'backgroundColor': new THREE.Color(state.canvas.backgroundColor)
  };
};

module.exports = connect(mapStateToProps)(World);
