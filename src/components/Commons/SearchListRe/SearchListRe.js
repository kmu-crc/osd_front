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
    margin-top: 50px;

    .search-form {
        width: max-content;
        margin: auto;
    }
    .cate-and-order {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .cate {
            margin-left: 5px;
            margin-top: 5px;
        }
        .order {
            ;
        }
    }
    .result {
        z-index: 800;
        margin-top: 25px;
        min-height: 250px;
    }
`;
const SearchForm = styled.div`
    position: relative;

    input {
        z-index:500;
        position: relative;
        min-height:30px;
        text-align: left;
        padding-left: 25px;
        font-size:23px;
        color: #707070;
        opacity: 1;
        width: 600px;
        border: none;
        border-bottom: 1px solid #707070;
    }
    .shadow_button {
        position: absolute;
        width:21px;
        height:21px;
        left: 0px;
        z-index: 501;

        background: url(${zoom});
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    @media only screen and (min-width : ${opendesigncss.resolutions.SmallMinWidth}px) and (max-width : ${opendesigncss.resolutions.SmallMaxWidth}px) {
        background-color: #FFFFFF;
        border-radius: 20px;
        border: 1.5px solid #707070;
        position: relative;
        overflow: hidden;
        width: 320px;
        min-width: 150px;
        height: 36px;

        &:focus{
            outline: 1.5px solid red;
        }
        input {
            outline: none;
            width: 80%;
            border: none;
            margin: 0px 10px;
        }
        .shadow_button{
            width:21px;
            height:21px;
            position: absolute;
            top:3px;
            right:12px;

            background: url(${zoom});
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
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
                <div className="search-form">
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
                </div>

                <div className="result">

                    <div style={{ display: this.state.urlCate === "design" ? "block" : "none" }}>
                        <ScrollDesignListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            orderOption={this.state.this_order}
                        />
                    </div>

                    <div style={{ display: this.state.urlCate === "group" ? "block" : "none" }}>
                        <ScrollGroupListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            orderOption={this.state.this_order}
                        />
                    </div>

                    <div style={{ display: this.state.urlCate === "designer" ? "block" : "none" }}>
                        <ScrollDesignerListContainer
                            sort={this.props.sort}
                            keyword={this.state.keyword}
                            cate1={this.state.main_category.value}
                            cate2={this.state.sub_category.value}
                            orderOption={this.state.this_order}
                        />
                    </div>
                </div>
            </SearchContainer >
        )
    }
}

export default SearchListRe;
