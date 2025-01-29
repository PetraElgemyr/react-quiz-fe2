import styled from "styled-components";
import { devices } from "./Variables/Devices";
import { Colors } from "./Variables/Colors";

interface IHighScoreText {
  bold: string;
}

export const HighScoreText = styled.span<IHighScoreText>`
  font-size: 1rem;
  font-weight: ${(props: IHighScoreText) => props.bold};
  color: ${Colors.secondaryGold};

  @media screen and (${devices.tablet}) {
    font-size: 1.2rem;
  }
`;
