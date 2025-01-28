import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const GoldenBallContainer = styled.div`
  width: 35%;
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
