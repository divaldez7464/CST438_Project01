import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../screens/login';  // Adjust the path if necessary

// Mock the getUserByUserName function from the appDBService
jest.mock('../DB/appDBService', () => ({
  getUserByUserName: jest.fn()
}));

describe('Login Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows an error when fields are empty', () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Login'));
    // Add any alert or error checking here, depending on how errors are handled
    // You might need to use mockAlert or similar for testing alerts
  });

  it('navigates to homepage on successful login', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getUserByUserName } = require('../DB/appDBService');
    getUserByUserName.mockResolvedValue({ password: 'correct_password' });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Username'), 'test_user');
    fireEvent.changeText(getByPlaceholderText('Password'), 'correct_password');
    fireEvent.press(getByText('Login'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('homepage');
  });

  it('displays error on incorrect password', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getUserByUserName } = require('../DB/appDBService');
    getUserByUserName.mockResolvedValue({ password: 'correct_password' });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Username'), 'test_user');
    fireEvent.changeText(getByPlaceholderText('Password'), 'incorrect_password');
    fireEvent.press(getByText('Login'));

    // Add your specific error or alert handling here
    // You might need to mock alerts to check if the correct error is being displayed
  });
});
