import { GoldenO, Headline } from "../styled/Headline";
import { HighScoreText } from "../styled/HighscoreText";
import { useAppContext } from "./hooks/useAppContext";
import "./scss/highscore.scss";
import goldenBall from "../golden-ball.png";

export const HighScoreList = () => {
  const { players, currentPlayer } = useAppContext();

  return (
    <>
      <Headline>
        T
        <GoldenO src={goldenBall} alt="golden-ball" />
        pp 5
      </Headline>
      {players.length > 0 &&
        players
          .sort((a, b) => b.score - a.score)
          .map((p, i) => {
            if (i <= 4) {
              return (
                <div className="list-container" key={`${p.name}-${i}`}>
                  <HighScoreText
                    isbold={currentPlayer.name === p.name ? "true" : ""}
                  >
                    {`${i + 1}. ${p.name}`}
                  </HighScoreText>
                  <HighScoreText
                    isbold={currentPlayer.name === p.name ? "true" : ""}
                  >
                    {` - ${p.score}`} poäng
                  </HighScoreText>
                </div>
              );
            }
          })}
    </>
  );
};
