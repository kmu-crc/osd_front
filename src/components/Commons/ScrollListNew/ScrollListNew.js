import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

// css styling
const ScrollContainer = styled.div`
  .no-data {
    font-size: 28px;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    flex: 0 1 180px;
    justify-content: space-around;
    margin: 10px;
    padding: 10px;
    // background: #F7F7F7;
    // border: 1px solid #EFEFEF;
  }
  .designer {
    flex: 0 1 237px;
    justify-content: space-around;
    margin: 10px;
    padding: 10px;
    // background: #707070;
    // border: 1px solid #FAFAFA;
  }
`;

class ScrollListNew extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, loading: false, page: 0, gap: 150, cols: 0 };
    this.getLoadData = this.getLoadData.bind(this);
  }
  componentDidMount(){
    window.addEventListener("scroll",this.handleScroll, false);
  }
  getLoadData = page => {
    this.props.getListRequest(page)
      .then(this.setState({ hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true, loading: true }))
      .catch((err) => {
        this.setState({ hasMore: false });
      });
  };

  render() {
    const { ListComponent, type } = this.props;
    return (
      <ScrollContainer>
        {this.props.dataListAdded.length > 0 ?
          <ListContainer>
            {this.props.dataListAdded.map(content => (
              <div key={content.uid} className={`${type}`}>
                <ListComponent data={content} rerender={this.props.rerender} />
              </div>
            ))}
          </ListContainer>
          :
          <div className="no-data">
            {type === "item" ? "아이템이 없습니다." : type === "Group" ? "등록된 그룹이 없습니다." : "등록된 작품이 없습니다"}
          </div>
        }
      </ScrollContainer>
    );
  }
}

export default ScrollListNew;
