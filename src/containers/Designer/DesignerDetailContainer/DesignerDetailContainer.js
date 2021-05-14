import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerDetail from "components/Designers/DesignerDetail";
import DesignerDetail_mobile from "mobileComponents/DesignerDetail_mobile"
import { GetExpertDesignerViewDetailRequest } from "actions/Expert";
import { LikeDesignerRequest, UnlikeDesignerRequest, GetLikeDesignerRequest } from "actions/Designer";
import { CreateRequestRequest, GetDesignerRequestListRequest } from "actions/Request";
import { GetTotalCountDesignerReviewRequest } from "actions/Review";
import styled from "styled-components";
const Wrapper = styled.div`
  margin:20px 30px
`
const Wrapper_mobile = styled.div`
  margin:0px 15px;
`
class DesignerDetailContainer extends Component {
  componentWillMount() {
    this.props.GetExpertDesignerViewDetailRequest(this.props.id)
      .then(this.props.userInfo && this.props.GetLikeDesignerRequest(this.props.id, this.props.token))
      .then(this.props.GetTotalCountDesignerReviewRequest(this.props.id))
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
            <Wrapper>
            <DesignerDetail {...this.props} />
            </Wrapper>
          :
            <Wrapper_mobile>
            <DesignerDetail_mobile {...this.props} />
            </Wrapper_mobile>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  token: state.Authentication.status.token,
  like: state.DesignerLike.status.like,
  Count: state.DesignerDetail.status.Count,
  ReviewCount: state.ReviewList.status.Total,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  DesignerViewDetail: state.DesignerDetail.status.DesignerViewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  GetTotalCountDesignerReviewRequest: (id) => dispatch(GetTotalCountDesignerReviewRequest(id)),
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
  GetDesignerRequestListRequest: (id, page) => dispatch(GetDesignerRequestListRequest(id, page)),
  GetExpertDesignerViewDetailRequest: (id) => dispatch(GetExpertDesignerViewDetailRequest(id)),
  LikeDesignerRequest: (id, token) => dispatch(LikeDesignerRequest(id, token)),
  UnlikeDesignerRequest: (id, token) => dispatch(UnlikeDesignerRequest(id, token)),
  GetLikeDesignerRequest: (id, token) => dispatch(GetLikeDesignerRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignerDetailContainer);
