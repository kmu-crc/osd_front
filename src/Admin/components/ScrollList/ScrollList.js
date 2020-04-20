import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

// css styling
const ScrollContainer = styled.div`
  & .ui.centered.inline.loader.active.loading,
  & .ui.centered.inline.loader.visible.loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  & p {
    text-align: center;
  }
`;

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ScrollList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = () => {
    this.props.getListRequest();
  };

  render() {
    const ListComponent = this.props.ListComponent;

    return (
      <ScrollContainer>
        <button onClick={this.getLoadData}>가져오기</button>
          {this.props.dataList.length > 0 ?
            <ListContainer padded={true} as="ul">
              <Grid.Row>
                {this.props.dataList.map((content) => (
                  <Grid.Column className={this.props.customClass} key={content.uid}>
                    <ListComponent data={content} rerender={this.props.rerender}/>
                  </Grid.Column>
                  ))
                }
              </Grid.Row>
            </ListContainer>
          :<p>"no data"</p>}
        </ScrollContainer>
    );
  }
}

export default ScrollList;
