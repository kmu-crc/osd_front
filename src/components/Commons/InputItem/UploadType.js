import React,{Component} from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import { Icon } from "semantic-ui-react";

const FormStyle = styled.div`
    width:100%;
    height:max-content;
    display:flex;

    .contentBox{
        width:max-content;
        height:max-content;
        margin-right:50px;
    }
` 
const Radio = styled.input.attrs({type:"radio"})`
    width:20px;
    height:20px;
`
export class UploadType extends Component {
    constructor(props){
        super(props);
        this.state={
            imageList:[noimg],
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <FormStyle>
                    {
                        this.props.Options.map((item,key)=>{
                            return(
                                <div className="contentBox">
                                    <Radio name={this.props.name}/><label>{item}</label>
                                </div>
                            );
                        })
                    }
                </FormStyle>
            </React.Fragment>
        );
    }
}