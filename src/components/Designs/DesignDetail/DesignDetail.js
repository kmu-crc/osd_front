import React, { Component } from "react"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import DesignInfo from "components/Designs/DesignInfo"

class DesignDetail extends Component {
  render() {
    const DesignDetail = this.props.DesignDetail
    return (<>
      {/* design info */}
      <DesignInfo Count={this.props.Count} DesignDetail={DesignDetail} />
      {/* design detail */}
      <DesignDetailStepContainer design={DesignDetail}/>
    </>)
  }
}

export default DesignDetail;
