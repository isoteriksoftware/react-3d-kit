import { render, screen } from "@testing-library/react";
import { ThemeProvider, defaultTheme } from "./ThemeProvider";
import { useTheme } from "./useTheme";

describe("ThemeProvider", () => {
  it("should render", () => {
    render(<ThemeProvider />);
  });

  it("should render children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should provide default theme", () => {
    const MockComponent = () => {
      const theme = useTheme();
      return <div>{theme.palette?.primary?.main}</div>;
    };

    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>,
    );

    expect(
      screen.getByText(defaultTheme.palette?.primary?.main as string),
    ).toBeInTheDocument();
  });

  it("should provide custom theme", () => {
    const MockComponent = () => {
      const theme = useTheme();
      return <div>{theme.palette?.primary?.main}</div>;
    };

    render(
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "red",
            },
          },
        }}
      >
        <MockComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("red")).toBeInTheDocument();
  });
});
