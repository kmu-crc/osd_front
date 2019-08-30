import React, { Component } from "react"
import styled from "styled-components"

// css 
const FlexContainer = styled.div`
  width: 1910px;
  padding: 0;
  margin-left: 10px;
  list-style: none;
`
const FlexBox = styled.div`
  width: ${props => props.width || "330px"};
  height:${props => props.height || "330px"};
  margin-right: ${props => props.marginRight || "63px"};
  margin-bottom: ${props => props.marginBottom || "80px"};
  &.right-last { margin-right: ${props => props.marginRightLast || "8px"}; }
  &.bottom-last { margin-bottom: ${props => props.marginBottomLast || "26px"}; }
  display: inline-block;
`
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
    this.props.getListRequest()
      .then(() => {
        this.setState({ hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true, loading: false })
      }).catch(err => {
        this.setState({ hasMore: false, loading: false }) // console.log(err)
      })
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
    const { cols } = this.props;
    return (<>
      {this.props.dataListAdded && this.props.dataListAdded.length > 0 &&
        <FlexContainer onLoad={this.checkAndGetData} ref={this.myRef}>
          {this.props.dataListAdded.map((item, i) => {
            const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : "";
            const bottom = (this.props.dataListAdded.length - (this.props.dataListAdded.length % cols)) - 1 < i || this.props.dataListAdded.length - cols === 0 ? "bottom-last" : "";
            return (<FlexBox width={this.props.width} height={this.props.height} marginRight={this.props.marginRight} marginBottom={this.props.marginBottom} marginRightLast={this.props.marginRightLast} marginBottomLast={this.props.marginBottomLast} key={i} className={`${last} ${bottom}`}>
              <ListComponent data={item} />
            </FlexBox>)
          })}
          {this.state.loading && <p style={{ color: "#707070", opacity: ".75", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "32px", textAlign: "center", width: "100%", transform: "translateY(-25px)" }}>목록을 가져오고 있습니다.</p>}
          {this.state.hasMore && <i style={{ color: "#707070", opacity: ".75", fontSize: "64px", textAlign: "center", width: "100%" }} className="material-icons">arrow_drop_down</i>}
        </FlexContainer>}
    </>)
  }
}

export default ScrollList