import React from 'react';
import { renderer } from '@testing-library/react';
import { Router, withRouter, MemoryRouter } from 'react-router-dom';

import { shallow, mount, render } from 'enzyme';

import App from '../App';
import Login from '../components/Login';

// test('renders learn react link', () => {
//     const AppWithRouter = withRouter(App);
//     const { getByText } = render(<Router><AppWithRouter /></Router>);
//     // const linkElement = getByText(/Login/i);
//     // expect(linkElement).toBeInTheDocument();
// });


describe('<App />', () => {
    it('should match snapshot', () => {
        const AppWithRouter = withRouter(App);
        const tree = renderer.create(<Router><AppWithRouter /></Router>).toJSON();
        expect(tree).toMatchSnapshot();
      });

    it('renders a page', () => {
        const wrapper = shallow(<App />);
        console.log("WRAPPER", wrapper);
        expect(wrapper.find(Login)).to.have.lengthOf(0);
        expect(wrapper.find(Login).shallow().find('.login-reg-page').to.have.lengthOf(1));
    })
});