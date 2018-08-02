import React, {Component} from 'react';
import styled from 'styled-components';
import StyleGuide from 'StyleGuide';

const TextEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${StyleGuide.color.geyScale.scale1};
`;

const NaviMenu = styled.div`
  & > input {
    line-height: 30px;
    height: 30px;
    border: 0;
    padding: 0 10px;
    font-size: ${StyleGuide.font.size.small};
    cursor: pointer;
    &:hover {
      background-color: ${StyleGuide.color.geyScale.scale1};
    }
  }
`;

const ColorMenu = styled.div`
  padding: 0 .5rem;
  & > input {
    margin-right: 0.3rem;
    border: 0;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  & > input.red {
    background-color: ${StyleGuide.color.main.basic};
  }
  & .lightGrey {
    background-color: ${StyleGuide.color.geyScale.scale2};
  }
  & .basicGrey {
    background-color: ${StyleGuide.color.geyScale.scale5};
  }
  & .darkGrey {
    background-color: ${StyleGuide.color.geyScale.scale8};
  }
  & > input.black {
    background-color: #000;
  }
  & > input.blue {
    background-color: ${StyleGuide.color.sub.bule.basic};
  }
  & > input.green {
    background-color: green;
  }
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale1};
`;

const TextSection = styled.div`
  & .valContainer {
    min-height: 40px;
    max-height: 300px;
    line-height: 1.4;
    padding: .5rem;
    overflow-y: scroll;
  }
`;

class TextController extends Component {
  state = {
    value: this.props.value,
    openMenu: false
  };

  getBold = e => {
    document.execCommand('Bold');
    this.onCursorOut();
  };

  getItalic = () => {
    document.execCommand('Italic');
    this.onCursorOut();
  };

  getUnderline = () => {
    document.execCommand('Underline');
    this.onCursorOut();
  };

  getJustifyleft = () => {
    document.execCommand('justifyleft');
    this.onCursorOut();
  };

  getJustifycenter = () => {
    document.execCommand('justifycenter');
    this.onCursorOut();
  };

  getJustifyright = () => {
    document.execCommand('justifyright');
    this.onCursorOut();
  };

  componentDidMount(){
    if (this.props.item) {
      this.setState(this.props.item);
      this.edit.innerHTML = this.props.item.content;
    }
    if (this.props.item.initClick) this.edit.focus();
  }

  shouldComponentUpdate(nextProps){
    if(JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item)){
      this.edit.innerHTML = nextProps.item.content;
      if (nextProps.item.initClick) this.edit.focus();
    }
    return true;
  }

  isSelection = () => {
    // console.log(Boolean(window.getSelection));
    // console.log(Boolean(window.getSelection().rangeCount > 0));
    // console.log(Boolean(window.getSelection().getRangeAt(0)));
    // console.log(Boolean(window.getSelection().getRangeAt(0).toString() !== ""));
    if (window.getSelection()
        && window.getSelection().rangeCount > 0
        && window.getSelection().getRangeAt(0)
        && window.getSelection().getRangeAt(0).toString() !== "") {
        return true;
      } else {
        return false;
      }
  }

  onChangeSize = (size) => {
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
      this.onCursorOut();
    } else {
      console.log("noSelection");
      return;
    }
  };

  onChangeColor = color => {
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
      this.onCursorOut();
    } else {
      console.log("noSelection");
      return;
    }
  };

  onCursorOut = () => {
    let newSelected = window.getSelection();
    let range = window.getSelection().getRangeAt(0);
    newSelected.removeRange(range);
    this.onSave();
    this.edit.blur();
  }

  onSave = async (e) => {
    if (e && e.type === "keypress") {
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
    if(this.props.getValue) this.props.getValue(this.state);
  }

  render() {
    return (
      <TextEditWrap tabindex="0" onBlur={this.onSave} ref={ref => (this.textWrap = ref)}>
        {this.state.openMenu &&
          <div>
            <NaviMenu>
              <input type="button" value="BOLD" style={{fontWeight: "bold"}} onClick={this.getBold} />
              <input type="button" value="ITALIC" style={{fontStyle: "italic"}} onClick={this.getItalic} />
              <input type="button" value="UNDERLINE" style={{textDecoration: "underline"}} onClick={this.getUnderline} />
              <input type="button" value="12px" onClick={()=>this.onChangeSize("12px")} />
              <input type="button" value="14px" onClick={()=>this.onChangeSize("14px")} />
              <input type="button" value="18px" onClick={()=>this.onChangeSize("18px")} />
              <input type="button" value="26px" onClick={()=>this.onChangeSize("26px")} />
              <input type="button" value="LEFT" onClick={this.getJustifyleft} />
              <input type="button" value="CENTER" onClick={this.getJustifycenter} />
              <input type="button" value="RIGHT" onClick={this.getJustifyright} />
            </NaviMenu>
            <ColorMenu>
              <input type="button" className="red" onClick={() => this.onChangeColor('#E72327')}/>
              <input type="button" className="green" onClick={() => this.onChangeColor('#008000')}/>
              <input type="button" className="blue" onClick={() => this.onChangeColor('#10669A')}/>
              <input type="button" className="lightGrey" onClick={() => this.onChangeColor('#EAEEEF')}/>
              <input type="button" className="basicGrey" onClick={() => this.onChangeColor('#A9AFB3')}/>
              <input type="button" className="darkGrey" onClick={() => this.onChangeColor('#363A3C')}/>
              <input type="button" className="black" onClick={() => this.onChangeColor('#000')}/>
            </ColorMenu>
          </div>
        }
        <TextSection>
          <div
            ref={ref => (this.edit = ref)}
            contentEditable="true"
            id={`valContainer${this.props.item.order}`}
            className="valContainer"
            onBlur={this.onSave}
            onKeyPress={this.onSave}
            onFocus={()=>this.setState({openMenu: true})}
          />
        </TextSection>
      </TextEditWrap>
    );
  }
}

export default TextController;
