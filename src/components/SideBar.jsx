import styled from "styled-components";
import { BoldContainer } from "./Comment";
import HistoryItem from "./HistoryItem";
import { LuMenu } from "react-icons/lu";

const member = {
  nickName: "김정은",
  histories: [
    { contentId: 1, title: "로봇 드림", createdAt: "2024-11-08" },
    { contentId: 2, title: "복수는 나의 것", createdAt: "2024-11-08" },
    { contentId: 3, title: "헤어질 결심", createdAt: "2024-11-08" },
  ],
};

const SideBar = ({ onClose }) => {
  return (
    <SideBarContainer>
      <OpendLuMenu>
        <LuMenu size={"70px"} onClick={onClose} />
      </OpendLuMenu>

      <BoldContainer
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        {`안녕하세요 ${member.nickName}님!`}
      </BoldContainer>
      <ContentTitle>내가 추천받은 콘텐츠들</ContentTitle>
      <HistoryList>
        {member.histories.map((history) => (
          <HistoryItem key={history.contentId} history={history} />
        ))}
      </HistoryList>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  position: absolute;
  width: 20%;
  height: 98vh;
  left: 0;
  z-index: 10;
  padding-top: 70px;
  top: 0px;
  background: #007c5f;
`;

const ContentTitle = styled.div`
  text-align: center;
  color: #e4ff37;
  margin-bottom: 10px;
`;

const HistoryList = styled.div`
  padding: 0 10px;
`;

const OpendLuMenu = styled.div`
  position: absolute;
  top: -5px;
  right: 10px;
`;
