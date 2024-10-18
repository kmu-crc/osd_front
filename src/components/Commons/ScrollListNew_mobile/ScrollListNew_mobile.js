import React, { Component } from "react";
import styled from "styled-components";

// css 
const FlexContainer = styled.div`
  height:100%;
  display:flex;
  flex-flow:wrap;
  flex-direction:column;
  overflow-X:overlay;
  overflow-Y:hidden;
  scroll-behavior:smooth;
  align-content:flex-start;
  gap: ${props => props.row}px ${props => props.col}px;
  ::-webkit-scrollbar { display: none; }

`;
const MoreBtn = styled.button`
  position: relative;
  left: 50%;
  z-index: 900;
`;
const LoadingText = styled.p`
  color: #707070;
  opacity: .75; 
  font-family: Noto Sans KR;
  font-weight: 300;
  font-size: 24px; 
  line-height: 32px;
  text-align: center;
  width: 100%;
  padding: 20px 0px 10px 0px;
`;
const ScrollIcon = styled.div`
  cursor: default;
  text-align: center;
  color: #707070;
  font-weight: 500;
  i {
    color: #707070;
    opacity: .75;
    font-size: 64px;
    text-align: center;
    width: 100%;
  }
`;


class ScrollListNew_mobile extends Component {
  state = { hasMore: true, loading: false, page: 0, gap: 100, cols: 0 };
  componentDidMount() {
    !this.props.manual && window.addEventListener("scroll", this.handleScroll, true);
    this.props.manual && this.getLoadData();
    window.addEventListener("resize", this.handleResize, false);
    // this.getColumnNumber(this.props.type);
  };
  componentWillUnmount() {
    !this.props.manual && window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize, false);
  };
  handleScroll = (e) => {
    const reach = e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - this.state.gap;
    reach && this.state.hasMore && this.state.loading === false && this.getLoadData();
  };
  getLoadData = async () => {
    const { dataList } = this.props;
    if (!this.props.getListRequest) return;
    await this.setState({ loading: true, page: this.state.page + 1 }, () => {
      this.props.getListRequest(this.state.page)
        .then(() => {
          this.setState({ hasMore: this.checkHasMore(dataList), loading: false });
        }).catch((err) => {
          console.error(err);
          this.setState({ loading: false, hasMore: false });
        });
    });
  };
  checkHasMore = (list) => {
    if (list == null) return false;
    if (this.props.type === "designer") {
      return list && list.length < 30 ? false : true;
    }
    return list && list.length < 10 ? false : true;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.dataList.length === 0 && this.props.dataList.length === 10) {
      this.getLoadData();
    }
  }
  myRef = React.createRef();

  render() {
    const { ListComponent, type, manual, dataListAdded, rejectText, handleAccept, handleReject } = this.props;
    const { hasMore, loading, cols } = this.state;
    const { row, col } = this.props;

    return (
      <React.Fragment>
        {dataListAdded && dataListAdded.length > 0 ?
            <FlexContainer
              width={this.props.width}
              row={row || 20}
              col={col || 30}
              cols={cols}
              type={type}
              ref={this.myRef}
              onLoad={() => {
                const { loading, page } = this.state;
                let footer = document.getElementById("footer-div");
                footer = footer.getBoundingClientRect();
                const box = this.myRef.current.getBoundingClientRect();
                if (loading == false && page === 0 && this.myRef && footer.y > box.y + box.height) {
                  this.getLoadData();
                }
              }} >
              {dataListAdded.map((item, i) => {
                return (<React.Fragment>
                  {ListComponent
                    ? <ListComponent data={item} />
                    : null}     
                </React.Fragment>)
              })
              }
              {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
              {!manual && hasMore && <ScrollIcon onMouseOver={this.getLoadData}> </ScrollIcon>}
              {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}      
            </FlexContainer > : null}
      </React.Fragment>
    )
  }
}

export default ScrollListNew_mobile;


// dataListAdded && dataListAdded.length > 0 ?
//       <FlexContainer
//         width={this.props.width}
//         row={row || 20}
//         col={col || 30}
//         cols={cols}
//         type={type}
//         ref={this.myRef}
//         onLoad={() => {
//           const { loading, page } = this.state;
//           let footer = document.getElementById("footer-div");
//           footer = footer.getBoundingClientRect();
//           const box = this.myRef.current.getBoundingClientRect();
//           if (loading == false && page === 0 && this.myRef && footer.y > box.y + box.height) {
//             this.getLoadData();
//           }
//         }} >
//         {dataListAdded.map((item, i) => {
//           return (<li key={item.uid + "-" + i} style={{ listStyle: "none" }}>
//             {ListComponent
//               ? <ListComponent data={item} />
//               : null}

//           </li>)
//         })
//         }
//         {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
//         {!manual && hasMore && <ScrollIcon onMouseOver={this.getLoadData}> </ScrollIcon>}
//         {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}

//       </FlexContainer > : null