import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest, GetDesignInGroupRequest } from "redux/modules/group";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import ScrollList from 'components/Commons/ScrollList';
import osdstyle from 'opendesign_style';

const DesignBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    margin-left: 1rem;
    padding-bottom: 1rem;
    font-size: ${opendesign_style.font.size.heading4};
  }
`

class WaitingDesignContainer extends Component {
  state = { reload: false };
  componentWillMount() {
    this.props.GetWaitingDesignRequest(this.props.id, null);
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingDesignRequest(this.props.id, null)
            .then(() => { this.handleReload(); })
        }
      }).catch(err => {
        console.log(err);
      });
  }
  setAccept = (id) => {
    this.props.UpdateDesignInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingDesignRequest(this.props.id, null)
            .then(() => { this.handleReload(); })
        }
      }).then((data) => { console.log(data) }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <DesignBox>
        <div className="boxTitle">가입 신청중인 디자인 ({this.props.waitingDesign.length})</div>
        <ScrollList
          reload={this.state.reload}
          handleReload={this.handleReload}
          {...osdstyle.design_margin}
          type="design"
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
