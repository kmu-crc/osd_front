import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditDesignListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
  }

  render() {
    return(
      <ContentList data={this.props.EditDesignList} type="design"/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditDesignList: state.GroupDetail.status.DesignInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignInGroupRequest: (id, page, sort) => {
        return dispatch(GetDesignInGroupRequest(id, page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDesignListContainer);
