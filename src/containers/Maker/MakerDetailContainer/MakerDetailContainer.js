import React, { Component } from "react";
import { connect } from "react-redux";
import MakerDetail from "components/Makers/MakerDetail";
import { GetExpertMakerViewDetailRequest} from "actions/Expert"

class MakerDetailContainer extends Component {
  componentWillMount(){
    this.props.GetExpertMakerViewDetailRequest(this.props.id);
  }
  render() {
    console.log(this.props);
    return (<MakerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  MakerViewDetail: state.MakerDetail.status.MakerViewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  GetExpertMakerViewDetailRequest: (data) => {
    return dispatch(GetExpertMakerViewDetailRequest(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
