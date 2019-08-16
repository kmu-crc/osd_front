import React, { Component } from 'react'
import ScrollList from "components/Commons/ScrollList"
import Loading from "components/Commons/Loading"
import Group from "components/Groups/Group"


class GroupList extends Component {
    state = {
        page: 0
    }
    componentDidMount() {
        this.getInitData()
    }
    getInitData = async () => {
        await this.setState({ page: 0 })
        const keyword = this.props.search
        const sort = this.props.this_order.keyword
        this.props.GetGroupTotalCountRequest()
            .then(() => { this.props.updateGroupCount(this.props.Count) })
            .then(() => { this.props.GetGroupListRequest(0, sort, keyword) })
    }
    getList = async () => {
        await this.setState({ page: this.state.page + 1 })
        const keyword = this.props.search
        const sort = this.props.this_order.keyword
        const page = this.state.page
        return this.props.GetGroupTotalCountRequest()
            .then(() => { this.props.updateGroupCount(this.props.Count) })
            .then(() => { this.props.GetGroupListRequest(page, sort, keyword) })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.this_order.keyword !== this.props.this_order.keyword) {
            this.getInitData()
        }
    }
    render() {
        const { width, height, marginRight, marginRightLast, marginBottom, marginBottomLast, dataList, dataListAdded } = this.props
        return (
            <>
                {this.props.status === "INIT" ?
                    <Loading /> :
                    <ScrollList cols={2}
                        width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
                        page={this.state.page} ListComponent={Group} dataList={dataList} dataListAdded={dataListAdded} getListRequest={this.getList} />}
            </>
        )
    }
}

export default GroupList