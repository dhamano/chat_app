import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import toJSON from 'enzyme-to-json';
import { shallow, mount, render } from 'enzyme';

import Login from '../components/Login';

describe('<Login /> at Register', () => {
    let loginProps = {
            loginRegVals : {
                loginOrReg: 'Register'
            }
        }

        it('should have only one form', () => {
            const wrapper = shallow(<Login {...loginProps} />);
    
            expect(wrapper.find("form").exists()).toBe(true);
            expect(wrapper.find("form")).toHaveLength(1);
        });
    
        it('should have three input fields', () => {
            const wrapper = shallow(<Login {...loginProps} />);
    
            expect(wrapper.find("input").exists()).toBe(true);
            expect(wrapper.find("input")).toHaveLength(3);
        });
    
        it('should contain a submit button', () => {
            const wrapper = shallow(<Login {...loginProps} />);
    
            expect(wrapper.find("button").exists()).toBe(true);
            expect(wrapper.find("button")).toHaveLength(1);
        });
    
        it('should contain a username field and it should be empty', () => {
            const wrapper = shallow(<Login {...loginProps} />);
    
            expect(wrapper.find("#reg-username").exists()).toBe(true);
            expect(wrapper.find("#reg-username").props().value).toEqual('');
        });
    
        it('should contain a password field and it should be empty', () => {
            const wrapper = shallow(<Login {...loginProps} />);
    
            expect(wrapper.find("#reg-password").exists()).toBe(true);
            expect(wrapper.find("#reg-password").props().value).toEqual('');
        });

});

describe('<Login /> at login', () => {
    let loginProps = {
            loginRegVals : {
                loginOrReg: 'Login'
            }
        }

    it('renders', () => {
        const wrapper = shallow(<Login {...loginProps} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should match snapshot since login is deault', () => {
        const wrapper = shallow(<Login { ...loginProps } />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should have only one form', () => {
        const wrapper = shallow(<Login {...loginProps} />);

        expect(wrapper.find("form").exists()).toBe(true);
        expect(wrapper.find("form")).toHaveLength(1);
    });

    it('should have two input fields', () => {
        const wrapper = shallow(<Login {...loginProps} />);

        expect(wrapper.find("input").exists()).toBe(true);
        expect(wrapper.find("input")).toHaveLength(2);
    });

    it('should contain a submit button', () => {
        const wrapper = shallow(<Login {...loginProps} />);

        expect(wrapper.find("button").exists()).toBe(true);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it('should contain a username field and it should be empty', () => {
        const wrapper = shallow(<Login {...loginProps} />);

        expect(wrapper.find("#username").exists()).toBe(true);
        expect(wrapper.find("#username").props().value).toEqual('');
    });

    it('should contain a password field and it should be empty', () => {
        const wrapper = shallow(<Login {...loginProps} />);

        expect(wrapper.find("#password").exists()).toBe(true);
        expect(wrapper.find("#password").props().value).toEqual('');
    });
});
