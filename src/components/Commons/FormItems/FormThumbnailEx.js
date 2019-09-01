import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormFile } from "./FormFile";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
`;

const ThumbnailImgEx = styled.label`
  display: block;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  background-position: center;
  background-size: cover;
  background-color: #EFEFEF;
  cursor:arrow;
`;

export class FormThumbnailEx extends Component {
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
    return (
      <InputWrap>
        <ThumbnailImgEx style={newstyle} />
        <label htmlFor={id ? id : name} style={{ width: "63px", height: "25px", cursor: "pointer" }}>
          <div style={{ marginLeft: "54.5px", marginTop: "100px" }}>
            <div style={{ width: "63px", height: "25px" }}>
              <div style={{ fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }}>찾아보기</div></div>
            <div style={{ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }}>프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.</div>
          </div>
        </label>
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

FormThumbnailEx.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
