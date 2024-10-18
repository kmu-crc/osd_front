import React from "react";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styled from "styled-components";

import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { RenderZoomProps } from "@react-pdf-viewer/zoom";
// const zoomPluginInstance = zoomPlugin();
// const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

const PDFwrapper = styled.div`
  width: 100%;
  &.fixed-height {
    height: 750px;
  }
  background-color: #efefef;
  border: 1px dashed #707070;
  overflow-y: hidden;
  @media only screen and (max-width: 480px) {
    &.fixed-height {
      height: 300px;
    }
  }
`;
const ZoomBox = styled.div`
  display: flex;
  width: 100%;
`;
export const PdfViewer = (props) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  //   const defaultLayoutPluginInstance = defaultLayoutPlugin({
  //     toolbarPlugin: {
  //         fullScreenPlugin: {
  //             // Zoom to fit the screen after entering and exiting the full screen mode
  //             onEnterFullScreen: (zoom) => {
  //                 zoom(SpecialZoomLevel.PageFit);
  //             },
  //             onExitFullScreen: (zoom) => {
  //                 zoom(SpecialZoomLevel.PageFit);
  //             },
  //         },
  //     },
  // });
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log(props);
  return (
    <PDFwrapper className={props.height ? "fixed-height" : ""}>
      <div className="ZoomBox">
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <ZoomOutButton />
          <ZoomPopover />
          <ZoomInButton />
        </div>
      </div>

      <Viewer
        fileUrl={props.pdf}
        defaultScale={SpecialZoomLevel.PageFit}
        plugins={[zoomPluginInstance]}
      />
    </PDFwrapper>
  );
};

// import React from 'react';
// import Loading from "components/Commons/Loading";
// export const PdfViewer = (props) => {
//   const [loading, setLoading] = React.useState(true);
//   // const path = props.pdf.search(".pdf") ? props.pdf : props.pdf + ".pdf"
//   return (<div>
//     {loading ? <Loading msg={`문제 파일을 준비중입니다.\n이 화면이 지속된다면 다시 시도하여 주세요.`} /> : null}
//     {/* {loading ?
//       <div className='spinner-container'>
//         <Spinner />
//       </div> : null}*/}
//     <iframe
//       style={{
//         frameBorder: "0",
//         width: "100%",
//         minHeight: "500px",
//         backgroundColor: "#EFEFEF",
//         border: "1px dashed #707070"
//       }}
//       src={
//         `https://docs.google.com/viewer?url=${props.pdf}&embedded=true`
//       }
//       onLoad={() => {
//         setTimeout(() => {
//           setLoading(false)
//         }, 500);
//       }}
//     />
//   </div>);
// }

// import React from 'react';
// // FOR PREVIEW PDF FILES
// import { pdfjs } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// const DivPDFVIEWER = styled.div`
//   width: max-content;
//   margin: auto;
// `;
// export const PdfViewer = (props) => {
//   const [numPages, setNumPages] = React.useState(null); //total
//   const [scale, setScale] = React.useState(1);
//   // const [pageNumber, setPageNumber] = React.useState(1); //current
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };
//   return (<DivPDFVIEWER>
//     <Document
//       options={{
//         cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//         cMapPacked: true,
//       }}
//       file={props.pdf}
//       onLoadSuccess={onDocumentLoadSuccess}>
//       <div style={{
//         // border: "1px solid red",
//         WebkitTouchCallout: "none",
//         WebkitUserSelect: "none",
//         MozUserSelect: "none",
//         msUserSelect: "none",
//         userSelect: "none",
//       }}>
//         <div style={{ overflow: "hidden", width: "500px" }} onClick={() => setScale(scale + 0.25)}>zoom</div>
//         {[...Array(numPages).keys()].map(page => {
//           return <div style={{ overflow: "scroll", width: "500px" }}>
//             <Page
//             scale={scale}
//             loading="페이지를 불러오고 있습니다."
//             pageNumber={page + 1} />
//           </div>
//         })}
//       </div>
//     </Document>
//   </DivPDFVIEWER>);
// }
// /*
// import React from 'react';
// import styled from "styled-components";
// // FOR PREVIEW PDF FILES
// import { pdfjs } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// const DivPDFVIEWER = styled.div`
//   width: max-content;
//   margin: auto;
// `;
// export const PdfViewer = (props) => {
//   const [numPages, setNumPages] = React.useState(null); //total
//   const [pageNumber, setPageNumber] = React.useState(1); //current
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };
//   const left = pageNumber > 1;
//   const right = pageNumber < numPages;
//   return (<DivPDFVIEWER>
//     <Document
//       options={{
//         cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//         cMapPacked: true,
//       }}
//       file={props.pdf}
//       onLoadSuccess={onDocumentLoadSuccess}>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <div
//           onClick={() => left ? setPageNumber(pageNumber - 1) : null}
//           style={{
//             display: "flex", flexDirection: "column", justifyContent: "center",
//             cursor: left ? "pointer" : "default", width: "20px",
//             backgroundColor: left ? "#EFEFEF" : "#FFFFFF"
//           }}>
//           <span style={{ margin: "auto", fontSize: "2.25rem" }}>
//             {left ? "<" : null}
//           </span>
//         </div>
//         <div style={{
//           // border: "1px solid red",
//           WebkitTouchCallout: "none",
//           WebkitUserSelect: "none",
//           MozUserSelect: "none",
//           msUserSelect: "none",
//           userSelect: "none",
//         }}>
//           <Page pageNumber={pageNumber} />
//         </div>
//         <div
//           onClick={() => right ? setPageNumber(pageNumber + 1) : null}
//           style={{
//             display: "flex", flexDirection: "column", justifyContent: "center",
//             cursor: right ? "pointer" : "default", width: "20px",
//             backgroundColor: right ? "#EFEFEF" : "#FFFFFF"
//           }}>
//           <span style={{ fontSize: "2.25rem" }}>
//             {right ? ">" : null}
//           </span>
//         </div>
//       </div>
//       <p style={{ width: "max-content", marginLeft: "auto", fontSize: "1.25rem" }}>
//         <span>{numPages}페이지 중 {pageNumber}페이지</span>
//       </p>
//     </Document>
//   </DivPDFVIEWER>);
// }
// */
