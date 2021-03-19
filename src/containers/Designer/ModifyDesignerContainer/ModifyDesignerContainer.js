import React, { Component } from "react";
import ModifyDesigner from 'components/Designers/ModifyDesigner/ModifyDesigner';
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import { connect } from "react-redux";
import { UpdateDesignerDetailRequest } from "actions/Users/UserInfo";
import { GetExpertDesignerDetailRequest} from "actions/Expert"


const Wrapper = styled(ContentBox)`
width:100%;
margin-top:25px;
margin-bottom: 100px;
position: relative;
z-index:3;
`
class ModifyDesignerContainer extends Component {
  componentWillMount(){
    this.props.GetExpertDesignerDetailRequest(this.props.id);
    //this.props.GetTopItemListRequest(0);
  }
  render() {
    // console.log("ModifyDesignerContainer=====",this.props);
    // GetDesignerDetailRequest(this.props.id);

    return(
       <React.Fragment>
         <Wrapper>
         <ModifyDesigner  {...this.props}/>
         </Wrapper>
       </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    DesignerDetail: state.DesignerDetail.status.DesignerDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    GetExpertDesignerDetailRequest: (data) => {
      return dispatch(GetExpertDesignerDetailRequest(data))
    },
    UpdateDesignerDetailRequest: (data, token) => {
      return dispatch(UpdateDesignerDetailRequest(data, token))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyDesignerContainer);
