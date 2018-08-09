import React, {Component} from 'react';
import styled from 'styled-components';
import StyleGuide from 'StyleGuide';
import middle from "source/middle.png";
import right from "source/right.png";
import left from "source/left.png";
import bold from "source/bold.png";
import italic from "source/italic.png";
import underline from "source/underline.png";

const TextEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${StyleGuide.color.geyScale.scale1};
`;

const NaviMenu = styled.div`
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale1};
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
      background-color: ${StyleGuide.color.geyScale.scale1};
    }
  }
  & > input[value="B"] {
    background-position-y: 43%;
  }
  & > input[value="I"] {
    background-size: 10px;
    background-position-y: 49%;
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
      background-color: ${StyleGuide.color.geyScale.scale1};
    }
  }
  & .align {
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 50% 40%;
    color: transparent;
    padding: 0 14px;
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
  border: 1px solid ${StyleGuide.color.geyScale.scale4};
  border-radius: 3px;
  & > input {
    border: none;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
  }
  & > input:hover {
    background-color: ${StyleGuide.color.geyScale.scale1};
  }
`;

const ColorSel = styled.input`
  color: ${StyleGuide.color.main.basic};
  padding: 0;
  font-size: ${StyleGuide.font.size.paragraph};
  width: 40px;
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    background-color: ${StyleGuide.color.geyScale.scale1};
  }
`;

const ColorMenu = styled.div`
  position: absolute;
  z-index: 10;
  top: 25px;
  left: 0;
  width: 170px;
  background-color: ${StyleGuide.color.geyScale.scale7};
  border-radius: 3px;
  padding: 0.5rem;
  cursor: initial;
  & > input {
    margin: 0.2rem;
    border-radius: 50% 50%;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border: 1px solid ${StyleGuide.color.geyScale.scale6};
  }
  & .selHead {
    margin-bottom: 0.3rem;
    color: ${StyleGuide.color.geyScale.scale6};
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
      border: 1px solid ${StyleGuide.color.geyScale.scale6};
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
    min-height: 40px;
    max-height: 300px;
    line-height: 1.4;
    padding: 0.5rem;
    overflow-y: scroll;
  }
`;

class TextController extends Component {
  state = {
    value: this.props.value,
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

  componentDidMount() {
    if (this.props.item) {
      this.setState(this.props.item);
      this.edit.innerHTML = this.props.item.content;
    }
    if (this.props.item.initClick) this.edit.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item)) {
      this.edit.innerHTML = nextProps.item.content;
      if (nextProps.item.initClick) this.edit.focus();
    }
    return true;
  }

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

  onChangeSize = async (size) => {
    console.log("work");
    let res = this.isSelection();
    if (res) {
      const selected = window.getSelection().getRangeAt(0);
      const parentEl = window.getSelection().focusNode.parentElement;
      const text = selected.toString();

      if (parentEl.classList.contains('valContainer')) { //맨 첫줄일 경우
        let node = window.document.createElement("font");
        node.innerHTML = selected;
        node.style.fontSize = size;
        selected.deleteContents();
        selected.insertNode(node);
      } else { //두번째줄 이상일 경우
        if (parentEl.textContent === text) {
          parentEl.style.fontSize = size;
        } else {
          let node = window.document.createElement("font");
          node.innerHTML = selected;
          node.style.fontSize = size;
          selected.deleteContents();
          selected.insertNode(node);
        }
      }
      await this.setState({
        content: this.edit.innerHTML
      });
      await this.onCursorOut();
      this.returnData();
    } else {
      console.log("noSelection");
    }
    this.setState({
      openSize: false
    });
  };

  onChangeColor = async color => {
    let res = this.isSelection();
    if (res) {
      const selection = window.getSelection();
      const parentEl = selection.focusNode.parentElement;
      const selected = window.getSelection().getRangeAt(0);
      const text = selected.toString();

      if (parentEl.classList.contains('valContainer')) { //맨 첫줄일 경우
        let node = window.document.createElement("font");
        node.innerHTML = selected;
        node.style.color = color;
        selected.deleteContents();
        selected.insertNode(node);
      } else { //두번째줄 이상일 경우
        if (parentEl.textContent === text) {
          if (parentEl.firstElementChild && parentEl.firstElementChild.nodeName == "FONT") {
            parentEl.style.color = color;
            parentEl.innerHTML = selected;
          } else {
            parentEl.style.color = color;
          }
        } else {
          let node = window.document.createElement("font");
          node.innerHTML = selected;
          node.style.color = color;
          selected.deleteContents();
          selected.insertNode(node);
        }
      }
      await this.setState({
        content: this.edit.innerHTML
      });
      await this.onCursorOut();
      this.returnData();
    } else {
      console.log("noSelection");
    }
    this.setState({
      openColor: false
    });
  };

  onCursorOut = () => {
    let res = this.isSelection();
    if (res) {
    let newSelected = window.getSelection();
    let range = window.getSelection().getRangeAt(0);
    newSelected.removeRange(range);
    this.onSave();
    this.edit.blur();
    } else {
      return;
    }
  }

  onSave = async (e) => {
    if (e && e.type === "keydown") {
      await this.setState({ content: this.edit.innerHTML });
    } else if (e && e.type === "blur") {
      if (e &&
        (e.relatedTarget &&
          this.textWrap._reactInternalFiber.child.stateNode.contains(
            e.relatedTarget
          ))
      ) {
      } else {
        this.setState({
          openMenu: false
        });
        if (!this.edit.textContent) {
          if (this.props.deleteItem) this.props.deleteItem();
        } else {
          console.log("드디어 세이브", this.state);
          await this.setState({ content: this.edit.innerHTML });
          this.returnData();
        }
      }
    }
  };

  returnData = async () => {
    console.log(this.state);
    if(this.props.getValue) this.props.getValue(this.state);
  }

  setOpenSize = () => {
    this.setState({
      openSize: !this.state.openSize,
      openColor: false
    });
  }

  setOpenColor = () => {
    this.setState({
      openSize: false,
      openColor: !this.state.openColor
    });
  }

  onBlurSize = async (e) => {
    if (e && e.type === "blur") {
      if (e.relatedTarget && this.menuWrap.childNodes[1].contains(e.relatedTarget)) {
      } else {
        this.setState({
          openSize: false
        });
      }
    }
  }

  onBlurColor = async (e) => {
    if (e && e.type === "blur") {
      if (e.relatedTarget && this.menuColWrap.childNodes[1].contains(e.relatedTarget)) {
      } else {
        this.setState({
          openColor: false
        });
      }
    }
  }

  render() {
    const colorSelection = [
      { key: "#fff" , value: "#fff" },
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
          <NaviMenu>
            <input type="button" value="B" onClick={this.getBold} style={{backgroundImage:`url(${bold})`}}/>
            <input type="button" value="I" onClick={this.getItalic} style={{backgroundImage:`url(${italic})`}}/>
            <input type="button" value="U" onClick={this.getUnderline} style={{backgroundImage:`url(${underline})`}}/>
            <input type="button" value="L" className="align"
                   onClick={this.getJustifyleft}
                   style={{backgroundImage:`url(${left})`}}/>
            <input type="button" value="M" className="align"
                   onClick={this.getJustifycenter}
                   style={{backgroundImage:`url(${middle})`}}/>
            <input type="button" value="R" className="align"
                   onClick={this.getJustifyright}
                   style={{backgroundImage:`url(${right})`}}/>

            <span className="optWrap" tabIndex="0" onBlur={this.onBlurSize} ref={ref => (this.menuWrap = ref)}>
              <input type="button" value="size" onClick={this.setOpenSize}/>
              {this.state.openSize &&
                <SizeMenu>
                  {sizeSelection.map((size, i) => (
                    <input key={i} value={size.value} type="button" onClick={()=>this.onChangeSize(size.value)}/>
                  ))}
                </SizeMenu>
              }
            </span>
            <span className="optWrap" tabIndex="0" onBlur={this.onBlurColor} ref={ref => (this.menuColWrap = ref)}>
              <ColorSel type="button" value="A" onClick={this.setOpenColor}/>
              {this.state.openColor &&
                <ColorMenu>
                  <div className="selHead">
                    <span>Colors</span>
                    <span className="selectedColor">{this.state.selectedColor}</span>
                  </div>
                  {colorSelection.map((item, i) => (
                    <input key={i} type="button"
                           style={{backgroundColor: item.key}}
                           onClick={()=>this.onChangeColor(item.value)}
                           onMouseDown={()=>this.setState({selectedColor:item.value})}/>
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
            onFocus={()=>this.setState({openMenu: true})}
          />
        </TextSection>
      </TextEditWrap>
    );
  }
}

export default TextController;
