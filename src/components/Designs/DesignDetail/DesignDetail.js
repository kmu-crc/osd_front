import React, { Component } from "react"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import DesignInfo from "components/Designs/DesignInfo"

class DesignDetail extends Component {
  constructor(props)
  {
    super(props);
    this.state={isMyDesign:false}
  }
  componentDidMount() 
  {
    console.log("test");
    if(this.props.userInfo == null)this.setState({isMyDesign:false});
    else if(this.props.userInfo.uid == this.props.DesignDetail.user_id)
    {
      this.setState({isMyDesign:true});
    }  
    else{
      this.setState({isMyDesign:false});
    }
  }
  gotoModifyPage = () => {
    window.location.href = "/groupDetail/" + this.props.id+"/modify"
  }
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
