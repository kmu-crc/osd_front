import React from 'react'
const style = {
  width: "100%",
  minHeight: "300px",
  height: "650px",
  border: "1px solid #707070",
  solid: "#0000CC",
}
export const PdfViewer = ({ pdf, id }) => {
  return (<React.Fragment>
    {/* {pdf} */}
    <iframe
      // src={`${window.location.origin}/web/viewer.html?file=${pdf}`}
      src={`/web/viewer.html?file=${pdf}`}
      style={style}
    ></iframe>
  </React.Fragment>)
}