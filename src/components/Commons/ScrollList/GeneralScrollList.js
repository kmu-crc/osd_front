import React from 'react'
import Loading from 'components/Commons/Loading'
import ScrollList from "./ScrollList"

export class GeneralScrollList extends React.Component {
    render() {
        const { page, cols, width, height, marginRight, marginBottom, marginRightLast, marginBottomLast, ListComponent, dataList, dataListAdded, getListRequest } = this.props
        return (<>{this.props.status === "INIT" ?
            <Loading /> :
            <ScrollList
                page={page}
                width={width} height={height} cols={cols}
                marginRight={marginRight} marginBottom={marginBottom} marginRightLast={marginRightLast} marginBottomLast={marginBottomLast}
                ListComponent={ListComponent} dataList={dataList} dataListAdded={dataListAdded} getListRequest={getListRequest} />
        }
        </>)
    }
}