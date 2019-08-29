import React,{ Component } from "react";
import deleteItem from "source/deleteItem.png"
import SelectBox from "components/Commons/SelectBox"

const emptyCategory = [{ value: 0, text: "" }]

const PeerBox = { display: "flex", marginRight: "50px" }
const Peer_Name = { marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", 
                    color: "#707070", width: "112px", height: "29px" }
const Peer_DeleteBtn = { marginTop: "7.34px", marginLeft: "13.86px", width: "16px", height: "16px" }

const AdditionalBox = { marginBottom: "16px", paddingLeft: "52px" }
const AdditionalTitle={ width: "120px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
const Additional_category_Box ={ width:"100%",display: "flex" }
const Additional_category_one={ marginLeft: "47px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }
const Additional_category_two={ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }
const Additional_invite_Box = { marginTop: "107px", display: "flex" }
const Additional_invite_Search = { marginLeft: "52px", width: "645px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", 
                                  lineHeight: "29px", fontWeight: "500", color: "#707070" }
const Additional_invite_SearchText ={ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", 
                                      border: "none", color: "#707070", backgroundColor: "#EFEFEF" }
const Additional_invite_Tip={ marginLeft: "20px", width: "27px", height: "25px", fontSize: "17px", lineHeight: "25px", fontWeight: "500", color: "#FF0000", textAlign: "left" }
const Additional_invite_Tip_explain={ marginLeft: "17px", width: "457px", height: "75px", fontSize: "17px", lineHeight: "25px", fontWeight: "100", color: "#707070", textAlign: "left" }
const Additional_invite_Hrline = { width: "1318px", marginTop: "122.5px", border: "2.5px solid #EFEFEF" }
const Additional_ExplainBox = { marginTop: "150.5px", marginLeft: "auto", marginRight: "52px", width: "545px", height: "69px", textAlign: "right", fontWeight: "300", fontSize: "20px", 
                                lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1" }

class ModifyDesignSection02 extends Component
{
    constructor(props)
    {
        super(props);
    }    

    // shouldComponentUpdate(nextProps)
    // {
    //     if(this.props.DesignDetail!=nextProps.DesignDetail)
    //     {
    //         if(this.props.DesignDetail.category_level1!=nextProps.DesignDetail.category_level1)
    //         {
    //             this.setState({categoryLevel1:{text:this.props.DesignDetail.categoryName,value:this.props.DesignDetail.category_level1}})
    //         }
    //         else if(this.props.DesignDetail.category_level2!=nextProps.DesignDetail.category_level2)
    //         {

    //         }
    //     }
    //     return true;
    // }
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
              {/* <div style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} /> */}
              <div style={Peer_Name}>진아진아진아</div>
              <img alt={"delete"} src={deleteItem} style={Peer_DeleteBtn} />
            </div>)
          }
          
        
          const level01 = this.props.DesignDetail.category_level1;
          const level02 = this.props.DesignDetail.category_level2;
          const categoryValue01 = this.props.cate1[level01]
          const categoryValue02 = {text:level02!=null?this.props.DesignDetail.categoryName:"전체",value:level02}
          const Cate2List = this.props.cate2[this.props.DesignDetail&&this.props.DesignDetail.category_level1];
          
          console.log(categoryValue01,categoryValue02)
            
          return(
        
            this.props.cate1.length > 0 ?
            <section style={AdditionalBox} >
            {/* category */}
            <div style={Additional_category_Box}>
                  <div style={AdditionalTitle}>카테고리</div>    
                  <div style={Additional_category_one}><SelectBox onSelectedItem={this.selectedCate1} default={categoryValue01}  items={this.props.cate1} width="410" /></div>
                  <div style={Additional_category_two}><SelectBox onSelectedItem={this.selectedCate2} default={categoryValue02}  items={Cate2List || emptyCategory} width="410" /></div>
            </div>
            {/* invite member*/}
            <div style={Additional_invite_Box}>
                <div style={AdditionalTitle}>맴버 초대하기</div>
                <div style={Additional_invite_Search} ><input type="text" style={Additional_invite_SearchText} placeholder="닉네임을 검색해 주세요" /></div>
                <div style={Additional_invite_Tip}>TIP</div>
                <div style={Additional_invite_Tip_explain}>
                    함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                    초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                    디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
            </div>
            {/* invited member*/}
            <div style={{ marginTop: "20px", marginLeft: "167px" }}>
                <div style={{ display: "flex", marginBottom: "34px" }}><Peer /><Peer /><Peer /></div>
                <div style={{ display: "flex" }}><Peer /><Peer /><Peer /></div>
            </div>
            {/* hr line */}
            <div style={Additional_invite_Hrline} />
            <div style={Additional_ExplainBox} >마지막 단계만이 남아있습니다!<br />
                  단계 / 컨텐츠 정보 탭에서 기본적인 디자인의 뼈대를 구성해 주세요</div>
      </section>
            : <p>카테고리를 가져오고 있습니다.</p>
    );
    }
}
export default ModifyDesignSection02;