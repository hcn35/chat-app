import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const [state, setState] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null,
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const validatation = (userData) => {
    const copyUserData = { ...userData };
    if (
      copyUserData.firstname &&
      copyUserData.lastname &&
      copyUserData.email &&
      copyUserData.password &&
      copyUserData.confirmPassword &&
      copyUserData.errors.firstname === "" &&
      copyUserData.errors.lastname === "" &&
      copyUserData.errors.email === "" &&
      copyUserData.errors.password === "" &&
      copyUserData.errors.confirmPassword === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatation(state)) {
      alert("Valid Form");
    } else {
      toast.error("Invalid Form", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
        hideProgressBar: true,
      });
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "firstname":
        errors.firstname = value.length < 1 ? "At least 1 characters!" : "";
        break;
      case "lastname":
        errors.lastname = value.length < 1 ? "At least 1 characters!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Invalid Email!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Must be at least 8 characters!" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value !== state.password ? "Passwords do not match!" : "";
        break;
      default:
        break;
    }
    setState({ ...state, errors, [name]: value });
  };

  const { errors } = state;

  return (
    <>
      <Container id="main-container" className="d-grid h-100">
        <Form
          id="register-form"
          className="w-100 p-4 shadow"
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="text-center mb-4">Register</h1>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstname">
              <Form.Control
                name="firstname"
                type="text"
                placeholder="Firstname"
                onChange={(event) => handleChange(event)}
              />
              {errors.firstname.length > 0 && (
                <span className="error">{errors.firstname}</span>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Lastname"
                onChange={(event) => handleChange(event)}
              />
              {errors.lastname.length > 0 && (
                <span className="error">{errors.lastname}</span>
              )}
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              onChange={(event) => handleChange(event)}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPassword">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={(event) => handleChange(event)}
            />
            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridConfirmedPassword">
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirmed Password"
              onChange={(event) => handleChange(event)}
            />
            {errors.confirmPassword.length > 0 && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </Form.Group>

          <Button className="w-100" type="submit">
            Create User
          </Button>
          <div className="text-center text-muted">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Register;
