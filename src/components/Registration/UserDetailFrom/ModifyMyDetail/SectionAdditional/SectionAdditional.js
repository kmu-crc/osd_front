import React, { Component } from "react";
import { FormControl, ValidationGroup } from "modules/FormControl";
import SelectBox from "components/Commons/SelectBox"
import { Dropdown } from "semantic-ui-react";

const category1 = [
  { value: 0, text: "대분류를 선택해 주세요" }, { value: 1, text: "패션" }, { value: 2, text: "제품" },
  { value: 3, text: "커뮤니케이션" }, { value: 4, text: "공간" }, { value: 5, text: "엔터테인먼트" },
  { value: 6, text: "소프트웨어" }, { value: 7, text: "새분야" }
]
const emptyCategory = [{ value: 0, text: "" }]
class SectionAdditional extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {categoryLevel1:0,categoryLevel2:0};
        this.onChangeCategory1 = this.onChangeCategory1.bind(this);
        this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    }
    shouldComponentUpdate(nextProps)
    {
      if(this.props.MyDetail!=nextProps.MyDetail)
      {
        this.setState({categoryLevel1:nextProps.MyDetail.category_level1,
                        categoryLevel2:nextProps.MyDetail.category_level2==null?0:nextProps.MyDetail.category_level2});
        this.props.updateCategory1(nextProps.MyDetail.category_level1);
        this.props.updateCategory2(nextProps.MyDetail.category_level2==null?0:nextProps.MyDetail.category_level2);


      }
      return true;
    }
    onChangeCategory1(event,{value})
    {
      this.setState({categoryLevel1:{value}.value});
      this.props.updateCategory1({value}.value);
    }
    onChangeCategory2(event,{value})
    {
      this.setState({categoryLevel2:{value}.value})
      this.props.updateCategory2({value}.value);
    }

    render()
    {
        return(
            <section id="additional" style={{ paddingLeft: "95.5px" }} >
            {/* category */}
            <div style={{ display: "flex" }}>
              <div style={{ width: "74px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>카테고리</div>
              <div style={{ marginLeft: "98px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                      <Dropdown onChange = {this.onChangeCategory1} style={{width:"410px",height:"56px", backgroundColor: "#EFEFEF", borderRadius: "5px",fontSize:"20px"}}
                      options={this.props.category1} selection name="cate1" ref="dropdown1" value = {this.state.categoryLevel1}  />
              </div>
              <div style={{ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                      <Dropdown onChange = {this.onChangeCategory2} style={{width:"410px",height:"56px", backgroundColor: "#EFEFEF", borderRadius: "5px",fontSize:"20px"}}
                       options={this.state.categoryLevel1==0?emptyCategory:this.props.category2[this.state.categoryLevel1]} selection  name="cate2" ref="dropdown2" value = {this.state.categoryLevel2} />
              </div> 
   
            </div>
          </section>
        );
    }
}
export default SectionAdditional;