import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import market_style from "market_style";
const FormBox = styled.div`
    display:flex;
    flex-wrap:wrap;
    .won{
        width:max-content;
        margin-right:50px;
    }
    .formwrapper{
        display:flex;
        align-items:center;
    }
    .buttonbox{
        display:flex;
        flex-wrap:wrap;
    }
`
const FormStyle = styled.input.attrs({ type: "number" })`
    width: ${props => props.width}px;
    height:25px;
    padding: 0.67857143em 1em;
    margin-right:5px;
    text-align:right;
    margin-bottom:10px;
    border:0px;
    border-radius:26px;
    outline:none;
    font-family:Noto Sans CJK KR,Regular;
    font-size:${market_style.font.size.small3};
    background-color:#EFEFEF;
    -webkit-appearance: none;
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
    width:70px;
    height:35px;
    display:flex;
    border:1px solid #707070;
    justify-content:center;
    align-items:center;
    margin-right:12px;
    margin-bottom:10px;
    cursor:pointer;
    .text{
        font-size:${market_style.font.size.small1};
        color:#707070;
    }
`
export class AddPoint extends Component {

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
                price: this.props.price,
            })
        }
    }
    returnData = async e => {
        this.props.getValue && await this.props.getValue(this.state.price);
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
                    <div className="formwrapper">
                    <FormStyle
                        id="price"
                        width={this.props.width == null ? "150" : this.props.width}
                        placeholder={this.props.placeholder}
                        value={this.state.price || 0}
                        onChange={this.onChangePrice}
                    /><div className="won">원</div>
                    </div>
                    <div className="buttonbox">
                    <Button onClick={() => this.onClickButton(1000)}><div className="text">+1천</div></Button>
                    <Button onClick={() => this.onClickButton(10000)}><div className="text">+1만</div></Button>
                    <Button onClick={() => this.onClickButton(50000)}><div className="text">+5만</div></Button>
                    <Button onClick={() => this.onClickButton(100000)}><div className="text">+10만</div></Button>
                    <Button onClick={() => this.onClickButton(1000000)}><div className="text">+100만</div></Button>
                    </div>
                </FormBox>
            </React.Fragment>
        );
    }
}