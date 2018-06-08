import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import FileUploader from "components/Commons/FileUploader";

const CardImage = styled.div`
  margin-bottom: 2rem;
`

const DeleteImg = styled.div`
  width: 100%;
  &::after{
    display: block;
    clear: both;
    content: "";
  }
`

const DeleteImgItem = styled.div`
  width: 12.5%;
  padding: 10px;
  box-sizing: border-box;
  float: left;
  position: relative;
`

const ItemImg = styled.div`
  width: 100%;
  height: 100px;
  background-position: center;
  background-size: cover;
  background-clip: content-box;
`

const ItemText = styled.p`
  width: 100%;
  height: 36px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`

const DeleteBtn = styled.button`
  display: block;
  background-color: black;
  border: 2px solid white;
  position: absolute;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  top: 0;
  right: 0;
  i.icon{
    width: auto;
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
const ModalImg = styled.img`
  width: 100%;
`

const TitleWrap = styled.div`
  position: relative;
`

const EditBtn = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top:0;
  right: 0;
`

const NoneData = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  border-radius: 3px;
  background-color: #f7f7f7;
`

export class CardImageUpdate extends Component {
  state = {
    open: "INIT",
    deleteImages: [],
    designs: [],
    images: []
  }
  componentDidMount() {
    this.setState({ images: this.props.images })
  }
  onClose = () => {
    this.props.changeActive("INIT")
  }
  handleSubmit = (data) => {
    data.delete("design_file[]");
    if (this.state.designs !== []) {
      this.state.designs.map(item => {
        data.append("design_file[]", item, item.name);
      });
    }
    if (this.state.deleteImages !== []) {
      data.append("deleteImages", JSON.stringify(this.state.deleteImages));
    }
    console.log(data);
    this.props.request(data, this.props.token, this.props.uid).then(() => {
      this.props.changeActive("INIT");
      this.setState({ deleteImages: [], images: [] })
    });
  }

  onDelete = async (index) => {
    let NewArray = [...this.state.images];
    NewArray.splice(index, 1);
    this.setState({
      deleteImages: [...this.state.deleteImages, this.state.images[index]],
      images: NewArray
    });
    setTimeout(() => {
      console.log(this.state);
    }, 100);
  }

  onActive = () => {
    this.setState({ images: this.props.images });
    this.props.changeActive("Images");
  }

  onChangeDesing = (data) => {
    this.setState({ designs: data });
  }
  render() {
    let ViewImg = this.state.images ? this.state.images : this.props.images;
    return (
      <CardImage>
        {this.props.active === "Images"
          ? <div>
            <h3>이미지 수정/삭제</h3>
            <DeleteImg>
              {
                ViewImg && ViewImg.map((item, index) => {
                  return (
                    <DeleteImgItem>
                      <ItemImg style={{ backgroundImage: `url("${item.link}")` }} />
                      <ItemText>{item.name}</ItemText>
                      <DeleteBtn onClick={() => this.onDelete(index)}>
                        <Icon color="white" name="close" />
                      </DeleteBtn>
                    </DeleteImgItem>)
                })
              }
            </DeleteImg>
            <h3>이미지 추가</h3>
            <ValidateForm onSubmit={this.handleSubmit}>
              <FileUploader name="design_file" label="디자인 파일" placeholder="디자인 이미지를 등록해 주세요." validates={["onlyImages"]} onChange={this.onChangeDesing} />
              <Button type="submit">저장</Button>
              <Button type="button" onClick={this.onClose}>닫기</Button>
            </ValidateForm>
          </div>
          : <div>
            <TitleWrap>
              <h3>이미지</h3>
              <EditBtn onClick={this.onActive}><Icon name="edit"/>수정하기</EditBtn>
            </TitleWrap>
            {
              this.props.images && this.props.images.length > 0
              ? this.props.images.map(img => {
                return (<ModalImg key={`img${img.uid}`} src={img.link} alt={img.name} />)
              })
              : <NoneData>등록된 이미지가 없습니다.</NoneData>
            }
          </div>
        }
      </CardImage>
    );
  }
};
