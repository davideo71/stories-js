const React = require('react');
const { PropTypes } = React;
const { connect } = require('react-redux');

const Node = require('./nodes/node');

class Canvas extends React.Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired
  }

  /*
    * TODO: think about how lines should render (mainly start/end points...do we really need access to Node containers to get coords?)
    *       or should canvas fetch that from children and pass the data on to lines?
    *       --> it can probably access the components via r3's
    *           https://github.com/toxicFork/react-three-renderer/wiki/Entry-Point#react3findthreeobject (or refs like the docs say)
    *           (how efficient is that? should and can we keep those as local refs?)
    */
  render() {
    const { nodes } = this.props;

    // NOTE: putting the braces on the same line as the group tags results in a react error
    return (<group>
      { nodes.map((node) => {
        return (<Node
          key={node.id}
          id={node.id}
          position={node.position}
        />);
      })}
      </group>);
  }
}

const mapStateToProps = (state) => {
  return {
    'nodes': Object.values(state.nodes.items)
  };
};

module.exports = connect(mapStateToProps)(Canvas);
