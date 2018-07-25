import React, { Component } from "react";
import { Controller } from "./Controller";

class CardSourceDetail extends Component {
  state = {
    edit: false,
    content: [],
    newContent: [],
    deleteContent: [],
    editContent: [],
  };
  render() {
    const { edit, content } = this.state;
    return (
      <div>
        {edit ? (
          <form>
            {content.length > 0 ? (
              content.map((item, index) => {
                return (
                  <div>
                    <Controller type="INIT" />
                    <Controller type={item.type} content={item.content} />
                  </div>
                );
              })
            ) : (
              <Controller type="INIT" />
            )}
          </form>
        ) : content.length > 0 ? (
          content.map(item => {
            return <div>{item.uid}</div>;
          })
        ) : (
          <div>없음</div>
        )}
      </div>
    );
  }
}

export default CardSourceDetail;
