import React from 'react';

import { DxfViewer as _DxfViewer } from "dxf-viewer";
import * as three from "three";

export default class DxfViewer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.dxfviewer = null;
      this.canvasContainer = React.createRef();
  }
  async componentDidMount() {
      if (this.canvasContainer) {
          this.dxfviewer = await new _DxfViewer(this.canvasContainer, { clearColor: new three.Color("#fff"), autoResize: true, colorCorrection: true });
      }
      if (this.props.url) {
          this.Load(this.props.url);
      }
  }
  Load = async url => {
      try {
          await this.dxfviewer.Load({
              url: url,
              font: null,
              progressCbk: null,
              workerFactory: _DxfViewer.SetupWorker()
          });
      } catch (e) { console.error(e); } finally { };
  }

  render() {

      return (<React.Fragment>
          {/* <a href={this.props.url}>{"다운로드"}</a> */}
          <div className="canvasContainer" ref={(ref) => this.canvasContainer = ref} style={{ width: "750px", height: "500px", border: "1px solid gray" }}>
          </div>

      </React.Fragment>);
  };
};
