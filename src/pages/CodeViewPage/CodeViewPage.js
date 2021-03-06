import React from 'react';
import CodeViewContainer from "containers/CodeViewContainer";
export default class CodeViewPage extends React.Component {
    render() {
        console.log(this.props);
        return (<React.Fragment>
            <CodeViewContainer />
        </React.Fragment>)
    }
}