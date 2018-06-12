import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Design from "components/Designs/Design";
import Group from "components/Groups/Group";
import styled from 'styled-components';

// css styling
const OutBtn = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
`;

class ContentList extends Component {
  render(){
    let data = this.props.data;
    const type = this.props.type;
    return(
      <Grid.Row>
      {data.length > 0 ? data.map(data => (
        <Grid.Column mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4}
                    className="largeCustom"
                    key={data.uid}>
          {type === "design" ? <Design data={data} rerender={this.props.rerender}/>
                             : <Group data={data} rerender={this.props.rerender}/>
          }
          <OutBtn className="ui button black" onClick={()=>this.props.handleClick(data.uid)}>삭제</OutBtn>
        </Grid.Column>
      ))
      :
      <p>컨텐츠가 없습니다.</p>
      }
    </Grid.Row>
    );
  }
}

export default ContentList;
