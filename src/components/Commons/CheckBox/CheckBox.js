import React, { Component } from 'react';
import styled from 'styled-components';
import market_style from "market_style";

const CheckboxContainer = styled.label`

    .control {
        width:100%;
        height:25px;
        font-family: arial;
        display: block;
        position: relative;
        padding-left: 27px;
        margin-bottom: 5px;
        padding-top: 1px;
        cursor: pointer;
        font-size: ${market_style.font.size.small2};
        margin-right:5px;
    }
        .control input {
            display:none;
            // position: absolute;
            // z-index: -1;
            // opacity: 0;
        }
    .control_indicator {
        position: absolute;
        top: 2px;
        left: 0;
        height: 25px;
        width: 25px;
        background: #e6e6e6;
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
        background: #e6e6e6;
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
                <input id={this.props.id} onChange={this.props.onChange} type="checkbox" checked={this.props.checked || false} />
                <div className="control_indicator"></div>
            </label>
        </CheckboxContainer>)
    }
}
export default CheckBox