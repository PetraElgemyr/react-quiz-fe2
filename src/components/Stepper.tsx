import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";

interface IStepperProps {
  triggerNextQuestion: () => void;
  registerEmptyAnswer: () => void;
}

export const Stepper = ({
  triggerNextQuestion,
  registerEmptyAnswer,
}: IStepperProps) => {
  const { questions, currentQuestionNumber, currentPlayer } = useAppContext();

  const checkIfPickedAnswer = () => {
    if (
      !currentPlayer.answers.find(
        (a) => a.questionId === currentQuestionNumber + 1
      )?.answer
    ) {
      registerEmptyAnswer();
    }
    triggerNextQuestion();
  };

  return (
    <>
      <MobileStepper
        variant="dots"
        steps={questions.length}
        position="static"
        activeStep={currentQuestionNumber}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={checkIfPickedAnswer}
            disabled={currentQuestionNumber === questions.length}
          >
            {currentQuestionNumber < questions.length - 1 ? "Nästa" : "Klar"}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => {}} disabled={true}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </>
  );
};
