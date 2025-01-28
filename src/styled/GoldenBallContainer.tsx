import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const GoldenBallContainer = styled.div`
  width: 35%;

  @media screen and (${devices.tablet}) {
    width: 20%;
  }

  @media screen and (${devices.laptop}) {
    width: 15%;
  }

  @media screen and (${devices.laptopL}) {
    width: 10%;
  }
`;
