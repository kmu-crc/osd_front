import styled from "styled-components";
import market_style from "market_style";

export const FileWrap = styled.div`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  img {
    max-width: 100%;
    vertical-align: top;
  }
  .iconWrap {
    padding: 10px 20px;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .LinkFileName {
      line-height: 70px;
      font-size: ${market_style.font.size.normal3};
    }
  }
`

export const File = styled.div`
  width: 1px;
  height: 1px;
  margin: -1px;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  outline: 0;
  border: 0;
  input {
    // display: none;
  }
`
