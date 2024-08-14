import { LimitedCounter } from "../components/LimitedCounter/LimitedCounter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("LimitedCounter", () => {
  it("should render components", () => {
    render(<LimitedCounter max={10} />);
    expect(screen.getByText("Decrement")).toBeInTheDocument();
    expect(screen.getByText("Increment")).toBeInTheDocument();
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
  it("should show count after click", () => {
    render(<LimitedCounter max={10} />);
    const Increment = screen.getByText("Increment");
    const Decrement = screen.getByText("Decrement");
    fireEvent.click(Increment);
    fireEvent.click(Increment);
    fireEvent.click(Decrement);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
  it("should show count maximum 2", () => {
    render(<LimitedCounter max={2} />);
    const Increment = screen.getByText("Increment");
    const Decrement = screen.getByText("Decrement");
    fireEvent.click(Increment);
    fireEvent.click(Increment);
    fireEvent.click(Increment);
    expect(screen.getByText("Count: 2")).toBeInTheDocument();
  });
});
