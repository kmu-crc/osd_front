import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import { MultiUpload, DeleteItems } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
const CardImage = styled.div`
  margin-bottom: 2rem;
`;

const ModalImg = styled.img`
  width: 100%;
`;

const TitleWrap = styled.div`
  position: relative;
`;

const EditBtn = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top: 0;
  right: 0;
`;

const NoneData = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background-color: #f7f7f7;
`;

export class CardImageUpdate extends Component {
  state = {
    open: "INIT",
    images: [],
    loading: false,
    test: null
  };

  componentDidMount() {
    this.props.images && this.setState({ images: this.props.images });
  }

  async shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.status) !== JSON.stringify(nextProps.status)) {
      if (nextProps.status === "SUCCESS") {
        // this.setState({ deleteImages: [], images: [] });
        this.props.GetDesignDetailViewRequest(this.props.match.params.id);
      } else if (nextProps.status === "FAILUR") {
        await alert("업데이트에 실패하였습니다.","확인");
      }
    }
    return true;
  }

  onClose = () => {
    this.props.changeActive("INIT");
  };

  onActive = () => {
    this.props.images && this.setState({ images: this.props.images });
    this.props.changeActive("Images");
  };

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.setState({
      loading: true
    });

    let newData = { ...this.state };
    console.log(newData.deleteImages);
    newData.deleteImages.value = JSON.stringify(newData.deleteImages.value);
    ValidationGroup(newData, false).then(data => {
      //console.log("성공", data);
      this.props.request(data, this.props.token, this.props.uid)
        .then(res => {
          this.props.changeActive("INIT");
          this.setState({
            loading: false
          });
        });
    }).catch(e => {
      //console.log("실패", e);
    });
  };

  render() {
    let ViewImg = this.state.images ? this.state.images : this.props.images;
    return (
      <CardImage>
        {this.props.active === "Images" && this.props.isTeam > 0 ? (
          <div>
            <h3>컨텐츠 등록</h3>
            <DeleteItems ViewImg={ViewImg} name="deleteImages" placeholder="파일을 선택해주세요." getValue={this.onChangeValue} />
            <form onSubmit={this.onSubmit}>
              <MultiUpload name="design_file" placeholder="파일을 선택해주세요." getValue={this.onChangeValue} validates={["MaxFileSize(100000)"]} />
              <Button type="submit">저장</Button>
              <Button type="button" onClick={this.onClose}>닫기</Button>
            </form>
          </div>
        ) : (
            <div>
              <TitleWrap>
                <h3>컨텐츠 등록</h3>
                {this.props.isTeam > 0 && (<EditBtn onClick={this.onActive}><Icon name="edit" />수정하기</EditBtn>)}
              </TitleWrap>
              {this.props.images && this.props.images.length > 0 ? (
                this.props.images.map(img => { return (<ModalImg key={`img${img.uid}`} src={img.link} alt={img.name} />); })) : (
                  <NoneData>{/*등록된 이미지가 없습니다.*/}</NoneData>)}
            </div>
          )}
        {this.state.loading && <Loading />}
      </CardImage>
    );
  }
}
