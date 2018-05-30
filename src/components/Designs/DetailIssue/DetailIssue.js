import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import CreateIssue from "./CreateIssue.js";
import DetailIssueDetail from "./DetailIssueDetail.js";

// css styling
const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  background-color: #fff;
  &.ui.grid {
    padding: 10px 20px 40px;
  }
  & > .noData {
    font-size: 14px;
    text-align: center;
  }
`;

const SearchWrapper = styled(Grid.Row)`
  & .ui.icon.input {
    width: 90%;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const List = styled.div`
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
  state = {
    showPostPage: false,
    showDetailPage: false
  }

  showPostPage = (e) => {
    this.setState({
      showPostPage: true
    });
  }

  hidePostPage = (e) => {
    this.setState({
      showPostPage: false
    });
  }

  loadIssueDetail = (id) => {
    this.props.GetDesignDetailIssueDetailRequest(this.props.id, id)
    .then(()=>{
      this.setState({
        showDetailPage: true
      });
    });
  }

  hideDetailPage = (e) => {
    this.setState({
      showDetailPage: false
    });
  }

  render(){
    let issue = this.props.DesignDetailIssue;
    return(
      <div>
        {this.state.showPostPage?
        <CreateIssue handleClick={this.hidePostPage} goBack={this.hidePostPage}/>
        :
        this.state.showDetailPage?
        <DetailIssueDetail data={this.props.IssueDetail} handleClick={this.hideDetailPage}/>
        :
        issue.length !== 0?
          <IssueWrapper>
            <SearchWrapper columns={2}>
              <Grid.Column>
                <div className="ui icon input">
                  <input type="text" value="" tabIndex="0" className="prompt" autoComplete="off" />
                  <i aria-hidden="true" className="search icon"></i>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <button className="ui button" onClick={this.showPostPage}>글쓰기</button>
              </Grid.Column>
            </SearchWrapper>
            <ListWrapper>
              <ul>
              {issue.map(list =>
              <List key={list.uid} onClick={()=>this.loadIssueDetail(list.uid)}>
                <li>
                  <div className="order">{list.uid}</div>
                  <div className="title">
                  {list.title}
                  {list.is_complete === 0? <span className="flag ing">진행중</span> : <span className="flag done">완료</span>}
                  </div>
                  <div className="user">{list.userName}</div>
                  <div className="date">{list.create_time.split("T")[0]}</div>
                  <div className="cmtCount">{list.commentCount["count(*)"]}</div>
                </li>
              </List>
              )}
            </ul>
            </ListWrapper>
          </IssueWrapper>
          :
          <IssueWrapper>
            <div className="noData">
                <p>등록된 이슈가 없습니다.</p>
            </div>
          </IssueWrapper>
        }
      </div>
    );
  }
}

export default DetailIssue;
