import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"
import opendesign_style from "opendesign_style"

const Container = styled.div`
    display:flex;
    width:100%;
    .category{

    }
    .main_category{
        width:100%;
        display:flex;
    }
    .sub_category{
        width:max-content;
        margin-top:9px;
        display:flex;
        height:41px;
        padding:6px 26px 7px 26px;
        border:1px solid #eaeaea;
        background-color:white;
        box-shadow: 8px 8px 8px #4141411A;
    }
    .selected{
        color:red;
    }

    .button{
        min-width:174px;
        height:41px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
        font-size:20px;
        font-family:Spoqa Han Sans Neo;
        font-weight:medium;
        box-shadow: 8px 8px 8px #0000002B;
        cursor:pointer;
        margin-right:51px;
    }
    .blue{background-color:#1262AB;}
    .purple{background-color:#7E1E9B;}
    .green{background-color:#1E9B79;}
`
const Main_element = styled.div`
    height:41px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:24px;
    font-family:Spoqa Han Sans Neo;
    font-weight:Medium;
    cursor:pointer;
    margin-right:26px;

`
const SubCateElement =styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:20px;
    font-family:Spoqa Han Sans Neo;
    font-weight:Light;
    padding:10px;
    cursor:pointer;
    margin-left:10px;
    margin-right:10px;
`

class Category extends Component {
    static contextType = MenuContext
    constructor(props) {
        super(props);
        this.clickedMainCategory = this.clickedMainCategory.bind(this);
        this.clickedSubCategory = this.clickedSubCategory.bind(this);
        this.clickedThirdCategory=this.clickedThirdCategory.bind(this);
    }
    clickedMainCategory(category) {
        this.props.category_clicked(category)
        this.setState({ parent: category.value })
    }
    clickedSubCategory(category) {
        this.props.subcategory_clicked(this.props.main_selected, category)
    }
    clickedThirdCategory(category){
        this.props.thirdcategory_clicked(this.props.main_selected,this.props.sub_selected,category);
    }
    render() {
        // console.log("width",window.innerWidth);
        const { category1, category2, category3, main_selected, sub_selected, third_selected } = this.props;
        const selected = sub_selected && sub_selected.value;
        const selected2 = third_selected && third_selected.value;
        const hidemenu = this.context.hidemenu ? "hidemenu " : "";
        const larger = this.context.larger ? "larger " : "";

        const isDesign =window.location.pathname === "/design"
        || window.location.pathname.search("/design/") > -1 ? true : false
        || window.location.pathname.search("/designDetail/") > -1 ? true : false
        || window.location.pathname.search("/createDesign/") > -1 ? true : false
        || window.location.pathname.search("/modifyDesign/") > -1 ? true : false;
        const isGroup = window.location.pathname === '/group'
        || window.location.pathname.search("/group/") > -1 ? true : false
        || (window.location.pathname.search('/groupDetail/') > -1 ? true : false)
        || window.location.pathname.search("/createGroup/") > -1 ? true : false
        || window.location.pathname.search("/modifyGroup/") > -1 ? true : false;
        const isDesigner = window.location.pathname === '/designer'
        || window.location.pathname.search("/designer/") > -1 ? true : false
        || (window.location.pathname.search('/designerDetail/') > -1 ? true : false)
        || window.location.pathname.search("/createDesigner/") > -1 ? true : false
        || window.location.pathname.search("/modifyDesigner/") > -1 ? true : false;
        
        return (<Container className={`${hidemenu}${larger}`} >
            {isDesign == true?
            <div className="button blue" onClick={()=>window.location.href="/createDesign"}>디자인 등록하기</div>:null}
            {isGroup == true?
            <div className="button green" onClick={()=>window.location.href="/createGroup"}>그룹 등록하기</div>:null}
            {isDesigner == true?
            <div className="button purple" onClick={()=>window.location.href="/createDesigner"}>디자이너 등록하기</div>:null}
            
            <div className="category">
            <div className="main_category">

            {!isGroup&&category1.map((element,index) => {
                console.log(index);
                return(
                    <React.Fragment>
                        <Main_element className={`${main_selected && main_selected.value === element.value ? "selected" : ""}`}
                                      onClick={() => this.clickedMainCategory(element)} key={element.value}>
                        {element.text}
                        </Main_element>
                    </React.Fragment>
                ) 
            })}
            
            </div>
            {!isGroup&&main_selected.value&&
            <div className="sub_category">
            {category2 && category2.length > 0 && category2.map(element => {
                const style = element.value === selected ? "selected " : ""
                return <SubCateElement
                    className={`${style}`}
                    onClick={() => this.clickedSubCategory(element)}
                    key={element.value}>{element.text}</SubCateElement>
            })}
            </div>
            }
            </div>
            {/* 
            <ThirdCategory screenWidth={window.innerWidth}>
            {category3 && category3.length > 0 && category3.map(element => {
                const style = element.value === selected2 ? "selected " : ""
                return <ThirdCateElement
                    className={`${style}`}
                    onClick={() => this.clickedThirdCategory(element)}
                    key={element.value}>{element.text}</ThirdCateElement>
            })}
            </ThirdCategory> */}
        </Container>)
    }
}

export default Category;

{/* <MainCategory>
{category1.map(element => {
    return <MainCateElement
        className={main_selected && main_selected.value === element.value ? "selected" : ""}
        onClick={() => this.clickedMainCategory(element)}
        key={element.value}>{element.text}</MainCateElement>
})}</MainCategory>
<SubCategory screenWidth={window.innerWidth}>
{category2 && category2.length > 0 && category2.map(element => {
    const style = element.value === selected ? "selected " : ""
    return <SubCateElement
        className={`${style}`}
        onClick={() => this.clickedSubCategory(element)}
        key={element.value}>{element.text}</SubCateElement>
})}
</SubCategory>
<ThirdCategory screenWidth={window.innerWidth}>
{category3 && category3.length > 0 && category3.map(element => {
    const style = element.value === selected2 ? "selected " : ""
    return <ThirdCateElement
        className={`${style}`}
        onClick={() => this.clickedThirdCategory(element)}
        key={element.value}>{element.text}</ThirdCateElement>
})}
</ThirdCategory> */}


// const Container = styled.div`
//     height: ${props => props.height};
//     width: 100%;
//     top: 50px;
//     position: relative;
//     z-index: 800;
//     background-color: #FFFFFF;
//     &.hidemenu {
// 		top: -55px;
// 		opacity: 0;
//     }&.larger {;}
//     -webkit-transition: all 0.45s;
// 	-moz-transition: all 0.45s;
// 	-ms-transition: all 0.45s;
// 	-o-transition: all 0.45s;
//     transition: all 0.45s;

// `
// const MainCategory = styled.div`
//     width: 100%;
//     position: fixed;
//     z-index: 820;
//     padding-top:15px;
//     top: 55px;
//     display: flex;
//     justify-content:center;
//     background-color: #FFFFFF;
//     @media only screen and (max-width : 900px) {
//     top:100px;
//     padding-left:30px;
//     justify-content:flex-start;
//     overflow:scroll;
//     ::-webkit-scrollbar { display: none; }

//     }

//     @media only screen and (min-width : 1920px) {
//         width:1920px;
//     }

//     @media only screen and (max-width : 450px) {
//         top:140px;
//     }

// `
// const MainCateElement = styled.div`
//     z-index: 820;
//     height: 29px;
//     font-size: 18px;
//     font-weight: 300;
//     font-family: Noto Sans KR;
//     line-height: 29px;
//     text-align: left;
//     color: #FF0000;
//     margin-right: 25px;    
//     cursor: pointer;
//     white-space:nowrap;
//     padding-right:5px;
    
//     &.selected {
//         font-weight: 500;
//     }


// `
// const SubCategory = styled.div`
//     z-index: 810;
//     position: fixed;
//     width:${props => props.screenWidth < 1920 ? window.innerWidth + "px" : "1920px"};
//     top: 85px;
//     padding-top: 17px;
//     height:70px;
//     display: flex;
//     justify-content: center;
//     background-color: #FFFFFF;
//     margin-right:25px;

//     @media only screen and (max-width : 900px) {
//         top:120px;
//         overflow:scroll;
//         padding-left:30px;
//         justify-content: center;
//         ::-webkit-scrollbar { display: none; }
        
//     }
//     @media only screen and (min-width : 1920px) {
//         width:1920px;
//     }

//     @media only screen and (max-width : 450px) {
//         top:150px;
//     }

// `
// const SubCateElement = styled.div`
//     z-index: 810;
//     height: 29px;
//     font-size: 18px;
//     font-weight: 300;
//     font-family: Noto Sans KR;
//     line-height: 29px;
//     text-align: center;
//     color: #707070;
//     margin-right: 15px;    
//     padding-right:5px;
//     white-space:nowrap;

//     &.selected {
//         color: #FF0000;
//     }
//     &:hover {
//         color: #FFA0A0;
//     }
//     cursor: pointer;
// `
// const ThirdCategory = styled.div`
//     z-index: 810;
//     position: fixed;
//     width:${props => props.screenWidth < 1920 ? window.innerWidth + "px" : "1920px"};
//     top: 120px;
//     // padding-top: 17px;
//     height:40px;
//     display: flex;
//     justify-content: center;
//     background-color: #ffffff;
//     margin-right:25px;
//     @media only screen and (max-width : 900px) {
//         justify-content: center;
//         ::-webkit-scrollbar { display: none; }
//     }
//     @media only screen and (max-width : 900px) {
//         top:120px;
//         overflow:scroll;
//         padding-left:30px;
//         justify-content: flex-start;
//         ::-webkit-scrollbar { display: none; }
//     }
// `
// const ThirdCateElement = styled.div`
//     z-index: 810;
//     height: 29px;
//     font-size: 20px;
//     font-weight: 300;
//     font-family: Noto Sans KR;
//     line-height: 29px;
//     text-align: center;
//     color: #707070;
//     margin-right: 15px;    
//     padding-right:5px;
//     white-space:nowrap;

//     &.selected {
//         color: #FF0000;
//     }
//     &:hover {
//         color: #FFA0A0;
//     }
//     cursor: pointer;
// `