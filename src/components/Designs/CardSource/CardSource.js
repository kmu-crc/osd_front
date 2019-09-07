import React, { Component } from "react";
import styled from "styled-components";
// import { Grid, Form } from "semantic-ui-react";
import CardSourceDetailContainer from "containers/Designs/CardSourceDetailContainer";

// css styling

const FormWrapper = styled.div`
  width: 100%;
`;

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 70px;
  margin-bottom: 30px;
  border-radius: 3px;
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
    //this.props.GetDesignDetailViewRequest(this.props.match.params.id);
  };

  render() {
    const view = this.props.view;
    // console.log("CANCEL",this.props.isCancel, this.props.on)
    return (
      <FormWrapper>
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
