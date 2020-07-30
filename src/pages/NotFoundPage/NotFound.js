import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import ClientTemplate from "templates/ClientTemplate";

const NotFoundContainer = styled.div`
    width: 1920px;
    marginTop: 125px;
    marginBottom: 125px;
    textAlign: center;
    fontSize: 36px;
`;

class NotFound extends Component {
    render() {
        return (<ClientTemplate>
            <NotFoundContainer >
                <Link to="/">gotoMain</Link>ERROR404: page not found
            </NotFoundContainer>
        </ClientTemplate>)
    }
}

export default NotFound;