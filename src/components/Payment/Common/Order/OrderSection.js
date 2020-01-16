import React from 'react';
import styled from 'styled-components';
import noimg from "source/noimg.png";

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

const SmallImage=styled.div`
    min-width:100px;
    height:100px;
    border:1px solid #dddddd;
    margin-right:10px;
    background-image:url(${props=>props.imageURL});
    background-repeat:no-repeat;
    background-position:center center;
    background-size:contain;
`
class OrderSection extends React.Component{

    render(){
        return(
            <SectionBox>
            <div className="payment_content_label">주문 상품 정보</div>
                <div className="payment_contents_box">
                        <div className="inner_round_box">
                            <div className="inner_label">상품</div>
                            <div className="inner_box">
                                <div className="inner_line_box">
                                    <SmallImage imageURL={this.props.product_img}/>
                                    {this.props.product_title}<br/>
                                    {this.props.product_option=="undefined"?"":this.props.product_option}<br/>
                                    {this.props.product_amount}
                                </div>
                            </div>
                        </div>
                </div>
             </SectionBox>
        );
    }
}export default OrderSection;