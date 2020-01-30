import React, { useState } from 'react';
import { renderer, containsMatchingElement } from '@testing-library/react';
import { Router, withRouter, MemoryRouter } from 'react-router-dom';

import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import App from '../App';

describe('<App />', () => {

    it('renders', () => {
        shallow(<App />);
    })

    // it('displays login', (props) => {
    //     const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    //     expect(wrapper.find("div")).toHaveLength(7);
    // })

    it('should match snapshot', () => {
        const wrapper = shallow(<App />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});