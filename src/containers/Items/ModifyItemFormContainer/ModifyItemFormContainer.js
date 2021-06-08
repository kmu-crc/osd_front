import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DeleteItemRequest, UpdateItemRequest, GetItemDetailRequest, UpdateItemListRequest, UpdateItemListHeaderRequest, CreateItemListHeaderRequest } from "actions/Item";
import ModifyItemInfo from "components/Items/ModifyItemInfo";
import ModifyItemInfo_mobile from "mobileComponents/ModifyItemInfo_mobile";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import { alert } from "components/Commons/Alert/Alert";

const Wrapper = styled(ContentBox)`
  width:100%;
  margin-top:20px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const Wrapper_mobile = styled.div`
  padding:0px 10px;
`

class ModifyItemFormContainer extends Component {
  state = {
    valid: false
  };
  componentDidMount() {
    this.props.GetItemDetailRequest(this.props.id, this.props.token)
      .then(async () => {
        if (this.props.userInfo.uid !== this.props.ItemDetail.user_id
          && (this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1)) {
          await alert("이 아이템에 대한 수정권한이 없습니다.\n이전페이지로 돌아갑니다.");
          this.props.history.go(-1);
        } else {
          this.setState({ valid: true });
        }
      })
  };

  render() {
    const { valid } = this.state;
    return (
      <React.Fragment>

        {valid
          ? 
          window.innerWidth>=500?
          <Wrapper>
          <ModifyItemInfo {...this.props} />
          </Wrapper>
          :
          <Wrapper_mobile>
          <ModifyItemInfo_mobile {...this.props} />
          </Wrapper_mobile>
          : <p style={{ color: "#FFF" }}> 수정권한을 확인 중입니다.</p>}
      </React.Fragment>
    )
  }
}
// host / item / update / id ... data id token
const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  ItemDetail: state.ItemDetail.status.ItemDetail,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  category3: state.CategoryAll.status.category3,
});
const mapDispatchToProps = (dispatch) => ({
  GetItemDetailRequest: (id, token) => dispatch(GetItemDetailRequest(id, token)),
  UpdateItemListHeaderRequest: (id, token, data) => dispatch(UpdateItemListHeaderRequest(id, token, data)),
  CreateItemListHeaderRequest: (id, token, data) => dispatch(CreateItemListHeaderRequest(id, token, data)),
  UpdateItemRequest: (data, id, token) => dispatch(UpdateItemRequest(data, id, token)),
  DeleteItemRequest: (id, token) => dispatch(DeleteItemRequest(id, token)),
  UpdateItemListRequest: (id, list, token, data) => dispatch(UpdateItemListRequest(id, list, token, data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyItemFormContainer));
