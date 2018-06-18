import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";

const Btn = styled.button`
  color: white;
  padding: 0.75em 2em;
  font-size: ${props => props.size === "small"
                ? "12px"
                : props.size === "large"
                ? "26px"
                : "14px" }
  background-color: ${props => props.color ? props.color.basic : StyleGuide.color.main.basic };
  border-radius: ${props => props.round ? "2em" : "0" };
  border: 1px solid ${props => props.color ? props.color.basic : StyleGuide.color.main.basic };
  &:hover{
    background-color: ${props => props.color ? props.color.dark : StyleGuide.color.main.dark };
    border: 1px solid ${props => props.color ? props.color.dark : StyleGuide.color.main.dark };
  }
`

class Button extends Component {
  render() {
    let newProps = {...this.props};
    delete newProps.name;
    delete newProps.icon;
    delete newProps.children;
    // console.log(newProps);

    return(
      <Btn size={this.props.size} round={this.props.round}>
        {this.props.icon && <Icon name={this.props.icon}/>}
        {this.props.children}
      </Btn>
    );
  }
}

export default Button;
