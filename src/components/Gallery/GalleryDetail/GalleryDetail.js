import React, { Component } from 'react';
import styled from "styled-components";
// import Gallery from "components/Gallery/Gallery/Gallery"; 
import ItemInGalleryContainer from "containers/Gallery/ItemInGalleryContainer/ItemInGalleryContainer";
import market_style from "market_style";


const Wrapper = styled.div`
margin-top: 31px;
.contents_box{
    width:100%;
    height:300px;
    display:flex;
  }
.contents{
    width:max-content;
    height:max-content;
}
`;
const GalleryItem = styled.div`
  min-width:294px;
  max-width:294px;
  height:100%;
  border-radius:20px;
  box-shadow: 3px 3px 5px #4141411A;
  border: 1px solid #eaeaea;
  padding:20px 14px 10px 14px;
  .galleryThumb{
    width:100%;
    height:238px;
    background-image: url(${props => props.img});
    background-size: cover;
    background-repeat:no-repeat;
    background-position: center center
  }
  .name{
    width:100%;
    text-align:center;
    margin-top:10px;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    color:black;
  }
`
const ScrollInfo = styled.div`
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: 376px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #4141411A;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding:20px 26px;
  font-family: Noto Sans KR;
  `
const AdditionalInfo = styled.div`
  margin-left: ${prop => prop.mLeft}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: ${props => props.height == null ? "100%" : props.height + "px"};
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
  .text {
    height:100%;
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
`;

class GalleryDetail extends Component {

    render(){
      // console.log("this??????????/",this.props);
        return(
        <Wrapper>
            <div className="contents_box">
                {/* <Gallery data={this.props.galleryDetail}/> */}
                <GalleryItem img={this.props.galleryDetail&&this.props.galleryDetail.thumbnail}>
                  <div className="galleryThumb"/>
                  <div className="name">{this.props.galleryDetail&&this.props.galleryDetail.title}</div>
                </GalleryItem>
                <AdditionalInfo mLeft={30}>
                    <div className="title margin_bottom">{this.props.galleryDetail&&this.props.galleryDetail.title}</div>
                    <div className="text">{this.props.galleryDetail&&this.props.galleryDetail.description}
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