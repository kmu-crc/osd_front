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
import CheckBox2 from "components/Commons/CheckBox";
const SearchForm = styled.div`
    // div{ border:1px solid blue; }
    width:100%;
    font-family: Noto Sans KR;
    position:relative;
    margin-top:50px;
    justify-content:column;
    .searchBox{
        display:flex;
        justify-content:center;
    }
    .inputBox{
        z-index:1000;
        width:760px;
        position:relative;
        padding-top:105px;
        height: 49px;
        border-bottom: 1.5px solid black;
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
        border: 0;
        width: 600px;
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
        border: 1px solid red;
    }
    .OrderBox{
        border: 1px solid red;
        width: max-content;
        margin-left: auto;
        margin-right: 35px;
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
    @media only screen and (min-width : 780px) and (max-width:1440px) {
        .inputBox{
            width:50%;
        }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
        .inputBox{
            width:60%;
        }
    }
`;
const SearchContainer = styled.div`
    position: relative;
    overflow: hidden;
`;

class SearchListRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: "",
            mainCate: [{ value: 1, text: "디자인" }, { value: 2, text: "그룹" }, { value: 3, text: "디자이너" }],
            selectCate: 0,
            this_order: { text: "등록순", keyword: "update" },
            urlCate: "design",
            this_category: { text: null, value: null },
            sub_category: { text: null, value: null },
            main_category: { text: null, value: null },
            group: true,
            design: true,
            designer: true,
        }
        if (this.props.type == null) {
            this.setState({ type: "design" });
        }
        this.onChangeDropBox = this.onChangeDropBox.bind(this);
        this.onChangeSearchkey = this.onChangeSearchkey.bind(this);
        this.submitEnter = this.submitEnter.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
        this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);
    };
    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignListCountRequest() });
        const addrText = window.location.href.toString();
        if (addrText.indexOf('group') !== -1) { this.setState({ selectCate: 2, urlCate: "group" }) }
        else if (addrText.indexOf('designer') !== -1) { this.setState({ selectCate: 3, urlCate: "designer" }) }
        else if (addrText.indexOf('design') !== -1) { this.setState({ selectCate: 1, urlCate: "design" }) }
        else { this.setState({ selectCate: 1 }) }
        this.setState({ searchKeyword: this.props.keyword == null ? "" : this.props.keyword });
    };
    onChangeSearchkey(event) {
        let regExp = /^[a-zA-Zㄱ-힣0-9"_-]*$/i;
        const searchKey = event.target.value;
        if (regExp.test(searchKey) === false) {
            alert("특수문자는 사용할 수 없습니다.");
            return;
        }
        this.setState({ searchKeyword: event.target.value })
    };
    onChangeDropBox(event, { value }) {
        this.setState({ selectCate: { value }.value });
        const types = ["all", "design", "group", "designer"];
        window.location.href = `/search/${types[{ value }.value]}/${this.props.sort}/${this.props.keyword}`;
    };
    submitEnter(e) {
        if (e.keyCode === 13) {
            this.setState({ searchKeyword: e.target.value });
            this.onSearchSubmit(this.state.searchKeyword);
        }
    };
    onSearchSubmit(data) {
        if (this.state.searchKeyword == null || this.state.searchKeyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            window.location.href = `/search/${this.props.type}/${this.props.sort}/${this.state.searchKeyword}`;
        }
    };
    async handleChangeCategory(category) {
        await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    }
    async handleChangeSubCategory(parent, category) {
        await this.setState({ main_category: this.props.category1[parent.value - 1], this_category: category, sub_category: category })
    }
    async handleChangeOrderOps(order) {
        await this.setState({ this_order: order })
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.groups !== prevProps.groups) {
                this.setState({ group: true });
            }
            if (this.props.designs !== prevProps.designs) {
                this.setState({ design: true });
            }
            if (this.props.designers !== prevProps.designers) {
                this.setState({ designer: true });
            }
        }
    }
    render() {
        const { category1, category2 } = this.props;
        const { main_category, sub_category } = this.state;

        return (
            <SearchContainer>
                {this.state.urlCate !== "group"
                    ? <Category
                        subcategory_clicked={this.handleChangeSubCategory}
                        category_clicked={this.handleChangeCategory}
                        category1={category1}
                        category2={category2[this.state.main_category.value - 1]}
                        main_selected={main_category}
                        sub_selected={sub_category} />
                    : null}

                <SearchForm>
                    {/*  */}
                    <div className="searchBox">
                        <div className="inputBox">
                            <div className="zoomImg"><img src={zoom} alt="" /></div>
                            <input className="searchInput" id="searchInput"
                                placeholder="검색어를 입력하세요"
                                value={this.state.searchKeyword}
                                onChange={this.onChangeSearchkey}
                                onKeyDown={this.submitEnter}
                                maxLength="100"
                            />
                        </div>
                    </div>

                    {/* box position */}
                    <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "35px", width: "max-content", zIndex: "800", display: "flex" }}>
                            <div style={{ diplay: "flex", marginRight: "15px" }}>
                                <CheckBox2 type="checkbox" id="groupcheckbox" onChange={() => this.setState({ group: !this.state.group })} checked={this.state.group} /><div style={{ marginLeft: "27px", }}>그룹</div>
                            </div>
                            <div style={{ diplay: "flex", marginRight: "15px" }}>
                                <CheckBox2 type="checkbox" id="designcheckbox" onChange={() => this.setState({ design: !this.state.design })} checked={this.state.design} /><div style={{ marginLeft: "27px", }}>디자인</div>
                            </div>
                            <div style={{ diplay: "flex" }}>
                                <CheckBox2 type="checkbox" id="designercheckbox" onChange={() => this.setState({ designer: !this.state.designer })} checked={this.state.designer} /><div style={{ marginLeft: "27px", }}>디자이너</div>
                            </div>
                        </div>

                        <div style={{ marginLeft: "auto", marginRight: "35px", width: "max-content" }}>
                            <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                        </div>
                    </div>

                    {/* 
                        1.검색페이지 수정 - 그룹없으면, 디자인, 디자인없으면, 디자이너, 디자이너없으면, "검색된 내용이 없습니다.", 
                        2.검색되지않는경우가 있음 
                    */}
                    <div style={{ marginTop: "35px", minHeight: "350px" }}>
                        {this.state.group ?
                            <ScrollGroupListContainer
                                manual
                                message={`'${this.props.keyword}'에 대한 그룹을 찾을 수 없습니다.`}
                                sort={this.props.sort}
                                keyword={this.props.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order} /> : null}

                        {this.state.design ?
                            <ScrollDesignListContainer
                                manual
                                message={`'${this.props.keyword}'에 대한 디자인을 찾을 수 없습니다.`}
                                sort={this.props.sort}
                                keyword={this.props.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order} /> : null}

                        {this.state.designer ?
                            <ScrollDesignerListContainer
                                manual
                                message={`'${this.props.keyword}'에 대한 디자이너를 찾을 수 없습니다.`}
                                sort={this.props.sort}
                                keyword={this.props.keyword}
                                cate1={this.state.main_category.value}
                                cate2={this.state.sub_category.value}
                                orderOption={this.state.this_order} /> : null}

                    </div>
                </SearchForm>
            </SearchContainer >
        )
    }
}
export default SearchListRe;