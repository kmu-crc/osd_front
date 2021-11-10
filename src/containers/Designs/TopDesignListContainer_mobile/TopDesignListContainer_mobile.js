import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetTopDesignListRequest } from "redux/modules/design"
import ScrollListHorizontal_mobile from "components/Commons/ScrollListHorizontal_mobile"
import Loading from "components/Commons/Loading"
import Design_mobile_mini from "components/Designs/Design_mobile_mini";
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
        width:335px;
        height:${props=>props.height}px;
        overflow:hidden;    
    }
`
class TopDesignListContainer_mobile extends Component {
    componentDidMount() {
        this.props.GetTopDesignListRequest(0)
    }
    getList = async (page) => {
        return this.props.GetTopDesignListRequest(page);
    }

    render() {
        const {  width } = this.props;
        return (<React.Fragment>
            <Head>인기 디자인</Head>
            <Board height={355}>
            <div className="list_box">
            {this.props.status === "INIT" ?
                <Loading /> :
                <ScrollListHorizontal_mobile
                    height={355}
                    ListComponent={Design_mobile_mini}
                    type="design"
                    height={"max-content"}
                    row={17}
                    col={17}
                    // {...opendesign_style.design_margin}
                    dataList={this.props.dataList}
                    dataListAdded={this.props.dataListAdded}
                    getListRequest={this.getList} />
            }
            </div>
            </Board>
           </React.Fragment>);
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.DesignList.status.TopList,
        dataListAdded: state.DesignList.status.TopListAdded,
        status: state.DesignList.TopList.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetTopDesignListRequest: (page) => {
            return dispatch(GetTopDesignListRequest(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopDesignListContainer_mobile)
