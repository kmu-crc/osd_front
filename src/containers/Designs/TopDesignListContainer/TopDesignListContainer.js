import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetTopDesignListRequest } from "redux/modules/design"
import ScrollList from "components/Commons/ScrollList"
import Design from "components/Designs/Design"
import Loading from "components/Commons/Loading"

class TopDesignListContainer extends Component {
    state = { page: 0 }
    componentDidMount() {
        this.props.GetTopDesignListRequest(0)
    }
    getList = async () => {
        await this.setState({ page: this.state.page + 1 })
        return this.props.GetTopDesignListRequest(this.state.page)
    }

    render() {
        return (<>{this.props.status === "INIT" ?
            <Loading /> :
            <ScrollList 
                cols={5}
                width="330px" height="330px" marginRight="63px" marginBottom="80px" marginRightLast="8px" marginBottomLast="26px"
                ListComponent={Design} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />
        }</>)
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

export default connect(mapStateToProps, mapDispatchToProps)(TopDesignListContainer)
