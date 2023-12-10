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
        let userData = JSON.parse(localStorage.getItem('userData')) ?? []
        const input = document.getElementById('form-input').value.trim()
        const password = document.getElementById('form-pass').value.trim()
        if (input == "" || password == "") {
            setResponseMessage("Enter Valid Username and Password!")
            setModalShow(true)
        }
        else {
            const obj = {
                name: input,
                password: password
            }
            if (!userData) {
                userData = []
            }
            let s = 0
            for (let ele of userData) {
                if (ele.name == input && ele.password == password) {
                    s = 1
                    setResponseMessage("User Already Exists!")
                    setModalShow(true)
                }
            }
            if (s == 0) {
                mode = 1
                userData.push(obj)
                localStorage.setItem('userData', JSON.stringify(userData))
                setResponseMessage("Account Created Successfully!")
                setModalShow(true)
                console.log(userData)
            }
        }
    }
    return (
        <div id='logindiv'>
            <div id="loginform">
                <h2 id="headerTitle">Sign Up</h2>
                <div className="row">
                    <label>Username</label>
                    <input type='text' id='form-input' placeholder='Enter your Username' />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input type='password' id='form-pass' placeholder='Enter your Password' />
                </div>
                <div id="button" class="row">
                    <button onClick={userCredentials}>Signup</button>
                </div>
                <div id="alternativeLogin">
                    <label>Already have an account? </label>
                    <a href='/login' id='href'> Login Now</a>
                    <div id="iconGroup"></div>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow} value={mode} name={responseMessage}
                onHide={() => {
                    if (mode == 1) {
                        window.location.href = "/login"
                    }
                    setModalShow(false)
                }
                }
            />
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
    console.log(props.value)
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span id='title-msg'>{props.value ? "Message" : "Error"}</span>&nbsp;
                    {props.value ? <span id='message'>&#x2713;</span> : <span id='warning'>&#x26A0;</span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.name}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}