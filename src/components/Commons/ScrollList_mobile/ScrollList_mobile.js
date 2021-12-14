import React, { Component } from "react";
import Design_mobile from "components/Designs/Design_mobile";
import Design_mobile_my from "components/Designs/Design_mobile_my";
import Group_mobile from "components/Groups/Group_mobile";
import Designer_mobile from "components/Designers/Designer_mobile";
import styled from "styled-components";
import osdcss from "opendesign_mobile_style";

const EmptyBox = styled.div`
  height:300px;
  font-size:15px;
  display:flex;
  align-items:center;
  justify-content:center;
`
const FlexContainer = styled.div`
width:360px;
padding: 0;
position: relative;
padding-left:${props=>props.marginRight};
margin-left: auto;
margin-right: auto;
margin-bottom:100px;
// @media only screen and (min-width : ${osdcss.newresolutions.mini}px) and (max-width : ${osdcss.newresolutions.small}px) {
//   width: ${props => props.type == "design" ? "720px" : props.type == "group" ? "800px" : props.type == "designer" ? "600px" : null};
// }
// @media only screen and (min-width : ${osdcss.newresolutions.small}px) and (max-width : ${osdcss.newresolutions.medium}px) {
//   width: ${props => props.type == "design" ? "1090px" : props.type == "group" ? "800px" : props.type == "designer" ? "1200px" : null};
// }
// @media only screen and (min-width : ${osdcss.newresolutions.medium}px) and (max-width : ${osdcss.newresolutions.large}px) {
//   width: ${props => props.type == "design" ? "1200px" : props.type == "group" ? "1780px" : props.type == "designer" ? "1200px" : null};
// }
// @media only screen and (min-width : ${osdcss.newresolutions.large}px) {
//   width: ${props => props.type == "design" ? "1780px" : props.type == "group" ? "1780px" : props.type == "designer" ? "1780px" : null};
//   }
`;
const FlexBox = styled.div`
  flex: 0 0 ${props => props.width}px;
  width: ${props => props.width}px;
  margin-bottom: ${props => props.marginBottom}px;
  margin-left:${props=>props.marginRight/2}px;
  margin-right: ${props => props.marginRight/2}px;
  &.bottom-last {
    margin-bottom: ${props => props.marginBottomLast}px;
  }
  &.right-last {
    // margin-right:${props=>props.marginRightLast}px;
  }
  display: inline-block;
  position: relative;
`;

// &.right-last {
//   @media only screen and (min-width : ${osdcss.resolutions.MediumMinWidth}px) and (max-width : ${osdcss.resolutions.MediumMaxWidth}px) {
//     margin-right: ${props =>
//   props.type === "design" ? osdcss.design_margin.medium.marginRightLast :
//     props.type === "group" ? osdcss.group_margin.medium.marginRightLast :
//       props.type === "designer" ? osdcss.designer_margin.medium.marginRightLast : 0}px;
//   }
//   @media only screen and (min-width : ${osdcss.resolutions.LargeMinWidth}px) and (max-width : ${osdcss.resolutions.LargeMaxWidth}px) {
//     margin-right: ${props =>
//   props.type === "design" ? osdcss.design_margin.large.marginRightLast :
//     props.type === "group" ? osdcss.group_margin.large.marginRightLast :
//       props.type === "designer" ? osdcss.designer_margin.large.marginRightLast : 0}px;
//   }
//   @media only screen and (min-width : ${osdcss.resolutions.LargeMaxWidth}px){
//     margin-right: ${props =>
//   props.type === "design" ? osdcss.design_margin.big.marginRightLast :
//     props.type === "group" ? osdcss.group_margin.big.marginRightLast :
//       props.type === "designer" ? osdcss.designer_margin.big.marginRightLast : 0}px;
//   }
// }
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

class ScrollList_mobile extends Component {
  state = { hasMore: true, loading: false, page: 0, gap: 150, cols: 0 };
  componentDidMount() {
    !this.props.manual && window.addEventListener("scroll", this.handleScroll, true);
    this.props.manual && this.getLoadData();
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
    const { type, manual, handleAccept, handleReject, height, width, marginRight, marginRightLast, marginBottom, marginBottomLast, dataListAdded, rejectText } = this.props;
    const { hasMore, loading, cols } = this.state;
    console.log(this.props);
    return (dataListAdded && dataListAdded.length > 0 ?
      <FlexContainer
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
          // const last = (((i + 1) % cols === 0 && i !== 0) || (cols === 1 && i === 0)) ? "right-last" : "";
          // console.log(i,i+1,(i+1)%cols,cols);
          const last =  (i+1)%cols == 0?"right-last":"";
          const bottom = (dataListAdded.length - (dataListAdded.length % cols)) - 1 < i || dataListAdded.length - cols === 0 ? "bottom-last" : "";
          return (
          
          <FlexBox width={width} height={height} marginRight={marginRight} marginBottom={marginBottom}
            marginRightLast={marginRightLast} marginBottomLast={marginBottomLast} key={i} className={`${last} ${bottom}`}>
            {handleAccept && <AcceptBtn className="ui button black" onClick={() => handleAccept(item.uid)}>가입승인</AcceptBtn>}
            {handleReject && <OutBtn className="ui button black" onClick={() => handleReject(item.uid)}>{rejectText || "삭제"}</OutBtn>}
            {type === "design" ? <><Design_mobile data={item} /></> : null}
            {type === "design_my" ? <><Design_mobile_my data={item} /></> : null}
            {type === "group" ? <><Group_mobile data={item} /></> : null}
            {type === "designer" ? <><Designer_mobile data={item} /></> : null}
          </FlexBox>
          
          )
        })}
        {loading && <LoadingText>목록을 가져오고 있습니다.</LoadingText>}
        {!manual && hasMore && <ScrollIcon onMouseOver={this.getLoadData}>
        </ScrollIcon>}
        {manual && hasMore && <div><MoreBtn className="ui button red" onClick={this.getLoadData}>더보기</MoreBtn></div>}
      </FlexContainer> : <EmptyBox>내용이 없습니다</EmptyBox>
    )
  }
}

export default ScrollList_mobile;
