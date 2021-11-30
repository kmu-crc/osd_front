import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import dropdown_arrow from "source/dropdown_arrow.svg"

const Info = styled.div`
  width:100%;
  font-family:Spoqa Han Sans;
  .title{width:159px;font-size:15px;font-weight:800;}
  .exp_title{width:65px;font-size:15px;font-weight:800;}
  .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
  .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
  .checked{width:24px;height:24px;}
  .careerBox{margin-top:25px;}
`
const Hrline = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  border-top:2px solid #dcdcdc;
  margin-left:auto;
  margin-right:auto;
`
const InputText = styled.input`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:0px 6px;
    border:none;
    outline:none;
`
const InputTextArea = styled.textarea`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:6px;
    border:none;
    outline:none;
`
const CategoryDropDown = styled(Dropdown)`
  max-width: 176px !important;
  max-height: 23px !important;;
  min-width: 176px !important;
  min-height: 23px !important;;

  padding:4px !important;

  outline: none !important;
  border: 0px !important;
  background-color: #c2c2c2 !important;

  .icon{
    max-width: 10px !important;
    max-height: 10px !important;;

    font-size:0.7em !important  ;
    background-image:url(${dropdown_arrow});
    background-size:contain;
    background-position:center;
    background-repeat:no-repeat;
    margin-top:-0.5em !important;
  
    ::before{
      display:none;
    }
  }
`

const emptyCategory = [{ value: 0, text: "" }]

class SectionAdditional extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryLevel1: 0, categoryLevel2: 0 };
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.onChangeCategory3 = this.onChangeCategory3.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        categoryLevel1: nextProps.MyDetail.category_level1 == null ? 7 : nextProps.MyDetail.category_level1,
        categoryLevel2: nextProps.MyDetail.category_level2 == null ? 27 : nextProps.MyDetail.category_level2,
        categoryLevel3: nextProps.MyDetail.category_level3 == null ? 0 : nextProps.MyDetail.category_level3
      });
      this.props.updateCategory1(nextProps.MyDetail.category_level1 == null ? 7 : nextProps.MyDetail.category_level1);
      this.props.updateCategory2(nextProps.MyDetail.category_level2 == null ? 27 : nextProps.MyDetail.category_level2);
      this.props.updateCategory3(nextProps.MyDetail.category_level3 == null ? 0 : nextProps.MyDetail.category_level3);


    }
    return true;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value, categoryLevel2: null, categoryLevel3: null });
    this.props.updateCategory1({ value }.value);
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value, categoryLevel3: null })
    this.props.updateCategory2({ value }.value);
  }
  onChangeCategory3(event, { value }) {
    this.setState({ categoryLevel3: { value }.value })
    this.props.updateCategory3({ value }.value);
  }

  render() {
    let category3Index = -1;
    let nCount = 0;
    for (let i in this.props.category2) {
      this.props.category2 && this.props.category2[i] && this.props.category2[i].map((item, index) => {
        if (item.value == this.state.categoryLevel2) {
          category3Index = nCount;
        }
        nCount++;
      })
    }
    console.log(this.state.categoryLevel2,this.state.categoryLevel1)
    return (
    
    <Info id="additional">
        <Hrline style={{marginTop:"15px"}}/>
        <div className="row">
        <div className="title">카테고리</div>
            <CategoryDropDown
              selection name="cate1" ref="dropdown1" onChange={this.onChangeCategory1} options={this.props.category1} value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
        </div>
        <div className="row">
          <div className="title"/>
          {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
            ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
            : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />}
        </div>
        <div className="row">
          <div className="title"/>
          {/* {category3Index} */}
          {category3Index > -1 && this.state.categoryLevel2==28
            ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
            : null}
        </div>
    </Info>);
  }
}
export default SectionAdditional;





// import React, { Component } from "react";
// import { Dropdown } from "semantic-ui-react";
// import styled from "styled-components";
// import opendesign_style from "opendesign_style";
// import dropdown_arrow from "source/dropdown_arrow.svg"

// const Info = styled.div`
//   width:100%;
//   font-family:Spoqa Han Sans;
//   .title{width:159px;font-size:15px;font-weight:800;}
//   .exp_title{width:65px;font-size:15px;font-weight:800;}
//   .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
//   .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
//   .checked{width:24px;height:24px;}
//   .careerBox{margin-top:25px;}
// `
// const DropDown = styled.div`
//     position: relative; 
        
//     select {
//       margin: 0px;
//       padding: 0px;
//       padding-left: 4px;
//       font-size: 14px;
//       width: 174px;
//       height: 23px;
//       background-color: #C9C9C9;
//       border: none;

//       -webkit-appearance: none;
//       -moz-appearance: none;
//       appearance: none;
//     }

//     .select-arrow {
//       position: absolute;
//       top: 5px;
//       right: 4px;
//       width: 0px;
//       height: 0px;
//       pointer-events: none;
//       border-style: solid;
//       border-width: 14px 8px 0 8px;
//       border-color: #000000 transparent transparent transparent;
//     }
// `
// const Hrline = styled.div`
//   width:${props=>props.width==null?"100%":props.width+"px"};
//   border-top:2px solid #dcdcdc;
//   margin-left:auto;
//   margin-right:auto;
// `
// const InputText = styled.input`
//     width:${props=>props.width}px;
//     height:${props=>props.height}px;
//     background-color:#c2c2c2;
//     padding:0px 6px;
//     border:none;
//     outline:none;
// `
// const InputTextArea = styled.textarea`
//     width:${props=>props.width}px;
//     height:${props=>props.height}px;
//     background-color:#c2c2c2;
//     padding:6px;
//     border:none;
//     outline:none;
// `
// const CategoryDropDown = styled(Dropdown)`
//   max-width: 176px !important;
//   max-height: 23px !important;;
//   min-width: 176px !important;
//   min-height: 23px !important;;

//   padding:4px !important;

//   outline: none !important;
//   border: 0px !important;
//   background-color: #c2c2c2 !important;

//   .icon{
//     max-width: 10px !important;
//     max-height: 10px !important;;

//     font-size:0.7em !important  ;
//     background-image:url(${dropdown_arrow});
//     background-size:contain;
//     background-position:center;
//     background-repeat:no-repeat;
//     margin-top:-0.5em !important;
  
//     ::before{
//       display:none;
//     }
//   }
// `

// const emptyCategory = [{ value: 0, text: "" }]

// class SectionAdditional extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { categoryLevel1: 0, categoryLevel2: 0 };
//     this.onChangeCategory1 = this.onChangeCategory1.bind(this);
//     this.onChangeCategory2 = this.onChangeCategory2.bind(this);
//     this.onChangeCategory3 = this.onChangeCategory3.bind(this);
//   }
//   shouldComponentUpdate(nextProps) {
//     if (this.props.MyDetail !== nextProps.MyDetail) {
//       this.setState({
//         categoryLevel1: nextProps.category_level1 == null ? 7 : nextProps.category_level1,
//         categoryLevel2: nextProps.category_level2 == null ? 27 : nextProps.category_level2,
//         categoryLevel3: nextProps.category_level3 == null ? 0 : nextProps.category_level3
//       });
//       this.props.updateCategory1(nextProps.category_level1 == null ? 7 : nextProps.category_level1);
//       this.props.updateCategory2(nextProps.category_level2 == null ? 27 : nextProps.category_level2);
//       this.props.updateCategory3(nextProps.category_level3 == null ? 0 : nextProps.category_level3);


//     }
//     return true;
//   }
//   onChangeCategory1(event, { value }) {
//     this.setState({ categoryLevel1: { value }.value, categoryLevel2: null, categoryLevel3: null });
//     this.props.updateCategory1({ value }.value);
//   }
//   onChangeCategory2(event, { value }) {
//     this.setState({ categoryLevel2: { value }.value, categoryLevel3: null })
//     this.props.updateCategory2({ value }.value);
//   }
//   onChangeCategory3(event, { value }) {
//     this.setState({ categoryLevel3: { value }.value })
//     this.props.updateCategory3({ value }.value);
//   }

//   render() {
//     let category3Index = -1;
//     let nCount = 0;
//     for (let i in this.props.category2) {
//       this.props.category2 && this.props.category2[i] && this.props.category2[i].map((item, index) => {
//         if (item.value == this.state.categoryLevel2) {
//           category3Index = nCount;
//         }
//         nCount++;
//       })
//     }
//     console.log(this.props.category2)
//     return (
//       <Info>
//         <div className="row">
//           <div className="title">카테고리</div>
//           <CategoryDropDown
//               selection name="cate1" ref="dropdown1" onChange={this.onChangeCategory1} options={this.props.category1} value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
//         </div>
//         <div className="row">
//           <div className="title"/>
//           {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
//               ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
//               : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />}
//         </div>
//         <div className="row">
//           <div className="title"/>
//           {category3Index > -1 && this.state.categoryLevel2==28
//               ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
//               : null}
//         </div>
//       </Info>
//     );
//   }
// }
// export default SectionAdditional;


  // onChangeCategory1 = async () => {
  //   await this.setState({
  //     categoryLevel1: document.getElementById("cate1").value,
  //     categoryLevel2: null,
  //     categoryLevel3: null
  //   });
  //   console.log(document.getElementById("cate1").value);
  //   this.props.updateCategory1(document.getElementById("cate1").value);
  // };
  // onChangeCategory2 = async () => {
  //   const value = await document.getElementById("cate2").value;
  //   await this.setState({
  //     categoryLevel2: value === "-1" ? null : value,
  //     categoryLevel3: null
  //   });
  //   console.log(document.getElementById("cate2").value);
  //   this.props.updateCategory2(document.getElementById("cate2").value);
  // };
  // onChangeCategory3 = async () => {
  //   await this.setState({
  //     categoryLevel3: document.getElementById("cate3").value
  //   });
  //   console.log(document.getElementById("cate3").value);
  //   this.props.updateCategory3(document.getElementById("cate3").value);
  // };
{/* <Wrapper id="additional">
      <div className="section">
        <div className="label">카테고리</div>
        <div className="content">
          <div className="cate-wrap">
            <CategoryDropDown
              selection name="cate1" ref="dropdown1" onChange={this.onChangeCategory1} options={this.props.category1} value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
          </div>
          <div className="cate-wrap">
            {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
              ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
              : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />}
          </div>
          <div className="cate-wrap">
            {category3Index > -1 && this.state.categoryLevel2==28
              ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
              : null}
          </div>
        </div>

      </div>
    </Wrapper> */}



    //   <Info>
    //   <div className="row">
    //       <div className="title">카테고리</div>
    //       <DropDown>
    //       <select
    //       onChange={this.onChangeCategory1}
    //       id="cate1"
    //       value={this.state.categoryLevel1} >
    //       {this.state.categoryLevel1 == null
    //         ? <option selected disabled value>{"카테고리(필수)"}</option>
    //         : null}
    //       {this.props.category1.map((cate1, index) =>
    //         <option
    //           selected={this.state.categoryLevel1}
    //           value={cate1.value}
    //           key={index}>
    //           {cate1.text}
    //         </option>
    //       )}
    //     </select>
    //     <div className="select-arrow"/>
    //   </DropDown>
    // </div>
    // <div className="row">
    //   <div className="title"/>
    //   {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]?
    //   <DropDown>
    //     <select
    //       onChange={this.onChangeCategory2}
    //       id="cate2"
    //       value={this.state.categoryLevel2} >
    //       <option selected disabled value>{"카테고리(선택)"}</option>
    //       {this.state.categoryLevel1 !== 0 && this.props.category2 && this.props.category2[this.state.categoryLevel1 - 1] &&this.props.category2[this.state.categoryLevel1 - 1].map((cate2, index) =>
    //         <option
    //           selected={this.state.categoryLevel2 === cate2.value}
    //           value={cate2.value}
    //           key={index}>
    //           {cate2.text}
    //         </option>
    //       )}
    //     </select>
    //     <div className="select-arrow"/>
    //   </DropDown>
    //   :
    //   <DropDown>
    //   <select
    //     onChange={this.onChangeCategory2}
    //     id="cate2"
    //     value={this.state.categoryLevel2} >
    //     <option selected disabled value>{"카테고리(선택)"}</option>
    //     {emptyCategory.map((cate2, index) =>
    //       <option
    //         selected={this.state.categoryLevel2 === cate2.value}
    //         value={cate2.value}
    //         key={index}>
    //         {cate2.text}
    //       </option>
    //     )}
    //   </select>
    //   <div className="select-arrow"/>
    // </DropDown>
    //   }
    // </div>
    // <div className="row">
    //   <div className="title"/>
    //   {category3Index > -1 && this.state.categoryLevel2==28?
    //   <DropDown>
    //     <select
    //       onChange={this.onChangeCategory3}
    //       id="cate3"
    //       value={this.state.categoryLevel3} >
    //       <option selected disabled value>{"카테고리(선택)"}</option>
    //       {category3Index > -1 && this.state.categoryLevel2==28&&this.props.category3[category3Index].map((cate3, index) =>
    //         <option
    //           selected={this.state.categoryLevel3 === cate3.value}
    //           value={cate3.value}
    //           key={index}>
    //           {cate3.text}
    //         </option>
    //       )}
    //     </select>
    //     <div className="select-arrow"/>
    //   </DropDown>
    //   :
    //   null}
    // </div>
    //   </Info>
