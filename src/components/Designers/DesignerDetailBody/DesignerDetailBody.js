import React, { Component } from 'react';
import styled from 'styled-components'

//component
import ScrollList from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import opendesign_style from "opendesign_style";
import NumberFormat from 'modules/NumberFormat';

//css
const DesignerDetailBody = styled.div`
    font-family: Noto Sans KR;
    .MypageCategory{
        display: flex;
        justifyContent: space-start;
        padding-top: 32px;
        font-size: 20px;
        color: #707070;
    }
    .selectedCate {
        opacity: 1.0;
    }
    .compWrapper {
        padding-top: 35px;
        padding-bottom: 15px;
    }
    .interested {
        position: relative;
        margin-left: 56px;
        font-size: 20px;
        color: #707070;
        &.first {
            display: flex;
            justify-content: space-start;
            padding-top: 15px;
            margin-bottom: 25px;
            .text {
                padding-left: 67px;
                font-weight: Medium;
            }
        }
        &.second {
            padding-top: 15px;
            margin-bottom: 25px;
        }
        &.third {
            padding-top: 15px;
            margin-bottom: 25px;
            // padding-left: 67px;
        }
    }
    .interested-first-scroll {
        padding-top: 15px;
    }
`;
const CategoryItems = styled.div`
    padding-left: ${props => props.paddingLeft}px;
    opacity: ${props => props.opacity};
    cursor: pointer;
`;

class DesignerPageBody extends Component {
    constructor(props) {
        super(props);
        this.state = { reload: false, cateIndex: 0, };
    }
    handleReload = () => {
        this.setState({ reload: false });
    }
    componentWillMount() {
        this.getInitData();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.Count !== this.props.Count) {
            this.setTab(nextProps.Count);
        }
    }
    setTab = (props) => {
        const { total_design, total_group, total_favorite } = props;
        // console.log("index", props);
        let tabindex = 0;
        if (total_group === 0) {
            tabindex = 1;
        }
        if (total_group === 0 && total_design === 0) {
            tabindex = 2;
        }
        if (total_group === 0 && total_design === 0 && total_favorite === 0) {
            tabindex = 0;
        }
        if (total_group !== 0 && total_design !== 0 && total_favorite !== 0) {
            tabindex = 0;
        }
        this.setState({ cateIndex: tabindex });
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
        this.setState({ cateIndex: index });
    }

    render() {
        const { Count, MyDesignInDesigner, MyDesignInDesignerAdded, GroupInDesigner, GroupInDesignerAdded,
            LikeInDesigner, LikeInDesignerAdded, LikeGroupInDesigner, LikeGroupInDesignerAdded, LikeDesignerInDesigner, LikeDesignerInDesignerAdded } = this.props;
        const { reload } = this.state;
        return (
            <DesignerDetailBody>
                <div className="MypageCategory">
                    <CategoryItems paddingLeft={70} opacity={this.state.cateIndex === 0 ? "1.0" : "0.5"} onClick={() => this.changeCategory(0)}>그룹({NumberFormat(Count.joined_group || 0)})</CategoryItems>
                    <CategoryItems paddingLeft={50} opacity={this.state.cateIndex === 1 ? "1.0" : "0.5"} onClick={() => this.changeCategory(1)}>디자인({NumberFormat((Count.total_design || 0) + (Count.joined_design || 0))})</CategoryItems>
                    <CategoryItems paddingLeft={40} opacity={this.state.cateIndex === 2 ? "1.0" : "0.5"} onClick={() => this.changeCategory(2)}>관심항목({NumberFormat(Count.total_favorite || 0)})</CategoryItems>
                </div>

                {this.state.cateIndex === 0 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ? <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload} type="group"
                                dataList={GroupInDesigner} dataListAdded={GroupInDesignerAdded} getListRequest={this.getGroupInDesignerRequest} />}
                    </div>}

                {this.state.cateIndex === 1 &&
                    <div className="compWrapper" >
                        {this.props.status === "INIT" ? <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload} type="design"
                                dataList={MyDesignInDesigner} dataListAdded={MyDesignInDesignerAdded} getListRequest={this.getMyDesignInDesignerRequest} />}
                    </div>}

                {this.state.cateIndex === 2 &&
                    <div className="compWrapper">
                        <div className="interested first">관심있는 그룹({NumberFormat(Count.like_group)})</div>
                        {this.props.status === "INIT" ? <Loading /> :
                            <ScrollList {...opendesign_style.group_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="group" dataList={LikeGroupInDesigner} dataListAdded={LikeGroupInDesignerAdded} getListRequest={this.getLikeGroupInDesignerRequest} />}

                        <div className="interested second">관심있는 디자인({NumberFormat(Count.like_design)})</div>
                        {this.props.status === "INIT" ? <Loading /> :
                            <ScrollList {...opendesign_style.design_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="design" dataList={LikeInDesigner} dataListAdded={LikeInDesignerAdded} getListRequest={this.getLikeInDesignerRequest} />}

                        <div className="interested third">관심있는 디자이너({NumberFormat(Count.like_designer)})</div>
                        {this.props.status === "INIT" ? <Loading /> :
                            <ScrollList {...opendesign_style.designer_margin} handleReload={this.handleReload} reloader={reload}
                                manual type="designer" dataList={LikeDesignerInDesigner} dataListAdded={LikeDesignerInDesignerAdded} getListRequest={this.getLikeDesignerInDesignerRequest} />}
                    </div>}
            </DesignerDetailBody >
        )
    }
}

export default DesignerPageBody;