import React, { Component } from "react"
import styled from "styled-components"

// css 
const FlexContainer = styled.div`
  width: 1910px;
  padding: 0;
  margin-left: 10px;
  list-style: none;
`;
const FlexBox = styled.div`
  width: ${props => props.width};
  height:${props => props.height};
  margin-right: ${props => props.marginRight};
  margin-bottom: ${props => props.marginBottom};
  &.right-last { margin-right: ${props => props.marginRightLast}; }
  &.bottom-last { margin-bottom: ${props => props.marginBottomLast}; }
  display: inline-block;
`;
const OutBtn = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
`;
const AcceptBtn = styled.button`
  position: relative;
  top: 0;
  right: 80px;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false, callCount: 0 }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true)
  }
  checkAndGetData = () => {
    const { hasMore, loading, callCount } = this.state;

    if (callCount < 2) {
      this.setState({ callCount: callCount + 1 });
      this.getLoadData();

    }
    if ((this.myRef.current && this.myRef.current.getBoundingClientRect().bottom - window.innerHeight <= 150 && hasMore && loading === false)) {
      this.setState({ callCount: 0 });
    }
  }
  handleScroll = (e) => {
    this.checkAndGetData()
  }
  getLoadData = () => {
    if (this.state.hasMore === false) return
    this.setState({ loading: true });
    if (this.props.getListRequest) {
      this.props.getListRequest()
        .then(() => {
          this.setState({ hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true, loading: false })
        }).catch(err => {
          this.setState({ hasMore: false, loading: false }) // console.log(err)
        })
    }
    else {
      this.setState({ hasMore: false, loading: false })
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.page === 0) {
      console.log("is more")
      this.setState({ hasMore: true })
    }
  }
  myRef = React.createRef()
  render() {
    const ListComponent = this.props.ListComponent;
    const { handleAccept, handleReject, cols, width, height, marginRight, marginRightLast, marginBottom, marginBottomLast, dataListAdded } = this.props;
    const { loading, hasMore } = this.state;
    console.log("len:", dataListAdded.length)
    return (<>
      {dataListAdded && dataListAdded.length > 0 ?
        <FlexContainer onLoad={this.checkAndGetData} ref={this.myRef}>
          {dataListAdded.map((item, i) => {
            const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : "";
            const bottom = (dataListAdded.length - (dataListAdded.length % cols)) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : "";
            return (<FlexBox width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast} key={i} className={`${last} ${bottom}`}>
              {handleAccept && <AcceptBtn className="ui button black" onClick={() => this.props.handleAccept(item.uid)}>가입승인</AcceptBtn>}
              {handleReject && <OutBtn className="ui button black" onClick={() => this.props.handleReject(item.uid)}>삭제</OutBtn>}
              <ListComponent data={item} />
            </FlexBox>)
          })}
          {loading && <p style={{ color: "#707070", opacity: ".75", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "32px", textAlign: "center", width: "100%", transform: "translateY(-25px)" }}>목록을 가져오고 있습니다.</p>}
          {hasMore && <i style={{ color: "#707070", opacity: ".75", fontSize: "64px", textAlign: "center", width: "100%" }} className="material-icons">arrow_drop_down</i>}
        </FlexContainer>
        : <div>데이터가 없습니다.</div>}
    </>)
  }
}

export default ScrollList