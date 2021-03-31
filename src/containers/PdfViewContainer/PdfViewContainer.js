import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { PdfViewer } from "components/Designs/CardSourceDetail/PDFviewer";
import { Decrypt } from "components/Commons/EncryptDecrypt";


class PdfViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { h: window.innerHeight }
    }
    componentDidMount() {
        window.addEventListener('resize', () => { this.setState({ h: window.innerHeight }) }, false)
    }
    render() {
        const { h } = this.state;
        const { pdf } = this.props;
        const decoded = Decrypt(pdf.replaceAll("~", "/"), "opendesign");

        return (
            pdf
                ? <div style={{ height: `${h}px`, overflow: "auto", padding: "10px" }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <PdfViewer pdf={decoded} height={false} />
                    </Worker>
                </div>
                : <div> pdf 파일을 읽지 못하였습니다. 다시 시도해주세요.</div>
        );
    }
}

export default PdfViewContainer
