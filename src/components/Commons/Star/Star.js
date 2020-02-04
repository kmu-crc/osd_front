import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
    font-size: 15px;
    display: flex;
    flex-direction: row;
    .rate {
        font-size: 10px;
    }
`;
const Star = (rate) => {
    var star = [];
    for (var i = 0; i < 5; i++) {
        if (parseInt(rate, 10) > i) {
            star.push("★")
        }//<i key={i} className="icon star" />) }
        // else if (rate >= i + 0.1) {
        // star.push("★")
        // }//<i key={i} className="icon star half" />) }
        else { star.push("☆") }//<i key={i} className="icon star outline" />) }
    }
    return (
        <Wrapper>{star}</Wrapper>
        // <Wrapper title={`5점 만점에 ${rate}점`}>
        // <div >{star}</div>
        // {/* <div className="rate">({rate}/5)</div> */}
        // {/* </Wrapper> */}
    )
}
export default Star; 