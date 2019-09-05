import React from'react';
import plusImg from "source/plus_cross_gray.png";
// import SummaryIcon from "source/jina.png";
import noImage from "source/thumbnail.png"
import styled from "styled-components";

import SearchMemverContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer"
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
// import FormDataToJson from "modules/FormDataToJson"
import Socket from "modules/Socket"
// import { Modal } from 'semantic-ui-react';



const SummaryList = styled.div`
height:794px;
margin-top:14px;
padding-left:54px;
&:hover {
overflow-y: scroll;
}`
// const MsgSectionBoard=styled.div`
// position:relative;
// width: 1259px;
// height: 602.5px;
// flex-direction:column;
// justify-content:flex-end;
// overflow:hidden;
// &:hover {
// overflow-y: scroll;

// }`

const Banner ={width:"100%",height:"48px",marginTop:"8px",backgroundColor:"#EFEFEF"};
const BannerText = {display:"inline-block",width:"74px",height:"29px",marginTop:"9px",marginLeft:"65px",
                    fontSize:"20px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",
                    textAlign:"center",lineHeight:"29px"};
const MessageBox = {width:"1750px",height:"869px",margin:"26px 0px 27px 65px"}


const MessageAside = {display:"inline-block",width:"445px",height:"100%",marginRight:"7px",overflow:"hidden",
                        borderRadius:"25px 0 0 25px",backgroundColor:"#EFEFEF",}
const MessageAsideHeader = {position:"relative",height:"75px",overflow:"hidden"}
const MessageAsideHeaderTitle={position:"absolute",width:"303px",height:"30px",left:"54px",top:"33px",
                            fontSize:"20px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"left",lineHeight:"30px"}
const MessageAsideHeaderIcon={position:"absolute",width:"51px",height:"51px",right:"20px",bottom:"0px",
                            background:`url(${plusImg})`,backgroundSize: "cover", backgroundPosition: "center center",opacity:"0.5"}

const MsgSummaryItem = {position:"relative",overflow:"hidden",width:"336px",height:"70px",marginBottom:"30px",opacity:"0.5"};
const MsgSummarySelectItem = {position:"relative",overflow:"hidden",width:"336px",height:"70px",marginBottom:"30px"};
// const MsgSummaryIcon = {position:"absolute",width:"70px",height:"70px",left:"0px",top:"0px",background:`url(${SummaryIcon})`,
                        // backgroundSize:"cover",backgroundPosition:"center center"}
const MsgSummaryName = {position:"absolute", width:"244px",height:"29px",left:"92px",
                        fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"left",lineHeight:"29px"}
const MsgSummaryBoard = {position:"absolute", width:"244px",height:"28px",left:"92px",bottom:"3px",
                        fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"0",textAlign:"left",lineHeight:"29px"}


                        
const MessageTitle = {overflow:"hidden",position:"relative",height:"69px"}
const MessageTitleName = {position:"absolute",width:"244px",height:"29px",bottom:"5px",
                           fontSize:"20px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",lineHeight:"29px"}
const MessageSection = {overflow:"hidden",display:"inline-block",width:"1298px",height:"100%",paddingLeft:"26px",paddingRight:"23px",
                        borderRadius:"0px 25px 25px 0px",backgroundColor:"#EFEFEF"}


                        


const MessageDivisionLine = {borderTop:"1px solid #707070"}
const MessageSectionSend={overflow:"hidden",position:"relative",height:"197.5px"}
const MessageSectionTextArea={position:"absolute",width:"1091px",height:"147px",top:"24.5px",
                            border:"none",outline:"none",resize:"none",backgroundColor:"#EFEFEF",
                            fontSize:"18px",textAlign:"left",fontWeight:"500",lineHeight:"27px",color:"#707070"};
const MessageSectionSendBtn={position:"absolute",width:"117px",height:"170px",right:"0px",
                            borderRadius:"0px 0px 25px 0px",backgroundColor:"#FFFFFF",
                            fontSize:"18px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"center",lineHeight:"170px",
                            };


function SummaryItem(props)
{
    let SummaryStyle = MsgSummaryItem;
    if(props.opacityON === true) SummaryStyle = MsgSummarySelectItem;
   return(
    <div style={SummaryStyle}>
    <div style={{position:"absolute",borderRadius:"50px",width:"70px",height:"70px",left:"0px",top:"0px",background:`url(${props.s_img})`,backgroundSize:"cover",backgroundPosition:"center center"}}></div>    
    <div style={MsgSummaryName}>{props.friend_name}</div>  
    <div style={MsgSummaryBoard}>{props.message}</div>         
    </div>);
}
// function SummarySelectItem(props)
// {
//   return(
//     <div style={MsgSummarySelectItem}>
//     <div style={{position:"absolute",borderRadius:"50px",width:"70px",height:"70px",left:"0px",top:"0px",background:`url(${props.s_img})`,backgroundSize:"cover",backgroundPosition:"center center"}}></div>    
//     <div style={MsgSummaryName}>{props.friend_name}</div>  
//     <div style={MsgSummaryBoard}>{props.message}</div>         
//     </div>);
// }




class Messages extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state={msgValue:'',msgId:-1,selectId:null,selectName:null,openMember:false,showSearch:false,friendList:[],render:true};
        this.handleChangeMsgValue = this.handleChangeMsgValue.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.handleSelectMsgSummary = this.handleSelectMsgSummary.bind(this);
        this.handleOpenMember=this.handleOpenMember.bind(this);
        this.handleClickSearchMemberItem=this.handleClickSearchMemberItem.bind(this); 
        this.initMsgValue = this.initMsgValue.bind(this);
        this.handleCloseMember = this.handleCloseMember.bind(this);
        this.getValue = this.getValue.bind(this);
    }        


    async componentDidMount() {
      await this.props.GetMyMsgListRequest(this.props.token)
        .then(async (res) => {
          if (res.MsgList && res.MsgList.length > 0) {
            let arr = [];
            arr = res.MsgList.map(list => {return (list.friend_id)})
            await this.setState({
              friendList: arr
            });
          }
        });
      if (this.props.id && this.props.name) {
        let id = parseInt(this.props.id, 10);
        this.selectMember({
          email: null,
          nick_name: this.props.name,
          uid: id
        })
        Socket.on("reload_msglist", () => {
          //console.log("giveit")
          this.setState({ render: true })
        })
      }
      if(this.props.id&&this.props.name)
      {
        this.setMsgId(-1,this.props.id,this.props.name)
      }
    }
    
    shouldComponentUpdate(nextProps) {
      setTimeout(() => {
        //this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
      }, 100);
      if (JSON.stringify(this.props.id) !== JSON.stringify(nextProps.id)) {
        if (nextProps.id && nextProps.name) {
          let id = parseInt(nextProps.id, 10);
          this.selectMember({
            email: null,
            nick_name: nextProps.name,
            uid: id
          });
        }
      }
      return true;
    }
    
    
  
    getValue = (value) => {
      this.setState({
        openMember: true
      });
      if (!value) {
        this.setState({
          openMember: false
        });
        return;
      }
      this.props.SearchMemberRequest(null, { key: value }, this.props.token);
    }
  
    selectMember = async (data) => {
      await this.setState({
        render: false
      });
      const index = this.state.friendList.indexOf(data.uid);
      console.log(this.state, this.props.MessageList, index);
      if (index === -1) {
        this.setState({
          selectId: data.uid,
          selectName: data.nick_name,
          openMember: false,
          msgId: -1,
          render: true
        });
      } else {
        this.setState({
          selectId: data.uid,
          selectName: data.nick_name,
          openMember: false,
          msgId: this.props.MessageList[index].uid,
          render: true
        });
      }
      console.log("1111111111"+this.state.selectId);
    }
  
    setMsgId = async (group_id, user_id, user_name) => {
      await this.setState({
        msgId: group_id,
        selectId: user_id,
        selectName: user_name,
        openMember: false,
        render: false
      });
      this.setState({
        render: true
      });
      setTimeout(async () => {
        await this.props.GetMyMsgListRequest(this.props.token)
        this.setState({ render: true })
      }, 250)
    }
  
    onSubmitForm = async (data) => {
      if (this.state.selectId === null) {
        alert("받는 사람을 지정해주세요.")
        return
      }
      this.props.SendMessageRequest(this.props.token, {message:this.state.msgValue}, this.state.selectId)
        .then(async res => {
          if (res.data && res.data.success === true) {
            await this.props.GetMyMsgListRequest(this.props.token)
            await this.setState({
              msgId: res.data.groupId,
              render: false
            });
          }
          this.setState({
            render: true
          });
          this.props.history.replace("/message");
        });   
        this.initMsgValue();   
         
    }
    handleChangeMsgValue(event)
    {
      this.setState({msgValue:event.target.value})
    }

    initMsgValue()
    {
      this.setState({msgValue:""})
    }
    handleClickSend()
    {      
      console.log(this.props);
    }
    handleSelectMsgSummary(select_id,select_name,msgID)
    {      
      this.setState(state=>({selectId:select_id,selectName:select_name,msgId:msgID}));
    }
    handleOpenMember(event)
    {
      const isOpen=this.state.showSearch;
      this.setState(state=>({showSearch:!isOpen}));
    }
    handleClickSearchMemberItem(id,name)
    {
      this.setMsgId(-1,id,name);

    }     
    handleCloseMember(event)
    {
      if(event.target.className!=="searchRect")
      {
        this.setState({showSearch:false})
      }
      // if(event.target)
      // this.setState({showSearch:false});
    }
    render()
    {
      let arrSummaryList=[];
      if(this.props.MessageList.length>0)
      { 
        arrSummaryList = this.props.MessageList.map((item,index)=>{  
          let SelectedItem = false;
          if(this.state.selectId === item.friend_id)   SelectedItem=true;       
          return(
            <div key={index} style={{cursor:"pointer"}} onClick={()=>this.setMsgId(item.uid, item.friend_id, item.friend_name)}>
               <SummaryItem  s_img={item.s_img==null?noImage:item.s_img} friend_name={item.friend_name} message={item.message} opacityON={SelectedItem}/>
           </div>
          )
      });}
      arrSummaryList.reverse();

     
        return(
            <div style = {{cursor:"pointer"}} onClick = {this.handleCloseMember}>
                <div style={Banner}>
                    <div style={BannerText}>메시지함</div>
                </div>
                <div  className = "searchRect" style={MessageBox}>
                    <div  className = "searchRect" style={MessageAside}>
                        <div  className = "searchRect" style={MessageAsideHeader}>
                            <div  className = "searchRect" style={MessageAsideHeaderTitle}>받은 메세지함</div>
                            <div  className = "searchRect" style={MessageAsideHeaderIcon} onClick={this.handleOpenMember}>                              
                            </div>                           
                        </div>
                        {this.state.showSearch&&(
                        <React.Fragment>
                          {
                            this.state.hideSearch === true?
                            null:
                            <SearchMemverContainer  className = "searchRect" addMemberItem = {this.handleClickSearchMemberItem}/>
                          }
                          
                        </React.Fragment>)
                        }
                        <SummaryList  className = "searchRect"> 
                                 {arrSummaryList}         
                        </SummaryList>
                    </div>
                    <div style={MessageSection}>
                            <div style={MessageTitle}>
                                <div style={MessageTitleName}>{this.state.selectName}</div>
                            </div>
                            
                            {this.state.render&&
                            <MessageDetailContainer repaint = {this.state.render} id={this.state.msgId}/>
                            }
                            <div style={MessageDivisionLine}></div>
                            <div style={MessageSectionSend}>
                                <input type="textarea" onChange={this.handleChangeMsgValue} value={this.state.msgValue} style={MessageSectionTextArea}/>                                
                                <div onClick={this.onSubmitForm} style={MessageSectionSendBtn}>전송하기</div>
                            </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Messages;