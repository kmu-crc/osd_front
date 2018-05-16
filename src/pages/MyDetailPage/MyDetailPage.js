import React, { Component } from "react";
import ClientTemplate from "../../templates/ClientTemplate";
import MyDetailContainer from "../../containers/MyDetailContainer";

class MyDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <MyDetailContainer token={this.props.token}/>
     </ClientTemplate>
    );
  }
}

export default MyDetailPage;