import React from 'react';
import styled from 'styled-components';
const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };

const SectionBox = styled.div`
display:flex;
margin-bottom:80px;
*{
    font-family:Noto Sans KR;
}
.payment_content_label{
    margin-right:80px;
    min-width: 150px;
    height:30px;
    border-right:10px solid #707070;
    margin-left: 15px;
    font-weight: bold;
    font-size: ${TxtSz.M}px;
}
.payment_contents_box{
    width:100%;
    display:flex;
    flex-direction:column;
   
    .inner_round_box{
        width:100%;
        display:flex;
        .inner_label{
            min-width:120px;
            font-size:12pt;
            font-weight:500;
            padding:10px;     
            margin-right:80px;                   
        }
        .inner_box{
            width:100%;
            .inner_line_box{
                padding:10px;
                width:100%;
                display:flex;
                .dropdown-style{
                    width:50px;
                }
            }
        }

    }
}
`

const LightGrayButton = styled.div`
    min-width:150px;
    width:30%;
    height:40px;
    padding:10px;
    border-radius:5px;
    font-weight:500;
    border:1px solid #dddddd
    background-color:#EFEFEF;
    text-align:center;
    margin-right:10px;

    cursor:pointer;

`
class PaySection extends React.Component{

    render(){
        return(
            <SectionBox>
            <div className="payment_content_label">결제</div>
                <div className="payment_contents_box ">
                        <div className="inner_round_box">
                            <div className="inner_label">결제종류</div>
                            <div className="inner_box">
                                <div className="inner_line_box">
                                    <LightGrayButton>신용카드</LightGrayButton>
                                    <LightGrayButton>실시간 계좌이체</LightGrayButton>
                                    <LightGrayButton>무통장 입금</LightGrayButton>
                                </div>
                            </div>
                        </div>
                </div>
             </SectionBox>
        );
    }
}
export default PaySection;