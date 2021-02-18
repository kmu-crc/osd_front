import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ProblemController from "components/Designs/CardSourceDetail/ProblemController";
import { getProblemListFilterRequest,getProblemCategoryRequest, getProblemListRequest, getProblemDetailRequest, UpdateAnswerRequest } from "redux/modules/design/card";
import { Modal } from "semantic-ui-react"
import styled from 'styled-components';
import Cross from "components/Commons/Cross";

const ModalBox = styled(Modal)`
  width:938px;
  height:max-content;
  padding:57px 63px 57px 63px;
  position:relative;
  .closeBox{
    width:100%;
    display:flex;
    padding:10px;
    justify-content:flex-end;
    position:absolute;
    top:0px;
    right:0px;
    .closeIcon{
      cursor:pointer;
      font-size:30px;
    }
  }
`

class ProblemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category:[]}
  }
  componentDidMount() {
    this.props.getProblemListRequest(1);
    this.props.getProblemCategoryRequest().then(()=>{
      this.setState({category:[]});
      this.props.ProblemCategory.map((item,index)=>{
        this.setState({category:this.state.category.concat({value:item.id,text:item.category_name})});
      })
    })
  }
  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        {
          this.props.open == true || this.props.item.content == "" ?
            <ModalBox open={this.props.open}>
              <div className="closeBox"> <Cross onClick={() => this.props.openModal(false)} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div>
              <ProblemController Category={this.state.category} {...this.props} onCloseModal={() => this.props.openModal(false)} getValue={data => this.props.getValue(data)} />
            </ModalBox>
            :
            <React.Fragment>
              {/* <div className="closeBox"> <Cross onClick={()=>this.props.close()} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div> */}
              <ProblemController Category={this.state.category} {...this.props} onCloseModal={() => this.props.openModal(false)} getValue={data => this.props.getValue(data)} />
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ProblemList: state.DesignCard.status.ProblemList,
    ProblemCount: state.DesignCard.status.ProblemCount,
    ProblemDetail: state.DesignCard.status.ProblemDetail,
    ProblemCategory: state.DesignCard.status.Category,
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProblemListRequest: (page) => {
      return dispatch(getProblemListRequest(page));
    },
    getProblemListFilterRequest: (category_id) => {
      return dispatch(getProblemListFilterRequest(category_id));
    },
    getProblemDetailRequest: (uid) => {
      return dispatch(getProblemDetailRequest(uid));
    },
    UpdateAnswerRequest: (token, data) => {
      return dispatch(UpdateAnswerRequest(token, data));
    },
    getProblemCategoryRequest: () => {
      return dispatch(getProblemCategoryRequest());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemContainer));


