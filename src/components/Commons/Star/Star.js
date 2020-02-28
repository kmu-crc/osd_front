import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
    font-size: 15px;
    display: flex;
    flex-direction: row;
    font-size: ${props => props.sz || 15}px;
`;
const Star = (score, sz) => {
    var star = [];
    for (var i = 0; i < 5; i++) {
        if (parseInt(score, 10) > i) {
            star.push("★")
        }//<i key={i} className="icon star" />) }
        // else if (score >= i + 0.1) {
        // star.push("★")
        // }//<i key={i} className="icon star half" />) }
        else { star.push("☆") }//<i key={i} className="icon star outline" />) }
    }
    return (
        <Wrapper sz={sz}>{star}</Wrapper>
        // <Wrapper title={`5점 만점에 ${score}점`}>
        // <div >{star}</div>
        // {/* <div className="score">({score}/5)</div> */}
        // {/* </Wrapper> */}
    )
}
export default Star; 