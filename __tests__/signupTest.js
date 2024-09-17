import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Signup from '../screens/Signup';  // Adjust the path if necessary

jest.mock('../DB/appDBService', () => ({
  addUser: jest.fn()
}));

describe('Signup Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Signup navigation={{ navigate: jest.fn() }} />);
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('calls addUser and navigates on successful signup', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { addUser } = require('../DB/appDBService');
    addUser.mockResolvedValue();  // Mock successful user addition

    const { getByPlaceholderText, getByText } = render(<Signup navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Name'), 'Test Name');
    fireEvent.changeText(getByPlaceholderText('Username'), 'test_user');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));

    expect(addUser).toHaveBeenCalledWith(expect.anything(), 'Test Name', 'test_user', 'password123');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});
