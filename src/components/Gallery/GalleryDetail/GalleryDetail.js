import React, { Component } from 'react';
import styled from "styled-components";
// import Gallery from "components/Gallery/Gallery/Gallery"; 
import ItemInGalleryContainer from "containers/Gallery/ItemInGalleryContainer/ItemInGalleryContainer";
import market_style from "market_style";


const Wrapper = styled.div`
width:100%;
height:max-content;
margin-top: 31px;
.contents_box{
    width:100%;
    height:max-content;
    display:flex;
}
.contents{
    width:max-content;
    height:max-content;
}
@media only screen and (min-width: 500px) and (max-width:1000px){
  .contents_box{
    flex-wrap:wrap;
  }
}
`;
const GalleryItem = styled.div`
  min-width:300px;
  height:300px;
  border-radius:20px;
  box-shadow: 3px 3px 5px #4141411A;
  border: 1px solid #eaeaea;
  padding:20px 14px 10px 14px;
  .galleryThumb{ 
    width:100%;
    height:230px;
    object-fit:contain;
  }
  .name{
    width:100%;
    text-align:center;
    margin-top:10px;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    color:black;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    width:100%;
  }
`
const ScrollInfo = styled.div`
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #4141411A;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding:20px 0px 0px 0px;
  font-family: Noto Sans KR;
  `
const AdditionalInfo = styled.div` 
  margin-left: ${prop => prop.mLeft}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: ${props => props.height == null ? "100%" : props.height + "px"};
  max-width:990px;
  height:300px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #4141411A;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding: 40px 60px;
  font-family: Noto Sans KR;
  .title {
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:5px;
  }
  .text_ {
    height:100%;
    width:100%;
    font-size:${market_style.font.size.small1};
    font-weight: 300;
    text-align: left;
    overflow-x:hidden;
    overflow-y:overlay;
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
  @media only screen and (min-width: 500px) and (max-width:1000px){
    margin-left:0px;
    margin-top:20px;
  }
`;

class GalleryDetail extends Component {

    render(){
      // console.log("this??????????/",this.props);
        return(
        <Wrapper>
            <div className="contents_box">
                <GalleryItem img={this.props.galleryDetail&&this.props.galleryDetail.thumbnail}>
                  <img src={this.props.galleryDetail&&this.props.galleryDetail.thumbnail} className="galleryThumb"/>
                  <div className="name">{this.props.galleryDetail&&this.props.galleryDetail.title}</div>
                </GalleryItem>
                <AdditionalInfo mLeft={20}>
                    <div className="title margin_bottom">{this.props.galleryDetail&&this.props.galleryDetail.title}</div>
                    <div className="text_">{this.props.galleryDetail&&this.props.galleryDetail.description}
                    </div>
                </AdditionalInfo>
            </div>   
            <ScrollInfo mTop={20}>
                <ItemInGalleryContainer id={this.props.id}/>
            </ScrollInfo>
        </Wrapper>
        );
    }

}export default GalleryDetail;