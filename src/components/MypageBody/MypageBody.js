import React, {Component} from 'react';
import styled from 'styled-components'

import ScrollList from "components/Commons/ScrollList"

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
        opacity:0.5;
        
    }
    .selectedCate{
        opacity:1.0;
        
    }

`;

class MypageBody extends Component{
    state = {
        categorys:['디자인', '그룹', '좋아요'],
        selectCate:"unSelectedCate",
        cateIndex:0,

    }

    changeCategory = (index)=>{
        this.setState({selectCate:"selectedCate", cateIndex:index});

    }
    render(){
        const catePadding = ['70px', '55px', '60px'];
        return(
            <MypageBodyComp>
                <div className="MypageCategory">
                    {this.state.categorys.map((category, index) => {
                        return(
                            <div className={this.state.selectCate} style={{paddingLeft:catePadding[index],cursor: 'pointer'}} key={index} onClick={this.changeCategory.bind(this, index)} >{category}</div>
                        )
                    })}
                </div>
                {this.state.cateIndex === 0 &&
                <div className="compWrapper" style={{top:"30px"}}>
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
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
                        <div style={{paddingLeft:"10px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                        <div style={{paddingLeft:"60px"}}><Design /></div>
                    </div>

                </div>}

                {this.state.cateIndex === 1 &&
                <div className="compWrapper" style={{top:"30px"}}>
                    <div style={{display:"flex", justifyContent: "space-start", paddingTop:'80px'}}>
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
                <div className="compWrapper" style={{top:"30px"}}>

                </div>

                }

            </MypageBodyComp>
        )
    }

}

export default MypageBody;