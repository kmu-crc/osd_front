import React, { Component } from 'react';
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestMyDetailElement from "components/Request/RequestMyDetailElement";
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
  width:100%;
  height:36px;
  border: 1px solid #eaeaea;
  padding:6px 54px 6px 54px;
  display:flex;
  .title{
    min-width:83%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .writer{
    min-width:12%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .date{
    min-width:3%;
    display:flex; 
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.mini2};
    }
`;

export default class DesignerRequestBoard extends Component {
    getList = (page) =>
        this.props.getList(page);

    render() {
        return (<React.Fragment>
            <Content top={0}>
                <ListElement>
                    <div className="title">제목</div>
                    <div className="writer">글쓴이</div>
                    <div className="date">작성일</div>
                </ListElement>
                <Wrapper className="listWrap">
                    <ScrollBoardList getListRequest={this.getList} ListComponent={RequestMyDetailElement} dataList={this.props.dataList} total={this.props.Count}
                        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} />
                </Wrapper>
            </Content>
        </React.Fragment>)
    }
}
