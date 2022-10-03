import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

const SearchBar = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 40px;
  align-items: center;

  @media (max-width: 600px) {
    display: block;
  }
`;

const StyledInput = styled(DebounceInput)`
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  margin-top: 20px;
  align-self: end;
  grid-column-start: 2;
`;

const StyledInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-self: end;
  grid-column-start: 2;
`;

const CenterTitle = styled.h2`
  text-align: center;
`;

export { SearchBar, StyledInput, StyledInputContainer, CenterTitle };
