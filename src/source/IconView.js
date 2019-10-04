import React from 'react';

const IconView = (props) => {
    const opacity = props.opacity || "1.0"
    const fill = props.fill || "#FFFFFF"
    const width = props.width || "14px"
    const height = props.height || "9px"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13.829 9.156">
            <g id="outer_eye" data-name="그룹 161" transform="matrix(1, 0.017, -0.017, 1, 46.798, -781.305)">
                <g id="타원_4" data-name="타원 4" transform="translate(-30.027 782.595)" opacity={opacity} fill={fill} stroke={fill} strokeWidth="1">
                    <circle cx="3.865" cy="3.865" r="3.865" stroke="none" /><circle cx="3.865" cy="3.865" r="3.365" fill="none" />
                </g>
                <g id="inner_eye" data-name="타원 5" transform="translate(-33 782)" fill="none" opacity={opacity} stroke={fill} strokeWidth="1">
                    <ellipse cx="6.838" cy="4.459" rx="6.838" ry="4.459" stroke="none" /><ellipse cx="6.838" cy="4.459" rx="6.338" ry="3.959" fill="none" />
                </g>
            </g>
        </svg>
    )
}

export default IconView;
