import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetTopDesignListRequest } from "actions/Designs/TopDesignList/TopDesignList"
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
        return (<>
            {this.props.status === "INIT" ?
                <Loading /> :
                <ScrollList // mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} 
                    cols={5}
                    width="330px" height="330px" marginRight="63px" marginBottom="80px" marginRightLast="8px" marginBottomLast="26px"
                    ListComponent={Design} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />
            }
        </>)
    }
}
const mapStateToProps = (state) => {
    return {
        dataList: state.TopDesignList.status.TopDesignList,
        dataListAdded: state.TopDesignList.status.TopDesignListAdded,
        status: state.TopDesignList.TopDesignList.status
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
