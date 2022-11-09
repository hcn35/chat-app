import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat({ signOutFunction, userInfo }) {
  const navigate = useNavigate();
  const [dbUserInfo, setdbUserInfo] = useState({});
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  const getUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_USER_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  useEffect(() => {
    getUsers().then((data) => {
      setContacts(data.users);
    });
  }, []);

  console.log("contacts", contacts?.at(1)?.userId);
  console.log("userInfo", userInfo.attributes.sub);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_USER_ENDPOINT}` +
        `?userId=${userInfo.attributes.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setdbUserInfo(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (Object.keys(dbUserInfo).length !== 0 && !dbUserInfo.userName) {
    navigate("/profile");
  }

  const logOut = () => {
    signOutFunction();
    navigate("/");
  };
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome userName={dbUserInfo.userName} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={dbUserInfo}
              handleClick={logOut}
            />
          )}
        </div>
      </Container>
    </>
  );
  // return <button onClick={logOut}>Sign Out</button>;
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #e6eef0;
  .container {
    padding: 0;
    height: 85vh;
    width: 85vw;
    background-color: #99bbc2;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
