import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DesignInGroupClear, GetDesignInGroupRequest, DeleteDesignInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import osdstyle from "opendesign_style";
import Loading from 'components/Commons/Loading';
import { confirm } from 'components/Commons/Confirm/Confirm';
import opendesign_mobile_style from "opendesign_mobile_style";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";

const DesignBox = styled.div`
margin-bottom: 5px;
& .boxTitle {
  margin-bottom:5px;
  font-size: 20px;
}
.boxContent{
  margin-top:22px;
}
`;
const DesignBox_mobile = styled.div`
margin-bottom: 5px;
& .boxTitle {
  margin-bottom:5px;
  font-size: 20px;
}
.boxContent{
  margin-top:22px;
}
`;

class EditDesignListContainer extends Component {
  state = { reload: false };
  componentWillMount() {
    this.props.GetDesignInGroupRequest(this.props.id, null, null);
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  setOut = async (target) => {
    const isconfirm = await confirm("이 디자인을 그룹에서 삭제하시겠습니까?", "예", "아니오");
    if (!isconfirm) {
      return;
    }
    this.props.DeleteDesignInGroupRequest(this.props.id, target)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetDesignInGroupRequest(this.props.id, null, null)
            .then(() => { this.handleReload(); })
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
          <DesignBox_mobile style={{marginBottom:`${this.props.EditDesignList&&this.props.EditDesignList.length==0?"0px":"75px"}`}}>
          <div className="boxTitle">등록된 디자인 ({this.props.EditDesignList.length})</div>
          {this.props.status === "INIT" ?
            <Loading /> :
            <div className="boxContent">
              <ScrollList_mobile
              id="scroll-list"
              {...opendesign_mobile_style.design_margin}
              reload={reload}
              handleReload={this.handleReload}
              type="design"
              dataListAdded={this.props.EditDesignList}
              getListRequest={null}
              handleReject={this.setOut}
              />
            {/* <ScrollList_mobile
              {...opendesign_mobile_style.design_margin}
              reload={reload}
              handleReload={this.handleReload}
              type="design"
              dataListAdded={this.props.EditDesignList}
              getListRequest={null}
              handleReject={this.setOut} /> */}
              </div>
              }
        </DesignBox_mobile>
        :
        <DesignBox style={{marginBottom:`${this.props.EditDesignList&&this.props.EditDesignList.length==0?"0px":"75px"}`}}>
        <div className="boxTitle">등록된 디자인 ({this.props.EditDesignList.length})</div>
        {this.props.status === "INIT" ?
          <Loading /> :
          <div className="boxContent">
          <ScrollList
            {...osdstyle.design_margin}
            reload={reload}
            handleReload={this.handleReload}
            type="design"
            dataListAdded={this.props.EditDesignList}
            getListRequest={null}
            handleReject={this.setOut} />
            </div>
            }
      </DesignBox>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.Group.MyExistList,
    EditDesignList: state.Group.status.DesignInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DesignInGroupClear: (data) => {
      return dispatch(DesignInGroupClear(data))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    },
    DeleteDesignInGroupRequest: (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDesignListContainer);
