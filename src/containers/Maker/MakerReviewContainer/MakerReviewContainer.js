import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMakerReviewListRequest } from "actions/Review";
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

class MakerReviewContainer extends Component {
  componentDidMount() {
    this.props.GetMakerReviewListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMakerReviewListRequest(this.props.id, page);

  render() {
    return (
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
  dataList: state.ReviewList.status.MakerList,
  dataListAdded: state.ReviewList.status.MakerListAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMakerReviewListRequest: (id, page) => dispatch(GetMakerReviewListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MakerReviewContainer);
