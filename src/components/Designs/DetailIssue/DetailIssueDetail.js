import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Comment } from "semantic-ui-react";

// css styling

const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  background-color: #fff;
  &.ui.grid {
    padding: 10px 20px 40px;
  }
  & .ui.fluid.container {
    margin-bottom: 30px;
    padding: 1rem;
  }
`;

const CommentContainer = styled(Comment)`
  max-width: 100%;
  width: 100%;
  text-align: center;
  & .reply.form .field {
    margin-bottom: 1rem;
  }
  & .reply.form > .button {
    float: right;
  }
`;

class DetailIssueDetail extends Component {
  render(){
    let data = this.props.data;
    return(
      <IssueWrapper>
        <div className="ui fluid container">
          <h2 className="ui header">{data.title}</h2>
          <p>{data.content}</p>
        </div>
        <CommentContainer>
          {this.props.data.comment != null?
          this.props.data.comment.map(comm=>(
            <div className="comment" key={comm.uid}>
              <div className="avatar">
                <img src="" alt="profile" />
              </div>
              <div className="content">
                <a className="author">{comm.user_id}</a>
                <div className="metadata">
                  <div>{comm.create_time.split("T")[0]}}</div>
                </div>
                <div className="text">{comm.comment}</div>
              </div>
            </div>
            ))
          :
          <p>등록된 코멘트가 없습니다.</p>
          }
          <form className="ui reply form">
            <div className="field">
              <textarea rows="3"></textarea>
            </div>
            <button className="ui icon primary left labeled button">
              <i aria-hidden="true" className="edit icon"></i>
              댓글쓰기
            </button>
          </form>
        </CommentContainer>
        <div>
        <button className="ui button" onClick={this.props.handleClick}>목록</button></div>
      </IssueWrapper>
    );
  }
} 

export default DetailIssueDetail;