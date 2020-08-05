import React, { Component } from 'react';
import styled from "styled-components";
import ClientTemplate from "templates/ClientTemplate";

const NotFoundContainer = styled.div`
    margin: auto;
    margin-top: 125px;
    margin-bottom: 125px;
    text-align: center;
    .message{
        font-size: 4rem;
        line-height: 4.5rem;
    }
    .main-link {
        margin-top: 50px;
        font-size: 2.5rem;
    }
    .recommendation {
        margin-top: 50px;
    }
`;

class NotFound extends Component {
    render() {
        return (<ClientTemplate>
            <NotFoundContainer >
                <div className="message">
                    페이지를 찾을 수 없습니다.
                </div>
                <div className="main-link">
                    <Link to="/">메인페이지</Link>로 이동합니다.
                </div>
                <div className="recommendation">
                    <h3>이 디자인은 어떠세요?</h3>
                </div>
            </NotFoundContainer>
        </ClientTemplate>)
    }
}

export default NotFound;