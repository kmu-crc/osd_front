import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormFile } from "./FormFile";
import market_style from "market_style";
const InputWrap = styled.div`
// div{ border:1px solid red; };
  // position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: row;
  @media only screen and (min-width: 0px) and (max-width: 700px) {
    flex-direction: column;
  }
  .label{
  }
  .wrapper{
    margin-left: 54.5px;
    margin-top: 100px;
    @media only screen and (min-width: 0px) and (max-width: 700px) {
      margin-left: 10px;
      margin-top: 25px;
    }
  }        
  .inside-wrapper{
    width: 63px;
    height: 25px;
  }
  .find{
    width:max-content;
    font-weight: 500;
    font-size: ${market_style.font.size.small3};
    border-bottom: 1.5px solid #FF0000;
    line-height: 25px;
    text-align: left;
    color: #FF0000;
    cursor:pointer;
  }
  .text{
    width: 341px;
    height: 45px;
    margin-top: 11px;
    font-weight: 300;
    font-size: ${market_style.font.size.mini3};
    line-height: 20px;
    text-align: left;
    color: #707070;
  }
`;

const ThumbnailImgEx = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  background-position: center;
  background-size: cover;
  background-color: #EFEFEF;
  cursor: pointer;
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
        await this.setState({ imageUrl: "" });
      }
    } else {
      let image = "";
      if (this.props.image) {
        image = this.props.image;
      }
      await this.setState({ imageUrl: image });
    }
    await this.setState({ ...data});
    this.returnData();
  };

  returnData = async e => {
    if (this.props.getValue) 
      await this.props.getValue(this.state);
    if (e && this.props.onBlur) 
      await this.props.onBlur();
  };
  render() {
    const { name, placeholder, id, validates, style } = this.props;
    let newstyle = { ...style };
    newstyle.backgroundImage = this.state.imageUrl ? `url(${this.state.imageUrl})` : null
    return (
      <InputWrap>
      
      <label htmlFor={id ? id : name} ><ThumbnailImgEx style={newstyle}/></label>
        <div>
            <div className="wrapper">
              <div className="inside-wrapper">
              <label htmlFor={id ? id : name} ><div className="find">찾아보기</div></label></div>
              <div className="text">프로필 사진은 대표적으로 보이게 되는 사진으로,<br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
            </div>
        </div>
        
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
