import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import Design from "components/Designs/Design";
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer";

// css styling

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ContentList extends Component {
  render(){
    let data = this.props.data;
    const type = this.props.type;
    return(
      <ListContainer devided="vertically" padded={true} columns={this.props.columns} as="ul">
      {data != null && data.length > 0 ?
        <Grid.Row>
        {data.map(content =>
          <Grid.Column key={content.uid}>
          { type === "design"? <Design data={content} user={this.props.user}/>
          : type === "group"? <Group data={content} user={this.props.user} rerender={this.props.rerender}/>
          : <Designer data={content} user={this.props.user}/> }
          </Grid.Column>
        )}
      </Grid.Row>
      :
      null
      }
      </ListContainer>
    );
  }
}

export default ContentList;
