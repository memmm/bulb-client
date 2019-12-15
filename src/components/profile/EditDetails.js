import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// Bootstrap Stuff
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    return (
      <Fragment>
        <Button tip="Edit Details" onClick={this.handleOpen}>
          Edit details
        </Button>
        <Modal.Dialog open={this.state.open} onClose={this.handleClose}>
          <Modal.Title>Edit your details</Modal.Title>
          <Modal.Body>
            <Form>
              <Form.Control
                name="bio"
                tpye="text"
                label="Bio"
                rows="3"
                placeholder="A short bio about yourself"
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <Form.Control
                name="website"
                tpye="text"
                label="Website"
                placeholder="Your personal/professinal website"
                value={this.state.website}
                onChange={this.handleChange}
              />
              <Form.Control
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
