import React, { Component } from "react"

class TextFormat extends Component {
    render() {
        const txt = this.props.txt;
        const lines = undefined || this.props.lines;
        const chars = undefined || this.props.chars;
        return (
            <div title={txt} style={lines ?
                /* multi-lines*/{ cursor: this.props.cursor?"defailt":"pointer", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", wordWrap: "break-word" }
                /* single-line*/ : { cursor: this.props.cursor?"defailt":"pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {chars ? (txt && txt.length <= chars ? txt : txt && txt.slice(0, chars) + "...") : txt}
            </div>
        )
    }
}

export default TextFormat