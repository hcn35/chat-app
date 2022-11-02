import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/chat.svg";

function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  console.log(contacts);

  return (
    <Container>
      <div className="brand">
        <h3>chat app</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img src={contact.avatar} alt="avatar" />
            </div>
            <div className="username">
              <h4>{contact.userName}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="current-user">
        {/* <div className="avatar">
          <img src={contacts[0].avatar} alt="avatar" />
        </div> */}
        <div className="username">
          <h3>Hiep Nguyen</h3>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #337785;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    img {
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #80aab3;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      // background-color: #80aab3;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h4 {
          color: white;
        }
      }
    }
    .contact:hover {
      background-color: #80aab3;
    }
    .selected {
      background-color: #80aab3;
    }
  }
  .current-user {
    background-color: #2e6b78;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h3 {
        color: #fff;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
