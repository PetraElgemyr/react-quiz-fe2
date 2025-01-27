import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const ButtonTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
        variant: "contained",
        sx: {
          background: Colors.primaryGold,
          color: "black",
        },
      },
    },
  },
});
