import React,{ Component } from "react";
import { CreateStep, CreateCard, TipDiv } from "components/Designs/GridEditor"

const DesignEditorBox ={ paddingLeft: "51px", marginBottom: "204px" }
const DesignEditor_content_Box ={ display: "flex",width:"100%" }
const DesignEditor_Step_Box = { width: "200px", marginRight: "75px" }
const DesignEditor_Step_ArrowBox = { marginTop: "25px", marginBottom: "69.5px" }
const DesignEditor_Step_ArrowBoxDash ={ marginLeft: "358px", width: "31px", height: "27px", border: "1px dashed purple" }


class ModifyDesignSection03 extends Component{
    render()
    {
        return (
            <section style={DesignEditorBox} >
              <div style={DesignEditor_content_Box}>
                <div style={DesignEditor_Step_Box}></div>
                <div style={{ display: "flex" }}>
                  <CreateStep marginRight={73} /*onClick={() => { alert("??") }}*/ step={"단계"} />
                  <CreateStep marginRight={48} disabled /*onClick={() => { alert("??") }}*/ step={"단계"} />
                  <TipDiv txt="디자인을 등록 후에도 단계 / 컨텐츠를 수정할 수 있습니다." />
                </div>
              </div>
              <div style={DesignEditor_Step_ArrowBox}>
                <div style={DesignEditor_Step_ArrowBoxDash}>
                  <i style={{ color: "#707070", fontSize: "25px" }} className="material-icons">arrow_drop_down</i>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div><CreateStep marginRight={73} /*onClick={() => { alert("??") }}*/ step={"단계"} /></div>
                <div><CreateCard marginRight={321} onClick={this.completed} step={"카드"} /></div>
                <TipDiv txt="단계 없이 카드 하나만으로도 등록이 가능합니다." />
              </div>
              <div style={{ display: "flex" }}>
                <div><CreateStep marginRight={73} disabled /*onClick={() => { alert("??") }}*/ step={"단계"} /></div>
                <div></div>
                <div></div>
              </div>
            </section>
          )
    }
}

export default ModifyDesignSection03;