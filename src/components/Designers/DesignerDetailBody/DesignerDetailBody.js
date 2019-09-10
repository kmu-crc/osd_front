import React, { Component } from 'react';
import styled from 'styled-components'

// import ScrollList from "components/Commons/ScrollList"

//component
import Design from "components/Designs/Design"
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer"
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'

//
import opendesign_style from "opendesign_style";

//css
const DesignerDetailBody = styled.div`
    font-family: Noto Sans KR;
    .MypageCategory{
        display:flex;
        justifyContent: space-start;
        padding-top:60px;
        
        font-size:20px;
        color:#707070;
        
    }
    .selectedCate{
        opacity:1.0;
    }
    .unSelectedCate{
        opacity:0.5;
    }
    .interested{
        position:relative;
        font-size:20px;
        color:#707070;
        padding-top:56px;

    }

`;

var pastCate = 0;//for change category
class DesignerPageBody extends Component {
    state = {
        reload: false,
        categorys: ['디자인', '그룹', '좋아요'],
        selectCate: "unSelectedCate",
        cateIndex: 0,
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
        this.props.id && this.props.GetMyDesignInDesignerRequest(this.props.id, page);
    }
    getGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetGroupInDesignerRequest(this.props.id, page);
    }
    getLikeInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeInDesignerRequest(this.props.id, page);
    }
    getLikeGroupInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeGroupInDesignerRequest(this.props.id, page);
    }
    getLikeDesignerInDesignerRequest = async (page) => {
        this.props.id && this.props.GetLikeDesignerInDesignerRequest(this.props.id, page);
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
        const { MyDesignInDesigner, MyDesignInDesignerAdded, LikeInDesigner, LikeInDesignerAdded, GroupInDesigner, GroupInDesignerAdded,
            LikeGroupInDesigner, LikeGroupInDesignerAdded, LikeDesignerInDesigner, LikeDesignerInDesignerAdded } = this.props;
        const catePadding = ['70px', '55px', '60px'];
        const { reload } = this.state;
        return (
            <DesignerDetailBody>
                <div className="MypageCategory">
                    {this.state.categorys.map((category, index) => {
                        return (
                            <div id={index} className="unSelectedCate" style={{ paddingLeft: catePadding[index], cursor: 'pointer' }} key={index} onClick={this.changeCategory.bind(this, index)} >{category}</div>
                        )
                    })}
                </div>
                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                ListComponent={Design} dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                ListComponent={Group} dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest} />}
                    </div>
                }
                {this.state.cateIndex === 2 &&
                    <div className="compWrapper">
                        <div className="interested" style={{ display: "flex", justifyContent: "space-start" }}>
                            <div style={{ paddingLeft: "67px", fontWeight: "Medium" }}>관심있는 디자인</div>
                            {/* <div style={{ paddingLeft: "1600px", fontWeight: "300" }}>모두 보기</div> */}
                        </div>
                        <div style={{ paddingTop: '25px' }}>
                            {this.props.status === "INIT" ?
                                <Loading /> :
                                <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                    manual ListComponent={Design} dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} />}</div>
                        <div className="interested" style={{ paddingLeft: "67px", paddingTop: "75px", marginBottom: "25px" }}>관심있는 그룹</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                manual ListComponent={Group} dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest} />}
                        <div className="interested" style={{ paddingLeft: "67px", paddingTop: "67px", marginBottom: "30px" }}>관심있는 디자이너</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.designer_margin} handleReload={this.handleReload} reloader={reload}
                                manual ListComponent={Designer} dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />}
                    </div>
                }
            </DesignerDetailBody>
        )
    }

}

export default DesignerPageBody;