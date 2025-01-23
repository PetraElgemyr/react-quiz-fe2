import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  createTheme,
  MobileStepper,
  ThemeProvider,
} from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";
import { Player } from "./models/Player";
// import "./scss/stepper.scss";
import { Colors } from "../styled/Variables/Colors";
import { breakpointTheme } from "../themes/themes";

const stepperTheme = createTheme({
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        dot: {
          backgroundColor: "#eee0e49c",
        },
        dotActive: {
          backgroundColor: "black",
        },
        root: {
          color: "black",
          borderRadius: "3px",
          justifyContent: "space-between",
          backgroundColor: Colors.primaryFrostyWhite,
          boxShadow: "2px 2px 10px 1px rgba(59, 47, 47, 0.7) ",
        },
      },
    },
  },
});

interface IStepperProps {
  triggerNextQuestion: () => void;
  registerEmptyAnswer: () => Player;
  triggerResultPage: () => void;
  updateCurrentPlayerInLS: (p: Player) => void;
}

export const Stepper = ({
  triggerResultPage,
  triggerNextQuestion,
  registerEmptyAnswer,
  updateCurrentPlayerInLS,
}: IStepperProps) => {
  const { questions, currentQuestionNumber, currentPlayer } = useAppContext();

  const checkIfPickedAnswer = () => {
    if (
      !currentPlayer.answers.find(
        (a) => a.questionId === currentQuestionNumber + 1
      )?.answer
    ) {
      const updatedCurrentPlayer = registerEmptyAnswer();
      updateCurrentPlayerInLS(updatedCurrentPlayer);
    }
    if (currentQuestionNumber === questions.length - 1) {
      triggerResultPage();
      return;
    }

    triggerNextQuestion();
  };

  return (
    <>
      <ThemeProvider theme={breakpointTheme}>
        <ThemeProvider theme={stepperTheme}>
          <MobileStepper
            variant="dots"
            steps={questions.length}
            position="static"
            activeStep={currentQuestionNumber}
            sx={{
              width: {
                xxs: "90%",
                xs: "90%",
                sm: "60%",
                md: "40%",
                lg: "30%",
              },
            }}
            nextButton={
              <Button
                size="small"
                sx={{ color: "black" }}
                onClick={checkIfPickedAnswer}
                disabled={currentQuestionNumber === questions.length}
              >
                {currentQuestionNumber < questions.length - 1
                  ? "Nästa"
                  : "Klar"}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" sx={{ visibility: "hidden" }}></Button>
            }
          />
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};
