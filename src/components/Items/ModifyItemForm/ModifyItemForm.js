import React, { Component } from "react";
import ModifyItemInfoContainer from "containers/Items/ModifyItemInfoContainer";
import Loading from "components/Commons/Loading";

class ModifyItemForm extends Component {
  state = { loading: false }
  setLoader = () =>
    this.setState({ loading: !this.state.loading });

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        <ModifyItemInfoContainer setLoader={this.setLoader} />
      </React.Fragment>
    );
  }
}

export default ModifyItemForm;

