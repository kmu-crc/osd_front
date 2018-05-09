import React, { Component } from "react";
import Design from "../Design";
import styled from "styled-components";
// import { Container, Columns, Row } from "../Grid/index";
import { Grid, Input, Select } from "semantic-ui-react";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 1rem 3rem 5rem;
  min-width: 660px;
  & ul {
    margin-top: 30px;
  }
`;

const MenuContainer = styled(Grid)`
  font-size: 13px;
  & .sorting {
    text-align: right;
  }
`;

const ListContainer = styled(Grid)`

`;

const categoryLevel1 = [
  { key: "fashion", value: "fashion", text: "패션" },
  { key: "product", value: "product", text: "제품" },
  { key: "comm", value: "comm", text: "커뮤니케이션" },
  { key: "place", value: "place", text: "공간" },
  { key: "enter", value: "enter", text: "엔터테인먼트" },
  { key: "new", value: "new", text: "새분야" },
];

const sorting = [
  { key: "date", value: "date", text: "최신순" },
  { key: "like", value: "like", text: "좋아요순" }
];

class DesignList extends Component {
  render(){
    let list = this.props.DesignList;
    return(
      <div>
        {list != null && list.length > 0 ?
        <Wrapper>
          <MenuContainer devided="vertically" padded={true} columns={2}>
            <Grid.Row>
              <Grid.Column className="category">
                <Select placeholder="1차 카테고리" options={categoryLevel1} />
                <Select placeholder="2차 카테고리" options={categoryLevel1} />
              </Grid.Column>
              <Grid.Column className="sorting">
                <Select options={sorting} />
              </Grid.Column>
            </Grid.Row>
          </MenuContainer>
          <ListContainer padded={true} columns={6} as="ul">
            <Grid.Row>
              {list.map(design =>
                <Grid.Column key={design.uid}><Design design={design}/></Grid.Column>
              )}
            </Grid.Row>
          </ListContainer>
        </Wrapper>
        :
        <p>등록된 디자인이 없습니다.</p>
        }
      </div>
    );
  }
}

export default DesignList;
