import React, { Component } from "react";
import { FormFile } from "components/Commons/FormItems";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import FileIcon from "components/Commons/FileIcon";
import Button from "components/Commons/Button";
import { FormControl } from "modules/FormControl";

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
    type: "",
    value: [],
    target: null,
    validates: ["MaxFileSize(99999999)"]
  };

  async componentDidMount() {
    console.log("componentDidMount");
    if (this.props.item) {
      await this.setInit({ ...this.props.item });
      if (this.props.item.initClick) {
        console.log("1");
        this.state.target.click();
      }
    }
  }

  async shouldComponentUpdate(nextProps) {
    let newProp = { ...this.props.item };
    delete newProp.target;
    let copyProps = { ...nextProps.item };
    delete copyProps.target;
    if (JSON.stringify(newProp) !== JSON.stringify(copyProps)) {
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
      await this.setInit(obj);
    } else if (
      nextProps.item.fileUrl == null || nextProps.item.content === ""
    ) {
      if (this.state.target) {
        setTimeout(() => {
          if (nextProps.item.initClick) {
            console.log("2", nextProps.item);
            this.state.target.click();
          }
        }, 100);
      }
    }
    return true;
  }

  setInit = async item => {
    console.log("item2", item);
    await this.setState({
      ...item,
      target: this.input
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

  onChangeValue = async (e) => {
    console.log("onChangeValue", this.input.files)
    const event = { ...e }
    let files = this.input.files
    let data = []
    if (files[0]) {
      for (var i = 0; i < files.length; i++) {
        const type = files[i].type && await files[i].type.split("/")[0]
        const extension = await files[i].name.split(".").pop()
        const fileUrl = await this.readUploadedFileAsText(files[i])
        const file = await {
          content: "", extension: extension,
          fileUrl: fileUrl, file_name: files[i].name, file_type: type,
          is_image: type === "image", order: null, type: "FILE", uid: null,
          validates: ["MaxFileSize(99999999)"], value: event.currentTarget.files, target: event.currentTarget
        }
        await FormControl(file).then(() => {
          // console.log(data.length,"???",data)
          data.push(file)
          // console.log(data.length,"!!!!!", data)
        }).catch(err => { alert(err.message) })
      }
      await this.setState({ data: data})
      // console.log("WILL SEND DATA", this.state)
      this.returnData()
    }
  }

  onClickFile = () => {
    this.state.target.click();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const contentImg = this.props.item.content
      ? this.props.item.content : this.props.item.fileUrl;
    return (
      <FileWrap>
        {(this.props.item.content || this.props.item.fileUrl) &&
          this.state.is_image ? (
            <img src={contentImg} alt="이미지" />
          ) : (this.props.item.content || this.props.item.extension) &&
            !this.state.is_image ? (
              <div className="iconWrap">
                <FileIcon type={this.props.item.file_type} extension={this.props.item.extension} />
                <span className="LinkFileName">{this.props.item.file_name}</span>
              </div>
            ) : null}
        <File>
          <input multiple type="file" name="source" onChange={this.onChangeValue} ref={ref => (this.input = ref)} style={{ display: "none" }} />
          <span></span>
        </File>
      </FileWrap>
    );
  }
}

export default FileController;
