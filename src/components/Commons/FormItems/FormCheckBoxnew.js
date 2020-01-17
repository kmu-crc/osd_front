import React, { Component } from "react";
import styled from "styled-components";

const CheckBoxList = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
`

const StyleCheckbox = styled.input.attrs({type:"checkbox"})`
    width:18px;
    height:18px;
    margin-right:5px;
    opacity:0.5;
    &:checked{
        opacity:1.0;
    }
`
const CheckBoxPiece = styled.div`
    display:flex;
    width:max-content;
    align-items:center;
    padding:5px;
    margin-right:10px;


`

export class FormCheckBoxnew extends Component{
    constructor(props){
        super(props);
        this.state = {
            CheckedList:[],
        }
        this.onClickChecked = this.onClickChecked.bind(this);
    }

    onClickChecked(event){

        if(document.getElementById(event.target.id).checked===true){
            this.setState({
                CheckedList:this.state.CheckedList.concat(event.target.id),
            });

        }
        else
        {
            this.setState({
                CheckedList:this.state.CheckedList.splice(this.state.CheckedList.splice(this.state.CheckedList.lastIndexOf(event.target.id),1)),
            });
        }
        
    }

    render(){
        console.log(this.state.CheckedList);
        const itemList = this.props.items&&this.props.items.split(",");
        // const itemList = ["사과","바나나","오렌지"];
        const CheckBox =(text)=>{
            return(
                <CheckBoxPiece>
                    <StyleCheckbox onChange={this.onClickChecked} id={text}/>
                    <label for={text}>{text}</label>
                </CheckBoxPiece>
            );
        }
        return(
            <React.Fragment>
                <CheckBoxList>
                    {
                        itemList&&itemList.map((item,index)=>{
                            return(
                                CheckBox(item,index)
                            );
                            
                        })
                    }
                </CheckBoxList>
            </React.Fragment>
        );
    }
}