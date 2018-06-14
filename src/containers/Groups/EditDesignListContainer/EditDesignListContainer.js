import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditDesignListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetDesignInGroupRequest(this.props.match.params.id, null, nextProps.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  setOut = (id) => {
    alert("디자인을 삭제하시겠습니까?");
    this.props.DeleteDesignInGroupRequest(this.props.match.params.id, id)
    .then(this.props.GetDesignInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort))
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.EditDesignList} type="design" handleClick={this.setOut}/>
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
