import React, { Component } from "react";
import styled from "styled-components";
import CardSourceDetailContainer from "containers/Designs/CardSourceDetailContainer";
import { isMobile } from "constant";

// css styling
const FormWrapper = styled.div`
  width: 100%;
`;
const FromFieldCard = styled.div`
  width:100%;
  max-width:1706px;
  min-width: ${1000 - (38 * 2)}px;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  /* @media only screen and (min-width: 1200px) {
    padding: 70px 100px 0 100px;
  } */
  & .sc-LKuAh.cEhByC {
    padding-right: 0.5em;
    width: 50%;
    float: left;
  }
  & .field label {
    margin: 0 0 0.8rem 0;
    display: block;
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.92857143em;
    font-weight: 700;
    text-transform: none;
  }
  @media only screen and (max-width: 1000px) {
    width: 100vw;
  }
  @media only screen and (min-width: 1920px) {
    width:100vw;
  }
`;
const FromFieldCardMobile = styled.div`
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

class CardSource extends Component {
  state = {
    loading: false,
    open: false,
    active: "INIT"
  };

  changeActive = async value => {
    this.setState({
      active: value
    });
  };

  render() {
    const view = this.props.view;
    return (
      isMobile() ?
        <FormWrapper>
          <FromFieldCardMobile>
            <CardSourceDetailContainer
              design_id={view.design_id}
              uid={view.uid}
              isTeam={view.is_team}
              edit={this.props.edit}
              closeEdit={this.props.closeEdit}
              openEdit={this.props.openEdit}
              isCancel={this.props.isCancel}
              onCancel={this.props.onCancel}
            />
          </FromFieldCardMobile>
        </FormWrapper>

        : <FormWrapper>
          <FromFieldCard>
            <CardSourceDetailContainer
              design_id={view.design_id}
              uid={view.uid}
              isTeam={view.is_team}
              edit={this.props.edit}
              closeEdit={this.props.closeEdit}
              openEdit={this.props.openEdit}
              isCancel={this.props.isCancel}
              onCancel={this.props.onCancel}
            />
          </FromFieldCard>
        </FormWrapper>
    );
  }
}

export default CardSource;
