import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetTopGroupListRequest } from "redux/modules/group"
import ScrollList from "components/Commons/ScrollListNew"
import Loading from "components/Commons/Loading"
import opendesign_style from 'opendesign_style';
import Group from "components/Groups/Group";

class TopGroupListContainer extends Component {
    componentDidMount() {
        this.props.GetTopGroupListRequest(0)
    }
    getList = async (page) => {
        return this.props.GetTopGroupListRequest(page);
    }

    render() {
        const { Head, width } = this.props;

        return (<React.Fragment>
            <Head>인기 그룹</Head>
            {this.props.status === "INIT" ?
                <Loading /> :
                <ScrollList
                    ListComponent={Group}
                    width={width}
                    type="group"
                    height={"max-content"}
                    {...opendesign_style.group_margin}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(TopGroupListContainer)
