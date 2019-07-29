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
const LoadingIcon = styled.i`
  width: 100%;
  color: #707070;
  opacity: .75;
  font-size: 64px;
  text-align: center;
`
const LoadingText = styled.p`
  width: 100%;
  opacity: .75;
  color: #707070;
  font-size: 16px;
  text-align: center;
  font-family: Noto Sans KR;
  font-weight: 500;
`
class ScrollList extends Component {
  state = { hasMore: true, loading: false, gap: 150 }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true)
  }
  checkAndGetData = () => {
    const { hasMore, loading, gap } = this.state
    if (this.myRef.current && this.myRef.current.getBoundingClientRect().bottom - window.innerHeight <= gap && hasMore && loading === false) {
      this.getLoadData()
    }
  }
  handleScroll = (e) => {
    this.checkAndGetData()
  }
  getLoadData = () => {
    if (this.state.hasMore === false) return
    this.setState({ loading: true })
    this.props.getListRequest()
      .then(() => {
        this.setState({ hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true, loading: false })
      }).catch(err => {
        this.setState({ hasMore: false, loading: false })
        console.log(err)
      })
  }
  componentWillReceiveProps(newProps) {
    if (newProps.page === 0) {
      this.setState({ hasMore: true })
    }
  }
  myRef = React.createRef()
  render() {
    const ListComponent = this.props.ListComponent
    const { width, height, marginRight, marginBottom, marginRightLast, marginBottomLast, cols, dataListAdded } = this.props
    const { loading, hasMore } = this.state
    // console.log(this.props.dataList, this.props.dataListAdded)

    return (<>
      {dataListAdded.length > 0 &&
        <FlexContainer onLoad={this.checkAndGetData} ref={this.myRef}>
          {dataListAdded.map((item, i) => {
            const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : ""
            const bottom = (dataListAdded.length - cols) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : ""
            return (<FlexBox
              className={`${last} ${bottom}`}
              width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
              key={i} >
              <ListComponent data={item} />
            </FlexBox>)
          })}
          {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
          {hasMore && <LoadingIcon className="material-icons">arrow_drop_down</LoadingIcon>}
        </FlexContainer>}
    </>)
  }
}

export default ScrollList