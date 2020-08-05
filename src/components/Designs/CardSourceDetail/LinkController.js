import React, { Component } from 'react';
import styled from 'styled-components';
import ContentEditable from "./ContentEditable";

const LinkWrap = styled.div``;
const LinkPreview = styled.div`
  text-align: center;

  .title {
    font-size: .9rem;
    color: #707070;
  }
  .url {
    font-size: 2rem;
    line-height: 2.1rem;
    padding: .5rem;
    color: #0645AD;
  }
  .description {
    font-size: .9rem;
    line-height: .9rem;
    font-weight: 300;
    color: #FF0000;
    padding: .5rem; 
  }
`;
const LinkElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;

  .title {
    width: 20%;
    padding: 1rem;
    text-align: right;
    margin-right: 0.2rem;
  }
  .content {
    width: 80%;
    background: #EFEFEF;
    border-radius: 15px;
    border: 1px solid #707070;
    padding: 1rem;
    overflow-y: auto;
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
    this.props.getValue(this.state);
  }
  componentDidMount() {
    this.setState(this.props.item);
    this.props.item.content &&
      this.setState({
        url: JSON.parse(this.props.item.content).url || "",
        description: JSON.parse(this.props.item.content).description || ""
      });
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
        <div className="title">미리보기</div>
        <div className="url">{url}</div>
        <div className="description">*{description}</div>
      </LinkPreview>

      <LinkElement>
        <div className="title">주소</div>

        <div className="content">
          <ContentEditable
            getText
            html={url}
            onChange={this.handleChange}
            onBlur={this.onSaveUrl}
          />
        </div>

      </LinkElement>

      <LinkElement>
        <div className="title">설명</div>

        <div className="content">
          <ContentEditable
            getText
            html={description}
            onChange={this.handleChangeDescription}
            onBlur={this.onSaveDescription}
          />
        </div>

      </LinkElement>

    </LinkWrap>)
  }
}

export default LinkController;