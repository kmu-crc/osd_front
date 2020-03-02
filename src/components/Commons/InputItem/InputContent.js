import React, { Component } from "react";
import { Controller, FileController } from "components/Commons/InputItem";
import StyleGuide from "StyleGuide";
import styled from "styled-components";

export class InputContent extends Component {
    constructor(props) {
        super(props);
        this.state = { content: [] };
        this.onAddValue = this.onAddValue.bind(this);
        this.onChangValue = this.onChangValue.bind(this);
        this.returnState = this.returnState.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };
    async onAddValue(data) {
        let copyContent = [...this.state.content];
        let copyData = { ...data };
        copyData.initClick = true;
        for (let item of copyContent) {
            if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
                await copyContent.splice(item.order, 1, null);
            }
        }
        await copyContent.splice(copyData.order, 0, copyData);
        let newContent = copyContent.filter((item) => item !== null);
        newContent = await Promise.all(
            newContent.map(async (item, index) => {
                item.order = await index;
                delete item.target;
                if (item.type === "FILE" || item.order !== copyData.order) delete item.initClick;
                return item;
            })
        );
        await this.setState({ content: newContent });
        this.returnState();
    };
    async onChangValue(data) {
        let copyContent = [...this.props.content];
        const copyData = { ...data };
        for (let item of copyContent) {
            if (item.order === copyData.order) {
                item.content = data.data.content
            }
        }
        await this.setState({ content: copyContent });
        this.returnState();
    };
    async deleteItem(data) {
        alert("not implemented yet");
    };
    returnState() {
        this.props.returnState && this.props.returnState(this.state);
    };

    render() {
        const { content, projectable } = this.props;
        return (<React.Fragment>
            {content.length > 0 && content.map((item, index) =>
                <Controller
                    name={`content${index}`} type={item.type}
                    order={index} maxOrder={content.length - 1}
                    key={index} item={item}
                    deleteItem={this.deleteItem} getValue={this.onChangValue} />)}

            <AddContent
                projectable={projectable}
                name="addBasic" type="INIT"
                order={content.length > 0 ? content.length : 0}
                getValue={this.onAddValue}
                change={this.props.toProject} />
        </React.Fragment>);
    }
}

const ControllerWrap = styled.div`
  // margin: 20px 0;
  position: relative;
  text-align: center;

  border: 1px dashed ${StyleGuide.color.geyScale.scale6};
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${StyleGuide.color.geyScale.scale6};
    }
  }
  &:hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul { display: flex; }
      & > span { color: ${StyleGuide.color.geyScale.scale6}; }
    }
  }
  .innerBox {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
`;
const NewController = styled.li`
  width: max-content;
  height: 29px;
  color: #FF0000;
  margin-left: 75px;
  &.first {
    margin-left: 0px;
  }
  &.complecated {
    display: flex;
    flex-direction: row;
    .txt{
      border-bottom: 1.5px solid #FF0000;
    }
  }
  &.txt{
    border-bottom: 1.5px solid #FF0000;
  }
  line-height: 29px;
  padding-bottom: 1.5px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;
const Tip = styled.div`
  .wrapper {
    z-index: 900;
    position: absolute;
    display: flex;
    visibility: hidden;
  }
  .tip-txt {
    display: none;
    width: max-content;
    background-color: #707070;
    color: #EFEFEF;
    text-align: center;
    border-radius: 6px;
    padding: 10px 5px;
    margin-top: -5px;
    font-size: 14px;
  }
  :hover {
    .wrapper {
        visibility: visible;
    }
    .tip-txt {
        display: block;
    }
  }
`;
class AddContent extends Component {
    constructor(props) {
        super(props);
        this.state = { type: null, content: "", order: null };
    }
    addContent = async (type) => {
        if (type === "FILE") {
            await this.setState({ type, order: this.props.order, content: "", initClick: true });
            setTimeout(() => {
                this.setState({ initClick: false });
            }, 100);
        } else {
            await this.setState({ type, order: this.props.order, content: "" });
            this.returnData();
        }
    }
    changeType = () => {
        this.props.change && this.props.change();
    }
    returnData = async (data) => {
        if (data) {
            await this.setState({ type: null, order: this.props.order, content: "", initClick: false })
            this.props.getValue(data);
        } else {
            if (this.props.getValue) this.props.getValue(this.state);
        }
    }
    render() {
        console.log(this.props);
        return (
            <ControllerWrap>
                <div className="innerBox">
                    <NewController className="first txt" onClick={() => this.addContent("FILE")} width="max-content" minWidth="116px" height="29px">파일 등록하기</NewController>
                    <NewController className="txt" onClick={() => this.addContent("TEXT")} width="max-content" minWidth="134px" height="29px">텍스트 입력하기</NewController>
                    {this.props.order === 0 && this.props.projectable ? <NewController className="txt" className="complecated" width="max-content" height="29px">
                        <div onClick={this.changeType} className="txt">단계 생성하기</div>
                        <Tip>
                            <sup>&nbsp;?</sup>
                            <div className="wrapper">
                                <div className="tip-txt">단계를 가지는 디자인을 생성합니다.<br /> <font style={{ color: "pink" }}>*&nbsp;</font>이 과정을 진행하면 되 돌릴 수 없습니다.</div>
                            </div>
                        </Tip>
                    </NewController> : null}
                </div>
                {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />}
            </ControllerWrap>
        );
    }
}

