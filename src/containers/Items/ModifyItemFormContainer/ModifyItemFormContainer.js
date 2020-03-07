import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UpdateItemRequest, GetItemDetailRequest } from "actions/Item";
// import { SearchMemberRequest } from "actions/Commons/Search";
import ModifyItemInfo from "components/Items/ModifyItemInfo";

class ModifyItemFormContainer extends Component {
  state = {
    valid: false
  };
  componentDidMount() {
    this.props.GetItemDetailRequest(this.props.id, this.props.token)
      .then(() => {
        if (this.props.userInfo.uid !== this.props.ItemDetail.user_id
          && (this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1)) {
          alert("이 아이템에 대한 수정권한이 없습니다.\n이전페이지로 돌아갑니다.");
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
          ? <ModifyItemInfo {...this.props} />
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
});
const mapDispatchToProps = (dispatch) => ({
  GetItemDetailRequest: (id, token) => dispatch(GetItemDetailRequest(id, token)),
  UpdateItemRequest: (data, id, token) => dispatch(UpdateItemRequest(data, id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyItemFormContainer));
