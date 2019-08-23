import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import { Link } from "react-router-dom";
import FormDataToJson from "modules/FormDataToJson";
import eximg from "source/noimg.png";
import StyleGuide from "StyleGuide";

// css styling

const IssueWrapper = styled(Grid)`
  font-size: ${StyleGuide.font.size.paragraph};
  &.ui.grid > .row {
    padding-bottom: 0;
  }
  & .detailRow {
    border-bottom: 1px solid ${StyleGuide.color.geyScale.scale2};
    & h2 {
      color: ${StyleGuide.color.geyScale.scale7};
      font-size: ${StyleGuide.font.size.heading4};
    }
    & .userInfo {
      padding: .5rem;
      color: ${StyleGuide.color.geyScale.scale5};
      text-align: right;
      & > span {
        margin-right: 20px;
      }
      & > span.status button {
        margin-left: 5px;
      }
    }
  }
  &.ui.grid .row.textArea {
    padding: 1.5rem 1rem;
    color: ${StyleGuide.color.geyScale.scale7};
  }
`;

const BtnWrapper = styled.div`
  & button {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

const CommentContainer = styled.div`
  color: ${StyleGuide.color.geyScale.scale7};
  &.ui.comments {
    max-width: 100%;
    margin: 3rem 0;
    width: 100%;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  & > p {
    text-align: center;
  }
  & .ui.button {
    font-size: ${StyleGuide.font.size.small};
    background: ${StyleGuide.color.sub.bule.basic};
    &:hover {
      border: 0;
      background: ${StyleGuide.color.sub.bule.dark};
    }
  }
  & .ui.form .field {
    margin-bottom: 1rem;
  }
  & .ui.form textarea:not([rows]) {
    min-height: 2rem;
  }
`;

class DesignIssueDetail extends Component {
  state = {
    render: true
  }

  deleteIssue = () => {
    const confirm = window.confirm("이 이슈를 삭제하시겠습니까?");
    if (confirm) {
      this.props.DeleteDesignIssueRequest(this.props.match.params.id, this.props.match.params.issue_id, this.props.token)
      .then(data => {
        this.props.history.push(`/designDetail/${this.props.match.params.id}/issue`);
      });
    } else {
      return;
    }
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
        <Grid.Row columns={2} className="detailRow">
          <Grid.Column width={8}>
            <h2>{data.title}</h2>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="userInfo">
              <span className="userName">작성자 : {data.userName}</span>
              <span className="createDate">업로드 : {data.create_time && data.create_time.split("T")[0]}</span>
              <span className="status">
                상태 : { data.is_complete === 0? "진행중" : "완료" }
                {user && user.uid === data.user_id &&
                  <Button size="small" color="Primary" onClick={this.updateIssueStatus}>
                    {data.is_complete === 0? "완료하기" : "진행중으로 변경"}
                  </Button>
                }
              </span>
            </div>
          </Grid.Column>
          {user && user.uid === data.user_id &&
            <BtnWrapper>
              <Link to={`/designDetail/${this.props.match.params.id}/issue/${this.props.match.params.issue_id}/modify`}>
                <Button size="small">수정</Button>
              </Link>
              <Button size="small" onClick={this.deleteIssue}>삭제</Button>
            </BtnWrapper>
          }
        </Grid.Row>
        <Grid.Row className="textArea">
          <p>{data.content}</p>
        </Grid.Row>
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
                <Button size="small" className="delBtn" onClick={()=>this.deleteComment(comm.uid)}>삭제</Button>
                }
              </div>
            ))
          :
            <p>{/*등록된 코멘트가 없습니다.*/}</p>
          }
          {this.state.render? <CommentForm/> : null}
        </CommentContainer>
      </IssueWrapper>
    );
  }
} 

export default DesignIssueDetail;