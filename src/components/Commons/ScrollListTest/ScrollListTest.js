import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

// CSS STYLE
const ScrollContainer = styled.div`
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
`;
const ListContainer = styled(Grid)``;

class ScrollListTest extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, loading: false };
  };

  getLoadData = page => {
    this.props.getListRequest(page)
      .then(() => {
        this.setState({
          hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true,
          loading: true
        });
      }).catch((err) => {
        console.log(err);
        this.setState({
          hasMore: false
        });
      });
  };

  render() {
    const { ListComponent, type, mobile, tablet, computer, largeScreen, widescreen, customClass, dataListAdded } = this.props;
    return (
      <ScrollContainer>
        {dataListAdded.length > 0 ?
          <InfiniteScroll threshold={100} pageStart={0}
            loadMore={this.getLoadData} hasMore={this.state.hasMore}
            loader={<Loader className="loading" active={false} inline="centered" size="huge" key={0} />}>
            <ListContainer // style={{ margin: "0px", padding: "0px" }}
              devided="vertically" padded={true} as="ul">
              <Grid.Row style={{ marginTop: "0px" }}>
                {dataListAdded.map((content) => (
                  <Grid.Column
                    mobile={mobile} tablet={tablet} computer={computer}
                    largeScreen={largeScreen} widescreen={widescreen} className={customClass}
                    key={content.uid}>
                    <ListComponent data={content} rerender={this.props.rerender} />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </ListContainer>
          </InfiniteScroll>
          :
          <p>
            {type === "Designer" ? "등록된 디자이너가 없습니다"
              : type === "Group" ? "등록된 그룹이 없습니다"
                : "등록된 작품이 없습니다"}
          </p>
        }
      </ScrollContainer>
    );
  }
}

export default ScrollListTest;
