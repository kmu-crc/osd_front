import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetDesignerReviewListRequest } from "actions/Review";
import ScrollList from "components/Commons/ScrollList";
import Review from "components/Items/Review";
import styled from "styled-components";

const ReviewBox = styled.div`
    min-width:103%;
    height: 100%;
    overflow:${props=>props.isScroll?"overlay":"hidden"};
`;
class DesignerReviewContainer extends Component {

  componentDidMount() {
    this.props.GetDesignerReviewListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetDesignerReviewListRequest(this.props.id, page);

  render() {
      console.log(this.props,"---");
    return (
        // 리뷰목록
        <ReviewBox
        isScroll={this.props.dataListAdded.length>2?true:false}
        >
          <ScrollList
            handler={this.props.handler}
            scrollId={"review-scroller"}
            cols={2}
            type="review"
            getListRequest={this.getList}
            ListComponent={Review}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
        </ReviewBox>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.ReviewList.status.List,
  dataListAdded: state.ReviewList.status.ListAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetDesignerReviewListRequest: (id, page) => dispatch(GetDesignerReviewListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignerReviewContainer);
