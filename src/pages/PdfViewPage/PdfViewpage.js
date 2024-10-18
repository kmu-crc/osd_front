import React from 'react';
import PdfViewContainer from "containers/PdfViewContainer";
export default class PdfViewPage extends React.Component {
    render() {
        return (<PdfViewContainer pdf={this.props.match.params.uri} />)
    }
}