import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

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
          color: Colors.secondaryGold,
          "&:after": {
            borderBottomColor: Colors.secondaryGold,
          },
          "&:before": {
            borderBottomColor: Colors.secondaryGold,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: Colors.secondaryGold,
          },
        },
        input: {
          "&:focus": {
            color: Colors.secondaryGold,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: Colors.secondaryGold,
          "&.Mui-focused": {
            color: Colors.secondaryGold,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: Colors.secondaryGold,
        },
      },
    },
  },
});
