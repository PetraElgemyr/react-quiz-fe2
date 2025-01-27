import { createTheme } from "@mui/material";
import { Colors } from "../../styled/Variables/Colors";

export const StepperTheme = createTheme({
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        dots: { width: "100%", display: "flex", justifyContent: "center" },
        dot: {
          backgroundColor: Colors.backgroundWhite,
        },
        dotActive: {
          backgroundColor: "black",
        },
        root: {
          margin: 0,
          color: "black",
          borderRadius: "3px",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          padding: "3%",
        },
      },
    },
  },
});
