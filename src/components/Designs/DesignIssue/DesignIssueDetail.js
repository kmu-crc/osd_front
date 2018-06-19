import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Button } from "semantic-ui-react";
// import Button from "components/Commons/Button";
import { FormCheckBox } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import { Link } from "react-router-dom";
import eximg from "source/topDesign.png";

// css styling

const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  &.ui.grid {
    padding: 1rem;
  }
  & .ui.fluid.container {
    padding: 1rem;
    border: 1px solid #e9e9e9;
  }
  & .userInfo {
    padding: .5rem;
    border-bottom: 1px solid #e9e9e9;
    color: rgba(0,0,0,.4);
    font-weight: 500;
  }
  & .userInfo > span {
    margin-right: 20px;
  }
  & .userInfo > span.status div {
    display: inline;
    margin-left: 5px;
  }
  & .userInfo > span.status div label {
    margin-right: 5px;
  }
`;

const BtnWrapper = styled.div`
  text-align: right;
`;

const TextArea = styled.div`
  padding: 15px 10px;
`;

const CommentContainer = styled.div`
  width: 100%;
  & .reply.form .field {
    margin-bottom: 1rem;
  }
  &.ui.comments .reply.form textarea {
    height: 4em;
  }
  & .reply.form > .button {
    float: right;
  }
  &.ui.comments {
    max-width: 100%;
  }
`;

class DesignIssueDetail extends Component {
  state = {
    changeMode: false
  }

  deleteIssue = () => {
    this.props.DeleteDesignIssueRequest(this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
    .then(data => {
      this.props.history.push(`/designDetail/${this.props.match.params.id}/issue`);
    });
  }

  setChangeMode = () => {
    this.setState({
      changeMode: true
    });
  }

  updateIssueStatus = () => {
    const target = document.getElementById("is_complete");
    this.props.UpdateIssueStatusRequest({status: target.checked}, this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
    .then(res=>{
      if (res.success === true) {
        this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id)
        .then(()=>{
          this.setState({
            changeMode: false
          });
        });
      }
    });
  }

  render(){
    let data = this.props.IssueDetail;
    return(
      <IssueWrapper>
        <div className="ui fluid container">
          <h2 className="ui header">{data.title}</h2>
          <div className="userInfo">
            <span className="userName">작성자 : {data.userName}</span>
            <span className="createDate">업로드 : {data.create_time && data.create_time.split("T")[0]}</span>
            <span className="status">
              상태 : 
              {this.props.userInfo.uid === data.user_id 
              ?
                this.state.changeMode 
                ? <div>
                    <FormField name="is_complete" label="완료하기" checked={data.is_complete} onChange={this.updateIssueStatus} RenderComponent={FormCheckBox}/>
                    <Button onClick={this.updateIssueStatus}>확인</Button>
                  </div>
                : <div>
                    {data.is_complete === 0? "진행중" : "완료"}
                    <Button onClick={this.setChangeMode}>수정</Button>
                  </div>
              : data.is_complete === 0? "진행중" : "완료"
              }
            </span>
          </div>
          {this.props.userInfo.uid === data.user_id &&
            <BtnWrapper>
              <Link to={`/designDetail/${this.props.match.params.id}/issue/${this.props.match.params.issue_id}/modify`}>
                <Button>수정</Button>
              </Link>
              <Button onClick={this.deleteIssue}>삭제</Button>
            </BtnWrapper>
          }
          <TextArea>
            <p>{data.content}</p>
          </TextArea>
        </div>
        <CommentContainer className="ui comments">
          {data.comment != null?
          data.comment.map(comm=>(
            <div className="comment" key={comm.uid}>
              <div className="avatar">
                <img src={eximg} alt="profile" />
              </div>
              <div className="content">
                <a className="author">{comm.nick_name}</a>
                <div className="metadata">
                  <div>{comm.create_time.split("T")[0]}</div>
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
        <Link to={`/designDetail/${this.props.match.params.id}/issue`}>
          <button className="ui button">목록</button>
        </Link>
      </IssueWrapper>
    );
  }
} 

export default DesignIssueDetail;