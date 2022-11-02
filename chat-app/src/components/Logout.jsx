import React from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

function Logout({ handleClick }) {
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #7a969b;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #6b8388;
  }
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
