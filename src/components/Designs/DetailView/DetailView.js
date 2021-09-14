import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
import FormDataToJson from "modules/FormDataToJson";
import opendesign_style from "opendesign_style";
import Loading from "components/Commons/Loading";
import CardSourceContainer from "containers/Designs/CardSourceContainer";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
// css styling

import new_logo_chat from "source/new_logo_chat.svg";
import new_logo_msg from "source/new_logo_msg.svg";
const Wrapper = styled.div`
  max-width: 1740px;
  width: 100%;
  min-width: 1000px;
  padding-left: 38px;
  padding-right: 38px;
`;
const ViewWrapper = styled(Grid)`
max-width: 1740px;
min-width: 1000px;
  &.ui.grid {
    margin-left:25px;
    width:100%;
    max-width:1760px;
    // margin: 0;
    // padding-bottom: 60px;
    // max-width:1736px;
    // margin-left:38px;
    // width: 100%;
    // // padding-top: 30px;
    // font-size: ${opendesign_style.font.size.paragraph};
  }
  & .date {
    color: #a4a4a4;
    font-weight: 400;
    margin-bottom: 10px;
  }
  & h4 {
    font-size: ${opendesign_style.font.size.heading4};
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
const GoStepBtn = styled(Button)`
  margin-left: 0.5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:17px;
  width:276px;
  height:49px;
  padding:7px;
  color:white;
  font-size:30px;
  border-radius:0px;

`;
const BtnWrap = styled.div`
  width:100%;
  max-width:1740px;
  height:100px;
  margin-left:38px;
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  .row{
    display:flex;
  }
  .icon_wrap{
    margin-left:44px;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .icon{
    width:66px;
    height:66px;
    object-fit:contain;
  }
  .icon_label{
    font-size:17px;
    font-family:Spoqa Han Sans Neo;
    font-weight:Medium;
  }
`;
const TransFormBtnContainer = styled.div`
  position: relative;
  // margin-top: 35px;
  margin-bottom:20px;

  max-width: 1740px;
  min-width: 1000px;
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
    console.log(view, "view");
    const len = Object.keys(view).length;

    return (<React.Fragment>
      <TransFormBtnContainer >

        {/* {this.props.isTeam ? (
              <Button type="button" size="small" onClick={this.onPreviewMode}>
                {this.state.edit ? "미리보기" : "편집하기"}
              </Button>
            ) : null} */}
        {this.props.token &&
          this.props.userInfo.uid === view.user_id && (
            <BtnWrap>
              <GoStepBtn onClick={this.onActiveStep} size="small">
                디자인 형식 변경
              </GoStepBtn>

              {/* <div className="row">
                <div className="icon_wrap">
                    <img src={new_logo_chat} className="icon"/>
                    <div className="icon_label">화상회의</div>
                </div>
                <div className="icon_wrap">
                  <img src={new_logo_msg} className="icon"/>
                  <div className="icon_label">채팅</div>
                </div>
                </div> */}
            </BtnWrap>
          )}

      </TransFormBtnContainer>

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

    </React.Fragment>);
  }
}

export default DetailView;
