import { ADD_EMAIL, ADD_EVENTDATE, ADD_NAME, ADD_SURNAME } from '../actions/action-type';

const initialState = {
    name: '',
    surname: '',
    email: '',
    eventDate: '',
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMAIL:
            return { ...state, email: action.payload };
        case ADD_EVENTDATE:
            return { ...state, eventDate: action.payload };
        case ADD_NAME:
            return { ...state, name: action.payload };
        case ADD_SURNAME:
            return { ...state, surname: action.payload };
        default:
            return state;
    }
};
export default rootReducer;