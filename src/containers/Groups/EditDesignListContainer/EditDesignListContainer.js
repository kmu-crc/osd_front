import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditDesignListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignInGroupRequest(this.props.id, null, null)
    .then(res => {
      if (res.DesignInGroup) {
        const num = res.DesignInGroup.length;
        this.props.getCount(num);
      } else {
        this.props.getCount(0);
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.EditDesignList) !== JSON.stringify(nextProps.EditDesignList)) {
      this.props.getCount(nextProps.EditDesignList.length);
    }
    return true;
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetDesignInGroupRequest(this.props.id, null, null)
        .then(res => {
          if (res.DesignInGroup) {
            const num = res.DesignInGroup.length;
            this.props.getCount(num);
          } else {
            this.props.getCount(0);
          }
        });
      }
    }).catch(err => {
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
