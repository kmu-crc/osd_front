import React from "react";
import styled from "styled-components";
import Modal from 'react-awesome-modal';

import CustomOption from "components/Products/CreateProductForm/CreateOption/CustomOption";

const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
        color:#707070;
    }
    width:500px;
    height:500px;
    overflow-y:scroll;
    border-radius:5px;
    .gray_color{
        background-color:#efefef;
    }
    .white_color{
        background-color:#ffffff;
    }
    .add_line{
        border-top:2px solid #dddddd
    }
    .add_flex{
        display:flex;
    }
    .add_fixed{
        position:fixed;
    }
    .add_betweencontent{
        justify-content:space-between;
    }
    .innerbox{
        width:100%;
        padding:20px;
        position:relative;
        display:flex;
        .miniMenu{
            position:fixed;
            overflow:hidden;
            right:40px;
            width:70px;
            height:105px;
            border-top:1px solid #dddddd;
            z-index:100;

        }
        .innerbox_title_box{
            width:50%;
            font-size:16pt;
            font-weight:500;
        }
        .option_value_list{
            width:50%;
        }
        .deleteOption{
            // border:1px solid #dddddd;
            // border-radius:10px;
            //color:white;
            width:40px;
            height:20px;
            position:absolute;
            right:0px;
            top:0px;
            font-size:7pt;
            text-align:center;
            cusror:pointer;

            
        }
    }
    .mainbox_label{
        font-size:20pt;
        font-weight:1000;
    }
    .mainbox{
        width:100%;
        height:60px;
    }
    .buttonbox{
        width:100px;
    }

`
const FormText = styled.input.attrs({ type: "text" })`
    width:${props => props.width}px;
    height:${props => props.height}px;
    padding:15px;
    font-family:Noto Sans KR;
    color:#707070;
    outline:none;
    border:none;
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
    margin-right:5px;
    &:hover{
        background-color:${props => props.onMouseColor};
        cursor:pointer;
    }
`
class CreateOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            addOptionValue: "", options: [], showMenu: false
        }
        this.onClickShowAddOption = this.onClickShowAddOption.bind(this);
        this.onClickCloseAddOption = this.onClickCloseAddOption.bind(this);
        this.onClickCreateDropbox = this.onClickCreateDropbox.bind(this);
        this.onClickCreateText = this.onClickCreateText.bind(this);
        this.onChangeAddOptionValue = this.onChangeAddOptionValue.bind(this);
        this.onClickDeleteOption = this.onClickDeleteOption.bind(this);
        this.onCloseOptionWindow = this.onCloseOptionWindow.bind(this);
        this.onApplyOptionWindow = this.onApplyOptionWindow.bind(this);
        this.setOptionList = this.setOptionList.bind(this);
        this.onClickUploadImage = this.onClickUploadImage.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.open !== nextProps.open) {
            this.setState({ open: nextProps.open });
        }
        return true;
    }
    onCloseOptionWindow() {
        this.props.closeOption();
    }
    onApplyOptionWindow() {
        this.props.handleSetOptions && this.props.handleSetOptions(this.state.options);
        this.props.closeOption();
    }

    onClickShowAddOption() {
        this.setState({ showMenu: true });
    }
    onClickCloseAddOption(event) {
        if (event.target.id !== "miniMenu") {
            this.setState({ showMenu: false });
        }
    }
    onClickCreateDropbox() {
        // 0 : dropbox
        this.setState({
            options: this.state.options.concat({ customType: 0, name: this.state.addOptionValue, option: [] })
        })
    }
    onClickCreateText() {
        // 1: text 
        this.setState({
            options: this.state.options.concat({ customType: 1, name: this.state.addOptionValue, option: [] })
        })
    }

    onClickUploadImage(){
        // 2: image 
        this.setState({
            options:this.state.options.concat({customType:2,name:this.state.addOptionValue,option:[]})
        })
    }
    onChangeAddOptionValue(event){
        this.setState({
            addOptionValue: event.target.value
        });
    }
    onClickDeleteOption(num) {
        this.setState({
            options: this.state.options.slice(0, num).concat(this.state.options.slice(num + 1, this.state.options.length)),
        })
    }
    setOptionList(type, name, options, index) {

        this.setState(state => ({
            ...state,
            options: [
                ...state.options.slice(0, index),
                { customType: type, name: name, option: options },
                ...state.options.slice(index + 1)
            ],
        }));
        console.log(this.state.options);
        //this.state.options >>>>> 옵션리스트 *******************
    }

    render() {
        return (
            <React.Fragment>
                <Modal onLoad visible={this.state.open} effect="fadeInLeft" >
                    <MainBox onClick={this.onClickCloseAddOption}>
                        <div className="mainbox">
                            <div className="innerbox add_flex add_fixed white_color add_betweencontent">
                                <div className="mainbox_label">
                                    옵션 추가
                                </div>
                                <div className="buttonbox add_flex">
                                    <Button onClick={this.onCloseOptionWindow} width={50} height={30} padding={5} backgroundColor={"#dddddd"}>취소하기</Button>
                                    <Button onClick={this.onApplyOptionWindow} width={50} height={30} padding={5} backgroundColor={"#dddddd"}>적용하기</Button>
                                </div>
                            </div>
                        </div>
                        <div className="innerbox add_flex gray_color">
                            <FormText width={300} height={40} placeholder="옵션의 이름을 추가해주세요(ex:색상,크기 ..)"
                                onChange={this.onChangeAddOptionValue} />
                            <Button id="miniMenu" width={50} height={40} padding={10} onClick={this.onClickShowAddOption}
                                backgroundColor={"#dddddd"} /*onMouseColor={"#cccccc"}*/ fontSize={11}>Add</Button>
                            {this.state.showMenu === true ?
                                <div className="miniMenu" id="miniMenu">
                                    <Button width={70} height={35} padding={5}
                                        backgroundColor={"white"} onMouseColor={"#efefef"} fontSize={8}
                                        onClick={this.onClickCreateDropbox}>DropBox</Button>
                                    <Button width={70} height={35} padding={5}

                                    onClick={this.onClickCreateText}
                                    backgroundColor={"white"} onMouseColor={"#efefef"} fontSize={8}>Text</Button>
                                    <Button width={70} height={35} padding={5}
                                    backgroundColor={"white"} onMouseColor={"#efefef"} fontSize={8}
                                    onClick={this.onClickUploadImage}>Image</Button>
                                </div>
                                : null
                            }
                        </div>


                        {
                            this.state.options.map((item, index) => {
                                return (

                                    <div className="innerbox add_line" key={index}>
                                        <div className="deleteOption" onClick={() => this.onClickDeleteOption(index)}>close ✗</div>
                                        <CustomOption optionName={item.name} CustomType={item.customType} setOptionList={this.setOptionList}
                                            OptionIndex={index} />
                                    </div>
                                );
                            })
                        }

                    </MainBox>
                </Modal>
            </React.Fragment>
        );
    }
} export default CreateOption;