import React, { Component } from "react"
import noimg from "source/noimg.png"
import thumbup from "source/thumbup.png"
import email from "source/email.png"
import IconView from "source/IconView"
import DateFormat from "modules/DateFormat"
import forked from "source/forked.svg"
import editPen from "source/edit.png"
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"

class DesignDetail extends Component {
  constructor(props)
  {
    super(props);
    this.state={isMyDesign:false}
  }
  componentDidMount() 
  {
    console.log("test");
    if(this.props.userInfo == null)this.setState({isMyDesign:false});
    else if(this.props.userInfo.uid == this.props.DesignDetail.user_id)
    {
      this.setState({isMyDesign:true});
    }  
    else{
      this.setState({isMyDesign:false});
    }
  }
  gotoModifyPage = () => {
    window.location.href = "/groupDetail/" + this.props.id+"/modify"
  }

  render() {
    const designDetail = this.props.DesignDetail
    const count = this.props.Count
    
    const isMyDesign = this.state.isMyDesign==true?"디자인 정보 수정하기":"관심 디자인 등록하기";
    let isMyDesignIcon = this.state.isMyDesign == true ? editPen:thumbup;
    

    const thumbnail = (designDetail && designDetail.img && designDetail.img.l_img) || noimg
    return (<>
      {/* design info */}
      <div style={{ marginTop: "21px", display: "flex", backgroundColor: "#EFEFEF", width: "1920px", height: "237px" }}>
        {designDetail.parent_design && <div style={{
          position: "absolute", marginTop: "19px", marginLeft: "220px", width: "20px", height: "42px",
          backgroundImage: `url(${forked})`, backgroundSize: "cover"
        }} />}
        <div style={{ marginTop: "19px", marginLeft: "65px", background: `url(${thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: `url${thumbnail}`, backgroundColor: "#D6D6D6", borderRadius: "15px", width: "200px", height: "200px", backgroundRepeat: "no-repeat" }}></div>
        <div style={{ marginTop: "19px", marginLeft: "42px", }}>
          <div style={{ width: "165px", height: "29px", marginTop: "0px", marginLeft: "0px", fontSize: "20px", color: "#707070", fontWeight: "500", textAlign: "left", lineHeight: "29px" }}>{designDetail.title.slice(0, 10)}</div>
          <div style={{ width: "170px", height: "29px", marginTop: "13px", marginLeft: "0px", fontSize: "20px", color: "#707070", fontWeight: "300", textAlign: "left", lineHeight: "29px" }}>{designDetail.userName.slice(0, 8)} {(designDetail.member && designDetail.member.length > 1) && "외 " + (designDetail.member.length - 1).toString() + "명"}</div>
          <div style={{ width: "165px", height: "29px", marginTop: "69px", marginLeft: "0px", fontSize: "17px", color: "#FF0000", fontWeight: "500", textAlign: "left", lineHeight: "29px", display: "flex", alignItems: "bottom" }}>{designDetail.is_parent && "파생된 디자인 "}{designDetail.is_parent && <div style={{ marginLeft: "10px" }}>{designDetail.children_count["count(*)"]}</div>}</div>
          <div style={{ width: "165px", height: "22px", marginTop: "13px", marginLeft: "0px", fontSize: "15px", color: "#707070", fontWeight: "500", textAlign: "left", display: "flex" }}>
            <div style={{ marginTop: "auto" }}><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
            <div style={{ marginTop: "auto", marginLeft: "5.85px", width: "34px" }}>{count.view_count}</div>
            <div style={{ marginTop: "auto", marginLeft: "22px", width: "22px", height: "22px", padding: "0px" }}><i style={{ marginTop: "auto", fontSize: "20px" }} className="material-icons">thumb_up</i></div>
            <div style={{ marginTop: "auto", marginLeft: "6px", width: "34px" }}>{count.like_count}</div>
          </div>
        </div>
        <div style={{ marginTop: "19px", marginLeft: "65px" }}>
          <div style={{ width: "100px", height: "25px", color: "#FF0000", fontSize: "17px", fontFamily: "Noto Sans KR", lineHeight: "25px", fontWeight: "300", textAlign: "left" }}>{designDetail.categoryName}</div>
          <div style={{ width: "423px", height: "158px", marginTop: "17px", color: "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", lineHeight: "29px", fontWeight: "300" }}>{designDetail.explanation ? designDetail.explanation.slice(0, 150) : designDetail.userName + "님의 " + designDetail.title + "디자인입니다."}</div>
        </div>
        <div style={{ marginTop: "19px", marginLeft: "65px" }}>
          <div style={{ width: "100px", height: "25px", color: "#FF0000", fontSize: "17px", fontFamily: "Noto Sans KR", lineHeight: "25px", fontWeight: "300", textAlign: "left" }}></div>
          <div style={{ width: "423px", height: "158px", marginTop: "17px", color: "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", lineHeight: "29px", fontWeight: "300" }}>{designDetail.explanation && designDetail.explanation.slice(150, 300 - 3)}{(designDetail.explanation.length > 300 - 3) ? "..." : ""}</div>
        </div>
        <div style={{ marginTop: "19px", marginLeft: "auto", marginRight: "72px" }}>
          <div style={{ marginTop: "0px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#FF0000", textAlign: "right", marginLeft: "auto", fontWeight: "500" }}>파생 디자인 생성</div>
          
          <div style={{ height: "45px", display: "flex", marginTop: "17px", marginLeft: "auto" }}>
            <div onClick = {this.state.isMyDesign==true?this.gotoModifyPage:null} style={{ marginTop: "16px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", fontWeight: "300", color: "#707070", textAlign: "right" }}>{isMyDesign}</div>            
            <div style={{ backgroundImage: `url(${isMyDesignIcon})`,backgroundSize: "cover",marginLeft: "15px", width: "45px", height: "45px",   backgroundPosition: "center center", }}></div>
          </div>
          {this.state.isMyDesign==false?
          <div style={{ height: "45px", display: "flex", marginTop: "15px", marginLeft: "auto" }}>
            <div style={{ marginTop: "16px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", marginLeft: "auto", fontWeight: "300", color: "#707070", textAlign: "right" }}>메시지 보내기</div>
            <div style={{ marginLeft: "15px", width: "45px", height: "45px", background: `url(${email})`, backgroundSize: "cover", backgroundPosition: "center center", }}></div>
          </div>
          :<div style={{height: "45px", display: "flex", marginTop: "15px", marginLeft: "auto"}}></div>}
          <div style={{ marginTop: "29px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", lineHeight: "40px", textAlign: "right", marginLeft: "auto", fontWeight: "300" }}>최근 업데이트 {DateFormat(designDetail.create_time)}</div>
        </div>
      </div>

      {/* design detail */}
      <div style={{ marginTop: "65px" }}>
        <DesignDetailStepContainer id={designDetail.uid} />
      </div>
    </>)
  }
}

export default DesignDetail;