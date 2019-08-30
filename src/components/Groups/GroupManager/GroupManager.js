import React, { Component } from 'react'
import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

class ManageGroup extends Component {
    render() {
        return (
            <>
                <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
                <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
                <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
                <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
            </>
        )
    }
};

export default ManageGroup;