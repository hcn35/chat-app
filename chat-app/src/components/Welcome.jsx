import React from "react";
import styled from "styled-components";

function Welcome({ userName }) {
  return (
    <Container>
      <img
        src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/master/public/src/assets/robot.gif"
        alt="robitGif"
      />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #3d4b4e;
  }
`;

export default Welcome;
