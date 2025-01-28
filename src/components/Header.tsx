import { HeaderWrapper } from "../styled/HeaderWrapper";
import logo from "../logo-smartare-an-ph-png.png";
import desktopLogo from "../ph-desktop.png";
import { LogoContainer } from "../styled/LogoContainer";
import { useNavigate } from "react-router-dom";
import { LogoDesktop, LogoMobile } from "../styled/Images";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrapper>
        <LogoContainer onClick={() => navigate("/")}>
          <LogoMobile src={logo} alt="Smartare än en ph-deltagare logo" />

          <LogoDesktop
            src={desktopLogo}
            alt="Smartare än en ph-deltagare logo"
          />
        </LogoContainer>
      </HeaderWrapper>
    </>
  );
};
