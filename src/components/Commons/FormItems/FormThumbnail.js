import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { FormFile } from "./FormFile";
import ThumbnailDefault from "source/thumbnail.png";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

const ThumbnailImg = styled.label`
  display: block;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  background-position: center;
  background-size: cover;
  background-image: url(${ThumbnailDefault});
  cursor: pointer;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`;

const UploaderButton = styled.label`
  display: block;
  width: 200px;
  background-color: ${StyleGuide.color.sub.bule.basic};
  color: white;
  border-radius: 3px;
  padding: 0.7em 2em;
  text-align: center;
  cursor: pointer;
`;


export class FormThumbnail extends Component {
  state = {
    value: [],
    target: null,
    validates: [],
    imageUrl: ""
  };

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    if (this.props.image) {
      console.log(this.props.image);
      this.setState({imageUrl: this.props.image})
    }
    this.init();
  }

  init = async () => {
    this.returnData();
  };

  onChangeValue = async data => {
    if (data.value[0]) {
      if (
        data.value[0].type === "image/jpeg" ||
        data.value[0].type === "image/png" ||
        data.value[0].type === "image/gif" ||
        data.value[0].type === "image/bmp" ||
        data.value[0].type === "image/webp"
      ) {
        let reader = new FileReader();
        reader.onloadend = async () => {
          console.log("result", reader.result)
          await this.setState({
            imageUrl: reader.result
          });
        };
        reader.readAsDataURL(data.value[0]);
      } else {
        await this.setState({
          imageUrl: ""
        })
      }
    } else {
      let image = "";
      if (this.props.image) {
        image = this.props.image;
      }
      await this.setState({
        imageUrl: image
      });
    }
    await this.setState({ ...data });
    this.returnData();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };
  render() {
    const { name, placeholder, id, validates } = this.props;
    return (
      <InputWrap>
        <ThumbnailImg
          htmlFor={id ? id : name}
          style={
            this.state.imageUrl
              ? { backgroundImage: `url(${this.state.imageUrl})` }
              : null
          }
        />
        <UploaderButton htmlFor={id ? id : name}><i className="file alternate icon"/>{placeholder}</UploaderButton>
        <FormFile
          name={name}
          id={id ? id : name}
          placeholder={placeholder && placeholder}
          onChange={this.onChangeValue}
          getValue={this.onChangeValue}
          hidden={true}
          validates={validates}
          onlyImage={true}
        />
      </InputWrap>
    );
  }
}

FormThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
