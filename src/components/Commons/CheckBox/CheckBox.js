import React, { Component } from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.label`
width:max-content;
height:max-content;
    .control {
        width:max-content;
        height:max-content;
        font-family: arial;
        display: block;
        position: relative;
        padding-left: 27px;
        margin-bottom: 5px;
        padding-top: 1px;
        cursor: pointer;
        font-size: 16px;
    }
        .control input {
            position: absolute;
            z-index: -1;
            opacity: 0;
        }
    .control_indicator {
        position: absolute;
        top: 2px;
        left: 0;
        height: 25px;
        width: 25px;
        background: #8E8E8E;
        border: 0px solid #000000;
        border-radius: 0px;
    }
    .control:hover input ~ .control_indicator,
    .control input:focus ~ .control_indicator {
        background: #cccccc;
    }

    .control input:checked ~ .control_indicator {
        background: #ff0000;
    }
    .control:hover input:not([disabled]):checked ~ .control_indicator,
    .control input:checked:focus ~ .control_indicator {
        background: #FF000;
    }
    .control input:disabled ~ .control_indicator {
        background: #8E8E8E;
        opacity: 35;
        pointer-events: none;
    }
    .control_indicator:after {
        box-sizing: unset;
        content: '';
        position: absolute;
        display: none;
    }
    .control input:checked ~ .control_indicator:after {
        display: block;
    }
    .control-checkbox .control_indicator:after {
        left: 8px;
        top: 2px;
        width: 6px;
        height: 12px;
        border: solid #ffffff;
        border-width: 0 4px 4px 0;
        transform: rotate(45deg);
    }
    .control-checkbox input:disabled ~ .control_indicator:after {
        border-color: #707070;
    }
`;
class CheckBox extends Component {
    render() {
        return (<CheckboxContainer>
            <label className="control control-checkbox">
                {/* label here */}
                <input disabled={this.props.disabled==null?false:true} id={this.props.id} onChange={this.props.onChange} type="checkbox" checked={this.props.checked} />
                <div className="control_indicator"></div>
            </label>
        </CheckboxContainer>)
    }
}
export default CheckBox