import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const QuestionOptionCardTheme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          textAlign: "center",
          margin: 0,
          padding: 0,
          backgroundColor: Colors.backgroundWhite,
          ":hover": {
            boxShadow: "inset 0 0 8px rgb(46, 45, 45)",
          },
        },
      },
    },
  },
});
