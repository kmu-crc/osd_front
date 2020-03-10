import React, { Component } from "react";
import styled from "styled-components";
// import noimg from "source/noimg.png";
// import { Icon } from "semantic-ui-react";

const FormStyle = styled.div`
    width: 100%;
    height: max-content;
    display: flex;

    .contentBox{
        width: max-content;
        height: max-content;
        margin-right: 50px;
    }
    .radio {
        width: 20px;
        height: 20px;
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
                            <label >
                                <input
                                    className="radio"
                                    type="radio"
                                    name={this.props.name}
                                    checked={item === this.props.default}
                                    onChange={_ => this.onHandleClicked(_, item)} />
                                {item}
                            </label>
                        </div>))}
                </FormStyle>
            </React.Fragment>
        );
    }
}