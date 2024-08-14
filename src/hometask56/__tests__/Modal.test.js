import { Modal } from "../components/Modal/Modal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal", () => {
  it("should render component", () => {
    render(<Modal />);
    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });
  it("should open modal on click", () => {
    render(<Modal />);
    const buttonOpen = screen.getByText("Open Modal");
    fireEvent.click(buttonOpen);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a modal window")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
  it("should close modal", () => {
    render(<Modal />);
    const buttonOpen = screen.getByText("Open Modal");
    fireEvent.click(buttonOpen);
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
