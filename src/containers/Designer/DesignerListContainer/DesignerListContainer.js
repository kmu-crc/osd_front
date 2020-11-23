import React, { Component } from 'react'
import { GetDesignerListRequest, GetDesignerTotalCountRequest } from "redux/modules/designer"
import { GetCategoryAllRequest } from "redux/modules/category"

import styled from 'styled-components'
import Category from "components/Commons/Category"
import OrderOption from "components/Commons/OrderOption"
import ScrollList from "components/Commons/ScrollList"
import Loading from "components/Commons/Loading"
import { connect } from "react-redux";
import opendesign_style from 'opendesign_style';

const Wrapper = styled.div`
  position: relative;
  .orderBox {
    margin-top: 10px;
    width: 100%;
    height: max-content;
  }
`;
const TextWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    top: 25px;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
    margin-top:100px;
    @media only screen and (max-width : 900px) {
    margin-top:150px;
    }
    .title{
    width:300px;
    text-align:center;
    }
`;
const JoinDesignerContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    padding:10px;
    .joinDesigner{
        width:max-content;
        height:29px;
        text-align: left;
        font-size: 20px;
        cursor: pointer;
        font-family: Noto Sans KR;
        font-weight:500;
        color: red;
        line-height: 29px;
        border-bottom: 1.5px solid red;
        margin-top:10px;
    }

`;
const ScrollListContainer = styled.div`
    padding-top: 100px;
    padding-bottom: 68px;
`;
const BlankDiv = styled.div`
    padding-top: 50px;
`;

class DesignerListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            reload: false,
            this_order: this.props.sort=="like"?{ text: "인기순", keyword: "like" }:{ text: "등록순", keyword: "update" },
            this_category: { text: null, value: null },
            main_category: { text: null, value: null }, sub_category: { text: null, value: null },third_category:{text:null,value:null},
            category2:[],
        };
        this.handleReload = this.handleReload.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
        this.handleChangeThirdCategory = this.handleChangeThirdCategory.bind(this);
        this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);
        this.getList = this.getList.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.handleCreateDesigner = this.handleCreateDesigner.bind(this);
        this.handleResize = this.handleResize.bind(this);

    }
    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignerTotalCountRequest(this.props.cate1,this.props.cate2,this.props.cate3) });
        this.props.GetDesignerListRequest(0,this.props.sort,this.props.cate1,this.props.cate2, this.props.cate3, null)
        window.addEventListener("resize", this.handleResize, false);
    }
    componentWillUpdate(nextProps){
        if(this.props.category1!==nextProps.category1){
            let main_category={text:"",value:""};
            nextProps.category1.map((item,index)=>{
              if(this.props.cate1==item.value){
                main_category.text=item.text;
                main_category.value=item.value;
              }
            })
            this.setState({main_category:main_category,this_category:main_category});
        }
        if(this.props.category2!==nextProps.category2){
          let sub_category={text:null,value:null};
          let nCount = 0;
          let nParent=-1;
          this.props.cate1&&nextProps.category1.map((item,index)=>{
            if(this.props.cate1==item.value){
              nParent=nCount;
            }
            nCount++;
          })
          nParent!=-1&&nextProps.category2[nParent].map((item,index)=>{
            if(this.props.cate2==item.value){
              sub_category.text=item.text;
              sub_category.value=item.value;
              sub_category.parent=nParent;
            }
          })
          this.setState({sub_category:sub_category,category2:nextProps.category2[nParent]});
          if(this.props.cate2!==null){
            this.setState({this_category:sub_category});
          }
        }
        if (this.props.category3 !== nextProps.category3) {
            let third_category = {text:null,value:null};
            let nCount=0;
            let nParent;
            for(let i in nextProps.category2){
              nextProps.category2&&nextProps.category2[i]&&nextProps.category2[i].map((item,index)=>{
                if(this.props.cate2==item.value){
                  nParent = nCount;
                }
                nCount++;
              })
            }
            nParent != -1 &&nextProps.category3[nParent]&&nextProps.category3[nParent].map((item, index) => {
              if (this.props.cate3 == item.value) {
                third_category.text = item.text;
                third_category.value = item.value;
                third_category.parent = nParent;
              }
            })
            this.setState({ third_category: third_category, category3: nextProps.category3[nParent] });
            if (this.props.cate3 !== null) {
              this.setState({ this_category: third_category });
            }
          }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, false);
    };
    handleReload() {
        this.setState({ reload: !this.state.reload });
    }
    handleResize() {
        this.setState({ screenWidth: window.innerWidth })
    }
    async handleChangeCategory(category) {
        await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
        this.props.GetDesignerTotalCountRequest(category.value, null, null);
        this.handleReload();
        this.getList(0);

        const orderkeyword=this.props.sort==null?"update":`${this.props.sort}`;

        window.location.href = "/designer"+`/${orderkeyword}`+"/"+category.value;
    }
    async handleChangeSubCategory(parent, category) {
        await this.setState({ main_category: parent, this_category: category, sub_category: category });
        this.props.GetDesignerTotalCountRequest(this.state.main_category.value, category.value, null);
        this.handleReload();
        this.getList(0);

        const orderkeyword=this.props.sort==null?"update":`${this.props.sort}`;

        window.location.href="/designer"+`/${orderkeyword}`+"/"+parent.value+"/"+category.value;
    }
    async handleChangeThirdCategory(old_parent,parent,category){
        console.log(old_parent,parent,category.value);
        await this.setState({ main_category: old_parent, this_category: category, sub_category: parent, third_category:category });
        this.props.GetDesignerTotalCountRequest(this.state.main_category.value, this.state.sub_category.value, category.value);
        this.handleReload();
        this.getList(0);
        const orderkeyword = this.props.sort == null ? "update" : `${this.props.sort}`;
        window.location.href = "/designer" + `/${orderkeyword}` + "/" + old_parent.value + "/" + parent.value+ "/" + category.value;
      }
    async handleChangeOrderOps(order) {
        await this.setState({ this_order: order })
        this.handleReload();
        this.getList(0);

        const orderkeyword=order.keyword==null?"":`/${order.keyword}`;
        const cate1=this.props.cate1==null?"":`/${this.props.cate1}`;
        const cate2=this.props.cate2==null?"":`/${this.props.cate2}`;
        window.location.href = "/designer"+orderkeyword+cate1+cate2;
    }
    async getList(page) {
        const { main_category, sub_category, third_category, keyword, this_order } = this.state;
        this.props.GetDesignerListRequest(page, this_order.keyword, main_category.value, sub_category.value, third_category.value, keyword);
    }
    changeCategory(category) {
        if (this.state.this_category === category) {
            return;
        }
        this.handleChangeCategory(category)
    }
    handleCreateDesigner() {
        let href = window.location.href.substring(0, window.location.href.search("designer"))
        window.location.href = href + 'createdesigner';
    }

    render() {
        const { main_category, this_category, sub_category,third_category, reload, this_order } = this.state
        const { category1, category2, category3, Count, status } = this.props;
        return (<React.Fragment>
            <Wrapper>
            <Category thirdcategory_clicked={this.handleChangeThirdCategory} subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
            category1={category1} category2={this.state.category2} category3={this.state.category3} main_selected={main_category} sub_selected={sub_category} third_selected={third_category} />

                <TextWrapper centerPos={this.state.screenWidth} onClick={() => this.changeCategory(main_category)}>
                    <div className="title">{(this_category && this_category.text === "전체" ? "디자이너" : this_category.text) || "디자이너"}&nbsp;({Count})</div>
                </TextWrapper>

                <JoinDesignerContainer>
                    <div className="joinDesigner" onClick={() => this.handleCreateDesigner()}>디자이너 등록하기</div>
                </JoinDesignerContainer>

                <div className="orderBox">
                    <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
                </div>

                <ScrollListContainer>
                    {status === "INIT"
                        ? <Loading />
                        : <ScrollList
                            {...opendesign_style.designer_margin}
                            type="designer"
                            reload={reload}
                            handleReload={this.handleReload}
                            dataList={this.props.dataList}
                            dataListAdded={this.props.dataListAdded}
                            getListRequest={this.getList} />}
                </ScrollListContainer>
            </Wrapper>
            <BlankDiv />
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.DesignerList.status.DesignerList,
        dataListAdded: state.DesignerList.status.DesignerListAdded,
        category1: state.Category.status.category1,
        category2: state.Category.status.category2,
        category3: state.Category.status.category3,
        Count: state.DesignerList.status.Count,
        status: state.DesignerList.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetDesignerListRequest: (page, sort, cate1, cate2, cate3, keyword) => {
            return dispatch(GetDesignerListRequest(page, sort, cate1, cate2, cate3, keyword))
        },
        GetDesignerTotalCountRequest: (cate1, cate2, cate3) => {
            return dispatch(GetDesignerTotalCountRequest(cate1, cate2, cate3))
        },
        GetCategoryAllRequest: () => {
            return dispatch(GetCategoryAllRequest())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer)
