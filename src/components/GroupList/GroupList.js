import React, { Component } from 'react';
import Group from '../Group';
import styled from 'styled-components';

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 20px 30px;
`;

class GroupList extends Component {
  render(){
    let list = this.props.GroupList;
    return(
      <Wrapper>
        <ul>
          {list.map(group =>
            <Group key={group.uid} group={group}/>
          )}
          <div className="clear"></div>
        </ul>
      </Wrapper>
    );
  }
}

export default GroupList;
