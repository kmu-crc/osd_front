import React, { Component } from "react";
import Design from "Admin/components/DesignManager/Design";
// import Group from "components/Groups/Group";
// import Designer from "components/Designers/Designer";
import styled from "styled-components";
import osdcss from "opendesign_style";
import noimg from "source/thumbnail.png";

// @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) and (max-width : ${osdcss.resolutions.SmallMaxWidth}px) {
//   margin-right: ${props =>
//     props.type === "design" ? osdcss.design_margin.small.marginRightLast :
//     props.type === "group" ? osdcss.group_margin.small.marginRightLast :
//     props.type === "designer" ? osdcss.designer_margin.small.marginRightLast : 0}px; 
// }
// css 
function ListElement({ item: { userName, title, thumbnailUrl, uid }, handleTop,handleDel }) {
  // console.log("title",title);
  return <div style={{
      position: "relative",
      backgroundSize: "cover",
      backgroundImage: `url(${thumbnailUrl==null?noimg:thumbnailUrl.m_img})`,
      width: "150px",
      height: "150px",
      borderRadius: "5px",
      marginRight: "5px",
      marginBottom: "5px",
  }}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
          <div
          onClick={() => handleTop(uid)}
          style={{
              cursor: "pointer",
              padding: "5px 10px",
              width: "max-content",
              color: "white",
              backgroundColor: "orange",
              borderRadius: "15px",
          }}>인기디자인</div>
      <div
          onClick={() => handleDel(uid)}
          style={{
              cursor: "pointer",
              padding: "5px 10px",
              marginLeft: "auto",
              width: "max-content",
              color: "white",
              backgroundColor: "red",
              borderRadius: "15px",
          }}>삭제</div>
        </div>
      <div style={{
          bottom: "0px",
          width: "100%",
          position: "absolute",
          padding:"5px",
          backgroundColor: "#707070",
      }}>
          <div title={title} style={{
              padding: "1px 2px",
              fontSize: "16px",
              height: "20px",
              width: "100%",
              color: "white",
              wordWrap: "break-word",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
          }}>
              {title}({uid})</div>
          <div title={userName} style={{
              padding: "1px 2px",
              fontSize: "12px",
              height: "16px",
              width: "100%",
              color: "white",
              wordWrap: "break-word",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              textAlign: "right"
          }}>
              {userName}</div>
      </div>
  </div>
}
const FlexContainer = styled.div`
  max-width:780px;
  height:100%;
  padding: 0;
  position: relative;
  // border:1px solid black;
  @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) and (max-width : ${osdcss.resolutions.SmallMaxWidth}px) {
    margin-left: ${props => props.type === "design" ? 30 : props.type === "group" ? 10 : 10}px;
    width: ${osdcss.resolutions.SmallMaxWidth}px;

  }
  @media only screen and (min-width : ${osdcss.resolutions.MediumMinWidth}px) and (max-width : ${osdcss.resolutions.MediumMaxWidth}px) {
    margin-left: ${props => props.type === "design" ? 100 : props.type === "group" ? 215 : 67}px;
    width: ${osdcss.resolutions.MediumMaxWidth}px;
  }
  @media only screen and (min-width : ${osdcss.resolutions.LargeMinWidth}px) and (max-width : ${osdcss.resolutions.LargeMaxWidth}px) {
    margin-left: ${props => props.type === "design" ? 9 : props.type === "group" ? 11 : 12}px;
    width: ${osdcss.resolutions.LargeMaxWidth}px;
  }
  @media only screen and (min-width : ${osdcss.resolutions.LargeMaxWidth}px) {
    margin-left: ${props => props.type === "design" ? 9 : props.type === "group" ? 11 : 12}px;
    width: ${osdcss.resolutions.LargeMaxWidth}px;
  }
    @media only screen and (min-width : 780px) and (max-width:1440px) {
      overflow-x: overlay;
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
      overflow-x: overlay;
    }

`;
const FlexBox = styled.div`
  flex: 0 0 ${props => props.width}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: ${props => props.marginBottom}px;
  margin-right: ${props => props.marginRight}px;
  &.bottom-last { margin-bottom: ${props => props.marginBottomLast}px; }
  &.right-last { 
    
    @media only screen and (min-width : ${osdcss.resolutions.MediumMinWidth}px) and (max-width : ${osdcss.resolutions.MediumMaxWidth}px) {   margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.medium.marginRightLast :
      props.type === "group" ? osdcss.group_margin.medium.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.medium.marginRightLast : 0}px; 
    }
    @media only screen and (min-width : ${osdcss.resolutions.LargeMinWidth}px) and (max-width : ${osdcss.resolutions.LargeMaxWidth}px) {   margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.large.marginRightLast :
      props.type === "group" ? osdcss.group_margin.large.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.large.marginRightLast : 0}px; 
    }
    @media only screen and (min-width : ${osdcss.resolutions.LargeMaxWidth}px){margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.big.marginRightLast :
      props.type === "group" ? osdcss.group_margin.big.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.big.marginRightLast : 0}px; 
    }
  }
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
const LoadingText = styled.p`
  color: #707070;
  opacity: .75; 
  font-family: Noto Sans KR;
  font-weight: 300;
  font-size: 24px; 
  text-align: center;
  width: 100%;
  transform: translateY(-25px);
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
  state = { hasMore: true, loading: false, page: 0, gap:10, cols: 0 };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.props.manual && this.getLoadData();
    window.addEventListener("resize", this.handleResize, false);
    this.getColumnNumber(this.props.type);
  };
  componentWillUnmount() {
    !this.props.manual && window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize, false);
  };
  handleScroll = (e) => {
    const reach = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight > e.target.scrollingElement.scrollHeight - parseInt(this.state.gap,10);
    console.log("this.handlescroll",reach,e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight,
    e.target.scrollHeight - this.state.gap,
    e.target.scrollingElement.scrollTop,e.target.scrollingElement.clientHeight,e.target.scrollingElement.scrollHeight);
    reach&&this.state.hasMore && this.state.loading === false && this.getLoadData();
  };
  getLoadData = async () => {
    console.log("this.getLoadData");

    const { dataList } = this.props;
    if (!this.props.getListRequest) return;
    await this.setState({ loading: true, page: this.state.page + 1 }, () => {
      this.props.getListRequest(this.state.page)
        .then(() => {
          this.setState({ hasMore: this.checkHasMore(dataList), loading: false });
        }).catch((err) => {
          console.log(err);
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
  componentWillReceiveProps(nextProps) {
    if (!nextProps.dataList || !this.props.dataList) {
      this.setState({ hasMore: false });
    }
    if (nextProps.dataList !== this.props.dataList) {
      this.setState({ hasMore: this.checkHasMore(nextProps.dataList) })
    }
    if (nextProps.reload) {
      this.setState({ hasMore: true, loading: false, page: 0 });
      this.props.handleReload && this.props.handleReload();
      if (nextProps.dataListAdded.length !== this.props.dataListAdded.length) {
        return true;
      }
    };
  };

  getColumnNumber(type) {
    let cols = 0;
    let w = window.innerWidth > osdcss.resolutions.LargeMaxWidth ? osdcss.resolutions.LargeMaxWidth : window.innerWidth;
    if (osdcss.resolutions.SmallMinWidth <= w && w < osdcss.resolutions.SmallMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.small.cols :
        type === "group" ? osdcss.group_margin.small.cols :
          osdcss.designer_margin.small.cols;
    } else if (osdcss.resolutions.MediumMinWidth <= w && w < osdcss.resolutions.MediumMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.medium.cols :
        type === "group" ? osdcss.group_margin.medium.cols :
          osdcss.designer_margin.medium.cols;
    } else if (osdcss.resolutions.LargeMinWidth <= w && w < osdcss.resolutions.LargeMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.large.cols :
        type === "group" ? osdcss.group_margin.large.cols :
          osdcss.designer_margin.large.cols;
    } else {
      cols = type === "design" ? osdcss.design_margin.big.cols :
        type === "group" ? osdcss.group_margin.big.cols :
          osdcss.designer_margin.big.cols;
    }
    this.setState({ cols: cols });
  };

  handleResize = () => {
    this.getColumnNumber(this.props.type);
  };


  myRef = React.createRef();
  render() {
    const { type, manual, handleAccept, handleReject, width, height, marginRight, marginRightLast, marginBottom, marginBottomLast, dataListAdded, rejectText } = this.props;
    const { hasMore, loading, cols } = this.state;
    // console.log(this.props);
    return (dataListAdded && dataListAdded.length > 0 ?

      <FlexContainer cols={cols} type={type} ref={this.myRef} >
        {dataListAdded.map((item, i) => {
          const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : "";
          const bottom = (dataListAdded.length - (dataListAdded.length % cols)) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : "";
          return (<FlexBox width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast} key={i} className={`${last} ${bottom}`}>
            {handleAccept && <AcceptBtn className="ui button black" onClick={() => handleAccept(item.uid)}>가입승인</AcceptBtn>}
            {handleReject && <OutBtn className="ui button black" onClick={() => handleReject(item.uid)}>{rejectText || "삭제"}</OutBtn>}
            {/* {type === "design" ? <Design data={item} /> : null}
            {type === "group" ? <Group data={item} /> : null}
            {type === "designer" ? <Designer data={item} /> : null} */}
            {type === "design"&&item!=null ? <ListElement 
            item={item} 
            handleDel={
              () => this.props.DeleteDesignRequest(item)
          }
          handleTop={
            () => this.props.MakeTopDesign(item.uid)
        }
            /> : null}
          </FlexBox>)
        })}
        {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
        {!manual && hasMore && <ScrollIcon onMouseOver={this.getLoadData}>
          {/* 스크롤 */}
          {/* <i className="material-icons">arrow_drop_down</i> */}
          </ScrollIcon>}
        {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}
      </FlexContainer> : null
      // <NoData>{type === "design" ? "디자인이" : type === "group" ? "그룹이" : "디자이너가"} 없습니다.</NoData>)
    )
  }
}

export default ScrollList;
