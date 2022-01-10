import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Dropdown as DropdownSemantic } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";
import opendesign_style from "opendesign_style";
import Button from "./ButtonOSD";
import { GetProblemListFromDesignInGroupRequest } from "redux/modules/group";
import _ from 'lodash'

const DropDown = styled(DropdownSemantic)`
    border: 1px solid blue !important;
    width:${props => props.width || 100}px;
    height: ${props => props.height || 50}px;
    border-radius: 5px;
    font-size: 15px;
    *{font-size: 15px !important;}
    background-color: #EFEFEF !important;
`;
const DueDateModalWrapper = styled(Modal)`
//   min-width: 750px;
//   min-height: 350px;
//   width: 95%;
  left: auto !important;
  top: auto !important;
  right: auto !important;
  bottom: auto !important;
//   width: 90% !important;
//   height: 60% !important;
  padding: 35px;
  background-color: white;
  display: flex;
  
  .close-box{
    position: absolute;
    right: 25px;
    top: 25px;
  }
  .title {
    text-alignment: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-between;
    cursor: default;
    h2 {
        margin-left: 10px;
        margin-top: 10px;
        padding: 5px;
    }
    .newbutton {
        margin-right: 10px;
        margin-top: 5px;
        height: 100%;
        width: max-content;
        margin-left: auto;
        text-alignment: center;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
  and (max-width : ${1024}px) { 
      min-width:100%;
   }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) { 
      min-width:100%;
   }
    .empty {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 5px 11px 4px 11px;
        height: 300px;
    }
    .bottom-buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
    }
`;
const ProblemListWrapper = styled.div`
    // width: 100%;
    padding: 5px;
    font-size: 1.25rem;
    cursor: default;
    overflow-y: scroll;

    .header { 
        background-color: #EFEFEF;
        font-weight: 700;
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;

        .num { 
            text-align: center; 
            width: 10%;
        }
        .header-title { 
            text-align: center; 
            width: 40%;
        }
        .due_date { 
            text-align: center; 
            width: 60%;
        }
    }
    .body {
        // height: 70%;
        overflow-y: scroll;
    }

    .row {
        background-color: white;
        font-weight: 500;
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        border-bottom: 1px solid #EFEFEF;

        :hover { 
            background-color: #EFEFEF; 
        }
        .num { 
            text-align: center; 
            width: 10%;
        }
        .row-title { 
            text-align: left; 
            padding-left: 15px;
            width: 40%;
            white-space: nowrap; 
            text-overflow: ellipsis; 
        }
        .due_date { 
            display: flex;
            flex-direction: row;
            width: 60%;
        }
    }
    marquee {
      scrollamount: 1;
      :hover {
          color: red;
          scrollamount: 5;
      }
    }
    .ui.dropdown .menu {
        z-index: 999999 !important;
      }
`;
const range = (n, offset) => [...Array(n).keys()].map((item, index) => ({ key: index, value: item + offset, text: item + offset }));
const days = (y, m) => [1, 3, 5, 7, 8, 10, 12].includes(m) ? 31 : [4, 6, 9, 11].includes(m) ? 30 : ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0) ? 29 : 28;
const WrapperDateSelector = styled.div`
      input {

      }
`;
const ThisYear = 2021;
String.prototype.replaceAt = (index, replacement) => this.substr(0, index) + replacement + this.substr(index + replacement.length);
Number.prototype.pad = (size) => { var s = String(this); while (s.length < (size || 2)) { s = "0" + s; } return s; };


// obj = { due: { start: "0000-00-00T00:00", end: "0000-00-00T00:00" } }

class DateSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { start: "2021-00-00", end: "0000-00-00T00:00" }
    }
    mask = v => {
        var value = v.replace("--", "-");
        if (value.match(/^\d{4}$/) !== null) {
            value = value + "-";
        } else if (value.match(/^\d{4}\-\d{2}$/) !== null) {
            value = value + "-";
        }
        return value;
    }
    render() {
        const { start } = this.state;
        return (<WrapperDateSelector>
            <input type="text" id="start-date" name="start-date" onKeyUp={(e) => this.mask(e.target.value)} maxLength="10" />
            {/* <input type="number" value={start} placeholder="0000-00-00" onChange={this.handleDate} /> */}
            {/* <input type="number" placeholder="00:00" onChange={this.handleTime} /> */}
        </WrapperDateSelector>)
    }
}
/*
<label><input type="text" id="dateControll" name="dateControll" class="input_style wp80" onkeyup="this.value = date_mask(this.value)" maxlength="10" /></label>
<script type="text/javascript">
<!--
// 날짜를 yyyy-mm-dd 형식으로 만들어 줌.
function date_mask(objValue) {
 var v = objValue.replace("--", "-");
    if (v.match(/^\d{4}$/) !== null) {
        v = v + '-';
    } else if (v.match(/^\d{4}\-\d{2}$/) !== null) {
        v = v + '-';
    }
    return v;
}
//-->
</script>
 */
export default class DueDateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], changed: [],
        };
        this.getList = this.getList.bind(this);
        this.updateDueDate = this.updateDueDate.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        const { id, token } = this.props;
        GetProblemListFromDesignInGroupRequest(id, token)
            .then(list => { this.setState({ list: list }); })
            .catch(() => { alert("문제리스트를 가져오지 못하였습니다. 관리자에게 문의해주세요."); });
    }
    updateDueDate(date, item) {
        let obj = JSON.parse(item.content);
        obj.due =
            item.content = JSON.stringify(obj);
        console.log("due: item:", item.content);
        // update
        if (this.state.changed.find(target => target.id === item.id)) {
            const newchanged = this.state.changed.map(target => {
                if (target.id === item.id) {
                    target.content = item.content;
                }
                return target;
            });
            this.setState({ changed: newchanged });
        }
        // insert
        else {
            const newchanged = [...this.state.changed];
            newchanged.push(item);
            this.setState({ changed: newchanged });
        }
    }

    render() {
        const { open, close, } = this.props;
        const { list } = this.state;
        console.log("changed:", this.state.changed);

        return (
            <DueDateModalWrapper

                /*close - icon*/
                closeOnDimmerClick={false}
                open={open}
                onClose={() => close()}>

                <div className="close-box" onClick={() => close()}>
                    <Cross angle={45} color={"#707070"} weight={5} width={35} height={35} />
                </div>

                <Modal.Content>

                    {list && list.length > 0
                        ? <ProblemListWrapper>
                            <div className="header">
                                <div className="num">고유번호</div>
                                <div className="header-title">제목</div>
                                <div className="due_date">마감기한</div>
                            </div>
                            <div className="body">
                                {list && list.length > 0
                                    ? list.map((item, index) => {
                                        const { id, name, due } = JSON.parse(item.content);
                                        return (<div className="row" key={index} >
                                            <div className="num">{id}</div>
                                            <div className="row-title">{name}</div>
                                            <div className="due_date">
                                                <DateSelector
                                                    due={{ start: "2021-04-01T00:00", end: "2021-05-01T00:00" }} // {due}
                                                    onChangeDate={(date) => this.updateDueDate(date, { ...item, id: index })} />
                                            </div>
                                        </div >)
                                    })
                                    : <div className="empty"> 글이 없습니다. </div>}
                            </div>
                        </ProblemListWrapper>
                        : null}

                    {/* button */}
                    <div className="bottom-buttons">
                        <Button bgcolor="red" color="white" onClick={() => close()}>적용</Button>
                        <Button onClick={() => close()}>닫기</Button>
                    </div>
                </Modal.Content >
            </DueDateModalWrapper >);
    }
};


