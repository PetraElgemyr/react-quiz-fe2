import { createTheme } from "@mui/material";
import { Breakpoints } from "../styled/Variables/Breakpoints";

export const breakpointTheme = createTheme({
  breakpoints: {
    values: {
      xs: Breakpoints.miniMobileBreakpoint,
      sm: Breakpoints.tabletBreakpoint,
      md: Breakpoints.laptopBreakpoint,
      lg: Breakpoints.desktopBreakpoint,
      xl: Breakpoints.fourKBreakpoint,
    },
  },
});
