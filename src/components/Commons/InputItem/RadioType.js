import React, { Component } from "react";
import styled from "styled-components";
// import noimg from "source/noimg.png";
// import { Icon } from "semantic-ui-react";

const FormStyle = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    
    .contentBox{
        display:flex;
        width: max-content;
        height: max-content;
        margin-right: 50px;
    }
    .radioWrapper{
        display:flex;
        align-items:center;
        margin-right:10px;
    }
    .radio {
        margin:0px !important;
        width: 15px;
        height: 15px;
    }
`;

export class RadioType extends Component {
    constructor(props) {
        super(props);
        this.onHandleClicked = this.onHandleClicked.bind(this);
    }
    onHandleClicked(_, item) {
        if (!item || !this.props.return || !this.props.Options.length) return;
        this.props.return(this.props.name, item);
    }
    render() {
        return (
            <React.Fragment>
                <FormStyle>
                    {this.props.Options.map((item, key) =>
                        (<div key={key} className="contentBox">
                            <label className="radioWrapper">
                                <input
                                    className="radio"
                                    type="radio"
                                    name={this.props.name}
                                    checked={item === this.props.default}
                                    onChange={_ => this.onHandleClicked(_, item)} />
                            </label>
                                <div>{item}</div>
                        </div>))}
                </FormStyle>
            </React.Fragment>
        );
    }
}