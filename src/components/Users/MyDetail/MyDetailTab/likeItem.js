import React, { Component } from "react";
import styled from "styled-components"
import noimg from "source/noimg.png";


const MainBox = styled.div`
*{
    font-family:Noto Sans KR;
}
.font_small{font-size:15px;}
.font_big{font-size:20px;}
.font_lignt{font-weight:200;}
.font_bold{font-weight:500;}
.margin_top{margin-top:24px;}
.ver_center{
    display:flex;
    align-items:center;
}
.hor_center{
    display:flex;
    justify-content:center;
}

width:100%;
    .headerBox{
        width:100%;
        height:29px;
        display:flex;
        .checkboxCol{
            width:33px;
            height:100%;
        }
        .deleteCol{
            width:165px;
            height:100%;
        }
        .titleCol{
            width:600px;
            padding-left:126px;
        }
        .subCol{
            width:170px;
        }

    }
    .rowBox{
        width:100%;
        height:93px;
        display:flex;
        margin-top:60px;
        .checkboxCol{
            width:25px;
            height:100%;
        }
        .imageBox{
            width:170px;
            height:100%;
            display:flex;
            justify-content:flex-end;
        }
        .infoBox{
            width:600px;
            height:100%;
            padding-left:50px;
        }
        .subCol{
            width:170px;
            height:100%;
        }
    }
`

const ResultBox= styled.div`
    width:100%;
    height:230px;
    border-top:3px solid #E9E9E9;
    margin-top:65px;
`

const Thumbnail = styled.div`
    width:${props=>props.width==null?100:props.width}px;
    height:${props=>props.height==null?100:props.height}px;
    background-image:url(${props=>props.URL==null?noimg:props.URL});
    background-size:contain;
    background-position:center center;
    margin-top:${props=>props.marginTop==null?0:props.marginTop}px;
    margin-left:${props=>props.marginLeft==null?0:props.marginLeft}px;
`
const CheckBox = styled.input.attrs({type:"checkbox"})`
    width:25px;
    height:25px;
    background-image:${props=>props.URL};

`

export class LikeItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <MainBox>
                    <div className="headerBox">
                        <div className="checkboxCol ver_center "><CheckBox/></div>
                        <div className="deleteCol ver_center">
                            <span className="font_small font_light">전체 삭제</span>&nbsp;&nbsp;
                            <span className="font_small font_light">선택 삭제</span>    
                        </div>
                        <div className="titleCol ver_center">
                            <div className="font_big font_bold">상품 정보</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_big font_bold">수량</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_big font_bold">금액</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_big font_bold">배송비</div>
                        </div>
                    </div>

                    <div className="rowBox">
                        <div className="checkboxCol"><CheckBox/></div>
                        <div className="imageBox">
                            <Thumbnail URL={noimg} width={112} height={93}/>
                        </div>
                        <div className="infoBox">
                            <div className="font_big font_bold">Lorem Ipsum</div>
                            <div className="font_big font_light margin_top">[옵션]옵션옵션옵션옵션</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                    </div>

                    <div className="rowBox">
                        <div className="checkboxCol"><CheckBox/></div>
                        <div className="imageBox">
                            <Thumbnail URL={noimg} width={112} height={93}/>
                        </div>
                        <div className="infoBox">
                            <div className="font_big font_bold">Lorem Ipsum</div>
                            <div className="font_big font_light margin_top">[옵션]옵션옵션옵션옵션</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                    </div>

                    <div className="rowBox">
                        <div className="checkboxCol"><CheckBox/></div>
                        <div className="imageBox">
                            <Thumbnail URL={noimg} width={112} height={93}/>
                        </div>
                        <div className="infoBox">
                            <div className="font_big font_bold">Lorem Ipsum</div>
                            <div className="font_big font_light margin_top">[옵션]옵션옵션옵션옵션</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                        <div className="subCol ver_center hor_center">
                            <div className="font_small font_bold">1,800</div>
                        </div>
                    </div>
                    <ResultBox>

                    </ResultBox>
                </MainBox>
            </React.Fragment>
        );
    }
};