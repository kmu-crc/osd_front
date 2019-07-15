import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest, GetDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';

const DesignBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class WaitingDesignContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingDesignRequest(this.props.id, this.props.sort);
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingDesignRequest(this.props.id, this.props.sort);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  setAccept = (id) => {
    this.props.UpdateDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingDesignRequest(this.props.id, this.props.sort)
        .then(this.props.GetDesignInGroupRequest(this.props.id, null, null));
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <DesignBox>
        <div className="boxTitle">가입 신청중인 디자인 ({this.props.waitingDesign.length})</div>
        <ContentList data={this.props.waitingDesign} type="design"
                     handleClick={this.setOut} handleAccept={this.setAccept}/>
      </DesignBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingDesign: state.GroupWaitingList.status.waitingDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest : (id, sort) => {
      return dispatch(GetWaitingDesignRequest(id, sort))
    },
    DeleteDesignInGroupRequest : (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    },
    UpdateDesignInGroupRequest : (id, designId) => {
      return dispatch(UpdateDesignInGroupRequest(id, designId))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDesignContainer);
