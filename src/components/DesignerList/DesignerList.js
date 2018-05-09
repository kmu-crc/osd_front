import React, { Component } from "react";
import styled from "styled-components";
import Designer from "../Designer";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px 30px;
`;

class DesignerList extends Component {
  render(){
    let list = this.props.DesignerList;
    return(
      <div>
        {list != null && list.length > 0 ?
          <Wrapper>
            <ul>
              {list.map(designer =>
                <Designer key={designer.uid} designer={designer}/>
              )}
              <div className="clear"></div>
            </ul>
          </Wrapper>
        :
        <p>등록된 디자이너가 없습니다.</p>
        }
      </div>
    );
  }
}

export default DesignerList;
