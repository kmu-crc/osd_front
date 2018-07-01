import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import { Link } from "react-router-dom";
import FormDataToJson from "modules/FormDataToJson";
import eximg from "source/topDesign.png";
import StyleGuide from "StyleGuide";

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
  & .userInfo > span.status button {
    margin-left: 5px;
    font-size: ${StyleGuide.font.size.small};
  }
`;

const BtnWrapper = styled.div`
  text-align: right;
  position: absolute;
  top: 30px;
  right: 2rem;
  & button {
    margin-right: 3px;
    font-size: ${StyleGuide.font.size.small};
  }
`;

const TextArea = styled.div`
  padding: 15px 10px;
`;

const CommentContainer = styled.div`
  width: 100%;
  & button {
    font-size: ${StyleGuide.font.size.small};
  }
  & .ui.form .field {
    margin-bottom: 1rem;
  }
  & .ui.form textarea:not([rows]) {
    min-height: 2rem;
  }
  & .reply.form > .button {
    font-size: ${StyleGuide.font.size.small};
  }
  &.ui.comments {
    max-width: 100%;
  }
`;

class DesignIssueDetail extends Component {
  state = {
    render: true
  }

  deleteIssue = () => {
    this.props.DeleteDesignIssueRequest(this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
    .then(data => {
      this.props.history.push(`/designDetail/${this.props.match.params.id}/issue`);
    });
  }

  updateIssueStatus = () => {
    let nextStatus; 
    if (this.props.IssueDetail.is_complete === 1) {
      nextStatus = { status: 0 }
    } else {
      nextStatus = { status: 1}
    }
    this.props.UpdateIssueStatusRequest(nextStatus, this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
    .then(data => {
      if (data.success === true) {
        this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
      }
    });
  }

  onSubmitForm = async (data) => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    this.props.CreateIssueCommentRequest(FormDataToJson(data), this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
    .then(async res => {
      if (res.success === true) {
        this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
      }
      await this.setState({
        render: false
      });
      this.setState({
        render: true
      });
    });
  }

  deleteComment = (id) => {
    this.props.DeleteIssueCommentRequest(this.props.match.params.id, this.props.match.params.issue_id, id, this.props.token)
    .then(res => {
      if (res.success === true) {
        this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
      }
    });
  }

  render(){
    let data = this.props.IssueDetail;
    const user = this.props.userInfo;

    const CommentForm = () => {
      return (
        <ValidateForm ref={ref => this.commandForm = ref} onSubmit={this.onSubmitForm} className="ui reply form">
          <FormField name="comment" validates={["required"]} RenderComponent={FormTextArea} />
          <Button type="submit" className="ui icon primary left labeled button">
            <i aria-hidden="true" className="edit icon"></i>
            댓글쓰기
          </Button>
        </ValidateForm>
      );
    }
    
    return(
      <IssueWrapper>
        <div className="ui fluid container">
          <h2 className="ui header">{data.title}</h2>
          <div className="userInfo">
            <span className="userName">작성자 : {data.userName}</span>
            <span className="createDate">업로드 : {data.create_time && data.create_time.split("T")[0]}</span>
            <span className="status">
              상태 : { data.is_complete === 0? "진행중" : "완료" }
              {user && user.uid === data.user_id &&
                <Button onClick={this.updateIssueStatus}>
                  {data.is_complete === 0? "완료하기" : "진행중으로 변경"}
                </Button>
              }
            </span>
          </div>
          {user && user.uid === data.user_id &&
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
                  <img src={comm.s_img? comm.s_img : eximg} alt="profile" />
                </div>
                <div className="content">
                  <a className="author">{comm.nick_name}</a>
                  <div className="metadata">
                    <div>{comm.create_time.split("T")[0]}</div>
                  </div>
                  <div className="text">{comm.comment}</div>
                </div>
                {user && user.uid === comm.user_id &&
                <Button onClick={()=>this.deleteComment(comm.uid)}>삭제</Button>
                }
              </div>
            ))
          :
            <p>등록된 코멘트가 없습니다.</p>
          }
          {this.state.render? <CommentForm/> : null}
        </CommentContainer>
        <Link to={`/designDetail/${this.props.match.params.id}/issue`}>
          <button className="ui button">목록</button>
        </Link>
      </IssueWrapper>
    );
  }
} 

export default DesignIssueDetail;