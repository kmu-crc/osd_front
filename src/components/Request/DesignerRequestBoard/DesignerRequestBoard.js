import React, { Component } from 'react';
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestElement from "components/Request/RequestListElement";
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
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
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
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size:${market_style.font.size.mini2};
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
  .title_{
    min-width:67%;
    display:flex;
    align-items:center;
    padding:5px;
  }
  .writer{
    min-width:10%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
  }
  .date{
    min-width:20%;
    align-items:center;
    padding:5px;
  }
  // .title{
  //   min-width:70%;
  //   padding:5px;
  // }
  // .writer{
  //   min-width:10%;
  //   padding:5px;
  //   display:flex;
  //   // justify-content:center;
  // }
  // .date{
  //   min-width:20%;
  //   padding:5px;
  //   display:flex;
  //   // justify-content:center;
  // }
`;

export default class DesignerRequestBoard extends Component {
    getList = (page) =>
        this.props.getList(page);

    render() {
        return (<React.Fragment>
            <Content top={0}>
                <ListElement>
                    {/* title   */}<div className="title_">제목</div>
                    {/* writer  */}<div className="writer">글쓴이</div>
                    {/* date    */}<div className="date">작성일</div>
                </ListElement>
                <Wrapper className="listWrap">
                    {/* {this.state.rendering ? */}
                    <ScrollBoardList getListRequest={this.getList} ListComponent={RequestElement} dataList={this.props.dataList} total={this.props.Count}
                        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} />
                     {/* : null} */}
                </Wrapper>
            </Content>
        </React.Fragment>)
    }
}
