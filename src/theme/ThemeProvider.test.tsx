import { render } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";

describe("ThemeProvider", () => {
  it("should render", () => {
    render(<ThemeProvider />);
  });
});
