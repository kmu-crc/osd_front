import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Comment } from "semantic-ui-react";
import Button from "components/Commons/Button";
import eximg from "source/topDesign.png";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";

// css styling

const ViewWrapper = styled(Grid)`
  &.ui.grid {
    margin: 0;
    padding-bottom: 60px;
    width: 100%;
    padding-top: 30px;
    font-size: ${StyleGuide.font.size.paragraph};
  }
  & .date {
    color: #a4a4a4;
    font-weight: 400;
    margin-bottom: 10px;
  }
  & h4 {
    font-size: ${StyleGuide.font.size.heading4};
  }
  & > .noData {
    text-align: center;
    padding-top: 30px;
  }
  & .imageInfo {
    width: 100%;
    overflow: hidden;
  }
  & .sourceInfo {
    margin: 3rem 0;
  }
  & .imageInfo img {
    width: 100%;
  }
`;

const CommentContainer = styled.div`
  color: ${StyleGuide.color.geyScale.scale7};
  &.ui.comments {
    max-width: 100%;
    width: 100%;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  & p {
    text-align: center;
    font-size: ${StyleGuide.font.size.small};
  }
  & .ui.button {
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

const GoStepBtn = styled(Button)`
  position: absolute;
  top: -30px;
  right: 2rem;
`;


class DetailView extends Component {
  state = {
    render: true
  }

  async componentDidMount() {
    this.props.GetDesignDetailViewRequest(this.props.match.params.id)
    .then(data => {
      if (data.DesignDetailView !== null) {
        this.props.GetCardCommentRequest(this.props.match.params.id, data.DesignDetailView.uid)
      }
    });
  }

  onActiveStep = () => {
    const confirm = window.confirm("스텝 기능을 사용하시겠습니까? 템플릿을 변경한 후에는 이전으로 돌아갈 수 없습니다. (현재 등록된 디자인은 저장됩니다)");
    if (confirm) {
      this.props.ChangeToProjectRequest(this.props.match.params.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.history.go(`/designDetail/${this.props.match.params.id}`);
        }
      });
    } else {
      return;
    }
  }

  onSubmitCmtForm = async (data) => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    this.props.CreateCardCommentRequest(FormDataToJson(data), this.props.match.params.id, this.props.DesignDetailView.uid, this.props.token)
    .then(async res => {
      if (res.data.success === true) {
        this.props.GetCardCommentRequest(this.props.match.params.id, this.props.DesignDetailView.uid);
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
    this.props.DeleteCardCommentRequest(this.props.match.params.id, this.props.DesignDetailView.uid, id, this.props.token)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetCardCommentRequest(this.props.match.params.id, this.props.DesignDetailView.uid);
      }
    });
  }


  render(){
    let view = this.props.DesignDetailView;
    let len = Object.keys(view).length;
    const comment = this.props.Comment;

    const CommentForm = () => {
      return (
        <ValidateForm onSubmit={this.onSubmitCmtForm} className="ui reply form">
          <FormField name="comment" validates={["required"]} RenderComponent={FormTextArea} />
          <Button type="submit" className="ui icon primary left labeled button">
            <i aria-hidden="true" className="edit icon"></i>
            댓글쓰기
          </Button>
        </ValidateForm>
      );
    }

    return(
      <div>
        {len > 0 ?
          <ViewWrapper>
            <div className="date">최근 업데이트 {(view.update_time).split("T")[0]}</div>
            {view.images &&
              <div className="imageInfo">
                {view.images.map(img =>
                  <img key={img.uid} src={img.link} alt={img.name} />
                )}
              </div>
            }
            {view.sources &&
              <div className="sourceInfo">
                <h4>첨부파일</h4>
                {view.sources.map(src =>
                  <a key={src.uid} href={src.link}>{src.name}</a>
                )}
              </div>
            }
            <CommentContainer className="ui comments">
              <h4>댓글</h4>
              {comment.length > 0?
              comment.map(comm=>(
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
                  {this.props.userInfo && this.props.userInfo.uid === comm.user_id &&
                  <Button size="small" className="delBtn" onClick={()=>this.deleteComment(comm.uid)}>삭제</Button>
                  }
                </div>
                ))
              :
              <p>등록된 코멘트가 없습니다.</p>
              }
              {this.state.render? <CommentForm/> : null}
            </CommentContainer>
          </ViewWrapper>
        :
        <ViewWrapper>
          <p>내용이 없습니다.</p>
        </ViewWrapper>
        }
        {this.props.token && this.props.userInfo.uid === view.user_id && 
          <GoStepBtn onClick={this.onActiveStep}>프로젝트형으로 변경</GoStepBtn>
        }
      </div>
    );
  }
}

export default DetailView;
