import React, { Component } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  justify-content: center;

  input {
    width: 50vw;
    height: 2rem;
    background-color: #EFEFEF;
    border: 1px solid #707070;
    padding: 3px;
    outline: none;
    color: #707070;
  }

`;
const GitHubURL = (url) => {
}
export default class GithubController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      content: "",
    };
  }
  componentDidMount() {
    this.setState({
      content: (this.props.item && this.props.item.content) || "",
    });
  }

  verification = async (url) => {
    console.clear();
    console.log(url);
    const chunk = url.split('//')[1].split('/');
    if (chunk[0] !== "github.com") {
      return false;
    }
    if (chunk[3] !== "blob" && chunk[3] === "tree") {
      return false;
    }
    const path = url.split(chunk[3] + '/main/')[1];
    console.log(chunk[0], chunk[1], chunk[2], path)
  }

  onSave = async () => {
    if (this.verification(this.state.content)) {

    }
    // GitHubURL(this.state.content);
    // this.props.getValue && this.props.getValue({ type: "GITHUB", content: this.state.content });
  };
  onCancel = async () => {
    this.setState({
      content: (this.props.item && this.props.item.content) || "",
    });
  };

  render() {
    console.clear();
    console.log(this.props.item);

    const { content } = this.state;

    return (<Wrap>

      {content}
      <h2>깃허브 링크등록</h2>
      <h4>입력란에서 사용자이름 및 저장소 이름을 입력하면 </h4>
      <div>
        <input
          className='input-style'
          value={content}
          onPaste={(e) => { this.setState({ content: e.clipboardData.getData('text/plain') }) }}
          onChange={(e) => this.setState({ content: e.target.value })}
          onBlur={_ => this.onSave()}
        />
      </div>

      <div>
        {/* <button onClick={this.onSave}>저장</button> */}
        <button onClick={this.onCancel}>취소</button>
      </div>

    </Wrap>);
  }
}
