import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from 'opendesign_style';
import NumberFormat from 'modules/NumberFormat';

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
const CategoryItems = styled.div`
    font-size:20px;
    font-weight:500;
    font-family:Noto Sans KR;
    cursor:pointer;
    opacity:${props => props.opacity};
    margin-left:${props => props.paddingLeft}px;
`
class MypageBody extends Component {
    state = {
        categorys: ['그룹', '디자인', '관심항목'],
        cateIndex: 0, page: 0, groupPage: 0, uid: undefined,
    }
    componentDidMount() {
        this.getInitData();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.Count != this.props.Count) {
            this.setTab(nextProps.Count);
        }
    }
    setTab = (props) => {
        const { total_design, total_group, total_favorite } = props;
        let tabindex = 0;
        if (total_group === 0) {
            tabindex = 1;
        }
        if (total_design === 0) {
            tabindex = 2;
        }
        if (total_favorite === 0) {
            tabindex = 0;
        }
        if (total_group !== 0 && total_design !== 0 && total_favorite !== 0) {
            tabindex = 0;
        }
        this.setState({ cateIndex: tabindex });
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
    changeCategory = (index) => { this.setState({ cateIndex: index }); };

    render() {
        const { Count, MyLikeDesign, MyLikeDesigner, MyLikeDesignAdded, MyLikeDesignerAdded, MyGroup, MyGroupAdded, MyDesign, MyDesignAdded, MyLikeGroup, MyLikeGroupAdded } = this.props;
        console.log("mypage:", this.props);
        return (
            <MypageBodyComp>
                <div className="MypageCategory">
                    <CategoryItems paddingLeft={70} opacity={this.state.cateIndex === 0 ? "1.0" : "0.5"} onClick={() => this.changeCategory(0)}>그룹({NumberFormat(Count.total_group)})</CategoryItems>
                    <CategoryItems paddingLeft={50} opacity={this.state.cateIndex === 1 ? "1.0" : "0.5"} onClick={() => this.changeCategory(1)}>디자인({NumberFormat(Count.total_design)})</CategoryItems>
                    <CategoryItems paddingLeft={40} opacity={this.state.cateIndex === 2 ? "1.0" : "0.5"} onClick={() => this.changeCategory(2)}>관심항목({NumberFormat(Count.total_favorite)})</CategoryItems>
                </div>

                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} type="group" dataList={MyGroup} dataListAdded={MyGroupAdded} getListRequest={this.getMyGroupListRequest} />}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" style={{ paddingTop: "35px" }}>
                        {this.props.status === "INIT" ?
                            <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} type="design" dataList={MyDesign} dataListAdded={MyDesignAdded} getListRequest={this.getMyDesignListRequest} />}
                    </div>}

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
                    </div>}

            </MypageBodyComp>
        )
    }
}

export default MypageBody;