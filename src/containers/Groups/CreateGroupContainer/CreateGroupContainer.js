import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateGroup from "components/Groups/CreateGroup";

class CreateGroupContainer extends Component {
  render() {
    return(
      <div>
        <CreateGroup {...this.props}/>
      </div>
    );
  }
}

export default CreateGroupContainer;