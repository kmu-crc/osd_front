import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from 'opendesign_style';

//css
const MypageBodyComp = styled.div`
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
class MypageBody extends Component {
    state = {
        categorys: ['디자인', '그룹', '좋아요'],
        selectCate: "unSelectedCate",
        cateIndex: 0,
        page: 0,
        groupPage: 0,
        uid: undefined,

    }
    componentDidMount() {
        var selectedCate = document.getElementById("0");
        selectedCate.className = selectedCate.className.replace("unSelectedCate", "selectedCate");
    }
    componentWillMount() {
        this.getInitData();
    }

    getInitData() {
        this.getLikeGroupList(0);
        this.getLikeDesignList(0);
        this.getLikeDesignerList(0);
        this.getMyDesignListRequest(0);
        this.getMyGroupListRequest(0);
    }

    getLikeDesignList = async (page) => { this.props.GetMyLikeDesignRequest(this.props.token, page) };
    getLikeDesignerList = async (page) => { this.props.GetMyLikeDesignerRequest(this.props.token, page) };
    getLikeGroupList = async (page) => { this.props.GetMyLikeGroupRequest(this.props.token, page) };
    getMyGroupListRequest = async (page) => { this.props.GetMyGroupListRequest(this.props.token, page) };
    getMyDesignListRequest = async (page) => { this.props.GetMyDesignListRequest(this.props.token, page) };

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
        const { MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded } = this.props;
        const catePadding = ['70px', '55px', '60px'];
        console.log("mypage:", this.props);
        return (
            <MypageBodyComp>
                <div className="MypageCategory">
                    {this.state.categorys.map((category, index) => {
                        return (
                            <div id={index} className="unSelectedCate" style={{ marginLeft: catePadding[index], cursor: 'pointer' }} key={index} onClick={this.changeCategory.bind(this, index)} >{category}</div>
                        )
                    })}
                </div>
                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />}
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
                                <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />}
                        </div>
                        <div className="interested" style={{ paddingLeft: "67px", paddingTop: "75px", marginBottom: "25px" }}>관심있는 그룹</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />}
                        <div className="interested" style={{ paddingLeft: "67px", paddingTop: "0px", marginBottom: "30px" }}>관심있는 디자이너</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.designer_margin} type="designer" dataList={MyLikeDesigner} dataListAdded={MyLikeDesignerAdded} getListRequest={this.getLikeDesignerList} />}
                    </div>


                }

            </MypageBodyComp>
        )
    }

}

export default MypageBody;