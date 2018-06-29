import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import ModifyDesignInfoContainer from "containers/Designs/ModifyDesignInfoContainer";
import ModifyDesignFileContainer from "containers/Designs/ModifyDesignFileContainer";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  // @media only screen and (min-width: 1200px) {
  //   padding: 70px 100px 0 100px;
  // }
`;

const TabWrapper = styled.div`
  padding: 2rem 1rem;
  border-bottom: 2px solid rgba(0,0,0,0.15);
  margin: 0 1rem;
  & ul {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    & li {
      text-align: center;
    }
  }
`;

class ModifyDesignForm extends Component {
  render() {
    const design = this.props.DesignDetail;
    return(
      <FromFieldCard>
        {design.is_project === 0 &&
          <TabWrapper>
            <ul>
              <Link to={`/designModify/${design.uid}/`}><li>정보 수정</li></Link>
              <Link to={`/designModify/${design.uid}/file`}><li>파일 수정</li></Link>
            </ul>
          </TabWrapper>
          }
        <Route exact path="/designModify/:id" component={ModifyDesignInfoContainer}/>
        <Route exact path="/designModify/:id/file" component={ModifyDesignFileContainer}/>
      </FromFieldCard>
    );
  }
}
export default ModifyDesignForm;
