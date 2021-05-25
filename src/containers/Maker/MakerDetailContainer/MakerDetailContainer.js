import React, { Component } from "react";
import { connect } from "react-redux";
import MakerDetail from "components/Makers/MakerDetail";
import MakerDetail_mobile from "mobileComponents/MakerDetail_mobile";
import { GetExpertMakerViewDetailRequest } from "actions/Expert";
import { LikeMakerRequest, UnlikeMakerRequest, GetLikeMakerRequest } from "actions/Maker";
import { CreateRequestRequest, GetMakerRequestListRequest } from "actions/Request";
import { GetTotalCountMakerReviewRequest } from "actions/Review";
import styled from "styled-components";
const Wrapper = styled.div`
  margin:20px 30px
`
const Wrapper_mobile = styled.div`
  margin:0px 10px;
`
class MakerDetailContainer extends Component {
  componentWillMount() {
    this.props.GetExpertMakerViewDetailRequest(this.props.id)
      .then(this.props.userInfo && this.props.GetLikeMakerRequest(this.props.id, this.props.token))
      .then(this.props.GetTotalCountMakerReviewRequest(this.props.id));
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <Wrapper>
            <MakerDetail {...this.props} />
          </Wrapper>
          :
          <Wrapper_mobile>
            <MakerDetail_mobile {...this.props}/>
          </Wrapper_mobile>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  like: state.MakerLike.status.like,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  MakerViewDetail: state.MakerDetail.status.MakerViewDetail,
  ReviewCount: state.ReviewList.status.MakerTotal,
});

const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
  GetMakerRequestListRequest: (id, page) => dispatch(GetMakerRequestListRequest(id, page)),
  GetExpertMakerViewDetailRequest: (id) => dispatch(GetExpertMakerViewDetailRequest(id)),
  LikeMakerRequest: (id, token) => dispatch(LikeMakerRequest(id, token)),
  UnlikeMakerRequest: (id, token) => dispatch(UnlikeMakerRequest(id, token)),
  GetLikeMakerRequest: (id, token) => dispatch(GetLikeMakerRequest(id, token)),
  GetTotalCountMakerReviewRequest: (id) => dispatch(GetTotalCountMakerReviewRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
