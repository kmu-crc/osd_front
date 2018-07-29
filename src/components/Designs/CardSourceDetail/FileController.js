import React, { Component } from "react";
import { FormFile } from "components/Commons/FormItems";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import FileIcon from "components/Commons/FileIcon";

const File = styled.div`
  width: 1px;
  height: 1px;
  margin: -1px;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  outline: 0;
  border: 0;
`;

class FileController extends Component {
  state = {
    imageUrl: null,
    is_image: false,
    extension: "",
    type: "",
    fileType: {
      image: [
        { type: "image/gif", name: "gif" },
        { type: "image/x-icon", name: "ico" },
        { type: "image/jpeg", name: "jpg" },
        { type: "image/svg+xml", name: "svg" },
        { type: "image/tiff", name: "tiff" },
        { type: "image/webp", name: "webp" }
      ],
      text: [
        { type: "text/css", name: "css" },
        { type: "text/csv", name: "csv" },
        { type: "text/html", name: "html" },
        { type: "text/calendar", name: "ics" }
      ],
      audio: [
        { type: "audio/midi", name: "midi" },
        { type: "audio/ogg", name: "oga" },
        { type: "audio/x-wav", name: "wav" },
        { type: "audio/webm", name: "weba" },
        { type: "audio/3gpp", name: "3gp" },
        { type: "audio/3gpp2", name: "3g2" }
      ],
      video: [
        { type: "video/x-msvideo", name: "avi" },
        { type: "video/mpeg", name: "mpeg" },
        { type: "video/ogg", name: "ogv" },
        { type: "video/webm", name: "webm" },
        { type: "video/3gpp", name: "3gp" },
        { type: "video/3gpp2", name: "3g2" }
      ],
      application: [
        { type: "application/x-abiword", name: "abw" },
        { type: "application/octet-stream", name: "arc" },
        { type: "application/vnd.amazon.ebook", name: "azw" },
        { type: "application/octet-stream", name: "bin" },
        { type: "application/x-bzip", name: "bz" },
        { type: "application/x-bzip2", name: "bz2" },
        { type: "application/x-csh", name: "csh" },
        { type: "application/msword", name: "doc" },
        { type: "application/epub+zip", name: "epub" },
        { type: "application/java-archive", name: "jar" },
        { type: "application/js", name: "js" },
        { type: "application/json", name: "json" },
        { type: "application/vnd.apple.installer+xml", name: "mpkg" },
        {
          type: "application/vnd.oasis.opendocument.presentation",
          name: "odp"
        },
        { type: "application/vnd.oasis.opendocument.spreadsheet", name: "ods" },
        { type: "application/vnd.oasis.opendocument.text", name: "odt" },
        { type: "application/ogg", name: "ogx" },
        { type: "application/pdf", name: "pdf" },
        { type: "application/vnd.ms-powerpoint", name: "ppt" },
        { type: "application/x-rar-compressed", name: "rar" },
        { type: "application/rtf", name: "rtf" },
        { type: "application/x-sh", name: "sh" },
        { type: "application/x-shockwave-flash", name: "swf" },
        { type: "application/x-tar", name: "tar" },
        { type: "application/x-font-ttf", name: "ttf" },
        { type: "application/vnd.visio", name: "vsd" },
        { type: "application/x-font-woff", name: "woff" },
        { type: "application/xhtml+xml", name: "xhtml" },
        { type: "application/vnd.ms-excel", name: "xls" },
        { type: "application/xml", name: "xml" },
        { type: "application/vnd.mozilla.xul+xml", name: "xul" },
        { type: "application/zip", name: "zip" },
        { type: "application/x-7z-compressed", name: "7z" }
      ]
    }
  };

  async componentDidMount() {
    if (this.props.item) {
      console.log(this.props.item, "1", this.props.item.data_type.split("/")[0]);
      this.setInit({...this.props.item});
    }
  }

  async shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item)) {
      console.log(this.props.item, "2");
      this.setInit({...nextProps.item});
    }
    return true;
  }

  setInit = async (item) => {
    await this.setState({
      ...item,
      value: item.content
    });
    if (item.data_type.split("/")[0] === "image") {
      await this.setState({ file_type: item.data_type.split("/")[0], is_image: true });
    } else {
      await this.setState({ file_type: item.data_type.split("/")[0], is_image: false });
    }
  }

  onChangeValue = async data => {
    console.log("first", data)
    if (this.props.item) {
      await this.setState({ target: data.target });
    } else {
      if (data.value[0]) {
        let type = null;
        if (data.value[0].type) type = data.value[0].type.split("/")[0];
        let extension = data.value[0].name.split(".");
        extension = extension[extension.length - 1];

        console.log(data.value[0].type, type, extension, data.value[0], "33");
        if (type === "image") {
          let reader = new FileReader();
          reader.onloadend = async () => {
            await this.setState({
              imageUrl: reader.result,
              is_image: true,
              file_type: type,
              extension: extension
            });
          };
          reader.readAsDataURL(data.value[0]);
        } else {
          await this.setState({
            imageUrl: "",
            is_image: false,
            file_type: type,
            extension: extension
          });
        }
      } else {
        await this.setState({
          imageUrl: "",
          is_image: false,
          file_type: "",
          extension: ""
        });
      }
      await this.setState({ ...data });
      if (this.props.initClick) data.target.click();
      if(data.value.length > 0){
        this.returnData();
      } else{
        // if (this.props.setController && !this.state.imageUrl) this.props.setController("INIT");
      }
    }
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const contentImg = this.props.item
      ? this.props.item.content
      : this.state.imageUrl;
    return (
      <div>
        {this.props.item && this.state.is_image ? (
          <img src={contentImg} alt="이미지" />
        ) : this.props.item && !this.state.is_image ? (
          <FileIcon type={this.state.file_type} extension={this.state.extension} />
        ) : null}
        <File>
          <FormFile name="source" getValue={this.onChangeValue} />
        </File>
      </div>
    );
  }
}

export default FileController;
