import React, { Component } from "react";
import Design from "components/Designs/Design";
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer";
import styled from "styled-components";
import osdcss from "opendesign_style";
// css 
const SmallMinWidth = 0;
const SmallMaxWidth = 480;
const MediumMinWidth = 480;
const MediumMaxWidth = 1440;
const LargeMinWidth = 1440;
const LargeMaxWidth = 1920;

const FlexContainer = styled.div`
  @media only screen and (min-width : ${SmallMinWidth}px) and (max-width : ${SmallMaxWidth}px) {
    width: ${SmallMaxWidth}px;
  }
  @media only screen and (min-width : ${MediumMinWidth}px) and (max-width : ${MediumMaxWidth}px) {
    width: ${MediumMaxWidth}px;
  }
  @media only screen and (min-width : ${LargeMinWidth}px) and (max-width : ${LargeMaxWidth}px) {
    width: ${LargeMaxWidth}px;
  }
  @media only screen and (min-width : ${LargeMaxWidth}px){
    width: ${LargeMaxWidth}px;
  }
  padding: 0;
  margin-left: 10px;
  position: relative;
`;

const FlexBox = styled.div`
  flex: 0 0 ${props => props.width}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: ${props => props.marginBottom}px;
  margin-right: ${props => props.marginRight}px;
  &.bottom-last { 
    margin-bottom: ${props => props.marginBottomLast}px; 
  }

  &.right-last { 
    @media only screen and (min-width : ${SmallMinWidth}px) and (max-width : ${SmallMaxWidth}px) {
      margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.small.marginRightLast :
      props.type === "group" ? osdcss.group_margin.small.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.small.marginRightLast : 0}px; 
    }
    @media only screen and (min-width : ${MediumMinWidth}px) and (max-width : ${MediumMaxWidth}px) {   margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.medium.marginRightLast :
      props.type === "group" ? osdcss.group_margin.medium.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.medium.marginRightLast : 0}px; 
    }
    @media only screen and (min-width : ${LargeMinWidth}px) and (max-width : ${LargeMaxWidth}px) {   margin-right: ${props =>
    props.type === "design" ? osdcss.design_margin.large.marginRightLast :
      props.type === "group" ? osdcss.group_margin.large.marginRightLast :
        props.type === "designer" ? osdcss.designer_margin.large.marginRightLast : 0}px; 
    }
    @media only screen and (min-width : ${LargeMaxWidth}px){   margin-right: ${props =>
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
const NoData = styled.div`
  padding-top: 160px;
  width: 100%;
  height: 330px;
  font-size: 16px;
  text-align: center;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false, page: 0, gap: 150, cols: 0 };

  componentDidMount() {
    !this.props.manual && window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize, false);
    this.getColumnNumber(this.props.type);
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
          console.log(err);
          this.setState({ loading: false, hasMore: false });
        });
    });
  };

  checkHasMore = (list) => {
    if (list == null) return false;
    return list && list.length < 10 ? false : true;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) {
      this.setState({ hasMore: true, loading: false, page: 0 });
      this.props.handleReload && this.props.handleReload();
      if (nextProps.dataListAdded.length !== this.props.dataListAdded.length) {
        console.log("got changed");
        return true;
      }
    };
  };

  getColumnNumber(type) {
    let cols = 0;
    let w = window.innerWidth > LargeMaxWidth ? LargeMaxWidth : window.innerWidth;
    if (SmallMinWidth <= w && w < SmallMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.small.cols :
        type === "group" ? osdcss.group_margin.small.cols :
          osdcss.designer_margin.small.cols;
    } else if (MediumMinWidth <= w && w < MediumMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.medium.cols :
        type === "group" ? osdcss.group_margin.medium.cols :
          osdcss.designer_margin.medium.cols;
    } else if (LargeMinWidth <= w && w < LargeMaxWidth) {
      cols = type === "design" ? osdcss.design_margin.large.cols :
        type === "group" ? osdcss.group_margin.large.cols :
          osdcss.designer_margin.large.cols;
    } else {
      cols = type === "design" ? osdcss.design_margin.big.cols :
        type === "group" ? osdcss.group_margin.big.cols :
          osdcss.designer_margin.big.cols;
    }
    console.log("col:", cols);
    this.setState({ cols: cols });
  };

  handleResize = () => {
    this.getColumnNumber(this.props.type);
  };

  myRef = React.createRef();
  render() {
    const { type, manual, handleAccept, handleReject, width, height, marginRight, marginRightLast, marginBottom, marginBottomLast, dataListAdded } = this.props;
    const { hasMore, loading, cols } = this.state;
    console.log("type:", type);
    return (<React.Fragment>
      {dataListAdded && dataListAdded.length > 0 ?
        <FlexContainer type={type} ref={this.myRef} >
          {dataListAdded.map((item, i) => {
            const last = (i + 1) % cols === 0 && i !== 0 ? "right-last" : "";
            const bottom = (dataListAdded.length - (dataListAdded.length % cols)) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : "";
            return (<FlexBox width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast} key={i} className={`${last} ${bottom}`}>
              {handleAccept && <AcceptBtn className="ui button black" onClick={() => handleAccept(item.uid)}>가입승인</AcceptBtn>}
              {handleReject && <OutBtn className="ui button black" onClick={() => handleReject(item.uid)}>삭제</OutBtn>}
              {type === "design" ? <Design data={item} /> : null}
              {type === "group" ? <Group data={item} /> : null}
              {type === "designer" ? <Designer data={item} /> : null}
            </FlexBox>)
          })}
          {loading && <p style={{ color: "#707070", opacity: ".75", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "32px", textAlign: "center", width: "100%", transform: "translateY(-25px)" }}>목록을 가져오고 있습니다.</p>}
          {!manual && hasMore && <div style={{ cursor: "default", textAlign: "center", color: "#707070", fontWeight: "500" }} onMouseOver={this.getLoadData}>스크롤<i style={{ color: "#707070", opacity: ".75", fontSize: "64px", textAlign: "center", width: "100%" }} className="material-icons">arrow_drop_down</i></div>}
          {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}
        </FlexContainer>
        : <NoData>데이터가 없습니다.</NoData>}
    </React.Fragment>)
  }
}

export default ScrollList;