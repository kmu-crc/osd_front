import React, { Component } from "react";
import { FormFile } from "components/Commons/FormItems";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import FileIcon from "components/Commons/FileIcon";
import Button from "components/Commons/Button";

const FileWrap = styled.div`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  img {
    max-width: 100%;
    vertical-align: top;
  }
  .iconWrap {
    padding: 10px 20px;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .LinkFileName {
      line-height: 70px;
      font-size: 20px;
    }
  }
`;

const UploadBtn = styled(Button)`
  margin: 10px 0;
`;

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
    fileUrl: null,
    is_image: false,
    extension: "",
    type: ""
  };

  componentDidMount() {
    if (this.props.item) {
      this.setInit({ ...this.props.item });
    }
  }

  shouldComponentUpdate(nextProps) {
    let newProp = { ...this.props.item };
    delete newProp.target;
    let copyProps = { ...nextProps.item };
    delete copyProps.target;
    if (JSON.stringify(newProp) !== JSON.stringify(copyProps)) {
      console.log(this.props.item, "2");
      let obj = {
        fileUrl: null,
        is_image: false,
        extension: "",
        type: "",
        ...nextProps.item
      };
      if (!copyProps.uid) {
        obj.uid = null;
        obj.fileUrl = "";
      }
      this.setInit(obj);
      console.log("nextProps", nextProps);
      if (nextProps.item.initClick) this.state.target.click();
    }
    return true;
  }

  setInit = async item => {
    await this.setState({
      ...item
    });
    if (!item.content) return;
    if (item.data_type.split("/")[0] === "image") {
      await this.setState({
        file_type: item.data_type.split("/")[0],
        is_image: true
      });
    } else {
      await this.setState({
        file_type: item.data_type.split("/")[0],
        is_image: false
      });
    }
  };

  readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  onChangeValue = async data => {
    if (data.value[0]) {
      let type = null;
      if (data.value[0].type) type = await data.value[0].type.split("/")[0];
      let extension = await data.value[0].name.split(".");
      extension = await extension[extension.length - 1];

      console.log(data.value[0].type, type, extension, data.value[0], "33");
      const fileUrl = await this.readUploadedFileAsText(data.value[0]);
      if (type === "image") {
        await this.setState({
          fileUrl: fileUrl,
          is_image: true,
          file_type: type,
          extension: extension,
          file_name: data.value[0].name
        });
      } else {
        await this.setState({
          fileUrl: fileUrl,
          is_image: false,
          file_type: type,
          extension: extension,
          file_name: data.value[0].name
        });
      }
    } else {
      await this.setState({
        fileUrl: "",
        is_image: false,
        file_type: "",
        extension: "",
        file_name: null
      });
    }
    await this.setState({ ...data });
    if (data.value.length > 0) {
      console.log("return", this.state);
      this.returnData();
    }
  };

  onClickFile = () => {
    this.state.target.click();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const contentImg = this.props.item.content
      ? this.props.item.content
      : this.props.item.fileUrl;
    console.log(contentImg);
    return (
      <FileWrap>
        {(this.props.item.content || this.props.item.fileUrl) &&
        this.state.is_image ? (
          <img src={contentImg} alt="이미지" />
        ) : (this.props.item.content || this.props.item.extension) &&
        !this.state.is_image ? (
          <div className="iconWrap">
            <FileIcon
              type={this.props.item.file_type}
              extension={this.props.item.extension}
            />
            <span className="LinkFileName">{this.props.item.file_name}</span>
          </div>
        ) : (
          !this.props.item.content && (
            <UploadBtn
              onClick={this.onClickFile}
              type="button"
              size="small"
              color="Primary"
              icon="upload"
              round={true}
            >
              업로드
            </UploadBtn>
          )
        )}
        <File>
          <FormFile name="source" getValue={this.onChangeValue} />
        </File>
      </FileWrap>
    );
  }
}

export default FileController;
