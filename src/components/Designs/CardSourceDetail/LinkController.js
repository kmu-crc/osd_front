import React, { Component } from 'react';
import styled from 'styled-components';
import opendesign_style from 'opendesign_style';

const LinkEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${opendesign_style.color.grayScale.scale1};
  & #linkValContainer {
    min-height: 50px;
    max-height: 150px;
    line-height: 1.4;
    padding: .5rem;
    overflow-y: scroll;
  }
`;

const LinkMenu = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: ${opendesign_style.font.size.heading4};
  color: ${opendesign_style.color.grayScale.scale9}
  background-color: ${opendesign_style.color.grayScale.scale1};
  padding: 0 .5rem;
`;

class LinkController extends Component {
  state = {};
  componentDidMount() {
    if (this.props.item) {
      this.setState(this.props.item);
    }
  }
  // componentDidMount() {
  // if (!this.props.value) {
  // document.getElementById("linkValContainer").innerText = "주소를 입력해 주세요.";
  // } else {
  // document.getElementById("linkValContainer").innerText = this.props.value;
  // }
  // }
  onSave = async () => {
    const newValue = document.getElementById('linkValContainer').innerHTML;
    await this.setState({ content: newValue });
    this.props.getValue(this.state);
  }
  setInit = () => {
    if (!this.props.value && !this.state.value) {
      document.getElementById("linkValContainer").innerText = "";
    }
  }

  render() {
    const { item } = this.props;
    console.log("hyper-link", item);
    return (
      <LinkEditWrap>
        <LinkMenu>링크달기</LinkMenu>
        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          contentEditable="true"
          id="linkValContainer"
          onBlur={this.onSave}
        // onFocus={this.setInit}
        />
      </LinkEditWrap>
    );
  }
}

export default LinkController;
