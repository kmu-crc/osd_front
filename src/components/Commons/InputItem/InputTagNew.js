import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import market_style from "market_style";

const FormStyle = styled.input.attrs({ type: "text" })`

    width: 100%;
    min-width: 820px;
    height: 31px;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    border-radius: 10px;

    text-align: left;
    font: normal normal 300 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #000; //#707070;



    // width: ${props => props.width}px;

    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    // height:52px;
    // border-radius:26px;
    // background-color:#E9E9E9;
    outline:none;
    border:0px;
    transition: color 0.1s ease, border-color 0.1s ease;
    font-weight:300;
    &::placeholder {
        // color: ${StyleGuide.color.geyScale.scale5};
        // font-family: Noto Sans CJK KR, Regular;
        // font-size: ${market_style.font.size.samll3};
        text-align: left;
        font: normal normal 300 13px/19px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
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
const TagList = styled.div`
    width: 100%;
    display: flex;
    // padding: 10px;
    flex-wrap: wrap;
`;
const TagPiece = styled.div`

    text-align: center;
    min-width: 80px;
    width: max-content;
    min-height: 31px;
    background: #E9E9E96A 0% 0% no-repeat padding-box;
    border-radius: 10px;
    padding-left: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    margin-top: 10px;
    margin-right: 10px;
    :last-child {
        margin-right: 0px;
    }

    .text {
        width: max-content;
        margin: auto;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
    }
    
    .close {
        font-weight: bold;
        color:#707070;
        margin-left: 7px;
        margin-right: 3px;
        width: max-content;
        height: max-content;
        padding: 2px 2px 7px 2px;
        cursor: pointer;
    }
`;
const WarningBox = styled.div`
    .showani {
        position: absolute;
        margin-top: 5px;
        border-radius: 5px;
        padding: 5px;
        background-color: #707070;
        color: white;
        opacity: 0.0;
        animation-name: fadeinout;
        animation-duration: 3s;
        @keyframes fadeinout {
            from {
                opacity: 0;
            }
            to {
                opacity: 0;
            }
            75% {
                opacity: 0.7;
            }
        }
    }
    .hideani {
        display:none;
    }
`;


const CheckedCharLength = text => {
    let str = text;
    let charLength = 0;
    let ch = "";
    for (let n = 0; n < str.length; n++) {
        ch = str.charAt(n);
        if (escape(ch).length > 4) {
            charLength += 2;
        }
        else {
            charLength += 1;
        }
    }
    return charLength;
};
export class InputTagNew extends Component {

    constructor(props) {
        super(props);
        this.state = { tag: [], value: "", warning: false, };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterKeyDown = this.onEnterKeyDown.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.taglist !== this.props.taglist) {
            // console.log(this.props.taglist);
            this.setState({
                tag: this.props.taglist,
            })
        }
    }
    returnData = async e => {
        // console.log(this.state.tag);
        this.props.getValue && await this.props.getValue(this.state.tag);
    }
    init = async () => {
        await this.setState({ tag: this.props.taglist || [] });
        this.returnData();
    }
    onEnterKeyDown = async (event) => {
        if (event.keyCode === 13) {
            let warningMsg1 = document.getElementById("wariningBox1");
            let warningMsg2 = document.getElementById("wariningBox2");
            const charLength = CheckedCharLength(this.state.value);
            if (this.state.value !== "") {
                if (charLength > 20) {
                    warningMsg1.className = "showani";
                    return;
                }
                else if (this.state.tag.length >= 10) {
                    warningMsg1.className = "showani";
                    return;
                }
                else {
                    if (this.state.tag.filter(item => item === this.state.value).length) {
                        warningMsg2.className = "showani";
                        return;
                    }
                    await this.setState({
                        tag: this.state.tag.concat(this.state.value),
                        value: "",
                    })
                    this.returnData();
                }
            }
        }
    }
    onChangeValue = (event) => {
        var pattern = /^[a-zA-Zㄱ-힣0-9]*$/;
        if (event.target.value.match(pattern)) {
            this.setState({ value: event.target.value });
        }
        else {
            let warningMsg1 = document.getElementById("wariningBox3");
            warningMsg1.className = "showani";
            return;
        }

    }
    onDeleteTag = async (event) => {
        let copy = [...this.state.tag];
        copy.splice(event.target.id, 1);
        await this.setState({ tag: copy });
        this.returnData();
    }
    render() {
        const TagBox = this.state.tag.map((item, index) => {
            return (
                item === "" ?
                    null :
                    <TagPiece key={index}>
                        <div className="text"> {item} </div>
                        <div id={index} onClick={this.onDeleteTag} className="close">x</div>
                    </TagPiece>
            );
        })
        const ShowWarning = () => {
            return (
                <WarningBox>
                    <div id="wariningBox1" className="hideani">
                        태그는 한글 10자, 영문 20자 이내로 최대 10개까지 입력이 가능합니다.
                    </div>
                    <div id="wariningBox2" className="hideani">
                        중복이 허용되지 않습니다.
                    </div>
                    <div id="wariningBox3" className="hideani">
                        특수문자는 허용되지 않습니다.
                    </div>
                </WarningBox>
            );
        }
        return (
            <React.Fragment>

                <FormStyle
                    width={this.props.width == null ? "100" : this.props.width}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.onEnterKeyDown}
                    onChange={this.onChangeValue}
                    value={this.state.value}
                />
                <ShowWarning />
                <TagList>
                    {TagBox}
                </TagList>

            </React.Fragment>
        );
    }
}