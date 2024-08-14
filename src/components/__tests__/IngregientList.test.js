import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../context/themeContext";
import { IngredientList } from "../IngridientList/IngredientList";
import "@testing-library/jest-dom/extend-expect";

const mockIngredients = [
  { ingredient: "Tomato", image: "tomato.jpg" },
  { ingredient: "Lettuce", image: "lettuce.jpg" },
];

const MockThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");

  const changeTheme = (newTheme) => {
    const updatedTheme = newTheme === "dark" ? "light" : "dark";
    setTheme(updatedTheme);
  };

  return (
    <ThemeProvider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeProvider>
  );
};

describe("IngredientList", () => {
  it("should render list of ingredients", () => {
    render(
      <MockThemeProvider>
        <IngredientList ingredients={mockIngredients} />
      </MockThemeProvider>
    );

    mockIngredients.forEach(({ ingredient }) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    mockIngredients.forEach(({ image }) => {
      expect(
        screen.getByAltText(
          mockIngredients.find((i) => i.image === image).ingredient
        )
      ).toBeInTheDocument();
    });
  });
});
