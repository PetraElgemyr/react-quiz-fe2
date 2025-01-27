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
            borderBottomColor: "white",
          },
          "&:before": {
            borderBottomColor: "white",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "white",
          },
        },
        input: {
          "&:focus": {
            color: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});
