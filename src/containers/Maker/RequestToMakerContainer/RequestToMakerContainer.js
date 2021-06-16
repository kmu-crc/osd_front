import React, { Component } from 'react';
import { connect } from "react-redux";
import RequestToMaker from "components/Makers/RequestToMaker";
import RequestToMaker_mobile from "mobileComponents/RequestToMaker_mobile";
import { CreateRequestRequest } from "actions/Request";

class RequestToMakerContainer extends Component {
  componentDidMount() {
    // alert(this.props.id);
  }
  render() {
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <RequestToMaker {...this.props} />
        :
        <RequestToMaker_mobile {...this.props}/>
      }
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestToMakerContainer);
