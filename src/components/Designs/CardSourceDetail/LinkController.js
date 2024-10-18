import React, { Component } from 'react';
import styled from 'styled-components';
// import ContentEditable from "./ContentEditable";

const LinkWrap = styled.div`
  padding:20px;

`;
const LinkPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;

  .title_{
    font-size:15px;
    color:#707070;
    border-left:2px solid red;
    font-weight:500;
    padding-left:5px;
    margin-bottom:11px;
    margin-top:37px;
  }
  .preview_{
    padding:10px;
    width:100%;
    min-height:74px;
    border:1px solid #efefef;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .url {
      font-size: 0.9rem;
      line-height: 0.9rem;
      // padding: .5rem;
      color: #0645AD;
    }
    .description {
      font-size: 1.5rem;
      line-height: 2.5rem;
      font-weight: 300;
      color: #FF0000;
      padding: 0.5rem; 
    }
  
  }
`;
const LinkElement = styled.div`

  display: flex;
  flex-direction: column
  align-items: flex-start;
  font-size: 14px;

  .title_{
    font-size:15px;
    color:#707070;
    border-left:2px solid red;
    font-weight:500;
    padding-left:5px;
    margin-bottom:11px;
    margin-top:37px;
  }
  .content {
    width: 100%;
    background: #EFEFEF;
    overflow-y: hidden;
    input {
      width: 100%;
      height: 100%;
      border: none;
      margin:18px 0px;
      background: #EFEFEF;
      :focus {
        outline: none;
      }
    }
  }
`;

class LinkController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSaveUrl = this.onSaveUrl.bind(this);
    this.onSaveDescription = this.onSaveDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.validURL = this.validURL.bind(this);
  }
  async onSaveUrl(event) {
    if (this.validURL(this.state.url)) {
      await this.setState({
        content: JSON.stringify({
          url: this.state.url,
          description: this.state.description
        })
      });
      this.props.getValue(this.state);
    } else {
      alert("유효하지 않는 URL주소입니다.");
      this.setState({ url: "" });

    }
  }
  async onSaveDescription(event) {
    await this.setState({
      content: JSON.stringify({
        url: this.state.url || "",
        description: this.state.description || ""
      })
    });
    console.log(this.state);
    this.props.getValue(this.state);
  }
  componentDidMount() {
    this.setState(this.props.item);
    try {
      this.props.item.content &&
        this.setState({
          url: JSON.parse(this.props.item.content).url || "",
          description: JSON.parse(this.props.item.content).description || ""
        });
    } catch (_) {
      this.setState({ url: "", description: "" });
    }
  }
  async handleChange(event) {
    await this.setState({ url: event.target.value });
    // this.setState({ content: JSON.stringify({ url: event.target.value, description: this.state.description }) });
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
    // this.setState({ content: JSON.stringify({ url: this.state.url, description: event.target.value }) });
  }
  validURL(str) {
    var pattern = new RegExp('(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  render() {
    const { url, description } = this.state;

    return (<LinkWrap>

      <LinkPreview>
        <div className="title_">미리보기</div>
        <div className="preview_">
          <div className="description">{description}</div>
          <div className="url">{url}</div>
        </div>
      </LinkPreview>

      <LinkElement>
        <div className="title_">url주소</div>

        <div className="content">
          <input
            value={url}
            // <ContentEditable
            // getText
            // html={url}
            autoComplete="off"
            onChange={this.handleChange}
            onBlur={this.onSaveUrl}
          // />
          />
        </div>

      </LinkElement>

      <LinkElement>
        <div className="title_">설명</div>

        <div className="content">
          <input
            value={description}
            // <ContentEditable
            // getText
            // html={description}
            autoComplete="off"
            onChange={this.handleChangeDescription}
            onBlur={this.onSaveDescription}
          />
        </div>

      </LinkElement>

    </LinkWrap>)
  }
}

export default LinkController;