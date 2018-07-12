import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import ModifyDesignInfoContainer from "containers/Designs/ModifyDesignInfoContainer";
import ModifyDesignFileContainer from "containers/Designs/ModifyDesignFileContainer";
import StyleGuide from "StyleGuide";

const FromFieldCard = styled.div`
  width: 100%;
`;

const TabWrapper = styled.div`
  padding: 1rem 0rem;
  background-color: rgba(255,255,255,0.8);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: inline-block;
  & ul {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: ${StyleGuide.color.geyScale.scale9};
    & li {
      text-align: center;
      
    }
    & li.active {
      color: ${StyleGuide.color.main.basic};
      font-weight: 600;
      &::after {
        content: "";
        display: block;
      }
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
              <Link to={`/designModify/${design.uid}/`}>
                <li className={this.props.location.pathname.indexOf("file") === -1 ? "active" : ""}>정보 수정</li>
              </Link>
              <Link to={`/designModify/${design.uid}/file`}>
                <li className={this.props.location.pathname.indexOf("file") !== -1 ? "active" : ""}>파일 수정</li>
              </Link>
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
