import React, { Component } from 'react';
import { FormErrors } from '../FormErrors';

class ReservationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            eventDate: '',
            formErrors: {
                name: '',
                surname: '',
                email: '',
                eventDate: new Date()
            },
            nameValid: false,
            surnameValid: false,
            emailValid: false,
            eventDateValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        let name = e.target.name;
        let value=null;
        if(name==="eventDate"){
            value =new Date(e.target.value);
        }else{
            value = e.target.value;
        }
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        let surnameValid = this.state.surnameValid;
        let eventDateValid = this.state.eventDateValid;
debugger;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' invalid format: example@example.com';
                break;
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '' : ' minimum length: 3';
                break;
            case 'surname':
                surnameValid = value.length >= 6;
                fieldValidationErrors.surname = surnameValid ? '' : ' minimum length: 3';
                break;
            case 'eventDate':
            let dateTMP =new Date(Date.now())
                eventDateValid = value >= dateTMP;
                fieldValidationErrors.eventDate = eventDateValid ? '' : ' must be greater than present';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
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

    render() {
        return (
            <form>
                <h2>Sign up for event</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                    <label htmlFor="name">First Name</label>
                    <input type="text" className="form-control" name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleUserInput} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.surname)}`}>
                    <label htmlFor="surname">Last Name</label>
                    <input type="text" className="form-control" name="surname"
                        placeholder="Surname"
                        value={this.state.surname}
                        onChange={this.handleUserInput} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleUserInput} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.eventDate)}`}>
                    <label htmlFor="eventDate">Event Date</label>
                    <input type="date" required className="form-control" name="eventDate"
                        placeholder="EventDate"
                        value={this.state.eventDate}
                        onSelect={this.handleUserInput} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
            </form>
        )
    }
}

export default ReservationForm;
