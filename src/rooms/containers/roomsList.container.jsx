import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/cardList.component.jsx';
import { getRooms, selectRoom,  makePublic_Private, addPhoto } from '../actions/rooms.action';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-materialize';
import BudgetView from '../../BudgetView/containers/budgetView.container';
import { changeRoute } from '../../routing/actions/routing.action';
import Dropzone from 'react-dropzone';

export default class RoomsList extends Component {
  componentWillMount() {
    if(this.props.params.name) {
      this.props.selectRoom(this.props.params.name)
    }
    this.props.changeRoute(this.props.location.pathname);
    this.props.getRooms();
  }


  onDrop(files) {
    // console.log('Received files: ', files);
    this.props.addPhoto(files);
  }

  render() {
    return (
      <div>
        <Row>
          <Col s={12} m={6} l={6}>
            <div style={{"overflowY":"scroll"}}>
              <span className="RoomListHeader"></span>
              <CardList
                clickHandler={this.props.selectRoom}
                intro={this.props.roomSelected}
                list={this.props.rooms}
                view="rooms"
              />
            </div>
          </Col>
          <Col s={12} m={6} l={6}>
            <div style={{"overflowY":"scroll"}}>
              <h3>Budget Chart / Graph </h3>  
              <BudgetView rooms={this.props.rooms}/>
            </div>
          </Col>
        </Row>
        <Dropzone onDrop={files => this.onDrop(files)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

function mapStateToProps({ rooms, roomSelected, shared, route }) {
  return { rooms, roomSelected, shared, route };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRooms, selectRoom, addPhoto, changeRoute }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
