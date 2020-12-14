import {logger} from "redux-logger/src";

export const SUCCESS_GET_CALLERS = 'SUCCESS_GET_CALLERS';
export const SUCCESS_SEARCH_CALLERS = 'SUCCESS_SEARCH_CALLERS';
export const SUCCESS_GET_CONTACTS = 'SUCCESS_GET_CONTACTS';
export const ERROR_GET_CALLERS = 'ERROR_GET_CALLERS ';
export const ERROR_SEARCH_CALLERS = 'ERROR_SEARCH_CALLERS';
export const ERROR_GET_CONTACTS = 'ERROR_GET_CONTACTS';

export const getContactsErrorAction = (error) => {
    return {
        type: ERROR_GET_CONTACTS,
        payload: {
            status: error.status,
            message: error
        }
    }
}

export const searchErrorAction = (error) => {
    return {
        type: ERROR_SEARCH_CALLERS,
        payload: {
            status: error.status,
            message: error
        }
    }
}

export const getCallersErrorAction = (error) => {
    return {
        type: ERROR_GET_CALLERS,
        payload: {
            status: error.status,
            message: error.message
        }
    }
}

export const getContactsSuccessAction = (contacts, id) => {
    localStorage.setItem("currentCallerId", id);
    return {
        type: SUCCESS_GET_CONTACTS,
        payload: contacts
    }
}

export const searchSuccessAction = (callers) => {
    return {
        type: SUCCESS_SEARCH_CALLERS,
        payload: callers
    }
}

export const getCallersSuccessAction = (callers) => {
    return {
        type: SUCCESS_GET_CALLERS,
        payload: callers
    }
}

export const getAllCallersPageable = (cur, items, moreItems) => {
    let currentPage = cur;
    let itemsOnPage = items;
    if(!moreItems){
        itemsOnPage = 6;
    }
    if(currentPage<0){
        return;
    }

    return (dispatch) => {
        fetch(`https://telephone-calls-analysis.herokuapp.com/callers/pageable?currentPage=` + currentPage + `&itemsOnPage=` + itemsOnPage, {
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
                        }
                        else{
                            return Promise.reject(json)
                        }
                    })
            })
            .then(data => dispatch(getCallersSuccessAction(data)))
            .catch(e => dispatch(getCallersErrorAction(e)));
    }
}

export const searchCallers = (searchString) => {
    return (dispatch) => {
        fetch(`https://telephone-calls-analysis.herokuapp.com/callers/namesOrEmail?searchString=` + searchString, {
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
                        }
                        else{
                            return Promise.reject(json)
                        }
                    })
            })
            .then(data => dispatch(searchSuccessAction(data)))
            .catch(e => dispatch(searchErrorAction(e)));
    }
}

export const getCallerContacts = (id) => {
    return (dispatch) => {
        fetch(`https://telephone-calls-analysis.herokuapp.com/callers/calls/contacts?id=` + id, {
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
                        }
                        else{
                            return Promise.reject(json)
                        }
                    })
            })
            .then(data => dispatch(getContactsSuccessAction(data, id)))
            .catch(e => dispatch(getContactsErrorAction(e)));
    }
}