import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StyleGuide from "StyleGuide";
import noimg from "source/myPage.jpeg";
// dnd
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? StyleGuide.color.main.light : StyleGuide.color.main.brightness,

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? StyleGuide.color.geyScale.scale1 : StyleGuide.color.geyScale.scale2,
    padding: grid,
    width: "100%"
});
const Container = styled.div`
    display: flex;
`;
class GroupReorder extends Component {
    state = {
        job: false,
        normal: this.props.normal,
        special: this.props.special
    };

    columns = [{ id: 'droppable', list: 'special' }, { id: 'droppable2', list: 'normal' }];
    id2List = { droppable: 'special', droppable2: 'normal' };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) { return; }

        if (source.droppableId === destination.droppableId) {
            //console.log("같은목록에서 이동");
            if (source.index === destination.index) {/*console.log("same!");*/return; }
            const items = reorder(this.getList(source.droppableId), source.index, destination.index);
            let state = { items };
            if (source.droppableId === 'droppable2') {
                state = { normal: items };
                this.setState(state);
                return;
            }
            if (source.droppableId === 'droppable') {
                state = { special: items };
            }
            this.setState(state);
        } else {
            //console.log("다른 목록에서 이동");
            let result = move(this.getList(source.droppableId), this.getList(destination.droppableId), source, destination);
            this.setState({ special: result.droppable, normal: result.droppable2 });
        }
        this.setState({ job: true });
    };

    requestGroupUpdate = (jobs) => {
        this.props.updateGroup(jobs);
    }

    onApply = () => {
        if (!window.confirm("ary you keep going?")) return;

        let job = [];
        let special = Array.from(this.state.special);
        let normal = Array.from(this.state.normal);
        special.forEach((group, i) => {
            //insert
            if (group.order === null) {
                job.push({ uid: group.uid, data: { order: i, type: "insert" } })
                group.order = i;
            }
            //update
            if (group.order !== i && group.order !== null) {
                job.push({ uid: group.uid, data: { order: i, type: "update" } });
                group.order = i;
            }
        })
        normal.forEach((group, i) => {
            //delete
            if (group.order !== null) {
                job.push({ uid: group.uid, data: { type: "delete" } });
                group.order = null;
            }
        });
        this.setState({ special: special, normal: normal, job: false });
        this.requestGroupUpdate(job);
    }

    render() {
        return (
            <div>
                <div style={{}} hidden > 처리중입니다. </div>
                <div style={{ textAlign: "center", fontSize: "20px", width: "100%" }}><br />
                    {this.state.job
                        ? <button style={{ width: "25%" }} onClick={this.onApply} enable="enable">변경내용적용</button>
                        : <button style={{ width: "25%" }} onClick={this.onApply} disabled="disabled">변경내용적용</button>}
                    <hr style={{ width: "100%" }} /></div>
                <Container>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.columns.map(col => (
                            <Droppable draggable="false" key={col.id} droppableId={col.id}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state[col.list].map((item, index) => (
                                            <Draggable key={item.uid} draggableId={item.uid} index={index}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                        {<img alt="" style={{
                                                            width: "45px", height: "45px", borderRadius: "19%", backgroundSize: "cover", background: "cover",
                                                            backgroundImage: `url(${item.thumbnailUrl == null ? noimg : item.thumbnailUrl.s_img})`
                                                        }} />
                                                        }{/*order:{item.order},*/}
                                                        {item.title}{item.nick_name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </Container>

            </div>
        );
    }
}
export default GroupReorder;