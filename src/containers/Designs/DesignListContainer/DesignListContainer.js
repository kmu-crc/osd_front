import React, { Component } from 'react'
import ScrollList from "components/Commons/ScrollList"
import Design from "components/Designs/Design"

class DesignListContainer extends Component {
    render() {
        return (
            <ScrollList getListRequest={this.getList}
                ListComponent={Design}
                dataList={this.props.dataList}
                dataListAdded={this.props.dataListAdded}
                mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"
            />
        )
    }
}
export default DesignListContainer