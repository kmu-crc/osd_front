import React, { Component } from "react"

class TextFormat extends Component {
    render() {
        const { width, txt, id, lines, chars } = this.props

        return (
            <div title={txt}
                id={id}
                style=
                {lines ?
                    // multi-lines
                    { padding: "0 0 0 0", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", wordWrap: "break-word", width: width || "max-content", backgroundColor: this.props.backgroundColor || "transparent" }
                    // single-line
                    : { padding: "0 0 0 0", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: width || "max-content", backgroundColor: this.props.backgroundColor || "transparent" }
                }>
                {chars ? (txt.length < chars ? txt : txt.slice(0, chars - 3) + "...") : txt}
            </div>
        )
    }
}

export default TextFormat