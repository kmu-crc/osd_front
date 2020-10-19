import React, { Component } from "react";
import styled from 'styled-components';
import { Dropdown } from "semantic-ui-react"
import noimg from "source/noimg.png";
import { RedButton, GrayButton } from "components/Commons/CustomButton";
import { alert } from "components/Commons/Alert/Alert";
// import { Link } from "react-router-dom";
// import { Icon } from "semantic-ui-react";
// import { InputTag } from "components/Commons/InputItem/InputTag";
// import { confirm } from "components/Commons/Confirm/Confirm";
const MainBox = styled.div`
  width:100%;
  padding:30px;
  .titleBox{
    display:flex;
    justify-content:space-between;
  }
  .pointer{
    cursor:pointer;
  }
  .title{
    width:max-content;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
    .contentBox{
      width:100%;
      display:flex;
      justify-content:center;
      padding-top:36px;
    }

`;

const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:562px;
  height:540px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:42px;
  padding-top:54px;
  margin-right:63px;
  .label{
    width:100%;
    height:29px;
  }
  .thumbnail{
    cursor:pointer;
    width:256px;
    height:256px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#E9E9E9;
    border-radius:50%;
    margin-left:110px;
  }
`;
const Thumbnail = styled.div`
  cursor:pointer;
  width:256px;
  height:256px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  border-radius:50%;
  margin-left:110px;
`;
const FormBox = styled.div`
  *{

    font-size:20px;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-top:49px;

  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:50px;
  }
  .wrapper_noflex{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .margin_bottom{
    margin-bottom:30px;
  }
  .flex{
    display:flex;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    font-family:Noto Sans KR;
    font-weight:500;
    min-width:157px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }

`;
const InputText =  styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    background-color: #EFEFEF;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;

const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`;
const TagList = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
`;
class ModifyGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItemList: [],
      title: null, thumbnail: null, thumbnail_name: null, explain: "",isModify:false,
    }
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onClickClose = this.onClickClose.bind(this);

  }

  componentDidMount() {
    // if (this.props.keep) {
    //   this.setState(this.props.keep.designer);
    //   this.setState({ getready: true });
    // }
  }
  componentWillUpdate(nextProps) {
    if (this.props.galleryDetail && (
      this.props.galleryDetail.title !== nextProps.galleryDetail.title ||
      this.props.galleryDetail.explain !== nextProps.galleryDetail.explain ||
      this.props.galleryDetail.thumbnail !== nextProps.galleryDetail.thumbnail ||
      this.props.galleryDetail.itemList !== nextProps.galleryDetail.itemList
    )) {


      this.setState({
        title: nextProps.galleryDetail.title,
        explain: nextProps.galleryDetail.description,
        thumbnail: nextProps.galleryDetail.thumbnail,
      })
      if (nextProps.dataList.length > 0) {
        let number = 0;
        let arr = [];
        nextProps.dataList.map((data, index) => {
          nextProps.galleryDetail.itemList.map((item, index) => {
            if (item.value === data.uid) {
              arr.push({ value: item.value, number });
            }
            return item;
          })
          number++;
          return data;
        })
        this.setState({ selectItemList: arr });
      }

    }
    // if(nextProps.galleryDetail&&(this.props.dataList!==nextProps.dataList)){

    //   let number=1;
    //   let arr = [];
    //   nextProps.dataList.map((data,index)=>{
    //     nextProps.galleryDetail.itemList.map((item,index)=>{
    //       if(item.value == data.uid){
    //         arr.push({value:item.value,number});
    //       }
    //     })
    //     number++;
    //   })
    //   this.setState({selectItemList:arr});
    // }
  }
  checkModify=()=>{
    if (this.props.galleryDetail.title == this.state.title||
      this.props.galleryDetail.description == this.state.explain||
      this.props.galleryDetail.thumbnail == this.state.thumbnail
    ) {
      this.setState({isModify:true});
    }
    else if(this.props.galleryDetail.itemList.length==this.state.selectItemList.length){
      this.props.galleryDetail.itemList.map((item,index)=>{
        if(this.state.selectItemList[index].value!=item.value){
          this.setState({isModify:true});
        }
      })
    }
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value });
    this.checkModify();
  }
  onChangeTitle(event) {
    this.setState({ title: event.target.value });
    this.checkModify();
  }
  async handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      await reader.readAsDataURL(file);
    }
    this.checkModify();
  }
  onClickClose(event) {
    this.props.handleShowModal(false);
  }
  onDelete = async e => {
    this.props.DeleteGroupRequest(this.props.id, this.props.token)
      .then(async res => {
        const result = res.type;
        if (result === "DETELE_GROUP_SUCCESS") {
          console.log(this.props.id);
          this.props.GetHaveInGalleryRequest(this.props.userInfo.uid, 0);
        } else {
          await alert("다시 시도해주세요");
        }
      })
      .catch(async e => {
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });

  }
  onSubmit = async e => {

    e.preventDefault();
    if (this.props.galleryDetail.title == this.state.title&&
      this.props.galleryDetail.description == this.state.explain&&
      this.props.galleryDetail.thumbnail == this.state.thumbnail
    ) {
      if(this.props.galleryDetail.itemList.length==this.state.selectItemList.length){
        let isModify=false;
        this.props.galleryDetail.itemList.map((item,index)=>{
          console.log(item);
          if(this.state.selectItemList[index].value!=item.value){
            isModify=true;
          }
        })
          if(isModify==false){
            await alert("수정된 내용이 없습니다.")
            return;
          }

      
      }
        
     
    }

    const data = {
      files: [],
      user_id: this.props.userInfo.uid,
      title:this.state.title,
      description: this.state.explain,
      itemList:this.state.selectItemList,
    }
    let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
    await data.files.push(file);
    // console.log(data);

    if (this.state.thumbnail != null || this.state.thumbnail !== "") {
      await data.files.push(file);
    }

    if (data.files.length <= 0 || data.files[0].value === this.props.galleryDetail.thumbnail) {
      delete data.files;
    }
    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
      .then(async res => {
        // console.log("res", res.res);
        const result = res.type;
        // console.log(res);
        if (result === "UPDATE_GROUP_SUCCESS") {
          console.log(this.props.id);
          this.props.GetHaveInGalleryRequest(this.props.userInfo.uid, 0);
          // alert("정보가 수정되었습니다.");
          this.props.handleShowModal(false);
          console.log(this.props.handlerIsGalleryModify)
          this.props.handlerIsGalleryModify();
        } else {
          await alert("다시 시도해주세요!");
        }
      })
      .catch(async e => {
        // console.log("실패", e);
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
  };

  onSelectItem(event, { value }) {
    // console.log({value});
    this.setState({ selectItemList: this.state.selectItemList.concat({ value: this.props.dataList[{ value }.value].uid, number: { value }.value }) });
    // this.setState({selectItemList:this.state.selectItemList.concat({value:{value}.value,text:{value}.text})});
    this.checkModify();
  }
  onDeleteTag = async (event) => {
    const deleteIdx = event.target.id;
    const length = this.state.selectItemList.length;
    let list = [];
    list = list.concat(this.state.selectItemList);
    this.setState({
      selectItemList: list.slice(0, deleteIdx).concat(this.state.selectItemList.slice(parseInt(deleteIdx, 10) + 1, length))
    });
    this.checkModify();
  }
  render() {
    console.log(this.props);
    let count = 0;
    // console.log(this.props.dataList);
    const itemList = this.props.dataList.length < 0 ? { value: 0, text: "없음" } : this.props.dataList.map((item, index) => {
      return ({ value: count++, text: item.title, key: item.uid });
    })
    // console.log(itemList);

    const TagBox = this.props.dataList.length > 0 && this.state.selectItemList.map((item, index) => {
      // console.log(item.number);
      return (
        <TagPiece key={index}>
          {this.props.dataList[item.number].title}
          <div id={index} onClick={this.onDeleteTag} className="close">x</div>
        </TagPiece>
      );
    })

    return (
      <React.Fragment>
        {this.props.keep ? "redirected" : null}

        <MainBox>
          <div className="titleBox">
            <div className="title">갤러리 수정</div>
            <div className="title pointer" onClick={this.onClickClose}>x</div>
          </div>
          <div className="contentBox">
            <ThumbnailBox>
              <div className="label">썸네일 등록</div>
              <Margin height={70} />
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
              <label htmlFor="file">
                {this.state.thumbnail == null ?
                  <div className="thumbnail"><div>첨부</div></div>
                  :
                  <Thumbnail imageURL={this.state.thumbnail} />
                }
              </label>
            </ThumbnailBox>


            {/* <div className="contentsBox"> */}
            <FormBox>
              <div className="wrapper flex">
                <div className="label">이름</div>
                <InputText type="text" onChange={this.onChangeTitle} value={this.state.title||''} placeholder="이름을 입력해주세요" width={483} height={99} />
              </div>
              <div className="wrapper flex">
                <div className="label">설명</div>
                <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={483} height={330} />
              </div>
              <div className="wrapper flex">
                <div className="label">아이템</div>
                <DropBox onChange={this.onSelectItem} id="itemDropBox" selection options={itemList} />
                <TagList>
                  {TagBox}
                </TagList>
              </div>
            </FormBox>
          </div>
          <div className="contentBox">
            <RedButton  text={"수정된 내용을 저장합니다."} value={"저장하기"} disabled={!this.state.isModify} okText="확인" cancelText="취소" onClick={this.onSubmit} isConfirm={false} />
            <GrayButton text={"수정된 내용이 저장되지 않습니다."} value={"취소하기"} okText="확인" cancelText="취소"  onClick={this.onClickClose} isConfirm={true} />
            <GrayButton text={"갤러리를 삭제합니다."} value={"삭제하기"} okText="확인" cancelText="취소"  onClick={this.onDelete} isConfirm={true} />
          </div>
        </MainBox>
      </React.Fragment>
    );
  };
}
export default ModifyGroup;