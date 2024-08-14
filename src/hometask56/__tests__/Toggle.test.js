import { Toggle } from "../components/Toggle/Toggle";
import { screen, render, fireEvent } from "@testing-library/react";

describe("Toggle", () => {
  it("should render component", () => {
    render(<Toggle />);
    expect(screen.getByText("The switch is OFF")).toBeInTheDocument();
    expect(screen.getByText("Turn ON")).toBeInTheDocument();
  });
  it("should change components on click", () => {
    render(<Toggle />);
    fireEvent.click(screen.getByText("Turn ON"));
    expect(screen.getByText("The switch is ON")).toBeInTheDocument();
    expect(screen.getByText("Turn OFF")).toBeInTheDocument();
  });
});
