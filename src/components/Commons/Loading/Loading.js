import React from 'react'
import {Loader} from 'semantic-ui-react'

function Loading() {
    return (<Loader size="huge" active >
        <p style={{ fontSize: "24px", color: "#707070", fontWeight: "500", fontFamily: "Noto Sans KR" }}>
            데이터를 가져오고 있습니다.</p>
    </Loader>)
}
export default Loading