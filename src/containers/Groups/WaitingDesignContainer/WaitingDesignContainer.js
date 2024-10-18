import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest, GetDesignInGroupRequest } from "redux/modules/group";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import ScrollList from 'components/Commons/ScrollList';
import osdstyle from 'opendesign_style';
import ScrollList_mobile from 'components/Commons/ScrollList_mobile';
import opendesign_mobile_style from "opendesign_mobile_style";


const DesignBox = styled.div`
margin-bottom: 5px;
& .boxTitle {
  margin-bottom:5px;
  font-size: 20px;
}
.boxContent{
  margin-top:22px;
}
`
const DesignBox_mobile = styled.div`
margin-bottom: 5px;
& .boxTitle {
  margin-bottom:5px;
  font-size: 20px;
}
.boxContent{
  margin-top:22px;
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
        console.error(err);
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
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth<500?
          <DesignBox_mobile style={{marginBottom:`${this.props.waitingDesign&&this.props.waitingDesign.length==0?"0px":"75px"}`}}>
          <div className="boxTitle">가입 신청중인 디자인 ({this.props.waitingDesign.length})</div>
          <div className="boxContent">
          <ScrollList_mobile
              id="scroll-list"
              {...opendesign_mobile_style.design_margin}
              reload={this.state.reload}
              handleReload={this.handleReload}
              type="design"
              status={this.props.status}
              dataList={this.props.DesignList}
              dataListAdded={this.props.waitingDesign}
              getListRequest={null}
              rejectText={"거절"}
              handleReject={this.setOut}
              handleAccept={this.setAccept}
            />
          {/* <ScrollList_mobile
            reload={this.state.reload}
            handleReload={this.handleReload}
            {...osdstyle_mobile.design_margin}
            type="design"
            dataListAdded={this.props.waitingDesign}
            getListRequest={null}
            handleReject={this.setOut}
            rejectText={"거절"}
            handleAccept={this.setAccept} /> */}
            </div>
        </DesignBox_mobile>
        :
        <DesignBox style={{marginBottom:`${this.props.waitingDesign&&this.props.waitingDesign.length==0?"0px":"75px"}`}}>
        <div className="boxTitle">가입 신청중인 디자인 ({this.props.waitingDesign.length})</div>
        <div className="boxContent">
        <ScrollList
          reload={this.state.reload}
          handleReload={this.handleReload}
          {...osdstyle.design_margin}
          type="design"
          dataListAdded={this.props.waitingDesign}
          getListRequest={null}
          handleReject={this.setOut}
          rejectText={"거절"}
          handleAccept={this.setAccept} />
          </div>
      </DesignBox>
        }
      </React.Fragment>
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
