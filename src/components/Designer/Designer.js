import React, { Component } from "react";
import styled from "styled-components";
import jina from "source/jina.png"

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
    
`;

const user_info = {
    userName : "",
    designerDescription : "",
    categoryName : "",
    designCount:0,
    groupCount:0,
    thumbnail:"",
};
//`url(${info.thumbnail}), url(${jina})`

class Designer extends Component{
    state = {data:user_info};

    render(){
        const designer = this.state.data;
        return(
            <>
                <DesignerComp>
                    <div className="ImageBox" style={{backgroundImage:`url(${designer.thumbnail}), url(${jina})`}}></div>
                    <div className="TextBox">
                        <div className="userName">{designer.userName}</div>
                        <div className="description">{designer.designerDescription} </div>
                        <div className="cate">{designer.categoryName}</div>
                        <div className="counts">디자인:&nbsp;{designer.designCount}개 &nbsp; &nbsp; 그룹: {designer.groupCount}개</div>
                    </div>

                </DesignerComp>

            </>

        )
    }

}
export default Designer