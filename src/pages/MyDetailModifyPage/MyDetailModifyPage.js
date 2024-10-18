import React, { Component } from "react";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer";
import ClientTemplate from "templates/ClientTemplate";

class MyDetailModifyPage extends Component {
  render() {
    return (<ClientTemplate>
      <ModifyMyDetailContainer token={this.props.token} history={this.props.history} />
    </ClientTemplate>);
  }
}

export default MyDetailModifyPage;