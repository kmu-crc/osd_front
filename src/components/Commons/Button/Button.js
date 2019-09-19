import React, { Component } from "react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import { Icon } from "semantic-ui-react";

const Btn = styled.button`
  padding: 0.75em 2em;
  ${props => props.fluid && "width: 100%"};
  font-size: ${props => props.size === "tiny"
                ? "10px"
                : props.size === "small"
                ? "12px"
                : props.size === "large"
                ? "26px"
                : "14px" };
  border-radius: ${props => props.round ? "2em" : "5px" };
  color: white;
  margin-right: 0.5rem;
  background-color: ${props => props.color === "Danger"
                      ? opendesign_style.color.sub.purple.basic
                      : props.color === "Primary"
                      ? opendesign_style.color.sub.bule.basic
                      : props.color === "Solid"
                      ? opendesign_style.color.main.basic
                      : opendesign_style.color.grayScale.scale5 };
  border: 1px solid ${props => props.color === "Danger"
                      ? opendesign_style.color.sub.purple.basic
                      : props.color === "Primary"
                      ? opendesign_style.color.sub.bule.basic
                      : props.color === "Solid"
                      ? opendesign_style.color.main.basic
                      : opendesign_style.color.grayScale.scale5 };

  &:hover{
    background-color: ${props => props.color === "Danger"
                      ? opendesign_style.color.sub.purple.dark
                      : props.color === "Primary"
                      ? opendesign_style.color.sub.bule.dark
                      : props.color === "Solid"
                      ? opendesign_style.color.main.dark
                      : opendesign_style.color.grayScale.scale7 };
    border: 1px solid ${props => props.color === "Danger"
                      ? opendesign_style.color.sub.purple.dark
                      : props.color === "Primary"
                      ? opendesign_style.color.sub.bule.dark
                      : props.color === "Solid"
                      ? opendesign_style.color.main.dark
                      : opendesign_style.color.grayScale.scale7 };
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
      <Btn {...newProps} size={this.props.size} round={this.props.round}>
        {this.props.icon && <Icon name={this.props.icon}/>}
        {this.props.children}
      </Btn>
    );
  }
}

export default Button;
