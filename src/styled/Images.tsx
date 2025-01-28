import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const StyledImg = styled.img`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const LogoMobile = styled(StyledImg)`
  @media screen and (${devices.tablet}) {
    display: none;
  }
`;

export const LogoDesktop = styled(StyledImg)`
  display: none;

  @media screen and (${devices.tablet}) {
    display: unset;
  }
`;
