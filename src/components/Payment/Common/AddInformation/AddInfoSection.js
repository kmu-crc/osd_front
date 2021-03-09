import React from 'react';
import styled from 'styled-components';
const SectionBox = styled.div`
*{
    font-family:Noto Sans KR;
    color:#707070;
}
.payment_content_label{
    width:100%;
    font-size:${market_style.font.size.small2};
    font-weight:1000;
    padding:10px;
}
.payment_content_box{
    *{
    }
    border:1px solid black;
    width:100%;
    border:1px solid #EFEFEF;
    padding:15px;
    padding-left:20px;
    display:flex;
    justify-content:center;
    flex-direction:column;
   
    .inner_round_box{
        width:100%;
        display:flex;
        .inner_label{
            min-width:120px;
            font-size:${market_style.font.size.mini1};
            font-weight:500;
            padding:10px;                        
        }
        .inner_box{
            width:100%;
            .inner_line_box{
                padding:10px;
                width:100%;
                display:flex;

            }
        }

    }
}
`

const FormTextarea = styled.input.attrs({type:"textarea"})`
    height:100px;
    font-size:${market_style.font.size.tiny3};
    color:#707070;
    outline:none;
    border:1px solid #dddddd;
    border-radius:5px;
    padding:10px;
    margin-right:10px;
`
const GrayButton = styled.div`
    width:100px;
    height:40px;
    padding:10px;
    border-radius:5px;
    font-weight:500;
    background-color:#707070;
    color:white;
    text-align:center;
    cursor:pointer;
`
class AddInfoSection extends React.Component{

    render(){
        return(
            <SectionBox>
                        <div className="payment_content_label">추가 정보 입력</div>
                            <div className="payment_content_box ">
                                    <div className="inner_round_box">
                                        <div className="inner_label">추가정보</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                            <FormTextarea style={{width:"50%"}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inner_round_box">
                                        <div className="inner_label">파일</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                            <GrayButton style={{color:"white"}}>파일등록</GrayButton>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                </SectionBox>
        );
    }
}
export default AddInfoSection;

