import styled from "styled-components";
import { flexRowSpaceBetween } from "styles/flex";
import { ARROW_LEFT_ICON, USER_CIRCLE_ICON } from "#assets/icons";
import { useNavigate } from "react-router-dom";
import { COLOR } from "styles/color";
import { fontLarge } from "styles/font";
const HeaderWrapper = styled.div`
    ${flexRowSpaceBetween};
    padding: 16px 8px;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    p {
        ${fontLarge(COLOR.BLACK, 400)}
    }
    img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    div {
        width: 24px;
        height: 24px;
    }
`;

interface HeaderProps {
    loggedIn?: boolean;
    text: string;
}

const Header = ({ loggedIn, text }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <HeaderWrapper>
            <img src={ARROW_LEFT_ICON} onClick={() => navigate(-1)} />
            <p>{text}</p>
            {loggedIn ? <img src={USER_CIRCLE_ICON} onClick={() => navigate("/mypage")} /> : <div />}
        </HeaderWrapper>
    );
};

export default Header;
