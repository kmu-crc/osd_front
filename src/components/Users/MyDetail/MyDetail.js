import React, { Component } from "react"

// css styling
class MyDetail extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }

  render() {
    let MyInfo = this.props.MyDetail
    console.log(MyInfo, "MyInfo")
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default MyDetail
