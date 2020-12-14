import React, {useState} from 'react';
import {addEditCall, getCallContactStatistics, removeCall} from "../actions/ContactsActions";
import {connect} from "react-redux";
import style from "../css_modules/calls.css";
import {logger} from "redux-logger/src";


const Calls = (props) => {
    const [currentCaller, setCurrentCaller] = useState('');

    function getStatistics(e) {
        let target = e.target;
        while (target && target.nodeName != 'TR') {
            target = target.parentElement;
        }
        let value = localStorage.getItem('currentCallerId')
        setCurrentCaller(value);
        props.getCallContactStatistics(value, target.childNodes[0].innerText);
    }

    function handleChanges(event) {
        let actionType =  event.target.innerText;
        let target = event.target;
        while (target && target.nodeName != 'TR') {
            target = target.parentElement;
        }
        let callerId = prompt("Enter new callerId", target.childNodes[1].innerText);
        let contactedId = prompt("Enter new contactedId", target.childNodes[2].innerText);
        let newDate = prompt("Enter new dateTime Call", "yyyy-MM-dd HH:mm:ss");
        let newDuration = prompt("Enter new duration", target.childNodes[4].innerText);
        let id = target.childNodes[0].innerText;
        props.addEditCall(id, callerId, contactedId,
            newDate, newDuration, actionType);
    }

    function handleRemove(event) {
        let actionType =  event.target.innerText;
        let target = event.target;
        while (target && target.nodeName != 'TR') {
            target = target.parentElement;
        }
        let id = target.childNodes[0].innerText;
        props.removeCall(id, actionType);
    }

        return (
            <div>
                {( props.contacts.length!=0) ?<h3 className='text-center' style={{color: "blue"}}>Contacted Users</h3>: null}
                <table className={'col-2'} >
                    {props.contacts.map(contact=>
                        <tr onClick={getStatistics} className={'col-2'}><td>{contact.id}</td>
                            <td className="col-1">{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.gender}</td>
                            <td><img src={contact.image} width="50" height="50"/></td></tr>)
                    }
                </table>

                {props.error != "Nothing was found"  ? <h3 className='text-center'  style={{color:'green'}}>{props.error}</h3>: null}

                {( props.contactedCalls!=0 && props.contacts.length!=0 && props.currentCaller==localStorage.getItem('currentCallerId')&&props.contactedCalls!='') ?
                    <table>
                        <h3 className='justify-content-center' style={{color:'blue'}}>Calls</h3>
                    <tr>
                        <th>id</th>
                        <th>CallerId</th>
                        <th>ContactedId</th>
                        <th>Date</th>
                        <th>Duration in seconds </th>
                    </tr>
                    {props.contactedCalls.map(call=>
                        <tr>
                            <td>{call.id}</td>
                            <td>{call.caller_id}</td>
                            <td>{call.called_party_id}</td>
                            <td>{call.timestamp.split('-')[0] + ' year '+
                                call.timestamp.split('-')[1] + ' month' }</td>
                            <td>{call.duration_in_seconds}</td>
                            <td style={{ color: "darkgoldenrod"}} onClick={props.changePage}>AddCall</td>
                            <td style={{ color: "darkgoldenrod"}} onClick={props.changePage}>EditCall</td>
                            <td  style={{ color: "darkgoldenrod"}} onClick={handleRemove}>RemoveCall</td>
                            </tr>)
                    }
                </table>:null}

                {(props.contactedCalls!=0 && props.contacts.length!=0 && props.currentCaller==localStorage.getItem('currentCallerId')) ? <h5
                 className='text-center'   style={{color: "red"}}>Total duration for all calls between caller
                    and contact person {props.duration}  ' sec'</h5> :null}

            </div>
        )
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts,
        currentPage: state.currentPage,
        moreItems: state.moreItems,
        contactedCalls: state.contactedCalls,
        changedCall: state.changedCall,
        duration: state.duration,
        error: state.error.message,
        currentCaller: state.currentCaller
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCallContactStatistics: (callerId, contactId) => dispatch(getCallContactStatistics(callerId, contactId)),
        addEditCall: (callId, callerId, contactedId, newDate, newDuration, actionType)=>
            dispatch(addEditCall(callId, callerId, contactedId, newDate, newDuration, actionType)),
        removeCall: (callId)=> dispatch(removeCall(callId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);