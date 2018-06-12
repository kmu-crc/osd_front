import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Design from "components/Designs/Design";
import Group from "components/Groups/Group";

// css styling

class ContentList extends Component {
  render(){
    let data = this.props.data;
    const type = this.props.type;
    return(
      <Grid.Row>
      {data && data.map(data => (
        <Grid.Column mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4}
                    className="largeCustom"
                    key={data.uid}>
          {type === "design" ? <Design data={data} rerender={this.props.rerender}/>
                             : <Group data={data} rerender={this.props.rerender}/>
          }
        </Grid.Column>
      ))
      }
    </Grid.Row>
    );
  }
}

export default ContentList;
