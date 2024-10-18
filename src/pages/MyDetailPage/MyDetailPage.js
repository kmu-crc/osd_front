import React, { Component } from "react";
import MyDetailContainer from "containers/MyPage/MyDetailContainer";
import ClientTemplate from "templates/ClientTemplate";

class MyDetailPage extends Component {
  render() {
    return (<ClientTemplate>
      <MyDetailContainer
        token={this.props.token}
        type={this.props.match.params.type ? this.props.match.params.type : null}
        type2={this.props.match.params.type2 ? this.props.match.params.type2 : null}
        history={this.props.history} />
    </ClientTemplate>);
  }
}

export default MyDetailPage;
