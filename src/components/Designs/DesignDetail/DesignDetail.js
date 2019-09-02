import React, { Component } from "react"
import DesignInfo from "components/Designs/DesignInfo"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import Loading from "components/Commons/Loading";

class DesignDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { isMyDesign: false };
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token); // 디자인에 대한 정보
    this.props.UpdateDesignViewRequest(this.props.id)
      .then(this.props.GetDesignCountRequest(this.props.id)); // 디자인 조회수 업데이트 후 카운트 정보 가져옴
    if (this.props.token) {
      this.props.GetLikeDesignRequest(this.props.id, this.props.token);
    } // 로그인 한 경우 좋아요 했는지 여부 가져오기

    if (this.props.userInfo === null) this.setState({ isMyDesign: false });
    else if (this.props.userInfo.uid === this.props.DesignDetail.user_id) {
      this.setState({ isMyDesign: true });
    }
    else {
      this.setState({ isMyDesign: false });
    }
  }
  // componentWillReceiveProps = async (nextProps) => {
  //   if (nextProps.DesignDetail !== this.props.DesignDetail) {
  //     console.log("reload", nextProps);
  //     return true;
  //   }
  // }
  gotoModifyPage = () => {
    window.location.href = "/groupDetail/" + this.props.id + "/modify"
  }
  render() {
    console.log("userinfo", this.props)
    const DesignDetail = this.props.DesignDetail;
    return (<>
      {DesignDetail && DesignDetail.uid ? <>
        {/* design info */}
        <DesignInfo {...this.props} />
        {/* design detail */}
        <DesignDetailStepContainer design={DesignDetail} />
      </> : <Loading />}
    </>)
  }
}

export default DesignDetail;
