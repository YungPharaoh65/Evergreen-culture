import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Login from "../Forms/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebasedata/firebase";

// Mock react-router
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("../Firebasedata/firebase", () => ({
  auth: {},
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders login form with inputs and buttons", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign up Instead/i })).toBeInTheDocument();
  });

  test("shows error when login fails", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error("Invalid email or password."));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
    );
  });

  test("navigates to dashboard after successful login", async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: "test@example.com" },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("userEmail")).toBe("test@example.com");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});

