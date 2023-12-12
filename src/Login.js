import './login.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
let mode = 0;
export default function Login() {
    const [modalShow, setModalShow] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const userCredentials = () => {
        let userData = localStorage.getItem('userData')
        userData = eval(userData)
        if (!userData) {
            userData = []
        }
        const input = document.getElementById('form-input').value.trim()
        const password = document.getElementById('form-pass').value.trim()
        if (input == "" && password == "") {
            setResponseMessage("Enter Username and Password!")
            setModalShow(true)
        }
        else if (input == "") {
            setResponseMessage("Enter your Username!")
            setModalShow(true)
        }
        else if (password == "") {
            setResponseMessage("Enter your Password!")
            setModalShow(true)
        }
        else {
            for (let ele of userData) {
                if (ele.name == input && ele.password == password) {
                    mode = 1
                    setResponseMessage("Login Successful!")
                    setModalShow(true)
                }
            }
            if (mode == 0) {
                setResponseMessage("Invalid Username or Password")
                setModalShow(true)
            }
        }
    }

    return (
        <div id='logindiv'>
            <div id="loginform">
                <h2 id="headerTitle">Login</h2>
                <div className="row">
                    <label>Username</label>
                    <input type='text' id='form-input' placeholder='Enter your Username' />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input type='password' id='form-pass' placeholder='Enter your Password' />
                </div>
                <div id="button" className="row">
                    <button onClick={userCredentials}>Login</button>
                </div>
                <div id="alternativeLogin">
                    <label>Don't have an account? </label>
                    <a href='/signup' id='href'> Signup</a>
                    <div id="iconGroup"></div>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow} value={responseMessage} mode={mode}
                onHide={() => {
                    if (mode == 1) {
                        localStorage.setItem("login",JSON.stringify(true))
                        window.location.href = "/dashboard"
                    }
                    setModalShow(false)
                }
                }
            />
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span id='title-msg'>{props.mode ? "Message" : "Error"}</span>&nbsp;
                    {props.mode ? <span id='message'>&#x2713;</span> : <span id='warning'>&#x26A0;</span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.value}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}