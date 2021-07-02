import React, { Component } from "react"
import FileIcon from "components/Commons/FileIcon"
import { FileWrap, } from "./FileController2.style"
import uuid from 'react-uuid'

export class FileController extends Component {
  constructor(props) {
    super(props)
    this.uid = uuid()
    this.state = { loading: false, file_type: null, file_name: null, extension: null }
  }

  componentDidMount() {
    this.setState({ ...this.props.item })
    if (this.props.item.content === "") {
      const file = document.getElementById(this.uid)
      file.click()
    }
  }

  readUploadedFileAsText = file => {
    const temporaryFileReader = new FileReader()

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort()
        reject(new DOMException("Problem parsing input file."))
      }

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result)
      }
      temporaryFileReader.readAsDataURL(file)
    })
  }

  onChangeValue = async e => {

    const file = document.getElementById(this.uid)
    let data = file.files

    if (data[0]) {
      let type = data[0].type && await data[0].type.split("/")[0]
      let extension = data[0].name && await data[0].name.split(".")
      extension = await extension[extension.length - 1]
      this.setState({ loading: true })
      const fileUrl = await this.readUploadedFileAsText(data[0]);

      let item = {
        //    content: ""
        //    index: 0
        //    initclick: true
        type: this.props.item.type || "FILE",
        order: this.props.item.order || 0,
        private: this.props.item.private || 0,

        fileUrl: fileUrl || "",
        is_image: type === "image",
        file_type: type || "",
        extension: extension || "",
        file_name: data[0].name || null
      }

      this.setState({ ...item })
      this.setState({ loading: false })
      this.props.getValue && this.props.getValue(item)
    }
  }

  render() {
    const { loading, fileUrl, is_image, file_name, extension, file_type } = this.state
    console.log("FILE-CONTROLLER:", this.state, this.props)

    return (<FileWrap>
      {file_name
        ? is_image
          ? <img src={fileUrl} alt="이미지" />
          : <div className="iconWrap">
            <FileIcon
              type={file_type}
              extension={extension}
            />
            <span className="LinkFileName">{file_name}</span>
          </div>
        : null}

      <input
        hidden={true}
        id={this.uid}
        type="file"
        name="source"
        onChange={this.onChangeValue}
      />
    </FileWrap>)
  }
}
