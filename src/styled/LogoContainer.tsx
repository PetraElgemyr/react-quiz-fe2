import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const LogoContainer = styled.div`
  width: 90%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 3%;

  @media screen and (${devices.mobileL}) {
    width: 70%;
  }

  @media screen and (${devices.tablet}) {
    width: 55%;
  }

  @media screen and (${devices.laptop}) {
    width: 50%;
  }

  @media screen and (${devices.laptopL}) {
    width: 40%;
  }

  @media screen and (${devices.fourK}) {
    width: 35%;
  }
`;
