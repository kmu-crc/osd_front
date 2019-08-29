import React from 'react'

const Triangle = (props) => {
    const opacity = props.opacity || "1.0"
    const fill = props.fill || "#707070"
    const width = props.width || "12px"
    const height = props.height || "14px"

    return(
        <svg width="12px" height="14px" viewBox="0 0 20 10">
            <g transform="rotate(90)">
                <polygon points="0,10 20,10 10,0" />
            </g>

        </svg>

    )

}
export default Triangle
