import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetMyDetailRequest, UpdateUserDetailRequest } from "redux/modules/personal"
import { GetCategoryAllRequest } from "redux/modules/category"
import CreateDesigner from "components/Designers/CreateDesigner/CreateDesigner"
import { CheckNickNameRequest } from "redux/modules/auth"
import ClientTemplate from "templates/ClientTemplate";


class CreateDesignerContainer extends Component {
  componentDidMount() {
    this.props.GetCategoryAllRequest();
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    console.log("designer", this.props);
    return (<ClientTemplate>
      <CreateDesigner {...this.props} />
    </ClientTemplate>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    CheckNickName: state.Authentication.checkStatus.checkNickName

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token))
    },
    CheckNickNameRequest: (NickName) => {
      return dispatch(CheckNickNameRequest(NickName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDesignerContainer)
