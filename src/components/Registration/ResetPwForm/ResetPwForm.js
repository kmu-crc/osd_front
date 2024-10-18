// import React, { Component } from "react";
// import styled from "styled-components";
// import { FormInput } from "components/Commons/FormItems";
// import { ValidationGroup } from "modules/FormControl";
// import ResetPwModal from "./ResetPwModal";
// // import { confirm } from "components/Commons/Confirm/Confirm";
// import { alert } from "components/Commons/Alert/Alert";
// const Bg = styled.div`
//   width: 100vw;
//   height: 100vh;
//   position: relative;
// `;

// const ResetFormCard = styled.div`
//   width: 60%;
//   min-width: ${PxtoRem(300)};
//   height: ${PxtoRem(200)};
//   background-color: white;
//   box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   padding: ${PxtoRem(20)} ${PxtoRem(40)};
// `;


// class ResetPwForm extends Component {

//   state = {
//     loading: false
//   };

//   async shouldComponentUpdate(nextProps) {
//     if (JSON.stringify(this.props.status) !== JSON.stringify(nextProps.status)) {
//       if (nextProps.status === "SUCCESS") {
//         this.setState({ loading: false });
//         this.props.history.push('./signin');
//         //console.log("this loading state success >> ", this.state.loading);
//         await alert(nextProps.message, "확인");
//       } else if (nextProps.status === "FAILURE") {
//         this.setState({ loading: false });
//         //console.log("this loading state failure >> ", this.state.loading);
//         await alert(nextProps.message, "확인");
//       }
//     }
//     return true;
//   }



  
//   render() {
//     return (
//       <Bg>
//         <ResetFormCard>
          
//         </ResetFormCard>
//       </Bg>
//     );
//   }
// }

// export default ResetPwForm;
