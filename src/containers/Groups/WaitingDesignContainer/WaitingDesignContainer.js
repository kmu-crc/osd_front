import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest, GetDesignInGroupRequest } from "redux/modules/group";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';
import ScrollList from 'components/Commons/ScrollList';
import Design from "components/Designs/Design";
import osdstyle from 'opendesign_style';

const DesignBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    margin-left: 1rem;
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`

class WaitingDesignContainer extends Component {
  componentWillMount() {
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
      .then(res => { return res.data.success === true })
      .then(() => this.props.GetWaitingDesignRequest(this.props.id, this.props.sort))
      .then(this.props.GetDesignInGroupRequest(this.props.id, 0, null))
      .catch(err => { console.log(err) });
  }

  render() {
    return (
      <DesignBox>
        <div className="boxTitle">가입 신청중인 디자인 ({this.props.waitingDesign.length})</div>
        <ScrollList
          manual
          {...osdstyle.design_margin}
          ListComponent={Design}
          dataListAdded={this.props.waitingDesign}
          getListRequest={null}
          handleReject={this.setOut} 
          handleAccept={this.setAccept} />
      </DesignBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingDesign: state.Group.status.waitingDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest: (id, sort) => {
      return dispatch(GetWaitingDesignRequest(id, sort))
    },
    DeleteDesignInGroupRequest: (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    },
    UpdateDesignInGroupRequest: (id, designId) => {
      return dispatch(UpdateDesignInGroupRequest(id, designId))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDesignContainer);
