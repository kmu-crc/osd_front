import React from 'react';
// import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import styled from 'styled-components';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // import { RenderZoomProps } from '@react-pdf-viewer/zoom';

// const PDFwrapper = styled.div`
//   width: 100%;
//   &.fixed-height {
//     height: 750px;
//   }
//   background-color: #EFEFEF;
//   border: 1px dashed #707070;
//   overflow-y: hidden;
// `;
// const ZoomBox = styled.div`
//   display:flex;
//   width:100%;
// `
export const PdfViewer = (props)=>{
  return(<div>out.of.service.</div>)
}
// export const PdfViewer = (props) => {
//   const zoomPluginInstance = zoomPlugin();
//   const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     toolbarPlugin: {
//       fullScreenPlugin: {
//         // Zoom to fit the screen after entering and exiting the full screen mode
//         onEnterFullScreen: (zoom) => {
//           zoom(SpecialZoomLevel.PageFit);
//         },
//         onExitFullScreen: (zoom) => {
//           zoom(SpecialZoomLevel.PageFit);
//         },
//       },
//     },
//   });
//   return (<PDFwrapper className={props.height ? "fixed-height" : ""}>
//     <div className="ZoomBox">
//       <div
//         style={{
//           alignItems: 'center',
//           backgroundColor: '#eeeeee',
//           borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           justifyContent: 'center',
//           padding: '4px',
//         }}
//       >
//         <ZoomOutButton />
//         <ZoomPopover />
//         <ZoomInButton />
//       </div>
//     </div>

//     <Viewer
//       fileUrl={props.pdf}
//       plugins={[
//         zoomPluginInstance,
//       ]}
//     />
//   </PDFwrapper>)
// }
