import { Dropdown } from "../components/Dropdown/Dropdown";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Dropdown", () => {
  it("should render components", () => {
    render(<Dropdown />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(screen.queryByText(/You selected: .*/i)).not.toBeInTheDocument();
  });
  it("should show choose opinion", () => {
    render(<Dropdown />);
    const selected = screen.getByDisplayValue("Select an option");
    fireEvent.change(selected, { target: { value: "Option 3" } });
    const newSelect = screen.getByText("You selected: Option 3");
    expect(newSelect).toBeInTheDocument();
  });
});
