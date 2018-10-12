import { ADD_EMAIL, ADD_EVENTDATE, ADD_NAME, ADD_SURNAME } from './action-type'

export const addName = name => ({ type: ADD_NAME, payload: name });
export const addSurname = surname => ({ type: ADD_SURNAME, payload: surname });
export const addEmail = email => ({ type: ADD_EMAIL, payload: email });
export const addEventDate = eventDate => ({ type: ADD_EVENTDATE, payload: eventDate });
export const addStateData = (actionType, data) => ({ type: actionType, payload: data });