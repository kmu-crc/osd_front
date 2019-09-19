// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
// import opendesign_style from "opendesign_style";
// 
// const InputWrap = styled.div`
//   position: relative;
//   margin-bottom: 2.5rem;
// `
// 
// const Message = styled.div`
//   display: block;
//   position: absolute;
//   color: ${opendesign_style.color.main.basic};
//   left: 0;
//   bottom: -1.5rem;
// `
// 
// const Input = styled.input`
//   width: 100%;
//   margin: 0;
//   outline: 0;
//   -webkit-appearance: none;
//   line-height: 1.21428571em;
//   padding: 0.67857143em 1em;
//   font-size: 1em;
//   background: #fff;
//   border: 1px solid ${opendesign_style.color.grayScale.scale2};
//   color: ${opendesign_style.color.grayScale.scale7};
//   border-radius: 0.28571429rem;
//   box-shadow: 0 0 0 0 transparent inset;
//   transition: color 0.1s ease, border-color 0.1s ease;
//   &::placeholder {
    // color: ${opendesign_style.color.grayScale.scale5};
//   }
//   &:focus {
    // &::placeholder {
    //   color: ${opendesign_style.color.grayScale.scale7};
    // }
    // border-color: #85b7d9;
    // box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
//   }
//   &.error {
    // border: 1px solid ${opendesign_style.color.main.basic};
    // color: ${opendesign_style.color.main.basic};
    // &::placeholder {
    //   color: ${opendesign_style.color.main.basic};
    // }
//   }
// `;
// 
// export class FormInput extends Component {
//   state = {
    // value: "",
    // target: null,
    // validates: []
//   };
// 
//   componentDidMount(){
    // if(this.props.validates){
    //   this.setState({ validates: this.props.validates });
    // }
    // if(this.props.value){
    //   this.setState({ value: this.props.value });
    // }
    // this.init();
//   }
// 
//   init = async () => {
    // await this.setState({target: this.input._reactInternalFiber.child.stateNode})
    // this.returnData();
//   }
// 
//   onChangeValue = async e => {
    // const event = { ...e };
    // const target = event.currentTarget;
    // await this.setState({ value: target.value, target });
    // this.returnData();
//   };
// 
//   returnData = async (e) => {
    // let event = null;
    // if(e && this.props.prevent) {
    //   if(e.key === "Enter"){
        // e.preventDefault();
    //   }
    // }
    // event = {...e};
    // if(this.props.getValue) await this.props.getValue(this.state, event);
    // if(event.type === "blur" && this.props.onBlur) await this.props.onBlur();
//   }
//   render() {
    // const { type, minLength, maxLength,name, placeholder, style, id } = this.props;
    // return (
    //   <InputWrap>
       //  <Input 
        //   type={type ? type : "text"}
        //   name={name && name}
        //   maxLength = {maxLength ? maxLength : false}
        //   minLength = {minLength ? minLength : false}
        //   placeholder={placeholder && placeholder}
        //   style={style && style}
        //   id={id ? id : name}
        //   value={this.state.value}
        //   onChange={this.onChangeValue}
        //   ref={ref => (this.input = ref)}
        //   className=""
        //   onBlur={this.returnData}
        //   onKeyPress={this.returnData}
        // />
      //   <Message></Message> 
      // </InputWrap> 
    // );
//   }
// }
// 
// FormInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   id: PropTypes.string,
//   type: PropTypes.string,
//   style: PropTypes.object,
//   onChange: PropTypes.func
// };
