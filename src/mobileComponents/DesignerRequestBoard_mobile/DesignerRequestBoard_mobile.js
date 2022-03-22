import React, { Component } from 'react';
import ScrollBoardList from "components/Commons/ScrollBoardList";
// import RequestMyDetailElement from "components/Request/RequestMyDetailElement";
import RequestListElement_mobile from "components/Request/RequestListElement_mobile";

import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import market_style from "market_style";

// CSS STYLING
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  &.left {
    margin-left: auto;
  }
`;
const Content = styled(ContentBox)`
  margin-top: ${props => props.top}px;
  width: 100%;
  // @media only screen and (max-width: 991px) and (min-width: 768px){
  //   & .ui.grid>.row{
  //     margin-left: 6.25% !important;
  //   }
  // }
  background-color: ${props => props.bgcolor || "#FFFFFF"};
`;
//const RequestButton = styled.div`
//  margin-left: 100px;
//  width: 150px;
//  color: #FF0000;
//  font-family: Noto Sans KR;
//  font-size: 20px;
//  line-height: 29px;
//`;
//const Container = styled.div`
//  display: flex;
//  .categoy {
//    width: max-content;
//  }
//  .sort {
//    width: max-content;
//    margin-left: auto;
//  }
//  .request {
//    width: max-content;
//  }
//`;
const ListElement = styled.div`
  // width:100%;
  // height:36px;
  border: 1px solid #d7d7d7;
  // padding:6px 54px 6px 40px;
  // display:flex;
  // margin-bottom:10px;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:8px 10px;
  .title{
    width:60%;
    min-width:60px;
    max-width:100px;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
    // margin-right:5%;

  }
  // .writer{
  //   width:21%;
  //   min-width:max-content;
  //   display:flex;
  //   align-items:center;
  //   font-size:${market_style.font.size.mini2};
  // }
  .sub{
    min-width:151px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .writer{
      margin-left:5px;
      width:60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:${market_style.font.size.mini2};
    }
    .date{
      width:40px;
      margin-left:14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:${market_style.font.size.mini2};
    }
  // .date{

  //   width:4%;
  //   min-width:max-content;
  //   display:flex; 
  //   justify-content:center;
  //   align-items:center;
  //   font-size:${market_style.font.size.mini2};
  //   }
    @media only screen and (min-width: 500px) and (max-width:1000px){
      padding:6px 20px 6px 20px;
      .title{
        min-width:70%;
      }
      .writer{
        min-width:16%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
`;

export default class DesignerRequestBoard_mobile extends Component {
    getList = (page) =>
        this.props.getList(page); 

    render() {
        return (<React.Fragment>
            <Content top={0}>
                {
                this.props.dataList.length >0?
                <ListElement>
                <div className="title">제목</div>
                <div className='sub'>
                <div className="writer">글쓴이</div>
                <div className="date">작성일</div>
                </div>
                </ListElement>
                :null
                }
                <ScrollBoardList getListRequest={this.getList} ListComponent={RequestListElement_mobile} dataList={this.props.dataList} total={this.props.Count}
                    mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} />
            </Content>
        </React.Fragment>)
    }
}
