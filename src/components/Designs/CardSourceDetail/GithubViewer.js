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

  .tree-container {
    height: 36vh;
    overflow-y: auto;
  }

  .tree-element {
    padding: 3px;
    cursor: default;
    font-size: 1.2rem;
    border-bottom: 1px solid #F0F0F0;
    :hover {
      text-decoration: underline;
      color: #F90;
      background-color: #F0F0F0;
    }
    .file-name {
      margin-left: 1vw;
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
    align-items: center;
    a {
      cursor: pointer;
    }
  }
  .red {
    color: #F39;
  }
  .code {
    height: 36vh;
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
const SvgFile = () => <svg aria-label="File" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-file color-fg-muted">
  <path fillRule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z"></path>
</svg>
const SvgDirectory = () => <svg aria-label="Directory" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-file-directory-fill hx_color-icon-directory">
  <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>
</svg>
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
    if (current == null || current === "") {
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
    console.log("path:", path);
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ path: path, tree: data.tree.filter(e => e.type === "blob" || e.type === "tree").sort((a, b) => { if (a.type > b.type) return -1; if (a.type < b.type) return 1; return }), treeUrl: data.url, });
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

            document.getElementById('code' + this.props.uid).innerHTML
              = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
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
  move2 = async (last, type) => {
    const { owner, repo, branch } = this.state.gitinfo;
    const basic = `https://github.com/${owner}/${repo}/${type}/${branch}/${last}`;
    // const newpath = `${path.join('/')}/${last}`.replace("//", "/");
    // await this.setState({ current: `${basic}/${newpath}` });
    await this.setState({ current: basic });
    this.update();
  }
  moveupdir = async () => {
    const { type, current, gitinfo } = this.state;
    if (type === "tree") {
      let _path = current; //current.split(type + '/' + gitinfo.branch)[1].split('/');
      let split = _path.split(type + '/' + gitinfo.branch)[1].split('/');
      alert(_path.slice(0, split.length - 2).join("/"));
      // var path = "/bar/foo/moo/";
      // var split = path.split("/");
      // var x = split.slice(0, split.length - 2).join("/") + "/";
      // alert(x);

    } else {

    }
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

    console.log("path: _ ", type, current, path, prevTreeUrl)

    return (<LinkWrap>
      {loading
        ? <h2 className='loading-text'>
          로딩 중...
        </h2>

        : valid
          ? <>
            {/* path */}
            <div className='path'>
              <div>
                <a onClick={() => this.goHome()}>
                  {gitinfo.repo}
                </a>
              </div>

              <div>
                <p className='red'>
                  ({gitinfo.branch})
                </p>
              </div>

              <div>
                {/* {current && gitinfo.branch && type &&
                  current.split('/' + type + '/' + gitinfo.branch) &&
                  current.split('/' + type + '/' + gitinfo.branch)[1] &&
                  current.split('/' + type + '/' + gitinfo.branch)[1]
                    .split('/')
                    .map((dir, index) =>
                      <a key={index} onClick={() => this.move2(dir, "tree")}> {dir}</a>)} */}
              </div>
            </div>

            {current}
            {/* viewer */}
            {type === "tree"
              ? <div className='tree-container'>
                {
                  current.split(type + '/' + gitinfo.branch)[1] &&
                  current.split(type + '/' + gitinfo.branch)[1].replace('/', '') !== '' &&
                  <div className='tree-element'>
                    <a onClick={() => this.moveupdir()}>
                      ..
                    </a>
                  </div>
                }
                {tree.map((e, index) =>
                  <div
                    className='tree-element'
                    key={'tree' + this.props.uid + "_" + index}
                    onClick={() => this.move(e.path, e.type)}>
                    {e.type === "blob"
                      ? <SvgFile />
                      : <SvgDirectory />}
                    <span className='file-name'>
                      {e.path}
                    </span>
                  </div>
                )}
              </div>
              : <div className='code'>
                <pre ref={(ref) => { this.ref = ref; }}>
                  <code id={'code' + this.props.uid} />
                </pre>
              </div>}

            {/* link */}
            <div className='go'>
              <a href={current} target="_blank" >
                <img src={iGithub} />Github로 이동
              </a>
            </div>
          </>

          : <>경로가 잘못되었습니다.</>
      }
    </LinkWrap>)
  }
}
