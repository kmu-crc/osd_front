import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import styled from "styled-components"

const TextWrapper = styled.p`
    color: #707070;
    font-size: 24px;
    font-weight: 500;
    font-family: Noto Sans KR;
`;

function Loading(props) {
    return (<React.Fragment>
        <Dimmer active>
            <Loader size="huge" active >
                <TextWrapper>{props.msg || "데이터를 가져오고 있습니다."}</TextWrapper>
            </Loader>
        </Dimmer>
    </React.Fragment>)
}
export default Loading