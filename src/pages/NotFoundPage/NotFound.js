import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const NotFoundContainer = styled.div`
    width: 1920px;
    marginTop: 125px;
    marginBottom: 125px;
    textAlign: center;
    fontSize: 36px;
`;

class NotFound extends Component {
    render() {
        return (<React.Fragment>
            <NotFoundContainer >
            <Link to="/">gotoMain</Link>ERROR404: page not found
            </NotFoundContainer>
        </React.Fragment>)
    }
}

export default NotFound;