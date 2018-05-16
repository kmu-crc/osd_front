import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import Design from "../../Design";
import Group from "../../Group";
import Designer from "../../Designer";

// css styling

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ContentList extends Component {
  render(){
    let data = this.props.data;
    const type = this.props.type;
    return(
      <ListContainer padded={true} columns={6} as="ul">
      {data != null && data.length > 0 ? 
        <Grid.Row stretched={false}>
        {data.map(content =>
          <Grid.Column key={content.uid}>
          { type === "design"? <Design design={content} user={this.props.user}/> 
          : type === "group"? <Group group={content} user={this.props.user}/> 
          : <Designer designer={content} user={this.props.user}/> }      
          </Grid.Column>
        )}
      </Grid.Row>
      :
      <Grid.Row>등록된 컨텐츠가 없습니다.</Grid.Row>
      }
      </ListContainer>
    );
  }
}

export default ContentList;
