import React from 'react';
import Search from "./Search";
import CallerListItem from "./CallerListItem";

class CallersList extends React.Component {

    render() {
        return (
            <div>
             <Search/>
             <CallerListItem/>
            </div>
        )
    }
}

export default CallersList;