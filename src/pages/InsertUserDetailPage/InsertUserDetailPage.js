import React, { Component } from 'react'
import UserDetailFormContainer from "containers/Registration/UserDetailFormContainer"


class InsertUserDetailPage extends Component {
  render() {
    return (
      <>
        <>
          <UserDetailFormContainer history={this.props.history} />
        </>
      </>
    );
  }
}

export default InsertUserDetailPage
