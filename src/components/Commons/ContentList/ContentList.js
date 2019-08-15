import React, { Component } from "react"
import { Grid } from "semantic-ui-react"
import Design from "components/Designs/Design"
import Group from "components/Groups/Group"
import styled from 'styled-components'

// css styling
const OutBtn = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
`;

const AcceptBtn = styled.button`
  position: absolute;
  top: 0;
  right: 80px;
`;

const Nodata = styled.p`
  text-align: center;
  width: 100%;
`;

class ContentList extends Component {
  render() {
    let data = this.props.data;
    const type = this.props.type;
    return (
      <Grid>
        <Grid.Row>
          {data.length > 0 ? data.map(data => (
            <Grid.Column mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2}
              className="largeCustom"
              key={data.uid}>
              {type === "design" ? <Design data={data} rerender={this.props.rerender} history={this.props.history} />
                : <Group data={data} rerender={this.props.rerender} history={this.props.history} />
              }

              {this.props.handleAccept &&
                <AcceptBtn className="ui button black" onClick={() => this.props.handleAccept(data.uid)}>가입승인</AcceptBtn>
              }
              <OutBtn className="ui button black" onClick={() => this.props.handleClick(data.uid)}>삭제</OutBtn>
            </Grid.Column>
          ))
            :
            <Nodata>
              {type === "design" ? "해당 작품이 없습니다" : "해당 그룹이 없습니다"}
            </Nodata>
          }
        </Grid.Row>
      </Grid>
    );
  }
}

export default ContentList;
