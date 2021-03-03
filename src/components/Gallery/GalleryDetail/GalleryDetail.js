import React, { Component } from 'react';
import styled from "styled-components";
import Gallery from "components/Gallery/Gallery/Gallery"; 
import ItemInGalleryContainer from "containers/Gallery/ItemInGalleryContainer/ItemInGalleryContainer";
import market_style from "market_style";


const Wrapper = styled.div`
*{
    // border:1px solid black;
}
margin-top: 58px;
.contents_box{
    display:flex;
  }
.contents{
    width:max-content;
    height:max-content;
}
`;
const ScrollInfo = styled.div`
  margin-left: ${prop => prop.mLeft}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: max-content;  
  min-height:500px;

  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  // padding: 90px 43px 161px 54px;
  padding: 62px 59px 61px 60px;
  font-family: Noto Sans KR;
  `
const AdditionalInfo = styled.div`
  margin-left: ${prop => prop.mLeft}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: ${props => props.height == null ? "491px" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  // padding: 90px 43px 161px 54px;
  padding: 62px 59px 61px 60px;
  font-family: Noto Sans KR;
  .title {
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size:${market_style.font.size.small1};
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    overflow: auto;
  }
  .wrapItem{
    max-width:100%;
    max-height:100%;
    margin-top:30px;
    width:100%;
    height:max-content;
    overflow:hidden;
    display:flex;
  }
  &:hover{
    .wrapItem{
      overflow:auto;
    }
  }
`;

class GalleryDetail extends Component {

    render(){
      // console.log("this??????????/",this.props);
        return(
        <Wrapper>
            <div className="contents_box">
                <Gallery data={this.props.galleryDetail}/>
                <AdditionalInfo width={1433} height={250} mLeft={30}>
                    <div className="title">{this.props.galleryDetail&&this.props.galleryDetail.title}</div>
                    <div className="text">{this.props.galleryDetail&&this.props.galleryDetail.description}</div>
                </AdditionalInfo>
            </div>   
            <ScrollInfo width={1433} mLeft={275} mTop={30}>
                <ItemInGalleryContainer id={this.props.id}/>
            </ScrollInfo>
        </Wrapper>
        );
    }

}export default GalleryDetail;