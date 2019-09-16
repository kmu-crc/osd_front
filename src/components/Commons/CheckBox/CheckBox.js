import React, { Component } from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.label`
    display: block;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: Noto Sans KR;
    .label-text {
        line-height: 25px;
        text-align: left;
        margin-left: 49px; 
        height: 27px;
        font-size: 17px;
        font-weight: 500;
        color: #707070;
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .checkmark {
            background-color: #FF0000;
            border: 0.5px solid #EFEFEF;
        }
        &:checked ~ .checkmark:after {
            display: block;
        }
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 27px;
        width: 26px;
        background-color: #FFFFFF;
        box-shadow: inset 0px 0px 0px 0.5px #707070;
        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }
    &:hover input ~ .checkmark {
    }
`
class CheckBox extends Component {
    render() {
        return (<React.Fragment>
            <CheckboxContainer>
                <div className="label-text">{this.props.txt}</div><input type="checkbox" checked={this.props.checked} /><span className="checkmark" />
            </CheckboxContainer>
        </React.Fragment>)
    }
}
export default CheckBox