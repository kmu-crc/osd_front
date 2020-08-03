import React, { Component } from 'react';
import styled from "styled-components";

const NotFoundContainer = styled.div`
  margin-top: 125px;
  margin-bottom: 125px;
  text-align: center;
  font-weight: 900;
  div {
      cursor: default;
      margin-top: 30px;
  }
  .link {
      color: #707070;
  }
`;

class NotFound extends Component {
    render() {
        return (<NotFoundContainer >
            <div>
                ERROR 404<br />
                페이지를 찾을 수 없습니다.
            </div>
            <div className="link" onClick={() => window.location.href = "/"}>
                <b>메인</b>으로 이동
            </div>
            <div  className="link" onClick={() => window.history.back()}>
                뒤로 이동
            </div>
        </NotFoundContainer>)
    }
}

export default NotFound;