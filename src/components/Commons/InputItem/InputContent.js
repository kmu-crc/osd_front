import React, { Component } from "react";
import { AddController, Controller } from "components/Commons/InputItem";

export class InputContent extends Component {
    constructor(props) {
        super(props);
        this.state = { content: [] };
        this.onAddValue = this.onAddValue.bind(this);
        this.onChangValue = this.onChangValue.bind(this);
        this.returnState = this.returnState.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };
    async onAddValue(data) {
        let copyContent = [...this.state.content];
        let copyData = { ...data };
        copyData.initClick = true;
        for (let item of copyContent) {
            if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
                await copyContent.splice(item.order, 1, null);
            }
        }
        await copyContent.splice(copyData.order, 0, copyData);
        let newContent = copyContent.filter((item) => item !== null);
        newContent = await Promise.all(
            newContent.map(async (item, index) => {
                item.order = await index;
                delete item.target;
                if (item.type === "FILE" || item.order !== copyData.order) delete item.initClick;
                return item;
            })
        );
        await this.setState({ content: newContent });
        this.returnState();
    };
    async onChangValue(data) {
        let copyContent = [...this.props.content];
        const copyData = { ...data };
        for (let item of copyContent) {
            if (item.order === copyData.order) {
                item.content = data.data.content
            }
        }
        await this.setState({ content: copyContent });
        this.returnState();
    };
    async deleteItem(data) {
        alert("not implemented yet");
    };
    returnState() {
        this.props.returnState && this.props.returnState(this.state);
    };

    render() {
        const { content } = this.props;
        return (<React.Fragment>
            {content.length > 0 && content.map((item, index) =>
                <Controller
                    name={`content${index}`} type={item.type}
                    order={index} maxOrder={content.length - 1}
                    key={index} item={item}
                    deleteItem={this.deleteItem} getValue={this.onChangValue} />)}

            <AddController
                name="addBasic" type="INIT"
                order={content.length > 0 ? content.length : 0}
                getValue={this.onAddValue} />

        </React.Fragment>);
    }
}