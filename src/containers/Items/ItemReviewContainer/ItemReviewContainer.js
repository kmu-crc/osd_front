import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemReview from "components/Items/ItemReview";
// import { GetItemReviewRequest, CreateItemReviewRequest, /*DeleteItemReviewRequest*/ } from "actions/Item";
// import { GetItemPaymentRequest } from "actions/Payment";
import { CreateItemReviewRequest} from "actions/Item";
import { GetItemReviewRequest } from "actions/Review";
import styled from "styled-components";
import market_style from "market_style";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'
import WriteReviewModal from "components/Commons/WriteReviewModal"
import ReviewDetailModal from "components/Commons/ReviewDetailModal";

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
  @media only screen and (min-width: 1366px){
    height:300px;
  }
  @media only screen and (min-width: 500px) and (max-height:1366px){
    height:max-content;
  }
`
const Wrapper_ = styled.div`
  width:600px;
  min-width:390px;
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
    .row_{
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
    constructor(props){
      super(props);
      this.state = {
        page:0,reviewDetail:false,detail:null,
      }
    }
    componentDidMount() {
      this.props.GetItemReviewRequest(this.props.id,0);
    }
    getList = page =>
    {
    this.setState({page:page+1});
    this.props.GetItemReviewRequest(this.props.id, page);
    } 
    onSubmitReview = (id,comment,score,thumbnail)=>{
      if(comment.length>0){
         this.props.CreateItemReviewRequest({score:score, comment: comment, payment_id: id, thumbnail:thumbnail},this.props.id,this.props.token)
         .then(()=>{
          this.props.GetItemReviewRequest(this.props.match.params.id, 0);
         }).then(()=>{
           this.props.update();
         })
      }
      this.props.showWriteReview(false);
      this.setState({detail:null,page:0});
      return;
    }
    render() {
      const { payment } = this.props;
      const RenderingStar = (props)=>{
        return <Rating name="score" size="tiny" icon='star' defaultRating={parseInt(props.score,10)||0} maxRating={5} disabled/>
      }
      const lastPage = parseInt(this.props.total / 4, 10);
      console.log(this.props);
        return (
          <React.Fragment>
            <ReviewDetailModal 
                open={this.state.reviewDetail}
                close={() => this.setState({ reviewDetail: false })}
                detail={this.state.detail}
            />
            <WriteReviewModal 
                open={this.props.writeReview}
                close={() => this.props.showWriteReview(false)}
                modify={this.state.detail}
                requestReview = {(uid,comment,score,thumbnail_list) => this.onSubmitReview(uid,comment,score,thumbnail_list)}
                payment_id={payment&&payment.length>0&&payment[0].uid}
                {...this.props}
            />
            <ContentsBox>
                  { this.props.total != 0?
                    this.props.dataList.map((item,index)=>{
                      return (
                        <Wrapper_ onClick={() => {this.setState({detail:item,reviewDetail:true})}}>
                          <Thumbnail imageURL={item.m_img} />
                          <div className="content">
                            <div className="wrapper">
                            <div className="nick_ line marginRight">{item.nick_name}</div>
                            <div className="row_"><RenderingStar score={item.score}/></div>
                            </div>
                            <div className="text_">{item.comment && item.comment.slice(0, 50)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
                          </div>
                        </Wrapper_>)
                    }):<div className="blank">리뷰 없음</div>
                  }
                  <div className="pagenation">
                  { this.props.total >4?
                              <Pagination
                              activePage={this.state.page}
                              boundaryRange={0}
                              defaultActivePage={1}
                              ellipsisItem={null}
                              firstItem={null}
                              lastItem={null}
                              siblingRange={1}
                              totalPages={lastPage + 1}
                              secondary
                              onPageChange={(event, { activePage }) => {
                                this.getList(activePage - 1);
                              }}
                            />:null
                    }
                  </div>
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemReviewContainer));
