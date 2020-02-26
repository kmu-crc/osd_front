import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import {InputPrice} from "components/Commons/InputItem/InputPrice";

const FirstCategory = [{ text: "패션", value: 0 },
{ text: "제품", value: 1 },
{ text: "커뮤니케이션", value: 2 },
{ text: "공간", value: 3 },
{ text: "엔터테인먼트", value: 4 },
{ text: "소프트웨어", value: 5 },
{ text: "새분야", value: 6 }];

const EmptyCategory = [{ text: "", value: -1 }]

const SecondCategory = [[{ text: "스마트패션", value: 0 }, { text: "의상", value: 1 }, { text: "엑세서리", value: 2 }, { text: "패션모듈", value: 3 }],
[{ text: "스마트카", value: 0 }, { text: "로봇", value: 1 }, { text: "기계/기기/기구", value: 2 }, { text: "센서모듈", value: 3 }, { text: "공예", value: 4 }],
[{ text: "UI/UX", value: 0 }, { text: "광고", value: 1 }, { text: "웹", value: 2 }, { text: "영상", value: 3 }, { text: "타이포그래피", value: 4 }],
[{ text: "스마트시티", value: 0 }, { text: "건축", value: 1 }, { text: "인테리어", value: 2 }, { text: "환경", value: 3 }],
[{ text: "스마트미디어", value: 0 }, { text: "게임", value: 1 }, { text: "디지털컨텐츠", value: 2 }, { text: "서비스", value: 3 }],
[{ text: "인공지능", value: 0 }, { text: "빅데이터", value: 1 }, { text: "시스템SW", value: 2 }, { text: "응용SW", value: 3 }],
[{ text: "새분야", value: 0 }]];
const ItemType = [
  { text: "디자인", value: 0 },
  { text: "프로젝트", value: 1 },
  { text: "지적재산권", value: 2 },
  { text: "기술자문/상담", value: 3 },
  { text: "경험", value: 4 },
  { text: "정보/데이터", value: 5 },
  { text: "아이디어/노하우", value: 6 },
  { text: "제품", value: 7 }];

const Wrapper = styled(ContentBox)`
    width:100%;
    margin-top:60px;
    margin-bottom: 100px;
    z-index:3;
`;
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
    margin-left:130px;

  }
  .contentsBox{
    position: relative;
    width:100%;
    display:flex;
    padding-left:130px;
    padding-top:36px;
  }

`
const RedButton = styled.div`
  width:290px;
  height:70px;
  font-family:Noto Sans KR;
  font-size:20px;
  font-weight:500;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:red;

  position:absolute;
  left:${props => props.left}px;
  bottom:${props => props.bottom}px;

  cursor:pointer;
`

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
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .flex{
    display:flex;
  }
  .centering{
    align-items:center;
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

`
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

`
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
  padding: 0.67857143em 1em;

`
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`

const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`
const HRLine = styled.div`
    width:93%;
    height:3px;
    background-color:#E9E9E9;
    margin-top:35px;
    margin-bottom:35px;
`
class ModifyRequestToDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: -1, category_level2: -1,
      title: "", tag: [], price: 0, content: "", location: "", ownership: -1, offline: -1,
    }
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onClickItemType = this.onClickItemType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.getTagValue = this.getTagValue.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeOwnership = this.onChangeOwnership.bind(this);
    this.onChangeOffline = this.onChangeOffline.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //modify :*** 데이터베이스 호출 시 주석해제 *****

    // this.setState({
    //   category_level1:this.props.RequestDetail.category_level1,
    //   category_level2:this.props.RequestDetail.category_level2,
    //   title:this.props.RequestDetail.title,
    //   tag:this.props.RequestDetail.tag.split(','),
    //   price:this.props.RequestDetail.price,
    //   content:this.props.RequestDetail.content,
    //   location:this.props.RequestDetail.location,
    //   ownership:this.props.RequestDetail.ownership,
    //   offline:this.props.RequestDetail.offline_consultation,
    // });
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
  async getPriceValue(value){
    await this.setState({price:value});
  }

  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  onClickItemType(event, { value }) {
    this.setState({ itemType: { value }.value });
  }
  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    })
  }
  getTagValue(data) {
    this.setState({
      tag: data.slice(),
    })
  }
  onChangePrice(event) {
    this.setState({
      price: event.target.value,
    })
  }
  onChangeLocation(event) {
    this.setState({
      location: event.target.value,
    })
  }
  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    })
  }
  onChangeOwnership(event, { value }) {
    this.setState({
      ownership: { value }.value,
    })
  }
  onChangeOffline(event, { value }) {
    this.setState({
      offline: { value }.value,
    })
  }

  onSubmit() {

    let tagList = "";
    this.state.tag.map((item, index) => { // 태그,태그,태그 ...
      return (
        tagList += item + ","
      );
    });

    const Data = {
      type: "designer_req", // "designer_req" "designer_res" "maker_req" "maker_res"
      // user_id: this.props.userInfo.uid // 
      title: this.state.title,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: tagList,
      price: this.state.price,
      content: this.state.content,
      location: this.state.location,
      ownership: this.state.ownership,
      offline_consultation: this.state.offline,
    }
    // 페이지이동
    window.location.href = "/request/designer";
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];

    return (
      <React.Fragment>
        <Wrapper>
          <MainBox>
            <div className="title">디자인 의뢰</div>
            <div className="contentsBox">
              <FormBox>

                <div className="wrapper flex centering">
                  <div onChange={this.onChangeTitle} value={this.state.title} className="label">제목</div>
                  <InputText width={483} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">카테고리</div>
                  <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                  <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />

                </div>

                <div className="wrapper flex centering">
                  <div className="label">태그</div>
                  <div>
                    <InputTag getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label ">희망 비용</div>
                  <InputPrice name="price" getValue={this.getPriceValue}/>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">의뢰 내용</div>
                  <InputTextarea onChange={this.onChangeContent} value={this.state.content} width={551} height={344} />
                </div>
                <HRLine />
                <div className="wrapper flex centering">
                  <div className="label">디자이너 위치</div>
                  <InputText onChange={this.onChangeLocation} value={this.state.location} width={483} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">디자인 소유권</div>
                  <DropBox id="designerOwnership" selection options={[{ text: "의뢰자", value: 0 }, { text: "디자이너", value: 1 }]}
                    onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">오프라인 상담</div>
                  <DropBox id="offline" selection options={[{ text: "가능", value: 0 }, { text: "불가능", value: 1 }]}
                    onChange={this.onChangeOffline} value={this.state.offline} placeholder="선택" />
                </div>

              </FormBox>
              <RedButton onClick={this.onSubmit} left={1164} bottom={0}><div>등록하기</div></RedButton>
            </div>
          </MainBox>
        </Wrapper>
      </React.Fragment>
    );
  };
} export default ModifyRequestToDesigner;

// import React, { Component } from "react";
// import { Grid } from "semantic-ui-react";
// import styled from 'styled-components';
// import StyleGuide from "StyleGuide";
// import mainSlide from "source/mainSlide.jpg";
// import ContentBox from "components/Commons/ContentBox";
// import { FormDropBox, FormFile, FormInput, FormCheckBox, FormTag, FormTextArea } from "components/Commons/FormItems";
// import Button from "components/Commons/Button";
// import Loading from "components/Commons/Loading";

// const ImgWrapper = styled.div`
//   background-image: url(${mainSlide});
//   background-position: center;
//   background-size: cover;
//   width: 100%;
//   height: 200px;
//   position: relative;
//   &::after {
//     position: absolute;
//     top: 0;
//     left: 0;
//     display: block;
//     content: "";
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.6);
//     z-index: 1;
//   }
// `;
// const Title = styled.div`
//   width: 100%;
//   color: white;
//   position: absolute;
//   text-align: center;
//   top: 40%;
//   left: 0;
//   z-index: 2;
//   transform: translateY(-50%);
//   h1 {
//     color: ${StyleGuide.color.geyScale.scale0};
//     font-size: ${StyleGuide.font.size.heading2};
//     font-weight: bold;
//   }
// `;
// const Wrapper = styled(ContentBox)`
//     width:100%;
//     margin-top:60px;
//     margin-bottom: 100px;
//     position: relative;
//     z-index:3;
// `;
// const FromFieldCard = styled.div`
//   width: 100%;
//   background-color: white;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//   padding: 70px;
//   margin-bottom: 30px;
//   border-radius: 3px;
//   @media only screen and (min-width: 1200px) {
//     padding: 70px 100px 70px 100px;
//   }
// `;
// const Label = styled.div`
//   margin: 0 0 0.8rem 0;
//   display: block;
//   color: rgba(0,0,0,.87);
//   font-size: .92857143em;
//   font-weight: 700;
//   text-transform: none;
// `;

// class CreateRequest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: false, };
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onChangeTag = this.onChangeTag.bind(this);
//     this.onChangeValue = this.onChangeValue.bind(this);
//     this.onChangeCategory1 = this.onChangeCategory1.bind(this);
//     this.onChangeCategory2 = this.onChangeCategory2.bind(this);
//     this.onChangedPrivate = this.onChangedPrivate.bind(this);
//     this.gotoDetailPage = this.gotoDetailPage.bind(this);
//   }
//   onChangeTag = v => { this.setState({ tag: v }); };
//   onChangeValue = e => { this.setState({ [e.target.name]: e.target.value }); };
//   onChangeCategory1 = v => { this.setState({ category_level1: v }); };
//   onChangeCategory2 = v => { this.setState({ category_level2: v }); };
//   onChangedPrivate = checkbox => { this.setState({ private: checkbox.value }); };
//   gotoDetailPage = id => {
//     if (id) {
//       alert("완료되었습니다.");
//       window.location.href = `/designerBoardDetail/${id}`
//     } else {
//       alert("글 작성에 실패하였습니다.");
//     }
//   };
//   onSubmit = e => {
//     e.preventDefault();
//     this.setState({ loading: true });
//     let data = { ...this.state, writer: this.props.userInfo.uid, type: "designer" };
//     delete data.loading;
//     console.log(data);
//     this.props.CreateDesignerBoardArticleRequest &&
//       this.props.CreateDesignerBoardArticleRequest(data, this.props.token)
//         .then(id => this.gotoDetailPage(id))
//         .catch(e => alert(e));
//     this.setState({ loading: false });
//   };

//   render() {
//     return (<React.Fragment>
//       {this.state.loading ? <Loading /> : null}

//       <Wrapper>
//         <FromFieldCard>
//           <Grid>
//             <Grid.Column mobile={16} computer={16}>
//               <Label>제목</Label>
//               <FormInput name="title" placeholder="설명을 입력해주세요." getValue={this.onChangeValue} />
//               <Label>카테고리</Label>
//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <FormDropBox
//                   selection={true} name="category_level1"
//                   onChangeValue={this.onChangeCategory1}
//                   options={this.props.category1}
//                 />&nbsp;&nbsp;
//                   {this.state.category_level1 ?
//                   <FormDropBox
//                     selection={true} name="category_level2"
//                     onChangeValue={this.onChangeCategory2}
//                     options={this.props.category2[this.state.category_level1]} /> : null}
//               </div>
//               <Label>내용</Label>
//               <FormTextArea name="content" placeholder="내용을 입력해주세요." getValue={this.onChangeValue} />

//               {/* <Label>파일첨부</Label>
//               <FormFile name="file" getValue={this.onChangeValue} /> */}

//               <Label>태그</Label>
//               <FormTag name="tag" getValue={this.onChangeTag} placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />

//               <Label>비공개여부</Label>
//               <FormCheckBox name="private" value={false} getValue={this.onChangedPrivate} placeholder="비공개" />

//             </Grid.Column>
//           </Grid>
//         </FromFieldCard>
//         <div style={{ width: "max-content", marginLeft: "auto" }}>
//           <Button color="Primary" onClick={this.onSubmit} type="submit">등록하기</Button>
//         </div>
//       </Wrapper>
//     </React.Fragment>);
//   }
// }

// export default CreateRequest;
