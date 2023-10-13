import { ThemeProvider } from "styled-components";

import theme from "./utils/theme";
import { GlobalStyle } from "./styles";

const StyledProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default StyledProvider;
