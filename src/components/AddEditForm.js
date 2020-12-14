import React, {useState} from 'react';
import {addEditCall, getCallContactStatistics, removeCall} from "../actions/ContactsActions";
import {connect} from "react-redux";

const AddEditForm = (props) => {
    const [id, setId] = useState('');
    const [callerId, setCallerId] = useState('');
    const [newDate, setNewDate] = useState('');
    const [contactedId, setContactedId] = useState('');
    const [newDuration, setNewDuration] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.addEditCall(id ? id : props.dataForm.id, callerId ? callerId : props.dataForm.callerId,
            contactedId ? contactedId : props.dataForm.contactedId,
            newDate, newDuration, props.dataForm.actionType);
        props.changePage();
    }

    function handleCancel(e) {
        e.preventDefault();
        props.changePage();
    }

    return (
        <form style={{backgroundColor: "whitesmoke"}} className="mt-2 ml-auto mr-auto" action="*" method="post">
            <div className="form-group row col-md-8">
                <label style={{color: "blue"}} htmlFor="id" className="col-2 col-form-label">Id: &nbsp; </label>
                <div className="col-9 ml-auto">
                    <input onChange={(e) => setId(e.target.value)} value={id} className="form-control" id="id"
                           style={{textDecoration: "underline"}} placeholder={props.dataForm.id}/>
                </div>
                <label style={{color: "blue"}} htmlFor="callerId"
                       className="col-2 col-form-label">callerId: &nbsp; </label>
                <div className="col-9 ml-auto">
                    <input onChange={(e) => setCallerId(e.target.value)} value={callerId} className="form-control"
                           id="callerId"
                           style={{textDecoration: "underline"}} placeholder={props.dataForm.callerId}/>
                </div>
                <label style={{color: "blue"}} htmlFor="contactedId"
                       className="col-2 col-form-label">contactedId: &nbsp; </label>
                <div className="col-9 ml-auto">
                    <input onChange={(e) => setContactedId(e.target.value)} value={contactedId} className="form-control"
                           id="contactedId"
                           style={{textDecoration: "underline"}} placeholder={props.dataForm.contactedId}/>
                </div>
                <label style={{color: "blue"}} htmlFor="newDate"
                       className="col-2 col-form-label">newDate: &nbsp; </label>
                <div className="col-9 ml-auto">
                    <input type="datetime-local" onChange={(e) => setNewDate(e.target.value)} value={newDate}
                           className="form-control" id="newDate"
                           style={{textDecoration: "underline"}} required/>
                </div>
                <label style={{color: "blue"}} htmlFor="newDuration" className="col-2 col-form-label">New
                    Duration: &nbsp; </label>
                <div className="col-9 ml-auto">
                    <input onChange={(e) => setNewDuration(e.target.value)} value={newDuration} className="form-control"
                           id="newDuration"
                           style={{textDecoration: "underline"}} required placeholder={props.dataForm.newDuration}/>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <button style={{backgroundColor: "red", color: "white"}} onClick={handleCancel}
                        className={`col-md-2`}>Cancel
                </button>
                <button style={{backgroundColor: "green", color: "white"}} onClick={handleSubmit}
                        className={`col-md-3 offset-1`}><span>Submit</span>
                </button>
            </div>
        </form>
    );
};

function mapStateToProps(state) {
    return {
        contacts: state.contacts,
        currentPage: state.currentPage,
        moreItems: state.moreItems,
        contactedCalls: state.contactedCalls,
        changedCall: state.changedCall,
        duration: state.duration,
        error: state.error.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addEditCall: (callId, callerId, contactedId, newDate, newDuration, actionType) =>
            dispatch(addEditCall(callId, callerId, contactedId, newDate, newDuration, actionType)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditForm);