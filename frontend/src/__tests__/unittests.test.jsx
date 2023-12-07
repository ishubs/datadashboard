import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/LoginSignupPage';
import { login, signup } from '../api'; 

jest.mock('../api'); 

describe('Login Component', () => {
  test('renders login form by default', () => {
    render(<Login />);
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('switches to signup form when "Sign up" link is clicked', () => {
    render(<Login />);
    userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  test('calls login API on form submission', async () => {
    login.mockResolvedValue({ accessToken: 'fakeAccessToken' });

    render(<Login />);

    userEvent.type(screen.getByLabelText('Your email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');

    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password@123',
      });
    });

  });

  test('calls signup API on form submission', async () => {
    signup.mockResolvedValue({ userId: 'fakeUserId' });

    render(<Login />);

    userEvent.click(screen.getByText('Sign up'));

    userEvent.type(screen.getByLabelText('Your email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Name'), 'Test User');
    userEvent.type(screen.getByLabelText('Username'), 'testuser');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');

    fireEvent.submit(screen.getByRole('button', { name: 'Sign up' }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        username: 'testuser',
        password: 'Password@123',
        confirmPassword: 'Password@123',
      });
    });

  });
});
