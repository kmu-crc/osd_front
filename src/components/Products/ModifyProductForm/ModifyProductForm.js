import React, { Component } from "react";
import ModifyDesignInfoContainer from "containers/Products/ModifyProductInfoContainer";
import Loading from "components/Commons/Loading";

class ModifyProductForm extends Component {
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
export default ModifyProductForm;
