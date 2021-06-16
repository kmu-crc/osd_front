import React, { Component } from 'react';
import ModifyRequestToDesigner from "components/Request/ModifyRequestToDesigner";
import ModifyRequestToDesigner_mobile from "mobileComponents/ModifyRequestToDesigner_mobile";
import { connect } from "react-redux";
import { GetRequestDetailRequest } from "actions/Request";
import { UpdateRequestRequest,DeleteRequestRequest } from "actions/Request";

class ModifyRequestToDesignerContainer extends Component {
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id)
  }
  render() {
    // console.log(this.props);
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <ModifyRequestToDesigner {...this.props}/>
          :
          <ModifyRequestToDesigner_mobile {...this.props}/>
        }
      </React.Fragment>
    )
  }

  
}
const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  Detail: state.RequestDetail.status.Detail,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  isPurchased: state.Payment.status.isPurchased,
});
const mapDispatchToProps = (dispatch) => ({
  GetRequestDetailRequest: (id) => dispatch(GetRequestDetailRequest(id)),
  UpdateRequestRequest: (id,data,token) => dispatch(UpdateRequestRequest(id,data,token)),
  DeleteRequestRequest: (id,token) => dispatch(DeleteRequestRequest(id,token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModifyRequestToDesignerContainer);
