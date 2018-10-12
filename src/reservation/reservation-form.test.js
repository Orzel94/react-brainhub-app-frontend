import React from 'react';
import { shallow } from 'enzyme';
import { ReservationForm } from './reservation-form';

it('renders without crashing', () => {
  shallow(<ReservationForm />);
});

describe('Validating inputs', () => {
  it('has a name input field', () => {
    const wrapper = shallow(<ReservationForm />);
    expect(wrapper.containsMatchingElement(<input type="name" />)).toBe(true);
  });
  it('has a surname input field', () => {
    const wrapper = shallow(<ReservationForm />);
    expect(wrapper.containsMatchingElement(<input type="surname" />)).toBe(true);
  });
  it('has a email input field', () => {
    const wrapper = shallow(<ReservationForm />);
    expect(wrapper.containsMatchingElement(<input type="email" />)).toBe(true);
  });
  it('has a eventDate input field', () => {
    const wrapper = shallow(<ReservationForm />);
    expect(wrapper.containsMatchingElement(<input type="date" />)).toBe(true);
  });
});

describe('directly invoking the "validateField" method from component instance', () => {
  it('validate correct email', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('emailValid')).toBe(false);
    instance.validateField('email', "JanKowalski@email.com");
    expect(wrapper.state('emailValid')).toBe(true);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate incorrect email', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('emailValid')).toBe(false);
    instance.validateField('email', "JanKowalski123");
    expect(wrapper.state('emailValid')).toBe(false);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate correct name', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('nameValid')).toBe(false);
    instance.validateField('name', "Jan");
    expect(wrapper.state('nameValid')).toBe(true);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate incorrect name', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('nameValid')).toBe(false);
    instance.validateField('name', "Ja");
    expect(wrapper.state('nameValid')).toBe(false);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate correct surname', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('surnameValid')).toBe(false);
    instance.validateField('surname', "Kowalski");
    expect(wrapper.state('surnameValid')).toBe(true);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate incorrect surname', () => {
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('surnameValid')).toBe(false);
    instance.validateField('surname', "Ko");
    expect(wrapper.state('surnameValid')).toBe(false);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate correct eventDate', () => {
    let date = new Date(2120, 12, 30);
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('eventDateValid')).toBe(false);
    instance.validateField('eventDate', date);
    expect(wrapper.state('eventDateValid')).toBe(true);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it('validate incorrect eventDate', () => {
    let date = new Date(2001, 12, 30);
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('eventDateValid')).toBe(false);
    instance.validateField('eventDate', date);
    expect(wrapper.state('eventDateValid')).toBe(false);
    expect(wrapper.state('formValid')).toBe(false);
  });

  it(' validate incorrect eventDate', () => {
    let date = new Date(2120, 12, 30);
    const wrapper = shallow(<ReservationForm />);
    const instance = wrapper.instance();
    expect(wrapper.state('formValid')).toBe(false);
    instance.validateField('eventDate', date);
    instance.validateField('name', "Jan");
    instance.validateField('surname', "Kowalski");
    instance.validateField('email', "JanKowalski@email.com");
    expect(wrapper.state('formValid')).toBe(true);
  });
});