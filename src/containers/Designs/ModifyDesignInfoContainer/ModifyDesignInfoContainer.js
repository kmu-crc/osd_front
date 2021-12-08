import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ModifyDesign from "components/Designs/ModifyDesign"
import ModifyDesignMobile from "components/Designs/ModifyDesign/ModifyDesignMobile"
import {
  DeleteDesignRequest, UpdateDesignInfoRequest,
  CreateDesignBoardRequest, UpdateDesignTime, UpdateCardTitleRequest, GetDesignCardRequest, UpdateDesignBoardRequest, DeleteDesignBoardRequest,
  CreateDesignRequest, GetDesignDetailRequest, GetDesignBoardRequest
} from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"
import { geturl } from "config"
import Loading from "components/Commons/Loading"
import { alert } from "components/Commons/Alert/Alert";
import styled from "styled-components";
import { isMobile } from "constant";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
`;
const ValidationWrapper = styled.div`
  margin: auto;
  width: 50wh;
  height: 29px; 
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 15px;
  line-height: 29px;
  color: #7C7C7C;
`;

class ModifyDesignInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: 0 /* 0:init, 1:, 2:, 3: */,
      loading: false,
    };
    this.gotoMyModify = this.gotoMyModify.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentDidMount() {
    await this.setState({ valid: 1 });
    if (this.props.userInfo.is_designer === 0) {
      this.gotoMyModify();
    }

    await this.setState({ valid: 2, loading: true });
    this.props.GetCategoryAllRequest()
      .then(() => {
        this.props.GetDesignDetailRequest(this.props.id, this.props.token)
          .then(detail => {
            if (this.props.userInfo.uid !== detail.user_id) {
              this.goBack();
            }
            if (detail) {
              this.setState({ valid: true, loading: false });
            }
          })
      })
  }
  async gotoMyModify() {
    await alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.", "확인")
    this.props.history.push("/myModify")
  }
  async goBack() {
    await alert("디자인 수정 권한이 없습니다", "확인");
    window.location.href = geturl() + '/designDetail/' + this.props.id;
  }
  componentDidUpdate(prevProps) {
    if (this.props.DesignDetail.uid && prevProps.DesignDetail.uid == null) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, valid } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}

      {/* verification  */}
      {valid === 0 && <ValidationWrapper>인증을 거쳐야 디자인 정보를 수정할 수 있습니다.</ValidationWrapper>}
      {valid === 1 && <ValidationWrapper>수정 권한을 체크합니다.</ValidationWrapper>}
      {valid === 2 && <ValidationWrapper>디자인 정보를 가져오고 있습니다.</ValidationWrapper>}

      {/* rendering after verifying */}
      {valid === true ? isMobile()
        ? <ModifyDesignMobile {...this.props} />
        : <Wrapper>
          <ModifyDesign {...this.props} />
        </Wrapper> : null}

    </React.Fragment>);
  }
}

const mapStateToProps = (state) => ({
  DesignDetail: state.Design.status.DesignDetail,
  token: state.Authentication.status.token,
  members: state.Search.status.members,
  userInfo: state.Authentication.status.userInfo,
  category1: state.Category.status.category1,
  category2: state.Category.status.category2,
  category3: state.Category.status.category3,
  DesignDetailStep: state.DesignCard.status.DesignDetailStep,
});

const mapDispatchToProps = (dispatch) => ({
  CreateDesignBoardRequest: (data, design_id, token) => {
    return dispatch(CreateDesignBoardRequest(data, design_id, token));
  },
  GetDesignDetailRequest: (id, token) => {
    return dispatch(GetDesignDetailRequest(id, token));
  },
  GetDesignBoardRequest: (id) => {
    return dispatch(GetDesignBoardRequest(id));
  },
  UpdateDesignTime: (design_id, token) => {
    return dispatch(UpdateDesignTime(design_id, token));
  },
  UpdateCardTitleRequest: (data, token, id) => {
    return dispatch(UpdateCardTitleRequest(data, token, id));
  },
  GetDesignCardRequest: (id, board_id) => {
    return dispatch(GetDesignCardRequest(id, board_id));
  },
  UpdateDesignBoardRequest: (id, token, data) => {
    return dispatch(UpdateDesignBoardRequest(id, token, data));
  },
  DeleteDesignRequest: (id, token) => {
    return dispatch(DeleteDesignRequest(id, token))
  },
  DeleteDesignBoardRequest: (id, board_id, token) => {
    return dispatch(DeleteDesignBoardRequest(id, board_id, token))
  },
  GetCategoryAllRequest: () => {
    return dispatch(GetCategoryAllRequest());
  },
  CreateDesignRequest: (data, token) => {
    return dispatch(CreateDesignRequest(data, token));
  },
  SearchMemberRequest: (id, data, token) => {
    return dispatch(SearchMemberRequest(id, data, token));
  },
  UpdateDesignInfoRequest: (data, id, token) => {
    return dispatch(UpdateDesignInfoRequest(data, id, token));
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
