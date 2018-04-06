import React, { Component } from 'react';
import styled from 'styled-components';
import Designer from '../Designer';

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
      <Wrapper>
        <ul>
          {list.map(designer =>
            <Designer key={designer.uid} designer={designer}/>
          )}
          <div className="clear"></div>
        </ul>
      </Wrapper>
    );
  }
}

export default DesignerList;
