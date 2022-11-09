import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";

function ChatContainer({ currentChat, currentUser, handleClick }) {
  console.log("currentChat", currentChat);
  console.log("currentUser", currentUser);
  //create a function to get all messages
  const getMessages = async () => {
    const response = await fetch(`${process.env.REACT_APP_MESSAGE_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };
  const generateMessageId = async () => {
    const messages = await getMessages();
    const largestMessageId = messages.messages.reduce((acc, message) => {
      if (message.messageId > acc) {
        acc = message.messageId;
      }
      return acc;
    }, 0);
    return largestMessageId + 1;
  };

  const handleSendMessage = async (message) => {
    const response = await fetch(`${process.env.REACT_APP_MESSAGE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId: await generateMessageId(),
        message,
        sender: currentUser.userId,
        receiver: currentChat.userId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`${currentChat.avatar}`} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.userName}</h3>
          </div>
        </div>
        <Logout handleClick={handleClick} />
      </div>
      <div className="chat-messages"></div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: white;
          margin: 0;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
