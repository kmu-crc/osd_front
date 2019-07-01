import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import ScrollList from "components/Commons/ScrollList"
import Design from "components/Designs/Design"

class DesignListContainer extends Component {
    render() {
        return (
            // <ScrollList getListRequest={this.getList}
            // ListComponent={Design}
            // dataList={}
            // />
            <Design />
        )
    }
}
export default DesignListContainer
// export default connect(mapS)