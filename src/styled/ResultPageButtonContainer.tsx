import styled from "styled-components";
import { RowCentered } from "./Common/Common";
import { devices } from "./Variables/Devices";

export const ResultPageButtonContainer = styled(RowCentered)`
  width: 100%;
  gap: 10px;
  padding: 2%;

  @media screen and (${devices.tablet}) {
    gap: 20px;
  }
`;
