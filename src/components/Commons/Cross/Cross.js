import styled from 'styled-components'

const Cross = styled.div`
    z-index:20;
    opacity: ${props => props.disabled ? "0.5" : "1.0"};
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    cursor:pointer;
    :hover {
       opacity: 0.75; 
    }
    :before, :after {
        position: absolute;
        margin-left: ${props => props.height / 2}px;
        content: '';
        height: ${props => props.height}px;
        width: ${props => props.weight || 3}px;
        background-color: ${props => props.color || "#707070"};
    }
    :before {
        transform: rotate(${props => props.angle}deg);
    }
    :after {
        transform: rotate(${props => props.angle - 90}deg);
    }
`

export default Cross;