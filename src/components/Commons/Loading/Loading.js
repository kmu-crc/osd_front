import React from 'react'
import { Loader } from 'semantic-ui-react'
import styled from "styled-components"

const TextWrapper = styled.p`
    color: #707070;
    font-size: 24px;
    font-weight: 500;
    font-family: Noto Sans KR;
`;

function Loading() {
    return (<Loader size="huge" active >
        <TextWrapper>데이터를 가져오고 있습니다.</TextWrapper>
    </Loader>)
}
export default Loading