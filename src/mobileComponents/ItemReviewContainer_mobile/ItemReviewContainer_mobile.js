import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemReview from "components/Items/ItemReview";
import { CreateItemReviewRequest, /*DeleteItemReviewRequest*/ } from "actions/Item";
import { GetItemPaymentRequest } from "actions/Payment";
import { GetItemReviewRequest } from "actions/Review";
import styled from "styled-components";
import market_style from "market_style";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'
const ReviewBox = styled.div`
    min-width:103%;
    height: 100%;

    overflow:${props=>props.isScroll?"overlay":"hidden"};
`;

const ContentsBox = styled.div`
  min-width:103%;
  display:flex;
  flex-wrap:wrap;

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
  }
  .viewmore{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#F7F7F7;
    padding:5px;
    border-radius:5px;
    color:#A5A5A5;
    margin-top:10px;
  }
  @media only screen and (min-width: 1366px){
    height:300px;
  }
  @media only screen and (min-width: 500px) and (max-height:1366px){
    height:max-content;
  }
`
const Wrapper_ = styled.div`
  width:100%;
  height:113px;
  display:flex;
  color:#707070;
  margin-top:10px;
  .wrapper{
    display:flex;
    justify-content:space-between;
    .line{
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
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
    height:100%;
    padding-left:10px;
    .row{
      width: max-content;
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
    }
    .text_{
      height:60px;
      margin-top:25px;
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
class ItemReviewContainer_mobile extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:0,viewmore:false,
          }
    }
    componentDidMount() {
        this.props.GetItemReviewRequest(this.props.match.params.id, 0);
        this.props.userInfo && this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0);
    }
    getList = page =>{
        this.setState({page:page+1,viewmore:true});
        this.props.GetItemReviewRequest(this.props.ItemDetail.item_id, page);
    }
    render() {
      console.log(this.props);
      const RenderingStar = (props)=>{
        return <Rating name="score" size="tiny" icon='star' defaultRating={parseInt(props.score,10)||0} maxRating={5} disabled/>
      }
      return (
          <React.Fragment>
            <ContentsBox>
                  { this.props.total != 0?
                    this.props.dataListAdded&&this.props.dataListAdded.map((item,index)=>{
                      if(index>1)return null;
                      return (
                        <Wrapper_ onClick={() => this.props.handler(item)}>
                          <Thumbnail imageURL={item.m_img} />
                          <div className="content">
                            <div className="wrapper">
                            <div className="nick_ line marginRight">{item.nick_name}</div>
                            <div className="row"><RenderingStar score={item.score}/></div>
                            </div>
                            <div className="text_">{item.comment && item.comment.slice(0, 40)}{item.comment && item.comment.length > 40 ? "..." : ""}</div>
                          </div>
                        </Wrapper_>)
                    }):<div className="blank">리뷰 없음</div>
                  }
                  { this.state.viewmore&&this.props.total != 0&&
                    this.props.dataListAdded.map((item,index)=>{
                      if(index<2)return null;
                      return (
                        <Wrapper_ onClick={() => this.props.handler(item)}>
                          <Thumbnail imageURL={item.m_img} />
                          <div className="content">
                            <div className="wrapper">
                            <div className="nick_ line marginRight">{item.nick_name}</div>
                            <div className="row"><RenderingStar score={item.score}/></div>
                            </div>
                            <div className="text_">{item.comment && item.comment.slice(0, 50)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
                          </div>
                        </Wrapper_>)
                    })
                  }
                  {this.props.dataList.length > 2&&<div className="viewmore" onClick={()=>this.getList(this.state.page)}>▾</div>}
            </ContentsBox>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
  ItemDetail: state.ItemDetail.status.ItemDetail,
  payment: state.Payment.status.Payment,
  review: state.ItemReview.status.Review,
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.ReviewList.status.ItemReviewList,
  dataListAdded: state.ReviewList.status.ItemReviewListAdded,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemReviewRequest: (id, page) => dispatch(GetItemReviewRequest(id, page)),
    CreateItemReviewRequest: (data, id, token) => dispatch(CreateItemReviewRequest(data, id, token)),
    GetItemPaymentRequest: (id, token, page) => dispatch(GetItemPaymentRequest(id, token, page))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemReviewContainer_mobile));
