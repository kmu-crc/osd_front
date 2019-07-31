import React, { Component } from 'react'
import SearchForm from "components/Header/SearchForm"

class SearchResult extends Component {
    render() {
        return (<></>)
    }
}
class SearchPage extends Component {
    render() {
        return (<>
            <div style={{ width: "100%", backgroundColor: "", left: "50%" }}>
                <input type="text" style={{ fontSize: "72px", width: "750px", height: "125px", border: "1px solid #707070", backgroundColor: "#FAFAFA", borderRadius: "45px" }} />
            </div>
            <SearchResult />
        </>)
    }
}

export default SearchPage