import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest, DeleteGroupInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import osdstyle from "opendesign_style";
import Loading from 'components/Commons/Loading';
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_mobile_style from "opendesign_mobile_style";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";
const GroupBox = styled.div`
  margin-bottom: 5px;
  & .boxTitle {
    margin-bottom:5px;
    font-size: 20px;
  }
  .boxContent{
    margin-top:22px;
  }
`;
const GroupBox_mobile = styled.div`
  margin-bottom: 5px;
  & .boxTitle {
    margin-bottom:5px;
    font-size: 20px;
  }
  .boxContent{
    margin-top:22px;
  }
`;

class EditGroupListContainer extends Component {
  state = { reload: false };
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.id, null, null);
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  setOut = async (target) => {
    const isconfirm = await confirm("선택하신 그룹을 이 그룹에서 삭제하시겠습니까?","예","아니오");
    if (!isconfirm) {
      return;
    }
    this.props.DeleteGroupInGroupRequest(this.props.id, target)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetGroupInGroupRequest(this.props.id, null, null);
        }
      }).catch(err => {
        console.error(err);
      });
  }
  render() {
    const { reload } = this.state;
    return (
      <React.Fragment>
        {
          window.innerWidth<500?
          <GroupBox_mobile style={{marginBottom:`${this.props.EditDesignList&&this.props.EditDesignList.length==0?"0px":"75px"}`}}>
          <div className="boxTitle">등록된 그룹 ({this.props.EditGroupList.length})</div>
          {this.props.status === "INIT" ?
            <Loading /> :
            <div className="boxContent">
            <ScrollList_mobile
              height={"max-content"}
              {...opendesign_mobile_style.group_margin}
              reload={reload}
              handleReload={this.handleReload}
              type="group"
              dataListAdded={this.props.EditGroupList}
              getListRequest={null}
              acceptText={"삭제"}
              handleAccept={this.setOut}/>
            {/* <ScrollList_mobile
              {...opendesign_mobile_style.group_margin}
              reload={reload}
              handleReload={this.handleReload}
              type="group"
              dataListAdded={this.props.EditGroupList}
              getListRequest={null}
              rejectText={"삭제"}
              handleReject={this.setOut} /> */}
              </div>
              }
        </GroupBox_mobile>
        :
        <GroupBox style={{marginBottom:`${this.props.EditDesignList&&this.props.EditDesignList.length==0?"0px":"75px"}`}}>
        <div className="boxTitle">등록된 그룹 ({this.props.EditGroupList.length})</div>
        {this.props.status === "INIT" ?
          <Loading /> :
          <div className="boxContent">
          <ScrollList
            {...osdstyle.group_margin}
            reload={reload}
            handleReload={this.handleReload}
            type="group"
            dataListAdded={this.props.EditGroupList}
            getListRequest={null}
            rejectText={"삭제"}
            handleReject={this.setOut} />
            </div>
            }
      </GroupBox>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditGroupList: state.Group.status.GroupInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupInGroupRequest: (id, page, sort) => {
      return dispatch(GetGroupInGroupRequest(id, page, sort))
    },
    DeleteGroupInGroupRequest: (id, groupId) => {
      return dispatch(DeleteGroupInGroupRequest(id, groupId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupListContainer);
