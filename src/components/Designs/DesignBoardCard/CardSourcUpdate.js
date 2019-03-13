import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import { MultiUpload } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const CardSource = styled.div`
  margin-bottom: 2rem;
  & a {
    margin-right: 10px;
  }
`;
const DeleteImg = styled.div`
  width: 100%;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const DeleteImgItem = styled.div`
  width: 12.5%;
  padding: 10px;
  box-sizing: border-box;
  float: left;
  position: relative;
`;

const ItemImg = styled.div`
  width: 100%;
  height: 100px;
  background-position: center;
  background-size: cover;
  background-clip: content-box;
`;

const ItemText = styled.p`
  width: 100%;
  height: 36px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

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
  i.icon {
    width: auto;
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
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

export class CardSourcUpdate extends Component {
  state = {
    open: "INIT",
    deleteSources: [],
    sources: [],
    sourcesLink: []
  };

  componentWillMount() {
    this.setState({ open: this.props.active });
  }

  onClose = () => {
    this.props.changeActive("INIT");
  };

  // handleSubmit = data => {
  //   data.delete("source_file[]");
  //   if (this.state.sources !== []) {
  //     this.state.sources.map(item => {
  //       data.append("source_file[]", item, item.name);
  //     });
  //   }
  //   if (this.state.deleteImages !== []) {
  //     data.append("deleteSources", JSON.stringify(this.state.deleteSources));
  //   }
  //   console.log(data);
  //   this.props.request(data, this.props.token, this.props.uid).then(() => {
  //     this.props.changeActive("INIT");
  //     this.setState({ deleteSources: [], sources: [] });
  //   });
  // };

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  onSubmit = async e => {
    e.preventDefault();
    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.request(data, this.props.token, this.props.uid)
      .then(res => {
        if (res.success) {
          this.props.changeActive("INIT");
          this.setState({ deleteSources: [], sources: [] });
        } else {
          alert("다시 시도해주세요");
        }
      });
    }).catch(e => {
      console.log("실패", e);
    });
  };

  onDelete = async index => {
    let NewArray = [...this.state.sourcesLink];
    NewArray.splice(index, 1);
    this.setState({
      deleteSources: [
        ...this.state.deleteSources,
        this.state.sourcesLink[index]
      ],
      sourcesLink: NewArray
    });
    setTimeout(() => {
      console.log(this.state);
    }, 100);
  };

  onActive = () => {
    this.setState({
      sourcesLink: this.props.sourcesLink
    });
    this.props.changeActive("Sources");
  };

  // onChangeSource = data => {
  //   this.setState({ sources: data });
  // };

  render() {
    return (
      <CardSource>
        {this.props.active === "Sources" && this.props.isTeam > 0 ? (
          <div>
            <h3>소스 수정/삭제</h3>
            <DeleteImg>
              {this.state.sourcesLink &&
                this.state.sourcesLink.map((item, index) => {
                  return (
                    <DeleteImgItem key={index}>
                      <a href={item.link}>{item.name}</a>
                      <DeleteBtn onClick={() => this.onDelete(index)}>
                        <Icon name="close" />
                      </DeleteBtn>
                    </DeleteImgItem>
                  );
                })}
            </DeleteImg>
            <h3>소스 추가</h3>
            <form onSubmit={this.onSubmit}>
              <MultiUpload
                name="source_file"
                placeholder="파일을 선택해주세요."
                getValue={this.onChangeValue}
                validates={["MaxFileSize(100000)"]}
              />
              <Button type="submit">저장</Button>
              <Button
                type="button"
                onClick={() => this.props.changeActive("INIT")}>
                닫기
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <TitleWrap>
              <h3>소스</h3>
              {this.props.isTeam > 0 && (
                <EditBtn onClick={this.onActive}>
                  <Icon name="edit" />수정하기
                </EditBtn>
              )}
            </TitleWrap>
            {this.props.sourcesLink && this.props.sourcesLink.length > 0 ? (
              this.props.sourcesLink.map(item => {
                return (
                  <a key={`img${item.uid}`} href={item.link}>
                    {item.name}
                  </a>
                );
              })
            ) : (
              <NoneData>{/*등록된 소스가 없습니다.*/}</NoneData>
            )}
          </div>
        )}
      </CardSource>
    );
  }
}
