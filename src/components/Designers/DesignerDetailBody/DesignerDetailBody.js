import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
//
import opendesign_style from "opendesign_style";

//css
const DesignerDetailBody = styled.div`
    font-family: Noto Sans KR;
    .MypageCategory {
        display: flex;
        justifyContent: space-start;
        padding-top:60px;
        font-size:20px;
        color:#707070;
    }
    .selectedCate {
        opacity: 1.0;
    }

    .compWrapper {
        padding-top: 35px;
        padding-bottom: 35px;
    }
    .interested {
        position: relative;
        padding-top: 56px;
        font-size: 20px;
        color: #707070;
    } 
    .interested-first-scroll {
        padding-top: 25px;
    }
    .first {
        display: flex;
        justify-content: space-start;
        .text {
            padding-left: 67px;
            font-weight: Medium;
        }
    }
    .second {
        padding-top: 75px;
        padding-left: 67px;
        margin-bottom: 25px;
    }
    .third {
        padding-top: 67px;
        padding-left: 67px;
        margin-bottom: 30px;
    }
`;
const CategoryItems = styled.div`
    padding-left: ${props => props.paddingLeft}px;
    opacity: ${props => props.opacity};
    cursor: pointer;
`;
var pastCate = 0;//for change category
class DesignerPageBody extends Component {
    state = {
        reload: false,
        categorys: ['디자인', '그룹', '좋아요'],
        selectCate: "unSelectedCate",
        cateIndex: 0,
        pageDesign: 0,
        pageGroup: 0,
        pageLikeDesign: 0,
        pageLikeGroup: 0,
        pageLikeDesigner: 0
    }
    handleReload = () => {
        this.setState({ reload: false })
    }
    componentDidMount() {
        var selectedCate = document.getElementById(0);
        selectedCate.className = selectedCate.className.replace("unSelectedCate", "selectedCate");
    }
    componentWillMount() {
        this.getInitData();
    }

    getInitData() {
        this.getMyDesignInDesignerRequest(0);
        this.getGroupInDesignerRequest(0);
        this.getLikeInDesignerRequest(0);
        this.getLikeGroupInDesignerRequest(0);
        this.getLikeDesignerInDesignerRequest(0);
    }
    getMyDesignInDesignerRequest = async (page) => {
        if (page > this.state.pageDesign) this.setState({ pageDesign: page });
        this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, this.state.pageDesign);
    }
    getGroupInDesignerRequest = async (page) => {
        if (page > this.state.pageGroup) this.setState({ pageGroup: page });
        this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, this.state.pageGroup);
    }
    getLikeInDesignerRequest = async (page) => {
        if (page > this.state.pageLikeDesign) this.setState({ pageLikeDesign: page })
        this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, this.state.pageLikeDesign);
    }
    getLikeGroupInDesignerRequest = async (page) => {
        if (page > this.state.pageLikeGroup) this.setState({ pageLikeGroup: page })
        this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, this.state.pageLikeGroup);
    }
    getLikeDesignerInDesignerRequest = async (page) => {
        if (page > this.state.pageLikeDesigner) this.setState({ pageLikeDesigner: page })
        this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, this.state.pageLikeDesigner);
    }

    changeCategory = (index) => {
        //unselected to selected
        var selectedCate = document.getElementById(index);
        if (selectedCate.className === "selectedCate") {
            return;
        }
        selectedCate.className = selectedCate.className.replace("unSelectedCate", "selectedCate");

        //selected to unselected
        var unSelectedCate = document.getElementById(pastCate);
        unSelectedCate.className = unSelectedCate.className.replace("selectedCate", "unSelectedCate");

        pastCate = index;
        this.setState({ cateIndex: index });
    }
    render() {
        const {
            MyDesignInDesigner, MyDesignInDesignerAdded,
            LikeInDesigner, LikeInDesignerAdded,
            GroupInDesigner, GroupInDesignerAdded,
            LikeGroupInDesigner, LikeGroupInDesignerAdded,
            LikeDesignerInDesigner, LikeDesignerInDesignerAdded } = this.props;
        const catePadding = [70, 55, 60];
        const { reload } = this.state;

        return (
            <DesignerDetailBody>
                <div className="MypageCategory">
                    {this.state.categorys.map((category, index) => {
                        return (<CategoryItems id={index} opacity={this.state.cateIndex === index ? "1.0" : "0.5"} paddingLeft={catePadding[index]} key={index} onClick={this.changeCategory.bind(this, index)}>{category}</CategoryItems>)
                    })}
                </div>
                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                type="design" dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                type="group" dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest} />}
                    </div>
                }
                {this.state.cateIndex === 2 &&
                    <div className="compWrapper">
                        <div className="interested-first-scroll">
                            <div className="interested first" >관심있는 디자인</div>
                            {this.props.status === "INIT" ?
                                <Loading /> :
                                <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                    manual type="design" dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} />}</div>

                        <div className="interested second" >관심있는 그룹</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="group" dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest} />}

                        <div className="interested third" >관심있는 디자이너</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.designer_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="designer" dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />}
                    </div>
                }
            </DesignerDetailBody>
        )
    }
}

export default DesignerPageBody;