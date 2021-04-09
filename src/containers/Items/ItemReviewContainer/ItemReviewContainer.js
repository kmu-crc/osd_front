import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemReview from "components/Items/ItemReview";
import { GetItemReviewRequest, CreateItemReviewRequest, /*DeleteItemReviewRequest*/ } from "actions/Item";
import { GetItemPaymentRequest } from "actions/Payment";
import styled from "styled-components";
import market_style from "market_style";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'
const ReviewBox = styled.div`
    // height: 100%;
    // overflow:${props=>props.isScroll?"overlay":"hidden"};
`;
const ContentsBox = styled.div`
  min-width:103%;
  display:flex;
  flex-wrap:wrap;
  height:max-content;
  max-height:300px;
  .blank{
    width:97%;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .pagenation{
    width:100%;
    display:flex;
    justify-content:center;
    border:1px soild black;
  }
`
const Wrapper_ = styled.div`
  min-width:600px;
  max-width:600px;
  height:113px;
  display:flex;
  color:#707070;
  margin-right:30px;
  margin-bottom:10px;
  margin-top:10px;
  .wrapper{
    display:flex;
    .line{
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
    }
    .marginRight{
      margin-right:49px;
    }
    .nick_{
      width:max-content;
      max-width:100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:${market_style.font.size.small1};
      font-weight:500;
    }
  }

  .content{
    width:100%;
    height:100%;
    margin-left:10px;
    .row{
      width: max-content;
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
    }
    .text_{
      margin-top:28px;
      margin-bottom: 10px;
      overflow:hidden;
      text-overflow:ellipsis;
      word-wrap:break-word;
      font-size:${market_style.font.size.small1};
      font-weight:300;
    }
  }
  cursor:pointer;
  :hover{ background-color: #EFEFEF;}
`;
const Thumbnail = styled.div`
  min-width:150px;
  min-height:113px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
`;
class ItemReviewContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:0,
          }
        this.requestReview = this.requestReview.bind(this);
        this.getData = this.getData.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        this.props.GetItemReviewRequest(this.props.match.params.id, 0)
        .then(
            ()=>{
                console.log(this.props.review.length);
                return this.props.isExpanding(this.props.review.length>1?true:false);
            }
        )
        this.props.userInfo && this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0);
    }
    refresh() {
        this.props.GetItemReviewRequest(this.props.match.params.id, 0);
        this.props.userInfo && this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0);
    }
    getList = page =>{
        this.setState({page:page+1});
        this.props.GetMakerReviewListRequest(this.props.id, page);
    }
    requestReview(data) {
        this.props.CreateItemReviewRequest(data, this.props.match.params.id, this.props.token)
            .then(res =>
                res.data.success &&
                this.props.GetItemReviewRequest(this.props.match.params.id, 0))
            .then(
                this.props.userInfo &&
                this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0))

    }
    getData(page) {
        this.props.GetItemReviewRequest(this.props.match.params.id, page);
    }
    render() {
        return (
            <ReviewBox>
            <ItemReview
            refresh={this.refresh}
            handler={this.props.handler}
            id={this.props.match.params.id}
            getData={this.getData}
            request={this.requestReview}
            {...this.props} />
            </ReviewBox>
            );
    }
}

const mapStateToProps = (state) => ({
    ItemDetail: state.ItemDetail.status.ItemDetail,
    payment: state.Payment.status.Payment,
    review: state.ItemReview.status.Review,
    total: state.ItemReview.status.Total,
    score: state.ItemReview.status.TotalScore,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemReviewRequest: (id, page) => dispatch(GetItemReviewRequest(id, page)),
    CreateItemReviewRequest: (data, id, token) => dispatch(CreateItemReviewRequest(data, id, token)),
    GetItemPaymentRequest: (id, token, page) => dispatch(GetItemPaymentRequest(id, token, page))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemReviewContainer));
