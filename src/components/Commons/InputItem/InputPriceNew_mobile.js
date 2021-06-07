import React, { Component } from "react";
import styled from "styled-components";


const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    position:relative;
    min-width:245px;
    height:72px;
    // flex-wrap: wrap;
    .won{
        width:max-content;
        margin-right:50px;
    }
    .formwrapper{
        display:flex;
        align-items:center;
    }
    .buttonbox{
        margin-right:50px;
        min-width:max-content;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        flex-wrap:wrap;

        position:absolute;
        left:-102px;
        top:30px;
    }
`
const FormStyle = styled.input.attrs({ type: "number" })`
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    width: 150px;
    height: 31px;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    border-radius: 10px;
    border: 0px;
    outline: none;

    margin-right: 10px;
    transition: color 0.1s ease, border-color 0.1s ease;

    font: normal normal normal 15px/22px Noto Sans KR;
    color: #000000;
    letter-spacing: 0px;
    text-align: center;
    line-height: 22px;
`;
const Button = styled.button`
    outline: none;
    border: 1px solid #707070;
    cursor:pointer;
    background: none;
    font-size:13px;
    width: ${props => props.width ? props.width : 59}px;
    max-width: 100px;
    height: 31px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: ${props => props.marginRight ? props.marginRight : 10}px;
    margin-top:5px;
    :last-child {
        margin-right: 0px;
    }

    .text {
        width: max-content;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
    }
`
export class InputPriceNew_mobile extends Component {

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

        const money = parseInt(this.state.price, 10);
        const price = parseInt(money, 10) + parseInt(value, 10);
        console.log(this.state.price, price, money, value);
        await this.setState({ price: price });
        this.returnData();
    }
    async onChangePrice(event) {
        await this.setState({ price: event.target.value });
        this.returnData();
    }
    render() {
        const { width, placeholder, option } = this.props;
        const tag = option ? option.tag : null;
        return (
            <React.Fragment>
                <FormBox >
                    <div className="formwrapper">
                        <FormStyle
                            id="price"
                            width={width == null ? "150" : width}
                            placeholder={placeholder}
                            value={this.state.price || 0}
                            onChange={this.onChangePrice}
                        />
                        <div className="won">
                            <div className="text">points</div>
                        </div>
                    </div>
                    <div className="buttonbox">
                        <Button marginRight={tag && tag.marginRight} width={tag && tag.width} onClick={() => this.onClickButton(1000)}><div className="text">+1천</div></Button>
                        <Button marginRight={tag && tag.marginRight} width={tag && tag.width} onClick={() => this.onClickButton(10000)}><div className="text">+1만</div></Button>
                        <Button marginRight={tag && tag.marginRight} width={tag && tag.width} onClick={() => this.onClickButton(50000)}><div className="text">+5만</div></Button>
                        <Button marginRight={tag && tag.marginRight} width={tag && tag.width} onClick={() => this.onClickButton(100000)}><div className="text">+10만</div></Button>
                        <Button marginRight={tag && tag.marginRight} width={tag && tag.width} onClick={() => this.onClickButton(1000000)}><div className="text">+100만</div></Button>
                    </div>
                </FormBox>
            </React.Fragment>
        );
    }
}