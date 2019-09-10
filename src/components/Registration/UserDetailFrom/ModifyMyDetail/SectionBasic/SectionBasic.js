import React, { Component } from "react";
import { FormControl, ValidationGroup } from "modules/FormControl";
import SelectBox from "components/Commons/SelectBox"
import showPw from "source/show_password.svg";
import styled from "styled-components";
import noimg from "source/noimg.png"

const BasicSecBox = {paddingLeft:"47px"}
const BasicSecTitle={ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
const BasicSec_thumb_Box = { display: "flex",width:"1200px", }
const BasicSec_thumb_ExplainBox={ marginLeft: "54.5px", marginTop: "100px"}
const BasicSec_thumb_FindBox ={width: "63px", height: "25px", cursor: "pointer" }
const BasicSec_thumb_FindTitle = {cursor: "pointer",fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }
const BasicSec_thumb_FindExplain ={ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }


class SectionBasic extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {nick:true,nickname:"",introduce:"",thumbnail:noimg,thumbnail_name:""}
        this.handleInputNickName = this.handleInputNickName.bind(this);
        this.handleInputIntroduce = this.handleInputIntroduce.bind(this);
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    }

    shouldComponentUpdate(nextProps)
    {
      if(this.props.MyDetail !=nextProps.MyDetail)
      {
        console.log("MYDETAIL",nextProps.MyDetail.nick_name);
        this.setState({nickname:nextProps.MyDetail.nick_name==null?"":nextProps.MyDetail.nick_name,
                      introduce:nextProps.MyDetail.about_me==null?"":nextProps.MyDetail.about_me,
                      thumbnail:nextProps.MyDetail.profileImg.m_img==null?"":nextProps.MyDetail.profileImg.m_img});
        this.props.updateThumbnail(nextProps.MyDetail.profileImg.m_img==null?"":nextProps.MyDetail.profileImg.m_img);
        this.props.updateIntroduce(nextProps.MyDetail.about_me==null?"":nextProps.MyDetail.about_me);
        this.props.updateNickName(nextProps.MyDetail.nick_name==null?"":nextProps.MyDetail.nick_name);


        return true;
      }
      return true;
    }
    handleOnChangeThumbnail(event)
    {
      event.preventDefault();
      const reader = new FileReader();
      const file =event.target.files[0];
      reader.onloadend = ()=>{
        this.setState({thumbnail:reader.result,thumbnail_name:file.name})
          this.props.updateThumbnail(reader.result,file.name);
      }
      if(event.target.files[0])
      {
        reader.readAsDataURL(file);
      }
        
    }
    handleInputIntroduce(event)
    {
      this.setState({introduce:event.target.value})
      this.props.updateIntroduce(event.target.value);
    }

    handleInputNickName(event)
    {
      this.setState({nickname:event.target.value})
      this.props.updateNickName(event.target.value);
    }
    render()
    {
        const thumbnailURL = this.state.thumbnail;
        return(
            <section id="basic" style={{ paddingLeft: "95.5px" }} >
            {/* thumbnail */}
             <div style={BasicSec_thumb_Box}>
                    <div style={BasicSecTitle}>프로필 사진
                    </div>
                    <div style={{marginLeft: "67px", width: "210px", height: "210px", borderRadius: "10px", 
                    backgroundImage: `url(${thumbnailURL==null?noimg:thumbnailURL})`,backgroundSize: "cover", backgroundPosition: "center center"}} ></div>
                    <div style={BasicSec_thumb_ExplainBox}>
                    <div style={BasicSec_thumb_FindBox}>
                        <label htmlFor="file" style={BasicSec_thumb_FindTitle}>찾아보기</label>
                        <input hidden onChange = {this.handleOnChangeThumbnail} id="file" type="file"/>
                    </div>
                    <div style={BasicSec_thumb_FindExplain}>프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.</div>
                    </div>
            </div>
            {/* nick */}
            <div style={{ marginTop: "86px", width: "1544px" }}>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "117px", width: "56px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>닉네임</div>
                <div style={{
                  width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
                  fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
                }} >
                  <input type="text" onChange = {this.handleInputNickName} value={this.state.nickname} maxLength="50" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", 
                  border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="닉네임을 입력하세요." />
                </div>
                <div style={{ marginTop: "16px", marginLeft: "27.5px", fontSize: "17px", fontWeight: "300", lineHeight: "25px", color: "#707070", width: "230px", height: "25px" }}>
                  {/* {this.state.nick ? <div>사용 가능한 닉네임입니다.</div> : <div style={{ color: "#FF0000" }}>사용 하실 수 없는 닉네임입니다.</div>} */}
                </div>
              </div>
            </div>
            {/* introduction */}
            <div style={{ marginTop: "50px", display: "flex" }}>
              <div style={{ width: "75px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>자기소개</div>
              <div style={{ width: "717.5px", height: "244px", marginLeft: "98px", backgroundColor: "#EFEFEF", borderRadius: "5px", marginTop: "14px", }}>
                <textarea onChange = {this.handleInputIntroduce} value ={this.state.introduce} maxLength="300" style={{
                  width: "717.5px", height: "244px", backgroundColor: "#EFEFEF", outline: "none", border: "none", resize: "none", lineHeight: "35px",
                  textAlign: "left", fontSize: "20px", fontWeight: "300", color: "#707070", paddingTop: "26px", paddingLeft: "22px", paddingBottom: "34px", paddingRight: "32.5px"
                }} placeholder="자기소개를 입력하세요." />
              </div>
            </div>
          </section>
        );
    }
}
export default SectionBasic;