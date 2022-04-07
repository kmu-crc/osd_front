import React, { Component } from 'react';
import styled from 'styled-components';
import { highlightElement } from 'highlight.js';
import iGithub from "source/GitHubMark.png";

const LinkWrap = styled.div`
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
`;

export default class GithubViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, }
  }
  async componentDidMount() {

    await this.setState({ loading: true });
    const { url } = this.props;

    if (url == null) {
      await this.setState({ loading: false });
      this.setState({ code: "경로가 잘못되었습니다." });
      return;
    }

    this.setState({
      code: await this.covertURL(url)
        .then(link => this.getFile(link))
        .then(code => {

          if (this.props.uid) {
            document.getElementById('code' + this.props.uid).innerHTML = code.replace('<', '&lt;');
          }
          highlightElement(this.ref);

        })
        .catch(e => {
          alert(e);
          this.setState({ loading: false });
          return null;
        })
    });
    await this.setState({ loading: false });
  }
  covertURL = (link) =>
    new Promise((resolve, reject) => {

     alert(link.split('/').pop());

      if (link.split('/').pop()) {
        this.setState({ type: "FILE" });
        resolve(link.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/"));
      } else {
        this.setState({ type: "DIRECTORY" });
        resolve(link.replace("/blob/", "/tree/"));
      }
      reject(new Error("잘못된 경로입니다."));
    });
  getFile = async (url) => {
    console.clear();
    const resp = await fetch(url);
    return resp.text();
  }

  render() {
    const { url } = this.props;

    return (<LinkWrap>
      {/* viewer */}
      <pre ref={(ref) => { this.ref = ref; }}>
        <code id={'code' + this.props.uid} />
      </pre>
      <div className='go'>
        <a href={url} >
          <img src={iGithub} />
          Github로 이동
        </a>
      </div>

    </LinkWrap>)
  }
}
