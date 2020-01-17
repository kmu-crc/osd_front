import React, { Component } from "react"
import DaumPostcode from 'react-daum-postcode';
import { Modal, Icon } from "semantic-ui-react";
import styled from 'styled-components'


class PostCode extends Component {
    
    constructor(props){
        super(props);
        this.handleAddress = this.handleAddress.bind(this);
    }

    handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        // console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        // console.log(data.zonecode,data.bname,data.buildingName);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        this.props.onChangeAddress(fullAddress);
        this.props.onChangePostCode(data.zonecode);
        this.props.onChangeModal(false);
      }
    render() {
        return(
            <Modal open={this.props.post_code_modal}>
            <DaumPostcode
                    onComplete={this.handleAddress}
                    {...this.props}
            />
            </Modal>

        );
    }
}

export default PostCode;