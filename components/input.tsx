import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  handleChange: (event: any) => void;
  labelName: string;
  placeHolder?: string;
  value: string | number;
  readOnly: boolean;
  type: string;
};

const StyledInput = styled.input`
  padding: 20px;
  outline: 0;
  border: 2px solid var(--green);
  border-radius: 4px;
  width: 150px;

  @media (max-width: 600px) {
    width: auto;
  }
`;

export default function Input({
  handleChange,
  name,
  labelName,
  placeHolder,
  value,
  readOnly,
  type,
}: Props) {
  return (
    <div>
      <label style={{ display: "block", margin: "20px 0" }} htmlFor={name}>
        {labelName}
      </label>
      <StyledInput
        id={name}
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeHolder}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
}
