import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png"


import forked from "source/forked.svg"
import iForked from "source/forked_icon_black.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"

//styled

const DesignerComp = styled.div`
    font-family: Noto Sans KR;
    height:150px;
    width:587px;
    
    
    .ImageBox{
        width: 150px;
        height: 150px;
        background-color: #D6D6D6;
        border-radius: 50%;
        position: absolute;
        background-size:cover;
        & img {
          width: 100%;
          height: 100%;
        }
        z-index:1;
        
    }
    
    .TextBox{
        width: 527px;
        height: 130px;
        background-color:#EFEFEF;
        border-radius: 15px 15px 15px 15px;
        position: relative;
        left:60px;
        top:10px;
    }
    .userName{
        
        top:19px;
        left:114px;
        font-size:20px;
        position:absolute;
        color:#707070;
        font-weight: bold;

    }
    .description{
        top:56px;
        left:114px;
        font-size:20px;
        position:absolute;
        color:#707070;
        font-weight: 100;
    }
    .cate{
        top:90px;
        left:462px;
        font-size:20px;
        position:absolute;
        color:#FF0000;
        font-weight: 300;
        
    }
    .view{
        position:absolute;
        width:22px;
        top:100px;
        left:115px;
    }
    .like{
        position:absolute;
        width:11px;
        top:100px;
        left:175px;
    }
    .child{
        position:absolute;
        width:22px;
        top:100px;
        left:235px;
    }
    
`;



class Designer extends Component{
    state = {data : this.props.data};
    render(){
        const designer = this.state.data;
        return(
            <>
                <DesignerComp>
                    <div className="ImageBox" style={designer.imgURL ? { backgroundImage: `url(${designer.imgURL.m_img})` } : { backgroundImage: `url(${noimg})` }}></div>
                    <div className="TextBox">
                        <div className="userName">{designer.nick_name}</div>
                        <div className="description"> </div>
                        <div className="cate">{designer.categoryName}</div>
                        <div className="view" ><IconView width="22px" height="11px"  fill="#000000"/></div>
                        <div style={{position:'absolute',top:'100px', left:'135px' , fontSize:'15px'}}>{designer.total_view}</div>
                        <div className="like" ><img alt="icon" src={iThumbUp}  style={{ width: "11px", height: "11px" }}/></div>
                        <div style={{position:'absolute',top:'100px', left:'190px' , fontSize:'15px'}}>{designer.total_like}</div>
                        <div className="child"><img alt="icon" src={iForked} style={{ width: "22px", height: "11px" }} /></div>
                        <div style={{position:'absolute',top:'100px', left:'250px', fontSize:'15px'}}>{designer.total_group}</div>
                    </div>

                </DesignerComp>

            </>

        )
    }

}
export default Designer