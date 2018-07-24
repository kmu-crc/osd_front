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

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class CreateDesignView extends Component {
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

  // onChangeValue = async data => {
  //   let obj = {};
  //   if(data.target){
  //     obj[data.target.name] = data;
  //   }
  //   await this.setState(obj);
  // };

  // onSubmit = async e => {
  //   await this.setState({
  //     loading: true
  //   });

  //   e.preventDefault();
  //   ValidationGroup(this.state, false).then(data => {
  //     console.log("성공", data);
  //     this.props.UpdateCardImagesRequest(data, this.props.token, this.props.card_id)
  //     .then(res => {
  //       if (res.success) {
  //         console.log("e");
  //         this.props.history.replace(`/designDetail/${this.props.match.params.id}`);
  //       } else {
  //         alert("다시 시도해주세요");
  //       }
  //       this.setState({
  //         loading: false
  //       });
  //     });
  //   }).catch(e => {
  //     console.log("실패", e);
  //   });
  // };

  // onRefresh = (e) => {
  //   Component.forceUpdate();
  // }

  render(){
    return(
      <FormWrapper>
          <FromFieldCard>
            <Grid>
              <Grid.Column mobile={16} computer={16}>
                <Form.Group widths="equal">
                  <CardImageUpdate
                    uid={this.props.card_id}
                    token={this.props.token}
                    // images={view.images}
                    request={this.props.UpdateCardImagesRequest}
                    active={this.state.active}
                    changeActive={this.changeActive}
                    isTeam={1}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <CardSourcUpdate
                    uid={this.props.card_id}
                    token={this.props.token}
                    // sourcesLink={view.sources}
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

export default CreateDesignView;
