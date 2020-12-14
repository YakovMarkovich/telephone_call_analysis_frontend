import {
    SUCCESS_GET_CALLERS, SUCCESS_SEARCH_CALLERS, SUCCESS_GET_CONTACTS,
    ERROR_GET_CALLERS,
    ERROR_SEARCH_CALLERS, ERROR_GET_CONTACTS
} from "../actions/CallerActions";
import {
    SUCCESS_GET_STATISTICS,
    REMOVE_ERROR,
    REMOVE_SUCCESS,
    ADD_EDIT_SUCCESS,
    ERROR_GET_STATISTICS,
    ADD_EDIT_ERROR
} from "../actions/ContactsActions";

const initialState = {
    callers: [],
    contacts: [],
    contactedCalls: [],
    currentCaller: localStorage.getItem('currentCallerId'),
    changedCall: '',
    duration: 0,
    itemsOnPage: 6,
    currentPage: 0,
    itemsTotal: '',
    moreItems: '',
    error: {
        status: '',
        message: ''
    }
};


export const CallerReducer = (state = initialState, action) => {

    function changeContactedCalls(changedCall, actionType) {
        let position = state.contactedCalls.map(function (x) {
            return x.id;
        }).indexOf(changedCall.id);
        if (actionType == "EditCall") {
            state.contactedCalls[position] = changedCall;

        } else  {
            state.contactedCalls.push(changedCall);
        }
        return state.contactedCalls;
    }

    function removeContactedCalls(changedCallId) {
        let position = state.contactedCalls.map(function (x) {
            return x.id;
        }).indexOf(changedCallId);
        state.contactedCalls.splice(position, 1);
        return state.contactedCalls;
    }

    switch (action.type) {
        case SUCCESS_GET_CALLERS:
            return {
                ...state,
                callers: action.payload.callers,
                contacts: [],
                itemsOnPage: action.payload.itemsOnPage, currentPage:
                action.payload.currentPage, itemsTotal: action.payload.itemsTotal,
                moreItems: action.payload.moreItems,
                error: {
                    status: '', message: ''
                }
            };
        case SUCCESS_SEARCH_CALLERS:
            return {
                ...state,
                callers: action.payload,
                contacts: [],
                itemsOnPage: 6, currentPage: initialState.currentPage,
                itemsTotal: 0,
                moreItems: false,
                error: {
                    status: '', message: ''
                }
            };
        case SUCCESS_GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                currentCaller: localStorage.getItem("currentCallerId"),
                contactedCalls: [],
                error: {
                    status: '', message: ''
                }
            };
        case SUCCESS_GET_STATISTICS:
            return {
                ...state,
                contactedCalls: action.payload.contactedCalls,
                duration: action.payload.duration,
                error: {
                    status: '', message: ''
                }
            };
        case ADD_EDIT_SUCCESS:
            return {
                ...state,
                contactedCalls: changeContactedCalls(action.payload.changedCallWithDuration, action.payload.actionType),
                changedCall: action.payload.changedCall,
                currentCaller: localStorage.getItem('currentCallerId'),
                duration: action.payload.changedCallWithDuration.total_duration,
                error: {
                    status: '', message: ''
                },
            };
        case REMOVE_SUCCESS:
            return {
                ...state,
                contactedCalls: removeContactedCalls(action.payload.changedCall, action.payload.actionType),
                changedCall: '',
                duration: action.payload.totalDuration,
                error: {
                    status: '', message: ''
                }
            };

        case ERROR_GET_CALLERS:
        case ERROR_SEARCH_CALLERS:
        case ERROR_GET_STATISTICS:
        case ERROR_GET_CONTACTS:
            return {
                ...state,
                callers: [],
                contacts: [],
                itemsOnPage: 6,
                currentPage: 0,
                changedCall: '',
                itemsTotal: 0,
                moreItems: false,
                error: {
                    status: '', message: action.payload.message
                }
            };
        case ADD_EDIT_ERROR:
        case REMOVE_ERROR:
            return {
                ...state,
                error: {
                    status: '', message: action.payload.message || "not correct date format"
                }
            };
        default:
            return state;
    }
}