import React, { Component } from "react";
import styled from "styled-components";
import zoom from "source/zoom.svg";
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
    position: relative;
    overflow: hidden;
    *{ border: 1px solid red; }
`;
const SearchForm = styled.div`
    // width: 100%;
    font-family: Noto Sans KR;
    position: relative;
    margin-top: 50px;
    justify-content: column;
    .searchBox {
        display:flex;
        justify-content:center;
    }
    @media only screen and (min-width : ${opendesigncss.resolutions.SmallMinWidth}px) and (max-width : ${opendesigncss.resolutions.SmallMaxWidth}px) {
        .inputBox {
            width: 350px;
            input {
                // border: 1px solid blue;
                width: 230px;
            }
        }
    }
    .inputBox{
        z-index:1000;
        // width:760px;
        position:relative;
        padding-top:105px;
        height: 49px;
        border-bottom: 1.5px solid black;
        input {
            // width: 80%;
        }
    }
    .zoomImg {
        z-index:500;
        position:relative;
        bottom: 45px;
        img {
            width: 33px;
            height: 33px;
        }
    }
    .searchInput{
        z-index:500;
        position:relative;
        bottom:80px;
        min-height:30px;
        left:80px;
        text-align: left;
        font-size:23px;
        color: #707070;
        opacity: 1;
        width: 600px;
        border: none;
    }
    .Box{
        display: flex;  
        justify-content: space-start;
    }
    .innerBox{
        position: relative;
        display: flex;
        justify: space-start;
    }
    .SelectBox{
        position: absolute;
        top: 250px;
        left: 44px;
        z-index: 10001;
    }
    .OrderBox{

    }
    .CategoryBox{
        position: relative;
        margin-top: 270px;
    }
    *:focus {
        outline: none;
    }
    .cateUI{
        z-index:500;
        position:absolute;
        left:645px;
        top:245px;
        display:flex;
        justify-content:space-start;
        font-weight: 300;
        text-align: left;
        font-size:20px;
        letter-spacing: 0;
        color: #707070;
        opacity: 1;
    }
    // @media only screen and (min-width : 780px) and (max-width:1440px) {
    //     .inputBox{
    //         width:50%;
    //     }
    // }
    // @media only screen and (min-width : 360px) and (max-width:780px) {
    //     .inputBox{
    //         width:60%;
    //     }
    // }
`;


class SearchListRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            searchKeyword: "",
            mainCate: [{ value: 1, text: "디자인" }, { value: 2, text: "그룹" }, { value: 3, text: "디자이너" }],
            selectCate: 0,
            this_order: { text: "등록순", keyword: "update" },
            urlCate: "design",
            this_category: { text: null, value: null },
            sub_category: { text: null, value: null },
            main_category: { text: null, value: null },
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
    handleChangeOrderOps = async (order) => {
        await this.setState({ this_order: order })
    }

    render() {
        const { category1, category2 } = this.props;
        const { main_category, sub_category } = this.state;
        console.log(this.props);

        return (
            <SearchContainer>
                {this.state.urlCate !== "group" ?
                    <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
                        category1={category1} category2={category2[this.state.main_category.value - 1]} main_selected={main_category} sub_selected={sub_category} /> : <React.Fragment></React.Fragment>}

                <SearchForm>
                    <div className="searchBox">
                        <div className="inputBox">
                            <div className="zoomImg">
                                {/* <img src={zoom} alt="" /> */}
                                검색어:
                                </div>
                            <input
                                className="searchInput"
                                id="searchInput"
                                placeholder="검색어를 입력하세요"
                                value={this.state.searchKeyword}
                                onChange={this.onChangeSearchkey}
                                onKeyDown={this.submitEnter}
                                maxLength="100"
                            />
                        </div>
                    </div>

                    {/*box position*/}
                    <div className="Box">
                        <div className="InnerBox" style={{ width: "100%", display: "flex", flexDirection: "row", marginTop: "15px" }}>
                            <div style={{ width: "max-content", marginLeft: "15px", zIndex: "999" }}>
                                <Dropdown
                                    id="dropbox"
                                    options={this.state.mainCate}
                                    selection
                                    name="searchcate"
                                    onChange={this.onChangeDropBox}
                                    value={this.state.selectCate} />
                            </div>
                            <div style={{ width: "max-content", marginLeft: "auto", marginRight: "25px" }}>
                                <OrderOption
                                    order_clicked={this.handleChangeOrderOps}
                                    selected={this.state.this_order} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "25px", minHeight: "250px" }}>

                        <div style={{
                            display:
                                this.state.urlCate === "design" ? "block" : "none"
                        }}>

                            <ScrollDesignListContainer
                                sort={this.props.sort}
                                keyword={this.state.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order}
                            />
                        </div>

                        <div style={{
                            display:
                                this.state.urlCate === "group" ? "block" : "none"
                        }}>

                            <ScrollGroupListContainer
                                sort={this.props.sort}
                                keyword={this.state.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order}
                            />
                        </div>

                        <div style={{
                            display:
                                this.state.urlCate === "designer" ? "block" : "none"
                        }}>

                            <ScrollDesignerListContainer
                                sort={this.props.sort}
                                keyword={this.state.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order}
                            />
                        </div>
                    </div>
                </SearchForm>
            </SearchContainer>
        )
    }
}

export default SearchListRe;
