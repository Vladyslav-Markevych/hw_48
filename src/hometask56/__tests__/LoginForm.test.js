import { LoginForm } from "../components/LoginForm/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";

describe("LoginForm", () => {
  it("should render components", () => {
    render(<LoginForm />);
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
  it("should change inputs", () => {
    render(<LoginForm />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");

    fireEvent.change(user, { target: { value: "name" } });
    fireEvent.change(pass, { target: { value: "pass" } });

    expect(user.value).toBe("name");
    expect(pass.value).toBe("pass");
  });
  it("should work ", () => {
    const mock = jest.fn();
    render(<LoginForm onLogin={mock} />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");
    const button = screen.getByText("Login");

    fireEvent.change(user, { target: { value: "name" } });
    fireEvent.change(pass, { target: { value: "pass" } });
    fireEvent.click(button);

    expect(mock).toHaveBeenCalledWith({ username: "name", password: "pass" });
  });
});
