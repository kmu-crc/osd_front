import React, {Component} from 'react';
import styled from 'styled-components';
import StyleGuide from 'StyleGuide';
import {Icon} from 'semantic-ui-react';

const TextEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${StyleGuide.color.geyScale.scale1};
  & .red {
    color: ${StyleGuide.color.main.basic};
  }
  & .blue {
    color: ${StyleGuide.color.sub.bule.basic};
  }
  & .green {
    color: green;
  }
  & .lightGrey {
    color: ${StyleGuide.color.geyScale.scale2};
  }
  & .basicGrey {
    color: ${StyleGuide.color.geyScale.scale5};
  }
  & .darkGrey {
    color: ${StyleGuide.color.geyScale.scale8};
  }
  & .black {
    color: #000;
  }
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
  & #valContainer {
    min-height: 100px;
    max-height: 300px;
    line-height: 1.4;
    padding: .5rem;
    overflow-y: scroll;
  }
`;

class TextController extends Component {
  state = {
    value: this.props.value,
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
    return true
  }

  // onChangeSize = size => {
  //   let node = window.document.createElement(size);
  //   const selected = window.getSelection().getRangeAt(0);
  //   const text = selected.toString();
  //   const parent = selected.startContainer.parentNode;
  //   console.log(selected.startContainer.parentNode);
  //   if (parent.textContent === text) {
  //     if (!parent.classList.contains('valContainer')) {
  //       node.textContent = text;
  //       parent.remove();
  //       selected.insertNode(node);
  //     } else {
  //       node.innerHTML = selected;
  //       selected.deleteContents();
  //       selected.insertNode(node);
  //     }
  //   } else {
  //     node.innerHTML = selected;
  //     selected.deleteContents();
  //     selected.insertNode(node);
  //   }
  //   let newSelected = window.getSelection();
  //   let range = window.getSelection().getRangeAt(0);
  //   newSelected.removeRange(range);
  // };

  onChangeSize = (size) => {
    if (!window.getSelection || window.getSelection().rangeCount === 0) {
      return;
    }
    const selected = window.getSelection().getRangeAt(0);
    const parentEl = window.getSelection().focusNode.parentElement;
    const text = selected.toString();

    if (parentEl.classList.contains('valContainer')) {
      let node = window.document.createElement("font");
      node.innerHTML = selected;
      node.style.fontSize = size;
      selected.deleteContents();
      selected.insertNode(node);
    } else {
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
  };

  onChangeColor = color => {
    if (!window.getSelection || window.getSelection().rangeCount === 0) {
      return;
    }
    const selection = window.getSelection();
    const parentEl = selection.focusNode.parentElement;
    const selected = window.getSelection().getRangeAt(0);
    const text = selected.toString();

    if (parentEl.classList.contains('valContainer')) { //맨 첫줄일 경우
      let node = window.document.createElement("font");
      node.innerHTML = selected;
      node.setAttribute("class", color);
      selected.deleteContents();
      selected.insertNode(node);
    } else { //두번째줄 이상일 경우
      if (parentEl.textContent === text) {
        if (parentEl.firstElementChild && parentEl.firstElementChild.nodeName == "FONT") {
          parentEl.setAttribute("class", color);
          parentEl.innerHTML = selected;
        } else {
          parentEl.setAttribute("class", color);
        }
      } else {
        let node = window.document.createElement("font");
        node.innerHTML = selected;
        node.setAttribute("class", color);
        selected.deleteContents();
        selected.insertNode(node);
      }
    }
    this.onCursorOut();
  };

  onCursorOut = () => {
    let newSelected = window.getSelection();
    let range = window.getSelection().getRangeAt(0);
    newSelected.removeRange(range);
    this.onSave();
    this.edit.blur();
  }

  onSave = async (e) => {
    console.log(e.type)
    if(e.type === "keypress"){
      await this.setState({content: this.edit.innerHTML});
    } else {
      if (!this.edit.textContent) {
        if(this.props.deleteItem) this.props.deleteItem();
      } else {
        console.log("드디어 세이브", this.state);
        await this.setState({content: this.edit.innerHTML});
        this.returnData();
      }
    }
  };

  returnData = async () => {
    if(this.props.getValue) this.props.getValue(this.state);
  }

  render() {
    return (
      <TextEditWrap>
        <NaviMenu>
          <input type="button" value="BOLD" style={{fontWeight: "bold"}} onClick={this.getBold} />
          <input type="button" value="ITALIC" style={{fontStyle: "italic"}} onClick={this.getItalic} />
          <input type="button" value="UNDERLINE" style={{textDecoration: "underline"}} onClick={this.getUnderline} />
          {/* <input
            type="button"
            value="h1"
            onClick={() => this.onChangeSize('H1')}
          />
          <input
            type="button"
            value="h2"
            onClick={() => this.onChangeSize('H2')}
          />
          <input
            type="button"
            value="h3"
            onClick={() => this.onChangeSize('H3')}
          />
          <input
            type="button"
            value="h4"
            onClick={() => this.onChangeSize('H4')}
          />
          <input
            type="button"
            value="p"
            onClick={() => this.onChangeSize('p')}
          /> */}
          <input type="button" value="12px" onClick={()=>this.onChangeSize("12px")} />
          <input type="button" value="14px" onClick={()=>this.onChangeSize("14px")} />
          <input type="button" value="18px" onClick={()=>this.onChangeSize("18px")} />
          <input type="button" value="26px" onClick={()=>this.onChangeSize("26px")} />
          <input type="button" value="LEFT" onClick={this.getJustifyleft} />
          <input type="button" value="CENTER" onClick={this.getJustifycenter} />
          <input type="button" value="RIGHT" onClick={this.getJustifyright} />
        </NaviMenu>
        <ColorMenu>
          <input
            type="button"
            className="red"
            onClick={() => this.onChangeColor('red')}
          />
          <input
            type="button"
            className="green"
            onClick={() => this.onChangeColor('green')}
          />
          <input
            type="button"
            className="blue"
            onClick={() => this.onChangeColor('blue')}
          />
          <input
            type="button"
            className="lightGrey"
            onClick={() => this.onChangeColor('lightGrey')}
          />
          <input
            type="button"
            className="basicGrey"
            onClick={() => this.onChangeColor('basicGrey')}
          />
          <input
            type="button"
            className="darkGrey"
            onClick={() => this.onChangeColor('darkGrey')}
          />
          <input
            type="button"
            className="black"
            onClick={() => this.onChangeColor('black')}
          />
        </ColorMenu>
        <TextSection>
          <div
            ref={ref => (this.edit = ref)}
            contentEditable="true"
            id={`valContainer${this.props.item.order}`}
            className="valContainer"
            onBlur={this.onSave}
            onKeyPress={this.onSave}
          />
        </TextSection>
      </TextEditWrap>
    );
  }
}

export default TextController;
