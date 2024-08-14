import { LoginForm2 } from "../components/LoginForm2/LoginForm2";
import { render, screen, fireEvent } from "@testing-library/react";

describe("LoginForm2", () => {
  it("should render components", () => {
    render(<LoginForm2 />);
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
  it("should change inputs", () => {
    render(<LoginForm2 />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");

    fireEvent.change(user, { target: { value: "name" } });
    fireEvent.change(pass, { target: { value: "pass" } });

    expect(user.value).toBe("name");
    expect(pass.value).toBe("pass");
  });
  it("should work onLogin func", () => {
    const mock = jest.fn();
    render(<LoginForm2 onLogin={mock} />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");
    const button = screen.getByText("Login");

    fireEvent.change(user, { target: { value: "name" } });
    fireEvent.change(pass, { target: { value: "pass" } });
    fireEvent.click(button);

    expect(mock).toHaveBeenCalledWith({ username: "name", password: "pass" });
  });
  it("Show error", () => {
    render(<LoginForm2 />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");
    const button = screen.getByText("Login");

    fireEvent.change(user, { target: { value: "" } });
    fireEvent.change(pass, { target: { value: "" } });
    fireEvent.click(button);

    const error = screen.getByText("Username and password are required");
    expect(error).toBeInTheDocument();
  });
  it("Don't show error", () => {
    const mock = jest.fn();
    render(<LoginForm2 onLogin={mock} />);
    const user = screen.getByLabelText("Username:");
    const pass = screen.getByLabelText("Password:");
    const button = screen.getByText("Login");

    fireEvent.change(user, { target: { value: "name" } });
    fireEvent.change(pass, { target: { value: "pass" } });
    fireEvent.click(button);

    const error = screen.queryByText("Username and password are required");
    expect(error).not.toBeInTheDocument();
  });
});
