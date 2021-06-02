import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, ModifyUserDetailRequest } from "actions/Users/MyDetail";
import ModifyMyDetail from "components/Users/ModifyMyDetail";
import ModifyMyDetail_mobile from "mobileComponents/ModifyMyDetail_mobile";

class ModifyMyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <ModifyMyDetail {...this.props} />
          :
          <ModifyMyDetail_mobile {...this.props}/>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  MyDetail: state.MyDetail.status.MyDetail,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2
});

const mapDispatchToProps = (dispatch) => ({
  GetMyDetailRequest: (token) => dispatch(GetMyDetailRequest(token)),
  ModifyUserDetailRequest: (id, data, token) => dispatch(ModifyUserDetailRequest(id, data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer);
