import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
  width: max-content;
  height: 100%;
  line-height: 1.25rem;
  background-color: ${p => p.bgcolor ? p.bgcolor : "#DEDEDE"};
  color: ${p => p.color ? p.color : "#707070"};
  text-alignment: center;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 10px 15px;
  // border-radius: 5px;
  margin-right: ${p => p.marginRight ? p.marginRight : "15px"};
  cursor: pointer;
  :hover {
    background-color: ${p => p.bgcolor_hover ? p.bgcolor_hover : "#CECECE"};
  }
`;
export default class ButtonOSD extends React.Component {
  render() {
    const { children } = this.props;
    return (<ButtonDiv {...this.props} onClick={this.props.onClick}>{children}</ButtonDiv>)
  }
};
