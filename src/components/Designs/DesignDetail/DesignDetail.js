import React, { Component } from "react"
import DesignInfo from "components/Designs/DesignInfo"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import Loading from "components/Commons/Loading";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";

class DesignDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { isMyDesign: false, editor: false };
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token).
      then(async() => {
        if (this.props.userInfo === null) this.setState({ isMyDesign: false });
        else if (this.props.userInfo.uid === this.props.DesignDetail.user_id) {
          this.setState({ isMyDesign: true });
        }
        else {
          this.setState({ isMyDesign: false });
        }
        await this.setState({ editor: this.checkEditorPermission() });
      }); // 디자인에 대한 정보
    this.props.UpdateDesignViewRequest(this.props.id)
      .then(this.props.GetDesignCountRequest(this.props.id)); // 디자인 조회수 업데이트 후 카운트 정보 가져옴
    if (this.props.token) {
      this.props.GetLikeDesignRequest(this.props.id, this.props.token);
    } // 로그인 한 경우 좋아요 했는지 여부 가져오기
  }

  gotoModifyPage = () => {
    window.location.href = "/groupDetail/" + this.props.id + "/modify"
  }
  checkEditorPermission() {
    return (
      this.props.userInfo &&
        this.props.DesignDetail &&
        this.props.DesignDetail.member &&
        this.props.DesignDetail.member.find(peer => { return peer.user_id === this.props.userInfo.uid }) ? true : false);
  }
  render() {
    console.log("userinfo", this.props, this.state)
    const DesignDetail = this.props.DesignDetail;
    return (<>
      {DesignDetail && DesignDetail.uid ? <>
        {/* design info */}
        <DesignInfo {...this.props} {...this.state} />
        {/* design detail */}
        {DesignDetail && DesignDetail.is_project === 1 ? (
          <DesignDetailStepContainer design={DesignDetail} {...this.state}/>
        ) : (
            <DesignDetailViewContainer id={this.props.id} {...this.state} history={this.props.history} />
          )}
      </> : <Loading />}
    </>)
  }
}

export default DesignDetail;
