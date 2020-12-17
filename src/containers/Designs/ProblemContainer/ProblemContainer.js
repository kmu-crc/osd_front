import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ProblemController from "components/Designs/CardSourceDetail/ProblemController";
import { getProblemListRequest,getProblemDetailRequest,UpdateAnswerRequest } from "redux/modules/design/card";


class ProblemContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getProblemListRequest();
  }
  render() {
    return (
      <React.Fragment>
        <ProblemController {...this.props} getValue={data=>this.props.getValue(data)}/>
      </React.Fragment>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    ProblemList:state.DesignCard.status.ProblemList,
    ProblemDetail:state.DesignCard.status.ProblemDetail,
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProblemListRequest: () => {
      return dispatch(getProblemListRequest());
    },
    getProblemDetailRequest: (uid) => {
      return dispatch(getProblemDetailRequest(uid));
    },
    UpdateAnswerRequest:(token,data)=>{
      return dispatch(UpdateAnswerRequest(token,data));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemContainer));


