import React,{ Component } from "react";
import deleteItem from "source/deleteItem.png"
import SelectBox from "components/Commons/SelectBox"

const emptyCategory = [{ value: 0, text: "" }]

const PeerBox = { display: "flex", marginRight: "50px" }
const Peer_Name = { marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", 
                    color: "#707070", width: "112px", height: "29px" }
const Peer_DeleteBtn = { marginTop: "7.34px", marginLeft: "13.86px", width: "16px", height: "16px" }

const Contents_Name = { marginBottom:"1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", 
                    color: "#707070", width: "125px", height: "29px" }
const Contents_DeleteBtn = { marginTop: "7.34px",  width: "16px", height: "16px" }

const AdditionalBox = { marginBottom: "16px", paddingLeft: "51px" }
const AdditionalTitle={ width: "140px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
const Additional_category_Box ={width:"100%",display: "flex" }
const Additional_category_one={ marginLeft: "34px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }
const Additional_category_two={ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }

const Additional_invite_Box = {marginTop: "120px", width:"100%",height:"186Wpx"}
const Additional_Search_Box = { display: "flex" }
const Additional_Search = { marginLeft: "27px", width: "645px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", 
                                  lineHeight: "29px", fontWeight: "500", color: "#707070" }
const Additional_SearchText ={ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", 
                                      border: "none", color: "#707070", backgroundColor: "#EFEFEF" }
const Additional_Tip={ marginLeft: "20px", width: "27px", height: "25px", fontSize: "17px", lineHeight: "25px", fontWeight: "500", color: "#FF0000", textAlign: "left" }
const Additional_Tip_explain={ marginLeft: "17px", width: "457px", height: "75px", fontSize: "17px", lineHeight: "25px", fontWeight: "100", color: "#707070", textAlign: "left" }

const Additional_AddContents_Box = {width:"100%",height:"288px",marginTop:"95px"}

const Additional_AddContents_list_Box = { width:"100%",height:"74px",marginTop: "24px",marginBottom:"36px", marginLeft: "167px" }
const Additional_AddContents_list_Title = {width:"160px",height:"29px",marginBottom:"15px",lineHeight:"29px",fontFamily:"Noto Sans KR",fontSize:"20px",color:"#707070"}
const Additional_AddContents_list_itemBox = { display: "flex", marginBottom: "34px" }

class ModifyDesignSection02 extends Component
{
    constructor(props)
    {
        super(props);
    }    

    selectedCate1 = (cate1) => {

        const cate2 = this.props.cate2[cate1.value]
        this.setState({ cate2: cate2, selectedCate2: cate2[0], selectedCate1: this.props.cate1[cate1.value] })
        console.log(cate1);
      }
      selectedCate2 = (cate2) => {
        if (cate2 === 0) {
          this.setState({ selectedCate2: null })
        }
        else {
          this.setState({ selectedCate2: cate2 })
        }
    }

    
    render()
    {

        
        const Peer = () => {
            return (<div style={PeerBox}>
              <div style={{ backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
              <div style={Peer_Name}>진아진아진아</div>
              <img alt={"delete"} src={deleteItem} style={Peer_DeleteBtn} />
            </div>)
          }
        const ContentsMem = ()=>{
          return(
            <div style={PeerBox}>
              <div style = {{width:"30px",height:"30px",backgroundColor:"#D6D6D6"}}></div>
              <div style={Contents_Name}>캡스톤 디자인</div>
              <img alt={"delete"} src={deleteItem} style={Contents_DeleteBtn} />
            </div>
          );
        }

           
          return(
        
            <section style={AdditionalBox} >
            {/* category */}
            <div style={Additional_category_Box}>
                  <div style={AdditionalTitle}>카테고리</div>    
                  <div style={Additional_category_one}><SelectBox onSelectedItem={this.selectedCate1}  items={emptyCategory} width="410" /></div>
                  <div style={Additional_category_two}><SelectBox onSelectedItem={this.selectedCate2}  items={emptyCategory} width="410" /></div>
            </div>
            {/* invite member*/}
            <div style={Additional_invite_Box}>
              <div style={Additional_Search_Box}>
                  <div style={AdditionalTitle}>맴버 초대하기</div>
                  <div style={Additional_Search} ><input type="text" style={Additional_SearchText} placeholder="닉네임을 검색해 주세요" /></div>
                  <div style={Additional_Tip}>TIP</div>
                  <div style={Additional_Tip_explain}>
                      함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                      초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                      디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
              </div>
              {/* invited member*/}
              <div style={{ marginTop: "20px", marginLeft: "167px" }}>
                  <div style={{ display: "flex", marginBottom: "34px" }}><Peer /><Peer /><Peer /></div>
                  <div style={{ display: "flex" }}><Peer /><Peer /><Peer /></div>
              </div>
            </div>
            {/* add contents */}
            <div style={Additional_AddContents_Box}>
              <div style={Additional_Search_Box}>
                  <div style={AdditionalTitle}>컨텐츠 추가하기</div>
                  <div style={Additional_Search} ><input type="text" style={Additional_SearchText} placeholder="디자인/그룹을 검색해주세요" /></div>
                  <div style={Additional_Tip}>TIP</div>
                  <div style={Additional_Tip_explain}>
                  현재 만들고 있는 그룹에 추가할 디자인과 그룹을 검색해 주세요.<br/>
                   그룹을 만들고 나서 추후에 추가할 수도 있습니다.</div>
              </div>
              {/* add contents list*/}
              <div style={Additional_AddContents_list_Box}>
                  <div style={Additional_AddContents_list_Title}>현재 추가된 디자인</div>
                  <div style={Additional_AddContents_list_itemBox}><ContentsMem /><ContentsMem /><ContentsMem /><ContentsMem /><ContentsMem /></div>
              </div>
              <div style={Additional_AddContents_list_Box}>
                  <div style={Additional_AddContents_list_Title}>현재 추가된 디자인</div>
                  <div style={Additional_AddContents_list_itemBox}><ContentsMem /><ContentsMem /><ContentsMem /><ContentsMem /><ContentsMem /></div>
              </div>
            </div>
           
      </section>
          );
    }
}
export default ModifyDesignSection02;