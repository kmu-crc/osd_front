import React, { Component } from 'react';
import styled from 'styled-components';
import noimg from "source/noimg.png";
import who from "source/thumbnail.png";
import { Dropdown } from "semantic-ui-react";
import 'react-dropdown/style.css';
import TextFormat from 'modules/TextFormat';
import cookie from 'react-cookies';
// import ViewContainer from 'containers/Designs/DesignDetailViewContainer';

const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
        color:#707070;
    }
    display:flex;
    justify-content:center;
    .content_box{
        width:1280px;
        display:flex;
        .left_side_box{
            width:60%;
            .image_box{
                width:100%;
                height:700px;
                display:flex;
                flex-direction:column;
                .big_image_box{
                    width:100%;
                    height:80%;
                    display:flex;
                    justify-content:center;
                    padding:20px;
                }
                .small_image_box{
                    width:100%;
                    height:20%;
                    display:flex;
                    overflow:hidden;
                    padding-left:20px;
                    &:hover{
                        overflow:auto;
                        overflow-x:overlay;
                    }
                }
            }
            .product_request {
              width: 100%;
              .title_box {
                width: 100%;
                height: 90px;
                padding: 20px;
                padding-top: 40px;
                margin-top: 30px;
                font-size: 30pt;
                font-weight: 500;
                border-top: 2px solid #dddddd;
              }
            }
            .review_box{
              width:100%;
              .review_title_box{
                    width:100%;
                    height:90px;
                    padding:20px;
                    padding-top:40px;
                    margin-top:30px;
                    font-size:30pt;
                    font-weight:500;
                    border-top:2px solid #dddddd;
                }
            }
        }
        .right_side_box{
            width:40%;
            .info_box{
                width:100%;
                padding:20px;
                .product_name{
                    width:100%;
                    font-size:20pt;
                    font-weight:1000;
                    padding:10px;
                }
                .product_explain{
                    width:100%;
                    height:100px;
                    overflow:hidden;
                    padding:10px;
                }
                .product_price{
                    width:100%;
                    font-size:16pt;
                    font-weight:500;
                    padding:10px;

                }
                .product_option{
                    padding:10px;
                }
                .product_stock{
                    padding:10px;
                    width:100%;
                    height:50px;
                    display:flex;
                    .amount_label{
                        width:120px;
                        height:100%;
                        padding-top:5px;
                        padding-bottom:20px;
                    }
                    .stock_label{
                        width:100%;
                        height:100%;
                        padding-top:10px;
                        font-size:10pt;
                        text-align:right;
                    }
                    
                }
                .product_buy_button{
                    width:100%;
                    height:70px;
                    display:flex;
                    justify-content:center;
                    margin-top:20px;
                    .gray_button{
                        width:220px;
                        height:70px;
                        padding:5%;
                        font-size:15pt;
                        color:white;
                        text-align:center;
                        background-color:#707070;
                        margin-right:10px;
                        border-radius:5px;

                        cursor:pointer;
                    }
                }
            }
            .product_detail_label{
                width:100%;
                height:50px;
                font-size:15pt;
                font-weight:1000;
            }
            .detail_box{
                width:100%;
                border-top:2px solid #dddddd;
                padding:20px;
                margin-top:20px;
                
                .detail_explain{
                    font-size:11pt;
                }
            }
            .delivery_box{
                width:100%;
                padding:20px;
                margin-top:20px;
                border-top:2px solid #dddddd;
            }
            .profile_box{
                width:100%;
                border-top:2px solid #dddddd;
                padding:20px;
                margin-top:20px;
            }
        }
    }
`
const BigImage = styled.div`
    width:100%;
    height:100%;
    border:1px solid #dddddd;
    background-image:url(${props => props.imageURL});
    background-repeat:no-repeat;
    background-position:center center;
    background-size:contain;

`
const SmallImage = styled.div`
    min-width:140px;
    height:100%;
    border:1px solid #dddddd;
    margin-right:10px;
    background-image:url(${props => props.imageURL});
    background-repeat:no-repeat;
    background-position:center center;
    background-size:contain;
    cursor:pointer; 

`
const UserProfileImage = styled.div`
    width:100%;
    height:100%;
    border-radius:50%;
    background-image:url(${props => props.imageURL});
    background-repeat:no-repeat;
    background-position:center center;
    background-size:cover;
    border:1px solid #dddddd;
`
const FormText = styled.input.attrs({ type: 'text' })`
    width:50px;
    height:30px;
    border:1px solid #dddddd;
    padding:5px;
`
const OptionText = styled.input.attrs({ type: 'text' })`
    min-width:50px;
    max-width:250px;
    width:195px;
    height:30px;
    border:1px solid #dddddd;
    padding:5px;
`
const ReviewCommentBox = styled.div`
    *{
        font-family:Noto Sans KR;
        color:#707070;
    }
    width:100%;
    padding:20px;
    display:flex;

    .user_image_box{
        max-width:70px;
        max-height:70px;
        min-width:70px;
        min-height:70px;
        border-radius:50%;
        margin-right:10px;
    }
    .comment_box{
        width:100%;
        .user_name{
            width:100%;
            height:30px; 
            font-size:13pt;
            font-weight:500;
            padding:5px;
        }
        .user_comment{
            width:100%;
            font-size:12pt;
            padding:5px;
        }
        .buy_info_box{
            width:100%;
            height:100px;
            margin-top:5px;
            display:flex;
        }
        .product_img_box{
            width:100px;
            height:100%;
            margin-right:10px;
        }
        .option_info_box{
            width:80%;
            display:flex;
            align-items:center;
        }
        
    }
`
const OptionBox = styled.div`

    width:100%;
    height:50px;
    display:flex;
    .option_name{
        width:100px;
        height:100%;
        padding-top:20px;
        padding-bottom:20px;
    }
    .option_dropdown{
        width:100%;
        height:100%;
        padding-top:10px;
        padding-bottom:10px;
        display:flex;
        .dropdown_style{
            min-width:100px !important;
        }
    }
`
const CustomFormText = styled.input.attrs({ type: "text" })`
    width:${props => props.width}px;
    height:${props => props.height}px;
    padding:15px;
    font-family:Noto Sans KR;
    color:#707070;
    outline:none;
    border:1px solid #dddddd;
    margin-right:10px;
    background-color:${props => props.backgroundColor};
`
const CustomButton = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
    border:1px solid #dddddd;
    background-color:${props => props.backgroundColor};
    font-size:${props => props.fontSize}pt;
    font-weight:500;
    text-align:center;
    padding:${props => props.padding}px;
    margin-top:-1px;
    &:hover{
        // background-color:${props => props.onMouseColor};
        cursor:pointer;
    }
`
class ProductOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "", src: null,
    }
    this.onChangeEditBox = this.onChangeEditBox.bind(this);
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
    this.onChangeUploadImage = this.onChangeUploadImage.bind(this);
  }
  onChangeEditBox(event) {
    this.setState({ value: event.target.value });
  }
  onChangeDropdown(event, { value }) {
    this.setState({ value: { value }.value })
  }
  onChangeUploadImage(event) {
    const file = URL.createObjectURL(event.target.files[0]);
    this.setState({ src: file });
    this.setState({ value: event.target.value })
  }
  render() {
    const optionValues = this.props.options && this.props.options.split(",").map((item, key) => {
      return { value: key, text: item };
    });
    const optionType = this.props.type;
    console.log(this.state.value);
    return (
      <OptionBox>
        <div className="option_name">{this.props.name}</div>
        <div className="option_dropdown">
          {optionType === 0 ?
            <Dropdown value={this.state.value} selection type={this.props.type}
              options={optionValues} placeholder="옵션을 선택하세요" onChange={this.onChangeDropdown}></Dropdown>
            : null}
          {optionType === 1 ?
            <OptionText value={this.state.value} onChange={this.onChangeEditBox} />
            : null}
          {optionType === 2 ?
            <React.Fragment>
              <CustomFormText value={this.state.value} onChange={this.onChangeEditBox} width={150} height={35} backgroundColor={"#EFEFEF"} disabled />
              <label htmlFor="file" >
                <CustomButton width={80} height={35} backgroundColor={"#EFEFEF"} padding={10} fontSize={11}>...</CustomButton>
              </label>
              <input hidden onChange={this.onChangeUploadImage} id="file" type="file" />
            </React.Fragment>
            : null}

        </div>
      </OptionBox>
    );
  }
}
class ReviewComment extends Component {
  render() {
    return (
      <React.Fragment>
        <ReviewCommentBox>
          <div className="user_image_box">
            <UserProfileImage imageURL={this.props.who || who} />
          </div>
          <div className="comment_box">
            <div className="user_name">
              {this.props.name}
            </div>
            <div className="user_comment">
              {this.props.comment}
            </div>
            <div className="buy_info_box">
              <div className="product_img_box"><BigImage imageURL={this.props.img || noimg} /></div>
              <div className="option_info_box"><div>{this.props.option}</div></div>
            </div>
          </div>
        </ReviewCommentBox>
      </React.Fragment>
    );
  }
}
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { select_image: 0, productCount: 1, cartlist: "", };
    this.onClickPayment = this.onClickPayment.bind(this);
    this.onChangeBigImage = this.onChangeBigImage.bind(this);
    this.onClickCart = this.onClickCart.bind(this);
    this.onChangeProductCount = this.onChangeProductCount.bind(this);
  }
  async onClickCart() {
    console.log("cart gogo", this.props);

    if (this.props.userInfo != null) {
      const Result = { user_id: this.props.userInfo.uid, product_id: this.props.ProductDetail.uid, amount: document.getElementById('productCount').value }
      this.props.addCartRequest(Result, this.props.token);
    }
    else {
      this.state = { cartlist: cookie.load("cart") };

      const userID = this.props.userInfo == null ? -1 : this.props.userInfo.uid; // 
      const productID = this.props.ProductDetail.uid;
      const count = document.getElementById('productCount').value;
      const cartProduct = this.state.cartlist == null ? "/" : this.state.cartlist;
      const newCartProduct = userID + "," + productID + "," + count + "/";
      cookie.save("cart", cartProduct + newCartProduct, {
        path: '/',
      });
    }
  }
  onClickPayment() {
    window.location.href = "/payment" + "/" + this.props.ProductDetail.uid + "/" + this.props.ProductDetail.title + "/" +
      document.getElementById("productCount").value + "/" + this.props.ProductDetail.options + "/" + encodeURIComponent(this.props.ProductDetail.img[0].s_img);
  }
  onChangeBigImage(index) {
    this.setState({ select_image: index });
  }
  onChangeProductCount(event) {
    alert(event.target.value);
    this.setState({ productCount: event.target.value });
  }
  render() {
    console.log(this.props);
    const { ProductDetail } = this.props;
    const reviewComment = ProductDetail.reviews && ProductDetail.reviews.map((item, index) => {
      return <ReviewComment key={index} img={item.img} who={item.who} name={item.user_id} comment={item.comment} option="" />;
    })
    const optionList = ProductDetail.options && ProductDetail.options.map((item, index) => {
      return <ProductOption key={index} type={item.type} name={item.name} options={item.options} />;
    })
    const optionSmallImgList = ProductDetail.img && ProductDetail.img.map((item, index) => {
      return <SmallImage key={item + index} onClick={() => this.onChangeBigImage(index)} imageURL={item.m_img} />
    })

    console.log("productdetail", this.props);
    return (
      <React.Fragment>
        <MainBox>
          <div className="content_box">
            <div className="left_side_box">
              <div className="image_box">
                <div className="big_image_box">
                  <BigImage imageURL={ProductDetail.img && ProductDetail.img[this.state.select_image].l_img} />
                </div>
                <div className="small_image_box">
                  {optionSmallImgList}
                </div>
              </div>
              <div className="product_request">
                <div className="title_box">문의</div>
                <div>문의목록</div>
                <div>문의입력창</div>
                {/* <ProductInfoViewContainer /> */}
              </div>
              {/* <div> */}
              {/* <ViewContainer {...this.props} /> */}
              {/* </div> */}
              <div className="review_box">
                <div className="review_title_box">리뷰</div>
                <div className="">(이 상품의 판매자가 판매하는 모든 상품에 대한 리뷰입니다.)</div>
                {reviewComment} {/* <ReviewComment name="사용자1" comment="정말 멋집니다!" option="[컬러]레드"/> */}
              </div>
            </div>
            <div className="right_side_box">
              <div className="info_box">
                <div className="product_name">{ProductDetail.title}</div>
                <div className="product_explain"><TextFormat txt={ProductDetail.explanation} single /></div>
                <div className="product_price">₩{ProductDetail.price || 0}</div>
                <div className="product_option">
                  {optionList}
                </div>
                <div className="product_stock">
                  <div className="amount_label">수량</div>
                  <div><FormText id="productCount" onChange={this.onChangeProductCount} value={this.state.productCount} /></div>
                  <div className="stock_label">(재고:{ProductDetail.amount})</div>
                </div>
                <div className="product_buy_button">
                  <div className="gray_button" onClick={this.onClickCart}>장바구니</div>
                  <div className="gray_button" onClick={this.onClickPayment}>즉시구매</div>
                </div>
              </div>
              <div className="detail_box">
                <div className="product_detail_label">상품상세설명</div>
                <div className="detail_explain">
                  {ProductDetail.description}
                </div>
              </div>
              <div className="delivery_box">
                <div className="product_detail_label">배송정보</div>
                {ProductDetail && ProductDetail.delivery ?
                  <div className="delivery_explain">
                    배송사: {ProductDetail.delivery.company}<br />
                    배송기간: {ProductDetail.delivery.days}<br />
                    배송료: {ProductDetail.delivery.cost}<br />
                    반품: 반품료는 {ProductDetail.delivery.cost}원이며 반품시 택배 박스와 함께 <br />
                    현금을 동봉해주시기 바랍니다.<br />
                  </div> : "배송정보가 없습니다."}
              </div>
              <div className="profile_box">
                <div className="product_detail_label">판매자 정보</div>
              </div>
            </div>
          </div>
        </MainBox>
      </React.Fragment>
    );
  }
}

export default ProductDetail;
