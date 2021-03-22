import React, { Component } from "react";
import MyDetailContainer from "containers/MyPage/MyDetailContainer";

class MyDetailPage extends Component {
  render() {
    return (
      <MyDetailContainer
        token={this.props.token}
        index={this.props.match.params.index ? this.props.match.params.index : 9}
        // type={this.props.match.params.type ? this.props.match.params.type : null}
        // type2={this.props.match.params.type2 ? this.props.match.params.type2 : null}
        history={this.props.history} />
    );
  }
}

export default MyDetailPage;
