import React, { Component } from "react";
import styled from "styled-components";
import {Select} from "semantic-ui-react";


const options=[{text:"a",value:0},{text:"b",value:1}];

const FormStyle = styled.div`
    margin-bottom:2.5rem
`

export class FormDropBox extends Component{

    constructor(props)
    {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(event,{value}){
    }
    render(){
        return(
            <FormStyle>
                <Select 
                name={this.props.name}
                placeholder={this.props.placeholder||"..."} 
                options={this.props.options}
                onChange={this.onChangeValue}
                />
            </FormStyle>
        );
    }
}