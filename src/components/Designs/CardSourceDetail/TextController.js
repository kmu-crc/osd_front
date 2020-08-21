import React, { Component } from 'react';
import styled from 'styled-components';
import opendesign_style from 'opendesign_style';
import middle from "source/middle.png";
import right from "source/right.png";
import left from "source/left.png";
import bold from "source/bold.png";
import italic from "source/italic.png";
import underline from "source/underline.png";

const TextEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${opendesign_style.color.grayScale.scale1};
`;
const NaviMenu = styled.div`
  border-bottom: 1px solid ${opendesign_style.color.grayScale.scale1};
  padding: 0.2rem 0;
  & > input {
    line-height: 30px;
    border: 0;
    padding: 0 15px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 14px;
    color: transparent;
    &:hover {
      background-color: ${opendesign_style.color.grayScale.scale1};
    }
  }
  & > input[value="B"] {
    background-position-y: 43%;
  }
  & > input[value="I"] {
    background-size: 10px;
    background-position-y: 49%;
  }
  .bold {
    background-image: url(${props => props.bold});
  }
  .italic {
    background-image: url(${props => props.italic});
  }
  .underline {
    background-image: url(${props => props.underline});
  }
  & .optWrap {
    position: relative;
    & > input {
      border: none;
      cursor: pointer;
      line-height: 30px;
      height: 30px;
      width: 40px;
      &:focus {
        outline: none;
      }
    }
    & > input[value="size"]:hover {
      background-color: ${opendesign_style.color.grayScale.scale1};
    }
  }
  & .align {
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 50% 40%;
    color: transparent;
    padding: 0 14px;
    &.left {
      background-image: url(${props => props.left});
    }
    &.middle {
      background-image: url(${props => props.middle});
    }
    &.right {
      background-image: url(${props => props.right});
    }
  }
  & .align[value="M"] {
    background-position-y: 41%;
  }
`;
const SizeMenu = styled.div`
  position: absolute;
  z-index: 10;
  top: 25px;
  left: 0;
  border: 1px solid ${opendesign_style.color.grayScale.scale4};
  border-radius: 3px;
  & > input {
    border: none;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
  }
  & > input:hover {
    background-color: ${opendesign_style.color.grayScale.scale1};
  }
`;
const ColorSel = styled.input`
  color: ${opendesign_style.color.main.basic};
  padding: 0;
  font-size: ${opendesign_style.font.size.paragraph};
  width: 40px;
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    background-color: ${opendesign_style.color.grayScale.scale1};
  }
`;
const ColorMenu = styled.div`
  position: absolute;
  z-index: 10;
  top: 25px;
  left: 0;
  width: 170px;
  background-color: ${opendesign_style.color.grayScale.scale7};
  border-radius: 3px;
  padding: 0.5rem;
  cursor: initial;
  & > input {
    margin: 0.2rem;
    border-radius: 50% 50%;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border: 1px solid ${opendesign_style.color.grayScale.scale6};
  }
  & .selHead {
    margin-bottom: 0.3rem;
    color: ${opendesign_style.color.grayScale.scale6};
    padding: 0 .4rem;
    & > span {
      float: left;
      width: 50%;
      text-align: left;
      display: block;
    }
    & > span.selectedColor {
      min-width: 50%;
      height: 19px;
      border: 1px solid ${opendesign_style.color.grayScale.scale6};
      line-height: 1.3;
      text-align: center;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
`;
const TextSection = styled.div`
  & .valContainer {
    min-height: 60px;
    max-height: 300px;
    line-height: 1.4;
    padding: 0.5rem;
    overflow-y: scroll;
  }
`;

class TextController extends Component {
  state = {
    openMenu: false,
    openColor: false,
    openSize: false,
    selectedColor: null
  };

  getBold = e => {
    document.execCommand('Bold');
  };

  getItalic = () => {
    document.execCommand('Italic');
  };

  getUnderline = () => {
    document.execCommand('Underline');
  };

  getJustifyleft = () => {
    document.execCommand('justifyleft');
  };

  getJustifycenter = () => {
    document.execCommand('justifycenter');
  };

  getJustifyright = () => {
    document.execCommand('justifyright');
  };

  // 컴포넌트가 초기 렌더링 되었을 때, 기존 값이 있으면 text 섹션에 기존 내용 넣어줌
  componentDidMount() {
    if (this.props.item.content) {
      this.setState(this.props.item);
      this.edit.innerHTML = this.props.item.content;
    }
    if (this.props.item.initClick) this.edit.focus();
  }

  // returnData로 상위 컴포넌트로 값 전달 -> props가 새로 넘어오면 값 새로고침
  shouldComponentUpdate(nextProps) {
    delete nextProps.item.target;
    if (JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item)) {
      // this.edit.innerHTML = nextProps.item.content;
      if (!nextProps.item.uid) this.setState({ uid: null });
      if (nextProps.item.initClick) this.edit.focus();
    }
    return true;
  }

  // 드래그 한 부분이 있는지 검증
  isSelection = () => {
    if (window.getSelection()
      && window.getSelection().rangeCount > 0
      && window.getSelection().getRangeAt(0)
      && window.getSelection().getRangeAt(0).toString() !== "") {
      return true;
    } else {
      return false;
    }
  }

  // 사이즈 변경
  onChangeSize = async (size) => {
    let res = this.isSelection();
    if (res) {
      const selected = window.getSelection().getRangeAt(0);
      const parentEl = selected.commonAncestorContainer; //긁은 부분을 포함한 최상위 노드
      let childList = parentEl.childNodes;
      const text = selected.toString();

      if (childList && childList.length === 0) { // 긁은 부분이 텍스트만 있을때
        const p = window.getSelection().focusNode.parentElement;
        if (p.classList.contains("valContainer")) { // 맨 앞이 최상위 태그이면 새로운 태그 추가
          let newNode = window.document.createElement("span");
          newNode.innerHTML = text;
          newNode.style.fontSize = size;
          selected.deleteContents();
          selected.insertNode(newNode);
        } else { // 앞에 태그로 묶여 있으면 스타일 적용
          if (p.textContent === text) {
            p.style.fontSize = size;
          } else {
            let newNode = window.document.createElement("span");
            newNode.innerHTML = text;
            newNode.style.fontSize = size;
            selected.deleteContents();
            selected.insertNode(newNode);
          }
        }
      } else { // 긁은 부분에 텍스트와 태그가 같이 있을 때
        if (parentEl.textContent === text) { // 전체 텍스트를 다 드래그
          childList.forEach(element => {
            if (element.nodeName === "#text") {
              let newNode = window.document.createElement("span");
              newNode.innerHTML = element.textContent;
              parentEl.replaceChild(newNode, element);
            }
          });
          childList.forEach(element => {
            element.style.fontSize = size;
          });
        } else { // 일부 텍스트만 드래그했을 때
          childList.forEach(item => {
            if (window.getSelection().containsNode(item, true)) {
              if (item.nodeName === "#text") {
                let newNode = window.document.createElement("span");
                newNode.innerHTML = item.textContent;
                newNode.style.fontSize = size;
                parentEl.replaceChild(newNode, item);
              } else {
                item.style.fontSize = size;
              }
            }
          });
        }
      }
      await this.setState({
        content: this.edit.innerHTML
      });
      this.returnData();
    } else {
      //console.log("noSelection");
    }
    this.setState({
      openSize: false
    });
  };

  // 컬러 변경
  onChangeColor = async color => {
    let res = this.isSelection();
    if (res) {
      const selected = window.getSelection().getRangeAt(0);
      const parentEl = selected.commonAncestorContainer; //긁은 부분을 포함한 최상위 노드
      let childList = parentEl.childNodes; // [nodeList]
      const text = selected.toString();

      if (childList && childList.length === 0) { // 긁은 부분이 텍스트만 있을때
        const p = window.getSelection().focusNode.parentElement;
        if (p.classList.contains("valContainer")) { // 맨 앞이 최상위 태그이면 새로운 태그 추가
          let newNode = window.document.createElement("span");
          newNode.innerHTML = text;
          newNode.style.color = color;
          selected.deleteContents();
          selected.insertNode(newNode);
        } else { // 앞에 태그로 묶여 있으면 스타일 적용
          if (p.textContent === text) {
            p.style.color = color;
          } else {
            let newNode = window.document.createElement("span");
            newNode.innerHTML = text;
            newNode.style.color = color;
            selected.deleteContents();
            selected.insertNode(newNode);
          }
        }
      } else { // 긁은 부분에 텍스트와 태그가 같이 있을 때
        if (parentEl.textContent === text) { // 전체 텍스트를 다 드래그
          childList.forEach(element => {
            if (element.nodeName === "#text") {
              let newNode = window.document.createElement("span");
              newNode.innerHTML = element.textContent;
              parentEl.replaceChild(newNode, element);
            }
          });
          childList.forEach(element => {
            element.style.color = color;
          });
        } else { // 일부 텍스트만 드래그했을 때
          childList.forEach(item => {
            if (window.getSelection().containsNode(item, true)) {
              if (item.nodeName === "#text") {
                let newNode = window.document.createElement("span");
                newNode.innerHTML = item.textContent;
                newNode.style.color = color;
                parentEl.replaceChild(newNode, item);
              } else {
                item.style.color = color;
              }
            }
          });
        }
      }
      await this.setState({
        content: this.edit.innerHTML
      });
      // await this.onCursorOut();
      this.returnData();
    } else {
      //console.log("noSelection");
    }
    this.setState({
      openColor: false
    });
  };

  // onCursorOut = () => {
  //   let res = this.isSelection();
  //   if (res) {
  //   let newSelected = window.getSelection();
  //   let range = window.getSelection().getRangeAt(0);
  //   newSelected.removeRange(range);
  //   this.onSave();
  //   this.edit.blur();
  //   } else {
  //     return;
  //   }
  // }

  // 현재 입력되어 있는 데이터 저장
  onSave = async (e) => {
    if (e && e.type === "keydown") { // 키보드 입력했을 경우
      await this.setState({ content: this.edit.innerHTML });
      this.returnData();
    } else if (e && e.type === "blur") { // 포커스가 빠졌을 경우
      if (e && e.relatedtarget) {// 다른 클릭 이벤트 실행시 && 사이즈||컬러 창을 열었을 경우
        this.textWrap._reactInternalFiber && this.textWrap._reactInternalFiber.child.stateNode.contains(e.relatedTarget)
      } else { // 텍스트 에디터에서 포커스가 빠져나간 경우
        this.setState({ openMenu: false });
        if (!this.edit.textContent) {
          if (this.props.deleteItem) this.props.deleteItem();
        } else {
          await this.setState({ content: this.edit.innerHTML });
          this.returnData();
        }
      }
    }
  };

  // 상위 컴포넌트로 데이터 넘겨주기
  returnData = async () => {
    if (this.props.getValue) {
      this.props.getValue(this.state);
    }
  }

  // 사이즈 설정 모달창 열기/닫기
  setOpenSize = () => {
    this.setState({
      openSize: !this.state.openSize,
      openColor: false
    });
  }

  // 컬러 설정 모달창 열기/닫기
  setOpenColor = () => {
    this.setState({
      openSize: false,
      openColor: !this.state.openColor
    });
  }

  onBlurSize = async (e) => {
    if (e && e.type === "blur") {
      if (e.relatedTarget && this.menuWrap.contains(e.relatedTarget)) {
      } else {
        this.setState({
          openSize: false
        });
        this.returnData();
      }
    }
  }

  onBlurColor = async (e) => {
    if (e && e.type === "blur") {
      if (e.relatedTarget && this.menuColWrap.contains(e.relatedTarget)) {
      } else {
        this.setState({
          openColor: false
        });
        this.returnData();
      }
    }
  }

  render() {
    const colorSelection = [
      { key: "#fff", value: "#fff" },
      { key: "#000", value: "#000" },
      { key: "#79A2BF", value: "#79A2BF" },
      { key: "#4F83AA", value: "#4F83AA" },
      { key: "#2D6596", value: "#2D6596" },
      { key: "#235077", value: "#235077" },

      { key: "#E1E4E6", value: "#E1E4E6" },
      { key: "#292A2B", value: "#292A2B" },
      { key: "#DF706F", value: "#DF706F" },
      { key: "#D94946", value: "#D94946" },
      { key: "#C8322A", value: "#C8322A" },
      { key: "#9D2721", value: "#9D2721" },

      { key: "#CED3D6", value: "#CED3D6" },
      { key: "#4D5256", value: "#4D5256" },
      { key: "#908BA5", value: "#908BA5" },
      { key: "#6C6487", value: "#6C6487" },
      { key: "#483F6A", value: "#483F6A" },
      { key: "#393254", value: "#393254" },

      { key: "#A9AFB3", value: "#A9AFB3" },
      { key: "#878D91", value: "#878D91" },
      { key: "#519641", value: "#519641" },
      { key: "#377D22", value: "#377D22" },
      { key: "#2B6419", value: "#2B6419" },
      { key: "#1E4A10", value: "#1E4A10" },
    ];

    const sizeSelection = [
      { key: "12px", value: "12px" },
      { key: "14px", value: "14px" },
      { key: "18px", value: "18px" },
      { key: "26px", value: "26px" }
    ];

    return (
      <TextEditWrap tabindex="0" onBlur={this.onSave} ref={ref => (this.textWrap = ref)}>
        {this.state.openMenu &&
          <NaviMenu bold={bold} italic={italic} underline={underline} left={left} middle={middle} right={right}>
            <input type="button" value="B" className="bold" onClick={this.getBold} />
            <input type="button" value="I" className="italic" onClick={this.getItalic} />
            <input type="button" value="U" className="underline" onClick={this.getUnderline} />
            <input type="button" value="L" className="align left" onClick={this.getJustifyleft} />
            <input type="button" value="M" className="align middle" onClick={this.getJustifycenter} />
            <input type="button" value="R" className="align right" onClick={this.getJustifyright} />

            <span className="optWrap" tabIndex="0" onBlur={this.onBlurSize} ref={ref => (this.menuWrap = ref)}>
              <input type="button" value="size" onClick={this.setOpenSize} />
              {this.state.openSize &&
                <SizeMenu>
                  {sizeSelection.map((size, i) => (
                    <input key={i} value={size.value} type="button" onClick={() => this.onChangeSize(size.value)} />
                  ))}
                </SizeMenu>
              }
            </span>
            <span className="optWrap" tabIndex="0" onBlur={this.onBlurColor} ref={ref => (this.menuColWrap = ref)}>
              <ColorSel type="button" value="A" onClick={this.setOpenColor} />
              {this.state.openColor &&
                <ColorMenu>
                  <div className="selHead">
                    <span>Colors</span>
                    <span className="selectedColor">{this.state.selectedColor}</span>
                  </div>
                  {colorSelection.map((item, i) => (
                    <input key={i} type="button"
                      style={{ backgroundColor: item.key }}
                      onClick={() => this.onChangeColor(item.value)}
                      onMouseDown={() => this.setState({ selectedColor: item.value })} />
                  ))}
                </ColorMenu>
              }
            </span>
          </NaviMenu>
        }
        <TextSection>
          <div
            ref={ref => (this.edit = ref)}
            contentEditable="true"
            id={`valContainer${this.props.item.order}`}
            className="valContainer"
            onBlur={this.onSave}
            onKeyDown={this.onSave}
            onFocus={() => this.setState({ openMenu: true })}
          />
        </TextSection>
      </TextEditWrap>
    );
  }
}

export default TextController;
