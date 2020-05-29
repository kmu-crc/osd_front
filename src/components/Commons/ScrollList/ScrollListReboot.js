import React, { Component } from "react";
import opendesigncss from "opendesign_style";
import styled from "styled-components";
import Design from "components/Designs/Design";


const Wrapper = styled.div`
  width: 100%;
  border: 1px solid gray;
  *{border:1px solid blue;}
`;
const Box = styled.div`
  width: max-content;
  margin: auto;
  margin-bottom: 50px;
`;

class ScrollListReboot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // check mobile 
    const { dataListAdded, } = this.props;
    const mobile = window.innerWidth <= opendesigncss.resolutions.SmallMaxWidth;
    console.log(mobile, opendesigncss.resolutions.SmallMaxWidth, window.innerWidth, this.props);

    return (<React.Fragment>
      {/* 스크롤 리스트 리부트 */}

      <Wrapper>
        {dataListAdded && dataListAdded.length > 0 &&
          dataListAdded.map(item =>
            <Box key={item.uid}>
              {/* {item.title} */}
              <Design data={item} />
            </Box>
          )}
      </Wrapper>
    </React.Fragment>)
  }
}

export default ScrollListReboot;
