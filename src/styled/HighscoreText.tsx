import styled from "styled-components";
import { devices } from "./Variables/Devices";

interface IHighScoreText {
  bold: boolean;
}

export const HighScoreText = styled.span<IHighScoreText>`
  font-size: 1rem;
  font-weight: ${({ bold }) => bold && "bold"};

  @media screen and (${devices.tablet}) {
    font-size: 1.2rem;
  }
`;
