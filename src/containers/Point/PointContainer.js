import React, { Component } from "react";
import Point from "components/Point";
import Point_mobile from "mobileComponents/Point_mobile"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetMyPointRequest, GetHistoryRequest, PointUpRequest } from "actions/Point";

class PointContainer extends Component {
  constructor(props){
    super(props);
    this.handleGetMyPointRequest=this.handleGetMyPointRequest.bind(this);
  }
  componentDidMount() {
    if (this.props.userInfo != null) {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid,0, this.props.token);
    }
  }
  handleGetMyPointRequest(){
    if(this.props.userInfo!=null)
    {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
    }
  }
  render() {
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <Point {...this.props} />
        :
        <Point_mobile {...this.props}/>        
      }
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  Point: state.Point.status.Point,
  History: state.Point.status.History,
  HistoryCount: state.Point.status.HistoryCount,
})
const mapDispatchToProps = (dispatch) => ({
  GetMyPointRequest: (id, token) => dispatch(GetMyPointRequest(id, token)),
  GetHistoryRequest: (id, page, token) => dispatch(GetHistoryRequest(id, page, token)),
  PointUpRequest: (info, data) => dispatch(PointUpRequest(info, data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PointContainer));
