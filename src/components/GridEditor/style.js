import styled from 'styled-components';
import arrow from "source/arrow.svg";
import { Modal } from 'semantic-ui-react';
import market_style from "market_style";

export const ContentBorder = styled.div`
width:100%;
border:1px solid #EFEFEF;
margin-top:10px;
margin-bottom:10px;
`;
export const ContentBorder_mobile = styled.div`
width:100%;
border:1px solid #EFEFEF;
margin-top:5px;
margin-bottom:10px;
`;
export const CommentWrapper = styled.div`
.comment-title {
   margin-left: 45px;
}
.comment-body{
   margin-left: 52px;
   margin-top: 15px;
   color: #707070;
   font-size:${market_style.font.size.normal3};
   font-weight: 500;
   font-family: Noto Sans KR;
   line-height: 29px;
}
`;

export const CardDialog_mobile = styled(Modal)`
width:100%;
border-radius:10px !important;
padding:15px 10px;
.row{
    width:100%;
}
.flex{display:flex;}
.alignCenter{align-items:center;}
.justifyCenter{justify-content:center;}
.justifyBetween{justify-content:space-between;}
.marginTop1{margin-top:10px;}
.lock_{
    // min-width:25px;
    // min-height:25px;
    // max-width:25px;
    // max-height:25px;
    // border-radius:50%;
    // margin-right:10px;
    // background-color:#AFAFAF;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    font-size:${market_style.font.size.tiny1};

}
.title_{
    height:max-content;
    font-size:${market_style.font.size.small1};
    font-weight:600;
    color:black;
}
.hrline{
    border:1px solid #EFEFEF;
    margin-top:12px;
    margin-bottom:20px;
}
.label{
    min-width:78px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    color:#707070;
}

::-webkit-scrollbar {
    position: absolute;
    width: 3.9px;
}
::-webkit-scrollbar-thumb {
    background: rgba(112, 112, 112, 0.45) !important;
} 
.content{
    width:100%;
}
.modifyRgn{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .redBtn{
        cursor:pointer;
        color:red;
        font-size:${market_style.font.size.small1};
        text-decoration:underline;
        margin-right:20px;
    }
    .greyBtn{
        cursor:pointer;
        color:#707070;
        font-size:${market_style.font.size.small1};
        text-decoration:underline;
    }
}
.prevPane {
    width: 115px;
    height: 813.28px;
    position: absolute;
    left: 0%;
    margin-left: -195px;
    margin-top: 75.7px;
    border-radius: 0px 10px 10px 0px;
    background-color: #FFFFFF;
}
.prevArrow {
    width: 14px;
    height: 47px;
    position: absolute;
    left: 0%;
    margin-top: 409.81px;
    margin-left: -47px;
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-size: cover;
}
.nextPane {
    width: 115px;
    height: 813.28px;
    position: absolute;
    left: 100%;
    margin-left: 80px;
    margin-top: 75.7px;
    border-radius: 10px 0px 0px 10px;
    background-color: #FFFFFF;
}
.nextArrow {
    width: 14px;
    height: 47px;
    position: absolute;
    left: 100%;
    margin-top: 409.81px;
    margin-left: 33px;
    background-image: url(${arrow});
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    background-repeat: no-repeat;
    background-size: cover;
}
.close-box {
    width: max-content;
    cursor: pointer;
    position: relative;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px; 
}
.content-wrapper {
    position: relative;
    .card-header-first{
       width:100%; 
       display:flex;
       justify-content:space-between;
       align-items:center;
       .header-title{
            width:40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size:${market_style.font.size.small1};
            font-weight:500;
            color:black;
       }
       .header-update{
           display:flex;
           align-items:center;
           .update_{
            width:180px;
            font-size:${market_style.font.size.mini1};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
           }
           .close_{
               margin-left:10px;
               cursor:pointer;
           }
       }
    }
}
`
export const CardDialog = styled(Modal)`
width: 100% !important;
max-width: 1000px !important;
border-radius: 20px !important; 
padding: 30px 50px !important;
margin-bottom: 30px !important;
z-index: 100;

::-webkit-scrollbar {
    position: absolute;
    width: 3.9px;
}
::-webkit-scrollbar-thumb {
    background: rgba(112, 112, 112, 0.45) !important;
} 
.content{
    width:100%;
}
.modifyRgn{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .redBtn{
        cursor:pointer;
        color:red;
        font-size:${market_style.font.size.small1};
        text-decoration:underline;
        margin-right:20px;
    }
    .greyBtn{
        cursor:pointer;
        color:#707070;
        font-size:${market_style.font.size.small1};
        text-decoration:underline;
    }
}
.prevPane {
    width: 115px;
    height: 813.28px;
    position: absolute;
    left: 0%;
    margin-left: -195px;
    margin-top: 75.7px;
    border-radius: 0px 10px 10px 0px;
    background-color: #FFFFFF;
}
.prevArrow {
    width: 14px;
    height: 47px;
    position: absolute;
    left: 0%;
    margin-top: 409.81px;
    margin-left: -47px;
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-size: cover;
}
.nextPane {
    width: 115px;
    height: 813.28px;
    position: absolute;
    left: 100%;
    margin-left: 80px;
    margin-top: 75.7px;
    border-radius: 10px 0px 0px 10px;
    background-color: #FFFFFF;
}
.nextArrow {
    width: 14px;
    height: 47px;
    position: absolute;
    left: 100%;
    margin-top: 409.81px;
    margin-left: 33px;
    background-image: url(${arrow});
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    background-repeat: no-repeat;
    background-size: cover;
}
.close-box {
    width: max-content;
    cursor: pointer;
    position: relative;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px; 
}
.content-wrapper {
    position: relative;
    .card-header-first{
       width:100%; 
       display:flex;
       justify-content:space-between;
       align-items:center;
       .header-title{
            width:50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size:${market_style.font.size.normal1};
       }
       .header-update{
           display:flex;
           align-items:center;
           .update_{
               width:150px;
               font-size:${market_style.font.size.mini1};
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
           }
           .close_{
               margin-left:50px;
               cursor:pointer;
           }
       }
    }
}
`
export const EditCardHeaderContainer = styled.div`
.edit-header-container {
   width:100%;
   display: flex;
   justify-content:space-between;
   align-items:center;
   .edit-card-info {
       display:flex;
       width: max-content;
       font-size:${market_style.font.size.normal1};
       font-weight: 500;
       font-family: Noto Sans KR;
       text-align: left;
       color: #707070;
       .icon_style{
           width:20px;
           height:20px;
           border-radius:50%;
           background-color:white;
           display:flex;
           justify-content:center;
           align-items:center;
           margin-right:10px;
           padding-left:3px;
           cursor:pointer;
       }
       .borderRed{
           border:1px solid red;
       }
       .borderGrey{
           border:1px solid #707070;
       }
   }
   .close_{
    margin-left:50px;
    cursor:pointer;
    }
}
.hrline{
   width:100%;
   border:1px solid #efefef;
   margin-top:10px;
}
.marginTop{
   margin-top:30px;
}
.marginBottom{
   margin-bottom:30px;
}
.edit-header-thumbnail {
   display: flex;
   margin-top: 14px;

   .thumbnail-txt {
        width: 91px;
        font-size:${market_style.font.size.small1};
        font-weight: 500;
        font-family: Noto Sans KR;
        text-align: left;
        color: #707070;
   }

}
.edit-header-title {
   display: flex;
   margin-top:30px;
   display:flex;
   align-items:center;
   .title-txt {
       width: 91px;
       font-size:${market_style.font.size.small1};
       font-weight: 500;
       font-family: Noto Sans KR;
       text-align: left;
       color: #707070;
   }
   .title-input-container{
       margin-left: 31px;
       width: 500px;
       height: 56px;
       background-color: #EFEFEF;
       border-radius: 5px;
   }
   .title-input-style{
       border-radius: 10px;
       width: 600px;
       font-size:${market_style.font.size.small1};
       font-weight: 400;
       color: black;
       padding: 7px 15px;
       background-color:#E9E9E9;
       outline:none;
       border:none;
   }
}
.edit-header-description{
    display: flex;
    margin-top:30px;
    display:flex;
    align-items:center;
   .description-txt{
        width: 91px;
        font-size:${market_style.font.size.small1};
        font-weight: 500;
        font-family: Noto Sans KR;
        text-align: left;
        color: #707070;
   }
   .description-input-container{
       margin-left: 31px;
       width: 505px;
       height: 56px;
       background-color: #EFEFEF;
       border-radius: 5px;
   }
   .description-input-style{
        border-radius: 10px;
        width: 600px;
        font-size:${market_style.font.size.small1};
        font-weight: 400;
        color: black;
        padding: 7px 15px;
        background-color:#E9E9E9;
        outline:none;
        border:none;
   }
}
.edit-header-button-container {
   width: max-content;
   margin-left: auto;
   margin-right: 25px;
   .edit-header-submit-button {
       border: none;
       background: none;
       width: max-content;
       height: 40px;
       line-height: 40px;
       color: #FF0000;
       padding-bottom: 1.5px;
       border-bottom: 1.5px solid #FF0000;
       font-size:${market_style.font.size.normal3};
       font-weight: 500;
       font-family: Noto Sans KR;
       text-align: left;
       cursor: pointer;
   }
   .edit-header-cancel-button {
       margin-left: 10px;
       border: none;
       background: none;
       width: max-content;
       height: 40px;
       line-height: 40px;
       color: #707070;
       padding-bottom: 1.5px;
       border-bottom: 1.5px solid #707070;
       font-size:${market_style.font.size.normal3};
       font-weight: 500;
       font-family: Noto Sans KR;
       text-align: left;
       cursor: pointer;
   }
}
`
