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
        padding-top:32px;
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
        font-weight:500;
        font-family:Noto Sans KR;
        color:#707070;
        margin:47px 0px 23px 67px;
    }

`;

const CategoryItem = styled.div`
    font-size:20px;
    font-weight:500;
    font-family:Noto Sans KR;
    cursor:pointer;
    opacity:${props => props.opacity};
    margin-left:${props => props.left};
`

var pastCate = 0;//for change category
class MypageBody extends Component {
    state = {
        categorys: ['디자인', '그룹', '좋아요'],
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
        if (selectedCate === this.state.selectIdx) {
            return;
        }
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

                            <CategoryItem onClick={this.changeCategory.bind(this, index)} id={index}
                                left={catePadding[index]} key={index}
                                opacity={this.state.cateIndex == index ? 1 : 0.5}>{category}</CategoryItem>
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
                        <div className="interested">관심있는 디자인</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.design_margin} type="design" dataList={MyLikeDesign} dataListAdded={MyLikeDesignAdded} getListRequest={this.getLikeDesignList} />}
                        <div className="interested">관심있는 그룹</div>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList manual {...opendesign_style.group_margin} type="group" dataList={MyLikeGroup} dataListAdded={MyLikeGroupAdded} getListRequest={this.getLikeGroupList} />}
                        <div className="interested">관심있는 디자이너</div>

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