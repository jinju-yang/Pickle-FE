import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.input`
  padding: 10px 40px;
  width: 50%;
  height: 45px;
  border: 1px solid #007c5f;
  /* gray/gray_F4F4F4 */
  border-radius: 20px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #007c5f inset;
  }
`;

const FaSearchContainer = styled(FaSearch)`
  position: absolute;
  margin-left: 12px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  left: 500px;
  position: relative;
  top: 10px;
  
`;

const Search = () => {
  return (
    <SearchBarContainer>
      <SearchContainer placeholder="키워드로 작품 검색" />
      <FaSearchContainer>
        <FaSearch />
      </FaSearchContainer>
    </SearchBarContainer>
  );
};

export default Search;
