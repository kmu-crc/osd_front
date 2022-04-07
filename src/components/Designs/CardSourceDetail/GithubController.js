import React, { Component } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  .go {
    a {
      display: flex;
      align-items: center;
      text-align: center;
      width: max-content;
      margin-left: auto;
      // :hover { }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
  pre {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .input-field {
    display: flex;
    margin-top: 15px;
    margin-left: 65px;
    // .txt{
    //     width: 97px;
    //     height: 29px;
    //     font-size: 20px;
    //     font-weight: 500;
    //     font-family: Noto Sans KR;
    //     text-align: left;
    //     line-height: 40px;
    //     color: #707070;
    // }
    .input-container{
        margin-left: 31px;
        width: 505px;
        height: 56px;
        background-color: #EFEFEF;
        border-radius: 5px;
    }
    .input-style{
        border-radius: 5px;
        width: 100%;
        border: none;
        background: transparent;
        font-size: 20px;
        font-weight: 500;
        color: #707070;
        height: 100%;
        padding: 16px 23px 16px 23px;
    }
}
`;

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

  onSave = async () => {
    this.props.getValue && this.props.getValue({ type: "GITHUB", content: this.state.content });
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

      <div className='input-field'>
        <p className='txt'>링크</p>
        <div className='input-container'>
          <input className='input-style' value={content} onChange={(e) => this.setState({ content: e.target.value })} />
        </div>
      </div>

      <div>
        <button onClick={this.onSave}>저장</button>
        <button onClick={this.onCancel}>취소</button>
      </div>

    </Wrap>);
  }
}
