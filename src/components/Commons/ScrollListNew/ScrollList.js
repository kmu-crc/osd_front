import React, { Component } from "react";
import Design from "components/Designs/Design";
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer";
import styled from "styled-components";
import osdcss from "opendesign_style";
import Fade from 'react-reveal/Fade';

// css 
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start; 
  padding-left: 10px;
  gap: ${props => props.row}px ${props => props.col}px; //20px 30px; /* row-gap column gap */
  width: ${props => props.width}px;
  // border: 1px dashed #0ABCDE;
  overflow: hidden;
`;
const OutBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 900;
`;
const AcceptBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 80px;
  z-index: 900;
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

class ScrollList extends Component {
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

    return (dataListAdded && dataListAdded.length > 0 ?
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
          return (<li key={item.uid + "-" + i} style={{ listStyle: "none" }}>
            {ListComponent
              ? <Fade >
                <ListComponent data={item} />
              </Fade>
              : null}

            {/* {handleAccept && <AcceptBtn className="ui button black" onClick={() => handleAccept(item.uid)}>가입승인</AcceptBtn>} */}
            {/* {handleReject && <OutBtn className="ui button black" onClick={() => handleReject(item.uid)}>{rejectText || "삭제"}</OutBtn>} */}
            {/* {type === "design" ? <Design data={item} /> : null} */}
            {/* {type === "group" ? <Group data={item} /> : null} */}
            {/* {type === "designer" ? <Designer data={item} /> : null} */}
          </li>)
        })
        }
        {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
        {!manual && hasMore && <ScrollIcon onMouseOver={this.getLoadData}> {/* 스크롤 */} {/* <i className="material-icons">arrow_drop_down</i> */} </ScrollIcon>}
        {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}

      </FlexContainer > : null
      // <NoData>{type === "design" ? "디자인이" : type === "group" ? "그룹이" : "디자이너가"} 없습니다.</NoData>)
    )
  }
}

export default ScrollList;
