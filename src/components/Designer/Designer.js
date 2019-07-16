import React, { Component } from "react";
import styled from "styled-components";
//D6D6D6
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
        top:20px;
        left:462px;
        font-size:20px;
        position:absolute;
        color:#FF0000;
        font-weight: 300;
        
    }
    .counts{
        top:95px;
        left:357px;
        font-size:15px;
        color:#707070;
        position:absolute;
        font-weight: 100;
    }
    & img {
      width: 100%;
      height: 100%;
    }
`;



class Designer extends Component{
    render(){
        // const designer = this.props.data;
        const designCount = 5, groupdesignCount = 4;//임시로 지정한 값.
        return(
            <>
                <DesignerComp>
                    <div className="ImageBox"></div>
                    <div className="TextBox">
                        <div className="userName">진아진아진아</div>
                        <div className="description">Lorem ipsum dolor sit amet </div>
                        <div className="cate">패션</div>
                        <div className="counts">디자인:&nbsp;{designCount}개 &nbsp; &nbsp; 그룹: {groupdesignCount}개</div>
                    </div>

                </DesignerComp>

            </>

        )
    }

}
export default Designer