import React from 'react';
import { ListManager } from "react-beautiful-dnd-grid";

function sortList(list) {
    return list.slice().sort((first, second) => first.order - second.order);
}
function ListElement({ item: { userName, title, thumbnailUrl, uid }, handle }) {
    return <div style={{
        position: "relative",
        backgroundSize: "cover",
        backgroundImage: `url(${thumbnailUrl.m_img})`,
        width: "150px",
        height: "150px",
        borderRadius: "5px",
        marginRight: "5px",
        marginBottom: "5px",
    }}>
        <div
            onClick={() => handle(uid)}
            style={{
                cursor: "pointer",
                padding: "5px 10px",
                marginLeft: "auto",
                width: "max-content",
                color: "white",
                backgroundColor: "red",
                borderRadius: "15px",
            }}>삭제</div>
        <div style={{
            bottom: "0px",
            width: "100%",
            position: "absolute",
            backgroundColor: "#707070",
        }}>
            <div style={{
                padding: "1px 2px",
                fontSize: "16px",
                height: "20px",
                width: "125px",
                color: "white",
                wordWrap: "break-word",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textOverflow: "ellipsis"
            }}>
                {title}({uid})</div>
            <div style={{
                padding: "1px 2px",
                fontSize: "12px",
                height: "16px",
                width: "125px",
                color: "white",
                wordWrap: "break-word",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textOverflow: "ellipsis",
                textAlign: "right"
            }}>
                {userName}</div>
        </div>
    </div>
}

class DesignReorderGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedList: []//sortList(props.list)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list) {
            this.setState({ sortedList: sortList(this.props.list) })
        }
    }
    sortList = () => {
        this.setState({
            ...this.state,
            sortedList: sortList(this.state.sortedList)
        })
    }
    reorderList = (sourceIndex, destinationIndex) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const list = this.state.sortedList;
        if (destinationIndex === 0) {
            list[sourceIndex].order = list[0].order - 1;
            this.sortList();
            return;
        }
        if (destinationIndex === list.length - 1) {
            list[sourceIndex].order = list[list.length - 1].order + 1;
            this.sortList();
            return;
        }
        if (destinationIndex < sourceIndex) {
            list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
            this.sortList();
            return;
        }
        list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
        this.sortList();
    }
    onApply = () => {
        let job = [];
        let special = Array.from(this.state.sortedList);
        let origin = Array.from(this.props.list);

        //update
        special.forEach((item, i) => {
            if (item.order !== i && item.order !== null) {
                job.push({ uid: item.uid, data: { order: i, type: "update" } });
                item.order = i;
            }
        })

        // delete
        origin.forEach(item => {
            const found = special.find(specialItem => specialItem === item);
            console.log(found);
            if (found) {
                return;
            } else {
                job.push({ uid: item.uid, data: { type: "delete" } });
            }
        });

        // update
        if (job && job.length === 0) {
            alert("변경된 내용이 없습니다.");
        } else {
            if (!window.confirm("변경된 내용을 저장하시겠습니까?")) return;
            this.props.update(job);
        }
    }
    removeFromSortedList = (id) => {
        let copy = [...this.state.sortedList];
        copy.splice(this.state.sortedList.findIndex(item => item.uid === id), 1);
        this.setState({ sortedList: copy });
    }
    render() {
        const { sortedList } = this.state;

        return (<React.Fragment>
            {sortedList && sortedList.length > 0 ?
                <React.Fragment>
                    <button onClick={this.onApply}>변경내용저장</button>
                    <ListManager
                        items={sortedList}
                        direction="horizontal"
                        maxItems={5}
                        render={item =>
                            <ListElement
                                item={item}
                                handle={
                                    (id) => this.removeFromSortedList(id)
                                    // alert(id)
                                    // sortedList.splice(sortedList.findIndex(item => item.uid === id), 1)
                                }
                            />}
                        onDragEnd={this.reorderList}
                    />
                </React.Fragment>
                :
                <React.Fragment>
                    {/*  */}
                </React.Fragment>}
        </React.Fragment >);
    }
}
export default DesignReorderGrid;