import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag";
import noimg from "source/noimg.png";

const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
    .contentsBox{
      width:100%;
      display:flex;
      padding-left:130px;
      padding-top:36px;
    }

`;
const RedButton = styled.div`
  width: 290px;
  height: 70px;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.gray ? "#EFEFEF" : "red"};
  cursor: pointer;
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
    font-family:Noto Sans KR;
    font-weight:500;
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
const InputText = styled.input.attrs({ type: "text" })`
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
      selectItemList:[],
      title:null, thumbnail: null, thumbnail_name: null, explain: "",
    }
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentDidMount() {
    // if (this.props.keep) {
    //   this.setState(this.props.keep.designer);
    //   this.setState({ getready: true });
    // }
  }
  componentWillUpdate(nextProps){
    if(this.props.galleryDetail&&(
      this.props.galleryDetail.title!==nextProps.galleryDetail.title||
      this.props.galleryDetail.explain!==nextProps.galleryDetail.explain||
      this.props.galleryDetail.thumbnail!==nextProps.galleryDetail.thumbnail||
      this.props.galleryDetail.itemList!==nextProps.galleryDetail.itemList
      )){


      this.setState({
        title:nextProps.galleryDetail.title,
        explain:nextProps.galleryDetail.description,
        thumbnail:nextProps.galleryDetail.thumbnail,
      })
      if(nextProps.dataList.length>0){
              let number=0;
                let arr = [];
                nextProps.dataList.map((data,index)=>{
                  nextProps.galleryDetail.itemList.map((item,index)=>{
                    if(item.value == data.uid){
                      arr.push({value:item.value,number});
                    }
                  })
                  number++;
                })
                this.setState({selectItemList:arr});
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
  onChangeExplain(event) {
    this.setState({ explain: event.target.value })
  }
  onChangeTitle(event) {
    this.setState({ title: event.target.value })
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
  }

  onSubmit = async e => {

    e.preventDefault();
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

    if (this.state.thumbnail != null || this.state.thumbnail != "") {
      await data.files.push(file);
    }

    if (data.files.length <= 0 || data.files[0].value === this.props.galleryDetail.thumbnail) {
      delete data.files;
    }
    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
      .then(res => {
        // console.log("res", res.res);
        const result = res.type;
        // console.log(res);
        if (result === "UPDATE_GROUP_SUCCESS") {
          alert("정보가 수정되었습니다.");
        } else {
          alert("다시 시도해주세요");
        }
      })
      .catch(e => {
        // console.log("실패", e);
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
  };
  
  onSelectItem(event,{value}){
    // console.log({value});
    this.setState({selectItemList:this.state.selectItemList.concat({value:this.props.dataList[{value}.value].uid,number:{value}.value})});
    // this.setState({selectItemList:this.state.selectItemList.concat({value:{value}.value,text:{value}.text})});
  }
  onDeleteTag = async (event) => {
    const deleteIdx = event.target.id;
    const length = this.state.selectItemList.length;
    let list = [];
    list = list.concat(this.state.selectItemList);
    this.setState({
      selectItemList: list.slice(0, deleteIdx).concat(this.state.selectItemList.slice(parseInt(deleteIdx, 10) + 1, length))
    });
}
  render() {
    let count = 0;
    // console.log(this.props.dataList);
    const itemList = this.props.dataList.length<0?{value:0,text:"없음"}:this.props.dataList.map((item,index)=>{
      return({value:count++,text:item.title,key:item.uid});
    })
    // console.log(itemList);

    const TagBox = this.props.dataList.length>0&&this.state.selectItemList.map((item, index) => {
      console.log(item.number);
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
          <div className="title">갤러리 등록하기</div>
          <div className="contentsBox">
            <ThumbnailBox>
              <div className="label">썸네일 등록</div>
              <Margin height={70} />
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
              <label htmlFor="file">
                {this.state.thumbnail == null ?
                  <div className="thumbnail"><div>첨부하기</div></div>
                  :
                  <Thumbnail imageURL={this.state.thumbnail} />
                }
              </label>
            </ThumbnailBox>


            {/* <div className="contentsBox"> */}
            <FormBox>
            <div className="wrapper flex">
                <div className="label">이름</div>
                <InputText onChange={this.onChangeTitle} value={this.state.title} placeholder="이름을 입력해주세요" width={483} height={99} />
              </div>
              <div className="wrapper flex">
                <div className="label">설명</div>
                <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={483} height={330} />
              </div>
              <div className="wrapper flex">
                <div className="label">아이템</div>
                <DropBox onChange={this.onSelectItem} id="itemDropBox" selection options={itemList}/>
                <TagList>
                    {TagBox}
                </TagList>
              </div>
            </FormBox>
            </div>
            <div className="contentsBox">
            <RedButton onClick={this.onSubmit} ><div>등록하기</div></RedButton>
            </div>
        </MainBox>
      </React.Fragment>
    );
  };
}
export default ModifyGroup;