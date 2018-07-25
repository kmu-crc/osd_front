import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Form } from "semantic-ui-react";
import Button from "components/Commons/Button";
import { MultiUpload } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";
import { CardImageUpdate, CardSourcUpdate } from "components/Designs/DesignBoardCard";

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
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 0 100px;
  }
  & .sc-LKuAh.cEhByC {
    padding-right: .5em;
    width: 50%;
    float: left;

  }
  & .field label {
    margin: 0 0 0.8rem 0;
    display: block;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
  }
`;

class CardSource extends Component {
  state = {
    loading: false,
    open: false,
    active: "INIT"
  }

  componentDidMount(){
    console.log(this.props.card_id);
  }

  changeActive = async value => {
    this.setState({
      active: value
    });
    //this.props.GetDesignDetailViewRequest(this.props.match.params.id);
  };

  render(){
    const view = this.props.view;
    return(
      <FormWrapper>
          <FromFieldCard>
            <Grid>
              <Grid.Column mobile={16} computer={16}>
                <Form.Group widths="equal">
                  <CardImageUpdate
                    uid={view.uid}
                    token={this.props.token}
                    images={view.images}
                    request={this.props.UpdateCardImagesRequest}
                    active={this.state.active}
                    changeActive={this.changeActive}
                    isTeam={1}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <CardSourcUpdate
                    uid={view.uid}
                    token={this.props.token}
                    sourcesLink={view.sources}
                    request={this.props.UpdateCardSourcesRequest}
                    active={this.state.active}
                    changeActive={this.changeActive}
                    isTeam={1}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
      </FormWrapper>
    );
  }
}

export default CardSource;
