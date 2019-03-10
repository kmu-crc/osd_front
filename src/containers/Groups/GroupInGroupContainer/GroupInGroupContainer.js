import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";
import styled from 'styled-components';
import StyleGuide from 'StyleGuide';
import NumberFormat from "modules/NumberFormat";

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class GroupInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.id, 0, this.props.sort);
  }

  shouldComponentUpdate(nextProps){
    if (JSON.stringify(this.props.sort) !== JSON.stringify(nextProps.sort)) {
      this.props.GetGroupInGroupRequest(this.props.id, 0, nextProps.sort);
    }
    return true;
  }

  getList = (page) => {
    return this.props.GetGroupInGroupRequest(this.props.id, page, this.props.sort);
  }

  render() {
    return(
      <div>
        {this.props.dataListAdded && this.props.dataListAdded.length === 0
        ? <div></div>
        : <GroupBox>
            <div className="boxTitle">그룹 ({NumberFormat(this.props.count)})</div>
            <ScrollList rerender={true}
                        getListRequest={this.getList}
                        ListComponent={Group}
                        type="Group"
                        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
          </GroupBox>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupDetail.status.GroupInGroup,
    dataListAdded: state.GroupDetail.status.GroupInGroupAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupInGroupRequest: (id, page, sort) => {
        return dispatch(GetGroupInGroupRequest(id, page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInGroupContainer);
