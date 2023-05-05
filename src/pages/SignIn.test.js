import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SignIn from '../pages/SignIn';
import { UserContext } from '../routing/index.jsx';
import AttendanceService from '../services/AttendanceService';

// Mocking useNavigate and useLocation
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/signin' }),
}));

// Mocking AttendanceService.lessons method
jest.mock('../services/AttendanceService', () => ({
  lessons: jest.fn(),
}));

describe('<SignIn />', () => {
  const store = {
    login: jest.fn(),
    user: {
      role: 'Student',
    },
  };

  beforeEach(() => {
    AttendanceService.lessons.mockClear();
    store.login.mockClear();
  });

  it('renders the SignIn component', () => {
    render(
      <UserContext.Provider value={{ store }}>
        <SignIn />
      </UserContext.Provider>
    );

    expect(screen.getByPlaceholderText('ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('PASSWORD')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(
      <UserContext.Provider value={{ store }}>
        <SignIn />
      </UserContext.Provider>
    );

    const idInput = screen.getByPlaceholderText('ID');
    const passwordInput = screen.getByPlaceholderText('PASSWORD');

    fireEvent.change(idInput, { target: { value: 'test-id' } });
    fireEvent.change(passwordInput, { target: { value: 'test-password' } });

    expect(idInput.value).toBe('test-id');
    expect(passwordInput.value).toBe('test-password');
  });

  it('submits the form and calls store.login', async () => {
    store.login.mockResolvedValue({ status: 200, data: { user: {} } });
    AttendanceService.lessons.mockResolvedValue({ status: 200, data: [] });

    render(
      <UserContext.Provider value={{ store }}>
        <SignIn />
      </UserContext.Provider>
    );

    const idInput = screen.getByPlaceholderText('ID');
    const passwordInput = screen.getByPlaceholderText('PASSWORD');
    const submitButton = screen.getByText('Log In');

    userEvent.type(idInput, 'test-id');
    userEvent.type(passwordInput, 'test-password');
    userEvent.click(submitButton);

    await waitFor(() => expect(store.login).toHaveBeenCalledWith('test-id', 'test-password'));
  });

  it('opens and closes the ForgetPassword component', () => {
    render(
      <UserContext.Provider value={{ store }}>
        <SignIn />
      </UserContext.Provider>
    );

    const forgotPasswordButton = screen.getByText('Forgot password?');
    fireEvent.click(forgotPasswordButton);

    expect(screen.getByTestId('forget-password')).toBeInTheDocument();

    const cancelButton = screen.getByTestId('cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId('forget-password')).not.toBeInTheDocument();
  });
});
