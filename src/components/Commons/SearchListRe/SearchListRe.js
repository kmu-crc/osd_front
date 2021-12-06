import React, { Component } from "react";
import styled from "styled-components";
import new_logo_zoom_red from "source/new_logo_zoom_red.svg";
import OrderOption from "components/Commons/OrderOption"
import { Dropdown } from "semantic-ui-react";
import 'react-dropdown/style.css'
import Category from "components/Commons/Category"
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer"
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer"
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer"
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesigncss from "opendesign_style";

const SearchContainer = styled.div`
    // margin-top: 90px;
    // margin-left:100px;
    padding:43px 85px;
    max-width:1920px;
    width: 100%;

    // *{ border: 1px dashed black; }
    @media only screen and (max-width: 1000px) {
        width: 100vw;
    }
    @media only screen and (min-width: 1920px) {
        width:100vw;
    }
    .search_header{
        width:100%;
        height:47px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:83px;

    
    }
    .search_dropdown{
        min-width:270px;
        height:100%;   
        .dropdown{
            max-width:239px;
            max-height:40px !important;     
            font-family:Spoqa Han Sans,Regular;
            font-size:18px !important;
            background-color:#b6b6b6 !important;
            margin-right:68px;
            position:absolute;
            border-radius:0px;
            z-index:999 !important;
            .text{
              color:black !important;
            }
            .item{
              background-color:#8e8e8e !important;
            }
        }
    }
    .search_form{
        max-width:930px;
        min-width:200px;
        width:100%;
        position:relative;
        .inputForm{
            max-width: 930px;
            min-width: 200px;
            width:100%;
            height:47px;
            outline:none;
            border:none;
            border-bottom:1px solid #707070;
            padding:5px 43px;
            font: normal normal normal 30px/42px Spoqa Han Sans Neo;
        }
        .button{
            width:47px;
            height:47px;
            object-fit:contain;
            position:absolute;
            right:0px;
            bottom:0px;
        }
    }
    .search_order{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .result_list{
        width:100%;
        display:flex;
        justify-content:center;
        // padding-left:40px;
        .result{
            max-width:1820px;
            width:100%;
        }
    }
`;


class SearchListRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            searchKeyword: "",
            mainCate: [{ value: 1, text: "디자인" }, { value: 2, text: "그룹" }, { value: 3, text: "디자이너" }],
            selectCate: 1,
            this_order: { text: "등록순", keyword: "update" },
            urlCate: "design",
            this_category: { text: null, value: null },
            sub_category: { text: null, value: null },
            main_category: { text: null, value: null },
            third_category: { text: null, value: null },
        }
        this.onChangeDropBox = this.onChangeDropBox.bind(this);
        this.onChangeSearchkey = this.onChangeSearchkey.bind(this);
    };

    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignListCountRequest() });
        // const addrText = window.location.href.toString();
        // if (addrText.indexOf('group') !== -1) { this.setState({ selectCate: 2, urlCate: "group" }) }
        // else if (addrText.indexOf('designer') !== -1) { this.setState({ selectCate: 3, urlCate: "designer" }) }
        // else if (addrText.indexOf('design') !== -1) { this.setState({ selectCate: 1, urlCate: "design" }) }
        // else { this.setState({ selectCate: 1 }) }
        const keyword = this.props.keyword == null ? "" : this.props.keyword;
        this.setState({ searchKeyword: keyword, keyword: keyword });
    }
    componentDidUpdate(prevProps, prevState) {
        if ((JSON.stringify(prevProps.designs) !== JSON.stringify(this.props.designs)) ||
            (JSON.stringify(prevProps.groups) !== JSON.stringify(this.props.groups)) ||
            (JSON.stringify(prevProps.designers) !== JSON.stringify(this.props.designers))
        ) {
            const designs = this.props.designs.length || 0
                , groups = this.props.groups.length || 0
                , designers = this.props.designers.length || 0;

            console.log(designs, groups, designers);
            if (designs) { this.setState({ selectCate: 1, urlCate: "design" }); }
            else if (groups) { this.setState({ selectCate: 2, urlCate: "group" }); }
            else if (designers) { this.setState({ selectCate: 3, urlCate: "designer" }); }
        }
        if (prevState.searchKeyword !== this.state.searchKeyword) {
            this.setState({ searchKeyword: this.state.searchKeyword });
        }
    }
    async onChangeSearchkey(event) {
        let regExp = /^[a-zA-Zㄱ-힣0-9\s"_-]*$/i;
        if (regExp.test(event.target.value) === false) {
            await alert("특수문자는 사용할 수 없습니다.");
            return;
        }
        this.setState({ searchKeyword: event.target.value })
    }
    submitEnter = async (e) => {
        if (e.keyCode === 13) {
            await this.setState({ keyword: e.target.value });
            this.onSearchSubmit(this.state.keyword);
        }
    };

    onSearchSubmit = async (_) => {
        if (this.state.keyword == null || this.state.keyword === "") {
            await alert("키워드를 입력해주세요");
        } else {
            const urll = encodeURIComponent(`${this.state.keyword}`);
            this.props.history.replace(urll);
            window.location.href = urll;
        }
    };
    onChangeDropBox(_, { value }) {
        const typevalue = { value }.value;
        const cates = ["all", "design", "group", "designer"];
        this.setState({ selectCate: typevalue, urlCate: cates[typevalue] || 1 });
        this.props.history.replace(`/search/${this.props.sort}/${this.props.keyword}`);
    };

    handleChangeCategory = async (category) => {
        await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    }
    handleChangeSubCategory = async (parent, category) => {
        await this.setState({ main_category: this.props.category1[parent.value - 1], this_category: category, sub_category: category })
    }
    // handleChangeThirdCategory = async (parent, category) => {
    //     let category3Index = -1;
    //     let nCount=0;
    //     for(let i in this.props.category2){
    //       this.props.category2&&this.props.category2[i]&&this.props.category2[i].map((item,index)=>{
    //           if(item.value == this.state.categoryLevel2){
    //             category3Index = nCount;
    //           }
    //           nCount++;
    //         })
    //     }
    //     await this.setState({ main_category: this.props.category1[parent.value - 1], sub_category: category })
    // }

    handleChangeOrderOps = async (order) => {
        await this.setState({ this_order: order })
    }

    render() {
        // const { category1, category2 } = this.props;
        // const { main_category, sub_category } = this.state;
        console.log(this.state.selectCate, this.state.urlCate);

        return (<SearchContainer>
            <div className="search_header">
                <div className="search_dropdown">
                    <Dropdown
                        className="dropdown"
                        id="dropbox"
                        options={this.state.mainCate}
                        selection
                        name="searchcate"
                        onChange={this.onChangeDropBox}
                        value={this.state.selectCate} />
                </div>
                <div className="search_form">
                    <input
                        className="inputForm"
                        id="searchInput"
                        placeholder="검색어를 입력하세요"
                        value={this.state.searchKeyword}
                        onChange={this.onChangeSearchkey}
                        onKeyDown={this.submitEnter}
                        maxLength="100"
                    />
                    <img src={new_logo_zoom_red} className="button" onClick={this.onClickedIcon} />
                </div>
                <div className="search_order">
                    <OrderOption
                        order_clicked={this.handleChangeOrderOps}
                        selected={this.state.this_order} />
                </div>
            </div>
            {/* <div className="search-form">
                    <SearchForm >
                        <div className="shadow_button" onClick={this.onClickedIcon} />
                        <input
                            className="searchInput"
                            id="searchInput"
                            placeholder="검색어를 입력하세요"
                            value={this.state.searchKeyword}
                            onChange={this.onChangeSearchkey}
                            onKeyDown={this.submitEnter}
                            maxLength="100"
                        />
                    </SearchForm>
                </div>

                <div className="cate-and-order">
                    <div className="cate">
                        <Dropdown
                            style={{ zIndex: "900" }}
                            id="dropbox"
                            options={this.state.mainCate}
                            selection
                            name="searchcate"
                            onChange={this.onChangeDropBox}
                            value={this.state.selectCate} />
                    </div>
                    <div className="order">
                        <OrderOption
                            order_clicked={this.handleChangeOrderOps}
                            selected={this.state.this_order} />
                    </div>
                </div> */}

            <div className="result_list">
                <div className="result">
                    <div style={{ display: this.state.urlCate === "design" ? "block" : "none" }}>
                        <ScrollDesignListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            cate3={this.state.third_category.value}
                            orderOption={this.state.this_order}
                            display={this.state.urlCate=="design"}
                        />

                    </div>

                    <div style={{ display: this.state.urlCate === "group" ? "block" : "none" }}>
                        <ScrollGroupListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            cate3={this.state.third_category.value}
                            orderOption={this.state.this_order}
                            display={this.state.urlCate=="group"}
                        />
                    </div>

                    <div style={{ display: this.state.urlCate === "designer" ? "block" : "none" }}>
                        <ScrollDesignerListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            cate3={this.state.third_category.value}
                            orderOption={this.state.this_order}
                            display={this.state.urlCate=="designer"}
                        />
                    </div>
                </div>
            </div>
        </SearchContainer >
        )
    }
}

export default SearchListRe;
