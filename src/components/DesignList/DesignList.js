import React, { Component } from "react";
import Design from "../Design";
import styled from "styled-components";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px 30px;
`;

class DesignList extends Component {
  render(){
    let list = this.props.DesignList;
    return(
      <Wrapper>
        <ul>
          {list.map(design =>
            <Design key={design.uid} design={design}/>
          )}
          <div className="clear"></div>
        </ul>
      </Wrapper>
    );
  }
}

export default DesignList;
