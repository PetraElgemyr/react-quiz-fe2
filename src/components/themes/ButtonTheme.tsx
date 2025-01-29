import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const ButtonTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          background: Colors.primaryGold,
          color: "black",
          fontFamily: "Georgia, serif",
        },
      },
    },
  },
});
