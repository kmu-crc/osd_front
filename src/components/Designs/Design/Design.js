import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import TextFormat from 'modules/TextFormat';
import { geturl } from 'config';

const Exchange = (unit, price) => {
  return unit === '$' ? '$ ' + (price / 1200).toFixed(1) : '₩ ' + price;
};
const ProductBox = styled.div`
    .img-box {
        border: 1px solid #E0E0E0;
        // width: 170px;
        height: 145px;
        background-image: url(${pros => pros.img});
        background-color: #EAEAEA;
        background-size: cover;
    }
    .info-box {
        display: flex;
        flex-direction: column;
        height: 75px;
        background-color: #E0E0E0;
        .title {
            display: flex;
            margin-left: 5px;
            margin-right: 5px;
        }
        .user {
            font-size: 0.9rem;
            color: #707070;
            margin-left: 5px;
            margin-right: 5px;
        }
        .score-and-review {
            display: flex;
            .score {
                
            }
            .review {
                font-size: 12px;
                :hover{
                    text-decoration: underline;
                }
            }
            justify-content: space-between;
            margin-left: 5px;
            margin-right: 5px;
        }
        .price {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
`;
const loading = { thumbnailUrl: { m_img: '' }, name: '로딩중...', userName: "로딩중...", price: 0, unit: 'won', score: 0, like: 0 };
class Design extends Component {
  constructor(props) {
    super(props);
    this.gotoDetail = this.gotoDetail.bind(this);
  }
  gotoDetail = (id) => {
    window.location.href = geturl() + `/productDetail/${id}`;
  }
  render() {
    const product = this.props.data || loading;
    // console.log("PRODUCT", product);
    return (<ProductBox img={product.thumbnailUrl && product.thumbnailUrl.m_img} onClick={() => this.gotoDetail(product.uid)}>
      <div className="img-box" />
      <div className="info-box">
        <div className="title"><TextFormat chars="24" txt={product.title || ""} /></div>
        <div className="user">{product.userName}</div>
        <div className="score-and-review">
          <div className="score">{Star(product.score)}</div>
          <div className="review">({NumberFormat(product.review)})</div>
        </div>
        <div className="price">{Exchange(product.unit || '₩', product.price)}</div>
      </div>
    </ProductBox>)
  }
}

// export default Product;

// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { Icon } from "semantic-ui-react";
// import eximg from "source/myPage.jpeg";
// import StyleGuide from "StyleGuide";
// import DateFormat from "modules/DateFormat";
// import NumberFormat from "modules/NumberFormat";
// import TextFormat from "modules/TextFormat";
// import MoneyStyle from "modules/MoneyStyle";
// // css styling

// const Designli = styled.li`
//   width: 100%;
//   margin: 0 auto 2rem;
//   font-size: 13px;
//   border-radius: 3px 3px 3px 3px;
//   overflow: hidden;
//   box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
//   background-color: #fff;
//   text-align: left;
//   list-style-type: none;
// `;
// const ImgPart = styled.div`
//   width: 100%;
//   height: 140px;
//   overflow: hidden;
//   background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   padding: 3px 3px;
//   div.icon-span{
//     border-radius: 15%;
//     background-color:#FFF;
//     width: 23px;
//     height: 23px;
//     box-shadow: 0px 0.2px ${StyleGuide.color.geyScale.scale7};
//   }
//   i.icon-fork{
//     color: ${StyleGuide.color.main.dark};
//   }
// `;
// const TextPart = styled.div`
//   padding: 10px 10px;
//   font-size: ${StyleGuide.font.size.paragraph};
//    .title {
//     font-weight: bold;
//     line-height: 20px;
//     height: 20px;
//     color: ${StyleGuide.color.geyScale.scale7};
//     font-size: 16px;
//   }
//    .userName {
//     line-height: 1.35;
//     margin: 5px 0;
//     color: ${StyleGuide.color.geyScale.scale6};
//   }
//    .cate {
//     color: ${StyleGuide.color.main.basic};
//     font-weight: 300;
//     font-size: ${StyleGuide.font.size.small};
//   }
//    .update {
//     color: ${StyleGuide.color.geyScale.scale9};
//     width: max-content;
//     font-size: 20px;
//     padding-left : 10px;
//     float: right;
//   }
// `;
// const Count = styled.div`
//   background-color: #fff;
//   padding: 5px 10px;
//   color: ${StyleGuide.color.geyScale.scale6};
//   border-top: 1px solid ${StyleGuide.color.geyScale.scale1};
//   font-weight: 400;
//   font-size: 12px;
//   & div {
//     float: left;
//     padding-right: 10px;
//   }
//   &::after{
//     display: block;
//     content: "";
//     clear: both;
//   }
//   & .fork{
//     transform: translateY(25%) rotate(90deg);
//   }
// `;

// class Design extends Component {
//   render() {
//     let design = this.props.data;
//     const price = design.price || 0;
//     return (
//       <NavLink to={`/designDetail/` + design.uid}>
//         <Designli>
//           <ImgPart style={design.thumbnailUrl ? { backgroundImage: `url(${design.thumbnailUrl.m_img})` } : { backgroundImage: `url(${eximg})` }}>
//             {design.parent_design === null
//               ? null
//               : <div className="icon-span">
//                 <i className="icon fork large icon-fork" />
//               </div>
//             }
//           </ImgPart>
//           <TextPart>
//             <div className="title"><TextFormat txt={design.title} /></div>
//             {design.is_project === 1
//               ? <div className="userName" style={{ display: "flex", justifyContent: "space-between" }}><TextFormat style={{ flex: "1" }} txt={design.userName} chars={9} /><div style={{ flex: "1" }}>님의 프로젝트</div></div>
//               : <div className="userName" style={{ display: "flex" }}><TextFormat txt={design.userName} chars={10} /> 님의 작품</div>
//             }
//             <div className="cate">
//               {design.categoryName ? design.categoryName : "전체"}
//               <span className="update"> {MoneyStyle(price)}</span>
//               {/* <div style={{ width: "max-content", backgroundColor: "white", marginTop: "110px", marginLeft: "auto", marginRight: "5px", fontSize: "25px" }}>$10,000</div> */}
//               {/* {DateFormat(design.update_time)} */}
//             </div>
//           </TextPart>
//           <Count>
//             <div>
//               <Icon name="unhide" />
//               {design.view_count ? NumberFormat(design.view_count) : 0}
//             </div>
//             <div>
//               <Icon name="heart" />
//               {design.like_count ? NumberFormat(design.like_count) : 0}
//             </div>
//             <div>
//               <Icon name="fork" />
//               {design.children_count ? NumberFormat(design.children_count) : 0}
//             </div>
//           </Count>
//         </Designli>
//       </NavLink>
//     );
//   }
// }

export default Design;
