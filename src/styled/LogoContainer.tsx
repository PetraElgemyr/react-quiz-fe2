import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const LogoContainer = styled.div`
  width: 90%;
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 1% 3% 3% 4%;

  &:hover {
    cursor: pointer;
  }

  @media screen and (${devices.mobileL}) {
    width: 70%;
  }

  // @media screen and (${devices.tablet}) {
  //   width: 50%;
  //   padding: 0 1% 4% 2%;
  // }

  @media screen and (${devices.tablet}) {
    width: 100%;
    padding: 0.5% 3% 2% 4%;
  }

  // @media screen and (${devices.laptop}) {
  //   width: 100%;
  //   padding: 0.5% 3% 2% 4%;
  // }
`;
