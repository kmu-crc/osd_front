import React, { Component } from "react";
import { Grid, Select } from "semantic-ui-react";

const categoryLevel1 = [
  { key: "fashion", value: "fashion", text: "패션" },
  { key: "product", value: "product", text: "제품" },
  { key: "comm", value: "comm", text: "커뮤니케이션" },
  { key: "place", value: "place", text: "공간" },
  { key: "enter", value: "enter", text: "엔터테인먼트" },
  { key: "new", value: "new", text: "새분야" },
];

class Category extends Component {
  render(){
    return(
      <Grid.Column className="category">
        <Select placeholder="1차 카테고리" options={categoryLevel1} />
        <Select placeholder="2차 카테고리" options={categoryLevel1} />
      </Grid.Column>
    )
  }
}

export default Category;
