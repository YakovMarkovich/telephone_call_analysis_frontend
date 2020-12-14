import React, {useState} from 'react';
import {getAllCallersPageable, getCallerContacts} from "../actions/CallerActions";
import {connect} from "react-redux";
import style from "../css_modules/caller.css";
import {logger} from "redux-logger/src";


const CallerListItem = (props) => {

    function getCallers() {
        if(props.currentPage==0 && props.itemsOnPage==0){
            props.getAllCallersPageable(props.currentPage, 6, true);
            return;
        }
        if(props.currentPage==0 && props.itemsOnPage==6){
            props.getAllCallersPageable(props.currentPage, 6, true);
            return;
        }
        props.getAllCallersPageable(props.currentPage, props.itemsOnPage, props.moreItems);
    }

    function getCallersForth() {
        if(props.currentPage==0 && props.itemsOnPage==0){
            props.getAllCallersPageable(props.currentPage, 6, true);
            return;
        }
        if(props.currentPage==0 && props.itemsOnPage==6 && !props.moreItems){
            props.getAllCallersPageable(0, 6, true);
            return;
        }
        props.getAllCallersPageable(props.currentPage + 1, props.itemsOnPage, props.moreItems);
    }

    function getCallersBack(event) {
        if(props.currentPage==1){
            props.getAllCallersPageable(0, 6, true);
            return;
        }
        props.getAllCallersPageable(props.currentPage - 1, props.itemsOnPage, props.moreItems);
    }

    function handleError() {
        if(props.error){
            props.getAllCallersPageable(0, 6, true);
            return;
        }
    }

    function getContacts(e) {
        let target = e.target;
        while (target && target.nodeName != 'TR') {
            target = target.parentElement;
        }
        props.getCallerContacts(target.childNodes[0].innerText);
    }

    return (
        <div>
            {(props.currentPage == 0 && !props.moreItems) ?  <button className='col-12 justify-content-center mb-1' style={{backgroundColor: "yellow", color: "blue", width:200, height:50, marginLeft:1}}onClick={getCallers}>Choose a caller</button> : null}
            <table className={'col-2'} >
                {props.callers.map(caller=>
                    <tr onClick={getContacts}   className={'col-2'}><td>{caller.id}</td>
                        <td className="col-1">{caller.first_name}</td>
                        <td>{caller.last_name}</td>
                        <td>{caller.email}</td>
                        <td>{caller.gender}</td>
                        <td><img src={caller.image} width="50" height="50"/></td></tr>)
                }
            </table>

            <div className='d-flex justify-content-between'>
                {props.currentPage > 0 ? <button style={{backgroundColor: "red", color: "white", width:100, marginLeft:10, marginRight:100}} onClick={getCallersBack}>BACK</button> : null }
                {props.moreItems ? <button className='ml-auto' style={{backgroundColor: "green", color: "white", width:100, marginLeft:50}} onClick={getCallersForth}>NEXT</button> : null }
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        callers: state.callers,
        contacts: state.contacts,
        itemsOnPage: state.itemsOnPage,
        currentPage: state.currentPage,
        itemsTotal: state.itemsTotal,
        moreItems: state.moreItems,
        error: state.error.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCallersPageable: (cur, items, moreItems) => dispatch(getAllCallersPageable(cur, items, moreItems)),
        getCallerContacts: (id)=>dispatch(getCallerContacts(id))

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CallerListItem);
