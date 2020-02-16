import React, { Component } from "react";
import { AddController, Controller } from "components/Commons/InputItem/AddController";

export class InputContent extends Component {
    render() {
        return (<React.Fragment>
            {content.length > 0 && content.map((item, index) =>
                <Controller 
                    maxOrder={content.length - 1} 
                    key={index} 
                    type={item.type} 
                    item={item} 
                    order={index} 
                    deleteItem={this.deleteItem} 
                    name={`content${index}`} 
                    getValue={this.onChangValue} />)}

            <AddController 
                type="INIT" 
                order={content.length > 0 ? content.length : 0} 
                name="addBasic" 
                getValue={this.onAddValue} />
        </React.Fragment>)
    }
}