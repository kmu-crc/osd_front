import React,{Component} from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import { Icon } from "semantic-ui-react";

const FormStyle = styled.div`
    width:100%;
    height:100px;
    display:flex;
    overflow:hidden;
    &:hover { 
        overflow-x:auto;
    }
` 
const Button= styled.div`
    min-width:${props=>props.width==null?100:props.width}px;
    min-height:${props=>props.height==null?100:props.height}px;
    margin-right:${props=>props.marginRight==null?0:props.marginRight}px;
    margin-bottom:${props=>props.marginBottom==null?0:props.marginBottom}px;
    border:1px solid #E9E9E9;
    display:flex;
    justify-content:center;
    align-items:center;

`
const Thumbnail = styled.div`
    min-width:${props=>props.width==null?100:props.width}px;
    min-height:${props=>props.height==null?100:props.height}px;
    margin-right:${props=>props.marginRight==null?0:props.marginRight}px;
    margin-bottom:${props=>props.marginBottom==null?0:props.marginBottom}px;
    background-image:url(${props=>props.URL});
    background-size:contain;
    background-position:center center;
    background-repeat:no-repeat;
    border:1px solid #EFEFEF;

    
`
export class ThumbnailList extends Component {
    constructor(props){
        super(props);
        this.state={
            imageList:[noimg,noimg],
        }
    }
    
    render(){
    const ImageListSet = ()=>{
        return(
            this.state.imageList.map((item,index)=>{
                return(<Thumbnail width={100} height={100} marginRight={10} URL={item} key={index}/>);
            })
        );
    }
        return(
            <React.Fragment>
                <FormStyle>  
                    <ImageListSet/>
                    {this.state.imageList.length<10?
                    <Button width={100} height={100} marginRight={10}>
                        <Icon name="plus"/>
                    </Button>
                    :null}
                </FormStyle>
            </React.Fragment>
        );
    }
}