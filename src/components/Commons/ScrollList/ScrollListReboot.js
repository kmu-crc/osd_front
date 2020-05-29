import React, { Component } from "react";

import opendesigncss from "opendesign_style";
import styled from "styled-components";

import Design from "components/Designs/Design";
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer";


const Cosmos = styled.div`
  width: 100%;
  background-color: #EFEFEF;
`;
const Wrapper = styled.div`
  border: 1px solid gray;
  *{
    border: 1px solid blue;
  }
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;
const Box = styled.div`
  width: 330px;
  border: 1px solid green;
  // flex: 1 1 330px;
  // margin-bottom: ${props => props.marginBottom}px; 
  // margin-right: ${props => props.marginRight}px; 
  margin: auto;
  // margin-top: ${props => props.marginTop}px; 
  // margin-left: ${props => props.marginLeft}px; 
`;

const margin = { "mobile": 330, "design": 330, "group": 902, "designer": 587 };
const cols = {
  "mobile": { "design": 1, "group": 1, "designer": 1 },
  "tablet": { "design": 3, "group": 1, "designer": 3 },
  "desktop": { "design": 5, "group": 2, "designer": 1 },
}
class ScrollListReboot extends Component {
  // constructor(props) {
  //  super(props);
  //  this.state={};
  // }

  render() {
    // CHECK MOBILE 
    const { dataListAdded, type, } = this.props;
    const mobile = window.innerWidth <= opendesigncss.resolutions.SmallMaxWidth;
    const tablet = window.innerWidth > opendesigncss.resolutions.SmallMaxWidth && window.innerWidth <= opendesigncss.resolutions.MediumMaxWidth;
    const desktop = window.innerWidth > opendesigncss.resolutions.MediumMaxWidth;

    console.log(
      mobile,
      (window.innerWidth - margin[mobile ? "mobile" : type]) / 2,
      type,
      margin[mobile ? "mobile" : type],
      opendesigncss.resolutions.SmallMaxWidth,
      window.innerWidth,
      this.props);

    const marginBottom = (window.innerWidth - margin[mobile ? "mobile" : type]) / 2;
    const boxWidth = mobile ? margin["mobile"] : cols[tablet ? "tablet" : "desktop"][type];

    return (<Cosmos>
      {/* SCROLL-LIST REBOOT */}
      <Wrapper>
        {dataListAdded && dataListAdded.length > 0 &&
          dataListAdded.map(item =>
            <Box
              key={item.uid}
              width={boxWidth}
            // marginTop={0}
            // marginBottom={marginBottom}
            // marginLeft={"auto"}
            // marginRight={"auto"}
            >
              {type === "design" && <Design data={item} />}
              {type === "group" && <Group data={item} />}
              {type === "designer" && <Designer data={item} />}
            </Box>)}
      </Wrapper>

    </Cosmos>)
  }
}

export default ScrollListReboot;
