import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Register.css";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("You have submitted the form.");
  };

  return (
    <Container id="main-container" className="d-grid h-100">
      <Form
        id="register-form"
        className="w-100 p-4 shadow"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h1 className="text-center mb-4">Register</h1>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstname">
            <Form.Control type="text" placeholder="Firstname" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastname">
            <Form.Control type="text" placeholder="Lastname" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formGridConfirmedPassword">
          <Form.Control type="password" placeholder="Confirmed Password" />
        </Form.Group>

        <Button className="w-100" type="submit">
          Create User
        </Button>
        <div className="text-center text-muted">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
