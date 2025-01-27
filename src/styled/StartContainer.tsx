import styled from "styled-components";
import { ColCentered } from "./Common/Common";
import { devices } from "./Variables/Devices";

export const StartContainer = styled(ColCentered)`
  padding: 0 5% 0 5%;
  width: 90%;
  text-align: center;

  @media screen and (${devices.mobileL}) {
    width: 80%;
  }

  @media screen and (${devices.tablet}) {
    width: 60%;
  }
`;

export const RegistrationContainer = styled(ColCentered)`
  padding: 0 5% 0 5%;
  width: 90%;
  gap: 30px;

  @media screen and (${devices.mobileL}) {
    width: 80%;
  }

  @media screen and (${devices.tablet}) {
    width: 60%;
  }
`;
