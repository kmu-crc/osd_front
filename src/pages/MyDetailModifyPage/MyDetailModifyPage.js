import React, { Component } from "react";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer";

class MyDetailModifyPage extends Component {
  render() {
    return(
        <ModifyMyDetailContainer token={this.props.token} history={this.props.history}/>
    );
  }
}

export default MyDetailModifyPage;