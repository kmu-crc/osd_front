import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignForm from "components/Designs/ModifyDesignForm";
import { GetDesignDetailRequest } from "redux/modules/design";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

class ModifyDesignFormContainer extends Component {
  state = {
    isAuthor: false
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(async ()=>{
        if(this.props.userInfo.uid !== this.props.DesignDetail.user_id){
          await alert("이 디자인에 대한 수정권한이 없습니다. 이전페이지로 돌아갑니다.","확인")
          this.props.history.go(-1)
        } else { this.setState({isAuthor:true})}
      })
  }
  render() {
    return(
      <div>
        {this.state.isAuthor?(
          <ModifyDesignForm {...this.props}/>
        ):(
          <p style={{color:"#FFF"}}> 수정권한을 확인 중입니다.</p>
        )}
      </div>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetail: state.Design.status.DesignDetail,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignFormContainer));
