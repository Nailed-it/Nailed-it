import React, { Component } from 'react';
import { connect} from 'react-redux';
import FList from '../../cardlist/components/FList';
import {Row, Col} from 'react-materialize';
import { bindActionCreators } from 'redux';


class FurnitureList extends Component {
  render() {
    const intro = 'Furniture'
    const furniture = {};
    const [rooms, roomSelected] = [this.props.rooms, this.props.roomSelected];
    if (roomSelected) {
      Object.assign(furniture, rooms[roomSelected].furniture);
    }
    //const furniture = this.state.furniture || ['chair', 'swing']
    return (
      <Row>
      <div s={12} l={6}>
        <h3>Current Rooms Furniture</h3>
        

        <FList
          list={ furniture }
          intro={ intro }
          view="furniture"
        />
      </div>
      </Row>
    );
  }
}

function mapStateToProps({ rooms, roomSelected }) {
  return { rooms, roomSelected };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureList);
