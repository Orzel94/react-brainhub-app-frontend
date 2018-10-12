import store from "../store/store";
import {ToastContainer, ToastStore} from 'react-toasts';

const backendURL = "http://localhost:3001";

export function SendReservation() {
    let data = store.getState();
    fetch(backendURL + '/reservation', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            surname: data.surname,
            email: data.email,
            eventDate: data.eventDate,
        })
    })
        .then(res => res.json())
        .then(
        (result) => {
            ToastStore.success("Reservation succeded")
        },
        (error) => {
            ToastStore.error(error.message);
        })
        .catch(error => ToastStore.error(error.message))
}


