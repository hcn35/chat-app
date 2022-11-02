import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Profile({ signOutFunction, userInfo }) {
  const navigate = useNavigate();
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    hideProgressBar: true,
  };
  const generateRandomAvatars = () => {
    const avatars = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 10000);
      avatars.push(
        `https://avatars.dicebear.com/api/avataaars/${randomNumber}.svg`
      );
    }
    return avatars;
  };
  const [userName, setUserName] = useState("");
  const [avatars, setAvatars] = useState(generateRandomAvatars());
  const [selectedAvatar, setSelectedAvatar] = useState();

  const updateUserName = async () => {
    const response = await fetch(`${process.env.REACT_APP_USER_ENDPOINT}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userInfo.attributes.sub,
        updateKey: "userName",
        updateValue: userName,
      }),
    });
    return response.json();
  };

  const updateAvatar = async () => {
    const response = await fetch(`${process.env.REACT_APP_USER_ENDPOINT}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userInfo.attributes.sub,
        updateKey: "avatar",
        updateValue: avatars[selectedAvatar],
      }),
    });
    return response.json();
  };

  useEffect(() => {
    setAvatars(generateRandomAvatars());
  }, []);

  const createProfile = (event) => {
    event.preventDefault();
    if (userName === "") {
      toast.error("Please create a user name!", toastOptions);
    } else if (selectedAvatar === undefined) {
      toast.error("Please select an avatar!", toastOptions);
    } else {
      updateUserName()
        .then((data) => {
          updateAvatar()
            .then((data) => {
              toast.success("Profile created!", toastOptions);
            })
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              toast.error("Error creating profile. Try again!", toastOptions);
            });
        })
        .catch((error) => {
          toast.error("Error creating profile. Try again!", toastOptions);
        });
    }
  };

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <>
      {avatars.length === 0 ? (
        <Spinner animation="border" />
      ) : (
        <Container>
          <div className="title-container">
            <h1>Create a user name</h1>
          </div>
          <div className="userName">
            <Form.Control
              type="text"
              placeholder="User Name"
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="title-container">
            <h1>Pick an profile avatar</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={avatar} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={createProfile} className="submit-btn">
            Save Profile
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #e6eef0;
  height: 100vh;
  width: 100vw;

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4d8894;
    }
  }
  .submit-btn {
    background-color: #4d8894;
    color: white;
    padding: 1rem 5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #1a6675;
    }
  }
`;

export default Profile;

// (
//   avatars.map((value, index) => {
//     return (
//       <img
//         src={value}
//         key={index}
//         onClick={() => setSelectedAvatar(value)}
//         alt="avatar"
//       />
//     );
//   })
// )
