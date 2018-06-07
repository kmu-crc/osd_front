import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import { FormField } from "components/Commons/FormField";
import { FormSelect } from "components/Commons/FormItem";

// category width
const CategoryColumn = styled(Grid.Column)`
  & > .field {
    width: 14em;
    float: left;
  }
`;

class Category extends Component {
  componentWillMount() {
    this.props.GetCategoryLevel1Request();
  };
  onChangeCategory1 = (value) => {
    this.props.GetCategoryLevel2Request(value);
  }

  render() {
    return (
      <CategoryColumn className="category"
                   widescreen={this.props.widescreen ? this.props.widescreen : null}
                   largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
                   computer={this.props.computer ? this.props.computer : null}
                   tablet={this.props.tablet ? this.props.tablet : null}
                   mobile={this.props.mobile ? this.props.mobile : null}>
        <FormField selection placeholder="1차 카테고리" getValue={this.onChangeCategory1} options={this.props.category1} onChange={this.props.handleCate1} RenderComponent={FormSelect}/>
        <FormField selection placeholder="2차 카테고리" options={this.props.category2} onChange={this.props.handleCate2} RenderComponent={FormSelect}/>
      </CategoryColumn>
    )
  }
}

export default Category;
