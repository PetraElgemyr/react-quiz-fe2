import { createTheme, MobileStepper, ThemeProvider } from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";
import { Colors } from "../styled/Variables/Colors";

const stepperTheme = createTheme({
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

export const Stepper = () => {
  const { questions, currentQuestionNumber } = useAppContext();

  return (
    <>
      <ThemeProvider theme={stepperTheme}>
        <MobileStepper
          variant="dots"
          steps={questions.length}
          position="static"
          activeStep={currentQuestionNumber}
          sx={{
            width: "100%",
          }}
          nextButton={<></>}
          backButton={<></>}
        />
      </ThemeProvider>
    </>
  );
};
