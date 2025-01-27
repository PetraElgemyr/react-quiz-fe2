import { Headline } from "../styled/Headline";
import { HighScoreText } from "../styled/HighscoreText";
import { useAppContext } from "./hooks/useAppContext";

export const HighScoreList = () => {
  const { players } = useAppContext();

  return (
    <>
      <Headline>Topplista</Headline>
      {players.length > 0 &&
        players.map((p, i) => (
          <div key={`${p.name}-${i}`}>
            <HighScoreText isbold={"true"}>{p.name}</HighScoreText>
            <HighScoreText isbold={"false"}>- {p.score} poäng</HighScoreText>
          </div>
        ))}
    </>
  );
};
