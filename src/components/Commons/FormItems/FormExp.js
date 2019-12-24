import React, { Component } from "react";
import styled from "styled-components";
import { FormInput } from "components/Commons/FormItems";
import StyleGuide from "StyleGuide";
import update from "react-addons-update";

const FormStyle = styled.div`

`
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
const ExpList = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    padding-top:10px;
    margin-bottom: 2.5rem;

`
const ExpRow = styled.div`
    width:100%;
    display:flex;
    .piece_box{
        height:100%;
        width:25%;
        display:flex;
        margin-right:15px;
        .piece_label{
            width:40px;
            height:100%;
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

export class FormExp extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            exp:[],
        }
        this.onClickAddRow = this.onClickAddRow.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }
    async onClickAddRow(event){
        const rowDefault = {job:"",duration:"",company:""};
        const numOfDefault = 5;
        let DefaultList = [];

        for(let i=0;i<numOfDefault;i++)
        {
            DefaultList = DefaultList.concat(rowDefault);
        }

        this.setState({exp:this.state.exp.concat(DefaultList)})

   }

   async onChangeValue(event){
       const idx = event.target.name;
       const type = event.target.id;
       let Row = {...this.state.exp[idx]};
    //    console.log(idx,Row,this.state.exp[idx]);
        if(type==="job")
        {
            Row.job= event.target.value;
        }
        else if(type==="duration")
        {
            Row.duration= event.target.value;
        }
        else if(type==="company")
        {
            Row.company= event.target.value;
        }

        console.log(this.state.exp);


        let list1 = this.state.exp.slice(0,idx);
        list1=list1.concat(Row);
        let list2 = this.state.exp.slice(parseInt(idx,10)+1,this.state.exp.length);

        this.setState({
            exp:list1.concat(list2),
        })
   }

    render(){

        const ExpData = this.state.exp.map((item,index)=>{
            console.log("item",index,item);
            return(

                <ExpRow key={index}>
                    <div className="piece_box">
                        <div className="piece_label"><div>직무</div></div>
                        <FormText
                            name={index}
                            id="job"
                            placeholder="직무를 입력하세요"
                            onChange = {this.onChangeValue}
                            value={this.state.exp[index].job}
                        />
                    </div>
                    <div className="piece_box">
                        <div className="piece_label"><div>기간</div></div>
                        <FormText
                            name={index}
                            id="duration"
                            placeholder="기간을 입력하세요"
                            onChange = {this.onChangeValue}
                            value={item.duration}
                        />
                    </div>
                    <div className="piece_box">
                        <div className="piece_label"><div>업체</div></div>
                        <FormText
                            name={index}
                            id="company"
                            placeholder="업체를 입력하세요"
                            onChange = {this.onChangeValue}
                            value={item.company}
                        />
                    </div>
                </ExpRow>
            );
        })

        return(
            <React.Fragment>
                <Button onClick={this.onClickAddRow}><div>추가하기</div></Button>
                <ExpList>
                   {ExpData}
                </ExpList>
            </React.Fragment>
        );
    }
}