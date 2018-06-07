import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import { FormSelect } from "components/Commons/FormItem";

// category width
const CategoryColumn = styled(Grid.Column)`
  &  .selection.dropdown {
    width: 14em;
    float: left;
  }
`;

class Category extends Component {
  componentWillMount() {
    this.props.GetCategoryLevel1Request();
  };
  
  onChangeCategory1 = (value) => {
    if (value === 0) {
      value = null;
    }
    this.props.GetCategoryLevel2Request(value);
    this.props.handleCate1(value);
  }

  onChangeCategory2 = (value) => {
    if (value === 0) {
      value = null;
    }
    this.props.handleCate2(value);
  };

  render() {
    return (
      <CategoryColumn className="category"
                      widescreen={this.props.widescreen ? this.props.widescreen : null}
                      largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
                      computer={this.props.computer ? this.props.computer : null}
                      tablet={this.props.tablet ? this.props.tablet : null}
                      mobile={this.props.mobile ? this.props.mobile : null}>
        <FormSelect selection placeholder="1차 카테고리" getValue={this.onChangeCategory1} options={this.props.category1}/>
        <FormSelect selection placeholder="2차 카테고리" getValue={this.onChangeCategory2} options={this.props.category2}/>
      </CategoryColumn>
    )
  }
}

export default Category;
