import React from 'react';
import { shallow } from 'enzyme';
import { ReservationForm } from './reservation-form';

it('renders without crashing', () => {
  shallow(<ReservationForm />);
});

describe('directly invoking the "validateField" method from component instance', () => {
it('renders validate correct email', () => {
    const wrapper=shallow(<ReservationForm />);
    const instance=wrapper.instance();
    expect(wrapper.state('emailValid')).toBe(false);
    instance.validateField('email',"JanKowalski@email.com");
    expect(wrapper.state('emailValid')).toBe(true);
  });

  it('renders validate incorrect email', () => {
    const wrapper=shallow(<ReservationForm />);
    const instance=wrapper.instance();
    expect(wrapper.state('emailValid')).toBe(false);
    instance.validateField('email',"JanKowalski123");
    expect(wrapper.state('emailValid')).toBe(false);
  });
});