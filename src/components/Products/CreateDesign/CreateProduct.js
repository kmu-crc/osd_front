import React, { Component } from "react";
import CreateProductFormContainer from "containers/Products/CreateProductFormContainer";
import Loading from "components/Commons/Loading";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";

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
    width:100%;
    margin-top:60px;
    margin-bottom: 100px;
    position: relative;
    z-index:3;
`;

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  setLoader = () => {
    this.setState({ loading: !this.state.loading });
  }
  render() {
    return (
      <React.Fragment>
        <Wrapper>
            <CreateProductFormContainer setLoader={this.setLoader} />
        </Wrapper>
        {this.state.loading && <Loading />}
      </React.Fragment>
    );
  }
}

export default CreateProduct;
