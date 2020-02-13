import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import { Icon } from "semantic-ui-react";

const ThumbnailListContainer = styled.div`
  width: ${props => props.width + "px" || "100%"};
  height: 100px;
  display: flex;
  overflow: hidden;
  &:hover { 
    overflow-x: auto;
  }
`;
const Button = styled.div`
  min-width: ${props => props.width == null ? 100 : props.width}px;
  min-height: ${props => props.height == null ? 100 : props.height}px;
  margin-right: ${props => props.marginRight == null ? 0 : props.marginRight}px;
  margin-bottom: ${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  border: 1px solid #E9E9E9;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #EFEFEF;
    opacity: .75;
    border: 1px solid #707070;
  }
`;
const Thumbnail = styled.div`
    min-width:${props => props.width == null ? 100 : props.width}px;
    min-height:${props => props.height == null ? 100 : props.height}px;
    margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
    margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
    background-image:url(${props => props.URL});
    background-size:contain;
    background-position:center center;
    background-repeat:no-repeat;
    border:1px solid #EFEFEF;
`;

export class ThumbnailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: [],
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.returnState = this.returnState.bind(this);
        this.readFile = this.readFile.bind(this);
    }
    async returnState() {
        this.props.return && this.props.return(this.state);
    };
    readFile(inputFile) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(inputFile);
        });
    };
    async handleImageChange(event) {
        if (event.target.files.length <= 0)
            return;
        let imgs = this.state.imageList;
        const file = event.target.files[0];
        const filename = file.name.replace(/\s/g, '');
        await imgs.push({
            src: URL.createObjectURL(file), value: await this.readFile(file),
            name: filename, key: "thumbnail[]"
        });
        await this.setState({ imageList: imgs });
        this.returnState();
    };

    render() {
        const ImageListSet = () =>
            this.state.imageList.length > 0 ?
                this.state.imageList.map((item, index) =>
                    <Thumbnail width={100} height={100} marginRight={10} URL={item.src} key={index} />)
                : <Thumbnail width={100} height={100} marginRight={10} URL={noimg} />

        return (
            <ThumbnailListContainer width={this.props.width}>
                <ImageListSet />
                {this.state.imageList.length < 10 ?
                    <label htmlFor="files">
                        <Button width={100} height={100} marginRight={10}>
                            <Icon name="plus" />
                            <input hidden onChange={this.handleImageChange} id="files" type="file" />
                        </Button>
                    </label>
                    : null}
            </ThumbnailListContainer>
        );
    }
};