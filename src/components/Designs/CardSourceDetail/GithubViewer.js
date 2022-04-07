import React, { Component } from 'react';
import styled from 'styled-components';
import { highlightElement } from 'highlight.js';
import iGithub from "source/GitHubMark.png";

const LinkWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: center;
  // height: 50%
  .code {
    height: 250px;
    overflow: scroll;
  }
  .hljs {
    padding-right: 10px;
    width: max-content;
  }

  .go {
    a {
      display: flex;
      align-items: center;
      text-align: center;
      width: max-content;
      margin-left: auto;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
`;


export default class GithubViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      valid: false,
      gitinfo: { owner: "", repo: "", branch: "" },
      type: "",
      current: "",
      tree: [],
      treeUrl: null,
      prevTreeUrl: null,
      path: "",
    }
  }
  verify = async () => {
    const { current } = this.state;
    if (current == null) {
      return false;
    }
    const host = current.split('//')[1].split('/')[0]
    if (host !== "github.com") {
      return false;
    }
    return true;
  }
  getType = () => {
    const chunk = this.state.current.split('//')[1].split('/');
    return chunk[3] || "tree";
  }
  getGitInfo = async () => {
    const chunk = this.state.current.split('//')[1].split('/');
    chunk[4] = (chunk[4] == null) ?
      // https://api.github.com/repos/octocat/hello-world
      await fetch(`https://api.github.com/repos/${chunk[1]}/${chunk[2]}`)
        .then(resp => resp.json())
        .then(data => data.default_branch) //|| "master"
      : chunk[4]
    return { owner: chunk[1], repo: chunk[2], branch: chunk[4] };
  }
  getTree = async () => {
    const { gitinfo, current } = this.state;
    let path = current.split(gitinfo.branch)[1].split('/');
    path = path.filter(n => n);
    let url = `https://api.github.com/repos/${gitinfo.owner}/${gitinfo.repo}/git/trees/${gitinfo.branch}`

    if (path.length) {
      for (const node of path) {
        await fetch(url)
          .then(resp => resp.json())
          .then(data => {
            const found = data.tree.find(e => e.path === node);
            url = found && found.url;
          })
      }
    }
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ path: path, tree: data.tree, treeUrl: data.url, });
      })
  }
  getFile = async () => {
    const link = this.state.current.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    const resp = await fetch(link)
    return resp.text();
  }
  update = async () => {
    await this.setState({ type: await this.getType() });

    this.state.type === "tree"
      ? this.getTree()
      : this.getFile()
        .then(code => {
          console.log(code);
          if (this.props.uid) {
            document.getElementById('code' + this.props.uid).innerHTML = code.replace('<', '&lt;');
          }
          highlightElement(this.ref);
        })
        .catch(e => console.error(e));
  }
  move = async (last, type) => {
    const { path, gitinfo } = this.state;
    await this.setState({
      current: `https://github.com/${gitinfo.owner}/${gitinfo.repo}/${type}/${gitinfo.branch}/${path.join('/')}/${last}`
    });
    this.update();
  }
  async componentDidMount() {

    await this.setState({ loading: true });

    await this.setState({ current: this.props.url });

    await this.setState({ valid: await this.verify() });

    if (!this.state.valid) {
      await this.setState({ loading: false });
      return;
    }
    await this.setState({ gitinfo: await this.getGitInfo() });
    this.update();

    await this.setState({ loading: false });
  }
  covertURL = (link) =>
    new Promise((resolve, reject) => {
      if (link.split('/').pop()) {
        this.setState({ type: "FILE" });
      } else {
        this.setState({ type: "DIRECTORY" });
        resolve(link.replace("/blob/", "/tree/"));
      }
      reject(new Error("잘못된 경로입니다."));
    });


  render() {
    const { url } = this.props;
    const { valid, loading, type, tree, gitinfo, path } = this.state;

    console.log(gitinfo);
    return (<LinkWrap>
      {loading
        ? <h2 className='loading-text'>
          loading...
        </h2>

        : valid
          ? <>
            {/* path */}
            <div>
              {gitinfo.repo}
              ({gitinfo.branch})
              {(path != "" && path.length > 0)
                ? path.map(e => <a onClick={() => alert(e)}>/{e}</a>)
                : null}
            </div>

            {/* viewer */}
            {type === "tree"
              ? <>
                {/* 
                mode: "100644"
                path: ".gitkeep"
                sha: "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
                size: 0
                type: "blob"
                url: "https://api.github.com/repos/highlightjs/highlight.js/git/blobs/e69de29bb2d1d6434b8b29ae775ad8c2e48c5391" */}

                {tree.map((e, index) =>
                  <div key={'tree' + this.props.uid + "_" + index}
                    onClick={() => this.move(e.path, e.type)}>
                    {e.path}
                  </div>
                )}
              </>
              : <div className='code'>
                <pre ref={(ref) => { this.ref = ref; }}>
                  <code id={'code' + this.props.uid} />
                </pre>
              </div>
            }
            {/* link */}
            <div className='go'>
              <a href={url} >
                <img src={iGithub} />
                Github로 이동
              </a>
            </div>
          </>

          : <>경로가 잘못되었습니다.</>
      }
    </LinkWrap>)
  }
}
