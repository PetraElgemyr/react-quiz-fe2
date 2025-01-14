import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Quizdags!</h1>
      <button onClick={() => navigate("/game")}>Starta quiz</button>
    </>
  );
};
