import React, { Component } from 'react';
import Design from '../Design';
import styled from 'styled-components';

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px 30px;
`;

class DesignList extends Component {
  state = {
    list: []
  };

  componentDidMount(){
    fetch("http://localhost:3000/design/designList")
    .then(res => res.json())
    .then((design) => {
      this.setState({
        list: design
      });
      console.log(design);
    });
  }

  render(){
    let list = this.state.list;
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