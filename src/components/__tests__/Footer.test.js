import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer/Footer";

describe("Footer", () => {
  it("should render components", () => {
    render(<Footer />);
    expect(screen.getByText("My Footer")).toBeInTheDocument();
  });
});
