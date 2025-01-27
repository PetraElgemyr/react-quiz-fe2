import { createTheme } from "@mui/material";

export const TextFieldTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:after": {
            borderBottomColor: "black",
          },
          "&:before": {
            borderBottomColor: "rgba(0, 0, 0, 0.42)",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "black",
          },
        },
        input: {
          "&:focus": {
            color: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
  },
});
