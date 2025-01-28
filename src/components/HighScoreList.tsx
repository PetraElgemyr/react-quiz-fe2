import { Headline } from "../styled/Headline";
import { HighScoreText } from "../styled/HighscoreText";
import { useAppContext } from "./hooks/useAppContext";
import "./scss/highscore.scss";

export const HighScoreList = () => {
  const { players } = useAppContext();

  return (
    <>
      <Headline>Topp 5</Headline>
      {players.length > 0 &&
        players
          .sort((a, b) => b.score - a.score)
          .map((p, i) => {
            if (i <= 4) {
              return (
                <div className="list-container" key={`${p.name}-${i}`}>
                  <HighScoreText isbold={"true"}>{p.name}</HighScoreText>
                  <HighScoreText isbold={"false"}>
                    - {p.score} poäng
                  </HighScoreText>
                </div>
              );
            }
          })}
    </>
  );
};
