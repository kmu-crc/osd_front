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

const SearchForm = styled.div`
    font-family: Noto Sans KR;
    position:relative;
    margin-top:50px;
    .inputBox{
        z-index:1000;
        justify-content: space-start;
        position:relative;
        padding-top:105px;
        left: 580px;
        height: 49px;
        border-bottom: 1.5px solid black;
        width:760px;
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
    }
    .OrderBox{
        border: 1xp solid red;
        position: relative;
        top: 220px;
        left: 1736px;
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
        }
        if (this.props.type == null) {
            this.setState({ type: "design" });
        }
        this.onChangeDropBox = this.onChangeDropBox.bind(this);
        this.onChangeSearchkey = this.onChangeSearchkey.bind(this);
    };

    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignListCountRequest() });
        const addrText = window.location.href.toString();
        if (addrText.indexOf('group') !== -1) { this.setState({ selectCate: 2, urlCate: "group" }) }
        else if (addrText.indexOf('designer') !== -1) { this.setState({ selectCate: 3, urlCate: "designer" }) }
        else if (addrText.indexOf('design') !== -1) { this.setState({ selectCate: 1, urlCate: "design" }) }
        else { this.setState({ selectCate: 1 }) }
        console.log(this.props.keyword);
        this.setState({ searchKeyword: this.props.keyword == null ? "" : this.props.keyword });
    }
    onChangeSearchkey(event) {
        let regExp = /^[a-zA-Zㄱ-힣0-9"_-]*$/i;
        const searchKey = event.target.value;
        if (regExp.test(searchKey) == false) {
            alert("특수문자는 사용할 수 없습니다.");
            return;
        }
        this.setState({ searchKeyword: event.target.value })
    }
    submitEnter = (e) => {
        if (e.keyCode === 13) {
            this.setState({ searchKeyword: e.target.value });
            this.onSearchSubmit(this.state.searchKeyword);
        }
    };

    onSearchSubmit = (data) => {
        if (this.state.searchKeyword == null || this.state.searchKeyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            const urll = encodeURIComponent(`${this.state.searchKeyword}`);
            //alert(decodeURIComponent(`${this.state.searchKeyword}`));
            this.props.history.replace(urll);
            window.location.href = urll;
        }
    };
    onChangeDropBox(event, { value }) {
        this.setState({ selectCate: { value }.value });

        let urlCate = "design";

        switch ({ value }.value) {
            case 0:
                urlCate = "all";
                this.setState({ urlCate: "all" });
                break;
            case 1:
                urlCate = "design";
                this.setState({ urlCate: "design" });
                break;
            case 2:
                urlCate = "group";
                this.setState({ urlCate: "group" });
                break;
            case 3:
                urlCate = "designer";
                this.setState({ urlCate: "designer" });
                break;
            default:
                break;
        }
        this.props.history.replace(`/search/${urlCate}/${this.props.sort}/${this.props.keyword}`);
    };

    //    this.props.GetDesignListRequest(page, this_order.keyword, main_category.value, sub_category.value, keyword);
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
        return (
            <SearchContainer>
                {this.state.urlCate !== "group" ?
                    <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
                        category1={category1} category2={category2[this.state.main_category.value - 1]} main_selected={main_category} sub_selected={sub_category} /> : <React.Fragment></React.Fragment>}
                <SearchForm>
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
                    {/*box position*/}
                    <div className="Box">
                        <div className="InnerBox">
                            <div className="SelectBox">
                                <Dropdown id="dropbox" options={this.state.mainCate} selection name="searchcate" onChange={this.onChangeDropBox} value={this.state.selectCate} />
                            </div>
                            <div className="OrderBox">
                                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                            </div>
                        </div>
                    </div>

                    <div className="CategoryBox">
                        {this.state.urlCate === "designer" && <ScrollDesignerListContainer
                            sort={this.props.sort} keyword={this.state.searchKeyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}
                        {this.state.urlCate === "group" && <ScrollGroupListContainer
                            sort={this.props.sort} keyword={this.state.searchKeyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}
                        {this.state.urlCate === "design" && <ScrollDesignListContainer
                            sort={this.props.sort} keyword={this.state.searchKeyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}

                    </div>
                </SearchForm>
            </SearchContainer>
        )
    }
}
export default SearchListRe;