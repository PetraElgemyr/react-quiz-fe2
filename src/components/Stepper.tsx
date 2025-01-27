import { MobileStepper, ThemeProvider } from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";
import { StepperTheme } from "./themes/StepperTheme";

export const Stepper = () => {
  const { questions, currentQuestionNumber } = useAppContext();

  return (
    <>
      <ThemeProvider theme={StepperTheme}>
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
