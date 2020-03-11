import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const Button = styled.div`
    border:1px solid #EFEFEF;
    border-radius:5px;
    background-color:#d6d6d6;
    width:150px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0.8;
    cursor:pointer;
    &:hover{
        opacity:0.9;
    }
    &:active{
        opacity:1.0;
    }
`
    const EquipmentList = styled.div`
        width:100%;
        display:flex;
        flex-wrap:wrap;
        padding-top:10px;
        margin-bottom:2.5rem;
    `
    const EquipmentRow = styled.div`
        width:100%;
        display:flex;
        .piece_box{
            width:30%;
            display:flex;
            .piece_label{
                border:1px solid black;
                display:flex;
                justify-content:center;
                align-items:center;
                margin: 0 0 0.8rem 0;
                color: rgba(0,0,0,0.5);
                font-size: .92857143em;
                font-weight: 700;
                text-transform: none;
            }
        }
    `
    const FormText = styled.input.attrs({type:"text"})`
        width: 100%;
        margin: 0;
        outline: 0;
        -webkit-appearance: none;
        line-height: 1.21428571em;
        padding: 0.67857143em 1em;
        margin-top:5px;
        font-size: 1em;
        background: #fff;
        border: 1px solid ${StyleGuide.color.geyScale.scale2};
        color: ${StyleGuide.color.geyScale.scale7};
        border-radius: 0.28571429rem;
        box-shadow: 0 0 0 0 transparent inset;
        transition: color 0.1s ease, border-color 0.1s ease;
        &::placeholder {
        color: ${StyleGuide.color.geyScale.scale5};
        }
        &:focus {
        &::placeholder {
            color: ${StyleGuide.color.geyScale.scale7};
        }
        border-color: #85b7d9;
        box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
        }
        `;
export class FormEquipment extends Component{

    constructor(props)
    {
        super(props);
        this.state =  {
            equipment:[],
        }
       this.onClickAddRow  =this.onClickAddRow.bind(this);  
       this.onChangeValue = this.onChangeValue.bind(this);
    }

    async onClickAddRow(event){
        const rowDefault = "";
        const numOfDefault = 5;
        let DefaultList = [];

        for(let i=0;i<numOfDefault;i++)
        {
            DefaultList = DefaultList.concat(rowDefault);
        }

        this.setState({equipment:this.state.equipment.concat(DefaultList)})
        console.log(this.state.equipment)
   }
   async onChangeValue(event){
    const idx = event.target.name;
    let Row = event.target.value;

     let list1 = this.state.equipment.slice(0,idx);
     list1=list1.concat(Row);
     let list2 = this.state.equipment.slice(parseInt(idx,10)+1,this.state.equipment.length);

     this.setState({
        equipment:list1.concat(list2),
     })
}

    render(){
        const EquipmentData = this.state.equipment.map((item,index)=>{
            console.log("item",index,item);
            return(

                <EquipmentRow key={index}>
                    <div className="piece_box">
                        {/* <div className="piece_label"><div></div></div> */}
                        <FormText
                            name={index}
                            id="equipment"
                            placeholder={this.props.placeholder||"텍스트를 입력하세요"}
                            onChange = {this.onChangeValue}
                            value={this.state.equipment[index]}
                        />
                    </div>
                </EquipmentRow>
            );
        })
        return(
            <React.Fragment>
                <Button onClick={this.onClickAddRow}>추가</Button>
                <EquipmentList>
                   {EquipmentData}
                </EquipmentList>
            </React.Fragment>
        );
    }
}