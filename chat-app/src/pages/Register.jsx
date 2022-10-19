import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("You have submitted the form.");
  };

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter a name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
        <Form.Label>Confirmed Password</Form.Label>
        <Form.Control type="password" placeholder="Enter confirmed password" />
      </Form.Group>
      <Button type="submit">Create User</Button>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Form>
  );
}

export default Register;
