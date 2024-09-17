import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../screens/homepage';  // Adjust the path if necessary

jest.mock('../DB/appDBService', () => ({
  getFavorites: jest.fn(() => Promise.resolve([]))  // Mock getFavorites function
}));

describe('HomePage Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomePage navigation={{ navigate: jest.fn() }} route={{ params: { user: { name: 'Test User', user_name: 'testuser' } }}} />);
    expect(getByText('Welcome to LeFitness!')).toBeTruthy();
  });
});
