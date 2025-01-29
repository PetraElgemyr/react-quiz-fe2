import styled from "styled-components";
import { devices } from "./Variables/Devices";

interface IGoldenBallContainer {
  width: string;
}

export const GoldenBallContainer = styled.div<IGoldenBallContainer>`
  width: ${(props: IGoldenBallContainer) => props.width};
  padding: 0;
  margin: 0;

  @media screen and (${devices.tablet}) {
    width: 15%;
  }

  @media screen and (${devices.laptop}) {
    width: 12%;
  }

  @media screen and (${devices.laptopL}) {
    width: 8%;
  }
`;

// export const GoldenBallQuizContainer = styled(GoldenBallStartContainer)`
//   width: 20%;
// `;
