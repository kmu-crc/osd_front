import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer";

class MyDetailModifyPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <ModifyMyDetailContainer token={this.props.token} history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default MyDetailModifyPage;