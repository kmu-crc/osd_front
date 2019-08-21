import React, { Component } from "react"
import { connect } from "react-redux"
import { UpdateDesignTime, GetDesignBoardRequest } from "redux/modules/design"
import DetailStep from "components/Designs/DetailStep"
import GridEditor from "modules/GridEditor"

class DesignDetailStepContainer extends Component {
  componentDidMount() {
    this.props.GetDesignBoardRequest(this.props.id)
  }
  render() {
    console.log(this.props.DesignDetailStep, this.props.isTeam)
    return (<GridEditor {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailStep: state.DesignCard.status.DesignDetailStep,
    isTeam: state.Design.status.DesignDetail.is_team
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id))
    },
    UpdateDesignTime: (id, token) => {
      return dispatch(UpdateDesignTime(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer)
