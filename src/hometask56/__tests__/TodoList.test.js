import { TodoList } from "../components/TodoList/TodoList";
import { screen, render, fireEvent } from "@testing-library/react";

describe("TodoList", () => {
  it("should render component", () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });
  it("should add items to list", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Enter a task");

    fireEvent.change(input, { target: { value: "something" } });
    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByText("something")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "something2" } });
    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByText("something2")).toBeInTheDocument();
  });
});
