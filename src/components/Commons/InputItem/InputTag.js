import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const FormStyle = styled.input`
    width: ${props=>props.width}px;
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
const TagList = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    background-color: #EFEFEF;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
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
export class InputTag extends Component {

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
    componentDidUpdate(prevProps){
        if(prevProps.taglist !== this.props.taglist){
            console.log(this.props.taglist);
            this.setState({
                tag:this.props.taglist,
            })
        }
    }
    returnData = async e => {
        this.props.getValue && await this.props.getValue(this.state.tag);
    }
    init = async () => {
        await this.setState({ tag: this.props.tag || [] });
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
        console.log("!");
        var pattern = /^[a-zA-Zㄱ-힣0-9]*$/;
        if(event.target.value.match(pattern))
        {
            this.setState({ value: event.target.value });
        }
        else{
            let warningMsg1 = document.getElementById("wariningBox3");
            warningMsg1.className = "showani";
            return;
        }
        
    }
    onDeleteTag = async (event) => {
        console.log(event.target.id);
        const deleteIdx = event.target.id;
        const length = this.state.tag.length;
        let list = [];
        list = list.concat(this.state.tag);
        this.setState({
            tag: list.slice(0, deleteIdx).concat(this.state.tag.slice(parseInt(deleteIdx, 10) + 1, length))
        });
    }
    render() {
        const TagBox = this.state.tag.map((item, index) => {
            return (
                <TagPiece key={index}>
                    {item}
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
                    width={this.props.width==null?"100":this.props.width}
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