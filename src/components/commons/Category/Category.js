import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import { FormSelect } from "components/Commons/FormItem";

// category width
const CategoryColumn = styled(Grid.Column)`
  @media only screen and (max-width: 1200px) {
    display: block;
  }
  @media only screen and (min-width: 1200px) {
    display: none;
  }
  & .selection.dropdown {
    width: 14em;
    float: left;
  }
  & .grid.ui {
    margin: 0;
  }
`;

class Category extends Component {
  state = {
    activeCate2: this.props.category2[0]
  }

  componentDidMount(){
    if (this.props.cate1 && this.props.cate1 !== "null") {
      this.setState({
        activeCate2: this.props.category2[this.props.cate1]
      });
    }
  }

  onChangeCategory1 = async value => {
    if (value === 0) {
      value = null;
      this.setState({
        activeCate2: this.props.category2[0]
      });
    } else {
      await this.setState({
        activeCate2: this.props.category2[value]
      });
    }
    this.props.handleCate1(value, true);
  };

  onChangeCategory2 = async value => {
    if (value === 0) {
      value = null;
    }
    this.props.handleCate2(value);
  };

  render() {
    return (
      <CategoryColumn
        className="category"
        widescreen={this.props.widescreen ? this.props.widescreen : null}
        largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
        computer={this.props.computer ? this.props.computer : null}
        tablet={this.props.tablet ? this.props.tablet : null}
        mobile={this.props.mobile ? this.props.mobile : null}
      >
        <Grid>
          <Grid.Column mobile={8} tablet={5} computer={4}>
            <FormSelect
              placeholder="1차 카테고리"
              value={this.props.cate1 === "null" ? null : this.props.cate1}
              getValue={this.onChangeCategory1}
              options={this.props.category1}
            />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={4}>
            <FormSelect
              placeholder="2차 카테고리"
              value={this.props.cate2 === "null" ? null : this.props.cate2}
              getValue={this.onChangeCategory2}
              options={this.state.activeCate2}
            />
          </Grid.Column>
        </Grid>
      </CategoryColumn>
    );
  }
}

export default Category;
