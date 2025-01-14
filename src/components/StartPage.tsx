import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Quizdags!</h1>
      <h3>Är du smartaren än en ph-deltagare? Dags att ta reda på det!</h3>
      <button onClick={() => navigate("/game")}>Starta quiz</button>
    </>
  );
};
