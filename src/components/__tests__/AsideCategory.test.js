import { render, screen } from "@testing-library/react";
import { AsideCategory } from "../AsideCategory";
import { useData } from "../../hooks";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../hooks", () => ({
  useData: jest.fn(),
}));

describe("AsideCategory", () => {
  it("should render list of categories", () => {
    useData.mockReturnValue({
      meals: [{ strCategory: "Vegetarian" }, { strCategory: "Dessert" }],
    });

    render(
      <MemoryRouter>
        <AsideCategory />
      </MemoryRouter>
    );

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Vegetarian")).toBeInTheDocument();
    expect(screen.getByText("Dessert")).toBeInTheDocument();
  });

  it("should not render header if no data", () => {
    useData.mockReturnValue({ meals: [] });

    const { queryByText } = render(
      <MemoryRouter>
        <AsideCategory />
      </MemoryRouter>
    );
    expect(queryByText("Category")).toBeNull();
  });

  it("should not render header if data is undefined", () => {
    useData.mockReturnValue({});

    const { queryByText } = render(
      <MemoryRouter>
        <AsideCategory />
      </MemoryRouter>
    );
    expect(queryByText("Category")).toBeNull();
  });
});
