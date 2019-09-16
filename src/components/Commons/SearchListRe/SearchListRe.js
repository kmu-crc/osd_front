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
    .inputBox{
        z-index:500;
        justify-content: space-start;
        position:relative;
        padding-top:105px;
        left: 580px;
        height: 49px;
        border-bottom: 1.5px solid black;
        width:760px;
    }
    .zoomImg{
        z-index:500;
        position:relative;
        bottom: 45px;
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

class SearchListRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    };

    componentDidMount() {
        this.props.GetCategoryAllRequest()
            .then(() => { this.props.GetDesignListCountRequest() });
        const addrText = window.location.href.toString();
        if (addrText.indexOf('group') !== -1) { this.setState({ selectCate: 2, urlCate: "group" }) }
        else if (addrText.indexOf('designer') !== -1) { this.setState({ selectCate: 3, urlCate: "designer" }) }
        else if (addrText.indexOf('design') !== -1) { this.setState({ selectCate: 1, urlCate: "design" }) }
        else { this.setState({ selectCate: 1 }) }
    }

    getSearchValue = (e) => {
        const target = e.target;
        const value = target.value;
        let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
        if (!value.match(regExp)) {
            alert("특수문자는 사용할 수 없습니다.");
            target.value = "";
            return;
        } else {
            this.setState({
                keyword: value
            });
        }
    };
    submitEnter = (e) => {
        if (e.keyCode === 13) {
            this.onSearchSubmit(this.state.keyword);
        }
    };

    onSearchSubmit = (data) => {
        if (this.state.keyword == null || this.state.keyword === "") {
            alert("키워드를 입력해주세요");
        } else {
            this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
            window.location.href = `/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`;
        }
    };
    onChangeDropBox(event, { value }) {
        this.setState({ selectCate: { value }.value });
        switch (value) {
            case 0:
                this.setState({ urlCate: "all" });
                break;
            case 1:
                this.setState({ urlCate: "design" });
                break;
            case 2:
                this.setState({ urlCate: "group" });
                break;
            case 3:
                this.setState({ urlCate: "designer" });
                break;
            default:
                break;
        }
        this.props.history.replace(`/search/${this.state.urlCate}/${this.props.sort}/${this.props.keyword}`);
    };

    //    this.props.GetDesignListRequest(page, this_order.keyword, main_category.value, sub_category.value, keyword);
    handleChangeCategory = async (category) => {
        await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    }
    handleChangeSubCategory = async (parent, category) => {
        await this.setState({ main_category: this.props.category1[parent], this_category: category, sub_category: category })
    }
    handleChangeOrderOps = async (order) => {
        await this.setState({ this_order: order })
        console.log(this.state.this_order);
    }

    render() {
        const { category1, category2 } = this.props
        const { main_category, sub_category } = this.state

        return (
            <div style={{ position: "relative", overflow: "hidden" }}>
                {this.state.urlCate !== "group" ?
                    <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
                        category1={category1} category2={category2[main_category.value]} main_selected={main_category} sub_selected={sub_category} /> : <React.Fragment></React.Fragment>}
                <SearchForm>
                    <div className="inputBox">
                        <div className="zoomImg"><img src={zoom} alt="" style={{ width: "33px", height: "33px" }} /></div>
                        <input style={{ width: "600px" }} className="searchInput" id="searchInput"
                            placeholder="검색어를 입력하세요"
                            onChange={this.getSearchValue}
                            onKeyDown={this.submitEnter}
                            maxLength="100"
                        />
                    </div>
                    {/*x box position*/}
                    <div style={{ display: "flex", justifyContent: "space-start" }}>
                        <div style={{ position: "relative", display: "flex", justify: "space-start" }}>
                            <div style={{ position: "absolute", top: "250px", left: "44px", zIndex: "10001" }}>
                                <Dropdown  id="dropbox" options={this.state.mainCate} selection name="searchcate" onChange={this.onChangeDropBox} value={this.state.selectCate} />
                            </div>
                            <div style={{ border: "1xp solid red", position: "relative", top: "220px", left: "1736px" }}>
                                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                            </div>
                        </div>
                        {/* <div className="cateUI">{this.state.selectCate != 1 &&<React.Fragment><div style={{ color: "red" }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div><div style={{ paddingLeft: '20px' }}>세부카테고리</div></React.Fragment>}</div> */}
                    </div>
                    <div style={{ position: "relative", marginTop: "270px" }}>
                        {this.state.urlCate === "designer" && <ScrollDesignerListContainer
                            sort={this.props.sort} keyword={this.props.keyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}
                        {this.state.urlCate === "group" && <ScrollGroupListContainer
                            sort={this.props.sort} keyword={this.props.keyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}
                        {this.state.urlCate === "design" && <ScrollDesignListContainer
                            sort={this.props.sort} keyword={this.props.keyword} cate1={this.state.main_category.value} cate2={this.state.sub_category.value} orderOption={this.state.this_order} />}

                    </div>
                </SearchForm>
            </div>
        )
    }
}
export default SearchListRe;