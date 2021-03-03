import React from 'react';
import styled from 'styled-components';

const OptionListBox = styled.div`
    width:100%;
    height:100%;
    display:flex;
    .optionList{
        width:50%;
        .addValue_box{
            width:100%;
            height:50px;
            display:flex;
        }
    }
    .addName_box{
        width:50%;
        font-size:${market_style.font.size.small2};
        font-weight:500;
    }
`
const OptionValuePiece = styled.div`
    width:100%;
    height:40px;
    display:flex;
    justify-content:center;
    .OptionValue_label{
        width:160px;
        height:100%;
        font-size:${market_style.font.size.tiny3};
        font-weight:11pt;
        padding:10px;
    }
    .OptionCross_button{
        width:40px;
        height:100%;
        padding:10px;
        text-align:center;
    }
`

const FormText = styled.input.attrs({ type: "text" })`
    width:${props => props.width}px;
    height:${props => props.height}px;
    padding:15px;
    font-family:Noto Sans KR;
    color:#707070;
    outline:none;
    border:1px solid #dddddd;
    margin-right:10px;
`
const Button = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
    border:1px solid #dddddd;
    background-color:${props => props.backgroundColor};
    font-size:${props => props.fontSize}pt;
    font-weight:500;
    text-align:center;
    padding:${props => props.padding}px;
    margin-top:-1px;
    &:hover{
        // background-color:${props => props.onMouseColor};
        cursor:pointer;
    }
`
class CustomOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            OptionValue: "",
            OptionList: [],
        }
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onChangeOptionValue = this.onChangeOptionValue.bind(this);
    }
    async onClickAdd() {
        await this.setState({
            OptionList: this.state.OptionList.concat(this.state.OptionValue),
        })

        await this.props.setOptionList(this.props.CustomType, this.props.optionName, this.state.OptionList, this.props.OptionIndex);
    }
    onChangeOptionValue(event) {
        this.setState({ OptionValue: event.target.value });
    }
    async onClickDelete(event) {
        console.log(event.target.id);
        const deleteIdx = event.target.id;
        const length = this.state.OptionList.length;
        let list = [];
        list = list.concat(this.state.OptionList);

        this.setState({
            OptionList: list.slice(0, deleteIdx).concat(this.state.OptionList.slice(parseInt(deleteIdx, 10) + 1, length))
        })
    }
    render() {
        const CustomType = this.props.CustomType;
        const OptionValueList = this.state.OptionList.map((value, index) => {
            return (
                <OptionValuePiece key={index}>
                    <div className="OptionValue_label">{value}</div>
                    <div className="OptionCross_button" id={index} onClick={this.onClickDelete}>x</div>
                </OptionValuePiece>
            );
        });

        return (
            <React.Fragment>

                {CustomType === 0 ?
                    <OptionListBox>
                        <div className="addName_box">
                            {this.props.optionName}
                        </div>
                        <div className="optionList">
                            <div className="addValue_box">
                                <FormText width={160} height={40} placeholder="ex:레드,블루,그린.."
                                    value={this.state.OptionValue} onChange={this.onChangeOptionValue} />
                                <Button width={40} height={40} backgroundColor={"#EFEFEF"}
                                    fontSize={11} padding={10} onMouseColor={"#dddddd"}
                                    onClick={this.onClickAdd}>+</Button>
                            </div>
                            {OptionValueList}
                        </div>
                    </OptionListBox>
                    : null}
                {CustomType === 1 ?
                    <OptionListBox>
                        <div className="addName_box">
                            {this.props.optionName}
                        </div>
                        <div className="optionList">
                            <div className="addValue_box">
                                <FormText width={200} height={40} placeholder="예시를 입력하세요" />
                            </div>
                        </div>
                    </OptionListBox>
                    : null}
                {CustomType === 2 ?
                    <OptionListBox>
                        <div className="addName_box">
                            {this.props.optionName}
                        </div>
                        <div className="optionList">
                            <div className="addValue_box">
                                <FormText width={150} height={40} disabled />
                                <Button width={80} height={40} backgroundColor={"#EFEFEF"}
                                    padding={10} fontSize={11}>...</Button>
                            </div>
                        </div>
                    </OptionListBox>
                    : null}


            </React.Fragment>
        );
    }
} export default CustomOption;