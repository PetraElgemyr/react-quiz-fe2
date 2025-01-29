import styled from "styled-components";
import { Colors } from "./Variables/Colors";

export const Headline = styled.h1`
  font-weight: bold;
  color: ${Colors.secondaryGold};
`;

export const CurrentResultHeadline = styled.h2`
  margin: 0;
  padding: 4% 0 2% 0;
  font-family: Georgia, serif;
  color: ${Colors.secondaryGold};
`;

export const ResultText = styled.h3`
  margin: 0;
  padding: 1% 0 2% 0;
  font-weight: normal;
  font-family: Georgia, serif;
  color: ${Colors.secondaryGold};
`;

export const GoldenO = styled.img`
  height: 1.2rem;
`;
