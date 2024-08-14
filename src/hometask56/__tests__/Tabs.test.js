import { Tabs } from "../components/Tabs/Tabs";
import { screen, render, fireEvent } from "@testing-library/react";

describe("Tabs", () => {
  it("should render component", () => {
    render(<Tabs />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
    expect(screen.getByText("Content of Tab 1")).toBeInTheDocument();
    expect(screen.queryByText("Content of Tab 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Content of Tab 3")).not.toBeInTheDocument();
  });
  it("should change tabs from 1 to 2", () => {
    render(<Tabs />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.queryByText("Content of Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content of Tab 2")).toBeInTheDocument();
  });
  it("should change tabs from 1 to 3", () => {
    render(<Tabs />);
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.queryByText("Content of Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content of Tab 3")).toBeInTheDocument();
  });
});
