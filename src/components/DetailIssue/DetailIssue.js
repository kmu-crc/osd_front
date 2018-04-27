import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Columns, Row } from "../Grid/index";

// css styling
const IssueWrapper = styled.div`
  min-width: 660px;
  position: relative;
  padding: 20px 0;
  background-color: #FAFBFC;
`;

const SearchWrapper = Columns.extend`
  float: none;
  margin: auto;
  & input {
    width: 20%;
    float: left;
    height: 30px;
  }
  & button {
    float: left;
    height: 30px;
    background-color: #e6ebf1;
    border: none;
  }
  & button.red {
    float: right;
    background-color: dimgray;
    font-size: 13px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const List = Columns.extend`
  height: 100%;
  float: none;
  margin: auto;
  & li {
    cursor: pointer;
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #e6ebf1;
  }
  & li:hover {
    background-color: #e6ebf1;
  }
  & li div {
    float: left;
    text-align: center;
    font-size: 13px;
  }
  & li .order {
    width: 10%;
  }
  & li .title {
    width: 50%;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
  }
  & li .user {
    width: 15%;
  }
  & li .date {
    width: 15%;
  }
  & li .cmtCount {
    width: 10%;
  }
  & li .flag {
    background-color: #0366d6;
    color: #fff;
    font-size: 13px;
    margin-left: 10px;
  }
  & li .flag.done {
    background-color: #f00;
  }
`;

class DetailIssue extends Component {
  render(){
    let issue = this.props.DesignDetailIssue;
    return(
      <div>
        {issue.length !== 0 &&
          <IssueWrapper>
            <SearchWrapper width={10}>
              <input placeholder="검색어를 입력해 주세요"/>
              <button>SEARCH</button>
              <button className="red"><Link to="">글쓰기</Link></button>
              <Row/>
            </SearchWrapper>
            <ListWrapper>
              <ul>
                {issue.map(list => 
                <List xs={12} sm={12} md={12} width={10} key={list.uid}>
                  <li>
                    <div className="order">{list.uid}</div>
                    <div className="title">
                    {list.title}
                    {list.is_complete === 0? <span className="flag ing">진행중</span> : <span className="flag done">완료</span>}
                    </div>
                    <div className="user">kwonjong</div>
                    <div className="date">{list.create_time.split("T")[0]}</div>
                    <div className="cmtCount">{list.commentCount["count(*)"]}</div>
                    <Row/>
                  </li>
                </List>
                )}
              </ul>
            </ListWrapper>
          </IssueWrapper>
        }
      </div>
    );
  }
}

export default DetailIssue;
