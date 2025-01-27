import { useAppContext } from "./hooks/useAppContext";

export const HighScoreList = () => {
  const { players } = useAppContext();

  return (
    <>
      <h4>Rekord</h4>
      {players.length > 0 &&
        players.map((p, i) => (
          <div key={`${p.name}-${i}`}>
            <p>
              <span>
                {p.name} - {p.score} poäng
              </span>
            </p>
          </div>
        ))}
    </>
  );
};
