import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from 'styled-components';
// import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react"
// import { InputTag } from "components/Commons/InputItem/InputTag";
import noimg from "source/noimg.png";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import market_style from "market_style";

const MainBox = styled.div`
  width:100%;
  height:100%;
  .titleBox{
    display:flex;
    justify-content:space-between;
  }
  .pointer{
    cursor:pointer;
  }
  .title{
    width:max-content;
    font-family:Noto Sans KR, Medium;
    font-size:${market_style.font.size.normal1};
    font-weight:500;
    color:black;
  }
  .hrline{
    width:100%;
    border:1px solid #EFEFEF;
    margin-top:10px;
  }
    .contentBox{
      width:100%;
      display:flex;
      justify-content:center;
      margin-top:20px;
    }

`;

const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
  }
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  border-radius: 20px;
  padding:24px 18px 34px 18px;
  margin-right:20px;
  .label{
    display:flex;
    justify-content:center;
    width:100%;
    font-size:${market_style.font.size.small1};
    margin-bottom:20px;
  }
`;
const Thumbnail = styled.div`
  cursor:pointer;
  width:264px;
  height:229px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#efefef;
  background-image: ${props => `url(${props.imageURL == null ? null : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  .label{
    width:max-content;
    height:max-content;
    font-size:${market_style.font.size.small1};
    color:#707070;
    font-weight:400;
  }
`;
const FormBox = styled.div`
  width:521px;
  height:329px;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  border-radius: 20px;
  padding:33px;
  .board{
    width:100%;
    height:102%;
    overflow-Y:auto;
    overflow-X:hidden;
  }
  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:20px;
  }
  .alignTop{
    align-items:flex-start;
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
  .column{
    flex-direction:column;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    min-width:104px;
    
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
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
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

const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const DropBox = styled(Dropdown)`
    min-width:133px !important;
    min-height:31px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;
    z-index:999;
    border-radius:10px !important;
`;
const TagList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;
class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItemList:[],
      title:null, thumbnail: null, thumbnail_name: null, explain: "",dropList:[],
    }
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  componentDidMount() {
    if (this.props.keep) {
      this.setState(this.props.keep.designer);
      this.setState({ getready: true });
    }
  }

  componentWillUpdate(nextProps){
    if(this.props.open !== nextProps.open){
      this.setState({open:nextProps.open})
    }
    // if(this.props.dataList!=nextProps.dataList){
    //   let count = 0;
    //   const itemList = nextProps.dataList.length<0?{value:0,text:"없음"}:nextProps.dataList.map((item,index)=>{
    //     return({value:count++,text:item.title,key:item.uid});
    //   });
    //   this.setState({dropList:itemList});
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
    reader.onloadend = async() => {
      await this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    console.log(file.name);
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
    console.log(data);
// return;

    if (this.state.thumbnail != null || this.state.thumbnail !== "") {
      await data.files.push(file);
    }
    this.props.CreateNewGroupRequest(data, this.props.token)
      .then(async res => {
        console.log("res", res.res);
        const result = res.type;
        console.log(res);
        if (result === "CREATE_NEW_GROUP_SUCCESS") {
          this.props.GetHaveInGalleryRequest(this.props.id,0);
          // alert("정보가 수정되었습니다.");
          this.props.handleShowModal(false);
          this.props.handleIsModify();

        } else {
          await alert("다시 시도해주세요!");
        }
      })
      .catch(async e => {
        console.log("실패", e);
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
  };
  onSelectItem(event,{value}){
    this.setState({selectItemList:this.state.selectItemList.concat({value:this.props.dataList[{value}.value].uid,number:{value}.value})});
    return;
    console.log(this.state.dropList);
    let copy = [...this.state.dropList];
    copy.splice(value,copy.length==0?-1:1);
    // list.slice(0, deleteIdx).concat(this.state.selectItemList.slice(parseInt(deleteIdx, 10) + 1, length)
    this.setState({dropList:copy,selectItemList:this.state.selectItemList.concat({value:this.props.dataList[{value}.value].uid,number:{value}.value})});
  }
  onDeleteTag = async (event) => {
    const deleteIdx = event.target.id;
    const length = this.state.selectItemList.length;
    // const uid = this.state.selectItemList[deleteIdx].uid;
    // console.log(uid);
    let list = [];
    list = list.concat(this.state.selectItemList);
    this.setState({
      selectItemList: list.slice(0, deleteIdx).concat(this.state.selectItemList.slice(parseInt(deleteIdx, 10) + 1, length))
    });

    // const itemList = this.props.dataList.length<0?{value:0,text:"없음"}:this.props.dataList.map((item,index)=>{
    //   return({value:count++,text:item.title,key:item.uid});
    // });
  }
  onClickClose(event){
    this.props.handleShowModal(false);
  }
  render() {
    let count = 0;
    const itemList = this.props.dataList.length<0?{value:0,text:"없음"}:this.props.dataList.map((item,index)=>{
      return({value:count++,text:item.title,key:item.uid});
    })
    // console.log(itemList);
    const TagBox = this.state.selectItemList.map((item, index) => {
      return (
          <TagPiece key={index}>
              <div className="label">{this.props.dataList[item.number].title}</div>
              <div id={index} onClick={this.onDeleteTag} className="close">x</div>
          </TagPiece>
      );
    })

    return (
      <React.Fragment>

        {this.props.keep ? "redirected" : null}

        <MainBox>
          <div className="contentBox">
            <ThumbnailBox>
              <div className="label">갤러리 썸네일</div>
              <input hidden onChange={this.handleOnChangeThumbnail} id="file_" type="file" />
              <label htmlFor="file_">
                <Thumbnail imageURL={this.state.thumbnail} >
                  <div className="label">
                 {this.state.thumbnail==null?"첨부":""}
                 </div>
                </Thumbnail>
              </label>
            </ThumbnailBox>


            <FormBox>
            <div className="board">
            <div className="wrapper flex">
                <div className="label">이름</div>
                <InputText onChange={this.onChangeTitle} value={this.state.title} placeholder="이름을 입력해주세요" width={345} height={31} />
              </div>
              <div className="wrapper flex alignTop">
                <div className="label">설명</div>
                <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={345} height={154} />
              </div>
              <div className="wrapper flex margin_zero">
                <div className="label">아이템</div>
                <DropBox onChange={this.onSelectItem} id="itemDropBox" selection options={itemList}/>
              </div>
              <div className="wrapper flex margin_zero">
                <div className="label"/>
                <TagList>
                      {TagBox}
                </TagList>
              </div>
              </div>
            </FormBox>
            </div>
            <div className="contentBox">
            <RedButton width={150} height={30} fontSize={15}  value={"등록하기"}  onClick={this.onSubmit}/>
            <GrayButton width={150} height={30} fontSize={15} text={"취소하시겠습니까?"} value={"취소하기"} onClick={this.onClickClose} isConfirm={true}></GrayButton>
            </div>
        </MainBox>
      </React.Fragment>
    );
  };
}
export default CreateGroup;