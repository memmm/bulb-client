import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {}
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };
  render() {
    const { errors, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="handle"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        {errors.general && (
          <Form.Text className="text-muted">{errors.general}</Form.Text>
        )}

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me logged in (TODO)" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
        <small>
          Already have an account? <Link to="/login">Log in!</Link>
        </small>
      </Form>
    );
  }
}

export default signup;
