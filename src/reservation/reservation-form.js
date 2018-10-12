import React, { Component } from 'react';
import store from "../store/store";
import { addEmail, addEventDate, addName, addSurname } from '../store/actions/index'
import { SendReservation } from './service';
import { ToastContainer, ToastStore } from 'react-toasts';


export class ReservationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValid: false,
            surnameValid: false,
            emailValid: false,
            eventDateValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        let name = e.target.name;
        let value = null;
        if (name === "eventDate") {
            value = new Date(e.target.value);
        } else {
            value = e.target.value;
        }
        switch (name) {
            case 'email':
                store.dispatch(addEmail(value));
                break;
            case 'name':
                store.dispatch(addName(value));
                break;
            case 'surname':
                store.dispatch(addSurname(value));
                break;
            case 'eventDate':
                store.dispatch(addEventDate(value));
                break;
            default:
                break;
        }
        this.validateField(name, value)
    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        let surnameValid = this.state.surnameValid;
        let eventDateValid = this.state.eventDateValid;
        switch (fieldName) {
            case 'email':
                let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                emailValid = filter.test(value);
                break;
            case 'name':
                nameValid = value.length >= 3;
                break;
            case 'surname':
                surnameValid = value.length >= 3;
                debugger;
                break;
            case 'eventDate':
                let dateTMP = new Date(Date.now())
                eventDateValid = value >= dateTMP;
                break;
            default:
                break;
        }
        this.setState({
            emailValid: emailValid,
            nameValid: nameValid,
            surnameValid: surnameValid,
            eventDateValid: eventDateValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.nameValid && this.state.surnameValid && this.state.eventDateValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    senReservation = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        SendReservation();
    }

    render() {
        return (
            <form autoComplete="off">
                <h2>Sign up for event</h2>
                <div className={`form-group ${this.errorClass(this.state.nameValid ? '' : 'err')}`}>
                    <label htmlFor="name">First Name</label>
                    <input type="name" className="form-control" name="name"
                        placeholder="Name"
                        onChange={this.handleUserInput} />
                    <div className='Form-error'><b>{this.state.nameValid ? '' : 'Minimum length: 3'}</b></div>
                </div>
                <div className={`form-group ${this.errorClass(this.state.surnameValid ? '' : 'err')}`}>
                    <label htmlFor="surname">Last Name</label>
                    <input type="surname" className="form-control" name="surname"
                        placeholder="Surname"
                        onChange={this.handleUserInput} />
                    <div className='Form-error'><b>{this.state.surnameValid ? '' : 'Minimum length: 3'}</b></div>
                </div>
                <div className={`form-group ${this.errorClass(this.state.emailValid ? '' : 'err')}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" name="email"
                        placeholder="Email"
                        onChange={this.handleUserInput} />
                    <div className='Form-error'><b>{this.state.emailValid ? '' : 'Invalid email format'}</b></div>
                </div>
                <div className={`form-group ${this.errorClass(this.state.eventDateValid ? '' : 'err')}`}>
                    <label htmlFor="eventDate">Event Date</label>
                    <input type="date" required className="form-control" name="eventDate"
                        placeholder="EventDate"
                        onChange={this.handleUserInput} />
                        <div className='Form-error'><b>{this.state.eventDateValid ? '' : 'Invalid date'}</b></div>
                </div>

                <button onClick={this.senReservation} className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
                <ToastContainer store={ToastStore} />
            </form>
        )
    }
}

export default ReservationForm;