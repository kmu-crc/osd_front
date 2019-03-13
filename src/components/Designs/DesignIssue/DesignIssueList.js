import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid, Search, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
// import ValidateForm from "components/Commons/ValidateForm";
// import { FormInput } from "components/Commons/FormItem";
// import FormDataToJson from "modules/FormDataToJson";

// css styling

const IssueWrapper = styled(Grid)`
  position: relative;
  & .noData {
    font-size: 14px;
    text-align: center;
  }
`;

const SearchWrapper = styled(Grid.Row)`
  & .ui.icon.input {
    width: 100%;
  }
  & .searchBtn {
    background: transparent;
    border: none;
    position: absolute;
    height: 100%;
    width: 38px;
    top: 0;
    right: 20px;
  }
  & .ui.search .search.icon {
    display: none;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
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

class DesignIssueList extends Component {
  state = {
    keyword: "",
    searchMode: false
  }

  getSearchValue = (e) => {
    const value = e.target.value;
    this.setState({
      keyword: value
    });
  }

  submitEnter = (e) => {
    if (e.keyCode === 13) {
      this.onSearchSubmit(this.state.keyword);
    }
  }

  onSearchSubmit = async (data) => {
    this.props.SearchIssueRequest(this.props.match.params.id, this.state.keyword)
    .then(() => {
      this.setState({
        searchMode: true
      });
    });
  }

  render(){
    let issue = this.state.searchMode? this.props.SearchIssue : this.props.DesignIssueList;
    return (
      <IssueWrapper>
        <SearchWrapper columns={2}>
          <Grid.Column>              
            <Search showNoResults={false} onSearchChange={this.getSearchValue} onKeyDown={this.submitEnter}/>
            <button onClick={this.onSearchSubmit} className="searchBtn">
              <i aria-hidden="true" className="search icon"></i>
            </button>
          </Grid.Column>
          <Grid.Column textAlign="right">
            {this.props.token &&
              <Link to={`/designDetail/${this.props.match.params.id}/createissue`}>
                <Button>글쓰기</Button>
              </Link>
            }
          </Grid.Column>
        </SearchWrapper>
        <ListWrapper>
          {issue.length !== 0?
          <ul>
            {issue.map(list =>
            <Link key={list.uid} to={`/designDetail/${this.props.match.params.id}/issue/${list.uid}`}>
              <List>
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
            </Link>
            )}
          </ul>
          :
          <div className="noData">
              <p>{/*등록된 이슈가 없습니다.*/}</p>
          </div>
          }
        </ListWrapper>
      </IssueWrapper>
    );
  }
}

export default DesignIssueList;
