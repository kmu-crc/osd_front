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

  .tree-element {
    padding: 3px;
    cursor: default;
    font-size: 1.2rem;
    border-bottom: 1px solid #FAFAFA;
    :last {
      border-bottom: none;
    }
    :hover {
      text-decoration: under-line;
      color: #99F;
      background-color: #FAFAFA;
    }
  }
  .path {
    line-height: 1.8rem;
    font-size: 1.8rem;
    color: #444;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-item: center;
  }
  .red {
    color: #F99;
  }
  .code {
    height: 250px;
    overflow: scroll;
    background: #F3F3F3;
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
      await fetch(`https://api.github.com/repos/${chunk[1]}/${chunk[2]}`)
        .then(resp => resp.json())
        .then(data => data.default_branch) //|| "master"
      : chunk[4]
    return { owner: chunk[1], repo: chunk[2], branch: chunk[4], }
  }
  setHome = () => {
    const { owner, repo, branch } = this.state.gitinfo;
    this.setState({ home: `https://github.com/${owner}/${repo}/tree/${branch}` });
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
        this.setState({ path: path, tree: data.tree.filter(e => e.type === "blob" || e.type === "tree"), treeUrl: data.url, });
      })
  }
  getFile = async () => {
    const link = this.state.current.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    const resp = await fetch(link)
    return resp.text();
  }
  update = async () => {
    await this.setState({ loading: true, type: await this.getType() });
    this.state.type === "tree"
      ? this.getTree()
      : this.getFile()
        .then(code => {
          if (this.props.uid) {
            document.getElementById('code' + this.props.uid).innerHTML = code.replace('<', '&lt;');
          }
          highlightElement(this.ref);
        })
        .catch(e => console.error(e));
    await this.setState({ loading: false });
  }
  move = async (last, type) => {

    const { path, } = this.state;
    const { owner, repo, branch } = this.state.gitinfo;
    const basic = `https://github.com/${owner}/${repo}/${type}/${branch}`;
    const newpath = `${path.join('/')}/${last}`.replace("//", "/");

    await this.setState({ current: `${basic}/${newpath}` });
    this.update();
  }
  goHome = async () => {
    await this.setState({ current: this.state.home });
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
    this.setHome();
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
    const { valid, loading, type, tree, current, gitinfo, prevTreeUrl, path } = this.state;


    return (<LinkWrap>
      {loading
        ? <h2 className='loading-text'>
          loading...
        </h2>

        : valid
          ? <>
            {/* path */}
            <div className='path'>
              <a onClick={() => this.goHome()}>
                {/* this.setState({ current: this.state.home })}> */}
                {gitinfo.repo}
              </a>
              {/* <p className='red'> */}
              {/* ({gitinfo.branch}) */}
              {/* </p> */}
              {/* {(path != "" && path.length > 0) */}
              {/* ? path.map(e => <a onClick={() => this.move(e, "tree")}>/{e}</a>) */}
              {/* : null} */}
              {/* {current.split(gitinfo.branch)[1].map(e => e)} */}
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
                {tree.sort((a, b) => { if (a.type > b.type) return -1; if (a.type < b.type) return 1; return }).map((e, index) =>
                  <div
                    className='tree-element'
                    key={'tree' + this.props.uid + "_" + index}
                    onClick={() => this.move(e.path, e.type)}>
                    {e.type === "blob"
                      ? <svg aria-label="File" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-file color-fg-muted">
                        <path fill-rule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z"></path>
                      </svg>
                      : <svg aria-label="Directory" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-file-directory-fill hx_color-icon-directory">
                        <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>
                      </svg>}
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
              <a href={current} >
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
