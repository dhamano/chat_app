import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { NavLink } from 'react-router-dom';
import Login from '../components/Login';

// test('renders login page', () => {
//     let loginRegVals = {
//         setUsername,
//         username,
//         loginOrReg,
//         setLoginOrReg,
//         onClickHandler
//     }
//     const { getByText } = render(<Login loginRegVals={loginRegVals} />);
//     const header = getByText(/Login/i);
//     expect(header).toBeInTheDocument();
// });

// describe('<Login />', () => {
//   it('should match snapshot', () => {
//     const tree = renderer.create(<Login />).toJSON();
//     expect(tree).toMatchSnapshot();
// 	});
// });
