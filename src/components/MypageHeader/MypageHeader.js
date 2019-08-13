import React, { Component } from 'react';
import styled from 'styled-components';

//CSS
const MypageHeaderElement = styled.div`
    position:relative;
    top:20px;
    height:336px;
    width:1920px;
    
    font-family: Noto Sans KR;
    background-color:#EFEFEF;
    .MynameBox{
        position:relative;
        top:40px;
        left:115px;
        font-size:20px;
        font-weight:Medium;
        color:#707070;
        
    }
    .Category{
        position:relative;
        
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


class MypageHeader extends Component{
    state = {data : this.props.data};
    render(){
        const MypageHeaderData = this.state.data;
        return(
            <>
                <MypageHeaderElement>
                    <div className="MynameBox">진아진아진아</div>
                    <div className="ImageBox"></div>
                </MypageHeaderElement>
            </>
        );

    };
}
export default MypageHeader;