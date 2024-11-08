import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeaderLine = styled.div`
  width: 100%;
  height: 60px;
  background: #e4ff37;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Navigator = styled.a`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  text-decoration-line: none;
  &:hover {
    text-decoration-line: underline;
  }
`;

const NavigatorContainer = styled.div`
  position: absolute;
  right: 20px;
`;

const Header = ({ noBackKey }) => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderLine>
        {noBackKey || (
            <IoMdArrowRoundBack
              size="50"
              onClick={() => {
                navigate(-1);
              }}
            />
        )}
        <NavigatorContainer>
          <Navigator
            onClick={() => {
              navigate("/gallery");
            }}
          >
            GALLERY/
          </Navigator>
          <Navigator
            onClick={() => {
              navigate("/");
            }}
          >
            LOGOUT
          </Navigator>
        </NavigatorContainer>
      </HeaderLine>
    </>
  );
};

export default Header;
