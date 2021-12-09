import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import FormDataToJson from "modules/FormDataToJson";
import opendesign_style from "opendesign_style";
import Loading from "components/Commons/Loading";
import CardSourceContainer from "containers/Designs/CardSourceContainer";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

// css styling
const DetailViewMobileWrapper = styled.div`
  position: relative;
  width: 100wh;
  height: 95vh;

  display: flex;
  flex-direction: column;
  justify-content: start;

  .transform-button {
    margin-top: 20px;
    margin-left: auto;
    border: none;
    outline: none;
    background-color: gray;
    border-radius: 5px;
    color: white;
    padding: 5px;
  }

`;
const Wrapper = styled.div`
  margin-top: 25px;
  width: 100wh;
  padding: 8px;
`;


export default class DetailViewMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: true,
      edit: false
    }
  };

  componentDidMount() {
    this.props
      .GetDesignDetailViewRequest(this.props.id, this.props.token)
      .then(() => {
        this.props.DesignDetailView && this.props.userInfo &&
          this.props.isTeam && this.setState({ edit: true });
      })
  }
  componentWillUnmount() {
    this.props.DesignDetailViewResetRequest();
  }

  onActiveStep = async () => {
    const isconfirm = await confirm(
      "단계를 가지는 디자인 형식으로 변경하시겠습니까? 변경 후에는 이전으로 돌아갈 수 없습니다. (현재 등록된 디자인 내 모든 데이터들은 저장됩니다)", "예", "아니오"
    );
    if (isconfirm) {
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
      await alert("로그인 해주세요.", "확인");
      return;
    }
    if (FormDataToJson(data) && FormDataToJson(data).content === "") {
      await alert("내용을 입력해 주세요.", "확인");
      return;
    }
    this.props
      .CreateCardCommentRequest(FormDataToJson(data), this.props.id, this.props.DesignDetailView.uid, this.props.token)
      .then(this.props.UpdateDesignTime(this.props.id, this.props.token))
      .then(async res => {
        if (res.data.success === true) {
          this.props.GetCardCommentRequest(this.props.id, this.props.DesignDetailView.uid)
        }
        await this.setState({ render: false })
        this.setState({ render: true })
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
  onCancel = async () => {
    await confirm('변경하신 데이터가 저장되지 않습니다, 그래도 취소하시겠습니까?', "예", "아니오") && window.location.reload()
  }

  render() {
    const view = this.props.DesignDetailView;
    const len = Object.keys(view).length;

    return (<DetailViewMobileWrapper>
      {this.props.token && this.props.userInfo.uid === view.user_id
        ? <button className="transform-button" onClick={this.onActiveStep}>
          디자인 형식 변경
        </button>
        : null}

      {len > 0 ? (
        <Wrapper>
          {/* <div className="date" /> */}
          <CardSourceContainer
            view={this.props.DesignDetailView}
            edit={this.state.edit}
            closeEdit={this.onCloseEditMode}
            openEdit={this.onChangeEditMode}
            isCancel={true}
            onCancel={this.onCancel}
          />
          {/*comment form deleted */}
        </Wrapper>
      ) : (
        <Loading />
      )}

    </DetailViewMobileWrapper>);
  }
}

