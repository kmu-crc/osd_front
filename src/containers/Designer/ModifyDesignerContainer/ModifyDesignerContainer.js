import React, { Component } from "react";
import ModifyDesigner from 'components/Designers/ModifyDesigner/ModifyDesigner';

import ModifyDesigner_mobile from 'mobileComponents/ModifyDesigner_mobile';
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import { connect } from "react-redux";
import { UpdateDesignerDetailRequest } from "actions/Users/UserInfo";
import { GetExpertDesignerDetailRequest} from "actions/Expert"


const Wrapper = styled(ContentBox)`
width:100%;
margin-bottom: 100px;
position: relative;
z-index:3;
`
const Wrapper_mobile = styled.div`
width:100%;
padding:0px 10px;
`
class ModifyDesignerContainer extends Component {
  componentWillMount(){
    this.props.GetExpertDesignerDetailRequest(this.props.id);
  }
  render() {
    return(
       <React.Fragment>
         {
           window.innerWidth>=500?
           <Wrapper>
            <ModifyDesigner  {...this.props}/>
           </Wrapper>
          :  
          <Wrapper_mobile>
            <ModifyDesigner_mobile  {...this.props}/>
          </Wrapper_mobile>
         }
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
