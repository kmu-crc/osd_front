import React, { Component } from 'react';
import styled from "styled-components";
import { FormFile } from "../FormItem/FormItem";
import { Icon } from "semantic-ui-react";
const UploaderButton = styled.label`
  display: block;
  width: 100%;
  border: 2px dashed #292A2B;
  border-radius: 3px;
  padding: 20px;
`

const ImagesItem = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background-color: #4d5256;
  color: #f8fafb;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
`
const DeleteBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  font-size: 12px;
  color: white;
  margin-left: 5px;
`
const FilesWrap = styled.div`
  margin-top: 1rem;
`

class FileUploader extends Component {
  state = {
    files: [],
    target: null,
    display: true
  }
  addImages = (target) => {
    if (!target.files[0]) {
      return;
    }
    this.setState({ files: [...this.state.files, target.files[0]], target });
    this.returnData();
  }
  deleteImages = (index) => {
    let newArray = [...this.state.files];
    newArray.splice(index, 1);
    this.setState({
      files: newArray
    });
    this.returnData();
    if (newArray.length === 0) { this.setState({ display: false }) };
    setTimeout(() => {
      this.setState({ display: true });
    }, 100);
  }
  returnData = () => {
    setTimeout(() => {
      if (this.props.onChange) this.props.onChange(this.state.files);
    }, 100);
  }
  render() {
    const { name, placeholder, validates, id } = this.props;
    return (
      <div>
        {
          this.state.display
            ? <FormFile id={id} type="file" style={{ display: "none" }} placeholder={placeholder} name={`${name}[]`} onChange={this.addImages} validates={validates} />
            : null
        }
        <FilesWrap>
          {this.state.files.map((data, index) => {
            console.log(data);
            return (<ImagesItem key={index}>
              {data.name}
              <span>
                <DeleteBtn type="button" onClick={() => this.deleteImages(index)}>
                  <Icon name="remove" />
                </DeleteBtn>
              </span>
            </ImagesItem>)
          })}
        </FilesWrap>
      </div>
    );
  }
}
export default FileUploader;
