import Header from "../components/Header";
import poster from "/moviePoster.png";
import { Comment, MyComment } from "../components/Comment";
import { DetailContainer } from "../components/DetailContainer";
import { BoldContainer } from "../components/Comment";
import styled from "styled-components";
import ContentIcons from "../components/ContentIcons";
import YellowButton from "../components/YellowButton";
import MemoInput from "../components/MemoInput";
import { useState, useEffect } from "react";

const content = {
  img: poster,
  title: "청설",
  category: "영화",
  author: "조선호",
  description:
    "‘용준’(홍경).엄마의 등쌀에 떠밀려 억지로 도시락 배달 알바를 간 ‘용준’은...",
  genre: "로맨스, 드라마",
  emotion: "설렘, 기쁨",
};

const comments = [
  {
    memberName: "카리나",
    memo: "sample",
  },
  // ... other comments
];

const DetailPage = () => {
  const [memoInput, setMemoInput] = useState(false);
  const [commentOfMine, setCommentOfMine] = useState({ memo: "" });

  // Function to fetch my memo from the backend
  const fetchMyMemo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage
      const response = await fetch("/pickle/memo?contentId=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Add accessToken in headers
        },
      });

      if (!response.ok) throw new Error("Failed to fetch my memo.");

      const data = await response.json();
      setCommentOfMine({ memo: data.myMemo }); // Update commentOfMine with myMemo
    } catch (error) {
      console.error("Error fetching my memo:", error);
    }
  };

  // Call fetchMyMemo when the component mounts
  useEffect(() => {
    fetchMyMemo();
  }, []);

  const handleInputButton = () => {
    setMemoInput(true);
  };

  const handleSaveMemo = (newMemo) => {
    setCommentOfMine({ memo: newMemo });
    setMemoInput(false); // Hide MemoInput after saving
  };

  return (
    <DetailPageContainer>
      <Header />
      <DetailContainer>
        <ContentIcons />
        <ContentContainer>
          <PosterContainer src={content.img} />
          <div>
            {Object.entries(content).map(
              ([key, value], idx) =>
                key !== "img" && (
                  <TextContainer key={idx}>
                    {key === "title" ? (
                      <TitleContainer>{value}</TitleContainer>
                    ) : (
                      value
                    )}
                  </TextContainer>
                )
            )}
          </div>
        </ContentContainer>
        <BoldContainer>다른 사람들의 메모</BoldContainer>
        <div>
          {comments.length ? (
            comments.map((comment, index) => (
              <Comment
                key={index}
                memberName={comment.memberName}
                memo={comment.memo}
              />
            ))
          ) : (
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              아직 평가가 없어요
            </div>
          )}
        </div>
        <BoldContainer>나의 메모</BoldContainer>
        <div>
          {commentOfMine.memo ? (
            <MyComment myMemo={commentOfMine.memo} />
          ) : memoInput ? (
            <MemoInput onSave={handleSaveMemo} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: "25px" }}>
                아직 메모를 남기지 않으셨어요
              </div>
              <YellowButton
                content={"메모 남기기"}
                onClick={handleInputButton}
              />
            </div>
          )}
        </div>
      </DetailContainer>
    </DetailPageContainer>
  );
};

export default DetailPage;

// Styled components
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const TextContainer = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  color: #000000;
`;
const TitleContainer = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const PosterContainer = styled.img`
  width: 265px;
  height: 365px;
`;
const DetailPageContainer = styled.div`
  background-color: #007c5f;
  min-height: 100vh;
`;
