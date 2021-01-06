import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ProblemController from "components/Designs/CardSourceDetail/ProblemController";
import { getProblemListRequest,getProblemDetailRequest,UpdateAnswerRequest } from "redux/modules/design/card";
import {Modal} from "semantic-ui-react"
import styled from 'styled-components';
import Cross from "components/Commons/Cross";

const ModalBox = styled(Modal)`
  width:938px;
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
  }
  componentDidMount() {
    this.props.getProblemListRequest();
  }
  render() {
    console.log(this.props.item)
    return (
      <React.Fragment>
      {
        this.props.open==true||this.props.item.content==""?
        <ModalBox open={this.props.open}>
        <div className="closeBox"> <Cross onClick={()=>this.props.openModal(false)} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div>
        <ProblemController {...this.props} onCloseModal={()=>this.props.openModal(false)}  getValue={data=>this.props.getValue(data)}/>
        </ModalBox>
        :
        <React.Fragment>
        {/* <div className="closeBox"> <Cross onClick={()=>this.props.close()} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div> */}
        <ProblemController {...this.props} onCloseModal={()=>this.props.openModal(false)}  getValue={data=>this.props.getValue(data)}/>
        </React.Fragment>
      }
      </React.Fragment>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    ProblemList:state.DesignCard.status.ProblemList,
    ProblemDetail:state.DesignCard.status.ProblemDetail,
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProblemListRequest: () => {
      return dispatch(getProblemListRequest());
    },
    getProblemDetailRequest: (uid) => {
      return dispatch(getProblemDetailRequest(uid));
    },
    UpdateAnswerRequest:(token,data)=>{
      return dispatch(UpdateAnswerRequest(token,data));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemContainer));


