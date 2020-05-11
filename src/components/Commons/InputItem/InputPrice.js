import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const FormBox = styled.div`
    display:flex;
    align-items:center;
    .won{
        width:max-content;
        margin-right:50px;
    }
`
const FormStyle = styled.input.attrs({ type: "number" })`
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
export class InputPrice extends Component {

    constructor(props) {
        super(props);
        this.state = { price: 0, };
        this.onClickButton = this.onClickButton.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.price !== this.props.price) {
            // console.log(this.props.price);
            this.setState({
                price: this.props.price/1000,
            })
        }
    }
    returnData = async e => {
        this.props.getValue && await this.props.getValue(this.state.price*1000);
    }
    init = async () => {
        await this.setState({ price: this.props.price || 0 });
        this.returnData();
    }
    async onClickButton(value) {

        const money = parseInt(this.state.price,10);
        const price = parseInt(money,10) + parseInt(value,10);
        console.log(this.state.price,price,money,value);
        await this.setState({ price: price });
        this.returnData();
    }
    async onChangePrice(event) {
        await this.setState({ price: event.target.value });
        this.returnData();
    }
    render() {
        return (
            <React.Fragment>
                <FormBox>
                    <FormStyle
                        id="price"
                        width={this.props.width == null ? "150" : this.props.width}
                        placeholder={this.props.placeholder}
                        value={this.state.price*1000 || 0}
                        onChange={this.onChangePrice}
                    /><div className="won">원</div>

                    <Button onClick={() => this.onClickButton(1000/1000)}><div className="text">+1천</div></Button>
                    <Button onClick={() => this.onClickButton(10000/1000)}><div className="text">+1만</div></Button>
                    <Button onClick={() => this.onClickButton(50000/1000)}><div className="text">+5만</div></Button>
                    <Button onClick={() => this.onClickButton(100000/1000)}><div className="text">+10만</div></Button>
                    <Button onClick={() => this.onClickButton(1000000/1000)}><div className="text">+100만</div></Button>
                </FormBox>
            </React.Fragment>
        );
    }
}