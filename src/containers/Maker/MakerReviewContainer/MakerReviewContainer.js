import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMakerReviewListRequest } from "actions/Review";
import ScrollList from "components/Commons/ScrollList";
import Review from "components/Items/Review";
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

class MakerReviewContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      page:0,
    }
  }
  componentDidMount() {
    this.props.GetMakerReviewListRequest(this.props.id, 0);
  }
  getList = page =>{
    this.setState({page:page+1});
    this.props.GetMakerReviewListRequest(this.props.id, page);
  }

  render() {
    const RenderingStar = (props)=>{
      return <Rating name="score" size="tiny" icon='star' defaultRating={parseInt(props.score,10)||0} maxRating={5} disabled/>
    }
    const allpage = this.props.count;
    const lastPage = parseInt(this.props.count / 4, 10);

    return (
      <React.Fragment>
      <ContentsBox>
            { this.props.count != 0?
              this.props.dataList.map((item,index)=>{
                return (
                  <Wrapper_ onClick={() => this.props.handler(item)}>
                    <Thumbnail imageURL={item.m_img} />
                    <div className="content">
                      <div className="wrapper">
                      <div className="nick_ line marginRight">{item.nick_name}</div>
                      <div className="row"><RenderingStar score={item.score}/></div>
                      </div>
                      <div className="text_">{item.comment && item.comment.slice(0, 64)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
                    </div>
                  </Wrapper_>)
              }):<div className="blank">리뷰 없음</div>
            }
            <div className="pagenation">
              { this.props.count >4?
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
      // <React.Fragment>
      // <ReviewBox
      // isScroll={this.props.dataListAdded.length>2?true:false}
      // >
      //   <ScrollList
      //     handler={this.props.handler}
      //     scrollId={"review-scroller"}
      //     cols={2}
      //     type="review"
      //     getListRequest={this.getList}
      //     ListComponent={Review}
      //     dataList={this.props.dataList}
      //     dataListAdded={this.props.dataListAdded} />
      // </ReviewBox>
      // </React.Fragment>
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
