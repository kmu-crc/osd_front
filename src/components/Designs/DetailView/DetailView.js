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
import Loading from "components/Commons/Loading";
import CardSourceContainer from "containers/Designs/CardSourceContainer";

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
  &.ui.comments {
    max-width: 100%;
    width: 100%;
    & .delBtn {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  & p {
    text-align: center;
  }
  & .ui.button {
    background: ${StyleGuide.color.sub.bule.basic};
    font-size: 12px;
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
  margin-left: 0.5rem;
  /* position: absolute;
  top: 0px;
  right: 1rem; */
  /* background-color: #57BBBA;
  border: 1px solid #57BBBA; */
`;

const BtnWrap = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
`;

class DetailView extends Component {
  state = {
    render: true,
    edit: false
  }

  componentDidMount() {
    this.props
      .GetDesignDetailViewRequest(this.props.id, this.props.token)
      // .then(data => { if (data.DesignDetailView !== null) { this.props.GetCardCommentRequest( this.props.id, data.DesignDetailView.uid ); } })
      .then(() => {
        // console.log(this.props, "props")
        this.props.DesignDetailView && this.props.userInfo &&
          this.props.isTeam &&
          // this.props.DesignDetailView.user_id === this.props.userInfo.uid && 
          this.setState({ edit: true })
      })
  }

  componentWillUnmount() {
    this.props.DesignDetailViewResetRequest();
  }

  onActiveStep = () => {
    const confirm = window.confirm(
      "프로젝트 형식으로 변경하시겠습니까? 템플릿 변경 후에는 이전으로 돌아갈 수 없습니다. (현재 등록된 디자인은 저장됩니다)"
    );
    if (confirm) {
      this.props
        .ChangeToProjectRequest(this.props.id, this.props.token)
        .then(data => {
          if (data.success === true) {
            this.props.history.go(`/designDetail/${this.props.id}`);
          }
        });
    } else {
      return;
    }
  };

  onSubmitCmtForm = async data => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (FormDataToJson(data) && FormDataToJson(data).content === "") {
      alert("내용을 입력해 주세요.");
      return;
    }
    this.props
      .CreateCardCommentRequest(FormDataToJson(data), this.props.id, this.props.DesignDetailView.uid, this.props.token)
      .then(this.props.UpdateDesignTime(this.props.id, this.props.token))
      .then(async res => {
        if (res.data.success === true) {
          this.props.GetCardCommentRequest(this.props.id,this.props.DesignDetailView.uid)
        }
        await this.setState({render: false})
        this.setState({render: true})
      })
      
  }


  onChangeEditMode = () => {
    this.setState({ edit: true });
  };
  onCloseEditMode = () => {
    // this.setState({ edit: true });
  };
  onPreviewMode = () => {
    this.setState({ edit: !this.state.edit })
  }
  onCancel = () => {
    window.confirm('변경하신 데이터가 저장되지 않습니다, 그래도 취소하시겠습니까?') && window.location.reload()
  }
  render() {
    const view = this.props.DesignDetailView;
    const len = Object.keys(view).length;
    return (
      <div>
        <BtnWrap>
          {this.props.isTeam ? (
            <Button type="button" size="small" onClick={this.onPreviewMode}>
              {this.state.edit ? "미리보기" : "편집하기"}
            </Button>
          ) : null}
          {this.props.token &&
            this.props.userInfo.uid === view.user_id && (
              <GoStepBtn onClick={this.onActiveStep} size="small">
                단계 추가
              </GoStepBtn>
            )}
        </BtnWrap>

        {len > 0 ? (
          <ViewWrapper>
            <div className="date" />
            <CardSourceContainer
              view={this.props.DesignDetailView}
              edit={this.state.edit}
              closeEdit={this.onCloseEditMode}
              openEdit={this.onChangeEditMode}
              isCancel={true}
              onCancel={this.onCancel}
            />
            {/*comment form deleted */}
          </ViewWrapper>
        ) : (
            <Loading />
          )}
      </div>
    );
  }
}

export default DetailView;
