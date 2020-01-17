import React from 'react';
import styled from 'styled-components'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import PostCodeModal from 'modules/PostCode/PostCode';

const phoneNumList = [
    {value:0,text:"010"},
    {value:1,text:"011"},
    {value:2,text:"016"},
    {value:3,text:"017"},
    {value:4,text:"018"},
    {value:5,text:"019"},
    {value:6,text:"02"},
    {value:7,text:"031"},
    {value:8,text:"032"},
    {value:9,text:"033"},
    {value:10,text:"041"},
    {value:11,text:"042"},
    {value:12,text:"043"},
    {value:13,text:"044"},
    {value:14,text:"051"},
    {value:15,text:"052"},
    {value:16,text:"053"},
    {value:17,text:"054"},
    {value:18,text:"055"},
    {value:19,text:"061"},
    {value:20,text:"062"},
    {value:21,text:"063"},
    {value:22,text:"064"},
    {value:23,text:"070"},
]
const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };

const SectionBox = styled.div`
display:flex;
margin-bottom:80px;
*{
    font-family:Noto Sans KR;
}
.payment_content_label{
    margin-right:80px;
    min-width: 150px;
    height:30px;
    border-right:10px solid #707070;
    margin-left: 15px;
    font-weight: bold;
    font-size: ${TxtSz.M}px;
}
.payment_contents_box{
    width:100%;
    display:flex;
    flex-direction:column;
   
    .inner_round_box{
        width:100%;
        display:flex;
        .inner_label{
            min-width:120px;
            font-size:12pt;
            font-weight:500;
            padding:10px;     
            margin-right:80px;                   
        }
        .inner_box{
            width:100%;
            .inner_line_box{
                padding:10px;
                width:100%;
                display:flex;
                .dropdown-style{
                    width:50px;
                }
            }
        }

    }
}
`

const FormText = styled.input.attrs({type:"text"})`
    width:${props=>props.width}px;
    height:40px;
    font-size:11pt;
    color:#707070;
    outline:none;
    border:1px solid #dddddd;
    border-radius:5px;
    padding:10px;
    margin-right:10px;
`
const GrayButton = styled.div`
    width:100px;
    height:40px;
    padding:10px;
    margin-left:10px;
    border-radius:5px;
    font-weight:500;
    background-color:#707070;
    color:white;

    cursor:pointer;
`
class DeliverySection extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",phone_first:0,phone_second:"",address_essential:"",address_detail:"",comment:"",
            post_code:"",post_code_modal:false,
        }
        this.onChangeNameValue=this.onChangeNameValue.bind(this);
        this.onChangePhoneFirstValue=this.onChangePhoneFirstValue.bind(this);
        this.onChangePhoneSecondValue=this.onChangePhoneSecondValue.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeAddressEssentialValue=this.onChangeAddressEssentialValue.bind(this);
        this.onChangeAddressDetailValue=this.onChangeAddressDetailValue.bind(this);
        this.onChangePostCode = this.onChangePostCode.bind(this);
        this.onClickPostCode = this.onClickPostCode.bind(this);
        this.onChangePostCodeValue = this.onChangePostCodeValue.bind(this);
        this.onChangeAddressEssentialValue = this.onChangeAddressEssentialValue.bind(this);
        this.onShowPostCodeModal = this.onShowPostCodeModal.bind(this);
        
    }

    onChangeNameValue(event){
        this.setState({name:event.target.value});
        this.props.onChangeNameValue(event.target.value);
    }
    onChangePhoneFirstValue(event,{value}){
        this.setState({phone_first:{value}.value})
        this.props.onChangePhoneFirst(phoneNumList[{value}.value].text);
    }
    onChangePhoneSecondValue(event){
        this.setState({phone_second:event.target.value})
        this.props.onChangePhoneSecond(event.target.value);
    }
    onChangeAddressEssentialValue(event){
        this.setState({address_essential:event.target.value});
        this.props.onChangeAddressEssential(event.target.value);
    }
    onChangeAddressDetailValue(event){
        this.setState({address_detail:event.target.value});
        this.props.onChangeAddressDetail(event.target.value);
    }
    onChangeComment(event){
        this.setState({comment:event.target.value});
        this.props.onChangeComment(event.target.value);
    }
    onChangePostCode(event){
        this.setState({post_code:event.target.value});
    }
    onClickPostCode(){
        this.setState({post_code_modal:true});
    }
    onChangePostCodeValue(code){
        this.setState({post_code:code});
    }
    onChangeAddressEssentialValue(address){
        this.setState({address_essential:address});
    }
    onShowPostCodeModal(show){
        this.setState({post_code_modal:show});
    }
    render(){
        return(
            <React.Fragment>
                <PostCodeModal 
                post_code_modal={this.state.post_code_modal}
                onChangeModal= {this.onShowPostCodeModal}
                onChangeAddress = {this.onChangeAddressEssentialValue}
                onChangePostCode = {this.onChangePostCodeValue}
                />
            <SectionBox>
                        <div className="payment_content_label">배송 정보</div>
                            <div className="payment_contents_box ">
                                    <div className="inner_round_box">
                                        <div className="inner_label">이름</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                            <FormText value={this.state.name} onChange={this.onChangeNameValue} width="300"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inner_round_box">
                                        <div className="inner_label">연락처</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                                <Dropdown className="dropdown-style"options={phoneNumList} selection onChange={this.onChangePhoneFirstValue}
                                                         value={this.state.phone_first} style={{marginRight:"10px"}}/>
                                                <FormText value={this.state.phone_second} onChange={this.onChangePhoneSecondValue} width="150"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inner_round_box">
                                        <div className="inner_label">배송지</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                                <FormText 
                                                onChange={this.onChangePostCode} 
                                                value={this.state.post_code}
                                                width="150" style={{backgroundColor:"#EFEFEF"}} readOnly/>
                                                <GrayButton onClick={this.onClickPostCode} style={{color:"white"}}>우편번호찾기</GrayButton>
                                            </div>
                                            <div className="inner_line_box">
                                                <FormText 
                                                onChange={this.onChangeAddressEssentialValue} 
                                                value={this.state.address_essential} 
                                                width="200" 
                                                style={{backgroundColor:"#EFEFEF"}} readOnly/>
                                                <FormText onChange={this.onChangeAddressDetailValue} 
                                                width="100" 
                                                value={this.state.address_detail}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inner_round_box">
                                        <div className="inner_label">배송요청사항</div>
                                        <div className="inner_box">
                                            <div className="inner_line_box">
                                            <FormText value={this.state.comment} onChange={this.onChangeComment} width="400"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                            </div>
                </SectionBox>
                </React.Fragment>
        );
    }
    
}export default DeliverySection;