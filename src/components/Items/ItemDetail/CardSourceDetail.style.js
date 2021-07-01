import styled from "styled-components";
import market_style from "market_style";

export const CardSrcWrap = styled.div`
  background-color: #fff;
  margin: auto;
  & form {
    margin: 20px 0;
  }
  & .ui.loader {
    top: auto;
    bottom: 70vh;
  }
`;
export const ViewContent = styled.div`
  position: relative;
  .imgContent{
    img{
      max-width: 100%;
    }
    text-align: center;
    margin-bottom: 2rem;
  }
  .LinkFileName {
    line-height: 70px;
    font-size:${market_style.font.size.normal3};
  }
  .iconWrap {
    display: block;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    margin-bottom: 2rem;
  }
  .textWrap{
    height:max-content;
    margin-bottom: 2rem;
    word-break:break-all;
  }
  & .goEdit {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover .goEdit {
    display: block;
  }
`;
export const Nodata = styled.div`
  text-align: center;
`;
export const ButtonContainer = styled.div`
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  .content-edit-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-edit-button {
    width: max-content;
    padding: 7px;
    padding-bottom: 1px;
    border: none;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size:${market_style.font.size.normal3};
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
  .content-add-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-add-button {
    width: max-content;
    border: none;
    padding: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size:${market_style.font.size.normal3};
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
`;
export const EditorBottonWrapper = styled.div`
    width: max-content;
    margin: auto;
    margin-top: 10px;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 25px;
    z-index: 907;
    .submit {
      margin-left: 5px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #FF0000;
      font-size:${market_style.font.size.normal3};
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
    .cancel {
      margin-left: 10px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #707070;
      font-size:${market_style.font.size.normal3};
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
`;
export const EditorBottonWrapper_mobile = styled.div`
    width: 100%;
    z-index: 907;
    .button{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      font-weight:500;
      color:white;
      padding:7px;
      border-radius:10px;
      font-weight:500;
      margin-top:10px;
      border:none;
      outline:none;
      box-shadow: 2px 2px 3px #00000019;
    }
    .red{background-color:red;}
    .grey{background-color:#707070;}
`;
export const PrivateContentWrapper = styled.div`
  width:100%;
  padding: 25px 10px;
  margin-right:50px;
  margin-bottom:20px;
  margin-top:20px;
  border-radius: 15px;
  line-height: 35px;
  text-align: center;
  font-size:${market_style.font.size.giant2};
  color: #707070;
  background-color: #EFEFEF;
`;