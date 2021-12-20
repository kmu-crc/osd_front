import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormFile } from "./FormFile";

const InputWrap = styled.div`
  // height: 156px;
  display: flex;
  flex-direction: column;

  .textWrapper {
    // width:100%;
  }
  label {
    width: 63px;
    // height: 25px;
    cursor: pointer;
  }
  .wrapper {
    // margin-left: 18px;
  }        
  .inside-wrapper {
    width: 63px;
    height: 25px;
  }
  .find {
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    color: #FF0000;
  }
  .text {
    // width: 341px;
    height: 45px;
    margin-top: 5px;
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    text-align: left;
    color: #707070;
  }
`;

const ThumbnailImgEx = styled.label`
  display: block;
  min-width: 156px;
  min-height: 156px;
  max-width: 156px;
  max-height: 156px;
  // margin-bottom: 10px;
  background-position: center;
  background-size: cover;
  background-color: #EFEFEF;
  cursor:arrow;
  margin-left: auto;
  margin-right: auto;
`;

export class FormThumbnailExMobile extends Component {
  state = { value: [], target: null, validates: [], imageUrl: "" };

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    if (this.props.image) {
      console.log(this.props.image);
      this.setState({ imageUrl: this.props.image })
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
        data.value[0].type === "image/bmp" ||
        data.value[0].type === "image/gif"
        // data.value[0].type === "image/webp"
      ) {
        let reader = new FileReader();
        reader.onloadend = async () => {
          await this.setState({ imageUrl: reader.result });
        };
        reader.readAsDataURL(data.value[0]);
      } else {
        await this.setState({ imageUrl: "" })
      }
    } else {
      let image = "";
      if (this.props.image) {
        image = this.props.image;
      }
      await this.setState({ imageUrl: image });
    }
    await this.setState({ ...data });
    this.returnData();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };
  render() {
    const { name, placeholder, id, validates, style } = this.props;
    let newstyle = { ...style };
    newstyle.backgroundImage = this.state.imageUrl ? `url(${this.state.imageUrl})` : null

    return (<InputWrap>

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

      <ThumbnailImgEx style={newstyle} />

      <div className="textWrapper">
        <label htmlFor={id ? id : name} >
          <div className="wrapper">
            <div className="inside-wrapper">
              <div className="find">찾아보기</div>
            </div>
            <div className="text">
              프로필 사진은 대표적으로 보이게 되는 사진으로,<br />
              JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.
            </div>
          </div>
        </label>
      </div>

    </InputWrap>);
  }
}

FormThumbnailExMobile.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
