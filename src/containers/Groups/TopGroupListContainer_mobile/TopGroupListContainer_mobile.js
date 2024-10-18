import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetTopGroupListRequest } from "redux/modules/group"
import ScrollListHorizontal_mobile from "components/Commons/ScrollListHorizontal_mobile"
import Loading from "components/Commons/Loading"
import opendesign_style from 'opendesign_style';
import Group_mobile from "components/Groups/Group_mobile";
import styled from "styled-components";

const Head = styled.div`
    width:100%;
    height:32px;
    display:flex;
    align-items:center;
    justify-content:center;

    font: normal normal normal 20px/28px Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #707070;
`
const Board = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    .list_box{
        width:340px;
        height:${props=>props.height}px;
        overflow:hidden;    
    }
`

class TopGroupListContainer_mobile extends Component {
    componentDidMount() {
        this.props.GetTopGroupListRequest(0)
    }
    getList = async (page) => {
        return this.props.GetTopGroupListRequest(page);
    }

    render() {
        const { width } = this.props;

        return (<React.Fragment>
            <Head>인기 그룹</Head>
            <Board height={224}>
            <div className="list_box">
            {this.props.status === "INIT" ?
                <Loading /> :
                <ScrollListHorizontal_mobile
                    ListComponent={Group_mobile}
                    height={224}
                    type="group"
                    height={"max-content"}
                    {...opendesign_style.group_margin}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />
            }
            </div>
            </Board>
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        dataList: state.GroupList.status.TopList,
        dataListAdded: state.GroupList.status.TopListAdded,
        status: state.GroupList.status.TopList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetTopGroupListRequest: (page) => {
            return dispatch(GetTopGroupListRequest(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopGroupListContainer_mobile)
