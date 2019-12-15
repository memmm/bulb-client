import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const {
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Form className="w-50" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            name="email"
            error={errors.email ? true : false}
            value={this.state.email}
            placeholder="Enter email"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            error={errors.password ? true : false}
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>

        {errors.general && (
          <Form.Text className="text-muted">{errors.general}</Form.Text>
        )}

        <Form.Group>
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
          Don't have an account yet? <Link to="/signup">Sign up!</Link>
        </small>
      </Form>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(login);
