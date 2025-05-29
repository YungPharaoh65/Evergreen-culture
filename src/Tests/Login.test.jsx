import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Forms/Login';
import { auth, googleProvider } from '../Firebasedata/firebase';
import { vi } from 'vitest';

// ✅ Partially mock firebase/auth while preserving getAuth and others
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
  };
});

// ✅ After mocking, import the functions to be tracked
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Login Component', () => {
  test('renders login form with email, password input, and buttons', () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const googleButton = screen.getByRole('button', { name: /sign in with google instead/i });
    expect(googleButton).toBeInTheDocument();
  });

  test('allows the user to type in the email and password', () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('calls handleLogin function when the login button is clicked', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com' },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      )
    );
  });

  test('calls handleGoogleSignIn when the Google sign-in button is clicked', async () => {
    signInWithPopup.mockResolvedValueOnce({
      user: { email: 'googleuser@example.com' },
    });

    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /sign in with google instead/i }));

    await waitFor(() => expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider));
  });

  test('displays error message on login failure', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
