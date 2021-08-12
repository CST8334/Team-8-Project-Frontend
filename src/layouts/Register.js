/**
*
* Coded by Abdulkadir Atay for CST8334 - Software Development Project
*
* This class is responsible to create the Sign Up page user interface
* and sign up with genuine username, password and invitation code
*
*/
import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from "react-router-dom";

/**
 * React class component that is related to the register screen
 */
class Register extends React.Component {

    /**
     * Constructor for the component, used to initialize state and binding the event handler methods
     * @param {*} props The arguments passed to the component
     */
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            totalReactPackages: null,
            emailInput: '',
            passwordInput: '',
            codeInput: '',
            showModal: false,
            showError: false,
            errorMsg: '',
            socialAccountType: null,
            socialAccountName: ''
        };
    }

    /**
     * Switches the modals display state (either show or hide)
     * @param {boolean} showModal pass true to show the modal and false to hide it
     */
    changeModalState(showModal) {
        const stateCpy = { ...this.state };
        stateCpy.showModal = showModal;
        this.setState(stateCpy);
    }

    /**
     * Called when any form input in the register form is changed (by the user tying or removing text).
     * Whenever the form is changed any errors are hidden.
     * @param {Event} event the change event object
     * @param {string} fieldToUpdate the string name of the field in the state which is bound to the value of the input
     */
    handleFormChange(event, fieldToUpdate) {
        const stateCpy = { ...this.state };
        stateCpy.showError = false;
        stateCpy[fieldToUpdate] = event.target.value
        this.setState(stateCpy);
    }

    /**
     * Called when the submit button is pressed. It will check all inputs and either display an error message or call the registerUser method
     */
    onSubmit() {
        if (!this.state.emailInput || !this.state.passwordInput || !this.state.codeInput || !this.state.socialAccountType) {
            const stateCpy = { ...this.state };
            stateCpy.showError = true;
            stateCpy.errorMsg = 'You must enter a value for the following: Email, Password, Social Media Type and Invitation Code';
            this.setState(stateCpy);
        } else if (this.state.socialAccountType !== 'none' && !this.state.socialAccountName) {
            const stateCpy = { ...this.state };
            stateCpy.showError = true;
            stateCpy.errorMsg = 'You must make enter a social media account name';
            this.setState(stateCpy);
        } else { // If everything was filled out send the post request
            this.registerUser();
        }
    }

    /**
     * Calls the new-creator POST endpoint to create a new user, handles error conditions as well
     */
    registerUser() {
        const postBody = {
            "user_type": "creator",
            "email": this.state.emailInput,
            "password": this.state.passwordInput,
            "organization_id": 333,
            "user_role": "user",
            "description": "A brand new user!"
        };
        // Set social media account information
        if (this.state.socialAccountType === 'tiktok') postBody.tiktokId = this.state.socialAccountName
        else if (this.state.socialAccountType === 'youtube') postBody.googleEmail = this.state.socialAccountName
        else if (this.state.socialAccountType === 'instagram') postBody.instagramName = this.state.socialAccountName
        // Now send the request
        axios.post(`http://localhost:8000/new-creator/${this.state.codeInput}/`, postBody)
            .then((response) => {
                console.log(response);
                // Store email and token in local storage
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('token', response.data.token);
                this.changeModalState(true);
            }, (error) => {
                const stateCpy = { ...this.state };
                stateCpy.showError = true;
                if (error.response.data.error_message) {
                    stateCpy.errorMsg = error.response.data.error_message;
                } else if (error.response.data.email) {
                    stateCpy.errorMsg = error.response.data.email[0];
                } else {
                    stateCpy.errorMsg = 'Unknown error occurred';
                }
                console.error(error.response);
                this.setState(stateCpy);
            });
    }

    /**
     * Called whenever the view needs to be rendered or updated, contains all the html that
     * make up the visual component of the register screen
     * @returns a jsx element defining the view of the component
     */
    render() {
        return (
            <>
                <div
                    className="card"
                    style={{
                        width: "50%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10%",
                        backgroundColor: "#A1AFE3",
                        boxShadow: "1px 1px darkgray",
                    }}
                >
                    <div className="card-body">
                        <h4 style={{ textAlign: "center" }}>Sign Up</h4>
                        <label htmlFor="username" className="form-label" style={{ color: "black", fontWeight: 'bold' }}>
                            Email
                        </label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={this.state.emailInput} onChange={(e) => this.handleFormChange(e, 'emailInput')}
                            />
                        </div>

                        <label htmlFor="password" className="form-label" style={{ color: "black", fontWeight: 'bold' }}>
                            Password
                        </label>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={this.state.passwordInput} onChange={(e) => this.handleFormChange(e, 'passwordInput')}
                            />
                        </div>

                        <div
                            className="mt-3 mb-3"
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "fit-content",
                            }}
                        >
                            <h6 style={{ textAlign: 'center' }}>Select Your Social Media Account</h6>
                            <div className="form-check form-check-inline mt-2" onChange={(e) => this.handleFormChange(e, 'socialAccountType')}>
                                <label className="form-check-label mr-1" htmlFor="inlineRadio1" style={{ color: "black", fontSize: '14px' }}>
                                    <img
                                        src={require("layouts/icons8-select-none-64.png").default}
                                        style={{ width: 40, height: 40 }}
                                    />
                                    None
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="none"
                                />
                                <label className="form-check-label mr-1" htmlFor="inlineRadio2" style={{ color: "black", fontSize: '14px' }}>
                                    <img
                                        src={require("layouts/icons8-tiktok-64.png").default}
                                        style={{ width: 40, height: 40 }}
                                    />
                                    TikTok
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="tiktok"
                                />
                                <label className="form-check-label mr-1" htmlFor="inlineRadio3" style={{ color: "black", fontSize: '14px' }}>
                                    <img
                                        src={require("layouts/icons8-youtube-48.png").default}
                                        style={{ width: 40, height: 40 }}
                                    />
                                    YouTube
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio3"
                                    value="youtube"
                                />
                                <label className="form-check-label mr-1" htmlFor="inlineRadio4" style={{ color: "black", fontSize: '14px' }}>
                                    <img
                                        src={require("layouts/icons8-instagram-48.png").default}
                                        style={{ width: 40, height: 40 }}
                                    />
                                    Instagram
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio4"
                                    value="instagram"
                                />
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Social Media Account
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your social media account here"
                                value={this.state.socialAccountName} onChange={(e) => this.handleFormChange(e, 'socialAccountName')}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Invitation Code
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your invitation code here"
                                value={this.state.codeInput} onChange={(e) => this.handleFormChange(e, 'codeInput')}
                            />
                        </div>
                        <div className="d-flex mt-3">
                            {
                                this.state.showError &&
                                <div className="alert alert-danger mr-2" role="alert" style={{ textAlign: 'center', flexGrow: '1' }}>
                                    <i className="fas fa-exclamation"></i>
                                    {this.state.errorMsg}
                                </div>
                            }

                            <div style={{ marginLeft: "auto" }}>
                                <Button variant="warning" style={{ color: "black", backgroundColor: '#ffc107', border: '#ffc107' }} onClick={() => this.onSubmit()}>
                                    <i className="fas fa-user-plus mr-2"></i>
                                    Save
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.closeModalAndSignIn(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thanks! your account has been successfully created.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You can now use this account to login, click ok to be automatically signed in
                    </Modal.Body>
                    <Modal.Footer>
                        <NavLink to="/admin/dashboard">
                            <button type="button" className="btn btn-primary">
                                Ok
                            </button>
                        </NavLink>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Register;