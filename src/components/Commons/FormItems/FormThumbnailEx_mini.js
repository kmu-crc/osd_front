import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormFile } from "./FormFile";
import market_style from "market_style";
const InputWrap = styled.div`
  .wrapper_{
    display:flex;
    justify-content:flex-start;
    align-items:flex-end;
  }     
  .inside-wrapper{
    width: 63px;
    height: 25px;
  }
  .find{
    width:max-content;
    padding:5px 21px 4px 21px;
    border-radius:16px;
    border:1px solid red;
    font-weight: 500;
    font-size: ${market_style.font.size.small1};
    text-align: left;
    color: #FF0000;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:10px;
  }
  .text{
    width:100%;
    margin-top: 10px;
    font-weight: 300;
    font-size: ${market_style.font.size.mini2};
    color: #707070;
  }
`;

const ThumbnailImgEx = styled.div`
  min-width: 110px;
  min-height: 110px;
  max-width: 110px;
  max-height: 110px;
  border-radius:10px;
  background-position: center;
  background-size: cover;
  background-color: #EFEFEF;
  cursor: pointer;
`;

export class FormThumbnailEx_mini extends Component {
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
      
        <div className="wrapper_">
            <label htmlFor={id ? id : name} ><ThumbnailImgEx style={newstyle}/></label>
            <label htmlFor={id ? id : name} ><div className="find">파일 등록</div></label>
        </div>
        <div className="text">프로필 사진은 대표적으로 보이게 되는 사진으로,<br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
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

FormThumbnailEx_mini.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
