import {logger} from "redux-logger/src";

export const SUCCESS_GET_STATISTICS = 'SUCCESS_GET_STATISTICS';
export const ERROR_GET_STATISTICS = 'ERROR_GET_STATISTICS';
export const ADD_EDIT_SUCCESS = 'ADD_EDIT_SUCCESS';
export const ADD_EDIT_ERROR = 'ADD_EDIT_ERROR';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';
export const REMOVE_ERROR = 'REMOVE_ERROR';


export const getCallContactsStatisticsError = (error) => {
    return {
        type: ERROR_GET_STATISTICS,
        payload: {
            status: error.status,
            message: error.message
        }
    }
}

export const addEditErrorAction = (error) => {
    return {
        type: ADD_EDIT_ERROR,
        payload: {
            status: error.status,
            message: error.message
        }
    }
}

export const removeErrorAction = (error) => {
    return {
        type: REMOVE_ERROR,
        payload: {
            status: error.status,
            message: error.message
        }
    }
}
export const removeSuccessAction = (call, data, actionType) => {
    return {
        type: REMOVE_SUCCESS,
        payload: {
            changedCall: call,
            actionType: actionType,
            totalDuration:  data
        }
    }
}

export const addEditSuccessAction = (call, actionType) => {
    return {
        type: ADD_EDIT_SUCCESS,
        payload: {
            changedCallWithDuration: call,
            actionType: actionType
        }
    }
}

export const getCallContactsStatisticsSuccess = (statistics) => {
    return {
        type: SUCCESS_GET_STATISTICS,
        payload: {
            contactedCalls: statistics.contactedCalls,
            duration: statistics.duration
        }
    }
}
export const getCallContactStatistics = (callerId, contactsId) => {
    let firstPartUrl = `https://telephone-calls-analysis.herokuapp.com/callers/calls/?callerId=` + callerId;
    let url = firstPartUrl + `&` + `contactId=` + contactsId;
    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                return response.json()
                    .then(json => {
                        if (response.status === 200) {
                            return Promise.resolve(json)
                        } else {
                            return Promise.reject(json)
                        }
                    })
            })
            .then(data => dispatch(getCallContactsStatisticsSuccess(data)))
            .catch(e => dispatch(getCallContactsStatisticsError(e)));
    }
}

export const addEditCall = (callId, callerId, contactedId, newDate, newDuration, actionType) => {
    if (actionType == 'AddCall') {
        return (dispatch) => {
            fetch(`https://telephone-calls-analysis.herokuapp.com/callers`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "caller_id": callerId,
                    "called_party_id": contactedId,
                    "timestamp": newDate.replace('T', ' ')+':00',
                    "duration_in_seconds": newDuration
                })
            })
                .then(response => {
                    return response.json()
                        .then(json => {
                            if (response.status === 200) {
                                return Promise.resolve(json)
                            } else {
                                return Promise.reject(json)
                            }
                        })
                })
                .then(data => dispatch(addEditSuccessAction(data)))
                .catch(e => dispatch(addEditErrorAction(e)));
        }
    } else if (actionType == "EditCall") {
        return (dispatch) => {
            fetch(`https://telephone-calls-analysis.herokuapp.com/callers/calls/edit/` + callId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "caller_id": callerId,
                    "called_party_id": contactedId,
                    "timestamp": newDate.replace('T', ' ')+':00',
                    "duration_in_seconds": newDuration
                })
            })
                .then(response => {
                    return response.json()
                        .then(json => {
                            if (response.status === 200) {
                                return Promise.resolve(json)
                            } else {
                                return Promise.reject(json)
                            }
                        })
                })
                .then(data => dispatch(addEditSuccessAction(data, actionType)))
                .catch(e => dispatch(addEditErrorAction(e)));
        }
    }
}

export const removeCall = (callId, actionType) => {
    return (dispatch) => {
        fetch(`https://telephone-calls-analysis.herokuapp.com/callers/calls/delete/` + callId, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                return response.json()
                    .then(json => {
                        if (response.status === 200) {
                            return Promise.resolve(json)
                        } else {
                            return Promise.reject(json)
                        }
                    })
            })
            .then(data => dispatch(removeSuccessAction(callId, data, actionType)))
            .catch(e => dispatch(removeErrorAction(e)));
    }
}