import React, { Component } from "react";
import Loading from "components/Commons/Loading";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";
import Button from "components/Commons/Button";
import { FormFile, FormTag, FormDropBox, FormInput, FormTextArea } from "components/Commons/FormItems";

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;
const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1 {
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: ${StyleGuide.font.size.heading2};
    font-weight: bold;
  }
`;
const Wrapper = styled(ContentBox)`
  margin-top: -70px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };
const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  @media only screen and (min-width: 1200px) {
    padding: 35px 10px 0px 10px;
  }
  &.field label {
    display: block;
    color: rgba(0,0,0,.87);
    font-size: .92rem;
    font-weight: 700;
    text-transform: none;
  }
`;
const ProductDelivery = styled.div`
  display:flex;
  margin-bottom:50px;
  .title-wrapper {
    margin-right:80px;
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      width: 150px;
      height:30px;
      border-right:10px solid #707070;
      margin-left: 15px;
      font-weight: bold;
      font-size: ${TxtSz.M}px;
    }
  }
  .delivery-method-wrapper {
    width:100%;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white; 
    .option {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      margin-top: 10px;
      .text {
        width: 210px;
        margin-left: 15px;
      }
      .input {
        width:100%;
      }
    }
  }
`;

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  handleChange = (e) => {
    e.preventDetault();
  }
  render() {
    return (
      <React.Fragment>
        <FromFieldCard>
          <ProductDelivery>
            <div className="delivery-method-wrapper">
              <div className="option">
                <div className="text">메이커</div>
                <div className="input">
                  <FormInput name="designer" onChange={this.handleChange} placeholder="내용을 입력해주세요" />
                </div>
              </div>
              <div className="option">
                <div className="text">제목</div>
                <div className="input">
                  <FormInput name="title" onChange={this.handleChange} placeholder="내용을 입력해주세요" />
                </div>
              </div>
              <div className="option">
                <div className="text">카테고리</div>
                <div className="input">
                  <FormDropBox />
                </div>
              </div>
              <div className="option">
                <div className="text">희망비용</div>
                <div className="input">
                  <FormInput name="hopeprice" onChange={this.handleChange} placeholder="내용을 입력해주세요" />
                </div>
              </div>

              <div className="option">
                <div className="text">설명</div>
                <div className="input">
                  <FormTextArea name="description" onChange={this.handleChange} placeholder="내용을 입력해주세요" />
                </div>
              </div>

              <div className="option">
                <div className="text">파일첨부</div>
                <div className="input">
                  <FormFile />
                </div>
              </div>

              <div className="option">
                <div className="text">태그</div>
                <div className="input">
                  <FormTag name="tags" onChange={this.handleChange} placeholder="내용을 입력해주세요" />
                </div>
              </div>
            </div>
          </ProductDelivery>
        </FromFieldCard>

        <div style={{ width: "max-content", marginLeft: "auto" }}>
          <Button color="Primary" type="submit" >의뢰하기</Button>
        </div>
      </React.Fragment>);
  }
}

class RequestToMaker extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  render() {
    return (<React.Fragment>
      <ImgWrapper>
        <Title><h1>디자인 의뢰</h1></Title>
      </ImgWrapper>
      <Wrapper>
        <RequestForm />
      </Wrapper>
      {this.state.loading && <Loading />}
    </React.Fragment>);
  }
};

export default RequestToMaker;
