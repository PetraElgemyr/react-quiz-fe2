import { useState } from "react";
import { StartView } from "./StartView";
import { QuizView } from "./QuizView";

export const MainPage = () => {
  const [showStartView, setShowStartView] = useState<boolean>(true);

  return (
    <>
      {showStartView ? (
        <StartView setShowStartView={setShowStartView} />
      ) : (
        <QuizView />
      )}
    </>
  );
};
