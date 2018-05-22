import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import MyDetailContainer from "containers/MyPage/MyDetailContainer";

class MyDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <MyDetailContainer token={this.props.token}
                           type={this.props.match.params.type? this.props.match.params.type : null}
                           history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default MyDetailPage;