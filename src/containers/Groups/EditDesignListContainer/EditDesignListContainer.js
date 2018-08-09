import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditDesignListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.match.params.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetDesignInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.EditDesignList} type="design" handleClick={this.setOut} history={this.props.history}/>
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
      },
      DeleteDesignInGroupRequest : (id, designId) => {
        return dispatch(DeleteDesignInGroupRequest(id, designId))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDesignListContainer);
