import React, { Component } from "react";
import styled from "styled-components";

// css 
const FlexContainer = styled.div`
  width: 1910px;
  padding: 0;
  margin-left: 10px;
  list-style: none;
  position:relative;
`;
const FlexBox = styled.div`
  width: ${props => props.width};
  height:${props => props.height};
  margin-right: ${props => props.marginRight};
  margin-bottom: ${props => props.marginBottom};
  &.right-last { margin-right: ${props => props.marginRightLast}; }
  &.bottom-last { margin-bottom: ${props => props.marginBottomLast}; }
  display: inline-block;
  position: relative;
`;
const OutBtn = styled.button`
  position: absolute;
  top: 0;
  right: 5px;
  z-index: 900;
`;
const AcceptBtn = styled.button`
  position: absolute;
  top: 0;
  right: 80px;
  z-index: 900;
`;
const MoreBtn = styled.button`
  position: relative;
  left: 50%;
  z-index: 900;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false, page: 0, gap: 150 };
  componentDidMount() {
    !this.props.manual && window.addEventListener("scroll", this.handleScroll, true);
  };
  componentWillUnmount() {
    !this.props.manual && window.removeEventListener("scroll", this.handleScroll, true);
  };

  handleScroll = (e) => {
    const reach = e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - this.state.gap;
    reach && this.state.hasMore && this.state.loading === false && this.getLoadData();
  };
  getLoadData = async (page) => {
    const { dataList } = this.props;
    if (!this.props.getListRequest) return;

    await this.setState({ loading: true, page: this.state.page + 1 }, () => {
      this.props.getListRequest(this.state.page)
        .then(() => {
          this.setState({ hasMore: this.checkHasMore(dataList), loading: false });
        }).catch((err) => {
          console.log(err); this.setState({ loading: false, hasMore: false });
        });
    })

  };
  checkHasMore = (list) => {
    return list == null || list && list.length < 10 ? false : true;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) {
      this.setState({ hasMore: true, loading: false, page: 0 });
      this.props.handleReload && this.props.handleReload();

     if (nextProps.dataListAdded.length != this.props.dataListAdded.length) {
        console.log("got changed");
        return true;
      }
    };
  }
  myRef = React.createRef();
  render() {
    const ListComponent = this.props.ListComponent;
    const { manual, handleAccept, handleReject, cols, width, height, marginRight, marginRightLast, marginBottom, marginBottomLast, dataListAdded, dataList } = this.props;
    const { hasMore, loading } = this.state;
    return (<>
      {dataListAdded && dataListAdded.length > 0 ?
        <FlexContainer ref={this.myRef} >
          {dataListAdded.map((item, i) => {
            const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : "";
            const bottom = (dataListAdded.length - (dataListAdded.length % cols)) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : "";
            return (<FlexBox key={item.uid + i} width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast} key={i} className={`${last} ${bottom}`}>
              {handleAccept && <AcceptBtn className="ui button black" onClick={() => handleAccept(item.uid)}>가입승인</AcceptBtn>}
              {handleReject && <OutBtn className="ui button black" onClick={() => handleReject(item.uid)}>삭제</OutBtn>}
              <ListComponent data={item} />
            </FlexBox>)
          })}
          {loading && <p style={{ color: "#707070", opacity: ".75", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "32px", textAlign: "center", width: "100%", transform: "translateY(-25px)" }}>목록을 가져오고 있습니다.</p>}
          {!manual && hasMore && <div style={{ cursor: "default", textAlign: "center", color: "#707070", fontWeight: "500" }} onMouseOver={this.getLoadData}>스크롤<i style={{ color: "#707070", opacity: ".75", fontSize: "64px", textAlign: "center", width: "100%" }} className="material-icons">arrow_drop_down</i></div>}
          {manual && hasMore && <div><MoreBtn className="ui button red" onClick={() => this.getLoadData()}>더보기</MoreBtn></div>}
        </FlexContainer>
        : <div style={{ fontSize: "16px", textAlign: "center" }}>데이터가 없습니다.</div>}
    </>)
  }
}

export default ScrollList;