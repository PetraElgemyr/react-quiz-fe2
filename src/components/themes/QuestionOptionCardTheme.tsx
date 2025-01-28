import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const QuestionOptionCardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textAlign: "center",
          margin: 0,
          padding: 0,
          backgroundColor: Colors.backgroundWhite,
        },
      },
    },
  },
});
