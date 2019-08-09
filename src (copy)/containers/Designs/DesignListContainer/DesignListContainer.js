import React, { Component } from 'react'
import ScrollList from "components/Commons/ScrollList"
import Design from "components/Designs/Design"
import Loading from "components/Commons/Loading"

class DesignListContainer extends Component {
    render() {
        const { page, width, height, marginRight, marginRightLast, marginBottom, marginBottomLast } = this.props
        return (
            <div style={{ paddingTop: "30px", paddingBottom: "68px" }}>
                {this.props.status === "INIT" ?
                    <Loading /> :
                    <ScrollList cols={5}
                        width={width} height={height} marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
                        page={page} ListComponent={Design} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} getListRequest={this.getList} />}
            </div>
        )
    }
}

export default DesignListContainer
