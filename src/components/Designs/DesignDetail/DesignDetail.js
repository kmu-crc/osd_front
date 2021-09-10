import React, { Component } from "react"
import DesignInfo from "components/Designs/DesignInfo"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import Loading from "components/Commons/Loading";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import styled from "styled-components";

const Wrapper = styled.div`
  // margin-top:90px;
  // margin-left:100px;
  max-width: 1740px;
  min-width: 1000px;
`

class DesignDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { isMyDesign: false, editor: false };
  }

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(async () => {
        if (this.props.userInfo === null) this.setState({ isMyDesign: false });
        else if (this.props.userInfo.uid === this.props.DesignDetail.user_id) {
          this.props.DesignWaitingListRequest(this.props.id, this.props.token);
          this.props.GetCountDesignCommentRequest(this.props.id);
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

  componentWillReceiveProps(nextProps) {
    if (this.props.DesignDetail !== nextProps.DesignDetail) {
      return true;
    }
  }

  checkEditorPermission() {
    return (
      this.props.userInfo &&
        this.props.DesignDetail &&
        this.props.DesignDetail.member &&
        this.props.DesignDetail.member.find(peer => { return peer.user_id === this.props.userInfo.uid }) ? true : false);
  }

  render() {

    const DesignDetail = this.props.DesignDetail;

    return (<Wrapper>
      {DesignDetail && DesignDetail.uid
        ? <React.Fragment>
          {/* design info */}
          <DesignInfo {...this.props} {...this.state} />

          {/* design detail */}
          {DesignDetail && DesignDetail.is_project === 1
            ? (<DesignDetailStepContainer design={DesignDetail} {...this.state} />)
            : (<DesignDetailViewContainer id={this.props.id} {...this.state} history={this.props.history} />)}
        </React.Fragment>
        : <Loading />}
    </Wrapper>)
  }
}

export default DesignDetail;
