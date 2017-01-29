const path = require('path');

const React = require('react');
const { PropTypes } = React;
const THREE = require('three');
const { connect } = require('react-redux');

const appRootPath = require('app-root-path').toString();

const RING_RADIUS = 5;
const RING_THICKNESS = 1;
const NODE_WIDTH = 80;
const NODE_HEIGHT = 60;
const FRAME_MARGIN = 0.08;
const IMG_PATH = path.join(appRootPath, 'assets/img');



// so the data in this node is a 'mere' reflection of actual data in the store;
// should a node be recreated whenever data changes? or should it be updated?
class Node extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    size: PropTypes.instanceOf(THREE.Vector2).isRequired,  // FIXME: (?) should this be derived or is it part of the metadata (actual image loading might take time / is async)?
    color: PropTypes.instanceOf(THREE.Color).isRequired,
    // dimensionsFull: PropTypes.instanceOf(THREE.Vector2).isRequired,
    // dimensionsAspect: PropTypes.instanceOf(THREE.Vector2).isRequired,
    // uploadStatus: PropTypes.bool.isRequired,
    // published: PropTypes.bool.isRequired,
    // editingInfo: PropTypes.string,
    // notes: PropTypes.string,
    imageName: PropTypes.string.isRequired  // '758px-Canestra_di_frutta_(Caravaggio).jpg'
  };

  constructor(props, context) {
    super(props, context);

    // no state for now...
  }

  // get id() { return this._id; }

  render() {
    const bgImagePath = path.join(IMG_PATH, 'white.png'); //this 'solves' the problem of the render order (makes sure each frame is rendered before each image) but is not really elegant
    const ringImagePath = path.join(IMG_PATH, 'red.png');
    const imagePath = path.join(IMG_PATH, this.props.imageName);
    const w = this.props.size.x;
    const h = this.props.size.y;
    const frameMargin = 1 + FRAME_MARGIN;

    // TODO: (perhaps) share as many things under resources and share those among all nodes to save memory usage
    return (<group position={this.props.position}>
      <resources>
        {/* TODO: colors etc. should be moved to a theme file or something. Atm defaults.js appears to be fulfilling that function. */}
        <texture
          resourceId="bgImageTex"
          url={bgImagePath}
          onError={() => {
            console.error(`could not load background image ('${bgImagePath}')`);
          }}
        />
        <texture
          resourceId="imageTex"
          url={imagePath}
          onError={() => {
            console.error(`could not load node image ('${imagePath}')`);
          }}
        />

        <texture
          resourceId="ringImageTex"
          url={ringImagePath}
          onError={() => {
            console.error(`could not load ring image ('${ringImagePath}')`);
          }}
        />

        {/* <meshBasicMaterial resourceId="bgMat" color={0xFFFFFF} /> */}
        {/* <meshBasicMaterial resourceId="bgImageMat" color={0xF0F0F0} depthTest={false} depthWrite={false}> */}
        <meshBasicMaterial resourceId="bgImageMat" color={0xFFFFFF}>
          <textureResource resourceId="bgImageTex" />
        </meshBasicMaterial>

        {/* <meshBasicMaterial resourceId="imageMat" color={0x00FFFF} depthTest={false} depthWrite={false}> */}
        <meshBasicMaterial resourceId="imageMat" color={0xFFFFFF}>
          <textureResource resourceId="imageTex" />
        </meshBasicMaterial>

        {/* <meshBasicMaterial resourceId="ringMat" color={this.props.color} /> */}
        {/* <meshBasicMaterial resourceId="ringMat" color={this.props.color} depthTest={false} depthWrite={false}> */}
        <meshBasicMaterial resourceId="ringImageMat">
          <textureResource resourceId="ringImageTex" />
        </meshBasicMaterial>
      </resources>

      <mesh position= {new THREE.Vector3(0, 0, 0)}>
        <planeBufferGeometry name="bgGeom" width={w * frameMargin} height={h * frameMargin}></planeBufferGeometry>
        <materialResource resourceId="bgImageMat" />
     </mesh>

      <mesh position= {new THREE.Vector3(0, 0, 0)}>
        <planeBufferGeometry name="imageGeom" width={w} height={h}></planeBufferGeometry>
        <materialResource resourceId="imageMat" />
      </mesh>

      <mesh position={new THREE.Vector3(NODE_WIDTH * 0.5 + RING_RADIUS * 2, 0, 0)}>
        {/* FIXME: should be ringBufferGeometry but that is currently unimplemented (see: https://github.com/toxicFork/react-three-renderer/issues/2#issuecomment-250013560) */}
        <ringGeometry name="ringGeom"
          innerRadius={RING_RADIUS}
          outerRadius={RING_RADIUS + RING_THICKNESS}
          thetaSegments={32}
        />
        <materialResource resourceId="ringImageMat" />
      </mesh>
    </group>);
  }
}

// FIXME: (?) is it okay to pass id as prop from parent so canvas can init the component that way?
const mapStateToProps = (state, ownProps) => {
  const node = state.nodes.items[ownProps.id];

  return {
    name: node.name,
    position: new THREE.Vector3(node.position[0], node.position[1], 0),
    size: new THREE.Vector2(node.size[0], node.size[1]),
    color: new THREE.Color(node.color),
    imageName: node.imageName
  };
};

module.exports = connect(mapStateToProps)(Node);

