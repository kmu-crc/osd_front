import React, {Component} from 'react';
import styled from 'styled-components'

// import ScrollList from "components/Commons/ScrollList"

//component
import Design from "components/Designs/Design"
import Group from "components/Groups/Group";
import Designer from "components/Designers/Designer"

//css
const MypageBodyComp = styled.div`
    font-family: Noto Sans KR;
    .MypageCategory{
        display:flex;
        justifyContent: space-start;
        padding-top:60px;
        
        font-size:20px;
        color:#707070;
        
    }
    .selectedCate{
        opacity:1.0;
    }
    .unSelectedCate{
        opacity:0.5;
    }
    .interested{
        position:relative;
        font-size:20px;
        color:#707070;
        padding-top:56px;

    }

`;

var pastCate = 0;//for change category
class MypageBody extends Component{
    state = {
        categorys:['디자인', '그룹', '좋아요'],
        selectCate:"unSelectedCate",
        cateIndex:0,

    }
    componentDidMount() {
        var selectedCate = document.getElementById(0);
        selectedCate.className = selectedCate.className.replace("unSelectedCate", "selectedCate");
    }

    changeCategory = (index)=>{
        //unselected to selected
        var selectedCate = document.getElementById(index);
        if(selectedCate.className === "selectedCate"){
            return;
        }
        selectedCate.className = selectedCate.className.replace("unSelectedCate", "selectedCate");

        //selected to unselected
        var unSelectedCate = document.getElementById(pastCate);
        unSelectedCate.className = unSelectedCate.className.replace("selectedCate", "unSelectedCate");


        pastCate = index;
        this.setState({cateIndex:index});
    }
    render(){
        const catePadding = ['70px', '55px', '60px'];
        return(
            <MypageBodyComp>
                <div className="MypageCategory">
                    {this.state.categorys.map((category, index) => {
                        return(
                            <div id={index} className="unSelectedCate" style={{paddingLeft:catePadding[index],cursor: 'pointer'}} key={index} onClick={this.changeCategory.bind(this, index)} >{category}</div>
                        )
                    })}
                </div>
                {this.state.cateIndex === 0 &&
                <div className="compWrapper" style={{paddingTop:"35px"}}>
                    <div style={{display:"flex", justifyContent: "space-start"}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                    </div>

                </div>}

                {this.state.cateIndex === 1 &&
                <div className="compWrapper" style={{paddingTop:"35px"}}>
                    <div style={{display:"flex", justifyContent: "space-start"}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>

                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>

                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:"https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1534833139525-x200.png"}, title:"", child_update_time:""}}/></div>

                    </div>

                </div>
                }
                {this.state.cateIndex === 2 &&
                <div className="compWrapper">
                    <div className="interested" style={{display:"flex", justifyContent: "space-start"}}>
                        <div style={{paddingLeft:"67px", fontWeight:"Medium"}}>관심있는 디자인</div>
                        <div style={{paddingLeft:"1600px", fontWeight:"300"}}>모두 보기</div>
                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:"45px"}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                        <div style={{paddingLeft:"63px"}}><Design /></div>
                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                    </div>
                    <div className="interested" style={{paddingTop:"75px"}}>관심있는 그룹</div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'25px'}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>

                    </div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'60px'}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>

                    </div>

                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'67px'}}>
                        <div style={{paddingLeft:"10px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>
                        <div style={{paddingLeft:"95px"}}><Group data={{children:{m_img:null}, title:"", child_update_time:""}}/></div>

                    </div>
                    <div className="interested" style={{paddingTop:"67px"}}>관심있는 디자이너</div>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'25px'}}>
                        <div style={{paddingLeft:"10px"}}><Designer data={{imgURL:null}}/></div>
                        <div style={{paddingLeft:"70px"}}><Designer data={{imgURL:null}}/></div>
                        <div style={{paddingLeft:"70px"}}><Designer data={{imgURL:null}}/></div>


                    </div>


                </div>


                }

            </MypageBodyComp>
        )
    }

}

export default MypageBody;