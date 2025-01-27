import styled from "styled-components";
import { devices } from "./Variables/Devices";

export const AnswersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0;
  padding: 5%;

  @media screen and (${devices.laptop}) {
    gap: 30px;
  }
`;
