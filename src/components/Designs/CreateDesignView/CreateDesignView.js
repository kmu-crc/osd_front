import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Form } from "semantic-ui-react";
import Button from "components/Commons/Button";
import { MultiUpload } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";

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
  componentDidMount(){
    console.log(this.props.card_id);
  }

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  onSubmit = async e => {
    e.preventDefault();

    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.UpdateCardImagesRequest(data, this.props.token, this.props.card_id)
      .then(res => {
        if (res.success) {
          this.props.history.push(`/designDetail/${res.design_id}`)
        } else {
          alert("다시 시도해주세요");
        }
      });
    }).catch(e => {
      console.log("실패", e);
    });
  };

  render(){
    return(
      <FormWrapper>
        <form onSubmit={this.onSubmit}>
          <FromFieldCard>
            <Grid>
              <Grid.Column mobile={16} computer={16}>
                <Form.Group widths="equal">
                  <Label>이미지 추가</Label>
                  <MultiUpload
                    name="design_file"
                    placeholder="파일을 선택해주세요."
                    getValue={this.onChangeValue}
                    validates={["OnlyImages", "MaxFileSize(100000)"]}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>파일 추가</Label>
                  <MultiUpload
                    name="source_file"
                    placeholder="파일을 선택해주세요."
                    getValue={this.onChangeValue}
                    validates={["MaxFileSize(100000)"]}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button type="submit">등록</Button>
        </form>
      </FormWrapper>
    );
  }
}

export default CreateDesignView;
