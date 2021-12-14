import React from 'react';
import styled from 'styled-components';
import opendesign_style from "opendesign_style";
import FileController from "../CardSourceDetail/FileController";

export const ControllerWrap = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  border: 1px dashed ${opendesign_style.color.grayScale.scale6};

  &.centering {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${opendesign_style.color.grayScale.scale6};
    }
  }
  & :hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul { display: flex; }
      & > span { color: ${opendesign_style.color.grayScale.scale6}; }
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
  color: red;
  margin-left: 15px;

  &.first {
    margin-left: 0px;
  }
  &.complecated {
    display: flex;
    flex-direction: row;
  }
  &.txt {
    border-bottom: 1.5px solid red;
  }
  line-height: 29px;
  padding-bottom: 1.5px;
  font-size: 15px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;
const Caption = styled.div`
    margin-top: 10px;

    padding: 2px;
    font-size: 0.85rem;
    color: #7C7C7C;

`;

export default class AddContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null, content: "", order: null
        };
    };
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
    };
    changeType = () => {
        this.props.change && this.props.change();
    };
    returnData = async (data) => {
        if (data) {
            await this.setState({ type: null, order: this.props.order, content: "", initClick: false })
            this.props.getValue(data);
        } else {
            if (this.props.getValue) this.props.getValue(this.state);
        }
    };


    render() {

        console.log("--------", this.props);

        return (<React.Fragment>
            {this.props.order === 0 && this.props.uid != "new"
                ? <React.Fragment>
                    <Caption>프로젝트형으로 시작하기</Caption>
                    <ControllerWrap>
                        <div className="innerBox">
                            <NewController className="txt complecated" width="max-content" height="29px">
                                <div onClick={this.changeType} className="txt">
                                    템플릿 선택
                                </div>
                            </NewController>
                        </div>
                    </ControllerWrap>
                </React.Fragment>
                : null}

            {this.props.order === 0 && this.props.uid != "new"
                ? <Caption>블로그형형으로 시작하기</Caption>
                : null}

            <ControllerWrap>
                <div className="innerBox">
                    <NewController
                        className="first txt"
                        onClick={() => this.addContent("FILE")}
                        width="max-content"
                        minWidth="116px"
                        height="29px">

                        파일 등록</NewController>

                    <NewController
                        className="txt"
                        onClick={() => this.addContent("TEXT")}
                        width="max-content"
                        minWidth="134px"
                        height="29px">

                        텍스트 등록</NewController>

                    <NewController
                        className="txt"
                        onClick={() => this.addContent("LINK")}
                        width="max-content"
                        minWidth="134px"
                        height="29px">
                        하이퍼링크  등록</NewController>

                </div>
                {this.props.is_problem ? <NewController
                    onClick={() => { this.addContent("PROBLEM"); this.props.open(true); }}
                    width="max-content" minWidth="134px" height="29px">
                    문제 등록하기</NewController> : null}

                {this.state.type === "FILE" &&
                    <FileController
                        item={this.state}
                        getValue={this.returnData} />}

            </ControllerWrap>
        </React.Fragment>);
    };
};