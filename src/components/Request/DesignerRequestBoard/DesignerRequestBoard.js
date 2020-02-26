import React, { Component } from 'react';
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestElement from "components/Request/RequestListElement";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";

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
const RequestButton = styled.div`
  margin-left: 100px;
  width: 150px;
  color: #FF0000;
  font-family: Noto Sans KR;
  font-size: 20px;
  line-height: 29px;
`;
const Container = styled.div`
  display: flex;
  .categoy {
    width: max-content;
  }
  .sort {
    width: max-content;
    margin-left: auto;
  }
  .request {
    width: max-content;
  }
`;
const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size: 13px;
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
`;

export default class DesignerRequestBoard extends Component {
    getList = (page) =>
        this.props.getList(page);

    render() {
        return (<React.Fragment>
            <Content top={0}>
                <ListElement>
                    {/* title   */}<div style={{ marginRight: "15px" }}>제목</div>
                    {/* writer  */}<div style={{ marginLeft: "auto", marginRight: "15px", display: "flex" }}>글쓴이</div>
                    {/* date    */}<div style={{ marginRight: "15px" }}>작성일</div>
                </ListElement>
                <Wrapper className="listWrap">
                    {/* {this.state.rendering ? */}
                    <ScrollBoardList getListRequest={this.getList} ListComponent={RequestElement} dataList={this.props.dataList} total={this.props.Count}
                        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom" />
                    {/* : null} */}
                </Wrapper>
            </Content>
        </React.Fragment>)
    }
}
