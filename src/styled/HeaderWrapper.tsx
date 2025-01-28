import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2%;
  padding-top: 4%;

  @media screen and (${devices.mobileL}) {
    padding: 1%;
    padding-top: 3%;
  }
`;
