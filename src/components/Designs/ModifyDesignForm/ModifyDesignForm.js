import React, { Component } from "react";
import ModifyDesignInfoContainer from "containers/Designs/ModifyDesignInfoContainer";
import Loading from "components/Commons/Loading";

class ModifyDesignForm extends Component {
  state = {
    loading: false
  }

  setLoader = () => {
    this.setState({
      loading: !this.state.loading
    });
  }

  render() {
    return(
      <div>
        <ModifyDesignInfoContainer setLoader={this.setLoader}/>
        {this.state.loading && <Loading/>}
      </div>
    );
  }
}
export default ModifyDesignForm;
