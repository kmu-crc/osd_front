import React, { Component } from "react";
import styled from "styled-components";
import FileIcon from "components/Commons/FileIcon";
import { FormControl } from "modules/FormControl";
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import alignment_middle from "source/alignment_middle.png";
import alignment_right from "source/alignment_right.png";
import alignment_left from "source/alignment_left.png";

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
  :hover {
    .OptionPanel {
      display: block;
    }
  }
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
  input {
    display: none;
  }
`;

const MediaOptionWrapper = styled.div`
  display: none;
  position: absolute;
  top: 25px; 
  right: 5%;
  border: 1px solid rgba( 255, 255, 255, 0.66);
  background-color: rgba( 255, 255, 255, 0.34);
  padding: 5px;
  border-radius: 10px;
  z-index: 1000;

  .fixed {
    position: fixed;
  }
  .selected {
    border: 1px solid red;
  }
  ul {
    list-style: none;
    padding: 1px 3px;
    display: flex;
    flex-direction: row;
    width: max-content;
  }
  li {
    margin-left: 2px;
    padding: 1px;
    font-size: 11px;
    :hover {
      background-color: rgba(100,100,100, 0.5);
    }
    img {
      width: 25px;
      height: 25px;
      :hover {
        background-color: rgba(100,100,100, 0.5);
      }
    }
  }
`;

class FileController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: null,
      is_image: false,
      extension: "",
      type: "",
      value: [],
      target: null,
      validates: ["MaxFileSize(199999999)"], // validates: ["MaxFileSize(99,999,999)"]
      // 199999999 =  199999999 / 1024 = 195312.5 k / 1024 = 191.0 m / 1024
      option: "center,origin", // "align,scale" ; align="left"|"right"|"center", scale="fit"|"origin"
    };
  }

  async componentDidMount() {
    //console.log("componentDidMount");
    if (this.props.item) {
      await this.setInit({ ...this.props.item });
      if (this.props.item.initClick) {
        //console.log("1");
        this.state.target.click();
      }
    }
  }

  async shouldComponentUpdate(nextProps) {
    // alert("gotchanged");
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
        // obj.fileUrl = "";
      }
      await this.setInit(obj);
    } else if (
      nextProps.item.fileUrl == null ||
      nextProps.item.content === ""
    ) {
      if (this.state.target) {
        setTimeout(() => {
          if (nextProps.item.initClick) {
            //console.log("2", nextProps.item);
            this.state.target.click();
          }
        }, 100);
      }
    }
    return true;
  }

  setInit = async item => {
    await this.setState({
      ...item,
      target: this.input
    });
    if (!item.content) return;
    if (item.option == null) {
      await this.setState({ option: "center,scale" });
    }
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
    //console.log("onChangeValue", this.input.files);
    const event = { ...e };
    let data = this.input.files;
    if (data[0]) {
      let type = null;
      if (data[0].type) type = await data[0].type.split("/")[0];
      console.log(data[0]);
      let extension = await data[0].name.split(".");
      extension = await extension[extension.length - 1];

      await this.setState({ file: this.input.files });
      if (
        data[0].type.search("jpeg") > -1
        || data[0].type.search("jpg") > -1
        || data[0].type.search("gif") > -1
        || data[0].type.search("png") > -1
        || data[0].type.search("bmp") > -1
      ) {
        const fileUrl = await this.readUploadedFileAsText(data[0]);
        await this.setState({
          fileUrl: fileUrl,
          is_image: true,
          file_type: type,
          extension: extension,
          file_name: data[0].name
        });
      }
      else {
        await this.setState({
          // fileUrl: fileUrl,
          is_image: false,
          file_type: type,
          extension: extension,
          file_name: data[0].name
        });
      }
    }
    else {
      await this.setState({
        fileUrl: "",
        is_image: false,
        file_type: "",
        extension: "",
        file_name: null
      });
    }
    await this.setState({ ...data });
    if (data.length > 0) {
      const target = event.currentTarget;
      await this.setState({ value: target.files, target });
      FormControl(this.state)
        .then(data => {
          this.returnData();
        })
        .catch(err => {
          //console.log("formFile", err);
          alert(err.message);
        });
    }
  };

  onClickFile = () => {
    this.state.target.click();
  };

  returnData = async e => {
    if (this.props.getValue) {
      console.log("DEBUG::", this.state, this.props.item);
      await this.props.getValue(this.state);
    }
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  handleClickedScaleOption = async scale => {
    if (scale === "scale") {
      await this.setState({ option: "center,scale" });
    } else {
      await this.setState({ option: `${this.state.option.split(",")[0]},${scale}` });
    }
    this.returnData(null);
  };
  handleClickedAlignOption = async align => {
    await this.setState({ option: `${align},${this.state.option.split(",")[1]}` });
    this.returnData(null);
  };

  render() {
    // console.log("FileController:", this.props.item);
    // console.log("THIS-STATE", this.state.option);

    const { item } = this.props;
    const { is_image } = this.state;

    const contentImg = item.fileUrl || item.content;

    const MediaOpts = ({ onClickedAlign, onClickedScale, align, scale, extended }) =>
      <MediaOptionWrapper className="OptionPanel fixed">
        <ul>
          <label>정렬</label>
          <li onClick={() => onClickedAlign("left")} className={`${align === "left" ? "selected" : ""}`}>
            <img src={alignment_left} title="왼쪽" />
          </li>
          <li onClick={() => onClickedAlign("center")} className={`${align === "center" ? "selected" : ""}`}>
            <img src={alignment_middle} title="가운데" />
          </li>
          <li onClick={() => onClickedAlign("right")} className={`${align === "right" ? "selected" : ""}`}>
            <img src={alignment_right} title="오른쪽" />
          </li>
        </ul>
        {extended
          ? <ul>
            <label>크기</label>
            <li onClick={() => onClickedScale("origin")} className={`${scale === "origin" ? "selected" : ""}`}> 원본크기 </li>
            <li onClick={() => onClickedScale("scale")} className={`${scale === "scale" ? "selected" : ""}`}> 폭에맞춤 </li>
          </ul>
          : null}
      </MediaOptionWrapper>

    const { option } = this.state;
    return (<FileWrap >

      {/* <br />
      is_image: {(is_image || item.is_image) ? "yes" : "no"}<br />
      contentImg: {contentImg != "" ? "yes" : "no"}<br />
      <br /> */}

      {/* image */}
      {(contentImg != "" && is_image)
        ? <div style={{ position: "relative" }}>
          <MediaOpts
            align={((option && option.split(",")[0]) || "center")}
            scale={((option && option.split(",")[1]) || "")}
            onClickedScale={this.handleClickedScaleOption}
            onClickedAlign={this.handleClickedAlignOption}
            extended />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: `${(option && option.split(",")[0]) || "center"}` }}>
            {(option && option.split(",")[1] === "scale")
              ? <img style={{ width: "100%", objectFit: "contain" }} src={contentImg} alt="이미지" />
              : <img style={{ objectFit: "contain" }} src={contentImg} alt="이미지" />
            }
          </div>
        </div>
        : null}

      {/* video */}
      {(item.content && item.data_type === "video")
        ? <div style={{ position: "relative" }}>
          <MediaOpts
            align={((option && option.split(",")[0]) || "center")}
            scale={((option && option.split(",")[1]) || "")}
            onClickedScale={this.handleClickedScaleOption}
            onClickedAlign={this.handleClickedAlignOption}
          // extended 
          />

          {/* <span className="LinkFileName">{item.file_name}</span> */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: `${(option && option.split(",")[0]) || "center"}` }}>
            <video
              key={item.content}
              className="iconWrap"
              width={`${window.innerWidth > 480 ? "975" : window.innerWidth - 55}`}
              height={`${window.innerWidth > 480 ? "600" : (window.innerWidth - 55) * .55}`}
              controls="controls">
              <source src={item.content} type="video/mp4" download={item.file_name}></source>
            </video>
          </div>
        </div>
        : null}

      {/* file */}
      {(
        ((item.content && item.content.length > 0) || (item.file && item.file.length > 0))
        &&
        (item.data_type !== "video" && item.data_type !== "image")
      )
        ? <div className="iconWrap">
          <FileIcon
            type={item.file_type}
            extension={item.extension}
          />
          <span className="LinkFileName">{item.file_name}</span>
        </div>
        : null}

      {/* {<form action="" enctype="multipart/form-data" method="post">
          <input type="file" name="file-to-upload" />
          <input type="submit" value="Upload" />
        </form>} */}

      {/* 
        <FilePond
          // name="file-to-upload"
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={false}
          maxFiles={3}
          server="https://https.opensrcdesign.com/upload/tmp/11"
          // oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            console.log(fileItems);
            // this.setState({
            // files: fileItems.map(fileItem => fileItem.file)
            // });
          }}
        /> */}

      <File>
        <input
          type="file"
          name="source"
          onChange={this.onChangeValue}
          ref={ref => (this.input = ref)}
          accept={this.props.accept == null ? null : this.props.accept}
        />
        <span></span>
      </File>
    </FileWrap>
    );
  }
}

export default FileController;
