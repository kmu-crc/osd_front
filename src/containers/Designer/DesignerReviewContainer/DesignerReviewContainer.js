import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetDesignerReviewListRequest } from "actions/Review";
import ScrollList from "components/Commons/ScrollList";
import Review from "components/Items/Review";
import styled from "styled-components";

const ReviewBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    &:hover {
      overflow: auto;
      overflow-y: overlay;
    }
`;
class DesignerReviewContainer extends Component {

  componentDidMount() {
    this.props.GetDesignerReviewListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetDesignerReviewListRequest(this.props.id, page);

  render() {
    return (
        // 리뷰목록
        <ReviewBox>
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
