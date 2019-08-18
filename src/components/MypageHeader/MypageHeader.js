import React, { Component } from 'react';
import styled from 'styled-components';

//img
import noimg from "source/noimg.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"
import iEdit from 'source/sharp_edit_black_48dp.png';
//CSS
const MypageHeaderElement = styled.div`
    position:relative;
    top:20px;
    height:336px;
    width:1920px;
    font-family: Noto Sans KR;
    
    background-color:#EFEFEF;
    .MynameBox{
        left:115px;
        font-size:20px;
        padding-top:15px;
        font-weight:Medium;
        color:#707070;
        
    }
    .Category{
        font-weight:100;
        font-size:20px;
        color:#FF0000;
        min-width:110px;
        padding-top:15px;
        padding-left:190px;
        text-align: left;        
    }
    .reviseInformation{
        font-size:17px;
        font-weight:100;
        font-color:#707070;
        padding-top:17px;
        padding-left:1174px;
        
    }
    
    .ImageBox{
        position:relative;
        top:89px;
        left:75px;
        width: 200px;
        height: 200px;
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

    
    
    
`;
const defaultMyInfo = {
    nick_name:"닉네임",
    categoryName:"분류",
    about_me:["",""],
}
const defaultCount = {
    total_like:1,
    total_group:1,
    total_design:1,
    total_view:1,
}
let about_me = ["",""];
let descriptionLengthCheck = "";

class MypageHeader extends Component{
    render(){
        const MypageInfo = this.props.MyDetail;

        const countInfo = MypageInfo.count || defaultCount;
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        if(MypageInfo.about_me != undefined){
            about_me[0] = MypageInfo.about_me.length < 199 ? MypageInfo.about_me : MypageInfo.about_me.slice(0, 199);
            descriptionLengthCheck = MypageInfo.about_me.length < 400 ? "" : " ...";
            about_me[1] = MypageInfo.about_me.length < 199 ? "" :  MypageInfo.about_me.slice(200, 399)+descriptionLengthCheck;
        }

        return(
            <>
                <MypageHeaderElement>
                    <div style={{display:'flex', justifyContent: "space-start", paddingTop:'32px', paddingLeft:'115px'}}>
                        <div className="MynameBox">{MypageInfo.nick_name}</div>
                        <div className="Category">{MypageInfo.categoryName}</div>{/*왼쪽정렬*/}
                        <div className="reviseInformation">정보 수정하기</div>
                        <div><img alt="icon" src={iEdit} style={{paddingLeft:"15px"}}/></div>
                    </div>
                    <div className="ImageBox" style={{backgroundImage: `url(${thumbnailInfo})`}}></div>
                    <div className="Descriptions" style={{display:'flex', justifyContent: "space-start", paddingTop:'12px', paddingLeft:"419px"}}>
                        <div className="inputBox" style={{position:'relative',width:"480px", height:"150px", fontSize:'20px', fontWeight:'100', lineHeight:'35PX'}}>
                            {about_me[0]}
                        </div>
                        <div className="inputBox" style={{position:'relative',width:"480px", height:"150px", left:"80px", fontSize:'20px', fontWeight:'100', lineHeight:'35PX'}}>
                            {about_me[1]}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-start", paddingTop:'35px', paddingLeft:'300px'}}>
                        <div className="view" style={{paddingLeft:"110px"}} ><IconView width="22px" height="11px"  fill="#000000" opacity="0.55"/></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>{countInfo.total_view}</div>
                        <div className="like" style={{paddingLeft:"22px"}}><img alt="icon" src={iThumbUp}  style={{ width: "13px", height: "13px", opacity:"0.55"}}/></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>{countInfo.total_like}</div>
                        <div className="child" style={{paddingLeft:"22px"}}><img alt="icon" src={iForked} style={{ width: "21px", height: "21px" , opacity:"0.55"}} /></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>{countInfo.total_group+countInfo.total_design}</div>
                    </div>



                </MypageHeaderElement>
            </>
        );

    };
}
export default MypageHeader;