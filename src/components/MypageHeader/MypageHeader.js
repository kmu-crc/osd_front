import React, { Component } from 'react';
import styled from 'styled-components';

//img
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
        padding-top:15px;
        padding-left:190px;
        
    }
    .reviseInformation{
        font-size:17px;
        font-weight:100;
        font-color:#707070;
        padding-top:15px;
        padding-left:1180px;
        
    }
    
    .ImageBox{
        position:relative;
        top:90px;
        left:70px;
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

const textData = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et' +
    ' dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores'
class MypageHeader extends Component{
    state = {data : this.props.data};
    render(){
        const MypageHeaderData = this.state.data;
        return(
            <>
                <MypageHeaderElement>
                    <div style={{display:'flex', justifyContent: "space-start", paddingTop:'25px', paddingLeft:'115px'}}>
                        <div className="MynameBox">진아진아진아</div>
                        <div className="Category">패션패션패션</div>
                        <div className="reviseInformation">정보 수정하기</div>
                        <div><img alt="icon" src={iEdit} style={{paddingLeft:"15px"}}/></div>
                    </div>
                    <div className="ImageBox"></div>
                    <div className="Descriptions" style={{display:'flex', justifyContent: "space-start", paddingTop:'20px', paddingLeft:"415px"}}>
                        <div className="inputBox" style={{position:'relative',width:"480px", height:"150px", fontSize:'20px', fontWeight:'100', lineHeight:'35PX'}}>
                            {textData}
                        </div>
                        <div className="inputBox" style={{position:'relative',width:"480px", height:"150px", left:"80px", fontSize:'20px', fontWeight:'100', lineHeight:'35PX'}}>
                            {textData}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-start", paddingTop:'35px', paddingLeft:'300px'}}>
                        <div className="view" style={{paddingLeft:"110px"}} ><IconView width="22px" height="11px"  fill="#000000" opacity="0.55"/></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>1000</div>
                        <div className="like" style={{paddingLeft:"22px"}}><img alt="icon" src={iThumbUp}  style={{ width: "13px", height: "13px", opacity:"0.55"}}/></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>1000</div>
                        <div className="child" style={{paddingLeft:"22px"}}><img alt="icon" src={iForked} style={{ width: "21px", height: "21px" , opacity:"0.55"}} /></div>
                        <div style={{paddingLeft:"5px",fontSize:'15px', color:"#707070"}}>1000</div>
                    </div>



                </MypageHeaderElement>
            </>
        );

    };
}
export default MypageHeader;