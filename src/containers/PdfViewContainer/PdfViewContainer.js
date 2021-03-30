import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { PdfViewer } from "components/Designs/CardSourceDetail/PDFviewer";
import styled from "styled-components";

// const DIV = styled.div` *{border: 1px solid red;} `;

class PdfViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pdf: "", h: window.innerHeight }
    }
    componentDidMount() {
        window.addEventListener('resize', () => { this.setState({ h: window.innerHeight }) }, false)
        const pdf = localStorage.getItem('pdf');
        this.setState({ pdf: pdf });
    }
    componentWillUnmount() {
        localStorage.removeItem('pdf');
    }
    render() {
        const { pdf, h } = this.state;//1440 933
        console.log(window.screen.height, window.innerHeight)
        return (
            // <DIV>{
            pdf
                ? <div style={{ height: `${h}px`, overflow: "auto", padding: "10px" }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <PdfViewer pdf={pdf} height={false} />
                    </Worker>
                </div>
                : <div> pdf 파일을 읽지 못하였습니다. 다시 시도해주세요.</div>
            // }</DIV>
        );
    }
}

export default PdfViewContainer
