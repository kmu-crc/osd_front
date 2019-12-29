import React, { Component } from "react";
import Button from "components/Commons/Button";
import styled from "styled-components";
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { Header, Grid, Form } from "semantic-ui-react";
import noimg from "source/noimg.png";
import newimg from "source/new-img.png";


import { FormTag,FormDropBox,FormInput,FormTextArea} from "components/Commons/FormItems";
import {FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";

import CreateOption from "components/Designs/CreateDesignForm/CreateOption/CreateOption";

const patent_option = [
  {text:"양도",value:0},
  {text:"독점 사용권",value:1},
  {text:"일반 사용권",value:2}
]
const counsel_option = [
  {text:"온/오프라인",value:0},
  {text:"방문지도",value:1},
  {text:"팀/개인교육",value:2}
]
const newCategory = [
  {text:"디자인",value:0},
  {text:"특허권",value:1},
  {text:"디자인권",value:2},
  {text:"기술자문",value:3},
  {text:"기술상담",value:4},
  {text:"경험",value:5},
  {text:"정보/데이터",value:6},
  {text:"아이디어/노하우",value:7},
  {text:"제품",value:8},
];
const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };
const MAX_PRODUCT_IMAGE_COUNT = 5;
const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 70px;
  margin-bottom: 30px;
  border-radius: 3px;
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 70px 100px;
  }
  & .field label {
    margin: 0 0 0.8rem 0;
    display: block;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
  }
`;
const ProductImage = styled.div`
  display:flex;
  margin-bottom:50px;
  .title-wrapper {
    padding-top: 20px;
    padding-bottom: 20px;
    margin-right:80px;
    display: flex;
    flex-direction: row;
    .title {
      width: 150px;
      height:30px;
      border-right:10px solid #707070;
      margin-left: 15px;
      font-weight: bold;
      font-size: ${TxtSz.M}px;
    }
    .text {
      width: max-content;
      margin-left: 25px;
      font-weight: light;
      font-size: ${TxtSz.s}px;
      color: #707070;
    }
  }
  .img-list-wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    height: 180px;
    background-color: white;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .list-element-img {
      margin-top: 10px;
      margin-left: 10px;
      width: 120px;
      height: 120px;
      img {
        width: 116px;
        height: 116px;
      }
    }
    .add-img {
      margin-top: 10px;
      margin-left: 10px;
      min-width: 120px;
      height: 120px;
      background-color: #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;
const ProductDescription = styled.div`
  display:flex;
  margin-bottom:50px;
  .title-wrapper {
    margin-right:80px;
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      width: 150px;
      height:30px;
      border-right:10px solid #707070;
      margin-left: 15px;
      font-weight: bold;
      font-size: ${TxtSz.M}px;
    }
  }
  .description-wrapper {

    padding-top:10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white;
    width:100%;
    .row {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      margin-top: 10px;
      .text {
        width: 210px;
        margin-left: 15px;
      }
      .input {
        // display: flex;
        // flex-direction: row;
        width:100%;
      }
      .dropdown-style {
        margin: 0;
        padding: 5px;
        width: max-content;
        height: 30px;
        font-size: 16px;
        border: 1px solid #EFEFEF;
        &.giveaspace {
          margin-left: 15px;
        }
      }
    }
  }
`;
const ProductPrice = styled.div`
  display:flex;
  margin-bottom:50px;

  .title-wrapper {
    margin-right:80px;
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      width: 150px;
      height:30px;
      border-right:10px solid #707070;
      margin-left: 15px;
      font-weight: bold;
      font-size: ${TxtSz.M}px;
    }
  }
  .price-wrapper {
    width:100%;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white;
    width:100%;
    .option {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      margin-top: 10px;
      .text {
        width: 210px;
        margin-left: 15px;
      }
      .input {
        width:100%;
      }
    }
    .button {
      border-radius: 5px;
      width: 175px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: white;
      cursor: pointer;
      background-color: #A0A0A0;
    }
  }
`;

const ProductDelivery = styled.div`
  display:flex;
  margin-bottom:50px;
  .title-wrapper {
    margin-right:80px;
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      width: 150px;
      height:30px;
      border-right:10px solid #707070;
      margin-left: 15px;
      font-weight: bold;
      font-size: ${TxtSz.M}px;
    }
  }
  .delivery-method-wrapper {
    width:100%;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white; 
    .option {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      margin-top: 10px;
      .text {
        width: 210px;
        margin-left: 15px;
      }
      .input {
        width:100%;
      }
    }
  }
`;

const TextBox = styled.textarea`
  width:300px;
  height:100px;
  border:1px solid #EFEFEF;
`
const InputStyle = styled.input.attrs({type:'text'})`

   width: ${props => props.width || 200}px;
   height: ${props => props.height || 30}px;
   border: 1px solid #EFEFEF;
   padding: 10px;
`;

class ModifyDesignInfo extends Component {
  constructor(props) {

    super(props);

    this.state = { 
      selectCategory:-1,
      openCreateOption: false, 
      loading: false, 
      imgs: [], cate1: null, cate2: null, 
      is_custom: false };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
  };
  async handleImageChange(event){
    if(event.target.files.length<=0)return;
    let imgs = this.state.imgs;
    const file = event.target.files[0];
    const filename = file.name.replace(/\s/g, '');
    await imgs.push({ src: URL.createObjectURL(file), value: await this.readFile(file), name: filename, key: "thumbnail[]" });
    await this.setState({ imgs: imgs });
    await console.log(this.state.imgs);
  };
  readFile = (inputFile) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(inputFile);
    });
  };
  onClickCreateOption = () => {
    this.setState({ openCreateOption: true });
  };
  onCloseCreateOption = () => {
    this.setState({ openCreateOption: false });
  };
  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  onSelectCategory(value)
  {
    this.setState({
      selectCategory:value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    this.state.member.value = JSON.stringify(this.state.member.value);
    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.setLoader();
      this.props.CreateDesignRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          this.props.history.push(`/designDetail/${res.design_id}`);
        } else {
          alert("다시 시도해주세요");
          this.state.member.value = JSON.parse(this.state.member.value);
          this.props.setLoader();
        }
      });
    }).catch(e => {
      console.log("실패", e);
      this.state.member.value = JSON.parse(this.state.member.value);
    });
  };

  getMember = data => {
    this.props.SearchMemberRequest(null, {key: data}, this.props.token);
  }

  render() {
    const { imgs, loading, category } = this.state; // const { category } = this.props;

    const SectionDevelivery = ()=>{
      return(
        <ProductDelivery>
            <div className="title-wrapper">
              <div className="title">배송</div></div>
            <div className="delivery-method-wrapper">
              <div className="option">
                <div className="text">배송기간</div>
                <div className="input">
                  <FormInput name="delivery_days" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
              <div className="option">
                <div className="text">배송업체</div>
                <div className="input">
                  <FormInput name="delivery_company" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
              <div className="option">
                <div className="text">배송비</div>
                <div className="input">
                  <FormInput name="delivery_cost" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
            </div>
        </ProductDelivery>
      );
    }

    const SectionDescription = ()=>{
      return(
        <ProductDescription>
        <div className="title-wrapper">
          <div className="title">설명</div></div>
        <div className="description-wrapper">

          <div className="row">
            <div className="text">상품 이름</div>
            <div className="input">
              <FormInput name="name" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
          </div>
          <div className="row">
            <div className="text">상품 설명</div>
            <div className="input">
              <FormTextArea name="description" placeholder="상품 설명을 입력해주세요"/>
            </div>
          </div>
          
            
            
              {this.state.selectCategory === 1 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option}/></div></div>:null}
              {this.state.selectCategory === 2 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option}/></div></div>:null}
              {this.state.selectCategory === 3 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option}/></div></div>:null}
              {this.state.selectCategory === 4 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option}/></div></div>:null}          
          
          <div className="row">
            <div className="text">태그</div>
            <div className="input">
              <FormTag placeholder = "상품 태그를 입력해주세요(한글10자이내 영문 20자이내)"/></div>
          </div>
        </div>
      </ProductDescription >
      );
    }

    const SectionPrice = () =>{
      return(
        <ProductPrice>
        <div className="title-wrapper"><div className="title">가격</div></div>
        <div className="price-wrapper">
          <div className="option">
            <div className="text">가격</div>
            <div className="input"><FormInput name="price" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">재고</div>
            <div className="input"><FormInput name="amount" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">옵션</div>
            <div className="input"><div className="button" onClick={this.onClickCreateOption}>옵션정보등록</div>
            </div>
          </div>
        </div>
      </ProductPrice>
      );
    }

    return (
      <React.Fragment>
         <CreateOption handleSetOptions={this.handleSetOptions} closeOption={this.onCloseCreateOption} open={this.state.openCreateOption} />
      {/* <form onSubmit={this.onSubmit}> */}
        <FromFieldCard>
          <ProductImage>
          <div className="title-wrapper">
            <div className="title">이미지</div>
            {/* <div className="text">판매 상품의 이미지를 업로드 해주세요. 최대 5장까지 업로드 가능합니다.</div> */}
            </div>
          <div className="img-list-wrapper">
            {imgs.length > 0 ?
              imgs.map(img =>
                <div key={img.src + "image-list"} className="list-element-img">
                  <img alt="" src={img.src || noimg} /></div>)
              : null}
            {imgs.length < MAX_PRODUCT_IMAGE_COUNT ?
              <div className="add-img" >
                <label htmlFor="file" >
                  <img alt="" src={newimg} />
                </label>
                <input hidden onChange={this.handleImageChange} id="file" type="file" />
              </div> : null}
          </div>
        </ProductImage>
        <ProductDescription>
          <div className="title-wrapper">
          <div className="title">종류</div></div>
          <div className="description-wrapper">
            <div className="row">
            <div className="text">카테고리</div>
            <div className="input">
              <FormDropBox onChangeValue={this.onSelectCategory} options ={newCategory}/>
           </div>
          </div>
          </div>
        </ProductDescription>
        {this.state.selectCategory !== -1? <SectionDescription/>:null}
              {this.state.selectCategory === 8? <SectionDevelivery/>:null}
      

        </FromFieldCard>
        <Button type="submit">등록</Button>
      {/* </form> */}
      </React.Fragment>
    );
  }
}

export default ModifyDesignInfo;