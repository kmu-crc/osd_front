import React, { Component } from "react";
import { Grid, Dropdown } from "semantic-ui-react";

const categoryLevel1 = [
  { key: "fashion", value: "1", text: "패션" },
  { key: "product", value: "2", text: "제품" },
  { key: "comm", value: "3", text: "커뮤니케이션" },
  { key: "place", value: "4", text: "공간" },
  { key: "enter", value: "5", text: "엔터테인먼트" },
  { key: "new", value: "6", text: "새분야" },
];

const categoryLevel2 = [
  { key: "fashion", value: "1", text: "패션" },
  { key: "product", value: "2", text: "제품" },
  { key: "comm", value: "3", text: "커뮤니케이션" },
  { key: "place", value: "4", text: "공간" },
  { key: "enter", value: "5", text: "엔터테인먼트" },
  { key: "new", value: "6", text: "새분야" },
];

class Category extends Component {
  render() {
    return (
      <Grid.Column className="category"
        widescreen={this.props.widescreen ? this.props.widescreen : null}
        largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
        computer={this.props.computer ? this.props.computer : null}
        tablet={this.props.tablet ? this.props.tablet : null}
        mobile={this.props.mobile ? this.props.mobile : null}>
        <Dropdown selection placeholder="1차 카테고리" options={categoryLevel1} onChange={this.props.handleCate1} />
        <Dropdown selection placeholder="2차 카테고리" options={categoryLevel2} onChange={this.props.handleCate2} />
      </Grid.Column>
    )
  }
}

export default Category;
