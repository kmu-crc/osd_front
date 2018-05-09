import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import Design from "../../Design";
import Group from "../../Group";

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
        <Grid.Row>
          {data.map(content =>
            <Grid.Column key={content.uid}>
            { type === "design"? <Design design={content}/> : <Group group={content}/> }      
            </Grid.Column>
          )}
        </Grid.Row>
      </ListContainer>
    );
  }
}

export default ContentList;
