import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import { TextController } from "components/Commons/InputItem";

import styled from "styled-components";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";
const WriteNormalArticleModal = styled(Modal)`
  width: ${props => props.isFullScreen && window.innerWidth || 1000}px;
  height: ${props => props.isFullScreen && window.innerHeight - 100 || 500}px;
  // min-width: 300px;
  // min-height: 200px;

  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-radius: 15px !important;
  padding: 20px 33px;
  
  .upper-box{
    width: 100%;
    height:max-content;
    display:flex;
    justify-content:space-between;
    margin-bottom:30px;
    .blank{width:20px;}
    .header{
      font-size:${market_style.font.size.normal1};
      font-weight:500;
      color:black;
    }
  }
  .title_label{
    font-size:${market_style.font.size.small1};
    font-weight:500;
    min-width:78px;
    height:max-content;
  }
  .editorBox{
    width:100%;
  }
  .form{
      width:100%;
      height:max-content;
      margin-bottom:15px;
      display:flex;
  }
  .align_item_center{
    align-items:center;
  }
  .form_height{
    height:max-content;
  }
  .redButtonBox{
    position: fixed;
    bottom: 10px;
    width: max-content;
    left: 35%;
  }
  .button{
    width:150px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    .btnText{
      font-size:${market_style.font.size.small1};
    }
  }
  .marginRight{margin-right:20px;}
  .red{
    background-color:red;
    color:white
  }
  .grey{
    background-color:white;
    border:1px solid #707070;
    color:#707070;
  }
  .contents{
      display:flex;
      justify-content:flex-end;
      padding-left:10px;
      padding-right:10px;
      .score{
      }
      .buttonBox{
          .button{
              width:100px;
              padding:10px;
              border-radius:20px;
              background-color:#707070;
              display:flex;
              justify-content:center;
              align-items:center;
              cursor:pointer;
              .text{
                  color:white;
              }
          }
      }
  }
`;
const TitleForm = styled.input`
  padding: 10px;
  resize: none;
  width: 100%;
  height: 30px;
  border:none;
  outline: none;
  border-radius: 10px;
  background-color:#e9e9e9;
`
const CommentForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`
class ArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || "", content: this.props.content || "",
      isFullScreen: false,
    }
  }

  render() {
    const { title, content, isFullScreen } = this.state
    const Mandatory = () => <span style={{ color: "red" }} title="필수사항입니다.">*</span>

    return (
      <React.Fragment>
        <WriteNormalArticleModal isFullScreen={isFullScreen} open={this.props.write} onClose={async (e) => {
          if (title != "" || content != "") {
            if (await confirm("내용이 저장되지 않습니다. 그래도 닫으시겠습니까?", "예", "아니오")) {
              e.preventDefault();
            } else {
              return;
            }
          }
          this.setState({ title: "", content: "" })
          this.props.handlerModal(false)
        }}>
          <div className="upper-box" >
            <div className="blank" />
            <div className="header">게시글 {this.props.isModify == true ? "수정" : "작성"} {isFullScreen ? "(Full)" : null}</div>
            <Cross onClick={() => { this.setState({ title: "", content: "" }); this.props.handlerModal(false) }} style={{ cursor: "pointer" }} angle={45} color={"#000000"} weight={1} width={20} height={20} />
          </div>
          <div className="form align_item_center">
            <div className="title_label">제목<Mandatory /></div>
            <TitleForm
              value={title || ""}
              onChange={async event => {
                await this.setState({ title: event.target.value })
              }}
              name="title"
            />
          </div>
          <div className="form form_height">
            <div className="title_label ">내용<Mandatory /></div>
            <div className="editorBox">
              <TextController
                fullScreen={(isFullScreen) => this.setState({ isFullScreen: isFullScreen })}
                id={1}
                item={{ content: content }}
                name={"content"}
                getValue={async (data) => { this.setState({ content: data }) }}
                height={200}
              />
            </div>
          </div>
          <div className="form redButtonBox">
            <div className="button red marginRight" onClick={async () => {
              if (title == "") {
                await alert("게시글의 제목을 입력해주세요.");
                return;
              } else if (content == "") {
                await alert("게시글의 내용을 입력해주세요");
                return;
              }
              this.props.isModify == true ?
                this.props.updateNoneRequest(title, content)
                :
                this.props.createNoneRequest(title, content)
            }} >

              <div className="btnText" >{this.props.isModify == true ? "수정" : "작성"}하기</div>
            </div>
            <div className="button grey" onClick={() => { this.setState({ title: "", content: "" }); this.props.handlerModal(false) }}>취소하기</div>
          </div>

        </WriteNormalArticleModal>
      </React.Fragment>
    );
  }
}
export default ArticleModal;