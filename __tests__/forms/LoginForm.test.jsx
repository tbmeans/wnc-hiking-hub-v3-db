import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/app/ui/forms/LoginForm";
import { useModal } from "@/app/context/ModalContext";

jest.mock("@/app/context/ModalContext", () => ({
  useModal: jest.fn(),
}));

describe("LoginForm", () => {
  let showModalMock;
  const validPassword = "Test123!"
  const validEmail = "user@gmail.com";

  beforeEach(() => {
    showModalMock = jest.fn();
    useModal.mockReturnValue({ showModal: showModalMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders a LoginForm component", () => {
      render(<LoginForm />);
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });

  describe("functional", () => {
    it("does not throw when onSubmit is not provided", async () => {
      render(<LoginForm />);
      const button = screen.getByRole("button", { name: /log in/i });
      await userEvent.click(button);
    });

    it("uses the default onSubmit function when none is provided", async () => {
      render(<LoginForm />);
      const button = screen.getByRole("button", { name: /log in/i });
      await userEvent.click(button);
    });

    it("does not call onSubmit if required fields are empty", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      await userEvent.click(button);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("does not call onSubmit if email format is invalid", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, "invalid-email");
      await userEvent.type(passwordField, validPassword);
      await userEvent.click(button);
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(showModalMock).not.toHaveBeenCalled();
    });

    it("allows submission when button is clicked and e-mail and password are valid", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, validPassword);
      await userEvent.click(button);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(showModalMock).not.toHaveBeenCalled();
    });

    it("allows submission when password length is exactly 6 characters", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, "Test1!");
      await userEvent.click(button);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(showModalMock).not.toHaveBeenCalled();
    });

    it("calls showModal with the correct error message when the password is too short", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, "T1!");
      await userEvent.click(button);
      expect(showModalMock).toHaveBeenCalledWith(
        "Error",
        "Password must be at least 6 characters."
      );
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("calls showModal with the correct error message when the password does not have a number", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, "Testing!");
      await userEvent.click(button);
      expect(showModalMock).toHaveBeenCalledWith(
        "Error",
        "Password must contain at least one number."
      );
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("calls showModal with the correct error message when the password does not have an uppercase letter", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, "testing123!");
      await userEvent.click(button);
      expect(showModalMock).toHaveBeenCalledWith(
        "Error",
        "Password must contain at least one uppercase letter."
      );
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("calls showModal with the correct error message when the password does not have a special character", async () => {
      const mockOnSubmit = jest.fn();
      render(<LoginForm onSubmit={mockOnSubmit} />);
      const button = screen.getByRole("button", { name: /log in/i });
      const emailField = screen.getByLabelText(/e-mail/i);
      const passwordField = screen.getByLabelText(/password/i);
      await userEvent.type(emailField, validEmail);
      await userEvent.type(passwordField, "Testing123");
      await userEvent.click(button);
      expect(showModalMock).toHaveBeenCalledWith(
        "Error",
        "Password must contain at least one special character."
      );
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
