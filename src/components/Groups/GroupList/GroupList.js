import React, { Component } from 'react';
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import Group from "components/Groups/Group";
import osdstyle from "opendesign_style";

class GroupList extends Component {
    state = {}
    getList = async (page) => {
        const keyword = this.props.search
        const sort = this.props.this_order.keyword
        return this.props.GetGroupTotalCountRequest()
            .then(() => { this.props.updateGroupCount(this.props.Count) })
            .then(() => { this.props.GetGroupListRequest(page, sort, keyword) })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.this_order.keyword !== this.props.this_order.keyword) {
            this.getList(0)
        }
    }
    render() {
        const { dataList, dataListAdded } = this.props
        return (
            <React.Fragment>
                {this.props.status === "INIT" ?
                    <Loading /> :
                    <ScrollList {...osdstyle.group_margin} ListComponent={Group}
                        dataList={dataList} dataListAdded={dataListAdded} getListRequest={this.getList} />}
            </React.Fragment>
        )
    }
}


export default GroupList