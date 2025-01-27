import { HeaderWrapper } from "../styled/HeaderWrapper";
import logo from "../logo-smartare-an-ph-png.png";
import { LogoContainer } from "../styled/LogoContainer";
import { LogoImg } from "../styled/LogoImg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrapper>
        <LogoContainer onClick={() => navigate("/")}>
          <LogoImg src={logo} alt="Smartare än en ph-deltagare logo" />
        </LogoContainer>
      </HeaderWrapper>
    </>
  );
};
