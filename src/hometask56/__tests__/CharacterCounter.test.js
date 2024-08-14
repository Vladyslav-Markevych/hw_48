import { CharacterCounter } from "../components/CharacterCounter/CharacterCounter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("CharacterCounter.jsx", () => {
  it("should render components", () => {
    render(<CharacterCounter />);
    const textarea = screen.getByPlaceholderText(/Type something*/i);
    const count = screen.getByText(/Character count*/i);
    expect(textarea).toBeInTheDocument();
    expect(count).toBeInTheDocument();
  });
  it("should change count", () => {
    render(<CharacterCounter />);
    const textarea = screen.getByPlaceholderText(/Type something*/i);
    fireEvent.change(textarea, { target: { value: "hello" } });
    const count = screen.getByText("Character count: 5");
    expect(count).toBeInTheDocument();
  });
});
