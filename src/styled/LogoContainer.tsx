import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const LogoContainer = styled.div`
  width: 90%;
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 0 3% 3% 4%;

  &:hover {
    cursor: pointer;
  }

  @media screen and (${devices.mobileL}) {
    width: 80%;
  }

  @media screen and (${devices.tablet}) {
    padding: 0 3% 1% 4%;
  }
`;
