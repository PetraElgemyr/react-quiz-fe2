import styled from "styled-components";
import { devices } from "./Variables/Devices";

interface IHighScoreText {
  isbold: string;
}

export const HighScoreText = styled.span<IHighScoreText>`
  font-size: 1rem;
  font-weight: ${(props) => props.isbold === "true" && "bold"};

  @media screen and (${devices.tablet}) {
    font-size: 1.2rem;
  }
`;
