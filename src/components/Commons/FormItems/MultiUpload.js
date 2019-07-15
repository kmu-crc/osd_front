import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormFile } from "./FormFile";
import fileImg from "source/file.png";
import { Icon } from "semantic-ui-react";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const FileItem = styled.div`
  width: 100px;
  height: 130px;
  float: left;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  p {
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
  }
`;

const FileImg = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`;

const UploaderButton = styled.label`
  display: block;
  width: 100%;
  border: 2px dashed #292a2b;
  border-radius: 3px;
  padding: 20px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  display: block;
  background-color: black;
  border: 2px solid white;
  position: absolute;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  top: -8px;
  right: -8px;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  i.icon {
    width: auto;
    margin: 0;
    position: absolute;
    line-height: 23px
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    color: #fff;
  }
`;

export class MultiUpload extends Component {
  state = {
    value: [],
    target: null,
    validates: [],
    urls: [],
    render: true,
    display: true
  };

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    if (this.props.image) {
      this.setState({ imageUrl: this.props.image });
    }
    this.init();
  }

  init = async () => {
    this.returnData();
  };

  onChangeValue = async data => {
    let newValue = [...this.state.value];
    let newUrls = [...this.state.urls];
    console.log(data.value[0]);
    if (data.value[0]) {
      if (
        data.value[0].type === "image/jpeg" ||
        data.value[0].type === "image/png" ||
        data.value[0].type === "image/gif" ||
        data.value[0].type === "image/bmp" 
        // data.value[0].type === "image/webp"
      ) {
        let reader = new FileReader();
        reader.onloadend = async () => {
          console.log("result", reader.result);
          // reader.result 이미지 경로
          // imageUrl = reader.result;
          newUrls.push(reader.result);
        };
        reader.readAsDataURL(data.value[0]);
      } else {
        // imageUrl = fileImg;
        newUrls.push(fileImg);
      }
      newValue.push(data.value[0]);
    }
    await this.setState({
      ...data,
      value: newValue,
      render: false,
      urls: newUrls
    });
    setTimeout(() => {
      this.setState({ render: true });
    }, 100);
    await this.returnData();
  };

  deleteImages = async index => {
    let newArray = [...this.state.value];
    let newUrls = [...this.state.urls];
    await this.setState({ display: false });
    newArray.splice(index, 1);
    newUrls.splice(index, 1);
    await this.setState({
      value: newArray,
      urls: newUrls,
      display: true
    });
    this.returnData();
  };

  returnData = async e => {
    console.log("multi", this.state);
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };
  render() {
    const { name, placeholder, id, validates } = this.props;
    return (
      <InputWrap>
        <UploaderButton htmlFor={id ? id : name}><i className="file alternate icon"/>{placeholder}</UploaderButton>
        {this.state.display && (
          <FormFile
            name={name && name}
            id={id ? id : name}
            placeholder={placeholder && placeholder}
            onChange={this.onChangeValue}
            getValue={this.onChangeValue}
            hidden={true}
            validates={validates}
            onlyImage={false}
          />
        )}
        {this.state.value.length > 0 &&
          this.state.value.map((item, index) => {
            console.log("item", index, item);
            console.log("item", this.state.urls, this.state.urls[index]);
            return (
              <FileItem key={`file${index}`}>
                <FileImg
                  style={
                    this.state.render
                      ? { backgroundImage: `url(${this.state.urls[index]})` }
                      : null
                  }
                />
                <p>{item.name}</p>
                <DeleteBtn
                  type="button"
                  onClick={() => this.deleteImages(index)}
                >
                  <Icon name="remove" />
                </DeleteBtn>
              </FileItem>
            );
          })}
      </InputWrap>
    );
  }
}

MultiUpload.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
