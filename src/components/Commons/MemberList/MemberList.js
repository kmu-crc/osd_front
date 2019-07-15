import React, { Component } from 'react'
import styled from 'styled-components'

const MemberBox = styled.div`
    font-family: Noto Sans KR;
    width:424px;
    min-height:630px;
    max-height:630px;
    border: 1px solid red;
    position:relative;
    
    
   
    overscroll-behavior:contain;
    border-radius: 30px 30px 30px 30px;
    background-color:white;    
    .Members{
        margin-top:30px;
        overflow:hidden;
        max-height:570px;
        :hover{
            overflow-y:scroll;
        }
    }
    .GroupMaker{
        
        position:relative;
        width:345px;
        height:80px;
        border: 0px solid red;
        border-bottom: 1px solid #b8b8b8;
        left:37px;
        
    }
    .GroupMember{
        position:relative;
        width:345px;
        height:80px;
        left:37px;
    
    }
    
    
    .MemberImage{
        position:absolute;
        width:70px;
        height:70px;
        border-radius: 50%;
        background-color: #D6D6D6;
    }
    .MemberName{
        position:absolute;
        top:10px;
        left:89px;
        font-size:17px;
        color:#707070;
        font-weight: bold;
    }
    .Status{
        position:absolute;
        top:41px;
        left:92px;
        font-size:17px;
        color:#707070;
        font-weight: 100;
    }
    .Padding-bottom{
        position:relative;
        width:300px;
        height:35px;
        bottom:0px;
        background-color:white;
    }
    
`;

class MemberList extends Component{
    render(){
        const makerName = "진아진아진아";
        const memberName = "찬호찬호찬호";
        const status = "개설자";

        return(
            <MemberBox>
                <div className="Members">
                    <div className="GroupMaker">
                        <div className="MemberImage"></div>
                        <div className="MemberName">{makerName}</div>
                        <div className="Status">{status}</div>
                    </div>
                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>

                    <div className="GroupMember" style={{top:"20px"}}>
                        <div className="MemberImage"></div>
                        <div className="MemberName">{memberName}</div>
                        <div className="Status">{status}</div>
                    </div>
                </div>

            </MemberBox>


        )
    }

}
export default MemberList;