import React, { Component } from "react";
import styled from 'styled-components';
import { Dropdown } from "semantic-ui-react"
import noimg from "source/noimg.png";
import { RedButton, GrayButton } from "components/Commons/CustomButton";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";
const Wrapper= styled.div`
  .row{width:100%;display:flex;}
  .row2{width:100%;}
  .marginTop1{margin-top:10px;}
  .marginTop2{margin-top:20px;}
  .label1{
    min-width:156px;
    font-size:${market_style.font.size.small1};
  }
  .alignCenter{align-items:center;}
  .justifyCenter{justify-content:center;}
  .label2{
    min-width:78px;
    font-size:${market_style.font.size.small1};
  }
  .thumbnail{
    min-width:179px;
    min-height:160px;
    background-color:#efefef;
    background-image:url(${props=>props.image==null?null:props.image});
    background-size:cover;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .redButton_{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    border-radius:10px;
    margin-right:15px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    background-color:#FF3838;
    margin-bottom:5px;
  }
  .greyButton{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    border-radius:10px;
    background-color:#707070;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    margin-bottom:5px;

  }
  
`
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    max-width:200px;
    height:31px;
    
    background-color: #EFEFEF;
    margin-top:5px;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .label{
      width:100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
        cursor:pointer;
    }
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small1};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const DropBox = styled(Dropdown)`
    min-width:120px !important;
    max-height:31px !important;   
    display:flex !important;
    align-items:center !important; 
    background-color:#E9E9E9 !important;
    margin-right:10px;
    font-size:${market_style.font.size.mini2};
    border-radius:10px !important;
    position:relative !important;
`;
const TagList = styled.div`
    width: 100%;
    height:max-content;
    display: flex;
    flex-wrap: wrap;
`;
class ModifyGroup_mobile extends Component {
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
        this.setState({selectItemList:nextProps.galleryDetail.itemList})
      }

    }
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
          this.props.handlerIsGalleryModify();
          this.props.handleShowModal(false);
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
    const itemList = this.props.dataList.length<0?[]:this.props.dataList.filter(item=>{
      return(
          !this.state.selectItemList.map(tag=>tag.uid).includes(item.uid)
        )
      }
    )
    console.log(itemList,itemList.filter(item=>[{value}.value].includes(item.uid)),{value}.value);
    this.setState({selectItemList:this.state.selectItemList.concat(itemList.filter(item=>[{value}.value].includes(item.uid)))});
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
    const itemList = this.props.dataList.length<0?[]:this.props.dataList.filter(item=>{
      if(this.state.selectItemList.length>0)
        return !this.state.selectItemList.map(tag=>tag.uid).includes(item.uid)
      return item;
      }
    )    
    const TagBox = this.state.selectItemList.map((item, index)=>{
      return (
          <TagPiece key={index}>
              <div className="label">{item.title}</div>
              <div id={index} onClick={this.onDeleteTag} className="close">x</div>
          </TagPiece>
      )
    });
    return (
      <React.Fragment>
         {this.props.keep ? "redirected" : null}
        <Wrapper image={this.state.thumbnail}>
          <div className="row marginTop1">
            <div className="label1">갤러리 썸네일</div>
            <input hidden onChange={this.handleOnChangeThumbnail} id="file_" type="file" />
            <label htmlFor="file_">
            <div className="thumbnail">첨부</div>
            </label>
          </div>
          <div className="row marginTop1 ">
            <div className="label2">제목</div>
              <InputText onChange={this.onChangeTitle} value={this.state.title} placeholder="이름을 입력해주세요" width={345} height={31} />
          </div>
          <div className="row marginTop1 ">
            <div className="label2">설명</div>
              <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={345} height={154} />
          </div>
          <div className="row marginTop1">
            <div className="label2">아이템1</div>
              <DropBox onChange={this.onSelectItem} id="itemDropBox" selection 
               options={itemList&&itemList.map((item,index)=>{
                 return(
                   {value:item.uid,text:item.title,key:index}
                 )
               })}/>
              {console.log(itemList)}
          </div>
          <div className="wrapper flex margin_zero">
                <div className="label"/>
                <TagList>
                      {TagBox}
                </TagList>
          </div>
          <div className="row2 marginTop2">
               <div className="redButton_" onClick={this.onSubmit}>등록하기</div>
               <div className="greyButton" onClick={this.onClickClose}>취소하기</div>
               <div className="greyButton" onClick={this.onDelete}>삭제하기</div>
          </div>
        </Wrapper>
      </React.Fragment>
    );
  };
}
export default ModifyGroup_mobile;


// {this.props.keep ? "redirected" : null}

// <MainBox>
//   <div className="contentBox">
//     <ThumbnailBox>
//     <div className="label">갤러리 썸네일</div>
//       <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
//       <label htmlFor="file">
//         {this.state.thumbnail == null ?
//           <div className="thumbnail"><div>첨부</div></div>
//           :
//           <Thumbnail imageURL={this.state.thumbnail} />
//         }
//       </label>
//     </ThumbnailBox>
//     <FormBox>
//     <div className="board">
//     <div className="wrapper flex">
//         <div className="label">이름</div>
//         <InputText onChange={this.onChangeTitle} value={this.state.title} placeholder="이름을 입력해주세요" width={345} height={31} />
//       </div>
//       <div className="wrapper flex alignTop">
//         <div className="label">설명</div>
//         <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={345} height={154} />
//       </div>
//       <div className="wrapper flex margin_zero">
//         <div className="label">아이템</div>
//         <DropBox onChange={this.onSelectItem} id="itemDropBox" selection 
//                  options={itemList&&itemList.map((item,index)=>{
//                    return(
//                      {value:item.uid,text:item.title,key:index}
//                    )
//                  })}/>
//       </div>
//       <div className="wrapper flex margin_zero">
//         <div className="label"/>
//         <TagList>
//               {TagBox}
//         </TagList>
//       </div>
//       </div>
//     </FormBox>
//   </div>
//   <div className="contentBox">
//     <RedButton   width={150} height={30} fontSize={15}  text={"수정된 내용을 저장합니다."} value={"저장하기"} disabled={!this.state.isModify} okText="확인" cancelText="취소" onClick={this.onSubmit} isConfirm={false} />
//     <GrayButton  fontColor={"#707070"} isWhite={true} width={150} height={30} fontSize={15} text={"수정된 내용이 저장되지 않습니다."} value={"취소하기"} okText="확인" cancelText="취소"  onClick={this.onClickClose} isConfirm={true} />
//     <GrayButton  fontColor={"#707070"} isWhite={true} width={150} height={30} fontSize={15} text={"갤러리를 삭제합니다."} value={"삭제하기"} okText="확인" cancelText="취소"  onClick={this.onDelete} isConfirm={true} />
//     <div className="blankButton"/>
//   </div>
// </MainBox>