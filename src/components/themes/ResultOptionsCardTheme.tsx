import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const ResultOptionsCardTheme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          textAlign: "center",
          margin: 0,
          padding: 0,
          backgroundColor: Colors.backgroundWhite,
        },
      },
    },
  },
});
