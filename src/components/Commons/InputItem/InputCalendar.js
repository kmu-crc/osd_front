import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const FormBox = styled.div`
    display:flex;
    align-items:center;
    .won{
        margin-right:50px;
    }
`
const FormStyle = styled.input.attrs({ type: "date" })`
    width: max-content;
    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    height:43px;
    border-radius:20px;
    font-family:Noto Sans KR;
    font-size:20px;
    background-color:#E9E9E9;
    outline:none;
    border:0px;
    margin-right:5px;
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
    &.error {
        border: 1px solid ${StyleGuide.color.main.basic};
        color: ${StyleGuide.color.main.basic};
        &::placeholder {
            color: ${StyleGuide.color.main.basic};
        }
    }
`;
const FormText = styled.input.attrs({ type: "number" })`
    width: ${props => props.width}px;
    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    height:43px;
    border-radius:20px;
    font-family:Noto Sans KR;
    font-size:20px;
    background-color:#E9E9E9;
    outline:none;
    border:0px;
    margin-right:5px;
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
    &.error {
        border: 1px solid ${StyleGuide.color.main.basic};
        color: ${StyleGuide.color.main.basic};
        &::placeholder {
            color: ${StyleGuide.color.main.basic};
        }
    }
`;
const Button = styled.div`
    width:60px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#707070;
    border-radius:10px;
    margin:5px;
    cursor:pointer;
    .text{
        font-size:13px;
        color:#ffffff;
    }
`
export class InputCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = { endDate:null,dayDate:null };
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeDayDate = this.onChangeDayDate.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.price !== this.props.price) {
            // console.log(this.props.price);
            this.setState({
                endDate: this.props.endDate,
                dayDate:this.props.dayDate,
            })
        }
    }
    returnData = async e => {
        this.props.getEndDateValue && await this.props.getEndDateValue(this.state.endDate);
        this.props.getDayDateValue && await this.props.getDayDateValue(this.state.dayDate);
    }
    init = async () => {
        await this.setState({ dayDate: this.props.dayDate || 0 });
        await this.setState({ endDate: this.props.endDate || new Date().toISOString().substring(0,10) });
        this.returnData();
    }

    async onChangeEndDate(event) {
        const now = new Date();
        const value = event.target.value.split("-");
        const endDay = new Date(value[0],value[1]-1,value[2]);

        let timestamp = endDay - now;
        const oneDay = 24* 60* 60* 1000;

        //일수
        await this.setState({ endDate: event.target.value, dayDate:Math.floor(timestamp/oneDay+1) });
        this.returnData();
    }
    async onChangeDayDate(event){
        let now = new Date();
        const dday = parseInt(event.target.value,10);
        const oneDay = 24* 60* 60* 1000;
        now.setDate(now.getDate()+dday);

        await this.setState({ endDate:now.toISOString().substring(0,10),
        dayDate: event.target.value });
        this.returnData();

    }
    render() {
        return (
            <React.Fragment>
                <FormBox>
                    <FormStyle
                        id="endDate"
                        placeholder={this.props.placeholder}
                        value={this.state.endDate}
                        onChange={this.onChangeEndDate}
                    />
                </FormBox>
                <FormText
                    id="dateDate"
                    width={80}
                    value={this.state.dayDate}
                    onChange={this.onChangeDayDate}
                />일간
            </React.Fragment>
        );
    }
}