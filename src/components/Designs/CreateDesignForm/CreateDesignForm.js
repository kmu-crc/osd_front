import React, { Component } from "react";
import Button from "components/Commons/Button";
import styled from "styled-components";
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { Header, Grid, Form } from "semantic-ui-react";
import noimg from "source/noimg.png";
import newimg from "source/new-img.png";


import { FormInput, FormThumbnail, FormCheckBox, AsyncInput, FormSelect } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";

import CreateOption from "components/Designs/CreateDesignForm/CreateOption/CreateOption";


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
    .row {
      display: flex;
      flex-direction: row;
      padding-top: 5px;
      padding-bottom: 10px;
      .text {
        width: 210px;
        margin-left: 15px;
      }
      .input {
        display: flex;
        flex-direction: row;
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
        ;
      }
    }
    .button {
      border-radius: 5px;
      margin-left: auto;
      margin-right: 25px;
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
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
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
        ;
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

class CreateDesignForm extends Component {
  constructor(props) {
    super(props);
    this.state = { openCreateOption: false, loading: false, imgs: [], cate1: null, cate2: null, is_custom: false };
    this.handleImageChange = this.handleImageChange.bind(this);
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
    return (
      <React.Fragment>
         <CreateOption handleSetOptions={this.handleSetOptions} closeOption={this.onCloseCreateOption} open={this.state.openCreateOption} />
      <form onSubmit={this.onSubmit}>
        <FromFieldCard>
          <ProductImage>
          <div className="title-wrapper">
            <div className="title">상품 이미지</div>
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
          <div className="title">상품설명</div></div>
        <div className="description-wrapper">
          <div className="row">
            <div className="text">카테고리</div>
            <div className="input">
              <Dropdown
                className="dropdown-style"
                placeholder={"카테고리를 선택해주세요."}
                onChange={this.handleCate1}
                options={category || [{ key: "all", value: "all", text: "전체" },]} />
              {this.state.cate1 ?
                <Dropdown
                  className="dropdown-style giveaspace"
                  placeholder={"세부 카테고리를 선택해주세요."}
                  onChange={this.handleCate2}
                  options={category.find(cate => cate.uid === this.state.cate1).child || [{ key: "all", value: "all", text: "전체" },]} /> : null}
            </div>
          </div>
          <div className="row">
            <div className="text">상품 이름</div>
            <div className="input">
              <InputStyle width="300" name="name" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
          </div>
          <div className="row">
            <div className="text">상품 설명</div>
            <div className="input">
              <TextBox/>
            </div>
          </div>
          <div className="row">
            <div className="text">태그</div>
            <div className="input">
              <InputStyle name="tag" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
          </div>
        </div>
      </ProductDescription >

      <ProductPrice>
        <div className="title-wrapper"><div className="title">가격</div></div>
        <div className="price-wrapper">
          <div className="option">
            <div className="text">가격</div>
            <div className="input"><InputStyle name="price" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">재고</div>
            <div className="input"><InputStyle name="amount" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">옵션</div>
            <div className="input"><div className="button" onClick={this.onClickCreateOption}>옵션정보등록</div>
            </div>
          </div>
        </div>
      </ProductPrice>

      <ProductDelivery>
        <div className="title-wrapper">
          <div className="title">배송</div></div>
        <div className="delivery-method-wrapper">
          <div className="option">
            <div className="text">배송기간</div>
            <div className="input">
              <InputStyle name="delivery_days" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">배송업체</div>
            <div className="input">
              <InputStyle name="delivery_company" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
          <div className="option">
            <div className="text">배송비</div>
            <div className="input">
              <InputStyle name="delivery_cost" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
        </div>
      </ProductDelivery>

        </FromFieldCard>
        <Button type="submit">등록</Button>
      </form>
      </React.Fragment>
    );
  }
}

export default CreateDesignForm;



{/* <Grid>
<Grid.Column mobile={16} computer={4}>
  <FormHeader as="h2">디자인 정보</FormHeader>
</Grid.Column>
<Grid.Column mobile={16} computer={12}>
  <Form.Group widths="equal" className="clearFix">
    <Label>디자인 제목</Label>
    <FormInput
      name="title"
      maxLength="100"
      placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
      getValue={this.onChangeValue}
      validates={["Required"]}
      onBlur={()=>{this.liveCheck("title")}}
    />
  </Form.Group>
  <Form.Group widths="equal" className="clearFix">
    <Label>디자인 설명</Label>
    <FormInput
      name="explanation"
      maxLength="1000"
      placeholder="디자인 설명을 입력해주세요. (1000자 이내)"
      getValue={this.onChangeValue}
    />
  </Form.Group>
  <Form.Group widths="equal" className="clearFix">
    <Label>썸네일 등록</Label>
    <FormThumbnail
      name="thumbnail"
      placeholder="썸네일 등록"
      getValue={this.onChangeValue}
      onChange={()=>{this.liveCheck("thumbnail")}}
      validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
    />
  </Form.Group>
  <Form.Group widths="equal" className="clearFix">
    <Label>카테고리</Label>
    <FormSelect
      selection={true}
      options={this.props.cate1}
      name="category_level1"
      getValue={this.onChangeValue}
      onChange={()=>this.props.GetCategoryLevel2Request(this.state.category_level1.value)}
    />
    <FormSelect
      selection={true}
      options={this.props.cate2}
      name="category_level2"
      getValue={this.onChangeValue}
    />
  </Form.Group>
  <Form.Group widths="equal" className="clearFix">
    <Label>멤버 초대</Label>
    <AsyncInput
      name="member"
      getValue={this.onChangeValue}
      asyncFn={this.getMember}
      list={this.props.members}
    />
  </Form.Group>
</Grid.Column>
</Grid>
</FromFieldCard>
<FromFieldCard>
<Grid>
<Grid.Column mobile={16} computer={4}>
  <FormHeader as="h2">라이센스</FormHeader>
</Grid.Column>
<Grid.Column mobile={16} computer={12}>
  <Form.Group widths={4}>
    <FormCheckBox
      name="is_commercial"
      placeholder="상업적 이용 가능"
      getValue={this.onChangeValue}
      value={true}
    />
    <FormCheckBox
      name="is_display_creater"
      placeholder="원작자 표시"
      getValue={this.onChangeValue}
      value={true}
    />
    <FormCheckBox
      name="is_modify"
      placeholder="수정 가능"
      getValue={this.onChangeValue}
      value={true}
    />
  </Form.Group>
</Grid.Column>
</Grid> */}
